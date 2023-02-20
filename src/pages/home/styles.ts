import { styled } from "@/styles"


export const HomeContainer = styled('div', {
    maxWidth: '1440px',
    margin: '0 auto',
})

export const SearchLinkSection = styled('section', {
    background: '$gray',
    padding: '5rem 7rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    alignItems: 'center',
    justifyContent: 'center',

    h1: {
        width: '40rem',
        textAlign: 'center'
    },

    h3: {
        color: '$red'
    },
})

export const NewLinkBody = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: '$background',
    borderRadius: '5px',

    form: {
        display: 'flex',
        gap: '2rem',

        button: {
            background: '$green',
            padding: '0 1rem',

            transition: 'all 0.3s ease-in-out',

            '&:hover': {
                background: '#1F9090'
            }
        }
    }
})

export const Input = styled('input', {
    width: '37rem',
    background: '$gray',
    border: 'none',
    borderRadius: '5px',
    color: '$white',
    padding: '1rem 2rem',

    transition: 'all 0.3s ease',

    '&:focus': {
        boxShadow: `0 0 0 2px #3BB6B6`
    },

    '&::placeholder': {
        color: '$white'
    }
})

export const MyLinksSection = styled('section', {
    padding: '5rem 7rem',
})

export const MyLinksHeader = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5rem',

    form: {
        display: 'flex',
        gap: '2rem',

        input: {
            width: '15rem',
            background: '$gray',
            border: 'none',
            borderRadius: '5px',
            color: '$white',
            padding: '1rem 2rem',

            transition: 'all 0.3s ease',

            '&:focus': {
                boxShadow: `0 0 0 2px #3BB6B6`
            },

            '&::placeholder': {
                color: '$white'
            }
        },

        button: {
            background: '$green',
            padding: '0 1rem',

            transition: 'all 0.3s ease-in-out',

            '&:hover': {
                background: '#1F9090'
            }
        }
    }
})

export const MyLinksContainer = styled('div', {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5rem',
    gridTemplateColumns: '1fr 1fr 1fr',
})