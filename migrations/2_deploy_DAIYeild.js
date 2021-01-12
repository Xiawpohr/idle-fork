const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const {
  creator,
  rebalancerManager,
  feeAddress,
  gstAddress,
  oracle,
  cDAI,
  iDAI,
  aDAI,
  CHAI,
  DAI,
  COMP,
} = require('./addresses.js');
const BigNumber = require('bignumber.js');
const BNify = s => new BigNumber(String(s));

var IdleTokenV3_1 = artifacts.require("./IdleTokenV3_1.sol");
var IdleRebalancerV3_1 = artifacts.require("./IdleRebalancerV3_1.sol");
var IdleCompoundV2 = artifacts.require("./IdleCompoundV2.sol");
var IdleFulcrumV2 = artifacts.require("./IdleFulcrumV2.sol");
var IdleAave = artifacts.require("./IdleAave.sol");
var IdleDyDx = artifacts.require("./IdleDyDx.sol");
var IdleDSR = artifacts.require("./IdleDSR.sol");
var yxToken = artifacts.require("./yxToken.sol");
var IERC20 = artifacts.require("./IERC20.sol");


module.exports = async function (deployer, network, accounts) {
  if (network === 'test' || network == 'coverage') {
    return;
  }
  // dydx market if supported
  const marketId = 3;
  // underlying token decimals
  const decimals = 18;
  const one = BNify('1000000000000000000');
  // yxToken instance if present (for Dydx)
  let yxDAIInstance = {address: '0xb299BCDF056d17Bd1A46185eCA8bCE458B00DC4a'};

  console.log('Network', network);
  console.log('cDAI address: ', cDAI[network]);
  console.log('iDAI address: ', iDAI[network]);
  console.log('CHAI address: ', CHAI[network]);
  console.log('yxDAI address: ', yxDAIInstance.address);
  console.log('DAI address: ', DAI[network]);
  console.log('##################');

  // #######################
  let fulcrumDAIInstance;
  await deployer.deploy(IdleFulcrumV2, iDAI[network], DAI[network], {from: creator}).then(instance => fulcrumDAIInstance = instance)
  let compoundDAIInstance;
  await deployer.deploy(IdleCompoundV2, cDAI[network], DAI[network], {from: creator}).then(instance => compoundDAIInstance = instance)
  let aaveDAIInstance;
  await deployer.deploy(IdleAave, aDAI[network], DAI[network], {from: creator}).then(instance => aaveDAIInstance = instance)
  let dydxDAIInstance;
  await deployer.deploy(IdleDyDx, yxDAIInstance.address, DAI[network], marketId, {from: creator}).then(instance => dydxDAIInstance = instance)

  let rebalancerDAIInstance;
  await deployer.deploy(IdleRebalancerV3_1,
    [cDAI[network], iDAI[network], aDAI[network], yxDAIInstance.address],
    rebalancerManager,
    {from: creator}
  ).then(instance => rebalancerDAIInstance = instance)

  const proxy = await deployProxy(IdleTokenV3_1, { deployer });
  console.log('proxy created at', proxy.options.address);
  
  let IdleDAIInstance = await IdleTokenV3_1.at(proxy.options.address);
  const IdleDAIAddress = IdleDAIInstance.address;

  // see https://github.com/trufflesuite/truffle/issues/737
  await IdleDAIInstance.methods['initialize(string,string,address,address,address,address)'](
    'IdleDAI v4 [Best yield]',
    'idleDAIYield',
    DAI[network],
    iDAI[network],
    cDAI[network],
    rebalancerDAIInstance.address,
    feeAddress,
    oracle,
    {from: creator}
  );
  await IdleDAIInstance.setGovTokens(
    [COMP[network]],
    {from: creator}
  );
  await IdleDAIInstance.setAllAvailableTokensAndWrappers(
    [cDAI[network], iDAI[network], aDAI[network], yxDAIInstance.address],
    [compoundDAIInstance.address, fulcrumDAIInstance.address, aaveDAIInstance.address, dydxDAIInstance.address],
    {from: creator}
  ).catch(err => {
    console.log('err', err);
  });

  console.log('[DAI] IdleCompoundV2 address:', compoundDAIInstance.address);
  console.log('[DAI] IdleFulcrumV2  address:', fulcrumDAIInstance.address);
  console.log('[DAI] IdleAave  address:', aaveDAIInstance.address);
  console.log('[DAI] IdleDyDx  address:', dydxDAIInstance.address);
  console.log('[DAI] IdleRebalancerV3_1  address:', rebalancerDAIInstance.address);
  console.log('#### IdleDAIYield Address: ', IdleDAIAddress);

  await (await IdleCompoundV2.at(compoundDAIInstance.address)).setIdleToken(IdleDAIAddress, {from: creator});
  await (await IdleFulcrumV2.at(fulcrumDAIInstance.address)).setIdleToken(IdleDAIAddress, {from: creator});
  await (await IdleAave.at(aaveDAIInstance.address)).setIdleToken(IdleDAIAddress, {from: creator});
  await (await IdleDyDx.at(dydxDAIInstance.address)).setIdleToken(IdleDAIAddress, {from: creator});
  await (await IdleRebalancerV3_1.at(rebalancerDAIInstance.address)).setIdleToken(IdleDAIAddress, {from: creator});

  await IdleDAIInstance.setFeeAddress(feeAddress, {from: creator});
  await IdleDAIInstance.setFee(BNify('10000'), {from: creator});
}