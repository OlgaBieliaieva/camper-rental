import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { forwardRef } from "react";
import styles from "./Modal.module.css";

const Modal = forwardRef(({ children, onClose }, ref) => {
  return (
    <dialog ref={ref} className={styles.modal}>
      <button type="button" onClick={onClose} className={styles.closeBtn}>
        <CloseSharpIcon />
      </button>
      {children}
    </dialog>
  );
});

Modal.displayName = "Modal";
export default Modal;
