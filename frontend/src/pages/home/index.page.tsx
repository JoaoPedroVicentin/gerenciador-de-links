import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import { GetServerSideProps, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { buildNextAuthOptions } from "../api/auth/[...nextauth].api"

interface LinkProps {
    id?: string,
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

    async function handleSignOut() {
        await signOut()
    }

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
            const { title, name, description, url, image, icon } = response.data

            setNewLink({
                title: title,
                name: name,
                description: description,
                url: url,
                image: image,
                icon: icon
            })

            setValue('url', '')

        } catch (err) {
            alert("Error")
        }
    }

    async function handleCreateNewLink() {
        if (newLink.url != '') {
            await api.post('/users/links', newLink)
        } else {
            window.alert('Insira primeiro um link')
        }
    }

    async function handleDeleteLink(id: any){
        await api.delete(`/users/${id}`)
    } 

    return (
        <div>
            <header>
                <img src={session.data?.user.image} />
                <li>{session.data?.user.name}</li>
                <li>{session.data?.user.email}</li>
            </header><br /><br />
            <form onSubmit={handleSubmit(handleSearchLink)}>
                <input type="text" placeholder="colar link" {...register('url')} />
                <button type="submit">Gerar link</button>
            </form>
            {errors.url && errors.url.message}
            <br /><br />

            <li>{newLink.title}</li>
            <li>{newLink.name}</li>
            <li>{newLink.description}</li>
            <img src={newLink.image} width={400} height={200} alt='image' />
            <li><a href={newLink.url} target="_blank">Ver mais</a></li>

            <button onClick={handleCreateNewLink}>Salvar link</button>
            <button onClick={handleSignOut}>sair</button><br /><br />

            <h1>Meus Links</h1>

            <div>
                {links.map((link) => {
                    return (
                        <div key={link.id}>
                            <li>{link.title}</li>
                            <li>{link.name}</li>
                            <li>{link.description}</li>
                            <img src={link.icon} width={50} height={50} alt='icon' />
                            <img src={link.image} width={400} height={200} alt='image' />
                            <li><a href={link.url} target="_blank">Ver mais</a></li>
                            <button onClick={() => {handleDeleteLink(link.id)}}>Excluir</button>
                        </div>
                    )
                })}
            </div>
        </div>
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