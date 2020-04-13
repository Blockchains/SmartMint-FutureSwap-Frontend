import { BigInt, BigDecimal, log, Bytes, Address } from '@graphprotocol/graph-ts'
import { Futureswap } from '../generated/Futureswap/Futureswap'


class TradeObject {
    stableTokenCollateral: BigInt
    assetTokenBorrowed: BigInt
    stablePoolShares: BigInt
    poolOwnershipShares: BigInt
}

export function returnTradesInfo(address: Address, keyValue: BigInt): TradeObject {
    let futureswapInstance = Futureswap.bind(address)
    let returnedTrade = futureswapInstance.tradeIdToTrade(keyValue)
    let tradeObject =  new TradeObject()
    tradeObject.stableTokenCollateral = returnedTrade.value0
    tradeObject.assetTokenBorrowed = returnedTrade.value4
    tradeObject.stablePoolShares = returnedTrade.value5
    tradeObject.poolOwnershipShares = returnedTrade.value6

    return tradeObject
} 