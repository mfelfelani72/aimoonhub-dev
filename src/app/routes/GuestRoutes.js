import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";

import LandingSkeleton from '../../features/core/LandingSkeleton';
const LazyLanding = lazy(() => import("../../features/core/Landing.js"))


const GuestRoutes = () => {

    useEffect(() => {

        // initial dark mode

        if (localStorage.getItem("theme") == 'dark')
            document.documentElement.classList.add("dark");

        // initial dark mode

    }, [])


    return (

        <Routes>
            <Route path="/" element={<Suspense fallback={<LandingSkeleton />}><LazyLanding /> </Suspense>}></Route>
        </Routes>

    )
}

export default GuestRoutes