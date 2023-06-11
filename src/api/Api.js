import axios from "axios";
const host = "http://localhost:5108";

export async function productsData() {
  const products = await axios.get(host + "/api/Products/GetProducts");
  return products;
}

export async function categoriesData() {
  const categories = await axios.get(host + "/api/Categories/GetCategories");
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

export async function getProductsLowOnStock() {
  const limit = 5;
  const lowOnStock = await axios.get(
    `${host}/api/Products/GetProductsLowOnStock/products/lowonstock/limit=${limit}`
  );
  return lowOnStock;
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

export async function getUsers() {
  const users = await axios.get("http://localhost:5108/api/User/GetUsers");

  return users;
}

export async function GetOrders() {
  const orders = await axios.get("http://localhost:5108/api/Orders/GetOrders");

  return orders;
}

export async function ordersWithCustomers() {
  const ordersResponse = await GetOrders();
  const orders = ordersResponse.data;

  const ordersWithCustomerNames = await Promise.all(
    orders.map(async (order) => {
      const customerNameResponse = await GetCustomerById(order.customer_id);
      return {
        ...order,
        customer: customerNameResponse.data,
      };
    })
  );

  return ordersWithCustomerNames;
}

export async function GetCustomerById(customerId) {
  const customer = await axios.get(
    `http://localhost:5108/api/Customers/GetCustomerById/orderid=${customerId}`
  );

  return customer;
}

export async function orderItemsForOrderId(orderId) {
  const orderItems =
    await axios.get(`http://localhost:5108/api/OrderItems/GetOrderItems/orderitems/orderid=${orderId}
  `);

  return orderItems;
}

export async function productsForOrderId(orderId) {
  const ordersItemsResponse = await orderItemsForOrderId(orderId);
  const orders = ordersItemsResponse.data;
  const productsForOrderId = await Promise.all(
    orders.map(async (order) => {
      const product = await productById(order.product_id);
      return { ...order, ...product.data };
    })
  );

  return productsForOrderId;
}

export async function productById(productId) {
  const product = await axios.get(
    `http://localhost:5108/api/Products/GetProductById/product/id=${productId} `
  );
  return product;
}
