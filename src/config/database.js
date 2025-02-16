const mongoose = require('mongoose');

const connectDB = async ()=>
{
    await mongoose.connect(
        //cluster string
        "mongodb+srv://aarifraza95ar:iL11ILefXutGA6zN@cluster0.fagha.mongodb.net/devTinder"   );
};
 
module.exports = connectDB;



// const {MongoClient} = require('mongodb');

// // password - "iL11ILefXutGA6zN";
// // const URI = "mongodb+srv://aarifraza95ar:JqGxBAKVqXnAd5Bi@cluster0.fagha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const url = "mongodb+srv://aarifraza95ar:JqGxBAKVqXnAd5Bi@cluster0.fagha.mongodb.net/";
// const client = new MongoClient(url);

// const dbName = "helloWorld";
// async function main(){
//     //client.connect() is used to make connection to the db
//     await client.connect();
//     console.log("connected to database");
//     const db = client.db(dbName);
//     const collection = db.collection("user");
//     return 'done';

// }
 