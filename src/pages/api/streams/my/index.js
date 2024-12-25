import {prismaClient} from "../../../../lib/db"
import { getServerSession } from "next-auth";
export default async function anus (req,res){
    const session = await getServerSession(req,res);
    if(!session){
        return res.status(500).json({
            message: "login kar"
        });
    }
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                email: session?.user?.email
            }
        })
        if(!user){
            return res.status(500).json({
                message: "user no maido db ma"
            })
        }
        const stream = await prismaClient.stream.findMany({
            where:{
                userId: user?.id
            },
            include:{
                _count:{
                    select: {upvotes: true}
                },
                upvotes: {
                    where:{
                        userId: user?.id
                    }
                }
            }
        })
        return res.status(200).json({
            streams: stream.map(({_count, ...rest})=>({
                ...rest,
                upvotes: _count,
                haveUpvoted: rest.upvotes.length ? true: false
            }))
        })
    }
    catch(e){
        console.log(e.stack)
        return res.status(500).json({
            message: "error in returning streams"
        })
    }
}