const {ethers} = require('ethers');
const {
    factoryAddress, 
    routerAddress,
    fromAddress,
    toAddress
} = require("./AddressList")
const {erc20ABI, factoryABI, pairABI, routerABI} = require("./ABI")

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed1.binance.org/")

const factoryInstance = new ethers.Contract(factoryAddress, factoryABI, provider);
const routerInstance = new ethers.Contract(routerAddress, routerABI, provider);


const priceFetch = async(amount) =>{
    const token1 = new ethers.Contract(fromAddress, erc20ABI, provider);
    const token2 = new ethers.Contract(toAddress, erc20ABI, provider);
    
    // Check that if I am putting the some amount in token1 then how many tokens I receive from then token2
    const decimal1 = await token1.decimals();
    const decimal2 = await token2.decimals();
    const amountIn = ethers.parseUnits(amount, decimal1).toString();

    const amountsOut = await routerInstance.getAmountsOut(amountIn, [
        fromAddress, 
        toAddress
    ])
    const humanOutput = ethers.formatUnits(amountsOut[1].toString(),decimal2 )
    // console.log(decimal1,decimal2, amountIn, amountsOut, humanOutput);

    console.log(`No. of BUSD = ${amountIn} and no. of WBNB = ${humanOutput}` )
}
let amount = "100"
priceFetch(amount);


// console.log(factoryInstance);