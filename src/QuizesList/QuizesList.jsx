import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './QuizesList.css';

const QuizesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('role') !== 'prof') {
      window.location.href = '/login'; // Redirect to the login page
    }
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quizzes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:3000/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // After successful deletion, update the state to reflect the changes
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Erreur lors de la suppression du quiz', error);
    }
  };

  const handleViewAttempts = (quizId) => {
    // Navigate to the attempts page for the selected quiz
    navigate(`/profquizzes/quizez/${quizId}`);
  };

  return (
    <div>
      <h2>Liste des Quiz</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className='quizlist'>
            <p>{quiz.title}</p>
            <button onClick={() => handleDeleteQuiz(quiz._id)}>Supprimer</button>
            <button onClick={() => handleViewAttempts(quiz._id)}>Voir les tentatives</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizesList;
