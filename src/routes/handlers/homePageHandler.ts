export const handlerHomePage = async (request, h) => { // содержимое handler можно вынести отдельно в ассинхронную функцию
    try {
        return h.file('form.html');
    }

    catch(error) {
        console.log('Ошибка возвращения главной страницы');
        console.log(error);
    }
}