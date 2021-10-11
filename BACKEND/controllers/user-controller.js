const connection = require('../common/mysql');

class UserController {
    getAll(res){
        const query = `SELECT id, username, '' as passwordHash, description, status FROM users`;
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
        const query = `SELECT id, username, '' as passwordHash, description, status FROM users WHERE username LIKE '%${filter}%' OR description LIKE '%${filter}%'`;
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
        const query = `SELECT id, username, '' as passwordHash, description, status FROM users WHERE id = ${id}`;
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
        const query = `INSERT INTO users SET ?`;
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
        const query = `UPDATE users SET username = '${user.username}', ${(user.passwordHash)?'passwordHash = \''+user.passwordHash+'\',':''} description = '${user.description}', status = '${user.status}' WHERE id = ${user.id}`;
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
        const query = `UPDATE users SET status = '${status}' WHERE id = ${id}`;
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