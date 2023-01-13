import React from 'react'
import {useState} from "react"
import {uploadFile} from "./firebase";

function InputUploadImages() {
    
  var prueba = null;

  const [image, setImage] = useState(null)


  const chargeImage = (dato) => {
    console.log(prueba)
    console.log(dato)
    prueba = dato
    console.log(prueba)

    pruebaCarga(prueba)
  }

  const pruebaCarga = (otroDato) => {
    uploadFile(otroDato)
  }

  return (
    <input type="file" className="publication-option-button" onChange={e => {chargeImage(e.target.files[0])}} />
  )
}

export default InputUploadImages

