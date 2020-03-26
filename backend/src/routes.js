const express = require('express');
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const SessionControler = require('./controllers/SessionController')


const routes = express.Router();

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.list);

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.listAll);
routes.get('/incidents-by-ong', IncidentsController.listByOng);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.post('/session', SessionControler.create);

module.exports = routes;