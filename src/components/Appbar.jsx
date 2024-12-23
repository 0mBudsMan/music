// "use client"
import { Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

export function AppBar() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex justify-between" style={{display: 'flex', justifyContent: "space-between"}}>
        <h1 style={{display: "inline"}}>Muzi</h1>
       
          {!session?.user && (
            <Button
              className="m-2 p-2 "
              onClick={() => signIn()} // Call signIn function
            >
              Sign In
            </Button>
          )}
          {session?.user && (
            <Button
              className="m-2 p-2 "
              onClick={() => signOut()} // Call signOut function
            >
              Sign Out
            </Button>
          )}
        
      </div>
    </div>
  );
}
