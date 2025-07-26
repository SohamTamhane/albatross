import { useState } from "react";
import { auth } from "../../src/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/albatross/admin-login");
    } catch (err) {
      setError("Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313]">
      <div className="bg-black text-white p-8 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Admin Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded bg-transparent text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded bg-transparent text-white placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Register
          </button>
          <p className="text-sm mt-2 text-center text-gray-400">
             Already registered? <a href="/albatross/admin-login" className="text-blue-400 hover:underline">Login</a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;
