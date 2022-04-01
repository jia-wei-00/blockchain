// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./RANDOMNFT.sol";

contract MarketPlace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address NFTAddress;
    address JTOKENAddress;

    constructor(address nftaddress, address jtokenaddress) {
        NFTAddress = nftaddress;
        JTOKENAddress = jtokenaddress;
    }

    struct MarketItem {
        uint256 itemId;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        string tokenURI;
        uint rarity;
        uint256 createdtime;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    function createMarketItem(uint256 NFTId, uint256 price) public {
        bool isSelling = RANDOMNFT(NFTAddress).getSelling(NFTId);
        require(isSelling == false, "NFT already selling");
        address owner = RANDOMNFT(NFTAddress).getOwner(NFTId);
        uint id = RANDOMNFT(NFTAddress).getTokenId(NFTId);
        string memory URL = RANDOMNFT(NFTAddress).tokenURI(NFTId);
        uint rarity = RANDOMNFT(NFTAddress).getRarity(NFTId);
        require(owner == msg.sender, "Only owner can sell own NFT");

        _itemIds.increment();

        idToMarketItem[_itemIds.current()] = MarketItem(_itemIds.current(), id, payable(owner), payable(address(this)), price, URL, rarity, block.timestamp);

        RANDOMNFT(NFTAddress).setSelling(NFTId);
    }

    //FETCH ALL NFT THAT SELLING ON MARKETPLACE
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (idToMarketItem[i].owner == address(this)) {
                items[currentIndex] = idToMarketItem[i];
                currentIndex += 1;
            }
        }

        return items;
    }

    //UNLIST NFT FROM MARKETPLACE
    function cancelMarketItem(uint256 itemId) public payable nonReentrant {
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        
        //Check is seller
        require(msg.sender == idToMarketItem[itemId].seller, "Only owner can cancel market item");
        RANDOMNFT(NFTAddress).setSelling(tokenId);

        //Remove from MarketItem
        idToMarketItem[itemId].owner = payable(msg.sender);
        _itemsSold.increment();
    }

    function updatePrice(uint256 itemId, uint256 price) public payable nonReentrant {
        //Check is seller
        require(msg.sender == idToMarketItem[itemId].seller, "Only owner can update market item price");

        idToMarketItem[itemId].price = price;
    }

    //ONLY FETCH PLAYER'S SELLING NFT
    function fetchSellingItems(address account) public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 currentIndex = 0;
        uint256 ownItemCount = 0;

        for (uint256 i = 1; i <= itemCount; i++) {
            if (
                idToMarketItem[i].seller == account &&
                idToMarketItem[i].owner == address(this)
            ) {
                ownItemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](ownItemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            if (
                idToMarketItem[i].seller == account &&
                idToMarketItem[i].owner == address(this)
            ) {
                uint256 currentId = i;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }

        return items;
    }

    //BUY NFT AT MARKETPLACE FUNCTION
    function createMarketSale(uint256 itemId, uint256 erc20Amount) public payable nonReentrant {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require (erc20Amount == price, "Please submit the asking price in order to complete the purchase");
	    require (idToMarketItem[itemId].seller != msg.sender, "Owner not allow to buy own NFT");

        // BUYER TO SELLER
        ERC20(JTOKENAddress).transferFrom(msg.sender, idToMarketItem[itemId].seller, price);

        RANDOMNFT(NFTAddress).setSelling(tokenId);

        // TRANSFER NFT FROM CONTRACT TO BUYER
        IERC721(NFTAddress).transferFrom(idToMarketItem[itemId].seller, msg.sender, tokenId);

        idToMarketItem[itemId].owner = payable(msg.sender);
        _itemsSold.increment();
    }
}
