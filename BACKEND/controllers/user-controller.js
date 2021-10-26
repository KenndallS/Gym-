const connection = require('../common/mysql');

class UserController {
    getAll(res){
        const query = `SELECT Id, UserName, '' as PasswordHash, Description, Status FROM Users`;
        connection.query(query, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else {
                res.json({
                    status:'OK',
                    data: result
                });
            }
        });
    }

    getFilter(res, filter){
        const query = `SELECT Id, UserName, '' as PasswordHash, Description, Status FROM Users WHERE UserName LIKE '%${filter}%' OR Description LIKE '%${filter}%'`;
        connection.query(query, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else {
                res.json({
                    status:'OK',
                    data: result
                });
            }
        });
    }

    getById(res, id){
        const query = `SELECT Id, UserName, '' as PasswordHash, Description, Status FROM Users WHERE Id = ${id}`;
        connection.query(query, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else {
                res.json({
                    status:'OK',
                    data: result[0]
                });
            }
        });
    }

    create(res, user){
        const query = `INSERT INTO Users SET ?`;
        connection.query(query, user, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else {
                res.json({
                    status:'OK',
                    data: result
                });
            }
        });
    }

    update(res, user){
        const query = `UPDATE Users SET UserName = '${user.username}', ${(user.PasswordHash)?'PasswordHash = \''+user.PasswordHash+'\',':''} Description = '${user.Description}', Status = '${user.Status}' WHERE Id = ${user.Id}`;
        connection.query(query, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else {
                res.json({
                    status:'OK',
                    data: result
                });
            }
        });
    }

    delete(res, id, status){
        const query = `UPDATE Users SET Status = '${status}' WHERE Id = ${id}`;
        connection.query(query, (error, result) => {
            if(error){
                res.json({
                    status:'ERROR',
                    error: error
                });
            } else {
                res.json({
                    status:'OK',
                    data: result
                });
            }
        });
    }
}

module.exports = new UserController();