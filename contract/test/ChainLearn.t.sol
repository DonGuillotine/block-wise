// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ChainLearn} from "../src/ChainLearn.sol";

contract ChainLeanTest is Test {
    ChainLearn public learn;

    function setUp() public {
        learn = new ChainLearn();
    }

    function test_Add_Course() public {
        uint256 id = 1;
        string memory title = "BlockChain";
        string memory description = "Blockchain";
        string memory chapter_one = "BlockChain";
        string memory chapter_two = "Blockchain";
        string memory chapter_three = "Blockchain";

        learn.createCourse(
            id,
            title,
            description,
            chapter_one,
            chapter_two,
            chapter_three,
            1
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
}
