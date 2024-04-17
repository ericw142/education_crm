import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import getDatesForCurrentWeek from '../../utils/getDatesForCurrentWeek';
import formatDate from '../../utils/formatDate';

const PipelineByWeek = ({ students }) => {
    const currentWeek = getDatesForCurrentWeek();
    const [options, setOptions] = useState({
        chart: {
          id: 'pipelineByMonthReport',
          stacked: true,
          type: 'line'
        },
        labels: currentWeek,
        stroke: {
            width: [0, 1, 1, 1, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
              columnWidth: '50%'
            }
        },  
        fill: {
            opacity: [0.4, 1, 1, 1, 1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
        },
        markers: {
            size: 0
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
              text: 'Students',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " students";
                }
                return y;
          
              }
            }
        }
    })
    const [series, setSeries] = useState([
        {
            name: 'New Leads',
            type: 'area',
            data: [10,14,8,4,9,11,5]
        },
        {
            name: 'Contacted',
            type: 'column',
            data: [5,7,3,6,7,9,2]
        },
        {
            name: 'Interested',
            type: 'column',
            data: [1,1,1,1,1,1,1]
        },
        {
            name: 'Application Started',
            type: 'column',
            data: [1,1,1,1,1,1,1]
        },
        {
            name: 'Enrolled',
            type: 'line',
            data: [0,0,1,0,3,4,1]
        },
    ])

    return (
        <div>
            <h6>Pipeline for {`${formatDate(currentWeek[0])} - ${formatDate(currentWeek[6])}`}</h6>
            <Chart options={options} series={series} type="bar" width={'100%'} height={620} />
        </div>
    )
}

export default PipelineByWeek