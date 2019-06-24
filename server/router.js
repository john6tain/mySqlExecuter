const controller = require('./controller');

module.exports = (app) => {
    app.get('/', controller.home);
    app.post('/config', controller.config);
    app.post('/exec', controller.exec);
}