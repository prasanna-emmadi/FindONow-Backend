import ProductService from '../../services/productsService'; 
import connect, { MongoHelper } from '../db-helper';
import ProductRepo from '../../models/Product';

describe('Product service', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it('should create a new product', async () => {
    // create new product
    const product: any = {
      _id: '655e1356be9cf967bdead01f',
      name: 'Test Product',
      description: 'This is a test product.',
      price: 19.99,
      image: 'test-image-url.jpg',
      categoryId: '655e1356be9cf967bdead01f',
    };

    const newProduct = await ProductService.createOne(product, '655e1356be9cf967bdead01f');
    console.log("@@@@@@@@@@@@@@@@@@@@@@",newProduct)

    expect(newProduct).not.toBeNull();
    expect(newProduct?.name).toEqual('Test Product');
  });

  it('should return a list of products', async () => {
    // create new product
    const newProduct = new ProductRepo({
      name: 'Test Product',
      description: 'This is a test product.',
      price: 19.99,
      image: 'https://example.com/smartphone.jpg',
      categoryId: '655e1356be9cf967bdead01f',
    });

    await newProduct.save();

    const products = await ProductService.findAll();
    console.log("########################",products)
    expect(products.length).toEqual(1);
  });

  it('should update a product', async () => {
    // create new product
    const product: any = {
      _id: '655e1356be9cf967bdead01f',
      name: 'Test Product',
      description: 'This is a test product.',
      price: 19.99,
      image: 'test-image-url.jpg',
      categoryId: '655e1356be9cf967bdead01f',
    };

    await ProductService.createOne(product, '655e1356be9cf967bdead01f');

    // update product
    const updatedProduct: any = {
      name: 'Updated Test Product',
      description: 'Updated description for the test product.',
      price: 29.99,
      image: 'updated-image-url.jpg',
      categoryId: '655e1356be9cf967bdead01f',
    };

    const newProduct = await ProductService.updateOne('655e1356be9cf967bdead01f', updatedProduct, '655e1356be9cf967bdead01f');
    expect(newProduct).not.toBeNull();
    expect(newProduct?.name).toEqual('Updated Test Product');
  });

  it('should delete a product', async () => {
    // create new product
    const product: any = {
      _id: '655e1356be9cf967bdead01f',
      name: 'Test Product',
      description: 'This is a test product.',
      price: 19.99,
      image: 'test-image-url.jpg',
      categoryId: '655e1356be9cf967bdead01f',
    };

    await ProductService.createOne(product, '655e1356be9cf967bdead01f');

    const newProduct = await ProductService.deleteOne('655e1356be9cf967bdead01f');
    expect(newProduct).not.toBeNull();
    expect(newProduct?.name).toEqual('Test Product');
  });
});
