function wait(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}

async function fetchRetry(url, retries, delay) {
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return new Promise((resolve) => resolve(response.json()));
            }
            throw new Error(`${response.status}`);
        } catch (error) {
            lastError = error;
        }
        await wait(delay);
    }

    return new Promise((resolve, reject) => reject(lastError));
}

fetchRetry('ff', 10, 300)
    .catch((error) => {
        console.error('Возникла ошибка:', error.message);
    });

fetchRetry('https://jsonplaceholder.typicode.com/posts/1', 10, 300)
    .then((response) => {
        console.log(response);
        console.assert(response, 'Не удалось получить ответ');
    })
    .catch((error) => {
        console.error('Возникла ошибка:', error.message);
    });