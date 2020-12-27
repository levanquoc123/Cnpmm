import bcrypt from "bcryptjs";

const users = [
   {
    name: "quoc",
    email: "quoc1@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "tri",
    email: "tri@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
