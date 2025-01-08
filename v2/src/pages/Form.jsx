import "../css/Form.css";
import { db } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { showSuccessAlert, showErrorAlert } from "../utils/alerts";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.fontless.min.css"; // CSS Survey.js
import "survey-core/survey.i18n"; // Traducciones Survey.js
import { surveyJson } from "./surveyJson.js"; // Mi Form
import jsPDF from "jspdf";
import "jspdf-autotable";
import { LOGO_SF_BASE_64 } from "../utils/const.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [surveyModel, setSurveyModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.editSurvey = () => {
      navigate("/Form");
      setSurveyModel(new Model(surveyJson));
    };
  }, [navigate]);

  // Fetch data from Firestore
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser, userId]);

  const fetchData = async () => {
    try {
      // usar params si es admin
      const uid =
        currentUser.email === "mtess.sf@gmail.com" ? userId : currentUser.uid;
      const docRef = doc(db, "formularios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInitialData(docSnap.data());
      } else {
        setInitialData({});
      }
    } catch (e) {
      showErrorAlert(e.message);
    }
  };

  // Initialize survey model with initial data
  useEffect(() => {
    if (initialData) {
      initializeSurveyModel();
    }
  }, [initialData]);

  const initializeSurveyModel = () => {
    surveyJson.pages.forEach((page) => {
      page.elements.forEach((element) => {
        // Si es un panel, recorrer sus elementos hijos
        if (element.type === "panel" && element.elements) {
          element.elements.forEach((childElement) => {
            if (initialData[childElement.name] !== undefined) {
              childElement.defaultValue = initialData[childElement.name];
            }
          });
        } else if (initialData[element.name] !== undefined) {
          // Para elementos de nivel superior
          element.defaultValue = initialData[element.name];
        }
      });
    });

    const model = new Model(surveyJson);
    model.locale = "es"; // Set language
    setSurveyModel(model);
  };

  const handleSurveyComplete = async (survey) => {
    setIsLoading(true);
    try {
      // usar params si es admin
      const uid =
        currentUser.email === "mtess.sf@gmail.com" ? userId : currentUser.uid;

      const docRef = doc(db, "formularios", uid);
      await setDoc(docRef, survey.data, { merge: true });
      showSuccessAlert("Datos enviados y almacenados exitosamente.");
    } catch (e) {
      showErrorAlert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(LOGO_SF_BASE_64, "JPEG", 133, 12, 62.125, 10);

    doc.autoTable({
      head: [["Formulario de Presentación de Proyecto"]],
      body: [],
      theme: "plain",
      styles: { fontSize: 12, fontStyle: "bold" },
      startY: 15,
    });

    const surveyData = surveyModel.data;
    const surveyPages = surveyJson.pages;
    let startY = 30;

    surveyPages.forEach((page) => {
      const pageBody = page.elements
        .filter((element) => element.type !== "html") // Filtrar los elementos de tipo "html"
        .map((element) => {
          if (element.type === "paneldynamic") {
            const panelData = surveyData[element.name] || []; // Array de paneles

            // Ordenar los paneles por el nombre de sus elementos (por su 'name')
            const sortedPanelData = panelData
              .map((panel) => {
                // Convertimos el objeto del panel en un array de entradas [name, value]
                const panelEntries = Object.entries(panel).map(
                  ([key, value]) => {
                    // Encontramos el título correspondiente al 'name' (key)
                    const elementTitle = element.templateElements.find(
                      (e) => e.name === key
                    )?.title;
                    return [key, elementTitle || key, value || "Sin datos"];
                  }
                );

                // Ordenar las entradas por 'name' (clave)
                panelEntries.sort((a, b) => a[0].localeCompare(b[0]));

                // Unir el contenido del panel ordenado en un texto, con los valores separados por " / "
                return panelEntries
                  .map((entry) => `${entry[1]} ${entry[2]}`) // Generar formato "title: value"
                  .join(" / "); // Separar los elementos por " / "
              })
              .join("\n\n"); // Separar los diferentes paneles con un salto de línea entre ellos

            return [
              element.title || "Sin título",
              sortedPanelData || "Sin datos",
            ];
          }

          if (element.type === "panel") {
            // Para los paneles estáticos, procesamos los elementos dentro de cada panel
            const panelContent = element.elements
              .map((childElement) => {
                const value = surveyData[childElement.name] || "Sin datos";
                return `${childElement.title || childElement.name}: ${value}`;
              })
              .join(" / "); // Unir todos los elementos dentro del panel
            return [element.title || "Sin título", panelContent];
          }

          // Para otros tipos de elementos, devolver título y valor
          return [
            element.title || "Sin título",
            surveyData[element.name] || "Sin datos",
          ];
        });

      doc.autoTable({
        head: [
          [
            {
              content: page.title,
              colSpan: 2,
              styles: {
                halign: "center",
                fillColor: [120, 120, 120],
                fontSize: 11,
                cellPadding: 1,
              },
            },
          ],
        ],
        body: pageBody,
        theme: "grid",
        startY: doc.previousAutoTable.finalY + 5,
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: "auto" },
        },
        styles: {
          fontSize: 10,
          cellPadding: 1,
        },
      });

      startY = doc.previousAutoTable.finalY + 10;
    });

    addPageNumbers(doc);
    doc.save("survey_form.pdf");
  };

  const addPageNumbers = (doc) => {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${totalPages}`, 105, 290, { align: "center" });
    }
  };

  if (!surveyModel) {
    return <p>Cargando formulario...</p>;
  }

  return (
    <div className="Form">
      <Survey model={surveyModel} onComplete={handleSurveyComplete} />
      {isLoading && <p className="loading_message">Guardando datos...</p>}
      <button
        onClick={generatePDF}
        className="button"
        style={{ margin: "70px auto" }}
      >
        Exportar a PDF
      </button>
    </div>
  );
};
