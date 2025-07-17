import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './configs/db.js';
import { adminRouter } from './routes/adminRoutes.js';
import { blogRouter } from './routes/blogsRoutes.js';
import { validateRouter } from './routes/validateRouters.js';


const app = express();
await connectDB()

// mid
app.use(cors())
app.use(express.json())

//routes
app.get('/' , (req, res) => res.send("Api is Working now"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use('/api/validate', validateRouter);

const PORT =process.env.PORT || 8000;

app.listen(PORT, () =>{
    console.log('Server is running on' + PORT)
})
export default app;