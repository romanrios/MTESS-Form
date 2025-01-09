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
import { useParams } from "react-router-dom";
import { PDFExporter } from "../components/PDFExporter.jsx";

export const Form = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [surveyModel, setSurveyModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Función botón Seguir Editando
  const editSurvey = () => {
    setIsCompleted(false);
    const newModel = new Model(surveyJson);
    newModel.locale = "es";
    setSurveyModel(newModel);
  };

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
        userId && currentUser.email === "mtess.sf@gmail.com"
          ? userId
          : currentUser.uid;
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
    model.onComplete.add(() => setIsCompleted(true));
    model.locale = "es"; // Set language
    setSurveyModel(model);
  };

  const handleSurveyComplete = async (survey) => {
    setIsLoading(true);
    try {
      // usar params si es admin
      const uid =
        userId && currentUser.email === "mtess.sf@gmail.com"
          ? userId
          : currentUser.uid;

      const docRef = doc(db, "formularios", uid);
      await setDoc(docRef, survey.data, { merge: true });
      showSuccessAlert("Datos enviados y almacenados exitosamente.");
    } catch (e) {
      showErrorAlert(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!surveyModel) {
    return <p>Cargando formulario...</p>;
  }

  return (
    <div className="Form">
      <Survey model={surveyModel} onComplete={handleSurveyComplete} />
      {isLoading && <p className="loading_message">Guardando datos...</p>}
      {isCompleted && (
        <button className="button" onClick={editSurvey}>
          Editar Formulario{" "}
        </button>
      )}
      <PDFExporter surveyModel={surveyModel} />
    </div>
  );
};
