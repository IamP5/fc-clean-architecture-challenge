import Product from "../../../domain/product/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const input: InputFindProductDto = {
  id: "123",
};

const output: OutputFindProductDto = {
  id: "123",
  name: "Product 1",
  price: 20,
};

const product = new Product("123", "Product 1", 20);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('FindProduct Use Case Unit Test', () => {
  it('should find a product', async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);

    const actualProduct = await useCase.execute(input);

    expect(actualProduct).toEqual(output);
  });

  it('should throw error when product not exists', async () => {
    const repository = MockRepository();

    repository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const useCase = new FindProductUseCase(repository);

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});

