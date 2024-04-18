import app from "./app";
import './database'
import config from "./config";

const Port = config.PORT;

app.listen(Port, ()=>{
    console.log ("On Port : ", Port);
});
