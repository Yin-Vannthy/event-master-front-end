"use client";

import Link from "next/link";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
    const initialData = {
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: initialData,
        mode: "onChange",
    });

    const [isLocked, setIsLocked] = useState(true);
    const handleLockClick = () => setIsLocked((prevState) => !(prevState));

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        const res = await signIn("credentials", {
            redirect: false,
            ...data,
        });
        if (res.ok) {
            router.push("/overview");
        } else {
            setLoading(false);
            toast.error("Incorrect password. Please try again.", {
                position: "top-center"
                });
        }
    }

    return (
        <div
            className="absolute flex mt-11 flex-col h-screen justify-center lg:px-8 w-full p-8 xl:mx-[42%] xl:mt-2 xl:w-[45%] xl:right-[10%]">
            <div className="mt-8 sm:mx-auto w-full sm:w-full sm:max-w-md flex justify-center ">
                <div className="bg-white py-6 md:py-8 w-[110%] shadow rounded-[40px] px-3 md:px-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-12 -mt-3 rounded-radiusUi">
                            <h2 className="mt-6 px-2 text-center text-3xl md:text-4xl font-bold flex justify-center">
                                Login
                            </h2>
                            <p className="mt-5 flex justify-center greyUi">
                                Welcome back! Please enter your information
                            </p>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium primary-text block mb-2"
                            >
                                Email <span className="text-red-600">*</span>
                            </label>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    className={`${
                                        errors.email
                                            ? "border-red-700 focus:border-red-600"
                                            : "border-gray-300"
                                    } shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-600 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-6">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium primary-text block mb-2"
                            >
                                Password <span className="text-red-600">*</span>
                            </label>
                            <div className={"relative"}>
                                <input
                                    type={isLocked ? "Password" : "text"}
                                    id="password"
                                    className={`shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5 ${
                                        errors.userPassword
                                            ? "border-red-700 focus:border-red-600"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^[A-Za-z0-9]*$/,
                                            message:
                                                "Password must contain only numbers and characters",
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password requires at least 8 characters",
                                        },
                                    })}
                                />
                                <div
                                    className="absolute top-4 right-3 cursor-pointer"
                                    onClick={handleLockClick}
                                >
                                    <Image
                                        src={
                                            isLocked ? "/icons/lock-slash.svg" : "/icons/unlock.svg"
                                        }
                                        width={20}
                                        height={20}
                                        alt={isLocked ? "lock icon" : "unlock icon"}
                                    />
                                </div>
                            </div>
                            {errors.userPassword && (
                                <span className="text-red-600 text-sm">
                                    {errors.userPassword.message}
                                </span>
                            )}
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                            <div className="text-sm leading-5">
                                <Link
                                    href={`/forgot-password`}
                                    className="text-purple-text hover:text-violet-500 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 mb-6">
                            <button
                                type="submit"
                                id="login"
                                className={`bg-purple-text text-white font-medium text-sm rounded-3xl px-32 py-3.5  shadow-md shadow-violet-400  ${
                                    !isValid
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-violet-500"
                                }`}
                                disabled={!isValid}
                            >
                                {/*loading*/}
                                {loading ? <div className='loader'></div> : "Login" }
                            </button>
                        </div>

                        <p className="flex justify-center primary-text mb-4">
                            Don't have an account?<b>&nbsp;</b>
                            <Link
                                href={`/signup`}
                                className="text-purple-text hover:text-violet-500 font-medium"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default LoginComponent;
