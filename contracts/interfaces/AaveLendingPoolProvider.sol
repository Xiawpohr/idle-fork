pragma solidity 0.6.12;

interface AaveLendingPoolProvider {
  function getLendingPool() external view returns (address);
  function getLendingPoolCore() external view returns (address);
}
