// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define the MessageStorage contract
contract MessageStorage {
    // State variables
    address private admin; // The address of the admin who deployed the contract
    string private message; // The stored message
    bytes32 private passwordHash; // The hashed password for accessing the message

    // Event to notify when the message is updated
    event MessageUpdated(string newMessage);

    // Constructor to initialize the contract with an initial message and password
    constructor(string memory _initialMessage, string memory _password) {
        admin = msg.sender; // Set the deployer as the admin
        message = _initialMessage; // Set the initial message
        passwordHash = keccak256(abi.encodePacked(_password)); // Hash and store the password
    }

    // Modifier to restrict access to admin-only functions
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Function to set a new message, restricted to the admin
    function setMessage(string memory _newMessage) public onlyAdmin {
        message = _newMessage; // Update the message
        emit MessageUpdated(_newMessage); // Emit an event to notify the update
    }

    // Function to get the message if the correct password is provided
    function getMessage(
        string memory _password
    ) public view returns (string memory) {
        // Ensure the provided password matches the stored hashed password
        require(
            keccak256(abi.encodePacked(_password)) == passwordHash,
            "Incorrect password"
        );
        return message; // Return the message
    }
}
