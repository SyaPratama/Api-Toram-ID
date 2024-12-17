import express from "express";
import bodyParser from "body-parser"
import { Log } from "./Helper/Log.js";
import ListController  from "./Controller/ListController.js";
import ItemController from "./Controller/ItemController.js";
import FillStatController from "./Controller/FillStatController.js";
const App = express();
const Port = 3000;

App.use(bodyParser.json());

App.get("/list/:type", async (req, res) => {
    return await ListController.void(req,res); 
});

App.post("/items", async (req, res) => {
  return await ItemController.void(req,res);
});

App.get("/fill_stats/formula", async (req,res) => {
  return await FillStatController.void(req,res);
})


App.get("*", async (req, res) => {
  res.set({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  res
    .status(404)
    .json({
      message: "API NOT FOUND",
      status: 404,
    })
    .end();
});

App.listen(Port, () => {
  Log.info(`Server Listening At http://localhost:${Port}`);
});
