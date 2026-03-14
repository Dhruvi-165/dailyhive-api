const fs = require("fs")

const cities = [
"Ahmedabad",
"Vadodara",
"Anand",
"Surat",
"Mumbai",
"Pune",
"Delhi",
"Jaipur",
"Bangalore",
"Hyderabad",
"Indore",
"Bhopal",
"Udaipur",
"Rajkot",
"Bhavnagar",
"Jamnagar",
"Goa",
"Chandigarh",
"Lucknow",
"Kolkata"
]

let cityData=[]
let routes=[]
let buses=[]
let busSeats=[]

let routeId=1
let busId=1
let seatId=1

/// Create Cities
cities.forEach((city,i)=>{
    cityData.push({
        id:i+1,
        name:city
    })
})

/// Create Routes
for(let i=0;i<cities.length;i++){
    for(let j=0;j<cities.length;j++){

        if(i!==j){

            routes.push({
                id:routeId,
                from:cities[i],
                to:cities[j]
            })

            /// Create 3 buses per route
            for(let b=0;b<3;b++){

                buses.push({
                    id:busId,
                    routeId:routeId,
                    busName:"Express "+busId,
                    busType:b%2===0?"AC Sleeper":"Non AC Seater",
                    departure:`${6+b}:00`,
                    arrival:`${10+b}:30`,
                    price:300+Math.floor(Math.random()*700),
                    totalSeats:40
                })

                /// Create Seats
                for(let s=1;s<=40;s++){

                    busSeats.push({
                        id:seatId,
                        busId:busId,
                        seatNumber:"S"+s,
                        status:"available"
                    })

                    seatId++
                }

                busId++
            }

            routeId++
        }
    }
}

const data={
    cities:cityData,
    routes,
    buses,
    busSeats,
    ticketBookings:[]
}

fs.writeFileSync("db.json",JSON.stringify(data,null,2))

console.log("Travel API with 20 cities generated successfully")