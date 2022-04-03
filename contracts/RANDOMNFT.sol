// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./JTOKEN.sol";

contract RANDOMNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address JTokenAddress;
    address admin = 0xeb24E827C4B11F16900c37364210fD7f5c522555;
    string HashKey;
    bytes32 hashValue;
    uint rarity = 0;

    struct NFTS {
        uint nftid;
        uint rarity;
        string tokenURI;
        uint256 createdtime;
        address owner;
        bool selling;
    }

    mapping(uint256 => NFTS) private _tokenDetails;

    constructor(address tokenAddress) ERC721("NFT", "NFT") {
        JTokenAddress = tokenAddress;
        HashKey = "1111";
    }

    function mintNFT(uint price, bytes32 encryptHashValue) public {
        setHash(price);
        bool checkHash = getHashValue(encryptHashValue);    
        require(checkHash == true, "Invalid Transfer Hash");
        ERC20(JTokenAddress).transferFrom(msg.sender, admin, price);

        rarity = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 10;

        _tokenIds.increment();
        _safeMint(msg.sender, _tokenIds.current());

        if(rarity == 0) {
            _setTokenURI(_tokenIds.current(), "0URL");
        } else if (rarity == 1 ) {
            _setTokenURI(_tokenIds.current(), "1URL");  
        } else if (rarity == 2 ) {
            _setTokenURI(_tokenIds.current(), "2URL");  
        } else if (rarity == 3 ) {
            _setTokenURI(_tokenIds.current(), "3URL");
        } else if (rarity == 4 ) {
            _setTokenURI(_tokenIds.current(), "4URL");
        } else if (rarity == 5) {
            _setTokenURI(_tokenIds.current(), "5URL");
        } else if (rarity == 6) {
            _setTokenURI(_tokenIds.current(), "6URL");
        } else if (rarity == 7) {
            _setTokenURI(_tokenIds.current(), "7URL");
        } else if (rarity == 8) {
            _setTokenURI(_tokenIds.current(), "8URL");
        } else if (rarity == 9) {
            _setTokenURI(_tokenIds.current(), "9URL");
        } else {
            revert("Error in getting URL");
        }

        _tokenDetails[_tokenIds.current()] = NFTS(_tokenIds.current(), rarity, "", block.timestamp, msg.sender, false);
        
    }

    function setHashKey(string memory hash) public onlyOwner {
        HashKey = hash;
    }

    function setHash(uint _hashValue) private {
        string memory hash = Strings.toString(_hashValue);
        hashValue = keccak256(abi.encodePacked(hash, HashKey));
    }

    function getHashKey() public onlyOwner view returns (string memory) {
        return HashKey;
    }

    function getHashValue(bytes32 checkHashValue) private view returns (bool) {
        return checkHashValue == hashValue;
    }

    //GET ALL NFT FOR THE ACCOUNT OWN
    function getAllTokensForUser(address account) public view returns (NFTS[] memory) {
        uint256 tokenCount = balanceOf(account);
        if (tokenCount == 0) {
            return new NFTS[](0);
        } else {
            NFTS[] memory result = new NFTS[](tokenCount);
            uint256 totalNFTs = _tokenIds.current();
            uint256 resultIndex = 0;
            for (uint i = 1; i <= totalNFTs; i++) {
                if (ownerOf(i) == account) {
                    // result[resultIndex] = i;
                    result[resultIndex] = _tokenDetails[i];
                    result[resultIndex].tokenURI = tokenURI(i);
                    resultIndex++;
                }
            }
            return result;
        }
    }

    function getOwner (uint256 NFTID) external view returns (address) {
        return ownerOf(NFTID);
    }
    function getTokenId (uint256 NFTID) external view returns (uint256) {
        return _tokenDetails[NFTID].nftid;
    }
    function getRarity (uint256 NFTID) external view returns (uint256) {
        return _tokenDetails[NFTID].rarity;
    }
    function getCreatedTime (uint256 NFTID) external view returns (uint256) {
        return _tokenDetails[NFTID].createdtime;
    }
    function getSelling (uint256 NFTID) external view returns (bool) {
        return _tokenDetails[NFTID].selling;
    }
    function setSelling (uint256 NFTID) external {
        _tokenDetails[NFTID].selling = !_tokenDetails[NFTID].selling;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_tokenDetails[tokenId].selling == false, "Selling NFT not transferable");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(_tokenDetails[tokenId].selling == false, "Selling NFT not transferable");
        safeTransferFrom(from, to, tokenId, "");
    }

}