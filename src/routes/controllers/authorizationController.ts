import { validateRefresh } from "../../model/service/tokenServiceValidateRefresh";
import { validate } from "../../model/service/tokenServiceValidate";
import { tokenDelete } from "../../model/service/tokenServiceDelete";
import { functionPost } from "../../model/service/userServicePost";
import { myUser } from "../../types/type";

export const handlerRegister = async (request, h) => { // добавление пользователя через форму 
    try {

        let formObj:myUser = {
            firstName: request.payload.userName,
            lastName: request.payload.userLastName,
            userEmail: request.payload.userEmail,
            userPass: request.payload.userPass,
            userPassConfm: request.payload.userPassConfm,
            age: parseInt(request.payload.userAge)
        }
    
        const res = await functionPost(formObj); // пользователь добавлен в бд

        if(res===false) {
            return 'Ошибка регистрации';
        }
        const token = validate(formObj.userEmail, formObj.userPass); // проверяем и возвращаем сразу 2 токена
        return token;
    }

    catch(error) {
        console.log('Ошибка POST запроса');
        console.log(error);
    }
}

export const handlerAuthentication = async (request, h) => {

    const token = await validate(request.payload.email, request.payload.password);
    
    return token; // на клиент возвращается токен. Далее через запрос по маршруту login клиент передает токен в заголовке. Проверял в insomnia, работает
}

export const handlerRefreshAuthentication = async (request, h) => {

    const token = await validateRefresh(request.payload.token);
    
    return token; // на клиент возвращается обновленный refrhesh и access токены. 
}

export const handlerLogout = async (request, h) => {
    await tokenDelete(request.payload.token);

    return "Logout";
}