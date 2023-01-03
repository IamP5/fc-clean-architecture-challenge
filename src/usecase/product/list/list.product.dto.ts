export interface InputListProductDto { }

export interface OutputListProductDto {
  products: Product[];
}

type Product = {
  id: string;
  name: string;
  price: number;
}