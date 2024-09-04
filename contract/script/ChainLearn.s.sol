// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script, console} from "forge-std/Script.sol";
import {ChainLearn} from "../src/ChainLearn.sol";
import {Token} from "../src/Token.sol";
// import {NFT} from "../src/NFT.sol";

contract ChainLearnScript is Script {
    ChainLearn public learn;
    Token public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        token = new Token();

        learn = new ChainLearn(address(token));

        vm.stopBroadcast();
    }
}
