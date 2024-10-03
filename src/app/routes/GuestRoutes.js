import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";

import LandingSkeleton from '../../features/core/LandingSkeleton';
const LazyLanding = lazy(() => import("../../features/core/Landing.js"))
const LazyAuthorList = lazy(() => import("../../features/author/AuthorsList.js"))
const LazyAuthorDashboard = lazy(() => import("../../features/author/AuthorDashboard.js"))


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
            <Route path="/authors-list" element={<Suspense fallback={<div>Loading...</div>}><LazyAuthorList /> </Suspense>}></Route>
            <Route path="/author-dashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyAuthorDashboard /> </Suspense>}></Route>
        </Routes>

    )
}

export default GuestRoutes