import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Users from "./components/Users";
import Profile from "./components/Profile";
import ShowFlashcards from "./components/ShowFlashcards";
import AddFlashcard from "./components/AddFlashhcard";

const Main = () => {
  const [dane, ustawDane] = useState([]);
  const [profile, setProfile] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addflashcard, setAddFlashcard] = useState(false);

  const userDiv = document.getElementById("usersDiv");
  const profileDiv = document.getElementById("profileDiv");
  const addFlashcardDiv = document.getElementById("addFlashcardDiv");
  const showFlashcardsDiv = document.getElementById("showFlashcardsDiv");

  const handleAddFlashcard = () => {
      setAddFlashcard(!addflashcard);
      userDiv.style.display = "none";
      profileDiv.style.display = "none";
      showFlashcardsDiv.style.display = "none";
      addFlashcardDiv.style.display = "block";
  }

  const handleShowFlashcards = async (e) => {
    if (e) {
      e.preventDefault();
    }
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
        addFlashcardDiv.style.display = "none";
        showFlashcardsDiv.style.display = "block";
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

const deleteFlashcard = async (flashcardId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await axios.delete(
      `http://localhost:8080/api/users/flashcards/${flashcardId}`,
      config
    );

    console.log(response.data.message); // Flashcard deleted
  } catch (error) {
    console.error(error.response.data.message);
  }
};

const editFlashcard = async (flashcardId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await axios.put(
      `http://localhost:8080/api/users/flashcards/${flashcardId}`,
      {
        body: {
          "word": "abcd",
          "translation": "efd"
        } 
      },
      config
    );

    console.log(response.data.message); // Flashcard deleted
  } catch (error) {
    console.error(error.response.data.message);
  }
};

  const handleGetUsers = async (e) => {
    if (e) {
      e.preventDefault();
    }
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
        addFlashcardDiv.style.display = "none";
        showFlashcardsDiv.style.display = "none";
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
    if (e) {
      e.preventDefault();
    }
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
        addFlashcardDiv.style.display = "none";
        showFlashcardsDiv.style.display = "none";
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
    if (e) {
      e.preventDefault();
    }
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest(`.${styles.dropdown}`)) {
        setMenuOpen(false);
      }
    };
  
    document.addEventListener("click", handleOutsideClick);
  
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

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
                <button onClick={() => { handleAddFlashcard(); setMenuOpen(false); }}>Add new flashcard</button>
                <button onClick={() => { handleShowFlashcards(); setMenuOpen(false); }}>Your Flashcards</button>
                <button onClick={() => { deleteFlashcard("6492d89d4ce6a7c6c4b7a78a"); }}>Delete deleteme flashcard</button>
                <button onClick={() => { editFlashcard("6492d6c619a32c79adf0696d");}}>Edit editme flashcard</button>
                <div className={styles.divider} />
                <button onClick={() => { handleGetUsers(); setMenuOpen(false); }}>Get Users</button>
                <button onClick={() => { handleShowProfile(); setMenuOpen(false); }}>Profile Info</button>
                <button onClick={() => { handleDeleteProfile(); setMenuOpen(false); }}>Delete Profile</button>
                <div className={styles.divider} />
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
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
      <div id="showFlashcardsDiv" className={styles.list}>
      {flashcards.length !== 0 && (
          <>
            <h2>Your flashcards:</h2>
            <ShowFlashcards flashcards={flashcards}/>
          </>
        )}
      </div>
      <div id="addFlashcardDiv" className={styles.list}>
      {addflashcard.length !==0 && (
          <AddFlashcard handleShowFlashcards={handleShowFlashcards} setAddFlashcard={setAddFlashcard}/>
        )}
      </div>
    </div>
  );
};
export default Main;
