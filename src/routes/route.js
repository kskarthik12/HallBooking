import { Router } from 'express'
import booking from '../controllers/booking.js'

const router=Router()

router.post('/create-room',booking.CreateRoom)
router.post('/book-room',booking.BookingRoom)
router.get('/',booking.getRoomBookedDetails)
router.get('/customers',booking.getCustomersBookedDetails)
router.get('/customers-history',booking.getCustomerBookingHistory)

export default router