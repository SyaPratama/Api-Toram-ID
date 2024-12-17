import { Log } from "../Helper/Log.js";
import { Items } from "../Lib/Perlengkapan&Crystal/item.js";

export default class ItemController
{
    static async void(req,res)
    {
        try {
            res.set({
              "Content-Type": "application/json",
              "Accept": "application/json",
            });
        
            const { link, label } = req.body;
            if (!link || !label)
              return res.status(400).json({ Error: "Payload Not Correct" }).end();
            const response = await Items(link, label);
            res.status(response.status).json(response).end();
          } catch (e) {
            Log.error(`Server ERROR ${e}`);
            console.error(e);
            const response = e.response;
            res
              .status(response.status)
              .json({ Error: response.statusText, status: response.status })
              .end();
          }
    }
}