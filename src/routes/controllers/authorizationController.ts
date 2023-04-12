import { validateRefresh } from "../../model/service/tokenServiceValidateRefresh";
import { validate } from "../../model/service/tokenServiceValidate";
import { tokenDelete } from "../../model/service/tokenServiceDelete";
import { functionPost } from "../../model/service/userServicePost";
import { myUser, Tokens } from "../../types/type";

export const handlerRegister = async (request, h):Promise<false | Tokens> => { // добавление пользователя через форму 
    try {

        let formObj:myUser = {
            firstName: request.payload.userName,
            lastName: request.payload.userLastName,
            userEmail: request.payload.userEmail,
            userPass: request.payload.userPass,
            userPassConfm: request.payload.userPassConfm,
            age: parseInt(request.payload.userAge),
            city: request.payload.userCity
        }
    
        const res = await functionPost(formObj); // пользователь добавлен в бд

        if(res===false) {
            return false;
        }
        const token:false | Tokens = await validate(formObj.userEmail, formObj.userPass); // проверяем и возвращаем сразу 2 токена

        
        if(token) {
            h.state('refreshToken', {refreshToken: token.refreshToken}) // сохраняем в куки рефреш токен
        }

        return token;
    }

    catch(error) {
        console.log('Ошибка POST запроса');
        console.log(error);
    }
}

export const handlerAuthentication = async (request, h):Promise<false | Tokens> => {

    const token:false | Tokens = await validate(request.payload.email, request.payload.password);
    await h.unstate('refreshToken') // очищаем куки (на случай, если остался старый токен)

    if(token) {
        h.state('refreshToken', {refreshToken: token.refreshToken}) // сохраняем в куки новый рефреш токен
    }
    return token; // на клиент возвращается токен. Далее через запрос по маршруту login клиент передает токен в заголовке. Проверял в insomnia, работает
}

export const handlerRefreshAuthentication = async (request, h):Promise<false | Tokens> => {

    const token:false | Tokens = await validateRefresh(request.payload.token);
    await h.unstate('refreshToken') // очищаем куки (на случай, если остался старый токен)

    if(token) {
        h.state('refreshToken', {refreshToken: token.refreshToken}) // сохраняем в куки новый рефреш токен    
    }

    return token; // на клиент возвращается обновленный refrhesh и access токены. 
}

export const handlerLogout = async (request, h):Promise<boolean> => {
    const res = await tokenDelete(request.payload.token);

    return res;
}