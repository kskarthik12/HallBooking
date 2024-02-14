const room = [
    {
        id: 1,
        room_name:"Room 1",
        availableSeats: 100,
        amenities: ["Television", "Free Wifi"],
        pricePerHour: 50,
    }
];

const bookedRoom = [
    {
        room_id: 1,
        customer_name: "karthik",
        date: '23-09-2021',
        start_time: '10:00 AM',
        end_time: '12:00 PM',
    }
];

const CreateRoom = (req, res) => {
    try {
        const id = room.length > 0 ? room[room.length - 1].id + 1 : 1;
        const data = req.body;
        data.id = id;

        room.push(data);
        res.status(201).send({
            message: "Room is created successfully!"
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

const BookingRoom = (req, res) => {
    try {
        const room_id = bookedRoom.length > 0 ? bookedRoom[bookedRoom.length - 1].room_id + 1 : 1;
        const data2 = req.body;
        data2.room_id = room_id;
            
        bookedRoom.push(data2);
        
        res.status(201).send({
            message: "Room is Booked successfully!",
            
        });
    } catch (error) {
        
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


const getRoomBookedDetails = (req, res) => {
    try {
        const roomsBookedData = room.map(roomItem => {
            const roomBookings = bookedRoom.filter(booking => booking.room_id === roomItem.id);
            if (roomBookings.length > 0) {
                return roomBookings.map(booking => ({
                    room_name: roomItem.room_name,
                    booked_status: true,
                    customer_name: booking.customer_name,
                    date: booking.date,
                    start_time: booking.start_time,
                    end_time: booking.end_time
                }));
            } 
        }).flat(); 
        
        res.status(200).send(roomsBookedData);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

const getCustomersBookedDetails= (req,res)=>{
    try {
        const roomsBookedData = room.map(roomItem => {
            const roomBookings = bookedRoom.filter(booking => booking.room_id === roomItem.id);
            if (roomBookings.length > 0) {
                return roomBookings.map(booking => ({
                    room_name: roomItem.room_name,
                    customer_name: booking.customer_name,
                    date: booking.date,
                    start_time: booking.start_time,
                    end_time: booking.end_time
                }));
            } 
        }).flat(); 
        
        res.status(200).send(roomsBookedData);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};
const getCustomerBookingHistory = (req, res) => {
    try {
        const customerName = req.query.customer_name; 

        // Filter bookings based on customer's name
        const customerBookings = bookedRoom.filter(booking => booking.customer_name === customerName);

        // Construct response with required details
        const customerBookingHistory = customerBookings.map(booking => ({
            customer_name: booking.customer_name,
            room_name: room.find(roomItem => roomItem.id === booking.room_id).room_name,
            date: booking.date,
            start_time: booking.start_time,
            end_time: booking.end_time,
            booking_id: booking.room_id, // Assuming room_id is used as booking_id
            booking_date: new Date(), // Set the current date as booking date
            booking_status: 'Booked' // Assuming all bookings are confirmed
        }));

        res.status(200).send(customerBookingHistory);
    } catch (error) {
        res.status(500).send({
            message: "Failed to retrieve customer booking history."
        });
    }
};

export default {
    CreateRoom,
    BookingRoom,
    getRoomBookedDetails,
    getCustomersBookedDetails,
    getCustomerBookingHistory
};
