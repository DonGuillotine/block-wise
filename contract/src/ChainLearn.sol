// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IERC20.sol";
import "../interfaces/IERC721.sol";

contract ChainLearn {
    IERC20 public IToken;
    IERC721 public INFT;

    constructor(address _tokenAddress, address _nftAddress) {
        IToken = IERC20(_tokenAddress);
        INFT = IERC721(_nftAddress);
    }

    struct Course {
        uint256 CourseId;
        string Title;
        string Description;
        uint256 Number_Of_Chapters;
        address Student;
    }

    // Mapping of course id to course
    mapping(uint256 => Course) courses;

    // Mapping of user to amount paid for course creation.
    mapping(address => uint256) paidAmount;

    // Mapping of user to course id to number of tokens
    mapping(address => mapping(uint256 => uint256)) userCourseTokens;

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

    event ChapterTokenMinted(
        uint256 indexed CourseId,
        address indexed User,
        uint256 Score
    );

    function createCourse(
        uint256 _id,
        string memory _title,
        string memory _description,
        uint256 _number_of_chapters,
        address _student,
        uint256 _amount
    ) external {
        require(_amount >= 50, "Amount cannot be less than 50");

        uint256 allowance = IToken.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Not enough allowance");

        require(
            IToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        Course memory newCourse = Course(
            _id,
            _title,
            _description,
            _number_of_chapters,
            _student
        );

        courses[_id] = newCourse;

        paidAmount[_student] = _amount;

        emit CourseCreated(_id, _title, _student);
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

    function mintChapterToken(uint256 _id, uint256 _score) external {
        require(_score > 0, "Score cannot be less than zero");
        require(_score > 50, "Score should be above 50");
        require(
            paidAmount[msg.sender] > 0,
            "You have not paid for this course"
        );

        IToken.publicMint(msg.sender);

        emit ChapterTokenMinted(_id, msg.sender, _score);
    }
}
