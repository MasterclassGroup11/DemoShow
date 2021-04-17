pragma solidity ^0.7.0;

import "../DemoShow-features-native-contract/FluidToken.sol";

//contract to regulate Flow with maximum of 30 million supply
contract FlowToken {
    //basic token properties
    string public constant  name = "Flow Token";
    string public constant  symbol = "Flow";
    uint8 public constant decimals = 18;
    uint256 public _totalSupply; // 30M * 1e18

    //Flow balance on addresses
    mapping(address => uint256) public balances;
    //amount allowed by msg.sender to _spender
    mapping(address => mapping(address => uint256)) public allowed;

    //transfer event between addresses i.e _transferFrom to _transferTo
    event Transfer(
        address indexed _transferFrom,
        address indexed _transferTo,
        uint256 _value
    );

    //approval event from msg.sender
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor() public {
      _totalSupply = 1000000 * (10 ** decimals);
      balances[msg.sender] = _totalSupply;
    }

    //retrieves Flow total supply
    function totalSupply() public returns (uint256) {
    return _totalSupply;
    }

    //transfer _value from msg.sender to  _transferTo
    function transfer(address _transferTo, uint256 _value) public returns (bool success) {
     require(balances[msg.sender] >= _value);
     balances[msg.sender] -= _value;
     balances[_transferTo] += _value;
     emit Transfer(msg.sender, _transferTo, _value);
     return true;
    }

    //allow _spender to be able to use _value of Flow from your account
    function approve(address _spender, uint256 _value) public returns (bool) {
        require(_spender !=address(0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //allow spender to transfer Flow out from the grant account
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);
    balances[_from] -= _value;
    balances[_to] += _value;
    allowed[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
}

    function allowance(address _owner, address _spender) public view returns (uint256) {
      return allowed[_owner][_spender];
    }
}
