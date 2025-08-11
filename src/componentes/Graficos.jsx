import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Graficos = () => {
  const evaluaciones = useSelector((state) => state.evaluaciones.listaEvaluaciones);
  const objetivos = useSelector((state) => state.evaluaciones.listaObjetivos);

  // 4.4.1: Cantidad de evaluaciones por objetivo (solo objetivos con evaluaciones)
  const objetivosConEvaluaciones = objetivos.filter((obj) =>
    evaluaciones.some((ev) => ev.idObjetivo === obj.id)
  );
  const dataCantidad = {
    labels: objetivosConEvaluaciones.map((obj) => obj.nombre),
    datasets: [
      {
        label: "Cantidad de Evaluaciones",
        data: objetivosConEvaluaciones.map(
          (obj) => evaluaciones.filter((ev) => ev.idObjetivo === obj.id).length
        ),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  // 4.4.2: Promedio de evaluaciones por objetivo (todos los objetivos)
  const dataPromedio = {
    labels: objetivos.map((obj) => obj.nombre),
    datasets: [
      {
        label: "Promedio de Evaluaciones",
        data: objetivos.map((obj) => {
          const evals = evaluaciones.filter((ev) => ev.idObjetivo === obj.id);
          if (evals.length === 0) return 0;
          return (
            evals.reduce((acc, ev) => acc + Number(ev.calificacion || 0), 0) /
            evals.length
          ).toFixed(2);
        }),
        backgroundColor: objetivos.map((obj) => {
          const evals = evaluaciones.filter((ev) => ev.idObjetivo === obj.id);
          if (evals.length === 0) return "#adb5bd";
          const prom = evals.reduce((acc, ev) => acc + Number(ev.calificacion || 0), 0) / evals.length;
          return prom >= 0 ? "#198754" : "#dc3545";
        }),
      },
    ],
  };

  return (
    <div className="row my-4">
      <div className="col-md-6 mb-4">
        <div className="card p-3">
          <h5 className="mb-3">Evaluaciones por Objetivo</h5>
          <Bar data={dataCantidad} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, precision: 0 } },
          }} />
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card p-3">
          <h5 className="mb-3">Promedio por Objetivo</h5>
          <Bar data={dataPromedio} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
          }} />
        </div>
      </div>
    </div>
  );
};

export default Graficos;
