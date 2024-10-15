import React from 'react'

import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';

const Page404 = () => {

  const { t } = useTranslation();

  return (

    <main className="h-screen grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-slate-50 dark:bg-DB-dim">
      <div className="text-center">
        <p className="text-[5rem] font-semibold text-color-theme dark:text-D-color-theme">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-T-bright dark:text-DT-bright sm:text-5xl">{t('pnf')}</h1>
        <p className="mt-6 text-base leading-7 text-T-bright dark:text-DT-bright">{t('sorry')}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink to="/" className="rounded-md bg-color-theme/70 hover:bg-color-theme dark:bg-D-color-theme/70 dark:hover:bg-D-color-theme  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">{t('goHome')}</NavLink>
        </div>
      </div>
    </main>
  )
}

export default Page404