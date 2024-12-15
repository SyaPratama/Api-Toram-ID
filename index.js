import express from "express";
import { Log } from "./helper/Log.js";
import { List } from "./lib/List/list.js";
import bodyParser from "body-parser";
import { Items } from "./lib/Perlengkapan&Crystal/item.js";
const App = express();
const Port = 3000;


App.use(bodyParser.json());

App.get('/list', async (req,res) => {
    try{
        res.set({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        const response = await List();
        res.status(response.status).json(response).end();
    }catch(e)
    {
        Log.error(`Server ERROR ${e}`);
        console.error(e);
        const response = e.response;
        res.status(response.status).json({Error: response.statusText, status: response.status}).end();
    }
})

App.post('/items', async (req,res) => {
    try{
        res.set({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        const { link, label } = req.body;
        if(!link || !label) return res.status(400).json({Error: "Payload Not Correct"}).end();
        const response = await Items(link,label);
        res.status(response.status).json(response).end();
    }catch(e)
    {
        Log.error(`Server ERROR ${e}`);
        console.error(e);
        const response = e.response;
        res.status(response.status).json({Error: response.statusText, status: response.status}).end();
    }
});

App.get('*', async (req,res) => {
    res.set({
        "Content-Type":"application/json",
        "Accept":"application/json"
    });

    res.status(404).json({
        message: "API NOT FOUND",
        status:404
    }).end();
})


App.listen(Port,() => {
    Log.info(`Server Listening At http://localhost:${Port}`);
})