const asyncHandler = require("express-async-handler");
const dbService = require("../DB/dbServices");

const contactOperation = asyncHandler(async (req, res) => {
    try {

        let date = new Date();
        let time = date.toISOString().split('T')[0] + ' '
            + date.toTimeString().split(' ')[0];

        let { phoneNumber, email } = req.body;

        try {
        //     let foundContact=false;
        //   await dbService.foundContact(phoneNumber, email).then((rows)=>{
        //         if(rows.length>0)
        //         {   
        //             foundContact=true;
        //         }

        //     }).catch((er)=>{
        //         console.log("res : ",er);
        //         throw e;
        //     })

            dbService.searchContact(phoneNumber, email).then(async (rows)=>{
                
                if(rows.length>0)
                {  
                    let Contacts=await getPrimaryContact(rows);
                    let primaryContact=Contacts.Contact;

                    console.log("primaryContact : ",primaryContact);

                    // if(!foundContact)
                    // dbService.createContact(phoneNumber, email, primaryContact.id, "secondary", time, time)

                    let resp = {
                        "contact": {
                            "primaryContatctId": primaryContact.id,
                            "emails": Contacts.emails , // first element being email of primary contact 
                            "phoneNumbers": Contacts.phoneNumbers, // first element being phoneNumber of primary contact
                            "secondaryContactIds": Contacts.secondaryContactIds // Array of all Contact IDs that are "secondary" to the primary contact
                        }
                    }
                    res.send(resp)

                }else{
                    dbService.createContact(phoneNumber, email, null, "primary", time, time)
                    let resp = {
                        "contact": {
                            "primaryContatctId": 0,
                            "emails": [], // first element being email of primary contact 
                            "phoneNumbers": [], // first element being phoneNumber of primary contact
                            "secondaryContactIds": [] // Array of all Contact IDs that are "secondary" to the primary contact
                        }
                    }
        
                    res.send(resp)
                }
    
            }).catch((er)=>{
                console.log("res : ",er);

                res.status(500).send("Internal Server Error");
            })
 

            
        } catch (e) {
            throw e;
        }
    } catch (e) {
        console.log("error @ contactOperation : ", e);
        throw { message: e.message };
    }
});

async function getPrimaryContact(rows){

    let Contact={};

    let emailsMap=new Set();
    let phoneNumbersMap=new Set();
    let secondaryContactIds=[];

    rows.forEach(element => {
        if(element.linkPrecedence=="primary"){
            Contact= element
        }else{
            secondaryContactIds.push(element.id);
        }
        emailsMap.add(element.email);
        phoneNumbersMap.add(element.phoneNumber);
    });


    let resp= {
        Contact:Contact,
        emails:Array.from(emailsMap),
        phoneNumbers:Array.from(phoneNumbersMap),
        secondaryContactIds:secondaryContactIds
    };

    return resp;

}

module.exports = {
    contactOperation
}