import { Router } from 'express'
import route from '../routes/route.js'
const router=Router()

router.use('/hallbooking',route)



export default router