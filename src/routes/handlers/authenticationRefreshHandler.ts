import { validateRefresh } from "../../model/bdMethod/functionValidateRefresh";

export const handlerRefreshAuthentication = async (request, h) => {

    const token = await validateRefresh(request.payload.token);
    
    return token; // на клиент возвращается обновленный refrhesh и access токены. 
}