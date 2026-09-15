// ======================================================
// IMPORTACIONES DE FIREBASE
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    runTransaction
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ======================================================
// CONFIGURACIÓN DE FIREBASE
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyDgy60tQMfxNcGrmUJiuJWS7HhSwBugFOU",
    authDomain: "sofiguras-001.firebaseapp.com",
    projectId: "sofiguras-001",
    storageBucket: "sofiguras-001.firebasestorage.app",
    messagingSenderId: "235332825986",
    appId: "1:235332825986:web:2ecf07616f16505fcdd59b",
    measurementId: "G-SHFKKS0VDL"
};


// ======================================================
// INICIALIZAR FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);


// ======================================================
// ELEMENTOS DEL HTML
// ======================================================

const botonFigura = document.getElementById("botonFigura");

const nombreInput = document.getElementById("nombre");

const resultado = document.getElementById("resultado");

const pantallaInicial = document.getElementById("pantallaInicial");


// ======================================================
// VARIABLE PARA EL USUARIO ACTUAL
// ======================================================

let usuarioActual = null;


// ======================================================
// LOS 7 PERFILES DE LA ACTIVIDAD
// ======================================================

const perfiles = [

    {
        id: 1,
        figura: "triangulo",
        nombreFigura: "Triángulo",
        simbolo: "🔺",

        formacion: "Técnico en Sistemas",

        experiencia: "2 años en soporte técnico.",

        habilidades: [
            "Manejo de computadores.",
            "Instalación de software.",
            "Solución de problemas.",
            "Atención a usuarios."
        ],

        situacion:
            "Actualmente trabaja como técnico de soporte en una empresa de servicios informáticos diferente a las tres empresas presentadas."
    },


    {
        id: 2,
        figura: "circulo",
        nombreFigura: "Círculo",
        simbolo: "⚪",

        formacion: "Técnico en Sistemas",

        experiencia: "1 año en soporte técnico.",

        habilidades: [
            "Diagnóstico de problemas.",
            "Manejo de software.",
            "Atención a usuarios.",
            "Buena comunicación.",
            "Capacidad de adaptación."
        ],

        situacion:
            "Actualmente se encuentra desempleado y está buscando una nueva oportunidad laboral."
    },


    {
        id: 3,
        figura: "cuadrado",
        nombreFigura: "Cuadrado",
        simbolo: "🟦",

        formacion: "Técnico en Sistemas",

        experiencia: "3 años en soporte técnico.",

        habilidades: [
            "Mantenimiento de equipos.",
            "Solución de problemas.",
            "Conocimientos de hardware y software.",
            "Organización.",
            "Trabajo en equipo."
        ],

        situacion:
            "Actualmente trabaja como técnico de sistemas en una empresa diferente a las tres empresas presentadas."
    },


    {
        id: 4,
        figura: "circulo",
        nombreFigura: "Círculo",
        simbolo: "⚪",

        formacion: "Técnico en Asistencia Administrativa",

        experiencia: "2 años como auxiliar administrativo.",

        habilidades: [
            "Manejo de documentos.",
            "Manejo de Excel.",
            "Atención telefónica.",
            "Buena comunicación.",
            "Trabajo bajo presión."
        ],

        situacion:
            "Actualmente trabaja como auxiliar administrativa en una empresa comercial que no está relacionada con las tres empresas presentadas."
    },


    {
        id: 5,
        figura: "cuadrado",
        nombreFigura: "Cuadrado",
        simbolo: "🟦",

        formacion: "Técnico en Asistencia Administrativa",

        experiencia: "1 año como auxiliar administrativo.",

        habilidades: [
            "Organización de documentos.",
            "Manejo de archivos.",
            "Manejo de Word y Excel.",
            "Elaboración de informes.",
            "Responsabilidad."
        ],

        situacion:
            "Actualmente se encuentra desempleado y está buscando una oportunidad laboral."
    },


    {
        id: 6,
        figura: "triangulo",
        nombreFigura: "Triángulo",
        simbolo: "🔺",

        formacion: "Técnico en Servicio al Cliente",

        experiencia: "4 años en atención al cliente.",

        habilidades: [
            "Comunicación.",
            "Manejo de conflictos.",
            "Excelente trato con clientes.",
            "Trabajo en equipo.",
            "Liderazgo.",
            "Conocimiento de los procesos de la empresa."
        ],

        situacion:
            "Actualmente trabaja en Sabores & Más como asesor de servicio al cliente desde hace 3 años. Está interesado en crecer profesionalmente dentro de la empresa."
    },


    {
        id: 7,
        figura: "cuadrado",
        nombreFigura: "Cuadrado",
        simbolo: "🟦",

        formacion: "Técnico en Servicio al Cliente",

        experiencia: "5 años en atención al cliente.",

        habilidades: [
            "Atención al cliente.",
            "Comunicación.",
            "Manejo de conflictos.",
            "Trabajo en equipo.",
            "Supervisión de equipos."
        ],

        situacion:
            "Actualmente trabaja como supervisor de servicio al cliente en una empresa diferente a las tres empresas presentadas y está buscando una nueva oportunidad laboral."
    }

];


