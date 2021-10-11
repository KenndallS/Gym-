var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const customerController = require('../controllers/customer-controller');
// const healthConditionController = require('../controllers/healthcondition-controller');
// const inscriptionController = require('../controllers/inscription-controller');
// const paymentController = require('../controllers/payment-controller');
// const trainingPlanController = require('../controllers/trainingplan-controller');


/* API routes */
/* General routes */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

/* Authentication routes */
router.post('/auth/login', (req, res) => {
  // Encrypte and Decrypte password
  authController.login(res, req.body.user, req.body.password);
});
// router.get('/user/logout/id', (req, res) => {
//   userController.logout(res, req.params.id);
// });

/* User routes */
router.get('/user/all', (req, res) => {
  userController.getAll(res);
});
router.get('/user/filter/:filter', (req, res) => {
  userController.getFilter(res, req.params.filter);
});
router.get('/user/id/:id', (req, res) => {
  userController.getById(res, req.params.id);
});
router.post('/user/save', (req, res) => {
  if(req.body.id > 0){
    userController.update(res, req.body);
  } else {
    userController.create(res, req.body);
  }
});
router.delete('/user/delete/:id/:status', (req, res) => {
  userController.delete(res, req.params.id, req.params.status);
});

/* Customers routes */
router.get('/customer/all', (req, res) => {
  customerController.getAll(res);
});
router.get('/customer/filter', (req, res) => {
  customerController.getFilter(res);
});
router.get('/customer/id/:id', (req, res) => {
  customerController.getById(res, req.params.id);
});
router.post('/customer/save', (req, res) => {
  console.log(req.body);
  console.log(req.body.Id > 0);
  if(req.body.Id > 0){
    customerController.update(res, req.body);
  } else {
    customerController.create(res, req.body);
  }
});
router.delete('/customer/delete/:id/:status', (req, res) => {
  customerController.delete(res, req.params.id, req.params.status);
});





module.exports = router;
