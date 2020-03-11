import { TradeOpen, TradeClose } from '../generated/Futureswap/Events'
import { Trade } from '../generated/schema'

export function handleNewTradeOpen(event: TradeOpen): void {
  let trade = new Trade(event.params._tradeId.toString())
  trade.tradeId = event.params._tradeId
  trade.exchange = event.address
  trade.tradeOpen = true
  trade.tradeOwner = event.params._tradeOwner
  trade.isLong = event.params._isLong
  trade.collateral = event.params._collateral
  trade.leverage = event.params._leverage
  trade.assetPrice = event.params._assetPrice
  trade.stablePrice = event.params._stablePrice
  trade.openFee = event.params._openFee
  trade.oracleRoundId = event.params._oracleRoundId
  trade.timestamp = event.params._timestamp
  trade.referral = event.params._referral
  trade.save()
}

export function handleNewTradeClose(event: TradeClose): void {
  let trade = new Trade(event.params._tradeId.toString())
  trade.tradeId = event.params._tradeId
  trade.exchange = event.address
  trade.tradeOpen = false
  trade.tradeOwner = event.params._tradeOwner
  trade.isLong = event.params._isLong
  trade.collateral = event.params._collateral
  trade.protectedAssetOpenPrice = event.params._protectedAssetOpenPrice
  trade.assetPrice = event.params._assetPrice
  trade.stablePrice = event.params._stablePrice
  trade.redemptionAmount = event.params._redemptionAmount
  trade.timestamp = event.params._timestamp
  trade.referral = event.params._referral
  trade.save()
}




// - AddCollateral(indexed uint256,indexed address,uint256,uint256,uint256)
//   - FrontRunning(indexed uint256,indexed address,int256)
//   - TradeClose(indexed uint256,indexed address,bool,bool,uint256,uint256,uint256,uint256,uint256,uint256,indexed address)
//   - TradeLiquidate(indexed uint256,indexed address,indexed address,uint256,uint256,uint256)
//   - TradeOpen(indexed uint256,indexed address,bool,uint256,uint256,uint256,uint256,uint256,uint256,uint256,indexed address)
//   - UpdateLiquidity(indexed address,uint256,uint256,uint256,uint256,bool,uint256)