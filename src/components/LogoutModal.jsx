import { useNavigate } from "react-router-dom";

const LogoutModal = (onCancel) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear token or user session here
    navigate("/admin-login");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-opacity-10 backdrop-blur-sm">
      <div className="bg-black p-6 rounded shadow-md text-center w-72">
        <p className="text-lg font-semibold mb-4 text-white">Are you sure you want to logout?</p>
        <div className="flex justify-between mt-4">
          <button onClick={handleLogout} className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">Yes</button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded cursor-pointer text-black">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
