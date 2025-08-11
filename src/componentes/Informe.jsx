import PuntajeGlobal from "./PuntajeGlobal";
import PuntajeDiario from "./PuntajeDiario";
import SituacionPersonal from "./SituacionPersonal";

const Informe = () => {
  return (
    <div className="card p-4 my-4">
      <h3 className="mb-3">Informe de Cumplimiento de Objetivos</h3>
      <div className="mb-2">
        <PuntajeGlobal />
      </div>
      <div className="mb-2">
        <PuntajeDiario />
      </div>
      <div className="mb-2">
        <SituacionPersonal />
      </div>
    </div>
  );
};

export default Informe;