// ======================================================
// AUTENTICACIÓN ANÓNIMA
// ======================================================

signInAnonymously(auth)

    .then((resultadoAuth) => {

        usuarioActual = resultadoAuth.user;

        console.log("Firebase conectado.");

        console.log(
            "ID del usuario:",
            usuarioActual.uid
        );

    })

    .catch((error) => {

        console.error(
            "Error de autenticación:",
            error
        );

        resultado.innerHTML = `
            <p>
                No se pudo conectar con Firebase.
            </p>
        `;

    });


// ======================================================
// BOTÓN "OBTENER MI FIGURA"
// ======================================================

botonFigura.addEventListener("click", async function () {


    // --------------------------------------------------
    // COMPROBAR AUTENTICACIÓN
    // --------------------------------------------------

    if (usuarioActual === null) {

        resultado.innerHTML = `
            <p>
                Espera un momento y vuelve a intentarlo.
            </p>
        `;

        return;
    }


    // --------------------------------------------------
    // OBTENER NOMBRE
    // --------------------------------------------------

    const nombre = nombreInput.value.trim();


    // --------------------------------------------------
    // COMPROBAR QUE ESCRIBIÓ EL NOMBRE
    // --------------------------------------------------

    if (nombre === "") {

        resultado.innerHTML = `
            <p>
                Por favor escribe tu nombre.
            </p>
        `;

        return;
    }


    // --------------------------------------------------
    // DESACTIVAR BOTÓN MIENTRAS SE ASIGNA
    // --------------------------------------------------

    botonFigura.disabled = true;

    botonFigura.textContent = "Asignando perfil...";


    try {

        // ==================================================
        // REFERENCIAS DE FIRESTORE
        // ==================================================

        const usuarioId = usuarioActual.uid;

        const participanteRef = doc(
            db,
            "participantes",
            usuarioId
        );

        const estadoRef = doc(
            db,
            "actividad",
            "estado"
        );


        // ==================================================
        // TRANSACCIÓN
        // ==================================================

        const resultadoTransaccion = await runTransaction(
            db,
            async (transaction) => {


                // ------------------------------------------
                // BUSCAR SI ESTE PARTICIPANTE YA TIENE PERFIL
                // ------------------------------------------

                const participanteSnap =
                    await transaction.get(participanteRef);


                // ------------------------------------------
                // SI YA TIENE PERFIL
                // ------------------------------------------

                if (participanteSnap.exists()) {

                    const datos =
                        participanteSnap.data();

                    const perfilExistente =
                        perfiles.find(
                            perfil =>
                                perfil.id === Number(datos.perfilId)
                        );


                    if (!perfilExistente) {

                        throw new Error(
                            "No se encontró el perfil asignado."
                        );
                    }


                    return {

                        nombre: datos.nombre,

                        perfil: perfilExistente,

                        nuevo: false

                    };

                }


                // ------------------------------------------
                // LEER ESTADO DE LA ACTIVIDAD
                // ------------------------------------------

                const estadoSnap =
                    await transaction.get(estadoRef);


                if (!estadoSnap.exists()) {

                    throw new Error(
                        "No existe actividad/estado en Firebase."
                    );

                }


                const datosEstado =
                    estadoSnap.data();


                // ------------------------------------------
                // OBTENER PERFILES DISPONIBLES
                // ------------------------------------------

                let perfilesDisponibles =
                    Array.isArray(
                        datosEstado.perfilesDisponibles
                    )
                        ? datosEstado.perfilesDisponibles
                        : [];


                // Convertimos los valores a números
                perfilesDisponibles =
                    perfilesDisponibles.map(
                        id => Number(id)
                    );


                // ------------------------------------------
                // COMPROBAR SI QUEDAN PERFILES
                // ------------------------------------------

                if (perfilesDisponibles.length === 0) {

                    throw new Error(
                        "Ya fueron asignados los 7 perfiles."
                    );

                }


                // ------------------------------------------
                // ELEGIR PERFIL ALEATORIO
                // ------------------------------------------

                const posicionAleatoria =
                    Math.floor(
                        Math.random() *
                        perfilesDisponibles.length
                    );


                const perfilId =
                    perfilesDisponibles[
                        posicionAleatoria
                    ];


                // ------------------------------------------
                // BUSCAR EL PERFIL
                // ------------------------------------------

                const perfilSeleccionado =
                    perfiles.find(
                        perfil =>
                            perfil.id === perfilId
                    );


                if (!perfilSeleccionado) {

                    throw new Error(
                        "El perfil seleccionado no existe."
                    );

                }


                // ------------------------------------------
                // ELIMINAR PERFIL DE DISPONIBLES
                // ------------------------------------------

                perfilesDisponibles =
                    perfilesDisponibles.filter(
                        id => id !== perfilId
                    );


                // ------------------------------------------
                // OBTENER PERFILES YA ASIGNADOS
                // ------------------------------------------

                let perfilesAsignados =
                    Array.isArray(
                        datosEstado.perfilesAsignados
                    )
                        ? datosEstado.perfilesAsignados
                        : [];


                perfilesAsignados =
                    perfilesAsignados.map(
                        id => Number(id)
                    );


                // ------------------------------------------
                // AGREGAR EL NUEVO PERFIL
                // ------------------------------------------

                perfilesAsignados.push(perfilId);


                // ------------------------------------------
                // ACTUALIZAR FIREBASE
                // ------------------------------------------

                transaction.update(
                    estadoRef,
                    {

                        perfilesDisponibles:
                            perfilesDisponibles,

                        perfilesAsignados:
                            perfilesAsignados,

                        total:
                            perfilesDisponibles.length

                    }
                );


                // ------------------------------------------
                // GUARDAR PARTICIPANTE
                // ------------------------------------------

                transaction.set(
                    participanteRef,
                    {

                        nombre: nombre,

                        perfilId: perfilId,

                        figura:
                            perfilSeleccionado.figura

                    }
                );


                // ------------------------------------------
                // DEVOLVER RESULTADO
                // ------------------------------------------

                return {

                    nombre: nombre,

                    perfil: perfilSeleccionado,

                    nuevo: true

                };

            }
        );


        // ==================================================
        // MOSTRAR PERFIL
        // ==================================================

        mostrarPerfil(
            resultadoTransaccion.nombre,
            resultadoTransaccion.perfil
        );


    }

    catch (error) {

        console.error(
            "ERROR:",
            error
        );


        resultado.innerHTML = `
            <p>
                Error: ${error.message}
            </p>
        `;


        botonFigura.disabled = false;

        botonFigura.textContent =
            "Obtener mi figura";

    }

});


