/**
 * @title: Idle Rebalancer interface
 * @author: Idle Labs Inc., idle.finance
 */
pragma solidity 0.6.12;

interface IIdleRebalancer {
  function calcRebalanceAmounts(uint256[] calldata _rebalanceParams)
    external view
    returns (address[] memory tokenAddresses, uint256[] memory amounts);
}
