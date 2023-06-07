import styles from "./styles.module.css";
import { useState } from "react";
import axios from "axios";
import Users from "./Users";
import Profile from "./Profile";

const Main = () => {
  const [dane, ustawDane] = useState([]);
  const [profile, setProfile] = useState([]);

  const userDiv = document.getElementById("usersDiv");
  const profileDiv = document.getElementById("profileDiv");

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
        setProfile(res.data); // Display the detailed user information in the console
        userDiv.style.display = "none";
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

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>MySite</h1>
        <div className={styles.button}>
          <button
            id="usersBtn"
            className={styles.white_btn}
            onClick={handleGetUsers}
          >
            Get Users
          </button>
          <button
            id="profileBtn"
            className={styles.white_btn}
            onClick={handleShowProfile}
          >
            Profile Info
          </button>
          <button className={styles.white_btn} onClick={handleDeleteProfile}>
            Delete Profile
          </button>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
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
    </div>
  );
};
export default Main;
