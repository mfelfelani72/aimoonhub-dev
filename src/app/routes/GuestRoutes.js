import React, {lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";

import LandingSkeleton from '../../features/core/LandingSkeleton';

const LazyLogin = lazy(() => import("../../features/auth/Login.js"))
const LazyRegister = lazy(() => import("../../features/auth/Register.js"))

const LazyLanding = lazy(() => import("../../features/core/Landing.js"))
const LazyAimoonNews = lazy(() => import("../../features/latestAimoonNew/AimoonNews.js"))

const LazyAuthorsList = lazy(() => import("../../features/author/AuthorsList.js"))
const LazyAuthorDashboard = lazy(() => import("../../features/author/AuthorDashboard.js"))

const LazyProvidersList = lazy(() => import("../../features/provider/ProvidersList.js"))
const LazyProviderDashboard = lazy(() => import("../../features/provider/ProviderDashboard.js"))

const GuestRoutes = () => {

    return (

        <Routes>


            <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LazyLogin /> </Suspense>}></Route>
            <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><LazyRegister /> </Suspense>}></Route>

            <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><LazyLanding /> </Suspense>}></Route>
            <Route path="/aimoon-news" element={<Suspense fallback={<div>Loading...</div>}><LazyAimoonNews /> </Suspense>}></Route>

            <Route path="/authors-list" element={<Suspense fallback={<div>Loading...</div>}><LazyAuthorsList /> </Suspense>}></Route>
            <Route path="/author-dashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyAuthorDashboard /> </Suspense>}></Route>

            <Route path="/providers-list" element={<Suspense fallback={<div>Loading...</div>}><LazyProvidersList /> </Suspense>}></Route>
            <Route path="/provider-dashboard" element={<Suspense fallback={<div>Loading...</div>}><LazyProviderDashboard /> </Suspense>}></Route>

        </Routes>

    )
}

export default GuestRoutes