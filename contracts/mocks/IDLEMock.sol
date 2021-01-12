pragma solidity 0.6.12;

// interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IDLEMock is ERC20 {
  constructor()
    ERC20('IDLE', 'IDLE')
    public {
    _setupDecimals(18);
    _mint(address(this), 13**25); // 13.000.000 IDLE
    _mint(msg.sender, 10**22); // 10.000 IDLE
  }
}
