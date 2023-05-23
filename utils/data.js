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

  foods: [
    { name: "Ewa Agoyin", image: "", price: 30 },
    { name: "Rice and Chicken", image: "", price: 30 },
    ,
    { name: "Beans and Dodo", image: "", price: 30 },
    ,
    { name: "Moin-Moin", image: "", price: 30 },
    ,
    { name: "Plantain and Efo", image: "", price: 30 },
  ],
};

module.exports = data;
