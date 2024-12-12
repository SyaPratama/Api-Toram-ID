import * as Cheerio from "cheerio";
import { URL } from "../../helper/URI.js";

export const ListPerlengkapan = async () => {
    const content = await URL.get("/");
    const $ = Cheerio.load(content.data);
    const List = [];
    $(".nav-item:nth-child(2)").find('.dropdown-menu .dropdown-item').each(function() 
    {
        const Link = this.attribs.href;
        const Name = this.children[0].data;
        List.push({
            name: Name,
            link: Link
        });
    }
    );
    return {
        message: "Berhasil Mendapatkan Data List Perlengkapan",
        status:200,
        data:List
    }
}