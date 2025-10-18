const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./server/models/Event");
const Venue = require("./server/models/Venue");

mongoose.connect(process.env.MONGO_URI, {});

const eventsData = JSON.parse(
  fs.readFileSync(`${__dirname}/server/data/events.json`, "utf-8")
);
const venuesData = JSON.parse(
  fs.readFileSync(`${__dirname}/server/data/venues.json`, "utf-8")
);

const importData = async () => {
  try {
    await Event.deleteMany();
    await Venue.deleteMany();
    console.log("Data cleared...");

    const createdVenues = await Venue.insertMany(venuesData);
    console.log("Venues imported...");

    const venueMap = createdVenues.reduce((map, venue) => {
      map[venue.name] = venue._id;
      return map;
    }, {});

    const eventsToImport = eventsData.map((event) => {
      return { ...event, venueID: venueMap[event.venueName] };
    });

    await Event.insertMany(eventsToImport);
    console.log("Events imported...");

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Event.deleteMany();
    await Venue.deleteMany();
    console.log("Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error with data destruction:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
