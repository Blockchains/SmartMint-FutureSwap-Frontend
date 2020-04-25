import {
  BigInt,
  BigDecimal,
  log,
  Bytes,
  Address,
} from "@graphprotocol/graph-ts";
import { Futureswap } from "../generated/Futureswap/Futureswap";
import { Chainlink } from "../generated/Futureswap/Chainlink";

class TradeObject {
  stableTokenCollateral: BigInt;
  assetTokenBorrowed: BigInt;
  stablePoolShares: BigInt;
  poolOwnershipShares: BigInt;
  chainlinkAssetAddress: Address;
  tradeOpen: BigInt;
  roundId: BigInt;
}

export function returnTradesInfo(
  address: Address,
  tradeId: BigInt
): TradeObject | null {
  let futureswapInstance = Futureswap.bind(address);
  let returnedTrade = futureswapInstance.try_tradeIdToTrade(tradeId);
  let tradeObject = new TradeObject();
  if (returnedTrade.reverted) {
    return null;
  }
  tradeObject.stableTokenCollateral = returnedTrade.value.value0;
  tradeObject.assetTokenBorrowed = returnedTrade.value.value4;
  tradeObject.stablePoolShares = returnedTrade.value.value5;
  tradeObject.poolOwnershipShares = returnedTrade.value.value6;
  tradeObject.chainlinkAssetAddress = returnedTrade.value.value9;
  tradeObject.tradeOpen = returnedTrade.value.value7;
  tradeObject.roundId = returnedTrade.value.value8;

  return tradeObject;
}

class TokenPools {
  assetTokenBorrowPool: BigInt;
  longBorrowValue: BigInt;
  shortAssetBorrowPool: BigInt;
  shortBorrowValue: BigInt;
  stableTokenBorrowPool: BigInt;
  stableTokenCollateralPool: BigInt;
  stablePoolSharesOutstanding: BigInt;
  assetTokenAvailable: BigInt;
  stableTokenAvailable: BigInt;
}

export function returnTokenPools(address: Address): TokenPools {
  let futureswapInstance = Futureswap.bind(address);
  let returnedTokenPool = futureswapInstance.tokenPools();
  let assetTokenReturned = futureswapInstance.try_getAssetTokenAvailable();
  let stableTokenReturned = futureswapInstance.try_getStableTokenAvailable();
  let tokenPoolObject = new TokenPools();

  if (assetTokenReturned.reverted || stableTokenReturned.reverted) {
    tokenPoolObject.assetTokenBorrowPool = returnedTokenPool.value0;
    tokenPoolObject.longBorrowValue = returnedTokenPool.value1;
    tokenPoolObject.shortAssetBorrowPool = returnedTokenPool.value2;
    tokenPoolObject.shortBorrowValue = returnedTokenPool.value3;
    tokenPoolObject.stableTokenBorrowPool = returnedTokenPool.value4;
    tokenPoolObject.stableTokenCollateralPool = returnedTokenPool.value5;
    tokenPoolObject.stablePoolSharesOutstanding = returnedTokenPool.value6;
    return tokenPoolObject;
  }
  tokenPoolObject.assetTokenBorrowPool = returnedTokenPool.value0;
  tokenPoolObject.longBorrowValue = returnedTokenPool.value1;
  tokenPoolObject.shortAssetBorrowPool = returnedTokenPool.value2;
  tokenPoolObject.shortBorrowValue = returnedTokenPool.value3;
  tokenPoolObject.stableTokenBorrowPool = returnedTokenPool.value4;
  tokenPoolObject.stableTokenCollateralPool = returnedTokenPool.value5;
  tokenPoolObject.stablePoolSharesOutstanding = returnedTokenPool.value6;
  tokenPoolObject.assetTokenAvailable = assetTokenReturned.value;
  tokenPoolObject.stableTokenAvailable = stableTokenReturned.value;

  return tokenPoolObject;
}

class DynamicFunding {
  longSharesOutstanding: BigInt;
  shortSharesOutstanding: BigInt;
  currentDFR: BigInt;
}

export function returnDynamicFunding(address: Address): DynamicFunding {
  let futureswapInstance = Futureswap.bind(address);
  let returnedDynamicFunding = futureswapInstance.dynamicFunding();
  let currentDFR = futureswapInstance.getDFR();
  let dynamicFundingObject = new DynamicFunding();
  dynamicFundingObject.longSharesOutstanding = returnedDynamicFunding.value0;
  dynamicFundingObject.shortSharesOutstanding = returnedDynamicFunding.value1;
  dynamicFundingObject.currentDFR = currentDFR;

  return dynamicFundingObject;
}

class InternalExchange {
  recommendedTrade: BigInt;
  // poolNeedsAsset: Boolean
  imbalanceAmount: BigInt;
  assetPoolValue: BigInt;
  shortPoolValue: BigInt;
}
export function returnInternalExchangeInfo(
  address: Address
): InternalExchange | null {
  let futureswapInstance = Futureswap.bind(address);
  let returnedInternalExchange = futureswapInstance.try_calculateImbalance();
  if (returnedInternalExchange.reverted) {
    log.info("calculate Imbalance reverted", []);
    return null;
  } else {
    let internalExchangeObject = new InternalExchange();
    internalExchangeObject.recommendedTrade =
      returnedInternalExchange.value.value0;
    // internalExchangeObject.poolNeedsAsset = returnedInternalExchange.value1
    internalExchangeObject.imbalanceAmount =
      returnedInternalExchange.value.value2;
    internalExchangeObject.assetPoolValue =
      returnedInternalExchange.value.value3;
    internalExchangeObject.shortPoolValue =
      returnedInternalExchange.value.value4;

    return internalExchangeObject;
  }
}

class Price {
  assetPrice: BigInt;
  stablePrice: BigInt;
}

export function returnPrice(address: Address): Price | null {
  let futureswapInstance = Futureswap.bind(address);
  let returnedAssetTokenPrice = futureswapInstance.try_getAssetTokenPrice();
  let returnedStableTokenPrice = futureswapInstance.try_getStableTokenPrice();
  if (returnedAssetTokenPrice.reverted || returnedStableTokenPrice.reverted) {
    return null;
  }
  let price = new Price();
  price.assetPrice = returnedAssetTokenPrice.value;
  price.stablePrice = returnedStableTokenPrice.value;

  return price;
}

export function returnFrontRunningPrice(
  chainlilnkAddress: Address,
  futureswapAddress: Address,
  roundId: BigInt,
  timestampOpen: BigInt
): BigInt | null {
  let chainlinkInstance = Chainlink.bind(chainlilnkAddress);
  let futureswapInstance = Futureswap.bind(futureswapAddress);
  let state = futureswapInstance.state();
  let nextRoundTimestamp = chainlinkInstance.try_getTimestamp(
    roundId.plus(BigInt.fromI32(1))
  );
  if (nextRoundTimestamp.reverted) {
    return null;
  }
  let frontRunningTime = state.value5;
  if (nextRoundTimestamp.value <= BigInt.fromI32(0)) {
    return null;
  }
  let timeDifference = nextRoundTimestamp.value.minus(timestampOpen);
  if (timeDifference <= BigInt.fromI32(0)) {
    return null;
  }

  if (timeDifference > frontRunningTime) {
    return null;
  }
  let newPrice = chainlinkInstance.try_getAnswer(
    roundId.plus(BigInt.fromI32(1))
  );
  if (newPrice.reverted) {
    return null;
  }
  return newPrice.value;
}
