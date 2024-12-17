import '../css/Form.css'
import { TextInput } from './TextInput'

export const Form = () => {

    return <form className='Form' id="myForm" action="">

        <p>*Se debe presentar 1 (un) formulario por cada proyecto solicitado.</p>
        <p>
            La institución deberá tener vigente su inscripción al SIPAF al momento
            de la presentación del proyecto
        </p>

        <section>

            <h2>1. INSTITUCIÓN(ES) QUE PRESENTA(N) LA PROPUESTA:</h2>

            <fieldset>
                <TextInput label='INSTITUCIÓN:' input_id='inst_institucion' />
                <TextInput label='CUIT:' input_id='inst_cuit' />
                <TextInput label='DOMICILIO:' input_id='inst_domicilio' />
                <TextInput label='LOCALIDAD:' input_id='inst_localidad' />
                <TextInput label='CP:' input_id='inst_cp' />
                <TextInput label='TELÉFONO:' input_id='inst_telefono' />
                <TextInput label='MAIL INSTITUCIONAL:' input_id='inst_mail' />
            </fieldset>

            <fieldset>
                <h2>
                    2. COORDINADOR/A DEL PROYECTO (Nexo con la Dirección de Capacitación y
                    Formación Laboral):
                </h2>

                <TextInput label='NOMBRE COMPLETO:' input_id='coord_nombre' />
                <TextInput label='DNI:' input_id='coord_dni' />
                <TextInput label='N° DE REGISTRO:' input_id='coord_registro' />
                <TextInput label='TELÉFONO:' input_id='coord_telefono' />
                <TextInput label='MAIL:' input_id='coord_mail' />
                <TextInput label='HORARIO:' input_id='coord_horario' />

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



    </form>
}