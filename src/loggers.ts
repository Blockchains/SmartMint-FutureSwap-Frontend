import { Futureswap, TradeOpen, TradeClose, TradeLiquidate, AddCollateral, FrontRunning, UpdateLiquidity, InternalExchange } from '../generated/Futureswap/Futureswap'
import { Trade, Liquidation, Collateral, FrontRunningCase, LiquidityAddition, Balancer, TradeWithCollateral, OpenTrade, CloseTrade, DyanmicFunding, TokenPools } from '../generated/schema'
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
    let tokenPools = new TokenPools(id)
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