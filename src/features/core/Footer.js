import React from "react";

import { useTranslation } from "react-i18next";

export function Footer() {

    const { t } = useTranslation();

    return (
        <footer className="ltr:border-r rtl:border-l border-color-theme-light dark:border-D-color-theme-light">
            <div className="h-16 py-2">
                <div className="text-sm/6  text-center flex-col ltr">
                    <p>
                        <span className="text-T-bright dark:text-DT-bright">© 2024 <a href="#" className="text-color-theme dark:text-D-color-theme">
                            AimoonHUB</a>
                        </span>
                    </p>
                    <p>
                        <span className="text-T-bright dark:text-DT-bright">{t('copyright')}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}