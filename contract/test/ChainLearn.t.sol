// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ChainLearn} from "../src/ChainLearn.sol";
import "../src/Token.sol";
import "../src/NFT.sol";

contract ChainLeanTest is Test {
    ChainLearn public learn;

    Token public token;

    address owner = address(0x01);

    function setUp() public {
        vm.startPrank(owner);

        token = new Token(owner);
        // nft = new NFT();
        learn = new ChainLearn(address(token), address(0x01));
    }

    function test_Add_Course() public {
        token.mint(address(0x02), 100);

        vm.stopPrank();
        vm.startPrank(address(0x02));

        token.approve(address(learn), 100);

        uint256 id = 1;
        string memory title = "BlockChain";
        string memory description = "Blockchain";
        uint256 number_of_chapters = 3;

        learn.createCourse(
            id,
            title,
            description,
            number_of_chapters,
            address(0x2),
            50
        );
    }

    function test_Get_Course() public {
        test_Add_Course();
        learn.getCourse(1);
    }

    function test_Update_Course() public {
        test_Add_Course();
        learn.updateCourse(
            1,
            "Blockchain",
            "Learn everything about blockchain tech"
        );
        learn.getCourse(1);
    }

    function test_Mint_Chapter_Token() public {
        test_Add_Course();
        learn.mintChapterToken(1, 51);
    }
}
