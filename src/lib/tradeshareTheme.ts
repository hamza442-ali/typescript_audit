// @See: https://bareynol.github.io/mui-theme-creator/
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';
import { Oswald } from "next/font/google";

export const oswald = Oswald({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

const tradeshareTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7ee249',
        },
        secondary: {
            main: '#a09f9f',
        },
        background: {
            default: '#121315',
            paper: '#1d1d1f',
        },
        success: {
            main: '#d8be19',
        },
        warning: {
            main: '#e13659',
        },
        error: {
            main: '#d03b3b',
        },
    },
    typography: {
        fontFamily: oswald.style.fontFamily,
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            textTransform: 'uppercase'

        },
        subtitle1: {
            fontSize: '1.4rem',
            fontWeight: 500,
            marginTop: '1rem'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(0deg, #F2F047 10%, #7EE249 90%)',
                    boxShadow: '0 3px 5px 2px rgba(211, 213, 88, .3)',
                }
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: 'default',
                },
                colorInherit: {
                    backgroundColor: '#689f38',
                    color: '#fff',
                },
            }
        },
    }
}));

export default tradeshareTheme
