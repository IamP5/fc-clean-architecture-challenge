import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe('CreateProduct Use Case Integration Test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 20,
    };

    const output = {
      id: "123",
      name: "Product 1",
      price: 20,
    };

    const result = await usecase.execute(input);

    expect(result.id).toBeTruthy();
    expect(result.name).toEqual(output.name);
    expect(result.price).toEqual(output.price);

    const product = await productRepository.find(result.id);

    expect(product.id).toEqual(result.id);
    expect(product.name).toEqual(result.name);
    expect(product.price).toEqual(result.price);
  });
});