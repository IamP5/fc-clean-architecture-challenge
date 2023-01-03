import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product with invalid price", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: -10,
      });

    expect(response.status).toBe(500);
  });

  it("should list products", async () => {

    const product1 = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10,
      });

    const product2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 20,
      });


    const response = await request(app)
      .get("/product")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products[0]).toEqual(product1.body);
    expect(response.body.products[1]).toEqual(product2.body);
  });
});