import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment, useRef } from "react";

const ArticleConfirmDialog = ({ open, onConfirm, onCancel }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onCancel}
        initialFocus={cancelButtonRef}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center px-4 sm:px-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="max-h-screen overflow-y-auto">
              <Dialog.Panel className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-2xl p-6 sm:p-7 z-10">
                <div className="flex items-start gap-3">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mt-1 shrink-0" />
                  <div>
                    <Dialog.Title className="text-sm font-semibold text-gray-900">
                      Delete this article?
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-gray-600">
                      This article will be permanently removed from the
                      platform.
                      <br />
                      <span className="text-gray-800 font-medium">
                        This action cannot be undone.
                      </span>
                    </Dialog.Description>
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                  <button
                    ref={cancelButtonRef}
                    onClick={onCancel}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                  >
                    Keep Article
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    Delete Article
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ArticleConfirmDialog;
