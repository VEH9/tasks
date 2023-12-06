import { useState, useEffect, useRef } from 'react';

const userEndpoint = 'https://api.github.com/users';
export const useGithub = (username: string) => {
    const [user, setUser] = useState<Object | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(user);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${userEndpoint}/${username}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.log(response)
                    // @ts-ignore
                    throw new Error(`${response.status} ${errorText}`);
                }
                const data = await response.json();
                setUser(data);
                setError(null);
            } catch (error) {
                // @ts-ignore
                setError(error.message);
                setUser(null);
            }
        };

        setIsLoading(true);
        fetchData().finally(() => setIsLoading(false));
    }, [username]);

    return { user, isLoading: isLoading, error };
};