const dinerController = require('../controllers/dinerController');
const sodaController = require('../controllers/sodaController');

module.exports = (app) => {
    app.get('/', (req, res) => { res.render('pages/index') });
    app.get('/diners', dinerController.readDiners);
    app.get('/add-diner', dinerController.dinerForm);
    app.get('/diner-details/:id', dinerController.readDinerDetails);
    app.post('/api/diner/new', dinerController.createDiner);
    app.delete('/api/diner/:id', dinerController.deleteDiner);
    app.get('/api/diner/add-soda/form/:id', dinerController.addSodaForm);
    app.get('/api/diner/delete-soda/form/:id', dinerController.deleteSodaForm);
    app.put('/api/diner/add-soda/:id', dinerController.addSoda);
    app.put('/api/diner/delete-soda/:id', dinerController.deleteSoda);
    app.get('/sodas', sodaController.readSodas);
    app.get('/add-soda', sodaController.sodaForm);
    app.get('/soda-details/:id', sodaController.readSodaDetails);
    app.post('/api/soda/new', sodaController.createSoda);
    app.delete('/api/soda/:id', sodaController.deleteSoda);
    app.get('/api/soda/stop-serving/:id', sodaController.serveSodaStop);
    app.get('/api/soda/start-serving/:id', sodaController.serveSodaStart);
}