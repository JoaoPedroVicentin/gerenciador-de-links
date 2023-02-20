import { api } from "@/lib/axios";
import { SearchedLinkContainer, SearchedLinkInfos, SearchedLinkSection, SiteLinkInfos } from "./styles";
import defaultIcon from '../../../../assets/defaultIcon.png'
import Image from 'next/image'

interface SearchedLinkProps {
    title?: string,
    url?: string,
    description?: string,
    name?: string,
    image: string,
    icon?: string
}

export default function SearchedLink({title, description, name, image, icon, url}: SearchedLinkProps) {

    async function handleCreateNewLink() {
        if (url != '') {
            await api.post('/users/links', {title, description, name, image, icon, url})
        } else {
            window.alert('Insira primeiro um link')
        }
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
                        <h3>{name}</h3>
                    </SiteLinkInfos>
                </SearchedLinkInfos>
            </SearchedLinkContainer>

            <button onClick={handleCreateNewLink}>Salvar</button>
        </SearchedLinkSection>
    )
}