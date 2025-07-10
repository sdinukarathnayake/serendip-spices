import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from '../api/apiClient'

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await apiClient.post('/users/login', { username, password });

            const { user, token } = data;
            localStorage.setItem("token", token);

            // redirect based on role
            if (user.type === "Buyer") navigate("/dashboard/buyer");
            else if (user.type === "Seller") navigate("/dashboard/seller");
            else if (user.type === "Admin") navigate("/dashboard/admin");
        
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-80"
            >
                <h2 className="text-2xl mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-2">Username</label>
                <input
                    className="w-full p-2 border rounded mb-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    className="w-full p-2 border rounded mb-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}