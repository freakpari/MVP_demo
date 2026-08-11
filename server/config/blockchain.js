const { ethers } = require("ethers");
const RealEstateABI = require("../utils/RealEstateABI");
const EscrowABI = require("../utils/EscrowABI");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const realEstateContract = new ethers.Contract(
    process.env.REALESTATE_CONTRACT_ADDRESS,
    RealEstateABI,
    wallet
);

const escrowContract = new ethers.Contract(
    process.env.ESCROW_CONTRACT_ADDRESS,
    EscrowABI,
    wallet
);

module.exports = { provider, wallet, realEstateContract, escrowContract };