import { color } from "global"
import { useNavigate } from "react-router-dom"

export default () => {
    const [chartData, setChartData] = useState({
        labels: ['Pending', 'Partial', 'Completed', 'Cancelled'],
        datasets: [
            {
                label: 'Number of Orders',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    color,
                    color,
                    color,
                    color,
                ],
            },
        ],
        title:'Number of Orders'
    })
    const [chart1Data, setChart1Data] = useState({
        labels: ['Pending', 'Partial', 'Completed', 'Cancelled'],
        datasets: [
            {
                label: 'Number of Mass Orders',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    color,
                    color,
                    color,
                    color,
                ],
            },
        ],
        title: 'Orders By Status',
    })
    let navigator = useNavigate()
    const getData = async () => {
        try {
            //     await fetch(`${baseUrl}workout_plan_exersises/getExerciseCountByGoal`).then(res => res.json()).then(response => {
            //       console.log(response)
            //       if (response.status) {
            //         console.log(response.result)
            //         setChartData({
            //           labels: ['Weight Loss', 'Get Fitter', 'Gain Muscle'],
            //           datasets: [
            //             {
            //               label: 'Number of Exercises',
            //               data: [response.result?.weight_loss, response.result?.get_fitter, response.result?.gain_muscle],
            //               backgroundColor: [
            //                 'orange',
            //                 'orange',
            //                 'orange',
            //               ],
            //             },
            //           ],
            //         })
            //       }
            //     }).catch(err => {
            //       console.log(err)
            //       navigator(`/${basePath}/error`);
            //   })
            //   await fetch(`${baseUrl}meal/getMealCountByMealType`).then(res => res.json()).then(response => {
            //     console.log(response)
            //     if (response.status) {

            //       setChart1Data({
            //         labels: ['Breakfast', 'Lunch', 'Snack', 'dinner'],
            //         datasets: [
            //           {
            //             label: 'Number of Foods',
            //             data: [response.result.breakfast, response.result.lunch, response.result.snack, response.result.dinner],
            //             backgroundColor: [
            //               'orange',
            //               'orange',
            //               'orange',
            //               'orange',
            //             ],
            //           },
            //         ],
            //       })
            //     }
            //   }).catch(err => {
            //     console.log(err)
            //     navigator(`/${basePath}/error`);
            // })
        } catch (err) {
            console.log(err)
            navigator(`/${basePath}/error`);
        }
    }
    return {
        getData,
        chartData,
        chart1Data
    }
}