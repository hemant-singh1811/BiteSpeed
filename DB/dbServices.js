const con = require('./config.js');

// {
// 	id                   Int                   
//   phoneNumber          String?
//   email                String?
//   linkedId             Int? // the ID of another Contact linked to this one
//   linkPrecedence       "secondary"|"primary" // "primary" if it's the first Contact in the link
//   createdAt            DateTime              
//   updatedAt            DateTime              
//   deletedAt            DateTime?
// }

let createTable = `CREATE TABLE IF NOT EXISTS Contact (
    id int AUTO_INCREMENT PRIMARY KEY,
    phoneNumber varchar(255),
    email varchar(255),
    linkedId int,
    linkPrecedence varchar(255),
    createdAt datetime,
    updatedAt datetime,
    deletedAt datetime
);`

con.query(createTable, function (err, result) {
    if (!err) {
        console.log("table created");
    } else {
        console.log("err : ", err);
    }
});

async function createContact(phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) {
    let insertQuery = `INSERT INTO Contact (phoneNumber,email,linkedId,linkPrecedence,createdAt,updatedAt) VALUES('${phoneNumber}','${email}',${linkedId},'${linkPrecedence}','${createdAt}','${updatedAt}');`
    try {
        con.query(insertQuery, function (err, result) {
            if (!err) {
                console.log("new entry created");
            } else {
                throw err;
            }
        });
    } catch (e) {
        console.log("er : ", e);
    }

}

function searchContact(phoneNumber, email) {
    return new Promise(function (resolve, reject) {
        let searchQuery = `SELECT * FROM Contact WHERE (phoneNumber='${phoneNumber}' OR email='${email}');`
        try {
            con.query(searchQuery, function (err, row,fields) {
                if (!err) {

                 let result=JSON.parse(JSON.stringify(row))

                    resolve(result)
                } else {
                    reject(err);
                }
            });
        } catch (e) {
            console.log("er : ", e);
            reject(e);
        }
    })
}

function foundContact(phoneNumber, email) {
    return new Promise(function (resolve, reject) {
        let searchQuery = `SELECT * FROM Contact WHERE (phoneNumber='${phoneNumber}' AND email='${email}');`
        try {
            con.query(searchQuery, function (err, row,fields) {
                if (!err) {

                 let result=JSON.parse(JSON.stringify(row))

                    resolve(result)
                } else {
                    reject(err);
                }
            });
        } catch (e) {
            console.log("er : ", e);
            reject(e);
        }
    })
}

function updateContact(id,linkedId){ 
    return new Promise(function (resolve, reject) {
        let updateQuery = `UPDATE Contact SET linkedId =${linkedId}, linkPrecedence='secondary' WHERE id = ${id};`
        try {
            con.query(updateQuery, function (err, row,fields) {
                if (!err) {

                 let result=JSON.parse(JSON.stringify(row))

                    resolve(result)
                } else {
                    reject(err);
                }
            });
        } catch (e) {
            console.log("er : ", e);
            reject(e);
        }
    })
}


module.exports = {
    createContact,
    searchContact,
    foundContact
}

