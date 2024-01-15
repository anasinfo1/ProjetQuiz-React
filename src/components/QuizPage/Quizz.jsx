import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = ({ match }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${match.params.quizId}`);
        setQuiz(response.data);
        initializeSelectedAnswers(response.data.questions);
      } catch (error) {
        console.error('Erreur lors de la récupération du quiz', error);
      }
    };

    fetchQuiz();
  }, [match.params.quizId]);

  const initializeSelectedAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question._id] = null;
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleRadioChange = (questionId, optionId) => {
    const updatedAnswers = { ...selectedAnswers };
    updatedAnswers[questionId] = optionId;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const answersArray = Object.entries(selectedAnswers).map(([questionId, selectedOptionId]) => ({
        question: questionId,
        selectedOption: selectedOptionId,
      }));

      // Envoyer les réponses à l'API
      const response = await axios.post(`http://localhost:3000/${match.params.quizId}/submit`, {
        answers: answersArray,
      });

      console.log('Réponses soumises avec succès:', response.data);

      // Réinitialiser les réponses sélectionnées après la soumission
      initializeSelectedAnswers(quiz.questions);
    } catch (error) {
      console.error('Erreur lors de la soumission des réponses', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!quiz) {
    return <p>Chargement du quiz...</p>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((question) => (
        <div key={question._id}>
          <p>{question.text}</p>
          {question.options.map((option) => (
            <div key={option._id}>
              <label>
                <input
                  type="radio"
                  name={`question_${question._id}`}
                  checked={selectedAnswers[question._id] === option._id}
                  onChange={() => handleRadioChange(question._id, option._id)}
                />
                {option.text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} disabled={submitting}>
        Soumettre les réponses
      </button>
    </div>
  );
};

export default QuizPage;
