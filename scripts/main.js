//main.jsの実行前にDynamicRoundRobinにLINKトークン(継承あたり1link)を送ること!!

const destination = "0x16ea840cfA174FdAC738905C4E5dB59Fd86912a1";
const contractAddr = "0x3d84c6B3EA61567531cEdC0ef0A00cdBe7c7A2fd";

async function main() {
  const factory = await ethers.getContractFactory("MagicPlank");
  const RoundRobin = await factory.attach(contractAddr);
  console.log("NFT Deployed to:", RoundRobin.address);
  const MintTx = await RoundRobin.createPlainPlank();
  await MintTx.wait();
  const MintTx1 = await RoundRobin.Inherit(destination, 1);
  await MintTx1.wait();
  const uri = await RoundRobin.tokenURI(1);
  console.log(uri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
