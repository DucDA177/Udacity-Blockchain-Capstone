var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {
    const total = 7;
    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for (var i = 0; i < total; i++) {
                await this.contract.mint(account_two, i, { from: account_one });
              }
        })

        it('should return total supply', async function () { 
            assert.equal(total, await this.contract.total.call());
        })

        it('should get token balance', async function () { 
            assert.equal(total, this.contract.balanceOf(account_two));
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            assert.equal(
                this.contract.baseTokenURI(),
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
              );
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, 1, {
                from: account_one,
              });
              
              assert.equal(this.contract.ownerOf(1), account_two);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            await this.contract.mint(account_two, 3, { from: account_one });
            assert.equal(this.contract.ownerOf(1), account_two);
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.owner.call({from: account_one});
            assert.equal(contractOwner, account_one);
        })

    });
})