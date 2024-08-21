import React, { useState } from "react";
import { useForm } from "react-hook-form";
import discountImg from "../../assets/discount/discount.svg";
import "./HomeDiscount.scss";

function HomeDiscount() {
  const [sendingDiscount, setSendingDiscount] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    setSendingDiscount(true);
    reset();
  };
  return (
    <div>
      <div className="discount__container">
        <div className="discount__container_box">
          <h1>5% off on the first order</h1>
          <div className="form__box">
            <img src={discountImg} alt="" />
            {!sendingDiscount ? (
              <form
                className="container__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="container__inputs">
                  <input
                    {...register("name", {
                      required: "Field is required!",
                    })}
                    type="text"
                    placeholder="Name"
                    className="input"
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
                    className="input"
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
                    className={`input`}
                  />
                  {errors?.email && (
                    <p className="error__message">{errors.email?.message}</p>
                  )}

                  <button className="btn" disabled={!isValid}>
                    Get a discount
                  </button>
                </label>
              </form>
            ) : (
              <div className="container__send">
                <p className="text__send">
                  You have 5% discount on all products!
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
