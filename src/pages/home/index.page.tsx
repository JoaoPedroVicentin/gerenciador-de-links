import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { buildNextAuthOptions } from "../api/auth/[...nextauth].api"
import { HomeContainer, Input, MyLinksContainer, MyLinksHeader, MyLinksSection, NewLinkBody, SearchLinkSection } from "./styles"
import Header from "./components/Header"

import SearchIcon from '@mui/icons-material/Search';
import SearchedLink from "./components/SearchedLink"
import LinkCard from "./components/LinkCard"

interface LinkProps {
    id: string,
    title?: string,
    url: string,
    description?: string,
    name?: string,
    image: string,
    icon?: string
}

const SearchLinkFormSchema = z.object({
    url: z.string().nonempty("Digite sua url"),
})

type SearchLinkFormData = z.infer<typeof SearchLinkFormSchema>

export default function Home() {
    const session = useSession()
    const router = useRouter()

    const isSigned = session.status === 'authenticated'

    const [newLink, setNewLink] = useState<LinkProps>({
        id: '',
        url: '',
        image: '',
        name: '',
        title: '',
        icon: '',
        description: ''
    })

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        if (!isSigned) {
            router.push('/')
        } else {
            fetchLinks()
        }
    }, [isSigned])

    async function fetchLinks() {
        await api.get("/users/links")
            .then(response => setLinks(response.data))
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SearchLinkFormData>({
        resolver: zodResolver(SearchLinkFormSchema),
    })

    async function handleSearchLink(data: SearchLinkFormData) {

        try {
            const response = await api.post('/puppeteer', {
                url: data.url
            })
            const { id, title, name, description, url, image, icon } = response.data

            console.log(response.data)

            setNewLink({
                id: id,
                title: title,
                name: name,
                description: description,
                url: url,
                image: image,
                icon: icon
            })

        } catch (err) {
            alert("Digite uma url válida")

        }
        setValue('url', '')
    }

    return (
        <>
            <Header name={session.data?.user.name} image={session.data?.user.image} isSigned={isSigned} />
            <HomeContainer>
                <SearchLinkSection>
                    <h3>GERADOR DE LINKS</h3>
                    <h1><span>Gerencie</span> e <span>salve</span> links de suas páginas favoritas!</h1>
                    <NewLinkBody>
                        <form onSubmit={handleSubmit(handleSearchLink)}>
                            <Input type="text" placeholder="Pesquisar URL" {...register('url')} />
                            <button type="submit"><SearchIcon /></button>
                        </form>

                        {newLink.url &&
                            <SearchedLink
                                url={newLink.url}
                                name={newLink.name}
                                image={newLink.image}
                                description={newLink.description}
                                title={newLink.title}
                                icon={newLink.icon} />
                        }
                    </NewLinkBody>
                </SearchLinkSection>

                <MyLinksSection>
                    <MyLinksHeader>
                        <h1>Meus Links</h1>

                        <form>
                            <input placeholder="Buscar por título" />
                            <button type="submit"><SearchIcon /></button>
                        </form>
                    </MyLinksHeader>

                    <MyLinksContainer>
                        {links.map((link) => {
                            return (
                                <LinkCard
                                    key={link.id}
                                    id={link.id}
                                    url={link.url}
                                    description={link.description}
                                    icon={link.icon}
                                    image={link.image}
                                    name={link.name}
                                    title={link.title} />
                            )
                        })}
                    </MyLinksContainer>
                </MyLinksSection>
            </HomeContainer></>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res),
    )

    return {
        props: {
            session,
        },
    }
}