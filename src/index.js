const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const morgan = require('morgan');

//configuraciones
app.set('port', 7025);
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(function (req, res) {
//    res.setHeader('Content-Type', 'text/plain')
//    res.write('you posted:\n')
//    res.end(JSON.stringify(req.body, null, 2))
// })

//routes
app.use(require('./routes/prueba'));
app.use(require('./ws_protexa/ws_protexa'));
// app.use(require('./routes/cambio_estado'));
// app.use(require('./routes_stp_ws/stp_ws'));
//app.use(require('./routes/pruebas'));
//start server
app.listen(app.get('port'),()=> {
    console.log(`Server on port ${7025}`);//backtick (alt+96)
});
