import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import getDatesForCurrentWeek from '../../utils/getDatesForCurrentWeek';
import formatDate from '../../utils/formatDate';
import indexOfSameDayInWeek from '../../utils/indexOfSameDayInWeek';

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
    const [series, setSeries] = useState([])

    const calculateTotalsByStatus = () => {
        const newLeadsTotals = [0,0,0,0,0,0,0];
        const contactedTotals = [0,0,0,0,0,0,0];
        const interestedTotals = [0,0,0,0,0,0,0];
        const appStartedTotals = [0,0,0,0,0,0,0];
        const enrolledTotals = [0,0,0,0,0,0,0];

        for (let i = 0; i < students.length; i++) {
            let newLeadIdx = indexOfSameDayInWeek(students[i].createdDate, currentWeek);
            let contactedIdx = indexOfSameDayInWeek(students[i].contactedDate, currentWeek);
            let interestedIdx = indexOfSameDayInWeek(students[i].interestedDate, currentWeek);
            let appStartedIdx = indexOfSameDayInWeek(students[i].applicationStartedDate, currentWeek);
            let enrolledIdx = indexOfSameDayInWeek(students[i].enrollmentDate, currentWeek);

            if (newLeadIdx !== -1) newLeadsTotals[newLeadIdx]++;
            if (contactedIdx !== -1) contactedTotals[contactedIdx]++;
            if (interestedIdx !== -1) interestedTotals[interestedIdx]++;
            if (appStartedIdx !== -1) appStartedTotals[appStartedIdx]++;
            if (enrolledIdx !== -1) enrolledTotals[enrolledIdx]++;
        }

        setSeries([
            {
                name: 'New Leads',
                type: 'area',
                data: newLeadsTotals
            },
            {
                name: 'Contacted',
                type: 'column',
                data: contactedTotals
            },
            {
                name: 'Interested',
                type: 'column',
                data: interestedTotals
            },
            {
                name: 'Application Started',
                type: 'column',
                data: appStartedTotals
            },
            {
                name: 'Enrolled',
                type: 'line',
                data: enrolledTotals
            },
        ])
    }

    useEffect(() => {
        calculateTotalsByStatus()
    }, [])

    return (
        <div>
            <h6>Pipeline for {`${formatDate(currentWeek[0])} - ${formatDate(currentWeek[6])}`}</h6>
            <Chart options={options} series={series} type="bar" width={'100%'} height={620} />
        </div>
    )
}

export default PipelineByWeek