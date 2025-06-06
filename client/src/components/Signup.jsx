import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [userData, setUserData] = useState({ fullName: "", username: "", password: "", confirmPassword: "" });
    const [isFocused, setIsFocused] = useState({ fullName: false, username: false, password: false, confirmPassword: false })
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleFocuse = (event) => {
        setIsFocused({
            ...isFocused,
            [event.target.name]: true
        })
    }

    const handleBlur = (event) => {
        setIsFocused({
            ...isFocused,
            [event.target.name]: false
        })
    }

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            toast.error("Password does not match");
            return;
        }
        setIsLoading(true);
        try {
            const responseData = await axios.post(
                `${import.meta.env.VITE_BASE_URL_NODE}/api/v1/signup`,
                { fullName: userData.fullName, userName: userData.username, password: userData.password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            setTimeout(() => {
                navigate('/signin');
            }, 0);
            toast.success(responseData?.data?.message)
        }
        catch (error) {
            console.log(error);
            
            toast.error(error.response?.data?.message)
            console.error("Error signing in:", error.response?.data || error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[100vh] flex justify-center items-center ">
            <div className="bg-white shadow-xl w-[28rem] py-8 px-10 border border-gray-300 rounded-lg">
                <div className="text-center text-[2rem] font-semibold mb-4">Sign Up</div>
                <form onSubmit={handleSignUp} className="">
                    <div className="flex flex-col gap-7">
                        <div className="relative ">
                            <input type="text" name="fullName" required
                                value={userData.fullName}
                                onChange={handleChange}
                                onFocus={handleFocuse}
                                onBlur={handleBlur}
                                className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-emerald-300 border-2 border-gray-300 rounded-md focus:border-emerald-500"
                            />
                            <label
                                className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.fullName ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.fullName ? "text-emerald-500" : "text-gray-500"}`}
                            >
                                Fullname
                            </label>
                        </div>
                        <div className="relative ">
                            <input type="text" name="username" required
                                value={userData.username}
                                onChange={handleChange}
                                onFocus={handleFocuse}
                                onBlur={handleBlur}
                                className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-emerald-300 border-2 border-gray-300 rounded-md focus:border-emerald-500"
                            />
                            <label
                                className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.username ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.username ? "text-emerald-500" : "text-gray-500"} `}
                            >
                                Username
                            </label>
                        </div>
                        <div className="relative ">
                            <input type="password" name="password" required
                                value={userData.password}
                                onChange={handleChange}
                                onFocus={handleFocuse}
                                onBlur={handleBlur}
                                className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-emerald-300 border-2 border-gray-300 rounded-md focus:border-emerald-500"
                            />
                            <label
                                className={`absolute left-3 pointer-events-none focus focus:text-emerald-500 transition-all duration-300 
                            ${userData.password ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.password ? "text-emerald-500" : "text-gray-500"} `}
                            >
                                Password
                            </label>
                        </div>

                        <div className="relative ">
                            <input type="password" name="confirmPassword" required
                                value={userData.confirmPassword}
                                onChange={handleChange}
                                onFocus={handleFocuse}
                                onBlur={handleBlur}
                                className="w-full transition duration-[0.2s] px-3 py-2.5 text-base outline-none hover:border-emerald-300 border-2 border-gray-300 rounded-md focus:border-emerald-500"
                            />
                            <label
                                className={`absolute left-3 pointer-events-none transition-all duration-300 
                            ${userData.confirmPassword ? "-top-2 left-2 text-xs bg-white px-2" : "top-[0.55rem]"} 
                            ${isFocused.confirmPassword ? "text-emerald-500" : "text-gray-500"} `}
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="relative">

                            <button
                                type="submit"
                                className={`bg-gradient-to-r from-emerald-600 to-green-600 text-white  ${isLoading ? 'bg-opacity-40 cursor-not-allowed ' : 'hover:bg-emerald-600'} w-full text-white px-5 py-2.5 rounded-md float-right focus:outline-none`}
                                disabled={isLoading}
                            >
                                SignUp
                            </button>
                            <div className={`absolute loading loading-ring loading-lg text-emerald-800 ${isLoading ? 'block' : 'hidden'} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}></div>
                        </div>
                    </div>
                    <div className="text-center font-semibold my-2 ">Already have an account?<Link to={'/signin'}><span className="text-emerald-500"> Sign in</span></Link> </div>
                </form>
            </div>
        </div>

    )
}

export default Signup;