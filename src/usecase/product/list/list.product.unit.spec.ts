import Product from "../../../domain/product/entity/product";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

const products = [
  new Product("123", "Product 1", 20),
  new Product("456", "Product 2", 30),
]

const input: InputListProductDto = {}

const output: OutputListProductDto = {
  products: [
    {
      id: "123",
      name: "Product 1",
      price: 20,
    },
    {
      id: "456",
      name: "Product 2",
      price: 30,
    },
  ],
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('ListProduct Use Case Unit Test', () => {
  it('should list products', async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const actualProducts = await useCase.execute(input);

    expect(actualProducts.products).toHaveLength(2);
    expect(actualProducts).toEqual(output);
  });
})