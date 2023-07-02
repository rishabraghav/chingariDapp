pragma solidity ^0.8.1;

//SPDX-License-Identifier: UNLICENSED

contract Auth{
    struct User{
        string username;
        string password;
    }

    mapping(address => User) private users;
    event UserLoggedIn(address indexed user);

    modifier onlyRegistered(string memory _username, string memory _password) {
        require(bytes(_username).length > 0, "username can not be empty");
        require(bytes(_password).length > 0, "password can not be empty");
        _;
    }

    function registerUser(string memory _username, string memory _password) external onlyRegistered(_username, _password) {
        require(keccak256(abi.encodePacked(users[msg.sender].username)) != keccak256(abi.encodePacked(_username)), "user alreadly registered");
        users[msg.sender].username = _username;
        users[msg.sender].password = _password;
    }

    function loginUser(string memory _username, string memory _password) external onlyRegistered(_username, _password) {
        require(keccak256(abi.encodePacked(users[msg.sender].username)) == keccak256(abi.encodePacked(_username)) && 
        keccak256(abi.encodePacked(users[msg.sender].password)) == keccak256(abi.encodePacked(_password)), "user is not registered");
        emit UserLoggedIn(msg.sender);
    }

}