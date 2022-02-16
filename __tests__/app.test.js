const { request } = require("express");
const supertest = require("supertest");
const address = require("../controllers/address");

/*

"country": "CZ",
"city": "Brno",
"street": "Husova",
"postalcode": "60200",
"number": 6,
"numberAddition": ""

*/

describe("POST /address", () => {
  describe("given  country , city ,street ,postalcode, number , numberAddition", () => {
      const response = await request(server).post('api/v1/address').send({
        
      })
  });
});
