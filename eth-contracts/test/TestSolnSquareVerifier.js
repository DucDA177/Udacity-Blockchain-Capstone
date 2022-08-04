var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
var SquareVerifier = artifacts.require("SquareVerifier");
const correctProof = require("../../zokrates/code/square2/proof.json");

contract("SolnSquareVerifier", (accounts) => {
    const account_one = accounts[0];
    const account_two = accounts[1];

    beforeEach(async () => {
        let squareVerifierContract = await SquareVerifier.new({
            from: account_one,
        });
        this.contract = await SolnSquareVerifier.new(
            squareVerifierContract.address,
            { from: account_one }
        );
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("should add new solution", async () => {

        try {
            await this.contract.addSolution(
                ...Object.values(correctProof.proof),
                correctProof.inputs,
                { from: account_one }
            );
            assert.equal(true, true);
        } catch (error) {
            assert.equal(false, true);
        }


    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("should can be minted ERC721 for contract", async () => {
        try {

            await this.contract.addSolution(
                ...Object.values(correctProof.proof),
                correctProof.inputs,
                { from: account_one }
            );

            await this.contract.mintNFT(
                correctProof.inputs[0],
                correctProof.inputs[1],
                account_two,
                {
                    from: account_one,
                }
            );

            assert.equal(true, true);

        } catch (error) {
            assert.equal(false, true);
        }

    });
});