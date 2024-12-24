import { prismaClient } from "../../../lib/db";
import youtubeUrl from "youtube-url";
import youtubesearchapi from "youtube-search-api"
export default async function POST(req, res) {
  
    try {
      const data = JSON.parse(req.body);
     
      const isYT = youtubeUrl.valid(data.url)
      
      if (!isYT) {
        return res.status(400).json({
          message: "Invalid YouTube URL",
        });
      }

      const extractedID = data.url.split("?v=")[1];



      if(!extractedID){
        return res.status(400).json({
          message: "ID not found",
        });
      }

      const vidDetails = await youtubesearchapi.GetVideoDetails(extractedID);
      const thumbs = (vidDetails.thumbnail.thumbnails);
      const sortedThumbs = thumbs.sort((a,b)=>{
        a.width - b.width > 0?1:-1
      });
      console.log(sortedThumbs)
      await prismaClient.stream.create({
        data: {
          userId: data.creatorID,
          url: data.url,
          extractedId: extractedID,
          title: (vidDetails).title,
          bigURL: sortedThumbs[sortedThumbs.length - 1].url,
          smallURL: sortedThumbs[sortedThumbs.length - 2].url

        },
      });

      return res.status(201).json({
        message: "Stream added successfully",
      });
    } catch (e) {
      console.log(e.stack);
      return res.status(500).json({
        message: "Error while adding stream",
      });
    }
  } 

