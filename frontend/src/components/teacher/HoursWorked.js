import React, { useState, useEffect } from 'react'
import axios from 'axios'
import getDatesForCurrentWeek from '../../utils/getDatesForCurrentWeek'
import indexOfSameDayInWeek from '../../utils/indexOfSameDayInWeek'
import formatDate from '../../utils/formatDate'
import Chart from 'react-apexcharts'

const HoursWorked = ({ teachers }) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const currentWeek = getDatesForCurrentWeek();
    const teacherNames = teachers?.length > 0 ? teachers.map((teacher) => {return `${teacher.firstName} ${teacher.lastName}`}) : [];
    const [options, setOptions] = useState({
        chart: {
            id: 'hoursWorked',
            type: 'column'
        },
        labels: teacherNames,
        yaxis: {
            title: {
              text: 'Hours',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " hours";
                }
                return y;
          
              }
            }
        }
    })
    const [series, setSeries] = useState([])

    const fetchAndUpdateReport = () => {
        axios.get(`${baseURL}/lessons`)
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    calculateHoursPerTeacher(resp.data)
                }
            })
            .catch(err => {
                console.log(err?.message || 'Unknown Error')
            });
    }

    const calculateHoursPerTeacher = (lessons) => {
        const hourTotals = teacherNames?.length > 0 ? teacherNames.map(t => {return 0}) : [];

        for (let i = 0; i < lessons.length; i++) {
            let lessonIdx = indexOfSameDayInWeek(lessons[i].date, currentWeek);
            if (lessonIdx !== -1) {
                let teacherIdx = teachers.findIndex((teacher) => teacher._id === lessons[i].teacherId)
                if (teacherIdx !== -1) {
                    hourTotals[teacherIdx] = hourTotals[teacherIdx] + (lessons[i].endTime - lessons[i].startTime);
                }
            }
        }
        console.log(hourTotals)
        setSeries([
            {
                name: 'Hours Worked',
                type: 'column',
                data: hourTotals
            },
        ])
    }

    useEffect(() => {
        fetchAndUpdateReport()
    }, [])

    return (
        <div>
            <h6>Hours Worked for {`${formatDate(currentWeek[0])} - ${formatDate(currentWeek[6])}`}</h6>
            <Chart options={options} series={series} type="bar" width={'100%'} height={620} />
        </div>
    )
}

export default HoursWorked