import * as Cheerio from "cheerio";
import { URL } from "../../helper/URI.js";

export const ListNPC = async () => {
    let Content = await URL.get('/npc');
    let $ = Cheerio.load(Content.data);
    const pagination = parseInt($('.pagination .page-item').last().prev()._findBySelector('.page-link').text());
    const npcList = [];
    let num = 1;
    for(let i = 1; i <= pagination; i++)
    {
        Content = await URL.get(`/npc?page=${i}`);
        $ = Cheerio.load(Content.data);
        $('.card-body div').each(function(){
            if(!$(this).hasClass('mb-2'))
            {
                const name = $(this)._findBySelector('a').text();
                const kota = $(this)._findBySelector('.text-muted').html() !== null ? $(this)._findBySelector('.text-muted').html().split('<br>')[0].replaceAll(/[ ]+/g,"").trim().replaceAll(/[()]+/g,"") : null;
                const quest = $(this)._findBySelector('.text-muted').html() !== null ? $(this)._findBySelector('.text-muted').html().split('<br>')[1].replaceAll(/[ ]+/g,"").trim().split(':').pop().replaceAll('quest','') : null;
                if(kota && quest)
                {
                    npcList.push({
                        id: num,
                        nama: name,
                        kota,
                        quest: parseInt(quest)
                    })
                    num++;
                }
            }
        })
    }
    return {
        message: "Berhasil Mendapatkan Data NPC",
        status: 200,
        data: npcList
    }
}
