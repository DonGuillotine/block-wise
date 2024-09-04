// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ChainLearn} from "../src/ChainLearn.sol";
import "../src/Token.sol";
import "../src/NFT.sol";

contract ChainLeanTest is Test {
    ChainLearn public learn;
    NFT public nft;
    Token public token;

    address owner = 0x2fd1AFA939eFD359a302D757740d6eC15b820bC2;
    address student1 = 0x4931b524640BCaEB2c94BF9fb395BDE200b2fC11;

    address ChainLearnCA;

    function setUp() public {
        vm.startPrank(owner);

        token = new Token();
        // nft = new NFT();
        learn = new ChainLearn(address(token));
        ChainLearnCA = address(learn);

        nft = new NFT(address(learn));
    }

    function test_Add_Course() public {
        // token.giveMinterRole(address(learn));

        token.mint(student1, 100);

        vm.stopPrank();
        vm.startPrank(student1);

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
            student1,
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

    function test_Student_Token() public {
        test_Add_Course();
        learn.mintChapterToken(1, 51);
        learn.mintChapterToken(1, 51);
        learn.mintChapterToken(1, 51);

        learn.viewUserCourseToken(student1, 1);
        learn.viewCourseRequiredToken(1);
    }

    function test_Mint_Certificate() public {
        test_Add_Course();
        learn.mintChapterToken(1, 51);
        learn.mintChapterToken(1, 51);
        learn.mintChapterToken(1, 51);
        // learn.mintNFTCert(1);
    }

    function test_IToken() public view {
        learn.tokenAddress();
    }
}
