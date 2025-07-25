import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient, { TOKEN_KEY } from '../../api/apiClient'
import { LoadingButton } from '../common/LoadingButton'

export default function UserLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { data } = await apiClient.post('/login', { username, password });

            const { user, token } = data;
            localStorage.setItem(TOKEN_KEY, token);

            // redirect based on role
            if (user.type === "Buyer") navigate("/dashboard/buyer");
            else if (user.type === "Seller") navigate("/dashboard/seller");
            else if (user.type === "Admin") navigate("/dashboard/admin");
        
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
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
                    disabled={isLoading}
                />

                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    className="w-full p-2 border rounded mb-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Logging in..."
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Login
                </LoadingButton>
            </form>
        </div>
    );
}