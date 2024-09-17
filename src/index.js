const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const morgan = require('morgan');
//require('body-parser-xml')(bodyParser);
//configuraciones
app.set('port', 7025);
//app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(express.raw({ type: "*/*" }));
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.text())
//app.use(bodyParser.xml());
// app.use(
//     bodyParser.xml({
//         limit: '1MB', // Reject payload bigger than 1 MB
//         xmlParseOptions: {
//             normalize: true, // Trim whitespace inside text nodes
//             normalizeTags: true, // Transform tags to lowercase
//             explicitArray: false, // Only put nodes in array if >1
//         },
//     }),
// );


//routes
app.use(require('./routes/prueba'));
app.use(require('./ws_protexa/ws_protexa'));
// app.use(require('./routes/cambio_estado'));
// app.use(require('./routes_stp_ws/stp_ws'));
//app.use(require('./routes/pruebas'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    next();
});
//start server
app.listen(app.get('port'),()=> {
    console.log(`Server on port ${7025}`);//backtick (alt+96)
});

