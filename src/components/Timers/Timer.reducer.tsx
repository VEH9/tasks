export type TimerState = {
    timerId: number;
    time: number;
    isRunning: boolean;
}

export type TimerAction =
    | { type: 'TICK'; timerId: number }
    | { type: 'START_PAUSE'; timerId: number }
    | { type: 'RESET'; timerId: number }
    | { type: 'START_ALL' }
    | { type: 'PAUSE_ALL' }
    | { type: 'RESET_ALL' }
    | { type: 'INITIALIZE_TIMERS'; timers: TimerState[] };

export const timerReducer = (state: TimerState[], action: TimerAction): TimerState[] => {
    switch (action.type) {
        case 'TICK':
            return state.map((timer) =>
                timer.timerId === action.timerId && timer.isRunning
                    ? { ...timer, time: timer.time + 100 }
                    : timer
            );

        case 'START_PAUSE':
            return state.map((timer) =>
                timer.timerId === action.timerId
                    ? { ...timer, isRunning: !timer.isRunning }
                    : timer
            );

        case 'RESET':
            return state.map((timer) =>
                timer.timerId === action.timerId ? { ...timer, time: 0 } : timer
            );

        case 'START_ALL':
            return state.map((timer) => ({ ...timer, isRunning: true }));

        case 'PAUSE_ALL':
            return state.map((timer) => ({ ...timer, isRunning: false }));

        case 'RESET_ALL':
            return state.map((timer) => ({ ...timer, time: 0, isRunning: false }));

        case 'INITIALIZE_TIMERS':
            return [...action.timers];

        default:
            return state;
    }
};