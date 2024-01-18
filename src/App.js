import React, { useState } from "react";
import { ethers } from "ethers";

const SimpleStorage = () => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [signer, setSigner] = useState(null);
  const connectWalletHandler = async () => {
    const windowProvider = window.ethereum;
    if (windowProvider) {
      try {
        // web3 v1

        //       const web3 = new Web3(window.lukso);
        //       setprov(web3);
        //   // Request access to the user's MetaMask account (ethereum.enable() is deprecated)
        //   // Note: Even though, you can also get the accounts from `await web3.eth.getAccounts()`,
        //   // 	you still need to make a call to any MetaMask RPC to cause MetaMask to ask for concent.
        //   const accounts = await window.lukso.request({
        //     method: 'eth_requestAccounts',
        //   });

        //       // instantiate Web3 with the injected provider

        //       signer = accounts[0];
        //       console.log(account);
        //       console.log(signer);

        //        const transactionReceipt = await web3.eth.sendTransaction({
        //       from: signer,
        //       to: "0x0000000000000000000000000000000000000000", // sending a self-transaction
        //       value: 0,
        //        });

        //       console.log(transactionReceipt);

        // setAccount(account);
        // setSigner(signer);

        // ethers v6

        const provider = new ethers.BrowserProvider(windowProvider);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const account = await (await signer).address;
        console.log(account);
        console.log(signer);
        setAccount(account);
        setSigner(signer);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      console.log("LUKSO wallet not found.");
      setErrorMessage("Please install LUKSO wallet extension to interact");
    }
  };

  const sendTransaction = async () => {
    if (!signer) {
      console.log("Wallet not connected.");
      return;
    }

    try {
      // Placeholder for the transaction details
      const tx = await signer.sendTransaction({
        to: ethers.ZeroAddress, // recipient address
        value: 0n,
        data: "0xaabbccdd", // amount in ETH,
      });

      console.log(tx);
      const receipt = await tx.wait();

      console.log(receipt);
      console.log(JSON.stringify(tx, undefined, 4));
      // Handle the transaction result here
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>Connect to LUKSO Wallet</button>
      <button onClick={sendTransaction} disabled={!account}>
        Send Transaction
      </button>
      {account && <p>Connected Account: {account}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default SimpleStorage;
