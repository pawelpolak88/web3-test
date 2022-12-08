import "./App.css";
import { useState } from "react";
import Web3 from "web3";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const myEthAddress = "0x113007E463ec09335264f7e8a8eD2382233fb533";

  const checkProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("don't check metamask ");
    }

    return provider;
  };

  const connectWallet = async () => {
    try {
      const currentProvider = checkProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setAddress(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
  };

  return (
    <div className="App">
      <header>
        {!isConnected ? (
          <h1>Connect you wallet</h1>
        ) : (
          <h1> Disconnect you wallet</h1>
        )}
      </header>

      <section className="section-content">
        {!isConnected && (
          <div className="btn">
            <button onClick={connectWallet}>Connet metamask</button>
          </div>
        )}

        {isConnected && (
          <div className="connect-section">
            <div className="btn btn-connected">
              <button onClick={disconnectWallet}>Disconnect metamask</button>
            </div>

            <div className="connect-address">
              <span className="info">
                {address === myEthAddress
                  ? `Hello :`
                  : "You're not in the database"}
              </span>
              <span className="address">
                {address === myEthAddress ? address : null}
              </span>
            </div>
            {address === myEthAddress && (
              <div className="connect-address">
                <span className="info">GoerliETH :</span>
                <span className="address">{ethBalance}</span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
