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
  return (
    // Modal container
    <div className="fixed left-0 right-0 z-50 flex items-center justify-center h-full bg-black/60 top-4 md:inset-0">
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow w-[22rem] md:h-auto dark:bg-gray-700">
        {/* Close button */}
        <CloseButton handleCloseModal={props.handleCloseModal} />
        {props.children}
      </div>
    </div>
  );
}

export default ModalContainer;
