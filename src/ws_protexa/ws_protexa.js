const {Router} = require('express');
const https = require("https");
const http = require("http");
const router = Router();

router.post('/ws_test', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
//    let responseBody = JSON.parse(this.err._body);
//     let json_test = "{\"mensaje\": \"[{\"idEF\":323297083,\"claveRastreo\":\"BNET01002210070039492186\"\"}"
//     res.send(json_test);
    consume_ws(req, res, '/efws/API/conciliacion');
})

router.post('/ws_conciliacion', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/conciliacion');
})
router.post('/ws_consultaCuenta', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/consultaCuenta');
})
router.post('/ws_consultaSaldoCuenta', (req, res) => {
    //https://efws-dev.stpmex.com/efws/API/conciliacion
    consume_ws(req, res, '/efws/API/consultaSaldoCuenta');
})

module.exports = router;

async function consume_ws(req, res, path) {
    try {
        var xml = req.body;
        //if (json == "{}") {
          //  res.json({"error": "Cuerpo vacío '" + json + "'."});
          //  return
       // }
//http://SAPDEV01.protexa.net:8001/sap/bc/srt/rfc/sap/zws_consinv_sinube/300/zws_consinv_sinube/zws_consinv_sinube

        path = "/sap/bc/srt/rfc/sap/zws_consinv_sinube/300/zws_consinv_sinube/zws_consinv_sinube";

        var https = require('https');//, PORT = 7002;
        const options = {
            hostname: 'SAPDEV01.protexa.net',
            port: 8001,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml',
                'Content-Length': Buffer.byteLength(json)
            }
        };
        let p = new Promise((resolve, reject) => {
            const req_prom = https.request(options, (res) => {
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
                res.json({"error_fatal": err.message + "["+err.code+"]"});
                reject(err);
            });
            req_prom.write(xml)
            req_prom.end();
        });

        res.send(await p);

    } catch (e) {
        console.log(e);
        res.send({'Err': e});
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


    //   res.json({"mensaje": postreq.body});
}
