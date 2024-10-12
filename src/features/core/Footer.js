import React from "react";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer className="relative border-t border-color-theme-light dark:border-D-color-theme-light bg-B-bright dark:bg-DT-dim z-10">
        <div className="container mx-auto md:w-[30rem] flex-col bg-rose-600">
          <div>
            <h3 className="">coin list</h3>
          </div>
          <div className="">sadsa</div>
        </div>
        <div className="h-16 py-2">
          <div className="text-sm/6  text-center flex-col ltr">
            <p>
              <span className="text-T-bright dark:text-DT-bright">
                © 2024{" "}
                <a
                  href="#"
                  className="text-color-theme dark:text-D-color-theme"
                >
                  AimoonHUB
                </a>
              </span>
            </p>
            <p>
              <span className="text-T-bright dark:text-DT-bright">
                {t("copyright")}
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
