import React, {useEffect, useState} from 'react';
import {getRemainingTime} from "./CountDownUtils";

const CountDown = ({date}) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime(date));
  const [expire, setExpire] = useState(false);

  useEffect(() => {
      const updateTime = () => {
        setRemainingTime(getRemainingTime(date))
      }
      const interval = window.setInterval(() => {
        updateTime()
      }, 1000)
      if (remainingTime.days <= 0 && remainingTime.hours <= 0 && remainingTime.minutes <= 0 && remainingTime.seconds <= 0) {
        window.clearInterval(interval)
        setExpire(true)
      }
      return () => {
        window.clearInterval(interval)
      };
    }, [date, remainingTime]
  )
  ;

  return (
    <span style={{ color: expire ? 'red' : '' }}>
      {!expire ?
        `${remainingTime.days > 0 ? remainingTime.days + 'jours' : ''} ${remainingTime.hours > 0 ? remainingTime.hours + 'heures' : ''} ${remainingTime.minutes > 0 ? remainingTime.minutes + 'minutes' : ''} et ${remainingTime.seconds} secondes`
        : `L'offre a expiré`
      }
    </span>
  );
};

export default CountDown;
