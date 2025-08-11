import { useSelector } from "react-redux";

const PuntajeGlobal = () => {
  const evaluaciones = useSelector(state => state.evaluaciones.listaEvaluaciones);
  if (!Array.isArray(evaluaciones) || evaluaciones.length === 0) return <div>Puntaje global: 0</div>;
  const promedio = (evaluaciones.reduce((acc, ev) => acc + Number(ev.calificacion || 0), 0) / evaluaciones.length).toFixed(2);
  
  return <div>Puntaje global: <b>{promedio}</b></div>;
};

export default PuntajeGlobal;
