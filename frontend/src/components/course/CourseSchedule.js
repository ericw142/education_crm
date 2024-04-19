import React from 'react'
import { ScheduleView } from 'react-schedule-view'

const CourseSchedule = () => {
    const daySchedule = [
        {
          name: "Friday",
          events: [
            {
              startTime: 16,
              endTime: 18,
              title: "Check-in",
              description:
                "Follow the signs to the registration desk inside the north entrance",
            },
            {
              startTime: 16.5,
              endTime: 17.75,
              title: "Dinner & Team Forming",
            },
            {
              startTime: 18,
              endTime: 19,
              title: "Opening Keynote",
            },
          ],
        },
        {
          name: "Saturday",
          events: [
            {
              startTime: 17,
              endTime: 19,
              title: "Next Day's Event",
            },
          ],
        },
    ];

    return (
        <div>
            <ScheduleView daySchedules={daySchedule} viewStartTime={15} viewEndTime={20} />
        </div>
    )
}

export default CourseSchedule