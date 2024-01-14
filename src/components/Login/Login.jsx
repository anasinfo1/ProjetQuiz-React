import { useState } from "react"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginHnadller= async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/users/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username,password})
            });
            const data = await response.json();
            if(data.success === true){
                alert('Login Successful');
            }else{
                setError(data.message);
            }
        }catch(err){console.log(err);}

    }

  return (
    <>
        <form onSubmit={loginHnadller}>
            <input type="text" placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br></br>
            <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} /><br></br>
            <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p> }
    </>
  )
}

export default Login