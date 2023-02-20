import { api } from "@/lib/axios"
import { LinkCardContainer, LinkCardInfosBody, LinkCardInfosHeader } from "./styles"

import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';

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

    async function handleDeleteLink(id: string) {
        await api.delete(`/users/${id}`)
    }

    return (
        <LinkCardContainer>
            <img src={image} alt='image' />
            <LinkCardInfosHeader>
                <div>
                    <img src={icon} alt='icon' />
                    <p>{name}</p>
                </div>
                <button onClick={() => { handleDeleteLink(id) }}><DeleteIcon /></button>
            </LinkCardInfosHeader>
            <LinkCardInfosBody>
                <h3>{title}</h3>
                <p>{description}</p>
            </LinkCardInfosBody>
            <a href={url} target="_blank">Leia mais <LaunchIcon fontSize="small" /></a>
        </LinkCardContainer>
    )
}