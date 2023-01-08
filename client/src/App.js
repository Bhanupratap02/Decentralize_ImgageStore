
import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from 'ethers';
import { useEffect,useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import Display from "./components/Display/Display"
import Modal from "./components/Modal/Modal";
function App() {
   const [account, setAccount] = useState("");
   const [contract, setContract] = useState(null);
   const [provider, setProvider] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
  const [access, setAccess] = useState([]);
   useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if(provider){
    window.ethereum.on("chainChanged",()=>{
      window.location.reload();
    })
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })
      await provider.send("eth_requestAccounts",[]);
        const signer =   provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x81695645B52DFe734B33554359FbF961F3cCdDFb";
        const contract = new ethers.Contract(contractAddress,Upload.abi,signer);
        setContract(contract);
        setProvider(provider);
      } else{
        console.log("MetaMask is not installed");
      }
    }
    provider && loadProvider();
   }, []);
  const accessList = async () => {
    try {
      setAccess([]);
      const addressList = await contract.shareAccess();
      addressList.map((item, i) => {
        if (item.access === true) {
          // console.log(item.user);
          setAccess(prev => [...prev, item]);

        }

      });
    } catch (error) {
      console.log(error.message);
    }
    


  }
  return (
    <>
    {!modalOpen && (<button className='share' 
    onClick={()=>{
      setModalOpen(true)
      contract && accessList()
    }}>share</button>)}
      {modalOpen && (<Modal contract={contract} setModalOpen={setModalOpen} access={access} accessList={accessList} />) }
     
      <div className="App">
        <h1 style={{ color: "white" }}>Decentralize Image Storage System</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <p style={{ color: "white" }}>Account : {account ? account : "Not connected"}</p>

        <FileUpload account={account} provider={provider} contract={contract} />
        <Display account={account} contract={contract} />
      </div>
    </>
  
  );
}

export default App;
