import axiosInstance from "./AxiosInstance";
import axios from "axios";

const host = "http://localhost:5108";

export async function productsData(page, searchTerm) {
  const products = await axiosInstance.get(`/products/${page}/${searchTerm}`);
  // const products = await axios.get(host + `/products/${page}/${searchTerm}`);
  return products;
}

export async function categoriesData() {
  const categories = await axiosInstance.get("/categories");
  // const categories = await axios.get(host + "/categories");
  return categories;
}

export async function addANewProduct(formData) {
  const addANewProductRequest = await axiosInstance.post("/products", formData);
  // const addANewProductRequest = await axios.post(host + "/products", formData);
  return addANewProductRequest;
}

export async function getProductCount() {
  const productCount = await axiosInstance.get(host + "/products/count");
  // const productCount = await axios.get(host + "/products/count");
  return productCount;
}

export async function getCategoryCount() {
  const categoryCount = await axiosInstance.get(host + "/categories/count");
  // const categoryCount = await axios.get(host + "/categories/count");
  return categoryCount;
}

export async function categoriesWithNumberOfItems(page, searchTerm) {
  const categories = await axiosInstance.get(
    `/categories/itemcount/${page}/${searchTerm}`
  );
  // const categories = await axios.get(
  //   `http://localhost:5108/categories/itemcount/${page}/${searchTerm}`
  // );

  return categories;
}

export async function getProductsLowOnStock(page, searchTerm) {
  const limit = 5;
  const lowOnStock = await axiosInstance.get(
    `/products/lowonstock/${limit}/${page}/${searchTerm}`
  );
  // const lowOnStock = await axios.get(
  //   `${host}/products/lowonstock/${limit}/${page}/${searchTerm}`
  // );
  return lowOnStock;
}

export async function getProductsLowOnStockCount() {
  const limit = 5;
  const lowOnStockCount = await axiosInstance.get(
    `/products/lowonstock/count/${limit}`
  );
  // const lowOnStockCount = await axios.get(
  //   `${host}/products/lowonstock/count/${limit}`
  // );
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
  const users = await axiosInstance.get(`/users/${page}/${searchTerm}`);

  // const users = await axios.get(
  //   `http://localhost:5108/users/${page}/${searchTerm}`
  // );

  return users;
}

export async function GetOrders() {
  const orders = await axiosInstance.get("/api/Orders/GetOrders");
  // const orders = await axios.get("http://localhost:5108/api/Orders/GetOrders");

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
  const customer = await axiosInstance.get(
    `/api/Customers/GetCustomerById/orderid=${customerId}`
  );
  // const customer = await axios.get(
  //   `http://localhost:5108/api/Customers/GetCustomerById/orderid=${customerId}`
  // );

  return customer;
}

export async function orderItemsForOrderId(orderId, page) {
  const orderItems = await axiosInstance.get(`/orderitems/${page}/${orderId}`);
  // const orderItems = await axios.get(
  //   `http://localhost:5108/orderitems/${page}/${orderId}`
  // );

  return orderItems;
}

export async function productsForOrderId(orderId, page) {
  const ordersItemsResponse = await orderItemsForOrderId(orderId, page);
  const orders = ordersItemsResponse.data.items;
  const productsForOrderId = await Promise.all(
    orders.map(async (order) => {
      const product = await productById(order.product_id);
      return { ...order, ...product.data };
    })
  );
  const data = ordersItemsResponse.data;

  return {
    page: data.page,
    pageSize: data.pageSize,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    items: productsForOrderId,
  };
}

export async function productById(productId) {
  const product = await axiosInstance.get(`/products/${productId}`);
  // const product = await axios.get(
  //   `http://localhost:5108/product/${productId} `
  // );
  return product;
}

export async function getProductsByCategoryId(categoryId, searchTerm, page) {
  const products = await axiosInstance.get(
    `/products/bycategory/${categoryId}/${page}/${searchTerm}`
  );
  // const products = await axios.get(
  //   `http://localhost:5108/products/bycategory/${categoryId}/${page}/${searchTerm}`
  // );

  return products;
}

export async function addOrder(orderRequest) {
  const request = await axiosInstance.post(`/orders/add`, orderRequest);
  // const request = axios.post(`http://localhost:5108/orders/add`, orderRequest);
  return request;
}

export async function updateUser(id, user) {
  const request = await axiosInstance.put(`/user/update/${id}`, user);
  // const request = await axios.put(
  //   `http://localhost:5108/user/update/${id}`,
  //   user
  // );
  return request;
}

export async function updateProduct(id, product) {
  const request = await axiosInstance.put(`/product/update/${id}`, product);
  // const request = await axios.put(
  //   `http://localhost:5108/product/update/${id}`,
  //   product
  // );
  return request;
}

export async function updateProductImage(id, formData) {
  const request = await axiosInstance.put(
    `/product/update/image/${id}`,
    formData
  );
  // const request = await axios.put(
  //   `http://localhost:5108/product/update/image/${id}`,
  //   formData
  // );
  return request;
}

export async function addCategory(categoryName, categoryDescription) {
  const request = await axiosInstance.post(
    `/categories/add/${categoryName}/${categoryDescription}`
  );
  // const request = await axios.post(
  //   `http://localhost:5108/categories/add/${categoryName}/${categoryDescription}`
  // );
  return request;
}

export async function updateCategory(id, category) {
  const request = await axiosInstance.put(`/category/update/${id}`, category);
  // const request = await axios.put(
  //   `http://localhost:5108/category/update/${id}`,
  //   category
  // );
  return request;
}

export async function deleteProduct(id) {
  const request = await axiosInstance.delete(`/product/delete/${id}`);
  // const request = await axios.delete(
  //   `http://localhost:5108/product/delete/${id}`
  // );
  return request;
}

export async function deleteCategory(id) {
  const request = await axiosInstance.delete(`/category/delete/${id}`);
  // const request = await axios.delete(
  //   `http://localhost:5108/category/delete/${id}`
  // );
  return request;
}

export async function deleteOrder(id) {
  const request = await axiosInstance.delete(`/order/delete/${id}`);
  // const request = await axios.delete(
  //   `http://localhost:5108/order/delete/${id}`
  // );
  return request;
}

export async function deleteOrderItem(id) {
  const request = await axiosInstance.delete(`/orderitem/delete/${id}`);
  // const request = await axios.delete(
  //   `http://localhost:5108/orderitem/delete/${id}`
  // );
  return request;
}

export async function deleteUser(id) {
  const request = await axiosInstance.delete(`/user/delete/${id}`);
  // const request = await axios.delete(`http://localhost:5108/user/delete/${id}`);
  return request;
}
