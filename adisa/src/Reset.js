import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="reset">
      <div className="reset__container">
        <h1 className="titulo">Encuentra tu cuenta de ADISA</h1>
        <h4 className="Contexto">Introduce tu correo electronico</h4>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electronico"
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          Recuperar
        </button>

      </div>
    </div>
  );
}

export default Reset;