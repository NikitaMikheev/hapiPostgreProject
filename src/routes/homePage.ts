// Рут, возвращающий главную страницу с формой
export = ({ // тест swagger, все работает
    method: 'GET',
    path: '/',
    options: {
        description: 'Get запрос',
        notes: 'Возвращает главную страницу',
        tags: ['api']
    },
    handler: function (request, h) { // содержимое handler можно вынести отдельно в ассинхронную функцию
        try {
            return h.file('form.html');
        }

        catch(error) {
            console.log('Ошибка возвращения главной страницы');
            console.log(error);
        }
    }
});