var qe = { exports: {} }, xe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function pt() {
  if (st) return xe;
  st = 1;
  var S = Symbol.for("react.transitional.element"), d = Symbol.for("react.fragment");
  function B(K, N, P) {
    var U = null;
    if (P !== void 0 && (U = "" + P), N.key !== void 0 && (U = "" + N.key), "key" in N) {
      P = {};
      for (var q in N)
        q !== "key" && (P[q] = N[q]);
    } else P = N;
    return N = P.ref, {
      $$typeof: S,
      type: K,
      key: U,
      ref: N !== void 0 ? N : null,
      props: P
    };
  }
  return xe.Fragment = d, xe.jsx = B, xe.jsxs = B, xe;
}
var Me = {}, ze = { exports: {} }, y = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function Et() {
  if (at) return y;
  at = 1;
  var S = Symbol.for("react.transitional.element"), d = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), U = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), ue = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), Ee = Symbol.iterator;
  function Ae(n) {
    return n === null || typeof n != "object" ? null : (n = Ee && n[Ee] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var Se = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, he = Object.assign, V = {};
  function H(n, u, E) {
    this.props = n, this.context = u, this.refs = V, this.updater = E || Se;
  }
  H.prototype.isReactComponent = {}, H.prototype.setState = function(n, u) {
    if (typeof n != "object" && typeof n != "function" && n != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, n, u, "setState");
  }, H.prototype.forceUpdate = function(n) {
    this.updater.enqueueForceUpdate(this, n, "forceUpdate");
  };
  function te() {
  }
  te.prototype = H.prototype;
  function J(n, u, E) {
    this.props = n, this.context = u, this.refs = V, this.updater = E || Se;
  }
  var se = J.prototype = new te();
  se.constructor = J, he(se, H.prototype), se.isPureReactComponent = !0;
  var ae = Array.isArray, O = { H: null, A: null, T: null, S: null }, Z = Object.prototype.hasOwnProperty;
  function ie(n, u, E, v, m, T) {
    return E = T.ref, {
      $$typeof: S,
      type: n,
      key: u,
      ref: E !== void 0 ? E : null,
      props: T
    };
  }
  function me(n, u) {
    return ie(
      n.type,
      u,
      void 0,
      void 0,
      void 0,
      n.props
    );
  }
  function M(n) {
    return typeof n == "object" && n !== null && n.$$typeof === S;
  }
  function ge(n) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + n.replace(/[=:]/g, function(E) {
      return u[E];
    });
  }
  var fe = /\/+/g;
  function re(n, u) {
    return typeof n == "object" && n !== null && n.key != null ? ge("" + n.key) : u.toString(36);
  }
  function F() {
  }
  function ce(n) {
    switch (n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw n.reason;
      default:
        switch (typeof n.status == "string" ? n.then(F, F) : (n.status = "pending", n.then(
          function(u) {
            n.status === "pending" && (n.status = "fulfilled", n.value = u);
          },
          function(u) {
            n.status === "pending" && (n.status = "rejected", n.reason = u);
          }
        )), n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw n.reason;
        }
    }
    throw n;
  }
  function I(n, u, E, v, m) {
    var T = typeof n;
    (T === "undefined" || T === "boolean") && (n = null);
    var h = !1;
    if (n === null) h = !0;
    else
      switch (T) {
        case "bigint":
        case "string":
        case "number":
          h = !0;
          break;
        case "object":
          switch (n.$$typeof) {
            case S:
            case d:
              h = !0;
              break;
            case z:
              return h = n._init, I(
                h(n._payload),
                u,
                E,
                v,
                m
              );
          }
      }
    if (h)
      return m = m(n), h = v === "" ? "." + re(n, 0) : v, ae(m) ? (E = "", h != null && (E = h.replace(fe, "$&/") + "/"), I(m, u, E, "", function(le) {
        return le;
      })) : m != null && (M(m) && (m = me(
        m,
        E + (m.key == null || n && n.key === m.key ? "" : ("" + m.key).replace(
          fe,
          "$&/"
        ) + "/") + h
      )), u.push(m)), 1;
    h = 0;
    var $ = v === "" ? "." : v + ":";
    if (ae(n))
      for (var A = 0; A < n.length; A++)
        v = n[A], T = $ + re(v, A), h += I(
          v,
          u,
          E,
          T,
          m
        );
    else if (A = Ae(n), typeof A == "function")
      for (n = A.call(n), A = 0; !(v = n.next()).done; )
        v = v.value, T = $ + re(v, A++), h += I(
          v,
          u,
          E,
          T,
          m
        );
    else if (T === "object") {
      if (typeof n.then == "function")
        return I(
          ce(n),
          u,
          E,
          v,
          m
        );
      throw u = String(n), Error(
        "Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return h;
  }
  function W(n, u, E) {
    if (n == null) return n;
    var v = [], m = 0;
    return I(n, v, "", "", function(T) {
      return u.call(E, T, m++);
    }), v;
  }
  function ne(n) {
    if (n._status === -1) {
      var u = n._result;
      u = u(), u.then(
        function(E) {
          (n._status === 0 || n._status === -1) && (n._status = 1, n._result = E);
        },
        function(E) {
          (n._status === 0 || n._status === -1) && (n._status = 2, n._result = E);
        }
      ), n._status === -1 && (n._status = 0, n._result = u);
    }
    if (n._status === 1) return n._result.default;
    throw n._result;
  }
  var je = typeof reportError == "function" ? reportError : function(n) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var u = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof n == "object" && n !== null && typeof n.message == "string" ? String(n.message) : String(n),
        error: n
      });
      if (!window.dispatchEvent(u)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", n);
      return;
    }
    console.error(n);
  };
  function b() {
  }
  return y.Children = {
    map: W,
    forEach: function(n, u, E) {
      W(
        n,
        function() {
          u.apply(this, arguments);
        },
        E
      );
    },
    count: function(n) {
      var u = 0;
      return W(n, function() {
        u++;
      }), u;
    },
    toArray: function(n) {
      return W(n, function(u) {
        return u;
      }) || [];
    },
    only: function(n) {
      if (!M(n))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return n;
    }
  }, y.Component = H, y.Fragment = B, y.Profiler = N, y.PureComponent = J, y.StrictMode = K, y.Suspense = ue, y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O, y.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, y.cache = function(n) {
    return function() {
      return n.apply(null, arguments);
    };
  }, y.cloneElement = function(n, u, E) {
    if (n == null)
      throw Error(
        "The argument must be a React element, but you passed " + n + "."
      );
    var v = he({}, n.props), m = n.key, T = void 0;
    if (u != null)
      for (h in u.ref !== void 0 && (T = void 0), u.key !== void 0 && (m = "" + u.key), u)
        !Z.call(u, h) || h === "key" || h === "__self" || h === "__source" || h === "ref" && u.ref === void 0 || (v[h] = u[h]);
    var h = arguments.length - 2;
    if (h === 1) v.children = E;
    else if (1 < h) {
      for (var $ = Array(h), A = 0; A < h; A++)
        $[A] = arguments[A + 2];
      v.children = $;
    }
    return ie(n.type, m, void 0, void 0, T, v);
  }, y.createContext = function(n) {
    return n = {
      $$typeof: U,
      _currentValue: n,
      _currentValue2: n,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, n.Provider = n, n.Consumer = {
      $$typeof: P,
      _context: n
    }, n;
  }, y.createElement = function(n, u, E) {
    var v, m = {}, T = null;
    if (u != null)
      for (v in u.key !== void 0 && (T = "" + u.key), u)
        Z.call(u, v) && v !== "key" && v !== "__self" && v !== "__source" && (m[v] = u[v]);
    var h = arguments.length - 2;
    if (h === 1) m.children = E;
    else if (1 < h) {
      for (var $ = Array(h), A = 0; A < h; A++)
        $[A] = arguments[A + 2];
      m.children = $;
    }
    if (n && n.defaultProps)
      for (v in h = n.defaultProps, h)
        m[v] === void 0 && (m[v] = h[v]);
    return ie(n, T, void 0, void 0, null, m);
  }, y.createRef = function() {
    return { current: null };
  }, y.forwardRef = function(n) {
    return { $$typeof: q, render: n };
  }, y.isValidElement = M, y.lazy = function(n) {
    return {
      $$typeof: z,
      _payload: { _status: -1, _result: n },
      _init: ne
    };
  }, y.memo = function(n, u) {
    return {
      $$typeof: D,
      type: n,
      compare: u === void 0 ? null : u
    };
  }, y.startTransition = function(n) {
    var u = O.T, E = {};
    O.T = E;
    try {
      var v = n(), m = O.S;
      m !== null && m(E, v), typeof v == "object" && v !== null && typeof v.then == "function" && v.then(b, je);
    } catch (T) {
      je(T);
    } finally {
      O.T = u;
    }
  }, y.unstable_useCacheRefresh = function() {
    return O.H.useCacheRefresh();
  }, y.use = function(n) {
    return O.H.use(n);
  }, y.useActionState = function(n, u, E) {
    return O.H.useActionState(n, u, E);
  }, y.useCallback = function(n, u) {
    return O.H.useCallback(n, u);
  }, y.useContext = function(n) {
    return O.H.useContext(n);
  }, y.useDebugValue = function() {
  }, y.useDeferredValue = function(n, u) {
    return O.H.useDeferredValue(n, u);
  }, y.useEffect = function(n, u) {
    return O.H.useEffect(n, u);
  }, y.useId = function() {
    return O.H.useId();
  }, y.useImperativeHandle = function(n, u, E) {
    return O.H.useImperativeHandle(n, u, E);
  }, y.useInsertionEffect = function(n, u) {
    return O.H.useInsertionEffect(n, u);
  }, y.useLayoutEffect = function(n, u) {
    return O.H.useLayoutEffect(n, u);
  }, y.useMemo = function(n, u) {
    return O.H.useMemo(n, u);
  }, y.useOptimistic = function(n, u) {
    return O.H.useOptimistic(n, u);
  }, y.useReducer = function(n, u, E) {
    return O.H.useReducer(n, u, E);
  }, y.useRef = function(n) {
    return O.H.useRef(n);
  }, y.useState = function(n) {
    return O.H.useState(n);
  }, y.useSyncExternalStore = function(n, u, E) {
    return O.H.useSyncExternalStore(
      n,
      u,
      E
    );
  }, y.useTransition = function() {
    return O.H.useTransition();
  }, y.version = "19.0.0", y;
}
var $e = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
$e.exports;
var it;
function ht() {
  return it || (it = 1, function(S, d) {
    process.env.NODE_ENV !== "production" && function() {
      function B(e, r) {
        Object.defineProperty(P.prototype, e, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              r[0],
              r[1]
            );
          }
        });
      }
      function K(e) {
        return e === null || typeof e != "object" ? null : (e = Ne && e[Ne] || e["@@iterator"], typeof e == "function" ? e : null);
      }
      function N(e, r) {
        e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
        var o = e + "." + r;
        Pe[o] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          r,
          e
        ), Pe[o] = !0);
      }
      function P(e, r, o) {
        this.props = e, this.context = r, this.refs = i, this.updater = o || t;
      }
      function U() {
      }
      function q(e, r, o) {
        this.props = e, this.context = r, this.refs = i, this.updater = o || t;
      }
      function ue(e) {
        return "" + e;
      }
      function D(e) {
        try {
          ue(e);
          var r = !1;
        } catch {
          r = !0;
        }
        if (r) {
          r = console;
          var o = r.error, s = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return o.call(
            r,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            s
          ), ue(e);
        }
      }
      function z(e) {
        if (e == null) return null;
        if (typeof e == "function")
          return e.$$typeof === g ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
          case A:
            return "Fragment";
          case $:
            return "Portal";
          case ke:
            return "Profiler";
          case le:
            return "StrictMode";
          case de:
            return "Suspense";
          case be:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (typeof e.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), e.$$typeof) {
            case _e:
              return (e.displayName || "Context") + ".Provider";
            case ye:
              return (e._context.displayName || "Context") + ".Consumer";
            case we:
              var r = e.render;
              return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case Ce:
              return r = e.displayName || null, r !== null ? r : z(e.type) || "Memo";
            case ve:
              r = e._payload, e = e._init;
              try {
                return z(e(r));
              } catch {
              }
          }
        return null;
      }
      function Ee(e) {
        return typeof e == "string" || typeof e == "function" || e === A || e === ke || e === le || e === de || e === be || e === Ye || typeof e == "object" && e !== null && (e.$$typeof === ve || e.$$typeof === Ce || e.$$typeof === _e || e.$$typeof === ye || e.$$typeof === we || e.$$typeof === x || e.getModuleId !== void 0);
      }
      function Ae() {
      }
      function Se() {
        if (L === 0) {
          pe = console.log, X = console.info, Te = console.warn, G = console.error, Qe = console.group, Xe = console.groupCollapsed, De = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ae,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        L++;
      }
      function he() {
        if (L--, L === 0) {
          var e = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: a({}, e, { value: pe }),
            info: a({}, e, { value: X }),
            warn: a({}, e, { value: Te }),
            error: a({}, e, { value: G }),
            group: a({}, e, { value: Qe }),
            groupCollapsed: a({}, e, { value: Xe }),
            groupEnd: a({}, e, { value: De })
          });
        }
        0 > L && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function V(e) {
        if (Ie === void 0)
          try {
            throw Error();
          } catch (o) {
            var r = o.stack.trim().match(/\n( *(at )?)/);
            Ie = r && r[1] || "", Ve = -1 < o.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < o.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Ie + e + Ve;
      }
      function H(e, r) {
        if (!e || Ge) return "";
        var o = Be.get(e);
        if (o !== void 0) return o;
        Ge = !0, o = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var s = null;
        s = p.H, p.H = null, Se();
        try {
          var f = {
            DetermineComponentFrameRoot: function() {
              try {
                if (r) {
                  var ee = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(ee.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(ee, []);
                    } catch (oe) {
                      var Le = oe;
                    }
                    Reflect.construct(e, [], ee);
                  } else {
                    try {
                      ee.call();
                    } catch (oe) {
                      Le = oe;
                    }
                    e.call(ee.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (oe) {
                    Le = oe;
                  }
                  (ee = e()) && typeof ee.catch == "function" && ee.catch(function() {
                  });
                }
              } catch (oe) {
                if (oe && Le && typeof oe.stack == "string")
                  return [oe.stack, Le.stack];
              }
              return [null, null];
            }
          };
          f.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var l = Object.getOwnPropertyDescriptor(
            f.DetermineComponentFrameRoot,
            "name"
          );
          l && l.configurable && Object.defineProperty(
            f.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var c = f.DetermineComponentFrameRoot(), C = c[0], w = c[1];
          if (C && w) {
            var j = C.split(`
`), Y = w.split(`
`);
            for (c = l = 0; l < j.length && !j[l].includes(
              "DetermineComponentFrameRoot"
            ); )
              l++;
            for (; c < Y.length && !Y[c].includes(
              "DetermineComponentFrameRoot"
            ); )
              c++;
            if (l === j.length || c === Y.length)
              for (l = j.length - 1, c = Y.length - 1; 1 <= l && 0 <= c && j[l] !== Y[c]; )
                c--;
            for (; 1 <= l && 0 <= c; l--, c--)
              if (j[l] !== Y[c]) {
                if (l !== 1 || c !== 1)
                  do
                    if (l--, c--, 0 > c || j[l] !== Y[c]) {
                      var Re = `
` + j[l].replace(
                        " at new ",
                        " at "
                      );
                      return e.displayName && Re.includes("<anonymous>") && (Re = Re.replace("<anonymous>", e.displayName)), typeof e == "function" && Be.set(e, Re), Re;
                    }
                  while (1 <= l && 0 <= c);
                break;
              }
          }
        } finally {
          Ge = !1, p.H = s, he(), Error.prepareStackTrace = o;
        }
        return j = (j = e ? e.displayName || e.name : "") ? V(j) : "", typeof e == "function" && Be.set(e, j), j;
      }
      function te(e) {
        if (e == null) return "";
        if (typeof e == "function") {
          var r = e.prototype;
          return H(
            e,
            !(!r || !r.isReactComponent)
          );
        }
        if (typeof e == "string") return V(e);
        switch (e) {
          case de:
            return V("Suspense");
          case be:
            return V("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case we:
              return e = H(e.render, !1), e;
            case Ce:
              return te(e.type);
            case ve:
              r = e._payload, e = e._init;
              try {
                return te(e(r));
              } catch {
              }
          }
        return "";
      }
      function J() {
        var e = p.A;
        return e === null ? null : e.getOwner();
      }
      function se(e) {
        if (Q.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function ae(e, r) {
        function o() {
          Je || (Je = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            r
          ));
        }
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
      function O() {
        var e = z(this.type);
        return Fe[e] || (Fe[e] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), e = this.props.ref, e !== void 0 ? e : null;
      }
      function Z(e, r, o, s, f, l) {
        return o = l.ref, e = {
          $$typeof: h,
          type: e,
          key: r,
          props: l,
          _owner: f
        }, (o !== void 0 ? o : null) !== null ? Object.defineProperty(e, "ref", {
          enumerable: !1,
          get: O
        }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(e, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
      }
      function ie(e, r) {
        return r = Z(
          e.type,
          r,
          void 0,
          void 0,
          e._owner,
          e.props
        ), r._store.validated = e._store.validated, r;
      }
      function me(e, r) {
        if (typeof e == "object" && e && e.$$typeof !== vt) {
          if (R(e))
            for (var o = 0; o < e.length; o++) {
              var s = e[o];
              M(s) && ge(s, r);
            }
          else if (M(e))
            e._store && (e._store.validated = 1);
          else if (o = K(e), typeof o == "function" && o !== e.entries && (o = o.call(e), o !== e))
            for (; !(e = o.next()).done; )
              M(e.value) && ge(e.value, r);
        }
      }
      function M(e) {
        return typeof e == "object" && e !== null && e.$$typeof === h;
      }
      function ge(e, r) {
        if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, r = fe(r), !et[r])) {
          et[r] = !0;
          var o = "";
          e && e._owner != null && e._owner !== J() && (o = null, typeof e._owner.tag == "number" ? o = z(e._owner.type) : typeof e._owner.name == "string" && (o = e._owner.name), o = " It was passed a child from " + o + ".");
          var s = p.getCurrentStack;
          p.getCurrentStack = function() {
            var f = te(e.type);
            return s && (f += s() || ""), f;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            r,
            o
          ), p.getCurrentStack = s;
        }
      }
      function fe(e) {
        var r = "", o = J();
        return o && (o = z(o.type)) && (r = `

Check the render method of \`` + o + "`."), r || (e = z(e)) && (r = `

Check the top-level render call using <` + e + ">."), r;
      }
      function re(e) {
        var r = { "=": "=0", ":": "=2" };
        return "$" + e.replace(/[=:]/g, function(o) {
          return r[o];
        });
      }
      function F(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (D(e.key), re("" + e.key)) : r.toString(36);
      }
      function ce() {
      }
      function I(e) {
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
          default:
            switch (typeof e.status == "string" ? e.then(ce, ce) : (e.status = "pending", e.then(
              function(r) {
                e.status === "pending" && (e.status = "fulfilled", e.value = r);
              },
              function(r) {
                e.status === "pending" && (e.status = "rejected", e.reason = r);
              }
            )), e.status) {
              case "fulfilled":
                return e.value;
              case "rejected":
                throw e.reason;
            }
        }
        throw e;
      }
      function W(e, r, o, s, f) {
        var l = typeof e;
        (l === "undefined" || l === "boolean") && (e = null);
        var c = !1;
        if (e === null) c = !0;
        else
          switch (l) {
            case "bigint":
            case "string":
            case "number":
              c = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case h:
                case $:
                  c = !0;
                  break;
                case ve:
                  return c = e._init, W(
                    c(e._payload),
                    r,
                    o,
                    s,
                    f
                  );
              }
          }
        if (c) {
          c = e, f = f(c);
          var C = s === "" ? "." + F(c, 0) : s;
          return R(f) ? (o = "", C != null && (o = C.replace(rt, "$&/") + "/"), W(f, r, o, "", function(j) {
            return j;
          })) : f != null && (M(f) && (f.key != null && (c && c.key === f.key || D(f.key)), o = ie(
            f,
            o + (f.key == null || c && c.key === f.key ? "" : ("" + f.key).replace(
              rt,
              "$&/"
            ) + "/") + C
          ), s !== "" && c != null && M(c) && c.key == null && c._store && !c._store.validated && (o._store.validated = 2), f = o), r.push(f)), 1;
        }
        if (c = 0, C = s === "" ? "." : s + ":", R(e))
          for (var w = 0; w < e.length; w++)
            s = e[w], l = C + F(s, w), c += W(
              s,
              r,
              o,
              l,
              f
            );
        else if (w = K(e), typeof w == "function")
          for (w === e.entries && (tt || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), tt = !0), e = w.call(e), w = 0; !(s = e.next()).done; )
            s = s.value, l = C + F(s, w++), c += W(
              s,
              r,
              o,
              l,
              f
            );
        else if (l === "object") {
          if (typeof e.then == "function")
            return W(
              I(e),
              r,
              o,
              s,
              f
            );
          throw r = String(e), Error(
            "Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return c;
      }
      function ne(e, r, o) {
        if (e == null) return e;
        var s = [], f = 0;
        return W(e, s, "", "", function(l) {
          return r.call(o, l, f++);
        }), s;
      }
      function je(e) {
        if (e._status === -1) {
          var r = e._result;
          r = r(), r.then(
            function(o) {
              (e._status === 0 || e._status === -1) && (e._status = 1, e._result = o);
            },
            function(o) {
              (e._status === 0 || e._status === -1) && (e._status = 2, e._result = o);
            }
          ), e._status === -1 && (e._status = 0, e._result = r);
        }
        if (e._status === 1)
          return r = e._result, r === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            r
          ), "default" in r || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            r
          ), r.default;
        throw e._result;
      }
      function b() {
        var e = p.H;
        return e === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), e;
      }
      function n() {
      }
      function u(e) {
        if (Ue === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7);
            Ue = (S && S[r]).call(
              S,
              "timers"
            ).setImmediate;
          } catch {
            Ue = function(s) {
              ot === !1 && (ot = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var f = new MessageChannel();
              f.port1.onmessage = s, f.port2.postMessage(void 0);
            };
          }
        return Ue(e);
      }
      function E(e) {
        return 1 < e.length && typeof AggregateError == "function" ? new AggregateError(e) : e[0];
      }
      function v(e, r) {
        r !== He - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), He = r;
      }
      function m(e, r, o) {
        var s = p.actQueue;
        if (s !== null)
          if (s.length !== 0)
            try {
              T(s), u(function() {
                return m(e, r, o);
              });
              return;
            } catch (f) {
              p.thrownErrors.push(f);
            }
          else p.actQueue = null;
        0 < p.thrownErrors.length ? (s = E(p.thrownErrors), p.thrownErrors.length = 0, o(s)) : r(e);
      }
      function T(e) {
        if (!Ke) {
          Ke = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var o = e[r];
              do {
                p.didUsePromise = !1;
                var s = o(!1);
                if (s !== null) {
                  if (p.didUsePromise) {
                    e[r] = o, e.splice(0, r);
                    return;
                  }
                  o = s;
                } else break;
              } while (!0);
            }
            e.length = 0;
          } catch (f) {
            e.splice(0, r + 1), p.thrownErrors.push(f);
          } finally {
            Ke = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var h = Symbol.for("react.transitional.element"), $ = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), le = Symbol.for("react.strict_mode"), ke = Symbol.for("react.profiler"), ye = Symbol.for("react.consumer"), _e = Symbol.for("react.context"), we = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), be = Symbol.for("react.suspense_list"), Ce = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), Ye = Symbol.for("react.offscreen"), Ne = Symbol.iterator, Pe = {}, t = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(e) {
          N(e, "forceUpdate");
        },
        enqueueReplaceState: function(e) {
          N(e, "replaceState");
        },
        enqueueSetState: function(e) {
          N(e, "setState");
        }
      }, a = Object.assign, i = {};
      Object.freeze(i), P.prototype.isReactComponent = {}, P.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, e, r, "setState");
      }, P.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      var _ = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, k;
      for (k in _)
        _.hasOwnProperty(k) && B(k, _[k]);
      U.prototype = P.prototype, _ = q.prototype = new U(), _.constructor = q, a(_, P.prototype), _.isPureReactComponent = !0;
      var R = Array.isArray, g = Symbol.for("react.client.reference"), p = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      }, Q = Object.prototype.hasOwnProperty, x = Symbol.for("react.client.reference"), L = 0, pe, X, Te, G, Qe, Xe, De;
      Ae.__reactDisabledLog = !0;
      var Ie, Ve, Ge = !1, Be = new (typeof WeakMap == "function" ? WeakMap : Map)(), vt = Symbol.for("react.client.reference"), Je, Ze, Fe = {}, et = {}, tt = !1, rt = /\/+/g, nt = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var r = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
            error: e
          });
          if (!window.dispatchEvent(r)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", e);
          return;
        }
        console.error(e);
      }, ot = !1, Ue = null, He = 0, We = !1, Ke = !1, ut = typeof queueMicrotask == "function" ? function(e) {
        queueMicrotask(function() {
          return queueMicrotask(e);
        });
      } : u;
      d.Children = {
        map: ne,
        forEach: function(e, r, o) {
          ne(
            e,
            function() {
              r.apply(this, arguments);
            },
            o
          );
        },
        count: function(e) {
          var r = 0;
          return ne(e, function() {
            r++;
          }), r;
        },
        toArray: function(e) {
          return ne(e, function(r) {
            return r;
          }) || [];
        },
        only: function(e) {
          if (!M(e))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return e;
        }
      }, d.Component = P, d.Fragment = A, d.Profiler = ke, d.PureComponent = q, d.StrictMode = le, d.Suspense = de, d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = p, d.act = function(e) {
        var r = p.actQueue, o = He;
        He++;
        var s = p.actQueue = r !== null ? r : [], f = !1;
        try {
          var l = e();
        } catch (w) {
          p.thrownErrors.push(w);
        }
        if (0 < p.thrownErrors.length)
          throw v(r, o), e = E(p.thrownErrors), p.thrownErrors.length = 0, e;
        if (l !== null && typeof l == "object" && typeof l.then == "function") {
          var c = l;
          return ut(function() {
            f || We || (We = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(w, j) {
              f = !0, c.then(
                function(Y) {
                  if (v(r, o), o === 0) {
                    try {
                      T(s), u(function() {
                        return m(
                          Y,
                          w,
                          j
                        );
                      });
                    } catch (ee) {
                      p.thrownErrors.push(ee);
                    }
                    if (0 < p.thrownErrors.length) {
                      var Re = E(
                        p.thrownErrors
                      );
                      p.thrownErrors.length = 0, j(Re);
                    }
                  } else w(Y);
                },
                function(Y) {
                  v(r, o), 0 < p.thrownErrors.length && (Y = E(
                    p.thrownErrors
                  ), p.thrownErrors.length = 0), j(Y);
                }
              );
            }
          };
        }
        var C = l;
        if (v(r, o), o === 0 && (T(s), s.length !== 0 && ut(function() {
          f || We || (We = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), p.actQueue = null), 0 < p.thrownErrors.length)
          throw e = E(p.thrownErrors), p.thrownErrors.length = 0, e;
        return {
          then: function(w, j) {
            f = !0, o === 0 ? (p.actQueue = s, u(function() {
              return m(
                C,
                w,
                j
              );
            })) : w(C);
          }
        };
      }, d.cache = function(e) {
        return function() {
          return e.apply(null, arguments);
        };
      }, d.cloneElement = function(e, r, o) {
        if (e == null)
          throw Error(
            "The argument must be a React element, but you passed " + e + "."
          );
        var s = a({}, e.props), f = e.key, l = e._owner;
        if (r != null) {
          var c;
          e: {
            if (Q.call(r, "ref") && (c = Object.getOwnPropertyDescriptor(
              r,
              "ref"
            ).get) && c.isReactWarning) {
              c = !1;
              break e;
            }
            c = r.ref !== void 0;
          }
          c && (l = J()), se(r) && (D(r.key), f = "" + r.key);
          for (C in r)
            !Q.call(r, C) || C === "key" || C === "__self" || C === "__source" || C === "ref" && r.ref === void 0 || (s[C] = r[C]);
        }
        var C = arguments.length - 2;
        if (C === 1) s.children = o;
        else if (1 < C) {
          c = Array(C);
          for (var w = 0; w < C; w++)
            c[w] = arguments[w + 2];
          s.children = c;
        }
        for (s = Z(e.type, f, void 0, void 0, l, s), f = 2; f < arguments.length; f++)
          me(arguments[f], s.type);
        return s;
      }, d.createContext = function(e) {
        return e = {
          $$typeof: _e,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, e.Provider = e, e.Consumer = {
          $$typeof: ye,
          _context: e
        }, e._currentRenderer = null, e._currentRenderer2 = null, e;
      }, d.createElement = function(e, r, o) {
        if (Ee(e))
          for (var s = 2; s < arguments.length; s++)
            me(arguments[s], e);
        else {
          if (s = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null) var f = "null";
          else
            R(e) ? f = "array" : e !== void 0 && e.$$typeof === h ? (f = "<" + (z(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            f,
            s
          );
        }
        var l;
        if (s = {}, f = null, r != null)
          for (l in Ze || !("__self" in r) || "key" in r || (Ze = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), se(r) && (D(r.key), f = "" + r.key), r)
            Q.call(r, l) && l !== "key" && l !== "__self" && l !== "__source" && (s[l] = r[l]);
        var c = arguments.length - 2;
        if (c === 1) s.children = o;
        else if (1 < c) {
          for (var C = Array(c), w = 0; w < c; w++)
            C[w] = arguments[w + 2];
          Object.freeze && Object.freeze(C), s.children = C;
        }
        if (e && e.defaultProps)
          for (l in c = e.defaultProps, c)
            s[l] === void 0 && (s[l] = c[l]);
        return f && ae(
          s,
          typeof e == "function" ? e.displayName || e.name || "Unknown" : e
        ), Z(e, f, void 0, void 0, J(), s);
      }, d.createRef = function() {
        var e = { current: null };
        return Object.seal(e), e;
      }, d.forwardRef = function(e) {
        e != null && e.$$typeof === Ce ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof e != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          e === null ? "null" : typeof e
        ) : e.length !== 0 && e.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), e != null && e.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var r = { $$typeof: we, render: e }, o;
        return Object.defineProperty(r, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return o;
          },
          set: function(s) {
            o = s, e.name || e.displayName || (Object.defineProperty(e, "name", { value: s }), e.displayName = s);
          }
        }), r;
      }, d.isValidElement = M, d.lazy = function(e) {
        return {
          $$typeof: ve,
          _payload: { _status: -1, _result: e },
          _init: je
        };
      }, d.memo = function(e, r) {
        Ee(e) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          e === null ? "null" : typeof e
        ), r = {
          $$typeof: Ce,
          type: e,
          compare: r === void 0 ? null : r
        };
        var o;
        return Object.defineProperty(r, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return o;
          },
          set: function(s) {
            o = s, e.name || e.displayName || (Object.defineProperty(e, "name", { value: s }), e.displayName = s);
          }
        }), r;
      }, d.startTransition = function(e) {
        var r = p.T, o = {};
        p.T = o, o._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var s = e(), f = p.S;
          f !== null && f(o, s), typeof s == "object" && s !== null && typeof s.then == "function" && s.then(n, nt);
        } catch (l) {
          nt(l);
        } finally {
          r === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), p.T = r;
        }
      }, d.unstable_useCacheRefresh = function() {
        return b().useCacheRefresh();
      }, d.use = function(e) {
        return b().use(e);
      }, d.useActionState = function(e, r, o) {
        return b().useActionState(
          e,
          r,
          o
        );
      }, d.useCallback = function(e, r) {
        return b().useCallback(e, r);
      }, d.useContext = function(e) {
        var r = b();
        return e.$$typeof === ye && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), r.useContext(e);
      }, d.useDebugValue = function(e, r) {
        return b().useDebugValue(e, r);
      }, d.useDeferredValue = function(e, r) {
        return b().useDeferredValue(e, r);
      }, d.useEffect = function(e, r) {
        return b().useEffect(e, r);
      }, d.useId = function() {
        return b().useId();
      }, d.useImperativeHandle = function(e, r, o) {
        return b().useImperativeHandle(e, r, o);
      }, d.useInsertionEffect = function(e, r) {
        return b().useInsertionEffect(e, r);
      }, d.useLayoutEffect = function(e, r) {
        return b().useLayoutEffect(e, r);
      }, d.useMemo = function(e, r) {
        return b().useMemo(e, r);
      }, d.useOptimistic = function(e, r) {
        return b().useOptimistic(e, r);
      }, d.useReducer = function(e, r, o) {
        return b().useReducer(e, r, o);
      }, d.useRef = function(e) {
        return b().useRef(e);
      }, d.useState = function(e) {
        return b().useState(e);
      }, d.useSyncExternalStore = function(e, r, o) {
        return b().useSyncExternalStore(
          e,
          r,
          o
        );
      }, d.useTransition = function() {
        return b().useTransition();
      }, d.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }($e, $e.exports)), $e.exports;
}
var ft;
function dt() {
  return ft || (ft = 1, process.env.NODE_ENV === "production" ? ze.exports = Et() : ze.exports = ht()), ze.exports;
}
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ct;
function mt() {
  return ct || (ct = 1, process.env.NODE_ENV !== "production" && function() {
    function S(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === je ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case Z:
          return "Fragment";
        case O:
          return "Portal";
        case me:
          return "Profiler";
        case ie:
          return "StrictMode";
        case re:
          return "Suspense";
        case F:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (typeof t.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), t.$$typeof) {
          case ge:
            return (t.displayName || "Context") + ".Provider";
          case M:
            return (t._context.displayName || "Context") + ".Consumer";
          case fe:
            var a = t.render;
            return t = t.displayName, t || (t = a.displayName || a.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case ce:
            return a = t.displayName || null, a !== null ? a : S(t.type) || "Memo";
          case I:
            a = t._payload, t = t._init;
            try {
              return S(t(a));
            } catch {
            }
        }
      return null;
    }
    function d(t) {
      return "" + t;
    }
    function B(t) {
      try {
        d(t);
        var a = !1;
      } catch {
        a = !0;
      }
      if (a) {
        a = console;
        var i = a.error, _ = typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return i.call(
          a,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          _
        ), d(t);
      }
    }
    function K() {
    }
    function N() {
      if (m === 0) {
        T = console.log, h = console.info, $ = console.warn, A = console.error, le = console.group, ke = console.groupCollapsed, ye = console.groupEnd;
        var t = {
          configurable: !0,
          enumerable: !0,
          value: K,
          writable: !0
        };
        Object.defineProperties(console, {
          info: t,
          log: t,
          warn: t,
          error: t,
          group: t,
          groupCollapsed: t,
          groupEnd: t
        });
      }
      m++;
    }
    function P() {
      if (m--, m === 0) {
        var t = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: u({}, t, { value: T }),
          info: u({}, t, { value: h }),
          warn: u({}, t, { value: $ }),
          error: u({}, t, { value: A }),
          group: u({}, t, { value: le }),
          groupCollapsed: u({}, t, { value: ke }),
          groupEnd: u({}, t, { value: ye })
        });
      }
      0 > m && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function U(t) {
      if (_e === void 0)
        try {
          throw Error();
        } catch (i) {
          var a = i.stack.trim().match(/\n( *(at )?)/);
          _e = a && a[1] || "", we = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + _e + t + we;
    }
    function q(t, a) {
      if (!t || de) return "";
      var i = be.get(t);
      if (i !== void 0) return i;
      de = !0, i = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var _ = null;
      _ = b.H, b.H = null, N();
      try {
        var k = {
          DetermineComponentFrameRoot: function() {
            try {
              if (a) {
                var X = function() {
                  throw Error();
                };
                if (Object.defineProperty(X.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(X, []);
                  } catch (G) {
                    var Te = G;
                  }
                  Reflect.construct(t, [], X);
                } else {
                  try {
                    X.call();
                  } catch (G) {
                    Te = G;
                  }
                  t.call(X.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (G) {
                  Te = G;
                }
                (X = t()) && typeof X.catch == "function" && X.catch(function() {
                });
              }
            } catch (G) {
              if (G && Te && typeof G.stack == "string")
                return [G.stack, Te.stack];
            }
            return [null, null];
          }
        };
        k.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var R = Object.getOwnPropertyDescriptor(
          k.DetermineComponentFrameRoot,
          "name"
        );
        R && R.configurable && Object.defineProperty(
          k.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var g = k.DetermineComponentFrameRoot(), p = g[0], Q = g[1];
        if (p && Q) {
          var x = p.split(`
`), L = Q.split(`
`);
          for (g = R = 0; R < x.length && !x[R].includes(
            "DetermineComponentFrameRoot"
          ); )
            R++;
          for (; g < L.length && !L[g].includes(
            "DetermineComponentFrameRoot"
          ); )
            g++;
          if (R === x.length || g === L.length)
            for (R = x.length - 1, g = L.length - 1; 1 <= R && 0 <= g && x[R] !== L[g]; )
              g--;
          for (; 1 <= R && 0 <= g; R--, g--)
            if (x[R] !== L[g]) {
              if (R !== 1 || g !== 1)
                do
                  if (R--, g--, 0 > g || x[R] !== L[g]) {
                    var pe = `
` + x[R].replace(
                      " at new ",
                      " at "
                    );
                    return t.displayName && pe.includes("<anonymous>") && (pe = pe.replace("<anonymous>", t.displayName)), typeof t == "function" && be.set(t, pe), pe;
                  }
                while (1 <= R && 0 <= g);
              break;
            }
        }
      } finally {
        de = !1, b.H = _, P(), Error.prepareStackTrace = i;
      }
      return x = (x = t ? t.displayName || t.name : "") ? U(x) : "", typeof t == "function" && be.set(t, x), x;
    }
    function ue(t) {
      if (t == null) return "";
      if (typeof t == "function") {
        var a = t.prototype;
        return q(
          t,
          !(!a || !a.isReactComponent)
        );
      }
      if (typeof t == "string") return U(t);
      switch (t) {
        case re:
          return U("Suspense");
        case F:
          return U("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case fe:
            return t = q(t.render, !1), t;
          case ce:
            return ue(t.type);
          case I:
            a = t._payload, t = t._init;
            try {
              return ue(t(a));
            } catch {
            }
        }
      return "";
    }
    function D() {
      var t = b.A;
      return t === null ? null : t.getOwner();
    }
    function z(t) {
      if (n.call(t, "key")) {
        var a = Object.getOwnPropertyDescriptor(t, "key").get;
        if (a && a.isReactWarning) return !1;
      }
      return t.key !== void 0;
    }
    function Ee(t, a) {
      function i() {
        ve || (ve = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          a
        ));
      }
      i.isReactWarning = !0, Object.defineProperty(t, "key", {
        get: i,
        configurable: !0
      });
    }
    function Ae() {
      var t = S(this.type);
      return Ye[t] || (Ye[t] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), t = this.props.ref, t !== void 0 ? t : null;
    }
    function Se(t, a, i, _, k, R) {
      return i = R.ref, t = {
        $$typeof: ae,
        type: t,
        key: a,
        props: R,
        _owner: k
      }, (i !== void 0 ? i : null) !== null ? Object.defineProperty(t, "ref", {
        enumerable: !1,
        get: Ae
      }) : Object.defineProperty(t, "ref", { enumerable: !1, value: null }), t._store = {}, Object.defineProperty(t._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(t, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
    }
    function he(t, a, i, _, k, R) {
      if (typeof t == "string" || typeof t == "function" || t === Z || t === me || t === ie || t === re || t === F || t === W || typeof t == "object" && t !== null && (t.$$typeof === I || t.$$typeof === ce || t.$$typeof === ge || t.$$typeof === M || t.$$typeof === fe || t.$$typeof === E || t.getModuleId !== void 0)) {
        var g = a.children;
        if (g !== void 0)
          if (_)
            if (v(g)) {
              for (_ = 0; _ < g.length; _++)
                V(g[_], t);
              Object.freeze && Object.freeze(g);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else V(g, t);
      } else
        g = "", (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), t === null ? _ = "null" : v(t) ? _ = "array" : t !== void 0 && t.$$typeof === ae ? (_ = "<" + (S(t.type) || "Unknown") + " />", g = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof t, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          _,
          g
        );
      if (n.call(a, "key")) {
        g = S(t);
        var p = Object.keys(a).filter(function(x) {
          return x !== "key";
        });
        _ = 0 < p.length ? "{key: someKey, " + p.join(": ..., ") + ": ...}" : "{key: someKey}", Ne[g + _] || (p = 0 < p.length ? "{" + p.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          _,
          g,
          p,
          g
        ), Ne[g + _] = !0);
      }
      if (g = null, i !== void 0 && (B(i), g = "" + i), z(a) && (B(a.key), g = "" + a.key), "key" in a) {
        i = {};
        for (var Q in a)
          Q !== "key" && (i[Q] = a[Q]);
      } else i = a;
      return g && Ee(
        i,
        typeof t == "function" ? t.displayName || t.name || "Unknown" : t
      ), Se(t, g, R, k, D(), i);
    }
    function V(t, a) {
      if (typeof t == "object" && t && t.$$typeof !== Ce) {
        if (v(t))
          for (var i = 0; i < t.length; i++) {
            var _ = t[i];
            H(_) && te(_, a);
          }
        else if (H(t))
          t._store && (t._store.validated = 1);
        else if (t === null || typeof t != "object" ? i = null : (i = ne && t[ne] || t["@@iterator"], i = typeof i == "function" ? i : null), typeof i == "function" && i !== t.entries && (i = i.call(t), i !== t))
          for (; !(t = i.next()).done; )
            H(t.value) && te(t.value, a);
      }
    }
    function H(t) {
      return typeof t == "object" && t !== null && t.$$typeof === ae;
    }
    function te(t, a) {
      if (t._store && !t._store.validated && t.key == null && (t._store.validated = 1, a = J(a), !Pe[a])) {
        Pe[a] = !0;
        var i = "";
        t && t._owner != null && t._owner !== D() && (i = null, typeof t._owner.tag == "number" ? i = S(t._owner.type) : typeof t._owner.name == "string" && (i = t._owner.name), i = " It was passed a child from " + i + ".");
        var _ = b.getCurrentStack;
        b.getCurrentStack = function() {
          var k = ue(t.type);
          return _ && (k += _() || ""), k;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          a,
          i
        ), b.getCurrentStack = _;
      }
    }
    function J(t) {
      var a = "", i = D();
      return i && (i = S(i.type)) && (a = `

Check the render method of \`` + i + "`."), a || (t = S(t)) && (a = `

Check the top-level render call using <` + t + ">."), a;
    }
    var se = dt(), ae = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), ie = Symbol.for("react.strict_mode"), me = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), ge = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), ne = Symbol.iterator, je = Symbol.for("react.client.reference"), b = se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, n = Object.prototype.hasOwnProperty, u = Object.assign, E = Symbol.for("react.client.reference"), v = Array.isArray, m = 0, T, h, $, A, le, ke, ye;
    K.__reactDisabledLog = !0;
    var _e, we, de = !1, be = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ce = Symbol.for("react.client.reference"), ve, Ye = {}, Ne = {}, Pe = {};
    Me.Fragment = Z, Me.jsx = function(t, a, i, _, k) {
      return he(t, a, i, !1, _, k);
    }, Me.jsxs = function(t, a, i, _, k) {
      return he(t, a, i, !0, _, k);
    };
  }()), Me;
}
var lt;
function gt() {
  return lt || (lt = 1, process.env.NODE_ENV === "production" ? qe.exports = pt() : qe.exports = mt()), qe.exports;
}
var Oe = gt(), yt = dt();
const _t = () => {
  const [S, d] = yt.useState(0), B = () => {
    d(S + 1);
  }, K = () => {
    d(S - 1);
  }, N = () => {
    d(0);
  };
  return /* @__PURE__ */ Oe.jsxs("div", { children: [
    /* @__PURE__ */ Oe.jsx("h1", { children: "カウンター" }),
    /* @__PURE__ */ Oe.jsx("div", { children: S }),
    /* @__PURE__ */ Oe.jsxs("div", { children: [
      /* @__PURE__ */ Oe.jsx("button", { onClick: K, children: "減少 (-)" }),
      /* @__PURE__ */ Oe.jsx("button", { onClick: N, children: "リセット" }),
      /* @__PURE__ */ Oe.jsx("button", { onClick: B, children: "増加 (+)" })
    ] })
  ] });
};
export {
  _t as default
};
