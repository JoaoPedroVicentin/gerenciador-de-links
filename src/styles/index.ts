import { createStitches } from "@stitches/react";

export const { config, theme, css, styled, globalCss, keyframes, getCssText, createTheme } = createStitches({
    theme: {
        colors: {
            background: '#14141C',
            
            gray: '#1E1E26',
            white: '#F8F8FF',
            green: '#3BB6B6',
            red: '#E45858'
        },

        fontSizes: {
            sm: '0.75rem',
            md: '1rem',
            large: '1.5rem',
            xl: '2rem',
            '2xl': '2.5rem'
        },

        fontWeights: {
            sm: 400,
            md: 500,
            bold: 700
        }
    }
})