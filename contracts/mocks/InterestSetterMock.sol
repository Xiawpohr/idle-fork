pragma solidity 0.6.12;

// interfaces
import "../interfaces/IInterestSetter.sol";

contract InterestSetterMock is IInterestSetter {
  uint256 public interestRate;

  function getInterestRate(address, uint256, uint256) external view returns (uint256 value) {
    return interestRate;
  }
  function setInterestRate(uint256 value) external {
    interestRate = value;
  }
}
