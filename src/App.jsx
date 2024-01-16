import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProfDashborad from './components/ProfDashborad/ProfDashborad';
import StudentDashbord from './components/StudentDashbord/StudentDashbord';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import QuizPage from './components/QuizPage/Quizz';
import QuizDetails from './components/QuizDetails/QuizDetails';
import QuizesList from './QuizesList/QuizesList';
import Home from './components/Home/Home';

function App() {


  const showAuthLinks = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      return null; 
    }

    return (
      <>
        <Link to="/login">Login</Link> | <Link to="/register"> Register</Link>
      </>
    );
  };

  return (
    <>
      {showAuthLinks()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profquizzes" element={<ProfDashborad />} />
        <Route path="/profquizzes/creerQuizz" element={<CreateQuiz />} />
        <Route path="/studentquizzes" element={<StudentDashbord />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/profquizzes/quizez/:id" element={<QuizDetails />} />
        <Route path="/profquizzes/quizez" element={<QuizesList />} />
      </Routes>
    </>
  );
}

export default App;
