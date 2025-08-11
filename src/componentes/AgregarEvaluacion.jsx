
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useDispatch } from "react-redux";
import { agregarEvaluacion, cargarObjetivos } from "../store/slices/evaluacionesSlice";

const AgregarEvaluacion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [objetivos, setObjetivos] = useState([]);
  const UseObjetivo = useRef(null);
  const UseCalificacion = useRef(null);
  const UseFecha = useRef(null);

  useEffect(() => {
    const TraerObjetivos = async () => {
      try {
        const token = localStorage.getItem("token");
        const idUsu = localStorage.getItem("userId");
        console.log("Token:", token);
        console.log("User ID:", idUsu);
        
        if (!token || !idUsu) {
          setError("No hay sesión activa. Por favor, inicia sesión.");
          return;
        }

        console.log("Haciendo petición a objetivos...");
        const response = await fetch("https://goalify.develotion.com/objetivos.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             "token": token,
             "iduser": idUsu
          }
        });
        
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Objetivos recibidos:", data);
          if (data.codigo === 200 && data.objetivos) {
            console.log("Objetivos array:", data.objetivos);
            setObjetivos(data.objetivos);
            dispatch(cargarObjetivos(data.objetivos));
          } else {
            console.error("Error en respuesta:", data);
            setError("Error al obtener los objetivos: " + (data.mensaje || "Respuesta inválida"));
          }
        } else {
          console.error("Response not ok:", response.status);
          const errorData = await response.text();
          console.error("Error response:", errorData);
          setError("Error al obtener los objetivos: " + response.status);
        }
      } catch (err) {
        console.error("Error al conectar con la API de objetivos:", err);
        setError("Error de conexión con la API de objetivos");
      }
    };
    TraerObjetivos();
  }, []);

  const EnviarEvaluacion = async (e) => {
    e.preventDefault();// Evitar el envío del formulario por defecto 
    const campoObjetivo = UseObjetivo.current.value;
    const campoCalificacion = UseCalificacion.current.value;
    const campoFecha = UseFecha.current.value;

    if ( campoObjetivo && campoCalificacion && campoFecha) {
      try {
        // Se asume que el usuarioId se obtiene desde localStorage
        const usuarioId = localStorage.getItem("userId") ;
        const response = await fetch("https://goalify.develotion.com/evaluaciones.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token"),
            "iduser": usuarioId
          },
          body: JSON.stringify({
            idObjetivo: parseInt(campoObjetivo),           
            idUsuario: parseInt(usuarioId),  
            calificacion: parseInt(campoCalificacion),
            fecha: campoFecha  
          })
        });

        if (response.status === 200) {
            const responseData = await response.json();
            console.log("Evaluación creada:", responseData);
            
            // Limpiar el formulario
            UseObjetivo.current.value = "";
            UseCalificacion.current.value = "";
            UseFecha.current.value = new Date().toISOString().split('T')[0];
            
            // Dispatch para actualizar el estado
            dispatch(agregarEvaluacion({
              idObjetivo: parseInt(campoObjetivo),           
              idUsuario: parseInt(usuarioId),  
              calificacion: parseInt(campoCalificacion),
              fecha: campoFecha  
            }));

            setError("✅ Evaluación enviada exitosamente");
            setIsSuccess(true);
            
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
              setError("");
              setIsSuccess(false);
            }, 3000);

        } else {
          const errorData = await response.json();
          console.error("Error de API:", errorData);
          setError(`Error al enviar la evaluación: ${errorData.mensaje || 'Error desconocido'}`);
        }
      } catch (err) {
        console.error("Error al conectar con la API de evaluación:", err);
        setError("Error de conexión con la API de evaluación");
      }
    } else {
      setError("Por favor, complete todos los campos.");
    }
  };

  return (
    <div>
      <h6 className="mb-3">🎯 Nueva Evaluación</h6>
      <form onSubmit={EnviarEvaluacion}>
        <div className="mb-3">
          <label htmlFor="objetivo" className="form-label">
            <small className="fw-semibold">Objetivo</small>
          </label>
          <select className="form-select form-select-sm" id="objetivo" ref={UseObjetivo}>
            <option value="">
              {objetivos.length === 0 ? "Cargando objetivos..." : "Seleccione un objetivo"}
            </option>
            {objetivos && objetivos.length > 0 ? (
              objetivos.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))
            ) : (
              <option disabled>No hay objetivos disponibles</option>
            )}
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="calificacion" className="form-label">
            <small className="fw-semibold">Calificación (-5 a +5)</small>
          </label>
          <select className="form-select form-select-sm" id="calificacion" ref={UseCalificacion}>
            <option value="">Seleccione</option>
            <option value="-5">-5 (Muy malo)</option>
            <option value="-4">-4</option>
            <option value="-3">-3</option>
            <option value="-2">-2</option>
            <option value="-1">-1</option>
            <option value="0">0 (Neutral)</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
            <option value="5">+5 (Excelente)</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            <small className="fw-semibold">Fecha</small>
          </label>
          <input 
            type="date" 
            className="form-control form-control-sm" 
            id="fecha" 
            ref={UseFecha}
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-sm">
            ✅ Guardar Evaluación
          </button>
        </div>
      </form>
      
      {error && (
        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} alert-dismissible fade show mt-3`} role="alert">
          <small>{error}</small>
        </div>
      )}
    </div>
  );
};

export default AgregarEvaluacion;