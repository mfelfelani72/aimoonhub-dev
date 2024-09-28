import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";

import AllNewsSkeleton from '../../features/news/AllNewsSkeleton';
const LazyAllNews = lazy(() => import("../../features/news/allNews"))

const GuestRoutes = () => {

    useEffect(() => {

        // initial dark mode

        if (localStorage.getItem("theme") == 'dark')
            document.documentElement.classList.add("dark");

        // initial dark mode

    }, [])


    return (

        <Routes>
            <Route path="/" element={<Suspense fallback={<AllNewsSkeleton />}><LazyAllNews /> </Suspense>}></Route>
            <Route path="/news" element={<Suspense fallback={<AllNewsSkeleton />}><LazyAllNews /> </Suspense>}></Route>
        </Routes>

    )
}

export default GuestRoutes