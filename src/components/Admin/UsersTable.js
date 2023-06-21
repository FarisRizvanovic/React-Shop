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
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/Api";
import EditUserModal from "../ModalDialogs/EditUserModal";

const TABLE_HEAD = [
  "Profile picture",
  "First name",
  "Last name",
  "Role",
  "Edit",
];

const defaultProfilePicture = "http://localhost:5108/Resources/user.jpeg";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers("");
  }, []);

  const fetchUsers = async (searchTerm) => {
    try {
      const response = await getUsers(page, searchTerm);
      const users = response.data.items;
      setTotalPages(response.data.totalPages);
      setUsers(users);
    } catch (error) {}
  };

  useEffect(() => {
    if (page <= totalPages) {
      fetchUsers(searchTerm);
    }
  }, [page]);

  useEffect(() => {
    if (searchTerm === "") {
      fetchUsers("");
    }
  }, [searchTerm]);

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                All users
              </Typography>
              <Typography className="mt-1 font-normal text-gray-500">
                List of all users and roles
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
                    onClick={() => fetchUsers("") & setSearchTerm("")}
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
                onClick={() => fetchUsers(searchTerm)}
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
              {users.map((user, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user.id} className="hover:bg-gray-100 duration-200">
                    {/* Profile picture */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={defaultProfilePicture}
                          alt={"title"}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 p-1 object-cover"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {user.username}
                        </Typography>
                      </div>
                    </td>
                    {/* First name */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.first_name}
                      </Typography>
                    </td>
                    {/* Last name */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.last_name}
                      </Typography>
                    </td>
                    {/* Role */}
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={user.role === "admin" ? "Admin" : "User"}
                          className={` rounded-xl ${
                            user.role === "admin"
                              ? "bg-green-300"
                              : "bg-amber-300"
                          }`}
                        />
                      </div>
                    </td>
                    {/* Edit */}
                    <td className={classes}>
                      <Tooltip content="Edit User" className="p-2">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() =>
                            setSelectedUser(user) & setModalVisible(true)
                          }
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
        <EditUserModal user={selectedUser} setModalVisible={setModalVisible} />
      )}
    </>
  );
}
