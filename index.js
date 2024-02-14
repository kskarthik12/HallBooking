import AppRoutes from './src/routes/index.js'
import express from 'express'
const app=express()
const PORT=8000 
app.use(express.json())
app.use(AppRoutes)

app.listen(PORT,()=>console.log(`App is running in ${PORT}`))