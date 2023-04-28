import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccountDetails } from '../app/blockchainStoreSlice';
import { ethers } from "ethers";
import { Button } from './styled/components';

export default function Connect(){

    const dispatch = useDispatch()

    const connectMetmask = async () => {

        if (typeof window.ethereum === 'undefined') {
            return console.log('MetaMask is not installed!');
        }

        // await window.ethereum.request({
        //     method: "wallet_requestPermissions",
        //     params: [
        //       {
        //         eth_accounts: {}
        //       }
        //     ]
        // });

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const account = (await provider.send("eth_requestAccounts", []))[0];
        const balance = ethers.utils.formatEther((await provider.getBalance(account)));

        dispatch(setAccountDetails({
            address: account,
            balance: balance
        }));
    
    }

    return (
        
        <span>Please connect your metamask account: <Button onClick={connectMetmask}>Connect</Button></span>
  
    );

}