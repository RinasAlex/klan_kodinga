import React from "react";
import deleted from "@/assets/image/deleteWhite.svg";
import "./OrderModal.scss";

function OrderModal({ sendingOrder, setSendingOrder }) {
  const closeWindow = () => setSendingOrder(false);

  return (
    <div className={sendingOrder ? "modal__container" : "close__window"}>
      <div className="modal__window">
        <div className="title__delete">
          <h2 className="title">Congratulations! </h2>
          <img onClick={closeWindow} src={deleted} alt="" />
        </div>
        <p className="order_p">
          Your order has been successfully placed on the website.
        </p>
        <p className="order_p">
          A manager will contact you shortly to confirm your order.
        </p>
      </div>
    </div>
  );
}

export default OrderModal;
