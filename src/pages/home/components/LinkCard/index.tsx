import { api } from "@/lib/axios"
import { LinkCardContainer, LinkCardInfosBody, LinkCardInfosHeader } from "./styles"
import defaultIcon from '../../../../assets/defaultIcon.png'
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import Image from 'next/image'

interface LinkCardProps {
    id: string,
    title?: string,
    name?: string,
    description?: string,
    icon?: string,
    image?: string,
    url: string,
}

export default function LinkCard({ id, title, name, description, icon, image, url }: LinkCardProps) {

    const createNewLink = useMutation(async (id: string) => {
        const response = await api.delete(`/users/${id}`)

        return response.data
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['links'])
        },
        onError: () => {
            window.alert('Error')
        }
    })

    async function handleDeleteLink(id: string) {
        await createNewLink.mutateAsync(id)
    }

    return (
        <LinkCardContainer>
            <img src={image} alt='image' />
            <LinkCardInfosHeader>
                <div>
                    {icon ? <img src={icon} alt='icon' /> :
                    <Image src={defaultIcon} alt='icon' />}
                    {name ? <p>{name}</p> : <p>Web</p>}
                </div>
                <button onClick={() => { handleDeleteLink(id) }}><DeleteIcon /></button>
            </LinkCardInfosHeader>
            <LinkCardInfosBody>
                <h3>{title}</h3>
                <p>{description}</p>
            </LinkCardInfosBody>
            <a href={url} target="_blank">Ver mais <LaunchIcon fontSize="small" /></a>
        </LinkCardContainer>
    )
}