/**
 * Generated manually with https://app.quicktype.io/ on 2022-08-31 using several
 * anonymized full APC JSON messages with strings modified to avoid enums and
 * Dates and one extra JSON message with all HFP-inherited fields as null. The
 * full APC JSON messages violated the given JSON spec but the data pipeline to
 * handle those spec-violating messages exists so we are going to conform to the
 * spec-violating form. Function m was also removed by hand as unused.
 */

// To parse this data:
//
//   import { Convert, ApcJSON } from "./file";
//
//   const apcJSON = Convert.toApcJSON(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ApcJSON {
  APC?: Apc;
}

export interface Apc {
  desi?: null | string;
  dir?: null | string;
  oper?: null | string;
  veh?: null | string;
  tst?: null | string;
  tsi?: number | null;
  lat?: null | string;
  long?: null | string;
  odo?: null | string;
  oday?: null | string;
  jrn?: null | string;
  line?: null | string;
  start?: null | string;
  loc?: null | string;
  stop?: null | string;
  route?: null | string;
  vehiclecounts?: Vehiclecounts;
}

export interface Vehiclecounts {
  countquality?: string;
  vehicleload?: number;
  vehicleloadratio?: string;
  doorcounts?: Doorcount[];
}

export interface Doorcount {
  door?: string;
  count?: Count[];
}

export interface Count {
  class?: string;
  in?: number;
  out?: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toApcJSON(json: string): ApcJSON {
    return cast(JSON.parse(json), r("ApcJSON"));
  }

  public static apcJSONToJson(value: ApcJSON): string {
    return JSON.stringify(uncast(value, r("ApcJSON")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
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

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
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
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
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
      : invalidValue(typ, val);
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

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  ApcJSON: o([{ json: "APC", js: "APC", typ: u(undefined, r("Apc")) }], false),
  Apc: o(
    [
      { json: "desi", js: "desi", typ: u(undefined, u(null, "")) },
      { json: "dir", js: "dir", typ: u(undefined, u(null, "")) },
      { json: "oper", js: "oper", typ: u(undefined, u(null, "")) },
      { json: "veh", js: "veh", typ: u(undefined, u(null, "")) },
      { json: "tst", js: "tst", typ: u(undefined, u(null, "")) },
      { json: "tsi", js: "tsi", typ: u(undefined, u(0, null)) },
      { json: "lat", js: "lat", typ: u(undefined, u(null, "")) },
      { json: "long", js: "long", typ: u(undefined, u(null, "")) },
      { json: "odo", js: "odo", typ: u(undefined, u(null, "")) },
      { json: "oday", js: "oday", typ: u(undefined, u(null, "")) },
      { json: "jrn", js: "jrn", typ: u(undefined, u(null, "")) },
      { json: "line", js: "line", typ: u(undefined, u(null, "")) },
      { json: "start", js: "start", typ: u(undefined, u(null, "")) },
      { json: "loc", js: "loc", typ: u(undefined, u(null, "")) },
      { json: "stop", js: "stop", typ: u(undefined, u(null, "")) },
      { json: "route", js: "route", typ: u(undefined, u(null, "")) },
      {
        json: "vehiclecounts",
        js: "vehiclecounts",
        typ: u(undefined, r("Vehiclecounts")),
      },
    ],
    false
  ),
  Vehiclecounts: o(
    [
      { json: "countquality", js: "countquality", typ: u(undefined, "") },
      { json: "vehicleload", js: "vehicleload", typ: u(undefined, 0) },
      {
        json: "vehicleloadratio",
        js: "vehicleloadratio",
        typ: u(undefined, ""),
      },
      {
        json: "doorcounts",
        js: "doorcounts",
        typ: u(undefined, a(r("Doorcount"))),
      },
    ],
    false
  ),
  Doorcount: o(
    [
      { json: "door", js: "door", typ: u(undefined, "") },
      { json: "count", js: "count", typ: u(undefined, a(r("Count"))) },
    ],
    false
  ),
  Count: o(
    [
      { json: "class", js: "class", typ: u(undefined, "") },
      { json: "in", js: "in", typ: u(undefined, 0) },
      { json: "out", js: "out", typ: u(undefined, 0) },
    ],
    false
  ),
};
