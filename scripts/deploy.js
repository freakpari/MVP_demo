const hre = require("hardhat");

async function main() {
    const RealEstate = await hre.ethers.getContractFactory("RealEstate");
    const realEstate = await RealEstate.deploy();
    await realEstate.deployed();
    console.log("RealEstate deployed to:", realEstate.address);

    const [deployer, buyer, inspector, lender] = await hre.ethers.getSigners();

    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(
        realEstate.address,
        deployer.address,
        inspector.address,
        lender.address
    );
    await escrow.deployed();
    console.log("Escrow deployed to:", escrow.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});