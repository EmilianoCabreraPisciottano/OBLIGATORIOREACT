import { useSelector } from "react-redux";

const PuntajeDiario = () => {
  const evaluaciones = useSelector(state => state.evaluaciones.listaEvaluaciones);
  const hoy = new Date().toISOString().slice(0, 10);
  const evalsHoy = Array.isArray(evaluaciones)
    ? evaluaciones.filter(ev => (ev.fecha || '').slice(0, 10) === hoy)
    : [];
  if (evalsHoy.length === 0) return <div>Puntaje diario: 0</div>;
  const promedio = (
    evalsHoy.reduce((acc, ev) => acc + Number(ev.calificacion || 0), 0) / evalsHoy.length
  ).toFixed(2);
  return <div>Puntaje diario: <b>{promedio}</b></div>;
};

export default PuntajeDiario;
