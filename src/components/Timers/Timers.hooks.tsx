import React, {createContext, useContext} from 'react';
import {TimerAction, TimerState} from "./Timer.reducer";


export type TimerContextProps = {
    timers: TimerState[];
    dispatch: React.Dispatch<TimerAction>;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const useTimerContext = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('контекст не найден');
    }
    return context;
};

export default TimerContext;