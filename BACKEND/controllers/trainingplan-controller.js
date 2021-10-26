const connection = require('../common/mysql');

class TrainingPlanController {
    getAll(res){
        const query = `SELECT * FROM TrainingPlans`;
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
        const query = `SELECT * FROM TrainingPlans WHERE Name LIKE '%${filter}%'`;
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
        const query = `SELECT * FROM TrainingPlans WHERE Id = ${id}`;
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

    create(res, trainingPlan){
        const query = `INSERT INTO TrainingPlans SET ?`;
        connection.query(query, trainingPlan, (error, result) => {
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

    update(res, trainingPlan){
        const query = `UPDATE TrainingPlans SET ? WHERE Id = ${trainingPlan.Id}`;
        connection.query(query, customer, (error, result) => {
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
        const query = `UPDATE TrainingPlans SET Status = '${status}' WHERE Id = ${id}`;
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

module.exports = new TrainingPlanController();