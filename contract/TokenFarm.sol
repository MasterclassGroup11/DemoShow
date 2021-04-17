pragma solidity ^0.7.0;


import "./FluidToken.sol";
import "./FlowToken.sol";

contract TokenFarm {
    string public name = "Fluid Flow";
    FluidToken public _fluidToken;
    FlowToken public _flowToken;
    address public owner;

    mapping(address=>uint) public stakingBalance;
    mapping(address=>bool) public hasStaked;
    mapping(address=>bool) public isStaking;
    mapping(uint256=>track) public history;
    address[] public staker;
    uint256 public transactionId = 0;


    struct track {
        address  _address;
        uint256 _amount;
        string _type;
        uint256 _date;
    }

    constructor (FluidToken fluidToken, FlowToken flowToken) public{
        _fluidToken = fluidToken;
        _flowToken = flowToken;
        owner = msg.sender; // address of the owner of the contract
    }

    //the amount of the fluid to be staked.
    function stakeToken(uint _amount) public {

        // check, amount should be greater than zero. There should be some tokens to be staked.
        require(_amount>0,"amount need to be more than 0");

        // this refers to the instance of the contract where the call is made (you can have multiple instances of the same contract).
        // address(this) refers to the address of the instance of the contract where the call is being made.
        // msg. sender refers to the address where the contract is being called from.
        // @param _amount, the amount of tokens you want to stake .
        _fluidToken.transferFrom(msg.sender, address(this), _amount);

        // The balance of the owner of the contract, after staking the coins.
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]){
            staker.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
       setHistory("stake = ",_amount);
    }

    //require checks if the condition is true, thows the exceptionotherwise 'trader is not owner'.
    //if the require condition is true, then all the tokens that are staked, are unstaked .
    function unstakeToken() public {
        require(isStaking[msg.sender] == true,"You have nothing to unstake.");
        uint balance = stakingBalance[msg.sender];
        stakingBalance[msg.sender] = 0;
        _fluidToken.transfer(msg.sender,balance);
        isStaking[msg.sender] = false;
         setHistory("unstake = ",balance);
    }

    //@param _owner is the address of the owner which is msg.sender
    // returns the staking balance
    function stakeAmount(address _owner) public view returns(uint) {
        return stakingBalance[_owner];
    }

    function issusToken() public {
        require(msg.sender==owner,"trader is not owner");
        for(uint i=0; i<staker.length;i++){
            address recipient = staker[i];
            if(isStaking[recipient] == true){
                uint balance = stakingBalance[recipient];
                _flowToken.transfer(recipient, balance);
                 setHistory("issuedToken = ",balance);
            }
        }
    }

    // Tracking transaction history
     function setHistory(string memory _type, uint256 _amount) internal returns(bool success) {
         history[transactionId] = track(msg.sender,_amount,_type,block.timestamp);
        transactionId++;
        return success;
    }
}
