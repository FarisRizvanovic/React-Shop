import axios from "axios";
const host = "http://localhost:5108";

export async function productsData(page, searchTerm) {
  const products = await axios.get(host + `/products/${page}/${searchTerm}`);

  console.log(products);
  return products;
}

export async function categoriesData() {
  const categories = await axios.get(host + "/categories");
  return categories;
}

export async function addANewProduct(formData) {
  const addANewProductRequest = await axios.post(host + "/products", formData);
  return addANewProductRequest;
}

export async function getProductCount() {
  const productCount = await axios.get(host + "/products/count");
  return productCount;
}

export async function getCategoryCount() {
  const categoryCount = await axios.get(host + "/categories/count");
  return categoryCount;
}

export async function categoriesWithNumberOfItems(page, searchTerm) {
  const categories = await axios.get(
    `http://localhost:5108/categories/itemcount/${page}/${searchTerm}`
  );

  return categories;
}

export async function getProductsLowOnStock(page, searchTerm) {
  const limit = 5;
  const lowOnStock = await axios.get(
    `${host}/products/lowonstock/${limit}/${page}/${searchTerm}`
  );
  return lowOnStock;
}

export async function getProductsLowOnStockCount() {
  const limit = 5;
  const lowOnStockCount = await axios.get(
    `${host}/products/lowonstock/count/${limit}`
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

export async function getUsers(page, searchTerm) {
  const users = await axios.get(
    `http://localhost:5108/users/${page}/${searchTerm}`
  );

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

export async function orderItemsForOrderId(orderId, page) {
  const orderItems = await axios.get(
    `http://localhost:5108/orderitems/${page}/${orderId}`
  );

  return orderItems;
}

export async function productsForOrderId(orderId, page) {
  const ordersItemsResponse = await orderItemsForOrderId(orderId, page);
  const orders = ordersItemsResponse.data.items;
  const productsForOrderId = await Promise.all(
    orders.map(async (order) => {
      const product = await productById(order.product_id);

      console.log(order);

      return { ...order, ...product.data };
    })
  );

  return productsForOrderId;
}

export async function productById(productId) {
  const product = await axios.get(
    `http://localhost:5108/product/${productId} `
  );
  return product;
}
