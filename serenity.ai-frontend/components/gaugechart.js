import{
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  // Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(
  ArcElement,
  Tooltip,
  // Legend
)

const GaugeChart = ({ value }) => {

  function getGradient(chart) {
    const {ctx , chartArea :{top,bottom,left,right}} = chart;
    const gradientSegment = ctx.createLinearGradient(left,0,right,0);
    gradientSegment.addColorStop(0,'green');
    gradientSegment.addColorStop(0.5,'orange');
    gradientSegment.addColorStop(1,'red');
    return gradientSegment;
  }

  const data = {
    labels: ['DepressionScore',''],
    datasets: [
      {
        label : 'Score',
        data: [value,21-value],
        backgroundColor: (context)=>{
          const chart = context.chart;
          const {ctx , chartArea} = chart;
          if(!chartArea){
            return null;
          }
          if(context.dataIndex === 0){
            return getGradient(chart);
          }else{
            return '#F5F5F5';
          }
        },
        borderWidth:0,
        circumference : 180,
        rotation : 270
      },
    ],
  };

  const options = {

  };

  const gaugeText = {
    id : 'gaugeText',
    beforeDatasetsDraw(chart , args, pluginOptions){
      const {ctx , chartArea : {top , bottom ,left , right,width , height}} = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle = 'orange';
      ctx.font = 'bold 25px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'baseline';
      ctx.fillText(`${value}`,xCenter,yCenter);
    }
  }

  return <Doughnut data={data} options={options} plugins = {[gaugeText]} />;
};

export default GaugeChart;