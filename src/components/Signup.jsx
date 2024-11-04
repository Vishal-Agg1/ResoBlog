import React, { useState } from "react";
import Auth from "../Appwrite/Auth/Auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import Button from "./Button";
import Logo from "./Logo";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm(); // Added errors here
    const dispatch = useDispatch();

    const signup = async (data) => {
        setError("");
        try {
            const session = await Auth.createAccount({
                email: data.Email,            // Mapping form data
                password: data.Password,       // Mapping form data
                name: data.Name                // Mapping form data
            });
            if (session) {
                const userdata = await Auth.getCurrentUser();
                if (userdata) dispatch(login(userdata));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="Enter your Full Name"
                            {...register("Name", {
                                required: "Full Name is required",
                            })}
                        />
                        {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("Email", {
                                required: "Email is required",
                                validate: {
                                    isValidEmail: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be valid",
                                },
                            })}
                        />
                        {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            {...register("Password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                            })}
                        />
                        {errors.Password && <p className="text-red-500">{errors.Password.message}</p>}

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
