const fs = require("fs")

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

// Cities
cities.forEach((city,i)=>{
    cityData.push({
        id:i+1,
        name:city
    })
})


// Providers
providers.push({
    id:1,
    name:"GSRTC",
    type:"bus_operator",
    contact:"9876543210"
})

providers.push({
    id:2,
    name:"Patel Travels",
    type:"bus_operator",
    contact:"9876543211"
})

providers.push({
    id:3,
    name:"VRL Travels",
    type:"bus_operator",
    contact:"9876543212"
})

providers.push({
    id:4,
    name:"DailyHive Travels",
    type:"bus_operator",
    contact:"9876543213"
})


// Routes
for(let i=0;i<cities.length;i++){
    for(let j=0;j<cities.length;j++){

        if(i!==j){

            routes.push({
                id:routeId,
                from:cities[i],
                to:cities[j],
                distance:200 + Math.floor(Math.random()*400)
            })

            // create buses
            for(let k=0;k<2;k++){

                const providerId = Math.floor(Math.random()*providers.length)+1

                buses.push({
                    id:busId,
                    busName:"Express "+busId,
                    providerId:providerId,
                    routeId:routeId,
                    departure:`${6+k}:00`,
                    arrival:`${10+k}:30`,
                    price:300+Math.floor(Math.random()*700),
                    busType:"AC Sleeper",
                    totalSeats:40
                })

                // Boarding points
                boardingPoints.push({
                    id:boardingId++,
                    busId:busId,
                    location:cities[i]+" Central Bus Stand",
                    time:`${6+k}:00`
                })

                boardingPoints.push({
                    id:boardingId++,
                    busId:busId,
                    location:cities[i]+" Highway Point",
                    time:`${6+k}:20`
                })

                // Seats
                for(let s=1;s<=40;s++){

                    busSeats.push({
                        id:seatId++,
                        busId:busId,
                        seatNumber:"S"+s,
                        status:"available"
                    })
                }

                busId++
            }

            routeId++
        }
    }
}


// Final database
const data={
cities:cityData,
routes,
providers,
buses,
busSeats,
boardingPoints,
ticketBookings:[],
passengers:[]
}

fs.writeFileSync("db.json",JSON.stringify(data,null,2))

console.log("Travel API generated successfully")