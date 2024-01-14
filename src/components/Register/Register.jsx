

function Register() {
  return (
    <>
    <form>
      <input type="text" placeholder="Enter your name" /><br></br>
      <input type="email" placeholder="Enter your email" /><br></br>
      <input type="password" placeholder="Enter your password" /><br></br>
      <select>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select><br></br>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="/login">Login</a></p>

    </>
  )
}

export default Register