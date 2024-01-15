import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attempt = ({ match }) => {
  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const response = await axios.get(`https://ton-api.com/attempts/${match.params.attemptId}`);
        setAttempt(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la tentative', error);
      }
    };

    fetchAttempt();
  }, [match.params.attemptId]);

  if (!attempt) {
    return <p>Chargement de la tentative...</p>;
  }

  return (
    <div>
      <h2>Réponses de l'étudiant</h2>
      <p>Étudiant : {attempt.student.fullName}</p>
      <p>Quiz : {attempt.quiz.title}</p>

      <h3>Réponses :</h3>
      <ul>
        {attempt.answers.map((answer) => (
          <li key={answer._id}>
            <p>Question : {answer.question.text}</p>
            <p>Réponse sélectionnée : {answer.selectedOption.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attempt;
