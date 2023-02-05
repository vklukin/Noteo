import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Registration = async (userObj) => {
  await axios
    .post("http://localhost:2000/auth/registration", userObj)
    .then(function (response) {
      toast.success("Вы успешно зарегистрировались", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    })
    .catch(function (error) {
      console.log(error);
      return toast.error("Произошла ошибка! Повторите попытку позже.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    });
};
