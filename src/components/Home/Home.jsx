import React from 'react';
import { Link } from 'react-router-dom';



function Home() {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <p>Explore quizzes, create new ones, and track student responses.</p>
      <Link to="/login">Login</Link> | <Link to="/register"> Register</Link>
    </div>
  );
}

export default Home;
