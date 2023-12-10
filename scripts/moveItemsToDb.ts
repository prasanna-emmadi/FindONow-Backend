import axios from "axios";

const EXTERNAL_BASE_URL = "https://api.escuelajs.co/api/v1/";
const EXTERNAL_PRODUCTS_URL = EXTERNAL_BASE_URL + "products";
const EXTERNAL_CATEGORIES_URL = EXTERNAL_BASE_URL + "categories";

const INTERNAL_BASE_URL = "http://localhost:8080/api/v1/";
const INTERNAL_PRODUCTS_URL = INTERNAL_BASE_URL + "products";
const INTERNAL_CATEGORIES_URL = INTERNAL_BASE_URL + "categories";

// get products
// https://api.escuelajs.co/api/v1/products
// get categories
// https://api.escuelajs.co/api/v1/categories
// post products
// post categories
// http client
async function importCategories() {
  try {
    const categoriesResponse = await axios.get(EXTERNAL_CATEGORIES_URL);
    const categories = categoriesResponse.data;
    let promises = [];
    for (let i = 0; i < categories.length; i++) {
      const promise = axios.post(INTERNAL_CATEGORIES_URL, categories[i]);
      promises.push(promise);
    }
    const insertedCategories = await promises;
    return insertedCategories;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

const findCategoryId = (categories: any[], id: number) => {
  const found = categories.find((category) => {
    return category.id == id;
  });

  return found._id;
};

async function importProducts(categories: any) {
  try {
    const productsResponse = await axios.get(EXTERNAL_PRODUCTS_URL);
    const products = productsResponse.data;
    const modifiedProducts = products.map((product: any) => {
      const categoryId = findCategoryId(categories, product.category.id);
      return {
        ...product,
        category: categoryId,
      };
    });

    let promises = [];
    for (let i = 0; i < modifiedProducts.length; i++) {
      const promise = axios.post(INTERNAL_PRODUCTS_URL, modifiedProducts[i]);
      promises.push(promise);
    }
    await promises;
  } catch (error) {
    console.error(error);
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get(INTERNAL_CATEGORIES_URL);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

async function importData() {
  try {
    await importCategories();
    const categories = await getCategories();
    await importProducts(categories);
  } catch (error) {
    console.error(error);
  }
}

importData()
  .then((response) => console.log(response))
  .catch((e) => console.error(e));
