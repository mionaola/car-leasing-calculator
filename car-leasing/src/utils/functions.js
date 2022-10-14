export const sendForm = async (url, data, setIsFormSent) => {

    try {
        const response = await fetch(url, { //Не понимаю, почему ссылка возвращает ошибку, разными сопсобами пробовала обращаться к API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            //Даже с модом no-cors возвращает ошибку
        });

        return await response.json();
    } catch (error) {
        console.log(error);
        setIsFormSent(false);
    }
}