import { TradeOpen } from '../generated/fs_exchanges/Events'
import { Exchange } from '../generated/schema'

export function handleTradeOpen(event: TradeOpen): void {
  let trade = new Exchange(event.params._tradeId.toHex())
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

