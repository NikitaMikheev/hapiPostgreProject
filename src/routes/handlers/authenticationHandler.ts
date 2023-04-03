import { validate } from "../../model/bdMethod/functionValidate";

export const handlerAuthentication = async (request, h) => {

    const token = await validate(request.payload.email, request.payload.password);
    
    return token; // на клиент возвращается токен. Далее через запрос по маршруту login клиент передает токен в заголовке. Проверял в insomnia, работает
}