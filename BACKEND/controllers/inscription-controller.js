const connection = require('../common/mysql');

class InscriptionController {
    getAll(res){
        const query = `SELECT * FROM Inscriptions`;
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
        const query = `SELECT * FROM Inscriptions WHERE Name LIKE '%${filter}%'`;
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
        const query = `SELECT * FROM Inscriptions WHERE Id = ${id}`;
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

    getByCustomerId(res, id){
        const query = `SELECT i.* FROM Inscriptions i INNER JOIN Customers c ON i.Id = c.Inscription WHERE c.Id = ${id}`;
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

    create(res, inscription){
        const query = `INSERT INTO Inscriptions SET ?`;
        connection.query(query, inscription, (error, result) => {
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

    update(res, inscription){
        const query = `UPDATE Inscriptions SET ? WHERE Id = ${inscription.Id}`;
        connection.query(query, inscription, (error, result) => {
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
        const query = `UPDATE Inscriptions SET Status = '${status}' WHERE Id = ${id}`;
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

module.exports = new InscriptionController();