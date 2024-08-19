const {Router} = require('express');
const router = Router();

const PRUEBAS = false;

router.post('/prueba', (req, res) => {

    res.json({"mensaje": "prueba exitosa"});
})

module.exports = router;


// {
//    "id": 3191365,
//     "fechaOperacion": 20200127,
//     "institucionOrdenante": 846,
//     "institucionBeneficiaria": 90646,
//     "claveRastreo": "12345",
//     "monto": 0.01,
//     "nombreOrdenante": "STP",
//     "tipoCuentaOrdenante": 40,
//     "cuentaOrdenante": "846180000400000001",
//     "rfcCurpOrdenante": "ND",
//     "nombreBeneficiario": "NOMBRE_DE_BENEFICIARIO",
//     "tipoCuentaBeneficiario": 40,
//     "cuentaBeneficiario": "64618012340000000D",
//     "nombreBeneficiario2": "NOMBRE_DE_BENEFICIARIO2",
//     "tipoCuentaBeneficiario2": 40,
//     "cuentaBeneficiario2": "64618012340000000D",
//     "rfcCurpBeneficiario": "ND",
//     "conceptoPago": "PRUEBA1",
//     "referenciaNumerica": 1234567,
//     "empresa": "NOMBRE_EMPRESA",
//     "tipoPago":1,
//     "tsLiquidacion": "1634919027297",
//     "folioCodi": "f4c1111abd2b28a00abc"
// }
