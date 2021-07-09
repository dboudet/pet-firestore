//connect to firestore
const admin = require("firebase-admin"); //pulling in firebase
const creds = require("./credentials.json"); //pull in creds
admin.initializeApp({
    credential: admin.credential.cert(creds)
}); // creates certificate with creds

// now here we are connected to ALL of the services in our firebase project
const database = admin.firestore()  //create variable for admin.firestore() so we don't have to type it for each command below

//create a customer

const newCustomer = {
    firstName: "Chris",
    lastName: "De Leon",
    tel: "555-555-1234",
    dob: "1990-01-01",
    email: "chris@bocacode.com",
    pets: [{
        name: "Fluffy",
        size: "very large",
        type: "dog",
        age: 7,
        alive: false
    }]
}

// database.collection("customers").doc("luiz-siva").set(newCustomer)
// the above is a way to set the doc/customer id manually
database.collection("customers").add(newCustomer)
    .then( doc => console.log("Created customer id:" , doc.id )) // use doc.id to give us id of customer
    .catch( err => console.error("Error adding customer:" , err ))  // in firestore, you can do error.message to pull out message from full error

//get all customers
database.collection("customers").get()
    .then( customerCollection => {
        let allCustomers = customerCollection.docs.map( doc => doc.data())  // maps results (all docs in this collection) as objects, because firestore returns ugly data
        console.log(allCustomers)
    })
    .catch( err => console.error("Error getting customers:", err))

// DELETE CUSTOMER - SINGLE DOCUMENT/RECORD
//  db.collection("customers").doc("id").delete()

//console.log results
