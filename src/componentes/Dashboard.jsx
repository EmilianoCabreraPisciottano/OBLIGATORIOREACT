import { useState } from "react";
import AgregarEvaluacion from "./AgregarEvaluacion";
import ListaEvaluaciones from "./ListaEvaluaciones";
import Graficos from "./Graficos";
import Informe from "./Informe";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

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
        <p className="mb-0">
          Aquí vas a poder registrar tus autoevaluaciones diarias, ver tu
          progreso y mucho más.
        </p>
      </div>

      {/* Grilla 2x2 para las 4 ventanas */}
      <div className="row g-4">
        {/* Agregar Evaluación */}
        <div className="col-md-6 d-flex">
          <div className="card shadow-sm flex-fill h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">
                ➕ Agregar Nueva Evaluación
              </h5>
              <AgregarEvaluacion />
            </div>
          </div>
        </div>
        {/* Lista de Evaluaciones */}
        <div className="col-md-6 d-flex">
          <div className="card shadow-sm flex-fill h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">📋 Mis Evaluaciones</h5>
              <ListaEvaluaciones />
            </div>
          </div>
        </div>
        {/* Informe de Progreso */}
  <div className="col-md-4 d-flex">
          <div className="card shadow-sm flex-fill h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">
                📊 Informe de Progreso
              </h5>
              <p className="text-muted">
                Aquí podrás ver un resumen de tu situación personal y puntajes globales.
              </p>
              <Informe />
            </div>
          </div>
        </div>
        {/* Gráficos de Evaluaciones */}
  <div className="col-md-8 d-flex">
          <div className="card shadow-sm flex-fill h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary">
                📈 Gráficos de Evaluaciones
              </h5>
              <p className="text-muted">
                Visualiza la cantidad y el promedio de tus evaluaciones por objetivo.
              </p>
              <Graficos />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
