import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { productsData, productsForOrderId } from "../../api/Api";

const TABLE_HEAD = ["Product", "Stock", "Quantity", "Price", "Edit"];

const hostLink = "http://localhost:5108/";

export default function OrderDetailsProductsTable({ products }) {
  return (
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
                  {/* Edit */}
                  <td className={classes}>
                    <Tooltip content="Edit Order" className="p-2">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        className="flex items-center justify-center"
                      >
                        <PencilIcon className="h-4 w-4" />
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
        <Button variant="outlined" color="blue-gray" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton
            variant="outlined"
            color="blue-gray"
            size="sm"
            className="flex items-center justify-center"
          >
            1
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            size="sm"
            className="flex items-center justify-center"
          >
            2
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            size="sm"
            className="flex items-center justify-center"
          >
            3
          </IconButton>
        </div>
        <Button variant="outlined" color="blue-gray" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
