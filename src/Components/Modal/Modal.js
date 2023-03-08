import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    console.log("componentDidMount modal");
    window.addEventListener("keydown", this.hendleKeyDown);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount modal");
    window.removeEventListener("keydown", this.hendleKeyDown);
  }

  hendleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };
  render() {
    return createPortal(
      <div onClick={this.props.closeModal} className={s.Overlay}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
