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
import { getUsers } from "../../api/Api";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        const users = response.data;

        setUsers(users);
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  return (
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
            <div className="w-full relative flex items-center justify-center">
              <input
                type="text"
                placeholder="Start typing..."
                className="pl-4 pr-10 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-400"
              />
              <MagnifyingGlassIcon className="absolute right-2 h-6 w-6 text-gray-400" />
            </div>
            <Button color="blue" size="sm" className="w-full">
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
            {users.map(
              (
                {
                  first_name,
                  id,
                  last_name,
                  password_hash,
                  password_salt,
                  role,
                  username,
                },
                index
              ) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id} className="hover:bg-gray-100 duration-200">
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
                          {username}
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
                        {first_name}
                      </Typography>
                    </td>
                    {/* Last name */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {last_name}
                      </Typography>
                    </td>
                    {/* Role */}
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={role === "admin" ? "Admin" : "User"}
                          className={` rounded-xl ${
                            role === "admin" ? "bg-green-300" : "bg-amber-300"
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
                          className="flex items-center justify-center"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
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
