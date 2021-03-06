pragma solidity 0.6.12;

// interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IdleBatchMock is ERC20 {
  constructor()
    ERC20('idleOld', 'IDLEOLD')
    public {
    _setupDecimals(18);
    _mint(msg.sender, 10**22); // 10.000 IDLEOLD
  }
  function token() external returns (address) {
    return address(this);
  }
  function redeemIdleToken(uint256 _amount, bool, uint256[] calldata) external returns (uint256) {
    _burn(msg.sender, _amount);
  }
}
