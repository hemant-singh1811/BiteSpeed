const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
      phoneNumber: {type: "integer"},
      email: {type: "string"}
    },
    required: ["phoneNumber","email"],
    additionalProperties: false
}

exports.schemaValidator = ()=> {
  return async function(req, res, next) {
      try{ 
          
          console.log("body : ",req.body);
          const validate = ajv.compile(schema);
          const valid = validate(req.body); 
  
          console.log("model validate : ",valid);
  
          if(!valid) throw {message: validate.errors[0].message};
  
          next();
      }catch(e){
          res.status(401).json({
              statusCode: 401,
              message: e.message,
            }); 
      }
  }
}

  