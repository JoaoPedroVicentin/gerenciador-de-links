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
import { ClipLoader } from "react-spinners"

import SearchIcon from '@mui/icons-material/Search';
import SearchedLink from "./components/SearchedLink"
import LinkCard from "./components/LinkCard"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { NextSeo } from "next-seo/lib/meta/nextSEO"

interface LinkProps {
    id: string,
    url: string,
    title?: string,
    description?: string,
    name?: string,
    image?: string,
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

    const [loading, setLoading] = useState(false);

    const [newLink, setNewLink] = useState<LinkProps>({ id: '', url: '' })

    const { data } = useQuery<LinkProps[]>(['links'], async () => {
        const response = await api.get("/users/links")
        return response.data
    },)

    useEffect(() => {
        if (!isSigned) {
            router.push('/')
        }
    }, [isSigned])

    const {
        register,
        handleSubmit,
    } = useForm<SearchLinkFormData>({
        resolver: zodResolver(SearchLinkFormSchema),
    })

    const searchNewLink = useMutation(async (data: SearchLinkFormData) => {
        setLoading(true)
        setNewLink({ url: '', id: '' })
        const response = await api.post('/puppeteer', {url: data.url})

        const { id, title, name, description, url, image, icon } = response.data

        setNewLink({
            id: id,
            title: title,
            name: name,
            description: description,
            url: url,
            image: image,
            icon: icon
        })

        return response.data
    }, {
        onSuccess: () => {
            setLoading(false)
            queryClient.invalidateQueries(['links'])
        },
        onError: () => {
            setLoading(false)
            window.alert('Digite uma url válida')
        }
    })

    async function handleSearchLink(data: SearchLinkFormData) {
        await searchNewLink.mutateAsync(data)
    }

    return (
        <>
            <NextSeo title="Gerencie seus links" description="Salve aqui os links de suas páginas favoritas" />
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

                        <ClipLoader color='#3BB6B6' loading={loading} speedMultiplier={0.6} />

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

                    {data?.length === 0 && <h2>Você ainda não possui links salvos</h2>}

                    <MyLinksContainer>
                        {data?.map(link => {
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