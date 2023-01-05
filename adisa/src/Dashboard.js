import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout, saveTweet } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import logo from './imagenes/kiwi.png'

/**
 *        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          <FontAwesomeIcon icon={icon({name: 'kiwi-bird', style: 'solid'})}/>
        </button> 
 * @
 */


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  var tweet = "";

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  const handleChange = (e) => {
    tweet = e.target.value; 
    console.log(tweet);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTweet(tweet);
    e.target.reset();
  }

  return (
    <div className="dashboard">
      <div className = "dashboard__container_left ">
          <div className="left-option"> <img src={logo} className="logo"/> </div>
          <div className="left-option"> <FontAwesomeIcon icon={icon({name: 'house', style: 'solid'})} className="left-icon"/> </div>
          <div className="left-option"> <FontAwesomeIcon icon={icon({name: 'hashtag', style: 'solid'})} className="left-icon" /> </div>
          <div className="left-option"> <FontAwesomeIcon icon={icon({name: 'bell', style: 'solid'})} className="left-icon" /> </div>
          <div className="left-option"> <FontAwesomeIcon icon={icon({name: 'envelope', style: 'solid'})} className="left-icon" /> </div>
          <div className="left-option"> <FontAwesomeIcon icon={icon({name: 'user', style: 'solid'})} className="left-icon" /> </div>
          <div className="left-option"> <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} className="left-icon" /> </div>
          <div className="left-option container-post"> <FontAwesomeIcon icon={icon({name: 'feather-pointed', style: 'solid'})} className="left-icon new-post" /> </div>
          <div className="left-option profile-icon"></div>
      </div>
      <div className="dashboard__container_center">

        <form className="new-publication" onSubmit={handleSubmit}>
          <h2>Home</h2>
          <div className="publication-data">
            <div className="profile-image"></div>
            <input type="text" name="text-publication" onChange={handleChange} placeholder="What's happening"/>
          </div>
          <hr></hr>
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
      <div className="dashboard__container_right">
        <div className="search_section">
          <form className="search-tool">
            <input type="text" name="search-tool-bar" placeholder="Search ADISA"/>
            <button type="submit"><FontAwesomeIcon icon={icon({name: 'magnifying-glass', style: 'solid'})} className="search-button"/></button>
          </form>
        </div>

        <div className="news-tweets">
          <h3>What's happening</h3>
          <div className="new">
              <p>Kind</p>
              <h4>Tittle</h4>
              <p>Tweets</p>
              <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} className="dots-more"/>
          </div>

          <div className="new">
              <p>Kind</p>
              <h4>Tittle</h4>
              <p>Tweets</p>
              <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} className="dots-more"/>
          </div>

          <div className="new">
              <p>Kind</p>
              <h4>Tittle</h4>
              <p>Tweets</p>
              <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} className="dots-more"/>
          </div>

          <div className="new">
              <p>Kind</p>
              <h4>Tittle</h4>
              <p>Tweets</p>
              <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} className="dots-more"/>
          </div>

          <div className="new">
              <p>Kind</p>
              <h4>Tittle</h4>
              <p>Tweets</p>
              <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} className="dots-more"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;