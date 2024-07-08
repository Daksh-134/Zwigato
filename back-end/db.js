const mongoose = require('mongoose');

const MongoURI = 'mongodb+srv://Zwigato:Pokemon96@cluster0.1iwyydr.mongodb.net/Database-0?retryWrites=true&w=majority&appName=Cluster0';

const MongoDB = async () => {
    try {
        await mongoose.connect(MongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected");
        const db = mongoose.connection.db;
        // const data = await db.collection("food_items").find({}).toArray(async function(err,data){
        //     const foodCategory= await db.collection("foodCategory").find({}).toArray(function(err,catData){
        //         global.food_items=data;
        //         global.foodCategory=catData;
        //     })
        // });
        const foodItems = await db.collection("food_items").find({}).toArray();
        global.food_items = foodItems;

        const foodCategories = await db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategories;
    } 
    catch (err) {
        console.error("Error connecting to MongoDB: ", err);
    }
};

module.exports = MongoDB;
