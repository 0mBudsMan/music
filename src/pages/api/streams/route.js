import {PrismaClient} from "../../../lib/db"
export async function post(req,res){
    try{
        const data = await req.json();
        const YTR = new RegExp("^(https?:\\/\\/)?(www\\.)?(youtube\\.com\\/(watch\\?v=|embed\\/|v\\/)|youtu\\.be\\/)([\\w\\-]{11})([&?=\\w]*)?$");
        const isYT = YTR.test(data.url);
        if(!isYT){
            return res.status(411).json({
                message: "Error valid URL"
            })
        }
        const extractedID = data.url.split("?v=")[1];
        await PrismaClient.stream.create({
            userId: data.creatorID,
            url: data.url,
            extractedID
        })
    }
    catch(e){
        return res.status(411).json({
            message: "Error while adding stream"
        })
    }
}