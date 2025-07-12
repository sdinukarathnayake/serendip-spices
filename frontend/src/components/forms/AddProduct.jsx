import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiProduct from '../../api/apiProduct'
import { LoadingButton } from '../common/LoadingButton'

export default function AddProduct() {

    const [form, setForm] = useState({
        itemname: "",
        priceperkg: 0
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
            await apiProduct.post('/', form);
            navigate("/dashboard/seller");

        } catch (err) {
            setError(err.response?.data?.message || "Product Registration Failed..");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96" >

                <h2 className="text-2xl mb-6 text-center"> Product Registeration </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="itemname" className="block mb-2">
                        Item Name : 
                    </label>
                    <input
                        id="itemname"
                        name="itemname"
                        type="text"
                        value={form.itemname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="priceperkg" className="block mb-2">
                        Price Per Kg : 
                    </label>
                    <input
                        id="priceperkg"
                        name="priceperkg"
                        type="text"
                        value={form.priceperkg}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                        disabled={isLoading}
                    />
                </div>

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Registering..."
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" >
                    Register
                </LoadingButton>    
            </form>
        </div>
    );
}