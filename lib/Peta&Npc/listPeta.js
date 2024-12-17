import * as Cheerio from "cheerio";
import { URL } from "../../Helper/URI.js";

export const ListPeta = async () => {
    const Content = await URL.get("/monster");
    const $ = Cheerio.load(Content.data);
    const List = [];
    let num = 1;
    $('.card-body .kunci').each(function(){
        const Link = $(this)._findBySelector('.key').attr('href');
        const Name = $(this)._findBySelector('.key').text();

        List.push(
            {
                id: num,
                nama: Name,
                link: Link
            }
        )
        num++;
    })
    return {
        message: "Berhasil Mendapat List Peta",
        status: 200,
        data: List
    }
}