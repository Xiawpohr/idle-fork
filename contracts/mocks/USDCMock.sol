pragma solidity 0.6.12;

// interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDCMock is ERC20 {
  constructor()
    ERC20('USDC', 'USDC')
    public {
    _setupDecimals(6);
    _mint(address(this), 10**12); // 1.000.000 USDC
    _mint(msg.sender, 10**9); // 1.000 USDC
  }
}
