import { getServerSession } from "next-auth";
import {PrismaClient} from "../../../../lib/db"

export default async function post(req,res){
    const session = await getServerSession();
    if(session?.user?.email){
        return res.status(403).json({
            message: "Unautheniticated"
        })
    }
    const userid = await PrismaClient.user.findFirst({
        where:{
            email: session?.user?.email
        }
    });
    if(!userid){
        return res.status(403).json({
            message: "User with such email id doesnt exist"
        })
    }
    try{
        const data = JSON.parse(req.body)
        await PrismaClient.upvotes.create({
            userId: userid,
            streamId: data.streamId
        })
    }
    catch(e){
        return res.statuss(403).json({
            message: "Erorr"
        })
    }
}