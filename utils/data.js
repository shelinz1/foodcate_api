const bcrypt = require("bcryptjs");
const data = {
  users: [
    {
      name: "shadrach",
      email: "itodoshadrach@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },

    {
      name: "shadrach",
      email: "itodoshadrach10@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
};

module.exports = data;
