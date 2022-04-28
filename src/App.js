import './App.css';
import React, {useEffect, useState} from 'react'
import { ethers } from "ethers";

function App() {
  const [name, setname] = useState("")
  const [version, setversion] = useState("")
  const [chainId, setchainId] = useState("")
  const [verifyingContract, setverifyingContract] = useState("")

  const [Signer, setSigner] = useState("")
  const [IsListing, setIsListing] = useState("")
  const [Nonce, setNonce] = useState("")
  const [CollectionAddress, setCollectionAddress] = useState("")
  const [TokenID, setTokenID] = useState("")
  const [Price, setPrice] = useState("")
  const [CurrencyAddress, setCurrencyAddress] = useState("")
  const [StartedAt, setStartedAt] = useState("")
  const [ExpiredAt, setExpiredAt] = useState("")
  const [minSellerReceived, setminSellerReceived] = useState("")
  const [signature, setsignature] = useState("")

  const [accounts, setAccounts] = useState(null)
  const [provider, setProvider] = useState(null)
  const [isLoggedIn, setIsloggedIn] = useState(false)

  function submit(e) {
    e.preventDefault()
  }

  async function connect() {
    await provider.send("eth_requestAccounts", [])

    checkLogin()
  }

  async function checkLogin() {
    const _accounts = await provider.listAccounts()
    setAccounts(_accounts)
  }

  useEffect(() => {
    if (provider) {
      checkLogin()
      
    }
  }, [provider]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setIsloggedIn(true)
    }
  }, [accounts])

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    setProvider(provider)
    // const signature = await signer._signTypedData(domain, types, value);
  }, [])

  return (
    <div className="App">
      {
        !isLoggedIn ? <button onClick={() => connect()}>Connect</button> : `logged in as ${accounts[0]}`
      }
      
      <h1>Signer</h1>
      <form>
        <h2>Domain</h2>
        <input type="text" placeholder="name" value={name} onChange={e => setname(e.target.value)} />
        <input type="text" placeholder="version" value={version} onChange={e => setversion(e.target.value)} />
        <input type="text" placeholder="chainId" value={chainId} onChange={e => setchainId(e.target.value)} />
        <input type="text" placeholder="verifyingContract" value={verifyingContract} onChange={e => setverifyingContract(e.target.value)} />

        <h2>Content</h2>
        <input type="text" placeholder="name" value={name} onChange={e => setname(e.target.value)} />
        <input type="text" placeholder="version" value={version} onChange={e => setversion(e.target.value)} />
        <input type="text" placeholder="chainId" value={chainId} onChange={e => setchainId(e.target.value)} />
        <input type="text" placeholder="verifyingContract" value={verifyingContract} onChange={e => setverifyingContract(e.target.value)} />
        <input type="text" placeholder="Signer" value={Signer} onChange={e => setSigner(e.target.value)} />
        <input type="text" placeholder="IsListing" value={IsListing} onChange={e => setIsListing(e.target.value)} />
        <input type="text" placeholder="Nonce" value={Nonce} onChange={e => setNonce(e.target.value)} />
        <input type="text" placeholder="CollectionAddress" value={CollectionAddress} onChange={e => setCollectionAddress(e.target.value)} />
        <input type="text" placeholder="TokenID" value={TokenID} onChange={e => setTokenID(e.target.value)} />
        <input type="text" placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)} />
        <input type="text" placeholder="CurrencyAddress" value={CurrencyAddress} onChange={e => setCurrencyAddress(e.target.value)} />
        <input type="text" placeholder="StartedAt" value={StartedAt} onChange={e => setStartedAt(e.target.value)} />
        <input type="text" placeholder="ExpiredAt" value={ExpiredAt} onChange={e => setExpiredAt(e.target.value)} />
        <input type="text" placeholder="minSellerReceived" value={minSellerReceived} onChange={e => setminSellerReceived(e.target.value)} />
        <input type="text" placeholder="signature" value={signature} onChange={e => setsignature(e.target.value)} />
        <br></br>
        <button type='submit' onClick={e => submit(e)}>Submit</button>
      </form>
    </div>
  );
}

export default App;
