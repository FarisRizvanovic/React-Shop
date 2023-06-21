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
import { categoriesWithNumberOfItems } from "../../api/Api";
import { toast } from "react-toastify";
import EditCategoryModal from "../ModalDialogs/EditCategoryModal";

const TABLE_HEAD = ["Category", "Items in category", "Edit"];

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState({});

  useEffect(() => {
    getCategoriesData("");
  }, []);

  const getCategoriesData = async (searchTerm) => {
    try {
      const response = await categoriesWithNumberOfItems(page, searchTerm);
      const data = response.data.items;

      setTotalPages(response.data.totalPages);
      setCategories(data);
    } catch (e) {
      console.log(e);
      toast.error("Couldn't get categories.");
    }
  };

  useEffect(() => {
    if (page <= totalPages) {
      getCategoriesData(searchTerm);
    }
  }, [page]);

  useEffect(() => {
    if (searchTerm === "") {
      getCategoriesData("");
    }
  }, [searchTerm]);

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Categories
              </Typography>
              <Typography className="mt-1 font-normal text-gray-500">
                List of all categories and their details
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
                    onClick={() => getCategoriesData("") & setSearchTerm("")}
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
                onClick={() => getCategoriesData(searchTerm)}
              >
                Search
              </Button>
              <Button
                color="green"
                className="h-fit w-full min-w-max whitespace-nowrap"
              >
                New Category
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${
                      head === "Edit" ? "text-center" : ""
                    }`}
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
              {categories.map((category, index) => {
                const isLast = index === category.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={category.category_id}
                    className="hover:bg-gray-100 duration-200"
                  >
                    {/* Category */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {category.name}
                        </Typography>
                      </div>
                    </td>
                    {/* Items in category */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {category.product_count}
                      </Typography>
                    </td>
                    {/* Edit */}
                    {category.name === "All Categories" ? (
                      <div></div>
                    ) : (
                      <td className={classes + " flex justify-center"}>
                        <Tooltip content="Edit Category" className="p-2 ">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() =>
                              setModalVisible(true) & setCategory(category)
                            }
                            className="flex items-center justify-center "
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    )}
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
        </CardFooter>
      </Card>
      {modalVisible && (
        <EditCategoryModal
          category={category}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}
