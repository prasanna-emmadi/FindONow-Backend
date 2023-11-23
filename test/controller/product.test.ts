
import request from 'supertest';
import app from '../../'; 
// import connect, { MongoHelper } from '../db-helper';

describe('Product controller', () => {
  // let mongoHelper: MongoHelper;

  beforeAll(async () => {
  //   // Initialize your database connection if needed
  //   mongoHelper = await connect();
  });

  afterEach(async () => {
  //   // Clear database or perform necessary cleanup
  //   // await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
  //   // Close the database connection if needed
  //   // await mongoHelper.closeDatabase();
  });
 
 

  it('Should create a product', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .send({
        _id: '655e78935512aa4109537c03',
        name: 'Smartphone',
        description: 'High-end smartphone with advanced features',
        price: 799.99,
        image: 'https://example.com/smartphone.jpg',
        categoryId: "654e9ddac9cca8d8e6641666"
      });

   
  
    expect(response.body.product).toHaveProperty('name');
    expect(response.body.product.name).toEqual('Smartphone');
    expect(response.body.product).toHaveProperty('description');
    expect(response.body.product.description).toEqual('High-end smartphone with advanced features');
    expect(response.body.product).toHaveProperty('price');
    expect(response.body.product.price).toEqual(799.99);
    expect(response.body.product).toHaveProperty('image');
    expect(response.body.product.image).toEqual('https://example.com/smartphone.jpg');
    expect(response.body.product).toHaveProperty('categoryId');
    expect(response.body.product.categoryId).toEqual('654e9ddac9cca8d8e6641666');
  });

  it('Should get the product', async () => {
    const response = await request(app).get('/api/v1/products/655e9e23106158f8d895ccc1');
    
    const responseObject = JSON.parse(response.text);
    
console.log("#####################",response.text)
    expect(responseObject.product).toHaveProperty('name');
    expect(responseObject.product.name).toEqual('Smartphone99');
    expect(responseObject.product).toHaveProperty('description');
    expect(responseObject.product.description).toEqual('High-end smartphone with advanced features');
    expect(responseObject.product).toHaveProperty('price');
    expect(responseObject.product.price).toEqual(799.99);
    expect(responseObject.product).toHaveProperty('image');
    expect(responseObject.product.image).toEqual('https://example.com/smartphone.jpg');
    expect(responseObject.product).toHaveProperty('categoryId');
    expect(responseObject.product.categoryId._id).toEqual('655e9e08106158f8d895ccbe');
   
  });

  it('Should update the product', async () => {
    const response = await request(app)
      .put('/api/v1/products/655ea039d3be60c4fa66469d')
      .send({
        name: 'Updated Smartphone',
        description: 'Updated description for the smartphone',
        price: 899.99,
        image: 'https://example.com/updated-smartphone.jpg',
        categoryId: '655e9e08106158f8d895ccbe',
      });
      
   
    
      const responseData = JSON.parse(response.text);
    // console.log("###########################################",responseData);
    // console.log("##1111111111111111111111111111111111111111",response.body);
    // console.log("222222222222222222222222222222222222222222",response.text);
       
    
    expect(response.body.product).toHaveProperty('name');
    expect(response.body.product.name).toEqual('Updated Smartphone');
    expect(response.body.product).toHaveProperty('description');
    expect(response.body.product.description).toEqual('Updated description for the smartphone');
    expect(response.body.product).toHaveProperty('price');
    expect(response.body.product.price).toEqual(899.99);
    expect(response.body.product).toHaveProperty('image');
    expect(response.body.product.image).toEqual('https://example.com/updated-smartphone.jpg');
    expect(response.body.product).toHaveProperty('categoryId');
    expect(response.body.product.categoryId._id).toEqual('655e9e08106158f8d895ccbe');
 
  });

  


    it('Should delete the product', async () => {
    const response = await request(app).delete('/api/v1/products/655e78935512aa4109537c03');

    
    const responseBody = JSON.parse(response.text);
    const message = responseBody.message;
    // console.log("###########################################",message);
    expect(responseBody).toHaveProperty('message');
    expect(message).toEqual('Product deleted successfully');
  });
});




