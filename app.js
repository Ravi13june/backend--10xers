const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express()
app.use(cors({
  origin:['http://localhost:5173',"https://backend-10xers.onrender.com"]
}))
const authRoutes = require('./routes/auth.route')
const productRoutes = require('./routes/product.route')
const userRoutes = require('./routes/user.route')
const sequelize = require('./config/db')

app.use(express.json())
// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Health check endpoint
/**
 * @swagger
 * /api/health:
 *  get:
 *    tags:
 *      - Health
 *    summary: Check server status
 *    description: Returns server health status
 *    responses:
 *      200:
 *        description: Server is running normally
 *        content:
 *          application/json:
 *            example:
 *              message: Server is healthy and running!
 */
app.get('/api/health', (req,res)=>{
    res.status(200).json({ message: 'Server is healthy and running!' });
})
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});