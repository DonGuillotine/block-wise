// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IChainLeaarn {
    struct Course {
        uint256 CourseId;
        string Title;
        string Description;
        uint256 Number_Of_Chapters;
        address Student;
    }

    function createCourse(
        uint256 _id,
        string memory _title,
        string memory _description,
        uint256 _number_of_chapters,
        address _student,
        uint256 _amount
    ) external;

    function getCourse(uint256 _id) external view returns (Course memory);

    function updateCourse(
        uint256 _id,
        string memory _title,
        string memory _description
    ) external;

    function mintChapterToken(uint256 _id, uint256 _score) external;
}
