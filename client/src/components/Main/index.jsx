import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";
import Users from "./Users";
import Profile from "./Profile";
import Flashcards from "./Flashcards/Flashcards";

const Main = () => {
  const [dane, ustawDane] = useState([]);
  const [profile, setProfile] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const userDiv = document.getElementById("usersDiv");
  const profileDiv = document.getElementById("profileDiv");
  const flashcardsDiv = document.getElementById("flashcardsDiv");

  const handleGetUsers = async (e) => {
    e.preventDefault();
    //pobierz token z localStorage:
    const token = localStorage.getItem("token");
    //jeśli jest token w localStorage to:
    if (token) {
      try {
        //konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
          method: "get",
          url: "http://localhost:8080/api/users",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        //wysłanie żądania o dane:
        const { data: res } = await axios(config);
        //ustaw dane w komponencie za pomocą hooka useState na listę z danymi przesłanymi
        //z serwera – jeśli został poprawnie zweryfikowany token
        ustawDane(res.data); // `res.data` - zawiera sparsowane dane – listę
        profileDiv.style.display = "none";
        flashcardsDiv.style.display = "none";
        userDiv.style.display = "block";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          //localStorage.removeItem("token");
          window.location.reload();
        }
      }
    }
  };

  const handleShowProfile = async (e) => {
    e.preventDefault();
    // Pobierz token z localStorage:
    const token = localStorage.getItem("token");
    // Jeśli jest token w localStorage:
    if (token) {
      try {
        // Konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
          method: "get",
          url: "http://localhost:8080/api/users/profile/",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        // Wysłanie żądania o dane:
        const { data: res } = await axios(config);
        setProfile(res.data);
        userDiv.style.display = "none";
        flashcardsDiv.style.display = "none";
        profileDiv.style.display = "block";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    }
  };

  const handleShowFlashcards = async (e) => {
    e.preventDefault();
    // Pobierz token z localStorage:
    const token = localStorage.getItem("token");
    // Jeśli jest token w localStorage:
    if (token) {
      try {
        // Konfiguracja zapytania asynchronicznego z tokenem w nagłówku:
        const config = {
          method: "get",
          url: "http://localhost:8080/api/users/flashcards",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        // Wysłanie żądania o dane:
        const { data: res } = await axios(config);
        setFlashcards(res.flashcards);
        userDiv.style.display = "none";
        profileDiv.style.display = "none";
        flashcardsDiv.style.display = "block";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    }
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    // Show a confirmation popup to ask if the user is sure about deleting their profile
    if (window.confirm("Are you sure you want to delete your profile?")) {
      // If the user confirms, proceed with the deletion
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const config = {
            method: "delete",
            url: "http://localhost:8080/api/users/",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          };
          const response = await axios(config);
          console.log(`Delete message:`);
          console.log(response.data);
          localStorage.removeItem("token");
          window.location.reload();
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            localStorage.removeItem("token");
            window.location.reload();
          }
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <div className={styles.header}>
          <img src="/favicon.ico" alt="icon" className={styles.logo} />
          <h1>Cardcade</h1>
        </div>
        <div className={styles.dropdown}>
          <div onClick={toggleMenu} className={styles.menuIcon}><>&#8801;</></div>
            {menuOpen && (
              <div className={styles.menu}>
                <button onClick={handleShowFlashcards}>Your Flashcards</button>
                <div className={styles.divider} />
                <button onClick={handleGetUsers}>Get Users</button>
                <button onClick={handleShowProfile}>Profile Info</button>
                <button onClick={handleDeleteProfile}>Delete Profile</button>
                <div className={styles.divider} />
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
        </div>
      </nav>
      <div id="usersDiv" className={styles.list}>
        {dane.length > 0 && (
          <>
            <h2>Users list:</h2>
            <Users users={dane} />
          </>
        )}
      </div>
      <div id="profileDiv" className={styles.list}>
        {profile.length !== 0 && (
          <>
            <h2>Profile Info:</h2>
            <Profile profile={profile} />
          </>
        )}
      </div>
      <div id="flashcardsDiv" className={styles.list}>
      {flashcards.length !== 0 && (
          <>
            <h2>Your flashcards:</h2>
            <Flashcards flashcards={flashcards}/>
          </>
        )}
      </div>
    </div>
  );
};
export default Main;
