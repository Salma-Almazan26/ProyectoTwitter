import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, onSnapshot, logout} from "./firebase";
import { query, collection, getDocs, where, loadBundle, connectFirestoreEmulator} from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import logo from './imagenes/kiwi.png'
import { async } from "@firebase/util";
import Form from "./Form"

/**
 *        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          <FontAwesomeIcon icon={icon({name: 'kiwi-bird', style: 'solid'})}/>
        </button> 


                <div className="tweets-container">
          {
            tweetsArray.map(oneTweet => (
              <div>
                {oneTweet.data().tweet}
              </div>
            ))  
          }
          
        </div>
 * @
 */

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [pubs, setPubs] = useState([]);
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

  const getTweets = async () => {
    const q = query(collection(db, "tweets"))
    const changes = onSnapshot(q, (querySnapshot) => {
      var myTweets = [];
      querySnapshot.forEach( (doc) => {
        myTweets.push({...doc.data(), id: doc.id})
      })
      setPubs(myTweets)
      console.log(myTweets)
    })
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    console.log('getting data')
    fetchUserName();
    getTweets();
    console.log(name)
    
  }, [user, loading]);

  



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
          <div className="left-option container-post" onClick={logout}> <FontAwesomeIcon icon={icon({name: 'right-from-bracket', style: 'solid'})} className="left-icon new-post" /> </div>
          <div className="left-option profile-icon"></div>
      </div>
      <div className="dashboard__container_center">
      
      <div>
        <Form userName={name}/>
      </div>

      <div>
        {
          pubs.map(publication => (
            <div className="new-tweet" key={publication.id}>{publication.tweet}</div>
          ))
        }
      </div>

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