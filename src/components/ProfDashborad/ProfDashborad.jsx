import { Link } from "react-router-dom";
import { useEffect } from "react";

function ProfDashborad() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', false);
    window.location.href = '/login'; // Redirect to the login page
  };

  useEffect(() => {
    if (localStorage.getItem('role') !== 'prof') {
      window.location.href = '/login';
    }
    if (!localStorage.getItem('token')) {
      window.location.href = '/login'; 
    }
  }, []);

  return (
    <>
      <h1>Prof Dashborad</h1>
      <h4>Bienvenu Pr. {localStorage.getItem('fullName')} !</h4>
      <a onClick={handleLogout}>Logout</a><br></br>
      <Link to="/profquizzes/quizez">
        <button>Voir les réponses</button>
      </Link>
      <br />
      <Link to="/profquizzes/creerQuizz">
        <button>Créer un quizz</button>
      </Link>
      <br />

      {/* Logout button with a direct link */}

    </>
  );
}

export default ProfDashborad;
