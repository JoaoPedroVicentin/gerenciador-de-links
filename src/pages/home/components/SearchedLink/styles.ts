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
    }
})

export const SearchedLinkContainer = styled('div', {
    display: 'flex',
    gap: '2rem',

    img: {
        margin: 'auto 0'
    }
})

export const SearchedLinkInfos = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    flexDirection: 'column',
    width: '25rem',

    h2: {
        fontSize: '$large'
    },

    h3: {
        fontWeight: '$medium',
        color: '$white',
    },
})

export const SiteLinkInfos = styled('div', {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '$bold',
    gap: '0.5rem',

    h3: {
        margin: 'auto 0'
    }
})