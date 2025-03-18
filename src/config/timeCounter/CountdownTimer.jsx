import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import {useCountdown} from "./useCountdown";

const ShowCounter = ({days, hours, minutes, seconds}) => {
    return (
        <div className="show-counter">
            <div className="countdown-link pb-0">
                <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3}/>
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false}/>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false}/>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false}/>
            </div>
        </div>
    );
};

const CountdownTimer = ({targetDate}) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    if (days + hours + minutes + seconds <= 0) {
        return (
            <ShowCounter
                days={0}
                hours={0}
                minutes={0}
                seconds={0}
            />
        );
    } else {
        return (
            <ShowCounter
                days={days.toString()}
                hours={hours.toString()}
                minutes={minutes.toString()}
                seconds={seconds.toString()}
            />
        );
    }
};

export default CountdownTimer;
