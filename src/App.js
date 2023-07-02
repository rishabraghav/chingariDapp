import Web3 from 'web3';
import contractAbi from "./Contracts/AbiOfAuth";
import './App.css';
import { useState } from 'react';
import Home from './Components/Home';

 function App() {
  const [isLoggenIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const CONTRACT_ADDRESS="0x51E46AB4e9BBb73468a9d39b2898FB0e252BA8C1";

  // const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/952c7c012fb2403a886390401335f343'));
  const web3 = new Web3(window.ethereum);  


  const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

  window.ethereum.on('accountsChanged', (accounts) => {
    // Handle account change event
    console.log('Current account:', accounts[0]);
  });
  


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const { username, password } = event.target.elements;
    const action = event.nativeEvent.submitter.innerText.toLowerCase(); // Get the text of the button clicked

    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      // Handle case when MetaMask is not available
      console.error('MetaMask is not installed');
      return;
    }

    let transactionReceipt;

    try {
      // const accounts = await web3.eth.getAccounts();
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const sender = accounts[0];
      setLoading(true);
      console.log("account: ", accounts, "sender: ", sender)
  
      if (action === 'login') {
        transactionReceipt = await contract.methods.loginUser(username.value, password.value).send({ from: sender });
        // Handle login success
        console.log("recived:", transactionReceipt);
        setIsLoggedIn(true);
        
      } else if (action === 'register') {
        transactionReceipt = await contract.methods.registerUser(username.value, password.value).send({ from: sender });
        // Handle registration success
        console.log("recived:", transactionReceipt);
        
      }
      const events = await contract.getPastEvents('UserLoggedIn', {
        filter: { user: sender }, // Filter events based on the indexed parameter
        fromBlock: transactionReceipt.blockNumber,
        toBlock: transactionReceipt.blockNumber,
      });

      console.log(events);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='home'>
      {!isLoggenIn ? <div className="App flexbox height">
      <form onSubmit={handleFormSubmit} typeof='submit' className='flexbox column'>
        <input className='margin' style={{height:"20px"}} name='username' placeholder='username'/>
        <input type="password" className='margin' style={{height:"20px"}} name="password" placeholder='password'/>
        <div className='buttons margin'>
          {loading? <h3>Loading...</h3> : <div><button className='margin' style={{height:"30px", width:"80px"}}>Login</button>
          <button className='margin' style={{height:"30px", width:"80px"}} >Register</button></div>}
        </div>
      </form>
    </div> : <Home />}
    </div>
  );
}

export default App;
