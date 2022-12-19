<template>
    <Bar :chart-data="chartData" :options="options" id="bar-chart" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale );

export default{
    name: 'Chart',
    components: { Bar },
    props: ['stats', 'labels'],
    data(){
        return{
            options: {
                scales:{
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            chartData: {
                labels: this.labels,
                datasets: [{
                    label: 'Base Stats',
                    data: this.stats,
                    backgroundColor: ['red', 'orange', 'yellow', 'blue', 'green','pink']
                }]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#bar-chart{
    background-color: #FFF;
    border-radius: 15px;
}
</style>