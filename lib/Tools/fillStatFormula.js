import * as Cheerio from "cheerio";
import { URL } from "../../Helper/URI.js";

export const FillStatFormula = async () => 
{
    let Content = await URL.get('/fill_stats/formula');
    let $ = Cheerio.load(Content.data);
    const pagination = parseInt($('.pagination .page-item').last().prev()._findBySelector('.page-link').text());
    let listStats = [];
    const fillStatsWeapon = [];
    const fillStatsArmor = [];
    let num = 1;
    for(let i = 1; i <= pagination; i++)
    {
        $('.row .col-md-4').each(function(){
            const title = $(this)._findBySelector('.card-header .card-title').text().replaceAll(/[ ]+/g,' ').trim() || "Unknown";
            const type = $(this)._findBySelector('.card-body table tbody tr:nth-child(1) td').text().replaceAll(/[ ]+/g,' ').trim();
            const startingPotensial = parseInt($(this)._findBySelector('.card-body table tbody tr:nth-child(2) td').text().trim());
            const highestMaterialGet = parseInt($(this)._findBySelector('.card-body table tbody tr:nth-child(3) td').text().trim());
            const successRate = $(this)._findBySelector('.card-body table tbody tr:nth-child(4) td').text().replaceAll(/[ ]+/g,' ').trim();
            $(this)._findBySelector('.card-body div:nth-child(2) span').each(function(){
                return listStats.push($(this).text().replaceAll(/[ ]+/g,' ').trim());
            });
            if(type.toLowerCase().includes('weapon'))
            {
                num = fillStatsWeapon.length <= 0 ? 1 : fillStatsWeapon[fillStatsWeapon.length - 1].id + 1;
                fillStatsWeapon.push({
                    id: num,
                    title,
                    type,
                    startingPotensial,
                    highestMaterialGet,
                    successRate,
                    stats: listStats.join(' \n '),
                });
                num++;
                listStats = [];
            } else if(type.toLowerCase().includes('armor'))
            {
                num = fillStatsArmor.length <= 0 ? 1 : fillStatsArmor[fillStatsArmor.length - 1].id + 1;
                fillStatsArmor.push({
                    id: num,
                    title,
                    type,
                    startingPotensial,
                    highestMaterialGet,
                    successRate,
                    stats: listStats.join(' \n '),
                });
                num++;
                listStats = [];
            }
        })
    }
    return {
        message: "Berhasil Mendapatkan Data Fill Stats Formula",
        status: 200,
        data:{
            Weapon: fillStatsWeapon,
            Armor: fillStatsArmor,
        }
    }
}