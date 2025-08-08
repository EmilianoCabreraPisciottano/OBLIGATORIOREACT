import { Chart as ChartJS,CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend,PointElement,LineElement } from 'chart.js';
import { use, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);



const Graficos = () => {

   useEffect(() => {
    fetch("https://goalify.develotion.com/evaluaciones.php", {
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
        })
          .then(response => response.json())
          .then(data => {
            // Aquí puedes manejar la respuesta de la API y actualizar el estado
          })
          .catch(error => {
            console.error("Error al cargar las evaluaciones:", error);
          });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Gráficas</h2>
      <p>Aquí se mostrarán las gráficas de las evaluaciones.</p>
      <div className='row'>
        <div className='col-6'>
          <h2>Análisis de Evaluaciones</h2>
            <Bar data={data} options={options} />
        </div>
      </div>
      {/* Aquí puedes agregar tus componentes de gráficas */}
    </div>
  );
}

export default Graficos;