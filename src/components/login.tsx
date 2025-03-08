import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/icons/logo.svg";
import login from "../Assets/Images/login.png";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;
    if (!email.trim()) {
      setValid((prevValid) => ({ ...prevValid, email: true }));
      isValid = false;
    } else {
      setValid((prevValid) => ({ ...prevValid, email: false }));
    }

    if (!password.trim() || password.length < 6) {
      setValid((prevValid) => ({ ...prevValid, password: true }));
      isValid = false;
    } else {
      setValid((prevValid) => ({ ...prevValid, password: false }));
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateFields()) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/stores");
      }, 2000);
    }

    catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast.success("Account created successfully!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (createError: any) {
          toast.error("Failed to create account: " + createError.message);
        }
      } 
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-1">
        <div className="login_Background flex flex-1 flex-col lg:w-[50%] justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-10 w-auto" src={logo} alt="Company Logo" />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight ">
                Sign in to your account / Create New Account
              </h2>
            </div>

            <div className="mt-10">
              <div className="flex flex-col space-y-6">
                <div>
                  <label
                    htmlFor="UserName"
                    className="block text-sm font-medium leading-6 "
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="UserName"
                      name="UserName"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setValid((prevValid) => ({
                          ...prevValid,
                          email: false,
                        }));
                      }}
                      className={`block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm 
                        ring-1 ring-inset ring-black placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${
                          valid.email ? "border-red-500 border-2" : ""
                        }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 "
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setValid((prevValid) => ({
                          ...prevValid,
                          password: false,
                        }));
                      }}
                      className={`block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm 
                        ring-1 ring-inset ring-black placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 ${
                          valid.password ? "border-red-500 border-2" : ""
                        }`}
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSignIn}
                    className="flex w-full justify-center bg-slate-400 rounded-md 
                      px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm 
                      hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in / Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side with Background Image */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={login}
            alt="Login"
          />
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
