import Footer from '@/features/footer/Footer';
import Header from '@/features/header/Header';
import { orderAction } from '@/globalState/model/order/slice/orderSlice';
import { useGetUserQuery, useLazyGetUserQuery } from '@/globalState/model/user/api/userApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Box } from '@mui/material';
import { useEffect, useState, type PropsWithChildren } from 'react'


export default function MainLayout({children}: PropsWithChildren) {
    const [fetchUser, { data: user, isLoading, isError }] = useLazyGetUserQuery();
    const dispatch = useAppDispatch();
    async function syncData() {
        const storageId = localStorage.getItem('id'); 

        if (storageId) {
            const response = await fetchUser({id: storageId});
            console.log("response", response.data?.id);
            if (response.status === "fulfilled") {
                dispatch(orderAction.setUser(response?.data?.id!));

            }

        }
    }

    useEffect(() => {
        console.log("localStorage.getItem('id')", localStorage.getItem('id'));
        console.log("localStorage.getItem('id')", localStorage.getItem('token'));
        syncData();
    }, [])

    useEffect(() => {
        console.log("userasdasd", user);
    }, [user])
	return (
		<>
			<Header />
			<Box className="main" sx={{height: "100%", flexGrow: '1'}}>{children}</Box>
            <Footer/>
		</>
	);
}