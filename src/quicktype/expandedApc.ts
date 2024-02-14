// @ts-nocheck
// To parse this data:
//
//   import { Convert, ExpandedApcMessageNullLevel1, ExpandedApcMessageNullLevel2, ExpandedApcMessageNullLevel3, ExpandedApcMessageNullLevel4, ExpandedApcMessage } from "./file";
//
//   const expandedApcMessageNullLevel1 = Convert.toExpandedApcMessageNullLevel1(json);
//   const expandedApcMessageNullLevel2 = Convert.toExpandedApcMessageNullLevel2(json);
//   const expandedApcMessageNullLevel3 = Convert.toExpandedApcMessageNullLevel3(json);
//   const expandedApcMessageNullLevel4 = Convert.toExpandedApcMessageNullLevel4(json);
//   const expandedApcMessage = Convert.toExpandedApcMessage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ExpandedApcMessage {
  APC?: Apc;
}

export interface Apc {
  desi?: null | string;
  dir?: null | string;
  jrn?: number | null;
  lat?: number | null;
  line?: number | null;
  loc?: null | string;
  long?: number | null;
  oday?: null | string;
  odo?: number | null;
  oper?: number | null;
  route?: null | string;
  start?: null | string;
  stop?: number | null;
  tsi?: number | null;
  tst?: null | string;
  veh?: number | null;
  vehiclecounts?: Vehiclecounts | null;
}

export interface Vehiclecounts {
  countquality?: null | string;
  doorcounts?: Doorcount[] | null;
  vehicleload?: number | null;
  vehicleloadratio?: number | null;
}

export interface Doorcount {
  count?: Count[] | null;
  door?: null | string;
}

export interface Count {
  class?: null | string;
  in?: number | null;
  out?: number | null;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toExpandedApcMessage(json: string): ExpandedApcMessage {
    return cast(JSON.parse(json), r("ExpandedApcMessage"));
  }

  public static expandedApcMessageToJson(value: ExpandedApcMessage): string {
    return JSON.stringify(uncast(value, r("ExpandedApcMessage")), null, 2);
  }

  public static toApc(json: string): Apc {
    return cast(JSON.parse(json), r("Apc"));
  }

  public static apcToJson(value: Apc): string {
    return JSON.stringify(uncast(value, r("Apc")), null, 2);
  }

  public static toVehiclecounts(json: string): Vehiclecounts {
    return cast(JSON.parse(json), r("Vehiclecounts"));
  }

  public static vehiclecountsToJson(value: Vehiclecounts): string {
    return JSON.stringify(uncast(value, r("Vehiclecounts")), null, 2);
  }

  public static toDoorcount(json: string): Doorcount {
    return cast(JSON.parse(json), r("Doorcount"));
  }

  public static doorcountToJson(value: Doorcount): string {
    return JSON.stringify(uncast(value, r("Doorcount")), null, 2);
  }

  public static toCount(json: string): Count {
    return cast(JSON.parse(json), r("Count"));
  }

  public static countToJson(value: Count): string {
    return JSON.stringify(uncast(value, r("Count")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`,
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = "",
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props")
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  ExpandedApcMessage: o(
    [{ json: "APC", js: "APC", typ: u(undefined, r("Apc")) }],
    false,
  ),
  Apc: o(
    [
      { json: "desi", js: "desi", typ: u(undefined, u(null, "")) },
      { json: "dir", js: "dir", typ: u(undefined, u(null, "")) },
      { json: "jrn", js: "jrn", typ: u(undefined, u(0, null)) },
      { json: "lat", js: "lat", typ: u(undefined, u(3.14, null)) },
      { json: "line", js: "line", typ: u(undefined, u(0, null)) },
      { json: "loc", js: "loc", typ: u(undefined, u(null, "")) },
      { json: "long", js: "long", typ: u(undefined, u(3.14, null)) },
      { json: "oday", js: "oday", typ: u(undefined, u(null, "")) },
      { json: "odo", js: "odo", typ: u(undefined, u(0, null)) },
      { json: "oper", js: "oper", typ: u(undefined, u(0, null)) },
      { json: "route", js: "route", typ: u(undefined, u(null, "")) },
      { json: "start", js: "start", typ: u(undefined, u(null, "")) },
      { json: "stop", js: "stop", typ: u(undefined, u(0, null)) },
      { json: "tsi", js: "tsi", typ: u(undefined, u(0, null)) },
      { json: "tst", js: "tst", typ: u(undefined, u(null, "")) },
      { json: "veh", js: "veh", typ: u(undefined, u(0, null)) },
      {
        json: "vehiclecounts",
        js: "vehiclecounts",
        typ: u(undefined, u(r("Vehiclecounts"), null)),
      },
    ],
    false,
  ),
  Vehiclecounts: o(
    [
      {
        json: "countquality",
        js: "countquality",
        typ: u(undefined, u(null, "")),
      },
      {
        json: "doorcounts",
        js: "doorcounts",
        typ: u(undefined, u(a(r("Doorcount")), null)),
      },
      { json: "vehicleload", js: "vehicleload", typ: u(undefined, u(0, null)) },
      {
        json: "vehicleloadratio",
        js: "vehicleloadratio",
        typ: u(undefined, u(0, null)),
      },
    ],
    false,
  ),
  Doorcount: o(
    [
      { json: "count", js: "count", typ: u(undefined, u(a(r("Count")), null)) },
      { json: "door", js: "door", typ: u(undefined, u(null, "")) },
    ],
    false,
  ),
  Count: o(
    [
      { json: "class", js: "class", typ: u(undefined, u(null, "")) },
      { json: "in", js: "in", typ: u(undefined, u(0, null)) },
      { json: "out", js: "out", typ: u(undefined, u(0, null)) },
    ],
    false,
  ),
};
