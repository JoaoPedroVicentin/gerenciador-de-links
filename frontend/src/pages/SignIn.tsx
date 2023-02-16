
import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';

export default function SignIn() {

    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        flow: 'auth-code',
      });

    return (
        <div>
            <button onClick={() => login()}>Entrar com o Google</button>
        </div>
    )
}