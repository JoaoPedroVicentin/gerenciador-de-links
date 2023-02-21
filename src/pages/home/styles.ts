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
        width: '45vw',
        textAlign: 'center',

        '@media(max-width: 760px)': {
            fontSize: '$xl'
        }
    },

    h3: {
        color: '$red'
    },

    '@media(max-width: 900px)': {
        padding: '5rem 3.5rem'
    },

    '@media(max-width: 440px)': {
        padding: '5rem 0rem'
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
            },

            '@media(max-width: 440px)': {
                width: '2.5rem',
                height: '2.5rem'
            },
        },

        '@media(max-width: 440px)': {
            flexDirection: 'column'
        },
    },

    '@media(max-width: 440px)': {
        padding: '2rem 0.5rem'
    },
})

export const Input = styled('input', {
    width: '45vw',
    maxWidth: '600px',
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
    maxWidth: '1440px',

    h2:{
        color: '#3D3D4B',
        fontWeight: '$md',
        textAlign: 'center'
    },

    '@media(max-width: 900px)': {
        padding: '5rem 3.5rem'
    },

    '@media(max-width: 440px)': {
        padding: '5rem 0rem'
    },
    
})

export const MyLinksHeader = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5rem',

    form: {
        display: 'none',
        gap: '2rem',

        input: {
            width: '20vw',
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
    },

    '@media(max-width: 900px)': {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '2rem'
    },
})

export const MyLinksContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    gap: '5rem 0rem',

    '@media(max-width: 1220px)': {
        gridTemplateColumns: '1fr 1fr'
    },

    '@media(max-width: 790px)': {
        gridTemplateColumns: '1fr'
    },
})