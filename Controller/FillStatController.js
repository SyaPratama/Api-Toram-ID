import { Log } from "../Helper/Log.js";
import { FillStatFormula } from "../Lib/Tools/fillStatFormula.js";

export default class FillStatController {
  static async void(req, res) {
    try {
        res.set({
            "Content-Type": "application/json",
            "Accept": "application/json",
          });
          const response = await FillStatFormula();
          return res.status(response.status).json(response).end();
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
