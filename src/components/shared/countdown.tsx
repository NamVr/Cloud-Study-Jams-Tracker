"use client"

import { useState, useEffect } from "react";

type TimeUnit = "Days" | "Hours" | "Minutes" | "Seconds";

const TimeBlock = ({ value, unit }: { value: number; unit: TimeUnit }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl md:text-4xl font-bold text-primary">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-xs text-muted-foreground">{unit}</div>
  </div>
);

export function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex space-x-4 md:space-x-8">
      <TimeBlock value={timeLeft.days} unit="Days" />
      <TimeBlock value={timeLeft.hours} unit="Hours" />
      <TimeBlock value={timeLeft.minutes} unit="Minutes" />
      <TimeBlock value={timeLeft.seconds} unit="Seconds" />
    </div>
  );
}
