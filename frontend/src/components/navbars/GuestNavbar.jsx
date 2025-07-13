import { Link } from "react-router-dom";

export default function Login() {
    return(
        <>
            <div className="flex justify-between items-center px-7 py-4">
                <h3 className="text-2xl"> HomePage </h3>

                <nav className="space-x-7">
                    <a> Home </a>
                    <a> Products </a>
                    <a> About </a>
                    <a> Contact </a>
                </nav>

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
        </>
    );
}