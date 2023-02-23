import { api } from "@/lib/axios";
import { SearchedLinkContainer, SearchedLinkInfos, SearchedLinkSection, SiteLinkInfos } from "./styles";
import defaultIcon from '../../../../assets/defaultIcon.png'
import Image from 'next/image'
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

interface SearchedLinkProps {
    title?: string,
    url?: string,
    description?: string,
    name?: string,
    image?: string,
    icon?: string
}

export default function SearchedLink({ title, description, name, image, icon, url }: SearchedLinkProps) {

    const [loading, setLoading] = useState(false)

    const createNewLink = useMutation(async () => {
        setLoading(true)
        const response = await api.post('/users/links', { title, description, name, image, icon, url })

        return response.data
    }, {
        onSuccess: () => {
            setLoading(false)
            queryClient.invalidateQueries(['links'])
        },
        onError: () => {
            setLoading(false)
            console.log('Você já possui este link salovo na sua lista')
        }
    })

    async function handleCreateNewLink() {
        await createNewLink.mutateAsync()
    }

    return (
        <SearchedLinkSection>
            <SearchedLinkContainer>
                <img src={image} width={300} height={165} alt='image' />
                <SearchedLinkInfos>
                    <h2>{title}</h2>
                    <h3>{description}</h3>
                    <SiteLinkInfos>
                        {icon ? <img src={icon} width={30} height={30} alt='icon' /> :
                            <Image src={defaultIcon} width={30} height={30} alt='icon' />}
                        {name ? <p>{name}</p> : <p>Web</p>}
                    </SiteLinkInfos>
                </SearchedLinkInfos>
            </SearchedLinkContainer>

            <button onClick={handleCreateNewLink}>
                {loading ? <ClipLoader color='#fff' size={20} speedMultiplier={0.6} /> : <p>Salvar</p>}
            </button>
        </SearchedLinkSection>
    )
}