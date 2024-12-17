import * as Cheerio from "cheerio";
import { URL } from "../../helper/URI.js";
import { List } from "../List/list.js";

export const Items = async (uri, label) => {
  const ItemList = (await List()).data;
  const DataPerlengkapan = [];

  if (label.toLowerCase() !== "Perlengkapan".toLowerCase() && label.toLowerCase() !== "Crysta".toLowerCase() ) 
  {
    return {
      message: `Label Harus Perlengkapan Atau Crystal Bukan ${label}`,
      status: 404,
    }
  }

  let FindPerlengkapan = ItemList.find(
    (v) => v.MenuByLabel.toLowerCase() === label.toLowerCase()
  ).Item.find((val) => val.Link.toLowerCase() == uri.toLowerCase());
  if (!FindPerlengkapan) {
    return {
      message: `${label} Tidak Ditemukan!`,
      status: 404,
    };
  }
  let content = await URL.get(`${uri}`);
  let $ = Cheerio.load(content.data);
  let num = 1;
  const pagination = parseInt(
    $(".pagination li.page-item").last().prev().find("a").text()
  );
  for (let i = 1; i <= pagination; i++) {
    content = await URL.get(`${uri}?page=${i}`);
    $ = Cheerio.load(content.data);
    $(".col-md-8:nth-child(2) .card").each(function () {
      const title = $(this).find(".text-primary").text();
      const status = $(this)
        ._findBySelector(`div[id*='status-monster'] div`)
        .text()
        .replaceAll(/[ ]+/g, " ")
        .trim();
      const statusNPC = $(this)
        ._findBySelector(`div[id*='status-npc'] div`)
        .text()
        .replaceAll(/[ ]+/g, " ")
        .trim();
      const craftPlayer = $(this)
        ._findBySelector(`div[id*='mats'] div`)
        .text()
        .replaceAll(/[ ]+/g, " ")
        .trim();
      const dropDari = [];
      $(this)
        ._findBySelector("details a")
        .each(function () {
          if ($(this).hasClass("mr-1")) {
            const drop = $(this).text().replaceAll("\n", "");
            const detail = $(this)
              .next()
              ._findBySelector(".text-muted")
              .text()
              .replaceAll(/[ ]+/g, " ")
              .trim();
            const text = `${drop} ${detail}`;
            dropDari.push(text);
          } else if (!$(this).hasClass("text-muted")) {
            dropDari.push("-- Tidak Drop Dimanapun --");
          }
        });
      DataPerlengkapan.push({
        id: num,
        title,
        status,
        statusNPC,
        craftPlayer,
        dropDari,
      });
      num++;
    });
  }
  return {
    message: "Berhasil Mendapatkan Data Perlengkapan",
    status: 200,
    data: DataPerlengkapan,
  };
};
