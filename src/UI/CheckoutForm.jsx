import React from "react";
import "./CheckoutForm.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/futures/productSlice";

function CheckoutForm({
  setSendingOrder,
  sendProducts,
  cartProducts,
  totalPrice,
  setSendingDiscount,
  sendDiscount,
  classInput,
  classBtn,
  textBtn,
}) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    sendDiscount && dispatch(sendDiscount({ ...data }));
    sendProducts &&
      dispatch(
        sendProducts({ ...data, order: cartProducts, orderPrice: totalPrice })
      );
    setSendingDiscount && setSendingDiscount(true);
    setSendingOrder && setSendingOrder(true);
    dispatch(clearCart());
    reset();
  };

  return (
    <form className="container__form" onSubmit={handleSubmit(onSubmit)}>
      <label className="container__inputs">
        <input
          {...register("name", {
            required: "Field is required!",
          })}
          type="text"
          placeholder="Name"
          className={`${classInput} input`}
        />
        {errors?.name && (
          <p className="error__message">{errors.name?.message}</p>
        )}

        <input
          {...register("number", {
            required: "Field is required!",
            minLength: { value: 13, message: "min 13 characters" },
            maxLength: { value: 13, message: "max 13 characters" },
          })}
          type="number"
          placeholder="Phone number"
          className={`${classInput} input`}
        />
        {errors?.number && (
          <p className="error__message">{errors.number?.message}</p>
        )}

        <input
          {...register("email", {
            required: "Field is required!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          type="email"
          placeholder="Email"
          className={`${classInput} input`}
        />
        {errors?.email && (
          <p className="error__message">{errors.email?.message}</p>
        )}

        <button className={`${classBtn} btn`} disabled={!isValid}>
          {textBtn}
        </button>
      </label>
    </form>
  );
}

export default CheckoutForm;
