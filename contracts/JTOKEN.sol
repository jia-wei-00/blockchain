// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract JTOKEN is ERC20, Ownable {
    address burn = 0x000000000000000000000000000000000000dEaD;
    address admin = 0xeb24E827C4B11F16900c37364210fD7f5c522555;
    string HashKey;
    bytes32 hashValue;

    constructor() ERC20("JTOKEN", "JTOKEN") {
        _mint(msg.sender, 100 * 10 ** 18);
        HashKey = "1111";
    }

    function sendEtherToUser( address payable recipient, uint256 amount, bytes32 encryptHashValue) external {
        string memory hashed = Strings.toString(amount);
        hashValue = keccak256(abi.encodePacked(hashed, HashKey));
        bool checkHash = getHashValue(encryptHashValue);   
        require(checkHash == true, "Invalid Transfer Hash");
        payable(recipient).transfer(amount);
    }

    function setHashKey(string memory hash) public onlyOwner {
        HashKey = hash;
    }

    function getHashKey() public onlyOwner view returns (string memory) {
        return HashKey;
    }

    function buyToken(uint256 getAmount, uint256 payAmount, bytes32 encryptHashValue) public payable {
        sendEther(payable(address(this)), getAmount, payAmount, encryptHashValue);
        _mint(msg.sender, payAmount);
    }

    function JTokenFaucet (uint256 amount, bytes32 encryptHashValue) public {
        string memory hashed = Strings.toString(amount);
        hashValue = keccak256(abi.encodePacked(hashed, HashKey));
        bool checkHash = getHashValue(encryptHashValue);   
        require(checkHash == true, "Invalid Transfer Hash");
        _mint(msg.sender, amount);
    }

    function sendEther(address payable _to, uint256 getAmount, uint256 payAmount, bytes32 encryptHashValue) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        setHash(getAmount, payAmount);
        bool checkHash = getHashValue(encryptHashValue);    
        require(checkHash == true, "Invalid Transfer Hash");
        (bool sent, ) = _to.call{value:msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function setHash(uint getAmount, uint payAmount) private {
        string memory hash1 = Strings.toString(getAmount);
        string memory hash2 = Strings.toString(payAmount);
        hashValue = keccak256(abi.encodePacked(hash1, hash2, HashKey));
    }

    function getHashValue(bytes32 checkHashValue) private view returns (bool) {
        return checkHashValue == hashValue;
    }
}