var Qh = Object.defineProperty;
var Zh = (u, s, o) => s in u ? Qh(u, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : u[s] = o;
var qe = (u, s, o) => Zh(u, typeof s != "symbol" ? s + "" : s, o);
function Yc(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var yc = { exports: {} }, rr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var i1;
function Kh() {
  if (i1) return rr;
  i1 = 1;
  var u = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(c, f, m) {
    var x = null;
    if (m !== void 0 && (x = "" + m), f.key !== void 0 && (x = "" + f.key), "key" in f) {
      m = {};
      for (var p in f)
        p !== "key" && (m[p] = f[p]);
    } else m = f;
    return f = m.ref, {
      $$typeof: u,
      type: c,
      key: x,
      ref: f !== void 0 ? f : null,
      props: m
    };
  }
  return rr.Fragment = s, rr.jsx = o, rr.jsxs = o, rr;
}
var o1;
function Jh() {
  return o1 || (o1 = 1, yc.exports = Kh()), yc.exports;
}
var r = Jh(), vc = { exports: {} }, ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var c1;
function Wh() {
  if (c1) return ue;
  c1 = 1;
  var u = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), x = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), R = Symbol.iterator;
  function q(C) {
    return C === null || typeof C != "object" ? null : (C = R && C[R] || C["@@iterator"], typeof C == "function" ? C : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, G = Object.assign, K = {};
  function $(C, L, Z) {
    this.props = C, this.context = L, this.refs = K, this.updater = Z || _;
  }
  $.prototype.isReactComponent = {}, $.prototype.setState = function(C, L) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, L, "setState");
  }, $.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function W() {
  }
  W.prototype = $.prototype;
  function P(C, L, Z) {
    this.props = C, this.context = L, this.refs = K, this.updater = Z || _;
  }
  var xe = P.prototype = new W();
  xe.constructor = P, G(xe, $.prototype), xe.isPureReactComponent = !0;
  var te = Array.isArray;
  function X() {
  }
  var Y = { H: null, A: null, T: null, S: null }, ce = Object.prototype.hasOwnProperty;
  function Se(C, L, Z) {
    var M = Z.ref;
    return {
      $$typeof: u,
      type: C,
      key: L,
      ref: M !== void 0 ? M : null,
      props: Z
    };
  }
  function he(C, L) {
    return Se(C.type, L, C.props);
  }
  function U(C) {
    return typeof C == "object" && C !== null && C.$$typeof === u;
  }
  function ee(C) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(Z) {
      return L[Z];
    });
  }
  var de = /\/+/g;
  function Ne(C, L) {
    return typeof C == "object" && C !== null && C.key != null ? ee("" + C.key) : L.toString(36);
  }
  function se(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then(X, X) : (C.status = "pending", C.then(
          function(L) {
            C.status === "pending" && (C.status = "fulfilled", C.value = L);
          },
          function(L) {
            C.status === "pending" && (C.status = "rejected", C.reason = L);
          }
        )), C.status) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function z(C, L, Z, M, H) {
    var Q = typeof C;
    (Q === "undefined" || Q === "boolean") && (C = null);
    var oe = !1;
    if (C === null) oe = !0;
    else
      switch (Q) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case u:
            case s:
              oe = !0;
              break;
            case S:
              return oe = C._init, z(
                oe(C._payload),
                L,
                Z,
                M,
                H
              );
          }
      }
    if (oe)
      return H = H(C), oe = M === "" ? "." + Ne(C, 0) : M, te(H) ? (Z = "", oe != null && (Z = oe.replace(de, "$&/") + "/"), z(H, L, Z, "", function(Qn) {
        return Qn;
      })) : H != null && (U(H) && (H = he(
        H,
        Z + (H.key == null || C && C.key === H.key ? "" : ("" + H.key).replace(
          de,
          "$&/"
        ) + "/") + oe
      )), L.push(H)), 1;
    oe = 0;
    var Re = M === "" ? "." : M + ":";
    if (te(C))
      for (var we = 0; we < C.length; we++)
        M = C[we], Q = Re + Ne(M, we), oe += z(
          M,
          L,
          Z,
          Q,
          H
        );
    else if (we = q(C), typeof we == "function")
      for (C = we.call(C), we = 0; !(M = C.next()).done; )
        M = M.value, Q = Re + Ne(M, we++), oe += z(
          M,
          L,
          Z,
          Q,
          H
        );
    else if (Q === "object") {
      if (typeof C.then == "function")
        return z(
          se(C),
          L,
          Z,
          M,
          H
        );
      throw L = String(C), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return oe;
  }
  function V(C, L, Z) {
    if (C == null) return C;
    var M = [], H = 0;
    return z(C, M, "", "", function(Q) {
      return L.call(Z, Q, H++);
    }), M;
  }
  function ne(C) {
    if (C._status === -1) {
      var L = C._result;
      L = L(), L.then(
        function(Z) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = Z);
        },
        function(Z) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = Z);
        }
      ), C._status === -1 && (C._status = 0, C._result = L);
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ie = typeof reportError == "function" ? reportError : function(C) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof C == "object" && C !== null && typeof C.message == "string" ? String(C.message) : String(C),
        error: C
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", C);
      return;
    }
    console.error(C);
  }, je = {
    map: V,
    forEach: function(C, L, Z) {
      V(
        C,
        function() {
          L.apply(this, arguments);
        },
        Z
      );
    },
    count: function(C) {
      var L = 0;
      return V(C, function() {
        L++;
      }), L;
    },
    toArray: function(C) {
      return V(C, function(L) {
        return L;
      }) || [];
    },
    only: function(C) {
      if (!U(C))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return C;
    }
  };
  return ue.Activity = v, ue.Children = je, ue.Component = $, ue.Fragment = o, ue.Profiler = f, ue.PureComponent = P, ue.StrictMode = c, ue.Suspense = g, ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(C) {
      return Y.H.useMemoCache(C);
    }
  }, ue.cache = function(C) {
    return function() {
      return C.apply(null, arguments);
    };
  }, ue.cacheSignal = function() {
    return null;
  }, ue.cloneElement = function(C, L, Z) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var M = G({}, C.props), H = C.key;
    if (L != null)
      for (Q in L.key !== void 0 && (H = "" + L.key), L)
        !ce.call(L, Q) || Q === "key" || Q === "__self" || Q === "__source" || Q === "ref" && L.ref === void 0 || (M[Q] = L[Q]);
    var Q = arguments.length - 2;
    if (Q === 1) M.children = Z;
    else if (1 < Q) {
      for (var oe = Array(Q), Re = 0; Re < Q; Re++)
        oe[Re] = arguments[Re + 2];
      M.children = oe;
    }
    return Se(C.type, H, M);
  }, ue.createContext = function(C) {
    return C = {
      $$typeof: x,
      _currentValue: C,
      _currentValue2: C,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, C.Provider = C, C.Consumer = {
      $$typeof: m,
      _context: C
    }, C;
  }, ue.createElement = function(C, L, Z) {
    var M, H = {}, Q = null;
    if (L != null)
      for (M in L.key !== void 0 && (Q = "" + L.key), L)
        ce.call(L, M) && M !== "key" && M !== "__self" && M !== "__source" && (H[M] = L[M]);
    var oe = arguments.length - 2;
    if (oe === 1) H.children = Z;
    else if (1 < oe) {
      for (var Re = Array(oe), we = 0; we < oe; we++)
        Re[we] = arguments[we + 2];
      H.children = Re;
    }
    if (C && C.defaultProps)
      for (M in oe = C.defaultProps, oe)
        H[M] === void 0 && (H[M] = oe[M]);
    return Se(C, Q, H);
  }, ue.createRef = function() {
    return { current: null };
  }, ue.forwardRef = function(C) {
    return { $$typeof: p, render: C };
  }, ue.isValidElement = U, ue.lazy = function(C) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: C },
      _init: ne
    };
  }, ue.memo = function(C, L) {
    return {
      $$typeof: b,
      type: C,
      compare: L === void 0 ? null : L
    };
  }, ue.startTransition = function(C) {
    var L = Y.T, Z = {};
    Y.T = Z;
    try {
      var M = C(), H = Y.S;
      H !== null && H(Z, M), typeof M == "object" && M !== null && typeof M.then == "function" && M.then(X, ie);
    } catch (Q) {
      ie(Q);
    } finally {
      L !== null && Z.types !== null && (L.types = Z.types), Y.T = L;
    }
  }, ue.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, ue.use = function(C) {
    return Y.H.use(C);
  }, ue.useActionState = function(C, L, Z) {
    return Y.H.useActionState(C, L, Z);
  }, ue.useCallback = function(C, L) {
    return Y.H.useCallback(C, L);
  }, ue.useContext = function(C) {
    return Y.H.useContext(C);
  }, ue.useDebugValue = function() {
  }, ue.useDeferredValue = function(C, L) {
    return Y.H.useDeferredValue(C, L);
  }, ue.useEffect = function(C, L) {
    return Y.H.useEffect(C, L);
  }, ue.useEffectEvent = function(C) {
    return Y.H.useEffectEvent(C);
  }, ue.useId = function() {
    return Y.H.useId();
  }, ue.useImperativeHandle = function(C, L, Z) {
    return Y.H.useImperativeHandle(C, L, Z);
  }, ue.useInsertionEffect = function(C, L) {
    return Y.H.useInsertionEffect(C, L);
  }, ue.useLayoutEffect = function(C, L) {
    return Y.H.useLayoutEffect(C, L);
  }, ue.useMemo = function(C, L) {
    return Y.H.useMemo(C, L);
  }, ue.useOptimistic = function(C, L) {
    return Y.H.useOptimistic(C, L);
  }, ue.useReducer = function(C, L, Z) {
    return Y.H.useReducer(C, L, Z);
  }, ue.useRef = function(C) {
    return Y.H.useRef(C);
  }, ue.useState = function(C) {
    return Y.H.useState(C);
  }, ue.useSyncExternalStore = function(C, L, Z) {
    return Y.H.useSyncExternalStore(
      C,
      L,
      Z
    );
  }, ue.useTransition = function() {
    return Y.H.useTransition();
  }, ue.version = "19.2.3", ue;
}
var u1;
function $c() {
  return u1 || (u1 = 1, vc.exports = Wh()), vc.exports;
}
var A = $c();
const Fh = /* @__PURE__ */ Yc(A);
var Sc = { exports: {} }, sr = {}, jc = { exports: {} }, Cc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var d1;
function Ih() {
  return d1 || (d1 = 1, (function(u) {
    function s(z, V) {
      var ne = z.length;
      z.push(V);
      e: for (; 0 < ne; ) {
        var ie = ne - 1 >>> 1, je = z[ie];
        if (0 < f(je, V))
          z[ie] = V, z[ne] = je, ne = ie;
        else break e;
      }
    }
    function o(z) {
      return z.length === 0 ? null : z[0];
    }
    function c(z) {
      if (z.length === 0) return null;
      var V = z[0], ne = z.pop();
      if (ne !== V) {
        z[0] = ne;
        e: for (var ie = 0, je = z.length, C = je >>> 1; ie < C; ) {
          var L = 2 * (ie + 1) - 1, Z = z[L], M = L + 1, H = z[M];
          if (0 > f(Z, ne))
            M < je && 0 > f(H, Z) ? (z[ie] = H, z[M] = ne, ie = M) : (z[ie] = Z, z[L] = ne, ie = L);
          else if (M < je && 0 > f(H, ne))
            z[ie] = H, z[M] = ne, ie = M;
          else break e;
        }
      }
      return V;
    }
    function f(z, V) {
      var ne = z.sortIndex - V.sortIndex;
      return ne !== 0 ? ne : z.id - V.id;
    }
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      u.unstable_now = function() {
        return m.now();
      };
    } else {
      var x = Date, p = x.now();
      u.unstable_now = function() {
        return x.now() - p;
      };
    }
    var g = [], b = [], S = 1, v = null, R = 3, q = !1, _ = !1, G = !1, K = !1, $ = typeof setTimeout == "function" ? setTimeout : null, W = typeof clearTimeout == "function" ? clearTimeout : null, P = typeof setImmediate < "u" ? setImmediate : null;
    function xe(z) {
      for (var V = o(b); V !== null; ) {
        if (V.callback === null) c(b);
        else if (V.startTime <= z)
          c(b), V.sortIndex = V.expirationTime, s(g, V);
        else break;
        V = o(b);
      }
    }
    function te(z) {
      if (G = !1, xe(z), !_)
        if (o(g) !== null)
          _ = !0, X || (X = !0, ee());
        else {
          var V = o(b);
          V !== null && se(te, V.startTime - z);
        }
    }
    var X = !1, Y = -1, ce = 5, Se = -1;
    function he() {
      return K ? !0 : !(u.unstable_now() - Se < ce);
    }
    function U() {
      if (K = !1, X) {
        var z = u.unstable_now();
        Se = z;
        var V = !0;
        try {
          e: {
            _ = !1, G && (G = !1, W(Y), Y = -1), q = !0;
            var ne = R;
            try {
              t: {
                for (xe(z), v = o(g); v !== null && !(v.expirationTime > z && he()); ) {
                  var ie = v.callback;
                  if (typeof ie == "function") {
                    v.callback = null, R = v.priorityLevel;
                    var je = ie(
                      v.expirationTime <= z
                    );
                    if (z = u.unstable_now(), typeof je == "function") {
                      v.callback = je, xe(z), V = !0;
                      break t;
                    }
                    v === o(g) && c(g), xe(z);
                  } else c(g);
                  v = o(g);
                }
                if (v !== null) V = !0;
                else {
                  var C = o(b);
                  C !== null && se(
                    te,
                    C.startTime - z
                  ), V = !1;
                }
              }
              break e;
            } finally {
              v = null, R = ne, q = !1;
            }
            V = void 0;
          }
        } finally {
          V ? ee() : X = !1;
        }
      }
    }
    var ee;
    if (typeof P == "function")
      ee = function() {
        P(U);
      };
    else if (typeof MessageChannel < "u") {
      var de = new MessageChannel(), Ne = de.port2;
      de.port1.onmessage = U, ee = function() {
        Ne.postMessage(null);
      };
    } else
      ee = function() {
        $(U, 0);
      };
    function se(z, V) {
      Y = $(function() {
        z(u.unstable_now());
      }, V);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, u.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ce = 0 < z ? Math.floor(1e3 / z) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, u.unstable_next = function(z) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = R;
      }
      var ne = R;
      R = V;
      try {
        return z();
      } finally {
        R = ne;
      }
    }, u.unstable_requestPaint = function() {
      K = !0;
    }, u.unstable_runWithPriority = function(z, V) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var ne = R;
      R = z;
      try {
        return V();
      } finally {
        R = ne;
      }
    }, u.unstable_scheduleCallback = function(z, V, ne) {
      var ie = u.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? ie + ne : ie) : ne = ie, z) {
        case 1:
          var je = -1;
          break;
        case 2:
          je = 250;
          break;
        case 5:
          je = 1073741823;
          break;
        case 4:
          je = 1e4;
          break;
        default:
          je = 5e3;
      }
      return je = ne + je, z = {
        id: S++,
        callback: V,
        priorityLevel: z,
        startTime: ne,
        expirationTime: je,
        sortIndex: -1
      }, ne > ie ? (z.sortIndex = ne, s(b, z), o(g) === null && z === o(b) && (G ? (W(Y), Y = -1) : G = !0, se(te, ne - ie))) : (z.sortIndex = je, s(g, z), _ || q || (_ = !0, X || (X = !0, ee()))), z;
    }, u.unstable_shouldYield = he, u.unstable_wrapCallback = function(z) {
      var V = R;
      return function() {
        var ne = R;
        R = V;
        try {
          return z.apply(this, arguments);
        } finally {
          R = ne;
        }
      };
    };
  })(Cc)), Cc;
}
var f1;
function Ph() {
  return f1 || (f1 = 1, jc.exports = Ih()), jc.exports;
}
var Nc = { exports: {} }, rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var m1;
function e4() {
  if (m1) return rt;
  m1 = 1;
  var u = $c();
  function s(g) {
    var b = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        b += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + g + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var c = {
    d: {
      f: o,
      r: function() {
        throw Error(s(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal");
  function m(g, b, S) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: b,
      implementation: S
    };
  }
  var x = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, b) {
    if (g === "font") return "";
    if (typeof b == "string")
      return b === "use-credentials" ? b : "";
  }
  return rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, rt.createPortal = function(g, b) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!b || b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11)
      throw Error(s(299));
    return m(g, b, null, S);
  }, rt.flushSync = function(g) {
    var b = x.T, S = c.p;
    try {
      if (x.T = null, c.p = 2, g) return g();
    } finally {
      x.T = b, c.p = S, c.d.f();
    }
  }, rt.preconnect = function(g, b) {
    typeof g == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, c.d.C(g, b));
  }, rt.prefetchDNS = function(g) {
    typeof g == "string" && c.d.D(g);
  }, rt.preinit = function(g, b) {
    if (typeof g == "string" && b && typeof b.as == "string") {
      var S = b.as, v = p(S, b.crossOrigin), R = typeof b.integrity == "string" ? b.integrity : void 0, q = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      S === "style" ? c.d.S(
        g,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: v,
          integrity: R,
          fetchPriority: q
        }
      ) : S === "script" && c.d.X(g, {
        crossOrigin: v,
        integrity: R,
        fetchPriority: q,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, rt.preinitModule = function(g, b) {
    if (typeof g == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var S = p(
            b.as,
            b.crossOrigin
          );
          c.d.M(g, {
            crossOrigin: S,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
            nonce: typeof b.nonce == "string" ? b.nonce : void 0
          });
        }
      } else b == null && c.d.M(g);
  }, rt.preload = function(g, b) {
    if (typeof g == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var S = b.as, v = p(S, b.crossOrigin);
      c.d.L(g, S, {
        crossOrigin: v,
        integrity: typeof b.integrity == "string" ? b.integrity : void 0,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0,
        type: typeof b.type == "string" ? b.type : void 0,
        fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
        referrerPolicy: typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
        imageSrcSet: typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
        imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
        media: typeof b.media == "string" ? b.media : void 0
      });
    }
  }, rt.preloadModule = function(g, b) {
    if (typeof g == "string")
      if (b) {
        var S = p(b.as, b.crossOrigin);
        c.d.m(g, {
          as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
          crossOrigin: S,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0
        });
      } else c.d.m(g);
  }, rt.requestFormReset = function(g) {
    c.d.r(g);
  }, rt.unstable_batchedUpdates = function(g, b) {
    return g(b);
  }, rt.useFormState = function(g, b, S) {
    return x.H.useFormState(g, b, S);
  }, rt.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, rt.version = "19.2.3", rt;
}
var h1;
function V1() {
  if (h1) return Nc.exports;
  h1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (s) {
        console.error(s);
      }
  }
  return u(), Nc.exports = e4(), Nc.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var g1;
function t4() {
  if (g1) return sr;
  g1 = 1;
  var u = Ph(), s = $c(), o = V1();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function m(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function x(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (m(e) !== e)
      throw Error(c(188));
  }
  function b(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var i = a.alternate;
      if (i === null) {
        if (l = a.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === i.child) {
        for (i = a.child; i; ) {
          if (i === n) return g(a), e;
          if (i === l) return g(a), t;
          i = i.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== l.return) n = a, l = i;
      else {
        for (var d = !1, h = a.child; h; ) {
          if (h === n) {
            d = !0, n = a, l = i;
            break;
          }
          if (h === l) {
            d = !0, l = a, n = i;
            break;
          }
          h = h.sibling;
        }
        if (!d) {
          for (h = i.child; h; ) {
            if (h === n) {
              d = !0, n = i, l = a;
              break;
            }
            if (h === l) {
              d = !0, l = i, n = a;
              break;
            }
            h = h.sibling;
          }
          if (!d) throw Error(c(189));
        }
      }
      if (n.alternate !== l) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function S(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = S(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, R = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), G = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), W = Symbol.for("react.consumer"), P = Symbol.for("react.context"), xe = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), ce = Symbol.for("react.lazy"), Se = Symbol.for("react.activity"), he = Symbol.for("react.memo_cache_sentinel"), U = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object" ? null : (e = U && e[U] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var de = Symbol.for("react.client.reference");
  function Ne(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === de ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case G:
        return "Fragment";
      case $:
        return "Profiler";
      case K:
        return "StrictMode";
      case te:
        return "Suspense";
      case X:
        return "SuspenseList";
      case Se:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return "Portal";
        case P:
          return e.displayName || "Context";
        case W:
          return (e._context.displayName || "Context") + ".Consumer";
        case xe:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Y:
          return t = e.displayName || null, t !== null ? t : Ne(e.type) || "Memo";
        case ce:
          t = e._payload, e = e._init;
          try {
            return Ne(e(t));
          } catch {
          }
      }
    return null;
  }
  var se = Array.isArray, z = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ie = [], je = -1;
  function C(e) {
    return { current: e };
  }
  function L(e) {
    0 > je || (e.current = ie[je], ie[je] = null, je--);
  }
  function Z(e, t) {
    je++, ie[je] = e.current, e.current = t;
  }
  var M = C(null), H = C(null), Q = C(null), oe = C(null);
  function Re(e, t) {
    switch (Z(Q, t), Z(H, e), Z(M, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? z0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = z0(t), e = A0(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    L(M), Z(M, e);
  }
  function we() {
    L(M), L(H), L(Q);
  }
  function Qn(e) {
    e.memoizedState !== null && Z(oe, e);
    var t = M.current, n = A0(t, e.type);
    t !== n && (Z(H, e), Z(M, n));
  }
  function pr(e) {
    H.current === e && (L(M), L(H)), oe.current === e && (L(oe), tr._currentValue = ne);
  }
  var ei, ru;
  function Zn(e) {
    if (ei === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ei = t && t[1] || "", ru = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ei + e + ru;
  }
  var ti = !1;
  function ni(e, t) {
    if (!e || ti) return "";
    ti = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var B = function() {
                throw Error();
              };
              if (Object.defineProperty(B.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(B, []);
                } catch (k) {
                  var w = k;
                }
                Reflect.construct(e, [], B);
              } else {
                try {
                  B.call();
                } catch (k) {
                  w = k;
                }
                e.call(B.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (k) {
                w = k;
              }
              (B = e()) && typeof B.catch == "function" && B.catch(function() {
              });
            }
          } catch (k) {
            if (k && w && typeof k.stack == "string")
              return [k.stack, w.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var i = l.DetermineComponentFrameRoot(), d = i[0], h = i[1];
      if (d && h) {
        var y = d.split(`
`), T = h.split(`
`);
        for (a = l = 0; l < y.length && !y[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; a < T.length && !T[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (l === y.length || a === T.length)
          for (l = y.length - 1, a = T.length - 1; 1 <= l && 0 <= a && y[l] !== T[a]; )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (y[l] !== T[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || y[l] !== T[a]) {
                  var O = `
` + y[l].replace(" at new ", " at ");
                  return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), O;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      ti = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Zn(n) : "";
  }
  function Cm(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Zn(e.type);
      case 16:
        return Zn("Lazy");
      case 13:
        return e.child !== t && t !== null ? Zn("Suspense Fallback") : Zn("Suspense");
      case 19:
        return Zn("SuspenseList");
      case 0:
      case 15:
        return ni(e.type, !1);
      case 11:
        return ni(e.type.render, !1);
      case 1:
        return ni(e.type, !0);
      case 31:
        return Zn("Activity");
      default:
        return "";
    }
  }
  function su(e) {
    try {
      var t = "", n = null;
      do
        t += Cm(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var li = Object.prototype.hasOwnProperty, ai = u.unstable_scheduleCallback, ri = u.unstable_cancelCallback, Nm = u.unstable_shouldYield, Em = u.unstable_requestPaint, xt = u.unstable_now, Tm = u.unstable_getCurrentPriorityLevel, iu = u.unstable_ImmediatePriority, ou = u.unstable_UserBlockingPriority, xr = u.unstable_NormalPriority, wm = u.unstable_LowPriority, cu = u.unstable_IdlePriority, _m = u.log, km = u.unstable_setDisableYieldValue, ma = null, bt = null;
  function xn(e) {
    if (typeof _m == "function" && km(e), bt && typeof bt.setStrictMode == "function")
      try {
        bt.setStrictMode(ma, e);
      } catch {
      }
  }
  var yt = Math.clz32 ? Math.clz32 : Mm, zm = Math.log, Am = Math.LN2;
  function Mm(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (zm(e) / Am | 0) | 0;
  }
  var br = 256, yr = 262144, vr = 4194304;
  function Kn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Sr(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0, i = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var h = l & 134217727;
    return h !== 0 ? (l = h & ~i, l !== 0 ? a = Kn(l) : (d &= h, d !== 0 ? a = Kn(d) : n || (n = h & ~e, n !== 0 && (a = Kn(n))))) : (h = l & ~i, h !== 0 ? a = Kn(h) : d !== 0 ? a = Kn(d) : n || (n = l & ~e, n !== 0 && (a = Kn(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & i) === 0 && (i = a & -a, n = t & -t, i >= n || i === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function ha(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Om(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function uu() {
    var e = vr;
    return vr <<= 1, (vr & 62914560) === 0 && (vr = 4194304), e;
  }
  function si(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function ga(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Rm(e, t, n, l, a, i) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var h = e.entanglements, y = e.expirationTimes, T = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var O = 31 - yt(n), B = 1 << O;
      h[O] = 0, y[O] = -1;
      var w = T[O];
      if (w !== null)
        for (T[O] = null, O = 0; O < w.length; O++) {
          var k = w[O];
          k !== null && (k.lane &= -536870913);
        }
      n &= ~B;
    }
    l !== 0 && du(e, l, 0), i !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(d & ~t));
  }
  function du(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - yt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function fu(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - yt(n), a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), n &= ~a;
    }
  }
  function mu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : ii(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function ii(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function oi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function hu() {
    var e = V.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : e1(e.type));
  }
  function gu(e, t) {
    var n = V.p;
    try {
      return V.p = e, t();
    } finally {
      V.p = n;
    }
  }
  var bn = Math.random().toString(36).slice(2), Pe = "__reactFiber$" + bn, ot = "__reactProps$" + bn, yl = "__reactContainer$" + bn, ci = "__reactEvents$" + bn, Dm = "__reactListeners$" + bn, Um = "__reactHandles$" + bn, pu = "__reactResources$" + bn, pa = "__reactMarker$" + bn;
  function ui(e) {
    delete e[Pe], delete e[ot], delete e[ci], delete e[Dm], delete e[Um];
  }
  function vl(e) {
    var t = e[Pe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[yl] || n[Pe]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = B0(e); e !== null; ) {
            if (n = e[Pe]) return n;
            e = B0(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Sl(e) {
    if (e = e[Pe] || e[yl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function xa(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function jl(e) {
    var t = e[pu];
    return t || (t = e[pu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fe(e) {
    e[pa] = !0;
  }
  var xu = /* @__PURE__ */ new Set(), bu = {};
  function Jn(e, t) {
    Cl(e, t), Cl(e + "Capture", t);
  }
  function Cl(e, t) {
    for (bu[e] = t, e = 0; e < t.length; e++)
      xu.add(t[e]);
  }
  var Lm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yu = {}, vu = {};
  function Bm(e) {
    return li.call(vu, e) ? !0 : li.call(yu, e) ? !1 : Lm.test(e) ? vu[e] = !0 : (yu[e] = !0, !1);
  }
  function jr(e, t, n) {
    if (Bm(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Cr(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Jt(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  function kt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Su(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Hm(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var a = l.get, i = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(d) {
          n = "" + d, i.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(d) {
          n = "" + d;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function di(e) {
    if (!e._valueTracker) {
      var t = Su(e) ? "checked" : "value";
      e._valueTracker = Hm(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function ju(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = Su(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Nr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var qm = /[\n"\\]/g;
  function zt(e) {
    return e.replace(
      qm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function fi(e, t, n, l, a, i, d, h) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + kt(t)) : e.value !== "" + kt(t) && (e.value = "" + kt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? mi(e, d, kt(t)) : n != null ? mi(e, d, kt(n)) : l != null && e.removeAttribute("value"), a == null && i != null && (e.defaultChecked = !!i), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + kt(h) : e.removeAttribute("name");
  }
  function Cu(e, t, n, l, a, i, d, h) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        di(e);
        return;
      }
      n = n != null ? "" + kt(n) : "", t = t != null ? "" + kt(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = h ? e.checked : !!l, e.defaultChecked = !!l, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), di(e);
  }
  function mi(e, t, n) {
    t === "number" && Nr(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Nl(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++)
        t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + kt(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Nu(e, t, n) {
    if (t != null && (t = "" + kt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + kt(n) : "";
  }
  function Eu(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(c(92));
        if (se(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = kt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), di(e);
  }
  function El(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Gm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Tu(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Gm.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function wu(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var a in t)
        l = t[a], t.hasOwnProperty(a) && n[a] !== l && Tu(e, a, l);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && Tu(e, i, t[i]);
  }
  function hi(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ym = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), $m = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Er(e) {
    return $m.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Wt() {
  }
  var gi = null;
  function pi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Tl = null, wl = null;
  function _u(e) {
    var t = Sl(e);
    if (t && (e = t.stateNode)) {
      var n = e[ot] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (fi(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + zt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var a = l[ot] || null;
                if (!a) throw Error(c(90));
                fi(
                  l,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              l = n[t], l.form === e.form && ju(l);
          }
          break e;
        case "textarea":
          Nu(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Nl(e, !!n.multiple, t, !1);
      }
    }
  }
  var xi = !1;
  function ku(e, t, n) {
    if (xi) return e(t, n);
    xi = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (xi = !1, (Tl !== null || wl !== null) && (fs(), Tl && (t = Tl, e = wl, wl = Tl = null, _u(t), e)))
        for (t = 0; t < e.length; t++) _u(e[t]);
    }
  }
  function ba(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[ot] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        c(231, t, typeof n)
      );
    return n;
  }
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bi = !1;
  if (Ft)
    try {
      var ya = {};
      Object.defineProperty(ya, "passive", {
        get: function() {
          bi = !0;
        }
      }), window.addEventListener("test", ya, ya), window.removeEventListener("test", ya, ya);
    } catch {
      bi = !1;
    }
  var yn = null, yi = null, Tr = null;
  function zu() {
    if (Tr) return Tr;
    var e, t = yi, n = t.length, l, a = "value" in yn ? yn.value : yn.textContent, i = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var d = n - e;
    for (l = 1; l <= d && t[n - l] === a[i - l]; l++) ;
    return Tr = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function wr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function _r() {
    return !0;
  }
  function Au() {
    return !1;
  }
  function ct(e) {
    function t(n, l, a, i, d) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = i, this.target = d, this.currentTarget = null;
      for (var h in e)
        e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(i) : i[h]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? _r : Au, this.isPropagationStopped = Au, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = _r);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = _r);
      },
      persist: function() {
      },
      isPersistent: _r
    }), t;
  }
  var Wn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kr = ct(Wn), va = v({}, Wn, { view: 0, detail: 0 }), Vm = ct(va), vi, Si, Sa, zr = v({}, va, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ci,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Sa && (Sa && e.type === "mousemove" ? (vi = e.screenX - Sa.screenX, Si = e.screenY - Sa.screenY) : Si = vi = 0, Sa = e), vi);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Si;
    }
  }), Mu = ct(zr), Xm = v({}, zr, { dataTransfer: 0 }), Qm = ct(Xm), Zm = v({}, va, { relatedTarget: 0 }), ji = ct(Zm), Km = v({}, Wn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jm = ct(Km), Wm = v({}, Wn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Fm = ct(Wm), Im = v({}, Wn, { data: 0 }), Ou = ct(Im), Pm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, e2 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, t2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function n2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = t2[e]) ? !!t[e] : !1;
  }
  function Ci() {
    return n2;
  }
  var l2 = v({}, va, {
    key: function(e) {
      if (e.key) {
        var t = Pm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = wr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? e2[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ci,
    charCode: function(e) {
      return e.type === "keypress" ? wr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? wr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), a2 = ct(l2), r2 = v({}, zr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Ru = ct(r2), s2 = v({}, va, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ci
  }), i2 = ct(s2), o2 = v({}, Wn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), c2 = ct(o2), u2 = v({}, zr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), d2 = ct(u2), f2 = v({}, Wn, {
    newState: 0,
    oldState: 0
  }), m2 = ct(f2), h2 = [9, 13, 27, 32], Ni = Ft && "CompositionEvent" in window, ja = null;
  Ft && "documentMode" in document && (ja = document.documentMode);
  var g2 = Ft && "TextEvent" in window && !ja, Du = Ft && (!Ni || ja && 8 < ja && 11 >= ja), Uu = " ", Lu = !1;
  function Bu(e, t) {
    switch (e) {
      case "keyup":
        return h2.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Hu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var _l = !1;
  function p2(e, t) {
    switch (e) {
      case "compositionend":
        return Hu(t);
      case "keypress":
        return t.which !== 32 ? null : (Lu = !0, Uu);
      case "textInput":
        return e = t.data, e === Uu && Lu ? null : e;
      default:
        return null;
    }
  }
  function x2(e, t) {
    if (_l)
      return e === "compositionend" || !Ni && Bu(e, t) ? (e = zu(), Tr = yi = yn = null, _l = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Du && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var b2 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function qu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!b2[e.type] : t === "textarea";
  }
  function Gu(e, t, n, l) {
    Tl ? wl ? wl.push(l) : wl = [l] : Tl = l, t = ys(t, "onChange"), 0 < t.length && (n = new kr(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var Ca = null, Na = null;
  function y2(e) {
    N0(e, 0);
  }
  function Ar(e) {
    var t = xa(e);
    if (ju(t)) return e;
  }
  function Yu(e, t) {
    if (e === "change") return t;
  }
  var $u = !1;
  if (Ft) {
    var Ei;
    if (Ft) {
      var Ti = "oninput" in document;
      if (!Ti) {
        var Vu = document.createElement("div");
        Vu.setAttribute("oninput", "return;"), Ti = typeof Vu.oninput == "function";
      }
      Ei = Ti;
    } else Ei = !1;
    $u = Ei && (!document.documentMode || 9 < document.documentMode);
  }
  function Xu() {
    Ca && (Ca.detachEvent("onpropertychange", Qu), Na = Ca = null);
  }
  function Qu(e) {
    if (e.propertyName === "value" && Ar(Na)) {
      var t = [];
      Gu(
        t,
        Na,
        e,
        pi(e)
      ), ku(y2, t);
    }
  }
  function v2(e, t, n) {
    e === "focusin" ? (Xu(), Ca = t, Na = n, Ca.attachEvent("onpropertychange", Qu)) : e === "focusout" && Xu();
  }
  function S2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ar(Na);
  }
  function j2(e, t) {
    if (e === "click") return Ar(t);
  }
  function C2(e, t) {
    if (e === "input" || e === "change")
      return Ar(t);
  }
  function N2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var vt = typeof Object.is == "function" ? Object.is : N2;
  function Ea(e, t) {
    if (vt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!li.call(t, a) || !vt(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  function Zu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ku(e, t) {
    var n = Zu(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = e + n.textContent.length, e <= t && l >= t)
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Zu(n);
    }
  }
  function Ju(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ju(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Wu(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Nr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Nr(e.document);
    }
    return t;
  }
  function wi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var E2 = Ft && "documentMode" in document && 11 >= document.documentMode, kl = null, _i = null, Ta = null, ki = !1;
  function Fu(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ki || kl == null || kl !== Nr(l) || (l = kl, "selectionStart" in l && wi(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ta && Ea(Ta, l) || (Ta = l, l = ys(_i, "onSelect"), 0 < l.length && (t = new kr(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = kl)));
  }
  function Fn(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var zl = {
    animationend: Fn("Animation", "AnimationEnd"),
    animationiteration: Fn("Animation", "AnimationIteration"),
    animationstart: Fn("Animation", "AnimationStart"),
    transitionrun: Fn("Transition", "TransitionRun"),
    transitionstart: Fn("Transition", "TransitionStart"),
    transitioncancel: Fn("Transition", "TransitionCancel"),
    transitionend: Fn("Transition", "TransitionEnd")
  }, zi = {}, Iu = {};
  Ft && (Iu = document.createElement("div").style, "AnimationEvent" in window || (delete zl.animationend.animation, delete zl.animationiteration.animation, delete zl.animationstart.animation), "TransitionEvent" in window || delete zl.transitionend.transition);
  function In(e) {
    if (zi[e]) return zi[e];
    if (!zl[e]) return e;
    var t = zl[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Iu)
        return zi[e] = t[n];
    return e;
  }
  var Pu = In("animationend"), ed = In("animationiteration"), td = In("animationstart"), T2 = In("transitionrun"), w2 = In("transitionstart"), _2 = In("transitioncancel"), nd = In("transitionend"), ld = /* @__PURE__ */ new Map(), Ai = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ai.push("scrollEnd");
  function Ht(e, t) {
    ld.set(e, t), Jn(t, [e]);
  }
  var Mr = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, At = [], Al = 0, Mi = 0;
  function Or() {
    for (var e = Al, t = Mi = Al = 0; t < e; ) {
      var n = At[t];
      At[t++] = null;
      var l = At[t];
      At[t++] = null;
      var a = At[t];
      At[t++] = null;
      var i = At[t];
      if (At[t++] = null, l !== null && a !== null) {
        var d = l.pending;
        d === null ? a.next = a : (a.next = d.next, d.next = a), l.pending = a;
      }
      i !== 0 && ad(n, a, i);
    }
  }
  function Rr(e, t, n, l) {
    At[Al++] = e, At[Al++] = t, At[Al++] = n, At[Al++] = l, Mi |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Oi(e, t, n, l) {
    return Rr(e, t, n, l), Dr(e);
  }
  function Pn(e, t) {
    return Rr(e, null, null, t), Dr(e);
  }
  function ad(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, i = e.return; i !== null; )
      i.childLanes |= n, l = i.alternate, l !== null && (l.childLanes |= n), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (a = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, a && t !== null && (a = 31 - yt(n), e = i.hiddenUpdates, l = e[a], l === null ? e[a] = [t] : l.push(t), t.lane = n | 536870912), i) : null;
  }
  function Dr(e) {
    if (50 < Ka)
      throw Ka = 0, $o = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ml = {};
  function k2(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function St(e, t, n, l) {
    return new k2(e, t, n, l);
  }
  function Ri(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function It(e, t) {
    var n = e.alternate;
    return n === null ? (n = St(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function rd(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ur(e, t, n, l, a, i) {
    var d = 0;
    if (l = e, typeof e == "function") Ri(e) && (d = 1);
    else if (typeof e == "string")
      d = Rh(
        e,
        n,
        M.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Se:
          return e = St(31, n, t, a), e.elementType = Se, e.lanes = i, e;
        case G:
          return el(n.children, a, i, t);
        case K:
          d = 8, a |= 24;
          break;
        case $:
          return e = St(12, n, t, a | 2), e.elementType = $, e.lanes = i, e;
        case te:
          return e = St(13, n, t, a), e.elementType = te, e.lanes = i, e;
        case X:
          return e = St(19, n, t, a), e.elementType = X, e.lanes = i, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case P:
                d = 10;
                break e;
              case W:
                d = 9;
                break e;
              case xe:
                d = 11;
                break e;
              case Y:
                d = 14;
                break e;
              case ce:
                d = 16, l = null;
                break e;
            }
          d = 29, n = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = St(d, n, t, a), t.elementType = e, t.type = l, t.lanes = i, t;
  }
  function el(e, t, n, l) {
    return e = St(7, e, l, t), e.lanes = n, e;
  }
  function Di(e, t, n) {
    return e = St(6, e, null, t), e.lanes = n, e;
  }
  function sd(e) {
    var t = St(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Ui(e, t, n) {
    return t = St(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var id = /* @__PURE__ */ new WeakMap();
  function Mt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = id.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: su(t)
      }, id.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: su(t)
    };
  }
  var Ol = [], Rl = 0, Lr = null, wa = 0, Ot = [], Rt = 0, vn = null, Yt = 1, $t = "";
  function Pt(e, t) {
    Ol[Rl++] = wa, Ol[Rl++] = Lr, Lr = e, wa = t;
  }
  function od(e, t, n) {
    Ot[Rt++] = Yt, Ot[Rt++] = $t, Ot[Rt++] = vn, vn = e;
    var l = Yt;
    e = $t;
    var a = 32 - yt(l) - 1;
    l &= ~(1 << a), n += 1;
    var i = 32 - yt(t) + a;
    if (30 < i) {
      var d = a - a % 5;
      i = (l & (1 << d) - 1).toString(32), l >>= d, a -= d, Yt = 1 << 32 - yt(t) + a | n << a | l, $t = i + e;
    } else
      Yt = 1 << i | n << a | l, $t = e;
  }
  function Li(e) {
    e.return !== null && (Pt(e, 1), od(e, 1, 0));
  }
  function Bi(e) {
    for (; e === Lr; )
      Lr = Ol[--Rl], Ol[Rl] = null, wa = Ol[--Rl], Ol[Rl] = null;
    for (; e === vn; )
      vn = Ot[--Rt], Ot[Rt] = null, $t = Ot[--Rt], Ot[Rt] = null, Yt = Ot[--Rt], Ot[Rt] = null;
  }
  function cd(e, t) {
    Ot[Rt++] = Yt, Ot[Rt++] = $t, Ot[Rt++] = vn, Yt = t.id, $t = t.overflow, vn = e;
  }
  var et = null, Be = null, ve = !1, Sn = null, Dt = !1, Hi = Error(c(519));
  function jn(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw _a(Mt(t, e)), Hi;
  }
  function ud(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[Pe] = e, t[ot] = l, n) {
      case "dialog":
        pe("cancel", t), pe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        pe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Wa.length; n++)
          pe(Wa[n], t);
        break;
      case "source":
        pe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        pe("error", t), pe("load", t);
        break;
      case "details":
        pe("toggle", t);
        break;
      case "input":
        pe("invalid", t), Cu(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        pe("invalid", t);
        break;
      case "textarea":
        pe("invalid", t), Eu(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || _0(t.textContent, n) ? (l.popover != null && (pe("beforetoggle", t), pe("toggle", t)), l.onScroll != null && pe("scroll", t), l.onScrollEnd != null && pe("scrollend", t), l.onClick != null && (t.onclick = Wt), t = !0) : t = !1, t || jn(e, !0);
  }
  function dd(e) {
    for (et = e.return; et; )
      switch (et.tag) {
        case 5:
        case 31:
        case 13:
          Dt = !1;
          return;
        case 27:
        case 3:
          Dt = !0;
          return;
        default:
          et = et.return;
      }
  }
  function Dl(e) {
    if (e !== et) return !1;
    if (!ve) return dd(e), ve = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || ac(e.type, e.memoizedProps)), n = !n), n && Be && jn(e), dd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Be = L0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Be = L0(e);
    } else
      t === 27 ? (t = Be, Un(e.type) ? (e = cc, cc = null, Be = e) : Be = t) : Be = et ? Lt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function tl() {
    Be = et = null, ve = !1;
  }
  function qi() {
    var e = Sn;
    return e !== null && (mt === null ? mt = e : mt.push.apply(
      mt,
      e
    ), Sn = null), e;
  }
  function _a(e) {
    Sn === null ? Sn = [e] : Sn.push(e);
  }
  var Gi = C(null), nl = null, en = null;
  function Cn(e, t, n) {
    Z(Gi, t._currentValue), t._currentValue = n;
  }
  function tn(e) {
    e._currentValue = Gi.current, L(Gi);
  }
  function Yi(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function $i(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var i = a.dependencies;
      if (i !== null) {
        var d = a.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var h = i;
          i = a;
          for (var y = 0; y < t.length; y++)
            if (h.context === t[y]) {
              i.lanes |= n, h = i.alternate, h !== null && (h.lanes |= n), Yi(
                i.return,
                n,
                e
              ), l || (d = null);
              break e;
            }
          i = h.next;
        }
      } else if (a.tag === 18) {
        if (d = a.return, d === null) throw Error(c(341));
        d.lanes |= n, i = d.alternate, i !== null && (i.lanes |= n), Yi(d, n, e), d = null;
      } else d = a.child;
      if (d !== null) d.return = a;
      else
        for (d = a; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (a = d.sibling, a !== null) {
            a.return = d.return, d = a;
            break;
          }
          d = d.return;
        }
      a = d;
    }
  }
  function Ul(e, t, n, l) {
    e = null;
    for (var a = t, i = !1; a !== null; ) {
      if (!i) {
        if ((a.flags & 524288) !== 0) i = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var d = a.alternate;
        if (d === null) throw Error(c(387));
        if (d = d.memoizedProps, d !== null) {
          var h = a.type;
          vt(a.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
        }
      } else if (a === oe.current) {
        if (d = a.alternate, d === null) throw Error(c(387));
        d.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(tr) : e = [tr]);
      }
      a = a.return;
    }
    e !== null && $i(
      t,
      e,
      n,
      l
    ), t.flags |= 262144;
  }
  function Br(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!vt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ll(e) {
    nl = e, en = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function tt(e) {
    return fd(nl, e);
  }
  function Hr(e, t) {
    return nl === null && ll(e), fd(e, t);
  }
  function fd(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, en === null) {
      if (e === null) throw Error(c(308));
      en = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else en = en.next = t;
    return n;
  }
  var z2 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, A2 = u.unstable_scheduleCallback, M2 = u.unstable_NormalPriority, Qe = {
    $$typeof: P,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Vi() {
    return {
      controller: new z2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ka(e) {
    e.refCount--, e.refCount === 0 && A2(M2, function() {
      e.controller.abort();
    });
  }
  var za = null, Xi = 0, Ll = 0, Bl = null;
  function O2(e, t) {
    if (za === null) {
      var n = za = [];
      Xi = 0, Ll = Jo(), Bl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return Xi++, t.then(md, md), t;
  }
  function md() {
    if (--Xi === 0 && za !== null) {
      Bl !== null && (Bl.status = "fulfilled");
      var e = za;
      za = null, Ll = 0, Bl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function R2(e, t) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        n.push(a);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var a = 0; a < n.length; a++) (0, n[a])(t);
      },
      function(a) {
        for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++)
          (0, n[a])(void 0);
      }
    ), l;
  }
  var hd = z.S;
  z.S = function(e, t) {
    If = xt(), typeof t == "object" && t !== null && typeof t.then == "function" && O2(e, t), hd !== null && hd(e, t);
  };
  var al = C(null);
  function Qi() {
    var e = al.current;
    return e !== null ? e : De.pooledCache;
  }
  function qr(e, t) {
    t === null ? Z(al, al.current) : Z(al, t.pool);
  }
  function gd() {
    var e = Qi();
    return e === null ? null : { parent: Qe._currentValue, pool: e };
  }
  var Hl = Error(c(460)), Zi = Error(c(474)), Gr = Error(c(542)), Yr = { then: function() {
  } };
  function pd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function xd(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Wt, Wt), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, yd(e), e;
      default:
        if (typeof t.status == "string") t.then(Wt, Wt);
        else {
          if (e = De, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var a = t;
                a.status = "fulfilled", a.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var a = t;
                a.status = "rejected", a.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, yd(e), e;
        }
        throw sl = t, Hl;
    }
  }
  function rl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (sl = n, Hl) : n;
    }
  }
  var sl = null;
  function bd() {
    if (sl === null) throw Error(c(459));
    var e = sl;
    return sl = null, e;
  }
  function yd(e) {
    if (e === Hl || e === Gr)
      throw Error(c(483));
  }
  var ql = null, Aa = 0;
  function $r(e) {
    var t = Aa;
    return Aa += 1, ql === null && (ql = []), xd(ql, e, t);
  }
  function Ma(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Vr(e, t) {
    throw t.$$typeof === R ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function vd(e) {
    function t(N, j) {
      if (e) {
        var E = N.deletions;
        E === null ? (N.deletions = [j], N.flags |= 16) : E.push(j);
      }
    }
    function n(N, j) {
      if (!e) return null;
      for (; j !== null; )
        t(N, j), j = j.sibling;
      return null;
    }
    function l(N) {
      for (var j = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? j.set(N.key, N) : j.set(N.index, N), N = N.sibling;
      return j;
    }
    function a(N, j) {
      return N = It(N, j), N.index = 0, N.sibling = null, N;
    }
    function i(N, j, E) {
      return N.index = E, e ? (E = N.alternate, E !== null ? (E = E.index, E < j ? (N.flags |= 67108866, j) : E) : (N.flags |= 67108866, j)) : (N.flags |= 1048576, j);
    }
    function d(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function h(N, j, E, D) {
      return j === null || j.tag !== 6 ? (j = Di(E, N.mode, D), j.return = N, j) : (j = a(j, E), j.return = N, j);
    }
    function y(N, j, E, D) {
      var le = E.type;
      return le === G ? O(
        N,
        j,
        E.props.children,
        D,
        E.key
      ) : j !== null && (j.elementType === le || typeof le == "object" && le !== null && le.$$typeof === ce && rl(le) === j.type) ? (j = a(j, E.props), Ma(j, E), j.return = N, j) : (j = Ur(
        E.type,
        E.key,
        E.props,
        null,
        N.mode,
        D
      ), Ma(j, E), j.return = N, j);
    }
    function T(N, j, E, D) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== E.containerInfo || j.stateNode.implementation !== E.implementation ? (j = Ui(E, N.mode, D), j.return = N, j) : (j = a(j, E.children || []), j.return = N, j);
    }
    function O(N, j, E, D, le) {
      return j === null || j.tag !== 7 ? (j = el(
        E,
        N.mode,
        D,
        le
      ), j.return = N, j) : (j = a(j, E), j.return = N, j);
    }
    function B(N, j, E) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return j = Di(
          "" + j,
          N.mode,
          E
        ), j.return = N, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case q:
            return E = Ur(
              j.type,
              j.key,
              j.props,
              null,
              N.mode,
              E
            ), Ma(E, j), E.return = N, E;
          case _:
            return j = Ui(
              j,
              N.mode,
              E
            ), j.return = N, j;
          case ce:
            return j = rl(j), B(N, j, E);
        }
        if (se(j) || ee(j))
          return j = el(
            j,
            N.mode,
            E,
            null
          ), j.return = N, j;
        if (typeof j.then == "function")
          return B(N, $r(j), E);
        if (j.$$typeof === P)
          return B(
            N,
            Hr(N, j),
            E
          );
        Vr(N, j);
      }
      return null;
    }
    function w(N, j, E, D) {
      var le = j !== null ? j.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return le !== null ? null : h(N, j, "" + E, D);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case q:
            return E.key === le ? y(N, j, E, D) : null;
          case _:
            return E.key === le ? T(N, j, E, D) : null;
          case ce:
            return E = rl(E), w(N, j, E, D);
        }
        if (se(E) || ee(E))
          return le !== null ? null : O(N, j, E, D, null);
        if (typeof E.then == "function")
          return w(
            N,
            j,
            $r(E),
            D
          );
        if (E.$$typeof === P)
          return w(
            N,
            j,
            Hr(N, E),
            D
          );
        Vr(N, E);
      }
      return null;
    }
    function k(N, j, E, D, le) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return N = N.get(E) || null, h(j, N, "" + D, le);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case q:
            return N = N.get(
              D.key === null ? E : D.key
            ) || null, y(j, N, D, le);
          case _:
            return N = N.get(
              D.key === null ? E : D.key
            ) || null, T(j, N, D, le);
          case ce:
            return D = rl(D), k(
              N,
              j,
              E,
              D,
              le
            );
        }
        if (se(D) || ee(D))
          return N = N.get(E) || null, O(j, N, D, le, null);
        if (typeof D.then == "function")
          return k(
            N,
            j,
            E,
            $r(D),
            le
          );
        if (D.$$typeof === P)
          return k(
            N,
            j,
            E,
            Hr(j, D),
            le
          );
        Vr(j, D);
      }
      return null;
    }
    function J(N, j, E, D) {
      for (var le = null, Ee = null, F = j, me = j = 0, ye = null; F !== null && me < E.length; me++) {
        F.index > me ? (ye = F, F = null) : ye = F.sibling;
        var Te = w(
          N,
          F,
          E[me],
          D
        );
        if (Te === null) {
          F === null && (F = ye);
          break;
        }
        e && F && Te.alternate === null && t(N, F), j = i(Te, j, me), Ee === null ? le = Te : Ee.sibling = Te, Ee = Te, F = ye;
      }
      if (me === E.length)
        return n(N, F), ve && Pt(N, me), le;
      if (F === null) {
        for (; me < E.length; me++)
          F = B(N, E[me], D), F !== null && (j = i(
            F,
            j,
            me
          ), Ee === null ? le = F : Ee.sibling = F, Ee = F);
        return ve && Pt(N, me), le;
      }
      for (F = l(F); me < E.length; me++)
        ye = k(
          F,
          N,
          me,
          E[me],
          D
        ), ye !== null && (e && ye.alternate !== null && F.delete(
          ye.key === null ? me : ye.key
        ), j = i(
          ye,
          j,
          me
        ), Ee === null ? le = ye : Ee.sibling = ye, Ee = ye);
      return e && F.forEach(function(Gn) {
        return t(N, Gn);
      }), ve && Pt(N, me), le;
    }
    function re(N, j, E, D) {
      if (E == null) throw Error(c(151));
      for (var le = null, Ee = null, F = j, me = j = 0, ye = null, Te = E.next(); F !== null && !Te.done; me++, Te = E.next()) {
        F.index > me ? (ye = F, F = null) : ye = F.sibling;
        var Gn = w(N, F, Te.value, D);
        if (Gn === null) {
          F === null && (F = ye);
          break;
        }
        e && F && Gn.alternate === null && t(N, F), j = i(Gn, j, me), Ee === null ? le = Gn : Ee.sibling = Gn, Ee = Gn, F = ye;
      }
      if (Te.done)
        return n(N, F), ve && Pt(N, me), le;
      if (F === null) {
        for (; !Te.done; me++, Te = E.next())
          Te = B(N, Te.value, D), Te !== null && (j = i(Te, j, me), Ee === null ? le = Te : Ee.sibling = Te, Ee = Te);
        return ve && Pt(N, me), le;
      }
      for (F = l(F); !Te.done; me++, Te = E.next())
        Te = k(F, N, me, Te.value, D), Te !== null && (e && Te.alternate !== null && F.delete(Te.key === null ? me : Te.key), j = i(Te, j, me), Ee === null ? le = Te : Ee.sibling = Te, Ee = Te);
      return e && F.forEach(function(Xh) {
        return t(N, Xh);
      }), ve && Pt(N, me), le;
    }
    function Oe(N, j, E, D) {
      if (typeof E == "object" && E !== null && E.type === G && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case q:
            e: {
              for (var le = E.key; j !== null; ) {
                if (j.key === le) {
                  if (le = E.type, le === G) {
                    if (j.tag === 7) {
                      n(
                        N,
                        j.sibling
                      ), D = a(
                        j,
                        E.props.children
                      ), D.return = N, N = D;
                      break e;
                    }
                  } else if (j.elementType === le || typeof le == "object" && le !== null && le.$$typeof === ce && rl(le) === j.type) {
                    n(
                      N,
                      j.sibling
                    ), D = a(j, E.props), Ma(D, E), D.return = N, N = D;
                    break e;
                  }
                  n(N, j);
                  break;
                } else t(N, j);
                j = j.sibling;
              }
              E.type === G ? (D = el(
                E.props.children,
                N.mode,
                D,
                E.key
              ), D.return = N, N = D) : (D = Ur(
                E.type,
                E.key,
                E.props,
                null,
                N.mode,
                D
              ), Ma(D, E), D.return = N, N = D);
            }
            return d(N);
          case _:
            e: {
              for (le = E.key; j !== null; ) {
                if (j.key === le)
                  if (j.tag === 4 && j.stateNode.containerInfo === E.containerInfo && j.stateNode.implementation === E.implementation) {
                    n(
                      N,
                      j.sibling
                    ), D = a(j, E.children || []), D.return = N, N = D;
                    break e;
                  } else {
                    n(N, j);
                    break;
                  }
                else t(N, j);
                j = j.sibling;
              }
              D = Ui(E, N.mode, D), D.return = N, N = D;
            }
            return d(N);
          case ce:
            return E = rl(E), Oe(
              N,
              j,
              E,
              D
            );
        }
        if (se(E))
          return J(
            N,
            j,
            E,
            D
          );
        if (ee(E)) {
          if (le = ee(E), typeof le != "function") throw Error(c(150));
          return E = le.call(E), re(
            N,
            j,
            E,
            D
          );
        }
        if (typeof E.then == "function")
          return Oe(
            N,
            j,
            $r(E),
            D
          );
        if (E.$$typeof === P)
          return Oe(
            N,
            j,
            Hr(N, E),
            D
          );
        Vr(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, j !== null && j.tag === 6 ? (n(N, j.sibling), D = a(j, E), D.return = N, N = D) : (n(N, j), D = Di(E, N.mode, D), D.return = N, N = D), d(N)) : n(N, j);
    }
    return function(N, j, E, D) {
      try {
        Aa = 0;
        var le = Oe(
          N,
          j,
          E,
          D
        );
        return ql = null, le;
      } catch (F) {
        if (F === Hl || F === Gr) throw F;
        var Ee = St(29, F, null, N.mode);
        return Ee.lanes = D, Ee.return = N, Ee;
      } finally {
      }
    };
  }
  var il = vd(!0), Sd = vd(!1), Nn = !1;
  function Ki(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ji(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function En(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Tn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (_e & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, t = Dr(e), ad(e, null, n), t;
    }
    return Rr(e, l, t, n), Dr(e);
  }
  function Oa(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, fu(e, n);
    }
  }
  function Wi(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var a = null, i = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          i === null ? a = i = d : i = i.next = d, n = n.next;
        } while (n !== null);
        i === null ? a = i = t : i = i.next = t;
      } else a = i = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Fi = !1;
  function Ra() {
    if (Fi) {
      var e = Bl;
      if (e !== null) throw e;
    }
  }
  function Da(e, t, n, l) {
    Fi = !1;
    var a = e.updateQueue;
    Nn = !1;
    var i = a.firstBaseUpdate, d = a.lastBaseUpdate, h = a.shared.pending;
    if (h !== null) {
      a.shared.pending = null;
      var y = h, T = y.next;
      y.next = null, d === null ? i = T : d.next = T, d = y;
      var O = e.alternate;
      O !== null && (O = O.updateQueue, h = O.lastBaseUpdate, h !== d && (h === null ? O.firstBaseUpdate = T : h.next = T, O.lastBaseUpdate = y));
    }
    if (i !== null) {
      var B = a.baseState;
      d = 0, O = T = y = null, h = i;
      do {
        var w = h.lane & -536870913, k = w !== h.lane;
        if (k ? (be & w) === w : (l & w) === w) {
          w !== 0 && w === Ll && (Fi = !0), O !== null && (O = O.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          e: {
            var J = e, re = h;
            w = t;
            var Oe = n;
            switch (re.tag) {
              case 1:
                if (J = re.payload, typeof J == "function") {
                  B = J.call(Oe, B, w);
                  break e;
                }
                B = J;
                break e;
              case 3:
                J.flags = J.flags & -65537 | 128;
              case 0:
                if (J = re.payload, w = typeof J == "function" ? J.call(Oe, B, w) : J, w == null) break e;
                B = v({}, B, w);
                break e;
              case 2:
                Nn = !0;
            }
          }
          w = h.callback, w !== null && (e.flags |= 64, k && (e.flags |= 8192), k = a.callbacks, k === null ? a.callbacks = [w] : k.push(w));
        } else
          k = {
            lane: w,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, O === null ? (T = O = k, y = B) : O = O.next = k, d |= w;
        if (h = h.next, h === null) {
          if (h = a.shared.pending, h === null)
            break;
          k = h, h = k.next, k.next = null, a.lastBaseUpdate = k, a.shared.pending = null;
        }
      } while (!0);
      O === null && (y = B), a.baseState = y, a.firstBaseUpdate = T, a.lastBaseUpdate = O, i === null && (a.shared.lanes = 0), An |= d, e.lanes = d, e.memoizedState = B;
    }
  }
  function jd(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function Cd(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        jd(n[e], t);
  }
  var Gl = C(null), Xr = C(0);
  function Nd(e, t) {
    e = dn, Z(Xr, e), Z(Gl, t), dn = e | t.baseLanes;
  }
  function Ii() {
    Z(Xr, dn), Z(Gl, Gl.current);
  }
  function Pi() {
    dn = Xr.current, L(Gl), L(Xr);
  }
  var jt = C(null), Ut = null;
  function wn(e) {
    var t = e.alternate;
    Z(Ve, Ve.current & 1), Z(jt, e), Ut === null && (t === null || Gl.current !== null || t.memoizedState !== null) && (Ut = e);
  }
  function eo(e) {
    Z(Ve, Ve.current), Z(jt, e), Ut === null && (Ut = e);
  }
  function Ed(e) {
    e.tag === 22 ? (Z(Ve, Ve.current), Z(jt, e), Ut === null && (Ut = e)) : _n();
  }
  function _n() {
    Z(Ve, Ve.current), Z(jt, jt.current);
  }
  function Ct(e) {
    L(jt), Ut === e && (Ut = null), L(Ve);
  }
  var Ve = C(0);
  function Qr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || ic(n) || oc(n)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var nn = 0, fe = null, Ae = null, Ze = null, Zr = !1, Yl = !1, ol = !1, Kr = 0, Ua = 0, $l = null, D2 = 0;
  function Ye() {
    throw Error(c(321));
  }
  function to(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!vt(e[n], t[n])) return !1;
    return !0;
  }
  function no(e, t, n, l, a, i) {
    return nn = i, fe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = e === null || e.memoizedState === null ? cf : bo, ol = !1, i = n(l, a), ol = !1, Yl && (i = wd(
      t,
      n,
      l,
      a
    )), Td(e), i;
  }
  function Td(e) {
    z.H = Ha;
    var t = Ae !== null && Ae.next !== null;
    if (nn = 0, Ze = Ae = fe = null, Zr = !1, Ua = 0, $l = null, t) throw Error(c(300));
    e === null || Ke || (e = e.dependencies, e !== null && Br(e) && (Ke = !0));
  }
  function wd(e, t, n, l) {
    fe = e;
    var a = 0;
    do {
      if (Yl && ($l = null), Ua = 0, Yl = !1, 25 <= a) throw Error(c(301));
      if (a += 1, Ze = Ae = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      z.H = uf, i = t(n, l);
    } while (Yl);
    return i;
  }
  function U2() {
    var e = z.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? La(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (fe.flags |= 1024), t;
  }
  function lo() {
    var e = Kr !== 0;
    return Kr = 0, e;
  }
  function ao(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function ro(e) {
    if (Zr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Zr = !1;
    }
    nn = 0, Ze = Ae = fe = null, Yl = !1, Ua = Kr = 0, $l = null;
  }
  function it() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ze === null ? fe.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
  }
  function Xe() {
    if (Ae === null) {
      var e = fe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = Ze === null ? fe.memoizedState : Ze.next;
    if (t !== null)
      Ze = t, Ae = e;
    else {
      if (e === null)
        throw fe.alternate === null ? Error(c(467)) : Error(c(310));
      Ae = e, e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, Ze === null ? fe.memoizedState = Ze = e : Ze = Ze.next = e;
    }
    return Ze;
  }
  function Jr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function La(e) {
    var t = Ua;
    return Ua += 1, $l === null && ($l = []), e = xd($l, e, t), t = fe, (Ze === null ? t.memoizedState : Ze.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? cf : bo), e;
  }
  function Wr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return La(e);
      if (e.$$typeof === P) return tt(e);
    }
    throw Error(c(438, String(e)));
  }
  function so(e) {
    var t = null, n = fe.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = fe.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Jr(), fe.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = he;
    return t.index++, n;
  }
  function ln(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Fr(e) {
    var t = Xe();
    return io(t, Ae, e);
  }
  function io(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue, i = l.pending;
    if (i !== null) {
      if (a !== null) {
        var d = a.next;
        a.next = i.next, i.next = d;
      }
      t.baseQueue = a = i, l.pending = null;
    }
    if (i = e.baseState, a === null) e.memoizedState = i;
    else {
      t = a.next;
      var h = d = null, y = null, T = t, O = !1;
      do {
        var B = T.lane & -536870913;
        if (B !== T.lane ? (be & B) === B : (nn & B) === B) {
          var w = T.revertLane;
          if (w === 0)
            y !== null && (y = y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), B === Ll && (O = !0);
          else if ((nn & w) === w) {
            T = T.next, w === Ll && (O = !0);
            continue;
          } else
            B = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, y === null ? (h = y = B, d = i) : y = y.next = B, fe.lanes |= w, An |= w;
          B = T.action, ol && n(i, B), i = T.hasEagerState ? T.eagerState : n(i, B);
        } else
          w = {
            lane: B,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, y === null ? (h = y = w, d = i) : y = y.next = w, fe.lanes |= B, An |= B;
        T = T.next;
      } while (T !== null && T !== t);
      if (y === null ? d = i : y.next = h, !vt(i, e.memoizedState) && (Ke = !0, O && (n = Bl, n !== null)))
        throw n;
      e.memoizedState = i, e.baseState = d, e.baseQueue = y, l.lastRenderedState = i;
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function oo(e) {
    var t = Xe(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, a = n.pending, i = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var d = a = a.next;
      do
        i = e(i, d.action), d = d.next;
      while (d !== a);
      vt(i, t.memoizedState) || (Ke = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
    }
    return [i, l];
  }
  function _d(e, t, n) {
    var l = fe, a = Xe(), i = ve;
    if (i) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var d = !vt(
      (Ae || a).memoizedState,
      n
    );
    if (d && (a.memoizedState = n, Ke = !0), a = a.queue, fo(Ad.bind(null, l, a, e), [
      e
    ]), a.getSnapshot !== t || d || Ze !== null && Ze.memoizedState.tag & 1) {
      if (l.flags |= 2048, Vl(
        9,
        { destroy: void 0 },
        zd.bind(
          null,
          l,
          a,
          n,
          t
        ),
        null
      ), De === null) throw Error(c(349));
      i || (nn & 127) !== 0 || kd(l, t, n);
    }
    return n;
  }
  function kd(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = fe.updateQueue, t === null ? (t = Jr(), fe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function zd(e, t, n, l) {
    t.value = n, t.getSnapshot = l, Md(t) && Od(e);
  }
  function Ad(e, t, n) {
    return n(function() {
      Md(t) && Od(e);
    });
  }
  function Md(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !vt(e, n);
    } catch {
      return !0;
    }
  }
  function Od(e) {
    var t = Pn(e, 2);
    t !== null && ht(t, e, 2);
  }
  function co(e) {
    var t = it();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ol) {
        xn(!0);
        try {
          n();
        } finally {
          xn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ln,
      lastRenderedState: e
    }, t;
  }
  function Rd(e, t, n, l) {
    return e.baseState = n, io(
      e,
      Ae,
      typeof l == "function" ? l : ln
    );
  }
  function L2(e, t, n, l, a) {
    if (es(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: a,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          i.listeners.push(d);
        }
      };
      z.T !== null ? n(!0) : i.isTransition = !1, l(i), n = t.pending, n === null ? (i.next = t.pending = i, Dd(t, i)) : (i.next = n.next, t.pending = n.next = i);
    }
  }
  function Dd(e, t) {
    var n = t.action, l = t.payload, a = e.state;
    if (t.isTransition) {
      var i = z.T, d = {};
      z.T = d;
      try {
        var h = n(a, l), y = z.S;
        y !== null && y(d, h), Ud(e, t, h);
      } catch (T) {
        uo(e, t, T);
      } finally {
        i !== null && d.types !== null && (i.types = d.types), z.T = i;
      }
    } else
      try {
        i = n(a, l), Ud(e, t, i);
      } catch (T) {
        uo(e, t, T);
      }
  }
  function Ud(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Ld(e, t, l);
      },
      function(l) {
        return uo(e, t, l);
      }
    ) : Ld(e, t, n);
  }
  function Ld(e, t, n) {
    t.status = "fulfilled", t.value = n, Bd(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Dd(e, n)));
  }
  function uo(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, Bd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Bd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Hd(e, t) {
    return t;
  }
  function qd(e, t) {
    if (ve) {
      var n = De.formState;
      if (n !== null) {
        e: {
          var l = fe;
          if (ve) {
            if (Be) {
              t: {
                for (var a = Be, i = Dt; a.nodeType !== 8; ) {
                  if (!i) {
                    a = null;
                    break t;
                  }
                  if (a = Lt(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break t;
                  }
                }
                i = a.data, a = i === "F!" || i === "F" ? a : null;
              }
              if (a) {
                Be = Lt(
                  a.nextSibling
                ), l = a.data === "F!";
                break e;
              }
            }
            jn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = it(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Hd,
      lastRenderedState: t
    }, n.queue = l, n = rf.bind(
      null,
      fe,
      l
    ), l.dispatch = n, l = co(!1), i = xo.bind(
      null,
      fe,
      !1,
      l.queue
    ), l = it(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = a, n = L2.bind(
      null,
      fe,
      a,
      i,
      n
    ), a.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Gd(e) {
    var t = Xe();
    return Yd(t, Ae, e);
  }
  function Yd(e, t, n) {
    if (t = io(
      e,
      t,
      Hd
    )[0], e = Fr(ln)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = La(t);
      } catch (d) {
        throw d === Hl ? Gr : d;
      }
    else l = t;
    t = Xe();
    var a = t.queue, i = a.dispatch;
    return n !== t.memoizedState && (fe.flags |= 2048, Vl(
      9,
      { destroy: void 0 },
      B2.bind(null, a, n),
      null
    )), [l, i, e];
  }
  function B2(e, t) {
    e.action = t;
  }
  function $d(e) {
    var t = Xe(), n = Ae;
    if (n !== null)
      return Yd(t, n, e);
    Xe(), t = t.memoizedState, n = Xe();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Vl(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = fe.updateQueue, t === null && (t = Jr(), fe.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Vd() {
    return Xe().memoizedState;
  }
  function Ir(e, t, n, l) {
    var a = it();
    fe.flags |= e, a.memoizedState = Vl(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Pr(e, t, n, l) {
    var a = Xe();
    l = l === void 0 ? null : l;
    var i = a.memoizedState.inst;
    Ae !== null && l !== null && to(l, Ae.memoizedState.deps) ? a.memoizedState = Vl(t, i, n, l) : (fe.flags |= e, a.memoizedState = Vl(
      1 | t,
      i,
      n,
      l
    ));
  }
  function Xd(e, t) {
    Ir(8390656, 8, e, t);
  }
  function fo(e, t) {
    Pr(2048, 8, e, t);
  }
  function H2(e) {
    fe.flags |= 4;
    var t = fe.updateQueue;
    if (t === null)
      t = Jr(), fe.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Qd(e) {
    var t = Xe().memoizedState;
    return H2({ ref: t, nextImpl: e }), function() {
      if ((_e & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Zd(e, t) {
    return Pr(4, 2, e, t);
  }
  function Kd(e, t) {
    return Pr(4, 4, e, t);
  }
  function Jd(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Wd(e, t, n) {
    n = n != null ? n.concat([e]) : null, Pr(4, 4, Jd.bind(null, t, e), n);
  }
  function mo() {
  }
  function Fd(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && to(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function Id(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && to(t, l[1]))
      return l[0];
    if (l = e(), ol) {
      xn(!0);
      try {
        e();
      } finally {
        xn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function ho(e, t, n) {
    return n === void 0 || (nn & 1073741824) !== 0 && (be & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = e0(), fe.lanes |= e, An |= e, n);
  }
  function Pd(e, t, n, l) {
    return vt(n, t) ? n : Gl.current !== null ? (e = ho(e, n, l), vt(e, t) || (Ke = !0), e) : (nn & 42) === 0 || (nn & 1073741824) !== 0 && (be & 261930) === 0 ? (Ke = !0, e.memoizedState = n) : (e = e0(), fe.lanes |= e, An |= e, t);
  }
  function ef(e, t, n, l, a) {
    var i = V.p;
    V.p = i !== 0 && 8 > i ? i : 8;
    var d = z.T, h = {};
    z.T = h, xo(e, !1, t, n);
    try {
      var y = a(), T = z.S;
      if (T !== null && T(h, y), y !== null && typeof y == "object" && typeof y.then == "function") {
        var O = R2(
          y,
          l
        );
        Ba(
          e,
          t,
          O,
          Tt(e)
        );
      } else
        Ba(
          e,
          t,
          l,
          Tt(e)
        );
    } catch (B) {
      Ba(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: B },
        Tt()
      );
    } finally {
      V.p = i, d !== null && h.types !== null && (d.types = h.types), z.T = d;
    }
  }
  function q2() {
  }
  function go(e, t, n, l) {
    if (e.tag !== 5) throw Error(c(476));
    var a = tf(e).queue;
    ef(
      e,
      a,
      t,
      ne,
      n === null ? q2 : function() {
        return nf(e), n(l);
      }
    );
  }
  function tf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ne,
      baseState: ne,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ln,
        lastRenderedState: ne
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ln,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function nf(e) {
    var t = tf(e);
    t.next === null && (t = e.alternate.memoizedState), Ba(
      e,
      t.next.queue,
      {},
      Tt()
    );
  }
  function po() {
    return tt(tr);
  }
  function lf() {
    return Xe().memoizedState;
  }
  function af() {
    return Xe().memoizedState;
  }
  function G2(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Tt();
          e = En(n);
          var l = Tn(t, e, n);
          l !== null && (ht(l, t, n), Oa(l, t, n)), t = { cache: Vi() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Y2(e, t, n) {
    var l = Tt();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, es(e) ? sf(t, n) : (n = Oi(e, t, n, l), n !== null && (ht(n, e, l), of(n, t, l)));
  }
  function rf(e, t, n) {
    var l = Tt();
    Ba(e, t, n, l);
  }
  function Ba(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (es(e)) sf(t, a);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var d = t.lastRenderedState, h = i(d, n);
          if (a.hasEagerState = !0, a.eagerState = h, vt(h, d))
            return Rr(e, t, a, 0), De === null && Or(), !1;
        } catch {
        } finally {
        }
      if (n = Oi(e, t, a, l), n !== null)
        return ht(n, e, l), of(n, t, l), !0;
    }
    return !1;
  }
  function xo(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Jo(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, es(e)) {
      if (t) throw Error(c(479));
    } else
      t = Oi(
        e,
        n,
        l,
        2
      ), t !== null && ht(t, e, 2);
  }
  function es(e) {
    var t = e.alternate;
    return e === fe || t !== null && t === fe;
  }
  function sf(e, t) {
    Yl = Zr = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function of(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, fu(e, n);
    }
  }
  var Ha = {
    readContext: tt,
    use: Wr,
    useCallback: Ye,
    useContext: Ye,
    useEffect: Ye,
    useImperativeHandle: Ye,
    useLayoutEffect: Ye,
    useInsertionEffect: Ye,
    useMemo: Ye,
    useReducer: Ye,
    useRef: Ye,
    useState: Ye,
    useDebugValue: Ye,
    useDeferredValue: Ye,
    useTransition: Ye,
    useSyncExternalStore: Ye,
    useId: Ye,
    useHostTransitionStatus: Ye,
    useFormState: Ye,
    useActionState: Ye,
    useOptimistic: Ye,
    useMemoCache: Ye,
    useCacheRefresh: Ye
  };
  Ha.useEffectEvent = Ye;
  var cf = {
    readContext: tt,
    use: Wr,
    useCallback: function(e, t) {
      return it().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: tt,
    useEffect: Xd,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Ir(
        4194308,
        4,
        Jd.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Ir(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ir(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = it();
      t = t === void 0 ? null : t;
      var l = e();
      if (ol) {
        xn(!0);
        try {
          e();
        } finally {
          xn(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = it();
      if (n !== void 0) {
        var a = n(t);
        if (ol) {
          xn(!0);
          try {
            n(t);
          } finally {
            xn(!1);
          }
        }
      } else a = t;
      return l.memoizedState = l.baseState = a, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      }, l.queue = e, e = e.dispatch = Y2.bind(
        null,
        fe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = it();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = co(e);
      var t = e.queue, n = rf.bind(null, fe, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: mo,
    useDeferredValue: function(e, t) {
      var n = it();
      return ho(n, e, t);
    },
    useTransition: function() {
      var e = co(!1);
      return e = ef.bind(
        null,
        fe,
        e.queue,
        !0,
        !1
      ), it().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = fe, a = it();
      if (ve) {
        if (n === void 0)
          throw Error(c(407));
        n = n();
      } else {
        if (n = t(), De === null)
          throw Error(c(349));
        (be & 127) !== 0 || kd(l, t, n);
      }
      a.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return a.queue = i, Xd(Ad.bind(null, l, i, e), [
        e
      ]), l.flags |= 2048, Vl(
        9,
        { destroy: void 0 },
        zd.bind(
          null,
          l,
          i,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = it(), t = De.identifierPrefix;
      if (ve) {
        var n = $t, l = Yt;
        n = (l & ~(1 << 32 - yt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Kr++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = D2++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: po,
    useFormState: qd,
    useActionState: qd,
    useOptimistic: function(e) {
      var t = it();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = xo.bind(
        null,
        fe,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: so,
    useCacheRefresh: function() {
      return it().memoizedState = G2.bind(
        null,
        fe
      );
    },
    useEffectEvent: function(e) {
      var t = it(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((_e & 2) !== 0)
          throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, bo = {
    readContext: tt,
    use: Wr,
    useCallback: Fd,
    useContext: tt,
    useEffect: fo,
    useImperativeHandle: Wd,
    useInsertionEffect: Zd,
    useLayoutEffect: Kd,
    useMemo: Id,
    useReducer: Fr,
    useRef: Vd,
    useState: function() {
      return Fr(ln);
    },
    useDebugValue: mo,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return Pd(
        n,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Fr(ln)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : La(e),
        t
      ];
    },
    useSyncExternalStore: _d,
    useId: lf,
    useHostTransitionStatus: po,
    useFormState: Gd,
    useActionState: Gd,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Rd(n, Ae, e, t);
    },
    useMemoCache: so,
    useCacheRefresh: af
  };
  bo.useEffectEvent = Qd;
  var uf = {
    readContext: tt,
    use: Wr,
    useCallback: Fd,
    useContext: tt,
    useEffect: fo,
    useImperativeHandle: Wd,
    useInsertionEffect: Zd,
    useLayoutEffect: Kd,
    useMemo: Id,
    useReducer: oo,
    useRef: Vd,
    useState: function() {
      return oo(ln);
    },
    useDebugValue: mo,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return Ae === null ? ho(n, e, t) : Pd(
        n,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = oo(ln)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : La(e),
        t
      ];
    },
    useSyncExternalStore: _d,
    useId: lf,
    useHostTransitionStatus: po,
    useFormState: $d,
    useActionState: $d,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Ae !== null ? Rd(n, Ae, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: so,
    useCacheRefresh: af
  };
  uf.useEffectEvent = Qd;
  function yo(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : v({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var vo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = Tt(), a = En(l);
      a.payload = t, n != null && (a.callback = n), t = Tn(e, a, l), t !== null && (ht(t, e, l), Oa(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = Tt(), a = En(l);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Tn(e, a, l), t !== null && (ht(t, e, l), Oa(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Tt(), l = En(n);
      l.tag = 2, t != null && (l.callback = t), t = Tn(e, l, n), t !== null && (ht(t, e, n), Oa(t, e, n));
    }
  };
  function df(e, t, n, l, a, i, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, i, d) : t.prototype && t.prototype.isPureReactComponent ? !Ea(n, l) || !Ea(a, i) : !0;
  }
  function ff(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && vo.enqueueReplaceState(t, t.state, null);
  }
  function cl(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = v({}, n));
      for (var a in e)
        n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function mf(e) {
    Mr(e);
  }
  function hf(e) {
    console.error(e);
  }
  function gf(e) {
    Mr(e);
  }
  function ts(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function pf(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function So(e, t, n) {
    return n = En(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ts(e, t);
    }, n;
  }
  function xf(e) {
    return e = En(e), e.tag = 3, e;
  }
  function bf(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var i = l.value;
      e.payload = function() {
        return a(i);
      }, e.callback = function() {
        pf(t, n, l);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      pf(t, n, l), typeof a != "function" && (Mn === null ? Mn = /* @__PURE__ */ new Set([this]) : Mn.add(this));
      var h = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function $2(e, t, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Ul(
        t,
        n,
        a,
        !0
      ), n = jt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ut === null ? ms() : n.alternate === null && $e === 0 && ($e = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === Yr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Qo(e, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === Yr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Qo(e, l, a)), !1;
        }
        throw Error(c(435, n.tag));
      }
      return Qo(e, l, a), ms(), !1;
    }
    if (ve)
      return t = jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, l !== Hi && (e = Error(c(422), { cause: l }), _a(Mt(e, n)))) : (l !== Hi && (t = Error(c(423), {
        cause: l
      }), _a(
        Mt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, l = Mt(l, n), a = So(
        e.stateNode,
        l,
        a
      ), Wi(e, a), $e !== 4 && ($e = 2)), !1;
    var i = Error(c(520), { cause: l });
    if (i = Mt(i, n), Za === null ? Za = [i] : Za.push(i), $e !== 4 && ($e = 2), t === null) return !0;
    l = Mt(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = So(n.stateNode, l, e), Wi(n, e), !1;
        case 1:
          if (t = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Mn === null || !Mn.has(i))))
            return n.flags |= 65536, a &= -a, n.lanes |= a, a = xf(a), bf(
              a,
              e,
              n,
              l
            ), Wi(n, a), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var jo = Error(c(461)), Ke = !1;
  function nt(e, t, n, l) {
    t.child = e === null ? Sd(t, null, n, l) : il(
      t,
      e.child,
      n,
      l
    );
  }
  function yf(e, t, n, l, a) {
    n = n.render;
    var i = t.ref;
    if ("ref" in l) {
      var d = {};
      for (var h in l)
        h !== "ref" && (d[h] = l[h]);
    } else d = l;
    return ll(t), l = no(
      e,
      t,
      n,
      d,
      i,
      a
    ), h = lo(), e !== null && !Ke ? (ao(e, t, a), an(e, t, a)) : (ve && h && Li(t), t.flags |= 1, nt(e, t, l, a), t.child);
  }
  function vf(e, t, n, l, a) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !Ri(i) && i.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = i, Sf(
        e,
        t,
        i,
        l,
        a
      )) : (e = Ur(
        n.type,
        null,
        l,
        t,
        t.mode,
        a
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !zo(e, a)) {
      var d = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Ea, n(d, l) && e.ref === t.ref)
        return an(e, t, a);
    }
    return t.flags |= 1, e = It(i, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Sf(e, t, n, l, a) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Ea(i, l) && e.ref === t.ref)
        if (Ke = !1, t.pendingProps = l = i, zo(e, a))
          (e.flags & 131072) !== 0 && (Ke = !0);
        else
          return t.lanes = e.lanes, an(e, t, a);
    }
    return Co(
      e,
      t,
      n,
      l,
      a
    );
  }
  function jf(e, t, n, l) {
    var a = l.children, i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, a = 0; l !== null; )
            a = a | l.lanes | l.childLanes, l = l.sibling;
          l = a & ~i;
        } else l = 0, t.child = null;
        return Cf(
          e,
          t,
          i,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && qr(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? Nd(t, i) : Ii(), Ed(t);
      else
        return l = t.lanes = 536870912, Cf(
          e,
          t,
          i !== null ? i.baseLanes | n : n,
          n,
          l
        );
    } else
      i !== null ? (qr(t, i.cachePool), Nd(t, i), _n(), t.memoizedState = null) : (e !== null && qr(t, null), Ii(), _n());
    return nt(e, t, a, n), t.child;
  }
  function qa(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Cf(e, t, n, l, a) {
    var i = Qi();
    return i = i === null ? null : { parent: Qe._currentValue, pool: i }, t.memoizedState = {
      baseLanes: n,
      cachePool: i
    }, e !== null && qr(t, null), Ii(), Ed(t), e !== null && Ul(e, t, l, !0), t.childLanes = a, null;
  }
  function ns(e, t) {
    return t = as(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Nf(e, t, n) {
    return il(t, e.child, null, n), e = ns(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function V2(e, t, n) {
    var l = t.pendingProps, a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ve) {
        if (l.mode === "hidden")
          return e = ns(t, l), t.lanes = 536870912, qa(null, e);
        if (eo(t), (e = Be) ? (e = U0(
          e,
          Dt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: vn !== null ? { id: Yt, overflow: $t } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = sd(e), n.return = t, t.child = n, et = t, Be = null)) : e = null, e === null) throw jn(t);
        return t.lanes = 536870912, null;
      }
      return ns(t, l);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var d = i.dehydrated;
      if (eo(t), a)
        if (t.flags & 256)
          t.flags &= -257, t = Nf(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Ke || Ul(e, t, n, !1), a = (n & e.childLanes) !== 0, Ke || a) {
        if (l = De, l !== null && (d = mu(l, n), d !== 0 && d !== i.retryLane))
          throw i.retryLane = d, Pn(e, d), ht(l, e, d), jo;
        ms(), t = Nf(
          e,
          t,
          n
        );
      } else
        e = i.treeContext, Be = Lt(d.nextSibling), et = t, ve = !0, Sn = null, Dt = !1, e !== null && cd(t, e), t = ns(t, l), t.flags |= 4096;
      return t;
    }
    return e = It(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ls(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(c(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Co(e, t, n, l, a) {
    return ll(t), n = no(
      e,
      t,
      n,
      l,
      void 0,
      a
    ), l = lo(), e !== null && !Ke ? (ao(e, t, a), an(e, t, a)) : (ve && l && Li(t), t.flags |= 1, nt(e, t, n, a), t.child);
  }
  function Ef(e, t, n, l, a, i) {
    return ll(t), t.updateQueue = null, n = wd(
      t,
      l,
      n,
      a
    ), Td(e), l = lo(), e !== null && !Ke ? (ao(e, t, i), an(e, t, i)) : (ve && l && Li(t), t.flags |= 1, nt(e, t, n, i), t.child);
  }
  function Tf(e, t, n, l, a) {
    if (ll(t), t.stateNode === null) {
      var i = Ml, d = n.contextType;
      typeof d == "object" && d !== null && (i = tt(d)), i = new n(l, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = vo, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = l, i.state = t.memoizedState, i.refs = {}, Ki(t), d = n.contextType, i.context = typeof d == "object" && d !== null ? tt(d) : Ml, i.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (yo(
        t,
        n,
        d,
        l
      ), i.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (d = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), d !== i.state && vo.enqueueReplaceState(i, i.state, null), Da(t, l, i, a), Ra(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      i = t.stateNode;
      var h = t.memoizedProps, y = cl(n, h);
      i.props = y;
      var T = i.context, O = n.contextType;
      d = Ml, typeof O == "object" && O !== null && (d = tt(O));
      var B = n.getDerivedStateFromProps;
      O = typeof B == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, O || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || T !== d) && ff(
        t,
        i,
        l,
        d
      ), Nn = !1;
      var w = t.memoizedState;
      i.state = w, Da(t, l, i, a), Ra(), T = t.memoizedState, h || w !== T || Nn ? (typeof B == "function" && (yo(
        t,
        n,
        B,
        l
      ), T = t.memoizedState), (y = Nn || df(
        t,
        n,
        y,
        l,
        w,
        T,
        d
      )) ? (O || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = T), i.props = l, i.state = T, i.context = d, l = y) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      i = t.stateNode, Ji(e, t), d = t.memoizedProps, O = cl(n, d), i.props = O, B = t.pendingProps, w = i.context, T = n.contextType, y = Ml, typeof T == "object" && T !== null && (y = tt(T)), h = n.getDerivedStateFromProps, (T = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (d !== B || w !== y) && ff(
        t,
        i,
        l,
        y
      ), Nn = !1, w = t.memoizedState, i.state = w, Da(t, l, i, a), Ra();
      var k = t.memoizedState;
      d !== B || w !== k || Nn || e !== null && e.dependencies !== null && Br(e.dependencies) ? (typeof h == "function" && (yo(
        t,
        n,
        h,
        l
      ), k = t.memoizedState), (O = Nn || df(
        t,
        n,
        O,
        l,
        w,
        k,
        y
      ) || e !== null && e.dependencies !== null && Br(e.dependencies)) ? (T || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, k, y), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        l,
        k,
        y
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || d === e.memoizedProps && w === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && w === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = k), i.props = l, i.state = k, i.context = y, l = O) : (typeof i.componentDidUpdate != "function" || d === e.memoizedProps && w === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && w === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return i = l, ls(e, t), l = (t.flags & 128) !== 0, i || l ? (i = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && l ? (t.child = il(
      t,
      e.child,
      null,
      a
    ), t.child = il(
      t,
      null,
      n,
      a
    )) : nt(e, t, n, a), t.memoizedState = i.state, e = t.child) : e = an(
      e,
      t,
      a
    ), e;
  }
  function wf(e, t, n, l) {
    return tl(), t.flags |= 256, nt(e, t, n, l), t.child;
  }
  var No = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Eo(e) {
    return { baseLanes: e, cachePool: gd() };
  }
  function To(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Et), e;
  }
  function _f(e, t, n) {
    var l = t.pendingProps, a = !1, i = (t.flags & 128) !== 0, d;
    if ((d = i) || (d = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0), d && (a = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ve) {
        if (a ? wn(t) : _n(), (e = Be) ? (e = U0(
          e,
          Dt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: vn !== null ? { id: Yt, overflow: $t } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = sd(e), n.return = t, t.child = n, et = t, Be = null)) : e = null, e === null) throw jn(t);
        return oc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var h = l.children;
      return l = l.fallback, a ? (_n(), a = t.mode, h = as(
        { mode: "hidden", children: h },
        a
      ), l = el(
        l,
        a,
        n,
        null
      ), h.return = t, l.return = t, h.sibling = l, t.child = h, l = t.child, l.memoizedState = Eo(n), l.childLanes = To(
        e,
        d,
        n
      ), t.memoizedState = No, qa(null, l)) : (wn(t), wo(t, h));
    }
    var y = e.memoizedState;
    if (y !== null && (h = y.dehydrated, h !== null)) {
      if (i)
        t.flags & 256 ? (wn(t), t.flags &= -257, t = _o(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (_n(), t.child = e.child, t.flags |= 128, t = null) : (_n(), h = l.fallback, a = t.mode, l = as(
          { mode: "visible", children: l.children },
          a
        ), h = el(
          h,
          a,
          n,
          null
        ), h.flags |= 2, l.return = t, h.return = t, l.sibling = h, t.child = l, il(
          t,
          e.child,
          null,
          n
        ), l = t.child, l.memoizedState = Eo(n), l.childLanes = To(
          e,
          d,
          n
        ), t.memoizedState = No, t = qa(null, l));
      else if (wn(t), oc(h)) {
        if (d = h.nextSibling && h.nextSibling.dataset, d) var T = d.dgst;
        d = T, l = Error(c(419)), l.stack = "", l.digest = d, _a({ value: l, source: null, stack: null }), t = _o(
          e,
          t,
          n
        );
      } else if (Ke || Ul(e, t, n, !1), d = (n & e.childLanes) !== 0, Ke || d) {
        if (d = De, d !== null && (l = mu(d, n), l !== 0 && l !== y.retryLane))
          throw y.retryLane = l, Pn(e, l), ht(d, e, l), jo;
        ic(h) || ms(), t = _o(
          e,
          t,
          n
        );
      } else
        ic(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = y.treeContext, Be = Lt(
          h.nextSibling
        ), et = t, ve = !0, Sn = null, Dt = !1, e !== null && cd(t, e), t = wo(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return a ? (_n(), h = l.fallback, a = t.mode, y = e.child, T = y.sibling, l = It(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 65011712, T !== null ? h = It(
      T,
      h
    ) : (h = el(
      h,
      a,
      n,
      null
    ), h.flags |= 2), h.return = t, l.return = t, l.sibling = h, t.child = l, qa(null, l), l = t.child, h = e.child.memoizedState, h === null ? h = Eo(n) : (a = h.cachePool, a !== null ? (y = Qe._currentValue, a = a.parent !== y ? { parent: y, pool: y } : a) : a = gd(), h = {
      baseLanes: h.baseLanes | n,
      cachePool: a
    }), l.memoizedState = h, l.childLanes = To(
      e,
      d,
      n
    ), t.memoizedState = No, qa(e.child, l)) : (wn(t), n = e.child, e = n.sibling, n = It(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function wo(e, t) {
    return t = as(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function as(e, t) {
    return e = St(22, e, null, t), e.lanes = 0, e;
  }
  function _o(e, t, n) {
    return il(t, e.child, null, n), e = wo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function kf(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Yi(e.return, t, n);
  }
  function ko(e, t, n, l, a, i) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: a,
      treeForkCount: i
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = l, d.tail = n, d.tailMode = a, d.treeForkCount = i);
  }
  function zf(e, t, n) {
    var l = t.pendingProps, a = l.revealOrder, i = l.tail;
    l = l.children;
    var d = Ve.current, h = (d & 2) !== 0;
    if (h ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, Z(Ve, d), nt(e, t, l, n), l = ve ? wa : 0, !h && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && kf(e, n, t);
        else if (e.tag === 19)
          kf(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (a) {
      case "forwards":
        for (n = t.child, a = null; n !== null; )
          e = n.alternate, e !== null && Qr(e) === null && (a = n), n = n.sibling;
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), ko(
          t,
          !1,
          a,
          n,
          i,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, a = t.child, t.child = null; a !== null; ) {
          if (e = a.alternate, e !== null && Qr(e) === null) {
            t.child = a;
            break;
          }
          e = a.sibling, a.sibling = n, n = a, a = e;
        }
        ko(
          t,
          !0,
          n,
          null,
          i,
          l
        );
        break;
      case "together":
        ko(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function an(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), An |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Ul(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, n = It(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = It(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function zo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Br(e)));
  }
  function X2(e, t, n) {
    switch (t.tag) {
      case 3:
        Re(t, t.stateNode.containerInfo), Cn(t, Qe, e.memoizedState.cache), tl();
        break;
      case 27:
      case 5:
        Qn(t);
        break;
      case 4:
        Re(t, t.stateNode.containerInfo);
        break;
      case 10:
        Cn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, eo(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (wn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? _f(e, t, n) : (wn(t), e = an(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        wn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (Ul(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), a) {
          if (l)
            return zf(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Z(Ve, Ve.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, jf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Cn(t, Qe, e.memoizedState.cache);
    }
    return an(e, t, n);
  }
  function Af(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ke = !0;
      else {
        if (!zo(e, n) && (t.flags & 128) === 0)
          return Ke = !1, X2(
            e,
            t,
            n
          );
        Ke = (e.flags & 131072) !== 0;
      }
    else
      Ke = !1, ve && (t.flags & 1048576) !== 0 && od(t, wa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = rl(t.elementType), t.type = e, typeof e == "function")
            Ri(e) ? (l = cl(e, l), t.tag = 1, t = Tf(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Co(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === xe) {
                t.tag = 11, t = yf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === Y) {
                t.tag = 14, t = vf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              }
            }
            throw t = Ne(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return Co(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, a = cl(
          l,
          t.pendingProps
        ), Tf(
          e,
          t,
          l,
          a,
          n
        );
      case 3:
        e: {
          if (Re(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          a = i.element, Ji(e, t), Da(t, l, null, n);
          var d = t.memoizedState;
          if (l = d.cache, Cn(t, Qe, l), l !== i.cache && $i(
            t,
            [Qe],
            n,
            !0
          ), Ra(), l = d.element, i.isDehydrated)
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = wf(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== a) {
              a = Mt(
                Error(c(424)),
                t
              ), _a(a), t = wf(
                e,
                t,
                l,
                n
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Be = Lt(e.firstChild), et = t, ve = !0, Sn = null, Dt = !0, n = Sd(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (tl(), l === a) {
              t = an(
                e,
                t,
                n
              );
              break e;
            }
            nt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ls(e, t), e === null ? (n = Y0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : ve || (n = t.type, e = t.pendingProps, l = vs(
          Q.current
        ).createElement(n), l[Pe] = t, l[ot] = e, lt(l, n, e), Fe(l), t.stateNode = l) : t.memoizedState = Y0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Qn(t), e === null && ve && (l = t.stateNode = H0(
          t.type,
          t.pendingProps,
          Q.current
        ), et = t, Dt = !0, a = Be, Un(t.type) ? (cc = a, Be = Lt(l.firstChild)) : Be = a), nt(
          e,
          t,
          t.pendingProps.children,
          n
        ), ls(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ve && ((a = l = Be) && (l = Sh(
          l,
          t.type,
          t.pendingProps,
          Dt
        ), l !== null ? (t.stateNode = l, et = t, Be = Lt(l.firstChild), Dt = !1, a = !0) : a = !1), a || jn(t)), Qn(t), a = t.type, i = t.pendingProps, d = e !== null ? e.memoizedProps : null, l = i.children, ac(a, i) ? l = null : d !== null && ac(a, d) && (t.flags |= 32), t.memoizedState !== null && (a = no(
          e,
          t,
          U2,
          null,
          null,
          n
        ), tr._currentValue = a), ls(e, t), nt(e, t, l, n), t.child;
      case 6:
        return e === null && ve && ((e = n = Be) && (n = jh(
          n,
          t.pendingProps,
          Dt
        ), n !== null ? (t.stateNode = n, et = t, Be = null, e = !0) : e = !1), e || jn(t)), null;
      case 13:
        return _f(e, t, n);
      case 4:
        return Re(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = il(
          t,
          null,
          l,
          n
        ) : nt(e, t, l, n), t.child;
      case 11:
        return yf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return nt(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return nt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return nt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return l = t.pendingProps, Cn(t, t.type, l.value), nt(e, t, l.children, n), t.child;
      case 9:
        return a = t.type._context, l = t.pendingProps.children, ll(t), a = tt(a), l = l(a), t.flags |= 1, nt(e, t, l, n), t.child;
      case 14:
        return vf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Sf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return zf(e, t, n);
      case 31:
        return V2(e, t, n);
      case 22:
        return jf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return ll(t), l = tt(Qe), e === null ? (a = Qi(), a === null && (a = De, i = Vi(), a.pooledCache = i, i.refCount++, i !== null && (a.pooledCacheLanes |= n), a = i), t.memoizedState = { parent: l, cache: a }, Ki(t), Cn(t, Qe, a)) : ((e.lanes & n) !== 0 && (Ji(e, t), Da(t, null, null, n), Ra()), a = e.memoizedState, i = t.memoizedState, a.parent !== l ? (a = { parent: l, cache: l }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Cn(t, Qe, l)) : (l = i.cache, Cn(t, Qe, l), l !== a.cache && $i(
          t,
          [Qe],
          n,
          !0
        ))), nt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function rn(e) {
    e.flags |= 4;
  }
  function Ao(e, t, n, l, a) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (a & 335544128) === a)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (a0()) e.flags |= 8192;
        else
          throw sl = Yr, Zi;
    } else e.flags &= -16777217;
  }
  function Mf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Z0(t))
      if (a0()) e.flags |= 8192;
      else
        throw sl = Yr, Zi;
  }
  function rs(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? uu() : 536870912, e.lanes |= t, Kl |= t);
  }
  function Ga(e, t) {
    if (!ve)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function He(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 65011712, l |= a.flags & 65011712, a.return = e, a = a.sibling;
    else
      for (a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function Q2(e, t, n) {
    var l = t.pendingProps;
    switch (Bi(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return He(t), null;
      case 1:
        return He(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), tn(Qe), we(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Dl(t) ? rn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, qi())), He(t), null;
      case 26:
        var a = t.type, i = t.memoizedState;
        return e === null ? (rn(t), i !== null ? (He(t), Mf(t, i)) : (He(t), Ao(
          t,
          a,
          null,
          l,
          n
        ))) : i ? i !== e.memoizedState ? (rn(t), He(t), Mf(t, i)) : (He(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && rn(t), He(t), Ao(
          t,
          a,
          e,
          l,
          n
        )), null;
      case 27:
        if (pr(t), n = Q.current, a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && rn(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return He(t), null;
          }
          e = M.current, Dl(t) ? ud(t) : (e = H0(a, l, n), t.stateNode = e, rn(t));
        }
        return He(t), null;
      case 5:
        if (pr(t), a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && rn(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return He(t), null;
          }
          if (i = M.current, Dl(t))
            ud(t);
          else {
            var d = vs(
              Q.current
            );
            switch (i) {
              case 1:
                i = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                i = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    i = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    i = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    i = d.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof l.is == "string" ? d.createElement("select", {
                      is: l.is
                    }) : d.createElement("select"), l.multiple ? i.multiple = !0 : l.size && (i.size = l.size);
                    break;
                  default:
                    i = typeof l.is == "string" ? d.createElement(a, { is: l.is }) : d.createElement(a);
                }
            }
            i[Pe] = t, i[ot] = l;
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                i.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t)
                  break e;
                d = d.return;
              }
              d.sibling.return = d.return, d = d.sibling;
            }
            t.stateNode = i;
            e: switch (lt(i, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && rn(t);
          }
        }
        return He(t), Ao(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && rn(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = Q.current, Dl(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, a = et, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            e[Pe] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || _0(e.nodeValue, n)), e || jn(t, !0);
          } else
            e = vs(e).createTextNode(
              l
            ), e[Pe] = t, t.stateNode = e;
        }
        return He(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Dl(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Pe] = t;
            } else
              tl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            He(t), e = !1;
          } else
            n = qi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return He(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Dl(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(c(317));
              a[Pe] = t;
            } else
              tl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            He(t), a = !1;
          } else
            a = qi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), i = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== a && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), rs(t, t.updateQueue), He(t), null);
      case 4:
        return we(), e === null && Po(t.stateNode.containerInfo), He(t), null;
      case 10:
        return tn(t.type), He(t), null;
      case 19:
        if (L(Ve), l = t.memoizedState, l === null) return He(t), null;
        if (a = (t.flags & 128) !== 0, i = l.rendering, i === null)
          if (a) Ga(l, !1);
          else {
            if ($e !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = Qr(e), i !== null) {
                  for (t.flags |= 128, Ga(l, !1), e = i.updateQueue, t.updateQueue = e, rs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    rd(n, e), n = n.sibling;
                  return Z(
                    Ve,
                    Ve.current & 1 | 2
                  ), ve && Pt(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && xt() > us && (t.flags |= 128, a = !0, Ga(l, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (e = Qr(i), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, rs(t, e), Ga(l, !0), l.tail === null && l.tailMode === "hidden" && !i.alternate && !ve)
                return He(t), null;
            } else
              2 * xt() - l.renderingStartTime > us && n !== 536870912 && (t.flags |= 128, a = !0, Ga(l, !1), t.lanes = 4194304);
          l.isBackwards ? (i.sibling = t.child, t.child = i) : (e = l.last, e !== null ? e.sibling = i : t.child = i, l.last = i);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = xt(), e.sibling = null, n = Ve.current, Z(
          Ve,
          a ? n & 1 | 2 : n & 1
        ), ve && Pt(t, l.treeForkCount), e) : (He(t), null);
      case 22:
      case 23:
        return Ct(t), Pi(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (He(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : He(t), n = t.updateQueue, n !== null && rs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && L(al), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), tn(Qe), He(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Z2(e, t) {
    switch (Bi(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return tn(Qe), we(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return pr(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null)
            throw Error(c(340));
          tl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          tl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return L(Ve), null;
      case 4:
        return we(), null;
      case 10:
        return tn(t.type), null;
      case 22:
      case 23:
        return Ct(t), Pi(), e !== null && L(al), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return tn(Qe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Of(e, t) {
    switch (Bi(t), t.tag) {
      case 3:
        tn(Qe), we();
        break;
      case 26:
      case 27:
      case 5:
        pr(t);
        break;
      case 4:
        we();
        break;
      case 31:
        t.memoizedState !== null && Ct(t);
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        L(Ve);
        break;
      case 10:
        tn(t.type);
        break;
      case 22:
      case 23:
        Ct(t), Pi(), e !== null && L(al);
        break;
      case 24:
        tn(Qe);
    }
  }
  function Ya(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var i = n.create, d = n.inst;
            l = i(), d.destroy = l;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (h) {
      ze(t, t.return, h);
    }
  }
  function kn(e, t, n) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            var d = l.inst, h = d.destroy;
            if (h !== void 0) {
              d.destroy = void 0, a = t;
              var y = n, T = h;
              try {
                T();
              } catch (O) {
                ze(
                  a,
                  y,
                  O
                );
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (O) {
      ze(t, t.return, O);
    }
  }
  function Rf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Cd(t, n);
      } catch (l) {
        ze(e, e.return, l);
      }
    }
  }
  function Df(e, t, n) {
    n.props = cl(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      ze(e, t, l);
    }
  }
  function $a(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (a) {
      ze(e, t, a);
    }
  }
  function Vt(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          ze(e, t, a);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          ze(e, t, a);
        }
      else n.current = null;
  }
  function Uf(e) {
    var t = e.type, n = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      ze(e, e.return, a);
    }
  }
  function Mo(e, t, n) {
    try {
      var l = e.stateNode;
      gh(l, e.type, n, t), l[ot] = t;
    } catch (a) {
      ze(e, e.return, a);
    }
  }
  function Lf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Un(e.type) || e.tag === 4;
  }
  function Oo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Lf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Un(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ro(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wt));
    else if (l !== 4 && (l === 27 && Un(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Ro(e, t, n), e = e.sibling; e !== null; )
        Ro(e, t, n), e = e.sibling;
  }
  function ss(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (l !== 4 && (l === 27 && Un(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (ss(e, t, n), e = e.sibling; e !== null; )
        ss(e, t, n), e = e.sibling;
  }
  function Bf(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      lt(t, l, n), t[Pe] = e, t[ot] = n;
    } catch (i) {
      ze(e, e.return, i);
    }
  }
  var sn = !1, Je = !1, Do = !1, Hf = typeof WeakSet == "function" ? WeakSet : Set, Ie = null;
  function K2(e, t) {
    if (e = e.containerInfo, nc = ws, e = Wu(e), wi(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var a = l.anchorOffset, i = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, i.nodeType;
            } catch {
              n = null;
              break e;
            }
            var d = 0, h = -1, y = -1, T = 0, O = 0, B = e, w = null;
            t: for (; ; ) {
              for (var k; B !== n || a !== 0 && B.nodeType !== 3 || (h = d + a), B !== i || l !== 0 && B.nodeType !== 3 || (y = d + l), B.nodeType === 3 && (d += B.nodeValue.length), (k = B.firstChild) !== null; )
                w = B, B = k;
              for (; ; ) {
                if (B === e) break t;
                if (w === n && ++T === a && (h = d), w === i && ++O === l && (y = d), (k = B.nextSibling) !== null) break;
                B = w, w = B.parentNode;
              }
              B = k;
            }
            n = h === -1 || y === -1 ? null : { start: h, end: y };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (lc = { focusedElem: e, selectionRange: n }, ws = !1, Ie = t; Ie !== null; )
      if (t = Ie, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ie = e;
      else
        for (; Ie !== null; ) {
          switch (t = Ie, i = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  a = e[n], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                e = void 0, n = t, a = i.memoizedProps, i = i.memoizedState, l = n.stateNode;
                try {
                  var J = cl(
                    n.type,
                    a
                  );
                  e = l.getSnapshotBeforeUpdate(
                    J,
                    i
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (re) {
                  ze(
                    n,
                    n.return,
                    re
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  sc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      sc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ie = e;
            break;
          }
          Ie = t.return;
        }
  }
  function qf(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        cn(e, n), l & 4 && Ya(5, n);
        break;
      case 1:
        if (cn(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              ze(n, n.return, d);
            }
          else {
            var a = cl(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                a,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (d) {
              ze(
                n,
                n.return,
                d
              );
            }
          }
        l & 64 && Rf(n), l & 512 && $a(n, n.return);
        break;
      case 3:
        if (cn(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Cd(e, t);
          } catch (d) {
            ze(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Bf(n);
      case 26:
      case 5:
        cn(e, n), t === null && l & 4 && Uf(n), l & 512 && $a(n, n.return);
        break;
      case 12:
        cn(e, n);
        break;
      case 31:
        cn(e, n), l & 4 && $f(e, n);
        break;
      case 13:
        cn(e, n), l & 4 && Vf(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = lh.bind(
          null,
          n
        ), Ch(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || sn, !l) {
          t = t !== null && t.memoizedState !== null || Je, a = sn;
          var i = Je;
          sn = l, (Je = t) && !i ? un(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : cn(e, n), sn = a, Je = i;
        }
        break;
      case 30:
        break;
      default:
        cn(e, n);
    }
  }
  function Gf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Gf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ui(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ge = null, ut = !1;
  function on(e, t, n) {
    for (n = n.child; n !== null; )
      Yf(e, t, n), n = n.sibling;
  }
  function Yf(e, t, n) {
    if (bt && typeof bt.onCommitFiberUnmount == "function")
      try {
        bt.onCommitFiberUnmount(ma, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Je || Vt(n, t), on(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Je || Vt(n, t);
        var l = Ge, a = ut;
        Un(n.type) && (Ge = n.stateNode, ut = !1), on(
          e,
          t,
          n
        ), Ia(n.stateNode), Ge = l, ut = a;
        break;
      case 5:
        Je || Vt(n, t);
      case 6:
        if (l = Ge, a = ut, Ge = null, on(
          e,
          t,
          n
        ), Ge = l, ut = a, Ge !== null)
          if (ut)
            try {
              (Ge.nodeType === 9 ? Ge.body : Ge.nodeName === "HTML" ? Ge.ownerDocument.body : Ge).removeChild(n.stateNode);
            } catch (i) {
              ze(
                n,
                t,
                i
              );
            }
          else
            try {
              Ge.removeChild(n.stateNode);
            } catch (i) {
              ze(
                n,
                t,
                i
              );
            }
        break;
      case 18:
        Ge !== null && (ut ? (e = Ge, R0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), na(e)) : R0(Ge, n.stateNode));
        break;
      case 4:
        l = Ge, a = ut, Ge = n.stateNode.containerInfo, ut = !0, on(
          e,
          t,
          n
        ), Ge = l, ut = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        kn(2, n, t), Je || kn(4, n, t), on(
          e,
          t,
          n
        );
        break;
      case 1:
        Je || (Vt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && Df(
          n,
          t,
          l
        )), on(
          e,
          t,
          n
        );
        break;
      case 21:
        on(
          e,
          t,
          n
        );
        break;
      case 22:
        Je = (l = Je) || n.memoizedState !== null, on(
          e,
          t,
          n
        ), Je = l;
        break;
      default:
        on(
          e,
          t,
          n
        );
    }
  }
  function $f(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        na(e);
      } catch (n) {
        ze(t, t.return, n);
      }
    }
  }
  function Vf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        na(e);
      } catch (n) {
        ze(t, t.return, n);
      }
  }
  function J2(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Hf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Hf()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function is(e, t) {
    var n = J2(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var a = ah.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function dt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l], i = e, d = t, h = d;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Un(h.type)) {
                Ge = h.stateNode, ut = !1;
                break e;
              }
              break;
            case 5:
              Ge = h.stateNode, ut = !1;
              break e;
            case 3:
            case 4:
              Ge = h.stateNode.containerInfo, ut = !0;
              break e;
          }
          h = h.return;
        }
        if (Ge === null) throw Error(c(160));
        Yf(i, d, a), Ge = null, ut = !1, i = a.alternate, i !== null && (i.return = null), a.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Xf(t, e), t = t.sibling;
  }
  var qt = null;
  function Xf(e, t) {
    var n = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dt(t, e), ft(e), l & 4 && (kn(3, e, e.return), Ya(3, e), kn(5, e, e.return));
        break;
      case 1:
        dt(t, e), ft(e), l & 512 && (Je || n === null || Vt(n, n.return)), l & 64 && sn && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var a = qt;
        if (dt(t, e), ft(e), l & 512 && (Je || n === null || Vt(n, n.return)), l & 4) {
          var i = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
                  t: switch (l) {
                    case "title":
                      i = a.getElementsByTagName("title")[0], (!i || i[pa] || i[Pe] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = a.createElement(l), a.head.insertBefore(
                        i,
                        a.querySelector("head > title")
                      )), lt(i, l, n), i[Pe] = e, Fe(i), l = i;
                      break e;
                    case "link":
                      var d = X0(
                        "link",
                        "href",
                        a
                      ).get(l + (n.href || ""));
                      if (d) {
                        for (var h = 0; h < d.length; h++)
                          if (i = d[h], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            d.splice(h, 1);
                            break t;
                          }
                      }
                      i = a.createElement(l), lt(i, l, n), a.head.appendChild(i);
                      break;
                    case "meta":
                      if (d = X0(
                        "meta",
                        "content",
                        a
                      ).get(l + (n.content || ""))) {
                        for (h = 0; h < d.length; h++)
                          if (i = d[h], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            d.splice(h, 1);
                            break t;
                          }
                      }
                      i = a.createElement(l), lt(i, l, n), a.head.appendChild(i);
                      break;
                    default:
                      throw Error(c(468, l));
                  }
                  i[Pe] = e, Fe(i), l = i;
                }
                e.stateNode = l;
              } else
                Q0(
                  a,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = V0(
                a,
                l,
                e.memoizedProps
              );
          else
            i !== l ? (i === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : i.count--, l === null ? Q0(
              a,
              e.type,
              e.stateNode
            ) : V0(
              a,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Mo(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        dt(t, e), ft(e), l & 512 && (Je || n === null || Vt(n, n.return)), n !== null && l & 4 && Mo(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (dt(t, e), ft(e), l & 512 && (Je || n === null || Vt(n, n.return)), e.flags & 32) {
          a = e.stateNode;
          try {
            El(a, "");
          } catch (J) {
            ze(e, e.return, J);
          }
        }
        l & 4 && e.stateNode != null && (a = e.memoizedProps, Mo(
          e,
          a,
          n !== null ? n.memoizedProps : a
        )), l & 1024 && (Do = !0);
        break;
      case 6:
        if (dt(t, e), ft(e), l & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (J) {
            ze(e, e.return, J);
          }
        }
        break;
      case 3:
        if (Cs = null, a = qt, qt = Ss(t.containerInfo), dt(t, e), qt = a, ft(e), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            na(t.containerInfo);
          } catch (J) {
            ze(e, e.return, J);
          }
        Do && (Do = !1, Qf(e));
        break;
      case 4:
        l = qt, qt = Ss(
          e.stateNode.containerInfo
        ), dt(t, e), ft(e), qt = l;
        break;
      case 12:
        dt(t, e), ft(e);
        break;
      case 31:
        dt(t, e), ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, is(e, l)));
        break;
      case 13:
        dt(t, e), ft(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (cs = xt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, is(e, l)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var y = n !== null && n.memoizedState !== null, T = sn, O = Je;
        if (sn = T || a, Je = O || y, dt(t, e), Je = O, sn = T, ft(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || y || sn || Je || ul(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                y = n = t;
                try {
                  if (i = y.stateNode, a)
                    d = i.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    h = y.stateNode;
                    var B = y.memoizedProps.style, w = B != null && B.hasOwnProperty("display") ? B.display : null;
                    h.style.display = w == null || typeof w == "boolean" ? "" : ("" + w).trim();
                  }
                } catch (J) {
                  ze(y, y.return, J);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                y = t;
                try {
                  y.stateNode.nodeValue = a ? "" : y.memoizedProps;
                } catch (J) {
                  ze(y, y.return, J);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                y = t;
                try {
                  var k = y.stateNode;
                  a ? D0(k, !0) : D0(y.stateNode, !1);
                } catch (J) {
                  ze(y, y.return, J);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), t = t.return;
            }
            n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, is(e, n))));
        break;
      case 19:
        dt(t, e), ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, is(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        dt(t, e), ft(e);
    }
  }
  function ft(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (Lf(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode, i = Oo(e);
            ss(e, i, a);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (El(d, ""), n.flags &= -33);
            var h = Oo(e);
            ss(e, h, d);
            break;
          case 3:
          case 4:
            var y = n.stateNode.containerInfo, T = Oo(e);
            Ro(
              e,
              T,
              y
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (O) {
        ze(e, e.return, O);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Qf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Qf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function cn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        qf(e, t.alternate, t), t = t.sibling;
  }
  function ul(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          kn(4, t, t.return), ul(t);
          break;
        case 1:
          Vt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Df(
            t,
            t.return,
            n
          ), ul(t);
          break;
        case 27:
          Ia(t.stateNode);
        case 26:
        case 5:
          Vt(t, t.return), ul(t);
          break;
        case 22:
          t.memoizedState === null && ul(t);
          break;
        case 30:
          ul(t);
          break;
        default:
          ul(t);
      }
      e = e.sibling;
    }
  }
  function un(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, a = e, i = t, d = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          un(
            a,
            i,
            n
          ), Ya(4, i);
          break;
        case 1:
          if (un(
            a,
            i,
            n
          ), l = i, a = l.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (T) {
              ze(l, l.return, T);
            }
          if (l = i, a = l.updateQueue, a !== null) {
            var h = l.stateNode;
            try {
              var y = a.shared.hiddenCallbacks;
              if (y !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < y.length; a++)
                  jd(y[a], h);
            } catch (T) {
              ze(l, l.return, T);
            }
          }
          n && d & 64 && Rf(i), $a(i, i.return);
          break;
        case 27:
          Bf(i);
        case 26:
        case 5:
          un(
            a,
            i,
            n
          ), n && l === null && d & 4 && Uf(i), $a(i, i.return);
          break;
        case 12:
          un(
            a,
            i,
            n
          );
          break;
        case 31:
          un(
            a,
            i,
            n
          ), n && d & 4 && $f(a, i);
          break;
        case 13:
          un(
            a,
            i,
            n
          ), n && d & 4 && Vf(a, i);
          break;
        case 22:
          i.memoizedState === null && un(
            a,
            i,
            n
          ), $a(i, i.return);
          break;
        case 30:
          break;
        default:
          un(
            a,
            i,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Uo(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ka(n));
  }
  function Lo(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ka(e));
  }
  function Gt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Zf(
          e,
          t,
          n,
          l
        ), t = t.sibling;
  }
  function Zf(e, t, n, l) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Gt(
          e,
          t,
          n,
          l
        ), a & 2048 && Ya(9, t);
        break;
      case 1:
        Gt(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        Gt(
          e,
          t,
          n,
          l
        ), a & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ka(e)));
        break;
      case 12:
        if (a & 2048) {
          Gt(
            e,
            t,
            n,
            l
          ), e = t.stateNode;
          try {
            var i = t.memoizedProps, d = i.id, h = i.onPostCommit;
            typeof h == "function" && h(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (y) {
            ze(t, t.return, y);
          }
        } else
          Gt(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        Gt(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        Gt(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, d = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? Gt(
          e,
          t,
          n,
          l
        ) : Va(e, t) : i._visibility & 2 ? Gt(
          e,
          t,
          n,
          l
        ) : (i._visibility |= 2, Xl(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Uo(d, t);
        break;
      case 24:
        Gt(
          e,
          t,
          n,
          l
        ), a & 2048 && Lo(t.alternate, t);
        break;
      default:
        Gt(
          e,
          t,
          n,
          l
        );
    }
  }
  function Xl(e, t, n, l, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e, d = t, h = n, y = l, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Xl(
            i,
            d,
            h,
            y,
            a
          ), Ya(8, d);
          break;
        case 23:
          break;
        case 22:
          var O = d.stateNode;
          d.memoizedState !== null ? O._visibility & 2 ? Xl(
            i,
            d,
            h,
            y,
            a
          ) : Va(
            i,
            d
          ) : (O._visibility |= 2, Xl(
            i,
            d,
            h,
            y,
            a
          )), a && T & 2048 && Uo(
            d.alternate,
            d
          );
          break;
        case 24:
          Xl(
            i,
            d,
            h,
            y,
            a
          ), a && T & 2048 && Lo(d.alternate, d);
          break;
        default:
          Xl(
            i,
            d,
            h,
            y,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Va(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, a = l.flags;
        switch (l.tag) {
          case 22:
            Va(n, l), a & 2048 && Uo(
              l.alternate,
              l
            );
            break;
          case 24:
            Va(n, l), a & 2048 && Lo(l.alternate, l);
            break;
          default:
            Va(n, l);
        }
        t = t.sibling;
      }
  }
  var Xa = 8192;
  function Ql(e, t, n) {
    if (e.subtreeFlags & Xa)
      for (e = e.child; e !== null; )
        Kf(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Kf(e, t, n) {
    switch (e.tag) {
      case 26:
        Ql(
          e,
          t,
          n
        ), e.flags & Xa && e.memoizedState !== null && Dh(
          n,
          qt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ql(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var l = qt;
        qt = Ss(e.stateNode.containerInfo), Ql(
          e,
          t,
          n
        ), qt = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Xa, Xa = 16777216, Ql(
          e,
          t,
          n
        ), Xa = l) : Ql(
          e,
          t,
          n
        ));
        break;
      default:
        Ql(
          e,
          t,
          n
        );
    }
  }
  function Jf(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Qa(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Ie = l, Ff(
            l,
            e
          );
        }
      Jf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Wf(e), e = e.sibling;
  }
  function Wf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Qa(e), e.flags & 2048 && kn(9, e, e.return);
        break;
      case 3:
        Qa(e);
        break;
      case 12:
        Qa(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, os(e)) : Qa(e);
        break;
      default:
        Qa(e);
    }
  }
  function os(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          Ie = l, Ff(
            l,
            e
          );
        }
      Jf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          kn(8, t, t.return), os(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, os(t));
          break;
        default:
          os(t);
      }
      e = e.sibling;
    }
  }
  function Ff(e, t) {
    for (; Ie !== null; ) {
      var n = Ie;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          kn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ka(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Ie = l;
      else
        e: for (n = e; Ie !== null; ) {
          l = Ie;
          var a = l.sibling, i = l.return;
          if (Gf(l), l === n) {
            Ie = null;
            break e;
          }
          if (a !== null) {
            a.return = i, Ie = a;
            break e;
          }
          Ie = i;
        }
    }
  }
  var W2 = {
    getCacheForType: function(e) {
      var t = tt(Qe), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return tt(Qe).controller.signal;
    }
  }, F2 = typeof WeakMap == "function" ? WeakMap : Map, _e = 0, De = null, ge = null, be = 0, ke = 0, Nt = null, zn = !1, Zl = !1, Bo = !1, dn = 0, $e = 0, An = 0, dl = 0, Ho = 0, Et = 0, Kl = 0, Za = null, mt = null, qo = !1, cs = 0, If = 0, us = 1 / 0, ds = null, Mn = null, We = 0, On = null, Jl = null, fn = 0, Go = 0, Yo = null, Pf = null, Ka = 0, $o = null;
  function Tt() {
    return (_e & 2) !== 0 && be !== 0 ? be & -be : z.T !== null ? Jo() : hu();
  }
  function e0() {
    if (Et === 0)
      if ((be & 536870912) === 0 || ve) {
        var e = yr;
        yr <<= 1, (yr & 3932160) === 0 && (yr = 262144), Et = e;
      } else Et = 536870912;
    return e = jt.current, e !== null && (e.flags |= 32), Et;
  }
  function ht(e, t, n) {
    (e === De && (ke === 2 || ke === 9) || e.cancelPendingCommit !== null) && (Wl(e, 0), Rn(
      e,
      be,
      Et,
      !1
    )), ga(e, n), ((_e & 2) === 0 || e !== De) && (e === De && ((_e & 2) === 0 && (dl |= n), $e === 4 && Rn(
      e,
      be,
      Et,
      !1
    )), Xt(e));
  }
  function t0(e, t, n) {
    if ((_e & 6) !== 0) throw Error(c(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ha(e, t), a = l ? eh(e, t) : Xo(e, t, !0), i = l;
    do {
      if (a === 0) {
        Zl && !l && Rn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, i && !I2(n)) {
          a = Xo(e, t, !1), i = !1;
          continue;
        }
        if (a === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var h = e;
              a = Za;
              var y = h.current.memoizedState.isDehydrated;
              if (y && (Wl(h, d).flags |= 256), d = Xo(
                h,
                d,
                !1
              ), d !== 2) {
                if (Bo && !y) {
                  h.errorRecoveryDisabledLanes |= i, dl |= i, a = 4;
                  break e;
                }
                i = mt, mt = a, i !== null && (mt === null ? mt = i : mt.push.apply(
                  mt,
                  i
                ));
              }
              a = d;
            }
            if (i = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Wl(e, 0), Rn(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, i = a, i) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Rn(
                l,
                t,
                Et,
                !zn
              );
              break e;
            case 2:
              mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (a = cs + 300 - xt(), 10 < a)) {
            if (Rn(
              l,
              t,
              Et,
              !zn
            ), Sr(l, 0, !0) !== 0) break e;
            fn = t, l.timeoutHandle = M0(
              n0.bind(
                null,
                l,
                n,
                mt,
                ds,
                qo,
                t,
                Et,
                dl,
                Kl,
                zn,
                i,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break e;
          }
          n0(
            l,
            n,
            mt,
            ds,
            qo,
            t,
            Et,
            dl,
            Kl,
            zn,
            i,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Xt(e);
  }
  function n0(e, t, n, l, a, i, d, h, y, T, O, B, w, k) {
    if (e.timeoutHandle = -1, B = t.subtreeFlags, B & 8192 || (B & 16785408) === 16785408) {
      B = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wt
      }, Kf(
        t,
        i,
        B
      );
      var J = (i & 62914560) === i ? cs - xt() : (i & 4194048) === i ? If - xt() : 0;
      if (J = Uh(
        B,
        J
      ), J !== null) {
        fn = i, e.cancelPendingCommit = J(
          u0.bind(
            null,
            e,
            t,
            i,
            n,
            l,
            a,
            d,
            h,
            y,
            O,
            B,
            null,
            w,
            k
          )
        ), Rn(e, i, d, !T);
        return;
      }
    }
    u0(
      e,
      t,
      i,
      n,
      l,
      a,
      d,
      h,
      y
    );
  }
  function I2(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var a = n[l], i = a.getSnapshot;
          a = a.value;
          try {
            if (!vt(i(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Rn(e, t, n, l) {
    t &= ~Ho, t &= ~dl, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var i = 31 - yt(a), d = 1 << i;
      l[i] = -1, a &= ~d;
    }
    n !== 0 && du(e, n, t);
  }
  function fs() {
    return (_e & 6) === 0 ? (Ja(0), !1) : !0;
  }
  function Vo() {
    if (ge !== null) {
      if (ke === 0)
        var e = ge.return;
      else
        e = ge, en = nl = null, ro(e), ql = null, Aa = 0, e = ge;
      for (; e !== null; )
        Of(e.alternate, e), e = e.return;
      ge = null;
    }
  }
  function Wl(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, bh(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), fn = 0, Vo(), De = e, ge = n = It(e.current, null), be = t, ke = 0, Nt = null, zn = !1, Zl = ha(e, t), Bo = !1, Kl = Et = Ho = dl = An = $e = 0, mt = Za = null, qo = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var a = 31 - yt(l), i = 1 << a;
        t |= e[a], l &= ~i;
      }
    return dn = t, Or(), n;
  }
  function l0(e, t) {
    fe = null, z.H = Ha, t === Hl || t === Gr ? (t = bd(), ke = 3) : t === Zi ? (t = bd(), ke = 4) : ke = t === jo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Nt = t, ge === null && ($e = 1, ts(
      e,
      Mt(t, e.current)
    ));
  }
  function a0() {
    var e = jt.current;
    return e === null ? !0 : (be & 4194048) === be ? Ut === null : (be & 62914560) === be || (be & 536870912) !== 0 ? e === Ut : !1;
  }
  function r0() {
    var e = z.H;
    return z.H = Ha, e === null ? Ha : e;
  }
  function s0() {
    var e = z.A;
    return z.A = W2, e;
  }
  function ms() {
    $e = 4, zn || (be & 4194048) !== be && jt.current !== null || (Zl = !0), (An & 134217727) === 0 && (dl & 134217727) === 0 || De === null || Rn(
      De,
      be,
      Et,
      !1
    );
  }
  function Xo(e, t, n) {
    var l = _e;
    _e |= 2;
    var a = r0(), i = s0();
    (De !== e || be !== t) && (ds = null, Wl(e, t)), t = !1;
    var d = $e;
    e: do
      try {
        if (ke !== 0 && ge !== null) {
          var h = ge, y = Nt;
          switch (ke) {
            case 8:
              Vo(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var T = ke;
              if (ke = 0, Nt = null, Fl(e, h, y, T), n && Zl) {
                d = 0;
                break e;
              }
              break;
            default:
              T = ke, ke = 0, Nt = null, Fl(e, h, y, T);
          }
        }
        P2(), d = $e;
        break;
      } catch (O) {
        l0(e, O);
      }
    while (!0);
    return t && e.shellSuspendCounter++, en = nl = null, _e = l, z.H = a, z.A = i, ge === null && (De = null, be = 0, Or()), d;
  }
  function P2() {
    for (; ge !== null; ) i0(ge);
  }
  function eh(e, t) {
    var n = _e;
    _e |= 2;
    var l = r0(), a = s0();
    De !== e || be !== t ? (ds = null, us = xt() + 500, Wl(e, t)) : Zl = ha(
      e,
      t
    );
    e: do
      try {
        if (ke !== 0 && ge !== null) {
          t = ge;
          var i = Nt;
          t: switch (ke) {
            case 1:
              ke = 0, Nt = null, Fl(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (pd(i)) {
                ke = 0, Nt = null, o0(t);
                break;
              }
              t = function() {
                ke !== 2 && ke !== 9 || De !== e || (ke = 7), Xt(e);
              }, i.then(t, t);
              break e;
            case 3:
              ke = 7;
              break e;
            case 4:
              ke = 5;
              break e;
            case 7:
              pd(i) ? (ke = 0, Nt = null, o0(t)) : (ke = 0, Nt = null, Fl(e, t, i, 7));
              break;
            case 5:
              var d = null;
              switch (ge.tag) {
                case 26:
                  d = ge.memoizedState;
                case 5:
                case 27:
                  var h = ge;
                  if (d ? Z0(d) : h.stateNode.complete) {
                    ke = 0, Nt = null;
                    var y = h.sibling;
                    if (y !== null) ge = y;
                    else {
                      var T = h.return;
                      T !== null ? (ge = T, hs(T)) : ge = null;
                    }
                    break t;
                  }
              }
              ke = 0, Nt = null, Fl(e, t, i, 5);
              break;
            case 6:
              ke = 0, Nt = null, Fl(e, t, i, 6);
              break;
            case 8:
              Vo(), $e = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        th();
        break;
      } catch (O) {
        l0(e, O);
      }
    while (!0);
    return en = nl = null, z.H = l, z.A = a, _e = n, ge !== null ? 0 : (De = null, be = 0, Or(), $e);
  }
  function th() {
    for (; ge !== null && !Nm(); )
      i0(ge);
  }
  function i0(e) {
    var t = Af(e.alternate, e, dn);
    e.memoizedProps = e.pendingProps, t === null ? hs(e) : ge = t;
  }
  function o0(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ef(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          be
        );
        break;
      case 11:
        t = Ef(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          be
        );
        break;
      case 5:
        ro(t);
      default:
        Of(n, t), t = ge = rd(t, dn), t = Af(n, t, dn);
    }
    e.memoizedProps = e.pendingProps, t === null ? hs(e) : ge = t;
  }
  function Fl(e, t, n, l) {
    en = nl = null, ro(t), ql = null, Aa = 0;
    var a = t.return;
    try {
      if ($2(
        e,
        a,
        t,
        n,
        be
      )) {
        $e = 1, ts(
          e,
          Mt(n, e.current)
        ), ge = null;
        return;
      }
    } catch (i) {
      if (a !== null) throw ge = a, i;
      $e = 1, ts(
        e,
        Mt(n, e.current)
      ), ge = null;
      return;
    }
    t.flags & 32768 ? (ve || l === 1 ? e = !0 : Zl || (be & 536870912) !== 0 ? e = !1 : (zn = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = jt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), c0(t, e)) : hs(t);
  }
  function hs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        c0(
          t,
          zn
        );
        return;
      }
      e = t.return;
      var n = Q2(
        t.alternate,
        t,
        dn
      );
      if (n !== null) {
        ge = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ge = t;
        return;
      }
      ge = t = e;
    } while (t !== null);
    $e === 0 && ($e = 5);
  }
  function c0(e, t) {
    do {
      var n = Z2(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ge = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ge = e;
        return;
      }
      ge = e = n;
    } while (e !== null);
    $e = 6, ge = null;
  }
  function u0(e, t, n, l, a, i, d, h, y) {
    e.cancelPendingCommit = null;
    do
      gs();
    while (We !== 0);
    if ((_e & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (i = t.lanes | t.childLanes, i |= Mi, Rm(
        e,
        n,
        i,
        d,
        h,
        y
      ), e === De && (ge = De = null, be = 0), Jl = t, On = e, fn = n, Go = i, Yo = a, Pf = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, rh(xr, function() {
        return g0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = z.T, z.T = null, a = V.p, V.p = 2, d = _e, _e |= 4;
        try {
          K2(e, t, n);
        } finally {
          _e = d, V.p = a, z.T = l;
        }
      }
      We = 1, d0(), f0(), m0();
    }
  }
  function d0() {
    if (We === 1) {
      We = 0;
      var e = On, t = Jl, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = z.T, z.T = null;
        var l = V.p;
        V.p = 2;
        var a = _e;
        _e |= 4;
        try {
          Xf(t, e);
          var i = lc, d = Wu(e.containerInfo), h = i.focusedElem, y = i.selectionRange;
          if (d !== h && h && h.ownerDocument && Ju(
            h.ownerDocument.documentElement,
            h
          )) {
            if (y !== null && wi(h)) {
              var T = y.start, O = y.end;
              if (O === void 0 && (O = T), "selectionStart" in h)
                h.selectionStart = T, h.selectionEnd = Math.min(
                  O,
                  h.value.length
                );
              else {
                var B = h.ownerDocument || document, w = B && B.defaultView || window;
                if (w.getSelection) {
                  var k = w.getSelection(), J = h.textContent.length, re = Math.min(y.start, J), Oe = y.end === void 0 ? re : Math.min(y.end, J);
                  !k.extend && re > Oe && (d = Oe, Oe = re, re = d);
                  var N = Ku(
                    h,
                    re
                  ), j = Ku(
                    h,
                    Oe
                  );
                  if (N && j && (k.rangeCount !== 1 || k.anchorNode !== N.node || k.anchorOffset !== N.offset || k.focusNode !== j.node || k.focusOffset !== j.offset)) {
                    var E = B.createRange();
                    E.setStart(N.node, N.offset), k.removeAllRanges(), re > Oe ? (k.addRange(E), k.extend(j.node, j.offset)) : (E.setEnd(j.node, j.offset), k.addRange(E));
                  }
                }
              }
            }
            for (B = [], k = h; k = k.parentNode; )
              k.nodeType === 1 && B.push({
                element: k,
                left: k.scrollLeft,
                top: k.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < B.length; h++) {
              var D = B[h];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          ws = !!nc, lc = nc = null;
        } finally {
          _e = a, V.p = l, z.T = n;
        }
      }
      e.current = t, We = 2;
    }
  }
  function f0() {
    if (We === 2) {
      We = 0;
      var e = On, t = Jl, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = z.T, z.T = null;
        var l = V.p;
        V.p = 2;
        var a = _e;
        _e |= 4;
        try {
          qf(e, t.alternate, t);
        } finally {
          _e = a, V.p = l, z.T = n;
        }
      }
      We = 3;
    }
  }
  function m0() {
    if (We === 4 || We === 3) {
      We = 0, Em();
      var e = On, t = Jl, n = fn, l = Pf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? We = 5 : (We = 0, Jl = On = null, h0(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (a === 0 && (Mn = null), oi(n), t = t.stateNode, bt && typeof bt.onCommitFiberRoot == "function")
        try {
          bt.onCommitFiberRoot(
            ma,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = z.T, a = V.p, V.p = 2, z.T = null;
        try {
          for (var i = e.onRecoverableError, d = 0; d < l.length; d++) {
            var h = l[d];
            i(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          z.T = t, V.p = a;
        }
      }
      (fn & 3) !== 0 && gs(), Xt(e), a = e.pendingLanes, (n & 261930) !== 0 && (a & 42) !== 0 ? e === $o ? Ka++ : (Ka = 0, $o = e) : Ka = 0, Ja(0);
    }
  }
  function h0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ka(t)));
  }
  function gs() {
    return d0(), f0(), m0(), g0();
  }
  function g0() {
    if (We !== 5) return !1;
    var e = On, t = Go;
    Go = 0;
    var n = oi(fn), l = z.T, a = V.p;
    try {
      V.p = 32 > n ? 32 : n, z.T = null, n = Yo, Yo = null;
      var i = On, d = fn;
      if (We = 0, Jl = On = null, fn = 0, (_e & 6) !== 0) throw Error(c(331));
      var h = _e;
      if (_e |= 4, Wf(i.current), Zf(
        i,
        i.current,
        d,
        n
      ), _e = h, Ja(0, !1), bt && typeof bt.onPostCommitFiberRoot == "function")
        try {
          bt.onPostCommitFiberRoot(ma, i);
        } catch {
        }
      return !0;
    } finally {
      V.p = a, z.T = l, h0(e, t);
    }
  }
  function p0(e, t, n) {
    t = Mt(n, t), t = So(e.stateNode, t, 2), e = Tn(e, t, 2), e !== null && (ga(e, 2), Xt(e));
  }
  function ze(e, t, n) {
    if (e.tag === 3)
      p0(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          p0(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Mn === null || !Mn.has(l))) {
            e = Mt(n, e), n = xf(2), l = Tn(t, n, 2), l !== null && (bf(
              n,
              l,
              t,
              e
            ), ga(l, 2), Xt(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Qo(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new F2();
      var a = /* @__PURE__ */ new Set();
      l.set(t, a);
    } else
      a = l.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(t, a));
    a.has(n) || (Bo = !0, a.add(n), e = nh.bind(null, e, t, n), t.then(e, e));
  }
  function nh(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, De === e && (be & n) === n && ($e === 4 || $e === 3 && (be & 62914560) === be && 300 > xt() - cs ? (_e & 2) === 0 && Wl(e, 0) : Ho |= n, Kl === be && (Kl = 0)), Xt(e);
  }
  function x0(e, t) {
    t === 0 && (t = uu()), e = Pn(e, t), e !== null && (ga(e, t), Xt(e));
  }
  function lh(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), x0(e, n);
  }
  function ah(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, a = e.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    l !== null && l.delete(t), x0(e, n);
  }
  function rh(e, t) {
    return ai(e, t);
  }
  var ps = null, Il = null, Zo = !1, xs = !1, Ko = !1, Dn = 0;
  function Xt(e) {
    e !== Il && e.next === null && (Il === null ? ps = Il = e : Il = Il.next = e), xs = !0, Zo || (Zo = !0, ih());
  }
  function Ja(e, t) {
    if (!Ko && xs) {
      Ko = !0;
      do
        for (var n = !1, l = ps; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var i = 0;
            else {
              var d = l.suspendedLanes, h = l.pingedLanes;
              i = (1 << 31 - yt(42 | e) + 1) - 1, i &= a & ~(d & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (n = !0, S0(l, i));
          } else
            i = be, i = Sr(
              l,
              l === De ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (i & 3) === 0 || ha(l, i) || (n = !0, S0(l, i));
          l = l.next;
        }
      while (n);
      Ko = !1;
    }
  }
  function sh() {
    b0();
  }
  function b0() {
    xs = Zo = !1;
    var e = 0;
    Dn !== 0 && xh() && (e = Dn);
    for (var t = xt(), n = null, l = ps; l !== null; ) {
      var a = l.next, i = y0(l, t);
      i === 0 ? (l.next = null, n === null ? ps = a : n.next = a, a === null && (Il = n)) : (n = l, (e !== 0 || (i & 3) !== 0) && (xs = !0)), l = a;
    }
    We !== 0 && We !== 5 || Ja(e), Dn !== 0 && (Dn = 0);
  }
  function y0(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var d = 31 - yt(i), h = 1 << d, y = a[d];
      y === -1 ? ((h & n) === 0 || (h & l) !== 0) && (a[d] = Om(h, t)) : y <= t && (e.expiredLanes |= h), i &= ~h;
    }
    if (t = De, n = be, n = Sr(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (ke === 2 || ke === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ri(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || ha(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && ri(l), oi(n)) {
        case 2:
        case 8:
          n = ou;
          break;
        case 32:
          n = xr;
          break;
        case 268435456:
          n = cu;
          break;
        default:
          n = xr;
      }
      return l = v0.bind(null, e), n = ai(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ri(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function v0(e, t) {
    if (We !== 0 && We !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (gs() && e.callbackNode !== n)
      return null;
    var l = be;
    return l = Sr(
      e,
      e === De ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (t0(e, l, t), y0(e, xt()), e.callbackNode != null && e.callbackNode === n ? v0.bind(null, e) : null);
  }
  function S0(e, t) {
    if (gs()) return null;
    t0(e, t, !0);
  }
  function ih() {
    yh(function() {
      (_e & 6) !== 0 ? ai(
        iu,
        sh
      ) : b0();
    });
  }
  function Jo() {
    if (Dn === 0) {
      var e = Ll;
      e === 0 && (e = br, br <<= 1, (br & 261888) === 0 && (br = 256)), Dn = e;
    }
    return Dn;
  }
  function j0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Er("" + e);
  }
  function C0(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function oh(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var i = j0(
        (a[ot] || null).action
      ), d = l.submitter;
      d && (t = (t = d[ot] || null) ? j0(t.formAction) : d.getAttribute("formAction"), t !== null && (i = t, d = null));
      var h = new kr(
        "action",
        "action",
        null,
        l,
        a
      );
      e.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Dn !== 0) {
                  var y = d ? C0(a, d) : new FormData(a);
                  go(
                    n,
                    {
                      pending: !0,
                      data: y,
                      method: a.method,
                      action: i
                    },
                    null,
                    y
                  );
                }
              } else
                typeof i == "function" && (h.preventDefault(), y = d ? C0(a, d) : new FormData(a), go(
                  n,
                  {
                    pending: !0,
                    data: y,
                    method: a.method,
                    action: i
                  },
                  i,
                  y
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Wo = 0; Wo < Ai.length; Wo++) {
    var Fo = Ai[Wo], ch = Fo.toLowerCase(), uh = Fo[0].toUpperCase() + Fo.slice(1);
    Ht(
      ch,
      "on" + uh
    );
  }
  Ht(Pu, "onAnimationEnd"), Ht(ed, "onAnimationIteration"), Ht(td, "onAnimationStart"), Ht("dblclick", "onDoubleClick"), Ht("focusin", "onFocus"), Ht("focusout", "onBlur"), Ht(T2, "onTransitionRun"), Ht(w2, "onTransitionStart"), Ht(_2, "onTransitionCancel"), Ht(nd, "onTransitionEnd"), Cl("onMouseEnter", ["mouseout", "mouseover"]), Cl("onMouseLeave", ["mouseout", "mouseover"]), Cl("onPointerEnter", ["pointerout", "pointerover"]), Cl("onPointerLeave", ["pointerout", "pointerover"]), Jn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Jn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Jn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Jn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Jn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Jn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Wa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), dh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wa)
  );
  function N0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], a = l.event;
      l = l.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var d = l.length - 1; 0 <= d; d--) {
            var h = l[d], y = h.instance, T = h.currentTarget;
            if (h = h.listener, y !== i && a.isPropagationStopped())
              break e;
            i = h, a.currentTarget = T;
            try {
              i(a);
            } catch (O) {
              Mr(O);
            }
            a.currentTarget = null, i = y;
          }
        else
          for (d = 0; d < l.length; d++) {
            if (h = l[d], y = h.instance, T = h.currentTarget, h = h.listener, y !== i && a.isPropagationStopped())
              break e;
            i = h, a.currentTarget = T;
            try {
              i(a);
            } catch (O) {
              Mr(O);
            }
            a.currentTarget = null, i = y;
          }
      }
    }
  }
  function pe(e, t) {
    var n = t[ci];
    n === void 0 && (n = t[ci] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (E0(t, e, 2, !1), n.add(l));
  }
  function Io(e, t, n) {
    var l = 0;
    t && (l |= 4), E0(
      n,
      e,
      l,
      t
    );
  }
  var bs = "_reactListening" + Math.random().toString(36).slice(2);
  function Po(e) {
    if (!e[bs]) {
      e[bs] = !0, xu.forEach(function(n) {
        n !== "selectionchange" && (dh.has(n) || Io(n, !1, e), Io(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[bs] || (t[bs] = !0, Io("selectionchange", !1, t));
    }
  }
  function E0(e, t, n, l) {
    switch (e1(t)) {
      case 2:
        var a = Hh;
        break;
      case 8:
        a = qh;
        break;
      default:
        a = hc;
    }
    n = a.bind(
      null,
      t,
      n,
      e
    ), a = void 0, !bi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function ec(e, t, n, l, a) {
    var i = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var d = l.tag;
        if (d === 3 || d === 4) {
          var h = l.stateNode.containerInfo;
          if (h === a) break;
          if (d === 4)
            for (d = l.return; d !== null; ) {
              var y = d.tag;
              if ((y === 3 || y === 4) && d.stateNode.containerInfo === a)
                return;
              d = d.return;
            }
          for (; h !== null; ) {
            if (d = vl(h), d === null) return;
            if (y = d.tag, y === 5 || y === 6 || y === 26 || y === 27) {
              l = i = d;
              continue e;
            }
            h = h.parentNode;
          }
        }
        l = l.return;
      }
    ku(function() {
      var T = i, O = pi(n), B = [];
      e: {
        var w = ld.get(e);
        if (w !== void 0) {
          var k = kr, J = e;
          switch (e) {
            case "keypress":
              if (wr(n) === 0) break e;
            case "keydown":
            case "keyup":
              k = a2;
              break;
            case "focusin":
              J = "focus", k = ji;
              break;
            case "focusout":
              J = "blur", k = ji;
              break;
            case "beforeblur":
            case "afterblur":
              k = ji;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k = Mu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k = Qm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k = i2;
              break;
            case Pu:
            case ed:
            case td:
              k = Jm;
              break;
            case nd:
              k = c2;
              break;
            case "scroll":
            case "scrollend":
              k = Vm;
              break;
            case "wheel":
              k = d2;
              break;
            case "copy":
            case "cut":
            case "paste":
              k = Fm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k = Ru;
              break;
            case "toggle":
            case "beforetoggle":
              k = m2;
          }
          var re = (t & 4) !== 0, Oe = !re && (e === "scroll" || e === "scrollend"), N = re ? w !== null ? w + "Capture" : null : w;
          re = [];
          for (var j = T, E; j !== null; ) {
            var D = j;
            if (E = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || E === null || N === null || (D = ba(j, N), D != null && re.push(
              Fa(j, D, E)
            )), Oe) break;
            j = j.return;
          }
          0 < re.length && (w = new k(
            w,
            J,
            null,
            n,
            O
          ), B.push({ event: w, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (w = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", w && n !== gi && (J = n.relatedTarget || n.fromElement) && (vl(J) || J[yl]))
            break e;
          if ((k || w) && (w = O.window === O ? O : (w = O.ownerDocument) ? w.defaultView || w.parentWindow : window, k ? (J = n.relatedTarget || n.toElement, k = T, J = J ? vl(J) : null, J !== null && (Oe = m(J), re = J.tag, J !== Oe || re !== 5 && re !== 27 && re !== 6) && (J = null)) : (k = null, J = T), k !== J)) {
            if (re = Mu, D = "onMouseLeave", N = "onMouseEnter", j = "mouse", (e === "pointerout" || e === "pointerover") && (re = Ru, D = "onPointerLeave", N = "onPointerEnter", j = "pointer"), Oe = k == null ? w : xa(k), E = J == null ? w : xa(J), w = new re(
              D,
              j + "leave",
              k,
              n,
              O
            ), w.target = Oe, w.relatedTarget = E, D = null, vl(O) === T && (re = new re(
              N,
              j + "enter",
              J,
              n,
              O
            ), re.target = E, re.relatedTarget = Oe, D = re), Oe = D, k && J)
              t: {
                for (re = fh, N = k, j = J, E = 0, D = N; D; D = re(D))
                  E++;
                D = 0;
                for (var le = j; le; le = re(le))
                  D++;
                for (; 0 < E - D; )
                  N = re(N), E--;
                for (; 0 < D - E; )
                  j = re(j), D--;
                for (; E--; ) {
                  if (N === j || j !== null && N === j.alternate) {
                    re = N;
                    break t;
                  }
                  N = re(N), j = re(j);
                }
                re = null;
              }
            else re = null;
            k !== null && T0(
              B,
              w,
              k,
              re,
              !1
            ), J !== null && Oe !== null && T0(
              B,
              Oe,
              J,
              re,
              !0
            );
          }
        }
        e: {
          if (w = T ? xa(T) : window, k = w.nodeName && w.nodeName.toLowerCase(), k === "select" || k === "input" && w.type === "file")
            var Ee = Yu;
          else if (qu(w))
            if ($u)
              Ee = C2;
            else {
              Ee = S2;
              var F = v2;
            }
          else
            k = w.nodeName, !k || k.toLowerCase() !== "input" || w.type !== "checkbox" && w.type !== "radio" ? T && hi(T.elementType) && (Ee = Yu) : Ee = j2;
          if (Ee && (Ee = Ee(e, T))) {
            Gu(
              B,
              Ee,
              n,
              O
            );
            break e;
          }
          F && F(e, w, T), e === "focusout" && T && w.type === "number" && T.memoizedProps.value != null && mi(w, "number", w.value);
        }
        switch (F = T ? xa(T) : window, e) {
          case "focusin":
            (qu(F) || F.contentEditable === "true") && (kl = F, _i = T, Ta = null);
            break;
          case "focusout":
            Ta = _i = kl = null;
            break;
          case "mousedown":
            ki = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ki = !1, Fu(B, n, O);
            break;
          case "selectionchange":
            if (E2) break;
          case "keydown":
          case "keyup":
            Fu(B, n, O);
        }
        var me;
        if (Ni)
          e: {
            switch (e) {
              case "compositionstart":
                var ye = "onCompositionStart";
                break e;
              case "compositionend":
                ye = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ye = "onCompositionUpdate";
                break e;
            }
            ye = void 0;
          }
        else
          _l ? Bu(e, n) && (ye = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ye = "onCompositionStart");
        ye && (Du && n.locale !== "ko" && (_l || ye !== "onCompositionStart" ? ye === "onCompositionEnd" && _l && (me = zu()) : (yn = O, yi = "value" in yn ? yn.value : yn.textContent, _l = !0)), F = ys(T, ye), 0 < F.length && (ye = new Ou(
          ye,
          e,
          null,
          n,
          O
        ), B.push({ event: ye, listeners: F }), me ? ye.data = me : (me = Hu(n), me !== null && (ye.data = me)))), (me = g2 ? p2(e, n) : x2(e, n)) && (ye = ys(T, "onBeforeInput"), 0 < ye.length && (F = new Ou(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          O
        ), B.push({
          event: F,
          listeners: ye
        }), F.data = me)), oh(
          B,
          e,
          T,
          n,
          O
        );
      }
      N0(B, t);
    });
  }
  function Fa(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function ys(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e, i = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || i === null || (a = ba(e, n), a != null && l.unshift(
        Fa(e, a, i)
      ), a = ba(e, t), a != null && l.push(
        Fa(e, a, i)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function fh(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function T0(e, t, n, l, a) {
    for (var i = t._reactName, d = []; n !== null && n !== l; ) {
      var h = n, y = h.alternate, T = h.stateNode;
      if (h = h.tag, y !== null && y === l) break;
      h !== 5 && h !== 26 && h !== 27 || T === null || (y = T, a ? (T = ba(n, i), T != null && d.unshift(
        Fa(n, T, y)
      )) : a || (T = ba(n, i), T != null && d.push(
        Fa(n, T, y)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var mh = /\r\n?/g, hh = /\u0000|\uFFFD/g;
  function w0(e) {
    return (typeof e == "string" ? e : "" + e).replace(mh, `
`).replace(hh, "");
  }
  function _0(e, t) {
    return t = w0(t), w0(e) === t;
  }
  function Me(e, t, n, l, a, i) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || El(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && El(e, "" + l);
        break;
      case "className":
        Cr(e, "class", l);
        break;
      case "tabIndex":
        Cr(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Cr(e, n, l);
        break;
      case "style":
        wu(e, l, i);
        break;
      case "data":
        if (t !== "object") {
          Cr(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Er("" + l), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (n === "formAction" ? (t !== "input" && Me(e, t, "name", a.name, a, null), Me(
            e,
            t,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Me(
            e,
            t,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Me(
            e,
            t,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Me(e, t, "encType", a.encType, a, null), Me(e, t, "method", a.method, a, null), Me(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Er("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = Wt);
        break;
      case "onScroll":
        l != null && pe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && pe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(c(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Er("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "" + l) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
        break;
      case "popover":
        pe("beforetoggle", e), pe("toggle", e), jr(e, "popover", l);
        break;
      case "xlinkActuate":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        jr(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Ym.get(n) || n, jr(e, n, l));
    }
  }
  function tc(e, t, n, l, a, i) {
    switch (n) {
      case "style":
        wu(e, l, i);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(c(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(c(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? El(e, l) : (typeof l == "number" || typeof l == "bigint") && El(e, "" + l);
        break;
      case "onScroll":
        l != null && pe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && pe("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Wt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!bu.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), i = e[ot] || null, i = i != null ? i[n] : null, typeof i == "function" && e.removeEventListener(t, i, a), typeof l == "function")) {
              typeof i != "function" && i !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, a);
              break e;
            }
            n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : jr(e, n, l);
          }
    }
  }
  function lt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        pe("error", e), pe("load", e);
        var l = !1, a = !1, i;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var d = n[i];
            if (d != null)
              switch (i) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  Me(e, t, i, d, n, null);
              }
          }
        a && Me(e, t, "srcSet", n.srcSet, n, null), l && Me(e, t, "src", n.src, n, null);
        return;
      case "input":
        pe("invalid", e);
        var h = i = d = a = null, y = null, T = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var O = n[l];
            if (O != null)
              switch (l) {
                case "name":
                  a = O;
                  break;
                case "type":
                  d = O;
                  break;
                case "checked":
                  y = O;
                  break;
                case "defaultChecked":
                  T = O;
                  break;
                case "value":
                  i = O;
                  break;
                case "defaultValue":
                  h = O;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (O != null)
                    throw Error(c(137, t));
                  break;
                default:
                  Me(e, t, l, O, n, null);
              }
          }
        Cu(
          e,
          i,
          h,
          y,
          T,
          d,
          a,
          !1
        );
        return;
      case "select":
        pe("invalid", e), l = d = i = null;
        for (a in n)
          if (n.hasOwnProperty(a) && (h = n[a], h != null))
            switch (a) {
              case "value":
                i = h;
                break;
              case "defaultValue":
                d = h;
                break;
              case "multiple":
                l = h;
              default:
                Me(e, t, a, h, n, null);
            }
        t = i, n = d, e.multiple = !!l, t != null ? Nl(e, !!l, t, !1) : n != null && Nl(e, !!l, n, !0);
        return;
      case "textarea":
        pe("invalid", e), i = a = l = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (h = n[d], h != null))
            switch (d) {
              case "value":
                l = h;
                break;
              case "defaultValue":
                a = h;
                break;
              case "children":
                i = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(c(91));
                break;
              default:
                Me(e, t, d, h, n, null);
            }
        Eu(e, l, a, i);
        return;
      case "option":
        for (y in n)
          if (n.hasOwnProperty(y) && (l = n[y], l != null))
            switch (y) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Me(e, t, y, l, n, null);
            }
        return;
      case "dialog":
        pe("beforetoggle", e), pe("toggle", e), pe("cancel", e), pe("close", e);
        break;
      case "iframe":
      case "object":
        pe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Wa.length; l++)
          pe(Wa[l], e);
        break;
      case "image":
        pe("error", e), pe("load", e);
        break;
      case "details":
        pe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        pe("error", e), pe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (T in n)
          if (n.hasOwnProperty(T) && (l = n[T], l != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Me(e, t, T, l, n, null);
            }
        return;
      default:
        if (hi(t)) {
          for (O in n)
            n.hasOwnProperty(O) && (l = n[O], l !== void 0 && tc(
              e,
              t,
              O,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (h in n)
      n.hasOwnProperty(h) && (l = n[h], l != null && Me(e, t, h, l, n, null));
  }
  function gh(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, i = null, d = null, h = null, y = null, T = null, O = null;
        for (k in n) {
          var B = n[k];
          if (n.hasOwnProperty(k) && B != null)
            switch (k) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = B;
              default:
                l.hasOwnProperty(k) || Me(e, t, k, null, l, B);
            }
        }
        for (var w in l) {
          var k = l[w];
          if (B = n[w], l.hasOwnProperty(w) && (k != null || B != null))
            switch (w) {
              case "type":
                i = k;
                break;
              case "name":
                a = k;
                break;
              case "checked":
                T = k;
                break;
              case "defaultChecked":
                O = k;
                break;
              case "value":
                d = k;
                break;
              case "defaultValue":
                h = k;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null)
                  throw Error(c(137, t));
                break;
              default:
                k !== B && Me(
                  e,
                  t,
                  w,
                  k,
                  l,
                  B
                );
            }
        }
        fi(
          e,
          d,
          h,
          y,
          T,
          O,
          i,
          a
        );
        return;
      case "select":
        k = d = h = w = null;
        for (i in n)
          if (y = n[i], n.hasOwnProperty(i) && y != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                k = y;
              default:
                l.hasOwnProperty(i) || Me(
                  e,
                  t,
                  i,
                  null,
                  l,
                  y
                );
            }
        for (a in l)
          if (i = l[a], y = n[a], l.hasOwnProperty(a) && (i != null || y != null))
            switch (a) {
              case "value":
                w = i;
                break;
              case "defaultValue":
                h = i;
                break;
              case "multiple":
                d = i;
              default:
                i !== y && Me(
                  e,
                  t,
                  a,
                  i,
                  l,
                  y
                );
            }
        t = h, n = d, l = k, w != null ? Nl(e, !!n, w, !1) : !!l != !!n && (t != null ? Nl(e, !!n, t, !0) : Nl(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        k = w = null;
        for (h in n)
          if (a = n[h], n.hasOwnProperty(h) && a != null && !l.hasOwnProperty(h))
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                Me(e, t, h, null, l, a);
            }
        for (d in l)
          if (a = l[d], i = n[d], l.hasOwnProperty(d) && (a != null || i != null))
            switch (d) {
              case "value":
                w = a;
                break;
              case "defaultValue":
                k = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(c(91));
                break;
              default:
                a !== i && Me(e, t, d, a, l, i);
            }
        Nu(e, w, k);
        return;
      case "option":
        for (var J in n)
          if (w = n[J], n.hasOwnProperty(J) && w != null && !l.hasOwnProperty(J))
            switch (J) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Me(
                  e,
                  t,
                  J,
                  null,
                  l,
                  w
                );
            }
        for (y in l)
          if (w = l[y], k = n[y], l.hasOwnProperty(y) && w !== k && (w != null || k != null))
            switch (y) {
              case "selected":
                e.selected = w && typeof w != "function" && typeof w != "symbol";
                break;
              default:
                Me(
                  e,
                  t,
                  y,
                  w,
                  l,
                  k
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var re in n)
          w = n[re], n.hasOwnProperty(re) && w != null && !l.hasOwnProperty(re) && Me(e, t, re, null, l, w);
        for (T in l)
          if (w = l[T], k = n[T], l.hasOwnProperty(T) && w !== k && (w != null || k != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null)
                  throw Error(c(137, t));
                break;
              default:
                Me(
                  e,
                  t,
                  T,
                  w,
                  l,
                  k
                );
            }
        return;
      default:
        if (hi(t)) {
          for (var Oe in n)
            w = n[Oe], n.hasOwnProperty(Oe) && w !== void 0 && !l.hasOwnProperty(Oe) && tc(
              e,
              t,
              Oe,
              void 0,
              l,
              w
            );
          for (O in l)
            w = l[O], k = n[O], !l.hasOwnProperty(O) || w === k || w === void 0 && k === void 0 || tc(
              e,
              t,
              O,
              w,
              l,
              k
            );
          return;
        }
    }
    for (var N in n)
      w = n[N], n.hasOwnProperty(N) && w != null && !l.hasOwnProperty(N) && Me(e, t, N, null, l, w);
    for (B in l)
      w = l[B], k = n[B], !l.hasOwnProperty(B) || w === k || w == null && k == null || Me(e, t, B, w, l, k);
  }
  function k0(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function ph() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l], i = a.transferSize, d = a.initiatorType, h = a.duration;
        if (i && h && k0(d)) {
          for (d = 0, h = a.responseEnd, l += 1; l < n.length; l++) {
            var y = n[l], T = y.startTime;
            if (T > h) break;
            var O = y.transferSize, B = y.initiatorType;
            O && k0(B) && (y = y.responseEnd, d += O * (y < h ? 1 : (h - T) / (y - T)));
          }
          if (--l, t += 8 * (i + d) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var nc = null, lc = null;
  function vs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function z0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function A0(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function ac(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var rc = null;
  function xh() {
    var e = window.event;
    return e && e.type === "popstate" ? e === rc ? !1 : (rc = e, !0) : (rc = null, !1);
  }
  var M0 = typeof setTimeout == "function" ? setTimeout : void 0, bh = typeof clearTimeout == "function" ? clearTimeout : void 0, O0 = typeof Promise == "function" ? Promise : void 0, yh = typeof queueMicrotask == "function" ? queueMicrotask : typeof O0 < "u" ? function(e) {
    return O0.resolve(null).then(e).catch(vh);
  } : M0;
  function vh(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Un(e) {
    return e === "head";
  }
  function R0(e, t) {
    var n = t, l = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8)
        if (n = a.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(a), na(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Ia(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Ia(n);
          for (var i = n.firstChild; i; ) {
            var d = i.nextSibling, h = i.nodeName;
            i[pa] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || n.removeChild(i), i = d;
          }
        } else
          n === "body" && Ia(e.ownerDocument.body);
      n = a;
    } while (n);
    na(t);
  }
  function D0(e, t) {
    var n = e;
    e = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = l;
    } while (n);
  }
  function sc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          sc(n), ui(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function Sh(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[pa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (i !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (i = e.getAttribute("src"), (i !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === i)
          return e;
      } else return e;
      if (e = Lt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function jh(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Lt(e.nextSibling), e === null)) return null;
    return e;
  }
  function U0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Lt(e.nextSibling), e === null)) return null;
    return e;
  }
  function ic(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function oc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Ch(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Lt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var cc = null;
  function L0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Lt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function B0(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function H0(e, t, n) {
    switch (t = vs(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(c(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(c(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function Ia(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ui(e);
  }
  var Bt = /* @__PURE__ */ new Map(), q0 = /* @__PURE__ */ new Set();
  function Ss(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var mn = V.d;
  V.d = {
    f: Nh,
    r: Eh,
    D: Th,
    C: wh,
    L: _h,
    m: kh,
    X: Ah,
    S: zh,
    M: Mh
  };
  function Nh() {
    var e = mn.f(), t = fs();
    return e || t;
  }
  function Eh(e) {
    var t = Sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? nf(t) : mn.r(e);
  }
  var Pl = typeof document > "u" ? null : document;
  function G0(e, t, n) {
    var l = Pl;
    if (l && typeof t == "string" && t) {
      var a = zt(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), q0.has(a) || (q0.add(a), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(a) === null && (t = l.createElement("link"), lt(t, "link", e), Fe(t), l.head.appendChild(t)));
    }
  }
  function Th(e) {
    mn.D(e), G0("dns-prefetch", e, null);
  }
  function wh(e, t) {
    mn.C(e, t), G0("preconnect", e, t);
  }
  function _h(e, t, n) {
    mn.L(e, t, n);
    var l = Pl;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + zt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + zt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + zt(
        n.imageSizes
      ) + '"]')) : a += '[href="' + zt(e) + '"]';
      var i = a;
      switch (t) {
        case "style":
          i = ea(e);
          break;
        case "script":
          i = ta(e);
      }
      Bt.has(i) || (e = v(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Bt.set(i, e), l.querySelector(a) !== null || t === "style" && l.querySelector(Pa(i)) || t === "script" && l.querySelector(er(i)) || (t = l.createElement("link"), lt(t, "link", e), Fe(t), l.head.appendChild(t)));
    }
  }
  function kh(e, t) {
    mn.m(e, t);
    var n = Pl;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + zt(l) + '"][href="' + zt(e) + '"]', i = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = ta(e);
      }
      if (!Bt.has(i) && (e = v({ rel: "modulepreload", href: e }, t), Bt.set(i, e), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(er(i)))
              return;
        }
        l = n.createElement("link"), lt(l, "link", e), Fe(l), n.head.appendChild(l);
      }
    }
  }
  function zh(e, t, n) {
    mn.S(e, t, n);
    var l = Pl;
    if (l && e) {
      var a = jl(l).hoistableStyles, i = ea(e);
      t = t || "default";
      var d = a.get(i);
      if (!d) {
        var h = { loading: 0, preload: null };
        if (d = l.querySelector(
          Pa(i)
        ))
          h.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Bt.get(i)) && uc(e, n);
          var y = d = l.createElement("link");
          Fe(y), lt(y, "link", e), y._p = new Promise(function(T, O) {
            y.onload = T, y.onerror = O;
          }), y.addEventListener("load", function() {
            h.loading |= 1;
          }), y.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, js(d, t, l);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: h
        }, a.set(i, d);
      }
    }
  }
  function Ah(e, t) {
    mn.X(e, t);
    var n = Pl;
    if (n && e) {
      var l = jl(n).hoistableScripts, a = ta(e), i = l.get(a);
      i || (i = n.querySelector(er(a)), i || (e = v({ src: e, async: !0 }, t), (t = Bt.get(a)) && dc(e, t), i = n.createElement("script"), Fe(i), lt(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function Mh(e, t) {
    mn.M(e, t);
    var n = Pl;
    if (n && e) {
      var l = jl(n).hoistableScripts, a = ta(e), i = l.get(a);
      i || (i = n.querySelector(er(a)), i || (e = v({ src: e, async: !0, type: "module" }, t), (t = Bt.get(a)) && dc(e, t), i = n.createElement("script"), Fe(i), lt(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(a, i));
    }
  }
  function Y0(e, t, n, l) {
    var a = (a = Q.current) ? Ss(a) : null;
    if (!a) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = ea(n.href), n = jl(
          a
        ).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = ea(n.href);
          var i = jl(
            a
          ).hoistableStyles, d = i.get(e);
          if (d || (a = a.ownerDocument || a, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(e, d), (i = a.querySelector(
            Pa(e)
          )) && !i._p && (d.instance = i, d.state.loading = 5), Bt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Bt.set(e, n), i || Oh(
            a,
            e,
            n,
            d.state
          ))), t && l === null)
            throw Error(c(528, ""));
          return d;
        }
        if (t && l !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ta(n), n = jl(
          a
        ).hoistableScripts, l = n.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function ea(e) {
    return 'href="' + zt(e) + '"';
  }
  function Pa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function $0(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Oh(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), lt(t, "link", n), Fe(t), e.head.appendChild(t));
  }
  function ta(e) {
    return '[src="' + zt(e) + '"]';
  }
  function er(e) {
    return "script[async]" + e;
  }
  function V0(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + zt(n.href) + '"]'
          );
          if (l)
            return t.instance = l, Fe(l), l;
          var a = v({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Fe(l), lt(l, "style", a), js(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          a = ea(n.href);
          var i = e.querySelector(
            Pa(a)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, Fe(i), i;
          l = $0(n), (a = Bt.get(a)) && uc(l, a), i = (e.ownerDocument || e).createElement("link"), Fe(i);
          var d = i;
          return d._p = new Promise(function(h, y) {
            d.onload = h, d.onerror = y;
          }), lt(i, "link", l), t.state.loading |= 4, js(i, n.precedence, e), t.instance = i;
        case "script":
          return i = ta(n.src), (a = e.querySelector(
            er(i)
          )) ? (t.instance = a, Fe(a), a) : (l = n, (a = Bt.get(i)) && (l = v({}, n), dc(l, a)), e = e.ownerDocument || e, a = e.createElement("script"), Fe(a), lt(a, "link", l), e.head.appendChild(a), t.instance = a);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, js(l, n.precedence, e));
    return t.instance;
  }
  function js(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = l.length ? l[l.length - 1] : null, i = a, d = 0; d < l.length; d++) {
      var h = l[d];
      if (h.dataset.precedence === t) i = h;
      else if (i !== a) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function uc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function dc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Cs = null;
  function X0(e, t, n) {
    if (Cs === null) {
      var l = /* @__PURE__ */ new Map(), a = Cs = /* @__PURE__ */ new Map();
      a.set(n, l);
    } else
      a = Cs, l = a.get(n), l || (l = /* @__PURE__ */ new Map(), a.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var i = n[a];
      if (!(i[pa] || i[Pe] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = i.getAttribute(t) || "";
        d = e + d;
        var h = l.get(d);
        h ? h.push(i) : l.set(d, [i]);
      }
    }
    return l;
  }
  function Q0(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Rh(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Z0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Dh(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = ea(l.href), i = t.querySelector(
          Pa(a)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ns.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = i, Fe(i);
          return;
        }
        i = t.ownerDocument || t, l = $0(l), (a = Bt.get(a)) && uc(l, a), i = i.createElement("link"), Fe(i);
        var d = i;
        d._p = new Promise(function(h, y) {
          d.onload = h, d.onerror = y;
        }), lt(i, "link", l), n.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Ns.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var fc = 0;
  function Uh(e, t) {
    return e.stylesheets && e.count === 0 && Ts(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && Ts(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && fc === 0 && (fc = 62500 * ph());
      var a = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ts(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        },
        (e.imgBytes > fc ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function Ns() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ts(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Es = null;
  function Ts(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Es = /* @__PURE__ */ new Map(), t.forEach(Lh, e), Es = null, Ns.call(e));
  }
  function Lh(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Es.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Es.set(e, n);
        for (var a = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < a.length; i++) {
          var d = a[i];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), l = d);
        }
        l && n.set(null, l);
      }
      a = t.instance, d = a.getAttribute("data-precedence"), i = n.get(d) || l, i === l && n.set(null, a), n.set(d, a), this.count++, l = Ns.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), i ? i.parentNode.insertBefore(a, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var tr = {
    $$typeof: P,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0
  };
  function Bh(e, t, n, l, a, i, d, h, y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = si(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = si(0), this.hiddenUpdates = si(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = i, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function K0(e, t, n, l, a, i, d, h, y, T, O, B) {
    return e = new Bh(
      e,
      t,
      n,
      d,
      y,
      T,
      O,
      B,
      h
    ), t = 1, i === !0 && (t |= 24), i = St(3, null, null, t), e.current = i, i.stateNode = e, t = Vi(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, Ki(i), e;
  }
  function J0(e) {
    return e ? (e = Ml, e) : Ml;
  }
  function W0(e, t, n, l, a, i) {
    a = J0(a), l.context === null ? l.context = a : l.pendingContext = a, l = En(t), l.payload = { element: n }, i = i === void 0 ? null : i, i !== null && (l.callback = i), n = Tn(e, l, t), n !== null && (ht(n, e, t), Oa(n, e, t));
  }
  function F0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function mc(e, t) {
    F0(e, t), (e = e.alternate) && F0(e, t);
  }
  function I0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Pn(e, 67108864);
      t !== null && ht(t, e, 67108864), mc(e, 67108864);
    }
  }
  function P0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Tt();
      t = ii(t);
      var n = Pn(e, t);
      n !== null && ht(n, e, t), mc(e, t);
    }
  }
  var ws = !0;
  function Hh(e, t, n, l) {
    var a = z.T;
    z.T = null;
    var i = V.p;
    try {
      V.p = 2, hc(e, t, n, l);
    } finally {
      V.p = i, z.T = a;
    }
  }
  function qh(e, t, n, l) {
    var a = z.T;
    z.T = null;
    var i = V.p;
    try {
      V.p = 8, hc(e, t, n, l);
    } finally {
      V.p = i, z.T = a;
    }
  }
  function hc(e, t, n, l) {
    if (ws) {
      var a = gc(l);
      if (a === null)
        ec(
          e,
          t,
          l,
          _s,
          n
        ), t1(e, l);
      else if (Yh(
        a,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (t1(e, l), t & 4 && -1 < Gh.indexOf(e)) {
        for (; a !== null; ) {
          var i = Sl(a);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var d = Kn(i.pendingLanes);
                  if (d !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                      var y = 1 << 31 - yt(d);
                      h.entanglements[1] |= y, d &= ~y;
                    }
                    Xt(i), (_e & 6) === 0 && (us = xt() + 500, Ja(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = Pn(i, 2), h !== null && ht(h, i, 2), fs(), mc(i, 2);
            }
          if (i = gc(l), i === null && ec(
            e,
            t,
            l,
            _s,
            n
          ), i === a) break;
          a = i;
        }
        a !== null && l.stopPropagation();
      } else
        ec(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function gc(e) {
    return e = pi(e), pc(e);
  }
  var _s = null;
  function pc(e) {
    if (_s = null, e = vl(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = x(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return _s = e, null;
  }
  function e1(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Tm()) {
          case iu:
            return 2;
          case ou:
            return 8;
          case xr:
          case wm:
            return 32;
          case cu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var xc = !1, Ln = null, Bn = null, Hn = null, nr = /* @__PURE__ */ new Map(), lr = /* @__PURE__ */ new Map(), qn = [], Gh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function t1(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ln = null;
        break;
      case "dragenter":
      case "dragleave":
        Bn = null;
        break;
      case "mouseover":
      case "mouseout":
        Hn = null;
        break;
      case "pointerover":
      case "pointerout":
        nr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        lr.delete(t.pointerId);
    }
  }
  function ar(e, t, n, l, a, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [a]
    }, t !== null && (t = Sl(t), t !== null && I0(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Yh(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return Ln = ar(
          Ln,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "dragenter":
        return Bn = ar(
          Bn,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "mouseover":
        return Hn = ar(
          Hn,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "pointerover":
        var i = a.pointerId;
        return nr.set(
          i,
          ar(
            nr.get(i) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
      case "gotpointercapture":
        return i = a.pointerId, lr.set(
          i,
          ar(
            lr.get(i) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
    }
    return !1;
  }
  function n1(e) {
    var t = vl(e.target);
    if (t !== null) {
      var n = m(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = x(n), t !== null) {
            e.blockedOn = t, gu(e.priority, function() {
              P0(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, gu(e.priority, function() {
              P0(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ks(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = gc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        gi = l, n.target.dispatchEvent(l), gi = null;
      } else
        return t = Sl(n), t !== null && I0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function l1(e, t, n) {
    ks(e) && n.delete(t);
  }
  function $h() {
    xc = !1, Ln !== null && ks(Ln) && (Ln = null), Bn !== null && ks(Bn) && (Bn = null), Hn !== null && ks(Hn) && (Hn = null), nr.forEach(l1), lr.forEach(l1);
  }
  function zs(e, t) {
    e.blockedOn === t && (e.blockedOn = null, xc || (xc = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      $h
    )));
  }
  var As = null;
  function a1(e) {
    As !== e && (As = e, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        As === e && (As = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], a = e[t + 2];
          if (typeof l != "function") {
            if (pc(l || n) === null)
              continue;
            break;
          }
          var i = Sl(n);
          i !== null && (e.splice(t, 3), t -= 3, go(
            i,
            {
              pending: !0,
              data: a,
              method: n.method,
              action: l
            },
            l,
            a
          ));
        }
      }
    ));
  }
  function na(e) {
    function t(y) {
      return zs(y, e);
    }
    Ln !== null && zs(Ln, e), Bn !== null && zs(Bn, e), Hn !== null && zs(Hn, e), nr.forEach(t), lr.forEach(t);
    for (var n = 0; n < qn.length; n++) {
      var l = qn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < qn.length && (n = qn[0], n.blockedOn === null); )
      n1(n), n.blockedOn === null && qn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var a = n[l], i = n[l + 1], d = a[ot] || null;
        if (typeof i == "function")
          d || a1(n);
        else if (d) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (a = i, d = i[ot] || null)
              h = d.formAction;
            else if (pc(a) !== null) continue;
          } else h = d.action;
          typeof h == "function" ? n[l + 1] = h : (n.splice(l, 3), l -= 3), a1(n);
        }
      }
  }
  function r1() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(d) {
            return a = d;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      a !== null && (a(), a = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, a = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), a !== null && (a(), a = null);
      };
    }
  }
  function bc(e) {
    this._internalRoot = e;
  }
  Ms.prototype.render = bc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var n = t.current, l = Tt();
    W0(n, l, e, t, null, null);
  }, Ms.prototype.unmount = bc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      W0(e.current, 2, null, e, null, null), fs(), t[yl] = null;
    }
  };
  function Ms(e) {
    this._internalRoot = e;
  }
  Ms.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = hu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < qn.length && t !== 0 && t < qn[n].priority; n++) ;
      qn.splice(n, 0, e), n === 0 && n1(e);
    }
  };
  var s1 = s.version;
  if (s1 !== "19.2.3")
    throw Error(
      c(
        527,
        s1,
        "19.2.3"
      )
    );
  V.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = b(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Vh = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Os = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Os.isDisabled && Os.supportsFiber)
      try {
        ma = Os.inject(
          Vh
        ), bt = Os;
      } catch {
      }
  }
  return sr.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var n = !1, l = "", a = mf, i = hf, d = gf;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = K0(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      a,
      i,
      d,
      r1
    ), e[yl] = t.current, Po(e), new bc(t);
  }, sr.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(c(299));
    var l = !1, a = "", i = mf, d = hf, h = gf, y = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (y = n.formState)), t = K0(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      a,
      y,
      i,
      d,
      h,
      r1
    ), t.context = J0(null), n = t.current, l = Tt(), l = ii(l), a = En(l), a.callback = null, Tn(n, a, l), n = l, t.current.lanes = n, ga(t, n), Xt(t), e[yl] = t.current, Po(e), new Ms(t);
  }, sr.version = "19.2.3", sr;
}
var p1;
function n4() {
  if (p1) return Sc.exports;
  p1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (s) {
        console.error(s);
      }
  }
  return u(), Sc.exports = t4(), Sc.exports;
}
var l4 = n4();
const X1 = /* @__PURE__ */ Yc(l4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a4 = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), r4 = (u) => u.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, o, c) => c ? c.toUpperCase() : o.toLowerCase()
), x1 = (u) => {
  const s = r4(u);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, Q1 = (...u) => u.filter((s, o, c) => !!s && s.trim() !== "" && c.indexOf(s) === o).join(" ").trim(), s4 = (u) => {
  for (const s in u)
    if (s.startsWith("aria-") || s === "role" || s === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var i4 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o4 = A.forwardRef(
  ({
    color: u = "currentColor",
    size: s = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: m,
    iconNode: x,
    ...p
  }, g) => A.createElement(
    "svg",
    {
      ref: g,
      ...i4,
      width: s,
      height: s,
      stroke: u,
      strokeWidth: c ? Number(o) * 24 / Number(s) : o,
      className: Q1("lucide", f),
      ...!m && !s4(p) && { "aria-hidden": "true" },
      ...p
    },
    [
      ...x.map(([b, S]) => A.createElement(b, S)),
      ...Array.isArray(m) ? m : [m]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I = (u, s) => {
  const o = A.forwardRef(
    ({ className: c, ...f }, m) => A.createElement(o4, {
      ref: m,
      iconNode: s,
      className: Q1(
        `lucide-${a4(x1(u))}`,
        `lucide-${u}`,
        c
      ),
      ...f
    })
  );
  return o.displayName = x1(u), o;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c4 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], u4 = I("arrow-down-to-line", c4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], f4 = I("arrow-up-right", d4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], h4 = I("bell", m4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], p4 = I("book-open", g4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x4 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], b4 = I("book", x4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y4 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], Z1 = I("bot", y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v4 = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
], S4 = I("boxes", v4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j4 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
], C4 = I("brain-circuit", j4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N4 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], K1 = I("brain", N4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E4 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
], T4 = I("calculator", E4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], J1 = I("check", w4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ca = I("chevron-down", _4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Vc = I("chevron-right", k4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Ws = I("circle-alert", z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Xc = I("circle-check-big", A4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], O4 = I("circle-check", M4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R4 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], D4 = I("clock", R4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U4 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], L4 = I("cloud", U4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], W1 = I("copy", B4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H4 = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], b1 = I("corner-down-left", H4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q4 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
], Qc = I("cpu", q4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G4 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], mr = I("database", G4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y4 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], $s = I("download", Y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], V4 = I("external-link", $4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X4 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Q4 = I("eye", X4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z4 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], Zc = I("file-text", Z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K4 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], J4 = I("hash", K4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], F4 = I("info", W4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I4 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Kc = I("key", I4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P4 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], F1 = I("layers", P4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eg = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], tg = I("layout-dashboard", eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ng = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], lg = I("list", ng);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ag = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], hr = I("loader-circle", ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rg = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], sg = I("maximize-2", rg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ig = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], og = I("menu", ig);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], y1 = I("moon", cg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ug = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], I1 = I("network", ug);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dg = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
], v1 = I("palette", dg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fg = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], mg = I("pause", fg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], gg = I("pen", hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pg = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Jc = I("play", pg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xg = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Wc = I("plus", xg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bg = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Fc = I("power", bg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Zt = I("refresh-cw", yg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vg = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], P1 = I("regex", vg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sg = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], jg = I("save", Sg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], Ng = I("scissors", Cg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eg = [
  ["path", { d: "M15 12h-5", key: "r7krc0" }],
  ["path", { d: "M15 8h-5", key: "1khuty" }],
  ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4", key: "zz82l3" }],
  [
    "path",
    {
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
      key: "1ph1d7"
    }
  ]
], Tg = I("scroll-text", Eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], oa = I("search", wg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _g = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], kg = I("send", _g);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zg = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], em = I("server", zg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ag = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], tm = I("settings", Ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], Ic = I("settings-2", Mg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Og = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Rg = I("sun", Og);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dg = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], da = I("terminal", Dg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ug = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], fa = I("trash-2", Ug);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lg = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Bg = I("triangle-alert", Lg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hg = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], qg = I("upload", Hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gg = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Fs = I("x", Gg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yg = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Pc = I("zap", Yg), $g = () => /* @__PURE__ */ r.jsx("style", { children: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');
    
    :root {
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    body {
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .font-mono {
      font-family: var(--font-mono);
    }
    
    /* Custom Scrollbar for dark theme - Minimalist */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(63, 63, 70, 0.4); /* zinc-700 with opacity */
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(82, 82, 91, 0.6); /* zinc-600 with opacity */
    }

    /* Animation Utilities */
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .fade-in {
      opacity: 0;
      animation: fadeIn 0.3s ease-out forwards;
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Utility to hide scrollbar but keep functionality */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  ` }), zc = [
  // 导航命令
  {
    id: "nav-memory",
    icon: lg,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (u) => u("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: I1,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (u) => u("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: K1,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (u) => u("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Kc,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (u) => u("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: da,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (u) => u("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: tm,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (u) => u("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function Vg(u) {
  const s = u.toLowerCase().trim();
  return s ? zc.filter((o) => {
    var c;
    return o.label.toLowerCase().includes(s) || ((c = o.description) == null ? void 0 : c.toLowerCase().includes(s)) || o.keywords.some((f) => f.toLowerCase().includes(s));
  }) : zc;
}
const Xg = {
  name: "Paper (Light)",
  colors: {
    background: "oklch(1.0000 0 0)",
    foreground: "oklch(0.1884 0.0128 248.5103)",
    card: "oklch(0.9784 0.0011 197.1387)",
    cardForeground: "oklch(0.1884 0.0128 248.5103)",
    popover: "oklch(1.0000 0 0)",
    popoverForeground: "oklch(0.1884 0.0128 248.5103)",
    primary: "oklch(0.6723 0.1606 244.9955)",
    primaryForeground: "oklch(1.0000 0 0)",
    secondary: "oklch(0.1884 0.0128 248.5103)",
    secondaryForeground: "oklch(1.0000 0 0)",
    muted: "oklch(0.9222 0.0013 286.3737)",
    mutedForeground: "oklch(0.1884 0.0128 248.5103)",
    accent: "oklch(0.9392 0.0166 250.8453)",
    accentForeground: "oklch(0.6723 0.1606 244.9955)",
    destructive: "oklch(0.6188 0.2376 25.7658)",
    destructiveForeground: "oklch(1.0000 0 0)",
    border: "oklch(0.9317 0.0118 231.6594)",
    input: "oklch(0.9809 0.0025 228.7836)",
    ring: "oklch(0.6818 0.1584 243.3540)",
    chart1: "oklch(0.6723 0.1606 244.9955)",
    chart2: "oklch(0.6907 0.1554 160.3454)",
    chart3: "oklch(0.8214 0.1600 82.5337)",
    chart4: "oklch(0.7064 0.1822 151.7125)",
    chart5: "oklch(0.5919 0.2186 10.5826)",
    sidebar: "oklch(0.9784 0.0011 197.1387)",
    sidebarForeground: "oklch(0.1884 0.0128 248.5103)",
    sidebarPrimary: "oklch(0.6723 0.1606 244.9955)",
    sidebarPrimaryForeground: "oklch(1.0000 0 0)",
    sidebarAccent: "oklch(0.9392 0.0166 250.8453)",
    sidebarAccentForeground: "oklch(0.6723 0.1606 244.9955)",
    sidebarBorder: "oklch(0.9271 0.0101 238.5177)",
    sidebarRing: "oklch(0.6818 0.1584 243.3540)"
  },
  variables: {
    radius: "1.3rem"
  }
}, Qg = {
  name: "Claude (Dark)",
  colors: {
    background: "oklch(0.2679 0.0036 106.6427)",
    foreground: "oklch(0.8074 0.0142 93.0137)",
    card: "oklch(0.2679 0.0036 106.6427)",
    cardForeground: "oklch(0.8074 0.0142 93.0137)",
    popover: "oklch(0.2357 0.0024 67.7077)",
    popoverForeground: "oklch(0.8074 0.0142 93.0137)",
    primary: "oklch(0.6724 0.1308 38.7559)",
    primaryForeground: "oklch(1.0000 0 0)",
    secondary: "oklch(0.2213 0.0038 106.7070)",
    secondaryForeground: "oklch(0.8074 0.0142 93.0137)",
    muted: "oklch(0.2357 0.0024 67.7077)",
    mutedForeground: "oklch(0.7713 0.0169 99.0657)",
    accent: "oklch(0.6724 0.1308 38.7559)",
    accentForeground: "oklch(1.0000 0 0)",
    destructive: "oklch(0.6368 0.2078 25.3313)",
    destructiveForeground: "oklch(1.0000 0 0)",
    border: "oklch(0.3618 0.0101 106.8928)",
    input: "oklch(0.4336 0.0113 100.2195)",
    ring: "oklch(0.6724 0.1308 38.7559)",
    chart1: "oklch(0.6724 0.1308 38.7559)",
    chart2: "oklch(0.6898 0.1581 290.4107)",
    chart3: "oklch(0.8816 0.0276 93.1280)",
    chart4: "oklch(0.3074 0.0516 289.3230)",
    chart5: "oklch(0.6368 0.2078 25.3313)",
    sidebar: "oklch(0.2357 0.0024 67.7077)",
    sidebarForeground: "oklch(0.7713 0.0169 99.0657)",
    sidebarPrimary: "oklch(0.6724 0.1308 38.7559)",
    sidebarPrimaryForeground: "oklch(1.0000 0 0)",
    sidebarAccent: "oklch(0.2213 0.0038 106.7070)",
    sidebarAccentForeground: "oklch(0.8074 0.0142 93.0137)",
    sidebarBorder: "oklch(0.3618 0.0101 106.8928)",
    sidebarRing: "oklch(0.6724 0.1308 38.7559)"
  },
  variables: {
    radius: "0.4rem"
  }
}, Zg = {
  name: "Twitter (Dark)",
  colors: {
    background: "oklch(0 0 0)",
    foreground: "oklch(0.9328 0.0025 228.7857)",
    card: "oklch(0 0 0)",
    // Matching background for seamless look, or slightly lighter
    cardForeground: "oklch(0.9328 0.0025 228.7857)",
    popover: "oklch(0 0 0)",
    popoverForeground: "oklch(0.9328 0.0025 228.7857)",
    primary: "oklch(0.6692 0.1607 245.0110)",
    primaryForeground: "oklch(1.0000 0 0)",
    secondary: "oklch(0.2097 0.0080 274.5332)",
    // Using card color from ref as secondary
    secondaryForeground: "oklch(0.8853 0 0)",
    muted: "oklch(0.2090 0 0)",
    mutedForeground: "oklch(0.5637 0.0078 247.9662)",
    accent: "oklch(0.1928 0.0331 242.5459)",
    accentForeground: "oklch(0.6692 0.1607 245.0110)",
    destructive: "oklch(0.6188 0.2376 25.7658)",
    destructiveForeground: "oklch(1.0000 0 0)",
    border: "oklch(0.2674 0.0047 248.0045)",
    input: "oklch(0.3020 0.0288 244.8244)",
    ring: "oklch(0.6818 0.1584 243.3540)",
    chart1: "oklch(0.6723 0.1606 244.9955)",
    chart2: "oklch(0.6907 0.1554 160.3454)",
    chart3: "oklch(0.8214 0.1600 82.5337)",
    chart4: "oklch(0.7064 0.1822 151.7125)",
    chart5: "oklch(0.5919 0.2186 10.5826)",
    sidebar: "oklch(0 0 0)",
    sidebarForeground: "oklch(0.9328 0.0025 228.7857)",
    sidebarPrimary: "oklch(0.6692 0.1607 245.0110)",
    sidebarPrimaryForeground: "oklch(1.0000 0 0)",
    sidebarAccent: "oklch(0.1928 0.0331 242.5459)",
    sidebarAccentForeground: "oklch(0.6692 0.1607 245.0110)",
    sidebarBorder: "oklch(0.2674 0.0047 248.0045)",
    sidebarRing: "oklch(0.6818 0.1584 243.3540)"
  },
  variables: {
    radius: "1.3rem"
  }
}, Kg = {
  name: "Discord (Dark)",
  colors: {
    background: "#313338",
    foreground: "#f2f3f5",
    card: "#2b2d31",
    cardForeground: "#f2f3f5",
    popover: "#313338",
    popoverForeground: "#f2f3f5",
    primary: "#5865f2",
    primaryForeground: "#ffffff",
    secondary: "#2b2d31",
    secondaryForeground: "#f2f3f5",
    muted: "#1e1f22",
    mutedForeground: "#949ba4",
    accent: "#3f4147",
    accentForeground: "#f2f3f5",
    destructive: "#fa777c",
    destructiveForeground: "#313338",
    border: "#1e1f22",
    input: "#1e1f22",
    ring: "#5865f2",
    chart1: "#5865f2",
    chart2: "#23a559",
    chart3: "#f0b232",
    chart4: "#00a8fc",
    chart5: "#eb459e",
    sidebar: "#1e1f22",
    sidebarForeground: "#949ba4",
    sidebarPrimary: "#5865f2",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent: "#3f4147",
    sidebarAccentForeground: "#f2f3f5",
    sidebarBorder: "#1e1f22",
    sidebarRing: "#5865f2"
  },
  variables: {
    radius: "0.25rem"
  }
}, Jg = {
  name: "Catppuccin Mocha",
  colors: {
    background: "#1e1e2e",
    // foreground: '#cdd6f4', // Old Text
    foreground: "#cba6f7",
    // Modified: Mauve as requested
    card: "#313244",
    cardForeground: "#cba6f7",
    // Also match text
    popover: "#1e1e2e",
    popoverForeground: "#cba6f7",
    primary: "#89b4fa",
    primaryForeground: "#1e1e2e",
    secondary: "#45475a",
    secondaryForeground: "#cba6f7",
    muted: "#313244",
    mutedForeground: "#a6adc8",
    accent: "#45475a",
    accentForeground: "#cba6f7",
    destructive: "#f38ba8",
    destructiveForeground: "#1e1e2e",
    border: "#313244",
    input: "#313244",
    ring: "#89b4fa",
    chart1: "#89b4fa",
    chart2: "#a6e3a1",
    chart3: "#f9e2af",
    chart4: "#fab387",
    chart5: "#cba6f7",
    sidebar: "#181825",
    sidebarForeground: "#cba6f7",
    // Mauve
    sidebarPrimary: "#89b4fa",
    sidebarPrimaryForeground: "#1e1e2e",
    sidebarAccent: "#313244",
    sidebarAccentForeground: "#cba6f7",
    sidebarBorder: "#11111b",
    sidebarRing: "#89b4fa"
  },
  variables: {
    radius: "0.5rem"
  }
}, Wg = {
  name: "SillyTavern (继承)",
  colors: {
    background: "var(--SmartThemeBlurTintColor)",
    foreground: "var(--SmartThemeBodyColor)",
    card: "var(--SmartThemeBlurTintColor)",
    cardForeground: "var(--SmartThemeBodyColor)",
    popover: "var(--SmartThemeBlurTintColor)",
    popoverForeground: "var(--SmartThemeBodyColor)",
    primary: "var(--SmartThemeQuoteColor)",
    primaryForeground: "var(--SmartThemeBodyColor)",
    secondary: "var(--SmartThemeBorderColor)",
    secondaryForeground: "var(--SmartThemeBodyColor)",
    muted: "rgba(0,0,0,0.2)",
    mutedForeground: "rgba(255,255,255,0.5)",
    accent: "var(--SmartThemeQuoteColor)",
    accentForeground: "var(--SmartThemeBodyColor)",
    destructive: "var(--SmartThemeBorderColor)",
    destructiveForeground: "var(--SmartThemeBodyColor)",
    border: "var(--SmartThemeBorderColor)",
    input: "var(--SmartThemeBorderColor)",
    ring: "var(--SmartThemeQuoteColor)",
    chart1: "var(--SmartThemeQuoteColor)",
    chart2: "var(--SmartThemeQuoteColor)",
    chart3: "var(--SmartThemeQuoteColor)",
    chart4: "var(--SmartThemeQuoteColor)",
    chart5: "var(--SmartThemeQuoteColor)",
    sidebar: "var(--SmartThemeBlurTintColor)",
    sidebarForeground: "var(--SmartThemeBodyColor)",
    sidebarPrimary: "var(--SmartThemeQuoteColor)",
    sidebarPrimaryForeground: "var(--SmartThemeBodyColor)",
    sidebarAccent: "var(--SmartThemeBorderColor)",
    sidebarAccentForeground: "var(--SmartThemeBodyColor)",
    sidebarBorder: "var(--SmartThemeBorderColor)",
    sidebarRing: "var(--SmartThemeQuoteColor)"
  },
  variables: {
    radius: "0.4rem"
  }
}, qs = {
  sillytavern: Wg,
  // SillyTavern 继承主题
  paperLight: Xg,
  twitterDark: Zg,
  claudeDark: Qg,
  catppuccin: Jg,
  discord: Kg
}, at = [];
for (let u = 0; u < 256; ++u)
  at.push((u + 256).toString(16).slice(1));
function Fg(u, s = 0) {
  return (at[u[s + 0]] + at[u[s + 1]] + at[u[s + 2]] + at[u[s + 3]] + "-" + at[u[s + 4]] + at[u[s + 5]] + "-" + at[u[s + 6]] + at[u[s + 7]] + "-" + at[u[s + 8]] + at[u[s + 9]] + "-" + at[u[s + 10]] + at[u[s + 11]] + at[u[s + 12]] + at[u[s + 13]] + at[u[s + 14]] + at[u[s + 15]]).toLowerCase();
}
let Ec;
const Ig = new Uint8Array(16);
function Pg() {
  if (!Ec) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Ec = crypto.getRandomValues.bind(crypto);
  }
  return Ec(Ig);
}
const e3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), S1 = { randomUUID: e3 };
function t3(u, s, o) {
  var f;
  u = u || {};
  const c = u.random ?? ((f = u.rng) == null ? void 0 : f.call(u)) ?? Pg();
  if (c.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, Fg(c);
}
function n3(u, s, o) {
  return S1.randomUUID && !u ? S1.randomUUID() : t3(u);
}
var Ac = function(u, s) {
  return Ac = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, c) {
    o.__proto__ = c;
  } || function(o, c) {
    for (var f in c) Object.prototype.hasOwnProperty.call(c, f) && (o[f] = c[f]);
  }, Ac(u, s);
};
function gr(u, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  Ac(u, s);
  function o() {
    this.constructor = u;
  }
  u.prototype = s === null ? Object.create(s) : (o.prototype = s.prototype, new o());
}
function Mc(u) {
  var s = typeof Symbol == "function" && Symbol.iterator, o = s && u[s], c = 0;
  if (o) return o.call(u);
  if (u && typeof u.length == "number") return {
    next: function() {
      return u && c >= u.length && (u = void 0), { value: u && u[c++], done: !u };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Oc(u, s) {
  var o = typeof Symbol == "function" && u[Symbol.iterator];
  if (!o) return u;
  var c = o.call(u), f, m = [], x;
  try {
    for (; (s === void 0 || s-- > 0) && !(f = c.next()).done; ) m.push(f.value);
  } catch (p) {
    x = { error: p };
  } finally {
    try {
      f && !f.done && (o = c.return) && o.call(c);
    } finally {
      if (x) throw x.error;
    }
  }
  return m;
}
function Rc(u, s, o) {
  if (o || arguments.length === 2) for (var c = 0, f = s.length, m; c < f; c++)
    (m || !(c in s)) && (m || (m = Array.prototype.slice.call(s, 0, c)), m[c] = s[c]);
  return u.concat(m || Array.prototype.slice.call(s));
}
function Kt(u) {
  return typeof u == "function";
}
function nm(u) {
  var s = function(c) {
    Error.call(c), c.stack = new Error().stack;
  }, o = u(s);
  return o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o;
}
var Tc = nm(function(u) {
  return function(o) {
    u(this), this.message = o ? o.length + ` errors occurred during unsubscription:
` + o.map(function(c, f) {
      return f + 1 + ") " + c.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = o;
  };
});
function Dc(u, s) {
  if (u) {
    var o = u.indexOf(s);
    0 <= o && u.splice(o, 1);
  }
}
var Is = (function() {
  function u(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return u.prototype.unsubscribe = function() {
    var s, o, c, f, m;
    if (!this.closed) {
      this.closed = !0;
      var x = this._parentage;
      if (x)
        if (this._parentage = null, Array.isArray(x))
          try {
            for (var p = Mc(x), g = p.next(); !g.done; g = p.next()) {
              var b = g.value;
              b.remove(this);
            }
          } catch (G) {
            s = { error: G };
          } finally {
            try {
              g && !g.done && (o = p.return) && o.call(p);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          x.remove(this);
      var S = this.initialTeardown;
      if (Kt(S))
        try {
          S();
        } catch (G) {
          m = G instanceof Tc ? G.errors : [G];
        }
      var v = this._finalizers;
      if (v) {
        this._finalizers = null;
        try {
          for (var R = Mc(v), q = R.next(); !q.done; q = R.next()) {
            var _ = q.value;
            try {
              j1(_);
            } catch (G) {
              m = m ?? [], G instanceof Tc ? m = Rc(Rc([], Oc(m)), Oc(G.errors)) : m.push(G);
            }
          }
        } catch (G) {
          c = { error: G };
        } finally {
          try {
            q && !q.done && (f = R.return) && f.call(R);
          } finally {
            if (c) throw c.error;
          }
        }
      }
      if (m)
        throw new Tc(m);
    }
  }, u.prototype.add = function(s) {
    var o;
    if (s && s !== this)
      if (this.closed)
        j1(s);
      else {
        if (s instanceof u) {
          if (s.closed || s._hasParent(this))
            return;
          s._addParent(this);
        }
        (this._finalizers = (o = this._finalizers) !== null && o !== void 0 ? o : []).push(s);
      }
  }, u.prototype._hasParent = function(s) {
    var o = this._parentage;
    return o === s || Array.isArray(o) && o.includes(s);
  }, u.prototype._addParent = function(s) {
    var o = this._parentage;
    this._parentage = Array.isArray(o) ? (o.push(s), o) : o ? [o, s] : s;
  }, u.prototype._removeParent = function(s) {
    var o = this._parentage;
    o === s ? this._parentage = null : Array.isArray(o) && Dc(o, s);
  }, u.prototype.remove = function(s) {
    var o = this._finalizers;
    o && Dc(o, s), s instanceof u && s._removeParent(this);
  }, u.EMPTY = (function() {
    var s = new u();
    return s.closed = !0, s;
  })(), u;
})(), lm = Is.EMPTY;
function am(u) {
  return u instanceof Is || u && "closed" in u && Kt(u.remove) && Kt(u.add) && Kt(u.unsubscribe);
}
function j1(u) {
  Kt(u) ? u() : u.unsubscribe();
}
var l3 = {
  Promise: void 0
}, a3 = {
  setTimeout: function(u, s) {
    for (var o = [], c = 2; c < arguments.length; c++)
      o[c - 2] = arguments[c];
    return setTimeout.apply(void 0, Rc([u, s], Oc(o)));
  },
  clearTimeout: function(u) {
    return clearTimeout(u);
  },
  delegate: void 0
};
function r3(u) {
  a3.setTimeout(function() {
    throw u;
  });
}
function C1() {
}
function Gs(u) {
  u();
}
var eu = (function(u) {
  gr(s, u);
  function s(o) {
    var c = u.call(this) || this;
    return c.isStopped = !1, o ? (c.destination = o, am(o) && o.add(c)) : c.destination = o3, c;
  }
  return s.create = function(o, c, f) {
    return new Uc(o, c, f);
  }, s.prototype.next = function(o) {
    this.isStopped || this._next(o);
  }, s.prototype.error = function(o) {
    this.isStopped || (this.isStopped = !0, this._error(o));
  }, s.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, s.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, u.prototype.unsubscribe.call(this), this.destination = null);
  }, s.prototype._next = function(o) {
    this.destination.next(o);
  }, s.prototype._error = function(o) {
    try {
      this.destination.error(o);
    } finally {
      this.unsubscribe();
    }
  }, s.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, s;
})(Is), s3 = (function() {
  function u(s) {
    this.partialObserver = s;
  }
  return u.prototype.next = function(s) {
    var o = this.partialObserver;
    if (o.next)
      try {
        o.next(s);
      } catch (c) {
        Rs(c);
      }
  }, u.prototype.error = function(s) {
    var o = this.partialObserver;
    if (o.error)
      try {
        o.error(s);
      } catch (c) {
        Rs(c);
      }
    else
      Rs(s);
  }, u.prototype.complete = function() {
    var s = this.partialObserver;
    if (s.complete)
      try {
        s.complete();
      } catch (o) {
        Rs(o);
      }
  }, u;
})(), Uc = (function(u) {
  gr(s, u);
  function s(o, c, f) {
    var m = u.call(this) || this, x;
    return Kt(o) || !o ? x = {
      next: o ?? void 0,
      error: c ?? void 0,
      complete: f ?? void 0
    } : x = o, m.destination = new s3(x), m;
  }
  return s;
})(eu);
function Rs(u) {
  r3(u);
}
function i3(u) {
  throw u;
}
var o3 = {
  closed: !0,
  next: C1,
  error: i3,
  complete: C1
}, c3 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function u3(u) {
  return u;
}
function d3(u) {
  return u.length === 0 ? u3 : u.length === 1 ? u[0] : function(o) {
    return u.reduce(function(c, f) {
      return f(c);
    }, o);
  };
}
var N1 = (function() {
  function u(s) {
    s && (this._subscribe = s);
  }
  return u.prototype.lift = function(s) {
    var o = new u();
    return o.source = this, o.operator = s, o;
  }, u.prototype.subscribe = function(s, o, c) {
    var f = this, m = m3(s) ? s : new Uc(s, o, c);
    return Gs(function() {
      var x = f, p = x.operator, g = x.source;
      m.add(p ? p.call(m, g) : g ? f._subscribe(m) : f._trySubscribe(m));
    }), m;
  }, u.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (o) {
      s.error(o);
    }
  }, u.prototype.forEach = function(s, o) {
    var c = this;
    return o = E1(o), new o(function(f, m) {
      var x = new Uc({
        next: function(p) {
          try {
            s(p);
          } catch (g) {
            m(g), x.unsubscribe();
          }
        },
        error: m,
        complete: f
      });
      c.subscribe(x);
    });
  }, u.prototype._subscribe = function(s) {
    var o;
    return (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(s);
  }, u.prototype[c3] = function() {
    return this;
  }, u.prototype.pipe = function() {
    for (var s = [], o = 0; o < arguments.length; o++)
      s[o] = arguments[o];
    return d3(s)(this);
  }, u.prototype.toPromise = function(s) {
    var o = this;
    return s = E1(s), new s(function(c, f) {
      var m;
      o.subscribe(function(x) {
        return m = x;
      }, function(x) {
        return f(x);
      }, function() {
        return c(m);
      });
    });
  }, u.create = function(s) {
    return new u(s);
  }, u;
})();
function E1(u) {
  var s;
  return (s = u ?? l3.Promise) !== null && s !== void 0 ? s : Promise;
}
function f3(u) {
  return u && Kt(u.next) && Kt(u.error) && Kt(u.complete);
}
function m3(u) {
  return u && u instanceof eu || f3(u) && am(u);
}
function h3(u) {
  return Kt(u == null ? void 0 : u.lift);
}
function g3(u) {
  return function(s) {
    if (h3(s))
      return s.lift(function(o) {
        try {
          return u(o, this);
        } catch (c) {
          this.error(c);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function p3(u, s, o, c, f) {
  return new x3(u, s, o, c, f);
}
var x3 = (function(u) {
  gr(s, u);
  function s(o, c, f, m, x, p) {
    var g = u.call(this, o) || this;
    return g.onFinalize = x, g.shouldUnsubscribe = p, g._next = c ? function(b) {
      try {
        c(b);
      } catch (S) {
        o.error(S);
      }
    } : u.prototype._next, g._error = m ? function(b) {
      try {
        m(b);
      } catch (S) {
        o.error(S);
      } finally {
        this.unsubscribe();
      }
    } : u.prototype._error, g._complete = f ? function() {
      try {
        f();
      } catch (b) {
        o.error(b);
      } finally {
        this.unsubscribe();
      }
    } : u.prototype._complete, g;
  }
  return s.prototype.unsubscribe = function() {
    var o;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var c = this.closed;
      u.prototype.unsubscribe.call(this), !c && ((o = this.onFinalize) === null || o === void 0 || o.call(this));
    }
  }, s;
})(eu), b3 = nm(function(u) {
  return function() {
    u(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), tu = (function(u) {
  gr(s, u);
  function s() {
    var o = u.call(this) || this;
    return o.closed = !1, o.currentObservers = null, o.observers = [], o.isStopped = !1, o.hasError = !1, o.thrownError = null, o;
  }
  return s.prototype.lift = function(o) {
    var c = new T1(this, this);
    return c.operator = o, c;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new b3();
  }, s.prototype.next = function(o) {
    var c = this;
    Gs(function() {
      var f, m;
      if (c._throwIfClosed(), !c.isStopped) {
        c.currentObservers || (c.currentObservers = Array.from(c.observers));
        try {
          for (var x = Mc(c.currentObservers), p = x.next(); !p.done; p = x.next()) {
            var g = p.value;
            g.next(o);
          }
        } catch (b) {
          f = { error: b };
        } finally {
          try {
            p && !p.done && (m = x.return) && m.call(x);
          } finally {
            if (f) throw f.error;
          }
        }
      }
    });
  }, s.prototype.error = function(o) {
    var c = this;
    Gs(function() {
      if (c._throwIfClosed(), !c.isStopped) {
        c.hasError = c.isStopped = !0, c.thrownError = o;
        for (var f = c.observers; f.length; )
          f.shift().error(o);
      }
    });
  }, s.prototype.complete = function() {
    var o = this;
    Gs(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.isStopped = !0;
        for (var c = o.observers; c.length; )
          c.shift().complete();
      }
    });
  }, s.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(s.prototype, "observed", {
    get: function() {
      var o;
      return ((o = this.observers) === null || o === void 0 ? void 0 : o.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), s.prototype._trySubscribe = function(o) {
    return this._throwIfClosed(), u.prototype._trySubscribe.call(this, o);
  }, s.prototype._subscribe = function(o) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(o), this._innerSubscribe(o);
  }, s.prototype._innerSubscribe = function(o) {
    var c = this, f = this, m = f.hasError, x = f.isStopped, p = f.observers;
    return m || x ? lm : (this.currentObservers = null, p.push(o), new Is(function() {
      c.currentObservers = null, Dc(p, o);
    }));
  }, s.prototype._checkFinalizedStatuses = function(o) {
    var c = this, f = c.hasError, m = c.thrownError, x = c.isStopped;
    f ? o.error(m) : x && o.complete();
  }, s.prototype.asObservable = function() {
    var o = new N1();
    return o.source = this, o;
  }, s.create = function(o, c) {
    return new T1(o, c);
  }, s;
})(N1), T1 = (function(u) {
  gr(s, u);
  function s(o, c) {
    var f = u.call(this) || this;
    return f.destination = o, f.source = c, f;
  }
  return s.prototype.next = function(o) {
    var c, f;
    (f = (c = this.destination) === null || c === void 0 ? void 0 : c.next) === null || f === void 0 || f.call(c, o);
  }, s.prototype.error = function(o) {
    var c, f;
    (f = (c = this.destination) === null || c === void 0 ? void 0 : c.error) === null || f === void 0 || f.call(c, o);
  }, s.prototype.complete = function() {
    var o, c;
    (c = (o = this.destination) === null || o === void 0 ? void 0 : o.complete) === null || c === void 0 || c.call(o);
  }, s.prototype._subscribe = function(o) {
    var c, f;
    return (f = (c = this.source) === null || c === void 0 ? void 0 : c.subscribe(o)) !== null && f !== void 0 ? f : lm;
  }, s;
})(tu);
function y3(u, s) {
  return g3(function(o, c) {
    var f = 0;
    o.subscribe(p3(c, function(m) {
      return u.call(s, m, f++) && c.next(m);
    }));
  });
}
const Ds = new tu(), v3 = {
  /**
   * 发布事件
   */
  emit(u) {
    Ds.next({
      ...u,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(u) {
    const s = Ds.subscribe(u);
    return {
      unsubscribe: () => s.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(u, s) {
    const o = Ds.pipe(y3((c) => c.type === u)).subscribe((c) => s(c.payload));
    return {
      unsubscribe: () => o.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Ds.asObservable();
  }
};
var Ue = /* @__PURE__ */ ((u) => (u[u.DEBUG = 0] = "DEBUG", u[u.INFO = 1] = "INFO", u[u.SUCCESS = 2] = "SUCCESS", u[u.WARN = 3] = "WARN", u[u.ERROR = 4] = "ERROR", u))(Ue || {});
const Vs = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, rm = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, sm = new tu();
let hn = [], ur = { ...rm };
function S3(u) {
  return new Date(u).toTimeString().slice(0, 8);
}
function ia(u, s, o, c) {
  if (u < ur.minLevel) return;
  const f = {
    id: n3(),
    timestamp: Date.now(),
    level: u,
    module: s,
    message: o,
    data: c
  };
  hn.push(f), hn.length > ur.maxEntries && (hn = hn.slice(-ur.maxEntries)), sm.next(f);
}
function j3() {
  v3.subscribe((u) => {
    const o = {
      INGESTION_START: Ue.INFO,
      INGESTION_COMPLETE: Ue.SUCCESS,
      ENTITY_CREATED: Ue.INFO,
      MEMORY_STORED: Ue.SUCCESS,
      RETRIEVAL_START: Ue.DEBUG,
      RETRIEVAL_COMPLETE: Ue.SUCCESS,
      CHAT_CHANGED: Ue.INFO,
      MESSAGE_RECEIVED: Ue.DEBUG
    }[u.type] ?? Ue.DEBUG;
    ia(o, "EventBus", `${u.type}`, u.payload);
  });
}
const ae = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(u) {
    u && (ur = { ...ur, ...u }), hn = [], j3(), ae.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(u, s, o) {
    ia(Ue.DEBUG, u, s, o);
  },
  /**
   * INFO 级别日志
   */
  info(u, s, o) {
    ia(Ue.INFO, u, s, o);
  },
  /**
   * SUCCESS 级别日志
   */
  success(u, s, o) {
    ia(Ue.SUCCESS, u, s, o);
  },
  /**
   * WARN 级别日志
   */
  warn(u, s, o) {
    ia(Ue.WARN, u, s, o);
  },
  /**
   * ERROR 级别日志
   */
  error(u, s, o) {
    ia(Ue.ERROR, u, s, o);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...hn];
  },
  /**
   * 订阅新日志
   */
  subscribe(u) {
    const s = sm.subscribe(u);
    return () => s.unsubscribe();
  },
  /**
   * 清空所有日志（仅内存）
   */
  clear() {
    hn = [], ae.info("Logger", "日志已清空");
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const u = /* @__PURE__ */ new Date();
    u.toISOString().slice(0, 10), u.toTimeString().slice(0, 8).replace(/:/g, "");
    const s = {
      [Ue.DEBUG]: "DEBUG",
      [Ue.INFO]: "INFO",
      [Ue.SUCCESS]: "SUCCESS",
      [Ue.WARN]: "WARN",
      [Ue.ERROR]: "ERROR"
    };
    let o = `# Engram Debug Log

`;
    o += `- **导出时间**: ${u.toLocaleString("zh-CN")}
`, o += `- **版本**: 0.1.0
`, o += `- **日志条数**: ${hn.length}

`, o += `---

`, o += `## 日志记录

`, o += "```\n";
    for (const c of hn) {
      const f = S3(c.timestamp), m = s[c.level].padEnd(7), x = c.module.padEnd(16);
      if (o += `[${f}] [${x}] ${m} ${c.message}
`, c.data !== void 0) {
        const p = JSON.stringify(c.data, null, 2).split(`
`).map((g) => `    ${g}`).join(`
`);
        o += `${p}
`;
      }
    }
    return o += "```\n", o;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const u = /* @__PURE__ */ new Date(), s = u.toISOString().slice(0, 10), o = u.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${s}_${o}.md`;
  }
}, nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: rm,
  LogLevel: Ue,
  LogLevelConfig: Vs,
  Logger: ae
}, Symbol.toStringTag, { value: "Module" })), fl = Object.freeze({
  theme: "odysseia",
  presets: {},
  templates: {},
  promptTemplates: [],
  hasSeenWelcome: !1,
  lastReadVersion: "0.0.0",
  summarizerConfig: {},
  trimmerConfig: {},
  regexRules: [],
  apiSettings: null,
  linkedDeletion: {
    enabled: !0,
    deleteWorldbook: !0,
    deleteIndexedDB: !1,
    // 默认不删数据库，以防万一
    showConfirmation: !0
  }
});
class Le {
  /**
   * 获取 SillyTavern context
   */
  static getContext() {
    var s, o;
    return (o = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : o.call(s);
  }
  /**
   * 获取扩展设置对象
   * 如果不存在则创建
   */
  /**
   * 获取扩展设置对象
   * 如果不存在则创建
   */
  static getSettings() {
    const s = this.getContext();
    return s != null && s.extensionSettings ? (s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...fl }, ae.debug("SettingsManager", "Initialized engram settings with defaults"), this.save()), s.extensionSettings[this.EXTENSION_NAME]) : (ae.warn("SettingsManager", "SillyTavern context.extensionSettings not available"), { ...fl });
  }
  static getExtensionSettings() {
    return this.getSettings();
  }
  /**
   * 初始化设置（在扩展加载时调用）
   * 确保所有必需的字段都存在
   */
  static initSettings() {
    const s = this.getContext();
    if (!(s != null && s.extensionSettings)) {
      ae.warn("SettingsManager", "Cannot init settings: context not available");
      return;
    }
    let o = !1;
    s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...fl }, o = !0, ae.info("SettingsManager", "Created engram settings"));
    const c = s.extensionSettings[this.EXTENSION_NAME];
    for (const f of Object.keys(fl))
      f in c || (c[f] = fl[f], o = !0, ae.debug("SettingsManager", `Added missing field: ${f}`));
    o && this.save();
  }
  /**
   * Get a specific setting value
   */
  static get(s) {
    const c = this.getExtensionSettings()[s];
    return c !== void 0 ? c : fl[s];
  }
  /**
   * Save a specific setting value
   * 直接更新 context.extensionSettings 中的字段
   */
  static set(s, o) {
    const c = this.getContext();
    if (!(c != null && c.extensionSettings)) {
      ae.warn("SettingsManager", "Cannot set: context.extensionSettings not available");
      return;
    }
    c.extensionSettings[this.EXTENSION_NAME] || (c.extensionSettings[this.EXTENSION_NAME] = { ...fl }), c.extensionSettings[this.EXTENSION_NAME][s] = o, ae.debug("SettingsManager", `Set ${String(s)} = ${JSON.stringify(o)}`), this.save();
  }
  /**
   * 保存设置到服务器
   */
  static save() {
    const s = this.getContext();
    s != null && s.saveSettingsDebounced ? (s.saveSettingsDebounced(), ae.debug("SettingsManager", "Saved via context.saveSettingsDebounced")) : ae.warn("SettingsManager", "saveSettingsDebounced not available");
  }
  /**
   * Load settings from SillyTavern global state
   * 兼容旧代码的接口
   */
  static loadSettings() {
    return this.getExtensionSettings();
  }
  /**
   * 获取指定分类下已启用的提示词模板
   * @param category 模板分类
   * @returns 启用的模板，如果没有则返回 null
   */
  static getEnabledPromptTemplate(s) {
    return (this.get("promptTemplates") || []).find((c) => c.category === s && c.enabled) || null;
  }
  /**
   * 获取总结器设置
   * @returns summarizerConfig 对象
   */
  static getSummarizerSettings() {
    return this.get("summarizerConfig") || {};
  }
  /**
   * 设置总结器设置（合并更新）
   * @param config 要合并的配置对象
   */
  static setSummarizerSettings(s) {
    const o = this.getSummarizerSettings();
    this.set("summarizerConfig", { ...o, ...s });
  }
  /**
   * 获取正则规则列表
   * @returns RegexRule[] 正则规则数组
   */
  static getRegexRules() {
    return this.get("regexRules") || [];
  }
  /**
   * 设置正则规则列表
   * @param rules 规则数组
   */
  static setRegexRules(s) {
    this.set("regexRules", s);
  }
}
qe(Le, "EXTENSION_NAME", "engram");
const im = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: Le
}, Symbol.toStringTag, { value: "Module" }));
class Xn {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let o = Le.loadSettings().theme;
    o || (o = localStorage.getItem(this.STORAGE_KEY), o && Le.set("theme", o));
    const c = qs[o] ? o : "claudeDark";
    this.setTheme(c), ae.info("ThemeManager", `主题系统初始化完成: ${c}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    qs[s] || (ae.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, Le.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
  }
  /**
   * 获取当前主题
   */
  static getTheme() {
    return this.currentTheme;
  }
  /**
   * 注入样式表 (dist/style.css)
   */
  static injectStyles() {
    const s = "engram-styles";
    if (document.getElementById(s)) return;
    const o = document.createElement("link");
    o.id = s, o.rel = "stylesheet", o.type = "text/css", o.href = `scripts/extensions/Engram_project/dist/style.css?v=${Date.now()}`, document.head.appendChild(o);
  }
  /**
   * 应用 CSS 变量到根元素
   */
  static applyThemeVariables(s) {
    const o = qs[s];
    if (!o) return;
    const c = document.documentElement, f = (x, p) => {
      c.style.setProperty(x, p);
    };
    Object.entries(o.colors).forEach(([x, p]) => {
      let g = `--${x.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      g = g.replace(/(\d+)/, "-$1"), f(g, p);
    }), Object.entries(o.variables).forEach(([x, p]) => {
      f(`--${x}`, p);
    }), s !== "paperLight" ? c.classList.add("dark") : c.classList.remove("dark");
  }
}
qe(Xn, "STORAGE_KEY", "engram-theme"), qe(Xn, "currentTheme", "claudeDark");
const C3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Xn
}, Symbol.toStringTag, { value: "Module" })), om = A.createContext(void 0);
function cm({ children: u }) {
  const [s, o] = A.useState(Xn.getTheme()), c = s !== "paperLight", f = (m) => {
    Xn.setTheme(m), o(m);
  };
  return A.useEffect(() => {
    const m = Xn.getTheme();
    m !== s && o(m);
  }, []), /* @__PURE__ */ r.jsx(om.Provider, { value: { theme: s, setTheme: f, isDarkMode: c }, children: u });
}
function N3() {
  const u = A.useContext(om);
  if (u === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return u;
}
const E3 = ({ onNavigate: u }) => {
  const { setTheme: s } = N3(), [o, c] = A.useState(""), [f, m] = A.useState(!1), [x, p] = A.useState(0), [g, b] = A.useState(zc), S = A.useRef(null), v = [
    {
      id: "theme-paper-light",
      icon: Rg,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: y1,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: y1,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: v1,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: v1,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  A.useEffect(() => {
    const _ = Vg(o), G = o.toLowerCase().trim(), K = v.filter(
      ($) => {
        var W;
        return !G || $.label.toLowerCase().includes(G) || ((W = $.description) == null ? void 0 : W.toLowerCase().includes(G)) || $.keywords.some((P) => P.toLowerCase().includes(G));
      }
    );
    b([..._, ...K]), p(0);
  }, [o]), A.useEffect(() => {
    const _ = (G) => {
      (G.metaKey || G.ctrlKey) && G.key === "k" && (G.preventDefault(), m(!0));
    };
    return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
  }, []), A.useEffect(() => {
    f && setTimeout(() => {
      var _;
      return (_ = S.current) == null ? void 0 : _.focus();
    }, 50);
  }, [f]);
  const R = (_) => {
    const G = g.length + (o ? 1 : 0);
    switch (_.key) {
      case "ArrowDown":
        _.preventDefault(), p((K) => (K + 1) % G);
        break;
      case "ArrowUp":
        _.preventDefault(), p((K) => (K - 1 + G) % G);
        break;
      case "Enter":
        _.preventDefault(), q();
        break;
      case "Escape":
        m(!1);
        break;
    }
  }, q = () => {
    g.length > 0 && x < g.length ? g[x].action(u) : o && (console.log("Searching memory for:", o), u("/memory")), m(!1), c("");
  };
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      "button",
      {
        onClick: () => m(!0),
        className: "p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground",
        title: "搜索 (Cmd+K)",
        children: /* @__PURE__ */ r.jsx(oa, { size: 20 })
      }
    ),
    f && /* @__PURE__ */ r.jsx(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 animate-in fade-in duration-200",
        style: {
          height: "100dvh",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.5)",
          // Explicit semi-transparent black
          backdropFilter: "blur(4px)"
        },
        onClick: (_) => {
          _.target === _.currentTarget && m(!1);
        },
        children: /* @__PURE__ */ r.jsxs(
          "div",
          {
            className: "w-full max-w-xl border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-top-4 duration-200",
            style: {
              backgroundColor: "var(--popover)",
              // Force theme background color
              color: "var(--popover-foreground)"
            },
            children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border/50", children: [
                /* @__PURE__ */ r.jsx(oa, { size: 20, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    ref: S,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: o,
                    onChange: (_) => c(_.target.value),
                    onKeyDown: R
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                g.length > 0 && /* @__PURE__ */ r.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  g.map((_, G) => /* @__PURE__ */ r.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${G === x ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        _.action(u), m(!1), c("");
                      },
                      onMouseEnter: () => p(G),
                      children: [
                        /* @__PURE__ */ r.jsx(_.icon, { size: 18, className: `shrink-0 ${G === x ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ r.jsx("div", { className: "text-sm font-medium", children: _.label }),
                          _.description && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: _.description })
                        ] }),
                        G === x && /* @__PURE__ */ r.jsx(b1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    },
                    _.id
                  ))
                ] }),
                o && /* @__PURE__ */ r.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "全站搜索" }),
                  /* @__PURE__ */ r.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${x === g.length ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => q(),
                      onMouseEnter: () => p(g.length),
                      children: [
                        /* @__PURE__ */ r.jsx(oa, { size: 18, className: `shrink-0 ${x === g.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ r.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ r.jsx("span", { className: "text-primary", children: o }),
                            '"'
                          ] }),
                          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        x === g.length && /* @__PURE__ */ r.jsx(b1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    }
                  )
                ] }),
                g.length === 0 && !o && /* @__PURE__ */ r.jsxs("div", { className: "px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ r.jsx(oa, { size: 32, className: "opacity-20 mb-2" }),
                  /* @__PURE__ */ r.jsx("p", { children: "输入关键词开始搜索..." })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}, Lc = ({ className: u = "", size: s = 24 }) => /* @__PURE__ */ r.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 592",
    width: s,
    height: s,
    className: u,
    "aria-label": "Engram Icon",
    children: /* @__PURE__ */ r.jsx(
      "path",
      {
        fill: "currentColor",
        d: `M103.875908,522.166260 
                C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 
                C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 
                C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 
                C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 
                C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 
                C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 
                C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 
                C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 
                C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 
                C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 
                C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 
                C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 
                C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 
                C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 
                C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 
                C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 
                C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 
                C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 
                C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 
                C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 
                C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 
                C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 
                C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 
                C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 
                C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 
                C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 
                C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 
                C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 
                C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 
                C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 
                C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 
                C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 
                C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 
                C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 
                C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 
                C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 
                C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 
                C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 
                C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 
                C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 
                C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 
                C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 
                C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 
                C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 
                C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 
                M141.430466,266.110352 
                C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 
                C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 
                C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 
                C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 
                C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 
                C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 
                C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 
                C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 
                C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 
                C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 
                C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 
                M116.349434,377.499908 
                C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 
                C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 
                C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 
                C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 
                C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 
                C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 
                C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 
                C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 
                C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 
                C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 
                C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z`
      }
    )
  }
), T3 = ({
  onToggleSidebar: u,
  isMobile: s,
  // Deprecated prop, handled by CSS
  onClose: o,
  onNavigate: c
}) => /* @__PURE__ */ r.jsxs("header", { className: "h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar/95 backdrop-blur z-50 transition-all duration-300 w-full flex-shrink-0", children: [
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 w-16 md:w-64", children: [
    /* @__PURE__ */ r.jsx(
      "button",
      {
        className: "p-2 -ml-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden",
        onClick: u,
        title: "菜单",
        children: /* @__PURE__ */ r.jsx(og, { size: 20 })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ r.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ r.jsx(Lc, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ r.jsx(Lc, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ r.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ r.jsx("div", { className: "flex-1" }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
    /* @__PURE__ */ r.jsx(E3, { onNavigate: c }),
    /* @__PURE__ */ r.jsx("div", { className: "h-4 w-[1px] bg-border mx-1" }),
    /* @__PURE__ */ r.jsx(
      "button",
      {
        className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
        onClick: o,
        title: "关闭扩展",
        children: /* @__PURE__ */ r.jsx(Fs, { size: 20 })
      }
    )
  ] })
] }), w3 = ({ className: u = "", height: s = 24 }) => {
  const o = Math.round(s * 3.17);
  return /* @__PURE__ */ r.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "235 175 555 175",
      width: o,
      height: s,
      className: u,
      "aria-label": "Engram",
      children: [
        /* @__PURE__ */ r.jsx("path", { fill: "currentColor", d: "M752.3,294.5c-0.2-11.8-0.3-23.1-0.4-34.4c0-2.7,0-5.3-0.2-8c-0.6-6.4-4.1-10.1-9.8-10.9 c-6.9-0.9-12.2,2-14.5,7.9c-1,2.5-1.2,5.2-1.2,7.9c0,11,-0.3,22,0,33c0.1,5.2-1.7,6.9-6.7,6.4c-3.3-0.3-6.7-0.3-10,0 c-4.9,0.5-5.9-1.9-5.8-6.2c0.2-11.8,0.2-23.7,0-35.5c-0.2-9.4-5.4-14.3-14.1-13.5c-6.4,0.6-11.1,5.7-11.3,13 c-0.3,11.7-0.2,23.3-0.3,35c0,7.1,0,7.1-7.3,7.1c-3.3,0-6.7-0.1-10,0c-3.3,0.1-4.9-1.1-4.9-4.6c0.1-21.5,0-43-0.1-64.5 c0-2.9,1.3-4.3,4.2-4.3c3.2,0,6.3-0.1,9.5,0.1c4,0,8.8-1,7.5,6.6c8.6-6.1,16.9-8.7,26.3-7c5.2,1,10.1,2.7,13.7,6.6 c2.8,2.9,4.6,2.4,7.4,0c6.8-5.8,15-7.9,23.8-6.9c16.3,1.8,25.1,11.7,25.8,29.5c0.5,13.3,0.1,26.6,0.2,40 c0,3.4-1.2,5.1-4.7,4.7C763.8,295.7,757.9,298,752.3,294.5z" }),
        /* @__PURE__ */ r.jsx("path", { fill: "currentColor", d: "M463.1,324.1c-10.8-0.7-20.9-2.4-30.2-7.5c-3.6-2-5-4-2.4-7.8c2.3-3.4,4.1-7.1,6.5-11.3 c6.1,3.6,11.8,6.8,18.5,7.7c5.3,0.7,10.6,1.1,15.8-0.5c8.3-2.6,12.2-9.1,10.9-18.6c-9.1,7.5-19.3,8.6-30.2,6.4 c-7.8-1.6-14.2-5.6-19.2-11.8c-10.5-12.8-10.6-32.5-0.5-45.5c11.2-14.3,28.6-16.4,50.9-6.1c-0.4-6.2,3.5-6.3,8.1-6.2 c13,0.2,13,0.1,13,13c0,16.3-0.5,32.7,0.1,49C505.4,309.3,491.3,322.1,467.6,324C466.2,324.1,464.9,324.1,463.1,324.1z M482.1,252.6 c-0.6-2.1-1.6-4-3-5.7c-4.6-6-13.5-8.4-21.2-5.5c-7.4,2.7-11.1,8.9-10.6,17.8c0.4,7.4,5.7,13.5,13.6,15.2 C474.1,277.2,485.2,266.4,482.1,252.6z" }),
        /* @__PURE__ */ r.jsx("path", { fill: "currentColor", d: "M258.1,201.6c20.3,0,40.1,0.1,60-0.1c4.5,0,6.3,1.3,6.1,5.9c-0.4,14.6,2.1,12.6-12.7,12.7 c-10.7,0.1-21.3,0.1-32-0.1c-3.8-0.1-5.2,1-5.3,5.1c0,13.4-0.2,13.4,13.4,13.4c8.7,0,17.3,0.1,26,0c3.4-0.1,4.7,1.2,4.7,4.7 c-0.2,16.4,1.9,13.7-13.1,13.9c-8.8,0.1-17.7,0.1-26.5,0c-3.2,0-4.6,1.1-4.4,4.4c0.2,3.8,0.2,7.7,0,11.5 c-0.2,3.5,1.1,4.7,4.6,4.7c13.7-0.1,27.3,0.2,41-0.1c5.1-0.1,6.6,1.5,6.5,6.5c-0.2,12.3,0,12.3-12.1,12.3 c-18.7-0.1-37.3-0.2-56,0c-4.9,0.1-6.7-1.2-6.7-6.4c0.2-27.5,0.2-55,0-82.5C251.6,203,253,200.9,258.1,201.6z" }),
        /* @__PURE__ */ r.jsx("path", { fill: "currentColor", d: "M599.5,239.6c-5.6,0.9-10.6,2.1-15,4.9c-2.5,1.6-4,0.9-5.1-1.6c-0.9-2-1.9-3.9-2.9-5.8 c-3.1-6.1-3-6.4,3-9.3c11.6-5.6,23.9-7.1,36.5-4.6c15.1,2.9,23.6,12.8,24.1,28.7c0.4,13.3,0.1,26.6,0.2,40 c0,3.5-1.5,4.8-4.8,4.6c-3,0-6,0-9,0.1c-4.2,0.2-8.1,0.2-6.6-6.6c-12.4,9.5-24.9,10.4-37.7,3.9c-8.5-4.3-11.9-12-11.3-21.2 c0.6-9.1,5.9-15,14.4-17.9c5.7-1.9,11.6-2.8,17.7-2.8c4.6,0,9.3,0.5,13.8-0.4c1.9-7.2-7.4-13.5-17.2-11.9 M617.7,271.9 c-0.1-2.5,1-5.8-3.3-5.8c-5,0-10-0.1-15,0.2c-4,0.3-6.9,2.4-7.1,6.9c-0.2,4.5,2.2,7.2,6.3,8.4C606.5,283.8,613.8,280.3,617.7,271.9z" }),
        /* @__PURE__ */ r.jsx("path", { fill: "currentColor", d: "M346.2,222.9c2.6,0,4.8,0.1,7,0c4.7-0.4,8.1,0.7,7,7.3c6-4,11.6-7.1,18.2-7.9c18.2-2.1,34.8,7.7,35,29.4 c0.1,13.2-0.1,26.3,0.1,39.5c0,3.9-1.2,5.5-5.2,5.2c-4,0-8,0-12,0.2c-3.5,0.2-4.7-1.3-4.7-4.7c0.1-10.3,0.1-20.7,0-31 c0-2.3-0.1-4.7-0.5-7c-1.3-8.4-5.4-12.3-12.9-12.6c-8.4-0.3-14.3,3.9-16,11.9c-2,9.6-0.7,19.3-0.9,28.9 c-0.2,14.4,0,14.4-14.4,14.4c-7.8,0-7.9,0-7.9-8c0-19.5,0-39,0-58.5C339,223.3,339.2,223.2,346.2,222.9z" }),
        /* @__PURE__ */ r.jsx("path", { fill: "currentColor", d: "M543.2,258.4c-0.1,11.1-0.3,21.8-0.2,32.4c0,4-1.2,5.9-5.4,5.6c-4.3-0.3-8.7-0.1-13-0.1 c-2.7,0-3.9-1.3-3.9-4c0-21.8,0-43.6,0-65.5c0-2.8,1.3-3.9,3.9-4c2.8,0,5.7,0,8.5-0.1c4.8-0.2,9.6-0.5,8.7,6.4 c2.1,0.8,2.8-0.7,3.9-1.3c2.3-1.2,4.5-2.8,7-3.8c11.8-4.7,14.3-3,14.3,9.3c0,0.8-0.1,1.7,0,2.5c0.6,4.6-1,6.4-6,6.5 C550,242.6,544.8,247.5,543.2,258.4z" })
      ]
    }
  );
}, Us = {
  timeOut: 5e3,
  extendedTimeOut: 1e3,
  closeButton: !0,
  progressBar: !0
}, gl = class gl {
  constructor() {
  }
  static getInstance() {
    return gl.instance || (gl.instance = new gl()), gl.instance;
  }
  /**
   * 获取全局 toastr 对象
   */
  getToastr() {
    return window.toastr || null;
  }
  /**
   * 发送成功通知
   */
  success(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.success(s, o, { ...Us, ...c }) : console.log(`[Engram] SUCCESS: ${o} - ${s}`), ae.info("Notification", `Success: ${s}`);
  }
  /**
   * 发送信息通知
   */
  info(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.info(s, o, { ...Us, ...c }) : console.log(`[Engram] INFO: ${o} - ${s}`), ae.info("Notification", `Info: ${s}`);
  }
  /**
   * 发送警告通知
   */
  warning(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.warning(s, o, { ...Us, ...c }) : console.warn(`[Engram] WARNING: ${o} - ${s}`), ae.warn("Notification", `Warning: ${s}`);
  }
  /**
   * 发送错误通知
   */
  error(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.error(s, o, { ...Us, timeOut: 8e3, ...c }) : console.error(`[Engram] ERROR: ${o} - ${s}`), ae.error("Notification", `Error: ${s}`);
  }
  /**
   * 清除所有通知
   */
  clear() {
    const s = this.getToastr();
    s && s.clear();
  }
};
qe(gl, "instance");
let Bc = gl;
const st = Bc.getInstance(), _3 = "0.2.0", k3 = {
  version: _3
}, la = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
  // 实际分支名是 master
}, Ls = k3.version;
let ir = null, or = null;
function wc(u, s) {
  const o = u.split(".").map(Number), c = s.split(".").map(Number);
  for (let f = 0; f < Math.max(o.length, c.length); f++) {
    const m = o[f] || 0, x = c[f] || 0;
    if (m > x) return 1;
    if (m < x) return -1;
  }
  return 0;
}
class ml {
  /**
   * 获取当前版本
   */
  static getCurrentVersion() {
    return Ls;
  }
  /**
   * 从 GitHub 获取最新版本号
   */
  static async getLatestVersion() {
    if (ir)
      return ir;
    try {
      const s = `https://raw.githubusercontent.com/${la.owner}/${la.repo}/${la.branch}/manifest.json`, o = await fetch(s);
      return o.ok ? (ir = (await o.json()).version || null, ir) : null;
    } catch {
      return null;
    }
  }
  /**
   * 检查是否有更新
   */
  static async hasUpdate() {
    const s = await this.getLatestVersion();
    return s ? wc(s, Ls) > 0 : !1;
  }
  /**
   * 获取更新日志
   */
  static async getChangelog() {
    if (or)
      return or;
    try {
      const s = `https://raw.githubusercontent.com/${la.owner}/${la.repo}/${la.branch}/CHANGELOG.md`, o = await fetch(s);
      return o.ok ? (or = await o.text(), or) : (console.warn("[Engram] UpdateService: 获取更新日志失败", o.status), st.warning(`获取更新日志失败: ${o.status}`, "更新检测"), null);
    } catch (s) {
      return console.error("[Engram] UpdateService: 获取更新日志异常", s), st.error("获取更新日志异常", "更新检测"), null;
    }
  }
  /**
   * 获取已读版本（上次用户确认查看的版本）
   */
  static getReadVersion() {
    try {
      return Le.get("lastReadVersion") || "0.0.0";
    } catch {
      return "0.0.0";
    }
  }
  /**
   * 标记版本已读
   */
  static async markAsRead(s) {
    const o = s || await this.getLatestVersion() || Ls;
    try {
      Le.set("lastReadVersion", o), console.debug("[Engram] UpdateService: 已标记版本已读", o);
    } catch (c) {
      console.error("[Engram] UpdateService: 标记已读失败", c);
    }
  }
  /**
   * 检查是否有未读更新
   */
  static async hasUnreadUpdate() {
    const s = await this.getLatestVersion();
    if (!s || wc(s, Ls) <= 0)
      return !1;
    const o = this.getReadVersion();
    return wc(s, o) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    ir = null, or = null;
  }
}
const z3 = ({ isOpen: u, onClose: s }) => {
  const [o, c] = A.useState(!0), [f, m] = A.useState(null), [x, p] = A.useState(null), [g, b] = A.useState(!1), [S, v] = A.useState(!1), R = ml.getCurrentVersion();
  A.useEffect(() => {
    u && q();
  }, [u]);
  const q = async () => {
    c(!0);
    try {
      const [K, $, W] = await Promise.all([
        ml.getLatestVersion(),
        ml.getChangelog(),
        ml.hasUpdate()
      ]);
      m(K), p($), b(W);
    } catch (K) {
      console.error("[Engram] 加载更新信息失败", K);
    } finally {
      c(!1);
    }
  }, _ = async () => {
    v(!0);
    try {
      const K = f || R;
      console.debug("[Engram] Marking update as read:", K), await ml.markAsRead(K), s();
    } finally {
      v(!1);
    }
  }, G = () => {
    ml.clearCache(), q();
  };
  return u ? /* @__PURE__ */ r.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: s
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/50", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ r.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ r.jsx($s, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("h2", { className: "text-base font-semibold text-foreground", children: "更新通知" }),
            /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "当前版本: v",
              R
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: G,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              title: "刷新",
              children: /* @__PURE__ */ r.jsx(Zt, { size: 16, className: o ? "animate-spin" : "" })
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: s,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ r.jsx(Fs, { size: 16 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto p-5", children: o ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ r.jsx(Zt, { size: 24, className: "animate-spin mb-3" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "正在检查更新..." })
      ] }) : /* @__PURE__ */ r.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ r.jsx("div", { className: `
                                p-4 rounded-lg border
                                ${g ? "bg-primary/5 border-primary/20" : "bg-green-500/5 border-green-500/20"}
                            `, children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
          g ? /* @__PURE__ */ r.jsx($s, { size: 20, className: "text-primary" }) : /* @__PURE__ */ r.jsx(Xc, { size: 20, className: "text-green-500" }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("p", { className: "font-medium text-foreground", children: g ? `发现新版本: v${f}` : "已是最新版本" }),
            /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: g ? "请手动更新扩展以获取新功能" : "无需更新" })
          ] })
        ] }) }),
        x && /* @__PURE__ */ r.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "更新日志" }),
          /* @__PURE__ */ r.jsx("div", { className: "bg-muted/20 rounded-lg p-4 max-h-64 overflow-y-auto", children: /* @__PURE__ */ r.jsxs("pre", { className: "text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed", children: [
            x.substring(0, 2e3),
            x.length > 2e3 && `

... (更多内容请查看完整日志)`
          ] }) })
        ] }),
        !x && !o && /* @__PURE__ */ r.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "无法获取更新日志" }) })
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "px-5 py-4 border-t border-border/50 flex justify-end gap-3", children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: s,
            className: "px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "关闭"
          }
        ),
        g && /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: _,
            disabled: S,
            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            children: S ? "处理中..." : "我知道了"
          }
        )
      ] })
    ] })
  ] }) : null;
}, w1 = [
  { id: "dashboard", label: "仪表盘", icon: tg },
  { id: "memory", label: "记忆流", icon: C4 },
  { id: "graph", label: "神经图谱", icon: I1 },
  { id: "processing", label: "数据处理", icon: f4 },
  { id: "presets", label: "API 预设", icon: mr },
  { id: "devlog", label: "开发日志", icon: da },
  { id: "settings", label: "系统设置", icon: Ic }
], A3 = ({ children: u, activeTab: s, setActiveTab: o, onClose: c }) => {
  const [f, m] = A.useState(!1), [x, p] = A.useState(!1), [g, b] = A.useState(!1);
  return A.useEffect(() => {
    (async () => {
      try {
        const v = await ml.hasUnreadUpdate();
        b(v);
      } catch (v) {
        console.debug("[Engram] 检查更新失败", v);
      }
    })();
  }, []), /* @__PURE__ */ r.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ r.jsx($g, {}),
    /* @__PURE__ */ r.jsx(
      z3,
      {
        isOpen: x,
        onClose: () => {
          p(!1), b(!1);
        }
      }
    ),
    /* @__PURE__ */ r.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50", children: [
      /* @__PURE__ */ r.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: w1.map((S) => {
        const v = S.icon, R = s === S.id;
        return /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: () => o(S.id),
            className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${R ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
            children: [
              /* @__PURE__ */ r.jsx(v, { size: 18, strokeWidth: R ? 2 : 1.5, className: "flex-shrink-0" }),
              /* @__PURE__ */ r.jsx("span", { className: `text-xs ${R ? "font-medium" : "font-normal"}`, children: S.label })
            ]
          },
          S.id
        );
      }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "pb-3 pt-2 border-t border-border/30 mt-2 space-y-2", children: [
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: () => p(!0),
            className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left",
            children: [
              /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ r.jsx(h4, { size: 16, strokeWidth: 1.5 }),
                g && /* @__PURE__ */ r.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ r.jsx("span", { className: "text-xs", children: "更新通知" }),
              g && /* @__PURE__ */ r.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("div", { className: "opacity-40 text-muted-foreground px-2", children: /* @__PURE__ */ r.jsx(w3, { height: 12 }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ r.jsx(
        T3,
        {
          onToggleSidebar: () => m(!f),
          isMobile: !1,
          onClose: c,
          onNavigate: (S) => o(S.replace("/", ""))
        }
      ),
      f && /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "fixed inset-0 z-50 flex justify-start",
          style: { height: "100dvh", width: "100vw" },
          children: [
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",
                onClick: () => m(!1)
              }
            ),
            /* @__PURE__ */ r.jsxs(
              "div",
              {
                id: "mobile-menu-drawer",
                className: "relative w-64 max-w-[80vw] h-full bg-sidebar border-r border-border shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300",
                style: { height: "100dvh" },
                children: [
                  /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "text-lg font-semibold text-sidebar-foreground/80", children: "导航" }),
                    /* @__PURE__ */ r.jsx(
                      "button",
                      {
                        onClick: () => m(!1),
                        className: "p-2 -mr-2 rounded-md hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors",
                        children: /* @__PURE__ */ r.jsx(Fs, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsx("nav", { className: "space-y-4 flex-1 overflow-y-auto", children: w1.map((S) => {
                    const v = s === S.id;
                    return /* @__PURE__ */ r.jsxs(
                      "button",
                      {
                        onClick: () => {
                          o(S.id), m(!1);
                        },
                        className: `
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${v ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                            `,
                        children: [
                          /* @__PURE__ */ r.jsx(S.icon, { size: 22, className: v ? "text-primary" : "text-muted-foreground/70" }),
                          /* @__PURE__ */ r.jsx("span", { children: S.label })
                        ]
                      },
                      S.id
                    );
                  }) }),
                  /* @__PURE__ */ r.jsx("div", { className: "mt-auto pt-6 border-t border-border/20", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 px-2 text-xs text-muted-foreground/50", children: [
                    /* @__PURE__ */ r.jsx(Lc, { size: 14 }),
                    /* @__PURE__ */ r.jsx("span", { children: "Engram v0.1.0" })
                  ] }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ r.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background", children: /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth", children: /* @__PURE__ */ r.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: u }) }) })
    ] }),
    "  "
  ] });
}, _c = ({
  title: u,
  value: s,
  icon: o,
  subtext: c,
  highlight: f = !1
}) => /* @__PURE__ */ r.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${f ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ r.jsx("div", { className: `p-2 rounded-lg ${f ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ r.jsx(o, { size: 20 }) }),
    f && /* @__PURE__ */ r.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: s }),
    /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: u }),
    c && /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: c })
  ] })
] });
function ua() {
  var u, s;
  try {
    return ((s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) || null;
  } catch (o) {
    return console.warn("[Engram] Failed to get ST context:", o), null;
  }
}
function M3() {
  const u = ua();
  return (u == null ? void 0 : u.chat) || [];
}
function O3() {
  return M3();
}
function R3() {
  return ua() !== null;
}
async function _1() {
  const { Logger: u } = await Promise.resolve().then(() => nu);
  await u.init(), u.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: s } = await Promise.resolve().then(() => im);
  s.initSettings(), u.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: c } = await Promise.resolve().then(() => Vp), f = await c();
    u.info("TavernAPI", "酒馆接口对接状态", f);
  } catch (c) {
    u.warn("TavernAPI", "酒馆接口检查失败", { error: String(c) });
  }
  try {
    const { summarizerService: c } = await Promise.resolve().then(() => wt);
    c.start();
    const f = c.getStatus();
    u.info("Summarizer", "服务已启动", f);
  } catch (c) {
    u.warn("Summarizer", "服务启动失败", { error: String(c) });
  }
  D3();
  const { ThemeManager: o } = await Promise.resolve().then(() => C3);
  o.init(), H3();
  try {
    const { CharacterDeleteService: c } = await Promise.resolve().then(() => u5);
    c.init(), u.info("STBridge", "CharacterDeleteService initialized");
  } catch (c) {
    u.warn("STBridge", "Failed to initialize CharacterDeleteService", { error: String(c) });
  }
  u.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const um = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function D3() {
  const u = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!u) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), U3();
    return;
  }
  const o = document.createElement("div");
  o.id = "engram-drawer", o.className = "drawer";
  const c = document.createElement("div");
  c.className = "drawer-toggle drawer-header";
  const f = document.createElement("div");
  f.id = "engram-drawer-icon", f.className = "drawer-icon fa-fw closedIcon", f.title = "Engram - 记忆操作系统", f.setAttribute("data-i18n", "[title]Engram - Memory OS"), f.innerHTML = um, f.addEventListener("click", Qs), c.appendChild(f), o.appendChild(c), s ? (u.insertBefore(o, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (u.appendChild(o), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function U3() {
  const u = document.createElement("div");
  u.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", u.title = "Engram - 记忆操作系统", u.innerHTML = um, u.addEventListener("click", Qs), document.body.appendChild(u);
}
let Xs = null;
function L3(u) {
  Xs = u, Xs = u;
}
let Hc = null, k1 = null;
function B3(u) {
  Hc = u;
}
function H3() {
  if (!Hc) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const u = "engram-global-overlay";
  let s = document.getElementById(u);
  s || (s = document.createElement("div"), s.id = u, s.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(s)), k1 || (k1 = Hc(s, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let kc = !1, cr = null, Ys = null;
function Qs() {
  kc && cr ? (Ys && (Ys.unmount(), Ys = null), cr.remove(), cr = null, kc = !1) : (cr = q3(), document.body.appendChild(cr), kc = !0);
}
function q3() {
  var s;
  const u = document.createElement("div");
  return u.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", u.style.backgroundColor = "var(--background)", u.style.color = "var(--foreground)", u.style.height = "100dvh", u.style.width = "100vw", u.style.top = "0", u.style.left = "0", u.id = "engram-panel-root", Xs ? Ys = Xs(u, Qs) : (u.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = u.querySelector("button")) == null || s.addEventListener("click", Qs)), u;
}
async function G3(u, s) {
  try {
    const c = await new Function("path", "return import(path)")("/scripts/chats.js");
    c && typeof c.hideChatMessageRange == "function" ? (await c.hideChatMessageRange(u, s, !1), console.log(`[Engram] Hidden messages range: ${u}-${s}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (o) {
    console.error("[Engram] Failed to hide messages:", o);
  }
}
async function Y3(u, s = "text", o = "") {
  return window.callPopup ? window.callPopup(u, s, o) : (console.warn("[Engram] callPopup not available"), Promise.resolve(s === "confirm" ? !0 : null));
}
const $3 = (u) => {
  switch (u) {
    case 0:
      return "text-muted-foreground";
    case 1:
      return "text-primary";
    case 2:
      return "text-green-400";
    case 3:
      return "text-yellow-400";
    case 4:
      return "text-red-400";
    default:
      return "text-primary";
  }
}, z1 = ({ onNavigate: u }) => {
  const [s, o] = A.useState([]), [c, f] = A.useState(ua()), [m, x] = A.useState(0);
  A.useEffect(() => (o(ae.getLogs().slice(0, 3)), ae.subscribe((v) => {
    o((R) => [v, ...R].slice(0, 3));
  })), []), A.useEffect(() => {
    const S = setInterval(() => {
      x((v) => v + 1);
    }, 1e3);
    return () => clearInterval(S);
  }, []);
  const p = (S) => {
    const v = Math.floor(S / 3600), R = Math.floor(S % 3600 / 60), q = S % 60;
    return `${v.toString().padStart(2, "0")}:${R.toString().padStart(2, "0")}:${q.toString().padStart(2, "0")}`;
  }, g = (c == null ? void 0 : c.name2) || "Unknown", b = (S) => {
    u && u(S);
  };
  return /* @__PURE__ */ r.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ r.jsx(
        _c,
        {
          title: "ACTIVE MODEL",
          value: c ? "Connected" : "Offline",
          subtext: c ? `Chatting with ${g}` : "Waiting for connection...",
          icon: em,
          highlight: !!c
        }
      ),
      /* @__PURE__ */ r.jsx(
        _c,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: mr
        }
      ),
      /* @__PURE__ */ r.jsx(
        _c,
        {
          title: "SYSTEM UPTIME",
          value: p(m),
          subtext: "Session Duration",
          icon: Qc
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ r.jsx(Pc, { size: 16 }),
        /* @__PURE__ */ r.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => b("memory"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => b("graph"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => b("processing"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => b("settings"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ r.jsx(da, { size: 16 }),
        /* @__PURE__ */ r.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ r.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => b("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map((S) => /* @__PURE__ */ r.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${$3(S.level)}`, children: [
        /* @__PURE__ */ r.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(S.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ r.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: S.message })
      ] }, S.id)) })
    ] })
  ] }) });
}, Ps = ({ title: u, subtitle: s, actions: o }) => /* @__PURE__ */ r.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: u }),
    s && /* @__PURE__ */ r.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: s })
  ] }),
  o && /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: o })
] }), A1 = ({
  icon: u,
  label: s,
  primary: o = !1,
  size: c = "md",
  className: f = "",
  ...m
}) => /* @__PURE__ */ r.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${c === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${o ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${f}
        `,
    ...m,
    children: [
      u && /* @__PURE__ */ r.jsx(u, { size: c === "sm" ? 14 : 16 }),
      s
    ]
  }
), V3 = () => {
  const [u] = A.useState([
    { id: "1", x: 250, y: 150, label: "User Input", type: "input" },
    { id: "2", x: 250, y: 300, label: "Memory Retriever", type: "process" },
    { id: "3", x: 100, y: 450, label: "Summary Agent", type: "output" },
    { id: "4", x: 400, y: 450, label: "Context Builder", type: "output" }
  ]), s = [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "2", target: "4" }
  ];
  return /* @__PURE__ */ r.jsxs("div", { className: "h-full flex flex-col relative bg-card rounded-xl overflow-hidden border border-border shadow-inner group", children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.15] pointer-events-none",
        style: {
          backgroundImage: "radial-gradient(#555 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(Wc, { size: 16 }) }),
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(sg, { size: 16 }) }),
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(Ic, { size: 16 }) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ r.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ r.jsx("defs", { children: /* @__PURE__ */ r.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ r.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((o, c) => {
        const f = u.find((v) => v.id === o.source), m = u.find((v) => v.id === o.target);
        if (!f || !m) return null;
        const x = f.x + 150 / 2, p = f.y + 60, g = m.x + 150 / 2, b = m.y, S = `M ${x} ${p} C ${x} ${p + 50}, ${g} ${b - 50}, ${g} ${b}`;
        return /* @__PURE__ */ r.jsx("g", { children: /* @__PURE__ */ r.jsx("path", { d: S, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, c);
      })
    ] }),
    u.map((o) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "absolute w-[150px] group/node cursor-grab active:cursor-grabbing",
        style: { left: o.x, top: o.y },
        children: [
          o.type !== "input" && /* @__PURE__ */ r.jsx("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          o.type !== "output" && /* @__PURE__ */ r.jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          /* @__PURE__ */ r.jsxs("div", { className: `
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${o.type === "input" ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-border group-hover/node:border-border shadow-lg"}
                    `, children: [
            /* @__PURE__ */ r.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold", children: o.type }),
            /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-foreground font-medium flex items-center gap-2", children: [
              o.type === "input" && /* @__PURE__ */ r.jsx(da, { size: 12, className: "text-blue-400" }),
              o.type === "process" && /* @__PURE__ */ r.jsx(Qc, { size: 12, className: "text-purple-400" }),
              o.type === "output" && /* @__PURE__ */ r.jsx(mr, { size: 12, className: "text-emerald-400" }),
              o.label
            ] })
          ] })
        ]
      },
      o.id
    ))
  ] });
}, X3 = () => /* @__PURE__ */ r.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ r.jsx(
    Ps,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ r.jsx(A1, { icon: Jc, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ r.jsx(A1, { icon: Ic, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ r.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ r.jsx(V3, {}) })
] });
function Q3(u) {
  return new Date(u).toTimeString().slice(0, 8);
}
const Z3 = {
  [Ue.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Ue.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Ue.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Ue.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Ue.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, K3 = ({ entry: u }) => {
  const [s, o] = A.useState(!1), c = u.data !== void 0, f = Vs[u.level], m = Z3[u.level];
  return /* @__PURE__ */ r.jsxs("div", { className: "group", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: `
                    flex items-start gap-3 px-2 py-1 rounded-sm transition-colors
                    hover:bg-white/[0.02]
                    ${c ? "cursor-pointer" : ""}
                `,
        onClick: () => c && o(!s),
        children: [
          /* @__PURE__ */ r.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: c ? s ? /* @__PURE__ */ r.jsx(ca, { size: 12 }) : /* @__PURE__ */ r.jsx(Vc, { size: 12 }) : null }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: Q3(u.timestamp) }),
          /* @__PURE__ */ r.jsx("span", { className: `
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${m.text} ${m.bg}
                `, children: f.label }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-500 shrink-0 text-[11px]", children: u.module }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-300 text-[11px] break-words flex-1 leading-relaxed", children: u.message })
        ]
      }
    ),
    s && c && /* @__PURE__ */ r.jsx("div", { className: "ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]", children: /* @__PURE__ */ r.jsx("pre", { className: "m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono", children: JSON.stringify(u.data, null, 2) }) })
  ] });
}, M1 = 100;
class J3 {
  constructor() {
    qe(this, "entries", []);
    qe(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * 创建新的日志条目（发送阶段）
   */
  logSend(s) {
    const o = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, c = {
      id: o,
      timestamp: Date.now(),
      type: s.type,
      direction: "sent",
      systemPrompt: s.systemPrompt,
      userPrompt: s.userPrompt,
      tokensSent: s.tokensSent,
      model: s.model,
      floorRange: s.floorRange,
      status: "pending"
    };
    return this.entries.unshift(c), this.trimEntries(), this.notifyListeners(), o;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(s, o) {
    const c = this.entries.find((x) => x.id === s);
    if (!c) return;
    const f = {
      id: `${s}_recv`,
      timestamp: Date.now(),
      type: c.type,
      direction: "received",
      response: o.response,
      tokensReceived: o.tokensReceived,
      status: o.status,
      error: o.error,
      duration: o.duration,
      model: c.model,
      floorRange: c.floorRange
    };
    c.status = o.status, c.duration = o.duration;
    const m = this.entries.findIndex((x) => x.id === s);
    m >= 0 ? this.entries.splice(m, 0, f) : this.entries.unshift(f), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(s, o) {
    const c = this.logSend(s), f = Date.now();
    try {
      const m = await o();
      return this.logReceive(c, {
        response: typeof m == "string" ? m : JSON.stringify(m),
        status: "success",
        duration: Date.now() - f
      }), m;
    } catch (m) {
      throw this.logReceive(c, {
        status: "error",
        error: m instanceof Error ? m.message : String(m),
        duration: Date.now() - f
      }), m;
    }
  }
  /**
   * 获取所有日志
   */
  getAll() {
    return [...this.entries];
  }
  /**
   * 获取配对的日志（发送+接收）
   */
  getPaired() {
    const s = [], o = this.entries.filter((c) => c.direction === "sent");
    for (const c of o) {
      const f = this.entries.find(
        (m) => m.id === `${c.id}_recv` && m.direction === "received"
      );
      s.push({ sent: c, received: f });
    }
    return s;
  }
  /**
   * 清除所有日志
   */
  clear() {
    this.entries = [], this.notifyListeners();
  }
  /**
   * 订阅日志变化
   */
  subscribe(s) {
    return this.listeners.add(s), () => this.listeners.delete(s);
  }
  /**
   * 获取日志数量
   */
  getCount() {
    return this.entries.filter((s) => s.direction === "sent").length;
  }
  /**
   * 裁剪条目
   */
  trimEntries() {
    this.entries.length > M1 * 2 && (this.entries = this.entries.slice(0, M1 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const Yn = new J3(), W3 = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, F3 = ({ status: u }) => {
  switch (u) {
    case "pending":
      return /* @__PURE__ */ r.jsx(hr, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ r.jsx(Xc, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ r.jsx(Ws, { size: 14, className: "text-red-400" });
  }
}, I3 = (u) => new Date(u).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), P3 = (u) => u === void 0 ? "-" : u < 1e3 ? `${u}ms` : `${(u / 1e3).toFixed(1)}s`, ep = ({ sent: u, received: s }) => {
  const [o, c] = A.useState(!1), f = W3[u.type];
  return /* @__PURE__ */ r.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => c(!o),
        children: [
          o ? /* @__PURE__ */ r.jsx(ca, { size: 14 }) : /* @__PURE__ */ r.jsx(Vc, { size: 14 }),
          /* @__PURE__ */ r.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${f.color}`, children: f.label }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground", children: I3(u.timestamp) }),
          /* @__PURE__ */ r.jsx(F3, { status: (s == null ? void 0 : s.status) || u.status }),
          u.floorRange && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            u.floorRange[0],
            "-",
            u.floorRange[1]
          ] }),
          /* @__PURE__ */ r.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ r.jsx(D4, { size: 12 }),
            P3((s == null ? void 0 : s.duration) || u.duration)
          ] })
        ]
      }
    ),
    o && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ r.jsx(kg, { size: 14 }),
          "发送",
          u.tokensSent && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            u.tokensSent,
            " tokens"
          ] })
        ] }),
        u.systemPrompt && /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ r.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: u.systemPrompt })
        ] }),
        u.userPrompt && /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ r.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: u.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ r.jsx(Z1, { size: 14 }),
          "接收",
          (s == null ? void 0 : s.tokensReceived) && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            s.tokensReceived,
            " tokens"
          ] })
        ] }),
        (s == null ? void 0 : s.status) === "error" && s.error && /* @__PURE__ */ r.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: s.error }),
        (s == null ? void 0 : s.response) && /* @__PURE__ */ r.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: s.response }),
        !s && u.status === "pending" && /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ r.jsx(hr, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, tp = () => {
  const [u, s] = A.useState(Yn.getPaired());
  return A.useEffect(() => Yn.subscribe(() => {
    s(Yn.getPaired());
  }), []), /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r.jsx(Pc, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ r.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          u.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => Yn.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ r.jsx(fa, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: u.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ r.jsx(Z1, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-3", children: u.map(({ sent: o, received: c }) => /* @__PURE__ */ r.jsx(ep, { sent: o, received: c }, o.id)) }) })
  ] });
}, qc = ({ tabs: u, activeTab: s, onChange: o, sticky: c = !0, top: f = 0, className: m = "", actions: x }) => /* @__PURE__ */ r.jsxs(
  "div",
  {
    className: `
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${c ? "sticky z-10 bg-background pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12" : "px-0"}
            ${m}
        `,
    style: c ? { top: f } : void 0,
    children: [
      /* @__PURE__ */ r.jsx("div", { className: "flex overflow-x-auto gap-2 pb-1 no-scrollbar", children: u.map((p) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          onClick: () => o(p.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === p.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            p.icon && /* @__PURE__ */ r.jsx("span", { className: "w-4 h-4", children: p.icon }),
            p.label,
            s === p.id && /* @__PURE__ */ r.jsx("div", { className: "absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)] z-10 transition-all duration-300" })
          ]
        },
        p.id
      )) }),
      x && /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-2 pb-1 shrink-0", children: x })
    ]
  }
), np = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ r.jsx(da, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ r.jsx(Pc, { size: 14 }) }
], lp = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], ap = ({ initialTab: u }) => {
  const [s, o] = A.useState(u || "runtime"), [c, f] = A.useState([]), [m, x] = A.useState([]), [p, g] = A.useState(""), [b, S] = A.useState(-1), [v, R] = A.useState("ALL"), [q, _] = A.useState(!0), [G, K] = A.useState(!1), [$, W] = A.useState(!1), P = A.useRef(null);
  A.useEffect(() => {
    f(ae.getLogs());
    const X = ae.subscribe((Y) => {
      f((ce) => [...ce, Y]);
    });
    return () => X();
  }, []), A.useEffect(() => {
    let X = c;
    if (b !== -1 && (X = X.filter((Y) => Y.level >= b)), v !== "ALL" && (X = X.filter((Y) => Y.module.startsWith(v))), p.trim()) {
      const Y = p.toLowerCase();
      X = X.filter(
        (ce) => ce.message.toLowerCase().includes(Y) || ce.module.toLowerCase().includes(Y)
      );
    }
    x(X);
  }, [c, b, v, p]), A.useEffect(() => {
    q && P.current && P.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [m, q]);
  const xe = A.useCallback(async () => {
    await ae.clear(), f([]);
  }, []), te = A.useCallback(() => {
    const X = ae.exportToMarkdown(), Y = ae.getExportFilename(), ce = new Blob([X], { type: "text/markdown" }), Se = URL.createObjectURL(ce), he = document.createElement("a");
    he.href = Se, he.download = Y, he.click(), URL.revokeObjectURL(Se), ae.success("DevLog", `日志已导出: ${Y}`);
  }, []);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ r.jsx(
      qc,
      {
        tabs: np,
        activeTab: s,
        onChange: (X) => o(X),
        sticky: !0
      }
    ),
    s === "runtime" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col flex-1 min-h-0", children: [
      /* @__PURE__ */ r.jsx("div", { className: "sticky top-[52px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => K(!G),
              children: [
                b === -1 ? "全部级别" : Vs[b].label,
                /* @__PURE__ */ r.jsx(ca, { size: 12 })
              ]
            }
          ),
          G && /* @__PURE__ */ r.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col", children: [
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  S(-1), K(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(Vs).map(([X, Y]) => /* @__PURE__ */ r.jsxs(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  S(Number(X)), K(!1);
                },
                children: [
                  Y.icon,
                  " ",
                  Y.label
                ]
              },
              X
            ))
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => W(!$),
              children: [
                v,
                /* @__PURE__ */ r.jsx(ca, { size: 12 })
              ]
            }
          ),
          $ && /* @__PURE__ */ r.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col", children: lp.map((X) => /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                R(X), W(!1);
              },
              children: X
            },
            X
          )) })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ r.jsx(oa, { size: 12 }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: p,
              onChange: (X) => g(X.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${q ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => _(!q),
              title: "自动滚动",
              children: /* @__PURE__ */ r.jsx(u4, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: xe,
              title: "清空",
              children: /* @__PURE__ */ r.jsx(fa, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: te,
              children: [
                /* @__PURE__ */ r.jsx($s, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: m.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ r.jsx(da, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        m.map((X) => /* @__PURE__ */ r.jsx(K3, { entry: X }, X.id)),
        /* @__PURE__ */ r.jsx("div", { ref: P })
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        c.length,
        " 条日志",
        m.length !== c.length && ` · ${m.length} 条匹配`
      ] })
    ] }),
    s === "model" && /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ r.jsx(tp, {}) })
  ] });
}, rp = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, sp = ({
  icon: u,
  title: s,
  subtitle: o,
  meta: c,
  badges: f = [],
  selected: m = !1,
  disabled: x = !1,
  toggle: p,
  onClick: g,
  actions: b = [],
  className: S = "",
  compact: v = !1
}) => {
  const R = b.filter((_) => !_.hidden), q = !!p;
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${v ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${m ? "bg-accent/60" : "hover:bg-muted/40"}
                ${x ? "opacity-50 pointer-events-none" : ""}
                ${S}
            `,
      onClick: g,
      children: [
        (u || q) && /* @__PURE__ */ r.jsx("div", { className: "flex-shrink-0", children: q ? /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${p.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (_) => {
              _.stopPropagation(), p.onChange(!p.checked);
            },
            children: /* @__PURE__ */ r.jsx(Fc, { size: 14 })
          }
        ) : /* @__PURE__ */ r.jsx("div", { className: `
                            w-7 h-7 flex items-center justify-center rounded-md transition-colors
                            ${m ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                        `, children: u }) }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ r.jsx("span", { className: `
                        text-sm font-medium truncate transition-colors
                        ${m ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                        ${p && !p.checked ? "line-through opacity-60" : ""}
                    `, children: s }),
            f.map((_, G) => /* @__PURE__ */ r.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${rp[_.color || "default"]}
                            `,
                children: _.text
              },
              G
            ))
          ] }),
          (o || c) && /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            o && /* @__PURE__ */ r.jsx("span", { className: "truncate", children: o }),
            c && /* @__PURE__ */ r.jsx("span", { className: "flex-shrink-0 font-mono", children: c })
          ] })
        ] }),
        m && !R.length && /* @__PURE__ */ r.jsx(J1, { size: 14, className: "text-primary flex-shrink-0" }),
        R.length > 0 && /* @__PURE__ */ r.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${m ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: R.map((_, G) => /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `
                                p-1.5 rounded transition-colors
                                ${_.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                            `,
            onClick: (K) => {
              K.stopPropagation(), _.onClick(K);
            },
            title: _.title,
            children: _.icon
          },
          G
        )) })
      ]
    }
  );
}, ip = ({
  preset: u,
  isSelected: s,
  onSelect: o,
  onEdit: c,
  onCopy: f,
  onDelete: m
}) => {
  var g;
  const x = u.source === "tavern" || u.source === "tavern_profile" ? em : L4, p = u.source === "custom" ? ((g = u.custom) == null ? void 0 : g.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ r.jsx(
    sp,
    {
      icon: /* @__PURE__ */ r.jsx(x, { size: 14 }),
      title: u.name,
      subtitle: p,
      meta: `T:${u.parameters.temperature}`,
      badges: u.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: s,
      onClick: o,
      actions: [
        { icon: /* @__PURE__ */ r.jsx(gg, { size: 12 }), onClick: () => c(), title: "编辑" },
        { icon: /* @__PURE__ */ r.jsx(W1, { size: 12 }), onClick: () => f(), title: "复制" },
        { icon: /* @__PURE__ */ r.jsx(fa, { size: 12 }), onClick: () => m(), title: "删除", danger: !0, hidden: u.isDefault }
      ]
    }
  );
}, _t = ({ title: u, description: s, children: o, className: c = "" }) => /* @__PURE__ */ r.jsxs("div", { className: `mb-8 ${c}`, children: [
  /* @__PURE__ */ r.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-primary", children: u }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s })
  ] }),
  /* @__PURE__ */ r.jsx("div", { className: "space-y-4", children: o })
] }), pt = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: m,
  onChange: x,
  placeholder: p,
  type: g = "text",
  disabled: b,
  multiline: S,
  rows: v = 3
}) => {
  const R = {
    background: "transparent",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    borderRadius: 0,
    boxShadow: "none",
    outline: "none",
    padding: "8px 0",
    fontSize: "14px",
    width: "100%",
    color: "var(--foreground, inherit)"
  };
  return /* @__PURE__ */ r.jsxs("div", { className: `flex flex-col gap-1 ${f}`, children: [
    /* @__PURE__ */ r.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    S ? /* @__PURE__ */ r.jsx(
      "textarea",
      {
        value: m,
        onChange: (q) => x(q.target.value),
        placeholder: p,
        disabled: b,
        rows: v,
        style: R,
        className: "font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ) : /* @__PURE__ */ r.jsx(
      "input",
      {
        type: g,
        value: m,
        onChange: (q) => x(q.target.value),
        placeholder: p,
        disabled: b,
        style: R,
        className: "placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, hl = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: m,
  onChange: x,
  min: p,
  max: g,
  step: b = 1,
  showSlider: S = !0,
  suffix: v
}) => {
  const R = {
    background: "transparent",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    borderRadius: 0,
    boxShadow: "none",
    outline: "none",
    padding: "4px 0",
    fontSize: "12px",
    width: "64px",
    textAlign: "right",
    fontFamily: "monospace",
    color: "var(--foreground, inherit)"
  }, q = p !== void 0 && g !== void 0 ? Math.min(100, Math.max(0, (m - p) / (g - p) * 100)) : 0;
  return /* @__PURE__ */ r.jsxs("div", { className: `flex flex-col gap-2 ${f}`, children: [
    /* @__PURE__ */ r.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ r.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
      S && p !== void 0 && g !== void 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex-1 relative h-4 flex items-center group cursor-pointer", children: [
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "absolute inset-x-0 h-[1px]",
            style: { backgroundColor: "var(--border)" }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
            style: { left: `${q}%`, transform: "translate(-50%, -50%)" }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            min: p,
            max: g,
            step: b,
            value: m,
            onChange: (_) => x(Number(_.target.value)),
            className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
            style: { appearance: "none", WebkitAppearance: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          type: "number",
          min: p,
          max: g,
          step: b,
          value: m,
          onChange: (_) => x(Number(_.target.value)),
          style: R,
          className: "focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }
      )
    ] }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, gn = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: m,
  onChange: x,
  options: p,
  placeholder: g = "请选择...",
  disabled: b
}) => {
  const S = {
    background: "transparent",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid var(--border)",
    borderRadius: 0,
    boxShadow: "none",
    outline: "none",
    padding: "8px 24px 8px 0",
    fontSize: "14px",
    width: "100%",
    cursor: "pointer",
    color: "var(--foreground, inherit)",
    appearance: "none",
    WebkitAppearance: "none"
  };
  return /* @__PURE__ */ r.jsxs("div", { className: `flex flex-col gap-1 ${f}`, children: [
    /* @__PURE__ */ r.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ r.jsxs(
        "select",
        {
          value: m,
          onChange: (v) => x(v.target.value),
          disabled: b,
          style: S,
          className: "disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors",
          children: [
            /* @__PURE__ */ r.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: g }),
            p.map((v) => /* @__PURE__ */ r.jsx("option", { value: v.value, className: "bg-popover text-foreground", children: v.label }, v.value))
          ]
        }
      ),
      /* @__PURE__ */ r.jsx(ca, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" })
    ] }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, $n = ({
  label: u,
  description: s,
  error: o,
  className: c = "",
  checked: f,
  onChange: m,
  disabled: x,
  compact: p
}) => /* @__PURE__ */ r.jsxs("div", { className: `flex items-start justify-between gap-4 ${p ? "py-0" : "py-1"} ${c} ${x ? "opacity-50 pointer-events-none" : ""}`, children: [
  u && // 只有当 label 存在时才渲染左侧区域，避免只有开关时占用过多空间
  /* @__PURE__ */ r.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ r.jsx(
      "label",
      {
        className: "text-xs text-foreground cursor-pointer",
        onClick: () => !x && m(!f),
        children: u
      }
    ),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: o })
  ] }),
  /* @__PURE__ */ r.jsxs(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": f,
      onClick: () => !x && m(!f),
      disabled: x,
      className: "relative inline-flex h-4 w-8 shrink-0 items-center justify-center cursor-pointer focus:outline-none group",
      children: [
        /* @__PURE__ */ r.jsx(
          "span",
          {
            className: "absolute left-0 w-full h-[1px]",
            style: { backgroundColor: "var(--border)" }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "span",
          {
            className: `
                        absolute block h-2.5 w-2.5 rounded-full shadow-sm transition-all duration-200 group-hover:scale-110
                        ${f ? "left-full -translate-x-full bg-foreground" : "left-0 bg-muted-foreground"}
                    `,
            style: { top: "50%", transform: f ? "translate(-100%, -50%)" : "translate(0, -50%)" }
          }
        )
      ]
    }
  )
] });
class pn {
  // 10秒
  /**
   * 通用入口：根据 API 类型获取模型列表
   */
  static async fetchModels(s, o) {
    switch (s) {
      case "openai":
        return this.fetchOpenAIModels(o);
      case "ollama":
        return this.fetchOllamaModels(o);
      case "vllm":
        return this.fetchVLLMModels(o);
      case "cohere":
        return this.fetchCohereModels(o);
      case "jina":
      case "voyage":
        return this.getPresetModels(s);
      default:
        return ae.warn("ModelService", `Unknown API type: ${s}`), [];
    }
  }
  /**
   * 获取 OpenAI 兼容 API 的模型列表
   * 适用于: OpenAI, Azure, 自定义 OpenAI 兼容服务
   */
  static async fetchOpenAIModels(s) {
    const { apiUrl: o, apiKey: c, timeout: f = this.DEFAULT_TIMEOUT } = s, m = o.replace(/\/+$/, ""), x = m.endsWith("/v1") ? `${m}/models` : `${m}/v1/models`;
    try {
      const p = new AbortController(), g = setTimeout(() => p.abort(), f), b = {
        "Content-Type": "application/json"
      };
      c && (b.Authorization = `Bearer ${c}`);
      const S = await fetch(x, {
        method: "GET",
        headers: b,
        signal: p.signal
      });
      if (clearTimeout(g), !S.ok)
        throw new Error(`HTTP ${S.status}: ${S.statusText}`);
      const v = await S.json(), R = (v.data || v || []).map((q) => ({
        id: q.id || q.model,
        name: q.name || q.id || q.model,
        owned_by: q.owned_by
      }));
      return ae.info("ModelService", `Fetched ${R.length} models from OpenAI API`), R.sort((q, _) => q.id.localeCompare(_.id));
    } catch (p) {
      throw p.name === "AbortError" ? ae.error("ModelService", "OpenAI API request timeout") : ae.error("ModelService", `OpenAI API error: ${p.message}`), p;
    }
  }
  /**
   * 获取 Ollama 模型列表
   */
  static async fetchOllamaModels(s) {
    const { apiUrl: o, timeout: c = this.DEFAULT_TIMEOUT } = s, m = `${o.replace(/\/+$/, "")}/api/tags`;
    try {
      const x = new AbortController(), p = setTimeout(() => x.abort(), c), g = await fetch(m, {
        method: "GET",
        signal: x.signal
      });
      if (clearTimeout(p), !g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const S = ((await g.json()).models || []).map((v) => ({
        id: v.name || v.model,
        name: v.name || v.model
      }));
      return ae.info("ModelService", `Fetched ${S.length} models from Ollama`), S;
    } catch (x) {
      throw ae.error("ModelService", `Ollama API error: ${x.message}`), x;
    }
  }
  /**
   * 获取 vLLM 模型列表
   * vLLM 使用 OpenAI 兼容 API
   */
  static async fetchVLLMModels(s) {
    return this.fetchOpenAIModels(s);
  }
  /**
   * 获取 Cohere 模型列表
   */
  static async fetchCohereModels(s) {
    const { apiKey: o, timeout: c = this.DEFAULT_TIMEOUT } = s;
    if (!o)
      return ae.warn("ModelService", "Cohere API key required"), this.getPresetModels("cohere");
    try {
      const f = new AbortController(), m = setTimeout(() => f.abort(), c), x = await fetch("https://api.cohere.ai/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${o}`,
          "Content-Type": "application/json"
        },
        signal: f.signal
      });
      if (clearTimeout(m), !x.ok)
        throw new Error(`HTTP ${x.status}: ${x.statusText}`);
      const g = ((await x.json()).models || []).filter((b) => {
        var S;
        return (S = b.endpoints) == null ? void 0 : S.includes("embed");
      }).map((b) => ({
        id: b.name,
        name: b.name,
        contextLength: b.context_length
      }));
      return ae.info("ModelService", `Fetched ${g.length} embed models from Cohere`), g;
    } catch (f) {
      return ae.error("ModelService", `Cohere API error: ${f.message}`), this.getPresetModels("cohere");
    }
  }
  /**
   * 获取预设模型列表（用于不支持动态获取的服务）
   */
  static getPresetModels(s) {
    return {
      cohere: [
        { id: "embed-multilingual-v3.0", name: "Embed Multilingual v3.0" },
        { id: "embed-english-v3.0", name: "Embed English v3.0" },
        { id: "embed-multilingual-light-v3.0", name: "Embed Multilingual Light v3.0" },
        { id: "embed-english-light-v3.0", name: "Embed English Light v3.0" }
      ],
      jina: [
        { id: "jina-embeddings-v3", name: "Jina Embeddings v3" },
        { id: "jina-embeddings-v2-base-en", name: "Jina Embeddings v2 Base EN" },
        { id: "jina-embeddings-v2-base-zh", name: "Jina Embeddings v2 Base ZH" },
        { id: "jina-colbert-v2", name: "Jina ColBERT v2" }
      ],
      voyage: [
        { id: "voyage-3", name: "Voyage 3" },
        { id: "voyage-3-lite", name: "Voyage 3 Lite" },
        { id: "voyage-large-2", name: "Voyage Large 2" },
        { id: "voyage-code-2", name: "Voyage Code 2" },
        { id: "voyage-multilingual-2", name: "Voyage Multilingual 2" }
      ],
      openai: [
        { id: "text-embedding-3-large", name: "Text Embedding 3 Large" },
        { id: "text-embedding-3-small", name: "Text Embedding 3 Small" },
        { id: "text-embedding-ada-002", name: "Text Embedding Ada 002" }
      ]
    }[s] || [];
  }
  /**
   * 获取常用 Rerank 模型列表
   */
  static getCommonRerankModels() {
    return [
      { id: "BAAI/bge-reranker-v2-m3", name: "BGE Reranker v2 m3" },
      { id: "BAAI/bge-reranker-large", name: "BGE Reranker Large" },
      { id: "BAAI/bge-reranker-base", name: "BGE Reranker Base" },
      { id: "cross-encoder/ms-marco-MiniLM-L-12-v2", name: "MS MARCO MiniLM L12" },
      { id: "Xenova/ms-marco-MiniLM-L-6-v2", name: "MS MARCO MiniLM L6 (ONNX)" },
      { id: "jinaai/jina-reranker-v2-base-multilingual", name: "Jina Reranker v2 Multilingual" }
    ];
  }
}
qe(pn, "DEFAULT_TIMEOUT", 1e4);
const op = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], cp = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function up() {
  var u, s, o, c;
  try {
    const f = (o = (s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) == null ? void 0 : o.extensionSettings;
    return ((c = f == null ? void 0 : f.connectionManager) == null ? void 0 : c.profiles) || [];
  } catch (f) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", f), [];
  }
}
const dp = ({
  preset: u,
  onChange: s,
  isNew: o = !1
}) => {
  var te, X, Y, ce, Se, he;
  const [c, f] = A.useState([]), [m, x] = A.useState(!1), [p, g] = A.useState([]), [b, S] = A.useState(!1), [v, R] = A.useState(null), q = () => {
    x(!0);
    try {
      const U = up();
      f(U);
    } finally {
      x(!1);
    }
  }, _ = async () => {
    const { apiUrl: U, apiKey: ee, apiSource: de } = u.custom || {};
    if (!U) {
      R("请先填写 API URL");
      return;
    }
    S(!0), R(null);
    try {
      let Ne = [];
      de === "ollama" ? Ne = await pn.fetchOllamaModels({ apiUrl: U }) : Ne = await pn.fetchOpenAIModels({ apiUrl: U, apiKey: ee }), g(Ne), Ne.length === 0 && R("未找到可用模型");
    } catch (Ne) {
      R(Ne.message || "获取模型列表失败"), g([]);
    } finally {
      S(!1);
    }
  };
  A.useEffect(() => {
    q();
  }, []);
  const G = (U) => {
    s({ ...u, ...U, updatedAt: Date.now() });
  }, K = (U, ee) => {
    G({
      parameters: { ...u.parameters, [U]: ee }
    });
  }, $ = (U, ee) => {
    var de, Ne, se, z;
    G({
      custom: {
        apiUrl: ((de = u.custom) == null ? void 0 : de.apiUrl) || "",
        apiKey: ((Ne = u.custom) == null ? void 0 : Ne.apiKey) || "",
        model: ((se = u.custom) == null ? void 0 : se.model) || "",
        apiSource: ((z = u.custom) == null ? void 0 : z.apiSource) || "openai",
        [U]: ee
      }
    });
  }, W = (U) => {
    const ee = U;
    G({
      source: ee,
      tavernProfileId: ee === "tavern_profile" ? u.tavernProfileId : void 0
    }), ee === "tavern_profile" && q();
  }, P = c.map((U) => ({
    value: U.id,
    label: `${U.name} (${U.api || "Unknown"} - ${U.model || "Unknown"})`
  })), xe = c.find((U) => U.id === u.tavernProfileId);
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "基本信息", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "预设名称",
          value: u.name,
          onChange: (U) => G({ name: U }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "配置源",
          value: u.source,
          onChange: W,
          options: cp,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    u.source === "tavern_profile" && /* @__PURE__ */ r.jsxs(_t, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ r.jsx(
          gn,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: u.tavernProfileId || "",
            onChange: (U) => G({ tavernProfileId: U }),
            options: P,
            placeholder: m ? "加载中..." : "请选择配置文件",
            disabled: m || P.length === 0
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: q,
            disabled: m,
            title: "刷新配置列表",
            children: /* @__PURE__ */ r.jsx(Zt, { size: 16, className: m ? "animate-spin" : "" })
          }
        )
      ] }),
      P.length === 0 && !m && /* @__PURE__ */ r.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      xe && /* @__PURE__ */ r.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: xe.api || "-" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: xe.model || "-" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: xe.preset || "-" })
        ] })
      ] })
    ] }),
    u.source === "custom" && /* @__PURE__ */ r.jsxs(_t, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "API 类型",
          value: ((te = u.custom) == null ? void 0 : te.apiSource) || "openai",
          onChange: (U) => $("apiSource", U),
          options: op
        }
      ),
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API URL",
          type: "url",
          value: ((X = u.custom) == null ? void 0 : X.apiUrl) || "",
          onChange: (U) => $("apiUrl", U),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API Key",
          type: "password",
          value: ((Y = u.custom) == null ? void 0 : Y.apiKey) || "",
          onChange: (U) => $("apiKey", U),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
          p.length > 0 ? /* @__PURE__ */ r.jsx(
            gn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((ce = u.custom) == null ? void 0 : ce.model) || "",
              onChange: (U) => $("model", U),
              options: p.map((U) => ({ value: U.id, label: U.name || U.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ r.jsx(
            pt,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((Se = u.custom) == null ? void 0 : Se.model) || "",
              onChange: (U) => $("model", U),
              placeholder: "gpt-4o-mini",
              required: !0
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: _,
              disabled: b || !((he = u.custom) != null && he.apiUrl),
              title: "获取模型列表",
              children: b ? /* @__PURE__ */ r.jsx(hr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
            }
          )
        ] }),
        v && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: v }),
        p.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          p.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs(_t, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ r.jsx(
        hl,
        {
          label: "温度 (Temperature)",
          value: u.parameters.temperature,
          onChange: (U) => K("temperature", U),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ r.jsx(
        hl,
        {
          label: "Top-P",
          value: u.parameters.topP,
          onChange: (U) => K("topP", U),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ r.jsx(
        hl,
        {
          label: "最大输出 Tokens",
          value: u.parameters.maxTokens,
          onChange: (U) => K("maxTokens", U),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ r.jsx(
        hl,
        {
          label: "频率惩罚",
          value: u.parameters.frequencyPenalty,
          onChange: (U) => K("frequencyPenalty", U),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ r.jsx(
        hl,
        {
          label: "存在惩罚",
          value: u.parameters.presencePenalty,
          onChange: (U) => K("presencePenalty", U),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] })
  ] });
}, fp = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], O1 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, R1 = ["ollama", "vllm"], D1 = ["openai", "cohere", "jina", "voyage"], mp = ({
  config: u,
  onChange: s
}) => {
  var q;
  const o = (_) => {
    s({ ...u, ..._ });
  }, c = (_) => {
    o({
      source: _,
      model: O1[_],
      apiUrl: R1.includes(_) ? u.apiUrl : void 0,
      apiKey: D1.includes(_) ? u.apiKey : void 0
    });
  }, f = R1.includes(u.source), m = D1.includes(u.source), [x, p] = A.useState([]), [g, b] = A.useState(!1), [S, v] = A.useState(null), R = async () => {
    b(!0), v(null);
    try {
      let _ = [];
      const G = { apiUrl: u.apiUrl || "", apiKey: u.apiKey };
      switch (u.source) {
        case "ollama":
          if (!u.apiUrl) {
            v("请先填写 API URL");
            return;
          }
          _ = await pn.fetchOllamaModels(G);
          break;
        case "vllm":
          if (!u.apiUrl) {
            v("请先填写 API URL");
            return;
          }
          _ = await pn.fetchVLLMModels(G);
          break;
        case "openai":
        case "cohere":
        case "jina":
        case "voyage":
          _ = pn.getPresetModels(u.source);
          break;
        default:
          _ = [];
      }
      p(_), _.length === 0 && v("未找到可用模型");
    } catch (_) {
      v(_.message || "获取模型列表失败"), p([]);
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "向量源",
          value: u.source,
          onChange: (_) => c(_),
          options: fp,
          description: "选择向量化服务提供商"
        }
      ),
      f && /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API URL",
          type: "url",
          value: u.apiUrl || "",
          onChange: (_) => o({ apiUrl: _ }),
          placeholder: u.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${u.source} 服务的 API 端点`
        }
      ),
      m && /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API Key",
          type: "password",
          value: u.apiKey || "",
          onChange: (_) => o({ apiKey: _ }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
          x.length > 0 ? /* @__PURE__ */ r.jsx(
            gn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: u.model || "",
              onChange: (_) => o({ model: _ }),
              options: x.map((_) => ({ value: _.id, label: _.name || _.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ r.jsx(
            pt,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: u.model || "",
              onChange: (_) => o({ model: _ }),
              placeholder: O1[u.source],
              description: "使用的向量化模型"
            }
          ),
          (f || m) && /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: R,
              disabled: g,
              title: "获取模型列表",
              children: g ? /* @__PURE__ */ r.jsx(hr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: S }),
        x.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          x.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(_t, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ r.jsx(
      pt,
      {
        label: "向量维度",
        value: ((q = u.dimensions) == null ? void 0 : q.toString()) || "",
        onChange: (_) => {
          const G = parseInt(_, 10);
          o({ dimensions: isNaN(G) ? void 0 : G });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, hp = ({
  config: u,
  onChange: s
}) => {
  const o = (S) => {
    s({ ...u, ...S });
  }, [c, f] = A.useState([]), [m, x] = A.useState(!1), [p, g] = A.useState(null), b = async () => {
    if (!u.url) {
      g("请先填写 API URL");
      return;
    }
    x(!0), g(null);
    try {
      const S = await pn.fetchOpenAIModels({
        apiUrl: u.url,
        apiKey: u.apiKey
      });
      S.length > 0 ? f(S) : f(pn.getCommonRerankModels());
    } catch {
      f(pn.getCommonRerankModels());
    } finally {
      x(!1);
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsx(_t, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ r.jsx(
      $n,
      {
        label: "启用 Rerank",
        checked: u.enabled,
        onChange: (S) => o({ enabled: S }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    u.enabled && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs(_t, { title: "API 配置", children: [
        /* @__PURE__ */ r.jsx(
          pt,
          {
            label: "API URL",
            type: "url",
            value: u.url,
            onChange: (S) => o({ url: S }),
            placeholder: "http://localhost:8000/rerank",
            description: "Rerank 服务的 API 端点",
            required: !0
          }
        ),
        /* @__PURE__ */ r.jsx(
          pt,
          {
            label: "API Key",
            type: "password",
            value: u.apiKey,
            onChange: (S) => o({ apiKey: S }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
            c.length > 0 ? /* @__PURE__ */ r.jsx(
              gn,
              {
                className: "flex-1 !mb-0",
                label: "模型名称",
                value: u.model,
                onChange: (S) => o({ model: S }),
                options: c.map((S) => ({ value: S.id, label: S.name || S.id })),
                placeholder: "选择模型"
              }
            ) : /* @__PURE__ */ r.jsx(
              pt,
              {
                className: "flex-1 !mb-0",
                label: "模型名称",
                value: u.model,
                onChange: (S) => o({ model: S }),
                placeholder: "BAAI/bge-reranker-v2-m3",
                description: "使用的 Rerank 模型",
                required: !0
              }
            ),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                type: "button",
                className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
                onClick: b,
                disabled: m,
                title: "获取模型列表",
                children: m ? /* @__PURE__ */ r.jsx(hr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
              }
            )
          ] }),
          p && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: p }),
          c.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "已加载 ",
            c.length,
            " 个模型"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs(_t, { title: "参数设置", children: [
        /* @__PURE__ */ r.jsx(
          hl,
          {
            label: "Top-N",
            value: u.topN,
            onChange: (S) => o({ topN: S }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ r.jsx(
          hl,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: u.hybridAlpha,
            onChange: (S) => o({ hybridAlpha: S }),
            min: 0,
            max: 1,
            step: 0.1,
            description: "0 = 纯向量检索评分，1 = 纯 Rerank 评分"
          }
        )
      ] })
    ] })
  ] });
}, gp = `<system_configuration>
  <role_definition>
    身份: 长篇故事记忆摘要器
    核心任务: 担任超长篇故事的"记忆核心"。接收用户提供的已有剧情原文，先理解"故事元摘要"的宏观视角，然后严格按照时间顺序，并遵照"事件粒度原则"合并同类项，分解为最精简的、服务于长线记忆的关键事件。
    禁令: 绝对禁止创作新内容、剧情推演或添加创意。绝对禁止输出YAML代码块。绝对禁止输出额外解释。
  </role_definition>

  <formatting_protocol>
    输出格式: 纯文本列表。
    事件行格式: 数字序号. [上下文信息] 事件核心描述 (重要性等级 | 权重值)
    宏观时间标记: 【 时间描述文本 】 (单独占一行，无序号)
    上下文信息: [时间 | 地点 | 核心人物] (若缺失则省略，全缺失用[])
  </formatting_protocol>

  <logic_protocol>
    评估基准:
      原则: 所有评估必须以开头提供的"故事元摘要"为基准。
      注意: 一个在当前章节看起来很"关键"的事件（比如找到一个普通线索），从整个故事（元摘要）的尺度看，可能仅仅是"基础"。
    
    时间顺序与锚定:
      首要规则: 严格按照原文的时间流逝顺序排列。
      宏观时间轴: 当剧情发生天数变更、年份跳跃、进入长时段回忆或新的篇章时，必须输出宏观时间标记。
        历法日期: 如"太阳历1023年4月4日"。
        相对日期: 如"第1天"、"第3年"、"数日后"。
      微观时间戳: 在具体事件行中，聚焦于：
        具体时刻: 如 HH:MM (14:30)。
        自然时段: 如 清晨、深夜、正午、黄昏。
        时间流状态: 对于跨越长日期的宏观块，使用 长期（表示持续性动作）、开始、过程、结束、突发 等标记。

    事件粒度原则 (节省Token的核心):
      最高原则: 合并连续的因果链。必须将服务于同一个直接目标、在短时间内连续发生的多个动作和反应，合并成一个单一的、结果导向的事件。
      判定标准: 一场完整的战斗（从接触到结束）、一次完整的谈判、一次完整的潜行侦察，都应被视为一个事件。
      错误示例 (过度细分):
        1: {{user}}发现紫袍人。
        2: {{user}}的潜行被察觉。
        3: {{user}}发起试探攻击...
      正确示例 (合并后的单一事件):
        1: [巢穴深处 | {{user}}, 紫袍人, 援军] {{user}}与紫袍人对峙，但在精神攻击下不敌陷入危机，最终被援军所救。 (推动 | 0.7)

    描述标准 (情报式摘要):
      动词-宾语核心: 砍掉所有不必要的修饰词、副词和从句，只保留事件的核心骨架："谁，做了什么，对谁/什么"。
        错误: {{user}}在休息区找到了任务委托人——性格古板的药草师赫伯，并确认了任务细节。
        正确: {{user}}与药草师赫伯会面，确认任务。
      结论优先: 对于分析或推断性质的事件，直接给出最终的"结论"，省略思考过程。
        错误: {{user}}结合军事经验将线索串联，推断出哥布林已初具规模...
        正确: {{user}}得出结论：哥布林已成规模并计划扩张。
      状态快照: 对于描述角色状态或关系变化的事件，只记录其最终形成的稳定新状态，而不是描述变化过程。
        错误: 严峻的形势让赫伯彻底信服{{user}}的判断，他在一个岔路口前将决定权完全交给了{{user}}...
        正确: 赫伯完全信服，并将决策权交给{{user}}。
      关键信息保留: 绝不省略对剧情至关重要的专有名词、关键数据或核心发现。不能用模糊的词（如"基础情报"、"某个物品"）来代替具体信息。
        错误: {{user}}获取了基础情报。
        正确: {{user}}获知情报：斯特林集团涉嫌数据伪造。

    重要性分级 (金字塔模型):
      等级一_基础 (Foundation):
        权重: 0.1 - 0.4
        定义: 构成世界和叙事基础的背景、细节和常规互动。绝大多数（>60%）事件都属于此等级。
        伏笔处理: 对于符合"反常细节"或"悬而未决信息"的伏笔，也归于此类，但权重可酌情给予 0.3-0.4，并在描述中用括号注明 (伏笔)。
      等级二_推动 (Propulsion):
        权重: 0.5 - 0.7
        定义: 对某个章节或阶段剧情有实质性推动作用的事件。（占比 <30%）
        示例: 一次成功的关键说服、一次导致主角受伤的战斗、一个关键线索的发现。
      等级三_关键 (Keystone):
        权重: 0.8 - 0.9
        定义: 对长远故事有明确导向性作用的剧情关键节点。（占比 <10%）
        警告: 此等级不适用于故事早期的常规情节推进。
        示例: 关键配角的死亡、重要秘密的揭露、主角团队做出重大战略决策。
      等级四_转折 (Turning Point):
        权重: 1.0
        定义: 极其罕见的、能改变"故事元摘要"核心描述的决定性时刻。（占比 ≈1%）
        示例: 主角的死亡与重生、最终反派的揭晓、世界规则的颠覆。
  </logic_protocol>

  <output_template>
    <think>
      元摘要校准:
        故事基调: \${分析故事的核心类型和当前所处阶段}
        关键伏笔: \${回顾元摘要中提到的未解之谜，以便在摘要中保留相关线索}
      
      时间轴梳理:
        宏观节点识别: \${识别出原文中的日期变更、回忆片段或篇章转换}
        微观时刻提取: \${提取具体事件发生的时间点或自然时段}
      
      事件粒度分析:
        合并同类项: \${将连续的战斗、对话或行动合并为单一事件}
        重要性评估: \${根据金字塔模型，为每个事件评定等级和权重}
      
      格式自查:
        情报式摘要: \${检查是否去除了修饰词，只保留动宾结构}
        关键信息保留: \${确认是否保留了所有专有名词和关键数据}
    </think>

    \${按时间顺序输出宏观时间标记和事件列表}
    【 \${宏观时间描述} 】
    \${数字序号}. [\${微观时间} | \${地点} | \${核心人物}] \${事件核心描述} (\${重要性等级} | \${权重值})
  </output_template>
  
  <example_demonstration>
    输入原文:
      "穿越者A重伤濒死，被B公主发现并施展治愈术救回。B因同情决定暂时收留A，并隐瞒其异界人身份。
      (三年前的回忆) A在B安排下接受高强度骑士训练，习得"基础剑术"。两人确立主仆契约，A正式获得"见习守护骑士"头衔。
      (冒险开始) A使用假名"剑"注册冒险者，并提交了采集药草任务。A在交换情报时引起哥布林杀手注意，获赠"便携粉尘炸弹"。"

    AI输出:
      <think>
        元摘要校准:
          故事基调: \${异世界穿越/骑士成长/主仆羁绊}
          当前进度: \${从穿越初识到冒险起步}
        
        时间轴梳理:
          宏观节点1: \${太阳历1023年春4月4日 (穿越)}
          宏观节点2: \${太阳历1023年-1026年 (磨合期/回忆)}
          宏观节点3: \${第4年-第10天 (冒险开始)}
        
        事件粒度分析:
          事件1: \${A被救 (合并重伤/发现/治疗)} -> 关键
          事件2: \${B收留 (合并同情/决定/隐瞒)} -> 推动
          事件3: \${骑士训练 (合并长期训练过程)} -> 基础
          事件4: \${确立契约 (合并主仆关系确认/获得头衔)} -> 关键
          事件5: \${注册冒险者 (合并假名/注册/接任务)} -> 基础
          事件6: \${获赠炸弹 (合并情报交换/引起注意/获赠)} -> 推动
        
        格式自查:
          情报式摘要: \${去除修饰词，保留核心动宾结构}
          关键信息: \${保留"B"、"见习守护骑士"、"哥布林杀手"等专有名词}
      </think>

      【 太阳历1023年春4月4日 : 穿越 】
      1. [深夜 | 荒野森林 | A, B] 穿越者A重伤濒死，被B公主发现并施展治愈术救回。 (关键 | 0.8)
      2. [深夜 | 临时营地 | A, B] B因同情决定暂时收留A，并隐瞒其异界人身份。 (推动 | 0.6)

      【 太阳历1023年春4月4日-1026年秋9月5日 : 磨合期 (三年前的回忆) 】
      3. [长期 | 王城训练场 | A, 骑士长] A在B安排下接受高强度骑士训练，习得"基础剑术"。 (基础 | 0.4)
      4. [结束 | B寝宫 | A, B] 两人确立主仆契约，A正式获得"见习守护骑士"头衔。 (关键 | 0.8)

      【 第4年-第10天 : 冒险开始 】
      5. [正午 | 边境公会大厅 | A, 接待员] A使用假名"剑"注册冒险者，并提交了采集药草任务。 (基础 | 0.3)
      6. [14:30 | 小镇酒馆 | A, 哥布林杀手] A在交换情报时引起哥布林杀手注意，获赠"便携粉尘炸弹"。 (推动 | 0.7)
  </example_demonstration>
</system_configuration>
`, pp = `你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。
`, xp = `你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。
`, bp = `你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。
`, Zs = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], yp = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, vp = {
  maxChatHistory: 10
}, Sp = {
  source: "transformers"
}, jp = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function dm(u = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: u,
    source: "tavern",
    parameters: { ...yp },
    context: { ...vp },
    isDefault: !0,
    createdAt: s,
    updatedAt: s
  };
}
function pl(u, s, o = {}) {
  const c = Date.now();
  return {
    id: `template_${c}_${Math.random().toString(36).slice(2, 8)}`,
    name: u,
    category: s,
    enabled: o.enabled ?? !1,
    isBuiltIn: o.isBuiltIn ?? !1,
    boundPresetId: o.boundPresetId ?? null,
    systemPrompt: o.systemPrompt ?? "",
    userPromptTemplate: o.userPromptTemplate ?? "",
    outputFormat: o.outputFormat ?? "plain",
    availableVariables: o.availableVariables ?? ["{{chatHistory}}", "{{context}}", "{{char}}", "{{user}}"],
    createdAt: c,
    updatedAt: c
  };
}
function Cp() {
  return [
    pl("纯文本剧情总结", "text_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: gp,
      userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
      outputFormat: "plain"
    }),
    pl("向量化剧情总结", "vector_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: pp,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请从以下对话中提取结构化信息：

{{chatHistory}}

请以 JSON 格式输出，包含：
- summary: 事件摘要
- entities: 实体列表 [{name, type}]
- relations: 关系列表 [{subject, predicate, object}]
- keywords: 关键词列表`,
      outputFormat: "json"
    }),
    pl("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: xp,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请将以下多条剧情摘要合并精简：

{{engramSummaries}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    pl("查询增强", "query_enhance", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: bp,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

用户输入：{{userInput}}

最近对话上下文：
{{context}}

请输出扩展后的查询关键词列表，用于检索相关记忆。`,
      outputFormat: "plain"
    })
  ];
}
const Np = {
  enabled: !0,
  includeGlobal: !0,
  disabledWorldbooks: []
}, Ep = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  countLimit: 5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
};
function U1() {
  return {
    llmPresets: [dm()],
    selectedPresetId: null,
    vectorConfig: { ...Sp },
    rerankConfig: { ...jp },
    promptTemplates: Cp(),
    worldbookConfig: { ...Np }
  };
}
function Tp(u) {
  switch (u) {
    case "text_summary":
      return "text-blue-500 bg-blue-500/10 border border-blue-500/20";
    case "vector_summary":
      return "text-purple-500 bg-purple-500/10 border border-purple-500/20";
    case "trim":
      return "text-orange-500 bg-orange-500/10 border border-orange-500/20";
    case "query_enhance":
      return "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20";
    default:
      return "text-muted-foreground bg-muted border border-border";
  }
}
function wp(u) {
  var s;
  return ((s = Zs.find((o) => o.value === u)) == null ? void 0 : s.label) || u;
}
const _p = ({
  template: u,
  isSelected: s = !1,
  onSelect: o,
  onCopy: c,
  onDelete: f,
  onToggleEnabled: m,
  onImport: x
}) => {
  const p = A.useRef(null), g = (v) => {
    v.stopPropagation();
    const R = {
      version: "1.0",
      exportedAt: Date.now(),
      template: {
        name: u.name,
        category: u.category,
        boundPresetId: u.boundPresetId,
        systemPrompt: u.systemPrompt,
        userPromptTemplate: u.userPromptTemplate,
        outputFormat: u.outputFormat,
        availableVariables: u.availableVariables
      }
    }, q = new Blob([JSON.stringify(R, null, 2)], { type: "application/json" }), _ = URL.createObjectURL(q), G = document.createElement("a");
    G.href = _, G.download = `engram_template_${u.name.replace(/\s+/g, "_")}.json`, G.click(), URL.revokeObjectURL(_);
  }, b = (v) => {
    var R;
    v.stopPropagation(), (R = p.current) == null || R.click();
  }, S = (v) => {
    var _;
    const R = (_ = v.target.files) == null ? void 0 : _[0];
    if (!R || !x) return;
    const q = new FileReader();
    q.onload = (G) => {
      var K;
      try {
        const $ = JSON.parse((K = G.target) == null ? void 0 : K.result);
        if ($.version && $.template) {
          const W = pl(
            $.template.name,
            $.template.category,
            {
              enabled: u.enabled,
              // 保持当前启用状态
              isBuiltIn: u.isBuiltIn,
              // 保持内置状态
              boundPresetId: $.template.boundPresetId,
              systemPrompt: $.template.systemPrompt,
              userPromptTemplate: $.template.userPromptTemplate,
              outputFormat: $.template.outputFormat,
              availableVariables: $.template.availableVariables
            }
          );
          W.id = u.id, x(W);
        }
      } catch ($) {
        console.error("导入失败:", $);
      }
    }, q.readAsText(R), p.current && (p.current.value = "");
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${s ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: o,
      children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${u.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (v) => {
                v.stopPropagation(), m == null || m(!u.enabled);
              },
              children: /* @__PURE__ */ r.jsx(Fc, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ r.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: u.name }),
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ r.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${Tp(u.category)}`, children: wp(u.category) }),
                u.isBuiltIn && /* @__PURE__ */ r.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ r.jsx("span", { className: "truncate max-w-[120px]", children: u.boundPresetId ? `BOUND: ${u.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ r.jsx("span", { children: u.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${s || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: b, title: "Import", children: /* @__PURE__ */ r.jsx(qg, { size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: g, title: "Export", children: /* @__PURE__ */ r.jsx($s, { size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (v) => {
            v.stopPropagation(), c == null || c();
          }, title: "Copy", children: /* @__PURE__ */ r.jsx(W1, { size: 12 }) }),
          !u.isBuiltIn && /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (v) => {
            v.stopPropagation(), f == null || f();
          }, title: "Delete", children: /* @__PURE__ */ r.jsx(fa, { size: 12 }) })
        ] }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            ref: p,
            type: "file",
            accept: ".json",
            onChange: S,
            className: "hidden"
          }
        )
      ]
    }
  );
}, kp = ({
  templates: u,
  selectedId: s,
  onSelect: o,
  onAdd: c,
  onUpdate: f,
  onDelete: m
}) => {
  const x = () => {
    const v = pl(
      `新模板 ${u.length + 1}`,
      "text_summary"
    );
    c(v), o(v);
  }, p = (v) => {
    const R = pl(
      `${v.name} (副本)`,
      v.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: v.boundPresetId,
        systemPrompt: v.systemPrompt,
        userPromptTemplate: v.userPromptTemplate,
        outputFormat: v.outputFormat,
        availableVariables: [...v.availableVariables]
      }
    );
    c(R);
  }, g = (v, R) => {
    R && u.filter((q) => q.category === v.category && q.id !== v.id && q.enabled).forEach((q) => f({ ...q, enabled: !1 })), f({ ...v, enabled: R });
  }, b = (v) => {
    f(v);
  }, S = Zs.map((v) => ({
    ...v,
    templates: u.filter((R) => R.category === v.value)
  })).filter((v) => v.templates.length > 0);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: x,
          children: /* @__PURE__ */ r.jsx(Wc, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      S.map((v) => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          v.label,
          /* @__PURE__ */ r.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: v.templates.map((R) => /* @__PURE__ */ r.jsx(
          _p,
          {
            template: R,
            isSelected: s === R.id,
            onSelect: () => o(R),
            onCopy: () => p(R),
            onDelete: () => m(R),
            onToggleEnabled: (q) => g(R, q),
            onImport: b
          },
          R.id
        )) })
      ] }, v.value)),
      u.length === 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ r.jsx(Zc, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, zp = [
  { name: "{{chatHistory}}", desc: "待处理的对话历史" },
  { name: "{{context}}", desc: "角色卡设定" },
  { name: "{{char}}", desc: "角色名" },
  { name: "{{user}}", desc: "用户名" },
  { name: "{{userInput}}", desc: "当前用户输入" },
  { name: "{{worldbookContext}}", desc: "世界书激活内容" },
  { name: "{{engramSummaries}}", desc: "Engram 所有摘要（用于精简）" }
], Ap = ({
  template: u,
  llmPresets: s,
  defaultPresetId: o,
  onChange: c
}) => {
  var x, p;
  const f = [
    { value: "", label: "使用默认预设" + (o ? ` (${((x = s.find((g) => g.id === o)) == null ? void 0 : x.name) || o})` : "") },
    ...s.map((g) => ({ value: g.id, label: g.name }))
  ], m = (g) => {
    c({ ...u, ...g, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "基本信息", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "模板名称",
          value: u.name,
          onChange: (g) => m({ name: g }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: u.isBuiltIn
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "模板分类",
          value: u.category,
          onChange: (g) => m({ category: g }),
          options: Zs.map((g) => ({ value: g.value, label: g.label })),
          description: (p = Zs.find((g) => g.value === u.category)) == null ? void 0 : p.description
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "模型来源",
          value: u.boundPresetId || "",
          onChange: (g) => m({ boundPresetId: g || null }),
          options: f,
          description: "选择用于此模板的 LLM 预设"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs(_t, { title: "提示词内容", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "系统提示词",
          value: u.systemPrompt,
          onChange: (g) => m({ systemPrompt: g }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "用户提示词模板",
          value: u.userPromptTemplate,
          onChange: (g) => m({ userPromptTemplate: g }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用宏" }),
      /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: zp.map((g) => /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ r.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap", children: g.name }),
        /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground", children: g.desc })
      ] }, g.name)) })
    ] })
  ] });
}, Mp = ({
  rules: u,
  selectedId: s,
  onSelect: o,
  onToggle: c,
  onDelete: f,
  onAdd: m,
  onReset: x
}) => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: x,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: m,
          children: /* @__PURE__ */ r.jsx(P1, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1", children: [
    u.map((p) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${s === p.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => o(p.id),
        children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${p.enabled ? s === p.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (g) => {
                g.stopPropagation(), c(p.id);
              },
              title: p.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ r.jsx(Fc, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ r.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ r.jsx("h4", { className: `text-sm font-medium truncate ${s === p.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!p.enabled && "opacity-50 line-through"}`, children: p.name }) }),
            /* @__PURE__ */ r.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ r.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              p.pattern,
              "/",
              p.flags
            ] }) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: `flex items-center ${s === p.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (g) => {
                g.stopPropagation(), f(p.id);
              },
              children: /* @__PURE__ */ r.jsx(fa, { size: 12 })
            }
          ) })
        ]
      },
      p.id
    )),
    u.length === 0 && /* @__PURE__ */ r.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), L1 = [
  { value: "input", label: "输入", description: "清洗发给 LLM 的聊天内容" },
  { value: "output", label: "输出", description: "清洗 LLM 返回的内容（预览/写入前）" },
  { value: "both", label: "两者", description: "输入和输出都应用" }
], fr = [
  {
    id: "remove-think",
    name: "移除思维链",
    pattern: "<think>[\\s\\S]*?</think>",
    replacement: "",
    enabled: !0,
    flags: "gi",
    scope: "output",
    description: "移除 LLM 输出中的 <think>...</think> 思考过程"
  }
];
class lu {
  constructor(s) {
    qe(this, "rules", []);
    this.rules = s || [...fr];
  }
  /**
   * 应用所有启用的规则处理文本
   * @param text 要处理的文本
   * @param scope 可选，只应用特定作用域的规则
   */
  process(s, o) {
    let c = s;
    for (const f of this.rules)
      if (f.enabled && !(o && f.scope !== o && f.scope !== "both"))
        try {
          const m = new RegExp(f.pattern, f.flags);
          c = c.replace(m, f.replacement);
        } catch (m) {
          console.warn(`[RegexProcessor] 规则 "${f.name}" 执行失败:`, m);
        }
    return c;
  }
  /**
   * 使用指定规则处理文本（用于预览）
   */
  processWithRule(s, o) {
    try {
      const c = new RegExp(o.pattern, o.flags);
      return s.replace(c, o.replacement);
    } catch (c) {
      return console.warn("[RegexProcessor] 规则执行失败:", c), s;
    }
  }
  /**
   * 验证正则表达式是否有效
   */
  validatePattern(s, o) {
    try {
      return new RegExp(s, o), { valid: !0 };
    } catch (c) {
      return {
        valid: !1,
        error: c instanceof Error ? c.message : "无效的正则表达式"
      };
    }
  }
  /**
   * 获取所有规则
   */
  getRules() {
    return [...this.rules];
  }
  /**
   * 设置规则
   */
  setRules(s) {
    this.rules = [...s];
  }
  /**
   * 添加规则
   */
  addRule(s) {
    this.rules.push(s);
  }
  /**
   * 更新规则
   */
  updateRule(s, o) {
    const c = this.rules.findIndex((f) => f.id === s);
    c >= 0 && (this.rules[c] = { ...this.rules[c], ...o });
  }
  /**
   * 删除规则
   */
  deleteRule(s) {
    this.rules = this.rules.filter((o) => o.id !== s);
  }
  /**
   * 启用/禁用规则
   */
  toggleRule(s) {
    const o = this.rules.find((c) => c.id === s);
    o && (o.enabled = !o.enabled);
  }
  /**
   * 重置为默认规则
   */
  resetToDefaults() {
    this.rules = [...fr];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((s) => s.enabled).length;
  }
}
const Ks = new lu(), Op = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], Rp = ({ rule: u, onChange: s }) => {
  var S;
  const [o, c] = A.useState(""), [f, m] = A.useState(""), [x, p] = A.useState({ valid: !0 }), g = new lu();
  A.useEffect(() => {
    const v = g.validatePattern(u.pattern, u.flags);
    p(v);
  }, [u.pattern, u.flags]), A.useEffect(() => {
    if (o && x.valid) {
      const v = g.processWithRule(o, u);
      m(v);
    } else
      m("");
  }, [o, u, x.valid]);
  const b = (v) => {
    const R = u.flags.split(""), q = R.indexOf(v);
    q >= 0 ? R.splice(q, 1) : R.push(v), s({ flags: R.join("") });
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "规则名称" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: u.name,
            onChange: (v) => s({ name: v.target.value }),
            placeholder: "例如：移除思维链"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "描述（可选）" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: u.description || "",
            onChange: (v) => s({ description: v.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: L1.map((v) => /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${u.scope === v.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => s({ scope: v.value }),
            title: v.description,
            children: v.label
          },
          v.value
        )) }),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground", children: (S = L1.find((v) => v.value === u.scope)) == null ? void 0 : S.description })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          x.valid ? /* @__PURE__ */ r.jsx(Xc, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ r.jsx(Ws, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${x.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: u.pattern,
            onChange: (v) => s({ pattern: v.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !x.valid && x.error && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-red-500", children: x.error })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: u.replacement,
            onChange: (v) => s({ replacement: v.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-wrap gap-2", children: Op.map((v) => /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${u.flags.includes(v.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => b(v.value),
            title: v.description,
            children: [
              v.label,
              " (",
              v.value,
              ")"
            ]
          },
          v.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ r.jsx(Jc, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ r.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: o,
            onChange: (v) => c(v.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      o && x.valid && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ r.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: f || /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ r.jsx(F4, { size: 16, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsx("strong", { children: "输入" }),
        "：清洗发给 LLM 的聊天内容。",
        /* @__PURE__ */ r.jsx("strong", { children: "输出" }),
        "：清洗 LLM 返回的内容（如移除 ",
        /* @__PURE__ */ r.jsx("code", { className: "bg-blue-500/20 px-1 rounded", children: "<think>" }),
        "）。"
      ] })
    ] })
  ] });
}, Dp = ({
  config: u,
  onChange: s,
  worldbookStructure: o = {},
  disabledEntries: c = {},
  onToggleWorldbook: f,
  onToggleEntry: m,
  onRefresh: x
}) => {
  const [p, g] = A.useState(/* @__PURE__ */ new Set()), [b, S] = A.useState(""), v = ($) => {
    s({
      ...u,
      [$]: !u[$]
    });
  }, R = ($) => {
    const W = new Set(p);
    W.has($) ? W.delete($) : W.add($), g(W);
  }, q = ($) => {
    var W;
    return ((W = u.disabledWorldbooks) == null ? void 0 : W.includes($)) || !1;
  }, _ = ($, W) => {
    var P;
    return ((P = c[$]) == null ? void 0 : P.includes(W)) || !1;
  }, K = Object.keys(o).sort().filter(
    ($) => $.toLowerCase().includes(b.toLowerCase()) || o[$].some(
      (W) => {
        var P, xe;
        return ((P = W.names) == null ? void 0 : P.join(" ").toLowerCase().includes(b.toLowerCase())) || ((xe = W.comment) == null ? void 0 : xe.toLowerCase().includes(b.toLowerCase()));
      }
    )
  );
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "基础设置", description: "控制世界书功能的全局开关", children: [
      /* @__PURE__ */ r.jsx(
        $n,
        {
          label: "启用世界书增强",
          description: "是否在生成摘要时注入世界书内容",
          checked: u.enabled,
          onChange: () => v("enabled")
        }
      ),
      /* @__PURE__ */ r.jsx(
        $n,
        {
          label: "包含全局世界书",
          description: "是否引入全局世界书（相当于 全选/全不选 全局世界书）",
          checked: u.includeGlobal,
          onChange: () => v("includeGlobal"),
          disabled: !u.enabled
        }
      )
    ] }),
    u.enabled && /* @__PURE__ */ r.jsxs(_t, { title: "世界书管理", description: "精细控制每个世界书及其条目的启用状态", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mb-4 gap-4", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ r.jsx(oa, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索世界书或条目...",
              className: "w-full h-9 pl-9 pr-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              value: b,
              onChange: ($) => S($.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: x,
            className: "inline-flex items-center justify-center rounded-md w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors",
            title: "刷新列表",
            children: /* @__PURE__ */ r.jsx(Zt, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-2", children: K.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border border-dashed rounded-lg", children: [
        /* @__PURE__ */ r.jsx(Ws, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ r.jsx("span", { className: "text-sm", children: "未找到匹配的世界书" })
      ] }) : K.map(($) => {
        const W = q($), P = o[$] || [], xe = p.has($), te = P.filter((X) => !_($, X.uid)).length;
        return /* @__PURE__ */ r.jsxs("div", { className: `border rounded-lg transition-all ${W ? "bg-muted/30 border-muted" : "bg-card border-border"}`, children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 flex-1 overflow-hidden", children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  onClick: () => R($),
                  className: "p-1 hover:bg-accent rounded-sm transition-colors",
                  children: xe ? /* @__PURE__ */ r.jsx(ca, { size: 16 }) : /* @__PURE__ */ r.jsx(Vc, { size: 16 })
                }
              ),
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ r.jsx(b4, { size: 16, className: W ? "text-muted-foreground" : "text-primary" }),
                /* @__PURE__ */ r.jsx("span", { className: `font-medium truncate ${W ? "text-muted-foreground line-through" : ""}`, children: $ }),
                /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full whitespace-nowrap", children: [
                  te,
                  " / ",
                  P.length,
                  " 激活"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ r.jsx(
              $n,
              {
                label: "",
                checked: !W,
                onChange: (X) => f == null ? void 0 : f($, !X),
                compact: !0
              }
            ) })
          ] }),
          xe && !W && /* @__PURE__ */ r.jsx("div", { className: "border-t bg-accent/5 p-3 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200", children: P.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground text-center py-2", children: "暂无条目" }) : P.map((X) => {
            const Y = _($, X.uid);
            return /* @__PURE__ */ r.jsxs("div", { className: "flex items-start justify-between p-2 rounded hover:bg-accent/50 transition-colors group", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1 min-w-0 flex-1 pr-4", children: [
                /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ r.jsx(
                    "div",
                    {
                      className: `w-2 h-2 rounded-full flex-shrink-0 ${X.constant ? "bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]" : "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]"}`,
                      title: X.constant ? "常驻 (Constant)" : "条件触发 (Selective)"
                    }
                  ),
                  /* @__PURE__ */ r.jsx("span", { className: `text-sm font-medium ${Y ? "text-muted-foreground line-through" : "text-foreground"}`, children: X.name || `条目 #${X.uid}` }),
                  (X.keys || []).length > 0 && /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-1 ml-2", children: X.keys.map((ce, Se) => /* @__PURE__ */ r.jsx("span", { className: "text-[10px] px-1 py-0.5 rounded border bg-muted/30 text-muted-foreground border-transparent", children: ce }, Se)) })
                ] }),
                (X.comment || X.content) && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground truncate pl-4", children: X.comment || X.content })
              ] }),
              /* @__PURE__ */ r.jsx(
                $n,
                {
                  label: "",
                  checked: !Y,
                  onChange: (ce) => m == null ? void 0 : m($, X.uid, !ce),
                  compact: !0
                }
              )
            ] }, X.uid);
          }) })
        ] }, $);
      }) })
    ] })
  ] });
};
async function B1(u) {
  try {
    const s = window.SillyTavern;
    if (s != null && s.getContext) {
      const o = s.getContext();
      if (o != null && o.getTokenCountAsync)
        return await o.getTokenCountAsync(u);
    }
    return Math.ceil(u.length / 4);
  } catch {
    return console.warn("[Engram] WorldInfoService: 无法使用酒馆 Token 计数，使用估算"), Math.ceil(u.length / 4);
  }
}
function gt() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
const dr = "engram总结";
class Ce {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(s) {
    return B1(s);
  }
  /**
   * 计算特定世界书中所有 Engram 总结条目的 Token 总和
   * 仅计算已启用的条目，使用关键词筛选
   * @param worldbookName 世界书名称
   */
  static async countSummaryTokens(s) {
    const c = (await this.getEntries(s)).filter(
      (x) => x.enabled && x.keys.includes(dr)
    );
    if (c.length === 0) return 0;
    const f = c.map((x) => x.content);
    return (await Promise.all(f.map((x) => this.countTokens(x)))).reduce((x, p) => x + p, 0);
  }
  /**
   * 获取当前角色的所有 Engram 摘要内容（用于 {{engramSummaries}} 宏）
   * 返回格式化后的摘要文本，供精简功能使用
   */
  static async getEngramSummariesContent() {
    const s = this.findExistingWorldbook();
    if (!s)
      return "";
    const c = (await this.getEntries(s)).filter((m) => m.keys.includes(dr));
    return c.length === 0 ? "" : (c.sort((m, x) => m.order - x.order), c.map((m) => {
      const x = m.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
      return `【${m.name}】
${x}`;
    }).join(`

---

`));
  }
  /**
   * 批量计算多段文本的 Token 数量
   * @param texts 文本数组
   */
  static async countTokensBatch(s) {
    return Promise.all(s.map((o) => B1(o)));
  }
  /**
   * 查找已绑定的 Engram 世界书（不创建）
   * 用于面板显示等只读场景
   */
  static findExistingWorldbook() {
    try {
      const s = gt();
      if (!(s != null && s.getCharWorldbookNames))
        return null;
      const o = s.getCharWorldbookNames("current");
      return o && [...o.additional || [], o.primary].filter(Boolean).find((m) => m == null ? void 0 : m.startsWith("[Engram]")) || null;
    } catch {
      return null;
    }
  }
  /**
   * 获取或创建当前角色的 Engram 世界书
   * 如果不存在则创建并绑定到角色
   * **仅在需要写入时调用**
   * 
   * 学习自 the_world 插件的成功实现：
   * 1. TavernHelper.createWorldbook() 创建世界书
   * 2. TavernHelper.getCharWorldbookNames() 获取角色世界书配置
   * 3. TavernHelper.rebindCharWorldbooks() 绑定到角色
   */
  static async getOrCreateWorldbook() {
    var s, o;
    try {
      const c = this.findExistingWorldbook();
      if (c)
        return console.debug("[Engram] WorldInfoService: 使用已绑定的世界书", c), c;
      const f = gt();
      if (!f)
        return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), null;
      const m = (o = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : o.call(s);
      if (!(m != null && m.name2) || m.name2 === "SillyTavern System")
        return console.warn("[Engram] WorldInfoService: 无效的角色上下文"), null;
      const x = m.name2, p = `[Engram] ${x}`;
      if (console.debug("[Engram] WorldInfoService: 创建新世界书", p), f.createWorldbook)
        await f.createWorldbook(p);
      else
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用"), null;
      if (f.getCharWorldbookNames && f.rebindCharWorldbooks) {
        const g = f.getCharWorldbookNames("current");
        g && (g.additional.push(p), await f.rebindCharWorldbooks("current", g), console.info("[Engram] WorldInfoService: 世界书已绑定到角色", {
          character: x,
          worldbook: p
        }));
      }
      return p;
    } catch (c) {
      return console.error("[Engram] WorldInfoService: 获取/创建世界书失败", c), null;
    }
  }
  /**
   * @deprecated 使用 getOrCreateWorldbook() 替代
   */
  static async getChatWorldbook() {
    return this.getOrCreateWorldbook();
  }
  /**
   * 获取世界书的所有条目
   * @param worldbookName 世界书名称
   */
  static async getEntries(s) {
    const o = gt();
    if (!(o != null && o.getWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), [];
    try {
      return (await o.getWorldbook(s)).map((f) => {
        const m = f, x = m.strategy, p = m.position, g = m.recursion, b = [];
        if (x != null && x.keys && Array.isArray(x.keys))
          for (const S of x.keys)
            typeof S == "string" ? b.push(S) : S && typeof S == "object" && "source" in S && b.push(S.source);
        return {
          uid: m.uid || 0,
          name: m.name || "",
          content: m.content || "",
          enabled: m.enabled ?? !0,
          constant: (x == null ? void 0 : x.type) === "constant",
          keys: b,
          position: (p == null ? void 0 : p.type) || "before_character_definition",
          depth: (p == null ? void 0 : p.depth) || 0,
          order: (p == null ? void 0 : p.order) || 100,
          recursion: g ? {
            prevent_incoming: g.prevent_incoming,
            prevent_outgoing: g.prevent_outgoing
          } : void 0,
          comment: m.comment || "",
          extra: m.extra || void 0
        };
      });
    } catch (c) {
      return console.error("[Engram] WorldInfoService: 获取世界书条目失败", c), [];
    }
  }
  /**
   * 获取所有世界书名称
   */
  static async getWorldbookNames() {
    const s = gt();
    try {
      return s != null && s.getWorldbookNames ? s.getWorldbookNames() : [];
    } catch (o) {
      return console.error("[Engram] WorldInfoService: 获取世界书列表失败", o), [];
    }
  }
  /**
   * 删除世界书
   * @param worldbookName 世界书名称
   */
  static async deleteWorldbook(s) {
    const o = gt();
    if (!(o != null && o.deleteWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbook 不可用"), !1;
    try {
      const c = await o.deleteWorldbook(s);
      return c && console.info("[Engram] WorldInfoService: 已删除世界书", s), c;
    } catch (c) {
      return console.error("[Engram] WorldInfoService: 删除世界书失败", c), !1;
    }
  }
  /**
   * 创建新的世界书条目
   * 使用 TavernHelper API（与 the_world 插件保持一致）
   * @param worldbookName 世界书名称
   * @param params 条目参数
   */
  static async createEntry(s, o) {
    try {
      const c = gt();
      if (!(c != null && c.createWorldbookEntries))
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbookEntries 不可用"), !1;
      const f = {
        name: o.name,
        content: o.content,
        comment: o.name,
        // 用作备注
        disable: !(o.enabled ?? !0),
        // TavernHelper 使用 disable 字段
        strategy: {
          type: o.constant ? "constant" : "selective",
          keys: o.keys || []
        },
        position: {
          type: o.position || "before_character_definition",
          order: o.order ?? 100,
          depth: o.depth ?? 4
        },
        recursion: o.recursion,
        // 添加 Engram 身份标识
        extra: {
          engram: !0
        }
      };
      return console.debug("[Engram] WorldInfoService: 创建条目", {
        worldbook: s,
        name: o.name,
        contentLength: o.content.length
      }), await c.createWorldbookEntries(s, [f]), console.info("[Engram] WorldInfoService: 条目已保存到世界书", s), !0;
    } catch (c) {
      return console.error("[Engram] WorldInfoService: 创建世界书条目失败", c), !1;
    }
  }
  /**
   * 更新世界书条目
   * @param worldbookName 世界书名称
   * @param uid 条目 UID
   * @param updates 更新内容
   */
  /**
   * 更新世界书条目
   * 使用 updateWorldbookWith 进行原地更新，避免创建重复条目
   * @param worldbookName 世界书名称
   * @param uid 条目 UID
   * @param updates 更新内容
   */
  static async updateEntry(s, o, c) {
    const f = gt();
    if (!(f != null && f.updateWorldbookWith))
      return console.warn("[Engram] WorldInfoService: TavernHelper.updateWorldbookWith 不可用"), !1;
    try {
      return await f.updateWorldbookWith(s, (m) => {
        var p;
        const x = m.findIndex((g) => g.uid === o);
        if (x !== -1) {
          const g = m[x];
          let b = g.disable;
          "enabled" in c && (b = !c.enabled);
          let S = g.strategy || { type: "selective", keys: [] };
          if ("constant" in c || "keys" in c) {
            const q = c.constant !== void 0 ? c.constant : S.type === "constant", _ = c.keys !== void 0 ? c.keys : S.keys || [];
            S = {
              ...S,
              type: q ? "constant" : "selective",
              keys: _
            };
          }
          let v = g.position || { type: "before_character_definition", order: 0, depth: 0 };
          (c.position || typeof c.order == "number" || typeof c.depth == "number") && (v = {
            ...v,
            type: (typeof c.position == "string" ? c.position : (p = c.position) == null ? void 0 : p.type) || v.type,
            order: c.order ?? v.order,
            depth: c.depth ?? v.depth
          });
          let R = g.recursion;
          c.recursion && (R = c.recursion), m[x] = {
            ...g,
            name: c.name ?? g.name,
            content: c.content ?? g.content,
            comment: c.name ?? g.comment,
            // 同步更新备注
            disable: b,
            strategy: S,
            position: v,
            recursion: R
          }, console.debug("[Engram] WorldInfoService: 条目已更新 (In-Place)", { uid: o, name: m[x].name });
        } else
          console.warn("[Engram] WorldInfoService: updateEntry 未找到条目", o);
        return m;
      }), !0;
    } catch (m) {
      return console.error("[Engram] WorldInfoService: 更新世界书条目失败", m), !1;
    }
  }
  /**
   * 删除指定的世界书条目
   * @param worldbookName 世界书名称
   * @param uid 条目 UID
   */
  static async deleteEntry(s, o) {
    const c = gt();
    if (!(c != null && c.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      return await c.deleteWorldbookEntries(s, (f) => f.uid === o), console.debug("[Engram] WorldInfoService: 已删除条目", { worldbook: s, uid: o }), !0;
    } catch (f) {
      return console.error("[Engram] WorldInfoService: 删除世界书条目失败", f), !1;
    }
  }
  /**
   * 批量删除世界书条目
   * @param worldbookName 世界书名称
   * @param uids 条目 UID 数组
   */
  static async deleteEntries(s, o) {
    const c = gt();
    if (!(c != null && c.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      const f = new Set(o);
      return await c.deleteWorldbookEntries(s, (m) => f.has(m.uid)), console.debug("[Engram] WorldInfoService: 已批量删除条目", { worldbook: s, count: o.length }), !0;
    } catch (f) {
      return console.error("[Engram] WorldInfoService: 批量删除世界书条目失败", f), !1;
    }
  }
  /**
   * 获取所有 Engram 摘要条目（按 order 排序）
   * 使用关键词筛选，用于精简模块选取待合并的条目
   * @param worldbookName 世界书名称
   */
  static async getSummaryEntries(s) {
    const c = (await this.getEntries(s)).filter((f) => f.keys.includes(dr));
    return c.sort((f, m) => f.order - m.order), c;
  }
  /**
   * 从条目名称解析楼层范围
   * @param entryName 条目名称，如 "剧情摘要_1-10"
   * @returns [startFloor, endFloor] 或 null
   */
  static parseFloorRangeFromName(s) {
    const o = s.match(/剧情摘要_(\d+)-(\d+)/);
    return o ? [parseInt(o[1], 10), parseInt(o[2], 10)] : null;
  }
  /**
   * 确保分隔条目存在
   * 8999: 总结开始 <summary>
   * 10000: 总结结束 </summary>
   */
  static async ensureSeparatorEntries(s) {
    await this.findEntryByKey(s, "总结开始") || await this.createEntry(s, {
      name: "总结开始",
      content: "<summary>",
      keys: ["总结开始"],
      constant: !0,
      order: 8999,
      enabled: !0,
      position: "before_character_definition"
    }), await this.findEntryByKey(s, "总结结束") || await this.createEntry(s, {
      name: "总结结束",
      content: "</summary>",
      keys: ["总结结束"],
      constant: !0,
      order: 1e4,
      enabled: !0,
      position: "before_character_definition"
    });
  }
  /**
   * 获取下一个可用的总结条目顺序号
   * 起始 9000，递增
   */
  static async getNextSummaryOrder(s) {
    const c = (await this.getEntries(s)).map((m) => m.order).filter((m) => m >= 9e3 && m < 1e4);
    return c.length === 0 ? 9e3 : Math.max(...c) + 1;
  }
  /**
   * 根据 Key 或名称查找条目
   * @param worldbookName 世界书名称
   * @param key 关键词
   */
  static async findEntryByKey(s, o) {
    const c = await this.getEntries(s);
    let f = c.find((m) => m.keys.includes(o));
    return f || (f = c.find((m) => m.name === o || o === "__ENGRAM_STATE__" && m.name === "Engram System State")), f || null;
  }
  /**
   * 获取世界书的 Token 统计
   * @param worldbookName 世界书名称
   */
  static async getWorldbookTokenStats(s) {
    const o = await this.getEntries(s), c = await Promise.all(
      o.map(async (m) => ({
        name: m.name,
        tokens: await this.countTokens(m.content)
      }))
    );
    return {
      totalTokens: c.reduce((m, x) => m + x.tokens, 0),
      entryCount: o.length,
      entries: c
    };
  }
  /**
   * 检查 WorldInfoService 是否可用
   */
  static isAvailable() {
    return gt() !== null;
  }
  /**
   * 检查 Token 计数是否使用酒馆原生 API
   */
  static async isNativeTokenCountAvailable() {
    try {
      const s = window.SillyTavern;
      if (s != null && s.getContext) {
        const o = s.getContext();
        return typeof (o == null ? void 0 : o.getTokenCountAsync) == "function";
      }
      return !1;
    } catch {
      return !1;
    }
  }
  /**
   * 获取所有激活的世界书条目内容（用于总结）
   * 使用酒馆原生 getWorldInfoPrompt 进行扫描，获取所有激活的条目
   * 支持：蓝灯（常驻）+ 绿灯（关键词触发）
   * 
   * @param chatMessages 可选，用于关键词扫描的聊天消息
   * @returns 格式化后的世界书内容字符串
   */
  static async getActivatedWorldInfo(s) {
    var c, f, m;
    const { Logger: o } = await Promise.resolve().then(() => nu);
    try {
      const p = await new Function("path", "return import(path)")("/scripts/world-info.js"), g = p == null ? void 0 : p.getWorldInfoPrompt, b = p == null ? void 0 : p.getSortedEntries;
      if (typeof b == "function") {
        const Y = await b(), ce = [...new Set((Y == null ? void 0 : Y.map((he) => he.world)) || [])], Se = ((c = Y == null ? void 0 : Y.filter((he) => he.constant)) == null ? void 0 : c.length) || 0;
        o.info("WorldInfo", "getSortedEntries 诊断", {
          totalEntries: (Y == null ? void 0 : Y.length) || 0,
          worlds: ce,
          constantCount: Se,
          sampleEntry: Y != null && Y[0] ? {
            name: Y[0].name,
            world: Y[0].world,
            constant: Y[0].constant
          } : null
        });
      }
      if (typeof g != "function")
        return o.warn("WorldInfo", "getWorldInfoPrompt 不可用，回退到常驻条目"), this.getConstantWorldInfo();
      let S = s;
      if (!S || S.length === 0) {
        const Y = (m = (f = window.SillyTavern) == null ? void 0 : f.getContext) == null ? void 0 : m.call(f);
        Y != null && Y.chat && Array.isArray(Y.chat) && (S = Y.chat.map((ce) => ce.mes || "").reverse());
      }
      if (!S || S.length === 0)
        return o.warn("WorldInfo", "无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      o.debug("WorldInfo", "调用 getWorldInfoPrompt", {
        messageCount: S.length
      });
      const v = 1e6, R = p == null ? void 0 : p.checkWorldInfo;
      if (typeof R != "function")
        return o.error("WorldInfo", "checkWorldInfo 不可用"), this.getConstantWorldInfo();
      const q = await R(S, v, !0, {
        trigger: "normal"
      }), _ = q == null ? void 0 : q.allActivatedEntries, G = _ ? Array.from(_.values()) : [];
      o.info("WorldInfo", `扫描完成，共激活 ${G.length} 个条目`);
      const K = await this.loadFilteringState(), { disabledGlobalBooks: $, disabledEntries: W, globalWorldbooks: P, config: xe } = K, te = G.filter(
        (Y) => this.shouldIncludeEntry(Y, P, $, W, xe)
      );
      return o.info("WorldInfo", "筛选结果", {
        total: G.length,
        kept: te.length,
        filteredOut: G.length - te.length,
        keptWorlds: [...new Set(te.map((Y) => Y.world))]
      }), te.sort((Y, ce) => (Y.order || 0) - (ce.order || 0)), te.map((Y) => Y.content).filter(Boolean).join(`

`);
    } catch (x) {
      return o.error("WorldInfo", "获取激活世界书失败", x), this.getConstantWorldInfo();
    }
  }
  /**
   * 加载过滤所需的所有状态配置
   * @private
   */
  static async loadFilteringState() {
    var S, v, R;
    const s = gt(), o = ((S = s == null ? void 0 : s.getGlobalWorldbookNames) == null ? void 0 : S.call(s)) || [], { SettingsManager: c } = await Promise.resolve().then(() => im), m = (v = c.getSettings().apiSettings) == null ? void 0 : v.worldbookConfig, x = (m == null ? void 0 : m.disabledWorldbooks) || [], { WorldBookStateService: p } = await Promise.resolve().then(() => mm), g = (R = s == null ? void 0 : s.getCharWorldbookNames) == null ? void 0 : R.call(s, "current");
    let b = {};
    return g != null && g.primary && (b = (await p.loadState(g.primary)).disabledEntries || {}), {
      globalWorldbooks: o,
      disabledGlobalBooks: x,
      disabledEntries: b,
      config: m
    };
  }
  /**
   * 判断单个条目是否应该被包含
   * @private
   */
  static shouldIncludeEntry(s, o, c, f, m) {
    var x, p, g, b;
    if (((x = s.extra) == null ? void 0 : x.engram) === !0 || (p = s.world) != null && p.startsWith("[Engram]")) return !0;
    if (s.world && o.includes(s.world) && ((m == null ? void 0 : m.includeGlobal) === !1 || c.includes(s.world)))
      return !1;
    if (s.world && s.uid) {
      const S = f[s.world];
      if (S && S.includes(s.uid))
        return !1;
    }
    return !((g = s.world) != null && g.startsWith("格式") || (b = s.world) != null && b.startsWith("---"));
  }
  /**
   * 获取世界书结构（用于 UI 展示）
   * 返回所有世界书及其包含的条目摘要
   */
  static async getWorldbookStructure() {
    var x;
    const s = gt();
    if (!s) return {};
    const o = ((x = s.getGlobalWorldbookNames) == null ? void 0 : x.call(s)) || [];
    let c = [];
    if (s.getCharWorldbookNames) {
      const p = s.getCharWorldbookNames("current");
      p && (c = [...p.additional || [], p.primary].filter(Boolean));
    }
    const f = Array.from(/* @__PURE__ */ new Set([...o, ...c])).sort(), m = {};
    for (const p of f)
      try {
        const g = await this.getEntries(p);
        m[p] = g.map((b) => {
          var S;
          return {
            uid: b.uid,
            name: b.name,
            // 传递真实名称
            keys: b.keys,
            constant: b.constant,
            // 传递常驻状态
            comment: b.comment || "",
            content: ((S = b.content) == null ? void 0 : S.substring(0, 50)) + "..."
            // 预览内容
          };
        });
      } catch (g) {
        console.warn(`[Engram] WorldInfoService: 读取世界书 ${p} 失败`, g), m[p] = [];
      }
    return m;
  }
  /**
   * 获取常驻激活的世界书条目（蓝灯）
   * 作为 getActivatedWorldInfo 的回退方案
   */
  static async getConstantWorldInfo() {
    try {
      const o = await new Function("path", "return import(path)")("/scripts/world-info.js"), c = o == null ? void 0 : o.getSortedEntries;
      if (typeof c != "function")
        return "";
      const f = await c();
      if (!f || !Array.isArray(f))
        return "";
      const m = f.filter((x) => x.constant === !0 && x.disable !== !0 && x.content);
      return m.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${m.length} 个常驻条目`), m.map((x) => x.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const fm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUMMARY_ENTRY_KEY: dr,
  WorldInfoService: Ce,
  getTavernHelper: gt
}, Symbol.toStringTag, { value: "Module" })), aa = "__ENGRAM_STATE__", Bs = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  updatedAt: Date.now()
};
class xl {
  /**
   * 加载状态
   */
  static async loadState(s) {
    try {
      const o = await Ce.findEntryByKey(s, aa);
      if (!o)
        return { ...Bs };
      try {
        const c = JSON.parse(o.content);
        return { ...Bs, ...c };
      } catch (c) {
        return ae.warn("WorldBookStateService", "状态条目解析失败，重置状态", c), { ...Bs };
      }
    } catch (o) {
      return ae.error("WorldBookStateService", "加载状态失败", o), { ...Bs };
    }
  }
  /**
   * 保存状态
   */
  static async saveState(s, o) {
    try {
      const f = {
        ...await this.loadState(s),
        ...o,
        updatedAt: Date.now()
      }, m = JSON.stringify(f, null, 2), p = (await Ce.getEntries(s)).filter(
        (g) => g.name === "Engram System State" || g.keys.includes(aa)
      );
      if (p.length > 0) {
        p.sort((v, R) => {
          const q = v.keys.includes(aa) ? 1 : 0;
          return (R.keys.includes(aa) ? 1 : 0) - q;
        });
        const [g, ...b] = p;
        if (b.length > 0) {
          ae.warn("WorldBookStateService", `发现 ${b.length} 个重复的状态条目，正在清理...`);
          for (const v of b)
            await Ce.deleteEntry(s, v.uid);
        }
        ae.debug("WorldBookStateService", "更新并修复状态条目", { uid: g.uid, state: f });
        const S = {
          content: m,
          name: "Engram System State",
          enabled: !1,
          constant: !1,
          keys: [aa],
          recursion: {
            prevent_incoming: !0,
            prevent_outgoing: !0
          },
          position: "before_character_definition",
          order: 0
        };
        return await Ce.updateEntry(s, g.uid, S);
      } else {
        ae.debug("WorldBookStateService", "创建状态条目", { state: f });
        const g = {
          name: "Engram System State",
          content: m,
          keys: [aa],
          enabled: !1,
          constant: !1,
          position: "before_character_definition",
          role: "system",
          order: 0,
          recursion: {
            prevent_incoming: !0,
            prevent_outgoing: !0
          }
        };
        return await Ce.createEntry(s, g);
      }
    } catch (c) {
      return ae.error("WorldBookStateService", "保存状态失败", c), !1;
    }
  }
}
const mm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldBookStateService: xl
}, Symbol.toStringTag, { value: "Module" }));
function Up() {
  const [u, s] = A.useState(U1), [o, c] = A.useState(null), [f, m] = A.useState(null), [x, p] = A.useState(!1), [g, b] = A.useState([...fr]), [S, v] = A.useState(null), [R, q] = A.useState({}), [_, G] = A.useState({}), [K, $] = A.useState(null), W = A.useCallback(async () => {
    var oe;
    const M = await Ce.getWorldbookStructure();
    q(M);
    const H = gt(), Q = (oe = H == null ? void 0 : H.getCharWorldbookNames) == null ? void 0 : oe.call(H, "current");
    if (Q != null && Q.primary) {
      $(Q.primary);
      const Re = await xl.loadState(Q.primary);
      Re.disabledEntries && G(Re.disabledEntries);
    }
  }, []);
  A.useEffect(() => {
    W();
  }, [W]), A.useEffect(() => {
    var Q;
    const M = Le.get("apiSettings");
    if (M) {
      const oe = U1(), Re = {
        ...oe,
        ...M,
        // 合并预设：保留用户预设，确保至少有一个默认
        llmPresets: ((Q = M.llmPresets) == null ? void 0 : Q.length) > 0 ? M.llmPresets : oe.llmPresets,
        // 合并模板：内置模板 + 用户自定义模板
        promptTemplates: [
          ...oe.promptTemplates.filter((we) => we.isBuiltIn),
          ...(M.promptTemplates || []).filter((we) => !we.isBuiltIn)
        ]
      };
      s(Re);
    }
    const H = Le.getRegexRules();
    H && H.length > 0 && b(H);
  }, []);
  const P = A.useCallback((M) => {
    s((H) => ({ ...H, selectedPresetId: M.id })), c(M);
  }, []), xe = A.useCallback(() => {
    const M = dm(`预设 ${u.llmPresets.length + 1}`);
    M.isDefault = !1, s((H) => ({
      ...H,
      llmPresets: [...H.llmPresets, M],
      selectedPresetId: M.id
    })), c(M), p(!0);
  }, [u.llmPresets.length]), te = A.useCallback((M) => {
    s((H) => ({
      ...H,
      llmPresets: H.llmPresets.map((Q) => Q.id === M.id ? M : Q)
    })), c(M), p(!0);
  }, []), X = A.useCallback((M) => {
    const H = {
      ...M,
      id: `preset_${Date.now()}`,
      name: `${M.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((Q) => ({ ...Q, llmPresets: [...Q.llmPresets, H] })), p(!0);
  }, []), Y = A.useCallback((M) => {
    M.isDefault || (s((H) => ({
      ...H,
      llmPresets: H.llmPresets.filter((Q) => Q.id !== M.id),
      selectedPresetId: H.selectedPresetId === M.id ? null : H.selectedPresetId
    })), c((H) => (H == null ? void 0 : H.id) === M.id ? null : H), p(!0));
  }, []), ce = A.useCallback((M) => {
    m(M);
  }, []), Se = A.useCallback((M) => {
    s((H) => ({
      ...H,
      promptTemplates: [...H.promptTemplates, M]
    })), p(!0);
  }, []), he = A.useCallback((M) => {
    s((H) => ({
      ...H,
      promptTemplates: H.promptTemplates.map((Q) => Q.id === M.id ? M : Q)
    })), m(M), p(!0);
  }, []), U = A.useCallback((M) => {
    M.isBuiltIn || (s((H) => ({
      ...H,
      promptTemplates: H.promptTemplates.filter((Q) => Q.id !== M.id)
    })), m((H) => (H == null ? void 0 : H.id) === M.id ? null : H), p(!0));
  }, []), ee = A.useCallback((M) => {
    s((H) => ({ ...H, vectorConfig: M })), p(!0);
  }, []), de = A.useCallback((M) => {
    s((H) => ({ ...H, rerankConfig: M })), p(!0);
  }, []), Ne = A.useCallback((M) => {
    s((H) => ({ ...H, worldbookConfig: M })), p(!0);
  }, []), se = A.useCallback((M, H) => {
    s((Q) => {
      const oe = Q.worldbookConfig.disabledWorldbooks || [];
      let Re;
      return H ? Re = [.../* @__PURE__ */ new Set([...oe, M])] : Re = oe.filter((we) => we !== M), {
        ...Q,
        worldbookConfig: {
          ...Q.worldbookConfig,
          disabledWorldbooks: Re
        }
      };
    }), p(!0);
  }, []), z = A.useCallback((M, H, Q) => {
    G((oe) => {
      const Re = oe[M] || [];
      let we;
      return Q ? we = [.../* @__PURE__ */ new Set([...Re, H])] : we = Re.filter((Qn) => Qn !== H), {
        ...oe,
        [M]: we
      };
    }), p(!0);
  }, []), V = A.useCallback((M) => {
    const H = g.find((Q) => Q.id === M);
    v(H || null);
  }, [g]), ne = A.useCallback(() => {
    const M = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    b((H) => [...H, M]), v(M), p(!0);
  }, []), ie = A.useCallback((M) => {
    if (!S) return;
    const H = { ...S, ...M };
    v(H), b((Q) => Q.map((oe) => oe.id === H.id ? H : oe)), p(!0);
  }, [S]), je = A.useCallback((M) => {
    b((H) => H.map(
      (Q) => Q.id === M ? { ...Q, enabled: !Q.enabled } : Q
    )), p(!0);
  }, []), C = A.useCallback((M) => {
    b((H) => H.filter((Q) => Q.id !== M)), v((H) => (H == null ? void 0 : H.id) === M ? null : H), p(!0);
  }, []), L = A.useCallback(() => {
    b([...fr]), v(null), p(!0);
  }, []), Z = A.useCallback(async () => {
    Le.set("apiSettings", u), Le.setRegexRules(g), K && await xl.saveState(K, {
      disabledEntries: _
    }), console.log("[Engram] 保存配置:", u, g, _), p(!1);
  }, [u, g, K, _]);
  return {
    settings: u,
    editingPreset: o,
    editingTemplate: f,
    hasChanges: x,
    regexRules: g,
    editingRule: S,
    selectPreset: P,
    addPreset: xe,
    updatePreset: te,
    copyPreset: X,
    deletePreset: Y,
    selectTemplate: ce,
    addTemplate: Se,
    updateTemplate: he,
    deleteTemplate: U,
    updateVectorConfig: ee,
    updateRerankConfig: de,
    updateWorldbookConfig: Ne,
    toggleWorldbook: se,
    toggleEntry: z,
    refreshWorldbooks: W,
    worldbookStructure: R,
    disabledEntries: _,
    currentCharWorldbook: K,
    selectRule: V,
    addRule: ne,
    updateRule: ie,
    toggleRule: je,
    deleteRule: C,
    resetRules: L,
    save: Z
  };
}
const Lp = [
  { id: "llm", label: "LLM 预设", icon: Kc },
  { id: "vector", label: "向量化", icon: Qc },
  { id: "rerank", label: "Rerank", icon: F1 }
], Bp = ({ initialTab: u }) => {
  const [s, o] = A.useState(u || "model"), [c, f] = A.useState("llm"), {
    settings: m,
    editingPreset: x,
    editingTemplate: p,
    hasChanges: g,
    regexRules: b,
    editingRule: S,
    selectPreset: v,
    addPreset: R,
    updatePreset: q,
    copyPreset: _,
    deletePreset: G,
    selectTemplate: K,
    addTemplate: $,
    updateTemplate: W,
    deleteTemplate: P,
    updateVectorConfig: xe,
    updateRerankConfig: te,
    updateWorldbookConfig: X,
    selectRule: Y,
    addRule: ce,
    updateRule: Se,
    toggleRule: he,
    deleteRule: U,
    resetRules: ee,
    save: de,
    // Worldbook filtering
    worldbookStructure: Ne,
    disabledEntries: se,
    toggleWorldbook: z,
    toggleEntry: V,
    refreshWorldbooks: ne
  } = Up();
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ r.jsx(
      Ps,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则"
      }
    ),
    /* @__PURE__ */ r.jsx(
      qc,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: s,
        onChange: (ie) => o(ie),
        actions: g && /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors",
            onClick: de,
            children: [
              /* @__PURE__ */ r.jsx(jg, { size: 12 }),
              "保存"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "model" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ r.jsx(
          qc,
          {
            tabs: Lp.map((ie) => ({ ...ie, icon: /* @__PURE__ */ r.jsx(ie.icon, { size: 14 }) })),
            activeTab: c,
            onChange: (ie) => f(ie),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        c === "llm" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ r.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: R, children: /* @__PURE__ */ r.jsx(Wc, { size: 16 }) })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: m.llmPresets.map((ie) => /* @__PURE__ */ r.jsx(
              ip,
              {
                preset: ie,
                isSelected: m.selectedPresetId === ie.id,
                onSelect: () => v(ie),
                onEdit: () => v(ie),
                onCopy: () => _(ie),
                onDelete: () => G(ie)
              },
              ie.id
            )) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: "flex flex-col", children: x ? /* @__PURE__ */ r.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ r.jsx(dp, { preset: x, onChange: q }) }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ r.jsx(Kc, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        c === "vector" && /* @__PURE__ */ r.jsx(mp, { config: m.vectorConfig, onChange: xe }),
        c === "rerank" && /* @__PURE__ */ r.jsx(hp, { config: m.rerankConfig, onChange: te })
      ] }),
      s === "prompt" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ r.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ r.jsx(
          kp,
          {
            templates: m.promptTemplates,
            selectedId: (p == null ? void 0 : p.id) || null,
            onSelect: K,
            onAdd: $,
            onUpdate: W,
            onDelete: P
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: p ? /* @__PURE__ */ r.jsx(
          Ap,
          {
            template: p,
            llmPresets: m.llmPresets,
            defaultPresetId: m.selectedPresetId,
            onChange: W
          }
        ) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ r.jsx(Zc, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      s === "regex" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ r.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ r.jsx(
          Mp,
          {
            rules: b,
            selectedId: (S == null ? void 0 : S.id) || null,
            onSelect: Y,
            onToggle: he,
            onDelete: U,
            onAdd: ce,
            onReset: ee
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: S ? /* @__PURE__ */ r.jsx(Rp, { rule: S, onChange: Se }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ r.jsx(P1, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      s === "worldbook" && /* @__PURE__ */ r.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ r.jsx(
        Dp,
        {
          config: m.worldbookConfig,
          onChange: X,
          worldbookStructure: Ne,
          disabledEntries: se,
          onToggleWorldbook: z,
          onToggleEntry: V,
          onRefresh: ne
        }
      ) })
    ] })
  ] });
}, Hp = () => {
  const [u, s] = A.useState("claudeDark");
  A.useEffect(() => {
    s(Xn.getTheme());
  }, []);
  const o = (f) => {
    Xn.setTheme(f), Le.set("theme", f), s(f);
  }, c = Object.entries(qs).map(([f, m]) => {
    let x = m.colors.background, p = m.colors.primary;
    return {
      id: f,
      name: m.name,
      background: x,
      sidebar: m.colors.sidebar,
      // Add sidebar color
      primary: p
    };
  });
  return /* @__PURE__ */ r.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ r.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: c.map((f) => /* @__PURE__ */ r.jsxs(
      "button",
      {
        onClick: () => o(f.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${u === f.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
                        `,
        children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-center -space-x-3 mb-2", children: [
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-10",
                style: { background: f.background },
                title: "Background"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-20",
                style: { background: f.sidebar },
                title: "Sidebar"
              }
            ),
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background",
                style: { background: f.primary },
                title: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ r.jsx("span", { className: `text-sm font-medium ${u === f.id ? "text-primary" : "text-muted-foreground"}`, children: f.name }),
          u === f.id && /* @__PURE__ */ r.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      f.id
    )) })
  ] });
}, Vn = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function ra() {
  try {
    const u = window.SillyTavern;
    if (u != null && u.getContext) {
      const s = u.getContext();
      return (s == null ? void 0 : s.eventSource) || null;
    }
    return null;
  } catch {
    return console.warn("[Engram] EventBus: 无法获取 SillyTavern eventSource"), null;
  }
}
class bl {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, o) {
    const c = ra();
    return c && c.on(s, o), this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set()), this.listeners.get(s).add(o), () => {
      this.off(s, o);
    };
  }
  /**
   * 一次性订阅事件（触发后自动取消）
   * @param event 事件名称
   * @param callback 回调函数
   */
  static once(s, o) {
    const c = ra();
    if (c)
      c.once(s, o);
    else {
      const f = (...m) => {
        this.off(s, f), o(...m);
      };
      this.on(s, f);
    }
  }
  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  static off(s, o) {
    var f;
    const c = ra();
    c && c.removeListener(s, o), (f = this.listeners.get(s)) == null || f.delete(o);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(s, ...o) {
    const c = ra();
    c && c.emit(s, ...o);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = ra();
    for (const [o, c] of this.listeners)
      for (const f of c)
        s && s.removeListener(o, f);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return ra() !== null;
  }
}
qe(bl, "listeners", /* @__PURE__ */ new Map());
const qp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: bl,
  TavernEventType: Vn
}, Symbol.toStringTag, { value: "Module" }));
function Gp(u, s) {
  let o = "assistant";
  return u.is_user ? o = "user" : u.is_system && (o = "system"), {
    id: s,
    role: o,
    content: u.mes || "",
    name: u.name || "",
    isHidden: u.is_hidden ?? !1,
    raw: u
  };
}
class hm {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const o = ua();
    if (!(o != null && o.chat))
      return [];
    let c = o.chat.map((f, m) => Gp(f, m));
    if (s.includeHidden || (c = c.filter((f) => !f.isHidden)), s.role) {
      const f = Array.isArray(s.role) ? s.role : [s.role];
      c = c.filter((m) => f.includes(m.role));
    }
    return c;
  }
  /**
   * 获取最近 N 条消息
   * @param count 消息数量
   * @param options 查询选项
   */
  static getRecentMessages(s, o = {}) {
    return this.getAllMessages(o).slice(-s);
  }
  /**
   * 获取指定范围的消息
   * @param start 起始索引（包含）
   * @param end 结束索引（不包含）
   * @param options 查询选项
   */
  static getMessages(s, o, c = {}) {
    return this.getAllMessages(c).slice(s, o);
  }
  /**
   * 获取当前楼层数（消息总数）
   * @param options 查询选项
   */
  static getFloorCount(s = {}) {
    return this.getAllMessages(s).length;
  }
  /**
   * 获取最后一条消息
   * @param options 查询选项
   */
  static getLastMessage(s = {}) {
    const o = this.getAllMessages(s);
    return o.length > 0 ? o[o.length - 1] : null;
  }
  /**
   * 获取当前角色名称
   */
  static getCurrentCharacterName() {
    var o;
    const s = ua();
    return !(s != null && s.characters) || s.characterId < 0 ? null : ((o = s.characters[s.characterId]) == null ? void 0 : o.name) || null;
  }
  /**
   * 格式化消息为纯文本（用于传给 LLM）
   * @param messages 消息数组
   * @param format 格式化模板
   */
  static formatMessagesAsText(s, o = "simple") {
    return o === "simple" ? s.map((c) => `${c.name}: ${c.content}`).join(`

`) : s.map((c) => `[${c.role.toUpperCase()}] ${c.name}:
${c.content}`).join(`

---

`);
  }
  /**
   * 检查 MessageService 是否可用
   */
  static isAvailable() {
    return R3();
  }
}
const Yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: hm
}, Symbol.toStringTag, { value: "Module" }));
async function $p() {
  const { EventBus: u } = await Promise.resolve().then(() => qp), { MessageService: s } = await Promise.resolve().then(() => Yp), { WorldInfoService: o } = await Promise.resolve().then(() => fm);
  return {
    eventBus: u.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: o.isAvailable(),
    nativeTokenCount: await o.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const Vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: bl,
  MessageService: hm,
  TavernEventType: Vn,
  WorldInfoService: Ce,
  checkTavernIntegration: $p
}, Symbol.toStringTag, { value: "Module" })), Xp = [
  // 移除多余空行
  { pattern: /\n{3,}/g, replacement: `

`, description: "多余空行" },
  // 移除行首行尾空白
  { pattern: /^[ \t]+|[ \t]+$/gm, replacement: "", description: "行首尾空白" },
  // 移除 Markdown 代码块标记（保留内容）
  { pattern: /```\w*\n?/g, replacement: "", description: "Markdown代码块" },
  // 统一中文引号
  { pattern: /[""]/g, replacement: '"', description: "中文引号" },
  { pattern: /['']/g, replacement: "'", description: "中文单引号" },
  // 移除常见的 LLM 前缀
  { pattern: /^(好的|以下是|这是|根据对话).{0,20}[:：]\s*/gm, replacement: "", description: "LLM前缀" },
  // 移除末尾的解释性文字
  { pattern: /\n*如果.{0,50}请.{0,30}[。！]?\s*$/g, replacement: "", description: "末尾解释" }
];
class gm {
  constructor(s) {
    qe(this, "rules");
    this.rules = s || Xp;
  }
  /**
   * 清洗 LLM 输出文本
   * @param text 原始文本
   * @returns 清洗后的文本
   */
  clean(s) {
    let o = s;
    for (const c of this.rules)
      o = o.replace(c.pattern, c.replacement);
    return o.trim();
  }
  /**
   * 格式化为世界书条目格式
   * @param summary 总结内容
   * @param metadata 元数据
   */
  formatAsWorldEntry(s, o) {
    new Date(o.timestamp).toLocaleDateString("zh-CN");
    let m = `📜 剧情摘要 [楼层${`${o.floorRange[0]}-${o.floorRange[1]}`}]
`;
    return m += s, m;
  }
  /**
   * 提取纯文本（移除所有格式标记）
   * @param text 原始文本
   */
  extractPlainText(s) {
    return s.replace(/```[\s\S]*?```/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_~`#]/g, "").replace(/\n{2,}/g, `
`).trim();
  }
  /**
   * 截断文本到指定长度
   * @param text 文本
   * @param maxLength 最大长度
   * @param suffix 截断后缀
   */
  truncate(s, o, c = "...") {
    return s.length <= o ? s : s.slice(0, o - c.length) + c;
  }
  /**
   * 添加自定义规则
   */
  addRule(s) {
    this.rules.push(s);
  }
  /**
   * 获取当前规则列表
   */
  getRules() {
    return [...this.rules];
  }
}
const pm = new gm();
function H1() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class xm {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const o = H1();
    if (!(o != null && o.generateRaw) && !(o != null && o.generate))
      return {
        success: !1,
        content: "",
        error: "TavernHelper 不可用"
      };
    try {
      let c;
      if (o.generateRaw)
        c = await o.generateRaw({
          ordered_prompts: [
            { role: "system", content: s.systemPrompt },
            { role: "user", content: s.userPrompt }
          ]
          // 如果指定了预设 ID，可以在这里配置
          // custom_api: request.presetId ? await this.getPresetConfig(request.presetId) : undefined,
        });
      else if (o.generate)
        c = await o.generate({
          user_input: s.userPrompt,
          system_prompt: s.systemPrompt,
          should_stream: !1,
          max_chat_history: 0
        });
      else
        throw new Error("无可用的生成 API");
      return {
        success: !0,
        content: c || ""
      };
    } catch (c) {
      const f = c instanceof Error ? c.message : String(c);
      return console.error("[Engram] LLMAdapter 调用失败:", c), {
        success: !1,
        content: "",
        error: f
      };
    }
  }
  /**
   * 检查 LLM API 是否可用
   */
  isAvailable() {
    const s = H1();
    return !!(s != null && s.generate || s != null && s.generateRaw);
  }
  /**
   * 估算文本 Token 数（简单估算）
   * @param text 文本
   */
  estimateTokens(s) {
    return Math.ceil(s.length / 3);
  }
}
const au = new xm();
class Qp {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(s, o, c) {
    return new Promise((f, m) => {
      bl.emit(Vn.ENGRAM_REQUEST_REVISION, {
        title: s,
        description: o,
        content: c,
        onConfirm: (x) => f(x),
        onCancel: () => m(new Error("User cancelled revision"))
      });
    });
  }
}
const bm = new Qp(), ym = {
  enabled: !0,
  triggerMode: "auto",
  floorInterval: 10,
  worldbookMode: "chat",
  previewEnabled: !0,
  promptTemplateId: null,
  // 使用内置默认模板
  llmPresetId: null,
  // 使用默认预设
  bufferSize: 3,
  // 默认保留 3 楼不处理
  autoHide: !1
  // 默认不自动隐藏
}, q1 = {
  system: `<system_configuration>
  <role_definition>
    身份: 长篇故事记忆摘要器
    核心任务: 担任超长篇故事的“记忆核心”。接收用户提供的已有剧情原文，先理解“故事元摘要”的宏观视角，然后严格按照时间顺序，并遵照“事件粒度原则”合并同类项，分解为最精简的、服务于长线记忆的关键事件。
    禁令: 绝对禁止创作新内容、剧情推演或添加创意。绝对禁止输出YAML代码块。绝对禁止输出额外解释。
  </role_definition>

  <formatting_protocol>
    输出格式: 纯文本列表。
    事件行格式: 数字序号. [上下文信息] 事件核心描述 (重要性等级 | 权重值)
    宏观时间标记: 【 时间描述文本 】 (单独占一行，无序号)
    上下文信息: [时间 | 地点 | 核心人物] (若缺失则省略，全缺失用[])
  </formatting_protocol>

  <logic_protocol>
    评估基准:
      原则: 所有评估必须以开头提供的“故事元摘要”为基准。
      注意: 一个在当前章节看起来很“关键”的事件（比如找到一个普通线索），从整个故事（元摘要）的尺度看，可能仅仅是“基础”。
    
    时间顺序与锚定:
      首要规则: 严格按照原文的时间流逝顺序排列。
      宏观时间轴: 当剧情发生天数变更、年份跳跃、进入长时段回忆或新的篇章时，必须输出宏观时间标记。
        历法日期: 如“太阳历1023年4月4日”。
        相对日期: 如“第1天”、“第3年”、“数日后”。
      微观时间戳: 在具体事件行中，聚焦于：
        具体时刻: 如 HH:MM (14:30)。
        自然时段: 如 清晨、深夜、正午、黄昏。
        时间流状态: 对于跨越长日期的宏观块，使用 长期（表示持续性动作）、开始、过程、结束、突发 等标记。

    事件粒度原则 (节省Token的核心):
      最高原则: 合并连续的因果链。必须将服务于同一个直接目标、在短时间内连续发生的多个动作和反应，合并成一个单一的、结果导向的事件。
      判定标准: 一场完整的战斗（从接触到结束）、一次完整的谈判、一次完整的潜行侦察，都应被视为一个事件。
      错误示例 (过度细分):
        1: {{user}}发现紫袍人。
        2: {{user}}的潜行被察觉。
        3: {{user}}发起试探攻击...
      正确示例 (合并后的单一事件):
        1: [巢穴深处 | {{user}}, 紫袍人, 援军] {{user}}与紫袍人对峙，但在精神攻击下不敌陷入危机，最终被援军所救。 (推动 | 0.7)

    描述标准 (情报式摘要):
      动词-宾语核心: 砍掉所有不必要的修饰词、副词和从句，只保留事件的核心骨架：“谁，做了什么，对谁/什么”。
        错误: {{user}}在休息区找到了任务委托人——性格古板的药草师赫伯，并确认了任务细节。
        正确: {{user}}与药草师赫伯会面，确认任务。
      结论优先: 对于分析或推断性质的事件，直接给出最终的“结论”，省略思考过程。
        错误: {{user}}结合军事经验将线索串联，推断出哥布林已初具规模...
        正确: {{user}}得出结论：哥布林已成规模并计划扩张。
      状态快照: 对于描述角色状态或关系变化的事件，只记录其最终形成的稳定新状态，而不是描述变化过程。
        错误: 严峻的形势让赫伯彻底信服{{user}}的判断，他在一个岔路口前将决定权完全交给了{{user}}...
        正确: 赫伯完全信服，并将决策权交给{{user}}。
      关键信息保留: 绝不省略对剧情至关重要的专有名词、关键数据或核心发现。不能用模糊的词（如“基础情报”、“某个物品”）来代替具体信息。
        错误: {{user}}获取了基础情报。
        正确: {{user}}获知情报：斯特林集团涉嫌数据伪造。

    重要性分级 (金字塔模型):
      等级一_基础 (Foundation):
        权重: 0.1 - 0.4
        定义: 构成世界和叙事基础的背景、细节和常规互动。绝大多数（>60%）事件都属于此等级。
        伏笔处理: 对于符合“反常细节”或“悬而未决信息”的伏笔，也归于此类，但权重可酌情给予 0.3-0.4，并在描述中用括号注明 (伏笔)。
      等级二_推动 (Propulsion):
        权重: 0.5 - 0.7
        定义: 对某个章节或阶段剧情有实质性推动作用的事件。（占比 <30%）
        示例: 一次成功的关键说服、一次导致主角受伤的战斗、一个关键线索的发现。
      等级三_关键 (Keystone):
        权重: 0.8 - 0.9
        定义: 对长远故事有明确导向性作用的剧情关键节点。（占比 <10%）
        警告: 此等级不适用于故事早期的常规情节推进。
        示例: 关键配角的死亡、重要秘密的揭露、主角团队做出重大战略决策。
      等级四_转折 (Turning Point):
        权重: 1.0
        定义: 极其罕见的、能改变“故事元摘要”核心描述的决定性时刻。（占比 ≈1%）
        示例: 主角的死亡与重生、最终反派的揭晓、世界规则的颠覆。
  </logic_protocol>

  <output_template>
    <think>
      元摘要校准:
        故事基调: \${分析故事的核心类型和当前所处阶段}
        关键伏笔: \${回顾元摘要中提到的未解之谜，以便在摘要中保留相关线索}
      
      时间轴梳理:
        宏观节点识别: \${识别出原文中的日期变更、回忆片段或篇章转换}
        微观时刻提取: \${提取具体事件发生的时间点或自然时段}
      
      事件粒度分析:
        合并同类项: \${将连续的战斗、对话或行动合并为单一事件}
        重要性评估: \${根据金字塔模型，为每个事件评定等级和权重}
      
      格式自查:
        情报式摘要: \${检查是否去除了修饰词，只保留动宾结构}
        关键信息保留: \${确认是否保留了所有专有名词和关键数据}
    </think>

    \${按时间顺序输出宏观时间标记和事件列表}
    【 \${宏观时间描述} 】
    \${数字序号}. [\${微观时间} | \${地点} | \${核心人物}] \${事件核心描述} (\${重要性等级} | \${权重值})
  </output_template>
  
  <example_demonstration>
    输入原文:
      "穿越者A重伤濒死，被B公主发现并施展治愈术救回。B因同情决定暂时收留A，并隐瞒其异界人身份。
      (三年前的回忆) A在B安排下接受高强度骑士训练，习得“基础剑术”。两人确立主仆契约，A正式获得“见习守护骑士”头衔。
      (冒险开始) A使用假名“剑”注册冒险者，并提交了采集药草任务。A在交换情报时引起哥布林杀手注意，获赠“便携粉尘炸弹”。"

    AI输出:
      <think>
        元摘要校准:
          故事基调: \${异世界穿越/骑士成长/主仆羁绊}
          当前进度: \${从穿越初识到冒险起步}
        
        时间轴梳理:
          宏观节点1: \${太阳历1023年春4月4日 (穿越)}
          宏观节点2: \${太阳历1023年-1026年 (磨合期/回忆)}
          宏观节点3: \${第4年-第10天 (冒险开始)}
        
        事件粒度分析:
          事件1: \${A被救 (合并重伤/发现/治疗)} -> 关键
          事件2: \${B收留 (合并同情/决定/隐瞒)} -> 推动
          事件3: \${骑士训练 (合并长期训练过程)} -> 基础
          事件4: \${确立契约 (合并主仆关系确认/获得头衔)} -> 关键
          事件5: \${注册冒险者 (合并假名/注册/接任务)} -> 基础
          事件6: \${获赠炸弹 (合并情报交换/引起注意/获赠)} -> 推动
        
        格式自查:
          情报式摘要: \${去除修饰词，保留核心动宾结构}
          关键信息: \${保留"B"、"见习守护骑士"、"哥布林杀手"等专有名词}
      </think>

      【 太阳历1023年春4月4日 : 穿越 】
      1. [深夜 | 荒野森林 | A, B] 穿越者A重伤濒死，被B公主发现并施展治愈术救回。 (关键 | 0.8)
      2. [深夜 | 临时营地 | A, B] B因同情决定暂时收留A，并隐瞒其异界人身份。 (推动 | 0.6)

      【 太阳历1023年春4月4日-1026年秋9月5日 : 磨合期 (三年前的回忆) 】
      3. [长期 | 王城训练场 | A, 骑士长] A在B安排下接受高强度骑士训练，习得“基础剑术”。 (基础 | 0.4)
      4. [结束 | B寝宫 | A, B] 两人确立主仆契约，A正式获得“见习守护骑士”头衔。 (关键 | 0.8)

      【 第4年-第10天 : 冒险开始 】
      5. [正午 | 边境公会大厅 | A, 接待员] A使用假名“剑”注册冒险者，并提交了采集药草任务。 (基础 | 0.3)
      6. [14:30 | 小镇酒馆 | A, 哥布林杀手] A在交换情报时引起哥布林杀手注意，获赠“便携粉尘炸弹”。 (推动 | 0.7)
  </example_demonstration>
</system_configuration>`,
  user: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`
}, sa = "engram", Zp = "engram总结";
function G1() {
  var u, s;
  try {
    return ((s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) || null;
  } catch {
    return null;
  }
}
function Y1() {
  var u, s;
  try {
    const o = (s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u);
    return o != null && o.chat_metadata ? o.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function Kp() {
  var u;
  try {
    (u = window.saveChatDebounced) == null || u.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class vm {
  constructor(s, o, c) {
    qe(this, "config");
    qe(this, "textProcessor");
    qe(this, "llmAdapter");
    qe(this, "currentChatId", null);
    qe(this, "isRunning", !1);
    qe(this, "isSummarizing", !1);
    qe(this, "unsubscribeMessage", null);
    qe(this, "unsubscribeChat", null);
    qe(this, "summaryHistory", []);
    // 缓存最后总结的楼层，用于同步读取
    qe(this, "_lastSummarizedFloor", 0);
    const f = Le.get("summarizerConfig");
    this.config = { ...ym, ...f, ...s }, this.textProcessor = o || pm, this.llmAdapter = c || au;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const o = Y1();
    if (o)
      return o.extensions || (o.extensions = {}), o.extensions[sa] || (o.extensions[sa] = {}), o.extensions[sa][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, o) {
    const c = Y1();
    c && (c.extensions || (c.extensions = {}), c.extensions[sa] || (c.extensions[sa] = {}), c.extensions[sa][s] = o, this.log("debug", `已保存到 chat_metadata: ${s} = ${o}`), Kp());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const s = Ce.findExistingWorldbook();
    if (!s) return this._lastSummarizedFloor;
    const o = await xl.loadState(s);
    return this._lastSummarizedFloor = o.lastSummarizedFloor, this._lastSummarizedFloor;
  }
  /**
   * 设置上次总结的楼层
   * 同时更新内存和持久化存储
   */
  async setLastSummarizedFloor(s) {
    this._lastSummarizedFloor = s;
    const o = Ce.findExistingWorldbook();
    if (!o) {
      this.log("debug", "世界书未创建，跳过保存进度", { floor: s });
      return;
    }
    await xl.saveState(o, {
      lastSummarizedFloor: s
    });
  }
  /**
  
      // ==================== 楼层计算 ====================
  
      /**
       * 获取当前真实楼层数
       */
  getCurrentFloor() {
    const s = G1();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = G1();
    return (s == null ? void 0 : s.chatId) || null;
  }
  // ==================== 生命周期 ====================
  /**
   * 启动服务，开始监听事件
   */
  start() {
    if (this.isRunning) {
      this.log("warn", "服务已在运行");
      return;
    }
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = bl.on(
      Vn.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${Vn.MESSAGE_RECEIVED}`)), this.unsubscribeChat = bl.on(
      Vn.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${Vn.CHAT_CHANGED}`), this.isRunning = !0;
    const s = this.getStatus();
    this.log("info", "服务已启动", s);
  }
  /**
   * 重置进度 (设置为 0)
   */
  async resetProgress() {
    await this.setLastSummarizedFloor(0), this.log("info", "进度已重置");
  }
  /**
   * 停止服务
   */
  stop() {
    this.unsubscribeMessage && (this.unsubscribeMessage(), this.unsubscribeMessage = null), this.unsubscribeChat && (this.unsubscribeChat(), this.unsubscribeChat = null), this.isRunning = !1, this.log("info", "服务已停止");
  }
  /**
   * 为当前聊天初始化状态
   */
  async initializeForCurrentChat() {
    const s = this.getCurrentChatId(), o = this.getCurrentFloor();
    this.currentChatId = s, this.summaryHistory = [], this._lastSummarizedFloor = 0;
    const c = await this.getLastSummarizedFloor();
    this.log("info", "初始化当前聊天状态", {
      chatId: s,
      currentFloor: o,
      lastSummarizedFloor: c,
      pendingFloors: o - c
    });
  }
  // ==================== 事件处理 ====================
  /**
   * 处理消息接收事件
   */
  async handleMessageReceived() {
    const s = this.getCurrentFloor(), o = await this.getLastSummarizedFloor(), c = s - o;
    this.log("debug", "收到新消息", {
      currentFloor: s,
      lastSummarized: o,
      pendingFloors: c,
      triggerAt: this.config.floorInterval
    }), c >= this.config.floorInterval && (this.log("info", "达到触发条件，准备总结", {
      pendingFloors: c,
      interval: this.config.floorInterval
    }), await this.triggerSummary());
  }
  /**
   * 处理聊天切换事件
   */
  handleChatChanged() {
    const s = this.getCurrentChatId();
    this.log("info", "聊天已切换", {
      from: this.currentChatId,
      to: s
    }), this.initializeForCurrentChat();
  }
  // ==================== 总结逻辑 ====================
  /**
   * 手动/自动触发总结
   */
  async triggerSummary(s = !1) {
    var f;
    if (this.isSummarizing)
      return this.log("warn", "正在执行总结，跳过本次触发"), null;
    if (!this.config.enabled && !s)
      return this.log("debug", "自动总结已禁用"), null;
    const o = this.getCurrentFloor(), c = await this.getLastSummarizedFloor();
    this.isSummarizing = !0, this.log("info", "开始执行总结", {
      floorRange: [c + 1, o],
      manual: s
    });
    try {
      const m = this._lastSummarizedFloor + 1, x = this.config.bufferSize || 0, p = o - x;
      if (m > p)
        return s && st.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const g = this.config.floorInterval || 10, b = m + g - 1, S = Math.min(p, b);
      if (m > S)
        return null;
      const v = [m, S];
      this.log("info", "准备总结", { startFloor: m, endFloor: S, currentFloor: o, buffer: x });
      const q = O3().slice(m - 1, S);
      if (this.log("info", "提取消息范围", {
        range: v,
        msgCount: q.length,
        firstMsg: (((f = q[0]) == null ? void 0 : f.mes) || "").substring(0, 20)
      }), q.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: v }), null;
      const _ = {
        messages: q.map((se) => {
          const z = se.mes || se.content || se.message || "";
          return z || console.warn("[Engram] Message content is empty/undefined:", se), {
            role: se.is_user ? "user" : "assistant",
            content: z,
            name: se.name
          };
        }),
        floorRange: v,
        templateId: this.config.promptTemplateId || void 0
      }, G = q.map((se) => se.mes || se.content || se.message || "").join(`

`), K = Ks.process(G, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: G.length,
        cleanedLength: K.length
      });
      let $ = "";
      try {
        const se = await Ce.getActivatedWorldInfo();
        se && ($ = `【背景设定】
` + se + `

`, this.log("debug", "已加载世界书内容", { length: se.length }));
      } catch (se) {
        this.log("warn", "获取世界书失败", { error: String(se) });
      }
      const W = Le.getEnabledPromptTemplate("text_summary"), P = (W == null ? void 0 : W.systemPrompt) || q1.system, xe = (W == null ? void 0 : W.userPromptTemplate) || q1.user;
      let te = "";
      try {
        te = await Ce.getEngramSummariesContent(), te && this.log("debug", "已加载 Engram 摘要", { length: te.length });
      } catch (se) {
        this.log("warn", "获取 Engram 摘要失败", { error: String(se) });
      }
      const X = xe.replace("{{worldbookContext}}", $).replace("{{chatHistory}}", K).replace("{{context}}", $).replace("{{engramSummaries}}", te);
      this.log("debug", "使用提示词模板", {
        source: W ? "APIPresets" : "fallback",
        templateName: (W == null ? void 0 : W.name) || "default"
      });
      const Y = Yn.logSend({
        type: "summarize",
        systemPrompt: P,
        userPrompt: X,
        floorRange: _.floorRange
      }), ce = Date.now(), Se = await this.llmAdapter.generate({
        systemPrompt: P,
        userPrompt: X
      });
      if (Yn.logReceive(Y, {
        response: Se.content,
        status: Se.success ? "success" : "error",
        error: Se.error,
        duration: Date.now() - ce
      }), !Se.success)
        return this.log("error", "LLM 调用失败", { error: Se.error }), st.error(`总结失败: ${Se.error}`, "Engram 错误"), null;
      const he = this.textProcessor.clean(Se.content), U = Ks.process(he, "output"), ee = await Ce.countTokens(U), de = {
        id: Date.now().toString(),
        content: U,
        sourceFloors: _.floorRange,
        timestamp: Date.now(),
        tokenCount: ee,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: de });
        try {
          const se = await bm.requestRevision(
            "剧情摘要修订",
            `范围: ${_.floorRange[0]} - ${_.floorRange[1]} 楼 | Token: ${ee}`,
            de.content
          );
          de.content = se, de.tokenCount = await Ce.countTokens(se), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), st.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const Ne = await this.writeToWorldbook(de);
      if (de.writtenToWorldbook = Ne, await this.setLastSummarizedFloor(_.floorRange[1]), this.summaryHistory.push(de), st.success(`已总结 ${_.floorRange[0]}-${_.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const se = _.floorRange[0] - 1, z = _.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: se, endIndex: z }), G3(se, z).catch((V) => {
          this.log("error", "自动隐藏失败", V);
        });
      }
      return de;
    } catch (m) {
      const x = m instanceof Error ? m.message : String(m);
      return this.log("error", "总结执行异常", { error: x }), st.error(`总结异常: ${x}`, "Engram 错误"), null;
    } finally {
      this.isSummarizing = !1;
    }
  }
  /**
   * 写入世界书
   */
  async writeToWorldbook(s) {
    try {
      const o = await Ce.getChatWorldbook();
      if (!o)
        return this.log("warn", "无法获取聊天世界书"), !1;
      await Ce.ensureSeparatorEntries(o);
      const c = await Ce.getNextSummaryOrder(o), f = `{{// ${JSON.stringify({
        floors: s.sourceFloors,
        tokens: s.tokenCount,
        timestamp: s.timestamp
      })} }}`, m = `${s.content}

${f}`, x = await Ce.createEntry(o, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: m,
        keys: [Zp],
        // 添加关键词用于筛选
        enabled: !0,
        // 开启状态，让摘要能被激活进入上下文
        constant: !0,
        order: c
        // 使用计算出的递增顺序
      });
      if (x) {
        this.log("success", "已写入世界书", { worldbook: o, order: c });
        const p = await xl.loadState(o);
        await xl.saveState(o, {
          totalSummaries: p.totalSummaries + 1
        });
      }
      return x;
    } catch (o) {
      return this.log("error", "写入世界书失败", { error: String(o) }), !1;
    }
  }
  // ==================== 状态查询 ====================
  /**
   * 获取当前状态
   */
  getStatus() {
    const s = this.getCurrentFloor(), o = this._lastSummarizedFloor;
    return {
      running: this.isRunning,
      currentFloor: s,
      lastSummarizedFloor: o,
      pendingFloors: Math.max(0, s - o),
      historyCount: this.summaryHistory.length,
      isSummarizing: this.isSummarizing
    };
  }
  /**
   * 刷新状态（强制重新读取）
   */
  refreshStatus() {
    return this.initializeForCurrentChat(), this.getStatus();
  }
  /**
   * 获取配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 更新配置
   */
  updateConfig(s) {
    this.config = { ...this.config, ...s }, Le.set("summarizerConfig", this.config), this.log("debug", "配置已更新并保存", this.config);
  }
  /**
   * 获取总结历史
   */
  getHistory() {
    return [...this.summaryHistory];
  }
  /**
   * 重置基准楼层为当前楼层
   */
  async resetBaseFloor() {
    const s = this.getCurrentFloor();
    await this.setLastSummarizedFloor(s), this.log("info", "已重置基准楼层", { currentFloor: s });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  async log(s, o, c) {
    try {
      const { Logger: f } = await Promise.resolve().then(() => nu);
      f[s]("Summarizer", o, c);
    } catch {
      console.log(`[Summarizer] ${s}: ${o}`, c);
    }
  }
}
const Gc = new vm(), Js = {
  ...Ep,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
}, $1 = {
  system: `你是一个信息压缩助手。你的任务是将多条剧情摘要合并、精简为一条更简洁的综合摘要。

规则：
1. 保留最重要的信息：关键事件、重要人物、核心转折
2. 删除重复或冗余的内容
3. 合并相似或连续的事件
4. 保持时间顺序
5. 保留原有的格式风格（如时间标记、人物标注等）
6. 输出应该是输入总长度的 30-50%

警告：
- 绝对不要添加任何新内容或推测
- 绝对不要改变事件的含义
- 保留所有专有名词和关键数据`,
  user: `请将以下多条剧情摘要合并精简：

{{engramSummaries}}

---
请输出一条精简后的综合摘要：`
};
class Sm {
  constructor(s, o) {
    qe(this, "config");
    qe(this, "llmAdapter");
    qe(this, "isTrimming", !1);
    const c = Le.get("trimmerConfig") || {};
    this.config = { ...Js, ...c, ...s }, this.llmAdapter = o || au;
  }
  // ==================== 配置管理 ====================
  /**
   * 获取配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 更新配置
   */
  updateConfig(s) {
    this.config = { ...this.config, ...s };
    const o = Le.get("summarizerConfig") || {};
    Le.set("summarizerConfig", {
      ...o,
      trimmer: this.config
    }), this.log("debug", "配置已更新", this.config);
  }
  // ==================== 状态检查 ====================
  /**
   * 获取当前状态
   */
  async getStatus() {
    const s = Ce.findExistingWorldbook();
    if (!s)
      return {
        triggered: !1,
        triggerType: this.config.trigger,
        currentValue: 0,
        threshold: this.getThreshold(),
        pendingEntryCount: 0,
        isTrimming: this.isTrimming
      };
    const o = await Ce.getSummaryEntries(s), c = Math.max(0, o.length - this.config.keepRecentCount), f = await this.getCurrentTriggerValue(s, o), m = this.getThreshold();
    return {
      triggered: this.config.enabled && f >= m,
      triggerType: this.config.trigger,
      currentValue: f,
      threshold: m,
      pendingEntryCount: c,
      isTrimming: this.isTrimming
    };
  }
  /**
   * 获取当前触发器的阈值
   */
  getThreshold() {
    switch (this.config.trigger) {
      case "token":
        return this.config.tokenLimit;
      case "count":
        return this.config.countLimit;
      default:
        return 0;
    }
  }
  /**
   * 获取当前触发器的值
   */
  async getCurrentTriggerValue(s, o) {
    switch (this.config.trigger) {
      case "token":
        return await Ce.countSummaryTokens(s);
      case "count":
        return o.length;
      default:
        return 0;
    }
  }
  /**
   * 检查是否达到触发条件
   */
  async checkTrigger() {
    return (await this.getStatus()).triggered;
  }
  // ==================== 精简逻辑 ====================
  /**
   * 获取待合并的条目
   * 排除最近 N 条
   */
  async getEntriesToMerge() {
    const s = Ce.findExistingWorldbook();
    if (!s) return [];
    const o = await Ce.getSummaryEntries(s), c = this.config.keepRecentCount;
    return o.length <= c ? [] : o.slice(0, o.length - c);
  }
  /**
   * 手动/自动触发精简
   */
  async triggerTrim(s = !1) {
    if (this.isTrimming)
      return this.log("warn", "正在执行精简，跳过本次触发"), null;
    if (!this.config.enabled && !s)
      return this.log("debug", "精简功能已禁用"), null;
    const o = Ce.findExistingWorldbook();
    if (!o)
      return this.log("warn", "世界书未找到"), st.warning("未找到 Engram 世界书", "Engram"), null;
    const c = await this.getEntriesToMerge();
    if (c.length < 2)
      return s && st.info("待合并的条目不足 (需要至少 2 条)", "Engram"), null;
    this.isTrimming = !0, this.log("info", "开始执行精简", {
      entryCount: c.length,
      manual: s
    });
    try {
      const f = c.map((te) => Ce.parseFloorRangeFromName(te.name)).filter((te) => te !== null);
      if (f.length === 0)
        return this.log("error", "无法解析楼层范围"), null;
      const m = Math.min(...f.map((te) => te[0])), x = Math.max(...f.map((te) => te[1])), p = [m, x], g = c.map((te) => {
        const X = Ce.parseFloorRangeFromName(te.name), Y = X ? `【${X[0]}-${X[1]}楼】` : `【${te.name}】`, ce = te.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
        return `${Y}
${ce}`;
      }).join(`

---

`), b = Le.getEnabledPromptTemplate("trim"), S = (b == null ? void 0 : b.systemPrompt) || $1.system, R = ((b == null ? void 0 : b.userPromptTemplate) || $1.user).replace("{{engramSummaries}}", g).replace("{{context}}", g);
      this.log("debug", "使用提示词模板", {
        source: b ? "APIPresets" : "fallback",
        templateName: (b == null ? void 0 : b.name) || "default",
        inputLength: g.length
      });
      const q = Yn.logSend({
        type: "trim",
        systemPrompt: S,
        userPrompt: R,
        floorRange: p
      }), _ = Date.now(), G = await this.llmAdapter.generate({
        systemPrompt: S,
        userPrompt: R
      });
      if (Yn.logReceive(q, {
        response: G.content,
        status: G.success ? "success" : "error",
        error: G.error,
        duration: Date.now() - _
      }), !G.success)
        return this.log("error", "LLM 调用失败", { error: G.error }), st.error(`精简失败: ${G.error}`, "Engram 错误"), null;
      const K = Ks.process(G.content, "output"), $ = await Ce.countTokens(K), W = Math.min(...c.map((te) => te.order)), P = {
        content: K,
        tokenCount: $,
        sourceEntryIds: c.map((te) => te.uid),
        newFloorRange: p,
        newOrder: W
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: P });
        try {
          const te = await bm.requestRevision(
            "精简摘要修订",
            `合并 ${c.length} 条 | 范围: ${p[0]}-${p[1]} 楼 | Token: ${$}`,
            P.content
          );
          P.content = te, P.tokenCount = await Ce.countTokens(te), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了精简写入"), st.info("已取消精简操作", "操作取消"), null;
        }
      }
      return await this.writeCompactedEntry(o, P) ? (await this.removeOriginalEntries(o, P.sourceEntryIds), st.success(
        `已精简 ${c.length} 条摘要为 1 条 (${p[0]}-${p[1]} 楼)`,
        "Engram"
      ), P) : (this.log("error", "写入精简条目失败"), null);
    } catch (f) {
      const m = f instanceof Error ? f.message : String(f);
      return this.log("error", "精简执行异常", { error: m }), st.error(`精简异常: ${m}`, "Engram 错误"), null;
    } finally {
      this.isTrimming = !1;
    }
  }
  /**
   * 写入精简后的条目
   */
  async writeCompactedEntry(s, o) {
    try {
      const c = `{{// ${JSON.stringify({
        floors: o.newFloorRange,
        tokens: o.tokenCount,
        timestamp: Date.now(),
        layer: 2,
        // 标记为二层精简
        mergedFrom: o.sourceEntryIds.length
      })} }}`, f = `${o.content}

${c}`, m = await Ce.createEntry(s, {
        name: `剧情摘要_${o.newFloorRange[0]}-${o.newFloorRange[1]}`,
        content: f,
        keys: [dr],
        // 添加关键词用于筛选
        enabled: !0,
        constant: !0,
        order: o.newOrder
      });
      return m && this.log("success", "已写入精简条目", {
        worldbook: s,
        floorRange: o.newFloorRange,
        order: o.newOrder
      }), m;
    } catch (c) {
      return this.log("error", "写入精简条目失败", { error: String(c) }), !1;
    }
  }
  /**
   * 删除/禁用原始条目
   */
  async removeOriginalEntries(s, o) {
    if (this.config.preserveOriginal) {
      for (const c of o)
        await Ce.updateEntry(s, c, { enabled: !1 });
      this.log("info", "已禁用原始条目", { count: o.length });
    } else
      await Ce.deleteEntries(s, o) && this.log("info", "已删除原始条目", { count: o.length });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  log(s, o, c) {
    ae[s]("Trimmer", o, c);
  }
}
const Jp = new Sm(), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: fr,
  DEFAULT_SUMMARIZER_CONFIG: ym,
  DEFAULT_TRIMMER_CONFIG: Js,
  LLMAdapter: xm,
  RegexProcessor: lu,
  SummarizerService: vm,
  TextProcessor: gm,
  TrimmerService: Sm,
  llmAdapter: au,
  regexProcessor: Ks,
  summarizerService: Gc,
  textProcessor: pm,
  trimmerService: Jp
}, Symbol.toStringTag, { value: "Module" })), Wp = () => {
  const [u, s] = A.useState(
    Gc.getConfig().previewEnabled
  ), o = (x) => {
    const p = x.target.checked;
    s(p), Gc.updateConfig({ previewEnabled: p });
  }, [c, f] = A.useState(Le.getSettings().linkedDeletion), m = (x) => (p) => {
    const g = { ...c, [x]: p.target.checked };
    f(g), Le.set("linkedDeletion", g);
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ r.jsx(Ps, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ r.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ r.jsx(Hp, {})
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ r.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ r.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ r.jsx(Q4, { size: 20 }) }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("h4", { className: "font-medium text-foreground", children: "启用修订模式" }),
              /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "在写入长期记忆前，弹出预览窗口进行人工核对" })
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "checkbox",
                className: "sr-only peer",
                checked: u,
                onChange: o
              }
            ),
            /* @__PURE__ */ r.jsx("div", { className: "w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "数据管理" }),
        /* @__PURE__ */ r.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-4", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ r.jsx("div", { className: "p-2 rounded-lg bg-red-500/10 text-red-500", children: /* @__PURE__ */ r.jsx(fa, { size: 20 }) }),
              /* @__PURE__ */ r.jsxs("div", { children: [
                /* @__PURE__ */ r.jsx("h4", { className: "font-medium text-foreground", children: "联动删除" }),
                /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "删除角色卡时，一并删除关联的 Engram 记忆库" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: c.enabled,
                  onChange: m("enabled")
                }
              ),
              /* @__PURE__ */ r.jsx("div", { className: "w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" })
            ] })
          ] }),
          c.enabled && /* @__PURE__ */ r.jsx("div", { className: "pl-14 space-y-3 border-t border-border pt-3", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-sm text-muted-foreground", children: "删除前确认" }),
            /* @__PURE__ */ r.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: c.showConfirmation,
                  onChange: m("showConfirmation")
                }
              ),
              /* @__PURE__ */ r.jsx("div", { className: "w-9 h-5 bg-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
        /* @__PURE__ */ r.jsx(tm, { size: 32 }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, Fp = () => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ r.jsx(Ps, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ r.jsx(K1, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ r.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), Ip = ({ links: u, onNavigate: s, className: o = "" }) => u.length === 0 ? null : /* @__PURE__ */ r.jsx("div", { className: `flex items-center gap-4 ${o}`, children: u.map((c) => {
  const f = c.icon || V4;
  return /* @__PURE__ */ r.jsxs(
    "button",
    {
      className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
      onClick: () => s(c.linkTo),
      title: c.label,
      children: [
        /* @__PURE__ */ r.jsx(f, { size: 12 }),
        /* @__PURE__ */ r.jsx("span", { children: c.label })
      ]
    },
    c.id
  );
}) }), Pp = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6"
}, Hs = ({
  orientation: u = "horizontal",
  length: s = 100,
  className: o = "",
  responsive: c = !1,
  spacing: f = "none"
}) => {
  const m = Pp[f];
  return c ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      "div",
      {
        className: `hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 border-l border-border/30 ${o}`,
        style: { height: `${s}%` }
      }
    ),
    /* @__PURE__ */ r.jsx(
      "div",
      {
        className: `lg:hidden border-t border-border/30 mx-auto ${m} ${o}`,
        style: { width: `${s}%` }
      }
    )
  ] }) : u === "vertical" ? /* @__PURE__ */ r.jsx(
    "div",
    {
      className: `border-l border-border/30 mx-auto ${o}`,
      style: { height: `${s}%` }
    }
  ) : /* @__PURE__ */ r.jsx(
    "div",
    {
      className: `border-t border-border/30 ${m} ${o}`,
      style: { width: `${s}%` }
    }
  );
}, e5 = [
  { id: "token", label: "Token 数", icon: T4 },
  { id: "count", label: "总结次数", icon: J4 }
], t5 = () => {
  const [u, s] = A.useState(null), [o, c] = A.useState(!1), [f, m] = A.useState(!1), [x, p] = A.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [g, b] = A.useState({ ...Js }), [S, v] = A.useState(null), [R, q] = A.useState(0), [_, G] = A.useState(0);
  A.useEffect(() => {
    K();
  }, []);
  const K = async () => {
    var U;
    try {
      const { summarizerService: ee } = await Promise.resolve().then(() => wt);
      let de = ee.getStatus();
      de.lastSummarizedFloor === 0 && (await ee.initializeForCurrentChat(), de = ee.getStatus()), s(de);
      const Ne = ee.getConfig();
      p({
        autoEnabled: Ne.enabled,
        floorInterval: Ne.floorInterval,
        bufferSize: Ne.bufferSize || 3,
        autoHide: Ne.autoHide || !1
      });
      const se = (U = Le.getSummarizerSettings()) == null ? void 0 : U.trimConfig;
      se && b({ ...Js, ...se });
      const { trimmerService: z } = await Promise.resolve().then(() => wt), V = await z.getStatus();
      v(V);
      const { WorldInfoService: ne } = await Promise.resolve().then(() => fm), { WorldBookStateService: ie } = await Promise.resolve().then(() => mm), je = ne.findExistingWorldbook();
      if (je) {
        const C = await ne.countSummaryTokens(je);
        q(C);
        const L = await ie.loadState(je);
        G(L.totalSummaries);
      } else
        q(0), G(0);
    } catch (ee) {
      console.error("加载 Summarizer 状态失败:", ee);
    }
  }, $ = async () => {
    try {
      const { summarizerService: U } = await Promise.resolve().then(() => wt);
      U.start(), await K();
    } catch (U) {
      console.error("启动失败:", U);
    }
  }, W = async () => {
    try {
      const { summarizerService: U } = await Promise.resolve().then(() => wt);
      U.stop(), await K();
    } catch (U) {
      console.error("停止失败:", U);
    }
  }, P = async () => {
    c(!0);
    try {
      const { summarizerService: U } = await Promise.resolve().then(() => wt);
      await U.triggerSummary(!0), await K();
    } catch (U) {
      console.error("触发失败:", U);
    } finally {
      c(!1);
    }
  }, xe = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      c(!0);
      try {
        const { summarizerService: U } = await Promise.resolve().then(() => wt);
        await U.setLastSummarizedFloor(0), await K();
      } catch (U) {
        console.error("重置失败:", U);
      } finally {
        c(!1);
      }
    }
  }, te = (U, ee) => {
    const de = { ...g, [U]: ee };
    b(de), X(de);
  }, X = (U) => {
    Le.setSummarizerSettings({ trimConfig: U });
  }, Y = async () => {
    const U = { ...g, enabled: !g.enabled };
    b(U), X(U);
    const { trimmerService: ee } = await Promise.resolve().then(() => wt);
    ee.updateConfig({ enabled: U.enabled });
  }, ce = async () => {
    m(!0);
    try {
      const { trimmerService: U } = await Promise.resolve().then(() => wt);
      await U.triggerTrim(!0), await K();
    } catch (U) {
      console.error("精简失败:", U);
    } finally {
      m(!1);
    }
  }, he = (() => {
    switch (g.trigger) {
      case "token":
        return { value: g.tokenLimit, min: 1024, max: 1e5, step: 1024, label: "Token 上限" };
      case "count":
        return { value: g.countLimit, min: 2, max: 20, step: 1, label: "次数上限" };
    }
  })();
  return /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", children: [
    /* @__PURE__ */ r.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ r.jsxs("div", { children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ r.jsx("h2", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "状态监控" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "p-1 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: K,
              title: "刷新",
              children: /* @__PURE__ */ r.jsx(Zt, { size: 14 })
            }
          )
        ] }),
        u ? /* @__PURE__ */ r.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "运行状态" }),
              /* @__PURE__ */ r.jsxs("div", { className: `flex items-center gap-2 text-lg font-medium ${u.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                u.running ? /* @__PURE__ */ r.jsx(O4, { size: 18 }) : /* @__PURE__ */ r.jsx(Ws, { size: 18 }),
                u.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "待处理" }),
              /* @__PURE__ */ r.jsx("div", { className: "text-3xl font-light text-amber-500 font-mono", children: u.pendingFloors })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(Hs, { length: 100, spacing: "md" }),
          /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "当前楼层" }),
              /* @__PURE__ */ r.jsx("div", { className: "text-xl font-mono text-foreground/80", children: u.currentFloor })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "总结次数" }),
              /* @__PURE__ */ r.jsx("div", { className: "text-xl font-mono text-foreground/80", children: _ })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(Hs, { length: 30, spacing: "md" }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1", children: "已总结内容 Token (Engram)" }),
            /* @__PURE__ */ r.jsx("div", { className: "text-sm font-mono text-primary/80", children: R.toLocaleString() })
          ] })
        ] }) : /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-3", children: [
        u != null && u.running ? /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors",
            onClick: W,
            children: [
              /* @__PURE__ */ r.jsx(mg, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: $,
            children: [
              /* @__PURE__ */ r.jsx(Jc, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: P,
            disabled: o || (u == null ? void 0 : u.isSummarizing),
            children: [
              /* @__PURE__ */ r.jsx(Zt, { size: 14, className: o ? "animate-spin" : "" }),
              o ? "处理中..." : "手动触发"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "pt-6 space-y-6", children: [
        /* @__PURE__ */ r.jsx(Hs, { length: 100 }),
        /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-sm text-foreground", children: "自动总结" }),
            /* @__PURE__ */ r.jsx(
              $n,
              {
                label: "",
                checked: x.autoEnabled,
                onChange: async (U) => {
                  p((de) => ({ ...de, autoEnabled: U }));
                  const { summarizerService: ee } = await Promise.resolve().then(() => wt);
                  ee.updateConfig({ enabled: U });
                }
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-sm text-foreground", children: "自动隐藏" }),
              /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground", children: "处理完后隐藏原文" })
            ] }),
            /* @__PURE__ */ r.jsx(
              $n,
              {
                label: "",
                checked: x.autoHide,
                onChange: (U) => {
                  p((ee) => ({ ...ee, autoHide: U })), Promise.resolve().then(() => wt).then(({ summarizerService: ee }) => {
                    ee.updateConfig({ autoHide: U });
                  });
                }
              }
            )
          ] })
        ] }),
        x.autoEnabled && /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "楼层将每隔 ",
              /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: x.floorInterval }),
              " 层总结"
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ r.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${(x.floorInterval - 5) / 95 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "range",
                  min: 5,
                  max: 100,
                  step: 5,
                  value: x.floorInterval,
                  onChange: async (U) => {
                    const ee = Number(U.target.value);
                    p((Ne) => ({ ...Ne, floorInterval: ee }));
                    const { summarizerService: de } = await Promise.resolve().then(() => wt);
                    de.updateConfig({ floorInterval: ee });
                  },
                  className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                  style: { appearance: "none", WebkitAppearance: "none" }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "保留最近 ",
              /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: x.bufferSize }),
              " 层作为缓冲"
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ r.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${x.bufferSize / 20 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 20,
                  step: 1,
                  value: x.bufferSize,
                  onChange: (U) => {
                    const ee = Number(U.target.value);
                    p((de) => ({ ...de, bufferSize: ee })), Promise.resolve().then(() => wt).then(({ summarizerService: de }) => {
                      de.updateConfig({ bufferSize: ee });
                    });
                  },
                  className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                  style: { appearance: "none", WebkitAppearance: "none" }
                }
              )
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ r.jsxs(
        "button",
        {
          className: "inline-flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 border border-red-200 rounded transition-colors",
          onClick: xe,
          disabled: o,
          title: "重置进度 (重新扫描历史)",
          children: [
            /* @__PURE__ */ r.jsx(Zt, { size: 12, className: o ? "animate-spin" : "" }),
            "重置所有进度"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ r.jsxs("section", { className: "space-y-6 lg:pl-8 relative", children: [
      /* @__PURE__ */ r.jsx(Hs, { responsive: !0, length: 30 }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("h2", { className: "text-sm font-medium text-foreground", children: "精简配置" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "将多次总结压缩为更简洁的摘要" })
        ] }),
        /* @__PURE__ */ r.jsx(
          $n,
          {
            label: "",
            checked: g.enabled,
            onChange: Y
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: `space-y-6 transition-opacity ${g.enabled ? "opacity-100" : "opacity-40 pointer-events-none"}`, children: [
        /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground", children: "触发条件" }),
          /* @__PURE__ */ r.jsx("div", { className: "flex gap-6", children: e5.map((U) => /* @__PURE__ */ r.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer group",
              children: [
                /* @__PURE__ */ r.jsx(
                  "span",
                  {
                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${g.trigger === U.id ? "border-primary bg-primary" : "border-border group-hover:border-muted-foreground"}`,
                    children: g.trigger === U.id && /* @__PURE__ */ r.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { className: `text-sm transition-colors ${g.trigger === U.id ? "text-foreground" : "text-muted-foreground"}`, children: U.label })
              ]
            },
            U.id
          )) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground", children: he.label === "Token 上限" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            "当 Token 数超过 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: he.value }),
            " 时触发"
          ] }) : he.label === "楼层上限" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            "当楼层数超过 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: he.value }),
            " 层时触发"
          ] }) : /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            "当总结次数超过 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: he.value }),
            " 次时触发"
          ] }) }),
          /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(he.value - he.min) / (he.max - he.min) * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "range",
                min: he.min,
                max: he.max,
                step: he.step,
                value: he.value,
                onChange: (U) => {
                  const ee = Number(U.target.value), de = g.trigger === "token" ? "tokenLimit" : "countLimit";
                  te(de, ee);
                },
                className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                style: { appearance: "none", WebkitAppearance: "none" }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "保留最近 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: g.keepRecentCount ?? 3 }),
            " 条不合并"
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(g.keepRecentCount ?? 3) / 10 * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: 10,
                step: 1,
                value: g.keepRecentCount ?? 3,
                onChange: (U) => te("keepRecentCount", Number(U.target.value)),
                className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                style: { appearance: "none", WebkitAppearance: "none" }
              }
            )
          ] })
        ] }),
        S && /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { children: "待合并条目:" }),
            /* @__PURE__ */ r.jsx("span", { className: "font-mono", children: S.pendingEntryCount })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ r.jsxs("span", { children: [
              "当前",
              g.trigger === "token" ? "Token" : "条目数",
              ":"
            ] }),
            /* @__PURE__ */ r.jsxs("span", { className: `font-mono ${S.triggered ? "text-amber-500" : ""}`, children: [
              S.currentValue,
              " / ",
              he.value
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            onClick: ce,
            disabled: f || ((S == null ? void 0 : S.pendingEntryCount) ?? 0) < 2,
            children: [
              /* @__PURE__ */ r.jsx(Ng, { size: 14, className: f ? "animate-pulse" : "" }),
              f ? "精简中..." : "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, n5 = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ r.jsx(Zc, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ r.jsx(mr, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ r.jsx(F1, { size: 16 }) }
], l5 = [
  { id: "devlog", label: "模型日志", icon: Tg, linkTo: "devlog:model" },
  { id: "presets", label: "提示词模板", icon: p4, linkTo: "presets:prompt" }
], a5 = ({ onNavigate: u }) => {
  const [s, o] = A.useState("summary");
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "sticky top-0 z-10 bg-background -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 pt-2 -mt-2", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-2", children: [
      /* @__PURE__ */ r.jsx("div", { className: "flex overflow-x-auto gap-2 no-scrollbar", children: n5.map((c) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          onClick: () => o(c.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === c.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            c.icon && /* @__PURE__ */ r.jsx("span", { className: "w-4 h-4", children: c.icon }),
            c.label,
            s === c.id && /* @__PURE__ */ r.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" })
          ]
        },
        c.id
      )) }),
      /* @__PURE__ */ r.jsx(
        Ip,
        {
          links: l5,
          onNavigate: (c) => u == null ? void 0 : u(c)
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "summary" && /* @__PURE__ */ r.jsx(t5, {}),
      s === "vectorization" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ r.jsx(mr, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ r.jsx(S4, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, Qt = {
  primary: "#FFFFFF",
  grid: "#111111"
}, r5 = ({ onComplete: u }) => {
  const s = A.useRef(null), o = A.useRef(null), c = A.useRef(null), f = A.useRef(null), [m, x] = A.useState(!1);
  A.useEffect(() => {
    if (window.gsap) {
      x(!0);
      return;
    }
    const g = document.createElement("script");
    g.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", g.async = !0, g.onload = () => x(!0), document.body.appendChild(g);
  }, []);
  const p = () => {
    var q;
    if (!m || !o.current) return;
    const g = window.gsap, b = o.current, S = b.getTotalLength();
    g.set(b, {
      strokeDasharray: S,
      strokeDashoffset: S,
      stroke: Qt.primary,
      fillOpacity: 0,
      opacity: 1,
      strokeWidth: 2
    });
    const v = (q = c.current) == null ? void 0 : q.querySelectorAll("path");
    v && g.set(v, { opacity: 0, y: 10 }), g.set(f.current, { scale: 1, opacity: 1 }), g.set(s.current, { opacity: 1 });
    const R = g.timeline({
      onComplete: () => {
        g.to(s.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: u
        });
      }
    });
    R.to(b, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), v && R.to(v, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), R.to({}, { duration: 1 });
  };
  return A.useEffect(() => {
    if (m) {
      const g = setTimeout(p, 800);
      return () => clearTimeout(g);
    }
  }, [m]), /* @__PURE__ */ r.jsxs(
    "div",
    {
      ref: s,
      className: "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden",
      style: { touchAction: "none" },
      children: [
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: `
                        linear-gradient(to right, ${Qt.grid} 1px, transparent 1px),
                        linear-gradient(to bottom, ${Qt.grid} 1px, transparent 1px)
                    `,
              backgroundSize: "40px 40px",
              opacity: 0.3
            }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: { background: "radial-gradient(circle at center, transparent 0%, black 100%)", opacity: 0.9 }
          }
        ),
        /* @__PURE__ */ r.jsxs("div", { className: "z-10 relative flex flex-col items-center justify-center w-full h-full p-4", children: [
          /* @__PURE__ */ r.jsx("div", { className: "w-full max-w-[600px] md:max-w-[800px] aspect-[4/3]", children: /* @__PURE__ */ r.jsx(
            "svg",
            {
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "250 0 550 600",
              className: "w-full h-full overflow-visible",
              children: /* @__PURE__ */ r.jsxs("g", { ref: f, className: "origin-center", children: [
                /* @__PURE__ */ r.jsx(
                  "path",
                  {
                    ref: o,
                    fill: "none",
                    stroke: Qt.primary,
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M463.360840,364.455627 C437.246704,381.338409 406.466644,366.209045 404.026672,335.650848 C402.910156,321.667206 412.549713,306.544678 426.813293,300.633850 C430.474335,299.116699 431.826355,297.290924 431.760071,293.302460 C431.519287,278.808716 431.584564,264.307892 431.718292,249.811417 C431.748169,246.574463 430.886292,244.713684 427.681274,243.389038 C412.366425,237.059357 404.237366,225.144638 404.208862,208.867447 C404.179871,192.298615 412.621979,180.486938 428.224701,174.293686 C430.850494,173.251419 431.710938,171.751862 431.696136,169.060089 C431.613586,154.062912 431.568054,139.064117 431.723419,124.068092 C431.759430,120.590492 430.119568,119.052467 427.243103,117.790627 C413.349915,111.695946 405.841095,101.009903 404.195740,85.916542 C402.099884,66.690948 418.566650,47.364159 437.884277,46.682220 C456.888519,46.011345 468.064789,52.989845 476.252197,70.840332 C477.174438,72.851059 478.313995,73.541710 480.422974,73.516098 C499.569031,73.283493 518.722961,73.393646 537.862915,73.456795 C545.529785,73.482086 549.225952,71.767975 552.791809,64.663139 C559.898376,50.503635 576.618042,43.921410 592.447876,47.234680 C608.699890,50.636322 619.276489,62.116261 621.438904,78.701805 C623.839478,97.113228 612.679382,114.371338 595.357910,119.034004 C577.219604,123.916542 558.125427,115.204048 550.887390,98.365906 C549.251465,94.560234 547.316284,93.116508 543.150696,93.160004 C522.989380,93.370483 502.824707,93.284561 482.661285,93.261726 C479.716156,93.258385 477.395905,93.379341 475.956635,96.902077 C474.571899,100.291283 475.702576,102.070137 477.892181,104.225159 C501.524139,127.483910 525.127991,150.771423 548.653259,174.137985 C550.803162,176.273376 552.520325,176.380997 555.207153,175.171799 C569.642334,168.675354 583.205750,171.177368 594.759277,181.252563 C606.783813,191.738449 610.379395,205.504944 605.248840,220.725037 C600.321167,235.343246 589.568848,243.345337 574.305420,245.467117 C567.655396,246.391541 561.334045,245.373352 555.347839,242.591797 C552.373169,241.209595 550.274536,241.303284 547.832886,243.728531 C524.197693,267.205322 500.499634,290.619415 476.704651,313.934174 C474.165771,316.421844 475.106598,318.487793 476.015411,321.059723 C476.869354,323.476318 478.159149,324.356232 480.796143,324.332367 C501.456360,324.145294 522.118530,324.019531 542.778870,324.122131 C546.987793,324.143005 549.216675,322.931549 551.044983,318.871887 C558.230042,302.918091 576.073181,294.652069 593.497131,298.684143 C610.451355,302.607544 622.335205,317.668091 622.119812,334.958160 C621.900024,352.608002 609.316650,367.564362 591.822144,370.969543 C574.585754,374.324463 557.004028,364.861755 550.521484,348.456757 C549.268677,345.286346 547.631836,344.200745 544.294861,344.220337 C523.465576,344.342865 502.634888,344.322540 481.805359,344.218109 C478.697174,344.202545 476.993927,345.152252 475.888916,348.205902 C473.513214,354.771179 469.417969,360.183167 463.360840,364.455627 M472.733368,188.880936 C473.545441,190.333145 474.799072,191.702774 475.088898,193.252655 C476.058929,198.439468 479.434326,198.919983 483.888489,198.861130 C499.042145,198.660889 514.201233,198.707901 529.355957,198.872879 C532.819580,198.910583 534.700989,197.913788 536.177185,194.588806 C537.657104,191.255417 536.060120,189.735016 534.097900,187.805573 C510.706268,164.804840 487.354065,141.764008 463.949341,118.776604 C462.445251,117.299316 461.277863,114.441566 458.282349,116.423027 C455.343719,118.366882 451.028107,118.406143 451.180542,123.994591 C451.584534,138.807007 451.429443,153.638779 451.250458,168.459885 C451.208984,171.894135 452.474548,173.487930 455.559784,174.673798 C462.566864,177.367126 468.343140,181.758774 472.733368,188.880936 M457.308807,300.958954 C460.540070,302.823181 462.218414,300.310028 464.063263,298.488586 C487.164032,275.681519 510.248199,252.857559 533.326538,230.027756 C535.300171,228.075378 537.458679,226.516449 535.970032,222.843750 C534.495117,219.205124 532.067688,218.878906 528.898010,218.890778 C513.414001,218.948746 497.929138,219.002151 482.445862,218.887329 C478.998230,218.861771 477.090668,219.941055 475.670502,223.284790 C471.742218,232.533905 465.159332,239.474701 455.665497,243.103836 C452.239746,244.413376 451.216278,246.302231 451.253540,249.781387 C451.406891,264.098541 451.489380,278.421356 451.223358,292.735107 C451.142975,297.059998 452.224640,299.783386 457.308807,300.958954 z"
                  }
                ),
                /* @__PURE__ */ r.jsxs("g", { ref: c, children: [
                  /* @__PURE__ */ r.jsx("path", { fill: Qt.primary, d: "M732.215698,483.876190 C732.750061,488.775055 731.110779,490.523590 726.372742,490.479736 C713.642639,490.361908 713.645874,490.566711 713.641113,477.834442 C713.638428,470.668732 713.788818,463.497284 713.552246,456.338928 C713.318970,449.278015 710.633911,445.451111 705.788818,444.403778 C698.667542,442.864441 692.689270,447.076904 692.324463,454.647736 C691.851685,464.458313 691.862549,474.305084 692.048706,484.128967 C692.137085,488.792786 690.778625,490.578705 685.827454,490.500549 C672.843933,490.295532 672.845886,490.510315 672.820435,477.502625 C672.805786,470.003754 672.887146,462.502136 672.708618,455.006927 C672.557556,448.666412 669.519653,444.981689 664.341858,444.320343 C658.234436,443.540314 653.997803,446.541077 652.162415,452.864807 C651.503052,455.136719 651.331299,457.435608 651.335754,459.781158 C651.352234,468.446747 651.306274,477.112488 651.338745,485.777985 C651.348389,488.341766 651.062439,490.138977 647.717529,490.447815 C632.733521,491.831421 632.748596,491.913239 632.764404,477.031830 C632.778870,463.366852 632.738831,449.701782 632.731445,436.036774 C632.727478,428.732941 632.735718,428.732544 640.257812,428.707031 C641.591003,428.702484 642.924194,428.695312 644.257324,428.701721 C647.429321,428.717010 651.058289,427.916016 650.925598,433.229431 C655.308960,431.486603 658.595154,429.192383 662.595154,428.377930 C670.453491,426.777832 677.619019,428.117981 683.735718,433.181641 C686.512207,435.480164 688.239807,435.373474 690.953918,433.250153 C697.176208,428.382202 704.485840,426.832367 712.194946,428.080414 C725.100098,430.169739 731.944641,439.074829 732.175659,453.896454 C732.328857,463.726379 732.212036,473.560547 732.215698,483.876190 z" }),
                  /* @__PURE__ */ r.jsx("path", { fill: Qt.primary, d: "M487.575867,485.935303 C487.614716,484.616028 487.614716,483.640503 487.614716,481.796417 C479.116760,488.238525 470.153107,489.257660 460.718079,486.787720 C454.401794,485.134186 449.163879,481.675842 445.200134,476.457642 C436.960876,465.610748 437.295532,448.722229 445.889771,438.315796 C455.451538,426.737823 470.295227,425.042450 488.444458,433.733826 C487.913239,428.612457 491.194366,428.604004 494.772766,428.684540 C508.272736,428.988373 506.179840,426.849945 506.294434,440.421967 C506.411133,454.245575 506.366882,468.071228 506.299957,481.895538 C506.205750,501.359833 494.742065,512.847900 475.259460,513.370544 C465.272614,513.638489 455.717651,512.255005 446.682343,507.725311 C443.034790,505.896667 441.336151,503.847290 444.229065,500.105438 C444.329590,499.975464 444.390869,499.814941 444.469086,499.667908 C448.861603,491.411743 448.894196,491.340729 457.207886,495.157196 C463.352356,497.977905 469.817169,498.376801 476.285126,497.456818 C482.543640,496.566620 486.238434,492.476532 487.575867,485.935303 M469.264740,471.577881 C471.084900,471.642700 472.915710,471.865356 474.723328,471.743805 C481.074341,471.316620 486.258820,466.628052 487.489288,460.346558 C488.669373,454.322296 485.713593,448.118378 480.288971,445.234039 C472.426056,441.053253 462.868591,443.867035 459.399658,451.384033 C455.705688,459.388580 459.382996,467.492737 469.264740,471.577881 z" }),
                  /* @__PURE__ */ r.jsx("path", { fill: Qt.primary, d: "M350.790619,410.644409 C354.007477,410.561554 355.147522,411.945587 355.144592,414.620361 C355.128937,428.846375 356.152588,426.165161 344.558044,426.338898 C335.900940,426.468628 327.237854,426.493591 318.582581,426.315826 C314.804382,426.238220 313.157715,427.376373 313.262451,431.424896 C313.571655,443.375275 312.019470,441.570435 323.204529,441.691742 C330.530579,441.771271 337.860626,441.831665 345.183899,441.671692 C348.853607,441.591553 350.203705,443.056824 350.190338,446.675842 C350.143219,459.433014 350.725433,457.207275 340.024445,457.368561 C332.865692,457.476471 325.700195,457.536346 318.545349,457.339996 C314.731018,457.235291 313.250702,458.478516 313.234222,462.478668 C313.185364,474.308960 313.038177,474.321259 324.813477,474.130890 C334.298523,473.977539 343.772430,475.169159 353.264343,474.338776 C354.864075,474.198792 356.466827,474.576569 356.702301,476.439850 C357.203217,480.403656 357.364838,484.405273 356.646729,488.365631 C356.297211,490.293060 354.652405,490.369568 353.118927,490.370575 C334.801880,490.382568 316.484711,490.350647 298.167847,490.412506 C295.104187,490.422852 294.024323,488.921082 294.024200,486.130402 C294.023224,462.484924 294.047699,438.839325 293.967896,415.194092 C293.954620,411.261261 296.028046,410.593658 299.359711,410.610138 C316.344330,410.694275 333.329620,410.638672 350.790619,410.644409 z" }),
                  /* @__PURE__ */ r.jsx("path", { fill: Qt.primary, d: "M620.003906,453.402435 C620.062195,464.023071 619.882812,474.188721 620.189575,484.339661 C620.338318,489.262421 618.431458,490.973572 613.757507,490.452362 C611.783386,490.232208 609.754700,490.291412 607.767883,490.444916 C604.889648,490.667267 602.478821,490.168823 601.296570,486.513000 C594.831909,490.991821 587.888184,491.843719 580.600464,491.328247 C565.916626,490.289642 557.201233,476.053131 563.502625,463.374390 C565.502930,459.349640 568.872803,457.136932 572.794861,455.506927 C578.118103,453.294647 583.702881,452.709900 589.425354,452.731232 C592.879822,452.744110 596.387085,453.235260 599.791443,452.317169 C599.855774,446.843750 597.260681,443.903503 591.552673,443.177338 C585.446533,442.400513 579.495911,443.228607 574.179382,446.386688 C570.948853,448.305603 569.535645,447.214966 568.011658,444.340485 C563.043945,434.970917 563.058899,434.663818 573.199219,430.800537 C582.143921,427.392792 591.347961,426.734100 600.678101,428.904358 C613.358643,431.853943 619.173157,440.405762 620.003906,453.402435 M582.869263,466.083313 C579.496887,469.605530 579.013306,473.431427 581.947998,475.906952 C585.513611,478.914764 589.714966,478.291107 593.721985,477.031647 C597.412354,475.871704 599.990784,473.365112 600.658081,469.369629 C601.070496,466.900665 600.409729,465.044220 597.411255,465.098297 C592.800171,465.181488 588.157471,464.530182 582.869263,466.083313 z" }),
                  /* @__PURE__ */ r.jsx("path", { fill: Qt.primary, d: "M410.915314,457.280090 C410.311127,447.930115 406.925934,444.198608 399.452026,444.194855 C391.667114,444.190948 386.727997,448.953094 386.409271,457.536652 C386.075653,466.521088 386.068634,475.532593 386.350006,484.518738 C386.494904,489.147247 384.896912,490.532959 380.337830,490.481964 C367.440552,490.337616 367.627808,490.513641 367.533173,477.713593 C367.426025,463.226135 368.160004,448.728760 367.168365,434.251617 C366.898468,430.311462 368.239288,428.249725 372.529694,428.668640 C374.840057,428.894196 377.203857,428.868896 379.519684,428.673553 C383.194244,428.363556 385.817352,429.188293 385.487488,434.182526 C390.858826,430.844635 395.856995,428.304504 401.601257,427.794434 C418.292908,426.312286 429.386810,436.518799 429.975342,454.379517 C430.315308,464.696716 429.971527,475.035126 430.046204,485.363190 C430.071198,488.817627 428.985992,490.534210 425.145325,490.442291 C408.307220,490.039520 411.204895,492.848450 410.942963,476.734924 C410.840088,470.406036 410.927368,464.074036 410.915314,457.280090 z" }),
                  /* @__PURE__ */ r.jsx("path", { fill: Qt.primary, d: "M556.799500,444.921539 C554.214233,445.227783 552.026184,445.174683 549.913574,445.548401 C542.544189,446.852142 538.560974,452.210632 538.387756,461.266998 C538.231995,469.411011 538.239258,477.561676 538.377136,485.705963 C538.433838,489.055634 537.355591,490.537964 533.812988,490.447296 C516.656677,490.008148 519.942505,492.939087 519.712585,476.823181 C519.510925,462.693848 519.801025,448.557343 519.590698,434.428253 C519.527222,430.165985 520.732788,428.169983 525.216187,428.665833 C527.350830,428.901917 529.549255,428.854156 531.692566,428.654297 C535.487610,428.300446 537.940002,429.350586 537.432373,434.447845 C542.475464,431.817810 546.689819,428.862549 551.859985,428.147003 C557.409912,427.378845 558.504028,428.019318 558.285950,433.612213 C558.141113,437.327057 559.514648,441.236115 556.799500,444.921539 z" })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ r.jsx("p", { className: "mt-6 md:mt-8 text-white/30 text-xs md:text-sm tracking-widest uppercase", children: "Where memories leave their trace" })
        ] })
      ]
    }
  );
}, s5 = ({ onClose: u }) => {
  const [s, o] = A.useState("dashboard"), [c, f] = A.useState(!1), [m, x] = A.useState(!1);
  A.useEffect(() => {
    const b = setTimeout(() => {
      const S = Le.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", S), S || f(!0), x(!0);
    }, 1e3);
    return () => clearTimeout(b);
  }, []);
  const p = () => {
    Le.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), f(!1);
  };
  if (!m)
    return null;
  const g = () => {
    const [b, S] = s.split(":");
    switch (b) {
      case "dashboard":
        return /* @__PURE__ */ r.jsx(z1, { onNavigate: o });
      case "presets":
        return /* @__PURE__ */ r.jsx(Bp, { initialTab: S });
      case "graph":
        return /* @__PURE__ */ r.jsx(X3, {});
      case "devlog":
        return /* @__PURE__ */ r.jsx(ap, { initialTab: S });
      case "settings":
        return /* @__PURE__ */ r.jsx(Wp, {});
      case "memory":
        return /* @__PURE__ */ r.jsx(Fp, {});
      case "processing":
        return /* @__PURE__ */ r.jsx(a5, { onNavigate: o });
      default:
        return /* @__PURE__ */ r.jsx(z1, {});
    }
  };
  return /* @__PURE__ */ r.jsxs(cm, { children: [
    c && /* @__PURE__ */ r.jsx(r5, { onComplete: p }),
    /* @__PURE__ */ r.jsx(A3, { activeTab: s, setActiveTab: o, onClose: u, children: g() })
  ] });
};
var i5 = V1();
const o5 = /* @__PURE__ */ Yc(i5), c5 = () => {
  const [u, s] = A.useState(!1), [o, c] = A.useState(null), [f, m] = A.useState("");
  A.useEffect(() => {
    const g = bl.on(
      Vn.ENGRAM_REQUEST_REVISION,
      (b) => {
        const S = b;
        c(S), m(S.content), s(!0);
      }
    );
    return () => {
      g();
    };
  }, []);
  const x = () => {
    o && (o.onConfirm(f), s(!1), c(null));
  }, p = () => {
    o && o.onCancel(), s(!1), c(null);
  };
  return u ? o5.createPortal(
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[11000] flex items-center justify-center p-4",
        style: { height: "100dvh", width: "100vw" },
        children: [
          /* @__PURE__ */ r.jsx(
            "div",
            {
              className: "absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200",
              onClick: p
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "relative w-full max-w-2xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-border", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ r.jsx("h3", { className: "text-lg font-medium text-foreground tracking-tight", children: (o == null ? void 0 : o.title) || "内容修订" }),
                (o == null ? void 0 : o.description) && /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: o.description })
              ] }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  onClick: p,
                  className: "p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ r.jsx(Fs, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ r.jsx(Bg, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ r.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "请仔细检查内容的格式、关键信息和一致性。这是写入长期记忆前的最后确认。" })
              ] }),
              /* @__PURE__ */ r.jsx(
                "textarea",
                {
                  value: f,
                  onChange: (g) => m(g.target.value),
                  className: "flex-1 w-full min-h-[200px] p-4 bg-muted border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                  spellCheck: !1,
                  placeholder: "在此编辑内容..."
                }
              ),
              /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground text-right font-mono", children: [
                f.length,
                " 字符"
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-muted/30", children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  onClick: p,
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors",
                  style: { backgroundColor: "transparent" },
                  children: "取消"
                }
              ),
              /* @__PURE__ */ r.jsxs(
                "button",
                {
                  onClick: x,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-opacity",
                  style: {
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  },
                  children: [
                    /* @__PURE__ */ r.jsx(J1, { size: 16 }),
                    "确认写入"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    document.body
  ) : null;
};
L3((u, s) => {
  const o = X1.createRoot(u);
  return o.render(Fh.createElement(s5, { onClose: s })), o;
});
B3((u) => {
  const s = X1.createRoot(u);
  return s.render(
    /* @__PURE__ */ r.jsx(cm, { children: /* @__PURE__ */ r.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ r.jsx(c5, {}) }) })
  ), s;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", _1) : _1();
class jm {
  static init() {
    var s;
    if (!this.isInitialized)
      try {
        const o = ua();
        o != null && o.eventSource && ((s = o == null ? void 0 : o.event_types) != null && s.CHARACTER_DELETED) ? (o.eventSource.on(o.event_types.CHARACTER_DELETED, this.onCharacterDeleted.bind(this)), ae.info("CharacterDeleteService", "监听 CHARACTER_DELETED 事件成功"), this.isInitialized = !0) : ae.warn("CharacterDeleteService", "无法监听 CHARACTER_DELETED 事件: eventSource 或事件类型缺失");
      } catch (o) {
        ae.error("CharacterDeleteService", "初始化失败", o);
      }
  }
  static async onCharacterDeleted(s) {
    var v, R;
    const o = Le.getSettings().linkedDeletion;
    if (!(o != null && o.enabled)) return;
    ae.debug("CharacterDeleteService", "检测到角色删除", s);
    const c = s.character, f = (c == null ? void 0 : c.name) || (c == null ? void 0 : c.avatar) || (c == null ? void 0 : c.ch_name) || ((v = c == null ? void 0 : c.data) == null ? void 0 : v.name);
    if (!f) {
      ae.warn("CharacterDeleteService", "无法获取已删除角色的名称");
      return;
    }
    const m = /* @__PURE__ */ new Set();
    m.add(`[Engram] ${f}`), m.add(`Engram_${f}`);
    const x = c.data || c, p = (R = x == null ? void 0 : x.extensions) == null ? void 0 : R.world;
    p && typeof p == "string" && (ae.debug("CharacterDeleteService", `从角色数据中发现绑定世界书: ${p}`), m.add(p));
    const g = await Ce.getWorldbookNames(), b = new Set(g), S = Array.from(m).filter((q) => {
      if (!b.has(q)) return !1;
      const _ = q.toLowerCase().includes("engram");
      return _ || ae.info("CharacterDeleteService", `跳过非 Engram 世界书: ${q}`), _;
    });
    if (S.length === 0) {
      ae.debug("CharacterDeleteService", `未找到角色 "${f}" 关联的 Engram 世界书`);
      return;
    }
    if (ae.info("CharacterDeleteService", `准备删除关联世界书: ${S.join(", ")}`), o.showConfirmation) {
      const q = `
                <div style="font-size: 0.9em;">
                    <h3>🧹 Engram 联动清理</h3>
                    <p>检测到角色 <b>${f}</b> 已被删除。</p>
                    <p>发现以下关联的 Engram 记忆库：</p>
                    <ul style="max-height: 100px; overflow-y: auto; background: var(--black50a); padding: 5px; border-radius: 4px; list-style: none; margin: 10px 0;">
                        ${S.map((G) => `<li style="padding: 2px 0;">• ${G}</li>`).join("")}
                    </ul>
                    <p>是否一并删除？</p>
                    <small style="opacity: 0.7;">这将永久删除这些记忆库及其包含的所有摘要。</small>
                </div>
            `;
      if (!await Y3(q, "confirm")) {
        ae.info("CharacterDeleteService", "用户取消删除关联世界书");
        return;
      }
    }
    if (o.deleteWorldbook) {
      let q = 0;
      const _ = [];
      st.info("正在清理 Engram 记忆库...", "Engram");
      for (const G of S)
        try {
          await Ce.deleteWorldbook(G) ? (q++, ae.info("CharacterDeleteService", `已删除世界书: ${G}`)) : _.push(G);
        } catch (K) {
          ae.error("CharacterDeleteService", `删除世界书 ${G} 失败`, K), _.push(G);
        }
      q > 0 && st.success(`已清理 ${q} 个关联记忆库`, "Engram"), _.length > 0 && st.warning(`部分记忆库删除失败: ${_.join(", ")}`, "Engram");
    }
    o.deleteIndexedDB;
  }
}
qe(jm, "isInitialized", !1);
const u5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CharacterDeleteService: jm
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=index.js.map
