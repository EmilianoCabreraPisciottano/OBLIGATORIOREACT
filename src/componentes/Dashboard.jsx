import { useState } from "react";
import AgregarEvaluacion from "./AgregarEvaluacion";
import ListaEvaluaciones from "./ListaEvaluaciones";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const [data, setData] = useState(null);

    const navigate = useNavigate();

     const logout = () => {
        localStorage.clear()
        navigate("/");
    }

    return (
       <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Mi Panel de Objetivos 🎯</h2>
        <button onClick={logout} className="btn btn-outline-danger">
          Cerrar Sesión
        </button>
      </div>

      {/* Intro o mensaje de bienvenida */}
      <div className="alert alert-info shadow-sm rounded">
        <p className="mb-0">Aquí vas a poder registrar tus autoevaluaciones diarias, ver tu progreso y mucho más.</p>
      </div>

      {/* Contenedor de dos columnas */}
      <div className="row">
        {/* Columna para Agregar Evaluación */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">➕ Agregar Nueva Evaluación</h5>
              <AgregarEvaluacion />
            </div>
          </div>
        </div>

        {/* Columna para Lista de Evaluaciones */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">📋 Mis Evaluaciones</h5>
              <ListaEvaluaciones />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Dashboard;
