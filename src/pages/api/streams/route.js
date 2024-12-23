export async function post(req,res){
    try{
        const data = await req.json();
    }
    catch(e){
        return res.status(411).json({
            message: "Error while adding stream"
        })
    }
}