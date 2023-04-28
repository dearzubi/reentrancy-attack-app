import React, {useRef} from 'react';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from './styled/components';
import { setAccountDetails, setContractDetails, setAttackDetails } from '../app/blockchainStoreSlice';
import Attacker from '../artifacts/contracts/Attacker.sol/Attacker.json';

export default function Attack(){

    const dispatch = useDispatch();

    const account = useSelector((state) => state.blockchainStore.address);

    const attackerAddress = useSelector((state) => state.blockchainStore.attackerAddress);
    const bankAddress = useSelector((state) => state.blockchainStore.bankAddress);

    const bankBalance = useSelector((state) => state.blockchainStore.bankBalance);
    const attackerBalance = useSelector((state) => state.blockchainStore.attackerBalance);

    const numberOfAttackRuns = useSelector((state) => state.blockchainStore.numberOfAttackRuns);

    const inputRef = useRef();

    const updateNumberOfAttackRuns = async () => {

     
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const attacker = new ethers.Contract(attackerAddress, Attacker.abi, signer);

        const tx = await attacker.setMaxDepth(inputRef.current.value);
        await tx.wait();

        dispatch(setAttackDetails({
            numberOfAttackRuns: (await attacker.maxDepth()).toString(),
        }));

        dispatch(setAccountDetails({
            balance: ethers.utils.formatEther((await provider.getBalance(account)))
        }));

    }

    const performAttack = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const attacker = new ethers.Contract(attackerAddress, Attacker.abi, signer);

        const tx = await attacker.attack({value: ethers.utils.parseEther("1")});
        await tx.wait();

        dispatch(setContractDetails({
            bankBalance: ethers.utils.formatEther((await provider.getBalance(bankAddress)).toString()),
            attackerBalance: ethers.utils.formatEther((await provider.getBalance(attackerAddress)).toString())
        }));

        dispatch(setAccountDetails({
            balance: ethers.utils.formatEther((await provider.getBalance(account)))
        }));

    }


    return (

        <div className="attack">

            <h2>Attack</h2>

            <p>Bank balance: <span>{bankBalance}</span> ETH</p>  
            <p>Attacker balance: <span>{attackerBalance}</span> ETH</p>
            
            <span style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                Number of times the attack will run:
                <Input defaultValue={numberOfAttackRuns} key={numberOfAttackRuns} ref={inputRef} /> 
                <Button onClick={updateNumberOfAttackRuns}>Update</Button>
                <span style={{flexBasis: '100%', height: '0px'}}></span>
                <Button onClick={performAttack}>Attack</Button>
            </span>


        </div>

    );

}