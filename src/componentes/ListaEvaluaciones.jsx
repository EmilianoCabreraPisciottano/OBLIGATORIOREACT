import { useEffect, useState } from "react"
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


    // Filtro de fechas
    const [filtro, setFiltro] = useState('historico');

    // Función para filtrar evaluaciones según el filtro seleccionado
    const filtrarPorFecha = (evaluaciones) => {
      if (filtro === 'historico') return evaluaciones;
      const ahora = new Date();
      return evaluaciones.filter(evaluacion => {
        const fechaEval = new Date(evaluacion.fecha);
        if (filtro === 'semana') {
          const hace7dias = new Date(ahora);
          hace7dias.setDate(ahora.getDate() - 7);
          return fechaEval >= hace7dias && fechaEval <= ahora;
        }
        if (filtro === 'mes') {
          const hace1mes = new Date(ahora);
          hace1mes.setMonth(ahora.getMonth() - 1);
          return fechaEval >= hace1mes && fechaEval <= ahora;
        }
        return true;
      });
    };

    // Asegurar que evaluaciones sea siempre un array y aplicar filtro
    const evaluacionesArray = filtrarPorFecha(Array.isArray(evaluaciones) ? evaluaciones : []);

    return (
      <div>
        <h2>Lista de Evaluaciones</h2>
        <div className="mb-3">
          <label className="form-label me-2">Filtrar por:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          >
            <option value="semana">Última semana</option>
            <option value="mes">Último mes</option>
            <option value="historico">Histórico</option>
          </select>
        </div>
        {evaluacionesArray.length === 0 ? (
          <p>No hay evaluaciones disponibles</p>
        ) : (
          <ul>
            {evaluacionesArray.map((evaluacion) => {
              const objetivo = objetivos.find(
                (obj) => obj.id === evaluacion.idObjetivo
              );

              const handleEliminar = () => {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!token || !userId) {
                  console.log("No hay sesión activa");
                  return;
                }
                fetch(`https://goalify.develotion.com/evaluaciones.php?idUsuario=${userId}&idEvaluacion=${evaluacion.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "token": token,
                    "iduser": userId
                  }
                })
                  .then(response => response.json())
                  .then(data => {
                    if (data.codigo === 200) {
                      dispatch({ type: 'evaluaciones/eliminarRegistro', payload: { id: evaluacion.id } });
                    } else {
                      console.error("Error al eliminar:", data.mensaje);
                    }
                  })
                  .catch(error => {
                    console.error("Error de conexión al eliminar:", error);
                  });
              };

              return (
                <li key={evaluacion.id} className="d-flex align-items-center justify-content-between border-bottom py-2">
                  <span>
                    📊 {objetivo ? objetivo.nombre : "Objetivo desconocido"} - Calificación: {evaluacion.calificacion} - Fecha: {evaluacion.fecha}
                  </span>
                  <button
                    onClick={handleEliminar}
                    className="btn btn-danger btn-sm ms-3 fw-bold"
                    type="button"
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
}

export default ListaEvaluaciones;