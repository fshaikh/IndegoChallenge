// General:
//   Request must return 404 for unhandled routes

// 1. // GET /api/v1/stations?at=2017-11-01T11:00:00
//      a. Request must return station data in the right format (at,stations,weather) when given valid data
//          a.1 Only return at, stations and weather without system fields
//      b. Request must return 404 when passing timestamp which doesnt exist in MongoDb
//      c. Request must return 400 when passing invalid timestamp value (null or invalid date)

// GET /api/v1/stations/id?at=2017-11-01T11:00:00
//      a. Request must return station data in the right format when given valid data
//          a.1 Only return at, station and weather without system fields
//          a.2 Only return the data for station with passed Id
//      b. Request must return 404 when passing timestamp or station id which doesnt exist in MongoDb
//      c. Request must return 400 when passing invalid timestamp value (null or invalid date)
//
//
//


