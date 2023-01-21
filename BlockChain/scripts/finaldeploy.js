const hre = require("hardhat");

async function main() {

    const exp= await hre.ethers.getContractFactory("expense");
    const exp1= await exp.deploy();
    await exp1.deployed();
    console.log("deployed to:",exp1.address);
} 

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});  