import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function Default(props) {
    const { data } = props
    return (
        <Bar
            data={data}
            options={{
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: data.title,
                        },
                    },
                },
            }}
        />
    )
}
