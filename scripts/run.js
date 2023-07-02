const { ethers } = require('hardhat');

async function main() {
    const Contract = await ethers.getContractFactory('Auth');
    const contract = await Contract.deploy();

    // Wait for the contract to be mined and deployed
    await contract.waitForDeployment();

    console.log("Contract deployed to address:", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


// const { ethers } = require('hardhat');

// async function main() {
//     const Contract = await ethers.getContractFactory('Auth');
//     const contract = await Contract.deploy();


//     await contract.deployed();

//     console.log("contract deployed to address: ", contract.address);
// }

// main()
// .then(() => process.exit(0))
// .catch((error) => {
//     console.error(error); 
//     process.exit(1);
// });