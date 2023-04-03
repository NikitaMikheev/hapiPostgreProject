export = ({
    method: "POST",
    path: "/login",
    options: {
        description: 'Вход',
        notes: 'Вход',
        tags: ['api'],
        auth: 'jwt_token',
    },
    handler: (artifacts,request, h) => {
        return {
            
            isValid: true,
        };
    }
});