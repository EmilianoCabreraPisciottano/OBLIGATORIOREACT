import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Clima = () => {

    const navigate = useNavigate();
    const [pronostico, setPronostico] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("usuario") === null) {
            navigate("/");
        }

        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=-34&lon=-56&appid=764a496e4b4fb2978c4ba1ba2021a336&units=metric")
            .then(r => r.json())
            .then(datos => {
                console.log(datos);
                setPronostico(datos.list)
            })
    }, [])


    return (
        <div>
            <h2>Clima</h2>
            <p>Texto de prueba</p>
            <hr />
            <Bar options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Clima Montevideo',
                    },
                },
            }} data={{
                labels: pronostico.map((e, i) => i),
                datasets: [
                    {
                        label: 'Temperatura',
                        data: pronostico.map(t => t.main.temp),
                        backgroundColor: 'rgba(20, 27, 66, 0.5)',
                    },
                ],
            }} />;
        </div>
    )
}

export default Clima
