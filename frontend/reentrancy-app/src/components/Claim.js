import React, {useState} from 'react';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from './styled/components';
import { setAccountDetails, setContractDetails } from '../app/blockchainStoreSlice';
import Attacker from '../artifacts/contracts/Attacker.sol/Attacker.json';

export default function Claim(){

    const [claimDetails, setClaimDetails] = useState({
        receiverAddress: '',
        claimAmount: ''
    });

    const dispatch = useDispatch();

    const account = useSelector((state) => state.blockchainStore.address);

    let receiverAddress = claimDetails.receiverAddress;

    const attackerAddress = useSelector((state) => state.blockchainStore.attackerAddress);


    const claimFunds = async () => {


        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const attacker = new ethers.Contract(attackerAddress, Attacker.abi, signer);

        const totalAttackerBalance = ethers.utils.formatEther((await provider.getBalance(attackerAddress)).toString());

        const tx = await attacker.claim(receiverAddress);
        await tx.wait();

        dispatch(setContractDetails({
            attackerBalance: ethers.utils.formatEther((await provider.getBalance(attackerAddress)).toString())
        }));

        dispatch(setAccountDetails({
            balance: ethers.utils.formatEther((await provider.getBalance(account)))
        }));

        setClaimDetails({
            receiverAddress: receiverAddress,
            claimAmount: totalAttackerBalance
        })

    }

    return (

        <div className="claim">

            <h2>Claim Funds</h2>

            <span style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <span>Enter a valid Ethereum Address:</span>
                <Input width={'200px'} onChange={e => receiverAddress = e.target.value} /> 
                <Button onClick={claimFunds}>Claim</Button>
                <span style={{flexBasis: '100%', height: '0px'}}></span>
                {
                    claimDetails.claimAmount !== '' ? <p> {claimDetails.claimAmount} ETH sent to {claimDetails.receiverAddress} </p> : null
                }
                
            </span> 

        </div>
    )

}