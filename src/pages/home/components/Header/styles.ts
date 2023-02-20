import { styled } from "@/styles";

export const HeaderContainer = styled('header', {
    background: '$green',
    height: '5rem',

    display: 'flex',
    alignItems: 'center',
    padding: '0 7rem',
})

export const HeaderInfos = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',

    div: {
        display: 'flex',
        gap: '1rem',

        h3: {
            margin: 'auto 0'
        },

        img: {
            border: '1px solid $white',
            borderRadius: '5px'
        }
    },

    button: {
        height: '2.5rem',
        background: '$red',
        padding: '0rem 1rem',

        transition: 'all 0.3s ease-in-out',

        '&:hover': {
            background: '#C53535'
        }
    }
})