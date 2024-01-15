
import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: [{ text: '', isCorrect: false }] }]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ text: '', isCorrect: false }] }]);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleQuizSubmit = async () => {
    try {
      const response = await axios.post('https://ton-api.com/quizzes', {
        title: quizTitle,
        questions,
      });

      console.log('Quiz ajouté avec succès :', response.data);
      // Redirige l'utilisateur ou effectue d'autres actions après l'ajout du quiz
    } catch (error) {
      console.error('Erreur lors de l\'ajout du quiz :', error);
    }
  };

  return (
    <div>
      <h2>Créer un nouveau quiz</h2>
      <label>
        Titre du quiz:
        <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
      </label>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            Question:
            <input
              type="text"
              value={question.text}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[questionIndex].text = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
          </label>

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                Option:
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[questionIndex].options[optionIndex].text = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />
              </label>
              <label>
                Correcte:
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={() => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[questionIndex].options[optionIndex].isCorrect = !option.isCorrect;
                    setQuestions(updatedQuestions);
                  }}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={() => addOption(questionIndex)}>
            Ajouter une option
          </button>
        </div>
      ))}

      <button type="button" onClick={addQuestion}>
        Ajouter une question
      </button>

      <button type="button" onClick={handleQuizSubmit}>
        Enregistrer le quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
