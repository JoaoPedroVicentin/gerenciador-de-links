import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    '::webkit-scrollbar': {
        width: '20px'
    },

    body: {
        '-webkit-font-smoothing': 'antialiased',
        backgroundColor: '$background',
        color: '$white',

        '&::-webkit-scrollbar': {
            width: '5px',
            backgroundColor: '$gray'
        },

        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '$green',
        }
    },

    h1: {
        fontSize: '$2xl',
        fontWeight: '$bold',
    },

    h2: {
        fontSize: '$xl',
        fontWeight: '$bold',
    },

    h3: {
        fontSize: '$md',
        fontWeight: '$bold',
    },

    a: {
        color: '$white',
        cursor: 'pointer',
    },
    span: {
        color: '$green'
    },

    button: {
        color: '$white',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',

        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        fontSize: '$md',
    },

    'body, section, input, textarea, button': {
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 500
    }
})