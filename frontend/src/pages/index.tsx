import { api } from "@/lib/axios"
import { GetServerSideProps } from "next"
import Image from "next/image"
import { FormEvent, useState } from "react"

interface LinkProps {
  title?: string,
  url: string,
  description?: string,
  name?: string,
  image: string,
  icon?: string
}

interface HomeProps {
  linksCount: number
}

export default function Home(props: HomeProps) {
  const [newLink, setNewLink] = useState('')
  const [link, setLink] = useState<LinkProps>({
    url: '',
    image: '',
    name: '',
    title: '',
    icon: '',
    description: ''
  })

  async function handleCreateLink(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('links', {
        url: newLink
      })
      const { title, name, description, url, image, icon } = response.data

      setLink({
        title: title,
        name: name,
        description: description,
        url: url,
        image: image,
        icon: icon
      })

      setNewLink('')

    } catch (err) {
      alert('Falha')
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateLink}>
        <input type="text" value={newLink} required placeholder="Colar link" onChange={event => setNewLink(event.target.value)} />
        <button type="submit">Gerar link</button>
      </form>

      <h3>Numero de links: {props.linksCount}</h3>
      <li>{link.title}</li>
      <li>{link.name}</li>
      <li>{link.description}</li>
      <img src={link.image} width={400} height={200} alt='image' />
      <a href={link.url} target="_blank">Ver mais</a>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const linksCountResponse = await api.get('/links/count')

  return {
    props: {
      linksCount: linksCountResponse.data.count
    }
  }
}