const express = require("express");
const wikiRouter = express.Router();
const views = require("../views/index.js");

const { Page } = require("../models/index.js");
const { addPage } = require("../views");

wikiRouter.get("/", (req, res) => {
  res.send("test");
});

wikiRouter.post("/", async (req, res, next) => {
  // res.json(req.body);
  console.log(req.body);

  try {
    const page = await Page.create(req.body);

    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

wikiRouter.get("/add", (req, res) => {
  const addPage = views.addPage();
  res.send(addPage);
});

module.exports = wikiRouter;
