
import './App.css';

function App() {
  return (
    <div className="App flexbox height">
      <form typeof='submit' className='flexbox column'>
        <input className='margin' style={{height:"20px"}} name='username' placeholder='username'/>
        <input className='margin' style={{height:"20px"}} name="password" placeholder='password'/>
        <div className='buttons margin'>
          <button className='margin' style={{height:"30px", width:"80px"}}>Login</button>
          <button className='margin' style={{height:"30px", width:"80px"}} >Register</button>
        </div>
      </form>
    </div>
  );
}

export default App;
