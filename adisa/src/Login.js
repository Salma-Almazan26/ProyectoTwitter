import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import image from "./imagenes/kiwi.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <img src={image} className="logo"></img>
        <h1 className="titulo">Inicia Sesión en ADISA.</h1>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Iniciar sesión con Google
        </button>
        <h5 className="barra"> </h5>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electronico"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Iniciar Sesión
        </button>
        
        
        <a href="/reset" className="btn_2">¿Olvidaste la contraseña?</a>
      
        
      </div>
      <footer>
          <a href="/register" className="btn-extra">Registrarse</a>
           
      </footer>
    </div>
    
  );
}
export default Login;