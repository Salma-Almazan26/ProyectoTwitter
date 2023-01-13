import React, { useState } from 'react'
import { auth, db, saveTweet, onSnapshot} from "./firebase";
import { serverTimestamp } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function Form({userName}) {
    const datoInicial = {
        mensaje: "",
        usuario: "",
        fecha:""
    }

    const [twitters, setTwitters] = useState(datoInicial);

    const nuevoMensaje = (a) => {
        const {name, value} = a.target;
        setTwitters({[name]: value, persona: userName, fecha: serverTimestamp()}) 
    }

    const comprueba = () => {
        console.log(twitters["fecha"])
    }

    const publicarMensaje = (a) => {
        a.preventDefault();
        saveTweet(twitters);
        setTwitters({...datoInicial});
        a.target.reset();
        
    }

  return (
    <div>
        <form className="new-publication" onSubmit={publicarMensaje}>
            <h2>Hello, {userName}</h2>
            <div className="publication-data">
                <div className="profile-image"></div>
                <textarea type="text" name='tweet' placeholder="What's happening" onChange={nuevoMensaje}/>
            </div>

            <hr />

            <div className="buttons-publication">
                <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'image', style: 'solid'})} className="publication-icon"/> </div>
                <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'camera', style: 'solid'})} className="publication-icon"/> </div>
                <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'list-ul', style: 'solid'})} className="publication-icon"/> </div>
                <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'face-laugh-wink', style: 'solid'})} className="publication-icon"/> </div>
                <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'calendar-days', style: 'solid'})} className="publication-icon"/> </div>
                <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'location-dot', style: 'solid'})} className="publication-icon"/> </div>
           
                <button className="tweet">Tweet</button>
            </div>
        </form>
    </div>
  )
}

export default Form