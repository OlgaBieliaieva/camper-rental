import { forwardRef } from "react";
import styles from "./Modal.module.css";

const Modal = forwardRef(({ children }, ref) => {
  return (
    <dialog ref={ref} className={styles.modal}>
      {children}
    </dialog>
  );
});

Modal.displayName = "Modal";
export default Modal;
