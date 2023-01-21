pragma solidity >=0.5.0 <0.9.0;

contract expense {
    struct Exp {
        uint256 amount;
        address sender;
        address payable receiver;
    }


uint256 num1;
address owner;
constructor() public{
    owner = msg.sender;
}

Exp[] expenses;


function sendBal(address payable receiver) public payable  {
    uint256 amount = msg.value;
    receiver.transfer(amount);  
    expenses.push(Exp(amount, msg.sender, receiver));
}

function getExpenses() public view returns (Exp[] memory) {
    return expenses;
}
}