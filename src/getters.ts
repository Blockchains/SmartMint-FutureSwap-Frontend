import {
  BigInt,
  BigDecimal,
  log,
  Bytes,
  Address
} from "@graphprotocol/graph-ts";
import { Futureswap } from "../generated/Futureswap/Futureswap";

class TradeObject {
  stableTokenCollateral: BigInt;
  assetTokenBorrowed: BigInt;
  stablePoolShares: BigInt;
  poolOwnershipShares: BigInt;
}

export function returnTradesInfo(
  address: Address,
  tradeId: BigInt
): TradeObject {
  let futureswapInstance = Futureswap.bind(address);
  let returnedTrade = futureswapInstance.tradeIdToTrade(tradeId);
  let tradeObject = new TradeObject();
  tradeObject.stableTokenCollateral = returnedTrade.value0;
  tradeObject.assetTokenBorrowed = returnedTrade.value4;
  tradeObject.stablePoolShares = returnedTrade.value5;
  tradeObject.poolOwnershipShares = returnedTrade.value6;

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
  let assetTokenReturned = futureswapInstance.getAssetTokenAvailable()
  let stableTokenReturned = futureswapInstance.getStableTokenAvailable()
  let tokenPoolObject = new TokenPools();
  tokenPoolObject.assetTokenBorrowPool = returnedTokenPool.value0;
  tokenPoolObject.longBorrowValue = returnedTokenPool.value1;
  tokenPoolObject.shortAssetBorrowPool = returnedTokenPool.value2;
  tokenPoolObject.shortBorrowValue = returnedTokenPool.value3;
  tokenPoolObject.stableTokenBorrowPool = returnedTokenPool.value4;
  tokenPoolObject.stableTokenCollateralPool = returnedTokenPool.value5;
  tokenPoolObject.stablePoolSharesOutstanding = returnedTokenPool.value6;
  tokenPoolObject.assetTokenAvailable = assetTokenReturned
  tokenPoolObject.stableTokenAvailable = stableTokenReturned

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
