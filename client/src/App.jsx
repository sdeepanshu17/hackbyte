import { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import abi from "./contracts/expense.json"
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
// import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------


export default function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xa7C863a55c0A9D6589654065e2dB71177fBB7eE6"
      const contractAbi = abi.abi
      console.log(contractAbi)
      try{

        const {ethereum}= window
        if(ethereum)
        {
            const accounts= await ethereum.request({method: 'eth_requestAccounts',})
        }
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        setState({provider, signer, contract}) 
      } 
      catch (error) {
        console.log(error)
      }
    };
    connectWallet();
  }, []);

  console.log(state);
  return (
    <ThemeProvider>
      <ScrollToTop />
      {/* <StyledChart /> */}
      <Router />
    </ThemeProvider>
  );
}
