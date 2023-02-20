import { HeaderContainer, HeaderInfos } from "./styles";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router"
import LogoutIcon from '@mui/icons-material/Logout';

interface UserProps {
    name?: string,
    image?: string,
    isSigned: boolean
}

export default function Header({ name, image, isSigned }: UserProps) {

    const router = useRouter()

    useEffect(() => {
        if (!isSigned) {
            router.push('/')
        }
    }, [isSigned])

    async function handleSignOut() {
        await signOut()
    }

    return (
        <HeaderContainer>
            <HeaderInfos>
                <div>
                    {image && <img src={image} width={50} height={50} alt="avatar" />}
                    <h3>{name}</h3>
                </div>
                <button onClick={handleSignOut}><LogoutIcon/> Sair</button>
            </HeaderInfos>
        </HeaderContainer>
    )
}