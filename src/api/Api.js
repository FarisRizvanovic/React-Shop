import axios from "axios";

export async function productsData() {
  // const products = await axios.get(
  //   "https://fakestoreapiserver.reactbd.com/products"
  // );

  const products = await axios.get(
    "http://localhost:5108/api/Products/GetProducts"
  );

  // console.log(p.data);
  return products;
}

export async function categoriesData() {
  const categories = await axios.get(
    "http://localhost:5108/api/Customers/GetCategories"
  );

  return categories;
}
