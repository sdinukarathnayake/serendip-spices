import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from '../../api/apiClient'
import { LoadingButton } from '../common/LoadingButton'

export default function UserRegister() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        type: "Buyer",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await apiClient.post('/', form);
            navigate("/login");

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl mb-6 text-center">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {["name", "email", "phone", "username", "password"].map(
                    (field) => (
                        <div className="mb-4" key={field}>
                            <label className="block mb-2">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type={
                                    field === "password" ? "password" : "text"
                                }
                                name={field}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )
                )}

                <div className="mb-6">
                    <label className="block mb-2">User Type</label>
                    <select
                        name="type"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        disabled={isLoading}
                    >
                        <option>Buyer</option>
                        <option>Seller</option>
                        <option>Admin</option>
                    </select>
                </div>

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Registering..."
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Register
                </LoadingButton>    
            </form>
        </div>
    );
}