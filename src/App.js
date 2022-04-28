import "./App.css";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [name, setname] = useState("");
  const [version, setversion] = useState("");
  const [chainId, setchainId] = useState("");
  const [verifyingContract, setverifyingContract] = useState("");

  const [Signer, setSigner] = useState("");
  const [IsListing, setIsListing] = useState("");
  const [Nonce, setNonce] = useState("");
  const [CollectionAddress, setCollectionAddress] = useState("");
  const [TokenID, setTokenID] = useState("");
  const [Amount, setAmount] = useState("");
  const [priceDecimal, setPriceDecimal] = useState(18);
  const [Price, setPrice] = useState("");
  const [CurrencyAddress, setCurrencyAddress] = useState("");
  const [StartedAt, setStartedAt] = useState("");
  const [ExpiredAt, setExpiredAt] = useState("");
  const [minSellerReceived, setminSellerReceived] = useState("");
  const [params, setparams] = useState("");

  const [accounts, setAccounts] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const [output, setOutput] = useState("");
  const [outputTuple, setOutputTuple] = useState({});

  const stringToBoolean = (string) =>
    string === "false" ||
    string === "undefined" ||
    string === "null" ||
    string === "0"
      ? false
      : !!string;

  async function signData() {
    const domain = {
      name,
      version,
      chainId: parseInt(chainId),
      verifyingContract,
    };

    const types = {
      Primary: [
        { name: "Signer", type: "address" },
        { name: "IsListing", type: "bool" },
        { name: "Nonce", type: "uint" },
        { name: "CollectionAddress", type: "address" },
        { name: "TokenID", type: "uint256" },
        { name: "Amount", type: "uint256" },
        { name: "Price", type: "uint256" },
        { name: "CurrencyAddress", type: "address" },
        { name: "StartedAt", type: "uint256" },
        { name: "ExpiredAt", type: "uint256" },
        { name: "minSellerReceived", type: "uint" },
        { name: "params", type: "string" },
      ],
    };

    const value = {
      Signer,
      IsListing: stringToBoolean(IsListing),
      Nonce: parseInt(Nonce),
      CollectionAddress,
      TokenID: parseInt(TokenID),
      Amount: parseInt(Amount),
      Price: ethers.utils.parseUnits(Price, priceDecimal),
      CurrencyAddress:
        CurrencyAddress === "0x0"
          ? "0x0000000000000000000000000000000000000000"
          : CurrencyAddress,
      StartedAt: parseInt(StartedAt),
      ExpiredAt: parseInt(ExpiredAt),
      minSellerReceived: parseInt(minSellerReceived),
      params: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(params)),
    };

    const signer = await provider.getSigner();

    const outputSignature = await signer._signTypedData(domain, types, value);

    setOutput(outputSignature);
    setOutputTuple({ ...value, chainId: parseInt(chainId), params });
  }

  async function submit(e) {
    e.preventDefault();

    await signData();
  }

  async function connect() {
    await provider.send("eth_requestAccounts", []);

    checkLogin();
  }

  async function checkLogin() {
    const _accounts = await provider.listAccounts();
    setAccounts(_accounts);
  }

  async function setChain() {
    const net = await provider.getNetwork();
    setchainId(net.chainId);
  }

  useEffect(() => {
    if (provider) {
      checkLogin();
      setChain();
    }
  }, [provider]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setIsloggedIn(true);
    }
  }, [accounts]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setProvider(provider);
  }, []);

  return (
    <div className="App">
      {!isLoggedIn ? (
        <button onClick={() => connect()}>Connect</button>
      ) : (
        <h2>{`logged in as ${accounts[0]}`}</h2>
      )}

      <h1>Signer</h1>
      <form>
        <h2>Domain</h2>
        <input
          type="text"
          placeholder="name (string)"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          placeholder="version (string)"
          value={version}
          onChange={(e) => setversion(e.target.value)}
        />
        <input
          type="text"
          placeholder="chainId (must be the same as current net)"
          value={chainId}
          onChange={(e) => setchainId(e.target.value)}
        />
        <input
          type="text"
          placeholder="verifyingContract (address, like 0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC)"
          value={verifyingContract}
          onChange={(e) => setverifyingContract(e.target.value)}
        />

        <h2>Content</h2>
        <input
          type="text"
          placeholder="Signer (address, like 0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC)"
          value={Signer}
          onChange={(e) => setSigner(e.target.value)}
        />
        <input
          type="text"
          placeholder="IsListing (bool)"
          value={IsListing}
          onChange={(e) => setIsListing(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nonce (uint)"
          value={Nonce}
          onChange={(e) => setNonce(e.target.value)}
        />
        <input
          type="text"
          placeholder="CollectionAddress (address, like 0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC)"
          value={CollectionAddress}
          onChange={(e) => setCollectionAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="TokenID (uint256)"
          value={TokenID}
          onChange={(e) => setTokenID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount (uint256)"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="price decimal (OPTIONAL)"
          value={priceDecimal}
          onChange={(e) => setPriceDecimal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price (uint256)"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="CurrencyAddress (address, like 0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC)"
          value={CurrencyAddress}
          onChange={(e) => setCurrencyAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="StartedAt (uint256)"
          value={StartedAt}
          onChange={(e) => setStartedAt(e.target.value)}
        />
        <input
          type="text"
          placeholder="ExpiredAt (uint256)"
          value={ExpiredAt}
          onChange={(e) => setExpiredAt(e.target.value)}
        />
        <input
          type="text"
          placeholder="minSellerReceived (uint)"
          value={minSellerReceived}
          onChange={(e) => setminSellerReceived(e.target.value)}
        />
        <input
          type="text"
          placeholder="params (string)"
          value={params}
          onChange={(e) => setparams(e.target.value)}
        />
        <br></br>
        <button type="submit" onClick={(e) => submit(e)}>
          Submit
        </button>
      </form>
      <h2>OUTPUT SIGNATURE: {output}</h2>
      <h2>Tuple:</h2>
      <pre>{JSON.stringify(outputTuple)}</pre>
    </div>
  );
}

export default App;
