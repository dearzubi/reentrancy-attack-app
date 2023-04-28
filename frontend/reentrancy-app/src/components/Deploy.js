import React from 'react';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './styled/components';
import { setAccountDetails, setContractDetails, setAttackDetails } from '../app/blockchainStoreSlice';
import Bank from '../artifacts/contracts/Bank.sol/Bank.json';
import Attacker from '../artifacts/contracts/Attacker.sol/Attacker.json';


export default function Deploy(){

    const account = useSelector((state) => state.blockchainStore.address);
    const bankAddress = useSelector((state) => state.blockchainStore.bankAddress);
    const attackerAddress = useSelector((state) => state.blockchainStore.attackerAddress);

    const dispatch = useDispatch()

    const deployContracts = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const bankFactory = new ethers.ContractFactory(Bank.abi, Bank.bytecode, signer);
        const attackerFactory = new ethers.ContractFactory(Attacker.abi, Attacker.bytecode, signer);
        const initBankHoldings = ethers.utils.parseEther("50");
        const bank = await bankFactory.deploy({value: initBankHoldings});
        const attacker = await attackerFactory.deploy(bank.address);

        await bank.deployed();
        await attacker.deployed();

        dispatch(setContractDetails({
            bankAddress: bank.address,
            attackerAddress: attacker.address,
            bankBalance: ethers.utils.formatEther((await provider.getBalance(bank.address)).toString()),
            attackerBalance: ethers.utils.formatEther((await provider.getBalance(attacker.address)).toString())
        }));

        dispatch(setAccountDetails({
            balance: ethers.utils.formatEther((await provider.getBalance(account)))
        }));

        dispatch(setAttackDetails({
            numberOfAttackRuns: (await attacker.maxDepth()).toString(),
        }));

    }

    return (

        <div className="account-details">
            <h2>Deploy Contracts</h2>
            <Button onClick={deployContracts}>Deploy Contracts</Button>
            <p> Bank Address: <span>{bankAddress}</span> </p>
            <p> Attacker Address: <span>{attackerAddress}</span></p>
        </div>

    );

}