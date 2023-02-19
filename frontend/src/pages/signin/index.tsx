import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn() {

    const session = useSession()
    const router = useRouter()

    const isSigned = session.status ==='authenticated'

    useEffect(() => {
        if(isSigned){
            router.push(`/home`)
        }
    }, [isSigned])

    async function handleSignIn() {
        await signIn('google')
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignIn}>Login com o Google</button>
            {isSigned && <p>{JSON.stringify(session.data)}</p>}
        </div>
    )
}