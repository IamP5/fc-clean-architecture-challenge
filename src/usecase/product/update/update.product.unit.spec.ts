
import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto';
import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const input: InputUpdateProductDto = {
  id: '123',
  name: 'Product Updated',
  price: 20,
};

const output: OutputUpdateProductDto = {
  id: '123',
  name: 'Product Updated',
  price: 20,
};

const product = new Product('123', 'Product 1', 20);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('UpdateProduct Use Case Unit Test', () => {
  it('should update a product', async () => {
    const repository = MockRepository();
    const useCase = new UpdateProductUseCase(repository);

    const actualProduct = await useCase.execute(input);

    expect(actualProduct).toEqual(output);
  });

  it('should throw error when product not exists', async () => {
    const repository = MockRepository();

    repository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const useCase = new UpdateProductUseCase(repository);

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});