import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function Navbar(){
    const {logout} = useAuth();
    const navigate = useNavigate();
    function handleLogOut(){
        logout();
        navigate("/");
    }
    return(
        <>
        <div className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
            <h1 className='text-xl font-bold text-indigo-600'>
                TaskFlow Dashboard
            </h1>
            <button
                onClick={handleLogOut}
                className='bg-red-500 rounded-xl text-white px-4 py-2 hover:bg-red-600 transition'>
                    Logout
            </button>
        </div>
        </>
    );
}