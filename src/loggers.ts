import {
  Futureswap,
  TradeOpen,
  TradeClose,
  TradeLiquidate,
  AddCollateral,
  FrontRunning,
  UpdateLiquidity,
  InternalExchange,
} from "../generated/Futureswap/Futureswap";
import {
  Trade,
  Liquidation,
  Collateral,
  FrontRunningCase,
  LiquidityAddition,
  Balancer,
  TradeWithCollateral,
  OpenTrade,
  CloseTrade,
  DyanmicFunding,
  TokenPool,
  Imbalance,
} from "../generated/schema";
import { BigIntEth } from "./helpers";
import {
  returnTradesInfo,
  returnDynamicFunding,
  returnTokenPools,
  returnInternalExchangeInfo,
  returnFrontRunningPrice,
  returnPrice,
} from "./getters";
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts";

export function logDFR(
  transactionHash: Bytes,
  address: Address,
  timestamp: BigInt,
  reason: string
): void {
  let id = transactionHash.toHex();
  let DFR = new DyanmicFunding(id);
  let returnData = returnDynamicFunding(address);
  DFR.exchange = address;
  DFR.timestamp = timestamp.toI32();
  DFR.reason = reason;
  DFR.longSharesOutstanding = returnData.longSharesOutstanding;
  DFR.shortSharesOutstanding = returnData.shortSharesOutstanding;
  DFR.currentDFR = returnData.currentDFR;
  DFR.save();
}

export function logTokenPools(
  transactionHash: Bytes,
  address: Address,
  timestamp: BigInt,
  reason: string
): void {
  let id = transactionHash.toHex();
  let tokenPools = new TokenPool(id);
  let returnData = returnTokenPools(address);
  tokenPools.exchange = address;
  tokenPools.timestamp = timestamp.toI32();
  tokenPools.reason = reason;
  tokenPools.assetTokenBorrowPool = returnData.assetTokenBorrowPool;
  tokenPools.longBorrowValue = returnData.longBorrowValue;
  tokenPools.shortAssetBorrowPool = returnData.shortAssetBorrowPool;
  tokenPools.shortBorrowValue = returnData.shortBorrowValue;
  tokenPools.stableTokenBorrowPool = returnData.stableTokenBorrowPool;
  tokenPools.stableTokenCollateralPool = returnData.stableTokenCollateralPool;
  tokenPools.stablePoolSharesOutstanding =
    returnData.stablePoolSharesOutstanding;
  if (returnData.assetTokenAvailable) {
    tokenPools.assetTokenAvailable = returnData.assetTokenAvailable;
  }
  if (returnData.stableTokenAvailable) {
    tokenPools.stableTokenAvailable = returnData.stableTokenAvailable;
  }
  tokenPools.save();
}

export function logCloseTrade(event: TradeClose): void {
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId);
  let returnedFrontRunningPrice = returnFrontRunningPrice(
    returnedTrade.chainlinkAssetAddress,
    event.address,
    returnedTrade.roundId,
    returnedTrade.tradeOpen
  );
  let tradeClosedId = event.address
    .toHexString()
    .concat("-")
    .concat(event.params.tradeId.toString());
  let tradeClosed = new CloseTrade(tradeClosedId);
  tradeClosed.tradeId = event.params.tradeId;
  tradeClosed.exchange = event.address;
  tradeClosed.tradeOwner = event.params.tradeOwner;
  tradeClosed.isLong = event.params.isLong;
  tradeClosed.collateral = event.params.collateral;
  tradeClosed.assetPrice = event.params.assetPrice;
  tradeClosed.stablePrice = event.params.stablePrice;
  tradeClosed.assetRedemptionAmount = event.params.assetRedemptionAmount;
  tradeClosed.positionValue = event.params.assetRedemptionAmount
    .times(event.params.assetPrice)
    .div(BigIntEth());
  tradeClosed.timestampClose = event.params.timestamp.toI32();
  tradeClosed.referral = event.params.referral;
  if (returnTradesInfo) {
    tradeClosed.stableTokenCollateral = returnedTrade.stableTokenCollateral;
    tradeClosed.assetTokenBorrowed = returnedTrade.assetTokenBorrowed;
    tradeClosed.stablePoolShares = returnedTrade.stablePoolShares;
    tradeClosed.poolOwnershipShares = returnedTrade.poolOwnershipShares;
  }
  if (returnedFrontRunningPrice) {
    tradeClosed.frontRunningPrice = returnedFrontRunningPrice;
  }
  tradeClosed.save();
}

export function logNewLiquidate(event: TradeLiquidate): void {
  let liquidation = new Liquidation(event.transaction.hash.toHex());
  liquidation.exchange = event.address;
  liquidation.tradeId = event.params.tradeId;
  liquidation.tradeOwner = event.params.tradeOwner;
  liquidation.liquidator = event.params.liquidator;
  liquidation.stableToSendLiquidator = event.params.stableToSendLiquidator;
  liquidation.stableToSendTradeOwner = event.params.stableToSendTradeOwner;
  liquidation.timestamp = event.params.timestamp;
  liquidation.save();
}

