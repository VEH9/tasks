import React, {ChangeEvent, useState} from 'react';
import './App.css';
import { Timers } from "./components/Timers/Timers";
import {Heroes} from "./components/Heroes/Heroes";
import {useGithub} from "./hooks/useGitHub/useGitHub";

function App() {
    const [username, setUsername] = useState<string>('');

    const { user, isLoading, error } = useGithub(username);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

  return (
    <div className="App">
        <div className="App-header">
            {/*<Timers timersCount={3}/>*/}
            {/*<Heroes/>*/}
            <input onChange={handleChange}/>
            <div>
                {isLoading ? <div>Загрузка...</div> : error ? <div>Ошибка: {error}</div> : <div>{JSON.stringify(user)}</div>}
            </div>
        </div>
    </div>
  );
}

export default App;
