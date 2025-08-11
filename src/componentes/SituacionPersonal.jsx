import { useSelector } from "react-redux";

const SituacionPersonal = () => {
  const evaluaciones = useSelector(state => state.evaluaciones.listaEvaluaciones);
  if (!Array.isArray(evaluaciones) || evaluaciones.length === 0) return <div>😐 Situación personal: Neutro</div>;
  const promedio = evaluaciones.reduce((acc, ev) => acc + Number(ev.calificacion || 0), 0) / evaluaciones.length;
  let emoji = "😐", texto = "Neutro";
  if (promedio > 0) { emoji = "😊"; texto = "Positiva"; }
  else if (promedio < 0) { emoji = "😞"; texto = "Negativa"; }
  return <div>{emoji} Situación personal: {texto}</div>;
};

export default SituacionPersonal;
