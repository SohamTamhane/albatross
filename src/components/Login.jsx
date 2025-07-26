import { useState } from "react";
import { auth } from "../../src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // back arrow icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate("/admin-dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313] relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-white hover:text-blue-400 transition text-lg"
        >
          <ArrowLeft className="mr-1" /> Back
        </button>
      </div>

      <div className="bg-black text-white p-8 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold font-montserrat mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Login
          </button>

          <p className="text-sm mt-2 text-center text-gray-400">
            Don’t have an account? <a href="/albatross/admin-register" className="text-blue-400 hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
