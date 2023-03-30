export const handlerAuthentication = async (request, h) => {

    return `Добро пожаловать, ${request.auth.credentials.name}`;
}