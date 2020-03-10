// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Exchange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Exchange entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Exchange entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Exchange", id.toString(), this);
  }

  static load(id: string): Exchange | null {
    return store.get("Exchange", id) as Exchange | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tradeId(): BigInt {
    let value = this.get("tradeId");
    return value.toBigInt();
  }

  set tradeId(value: BigInt) {
    this.set("tradeId", Value.fromBigInt(value));
  }

  get tradeOwner(): Bytes {
    let value = this.get("tradeOwner");
    return value.toBytes();
  }

  set tradeOwner(value: Bytes) {
    this.set("tradeOwner", Value.fromBytes(value));
  }

  get isLong(): boolean {
    let value = this.get("isLong");
    return value.toBoolean();
  }

  set isLong(value: boolean) {
    this.set("isLong", Value.fromBoolean(value));
  }

  get collateral(): BigInt {
    let value = this.get("collateral");
    return value.toBigInt();
  }

  set collateral(value: BigInt) {
    this.set("collateral", Value.fromBigInt(value));
  }

  get leverage(): BigInt {
    let value = this.get("leverage");
    return value.toBigInt();
  }

  set leverage(value: BigInt) {
    this.set("leverage", Value.fromBigInt(value));
  }

  get assetPrice(): BigInt {
    let value = this.get("assetPrice");
    return value.toBigInt();
  }

  set assetPrice(value: BigInt) {
    this.set("assetPrice", Value.fromBigInt(value));
  }

  get stablePrice(): BigInt {
    let value = this.get("stablePrice");
    return value.toBigInt();
  }

  set stablePrice(value: BigInt) {
    this.set("stablePrice", Value.fromBigInt(value));
  }

  get openFee(): BigInt {
    let value = this.get("openFee");
    return value.toBigInt();
  }

  set openFee(value: BigInt) {
    this.set("openFee", Value.fromBigInt(value));
  }

  get oracleRoundId(): BigInt {
    let value = this.get("oracleRoundId");
    return value.toBigInt();
  }

  set oracleRoundId(value: BigInt) {
    this.set("oracleRoundId", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get referral(): Bytes {
    let value = this.get("referral");
    return value.toBytes();
  }

  set referral(value: Bytes) {
    this.set("referral", Value.fromBytes(value));
  }
}
