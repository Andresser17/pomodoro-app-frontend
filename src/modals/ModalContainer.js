import { useState, useEffect } from "react";
// Icons
import { ReactComponent as CloseIcon } from "../icons/close-icon.svg";

function CloseButton(props) {
  return (
    <div className="flex justify-end p-2">
      <button
        onClick={() => props.toggleModal(null)}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

function ModalContainer(props) {
  const styles =
    "fixed top-0 right-0 z-50 w-full h-full py-12 overflow-auto bg-black/60 md:inset-0 transition-all duration-300 ease-in-out";
  const [toggleModal, setToggleModal] = useState("hidden");

  // Hide/Unhide modal
  useEffect(() => {
    if (props.open) {
      setToggleModal("");
    } else setToggleModal("hidden");
  }, [props.open]);

  // Hide body scrollbar
  useEffect(() => {
    if (props.open) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props.open]);

  // Hide modal if user click outside
  const handleOutsideClick = (e) => {
    const target = e.target;

    if (target.id === "modal-container") {
      props.handleCloseModal();
    }
  };

  // Manage outside module click
  // useEffect(() => {
  //   window.addEventListener("click", handleOutsideClick);

  //   // Unmount listener
  //   return () => {
  //     window.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  return (
    // Modal container
    <div id="modal-container" className={`${styles} ${toggleModal}`}>
      {/* Modal content */}
      <div className="relative m-auto bg-white rounded-lg shadow w-fit dark:bg-gray-700">
        {/* Close button */}
        <CloseButton toggleModal={props.toggleModal} />
        {props.children[props.modalToOpen]}
      </div>
    </div>
  );
}

export default ModalContainer;
