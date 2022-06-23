/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const passengerCount = ($root.passengerCount = (() => {
  /**
   * Namespace passengerCount.
   * @exports passengerCount
   * @namespace
   */
  const passengerCount = {};

  passengerCount.Data = (function () {
    /**
     * Properties of a Data.
     * @memberof passengerCount
     * @interface IData
     * @property {number} SchemaVersion Data SchemaVersion
     * @property {string|null} [topic] Data topic
     * @property {passengerCount.IPayload} payload Data payload
     * @property {number|Long|null} [receivedAt] Data receivedAt
     */

    /**
     * Constructs a new Data.
     * @memberof passengerCount
     * @classdesc Represents a Data.
     * @implements IData
     * @constructor
     * @param {passengerCount.IData=} [properties] Properties to set
     */
    function Data(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Data SchemaVersion.
     * @member {number} SchemaVersion
     * @memberof passengerCount.Data
     * @instance
     */
    Data.prototype.SchemaVersion = 1;

    /**
     * Data topic.
     * @member {string} topic
     * @memberof passengerCount.Data
     * @instance
     */
    Data.prototype.topic = "";

    /**
     * Data payload.
     * @member {passengerCount.IPayload} payload
     * @memberof passengerCount.Data
     * @instance
     */
    Data.prototype.payload = null;

    /**
     * Data receivedAt.
     * @member {number|Long} receivedAt
     * @memberof passengerCount.Data
     * @instance
     */
    Data.prototype.receivedAt = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * Creates a new Data instance using the specified properties.
     * @function create
     * @memberof passengerCount.Data
     * @static
     * @param {passengerCount.IData=} [properties] Properties to set
     * @returns {passengerCount.Data} Data instance
     */
    Data.create = function create(properties) {
      return new Data(properties);
    };

    /**
     * Encodes the specified Data message. Does not implicitly {@link passengerCount.Data.verify|verify} messages.
     * @function encode
     * @memberof passengerCount.Data
     * @static
     * @param {passengerCount.IData} message Data message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.SchemaVersion);
      if (message.topic != null && Object.hasOwnProperty.call(message, "topic"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.topic);
      $root.passengerCount.Payload.encode(
        message.payload,
        writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
      ).ldelim();
      if (
        message.receivedAt != null &&
        Object.hasOwnProperty.call(message, "receivedAt")
      )
        writer.uint32(/* id 4, wireType 0 =*/ 32).int64(message.receivedAt);
      return writer;
    };

    /**
     * Encodes the specified Data message, length delimited. Does not implicitly {@link passengerCount.Data.verify|verify} messages.
     * @function encodeDelimited
     * @memberof passengerCount.Data
     * @static
     * @param {passengerCount.IData} message Data message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof passengerCount.Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {passengerCount.Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.passengerCount.Data();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.SchemaVersion = reader.int32();
            break;
          case 2:
            message.topic = reader.string();
            break;
          case 3:
            message.payload = $root.passengerCount.Payload.decode(
              reader,
              reader.uint32()
            );
            break;
          case 4:
            message.receivedAt = reader.int64();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      if (!message.hasOwnProperty("SchemaVersion"))
        throw $util.ProtocolError("missing required 'SchemaVersion'", {
          instance: message,
        });
      if (!message.hasOwnProperty("payload"))
        throw $util.ProtocolError("missing required 'payload'", {
          instance: message,
        });
      return message;
    };

    /**
     * Decodes a Data message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof passengerCount.Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {passengerCount.Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Data message.
     * @function verify
     * @memberof passengerCount.Data
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Data.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (!$util.isInteger(message.SchemaVersion))
        return "SchemaVersion: integer expected";
      if (message.topic != null && message.hasOwnProperty("topic"))
        if (!$util.isString(message.topic)) return "topic: string expected";
      {
        let error = $root.passengerCount.Payload.verify(message.payload);
        if (error) return "payload." + error;
      }
      if (message.receivedAt != null && message.hasOwnProperty("receivedAt"))
        if (
          !$util.isInteger(message.receivedAt) &&
          !(
            message.receivedAt &&
            $util.isInteger(message.receivedAt.low) &&
            $util.isInteger(message.receivedAt.high)
          )
        )
          return "receivedAt: integer|Long expected";
      return null;
    };

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof passengerCount.Data
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {passengerCount.Data} Data
     */
    Data.fromObject = function fromObject(object) {
      if (object instanceof $root.passengerCount.Data) return object;
      let message = new $root.passengerCount.Data();
      if (object.SchemaVersion != null)
        message.SchemaVersion = object.SchemaVersion | 0;
      if (object.topic != null) message.topic = String(object.topic);
      if (object.payload != null) {
        if (typeof object.payload !== "object")
          throw TypeError(".passengerCount.Data.payload: object expected");
        message.payload = $root.passengerCount.Payload.fromObject(
          object.payload
        );
      }
      if (object.receivedAt != null)
        if ($util.Long)
          (message.receivedAt = $util.Long.fromValue(
            object.receivedAt
          )).unsigned = false;
        else if (typeof object.receivedAt === "string")
          message.receivedAt = parseInt(object.receivedAt, 10);
        else if (typeof object.receivedAt === "number")
          message.receivedAt = object.receivedAt;
        else if (typeof object.receivedAt === "object")
          message.receivedAt = new $util.LongBits(
            object.receivedAt.low >>> 0,
            object.receivedAt.high >>> 0
          ).toNumber();
      return message;
    };

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @function toObject
     * @memberof passengerCount.Data
     * @static
     * @param {passengerCount.Data} message Data
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Data.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.SchemaVersion = 1;
        object.topic = "";
        object.payload = null;
        if ($util.Long) {
          let long = new $util.Long(0, 0, false);
          object.receivedAt =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.receivedAt = options.longs === String ? "0" : 0;
      }
      if (
        message.SchemaVersion != null &&
        message.hasOwnProperty("SchemaVersion")
      )
        object.SchemaVersion = message.SchemaVersion;
      if (message.topic != null && message.hasOwnProperty("topic"))
        object.topic = message.topic;
      if (message.payload != null && message.hasOwnProperty("payload"))
        object.payload = $root.passengerCount.Payload.toObject(
          message.payload,
          options
        );
      if (message.receivedAt != null && message.hasOwnProperty("receivedAt"))
        if (typeof message.receivedAt === "number")
          object.receivedAt =
            options.longs === String
              ? String(message.receivedAt)
              : message.receivedAt;
        else
          object.receivedAt =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.receivedAt)
              : options.longs === Number
              ? new $util.LongBits(
                  message.receivedAt.low >>> 0,
                  message.receivedAt.high >>> 0
                ).toNumber()
              : message.receivedAt;
      return object;
    };

    /**
     * Converts this Data to JSON.
     * @function toJSON
     * @memberof passengerCount.Data
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Data.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Data;
  })();

  passengerCount.Payload = (function () {
    /**
     * Properties of a Payload.
     * @memberof passengerCount
     * @interface IPayload
     * @property {string|null} [desi] Payload desi
     * @property {string|null} [dir] Payload dir
     * @property {number|null} [oper] Payload oper
     * @property {number|null} [veh] Payload veh
     * @property {number|Long|null} [tst] Payload tst
     * @property {number|Long|null} [tsi] Payload tsi
     * @property {number|null} [lat] Payload lat
     * @property {number|null} [long] Payload long
     * @property {number|null} [odo] Payload odo
     * @property {string|null} [oday] Payload oday
     * @property {number|null} [jrn] Payload jrn
     * @property {number|null} [line] Payload line
     * @property {string|null} [start] Payload start
     * @property {string|null} [loc] Payload loc
     * @property {number|null} [stop] Payload stop
     * @property {string|null} [route] Payload route
     * @property {passengerCount.IVehicleCounts|null} [vehicleCounts] Payload vehicleCounts
     */

    /**
     * Constructs a new Payload.
     * @memberof passengerCount
     * @classdesc Represents a Payload.
     * @implements IPayload
     * @constructor
     * @param {passengerCount.IPayload=} [properties] Properties to set
     */
    function Payload(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Payload desi.
     * @member {string} desi
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.desi = "";

    /**
     * Payload dir.
     * @member {string} dir
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.dir = "";

    /**
     * Payload oper.
     * @member {number} oper
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.oper = 0;

    /**
     * Payload veh.
     * @member {number} veh
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.veh = 0;

    /**
     * Payload tst.
     * @member {number|Long} tst
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.tst = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * Payload tsi.
     * @member {number|Long} tsi
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.tsi = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * Payload lat.
     * @member {number} lat
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.lat = 0;

    /**
     * Payload long.
     * @member {number} long
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.long = 0;

    /**
     * Payload odo.
     * @member {number} odo
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.odo = 0;

    /**
     * Payload oday.
     * @member {string} oday
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.oday = "";

    /**
     * Payload jrn.
     * @member {number} jrn
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.jrn = 0;

    /**
     * Payload line.
     * @member {number} line
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.line = 0;

    /**
     * Payload start.
     * @member {string} start
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.start = "";

    /**
     * Payload loc.
     * @member {string} loc
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.loc = "";

    /**
     * Payload stop.
     * @member {number} stop
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.stop = 0;

    /**
     * Payload route.
     * @member {string} route
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.route = "";

    /**
     * Payload vehicleCounts.
     * @member {passengerCount.IVehicleCounts|null|undefined} vehicleCounts
     * @memberof passengerCount.Payload
     * @instance
     */
    Payload.prototype.vehicleCounts = null;

    /**
     * Creates a new Payload instance using the specified properties.
     * @function create
     * @memberof passengerCount.Payload
     * @static
     * @param {passengerCount.IPayload=} [properties] Properties to set
     * @returns {passengerCount.Payload} Payload instance
     */
    Payload.create = function create(properties) {
      return new Payload(properties);
    };

    /**
     * Encodes the specified Payload message. Does not implicitly {@link passengerCount.Payload.verify|verify} messages.
     * @function encode
     * @memberof passengerCount.Payload
     * @static
     * @param {passengerCount.IPayload} message Payload message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Payload.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.desi != null && Object.hasOwnProperty.call(message, "desi"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.desi);
      if (message.dir != null && Object.hasOwnProperty.call(message, "dir"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.dir);
      if (message.oper != null && Object.hasOwnProperty.call(message, "oper"))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.oper);
      if (message.veh != null && Object.hasOwnProperty.call(message, "veh"))
        writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.veh);
      if (message.tst != null && Object.hasOwnProperty.call(message, "tst"))
        writer.uint32(/* id 5, wireType 0 =*/ 40).int64(message.tst);
      if (message.tsi != null && Object.hasOwnProperty.call(message, "tsi"))
        writer.uint32(/* id 6, wireType 0 =*/ 48).int64(message.tsi);
      if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
        writer.uint32(/* id 7, wireType 1 =*/ 57).double(message.lat);
      if (message.long != null && Object.hasOwnProperty.call(message, "long"))
        writer.uint32(/* id 8, wireType 1 =*/ 65).double(message.long);
      if (message.odo != null && Object.hasOwnProperty.call(message, "odo"))
        writer.uint32(/* id 9, wireType 1 =*/ 73).double(message.odo);
      if (message.oday != null && Object.hasOwnProperty.call(message, "oday"))
        writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.oday);
      if (message.jrn != null && Object.hasOwnProperty.call(message, "jrn"))
        writer.uint32(/* id 11, wireType 0 =*/ 88).int32(message.jrn);
      if (message.line != null && Object.hasOwnProperty.call(message, "line"))
        writer.uint32(/* id 12, wireType 0 =*/ 96).int32(message.line);
      if (message.start != null && Object.hasOwnProperty.call(message, "start"))
        writer.uint32(/* id 13, wireType 2 =*/ 106).string(message.start);
      if (message.loc != null && Object.hasOwnProperty.call(message, "loc"))
        writer.uint32(/* id 14, wireType 2 =*/ 114).string(message.loc);
      if (message.stop != null && Object.hasOwnProperty.call(message, "stop"))
        writer.uint32(/* id 15, wireType 0 =*/ 120).int32(message.stop);
      if (message.route != null && Object.hasOwnProperty.call(message, "route"))
        writer.uint32(/* id 16, wireType 2 =*/ 130).string(message.route);
      if (
        message.vehicleCounts != null &&
        Object.hasOwnProperty.call(message, "vehicleCounts")
      )
        $root.passengerCount.VehicleCounts.encode(
          message.vehicleCounts,
          writer.uint32(/* id 17, wireType 2 =*/ 138).fork()
        ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified Payload message, length delimited. Does not implicitly {@link passengerCount.Payload.verify|verify} messages.
     * @function encodeDelimited
     * @memberof passengerCount.Payload
     * @static
     * @param {passengerCount.IPayload} message Payload message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Payload.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Payload message from the specified reader or buffer.
     * @function decode
     * @memberof passengerCount.Payload
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {passengerCount.Payload} Payload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Payload.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.passengerCount.Payload();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.desi = reader.string();
            break;
          case 2:
            message.dir = reader.string();
            break;
          case 3:
            message.oper = reader.int32();
            break;
          case 4:
            message.veh = reader.int32();
            break;
          case 5:
            message.tst = reader.int64();
            break;
          case 6:
            message.tsi = reader.int64();
            break;
          case 7:
            message.lat = reader.double();
            break;
          case 8:
            message.long = reader.double();
            break;
          case 9:
            message.odo = reader.double();
            break;
          case 10:
            message.oday = reader.string();
            break;
          case 11:
            message.jrn = reader.int32();
            break;
          case 12:
            message.line = reader.int32();
            break;
          case 13:
            message.start = reader.string();
            break;
          case 14:
            message.loc = reader.string();
            break;
          case 15:
            message.stop = reader.int32();
            break;
          case 16:
            message.route = reader.string();
            break;
          case 17:
            message.vehicleCounts = $root.passengerCount.VehicleCounts.decode(
              reader,
              reader.uint32()
            );
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Payload message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof passengerCount.Payload
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {passengerCount.Payload} Payload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Payload.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Payload message.
     * @function verify
     * @memberof passengerCount.Payload
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Payload.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.desi != null && message.hasOwnProperty("desi"))
        if (!$util.isString(message.desi)) return "desi: string expected";
      if (message.dir != null && message.hasOwnProperty("dir"))
        if (!$util.isString(message.dir)) return "dir: string expected";
      if (message.oper != null && message.hasOwnProperty("oper"))
        if (!$util.isInteger(message.oper)) return "oper: integer expected";
      if (message.veh != null && message.hasOwnProperty("veh"))
        if (!$util.isInteger(message.veh)) return "veh: integer expected";
      if (message.tst != null && message.hasOwnProperty("tst"))
        if (
          !$util.isInteger(message.tst) &&
          !(
            message.tst &&
            $util.isInteger(message.tst.low) &&
            $util.isInteger(message.tst.high)
          )
        )
          return "tst: integer|Long expected";
      if (message.tsi != null && message.hasOwnProperty("tsi"))
        if (
          !$util.isInteger(message.tsi) &&
          !(
            message.tsi &&
            $util.isInteger(message.tsi.low) &&
            $util.isInteger(message.tsi.high)
          )
        )
          return "tsi: integer|Long expected";
      if (message.lat != null && message.hasOwnProperty("lat"))
        if (typeof message.lat !== "number") return "lat: number expected";
      if (message.long != null && message.hasOwnProperty("long"))
        if (typeof message.long !== "number") return "long: number expected";
      if (message.odo != null && message.hasOwnProperty("odo"))
        if (typeof message.odo !== "number") return "odo: number expected";
      if (message.oday != null && message.hasOwnProperty("oday"))
        if (!$util.isString(message.oday)) return "oday: string expected";
      if (message.jrn != null && message.hasOwnProperty("jrn"))
        if (!$util.isInteger(message.jrn)) return "jrn: integer expected";
      if (message.line != null && message.hasOwnProperty("line"))
        if (!$util.isInteger(message.line)) return "line: integer expected";
      if (message.start != null && message.hasOwnProperty("start"))
        if (!$util.isString(message.start)) return "start: string expected";
      if (message.loc != null && message.hasOwnProperty("loc"))
        if (!$util.isString(message.loc)) return "loc: string expected";
      if (message.stop != null && message.hasOwnProperty("stop"))
        if (!$util.isInteger(message.stop)) return "stop: integer expected";
      if (message.route != null && message.hasOwnProperty("route"))
        if (!$util.isString(message.route)) return "route: string expected";
      if (
        message.vehicleCounts != null &&
        message.hasOwnProperty("vehicleCounts")
      ) {
        let error = $root.passengerCount.VehicleCounts.verify(
          message.vehicleCounts
        );
        if (error) return "vehicleCounts." + error;
      }
      return null;
    };

    /**
     * Creates a Payload message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof passengerCount.Payload
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {passengerCount.Payload} Payload
     */
    Payload.fromObject = function fromObject(object) {
      if (object instanceof $root.passengerCount.Payload) return object;
      let message = new $root.passengerCount.Payload();
      if (object.desi != null) message.desi = String(object.desi);
      if (object.dir != null) message.dir = String(object.dir);
      if (object.oper != null) message.oper = object.oper | 0;
      if (object.veh != null) message.veh = object.veh | 0;
      if (object.tst != null)
        if ($util.Long)
          (message.tst = $util.Long.fromValue(object.tst)).unsigned = false;
        else if (typeof object.tst === "string")
          message.tst = parseInt(object.tst, 10);
        else if (typeof object.tst === "number") message.tst = object.tst;
        else if (typeof object.tst === "object")
          message.tst = new $util.LongBits(
            object.tst.low >>> 0,
            object.tst.high >>> 0
          ).toNumber();
      if (object.tsi != null)
        if ($util.Long)
          (message.tsi = $util.Long.fromValue(object.tsi)).unsigned = false;
        else if (typeof object.tsi === "string")
          message.tsi = parseInt(object.tsi, 10);
        else if (typeof object.tsi === "number") message.tsi = object.tsi;
        else if (typeof object.tsi === "object")
          message.tsi = new $util.LongBits(
            object.tsi.low >>> 0,
            object.tsi.high >>> 0
          ).toNumber();
      if (object.lat != null) message.lat = Number(object.lat);
      if (object.long != null) message.long = Number(object.long);
      if (object.odo != null) message.odo = Number(object.odo);
      if (object.oday != null) message.oday = String(object.oday);
      if (object.jrn != null) message.jrn = object.jrn | 0;
      if (object.line != null) message.line = object.line | 0;
      if (object.start != null) message.start = String(object.start);
      if (object.loc != null) message.loc = String(object.loc);
      if (object.stop != null) message.stop = object.stop | 0;
      if (object.route != null) message.route = String(object.route);
      if (object.vehicleCounts != null) {
        if (typeof object.vehicleCounts !== "object")
          throw TypeError(
            ".passengerCount.Payload.vehicleCounts: object expected"
          );
        message.vehicleCounts = $root.passengerCount.VehicleCounts.fromObject(
          object.vehicleCounts
        );
      }
      return message;
    };

    /**
     * Creates a plain object from a Payload message. Also converts values to other types if specified.
     * @function toObject
     * @memberof passengerCount.Payload
     * @static
     * @param {passengerCount.Payload} message Payload
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Payload.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.desi = "";
        object.dir = "";
        object.oper = 0;
        object.veh = 0;
        if ($util.Long) {
          let long = new $util.Long(0, 0, false);
          object.tst =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.tst = options.longs === String ? "0" : 0;
        if ($util.Long) {
          let long = new $util.Long(0, 0, false);
          object.tsi =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.tsi = options.longs === String ? "0" : 0;
        object.lat = 0;
        object.long = 0;
        object.odo = 0;
        object.oday = "";
        object.jrn = 0;
        object.line = 0;
        object.start = "";
        object.loc = "";
        object.stop = 0;
        object.route = "";
        object.vehicleCounts = null;
      }
      if (message.desi != null && message.hasOwnProperty("desi"))
        object.desi = message.desi;
      if (message.dir != null && message.hasOwnProperty("dir"))
        object.dir = message.dir;
      if (message.oper != null && message.hasOwnProperty("oper"))
        object.oper = message.oper;
      if (message.veh != null && message.hasOwnProperty("veh"))
        object.veh = message.veh;
      if (message.tst != null && message.hasOwnProperty("tst"))
        if (typeof message.tst === "number")
          object.tst =
            options.longs === String ? String(message.tst) : message.tst;
        else
          object.tst =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.tst)
              : options.longs === Number
              ? new $util.LongBits(
                  message.tst.low >>> 0,
                  message.tst.high >>> 0
                ).toNumber()
              : message.tst;
      if (message.tsi != null && message.hasOwnProperty("tsi"))
        if (typeof message.tsi === "number")
          object.tsi =
            options.longs === String ? String(message.tsi) : message.tsi;
        else
          object.tsi =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.tsi)
              : options.longs === Number
              ? new $util.LongBits(
                  message.tsi.low >>> 0,
                  message.tsi.high >>> 0
                ).toNumber()
              : message.tsi;
      if (message.lat != null && message.hasOwnProperty("lat"))
        object.lat =
          options.json && !isFinite(message.lat)
            ? String(message.lat)
            : message.lat;
      if (message.long != null && message.hasOwnProperty("long"))
        object.long =
          options.json && !isFinite(message.long)
            ? String(message.long)
            : message.long;
      if (message.odo != null && message.hasOwnProperty("odo"))
        object.odo =
          options.json && !isFinite(message.odo)
            ? String(message.odo)
            : message.odo;
      if (message.oday != null && message.hasOwnProperty("oday"))
        object.oday = message.oday;
      if (message.jrn != null && message.hasOwnProperty("jrn"))
        object.jrn = message.jrn;
      if (message.line != null && message.hasOwnProperty("line"))
        object.line = message.line;
      if (message.start != null && message.hasOwnProperty("start"))
        object.start = message.start;
      if (message.loc != null && message.hasOwnProperty("loc"))
        object.loc = message.loc;
      if (message.stop != null && message.hasOwnProperty("stop"))
        object.stop = message.stop;
      if (message.route != null && message.hasOwnProperty("route"))
        object.route = message.route;
      if (
        message.vehicleCounts != null &&
        message.hasOwnProperty("vehicleCounts")
      )
        object.vehicleCounts = $root.passengerCount.VehicleCounts.toObject(
          message.vehicleCounts,
          options
        );
      return object;
    };

    /**
     * Converts this Payload to JSON.
     * @function toJSON
     * @memberof passengerCount.Payload
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Payload.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Payload;
  })();

  passengerCount.VehicleCounts = (function () {
    /**
     * Properties of a VehicleCounts.
     * @memberof passengerCount
     * @interface IVehicleCounts
     * @property {string|null} [countQuality] VehicleCounts countQuality
     * @property {number|null} [vehicleLoad] VehicleCounts vehicleLoad
     * @property {number|null} [vehicleLoadRatio] VehicleCounts vehicleLoadRatio
     * @property {Array.<passengerCount.IDoorCount>|null} [doorCounts] VehicleCounts doorCounts
     * @property {string|null} [extensions] VehicleCounts extensions
     */

    /**
     * Constructs a new VehicleCounts.
     * @memberof passengerCount
     * @classdesc Represents a VehicleCounts.
     * @implements IVehicleCounts
     * @constructor
     * @param {passengerCount.IVehicleCounts=} [properties] Properties to set
     */
    function VehicleCounts(properties) {
      this.doorCounts = [];
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * VehicleCounts countQuality.
     * @member {string} countQuality
     * @memberof passengerCount.VehicleCounts
     * @instance
     */
    VehicleCounts.prototype.countQuality = "";

    /**
     * VehicleCounts vehicleLoad.
     * @member {number} vehicleLoad
     * @memberof passengerCount.VehicleCounts
     * @instance
     */
    VehicleCounts.prototype.vehicleLoad = 0;

    /**
     * VehicleCounts vehicleLoadRatio.
     * @member {number} vehicleLoadRatio
     * @memberof passengerCount.VehicleCounts
     * @instance
     */
    VehicleCounts.prototype.vehicleLoadRatio = 0;

    /**
     * VehicleCounts doorCounts.
     * @member {Array.<passengerCount.IDoorCount>} doorCounts
     * @memberof passengerCount.VehicleCounts
     * @instance
     */
    VehicleCounts.prototype.doorCounts = $util.emptyArray;

    /**
     * VehicleCounts extensions.
     * @member {string} extensions
     * @memberof passengerCount.VehicleCounts
     * @instance
     */
    VehicleCounts.prototype.extensions = "";

    /**
     * Creates a new VehicleCounts instance using the specified properties.
     * @function create
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {passengerCount.IVehicleCounts=} [properties] Properties to set
     * @returns {passengerCount.VehicleCounts} VehicleCounts instance
     */
    VehicleCounts.create = function create(properties) {
      return new VehicleCounts(properties);
    };

    /**
     * Encodes the specified VehicleCounts message. Does not implicitly {@link passengerCount.VehicleCounts.verify|verify} messages.
     * @function encode
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {passengerCount.IVehicleCounts} message VehicleCounts message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VehicleCounts.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.countQuality != null &&
        Object.hasOwnProperty.call(message, "countQuality")
      )
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.countQuality);
      if (
        message.vehicleLoad != null &&
        Object.hasOwnProperty.call(message, "vehicleLoad")
      )
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.vehicleLoad);
      if (
        message.vehicleLoadRatio != null &&
        Object.hasOwnProperty.call(message, "vehicleLoadRatio")
      )
        writer
          .uint32(/* id 3, wireType 1 =*/ 25)
          .double(message.vehicleLoadRatio);
      if (message.doorCounts != null && message.doorCounts.length)
        for (let i = 0; i < message.doorCounts.length; ++i)
          $root.passengerCount.DoorCount.encode(
            message.doorCounts[i],
            writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
          ).ldelim();
      if (
        message.extensions != null &&
        Object.hasOwnProperty.call(message, "extensions")
      )
        writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.extensions);
      return writer;
    };

    /**
     * Encodes the specified VehicleCounts message, length delimited. Does not implicitly {@link passengerCount.VehicleCounts.verify|verify} messages.
     * @function encodeDelimited
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {passengerCount.IVehicleCounts} message VehicleCounts message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VehicleCounts.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a VehicleCounts message from the specified reader or buffer.
     * @function decode
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {passengerCount.VehicleCounts} VehicleCounts
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VehicleCounts.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.passengerCount.VehicleCounts();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.countQuality = reader.string();
            break;
          case 2:
            message.vehicleLoad = reader.int32();
            break;
          case 3:
            message.vehicleLoadRatio = reader.double();
            break;
          case 4:
            if (!(message.doorCounts && message.doorCounts.length))
              message.doorCounts = [];
            message.doorCounts.push(
              $root.passengerCount.DoorCount.decode(reader, reader.uint32())
            );
            break;
          case 5:
            message.extensions = reader.string();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a VehicleCounts message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {passengerCount.VehicleCounts} VehicleCounts
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VehicleCounts.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a VehicleCounts message.
     * @function verify
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    VehicleCounts.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (
        message.countQuality != null &&
        message.hasOwnProperty("countQuality")
      )
        if (!$util.isString(message.countQuality))
          return "countQuality: string expected";
      if (message.vehicleLoad != null && message.hasOwnProperty("vehicleLoad"))
        if (!$util.isInteger(message.vehicleLoad))
          return "vehicleLoad: integer expected";
      if (
        message.vehicleLoadRatio != null &&
        message.hasOwnProperty("vehicleLoadRatio")
      )
        if (typeof message.vehicleLoadRatio !== "number")
          return "vehicleLoadRatio: number expected";
      if (message.doorCounts != null && message.hasOwnProperty("doorCounts")) {
        if (!Array.isArray(message.doorCounts))
          return "doorCounts: array expected";
        for (let i = 0; i < message.doorCounts.length; ++i) {
          let error = $root.passengerCount.DoorCount.verify(
            message.doorCounts[i]
          );
          if (error) return "doorCounts." + error;
        }
      }
      if (message.extensions != null && message.hasOwnProperty("extensions"))
        if (!$util.isString(message.extensions))
          return "extensions: string expected";
      return null;
    };

    /**
     * Creates a VehicleCounts message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {passengerCount.VehicleCounts} VehicleCounts
     */
    VehicleCounts.fromObject = function fromObject(object) {
      if (object instanceof $root.passengerCount.VehicleCounts) return object;
      let message = new $root.passengerCount.VehicleCounts();
      if (object.countQuality != null)
        message.countQuality = String(object.countQuality);
      if (object.vehicleLoad != null)
        message.vehicleLoad = object.vehicleLoad | 0;
      if (object.vehicleLoadRatio != null)
        message.vehicleLoadRatio = Number(object.vehicleLoadRatio);
      if (object.doorCounts) {
        if (!Array.isArray(object.doorCounts))
          throw TypeError(
            ".passengerCount.VehicleCounts.doorCounts: array expected"
          );
        message.doorCounts = [];
        for (let i = 0; i < object.doorCounts.length; ++i) {
          if (typeof object.doorCounts[i] !== "object")
            throw TypeError(
              ".passengerCount.VehicleCounts.doorCounts: object expected"
            );
          message.doorCounts[i] = $root.passengerCount.DoorCount.fromObject(
            object.doorCounts[i]
          );
        }
      }
      if (object.extensions != null)
        message.extensions = String(object.extensions);
      return message;
    };

    /**
     * Creates a plain object from a VehicleCounts message. Also converts values to other types if specified.
     * @function toObject
     * @memberof passengerCount.VehicleCounts
     * @static
     * @param {passengerCount.VehicleCounts} message VehicleCounts
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    VehicleCounts.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.arrays || options.defaults) object.doorCounts = [];
      if (options.defaults) {
        object.countQuality = "";
        object.vehicleLoad = 0;
        object.vehicleLoadRatio = 0;
        object.extensions = "";
      }
      if (
        message.countQuality != null &&
        message.hasOwnProperty("countQuality")
      )
        object.countQuality = message.countQuality;
      if (message.vehicleLoad != null && message.hasOwnProperty("vehicleLoad"))
        object.vehicleLoad = message.vehicleLoad;
      if (
        message.vehicleLoadRatio != null &&
        message.hasOwnProperty("vehicleLoadRatio")
      )
        object.vehicleLoadRatio =
          options.json && !isFinite(message.vehicleLoadRatio)
            ? String(message.vehicleLoadRatio)
            : message.vehicleLoadRatio;
      if (message.doorCounts && message.doorCounts.length) {
        object.doorCounts = [];
        for (let j = 0; j < message.doorCounts.length; ++j)
          object.doorCounts[j] = $root.passengerCount.DoorCount.toObject(
            message.doorCounts[j],
            options
          );
      }
      if (message.extensions != null && message.hasOwnProperty("extensions"))
        object.extensions = message.extensions;
      return object;
    };

    /**
     * Converts this VehicleCounts to JSON.
     * @function toJSON
     * @memberof passengerCount.VehicleCounts
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    VehicleCounts.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return VehicleCounts;
  })();

  passengerCount.DoorCount = (function () {
    /**
     * Properties of a DoorCount.
     * @memberof passengerCount
     * @interface IDoorCount
     * @property {string|null} [door] DoorCount door
     * @property {Array.<passengerCount.ICount>|null} [count] DoorCount count
     */

    /**
     * Constructs a new DoorCount.
     * @memberof passengerCount
     * @classdesc Represents a DoorCount.
     * @implements IDoorCount
     * @constructor
     * @param {passengerCount.IDoorCount=} [properties] Properties to set
     */
    function DoorCount(properties) {
      this.count = [];
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * DoorCount door.
     * @member {string} door
     * @memberof passengerCount.DoorCount
     * @instance
     */
    DoorCount.prototype.door = "";

    /**
     * DoorCount count.
     * @member {Array.<passengerCount.ICount>} count
     * @memberof passengerCount.DoorCount
     * @instance
     */
    DoorCount.prototype.count = $util.emptyArray;

    /**
     * Creates a new DoorCount instance using the specified properties.
     * @function create
     * @memberof passengerCount.DoorCount
     * @static
     * @param {passengerCount.IDoorCount=} [properties] Properties to set
     * @returns {passengerCount.DoorCount} DoorCount instance
     */
    DoorCount.create = function create(properties) {
      return new DoorCount(properties);
    };

    /**
     * Encodes the specified DoorCount message. Does not implicitly {@link passengerCount.DoorCount.verify|verify} messages.
     * @function encode
     * @memberof passengerCount.DoorCount
     * @static
     * @param {passengerCount.IDoorCount} message DoorCount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DoorCount.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.door != null && Object.hasOwnProperty.call(message, "door"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.door);
      if (message.count != null && message.count.length)
        for (let i = 0; i < message.count.length; ++i)
          $root.passengerCount.Count.encode(
            message.count[i],
            writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
          ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified DoorCount message, length delimited. Does not implicitly {@link passengerCount.DoorCount.verify|verify} messages.
     * @function encodeDelimited
     * @memberof passengerCount.DoorCount
     * @static
     * @param {passengerCount.IDoorCount} message DoorCount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DoorCount.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DoorCount message from the specified reader or buffer.
     * @function decode
     * @memberof passengerCount.DoorCount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {passengerCount.DoorCount} DoorCount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DoorCount.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.passengerCount.DoorCount();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.door = reader.string();
            break;
          case 2:
            if (!(message.count && message.count.length)) message.count = [];
            message.count.push(
              $root.passengerCount.Count.decode(reader, reader.uint32())
            );
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a DoorCount message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof passengerCount.DoorCount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {passengerCount.DoorCount} DoorCount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DoorCount.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DoorCount message.
     * @function verify
     * @memberof passengerCount.DoorCount
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DoorCount.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.door != null && message.hasOwnProperty("door"))
        if (!$util.isString(message.door)) return "door: string expected";
      if (message.count != null && message.hasOwnProperty("count")) {
        if (!Array.isArray(message.count)) return "count: array expected";
        for (let i = 0; i < message.count.length; ++i) {
          let error = $root.passengerCount.Count.verify(message.count[i]);
          if (error) return "count." + error;
        }
      }
      return null;
    };

    /**
     * Creates a DoorCount message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof passengerCount.DoorCount
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {passengerCount.DoorCount} DoorCount
     */
    DoorCount.fromObject = function fromObject(object) {
      if (object instanceof $root.passengerCount.DoorCount) return object;
      let message = new $root.passengerCount.DoorCount();
      if (object.door != null) message.door = String(object.door);
      if (object.count) {
        if (!Array.isArray(object.count))
          throw TypeError(".passengerCount.DoorCount.count: array expected");
        message.count = [];
        for (let i = 0; i < object.count.length; ++i) {
          if (typeof object.count[i] !== "object")
            throw TypeError(".passengerCount.DoorCount.count: object expected");
          message.count[i] = $root.passengerCount.Count.fromObject(
            object.count[i]
          );
        }
      }
      return message;
    };

    /**
     * Creates a plain object from a DoorCount message. Also converts values to other types if specified.
     * @function toObject
     * @memberof passengerCount.DoorCount
     * @static
     * @param {passengerCount.DoorCount} message DoorCount
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DoorCount.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.arrays || options.defaults) object.count = [];
      if (options.defaults) object.door = "";
      if (message.door != null && message.hasOwnProperty("door"))
        object.door = message.door;
      if (message.count && message.count.length) {
        object.count = [];
        for (let j = 0; j < message.count.length; ++j)
          object.count[j] = $root.passengerCount.Count.toObject(
            message.count[j],
            options
          );
      }
      return object;
    };

    /**
     * Converts this DoorCount to JSON.
     * @function toJSON
     * @memberof passengerCount.DoorCount
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DoorCount.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DoorCount;
  })();

  passengerCount.Count = (function () {
    /**
     * Properties of a Count.
     * @memberof passengerCount
     * @interface ICount
     * @property {string|null} [clazz] Count clazz
     * @property {number|null} ["in"] Count in
     * @property {number|null} [out] Count out
     */

    /**
     * Constructs a new Count.
     * @memberof passengerCount
     * @classdesc Represents a Count.
     * @implements ICount
     * @constructor
     * @param {passengerCount.ICount=} [properties] Properties to set
     */
    function Count(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Count clazz.
     * @member {string} clazz
     * @memberof passengerCount.Count
     * @instance
     */
    Count.prototype.clazz = "";

    /**
     * Count in.
     * @member {number} in
     * @memberof passengerCount.Count
     * @instance
     */
    Count.prototype["in"] = 0;

    /**
     * Count out.
     * @member {number} out
     * @memberof passengerCount.Count
     * @instance
     */
    Count.prototype.out = 0;

    /**
     * Creates a new Count instance using the specified properties.
     * @function create
     * @memberof passengerCount.Count
     * @static
     * @param {passengerCount.ICount=} [properties] Properties to set
     * @returns {passengerCount.Count} Count instance
     */
    Count.create = function create(properties) {
      return new Count(properties);
    };

    /**
     * Encodes the specified Count message. Does not implicitly {@link passengerCount.Count.verify|verify} messages.
     * @function encode
     * @memberof passengerCount.Count
     * @static
     * @param {passengerCount.ICount} message Count message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Count.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.clazz != null && Object.hasOwnProperty.call(message, "clazz"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.clazz);
      if (message["in"] != null && Object.hasOwnProperty.call(message, "in"))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message["in"]);
      if (message.out != null && Object.hasOwnProperty.call(message, "out"))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.out);
      return writer;
    };

    /**
     * Encodes the specified Count message, length delimited. Does not implicitly {@link passengerCount.Count.verify|verify} messages.
     * @function encodeDelimited
     * @memberof passengerCount.Count
     * @static
     * @param {passengerCount.ICount} message Count message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Count.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Count message from the specified reader or buffer.
     * @function decode
     * @memberof passengerCount.Count
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {passengerCount.Count} Count
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Count.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.passengerCount.Count();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.clazz = reader.string();
            break;
          case 2:
            message["in"] = reader.int32();
            break;
          case 3:
            message.out = reader.int32();
            break;
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a Count message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof passengerCount.Count
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {passengerCount.Count} Count
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Count.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Count message.
     * @function verify
     * @memberof passengerCount.Count
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Count.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.clazz != null && message.hasOwnProperty("clazz"))
        if (!$util.isString(message.clazz)) return "clazz: string expected";
      if (message["in"] != null && message.hasOwnProperty("in"))
        if (!$util.isInteger(message["in"])) return "in: integer expected";
      if (message.out != null && message.hasOwnProperty("out"))
        if (!$util.isInteger(message.out)) return "out: integer expected";
      return null;
    };

    /**
     * Creates a Count message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof passengerCount.Count
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {passengerCount.Count} Count
     */
    Count.fromObject = function fromObject(object) {
      if (object instanceof $root.passengerCount.Count) return object;
      let message = new $root.passengerCount.Count();
      if (object.clazz != null) message.clazz = String(object.clazz);
      if (object["in"] != null) message["in"] = object["in"] | 0;
      if (object.out != null) message.out = object.out | 0;
      return message;
    };

    /**
     * Creates a plain object from a Count message. Also converts values to other types if specified.
     * @function toObject
     * @memberof passengerCount.Count
     * @static
     * @param {passengerCount.Count} message Count
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Count.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.clazz = "";
        object["in"] = 0;
        object.out = 0;
      }
      if (message.clazz != null && message.hasOwnProperty("clazz"))
        object.clazz = message.clazz;
      if (message["in"] != null && message.hasOwnProperty("in"))
        object["in"] = message["in"];
      if (message.out != null && message.hasOwnProperty("out"))
        object.out = message.out;
      return object;
    };

    /**
     * Converts this Count to JSON.
     * @function toJSON
     * @memberof passengerCount.Count
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Count.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Count;
  })();

  return passengerCount;
})());

export { $root as default };
