import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { deleteOrderItem } from "../../../api/Api";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../../ModalDialogs/DeleteModal";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Product", "Stock", "Quantity", "Price", "Edit"];

const hostLink = "http://localhost:5108/";

export default function OrderDetailsProductsTable({
  products,
  onPrevious,
  onNext,
  page,
  totalPages,
  refreshCallback,
}) {
  const [deleteModal, setDeleteModalVisible] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState({});

  const removeOrderItem = async () => {
    try {
      await deleteOrderItem(selectedOrderItem.order_item_id);
      toast.success("Order item removed.");
      setDeleteModalVisible(false);
      refresh();
    } catch {
      toast.error("Couldn't remove order item.");
    }
  };

  const refresh = () => {
    refreshCallback();
  };

  return (
    <>
      {" "}
      <Card className="h-full w-full">
        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                          alt={product.title}
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
                    {/* Quantity */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {1}
                      </Typography>
                    </td>
                    {/* Price */}
                    <td className={classes}>
                      <div className="flex items-center gap-3 text-green-600 font-semibold">
                        ${product.price}
                      </div>
                    </td>
                    {/* Remove */}
                    <td className={classes}>
                      <Tooltip content="Remove order item" className="p-2">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          className="flex items-center justify-center"
                          onClick={() =>
                            setSelectedOrderItem(product) &
                            setDeleteModalVisible(true)
                          }
                        >
                          <FaTrash className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
            onClick={() => onPrevious()}
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
            onClick={() => onNext()}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      {deleteModal && (
        <DeleteModal
          title={selectedOrderItem.title}
          setModalVisible={setDeleteModalVisible}
          onDelete={removeOrderItem}
        />
      )}
    </>
  );
}
