import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"  
import { cargarListaEvaluaciones } from "../store/slices/evaluacionesSlice";

const ListaEvaluaciones = () => {
    const dispatch = useDispatch();
    const evaluaciones = useSelector(state => state.evaluaciones.listaEvaluaciones);
    const objetivos = useSelector(state => state.evaluaciones.listaObjetivos);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
            console.log("No hay sesión activa");
            return;
        }
        

        fetch(`https://goalify.develotion.com/evaluaciones.php?idUsuario=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
                "iduser": userId
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Data recibida:", data);
                if (data.codigo === 200) {
                    dispatch(cargarListaEvaluaciones(data.evaluaciones || []));
                } else {
                    console.error("Error de API:", data.mensaje);
                    dispatch(cargarListaEvaluaciones([]));
                }
            })
            .catch(error => {
                console.error("Error de conexión:", error);
                dispatch(cargarListaEvaluaciones([]));
            });
    }, [dispatch]);

    // Asegurar que evaluaciones sea siempre un array
    const evaluacionesArray = Array.isArray(evaluaciones) ? evaluaciones : [];

    return (
       <div>
      <h2>Lista de Evaluaciones</h2>
      {evaluacionesArray.length === 0 ? (
        <p>No hay evaluaciones disponibles</p>
      ) : (
        <ul>
          {evaluacionesArray.map((evaluacion) => {
            const objetivo = objetivos.find(
              (obj) => obj.id === evaluacion.idObjetivo
            );

            console.log("Evaluación:", evaluacion);
            console.log("Objetivo encontrado:", objetivo);

            return (
              <li key={evaluacion.id}>
                📊 {objetivo ? objetivo.nombre : "Objetivo desconocido"} -{" "}
                Calificación: {evaluacion.calificacion} - Fecha:{" "}
                {evaluacion.fecha}
              </li>
            );
          })}
        </ul>
      )}
    </div>
    );
}

export default ListaEvaluaciones;