// ======================================================
// FUNCIÓN PARA MOSTRAR EL PERFIL
// ======================================================

function mostrarPerfil(nombre, perfil) {


    // --------------------------------------------------
    // OCULTAR PANTALLA INICIAL
    // --------------------------------------------------

    pantallaInicial.style.display = "none";


    // --------------------------------------------------
    // CREAR LISTA DE HABILIDADES
    // --------------------------------------------------

    let listaHabilidades = "";


    perfil.habilidades.forEach(
        habilidad => {

            listaHabilidades += `
                <li>${habilidad}</li>
            `;

        }
    );


    // --------------------------------------------------
    // MOSTRAR TARJETA
    // --------------------------------------------------

    resultado.innerHTML = `

        <div class="tarjeta-perfil">

            <div class="figura-asignada">
                ${perfil.simbolo}
            </div>


            <h2>
                ${perfil.nombreFigura}
            </h2>


            <div class="separador"></div>


            <h3>
                PERFIL ${perfil.id}
            </h3>


            <p>
                <strong>Participante:</strong><br>
                ${nombre}
            </p>


            <p>
                <strong>Formación:</strong><br>
                ${perfil.formacion}
            </p>


            <p>
                <strong>Experiencia:</strong><br>
                ${perfil.experiencia}
            </p>


            <p>
                <strong>Habilidades:</strong>
            </p>


            <ul>
                ${listaHabilidades}
            </ul>


            <p>
                <strong>Situación actual:</strong><br>
                ${perfil.situacion}
            </p>

        </div>

    `;

}
