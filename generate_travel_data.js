const fs = require("fs")

// Load existing database
let db = {}

try {
  db = JSON.parse(fs.readFileSync("db.json"))
} catch (e) {
  db = {}
}

const cities = [
"Ahmedabad",
"Surat",
"Vadodara",
"Rajkot",
"Bhavnagar",
"Jamnagar",
"Junagadh",
"Gandhinagar",
"Anand",
"Nadiad",
"Mumbai",
"Pune",
"Delhi",
"Jaipur",
"Udaipur",
"Indore",
"Bhopal",
"Bangalore",
"Hyderabad",
"Chennai"
]

let cityData = []
let routes = []
let providers = []
let buses = []
let busSeats = []
let boardingPoints = []

let routeId = 1
let busId = 1
let seatId = 1
let boardingId = 1

// Generate Cities
cities.forEach((city, i) => {
  cityData.push({
    id: i + 1,
    name: city
  })
})

// Providers
providers = [
{
  id: 1,
  name: "GSRTC",
  type: "bus_operator",
  contact: "9876543210"
},
{
  id: 2,
  name: "Patel Travels",
  type: "bus_operator",
  contact: "9876543211"
},
{
  id: 3,
  name: "VRL Travels",
  type: "bus_operator",
  contact: "9876543212"
},
{
  id: 4,
  name: "DailyHive Travels",
  type: "bus_operator",
  contact: "9876543213"
}
]

// Generate routes and buses
for (let i = 0; i < cities.length; i++) {

  for (let j = 0; j < cities.length; j++) {

    if (i !== j) {

      routes.push({
        id: routeId,
        from: cities[i],
        to: cities[j],
        distance: 200 + Math.floor(Math.random() * 400)
      })

      for (let k = 0; k < 2; k++) {

        const providerId =
        Math.floor(Math.random() * providers.length) + 1

        buses.push({
          id: busId,
          busName: "Express " + busId,
          providerId,
          routeId,
          departure: `${6 + k}:00`,
          arrival: `${10 + k}:30`,
          price: 300 + Math.floor(Math.random() * 700),
          busType: "AC Sleeper",
          totalSeats: 40
        })

        boardingPoints.push({
          id: boardingId++,
          busId,
          location: cities[i] + " Central Bus Stand",
          time: `${6 + k}:00`
        })

        boardingPoints.push({
          id: boardingId++,
          busId,
          location: cities[i] + " Highway Point",
          time: `${6 + k}:20`
        })

        for (let s = 1; s <= 40; s++) {

          busSeats.push({
            id: seatId++,
            busId,
            seatNumber: "S" + s,
            status: "available"
          })

        }

        busId++
      }

      routeId++
    }
  }
}

// Merge with existing database
db.cities = cityData
db.routes = routes
db.providers = providers
db.buses = buses
db.busSeats = busSeats
db.boardingPoints = boardingPoints

// Ensure arrays exist
db.ticketBookings = db.ticketBookings || []
db.passengers = db.passengers || []

fs.writeFileSync("db.json", JSON.stringify(db, null, 2))

console.log("Travel API generated successfully")