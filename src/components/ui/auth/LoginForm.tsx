import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../../../hooks/use-api";
import { useEncrypt } from "../../../hooks/use-helper";
import type { LoginResponse, ReqIF } from "../../../interface/auth.interface";
import { LoginSchema, type TLoginSchema } from "../../../lib/validators";
import type { AppDispatch } from "../../../store";
import { login } from "../../../store/auth";

export const LoginForm: React.FC = () => {
  const [generalError, setGeneralError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const api = new useApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    setGeneralError("");

    const req: ReqIF = {
      path: "auth/login",
      body: data,
    };

    try {
      const res = await api.post(req);
      const response: LoginResponse = res.data;
      const { token, payload } = response;

      Cookies.set("hAS-aTH", JSON.stringify(useEncrypt(token)), { expires: 7 });
      Cookies.set("glbl-unq-hr", JSON.stringify(useEncrypt(`${payload.id}`)), {
        expires: 7,
      });
      Cookies.set("as-mhusqi", JSON.stringify(useEncrypt(payload.role.name)), {
        expires: 7,
      });

      dispatch(
        login({
          token: token,
          role: payload.role.name,
          guid: `${payload.id}`,
        }),
      );

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.";
      setGeneralError(errorMsg);
    }
  };

  return (
    <div className="dark:bg-dark-900 flex min-h-screen w-full items-center justify-center bg-stone-100 bg-cover">
      <div className="dark:bg-dark-800 flex w-[380px] flex-col items-center gap-3 rounded-3xl bg-white px-10 py-12 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <div className="space-y-2.5 text-center">
          <p className="text-xl font-extrabold dark:text-white">User Login</p>
          <p className="text-[13px] dark:text-gray-300">
            Hey, Enter your details to get sign in <br /> to your account
          </p>
        </div>

        {generalError && (
          <div
            className="w-full rounded-lg bg-red-100 p-4 text-sm text-red-500"
            role="alert"
          >
            <span className="text-xs">{generalError}</span>
          </div>
        )}

        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                {...register("key")}
                type="text"
                placeholder="Enter Username / Email"
                className="focus:border-primary dark:border-dark-600 focus:outline-primary-200/50 dark:focus:outline-primary/30 dark:focus:border-primary w-full rounded-md border border-gray-300 p-2.5 text-[13px] focus:outline-[3.5px] dark:text-white dark:placeholder-gray-500 dark:focus:outline-4"
              />
              {errors.key && (
                <p className="text-xs text-red-500">{errors.key.message}</p>
              )}
            </div>

            <div className="mb-3">
              <input
                {...register("password")}
                type="password"
                placeholder="Passcode"
                className="focus:border-primary dark:border-dark-600 focus:outline-primary-200/50 dark:focus:outline-primary/30 dark:focus:border-primary w-full rounded-md border border-gray-300 p-2.5 text-[13px] focus:outline-[3.5px] dark:text-white dark:placeholder-gray-500 dark:focus:outline-4"
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary mt-5 w-full cursor-pointer rounded-md py-2.5 text-white transition duration-200 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
