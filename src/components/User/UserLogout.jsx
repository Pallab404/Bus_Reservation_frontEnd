import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogout = () => {
const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("User2");
      localStorage.removeItem("user-token"); // if student has token 

      toast.success("logged out successfully" ,{position:"top-center"})

    // Redirect and prevent back navigation
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Are you sure you want to logout?
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserLogout