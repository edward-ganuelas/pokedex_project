<script>
import 'chart.js/auto';
import { Bar } from 'vue-chartjs/legacy';
export default{
    name: 'Chart',
    extends: Bar,
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
            data:{
                labels: this.labels,
                datasets: [{
                    label: 'Base Stats',
                    data: this.stats,
                    backgroundColor: ['red', 'orange', 'yellow', 'blue', 'green','pink']
                }]
            }
        }
    },
    mounted(){
        this.renderChart(this.data, this.options);
    }
}
</script>
<style lang="scss" scoped>
#bar-chart{
    background-color: #FFF;
    border-radius: 15px;
}
</style>