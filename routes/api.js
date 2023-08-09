let express = require("express");
let router = express.Router();

const controller = require("../controllers/operations");
const { schemaValidator } = require('../middleware/schemaValidator')


router.post(
    "/",
    schemaValidator(),
    controller.contactOperation
);


module.exports = router;
