export const surveyJson = {
  title: "Formulario de Presentación de Proyecto",
  description: "Complete la información requerida en cada sección.",
  showProgressBar: "top",
  showCompletedPAge: "false",
  completedHtml: ` <div style="text-align: center;"> <h3>Formulario enviado y actualizado</h3> <p style="margin: 40px auto 80px auto;">Puedes modificarlo o imprimirlo</p>`,
  showQuestionNumbers: "off",
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
      ],
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
      ],
    },

    {
      name: "programas",
      title:
        "3. ¿Ha trabajado con programas de empleo y capacitación de la provincia?",
      elements: [
        {
          type: "radiogroup",
          name: "programas_empleo",
          title: "¿Ha trabajado con programas de empleo y capacitación?",
          choices: ["Sí", "No"],
        },
        {
          type: "checkbox",
          name: "programas",
          title: "¿Cuáles?",
          choices: [
            "Redes / Santa Fe Capacita",
            "Nexo Oportunidad / Prácticas Laborales",
            "Mi Primer Empleo",
            "Nueva Oportunidad / Santa Fe Más",
          ],
        },
      ],
    },

    {
      name: "actividades",
      title: "4. Descripción de actividades en la institución",
      elements: [
        {
          type: "comment",
          name: "actividades_descripcion",
          title:
            "Describa brevemente qué actividades realizan y qué se aportará para el desarrollo de la propuesta.",
        },
      ],
    },

    {
      name: "fundamentacion",
      title: "Fundamentación del proyecto",
      elements: [
        {
          type: "text",
          name: "fund_denominacion",
          title: "1. Denominación del proyecto:",
        },
        {
          type: "comment",
          name: "fund_necesidad",
          title:
            "2.1. Necesidad de implementación de la propuesta / vinculación con necesidades productivas locales y regionales:",
        },
        {
          type: "text",
          name: "fund_habitantes",
          title: "2.2. Cantidad de habitantes que tiene la localidad:",
        },

        {
          type: "paneldynamic",
          name: "fund_empresas",
          title:
            "3. Empresas demandantes de mano de obra relacionada a la capacitación:",
          templateElements: [
            {
              type: "text",
              name: "nombre_empresa",
              title: "Nombre de la empresa/comercio",
            },
            { type: "text", name: "actividad", title: "Actividad" },
            { type: "text", name: "contacto", title: "Contacto" },
            { type: "text", name: "mail", title: "Mail" },
            { type: "text", name: "telefono", title: "Teléfono" },
            { type: "text", name: "direccion", title: "Dirección" },
          ],
          panelCount: 1, // Número inicial de paneles
          minPanelCount: 1, // Número mínimo de paneles
          panelAddText: "Agregar Empresa",
          panelRemoveText: "Eliminar Empresa",
        },
        {
          type: "checkbox",
          name: "fund_poblacion",
          title: "4. ¿A qué población está orientada la propuesta?",
          choices: [
            "Población desocupada en general",
            "Población ocupada con necesidad de recalificación",
            "Personas con discapacidad",
            "Población penitenciaria / pospenitenciaria",
            "Colectivo LGBT+",
            "Pueblos originarios",
            "Otras poblaciones",
          ],
        },
        {
          type: "text",
          name: "fund_poblacion_otras",
          title: "Especifique otras poblaciones:",
          visibleIf: "{fund_poblacion} contains 'Otras poblaciones'",
        },
        {
          type: "html",
          html: "<h5>Link de inscripción (solo para Proyectos A y B)</h5><p>La inscripción a los cursos debe hacerse online, a fin de agilizar el trámite en el caso de que sea aprobado por la Comisión Evaluadora, le solicitamos nos envíe un link por cada propuesta donde los interesados podrán inscribirse. Para la creación del formulario de inscripción, le sugerimos utilice un google forms (forms.google.com)  a tal efecto. Desde este Ministerio haremos publicaciones para promocionar el dictado del curso, por lo que nos es imprescindible contar con dicha información. Si el curso ha sido presentado teniendo en cuenta una población específica y por lo tanto la inscripción no se encontrará abierta a la comunidad, le solicitamos nos lo informe con una explicación que justifique tal situación.</p>",
        },
        {
          type: "text",
          name: "fund_link",
          title: "Gmail para formulario:",
        },
      ],
    },

    {
      name: "proyectos_desarrollo",
      title: "Proyectos de Desarrollo Formativo / Competencias Laborales",
      elements: [
        {
          type: "comment",
          name: "proyectos_requisitos",
          title:
            "1. Requisitos de ingreso de los beneficiarios según proyecto (describirlos). (Ej. Edad, formación).:",
        },
        {
          type: "comment",
          name: "proyectos_perfil",
          title:
            "2. Perfil de egreso. Describa qué va a saber hacer la persona que finalice esta formación.",
        },
        {
          type: "text",
          name: "proyectos_unidades",
          title: "Unidades / módulos de dictado:",
        },
        {
          type: "html",
          html: "<h5>Características de dictado</h5><p>Recordar que si se trata de un espacio ajeno a la institución debe presentar nota de cesión firmada.</p>",
        },
        {
          type: "panel",
          name: "proyectos_caracteristicas_teoria",
          title: "Teoría",
          elements: [
            {
              type: "text",
              name: "proyectos_caracteristicas_teoria_carga",
              title: "Carga horaria estimada teoría",
            },
            {
              type: "text",
              name: "proyectos_caracteristicas_teoria_lugar",
              title: "Nombre del lugar de dictado:",
            },
            {
              type: "text",
              name: "proyectos_caracteristicas_teoria_direccion",
              title: "Dirección / Localidad:",
            },
          ],
        },
        {
          type: "panel",
          name: "proyectos_caracteristicas_practica",
          title: "Práctica",
          elements: [
            {
              type: "text",
              name: "proyectos_caracteristicas_practica_carga",
              title: "Carga horaria estimada práctica",
            },
            {
              type: "text",
              name: "proyectos_caracteristicas_practica_lugar",
              title: "Nombre del lugar de dictado:",
            },
            {
              type: "text",
              name: "proyectos_caracteristicas_practica_direccion",
              title: "Dirección / Localidad:",
            },
          ],
        },
      ],
    },
  ],
};
