pragma solidity 0.6.12;

interface IdleController {
  function idleSpeeds(address _idleToken) external view returns (uint256);
  function claimIdle(address[] calldata holders, address[] calldata idleTokens) external;
}
