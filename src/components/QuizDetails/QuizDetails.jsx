import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizDetails = () => {
  const { id } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'prof') {
      window.location.href = '/login';
    }
    if (!localStorage.getItem('token')) {
      window.location.href = '/login'; // Redirect to the login page 
    }
  }, []);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/attempts/quiz/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  
        }
        });
        const quizDetails = response.data;
        if (quizDetails.length > 0) {
            setQuizTitle(quizDetails[0].quiz.title);
            setIsReady(true);
          }
        setAttempts(response.data);
        
        
      } catch (error) {
        console.error('Error fetching attempts for quiz', error);
      }
    };

    fetchAttempts();
  }, [id]);

  return (
    <div>
      {isReady ? null : <h2>feetching for attempts...</h2>}
      <h2>{quizTitle}</h2>
      
        {attempts.map((attempt) => (
            <>
            <ul>
          <li key={attempt._id}>
            
            <p>Student: {attempt.student.fullName}</p>
            
            <p>Score: {calculateScore(attempt.answers)}%</p>

          
            
          </li>
          </ul>
          </>
        ))}
     
    </div>
  );
};

export default QuizDetails;



const calculateScore = (answers) => {
  const correctAnswers = answers.filter((answer) => answer.selectedOption.isCorrect);
  return (correctAnswers.length / answers.length) * 100;
};