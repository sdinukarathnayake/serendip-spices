import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="space-x-4">

                <Link to="/login">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Login
                    </button>
                </Link>

                <Link to="/register">
                    <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
                        Register
                    </button>
                </Link>
                
            </div>
        </div>
    );
}