import mongoose from "mongoose";
import config from "./config";

const MongoUrl = `mongodb://${config.MONGODB_HOST}/${config.MONGODB_DATABASE}`
mongoose.connect(MongoUrl)
.then(db => console.log ('Db is connected'))
.catch(error => console.log(error))