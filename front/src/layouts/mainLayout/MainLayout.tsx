import Footer from '@/features/footer/Footer';
import Header from '@/features/header/Header';
import { Box } from '@mui/material';
import { type PropsWithChildren } from 'react'


export default function MainLayout({children}: PropsWithChildren) {
	return (
		<>
			<Header />
			<Box className="main" sx={{height: "100%", flexGrow: '1'}}>{children}</Box>
            <Footer/>
		</>
	);
}