//library requires
const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");

//local requires
const views = require("./views/index.js");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.redirect("/wiki");
});
// app.get("/", (req, res) => {
//   const view = views.main();
//   res.send(view);
// });

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
