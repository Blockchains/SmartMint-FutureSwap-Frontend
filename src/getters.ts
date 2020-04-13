import { BigInt, BigDecimal, log, Bytes, Address } from '@graphprotocol/graph-ts'
import { Futureswap } from '../generated/Futureswap/Futureswap'


class TradeObject {
    stableTokenCollateral: BigInt
    assetTokenBorrowed: BigInt
    stablePoolShares: BigInt
    poolOwnershipShares: BigInt
}

export function returnTradesInfo(address: Address, tradeId: BigInt): TradeObject {
    let futureswapInstance = Futureswap.bind(address)
    let returnedTrade = futureswapInstance.tradeIdToTrade(tradeId)
    let tradeObject =  new TradeObject()
    tradeObject.stableTokenCollateral = returnedTrade.value0
    tradeObject.assetTokenBorrowed = returnedTrade.value4
    tradeObject.stablePoolShares = returnedTrade.value5
    tradeObject.poolOwnershipShares = returnedTrade.value6

    return tradeObject
} 

class TokenPools {
    assetTokenBorrowPool: BigInt 
    longBorrowValue: BigInt
    shortAssetBorrowPool: BigInt
    shortBorrowValue: BigInt
    stableTokenBorrowPool: BigInt
    stableTokenCollateralPool: BigInt
    stablePoolSharesOutstanding: BigInt
}

export function returnTokenPools(address: Address): TokenPools {
    let futureswapInstance = Futureswap.bind(address)
    let returnedTokenPool = futureswapInstance.tokenPools()
    let tokenPoolObject = new TokenPools()
    tokenPoolObject.assetTokenBorrowPool = returnedTokenPool.value0
    tokenPoolObject.longBorrowValue = returnedTokenPool.value1
    tokenPoolObject.shortAssetBorrowPool = returnedTokenPool.value2
    tokenPoolObject.shortBorrowValue = returnedTokenPool.value3
    tokenPoolObject.stableTokenBorrowPool = returnedTokenPool.value4
    tokenPoolObject.stableTokenCollateralPool = returnedTokenPool.value5
    tokenPoolObject.stablePoolSharesOutstanding = returnedTokenPool.value6

    return tokenPoolObject

}

class DynamicFunding {
    longSharesOutstanding: BigInt
    shortSharesOutstanding: BigInt
    currentDFR: BigInt
}

export function returnDynamicFunding(address: Address): DynamicFunding {
    let futureswapInstance = Futureswap.bind(address)
    let returnedDynamicFunding = futureswapInstance.dynamicFunding()
    let currentDFR = futureswapInstance.getDFR()
    let dynamicFundingObject = new DynamicFunding()
    dynamicFundingObject.longSharesOutstanding = returnedDynamicFunding.value0
    dynamicFundingObject.shortSharesOutstanding = returnedDynamicFunding.value1
    dynamicFundingObject.currentDFR = currentDFR

    return dynamicFundingObject
}