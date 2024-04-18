import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createRoles } from "./libs/initialSetup";
import ProductsRouter from "./routes/products.routes";
import authRoutes from "./routes/auth.routes"
import userRouts from "./routes/user.routes"
import ordersRoutes from "./routes/orders.routes";
import ReportRouts from "./routes/sales.routes"
import routerImage from "./routes/image.routes"
import fileUpload from "express-fileupload";


const app = express();
createRoles();
app.use(morgan('dev')); //registrar informacion sobre las solicitudes hhtp

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE', 
  allowedHeaders: 'Content-Type,Authorization,x-access-token', 
  credentials: true 
};


app.use(cors(corsOptions));
app.use(express.json())
app.use(fileUpload())


app.get ("/", (req, res)=>{
        res.status(200).json({
            messgage: "Pruebitas",
        });
})  

app.use('/products',ProductsRouter);
app.use('/api/auth/',authRoutes);
app.use('/api/users', userRouts);
app.use('/api/v1/orders/', ordersRoutes)
app.use('/api/v1/reports', ReportRouts);
app.use('/image', routerImage);

export default app;

