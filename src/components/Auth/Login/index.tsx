import postData from "@/api/postData.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, SheetIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
// import { IconUser, IconLock, IconTournament } from "@tabler/icons-react";
// import Link from "next/link";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginSchema = z.object({
    userName: z.string({ message: "Username is required." }),
    password: z.string({ message: "Password is required." }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const handleSignIn = async (data: any) => {
    try {
      const response = await postData("/users/login", data);
      localStorage.setItem("r_token", response.data.refreshTokenToken);
      localStorage.setItem("a_token", response.data.accessToken);
      //init store 
      
      window.location.href = "/";
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  };
  console.log(errors);
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
            <SheetIcon size={80} className="mb-6" color="#1b1a1e" />
            {/* Title and Tagline */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              SAGA Bill Pro
            </h1>
            <p className="text-center text-md md:text-lg  mb-4">
              Streamlined Accounts, Growth Assured
            </p>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="flex flex-col justify-center p-6 md:p-8 bg-white w-full md:w-1/2 rounded-r-lg">
          <h1
            className="text-center text-2xl font-semibold mb-6"
            style={{ color: "#4B0082" }}
          >
            Sign In
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            {/* Username Input */}
            <div className="grid gap-1.5">
              <Label htmlFor="username" className="text-gray-700">
                User Name
              </Label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <UserIcon className="mr-2 text-gray-600" size={25} />
                <Input
                  id="userName"
                  type="text"
                  className="border-none outline-none focus:ring-0 flex-grow px-2 py-2 text-base placeholder:text-sm"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setValue("userName", e.target.value);
                  }}
                />
              </div>
            </div>
            {errors.userName ? (
              <p className="text-sm text-red-600 mt-1">
                {errors?.userName?.message?.toString()}
              </p>
            ) : (
              <></>
            )}
            {/* Password Input */}
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <LockIcon className="mr-2 text-gray-600" size={25} />
                <Input
                  id="password"
                  type="password"
                  className="border-none outline-none focus:ring-0 flex-grow px-2 py-2 text-base placeholder:text-sm "
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
              className="w-full text-white py-6 rounded-md hover:bg-gray-600"
              style={{ backgroundColor: "#4B0082" }}
              size="lg"
            >
              Sign In
            </Button>

            {/* Registration Link */}
            {/* <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <Link
                to="/menus/auth/RegistrationForm"
                className="hover:underline"
                style={{ color: "#4B0082" }}
              >
                Register Here
              </Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
