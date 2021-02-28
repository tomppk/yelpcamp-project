const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// Mapbox geocoding service for seed location coordinates
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const geocoder = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidG1wa21hIiwiYSI6ImNrbGx6ZTVhaTA0YmoyeG53NHRwazV6cTEifQ.Hj-DQjnbkHykY-zBD0FhzQ' })

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        // const geoData = await geocoder.forwardGeocode({
        //     query: `${cities[random1000].city}, ${cities[random1000].state}`,
        //     limit: 1
        // }).send();
        const camp = new Campground({
            author: '602e97c9b073cf8473471544',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dicta optio incidunt cumque expedita, accusantium consequuntur ad ducimus reprehenderit deleniti doloremque quae delectus obcaecati quas accusamus necessitatibus. Excepturi, veniam aspernatur.',
            price: 20,
            // geometry: geoData.body.features[0].geometry,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dr0ssvilo/image/upload/v1614161883/YelpCamp/jkrpe6gmltgq2nq5hzxd.jpg',
                    filename: 'YelpCamp/jkrpe6gmltgq2nq5hzxd'
                },
                {
                    url: 'https://res.cloudinary.com/dr0ssvilo/image/upload/v1614161884/YelpCamp/rncvgztgzre7fnkrykuv.jpg',
                    filename: 'YelpCamp/rncvgztgzre7fnkrykuv'
                },
                {
                    url: 'https://res.cloudinary.com/dr0ssvilo/image/upload/v1614161885/YelpCamp/yr9zqycr7tryhsmspo9t.jpg',
                    filename: 'YelpCamp/yr9zqycr7tryhsmspo9t'
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
