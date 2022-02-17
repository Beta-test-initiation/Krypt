import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

//function to fetch our ethereum contract

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children}) => {

    const [connectedAccount, setConnectedAccount] = useState("");
    const [formData, setFormData] = useState({addressTo:'', amount: '', keyword:'', message:''});
    const [loading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState("")
    const handleChange = (e, name) => (
        //
        setFormData((prevState)=> ({...prevState, [name]: e.target.value}))
    );

    const getAllTransactions = async() => {
        try{
            if (!ethereum) return alert("Please install MetaMask.");

            const transactionContract = getEthereumContract();

            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction)=> ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex)/(10**18)

            }))
            setTransactions(structuredTransactions);
            console.log(structuredTransactions);
        }catch(error){
            console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if(accounts.length){
                setConnectedAccount(accounts[0]);

                //getAllTransactions();
                getAllTransactions();
            }else{
                console.log("no accounts found")
            }

            console.log(accounts);

           
            } catch (error) {
                console.log(error);
            }

    }

    const checkIfTransactionsExist = async() => {
        try{
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            
            window.localStorage.setItem("transactionCount", transactionCount)

        }catch(error){
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async() => {
        try{
            if (!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setConnectedAccount(accounts[0]);

        }catch(error){
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    const sendTransaction = async() => {
        try {
            if (!ethereum) return alert("Please install MetaMask");

            //get data from the form
            const { addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                    }],
                });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setLoading(true);
            console.log(`Loading + ${transactionHash}`)
            await transactionHash.wait();
            setLoading(false);
            console.log(Success);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber)

        } catch(error){
            throw new Error("No ethereum object")
        }
    }

    useEffect(()=> {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [transactionCount]);

    return (
        <TransactionContext.Provider value = {{connectWallet, loading, transactions, sendTransaction, connectedAccount, formData, handleChange}}>
        {children}
        </TransactionContext.Provider>
    )
}
