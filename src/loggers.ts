import { Futureswap, TradeOpen, TradeClose, TradeLiquidate, AddCollateral, FrontRunning, UpdateLiquidity, InternalExchange } from '../generated/Futureswap/Futureswap'
import { Trade, Liquidation, Collateral, FrontRunningCase, LiquidityAddition, Balancer, TradeWithCollateral, OpenTrade, CloseTrade, DyanmicFunding } from '../generated/schema'
import { BigIntEth } from './helpers'
import { returnTradesInfo, returnDynamicFunding } from './getters'
import { Bytes, Address, BigInt } from '@graphprotocol/graph-ts'


export function logDFR (transactionHash: Bytes, address: Address, timestamp: BigInt, reason: string): void {
    let id = transactionHash.toHex()
    let DFR = new DyanmicFunding(id)
    let returnDFR = returnDynamicFunding(address)
    DFR.exchange = address
    DFR.timestamp = timestamp.toI32()
    DFR.reason = reason
    DFR.longSharesOutstanding = returnDFR.longSharesOutstanding
    DFR.shortSharesOutstanding = returnDFR.shortSharesOutstanding
    DFR.lastDfrUpdate = returnDFR.lastDfrUpdate
    DFR.currentDFR = returnDFR.currentDFR
    DFR.save()
}