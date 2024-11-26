/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import postData from "@/api/postData.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import makeUpIcon from "../../../assets/makeUp.png";
import { useState } from "react";

const LoginPage = () => {
  const loginSchema = z.object({
    userName: z.string({ message: "Username is required." }),
    password: z.string({ message: "Password is required." }),
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const handleSignIn = async (data: any) => {
    try {
      setButtonLoader(true);
      setButtonDisable(true);
      const response = await postData("/users/login", data);
      localStorage.setItem("r_token", response.data.refreshTokenToken);
      localStorage.setItem("a_token", response.data.accessToken);
      //init store
      setButtonLoader(false);
      setButtonDisable(false);
      toast.success("Sign-in Success!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (e: any) {
      setButtonLoader(false);
      setButtonDisable(false);
      toast.error("Incorrect Username or Password. Please try again!");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#f0f3fa]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row shadow-xl rounded-lg w-full max-w-[850px] h-auto md:h-[450px]">
        {/* Left Section with Logo, Title, and Tagline */}
        <div
          className="flex flex-col justify-center items-center text-white p-6 md:p-8 w-full md:w-1/2 rounded-l-lg"
          style={{ backgroundColor: "#4B0082" }}
        >
          <div className="flex flex-col items-center">
            <img src={makeUpIcon} alt="makeUpIcon" />
            {/* Title and Tagline */}
            <h1 className="font-serif text-base md:text-lg font-semibold mb-2 mt-2 uppercase">
              JH Hair & Beauty Studio
            </h1>
            <p className="font-mono text-center text-md md:text-sm mb-4 uppercase">
              We make you shine like a star
            </p>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="flex flex-col justify-center p-6 md:p-8 bg-white w-full md:w-1/2 rounded-r-lg">
          <h1
            className="font-serif text-center text-xl font-semibold mb-2 uppercase"
            style={{ color: "#4B0082" }}
          >
            Sign In
          </h1>
          <p className="text-xs md:text-xs text-center mb-6 font-sans uppercase">
            (Use your credentials to sign in to the system)
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            {/* Username Input */}
            <div className="grid gap-1.5">
              <Label htmlFor="username" className="text-gray-700 font-serif text-slate-950">
                User Name
              </Label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <UserIcon className="mr-2 text-gray-600" size={18} />
                <Input
                  id="userName"
                  type="text"
                  className="border-none focus:outline-none focus:ring-0 outline-none flex-grow px-2 py-2 text-base placeholder:text-sm"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setValue("userName", e.target.value);
                  }}
                />
              </div>
            </div>
            {errors.userName ? (
              <p className="text-sm text-red-600">
                {errors?.userName?.message?.toString()}
              </p>
            ) : (
              <></>
            )}
            {/* Password Input */}
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-gray-700 font-serif text-slate-950">
                Password
              </Label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <LockIcon className="mr-2 text-gray-600" size={18} />
                <Input
                  id="password"
                  type="password"
                  className="outline-none border-none outline-none focus:ring-0 flex-grow px-2 py-2 text-base placeholder:text-sm"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setValue("password", e.target.value);
                  }}
                />
              </div>
              {errors.password ? (
                <p className="text-sm text-red-600 mt-1">
                  {errors?.password?.message?.toString()}
                </p>
              ) : (
                <></>
              )}
            </div>

            {/* <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <Label htmlFor="remember" className="text-gray-700 text-sm">
                  Remember this Device
                </Label>
              </div>
              <Link
                to="/forgot-credentials"
                className="text-sm"
                style={{ color: "#4B0082" }}
              >
                Forgot Password?
              </Link>
            </div> */}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full text-white py-6 rounded-md hover:bg-gray-600 font-mono"
              style={{ backgroundColor: "#4B0082" }}
              size="lg"
              disabled={buttonDisable}
            >
              {buttonLoader ? "Verifying..." : "Good to go!"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
