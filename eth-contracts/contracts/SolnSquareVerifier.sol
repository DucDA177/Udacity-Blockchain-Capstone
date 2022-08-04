pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SquareVerifier is ZokratesVerifier { }

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is DUCDA10Contract{
    
// TODO define a solutions struct that can hold an index & an address
struct Solution {
        uint256 index;
        address solutionAddress;
    }

// TODO define an array of the above struct
    Solution[] solutionList; 
    uint256 solutionCount = 0;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) solutions;


// TODO Create an event to emit when a solution is added
    event AddedSolution(uint256 index, address solutionAddress);


// TODO Create a function to add the solutions to the array and emit the event
    function AddSolution(uint[2] memory input) public {

        bytes32 solutionHash = keccak256(abi.encodePacked(input[0], input[1]));

        solutions[solutionHash] = Solution(solutionCount, msg.sender, false);

        emit SolutionAdded(solutionCount, msg.sender);
        solutionCount++;
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

    function mintNFT(uint input0, uint input1, address to) public {
        bytes32 solutionHash = keccak256(abi.encodePacked(input0, input1));

        super.mint(to, solutions[solutionHash].index);

    }

}

  


























