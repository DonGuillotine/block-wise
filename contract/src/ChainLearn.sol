// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChainLearn {
    struct Course {
        uint256 CourseId;
        string Title;
        string Description;
        string ChapterOne;
        string ChapterTwo;
        string ChapterThree;
        address Student;
    }

    // Mapping of course id to course
    mapping(uint256 => Course) public courses;

    event CourseCreated(
        uint256 indexed CourseId,
        string indexed Title,
        address indexed Student
    );
    event CourseUpdated(
        uint256 indexed CourseId,
        string indexed NewTitle,
        string indexed NewDescription
    );

    function createCourse(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _chapter_one,
        string memory _chapter_two,
        string memory _chapter_three,
        uint256 _amount
    ) external {
        require(_amount > 0, "Amount must be greater than 0");

        Course memory newCourse = Course(
            _id,
            _title,
            _description,
            _chapter_one,
            _chapter_two,
            _chapter_three,
            msg.sender
        );
        courses[_id] = newCourse;

        emit CourseCreated(_id, _title, msg.sender);
    }

    function getCourse(uint256 _id) external view returns (Course memory) {
        return courses[_id];
    }

    function updateCourse(
        uint256 _id,
        string memory _title,
        string memory _description
    ) external {
        Course storage newUpdate = courses[_id];
        newUpdate.Title = _title;
        newUpdate.Description = _description;

        emit CourseUpdated(_id, _title, _description);
    }
}
