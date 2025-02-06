"use client";
import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  EyeOff,
  Eye,
  Command,
  Brain,
  FileText,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
const AuthPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin
        ? "https://ecommerce-backend-4cc1.onrender.com/user/login"
        : "https://ecommerce-backend-4cc1.onrender.com/user/register";

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            user_name: formData.user_name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user.user_name);

        toast({
          title: "Authentication Successful",
          description: isLogin
            ? "Logged in successfully!"
            : "Account created successfully!",
          className: "bg-green-500 text-white border-none",
        });

        // Slight delay to show toast before redirecting
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description:
            data.message || "An error occurred during authentication.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Unable to connect to the server. Please try again.",
      });
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "PDF Analysis",
      description:
        "Upload your math textbooks and notes for AI-powered quiz generation",
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      title: "Video Learning",
      description: "Convert educational videos into interactive quiz content",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Generation",
      description:
        "AI-powered system creates personalized math practice questions",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left Column - Platform Info */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-around p-12 bg-[#4173F2] ">
        <div>
          <h1 className="mt-12 text-4xl font-bold text-white">
            Transform Your Math Learning Experience
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Join thousands of students and educators using AI-powered math
            quizzes to enhance learning outcomes.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 bg-indigo-800 rounded-lg text-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-indigo-100">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Auth Form */}
      <div className="w-full lg:w-1/2 relative">
        {/* Logo positioned absolutely in top left corner */}
        <div className="absolute top-0 left-0">
          <Image
            src="/logo.png"
            width={200}
            height={50}
            alt="Logo"
            className=""
          />
        </div>

        <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                {isLogin ? "Welcome back!" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-[#4173F2]  hover:text-indigo-500"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                {/* Name Field (Sign Up only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.user_name}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#4173F2] hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                  </span>
                  {isLogin ? "Sign in" : "Sign up"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
