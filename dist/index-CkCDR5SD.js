var B1 = Object.defineProperty;
var H1 = (r, o, f) => o in r ? B1(r, o, { enumerable: !0, configurable: !0, writable: !0, value: f }) : r[o] = f;
var Dl = (r, o, f) => H1(r, typeof o != "symbol" ? o + "" : o, f);
var cy = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zm(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var qc = { exports: {} }, P = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xm;
function q1() {
  if (xm) return P;
  xm = 1;
  var r = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), g = Symbol.for("react.consumer"), T = Symbol.for("react.context"), z = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), N = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), _ = Symbol.for("react.activity"), w = Symbol.iterator;
  function Z(y) {
    return y === null || typeof y != "object" ? null : (y = w && y[w] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var ee = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, W = Object.assign, Ce = {};
  function Q(y, D, B) {
    this.props = y, this.context = D, this.refs = Ce, this.updater = B || ee;
  }
  Q.prototype.isReactComponent = {}, Q.prototype.setState = function(y, D) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, D, "setState");
  }, Q.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function Me() {
  }
  Me.prototype = Q.prototype;
  function H(y, D, B) {
    this.props = y, this.context = D, this.refs = Ce, this.updater = B || ee;
  }
  var ye = H.prototype = new Me();
  ye.constructor = H, W(ye, Q.prototype), ye.isPureReactComponent = !0;
  var Qe = Array.isArray;
  function J() {
  }
  var X = { H: null, A: null, T: null, S: null }, Te = Object.prototype.hasOwnProperty;
  function Ie(y, D, B) {
    var L = B.ref;
    return {
      $$typeof: r,
      type: y,
      key: D,
      ref: L !== void 0 ? L : null,
      props: B
    };
  }
  function St(y, D) {
    return Ie(y.type, D, y.props);
  }
  function jt(y) {
    return typeof y == "object" && y !== null && y.$$typeof === r;
  }
  function R(y) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(B) {
      return D[B];
    });
  }
  var $ = /\/+/g;
  function oe(y, D) {
    return typeof y == "object" && y !== null && y.key != null ? R("" + y.key) : D.toString(36);
  }
  function tt(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(J, J) : (y.status = "pending", y.then(
          function(D) {
            y.status === "pending" && (y.status = "fulfilled", y.value = D);
          },
          function(D) {
            y.status === "pending" && (y.status = "rejected", y.reason = D);
          }
        )), y.status) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function C(y, D, B, L, te) {
    var ne = typeof y;
    (ne === "undefined" || ne === "boolean") && (y = null);
    var he = !1;
    if (y === null) he = !0;
    else
      switch (ne) {
        case "bigint":
        case "string":
        case "number":
          he = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case r:
            case o:
              he = !0;
              break;
            case U:
              return he = y._init, C(
                he(y._payload),
                D,
                B,
                L,
                te
              );
          }
      }
    if (he)
      return te = te(y), he = L === "" ? "." + oe(y, 0) : L, Qe(te) ? (B = "", he != null && (B = he.replace($, "$&/") + "/"), C(te, D, B, "", function(Ga) {
        return Ga;
      })) : te != null && (jt(te) && (te = St(
        te,
        B + (te.key == null || y && y.key === te.key ? "" : ("" + te.key).replace(
          $,
          "$&/"
        ) + "/") + he
      )), D.push(te)), 1;
    he = 0;
    var Pe = L === "" ? "." : L + ":";
    if (Qe(y))
      for (var Ue = 0; Ue < y.length; Ue++)
        L = y[Ue], ne = Pe + oe(L, Ue), he += C(
          L,
          D,
          B,
          ne,
          te
        );
    else if (Ue = Z(y), typeof Ue == "function")
      for (y = Ue.call(y), Ue = 0; !(L = y.next()).done; )
        L = L.value, ne = Pe + oe(L, Ue++), he += C(
          L,
          D,
          B,
          ne,
          te
        );
    else if (ne === "object") {
      if (typeof y.then == "function")
        return C(
          tt(y),
          D,
          B,
          L,
          te
        );
      throw D = String(y), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return he;
  }
  function k(y, D, B) {
    if (y == null) return y;
    var L = [], te = 0;
    return C(y, L, "", "", function(ne) {
      return D.call(B, ne, te++);
    }), L;
  }
  function I(y) {
    if (y._status === -1) {
      var D = y._result;
      D = D(), D.then(
        function(B) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = B);
        },
        function(B) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = B);
        }
      ), y._status === -1 && (y._status = 0, y._result = D);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  }, je = {
    map: k,
    forEach: function(y, D, B) {
      k(
        y,
        function() {
          D.apply(this, arguments);
        },
        B
      );
    },
    count: function(y) {
      var D = 0;
      return k(y, function() {
        D++;
      }), D;
    },
    toArray: function(y) {
      return k(y, function(D) {
        return D;
      }) || [];
    },
    only: function(y) {
      if (!jt(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return P.Activity = _, P.Children = je, P.Component = Q, P.Fragment = f, P.Profiler = h, P.PureComponent = H, P.StrictMode = s, P.Suspense = x, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = X, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return X.H.useMemoCache(y);
    }
  }, P.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(y, D, B) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var L = W({}, y.props), te = y.key;
    if (D != null)
      for (ne in D.key !== void 0 && (te = "" + D.key), D)
        !Te.call(D, ne) || ne === "key" || ne === "__self" || ne === "__source" || ne === "ref" && D.ref === void 0 || (L[ne] = D[ne]);
    var ne = arguments.length - 2;
    if (ne === 1) L.children = B;
    else if (1 < ne) {
      for (var he = Array(ne), Pe = 0; Pe < ne; Pe++)
        he[Pe] = arguments[Pe + 2];
      L.children = he;
    }
    return Ie(y.type, te, L);
  }, P.createContext = function(y) {
    return y = {
      $$typeof: T,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: g,
      _context: y
    }, y;
  }, P.createElement = function(y, D, B) {
    var L, te = {}, ne = null;
    if (D != null)
      for (L in D.key !== void 0 && (ne = "" + D.key), D)
        Te.call(D, L) && L !== "key" && L !== "__self" && L !== "__source" && (te[L] = D[L]);
    var he = arguments.length - 2;
    if (he === 1) te.children = B;
    else if (1 < he) {
      for (var Pe = Array(he), Ue = 0; Ue < he; Ue++)
        Pe[Ue] = arguments[Ue + 2];
      te.children = Pe;
    }
    if (y && y.defaultProps)
      for (L in he = y.defaultProps, he)
        te[L] === void 0 && (te[L] = he[L]);
    return Ie(y, ne, te);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(y) {
    return { $$typeof: z, render: y };
  }, P.isValidElement = jt, P.lazy = function(y) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: y },
      _init: I
    };
  }, P.memo = function(y, D) {
    return {
      $$typeof: N,
      type: y,
      compare: D === void 0 ? null : D
    };
  }, P.startTransition = function(y) {
    var D = X.T, B = {};
    X.T = B;
    try {
      var L = y(), te = X.S;
      te !== null && te(B, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(J, ve);
    } catch (ne) {
      ve(ne);
    } finally {
      D !== null && B.types !== null && (D.types = B.types), X.T = D;
    }
  }, P.unstable_useCacheRefresh = function() {
    return X.H.useCacheRefresh();
  }, P.use = function(y) {
    return X.H.use(y);
  }, P.useActionState = function(y, D, B) {
    return X.H.useActionState(y, D, B);
  }, P.useCallback = function(y, D) {
    return X.H.useCallback(y, D);
  }, P.useContext = function(y) {
    return X.H.useContext(y);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(y, D) {
    return X.H.useDeferredValue(y, D);
  }, P.useEffect = function(y, D) {
    return X.H.useEffect(y, D);
  }, P.useEffectEvent = function(y) {
    return X.H.useEffectEvent(y);
  }, P.useId = function() {
    return X.H.useId();
  }, P.useImperativeHandle = function(y, D, B) {
    return X.H.useImperativeHandle(y, D, B);
  }, P.useInsertionEffect = function(y, D) {
    return X.H.useInsertionEffect(y, D);
  }, P.useLayoutEffect = function(y, D) {
    return X.H.useLayoutEffect(y, D);
  }, P.useMemo = function(y, D) {
    return X.H.useMemo(y, D);
  }, P.useOptimistic = function(y, D) {
    return X.H.useOptimistic(y, D);
  }, P.useReducer = function(y, D, B) {
    return X.H.useReducer(y, D, B);
  }, P.useRef = function(y) {
    return X.H.useRef(y);
  }, P.useState = function(y) {
    return X.H.useState(y);
  }, P.useSyncExternalStore = function(y, D, B) {
    return X.H.useSyncExternalStore(
      y,
      D,
      B
    );
  }, P.useTransition = function() {
    return X.H.useTransition();
  }, P.version = "19.2.3", P;
}
var bm;
function us() {
  return bm || (bm = 1, qc.exports = q1()), qc.exports;
}
var G = us();
const Km = /* @__PURE__ */ Zm(G);
var Lc = { exports: {} }, kn = {}, Yc = { exports: {} }, Gc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sm;
function L1() {
  return Sm || (Sm = 1, (function(r) {
    function o(C, k) {
      var I = C.length;
      C.push(k);
      e: for (; 0 < I; ) {
        var ve = I - 1 >>> 1, je = C[ve];
        if (0 < h(je, k))
          C[ve] = k, C[I] = je, I = ve;
        else break e;
      }
    }
    function f(C) {
      return C.length === 0 ? null : C[0];
    }
    function s(C) {
      if (C.length === 0) return null;
      var k = C[0], I = C.pop();
      if (I !== k) {
        C[0] = I;
        e: for (var ve = 0, je = C.length, y = je >>> 1; ve < y; ) {
          var D = 2 * (ve + 1) - 1, B = C[D], L = D + 1, te = C[L];
          if (0 > h(B, I))
            L < je && 0 > h(te, B) ? (C[ve] = te, C[L] = I, ve = L) : (C[ve] = B, C[D] = I, ve = D);
          else if (L < je && 0 > h(te, I))
            C[ve] = te, C[L] = I, ve = L;
          else break e;
        }
      }
      return k;
    }
    function h(C, k) {
      var I = C.sortIndex - k.sortIndex;
      return I !== 0 ? I : C.id - k.id;
    }
    if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var g = performance;
      r.unstable_now = function() {
        return g.now();
      };
    } else {
      var T = Date, z = T.now();
      r.unstable_now = function() {
        return T.now() - z;
      };
    }
    var x = [], N = [], U = 1, _ = null, w = 3, Z = !1, ee = !1, W = !1, Ce = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Me = typeof clearTimeout == "function" ? clearTimeout : null, H = typeof setImmediate < "u" ? setImmediate : null;
    function ye(C) {
      for (var k = f(N); k !== null; ) {
        if (k.callback === null) s(N);
        else if (k.startTime <= C)
          s(N), k.sortIndex = k.expirationTime, o(x, k);
        else break;
        k = f(N);
      }
    }
    function Qe(C) {
      if (W = !1, ye(C), !ee)
        if (f(x) !== null)
          ee = !0, J || (J = !0, R());
        else {
          var k = f(N);
          k !== null && tt(Qe, k.startTime - C);
        }
    }
    var J = !1, X = -1, Te = 5, Ie = -1;
    function St() {
      return Ce ? !0 : !(r.unstable_now() - Ie < Te);
    }
    function jt() {
      if (Ce = !1, J) {
        var C = r.unstable_now();
        Ie = C;
        var k = !0;
        try {
          e: {
            ee = !1, W && (W = !1, Me(X), X = -1), Z = !0;
            var I = w;
            try {
              t: {
                for (ye(C), _ = f(x); _ !== null && !(_.expirationTime > C && St()); ) {
                  var ve = _.callback;
                  if (typeof ve == "function") {
                    _.callback = null, w = _.priorityLevel;
                    var je = ve(
                      _.expirationTime <= C
                    );
                    if (C = r.unstable_now(), typeof je == "function") {
                      _.callback = je, ye(C), k = !0;
                      break t;
                    }
                    _ === f(x) && s(x), ye(C);
                  } else s(x);
                  _ = f(x);
                }
                if (_ !== null) k = !0;
                else {
                  var y = f(N);
                  y !== null && tt(
                    Qe,
                    y.startTime - C
                  ), k = !1;
                }
              }
              break e;
            } finally {
              _ = null, w = I, Z = !1;
            }
            k = void 0;
          }
        } finally {
          k ? R() : J = !1;
        }
      }
    }
    var R;
    if (typeof H == "function")
      R = function() {
        H(jt);
      };
    else if (typeof MessageChannel < "u") {
      var $ = new MessageChannel(), oe = $.port2;
      $.port1.onmessage = jt, R = function() {
        oe.postMessage(null);
      };
    } else
      R = function() {
        Q(jt, 0);
      };
    function tt(C, k) {
      X = Q(function() {
        C(r.unstable_now());
      }, k);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, r.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Te = 0 < C ? Math.floor(1e3 / C) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, r.unstable_next = function(C) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var k = 3;
          break;
        default:
          k = w;
      }
      var I = w;
      w = k;
      try {
        return C();
      } finally {
        w = I;
      }
    }, r.unstable_requestPaint = function() {
      Ce = !0;
    }, r.unstable_runWithPriority = function(C, k) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var I = w;
      w = C;
      try {
        return k();
      } finally {
        w = I;
      }
    }, r.unstable_scheduleCallback = function(C, k, I) {
      var ve = r.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? ve + I : ve) : I = ve, C) {
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
      return je = I + je, C = {
        id: U++,
        callback: k,
        priorityLevel: C,
        startTime: I,
        expirationTime: je,
        sortIndex: -1
      }, I > ve ? (C.sortIndex = I, o(N, C), f(x) === null && C === f(N) && (W ? (Me(X), X = -1) : W = !0, tt(Qe, I - ve))) : (C.sortIndex = je, o(x, C), ee || Z || (ee = !0, J || (J = !0, R()))), C;
    }, r.unstable_shouldYield = St, r.unstable_wrapCallback = function(C) {
      var k = w;
      return function() {
        var I = w;
        w = k;
        try {
          return C.apply(this, arguments);
        } finally {
          w = I;
        }
      };
    };
  })(Gc)), Gc;
}
var jm;
function Y1() {
  return jm || (jm = 1, Yc.exports = L1()), Yc.exports;
}
var Qc = { exports: {} }, Fe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nm;
function G1() {
  if (Nm) return Fe;
  Nm = 1;
  var r = us();
  function o(x) {
    var N = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      N += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        N += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + x + "; visit " + N + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f() {
  }
  var s = {
    d: {
      f,
      r: function() {
        throw Error(o(522));
      },
      D: f,
      C: f,
      L: f,
      m: f,
      X: f,
      S: f,
      M: f
    },
    p: 0,
    findDOMNode: null
  }, h = Symbol.for("react.portal");
  function g(x, N, U) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: _ == null ? null : "" + _,
      children: x,
      containerInfo: N,
      implementation: U
    };
  }
  var T = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function z(x, N) {
    if (x === "font") return "";
    if (typeof N == "string")
      return N === "use-credentials" ? N : "";
  }
  return Fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Fe.createPortal = function(x, N) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!N || N.nodeType !== 1 && N.nodeType !== 9 && N.nodeType !== 11)
      throw Error(o(299));
    return g(x, N, null, U);
  }, Fe.flushSync = function(x) {
    var N = T.T, U = s.p;
    try {
      if (T.T = null, s.p = 2, x) return x();
    } finally {
      T.T = N, s.p = U, s.d.f();
    }
  }, Fe.preconnect = function(x, N) {
    typeof x == "string" && (N ? (N = N.crossOrigin, N = typeof N == "string" ? N === "use-credentials" ? N : "" : void 0) : N = null, s.d.C(x, N));
  }, Fe.prefetchDNS = function(x) {
    typeof x == "string" && s.d.D(x);
  }, Fe.preinit = function(x, N) {
    if (typeof x == "string" && N && typeof N.as == "string") {
      var U = N.as, _ = z(U, N.crossOrigin), w = typeof N.integrity == "string" ? N.integrity : void 0, Z = typeof N.fetchPriority == "string" ? N.fetchPriority : void 0;
      U === "style" ? s.d.S(
        x,
        typeof N.precedence == "string" ? N.precedence : void 0,
        {
          crossOrigin: _,
          integrity: w,
          fetchPriority: Z
        }
      ) : U === "script" && s.d.X(x, {
        crossOrigin: _,
        integrity: w,
        fetchPriority: Z,
        nonce: typeof N.nonce == "string" ? N.nonce : void 0
      });
    }
  }, Fe.preinitModule = function(x, N) {
    if (typeof x == "string")
      if (typeof N == "object" && N !== null) {
        if (N.as == null || N.as === "script") {
          var U = z(
            N.as,
            N.crossOrigin
          );
          s.d.M(x, {
            crossOrigin: U,
            integrity: typeof N.integrity == "string" ? N.integrity : void 0,
            nonce: typeof N.nonce == "string" ? N.nonce : void 0
          });
        }
      } else N == null && s.d.M(x);
  }, Fe.preload = function(x, N) {
    if (typeof x == "string" && typeof N == "object" && N !== null && typeof N.as == "string") {
      var U = N.as, _ = z(U, N.crossOrigin);
      s.d.L(x, U, {
        crossOrigin: _,
        integrity: typeof N.integrity == "string" ? N.integrity : void 0,
        nonce: typeof N.nonce == "string" ? N.nonce : void 0,
        type: typeof N.type == "string" ? N.type : void 0,
        fetchPriority: typeof N.fetchPriority == "string" ? N.fetchPriority : void 0,
        referrerPolicy: typeof N.referrerPolicy == "string" ? N.referrerPolicy : void 0,
        imageSrcSet: typeof N.imageSrcSet == "string" ? N.imageSrcSet : void 0,
        imageSizes: typeof N.imageSizes == "string" ? N.imageSizes : void 0,
        media: typeof N.media == "string" ? N.media : void 0
      });
    }
  }, Fe.preloadModule = function(x, N) {
    if (typeof x == "string")
      if (N) {
        var U = z(N.as, N.crossOrigin);
        s.d.m(x, {
          as: typeof N.as == "string" && N.as !== "script" ? N.as : void 0,
          crossOrigin: U,
          integrity: typeof N.integrity == "string" ? N.integrity : void 0
        });
      } else s.d.m(x);
  }, Fe.requestFormReset = function(x) {
    s.d.r(x);
  }, Fe.unstable_batchedUpdates = function(x, N) {
    return x(N);
  }, Fe.useFormState = function(x, N, U) {
    return T.H.useFormState(x, N, U);
  }, Fe.useFormStatus = function() {
    return T.H.useHostTransitionStatus();
  }, Fe.version = "19.2.3", Fe;
}
var Tm;
function Q1() {
  if (Tm) return Qc.exports;
  Tm = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (o) {
        console.error(o);
      }
  }
  return r(), Qc.exports = G1(), Qc.exports;
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
var Em;
function X1() {
  if (Em) return kn;
  Em = 1;
  var r = Y1(), o = us(), f = Q1();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function g(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function T(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function z(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function x(e) {
    if (g(e) !== e)
      throw Error(s(188));
  }
  function N(e) {
    var t = e.alternate;
    if (!t) {
      if (t = g(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return x(n), e;
          if (u === a) return x(n), t;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var c = !1, d = n.child; d; ) {
          if (d === l) {
            c = !0, l = n, a = u;
            break;
          }
          if (d === a) {
            c = !0, a = n, l = u;
            break;
          }
          d = d.sibling;
        }
        if (!c) {
          for (d = u.child; d; ) {
            if (d === l) {
              c = !0, l = u, a = n;
              break;
            }
            if (d === a) {
              c = !0, a = u, l = n;
              break;
            }
            d = d.sibling;
          }
          if (!c) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? e : t;
  }
  function U(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = U(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var _ = Object.assign, w = Symbol.for("react.element"), Z = Symbol.for("react.transitional.element"), ee = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), Ce = Symbol.for("react.strict_mode"), Q = Symbol.for("react.profiler"), Me = Symbol.for("react.consumer"), H = Symbol.for("react.context"), ye = Symbol.for("react.forward_ref"), Qe = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), Te = Symbol.for("react.lazy"), Ie = Symbol.for("react.activity"), St = Symbol.for("react.memo_cache_sentinel"), jt = Symbol.iterator;
  function R(e) {
    return e === null || typeof e != "object" ? null : (e = jt && e[jt] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var $ = Symbol.for("react.client.reference");
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === $ ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case W:
        return "Fragment";
      case Q:
        return "Profiler";
      case Ce:
        return "StrictMode";
      case Qe:
        return "Suspense";
      case J:
        return "SuspenseList";
      case Ie:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ee:
          return "Portal";
        case H:
          return e.displayName || "Context";
        case Me:
          return (e._context.displayName || "Context") + ".Consumer";
        case ye:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case X:
          return t = e.displayName || null, t !== null ? t : oe(e.type) || "Memo";
        case Te:
          t = e._payload, e = e._init;
          try {
            return oe(e(t));
          } catch {
          }
      }
    return null;
  }
  var tt = Array.isArray, C = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ve = [], je = -1;
  function y(e) {
    return { current: e };
  }
  function D(e) {
    0 > je || (e.current = ve[je], ve[je] = null, je--);
  }
  function B(e, t) {
    je++, ve[je] = e.current, e.current = t;
  }
  var L = y(null), te = y(null), ne = y(null), he = y(null);
  function Pe(e, t) {
    switch (B(ne, t), B(te, e), B(L, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Gd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Gd(t), e = Qd(t, e);
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
    D(L), B(L, e);
  }
  function Ue() {
    D(L), D(te), D(ne);
  }
  function Ga(e) {
    e.memoizedState !== null && B(he, e);
    var t = L.current, l = Qd(t, e.type);
    t !== l && (B(te, e), B(L, l));
  }
  function Qn(e) {
    te.current === e && (D(L), D(te)), he.current === e && (D(he), Dn._currentValue = I);
  }
  var Si, gs;
  function Rl(e) {
    if (Si === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Si = t && t[1] || "", gs = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Si + e + gs;
  }
  var ji = !1;
  function Ni(e, t) {
    if (!e || ji) return "";
    ji = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var O = function() {
                throw Error();
              };
              if (Object.defineProperty(O.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(O, []);
                } catch (E) {
                  var j = E;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (E) {
                  j = E;
                }
                e.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (E) {
                j = E;
              }
              (O = e()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (E) {
            if (E && j && typeof E.stack == "string")
              return [E.stack, j.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), c = u[0], d = u[1];
      if (c && d) {
        var m = c.split(`
`), S = d.split(`
`);
        for (n = a = 0; a < m.length && !m[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < S.length && !S[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === m.length || n === S.length)
          for (a = m.length - 1, n = S.length - 1; 1 <= a && 0 <= n && m[a] !== S[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (m[a] !== S[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || m[a] !== S[n]) {
                  var A = `
` + m[a].replace(" at new ", " at ");
                  return e.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", e.displayName)), A;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ji = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Rl(l) : "";
  }
  function h0(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Rl(e.type);
      case 16:
        return Rl("Lazy");
      case 13:
        return e.child !== t && t !== null ? Rl("Suspense Fallback") : Rl("Suspense");
      case 19:
        return Rl("SuspenseList");
      case 0:
      case 15:
        return Ni(e.type, !1);
      case 11:
        return Ni(e.type.render, !1);
      case 1:
        return Ni(e.type, !0);
      case 31:
        return Rl("Activity");
      default:
        return "";
    }
  }
  function ys(e) {
    try {
      var t = "", l = null;
      do
        t += h0(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ti = Object.prototype.hasOwnProperty, Ei = r.unstable_scheduleCallback, _i = r.unstable_cancelCallback, p0 = r.unstable_shouldYield, g0 = r.unstable_requestPaint, ft = r.unstable_now, y0 = r.unstable_getCurrentPriorityLevel, vs = r.unstable_ImmediatePriority, xs = r.unstable_UserBlockingPriority, Xn = r.unstable_NormalPriority, v0 = r.unstable_LowPriority, bs = r.unstable_IdlePriority, x0 = r.log, b0 = r.unstable_setDisableYieldValue, Qa = null, dt = null;
  function rl(e) {
    if (typeof x0 == "function" && b0(e), dt && typeof dt.setStrictMode == "function")
      try {
        dt.setStrictMode(Qa, e);
      } catch {
      }
  }
  var mt = Math.clz32 ? Math.clz32 : N0, S0 = Math.log, j0 = Math.LN2;
  function N0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (S0(e) / j0 | 0) | 0;
  }
  var Vn = 256, Zn = 262144, Kn = 4194304;
  function wl(e) {
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
  function Jn(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = e.suspendedLanes, c = e.pingedLanes;
    e = e.warmLanes;
    var d = a & 134217727;
    return d !== 0 ? (a = d & ~u, a !== 0 ? n = wl(a) : (c &= d, c !== 0 ? n = wl(c) : l || (l = d & ~e, l !== 0 && (n = wl(l))))) : (d = a & ~u, d !== 0 ? n = wl(d) : c !== 0 ? n = wl(c) : l || (l = a & ~e, l !== 0 && (n = wl(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : n;
  }
  function Xa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function T0(e, t) {
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
  function Ss() {
    var e = Kn;
    return Kn <<= 1, (Kn & 62914560) === 0 && (Kn = 4194304), e;
  }
  function zi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Va(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function E0(e, t, l, a, n, u) {
    var c = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var d = e.entanglements, m = e.expirationTimes, S = e.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var A = 31 - mt(l), O = 1 << A;
      d[A] = 0, m[A] = -1;
      var j = S[A];
      if (j !== null)
        for (S[A] = null, A = 0; A < j.length; A++) {
          var E = j[A];
          E !== null && (E.lane &= -536870913);
        }
      l &= ~O;
    }
    a !== 0 && js(e, a, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function js(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - mt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function Ns(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - mt(l), n = 1 << a;
      n & t | e[a] & t && (e[a] |= t), l &= ~n;
    }
  }
  function Ts(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Ai(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Ai(e) {
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
  function Ci(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Es() {
    var e = k.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : dm(e.type));
  }
  function _s(e, t) {
    var l = k.p;
    try {
      return k.p = e, t();
    } finally {
      k.p = l;
    }
  }
  var cl = Math.random().toString(36).slice(2), Xe = "__reactFiber$" + cl, lt = "__reactProps$" + cl, ta = "__reactContainer$" + cl, Mi = "__reactEvents$" + cl, _0 = "__reactListeners$" + cl, z0 = "__reactHandles$" + cl, zs = "__reactResources$" + cl, Za = "__reactMarker$" + cl;
  function Oi(e) {
    delete e[Xe], delete e[lt], delete e[Mi], delete e[_0], delete e[z0];
  }
  function la(e) {
    var t = e[Xe];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[ta] || l[Xe]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Fd(e); e !== null; ) {
            if (l = e[Xe]) return l;
            e = Fd(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function aa(e) {
    if (e = e[Xe] || e[ta]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ka(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function na(e) {
    var t = e[zs];
    return t || (t = e[zs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ye(e) {
    e[Za] = !0;
  }
  var As = /* @__PURE__ */ new Set(), Cs = {};
  function kl(e, t) {
    ua(e, t), ua(e + "Capture", t);
  }
  function ua(e, t) {
    for (Cs[e] = t, e = 0; e < t.length; e++)
      As.add(t[e]);
  }
  var A0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ms = {}, Os = {};
  function C0(e) {
    return Ti.call(Os, e) ? !0 : Ti.call(Ms, e) ? !1 : A0.test(e) ? Os[e] = !0 : (Ms[e] = !0, !1);
  }
  function $n(e, t, l) {
    if (C0(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function Fn(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function Qt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
    }
  }
  function Nt(e) {
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
  function Ds(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function M0(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(c) {
          l = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(c) {
          l = "" + c;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Di(e) {
    if (!e._valueTracker) {
      var t = Ds(e) ? "checked" : "value";
      e._valueTracker = M0(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Us(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = Ds(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Wn(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var O0 = /[\n"\\]/g;
  function Tt(e) {
    return e.replace(
      O0,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ui(e, t, l, a, n, u, c, d) {
    e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Nt(t)) : e.value !== "" + Nt(t) && (e.value = "" + Nt(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? Ri(e, c, Nt(t)) : l != null ? Ri(e, c, Nt(l)) : a != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Nt(d) : e.removeAttribute("name");
  }
  function Rs(e, t, l, a, n, u, c, d) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Di(e);
        return;
      }
      l = l != null ? "" + Nt(l) : "", t = t != null ? "" + Nt(t) : l, d || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = d ? e.checked : !!a, e.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), Di(e);
  }
  function Ri(e, t, l) {
    t === "number" && Wn(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function ia(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < l.length; n++)
        t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Nt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          e[n].selected = !0, a && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ws(e, t, l) {
    if (t != null && (t = "" + Nt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Nt(l) : "";
  }
  function ks(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (tt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = Nt(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), Di(e);
  }
  function ra(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var D0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bs(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || D0.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Hs(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && l[n] !== a && Bs(e, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Bs(e, u, t[u]);
  }
  function wi(e) {
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
  var U0 = /* @__PURE__ */ new Map([
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
  ]), R0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function In(e) {
    return R0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Xt() {
  }
  var ki = null;
  function Bi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ca = null, sa = null;
  function qs(e) {
    var t = aa(e);
    if (t && (e = t.stateNode)) {
      var l = e[lt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ui(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Tt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[lt] || null;
                if (!n) throw Error(s(90));
                Ui(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              a = l[t], a.form === e.form && Us(a);
          }
          break e;
        case "textarea":
          ws(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && ia(e, !!l.multiple, t, !1);
      }
    }
  }
  var Hi = !1;
  function Ls(e, t, l) {
    if (Hi) return e(t, l);
    Hi = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Hi = !1, (ca !== null || sa !== null) && (qu(), ca && (t = ca, e = sa, sa = ca = null, qs(t), e)))
        for (t = 0; t < e.length; t++) qs(e[t]);
    }
  }
  function Ja(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[lt] || null;
    if (a === null) return null;
    l = a[t];
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
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        s(231, t, typeof l)
      );
    return l;
  }
  var Vt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qi = !1;
  if (Vt)
    try {
      var $a = {};
      Object.defineProperty($a, "passive", {
        get: function() {
          qi = !0;
        }
      }), window.addEventListener("test", $a, $a), window.removeEventListener("test", $a, $a);
    } catch {
      qi = !1;
    }
  var sl = null, Li = null, Pn = null;
  function Ys() {
    if (Pn) return Pn;
    var e, t = Li, l = t.length, a, n = "value" in sl ? sl.value : sl.textContent, u = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++) ;
    var c = l - e;
    for (a = 1; a <= c && t[l - a] === n[u - a]; a++) ;
    return Pn = n.slice(e, 1 < a ? 1 - a : void 0);
  }
  function eu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function tu() {
    return !0;
  }
  function Gs() {
    return !1;
  }
  function at(e) {
    function t(l, a, n, u, c) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var d in e)
        e.hasOwnProperty(d) && (l = e[d], this[d] = l ? l(u) : u[d]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? tu : Gs, this.isPropagationStopped = Gs, this;
    }
    return _(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = tu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = tu);
      },
      persist: function() {
      },
      isPersistent: tu
    }), t;
  }
  var Bl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, lu = at(Bl), Fa = _({}, Bl, { view: 0, detail: 0 }), w0 = at(Fa), Yi, Gi, Wa, au = _({}, Fa, {
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
    getModifierState: Xi,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Wa && (Wa && e.type === "mousemove" ? (Yi = e.screenX - Wa.screenX, Gi = e.screenY - Wa.screenY) : Gi = Yi = 0, Wa = e), Yi);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Gi;
    }
  }), Qs = at(au), k0 = _({}, au, { dataTransfer: 0 }), B0 = at(k0), H0 = _({}, Fa, { relatedTarget: 0 }), Qi = at(H0), q0 = _({}, Bl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), L0 = at(q0), Y0 = _({}, Bl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), G0 = at(Y0), Q0 = _({}, Bl, { data: 0 }), Xs = at(Q0), X0 = {
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
  }, V0 = {
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
  }, Z0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function K0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Z0[e]) ? !!t[e] : !1;
  }
  function Xi() {
    return K0;
  }
  var J0 = _({}, Fa, {
    key: function(e) {
      if (e.key) {
        var t = X0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = eu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? V0[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Xi,
    charCode: function(e) {
      return e.type === "keypress" ? eu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? eu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), $0 = at(J0), F0 = _({}, au, {
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
  }), Vs = at(F0), W0 = _({}, Fa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xi
  }), I0 = at(W0), P0 = _({}, Bl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eh = at(P0), th = _({}, au, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), lh = at(th), ah = _({}, Bl, {
    newState: 0,
    oldState: 0
  }), nh = at(ah), uh = [9, 13, 27, 32], Vi = Vt && "CompositionEvent" in window, Ia = null;
  Vt && "documentMode" in document && (Ia = document.documentMode);
  var ih = Vt && "TextEvent" in window && !Ia, Zs = Vt && (!Vi || Ia && 8 < Ia && 11 >= Ia), Ks = " ", Js = !1;
  function $s(e, t) {
    switch (e) {
      case "keyup":
        return uh.indexOf(t.keyCode) !== -1;
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
  function Fs(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oa = !1;
  function rh(e, t) {
    switch (e) {
      case "compositionend":
        return Fs(t);
      case "keypress":
        return t.which !== 32 ? null : (Js = !0, Ks);
      case "textInput":
        return e = t.data, e === Ks && Js ? null : e;
      default:
        return null;
    }
  }
  function ch(e, t) {
    if (oa)
      return e === "compositionend" || !Vi && $s(e, t) ? (e = Ys(), Pn = Li = sl = null, oa = !1, e) : null;
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
        return Zs && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var sh = {
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
  function Ws(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!sh[e.type] : t === "textarea";
  }
  function Is(e, t, l, a) {
    ca ? sa ? sa.push(a) : sa = [a] : ca = a, t = Zu(t, "onChange"), 0 < t.length && (l = new lu(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var Pa = null, en = null;
  function oh(e) {
    kd(e, 0);
  }
  function nu(e) {
    var t = Ka(e);
    if (Us(t)) return e;
  }
  function Ps(e, t) {
    if (e === "change") return t;
  }
  var eo = !1;
  if (Vt) {
    var Zi;
    if (Vt) {
      var Ki = "oninput" in document;
      if (!Ki) {
        var to = document.createElement("div");
        to.setAttribute("oninput", "return;"), Ki = typeof to.oninput == "function";
      }
      Zi = Ki;
    } else Zi = !1;
    eo = Zi && (!document.documentMode || 9 < document.documentMode);
  }
  function lo() {
    Pa && (Pa.detachEvent("onpropertychange", ao), en = Pa = null);
  }
  function ao(e) {
    if (e.propertyName === "value" && nu(en)) {
      var t = [];
      Is(
        t,
        en,
        e,
        Bi(e)
      ), Ls(oh, t);
    }
  }
  function fh(e, t, l) {
    e === "focusin" ? (lo(), Pa = t, en = l, Pa.attachEvent("onpropertychange", ao)) : e === "focusout" && lo();
  }
  function dh(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return nu(en);
  }
  function mh(e, t) {
    if (e === "click") return nu(t);
  }
  function hh(e, t) {
    if (e === "input" || e === "change")
      return nu(t);
  }
  function ph(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ht = typeof Object.is == "function" ? Object.is : ph;
  function tn(e, t) {
    if (ht(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Ti.call(t, n) || !ht(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function no(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function uo(e, t) {
    var l = no(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = e + l.textContent.length, e <= t && a >= t)
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = no(l);
    }
  }
  function io(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? io(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ro(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Wn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Wn(e.document);
    }
    return t;
  }
  function Ji(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var gh = Vt && "documentMode" in document && 11 >= document.documentMode, fa = null, $i = null, ln = null, Fi = !1;
  function co(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Fi || fa == null || fa !== Wn(a) || (a = fa, "selectionStart" in a && Ji(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ln && tn(ln, a) || (ln = a, a = Zu($i, "onSelect"), 0 < a.length && (t = new lu(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = fa)));
  }
  function Hl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var da = {
    animationend: Hl("Animation", "AnimationEnd"),
    animationiteration: Hl("Animation", "AnimationIteration"),
    animationstart: Hl("Animation", "AnimationStart"),
    transitionrun: Hl("Transition", "TransitionRun"),
    transitionstart: Hl("Transition", "TransitionStart"),
    transitioncancel: Hl("Transition", "TransitionCancel"),
    transitionend: Hl("Transition", "TransitionEnd")
  }, Wi = {}, so = {};
  Vt && (so = document.createElement("div").style, "AnimationEvent" in window || (delete da.animationend.animation, delete da.animationiteration.animation, delete da.animationstart.animation), "TransitionEvent" in window || delete da.transitionend.transition);
  function ql(e) {
    if (Wi[e]) return Wi[e];
    if (!da[e]) return e;
    var t = da[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in so)
        return Wi[e] = t[l];
    return e;
  }
  var oo = ql("animationend"), fo = ql("animationiteration"), mo = ql("animationstart"), yh = ql("transitionrun"), vh = ql("transitionstart"), xh = ql("transitioncancel"), ho = ql("transitionend"), po = /* @__PURE__ */ new Map(), Ii = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ii.push("scrollEnd");
  function Rt(e, t) {
    po.set(e, t), kl(t, [e]);
  }
  var uu = typeof reportError == "function" ? reportError : function(e) {
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
  }, Et = [], ma = 0, Pi = 0;
  function iu() {
    for (var e = ma, t = Pi = ma = 0; t < e; ) {
      var l = Et[t];
      Et[t++] = null;
      var a = Et[t];
      Et[t++] = null;
      var n = Et[t];
      Et[t++] = null;
      var u = Et[t];
      if (Et[t++] = null, a !== null && n !== null) {
        var c = a.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), a.pending = n;
      }
      u !== 0 && go(l, n, u);
    }
  }
  function ru(e, t, l, a) {
    Et[ma++] = e, Et[ma++] = t, Et[ma++] = l, Et[ma++] = a, Pi |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function er(e, t, l, a) {
    return ru(e, t, l, a), cu(e);
  }
  function Ll(e, t) {
    return ru(e, null, null, t), cu(e);
  }
  function go(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - mt(l), e = u.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function cu(e) {
    if (50 < En)
      throw En = 0, sc = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ha = {};
  function bh(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function pt(e, t, l, a) {
    return new bh(e, t, l, a);
  }
  function tr(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Zt(e, t) {
    var l = e.alternate;
    return l === null ? (l = pt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function yo(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function su(e, t, l, a, n, u) {
    var c = 0;
    if (a = e, typeof e == "function") tr(e) && (c = 1);
    else if (typeof e == "string")
      c = E1(
        e,
        l,
        L.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Ie:
          return e = pt(31, l, t, n), e.elementType = Ie, e.lanes = u, e;
        case W:
          return Yl(l.children, n, u, t);
        case Ce:
          c = 8, n |= 24;
          break;
        case Q:
          return e = pt(12, l, t, n | 2), e.elementType = Q, e.lanes = u, e;
        case Qe:
          return e = pt(13, l, t, n), e.elementType = Qe, e.lanes = u, e;
        case J:
          return e = pt(19, l, t, n), e.elementType = J, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case H:
                c = 10;
                break e;
              case Me:
                c = 9;
                break e;
              case ye:
                c = 11;
                break e;
              case X:
                c = 14;
                break e;
              case Te:
                c = 16, a = null;
                break e;
            }
          c = 29, l = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = pt(c, l, t, n), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function Yl(e, t, l, a) {
    return e = pt(7, e, a, t), e.lanes = l, e;
  }
  function lr(e, t, l) {
    return e = pt(6, e, null, t), e.lanes = l, e;
  }
  function vo(e) {
    var t = pt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ar(e, t, l) {
    return t = pt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var xo = /* @__PURE__ */ new WeakMap();
  function _t(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = xo.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: ys(t)
      }, xo.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ys(t)
    };
  }
  var pa = [], ga = 0, ou = null, an = 0, zt = [], At = 0, ol = null, Bt = 1, Ht = "";
  function Kt(e, t) {
    pa[ga++] = an, pa[ga++] = ou, ou = e, an = t;
  }
  function bo(e, t, l) {
    zt[At++] = Bt, zt[At++] = Ht, zt[At++] = ol, ol = e;
    var a = Bt;
    e = Ht;
    var n = 32 - mt(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - mt(t) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (a & (1 << c) - 1).toString(32), a >>= c, n -= c, Bt = 1 << 32 - mt(t) + n | l << n | a, Ht = u + e;
    } else
      Bt = 1 << u | l << n | a, Ht = e;
  }
  function nr(e) {
    e.return !== null && (Kt(e, 1), bo(e, 1, 0));
  }
  function ur(e) {
    for (; e === ou; )
      ou = pa[--ga], pa[ga] = null, an = pa[--ga], pa[ga] = null;
    for (; e === ol; )
      ol = zt[--At], zt[At] = null, Ht = zt[--At], zt[At] = null, Bt = zt[--At], zt[At] = null;
  }
  function So(e, t) {
    zt[At++] = Bt, zt[At++] = Ht, zt[At++] = ol, Bt = t.id, Ht = t.overflow, ol = e;
  }
  var Ve = null, _e = null, se = !1, fl = null, Ct = !1, ir = Error(s(519));
  function dl(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw nn(_t(t, e)), ir;
  }
  function jo(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Xe] = e, t[lt] = a, l) {
      case "dialog":
        ie("cancel", t), ie("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ie("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < zn.length; l++)
          ie(zn[l], t);
        break;
      case "source":
        ie("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ie("error", t), ie("load", t);
        break;
      case "details":
        ie("toggle", t);
        break;
      case "input":
        ie("invalid", t), Rs(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        ie("invalid", t);
        break;
      case "textarea":
        ie("invalid", t), ks(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Ld(t.textContent, l) ? (a.popover != null && (ie("beforetoggle", t), ie("toggle", t)), a.onScroll != null && ie("scroll", t), a.onScrollEnd != null && ie("scrollend", t), a.onClick != null && (t.onclick = Xt), t = !0) : t = !1, t || dl(e, !0);
  }
  function No(e) {
    for (Ve = e.return; Ve; )
      switch (Ve.tag) {
        case 5:
        case 31:
        case 13:
          Ct = !1;
          return;
        case 27:
        case 3:
          Ct = !0;
          return;
        default:
          Ve = Ve.return;
      }
  }
  function ya(e) {
    if (e !== Ve) return !1;
    if (!se) return No(e), se = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Tc(e.type, e.memoizedProps)), l = !l), l && _e && dl(e), No(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      _e = $d(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      _e = $d(e);
    } else
      t === 27 ? (t = _e, _l(e.type) ? (e = Cc, Cc = null, _e = e) : _e = t) : _e = Ve ? Ot(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Gl() {
    _e = Ve = null, se = !1;
  }
  function rr() {
    var e = fl;
    return e !== null && (rt === null ? rt = e : rt.push.apply(
      rt,
      e
    ), fl = null), e;
  }
  function nn(e) {
    fl === null ? fl = [e] : fl.push(e);
  }
  var cr = y(null), Ql = null, Jt = null;
  function ml(e, t, l) {
    B(cr, t._currentValue), t._currentValue = l;
  }
  function $t(e) {
    e._currentValue = cr.current, D(cr);
  }
  function sr(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function or(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var d = u;
          u = n;
          for (var m = 0; m < t.length; m++)
            if (d.context === t[m]) {
              u.lanes |= l, d = u.alternate, d !== null && (d.lanes |= l), sr(
                u.return,
                l,
                e
              ), a || (c = null);
              break e;
            }
          u = d.next;
        }
      } else if (n.tag === 18) {
        if (c = n.return, c === null) throw Error(s(341));
        c.lanes |= l, u = c.alternate, u !== null && (u.lanes |= l), sr(c, l, e), c = null;
      } else c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (n = c.sibling, n !== null) {
            n.return = c.return, c = n;
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function va(e, t, l, a) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(s(387));
        if (c = c.memoizedProps, c !== null) {
          var d = n.type;
          ht(n.pendingProps.value, c.value) || (e !== null ? e.push(d) : e = [d]);
        }
      } else if (n === he.current) {
        if (c = n.alternate, c === null) throw Error(s(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Dn) : e = [Dn]);
      }
      n = n.return;
    }
    e !== null && or(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function fu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ht(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Xl(e) {
    Ql = e, Jt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ze(e) {
    return To(Ql, e);
  }
  function du(e, t) {
    return Ql === null && Xl(e), To(e, t);
  }
  function To(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Jt === null) {
      if (e === null) throw Error(s(308));
      Jt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Jt = Jt.next = t;
    return l;
  }
  var Sh = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, jh = r.unstable_scheduleCallback, Nh = r.unstable_NormalPriority, ke = {
    $$typeof: H,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fr() {
    return {
      controller: new Sh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function un(e) {
    e.refCount--, e.refCount === 0 && jh(Nh, function() {
      e.controller.abort();
    });
  }
  var rn = null, dr = 0, xa = 0, ba = null;
  function Th(e, t) {
    if (rn === null) {
      var l = rn = [];
      dr = 0, xa = pc(), ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return dr++, t.then(Eo, Eo), t;
  }
  function Eo() {
    if (--dr === 0 && rn !== null) {
      ba !== null && (ba.status = "fulfilled");
      var e = rn;
      rn = null, xa = 0, ba = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Eh(e, t) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        l.push(n);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < l.length; n++) (0, l[n])(t);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      }
    ), a;
  }
  var _o = C.S;
  C.S = function(e, t) {
    od = ft(), typeof t == "object" && t !== null && typeof t.then == "function" && Th(e, t), _o !== null && _o(e, t);
  };
  var Vl = y(null);
  function mr() {
    var e = Vl.current;
    return e !== null ? e : Ne.pooledCache;
  }
  function mu(e, t) {
    t === null ? B(Vl, Vl.current) : B(Vl, t.pool);
  }
  function zo() {
    var e = mr();
    return e === null ? null : { parent: ke._currentValue, pool: e };
  }
  var Sa = Error(s(460)), hr = Error(s(474)), hu = Error(s(542)), pu = { then: function() {
  } };
  function Ao(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Co(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Xt, Xt), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Oo(e), e;
      default:
        if (typeof t.status == "string") t.then(Xt, Xt);
        else {
          if (e = Ne, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Oo(e), e;
        }
        throw Kl = t, Sa;
    }
  }
  function Zl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Kl = l, Sa) : l;
    }
  }
  var Kl = null;
  function Mo() {
    if (Kl === null) throw Error(s(459));
    var e = Kl;
    return Kl = null, e;
  }
  function Oo(e) {
    if (e === Sa || e === hu)
      throw Error(s(483));
  }
  var ja = null, cn = 0;
  function gu(e) {
    var t = cn;
    return cn += 1, ja === null && (ja = []), Co(ja, e, t);
  }
  function sn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function yu(e, t) {
    throw t.$$typeof === w ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Do(e) {
    function t(v, p) {
      if (e) {
        var b = v.deletions;
        b === null ? (v.deletions = [p], v.flags |= 16) : b.push(p);
      }
    }
    function l(v, p) {
      if (!e) return null;
      for (; p !== null; )
        t(v, p), p = p.sibling;
      return null;
    }
    function a(v) {
      for (var p = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? p.set(v.key, v) : p.set(v.index, v), v = v.sibling;
      return p;
    }
    function n(v, p) {
      return v = Zt(v, p), v.index = 0, v.sibling = null, v;
    }
    function u(v, p, b) {
      return v.index = b, e ? (b = v.alternate, b !== null ? (b = b.index, b < p ? (v.flags |= 67108866, p) : b) : (v.flags |= 67108866, p)) : (v.flags |= 1048576, p);
    }
    function c(v) {
      return e && v.alternate === null && (v.flags |= 67108866), v;
    }
    function d(v, p, b, M) {
      return p === null || p.tag !== 6 ? (p = lr(b, v.mode, M), p.return = v, p) : (p = n(p, b), p.return = v, p);
    }
    function m(v, p, b, M) {
      var V = b.type;
      return V === W ? A(
        v,
        p,
        b.props.children,
        M,
        b.key
      ) : p !== null && (p.elementType === V || typeof V == "object" && V !== null && V.$$typeof === Te && Zl(V) === p.type) ? (p = n(p, b.props), sn(p, b), p.return = v, p) : (p = su(
        b.type,
        b.key,
        b.props,
        null,
        v.mode,
        M
      ), sn(p, b), p.return = v, p);
    }
    function S(v, p, b, M) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== b.containerInfo || p.stateNode.implementation !== b.implementation ? (p = ar(b, v.mode, M), p.return = v, p) : (p = n(p, b.children || []), p.return = v, p);
    }
    function A(v, p, b, M, V) {
      return p === null || p.tag !== 7 ? (p = Yl(
        b,
        v.mode,
        M,
        V
      ), p.return = v, p) : (p = n(p, b), p.return = v, p);
    }
    function O(v, p, b) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = lr(
          "" + p,
          v.mode,
          b
        ), p.return = v, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Z:
            return b = su(
              p.type,
              p.key,
              p.props,
              null,
              v.mode,
              b
            ), sn(b, p), b.return = v, b;
          case ee:
            return p = ar(
              p,
              v.mode,
              b
            ), p.return = v, p;
          case Te:
            return p = Zl(p), O(v, p, b);
        }
        if (tt(p) || R(p))
          return p = Yl(
            p,
            v.mode,
            b,
            null
          ), p.return = v, p;
        if (typeof p.then == "function")
          return O(v, gu(p), b);
        if (p.$$typeof === H)
          return O(
            v,
            du(v, p),
            b
          );
        yu(v, p);
      }
      return null;
    }
    function j(v, p, b, M) {
      var V = p !== null ? p.key : null;
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return V !== null ? null : d(v, p, "" + b, M);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Z:
            return b.key === V ? m(v, p, b, M) : null;
          case ee:
            return b.key === V ? S(v, p, b, M) : null;
          case Te:
            return b = Zl(b), j(v, p, b, M);
        }
        if (tt(b) || R(b))
          return V !== null ? null : A(v, p, b, M, null);
        if (typeof b.then == "function")
          return j(
            v,
            p,
            gu(b),
            M
          );
        if (b.$$typeof === H)
          return j(
            v,
            p,
            du(v, b),
            M
          );
        yu(v, b);
      }
      return null;
    }
    function E(v, p, b, M, V) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return v = v.get(b) || null, d(p, v, "" + M, V);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Z:
            return v = v.get(
              M.key === null ? b : M.key
            ) || null, m(p, v, M, V);
          case ee:
            return v = v.get(
              M.key === null ? b : M.key
            ) || null, S(p, v, M, V);
          case Te:
            return M = Zl(M), E(
              v,
              p,
              b,
              M,
              V
            );
        }
        if (tt(M) || R(M))
          return v = v.get(b) || null, A(p, v, M, V, null);
        if (typeof M.then == "function")
          return E(
            v,
            p,
            b,
            gu(M),
            V
          );
        if (M.$$typeof === H)
          return E(
            v,
            p,
            b,
            du(p, M),
            V
          );
        yu(p, M);
      }
      return null;
    }
    function q(v, p, b, M) {
      for (var V = null, fe = null, Y = p, ae = p = 0, ce = null; Y !== null && ae < b.length; ae++) {
        Y.index > ae ? (ce = Y, Y = null) : ce = Y.sibling;
        var de = j(
          v,
          Y,
          b[ae],
          M
        );
        if (de === null) {
          Y === null && (Y = ce);
          break;
        }
        e && Y && de.alternate === null && t(v, Y), p = u(de, p, ae), fe === null ? V = de : fe.sibling = de, fe = de, Y = ce;
      }
      if (ae === b.length)
        return l(v, Y), se && Kt(v, ae), V;
      if (Y === null) {
        for (; ae < b.length; ae++)
          Y = O(v, b[ae], M), Y !== null && (p = u(
            Y,
            p,
            ae
          ), fe === null ? V = Y : fe.sibling = Y, fe = Y);
        return se && Kt(v, ae), V;
      }
      for (Y = a(Y); ae < b.length; ae++)
        ce = E(
          Y,
          v,
          ae,
          b[ae],
          M
        ), ce !== null && (e && ce.alternate !== null && Y.delete(
          ce.key === null ? ae : ce.key
        ), p = u(
          ce,
          p,
          ae
        ), fe === null ? V = ce : fe.sibling = ce, fe = ce);
      return e && Y.forEach(function(Ol) {
        return t(v, Ol);
      }), se && Kt(v, ae), V;
    }
    function K(v, p, b, M) {
      if (b == null) throw Error(s(151));
      for (var V = null, fe = null, Y = p, ae = p = 0, ce = null, de = b.next(); Y !== null && !de.done; ae++, de = b.next()) {
        Y.index > ae ? (ce = Y, Y = null) : ce = Y.sibling;
        var Ol = j(v, Y, de.value, M);
        if (Ol === null) {
          Y === null && (Y = ce);
          break;
        }
        e && Y && Ol.alternate === null && t(v, Y), p = u(Ol, p, ae), fe === null ? V = Ol : fe.sibling = Ol, fe = Ol, Y = ce;
      }
      if (de.done)
        return l(v, Y), se && Kt(v, ae), V;
      if (Y === null) {
        for (; !de.done; ae++, de = b.next())
          de = O(v, de.value, M), de !== null && (p = u(de, p, ae), fe === null ? V = de : fe.sibling = de, fe = de);
        return se && Kt(v, ae), V;
      }
      for (Y = a(Y); !de.done; ae++, de = b.next())
        de = E(Y, v, ae, de.value, M), de !== null && (e && de.alternate !== null && Y.delete(de.key === null ? ae : de.key), p = u(de, p, ae), fe === null ? V = de : fe.sibling = de, fe = de);
      return e && Y.forEach(function(k1) {
        return t(v, k1);
      }), se && Kt(v, ae), V;
    }
    function Se(v, p, b, M) {
      if (typeof b == "object" && b !== null && b.type === W && b.key === null && (b = b.props.children), typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Z:
            e: {
              for (var V = b.key; p !== null; ) {
                if (p.key === V) {
                  if (V = b.type, V === W) {
                    if (p.tag === 7) {
                      l(
                        v,
                        p.sibling
                      ), M = n(
                        p,
                        b.props.children
                      ), M.return = v, v = M;
                      break e;
                    }
                  } else if (p.elementType === V || typeof V == "object" && V !== null && V.$$typeof === Te && Zl(V) === p.type) {
                    l(
                      v,
                      p.sibling
                    ), M = n(p, b.props), sn(M, b), M.return = v, v = M;
                    break e;
                  }
                  l(v, p);
                  break;
                } else t(v, p);
                p = p.sibling;
              }
              b.type === W ? (M = Yl(
                b.props.children,
                v.mode,
                M,
                b.key
              ), M.return = v, v = M) : (M = su(
                b.type,
                b.key,
                b.props,
                null,
                v.mode,
                M
              ), sn(M, b), M.return = v, v = M);
            }
            return c(v);
          case ee:
            e: {
              for (V = b.key; p !== null; ) {
                if (p.key === V)
                  if (p.tag === 4 && p.stateNode.containerInfo === b.containerInfo && p.stateNode.implementation === b.implementation) {
                    l(
                      v,
                      p.sibling
                    ), M = n(p, b.children || []), M.return = v, v = M;
                    break e;
                  } else {
                    l(v, p);
                    break;
                  }
                else t(v, p);
                p = p.sibling;
              }
              M = ar(b, v.mode, M), M.return = v, v = M;
            }
            return c(v);
          case Te:
            return b = Zl(b), Se(
              v,
              p,
              b,
              M
            );
        }
        if (tt(b))
          return q(
            v,
            p,
            b,
            M
          );
        if (R(b)) {
          if (V = R(b), typeof V != "function") throw Error(s(150));
          return b = V.call(b), K(
            v,
            p,
            b,
            M
          );
        }
        if (typeof b.then == "function")
          return Se(
            v,
            p,
            gu(b),
            M
          );
        if (b.$$typeof === H)
          return Se(
            v,
            p,
            du(v, b),
            M
          );
        yu(v, b);
      }
      return typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint" ? (b = "" + b, p !== null && p.tag === 6 ? (l(v, p.sibling), M = n(p, b), M.return = v, v = M) : (l(v, p), M = lr(b, v.mode, M), M.return = v, v = M), c(v)) : l(v, p);
    }
    return function(v, p, b, M) {
      try {
        cn = 0;
        var V = Se(
          v,
          p,
          b,
          M
        );
        return ja = null, V;
      } catch (Y) {
        if (Y === Sa || Y === hu) throw Y;
        var fe = pt(29, Y, null, v.mode);
        return fe.lanes = M, fe.return = v, fe;
      } finally {
      }
    };
  }
  var Jl = Do(!0), Uo = Do(!1), hl = !1;
  function pr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function gr(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function pl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function gl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (me & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = cu(e), go(e, null, l), t;
    }
    return ru(e, a, t, l), cu(e);
  }
  function on(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Ns(e, l);
    }
  }
  function yr(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = c : u = u.next = c, l = l.next;
        } while (l !== null);
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var vr = !1;
  function fn() {
    if (vr) {
      var e = ba;
      if (e !== null) throw e;
    }
  }
  function dn(e, t, l, a) {
    vr = !1;
    var n = e.updateQueue;
    hl = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, d = n.shared.pending;
    if (d !== null) {
      n.shared.pending = null;
      var m = d, S = m.next;
      m.next = null, c === null ? u = S : c.next = S, c = m;
      var A = e.alternate;
      A !== null && (A = A.updateQueue, d = A.lastBaseUpdate, d !== c && (d === null ? A.firstBaseUpdate = S : d.next = S, A.lastBaseUpdate = m));
    }
    if (u !== null) {
      var O = n.baseState;
      c = 0, A = S = m = null, d = u;
      do {
        var j = d.lane & -536870913, E = j !== d.lane;
        if (E ? (re & j) === j : (a & j) === j) {
          j !== 0 && j === xa && (vr = !0), A !== null && (A = A.next = {
            lane: 0,
            tag: d.tag,
            payload: d.payload,
            callback: null,
            next: null
          });
          e: {
            var q = e, K = d;
            j = t;
            var Se = l;
            switch (K.tag) {
              case 1:
                if (q = K.payload, typeof q == "function") {
                  O = q.call(Se, O, j);
                  break e;
                }
                O = q;
                break e;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = K.payload, j = typeof q == "function" ? q.call(Se, O, j) : q, j == null) break e;
                O = _({}, O, j);
                break e;
              case 2:
                hl = !0;
            }
          }
          j = d.callback, j !== null && (e.flags |= 64, E && (e.flags |= 8192), E = n.callbacks, E === null ? n.callbacks = [j] : E.push(j));
        } else
          E = {
            lane: j,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, A === null ? (S = A = E, m = O) : A = A.next = E, c |= j;
        if (d = d.next, d === null) {
          if (d = n.shared.pending, d === null)
            break;
          E = d, d = E.next, E.next = null, n.lastBaseUpdate = E, n.shared.pending = null;
        }
      } while (!0);
      A === null && (m = O), n.baseState = m, n.firstBaseUpdate = S, n.lastBaseUpdate = A, u === null && (n.shared.lanes = 0), Sl |= c, e.lanes = c, e.memoizedState = O;
    }
  }
  function Ro(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function wo(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Ro(l[e], t);
  }
  var Na = y(null), vu = y(0);
  function ko(e, t) {
    e = nl, B(vu, e), B(Na, t), nl = e | t.baseLanes;
  }
  function xr() {
    B(vu, nl), B(Na, Na.current);
  }
  function br() {
    nl = vu.current, D(Na), D(vu);
  }
  var gt = y(null), Mt = null;
  function yl(e) {
    var t = e.alternate;
    B(Re, Re.current & 1), B(gt, e), Mt === null && (t === null || Na.current !== null || t.memoizedState !== null) && (Mt = e);
  }
  function Sr(e) {
    B(Re, Re.current), B(gt, e), Mt === null && (Mt = e);
  }
  function Bo(e) {
    e.tag === 22 ? (B(Re, Re.current), B(gt, e), Mt === null && (Mt = e)) : vl();
  }
  function vl() {
    B(Re, Re.current), B(gt, gt.current);
  }
  function yt(e) {
    D(gt), Mt === e && (Mt = null), D(Re);
  }
  var Re = y(0);
  function xu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || zc(l) || Ac(l)))
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
  var Ft = 0, le = null, xe = null, Be = null, bu = !1, Ta = !1, $l = !1, Su = 0, mn = 0, Ea = null, _h = 0;
  function Oe() {
    throw Error(s(321));
  }
  function jr(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!ht(e[l], t[l])) return !1;
    return !0;
  }
  function Nr(e, t, l, a, n, u) {
    return Ft = u, le = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e === null || e.memoizedState === null ? Sf : Hr, $l = !1, u = l(a, n), $l = !1, Ta && (u = qo(
      t,
      l,
      a,
      n
    )), Ho(e), u;
  }
  function Ho(e) {
    C.H = gn;
    var t = xe !== null && xe.next !== null;
    if (Ft = 0, Be = xe = le = null, bu = !1, mn = 0, Ea = null, t) throw Error(s(300));
    e === null || He || (e = e.dependencies, e !== null && fu(e) && (He = !0));
  }
  function qo(e, t, l, a) {
    le = e;
    var n = 0;
    do {
      if (Ta && (Ea = null), mn = 0, Ta = !1, 25 <= n) throw Error(s(301));
      if (n += 1, Be = xe = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      C.H = jf, u = t(l, a);
    } while (Ta);
    return u;
  }
  function zh() {
    var e = C.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? hn(t) : t, e = e.useState()[0], (xe !== null ? xe.memoizedState : null) !== e && (le.flags |= 1024), t;
  }
  function Tr() {
    var e = Su !== 0;
    return Su = 0, e;
  }
  function Er(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function _r(e) {
    if (bu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      bu = !1;
    }
    Ft = 0, Be = xe = le = null, Ta = !1, mn = Su = 0, Ea = null;
  }
  function et() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Be === null ? le.memoizedState = Be = e : Be = Be.next = e, Be;
  }
  function we() {
    if (xe === null) {
      var e = le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = xe.next;
    var t = Be === null ? le.memoizedState : Be.next;
    if (t !== null)
      Be = t, xe = e;
    else {
      if (e === null)
        throw le.alternate === null ? Error(s(467)) : Error(s(310));
      xe = e, e = {
        memoizedState: xe.memoizedState,
        baseState: xe.baseState,
        baseQueue: xe.baseQueue,
        queue: xe.queue,
        next: null
      }, Be === null ? le.memoizedState = Be = e : Be = Be.next = e;
    }
    return Be;
  }
  function ju() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function hn(e) {
    var t = mn;
    return mn += 1, Ea === null && (Ea = []), e = Co(Ea, e, t), t = le, (Be === null ? t.memoizedState : Be.next) === null && (t = t.alternate, C.H = t === null || t.memoizedState === null ? Sf : Hr), e;
  }
  function Nu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return hn(e);
      if (e.$$typeof === H) return Ze(e);
    }
    throw Error(s(438, String(e)));
  }
  function zr(e) {
    var t = null, l = le.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = le.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = ju(), le.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = St;
    return t.index++, l;
  }
  function Wt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Tu(e) {
    var t = we();
    return Ar(t, xe, e);
  }
  function Ar(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        n.next = u.next, u.next = c;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = e.baseState, n === null) e.memoizedState = u;
    else {
      t = n.next;
      var d = c = null, m = null, S = t, A = !1;
      do {
        var O = S.lane & -536870913;
        if (O !== S.lane ? (re & O) === O : (Ft & O) === O) {
          var j = S.revertLane;
          if (j === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), O === xa && (A = !0);
          else if ((Ft & j) === j) {
            S = S.next, j === xa && (A = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, m === null ? (d = m = O, c = u) : m = m.next = O, le.lanes |= j, Sl |= j;
          O = S.action, $l && l(u, O), u = S.hasEagerState ? S.eagerState : l(u, O);
        } else
          j = {
            lane: O,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, m === null ? (d = m = j, c = u) : m = m.next = j, le.lanes |= O, Sl |= O;
        S = S.next;
      } while (S !== null && S !== t);
      if (m === null ? c = u : m.next = d, !ht(u, e.memoizedState) && (He = !0, A && (l = ba, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = c, e.baseQueue = m, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Cr(e) {
    var t = we(), l = t.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, n = l.pending, u = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var c = n = n.next;
      do
        u = e(u, c.action), c = c.next;
      while (c !== n);
      ht(u, t.memoizedState) || (He = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Lo(e, t, l) {
    var a = le, n = we(), u = se;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var c = !ht(
      (xe || n).memoizedState,
      l
    );
    if (c && (n.memoizedState = l, He = !0), n = n.queue, Dr(Qo.bind(null, a, n, e), [
      e
    ]), n.getSnapshot !== t || c || Be !== null && Be.memoizedState.tag & 1) {
      if (a.flags |= 2048, _a(
        9,
        { destroy: void 0 },
        Go.bind(
          null,
          a,
          n,
          l,
          t
        ),
        null
      ), Ne === null) throw Error(s(349));
      u || (Ft & 127) !== 0 || Yo(a, t, l);
    }
    return l;
  }
  function Yo(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = le.updateQueue, t === null ? (t = ju(), le.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Go(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Xo(t) && Vo(e);
  }
  function Qo(e, t, l) {
    return l(function() {
      Xo(t) && Vo(e);
    });
  }
  function Xo(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !ht(e, l);
    } catch {
      return !0;
    }
  }
  function Vo(e) {
    var t = Ll(e, 2);
    t !== null && ct(t, e, 2);
  }
  function Mr(e) {
    var t = et();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), $l) {
        rl(!0);
        try {
          l();
        } finally {
          rl(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wt,
      lastRenderedState: e
    }, t;
  }
  function Zo(e, t, l, a) {
    return e.baseState = l, Ar(
      e,
      xe,
      typeof a == "function" ? a : Wt
    );
  }
  function Ah(e, t, l, a, n) {
    if (zu(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      C.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, Ko(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Ko(e, t) {
    var l = t.action, a = t.payload, n = e.state;
    if (t.isTransition) {
      var u = C.T, c = {};
      C.T = c;
      try {
        var d = l(n, a), m = C.S;
        m !== null && m(c, d), Jo(e, t, d);
      } catch (S) {
        Or(e, t, S);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), C.T = u;
      }
    } else
      try {
        u = l(n, a), Jo(e, t, u);
      } catch (S) {
        Or(e, t, S);
      }
  }
  function Jo(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        $o(e, t, a);
      },
      function(a) {
        return Or(e, t, a);
      }
    ) : $o(e, t, l);
  }
  function $o(e, t, l) {
    t.status = "fulfilled", t.value = l, Fo(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Ko(e, l)));
  }
  function Or(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, Fo(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Fo(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Wo(e, t) {
    return t;
  }
  function Io(e, t) {
    if (se) {
      var l = Ne.formState;
      if (l !== null) {
        e: {
          var a = le;
          if (se) {
            if (_e) {
              t: {
                for (var n = _e, u = Ct; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Ot(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                _e = Ot(
                  n.nextSibling
                ), a = n.data === "F!";
                break e;
              }
            }
            dl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return l = et(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wo,
      lastRenderedState: t
    }, l.queue = a, l = vf.bind(
      null,
      le,
      a
    ), a.dispatch = l, a = Mr(!1), u = Br.bind(
      null,
      le,
      !1,
      a.queue
    ), a = et(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = n, l = Ah.bind(
      null,
      le,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function Po(e) {
    var t = we();
    return ef(t, xe, e);
  }
  function ef(e, t, l) {
    if (t = Ar(
      e,
      t,
      Wo
    )[0], e = Tu(Wt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = hn(t);
      } catch (c) {
        throw c === Sa ? hu : c;
      }
    else a = t;
    t = we();
    var n = t.queue, u = n.dispatch;
    return l !== t.memoizedState && (le.flags |= 2048, _a(
      9,
      { destroy: void 0 },
      Ch.bind(null, n, l),
      null
    )), [a, u, e];
  }
  function Ch(e, t) {
    e.action = t;
  }
  function tf(e) {
    var t = we(), l = xe;
    if (l !== null)
      return ef(t, l, e);
    we(), t = t.memoizedState, l = we();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function _a(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = le.updateQueue, t === null && (t = ju(), le.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function lf() {
    return we().memoizedState;
  }
  function Eu(e, t, l, a) {
    var n = et();
    le.flags |= e, n.memoizedState = _a(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function _u(e, t, l, a) {
    var n = we();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    xe !== null && a !== null && jr(a, xe.memoizedState.deps) ? n.memoizedState = _a(t, u, l, a) : (le.flags |= e, n.memoizedState = _a(
      1 | t,
      u,
      l,
      a
    ));
  }
  function af(e, t) {
    Eu(8390656, 8, e, t);
  }
  function Dr(e, t) {
    _u(2048, 8, e, t);
  }
  function Mh(e) {
    le.flags |= 4;
    var t = le.updateQueue;
    if (t === null)
      t = ju(), le.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function nf(e) {
    var t = we().memoizedState;
    return Mh({ ref: t, nextImpl: e }), function() {
      if ((me & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function uf(e, t) {
    return _u(4, 2, e, t);
  }
  function rf(e, t) {
    return _u(4, 4, e, t);
  }
  function cf(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function sf(e, t, l) {
    l = l != null ? l.concat([e]) : null, _u(4, 4, cf.bind(null, t, e), l);
  }
  function Ur() {
  }
  function of(e, t) {
    var l = we();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && jr(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function ff(e, t) {
    var l = we();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && jr(t, a[1]))
      return a[0];
    if (a = e(), $l) {
      rl(!0);
      try {
        e();
      } finally {
        rl(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function Rr(e, t, l) {
    return l === void 0 || (Ft & 1073741824) !== 0 && (re & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = dd(), le.lanes |= e, Sl |= e, l);
  }
  function df(e, t, l, a) {
    return ht(l, t) ? l : Na.current !== null ? (e = Rr(e, l, a), ht(e, t) || (He = !0), e) : (Ft & 42) === 0 || (Ft & 1073741824) !== 0 && (re & 261930) === 0 ? (He = !0, e.memoizedState = l) : (e = dd(), le.lanes |= e, Sl |= e, t);
  }
  function mf(e, t, l, a, n) {
    var u = k.p;
    k.p = u !== 0 && 8 > u ? u : 8;
    var c = C.T, d = {};
    C.T = d, Br(e, !1, t, l);
    try {
      var m = n(), S = C.S;
      if (S !== null && S(d, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var A = Eh(
          m,
          a
        );
        pn(
          e,
          t,
          A,
          bt(e)
        );
      } else
        pn(
          e,
          t,
          a,
          bt(e)
        );
    } catch (O) {
      pn(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        bt()
      );
    } finally {
      k.p = u, c !== null && d.types !== null && (c.types = d.types), C.T = c;
    }
  }
  function Oh() {
  }
  function wr(e, t, l, a) {
    if (e.tag !== 5) throw Error(s(476));
    var n = hf(e).queue;
    mf(
      e,
      n,
      t,
      I,
      l === null ? Oh : function() {
        return pf(e), l(a);
      }
    );
  }
  function hf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: I,
      baseState: I,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wt,
        lastRenderedState: I
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wt,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function pf(e) {
    var t = hf(e);
    t.next === null && (t = e.alternate.memoizedState), pn(
      e,
      t.next.queue,
      {},
      bt()
    );
  }
  function kr() {
    return Ze(Dn);
  }
  function gf() {
    return we().memoizedState;
  }
  function yf() {
    return we().memoizedState;
  }
  function Dh(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = bt();
          e = pl(l);
          var a = gl(t, e, l);
          a !== null && (ct(a, t, l), on(a, t, l)), t = { cache: fr() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Uh(e, t, l) {
    var a = bt();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, zu(e) ? xf(t, l) : (l = er(e, t, l, a), l !== null && (ct(l, e, a), bf(l, t, a)));
  }
  function vf(e, t, l) {
    var a = bt();
    pn(e, t, l, a);
  }
  function pn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (zu(e)) xf(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var c = t.lastRenderedState, d = u(c, l);
          if (n.hasEagerState = !0, n.eagerState = d, ht(d, c))
            return ru(e, t, n, 0), Ne === null && iu(), !1;
        } catch {
        } finally {
        }
      if (l = er(e, t, n, a), l !== null)
        return ct(l, e, a), bf(l, t, a), !0;
    }
    return !1;
  }
  function Br(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: pc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, zu(e)) {
      if (t) throw Error(s(479));
    } else
      t = er(
        e,
        l,
        a,
        2
      ), t !== null && ct(t, e, 2);
  }
  function zu(e) {
    var t = e.alternate;
    return e === le || t !== null && t === le;
  }
  function xf(e, t) {
    Ta = bu = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function bf(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Ns(e, l);
    }
  }
  var gn = {
    readContext: Ze,
    use: Nu,
    useCallback: Oe,
    useContext: Oe,
    useEffect: Oe,
    useImperativeHandle: Oe,
    useLayoutEffect: Oe,
    useInsertionEffect: Oe,
    useMemo: Oe,
    useReducer: Oe,
    useRef: Oe,
    useState: Oe,
    useDebugValue: Oe,
    useDeferredValue: Oe,
    useTransition: Oe,
    useSyncExternalStore: Oe,
    useId: Oe,
    useHostTransitionStatus: Oe,
    useFormState: Oe,
    useActionState: Oe,
    useOptimistic: Oe,
    useMemoCache: Oe,
    useCacheRefresh: Oe
  };
  gn.useEffectEvent = Oe;
  var Sf = {
    readContext: Ze,
    use: Nu,
    useCallback: function(e, t) {
      return et().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ze,
    useEffect: af,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Eu(
        4194308,
        4,
        cf.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Eu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Eu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = et();
      t = t === void 0 ? null : t;
      var a = e();
      if ($l) {
        rl(!0);
        try {
          e();
        } finally {
          rl(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = et();
      if (l !== void 0) {
        var n = l(t);
        if ($l) {
          rl(!0);
          try {
            l(t);
          } finally {
            rl(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, a.queue = e, e = e.dispatch = Uh.bind(
        null,
        le,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = et();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Mr(e);
      var t = e.queue, l = vf.bind(null, le, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Ur,
    useDeferredValue: function(e, t) {
      var l = et();
      return Rr(l, e, t);
    },
    useTransition: function() {
      var e = Mr(!1);
      return e = mf.bind(
        null,
        le,
        e.queue,
        !0,
        !1
      ), et().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = le, n = et();
      if (se) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = t(), Ne === null)
          throw Error(s(349));
        (re & 127) !== 0 || Yo(a, t, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return n.queue = u, af(Qo.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, _a(
        9,
        { destroy: void 0 },
        Go.bind(
          null,
          a,
          u,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = et(), t = Ne.identifierPrefix;
      if (se) {
        var l = Ht, a = Bt;
        l = (a & ~(1 << 32 - mt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Su++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = _h++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: kr,
    useFormState: Io,
    useActionState: Io,
    useOptimistic: function(e) {
      var t = et();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Br.bind(
        null,
        le,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: zr,
    useCacheRefresh: function() {
      return et().memoizedState = Dh.bind(
        null,
        le
      );
    },
    useEffectEvent: function(e) {
      var t = et(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((me & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Hr = {
    readContext: Ze,
    use: Nu,
    useCallback: of,
    useContext: Ze,
    useEffect: Dr,
    useImperativeHandle: sf,
    useInsertionEffect: uf,
    useLayoutEffect: rf,
    useMemo: ff,
    useReducer: Tu,
    useRef: lf,
    useState: function() {
      return Tu(Wt);
    },
    useDebugValue: Ur,
    useDeferredValue: function(e, t) {
      var l = we();
      return df(
        l,
        xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Tu(Wt)[0], t = we().memoizedState;
      return [
        typeof e == "boolean" ? e : hn(e),
        t
      ];
    },
    useSyncExternalStore: Lo,
    useId: gf,
    useHostTransitionStatus: kr,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(e, t) {
      var l = we();
      return Zo(l, xe, e, t);
    },
    useMemoCache: zr,
    useCacheRefresh: yf
  };
  Hr.useEffectEvent = nf;
  var jf = {
    readContext: Ze,
    use: Nu,
    useCallback: of,
    useContext: Ze,
    useEffect: Dr,
    useImperativeHandle: sf,
    useInsertionEffect: uf,
    useLayoutEffect: rf,
    useMemo: ff,
    useReducer: Cr,
    useRef: lf,
    useState: function() {
      return Cr(Wt);
    },
    useDebugValue: Ur,
    useDeferredValue: function(e, t) {
      var l = we();
      return xe === null ? Rr(l, e, t) : df(
        l,
        xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Cr(Wt)[0], t = we().memoizedState;
      return [
        typeof e == "boolean" ? e : hn(e),
        t
      ];
    },
    useSyncExternalStore: Lo,
    useId: gf,
    useHostTransitionStatus: kr,
    useFormState: tf,
    useActionState: tf,
    useOptimistic: function(e, t) {
      var l = we();
      return xe !== null ? Zo(l, xe, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: zr,
    useCacheRefresh: yf
  };
  jf.useEffectEvent = nf;
  function qr(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : _({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Lr = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = bt(), n = pl(a);
      n.payload = t, l != null && (n.callback = l), t = gl(e, n, a), t !== null && (ct(t, e, a), on(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = bt(), n = pl(a);
      n.tag = 1, n.payload = t, l != null && (n.callback = l), t = gl(e, n, a), t !== null && (ct(t, e, a), on(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = bt(), a = pl(l);
      a.tag = 2, t != null && (a.callback = t), t = gl(e, a, l), t !== null && (ct(t, e, l), on(t, e, l));
    }
  };
  function Nf(e, t, l, a, n, u, c) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, c) : t.prototype && t.prototype.isPureReactComponent ? !tn(l, a) || !tn(n, u) : !0;
  }
  function Tf(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && Lr.enqueueReplaceState(t, t.state, null);
  }
  function Fl(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = _({}, l));
      for (var n in e)
        l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function Ef(e) {
    uu(e);
  }
  function _f(e) {
    console.error(e);
  }
  function zf(e) {
    uu(e);
  }
  function Au(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Af(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Yr(e, t, l) {
    return l = pl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Au(e, t);
    }, l;
  }
  function Cf(e) {
    return e = pl(e), e.tag = 3, e;
  }
  function Mf(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Af(t, l, a);
      };
    }
    var c = l.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
      Af(t, l, a), typeof n != "function" && (jl === null ? jl = /* @__PURE__ */ new Set([this]) : jl.add(this));
      var d = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: d !== null ? d : ""
      });
    });
  }
  function Rh(e, t, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && va(
        t,
        l,
        n,
        !0
      ), l = gt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Mt === null ? Lu() : l.alternate === null && De === 0 && (De = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === pu ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), dc(e, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === pu ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), dc(e, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return dc(e, a, n), Lu(), !1;
    }
    if (se)
      return t = gt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== ir && (e = Error(s(422), { cause: a }), nn(_t(e, l)))) : (a !== ir && (t = Error(s(423), {
        cause: a
      }), nn(
        _t(t, l)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = _t(a, l), n = Yr(
        e.stateNode,
        a,
        n
      ), yr(e, n), De !== 4 && (De = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = _t(u, l), Tn === null ? Tn = [u] : Tn.push(u), De !== 4 && (De = 2), t === null) return !0;
    a = _t(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = n & -n, l.lanes |= e, e = Yr(l.stateNode, a, e), yr(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (jl === null || !jl.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Cf(n), Mf(
              n,
              e,
              l,
              a
            ), yr(l, n), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Gr = Error(s(461)), He = !1;
  function Ke(e, t, l, a) {
    t.child = e === null ? Uo(t, null, l, a) : Jl(
      t,
      e.child,
      l,
      a
    );
  }
  function Of(e, t, l, a, n) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var d in a)
        d !== "ref" && (c[d] = a[d]);
    } else c = a;
    return Xl(t), a = Nr(
      e,
      t,
      l,
      c,
      u,
      n
    ), d = Tr(), e !== null && !He ? (Er(e, t, n), It(e, t, n)) : (se && d && nr(t), t.flags |= 1, Ke(e, t, a, n), t.child);
  }
  function Df(e, t, l, a, n) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !tr(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Uf(
        e,
        t,
        u,
        a,
        n
      )) : (e = su(
        l.type,
        null,
        a,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Fr(e, n)) {
      var c = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : tn, l(c, a) && e.ref === t.ref)
        return It(e, t, n);
    }
    return t.flags |= 1, e = Zt(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Uf(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (tn(u, a) && e.ref === t.ref)
        if (He = !1, t.pendingProps = a = u, Fr(e, n))
          (e.flags & 131072) !== 0 && (He = !0);
        else
          return t.lanes = e.lanes, It(e, t, n);
    }
    return Qr(
      e,
      t,
      l,
      a,
      n
    );
  }
  function Rf(e, t, l, a) {
    var n = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, e !== null) {
          for (a = t.child = e.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, t.child = null;
        return wf(
          e,
          t,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && mu(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? ko(t, u) : xr(), Bo(t);
      else
        return a = t.lanes = 536870912, wf(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (mu(t, u.cachePool), ko(t, u), vl(), t.memoizedState = null) : (e !== null && mu(t, null), xr(), vl());
    return Ke(e, t, n, l), t.child;
  }
  function yn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function wf(e, t, l, a, n) {
    var u = mr();
    return u = u === null ? null : { parent: ke._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && mu(t, null), xr(), Bo(t), e !== null && va(e, t, a, !0), t.childLanes = n, null;
  }
  function Cu(e, t) {
    return t = Ou(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function kf(e, t, l) {
    return Jl(t, e.child, null, l), e = Cu(t, t.pendingProps), e.flags |= 2, yt(t), t.memoizedState = null, e;
  }
  function wh(e, t, l) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (se) {
        if (a.mode === "hidden")
          return e = Cu(t, a), t.lanes = 536870912, yn(null, e);
        if (Sr(t), (e = _e) ? (e = Jd(
          e,
          Ct
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ol !== null ? { id: Bt, overflow: Ht } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = vo(e), l.return = t, t.child = l, Ve = t, _e = null)) : e = null, e === null) throw dl(t);
        return t.lanes = 536870912, null;
      }
      return Cu(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Sr(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = kf(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (He || va(e, t, l, !1), n = (l & e.childLanes) !== 0, He || n) {
        if (a = Ne, a !== null && (c = Ts(a, l), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, Ll(e, c), ct(a, e, c), Gr;
        Lu(), t = kf(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, _e = Ot(c.nextSibling), Ve = t, se = !0, fl = null, Ct = !1, e !== null && So(t, e), t = Cu(t, a), t.flags |= 4096;
      return t;
    }
    return e = Zt(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Mu(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Qr(e, t, l, a, n) {
    return Xl(t), l = Nr(
      e,
      t,
      l,
      a,
      void 0,
      n
    ), a = Tr(), e !== null && !He ? (Er(e, t, n), It(e, t, n)) : (se && a && nr(t), t.flags |= 1, Ke(e, t, l, n), t.child);
  }
  function Bf(e, t, l, a, n, u) {
    return Xl(t), t.updateQueue = null, l = qo(
      t,
      a,
      l,
      n
    ), Ho(e), a = Tr(), e !== null && !He ? (Er(e, t, u), It(e, t, u)) : (se && a && nr(t), t.flags |= 1, Ke(e, t, l, u), t.child);
  }
  function Hf(e, t, l, a, n) {
    if (Xl(t), t.stateNode === null) {
      var u = ha, c = l.contextType;
      typeof c == "object" && c !== null && (u = Ze(c)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Lr, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, pr(t), c = l.contextType, u.context = typeof c == "object" && c !== null ? Ze(c) : ha, u.state = t.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (qr(
        t,
        l,
        c,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && Lr.enqueueReplaceState(u, u.state, null), dn(t, a, u, n), fn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var d = t.memoizedProps, m = Fl(l, d);
      u.props = m;
      var S = u.context, A = l.contextType;
      c = ha, typeof A == "object" && A !== null && (c = Ze(A));
      var O = l.getDerivedStateFromProps;
      A = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, A || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (d || S !== c) && Tf(
        t,
        u,
        a,
        c
      ), hl = !1;
      var j = t.memoizedState;
      u.state = j, dn(t, a, u, n), fn(), S = t.memoizedState, d || j !== S || hl ? (typeof O == "function" && (qr(
        t,
        l,
        O,
        a
      ), S = t.memoizedState), (m = hl || Nf(
        t,
        l,
        m,
        a,
        j,
        S,
        c
      )) ? (A || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = S), u.props = a, u.state = S, u.context = c, a = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, gr(e, t), c = t.memoizedProps, A = Fl(l, c), u.props = A, O = t.pendingProps, j = u.context, S = l.contextType, m = ha, typeof S == "object" && S !== null && (m = Ze(S)), d = l.getDerivedStateFromProps, (S = typeof d == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== O || j !== m) && Tf(
        t,
        u,
        a,
        m
      ), hl = !1, j = t.memoizedState, u.state = j, dn(t, a, u, n), fn();
      var E = t.memoizedState;
      c !== O || j !== E || hl || e !== null && e.dependencies !== null && fu(e.dependencies) ? (typeof d == "function" && (qr(
        t,
        l,
        d,
        a
      ), E = t.memoizedState), (A = hl || Nf(
        t,
        l,
        A,
        a,
        j,
        E,
        m
      ) || e !== null && e.dependencies !== null && fu(e.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, E, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        E,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = E), u.props = a, u.state = E, u.context = m, a = A) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && j === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && j === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, Mu(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = Jl(
      t,
      e.child,
      null,
      n
    ), t.child = Jl(
      t,
      null,
      l,
      n
    )) : Ke(e, t, l, n), t.memoizedState = u.state, e = t.child) : e = It(
      e,
      t,
      n
    ), e;
  }
  function qf(e, t, l, a) {
    return Gl(), t.flags |= 256, Ke(e, t, l, a), t.child;
  }
  var Xr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Vr(e) {
    return { baseLanes: e, cachePool: zo() };
  }
  function Zr(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= xt), e;
  }
  function Lf(e, t, l) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, c;
    if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0), c && (n = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (se) {
        if (n ? yl(t) : vl(), (e = _e) ? (e = Jd(
          e,
          Ct
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ol !== null ? { id: Bt, overflow: Ht } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = vo(e), l.return = t, t.child = l, Ve = t, _e = null)) : e = null, e === null) throw dl(t);
        return Ac(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var d = a.children;
      return a = a.fallback, n ? (vl(), n = t.mode, d = Ou(
        { mode: "hidden", children: d },
        n
      ), a = Yl(
        a,
        n,
        l,
        null
      ), d.return = t, a.return = t, d.sibling = a, t.child = d, a = t.child, a.memoizedState = Vr(l), a.childLanes = Zr(
        e,
        c,
        l
      ), t.memoizedState = Xr, yn(null, a)) : (yl(t), Kr(t, d));
    }
    var m = e.memoizedState;
    if (m !== null && (d = m.dehydrated, d !== null)) {
      if (u)
        t.flags & 256 ? (yl(t), t.flags &= -257, t = Jr(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (vl(), t.child = e.child, t.flags |= 128, t = null) : (vl(), d = a.fallback, n = t.mode, a = Ou(
          { mode: "visible", children: a.children },
          n
        ), d = Yl(
          d,
          n,
          l,
          null
        ), d.flags |= 2, a.return = t, d.return = t, a.sibling = d, t.child = a, Jl(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = Vr(l), a.childLanes = Zr(
          e,
          c,
          l
        ), t.memoizedState = Xr, t = yn(null, a));
      else if (yl(t), Ac(d)) {
        if (c = d.nextSibling && d.nextSibling.dataset, c) var S = c.dgst;
        c = S, a = Error(s(419)), a.stack = "", a.digest = c, nn({ value: a, source: null, stack: null }), t = Jr(
          e,
          t,
          l
        );
      } else if (He || va(e, t, l, !1), c = (l & e.childLanes) !== 0, He || c) {
        if (c = Ne, c !== null && (a = Ts(c, l), a !== 0 && a !== m.retryLane))
          throw m.retryLane = a, Ll(e, a), ct(c, e, a), Gr;
        zc(d) || Lu(), t = Jr(
          e,
          t,
          l
        );
      } else
        zc(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = m.treeContext, _e = Ot(
          d.nextSibling
        ), Ve = t, se = !0, fl = null, Ct = !1, e !== null && So(t, e), t = Kr(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (vl(), d = a.fallback, n = t.mode, m = e.child, S = m.sibling, a = Zt(m, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = m.subtreeFlags & 65011712, S !== null ? d = Zt(
      S,
      d
    ) : (d = Yl(
      d,
      n,
      l,
      null
    ), d.flags |= 2), d.return = t, a.return = t, a.sibling = d, t.child = a, yn(null, a), a = t.child, d = e.child.memoizedState, d === null ? d = Vr(l) : (n = d.cachePool, n !== null ? (m = ke._currentValue, n = n.parent !== m ? { parent: m, pool: m } : n) : n = zo(), d = {
      baseLanes: d.baseLanes | l,
      cachePool: n
    }), a.memoizedState = d, a.childLanes = Zr(
      e,
      c,
      l
    ), t.memoizedState = Xr, yn(e.child, a)) : (yl(t), l = e.child, e = l.sibling, l = Zt(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Kr(e, t) {
    return t = Ou(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ou(e, t) {
    return e = pt(22, e, null, t), e.lanes = 0, e;
  }
  function Jr(e, t, l) {
    return Jl(t, e.child, null, l), e = Kr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Yf(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), sr(e.return, t, l);
  }
  function $r(e, t, l, a, n, u) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = l, c.tailMode = n, c.treeForkCount = u);
  }
  function Gf(e, t, l) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var c = Re.current, d = (c & 2) !== 0;
    if (d ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, B(Re, c), Ke(e, t, a, l), a = se ? an : 0, !d && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Yf(e, l, t);
        else if (e.tag === 19)
          Yf(e, l, t);
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
    switch (n) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          e = l.alternate, e !== null && xu(e) === null && (n = l), l = l.sibling;
        l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), $r(
          t,
          !1,
          n,
          l,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (e = n.alternate, e !== null && xu(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = l, l = n, n = e;
        }
        $r(
          t,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        $r(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function It(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), Sl |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (va(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, l = Zt(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Zt(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Fr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fu(e)));
  }
  function kh(e, t, l) {
    switch (t.tag) {
      case 3:
        Pe(t, t.stateNode.containerInfo), ml(t, ke, e.memoizedState.cache), Gl();
        break;
      case 27:
      case 5:
        Ga(t);
        break;
      case 4:
        Pe(t, t.stateNode.containerInfo);
        break;
      case 10:
        ml(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Sr(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (yl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Lf(e, t, l) : (yl(t), e = It(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        yl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (va(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), n) {
          if (a)
            return Gf(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), B(Re, Re.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Rf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        ml(t, ke, e.memoizedState.cache);
    }
    return It(e, t, l);
  }
  function Qf(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        He = !0;
      else {
        if (!Fr(e, l) && (t.flags & 128) === 0)
          return He = !1, kh(
            e,
            t,
            l
          );
        He = (e.flags & 131072) !== 0;
      }
    else
      He = !1, se && (t.flags & 1048576) !== 0 && bo(t, an, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = Zl(t.elementType), t.type = e, typeof e == "function")
            tr(e) ? (a = Fl(e, a), t.tag = 1, t = Hf(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = Qr(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === ye) {
                t.tag = 11, t = Of(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (n === X) {
                t.tag = 14, t = Df(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = oe(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Qr(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return a = t.type, n = Fl(
          a,
          t.pendingProps
        ), Hf(
          e,
          t,
          a,
          n,
          l
        );
      case 3:
        e: {
          if (Pe(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, gr(e, t), dn(t, a, null, l);
          var c = t.memoizedState;
          if (a = c.cache, ml(t, ke, a), a !== u.cache && or(
            t,
            [ke],
            l,
            !0
          ), fn(), a = c.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = qf(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== n) {
              n = _t(
                Error(s(424)),
                t
              ), nn(n), t = qf(
                e,
                t,
                a,
                l
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
              for (_e = Ot(e.firstChild), Ve = t, se = !0, fl = null, Ct = !0, l = Uo(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (Gl(), a === n) {
              t = It(
                e,
                t,
                l
              );
              break e;
            }
            Ke(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Mu(e, t), e === null ? (l = em(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : se || (l = t.type, e = t.pendingProps, a = Ku(
          ne.current
        ).createElement(l), a[Xe] = t, a[lt] = e, Je(a, l, e), Ye(a), t.stateNode = a) : t.memoizedState = em(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ga(t), e === null && se && (a = t.stateNode = Wd(
          t.type,
          t.pendingProps,
          ne.current
        ), Ve = t, Ct = !0, n = _e, _l(t.type) ? (Cc = n, _e = Ot(a.firstChild)) : _e = n), Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), Mu(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && se && ((n = a = _e) && (a = d1(
          a,
          t.type,
          t.pendingProps,
          Ct
        ), a !== null ? (t.stateNode = a, Ve = t, _e = Ot(a.firstChild), Ct = !1, n = !0) : n = !1), n || dl(t)), Ga(t), n = t.type, u = t.pendingProps, c = e !== null ? e.memoizedProps : null, a = u.children, Tc(n, u) ? a = null : c !== null && Tc(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = Nr(
          e,
          t,
          zh,
          null,
          null,
          l
        ), Dn._currentValue = n), Mu(e, t), Ke(e, t, a, l), t.child;
      case 6:
        return e === null && se && ((e = l = _e) && (l = m1(
          l,
          t.pendingProps,
          Ct
        ), l !== null ? (t.stateNode = l, Ve = t, _e = null, e = !0) : e = !1), e || dl(t)), null;
      case 13:
        return Lf(e, t, l);
      case 4:
        return Pe(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = Jl(
          t,
          null,
          a,
          l
        ) : Ke(e, t, a, l), t.child;
      case 11:
        return Of(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Ke(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return a = t.pendingProps, ml(t, t.type, a.value), Ke(e, t, a.children, l), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Xl(t), n = Ze(n), a = a(n), t.flags |= 1, Ke(e, t, a, l), t.child;
      case 14:
        return Df(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Uf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Gf(e, t, l);
      case 31:
        return wh(e, t, l);
      case 22:
        return Rf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Xl(t), a = Ze(ke), e === null ? (n = mr(), n === null && (n = Ne, u = fr(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), t.memoizedState = { parent: a, cache: n }, pr(t), ml(t, ke, n)) : ((e.lanes & l) !== 0 && (gr(e, t), dn(t, null, null, l), fn()), n = e.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ml(t, ke, a)) : (a = u.cache, ml(t, ke, a), a !== n.cache && or(
          t,
          [ke],
          l,
          !0
        ))), Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Pt(e) {
    e.flags |= 4;
  }
  function Wr(e, t, l, a, n) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (gd()) e.flags |= 8192;
        else
          throw Kl = pu, hr;
    } else e.flags &= -16777217;
  }
  function Xf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !um(t))
      if (gd()) e.flags |= 8192;
      else
        throw Kl = pu, hr;
  }
  function Du(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ss() : 536870912, e.lanes |= t, Ma |= t);
  }
  function vn(e, t) {
    if (!se)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function Bh(e, t, l) {
    var a = t.pendingProps;
    switch (ur(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ze(t), null;
      case 1:
        return ze(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), $t(ke), Ue(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (ya(t) ? Pt(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, rr())), ze(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Pt(t), u !== null ? (ze(t), Xf(t, u)) : (ze(t), Wr(
          t,
          n,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (Pt(t), ze(t), Xf(t, u)) : (ze(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Pt(t), ze(t), Wr(
          t,
          n,
          e,
          a,
          l
        )), null;
      case 27:
        if (Qn(t), l = ne.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Pt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return ze(t), null;
          }
          e = L.current, ya(t) ? jo(t) : (e = Wd(n, a, l), t.stateNode = e, Pt(t));
        }
        return ze(t), null;
      case 5:
        if (Qn(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Pt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return ze(t), null;
          }
          if (u = L.current, ya(t))
            jo(t);
          else {
            var c = Ku(
              ne.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? c.createElement("select", {
                      is: a.is
                    }) : c.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? c.createElement(n, { is: a.is }) : c.createElement(n);
                }
            }
            u[Xe] = t, u[lt] = a;
            e: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break e;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t)
                  break e;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = u;
            e: switch (Je(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Pt(t);
          }
        }
        return ze(t), Wr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Pt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ne.current, ya(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, n = Ve, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            e[Xe] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Ld(e.nodeValue, l)), e || dl(t, !0);
          } else
            e = Ku(e).createTextNode(
              a
            ), e[Xe] = t, t.stateNode = e;
        }
        return ze(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = ya(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[Xe] = t;
            } else
              Gl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ze(t), e = !1;
          } else
            l = rr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (yt(t), t) : (yt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return ze(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = ya(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(s(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Xe] = t;
            } else
              Gl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ze(t), n = !1;
          } else
            n = rr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (yt(t), t) : (yt(t), null);
        }
        return yt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Du(t, t.updateQueue), ze(t), null);
      case 4:
        return Ue(), e === null && xc(t.stateNode.containerInfo), ze(t), null;
      case 10:
        return $t(t.type), ze(t), null;
      case 19:
        if (D(Re), a = t.memoizedState, a === null) return ze(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) vn(a, !1);
          else {
            if (De !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = xu(e), u !== null) {
                  for (t.flags |= 128, vn(a, !1), e = u.updateQueue, t.updateQueue = e, Du(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    yo(l, e), l = l.sibling;
                  return B(
                    Re,
                    Re.current & 1 | 2
                  ), se && Kt(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && ft() > Bu && (t.flags |= 128, n = !0, vn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = xu(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Du(t, e), vn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !se)
                return ze(t), null;
            } else
              2 * ft() - a.renderingStartTime > Bu && l !== 536870912 && (t.flags |= 128, n = !0, vn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = ft(), e.sibling = null, l = Re.current, B(
          Re,
          n ? l & 1 | 2 : l & 1
        ), se && Kt(t, a.treeForkCount), e) : (ze(t), null);
      case 22:
      case 23:
        return yt(t), br(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (ze(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ze(t), l = t.updateQueue, l !== null && Du(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && D(Vl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), $t(ke), ze(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Hh(e, t) {
    switch (ur(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return $t(ke), Ue(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Qn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (yt(t), t.alternate === null)
            throw Error(s(340));
          Gl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (yt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          Gl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return D(Re), null;
      case 4:
        return Ue(), null;
      case 10:
        return $t(t.type), null;
      case 22:
      case 23:
        return yt(t), br(), e !== null && D(Vl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return $t(ke), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vf(e, t) {
    switch (ur(t), t.tag) {
      case 3:
        $t(ke), Ue();
        break;
      case 26:
      case 27:
      case 5:
        Qn(t);
        break;
      case 4:
        Ue();
        break;
      case 31:
        t.memoizedState !== null && yt(t);
        break;
      case 13:
        yt(t);
        break;
      case 19:
        D(Re);
        break;
      case 10:
        $t(t.type);
        break;
      case 22:
      case 23:
        yt(t), br(), e !== null && D(Vl);
        break;
      case 24:
        $t(ke);
    }
  }
  function xn(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create, c = l.inst;
            a = u(), c.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (d) {
      ge(t, t.return, d);
    }
  }
  function xl(e, t, l) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var c = a.inst, d = c.destroy;
            if (d !== void 0) {
              c.destroy = void 0, n = t;
              var m = l, S = d;
              try {
                S();
              } catch (A) {
                ge(
                  n,
                  m,
                  A
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (A) {
      ge(t, t.return, A);
    }
  }
  function Zf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        wo(t, l);
      } catch (a) {
        ge(e, e.return, a);
      }
    }
  }
  function Kf(e, t, l) {
    l.props = Fl(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      ge(e, t, a);
    }
  }
  function bn(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(a) : l.current = a;
      }
    } catch (n) {
      ge(e, t, n);
    }
  }
  function qt(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ge(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          ge(e, t, n);
        }
      else l.current = null;
  }
  function Jf(e) {
    var t = e.type, l = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      ge(e, e.return, n);
    }
  }
  function Ir(e, t, l) {
    try {
      var a = e.stateNode;
      i1(a, e.type, l, t), a[lt] = t;
    } catch (n) {
      ge(e, e.return, n);
    }
  }
  function $f(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && _l(e.type) || e.tag === 4;
  }
  function Pr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || $f(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && _l(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ec(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Xt));
    else if (a !== 4 && (a === 27 && _l(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (ec(e, t, l), e = e.sibling; e !== null; )
        ec(e, t, l), e = e.sibling;
  }
  function Uu(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && _l(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Uu(e, t, l), e = e.sibling; e !== null; )
        Uu(e, t, l), e = e.sibling;
  }
  function Ff(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      Je(t, a, l), t[Xe] = e, t[lt] = l;
    } catch (u) {
      ge(e, e.return, u);
    }
  }
  var el = !1, qe = !1, tc = !1, Wf = typeof WeakSet == "function" ? WeakSet : Set, Ge = null;
  function qh(e, t) {
    if (e = e.containerInfo, jc = ei, e = ro(e), Ji(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break e;
            }
            var c = 0, d = -1, m = -1, S = 0, A = 0, O = e, j = null;
            t: for (; ; ) {
              for (var E; O !== l || n !== 0 && O.nodeType !== 3 || (d = c + n), O !== u || a !== 0 && O.nodeType !== 3 || (m = c + a), O.nodeType === 3 && (c += O.nodeValue.length), (E = O.firstChild) !== null; )
                j = O, O = E;
              for (; ; ) {
                if (O === e) break t;
                if (j === l && ++S === n && (d = c), j === u && ++A === a && (m = c), (E = O.nextSibling) !== null) break;
                O = j, j = O.parentNode;
              }
              O = E;
            }
            l = d === -1 || m === -1 ? null : { start: d, end: m };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Nc = { focusedElem: e, selectionRange: l }, ei = !1, Ge = t; Ge !== null; )
      if (t = Ge, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ge = e;
      else
        for (; Ge !== null; ) {
          switch (t = Ge, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  n = e[l], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, l = t, n = u.memoizedProps, u = u.memoizedState, a = l.stateNode;
                try {
                  var q = Fl(
                    l.type,
                    n
                  );
                  e = a.getSnapshotBeforeUpdate(
                    q,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (K) {
                  ge(
                    l,
                    l.return,
                    K
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  _c(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _c(e);
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ge = e;
            break;
          }
          Ge = t.return;
        }
  }
  function If(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ll(e, l), a & 4 && xn(5, l);
        break;
      case 1:
        if (ll(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (c) {
              ge(l, l.return, c);
            }
          else {
            var n = Fl(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                n,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              ge(
                l,
                l.return,
                c
              );
            }
          }
        a & 64 && Zf(l), a & 512 && bn(l, l.return);
        break;
      case 3:
        if (ll(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            wo(e, t);
          } catch (c) {
            ge(l, l.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Ff(l);
      case 26:
      case 5:
        ll(e, l), t === null && a & 4 && Jf(l), a & 512 && bn(l, l.return);
        break;
      case 12:
        ll(e, l);
        break;
      case 31:
        ll(e, l), a & 4 && td(e, l);
        break;
      case 13:
        ll(e, l), a & 4 && ld(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = Jh.bind(
          null,
          l
        ), h1(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || el, !a) {
          t = t !== null && t.memoizedState !== null || qe, n = el;
          var u = qe;
          el = a, (qe = t) && !u ? al(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : ll(e, l), el = n, qe = u;
        }
        break;
      case 30:
        break;
      default:
        ll(e, l);
    }
  }
  function Pf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Pf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Oi(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ae = null, nt = !1;
  function tl(e, t, l) {
    for (l = l.child; l !== null; )
      ed(e, t, l), l = l.sibling;
  }
  function ed(e, t, l) {
    if (dt && typeof dt.onCommitFiberUnmount == "function")
      try {
        dt.onCommitFiberUnmount(Qa, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        qe || qt(l, t), tl(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        qe || qt(l, t);
        var a = Ae, n = nt;
        _l(l.type) && (Ae = l.stateNode, nt = !1), tl(
          e,
          t,
          l
        ), Cn(l.stateNode), Ae = a, nt = n;
        break;
      case 5:
        qe || qt(l, t);
      case 6:
        if (a = Ae, n = nt, Ae = null, tl(
          e,
          t,
          l
        ), Ae = a, nt = n, Ae !== null)
          if (nt)
            try {
              (Ae.nodeType === 9 ? Ae.body : Ae.nodeName === "HTML" ? Ae.ownerDocument.body : Ae).removeChild(l.stateNode);
            } catch (u) {
              ge(
                l,
                t,
                u
              );
            }
          else
            try {
              Ae.removeChild(l.stateNode);
            } catch (u) {
              ge(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        Ae !== null && (nt ? (e = Ae, Zd(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Ha(e)) : Zd(Ae, l.stateNode));
        break;
      case 4:
        a = Ae, n = nt, Ae = l.stateNode.containerInfo, nt = !0, tl(
          e,
          t,
          l
        ), Ae = a, nt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        xl(2, l, t), qe || xl(4, l, t), tl(
          e,
          t,
          l
        );
        break;
      case 1:
        qe || (qt(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Kf(
          l,
          t,
          a
        )), tl(
          e,
          t,
          l
        );
        break;
      case 21:
        tl(
          e,
          t,
          l
        );
        break;
      case 22:
        qe = (a = qe) || l.memoizedState !== null, tl(
          e,
          t,
          l
        ), qe = a;
        break;
      default:
        tl(
          e,
          t,
          l
        );
    }
  }
  function td(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ha(e);
      } catch (l) {
        ge(t, t.return, l);
      }
    }
  }
  function ld(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ha(e);
      } catch (l) {
        ge(t, t.return, l);
      }
  }
  function Lh(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Wf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Wf()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function Ru(e, t) {
    var l = Lh(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = $h.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function ut(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a], u = e, c = t, d = c;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (_l(d.type)) {
                Ae = d.stateNode, nt = !1;
                break e;
              }
              break;
            case 5:
              Ae = d.stateNode, nt = !1;
              break e;
            case 3:
            case 4:
              Ae = d.stateNode.containerInfo, nt = !0;
              break e;
          }
          d = d.return;
        }
        if (Ae === null) throw Error(s(160));
        ed(u, c, n), Ae = null, nt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ad(t, e), t = t.sibling;
  }
  var wt = null;
  function ad(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ut(t, e), it(e), a & 4 && (xl(3, e, e.return), xn(3, e), xl(5, e, e.return));
        break;
      case 1:
        ut(t, e), it(e), a & 512 && (qe || l === null || qt(l, l.return)), a & 64 && el && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var n = wt;
        if (ut(t, e), it(e), a & 512 && (qe || l === null || qt(l, l.return)), a & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Za] || u[Xe] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Je(u, a, l), u[Xe] = e, Ye(u), a = u;
                      break e;
                    case "link":
                      var c = am(
                        "link",
                        "href",
                        n
                      ).get(a + (l.href || ""));
                      if (c) {
                        for (var d = 0; d < c.length; d++)
                          if (u = c[d], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            c.splice(d, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), Je(u, a, l), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (c = am(
                        "meta",
                        "content",
                        n
                      ).get(a + (l.content || ""))) {
                        for (d = 0; d < c.length; d++)
                          if (u = c[d], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            c.splice(d, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), Je(u, a, l), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[Xe] = e, Ye(u), a = u;
                }
                e.stateNode = a;
              } else
                nm(
                  n,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = lm(
                n,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? nm(
              n,
              e.type,
              e.stateNode
            ) : lm(
              n,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Ir(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ut(t, e), it(e), a & 512 && (qe || l === null || qt(l, l.return)), l !== null && a & 4 && Ir(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ut(t, e), it(e), a & 512 && (qe || l === null || qt(l, l.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            ra(n, "");
          } catch (q) {
            ge(e, e.return, q);
          }
        }
        a & 4 && e.stateNode != null && (n = e.memoizedProps, Ir(
          e,
          n,
          l !== null ? l.memoizedProps : n
        )), a & 1024 && (tc = !0);
        break;
      case 6:
        if (ut(t, e), it(e), a & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (q) {
            ge(e, e.return, q);
          }
        }
        break;
      case 3:
        if (Fu = null, n = wt, wt = Ju(t.containerInfo), ut(t, e), wt = n, it(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ha(t.containerInfo);
          } catch (q) {
            ge(e, e.return, q);
          }
        tc && (tc = !1, nd(e));
        break;
      case 4:
        a = wt, wt = Ju(
          e.stateNode.containerInfo
        ), ut(t, e), it(e), wt = a;
        break;
      case 12:
        ut(t, e), it(e);
        break;
      case 31:
        ut(t, e), it(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ru(e, a)));
        break;
      case 13:
        ut(t, e), it(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ku = ft()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ru(e, a)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var m = l !== null && l.memoizedState !== null, S = el, A = qe;
        if (el = S || n, qe = A || m, ut(t, e), qe = A, el = S, it(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || m || el || qe || Wl(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                m = l = t;
                try {
                  if (u = m.stateNode, n)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    d = m.stateNode;
                    var O = m.memoizedProps.style, j = O != null && O.hasOwnProperty("display") ? O.display : null;
                    d.style.display = j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (q) {
                  ge(m, m.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                m = t;
                try {
                  m.stateNode.nodeValue = n ? "" : m.memoizedProps;
                } catch (q) {
                  ge(m, m.return, q);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                m = t;
                try {
                  var E = m.stateNode;
                  n ? Kd(E, !0) : Kd(m.stateNode, !1);
                } catch (q) {
                  ge(m, m.return, q);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Ru(e, l))));
        break;
      case 19:
        ut(t, e), it(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Ru(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ut(t, e), it(e);
    }
  }
  function it(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if ($f(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode, u = Pr(e);
            Uu(e, u, n);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (ra(c, ""), l.flags &= -33);
            var d = Pr(e);
            Uu(e, d, c);
            break;
          case 3:
          case 4:
            var m = l.stateNode.containerInfo, S = Pr(e);
            ec(
              e,
              S,
              m
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (A) {
        ge(e, e.return, A);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function nd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        nd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function ll(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        If(e, t.alternate, t), t = t.sibling;
  }
  function Wl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          xl(4, t, t.return), Wl(t);
          break;
        case 1:
          qt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Kf(
            t,
            t.return,
            l
          ), Wl(t);
          break;
        case 27:
          Cn(t.stateNode);
        case 26:
        case 5:
          qt(t, t.return), Wl(t);
          break;
        case 22:
          t.memoizedState === null && Wl(t);
          break;
        case 30:
          Wl(t);
          break;
        default:
          Wl(t);
      }
      e = e.sibling;
    }
  }
  function al(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = e, u = t, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          al(
            n,
            u,
            l
          ), xn(4, u);
          break;
        case 1:
          if (al(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (S) {
              ge(a, a.return, S);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var d = a.stateNode;
            try {
              var m = n.shared.hiddenCallbacks;
              if (m !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < m.length; n++)
                  Ro(m[n], d);
            } catch (S) {
              ge(a, a.return, S);
            }
          }
          l && c & 64 && Zf(u), bn(u, u.return);
          break;
        case 27:
          Ff(u);
        case 26:
        case 5:
          al(
            n,
            u,
            l
          ), l && a === null && c & 4 && Jf(u), bn(u, u.return);
          break;
        case 12:
          al(
            n,
            u,
            l
          );
          break;
        case 31:
          al(
            n,
            u,
            l
          ), l && c & 4 && td(n, u);
          break;
        case 13:
          al(
            n,
            u,
            l
          ), l && c & 4 && ld(n, u);
          break;
        case 22:
          u.memoizedState === null && al(
            n,
            u,
            l
          ), bn(u, u.return);
          break;
        case 30:
          break;
        default:
          al(
            n,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function lc(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && un(l));
  }
  function ac(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && un(e));
  }
  function kt(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ud(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function ud(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        kt(
          e,
          t,
          l,
          a
        ), n & 2048 && xn(9, t);
        break;
      case 1:
        kt(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        kt(
          e,
          t,
          l,
          a
        ), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && un(e)));
        break;
      case 12:
        if (n & 2048) {
          kt(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, c = u.id, d = u.onPostCommit;
            typeof d == "function" && d(
              c,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (m) {
            ge(t, t.return, m);
          }
        } else
          kt(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        kt(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        kt(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, c = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? kt(
          e,
          t,
          l,
          a
        ) : Sn(e, t) : u._visibility & 2 ? kt(
          e,
          t,
          l,
          a
        ) : (u._visibility |= 2, za(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && lc(c, t);
        break;
      case 24:
        kt(
          e,
          t,
          l,
          a
        ), n & 2048 && ac(t.alternate, t);
        break;
      default:
        kt(
          e,
          t,
          l,
          a
        );
    }
  }
  function za(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, c = t, d = l, m = a, S = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          za(
            u,
            c,
            d,
            m,
            n
          ), xn(8, c);
          break;
        case 23:
          break;
        case 22:
          var A = c.stateNode;
          c.memoizedState !== null ? A._visibility & 2 ? za(
            u,
            c,
            d,
            m,
            n
          ) : Sn(
            u,
            c
          ) : (A._visibility |= 2, za(
            u,
            c,
            d,
            m,
            n
          )), n && S & 2048 && lc(
            c.alternate,
            c
          );
          break;
        case 24:
          za(
            u,
            c,
            d,
            m,
            n
          ), n && S & 2048 && ac(c.alternate, c);
          break;
        default:
          za(
            u,
            c,
            d,
            m,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Sn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            Sn(l, a), n & 2048 && lc(
              a.alternate,
              a
            );
            break;
          case 24:
            Sn(l, a), n & 2048 && ac(a.alternate, a);
            break;
          default:
            Sn(l, a);
        }
        t = t.sibling;
      }
  }
  var jn = 8192;
  function Aa(e, t, l) {
    if (e.subtreeFlags & jn)
      for (e = e.child; e !== null; )
        id(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function id(e, t, l) {
    switch (e.tag) {
      case 26:
        Aa(
          e,
          t,
          l
        ), e.flags & jn && e.memoizedState !== null && _1(
          l,
          wt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Aa(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = wt;
        wt = Ju(e.stateNode.containerInfo), Aa(
          e,
          t,
          l
        ), wt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = jn, jn = 16777216, Aa(
          e,
          t,
          l
        ), jn = a) : Aa(
          e,
          t,
          l
        ));
        break;
      default:
        Aa(
          e,
          t,
          l
        );
    }
  }
  function rd(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Nn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Ge = a, sd(
            a,
            e
          );
        }
      rd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        cd(e), e = e.sibling;
  }
  function cd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Nn(e), e.flags & 2048 && xl(9, e, e.return);
        break;
      case 3:
        Nn(e);
        break;
      case 12:
        Nn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, wu(e)) : Nn(e);
        break;
      default:
        Nn(e);
    }
  }
  function wu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Ge = a, sd(
            a,
            e
          );
        }
      rd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          xl(8, t, t.return), wu(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, wu(t));
          break;
        default:
          wu(t);
      }
      e = e.sibling;
    }
  }
  function sd(e, t) {
    for (; Ge !== null; ) {
      var l = Ge;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          xl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          un(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Ge = a;
      else
        e: for (l = e; Ge !== null; ) {
          a = Ge;
          var n = a.sibling, u = a.return;
          if (Pf(a), a === l) {
            Ge = null;
            break e;
          }
          if (n !== null) {
            n.return = u, Ge = n;
            break e;
          }
          Ge = u;
        }
    }
  }
  var Yh = {
    getCacheForType: function(e) {
      var t = Ze(ke), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Ze(ke).controller.signal;
    }
  }, Gh = typeof WeakMap == "function" ? WeakMap : Map, me = 0, Ne = null, ue = null, re = 0, pe = 0, vt = null, bl = !1, Ca = !1, nc = !1, nl = 0, De = 0, Sl = 0, Il = 0, uc = 0, xt = 0, Ma = 0, Tn = null, rt = null, ic = !1, ku = 0, od = 0, Bu = 1 / 0, Hu = null, jl = null, Le = 0, Nl = null, Oa = null, ul = 0, rc = 0, cc = null, fd = null, En = 0, sc = null;
  function bt() {
    return (me & 2) !== 0 && re !== 0 ? re & -re : C.T !== null ? pc() : Es();
  }
  function dd() {
    if (xt === 0)
      if ((re & 536870912) === 0 || se) {
        var e = Zn;
        Zn <<= 1, (Zn & 3932160) === 0 && (Zn = 262144), xt = e;
      } else xt = 536870912;
    return e = gt.current, e !== null && (e.flags |= 32), xt;
  }
  function ct(e, t, l) {
    (e === Ne && (pe === 2 || pe === 9) || e.cancelPendingCommit !== null) && (Da(e, 0), Tl(
      e,
      re,
      xt,
      !1
    )), Va(e, l), ((me & 2) === 0 || e !== Ne) && (e === Ne && ((me & 2) === 0 && (Il |= l), De === 4 && Tl(
      e,
      re,
      xt,
      !1
    )), Lt(e));
  }
  function md(e, t, l) {
    if ((me & 6) !== 0) throw Error(s(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Xa(e, t), n = a ? Vh(e, t) : fc(e, t, !0), u = a;
    do {
      if (n === 0) {
        Ca && !a && Tl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !Qh(l)) {
          n = fc(e, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = e.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            e: {
              var d = e;
              n = Tn;
              var m = d.current.memoizedState.isDehydrated;
              if (m && (Da(d, c).flags |= 256), c = fc(
                d,
                c,
                !1
              ), c !== 2) {
                if (nc && !m) {
                  d.errorRecoveryDisabledLanes |= u, Il |= u, n = 4;
                  break e;
                }
                u = rt, rt = n, u !== null && (rt === null ? rt = u : rt.push.apply(
                  rt,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Da(e, 0), Tl(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, u = n, u) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Tl(
                a,
                t,
                xt,
                !bl
              );
              break e;
            case 2:
              rt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (n = ku + 300 - ft(), 10 < n)) {
            if (Tl(
              a,
              t,
              xt,
              !bl
            ), Jn(a, 0, !0) !== 0) break e;
            ul = t, a.timeoutHandle = Xd(
              hd.bind(
                null,
                a,
                l,
                rt,
                Hu,
                ic,
                t,
                xt,
                Il,
                Ma,
                bl,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          hd(
            a,
            l,
            rt,
            Hu,
            ic,
            t,
            xt,
            Il,
            Ma,
            bl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Lt(e);
  }
  function hd(e, t, l, a, n, u, c, d, m, S, A, O, j, E) {
    if (e.timeoutHandle = -1, O = t.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Xt
      }, id(
        t,
        u,
        O
      );
      var q = (u & 62914560) === u ? ku - ft() : (u & 4194048) === u ? od - ft() : 0;
      if (q = z1(
        O,
        q
      ), q !== null) {
        ul = u, e.cancelPendingCommit = q(
          jd.bind(
            null,
            e,
            t,
            u,
            l,
            a,
            n,
            c,
            d,
            m,
            A,
            O,
            null,
            j,
            E
          )
        ), Tl(e, u, c, !S);
        return;
      }
    }
    jd(
      e,
      t,
      u,
      l,
      a,
      n,
      c,
      d,
      m
    );
  }
  function Qh(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!ht(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
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
  function Tl(e, t, l, a) {
    t &= ~uc, t &= ~Il, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - mt(n), c = 1 << u;
      a[u] = -1, n &= ~c;
    }
    l !== 0 && js(e, l, t);
  }
  function qu() {
    return (me & 6) === 0 ? (_n(0), !1) : !0;
  }
  function oc() {
    if (ue !== null) {
      if (pe === 0)
        var e = ue.return;
      else
        e = ue, Jt = Ql = null, _r(e), ja = null, cn = 0, e = ue;
      for (; e !== null; )
        Vf(e.alternate, e), e = e.return;
      ue = null;
    }
  }
  function Da(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, s1(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ul = 0, oc(), Ne = e, ue = l = Zt(e.current, null), re = t, pe = 0, vt = null, bl = !1, Ca = Xa(e, t), nc = !1, Ma = xt = uc = Il = Sl = De = 0, rt = Tn = null, ic = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - mt(a), u = 1 << n;
        t |= e[n], a &= ~u;
      }
    return nl = t, iu(), l;
  }
  function pd(e, t) {
    le = null, C.H = gn, t === Sa || t === hu ? (t = Mo(), pe = 3) : t === hr ? (t = Mo(), pe = 4) : pe = t === Gr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, vt = t, ue === null && (De = 1, Au(
      e,
      _t(t, e.current)
    ));
  }
  function gd() {
    var e = gt.current;
    return e === null ? !0 : (re & 4194048) === re ? Mt === null : (re & 62914560) === re || (re & 536870912) !== 0 ? e === Mt : !1;
  }
  function yd() {
    var e = C.H;
    return C.H = gn, e === null ? gn : e;
  }
  function vd() {
    var e = C.A;
    return C.A = Yh, e;
  }
  function Lu() {
    De = 4, bl || (re & 4194048) !== re && gt.current !== null || (Ca = !0), (Sl & 134217727) === 0 && (Il & 134217727) === 0 || Ne === null || Tl(
      Ne,
      re,
      xt,
      !1
    );
  }
  function fc(e, t, l) {
    var a = me;
    me |= 2;
    var n = yd(), u = vd();
    (Ne !== e || re !== t) && (Hu = null, Da(e, t)), t = !1;
    var c = De;
    e: do
      try {
        if (pe !== 0 && ue !== null) {
          var d = ue, m = vt;
          switch (pe) {
            case 8:
              oc(), c = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              gt.current === null && (t = !0);
              var S = pe;
              if (pe = 0, vt = null, Ua(e, d, m, S), l && Ca) {
                c = 0;
                break e;
              }
              break;
            default:
              S = pe, pe = 0, vt = null, Ua(e, d, m, S);
          }
        }
        Xh(), c = De;
        break;
      } catch (A) {
        pd(e, A);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Jt = Ql = null, me = a, C.H = n, C.A = u, ue === null && (Ne = null, re = 0, iu()), c;
  }
  function Xh() {
    for (; ue !== null; ) xd(ue);
  }
  function Vh(e, t) {
    var l = me;
    me |= 2;
    var a = yd(), n = vd();
    Ne !== e || re !== t ? (Hu = null, Bu = ft() + 500, Da(e, t)) : Ca = Xa(
      e,
      t
    );
    e: do
      try {
        if (pe !== 0 && ue !== null) {
          t = ue;
          var u = vt;
          t: switch (pe) {
            case 1:
              pe = 0, vt = null, Ua(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Ao(u)) {
                pe = 0, vt = null, bd(t);
                break;
              }
              t = function() {
                pe !== 2 && pe !== 9 || Ne !== e || (pe = 7), Lt(e);
              }, u.then(t, t);
              break e;
            case 3:
              pe = 7;
              break e;
            case 4:
              pe = 5;
              break e;
            case 7:
              Ao(u) ? (pe = 0, vt = null, bd(t)) : (pe = 0, vt = null, Ua(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (ue.tag) {
                case 26:
                  c = ue.memoizedState;
                case 5:
                case 27:
                  var d = ue;
                  if (c ? um(c) : d.stateNode.complete) {
                    pe = 0, vt = null;
                    var m = d.sibling;
                    if (m !== null) ue = m;
                    else {
                      var S = d.return;
                      S !== null ? (ue = S, Yu(S)) : ue = null;
                    }
                    break t;
                  }
              }
              pe = 0, vt = null, Ua(e, t, u, 5);
              break;
            case 6:
              pe = 0, vt = null, Ua(e, t, u, 6);
              break;
            case 8:
              oc(), De = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Zh();
        break;
      } catch (A) {
        pd(e, A);
      }
    while (!0);
    return Jt = Ql = null, C.H = a, C.A = n, me = l, ue !== null ? 0 : (Ne = null, re = 0, iu(), De);
  }
  function Zh() {
    for (; ue !== null && !p0(); )
      xd(ue);
  }
  function xd(e) {
    var t = Qf(e.alternate, e, nl);
    e.memoizedProps = e.pendingProps, t === null ? Yu(e) : ue = t;
  }
  function bd(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Bf(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          re
        );
        break;
      case 11:
        t = Bf(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          re
        );
        break;
      case 5:
        _r(t);
      default:
        Vf(l, t), t = ue = yo(t, nl), t = Qf(l, t, nl);
    }
    e.memoizedProps = e.pendingProps, t === null ? Yu(e) : ue = t;
  }
  function Ua(e, t, l, a) {
    Jt = Ql = null, _r(t), ja = null, cn = 0;
    var n = t.return;
    try {
      if (Rh(
        e,
        n,
        t,
        l,
        re
      )) {
        De = 1, Au(
          e,
          _t(l, e.current)
        ), ue = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ue = n, u;
      De = 1, Au(
        e,
        _t(l, e.current)
      ), ue = null;
      return;
    }
    t.flags & 32768 ? (se || a === 1 ? e = !0 : Ca || (re & 536870912) !== 0 ? e = !1 : (bl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = gt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Sd(t, e)) : Yu(t);
  }
  function Yu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Sd(
          t,
          bl
        );
        return;
      }
      e = t.return;
      var l = Bh(
        t.alternate,
        t,
        nl
      );
      if (l !== null) {
        ue = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    De === 0 && (De = 5);
  }
  function Sd(e, t) {
    do {
      var l = Hh(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, ue = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        ue = e;
        return;
      }
      ue = e = l;
    } while (e !== null);
    De = 6, ue = null;
  }
  function jd(e, t, l, a, n, u, c, d, m) {
    e.cancelPendingCommit = null;
    do
      Gu();
    while (Le !== 0);
    if ((me & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (u = t.lanes | t.childLanes, u |= Pi, E0(
        e,
        l,
        u,
        c,
        d,
        m
      ), e === Ne && (ue = Ne = null, re = 0), Oa = t, Nl = e, ul = l, rc = u, cc = n, fd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Fh(Xn, function() {
        return zd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = C.T, C.T = null, n = k.p, k.p = 2, c = me, me |= 4;
        try {
          qh(e, t, l);
        } finally {
          me = c, k.p = n, C.T = a;
        }
      }
      Le = 1, Nd(), Td(), Ed();
    }
  }
  function Nd() {
    if (Le === 1) {
      Le = 0;
      var e = Nl, t = Oa, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = C.T, C.T = null;
        var a = k.p;
        k.p = 2;
        var n = me;
        me |= 4;
        try {
          ad(t, e);
          var u = Nc, c = ro(e.containerInfo), d = u.focusedElem, m = u.selectionRange;
          if (c !== d && d && d.ownerDocument && io(
            d.ownerDocument.documentElement,
            d
          )) {
            if (m !== null && Ji(d)) {
              var S = m.start, A = m.end;
              if (A === void 0 && (A = S), "selectionStart" in d)
                d.selectionStart = S, d.selectionEnd = Math.min(
                  A,
                  d.value.length
                );
              else {
                var O = d.ownerDocument || document, j = O && O.defaultView || window;
                if (j.getSelection) {
                  var E = j.getSelection(), q = d.textContent.length, K = Math.min(m.start, q), Se = m.end === void 0 ? K : Math.min(m.end, q);
                  !E.extend && K > Se && (c = Se, Se = K, K = c);
                  var v = uo(
                    d,
                    K
                  ), p = uo(
                    d,
                    Se
                  );
                  if (v && p && (E.rangeCount !== 1 || E.anchorNode !== v.node || E.anchorOffset !== v.offset || E.focusNode !== p.node || E.focusOffset !== p.offset)) {
                    var b = O.createRange();
                    b.setStart(v.node, v.offset), E.removeAllRanges(), K > Se ? (E.addRange(b), E.extend(p.node, p.offset)) : (b.setEnd(p.node, p.offset), E.addRange(b));
                  }
                }
              }
            }
            for (O = [], E = d; E = E.parentNode; )
              E.nodeType === 1 && O.push({
                element: E,
                left: E.scrollLeft,
                top: E.scrollTop
              });
            for (typeof d.focus == "function" && d.focus(), d = 0; d < O.length; d++) {
              var M = O[d];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          ei = !!jc, Nc = jc = null;
        } finally {
          me = n, k.p = a, C.T = l;
        }
      }
      e.current = t, Le = 2;
    }
  }
  function Td() {
    if (Le === 2) {
      Le = 0;
      var e = Nl, t = Oa, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = C.T, C.T = null;
        var a = k.p;
        k.p = 2;
        var n = me;
        me |= 4;
        try {
          If(e, t.alternate, t);
        } finally {
          me = n, k.p = a, C.T = l;
        }
      }
      Le = 3;
    }
  }
  function Ed() {
    if (Le === 4 || Le === 3) {
      Le = 0, g0();
      var e = Nl, t = Oa, l = ul, a = fd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Le = 5 : (Le = 0, Oa = Nl = null, _d(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (jl = null), Ci(l), t = t.stateNode, dt && typeof dt.onCommitFiberRoot == "function")
        try {
          dt.onCommitFiberRoot(
            Qa,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = C.T, n = k.p, k.p = 2, C.T = null;
        try {
          for (var u = e.onRecoverableError, c = 0; c < a.length; c++) {
            var d = a[c];
            u(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          C.T = t, k.p = n;
        }
      }
      (ul & 3) !== 0 && Gu(), Lt(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === sc ? En++ : (En = 0, sc = e) : En = 0, _n(0);
    }
  }
  function _d(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, un(t)));
  }
  function Gu() {
    return Nd(), Td(), Ed(), zd();
  }
  function zd() {
    if (Le !== 5) return !1;
    var e = Nl, t = rc;
    rc = 0;
    var l = Ci(ul), a = C.T, n = k.p;
    try {
      k.p = 32 > l ? 32 : l, C.T = null, l = cc, cc = null;
      var u = Nl, c = ul;
      if (Le = 0, Oa = Nl = null, ul = 0, (me & 6) !== 0) throw Error(s(331));
      var d = me;
      if (me |= 4, cd(u.current), ud(
        u,
        u.current,
        c,
        l
      ), me = d, _n(0, !1), dt && typeof dt.onPostCommitFiberRoot == "function")
        try {
          dt.onPostCommitFiberRoot(Qa, u);
        } catch {
        }
      return !0;
    } finally {
      k.p = n, C.T = a, _d(e, t);
    }
  }
  function Ad(e, t, l) {
    t = _t(l, t), t = Yr(e.stateNode, t, 2), e = gl(e, t, 2), e !== null && (Va(e, 2), Lt(e));
  }
  function ge(e, t, l) {
    if (e.tag === 3)
      Ad(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ad(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (jl === null || !jl.has(a))) {
            e = _t(l, e), l = Cf(2), a = gl(t, l, 2), a !== null && (Mf(
              l,
              a,
              t,
              e
            ), Va(a, 2), Lt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function dc(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Gh();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(l) || (nc = !0, n.add(l), e = Kh.bind(null, e, t, l), t.then(e, e));
  }
  function Kh(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ne === e && (re & l) === l && (De === 4 || De === 3 && (re & 62914560) === re && 300 > ft() - ku ? (me & 2) === 0 && Da(e, 0) : uc |= l, Ma === re && (Ma = 0)), Lt(e);
  }
  function Cd(e, t) {
    t === 0 && (t = Ss()), e = Ll(e, t), e !== null && (Va(e, t), Lt(e));
  }
  function Jh(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Cd(e, l);
  }
  function $h(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(t), Cd(e, l);
  }
  function Fh(e, t) {
    return Ei(e, t);
  }
  var Qu = null, Ra = null, mc = !1, Xu = !1, hc = !1, El = 0;
  function Lt(e) {
    e !== Ra && e.next === null && (Ra === null ? Qu = Ra = e : Ra = Ra.next = e), Xu = !0, mc || (mc = !0, Ih());
  }
  function _n(e, t) {
    if (!hc && Xu) {
      hc = !0;
      do
        for (var l = !1, a = Qu; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes, d = a.pingedLanes;
              u = (1 << 31 - mt(42 | e) + 1) - 1, u &= n & ~(c & ~d), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Ud(a, u));
          } else
            u = re, u = Jn(
              a,
              a === Ne ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Xa(a, u) || (l = !0, Ud(a, u));
          a = a.next;
        }
      while (l);
      hc = !1;
    }
  }
  function Wh() {
    Md();
  }
  function Md() {
    Xu = mc = !1;
    var e = 0;
    El !== 0 && c1() && (e = El);
    for (var t = ft(), l = null, a = Qu; a !== null; ) {
      var n = a.next, u = Od(a, t);
      u === 0 ? (a.next = null, l === null ? Qu = n : l.next = n, n === null && (Ra = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (Xu = !0)), a = n;
    }
    Le !== 0 && Le !== 5 || _n(e), El !== 0 && (El = 0);
  }
  function Od(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - mt(u), d = 1 << c, m = n[c];
      m === -1 ? ((d & l) === 0 || (d & a) !== 0) && (n[c] = T0(d, t)) : m <= t && (e.expiredLanes |= d), u &= ~d;
    }
    if (t = Ne, l = re, l = Jn(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (pe === 2 || pe === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && _i(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Xa(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && _i(a), Ci(l)) {
        case 2:
        case 8:
          l = xs;
          break;
        case 32:
          l = Xn;
          break;
        case 268435456:
          l = bs;
          break;
        default:
          l = Xn;
      }
      return a = Dd.bind(null, e), l = Ei(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && _i(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Dd(e, t) {
    if (Le !== 0 && Le !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Gu() && e.callbackNode !== l)
      return null;
    var a = re;
    return a = Jn(
      e,
      e === Ne ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (md(e, a, t), Od(e, ft()), e.callbackNode != null && e.callbackNode === l ? Dd.bind(null, e) : null);
  }
  function Ud(e, t) {
    if (Gu()) return null;
    md(e, t, !0);
  }
  function Ih() {
    o1(function() {
      (me & 6) !== 0 ? Ei(
        vs,
        Wh
      ) : Md();
    });
  }
  function pc() {
    if (El === 0) {
      var e = xa;
      e === 0 && (e = Vn, Vn <<= 1, (Vn & 261888) === 0 && (Vn = 256)), El = e;
    }
    return El;
  }
  function Rd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : In("" + e);
  }
  function wd(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function Ph(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = Rd(
        (n[lt] || null).action
      ), c = a.submitter;
      c && (t = (t = c[lt] || null) ? Rd(t.formAction) : c.getAttribute("formAction"), t !== null && (u = t, c = null));
      var d = new lu(
        "action",
        "action",
        null,
        a,
        n
      );
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (El !== 0) {
                  var m = c ? wd(n, c) : new FormData(n);
                  wr(
                    l,
                    {
                      pending: !0,
                      data: m,
                      method: n.method,
                      action: u
                    },
                    null,
                    m
                  );
                }
              } else
                typeof u == "function" && (d.preventDefault(), m = c ? wd(n, c) : new FormData(n), wr(
                  l,
                  {
                    pending: !0,
                    data: m,
                    method: n.method,
                    action: u
                  },
                  u,
                  m
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var gc = 0; gc < Ii.length; gc++) {
    var yc = Ii[gc], e1 = yc.toLowerCase(), t1 = yc[0].toUpperCase() + yc.slice(1);
    Rt(
      e1,
      "on" + t1
    );
  }
  Rt(oo, "onAnimationEnd"), Rt(fo, "onAnimationIteration"), Rt(mo, "onAnimationStart"), Rt("dblclick", "onDoubleClick"), Rt("focusin", "onFocus"), Rt("focusout", "onBlur"), Rt(yh, "onTransitionRun"), Rt(vh, "onTransitionStart"), Rt(xh, "onTransitionCancel"), Rt(ho, "onTransitionEnd"), ua("onMouseEnter", ["mouseout", "mouseover"]), ua("onMouseLeave", ["mouseout", "mouseover"]), ua("onPointerEnter", ["pointerout", "pointerover"]), ua("onPointerLeave", ["pointerout", "pointerover"]), kl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), kl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), kl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), kl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), kl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), kl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var zn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), l1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zn)
  );
  function kd(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], n = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var d = a[c], m = d.instance, S = d.currentTarget;
            if (d = d.listener, m !== u && n.isPropagationStopped())
              break e;
            u = d, n.currentTarget = S;
            try {
              u(n);
            } catch (A) {
              uu(A);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (d = a[c], m = d.instance, S = d.currentTarget, d = d.listener, m !== u && n.isPropagationStopped())
              break e;
            u = d, n.currentTarget = S;
            try {
              u(n);
            } catch (A) {
              uu(A);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function ie(e, t) {
    var l = t[Mi];
    l === void 0 && (l = t[Mi] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (Bd(t, e, 2, !1), l.add(a));
  }
  function vc(e, t, l) {
    var a = 0;
    t && (a |= 4), Bd(
      l,
      e,
      a,
      t
    );
  }
  var Vu = "_reactListening" + Math.random().toString(36).slice(2);
  function xc(e) {
    if (!e[Vu]) {
      e[Vu] = !0, As.forEach(function(l) {
        l !== "selectionchange" && (l1.has(l) || vc(l, !1, e), vc(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Vu] || (t[Vu] = !0, vc("selectionchange", !1, t));
    }
  }
  function Bd(e, t, l, a) {
    switch (dm(t)) {
      case 2:
        var n = M1;
        break;
      case 8:
        n = O1;
        break;
      default:
        n = Rc;
    }
    l = n.bind(
      null,
      t,
      l,
      e
    ), n = void 0, !qi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
      passive: n
    }) : e.addEventListener(t, l, !1);
  }
  function bc(e, t, l, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var d = a.stateNode.containerInfo;
          if (d === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var m = c.tag;
              if ((m === 3 || m === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; d !== null; ) {
            if (c = la(d), c === null) return;
            if (m = c.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              a = u = c;
              continue e;
            }
            d = d.parentNode;
          }
        }
        a = a.return;
      }
    Ls(function() {
      var S = u, A = Bi(l), O = [];
      e: {
        var j = po.get(e);
        if (j !== void 0) {
          var E = lu, q = e;
          switch (e) {
            case "keypress":
              if (eu(l) === 0) break e;
            case "keydown":
            case "keyup":
              E = $0;
              break;
            case "focusin":
              q = "focus", E = Qi;
              break;
            case "focusout":
              q = "blur", E = Qi;
              break;
            case "beforeblur":
            case "afterblur":
              E = Qi;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              E = Qs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              E = B0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              E = I0;
              break;
            case oo:
            case fo:
            case mo:
              E = L0;
              break;
            case ho:
              E = eh;
              break;
            case "scroll":
            case "scrollend":
              E = w0;
              break;
            case "wheel":
              E = lh;
              break;
            case "copy":
            case "cut":
            case "paste":
              E = G0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              E = Vs;
              break;
            case "toggle":
            case "beforetoggle":
              E = nh;
          }
          var K = (t & 4) !== 0, Se = !K && (e === "scroll" || e === "scrollend"), v = K ? j !== null ? j + "Capture" : null : j;
          K = [];
          for (var p = S, b; p !== null; ) {
            var M = p;
            if (b = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || b === null || v === null || (M = Ja(p, v), M != null && K.push(
              An(p, M, b)
            )), Se) break;
            p = p.return;
          }
          0 < K.length && (j = new E(
            j,
            q,
            null,
            l,
            A
          ), O.push({ event: j, listeners: K }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", E = e === "mouseout" || e === "pointerout", j && l !== ki && (q = l.relatedTarget || l.fromElement) && (la(q) || q[ta]))
            break e;
          if ((E || j) && (j = A.window === A ? A : (j = A.ownerDocument) ? j.defaultView || j.parentWindow : window, E ? (q = l.relatedTarget || l.toElement, E = S, q = q ? la(q) : null, q !== null && (Se = g(q), K = q.tag, q !== Se || K !== 5 && K !== 27 && K !== 6) && (q = null)) : (E = null, q = S), E !== q)) {
            if (K = Qs, M = "onMouseLeave", v = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (K = Vs, M = "onPointerLeave", v = "onPointerEnter", p = "pointer"), Se = E == null ? j : Ka(E), b = q == null ? j : Ka(q), j = new K(
              M,
              p + "leave",
              E,
              l,
              A
            ), j.target = Se, j.relatedTarget = b, M = null, la(A) === S && (K = new K(
              v,
              p + "enter",
              q,
              l,
              A
            ), K.target = b, K.relatedTarget = Se, M = K), Se = M, E && q)
              t: {
                for (K = a1, v = E, p = q, b = 0, M = v; M; M = K(M))
                  b++;
                M = 0;
                for (var V = p; V; V = K(V))
                  M++;
                for (; 0 < b - M; )
                  v = K(v), b--;
                for (; 0 < M - b; )
                  p = K(p), M--;
                for (; b--; ) {
                  if (v === p || p !== null && v === p.alternate) {
                    K = v;
                    break t;
                  }
                  v = K(v), p = K(p);
                }
                K = null;
              }
            else K = null;
            E !== null && Hd(
              O,
              j,
              E,
              K,
              !1
            ), q !== null && Se !== null && Hd(
              O,
              Se,
              q,
              K,
              !0
            );
          }
        }
        e: {
          if (j = S ? Ka(S) : window, E = j.nodeName && j.nodeName.toLowerCase(), E === "select" || E === "input" && j.type === "file")
            var fe = Ps;
          else if (Ws(j))
            if (eo)
              fe = hh;
            else {
              fe = dh;
              var Y = fh;
            }
          else
            E = j.nodeName, !E || E.toLowerCase() !== "input" || j.type !== "checkbox" && j.type !== "radio" ? S && wi(S.elementType) && (fe = Ps) : fe = mh;
          if (fe && (fe = fe(e, S))) {
            Is(
              O,
              fe,
              l,
              A
            );
            break e;
          }
          Y && Y(e, j, S), e === "focusout" && S && j.type === "number" && S.memoizedProps.value != null && Ri(j, "number", j.value);
        }
        switch (Y = S ? Ka(S) : window, e) {
          case "focusin":
            (Ws(Y) || Y.contentEditable === "true") && (fa = Y, $i = S, ln = null);
            break;
          case "focusout":
            ln = $i = fa = null;
            break;
          case "mousedown":
            Fi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Fi = !1, co(O, l, A);
            break;
          case "selectionchange":
            if (gh) break;
          case "keydown":
          case "keyup":
            co(O, l, A);
        }
        var ae;
        if (Vi)
          e: {
            switch (e) {
              case "compositionstart":
                var ce = "onCompositionStart";
                break e;
              case "compositionend":
                ce = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ce = "onCompositionUpdate";
                break e;
            }
            ce = void 0;
          }
        else
          oa ? $s(e, l) && (ce = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (ce = "onCompositionStart");
        ce && (Zs && l.locale !== "ko" && (oa || ce !== "onCompositionStart" ? ce === "onCompositionEnd" && oa && (ae = Ys()) : (sl = A, Li = "value" in sl ? sl.value : sl.textContent, oa = !0)), Y = Zu(S, ce), 0 < Y.length && (ce = new Xs(
          ce,
          e,
          null,
          l,
          A
        ), O.push({ event: ce, listeners: Y }), ae ? ce.data = ae : (ae = Fs(l), ae !== null && (ce.data = ae)))), (ae = ih ? rh(e, l) : ch(e, l)) && (ce = Zu(S, "onBeforeInput"), 0 < ce.length && (Y = new Xs(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          A
        ), O.push({
          event: Y,
          listeners: ce
        }), Y.data = ae)), Ph(
          O,
          e,
          S,
          l,
          A
        );
      }
      kd(O, t);
    });
  }
  function An(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Zu(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ja(e, l), n != null && a.unshift(
        An(e, n, u)
      ), n = Ja(e, t), n != null && a.push(
        An(e, n, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function a1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Hd(e, t, l, a, n) {
    for (var u = t._reactName, c = []; l !== null && l !== a; ) {
      var d = l, m = d.alternate, S = d.stateNode;
      if (d = d.tag, m !== null && m === a) break;
      d !== 5 && d !== 26 && d !== 27 || S === null || (m = S, n ? (S = Ja(l, u), S != null && c.unshift(
        An(l, S, m)
      )) : n || (S = Ja(l, u), S != null && c.push(
        An(l, S, m)
      ))), l = l.return;
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var n1 = /\r\n?/g, u1 = /\u0000|\uFFFD/g;
  function qd(e) {
    return (typeof e == "string" ? e : "" + e).replace(n1, `
`).replace(u1, "");
  }
  function Ld(e, t) {
    return t = qd(t), qd(e) === t;
  }
  function be(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || ra(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && ra(e, "" + a);
        break;
      case "className":
        Fn(e, "class", a);
        break;
      case "tabIndex":
        Fn(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Fn(e, l, a);
        break;
      case "style":
        Hs(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          Fn(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = In("" + a), e.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (t !== "input" && be(e, t, "name", n.name, n, null), be(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), be(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), be(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (be(e, t, "encType", n.encType, n, null), be(e, t, "method", n.method, n, null), be(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = In("" + a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = Xt);
        break;
      case "onScroll":
        a != null && ie("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ie("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(s(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = In("" + a), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
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
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
        break;
      case "popover":
        ie("beforetoggle", e), ie("toggle", e), $n(e, "popover", a);
        break;
      case "xlinkActuate":
        Qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Qt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Qt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        $n(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = U0.get(l) || l, $n(e, l, a));
    }
  }
  function Sc(e, t, l, a, n, u) {
    switch (l) {
      case "style":
        Hs(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(s(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string" ? ra(e, a) : (typeof a == "number" || typeof a == "bigint") && ra(e, "" + a);
        break;
      case "onScroll":
        a != null && ie("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ie("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Xt);
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
        if (!Cs.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), u = e[lt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : $n(e, l, a);
          }
    }
  }
  function Je(e, t, l) {
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
        ie("error", e), ie("load", e);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  be(e, t, u, c, l, null);
              }
          }
        n && be(e, t, "srcSet", l.srcSet, l, null), a && be(e, t, "src", l.src, l, null);
        return;
      case "input":
        ie("invalid", e);
        var d = u = c = n = null, m = null, S = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var A = l[a];
            if (A != null)
              switch (a) {
                case "name":
                  n = A;
                  break;
                case "type":
                  c = A;
                  break;
                case "checked":
                  m = A;
                  break;
                case "defaultChecked":
                  S = A;
                  break;
                case "value":
                  u = A;
                  break;
                case "defaultValue":
                  d = A;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (A != null)
                    throw Error(s(137, t));
                  break;
                default:
                  be(e, t, a, A, l, null);
              }
          }
        Rs(
          e,
          u,
          d,
          m,
          S,
          c,
          n,
          !1
        );
        return;
      case "select":
        ie("invalid", e), a = c = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (d = l[n], d != null))
            switch (n) {
              case "value":
                u = d;
                break;
              case "defaultValue":
                c = d;
                break;
              case "multiple":
                a = d;
              default:
                be(e, t, n, d, l, null);
            }
        t = u, l = c, e.multiple = !!a, t != null ? ia(e, !!a, t, !1) : l != null && ia(e, !!a, l, !0);
        return;
      case "textarea":
        ie("invalid", e), u = n = a = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (d = l[c], d != null))
            switch (c) {
              case "value":
                a = d;
                break;
              case "defaultValue":
                n = d;
                break;
              case "children":
                u = d;
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(s(91));
                break;
              default:
                be(e, t, c, d, l, null);
            }
        ks(e, a, n, u);
        return;
      case "option":
        for (m in l)
          if (l.hasOwnProperty(m) && (a = l[m], a != null))
            switch (m) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                be(e, t, m, a, l, null);
            }
        return;
      case "dialog":
        ie("beforetoggle", e), ie("toggle", e), ie("cancel", e), ie("close", e);
        break;
      case "iframe":
      case "object":
        ie("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < zn.length; a++)
          ie(zn[a], e);
        break;
      case "image":
        ie("error", e), ie("load", e);
        break;
      case "details":
        ie("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ie("error", e), ie("load", e);
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
        for (S in l)
          if (l.hasOwnProperty(S) && (a = l[S], a != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                be(e, t, S, a, l, null);
            }
        return;
      default:
        if (wi(t)) {
          for (A in l)
            l.hasOwnProperty(A) && (a = l[A], a !== void 0 && Sc(
              e,
              t,
              A,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (d in l)
      l.hasOwnProperty(d) && (a = l[d], a != null && be(e, t, d, a, l, null));
  }
  function i1(e, t, l, a) {
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
        var n = null, u = null, c = null, d = null, m = null, S = null, A = null;
        for (E in l) {
          var O = l[E];
          if (l.hasOwnProperty(E) && O != null)
            switch (E) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = O;
              default:
                a.hasOwnProperty(E) || be(e, t, E, null, a, O);
            }
        }
        for (var j in a) {
          var E = a[j];
          if (O = l[j], a.hasOwnProperty(j) && (E != null || O != null))
            switch (j) {
              case "type":
                u = E;
                break;
              case "name":
                n = E;
                break;
              case "checked":
                S = E;
                break;
              case "defaultChecked":
                A = E;
                break;
              case "value":
                c = E;
                break;
              case "defaultValue":
                d = E;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(s(137, t));
                break;
              default:
                E !== O && be(
                  e,
                  t,
                  j,
                  E,
                  a,
                  O
                );
            }
        }
        Ui(
          e,
          c,
          d,
          m,
          S,
          A,
          u,
          n
        );
        return;
      case "select":
        E = c = d = j = null;
        for (u in l)
          if (m = l[u], l.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                E = m;
              default:
                a.hasOwnProperty(u) || be(
                  e,
                  t,
                  u,
                  null,
                  a,
                  m
                );
            }
        for (n in a)
          if (u = a[n], m = l[n], a.hasOwnProperty(n) && (u != null || m != null))
            switch (n) {
              case "value":
                j = u;
                break;
              case "defaultValue":
                d = u;
                break;
              case "multiple":
                c = u;
              default:
                u !== m && be(
                  e,
                  t,
                  n,
                  u,
                  a,
                  m
                );
            }
        t = d, l = c, a = E, j != null ? ia(e, !!l, j, !1) : !!a != !!l && (t != null ? ia(e, !!l, t, !0) : ia(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        E = j = null;
        for (d in l)
          if (n = l[d], l.hasOwnProperty(d) && n != null && !a.hasOwnProperty(d))
            switch (d) {
              case "value":
                break;
              case "children":
                break;
              default:
                be(e, t, d, null, a, n);
            }
        for (c in a)
          if (n = a[c], u = l[c], a.hasOwnProperty(c) && (n != null || u != null))
            switch (c) {
              case "value":
                j = n;
                break;
              case "defaultValue":
                E = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && be(e, t, c, n, a, u);
            }
        ws(e, j, E);
        return;
      case "option":
        for (var q in l)
          if (j = l[q], l.hasOwnProperty(q) && j != null && !a.hasOwnProperty(q))
            switch (q) {
              case "selected":
                e.selected = !1;
                break;
              default:
                be(
                  e,
                  t,
                  q,
                  null,
                  a,
                  j
                );
            }
        for (m in a)
          if (j = a[m], E = l[m], a.hasOwnProperty(m) && j !== E && (j != null || E != null))
            switch (m) {
              case "selected":
                e.selected = j && typeof j != "function" && typeof j != "symbol";
                break;
              default:
                be(
                  e,
                  t,
                  m,
                  j,
                  a,
                  E
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
        for (var K in l)
          j = l[K], l.hasOwnProperty(K) && j != null && !a.hasOwnProperty(K) && be(e, t, K, null, a, j);
        for (S in a)
          if (j = a[S], E = l[S], a.hasOwnProperty(S) && j !== E && (j != null || E != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(s(137, t));
                break;
              default:
                be(
                  e,
                  t,
                  S,
                  j,
                  a,
                  E
                );
            }
        return;
      default:
        if (wi(t)) {
          for (var Se in l)
            j = l[Se], l.hasOwnProperty(Se) && j !== void 0 && !a.hasOwnProperty(Se) && Sc(
              e,
              t,
              Se,
              void 0,
              a,
              j
            );
          for (A in a)
            j = a[A], E = l[A], !a.hasOwnProperty(A) || j === E || j === void 0 && E === void 0 || Sc(
              e,
              t,
              A,
              j,
              a,
              E
            );
          return;
        }
    }
    for (var v in l)
      j = l[v], l.hasOwnProperty(v) && j != null && !a.hasOwnProperty(v) && be(e, t, v, null, a, j);
    for (O in a)
      j = a[O], E = l[O], !a.hasOwnProperty(O) || j === E || j == null && E == null || be(e, t, O, j, a, E);
  }
  function Yd(e) {
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
  function r1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, c = n.initiatorType, d = n.duration;
        if (u && d && Yd(c)) {
          for (c = 0, d = n.responseEnd, a += 1; a < l.length; a++) {
            var m = l[a], S = m.startTime;
            if (S > d) break;
            var A = m.transferSize, O = m.initiatorType;
            A && Yd(O) && (m = m.responseEnd, c += A * (m < d ? 1 : (d - S) / (m - S)));
          }
          if (--a, t += 8 * (u + c) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var jc = null, Nc = null;
  function Ku(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Gd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qd(e, t) {
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
  function Tc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ec = null;
  function c1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ec ? !1 : (Ec = e, !0) : (Ec = null, !1);
  }
  var Xd = typeof setTimeout == "function" ? setTimeout : void 0, s1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Vd = typeof Promise == "function" ? Promise : void 0, o1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vd < "u" ? function(e) {
    return Vd.resolve(null).then(e).catch(f1);
  } : Xd;
  function f1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function _l(e) {
    return e === "head";
  }
  function Zd(e, t) {
    var l = t, a = 0;
    do {
      var n = l.nextSibling;
      if (e.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(n), Ha(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Cn(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Cn(l);
          for (var u = l.firstChild; u; ) {
            var c = u.nextSibling, d = u.nodeName;
            u[Za] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = c;
          }
        } else
          l === "body" && Cn(e.ownerDocument.body);
      l = n;
    } while (l);
    Ha(t);
  }
  function Kd(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = a;
    } while (l);
  }
  function _c(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _c(l), Oi(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function d1(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[Za])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Ot(e.nextSibling), e === null) break;
    }
    return null;
  }
  function m1(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function Jd(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function zc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ac(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function h1(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function Ot(e) {
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
  var Cc = null;
  function $d(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Ot(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Fd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Wd(e, t, l) {
    switch (t = Ku(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Cn(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Oi(e);
  }
  var Dt = /* @__PURE__ */ new Map(), Id = /* @__PURE__ */ new Set();
  function Ju(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var il = k.d;
  k.d = {
    f: p1,
    r: g1,
    D: y1,
    C: v1,
    L: x1,
    m: b1,
    X: j1,
    S: S1,
    M: N1
  };
  function p1() {
    var e = il.f(), t = qu();
    return e || t;
  }
  function g1(e) {
    var t = aa(e);
    t !== null && t.tag === 5 && t.type === "form" ? pf(t) : il.r(e);
  }
  var wa = typeof document > "u" ? null : document;
  function Pd(e, t, l) {
    var a = wa;
    if (a && typeof t == "string" && t) {
      var n = Tt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Id.has(n) || (Id.add(n), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), Je(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function y1(e) {
    il.D(e), Pd("dns-prefetch", e, null);
  }
  function v1(e, t) {
    il.C(e, t), Pd("preconnect", e, t);
  }
  function x1(e, t, l) {
    il.L(e, t, l);
    var a = wa;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + Tt(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Tt(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Tt(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Tt(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = ka(e);
          break;
        case "script":
          u = Ba(e);
      }
      Dt.has(u) || (e = _(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Dt.set(u, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Mn(u)) || t === "script" && a.querySelector(On(u)) || (t = a.createElement("link"), Je(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function b1(e, t) {
    il.m(e, t);
    var l = wa;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Tt(a) + '"][href="' + Tt(e) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ba(e);
      }
      if (!Dt.has(u) && (e = _({ rel: "modulepreload", href: e }, t), Dt.set(u, e), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(On(u)))
              return;
        }
        a = l.createElement("link"), Je(a, "link", e), Ye(a), l.head.appendChild(a);
      }
    }
  }
  function S1(e, t, l) {
    il.S(e, t, l);
    var a = wa;
    if (a && e) {
      var n = na(a).hoistableStyles, u = ka(e);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var d = { loading: 0, preload: null };
        if (c = a.querySelector(
          Mn(u)
        ))
          d.loading = 5;
        else {
          e = _(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Dt.get(u)) && Mc(e, l);
          var m = c = a.createElement("link");
          Ye(m), Je(m, "link", e), m._p = new Promise(function(S, A) {
            m.onload = S, m.onerror = A;
          }), m.addEventListener("load", function() {
            d.loading |= 1;
          }), m.addEventListener("error", function() {
            d.loading |= 2;
          }), d.loading |= 4, $u(c, t, a);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: d
        }, n.set(u, c);
      }
    }
  }
  function j1(e, t) {
    il.X(e, t);
    var l = wa;
    if (l && e) {
      var a = na(l).hoistableScripts, n = Ba(e), u = a.get(n);
      u || (u = l.querySelector(On(n)), u || (e = _({ src: e, async: !0 }, t), (t = Dt.get(n)) && Oc(e, t), u = l.createElement("script"), Ye(u), Je(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function N1(e, t) {
    il.M(e, t);
    var l = wa;
    if (l && e) {
      var a = na(l).hoistableScripts, n = Ba(e), u = a.get(n);
      u || (u = l.querySelector(On(n)), u || (e = _({ src: e, async: !0, type: "module" }, t), (t = Dt.get(n)) && Oc(e, t), u = l.createElement("script"), Ye(u), Je(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function em(e, t, l, a) {
    var n = (n = ne.current) ? Ju(n) : null;
    if (!n) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = ka(l.href), l = na(
          n
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = ka(l.href);
          var u = na(
            n
          ).hoistableStyles, c = u.get(e);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, c), (u = n.querySelector(
            Mn(e)
          )) && !u._p && (c.instance = u, c.state.loading = 5), Dt.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Dt.set(e, l), u || T1(
            n,
            e,
            l,
            c.state
          ))), t && a === null)
            throw Error(s(528, ""));
          return c;
        }
        if (t && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ba(l), l = na(
          n
        ).hoistableScripts, a = l.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function ka(e) {
    return 'href="' + Tt(e) + '"';
  }
  function Mn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function tm(e) {
    return _({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function T1(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Je(t, "link", l), Ye(t), e.head.appendChild(t));
  }
  function Ba(e) {
    return '[src="' + Tt(e) + '"]';
  }
  function On(e) {
    return "script[async]" + e;
  }
  function lm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Tt(l.href) + '"]'
          );
          if (a)
            return t.instance = a, Ye(a), a;
          var n = _({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Ye(a), Je(a, "style", n), $u(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = ka(l.href);
          var u = e.querySelector(
            Mn(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ye(u), u;
          a = tm(l), (n = Dt.get(n)) && Mc(a, n), u = (e.ownerDocument || e).createElement("link"), Ye(u);
          var c = u;
          return c._p = new Promise(function(d, m) {
            c.onload = d, c.onerror = m;
          }), Je(u, "link", a), t.state.loading |= 4, $u(u, l.precedence, e), t.instance = u;
        case "script":
          return u = Ba(l.src), (n = e.querySelector(
            On(u)
          )) ? (t.instance = n, Ye(n), n) : (a = l, (n = Dt.get(u)) && (a = _({}, l), Oc(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ye(n), Je(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, $u(a, l.precedence, e));
    return t.instance;
  }
  function $u(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, c = 0; c < a.length; c++) {
      var d = a[c];
      if (d.dataset.precedence === t) u = d;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Mc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Oc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Fu = null;
  function am(e, t, l) {
    if (Fu === null) {
      var a = /* @__PURE__ */ new Map(), n = Fu = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = Fu, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[Za] || u[Xe] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(t) || "";
        c = e + c;
        var d = a.get(c);
        d ? d.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function nm(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function E1(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
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
  function um(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function _1(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = ka(a.href), u = t.querySelector(
          Mn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Wu.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, Ye(u);
          return;
        }
        u = t.ownerDocument || t, a = tm(a), (n = Dt.get(n)) && Mc(a, n), u = u.createElement("link"), Ye(u);
        var c = u;
        c._p = new Promise(function(d, m) {
          c.onload = d, c.onerror = m;
        }), Je(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Wu.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Dc = 0;
  function z1(e, t) {
    return e.stylesheets && e.count === 0 && Pu(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && Pu(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Dc === 0 && (Dc = 62500 * r1());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Pu(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Dc ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Wu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Pu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Iu = null;
  function Pu(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Iu = /* @__PURE__ */ new Map(), t.forEach(A1, e), Iu = null, Wu.call(e));
  }
  function A1(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Iu.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Iu.set(e, l);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), a = c);
        }
        a && l.set(null, a);
      }
      n = t.instance, c = n.getAttribute("data-precedence"), u = l.get(c) || a, u === a && l.set(null, n), l.set(c, n), this.count++, a = Wu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Dn = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0
  };
  function C1(e, t, l, a, n, u, c, d, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = zi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zi(0), this.hiddenUpdates = zi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function im(e, t, l, a, n, u, c, d, m, S, A, O) {
    return e = new C1(
      e,
      t,
      l,
      c,
      m,
      S,
      A,
      O,
      d
    ), t = 1, u === !0 && (t |= 24), u = pt(3, null, null, t), e.current = u, u.stateNode = e, t = fr(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, pr(u), e;
  }
  function rm(e) {
    return e ? (e = ha, e) : ha;
  }
  function cm(e, t, l, a, n, u) {
    n = rm(n), a.context === null ? a.context = n : a.pendingContext = n, a = pl(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = gl(e, a, t), l !== null && (ct(l, e, t), on(l, e, t));
  }
  function sm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Uc(e, t) {
    sm(e, t), (e = e.alternate) && sm(e, t);
  }
  function om(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ll(e, 67108864);
      t !== null && ct(t, e, 67108864), Uc(e, 67108864);
    }
  }
  function fm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = bt();
      t = Ai(t);
      var l = Ll(e, t);
      l !== null && ct(l, e, t), Uc(e, t);
    }
  }
  var ei = !0;
  function M1(e, t, l, a) {
    var n = C.T;
    C.T = null;
    var u = k.p;
    try {
      k.p = 2, Rc(e, t, l, a);
    } finally {
      k.p = u, C.T = n;
    }
  }
  function O1(e, t, l, a) {
    var n = C.T;
    C.T = null;
    var u = k.p;
    try {
      k.p = 8, Rc(e, t, l, a);
    } finally {
      k.p = u, C.T = n;
    }
  }
  function Rc(e, t, l, a) {
    if (ei) {
      var n = wc(a);
      if (n === null)
        bc(
          e,
          t,
          a,
          ti,
          l
        ), mm(e, a);
      else if (U1(
        n,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (mm(e, a), t & 4 && -1 < D1.indexOf(e)) {
        for (; n !== null; ) {
          var u = aa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = wl(u.pendingLanes);
                  if (c !== 0) {
                    var d = u;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; c; ) {
                      var m = 1 << 31 - mt(c);
                      d.entanglements[1] |= m, c &= ~m;
                    }
                    Lt(u), (me & 6) === 0 && (Bu = ft() + 500, _n(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = Ll(u, 2), d !== null && ct(d, u, 2), qu(), Uc(u, 2);
            }
          if (u = wc(a), u === null && bc(
            e,
            t,
            a,
            ti,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        bc(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function wc(e) {
    return e = Bi(e), kc(e);
  }
  var ti = null;
  function kc(e) {
    if (ti = null, e = la(e), e !== null) {
      var t = g(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = T(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = z(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ti = e, null;
  }
  function dm(e) {
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
        switch (y0()) {
          case vs:
            return 2;
          case xs:
            return 8;
          case Xn:
          case v0:
            return 32;
          case bs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bc = !1, zl = null, Al = null, Cl = null, Un = /* @__PURE__ */ new Map(), Rn = /* @__PURE__ */ new Map(), Ml = [], D1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function mm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        zl = null;
        break;
      case "dragenter":
      case "dragleave":
        Al = null;
        break;
      case "mouseover":
      case "mouseout":
        Cl = null;
        break;
      case "pointerover":
      case "pointerout":
        Un.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Rn.delete(t.pointerId);
    }
  }
  function wn(e, t, l, a, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = aa(t), t !== null && om(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function U1(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return zl = wn(
          zl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return Al = wn(
          Al,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return Cl = wn(
          Cl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Un.set(
          u,
          wn(
            Un.get(u) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Rn.set(
          u,
          wn(
            Rn.get(u) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function hm(e) {
    var t = la(e.target);
    if (t !== null) {
      var l = g(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = T(l), t !== null) {
            e.blockedOn = t, _s(e.priority, function() {
              fm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = z(l), t !== null) {
            e.blockedOn = t, _s(e.priority, function() {
              fm(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function li(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = wc(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        ki = a, l.target.dispatchEvent(a), ki = null;
      } else
        return t = aa(l), t !== null && om(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function pm(e, t, l) {
    li(e) && l.delete(t);
  }
  function R1() {
    Bc = !1, zl !== null && li(zl) && (zl = null), Al !== null && li(Al) && (Al = null), Cl !== null && li(Cl) && (Cl = null), Un.forEach(pm), Rn.forEach(pm);
  }
  function ai(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bc || (Bc = !0, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      R1
    )));
  }
  var ni = null;
  function gm(e) {
    ni !== e && (ni = e, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      function() {
        ni === e && (ni = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (kc(a || l) === null)
              continue;
            break;
          }
          var u = aa(l);
          u !== null && (e.splice(t, 3), t -= 3, wr(
            u,
            {
              pending: !0,
              data: n,
              method: l.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Ha(e) {
    function t(m) {
      return ai(m, e);
    }
    zl !== null && ai(zl, e), Al !== null && ai(Al, e), Cl !== null && ai(Cl, e), Un.forEach(t), Rn.forEach(t);
    for (var l = 0; l < Ml.length; l++) {
      var a = Ml[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Ml.length && (l = Ml[0], l.blockedOn === null); )
      hm(l), l.blockedOn === null && Ml.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], c = n[lt] || null;
        if (typeof u == "function")
          c || gm(l);
        else if (c) {
          var d = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[lt] || null)
              d = c.formAction;
            else if (kc(n) !== null) continue;
          } else d = c.action;
          typeof d == "function" ? l[a + 1] = d : (l.splice(a, 3), a -= 3), gm(l);
        }
      }
  }
  function ym() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return n = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), a || setTimeout(l, 20);
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function Hc(e) {
    this._internalRoot = e;
  }
  ui.prototype.render = Hc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var l = t.current, a = bt();
    cm(l, a, e, t, null, null);
  }, ui.prototype.unmount = Hc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      cm(e.current, 2, null, e, null, null), qu(), t[ta] = null;
    }
  };
  function ui(e) {
    this._internalRoot = e;
  }
  ui.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Es();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Ml.length && t !== 0 && t < Ml[l].priority; l++) ;
      Ml.splice(l, 0, e), l === 0 && hm(e);
    }
  };
  var vm = o.version;
  if (vm !== "19.2.3")
    throw Error(
      s(
        527,
        vm,
        "19.2.3"
      )
    );
  k.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = N(t), e = e !== null ? U(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var w1 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ii = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ii.isDisabled && ii.supportsFiber)
      try {
        Qa = ii.inject(
          w1
        ), dt = ii;
      } catch {
      }
  }
  return kn.createRoot = function(e, t) {
    if (!h(e)) throw Error(s(299));
    var l = !1, a = "", n = Ef, u = _f, c = zf;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = im(
      e,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      n,
      u,
      c,
      ym
    ), e[ta] = t.current, xc(e), new Hc(t);
  }, kn.hydrateRoot = function(e, t, l) {
    if (!h(e)) throw Error(s(299));
    var a = !1, n = "", u = Ef, c = _f, d = zf, m = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (d = l.onRecoverableError), l.formState !== void 0 && (m = l.formState)), t = im(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      n,
      m,
      u,
      c,
      d,
      ym
    ), t.context = rm(null), l = t.current, a = bt(), a = Ai(a), n = pl(a), n.callback = null, gl(l, n, a), l = a, t.current.lanes = l, Va(t, l), Lt(t), e[ta] = t.current, xc(e), new ui(t);
  }, kn.version = "19.2.3", kn;
}
var _m;
function V1() {
  if (_m) return Lc.exports;
  _m = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (o) {
        console.error(o);
      }
  }
  return r(), Lc.exports = X1(), Lc.exports;
}
var Z1 = V1();
const K1 = /* @__PURE__ */ Zm(Z1);
var Xc = { exports: {} }, Bn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function J1() {
  if (zm) return Bn;
  zm = 1;
  var r = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function f(s, h, g) {
    var T = null;
    if (g !== void 0 && (T = "" + g), h.key !== void 0 && (T = "" + h.key), "key" in h) {
      g = {};
      for (var z in h)
        z !== "key" && (g[z] = h[z]);
    } else g = h;
    return h = g.ref, {
      $$typeof: r,
      type: s,
      key: T,
      ref: h !== void 0 ? h : null,
      props: g
    };
  }
  return Bn.Fragment = o, Bn.jsx = f, Bn.jsxs = f, Bn;
}
var Am;
function $1() {
  return Am || (Am = 1, Xc.exports = J1()), Xc.exports;
}
var i = $1();
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F1 = (r) => r.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), W1 = (r) => r.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, f, s) => s ? s.toUpperCase() : f.toLowerCase()
), Cm = (r) => {
  const o = W1(r);
  return o.charAt(0).toUpperCase() + o.slice(1);
}, Jm = (...r) => r.filter((o, f, s) => !!o && o.trim() !== "" && s.indexOf(o) === f).join(" ").trim(), I1 = (r) => {
  for (const o in r)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var P1 = {
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
const e2 = G.forwardRef(
  ({
    color: r = "currentColor",
    size: o = 24,
    strokeWidth: f = 2,
    absoluteStrokeWidth: s,
    className: h = "",
    children: g,
    iconNode: T,
    ...z
  }, x) => G.createElement(
    "svg",
    {
      ref: x,
      ...P1,
      width: o,
      height: o,
      stroke: r,
      strokeWidth: s ? Number(f) * 24 / Number(o) : f,
      className: Jm("lucide", h),
      ...!g && !I1(z) && { "aria-hidden": "true" },
      ...z
    },
    [
      ...T.map(([N, U]) => G.createElement(N, U)),
      ...Array.isArray(g) ? g : [g]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F = (r, o) => {
  const f = G.forwardRef(
    ({ className: s, ...h }, g) => G.createElement(e2, {
      ref: g,
      iconNode: o,
      className: Jm(
        `lucide-${F1(Cm(r))}`,
        `lucide-${r}`,
        s
      ),
      ...h
    })
  );
  return f.displayName = Cm(r), f;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t2 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], l2 = F("arrow-down-to-line", t2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], n2 = F("arrow-up-right", a2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u2 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], $m = F("bot", u2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i2 = [
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
], Fc = F("brain-circuit", i2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r2 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], c2 = F("brain", r2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s2 = [
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
], o2 = F("calculator", s2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], d2 = F("check", f2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], is = F("chevron-down", m2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Fm = F("chevron-right", h2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], rs = F("circle-alert", p2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Wm = F("circle-check-big", g2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], v2 = F("circle-check", y2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x2 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], b2 = F("clock", x2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S2 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], j2 = F("cloud", S2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], Im = F("copy", N2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T2 = [
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
], vi = F("cpu", T2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E2 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], cs = F("database", E2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _2 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Pm = F("download", _2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z2 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
], A2 = F("ellipsis-vertical", z2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], M2 = F("external-link", C2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O2 = [
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
], ss = F("file-text", O2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], Mm = F("funnel", D2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], R2 = F("hash", U2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], k2 = F("info", w2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B2 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], e0 = F("key", B2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H2 = [
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
], t0 = F("layers", H2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], L2 = F("layout-dashboard", q2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], l0 = F("loader-circle", Y2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], Q2 = F("maximize-2", G2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X2 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], Om = F("menu", X2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V2 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], Z2 = F("network", V2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K2 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], J2 = F("pause", K2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], F2 = F("pen", $2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W2 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], os = F("play", W2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], fs = F("plus", I2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P2 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], a0 = F("power", P2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ep = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Wc = F("refresh-cw", ep);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tp = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], n0 = F("regex", tp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lp = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], ap = F("save", lp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const np = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], up = F("scissors", np);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], rp = F("search", ip);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cp = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], sp = F("send", cp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const op = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], u0 = F("server", op);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fp = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], dp = F("settings", fp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mp = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], ds = F("settings-2", mp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], Ya = F("terminal", hp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pp = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Yn = F("trash-2", pp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gp = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], yp = F("upload", gp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vp = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], ms = F("zap", vp), xp = () => /* @__PURE__ */ i.jsx("style", { children: `
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
  ` }), Dm = [
  { id: "dashboard", label: "仪表盘", icon: L2 },
  { id: "memory", label: "记忆流", icon: Fc },
  { id: "graph", label: "神经图谱", icon: Z2 },
  { id: "processing", label: "数据处理", icon: n2 },
  { id: "presets", label: "API 预设", icon: cs },
  { id: "devlog", label: "开发日志", icon: Ya },
  { id: "settings", label: "系统设置", icon: ds }
], bp = ({ children: r, activeTab: o, setActiveTab: f, onClose: s }) => {
  const [h, g] = G.useState(!1);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ i.jsx(xp, {}),
    /* @__PURE__ */ i.jsx("div", { className: "absolute top-4 right-4 z-50 flex items-center gap-2", children: /* @__PURE__ */ i.jsx(
      "button",
      {
        onClick: s,
        className: "p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors",
        title: "Close Engram",
        children: /* @__PURE__ */ i.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ i.jsx("path", { d: "M18 6 6 18" }),
          /* @__PURE__ */ i.jsx("path", { d: "m6 6 12 12" })
        ] })
      }
    ) }),
    /* @__PURE__ */ i.jsxs("aside", { className: "w-64 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col z-40", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "p-8 pb-4", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 text-foreground mb-6", children: [
          /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20", children: /* @__PURE__ */ i.jsx(Fc, { size: 18, className: "text-white" }) }),
          /* @__PURE__ */ i.jsx("span", { className: "text-lg font-medium tracking-tight", children: "Engram" })
        ] }),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "w-full flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded-md text-muted-foreground text-xs transition-colors group",
            onClick: () => {
            },
            children: [
              /* @__PURE__ */ i.jsx(Om, { size: 14, className: "group-hover:text-foreground" }),
              /* @__PURE__ */ i.jsx("span", { children: "Search..." }),
              /* @__PURE__ */ i.jsx("span", { className: "ml-auto text-[10px] border border-border px-1 rounded bg-muted", children: "⌘K" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("nav", { className: "flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar", children: Dm.map((T) => {
        const z = T.icon, x = o === T.id;
        return /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => f(T.id),
            className: `
                                    w-full flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-all duration-200 group
                                    ${x ? "text-foreground bg-sidebar-accent font-medium" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 font-light"}
                                `,
            children: [
              /* @__PURE__ */ i.jsx(z, { size: 18, strokeWidth: 1.5, className: x ? "text-primary" : "group-hover:text-muted-foreground" }),
              T.label
            ]
          },
          T.id
        );
      }) }),
      /* @__PURE__ */ i.jsx("div", { className: "p-4 border-t border-sidebar-border", children: /* @__PURE__ */ i.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 flex items-center gap-3 border border-border/50 hover:border-border transition-colors cursor-pointer", children: [
        /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium border border-border", children: "SH" }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs font-medium text-foreground truncate", children: "Shiyue Netizen" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: "Pro Workspace" })
        ] }),
        /* @__PURE__ */ i.jsx(A2, { size: 14, className: "text-muted-foreground" })
      ] }) })
    ] }),
    /* @__PURE__ */ i.jsxs("header", { className: "md:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur border-b border-border flex items-center justify-between px-4 z-40", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx("div", { className: "w-6 h-6 rounded bg-primary flex items-center justify-center", children: /* @__PURE__ */ i.jsx(Fc, { size: 14, className: "text-primary-foreground" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "font-medium text-foreground", children: "Engram" })
      ] }),
      /* @__PURE__ */ i.jsx("button", { onClick: () => g(!h), className: "text-muted-foreground", children: /* @__PURE__ */ i.jsx(Om, { size: 20 }) })
    ] }),
    h && /* @__PURE__ */ i.jsxs("div", { className: "fixed inset-0 z-50 bg-background/95 flex flex-col p-6 animate-in slide-in-from-top-4 md:hidden", children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex justify-end mb-8", children: /* @__PURE__ */ i.jsx("button", { onClick: () => g(!1), children: /* @__PURE__ */ i.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ i.jsx("path", { d: "m6 6 12 12" })
      ] }) }) }),
      /* @__PURE__ */ i.jsx("nav", { className: "space-y-4", children: Dm.map((T) => /* @__PURE__ */ i.jsx(
        "button",
        {
          onClick: () => {
            f(T.id), g(!1);
          },
          className: `text-2xl font-light block w-full text-left ${o === T.id ? "text-foreground" : "text-muted-foreground"}`,
          children: T.label
        },
        T.id
      )) })
    ] }),
    /* @__PURE__ */ i.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden", children: /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 scroll-smooth pt-20 md:pt-12", children: /* @__PURE__ */ i.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: r }) }) })
  ] });
}, Vc = ({
  title: r,
  value: o,
  icon: f,
  subtext: s,
  highlight: h = !1
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${h ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ i.jsx("div", { className: `p-2 rounded-lg ${h ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ i.jsx(f, { size: 20 }) }),
    h && /* @__PURE__ */ i.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: o }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: r }),
    s && /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: s })
  ] })
] }), $e = [];
for (let r = 0; r < 256; ++r)
  $e.push((r + 256).toString(16).slice(1));
function Sp(r, o = 0) {
  return ($e[r[o + 0]] + $e[r[o + 1]] + $e[r[o + 2]] + $e[r[o + 3]] + "-" + $e[r[o + 4]] + $e[r[o + 5]] + "-" + $e[r[o + 6]] + $e[r[o + 7]] + "-" + $e[r[o + 8]] + $e[r[o + 9]] + "-" + $e[r[o + 10]] + $e[r[o + 11]] + $e[r[o + 12]] + $e[r[o + 13]] + $e[r[o + 14]] + $e[r[o + 15]]).toLowerCase();
}
let Zc;
const jp = new Uint8Array(16);
function Np() {
  if (!Zc) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Zc = crypto.getRandomValues.bind(crypto);
  }
  return Zc(jp);
}
const Tp = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Um = { randomUUID: Tp };
function Ep(r, o, f) {
  var h;
  r = r || {};
  const s = r.random ?? ((h = r.rng) == null ? void 0 : h.call(r)) ?? Np();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, Sp(s);
}
function _p(r, o, f) {
  return Um.randomUUID && !r ? Um.randomUUID() : Ep(r);
}
var Ic = function(r, o) {
  return Ic = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(f, s) {
    f.__proto__ = s;
  } || function(f, s) {
    for (var h in s) Object.prototype.hasOwnProperty.call(s, h) && (f[h] = s[h]);
  }, Ic(r, o);
};
function Gn(r, o) {
  if (typeof o != "function" && o !== null)
    throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");
  Ic(r, o);
  function f() {
    this.constructor = r;
  }
  r.prototype = o === null ? Object.create(o) : (f.prototype = o.prototype, new f());
}
function Pc(r) {
  var o = typeof Symbol == "function" && Symbol.iterator, f = o && r[o], s = 0;
  if (f) return f.call(r);
  if (r && typeof r.length == "number") return {
    next: function() {
      return r && s >= r.length && (r = void 0), { value: r && r[s++], done: !r };
    }
  };
  throw new TypeError(o ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function es(r, o) {
  var f = typeof Symbol == "function" && r[Symbol.iterator];
  if (!f) return r;
  var s = f.call(r), h, g = [], T;
  try {
    for (; (o === void 0 || o-- > 0) && !(h = s.next()).done; ) g.push(h.value);
  } catch (z) {
    T = { error: z };
  } finally {
    try {
      h && !h.done && (f = s.return) && f.call(s);
    } finally {
      if (T) throw T.error;
    }
  }
  return g;
}
function ts(r, o, f) {
  if (f || arguments.length === 2) for (var s = 0, h = o.length, g; s < h; s++)
    (g || !(s in o)) && (g || (g = Array.prototype.slice.call(o, 0, s)), g[s] = o[s]);
  return r.concat(g || Array.prototype.slice.call(o));
}
function Gt(r) {
  return typeof r == "function";
}
function i0(r) {
  var o = function(s) {
    Error.call(s), s.stack = new Error().stack;
  }, f = r(o);
  return f.prototype = Object.create(Error.prototype), f.prototype.constructor = f, f;
}
var Kc = i0(function(r) {
  return function(f) {
    r(this), this.message = f ? f.length + ` errors occurred during unsubscription:
` + f.map(function(s, h) {
      return h + 1 + ") " + s.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = f;
  };
});
function ls(r, o) {
  if (r) {
    var f = r.indexOf(o);
    0 <= f && r.splice(f, 1);
  }
}
var xi = (function() {
  function r(o) {
    this.initialTeardown = o, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var o, f, s, h, g;
    if (!this.closed) {
      this.closed = !0;
      var T = this._parentage;
      if (T)
        if (this._parentage = null, Array.isArray(T))
          try {
            for (var z = Pc(T), x = z.next(); !x.done; x = z.next()) {
              var N = x.value;
              N.remove(this);
            }
          } catch (W) {
            o = { error: W };
          } finally {
            try {
              x && !x.done && (f = z.return) && f.call(z);
            } finally {
              if (o) throw o.error;
            }
          }
        else
          T.remove(this);
      var U = this.initialTeardown;
      if (Gt(U))
        try {
          U();
        } catch (W) {
          g = W instanceof Kc ? W.errors : [W];
        }
      var _ = this._finalizers;
      if (_) {
        this._finalizers = null;
        try {
          for (var w = Pc(_), Z = w.next(); !Z.done; Z = w.next()) {
            var ee = Z.value;
            try {
              Rm(ee);
            } catch (W) {
              g = g ?? [], W instanceof Kc ? g = ts(ts([], es(g)), es(W.errors)) : g.push(W);
            }
          }
        } catch (W) {
          s = { error: W };
        } finally {
          try {
            Z && !Z.done && (h = w.return) && h.call(w);
          } finally {
            if (s) throw s.error;
          }
        }
      }
      if (g)
        throw new Kc(g);
    }
  }, r.prototype.add = function(o) {
    var f;
    if (o && o !== this)
      if (this.closed)
        Rm(o);
      else {
        if (o instanceof r) {
          if (o.closed || o._hasParent(this))
            return;
          o._addParent(this);
        }
        (this._finalizers = (f = this._finalizers) !== null && f !== void 0 ? f : []).push(o);
      }
  }, r.prototype._hasParent = function(o) {
    var f = this._parentage;
    return f === o || Array.isArray(f) && f.includes(o);
  }, r.prototype._addParent = function(o) {
    var f = this._parentage;
    this._parentage = Array.isArray(f) ? (f.push(o), f) : f ? [f, o] : o;
  }, r.prototype._removeParent = function(o) {
    var f = this._parentage;
    f === o ? this._parentage = null : Array.isArray(f) && ls(f, o);
  }, r.prototype.remove = function(o) {
    var f = this._finalizers;
    f && ls(f, o), o instanceof r && o._removeParent(this);
  }, r.EMPTY = (function() {
    var o = new r();
    return o.closed = !0, o;
  })(), r;
})(), r0 = xi.EMPTY;
function c0(r) {
  return r instanceof xi || r && "closed" in r && Gt(r.remove) && Gt(r.add) && Gt(r.unsubscribe);
}
function Rm(r) {
  Gt(r) ? r() : r.unsubscribe();
}
var zp = {
  Promise: void 0
}, Ap = {
  setTimeout: function(r, o) {
    for (var f = [], s = 2; s < arguments.length; s++)
      f[s - 2] = arguments[s];
    return setTimeout.apply(void 0, ts([r, o], es(f)));
  },
  clearTimeout: function(r) {
    return clearTimeout(r);
  },
  delegate: void 0
};
function Cp(r) {
  Ap.setTimeout(function() {
    throw r;
  });
}
function wm() {
}
function oi(r) {
  r();
}
var hs = (function(r) {
  Gn(o, r);
  function o(f) {
    var s = r.call(this) || this;
    return s.isStopped = !1, f ? (s.destination = f, c0(f) && f.add(s)) : s.destination = Dp, s;
  }
  return o.create = function(f, s, h) {
    return new as(f, s, h);
  }, o.prototype.next = function(f) {
    this.isStopped || this._next(f);
  }, o.prototype.error = function(f) {
    this.isStopped || (this.isStopped = !0, this._error(f));
  }, o.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, o.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this), this.destination = null);
  }, o.prototype._next = function(f) {
    this.destination.next(f);
  }, o.prototype._error = function(f) {
    try {
      this.destination.error(f);
    } finally {
      this.unsubscribe();
    }
  }, o.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, o;
})(xi), Mp = (function() {
  function r(o) {
    this.partialObserver = o;
  }
  return r.prototype.next = function(o) {
    var f = this.partialObserver;
    if (f.next)
      try {
        f.next(o);
      } catch (s) {
        ri(s);
      }
  }, r.prototype.error = function(o) {
    var f = this.partialObserver;
    if (f.error)
      try {
        f.error(o);
      } catch (s) {
        ri(s);
      }
    else
      ri(o);
  }, r.prototype.complete = function() {
    var o = this.partialObserver;
    if (o.complete)
      try {
        o.complete();
      } catch (f) {
        ri(f);
      }
  }, r;
})(), as = (function(r) {
  Gn(o, r);
  function o(f, s, h) {
    var g = r.call(this) || this, T;
    return Gt(f) || !f ? T = {
      next: f ?? void 0,
      error: s ?? void 0,
      complete: h ?? void 0
    } : T = f, g.destination = new Mp(T), g;
  }
  return o;
})(hs);
function ri(r) {
  Cp(r);
}
function Op(r) {
  throw r;
}
var Dp = {
  closed: !0,
  next: wm,
  error: Op,
  complete: wm
}, Up = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Rp(r) {
  return r;
}
function wp(r) {
  return r.length === 0 ? Rp : r.length === 1 ? r[0] : function(f) {
    return r.reduce(function(s, h) {
      return h(s);
    }, f);
  };
}
var km = (function() {
  function r(o) {
    o && (this._subscribe = o);
  }
  return r.prototype.lift = function(o) {
    var f = new r();
    return f.source = this, f.operator = o, f;
  }, r.prototype.subscribe = function(o, f, s) {
    var h = this, g = Bp(o) ? o : new as(o, f, s);
    return oi(function() {
      var T = h, z = T.operator, x = T.source;
      g.add(z ? z.call(g, x) : x ? h._subscribe(g) : h._trySubscribe(g));
    }), g;
  }, r.prototype._trySubscribe = function(o) {
    try {
      return this._subscribe(o);
    } catch (f) {
      o.error(f);
    }
  }, r.prototype.forEach = function(o, f) {
    var s = this;
    return f = Bm(f), new f(function(h, g) {
      var T = new as({
        next: function(z) {
          try {
            o(z);
          } catch (x) {
            g(x), T.unsubscribe();
          }
        },
        error: g,
        complete: h
      });
      s.subscribe(T);
    });
  }, r.prototype._subscribe = function(o) {
    var f;
    return (f = this.source) === null || f === void 0 ? void 0 : f.subscribe(o);
  }, r.prototype[Up] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var o = [], f = 0; f < arguments.length; f++)
      o[f] = arguments[f];
    return wp(o)(this);
  }, r.prototype.toPromise = function(o) {
    var f = this;
    return o = Bm(o), new o(function(s, h) {
      var g;
      f.subscribe(function(T) {
        return g = T;
      }, function(T) {
        return h(T);
      }, function() {
        return s(g);
      });
    });
  }, r.create = function(o) {
    return new r(o);
  }, r;
})();
function Bm(r) {
  var o;
  return (o = r ?? zp.Promise) !== null && o !== void 0 ? o : Promise;
}
function kp(r) {
  return r && Gt(r.next) && Gt(r.error) && Gt(r.complete);
}
function Bp(r) {
  return r && r instanceof hs || kp(r) && c0(r);
}
function Hp(r) {
  return Gt(r == null ? void 0 : r.lift);
}
function qp(r) {
  return function(o) {
    if (Hp(o))
      return o.lift(function(f) {
        try {
          return r(f, this);
        } catch (s) {
          this.error(s);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function Lp(r, o, f, s, h) {
  return new Yp(r, o, f, s, h);
}
var Yp = (function(r) {
  Gn(o, r);
  function o(f, s, h, g, T, z) {
    var x = r.call(this, f) || this;
    return x.onFinalize = T, x.shouldUnsubscribe = z, x._next = s ? function(N) {
      try {
        s(N);
      } catch (U) {
        f.error(U);
      }
    } : r.prototype._next, x._error = g ? function(N) {
      try {
        g(N);
      } catch (U) {
        f.error(U);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._error, x._complete = h ? function() {
      try {
        h();
      } catch (N) {
        f.error(N);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._complete, x;
  }
  return o.prototype.unsubscribe = function() {
    var f;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var s = this.closed;
      r.prototype.unsubscribe.call(this), !s && ((f = this.onFinalize) === null || f === void 0 || f.call(this));
    }
  }, o;
})(hs), Gp = i0(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), ps = (function(r) {
  Gn(o, r);
  function o() {
    var f = r.call(this) || this;
    return f.closed = !1, f.currentObservers = null, f.observers = [], f.isStopped = !1, f.hasError = !1, f.thrownError = null, f;
  }
  return o.prototype.lift = function(f) {
    var s = new Hm(this, this);
    return s.operator = f, s;
  }, o.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Gp();
  }, o.prototype.next = function(f) {
    var s = this;
    oi(function() {
      var h, g;
      if (s._throwIfClosed(), !s.isStopped) {
        s.currentObservers || (s.currentObservers = Array.from(s.observers));
        try {
          for (var T = Pc(s.currentObservers), z = T.next(); !z.done; z = T.next()) {
            var x = z.value;
            x.next(f);
          }
        } catch (N) {
          h = { error: N };
        } finally {
          try {
            z && !z.done && (g = T.return) && g.call(T);
          } finally {
            if (h) throw h.error;
          }
        }
      }
    });
  }, o.prototype.error = function(f) {
    var s = this;
    oi(function() {
      if (s._throwIfClosed(), !s.isStopped) {
        s.hasError = s.isStopped = !0, s.thrownError = f;
        for (var h = s.observers; h.length; )
          h.shift().error(f);
      }
    });
  }, o.prototype.complete = function() {
    var f = this;
    oi(function() {
      if (f._throwIfClosed(), !f.isStopped) {
        f.isStopped = !0;
        for (var s = f.observers; s.length; )
          s.shift().complete();
      }
    });
  }, o.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(o.prototype, "observed", {
    get: function() {
      var f;
      return ((f = this.observers) === null || f === void 0 ? void 0 : f.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), o.prototype._trySubscribe = function(f) {
    return this._throwIfClosed(), r.prototype._trySubscribe.call(this, f);
  }, o.prototype._subscribe = function(f) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(f), this._innerSubscribe(f);
  }, o.prototype._innerSubscribe = function(f) {
    var s = this, h = this, g = h.hasError, T = h.isStopped, z = h.observers;
    return g || T ? r0 : (this.currentObservers = null, z.push(f), new xi(function() {
      s.currentObservers = null, ls(z, f);
    }));
  }, o.prototype._checkFinalizedStatuses = function(f) {
    var s = this, h = s.hasError, g = s.thrownError, T = s.isStopped;
    h ? f.error(g) : T && f.complete();
  }, o.prototype.asObservable = function() {
    var f = new km();
    return f.source = this, f;
  }, o.create = function(f, s) {
    return new Hm(f, s);
  }, o;
})(km), Hm = (function(r) {
  Gn(o, r);
  function o(f, s) {
    var h = r.call(this) || this;
    return h.destination = f, h.source = s, h;
  }
  return o.prototype.next = function(f) {
    var s, h;
    (h = (s = this.destination) === null || s === void 0 ? void 0 : s.next) === null || h === void 0 || h.call(s, f);
  }, o.prototype.error = function(f) {
    var s, h;
    (h = (s = this.destination) === null || s === void 0 ? void 0 : s.error) === null || h === void 0 || h.call(s, f);
  }, o.prototype.complete = function() {
    var f, s;
    (s = (f = this.destination) === null || f === void 0 ? void 0 : f.complete) === null || s === void 0 || s.call(f);
  }, o.prototype._subscribe = function(f) {
    var s, h;
    return (h = (s = this.source) === null || s === void 0 ? void 0 : s.subscribe(f)) !== null && h !== void 0 ? h : r0;
  }, o;
})(ps);
function Qp(r, o) {
  return qp(function(f, s) {
    var h = 0;
    f.subscribe(Lp(s, function(g) {
      return r.call(o, g, h++) && s.next(g);
    }));
  });
}
const ci = new ps(), Xp = {
  /**
   * 发布事件
   */
  emit(r) {
    ci.next({
      ...r,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(r) {
    const o = ci.subscribe(r);
    return {
      unsubscribe: () => o.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(r, o) {
    const f = ci.pipe(Qp((s) => s.type === r)).subscribe((s) => o(s.payload));
    return {
      unsubscribe: () => f.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return ci.asObservable();
  }
};
var Ee = /* @__PURE__ */ ((r) => (r[r.DEBUG = 0] = "DEBUG", r[r.INFO = 1] = "INFO", r[r.SUCCESS = 2] = "SUCCESS", r[r.WARN = 3] = "WARN", r[r.ERROR = 4] = "ERROR", r))(Ee || {});
const mi = {
  0: { label: "DEBUG", icon: "🔍", color: "#6c757d" },
  1: { label: "INFO", icon: "ℹ️", color: "#17a2b8" },
  2: { label: "SUCCESS", icon: "✅", color: "#28a745" },
  3: { label: "WARN", icon: "⚠️", color: "#ffc107" },
  4: { label: "ERROR", icon: "❌", color: "#dc3545" }
}, s0 = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, o0 = new ps();
let Yt = [], Ul = { ...s0 }, Jc = null;
async function hi() {
  if (!Jc) {
    const { db: r } = await import("./DexieDB-CdZhasSG.js");
    Jc = r;
  }
  return Jc;
}
function Vp(r) {
  return new Date(r).toTimeString().slice(0, 8);
}
async function qa(r, o, f, s) {
  if (r < Ul.minLevel) return;
  const h = {
    id: _p(),
    timestamp: Date.now(),
    level: r,
    module: o,
    message: f,
    data: s
  };
  Yt.push(h), o0.next(h);
  try {
    const g = await hi();
    await g.logs.add(h);
    const T = await g.logs.count();
    T > Ul.maxEntries && await Zp(T - Ul.maxEntries);
  } catch (g) {
    console.error("[Engram/Logger] 日志持久化失败:", g);
  }
}
async function Zp(r) {
  try {
    const o = await hi(), s = (await o.logs.orderBy("timestamp").limit(r).toArray()).map((h) => h.id);
    await o.logs.bulkDelete(s), Yt = Yt.slice(-Ul.maxEntries);
  } catch (o) {
    console.error("[Engram/Logger] 清理旧日志失败:", o);
  }
}
function Kp() {
  Xp.subscribe((r) => {
    const f = {
      INGESTION_START: Ee.INFO,
      INGESTION_COMPLETE: Ee.SUCCESS,
      ENTITY_CREATED: Ee.INFO,
      MEMORY_STORED: Ee.SUCCESS,
      RETRIEVAL_START: Ee.DEBUG,
      RETRIEVAL_COMPLETE: Ee.SUCCESS,
      CHAT_CHANGED: Ee.INFO,
      MESSAGE_RECEIVED: Ee.DEBUG
    }[r.type] ?? Ee.DEBUG;
    qa(f, "EventBus", `${r.type}`, r.payload);
  });
}
const We = {
  /**
   * 初始化 Logger
   */
  async init(r) {
    r && (Ul = { ...Ul, ...r });
    try {
      Yt = await (await hi()).logs.orderBy("timestamp").reverse().limit(Ul.maxEntries).toArray(), Yt.reverse();
    } catch (o) {
      console.error("[Engram/Logger] 加载历史日志失败:", o), Yt = [];
    }
    Kp(), We.info("Logger", "Logger 初始化完成", { maxEntries: Ul.maxEntries });
  },
  /**
   * DEBUG 级别日志
   */
  debug(r, o, f) {
    qa(Ee.DEBUG, r, o, f);
  },
  /**
   * INFO 级别日志
   */
  info(r, o, f) {
    qa(Ee.INFO, r, o, f);
  },
  /**
   * SUCCESS 级别日志
   */
  success(r, o, f) {
    qa(Ee.SUCCESS, r, o, f);
  },
  /**
   * WARN 级别日志
   */
  warn(r, o, f) {
    qa(Ee.WARN, r, o, f);
  },
  /**
   * ERROR 级别日志
   */
  error(r, o, f) {
    qa(Ee.ERROR, r, o, f);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...Yt];
  },
  /**
   * 订阅新日志
   */
  subscribe(r) {
    const o = o0.subscribe(r);
    return () => o.unsubscribe();
  },
  /**
   * 清空所有日志
   */
  async clear() {
    try {
      await (await hi()).logs.clear(), Yt = [], We.info("Logger", "日志已清空");
    } catch (r) {
      console.error("[Engram/Logger] 清空日志失败:", r);
    }
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const r = /* @__PURE__ */ new Date();
    r.toISOString().slice(0, 10), r.toTimeString().slice(0, 8).replace(/:/g, "");
    const o = {
      [Ee.DEBUG]: "DEBUG",
      [Ee.INFO]: "INFO",
      [Ee.SUCCESS]: "SUCCESS",
      [Ee.WARN]: "WARN",
      [Ee.ERROR]: "ERROR"
    };
    let f = `# Engram Debug Log

`;
    f += `- **导出时间**: ${r.toLocaleString("zh-CN")}
`, f += `- **版本**: 0.1.0
`, f += `- **日志条数**: ${Yt.length}

`, f += `---

`, f += `## 日志记录

`, f += "```\n";
    for (const s of Yt) {
      const h = Vp(s.timestamp), g = o[s.level].padEnd(7), T = s.module.padEnd(16);
      if (f += `[${h}] [${T}] ${g} ${s.message}
`, s.data !== void 0) {
        const z = JSON.stringify(s.data, null, 2).split(`
`).map((x) => `    ${x}`).join(`
`);
        f += `${z}
`;
      }
    }
    return f += "```\n", f;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const r = /* @__PURE__ */ new Date(), o = r.toISOString().slice(0, 10), f = r.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${o}_${f}.md`;
  }
}, Jp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: s0,
  LogLevel: Ee,
  LogLevelConfig: mi,
  Logger: We
}, Symbol.toStringTag, { value: "Module" }));
function $p() {
  var r, o;
  try {
    return ((o = (r = window.SillyTavern) == null ? void 0 : r.getContext) == null ? void 0 : o.call(r)) || null;
  } catch (f) {
    return console.warn("[Engram] Failed to get ST context:", f), null;
  }
}
async function qm() {
  const { Logger: r } = await Promise.resolve().then(() => Jp);
  await r.init(), r.info("STBridge", "Engram 插件正在初始化...");
  try {
    const { checkTavernIntegration: f } = await import("./index-B5YIjqxu.js"), s = await f();
    r.info("TavernAPI", "酒馆接口对接状态", s);
  } catch (f) {
    r.warn("TavernAPI", "酒馆接口检查失败", { error: String(f) });
  }
  try {
    const { summarizerService: f } = await import("./index-nPlu3cnB.js");
    f.start();
    const s = f.getStatus();
    r.info("Summarizer", "服务已启动", s);
  } catch (f) {
    r.warn("Summarizer", "服务启动失败", { error: String(f) });
  }
  Fp();
  const { ThemeManager: o } = await Promise.resolve().then(() => Ig);
  o.init(), r.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const f0 = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function Fp() {
  const r = document.querySelector("#top-settings-holder"), o = document.querySelector("#WI-SP-button");
  if (!r) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), Wp();
    return;
  }
  const f = document.createElement("div");
  f.id = "engram-drawer", f.className = "drawer";
  const s = document.createElement("div");
  s.className = "drawer-toggle drawer-header";
  const h = document.createElement("div");
  h.id = "engram-drawer-icon", h.className = "drawer-icon fa-fw closedIcon", h.title = "Engram - 记忆操作系统", h.setAttribute("data-i18n", "[title]Engram - Memory OS"), h.innerHTML = f0, h.addEventListener("click", pi), s.appendChild(h), f.appendChild(s), o ? (r.insertBefore(f, o), console.log("[Engram] Top bar button injected before WI-SP-button")) : (r.appendChild(f), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function Wp() {
  const r = document.createElement("div");
  r.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", r.title = "Engram - 记忆操作系统", r.innerHTML = f0, r.addEventListener("click", pi), document.body.appendChild(r);
}
let ns = null;
function Ip(r) {
  ns = r;
}
let $c = !1, Hn = null, fi = null;
function pi() {
  $c && Hn ? (fi && (fi.unmount(), fi = null), Hn.remove(), Hn = null, $c = !1) : (Hn = Pp(), document.body.appendChild(Hn), $c = !0);
}
function Pp() {
  var o;
  const r = document.createElement("div");
  return r.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", r.style.backgroundColor = "var(--background)", r.style.color = "var(--foreground)", r.id = "engram-panel-root", ns ? fi = ns(r, pi) : (r.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (o = r.querySelector("button")) == null || o.addEventListener("click", pi)), r;
}
const eg = (r) => {
  switch (r) {
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
}, Lm = ({ onNavigate: r }) => {
  const [o, f] = G.useState([]), [s, h] = G.useState($p()), [g, T] = G.useState(0);
  G.useEffect(() => (f(We.getLogs().slice(0, 3)), We.subscribe((_) => {
    f((w) => [_, ...w].slice(0, 3));
  })), []), G.useEffect(() => {
    const U = setInterval(() => {
      T((_) => _ + 1);
    }, 1e3);
    return () => clearInterval(U);
  }, []);
  const z = (U) => {
    const _ = Math.floor(U / 3600), w = Math.floor(U % 3600 / 60), Z = U % 60;
    return `${_.toString().padStart(2, "0")}:${w.toString().padStart(2, "0")}:${Z.toString().padStart(2, "0")}`;
  }, x = (s == null ? void 0 : s.name2) || "Unknown", N = (U) => {
    r && r(U);
  };
  return /* @__PURE__ */ i.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ i.jsx(
        Vc,
        {
          title: "ACTIVE MODEL",
          value: s ? "Connected" : "Offline",
          subtext: s ? `Chatting with ${x}` : "Waiting for connection...",
          icon: u0,
          highlight: !!s
        }
      ),
      /* @__PURE__ */ i.jsx(
        Vc,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: cs
        }
      ),
      /* @__PURE__ */ i.jsx(
        Vc,
        {
          title: "SYSTEM UPTIME",
          value: z(g),
          subtext: "Session Duration",
          icon: vi
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(ms, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => N("memory"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => N("graph"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => N("processing"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => N("settings"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(Ya, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ i.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => N("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: o.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : o.map((U) => /* @__PURE__ */ i.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${eg(U.level)}`, children: [
        /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(U.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: U.message })
      ] }, U.id)) })
    ] })
  ] }) });
}, bi = ({ title: r, subtitle: o, actions: f }) => /* @__PURE__ */ i.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: r }),
    o && /* @__PURE__ */ i.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: o })
  ] }),
  f && /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: f })
] }), Ym = ({
  icon: r,
  label: o,
  primary: f = !1,
  size: s = "md",
  className: h = "",
  ...g
}) => /* @__PURE__ */ i.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${s === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${f ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${h}
        `,
    ...g,
    children: [
      r && /* @__PURE__ */ i.jsx(r, { size: s === "sm" ? 14 : 16 }),
      o
    ]
  }
), tg = () => {
  const [r] = G.useState([
    { id: "1", x: 250, y: 150, label: "User Input", type: "input" },
    { id: "2", x: 250, y: 300, label: "Memory Retriever", type: "process" },
    { id: "3", x: 100, y: 450, label: "Summary Agent", type: "output" },
    { id: "4", x: 400, y: 450, label: "Context Builder", type: "output" }
  ]), o = [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "2", target: "4" }
  ];
  return /* @__PURE__ */ i.jsxs("div", { className: "h-full flex flex-col relative bg-card rounded-xl overflow-hidden border border-border shadow-inner group", children: [
    /* @__PURE__ */ i.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.15] pointer-events-none",
        style: {
          backgroundImage: "radial-gradient(#555 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(fs, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Q2, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(ds, { size: 16 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ i.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      o.map((f, s) => {
        const h = r.find((_) => _.id === f.source), g = r.find((_) => _.id === f.target);
        if (!h || !g) return null;
        const T = h.x + 150 / 2, z = h.y + 60, x = g.x + 150 / 2, N = g.y, U = `M ${T} ${z} C ${T} ${z + 50}, ${x} ${N - 50}, ${x} ${N}`;
        return /* @__PURE__ */ i.jsx("g", { children: /* @__PURE__ */ i.jsx("path", { d: U, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, s);
      })
    ] }),
    r.map((f) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "absolute w-[150px] group/node cursor-grab active:cursor-grabbing",
        style: { left: f.x, top: f.y },
        children: [
          f.type !== "input" && /* @__PURE__ */ i.jsx("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          f.type !== "output" && /* @__PURE__ */ i.jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          /* @__PURE__ */ i.jsxs("div", { className: `
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${f.type === "input" ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-border group-hover/node:border-border shadow-lg"}
                    `, children: [
            /* @__PURE__ */ i.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold", children: f.type }),
            /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-foreground font-medium flex items-center gap-2", children: [
              f.type === "input" && /* @__PURE__ */ i.jsx(Ya, { size: 12, className: "text-blue-400" }),
              f.type === "process" && /* @__PURE__ */ i.jsx(vi, { size: 12, className: "text-purple-400" }),
              f.type === "output" && /* @__PURE__ */ i.jsx(cs, { size: 12, className: "text-emerald-400" }),
              f.label
            ] })
          ] })
        ]
      },
      f.id
    ))
  ] });
}, lg = () => /* @__PURE__ */ i.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ i.jsx(
    bi,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i.jsx(Ym, { icon: os, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ i.jsx(Ym, { icon: ds, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ i.jsx(tg, {}) })
] });
function ag(r) {
  return new Date(r).toTimeString().slice(0, 8);
}
const ng = {
  [Ee.DEBUG]: "text-muted-foreground",
  [Ee.INFO]: "text-blue-400",
  [Ee.SUCCESS]: "text-green-400",
  [Ee.WARN]: "text-yellow-400",
  [Ee.ERROR]: "text-red-400"
}, ug = ({ entry: r }) => {
  const [o, f] = G.useState(!1), s = r.data !== void 0, h = mi[r.level], g = ng[r.level] || "";
  return /* @__PURE__ */ i.jsxs("div", { className: "mb-0.5", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `flex items-start gap-2 px-1 py-0.5 rounded-sm transition-colors hover:bg-muted-50 ${s ? "cursor-pointer" : ""}`,
        onClick: () => s && f(!o),
        children: [
          /* @__PURE__ */ i.jsx("span", { className: "flex items-center text-muted-foreground shrink-0", children: s ? o ? /* @__PURE__ */ i.jsx(is, { size: 12 }) : /* @__PURE__ */ i.jsx(Fm, { size: 12 }) : /* @__PURE__ */ i.jsx("span", { style: { width: 12, display: "inline-block" } }) }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground shrink-0", children: [
            "[",
            ag(r.timestamp),
            "]"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-purple-400 shrink-0 whitespace-pre", children: [
            "[",
            r.module.padEnd(16),
            "]"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: `shrink-0 whitespace-pre ${g}`, children: [
            h.icon,
            " ",
            h.label.padEnd(7)
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground break-words", children: r.message })
        ]
      }
    ),
    o && s && /* @__PURE__ */ i.jsx("div", { className: "ml-8 px-3 py-2 bg-muted-30 border-l-2 border-border rounded-r-sm", children: /* @__PURE__ */ i.jsx("pre", { className: "m-0 text-muted-foreground text-sm whitespace-pre-wrap break-words", children: JSON.stringify(r.data, null, 2) }) })
  ] });
}, Gm = 100;
class ig {
  constructor() {
    Dl(this, "entries", []);
    Dl(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * 创建新的日志条目（发送阶段）
   */
  logSend(o) {
    const f = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, s = {
      id: f,
      timestamp: Date.now(),
      type: o.type,
      direction: "sent",
      systemPrompt: o.systemPrompt,
      userPrompt: o.userPrompt,
      tokensSent: o.tokensSent,
      model: o.model,
      floorRange: o.floorRange,
      status: "pending"
    };
    return this.entries.unshift(s), this.trimEntries(), this.notifyListeners(), f;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(o, f) {
    const s = this.entries.find((T) => T.id === o);
    if (!s) return;
    const h = {
      id: `${o}_recv`,
      timestamp: Date.now(),
      type: s.type,
      direction: "received",
      response: f.response,
      tokensReceived: f.tokensReceived,
      status: f.status,
      error: f.error,
      duration: f.duration,
      model: s.model,
      floorRange: s.floorRange
    };
    s.status = f.status, s.duration = f.duration;
    const g = this.entries.findIndex((T) => T.id === o);
    g >= 0 ? this.entries.splice(g, 0, h) : this.entries.unshift(h), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(o, f) {
    const s = this.logSend(o), h = Date.now();
    try {
      const g = await f();
      return this.logReceive(s, {
        response: typeof g == "string" ? g : JSON.stringify(g),
        status: "success",
        duration: Date.now() - h
      }), g;
    } catch (g) {
      throw this.logReceive(s, {
        status: "error",
        error: g instanceof Error ? g.message : String(g),
        duration: Date.now() - h
      }), g;
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
    const o = [], f = this.entries.filter((s) => s.direction === "sent");
    for (const s of f) {
      const h = this.entries.find(
        (g) => g.id === `${s.id}_recv` && g.direction === "received"
      );
      o.push({ sent: s, received: h });
    }
    return o;
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
  subscribe(o) {
    return this.listeners.add(o), () => this.listeners.delete(o);
  }
  /**
   * 获取日志数量
   */
  getCount() {
    return this.entries.filter((o) => o.direction === "sent").length;
  }
  /**
   * 裁剪条目
   */
  trimEntries() {
    this.entries.length > Gm * 2 && (this.entries = this.entries.slice(0, Gm * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const o of this.listeners)
      o();
  }
}
const si = new ig(), rg = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, cg = ({ status: r }) => {
  switch (r) {
    case "pending":
      return /* @__PURE__ */ i.jsx(l0, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ i.jsx(Wm, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ i.jsx(rs, { size: 14, className: "text-red-400" });
  }
}, sg = (r) => new Date(r).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), og = (r) => r === void 0 ? "-" : r < 1e3 ? `${r}ms` : `${(r / 1e3).toFixed(1)}s`, fg = ({ sent: r, received: o }) => {
  const [f, s] = G.useState(!1), h = rg[r.type];
  return /* @__PURE__ */ i.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => s(!f),
        children: [
          f ? /* @__PURE__ */ i.jsx(is, { size: 14 }) : /* @__PURE__ */ i.jsx(Fm, { size: 14 }),
          /* @__PURE__ */ i.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${h.color}`, children: h.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: sg(r.timestamp) }),
          /* @__PURE__ */ i.jsx(cg, { status: (o == null ? void 0 : o.status) || r.status }),
          r.floorRange && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            r.floorRange[0],
            "-",
            r.floorRange[1]
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ i.jsx(b2, { size: 12 }),
            og((o == null ? void 0 : o.duration) || r.duration)
          ] })
        ]
      }
    ),
    f && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ i.jsx(sp, { size: 14 }),
          "发送",
          r.tokensSent && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            r.tokensSent,
            " tokens"
          ] })
        ] }),
        r.systemPrompt && /* @__PURE__ */ i.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: r.systemPrompt })
        ] }),
        r.userPrompt && /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: r.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ i.jsx($m, { size: 14 }),
          "接收",
          (o == null ? void 0 : o.tokensReceived) && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            o.tokensReceived,
            " tokens"
          ] })
        ] }),
        (o == null ? void 0 : o.status) === "error" && o.error && /* @__PURE__ */ i.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: o.error }),
        (o == null ? void 0 : o.response) && /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: o.response }),
        !o && r.status === "pending" && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(l0, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, dg = () => {
  const [r, o] = G.useState(si.getPaired());
  return G.useEffect(() => si.subscribe(() => {
    o(si.getPaired());
  }), []), /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(ms, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          r.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => si.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ i.jsx(Yn, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: r.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ i.jsx($m, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-3", children: r.map(({ sent: f, received: s }) => /* @__PURE__ */ i.jsx(fg, { sent: f, received: s }, f.id)) }) })
  ] });
}, mg = [
  { id: "runtime", label: "运行日志", icon: Ya },
  { id: "model", label: "模型日志", icon: ms }
], hg = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], pg = () => {
  const [r, o] = G.useState("runtime"), [f, s] = G.useState([]), [h, g] = G.useState([]), [T, z] = G.useState(""), [x, N] = G.useState(-1), [U, _] = G.useState("ALL"), [w, Z] = G.useState(!0), [ee, W] = G.useState(!1), [Ce, Q] = G.useState(!1), Me = G.useRef(null), H = G.useRef(null);
  G.useEffect(() => {
    s(We.getLogs());
    const J = We.subscribe((X) => {
      s((Te) => [...Te, X]);
    });
    return () => J();
  }, []), G.useEffect(() => {
    let J = f;
    if (x !== -1 && (J = J.filter((X) => X.level >= x)), U !== "ALL" && (J = J.filter((X) => X.module.startsWith(U))), T.trim()) {
      const X = T.toLowerCase();
      J = J.filter(
        (Te) => Te.message.toLowerCase().includes(X) || Te.module.toLowerCase().includes(X)
      );
    }
    g(J);
  }, [f, x, U, T]), G.useEffect(() => {
    w && H.current && H.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [h, w]);
  const ye = G.useCallback(async () => {
    await We.clear(), s([]);
  }, []), Qe = G.useCallback(() => {
    const J = We.exportToMarkdown(), X = We.getExportFilename(), Te = new Blob([J], { type: "text/markdown" }), Ie = URL.createObjectURL(Te), St = document.createElement("a");
    St.href = Ie, St.download = X, St.click(), URL.revokeObjectURL(Ie), We.success("DevLog", `日志已导出: ${X}`);
  }, []);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full gap-3", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Ya, { size: 24, className: "text-foreground" }),
        /* @__PURE__ */ i.jsx("h2", { className: "text-lg font-medium text-foreground", children: "开发日志" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex gap-1 ml-4", children: mg.map((J) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${r === J.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`,
          onClick: () => o(J.id),
          children: [
            /* @__PURE__ */ i.jsx(J.icon, { size: 14 }),
            J.label
          ]
        },
        J.id
      )) })
    ] }),
    r === "runtime" && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 flex-wrap shrink-0", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-transparent border border-border text-muted-foreground hover:bg-accent transition-colors",
              onClick: () => W(!ee),
              children: [
                /* @__PURE__ */ i.jsx(Mm, { size: 14 }),
                x === -1 ? "全部级别" : mi[x].label
              ]
            }
          ),
          ee && /* @__PURE__ */ i.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors",
                onClick: () => {
                  N(-1), W(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(mi).map(([J, X]) => /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors",
                onClick: () => {
                  N(Number(J)), W(!1);
                },
                children: [
                  X.icon,
                  " ",
                  X.label
                ]
              },
              J
            ))
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-transparent border border-border text-muted-foreground hover:bg-accent transition-colors",
              onClick: () => Q(!Ce),
              children: [
                /* @__PURE__ */ i.jsx(Mm, { size: 14 }),
                U
              ]
            }
          ),
          Ce && /* @__PURE__ */ i.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]", children: hg.map((J) => /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors",
              onClick: () => {
                _(J), Q(!1);
              },
              children: J
            },
            J
          )) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md", children: [
          /* @__PURE__ */ i.jsx(rp, { size: 14, className: "text-muted-foreground" }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: T,
              onChange: (J) => z(J.target.value),
              className: "bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `p-1.5 rounded-md transition-colors ${w ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`,
              onClick: () => Z(!w),
              title: "自动滚动到最新",
              children: /* @__PURE__ */ i.jsx(l2, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors",
              onClick: ye,
              title: "清空日志",
              children: /* @__PURE__ */ i.jsx(Yn, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity",
              onClick: Qe,
              title: "导出日志",
              children: [
                /* @__PURE__ */ i.jsx(Pm, { size: 14 }),
                "导出"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 bg-card border border-border rounded-lg overflow-y-auto font-mono text-sm leading-relaxed", ref: Me, children: h.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(Ya, { size: 48, strokeWidth: 1 }),
        /* @__PURE__ */ i.jsx("p", { children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        h.map((J) => /* @__PURE__ */ i.jsx(ug, { entry: J }, J.id)),
        /* @__PURE__ */ i.jsx("div", { ref: H })
      ] }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground shrink-0", children: [
        /* @__PURE__ */ i.jsxs("span", { children: [
          "共 ",
          f.length,
          " 条日志"
        ] }),
        h.length !== f.length && /* @__PURE__ */ i.jsxs("span", { children: [
          "（显示 ",
          h.length,
          " 条）"
        ] })
      ] })
    ] }),
    r === "model" && /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ i.jsx(dg, {}) })
  ] });
}, gg = ({
  preset: r,
  isSelected: o,
  onSelect: f,
  onEdit: s,
  onCopy: h,
  onDelete: g
}) => {
  var x;
  const T = r.source === "tavern" || r.source === "tavern_profile" ? u0 : j2;
  r.source === "tavern" || r.source;
  const z = r.source === "custom" ? ((x = r.custom) == null ? void 0 : x.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group p-3 rounded-lg transition-all duration-200 cursor-pointer border
                ${o ? "bg-accent/50 border-input shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: f,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i.jsx(
            "div",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                        ${o ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"}
                    `,
              children: /* @__PURE__ */ i.jsx(T, { size: 16 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `m-0 text-sm font-medium ${o ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: r.name }),
              r.isDefault && /* @__PURE__ */ i.jsx("span", { className: "px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-sm font-medium", children: "DEFAULT" })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ i.jsxs("span", { className: "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground font-mono hidden md:inline-block", children: [
                "T:",
                r.parameters.temperature
              ] }),
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground truncate", children: z })
            ] })
          ] }),
          o && /* @__PURE__ */ i.jsx(d2, { size: 14, className: "text-primary" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${o || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: s, children: /* @__PURE__ */ i.jsx(F2, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: h, children: /* @__PURE__ */ i.jsx(Im, { size: 12 }) }),
          !r.isDefault && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: g, children: /* @__PURE__ */ i.jsx(Yn, { size: 12 }) })
        ] })
      ]
    }
  );
}, st = ({ title: r, description: o, children: f, className: s = "" }) => /* @__PURE__ */ i.jsxs("div", { className: `mb-8 ${s}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-foreground", children: r }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: o })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "space-y-4", children: f })
] }), ot = ({
  label: r,
  description: o,
  error: f,
  required: s,
  className: h = "",
  value: g,
  onChange: T,
  placeholder: z,
  type: x = "text",
  disabled: N,
  multiline: U,
  rows: _ = 3
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${h}`, children: [
  /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    r,
    s && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "relative group", children: U ? /* @__PURE__ */ i.jsx(
    "textarea",
    {
      value: g,
      onChange: (w) => T(w.target.value),
      placeholder: z,
      disabled: N,
      rows: _,
      className: `
                            engram-input w-full bg-input/50 text-foreground text-sm px-0 py-2 border-b border-input
                            focus:outline-none focus:border-primary transition-colors rounded-t-sm resize-y font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) : /* @__PURE__ */ i.jsx(
    "input",
    {
      type: x,
      value: g,
      onChange: (w) => T(w.target.value),
      placeholder: z,
      disabled: N,
      className: `
                            engram-input w-full bg-input/50 text-foreground text-sm px-0 py-2 border-b border-input
                            focus:outline-none focus:border-primary transition-colors rounded-t-sm font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) }),
  o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: o }),
  f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: f })
] }), Ut = ({
  label: r,
  description: o,
  error: f,
  required: s,
  className: h = "",
  value: g,
  onChange: T,
  min: z,
  max: x,
  step: N = 1,
  showSlider: U = !0
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${h}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
      r,
      s && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded", children: g })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
    U && z !== void 0 && x !== void 0 && /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "range",
        min: z,
        max: x,
        step: N,
        value: g,
        onChange: (_) => T(Number(_.target.value)),
        className: "flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
      }
    ),
    /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "number",
        min: z,
        max: x,
        step: N,
        value: g,
        onChange: (_) => T(Number(_.target.value)),
        className: `
                        bg-input/50 border-b border-input text-foreground text-xs px-0 py-1 font-mono text-center
                        focus:outline-none focus:border-primary transition-colors w-16
                        [appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
                    `
      }
    )
  ] }),
  o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: o }),
  f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: f })
] }), ea = ({
  label: r,
  description: o,
  error: f,
  required: s,
  className: h = "",
  value: g,
  onChange: T,
  options: z,
  placeholder: x = "Select...",
  disabled: N
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${h}`, children: [
  /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    r,
    s && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ i.jsxs(
      "select",
      {
        value: g,
        onChange: (U) => T(U.target.value),
        disabled: N,
        className: `
                        engram-select w-full bg-input/50 text-foreground text-sm pl-0 pr-8 py-2 border-b border-input
                        focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer rounded-t-sm
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `,
        children: [
          /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: x }),
          z.map((U) => /* @__PURE__ */ i.jsx("option", { value: U.value, className: "bg-popover text-foreground", children: U.label }, U.value))
        ]
      }
    ),
    /* @__PURE__ */ i.jsx(is, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" })
  ] }),
  o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: o }),
  f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: f })
] }), qn = ({
  label: r,
  description: o,
  error: f,
  className: s = "",
  checked: h,
  onChange: g,
  disabled: T
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex items-start justify-between gap-4 py-1 ${s} ${T ? "opacity-50 pointer-events-none" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ i.jsx("label", { className: "text-xs font-medium text-foreground cursor-pointer", onClick: () => !T && g(!h), children: r }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80 mt-0.5", children: o }),
    f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: f })
  ] }),
  /* @__PURE__ */ i.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": h,
      onClick: () => !T && g(!h),
      disabled: T,
      className: `
                    relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                    ${h ? "bg-primary" : "bg-input"}
                `,
      children: /* @__PURE__ */ i.jsx(
        "span",
        {
          className: `
                        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${h ? "translate-x-4" : "translate-x-0"}
                    `
        }
      )
    }
  )
] }), yg = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], vg = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function xg() {
  var r, o, f, s;
  try {
    const h = (f = (o = (r = window.SillyTavern) == null ? void 0 : r.getContext) == null ? void 0 : o.call(r)) == null ? void 0 : f.extensionSettings;
    return ((s = h == null ? void 0 : h.connectionManager) == null ? void 0 : s.profiles) || [];
  } catch (h) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", h), [];
  }
}
const bg = ({
  preset: r,
  onChange: o,
  isNew: f = !1
}) => {
  var W, Ce, Q, Me;
  const [s, h] = G.useState([]), [g, T] = G.useState(!1), z = () => {
    T(!0);
    try {
      const H = xg();
      h(H);
    } finally {
      T(!1);
    }
  };
  G.useEffect(() => {
    z();
  }, []);
  const x = (H) => {
    o({ ...r, ...H, updatedAt: Date.now() });
  }, N = (H, ye) => {
    x({
      parameters: { ...r.parameters, [H]: ye }
    });
  }, U = (H, ye) => {
    x({
      context: { ...r.context, [H]: ye }
    });
  }, _ = (H, ye) => {
    var Qe, J, X, Te;
    x({
      custom: {
        apiUrl: ((Qe = r.custom) == null ? void 0 : Qe.apiUrl) || "",
        apiKey: ((J = r.custom) == null ? void 0 : J.apiKey) || "",
        model: ((X = r.custom) == null ? void 0 : X.model) || "",
        apiSource: ((Te = r.custom) == null ? void 0 : Te.apiSource) || "openai",
        [H]: ye
      }
    });
  }, w = (H) => {
    const ye = H;
    x({
      source: ye,
      tavernProfileId: ye === "tavern_profile" ? r.tavernProfileId : void 0
    }), ye === "tavern_profile" && z();
  }, Z = s.map((H) => ({
    value: H.id,
    label: `${H.name} (${H.api || "Unknown"} - ${H.model || "Unknown"})`
  })), ee = s.find((H) => H.id === r.tavernProfileId);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(st, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "预设名称",
          value: r.name,
          onChange: (H) => x({ name: H }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "配置源",
          value: r.source,
          onChange: w,
          options: vg,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    r.source === "tavern_profile" && /* @__PURE__ */ i.jsxs(st, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ i.jsx(
          ea,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: r.tavernProfileId || "",
            onChange: (H) => x({ tavernProfileId: H }),
            options: Z,
            placeholder: g ? "加载中..." : "请选择配置文件",
            disabled: g || Z.length === 0
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: z,
            disabled: g,
            title: "刷新配置列表",
            children: /* @__PURE__ */ i.jsx(Wc, { size: 16, className: g ? "animate-spin" : "" })
          }
        )
      ] }),
      Z.length === 0 && !g && /* @__PURE__ */ i.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      ee && /* @__PURE__ */ i.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: ee.api || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: ee.model || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: ee.preset || "-" })
        ] })
      ] })
    ] }),
    r.source === "custom" && /* @__PURE__ */ i.jsxs(st, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "API 类型",
          value: ((W = r.custom) == null ? void 0 : W.apiSource) || "openai",
          onChange: (H) => _("apiSource", H),
          options: yg
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API URL",
          type: "url",
          value: ((Ce = r.custom) == null ? void 0 : Ce.apiUrl) || "",
          onChange: (H) => _("apiUrl", H),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API Key",
          type: "password",
          value: ((Q = r.custom) == null ? void 0 : Q.apiKey) || "",
          onChange: (H) => _("apiKey", H),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "模型名称",
          value: ((Me = r.custom) == null ? void 0 : Me.model) || "",
          onChange: (H) => _("model", H),
          placeholder: "gpt-4o-mini",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(st, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "温度 (Temperature)",
          value: r.parameters.temperature,
          onChange: (H) => N("temperature", H),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "Top-P",
          value: r.parameters.topP,
          onChange: (H) => N("topP", H),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "最大输出 Tokens",
          value: r.parameters.maxTokens,
          onChange: (H) => N("maxTokens", H),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "频率惩罚",
          value: r.parameters.frequencyPenalty,
          onChange: (H) => N("frequencyPenalty", H),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "存在惩罚",
          value: r.parameters.presencePenalty,
          onChange: (H) => N("presencePenalty", H),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(st, { title: "上下文设置", description: "控制发送给模型的上下文内容", children: [
      /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "聊天历史条数",
          value: r.context.maxChatHistory,
          onChange: (H) => U("maxChatHistory", H),
          min: 0,
          max: 100,
          step: 1,
          showSlider: !1,
          description: "使用多少条聊天历史（0 表示不使用）"
        }
      ),
      /* @__PURE__ */ i.jsx(
        qn,
        {
          label: "包含世界书设定",
          checked: r.context.includeWorldInfo,
          onChange: (H) => U("includeWorldInfo", H),
          description: "是否在提示词中包含已激活的世界书内容"
        }
      ),
      r.context.includeWorldInfo && /* @__PURE__ */ i.jsx(
        Ut,
        {
          label: "世界书 Token 预算",
          value: r.context.worldInfoBudget,
          onChange: (H) => U("worldInfoBudget", H),
          min: 256,
          max: 8192,
          step: 256,
          showSlider: !1,
          description: "分配给世界书内容的最大 token 数"
        }
      )
    ] })
  ] });
}, Sg = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], Qm = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, Xm = ["ollama", "vllm"], Vm = ["openai", "cohere", "jina", "voyage"], jg = ({
  config: r,
  onChange: o
}) => {
  var T;
  const f = (z) => {
    o({ ...r, ...z });
  }, s = (z) => {
    f({
      source: z,
      model: Qm[z],
      apiUrl: Xm.includes(z) ? r.apiUrl : void 0,
      apiKey: Vm.includes(z) ? r.apiKey : void 0
    });
  }, h = Xm.includes(r.source), g = Vm.includes(r.source);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(st, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "向量源",
          value: r.source,
          onChange: (z) => s(z),
          options: Sg,
          description: "选择向量化服务提供商"
        }
      ),
      h && /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API URL",
          type: "url",
          value: r.apiUrl || "",
          onChange: (z) => f({ apiUrl: z }),
          placeholder: r.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${r.source} 服务的 API 端点`
        }
      ),
      g && /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API Key",
          type: "password",
          value: r.apiKey || "",
          onChange: (z) => f({ apiKey: z }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "模型名称",
          value: r.model || "",
          onChange: (z) => f({ model: z }),
          placeholder: Qm[r.source],
          description: "使用的向量化模型"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(st, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ i.jsx(
      ot,
      {
        label: "向量维度",
        value: ((T = r.dimensions) == null ? void 0 : T.toString()) || "",
        onChange: (z) => {
          const x = parseInt(z, 10);
          f({ dimensions: isNaN(x) ? void 0 : x });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, Ng = [
  "BAAI/bge-reranker-v2-m3",
  "BAAI/bge-reranker-base",
  "BAAI/bge-reranker-large",
  "cross-encoder/ms-marco-MiniLM-L-12-v2",
  "Xenova/ms-marco-MiniLM-L-6-v2"
], Tg = ({
  config: r,
  onChange: o
}) => {
  const f = (s) => {
    o({ ...r, ...s });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsx(st, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ i.jsx(
      qn,
      {
        label: "启用 Rerank",
        checked: r.enabled,
        onChange: (s) => f({ enabled: s }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    r.enabled && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs(st, { title: "API 配置", children: [
        /* @__PURE__ */ i.jsx(
          ot,
          {
            label: "API URL",
            type: "url",
            value: r.url,
            onChange: (s) => f({ url: s }),
            placeholder: "http://localhost:8000/rerank",
            description: "Rerank 服务的 API 端点",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          ot,
          {
            label: "API Key",
            type: "password",
            value: r.apiKey,
            onChange: (s) => f({ apiKey: s }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ i.jsx(
            ot,
            {
              label: "模型名称",
              value: r.model,
              onChange: (s) => f({ model: s }),
              placeholder: "BAAI/bge-reranker-v2-m3",
              description: "使用的 Rerank 模型",
              required: !0
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("span", { className: "block text-[10px] text-muted-foreground mb-2", children: "常用模型：" }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: Ng.map((s) => /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `
                                                px-2.5 py-1 border rounded text-xs cursor-pointer transition-all 
                                                ${r.model === s ? "bg-accent border-input text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}
                                            `,
                onClick: () => f({ model: s }),
                children: s.split("/").pop()
              },
              s
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs(st, { title: "参数设置", children: [
        /* @__PURE__ */ i.jsx(
          Ut,
          {
            label: "Top-N",
            value: r.topN,
            onChange: (s) => f({ topN: s }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ i.jsx(
          Ut,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: r.hybridAlpha,
            onChange: (s) => f({ hybridAlpha: s }),
            min: 0,
            max: 1,
            step: 0.1,
            description: "0 = 纯向量检索评分，1 = 纯 Rerank 评分"
          }
        )
      ] })
    ] })
  ] });
}, gi = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], Eg = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, _g = {
  maxChatHistory: 10,
  includeWorldInfo: !0,
  worldInfoBudget: 2048
}, zg = {
  source: "transformers"
}, Ag = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function d0(r = "默认预设") {
  const o = Date.now();
  return {
    id: `preset_${o}`,
    name: r,
    source: "tavern",
    parameters: { ...Eg },
    context: { ..._g },
    isDefault: !0,
    createdAt: o,
    updatedAt: o
  };
}
function Pl(r, o, f = {}) {
  const s = Date.now();
  return {
    id: `template_${s}_${Math.random().toString(36).slice(2, 8)}`,
    name: r,
    category: o,
    enabled: f.enabled ?? !1,
    isBuiltIn: f.isBuiltIn ?? !1,
    boundPresetId: f.boundPresetId ?? null,
    systemPrompt: f.systemPrompt ?? "",
    userPromptTemplate: f.userPromptTemplate ?? "",
    outputFormat: f.outputFormat ?? "plain",
    availableVariables: f.availableVariables ?? ["{{chatHistory}}", "{{context}}", "{{char}}", "{{user}}"],
    createdAt: s,
    updatedAt: s
  };
}
function Cg() {
  return [
    Pl("纯文本剧情总结", "text_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: "你是一个专业的剧情总结助手。请将对话内容总结为简洁的剧情摘要，保留关键情节和角色互动。",
      userPromptTemplate: `请总结以下对话内容：

{{chatHistory}}

请输出一段简洁的剧情摘要，格式如下：
📜 剧情摘要:
[摘要内容]`,
      outputFormat: "markdown"
    }),
    Pl("向量化剧情总结", "vector_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: "你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。",
      userPromptTemplate: `请从以下对话中提取结构化信息：

{{chatHistory}}

请以 JSON 格式输出，包含：
- summary: 事件摘要
- entities: 实体列表 [{name, type}]
- relations: 关系列表 [{subject, predicate, object}]
- keywords: 关键词列表`,
      outputFormat: "json"
    }),
    Pl("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: "你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。",
      userPromptTemplate: `请将以下多条剧情摘要合并精简：

{{context}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    Pl("查询增强", "query_enhance", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: '你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。',
      userPromptTemplate: `用户输入：{{userInput}}

最近对话上下文：
{{context}}

请输出扩展后的查询关键词列表，用于检索相关记忆。`,
      outputFormat: "plain"
    })
  ];
}
const Mg = {
  enabled: !0,
  includeGlobal: !0
}, Og = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  floorLimit: 50,
  countLimit: 5
};
function Dg() {
  return {
    llmPresets: [d0()],
    selectedPresetId: null,
    vectorConfig: { ...zg },
    rerankConfig: { ...Ag },
    promptTemplates: Cg(),
    worldbookConfig: { ...Mg }
  };
}
function Ug(r) {
  switch (r) {
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
function Rg(r) {
  var o;
  return ((o = gi.find((f) => f.value === r)) == null ? void 0 : o.label) || r;
}
const wg = ({
  template: r,
  isSelected: o = !1,
  onSelect: f,
  onCopy: s,
  onDelete: h,
  onToggleEnabled: g,
  onImport: T
}) => {
  const z = G.useRef(null), x = (_) => {
    _.stopPropagation();
    const w = {
      version: "1.0",
      exportedAt: Date.now(),
      template: {
        name: r.name,
        category: r.category,
        boundPresetId: r.boundPresetId,
        systemPrompt: r.systemPrompt,
        userPromptTemplate: r.userPromptTemplate,
        outputFormat: r.outputFormat,
        availableVariables: r.availableVariables
      }
    }, Z = new Blob([JSON.stringify(w, null, 2)], { type: "application/json" }), ee = URL.createObjectURL(Z), W = document.createElement("a");
    W.href = ee, W.download = `engram_template_${r.name.replace(/\s+/g, "_")}.json`, W.click(), URL.revokeObjectURL(ee);
  }, N = (_) => {
    var w;
    _.stopPropagation(), (w = z.current) == null || w.click();
  }, U = (_) => {
    var ee;
    const w = (ee = _.target.files) == null ? void 0 : ee[0];
    if (!w || !T) return;
    const Z = new FileReader();
    Z.onload = (W) => {
      var Ce;
      try {
        const Q = JSON.parse((Ce = W.target) == null ? void 0 : Ce.result);
        if (Q.version && Q.template) {
          const Me = Pl(
            Q.template.name,
            Q.template.category,
            {
              enabled: r.enabled,
              // 保持当前启用状态
              isBuiltIn: r.isBuiltIn,
              // 保持内置状态
              boundPresetId: Q.template.boundPresetId,
              systemPrompt: Q.template.systemPrompt,
              userPromptTemplate: Q.template.userPromptTemplate,
              outputFormat: Q.template.outputFormat,
              availableVariables: Q.template.availableVariables
            }
          );
          Me.id = r.id, T(Me);
        }
      } catch (Q) {
        console.error("导入失败:", Q);
      }
    }, Z.readAsText(w), z.current && (z.current.value = "");
  };
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${o ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: f,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${r.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (_) => {
                _.stopPropagation(), g == null || g(!r.enabled);
              },
              children: /* @__PURE__ */ i.jsx(a0, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${o ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: r.name }),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ i.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${Ug(r.category)}`, children: Rg(r.category) }),
                r.isBuiltIn && /* @__PURE__ */ i.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ i.jsx("span", { className: "truncate max-w-[120px]", children: r.boundPresetId ? `BOUND: ${r.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ i.jsx("span", { children: r.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${o || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: N, title: "Import", children: /* @__PURE__ */ i.jsx(yp, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: x, title: "Export", children: /* @__PURE__ */ i.jsx(Pm, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (_) => {
            _.stopPropagation(), s == null || s();
          }, title: "Copy", children: /* @__PURE__ */ i.jsx(Im, { size: 12 }) }),
          !r.isBuiltIn && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (_) => {
            _.stopPropagation(), h == null || h();
          }, title: "Delete", children: /* @__PURE__ */ i.jsx(Yn, { size: 12 }) })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            ref: z,
            type: "file",
            accept: ".json",
            onChange: U,
            className: "hidden"
          }
        )
      ]
    }
  );
}, kg = ({
  templates: r,
  selectedId: o,
  onSelect: f,
  onAdd: s,
  onUpdate: h,
  onDelete: g
}) => {
  const T = () => {
    const _ = Pl(
      `新模板 ${r.length + 1}`,
      "text_summary"
    );
    s(_), f(_);
  }, z = (_) => {
    const w = Pl(
      `${_.name} (副本)`,
      _.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: _.boundPresetId,
        systemPrompt: _.systemPrompt,
        userPromptTemplate: _.userPromptTemplate,
        outputFormat: _.outputFormat,
        availableVariables: [..._.availableVariables]
      }
    );
    s(w);
  }, x = (_, w) => {
    w && r.filter((Z) => Z.category === _.category && Z.id !== _.id && Z.enabled).forEach((Z) => h({ ...Z, enabled: !1 })), h({ ..._, enabled: w });
  }, N = (_) => {
    h(_);
  }, U = gi.map((_) => ({
    ..._,
    templates: r.filter((w) => w.category === _.value)
  })).filter((_) => _.templates.length > 0);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: T,
          children: /* @__PURE__ */ i.jsx(fs, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      U.map((_) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          _.label,
          /* @__PURE__ */ i.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: _.templates.map((w) => /* @__PURE__ */ i.jsx(
          wg,
          {
            template: w,
            isSelected: o === w.id,
            onSelect: () => f(w),
            onCopy: () => z(w),
            onDelete: () => g(w),
            onToggleEnabled: (Z) => x(w, Z),
            onImport: N
          },
          w.id
        )) })
      ] }, _.value)),
      r.length === 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ i.jsx(ss, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, Bg = [
  { value: "plain", label: "纯文本" },
  { value: "markdown", label: "Markdown" },
  { value: "json", label: "JSON" }
], Hg = ({
  template: r,
  llmPresets: o,
  defaultPresetId: f,
  onChange: s
}) => {
  var T, z;
  const h = [
    { value: "", label: "使用默认预设" + (f ? ` (${((T = o.find((x) => x.id === f)) == null ? void 0 : T.name) || f})` : "") },
    ...o.map((x) => ({ value: x.id, label: x.name }))
  ], g = (x) => {
    s({ ...r, ...x, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ i.jsxs(st, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "模板名称",
          value: r.name,
          onChange: (x) => g({ name: x }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: r.isBuiltIn
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "模板分类",
          value: r.category,
          onChange: (x) => g({ category: x }),
          options: gi.map((x) => ({ value: x.value, label: x.label })),
          description: (z = gi.find((x) => x.value === r.category)) == null ? void 0 : z.description
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "模型来源",
          value: r.boundPresetId || "",
          onChange: (x) => g({ boundPresetId: x || null }),
          options: h,
          description: "选择用于此模板的 LLM 预设"
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "输出格式",
          value: r.outputFormat,
          onChange: (x) => g({ outputFormat: x }),
          options: Bg
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(st, { title: "提示词内容", description: "支持变量：{{chatHistory}}, {{context}}, {{char}}, {{user}}, {{userInput}}", children: [
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "系统提示词",
          value: r.systemPrompt,
          onChange: (x) => g({ systemPrompt: x }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "用户提示词模板",
          value: r.userPromptTemplate,
          onChange: (x) => g({ userPromptTemplate: x }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用变量" }),
      /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: r.availableVariables.map((x) => /* @__PURE__ */ i.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px] text-primary font-mono", children: x }, x)) })
    ] })
  ] });
}, qg = ({
  rules: r,
  selectedId: o,
  onSelect: f,
  onToggle: s,
  onDelete: h,
  onAdd: g,
  onReset: T
}) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: T,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: g,
          children: /* @__PURE__ */ i.jsx(n0, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
    r.map((z) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${o === z.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => f(z.id),
        children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${z.enabled ? o === z.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (x) => {
                x.stopPropagation(), s(z.id);
              },
              title: z.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ i.jsx(a0, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${o === z.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!z.enabled && "opacity-50 line-through"}`, children: z.name }) }),
            /* @__PURE__ */ i.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ i.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              z.pattern,
              "/",
              z.flags
            ] }) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: `flex items-center ${o === z.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (x) => {
                x.stopPropagation(), h(z.id);
              },
              children: /* @__PURE__ */ i.jsx(Yn, { size: 12 })
            }
          ) })
        ]
      },
      z.id
    )),
    r.length === 0 && /* @__PURE__ */ i.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), yi = [
  {
    id: "remove-think",
    name: "移除思维链",
    pattern: "<think>[\\s\\S]*?</think>",
    replacement: "",
    enabled: !0,
    flags: "gi",
    description: "移除 <think>...</think> 标签及其内容"
  },
  {
    id: "remove-inner-monologue",
    name: "移除内心独白",
    pattern: "<inner_monologue>[\\s\\S]*?</inner_monologue>",
    replacement: "",
    enabled: !0,
    flags: "gi",
    description: "移除 <inner_monologue>...</inner_monologue> 标签"
  },
  {
    id: "remove-system-note",
    name: "移除系统标记",
    pattern: "\\[System:.*?\\]",
    replacement: "",
    enabled: !0,
    flags: "gi",
    description: "移除 [System:...] 格式的系统标记"
  },
  {
    id: "remove-ooc",
    name: "移除 OOC 标记",
    pattern: "\\(OOC:.*?\\)",
    replacement: "",
    enabled: !1,
    flags: "gi",
    description: "移除 (OOC:...) 格式的元对话"
  },
  {
    id: "remove-empty-lines",
    name: "合并空行",
    pattern: "\\n{3,}",
    replacement: `

`,
    enabled: !0,
    flags: "g",
    description: "将连续3个以上的换行合并为2个"
  }
];
class m0 {
  constructor(o) {
    Dl(this, "rules", []);
    this.rules = o || [...yi];
  }
  /**
   * 应用所有启用的规则处理文本
   */
  process(o) {
    let f = o;
    for (const s of this.rules)
      if (s.enabled)
        try {
          const h = new RegExp(s.pattern, s.flags);
          f = f.replace(h, s.replacement);
        } catch (h) {
          console.warn(`[RegexProcessor] 规则 "${s.name}" 执行失败:`, h);
        }
    return f;
  }
  /**
   * 使用指定规则处理文本（用于预览）
   */
  processWithRule(o, f) {
    try {
      const s = new RegExp(f.pattern, f.flags);
      return o.replace(s, f.replacement);
    } catch (s) {
      return console.warn("[RegexProcessor] 规则执行失败:", s), o;
    }
  }
  /**
   * 验证正则表达式是否有效
   */
  validatePattern(o, f) {
    try {
      return new RegExp(o, f), { valid: !0 };
    } catch (s) {
      return {
        valid: !1,
        error: s instanceof Error ? s.message : "无效的正则表达式"
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
  setRules(o) {
    this.rules = [...o];
  }
  /**
   * 添加规则
   */
  addRule(o) {
    this.rules.push(o);
  }
  /**
   * 更新规则
   */
  updateRule(o, f) {
    const s = this.rules.findIndex((h) => h.id === o);
    s >= 0 && (this.rules[s] = { ...this.rules[s], ...f });
  }
  /**
   * 删除规则
   */
  deleteRule(o) {
    this.rules = this.rules.filter((f) => f.id !== o);
  }
  /**
   * 启用/禁用规则
   */
  toggleRule(o) {
    const f = this.rules.find((s) => s.id === o);
    f && (f.enabled = !f.enabled);
  }
  /**
   * 重置为默认规则
   */
  resetToDefaults() {
    this.rules = [...yi];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((o) => o.enabled).length;
  }
}
const sy = new m0(), Lg = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], Yg = ({ rule: r, onChange: o }) => {
  const [f, s] = G.useState(""), [h, g] = G.useState(""), [T, z] = G.useState({ valid: !0 }), x = new m0();
  G.useEffect(() => {
    const U = x.validatePattern(r.pattern, r.flags);
    z(U);
  }, [r.pattern, r.flags]), G.useEffect(() => {
    if (f && T.valid) {
      const U = x.processWithRule(f, r);
      g(U);
    } else
      g("");
  }, [f, r, T.valid]);
  const N = (U) => {
    const _ = r.flags.split(""), w = _.indexOf(U);
    w >= 0 ? _.splice(w, 1) : _.push(U), o({ flags: _.join("") });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "规则名称" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: r.name,
            onChange: (U) => o({ name: U.target.value }),
            placeholder: "例如：移除思维链"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "描述（可选）" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: r.description || "",
            onChange: (U) => o({ description: U.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          T.valid ? /* @__PURE__ */ i.jsx(Wm, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ i.jsx(rs, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${T.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: r.pattern,
            onChange: (U) => o({ pattern: U.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !T.valid && T.error && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-red-500", children: T.error })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: r.replacement,
            onChange: (U) => o({ replacement: U.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: Lg.map((U) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${r.flags.includes(U.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => N(U.value),
            title: U.description,
            children: [
              U.label,
              " (",
              U.value,
              ")"
            ]
          },
          U.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ i.jsx(os, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: f,
            onChange: (U) => s(U.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      f && T.valid && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ i.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: h || /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ i.jsx(k2, { size: 16, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        "正则规则会在发送给 LLM 之前应用于聊天内容，用于清理干扰信息。 常用规则如移除思维链 ",
        /* @__PURE__ */ i.jsx("code", { className: "bg-blue-500/20 px-1 rounded", children: "<think>" }),
        " 标签等。"
      ] })
    ] })
  ] });
}, Gg = ({
  config: r,
  onChange: o
}) => {
  const f = (s) => {
    o({
      ...r,
      [s]: !r[s]
    });
  };
  return /* @__PURE__ */ i.jsx("div", { className: "", children: /* @__PURE__ */ i.jsxs(st, { title: "世界书配置", description: "总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。", children: [
    /* @__PURE__ */ i.jsx(
      qn,
      {
        label: "启用世界书",
        description: "总结时注入始终激活（蓝灯）的世界书条目",
        checked: r.enabled,
        onChange: () => f("enabled")
      }
    ),
    /* @__PURE__ */ i.jsx(
      qn,
      {
        label: "包含全局世界书",
        description: "关闭后只读取角色世界书和聊天世界书",
        checked: r.includeGlobal,
        onChange: () => f("includeGlobal"),
        disabled: !r.enabled
      }
    )
  ] }) });
}, Qg = ({ tabs: r, activeTab: o, onChange: f }) => /* @__PURE__ */ i.jsx("div", { className: "flex overflow-x-auto gap-2 mb-8 pb-1 no-scrollbar px-4 md:px-0 border-b border-border", children: r.map((s) => /* @__PURE__ */ i.jsxs(
  "button",
  {
    onClick: () => f(s.id),
    className: `whitespace-nowrap px-4 py-2 text-sm transition-all relative ${o === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
    children: [
      s.label,
      o === s.id && /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" })
    ]
  },
  s.id
)) }), Xg = [
  { id: "llm", label: "LLM 预设", icon: e0 },
  { id: "vector", label: "向量化", icon: vi },
  { id: "rerank", label: "Rerank", icon: t0 }
], Vg = () => {
  const [r, o] = G.useState("model"), [f, s] = G.useState("llm"), [h, g] = G.useState(Dg), [T, z] = G.useState(null), [x, N] = G.useState(null), [U, _] = G.useState(!1), [w, Z] = G.useState([...yi]), [ee, W] = G.useState(null);
  G.useEffect(() => {
  }, []);
  const Ce = (R) => {
    g(($) => ({ ...$, selectedPresetId: R.id })), z(R);
  }, Q = () => {
    const R = d0(`预设 ${h.llmPresets.length + 1}`);
    R.isDefault = !1, g(($) => ({
      ...$,
      llmPresets: [...$.llmPresets, R],
      selectedPresetId: R.id
    })), z(R), _(!0);
  }, Me = (R) => {
    g(($) => ({
      ...$,
      llmPresets: $.llmPresets.map((oe) => oe.id === R.id ? R : oe)
    })), z(R), _(!0);
  }, H = (R) => {
    const $ = {
      ...R,
      id: `preset_${Date.now()}`,
      name: `${R.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    g((oe) => ({ ...oe, llmPresets: [...oe.llmPresets, $] })), _(!0);
  }, ye = (R) => {
    R.isDefault || (g(($) => ({
      ...$,
      llmPresets: $.llmPresets.filter((oe) => oe.id !== R.id),
      selectedPresetId: $.selectedPresetId === R.id ? null : $.selectedPresetId
    })), (T == null ? void 0 : T.id) === R.id && z(null), _(!0));
  }, Qe = (R) => {
    N(R);
  }, J = (R) => {
    g(($) => ({
      ...$,
      promptTemplates: [...$.promptTemplates, R]
    })), _(!0);
  }, X = (R) => {
    g(($) => ({
      ...$,
      promptTemplates: $.promptTemplates.map((oe) => oe.id === R.id ? R : oe)
    })), N(R), _(!0);
  }, Te = (R) => {
    R.isBuiltIn || (g(($) => ({
      ...$,
      promptTemplates: $.promptTemplates.filter((oe) => oe.id !== R.id)
    })), (x == null ? void 0 : x.id) === R.id && N(null), _(!0));
  }, Ie = (R) => {
    g(($) => ({ ...$, vectorConfig: R })), _(!0);
  }, St = (R) => {
    g(($) => ({ ...$, rerankConfig: R })), _(!0);
  }, jt = () => {
    console.log("保存配置:", h), _(!1);
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(
      bi,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则",
        actions: U && /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 text-sm shadow-sm",
            onClick: jt,
            children: [
              /* @__PURE__ */ i.jsx(ap, { size: 16 }),
              "保存更改"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsx(
      Qg,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: r,
        onChange: (R) => o(R)
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      r === "model" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-1 border-b border-border pb-1", children: Xg.map((R) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `
                                        flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative
                                        ${f === R.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
                                    `,
            onClick: () => s(R.id),
            children: [
              /* @__PURE__ */ i.jsx(R.icon, { size: 14 }),
              R.label,
              f === R.id && /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-foreground" })
            ]
          },
          R.id
        )) }),
        f === "llm" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ i.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: Q, children: /* @__PURE__ */ i.jsx(fs, { size: 16 }) })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: h.llmPresets.map((R) => /* @__PURE__ */ i.jsx(
              gg,
              {
                preset: R,
                isSelected: h.selectedPresetId === R.id,
                onSelect: () => Ce(R),
                onEdit: () => Ce(R),
                onCopy: () => H(R),
                onDelete: () => ye(R)
              },
              R.id
            )) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "flex flex-col", children: T ? /* @__PURE__ */ i.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ i.jsx(bg, { preset: T, onChange: Me }) }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ i.jsx(e0, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        f === "vector" && /* @__PURE__ */ i.jsx(jg, { config: h.vectorConfig, onChange: Ie }),
        f === "rerank" && /* @__PURE__ */ i.jsx(Tg, { config: h.rerankConfig, onChange: St })
      ] }),
      r === "prompt" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          kg,
          {
            templates: h.promptTemplates,
            selectedId: (x == null ? void 0 : x.id) || null,
            onSelect: Qe,
            onAdd: J,
            onUpdate: X,
            onDelete: Te
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: x ? /* @__PURE__ */ i.jsx(
          Hg,
          {
            template: x,
            llmPresets: h.llmPresets,
            defaultPresetId: h.selectedPresetId,
            onChange: X
          }
        ) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(ss, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      r === "regex" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          qg,
          {
            rules: w,
            selectedId: (ee == null ? void 0 : ee.id) || null,
            onSelect: (R) => {
              const $ = w.find((oe) => oe.id === R);
              W($ || null);
            },
            onToggle: (R) => {
              Z(($) => $.map(
                (oe) => oe.id === R ? { ...oe, enabled: !oe.enabled } : oe
              )), _(!0);
            },
            onDelete: (R) => {
              Z(($) => $.filter((oe) => oe.id !== R)), (ee == null ? void 0 : ee.id) === R && W(null), _(!0);
            },
            onAdd: () => {
              const R = {
                id: `rule_${Date.now()}`,
                name: "新规则",
                pattern: "",
                replacement: "",
                enabled: !0,
                flags: "gi",
                description: ""
              };
              Z(($) => [...$, R]), W(R), _(!0);
            },
            onReset: () => {
              Z([...yi]), W(null), _(!0);
            }
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: ee ? /* @__PURE__ */ i.jsx(
          Yg,
          {
            rule: ee,
            onChange: (R) => {
              const $ = { ...ee, ...R };
              W($), Z((oe) => oe.map(
                (tt) => tt.id === $.id ? $ : tt
              )), _(!0);
            }
          }
        ) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(n0, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      r === "worldbook" && /* @__PURE__ */ i.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ i.jsx(
        Gg,
        {
          config: h.worldbookConfig,
          onChange: (R) => {
            g(($) => ({ ...$, worldbookConfig: R })), _(!0);
          }
        }
      ) })
    ] })
  ] });
}, Zg = {
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
}, Kg = {
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
}, Jg = {
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
}, $g = {
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
}, Fg = {
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
}, di = {
  sillytavern: Wg,
  // SillyTavern 继承主题
  paperLight: Zg,
  twitterDark: Jg,
  claudeDark: Kg,
  catppuccin: Fg,
  discord: $g
};
class La {
  /**
   * Load settings from SillyTavern global state
   */
  static loadSettings() {
    var o, f;
    try {
      const s = ((f = (o = window.SillyTavern) == null ? void 0 : o.extension_settings) == null ? void 0 : f[this.EXTENSION_NAME]) || {};
      return {
        theme: s.theme || "odysseia",
        // Default to new theme
        presets: s.presets || {},
        templates: s.templates || {},
        promptTemplates: s.promptTemplates || []
      };
    } catch (s) {
      return We.warn("SettingsManager", "Failed to load settings", s), { theme: "odysseia", presets: {}, templates: {}, promptTemplates: [] };
    }
  }
  /**
   * Get a specific setting value
   */
  static get(o) {
    return this.loadSettings()[o];
  }
  /**
   * Save a specific setting value
   */
  static set(o, f) {
    const s = this.loadSettings();
    s[o] = f, this.saveToST(s);
  }
  /**
   * 获取指定分类下已启用的提示词模板
   * @param category 模板分类
   * @returns 启用的模板，如果没有则返回 null
   */
  static getEnabledPromptTemplate(o) {
    return (this.get("promptTemplates") || []).find((s) => s.category === o && s.enabled) || null;
  }
  /**
   * Persist to SillyTavern extension_settings
   * This updates the global object immediately for local usage,
   * and debounces the server save call.
   */
  static saveToST(o) {
    window.SillyTavern && (window.SillyTavern.extension_settings || (window.SillyTavern.extension_settings = {}), window.SillyTavern.extension_settings[this.EXTENSION_NAME] = o, this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
      this.pushToServer();
    }, 1e3));
  }
  /**
   * Push settings to server via ST API
   * Note: We use the generic extension settings save mechanism if available,
   * or rely on ST's auto-save if it observes the object. 
   * Usually ST requires manual trigger for extensions.js based extensions,
   * assuming they call `saveSettingsDebounced()` globally.
   */
  static pushToServer() {
    We.info("SettingsManager", "Persisting settings to server...");
    try {
      window.saveSettingsDebounced && window.saveSettingsDebounced();
    } catch (o) {
      We.error("SettingsManager", "Failed to save settings", o);
    }
  }
}
Dl(La, "EXTENSION_NAME", "engram"), Dl(La, "saveTimeout", null);
class Ln {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let f = La.loadSettings().theme;
    f || (f = localStorage.getItem(this.STORAGE_KEY), f && La.set("theme", f));
    const s = di[f] ? f : "claudeDark";
    this.setTheme(s), We.info("ThemeManager", `主题系统初始化完成: ${s}`);
  }
  /**
   * 切换主题
   */
  static setTheme(o) {
    di[o] || (We.warn("ThemeManager", `未知主题: ${o}, 回退到 claudeDark`), o = "claudeDark"), this.currentTheme = o, La.set("theme", o), localStorage.setItem(this.STORAGE_KEY, o), this.applyThemeVariables(o);
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
    const o = "engram-styles";
    if (document.getElementById(o)) return;
    const f = document.createElement("link");
    f.id = o, f.rel = "stylesheet", f.type = "text/css", f.href = `scripts/extensions/Engram_project/dist/style.css?v=${Date.now()}`, document.head.appendChild(f);
  }
  /**
   * 应用 CSS 变量到根元素
   */
  static applyThemeVariables(o) {
    const f = di[o];
    if (!f) return;
    const s = document.documentElement, h = (T, z) => {
      s.style.setProperty(T, z);
    };
    Object.entries(f.colors).forEach(([T, z]) => {
      let x = `--${T.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      x = x.replace(/(\d+)/, "-$1"), h(x, z);
    }), Object.entries(f.variables).forEach(([T, z]) => {
      h(`--${T}`, z);
    }), o !== "paperLight" ? s.classList.add("dark") : s.classList.remove("dark");
  }
}
Dl(Ln, "STORAGE_KEY", "engram-theme"), Dl(Ln, "currentTheme", "claudeDark");
const Ig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Ln
}, Symbol.toStringTag, { value: "Module" })), Pg = () => {
  const [r, o] = G.useState("claudeDark");
  G.useEffect(() => {
    o(Ln.getTheme());
  }, []);
  const f = (h) => {
    Ln.setTheme(h), La.set("theme", h), o(h);
  }, s = Object.entries(di).map(([h, g]) => {
    let T = g.colors.background, z = g.colors.primary;
    return {
      id: h,
      name: g.name,
      background: T,
      sidebar: g.colors.sidebar,
      // Add sidebar color
      primary: z
    };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: s.map((h) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        onClick: () => f(h.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${r === h.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
                        `,
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-center -space-x-3 mb-2", children: [
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-10",
                style: { background: h.background },
                title: "Background"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-20",
                style: { background: h.sidebar },
                title: "Sidebar"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background",
                style: { background: h.primary },
                title: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: `text-sm font-medium ${r === h.id ? "text-primary" : "text-muted-foreground"}`, children: h.name }),
          r === h.id && /* @__PURE__ */ i.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      h.id
    )) })
  ] });
}, ey = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(bi, { title: "设置", subtitle: "扩展全局选项" }),
  /* @__PURE__ */ i.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ i.jsx(Pg, {}),
    /* @__PURE__ */ i.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
      /* @__PURE__ */ i.jsx(dp, { size: 32 }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
    ] }) })
  ] })
] }), ty = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(bi, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ i.jsx(c2, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ i.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), ly = [
  { id: "token", label: "Token 数", description: "总结内容达到 Token 上限时触发", icon: o2 },
  { id: "floor", label: "楼层数", description: "总结覆盖的楼层达到上限时触发", icon: t0 },
  { id: "count", label: "总结次数", description: "执行总结的次数达到上限时触发", icon: R2 }
], ay = ({
  config: r,
  onChange: o
}) => {
  const f = (g) => {
    o({ ...r, enabled: g });
  }, s = (g) => {
    o({ ...r, trigger: g });
  }, h = (g, T) => {
    o({ ...r, [g]: T });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ i.jsx(
      st,
      {
        title: "精简配置",
        description: "将多次总结压缩为更简洁的摘要",
        className: "!mb-4",
        children: /* @__PURE__ */ i.jsx(
          qn,
          {
            label: "启用精简",
            checked: r.enabled,
            onChange: f
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: `space-y-6 transition-opacity ${r.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "触发条件" }),
        /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-3 gap-3", children: ly.map((g) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            onClick: () => s(g.id),
            className: `
                                    flex flex-col items-center gap-2 p-3 rounded-lg border transition-all text-sm
                                    ${r.trigger === g.id ? "border-primary bg-primary/10 text-primary font-medium shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-muted hover:border-primary/50"}
                                `,
            children: [
              Km.createElement(g.icon, { className: "w-4 h-4" }),
              /* @__PURE__ */ i.jsx("span", { children: g.label })
            ]
          },
          g.id
        )) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
        r.trigger === "token" && /* @__PURE__ */ i.jsx(
          Ut,
          {
            label: "Token 上限",
            description: "当总结内容 Token 超过此值时触发精简",
            value: r.tokenLimit,
            onChange: (g) => h("tokenLimit", g),
            min: 1024,
            max: 16384,
            step: 512
          }
        ),
        r.trigger === "floor" && /* @__PURE__ */ i.jsx(
          Ut,
          {
            label: "楼层上限",
            description: "当总结覆盖楼层数超过此值时触发精简",
            value: r.floorLimit,
            onChange: (g) => h("floorLimit", g),
            min: 10,
            max: 200,
            step: 10
          }
        ),
        r.trigger === "count" && /* @__PURE__ */ i.jsx(
          Ut,
          {
            label: "总结次数上限",
            description: "当执行总结次数超过此值时触发精简",
            value: r.countLimit,
            onChange: (g) => h("countLimit", g),
            min: 2,
            max: 20,
            step: 1
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: `w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                        bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-sm`,
          onClick: () => {
            console.log("手动触发精简...");
          },
          children: [
            /* @__PURE__ */ i.jsx(up, { className: "w-4 h-4" }),
            "手动执行精简"
          ]
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: "p-3 rounded-lg bg-accent/50 border border-accent text-xs text-accent-foreground", children: [
        /* @__PURE__ */ i.jsx("strong", { children: "说明：" }),
        "精简会将多次总结内容使用 ",
        /* @__PURE__ */ i.jsx("code", { children: "trim" }),
        " 类型的提示词模板压缩为更简洁的摘要，减少 Token 消耗。"
      ] })
    ] })
  ] });
}, ny = [
  { id: "summarize", label: "总结剧情", description: "将对话内容提炼为剧情摘要" },
  { id: "vectorize", label: "向量化", description: "将内容转换为向量存储" },
  { id: "batch", label: "批量处理", description: "批量执行记忆操作" }
], uy = ({ onNavigate: r }) => {
  const [o, f] = G.useState("summarize"), [s, h] = G.useState(null), [g, T] = G.useState(!1), [z, x] = G.useState({
    autoEnabled: !0,
    floorInterval: 10
  }), [N, U] = G.useState({ ...Og }), [_, w] = G.useState(0);
  G.useEffect(() => {
    Z();
  }, []);
  const Z = async () => {
    try {
      const { summarizerService: Q } = await import("./index-nPlu3cnB.js");
      h(Q.getStatus());
      const { WorldInfoService: Me } = await import("./WorldInfoService-CizlUCtc.js"), H = await Me.getActivatedWorldInfo();
      if (H) {
        const ye = await Me.countTokens(H);
        w(ye);
      }
    } catch (Q) {
      console.error("加载 Summarizer 状态失败:", Q);
    }
  }, ee = async () => {
    try {
      const { summarizerService: Q } = await import("./index-nPlu3cnB.js");
      Q.start(), await Z();
    } catch (Q) {
      console.error("启动失败:", Q);
    }
  }, W = async () => {
    try {
      const { summarizerService: Q } = await import("./index-nPlu3cnB.js");
      Q.stop(), await Z();
    } catch (Q) {
      console.error("停止失败:", Q);
    }
  }, Ce = async () => {
    T(!0);
    try {
      const { summarizerService: Q } = await import("./index-nPlu3cnB.js");
      await Q.triggerSummary(!0), await Z();
    } catch (Q) {
      console.error("触发失败:", Q);
    } finally {
      T(!1);
    }
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 p-4 h-full overflow-hidden", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-border", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ i.jsx(vi, { size: 24, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("h2", { className: "text-2xl font-semibold text-foreground m-0", children: "处理中心" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors",
            onClick: () => r == null ? void 0 : r("/dev"),
            children: [
              /* @__PURE__ */ i.jsx(M2, { size: 14 }),
              "模型日志"
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors",
            onClick: () => r == null ? void 0 : r("/api"),
            children: [
              /* @__PURE__ */ i.jsx(ss, { size: 14 }),
              "提示词模板"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex gap-2 flex-wrap", children: ny.map((Q) => /* @__PURE__ */ i.jsx(
      "button",
      {
        className: `inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium transition-all
                            ${o === Q.id ? "bg-primary-20 text-primary border-primary-30" : "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:border-border"}`,
        onClick: () => f(Q.id),
        children: Q.label
      },
      Q.id
    )) }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      o === "summarize" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-foreground m-0", children: "状态统计" }),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                className: "p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
                onClick: Z,
                title: "刷新状态",
                children: /* @__PURE__ */ i.jsx(Wc, { size: 14 })
              }
            )
          ] }),
          s ? /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground text-[10px] uppercase tracking-wider", children: "运行状态" }),
              /* @__PURE__ */ i.jsxs("span", { className: `flex items-center gap-1.5 text-sm font-medium ${s.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                s.running ? /* @__PURE__ */ i.jsx(v2, { size: 14 }) : /* @__PURE__ */ i.jsx(rs, { size: 14 }),
                s.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground text-[10px] uppercase tracking-wider", children: "当前楼层" }),
              /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono text-sm font-medium", children: s.currentFloor })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground text-[10px] uppercase tracking-wider", children: "待处理" }),
              /* @__PURE__ */ i.jsx("span", { className: "text-amber-500 font-mono text-sm font-medium", children: s.pendingFloors })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground text-[10px] uppercase tracking-wider", children: "总结次数" }),
              /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono text-sm font-medium", children: s.historyCount })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground text-[10px] uppercase tracking-wider", children: "世界书 Token" }),
              /* @__PURE__ */ i.jsx("span", { className: "text-primary font-mono text-sm font-medium", children: _.toLocaleString() })
            ] })
          ] }) : /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground", children: "加载中..." })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
          s != null && s.running ? /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: `inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                        bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 active:scale-95`,
              onClick: W,
              children: [
                /* @__PURE__ */ i.jsx(J2, { size: 16 }),
                "停止监听"
              ]
            }
          ) : /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: `inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                        bg-primary text-primary-foreground border-primary hover:bg-primary-90 active:scale-95`,
              onClick: ee,
              children: [
                /* @__PURE__ */ i.jsx(os, { size: 16 }),
                "启动监听"
              ]
            }
          ),
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: `inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                    bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 active:scale-95
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`,
              onClick: Ce,
              disabled: g || (s == null ? void 0 : s.isSummarizing),
              children: [
                /* @__PURE__ */ i.jsx(Wc, { size: 16, className: g ? "animate-spin" : "" }),
                g ? "处理中..." : "手动触发"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: [
          /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-foreground mb-4", children: "总结设置" }),
          /* @__PURE__ */ i.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ i.jsxs("div", { children: [
                /* @__PURE__ */ i.jsx("div", { className: "text-sm font-medium text-foreground", children: "自动总结" }),
                /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground", children: "达到楼层阈值时自动触发" })
              ] }),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => x((Q) => ({ ...Q, autoEnabled: !Q.autoEnabled })),
                  className: `relative w-9 h-5 rounded-full transition-colors ${z.autoEnabled ? "bg-primary" : "bg-input"}`,
                  children: /* @__PURE__ */ i.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${z.autoEnabled ? "translate-x-4" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: z.autoEnabled ? "" : "opacity-50 grayscale pointer-events-none", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "楼层间隔" }),
                /* @__PURE__ */ i.jsx("span", { className: "text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded", children: z.floorInterval })
              ] }),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "range",
                  min: "1",
                  max: "50",
                  value: z.floorInterval,
                  onChange: (Q) => x((Me) => ({ ...Me, floorInterval: Number(Q.target.value) })),
                  disabled: !z.autoEnabled,
                  className: "w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/90"
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1 font-mono", children: [
                /* @__PURE__ */ i.jsx("span", { children: "1" }),
                /* @__PURE__ */ i.jsx("span", { children: "25" }),
                /* @__PURE__ */ i.jsx("span", { children: "50" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: /* @__PURE__ */ i.jsx(
          ay,
          {
            config: N,
            onChange: U
          }
        ) })
      ] }),
      o === "vectorize" && /* @__PURE__ */ i.jsx("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground", children: "🚧 向量化功能开发中..." }) }),
      o === "batch" && /* @__PURE__ */ i.jsx("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground", children: "🚧 批量处理功能开发中..." }) })
    ] })
  ] });
}, iy = ({ onClose: r }) => {
  const [o, f] = G.useState("dashboard"), s = () => {
    switch (o) {
      case "dashboard":
        return /* @__PURE__ */ i.jsx(Lm, { onNavigate: f });
      case "presets":
        return /* @__PURE__ */ i.jsx(Vg, {});
      case "graph":
        return /* @__PURE__ */ i.jsx(lg, {});
      case "devlog":
        return /* @__PURE__ */ i.jsx(pg, {});
      case "settings":
        return /* @__PURE__ */ i.jsx(ey, {});
      case "memory":
        return /* @__PURE__ */ i.jsx(ty, {});
      case "processing":
        return /* @__PURE__ */ i.jsx(uy, {});
      default:
        return /* @__PURE__ */ i.jsx(Lm, {});
    }
  };
  return /* @__PURE__ */ i.jsx(bp, { activeTab: o, setActiveTab: f, onClose: r, children: s() });
};
Ip((r, o) => {
  const f = K1.createRoot(r);
  return f.render(Km.createElement(iy, { onClose: o })), f;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", qm) : qm();
export {
  yi as D,
  si as M,
  m0 as R,
  La as S,
  cy as c,
  Zm as g,
  Jp as i,
  sy as r
};
//# sourceMappingURL=index-CkCDR5SD.js.map
