/**
 * @title: Idle Rebalancer interface
 * @author: Idle Labs Inc., idle.finance
 */
pragma solidity 0.6.12;

interface IIdleRebalancerV3 {
  function getAllocations() external view returns (uint256[] memory _allocations);
  function setAllocations(uint256[] calldata _allocations, address[] calldata _addresses) external;
}
