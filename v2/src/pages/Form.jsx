import '../css/Form.css';
import { db } from '../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.fontless.min.css"; // CSS Survey.js
// import { DefaultLight } from "survey-core/themes/"; //Tema Survey.js
import "survey-core/survey.i18n" // Traducciones Survey.js
import { surveyJson } from './surveyJson.js'; // Mi Form
// import { SurveyPDF } from "survey-pdf"; // PDF

export const Form = () => {
    const { currentUser } = useAuth();
    const [initialData, setInitialData] = useState(null);
    const [surveyModel, setSurveyModel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                try {
                    const docRef = doc(db, 'formularios', currentUser.uid);
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
            surveyJson.showCompletedPage = false;



            // Crea el modelo del formulario con los valores actualizados
            const model = new Model(surveyJson);
            model.locale = "es"; // Idioma
            // model.applyTheme(DefaultLight); // Tema
            setSurveyModel(model);

            //PDF
            // model.addNavigationItem({
            //     id: "pdf-export",
            //     title: "Save as PDF",
            //     action: () => savePdf(model.data)
            // });

        }
    }, [initialData]);

    const handleSurveyComplete = async (survey) => {
        setIsLoading(true);

        try {
            const docRef = doc(db, 'formularios', currentUser.uid);
            await setDoc(docRef, survey.data, { merge: true });
            showSuccessAlert('Datos actualizados exitosamente.');
        } catch (e) {
            showErrorAlert(e.message);
        } finally {
            setIsLoading(false);
        }
    };


    // const pdfDocOptions = { // PDF
    //     fontSize: 12
    // };

    // const savePdf = function (surveyData) {
    //     const surveyPdf = new SurveyPDF(surveyJson, pdfDocOptions);
    //     surveyPdf.data = surveyData;
    //     surveyPdf.save();
    // };


    if (!surveyModel) {
        return <p>Cargando formulario...</p>;
    }

    return (
        <div className='Form'>
            <Survey model={surveyModel} onComplete={handleSurveyComplete} />
            {isLoading && <p>Guardando datos...</p>}
        </div>
    );
};
