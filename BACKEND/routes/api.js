var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');
const customerController = require('../controllers/customer-controller');
const healthConditionController = require('../controllers/healthcondition-controller');
const inscriptionController = require('../controllers/inscription-controller');
const paymentController = require('../controllers/payment-controller');
const trainingPlanController = require('../controllers/trainingplan-controller');


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
// El Logout sera manejado a nivel de cliente
// router.get('/user/logout/id', (req, res) => {
//   userController.logout(res, req.params.id);
// });

/* Users routes */
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
router.get('/customer/filter/:filter', (req, res) => {
  customerController.getFilter(res, req.params.filter);
});
router.get('/customer/id/:id', (req, res) => {
  customerController.getById(res, req.params.id);
});
router.post('/customer/save', (req, res) => {
  if(req.body.Id > 0){
    customerController.update(res, req.body);
  } else {
    customerController.create(res, req.body);
  }
});
router.delete('/customer/delete/:id/:status', (req, res) => {
  customerController.delete(res, req.params.id, req.params.status);
});

/* Training plans routes */
router.get('/training-plan/all', (req, res) => {
  trainingPlanController.getAll(res);
});
router.get('/training-plan/filter/:filter', (req, res) => {
  trainingPlanController.getFilter(res, req.params.filter);
});
router.get('/training-plan/id/:id', (req, res) => {
  trainingPlanController.getById(res, req.params.id);
});
router.post('/training-plan/save', (req, res) => {
  if(req.body.Id > 0){
    trainingPlanController.update(res, req.body);
  } else {
    trainingPlanController.create(res, req.body);
  }
});
router.delete('/training-plan/delete/:id/:status', (req, res) => {
  trainingPlanController.delete(res, req.params.id, req.params.status);
});

/* Health conditions routes */
router.get('/health-condition/all', (req, res) => {
  healthConditionController.getAll(res);
});
router.get('/health-condition/filter/:filter', (req, res) => {
  healthConditionController.getFilter(res, req.params.filter);
});
router.get('/health-condition/id/:id', (req, res) => {
  healthConditionController.getById(res, req.params.id);
});
router.get('/health-condition/customer/:id', (req, res) => {
  healthConditionController.getByCustomerId(res, req.params.id);
});
router.post('/health-condition/save', (req, res) => {
  if(req.body.Id > 0){
    healthConditionController.update(res, req.body);
  } else {
    healthConditionController.create(res, req.body);
  }
});
router.delete('/health-condition/delete/:id/:status', (req, res) => {
  customerController.delete(res, req.params.id, req.params.status);
});

/* Inscriptions routes */
router.get('/inscription/all', (req, res) => {
  inscriptionController.getAll(res);
});
router.get('/inscription/filter/:filter', (req, res) => {
  inscriptionController.getFilter(res, req.params.filter);
});
router.get('/inscription/id/:id', (req, res) => {
  inscriptionController.getById(res, req.params.id);
});
router.get('/inscription/customer/:id', (req, res) => {
  inscriptionController.getByCustomerId(res, req.params.id);
});
router.post('/inscription/save', (req, res) => {
  if(req.body.Id > 0){
    inscriptionController.update(res, req.body);
  } else {
    inscriptionController.create(res, req.body);
  }
});
router.delete('/inscription/delete/:id/:status', (req, res) => {
  inscriptionController.delete(res, req.params.id, req.params.status);
});

/* Payments routes */
router.get('/payment/all', (req, res) => {
  paymentController.getAll(res);
});
router.get('/payment/filter/:filter', (req, res) => {
  paymentController.getFilter(res, req.params.filter);
});
router.get('/payment/id/:id', (req, res) => {
  paymentController.getById(res, req.params.id);
});
router.get('/payment/customer/:id', (req, res) => {
  paymentController.getByCustomerId(res, req.params.id);
});
router.post('/payment/save', (req, res) => {
  if(req.body.Id > 0){
    paymentController.update(res, req.body);
  } else {
    paymentController.create(res, req.body);
  }
});
router.delete('/payment/delete/:id/:status', (req, res) => {
  paymentController.delete(res, req.params.id, req.params.status);
});

module.exports = router;
