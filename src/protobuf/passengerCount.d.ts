import * as $protobuf from "protobufjs";
/** Namespace passengerCount. */
export namespace passengerCount {
  /** Properties of a Data. */
  interface IData {
    /** Data SchemaVersion */
    SchemaVersion: number;

    /** Data topic */
    topic?: string | null;

    /** Data payload */
    payload: passengerCount.IPayload;

    /** Data receivedAt */
    receivedAt?: number | Long | null;
  }

  /** Represents a Data. */
  class Data implements IData {
    /**
     * Constructs a new Data.
     * @param [properties] Properties to set
     */
    constructor(properties?: passengerCount.IData);

    /** Data SchemaVersion. */
    public SchemaVersion: number;

    /** Data topic. */
    public topic: string;

    /** Data payload. */
    public payload: passengerCount.IPayload;

    /** Data receivedAt. */
    public receivedAt: number | Long;

    /**
     * Creates a new Data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Data instance
     */
    public static create(
      properties?: passengerCount.IData
    ): passengerCount.Data;

    /**
     * Encodes the specified Data message. Does not implicitly {@link passengerCount.Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: passengerCount.IData,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Data message, length delimited. Does not implicitly {@link passengerCount.Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: passengerCount.IData,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): passengerCount.Data;

    /**
     * Decodes a Data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): passengerCount.Data;

    /**
     * Verifies a Data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Data
     */
    public static fromObject(object: { [k: string]: any }): passengerCount.Data;

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @param message Data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: passengerCount.Data,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a Payload. */
  interface IPayload {
    /** Payload desi */
    desi?: string | null;

    /** Payload dir */
    dir?: string | null;

    /** Payload oper */
    oper?: number | null;

    /** Payload veh */
    veh?: number | null;

    /** Payload tst */
    tst?: number | Long | null;

    /** Payload tsi */
    tsi?: number | Long | null;

    /** Payload lat */
    lat?: number | null;

    /** Payload long */
    long?: number | null;

    /** Payload odo */
    odo?: number | null;

    /** Payload oday */
    oday?: string | null;

    /** Payload jrn */
    jrn?: number | null;

    /** Payload line */
    line?: number | null;

    /** Payload start */
    start?: string | null;

    /** Payload loc */
    loc?: string | null;

    /** Payload stop */
    stop?: number | null;

    /** Payload route */
    route?: string | null;

    /** Payload vehicleCounts */
    vehicleCounts?: passengerCount.IVehicleCounts | null;
  }

  /** Represents a Payload. */
  class Payload implements IPayload {
    /**
     * Constructs a new Payload.
     * @param [properties] Properties to set
     */
    constructor(properties?: passengerCount.IPayload);

    /** Payload desi. */
    public desi: string;

    /** Payload dir. */
    public dir: string;

    /** Payload oper. */
    public oper: number;

    /** Payload veh. */
    public veh: number;

    /** Payload tst. */
    public tst: number | Long;

    /** Payload tsi. */
    public tsi: number | Long;

    /** Payload lat. */
    public lat: number;

    /** Payload long. */
    public long: number;

    /** Payload odo. */
    public odo: number;

    /** Payload oday. */
    public oday: string;

    /** Payload jrn. */
    public jrn: number;

    /** Payload line. */
    public line: number;

    /** Payload start. */
    public start: string;

    /** Payload loc. */
    public loc: string;

    /** Payload stop. */
    public stop: number;

    /** Payload route. */
    public route: string;

    /** Payload vehicleCounts. */
    public vehicleCounts?: passengerCount.IVehicleCounts | null;

    /**
     * Creates a new Payload instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Payload instance
     */
    public static create(
      properties?: passengerCount.IPayload
    ): passengerCount.Payload;

    /**
     * Encodes the specified Payload message. Does not implicitly {@link passengerCount.Payload.verify|verify} messages.
     * @param message Payload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: passengerCount.IPayload,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Payload message, length delimited. Does not implicitly {@link passengerCount.Payload.verify|verify} messages.
     * @param message Payload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: passengerCount.IPayload,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Payload message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Payload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): passengerCount.Payload;

    /**
     * Decodes a Payload message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Payload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): passengerCount.Payload;

    /**
     * Verifies a Payload message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Payload message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Payload
     */
    public static fromObject(object: {
      [k: string]: any;
    }): passengerCount.Payload;

    /**
     * Creates a plain object from a Payload message. Also converts values to other types if specified.
     * @param message Payload
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: passengerCount.Payload,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Payload to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a VehicleCounts. */
  interface IVehicleCounts {
    /** VehicleCounts countQuality */
    countQuality?: string | null;

    /** VehicleCounts vehicleLoad */
    vehicleLoad?: number | null;

    /** VehicleCounts vehicleLoadRatio */
    vehicleLoadRatio?: number | null;

    /** VehicleCounts doorCounts */
    doorCounts?: passengerCount.IDoorCount[] | null;

    /** VehicleCounts extensions */
    extensions?: string | null;
  }

