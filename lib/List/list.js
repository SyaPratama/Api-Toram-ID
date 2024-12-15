import * as Cheerio from "cheerio";
import { URL } from "../../helper/URI.js";

export const List = async () => {
    const content = await URL.get("/");
    const $ = Cheerio.load(content.data);
    const LabelMenu = [];
    const MenuByLabel = [];
    const Arr = [];
    for(let i = 2; i <= 12; i++)
    {
        $(`.nav-item:nth-child(${i})`).find('.dropdown-menu .dropdown-item').each(function() 
        {
            const Link = this.attribs.href;
            const Name = this.children[0].data.split('\n').join('').replaceAll(/[ ]+/g," ");
            const Label = $(this.parent.parent.parent.parent)._findBySelector(`.nav-item:nth-child(${i}) .nav-link`).text().trim();
            if(!LabelMenu.find(v => v === Label ))
            {
                LabelMenu.push(Label);
            }
            Arr.push({
                Label,
                Name,
                Link
            });
        }
        );   
    }
    for(const item of LabelMenu)
    {
        for(const value of Arr)
            {
            if(!MenuByLabel.find(el => el.MenuByLabel == item) && item === value.Label)
            {
                MenuByLabel.push({
                    MenuByLabel: item,
                    Item: []
                });
                MenuByLabel.find(el => el.MenuByLabel == value.Label).Item.push(value);
            } else{
                if(MenuByLabel.find(el => el.MenuByLabel == value.Label) && item == value.Label)
                {
                    MenuByLabel.find(el => el.MenuByLabel == value.Label).Item.push(value);
                }
            }
        }
    }
    return {
        message: "Berhasil Mendapatkan List",
        status:200,
        data: MenuByLabel
    }
}