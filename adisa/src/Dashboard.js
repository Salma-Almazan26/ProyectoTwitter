import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, onSnapshot, logout} from "./firebase";
import { query, collection, getDocs, where, loadBundle, connectFirestoreEmulator, orderBy} from "firebase/firestore";
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
  var DDMMAA = "";

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
    const q = query(collection(db, "tweets"), orderBy("fecha", "desc"))
    const changes = onSnapshot(q, (querySnapshot) => {
      var myTweets = [];
      querySnapshot.forEach( (doc) => {
        DDMMAA = (doc.data().fecha["seconds"]*1000000000) + ( doc.data().fecha["nanoseconds"] )
        DDMMAA *= 0.000001
        var myDDMMAA = new Date(DDMMAA)
        myTweets.push({...doc.data(), 
        id: doc.id, 
        dia: myDDMMAA.getDate(),
        mes: myDDMMAA.getMonth() + 1,
        anio: myDDMMAA.getFullYear(),
        hora: myDDMMAA.getHours(),
        minuto: myDDMMAA.getMinutes()})
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
          <div className="left-option logout-button" onClick={logout}> <FontAwesomeIcon icon={icon({name: 'right-from-bracket', style: 'solid'})} className="left-icon logout-icon" /> </div>
          <div className="left-option profile-icon"></div>
      </div>
      <div className="dashboard__container_center">
      
      <div>
        <Form userName={name}/>
      </div>

      <div>
        {
          
          pubs.map(publication => (
            <div className="new-tweet" key={publication.id}>
                              <div className="profile-photo_new-tweet">
                  <FontAwesomeIcon icon={icon({name: 'user', style: 'solid'})} className="left-icon" />
                </div>
              <div className="data-message-user_new-tweet">
                <div className="publication-area_new-tweet">
                  <div className="publication-data_new-tweet">
                    <div className="author_new-tweet">{publication.persona}</div>
                    <div className="dot_new-tweet"><FontAwesomeIcon icon={icon({name: 'circle', style: 'solid'})} className="icon_new-tweet dot less-important" /></div>
                    <div className="less-important">{publication.dia}/{publication.mes}/{publication.anio}</div>
                    <div className="less-important">{publication.hora}:{publication.minuto}</div>
                  </div>
              
                  <div className="message_new-tweet">
                    <p>{publication.tweet}</p>
                  </div>
                  <img src={publication.imagen} alt="" className="img-author_new-tweet"/>

                  <div className="actions-bar_new-tweet">
                    <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'chart-simple', style: 'solid'})} className="publication-icon tweet-option"/> </div>
                    <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'comment', style: 'solid'})} className="publication-icon tweet-option"/> </div>
                    <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'retweet', style: 'solid'})} className="publication-icon tweet-option"/> </div>
                    <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'heart', style: 'solid'})} className="publication-icon tweet-option"/> </div>
                    <div className="publication-option"> <FontAwesomeIcon icon={icon({name: 'arrow-up-from-bracket', style: 'solid'})} className="publication-icon tweet-option"/> </div>
                  </div>
                </div>
              </div>
            </div>
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