// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter}:`, address)
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleExpenses(expenses) {
  for (const expens of expenses) {
    const amount = expens.amount;
    const sender = expens.sender;
    const receiver = expens.receiver;
    console.log(
      `Amount: ${amount} Sender: ${sender} Reciever: ${receiver}`
    );
  }
}
async function main() {
    const [deployer,reciever] = await hre.ethers.getSigners();
    const exp= await hre.ethers.getContractFactory("expense");
    const exp1= await exp.deploy();
    await exp1.deployed();
    console.log("deployed to:",exp1.address);
    console.log("deployer address:",deployer.address);
    const addresses = [deployer.address, reciever.address];
    const amount ={value:hre.ethers.utils.parseEther("1.0")};
    await consoleBalances(addresses);
    await exp1.connect(deployer).sendBal(reciever.address,amount);
      
    await consoleBalances(addresses);

    const expenses = await exp1.getExpenses();
    await consoleExpenses(expenses);

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
