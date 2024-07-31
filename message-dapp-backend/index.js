// Import required modules
const express = require("express");
const { ethers } = require("ethers");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Constants from environment variables
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not set
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // Smart contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Private key of the wallet
const RPC_URL = process.env.RPC_URL; // RPC URL of the Ethereum network

// Set up the provider and wallet for interacting with the Ethereum network
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ABI (Application Binary Interface) of the smart contract
const contractABI = [
  "function setMessage(string memory _newMessage) public",
  "function getMessage(string memory _password) public view returns (string memory)",
];

// Create a contract instance to interact with the smart contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

// Endpoint to set a new message in the smart contract
app.post("/api/message", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call the setMessage function of the smart contract
    const tx = await contract.setMessage(message);
    await tx.wait(); // Wait for the transaction to be mined

    res.json({ success: true, message: "Message updated successfully" });
  } catch (error) {
    console.error("Error setting message:", error);
    res.status(500).json({ error: "Failed to set message" });
  }
});

// Endpoint to get the stored message from the smart contract
app.get("/api/message", async (req, res) => {
  try {
    const { password } = req.query;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Call the getMessage function of the smart contract
    const message = await contract.getMessage(password);
    res.json({ message });
  } catch (error) {
    console.error("Error getting message:", error);
    res.status(500).json({ error: "Failed to get message" });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
