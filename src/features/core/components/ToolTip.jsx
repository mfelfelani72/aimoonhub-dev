import React from "react";

import { cn } from "../../../../utils/lib/cn";

function ToolTip({ text, children, className }) {
  return (
    <div className="has-tooltip">
      <span
        className={cn(
          "tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8 text-[0.8rem]",
          className
        )}
      >
        {text}
      </span>
      {children}
    </div>
  );
}

export default ToolTip;
