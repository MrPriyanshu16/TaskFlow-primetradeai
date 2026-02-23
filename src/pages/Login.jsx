import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from 'react';
import API from "../api/axios.js";
export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    }

    function validate() {
        let newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    }


    async function handleSubmit(e) {
        e.preventDefault();
        //console.log("Form is submitted");
        const validationErrors = validate();
        //console.log("validations error: ", validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const res = await API.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            login(res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setErrors({
                api: err.response?.data?.message || "Login failed",
            });
        }
    }
    //const isFormValid = formData.email && formData.password  && Object.keys(errors).length === 0;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500">
            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}

                    {errors.api && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.api}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don't have an account? {" "}
                    <Link to="/register" className="text-indigo-600 font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>

    );
}