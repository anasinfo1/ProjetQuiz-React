
import { useState } from "react"
function Register() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [error, setError] = useState("");
    

    const handleRegister =async(e) => {
        e.preventDefault();
        try{
            const response= await fetch('http://localhost:3000/users/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({fullName:name,username,password,role})
            });
            const data = await response.json();
            if(data.success === true){
                alert('Register Successful');
                window.location.href='/login';
            }else{
                setError(data.message);
            }
        }catch(err){console.log(err);}
    }
    

     
  return (
    <>
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br></br>
      <input type="username" placeholder="Enter your username" value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br></br>
      <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br></br>
      <select onChange={(e) => { setRole(e.target.value) }} required="true">
        <option value="">Select a role</option>
        <option value="student">Student</option>
        <option value="prof">Professor</option>
      </select><br></br>
      <button type="submit">Register</button>
    </form>
    {error && <p>{error}</p> }
    <p>Already have an account? <a href="/login">Login</a></p>

    </>
  )
}

export default Register