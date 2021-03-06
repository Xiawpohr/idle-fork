/**
 * @title: Idle Token main contract
 * @summary: ERC20 that holds pooled user funds together
 *           Each token rapresent a share of the underlying pools
 *           and with each token user have the right to redeem a portion of these pools
 * @author: Idle Labs Inc., idle.finance
 */
pragma solidity 0.6.12;

import "./IdleTokenV3_1NoConst.sol";
import "./GasTokenMock.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

import "@openzeppelin/contracts/proxy/Initializable.sol";

contract IdleTokenV3_1Mock is IdleTokenV3_1NoConst, ERC20 {
  constructor(
    string memory _name, // eg. IdleDAI
    string memory _symbol, // eg. IDLEDAI
    address _token,
    address _iToken,
    address _cToken,
    address _rebalancer,
    address _idle,
    address _comp
    ) ERC20(_name, _symbol) public {
      // Old initialize method
      // Initialize inherited contracts
      _setupDecimals(18);
      Ownable.initialize(msg.sender);
      Pausable.initialize(msg.sender);
      ReentrancyGuard.initialize();
      GST2ConsumerV2.initialize();
      // Initialize storage variables
      maxUnlentPerc = 1000;
      token = _token;
      tokenDecimals = 18;
      iToken = _iToken;
      cToken = _cToken;
      rebalancer = _rebalancer;
      // end old initialize method
      IDLE = _idle;
      COMP = _comp;
  }
  function amountsFromAllocations(uint256[] calldata allocations, uint256 total)
    external pure returns (uint256[] memory foo) {
      return _amountsFromAllocations(allocations, total);
  }
  function mintWithAmounts(address[] calldata tokenAddresses, uint256[] calldata protocolAmounts) external {
    _mintWithAmounts(tokenAddresses, protocolAmounts);
  }
  function setLastAllocations(uint256[] calldata allocs) external {
    lastAllocations = allocs;
  }
  function setIdleControllerAddress(address _controller) external onlyOwner {
    idleController = _controller;
  }
  function setMaxUnlentPerc(uint256 _perc)
    external onlyOwner {
      require(_perc <= 100000, "IDLE:TOO_HIGH");
      maxUnlentPerc = _perc;
  }
  function setOracleAddress(address _oracle)
    external onlyOwner {
      require(_oracle != address(0), "IDLE:IS_0");
      oracle = _oracle;
  }

  function setGST(address _gst) external {
    gst2 = GasTokenMock(_gst);
  }
  function redeemAllNeeded(
    address[] calldata tokenAddresses,
    uint256[] calldata amounts,
    uint256[] calldata newAmounts
    ) external returns (
      uint256[] memory toMintAllocations,
      uint256 totalToMint,
      bool lowLiquidity
    ) {
      return _redeemAllNeeded(tokenAddresses, amounts, newAmounts);
  }
}
