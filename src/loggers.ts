import { Futureswap, TradeOpen, TradeClose, TradeLiquidate, AddCollateral, FrontRunning, UpdateLiquidity, InternalExchange } from '../generated/Futureswap/Futureswap'
import { Trade, Liquidation, Collateral, FrontRunningCase, LiquidityAddition, Balancer, TradeWithCollateral, OpenTrade, CloseTrade, DyanmicFunding, TokenPool } from '../generated/schema'
import { BigIntEth } from './helpers'
import { returnTradesInfo, returnDynamicFunding, returnTokenPools } from './getters'
import { Bytes, Address, BigInt } from '@graphprotocol/graph-ts'


export function logDFR (transactionHash: Bytes, address: Address, timestamp: BigInt, reason: string): void {
    let id = transactionHash.toHex()
    let DFR = new DyanmicFunding(id)
    let returnData = returnDynamicFunding(address)
    DFR.exchange = address
    DFR.timestamp = timestamp.toI32()
    DFR.reason = reason
    DFR.longSharesOutstanding = returnData.longSharesOutstanding
    DFR.shortSharesOutstanding = returnData.shortSharesOutstanding
    DFR.currentDFR = returnData.currentDFR
    DFR.save()
}

export function logTokenPools(transactionHash: Bytes, address: Address, timestamp: BigInt, reason: string): void {
    let id = transactionHash.toHex()
    let tokenPools = new TokenPool(id)
    let returnData = returnTokenPools(address)
    tokenPools.exchange = address
    tokenPools.timestamp = timestamp.toI32()
    tokenPools.reason = reason
    tokenPools.assetTokenBorrowPool = returnData.assetTokenBorrowPool
    tokenPools.longBorrowValue = returnData.longBorrowValue
    tokenPools.shortAssetBorrowPool = returnData.shortAssetBorrowPool
    tokenPools.shortBorrowValue = returnData.shortBorrowValue
    tokenPools.stableTokenBorrowPool = returnData.stableTokenBorrowPool
    tokenPools.stableTokenCollateralPool = returnData.stableTokenCollateralPool
    tokenPools.stablePoolSharesOutstanding = returnData.stablePoolSharesOutstanding
    tokenPools.save()

}

export function logTradeClosed(event: TradeClose): void {
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId)
  let tradeClosedId = event.address.toHexString().concat("-").concat(event.params.tradeId.toString())
  let tradeClosed = new CloseTrade(tradeClosedId)
  tradeClosed.tradeId = event.params.tradeId
  tradeClosed.exchange = event.address
  tradeClosed.tradeOwner = event.params.tradeOwner
  tradeClosed.isLong = event.params.isLong
  tradeClosed.collateral = event.params.collateral
  tradeClosed.assetPrice = event.params.assetPrice
  tradeClosed.stablePrice = event.params.stablePrice
  tradeClosed.assetRedemptionAmount = event.params.assetRedemptionAmount
  tradeClosed.positionValue = event.params.assetRedemptionAmount.times(event.params.assetPrice).div(BigIntEth())
  tradeClosed.timestampClose = event.params.timestamp.toI32()
  tradeClosed.referral = event.params.referral
  tradeClosed.stableTokenCollateral = returnedTrade.stableTokenCollateral
  tradeClosed.assetTokenBorrowed = returnedTrade.assetTokenBorrowed
  tradeClosed.stablePoolShares = returnedTrade.stablePoolShares
  tradeClosed.poolOwnershipShares = returnedTrade.poolOwnershipShares
  tradeClosed.save()
}