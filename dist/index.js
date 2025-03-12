var jn = Object.defineProperty;
var An = (r, e, n) => e in r ? jn(r, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : r[e] = n;
var qe = (r, e, n) => An(r, typeof e != "symbol" ? e + "" : e, n);
class In {
  constructor(e) {
    qe(this, "worker");
    qe(this, "onmessage");
    this.worker = e;
  }
  async start() {
    this.worker.addEventListener("message", (e) => {
      var n;
      (n = this.onmessage) == null || n.call(this, e.data);
    });
  }
  async send(e) {
    this.worker.postMessage(e);
  }
  close() {
    throw new Error("Method not implemented.");
  }
}
const Qe = `var Gt = Object.defineProperty;
var Kt = (n, e, t) => e in n ? Gt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var ht = (n, e, t) => Kt(n, typeof e != "symbol" ? e + "" : e, t);
var b;
(function(n) {
  n.assertEqual = (s) => s;
  function e(s) {
  }
  n.assertIs = e;
  function t(s) {
    throw new Error();
  }
  n.assertNever = t, n.arrayToEnum = (s) => {
    const a = {};
    for (const o of s)
      a[o] = o;
    return a;
  }, n.getValidEnumValues = (s) => {
    const a = n.objectKeys(s).filter((c) => typeof s[s[c]] != "number"), o = {};
    for (const c of a)
      o[c] = s[c];
    return n.objectValues(o);
  }, n.objectValues = (s) => n.objectKeys(s).map(function(a) {
    return s[a];
  }), n.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
    return a;
  }, n.find = (s, a) => {
    for (const o of s)
      if (a(o))
        return o;
  }, n.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function r(s, a = " | ") {
    return s.map((o) => typeof o == "string" ? \`'\${o}'\` : o).join(a);
  }
  n.joinValues = r, n.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(b || (b = {}));
var We;
(function(n) {
  n.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(We || (We = {}));
const f = b.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), U = (n) => {
  switch (typeof n) {
    case "undefined":
      return f.undefined;
    case "string":
      return f.string;
    case "number":
      return isNaN(n) ? f.nan : f.number;
    case "boolean":
      return f.boolean;
    case "function":
      return f.function;
    case "bigint":
      return f.bigint;
    case "symbol":
      return f.symbol;
    case "object":
      return Array.isArray(n) ? f.array : n === null ? f.null : n.then && typeof n.then == "function" && n.catch && typeof n.catch == "function" ? f.promise : typeof Map < "u" && n instanceof Map ? f.map : typeof Set < "u" && n instanceof Set ? f.set : typeof Date < "u" && n instanceof Date ? f.date : f.object;
    default:
      return f.unknown;
  }
}, d = b.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Qt = (n) => JSON.stringify(n, null, 2).replace(/"([^"]+)":/g, "$1:");
class Z extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, r = { _errors: [] }, s = (a) => {
      for (const o of a.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(t(o));
        else {
          let c = r, l = 0;
          for (; l < o.path.length; ) {
            const u = o.path[l];
            l === o.path.length - 1 ? (c[u] = c[u] || { _errors: [] }, c[u]._errors.push(t(o))) : c[u] = c[u] || { _errors: [] }, c = c[u], l++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof Z))
      throw new Error(\`Not a ZodError: \${e}\`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, b.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const s of this.issues)
      s.path.length > 0 ? (t[s.path[0]] = t[s.path[0]] || [], t[s.path[0]].push(e(s))) : r.push(e(s));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
Z.create = (n) => new Z(n);
const oe = (n, e) => {
  let t;
  switch (n.code) {
    case d.invalid_type:
      n.received === f.undefined ? t = "Required" : t = \`Expected \${n.expected}, received \${n.received}\`;
      break;
    case d.invalid_literal:
      t = \`Invalid literal value, expected \${JSON.stringify(n.expected, b.jsonStringifyReplacer)}\`;
      break;
    case d.unrecognized_keys:
      t = \`Unrecognized key(s) in object: \${b.joinValues(n.keys, ", ")}\`;
      break;
    case d.invalid_union:
      t = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      t = \`Invalid discriminator value. Expected \${b.joinValues(n.options)}\`;
      break;
    case d.invalid_enum_value:
      t = \`Invalid enum value. Expected \${b.joinValues(n.options)}, received '\${n.received}'\`;
      break;
    case d.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      t = "Invalid function return type";
      break;
    case d.invalid_date:
      t = "Invalid date";
      break;
    case d.invalid_string:
      typeof n.validation == "object" ? "includes" in n.validation ? (t = \`Invalid input: must include "\${n.validation.includes}"\`, typeof n.validation.position == "number" && (t = \`\${t} at one or more positions greater than or equal to \${n.validation.position}\`)) : "startsWith" in n.validation ? t = \`Invalid input: must start with "\${n.validation.startsWith}"\` : "endsWith" in n.validation ? t = \`Invalid input: must end with "\${n.validation.endsWith}"\` : b.assertNever(n.validation) : n.validation !== "regex" ? t = \`Invalid \${n.validation}\` : t = "Invalid";
      break;
    case d.too_small:
      n.type === "array" ? t = \`Array must contain \${n.exact ? "exactly" : n.inclusive ? "at least" : "more than"} \${n.minimum} element(s)\` : n.type === "string" ? t = \`String must contain \${n.exact ? "exactly" : n.inclusive ? "at least" : "over"} \${n.minimum} character(s)\` : n.type === "number" ? t = \`Number must be \${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}\${n.minimum}\` : n.type === "date" ? t = \`Date must be \${n.exact ? "exactly equal to " : n.inclusive ? "greater than or equal to " : "greater than "}\${new Date(Number(n.minimum))}\` : t = "Invalid input";
      break;
    case d.too_big:
      n.type === "array" ? t = \`Array must contain \${n.exact ? "exactly" : n.inclusive ? "at most" : "less than"} \${n.maximum} element(s)\` : n.type === "string" ? t = \`String must contain \${n.exact ? "exactly" : n.inclusive ? "at most" : "under"} \${n.maximum} character(s)\` : n.type === "number" ? t = \`Number must be \${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} \${n.maximum}\` : n.type === "bigint" ? t = \`BigInt must be \${n.exact ? "exactly" : n.inclusive ? "less than or equal to" : "less than"} \${n.maximum}\` : n.type === "date" ? t = \`Date must be \${n.exact ? "exactly" : n.inclusive ? "smaller than or equal to" : "smaller than"} \${new Date(Number(n.maximum))}\` : t = "Invalid input";
      break;
    case d.custom:
      t = "Invalid input";
      break;
    case d.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      t = \`Number must be a multiple of \${n.multipleOf}\`;
      break;
    case d.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, b.assertNever(n);
  }
  return { message: t };
};
let bt = oe;
function Xt(n) {
  bt = n;
}
function Ze() {
  return bt;
}
const je = (n) => {
  const { data: e, path: t, errorMaps: r, issueData: s } = n, a = [...t, ...s.path || []], o = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let c = "";
  const l = r.filter((u) => !!u).slice().reverse();
  for (const u of l)
    c = u(o, { data: e, defaultError: c }).message;
  return {
    ...s,
    path: a,
    message: c
  };
}, er = [];
function m(n, e) {
  const t = Ze(), r = je({
    issueData: e,
    data: n.data,
    path: n.path,
    errorMaps: [
      n.common.contextualErrorMap,
      // contextual error map is first priority
      n.schemaErrorMap,
      // then schema-bound map if available
      t,
      // then global override map
      t === oe ? void 0 : oe
      // then global default map
    ].filter((s) => !!s)
  });
  n.common.issues.push(r);
}
class T {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const s of t) {
      if (s.status === "aborted")
        return y;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const s of t) {
      const a = await s.key, o = await s.value;
      r.push({
        key: a,
        value: o
      });
    }
    return T.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const s of t) {
      const { key: a, value: o } = s;
      if (a.status === "aborted" || o.status === "aborted")
        return y;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[a.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const y = Object.freeze({
  status: "aborted"
}), ae = (n) => ({ status: "dirty", value: n }), P = (n) => ({ status: "valid", value: n }), Je = (n) => n.status === "aborted", Ye = (n) => n.status === "dirty", ee = (n) => n.status === "valid", pe = (n) => typeof Promise < "u" && n instanceof Promise;
function Ae(n, e, t, r) {
  if (typeof e == "function" ? n !== e || !0 : !e.has(n)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(n);
}
function xt(n, e, t, r, s) {
  if (typeof e == "function" ? n !== e || !0 : !e.has(n)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(n, t), t;
}
var g;
(function(n) {
  n.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, n.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(g || (g = {}));
var de, he;
class D {
  constructor(e, t, r, s) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const pt = (n, e) => {
  if (ee(e))
    return { success: !0, data: e.value };
  if (!n.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new Z(n.common.issues);
      return this._error = t, this._error;
    }
  };
};
function v(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: s } = n;
  if (e && (t || r))
    throw new Error(\`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.\`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, c) => {
    var l, u;
    const { message: p } = n;
    return o.code === "invalid_enum_value" ? { message: p ?? c.defaultError } : typeof c.data > "u" ? { message: (l = p ?? r) !== null && l !== void 0 ? l : c.defaultError } : o.code !== "invalid_type" ? { message: c.defaultError } : { message: (u = p ?? t) !== null && u !== void 0 ? u : c.defaultError };
  }, description: s };
}
class _ {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return U(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: U(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new T(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: U(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (pe(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    var r;
    const s = {
      common: {
        issues: [],
        async: (r = t == null ? void 0 : t.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: U(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return pt(s, a);
  }
  "~validate"(e) {
    var t, r;
    const s = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: U(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: s });
        return ee(a) ? {
          value: a.value
        } : {
          issues: s.common.issues
        };
      } catch (a) {
        !((r = (t = a == null ? void 0 : a.message) === null || t === void 0 ? void 0 : t.toLowerCase()) === null || r === void 0) && r.includes("encountered") && (this["~standard"].async = !0), s.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: s }).then((a) => ee(a) ? {
      value: a.value
    } : {
      issues: s.common.issues
    });
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: U(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), a = await (pe(s) ? s : Promise.resolve(s));
    return pt(r, a);
  }
  refine(e, t) {
    const r = (s) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(s) : t;
    return this._refinement((s, a) => {
      const o = e(s), c = () => a.addIssue({
        code: d.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((l) => l ? !0 : (c(), !1)) : o ? !0 : (c(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof t == "function" ? t(r, s) : t), !1));
  }
  _refinement(e) {
    return new L({
      schema: this,
      typeName: h.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (t) => this["~validate"](t)
    };
  }
  optional() {
    return $.create(this, this._def);
  }
  nullable() {
    return G.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return M.create(this);
  }
  promise() {
    return ue.create(this, this._def);
  }
  or(e) {
    return ye.create([this, e], this._def);
  }
  and(e) {
    return ve.create(this, e, this._def);
  }
  transform(e) {
    return new L({
      ...v(this._def),
      schema: this,
      typeName: h.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new we({
      ...v(this._def),
      innerType: this,
      defaultValue: t,
      typeName: h.ZodDefault
    });
  }
  brand() {
    return new ot({
      typeName: h.ZodBranded,
      type: this,
      ...v(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Se({
      ...v(this._def),
      innerType: this,
      catchValue: t,
      typeName: h.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Re.create(this, e);
  }
  readonly() {
    return Te.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const tr = /^c[^\\s-]{8,}$/i, rr = /^[0-9a-z]+$/, nr = /^[0-9A-HJKMNP-TV-Z]{26}$/i, sr = /^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$/i, ar = /^[a-z0-9_-]{21}$/i, ir = /^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]*$/, or = /^[-+]?P(?!$)(?:(?:[-+]?\\d+Y)|(?:[-+]?\\d+[.,]\\d+Y$))?(?:(?:[-+]?\\d+M)|(?:[-+]?\\d+[.,]\\d+M$))?(?:(?:[-+]?\\d+W)|(?:[-+]?\\d+[.,]\\d+W$))?(?:(?:[-+]?\\d+D)|(?:[-+]?\\d+[.,]\\d+D$))?(?:T(?=[\\d+-])(?:(?:[-+]?\\d+H)|(?:[-+]?\\d+[.,]\\d+H$))?(?:(?:[-+]?\\d+M)|(?:[-+]?\\d+[.,]\\d+M$))?(?:[-+]?\\d+(?:[.,]\\d+)?S)?)??$/, cr = /^(?!\\.)(?!.*\\.\\.)([A-Z0-9_'+\\-\\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\\-]*\\.)+[A-Z]{2,}$/i, ur = "^(\\\\p{Extended_Pictographic}|\\\\p{Emoji_Component})+$";
let Fe;
const lr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, dr = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\/(3[0-2]|[12]?[0-9])$/, hr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, pr = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, mr = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, fr = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, kt = "((\\\\d\\\\d[2468][048]|\\\\d\\\\d[13579][26]|\\\\d\\\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\\\d|30)|(02)-(0[1-9]|1\\\\d|2[0-8])))", gr = new RegExp(\`^\${kt}$\`);
function wt(n) {
  let e = "([01]\\\\d|2[0-3]):[0-5]\\\\d:[0-5]\\\\d";
  return n.precision ? e = \`\${e}\\\\.\\\\d{\${n.precision}}\` : n.precision == null && (e = \`\${e}(\\\\.\\\\d+)?\`), e;
}
function yr(n) {
  return new RegExp(\`^\${wt(n)}$\`);
}
function St(n) {
  let e = \`\${kt}T\${wt(n)}\`;
  const t = [];
  return t.push(n.local ? "Z?" : "Z"), n.offset && t.push("([+-]\\\\d{2}:?\\\\d{2})"), e = \`\${e}(\${t.join("|")})\`, new RegExp(\`^\${e}$\`);
}
function vr(n, e) {
  return !!((e === "v4" || !e) && lr.test(n) || (e === "v6" || !e) && hr.test(n));
}
function _r(n, e) {
  if (!ir.test(n))
    return !1;
  try {
    const [t] = n.split("."), r = t.replace(/-/g, "+").replace(/_/g, "/").padEnd(t.length + (4 - t.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function br(n, e) {
  return !!((e === "v4" || !e) && dr.test(n) || (e === "v6" || !e) && pr.test(n));
}
class E extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== f.string) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: d.invalid_type,
        expected: f.string,
        received: a.parsedType
      }), y;
    }
    const r = new T();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), m(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), m(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, c = e.data.length < a.value;
        (o || c) && (s = this._getOrReturnCtx(e, s), o ? m(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : c && m(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        cr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "email",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        Fe || (Fe = new RegExp(ur, "u")), Fe.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "emoji",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        sr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        ar.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "nanoid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        tr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        rr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        nr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
          validation: "ulid",
          code: d.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), m(s, {
            validation: "url",
            code: d.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "regex",
        code: d.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? St(a).test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? gr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? yr(a).test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? or.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "duration",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? vr(e.data, a.version) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "ip",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? _r(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "jwt",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? br(e.data, a.version) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "cidr",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? mr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "base64",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? fr.test(e.data) || (s = this._getOrReturnCtx(e, s), m(s, {
        validation: "base64url",
        code: d.invalid_string,
        message: a.message
      }), r.dirty()) : b.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((s) => e.test(s), {
      validation: t,
      code: d.invalid_string,
      ...g.errToObj(r)
    });
  }
  _addCheck(e) {
    return new E({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...g.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...g.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...g.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...g.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...g.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...g.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...g.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...g.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...g.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...g.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...g.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...g.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...g.errToObj(e) });
  }
  datetime(e) {
    var t, r;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      local: (r = e == null ? void 0 : e.local) !== null && r !== void 0 ? r : !1,
      ...g.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...g.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...g.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...g.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...g.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...g.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...g.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...g.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...g.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...g.errToObj(t)
    });
  }
  /**
   * Equivalent to \`.min(1)\`
   */
  nonempty(e) {
    return this.min(1, g.errToObj(e));
  }
  trim() {
    return new E({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new E({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new E({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
E.create = (n) => {
  var e;
  return new E({
    checks: [],
    typeName: h.ZodString,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...v(n)
  });
};
function xr(n, e) {
  const t = (n.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = t > r ? t : r, a = parseInt(n.toFixed(s).replace(".", "")), o = parseInt(e.toFixed(s).replace(".", ""));
  return a % o / Math.pow(10, s);
}
class W extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== f.number) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: d.invalid_type,
        expected: f.number,
        received: a.parsedType
      }), y;
    }
    let r;
    const s = new T();
    for (const a of this._def.checks)
      a.kind === "int" ? b.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? xr(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.not_finite,
        message: a.message
      }), s.dirty()) : b.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, g.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, g.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, g.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, g.toString(t));
  }
  setLimit(e, t, r, s) {
    return new W({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: g.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new W({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: g.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: g.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: g.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: g.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: g.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: g.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: g.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: g.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: g.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && b.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
W.create = (n) => new W({
  checks: [],
  typeName: h.ZodNumber,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...v(n)
});
class J extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== f.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new T();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), m(r, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : b.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return m(t, {
      code: d.invalid_type,
      expected: f.bigint,
      received: t.parsedType
    }), y;
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, g.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, g.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, g.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, g.toString(t));
  }
  setLimit(e, t, r, s) {
    return new J({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: g.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new J({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: g.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: g.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: g.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: g.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: g.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
J.create = (n) => {
  var e;
  return new J({
    checks: [],
    typeName: h.ZodBigInt,
    coerce: (e = n == null ? void 0 : n.coerce) !== null && e !== void 0 ? e : !1,
    ...v(n)
  });
};
class me extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== f.boolean) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        code: d.invalid_type,
        expected: f.boolean,
        received: r.parsedType
      }), y;
    }
    return P(e.data);
  }
}
me.create = (n) => new me({
  typeName: h.ZodBoolean,
  coerce: (n == null ? void 0 : n.coerce) || !1,
  ...v(n)
});
class te extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== f.date) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: d.invalid_type,
        expected: f.date,
        received: a.parsedType
      }), y;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return m(a, {
        code: d.invalid_date
      }), y;
    }
    const r = new T();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), m(s, {
        code: d.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : b.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new te({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: g.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: g.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
te.create = (n) => new te({
  checks: [],
  coerce: (n == null ? void 0 : n.coerce) || !1,
  typeName: h.ZodDate,
  ...v(n)
});
class Oe extends _ {
  _parse(e) {
    if (this._getType(e) !== f.symbol) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        code: d.invalid_type,
        expected: f.symbol,
        received: r.parsedType
      }), y;
    }
    return P(e.data);
  }
}
Oe.create = (n) => new Oe({
  typeName: h.ZodSymbol,
  ...v(n)
});
class fe extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        code: d.invalid_type,
        expected: f.undefined,
        received: r.parsedType
      }), y;
    }
    return P(e.data);
  }
}
fe.create = (n) => new fe({
  typeName: h.ZodUndefined,
  ...v(n)
});
class ge extends _ {
  _parse(e) {
    if (this._getType(e) !== f.null) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        code: d.invalid_type,
        expected: f.null,
        received: r.parsedType
      }), y;
    }
    return P(e.data);
  }
}
ge.create = (n) => new ge({
  typeName: h.ZodNull,
  ...v(n)
});
class ce extends _ {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return P(e.data);
  }
}
ce.create = (n) => new ce({
  typeName: h.ZodAny,
  ...v(n)
});
class X extends _ {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return P(e.data);
  }
}
X.create = (n) => new X({
  typeName: h.ZodUnknown,
  ...v(n)
});
class B extends _ {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return m(t, {
      code: d.invalid_type,
      expected: f.never,
      received: t.parsedType
    }), y;
  }
}
B.create = (n) => new B({
  typeName: h.ZodNever,
  ...v(n)
});
class Ne extends _ {
  _parse(e) {
    if (this._getType(e) !== f.undefined) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        code: d.invalid_type,
        expected: f.void,
        received: r.parsedType
      }), y;
    }
    return P(e.data);
  }
}
Ne.create = (n) => new Ne({
  typeName: h.ZodVoid,
  ...v(n)
});
class M extends _ {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), s = this._def;
    if (t.parsedType !== f.array)
      return m(t, {
        code: d.invalid_type,
        expected: f.array,
        received: t.parsedType
      }), y;
    if (s.exactLength !== null) {
      const o = t.data.length > s.exactLength.value, c = t.data.length < s.exactLength.value;
      (o || c) && (m(t, {
        code: o ? d.too_big : d.too_small,
        minimum: c ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && t.data.length < s.minLength.value && (m(t, {
      code: d.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && t.data.length > s.maxLength.value && (m(t, {
      code: d.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, c) => s.type._parseAsync(new D(t, o, t.path, c)))).then((o) => T.mergeArray(r, o));
    const a = [...t.data].map((o, c) => s.type._parseSync(new D(t, o, t.path, c)));
    return T.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new M({
      ...this._def,
      minLength: { value: e, message: g.toString(t) }
    });
  }
  max(e, t) {
    return new M({
      ...this._def,
      maxLength: { value: e, message: g.toString(t) }
    });
  }
  length(e, t) {
    return new M({
      ...this._def,
      exactLength: { value: e, message: g.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
M.create = (n, e) => new M({
  type: n,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: h.ZodArray,
  ...v(e)
});
function se(n) {
  if (n instanceof w) {
    const e = {};
    for (const t in n.shape) {
      const r = n.shape[t];
      e[t] = $.create(se(r));
    }
    return new w({
      ...n._def,
      shape: () => e
    });
  } else return n instanceof M ? new M({
    ...n._def,
    type: se(n.element)
  }) : n instanceof $ ? $.create(se(n.unwrap())) : n instanceof G ? G.create(se(n.unwrap())) : n instanceof H ? H.create(n.items.map((e) => se(e))) : n;
}
class w extends _ {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = b.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== f.object) {
      const u = this._getOrReturnCtx(e);
      return m(u, {
        code: d.invalid_type,
        expected: f.object,
        received: u.parsedType
      }), y;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), c = [];
    if (!(this._def.catchall instanceof B && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        o.includes(u) || c.push(u);
    const l = [];
    for (const u of o) {
      const p = a[u], S = s.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: p._parse(new D(s, S, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof B) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const p of c)
          l.push({
            key: { status: "valid", value: p },
            value: { status: "valid", value: s.data[p] }
          });
      else if (u === "strict")
        c.length > 0 && (m(s, {
          code: d.unrecognized_keys,
          keys: c
        }), r.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const p of c) {
        const S = s.data[p];
        l.push({
          key: { status: "valid", value: p },
          value: u._parse(
            new D(s, S, s.path, p)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: p in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const p of l) {
        const S = await p.key, K = await p.value;
        u.push({
          key: S,
          value: K,
          alwaysSet: p.alwaysSet
        });
      }
      return u;
    }).then((u) => T.mergeObjectSync(r, u)) : T.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return g.errToObj, new w({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          var s, a, o, c;
          const l = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, t, r).message) !== null && o !== void 0 ? o : r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (c = g.errToObj(e).message) !== null && c !== void 0 ? c : l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new w({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new w({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new w({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new w({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: h.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new w({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return b.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    }), new w({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return b.objectKeys(this.shape).forEach((r) => {
      e[r] || (t[r] = this.shape[r]);
    }), new w({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return se(this);
  }
  partial(e) {
    const t = {};
    return b.objectKeys(this.shape).forEach((r) => {
      const s = this.shape[r];
      e && !e[r] ? t[r] = s : t[r] = s.optional();
    }), new w({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return b.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof $; )
          a = a._def.innerType;
        t[r] = a;
      }
    }), new w({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return Tt(b.objectKeys(this.shape));
  }
}
w.create = (n, e) => new w({
  shape: () => n,
  unknownKeys: "strip",
  catchall: B.create(),
  typeName: h.ZodObject,
  ...v(e)
});
w.strictCreate = (n, e) => new w({
  shape: () => n,
  unknownKeys: "strict",
  catchall: B.create(),
  typeName: h.ZodObject,
  ...v(e)
});
w.lazycreate = (n, e) => new w({
  shape: n,
  unknownKeys: "strip",
  catchall: B.create(),
  typeName: h.ZodObject,
  ...v(e)
});
class ye extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function s(a) {
      for (const c of a)
        if (c.result.status === "valid")
          return c.result;
      for (const c of a)
        if (c.result.status === "dirty")
          return t.common.issues.push(...c.ctx.common.issues), c.result;
      const o = a.map((c) => new Z(c.ctx.common.issues));
      return m(t, {
        code: d.invalid_union,
        unionErrors: o
      }), y;
    }
    if (t.common.async)
      return Promise.all(r.map(async (a) => {
        const o = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let a;
      const o = [];
      for (const l of r) {
        const u = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, p = l._parseSync({
          data: t.data,
          path: t.path,
          parent: u
        });
        if (p.status === "valid")
          return p;
        p.status === "dirty" && !a && (a = { result: p, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const c = o.map((l) => new Z(l));
      return m(t, {
        code: d.invalid_union,
        unionErrors: c
      }), y;
    }
  }
  get options() {
    return this._def.options;
  }
}
ye.create = (n, e) => new ye({
  options: n,
  typeName: h.ZodUnion,
  ...v(e)
});
const F = (n) => n instanceof be ? F(n.schema) : n instanceof L ? F(n.innerType()) : n instanceof xe ? [n.value] : n instanceof Y ? n.options : n instanceof ke ? b.objectValues(n.enum) : n instanceof we ? F(n._def.innerType) : n instanceof fe ? [void 0] : n instanceof ge ? [null] : n instanceof $ ? [void 0, ...F(n.unwrap())] : n instanceof G ? [null, ...F(n.unwrap())] : n instanceof ot || n instanceof Te ? F(n.unwrap()) : n instanceof Se ? F(n._def.innerType) : [];
class $e extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.object)
      return m(t, {
        code: d.invalid_type,
        expected: f.object,
        received: t.parsedType
      }), y;
    const r = this.discriminator, s = t.data[r], a = this.optionsMap.get(s);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (m(t, {
      code: d.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), y);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, r) {
    const s = /* @__PURE__ */ new Map();
    for (const a of t) {
      const o = F(a.shape[e]);
      if (!o.length)
        throw new Error(\`A discriminator value for key \\\`\${e}\\\` could not be extracted from all schema options\`);
      for (const c of o) {
        if (s.has(c))
          throw new Error(\`Discriminator property \${String(e)} has duplicate value \${String(c)}\`);
        s.set(c, a);
      }
    }
    return new $e({
      typeName: h.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: s,
      ...v(r)
    });
  }
}
function Ge(n, e) {
  const t = U(n), r = U(e);
  if (n === e)
    return { valid: !0, data: n };
  if (t === f.object && r === f.object) {
    const s = b.objectKeys(e), a = b.objectKeys(n).filter((c) => s.indexOf(c) !== -1), o = { ...n, ...e };
    for (const c of a) {
      const l = Ge(n[c], e[c]);
      if (!l.valid)
        return { valid: !1 };
      o[c] = l.data;
    }
    return { valid: !0, data: o };
  } else if (t === f.array && r === f.array) {
    if (n.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < n.length; a++) {
      const o = n[a], c = e[a], l = Ge(o, c);
      if (!l.valid)
        return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else return t === f.date && r === f.date && +n == +e ? { valid: !0, data: n } : { valid: !1 };
}
class ve extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = (a, o) => {
      if (Je(a) || Je(o))
        return y;
      const c = Ge(a.value, o.value);
      return c.valid ? ((Ye(a) || Ye(o)) && t.dirty(), { status: t.value, value: c.data }) : (m(r, {
        code: d.invalid_intersection_types
      }), y);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([a, o]) => s(a, o)) : s(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
ve.create = (n, e, t) => new ve({
  left: n,
  right: e,
  typeName: h.ZodIntersection,
  ...v(t)
});
class H extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.array)
      return m(r, {
        code: d.invalid_type,
        expected: f.array,
        received: r.parsedType
      }), y;
    if (r.data.length < this._def.items.length)
      return m(r, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), y;
    !this._def.rest && r.data.length > this._def.items.length && (m(r, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...r.data].map((o, c) => {
      const l = this._def.items[c] || this._def.rest;
      return l ? l._parse(new D(r, o, r.path, c)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(a).then((o) => T.mergeArray(t, o)) : T.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new H({
      ...this._def,
      rest: e
    });
  }
}
H.create = (n, e) => {
  if (!Array.isArray(n))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new H({
    items: n,
    typeName: h.ZodTuple,
    rest: null,
    ...v(e)
  });
};
class _e extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.object)
      return m(r, {
        code: d.invalid_type,
        expected: f.object,
        received: r.parsedType
      }), y;
    const s = [], a = this._def.keyType, o = this._def.valueType;
    for (const c in r.data)
      s.push({
        key: a._parse(new D(r, c, r.path, c)),
        value: o._parse(new D(r, r.data[c], r.path, c)),
        alwaysSet: c in r.data
      });
    return r.common.async ? T.mergeObjectAsync(t, s) : T.mergeObjectSync(t, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, r) {
    return t instanceof _ ? new _e({
      keyType: e,
      valueType: t,
      typeName: h.ZodRecord,
      ...v(r)
    }) : new _e({
      keyType: E.create(),
      valueType: e,
      typeName: h.ZodRecord,
      ...v(t)
    });
  }
}
class Ie extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.map)
      return m(r, {
        code: d.invalid_type,
        expected: f.map,
        received: r.parsedType
      }), y;
    const s = this._def.keyType, a = this._def.valueType, o = [...r.data.entries()].map(([c, l], u) => ({
      key: s._parse(new D(r, c, r.path, [u, "key"])),
      value: a._parse(new D(r, l, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const c = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of o) {
          const u = await l.key, p = await l.value;
          if (u.status === "aborted" || p.status === "aborted")
            return y;
          (u.status === "dirty" || p.status === "dirty") && t.dirty(), c.set(u.value, p.value);
        }
        return { status: t.value, value: c };
      });
    } else {
      const c = /* @__PURE__ */ new Map();
      for (const l of o) {
        const u = l.key, p = l.value;
        if (u.status === "aborted" || p.status === "aborted")
          return y;
        (u.status === "dirty" || p.status === "dirty") && t.dirty(), c.set(u.value, p.value);
      }
      return { status: t.value, value: c };
    }
  }
}
Ie.create = (n, e, t) => new Ie({
  valueType: e,
  keyType: n,
  typeName: h.ZodMap,
  ...v(t)
});
class re extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== f.set)
      return m(r, {
        code: d.invalid_type,
        expected: f.set,
        received: r.parsedType
      }), y;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (m(r, {
      code: d.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), t.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (m(r, {
      code: d.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function o(l) {
      const u = /* @__PURE__ */ new Set();
      for (const p of l) {
        if (p.status === "aborted")
          return y;
        p.status === "dirty" && t.dirty(), u.add(p.value);
      }
      return { status: t.value, value: u };
    }
    const c = [...r.data.values()].map((l, u) => a._parse(new D(r, l, r.path, u)));
    return r.common.async ? Promise.all(c).then((l) => o(l)) : o(c);
  }
  min(e, t) {
    return new re({
      ...this._def,
      minSize: { value: e, message: g.toString(t) }
    });
  }
  max(e, t) {
    return new re({
      ...this._def,
      maxSize: { value: e, message: g.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
re.create = (n, e) => new re({
  valueType: n,
  minSize: null,
  maxSize: null,
  typeName: h.ZodSet,
  ...v(e)
});
class ie extends _ {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.function)
      return m(t, {
        code: d.invalid_type,
        expected: f.function,
        received: t.parsedType
      }), y;
    function r(c, l) {
      return je({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Ze(),
          oe
        ].filter((u) => !!u),
        issueData: {
          code: d.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function s(c, l) {
      return je({
        data: c,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Ze(),
          oe
        ].filter((u) => !!u),
        issueData: {
          code: d.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, o = t.data;
    if (this._def.returns instanceof ue) {
      const c = this;
      return P(async function(...l) {
        const u = new Z([]), p = await c._def.args.parseAsync(l, a).catch((ne) => {
          throw u.addIssue(r(l, ne)), u;
        }), S = await Reflect.apply(o, this, p);
        return await c._def.returns._def.type.parseAsync(S, a).catch((ne) => {
          throw u.addIssue(s(S, ne)), u;
        });
      });
    } else {
      const c = this;
      return P(function(...l) {
        const u = c._def.args.safeParse(l, a);
        if (!u.success)
          throw new Z([r(l, u.error)]);
        const p = Reflect.apply(o, this, u.data), S = c._def.returns.safeParse(p, a);
        if (!S.success)
          throw new Z([s(p, S.error)]);
        return S.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new ie({
      ...this._def,
      args: H.create(e).rest(X.create())
    });
  }
  returns(e) {
    return new ie({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, r) {
    return new ie({
      args: e || H.create([]).rest(X.create()),
      returns: t || X.create(),
      typeName: h.ZodFunction,
      ...v(r)
    });
  }
}
class be extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
be.create = (n, e) => new be({
  getter: n,
  typeName: h.ZodLazy,
  ...v(e)
});
class xe extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return m(t, {
        received: t.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), y;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
xe.create = (n, e) => new xe({
  value: n,
  typeName: h.ZodLiteral,
  ...v(e)
});
function Tt(n, e) {
  return new Y({
    values: n,
    typeName: h.ZodEnum,
    ...v(e)
  });
}
class Y extends _ {
  constructor() {
    super(...arguments), de.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return m(t, {
        expected: b.joinValues(r),
        received: t.parsedType,
        code: d.invalid_type
      }), y;
    }
    if (Ae(this, de) || xt(this, de, new Set(this._def.values)), !Ae(this, de).has(e.data)) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return m(t, {
        received: t.data,
        code: d.invalid_enum_value,
        options: r
      }), y;
    }
    return P(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return Y.create(e, {
      ...this._def,
      ...t
    });
  }
  exclude(e, t = this._def) {
    return Y.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...t
    });
  }
}
de = /* @__PURE__ */ new WeakMap();
Y.create = Tt;
class ke extends _ {
  constructor() {
    super(...arguments), he.set(this, void 0);
  }
  _parse(e) {
    const t = b.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== f.string && r.parsedType !== f.number) {
      const s = b.objectValues(t);
      return m(r, {
        expected: b.joinValues(s),
        received: r.parsedType,
        code: d.invalid_type
      }), y;
    }
    if (Ae(this, he) || xt(this, he, new Set(b.getValidEnumValues(this._def.values))), !Ae(this, he).has(e.data)) {
      const s = b.objectValues(t);
      return m(r, {
        received: r.data,
        code: d.invalid_enum_value,
        options: s
      }), y;
    }
    return P(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
he = /* @__PURE__ */ new WeakMap();
ke.create = (n, e) => new ke({
  values: n,
  typeName: h.ZodNativeEnum,
  ...v(e)
});
class ue extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== f.promise && t.common.async === !1)
      return m(t, {
        code: d.invalid_type,
        expected: f.promise,
        received: t.parsedType
      }), y;
    const r = t.parsedType === f.promise ? t.data : Promise.resolve(t.data);
    return P(r.then((s) => this._def.type.parseAsync(s, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
ue.create = (n, e) => new ue({
  type: n,
  typeName: h.ZodPromise,
  ...v(e)
});
class L extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === h.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (o) => {
        m(r, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const o = s.transform(r.data, a);
      if (r.common.async)
        return Promise.resolve(o).then(async (c) => {
          if (t.value === "aborted")
            return y;
          const l = await this._def.schema._parseAsync({
            data: c,
            path: r.path,
            parent: r
          });
          return l.status === "aborted" ? y : l.status === "dirty" || t.value === "dirty" ? ae(l.value) : l;
        });
      {
        if (t.value === "aborted")
          return y;
        const c = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return c.status === "aborted" ? y : c.status === "dirty" || t.value === "dirty" ? ae(c.value) : c;
      }
    }
    if (s.type === "refinement") {
      const o = (c) => {
        const l = s.refinement(c, a);
        if (r.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return c;
      };
      if (r.common.async === !1) {
        const c = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return c.status === "aborted" ? y : (c.status === "dirty" && t.dirty(), o(c.value), { status: t.value, value: c.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((c) => c.status === "aborted" ? y : (c.status === "dirty" && t.dirty(), o(c.value).then(() => ({ status: t.value, value: c.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!ee(o))
          return o;
        const c = s.transform(o.value, a);
        if (c instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: c };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => ee(o) ? Promise.resolve(s.transform(o.value, a)).then((c) => ({ status: t.value, value: c })) : o);
    b.assertNever(s);
  }
}
L.create = (n, e, t) => new L({
  schema: n,
  typeName: h.ZodEffects,
  effect: e,
  ...v(t)
});
L.createWithPreprocess = (n, e, t) => new L({
  schema: e,
  effect: { type: "preprocess", transform: n },
  typeName: h.ZodEffects,
  ...v(t)
});
class $ extends _ {
  _parse(e) {
    return this._getType(e) === f.undefined ? P(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$.create = (n, e) => new $({
  innerType: n,
  typeName: h.ZodOptional,
  ...v(e)
});
class G extends _ {
  _parse(e) {
    return this._getType(e) === f.null ? P(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
G.create = (n, e) => new G({
  innerType: n,
  typeName: h.ZodNullable,
  ...v(e)
});
class we extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === f.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
we.create = (n, e) => new we({
  innerType: n,
  typeName: h.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...v(e)
});
class Se extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return pe(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Z(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Z(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Se.create = (n, e) => new Se({
  innerType: n,
  typeName: h.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...v(e)
});
class Ee extends _ {
  _parse(e) {
    if (this._getType(e) !== f.nan) {
      const r = this._getOrReturnCtx(e);
      return m(r, {
        code: d.invalid_type,
        expected: f.nan,
        received: r.parsedType
      }), y;
    }
    return { status: "valid", value: e.data };
  }
}
Ee.create = (n) => new Ee({
  typeName: h.ZodNaN,
  ...v(n)
});
const kr = Symbol("zod_brand");
class ot extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Re extends _ {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? y : a.status === "dirty" ? (t.dirty(), ae(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? y : s.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new Re({
      in: e,
      out: t,
      typeName: h.ZodPipeline
    });
  }
}
class Te extends _ {
  _parse(e) {
    const t = this._def.innerType._parse(e), r = (s) => (ee(s) && (s.value = Object.freeze(s.value)), s);
    return pe(t) ? t.then((s) => r(s)) : r(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Te.create = (n, e) => new Te({
  innerType: n,
  typeName: h.ZodReadonly,
  ...v(e)
});
function mt(n, e) {
  const t = typeof n == "function" ? n(e) : typeof n == "string" ? { message: n } : n;
  return typeof t == "string" ? { message: t } : t;
}
function Rt(n, e = {}, t) {
  return n ? ce.create().superRefine((r, s) => {
    var a, o;
    const c = n(r);
    if (c instanceof Promise)
      return c.then((l) => {
        var u, p;
        if (!l) {
          const S = mt(e, r), K = (p = (u = S.fatal) !== null && u !== void 0 ? u : t) !== null && p !== void 0 ? p : !0;
          s.addIssue({ code: "custom", ...S, fatal: K });
        }
      });
    if (!c) {
      const l = mt(e, r), u = (o = (a = l.fatal) !== null && a !== void 0 ? a : t) !== null && o !== void 0 ? o : !0;
      s.addIssue({ code: "custom", ...l, fatal: u });
    }
  }) : ce.create();
}
const wr = {
  object: w.lazycreate
};
var h;
(function(n) {
  n.ZodString = "ZodString", n.ZodNumber = "ZodNumber", n.ZodNaN = "ZodNaN", n.ZodBigInt = "ZodBigInt", n.ZodBoolean = "ZodBoolean", n.ZodDate = "ZodDate", n.ZodSymbol = "ZodSymbol", n.ZodUndefined = "ZodUndefined", n.ZodNull = "ZodNull", n.ZodAny = "ZodAny", n.ZodUnknown = "ZodUnknown", n.ZodNever = "ZodNever", n.ZodVoid = "ZodVoid", n.ZodArray = "ZodArray", n.ZodObject = "ZodObject", n.ZodUnion = "ZodUnion", n.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", n.ZodIntersection = "ZodIntersection", n.ZodTuple = "ZodTuple", n.ZodRecord = "ZodRecord", n.ZodMap = "ZodMap", n.ZodSet = "ZodSet", n.ZodFunction = "ZodFunction", n.ZodLazy = "ZodLazy", n.ZodLiteral = "ZodLiteral", n.ZodEnum = "ZodEnum", n.ZodEffects = "ZodEffects", n.ZodNativeEnum = "ZodNativeEnum", n.ZodOptional = "ZodOptional", n.ZodNullable = "ZodNullable", n.ZodDefault = "ZodDefault", n.ZodCatch = "ZodCatch", n.ZodPromise = "ZodPromise", n.ZodBranded = "ZodBranded", n.ZodPipeline = "ZodPipeline", n.ZodReadonly = "ZodReadonly";
})(h || (h = {}));
const Sr = (n, e = {
  message: \`Input not instance of \${n.name}\`
}) => Rt((t) => t instanceof n, e), Ct = E.create, Pt = W.create, Tr = Ee.create, Rr = J.create, Zt = me.create, Cr = te.create, Pr = Oe.create, Zr = fe.create, jr = ge.create, Ar = ce.create, Or = X.create, Nr = B.create, Ir = Ne.create, Er = M.create, Mr = w.create, $r = w.strictCreate, Lr = ye.create, zr = $e.create, qr = ve.create, Dr = H.create, Hr = _e.create, Vr = Ie.create, Fr = re.create, Ur = ie.create, Br = be.create, Wr = xe.create, Jr = Y.create, Yr = ke.create, Gr = ue.create, ft = L.create, Kr = $.create, Qr = G.create, Xr = L.createWithPreprocess, en = Re.create, tn = () => Ct().optional(), rn = () => Pt().optional(), nn = () => Zt().optional(), sn = {
  string: (n) => E.create({ ...n, coerce: !0 }),
  number: (n) => W.create({ ...n, coerce: !0 }),
  boolean: (n) => me.create({
    ...n,
    coerce: !0
  }),
  bigint: (n) => J.create({ ...n, coerce: !0 }),
  date: (n) => te.create({ ...n, coerce: !0 })
}, an = y;
var i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: oe,
  setErrorMap: Xt,
  getErrorMap: Ze,
  makeIssue: je,
  EMPTY_PATH: er,
  addIssueToContext: m,
  ParseStatus: T,
  INVALID: y,
  DIRTY: ae,
  OK: P,
  isAborted: Je,
  isDirty: Ye,
  isValid: ee,
  isAsync: pe,
  get util() {
    return b;
  },
  get objectUtil() {
    return We;
  },
  ZodParsedType: f,
  getParsedType: U,
  ZodType: _,
  datetimeRegex: St,
  ZodString: E,
  ZodNumber: W,
  ZodBigInt: J,
  ZodBoolean: me,
  ZodDate: te,
  ZodSymbol: Oe,
  ZodUndefined: fe,
  ZodNull: ge,
  ZodAny: ce,
  ZodUnknown: X,
  ZodNever: B,
  ZodVoid: Ne,
  ZodArray: M,
  ZodObject: w,
  ZodUnion: ye,
  ZodDiscriminatedUnion: $e,
  ZodIntersection: ve,
  ZodTuple: H,
  ZodRecord: _e,
  ZodMap: Ie,
  ZodSet: re,
  ZodFunction: ie,
  ZodLazy: be,
  ZodLiteral: xe,
  ZodEnum: Y,
  ZodNativeEnum: ke,
  ZodPromise: ue,
  ZodEffects: L,
  ZodTransformer: L,
  ZodOptional: $,
  ZodNullable: G,
  ZodDefault: we,
  ZodCatch: Se,
  ZodNaN: Ee,
  BRAND: kr,
  ZodBranded: ot,
  ZodPipeline: Re,
  ZodReadonly: Te,
  custom: Rt,
  Schema: _,
  ZodSchema: _,
  late: wr,
  get ZodFirstPartyTypeKind() {
    return h;
  },
  coerce: sn,
  any: Ar,
  array: Er,
  bigint: Rr,
  boolean: Zt,
  date: Cr,
  discriminatedUnion: zr,
  effect: ft,
  enum: Jr,
  function: Ur,
  instanceof: Sr,
  intersection: qr,
  lazy: Br,
  literal: Wr,
  map: Vr,
  nan: Tr,
  nativeEnum: Yr,
  never: Nr,
  null: jr,
  nullable: Qr,
  number: Pt,
  object: Mr,
  oboolean: nn,
  onumber: rn,
  optional: Kr,
  ostring: tn,
  pipeline: en,
  preprocess: Xr,
  promise: Gr,
  record: Hr,
  set: Fr,
  strictObject: $r,
  string: Ct,
  symbol: Pr,
  transformer: ft,
  tuple: Dr,
  undefined: Zr,
  union: Lr,
  unknown: Or,
  void: Ir,
  NEVER: an,
  ZodIssueCode: d,
  quotelessJson: Qt,
  ZodError: Z
});
const jt = "2024-11-05", on = [
  jt,
  "2024-10-07"
], Le = "2.0", At = i.union([i.string(), i.number().int()]), Ot = i.string(), z = i.object({
  _meta: i.optional(i.object({
    /**
     * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
     */
    progressToken: i.optional(At)
  }).passthrough())
}).passthrough(), j = i.object({
  method: i.string(),
  params: i.optional(z)
}), Ce = i.object({
  /**
   * This parameter name is reserved by MCP to allow clients and servers to attach additional metadata to their notifications.
   */
  _meta: i.optional(i.object({}).passthrough())
}).passthrough(), V = i.object({
  method: i.string(),
  params: i.optional(Ce)
}), q = i.object({
  /**
   * This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses.
   */
  _meta: i.optional(i.object({}).passthrough())
}).passthrough(), ze = i.union([i.string(), i.number().int()]), cn = i.object({
  jsonrpc: i.literal(Le),
  id: ze
}).merge(j).strict(), un = i.object({
  jsonrpc: i.literal(Le)
}).merge(V).strict(), ln = i.object({
  jsonrpc: i.literal(Le),
  id: ze,
  result: q
}).strict();
var C;
(function(n) {
  n[n.ConnectionClosed = -32e3] = "ConnectionClosed", n[n.RequestTimeout = -32001] = "RequestTimeout", n[n.ParseError = -32700] = "ParseError", n[n.InvalidRequest = -32600] = "InvalidRequest", n[n.MethodNotFound = -32601] = "MethodNotFound", n[n.InvalidParams = -32602] = "InvalidParams", n[n.InternalError = -32603] = "InternalError";
})(C || (C = {}));
const dn = i.object({
  jsonrpc: i.literal(Le),
  id: ze,
  error: i.object({
    /**
     * The error type that occurred.
     */
    code: i.number().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: i.string(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: i.optional(i.unknown())
  })
}).strict();
i.union([
  cn,
  un,
  ln,
  dn
]);
const ct = q.strict(), ut = V.extend({
  method: i.literal("notifications/cancelled"),
  params: Ce.extend({
    /**
     * The ID of the request to cancel.
     *
     * This MUST correspond to the ID of a request previously issued in the same direction.
     */
    requestId: ze,
    /**
     * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
     */
    reason: i.string().optional()
  })
}), Nt = i.object({
  name: i.string(),
  version: i.string()
}).passthrough(), hn = i.object({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: i.optional(i.object({}).passthrough()),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: i.optional(i.object({}).passthrough()),
  /**
   * Present if the client supports listing roots.
   */
  roots: i.optional(i.object({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough())
}).passthrough(), It = j.extend({
  method: i.literal("initialize"),
  params: z.extend({
    /**
     * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
     */
    protocolVersion: i.string(),
    capabilities: hn,
    clientInfo: Nt
  })
}), pn = i.object({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: i.optional(i.object({}).passthrough()),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: i.optional(i.object({}).passthrough()),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: i.optional(i.object({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough()),
  /**
   * Present if the server offers any resources to read.
   */
  resources: i.optional(i.object({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: i.optional(i.boolean()),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough()),
  /**
   * Present if the server offers any tools to call.
   */
  tools: i.optional(i.object({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough())
}).passthrough(), mn = q.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: i.string(),
  capabilities: pn,
  serverInfo: Nt,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: i.optional(i.string())
}), Et = V.extend({
  method: i.literal("notifications/initialized")
}), lt = j.extend({
  method: i.literal("ping")
}), fn = i.object({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: i.number(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: i.optional(i.number())
}).passthrough(), dt = V.extend({
  method: i.literal("notifications/progress"),
  params: Ce.merge(fn).extend({
    /**
     * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
     */
    progressToken: At
  })
}), qe = j.extend({
  params: z.extend({
    /**
     * An opaque token representing the current pagination position.
     * If provided, the server should return results starting after this cursor.
     */
    cursor: i.optional(Ot)
  }).optional()
}), De = q.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: i.optional(Ot)
}), Mt = i.object({
  /**
   * The URI of this resource.
   */
  uri: i.string(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: i.optional(i.string())
}).passthrough(), $t = Mt.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: i.string()
}), Lt = Mt.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: i.string().base64()
}), gn = i.object({
  /**
   * The URI of this resource.
   */
  uri: i.string(),
  /**
   * A human-readable name for this resource.
   *
   * This can be used by clients to populate UI elements.
   */
  name: i.string(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: i.optional(i.string()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: i.optional(i.string())
}).passthrough(), yn = i.object({
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: i.string(),
  /**
   * A human-readable name for the type of resource this template refers to.
   *
   * This can be used by clients to populate UI elements.
   */
  name: i.string(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: i.optional(i.string()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: i.optional(i.string())
}).passthrough(), Ke = qe.extend({
  method: i.literal("resources/list")
}), vn = De.extend({
  resources: i.array(gn)
}), Qe = qe.extend({
  method: i.literal("resources/templates/list")
}), _n = De.extend({
  resourceTemplates: i.array(yn)
}), Xe = j.extend({
  method: i.literal("resources/read"),
  params: z.extend({
    /**
     * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: i.string()
  })
}), bn = q.extend({
  contents: i.array(i.union([$t, Lt]))
}), xn = V.extend({
  method: i.literal("notifications/resources/list_changed")
}), kn = j.extend({
  method: i.literal("resources/subscribe"),
  params: z.extend({
    /**
     * The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: i.string()
  })
}), wn = j.extend({
  method: i.literal("resources/unsubscribe"),
  params: z.extend({
    /**
     * The URI of the resource to unsubscribe from.
     */
    uri: i.string()
  })
}), Sn = V.extend({
  method: i.literal("notifications/resources/updated"),
  params: Ce.extend({
    /**
     * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
     */
    uri: i.string()
  })
}), Tn = i.object({
  /**
   * The name of the argument.
   */
  name: i.string(),
  /**
   * A human-readable description of the argument.
   */
  description: i.optional(i.string()),
  /**
   * Whether this argument must be provided.
   */
  required: i.optional(i.boolean())
}).passthrough(), Rn = i.object({
  /**
   * The name of the prompt or prompt template.
   */
  name: i.string(),
  /**
   * An optional description of what this prompt provides
   */
  description: i.optional(i.string()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: i.optional(i.array(Tn))
}).passthrough(), et = qe.extend({
  method: i.literal("prompts/list")
}), Cn = De.extend({
  prompts: i.array(Rn)
}), tt = j.extend({
  method: i.literal("prompts/get"),
  params: z.extend({
    /**
     * The name of the prompt or prompt template.
     */
    name: i.string(),
    /**
     * Arguments to use for templating the prompt.
     */
    arguments: i.optional(i.record(i.string()))
  })
}), He = i.object({
  type: i.literal("text"),
  /**
   * The text content of the message.
   */
  text: i.string()
}).passthrough(), Ve = i.object({
  type: i.literal("image"),
  /**
   * The base64-encoded image data.
   */
  data: i.string().base64(),
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: i.string()
}).passthrough(), zt = i.object({
  type: i.literal("resource"),
  resource: i.union([$t, Lt])
}).passthrough(), Pn = i.object({
  role: i.enum(["user", "assistant"]),
  content: i.union([
    He,
    Ve,
    zt
  ])
}).passthrough(), Zn = q.extend({
  /**
   * An optional description for the prompt.
   */
  description: i.optional(i.string()),
  messages: i.array(Pn)
}), jn = V.extend({
  method: i.literal("notifications/prompts/list_changed")
}), An = i.object({
  /**
   * The name of the tool.
   */
  name: i.string(),
  /**
   * A human-readable description of the tool.
   */
  description: i.optional(i.string()),
  /**
   * A JSON Schema object defining the expected parameters for the tool.
   */
  inputSchema: i.object({
    type: i.literal("object"),
    properties: i.optional(i.object({}).passthrough())
  }).passthrough()
}).passthrough(), rt = qe.extend({
  method: i.literal("tools/list")
}), On = De.extend({
  tools: i.array(An)
}), qt = q.extend({
  content: i.array(i.union([He, Ve, zt])),
  isError: i.boolean().default(!1).optional()
});
qt.or(q.extend({
  toolResult: i.unknown()
}));
const nt = j.extend({
  method: i.literal("tools/call"),
  params: z.extend({
    name: i.string(),
    arguments: i.optional(i.record(i.unknown()))
  })
}), Nn = V.extend({
  method: i.literal("notifications/tools/list_changed")
}), Dt = i.enum([
  "debug",
  "info",
  "notice",
  "warning",
  "error",
  "critical",
  "alert",
  "emergency"
]), In = j.extend({
  method: i.literal("logging/setLevel"),
  params: z.extend({
    /**
     * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
     */
    level: Dt
  })
}), En = V.extend({
  method: i.literal("notifications/message"),
  params: Ce.extend({
    /**
     * The severity of this log message.
     */
    level: Dt,
    /**
     * An optional name of the logger issuing this message.
     */
    logger: i.optional(i.string()),
    /**
     * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
     */
    data: i.unknown()
  })
}), Mn = i.object({
  /**
   * A hint for a model name.
   */
  name: i.string().optional()
}).passthrough(), $n = i.object({
  /**
   * Optional hints to use for model selection.
   */
  hints: i.optional(i.array(Mn)),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: i.optional(i.number().min(0).max(1)),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: i.optional(i.number().min(0).max(1)),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: i.optional(i.number().min(0).max(1))
}).passthrough(), Ln = i.object({
  role: i.enum(["user", "assistant"]),
  content: i.union([He, Ve])
}).passthrough(), zn = j.extend({
  method: i.literal("sampling/createMessage"),
  params: z.extend({
    messages: i.array(Ln),
    /**
     * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
     */
    systemPrompt: i.optional(i.string()),
    /**
     * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
     */
    includeContext: i.optional(i.enum(["none", "thisServer", "allServers"])),
    temperature: i.optional(i.number()),
    /**
     * The maximum number of tokens to sample, as requested by the server. The client MAY choose to sample fewer tokens than requested.
     */
    maxTokens: i.number().int(),
    stopSequences: i.optional(i.array(i.string())),
    /**
     * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
     */
    metadata: i.optional(i.object({}).passthrough()),
    /**
     * The server's preferences for which model to select.
     */
    modelPreferences: i.optional($n)
  })
}), Ht = q.extend({
  /**
   * The name of the model that generated the message.
   */
  model: i.string(),
  /**
   * The reason why sampling stopped.
   */
  stopReason: i.optional(i.enum(["endTurn", "stopSequence", "maxTokens"]).or(i.string())),
  role: i.enum(["user", "assistant"]),
  content: i.discriminatedUnion("type", [
    He,
    Ve
  ])
}), qn = i.object({
  type: i.literal("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: i.string()
}).passthrough(), Dn = i.object({
  type: i.literal("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: i.string()
}).passthrough(), st = j.extend({
  method: i.literal("completion/complete"),
  params: z.extend({
    ref: i.union([Dn, qn]),
    /**
     * The argument's information
     */
    argument: i.object({
      /**
       * The name of the argument
       */
      name: i.string(),
      /**
       * The value of the argument to use for completion matching.
       */
      value: i.string()
    }).passthrough()
  })
}), Hn = q.extend({
  completion: i.object({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: i.array(i.string()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: i.optional(i.number().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: i.optional(i.boolean())
  }).passthrough()
}), Vn = i.object({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: i.string().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: i.optional(i.string())
}).passthrough(), Fn = j.extend({
  method: i.literal("roots/list")
}), Vt = q.extend({
  roots: i.array(Vn)
}), Un = V.extend({
  method: i.literal("notifications/roots/list_changed")
});
i.union([
  lt,
  It,
  st,
  In,
  tt,
  et,
  Ke,
  Qe,
  Xe,
  kn,
  wn,
  nt,
  rt
]);
i.union([
  ut,
  dt,
  Et,
  Un
]);
i.union([
  ct,
  Ht,
  Vt
]);
i.union([
  lt,
  zn,
  Fn
]);
i.union([
  ut,
  dt,
  En,
  Sn,
  xn,
  Nn,
  jn
]);
i.union([
  ct,
  mn,
  Hn,
  Zn,
  Cn,
  vn,
  _n,
  bn,
  qt,
  On
]);
class O extends Error {
  constructor(e, t, r) {
    super(\`MCP error \${e}: \${t}\`), this.code = e, this.data = r, this.name = "McpError";
  }
}
const Bn = 6e4;
class Wn {
  constructor(e) {
    this._options = e, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this.setNotificationHandler(ut, (t) => {
      const r = this._requestHandlerAbortControllers.get(t.params.requestId);
      r == null || r.abort(t.params.reason);
    }), this.setNotificationHandler(dt, (t) => {
      this._onprogress(t);
    }), this.setRequestHandler(
      lt,
      // Automatic pong by default.
      (t) => ({})
    );
  }
  _setupTimeout(e, t, r, s) {
    this._timeoutInfo.set(e, {
      timeoutId: setTimeout(s, t),
      startTime: Date.now(),
      timeout: t,
      maxTotalTimeout: r,
      onTimeout: s
    });
  }
  _resetTimeout(e) {
    const t = this._timeoutInfo.get(e);
    if (!t)
      return !1;
    const r = Date.now() - t.startTime;
    if (t.maxTotalTimeout && r >= t.maxTotalTimeout)
      throw this._timeoutInfo.delete(e), new O(C.RequestTimeout, "Maximum total timeout exceeded", { maxTotalTimeout: t.maxTotalTimeout, totalElapsed: r });
    return clearTimeout(t.timeoutId), t.timeoutId = setTimeout(t.onTimeout, t.timeout), !0;
  }
  _cleanupTimeout(e) {
    const t = this._timeoutInfo.get(e);
    t && (clearTimeout(t.timeoutId), this._timeoutInfo.delete(e));
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(e) {
    this._transport = e, this._transport.onclose = () => {
      this._onclose();
    }, this._transport.onerror = (t) => {
      this._onerror(t);
    }, this._transport.onmessage = (t) => {
      "method" in t ? "id" in t ? this._onrequest(t) : this._onnotification(t) : this._onresponse(t);
    }, await this._transport.start();
  }
  _onclose() {
    var e;
    const t = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._transport = void 0, (e = this.onclose) === null || e === void 0 || e.call(this);
    const r = new O(C.ConnectionClosed, "Connection closed");
    for (const s of t.values())
      s(r);
  }
  _onerror(e) {
    var t;
    (t = this.onerror) === null || t === void 0 || t.call(this, e);
  }
  _onnotification(e) {
    var t;
    const r = (t = this._notificationHandlers.get(e.method)) !== null && t !== void 0 ? t : this.fallbackNotificationHandler;
    r !== void 0 && Promise.resolve().then(() => r(e)).catch((s) => this._onerror(new Error(\`Uncaught error in notification handler: \${s}\`)));
  }
  _onrequest(e) {
    var t, r, s;
    const a = (t = this._requestHandlers.get(e.method)) !== null && t !== void 0 ? t : this.fallbackRequestHandler;
    if (a === void 0) {
      (r = this._transport) === null || r === void 0 || r.send({
        jsonrpc: "2.0",
        id: e.id,
        error: {
          code: C.MethodNotFound,
          message: "Method not found"
        }
      }).catch((l) => this._onerror(new Error(\`Failed to send an error response: \${l}\`)));
      return;
    }
    const o = new AbortController();
    this._requestHandlerAbortControllers.set(e.id, o);
    const c = {
      signal: o.signal,
      sessionId: (s = this._transport) === null || s === void 0 ? void 0 : s.sessionId
    };
    Promise.resolve().then(() => a(e, c)).then((l) => {
      var u;
      if (!o.signal.aborted)
        return (u = this._transport) === null || u === void 0 ? void 0 : u.send({
          result: l,
          jsonrpc: "2.0",
          id: e.id
        });
    }, (l) => {
      var u, p;
      if (!o.signal.aborted)
        return (u = this._transport) === null || u === void 0 ? void 0 : u.send({
          jsonrpc: "2.0",
          id: e.id,
          error: {
            code: Number.isSafeInteger(l.code) ? l.code : C.InternalError,
            message: (p = l.message) !== null && p !== void 0 ? p : "Internal error"
          }
        });
    }).catch((l) => this._onerror(new Error(\`Failed to send response: \${l}\`))).finally(() => {
      this._requestHandlerAbortControllers.delete(e.id);
    });
  }
  _onprogress(e) {
    const { progressToken: t, ...r } = e.params, s = Number(t), a = this._progressHandlers.get(s);
    if (!a) {
      this._onerror(new Error(\`Received a progress notification for an unknown token: \${JSON.stringify(e)}\`));
      return;
    }
    const o = this._responseHandlers.get(s);
    if (this._timeoutInfo.has(s) && o)
      try {
        this._resetTimeout(s);
      } catch (c) {
        o(c);
        return;
      }
    a(r);
  }
  _onresponse(e) {
    const t = Number(e.id), r = this._responseHandlers.get(t);
    if (r === void 0) {
      this._onerror(new Error(\`Received a response for an unknown message ID: \${JSON.stringify(e)}\`));
      return;
    }
    if (this._responseHandlers.delete(t), this._progressHandlers.delete(t), this._cleanupTimeout(t), "result" in e)
      r(e);
    else {
      const s = new O(e.error.code, e.error.message, e.error.data);
      r(s);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    var e;
    await ((e = this._transport) === null || e === void 0 ? void 0 : e.close());
  }
  /**
   * Sends a request and wait for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(e, t, r) {
    return new Promise((s, a) => {
      var o, c, l, u;
      if (!this._transport) {
        a(new Error("Not connected"));
        return;
      }
      ((o = this._options) === null || o === void 0 ? void 0 : o.enforceStrictCapabilities) === !0 && this.assertCapabilityForMethod(e.method), (c = r == null ? void 0 : r.signal) === null || c === void 0 || c.throwIfAborted();
      const p = this._requestMessageId++, S = {
        ...e,
        jsonrpc: "2.0",
        id: p
      };
      r != null && r.onprogress && (this._progressHandlers.set(p, r.onprogress), S.params = {
        ...e.params,
        _meta: { progressToken: p }
      });
      const K = (A) => {
        var Q;
        this._responseHandlers.delete(p), this._progressHandlers.delete(p), this._cleanupTimeout(p), (Q = this._transport) === null || Q === void 0 || Q.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: p,
            reason: String(A)
          }
        }).catch((le) => this._onerror(new Error(\`Failed to send cancellation: \${le}\`))), a(A);
      };
      this._responseHandlers.set(p, (A) => {
        var Q;
        if (!(!((Q = r == null ? void 0 : r.signal) === null || Q === void 0) && Q.aborted)) {
          if (A instanceof Error)
            return a(A);
          try {
            const le = t.parse(A.result);
            s(le);
          } catch (le) {
            a(le);
          }
        }
      }), (l = r == null ? void 0 : r.signal) === null || l === void 0 || l.addEventListener("abort", () => {
        var A;
        K((A = r == null ? void 0 : r.signal) === null || A === void 0 ? void 0 : A.reason);
      });
      const ne = (u = r == null ? void 0 : r.timeout) !== null && u !== void 0 ? u : Bn, Yt = () => K(new O(C.RequestTimeout, "Request timed out", { timeout: ne }));
      this._setupTimeout(p, ne, r == null ? void 0 : r.maxTotalTimeout, Yt), this._transport.send(S).catch((A) => {
        this._cleanupTimeout(p), a(A);
      });
    });
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(e) {
    if (!this._transport)
      throw new Error("Not connected");
    this.assertNotificationCapability(e.method);
    const t = {
      ...e,
      jsonrpc: "2.0"
    };
    await this._transport.send(t);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(e, t) {
    const r = e.shape.method.value;
    this.assertRequestHandlerCapability(r), this._requestHandlers.set(r, (s, a) => Promise.resolve(t(e.parse(s), a)));
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(e) {
    this._requestHandlers.delete(e);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(e) {
    if (this._requestHandlers.has(e))
      throw new Error(\`A request handler for \${e} already exists, which would be overridden\`);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(e, t) {
    this._notificationHandlers.set(e.shape.method.value, (r) => Promise.resolve(t(e.parse(r))));
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(e) {
    this._notificationHandlers.delete(e);
  }
}
function Jn(n, e) {
  return Object.entries(e).reduce((t, [r, s]) => (s && typeof s == "object" ? t[r] = t[r] ? { ...t[r], ...s } : s : t[r] = s, t), { ...n });
}
class Yn extends Wn {
  /**
   * Initializes this server with the given name and version information.
   */
  constructor(e, t) {
    var r;
    super(t), this._serverInfo = e, this._capabilities = (r = t == null ? void 0 : t.capabilities) !== null && r !== void 0 ? r : {}, this._instructions = t == null ? void 0 : t.instructions, this.setRequestHandler(It, (s) => this._oninitialize(s)), this.setNotificationHandler(Et, () => {
      var s;
      return (s = this.oninitialized) === null || s === void 0 ? void 0 : s.call(this);
    });
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(e) {
    if (this.transport)
      throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = Jn(this._capabilities, e);
  }
  assertCapabilityForMethod(e) {
    var t, r;
    switch (e) {
      case "sampling/createMessage":
        if (!(!((t = this._clientCapabilities) === null || t === void 0) && t.sampling))
          throw new Error(\`Client does not support sampling (required for \${e})\`);
        break;
      case "roots/list":
        if (!(!((r = this._clientCapabilities) === null || r === void 0) && r.roots))
          throw new Error(\`Client does not support listing roots (required for \${e})\`);
        break;
    }
  }
  assertNotificationCapability(e) {
    switch (e) {
      case "notifications/message":
        if (!this._capabilities.logging)
          throw new Error(\`Server does not support logging (required for \${e})\`);
        break;
      case "notifications/resources/updated":
      case "notifications/resources/list_changed":
        if (!this._capabilities.resources)
          throw new Error(\`Server does not support notifying about resources (required for \${e})\`);
        break;
      case "notifications/tools/list_changed":
        if (!this._capabilities.tools)
          throw new Error(\`Server does not support notifying of tool list changes (required for \${e})\`);
        break;
      case "notifications/prompts/list_changed":
        if (!this._capabilities.prompts)
          throw new Error(\`Server does not support notifying of prompt list changes (required for \${e})\`);
        break;
    }
  }
  assertRequestHandlerCapability(e) {
    switch (e) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling)
          throw new Error(\`Server does not support sampling (required for \${e})\`);
        break;
      case "logging/setLevel":
        if (!this._capabilities.logging)
          throw new Error(\`Server does not support logging (required for \${e})\`);
        break;
      case "prompts/get":
      case "prompts/list":
        if (!this._capabilities.prompts)
          throw new Error(\`Server does not support prompts (required for \${e})\`);
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
        if (!this._capabilities.resources)
          throw new Error(\`Server does not support resources (required for \${e})\`);
        break;
      case "tools/call":
      case "tools/list":
        if (!this._capabilities.tools)
          throw new Error(\`Server does not support tools (required for \${e})\`);
        break;
    }
  }
  async _oninitialize(e) {
    const t = e.params.protocolVersion;
    return this._clientCapabilities = e.params.capabilities, this._clientVersion = e.params.clientInfo, {
      protocolVersion: on.includes(t) ? t : jt,
      capabilities: this.getCapabilities(),
      serverInfo: this._serverInfo,
      ...this._instructions && { instructions: this._instructions }
    };
  }
  /**
   * After initialization has completed, this will be populated with the client's reported capabilities.
   */
  getClientCapabilities() {
    return this._clientCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the client's name and version.
   */
  getClientVersion() {
    return this._clientVersion;
  }
  getCapabilities() {
    return this._capabilities;
  }
  async ping() {
    return this.request({ method: "ping" }, ct);
  }
  async createMessage(e, t) {
    return this.request({ method: "sampling/createMessage", params: e }, Ht, t);
  }
  async listRoots(e, t) {
    return this.request({ method: "roots/list", params: e }, Vt, t);
  }
  async sendLoggingMessage(e) {
    return this.notification({ method: "notifications/message", params: e });
  }
  async sendResourceUpdated(e) {
    return this.notification({
      method: "notifications/resources/updated",
      params: e
    });
  }
  async sendResourceListChanged() {
    return this.notification({
      method: "notifications/resources/list_changed"
    });
  }
  async sendToolListChanged() {
    return this.notification({ method: "notifications/tools/list_changed" });
  }
  async sendPromptListChanged() {
    return this.notification({ method: "notifications/prompts/list_changed" });
  }
}
const Gn = Symbol("Let zodToJsonSchema decide on which parser to use"), gt = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  applyRegexFlags: !1,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
}, Kn = (n) => typeof n == "string" ? {
  ...gt,
  name: n
} : {
  ...gt,
  ...n
}, Qn = (n) => {
  const e = Kn(n), t = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
  return {
    ...e,
    currentPath: t,
    propertyPath: void 0,
    seen: new Map(Object.entries(e.definitions).map(([r, s]) => [
      s._def,
      {
        def: s._def,
        path: [...e.basePath, e.definitionPath, r],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};
function Ft(n, e, t, r) {
  r != null && r.errorMessages && t && (n.errorMessage = {
    ...n.errorMessage,
    [e]: t
  });
}
function k(n, e, t, r, s) {
  n[e] = t, Ft(n, e, r, s);
}
function Xn() {
  return {};
}
function es(n, e) {
  var r, s, a;
  const t = {
    type: "array"
  };
  return (r = n.type) != null && r._def && ((a = (s = n.type) == null ? void 0 : s._def) == null ? void 0 : a.typeName) !== h.ZodAny && (t.items = x(n.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), n.minLength && k(t, "minItems", n.minLength.value, n.minLength.message, e), n.maxLength && k(t, "maxItems", n.maxLength.value, n.maxLength.message, e), n.exactLength && (k(t, "minItems", n.exactLength.value, n.exactLength.message, e), k(t, "maxItems", n.exactLength.value, n.exactLength.message, e)), t;
}
function ts(n, e) {
  const t = {
    type: "integer",
    format: "int64"
  };
  if (!n.checks)
    return t;
  for (const r of n.checks)
    switch (r.kind) {
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? k(t, "minimum", r.value, r.message, e) : k(t, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMinimum = !0), k(t, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? k(t, "maximum", r.value, r.message, e) : k(t, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMaximum = !0), k(t, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        k(t, "multipleOf", r.value, r.message, e);
        break;
    }
  return t;
}
function rs() {
  return {
    type: "boolean"
  };
}
function Ut(n, e) {
  return x(n.type._def, e);
}
const ns = (n, e) => x(n.innerType._def, e);
function Bt(n, e, t) {
  const r = t ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((s, a) => Bt(n, e, s))
    };
  switch (r) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return ss(n, e);
  }
}
const ss = (n, e) => {
  const t = {
    type: "integer",
    format: "unix-time"
  };
  if (e.target === "openApi3")
    return t;
  for (const r of n.checks)
    switch (r.kind) {
      case "min":
        k(
          t,
          "minimum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
      case "max":
        k(
          t,
          "maximum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
    }
  return t;
};
function as(n, e) {
  return {
    ...x(n.innerType._def, e),
    default: n.defaultValue()
  };
}
function is(n, e) {
  return e.effectStrategy === "input" ? x(n.schema._def, e) : {};
}
function os(n) {
  return {
    type: "string",
    enum: Array.from(n.values)
  };
}
const cs = (n) => "type" in n && n.type === "string" ? !1 : "allOf" in n;
function us(n, e) {
  const t = [
    x(n.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    x(n.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((a) => !!a);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const s = [];
  return t.forEach((a) => {
    if (cs(a))
      s.push(...a.allOf), a.unevaluatedProperties === void 0 && (r = void 0);
    else {
      let o = a;
      if ("additionalProperties" in a && a.additionalProperties === !1) {
        const { additionalProperties: c, ...l } = a;
        o = l;
      } else
        r = void 0;
      s.push(o);
    }
  }), s.length ? {
    allOf: s,
    ...r
  } : void 0;
}
function ls(n, e) {
  const t = typeof n.value;
  return t !== "bigint" && t !== "number" && t !== "boolean" && t !== "string" ? {
    type: Array.isArray(n.value) ? "array" : "object"
  } : e.target === "openApi3" ? {
    type: t === "bigint" ? "integer" : t,
    enum: [n.value]
  } : {
    type: t === "bigint" ? "integer" : t,
    const: n.value
  };
}
let Ue;
const N = {
  /**
   * \`c\` was changed to \`[cC]\` to replicate /i flag
   */
  cuid: /^[cC][^\\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * \`a-z\` was added to replicate /i flag
   */
  email: /^(?!\\.)(?!.*\\.\\.)([a-zA-Z0-9_'+\\-\\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\\-]*\\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => (Ue === void 0 && (Ue = RegExp("^(\\\\p{Extended_Pictographic}|\\\\p{Emoji_Component})+$", "u")), Ue),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]*$/
};
function Wt(n, e) {
  const t = {
    type: "string"
  };
  if (n.checks)
    for (const r of n.checks)
      switch (r.kind) {
        case "min":
          k(t, "minLength", typeof t.minLength == "number" ? Math.max(t.minLength, r.value) : r.value, r.message, e);
          break;
        case "max":
          k(t, "maxLength", typeof t.maxLength == "number" ? Math.min(t.maxLength, r.value) : r.value, r.message, e);
          break;
        case "email":
          switch (e.emailStrategy) {
            case "format:email":
              I(t, "email", r.message, e);
              break;
            case "format:idn-email":
              I(t, "idn-email", r.message, e);
              break;
            case "pattern:zod":
              R(t, N.email, r.message, e);
              break;
          }
          break;
        case "url":
          I(t, "uri", r.message, e);
          break;
        case "uuid":
          I(t, "uuid", r.message, e);
          break;
        case "regex":
          R(t, r.regex, r.message, e);
          break;
        case "cuid":
          R(t, N.cuid, r.message, e);
          break;
        case "cuid2":
          R(t, N.cuid2, r.message, e);
          break;
        case "startsWith":
          R(t, RegExp(\`^\${Be(r.value, e)}\`), r.message, e);
          break;
        case "endsWith":
          R(t, RegExp(\`\${Be(r.value, e)}$\`), r.message, e);
          break;
        case "datetime":
          I(t, "date-time", r.message, e);
          break;
        case "date":
          I(t, "date", r.message, e);
          break;
        case "time":
          I(t, "time", r.message, e);
          break;
        case "duration":
          I(t, "duration", r.message, e);
          break;
        case "length":
          k(t, "minLength", typeof t.minLength == "number" ? Math.max(t.minLength, r.value) : r.value, r.message, e), k(t, "maxLength", typeof t.maxLength == "number" ? Math.min(t.maxLength, r.value) : r.value, r.message, e);
          break;
        case "includes": {
          R(t, RegExp(Be(r.value, e)), r.message, e);
          break;
        }
        case "ip": {
          r.version !== "v6" && I(t, "ipv4", r.message, e), r.version !== "v4" && I(t, "ipv6", r.message, e);
          break;
        }
        case "base64url":
          R(t, N.base64url, r.message, e);
          break;
        case "jwt":
          R(t, N.jwt, r.message, e);
          break;
        case "cidr": {
          r.version !== "v6" && R(t, N.ipv4Cidr, r.message, e), r.version !== "v4" && R(t, N.ipv6Cidr, r.message, e);
          break;
        }
        case "emoji":
          R(t, N.emoji(), r.message, e);
          break;
        case "ulid": {
          R(t, N.ulid, r.message, e);
          break;
        }
        case "base64": {
          switch (e.base64Strategy) {
            case "format:binary": {
              I(t, "binary", r.message, e);
              break;
            }
            case "contentEncoding:base64": {
              k(t, "contentEncoding", "base64", r.message, e);
              break;
            }
            case "pattern:zod": {
              R(t, N.base64, r.message, e);
              break;
            }
          }
          break;
        }
        case "nanoid":
          R(t, N.nanoid, r.message, e);
      }
  return t;
}
function Be(n, e) {
  return e.patternStrategy === "escape" ? hs(n) : n;
}
const ds = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function hs(n) {
  let e = "";
  for (let t = 0; t < n.length; t++)
    ds.has(n[t]) || (e += "\\\\"), e += n[t];
  return e;
}
function I(n, e, t, r) {
  var s;
  n.format || (s = n.anyOf) != null && s.some((a) => a.format) ? (n.anyOf || (n.anyOf = []), n.format && (n.anyOf.push({
    format: n.format,
    ...n.errorMessage && r.errorMessages && {
      errorMessage: { format: n.errorMessage.format }
    }
  }), delete n.format, n.errorMessage && (delete n.errorMessage.format, Object.keys(n.errorMessage).length === 0 && delete n.errorMessage)), n.anyOf.push({
    format: e,
    ...t && r.errorMessages && { errorMessage: { format: t } }
  })) : k(n, "format", e, t, r);
}
function R(n, e, t, r) {
  var s;
  n.pattern || (s = n.allOf) != null && s.some((a) => a.pattern) ? (n.allOf || (n.allOf = []), n.pattern && (n.allOf.push({
    pattern: n.pattern,
    ...n.errorMessage && r.errorMessages && {
      errorMessage: { pattern: n.errorMessage.pattern }
    }
  }), delete n.pattern, n.errorMessage && (delete n.errorMessage.pattern, Object.keys(n.errorMessage).length === 0 && delete n.errorMessage)), n.allOf.push({
    pattern: yt(e, r),
    ...t && r.errorMessages && { errorMessage: { pattern: t } }
  })) : k(n, "pattern", yt(e, r), t, r);
}
function yt(n, e) {
  var l;
  if (!e.applyRegexFlags || !n.flags)
    return n.source;
  const t = {
    i: n.flags.includes("i"),
    m: n.flags.includes("m"),
    s: n.flags.includes("s")
    // \`.\` matches newlines
  }, r = t.i ? n.source.toLowerCase() : n.source;
  let s = "", a = !1, o = !1, c = !1;
  for (let u = 0; u < r.length; u++) {
    if (a) {
      s += r[u], a = !1;
      continue;
    }
    if (t.i) {
      if (o) {
        if (r[u].match(/[a-z]/)) {
          c ? (s += r[u], s += \`\${r[u - 2]}-\${r[u]}\`.toUpperCase(), c = !1) : r[u + 1] === "-" && ((l = r[u + 2]) != null && l.match(/[a-z]/)) ? (s += r[u], c = !0) : s += \`\${r[u]}\${r[u].toUpperCase()}\`;
          continue;
        }
      } else if (r[u].match(/[a-z]/)) {
        s += \`[\${r[u]}\${r[u].toUpperCase()}]\`;
        continue;
      }
    }
    if (t.m) {
      if (r[u] === "^") {
        s += \`(^|(?<=[\\r
]))\`;
        continue;
      } else if (r[u] === "$") {
        s += \`($|(?=[\\r
]))\`;
        continue;
      }
    }
    if (t.s && r[u] === ".") {
      s += o ? \`\${r[u]}\\r
\` : \`[\${r[u]}\\r
]\`;
      continue;
    }
    s += r[u], r[u] === "\\\\" ? a = !0 : o && r[u] === "]" ? o = !1 : !o && r[u] === "[" && (o = !0);
  }
  try {
    new RegExp(s);
  } catch {
    return console.warn(\`Could not convert regex pattern at \${e.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source\`), n.source;
  }
  return s;
}
function Jt(n, e) {
  var r, s, a, o, c, l;
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && ((r = n.keyType) == null ? void 0 : r._def.typeName) === h.ZodEnum)
    return {
      type: "object",
      required: n.keyType._def.values,
      properties: n.keyType._def.values.reduce((u, p) => ({
        ...u,
        [p]: x(n.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", p]
        }) ?? {}
      }), {}),
      additionalProperties: !1
    };
  const t = {
    type: "object",
    additionalProperties: x(n.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (e.target === "openApi3")
    return t;
  if (((s = n.keyType) == null ? void 0 : s._def.typeName) === h.ZodString && ((a = n.keyType._def.checks) != null && a.length)) {
    const { type: u, ...p } = Wt(n.keyType._def, e);
    return {
      ...t,
      propertyNames: p
    };
  } else {
    if (((o = n.keyType) == null ? void 0 : o._def.typeName) === h.ZodEnum)
      return {
        ...t,
        propertyNames: {
          enum: n.keyType._def.values
        }
      };
    if (((c = n.keyType) == null ? void 0 : c._def.typeName) === h.ZodBranded && n.keyType._def.type._def.typeName === h.ZodString && ((l = n.keyType._def.type._def.checks) != null && l.length)) {
      const { type: u, ...p } = Ut(n.keyType._def, e);
      return {
        ...t,
        propertyNames: p
      };
    }
  }
  return t;
}
function ps(n, e) {
  if (e.mapStrategy === "record")
    return Jt(n, e);
  const t = x(n.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || {}, r = x(n.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [t, r],
      minItems: 2,
      maxItems: 2
    }
  };
}
function ms(n) {
  const e = n.values, r = Object.keys(n.values).filter((a) => typeof e[e[a]] != "number").map((a) => e[a]), s = Array.from(new Set(r.map((a) => typeof a)));
  return {
    type: s.length === 1 ? s[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function fs() {
  return {
    not: {}
  };
}
function gs(n) {
  return n.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const Me = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function ys(n, e) {
  if (e.target === "openApi3")
    return vt(n, e);
  const t = n.options instanceof Map ? Array.from(n.options.values()) : n.options;
  if (t.every((r) => r._def.typeName in Me && (!r._def.checks || !r._def.checks.length))) {
    const r = t.reduce((s, a) => {
      const o = Me[a._def.typeName];
      return o && !s.includes(o) ? [...s, o] : s;
    }, []);
    return {
      type: r.length > 1 ? r : r[0]
    };
  } else if (t.every((r) => r._def.typeName === "ZodLiteral" && !r.description)) {
    const r = t.reduce((s, a) => {
      const o = typeof a._def.value;
      switch (o) {
        case "string":
        case "number":
        case "boolean":
          return [...s, o];
        case "bigint":
          return [...s, "integer"];
        case "object":
          if (a._def.value === null)
            return [...s, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return s;
      }
    }, []);
    if (r.length === t.length) {
      const s = r.filter((a, o, c) => c.indexOf(a) === o);
      return {
        type: s.length > 1 ? s : s[0],
        enum: t.reduce((a, o) => a.includes(o._def.value) ? a : [...a, o._def.value], [])
      };
    }
  } else if (t.every((r) => r._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: t.reduce((r, s) => [
        ...r,
        ...s._def.values.filter((a) => !r.includes(a))
      ], [])
    };
  return vt(n, e);
}
const vt = (n, e) => {
  const t = (n.options instanceof Map ? Array.from(n.options.values()) : n.options).map((r, s) => x(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", \`\${s}\`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return t.length ? { anyOf: t } : void 0;
};
function vs(n, e) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(n.innerType._def.typeName) && (!n.innerType._def.checks || !n.innerType._def.checks.length))
    return e.target === "openApi3" ? {
      type: Me[n.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        Me[n.innerType._def.typeName],
        "null"
      ]
    };
  if (e.target === "openApi3") {
    const r = x(n.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const t = x(n.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return t && { anyOf: [t, { type: "null" }] };
}
function _s(n, e) {
  const t = {
    type: "number"
  };
  if (!n.checks)
    return t;
  for (const r of n.checks)
    switch (r.kind) {
      case "int":
        t.type = "integer", Ft(t, "type", r.message, e);
        break;
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? k(t, "minimum", r.value, r.message, e) : k(t, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMinimum = !0), k(t, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? k(t, "maximum", r.value, r.message, e) : k(t, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (t.exclusiveMaximum = !0), k(t, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        k(t, "multipleOf", r.value, r.message, e);
        break;
    }
  return t;
}
function bs(n, e) {
  return e.removeAdditionalStrategy === "strict" ? n.catchall._def.typeName === "ZodNever" ? n.unknownKeys !== "strict" : x(n.catchall._def, {
    ...e,
    currentPath: [...e.currentPath, "additionalProperties"]
  }) ?? !0 : n.catchall._def.typeName === "ZodNever" ? n.unknownKeys === "passthrough" : x(n.catchall._def, {
    ...e,
    currentPath: [...e.currentPath, "additionalProperties"]
  }) ?? !0;
}
function xs(n, e) {
  const t = e.target === "openAi", r = {
    type: "object",
    ...Object.entries(n.shape()).reduce((s, [a, o]) => {
      if (o === void 0 || o._def === void 0)
        return s;
      let c = o.isOptional();
      c && t && (o instanceof $ && (o = o._def.innerType), o.isNullable() || (o = o.nullable()), c = !1);
      const l = x(o._def, {
        ...e,
        currentPath: [...e.currentPath, "properties", a],
        propertyPath: [...e.currentPath, "properties", a]
      });
      return l === void 0 ? s : {
        properties: { ...s.properties, [a]: l },
        required: c ? s.required : [...s.required, a]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: bs(n, e)
  };
  return r.required.length || delete r.required, r;
}
const ks = (n, e) => {
  var r;
  if (e.currentPath.toString() === ((r = e.propertyPath) == null ? void 0 : r.toString()))
    return x(n.innerType._def, e);
  const t = x(n.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return t ? {
    anyOf: [
      {
        not: {}
      },
      t
    ]
  } : {};
}, ws = (n, e) => {
  if (e.pipeStrategy === "input")
    return x(n.in._def, e);
  if (e.pipeStrategy === "output")
    return x(n.out._def, e);
  const t = x(n.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = x(n.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", t ? "1" : "0"]
  });
  return {
    allOf: [t, r].filter((s) => s !== void 0)
  };
};
function Ss(n, e) {
  return x(n.type._def, e);
}
function Ts(n, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: x(n.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return n.minSize && k(r, "minItems", n.minSize.value, n.minSize.message, e), n.maxSize && k(r, "maxItems", n.maxSize.value, n.maxSize.message, e), r;
}
function Rs(n, e) {
  return n.rest ? {
    type: "array",
    minItems: n.items.length,
    items: n.items.map((t, r) => x(t._def, {
      ...e,
      currentPath: [...e.currentPath, "items", \`\${r}\`]
    })).reduce((t, r) => r === void 0 ? t : [...t, r], []),
    additionalItems: x(n.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: n.items.length,
    maxItems: n.items.length,
    items: n.items.map((t, r) => x(t._def, {
      ...e,
      currentPath: [...e.currentPath, "items", \`\${r}\`]
    })).reduce((t, r) => r === void 0 ? t : [...t, r], [])
  };
}
function Cs() {
  return {
    not: {}
  };
}
function Ps() {
  return {};
}
const Zs = (n, e) => x(n.innerType._def, e), js = (n, e, t) => {
  switch (e) {
    case h.ZodString:
      return Wt(n, t);
    case h.ZodNumber:
      return _s(n, t);
    case h.ZodObject:
      return xs(n, t);
    case h.ZodBigInt:
      return ts(n, t);
    case h.ZodBoolean:
      return rs();
    case h.ZodDate:
      return Bt(n, t);
    case h.ZodUndefined:
      return Cs();
    case h.ZodNull:
      return gs(t);
    case h.ZodArray:
      return es(n, t);
    case h.ZodUnion:
    case h.ZodDiscriminatedUnion:
      return ys(n, t);
    case h.ZodIntersection:
      return us(n, t);
    case h.ZodTuple:
      return Rs(n, t);
    case h.ZodRecord:
      return Jt(n, t);
    case h.ZodLiteral:
      return ls(n, t);
    case h.ZodEnum:
      return os(n);
    case h.ZodNativeEnum:
      return ms(n);
    case h.ZodNullable:
      return vs(n, t);
    case h.ZodOptional:
      return ks(n, t);
    case h.ZodMap:
      return ps(n, t);
    case h.ZodSet:
      return Ts(n, t);
    case h.ZodLazy:
      return () => n.getter()._def;
    case h.ZodPromise:
      return Ss(n, t);
    case h.ZodNaN:
    case h.ZodNever:
      return fs();
    case h.ZodEffects:
      return is(n, t);
    case h.ZodAny:
      return Xn();
    case h.ZodUnknown:
      return Ps();
    case h.ZodDefault:
      return as(n, t);
    case h.ZodBranded:
      return Ut(n, t);
    case h.ZodReadonly:
      return Zs(n, t);
    case h.ZodCatch:
      return ns(n, t);
    case h.ZodPipeline:
      return ws(n, t);
    case h.ZodFunction:
    case h.ZodVoid:
    case h.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function x(n, e, t = !1) {
  var c;
  const r = e.seen.get(n);
  if (e.override) {
    const l = (c = e.override) == null ? void 0 : c.call(e, n, e, r, t);
    if (l !== Gn)
      return l;
  }
  if (r && !t) {
    const l = As(r, e);
    if (l !== void 0)
      return l;
  }
  const s = { def: n, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(n, s);
  const a = js(n, n.typeName, e), o = typeof a == "function" ? x(a(), e) : a;
  if (o && Ns(n, e, o), e.postProcess) {
    const l = e.postProcess(o, n, e);
    return s.jsonSchema = o, l;
  }
  return s.jsonSchema = o, o;
}
const As = (n, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: n.path.join("/") };
    case "relative":
      return { $ref: Os(e.currentPath, n.path) };
    case "none":
    case "seen":
      return n.path.length < e.currentPath.length && n.path.every((t, r) => e.currentPath[r] === t) ? (console.warn(\`Recursive reference detected at \${e.currentPath.join("/")}! Defaulting to any\`), {}) : e.$refStrategy === "seen" ? {} : void 0;
  }
}, Os = (n, e) => {
  let t = 0;
  for (; t < n.length && t < e.length && n[t] === e[t]; t++)
    ;
  return [(n.length - t).toString(), ...e.slice(t)].join("/");
}, Ns = (n, e, t) => (n.description && (t.description = n.description, e.markdownDescription && (t.markdownDescription = n.description)), t), Is = (n, e) => {
  const t = Qn(e), r = typeof e == "object" && e.definitions ? Object.entries(e.definitions).reduce((l, [u, p]) => ({
    ...l,
    [u]: x(p._def, {
      ...t,
      currentPath: [...t.basePath, t.definitionPath, u]
    }, !0) ?? {}
  }), {}) : void 0, s = typeof e == "string" ? e : (e == null ? void 0 : e.nameStrategy) === "title" || e == null ? void 0 : e.name, a = x(n._def, s === void 0 ? t : {
    ...t,
    currentPath: [...t.basePath, t.definitionPath, s]
  }, !1) ?? {}, o = typeof e == "object" && e.name !== void 0 && e.nameStrategy === "title" ? e.name : void 0;
  o !== void 0 && (a.title = o);
  const c = s === void 0 ? r ? {
    ...a,
    [t.definitionPath]: r
  } : a : {
    $ref: [
      ...t.$refStrategy === "relative" ? [] : t.basePath,
      t.definitionPath,
      s
    ].join("/"),
    [t.definitionPath]: {
      ...r,
      [s]: a
    }
  };
  return t.target === "jsonSchema7" ? c.$schema = "http://json-schema.org/draft-07/schema#" : (t.target === "jsonSchema2019-09" || t.target === "openAi") && (c.$schema = "https://json-schema.org/draft/2019-09/schema#"), t.target === "openAi" && ("anyOf" in c || "oneOf" in c || "allOf" in c || "type" in c && Array.isArray(c.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), c;
};
var at;
(function(n) {
  n.Completable = "McpCompletable";
})(at || (at = {}));
class it extends _ {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
it.create = (n, e) => new it({
  type: n,
  typeName: at.Completable,
  complete: e.complete,
  ...Es(e)
});
function Es(n) {
  if (!n)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: s } = n;
  if (e && (t || r))
    throw new Error(\`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.\`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, c) => {
    var l, u;
    const { message: p } = n;
    return o.code === "invalid_enum_value" ? { message: p ?? c.defaultError } : typeof c.data > "u" ? { message: (l = p ?? r) !== null && l !== void 0 ? l : c.defaultError } : o.code !== "invalid_type" ? { message: c.defaultError } : { message: (u = p ?? t) !== null && u !== void 0 ? u : c.defaultError };
  }, description: s };
}
class Ms {
  constructor(e, t) {
    this._registeredResources = {}, this._registeredResourceTemplates = {}, this._registeredTools = {}, this._registeredPrompts = {}, this._toolHandlersInitialized = !1, this._completionHandlerInitialized = !1, this._resourceHandlersInitialized = !1, this._promptHandlersInitialized = !1, this.server = new Yn(e, t);
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The \`server\` object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(e) {
    return await this.server.connect(e);
  }
  /**
   * Closes the connection.
   */
  async close() {
    await this.server.close();
  }
  setToolRequestHandlers() {
    this._toolHandlersInitialized || (this.server.assertCanSetRequestHandler(rt.shape.method.value), this.server.assertCanSetRequestHandler(nt.shape.method.value), this.server.registerCapabilities({
      tools: {}
    }), this.server.setRequestHandler(rt, () => ({
      tools: Object.entries(this._registeredTools).map(([e, t]) => ({
        name: e,
        description: t.description,
        inputSchema: t.inputSchema ? Is(t.inputSchema, {
          strictUnions: !0
        }) : $s
      }))
    })), this.server.setRequestHandler(nt, async (e, t) => {
      const r = this._registeredTools[e.params.name];
      if (!r)
        throw new O(C.InvalidParams, \`Tool \${e.params.name} not found\`);
      if (r.inputSchema) {
        const s = await r.inputSchema.safeParseAsync(e.params.arguments);
        if (!s.success)
          throw new O(C.InvalidParams, \`Invalid arguments for tool \${e.params.name}: \${s.error.message}\`);
        const a = s.data, o = r.callback;
        try {
          return await Promise.resolve(o(a, t));
        } catch (c) {
          return {
            content: [
              {
                type: "text",
                text: c instanceof Error ? c.message : String(c)
              }
            ],
            isError: !0
          };
        }
      } else {
        const s = r.callback;
        try {
          return await Promise.resolve(s(t));
        } catch (a) {
          return {
            content: [
              {
                type: "text",
                text: a instanceof Error ? a.message : String(a)
              }
            ],
            isError: !0
          };
        }
      }
    }), this._toolHandlersInitialized = !0);
  }
  setCompletionRequestHandler() {
    this._completionHandlerInitialized || (this.server.assertCanSetRequestHandler(st.shape.method.value), this.server.setRequestHandler(st, async (e) => {
      switch (e.params.ref.type) {
        case "ref/prompt":
          return this.handlePromptCompletion(e, e.params.ref);
        case "ref/resource":
          return this.handleResourceCompletion(e, e.params.ref);
        default:
          throw new O(C.InvalidParams, \`Invalid completion reference: \${e.params.ref}\`);
      }
    }), this._completionHandlerInitialized = !0);
  }
  async handlePromptCompletion(e, t) {
    const r = this._registeredPrompts[t.name];
    if (!r)
      throw new O(C.InvalidParams, \`Prompt \${e.params.ref.name} not found\`);
    if (!r.argsSchema)
      return Pe;
    const s = r.argsSchema.shape[e.params.argument.name];
    if (!(s instanceof it))
      return Pe;
    const o = await s._def.complete(e.params.argument.value);
    return _t(o);
  }
  async handleResourceCompletion(e, t) {
    const r = Object.values(this._registeredResourceTemplates).find((o) => o.resourceTemplate.uriTemplate.toString() === t.uri);
    if (!r) {
      if (this._registeredResources[t.uri])
        return Pe;
      throw new O(C.InvalidParams, \`Resource template \${e.params.ref.uri} not found\`);
    }
    const s = r.resourceTemplate.completeCallback(e.params.argument.name);
    if (!s)
      return Pe;
    const a = await s(e.params.argument.value);
    return _t(a);
  }
  setResourceRequestHandlers() {
    this._resourceHandlersInitialized || (this.server.assertCanSetRequestHandler(Ke.shape.method.value), this.server.assertCanSetRequestHandler(Qe.shape.method.value), this.server.assertCanSetRequestHandler(Xe.shape.method.value), this.server.registerCapabilities({
      resources: {}
    }), this.server.setRequestHandler(Ke, async (e, t) => {
      const r = Object.entries(this._registeredResources).map(([a, o]) => ({
        uri: a,
        name: o.name,
        ...o.metadata
      })), s = [];
      for (const a of Object.values(this._registeredResourceTemplates)) {
        if (!a.resourceTemplate.listCallback)
          continue;
        const o = await a.resourceTemplate.listCallback(t);
        for (const c of o.resources)
          s.push({
            ...c,
            ...a.metadata
          });
      }
      return { resources: [...r, ...s] };
    }), this.server.setRequestHandler(Qe, async () => ({ resourceTemplates: Object.entries(this._registeredResourceTemplates).map(([t, r]) => ({
      name: t,
      uriTemplate: r.resourceTemplate.uriTemplate.toString(),
      ...r.metadata
    })) })), this.server.setRequestHandler(Xe, async (e, t) => {
      const r = new URL(e.params.uri), s = this._registeredResources[r.toString()];
      if (s)
        return s.readCallback(r, t);
      for (const a of Object.values(this._registeredResourceTemplates)) {
        const o = a.resourceTemplate.uriTemplate.match(r.toString());
        if (o)
          return a.readCallback(r, o, t);
      }
      throw new O(C.InvalidParams, \`Resource \${r} not found\`);
    }), this.setCompletionRequestHandler(), this._resourceHandlersInitialized = !0);
  }
  setPromptRequestHandlers() {
    this._promptHandlersInitialized || (this.server.assertCanSetRequestHandler(et.shape.method.value), this.server.assertCanSetRequestHandler(tt.shape.method.value), this.server.registerCapabilities({
      prompts: {}
    }), this.server.setRequestHandler(et, () => ({
      prompts: Object.entries(this._registeredPrompts).map(([e, t]) => ({
        name: e,
        description: t.description,
        arguments: t.argsSchema ? Ls(t.argsSchema) : void 0
      }))
    })), this.server.setRequestHandler(tt, async (e, t) => {
      const r = this._registeredPrompts[e.params.name];
      if (!r)
        throw new O(C.InvalidParams, \`Prompt \${e.params.name} not found\`);
      if (r.argsSchema) {
        const s = await r.argsSchema.safeParseAsync(e.params.arguments);
        if (!s.success)
          throw new O(C.InvalidParams, \`Invalid arguments for prompt \${e.params.name}: \${s.error.message}\`);
        const a = s.data, o = r.callback;
        return await Promise.resolve(o(a, t));
      } else {
        const s = r.callback;
        return await Promise.resolve(s(t));
      }
    }), this.setCompletionRequestHandler(), this._promptHandlersInitialized = !0);
  }
  resource(e, t, ...r) {
    let s;
    typeof r[0] == "object" && (s = r.shift());
    const a = r[0];
    if (typeof t == "string") {
      if (this._registeredResources[t])
        throw new Error(\`Resource \${t} is already registered\`);
      this._registeredResources[t] = {
        name: e,
        metadata: s,
        readCallback: a
      };
    } else {
      if (this._registeredResourceTemplates[e])
        throw new Error(\`Resource template \${e} is already registered\`);
      this._registeredResourceTemplates[e] = {
        resourceTemplate: t,
        metadata: s,
        readCallback: a
      };
    }
    this.setResourceRequestHandlers();
  }
  tool(e, ...t) {
    if (this._registeredTools[e])
      throw new Error(\`Tool \${e} is already registered\`);
    let r;
    typeof t[0] == "string" && (r = t.shift());
    let s;
    t.length > 1 && (s = t.shift());
    const a = t[0];
    this._registeredTools[e] = {
      description: r,
      inputSchema: s === void 0 ? void 0 : i.object(s),
      callback: a
    }, this.setToolRequestHandlers();
  }
  prompt(e, ...t) {
    if (this._registeredPrompts[e])
      throw new Error(\`Prompt \${e} is already registered\`);
    let r;
    typeof t[0] == "string" && (r = t.shift());
    let s;
    t.length > 1 && (s = t.shift());
    const a = t[0];
    this._registeredPrompts[e] = {
      description: r,
      argsSchema: s === void 0 ? void 0 : i.object(s),
      callback: a
    }, this.setPromptRequestHandlers();
  }
}
const $s = {
  type: "object"
};
function Ls(n) {
  return Object.entries(n.shape).map(([e, t]) => ({
    name: e,
    description: t.description,
    required: !t.isOptional()
  }));
}
function _t(n) {
  return {
    completion: {
      values: n.slice(0, 100),
      total: n.length,
      hasMore: n.length > 100
    }
  };
}
const Pe = {
  completion: {
    values: [],
    hasMore: !1
  }
};
class zs {
  constructor() {
    ht(this, "onmessage");
  }
  async start() {
    self.addEventListener("message", (e) => {
      var t;
      (t = this.onmessage) == null || t.call(this, e.data);
    });
  }
  async send(e) {
    self.postMessage(e);
  }
  close() {
    throw new Error("Method not implemented.");
  }
}
async function qs() {
  const n = new Ms({
    name: "sample",
    version: "1.0.0"
  });
  n.tool(
    "calculate-bmi",
    {
      weightKg: i.number(),
      heightM: i.number()
    },
    async ({ weightKg: t, heightM: r }) => ({
      content: [
        {
          type: "text",
          text: String(t / (r * r))
        }
      ]
    })
  );
  const e = new zs();
  await n.connect(e);
}
qs();
`, Je = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Qe], { type: "text/javascript;charset=utf-8" });
function On(r) {
  let e;
  try {
    if (e = Je && (self.URL || self.webkitURL).createObjectURL(Je), !e) throw "";
    const n = new Worker(e, {
      type: "module",
      name: r == null ? void 0 : r.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Qe),
      {
        type: "module",
        name: r == null ? void 0 : r.name
      }
    );
  }
}
var b;
(function(r) {
  r.assertEqual = (s) => s;
  function e(s) {
  }
  r.assertIs = e;
  function n(s) {
    throw new Error();
  }
  r.assertNever = n, r.arrayToEnum = (s) => {
    const a = {};
    for (const o of s)
      a[o] = o;
    return a;
  }, r.getValidEnumValues = (s) => {
    const a = r.objectKeys(s).filter((c) => typeof s[s[c]] != "number"), o = {};
    for (const c of a)
      o[c] = s[c];
    return r.objectValues(o);
  }, r.objectValues = (s) => r.objectKeys(s).map(function(a) {
    return s[a];
  }), r.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
    return a;
  }, r.find = (s, a) => {
    for (const o of s)
      if (a(o))
        return o;
  }, r.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function t(s, a = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(a);
  }
  r.joinValues = t, r.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(b || (b = {}));
var ze;
(function(r) {
  r.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(ze || (ze = {}));
const p = b.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), q = (r) => {
  switch (typeof r) {
    case "undefined":
      return p.undefined;
    case "string":
      return p.string;
    case "number":
      return isNaN(r) ? p.nan : p.number;
    case "boolean":
      return p.boolean;
    case "function":
      return p.function;
    case "bigint":
      return p.bigint;
    case "symbol":
      return p.symbol;
    case "object":
      return Array.isArray(r) ? p.array : r === null ? p.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? p.promise : typeof Map < "u" && r instanceof Map ? p.map : typeof Set < "u" && r instanceof Set ? p.set : typeof Date < "u" && r instanceof Date ? p.date : p.object;
    default:
      return p.unknown;
  }
}, d = b.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Pn = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class S extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (t) => {
      this.issues = [...this.issues, t];
    }, this.addIssues = (t = []) => {
      this.issues = [...this.issues, ...t];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const n = e || function(a) {
      return a.message;
    }, t = { _errors: [] }, s = (a) => {
      for (const o of a.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          t._errors.push(n(o));
        else {
          let c = t, l = 0;
          for (; l < o.path.length; ) {
            const u = o.path[l];
            l === o.path.length - 1 ? (c[u] = c[u] || { _errors: [] }, c[u]._errors.push(n(o))) : c[u] = c[u] || { _errors: [] }, c = c[u], l++;
          }
        }
    };
    return s(this), t;
  }
  static assert(e) {
    if (!(e instanceof S))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, b.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, t = [];
    for (const s of this.issues)
      s.path.length > 0 ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(e(s))) : t.push(e(s));
    return { formErrors: t, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
S.create = (r) => new S(r);
const te = (r, e) => {
  let n;
  switch (r.code) {
    case d.invalid_type:
      r.received === p.undefined ? n = "Required" : n = `Expected ${r.expected}, received ${r.received}`;
      break;
    case d.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(r.expected, b.jsonStringifyReplacer)}`;
      break;
    case d.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${b.joinValues(r.keys, ", ")}`;
      break;
    case d.invalid_union:
      n = "Invalid input";
      break;
    case d.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${b.joinValues(r.options)}`;
      break;
    case d.invalid_enum_value:
      n = `Invalid enum value. Expected ${b.joinValues(r.options)}, received '${r.received}'`;
      break;
    case d.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case d.invalid_return_type:
      n = "Invalid function return type";
      break;
    case d.invalid_date:
      n = "Invalid date";
      break;
    case d.invalid_string:
      typeof r.validation == "object" ? "includes" in r.validation ? (n = `Invalid input: must include "${r.validation.includes}"`, typeof r.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith" in r.validation ? n = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? n = `Invalid input: must end with "${r.validation.endsWith}"` : b.assertNever(r.validation) : r.validation !== "regex" ? n = `Invalid ${r.validation}` : n = "Invalid";
      break;
    case d.too_small:
      r.type === "array" ? n = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? n = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? n = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? n = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : n = "Invalid input";
      break;
    case d.too_big:
      r.type === "array" ? n = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? n = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? n = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? n = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? n = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : n = "Invalid input";
      break;
    case d.custom:
      n = "Invalid input";
      break;
    case d.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case d.not_multiple_of:
      n = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case d.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, b.assertNever(r);
  }
  return { message: n };
};
let en = te;
function En(r) {
  en = r;
}
function Te() {
  return en;
}
const Se = (r) => {
  const { data: e, path: n, errorMaps: t, issueData: s } = r, a = [...n, ...s.path || []], o = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let c = "";
  const l = t.filter((u) => !!u).slice().reverse();
  for (const u of l)
    c = u(o, { data: e, defaultError: c }).message;
  return {
    ...s,
    path: a,
    message: c
  };
}, Nn = [];
function h(r, e) {
  const n = Te(), t = Se({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      // contextual error map is first priority
      r.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === te ? void 0 : te
      // then global default map
    ].filter((s) => !!s)
  });
  r.common.issues.push(t);
}
class w {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const t = [];
    for (const s of n) {
      if (s.status === "aborted")
        return v;
      s.status === "dirty" && e.dirty(), t.push(s.value);
    }
    return { status: e.value, value: t };
  }
  static async mergeObjectAsync(e, n) {
    const t = [];
    for (const s of n) {
      const a = await s.key, o = await s.value;
      t.push({
        key: a,
        value: o
      });
    }
    return w.mergeObjectSync(e, t);
  }
  static mergeObjectSync(e, n) {
    const t = {};
    for (const s of n) {
      const { key: a, value: o } = s;
      if (a.status === "aborted" || o.status === "aborted")
        return v;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (t[a.value] = o.value);
    }
    return { status: e.value, value: t };
  }
}
const v = Object.freeze({
  status: "aborted"
}), Q = (r) => ({ status: "dirty", value: r }), T = (r) => ({ status: "valid", value: r }), Ue = (r) => r.status === "aborted", He = (r) => r.status === "dirty", K = (r) => r.status === "valid", ce = (r) => typeof Promise < "u" && r instanceof Promise;
function Ce(r, e, n, t) {
  if (typeof e == "function" ? r !== e || !0 : !e.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(r);
}
function nn(r, e, n, t, s) {
  if (typeof e == "function" ? r !== e || !0 : !e.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(r, n), n;
}
var f;
(function(r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, r.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(f || (f = {}));
var ie, oe;
class E {
  constructor(e, n, t, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = t, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Ye = (r, e) => {
  if (K(e))
    return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new S(r.common.issues);
      return this._error = n, this._error;
    }
  };
};
function y(r) {
  if (!r)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: t, description: s } = r;
  if (e && (n || t))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, c) => {
    var l, u;
    const { message: m } = r;
    return o.code === "invalid_enum_value" ? { message: m ?? c.defaultError } : typeof c.data > "u" ? { message: (l = m ?? t) !== null && l !== void 0 ? l : c.defaultError } : o.code !== "invalid_type" ? { message: c.defaultError } : { message: (u = m ?? n) !== null && u !== void 0 ? u : c.defaultError };
  }, description: s };
}
class _ {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return q(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: q(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new w(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: q(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (ce(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const t = this.safeParse(e, n);
    if (t.success)
      return t.data;
    throw t.error;
  }
  safeParse(e, n) {
    var t;
    const s = {
      common: {
        issues: [],
        async: (t = n == null ? void 0 : n.async) !== null && t !== void 0 ? t : !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: q(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return Ye(s, a);
  }
  "~validate"(e) {
    var n, t;
    const s = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: q(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: s });
        return K(a) ? {
          value: a.value
        } : {
          issues: s.common.issues
        };
      } catch (a) {
        !((t = (n = a == null ? void 0 : a.message) === null || n === void 0 ? void 0 : n.toLowerCase()) === null || t === void 0) && t.includes("encountered") && (this["~standard"].async = !0), s.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: s }).then((a) => K(a) ? {
      value: a.value
    } : {
      issues: s.common.issues
    });
  }
  async parseAsync(e, n) {
    const t = await this.safeParseAsync(e, n);
    if (t.success)
      return t.data;
    throw t.error;
  }
  async safeParseAsync(e, n) {
    const t = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: q(e)
    }, s = this._parse({ data: e, path: t.path, parent: t }), a = await (ce(s) ? s : Promise.resolve(s));
    return Ye(t, a);
  }
  refine(e, n) {
    const t = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, a) => {
      const o = e(s), c = () => a.addIssue({
        code: d.custom,
        ...t(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((l) => l ? !0 : (c(), !1)) : o ? !0 : (c(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((t, s) => e(t) ? !0 : (s.addIssue(typeof n == "function" ? n(t, s) : n), !1));
  }
  _refinement(e) {
    return new A({
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return P.create(this, this._def);
  }
  nullable() {
    return F.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return j.create(this);
  }
  promise() {
    return se.create(this, this._def);
  }
  or(e) {
    return he.create([this, e], this._def);
  }
  and(e) {
    return pe.create(this, e, this._def);
  }
  transform(e) {
    return new A({
      ...y(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new ye({
      ...y(this._def),
      innerType: this,
      defaultValue: n,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new De({
      typeName: g.ZodBranded,
      type: this,
      ...y(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new _e({
      ...y(this._def),
      innerType: this,
      catchValue: n,
      typeName: g.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return xe.create(this, e);
  }
  readonly() {
    return be.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Mn = /^c[^\s-]{8,}$/i, $n = /^[0-9a-z]+$/, qn = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Ln = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, zn = /^[a-z0-9_-]{21}$/i, Un = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Hn = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Fn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Dn = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Le;
const Vn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Bn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Wn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Kn = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Jn = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Yn = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, tn = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Gn = new RegExp(`^${tn}$`);
function rn(r) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return r.precision ? e = `${e}\\.\\d{${r.precision}}` : r.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Xn(r) {
  return new RegExp(`^${rn(r)}$`);
}
function sn(r) {
  let e = `${tn}T${rn(r)}`;
  const n = [];
  return n.push(r.local ? "Z?" : "Z"), r.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function Qn(r, e) {
  return !!((e === "v4" || !e) && Vn.test(r) || (e === "v6" || !e) && Wn.test(r));
}
function et(r, e) {
  if (!Un.test(r))
    return !1;
  try {
    const [n] = r.split("."), t = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), s = JSON.parse(atob(t));
    return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function nt(r, e) {
  return !!((e === "v4" || !e) && Bn.test(r) || (e === "v6" || !e) && Kn.test(r));
}
class Z extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_type,
        expected: p.string,
        received: a.parsedType
      }), v;
    }
    const t = new w();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), t.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), h(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), t.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, c = e.data.length < a.value;
        (o || c) && (s = this._getOrReturnCtx(e, s), o ? h(s, {
          code: d.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : c && h(s, {
          code: d.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), t.dirty());
      } else if (a.kind === "email")
        Fn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "email",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "emoji")
        Le || (Le = new RegExp(Dn, "u")), Le.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "emoji",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "uuid")
        Ln.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "uuid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "nanoid")
        zn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "nanoid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "cuid")
        Mn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "cuid2")
        $n.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "cuid2",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "ulid")
        qn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
          validation: "ulid",
          code: d.invalid_string,
          message: a.message
        }), t.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), h(s, {
            validation: "url",
            code: d.invalid_string,
            message: a.message
          }), t.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "regex",
        code: d.invalid_string,
        message: a.message
      }), t.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), t.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), t.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), t.dirty()) : a.kind === "datetime" ? sn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: "datetime",
        message: a.message
      }), t.dirty()) : a.kind === "date" ? Gn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: "date",
        message: a.message
      }), t.dirty()) : a.kind === "time" ? Xn(a).test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.invalid_string,
        validation: "time",
        message: a.message
      }), t.dirty()) : a.kind === "duration" ? Hn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "duration",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "ip" ? Qn(e.data, a.version) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "ip",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "jwt" ? et(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "jwt",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "cidr" ? nt(e.data, a.version) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "cidr",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "base64" ? Jn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "base64",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : a.kind === "base64url" ? Yn.test(e.data) || (s = this._getOrReturnCtx(e, s), h(s, {
        validation: "base64url",
        code: d.invalid_string,
        message: a.message
      }), t.dirty()) : b.assertNever(a);
    return { status: t.value, value: e.data };
  }
  _regex(e, n, t) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: d.invalid_string,
      ...f.errToObj(t)
    });
  }
  _addCheck(e) {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...f.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...f.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...f.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...f.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...f.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...f.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...f.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...f.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...f.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...f.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...f.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...f.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...f.errToObj(e) });
  }
  datetime(e) {
    var n, t;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (n = e == null ? void 0 : e.offset) !== null && n !== void 0 ? n : !1,
      local: (t = e == null ? void 0 : e.local) !== null && t !== void 0 ? t : !1,
      ...f.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...f.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...f.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...f.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...f.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...f.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...f.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...f.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...f.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...f.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, f.errToObj(e));
  }
  trim() {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Z({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Z.create = (r) => {
  var e;
  return new Z({
    checks: [],
    typeName: g.ZodString,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...y(r)
  });
};
function tt(r, e) {
  const n = (r.toString().split(".")[1] || "").length, t = (e.toString().split(".")[1] || "").length, s = n > t ? n : t, a = parseInt(r.toFixed(s).replace(".", "")), o = parseInt(e.toFixed(s).replace(".", ""));
  return a % o / Math.pow(10, s);
}
class z extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_type,
        expected: p.number,
        received: a.parsedType
      }), v;
    }
    let t;
    const s = new w();
    for (const a of this._def.checks)
      a.kind === "int" ? b.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? tt(e.data, a.value) !== 0 && (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.not_finite,
        message: a.message
      }), s.dirty()) : b.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, f.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, f.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, f.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, f.toString(n));
  }
  setLimit(e, n, t, s) {
    return new z({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: t,
          message: f.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new z({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: f.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: f.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: f.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: f.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: f.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: f.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: f.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: f.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: f.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && b.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const t of this._def.checks) {
      if (t.kind === "finite" || t.kind === "int" || t.kind === "multipleOf")
        return !0;
      t.kind === "min" ? (n === null || t.value > n) && (n = t.value) : t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
z.create = (r) => new z({
  checks: [],
  typeName: g.ZodNumber,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ...y(r)
});
class U extends _ {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== p.bigint)
      return this._getInvalidInput(e);
    let t;
    const s = new w();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), h(t, {
        code: d.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : b.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return h(n, {
      code: d.invalid_type,
      expected: p.bigint,
      received: n.parsedType
    }), v;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, f.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, f.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, f.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, f.toString(n));
  }
  setLimit(e, n, t, s) {
    return new U({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: t,
          message: f.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new U({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: f.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: f.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: f.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: f.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: f.toString(n)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
U.create = (r) => {
  var e;
  return new U({
    checks: [],
    typeName: g.ZodBigInt,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ...y(r)
  });
};
class de extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        code: d.invalid_type,
        expected: p.boolean,
        received: t.parsedType
      }), v;
    }
    return T(e.data);
  }
}
de.create = (r) => new de({
  typeName: g.ZodBoolean,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ...y(r)
});
class J extends _ {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_type,
        expected: p.date,
        received: a.parsedType
      }), v;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return h(a, {
        code: d.invalid_date
      }), v;
    }
    const t = new w();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), t.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), h(s, {
        code: d.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), t.dirty()) : b.assertNever(a);
    return {
      status: t.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new J({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: f.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: f.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
J.create = (r) => new J({
  checks: [],
  coerce: (r == null ? void 0 : r.coerce) || !1,
  typeName: g.ZodDate,
  ...y(r)
});
class Re extends _ {
  _parse(e) {
    if (this._getType(e) !== p.symbol) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        code: d.invalid_type,
        expected: p.symbol,
        received: t.parsedType
      }), v;
    }
    return T(e.data);
  }
}
Re.create = (r) => new Re({
  typeName: g.ZodSymbol,
  ...y(r)
});
class ue extends _ {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        code: d.invalid_type,
        expected: p.undefined,
        received: t.parsedType
      }), v;
    }
    return T(e.data);
  }
}
ue.create = (r) => new ue({
  typeName: g.ZodUndefined,
  ...y(r)
});
class le extends _ {
  _parse(e) {
    if (this._getType(e) !== p.null) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        code: d.invalid_type,
        expected: p.null,
        received: t.parsedType
      }), v;
    }
    return T(e.data);
  }
}
le.create = (r) => new le({
  typeName: g.ZodNull,
  ...y(r)
});
class re extends _ {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return T(e.data);
  }
}
re.create = (r) => new re({
  typeName: g.ZodAny,
  ...y(r)
});
class W extends _ {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return T(e.data);
  }
}
W.create = (r) => new W({
  typeName: g.ZodUnknown,
  ...y(r)
});
class L extends _ {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return h(n, {
      code: d.invalid_type,
      expected: p.never,
      received: n.parsedType
    }), v;
  }
}
L.create = (r) => new L({
  typeName: g.ZodNever,
  ...y(r)
});
class Ze extends _ {
  _parse(e) {
    if (this._getType(e) !== p.undefined) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        code: d.invalid_type,
        expected: p.void,
        received: t.parsedType
      }), v;
    }
    return T(e.data);
  }
}
Ze.create = (r) => new Ze({
  typeName: g.ZodVoid,
  ...y(r)
});
class j extends _ {
  _parse(e) {
    const { ctx: n, status: t } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== p.array)
      return h(n, {
        code: d.invalid_type,
        expected: p.array,
        received: n.parsedType
      }), v;
    if (s.exactLength !== null) {
      const o = n.data.length > s.exactLength.value, c = n.data.length < s.exactLength.value;
      (o || c) && (h(n, {
        code: o ? d.too_big : d.too_small,
        minimum: c ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), t.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (h(n, {
      code: d.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), t.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (h(n, {
      code: d.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), t.dirty()), n.common.async)
      return Promise.all([...n.data].map((o, c) => s.type._parseAsync(new E(n, o, n.path, c)))).then((o) => w.mergeArray(t, o));
    const a = [...n.data].map((o, c) => s.type._parseSync(new E(n, o, n.path, c)));
    return w.mergeArray(t, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new j({
      ...this._def,
      minLength: { value: e, message: f.toString(n) }
    });
  }
  max(e, n) {
    return new j({
      ...this._def,
      maxLength: { value: e, message: f.toString(n) }
    });
  }
  length(e, n) {
    return new j({
      ...this._def,
      exactLength: { value: e, message: f.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
j.create = (r, e) => new j({
  type: r,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ...y(e)
});
function X(r) {
  if (r instanceof x) {
    const e = {};
    for (const n in r.shape) {
      const t = r.shape[n];
      e[n] = P.create(X(t));
    }
    return new x({
      ...r._def,
      shape: () => e
    });
  } else return r instanceof j ? new j({
    ...r._def,
    type: X(r.element)
  }) : r instanceof P ? P.create(X(r.unwrap())) : r instanceof F ? F.create(X(r.unwrap())) : r instanceof N ? N.create(r.items.map((e) => X(e))) : r;
}
class x extends _ {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = b.objectKeys(e);
    return this._cached = { shape: e, keys: n };
  }
  _parse(e) {
    if (this._getType(e) !== p.object) {
      const u = this._getOrReturnCtx(e);
      return h(u, {
        code: d.invalid_type,
        expected: p.object,
        received: u.parsedType
      }), v;
    }
    const { status: t, ctx: s } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), c = [];
    if (!(this._def.catchall instanceof L && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        o.includes(u) || c.push(u);
    const l = [];
    for (const u of o) {
      const m = a[u], k = s.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: m._parse(new E(s, k, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof L) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const m of c)
          l.push({
            key: { status: "valid", value: m },
            value: { status: "valid", value: s.data[m] }
          });
      else if (u === "strict")
        c.length > 0 && (h(s, {
          code: d.unrecognized_keys,
          keys: c
        }), t.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const m of c) {
        const k = s.data[m];
        l.push({
          key: { status: "valid", value: m },
          value: u._parse(
            new E(s, k, s.path, m)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: m in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const m of l) {
        const k = await m.key, D = await m.value;
        u.push({
          key: k,
          value: D,
          alwaysSet: m.alwaysSet
        });
      }
      return u;
    }).then((u) => w.mergeObjectSync(t, u)) : w.mergeObjectSync(t, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return f.errToObj, new x({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, t) => {
          var s, a, o, c;
          const l = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, n, t).message) !== null && o !== void 0 ? o : t.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: (c = f.errToObj(e).message) !== null && c !== void 0 ? c : l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new x({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new x({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new x({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new x({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: g.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, n) {
    return this.augment({ [e]: n });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new x({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    return b.objectKeys(e).forEach((t) => {
      e[t] && this.shape[t] && (n[t] = this.shape[t]);
    }), new x({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    return b.objectKeys(this.shape).forEach((t) => {
      e[t] || (n[t] = this.shape[t]);
    }), new x({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return X(this);
  }
  partial(e) {
    const n = {};
    return b.objectKeys(this.shape).forEach((t) => {
      const s = this.shape[t];
      e && !e[t] ? n[t] = s : n[t] = s.optional();
    }), new x({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    return b.objectKeys(this.shape).forEach((t) => {
      if (e && !e[t])
        n[t] = this.shape[t];
      else {
        let a = this.shape[t];
        for (; a instanceof P; )
          a = a._def.innerType;
        n[t] = a;
      }
    }), new x({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return an(b.objectKeys(this.shape));
  }
}
x.create = (r, e) => new x({
  shape: () => r,
  unknownKeys: "strip",
  catchall: L.create(),
  typeName: g.ZodObject,
  ...y(e)
});
x.strictCreate = (r, e) => new x({
  shape: () => r,
  unknownKeys: "strict",
  catchall: L.create(),
  typeName: g.ZodObject,
  ...y(e)
});
x.lazycreate = (r, e) => new x({
  shape: r,
  unknownKeys: "strip",
  catchall: L.create(),
  typeName: g.ZodObject,
  ...y(e)
});
class he extends _ {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), t = this._def.options;
    function s(a) {
      for (const c of a)
        if (c.result.status === "valid")
          return c.result;
      for (const c of a)
        if (c.result.status === "dirty")
          return n.common.issues.push(...c.ctx.common.issues), c.result;
      const o = a.map((c) => new S(c.ctx.common.issues));
      return h(n, {
        code: d.invalid_union,
        unionErrors: o
      }), v;
    }
    if (n.common.async)
      return Promise.all(t.map(async (a) => {
        const o = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: n.data,
            path: n.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let a;
      const o = [];
      for (const l of t) {
        const u = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, m = l._parseSync({
          data: n.data,
          path: n.path,
          parent: u
        });
        if (m.status === "valid")
          return m;
        m.status === "dirty" && !a && (a = { result: m, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (a)
        return n.common.issues.push(...a.ctx.common.issues), a.result;
      const c = o.map((l) => new S(l));
      return h(n, {
        code: d.invalid_union,
        unionErrors: c
      }), v;
    }
  }
  get options() {
    return this._def.options;
  }
}
he.create = (r, e) => new he({
  options: r,
  typeName: g.ZodUnion,
  ...y(e)
});
const $ = (r) => r instanceof fe ? $(r.schema) : r instanceof A ? $(r.innerType()) : r instanceof ge ? [r.value] : r instanceof H ? r.options : r instanceof ve ? b.objectValues(r.enum) : r instanceof ye ? $(r._def.innerType) : r instanceof ue ? [void 0] : r instanceof le ? [null] : r instanceof P ? [void 0, ...$(r.unwrap())] : r instanceof F ? [null, ...$(r.unwrap())] : r instanceof De || r instanceof be ? $(r.unwrap()) : r instanceof _e ? $(r._def.innerType) : [];
class Ie extends _ {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.object)
      return h(n, {
        code: d.invalid_type,
        expected: p.object,
        received: n.parsedType
      }), v;
    const t = this.discriminator, s = n.data[t], a = this.optionsMap.get(s);
    return a ? n.common.async ? a._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }) : a._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }) : (h(n, {
      code: d.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [t]
    }), v);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, n, t) {
    const s = /* @__PURE__ */ new Map();
    for (const a of n) {
      const o = $(a.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const c of o) {
        if (s.has(c))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(c)}`);
        s.set(c, a);
      }
    }
    return new Ie({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: n,
      optionsMap: s,
      ...y(t)
    });
  }
}
function Fe(r, e) {
  const n = q(r), t = q(e);
  if (r === e)
    return { valid: !0, data: r };
  if (n === p.object && t === p.object) {
    const s = b.objectKeys(e), a = b.objectKeys(r).filter((c) => s.indexOf(c) !== -1), o = { ...r, ...e };
    for (const c of a) {
      const l = Fe(r[c], e[c]);
      if (!l.valid)
        return { valid: !1 };
      o[c] = l.data;
    }
    return { valid: !0, data: o };
  } else if (n === p.array && t === p.array) {
    if (r.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < r.length; a++) {
      const o = r[a], c = e[a], l = Fe(o, c);
      if (!l.valid)
        return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else return n === p.date && t === p.date && +r == +e ? { valid: !0, data: r } : { valid: !1 };
}
class pe extends _ {
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e), s = (a, o) => {
      if (Ue(a) || Ue(o))
        return v;
      const c = Fe(a.value, o.value);
      return c.valid ? ((He(a) || He(o)) && n.dirty(), { status: n.value, value: c.data }) : (h(t, {
        code: d.invalid_intersection_types
      }), v);
    };
    return t.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: t.data,
        path: t.path,
        parent: t
      }),
      this._def.right._parseAsync({
        data: t.data,
        path: t.path,
        parent: t
      })
    ]).then(([a, o]) => s(a, o)) : s(this._def.left._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }), this._def.right._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }));
  }
}
pe.create = (r, e, n) => new pe({
  left: r,
  right: e,
  typeName: g.ZodIntersection,
  ...y(n)
});
class N extends _ {
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.array)
      return h(t, {
        code: d.invalid_type,
        expected: p.array,
        received: t.parsedType
      }), v;
    if (t.data.length < this._def.items.length)
      return h(t, {
        code: d.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), v;
    !this._def.rest && t.data.length > this._def.items.length && (h(t, {
      code: d.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...t.data].map((o, c) => {
      const l = this._def.items[c] || this._def.rest;
      return l ? l._parse(new E(t, o, t.path, c)) : null;
    }).filter((o) => !!o);
    return t.common.async ? Promise.all(a).then((o) => w.mergeArray(n, o)) : w.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new N({
      ...this._def,
      rest: e
    });
  }
}
N.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new N({
    items: r,
    typeName: g.ZodTuple,
    rest: null,
    ...y(e)
  });
};
class me extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.object)
      return h(t, {
        code: d.invalid_type,
        expected: p.object,
        received: t.parsedType
      }), v;
    const s = [], a = this._def.keyType, o = this._def.valueType;
    for (const c in t.data)
      s.push({
        key: a._parse(new E(t, c, t.path, c)),
        value: o._parse(new E(t, t.data[c], t.path, c)),
        alwaysSet: c in t.data
      });
    return t.common.async ? w.mergeObjectAsync(n, s) : w.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, t) {
    return n instanceof _ ? new me({
      keyType: e,
      valueType: n,
      typeName: g.ZodRecord,
      ...y(t)
    }) : new me({
      keyType: Z.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ...y(n)
    });
  }
}
class je extends _ {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.map)
      return h(t, {
        code: d.invalid_type,
        expected: p.map,
        received: t.parsedType
      }), v;
    const s = this._def.keyType, a = this._def.valueType, o = [...t.data.entries()].map(([c, l], u) => ({
      key: s._parse(new E(t, c, t.path, [u, "key"])),
      value: a._parse(new E(t, l, t.path, [u, "value"]))
    }));
    if (t.common.async) {
      const c = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of o) {
          const u = await l.key, m = await l.value;
          if (u.status === "aborted" || m.status === "aborted")
            return v;
          (u.status === "dirty" || m.status === "dirty") && n.dirty(), c.set(u.value, m.value);
        }
        return { status: n.value, value: c };
      });
    } else {
      const c = /* @__PURE__ */ new Map();
      for (const l of o) {
        const u = l.key, m = l.value;
        if (u.status === "aborted" || m.status === "aborted")
          return v;
        (u.status === "dirty" || m.status === "dirty") && n.dirty(), c.set(u.value, m.value);
      }
      return { status: n.value, value: c };
    }
  }
}
je.create = (r, e, n) => new je({
  valueType: e,
  keyType: r,
  typeName: g.ZodMap,
  ...y(n)
});
class Y extends _ {
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e);
    if (t.parsedType !== p.set)
      return h(t, {
        code: d.invalid_type,
        expected: p.set,
        received: t.parsedType
      }), v;
    const s = this._def;
    s.minSize !== null && t.data.size < s.minSize.value && (h(t, {
      code: d.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && t.data.size > s.maxSize.value && (h(t, {
      code: d.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const a = this._def.valueType;
    function o(l) {
      const u = /* @__PURE__ */ new Set();
      for (const m of l) {
        if (m.status === "aborted")
          return v;
        m.status === "dirty" && n.dirty(), u.add(m.value);
      }
      return { status: n.value, value: u };
    }
    const c = [...t.data.values()].map((l, u) => a._parse(new E(t, l, t.path, u)));
    return t.common.async ? Promise.all(c).then((l) => o(l)) : o(c);
  }
  min(e, n) {
    return new Y({
      ...this._def,
      minSize: { value: e, message: f.toString(n) }
    });
  }
  max(e, n) {
    return new Y({
      ...this._def,
      maxSize: { value: e, message: f.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Y.create = (r, e) => new Y({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ...y(e)
});
class ne extends _ {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.function)
      return h(n, {
        code: d.invalid_type,
        expected: p.function,
        received: n.parsedType
      }), v;
    function t(c, l) {
      return Se({
        data: c,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          Te(),
          te
        ].filter((u) => !!u),
        issueData: {
          code: d.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function s(c, l) {
      return Se({
        data: c,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          Te(),
          te
        ].filter((u) => !!u),
        issueData: {
          code: d.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const a = { errorMap: n.common.contextualErrorMap }, o = n.data;
    if (this._def.returns instanceof se) {
      const c = this;
      return T(async function(...l) {
        const u = new S([]), m = await c._def.args.parseAsync(l, a).catch((G) => {
          throw u.addIssue(t(l, G)), u;
        }), k = await Reflect.apply(o, this, m);
        return await c._def.returns._def.type.parseAsync(k, a).catch((G) => {
          throw u.addIssue(s(k, G)), u;
        });
      });
    } else {
      const c = this;
      return T(function(...l) {
        const u = c._def.args.safeParse(l, a);
        if (!u.success)
          throw new S([t(l, u.error)]);
        const m = Reflect.apply(o, this, u.data), k = c._def.returns.safeParse(m, a);
        if (!k.success)
          throw new S([s(m, k.error)]);
        return k.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new ne({
      ...this._def,
      args: N.create(e).rest(W.create())
    });
  }
  returns(e) {
    return new ne({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, n, t) {
    return new ne({
      args: e || N.create([]).rest(W.create()),
      returns: n || W.create(),
      typeName: g.ZodFunction,
      ...y(t)
    });
  }
}
class fe extends _ {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
fe.create = (r, e) => new fe({
  getter: r,
  typeName: g.ZodLazy,
  ...y(e)
});
class ge extends _ {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return h(n, {
        received: n.data,
        code: d.invalid_literal,
        expected: this._def.value
      }), v;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
ge.create = (r, e) => new ge({
  value: r,
  typeName: g.ZodLiteral,
  ...y(e)
});
function an(r, e) {
  return new H({
    values: r,
    typeName: g.ZodEnum,
    ...y(e)
  });
}
class H extends _ {
  constructor() {
    super(...arguments), ie.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), t = this._def.values;
      return h(n, {
        expected: b.joinValues(t),
        received: n.parsedType,
        code: d.invalid_type
      }), v;
    }
    if (Ce(this, ie) || nn(this, ie, new Set(this._def.values)), !Ce(this, ie).has(e.data)) {
      const n = this._getOrReturnCtx(e), t = this._def.values;
      return h(n, {
        received: n.data,
        code: d.invalid_enum_value,
        options: t
      }), v;
    }
    return T(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e, n = this._def) {
    return H.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return H.create(this.options.filter((t) => !e.includes(t)), {
      ...this._def,
      ...n
    });
  }
}
ie = /* @__PURE__ */ new WeakMap();
H.create = an;
class ve extends _ {
  constructor() {
    super(...arguments), oe.set(this, void 0);
  }
  _parse(e) {
    const n = b.getValidEnumValues(this._def.values), t = this._getOrReturnCtx(e);
    if (t.parsedType !== p.string && t.parsedType !== p.number) {
      const s = b.objectValues(n);
      return h(t, {
        expected: b.joinValues(s),
        received: t.parsedType,
        code: d.invalid_type
      }), v;
    }
    if (Ce(this, oe) || nn(this, oe, new Set(b.getValidEnumValues(this._def.values))), !Ce(this, oe).has(e.data)) {
      const s = b.objectValues(n);
      return h(t, {
        received: t.data,
        code: d.invalid_enum_value,
        options: s
      }), v;
    }
    return T(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
oe = /* @__PURE__ */ new WeakMap();
ve.create = (r, e) => new ve({
  values: r,
  typeName: g.ZodNativeEnum,
  ...y(e)
});
class se extends _ {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== p.promise && n.common.async === !1)
      return h(n, {
        code: d.invalid_type,
        expected: p.promise,
        received: n.parsedType
      }), v;
    const t = n.parsedType === p.promise ? n.data : Promise.resolve(n.data);
    return T(t.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
se.create = (r, e) => new se({
  type: r,
  typeName: g.ZodPromise,
  ...y(e)
});
class A extends _ {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (o) => {
        h(t, o), o.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return t.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const o = s.transform(t.data, a);
      if (t.common.async)
        return Promise.resolve(o).then(async (c) => {
          if (n.value === "aborted")
            return v;
          const l = await this._def.schema._parseAsync({
            data: c,
            path: t.path,
            parent: t
          });
          return l.status === "aborted" ? v : l.status === "dirty" || n.value === "dirty" ? Q(l.value) : l;
        });
      {
        if (n.value === "aborted")
          return v;
        const c = this._def.schema._parseSync({
          data: o,
          path: t.path,
          parent: t
        });
        return c.status === "aborted" ? v : c.status === "dirty" || n.value === "dirty" ? Q(c.value) : c;
      }
    }
    if (s.type === "refinement") {
      const o = (c) => {
        const l = s.refinement(c, a);
        if (t.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return c;
      };
      if (t.common.async === !1) {
        const c = this._def.schema._parseSync({
          data: t.data,
          path: t.path,
          parent: t
        });
        return c.status === "aborted" ? v : (c.status === "dirty" && n.dirty(), o(c.value), { status: n.value, value: c.value });
      } else
        return this._def.schema._parseAsync({ data: t.data, path: t.path, parent: t }).then((c) => c.status === "aborted" ? v : (c.status === "dirty" && n.dirty(), o(c.value).then(() => ({ status: n.value, value: c.value }))));
    }
    if (s.type === "transform")
      if (t.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: t.data,
          path: t.path,
          parent: t
        });
        if (!K(o))
          return o;
        const c = s.transform(o.value, a);
        if (c instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: c };
      } else
        return this._def.schema._parseAsync({ data: t.data, path: t.path, parent: t }).then((o) => K(o) ? Promise.resolve(s.transform(o.value, a)).then((c) => ({ status: n.value, value: c })) : o);
    b.assertNever(s);
  }
}
A.create = (r, e, n) => new A({
  schema: r,
  typeName: g.ZodEffects,
  effect: e,
  ...y(n)
});
A.createWithPreprocess = (r, e, n) => new A({
  schema: e,
  effect: { type: "preprocess", transform: r },
  typeName: g.ZodEffects,
  ...y(n)
});
class P extends _ {
  _parse(e) {
    return this._getType(e) === p.undefined ? T(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
P.create = (r, e) => new P({
  innerType: r,
  typeName: g.ZodOptional,
  ...y(e)
});
class F extends _ {
  _parse(e) {
    return this._getType(e) === p.null ? T(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
F.create = (r, e) => new F({
  innerType: r,
  typeName: g.ZodNullable,
  ...y(e)
});
class ye extends _ {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let t = n.data;
    return n.parsedType === p.undefined && (t = this._def.defaultValue()), this._def.innerType._parse({
      data: t,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ye.create = (r, e) => new ye({
  innerType: r,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...y(e)
});
class _e extends _ {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), t = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: t.data,
      path: t.path,
      parent: {
        ...t
      }
    });
    return ce(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new S(t.common.issues);
        },
        input: t.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new S(t.common.issues);
        },
        input: t.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
_e.create = (r, e) => new _e({
  innerType: r,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...y(e)
});
class Ae extends _ {
  _parse(e) {
    if (this._getType(e) !== p.nan) {
      const t = this._getOrReturnCtx(e);
      return h(t, {
        code: d.invalid_type,
        expected: p.nan,
        received: t.parsedType
      }), v;
    }
    return { status: "valid", value: e.data };
  }
}
Ae.create = (r) => new Ae({
  typeName: g.ZodNaN,
  ...y(r)
});
const rt = Symbol("zod_brand");
class De extends _ {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), t = n.data;
    return this._def.type._parse({
      data: t,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class xe extends _ {
  _parse(e) {
    const { status: n, ctx: t } = this._processInputParams(e);
    if (t.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: t.data,
          path: t.path,
          parent: t
        });
        return a.status === "aborted" ? v : a.status === "dirty" ? (n.dirty(), Q(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: t.path,
          parent: t
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: t.data,
        path: t.path,
        parent: t
      });
      return s.status === "aborted" ? v : s.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: t.path,
        parent: t
      });
    }
  }
  static create(e, n) {
    return new xe({
      in: e,
      out: n,
      typeName: g.ZodPipeline
    });
  }
}
class be extends _ {
  _parse(e) {
    const n = this._def.innerType._parse(e), t = (s) => (K(s) && (s.value = Object.freeze(s.value)), s);
    return ce(n) ? n.then((s) => t(s)) : t(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
be.create = (r, e) => new be({
  innerType: r,
  typeName: g.ZodReadonly,
  ...y(e)
});
function Ge(r, e) {
  const n = typeof r == "function" ? r(e) : typeof r == "string" ? { message: r } : r;
  return typeof n == "string" ? { message: n } : n;
}
function on(r, e = {}, n) {
  return r ? re.create().superRefine((t, s) => {
    var a, o;
    const c = r(t);
    if (c instanceof Promise)
      return c.then((l) => {
        var u, m;
        if (!l) {
          const k = Ge(e, t), D = (m = (u = k.fatal) !== null && u !== void 0 ? u : n) !== null && m !== void 0 ? m : !0;
          s.addIssue({ code: "custom", ...k, fatal: D });
        }
      });
    if (!c) {
      const l = Ge(e, t), u = (o = (a = l.fatal) !== null && a !== void 0 ? a : n) !== null && o !== void 0 ? o : !0;
      s.addIssue({ code: "custom", ...l, fatal: u });
    }
  }) : re.create();
}
const st = {
  object: x.lazycreate
};
var g;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodSymbol = "ZodSymbol", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodCatch = "ZodCatch", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded", r.ZodPipeline = "ZodPipeline", r.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const at = (r, e = {
  message: `Input not instance of ${r.name}`
}) => on((n) => n instanceof r, e), cn = Z.create, dn = z.create, it = Ae.create, ot = U.create, un = de.create, ct = J.create, dt = Re.create, ut = ue.create, lt = le.create, ht = re.create, pt = W.create, mt = L.create, ft = Ze.create, gt = j.create, vt = x.create, yt = x.strictCreate, _t = he.create, bt = Ie.create, xt = pe.create, kt = N.create, wt = me.create, Tt = je.create, St = Y.create, Ct = ne.create, Rt = fe.create, Zt = ge.create, jt = H.create, At = ve.create, It = se.create, Xe = A.create, Ot = P.create, Pt = F.create, Et = A.createWithPreprocess, Nt = xe.create, Mt = () => cn().optional(), $t = () => dn().optional(), qt = () => un().optional(), Lt = {
  string: (r) => Z.create({ ...r, coerce: !0 }),
  number: (r) => z.create({ ...r, coerce: !0 }),
  boolean: (r) => de.create({
    ...r,
    coerce: !0
  }),
  bigint: (r) => U.create({ ...r, coerce: !0 }),
  date: (r) => J.create({ ...r, coerce: !0 })
}, zt = v;
var i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: te,
  setErrorMap: En,
  getErrorMap: Te,
  makeIssue: Se,
  EMPTY_PATH: Nn,
  addIssueToContext: h,
  ParseStatus: w,
  INVALID: v,
  DIRTY: Q,
  OK: T,
  isAborted: Ue,
  isDirty: He,
  isValid: K,
  isAsync: ce,
  get util() {
    return b;
  },
  get objectUtil() {
    return ze;
  },
  ZodParsedType: p,
  getParsedType: q,
  ZodType: _,
  datetimeRegex: sn,
  ZodString: Z,
  ZodNumber: z,
  ZodBigInt: U,
  ZodBoolean: de,
  ZodDate: J,
  ZodSymbol: Re,
  ZodUndefined: ue,
  ZodNull: le,
  ZodAny: re,
  ZodUnknown: W,
  ZodNever: L,
  ZodVoid: Ze,
  ZodArray: j,
  ZodObject: x,
  ZodUnion: he,
  ZodDiscriminatedUnion: Ie,
  ZodIntersection: pe,
  ZodTuple: N,
  ZodRecord: me,
  ZodMap: je,
  ZodSet: Y,
  ZodFunction: ne,
  ZodLazy: fe,
  ZodLiteral: ge,
  ZodEnum: H,
  ZodNativeEnum: ve,
  ZodPromise: se,
  ZodEffects: A,
  ZodTransformer: A,
  ZodOptional: P,
  ZodNullable: F,
  ZodDefault: ye,
  ZodCatch: _e,
  ZodNaN: Ae,
  BRAND: rt,
  ZodBranded: De,
  ZodPipeline: xe,
  ZodReadonly: be,
  custom: on,
  Schema: _,
  ZodSchema: _,
  late: st,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: Lt,
  any: ht,
  array: gt,
  bigint: ot,
  boolean: un,
  date: ct,
  discriminatedUnion: bt,
  effect: Xe,
  enum: jt,
  function: Ct,
  instanceof: at,
  intersection: xt,
  lazy: Rt,
  literal: Zt,
  map: Tt,
  nan: it,
  nativeEnum: At,
  never: mt,
  null: lt,
  nullable: Pt,
  number: dn,
  object: vt,
  oboolean: qt,
  onumber: $t,
  optional: Ot,
  ostring: Mt,
  pipeline: Nt,
  preprocess: Et,
  promise: It,
  record: wt,
  set: St,
  strictObject: yt,
  string: cn,
  symbol: dt,
  transformer: Xe,
  tuple: kt,
  undefined: ut,
  union: _t,
  unknown: pt,
  void: ft,
  NEVER: zt,
  ZodIssueCode: d,
  quotelessJson: Pn,
  ZodError: S
});
const ln = "2024-11-05", Ut = [
  ln,
  "2024-10-07"
], Oe = "2.0", hn = i.union([i.string(), i.number().int()]), pn = i.string(), I = i.object({
  _meta: i.optional(i.object({
    /**
     * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
     */
    progressToken: i.optional(hn)
  }).passthrough())
}).passthrough(), C = i.object({
  method: i.string(),
  params: i.optional(I)
}), ke = i.object({
  /**
   * This parameter name is reserved by MCP to allow clients and servers to attach additional metadata to their notifications.
   */
  _meta: i.optional(i.object({}).passthrough())
}).passthrough(), M = i.object({
  method: i.string(),
  params: i.optional(ke)
}), O = i.object({
  /**
   * This result property is reserved by the protocol to allow clients and servers to attach additional metadata to their responses.
   */
  _meta: i.optional(i.object({}).passthrough())
}).passthrough(), Pe = i.union([i.string(), i.number().int()]), Ht = i.object({
  jsonrpc: i.literal(Oe),
  id: Pe
}).merge(C).strict(), Ft = i.object({
  jsonrpc: i.literal(Oe)
}).merge(M).strict(), Dt = i.object({
  jsonrpc: i.literal(Oe),
  id: Pe,
  result: O
}).strict();
var B;
(function(r) {
  r[r.ConnectionClosed = -32e3] = "ConnectionClosed", r[r.RequestTimeout = -32001] = "RequestTimeout", r[r.ParseError = -32700] = "ParseError", r[r.InvalidRequest = -32600] = "InvalidRequest", r[r.MethodNotFound = -32601] = "MethodNotFound", r[r.InvalidParams = -32602] = "InvalidParams", r[r.InternalError = -32603] = "InternalError";
})(B || (B = {}));
const Vt = i.object({
  jsonrpc: i.literal(Oe),
  id: Pe,
  error: i.object({
    /**
     * The error type that occurred.
     */
    code: i.number().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: i.string(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: i.optional(i.unknown())
  })
}).strict();
i.union([
  Ht,
  Ft,
  Dt,
  Vt
]);
const ee = O.strict(), Ve = M.extend({
  method: i.literal("notifications/cancelled"),
  params: ke.extend({
    /**
     * The ID of the request to cancel.
     *
     * This MUST correspond to the ID of a request previously issued in the same direction.
     */
    requestId: Pe,
    /**
     * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
     */
    reason: i.string().optional()
  })
}), mn = i.object({
  name: i.string(),
  version: i.string()
}).passthrough(), Bt = i.object({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: i.optional(i.object({}).passthrough()),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: i.optional(i.object({}).passthrough()),
  /**
   * Present if the client supports listing roots.
   */
  roots: i.optional(i.object({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough())
}).passthrough(), Wt = C.extend({
  method: i.literal("initialize"),
  params: I.extend({
    /**
     * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
     */
    protocolVersion: i.string(),
    capabilities: Bt,
    clientInfo: mn
  })
}), Kt = i.object({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: i.optional(i.object({}).passthrough()),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: i.optional(i.object({}).passthrough()),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: i.optional(i.object({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough()),
  /**
   * Present if the server offers any resources to read.
   */
  resources: i.optional(i.object({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: i.optional(i.boolean()),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough()),
  /**
   * Present if the server offers any tools to call.
   */
  tools: i.optional(i.object({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: i.optional(i.boolean())
  }).passthrough())
}).passthrough(), fn = O.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: i.string(),
  capabilities: Kt,
  serverInfo: mn,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: i.optional(i.string())
}), Jt = M.extend({
  method: i.literal("notifications/initialized")
}), Be = C.extend({
  method: i.literal("ping")
}), Yt = i.object({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: i.number(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: i.optional(i.number())
}).passthrough(), We = M.extend({
  method: i.literal("notifications/progress"),
  params: ke.merge(Yt).extend({
    /**
     * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
     */
    progressToken: hn
  })
}), Ee = C.extend({
  params: I.extend({
    /**
     * An opaque token representing the current pagination position.
     * If provided, the server should return results starting after this cursor.
     */
    cursor: i.optional(pn)
  }).optional()
}), Ne = O.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: i.optional(pn)
}), gn = i.object({
  /**
   * The URI of this resource.
   */
  uri: i.string(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: i.optional(i.string())
}).passthrough(), vn = gn.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: i.string()
}), yn = gn.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: i.string().base64()
}), Gt = i.object({
  /**
   * The URI of this resource.
   */
  uri: i.string(),
  /**
   * A human-readable name for this resource.
   *
   * This can be used by clients to populate UI elements.
   */
  name: i.string(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: i.optional(i.string()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: i.optional(i.string())
}).passthrough(), Xt = i.object({
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: i.string(),
  /**
   * A human-readable name for the type of resource this template refers to.
   *
   * This can be used by clients to populate UI elements.
   */
  name: i.string(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: i.optional(i.string()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: i.optional(i.string())
}).passthrough(), Qt = Ee.extend({
  method: i.literal("resources/list")
}), _n = Ne.extend({
  resources: i.array(Gt)
}), er = Ee.extend({
  method: i.literal("resources/templates/list")
}), bn = Ne.extend({
  resourceTemplates: i.array(Xt)
}), nr = C.extend({
  method: i.literal("resources/read"),
  params: I.extend({
    /**
     * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: i.string()
  })
}), xn = O.extend({
  contents: i.array(i.union([vn, yn]))
}), tr = M.extend({
  method: i.literal("notifications/resources/list_changed")
}), rr = C.extend({
  method: i.literal("resources/subscribe"),
  params: I.extend({
    /**
     * The URI of the resource to subscribe to. The URI can use any protocol; it is up to the server how to interpret it.
     */
    uri: i.string()
  })
}), sr = C.extend({
  method: i.literal("resources/unsubscribe"),
  params: I.extend({
    /**
     * The URI of the resource to unsubscribe from.
     */
    uri: i.string()
  })
}), ar = M.extend({
  method: i.literal("notifications/resources/updated"),
  params: ke.extend({
    /**
     * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
     */
    uri: i.string()
  })
}), ir = i.object({
  /**
   * The name of the argument.
   */
  name: i.string(),
  /**
   * A human-readable description of the argument.
   */
  description: i.optional(i.string()),
  /**
   * Whether this argument must be provided.
   */
  required: i.optional(i.boolean())
}).passthrough(), or = i.object({
  /**
   * The name of the prompt or prompt template.
   */
  name: i.string(),
  /**
   * An optional description of what this prompt provides
   */
  description: i.optional(i.string()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: i.optional(i.array(ir))
}).passthrough(), cr = Ee.extend({
  method: i.literal("prompts/list")
}), kn = Ne.extend({
  prompts: i.array(or)
}), dr = C.extend({
  method: i.literal("prompts/get"),
  params: I.extend({
    /**
     * The name of the prompt or prompt template.
     */
    name: i.string(),
    /**
     * Arguments to use for templating the prompt.
     */
    arguments: i.optional(i.record(i.string()))
  })
}), Me = i.object({
  type: i.literal("text"),
  /**
   * The text content of the message.
   */
  text: i.string()
}).passthrough(), $e = i.object({
  type: i.literal("image"),
  /**
   * The base64-encoded image data.
   */
  data: i.string().base64(),
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: i.string()
}).passthrough(), wn = i.object({
  type: i.literal("resource"),
  resource: i.union([vn, yn])
}).passthrough(), ur = i.object({
  role: i.enum(["user", "assistant"]),
  content: i.union([
    Me,
    $e,
    wn
  ])
}).passthrough(), Tn = O.extend({
  /**
   * An optional description for the prompt.
   */
  description: i.optional(i.string()),
  messages: i.array(ur)
}), lr = M.extend({
  method: i.literal("notifications/prompts/list_changed")
}), hr = i.object({
  /**
   * The name of the tool.
   */
  name: i.string(),
  /**
   * A human-readable description of the tool.
   */
  description: i.optional(i.string()),
  /**
   * A JSON Schema object defining the expected parameters for the tool.
   */
  inputSchema: i.object({
    type: i.literal("object"),
    properties: i.optional(i.object({}).passthrough())
  }).passthrough()
}).passthrough(), pr = Ee.extend({
  method: i.literal("tools/list")
}), Sn = Ne.extend({
  tools: i.array(hr)
}), Ke = O.extend({
  content: i.array(i.union([Me, $e, wn])),
  isError: i.boolean().default(!1).optional()
});
Ke.or(O.extend({
  toolResult: i.unknown()
}));
const mr = C.extend({
  method: i.literal("tools/call"),
  params: I.extend({
    name: i.string(),
    arguments: i.optional(i.record(i.unknown()))
  })
}), fr = M.extend({
  method: i.literal("notifications/tools/list_changed")
}), Cn = i.enum([
  "debug",
  "info",
  "notice",
  "warning",
  "error",
  "critical",
  "alert",
  "emergency"
]), gr = C.extend({
  method: i.literal("logging/setLevel"),
  params: I.extend({
    /**
     * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
     */
    level: Cn
  })
}), vr = M.extend({
  method: i.literal("notifications/message"),
  params: ke.extend({
    /**
     * The severity of this log message.
     */
    level: Cn,
    /**
     * An optional name of the logger issuing this message.
     */
    logger: i.optional(i.string()),
    /**
     * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
     */
    data: i.unknown()
  })
}), yr = i.object({
  /**
   * A hint for a model name.
   */
  name: i.string().optional()
}).passthrough(), _r = i.object({
  /**
   * Optional hints to use for model selection.
   */
  hints: i.optional(i.array(yr)),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: i.optional(i.number().min(0).max(1)),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: i.optional(i.number().min(0).max(1)),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: i.optional(i.number().min(0).max(1))
}).passthrough(), br = i.object({
  role: i.enum(["user", "assistant"]),
  content: i.union([Me, $e])
}).passthrough(), xr = C.extend({
  method: i.literal("sampling/createMessage"),
  params: I.extend({
    messages: i.array(br),
    /**
     * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
     */
    systemPrompt: i.optional(i.string()),
    /**
     * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt. The client MAY ignore this request.
     */
    includeContext: i.optional(i.enum(["none", "thisServer", "allServers"])),
    temperature: i.optional(i.number()),
    /**
     * The maximum number of tokens to sample, as requested by the server. The client MAY choose to sample fewer tokens than requested.
     */
    maxTokens: i.number().int(),
    stopSequences: i.optional(i.array(i.string())),
    /**
     * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
     */
    metadata: i.optional(i.object({}).passthrough()),
    /**
     * The server's preferences for which model to select.
     */
    modelPreferences: i.optional(_r)
  })
}), kr = O.extend({
  /**
   * The name of the model that generated the message.
   */
  model: i.string(),
  /**
   * The reason why sampling stopped.
   */
  stopReason: i.optional(i.enum(["endTurn", "stopSequence", "maxTokens"]).or(i.string())),
  role: i.enum(["user", "assistant"]),
  content: i.discriminatedUnion("type", [
    Me,
    $e
  ])
}), wr = i.object({
  type: i.literal("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: i.string()
}).passthrough(), Tr = i.object({
  type: i.literal("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: i.string()
}).passthrough(), Sr = C.extend({
  method: i.literal("completion/complete"),
  params: I.extend({
    ref: i.union([Tr, wr]),
    /**
     * The argument's information
     */
    argument: i.object({
      /**
       * The name of the argument
       */
      name: i.string(),
      /**
       * The value of the argument to use for completion matching.
       */
      value: i.string()
    }).passthrough()
  })
}), Rn = O.extend({
  completion: i.object({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: i.array(i.string()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: i.optional(i.number().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: i.optional(i.boolean())
  }).passthrough()
}), Cr = i.object({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: i.string().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: i.optional(i.string())
}).passthrough(), Rr = C.extend({
  method: i.literal("roots/list")
}), Zr = O.extend({
  roots: i.array(Cr)
}), jr = M.extend({
  method: i.literal("notifications/roots/list_changed")
});
i.union([
  Be,
  Wt,
  Sr,
  gr,
  dr,
  cr,
  Qt,
  er,
  nr,
  rr,
  sr,
  mr,
  pr
]);
i.union([
  Ve,
  We,
  Jt,
  jr
]);
i.union([
  ee,
  kr,
  Zr
]);
i.union([
  Be,
  xr,
  Rr
]);
i.union([
  Ve,
  We,
  vr,
  ar,
  tr,
  fr,
  lr
]);
i.union([
  ee,
  fn,
  Rn,
  Tn,
  kn,
  _n,
  bn,
  xn,
  Ke,
  Sn
]);
class we extends Error {
  constructor(e, n, t) {
    super(`MCP error ${e}: ${n}`), this.code = e, this.data = t, this.name = "McpError";
  }
}
const Ar = 6e4;
class Ir {
  constructor(e) {
    this._options = e, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this.setNotificationHandler(Ve, (n) => {
      const t = this._requestHandlerAbortControllers.get(n.params.requestId);
      t == null || t.abort(n.params.reason);
    }), this.setNotificationHandler(We, (n) => {
      this._onprogress(n);
    }), this.setRequestHandler(
      Be,
      // Automatic pong by default.
      (n) => ({})
    );
  }
  _setupTimeout(e, n, t, s) {
    this._timeoutInfo.set(e, {
      timeoutId: setTimeout(s, n),
      startTime: Date.now(),
      timeout: n,
      maxTotalTimeout: t,
      onTimeout: s
    });
  }
  _resetTimeout(e) {
    const n = this._timeoutInfo.get(e);
    if (!n)
      return !1;
    const t = Date.now() - n.startTime;
    if (n.maxTotalTimeout && t >= n.maxTotalTimeout)
      throw this._timeoutInfo.delete(e), new we(B.RequestTimeout, "Maximum total timeout exceeded", { maxTotalTimeout: n.maxTotalTimeout, totalElapsed: t });
    return clearTimeout(n.timeoutId), n.timeoutId = setTimeout(n.onTimeout, n.timeout), !0;
  }
  _cleanupTimeout(e) {
    const n = this._timeoutInfo.get(e);
    n && (clearTimeout(n.timeoutId), this._timeoutInfo.delete(e));
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(e) {
    this._transport = e, this._transport.onclose = () => {
      this._onclose();
    }, this._transport.onerror = (n) => {
      this._onerror(n);
    }, this._transport.onmessage = (n) => {
      "method" in n ? "id" in n ? this._onrequest(n) : this._onnotification(n) : this._onresponse(n);
    }, await this._transport.start();
  }
  _onclose() {
    var e;
    const n = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._transport = void 0, (e = this.onclose) === null || e === void 0 || e.call(this);
    const t = new we(B.ConnectionClosed, "Connection closed");
    for (const s of n.values())
      s(t);
  }
  _onerror(e) {
    var n;
    (n = this.onerror) === null || n === void 0 || n.call(this, e);
  }
  _onnotification(e) {
    var n;
    const t = (n = this._notificationHandlers.get(e.method)) !== null && n !== void 0 ? n : this.fallbackNotificationHandler;
    t !== void 0 && Promise.resolve().then(() => t(e)).catch((s) => this._onerror(new Error(`Uncaught error in notification handler: ${s}`)));
  }
  _onrequest(e) {
    var n, t, s;
    const a = (n = this._requestHandlers.get(e.method)) !== null && n !== void 0 ? n : this.fallbackRequestHandler;
    if (a === void 0) {
      (t = this._transport) === null || t === void 0 || t.send({
        jsonrpc: "2.0",
        id: e.id,
        error: {
          code: B.MethodNotFound,
          message: "Method not found"
        }
      }).catch((l) => this._onerror(new Error(`Failed to send an error response: ${l}`)));
      return;
    }
    const o = new AbortController();
    this._requestHandlerAbortControllers.set(e.id, o);
    const c = {
      signal: o.signal,
      sessionId: (s = this._transport) === null || s === void 0 ? void 0 : s.sessionId
    };
    Promise.resolve().then(() => a(e, c)).then((l) => {
      var u;
      if (!o.signal.aborted)
        return (u = this._transport) === null || u === void 0 ? void 0 : u.send({
          result: l,
          jsonrpc: "2.0",
          id: e.id
        });
    }, (l) => {
      var u, m;
      if (!o.signal.aborted)
        return (u = this._transport) === null || u === void 0 ? void 0 : u.send({
          jsonrpc: "2.0",
          id: e.id,
          error: {
            code: Number.isSafeInteger(l.code) ? l.code : B.InternalError,
            message: (m = l.message) !== null && m !== void 0 ? m : "Internal error"
          }
        });
    }).catch((l) => this._onerror(new Error(`Failed to send response: ${l}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(e.id);
    });
  }
  _onprogress(e) {
    const { progressToken: n, ...t } = e.params, s = Number(n), a = this._progressHandlers.get(s);
    if (!a) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(e)}`));
      return;
    }
    const o = this._responseHandlers.get(s);
    if (this._timeoutInfo.has(s) && o)
      try {
        this._resetTimeout(s);
      } catch (c) {
        o(c);
        return;
      }
    a(t);
  }
  _onresponse(e) {
    const n = Number(e.id), t = this._responseHandlers.get(n);
    if (t === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(e)}`));
      return;
    }
    if (this._responseHandlers.delete(n), this._progressHandlers.delete(n), this._cleanupTimeout(n), "result" in e)
      t(e);
    else {
      const s = new we(e.error.code, e.error.message, e.error.data);
      t(s);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    var e;
    await ((e = this._transport) === null || e === void 0 ? void 0 : e.close());
  }
  /**
   * Sends a request and wait for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(e, n, t) {
    return new Promise((s, a) => {
      var o, c, l, u;
      if (!this._transport) {
        a(new Error("Not connected"));
        return;
      }
      ((o = this._options) === null || o === void 0 ? void 0 : o.enforceStrictCapabilities) === !0 && this.assertCapabilityForMethod(e.method), (c = t == null ? void 0 : t.signal) === null || c === void 0 || c.throwIfAborted();
      const m = this._requestMessageId++, k = {
        ...e,
        jsonrpc: "2.0",
        id: m
      };
      t != null && t.onprogress && (this._progressHandlers.set(m, t.onprogress), k.params = {
        ...e.params,
        _meta: { progressToken: m }
      });
      const D = (R) => {
        var V;
        this._responseHandlers.delete(m), this._progressHandlers.delete(m), this._cleanupTimeout(m), (V = this._transport) === null || V === void 0 || V.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: m,
            reason: String(R)
          }
        }).catch((ae) => this._onerror(new Error(`Failed to send cancellation: ${ae}`))), a(R);
      };
      this._responseHandlers.set(m, (R) => {
        var V;
        if (!(!((V = t == null ? void 0 : t.signal) === null || V === void 0) && V.aborted)) {
          if (R instanceof Error)
            return a(R);
          try {
            const ae = n.parse(R.result);
            s(ae);
          } catch (ae) {
            a(ae);
          }
        }
      }), (l = t == null ? void 0 : t.signal) === null || l === void 0 || l.addEventListener("abort", () => {
        var R;
        D((R = t == null ? void 0 : t.signal) === null || R === void 0 ? void 0 : R.reason);
      });
      const G = (u = t == null ? void 0 : t.timeout) !== null && u !== void 0 ? u : Ar, Zn = () => D(new we(B.RequestTimeout, "Request timed out", { timeout: G }));
      this._setupTimeout(m, G, t == null ? void 0 : t.maxTotalTimeout, Zn), this._transport.send(k).catch((R) => {
        this._cleanupTimeout(m), a(R);
      });
    });
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(e) {
    if (!this._transport)
      throw new Error("Not connected");
    this.assertNotificationCapability(e.method);
    const n = {
      ...e,
      jsonrpc: "2.0"
    };
    await this._transport.send(n);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(e, n) {
    const t = e.shape.method.value;
    this.assertRequestHandlerCapability(t), this._requestHandlers.set(t, (s, a) => Promise.resolve(n(e.parse(s), a)));
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(e) {
    this._requestHandlers.delete(e);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(e) {
    if (this._requestHandlers.has(e))
      throw new Error(`A request handler for ${e} already exists, which would be overridden`);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(e, n) {
    this._notificationHandlers.set(e.shape.method.value, (t) => Promise.resolve(n(e.parse(t))));
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(e) {
    this._notificationHandlers.delete(e);
  }
}
function Or(r, e) {
  return Object.entries(e).reduce((n, [t, s]) => (s && typeof s == "object" ? n[t] = n[t] ? { ...n[t], ...s } : s : n[t] = s, n), { ...r });
}
class Pr extends Ir {
  /**
   * Initializes this client with the given name and version information.
   */
  constructor(e, n) {
    var t;
    super(n), this._clientInfo = e, this._capabilities = (t = n == null ? void 0 : n.capabilities) !== null && t !== void 0 ? t : {};
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(e) {
    if (this.transport)
      throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = Or(this._capabilities, e);
  }
  assertCapability(e, n) {
    var t;
    if (!(!((t = this._serverCapabilities) === null || t === void 0) && t[e]))
      throw new Error(`Server does not support ${e} (required for ${n})`);
  }
  async connect(e) {
    await super.connect(e);
    try {
      const n = await this.request({
        method: "initialize",
        params: {
          protocolVersion: ln,
          capabilities: this._capabilities,
          clientInfo: this._clientInfo
        }
      }, fn);
      if (n === void 0)
        throw new Error(`Server sent invalid initialize result: ${n}`);
      if (!Ut.includes(n.protocolVersion))
        throw new Error(`Server's protocol version is not supported: ${n.protocolVersion}`);
      this._serverCapabilities = n.capabilities, this._serverVersion = n.serverInfo, this._instructions = n.instructions, await this.notification({
        method: "notifications/initialized"
      });
    } catch (n) {
      throw this.close(), n;
    }
  }
  /**
   * After initialization has completed, this will be populated with the server's reported capabilities.
   */
  getServerCapabilities() {
    return this._serverCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the server's name and version.
   */
  getServerVersion() {
    return this._serverVersion;
  }
  /**
   * After initialization has completed, this may be populated with information about the server's instructions.
   */
  getInstructions() {
    return this._instructions;
  }
  assertCapabilityForMethod(e) {
    var n, t, s, a, o;
    switch (e) {
      case "logging/setLevel":
        if (!(!((n = this._serverCapabilities) === null || n === void 0) && n.logging))
          throw new Error(`Server does not support logging (required for ${e})`);
        break;
      case "prompts/get":
      case "prompts/list":
        if (!(!((t = this._serverCapabilities) === null || t === void 0) && t.prompts))
          throw new Error(`Server does not support prompts (required for ${e})`);
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
      case "resources/subscribe":
      case "resources/unsubscribe":
        if (!(!((s = this._serverCapabilities) === null || s === void 0) && s.resources))
          throw new Error(`Server does not support resources (required for ${e})`);
        if (e === "resources/subscribe" && !this._serverCapabilities.resources.subscribe)
          throw new Error(`Server does not support resource subscriptions (required for ${e})`);
        break;
      case "tools/call":
      case "tools/list":
        if (!(!((a = this._serverCapabilities) === null || a === void 0) && a.tools))
          throw new Error(`Server does not support tools (required for ${e})`);
        break;
      case "completion/complete":
        if (!(!((o = this._serverCapabilities) === null || o === void 0) && o.prompts))
          throw new Error(`Server does not support prompts (required for ${e})`);
        break;
    }
  }
  assertNotificationCapability(e) {
    var n;
    switch (e) {
      case "notifications/roots/list_changed":
        if (!(!((n = this._capabilities.roots) === null || n === void 0) && n.listChanged))
          throw new Error(`Client does not support roots list changed notifications (required for ${e})`);
        break;
    }
  }
  assertRequestHandlerCapability(e) {
    switch (e) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling)
          throw new Error(`Client does not support sampling capability (required for ${e})`);
        break;
      case "roots/list":
        if (!this._capabilities.roots)
          throw new Error(`Client does not support roots capability (required for ${e})`);
        break;
    }
  }
  async ping(e) {
    return this.request({ method: "ping" }, ee, e);
  }
  async complete(e, n) {
    return this.request({ method: "completion/complete", params: e }, Rn, n);
  }
  async setLoggingLevel(e, n) {
    return this.request({ method: "logging/setLevel", params: { level: e } }, ee, n);
  }
  async getPrompt(e, n) {
    return this.request({ method: "prompts/get", params: e }, Tn, n);
  }
  async listPrompts(e, n) {
    return this.request({ method: "prompts/list", params: e }, kn, n);
  }
  async listResources(e, n) {
    return this.request({ method: "resources/list", params: e }, _n, n);
  }
  async listResourceTemplates(e, n) {
    return this.request({ method: "resources/templates/list", params: e }, bn, n);
  }
  async readResource(e, n) {
    return this.request({ method: "resources/read", params: e }, xn, n);
  }
  async subscribeResource(e, n) {
    return this.request({ method: "resources/subscribe", params: e }, ee, n);
  }
  async unsubscribeResource(e, n) {
    return this.request({ method: "resources/unsubscribe", params: e }, ee, n);
  }
  async callTool(e, n = Ke, t) {
    return this.request({ method: "tools/call", params: e }, n, t);
  }
  async listTools(e, n) {
    return this.request({ method: "tools/list", params: e }, Sn, n);
  }
  async sendRootsListChanged() {
    return this.notification({ method: "notifications/roots/list_changed" });
  }
}
async function Nr() {
  const r = new Pr({
    name: "sample",
    version: "1.0.0"
  }), e = new On(), n = new In(e);
  await r.connect(n);
  const { tools: t } = await r.listTools();
  return console.log(t), t;
}
export {
  Nr as runWorker
};
