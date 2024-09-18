const express = require('express');
const bodyParser = require('body-parser')

const morgan = require('morgan');
const cors = require('cors');
const app = express();

//configuraciones
app.set('port', 7025);

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.raw({ type: "*/*" }));
//routes
app.use(require('./routes/prueba'));
app.use(require('./ws_protexa/ws_protexa'));

//start server
app.listen(app.get('port'),()=> {
    console.log(`Server on port ${7025}`);//backtick (alt+96)
});

