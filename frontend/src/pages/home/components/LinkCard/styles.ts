import { styled } from "@/styles";

export const LinkCardContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '2rem',
    gap: '0.5rem',
    position: 'relative',
    background: '$gray',
    margin: '0 auto',
    width: '20rem',
    height: '30rem',

    borderBottom: '5px solid $green',
    borderLeft: '5px solid $green',

    clipPath: 'polygon(20% 0, 70% 0%, 100% 0, 100% 90%, 80% 100%, 30% 100%, 0 100%, 0 10%)',

    img: {
        width: '100%',
        height: '11rem'
    },

    a: {
        width: '90%',
        color: '$green',
        textDecoration: 'underline',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        position: 'absolute',
        bottom: '2rem'
    },

    '@media(max-width: 440px)': {
        width: '17rem',
    },
})

export const LinkCardInfosHeader = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: '1rem 2rem',

    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',

        img: {
            width: '2rem',
            height: '2rem'
        },
    },

    button: {
        width: '2rem',
        height: '2rem',
        background: '$red',

        transition: 'all 0.3s ease-in-out',

        '&:hover': {
            background: '#C53535'
        }
    }
})

export const LinkCardInfosBody = styled('div', {
    width: '90%',
    padding: '0 2rem',

    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',

    h3: {
        fontSize: '1.25rem',
        color: '$green',
        maxHeight: '45px',
        overflow: 'hidden'
    },

    p: {
        maxHeight: '90px',
        overflow: 'hidden',

        '@media(max-width: 440px)': {
            fontSize: '$sm',
        },
    }
})