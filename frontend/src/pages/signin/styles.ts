import { styled } from "@/styles";

export const Container = styled('section', {
    background: '$background',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '5fr 3fr',
    alignItems: 'center',
    justifyContent: 'center',

    '@media(max-width: 930px)': {
        gridTemplateColumns: '1fr',
    },

})

export const InfosColumn = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5rem',
    gap: '2rem',

    h1: {
        textAlign: 'center',

        '@media(max-width: 570px)': {
            fontSize: '$large'
        },
    },

    img: {
        '@media(max-width: 570px)': {
            width: '15rem',
            height: '10rem'
        },
    },

    '@media(max-width: 930px)': {
        padding: '2rem',
        height: '100vh'
    },

    footer: {
        display: 'none',

        '@media(max-width: 930px)': {
            display: 'block'
        },
    }
})

export const LoginColumn = styled('div', {
    background: '$gray',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',

    button: {
        background: '$red',
        padding: '0.75rem 1.5rem',

        transition: 'all 0.3s ease-in-out',

        '&:hover': {
            background: '#C53535'
        }
    },
})

export const InfosAuthor = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem'
})

export const Buttons = styled('div', {
    display: 'flex',
    gap: '1rem',

    a: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '$green',
        padding: '0.5rem',
        borderRadius: '5px',

        transition: 'all 0.3s ease-in-out',

        '&:hover': {
            transform: 'translateY(-15%)',
            background: '#1F9090'
        }
    }
})