const connection = require('../common/mysql');

class HealthConditionController {
    getAll(res){
        const query = `SELECT * FROM HealthConditions`;
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
        const query = `SELECT * FROM HealthConditions WHERE Name LIKE '%${filter}%'`;
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
        const query = `SELECT * FROM HealthConditions WHERE Id = ${id}`;
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
        const query = `SELECT h.* FROM HealthConditions h INNER JOIN Customers c ON h.Customer = c.Id WHERE c.Id = ${id}`;
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

    create(res, healthCondition){
        const query = `INSERT INTO HealthConditions SET ?`;
        connection.query(query, healthCondition, (error, result) => {
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

    update(res, healthCondition){
        const query = `UPDATE HealthConditions SET ? WHERE Id = ${healthCondition.Id}`;
        connection.query(query, healthCondition, (error, result) => {
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
        const query = `UPDATE HealthConditions SET Status = '${status}' WHERE Id = ${id}`;
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

module.exports = new HealthConditionController();