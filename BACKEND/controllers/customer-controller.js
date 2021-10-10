const connection = require('../common/mysql');

class CustomerController {
    getCustomers(res){
        const query = `SELECT * FROM customers`;
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

    getCustomer(res, id){
        const query = `SELECT * FROM customers WHERE id = ${id}`;
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

    saveCustomer(res, customer){
        const query = `INSERT INTO customers SET ?`;
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

    putCustomer(res, customer){
        const query = `UPDATE customers SET ? WHERE id = ${customer.id}`;
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
}

module.exports = new CustomerController();