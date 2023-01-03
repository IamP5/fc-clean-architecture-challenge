import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const input: InputCreateProductDto = {
  name: "Product 1",
  price: 20
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('CreateProduct Use Case Unit Test', () => {
  it('should create a product', async () => {
    const repository = MockRepository();
    const useCase = new CreateProductUseCase(repository);

    const actualProduct = await useCase.execute(input);

    expect(actualProduct).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});

