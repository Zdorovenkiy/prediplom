import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'
import { BrowserRouter } from 'react-router';
import AppRouter from './routers/AppRouter';

function App() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                {/* <ErrorBoundary> */}
                    <AppRouter />
                {/* </ErrorBoundary> */}
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
