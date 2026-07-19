"use client";

import {useEffect, useState} from "react";

interface PropsType {
    targetDate: Date
}

interface TimeLeftType {
    second: string
    minute: string
    hour: string
    day: string
}


export default function Timer({targetDate}:PropsType){

    const formatNumber = (num: number): string => String(num).padStart(2, '0');

    const calcuteTimeLeft = (): TimeLeftType => {

        const deference = +new Date(targetDate) - +new Date();

        let timeLeft: TimeLeftType = {day:"00" , hour:"00" , minute:"00" , second:"00"}

        if(deference > 0){

            timeLeft = {
                day: formatNumber(Math.floor(deference / (1000 * 60 * 60 * 24))),
                hour : formatNumber(Math.floor((deference / (1000 * 60 * 60)) % 24)),
                minute : formatNumber(Math.floor((deference / (1000 * 60)) % 60)),
                second: formatNumber(Math.floor((deference / 1000) % 60))
            }
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState<TimeLeftType>(calcuteTimeLeft());

    useEffect(() => {
        setInterval(() => {
            setTimeLeft(calcuteTimeLeft)
        },1000)
    }, [targetDate]);

    return (
            <div className="flex flex-row items-end">
                <div className="flex flex-col items-center">
                    <span className="text-[11px] font-normal">Days</span>
                    <span className="">{timeLeft.day}</span>
                </div>
                <span className="relative">:</span>

                <div className="flex flex-col items-center">
                    <span className="text-[11px] font-normal">Hours</span>
                    <span className="">{timeLeft.hour}</span>
                </div>
                <span className="">:</span>

                <div className="flex flex-col items-center">
                    <span className="text-[11px] font-normal">Minutes</span>
                    <span className="">{timeLeft.minute}</span>
                </div>
                <span className="">:</span>

                <div className="flex flex-col items-center">
                    <span className="text-[11px] font-normal">Seconds</span>
                    <span className="">{timeLeft.second}</span>
                </div>
            </div>
    )


}