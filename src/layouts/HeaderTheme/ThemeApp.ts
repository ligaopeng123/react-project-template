/** ********************************************************************
 *
 * @模块名称: ThemeApp
 *
 * @模块用途: ThemeApp
 *
 * @date: 2022/9/13 11:32
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import {zhCN} from "@mui/material/locale";

// A custom theme for this app
const ThemeApp = createTheme({
    palette: {
        primary: {
            main: '#3370FF',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: '#f0f0f3'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #E4E5E8',
                    boxShadow: '1px 1px 1px #E4E5E8'
                }
            }
        }
    }
}, zhCN);

export default ThemeApp;

