import { styled } from "@/styles"

export const SearchedLinkSection = styled('div', {
    display: 'flex',
    gap: '2rem',
    flexDirection: 'column',
    width: '100%',

    button: {
        height: '2.5rem',
        width: '5rem',
        background: '$red',
        padding: '0rem 1rem',

        transition: 'all 0.3s ease-in-out',

        '&:hover': {
            background: '#C53535'
        }
    },

    '@media(max-width: 840px)': {
        alignItems: 'center',
    },
})

export const SearchedLinkContainer = styled('div', {
    display: 'flex',
    gap: '2rem',

    img: {
        margin: 'auto 0'
    },

    '@media(max-width: 840px)': {
        flexDirection: 'column',
        alignItems: 'center',
    },

    '@media(max-width: 500px)': {
        textAlign: 'center',

        img: {
            width: '12.5rem',
            height: '6.875rem'
        }
    },
})

export const SearchedLinkInfos = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    flexDirection: 'column',
    width: '25rem',

    h2: {
        fontSize: '$large',

        '@media(max-width: 500px)': {
            fontSize: '$md',
        },
    },

    h3: {
        fontWeight: '$medium',
        color: '#F8F8FF',

        '@media(max-width: 500px)': {
            fontSize: '$sm'
        },
    },

    '@media(max-width: 500px)': {
        width: '100%'
    },
})

export const SiteLinkInfos = styled('div', {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '$bold',
    gap: '0.5rem',

    h3: {
        margin: 'auto 0'
    },

    '@media(max-width: 500px)': {

        img: {
            width: '30px',
            height: '30px'
        },

        justifyContent: 'center'
    },
})