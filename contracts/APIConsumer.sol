// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

  
    bytes32 public data;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string private robinUri = "uri";
    string private successor = "tomoking";

    constructor() {
        setPublicChainlinkToken();
        // Oracle address here
        oracle = 0xD8269ebfE7fCdfCF6FaB16Bb4A782dC8Ab59b53C;
        // Job Id here
        jobId = "09f1fff2c5374f5bb98052a4ac833571";
        fee = 0.1 * 10 ** 18; 
    }
    
    function requestData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        request.add("get", "API_URL");
        request.add("path", "JSON_PATH");

        int timesAmount = 10**18;
        request.addInt("times", timesAmount);

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bytes32 _data) public recordChainlinkFulfillment(_requestId)
    {
        data = _data;
        //データの分岐
        //ToDo
        robinUri = toString(data);
        // successor = bytes32ToString(successor_byte32);
    }

    function getUri() internal view returns(string memory){
      return robinUri;
    }

    function getSuccessor() internal view returns(string memory){
      return successor;
    }

    function toString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}

