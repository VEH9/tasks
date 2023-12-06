import React, {ChangeEvent, useState} from "react";
import styles from './Heroes.module.css';

type Hero = {
    name: string,
};

export const Heroes = () => {
    const [heroesName, setHeroesName] = useState<string>('');
    const [heroesList, setHeroesList] = useState<Hero[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function getPeople(search: string, page = 1, options = {}) {
        return fetch(`https://swapi.dev/api/people?search=${search}&page=${page}`, options)
            .then((res) => res.json())
            .then((data) => data)
    }
    const handleClick = async () => {
        setIsLoading(true);
        getPeople(heroesName).then(data => setHeroesList(data.results)).finally(() => setIsLoading(false));
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHeroesName(event.target.value);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <input value={heroesName} onChange={handleChange}/>
                <button onClick={handleClick}>Найти</button>

            </div>
            <div className={styles.results}>
                {isLoading ? 'Загрузка..' :
                    heroesList.map(hero =>
                        <div key={hero.name} className={styles.name}>
                            {hero.name}
                        </div>)
                }
            </div>
        </>
    )
}