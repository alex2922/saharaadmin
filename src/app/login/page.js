import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 🔒 Hardcoded credentials (replace with your own)
    if (id === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true"); // ✅ Store login status
      router.push("/dashboard"); // ✅ Redirect to dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
