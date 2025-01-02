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
import { NavLink } from "react-router-dom";

export const Form = () => {
  const { currentUser } = useAuth();
  const [initialData, setInitialData] = useState(null);
  const [surveyModel, setSurveyModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch de los datos en Firestore
    if (currentUser) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "formularios", currentUser.uid);
          const docSnap = await getDoc(docRef);

          // setInitialData
          if (docSnap.exists()) {
            setInitialData(docSnap.data());
          } else {
            setInitialData({});
          }
        } catch (e) {
          showErrorAlert(e.message);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (initialData) {
      // Asigna valores predeterminados dinámicamente
      surveyJson.pages.forEach((page) => {
        page.elements.forEach((element) => {
          if (initialData[element.name] !== undefined) {
            element.defaultValue = initialData[element.name];
          }
        });
      });

      // Crea el modelo del formulario con los valores actualizados
      const model = new Model(surveyJson);
      model.locale = "es"; // Idioma
      // model.applyTheme(DefaultLight); // Tema

      setSurveyModel(model);
    }
  }, [initialData]);

  const handleSurveyComplete = async (survey) => {
    setIsLoading(true);

    try {
      const docRef = doc(db, "formularios", currentUser.uid);
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

    // Imagen en base64 - X, Y, W, H
    doc.addImage(LOGO_SF_BASE_64, "JPEG", 140, 7, 62.125, 10);

    // Añadir título principal
    doc.autoTable({
      head: [["IMPULSA | Formulario de Presentación de Proyecto"]],
      body: [],
      theme: "plain",
      styles: { fontSize: 12, fontStyle: "bold" },
      startY: 15,
    });

    // Obtener los datos de la encuesta
    const surveyData = surveyModel.data;
    const surveyPages = surveyJson.pages;

    let startY = 30; // Coordenada inicial para las tablas

    // Generar una tabla para cada página con su título
    surveyPages.forEach((page) => {
      // Título de la página
      //   doc.autoTable({
      //   head: [
      //     [
      //       {
      //         content: page.title,
      //         colSpan: 2,
      //         styles: {
      //           halign: "center",
      //           fillColor: [200, 200, 200],
      //           fontSize: 12,
      //         },
      //       },
      //     ],
      //   ],
      //     body: [],
      //     theme: "plain",
      //     startY: startY,
      //   });

      // Generar filas para las preguntas de la página
      const pageBody = page.elements.map((element) => [
        element.title || element.name, // Título o nombre de la pregunta
        surveyData[element.name] || "", // Respuesta correspondiente
      ]);

      // Añadir la tabla con los datos de la página
      doc.autoTable({
        // head: [["Pregunta", "Respuesta"]],
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
        content: page.title,
        colSpan: 2,
        theme: "grid",
        startY: doc.previousAutoTable.finalY + 5, // Definir espacio entre tablas
        columnStyles: {
          0: { cellWidth: 50 }, // Ajusta el ancho de la columna izquierda
          1: { cellWidth: "auto" }, // Deja que la columna derecha se ajuste automáticamente
        },
        styles: {
          fontSize: 10,
          cellPadding: 1,
        },
      });

      // Actualizar la posición Y para la próxima tabla
      startY = doc.previousAutoTable.finalY + 10;
    });

    // Agregar número de página a cada página del PDF
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i); // Establecer la página actual
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${totalPages}`, 105, 290, { align: "center" }); // Posición centrada al pie de página
    }

    // Guardar el PDF
    doc.save("survey_form.pdf");
  };

  if (!surveyModel) {
    return <p>Cargando formulario...</p>;
  }

  return (
    <div className="Form">
      <Survey model={surveyModel} onComplete={handleSurveyComplete} />
      {isLoading && <p>Guardando datos...</p>}

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
