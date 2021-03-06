pragma solidity 0.6.12;

// interfaces
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/AToken.sol";

contract aDAIMock is AToken, ERC20 {
  address public dai;
  uint256 public price = 10**18;

  constructor(address _dai, address tokenOwner)
    ERC20('aDAI', 'aDAI')
    public {
    dai = _dai;
    _setupDecimals(18);
    _mint(address(this), 10**24); // 1.000.000 aDAI
    _mint(tokenOwner, 10**23); // 100.000 aDAI
  }

  function redeem(uint256 amount) external {
    _burn(msg.sender, amount);
    require(IERC20(dai).transfer(msg.sender, amount), "Error during transfer"); // 1 DAI
  }
  function setPriceForTest(uint256 _price) external {
    price = _price;
  }
}
