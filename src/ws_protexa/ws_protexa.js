const {Router} = require('express');

const http = require("http");
const router = Router();
const soap = require('soap');

router.post('/ws_test', (req, res) => {
    //res.send('WOOOOW');
    consume_soap(req, res);
})

router.post('/consultaInventario', (req, res) => {
    path = "/sap/bc/srt/rfc/sap/zws_consinv_sinube/300/zws_consinv_sinube/zws_consinv_sinube";
    consume_ws_xml(req, res, path);
})

module.exports = router;

async function consume_ws_xml(req, res, path) {
    try {
        var xml = req.body;

        //http://SAPDEV01.protexa.net:8001/sap/bc/srt/rfc/sap/zws_consinv_sinube/300/zws_consinv_sinube/zws_consinv_sinube

        var http = require('http');//, PORT = 7002;
        const options = {
            hostname: 'SAPDEV01.protexa.net',
            port: 8001,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                'Content-Length': Buffer.byteLength(xml),
                'SOAPAction': '',
                'Authorization': "Basic " + new Buffer("USERTYMPERUC" + ":" + "Inicio1$2024").toString("base64")

            }
        };
        let p = new Promise((resolve, reject) => {
            const req_prom = http.request(options, (res) => {
                res.setEncoding('utf8');
                let responseBody = '';
                res.on('data', (chunk) => {
                    responseBody += chunk;
                });
                res.on('end', () => {
                    resolve(responseBody);
                });
            });
            req_prom.on('error', (err) => {
                res.send("error_fatal" + err.message + "["+err.code+"]");
                reject(err);
            });
            req_prom.write(new Buffer(xml))
            req_prom.end();
        });

        res.send(await p);

    } catch (e) {
        console.log(e);
        res.send('Error cachado: '+ e.message);
    }


}


async function consume_soap(req, res) {
    /*
    UTILIZANDO LA LIBRERIA SOAP. NO FUE NECESARIA. SE USA MEJOR EL XML COMPLETO PARA COMUNICAR.
     */
    try {
        //res.send("JALA?!");
        // return;
        var xml = req.body;
        // console.log("CONSUME SOAP!");
        // Create the SOAP client
        //const security = new soap.BasicAuthSecurity('USERTYMPERUC', 'Inicio1$2024');
        const url = 'https://ep-dot-facturanube.appspot.com/resources/protexa/WS_CONSINV_SINUBE.wsdl';
        soap.createClient(url, function(err , client) {
            //console.log("CREA CLIENTE GO!");
            //client.setSecurity(security);
            var auth = "Basic " + new Buffer("USERTYMPERUC" + ":" + "Inicio1$2024").toString("base64");
            client.addHttpHeader('Authorization',auth);
            if (err) {
                //res.send("ERROR AL CREAR EL CLIENTE!!!");
                //return;
                //console.error('PROTEXA. Error creating SOAP client:', err);
                res.send("ERROR AL CREAR EL CLIENTE!!!" + err.message);
                return;
            }



            // Make a SOAP request
            // const args = { EWerks: '6110', TMard:[], TMatnr:[{Matnr:'T4214160'},{Matnr:'T4923160'}], };
            const args = { EWerks: '6110', TMard:[{item:{Matnr:'',Werks:'',Labst:''}}], TMatnr:[{item:{Matnr:'T4214160'}},{item:{Matnr:'T4923160'}}], };
            client.ZfmMmConsultInvt(args, function(err, result, rawResponse, soapHeader, rawRequest) {
                // result is a javascript array containing result, rawResponse, soapheader, and rawRequest
                // result is a javascript object
                // rawResponse is the raw xml response string
                // soapHeader is the response soap header as a javascript object
                // rawRequest is the raw xml request string
                if (err) {
                    console.log('CCCCCC:', err);
                    // let toStr = "";
                    // for (let key in err) {
                    //     if (err.hasOwnProperty(key)) {
                    //         toStr += `${key} ${err[key]}` + ", ";
                    //     }
                    // }
                    // res.send("ERROR AL HACER EL REQUEST!!!" + toStr);
                    res.send("ERROR AL HACER EL REQUEST!!!" + err.message);
                    return;
                }

                // Handle the SOAP response

                res.send(rawRequest);
                return;
                //console.log('Temperature:', result.temperature);
                //console.log('Description:', result.description);
            });
        });




    } catch (e) {
        console.log(e);
        res.send('Error cachado: '+ e.message);
    }


}

async function consume_ws_ant(req, res, path) {
    var ie = 0;

    var json = JSON.stringify(req.body);
    if (json == "{}") {
        res.json({"error": "Cuerpo vacío '" + json + "'."});
        return
    }

    var http = require('http');//, PORT = 7002;
    ie = 4;
    var options = {
        hostname: 'prod.stpmex.com',
        port: 7002,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': json.length
        }
    };
    let p = new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });
        });
        req.on('error', (err) => {
            reject(err);
            //res.json({"error_fatal": err.message});
            // return;
        });
        req.write(json)
        req.end();
    });
    //let res = await p;
    res.json({"mensaje": await p});


    //   res.json({"mensaje": postreq.body});8118016289
    //Antonio Rdz 8118016289
    //Arnoldo: 8122017667
}
