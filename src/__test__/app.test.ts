import request from "supertest"
import app from "../app";
import { Server } from "http";



describe("Get/", () => {


  
  it("respond with 200", async () => {
    const respond = await request(app).get("/movie");
    expect(respond.statusCode).toBe(200);
  });
  it('respond with "hello world"', async () => {
    const respond = await request(app).get("/movie");
    expect(respond.statusCode).toBe(200);
  });
});