pragma solidity 0.6.12;

// interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract COMPMock is ERC20 {
  constructor()
    ERC20('COMP', 'COMP')
    public {
    _setupDecimals(18);
    _mint(address(this), 10**25); // 10.000.000 COMP
    _mint(msg.sender, 10**22); // 10.000 COMP
  }
}
