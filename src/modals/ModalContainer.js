import { useState, useEffect } from "react";
// Icons
import { ReactComponent as CloseIcon } from "../icons/close-icon.svg";

function CloseButton(props) {
  return (
    <div className="flex justify-end p-2">
      <button
        onClick={props.handleCloseModal}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

function ModalContainer(props) {
  // Hide body scrollbar
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Hide modal if user click outside
  const handleOutsideClick = (e) => {
    const target = e.target;

    if (target.id === "modal-container") {
      props.handleCloseModal();
    }
  };

  // useEffect(() => {
  //   window.addEventListener("click", handleOutsideClick);

  //   // Unmount listener
  //   return () => {
  //     window.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  return (
    // Modal container
    <div
      id="modal-container"
      className="fixed z-50 flex items-center justify-center h-full overflow-auto bg-black/60 md:inset-0 transition-all duration-300 ease-in-out"
    >
      {/* Modal content */}
      <div className="relative mx-auto my-24 bg-white rounded-lg shadow w-fit dark:bg-gray-700">
        {/* Close button */}
        <CloseButton handleCloseModal={props.handleCloseModal} />
        {props.children}
      </div>
    </div>
  );
}

export default ModalContainer;
