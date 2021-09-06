const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("respond with ", (done) => {
    request(app).get("/").expect("../views/home", done);
  })
});
