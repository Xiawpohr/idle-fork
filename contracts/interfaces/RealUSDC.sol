pragma solidity 0.6.12;

interface RealUSDC {
  function mint(address _to, uint256 _amount) external returns (bool);
  function balanceOf(address) external returns (uint256);
  function configureMinter(address minter, uint256 minterAllowedAmount) external returns (bool);
}
