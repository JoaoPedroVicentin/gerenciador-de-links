import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Buttons, Container, InfosAuthor, InfosColumn, LoginColumn } from "./styles";

import Image from "next/image";
import imageSignIn from '../../assets/backgroundSignIn.png'

import GoogleIcon from '@mui/icons-material/Google';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SignIn() {

    const session = useSession()
    const router = useRouter()

    const isSigned = session.status === 'authenticated'

    useEffect(() => {
        if (isSigned) {
            router.push(`/home`)
        }
    }, [isSigned])

    async function handleSignIn() {
        await signIn('google')
    }

    return (
        <Container>
            <InfosColumn>
                <h1><span>Gerencie</span> e <span>salve</span> links de suas páginas favoritas!</h1>
                <Image src={imageSignIn} width={460} alt='Ilustration SignIn' />
                <InfosAuthor>
                    <h3>Created by <span>João Pedro Vicentin</span></h3>
                    <Buttons>
                        <a href="https://contate.me/joao-pedro-lopes-vicentin" target="_blank"><WhatsAppIcon /></a>
                        <a href="https://www.linkedin.com/in/joaopedrovicentin/"><LinkedInIcon /></a>
                        <a href='https://github.com/JoaoPedroVicentin' target='_blank'><GitHubIcon /></a>
                    </Buttons>
                </InfosAuthor>
            </InfosColumn>
            <LoginColumn>
                <h1>Cadastre-se já!</h1>
                <button onClick={handleSignIn}><GoogleIcon /> Login com o Google</button>
            </LoginColumn>
        </Container>
    )
}