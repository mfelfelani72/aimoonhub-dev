import React from 'react'
import { cn } from "../../../../utils/lib/cn";

export default function ProgressBar({ percentage, startAt = 1, classNameParent, classNameChild, children }) {
    return (
        <div className={cn("relative h-2 bg-gray-300 dark:bg-gray-900 dark:bg-right rounded-lg overflow-hidden", classNameParent)}>
            <div className='absolute w-full text-center text-[0.85rem] font-bold text-slate-500' >{children}</div>
            <div
                style={{
                    width: `${percentage >= startAt ? percentage : startAt}%`
                }}
                className={cn("h-full bg-color-theme dark:bg-D-color-theme transition-all duration-1000", classNameChild)}
            >

            </div>



        </div>
    );
}
