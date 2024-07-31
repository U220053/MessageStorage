# Message Storage dApp Backend

This project implements a decentralized application backend that allows users to store and retrieve secret messages on Ethereum-compatible blockchains.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` File**
   Create a `.env` file in the project root and add the following:

   ```env
   PORT=3000
   CONTRACT_ADDRESS=your_contract_address
   PRIVATE_KEY=your_private_key
   RPC_URL=your_rpc_url
   ```

   Replace the placeholder values with your actual contract address, private key, and RPC URL.

4. **Deploy the Smart Contract**

### Using Remix IDE

1. **Open Remix IDE**

   - Navigate to [Remix IDE](https://remix.ethereum.org/) in your web browser.

2. **Create a New File**

   - Click on the "File explorer" icon in the left sidebar.
   - Click the "+" icon to create a new file.
   - Name it `MessageStorage.sol`.

3. **Copy and Paste the Smart Contract Code**

   - Copy the `MessageStorage.sol` code provided earlier and paste it into the newly created file in Remix.

4. **Compile the Contract**

   - Click on the "Solidity compiler" icon in the left sidebar.
   - Ensure the compiler version matches the pragma statement in your contract (0.8.0 or higher).
   - Click "Compile MessageStorage.sol".

5. **Set Up MetaMask for Polygon Mumbai**

   - Open MetaMask and click on the network dropdown at the top.
   - Select "Add Network" or "Custom RPC".
   - Fill in the following details:
     - Network Name: Mumbai Testnet
     - New RPC URL: `https://rpc-mumbai.maticvigil.com/`
     - Chain ID: `80001`
     - Currency Symbol: `MATIC`
     - Block Explorer URL: `https://mumbai.polygonscan.com/`
   - Click "Save".
   - Switch to the Mumbai Testnet in MetaMask.

6. **Get Some Test MATIC**

   - Go to the [Polygon Faucet](https://faucet.polygon.technology/).
   - Select "Mumbai" network and "MATIC" token.
   - Enter your MetaMask address and request the tokens.

7. **Deploy the Contract**

   - In Remix, go to the "Deploy & run transactions" tab.
   - In the "Environment" dropdown, select "Injected Web3" to connect to MetaMask.
   - Ensure MetaMask is connected to the Mumbai Testnet.
   - Select "MessageStorage" from the contract dropdown.
   - Enter the constructor parameters (`_initialMessage` and `_password`).
   - Click "Deploy" and confirm the transaction in MetaMask.

8. **Get the Deployed Contract Address**

   - Once deployed, copy the contract address from the "Deployed Contracts" section in Remix.

9. **Verify the Deployment**

   - Go to [PolygonScan Mumbai](https://mumbai.polygonscan.com/).
   - Paste your contract address into the search bar to view the contract details.

10. **Update the `.env` File**

    - Note the deployed contract address and update it in the `.env` file.

11. **Start the Server**
    ```bash
    node index.js
    ```

## Testing the API

You can use Postman or cURL to test the API endpoints:

1. **Set Message**

   - Endpoint: `POST /api/message`
   - Body: `{ "message": "your_message_here" }`

2. **Get Message**
   - Endpoint: `GET /api/message`
   - Body: `{ "password": "your_password_here" }`

## Error Handling

The application includes basic error handling for both the smart contract interactions and API endpoints. Make sure to check the console for any error logs during operation.

## Security Considerations

- Never commit your `.env` file or expose your private key.
- In a production environment, implement proper authentication and authorization for the admin functions.
- Consider using a more secure method for password handling in the smart contract.
