import '../css/Form.css';
import { TextInput } from '../components/TextInput';
import { db } from '../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { showSuccessAlert } from '../utils/alerts';

const handleSubmit = async (event, currentUser) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        userId: currentUser.uid,
        inst_institucion: formData.get('inst_institucion'),
        inst_cuit: formData.get('inst_cuit'),
        inst_domicilio: formData.get('inst_domicilio'),
        inst_localidad: formData.get('inst_localidad'),
        inst_cp: formData.get('inst_cp'),
        inst_telefono: formData.get('inst_telefono'),
        inst_mail: formData.get('inst_mail'),
        coord_nombre: formData.get('coord_nombre'),
        coord_dni: formData.get('coord_dni'),
        coord_registro: formData.get('coord_registro'),
        coord_telefono: formData.get('coord_telefono'),
        coord_mail: formData.get('coord_mail'),
        coord_horario: formData.get('coord_horario'),
    };

    console.log(data);

    try {
        const docRef = doc(db, 'formularios', currentUser.uid); // Usar el UID del usuario como ID del documento
        await setDoc(docRef, data, { merge: true }); // Actualizar datos existentes o crearlos si no existen
        showSuccessAlert('Datos actualizados exitosamente.');
    } catch (e) {
        showErrorAlert(e.message);
    }
};

export const Form = () => {
    const { currentUser } = useAuth();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                try {
                    const docRef = doc(db, 'formularios', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setInitialData(docSnap.data());
                    } else {
                        console.log('No se encontraron datos previos.');
                        setInitialData({});
                    }
                } catch (e) {
                    console.error('Error al obtener los datos:', e);
                }
            };
            fetchData();
        }
    }, [currentUser]);

    if (!initialData) {
        return <p>Cargando datos del formulario...</p>;
    }

    return (
        <form className="Form" id="myForm" action="" onSubmit={(e) => handleSubmit(e, currentUser)}>
            <p>*Se debe presentar 1 (un) formulario por cada proyecto solicitado.</p>
            <p>
                La institución deberá tener vigente su inscripción al SIPAF al momento
                de la presentación del proyecto
            </p>

            <section>
                <h2>1. INSTITUCIÓN(ES) QUE PRESENTA(N) LA PROPUESTA:</h2>
                <fieldset>
                    <TextInput label="INSTITUCIÓN:" name="inst_institucion" defaultValue={initialData.inst_institucion || ''} />
                    <TextInput label="CUIT:" name="inst_cuit" defaultValue={initialData.inst_cuit || ''} />
                    <TextInput label="DOMICILIO:" name="inst_domicilio" defaultValue={initialData.inst_domicilio || ''} />
                    <TextInput label="LOCALIDAD:" name="inst_localidad" defaultValue={initialData.inst_localidad || ''} />
                    <TextInput label="CP:" name="inst_cp" defaultValue={initialData.inst_cp || ''} />
                    <TextInput label="TELÉFONO:" name="inst_telefono" defaultValue={initialData.inst_telefono || ''} />
                    <TextInput label="MAIL INSTITUCIONAL:" name="inst_mail" defaultValue={initialData.inst_mail || ''} />
                </fieldset>

                <fieldset>
                    <h2>
                        2. COORDINADOR/A DEL PROYECTO (Nexo con la Dirección de Capacitación y
                        Formación Laboral):
                    </h2>

                    <TextInput label="NOMBRE COMPLETO:" name="coord_nombre" defaultValue={initialData.coord_nombre || ''} />
                    <TextInput label="DNI:" name="coord_dni" defaultValue={initialData.coord_dni || ''} />
                    <TextInput label="N° DE REGISTRO:" name="coord_registro" defaultValue={initialData.coord_registro || ''} />
                    <TextInput label="TELÉFONO:" name="coord_telefono" defaultValue={initialData.coord_telefono || ''} />
                    <TextInput label="MAIL:" name="coord_mail" defaultValue={initialData.coord_mail || ''} />
                    <TextInput label="HORARIO:" name="coord_horario" defaultValue={initialData.coord_horario || ''} />

                    <div className="form-group">
                        <label>Descripción de su función en la Institución que presenta:</label>
                    </div>

                    <div className="form-group">
                        <input type="text" id="coord_descripcion" />
                    </div>
                </fieldset>

                <fieldset>
                    <h2>
                        3. ¿Ha trabajado con programas de empleo y capacitación de la provincia?
                    </h2>

                    <div className="form-group">
                        <label className="label_checkbox">
                            <input type="radio" name="programas_empleo" value="si" />
                            Sí
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="label_checkbox">
                            <input type="radio" name="programas_empleo" value="no" />
                            No
                        </label>
                    </div>

                    <div className="form-group">
                        <p>¿Cuáles?</p>
                    </div>

                    <div className="form-group">
                        <label className="label_checkbox">
                            <input type="checkbox" name="programas[]" value="Redes / Santa Fe Capacita" />
                            Redes / Santa Fe Capacita
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="label_checkbox">
                            <input type="checkbox" name="programas[]" value="Nexo Oportunidad / Prácticas Laborales" />
                            Nexo Oportunidad / Prácticas Laborales
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="label_checkbox">
                            <input type="checkbox" name="programas[]" value="Mi Primer Empleo" />
                            Mi Primer Empleo
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="label_checkbox">
                            <input type="checkbox" name="programas[]" value="Nueva Oportunidad / Santa Fe Más" />
                            Nueva Oportunidad / Santa Fe Más
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <h2>4. Describir brevemente qué actividades realizan en la institución y qué se aportará para el desarrollo de
                        la propuesta (Ejemplo: Instalaciones, Maquinarias). Acompañar fotos de las instalaciones:</h2>
                    <div className="form-group">
                        <textarea rows="3" name="" id=""></textarea>
                    </div>
                </fieldset>
            </section>

            <button className='button no-print' type="submit">Enviar y Actualizar Datos</button>

            <button className="button no-print" type="button" onClick={() => window.print()}>Imprimir Formulario</button>

        </form>
    )
}