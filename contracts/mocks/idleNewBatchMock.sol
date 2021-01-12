pragma solidity 0.6.12;

// interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IdleNewBatchMock is ERC20 {
  uint256 public transferAmount;
  constructor()
    ERC20('idleNew', 'IDLENEW')
    public {
    _setupDecimals(18);
    _mint(msg.sender, 10**22); // 10.000 IDLENEW
  }
  function setAmountToMint(uint256 _amount) public {
    transferAmount = _amount;
  }
  function mintIdleToken(uint256, bool, address) external returns (uint256 mintedTokens) {
    _mint(msg.sender, transferAmount);
    mintedTokens = transferAmount;
  }
}
