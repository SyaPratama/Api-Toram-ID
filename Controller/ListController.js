import { Log } from "../Helper/Log.js";
import { ListItem } from "../Lib/Menu/list.js";
import { ListNPC } from "../Lib/Peta&Npc/listNpc.js";
import { ListPeta } from "../lib/Peta&Npc/listPeta.js";

export default class ListController {
  static async void(req, res) {
    try {
      res.set({
        "Content-Type": "application/json",
        "Accept": "application/json",
      });
      let response;
      const { type } = req.params;
      switch (type) {
        case "menu":
          response = await ListItem();
          break;
        case "peta":
          response = await ListPeta();
          break;
        case "npc":
          response = await ListNPC();
          break;
        default:
          response = {
            message: "List Tidak Ditemukan!",
            status: 404,
          };
          break;
      }
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
