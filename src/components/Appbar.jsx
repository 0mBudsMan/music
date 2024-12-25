// "use client"
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react";

export function AppBar() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex justify-between" style={{display: 'flex', justifyContent: "space-between"}}>
        
       
          {!session?.user && (
            <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
             
              onClick={() => signIn("google", { callbackUrl: '/dashboard' })} // Call signIn function
            >
              Sign In
            </Button>
          )}
          {session?.user && (
            <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
              onClick={() => signOut()} // Call signOut function
            >
              Sign Out
            </Button>
          )}
        
      </div>
    </div>
  );
}
