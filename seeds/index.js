const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '621e7bc05616c35e67b9d535',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dv0x4vjbl/image/upload/v1646418909/YelpCamp/uo6l7l7xn48zkll3u3lr.jpg',
                  filename: 'YelpCamp/uo6l7l7xn48zkll3u3lr'
                },
                {
                  url: 'https://res.cloudinary.com/dv0x4vjbl/image/upload/v1646418909/YelpCamp/q6rhcxk7zrt6zndjtwzx.jpg',
                  filename: 'YelpCamp/q6rhcxk7zrt6zndjtwzx'
                }
              ],
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})