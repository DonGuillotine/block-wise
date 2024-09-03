// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, ERC20Burnable, Ownable {
    constructor(
        address initialOwner
    ) ERC20("ChainLearn", "CLN") Ownable(initialOwner) {}

    event UserMinted(address indexed user, uint256 amount);

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function publicMint(address to) external {
        _mint(to, 1);

        emit UserMinted(to, 1);
    }
}
