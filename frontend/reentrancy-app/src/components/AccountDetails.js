import React from 'react';
import { useSelector } from 'react-redux';


export default function AccountDetails(){

    const address = useSelector((state) => state.blockchainStore.address);
    const balance = useSelector((state) => state.blockchainStore.balance);

    return (

        <div className="account-details">
            <h2>Account Details</h2>
            <p> You're connected to: <span>{address}</span> </p>
            <p> Your balance: <span>{balance}</span> ETH </p>
        </div>

    );

}