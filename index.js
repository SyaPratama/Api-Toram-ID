import express  from "express";
import { Log } from "./helper/Log.js";
import { ListPerlengkapan } from "./lib/Perlengkapan/list.js";
const App = express();
const Port = 3000;
App.get('/', async (req,res) => {
    try{
        res.set({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        const response = await ListPerlengkapan();
        res.status(response.status);
        res.json(response);
        res.end();
    }catch(e)
    {
        Log.error(`Server ERROR ${e}`);
        console.error(e);
        res.status(500).json({Error: "Internal Server ERROR"});
    }
})


App.listen(Port,() => {
    Log.info(`Server Listening At http://localhost:${Port}`);
})