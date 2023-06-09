import { PencilIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { deleteProduct, productsData } from "../../../api/Api";
import EditProductModal from "../../ModalDialogs/EditProducModal";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../../ModalDialogs/DeleteModal";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  "Product",
  "Stock",
  "Date added",
  "New in collection",
  "Old price",
  "New price",
  "Rating",
  "Edit",
];

const hostLink = "http://localhost:5108/";

export default function ProductsManagmentTable({ refreshCallback }) {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [productModalVisible, setProductModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts("");
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      fetchProducts("");
    }
  }, [searchTerm]);

  useEffect(() => {
    if (page <= totalPages) {
      fetchProducts(searchTerm);
    }
  }, [page]);

  const fetchProducts = async (searchTerm) => {
    try {
      const response = await productsData(page, searchTerm);
      const products = response.data.items;

      setTotalPages(response.data.totalPages);
      setProducts(products);
    } catch (error) {}
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    return formattedDate;
  };

  const refreshData = async () => {
    await fetchProducts(searchTerm);
    refreshCallback();
  };

  const removeProduct = async () => {
    try {
      await deleteProduct(selectedProduct.product_id);
      toast.success("Product deleted successfully");
      setDeleteModalVisible(false);
      refreshData();
    } catch {
      toast.error("Error deleting product");
    }
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Last Added Products
              </Typography>
              <Typography className="mt-1 font-normal text-gray-500">
                These are details about the last added products
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="flex items-center"></div>
              <div className="w-full relative flex items-center justify-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Start typing..."
                  className="pl-4 pr-10 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
                />
                {searchTerm.length > 0 ? (
                  <p
                    className="absolute right-3 cursor-pointer text-gray-400 hover:text-black duration-200"
                    onClick={() => fetchProducts("") & setSearchTerm("")}
                  >
                    x
                  </p>
                ) : (
                  <MagnifyingGlassIcon className="absolute right-2 h-6 w-6 text-gray-400" />
                )}
              </div>
              <Button
                color="blue"
                size="sm"
                className="w-full"
                onClick={() => fetchProducts(searchTerm)}
              >
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0 mt-5">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${
                      head === "Edit" ? "text-center" : ""
                    } `}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const isLast = index === products.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={product.product_id}
                    className="hover:bg-gray-100 duration-200"
                  >
                    {/* Product */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={hostLink + product.image}
                          alt={product.title.slice(0, 8) + "..."}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 p-1 object-cover"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {product.title}
                        </Typography>
                      </div>
                    </td>
                    {/* Stock */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.stock}
                      </Typography>
                    </td>
                    {/* Date added */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(product.created_at)}
                      </Typography>
                    </td>
                    {/* New in collection */}
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={product.isNew === true ? "Yes" : "No"}
                          className={`rounded-xl ${
                            product.isNew === true
                              ? "bg-green-300"
                              : "bg-amber-300"
                          }`}
                        />
                      </div>
                    </td>
                    {/* Old price */}
                    <td className={classes}>
                      <div className="flex items-center gap-3 text-red-500 font-semibold">
                        ${product.oldPrice}
                      </div>
                    </td>
                    {/* New price */}
                    <td className={classes}>
                      <div className="flex items-center gap-3 text-green-600 font-semibold">
                        ${product.price}
                      </div>
                    </td>
                    {/* Rating */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {product.rating} / 5
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex justify-center">
                        {/* Edit */}
                        <Tooltip content="Edit Product" className="p-2">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            className="flex items-center justify-center"
                            onClick={() =>
                              setSelectedProduct(product) &
                              setProductModalVisible(true)
                            }
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                        {/* Delete */}
                        <Tooltip content="Delete Product" className="p-2 ">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() =>
                              setSelectedProduct(product) &
                              setDeleteModalVisible(true)
                            }
                            className="flex items-center justify-center "
                          >
                            <FaTrash className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
              className="flex items-center justify-center w-7 h-7 "
            >
              {page}
            </IconButton>
            {/* <IconButton
            variant="text"~
            color="blue-gray"
            size="sm"
            className="flex items-center justify-center"
          >
            2
          </IconButton> */}

            <p className="text-gray-400">
              / {totalPages === 0 ? "1" : totalPages}
            </p>
          </div>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() => setPage(page === totalPages ? page : page + 1)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      {productModalVisible && (
        <EditProductModal
          product={selectedProduct}
          setModalVisible={setProductModalVisible}
          refreshCallback={refreshData}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal
          setModalVisible={setDeleteModalVisible}
          title={selectedProduct.title}
          onDelete={removeProduct}
        />
      )}
    </>
  );
}
