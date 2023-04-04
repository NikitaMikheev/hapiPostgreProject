import { validateRefresh } from "../../model/bdMethod/functionValidateRefresh";
import { validate } from "../../model/bdMethod/functionValidate";

export const handlerAuthentication = async (request, h) => {

    const token = await validate(request.payload.email, request.payload.password);
    
    return token; // на клиент возвращается токен. Далее через запрос по маршруту login клиент передает токен в заголовке. Проверял в insomnia, работает
}

export const handlerRefreshAuthentication = async (request, h) => {

    const token = await validateRefresh(request.payload.token);
    
    return token; // на клиент возвращается обновленный refrhesh и access токены. 
}