export const surveyJson = {
    title: "Formulario de Presentación de Proyecto",
    description: "Complete la información requerida en cada sección.",
    showProgressBar:"top",
    showCompletedPAge: "false",
    completedHtml: ` <div style="text-align: center;"> <h3>Formulario enviado y actualizado</h3> <p style="margin: 40px auto 80px auto;">Puedes modificarlo o imprimirlo</p>`,
    pages: [
        {
            name: "institucion",
            title: "1. Institución(es) que presenta(n) la propuesta:",
            elements: [
                { type: "text", name: "inst_institucion", title: "Institución:" },
                { type: "text", name: "inst_cuit", title: "CUIT:" },
                { type: "text", name: "inst_domicilio", title: "Domicilio:" },
                { type: "text", name: "inst_localidad", title: "Localidad:" },
                { type: "text", name: "inst_cp", title: "CP:" },
                { type: "text", name: "inst_telefono", title: "Teléfono:" },
                { type: "text", name: "inst_mail", title: "Mail Institucional:" },
            ]
        },
        {
            name: "coordinador",
            title: "2. Coordinador/a del Proyecto",
            elements: [
                { type: "text", name: "coord_nombre", title: "Nombre Completo:" },
                { type: "text", name: "coord_dni", title: "DNI:" },
                { type: "text", name: "coord_registro", title: "N° de Registro:" },
                { type: "text", name: "coord_telefono", title: "Teléfono:" },
                { type: "text", name: "coord_mail", title: "Mail:" },
                { type: "text", name: "coord_horario", title: "Horario:" },
            ]
        },
        {
            name: "programas",
            title: "3. ¿Ha trabajado con programas de empleo y capacitación de la provincia?",
            elements: [
                {
                    type: "radiogroup",
                    name: "programas_empleo",
                    title: "¿Ha trabajado con programas de empleo y capacitación?",
                    choices: ["Sí", "No"]
                },
                {
                    type: "checkbox",
                    name: "programas",
                    title: "¿Cuáles?",
                    choices: [
                        "Redes / Santa Fe Capacita",
                        "Nexo Oportunidad / Prácticas Laborales",
                        "Mi Primer Empleo",
                        "Nueva Oportunidad / Santa Fe Más"
                    ]
                }
            ]
        },
        {
            name: "actividades",
            title: "4. Descripción de actividades en la institución",
            elements: [
                {
                    type: "comment",
                    name: "actividades_descripcion",
                    title: "Describa brevemente qué actividades realizan y qué se aportará para el desarrollo de la propuesta."
                }
            ]
        }
    ]
};