export function logFrontRunning(event: FrontRunning): void {
  let frontrunning = new FrontRunningCase(event.transaction.hash.toHex());
  frontrunning.exchange = event.address;
  frontrunning.tradeId = event.params.tradeId;
  frontrunning.tradeOwner = event.params.tradeOwner;
  frontrunning.protectedOpenPrice = event.params.protectedOpenPrice;
  frontrunning.save();
}

export function logOpenTrade(event: TradeOpen): void {
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId);
  let tradeOpenedId = event.address
    .toHexString()
    .concat("-")
    .concat(event.params.tradeId.toString());
  let tradeOpened = new OpenTrade(tradeOpenedId);
  tradeOpened.tradeId = event.params.tradeId;
  tradeOpened.exchange = event.address;
  tradeOpened.tradeOwner = event.params.tradeOwner;
  tradeOpened.isLong = event.params.isLong;
  tradeOpened.positionValue = event.params.collateral
    .times(event.params.leverage)
    .times(event.params.assetPrice)
    .div(BigIntEth());
  tradeOpened.positionSize = event.params.collateral.times(
    event.params.leverage
  );
  tradeOpened.collateral = event.params.collateral;
  tradeOpened.leverage = event.params.leverage;
  tradeOpened.assetPrice = event.params.assetPrice;
  tradeOpened.stablePrice = event.params.stablePrice;
  tradeOpened.openFee = event.params.openFee;
  tradeOpened.oracleRoundId = event.params.oracleRoundId;
  tradeOpened.timestampOpen = event.params.timestamp.toI32();
  tradeOpened.referral = event.params.referral;
  if (returnedTrade) {
    tradeOpened.stableTokenCollateral = returnedTrade.stableTokenCollateral;
    tradeOpened.assetTokenBorrowed = returnedTrade.assetTokenBorrowed;
    tradeOpened.stablePoolShares = returnedTrade.stablePoolShares;
    tradeOpened.poolOwnershipShares = returnedTrade.poolOwnershipShares;
  }
  tradeOpened.save();
}

export function logUpdateLiquidity(event: UpdateLiquidity): void {
  let updateLiquidity = new LiquidityAddition(event.transaction.hash.toHex());
  let returnedPrice = returnPrice(event.address);
  updateLiquidity.exchange = event.address;
  updateLiquidity.provider = event.params.provider;
  updateLiquidity.assetTokenAmount = event.params.assetTokenAmount;
  updateLiquidity.stableTokenAmount = event.params.stableTokenAmount;
  updateLiquidity.lstPrice = event.params.lstPrice;
  updateLiquidity.liquidityMinted = event.params.liquidityMinted;
  updateLiquidity.addedLiquidity = event.params.addedLiq;
  updateLiquidity.timestamp = event.params.timestamp;
  if (returnedPrice) {
    updateLiquidity.assetPrice = returnedPrice.assetPrice;
    updateLiquidity.stablePrice = returnedPrice.stablePrice;
  }
  updateLiquidity.save();
}

export function logInternalExchange(event: InternalExchange): void {
  let balancer = new Balancer(event.transaction.hash.toHex());
  balancer.exchange = event.address;
  balancer.provider = event.params.provider;
  balancer.isTradingAsset = event.params.isTradingAsset;
  balancer.assetAmount = event.params.assetAmount;
  balancer.stableAmount = event.params.stableAmount;
  balancer.assetPrice = event.params.assetPrice;
  balancer.stablePrice = event.params.stablePrice;
  balancer.timestamp = event.params.timestamp;
  balancer.save();
}

export function logBalancerInformation(
  transactionHash: Bytes,
  address: Address,
  timestamp: BigInt,
  reason: string
): void {
  let returnedInternalExchange = returnInternalExchangeInfo(address);
  let imbalance = new Imbalance(transactionHash.toHex());
  let futureswapInstance = Futureswap.bind(address);
  let booleanHandling = futureswapInstance.try_calculateImbalance();
  if (returnedInternalExchange) {
    imbalance.exchange = address;
    imbalance.timestamp = timestamp.toI32();
    imbalance.reason = reason;
    imbalance.recommendedTrade = returnedInternalExchange.recommendedTrade;
    imbalance.poolNeedsAsset = booleanHandling.value.value1;
    imbalance.imbalanceAmount = returnedInternalExchange.imbalanceAmount;
    imbalance.assetPoolValue = returnedInternalExchange.assetPoolValue;
    imbalance.shortPoolValue = returnedInternalExchange.shortPoolValue;
    imbalance.save();
  }
}

export function logAddCollateral(event: AddCollateral): void {
  let addCollateral = new Collateral(event.transaction.hash.toHex());
  addCollateral.exchange = event.address;
  addCollateral.tradeId = event.params.tradeId;
  addCollateral.tradeOwner = event.params.tradeOwner;
  addCollateral.addedCollateral = event.params.addedCollateral;
  addCollateral.assetPrice = event.params.assetPrice;
  addCollateral.stablePrice = event.params.stablePrice;
  addCollateral.timestamp = event.block.timestamp;
  addCollateral.save();
}
