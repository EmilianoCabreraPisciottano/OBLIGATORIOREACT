import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"  
import { cargarListaEvaluaciones } from "../store/slices/evaluacionesSlice";

const ListaEvaluaciones = () => {
    const dispatch = useDispatch();
    const evaluaciones = useSelector(state => state.evaluaciones.listaEvaluaciones);

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
            <h6 className="mb-3">📊 Evaluaciones Recientes</h6>
            {evaluacionesArray.length === 0 ? (
                <div className="text-muted text-center py-3">
                    <i className="fas fa-inbox mb-2"></i>
                    <p className="mb-0">No hay evaluaciones disponibles</p>
                </div>
            ) : (
                <div className="list-group list-group-flush">
                    {evaluacionesArray.map(evaluacion => (
                        <div key={evaluacion.id} className="list-group-item border-0 px-0 py-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    <span className="me-2">{evaluacion.emoj || '📊'}</span>
                                    <small className="text-muted">{evaluacion.nombre}</small>
                                </div>
                                <span className={`badge ${evaluacion.calificacion >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                    {evaluacion.calificacion > 0 ? '+' : ''}{evaluacion.calificacion}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaEvaluaciones;