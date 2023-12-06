import React, {useEffect, useReducer} from "react";
import styles from './Timers.module.css';
import TimerContext, {useTimerContext} from "./Timers.hooks";
import {timerReducer} from "./Timer.reducer";

export type TimerProps = {
    timerId: number;
};

export const Timer = ({timerId}: TimerProps) => {
    const { timers, dispatch } = useTimerContext();
    const timer = timers.find((t) => t.timerId === timerId);

    useEffect(() => {
        if (!timers) {
            return;
        }

        const interval = setInterval(() => {
            if (timer && timer.isRunning) {
                dispatch({ type: 'TICK', timerId });
            }
        }, 100);

        return () => clearInterval(interval);
    }, [dispatch, timerId, timer, timers]);

    const handleStartPause = () => {
        dispatch({ type: 'START_PAUSE', timerId });
    };

    const handleReset = () => {
        dispatch({ type: 'RESET', timerId });
    };

    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        const remainingMilliseconds = (milliseconds % 1000).toString().padStart(3, '0');
        return `${minutes}:${seconds}.${remainingMilliseconds}`;
    };

    return (
        <div className={styles.wrapper}>
            <button onClick={handleStartPause}>{timer?.isRunning ? 'Пауза' : 'Старт'}</button>
            <button onClick={handleReset}>Сброс</button>
            <div className={styles.time}>{formatTime(timer ? timer.time : 0)}</div>
        </div>
    )
}

export type TimerListProps = {
    timerIds: number[];
};

export const TimerList = ({ timerIds }: TimerListProps) => {
    return (
        <div>
            {timerIds.map((id) => (
                <Timer key={id} timerId={id} />
            ))}
        </div>
    );
};
export const TimerControls = () => {
    const { dispatch } = useTimerContext();

    const handleStartAll = () => {
        dispatch({ type: 'START_ALL' });
    };

    const handlePauseAll = () => {
        dispatch({ type: 'PAUSE_ALL' });
    };

    const handleResetAll = () => {
        dispatch({ type: 'RESET_ALL' });
    };

    return (
        <div>
            <button onClick={handleStartAll}>запустить все</button>
            <button onClick={handlePauseAll}>остановить все</button>
            <button onClick={handleResetAll}>сбросить все</button>
        </div>
    );
};

export type TimersProps = {
    timersCount: number;
}
export const Timers = ({timersCount}: TimersProps) => {
    const timerIds = Array.from(Array(timersCount).keys());
    const [timers, dispatch] = useReducer(timerReducer, []);

    useEffect(() => {
        if (timers.length === 0) {
            const initialTimers = timerIds.map((timerId) => ({
                timerId,
                time: 0,
                isRunning: false,
            }));

            dispatch({ type: 'INITIALIZE_TIMERS', timers: initialTimers });
        }
    }, [dispatch, timerIds, timers]);

    return (
        <TimerContext.Provider value={{ timers, dispatch }}>
            <TimerList timerIds={timerIds} />
            <TimerControls />
        </TimerContext.Provider>
    );
}