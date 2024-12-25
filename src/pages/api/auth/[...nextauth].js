import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";  
import {prismaClient} from "../../../lib/db"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,  
      clientSecret: process.env.CLIENT_SECRET,  
      
    }),
  ],
  callbacks:{
    async signIn(user){
      console.log("ANUD")
      console.log(user);
      try{
        await prismaClient.user.create({
          data:{
            email: user.user.email
          }
        })
      }
      catch(e){
        console.log("error ina uthnnndw");
      }
      return true;
    }
  }
};

export default NextAuth(authOptions);
