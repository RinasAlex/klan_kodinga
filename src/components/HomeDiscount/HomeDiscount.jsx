import React, { useState } from "react";
import discountImg from "@/assets/discount/discount.svg";
import "./HomeDiscount.scss";
import CheckoutForm from "@/UI/CheckoutForm";
import { sendDiscount } from "@/store/futures/productSlice";

function HomeDiscount() {
  const [sendingDiscount, setSendingDiscount] = useState(false);

  return (
    <div>
      <div className="discount__container">
        <div className="discount__container_box">
          <h1>5% off on the first order</h1>
          <div className="form__box">
            <img className="img" src={discountImg} alt="" />
            {!sendingDiscount ? (
              <CheckoutForm
                textBtn="Get a discount"
                setSendingDiscount={setSendingDiscount}
                sendDiscount={sendDiscount}
              />
            ) : (
              <div className="container__send">
                <p className="text__send">
                  The discount has been successfully sent by email
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDiscount;