  /** Represents a VehicleCounts. */
  class VehicleCounts implements IVehicleCounts {
    /**
     * Constructs a new VehicleCounts.
     * @param [properties] Properties to set
     */
    constructor(properties?: passengerCount.IVehicleCounts);

    /** VehicleCounts countQuality. */
    public countQuality: string;

    /** VehicleCounts vehicleLoad. */
    public vehicleLoad: number;

    /** VehicleCounts vehicleLoadRatio. */
    public vehicleLoadRatio: number;

    /** VehicleCounts doorCounts. */
    public doorCounts: passengerCount.IDoorCount[];

    /** VehicleCounts extensions. */
    public extensions: string;

    /**
     * Creates a new VehicleCounts instance using the specified properties.
     * @param [properties] Properties to set
     * @returns VehicleCounts instance
     */
    public static create(
      properties?: passengerCount.IVehicleCounts
    ): passengerCount.VehicleCounts;

    /**
     * Encodes the specified VehicleCounts message. Does not implicitly {@link passengerCount.VehicleCounts.verify|verify} messages.
     * @param message VehicleCounts message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: passengerCount.IVehicleCounts,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified VehicleCounts message, length delimited. Does not implicitly {@link passengerCount.VehicleCounts.verify|verify} messages.
     * @param message VehicleCounts message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: passengerCount.IVehicleCounts,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a VehicleCounts message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns VehicleCounts
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): passengerCount.VehicleCounts;

    /**
     * Decodes a VehicleCounts message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns VehicleCounts
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): passengerCount.VehicleCounts;

    /**
     * Verifies a VehicleCounts message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a VehicleCounts message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns VehicleCounts
     */
    public static fromObject(object: {
      [k: string]: any;
    }): passengerCount.VehicleCounts;

    /**
     * Creates a plain object from a VehicleCounts message. Also converts values to other types if specified.
     * @param message VehicleCounts
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: passengerCount.VehicleCounts,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this VehicleCounts to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a DoorCount. */
  interface IDoorCount {
    /** DoorCount door */
    door?: string | null;

    /** DoorCount count */
    count?: passengerCount.ICount[] | null;
  }

  /** Represents a DoorCount. */
  class DoorCount implements IDoorCount {
    /**
     * Constructs a new DoorCount.
     * @param [properties] Properties to set
     */
    constructor(properties?: passengerCount.IDoorCount);

    /** DoorCount door. */
    public door: string;

    /** DoorCount count. */
    public count: passengerCount.ICount[];

    /**
     * Creates a new DoorCount instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DoorCount instance
     */
    public static create(
      properties?: passengerCount.IDoorCount
    ): passengerCount.DoorCount;

    /**
     * Encodes the specified DoorCount message. Does not implicitly {@link passengerCount.DoorCount.verify|verify} messages.
     * @param message DoorCount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: passengerCount.IDoorCount,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified DoorCount message, length delimited. Does not implicitly {@link passengerCount.DoorCount.verify|verify} messages.
     * @param message DoorCount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: passengerCount.IDoorCount,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a DoorCount message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DoorCount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): passengerCount.DoorCount;

    /**
     * Decodes a DoorCount message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DoorCount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): passengerCount.DoorCount;

    /**
     * Verifies a DoorCount message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DoorCount message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DoorCount
     */
    public static fromObject(object: {
      [k: string]: any;
    }): passengerCount.DoorCount;

    /**
     * Creates a plain object from a DoorCount message. Also converts values to other types if specified.
     * @param message DoorCount
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: passengerCount.DoorCount,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this DoorCount to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }

  /** Properties of a Count. */
  interface ICount {
    /** Count clazz */
    clazz?: string | null;

    /** Count in */
    in?: number | null;

    /** Count out */
    out?: number | null;
  }

  /** Represents a Count. */
  class Count implements ICount {
    /**
     * Constructs a new Count.
     * @param [properties] Properties to set
     */
    constructor(properties?: passengerCount.ICount);

    /** Count clazz. */
    public clazz: string;

    /** Count in. */
    public in: number;

    /** Count out. */
    public out: number;

    /**
     * Creates a new Count instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Count instance
     */
    public static create(
      properties?: passengerCount.ICount
    ): passengerCount.Count;

    /**
     * Encodes the specified Count message. Does not implicitly {@link passengerCount.Count.verify|verify} messages.
     * @param message Count message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: passengerCount.ICount,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Count message, length delimited. Does not implicitly {@link passengerCount.Count.verify|verify} messages.
     * @param message Count message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: passengerCount.ICount,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Count message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Count
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): passengerCount.Count;

    /**
     * Decodes a Count message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Count
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): passengerCount.Count;

    /**
     * Verifies a Count message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Count message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Count
     */
    public static fromObject(object: {
      [k: string]: any;
    }): passengerCount.Count;

    /**
     * Creates a plain object from a Count message. Also converts values to other types if specified.
     * @param message Count
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: passengerCount.Count,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Count to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
  }
}
