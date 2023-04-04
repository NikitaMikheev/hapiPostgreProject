import { functionGet } from "../../model/bdMethod/functionGet";
import { functionPost } from "../../model/bdMethod/functionPost";
import { functionPut } from "../../model/bdMethod/functionPut";
import { functionDel } from "../../model/bdMethod/functionDelete";
import { myUser } from "../../types/type";

export const handlerGet = async (request, h) => {
    try {
        try {
            const user = JSON.parse(await functionGet(request.query.id));
            console.log(`Пользователь получен: ${user.firstName} ${user.lastName}`);
        
            return `Имя: ${user.firstName} <br> Фамилия: ${user.lastName} <br> E-mail: ${user.userEmail} <br> Возраст: ${user.age}`;
        }
        catch {
            return 'Такого пользователя не существует!';
        }

    }

    catch(error) {
        console.log('Ошибка GET запроса');
        console.log(error);
    }
}

export const handlerPost = async (request, h) => { // добавление пользователя через форму 
    try {

        let formObj:myUser = {
            firstName: request.payload.userName,
            lastName: request.payload.userLastName,
            userEmail: request.payload.userEmail,
            userPass: request.payload.userPass,
            userPassConfm: request.payload.userPassConfm,
            age: parseInt(request.payload.userAge)
        }
    
        const res = await functionPost(formObj);

        if(res===false) {
            return 'Пароли не совпадают!';
        }

        return h.file('form.html');
    }

    catch(error) {
        console.log('Ошибка POST запроса');
        console.log(error);
    }
}

export const handlerPut = async (request, h) => {
    try {
        const ID = request.params.id;

        if(await functionPut(ID, request.payload)) {
            return 'Такого пользователя не существует!';
        }
        return 'Изменения сохранены!';
    }
    catch(error) {
        console.log('Ошибка PUT запроса');
        console.log(error);
        
    }
}

export const handlerDel = async (request, h) => { // удаляем пользователя по запросу (например, через Insomnia), в качестве параметров (через /) передаем id
    try {
        const ID = request.params.id;
        if(await functionDel(ID)) {
            return 'Такого пользователя не существует!';
        }
        console.log("Пользователь удален!");
        return h.file('form.html');
    }

    catch(error) {
        console.log('Ошибка DELETE запроса');
        console.log(error);
    }
}
