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

export const Form = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [surveyModel, setSurveyModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        if (initialData[element.name] !== undefined) {
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
    doc.addImage(LOGO_SF_BASE_64, "JPEG", 140, 7, 62.125, 10);

    doc.autoTable({
      head: [["IMPULSA | Formulario de Presentación de Proyecto"]],
      body: [],
      theme: "plain",
      styles: { fontSize: 12, fontStyle: "bold" },
      startY: 15,
    });

    const surveyData = surveyModel.data;
    const surveyPages = surveyJson.pages;
    let startY = 30;

    surveyPages.forEach((page) => {
      const pageBody = page.elements.map((element) => [
        element.title || element.name,
        surveyData[element.name] || "",
      ]);

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
