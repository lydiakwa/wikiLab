const Sequelize = require("sequelize");
// const { options } = require("../routes/wiki");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});

Page.beforeValidate(async (page) => {
  page.slug = page.title.replace(/\s+/g, "-").replace(/\W/g, "");
});

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

module.exports = {
  db,
  Page,
  User,
};
