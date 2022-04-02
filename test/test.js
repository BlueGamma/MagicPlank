const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner;
let addr1;
let addr2;
let addr3;
let addr4;
let addrs;
let contract;
let contractFactory;
let ToStringFactory;
let ToString;
const ownerAddr = "0x16ea840cfA174FdAC738905C4E5dB59Fd86912a1";

describe("ToString Test", () => {

  beforeEach(async function () {
    ToStringFactory = await ethers.getContractFactory(
      "ToString"
    );
    [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();
    ToString = await ToStringFactory.deploy();
  })
  
  xit("should pass", async () => {
    const bytes32 = ethers.utils.formatBytes32String("QmTr9rwUVp2jy8uxpDC7t2")
    console.log(bytes32);
    const tx = await ToString.bytes32ToString(bytes32);
    expect(tx).to.equal("QmTr9rwUVp2jy8uxpDC7t2");
  });
  
  xit("should convert address to string", async () => {
    const out = await ToString.addressToString(ownerAddr);
    expect(out).to.equal("0x16ea840cfa174fdac738905c4e5db59fd86912a1");
  });
});

describe("Final test", () => {
  beforeEach(async function () {
    contractFactory = await ethers.getContractFactory(
      "MagicPlank"
    );
    contract = await contractFactory.deploy("https://ipfs.moralis.io:2053/ipfs/QmRiuXrWe9RWGtoHcBjcjgzqx8bcxZ2jXfjsZPudforCPv/metadata/0000000000000000000000000000000000000000000000000000000000000001.json");
  })

  it("A", async () => {
    await contract.createPlank();
    let uri = await contract.tokenURI(0);
    console.log(uri);
    expect(uri).to.be.equal("https://ipfs.moralis.io:2053/ipfs/QmRiuXrWe9RWGtoHcBjcjgzqx8bcxZ2jXfjsZPudforCPv/metadata/0000000000000000000000000000000000000000000000000000000000000001.json");
  })

  it("B", async () => {
    await contract.createPlank();
    const _bytes32 = ethers.utils.formatBytes32String("QmTr9rwUVp2jy8uxpDC7t2");
    await contract.testfulfill(_bytes32);
    let uri = await contract.tokenURI(0);
    console.log(uri);
    expect(uri).to.be.equal("QmTr9rwUVp2jy8uxpDC7t2");
  })

  it("C", async () => {
    await contract.createPlank();
    const A_bytes32 = ethers.utils.formatBytes32String("QmTr9rwUVp2");
    const B_bytes32 = ethers.utils.formatBytes32String("jy8uxpDC7t2");
    const C_bytes32 = ethers.utils.formatBytes32String("tomoking");
    await contract.testmultiFulfill(A_bytes32, B_bytes32, C_bytes32);
    let uri = await contract.tokenURI(0);
    console.log(uri);
    expect(uri).to.be.equal("https://ipfs.moralis.io:2053/ipfs/QmTr9rwUVp2jy8uxpDC7t2");
  })

  it("D", async () => {
    await contract.createPlank();
    const A_bytes32 = ethers.utils.formatBytes32String("QmTr9rwUVp2");
    const B_bytes32 = ethers.utils.formatBytes32String("jy8uxpDC7t2");
    const C_bytes32 = ethers.utils.formatBytes32String("tomoking");
    await contract.testmultiFulfill(A_bytes32, B_bytes32, C_bytes32);
    let name = await contract.getSuccessorName(0);
    console.log(name);
    expect(name).to.be.equal("tomoking");
  })
})