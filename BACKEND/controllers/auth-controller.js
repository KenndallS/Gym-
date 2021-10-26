const connection = require('../common/mysql');

class AuthController {
    login(res, user, password){
        const query = `SELECT Id, UserName, '' as PasswordHash, Description, Status FROM Users WHERE UserName = '${user}' AND PasswordHash = '${password}'`;
        connection.query(query, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else if(!result[0]){
                res.json({
                    status:'ERROR',
                    error: 'Usuario o contraseña incorrecto'
                });
            } 
            else {
                res.json({
                    status:'OK',
                    data: result[0]
                });
            }
        });
    }
}

module.exports = new AuthController();