import { useState } from "react";
import api from "../api/axios";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const signup = async () => {
    try {
      const res = await api.post("/signup", { email, password });
      setMsg(res.data.message);
      setStep(2);
    } catch {
      setMsg("Signup failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post("/verify-otp", { email, otp });
      setMsg(res.data.message);
    } catch {
      setMsg("OTP invalid or expired");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      {step === 1 && (
        <>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password"
                 onChange={e => setPassword(e.target.value)} />
          <button onClick={signup}>Signup</button>
        </>
      )}

      {step === 2 && (
        <>
          <input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <p>{msg}</p>
    </div>
  );
};

export default Signup;
