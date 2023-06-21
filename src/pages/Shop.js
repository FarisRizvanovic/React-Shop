import React, { useEffect, useState, useRef } from "react";
import ShopProducts from "../components/ShopProducts";
import { useLoaderData } from "react-router-dom";
import Categories from "../components/Categories";
import { getProductsByCategoryId, productsData } from "../api/Api";
import { IconButton, Button } from "@material-tailwind/react";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_categoryId, _setCategoryId] = useState(1);
  const [_searchTerm, _setSearchTerm] = useState("");

  const data = useLoaderData();

  useEffect(() => {
    setTotalPages(data.data.totalPages);
    setProducts(data.data.items);
  }, [data]);

  useEffect(() => {
    searchProducts(_searchTerm, _categoryId);
  }, [page]);

  const searchProducts = async (searchTerm, categoryId) => {
    try {
      let response;
      if (categoryId !== 1) {
        response = await getProductsByCategoryId(
          categoryId,
          searchTerm,
          categoryId !== _categoryId ? 1 : page
        );
      } else {
        response = await productsData(
          categoryId !== _categoryId ? 1 : page,
          searchTerm
        );
      }
      const data = response.data.items;

      setTotalPages(response.data.totalPages);
      setProducts(data);
    } catch {}

    if (categoryId !== _categoryId) {
      setPage(1);
    }

    _setCategoryId(categoryId);
    _setSearchTerm(searchTerm);
  };

  return (
    <div className=" min-h-screen flex bg-gray-100">
      <div className="flex-5">
        <Categories searchCallback={searchProducts} />
      </div>
      <div className="flex-2 px-10 min-h-screen w-full">
        {products.length > 0 ? (
          <ShopProducts products={products} />
        ) : (
          <div className="min-h-screen flex justify-center pt-72">
            <p className="text-gray-400">No products found...</p>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-blue-gray-50 p-4 w-full">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton
              variant="outlined"
              color="blue-gray"
              size="sm"
              className="flex items-center justify-center"
            >
              {page}
            </IconButton>

            <p className="text-gray-400">
              / {totalPages == 0 ? "1" : totalPages}
            </p>
          </div>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() => setPage(page == totalPages ? page : page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
