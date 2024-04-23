import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ScheduleView } from 'react-schedule-view'
import getDatesForCurrentWeek from '../../utils/getDatesForCurrentWeek'
import indexOfSameDayInWeek from '../../utils/indexOfSameDayInWeek'

const CourseSchedule = () => {
    const currentWeek = getDatesForCurrentWeek();
    const [daySchedule, setDaySchedule] = useState([
        {
            name: 'Sunday',
            events: []
        },
        {
            name: 'Monday',
            events: []
        },
        {
            name: 'Tuesday',
            events: []
        },
        {
            name: 'Wednesday',
            events: []
        },
        {
            name: 'Thursday',
            events: []
        },
        {
            name: 'Friday',
            events: []
        },
        {
            name: 'Saturday',
            events: []
        },
    ]);

    const fetchAndUpdateLessonInfo = () => {
        axios.get('http://localhost:3500/lessons')
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    calculateSchedule(resp.data)
                }
            })
            .catch(err => {
                console.log(err?.message || 'Unknown Error')
            });
    }

    const calculateSchedule = (lessons) => {
        const schedule = [
            {
                name: 'Sunday',
                events: []
            },
            {
                name: 'Monday',
                events: []
            },
            {
                name: 'Tuesday',
                events: []
            },
            {
                name: 'Wednesday',
                events: []
            },
            {
                name: 'Thursday',
                events: []
            },
            {
                name: 'Friday',
                events: []
            },
            {
                name: 'Saturday',
                events: []
            },
        ];

        for (let i = 0; i < lessons.length; i++) {
            let lessonIdx = indexOfSameDayInWeek(lessons[i].date, currentWeek);
            if (lessonIdx !== -1) {
                schedule[lessonIdx].events.push({
                    startTime: parseInt(lessons[i].startTime),
                    endTime: parseInt(lessons[i].endTime),
                    title: lessons[i].title,
                    description: lessons[i].description
                })
            }
        }

        setDaySchedule(schedule);
    }

    useEffect(() => {
        fetchAndUpdateLessonInfo()
    }, [])

    return (
        <div>
            <ScheduleView daySchedules={daySchedule} viewStartTime={8} viewEndTime={21} />
        </div>
    )
}

export default CourseSchedule