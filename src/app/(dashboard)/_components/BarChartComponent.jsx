
'use client'

import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement, PointElement, Legend, Title, plugins, Tooltip } from 'chart.js'
import { useEffect, useState } from "react"

ChartJS.register(
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
    Legend,
    Title,
    Tooltip
)

export const BarChartComponent = ({ data }) => {
    const [labelsName, setLabelsName] = useState([]);
    const [chartNumber, setChartNumber] = useState();

    useEffect(() => {
        const labels = data.map(x => x.cateName);
        setLabelsName(labels);
    }, [data]);

    useEffect(() => {
        const numberChart = data.map(x => Math.floor(x.count));
        setChartNumber(numberChart);
    }, [data]);

    const chartData = {
        labels: labelsName,
        datasets: [
            {
                label: 'Event',
                data: chartNumber,
                borderColor: '#7939EF',
                backgroundColor: '#7939EF',
                tension: 0.3
            }
        ]
    }

    const chartOptions = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    return (
        <div className="bg-white w-full" >
            <div className="hidden 2xl:block">
                <Line data={chartData} options={chartOptions} height={"100%"} />
            </div>
            <div className="md:hidden">
                <Line data={chartData} options={chartOptions} height={"300%"} />
            </div>
            <div className="hidden md:block 2xl:hidden">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div >
    )
}