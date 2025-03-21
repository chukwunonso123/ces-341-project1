require('dotenv').config();
const mongoose = require('./db');
const Contact = require('./models/users');

const sampleContacts = [
    { firstName: "John", lastName: "Doe", email: "johndoe@example.com", favoriteColor: "Blue", birthday: "1990-05-15" },
    { firstName: "Jane", lastName: "Smith", email: "janesmith@example.com", favoriteColor: "Red", birthday: "1985-08-25" },
    { firstName: "Alice", lastName: "Johnson", email: "alicejohnson@example.com", favoriteColor: "Green", birthday: "1992-10-10" }
];

Contact.insertMany(sampleContacts)
    .then(() => {
        console.log("✅ Sample data inserted!");
        mongoose.connection.close();
    })
    .catch(err => console.log("❌ Error inserting data:", err));
