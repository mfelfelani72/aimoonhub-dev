import React, { useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "./Button.jsx";

function ModalDialogs({ showModal, setShowModal, title, text, type }) {
  // const [open, setOpen] = useState(true);
  return (
  
    <Dialog
      open={showModal}
      onClose={setShowModal}
      className="relative z-10 rtl"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex container mx-auto min-h-full justify-center text-center items-center p-4 self-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="w-[20rem] bg-white">
              <div className="flex items-end mx-4 pt-4">
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-red-600 "
                />
                 <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  <span className="px-3">{title}</span>
                </DialogTitle>
              </div>
              <div className="mt-3 text-center pb-2">
               
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3">
              {type == "info" && (
                <>
                  <Button onClick={() => setShowModal(false)} className="bg-color-theme hover:bg-color-theme">
                    Ok
                  </Button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalDialogs;
