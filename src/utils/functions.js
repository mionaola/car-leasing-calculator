export const sendForm = async (url, data, setIsFormSent) => {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch (error) {
        console.log(error);
        setIsFormSent(false);
    }
}