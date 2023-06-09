import axios from "axios";

export async function productsData() {
  const products = await axios.get(
    "http://localhost:5108/api/Products/GetProducts"
  );

  return products;
}

export async function categoriesData() {
  const categories = await axios.get(
    "http://localhost:5108/api/Customers/GetCategories"
  );

  return categories;
}

export async function addANewProduct(formData) {
  const addANewProductRequest = await axios.post(
    "http://localhost:5108/api/Products/AddProduct",
    formData
  );

  return addANewProductRequest;
}
