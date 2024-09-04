// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChainLearn is ERC721 {
    IERC20 IToken;

    uint256 private _nextTokenId;

    constructor(
        address _tokenAddress
    ) ERC721("ChainLearnCert", "CLC") {
        IToken = IERC20(_tokenAddress);
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

    event CertificatMinted(address indexed Student);

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

        IToken.mint(msg.sender, 1);

        userCourseTokens[msg.sender][_id] =
            userCourseTokens[msg.sender][_id] +
            1;

        emit ChapterTokenMinted(_id, msg.sender, _score);
    }

    // function mintNFTCert(uint256 _id) external {
    //     require(
    //         paidAmount[msg.sender] > 0,
    //         "You have not paid for this course"
    //     );

    //     Course storage course = courses[_id];

    //     uint256 userToken = userCourseTokens[msg.sender][_id];
    //     uint256 requredToken = course.Number_Of_Chapters;

    //     require(userToken == requredToken, "Course Not Completed");

    //     emit CertificatMinted(msg.sender);
    // }

    function safeMint(address to, uint256 _id) public {
        require(
            paidAmount[msg.sender] > 0,
            "You have not paid for this course"
        );

        Course storage course = courses[_id];

        uint256 userToken = userCourseTokens[msg.sender][_id];
        uint256 requredToken = course.Number_Of_Chapters;

        require(userToken == requredToken, "Course Not Completed");

        uint256 tokenId = _nextTokenId++;

        _safeMint(to, tokenId);

        emit CertificatMinted(msg.sender);
    }

    function tokenAddress() external view returns (address) {
        return address(IToken);
    }

    function viewUserCourseToken(
        address _student,
        uint256 _id
    ) external view returns (uint256) {
        return userCourseTokens[_student][_id];
    }

    function viewCourseRequiredToken(
        uint256 _id
    ) external view returns (uint256) {
        Course storage course = courses[_id];
        return course.Number_Of_Chapters;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
