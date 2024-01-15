import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashbord = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/quizzes`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des quiz');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz', error);
        setError('Erreur lors de la récupération des quiz');
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      {error && <p>{error}</p>}
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashbord;
