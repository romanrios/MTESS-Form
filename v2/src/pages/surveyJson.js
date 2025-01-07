export const surveyJson = {
  title: "Formulario de Presentación de Proyecto",
  description: "Complete la información requerida en cada sección.",
  showProgressBar: "top",
  // showCompletedPage: "false",
  completedHtml: ` <div style="text-align: center;"> <h3>Formulario completado</h3> <p style="margin: 40px auto 80px auto;">Ya puedes exportarlo como PDF para imprimirlo o vuelve a ingresar para editarlo.</p>`,
  showQuestionNumbers: "off",
  pages: [
    {
      name: "institucion",
      title: "Institución(es) que presenta(n) la propuesta:",
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
      title: "Coordinador/a del Proyecto",
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
        "¿Ha trabajado con programas de empleo y capacitación de la provincia?",
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
          visibleIf: "{programas_empleo} = 'Sí'",
          clearIfInvisible: true, // revisar
        },
      ],
    },

    {
      name: "actividades",
      title: "Descripción de actividades en la institución",
      elements: [
        {
          type: "comment",
          name: "actividades_descripcion",
          title:
            "Describa brevemente qué actividades realizan y qué se aportará para el desarrollo de la propuesta. (Ejemplo: Instalaciones, Maquinarias.) Acompañar de las fotos de las instalaciones.",
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
          title: "Denominación del proyecto:",
        },
        {
          type: "comment",
          name: "fund_necesidad",
          title:
            "Necesidad de implementación de la propuesta / vinculación con necesidades productivas locales y regionales:",
        },
        {
          type: "text",
          name: "fund_habitantes",
          title: "Cantidad de habitantes que tiene la localidad:",
        },

        {
          type: "paneldynamic",
          name: "fund_empresas",
          title:
            "Empresas demandantes de mano de obra relacionada a la capacitación:",
          templateElements: [
            {
              type: "text",
              name: "01_fund_empresas_nombre",
              title: "Nombre de la empresa o comercio:",
            },
            {
              type: "text",
              name: "02_fund_empresas_actividad",
              title: "Actividad:",
            },
            {
              type: "text",
              name: "03_fund_empresas_contacto",
              title: "Contacto:",
            },
            { type: "text", name: "04_fund_empresas_mail", title: "Email:" },
            {
              type: "text",
              name: "05_fund_empresas_telefono",
              title: "Teléfono:",
            },
            {
              type: "text",
              name: "06_fund_empresas_direccion",
              title: "Dirección:",
            },
          ],
          panelCount: 1,
          minPanelCount: 1,
          panelAddText: "Agregar Empresa",
          panelRemoveText: "Eliminar Empresa",
        },
        {
          type: "checkbox",
          name: "fund_poblacion",
          title: "¿A qué población está orientada la propuesta?",
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
          clearIfInvisible: true, // revisar
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
      title:
        "Proyectos de Desarrollo Formativo / Competencias Laborales (Tipo A y B)",
      elements: [
        {
          type: "html",
          html: "Datos del Proyecto de Capacitación Laboral",
        },
        {
          type: "comment",
          name: "proyectos_requisitos",
          title:
            "Requisitos de ingreso de los beneficiarios según proyecto (describirlos). (Ej. Edad, formación).:",
        },
        {
          type: "comment",
          name: "proyectos_perfil",
          title:
            "Perfil de egreso. Describa qué va a saber hacer la persona que finalice esta formación.",
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
              title: "Carga horaria estimada teoría:",
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
              title: "Carga horaria estimada práctica:",
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
        {
          type: "comment",
          name: "proyectos_modalidad",
          title:
            "Modalidad de dictado. (Sólo para cursos virtuales y/o bimodales) Describir brevemente el encuadre de dictado (Plataforma. Sincrónico / Asincrónico. Videos)",
        },
        {
          type: "comment",
          name: "proyectos_horarios",
          title: "Días y horarios de dictado",
        },
        {
          type: "text",
          name: "proyectos_vacantes",
          title: "Cantidad de Vacantes",
        },
        {
          type: "text",
          name: "proyectos_cargahoraria",
          title: "Carga Horaria",
        },
        {
          type: "paneldynamic",
          name: "proyectos_equipo",
          title: "Equipo pedagógico",
          templateElements: [
            { type: "text", name: "01_proyectos_equipo_rol", title: "Rol:" },
            {
              type: "text",
              name: "02_proyectos_equipo_registro",
              title: "N° de Registro:",
            },
            {
              type: "text",
              name: "03_proyectos_equipo_apellidonombre",
              title: "Apellido y Nombre:",
            },
            { type: "text", name: "04_proyectos_equipo_dni", title: "DNI:" },
            {
              type: "text",
              name: "05_proyectos_equipo_telefono",
              title: "Teléfono:",
            },
            {
              type: "text",
              name: "06_proyectos_equipo_direccion",
              title: "Dirección:",
            },
            {
              type: "text",
              name: "07_proyectos_equipo_email",
              title: "Email:",
            },
            {
              type: "text",
              name: "08_proyectos_equipo_titulocertificacion",
              title: "Título/Certificación:",
            },
            {
              type: "text",
              name: "09_proyectos_equipo_observaciones",
              title: "Observaciones:",
            },
            {
              type: "text",
              name: "10_proyectos_equipo_cargahoraria",
              title: "Carga horaria:",
            },
            {
              type: "text",
              name: "11_proyectos_equipo_costohora",
              title: "Costo por hora:",
            },
          ],
          panelCount: 1,
          minPanelCount: 1,
          panelAddText: "Agregar Integrante",
          panelRemoveText: "Eliminar Integrante",
        },
      ],
    },
  ],
};
