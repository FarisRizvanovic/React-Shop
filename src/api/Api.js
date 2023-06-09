import axios from "axios";
const host = "http://localhost:5108";

export async function productsData() {
  const products = await axios.get(host + "/api/Products/GetProducts");
  return products;
}

export async function categoriesData() {
  const categories = await axios.get(host + "/api/Customers/GetCategories");
  return categories;
}

export async function addANewProduct(formData) {
  const addANewProductRequest = await axios.post(
    host + "/api/Products/AddProduct",
    formData
  );
  return addANewProductRequest;
}

export async function getProductCount() {
  const productCount = await axios.get(host + "/api/Products/GetProductCount");
  return productCount;
}

export async function getCategoryCount() {
  const categoryCount = await axios.get(
    host + "/api/Category/GetCategoryCount"
  );
  return categoryCount;
}

export async function getProductsLowOnStockCount() {
  const limit = 5;
  const lowOnStockCount = await axios.get(
    `${host}/api/Products/GetProductsLowOnStockCount/products/lowonstockcount/limit=${limit}`
  );
  return lowOnStockCount;
}

export async function getDashboardData() {
  const productCount = await getProductCount();
  const categoryCount = await getCategoryCount();
  const lowOnStockCount = await getProductsLowOnStockCount();

  return {
    productCount: productCount.data,
    categoryCount: categoryCount.data,
    lowOnStockCount: lowOnStockCount.data,
  };
}

export async function getProductManagmentInitialData() {
  const productCount = await getProductCount();
  const categoryCount = await getCategoryCount();
  const lowOnStockCount = await getProductsLowOnStockCount();
  const products = await productsData();

  return {
    productCount: productCount.data,
    categoryCount: categoryCount.data,
    lowOnStockCount: lowOnStockCount.data,
    productData: products.data,
  };
}
