import { getServerSession } from "next-auth";
import { PrismaClient } from "../../../../lib/db";
import { useSearchParams } from 'next/navigation'

export async function post(req, res) {
  const session = await getServerSession();
  if (session?.user?.email) {
    return res.status(403).json({
      message: "Unautheniticated",
    });
  }
  const userid = await PrismaClient.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  if (!userid) {
    return res.status(403).json({
      message: "User with such email id doesnt exist",
    });
  }
  try {
    const data = await req.json();
    await PrismaClient.upvote.delete({
      where: {
        userId: userid,
        streamId: data.streamId,
      },
    });
  } catch (e) {
    return res.statuss(403).json({
      message: "Erorr",
    });
  }
}

export async function get(req,res){
    const searchParams = useSearchParams().get("creatorId");
    const streams = await PrismaClient.stream.findMany({
        where:{
            userId: creatorId
        }
    })
    return res.json({
        streams
    })
    
}
