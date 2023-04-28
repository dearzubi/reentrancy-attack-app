// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Bank {

    mapping(address => uint) public balances;

    constructor() payable {
        balances[msg.sender] = msg.value;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    //Safe withdraw function without reentrancy vulnerability
    function withdraw(uint amount) external {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    //Unsafe withdraw function with reentrancy vulnerability
    function withdrawAll() external {

        require(balances[msg.sender] >= 0, "You have no funds");
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed to send Ether");
        balances[msg.sender] = 0;
       
    }
}