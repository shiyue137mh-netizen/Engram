var Hh = Object.defineProperty;
var qh = (c, o, f) => o in c ? Hh(c, o, { enumerable: !0, configurable: !0, writable: !0, value: f }) : c[o] = f;
var Dl = (c, o, f) => qh(c, typeof o != "symbol" ? o + "" : o, f);
var sb = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zm(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var qr = { exports: {} }, I = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vm;
function Lh() {
  if (vm) return I;
  vm = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), b = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), j = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), k = Symbol.iterator;
  function $(g) {
    return g === null || typeof g != "object" ? null : (g = k && g[k] || g["@@iterator"], typeof g == "function" ? g : null);
  }
  var ue = {
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
  function L(g, R, H) {
    this.props = g, this.context = R, this.refs = Ce, this.updater = H || ue;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(g, R) {
    if (typeof g != "object" && typeof g != "function" && g != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, g, R, "setState");
  }, L.prototype.forceUpdate = function(g) {
    this.updater.enqueueForceUpdate(this, g, "forceUpdate");
  };
  function Ee() {
  }
  Ee.prototype = L.prototype;
  function B(g, R, H) {
    this.props = g, this.context = R, this.refs = Ce, this.updater = H || ue;
  }
  var me = B.prototype = new Ee();
  me.constructor = B, W(me, L.prototype), me.isPureReactComponent = !0;
  var qe = Array.isArray;
  function Z() {
  }
  var X = { H: null, A: null, T: null, S: null }, be = Object.prototype.hasOwnProperty;
  function Qe(g, R, H) {
    var Y = H.ref;
    return {
      $$typeof: c,
      type: g,
      key: R,
      ref: Y !== void 0 ? Y : null,
      props: H
    };
  }
  function et(g, R) {
    return Qe(g.type, R, g.props);
  }
  function tt(g) {
    return typeof g == "object" && g !== null && g.$$typeof === c;
  }
  function se(g) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + g.replace(/[=:]/g, function(H) {
      return R[H];
    });
  }
  var Gt = /\/+/g;
  function Dt(g, R) {
    return typeof g == "object" && g !== null && g.key != null ? se("" + g.key) : R.toString(36);
  }
  function G(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (typeof g.status == "string" ? g.then(Z, Z) : (g.status = "pending", g.then(
          function(R) {
            g.status === "pending" && (g.status = "fulfilled", g.value = R);
          },
          function(R) {
            g.status === "pending" && (g.status = "rejected", g.reason = R);
          }
        )), g.status) {
          case "fulfilled":
            return g.value;
          case "rejected":
            throw g.reason;
        }
    }
    throw g;
  }
  function y(g, R, H, Y, P) {
    var le = typeof g;
    (le === "undefined" || le === "boolean") && (g = null);
    var he = !1;
    if (g === null) he = !0;
    else
      switch (le) {
        case "bigint":
        case "string":
        case "number":
          he = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case c:
            case o:
              he = !0;
              break;
            case D:
              return he = g._init, y(
                he(g._payload),
                R,
                H,
                Y,
                P
              );
          }
      }
    if (he)
      return P = P(g), he = Y === "" ? "." + Dt(g, 0) : Y, qe(P) ? (H = "", he != null && (H = he.replace(Gt, "$&/") + "/"), y(P, R, H, "", function(Ga) {
        return Ga;
      })) : P != null && (tt(P) && (P = et(
        P,
        H + (P.key == null || g && g.key === P.key ? "" : ("" + P.key).replace(
          Gt,
          "$&/"
        ) + "/") + he
      )), R.push(P)), 1;
    he = 0;
    var Ie = Y === "" ? "." : Y + ":";
    if (qe(g))
      for (var De = 0; De < g.length; De++)
        Y = g[De], le = Ie + Dt(Y, De), he += y(
          Y,
          R,
          H,
          le,
          P
        );
    else if (De = $(g), typeof De == "function")
      for (g = De.call(g), De = 0; !(Y = g.next()).done; )
        Y = Y.value, le = Ie + Dt(Y, De++), he += y(
          Y,
          R,
          H,
          le,
          P
        );
    else if (le === "object") {
      if (typeof g.then == "function")
        return y(
          G(g),
          R,
          H,
          Y,
          P
        );
      throw R = String(g), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return he;
  }
  function U(g, R, H) {
    if (g == null) return g;
    var Y = [], P = 0;
    return y(g, Y, "", "", function(le) {
      return R.call(H, le, P++);
    }), Y;
  }
  function K(g) {
    if (g._status === -1) {
      var R = g._result;
      R = R(), R.then(
        function(H) {
          (g._status === 0 || g._status === -1) && (g._status = 1, g._result = H);
        },
        function(H) {
          (g._status === 0 || g._status === -1) && (g._status = 2, g._result = H);
        }
      ), g._status === -1 && (g._status = 0, g._result = R);
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ye = typeof reportError == "function" ? reportError : function(g) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
        error: g
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", g);
      return;
    }
    console.error(g);
  }, je = {
    map: U,
    forEach: function(g, R, H) {
      U(
        g,
        function() {
          R.apply(this, arguments);
        },
        H
      );
    },
    count: function(g) {
      var R = 0;
      return U(g, function() {
        R++;
      }), R;
    },
    toArray: function(g) {
      return U(g, function(R) {
        return R;
      }) || [];
    },
    only: function(g) {
      if (!tt(g))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return g;
    }
  };
  return I.Activity = C, I.Children = je, I.Component = L, I.Fragment = f, I.Profiler = h, I.PureComponent = B, I.StrictMode = s, I.Suspense = x, I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = X, I.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(g) {
      return X.H.useMemoCache(g);
    }
  }, I.cache = function(g) {
    return function() {
      return g.apply(null, arguments);
    };
  }, I.cacheSignal = function() {
    return null;
  }, I.cloneElement = function(g, R, H) {
    if (g == null)
      throw Error(
        "The argument must be a React element, but you passed " + g + "."
      );
    var Y = W({}, g.props), P = g.key;
    if (R != null)
      for (le in R.key !== void 0 && (P = "" + R.key), R)
        !be.call(R, le) || le === "key" || le === "__self" || le === "__source" || le === "ref" && R.ref === void 0 || (Y[le] = R[le]);
    var le = arguments.length - 2;
    if (le === 1) Y.children = H;
    else if (1 < le) {
      for (var he = Array(le), Ie = 0; Ie < le; Ie++)
        he[Ie] = arguments[Ie + 2];
      Y.children = he;
    }
    return Qe(g.type, P, Y);
  }, I.createContext = function(g) {
    return g = {
      $$typeof: _,
      _currentValue: g,
      _currentValue2: g,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, g.Provider = g, g.Consumer = {
      $$typeof: b,
      _context: g
    }, g;
  }, I.createElement = function(g, R, H) {
    var Y, P = {}, le = null;
    if (R != null)
      for (Y in R.key !== void 0 && (le = "" + R.key), R)
        be.call(R, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (P[Y] = R[Y]);
    var he = arguments.length - 2;
    if (he === 1) P.children = H;
    else if (1 < he) {
      for (var Ie = Array(he), De = 0; De < he; De++)
        Ie[De] = arguments[De + 2];
      P.children = Ie;
    }
    if (g && g.defaultProps)
      for (Y in he = g.defaultProps, he)
        P[Y] === void 0 && (P[Y] = he[Y]);
    return Qe(g, le, P);
  }, I.createRef = function() {
    return { current: null };
  }, I.forwardRef = function(g) {
    return { $$typeof: E, render: g };
  }, I.isValidElement = tt, I.lazy = function(g) {
    return {
      $$typeof: D,
      _payload: { _status: -1, _result: g },
      _init: K
    };
  }, I.memo = function(g, R) {
    return {
      $$typeof: j,
      type: g,
      compare: R === void 0 ? null : R
    };
  }, I.startTransition = function(g) {
    var R = X.T, H = {};
    X.T = H;
    try {
      var Y = g(), P = X.S;
      P !== null && P(H, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(Z, ye);
    } catch (le) {
      ye(le);
    } finally {
      R !== null && H.types !== null && (R.types = H.types), X.T = R;
    }
  }, I.unstable_useCacheRefresh = function() {
    return X.H.useCacheRefresh();
  }, I.use = function(g) {
    return X.H.use(g);
  }, I.useActionState = function(g, R, H) {
    return X.H.useActionState(g, R, H);
  }, I.useCallback = function(g, R) {
    return X.H.useCallback(g, R);
  }, I.useContext = function(g) {
    return X.H.useContext(g);
  }, I.useDebugValue = function() {
  }, I.useDeferredValue = function(g, R) {
    return X.H.useDeferredValue(g, R);
  }, I.useEffect = function(g, R) {
    return X.H.useEffect(g, R);
  }, I.useEffectEvent = function(g) {
    return X.H.useEffectEvent(g);
  }, I.useId = function() {
    return X.H.useId();
  }, I.useImperativeHandle = function(g, R, H) {
    return X.H.useImperativeHandle(g, R, H);
  }, I.useInsertionEffect = function(g, R) {
    return X.H.useInsertionEffect(g, R);
  }, I.useLayoutEffect = function(g, R) {
    return X.H.useLayoutEffect(g, R);
  }, I.useMemo = function(g, R) {
    return X.H.useMemo(g, R);
  }, I.useOptimistic = function(g, R) {
    return X.H.useOptimistic(g, R);
  }, I.useReducer = function(g, R, H) {
    return X.H.useReducer(g, R, H);
  }, I.useRef = function(g) {
    return X.H.useRef(g);
  }, I.useState = function(g) {
    return X.H.useState(g);
  }, I.useSyncExternalStore = function(g, R, H) {
    return X.H.useSyncExternalStore(
      g,
      R,
      H
    );
  }, I.useTransition = function() {
    return X.H.useTransition();
  }, I.version = "19.2.3", I;
}
var xm;
function us() {
  return xm || (xm = 1, qr.exports = Lh()), qr.exports;
}
var w = us();
const Km = /* @__PURE__ */ Zm(w);
var Lr = { exports: {} }, kn = {}, Yr = { exports: {} }, Gr = {};
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
function Yh() {
  return Sm || (Sm = 1, (function(c) {
    function o(y, U) {
      var K = y.length;
      y.push(U);
      e: for (; 0 < K; ) {
        var ye = K - 1 >>> 1, je = y[ye];
        if (0 < h(je, U))
          y[ye] = U, y[K] = je, K = ye;
        else break e;
      }
    }
    function f(y) {
      return y.length === 0 ? null : y[0];
    }
    function s(y) {
      if (y.length === 0) return null;
      var U = y[0], K = y.pop();
      if (K !== U) {
        y[0] = K;
        e: for (var ye = 0, je = y.length, g = je >>> 1; ye < g; ) {
          var R = 2 * (ye + 1) - 1, H = y[R], Y = R + 1, P = y[Y];
          if (0 > h(H, K))
            Y < je && 0 > h(P, H) ? (y[ye] = P, y[Y] = K, ye = Y) : (y[ye] = H, y[R] = K, ye = R);
          else if (Y < je && 0 > h(P, K))
            y[ye] = P, y[Y] = K, ye = Y;
          else break e;
        }
      }
      return U;
    }
    function h(y, U) {
      var K = y.sortIndex - U.sortIndex;
      return K !== 0 ? K : y.id - U.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var b = performance;
      c.unstable_now = function() {
        return b.now();
      };
    } else {
      var _ = Date, E = _.now();
      c.unstable_now = function() {
        return _.now() - E;
      };
    }
    var x = [], j = [], D = 1, C = null, k = 3, $ = !1, ue = !1, W = !1, Ce = !1, L = typeof setTimeout == "function" ? setTimeout : null, Ee = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate < "u" ? setImmediate : null;
    function me(y) {
      for (var U = f(j); U !== null; ) {
        if (U.callback === null) s(j);
        else if (U.startTime <= y)
          s(j), U.sortIndex = U.expirationTime, o(x, U);
        else break;
        U = f(j);
      }
    }
    function qe(y) {
      if (W = !1, me(y), !ue)
        if (f(x) !== null)
          ue = !0, Z || (Z = !0, se());
        else {
          var U = f(j);
          U !== null && G(qe, U.startTime - y);
        }
    }
    var Z = !1, X = -1, be = 5, Qe = -1;
    function et() {
      return Ce ? !0 : !(c.unstable_now() - Qe < be);
    }
    function tt() {
      if (Ce = !1, Z) {
        var y = c.unstable_now();
        Qe = y;
        var U = !0;
        try {
          e: {
            ue = !1, W && (W = !1, Ee(X), X = -1), $ = !0;
            var K = k;
            try {
              t: {
                for (me(y), C = f(x); C !== null && !(C.expirationTime > y && et()); ) {
                  var ye = C.callback;
                  if (typeof ye == "function") {
                    C.callback = null, k = C.priorityLevel;
                    var je = ye(
                      C.expirationTime <= y
                    );
                    if (y = c.unstable_now(), typeof je == "function") {
                      C.callback = je, me(y), U = !0;
                      break t;
                    }
                    C === f(x) && s(x), me(y);
                  } else s(x);
                  C = f(x);
                }
                if (C !== null) U = !0;
                else {
                  var g = f(j);
                  g !== null && G(
                    qe,
                    g.startTime - y
                  ), U = !1;
                }
              }
              break e;
            } finally {
              C = null, k = K, $ = !1;
            }
            U = void 0;
          }
        } finally {
          U ? se() : Z = !1;
        }
      }
    }
    var se;
    if (typeof B == "function")
      se = function() {
        B(tt);
      };
    else if (typeof MessageChannel < "u") {
      var Gt = new MessageChannel(), Dt = Gt.port2;
      Gt.port1.onmessage = tt, se = function() {
        Dt.postMessage(null);
      };
    } else
      se = function() {
        L(tt, 0);
      };
    function G(y, U) {
      X = L(function() {
        y(c.unstable_now());
      }, U);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(y) {
      y.callback = null;
    }, c.unstable_forceFrameRate = function(y) {
      0 > y || 125 < y ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : be = 0 < y ? Math.floor(1e3 / y) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return k;
    }, c.unstable_next = function(y) {
      switch (k) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = k;
      }
      var K = k;
      k = U;
      try {
        return y();
      } finally {
        k = K;
      }
    }, c.unstable_requestPaint = function() {
      Ce = !0;
    }, c.unstable_runWithPriority = function(y, U) {
      switch (y) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          y = 3;
      }
      var K = k;
      k = y;
      try {
        return U();
      } finally {
        k = K;
      }
    }, c.unstable_scheduleCallback = function(y, U, K) {
      var ye = c.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ye + K : ye) : K = ye, y) {
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
      return je = K + je, y = {
        id: D++,
        callback: U,
        priorityLevel: y,
        startTime: K,
        expirationTime: je,
        sortIndex: -1
      }, K > ye ? (y.sortIndex = K, o(j, y), f(x) === null && y === f(j) && (W ? (Ee(X), X = -1) : W = !0, G(qe, K - ye))) : (y.sortIndex = je, o(x, y), ue || $ || (ue = !0, Z || (Z = !0, se()))), y;
    }, c.unstable_shouldYield = et, c.unstable_wrapCallback = function(y) {
      var U = k;
      return function() {
        var K = k;
        k = U;
        try {
          return y.apply(this, arguments);
        } finally {
          k = K;
        }
      };
    };
  })(Gr)), Gr;
}
var jm;
function Gh() {
  return jm || (jm = 1, Yr.exports = Yh()), Yr.exports;
}
var Qr = { exports: {} }, Fe = {};
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
function Qh() {
  if (Nm) return Fe;
  Nm = 1;
  var c = us();
  function o(x) {
    var j = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      j += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        j += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return "Minified React error #" + x + "; visit " + j + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function b(x, j, D) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: C == null ? null : "" + C,
      children: x,
      containerInfo: j,
      implementation: D
    };
  }
  var _ = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function E(x, j) {
    if (x === "font") return "";
    if (typeof j == "string")
      return j === "use-credentials" ? j : "";
  }
  return Fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Fe.createPortal = function(x, j) {
    var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!j || j.nodeType !== 1 && j.nodeType !== 9 && j.nodeType !== 11)
      throw Error(o(299));
    return b(x, j, null, D);
  }, Fe.flushSync = function(x) {
    var j = _.T, D = s.p;
    try {
      if (_.T = null, s.p = 2, x) return x();
    } finally {
      _.T = j, s.p = D, s.d.f();
    }
  }, Fe.preconnect = function(x, j) {
    typeof x == "string" && (j ? (j = j.crossOrigin, j = typeof j == "string" ? j === "use-credentials" ? j : "" : void 0) : j = null, s.d.C(x, j));
  }, Fe.prefetchDNS = function(x) {
    typeof x == "string" && s.d.D(x);
  }, Fe.preinit = function(x, j) {
    if (typeof x == "string" && j && typeof j.as == "string") {
      var D = j.as, C = E(D, j.crossOrigin), k = typeof j.integrity == "string" ? j.integrity : void 0, $ = typeof j.fetchPriority == "string" ? j.fetchPriority : void 0;
      D === "style" ? s.d.S(
        x,
        typeof j.precedence == "string" ? j.precedence : void 0,
        {
          crossOrigin: C,
          integrity: k,
          fetchPriority: $
        }
      ) : D === "script" && s.d.X(x, {
        crossOrigin: C,
        integrity: k,
        fetchPriority: $,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0
      });
    }
  }, Fe.preinitModule = function(x, j) {
    if (typeof x == "string")
      if (typeof j == "object" && j !== null) {
        if (j.as == null || j.as === "script") {
          var D = E(
            j.as,
            j.crossOrigin
          );
          s.d.M(x, {
            crossOrigin: D,
            integrity: typeof j.integrity == "string" ? j.integrity : void 0,
            nonce: typeof j.nonce == "string" ? j.nonce : void 0
          });
        }
      } else j == null && s.d.M(x);
  }, Fe.preload = function(x, j) {
    if (typeof x == "string" && typeof j == "object" && j !== null && typeof j.as == "string") {
      var D = j.as, C = E(D, j.crossOrigin);
      s.d.L(x, D, {
        crossOrigin: C,
        integrity: typeof j.integrity == "string" ? j.integrity : void 0,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0,
        type: typeof j.type == "string" ? j.type : void 0,
        fetchPriority: typeof j.fetchPriority == "string" ? j.fetchPriority : void 0,
        referrerPolicy: typeof j.referrerPolicy == "string" ? j.referrerPolicy : void 0,
        imageSrcSet: typeof j.imageSrcSet == "string" ? j.imageSrcSet : void 0,
        imageSizes: typeof j.imageSizes == "string" ? j.imageSizes : void 0,
        media: typeof j.media == "string" ? j.media : void 0
      });
    }
  }, Fe.preloadModule = function(x, j) {
    if (typeof x == "string")
      if (j) {
        var D = E(j.as, j.crossOrigin);
        s.d.m(x, {
          as: typeof j.as == "string" && j.as !== "script" ? j.as : void 0,
          crossOrigin: D,
          integrity: typeof j.integrity == "string" ? j.integrity : void 0
        });
      } else s.d.m(x);
  }, Fe.requestFormReset = function(x) {
    s.d.r(x);
  }, Fe.unstable_batchedUpdates = function(x, j) {
    return x(j);
  }, Fe.useFormState = function(x, j, D) {
    return _.H.useFormState(x, j, D);
  }, Fe.useFormStatus = function() {
    return _.H.useHostTransitionStatus();
  }, Fe.version = "19.2.3", Fe;
}
var Tm;
function Xh() {
  if (Tm) return Qr.exports;
  Tm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Qr.exports = Qh(), Qr.exports;
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
function Vh() {
  if (Em) return kn;
  Em = 1;
  var c = Gh(), o = us(), f = Xh();
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
  function b(e) {
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
  function _(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function E(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function x(e) {
    if (b(e) !== e)
      throw Error(s(188));
  }
  function j(e) {
    var t = e.alternate;
    if (!t) {
      if (t = b(e), t === null) throw Error(s(188));
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
        for (var r = !1, d = n.child; d; ) {
          if (d === l) {
            r = !0, l = n, a = u;
            break;
          }
          if (d === a) {
            r = !0, a = n, l = u;
            break;
          }
          d = d.sibling;
        }
        if (!r) {
          for (d = u.child; d; ) {
            if (d === l) {
              r = !0, l = u, a = n;
              break;
            }
            if (d === a) {
              r = !0, a = u, l = n;
              break;
            }
            d = d.sibling;
          }
          if (!r) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? e : t;
  }
  function D(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = D(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var C = Object.assign, k = Symbol.for("react.element"), $ = Symbol.for("react.transitional.element"), ue = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), Ce = Symbol.for("react.strict_mode"), L = Symbol.for("react.profiler"), Ee = Symbol.for("react.consumer"), B = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), qe = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), be = Symbol.for("react.lazy"), Qe = Symbol.for("react.activity"), et = Symbol.for("react.memo_cache_sentinel"), tt = Symbol.iterator;
  function se(e) {
    return e === null || typeof e != "object" ? null : (e = tt && e[tt] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Gt = Symbol.for("react.client.reference");
  function Dt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Gt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case W:
        return "Fragment";
      case L:
        return "Profiler";
      case Ce:
        return "StrictMode";
      case qe:
        return "Suspense";
      case Z:
        return "SuspenseList";
      case Qe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ue:
          return "Portal";
        case B:
          return e.displayName || "Context";
        case Ee:
          return (e._context.displayName || "Context") + ".Consumer";
        case me:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case X:
          return t = e.displayName || null, t !== null ? t : Dt(e.type) || "Memo";
        case be:
          t = e._payload, e = e._init;
          try {
            return Dt(e(t));
          } catch {
          }
      }
    return null;
  }
  var G = Array.isArray, y = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ye = [], je = -1;
  function g(e) {
    return { current: e };
  }
  function R(e) {
    0 > je || (e.current = ye[je], ye[je] = null, je--);
  }
  function H(e, t) {
    je++, ye[je] = e.current, e.current = t;
  }
  var Y = g(null), P = g(null), le = g(null), he = g(null);
  function Ie(e, t) {
    switch (H(le, t), H(P, e), H(Y, null), t.nodeType) {
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
    R(Y), H(Y, e);
  }
  function De() {
    R(Y), R(P), R(le);
  }
  function Ga(e) {
    e.memoizedState !== null && H(he, e);
    var t = Y.current, l = Qd(t, e.type);
    t !== l && (H(P, e), H(Y, l));
  }
  function Qn(e) {
    P.current === e && (R(Y), R(P)), he.current === e && (R(he), Dn._currentValue = K);
  }
  var Si, gs;
  function Ul(e) {
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
                } catch (z) {
                  var T = z;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (z) {
                  T = z;
                }
                e.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                T = z;
              }
              (O = e()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (z) {
            if (z && T && typeof z.stack == "string")
              return [z.stack, T.stack];
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
      var u = a.DetermineComponentFrameRoot(), r = u[0], d = u[1];
      if (r && d) {
        var m = r.split(`
`), N = d.split(`
`);
        for (n = a = 0; a < m.length && !m[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < N.length && !N[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === m.length || n === N.length)
          for (a = m.length - 1, n = N.length - 1; 1 <= a && 0 <= n && m[a] !== N[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (m[a] !== N[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || m[a] !== N[n]) {
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
    return (l = e ? e.displayName || e.name : "") ? Ul(l) : "";
  }
  function p0(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ul(e.type);
      case 16:
        return Ul("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ul("Suspense Fallback") : Ul("Suspense");
      case 19:
        return Ul("SuspenseList");
      case 0:
      case 15:
        return Ni(e.type, !1);
      case 11:
        return Ni(e.type.render, !1);
      case 1:
        return Ni(e.type, !0);
      case 31:
        return Ul("Activity");
      default:
        return "";
    }
  }
  function bs(e) {
    try {
      var t = "", l = null;
      do
        t += p0(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ti = Object.prototype.hasOwnProperty, Ei = c.unstable_scheduleCallback, _i = c.unstable_cancelCallback, g0 = c.unstable_shouldYield, b0 = c.unstable_requestPaint, ft = c.unstable_now, y0 = c.unstable_getCurrentPriorityLevel, ys = c.unstable_ImmediatePriority, vs = c.unstable_UserBlockingPriority, Xn = c.unstable_NormalPriority, v0 = c.unstable_LowPriority, xs = c.unstable_IdlePriority, x0 = c.log, S0 = c.unstable_setDisableYieldValue, Qa = null, dt = null;
  function cl(e) {
    if (typeof x0 == "function" && S0(e), dt && typeof dt.setStrictMode == "function")
      try {
        dt.setStrictMode(Qa, e);
      } catch {
      }
  }
  var mt = Math.clz32 ? Math.clz32 : T0, j0 = Math.log, N0 = Math.LN2;
  function T0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (j0(e) / N0 | 0) | 0;
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
    var n = 0, u = e.suspendedLanes, r = e.pingedLanes;
    e = e.warmLanes;
    var d = a & 134217727;
    return d !== 0 ? (a = d & ~u, a !== 0 ? n = wl(a) : (r &= d, r !== 0 ? n = wl(r) : l || (l = d & ~e, l !== 0 && (n = wl(l))))) : (d = a & ~u, d !== 0 ? n = wl(d) : r !== 0 ? n = wl(r) : l || (l = a & ~e, l !== 0 && (n = wl(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : n;
  }
  function Xa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function E0(e, t) {
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
  function _0(e, t, l, a, n, u) {
    var r = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var d = e.entanglements, m = e.expirationTimes, N = e.hiddenUpdates;
    for (l = r & ~l; 0 < l; ) {
      var A = 31 - mt(l), O = 1 << A;
      d[A] = 0, m[A] = -1;
      var T = N[A];
      if (T !== null)
        for (N[A] = null, A = 0; A < T.length; A++) {
          var z = T[A];
          z !== null && (z.lane &= -536870913);
        }
      l &= ~O;
    }
    a !== 0 && js(e, a, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(r & ~t));
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
    return l = (l & 42) !== 0 ? 1 : Ci(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Ci(e) {
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
  function Ai(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Es() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : dm(e.type));
  }
  function _s(e, t) {
    var l = U.p;
    try {
      return U.p = e, t();
    } finally {
      U.p = l;
    }
  }
  var rl = Math.random().toString(36).slice(2), Xe = "__reactFiber$" + rl, lt = "__reactProps$" + rl, ta = "__reactContainer$" + rl, Mi = "__reactEvents$" + rl, z0 = "__reactListeners$" + rl, C0 = "__reactHandles$" + rl, zs = "__reactResources$" + rl, Za = "__reactMarker$" + rl;
  function Oi(e) {
    delete e[Xe], delete e[lt], delete e[Mi], delete e[z0], delete e[C0];
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
  var Cs = /* @__PURE__ */ new Set(), As = {};
  function kl(e, t) {
    ua(e, t), ua(e + "Capture", t);
  }
  function ua(e, t) {
    for (As[e] = t, e = 0; e < t.length; e++)
      Cs.add(t[e]);
  }
  var A0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ms = {}, Os = {};
  function M0(e) {
    return Ti.call(Os, e) ? !0 : Ti.call(Ms, e) ? !1 : A0.test(e) ? Os[e] = !0 : (Ms[e] = !0, !1);
  }
  function $n(e, t, l) {
    if (M0(t))
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
  function St(e) {
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
  function O0(e, t, l) {
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
        set: function(r) {
          l = "" + r, u.call(this, r);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(r) {
          l = "" + r;
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
      e._valueTracker = O0(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Rs(e) {
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
  var D0 = /[\n"\\]/g;
  function jt(e) {
    return e.replace(
      D0,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ri(e, t, l, a, n, u, r, d) {
    e.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.type = r : e.removeAttribute("type"), t != null ? r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)) : r !== "submit" && r !== "reset" || e.removeAttribute("value"), t != null ? Ui(e, r, St(t)) : l != null ? Ui(e, r, St(l)) : a != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + St(d) : e.removeAttribute("name");
  }
  function Us(e, t, l, a, n, u, r, d) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Di(e);
        return;
      }
      l = l != null ? "" + St(l) : "", t = t != null ? "" + St(t) : l, d || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = d ? e.checked : !!a, e.defaultChecked = !!a, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.name = r), Di(e);
  }
  function Ui(e, t, l) {
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
      for (l = "" + St(l), t = null, n = 0; n < e.length; n++) {
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
    if (t != null && (t = "" + St(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + St(l) : "";
  }
  function ks(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (G(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = St(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), Di(e);
  }
  function ca(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var R0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bs(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || R0.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
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
  ]), w0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function In(e) {
    return w0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Xt() {
  }
  var ki = null;
  function Bi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ra = null, sa = null;
  function qs(e) {
    var t = aa(e);
    if (t && (e = t.stateNode)) {
      var l = e[lt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ri(
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
              'input[name="' + jt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[lt] || null;
                if (!n) throw Error(s(90));
                Ri(
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
              a = l[t], a.form === e.form && Rs(a);
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
      if (Hi = !1, (ra !== null || sa !== null) && (qu(), ra && (t = ra, e = sa, sa = ra = null, qs(t), e)))
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
    var r = l - e;
    for (a = 1; a <= r && t[l - a] === n[u - a]; a++) ;
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
    function t(l, a, n, u, r) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = r, this.currentTarget = null;
      for (var d in e)
        e.hasOwnProperty(d) && (l = e[d], this[d] = l ? l(u) : u[d]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? tu : Gs, this.isPropagationStopped = Gs, this;
    }
    return C(t.prototype, {
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
  }, lu = at(Bl), Fa = C({}, Bl, { view: 0, detail: 0 }), k0 = at(Fa), Yi, Gi, Wa, au = C({}, Fa, {
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
  }), Qs = at(au), B0 = C({}, au, { dataTransfer: 0 }), H0 = at(B0), q0 = C({}, Fa, { relatedTarget: 0 }), Qi = at(q0), L0 = C({}, Bl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Y0 = at(L0), G0 = C({}, Bl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Q0 = at(G0), X0 = C({}, Bl, { data: 0 }), Xs = at(X0), V0 = {
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
  }, Z0 = {
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
  }, K0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function J0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = K0[e]) ? !!t[e] : !1;
  }
  function Xi() {
    return J0;
  }
  var $0 = C({}, Fa, {
    key: function(e) {
      if (e.key) {
        var t = V0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = eu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Z0[e.keyCode] || "Unidentified" : "";
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
  }), F0 = at($0), W0 = C({}, au, {
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
  }), Vs = at(W0), I0 = C({}, Fa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xi
  }), P0 = at(I0), e1 = C({}, Bl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), t1 = at(e1), l1 = C({}, au, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), a1 = at(l1), n1 = C({}, Bl, {
    newState: 0,
    oldState: 0
  }), u1 = at(n1), i1 = [9, 13, 27, 32], Vi = Vt && "CompositionEvent" in window, Ia = null;
  Vt && "documentMode" in document && (Ia = document.documentMode);
  var c1 = Vt && "TextEvent" in window && !Ia, Zs = Vt && (!Vi || Ia && 8 < Ia && 11 >= Ia), Ks = " ", Js = !1;
  function $s(e, t) {
    switch (e) {
      case "keyup":
        return i1.indexOf(t.keyCode) !== -1;
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
  function r1(e, t) {
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
  function s1(e, t) {
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
  var o1 = {
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
    return t === "input" ? !!o1[e.type] : t === "textarea";
  }
  function Is(e, t, l, a) {
    ra ? sa ? sa.push(a) : sa = [a] : ra = a, t = Zu(t, "onChange"), 0 < t.length && (l = new lu(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var Pa = null, en = null;
  function f1(e) {
    kd(e, 0);
  }
  function nu(e) {
    var t = Ka(e);
    if (Rs(t)) return e;
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
      ), Ls(f1, t);
    }
  }
  function d1(e, t, l) {
    e === "focusin" ? (lo(), Pa = t, en = l, Pa.attachEvent("onpropertychange", ao)) : e === "focusout" && lo();
  }
  function m1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return nu(en);
  }
  function h1(e, t) {
    if (e === "click") return nu(t);
  }
  function p1(e, t) {
    if (e === "input" || e === "change")
      return nu(t);
  }
  function g1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ht = typeof Object.is == "function" ? Object.is : g1;
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
  function co(e) {
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
  var b1 = Vt && "documentMode" in document && 11 >= document.documentMode, fa = null, $i = null, ln = null, Fi = !1;
  function ro(e, t, l) {
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
  var oo = ql("animationend"), fo = ql("animationiteration"), mo = ql("animationstart"), y1 = ql("transitionrun"), v1 = ql("transitionstart"), x1 = ql("transitioncancel"), ho = ql("transitionend"), po = /* @__PURE__ */ new Map(), Ii = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
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
  }, Nt = [], ma = 0, Pi = 0;
  function iu() {
    for (var e = ma, t = Pi = ma = 0; t < e; ) {
      var l = Nt[t];
      Nt[t++] = null;
      var a = Nt[t];
      Nt[t++] = null;
      var n = Nt[t];
      Nt[t++] = null;
      var u = Nt[t];
      if (Nt[t++] = null, a !== null && n !== null) {
        var r = a.pending;
        r === null ? n.next = n : (n.next = r.next, r.next = n), a.pending = n;
      }
      u !== 0 && go(l, n, u);
    }
  }
  function cu(e, t, l, a) {
    Nt[ma++] = e, Nt[ma++] = t, Nt[ma++] = l, Nt[ma++] = a, Pi |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function ec(e, t, l, a) {
    return cu(e, t, l, a), ru(e);
  }
  function Ll(e, t) {
    return cu(e, null, null, t), ru(e);
  }
  function go(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - mt(l), e = u.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function ru(e) {
    if (50 < En)
      throw En = 0, sr = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ha = {};
  function S1(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function pt(e, t, l, a) {
    return new S1(e, t, l, a);
  }
  function tc(e) {
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
  function bo(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function su(e, t, l, a, n, u) {
    var r = 0;
    if (a = e, typeof e == "function") tc(e) && (r = 1);
    else if (typeof e == "string")
      r = _h(
        e,
        l,
        Y.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Qe:
          return e = pt(31, l, t, n), e.elementType = Qe, e.lanes = u, e;
        case W:
          return Yl(l.children, n, u, t);
        case Ce:
          r = 8, n |= 24;
          break;
        case L:
          return e = pt(12, l, t, n | 2), e.elementType = L, e.lanes = u, e;
        case qe:
          return e = pt(13, l, t, n), e.elementType = qe, e.lanes = u, e;
        case Z:
          return e = pt(19, l, t, n), e.elementType = Z, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case B:
                r = 10;
                break e;
              case Ee:
                r = 9;
                break e;
              case me:
                r = 11;
                break e;
              case X:
                r = 14;
                break e;
              case be:
                r = 16, a = null;
                break e;
            }
          r = 29, l = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = pt(r, l, t, n), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function Yl(e, t, l, a) {
    return e = pt(7, e, a, t), e.lanes = l, e;
  }
  function lc(e, t, l) {
    return e = pt(6, e, null, t), e.lanes = l, e;
  }
  function yo(e) {
    var t = pt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ac(e, t, l) {
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
  var vo = /* @__PURE__ */ new WeakMap();
  function Tt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = vo.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: bs(t)
      }, vo.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: bs(t)
    };
  }
  var pa = [], ga = 0, ou = null, an = 0, Et = [], _t = 0, ol = null, kt = 1, Bt = "";
  function Kt(e, t) {
    pa[ga++] = an, pa[ga++] = ou, ou = e, an = t;
  }
  function xo(e, t, l) {
    Et[_t++] = kt, Et[_t++] = Bt, Et[_t++] = ol, ol = e;
    var a = kt;
    e = Bt;
    var n = 32 - mt(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - mt(t) + n;
    if (30 < u) {
      var r = n - n % 5;
      u = (a & (1 << r) - 1).toString(32), a >>= r, n -= r, kt = 1 << 32 - mt(t) + n | l << n | a, Bt = u + e;
    } else
      kt = 1 << u | l << n | a, Bt = e;
  }
  function nc(e) {
    e.return !== null && (Kt(e, 1), xo(e, 1, 0));
  }
  function uc(e) {
    for (; e === ou; )
      ou = pa[--ga], pa[ga] = null, an = pa[--ga], pa[ga] = null;
    for (; e === ol; )
      ol = Et[--_t], Et[_t] = null, Bt = Et[--_t], Et[_t] = null, kt = Et[--_t], Et[_t] = null;
  }
  function So(e, t) {
    Et[_t++] = kt, Et[_t++] = Bt, Et[_t++] = ol, kt = t.id, Bt = t.overflow, ol = e;
  }
  var Ve = null, _e = null, re = !1, fl = null, zt = !1, ic = Error(s(519));
  function dl(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw nn(Tt(t, e)), ic;
  }
  function jo(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Xe] = e, t[lt] = a, l) {
      case "dialog":
        ne("cancel", t), ne("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ne("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < zn.length; l++)
          ne(zn[l], t);
        break;
      case "source":
        ne("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ne("error", t), ne("load", t);
        break;
      case "details":
        ne("toggle", t);
        break;
      case "input":
        ne("invalid", t), Us(
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
        ne("invalid", t);
        break;
      case "textarea":
        ne("invalid", t), ks(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Ld(t.textContent, l) ? (a.popover != null && (ne("beforetoggle", t), ne("toggle", t)), a.onScroll != null && ne("scroll", t), a.onScrollEnd != null && ne("scrollend", t), a.onClick != null && (t.onclick = Xt), t = !0) : t = !1, t || dl(e, !0);
  }
  function No(e) {
    for (Ve = e.return; Ve; )
      switch (Ve.tag) {
        case 5:
        case 31:
        case 13:
          zt = !1;
          return;
        case 27:
        case 3:
          zt = !0;
          return;
        default:
          Ve = Ve.return;
      }
  }
  function ba(e) {
    if (e !== Ve) return !1;
    if (!re) return No(e), re = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Tr(e.type, e.memoizedProps)), l = !l), l && _e && dl(e), No(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      _e = $d(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      _e = $d(e);
    } else
      t === 27 ? (t = _e, _l(e.type) ? (e = Ar, Ar = null, _e = e) : _e = t) : _e = Ve ? At(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Gl() {
    _e = Ve = null, re = !1;
  }
  function cc() {
    var e = fl;
    return e !== null && (ct === null ? ct = e : ct.push.apply(
      ct,
      e
    ), fl = null), e;
  }
  function nn(e) {
    fl === null ? fl = [e] : fl.push(e);
  }
  var rc = g(null), Ql = null, Jt = null;
  function ml(e, t, l) {
    H(rc, t._currentValue), t._currentValue = l;
  }
  function $t(e) {
    e._currentValue = rc.current, R(rc);
  }
  function sc(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function oc(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var r = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var d = u;
          u = n;
          for (var m = 0; m < t.length; m++)
            if (d.context === t[m]) {
              u.lanes |= l, d = u.alternate, d !== null && (d.lanes |= l), sc(
                u.return,
                l,
                e
              ), a || (r = null);
              break e;
            }
          u = d.next;
        }
      } else if (n.tag === 18) {
        if (r = n.return, r === null) throw Error(s(341));
        r.lanes |= l, u = r.alternate, u !== null && (u.lanes |= l), sc(r, l, e), r = null;
      } else r = n.child;
      if (r !== null) r.return = n;
      else
        for (r = n; r !== null; ) {
          if (r === e) {
            r = null;
            break;
          }
          if (n = r.sibling, n !== null) {
            n.return = r.return, r = n;
            break;
          }
          r = r.return;
        }
      n = r;
    }
  }
  function ya(e, t, l, a) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var r = n.alternate;
        if (r === null) throw Error(s(387));
        if (r = r.memoizedProps, r !== null) {
          var d = n.type;
          ht(n.pendingProps.value, r.value) || (e !== null ? e.push(d) : e = [d]);
        }
      } else if (n === he.current) {
        if (r = n.alternate, r === null) throw Error(s(387));
        r.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Dn) : e = [Dn]);
      }
      n = n.return;
    }
    e !== null && oc(
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
  var j1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, N1 = c.unstable_scheduleCallback, T1 = c.unstable_NormalPriority, we = {
    $$typeof: B,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fc() {
    return {
      controller: new j1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function un(e) {
    e.refCount--, e.refCount === 0 && N1(T1, function() {
      e.controller.abort();
    });
  }
  var cn = null, dc = 0, va = 0, xa = null;
  function E1(e, t) {
    if (cn === null) {
      var l = cn = [];
      dc = 0, va = pr(), xa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return dc++, t.then(Eo, Eo), t;
  }
  function Eo() {
    if (--dc === 0 && cn !== null) {
      xa !== null && (xa.status = "fulfilled");
      var e = cn;
      cn = null, va = 0, xa = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function _1(e, t) {
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
  var _o = y.S;
  y.S = function(e, t) {
    od = ft(), typeof t == "object" && t !== null && typeof t.then == "function" && E1(e, t), _o !== null && _o(e, t);
  };
  var Vl = g(null);
  function mc() {
    var e = Vl.current;
    return e !== null ? e : Ne.pooledCache;
  }
  function mu(e, t) {
    t === null ? H(Vl, Vl.current) : H(Vl, t.pool);
  }
  function zo() {
    var e = mc();
    return e === null ? null : { parent: we._currentValue, pool: e };
  }
  var Sa = Error(s(460)), hc = Error(s(474)), hu = Error(s(542)), pu = { then: function() {
  } };
  function Co(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ao(e, t, l) {
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
  var ja = null, rn = 0;
  function gu(e) {
    var t = rn;
    return rn += 1, ja === null && (ja = []), Ao(ja, e, t);
  }
  function sn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function bu(e, t) {
    throw t.$$typeof === k ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Do(e) {
    function t(v, p) {
      if (e) {
        var S = v.deletions;
        S === null ? (v.deletions = [p], v.flags |= 16) : S.push(p);
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
    function u(v, p, S) {
      return v.index = S, e ? (S = v.alternate, S !== null ? (S = S.index, S < p ? (v.flags |= 67108866, p) : S) : (v.flags |= 67108866, p)) : (v.flags |= 1048576, p);
    }
    function r(v) {
      return e && v.alternate === null && (v.flags |= 67108866), v;
    }
    function d(v, p, S, M) {
      return p === null || p.tag !== 6 ? (p = lc(S, v.mode, M), p.return = v, p) : (p = n(p, S), p.return = v, p);
    }
    function m(v, p, S, M) {
      var V = S.type;
      return V === W ? A(
        v,
        p,
        S.props.children,
        M,
        S.key
      ) : p !== null && (p.elementType === V || typeof V == "object" && V !== null && V.$$typeof === be && Zl(V) === p.type) ? (p = n(p, S.props), sn(p, S), p.return = v, p) : (p = su(
        S.type,
        S.key,
        S.props,
        null,
        v.mode,
        M
      ), sn(p, S), p.return = v, p);
    }
    function N(v, p, S, M) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== S.containerInfo || p.stateNode.implementation !== S.implementation ? (p = ac(S, v.mode, M), p.return = v, p) : (p = n(p, S.children || []), p.return = v, p);
    }
    function A(v, p, S, M, V) {
      return p === null || p.tag !== 7 ? (p = Yl(
        S,
        v.mode,
        M,
        V
      ), p.return = v, p) : (p = n(p, S), p.return = v, p);
    }
    function O(v, p, S) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = lc(
          "" + p,
          v.mode,
          S
        ), p.return = v, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case $:
            return S = su(
              p.type,
              p.key,
              p.props,
              null,
              v.mode,
              S
            ), sn(S, p), S.return = v, S;
          case ue:
            return p = ac(
              p,
              v.mode,
              S
            ), p.return = v, p;
          case be:
            return p = Zl(p), O(v, p, S);
        }
        if (G(p) || se(p))
          return p = Yl(
            p,
            v.mode,
            S,
            null
          ), p.return = v, p;
        if (typeof p.then == "function")
          return O(v, gu(p), S);
        if (p.$$typeof === B)
          return O(
            v,
            du(v, p),
            S
          );
        bu(v, p);
      }
      return null;
    }
    function T(v, p, S, M) {
      var V = p !== null ? p.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return V !== null ? null : d(v, p, "" + S, M);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case $:
            return S.key === V ? m(v, p, S, M) : null;
          case ue:
            return S.key === V ? N(v, p, S, M) : null;
          case be:
            return S = Zl(S), T(v, p, S, M);
        }
        if (G(S) || se(S))
          return V !== null ? null : A(v, p, S, M, null);
        if (typeof S.then == "function")
          return T(
            v,
            p,
            gu(S),
            M
          );
        if (S.$$typeof === B)
          return T(
            v,
            p,
            du(v, S),
            M
          );
        bu(v, S);
      }
      return null;
    }
    function z(v, p, S, M, V) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return v = v.get(S) || null, d(p, v, "" + M, V);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case $:
            return v = v.get(
              M.key === null ? S : M.key
            ) || null, m(p, v, M, V);
          case ue:
            return v = v.get(
              M.key === null ? S : M.key
            ) || null, N(p, v, M, V);
          case be:
            return M = Zl(M), z(
              v,
              p,
              S,
              M,
              V
            );
        }
        if (G(M) || se(M))
          return v = v.get(S) || null, A(p, v, M, V, null);
        if (typeof M.then == "function")
          return z(
            v,
            p,
            S,
            gu(M),
            V
          );
        if (M.$$typeof === B)
          return z(
            v,
            p,
            S,
            du(p, M),
            V
          );
        bu(p, M);
      }
      return null;
    }
    function q(v, p, S, M) {
      for (var V = null, oe = null, Q = p, te = p = 0, ce = null; Q !== null && te < S.length; te++) {
        Q.index > te ? (ce = Q, Q = null) : ce = Q.sibling;
        var fe = T(
          v,
          Q,
          S[te],
          M
        );
        if (fe === null) {
          Q === null && (Q = ce);
          break;
        }
        e && Q && fe.alternate === null && t(v, Q), p = u(fe, p, te), oe === null ? V = fe : oe.sibling = fe, oe = fe, Q = ce;
      }
      if (te === S.length)
        return l(v, Q), re && Kt(v, te), V;
      if (Q === null) {
        for (; te < S.length; te++)
          Q = O(v, S[te], M), Q !== null && (p = u(
            Q,
            p,
            te
          ), oe === null ? V = Q : oe.sibling = Q, oe = Q);
        return re && Kt(v, te), V;
      }
      for (Q = a(Q); te < S.length; te++)
        ce = z(
          Q,
          v,
          te,
          S[te],
          M
        ), ce !== null && (e && ce.alternate !== null && Q.delete(
          ce.key === null ? te : ce.key
        ), p = u(
          ce,
          p,
          te
        ), oe === null ? V = ce : oe.sibling = ce, oe = ce);
      return e && Q.forEach(function(Ol) {
        return t(v, Ol);
      }), re && Kt(v, te), V;
    }
    function J(v, p, S, M) {
      if (S == null) throw Error(s(151));
      for (var V = null, oe = null, Q = p, te = p = 0, ce = null, fe = S.next(); Q !== null && !fe.done; te++, fe = S.next()) {
        Q.index > te ? (ce = Q, Q = null) : ce = Q.sibling;
        var Ol = T(v, Q, fe.value, M);
        if (Ol === null) {
          Q === null && (Q = ce);
          break;
        }
        e && Q && Ol.alternate === null && t(v, Q), p = u(Ol, p, te), oe === null ? V = Ol : oe.sibling = Ol, oe = Ol, Q = ce;
      }
      if (fe.done)
        return l(v, Q), re && Kt(v, te), V;
      if (Q === null) {
        for (; !fe.done; te++, fe = S.next())
          fe = O(v, fe.value, M), fe !== null && (p = u(fe, p, te), oe === null ? V = fe : oe.sibling = fe, oe = fe);
        return re && Kt(v, te), V;
      }
      for (Q = a(Q); !fe.done; te++, fe = S.next())
        fe = z(Q, v, te, fe.value, M), fe !== null && (e && fe.alternate !== null && Q.delete(fe.key === null ? te : fe.key), p = u(fe, p, te), oe === null ? V = fe : oe.sibling = fe, oe = fe);
      return e && Q.forEach(function(Bh) {
        return t(v, Bh);
      }), re && Kt(v, te), V;
    }
    function Se(v, p, S, M) {
      if (typeof S == "object" && S !== null && S.type === W && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case $:
            e: {
              for (var V = S.key; p !== null; ) {
                if (p.key === V) {
                  if (V = S.type, V === W) {
                    if (p.tag === 7) {
                      l(
                        v,
                        p.sibling
                      ), M = n(
                        p,
                        S.props.children
                      ), M.return = v, v = M;
                      break e;
                    }
                  } else if (p.elementType === V || typeof V == "object" && V !== null && V.$$typeof === be && Zl(V) === p.type) {
                    l(
                      v,
                      p.sibling
                    ), M = n(p, S.props), sn(M, S), M.return = v, v = M;
                    break e;
                  }
                  l(v, p);
                  break;
                } else t(v, p);
                p = p.sibling;
              }
              S.type === W ? (M = Yl(
                S.props.children,
                v.mode,
                M,
                S.key
              ), M.return = v, v = M) : (M = su(
                S.type,
                S.key,
                S.props,
                null,
                v.mode,
                M
              ), sn(M, S), M.return = v, v = M);
            }
            return r(v);
          case ue:
            e: {
              for (V = S.key; p !== null; ) {
                if (p.key === V)
                  if (p.tag === 4 && p.stateNode.containerInfo === S.containerInfo && p.stateNode.implementation === S.implementation) {
                    l(
                      v,
                      p.sibling
                    ), M = n(p, S.children || []), M.return = v, v = M;
                    break e;
                  } else {
                    l(v, p);
                    break;
                  }
                else t(v, p);
                p = p.sibling;
              }
              M = ac(S, v.mode, M), M.return = v, v = M;
            }
            return r(v);
          case be:
            return S = Zl(S), Se(
              v,
              p,
              S,
              M
            );
        }
        if (G(S))
          return q(
            v,
            p,
            S,
            M
          );
        if (se(S)) {
          if (V = se(S), typeof V != "function") throw Error(s(150));
          return S = V.call(S), J(
            v,
            p,
            S,
            M
          );
        }
        if (typeof S.then == "function")
          return Se(
            v,
            p,
            gu(S),
            M
          );
        if (S.$$typeof === B)
          return Se(
            v,
            p,
            du(v, S),
            M
          );
        bu(v, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, p !== null && p.tag === 6 ? (l(v, p.sibling), M = n(p, S), M.return = v, v = M) : (l(v, p), M = lc(S, v.mode, M), M.return = v, v = M), r(v)) : l(v, p);
    }
    return function(v, p, S, M) {
      try {
        rn = 0;
        var V = Se(
          v,
          p,
          S,
          M
        );
        return ja = null, V;
      } catch (Q) {
        if (Q === Sa || Q === hu) throw Q;
        var oe = pt(29, Q, null, v.mode);
        return oe.lanes = M, oe.return = v, oe;
      } finally {
      }
    };
  }
  var Jl = Do(!0), Ro = Do(!1), hl = !1;
  function pc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function gc(e, t) {
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
    if (a = a.shared, (de & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = ru(e), go(e, null, l), t;
    }
    return cu(e, a, t, l), ru(e);
  }
  function on(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Ns(e, l);
    }
  }
  function bc(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var r = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = r : u = u.next = r, l = l.next;
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
  var yc = !1;
  function fn() {
    if (yc) {
      var e = xa;
      if (e !== null) throw e;
    }
  }
  function dn(e, t, l, a) {
    yc = !1;
    var n = e.updateQueue;
    hl = !1;
    var u = n.firstBaseUpdate, r = n.lastBaseUpdate, d = n.shared.pending;
    if (d !== null) {
      n.shared.pending = null;
      var m = d, N = m.next;
      m.next = null, r === null ? u = N : r.next = N, r = m;
      var A = e.alternate;
      A !== null && (A = A.updateQueue, d = A.lastBaseUpdate, d !== r && (d === null ? A.firstBaseUpdate = N : d.next = N, A.lastBaseUpdate = m));
    }
    if (u !== null) {
      var O = n.baseState;
      r = 0, A = N = m = null, d = u;
      do {
        var T = d.lane & -536870913, z = T !== d.lane;
        if (z ? (ie & T) === T : (a & T) === T) {
          T !== 0 && T === va && (yc = !0), A !== null && (A = A.next = {
            lane: 0,
            tag: d.tag,
            payload: d.payload,
            callback: null,
            next: null
          });
          e: {
            var q = e, J = d;
            T = t;
            var Se = l;
            switch (J.tag) {
              case 1:
                if (q = J.payload, typeof q == "function") {
                  O = q.call(Se, O, T);
                  break e;
                }
                O = q;
                break e;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = J.payload, T = typeof q == "function" ? q.call(Se, O, T) : q, T == null) break e;
                O = C({}, O, T);
                break e;
              case 2:
                hl = !0;
            }
          }
          T = d.callback, T !== null && (e.flags |= 64, z && (e.flags |= 8192), z = n.callbacks, z === null ? n.callbacks = [T] : z.push(T));
        } else
          z = {
            lane: T,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, A === null ? (N = A = z, m = O) : A = A.next = z, r |= T;
        if (d = d.next, d === null) {
          if (d = n.shared.pending, d === null)
            break;
          z = d, d = z.next, z.next = null, n.lastBaseUpdate = z, n.shared.pending = null;
        }
      } while (!0);
      A === null && (m = O), n.baseState = m, n.firstBaseUpdate = N, n.lastBaseUpdate = A, u === null && (n.shared.lanes = 0), Sl |= r, e.lanes = r, e.memoizedState = O;
    }
  }
  function Uo(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function wo(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Uo(l[e], t);
  }
  var Na = g(null), yu = g(0);
  function ko(e, t) {
    e = nl, H(yu, e), H(Na, t), nl = e | t.baseLanes;
  }
  function vc() {
    H(yu, nl), H(Na, Na.current);
  }
  function xc() {
    nl = yu.current, R(Na), R(yu);
  }
  var gt = g(null), Ct = null;
  function bl(e) {
    var t = e.alternate;
    H(Re, Re.current & 1), H(gt, e), Ct === null && (t === null || Na.current !== null || t.memoizedState !== null) && (Ct = e);
  }
  function Sc(e) {
    H(Re, Re.current), H(gt, e), Ct === null && (Ct = e);
  }
  function Bo(e) {
    e.tag === 22 ? (H(Re, Re.current), H(gt, e), Ct === null && (Ct = e)) : yl();
  }
  function yl() {
    H(Re, Re.current), H(gt, gt.current);
  }
  function bt(e) {
    R(gt), Ct === e && (Ct = null), R(Re);
  }
  var Re = g(0);
  function vu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || zr(l) || Cr(l)))
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
  var Ft = 0, ee = null, ve = null, ke = null, xu = !1, Ta = !1, $l = !1, Su = 0, mn = 0, Ea = null, z1 = 0;
  function Me() {
    throw Error(s(321));
  }
  function jc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!ht(e[l], t[l])) return !1;
    return !0;
  }
  function Nc(e, t, l, a, n, u) {
    return Ft = u, ee = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, y.H = e === null || e.memoizedState === null ? Sf : Hc, $l = !1, u = l(a, n), $l = !1, Ta && (u = qo(
      t,
      l,
      a,
      n
    )), Ho(e), u;
  }
  function Ho(e) {
    y.H = gn;
    var t = ve !== null && ve.next !== null;
    if (Ft = 0, ke = ve = ee = null, xu = !1, mn = 0, Ea = null, t) throw Error(s(300));
    e === null || Be || (e = e.dependencies, e !== null && fu(e) && (Be = !0));
  }
  function qo(e, t, l, a) {
    ee = e;
    var n = 0;
    do {
      if (Ta && (Ea = null), mn = 0, Ta = !1, 25 <= n) throw Error(s(301));
      if (n += 1, ke = ve = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      y.H = jf, u = t(l, a);
    } while (Ta);
    return u;
  }
  function C1() {
    var e = y.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? hn(t) : t, e = e.useState()[0], (ve !== null ? ve.memoizedState : null) !== e && (ee.flags |= 1024), t;
  }
  function Tc() {
    var e = Su !== 0;
    return Su = 0, e;
  }
  function Ec(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function _c(e) {
    if (xu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      xu = !1;
    }
    Ft = 0, ke = ve = ee = null, Ta = !1, mn = Su = 0, Ea = null;
  }
  function Pe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ke === null ? ee.memoizedState = ke = e : ke = ke.next = e, ke;
  }
  function Ue() {
    if (ve === null) {
      var e = ee.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ve.next;
    var t = ke === null ? ee.memoizedState : ke.next;
    if (t !== null)
      ke = t, ve = e;
    else {
      if (e === null)
        throw ee.alternate === null ? Error(s(467)) : Error(s(310));
      ve = e, e = {
        memoizedState: ve.memoizedState,
        baseState: ve.baseState,
        baseQueue: ve.baseQueue,
        queue: ve.queue,
        next: null
      }, ke === null ? ee.memoizedState = ke = e : ke = ke.next = e;
    }
    return ke;
  }
  function ju() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function hn(e) {
    var t = mn;
    return mn += 1, Ea === null && (Ea = []), e = Ao(Ea, e, t), t = ee, (ke === null ? t.memoizedState : ke.next) === null && (t = t.alternate, y.H = t === null || t.memoizedState === null ? Sf : Hc), e;
  }
  function Nu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return hn(e);
      if (e.$$typeof === B) return Ze(e);
    }
    throw Error(s(438, String(e)));
  }
  function zc(e) {
    var t = null, l = ee.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = ee.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = ju(), ee.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = et;
    return t.index++, l;
  }
  function Wt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Tu(e) {
    var t = Ue();
    return Cc(t, ve, e);
  }
  function Cc(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var r = n.next;
        n.next = u.next, u.next = r;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = e.baseState, n === null) e.memoizedState = u;
    else {
      t = n.next;
      var d = r = null, m = null, N = t, A = !1;
      do {
        var O = N.lane & -536870913;
        if (O !== N.lane ? (ie & O) === O : (Ft & O) === O) {
          var T = N.revertLane;
          if (T === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), O === va && (A = !0);
          else if ((Ft & T) === T) {
            N = N.next, T === va && (A = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, m === null ? (d = m = O, r = u) : m = m.next = O, ee.lanes |= T, Sl |= T;
          O = N.action, $l && l(u, O), u = N.hasEagerState ? N.eagerState : l(u, O);
        } else
          T = {
            lane: O,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, m === null ? (d = m = T, r = u) : m = m.next = T, ee.lanes |= O, Sl |= O;
        N = N.next;
      } while (N !== null && N !== t);
      if (m === null ? r = u : m.next = d, !ht(u, e.memoizedState) && (Be = !0, A && (l = xa, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = r, e.baseQueue = m, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Ac(e) {
    var t = Ue(), l = t.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, n = l.pending, u = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var r = n = n.next;
      do
        u = e(u, r.action), r = r.next;
      while (r !== n);
      ht(u, t.memoizedState) || (Be = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Lo(e, t, l) {
    var a = ee, n = Ue(), u = re;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var r = !ht(
      (ve || n).memoizedState,
      l
    );
    if (r && (n.memoizedState = l, Be = !0), n = n.queue, Dc(Qo.bind(null, a, n, e), [
      e
    ]), n.getSnapshot !== t || r || ke !== null && ke.memoizedState.tag & 1) {
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
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = ee.updateQueue, t === null ? (t = ju(), ee.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
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
    t !== null && rt(t, e, 2);
  }
  function Mc(e) {
    var t = Pe();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), $l) {
        cl(!0);
        try {
          l();
        } finally {
          cl(!1);
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
    return e.baseState = l, Cc(
      e,
      ve,
      typeof a == "function" ? a : Wt
    );
  }
  function A1(e, t, l, a, n) {
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
        then: function(r) {
          u.listeners.push(r);
        }
      };
      y.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, Ko(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Ko(e, t) {
    var l = t.action, a = t.payload, n = e.state;
    if (t.isTransition) {
      var u = y.T, r = {};
      y.T = r;
      try {
        var d = l(n, a), m = y.S;
        m !== null && m(r, d), Jo(e, t, d);
      } catch (N) {
        Oc(e, t, N);
      } finally {
        u !== null && r.types !== null && (u.types = r.types), y.T = u;
      }
    } else
      try {
        u = l(n, a), Jo(e, t, u);
      } catch (N) {
        Oc(e, t, N);
      }
  }
  function Jo(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        $o(e, t, a);
      },
      function(a) {
        return Oc(e, t, a);
      }
    ) : $o(e, t, l);
  }
  function $o(e, t, l) {
    t.status = "fulfilled", t.value = l, Fo(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Ko(e, l)));
  }
  function Oc(e, t, l) {
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
    if (re) {
      var l = Ne.formState;
      if (l !== null) {
        e: {
          var a = ee;
          if (re) {
            if (_e) {
              t: {
                for (var n = _e, u = zt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = At(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                _e = At(
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
    return l = Pe(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wo,
      lastRenderedState: t
    }, l.queue = a, l = yf.bind(
      null,
      ee,
      a
    ), a.dispatch = l, a = Mc(!1), u = Bc.bind(
      null,
      ee,
      !1,
      a.queue
    ), a = Pe(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = n, l = A1.bind(
      null,
      ee,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function Po(e) {
    var t = Ue();
    return ef(t, ve, e);
  }
  function ef(e, t, l) {
    if (t = Cc(
      e,
      t,
      Wo
    )[0], e = Tu(Wt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = hn(t);
      } catch (r) {
        throw r === Sa ? hu : r;
      }
    else a = t;
    t = Ue();
    var n = t.queue, u = n.dispatch;
    return l !== t.memoizedState && (ee.flags |= 2048, _a(
      9,
      { destroy: void 0 },
      M1.bind(null, n, l),
      null
    )), [a, u, e];
  }
  function M1(e, t) {
    e.action = t;
  }
  function tf(e) {
    var t = Ue(), l = ve;
    if (l !== null)
      return ef(t, l, e);
    Ue(), t = t.memoizedState, l = Ue();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function _a(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = ee.updateQueue, t === null && (t = ju(), ee.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function lf() {
    return Ue().memoizedState;
  }
  function Eu(e, t, l, a) {
    var n = Pe();
    ee.flags |= e, n.memoizedState = _a(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function _u(e, t, l, a) {
    var n = Ue();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    ve !== null && a !== null && jc(a, ve.memoizedState.deps) ? n.memoizedState = _a(t, u, l, a) : (ee.flags |= e, n.memoizedState = _a(
      1 | t,
      u,
      l,
      a
    ));
  }
  function af(e, t) {
    Eu(8390656, 8, e, t);
  }
  function Dc(e, t) {
    _u(2048, 8, e, t);
  }
  function O1(e) {
    ee.flags |= 4;
    var t = ee.updateQueue;
    if (t === null)
      t = ju(), ee.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function nf(e) {
    var t = Ue().memoizedState;
    return O1({ ref: t, nextImpl: e }), function() {
      if ((de & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function uf(e, t) {
    return _u(4, 2, e, t);
  }
  function cf(e, t) {
    return _u(4, 4, e, t);
  }
  function rf(e, t) {
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
    l = l != null ? l.concat([e]) : null, _u(4, 4, rf.bind(null, t, e), l);
  }
  function Rc() {
  }
  function of(e, t) {
    var l = Ue();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && jc(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function ff(e, t) {
    var l = Ue();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && jc(t, a[1]))
      return a[0];
    if (a = e(), $l) {
      cl(!0);
      try {
        e();
      } finally {
        cl(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function Uc(e, t, l) {
    return l === void 0 || (Ft & 1073741824) !== 0 && (ie & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = dd(), ee.lanes |= e, Sl |= e, l);
  }
  function df(e, t, l, a) {
    return ht(l, t) ? l : Na.current !== null ? (e = Uc(e, l, a), ht(e, t) || (Be = !0), e) : (Ft & 42) === 0 || (Ft & 1073741824) !== 0 && (ie & 261930) === 0 ? (Be = !0, e.memoizedState = l) : (e = dd(), ee.lanes |= e, Sl |= e, t);
  }
  function mf(e, t, l, a, n) {
    var u = U.p;
    U.p = u !== 0 && 8 > u ? u : 8;
    var r = y.T, d = {};
    y.T = d, Bc(e, !1, t, l);
    try {
      var m = n(), N = y.S;
      if (N !== null && N(d, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var A = _1(
          m,
          a
        );
        pn(
          e,
          t,
          A,
          xt(e)
        );
      } else
        pn(
          e,
          t,
          a,
          xt(e)
        );
    } catch (O) {
      pn(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        xt()
      );
    } finally {
      U.p = u, r !== null && d.types !== null && (r.types = d.types), y.T = r;
    }
  }
  function D1() {
  }
  function wc(e, t, l, a) {
    if (e.tag !== 5) throw Error(s(476));
    var n = hf(e).queue;
    mf(
      e,
      n,
      t,
      K,
      l === null ? D1 : function() {
        return pf(e), l(a);
      }
    );
  }
  function hf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wt,
        lastRenderedState: K
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
      xt()
    );
  }
  function kc() {
    return Ze(Dn);
  }
  function gf() {
    return Ue().memoizedState;
  }
  function bf() {
    return Ue().memoizedState;
  }
  function R1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = xt();
          e = pl(l);
          var a = gl(t, e, l);
          a !== null && (rt(a, t, l), on(a, t, l)), t = { cache: fc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function U1(e, t, l) {
    var a = xt();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, zu(e) ? vf(t, l) : (l = ec(e, t, l, a), l !== null && (rt(l, e, a), xf(l, t, a)));
  }
  function yf(e, t, l) {
    var a = xt();
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
    if (zu(e)) vf(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var r = t.lastRenderedState, d = u(r, l);
          if (n.hasEagerState = !0, n.eagerState = d, ht(d, r))
            return cu(e, t, n, 0), Ne === null && iu(), !1;
        } catch {
        } finally {
        }
      if (l = ec(e, t, n, a), l !== null)
        return rt(l, e, a), xf(l, t, a), !0;
    }
    return !1;
  }
  function Bc(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: pr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, zu(e)) {
      if (t) throw Error(s(479));
    } else
      t = ec(
        e,
        l,
        a,
        2
      ), t !== null && rt(t, e, 2);
  }
  function zu(e) {
    var t = e.alternate;
    return e === ee || t !== null && t === ee;
  }
  function vf(e, t) {
    Ta = xu = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function xf(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Ns(e, l);
    }
  }
  var gn = {
    readContext: Ze,
    use: Nu,
    useCallback: Me,
    useContext: Me,
    useEffect: Me,
    useImperativeHandle: Me,
    useLayoutEffect: Me,
    useInsertionEffect: Me,
    useMemo: Me,
    useReducer: Me,
    useRef: Me,
    useState: Me,
    useDebugValue: Me,
    useDeferredValue: Me,
    useTransition: Me,
    useSyncExternalStore: Me,
    useId: Me,
    useHostTransitionStatus: Me,
    useFormState: Me,
    useActionState: Me,
    useOptimistic: Me,
    useMemoCache: Me,
    useCacheRefresh: Me
  };
  gn.useEffectEvent = Me;
  var Sf = {
    readContext: Ze,
    use: Nu,
    useCallback: function(e, t) {
      return Pe().memoizedState = [
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
        rf.bind(null, t, e),
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
      var l = Pe();
      t = t === void 0 ? null : t;
      var a = e();
      if ($l) {
        cl(!0);
        try {
          e();
        } finally {
          cl(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = Pe();
      if (l !== void 0) {
        var n = l(t);
        if ($l) {
          cl(!0);
          try {
            l(t);
          } finally {
            cl(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, a.queue = e, e = e.dispatch = U1.bind(
        null,
        ee,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = Pe();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Mc(e);
      var t = e.queue, l = yf.bind(null, ee, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var l = Pe();
      return Uc(l, e, t);
    },
    useTransition: function() {
      var e = Mc(!1);
      return e = mf.bind(
        null,
        ee,
        e.queue,
        !0,
        !1
      ), Pe().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = ee, n = Pe();
      if (re) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = t(), Ne === null)
          throw Error(s(349));
        (ie & 127) !== 0 || Yo(a, t, l);
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
      var e = Pe(), t = Ne.identifierPrefix;
      if (re) {
        var l = Bt, a = kt;
        l = (a & ~(1 << 32 - mt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Su++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = z1++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: kc,
    useFormState: Io,
    useActionState: Io,
    useOptimistic: function(e) {
      var t = Pe();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Bc.bind(
        null,
        ee,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: zc,
    useCacheRefresh: function() {
      return Pe().memoizedState = R1.bind(
        null,
        ee
      );
    },
    useEffectEvent: function(e) {
      var t = Pe(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((de & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Hc = {
    readContext: Ze,
    use: Nu,
    useCallback: of,
    useContext: Ze,
    useEffect: Dc,
    useImperativeHandle: sf,
    useInsertionEffect: uf,
    useLayoutEffect: cf,
    useMemo: ff,
    useReducer: Tu,
    useRef: lf,
    useState: function() {
      return Tu(Wt);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var l = Ue();
      return df(
        l,
        ve.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Tu(Wt)[0], t = Ue().memoizedState;
      return [
        typeof e == "boolean" ? e : hn(e),
        t
      ];
    },
    useSyncExternalStore: Lo,
    useId: gf,
    useHostTransitionStatus: kc,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(e, t) {
      var l = Ue();
      return Zo(l, ve, e, t);
    },
    useMemoCache: zc,
    useCacheRefresh: bf
  };
  Hc.useEffectEvent = nf;
  var jf = {
    readContext: Ze,
    use: Nu,
    useCallback: of,
    useContext: Ze,
    useEffect: Dc,
    useImperativeHandle: sf,
    useInsertionEffect: uf,
    useLayoutEffect: cf,
    useMemo: ff,
    useReducer: Ac,
    useRef: lf,
    useState: function() {
      return Ac(Wt);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var l = Ue();
      return ve === null ? Uc(l, e, t) : df(
        l,
        ve.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ac(Wt)[0], t = Ue().memoizedState;
      return [
        typeof e == "boolean" ? e : hn(e),
        t
      ];
    },
    useSyncExternalStore: Lo,
    useId: gf,
    useHostTransitionStatus: kc,
    useFormState: tf,
    useActionState: tf,
    useOptimistic: function(e, t) {
      var l = Ue();
      return ve !== null ? Zo(l, ve, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: zc,
    useCacheRefresh: bf
  };
  jf.useEffectEvent = nf;
  function qc(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : C({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Lc = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = xt(), n = pl(a);
      n.payload = t, l != null && (n.callback = l), t = gl(e, n, a), t !== null && (rt(t, e, a), on(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = xt(), n = pl(a);
      n.tag = 1, n.payload = t, l != null && (n.callback = l), t = gl(e, n, a), t !== null && (rt(t, e, a), on(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = xt(), a = pl(l);
      a.tag = 2, t != null && (a.callback = t), t = gl(e, a, l), t !== null && (rt(t, e, l), on(t, e, l));
    }
  };
  function Nf(e, t, l, a, n, u, r) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, r) : t.prototype && t.prototype.isPureReactComponent ? !tn(l, a) || !tn(n, u) : !0;
  }
  function Tf(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && Lc.enqueueReplaceState(t, t.state, null);
  }
  function Fl(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = C({}, l));
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
  function Cu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Cf(e, t, l) {
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
  function Yc(e, t, l) {
    return l = pl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Cu(e, t);
    }, l;
  }
  function Af(e) {
    return e = pl(e), e.tag = 3, e;
  }
  function Mf(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Cf(t, l, a);
      };
    }
    var r = l.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (e.callback = function() {
      Cf(t, l, a), typeof n != "function" && (jl === null ? jl = /* @__PURE__ */ new Set([this]) : jl.add(this));
      var d = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: d !== null ? d : ""
      });
    });
  }
  function w1(e, t, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && ya(
        t,
        l,
        n,
        !0
      ), l = gt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Ct === null ? Lu() : l.alternate === null && Oe === 0 && (Oe = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === pu ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), dr(e, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === pu ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), dr(e, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return dr(e, a, n), Lu(), !1;
    }
    if (re)
      return t = gt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== ic && (e = Error(s(422), { cause: a }), nn(Tt(e, l)))) : (a !== ic && (t = Error(s(423), {
        cause: a
      }), nn(
        Tt(t, l)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Tt(a, l), n = Yc(
        e.stateNode,
        a,
        n
      ), bc(e, n), Oe !== 4 && (Oe = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Tt(u, l), Tn === null ? Tn = [u] : Tn.push(u), Oe !== 4 && (Oe = 2), t === null) return !0;
    a = Tt(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = n & -n, l.lanes |= e, e = Yc(l.stateNode, a, e), bc(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (jl === null || !jl.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Af(n), Mf(
              n,
              e,
              l,
              a
            ), bc(l, n), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Gc = Error(s(461)), Be = !1;
  function Ke(e, t, l, a) {
    t.child = e === null ? Ro(t, null, l, a) : Jl(
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
      var r = {};
      for (var d in a)
        d !== "ref" && (r[d] = a[d]);
    } else r = a;
    return Xl(t), a = Nc(
      e,
      t,
      l,
      r,
      u,
      n
    ), d = Tc(), e !== null && !Be ? (Ec(e, t, n), It(e, t, n)) : (re && d && nc(t), t.flags |= 1, Ke(e, t, a, n), t.child);
  }
  function Df(e, t, l, a, n) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !tc(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Rf(
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
    if (u = e.child, !Fc(e, n)) {
      var r = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : tn, l(r, a) && e.ref === t.ref)
        return It(e, t, n);
    }
    return t.flags |= 1, e = Zt(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Rf(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (tn(u, a) && e.ref === t.ref)
        if (Be = !1, t.pendingProps = a = u, Fc(e, n))
          (e.flags & 131072) !== 0 && (Be = !0);
        else
          return t.lanes = e.lanes, It(e, t, n);
    }
    return Qc(
      e,
      t,
      l,
      a,
      n
    );
  }
  function Uf(e, t, l, a) {
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
        ), u !== null ? ko(t, u) : vc(), Bo(t);
      else
        return a = t.lanes = 536870912, wf(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (mu(t, u.cachePool), ko(t, u), yl(), t.memoizedState = null) : (e !== null && mu(t, null), vc(), yl());
    return Ke(e, t, n, l), t.child;
  }
  function bn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function wf(e, t, l, a, n) {
    var u = mc();
    return u = u === null ? null : { parent: we._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && mu(t, null), vc(), Bo(t), e !== null && ya(e, t, a, !0), t.childLanes = n, null;
  }
  function Au(e, t) {
    return t = Ou(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function kf(e, t, l) {
    return Jl(t, e.child, null, l), e = Au(t, t.pendingProps), e.flags |= 2, bt(t), t.memoizedState = null, e;
  }
  function k1(e, t, l) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (re) {
        if (a.mode === "hidden")
          return e = Au(t, a), t.lanes = 536870912, bn(null, e);
        if (Sc(t), (e = _e) ? (e = Jd(
          e,
          zt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ol !== null ? { id: kt, overflow: Bt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = yo(e), l.return = t, t.child = l, Ve = t, _e = null)) : e = null, e === null) throw dl(t);
        return t.lanes = 536870912, null;
      }
      return Au(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var r = u.dehydrated;
      if (Sc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = kf(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Be || ya(e, t, l, !1), n = (l & e.childLanes) !== 0, Be || n) {
        if (a = Ne, a !== null && (r = Ts(a, l), r !== 0 && r !== u.retryLane))
          throw u.retryLane = r, Ll(e, r), rt(a, e, r), Gc;
        Lu(), t = kf(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, _e = At(r.nextSibling), Ve = t, re = !0, fl = null, zt = !1, e !== null && So(t, e), t = Au(t, a), t.flags |= 4096;
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
  function Qc(e, t, l, a, n) {
    return Xl(t), l = Nc(
      e,
      t,
      l,
      a,
      void 0,
      n
    ), a = Tc(), e !== null && !Be ? (Ec(e, t, n), It(e, t, n)) : (re && a && nc(t), t.flags |= 1, Ke(e, t, l, n), t.child);
  }
  function Bf(e, t, l, a, n, u) {
    return Xl(t), t.updateQueue = null, l = qo(
      t,
      a,
      l,
      n
    ), Ho(e), a = Tc(), e !== null && !Be ? (Ec(e, t, u), It(e, t, u)) : (re && a && nc(t), t.flags |= 1, Ke(e, t, l, u), t.child);
  }
  function Hf(e, t, l, a, n) {
    if (Xl(t), t.stateNode === null) {
      var u = ha, r = l.contextType;
      typeof r == "object" && r !== null && (u = Ze(r)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Lc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, pc(t), r = l.contextType, u.context = typeof r == "object" && r !== null ? Ze(r) : ha, u.state = t.memoizedState, r = l.getDerivedStateFromProps, typeof r == "function" && (qc(
        t,
        l,
        r,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (r = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), r !== u.state && Lc.enqueueReplaceState(u, u.state, null), dn(t, a, u, n), fn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var d = t.memoizedProps, m = Fl(l, d);
      u.props = m;
      var N = u.context, A = l.contextType;
      r = ha, typeof A == "object" && A !== null && (r = Ze(A));
      var O = l.getDerivedStateFromProps;
      A = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, A || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (d || N !== r) && Tf(
        t,
        u,
        a,
        r
      ), hl = !1;
      var T = t.memoizedState;
      u.state = T, dn(t, a, u, n), fn(), N = t.memoizedState, d || T !== N || hl ? (typeof O == "function" && (qc(
        t,
        l,
        O,
        a
      ), N = t.memoizedState), (m = hl || Nf(
        t,
        l,
        m,
        a,
        T,
        N,
        r
      )) ? (A || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = N), u.props = a, u.state = N, u.context = r, a = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, gc(e, t), r = t.memoizedProps, A = Fl(l, r), u.props = A, O = t.pendingProps, T = u.context, N = l.contextType, m = ha, typeof N == "object" && N !== null && (m = Ze(N)), d = l.getDerivedStateFromProps, (N = typeof d == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r !== O || T !== m) && Tf(
        t,
        u,
        a,
        m
      ), hl = !1, T = t.memoizedState, u.state = T, dn(t, a, u, n), fn();
      var z = t.memoizedState;
      r !== O || T !== z || hl || e !== null && e.dependencies !== null && fu(e.dependencies) ? (typeof d == "function" && (qc(
        t,
        l,
        d,
        a
      ), z = t.memoizedState), (A = hl || Nf(
        t,
        l,
        A,
        a,
        T,
        z,
        m
      ) || e !== null && e.dependencies !== null && fu(e.dependencies)) ? (N || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, z, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        z,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || r === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = z), u.props = a, u.state = z, u.context = m, a = A) : (typeof u.componentDidUpdate != "function" || r === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), a = !1);
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
  var Xc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Vc(e) {
    return { baseLanes: e, cachePool: zo() };
  }
  function Zc(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= vt), e;
  }
  function Lf(e, t, l) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, r;
    if ((r = u) || (r = e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0), r && (n = !0, t.flags &= -129), r = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (re) {
        if (n ? bl(t) : yl(), (e = _e) ? (e = Jd(
          e,
          zt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ol !== null ? { id: kt, overflow: Bt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = yo(e), l.return = t, t.child = l, Ve = t, _e = null)) : e = null, e === null) throw dl(t);
        return Cr(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var d = a.children;
      return a = a.fallback, n ? (yl(), n = t.mode, d = Ou(
        { mode: "hidden", children: d },
        n
      ), a = Yl(
        a,
        n,
        l,
        null
      ), d.return = t, a.return = t, d.sibling = a, t.child = d, a = t.child, a.memoizedState = Vc(l), a.childLanes = Zc(
        e,
        r,
        l
      ), t.memoizedState = Xc, bn(null, a)) : (bl(t), Kc(t, d));
    }
    var m = e.memoizedState;
    if (m !== null && (d = m.dehydrated, d !== null)) {
      if (u)
        t.flags & 256 ? (bl(t), t.flags &= -257, t = Jc(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (yl(), t.child = e.child, t.flags |= 128, t = null) : (yl(), d = a.fallback, n = t.mode, a = Ou(
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
        ), a = t.child, a.memoizedState = Vc(l), a.childLanes = Zc(
          e,
          r,
          l
        ), t.memoizedState = Xc, t = bn(null, a));
      else if (bl(t), Cr(d)) {
        if (r = d.nextSibling && d.nextSibling.dataset, r) var N = r.dgst;
        r = N, a = Error(s(419)), a.stack = "", a.digest = r, nn({ value: a, source: null, stack: null }), t = Jc(
          e,
          t,
          l
        );
      } else if (Be || ya(e, t, l, !1), r = (l & e.childLanes) !== 0, Be || r) {
        if (r = Ne, r !== null && (a = Ts(r, l), a !== 0 && a !== m.retryLane))
          throw m.retryLane = a, Ll(e, a), rt(r, e, a), Gc;
        zr(d) || Lu(), t = Jc(
          e,
          t,
          l
        );
      } else
        zr(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = m.treeContext, _e = At(
          d.nextSibling
        ), Ve = t, re = !0, fl = null, zt = !1, e !== null && So(t, e), t = Kc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (yl(), d = a.fallback, n = t.mode, m = e.child, N = m.sibling, a = Zt(m, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = m.subtreeFlags & 65011712, N !== null ? d = Zt(
      N,
      d
    ) : (d = Yl(
      d,
      n,
      l,
      null
    ), d.flags |= 2), d.return = t, a.return = t, a.sibling = d, t.child = a, bn(null, a), a = t.child, d = e.child.memoizedState, d === null ? d = Vc(l) : (n = d.cachePool, n !== null ? (m = we._currentValue, n = n.parent !== m ? { parent: m, pool: m } : n) : n = zo(), d = {
      baseLanes: d.baseLanes | l,
      cachePool: n
    }), a.memoizedState = d, a.childLanes = Zc(
      e,
      r,
      l
    ), t.memoizedState = Xc, bn(e.child, a)) : (bl(t), l = e.child, e = l.sibling, l = Zt(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Kc(e, t) {
    return t = Ou(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ou(e, t) {
    return e = pt(22, e, null, t), e.lanes = 0, e;
  }
  function Jc(e, t, l) {
    return Jl(t, e.child, null, l), e = Kc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Yf(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), sc(e.return, t, l);
  }
  function $c(e, t, l, a, n, u) {
    var r = e.memoizedState;
    r === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = a, r.tail = l, r.tailMode = n, r.treeForkCount = u);
  }
  function Gf(e, t, l) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var r = Re.current, d = (r & 2) !== 0;
    if (d ? (r = r & 1 | 2, t.flags |= 128) : r &= 1, H(Re, r), Ke(e, t, a, l), a = re ? an : 0, !d && e !== null && (e.flags & 128) !== 0)
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
          e = l.alternate, e !== null && vu(e) === null && (n = l), l = l.sibling;
        l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), $c(
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
          if (e = n.alternate, e !== null && vu(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = l, l = n, n = e;
        }
        $c(
          t,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        $c(
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
        if (ya(
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
  function Fc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fu(e)));
  }
  function B1(e, t, l) {
    switch (t.tag) {
      case 3:
        Ie(t, t.stateNode.containerInfo), ml(t, we, e.memoizedState.cache), Gl();
        break;
      case 27:
      case 5:
        Ga(t);
        break;
      case 4:
        Ie(t, t.stateNode.containerInfo);
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
          return t.flags |= 128, Sc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (bl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Lf(e, t, l) : (bl(t), e = It(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        bl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (ya(
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
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), H(Re, Re.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Uf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        ml(t, we, e.memoizedState.cache);
    }
    return It(e, t, l);
  }
  function Qf(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Be = !0;
      else {
        if (!Fc(e, l) && (t.flags & 128) === 0)
          return Be = !1, B1(
            e,
            t,
            l
          );
        Be = (e.flags & 131072) !== 0;
      }
    else
      Be = !1, re && (t.flags & 1048576) !== 0 && xo(t, an, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = Zl(t.elementType), t.type = e, typeof e == "function")
            tc(e) ? (a = Fl(e, a), t.tag = 1, t = Hf(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = Qc(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === me) {
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
            throw t = Dt(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Qc(
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
          if (Ie(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, gc(e, t), dn(t, a, null, l);
          var r = t.memoizedState;
          if (a = r.cache, ml(t, we, a), a !== u.cache && oc(
            t,
            [we],
            l,
            !0
          ), fn(), a = r.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: r.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = qf(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== n) {
              n = Tt(
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
              for (_e = At(e.firstChild), Ve = t, re = !0, fl = null, zt = !0, l = Ro(
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
        )) ? t.memoizedState = l : re || (l = t.type, e = t.pendingProps, a = Ku(
          le.current
        ).createElement(l), a[Xe] = t, a[lt] = e, Je(a, l, e), Ye(a), t.stateNode = a) : t.memoizedState = em(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ga(t), e === null && re && (a = t.stateNode = Wd(
          t.type,
          t.pendingProps,
          le.current
        ), Ve = t, zt = !0, n = _e, _l(t.type) ? (Ar = n, _e = At(a.firstChild)) : _e = n), Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), Mu(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && re && ((n = a = _e) && (a = mh(
          a,
          t.type,
          t.pendingProps,
          zt
        ), a !== null ? (t.stateNode = a, Ve = t, _e = At(a.firstChild), zt = !1, n = !0) : n = !1), n || dl(t)), Ga(t), n = t.type, u = t.pendingProps, r = e !== null ? e.memoizedProps : null, a = u.children, Tr(n, u) ? a = null : r !== null && Tr(n, r) && (t.flags |= 32), t.memoizedState !== null && (n = Nc(
          e,
          t,
          C1,
          null,
          null,
          l
        ), Dn._currentValue = n), Mu(e, t), Ke(e, t, a, l), t.child;
      case 6:
        return e === null && re && ((e = l = _e) && (l = hh(
          l,
          t.pendingProps,
          zt
        ), l !== null ? (t.stateNode = l, Ve = t, _e = null, e = !0) : e = !1), e || dl(t)), null;
      case 13:
        return Lf(e, t, l);
      case 4:
        return Ie(
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
        return Rf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Gf(e, t, l);
      case 31:
        return k1(e, t, l);
      case 22:
        return Uf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Xl(t), a = Ze(we), e === null ? (n = mc(), n === null && (n = Ne, u = fc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), t.memoizedState = { parent: a, cache: n }, pc(t), ml(t, we, n)) : ((e.lanes & l) !== 0 && (gc(e, t), dn(t, null, null, l), fn()), n = e.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ml(t, we, a)) : (a = u.cache, ml(t, we, a), a !== n.cache && oc(
          t,
          [we],
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
  function Wc(e, t, l, a, n) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (gd()) e.flags |= 8192;
        else
          throw Kl = pu, hc;
    } else e.flags &= -16777217;
  }
  function Xf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !um(t))
      if (gd()) e.flags |= 8192;
      else
        throw Kl = pu, hc;
  }
  function Du(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ss() : 536870912, e.lanes |= t, Ma |= t);
  }
  function yn(e, t) {
    if (!re)
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
  function H1(e, t, l) {
    var a = t.pendingProps;
    switch (uc(t), t.tag) {
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
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), $t(we), De(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (ba(t) ? Pt(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, cc())), ze(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Pt(t), u !== null ? (ze(t), Xf(t, u)) : (ze(t), Wc(
          t,
          n,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (Pt(t), ze(t), Xf(t, u)) : (ze(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Pt(t), ze(t), Wc(
          t,
          n,
          e,
          a,
          l
        )), null;
      case 27:
        if (Qn(t), l = le.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Pt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return ze(t), null;
          }
          e = Y.current, ba(t) ? jo(t) : (e = Wd(n, a, l), t.stateNode = e, Pt(t));
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
          if (u = Y.current, ba(t))
            jo(t);
          else {
            var r = Ku(
              le.current
            );
            switch (u) {
              case 1:
                u = r.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = r.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = r.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = r.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? r.createElement("select", {
                      is: a.is
                    }) : r.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? r.createElement(n, { is: a.is }) : r.createElement(n);
                }
            }
            u[Xe] = t, u[lt] = a;
            e: for (r = t.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                u.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === t) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === t)
                  break e;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
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
        return ze(t), Wc(
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
          if (e = le.current, ba(t)) {
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
          if (a = ba(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[Xe] = t;
            } else
              Gl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ze(t), e = !1;
          } else
            l = cc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (bt(t), t) : (bt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return ze(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = ba(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(s(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Xe] = t;
            } else
              Gl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ze(t), n = !1;
          } else
            n = cc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (bt(t), t) : (bt(t), null);
        }
        return bt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Du(t, t.updateQueue), ze(t), null);
      case 4:
        return De(), e === null && vr(t.stateNode.containerInfo), ze(t), null;
      case 10:
        return $t(t.type), ze(t), null;
      case 19:
        if (R(Re), a = t.memoizedState, a === null) return ze(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) yn(a, !1);
          else {
            if (Oe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = vu(e), u !== null) {
                  for (t.flags |= 128, yn(a, !1), e = u.updateQueue, t.updateQueue = e, Du(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    bo(l, e), l = l.sibling;
                  return H(
                    Re,
                    Re.current & 1 | 2
                  ), re && Kt(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && ft() > Bu && (t.flags |= 128, n = !0, yn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = vu(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Du(t, e), yn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !re)
                return ze(t), null;
            } else
              2 * ft() - a.renderingStartTime > Bu && l !== 536870912 && (t.flags |= 128, n = !0, yn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = ft(), e.sibling = null, l = Re.current, H(
          Re,
          n ? l & 1 | 2 : l & 1
        ), re && Kt(t, a.treeForkCount), e) : (ze(t), null);
      case 22:
      case 23:
        return bt(t), xc(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (ze(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ze(t), l = t.updateQueue, l !== null && Du(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && R(Vl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), $t(we), ze(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function q1(e, t) {
    switch (uc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return $t(we), De(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Qn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (bt(t), t.alternate === null)
            throw Error(s(340));
          Gl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (bt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          Gl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return R(Re), null;
      case 4:
        return De(), null;
      case 10:
        return $t(t.type), null;
      case 22:
      case 23:
        return bt(t), xc(), e !== null && R(Vl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return $t(we), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vf(e, t) {
    switch (uc(t), t.tag) {
      case 3:
        $t(we), De();
        break;
      case 26:
      case 27:
      case 5:
        Qn(t);
        break;
      case 4:
        De();
        break;
      case 31:
        t.memoizedState !== null && bt(t);
        break;
      case 13:
        bt(t);
        break;
      case 19:
        R(Re);
        break;
      case 10:
        $t(t.type);
        break;
      case 22:
      case 23:
        bt(t), xc(), e !== null && R(Vl);
        break;
      case 24:
        $t(we);
    }
  }
  function vn(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create, r = l.inst;
            a = u(), r.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (d) {
      ge(t, t.return, d);
    }
  }
  function vl(e, t, l) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var r = a.inst, d = r.destroy;
            if (d !== void 0) {
              r.destroy = void 0, n = t;
              var m = l, N = d;
              try {
                N();
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
  function xn(e, t) {
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
  function Ht(e, t) {
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
  function Ic(e, t, l) {
    try {
      var a = e.stateNode;
      ch(a, e.type, l, t), a[lt] = t;
    } catch (n) {
      ge(e, e.return, n);
    }
  }
  function $f(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && _l(e.type) || e.tag === 4;
  }
  function Pc(e) {
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
  function er(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Xt));
    else if (a !== 4 && (a === 27 && _l(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (er(e, t, l), e = e.sibling; e !== null; )
        er(e, t, l), e = e.sibling;
  }
  function Ru(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && _l(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Ru(e, t, l), e = e.sibling; e !== null; )
        Ru(e, t, l), e = e.sibling;
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
  var el = !1, He = !1, tr = !1, Wf = typeof WeakSet == "function" ? WeakSet : Set, Ge = null;
  function L1(e, t) {
    if (e = e.containerInfo, jr = ei, e = co(e), Ji(e)) {
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
            var r = 0, d = -1, m = -1, N = 0, A = 0, O = e, T = null;
            t: for (; ; ) {
              for (var z; O !== l || n !== 0 && O.nodeType !== 3 || (d = r + n), O !== u || a !== 0 && O.nodeType !== 3 || (m = r + a), O.nodeType === 3 && (r += O.nodeValue.length), (z = O.firstChild) !== null; )
                T = O, O = z;
              for (; ; ) {
                if (O === e) break t;
                if (T === l && ++N === n && (d = r), T === u && ++A === a && (m = r), (z = O.nextSibling) !== null) break;
                O = T, T = O.parentNode;
              }
              O = z;
            }
            l = d === -1 || m === -1 ? null : { start: d, end: m };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Nr = { focusedElem: e, selectionRange: l }, ei = !1, Ge = t; Ge !== null; )
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
                } catch (J) {
                  ge(
                    l,
                    l.return,
                    J
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  _r(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _r(e);
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
        ll(e, l), a & 4 && vn(5, l);
        break;
      case 1:
        if (ll(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (r) {
              ge(l, l.return, r);
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
            } catch (r) {
              ge(
                l,
                l.return,
                r
              );
            }
          }
        a & 64 && Zf(l), a & 512 && xn(l, l.return);
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
          } catch (r) {
            ge(l, l.return, r);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Ff(l);
      case 26:
      case 5:
        ll(e, l), t === null && a & 4 && Jf(l), a & 512 && xn(l, l.return);
        break;
      case 12:
        ll(e, l);
        break;
      case 31:
        ll(e, l), a & 4 && td(e, l);
        break;
      case 13:
        ll(e, l), a & 4 && ld(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = $1.bind(
          null,
          l
        ), ph(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || el, !a) {
          t = t !== null && t.memoizedState !== null || He, n = el;
          var u = He;
          el = a, (He = t) && !u ? al(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : ll(e, l), el = n, He = u;
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
        He || Ht(l, t), tl(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        He || Ht(l, t);
        var a = Ae, n = nt;
        _l(l.type) && (Ae = l.stateNode, nt = !1), tl(
          e,
          t,
          l
        ), An(l.stateNode), Ae = a, nt = n;
        break;
      case 5:
        He || Ht(l, t);
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
        vl(2, l, t), He || vl(4, l, t), tl(
          e,
          t,
          l
        );
        break;
      case 1:
        He || (Ht(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Kf(
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
        He = (a = He) || l.memoizedState !== null, tl(
          e,
          t,
          l
        ), He = a;
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
  function Y1(e) {
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
  function Uu(e, t) {
    var l = Y1(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = F1.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function ut(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a], u = e, r = t, d = r;
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
        ed(u, r, n), Ae = null, nt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ad(t, e), t = t.sibling;
  }
  var Ut = null;
  function ad(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ut(t, e), it(e), a & 4 && (vl(3, e, e.return), vn(3, e), vl(5, e, e.return));
        break;
      case 1:
        ut(t, e), it(e), a & 512 && (He || l === null || Ht(l, l.return)), a & 64 && el && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var n = Ut;
        if (ut(t, e), it(e), a & 512 && (He || l === null || Ht(l, l.return)), a & 4) {
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
                      var r = am(
                        "link",
                        "href",
                        n
                      ).get(a + (l.href || ""));
                      if (r) {
                        for (var d = 0; d < r.length; d++)
                          if (u = r[d], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            r.splice(d, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), Je(u, a, l), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (r = am(
                        "meta",
                        "content",
                        n
                      ).get(a + (l.content || ""))) {
                        for (d = 0; d < r.length; d++)
                          if (u = r[d], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            r.splice(d, 1);
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
            )) : a === null && e.stateNode !== null && Ic(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ut(t, e), it(e), a & 512 && (He || l === null || Ht(l, l.return)), l !== null && a & 4 && Ic(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ut(t, e), it(e), a & 512 && (He || l === null || Ht(l, l.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            ca(n, "");
          } catch (q) {
            ge(e, e.return, q);
          }
        }
        a & 4 && e.stateNode != null && (n = e.memoizedProps, Ic(
          e,
          n,
          l !== null ? l.memoizedProps : n
        )), a & 1024 && (tr = !0);
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
        if (Fu = null, n = Ut, Ut = Ju(t.containerInfo), ut(t, e), Ut = n, it(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ha(t.containerInfo);
          } catch (q) {
            ge(e, e.return, q);
          }
        tr && (tr = !1, nd(e));
        break;
      case 4:
        a = Ut, Ut = Ju(
          e.stateNode.containerInfo
        ), ut(t, e), it(e), Ut = a;
        break;
      case 12:
        ut(t, e), it(e);
        break;
      case 31:
        ut(t, e), it(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Uu(e, a)));
        break;
      case 13:
        ut(t, e), it(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ku = ft()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Uu(e, a)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var m = l !== null && l.memoizedState !== null, N = el, A = He;
        if (el = N || n, He = A || m, ut(t, e), He = A, el = N, it(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || m || el || He || Wl(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                m = l = t;
                try {
                  if (u = m.stateNode, n)
                    r = u.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                  else {
                    d = m.stateNode;
                    var O = m.memoizedProps.style, T = O != null && O.hasOwnProperty("display") ? O.display : null;
                    d.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
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
                  var z = m.stateNode;
                  n ? Kd(z, !0) : Kd(m.stateNode, !1);
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
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Uu(e, l))));
        break;
      case 19:
        ut(t, e), it(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Uu(e, a)));
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
            var n = l.stateNode, u = Pc(e);
            Ru(e, u, n);
            break;
          case 5:
            var r = l.stateNode;
            l.flags & 32 && (ca(r, ""), l.flags &= -33);
            var d = Pc(e);
            Ru(e, d, r);
            break;
          case 3:
          case 4:
            var m = l.stateNode.containerInfo, N = Pc(e);
            er(
              e,
              N,
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
          vl(4, t, t.return), Wl(t);
          break;
        case 1:
          Ht(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Kf(
            t,
            t.return,
            l
          ), Wl(t);
          break;
        case 27:
          An(t.stateNode);
        case 26:
        case 5:
          Ht(t, t.return), Wl(t);
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
      var a = t.alternate, n = e, u = t, r = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          al(
            n,
            u,
            l
          ), vn(4, u);
          break;
        case 1:
          if (al(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (N) {
              ge(a, a.return, N);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var d = a.stateNode;
            try {
              var m = n.shared.hiddenCallbacks;
              if (m !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < m.length; n++)
                  Uo(m[n], d);
            } catch (N) {
              ge(a, a.return, N);
            }
          }
          l && r & 64 && Zf(u), xn(u, u.return);
          break;
        case 27:
          Ff(u);
        case 26:
        case 5:
          al(
            n,
            u,
            l
          ), l && a === null && r & 4 && Jf(u), xn(u, u.return);
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
          ), l && r & 4 && td(n, u);
          break;
        case 13:
          al(
            n,
            u,
            l
          ), l && r & 4 && ld(n, u);
          break;
        case 22:
          u.memoizedState === null && al(
            n,
            u,
            l
          ), xn(u, u.return);
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
  function lr(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && un(l));
  }
  function ar(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && un(e));
  }
  function wt(e, t, l, a) {
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
        wt(
          e,
          t,
          l,
          a
        ), n & 2048 && vn(9, t);
        break;
      case 1:
        wt(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        wt(
          e,
          t,
          l,
          a
        ), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && un(e)));
        break;
      case 12:
        if (n & 2048) {
          wt(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, r = u.id, d = u.onPostCommit;
            typeof d == "function" && d(
              r,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (m) {
            ge(t, t.return, m);
          }
        } else
          wt(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        wt(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        wt(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, r = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? wt(
          e,
          t,
          l,
          a
        ) : Sn(e, t) : u._visibility & 2 ? wt(
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
        )), n & 2048 && lr(r, t);
        break;
      case 24:
        wt(
          e,
          t,
          l,
          a
        ), n & 2048 && ar(t.alternate, t);
        break;
      default:
        wt(
          e,
          t,
          l,
          a
        );
    }
  }
  function za(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, r = t, d = l, m = a, N = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          za(
            u,
            r,
            d,
            m,
            n
          ), vn(8, r);
          break;
        case 23:
          break;
        case 22:
          var A = r.stateNode;
          r.memoizedState !== null ? A._visibility & 2 ? za(
            u,
            r,
            d,
            m,
            n
          ) : Sn(
            u,
            r
          ) : (A._visibility |= 2, za(
            u,
            r,
            d,
            m,
            n
          )), n && N & 2048 && lr(
            r.alternate,
            r
          );
          break;
        case 24:
          za(
            u,
            r,
            d,
            m,
            n
          ), n && N & 2048 && ar(r.alternate, r);
          break;
        default:
          za(
            u,
            r,
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
            Sn(l, a), n & 2048 && lr(
              a.alternate,
              a
            );
            break;
          case 24:
            Sn(l, a), n & 2048 && ar(a.alternate, a);
            break;
          default:
            Sn(l, a);
        }
        t = t.sibling;
      }
  }
  var jn = 8192;
  function Ca(e, t, l) {
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
        Ca(
          e,
          t,
          l
        ), e.flags & jn && e.memoizedState !== null && zh(
          l,
          Ut,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ca(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = Ut;
        Ut = Ju(e.stateNode.containerInfo), Ca(
          e,
          t,
          l
        ), Ut = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = jn, jn = 16777216, Ca(
          e,
          t,
          l
        ), jn = a) : Ca(
          e,
          t,
          l
        ));
        break;
      default:
        Ca(
          e,
          t,
          l
        );
    }
  }
  function cd(e) {
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
      cd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        rd(e), e = e.sibling;
  }
  function rd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Nn(e), e.flags & 2048 && vl(9, e, e.return);
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
      cd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          vl(8, t, t.return), wu(t);
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
          vl(8, l, t);
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
  var G1 = {
    getCacheForType: function(e) {
      var t = Ze(we), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Ze(we).controller.signal;
    }
  }, Q1 = typeof WeakMap == "function" ? WeakMap : Map, de = 0, Ne = null, ae = null, ie = 0, pe = 0, yt = null, xl = !1, Aa = !1, nr = !1, nl = 0, Oe = 0, Sl = 0, Il = 0, ur = 0, vt = 0, Ma = 0, Tn = null, ct = null, ir = !1, ku = 0, od = 0, Bu = 1 / 0, Hu = null, jl = null, Le = 0, Nl = null, Oa = null, ul = 0, cr = 0, rr = null, fd = null, En = 0, sr = null;
  function xt() {
    return (de & 2) !== 0 && ie !== 0 ? ie & -ie : y.T !== null ? pr() : Es();
  }
  function dd() {
    if (vt === 0)
      if ((ie & 536870912) === 0 || re) {
        var e = Zn;
        Zn <<= 1, (Zn & 3932160) === 0 && (Zn = 262144), vt = e;
      } else vt = 536870912;
    return e = gt.current, e !== null && (e.flags |= 32), vt;
  }
  function rt(e, t, l) {
    (e === Ne && (pe === 2 || pe === 9) || e.cancelPendingCommit !== null) && (Da(e, 0), Tl(
      e,
      ie,
      vt,
      !1
    )), Va(e, l), ((de & 2) === 0 || e !== Ne) && (e === Ne && ((de & 2) === 0 && (Il |= l), Oe === 4 && Tl(
      e,
      ie,
      vt,
      !1
    )), qt(e));
  }
  function md(e, t, l) {
    if ((de & 6) !== 0) throw Error(s(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Xa(e, t), n = a ? Z1(e, t) : fr(e, t, !0), u = a;
    do {
      if (n === 0) {
        Aa && !a && Tl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !X1(l)) {
          n = fr(e, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var r = 0;
          else
            r = e.pendingLanes & -536870913, r = r !== 0 ? r : r & 536870912 ? 536870912 : 0;
          if (r !== 0) {
            t = r;
            e: {
              var d = e;
              n = Tn;
              var m = d.current.memoizedState.isDehydrated;
              if (m && (Da(d, r).flags |= 256), r = fr(
                d,
                r,
                !1
              ), r !== 2) {
                if (nr && !m) {
                  d.errorRecoveryDisabledLanes |= u, Il |= u, n = 4;
                  break e;
                }
                u = ct, ct = n, u !== null && (ct === null ? ct = u : ct.push.apply(
                  ct,
                  u
                ));
              }
              n = r;
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
                vt,
                !xl
              );
              break e;
            case 2:
              ct = null;
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
              vt,
              !xl
            ), Jn(a, 0, !0) !== 0) break e;
            ul = t, a.timeoutHandle = Xd(
              hd.bind(
                null,
                a,
                l,
                ct,
                Hu,
                ir,
                t,
                vt,
                Il,
                Ma,
                xl,
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
            ct,
            Hu,
            ir,
            t,
            vt,
            Il,
            Ma,
            xl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    qt(e);
  }
  function hd(e, t, l, a, n, u, r, d, m, N, A, O, T, z) {
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
      if (q = Ch(
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
            r,
            d,
            m,
            A,
            O,
            null,
            T,
            z
          )
        ), Tl(e, u, r, !N);
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
      r,
      d,
      m
    );
  }
  function X1(e) {
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
    t &= ~ur, t &= ~Il, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - mt(n), r = 1 << u;
      a[u] = -1, n &= ~r;
    }
    l !== 0 && js(e, l, t);
  }
  function qu() {
    return (de & 6) === 0 ? (_n(0), !1) : !0;
  }
  function or() {
    if (ae !== null) {
      if (pe === 0)
        var e = ae.return;
      else
        e = ae, Jt = Ql = null, _c(e), ja = null, rn = 0, e = ae;
      for (; e !== null; )
        Vf(e.alternate, e), e = e.return;
      ae = null;
    }
  }
  function Da(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, oh(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ul = 0, or(), Ne = e, ae = l = Zt(e.current, null), ie = t, pe = 0, yt = null, xl = !1, Aa = Xa(e, t), nr = !1, Ma = vt = ur = Il = Sl = Oe = 0, ct = Tn = null, ir = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - mt(a), u = 1 << n;
        t |= e[n], a &= ~u;
      }
    return nl = t, iu(), l;
  }
  function pd(e, t) {
    ee = null, y.H = gn, t === Sa || t === hu ? (t = Mo(), pe = 3) : t === hc ? (t = Mo(), pe = 4) : pe = t === Gc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, yt = t, ae === null && (Oe = 1, Cu(
      e,
      Tt(t, e.current)
    ));
  }
  function gd() {
    var e = gt.current;
    return e === null ? !0 : (ie & 4194048) === ie ? Ct === null : (ie & 62914560) === ie || (ie & 536870912) !== 0 ? e === Ct : !1;
  }
  function bd() {
    var e = y.H;
    return y.H = gn, e === null ? gn : e;
  }
  function yd() {
    var e = y.A;
    return y.A = G1, e;
  }
  function Lu() {
    Oe = 4, xl || (ie & 4194048) !== ie && gt.current !== null || (Aa = !0), (Sl & 134217727) === 0 && (Il & 134217727) === 0 || Ne === null || Tl(
      Ne,
      ie,
      vt,
      !1
    );
  }
  function fr(e, t, l) {
    var a = de;
    de |= 2;
    var n = bd(), u = yd();
    (Ne !== e || ie !== t) && (Hu = null, Da(e, t)), t = !1;
    var r = Oe;
    e: do
      try {
        if (pe !== 0 && ae !== null) {
          var d = ae, m = yt;
          switch (pe) {
            case 8:
              or(), r = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              gt.current === null && (t = !0);
              var N = pe;
              if (pe = 0, yt = null, Ra(e, d, m, N), l && Aa) {
                r = 0;
                break e;
              }
              break;
            default:
              N = pe, pe = 0, yt = null, Ra(e, d, m, N);
          }
        }
        V1(), r = Oe;
        break;
      } catch (A) {
        pd(e, A);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Jt = Ql = null, de = a, y.H = n, y.A = u, ae === null && (Ne = null, ie = 0, iu()), r;
  }
  function V1() {
    for (; ae !== null; ) vd(ae);
  }
  function Z1(e, t) {
    var l = de;
    de |= 2;
    var a = bd(), n = yd();
    Ne !== e || ie !== t ? (Hu = null, Bu = ft() + 500, Da(e, t)) : Aa = Xa(
      e,
      t
    );
    e: do
      try {
        if (pe !== 0 && ae !== null) {
          t = ae;
          var u = yt;
          t: switch (pe) {
            case 1:
              pe = 0, yt = null, Ra(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Co(u)) {
                pe = 0, yt = null, xd(t);
                break;
              }
              t = function() {
                pe !== 2 && pe !== 9 || Ne !== e || (pe = 7), qt(e);
              }, u.then(t, t);
              break e;
            case 3:
              pe = 7;
              break e;
            case 4:
              pe = 5;
              break e;
            case 7:
              Co(u) ? (pe = 0, yt = null, xd(t)) : (pe = 0, yt = null, Ra(e, t, u, 7));
              break;
            case 5:
              var r = null;
              switch (ae.tag) {
                case 26:
                  r = ae.memoizedState;
                case 5:
                case 27:
                  var d = ae;
                  if (r ? um(r) : d.stateNode.complete) {
                    pe = 0, yt = null;
                    var m = d.sibling;
                    if (m !== null) ae = m;
                    else {
                      var N = d.return;
                      N !== null ? (ae = N, Yu(N)) : ae = null;
                    }
                    break t;
                  }
              }
              pe = 0, yt = null, Ra(e, t, u, 5);
              break;
            case 6:
              pe = 0, yt = null, Ra(e, t, u, 6);
              break;
            case 8:
              or(), Oe = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        K1();
        break;
      } catch (A) {
        pd(e, A);
      }
    while (!0);
    return Jt = Ql = null, y.H = a, y.A = n, de = l, ae !== null ? 0 : (Ne = null, ie = 0, iu(), Oe);
  }
  function K1() {
    for (; ae !== null && !g0(); )
      vd(ae);
  }
  function vd(e) {
    var t = Qf(e.alternate, e, nl);
    e.memoizedProps = e.pendingProps, t === null ? Yu(e) : ae = t;
  }
  function xd(e) {
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
          ie
        );
        break;
      case 11:
        t = Bf(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ie
        );
        break;
      case 5:
        _c(t);
      default:
        Vf(l, t), t = ae = bo(t, nl), t = Qf(l, t, nl);
    }
    e.memoizedProps = e.pendingProps, t === null ? Yu(e) : ae = t;
  }
  function Ra(e, t, l, a) {
    Jt = Ql = null, _c(t), ja = null, rn = 0;
    var n = t.return;
    try {
      if (w1(
        e,
        n,
        t,
        l,
        ie
      )) {
        Oe = 1, Cu(
          e,
          Tt(l, e.current)
        ), ae = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ae = n, u;
      Oe = 1, Cu(
        e,
        Tt(l, e.current)
      ), ae = null;
      return;
    }
    t.flags & 32768 ? (re || a === 1 ? e = !0 : Aa || (ie & 536870912) !== 0 ? e = !1 : (xl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = gt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Sd(t, e)) : Yu(t);
  }
  function Yu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Sd(
          t,
          xl
        );
        return;
      }
      e = t.return;
      var l = H1(
        t.alternate,
        t,
        nl
      );
      if (l !== null) {
        ae = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        ae = t;
        return;
      }
      ae = t = e;
    } while (t !== null);
    Oe === 0 && (Oe = 5);
  }
  function Sd(e, t) {
    do {
      var l = q1(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, ae = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        ae = e;
        return;
      }
      ae = e = l;
    } while (e !== null);
    Oe = 6, ae = null;
  }
  function jd(e, t, l, a, n, u, r, d, m) {
    e.cancelPendingCommit = null;
    do
      Gu();
    while (Le !== 0);
    if ((de & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (u = t.lanes | t.childLanes, u |= Pi, _0(
        e,
        l,
        u,
        r,
        d,
        m
      ), e === Ne && (ae = Ne = null, ie = 0), Oa = t, Nl = e, ul = l, cr = u, rr = n, fd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, W1(Xn, function() {
        return zd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = y.T, y.T = null, n = U.p, U.p = 2, r = de, de |= 4;
        try {
          L1(e, t, l);
        } finally {
          de = r, U.p = n, y.T = a;
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
        l = y.T, y.T = null;
        var a = U.p;
        U.p = 2;
        var n = de;
        de |= 4;
        try {
          ad(t, e);
          var u = Nr, r = co(e.containerInfo), d = u.focusedElem, m = u.selectionRange;
          if (r !== d && d && d.ownerDocument && io(
            d.ownerDocument.documentElement,
            d
          )) {
            if (m !== null && Ji(d)) {
              var N = m.start, A = m.end;
              if (A === void 0 && (A = N), "selectionStart" in d)
                d.selectionStart = N, d.selectionEnd = Math.min(
                  A,
                  d.value.length
                );
              else {
                var O = d.ownerDocument || document, T = O && O.defaultView || window;
                if (T.getSelection) {
                  var z = T.getSelection(), q = d.textContent.length, J = Math.min(m.start, q), Se = m.end === void 0 ? J : Math.min(m.end, q);
                  !z.extend && J > Se && (r = Se, Se = J, J = r);
                  var v = uo(
                    d,
                    J
                  ), p = uo(
                    d,
                    Se
                  );
                  if (v && p && (z.rangeCount !== 1 || z.anchorNode !== v.node || z.anchorOffset !== v.offset || z.focusNode !== p.node || z.focusOffset !== p.offset)) {
                    var S = O.createRange();
                    S.setStart(v.node, v.offset), z.removeAllRanges(), J > Se ? (z.addRange(S), z.extend(p.node, p.offset)) : (S.setEnd(p.node, p.offset), z.addRange(S));
                  }
                }
              }
            }
            for (O = [], z = d; z = z.parentNode; )
              z.nodeType === 1 && O.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof d.focus == "function" && d.focus(), d = 0; d < O.length; d++) {
              var M = O[d];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          ei = !!jr, Nr = jr = null;
        } finally {
          de = n, U.p = a, y.T = l;
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
        l = y.T, y.T = null;
        var a = U.p;
        U.p = 2;
        var n = de;
        de |= 4;
        try {
          If(e, t.alternate, t);
        } finally {
          de = n, U.p = a, y.T = l;
        }
      }
      Le = 3;
    }
  }
  function Ed() {
    if (Le === 4 || Le === 3) {
      Le = 0, b0();
      var e = Nl, t = Oa, l = ul, a = fd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Le = 5 : (Le = 0, Oa = Nl = null, _d(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (jl = null), Ai(l), t = t.stateNode, dt && typeof dt.onCommitFiberRoot == "function")
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
        t = y.T, n = U.p, U.p = 2, y.T = null;
        try {
          for (var u = e.onRecoverableError, r = 0; r < a.length; r++) {
            var d = a[r];
            u(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          y.T = t, U.p = n;
        }
      }
      (ul & 3) !== 0 && Gu(), qt(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === sr ? En++ : (En = 0, sr = e) : En = 0, _n(0);
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
    var e = Nl, t = cr;
    cr = 0;
    var l = Ai(ul), a = y.T, n = U.p;
    try {
      U.p = 32 > l ? 32 : l, y.T = null, l = rr, rr = null;
      var u = Nl, r = ul;
      if (Le = 0, Oa = Nl = null, ul = 0, (de & 6) !== 0) throw Error(s(331));
      var d = de;
      if (de |= 4, rd(u.current), ud(
        u,
        u.current,
        r,
        l
      ), de = d, _n(0, !1), dt && typeof dt.onPostCommitFiberRoot == "function")
        try {
          dt.onPostCommitFiberRoot(Qa, u);
        } catch {
        }
      return !0;
    } finally {
      U.p = n, y.T = a, _d(e, t);
    }
  }
  function Cd(e, t, l) {
    t = Tt(l, t), t = Yc(e.stateNode, t, 2), e = gl(e, t, 2), e !== null && (Va(e, 2), qt(e));
  }
  function ge(e, t, l) {
    if (e.tag === 3)
      Cd(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Cd(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (jl === null || !jl.has(a))) {
            e = Tt(l, e), l = Af(2), a = gl(t, l, 2), a !== null && (Mf(
              l,
              a,
              t,
              e
            ), Va(a, 2), qt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function dr(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Q1();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(l) || (nr = !0, n.add(l), e = J1.bind(null, e, t, l), t.then(e, e));
  }
  function J1(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ne === e && (ie & l) === l && (Oe === 4 || Oe === 3 && (ie & 62914560) === ie && 300 > ft() - ku ? (de & 2) === 0 && Da(e, 0) : ur |= l, Ma === ie && (Ma = 0)), qt(e);
  }
  function Ad(e, t) {
    t === 0 && (t = Ss()), e = Ll(e, t), e !== null && (Va(e, t), qt(e));
  }
  function $1(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Ad(e, l);
  }
  function F1(e, t) {
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
    a !== null && a.delete(t), Ad(e, l);
  }
  function W1(e, t) {
    return Ei(e, t);
  }
  var Qu = null, Ua = null, mr = !1, Xu = !1, hr = !1, El = 0;
  function qt(e) {
    e !== Ua && e.next === null && (Ua === null ? Qu = Ua = e : Ua = Ua.next = e), Xu = !0, mr || (mr = !0, P1());
  }
  function _n(e, t) {
    if (!hr && Xu) {
      hr = !0;
      do
        for (var l = !1, a = Qu; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var r = a.suspendedLanes, d = a.pingedLanes;
              u = (1 << 31 - mt(42 | e) + 1) - 1, u &= n & ~(r & ~d), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Rd(a, u));
          } else
            u = ie, u = Jn(
              a,
              a === Ne ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Xa(a, u) || (l = !0, Rd(a, u));
          a = a.next;
        }
      while (l);
      hr = !1;
    }
  }
  function I1() {
    Md();
  }
  function Md() {
    Xu = mr = !1;
    var e = 0;
    El !== 0 && sh() && (e = El);
    for (var t = ft(), l = null, a = Qu; a !== null; ) {
      var n = a.next, u = Od(a, t);
      u === 0 ? (a.next = null, l === null ? Qu = n : l.next = n, n === null && (Ua = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (Xu = !0)), a = n;
    }
    Le !== 0 && Le !== 5 || _n(e), El !== 0 && (El = 0);
  }
  function Od(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var r = 31 - mt(u), d = 1 << r, m = n[r];
      m === -1 ? ((d & l) === 0 || (d & a) !== 0) && (n[r] = E0(d, t)) : m <= t && (e.expiredLanes |= d), u &= ~d;
    }
    if (t = Ne, l = ie, l = Jn(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (pe === 2 || pe === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && _i(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Xa(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && _i(a), Ai(l)) {
        case 2:
        case 8:
          l = vs;
          break;
        case 32:
          l = Xn;
          break;
        case 268435456:
          l = xs;
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
    var a = ie;
    return a = Jn(
      e,
      e === Ne ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (md(e, a, t), Od(e, ft()), e.callbackNode != null && e.callbackNode === l ? Dd.bind(null, e) : null);
  }
  function Rd(e, t) {
    if (Gu()) return null;
    md(e, t, !0);
  }
  function P1() {
    fh(function() {
      (de & 6) !== 0 ? Ei(
        ys,
        I1
      ) : Md();
    });
  }
  function pr() {
    if (El === 0) {
      var e = va;
      e === 0 && (e = Vn, Vn <<= 1, (Vn & 261888) === 0 && (Vn = 256)), El = e;
    }
    return El;
  }
  function Ud(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : In("" + e);
  }
  function wd(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function eh(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = Ud(
        (n[lt] || null).action
      ), r = a.submitter;
      r && (t = (t = r[lt] || null) ? Ud(t.formAction) : r.getAttribute("formAction"), t !== null && (u = t, r = null));
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
                  var m = r ? wd(n, r) : new FormData(n);
                  wc(
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
                typeof u == "function" && (d.preventDefault(), m = r ? wd(n, r) : new FormData(n), wc(
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
  for (var gr = 0; gr < Ii.length; gr++) {
    var br = Ii[gr], th = br.toLowerCase(), lh = br[0].toUpperCase() + br.slice(1);
    Rt(
      th,
      "on" + lh
    );
  }
  Rt(oo, "onAnimationEnd"), Rt(fo, "onAnimationIteration"), Rt(mo, "onAnimationStart"), Rt("dblclick", "onDoubleClick"), Rt("focusin", "onFocus"), Rt("focusout", "onBlur"), Rt(y1, "onTransitionRun"), Rt(v1, "onTransitionStart"), Rt(x1, "onTransitionCancel"), Rt(ho, "onTransitionEnd"), ua("onMouseEnter", ["mouseout", "mouseover"]), ua("onMouseLeave", ["mouseout", "mouseover"]), ua("onPointerEnter", ["pointerout", "pointerover"]), ua("onPointerLeave", ["pointerout", "pointerover"]), kl(
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
  ), ah = new Set(
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
          for (var r = a.length - 1; 0 <= r; r--) {
            var d = a[r], m = d.instance, N = d.currentTarget;
            if (d = d.listener, m !== u && n.isPropagationStopped())
              break e;
            u = d, n.currentTarget = N;
            try {
              u(n);
            } catch (A) {
              uu(A);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (r = 0; r < a.length; r++) {
            if (d = a[r], m = d.instance, N = d.currentTarget, d = d.listener, m !== u && n.isPropagationStopped())
              break e;
            u = d, n.currentTarget = N;
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
  function ne(e, t) {
    var l = t[Mi];
    l === void 0 && (l = t[Mi] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (Bd(t, e, 2, !1), l.add(a));
  }
  function yr(e, t, l) {
    var a = 0;
    t && (a |= 4), Bd(
      l,
      e,
      a,
      t
    );
  }
  var Vu = "_reactListening" + Math.random().toString(36).slice(2);
  function vr(e) {
    if (!e[Vu]) {
      e[Vu] = !0, Cs.forEach(function(l) {
        l !== "selectionchange" && (ah.has(l) || yr(l, !1, e), yr(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Vu] || (t[Vu] = !0, yr("selectionchange", !1, t));
    }
  }
  function Bd(e, t, l, a) {
    switch (dm(t)) {
      case 2:
        var n = Oh;
        break;
      case 8:
        n = Dh;
        break;
      default:
        n = Ur;
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
  function xr(e, t, l, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var r = a.tag;
        if (r === 3 || r === 4) {
          var d = a.stateNode.containerInfo;
          if (d === n) break;
          if (r === 4)
            for (r = a.return; r !== null; ) {
              var m = r.tag;
              if ((m === 3 || m === 4) && r.stateNode.containerInfo === n)
                return;
              r = r.return;
            }
          for (; d !== null; ) {
            if (r = la(d), r === null) return;
            if (m = r.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              a = u = r;
              continue e;
            }
            d = d.parentNode;
          }
        }
        a = a.return;
      }
    Ls(function() {
      var N = u, A = Bi(l), O = [];
      e: {
        var T = po.get(e);
        if (T !== void 0) {
          var z = lu, q = e;
          switch (e) {
            case "keypress":
              if (eu(l) === 0) break e;
            case "keydown":
            case "keyup":
              z = F0;
              break;
            case "focusin":
              q = "focus", z = Qi;
              break;
            case "focusout":
              q = "blur", z = Qi;
              break;
            case "beforeblur":
            case "afterblur":
              z = Qi;
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
              z = Qs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = H0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = P0;
              break;
            case oo:
            case fo:
            case mo:
              z = Y0;
              break;
            case ho:
              z = t1;
              break;
            case "scroll":
            case "scrollend":
              z = k0;
              break;
            case "wheel":
              z = a1;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = Q0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Vs;
              break;
            case "toggle":
            case "beforetoggle":
              z = u1;
          }
          var J = (t & 4) !== 0, Se = !J && (e === "scroll" || e === "scrollend"), v = J ? T !== null ? T + "Capture" : null : T;
          J = [];
          for (var p = N, S; p !== null; ) {
            var M = p;
            if (S = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || S === null || v === null || (M = Ja(p, v), M != null && J.push(
              Cn(p, M, S)
            )), Se) break;
            p = p.return;
          }
          0 < J.length && (T = new z(
            T,
            q,
            null,
            l,
            A
          ), O.push({ event: T, listeners: J }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (T = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", T && l !== ki && (q = l.relatedTarget || l.fromElement) && (la(q) || q[ta]))
            break e;
          if ((z || T) && (T = A.window === A ? A : (T = A.ownerDocument) ? T.defaultView || T.parentWindow : window, z ? (q = l.relatedTarget || l.toElement, z = N, q = q ? la(q) : null, q !== null && (Se = b(q), J = q.tag, q !== Se || J !== 5 && J !== 27 && J !== 6) && (q = null)) : (z = null, q = N), z !== q)) {
            if (J = Qs, M = "onMouseLeave", v = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (J = Vs, M = "onPointerLeave", v = "onPointerEnter", p = "pointer"), Se = z == null ? T : Ka(z), S = q == null ? T : Ka(q), T = new J(
              M,
              p + "leave",
              z,
              l,
              A
            ), T.target = Se, T.relatedTarget = S, M = null, la(A) === N && (J = new J(
              v,
              p + "enter",
              q,
              l,
              A
            ), J.target = S, J.relatedTarget = Se, M = J), Se = M, z && q)
              t: {
                for (J = nh, v = z, p = q, S = 0, M = v; M; M = J(M))
                  S++;
                M = 0;
                for (var V = p; V; V = J(V))
                  M++;
                for (; 0 < S - M; )
                  v = J(v), S--;
                for (; 0 < M - S; )
                  p = J(p), M--;
                for (; S--; ) {
                  if (v === p || p !== null && v === p.alternate) {
                    J = v;
                    break t;
                  }
                  v = J(v), p = J(p);
                }
                J = null;
              }
            else J = null;
            z !== null && Hd(
              O,
              T,
              z,
              J,
              !1
            ), q !== null && Se !== null && Hd(
              O,
              Se,
              q,
              J,
              !0
            );
          }
        }
        e: {
          if (T = N ? Ka(N) : window, z = T.nodeName && T.nodeName.toLowerCase(), z === "select" || z === "input" && T.type === "file")
            var oe = Ps;
          else if (Ws(T))
            if (eo)
              oe = p1;
            else {
              oe = m1;
              var Q = d1;
            }
          else
            z = T.nodeName, !z || z.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? N && wi(N.elementType) && (oe = Ps) : oe = h1;
          if (oe && (oe = oe(e, N))) {
            Is(
              O,
              oe,
              l,
              A
            );
            break e;
          }
          Q && Q(e, T, N), e === "focusout" && N && T.type === "number" && N.memoizedProps.value != null && Ui(T, "number", T.value);
        }
        switch (Q = N ? Ka(N) : window, e) {
          case "focusin":
            (Ws(Q) || Q.contentEditable === "true") && (fa = Q, $i = N, ln = null);
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
            Fi = !1, ro(O, l, A);
            break;
          case "selectionchange":
            if (b1) break;
          case "keydown":
          case "keyup":
            ro(O, l, A);
        }
        var te;
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
        ce && (Zs && l.locale !== "ko" && (oa || ce !== "onCompositionStart" ? ce === "onCompositionEnd" && oa && (te = Ys()) : (sl = A, Li = "value" in sl ? sl.value : sl.textContent, oa = !0)), Q = Zu(N, ce), 0 < Q.length && (ce = new Xs(
          ce,
          e,
          null,
          l,
          A
        ), O.push({ event: ce, listeners: Q }), te ? ce.data = te : (te = Fs(l), te !== null && (ce.data = te)))), (te = c1 ? r1(e, l) : s1(e, l)) && (ce = Zu(N, "onBeforeInput"), 0 < ce.length && (Q = new Xs(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          A
        ), O.push({
          event: Q,
          listeners: ce
        }), Q.data = te)), eh(
          O,
          e,
          N,
          l,
          A
        );
      }
      kd(O, t);
    });
  }
  function Cn(e, t, l) {
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
        Cn(e, n, u)
      ), n = Ja(e, t), n != null && a.push(
        Cn(e, n, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function nh(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Hd(e, t, l, a, n) {
    for (var u = t._reactName, r = []; l !== null && l !== a; ) {
      var d = l, m = d.alternate, N = d.stateNode;
      if (d = d.tag, m !== null && m === a) break;
      d !== 5 && d !== 26 && d !== 27 || N === null || (m = N, n ? (N = Ja(l, u), N != null && r.unshift(
        Cn(l, N, m)
      )) : n || (N = Ja(l, u), N != null && r.push(
        Cn(l, N, m)
      ))), l = l.return;
    }
    r.length !== 0 && e.push({ event: t, listeners: r });
  }
  var uh = /\r\n?/g, ih = /\u0000|\uFFFD/g;
  function qd(e) {
    return (typeof e == "string" ? e : "" + e).replace(uh, `
`).replace(ih, "");
  }
  function Ld(e, t) {
    return t = qd(t), qd(e) === t;
  }
  function xe(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || ca(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && ca(e, "" + a);
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
          typeof u == "function" && (l === "formAction" ? (t !== "input" && xe(e, t, "name", n.name, n, null), xe(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), xe(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), xe(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (xe(e, t, "encType", n.encType, n, null), xe(e, t, "method", n.method, n, null), xe(e, t, "target", n.target, n, null)));
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
        a != null && ne("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ne("scrollend", e);
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
        ne("beforetoggle", e), ne("toggle", e), $n(e, "popover", a);
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
  function Sr(e, t, l, a, n, u) {
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
        typeof a == "string" ? ca(e, a) : (typeof a == "number" || typeof a == "bigint") && ca(e, "" + a);
        break;
      case "onScroll":
        a != null && ne("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ne("scrollend", e);
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
        if (!As.hasOwnProperty(l))
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
        ne("error", e), ne("load", e);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var r = l[u];
            if (r != null)
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
                  xe(e, t, u, r, l, null);
              }
          }
        n && xe(e, t, "srcSet", l.srcSet, l, null), a && xe(e, t, "src", l.src, l, null);
        return;
      case "input":
        ne("invalid", e);
        var d = u = r = n = null, m = null, N = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var A = l[a];
            if (A != null)
              switch (a) {
                case "name":
                  n = A;
                  break;
                case "type":
                  r = A;
                  break;
                case "checked":
                  m = A;
                  break;
                case "defaultChecked":
                  N = A;
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
                  xe(e, t, a, A, l, null);
              }
          }
        Us(
          e,
          u,
          d,
          m,
          N,
          r,
          n,
          !1
        );
        return;
      case "select":
        ne("invalid", e), a = r = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (d = l[n], d != null))
            switch (n) {
              case "value":
                u = d;
                break;
              case "defaultValue":
                r = d;
                break;
              case "multiple":
                a = d;
              default:
                xe(e, t, n, d, l, null);
            }
        t = u, l = r, e.multiple = !!a, t != null ? ia(e, !!a, t, !1) : l != null && ia(e, !!a, l, !0);
        return;
      case "textarea":
        ne("invalid", e), u = n = a = null;
        for (r in l)
          if (l.hasOwnProperty(r) && (d = l[r], d != null))
            switch (r) {
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
                xe(e, t, r, d, l, null);
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
                xe(e, t, m, a, l, null);
            }
        return;
      case "dialog":
        ne("beforetoggle", e), ne("toggle", e), ne("cancel", e), ne("close", e);
        break;
      case "iframe":
      case "object":
        ne("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < zn.length; a++)
          ne(zn[a], e);
        break;
      case "image":
        ne("error", e), ne("load", e);
        break;
      case "details":
        ne("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ne("error", e), ne("load", e);
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
        for (N in l)
          if (l.hasOwnProperty(N) && (a = l[N], a != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                xe(e, t, N, a, l, null);
            }
        return;
      default:
        if (wi(t)) {
          for (A in l)
            l.hasOwnProperty(A) && (a = l[A], a !== void 0 && Sr(
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
      l.hasOwnProperty(d) && (a = l[d], a != null && xe(e, t, d, a, l, null));
  }
  function ch(e, t, l, a) {
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
        var n = null, u = null, r = null, d = null, m = null, N = null, A = null;
        for (z in l) {
          var O = l[z];
          if (l.hasOwnProperty(z) && O != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = O;
              default:
                a.hasOwnProperty(z) || xe(e, t, z, null, a, O);
            }
        }
        for (var T in a) {
          var z = a[T];
          if (O = l[T], a.hasOwnProperty(T) && (z != null || O != null))
            switch (T) {
              case "type":
                u = z;
                break;
              case "name":
                n = z;
                break;
              case "checked":
                N = z;
                break;
              case "defaultChecked":
                A = z;
                break;
              case "value":
                r = z;
                break;
              case "defaultValue":
                d = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(s(137, t));
                break;
              default:
                z !== O && xe(
                  e,
                  t,
                  T,
                  z,
                  a,
                  O
                );
            }
        }
        Ri(
          e,
          r,
          d,
          m,
          N,
          A,
          u,
          n
        );
        return;
      case "select":
        z = r = d = T = null;
        for (u in l)
          if (m = l[u], l.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                z = m;
              default:
                a.hasOwnProperty(u) || xe(
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
                T = u;
                break;
              case "defaultValue":
                d = u;
                break;
              case "multiple":
                r = u;
              default:
                u !== m && xe(
                  e,
                  t,
                  n,
                  u,
                  a,
                  m
                );
            }
        t = d, l = r, a = z, T != null ? ia(e, !!l, T, !1) : !!a != !!l && (t != null ? ia(e, !!l, t, !0) : ia(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        z = T = null;
        for (d in l)
          if (n = l[d], l.hasOwnProperty(d) && n != null && !a.hasOwnProperty(d))
            switch (d) {
              case "value":
                break;
              case "children":
                break;
              default:
                xe(e, t, d, null, a, n);
            }
        for (r in a)
          if (n = a[r], u = l[r], a.hasOwnProperty(r) && (n != null || u != null))
            switch (r) {
              case "value":
                T = n;
                break;
              case "defaultValue":
                z = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && xe(e, t, r, n, a, u);
            }
        ws(e, T, z);
        return;
      case "option":
        for (var q in l)
          if (T = l[q], l.hasOwnProperty(q) && T != null && !a.hasOwnProperty(q))
            switch (q) {
              case "selected":
                e.selected = !1;
                break;
              default:
                xe(
                  e,
                  t,
                  q,
                  null,
                  a,
                  T
                );
            }
        for (m in a)
          if (T = a[m], z = l[m], a.hasOwnProperty(m) && T !== z && (T != null || z != null))
            switch (m) {
              case "selected":
                e.selected = T && typeof T != "function" && typeof T != "symbol";
                break;
              default:
                xe(
                  e,
                  t,
                  m,
                  T,
                  a,
                  z
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
        for (var J in l)
          T = l[J], l.hasOwnProperty(J) && T != null && !a.hasOwnProperty(J) && xe(e, t, J, null, a, T);
        for (N in a)
          if (T = a[N], z = l[N], a.hasOwnProperty(N) && T !== z && (T != null || z != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(s(137, t));
                break;
              default:
                xe(
                  e,
                  t,
                  N,
                  T,
                  a,
                  z
                );
            }
        return;
      default:
        if (wi(t)) {
          for (var Se in l)
            T = l[Se], l.hasOwnProperty(Se) && T !== void 0 && !a.hasOwnProperty(Se) && Sr(
              e,
              t,
              Se,
              void 0,
              a,
              T
            );
          for (A in a)
            T = a[A], z = l[A], !a.hasOwnProperty(A) || T === z || T === void 0 && z === void 0 || Sr(
              e,
              t,
              A,
              T,
              a,
              z
            );
          return;
        }
    }
    for (var v in l)
      T = l[v], l.hasOwnProperty(v) && T != null && !a.hasOwnProperty(v) && xe(e, t, v, null, a, T);
    for (O in a)
      T = a[O], z = l[O], !a.hasOwnProperty(O) || T === z || T == null && z == null || xe(e, t, O, T, a, z);
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
  function rh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, r = n.initiatorType, d = n.duration;
        if (u && d && Yd(r)) {
          for (r = 0, d = n.responseEnd, a += 1; a < l.length; a++) {
            var m = l[a], N = m.startTime;
            if (N > d) break;
            var A = m.transferSize, O = m.initiatorType;
            A && Yd(O) && (m = m.responseEnd, r += A * (m < d ? 1 : (d - N) / (m - N)));
          }
          if (--a, t += 8 * (u + r) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var jr = null, Nr = null;
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
  function Tr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Er = null;
  function sh() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Er ? !1 : (Er = e, !0) : (Er = null, !1);
  }
  var Xd = typeof setTimeout == "function" ? setTimeout : void 0, oh = typeof clearTimeout == "function" ? clearTimeout : void 0, Vd = typeof Promise == "function" ? Promise : void 0, fh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vd < "u" ? function(e) {
    return Vd.resolve(null).then(e).catch(dh);
  } : Xd;
  function dh(e) {
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
          An(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, An(l);
          for (var u = l.firstChild; u; ) {
            var r = u.nextSibling, d = u.nodeName;
            u[Za] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = r;
          }
        } else
          l === "body" && An(e.ownerDocument.body);
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
  function _r(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _r(l), Oi(l);
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
  function mh(e, t, l, a) {
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
      if (e = At(e.nextSibling), e === null) break;
    }
    return null;
  }
  function hh(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = At(e.nextSibling), e === null)) return null;
    return e;
  }
  function Jd(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = At(e.nextSibling), e === null)) return null;
    return e;
  }
  function zr(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Cr(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function ph(e, t) {
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
  function At(e) {
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
  var Ar = null;
  function $d(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return At(e.nextSibling);
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
  function An(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Oi(e);
  }
  var Mt = /* @__PURE__ */ new Map(), Id = /* @__PURE__ */ new Set();
  function Ju(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var il = U.d;
  U.d = {
    f: gh,
    r: bh,
    D: yh,
    C: vh,
    L: xh,
    m: Sh,
    X: Nh,
    S: jh,
    M: Th
  };
  function gh() {
    var e = il.f(), t = qu();
    return e || t;
  }
  function bh(e) {
    var t = aa(e);
    t !== null && t.tag === 5 && t.type === "form" ? pf(t) : il.r(e);
  }
  var wa = typeof document > "u" ? null : document;
  function Pd(e, t, l) {
    var a = wa;
    if (a && typeof t == "string" && t) {
      var n = jt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Id.has(n) || (Id.add(n), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), Je(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function yh(e) {
    il.D(e), Pd("dns-prefetch", e, null);
  }
  function vh(e, t) {
    il.C(e, t), Pd("preconnect", e, t);
  }
  function xh(e, t, l) {
    il.L(e, t, l);
    var a = wa;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + jt(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + jt(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + jt(
        l.imageSizes
      ) + '"]')) : n += '[href="' + jt(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = ka(e);
          break;
        case "script":
          u = Ba(e);
      }
      Mt.has(u) || (e = C(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Mt.set(u, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Mn(u)) || t === "script" && a.querySelector(On(u)) || (t = a.createElement("link"), Je(t, "link", e), Ye(t), a.head.appendChild(t)));
    }
  }
  function Sh(e, t) {
    il.m(e, t);
    var l = wa;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + jt(a) + '"][href="' + jt(e) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ba(e);
      }
      if (!Mt.has(u) && (e = C({ rel: "modulepreload", href: e }, t), Mt.set(u, e), l.querySelector(n) === null)) {
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
  function jh(e, t, l) {
    il.S(e, t, l);
    var a = wa;
    if (a && e) {
      var n = na(a).hoistableStyles, u = ka(e);
      t = t || "default";
      var r = n.get(u);
      if (!r) {
        var d = { loading: 0, preload: null };
        if (r = a.querySelector(
          Mn(u)
        ))
          d.loading = 5;
        else {
          e = C(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Mt.get(u)) && Mr(e, l);
          var m = r = a.createElement("link");
          Ye(m), Je(m, "link", e), m._p = new Promise(function(N, A) {
            m.onload = N, m.onerror = A;
          }), m.addEventListener("load", function() {
            d.loading |= 1;
          }), m.addEventListener("error", function() {
            d.loading |= 2;
          }), d.loading |= 4, $u(r, t, a);
        }
        r = {
          type: "stylesheet",
          instance: r,
          count: 1,
          state: d
        }, n.set(u, r);
      }
    }
  }
  function Nh(e, t) {
    il.X(e, t);
    var l = wa;
    if (l && e) {
      var a = na(l).hoistableScripts, n = Ba(e), u = a.get(n);
      u || (u = l.querySelector(On(n)), u || (e = C({ src: e, async: !0 }, t), (t = Mt.get(n)) && Or(e, t), u = l.createElement("script"), Ye(u), Je(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Th(e, t) {
    il.M(e, t);
    var l = wa;
    if (l && e) {
      var a = na(l).hoistableScripts, n = Ba(e), u = a.get(n);
      u || (u = l.querySelector(On(n)), u || (e = C({ src: e, async: !0, type: "module" }, t), (t = Mt.get(n)) && Or(e, t), u = l.createElement("script"), Ye(u), Je(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function em(e, t, l, a) {
    var n = (n = le.current) ? Ju(n) : null;
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
          ).hoistableStyles, r = u.get(e);
          if (r || (n = n.ownerDocument || n, r = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, r), (u = n.querySelector(
            Mn(e)
          )) && !u._p && (r.instance = u, r.state.loading = 5), Mt.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Mt.set(e, l), u || Eh(
            n,
            e,
            l,
            r.state
          ))), t && a === null)
            throw Error(s(528, ""));
          return r;
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
    return 'href="' + jt(e) + '"';
  }
  function Mn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function tm(e) {
    return C({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Eh(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Je(t, "link", l), Ye(t), e.head.appendChild(t));
  }
  function Ba(e) {
    return '[src="' + jt(e) + '"]';
  }
  function On(e) {
    return "script[async]" + e;
  }
  function lm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + jt(l.href) + '"]'
          );
          if (a)
            return t.instance = a, Ye(a), a;
          var n = C({}, l, {
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
          a = tm(l), (n = Mt.get(n)) && Mr(a, n), u = (e.ownerDocument || e).createElement("link"), Ye(u);
          var r = u;
          return r._p = new Promise(function(d, m) {
            r.onload = d, r.onerror = m;
          }), Je(u, "link", a), t.state.loading |= 4, $u(u, l.precedence, e), t.instance = u;
        case "script":
          return u = Ba(l.src), (n = e.querySelector(
            On(u)
          )) ? (t.instance = n, Ye(n), n) : (a = l, (n = Mt.get(u)) && (a = C({}, l), Or(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ye(n), Je(n, "link", a), e.head.appendChild(n), t.instance = n);
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
    ), n = a.length ? a[a.length - 1] : null, u = n, r = 0; r < a.length; r++) {
      var d = a[r];
      if (d.dataset.precedence === t) u = d;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Mr(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Or(e, t) {
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
        var r = u.getAttribute(t) || "";
        r = e + r;
        var d = a.get(r);
        d ? d.push(u) : a.set(r, [u]);
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
  function _h(e, t, l) {
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
  function zh(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = ka(a.href), u = t.querySelector(
          Mn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Wu.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, Ye(u);
          return;
        }
        u = t.ownerDocument || t, a = tm(a), (n = Mt.get(n)) && Mr(a, n), u = u.createElement("link"), Ye(u);
        var r = u;
        r._p = new Promise(function(d, m) {
          r.onload = d, r.onerror = m;
        }), Je(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Wu.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Dr = 0;
  function Ch(e, t) {
    return e.stylesheets && e.count === 0 && Pu(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && Pu(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Dr === 0 && (Dr = 62500 * rh());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Pu(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Dr ? 50 : 800) + t
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Iu = /* @__PURE__ */ new Map(), t.forEach(Ah, e), Iu = null, Wu.call(e));
  }
  function Ah(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Iu.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Iu.set(e, l);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var r = n[u];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (l.set(r.dataset.precedence, r), a = r);
        }
        a && l.set(null, a);
      }
      n = t.instance, r = n.getAttribute("data-precedence"), u = l.get(r) || a, u === a && l.set(null, n), l.set(r, n), this.count++, a = Wu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Dn = {
    $$typeof: B,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0
  };
  function Mh(e, t, l, a, n, u, r, d, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = zi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = zi(0), this.hiddenUpdates = zi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function im(e, t, l, a, n, u, r, d, m, N, A, O) {
    return e = new Mh(
      e,
      t,
      l,
      r,
      m,
      N,
      A,
      O,
      d
    ), t = 1, u === !0 && (t |= 24), u = pt(3, null, null, t), e.current = u, u.stateNode = e, t = fc(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, pc(u), e;
  }
  function cm(e) {
    return e ? (e = ha, e) : ha;
  }
  function rm(e, t, l, a, n, u) {
    n = cm(n), a.context === null ? a.context = n : a.pendingContext = n, a = pl(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = gl(e, a, t), l !== null && (rt(l, e, t), on(l, e, t));
  }
  function sm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Rr(e, t) {
    sm(e, t), (e = e.alternate) && sm(e, t);
  }
  function om(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ll(e, 67108864);
      t !== null && rt(t, e, 67108864), Rr(e, 67108864);
    }
  }
  function fm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xt();
      t = Ci(t);
      var l = Ll(e, t);
      l !== null && rt(l, e, t), Rr(e, t);
    }
  }
  var ei = !0;
  function Oh(e, t, l, a) {
    var n = y.T;
    y.T = null;
    var u = U.p;
    try {
      U.p = 2, Ur(e, t, l, a);
    } finally {
      U.p = u, y.T = n;
    }
  }
  function Dh(e, t, l, a) {
    var n = y.T;
    y.T = null;
    var u = U.p;
    try {
      U.p = 8, Ur(e, t, l, a);
    } finally {
      U.p = u, y.T = n;
    }
  }
  function Ur(e, t, l, a) {
    if (ei) {
      var n = wr(a);
      if (n === null)
        xr(
          e,
          t,
          a,
          ti,
          l
        ), mm(e, a);
      else if (Uh(
        n,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (mm(e, a), t & 4 && -1 < Rh.indexOf(e)) {
        for (; n !== null; ) {
          var u = aa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var r = wl(u.pendingLanes);
                  if (r !== 0) {
                    var d = u;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; r; ) {
                      var m = 1 << 31 - mt(r);
                      d.entanglements[1] |= m, r &= ~m;
                    }
                    qt(u), (de & 6) === 0 && (Bu = ft() + 500, _n(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = Ll(u, 2), d !== null && rt(d, u, 2), qu(), Rr(u, 2);
            }
          if (u = wr(a), u === null && xr(
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
        xr(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function wr(e) {
    return e = Bi(e), kr(e);
  }
  var ti = null;
  function kr(e) {
    if (ti = null, e = la(e), e !== null) {
      var t = b(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = _(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = E(t), e !== null) return e;
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
          case ys:
            return 2;
          case vs:
            return 8;
          case Xn:
          case v0:
            return 32;
          case xs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Br = !1, zl = null, Cl = null, Al = null, Rn = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map(), Ml = [], Rh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
        Cl = null;
        break;
      case "mouseover":
      case "mouseout":
        Al = null;
        break;
      case "pointerover":
      case "pointerout":
        Rn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Un.delete(t.pointerId);
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
  function Uh(e, t, l, a, n) {
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
        return Cl = wn(
          Cl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return Al = wn(
          Al,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Rn.set(
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
      case "gotpointercapture":
        return u = n.pointerId, Un.set(
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
    }
    return !1;
  }
  function hm(e) {
    var t = la(e.target);
    if (t !== null) {
      var l = b(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = _(l), t !== null) {
            e.blockedOn = t, _s(e.priority, function() {
              fm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = E(l), t !== null) {
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
      var l = wr(e.nativeEvent);
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
  function wh() {
    Br = !1, zl !== null && li(zl) && (zl = null), Cl !== null && li(Cl) && (Cl = null), Al !== null && li(Al) && (Al = null), Rn.forEach(pm), Un.forEach(pm);
  }
  function ai(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Br || (Br = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      wh
    )));
  }
  var ni = null;
  function gm(e) {
    ni !== e && (ni = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        ni === e && (ni = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (kr(a || l) === null)
              continue;
            break;
          }
          var u = aa(l);
          u !== null && (e.splice(t, 3), t -= 3, wc(
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
    zl !== null && ai(zl, e), Cl !== null && ai(Cl, e), Al !== null && ai(Al, e), Rn.forEach(t), Un.forEach(t);
    for (var l = 0; l < Ml.length; l++) {
      var a = Ml[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Ml.length && (l = Ml[0], l.blockedOn === null); )
      hm(l), l.blockedOn === null && Ml.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], r = n[lt] || null;
        if (typeof u == "function")
          r || gm(l);
        else if (r) {
          var d = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, r = u[lt] || null)
              d = r.formAction;
            else if (kr(n) !== null) continue;
          } else d = r.action;
          typeof d == "function" ? l[a + 1] = d : (l.splice(a, 3), a -= 3), gm(l);
        }
      }
  }
  function bm() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(r) {
            return n = r;
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
  function Hr(e) {
    this._internalRoot = e;
  }
  ui.prototype.render = Hr.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var l = t.current, a = xt();
    rm(l, a, e, t, null, null);
  }, ui.prototype.unmount = Hr.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      rm(e.current, 2, null, e, null, null), qu(), t[ta] = null;
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
  var ym = o.version;
  if (ym !== "19.2.3")
    throw Error(
      s(
        527,
        ym,
        "19.2.3"
      )
    );
  U.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = j(t), e = e !== null ? D(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var kh = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: y,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ii = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ii.isDisabled && ii.supportsFiber)
      try {
        Qa = ii.inject(
          kh
        ), dt = ii;
      } catch {
      }
  }
  return kn.createRoot = function(e, t) {
    if (!h(e)) throw Error(s(299));
    var l = !1, a = "", n = Ef, u = _f, r = zf;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = im(
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
      r,
      bm
    ), e[ta] = t.current, vr(e), new Hr(t);
  }, kn.hydrateRoot = function(e, t, l) {
    if (!h(e)) throw Error(s(299));
    var a = !1, n = "", u = Ef, r = _f, d = zf, m = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (r = l.onCaughtError), l.onRecoverableError !== void 0 && (d = l.onRecoverableError), l.formState !== void 0 && (m = l.formState)), t = im(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      n,
      m,
      u,
      r,
      d,
      bm
    ), t.context = cm(null), l = t.current, a = xt(), a = Ci(a), n = pl(a), n.callback = null, gl(l, n, a), l = a, t.current.lanes = l, Va(t, l), qt(t), e[ta] = t.current, vr(e), new ui(t);
  }, kn.version = "19.2.3", kn;
}
var _m;
function Zh() {
  if (_m) return Lr.exports;
  _m = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Lr.exports = Vh(), Lr.exports;
}
var Kh = Zh();
const Jh = /* @__PURE__ */ Zm(Kh);
var Xr = { exports: {} }, Bn = {};
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
function $h() {
  if (zm) return Bn;
  zm = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function f(s, h, b) {
    var _ = null;
    if (b !== void 0 && (_ = "" + b), h.key !== void 0 && (_ = "" + h.key), "key" in h) {
      b = {};
      for (var E in h)
        E !== "key" && (b[E] = h[E]);
    } else b = h;
    return h = b.ref, {
      $$typeof: c,
      type: s,
      key: _,
      ref: h !== void 0 ? h : null,
      props: b
    };
  }
  return Bn.Fragment = o, Bn.jsx = f, Bn.jsxs = f, Bn;
}
var Cm;
function Fh() {
  return Cm || (Cm = 1, Xr.exports = $h()), Xr.exports;
}
var i = Fh();
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wh = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ih = (c) => c.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, f, s) => s ? s.toUpperCase() : f.toLowerCase()
), Am = (c) => {
  const o = Ih(c);
  return o.charAt(0).toUpperCase() + o.slice(1);
}, Jm = (...c) => c.filter((o, f, s) => !!o && o.trim() !== "" && s.indexOf(o) === f).join(" ").trim(), Ph = (c) => {
  for (const o in c)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ep = {
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
const tp = w.forwardRef(
  ({
    color: c = "currentColor",
    size: o = 24,
    strokeWidth: f = 2,
    absoluteStrokeWidth: s,
    className: h = "",
    children: b,
    iconNode: _,
    ...E
  }, x) => w.createElement(
    "svg",
    {
      ref: x,
      ...ep,
      width: o,
      height: o,
      stroke: c,
      strokeWidth: s ? Number(f) * 24 / Number(o) : f,
      className: Jm("lucide", h),
      ...!b && !Ph(E) && { "aria-hidden": "true" },
      ...E
    },
    [
      ..._.map(([j, D]) => w.createElement(j, D)),
      ...Array.isArray(b) ? b : [b]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F = (c, o) => {
  const f = w.forwardRef(
    ({ className: s, ...h }, b) => w.createElement(tp, {
      ref: b,
      iconNode: o,
      className: Jm(
        `lucide-${Wh(Am(c))}`,
        `lucide-${c}`,
        s
      ),
      ...h
    })
  );
  return f.displayName = Am(c), f;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lp = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], ap = F("arrow-down-to-line", lp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const np = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], up = F("arrow-up-right", np);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], $m = F("bot", ip);
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
], Fr = F("brain-circuit", cp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rp = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], sp = F("brain", rp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const op = [
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
], fp = F("calculator", op);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dp = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], mp = F("check", dp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], is = F("chevron-down", hp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pp = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Fm = F("chevron-right", pp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gp = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], cs = F("circle-alert", gp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bp = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Wm = F("circle-check-big", bp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yp = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], vp = F("circle-check", yp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Sp = F("clock", xp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jp = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], Np = F("cloud", jp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tp = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], Im = F("copy", Tp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ep = [
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
], yi = F("cpu", Ep);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _p = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], rs = F("database", _p);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zp = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Pm = F("download", zp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
], Ap = F("ellipsis-vertical", Cp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mp = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], Op = F("external-link", Mp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dp = [
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
], ss = F("file-text", Dp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], Mm = F("funnel", Rp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], wp = F("hash", Up);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kp = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], Bp = F("info", kp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], e0 = F("key", Hp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = [
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
], t0 = F("layers", qp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Yp = F("layout-dashboard", Lp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], l0 = F("loader-circle", Gp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qp = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], Xp = F("maximize-2", Qp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], Om = F("menu", Vp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], Kp = F("network", Zp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], $p = F("pause", Jp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fp = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], Wp = F("pen", Fp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ip = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], os = F("play", Ip);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pp = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], fs = F("plus", Pp);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eg = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], a0 = F("power", eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tg = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Wr = F("refresh-cw", tg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lg = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], n0 = F("regex", lg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ag = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], ng = F("save", ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ug = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], ig = F("scissors", ug);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], rg = F("search", cg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sg = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], og = F("send", sg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fg = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], u0 = F("server", fg);
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
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], mg = F("settings", dg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], ds = F("settings-2", hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pg = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], Ya = F("terminal", pg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gg = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Yn = F("trash-2", gg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bg = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], yg = F("upload", bg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vg = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], ms = F("zap", vg), xg = () => /* @__PURE__ */ i.jsx("style", { children: `
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
  { id: "dashboard", label: "仪表盘", icon: Yp },
  { id: "memory", label: "记忆流", icon: Fr },
  { id: "graph", label: "神经图谱", icon: Kp },
  { id: "processing", label: "数据处理", icon: up },
  { id: "presets", label: "API 预设", icon: rs },
  { id: "devlog", label: "开发日志", icon: Ya },
  { id: "settings", label: "系统设置", icon: ds }
], Sg = ({ children: c, activeTab: o, setActiveTab: f, onClose: s }) => {
  const [h, b] = w.useState(!1);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ i.jsx(xg, {}),
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
          /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20", children: /* @__PURE__ */ i.jsx(Fr, { size: 18, className: "text-white" }) }),
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
      /* @__PURE__ */ i.jsx("nav", { className: "flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar", children: Dm.map((_) => {
        const E = _.icon, x = o === _.id;
        return /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => f(_.id),
            className: `
                                    w-full flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-all duration-200 group
                                    ${x ? "text-foreground bg-sidebar-accent font-medium" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 font-light"}
                                `,
            children: [
              /* @__PURE__ */ i.jsx(E, { size: 18, strokeWidth: 1.5, className: x ? "text-primary" : "group-hover:text-muted-foreground" }),
              _.label
            ]
          },
          _.id
        );
      }) }),
      /* @__PURE__ */ i.jsx("div", { className: "p-4 border-t border-sidebar-border", children: /* @__PURE__ */ i.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 flex items-center gap-3 border border-border/50 hover:border-border transition-colors cursor-pointer", children: [
        /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium border border-border", children: "SH" }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs font-medium text-foreground truncate", children: "Shiyue Netizen" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground truncate", children: "Pro Workspace" })
        ] }),
        /* @__PURE__ */ i.jsx(Ap, { size: 14, className: "text-muted-foreground" })
      ] }) })
    ] }),
    /* @__PURE__ */ i.jsxs("header", { className: "md:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur border-b border-border flex items-center justify-between px-4 z-40", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx("div", { className: "w-6 h-6 rounded bg-primary flex items-center justify-center", children: /* @__PURE__ */ i.jsx(Fr, { size: 14, className: "text-primary-foreground" }) }),
        /* @__PURE__ */ i.jsx("span", { className: "font-medium text-foreground", children: "Engram" })
      ] }),
      /* @__PURE__ */ i.jsx("button", { onClick: () => b(!h), className: "text-muted-foreground", children: /* @__PURE__ */ i.jsx(Om, { size: 20 }) })
    ] }),
    h && /* @__PURE__ */ i.jsxs("div", { className: "fixed inset-0 z-50 bg-background/95 flex flex-col p-6 animate-in slide-in-from-top-4 md:hidden", children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex justify-end mb-8", children: /* @__PURE__ */ i.jsx("button", { onClick: () => b(!1), children: /* @__PURE__ */ i.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx("path", { d: "M18 6 6 18" }),
        /* @__PURE__ */ i.jsx("path", { d: "m6 6 12 12" })
      ] }) }) }),
      /* @__PURE__ */ i.jsx("nav", { className: "space-y-4", children: Dm.map((_) => /* @__PURE__ */ i.jsx(
        "button",
        {
          onClick: () => {
            f(_.id), b(!1);
          },
          className: `text-2xl font-light block w-full text-left ${o === _.id ? "text-foreground" : "text-muted-foreground"}`,
          children: _.label
        },
        _.id
      )) })
    ] }),
    /* @__PURE__ */ i.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden", children: /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 scroll-smooth pt-20 md:pt-12", children: /* @__PURE__ */ i.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: c }) }) })
  ] });
}, Vr = ({
  title: c,
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
    /* @__PURE__ */ i.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: c }),
    s && /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: s })
  ] })
] }), $e = [];
for (let c = 0; c < 256; ++c)
  $e.push((c + 256).toString(16).slice(1));
function jg(c, o = 0) {
  return ($e[c[o + 0]] + $e[c[o + 1]] + $e[c[o + 2]] + $e[c[o + 3]] + "-" + $e[c[o + 4]] + $e[c[o + 5]] + "-" + $e[c[o + 6]] + $e[c[o + 7]] + "-" + $e[c[o + 8]] + $e[c[o + 9]] + "-" + $e[c[o + 10]] + $e[c[o + 11]] + $e[c[o + 12]] + $e[c[o + 13]] + $e[c[o + 14]] + $e[c[o + 15]]).toLowerCase();
}
let Zr;
const Ng = new Uint8Array(16);
function Tg() {
  if (!Zr) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Zr = crypto.getRandomValues.bind(crypto);
  }
  return Zr(Ng);
}
const Eg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Rm = { randomUUID: Eg };
function _g(c, o, f) {
  var h;
  c = c || {};
  const s = c.random ?? ((h = c.rng) == null ? void 0 : h.call(c)) ?? Tg();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, jg(s);
}
function zg(c, o, f) {
  return Rm.randomUUID && !c ? Rm.randomUUID() : _g(c);
}
var Ir = function(c, o) {
  return Ir = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(f, s) {
    f.__proto__ = s;
  } || function(f, s) {
    for (var h in s) Object.prototype.hasOwnProperty.call(s, h) && (f[h] = s[h]);
  }, Ir(c, o);
};
function Gn(c, o) {
  if (typeof o != "function" && o !== null)
    throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");
  Ir(c, o);
  function f() {
    this.constructor = c;
  }
  c.prototype = o === null ? Object.create(o) : (f.prototype = o.prototype, new f());
}
function Pr(c) {
  var o = typeof Symbol == "function" && Symbol.iterator, f = o && c[o], s = 0;
  if (f) return f.call(c);
  if (c && typeof c.length == "number") return {
    next: function() {
      return c && s >= c.length && (c = void 0), { value: c && c[s++], done: !c };
    }
  };
  throw new TypeError(o ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function es(c, o) {
  var f = typeof Symbol == "function" && c[Symbol.iterator];
  if (!f) return c;
  var s = f.call(c), h, b = [], _;
  try {
    for (; (o === void 0 || o-- > 0) && !(h = s.next()).done; ) b.push(h.value);
  } catch (E) {
    _ = { error: E };
  } finally {
    try {
      h && !h.done && (f = s.return) && f.call(s);
    } finally {
      if (_) throw _.error;
    }
  }
  return b;
}
function ts(c, o, f) {
  if (f || arguments.length === 2) for (var s = 0, h = o.length, b; s < h; s++)
    (b || !(s in o)) && (b || (b = Array.prototype.slice.call(o, 0, s)), b[s] = o[s]);
  return c.concat(b || Array.prototype.slice.call(o));
}
function Yt(c) {
  return typeof c == "function";
}
function i0(c) {
  var o = function(s) {
    Error.call(s), s.stack = new Error().stack;
  }, f = c(o);
  return f.prototype = Object.create(Error.prototype), f.prototype.constructor = f, f;
}
var Kr = i0(function(c) {
  return function(f) {
    c(this), this.message = f ? f.length + ` errors occurred during unsubscription:
` + f.map(function(s, h) {
      return h + 1 + ") " + s.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = f;
  };
});
function ls(c, o) {
  if (c) {
    var f = c.indexOf(o);
    0 <= f && c.splice(f, 1);
  }
}
var vi = (function() {
  function c(o) {
    this.initialTeardown = o, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return c.prototype.unsubscribe = function() {
    var o, f, s, h, b;
    if (!this.closed) {
      this.closed = !0;
      var _ = this._parentage;
      if (_)
        if (this._parentage = null, Array.isArray(_))
          try {
            for (var E = Pr(_), x = E.next(); !x.done; x = E.next()) {
              var j = x.value;
              j.remove(this);
            }
          } catch (W) {
            o = { error: W };
          } finally {
            try {
              x && !x.done && (f = E.return) && f.call(E);
            } finally {
              if (o) throw o.error;
            }
          }
        else
          _.remove(this);
      var D = this.initialTeardown;
      if (Yt(D))
        try {
          D();
        } catch (W) {
          b = W instanceof Kr ? W.errors : [W];
        }
      var C = this._finalizers;
      if (C) {
        this._finalizers = null;
        try {
          for (var k = Pr(C), $ = k.next(); !$.done; $ = k.next()) {
            var ue = $.value;
            try {
              Um(ue);
            } catch (W) {
              b = b ?? [], W instanceof Kr ? b = ts(ts([], es(b)), es(W.errors)) : b.push(W);
            }
          }
        } catch (W) {
          s = { error: W };
        } finally {
          try {
            $ && !$.done && (h = k.return) && h.call(k);
          } finally {
            if (s) throw s.error;
          }
        }
      }
      if (b)
        throw new Kr(b);
    }
  }, c.prototype.add = function(o) {
    var f;
    if (o && o !== this)
      if (this.closed)
        Um(o);
      else {
        if (o instanceof c) {
          if (o.closed || o._hasParent(this))
            return;
          o._addParent(this);
        }
        (this._finalizers = (f = this._finalizers) !== null && f !== void 0 ? f : []).push(o);
      }
  }, c.prototype._hasParent = function(o) {
    var f = this._parentage;
    return f === o || Array.isArray(f) && f.includes(o);
  }, c.prototype._addParent = function(o) {
    var f = this._parentage;
    this._parentage = Array.isArray(f) ? (f.push(o), f) : f ? [f, o] : o;
  }, c.prototype._removeParent = function(o) {
    var f = this._parentage;
    f === o ? this._parentage = null : Array.isArray(f) && ls(f, o);
  }, c.prototype.remove = function(o) {
    var f = this._finalizers;
    f && ls(f, o), o instanceof c && o._removeParent(this);
  }, c.EMPTY = (function() {
    var o = new c();
    return o.closed = !0, o;
  })(), c;
})(), c0 = vi.EMPTY;
function r0(c) {
  return c instanceof vi || c && "closed" in c && Yt(c.remove) && Yt(c.add) && Yt(c.unsubscribe);
}
function Um(c) {
  Yt(c) ? c() : c.unsubscribe();
}
var Cg = {
  Promise: void 0
}, Ag = {
  setTimeout: function(c, o) {
    for (var f = [], s = 2; s < arguments.length; s++)
      f[s - 2] = arguments[s];
    return setTimeout.apply(void 0, ts([c, o], es(f)));
  },
  clearTimeout: function(c) {
    return clearTimeout(c);
  },
  delegate: void 0
};
function Mg(c) {
  Ag.setTimeout(function() {
    throw c;
  });
}
function wm() {
}
function oi(c) {
  c();
}
var hs = (function(c) {
  Gn(o, c);
  function o(f) {
    var s = c.call(this) || this;
    return s.isStopped = !1, f ? (s.destination = f, r0(f) && f.add(s)) : s.destination = Rg, s;
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
    this.closed || (this.isStopped = !0, c.prototype.unsubscribe.call(this), this.destination = null);
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
})(vi), Og = (function() {
  function c(o) {
    this.partialObserver = o;
  }
  return c.prototype.next = function(o) {
    var f = this.partialObserver;
    if (f.next)
      try {
        f.next(o);
      } catch (s) {
        ci(s);
      }
  }, c.prototype.error = function(o) {
    var f = this.partialObserver;
    if (f.error)
      try {
        f.error(o);
      } catch (s) {
        ci(s);
      }
    else
      ci(o);
  }, c.prototype.complete = function() {
    var o = this.partialObserver;
    if (o.complete)
      try {
        o.complete();
      } catch (f) {
        ci(f);
      }
  }, c;
})(), as = (function(c) {
  Gn(o, c);
  function o(f, s, h) {
    var b = c.call(this) || this, _;
    return Yt(f) || !f ? _ = {
      next: f ?? void 0,
      error: s ?? void 0,
      complete: h ?? void 0
    } : _ = f, b.destination = new Og(_), b;
  }
  return o;
})(hs);
function ci(c) {
  Mg(c);
}
function Dg(c) {
  throw c;
}
var Rg = {
  closed: !0,
  next: wm,
  error: Dg,
  complete: wm
}, Ug = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function wg(c) {
  return c;
}
function kg(c) {
  return c.length === 0 ? wg : c.length === 1 ? c[0] : function(f) {
    return c.reduce(function(s, h) {
      return h(s);
    }, f);
  };
}
var km = (function() {
  function c(o) {
    o && (this._subscribe = o);
  }
  return c.prototype.lift = function(o) {
    var f = new c();
    return f.source = this, f.operator = o, f;
  }, c.prototype.subscribe = function(o, f, s) {
    var h = this, b = Hg(o) ? o : new as(o, f, s);
    return oi(function() {
      var _ = h, E = _.operator, x = _.source;
      b.add(E ? E.call(b, x) : x ? h._subscribe(b) : h._trySubscribe(b));
    }), b;
  }, c.prototype._trySubscribe = function(o) {
    try {
      return this._subscribe(o);
    } catch (f) {
      o.error(f);
    }
  }, c.prototype.forEach = function(o, f) {
    var s = this;
    return f = Bm(f), new f(function(h, b) {
      var _ = new as({
        next: function(E) {
          try {
            o(E);
          } catch (x) {
            b(x), _.unsubscribe();
          }
        },
        error: b,
        complete: h
      });
      s.subscribe(_);
    });
  }, c.prototype._subscribe = function(o) {
    var f;
    return (f = this.source) === null || f === void 0 ? void 0 : f.subscribe(o);
  }, c.prototype[Ug] = function() {
    return this;
  }, c.prototype.pipe = function() {
    for (var o = [], f = 0; f < arguments.length; f++)
      o[f] = arguments[f];
    return kg(o)(this);
  }, c.prototype.toPromise = function(o) {
    var f = this;
    return o = Bm(o), new o(function(s, h) {
      var b;
      f.subscribe(function(_) {
        return b = _;
      }, function(_) {
        return h(_);
      }, function() {
        return s(b);
      });
    });
  }, c.create = function(o) {
    return new c(o);
  }, c;
})();
function Bm(c) {
  var o;
  return (o = c ?? Cg.Promise) !== null && o !== void 0 ? o : Promise;
}
function Bg(c) {
  return c && Yt(c.next) && Yt(c.error) && Yt(c.complete);
}
function Hg(c) {
  return c && c instanceof hs || Bg(c) && r0(c);
}
function qg(c) {
  return Yt(c == null ? void 0 : c.lift);
}
function Lg(c) {
  return function(o) {
    if (qg(o))
      return o.lift(function(f) {
        try {
          return c(f, this);
        } catch (s) {
          this.error(s);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function Yg(c, o, f, s, h) {
  return new Gg(c, o, f, s, h);
}
var Gg = (function(c) {
  Gn(o, c);
  function o(f, s, h, b, _, E) {
    var x = c.call(this, f) || this;
    return x.onFinalize = _, x.shouldUnsubscribe = E, x._next = s ? function(j) {
      try {
        s(j);
      } catch (D) {
        f.error(D);
      }
    } : c.prototype._next, x._error = b ? function(j) {
      try {
        b(j);
      } catch (D) {
        f.error(D);
      } finally {
        this.unsubscribe();
      }
    } : c.prototype._error, x._complete = h ? function() {
      try {
        h();
      } catch (j) {
        f.error(j);
      } finally {
        this.unsubscribe();
      }
    } : c.prototype._complete, x;
  }
  return o.prototype.unsubscribe = function() {
    var f;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var s = this.closed;
      c.prototype.unsubscribe.call(this), !s && ((f = this.onFinalize) === null || f === void 0 || f.call(this));
    }
  }, o;
})(hs), Qg = i0(function(c) {
  return function() {
    c(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), ps = (function(c) {
  Gn(o, c);
  function o() {
    var f = c.call(this) || this;
    return f.closed = !1, f.currentObservers = null, f.observers = [], f.isStopped = !1, f.hasError = !1, f.thrownError = null, f;
  }
  return o.prototype.lift = function(f) {
    var s = new Hm(this, this);
    return s.operator = f, s;
  }, o.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Qg();
  }, o.prototype.next = function(f) {
    var s = this;
    oi(function() {
      var h, b;
      if (s._throwIfClosed(), !s.isStopped) {
        s.currentObservers || (s.currentObservers = Array.from(s.observers));
        try {
          for (var _ = Pr(s.currentObservers), E = _.next(); !E.done; E = _.next()) {
            var x = E.value;
            x.next(f);
          }
        } catch (j) {
          h = { error: j };
        } finally {
          try {
            E && !E.done && (b = _.return) && b.call(_);
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
    return this._throwIfClosed(), c.prototype._trySubscribe.call(this, f);
  }, o.prototype._subscribe = function(f) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(f), this._innerSubscribe(f);
  }, o.prototype._innerSubscribe = function(f) {
    var s = this, h = this, b = h.hasError, _ = h.isStopped, E = h.observers;
    return b || _ ? c0 : (this.currentObservers = null, E.push(f), new vi(function() {
      s.currentObservers = null, ls(E, f);
    }));
  }, o.prototype._checkFinalizedStatuses = function(f) {
    var s = this, h = s.hasError, b = s.thrownError, _ = s.isStopped;
    h ? f.error(b) : _ && f.complete();
  }, o.prototype.asObservable = function() {
    var f = new km();
    return f.source = this, f;
  }, o.create = function(f, s) {
    return new Hm(f, s);
  }, o;
})(km), Hm = (function(c) {
  Gn(o, c);
  function o(f, s) {
    var h = c.call(this) || this;
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
    return (h = (s = this.source) === null || s === void 0 ? void 0 : s.subscribe(f)) !== null && h !== void 0 ? h : c0;
  }, o;
})(ps);
function Xg(c, o) {
  return Lg(function(f, s) {
    var h = 0;
    f.subscribe(Yg(s, function(b) {
      return c.call(o, b, h++) && s.next(b);
    }));
  });
}
const ri = new ps(), Vg = {
  /**
   * 发布事件
   */
  emit(c) {
    ri.next({
      ...c,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(c) {
    const o = ri.subscribe(c);
    return {
      unsubscribe: () => o.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(c, o) {
    const f = ri.pipe(Xg((s) => s.type === c)).subscribe((s) => o(s.payload));
    return {
      unsubscribe: () => f.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return ri.asObservable();
  }
};
var Te = /* @__PURE__ */ ((c) => (c[c.DEBUG = 0] = "DEBUG", c[c.INFO = 1] = "INFO", c[c.SUCCESS = 2] = "SUCCESS", c[c.WARN = 3] = "WARN", c[c.ERROR = 4] = "ERROR", c))(Te || {});
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
let Lt = [], Rl = { ...s0 }, Jr = null;
async function hi() {
  if (!Jr) {
    const { db: c } = await import("./DexieDB-C4p4g1Lh.js");
    Jr = c;
  }
  return Jr;
}
function Zg(c) {
  return new Date(c).toTimeString().slice(0, 8);
}
async function qa(c, o, f, s) {
  if (c < Rl.minLevel) return;
  const h = {
    id: zg(),
    timestamp: Date.now(),
    level: c,
    module: o,
    message: f,
    data: s
  };
  Lt.push(h), o0.next(h);
  try {
    const b = await hi();
    await b.logs.add(h);
    const _ = await b.logs.count();
    _ > Rl.maxEntries && await Kg(_ - Rl.maxEntries);
  } catch (b) {
    console.error("[Engram/Logger] 日志持久化失败:", b);
  }
}
async function Kg(c) {
  try {
    const o = await hi(), s = (await o.logs.orderBy("timestamp").limit(c).toArray()).map((h) => h.id);
    await o.logs.bulkDelete(s), Lt = Lt.slice(-Rl.maxEntries);
  } catch (o) {
    console.error("[Engram/Logger] 清理旧日志失败:", o);
  }
}
function Jg() {
  Vg.subscribe((c) => {
    const f = {
      INGESTION_START: Te.INFO,
      INGESTION_COMPLETE: Te.SUCCESS,
      ENTITY_CREATED: Te.INFO,
      MEMORY_STORED: Te.SUCCESS,
      RETRIEVAL_START: Te.DEBUG,
      RETRIEVAL_COMPLETE: Te.SUCCESS,
      CHAT_CHANGED: Te.INFO,
      MESSAGE_RECEIVED: Te.DEBUG
    }[c.type] ?? Te.DEBUG;
    qa(f, "EventBus", `${c.type}`, c.payload);
  });
}
const We = {
  /**
   * 初始化 Logger
   */
  async init(c) {
    c && (Rl = { ...Rl, ...c });
    try {
      Lt = await (await hi()).logs.orderBy("timestamp").reverse().limit(Rl.maxEntries).toArray(), Lt.reverse();
    } catch (o) {
      console.error("[Engram/Logger] 加载历史日志失败:", o), Lt = [];
    }
    Jg(), We.info("Logger", "Logger 初始化完成", { maxEntries: Rl.maxEntries });
  },
  /**
   * DEBUG 级别日志
   */
  debug(c, o, f) {
    qa(Te.DEBUG, c, o, f);
  },
  /**
   * INFO 级别日志
   */
  info(c, o, f) {
    qa(Te.INFO, c, o, f);
  },
  /**
   * SUCCESS 级别日志
   */
  success(c, o, f) {
    qa(Te.SUCCESS, c, o, f);
  },
  /**
   * WARN 级别日志
   */
  warn(c, o, f) {
    qa(Te.WARN, c, o, f);
  },
  /**
   * ERROR 级别日志
   */
  error(c, o, f) {
    qa(Te.ERROR, c, o, f);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...Lt];
  },
  /**
   * 订阅新日志
   */
  subscribe(c) {
    const o = o0.subscribe(c);
    return () => o.unsubscribe();
  },
  /**
   * 清空所有日志
   */
  async clear() {
    try {
      await (await hi()).logs.clear(), Lt = [], We.info("Logger", "日志已清空");
    } catch (c) {
      console.error("[Engram/Logger] 清空日志失败:", c);
    }
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const c = /* @__PURE__ */ new Date();
    c.toISOString().slice(0, 10), c.toTimeString().slice(0, 8).replace(/:/g, "");
    const o = {
      [Te.DEBUG]: "DEBUG",
      [Te.INFO]: "INFO",
      [Te.SUCCESS]: "SUCCESS",
      [Te.WARN]: "WARN",
      [Te.ERROR]: "ERROR"
    };
    let f = `# Engram Debug Log

`;
    f += `- **导出时间**: ${c.toLocaleString("zh-CN")}
`, f += `- **版本**: 0.1.0
`, f += `- **日志条数**: ${Lt.length}

`, f += `---

`, f += `## 日志记录

`, f += "```\n";
    for (const s of Lt) {
      const h = Zg(s.timestamp), b = o[s.level].padEnd(7), _ = s.module.padEnd(16);
      if (f += `[${h}] [${_}] ${b} ${s.message}
`, s.data !== void 0) {
        const E = JSON.stringify(s.data, null, 2).split(`
`).map((x) => `    ${x}`).join(`
`);
        f += `${E}
`;
      }
    }
    return f += "```\n", f;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const c = /* @__PURE__ */ new Date(), o = c.toISOString().slice(0, 10), f = c.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${o}_${f}.md`;
  }
}, $g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: s0,
  LogLevel: Te,
  LogLevelConfig: mi,
  Logger: We
}, Symbol.toStringTag, { value: "Module" }));
function f0() {
  var c, o;
  try {
    return ((o = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : o.call(c)) || null;
  } catch (f) {
    return console.warn("[Engram] Failed to get ST context:", f), null;
  }
}
function ob() {
  return f0() !== null;
}
async function qm() {
  const { Logger: c } = await Promise.resolve().then(() => $g);
  await c.init(), c.info("STBridge", "Engram 插件正在初始化...");
  try {
    const { checkTavernIntegration: f } = await import("./index-Dmj7o1hb.js"), s = await f();
    c.info("TavernAPI", "酒馆接口对接状态", s);
  } catch (f) {
    c.warn("TavernAPI", "酒馆接口检查失败", { error: String(f) });
  }
  try {
    const { summarizerService: f } = await import("./index-DslV1Ddl.js");
    f.start();
    const s = f.getStatus();
    c.info("Summarizer", "服务已启动", s);
  } catch (f) {
    c.warn("Summarizer", "服务启动失败", { error: String(f) });
  }
  Fg();
  const { ThemeManager: o } = await Promise.resolve().then(() => P2);
  o.init(), c.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const d0 = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function Fg() {
  const c = document.querySelector("#top-settings-holder"), o = document.querySelector("#WI-SP-button");
  if (!c) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), Wg();
    return;
  }
  const f = document.createElement("div");
  f.id = "engram-drawer", f.className = "drawer";
  const s = document.createElement("div");
  s.className = "drawer-toggle drawer-header";
  const h = document.createElement("div");
  h.id = "engram-drawer-icon", h.className = "drawer-icon fa-fw closedIcon", h.title = "Engram - 记忆操作系统", h.setAttribute("data-i18n", "[title]Engram - Memory OS"), h.innerHTML = d0, h.addEventListener("click", pi), s.appendChild(h), f.appendChild(s), o ? (c.insertBefore(f, o), console.log("[Engram] Top bar button injected before WI-SP-button")) : (c.appendChild(f), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function Wg() {
  const c = document.createElement("div");
  c.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", c.title = "Engram - 记忆操作系统", c.innerHTML = d0, c.addEventListener("click", pi), document.body.appendChild(c);
}
let ns = null;
function Ig(c) {
  ns = c;
}
let $r = !1, Hn = null, fi = null;
function pi() {
  $r && Hn ? (fi && (fi.unmount(), fi = null), Hn.remove(), Hn = null, $r = !1) : (Hn = Pg(), document.body.appendChild(Hn), $r = !0);
}
function Pg() {
  var o;
  const c = document.createElement("div");
  return c.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", c.style.backgroundColor = "var(--background)", c.style.color = "var(--foreground)", c.id = "engram-panel-root", ns ? fi = ns(c, pi) : (c.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (o = c.querySelector("button")) == null || o.addEventListener("click", pi)), c;
}
const e2 = (c) => {
  switch (c) {
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
}, Lm = ({ onNavigate: c }) => {
  const [o, f] = w.useState([]), [s, h] = w.useState(f0()), [b, _] = w.useState(0);
  w.useEffect(() => (f(We.getLogs().slice(0, 3)), We.subscribe((C) => {
    f((k) => [C, ...k].slice(0, 3));
  })), []), w.useEffect(() => {
    const D = setInterval(() => {
      _((C) => C + 1);
    }, 1e3);
    return () => clearInterval(D);
  }, []);
  const E = (D) => {
    const C = Math.floor(D / 3600), k = Math.floor(D % 3600 / 60), $ = D % 60;
    return `${C.toString().padStart(2, "0")}:${k.toString().padStart(2, "0")}:${$.toString().padStart(2, "0")}`;
  }, x = (s == null ? void 0 : s.name2) || "Unknown", j = (D) => {
    c && c(D);
  };
  return /* @__PURE__ */ i.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ i.jsx(
        Vr,
        {
          title: "ACTIVE MODEL",
          value: s ? "Connected" : "Offline",
          subtext: s ? `Chatting with ${x}` : "Waiting for connection...",
          icon: u0,
          highlight: !!s
        }
      ),
      /* @__PURE__ */ i.jsx(
        Vr,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: rs
        }
      ),
      /* @__PURE__ */ i.jsx(
        Vr,
        {
          title: "SYSTEM UPTIME",
          value: E(b),
          subtext: "Session Duration",
          icon: yi
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(ms, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => j("memory"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => j("graph"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => j("processing"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => j("settings"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(Ya, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ i.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => j("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: o.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : o.map((D) => /* @__PURE__ */ i.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${e2(D.level)}`, children: [
        /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(D.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: D.message })
      ] }, D.id)) })
    ] })
  ] }) });
}, xi = ({ title: c, subtitle: o, actions: f }) => /* @__PURE__ */ i.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: c }),
    o && /* @__PURE__ */ i.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: o })
  ] }),
  f && /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: f })
] }), Ym = ({
  icon: c,
  label: o,
  primary: f = !1,
  size: s = "md",
  className: h = "",
  ...b
}) => /* @__PURE__ */ i.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${s === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${f ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${h}
        `,
    ...b,
    children: [
      c && /* @__PURE__ */ i.jsx(c, { size: s === "sm" ? 14 : 16 }),
      o
    ]
  }
), t2 = () => {
  const [c] = w.useState([
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
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Xp, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(ds, { size: 16 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ i.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      o.map((f, s) => {
        const h = c.find((C) => C.id === f.source), b = c.find((C) => C.id === f.target);
        if (!h || !b) return null;
        const _ = h.x + 150 / 2, E = h.y + 60, x = b.x + 150 / 2, j = b.y, D = `M ${_} ${E} C ${_} ${E + 50}, ${x} ${j - 50}, ${x} ${j}`;
        return /* @__PURE__ */ i.jsx("g", { children: /* @__PURE__ */ i.jsx("path", { d: D, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, s);
      })
    ] }),
    c.map((f) => /* @__PURE__ */ i.jsxs(
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
              f.type === "process" && /* @__PURE__ */ i.jsx(yi, { size: 12, className: "text-purple-400" }),
              f.type === "output" && /* @__PURE__ */ i.jsx(rs, { size: 12, className: "text-emerald-400" }),
              f.label
            ] })
          ] })
        ]
      },
      f.id
    ))
  ] });
}, l2 = () => /* @__PURE__ */ i.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ i.jsx(
    xi,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i.jsx(Ym, { icon: os, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ i.jsx(Ym, { icon: ds, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ i.jsx(t2, {}) })
] });
function a2(c) {
  return new Date(c).toTimeString().slice(0, 8);
}
const n2 = {
  [Te.DEBUG]: "text-muted-foreground",
  [Te.INFO]: "text-blue-400",
  [Te.SUCCESS]: "text-green-400",
  [Te.WARN]: "text-yellow-400",
  [Te.ERROR]: "text-red-400"
}, u2 = ({ entry: c }) => {
  const [o, f] = w.useState(!1), s = c.data !== void 0, h = mi[c.level], b = n2[c.level] || "";
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
            a2(c.timestamp),
            "]"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "text-purple-400 shrink-0 whitespace-pre", children: [
            "[",
            c.module.padEnd(16),
            "]"
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: `shrink-0 whitespace-pre ${b}`, children: [
            h.icon,
            " ",
            h.label.padEnd(7)
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground break-words", children: c.message })
        ]
      }
    ),
    o && s && /* @__PURE__ */ i.jsx("div", { className: "ml-8 px-3 py-2 bg-muted-30 border-l-2 border-border rounded-r-sm", children: /* @__PURE__ */ i.jsx("pre", { className: "m-0 text-muted-foreground text-sm whitespace-pre-wrap break-words", children: JSON.stringify(c.data, null, 2) }) })
  ] });
}, Gm = 100;
class i2 {
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
    const s = this.entries.find((_) => _.id === o);
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
    const b = this.entries.findIndex((_) => _.id === o);
    b >= 0 ? this.entries.splice(b, 0, h) : this.entries.unshift(h), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(o, f) {
    const s = this.logSend(o), h = Date.now();
    try {
      const b = await f();
      return this.logReceive(s, {
        response: typeof b == "string" ? b : JSON.stringify(b),
        status: "success",
        duration: Date.now() - h
      }), b;
    } catch (b) {
      throw this.logReceive(s, {
        status: "error",
        error: b instanceof Error ? b.message : String(b),
        duration: Date.now() - h
      }), b;
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
        (b) => b.id === `${s.id}_recv` && b.direction === "received"
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
const si = new i2(), c2 = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, r2 = ({ status: c }) => {
  switch (c) {
    case "pending":
      return /* @__PURE__ */ i.jsx(l0, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ i.jsx(Wm, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ i.jsx(cs, { size: 14, className: "text-red-400" });
  }
}, s2 = (c) => new Date(c).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), o2 = (c) => c === void 0 ? "-" : c < 1e3 ? `${c}ms` : `${(c / 1e3).toFixed(1)}s`, f2 = ({ sent: c, received: o }) => {
  const [f, s] = w.useState(!1), h = c2[c.type];
  return /* @__PURE__ */ i.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => s(!f),
        children: [
          f ? /* @__PURE__ */ i.jsx(is, { size: 14 }) : /* @__PURE__ */ i.jsx(Fm, { size: 14 }),
          /* @__PURE__ */ i.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${h.color}`, children: h.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: s2(c.timestamp) }),
          /* @__PURE__ */ i.jsx(r2, { status: (o == null ? void 0 : o.status) || c.status }),
          c.floorRange && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            c.floorRange[0],
            "-",
            c.floorRange[1]
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ i.jsx(Sp, { size: 12 }),
            o2((o == null ? void 0 : o.duration) || c.duration)
          ] })
        ]
      }
    ),
    f && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ i.jsx(og, { size: 14 }),
          "发送",
          c.tokensSent && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            c.tokensSent,
            " tokens"
          ] })
        ] }),
        c.systemPrompt && /* @__PURE__ */ i.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: c.systemPrompt })
        ] }),
        c.userPrompt && /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: c.userPrompt })
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
        !o && c.status === "pending" && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(l0, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, d2 = () => {
  const [c, o] = w.useState(si.getPaired());
  return w.useEffect(() => si.subscribe(() => {
    o(si.getPaired());
  }), []), /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(ms, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          c.length,
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
    /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: c.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ i.jsx($m, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-3", children: c.map(({ sent: f, received: s }) => /* @__PURE__ */ i.jsx(f2, { sent: f, received: s }, f.id)) }) })
  ] });
}, m2 = [
  { id: "runtime", label: "运行日志", icon: Ya },
  { id: "model", label: "模型日志", icon: ms }
], h2 = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], p2 = () => {
  const [c, o] = w.useState("runtime"), [f, s] = w.useState([]), [h, b] = w.useState([]), [_, E] = w.useState(""), [x, j] = w.useState(-1), [D, C] = w.useState("ALL"), [k, $] = w.useState(!0), [ue, W] = w.useState(!1), [Ce, L] = w.useState(!1), Ee = w.useRef(null), B = w.useRef(null);
  w.useEffect(() => {
    s(We.getLogs());
    const Z = We.subscribe((X) => {
      s((be) => [...be, X]);
    });
    return () => Z();
  }, []), w.useEffect(() => {
    let Z = f;
    if (x !== -1 && (Z = Z.filter((X) => X.level >= x)), D !== "ALL" && (Z = Z.filter((X) => X.module.startsWith(D))), _.trim()) {
      const X = _.toLowerCase();
      Z = Z.filter(
        (be) => be.message.toLowerCase().includes(X) || be.module.toLowerCase().includes(X)
      );
    }
    b(Z);
  }, [f, x, D, _]), w.useEffect(() => {
    k && B.current && B.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [h, k]);
  const me = w.useCallback(async () => {
    await We.clear(), s([]);
  }, []), qe = w.useCallback(() => {
    const Z = We.exportToMarkdown(), X = We.getExportFilename(), be = new Blob([Z], { type: "text/markdown" }), Qe = URL.createObjectURL(be), et = document.createElement("a");
    et.href = Qe, et.download = X, et.click(), URL.revokeObjectURL(Qe), We.success("DevLog", `日志已导出: ${X}`);
  }, []);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full gap-3", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Ya, { size: 24, className: "text-foreground" }),
        /* @__PURE__ */ i.jsx("h2", { className: "text-lg font-medium text-foreground", children: "开发日志" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex gap-1 ml-4", children: m2.map((Z) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${c === Z.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`,
          onClick: () => o(Z.id),
          children: [
            /* @__PURE__ */ i.jsx(Z.icon, { size: 14 }),
            Z.label
          ]
        },
        Z.id
      )) })
    ] }),
    c === "runtime" && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 flex-wrap shrink-0", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-transparent border border-border text-muted-foreground hover:bg-accent transition-colors",
              onClick: () => W(!ue),
              children: [
                /* @__PURE__ */ i.jsx(Mm, { size: 14 }),
                x === -1 ? "全部级别" : mi[x].label
              ]
            }
          ),
          ue && /* @__PURE__ */ i.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors",
                onClick: () => {
                  j(-1), W(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(mi).map(([Z, X]) => /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors",
                onClick: () => {
                  j(Number(Z)), W(!1);
                },
                children: [
                  X.icon,
                  " ",
                  X.label
                ]
              },
              Z
            ))
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-transparent border border-border text-muted-foreground hover:bg-accent transition-colors",
              onClick: () => L(!Ce),
              children: [
                /* @__PURE__ */ i.jsx(Mm, { size: 14 }),
                D
              ]
            }
          ),
          Ce && /* @__PURE__ */ i.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-10 min-w-[120px]", children: h2.map((Z) => /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "w-full text-left px-3 py-1.5 text-sm hover:bg-accent transition-colors",
              onClick: () => {
                C(Z), L(!1);
              },
              children: Z
            },
            Z
          )) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md", children: [
          /* @__PURE__ */ i.jsx(rg, { size: 14, className: "text-muted-foreground" }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: _,
              onChange: (Z) => E(Z.target.value),
              className: "bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `p-1.5 rounded-md transition-colors ${k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`,
              onClick: () => $(!k),
              title: "自动滚动到最新",
              children: /* @__PURE__ */ i.jsx(ap, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 rounded-md text-muted-foreground hover:bg-accent transition-colors",
              onClick: me,
              title: "清空日志",
              children: /* @__PURE__ */ i.jsx(Yn, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity",
              onClick: qe,
              title: "导出日志",
              children: [
                /* @__PURE__ */ i.jsx(Pm, { size: 14 }),
                "导出"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 bg-card border border-border rounded-lg overflow-y-auto font-mono text-sm leading-relaxed", ref: Ee, children: h.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(Ya, { size: 48, strokeWidth: 1 }),
        /* @__PURE__ */ i.jsx("p", { children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        h.map((Z) => /* @__PURE__ */ i.jsx(u2, { entry: Z }, Z.id)),
        /* @__PURE__ */ i.jsx("div", { ref: B })
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
    c === "model" && /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ i.jsx(d2, {}) })
  ] });
}, g2 = ({
  preset: c,
  isSelected: o,
  onSelect: f,
  onEdit: s,
  onCopy: h,
  onDelete: b
}) => {
  var x;
  const _ = c.source === "tavern" || c.source === "tavern_profile" ? u0 : Np;
  c.source === "tavern" || c.source;
  const E = c.source === "custom" ? ((x = c.custom) == null ? void 0 : x.model) || "未设置" : "使用当前";
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
              children: /* @__PURE__ */ i.jsx(_, { size: 16 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `m-0 text-sm font-medium ${o ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: c.name }),
              c.isDefault && /* @__PURE__ */ i.jsx("span", { className: "px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-sm font-medium", children: "DEFAULT" })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ i.jsxs("span", { className: "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground font-mono hidden md:inline-block", children: [
                "T:",
                c.parameters.temperature
              ] }),
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground truncate", children: E })
            ] })
          ] }),
          o && /* @__PURE__ */ i.jsx(mp, { size: 14, className: "text-primary" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${o || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: s, children: /* @__PURE__ */ i.jsx(Wp, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: h, children: /* @__PURE__ */ i.jsx(Im, { size: 12 }) }),
          !c.isDefault && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: b, children: /* @__PURE__ */ i.jsx(Yn, { size: 12 }) })
        ] })
      ]
    }
  );
}, st = ({ title: c, description: o, children: f, className: s = "" }) => /* @__PURE__ */ i.jsxs("div", { className: `mb-8 ${s}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-foreground", children: c }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: o })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "space-y-4", children: f })
] }), ot = ({
  label: c,
  description: o,
  error: f,
  required: s,
  className: h = "",
  value: b,
  onChange: _,
  placeholder: E,
  type: x = "text",
  disabled: j,
  multiline: D,
  rows: C = 3
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${h}`, children: [
  /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    c,
    s && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "relative group", children: D ? /* @__PURE__ */ i.jsx(
    "textarea",
    {
      value: b,
      onChange: (k) => _(k.target.value),
      placeholder: E,
      disabled: j,
      rows: C,
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
      value: b,
      onChange: (k) => _(k.target.value),
      placeholder: E,
      disabled: j,
      className: `
                            engram-input w-full bg-input/50 text-foreground text-sm px-0 py-2 border-b border-input
                            focus:outline-none focus:border-primary transition-colors rounded-t-sm font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) }),
  o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: o }),
  f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: f })
] }), Ot = ({
  label: c,
  description: o,
  error: f,
  required: s,
  className: h = "",
  value: b,
  onChange: _,
  min: E,
  max: x,
  step: j = 1,
  showSlider: D = !0
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${h}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
      c,
      s && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded", children: b })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
    D && E !== void 0 && x !== void 0 && /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "range",
        min: E,
        max: x,
        step: j,
        value: b,
        onChange: (C) => _(Number(C.target.value)),
        className: "flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
      }
    ),
    /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "number",
        min: E,
        max: x,
        step: j,
        value: b,
        onChange: (C) => _(Number(C.target.value)),
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
  label: c,
  description: o,
  error: f,
  required: s,
  className: h = "",
  value: b,
  onChange: _,
  options: E,
  placeholder: x = "Select...",
  disabled: j
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${h}`, children: [
  /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    c,
    s && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ i.jsxs(
      "select",
      {
        value: b,
        onChange: (D) => _(D.target.value),
        disabled: j,
        className: `
                        engram-select w-full bg-input/50 text-foreground text-sm pl-0 pr-8 py-2 border-b border-input
                        focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer rounded-t-sm
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `,
        children: [
          /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: x }),
          E.map((D) => /* @__PURE__ */ i.jsx("option", { value: D.value, className: "bg-popover text-foreground", children: D.label }, D.value))
        ]
      }
    ),
    /* @__PURE__ */ i.jsx(is, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" })
  ] }),
  o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: o }),
  f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: f })
] }), qn = ({
  label: c,
  description: o,
  error: f,
  className: s = "",
  checked: h,
  onChange: b,
  disabled: _
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex items-start justify-between gap-4 py-1 ${s} ${_ ? "opacity-50 pointer-events-none" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ i.jsx("label", { className: "text-xs font-medium text-foreground cursor-pointer", onClick: () => !_ && b(!h), children: c }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80 mt-0.5", children: o }),
    f && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: f })
  ] }),
  /* @__PURE__ */ i.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": h,
      onClick: () => !_ && b(!h),
      disabled: _,
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
] }), b2 = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], y2 = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function v2() {
  var c, o, f, s;
  try {
    const h = (f = (o = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : o.call(c)) == null ? void 0 : f.extensionSettings;
    return ((s = h == null ? void 0 : h.connectionManager) == null ? void 0 : s.profiles) || [];
  } catch (h) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", h), [];
  }
}
const x2 = ({
  preset: c,
  onChange: o,
  isNew: f = !1
}) => {
  var W, Ce, L, Ee;
  const [s, h] = w.useState([]), [b, _] = w.useState(!1), E = () => {
    _(!0);
    try {
      const B = v2();
      h(B);
    } finally {
      _(!1);
    }
  };
  w.useEffect(() => {
    E();
  }, []);
  const x = (B) => {
    o({ ...c, ...B, updatedAt: Date.now() });
  }, j = (B, me) => {
    x({
      parameters: { ...c.parameters, [B]: me }
    });
  }, D = (B, me) => {
    x({
      context: { ...c.context, [B]: me }
    });
  }, C = (B, me) => {
    var qe, Z, X, be;
    x({
      custom: {
        apiUrl: ((qe = c.custom) == null ? void 0 : qe.apiUrl) || "",
        apiKey: ((Z = c.custom) == null ? void 0 : Z.apiKey) || "",
        model: ((X = c.custom) == null ? void 0 : X.model) || "",
        apiSource: ((be = c.custom) == null ? void 0 : be.apiSource) || "openai",
        [B]: me
      }
    });
  }, k = (B) => {
    const me = B;
    x({
      source: me,
      tavernProfileId: me === "tavern_profile" ? c.tavernProfileId : void 0
    }), me === "tavern_profile" && E();
  }, $ = s.map((B) => ({
    value: B.id,
    label: `${B.name} (${B.api || "Unknown"} - ${B.model || "Unknown"})`
  })), ue = s.find((B) => B.id === c.tavernProfileId);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(st, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "预设名称",
          value: c.name,
          onChange: (B) => x({ name: B }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "配置源",
          value: c.source,
          onChange: k,
          options: y2,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    c.source === "tavern_profile" && /* @__PURE__ */ i.jsxs(st, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ i.jsx(
          ea,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: c.tavernProfileId || "",
            onChange: (B) => x({ tavernProfileId: B }),
            options: $,
            placeholder: b ? "加载中..." : "请选择配置文件",
            disabled: b || $.length === 0
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: E,
            disabled: b,
            title: "刷新配置列表",
            children: /* @__PURE__ */ i.jsx(Wr, { size: 16, className: b ? "animate-spin" : "" })
          }
        )
      ] }),
      $.length === 0 && !b && /* @__PURE__ */ i.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      ue && /* @__PURE__ */ i.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: ue.api || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: ue.model || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: ue.preset || "-" })
        ] })
      ] })
    ] }),
    c.source === "custom" && /* @__PURE__ */ i.jsxs(st, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "API 类型",
          value: ((W = c.custom) == null ? void 0 : W.apiSource) || "openai",
          onChange: (B) => C("apiSource", B),
          options: b2
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API URL",
          type: "url",
          value: ((Ce = c.custom) == null ? void 0 : Ce.apiUrl) || "",
          onChange: (B) => C("apiUrl", B),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API Key",
          type: "password",
          value: ((L = c.custom) == null ? void 0 : L.apiKey) || "",
          onChange: (B) => C("apiKey", B),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "模型名称",
          value: ((Ee = c.custom) == null ? void 0 : Ee.model) || "",
          onChange: (B) => C("model", B),
          placeholder: "gpt-4o-mini",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(st, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "温度 (Temperature)",
          value: c.parameters.temperature,
          onChange: (B) => j("temperature", B),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "Top-P",
          value: c.parameters.topP,
          onChange: (B) => j("topP", B),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "最大输出 Tokens",
          value: c.parameters.maxTokens,
          onChange: (B) => j("maxTokens", B),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "频率惩罚",
          value: c.parameters.frequencyPenalty,
          onChange: (B) => j("frequencyPenalty", B),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "存在惩罚",
          value: c.parameters.presencePenalty,
          onChange: (B) => j("presencePenalty", B),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(st, { title: "上下文设置", description: "控制发送给模型的上下文内容", children: [
      /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "聊天历史条数",
          value: c.context.maxChatHistory,
          onChange: (B) => D("maxChatHistory", B),
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
          checked: c.context.includeWorldInfo,
          onChange: (B) => D("includeWorldInfo", B),
          description: "是否在提示词中包含已激活的世界书内容"
        }
      ),
      c.context.includeWorldInfo && /* @__PURE__ */ i.jsx(
        Ot,
        {
          label: "世界书 Token 预算",
          value: c.context.worldInfoBudget,
          onChange: (B) => D("worldInfoBudget", B),
          min: 256,
          max: 8192,
          step: 256,
          showSlider: !1,
          description: "分配给世界书内容的最大 token 数"
        }
      )
    ] })
  ] });
}, S2 = [
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
}, Xm = ["ollama", "vllm"], Vm = ["openai", "cohere", "jina", "voyage"], j2 = ({
  config: c,
  onChange: o
}) => {
  var _;
  const f = (E) => {
    o({ ...c, ...E });
  }, s = (E) => {
    f({
      source: E,
      model: Qm[E],
      apiUrl: Xm.includes(E) ? c.apiUrl : void 0,
      apiKey: Vm.includes(E) ? c.apiKey : void 0
    });
  }, h = Xm.includes(c.source), b = Vm.includes(c.source);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(st, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "向量源",
          value: c.source,
          onChange: (E) => s(E),
          options: S2,
          description: "选择向量化服务提供商"
        }
      ),
      h && /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API URL",
          type: "url",
          value: c.apiUrl || "",
          onChange: (E) => f({ apiUrl: E }),
          placeholder: c.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${c.source} 服务的 API 端点`
        }
      ),
      b && /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "API Key",
          type: "password",
          value: c.apiKey || "",
          onChange: (E) => f({ apiKey: E }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "模型名称",
          value: c.model || "",
          onChange: (E) => f({ model: E }),
          placeholder: Qm[c.source],
          description: "使用的向量化模型"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(st, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ i.jsx(
      ot,
      {
        label: "向量维度",
        value: ((_ = c.dimensions) == null ? void 0 : _.toString()) || "",
        onChange: (E) => {
          const x = parseInt(E, 10);
          f({ dimensions: isNaN(x) ? void 0 : x });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, N2 = [
  "BAAI/bge-reranker-v2-m3",
  "BAAI/bge-reranker-base",
  "BAAI/bge-reranker-large",
  "cross-encoder/ms-marco-MiniLM-L-12-v2",
  "Xenova/ms-marco-MiniLM-L-6-v2"
], T2 = ({
  config: c,
  onChange: o
}) => {
  const f = (s) => {
    o({ ...c, ...s });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsx(st, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ i.jsx(
      qn,
      {
        label: "启用 Rerank",
        checked: c.enabled,
        onChange: (s) => f({ enabled: s }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    c.enabled && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs(st, { title: "API 配置", children: [
        /* @__PURE__ */ i.jsx(
          ot,
          {
            label: "API URL",
            type: "url",
            value: c.url,
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
            value: c.apiKey,
            onChange: (s) => f({ apiKey: s }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ i.jsx(
            ot,
            {
              label: "模型名称",
              value: c.model,
              onChange: (s) => f({ model: s }),
              placeholder: "BAAI/bge-reranker-v2-m3",
              description: "使用的 Rerank 模型",
              required: !0
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("span", { className: "block text-[10px] text-muted-foreground mb-2", children: "常用模型：" }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: N2.map((s) => /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `
                                                px-2.5 py-1 border rounded text-xs cursor-pointer transition-all 
                                                ${c.model === s ? "bg-accent border-input text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}
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
          Ot,
          {
            label: "Top-N",
            value: c.topN,
            onChange: (s) => f({ topN: s }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ i.jsx(
          Ot,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: c.hybridAlpha,
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
], E2 = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, _2 = {
  maxChatHistory: 10,
  includeWorldInfo: !0,
  worldInfoBudget: 2048
}, z2 = {
  source: "transformers"
}, C2 = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function m0(c = "默认预设") {
  const o = Date.now();
  return {
    id: `preset_${o}`,
    name: c,
    source: "tavern",
    parameters: { ...E2 },
    context: { ..._2 },
    isDefault: !0,
    createdAt: o,
    updatedAt: o
  };
}
function Pl(c, o, f = {}) {
  const s = Date.now();
  return {
    id: `template_${s}_${Math.random().toString(36).slice(2, 8)}`,
    name: c,
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
function A2() {
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
const M2 = {
  enabled: !0,
  includeGlobal: !0
}, O2 = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  floorLimit: 50,
  countLimit: 5
};
function D2() {
  return {
    llmPresets: [m0()],
    selectedPresetId: null,
    vectorConfig: { ...z2 },
    rerankConfig: { ...C2 },
    promptTemplates: A2(),
    worldbookConfig: { ...M2 }
  };
}
function R2(c) {
  switch (c) {
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
function U2(c) {
  var o;
  return ((o = gi.find((f) => f.value === c)) == null ? void 0 : o.label) || c;
}
const w2 = ({
  template: c,
  isSelected: o = !1,
  onSelect: f,
  onCopy: s,
  onDelete: h,
  onToggleEnabled: b,
  onImport: _
}) => {
  const E = w.useRef(null), x = (C) => {
    C.stopPropagation();
    const k = {
      version: "1.0",
      exportedAt: Date.now(),
      template: {
        name: c.name,
        category: c.category,
        boundPresetId: c.boundPresetId,
        systemPrompt: c.systemPrompt,
        userPromptTemplate: c.userPromptTemplate,
        outputFormat: c.outputFormat,
        availableVariables: c.availableVariables
      }
    }, $ = new Blob([JSON.stringify(k, null, 2)], { type: "application/json" }), ue = URL.createObjectURL($), W = document.createElement("a");
    W.href = ue, W.download = `engram_template_${c.name.replace(/\s+/g, "_")}.json`, W.click(), URL.revokeObjectURL(ue);
  }, j = (C) => {
    var k;
    C.stopPropagation(), (k = E.current) == null || k.click();
  }, D = (C) => {
    var ue;
    const k = (ue = C.target.files) == null ? void 0 : ue[0];
    if (!k || !_) return;
    const $ = new FileReader();
    $.onload = (W) => {
      var Ce;
      try {
        const L = JSON.parse((Ce = W.target) == null ? void 0 : Ce.result);
        if (L.version && L.template) {
          const Ee = Pl(
            L.template.name,
            L.template.category,
            {
              enabled: c.enabled,
              // 保持当前启用状态
              isBuiltIn: c.isBuiltIn,
              // 保持内置状态
              boundPresetId: L.template.boundPresetId,
              systemPrompt: L.template.systemPrompt,
              userPromptTemplate: L.template.userPromptTemplate,
              outputFormat: L.template.outputFormat,
              availableVariables: L.template.availableVariables
            }
          );
          Ee.id = c.id, _(Ee);
        }
      } catch (L) {
        console.error("导入失败:", L);
      }
    }, $.readAsText(k), E.current && (E.current.value = "");
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
                        ${c.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (C) => {
                C.stopPropagation(), b == null || b(!c.enabled);
              },
              children: /* @__PURE__ */ i.jsx(a0, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${o ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: c.name }),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ i.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${R2(c.category)}`, children: U2(c.category) }),
                c.isBuiltIn && /* @__PURE__ */ i.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ i.jsx("span", { className: "truncate max-w-[120px]", children: c.boundPresetId ? `BOUND: ${c.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ i.jsx("span", { children: c.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${o || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: j, title: "Import", children: /* @__PURE__ */ i.jsx(yg, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: x, title: "Export", children: /* @__PURE__ */ i.jsx(Pm, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (C) => {
            C.stopPropagation(), s == null || s();
          }, title: "Copy", children: /* @__PURE__ */ i.jsx(Im, { size: 12 }) }),
          !c.isBuiltIn && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (C) => {
            C.stopPropagation(), h == null || h();
          }, title: "Delete", children: /* @__PURE__ */ i.jsx(Yn, { size: 12 }) })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            ref: E,
            type: "file",
            accept: ".json",
            onChange: D,
            className: "hidden"
          }
        )
      ]
    }
  );
}, k2 = ({
  templates: c,
  selectedId: o,
  onSelect: f,
  onAdd: s,
  onUpdate: h,
  onDelete: b
}) => {
  const _ = () => {
    const C = Pl(
      `新模板 ${c.length + 1}`,
      "text_summary"
    );
    s(C), f(C);
  }, E = (C) => {
    const k = Pl(
      `${C.name} (副本)`,
      C.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: C.boundPresetId,
        systemPrompt: C.systemPrompt,
        userPromptTemplate: C.userPromptTemplate,
        outputFormat: C.outputFormat,
        availableVariables: [...C.availableVariables]
      }
    );
    s(k);
  }, x = (C, k) => {
    k && c.filter(($) => $.category === C.category && $.id !== C.id && $.enabled).forEach(($) => h({ ...$, enabled: !1 })), h({ ...C, enabled: k });
  }, j = (C) => {
    h(C);
  }, D = gi.map((C) => ({
    ...C,
    templates: c.filter((k) => k.category === C.value)
  })).filter((C) => C.templates.length > 0);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: _,
          children: /* @__PURE__ */ i.jsx(fs, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      D.map((C) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          C.label,
          /* @__PURE__ */ i.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: C.templates.map((k) => /* @__PURE__ */ i.jsx(
          w2,
          {
            template: k,
            isSelected: o === k.id,
            onSelect: () => f(k),
            onCopy: () => E(k),
            onDelete: () => b(k),
            onToggleEnabled: ($) => x(k, $),
            onImport: j
          },
          k.id
        )) })
      ] }, C.value)),
      c.length === 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ i.jsx(ss, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, B2 = [
  { value: "plain", label: "纯文本" },
  { value: "markdown", label: "Markdown" },
  { value: "json", label: "JSON" }
], H2 = ({
  template: c,
  llmPresets: o,
  defaultPresetId: f,
  onChange: s
}) => {
  var _, E;
  const h = [
    { value: "", label: "使用默认预设" + (f ? ` (${((_ = o.find((x) => x.id === f)) == null ? void 0 : _.name) || f})` : "") },
    ...o.map((x) => ({ value: x.id, label: x.name }))
  ], b = (x) => {
    s({ ...c, ...x, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ i.jsxs(st, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "模板名称",
          value: c.name,
          onChange: (x) => b({ name: x }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: c.isBuiltIn
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "模板分类",
          value: c.category,
          onChange: (x) => b({ category: x }),
          options: gi.map((x) => ({ value: x.value, label: x.label })),
          description: (E = gi.find((x) => x.value === c.category)) == null ? void 0 : E.description
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "模型来源",
          value: c.boundPresetId || "",
          onChange: (x) => b({ boundPresetId: x || null }),
          options: h,
          description: "选择用于此模板的 LLM 预设"
        }
      ),
      /* @__PURE__ */ i.jsx(
        ea,
        {
          label: "输出格式",
          value: c.outputFormat,
          onChange: (x) => b({ outputFormat: x }),
          options: B2
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(st, { title: "提示词内容", description: "支持变量：{{chatHistory}}, {{context}}, {{char}}, {{user}}, {{userInput}}", children: [
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "系统提示词",
          value: c.systemPrompt,
          onChange: (x) => b({ systemPrompt: x }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ i.jsx(
        ot,
        {
          label: "用户提示词模板",
          value: c.userPromptTemplate,
          onChange: (x) => b({ userPromptTemplate: x }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用变量" }),
      /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: c.availableVariables.map((x) => /* @__PURE__ */ i.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px] text-primary font-mono", children: x }, x)) })
    ] })
  ] });
}, q2 = ({
  rules: c,
  selectedId: o,
  onSelect: f,
  onToggle: s,
  onDelete: h,
  onAdd: b,
  onReset: _
}) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: _,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: b,
          children: /* @__PURE__ */ i.jsx(n0, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
    c.map((E) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${o === E.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => f(E.id),
        children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${E.enabled ? o === E.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (x) => {
                x.stopPropagation(), s(E.id);
              },
              title: E.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ i.jsx(a0, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${o === E.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!E.enabled && "opacity-50 line-through"}`, children: E.name }) }),
            /* @__PURE__ */ i.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ i.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              E.pattern,
              "/",
              E.flags
            ] }) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: `flex items-center ${o === E.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (x) => {
                x.stopPropagation(), h(E.id);
              },
              children: /* @__PURE__ */ i.jsx(Yn, { size: 12 })
            }
          ) })
        ]
      },
      E.id
    )),
    c.length === 0 && /* @__PURE__ */ i.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), bi = [
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
class h0 {
  constructor(o) {
    Dl(this, "rules", []);
    this.rules = o || [...bi];
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
    this.rules = [...bi];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((o) => o.enabled).length;
  }
}
const fb = new h0(), L2 = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], Y2 = ({ rule: c, onChange: o }) => {
  const [f, s] = w.useState(""), [h, b] = w.useState(""), [_, E] = w.useState({ valid: !0 }), x = new h0();
  w.useEffect(() => {
    const D = x.validatePattern(c.pattern, c.flags);
    E(D);
  }, [c.pattern, c.flags]), w.useEffect(() => {
    if (f && _.valid) {
      const D = x.processWithRule(f, c);
      b(D);
    } else
      b("");
  }, [f, c, _.valid]);
  const j = (D) => {
    const C = c.flags.split(""), k = C.indexOf(D);
    k >= 0 ? C.splice(k, 1) : C.push(D), o({ flags: C.join("") });
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
            value: c.name,
            onChange: (D) => o({ name: D.target.value }),
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
            value: c.description || "",
            onChange: (D) => o({ description: D.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          _.valid ? /* @__PURE__ */ i.jsx(Wm, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ i.jsx(cs, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${_.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: c.pattern,
            onChange: (D) => o({ pattern: D.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !_.valid && _.error && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-red-500", children: _.error })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: c.replacement,
            onChange: (D) => o({ replacement: D.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: L2.map((D) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${c.flags.includes(D.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => j(D.value),
            title: D.description,
            children: [
              D.label,
              " (",
              D.value,
              ")"
            ]
          },
          D.value
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
            onChange: (D) => s(D.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      f && _.valid && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ i.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: h || /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ i.jsx(Bp, { size: 16, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        "正则规则会在发送给 LLM 之前应用于聊天内容，用于清理干扰信息。 常用规则如移除思维链 ",
        /* @__PURE__ */ i.jsx("code", { className: "bg-blue-500/20 px-1 rounded", children: "<think>" }),
        " 标签等。"
      ] })
    ] })
  ] });
}, G2 = ({
  config: c,
  onChange: o
}) => {
  const f = (s) => {
    o({
      ...c,
      [s]: !c[s]
    });
  };
  return /* @__PURE__ */ i.jsx("div", { className: "", children: /* @__PURE__ */ i.jsxs(st, { title: "世界书配置", description: "总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。", children: [
    /* @__PURE__ */ i.jsx(
      qn,
      {
        label: "启用世界书",
        description: "总结时注入始终激活（蓝灯）的世界书条目",
        checked: c.enabled,
        onChange: () => f("enabled")
      }
    ),
    /* @__PURE__ */ i.jsx(
      qn,
      {
        label: "包含全局世界书",
        description: "关闭后只读取角色世界书和聊天世界书",
        checked: c.includeGlobal,
        onChange: () => f("includeGlobal"),
        disabled: !c.enabled
      }
    )
  ] }) });
}, Q2 = ({ tabs: c, activeTab: o, onChange: f }) => /* @__PURE__ */ i.jsx("div", { className: "flex overflow-x-auto gap-2 mb-8 pb-1 no-scrollbar px-4 md:px-0 border-b border-border", children: c.map((s) => /* @__PURE__ */ i.jsxs(
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
)) });
function X2() {
  const [c, o] = w.useState(D2), [f, s] = w.useState(null), [h, b] = w.useState(null), [_, E] = w.useState(!1), [x, j] = w.useState([...bi]), [D, C] = w.useState(null);
  w.useEffect(() => {
  }, []);
  const k = w.useCallback((G) => {
    o((y) => ({ ...y, selectedPresetId: G.id })), s(G);
  }, []), $ = w.useCallback(() => {
    const G = m0(`预设 ${c.llmPresets.length + 1}`);
    G.isDefault = !1, o((y) => ({
      ...y,
      llmPresets: [...y.llmPresets, G],
      selectedPresetId: G.id
    })), s(G), E(!0);
  }, [c.llmPresets.length]), ue = w.useCallback((G) => {
    o((y) => ({
      ...y,
      llmPresets: y.llmPresets.map((U) => U.id === G.id ? G : U)
    })), s(G), E(!0);
  }, []), W = w.useCallback((G) => {
    const y = {
      ...G,
      id: `preset_${Date.now()}`,
      name: `${G.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    o((U) => ({ ...U, llmPresets: [...U.llmPresets, y] })), E(!0);
  }, []), Ce = w.useCallback((G) => {
    G.isDefault || (o((y) => ({
      ...y,
      llmPresets: y.llmPresets.filter((U) => U.id !== G.id),
      selectedPresetId: y.selectedPresetId === G.id ? null : y.selectedPresetId
    })), s((y) => (y == null ? void 0 : y.id) === G.id ? null : y), E(!0));
  }, []), L = w.useCallback((G) => {
    b(G);
  }, []), Ee = w.useCallback((G) => {
    o((y) => ({
      ...y,
      promptTemplates: [...y.promptTemplates, G]
    })), E(!0);
  }, []), B = w.useCallback((G) => {
    o((y) => ({
      ...y,
      promptTemplates: y.promptTemplates.map((U) => U.id === G.id ? G : U)
    })), b(G), E(!0);
  }, []), me = w.useCallback((G) => {
    G.isBuiltIn || (o((y) => ({
      ...y,
      promptTemplates: y.promptTemplates.filter((U) => U.id !== G.id)
    })), b((y) => (y == null ? void 0 : y.id) === G.id ? null : y), E(!0));
  }, []), qe = w.useCallback((G) => {
    o((y) => ({ ...y, vectorConfig: G })), E(!0);
  }, []), Z = w.useCallback((G) => {
    o((y) => ({ ...y, rerankConfig: G })), E(!0);
  }, []), X = w.useCallback((G) => {
    o((y) => ({ ...y, worldbookConfig: G })), E(!0);
  }, []), be = w.useCallback((G) => {
    const y = x.find((U) => U.id === G);
    C(y || null);
  }, [x]), Qe = w.useCallback(() => {
    const G = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      description: ""
    };
    j((y) => [...y, G]), C(G), E(!0);
  }, []), et = w.useCallback((G) => {
    if (!D) return;
    const y = { ...D, ...G };
    C(y), j((U) => U.map((K) => K.id === y.id ? y : K)), E(!0);
  }, [D]), tt = w.useCallback((G) => {
    j((y) => y.map(
      (U) => U.id === G ? { ...U, enabled: !U.enabled } : U
    )), E(!0);
  }, []), se = w.useCallback((G) => {
    j((y) => y.filter((U) => U.id !== G)), C((y) => (y == null ? void 0 : y.id) === G ? null : y), E(!0);
  }, []), Gt = w.useCallback(() => {
    j([...bi]), C(null), E(!0);
  }, []), Dt = w.useCallback(() => {
    console.log("保存配置:", c, x), E(!1);
  }, [c, x]);
  return {
    settings: c,
    editingPreset: f,
    editingTemplate: h,
    hasChanges: _,
    regexRules: x,
    editingRule: D,
    selectPreset: k,
    addPreset: $,
    updatePreset: ue,
    copyPreset: W,
    deletePreset: Ce,
    selectTemplate: L,
    addTemplate: Ee,
    updateTemplate: B,
    deleteTemplate: me,
    updateVectorConfig: qe,
    updateRerankConfig: Z,
    updateWorldbookConfig: X,
    selectRule: be,
    addRule: Qe,
    updateRule: et,
    toggleRule: tt,
    deleteRule: se,
    resetRules: Gt,
    save: Dt
  };
}
const V2 = [
  { id: "llm", label: "LLM 预设", icon: e0 },
  { id: "vector", label: "向量化", icon: yi },
  { id: "rerank", label: "Rerank", icon: t0 }
], Z2 = () => {
  const [c, o] = w.useState("model"), [f, s] = w.useState("llm"), {
    settings: h,
    editingPreset: b,
    editingTemplate: _,
    hasChanges: E,
    regexRules: x,
    editingRule: j,
    selectPreset: D,
    addPreset: C,
    updatePreset: k,
    copyPreset: $,
    deletePreset: ue,
    selectTemplate: W,
    addTemplate: Ce,
    updateTemplate: L,
    deleteTemplate: Ee,
    updateVectorConfig: B,
    updateRerankConfig: me,
    selectRule: qe,
    addRule: Z,
    updateRule: X,
    toggleRule: be,
    deleteRule: Qe,
    resetRules: et,
    save: tt
  } = X2();
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(
      xi,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则",
        actions: E && /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 text-sm shadow-sm",
            onClick: tt,
            children: [
              /* @__PURE__ */ i.jsx(ng, { size: 16 }),
              "保存更改"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsx(
      Q2,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: c,
        onChange: (se) => o(se)
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      c === "model" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-1 border-b border-border pb-1", children: V2.map((se) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative
                                        ${f === se.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            onClick: () => s(se.id),
            children: [
              /* @__PURE__ */ i.jsx(se.icon, { size: 14 }),
              se.label,
              f === se.id && /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-foreground" })
            ]
          },
          se.id
        )) }),
        f === "llm" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ i.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: C, children: /* @__PURE__ */ i.jsx(fs, { size: 16 }) })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: h.llmPresets.map((se) => /* @__PURE__ */ i.jsx(
              g2,
              {
                preset: se,
                isSelected: h.selectedPresetId === se.id,
                onSelect: () => D(se),
                onEdit: () => D(se),
                onCopy: () => $(se),
                onDelete: () => ue(se)
              },
              se.id
            )) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "flex flex-col", children: b ? /* @__PURE__ */ i.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ i.jsx(x2, { preset: b, onChange: k }) }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ i.jsx(e0, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        f === "vector" && /* @__PURE__ */ i.jsx(j2, { config: h.vectorConfig, onChange: B }),
        f === "rerank" && /* @__PURE__ */ i.jsx(T2, { config: h.rerankConfig, onChange: me })
      ] }),
      c === "prompt" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          k2,
          {
            templates: h.promptTemplates,
            selectedId: (_ == null ? void 0 : _.id) || null,
            onSelect: W,
            onAdd: Ce,
            onUpdate: L,
            onDelete: Ee
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: _ ? /* @__PURE__ */ i.jsx(
          H2,
          {
            template: _,
            llmPresets: h.llmPresets,
            defaultPresetId: h.selectedPresetId,
            onChange: L
          }
        ) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(ss, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      c === "regex" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          q2,
          {
            rules: x,
            selectedId: (j == null ? void 0 : j.id) || null,
            onSelect: qe,
            onToggle: be,
            onDelete: Qe,
            onAdd: Z,
            onReset: et
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: j ? /* @__PURE__ */ i.jsx(Y2, { rule: j, onChange: X }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(n0, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      c === "worldbook" && /* @__PURE__ */ i.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ i.jsx(
        G2,
        {
          config: h.worldbookConfig,
          onChange: (se) => {
          }
        }
      ) })
    ] })
  ] });
}, K2 = {
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
}, J2 = {
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
}, $2 = {
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
}, F2 = {
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
}, W2 = {
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
}, I2 = {
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
  sillytavern: I2,
  // SillyTavern 继承主题
  paperLight: K2,
  twitterDark: $2,
  claudeDark: J2,
  catppuccin: W2,
  discord: F2
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
    const s = document.documentElement, h = (_, E) => {
      s.style.setProperty(_, E);
    };
    Object.entries(f.colors).forEach(([_, E]) => {
      let x = `--${_.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      x = x.replace(/(\d+)/, "-$1"), h(x, E);
    }), Object.entries(f.variables).forEach(([_, E]) => {
      h(`--${_}`, E);
    }), o !== "paperLight" ? s.classList.add("dark") : s.classList.remove("dark");
  }
}
Dl(Ln, "STORAGE_KEY", "engram-theme"), Dl(Ln, "currentTheme", "claudeDark");
const P2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Ln
}, Symbol.toStringTag, { value: "Module" })), eb = () => {
  const [c, o] = w.useState("claudeDark");
  w.useEffect(() => {
    o(Ln.getTheme());
  }, []);
  const f = (h) => {
    Ln.setTheme(h), La.set("theme", h), o(h);
  }, s = Object.entries(di).map(([h, b]) => {
    let _ = b.colors.background, E = b.colors.primary;
    return {
      id: h,
      name: b.name,
      background: _,
      sidebar: b.colors.sidebar,
      // Add sidebar color
      primary: E
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
                            ${c === h.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
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
          /* @__PURE__ */ i.jsx("span", { className: `text-sm font-medium ${c === h.id ? "text-primary" : "text-muted-foreground"}`, children: h.name }),
          c === h.id && /* @__PURE__ */ i.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      h.id
    )) })
  ] });
}, tb = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(xi, { title: "设置", subtitle: "扩展全局选项" }),
  /* @__PURE__ */ i.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ i.jsx(eb, {}),
    /* @__PURE__ */ i.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
      /* @__PURE__ */ i.jsx(mg, { size: 32 }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
    ] }) })
  ] })
] }), lb = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(xi, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ i.jsx(sp, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ i.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), ab = [
  { id: "token", label: "Token 数", description: "总结内容达到 Token 上限时触发", icon: fp },
  { id: "floor", label: "楼层数", description: "总结覆盖的楼层达到上限时触发", icon: t0 },
  { id: "count", label: "总结次数", description: "执行总结的次数达到上限时触发", icon: wp }
], nb = ({
  config: c,
  onChange: o
}) => {
  const f = (b) => {
    o({ ...c, enabled: b });
  }, s = (b) => {
    o({ ...c, trigger: b });
  }, h = (b, _) => {
    o({ ...c, [b]: _ });
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
            checked: c.enabled,
            onChange: f
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: `space-y-6 transition-opacity ${c.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "触发条件" }),
        /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-3 gap-3", children: ab.map((b) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            onClick: () => s(b.id),
            className: `
                                    flex flex-col items-center gap-2 p-3 rounded-lg border transition-all text-sm
                                    ${c.trigger === b.id ? "border-primary bg-primary/10 text-primary font-medium shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-muted hover:border-primary/50"}
                                `,
            children: [
              Km.createElement(b.icon, { className: "w-4 h-4" }),
              /* @__PURE__ */ i.jsx("span", { children: b.label })
            ]
          },
          b.id
        )) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
        c.trigger === "token" && /* @__PURE__ */ i.jsx(
          Ot,
          {
            label: "Token 上限",
            description: "当总结内容 Token 超过此值时触发精简",
            value: c.tokenLimit,
            onChange: (b) => h("tokenLimit", b),
            min: 1024,
            max: 16384,
            step: 512
          }
        ),
        c.trigger === "floor" && /* @__PURE__ */ i.jsx(
          Ot,
          {
            label: "楼层上限",
            description: "当总结覆盖楼层数超过此值时触发精简",
            value: c.floorLimit,
            onChange: (b) => h("floorLimit", b),
            min: 10,
            max: 200,
            step: 10
          }
        ),
        c.trigger === "count" && /* @__PURE__ */ i.jsx(
          Ot,
          {
            label: "总结次数上限",
            description: "当执行总结次数超过此值时触发精简",
            value: c.countLimit,
            onChange: (b) => h("countLimit", b),
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
            /* @__PURE__ */ i.jsx(ig, { className: "w-4 h-4" }),
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
}, ub = [
  { id: "summarize", label: "总结剧情", description: "将对话内容提炼为剧情摘要" },
  { id: "vectorize", label: "向量化", description: "将内容转换为向量存储" },
  { id: "batch", label: "批量处理", description: "批量执行记忆操作" }
], ib = ({ onNavigate: c }) => {
  const [o, f] = w.useState("summarize"), [s, h] = w.useState(null), [b, _] = w.useState(!1), [E, x] = w.useState({
    autoEnabled: !0,
    floorInterval: 10
  }), [j, D] = w.useState({ ...O2 }), [C, k] = w.useState(0);
  w.useEffect(() => {
    $();
  }, []);
  const $ = async () => {
    try {
      const { summarizerService: L } = await import("./index-DslV1Ddl.js");
      h(L.getStatus());
      const { WorldInfoService: Ee } = await import("./WorldInfoService-CizlUCtc.js"), B = await Ee.getActivatedWorldInfo();
      if (B) {
        const me = await Ee.countTokens(B);
        k(me);
      }
    } catch (L) {
      console.error("加载 Summarizer 状态失败:", L);
    }
  }, ue = async () => {
    try {
      const { summarizerService: L } = await import("./index-DslV1Ddl.js");
      L.start(), await $();
    } catch (L) {
      console.error("启动失败:", L);
    }
  }, W = async () => {
    try {
      const { summarizerService: L } = await import("./index-DslV1Ddl.js");
      L.stop(), await $();
    } catch (L) {
      console.error("停止失败:", L);
    }
  }, Ce = async () => {
    _(!0);
    try {
      const { summarizerService: L } = await import("./index-DslV1Ddl.js");
      await L.triggerSummary(!0), await $();
    } catch (L) {
      console.error("触发失败:", L);
    } finally {
      _(!1);
    }
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 p-4 h-full overflow-hidden", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-border", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ i.jsx(yi, { size: 24, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("h2", { className: "text-2xl font-semibold text-foreground m-0", children: "处理中心" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors",
            onClick: () => c == null ? void 0 : c("/dev"),
            children: [
              /* @__PURE__ */ i.jsx(Op, { size: 14 }),
              "模型日志"
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors",
            onClick: () => c == null ? void 0 : c("/api"),
            children: [
              /* @__PURE__ */ i.jsx(ss, { size: 14 }),
              "提示词模板"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex gap-2 flex-wrap", children: ub.map((L) => /* @__PURE__ */ i.jsx(
      "button",
      {
        className: `inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium transition-all
                            ${o === L.id ? "bg-primary-20 text-primary border-primary-30" : "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground hover:border-border"}`,
        onClick: () => f(L.id),
        children: L.label
      },
      L.id
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
                onClick: $,
                title: "刷新状态",
                children: /* @__PURE__ */ i.jsx(Wr, { size: 14 })
              }
            )
          ] }),
          s ? /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1 p-3 bg-muted/50 rounded-lg border border-border/50", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground text-[10px] uppercase tracking-wider", children: "运行状态" }),
              /* @__PURE__ */ i.jsxs("span", { className: `flex items-center gap-1.5 text-sm font-medium ${s.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                s.running ? /* @__PURE__ */ i.jsx(vp, { size: 14 }) : /* @__PURE__ */ i.jsx(cs, { size: 14 }),
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
              /* @__PURE__ */ i.jsx("span", { className: "text-primary font-mono text-sm font-medium", children: C.toLocaleString() })
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
                /* @__PURE__ */ i.jsx($p, { size: 16 }),
                "停止监听"
              ]
            }
          ) : /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: `inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border
                                        bg-primary text-primary-foreground border-primary hover:bg-primary-90 active:scale-95`,
              onClick: ue,
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
              disabled: b || (s == null ? void 0 : s.isSummarizing),
              children: [
                /* @__PURE__ */ i.jsx(Wr, { size: 16, className: b ? "animate-spin" : "" }),
                b ? "处理中..." : "手动触发"
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
                  onClick: () => x((L) => ({ ...L, autoEnabled: !L.autoEnabled })),
                  className: `relative w-9 h-5 rounded-full transition-colors ${E.autoEnabled ? "bg-primary" : "bg-input"}`,
                  children: /* @__PURE__ */ i.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${E.autoEnabled ? "translate-x-4" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: E.autoEnabled ? "" : "opacity-50 grayscale pointer-events-none", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "楼层间隔" }),
                /* @__PURE__ */ i.jsx("span", { className: "text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded", children: E.floorInterval })
              ] }),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "range",
                  min: "1",
                  max: "50",
                  value: E.floorInterval,
                  onChange: (L) => x((Ee) => ({ ...Ee, floorInterval: Number(L.target.value) })),
                  disabled: !E.autoEnabled,
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
          nb,
          {
            config: j,
            onChange: D
          }
        ) })
      ] }),
      o === "vectorize" && /* @__PURE__ */ i.jsx("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground", children: "🚧 向量化功能开发中..." }) }),
      o === "batch" && /* @__PURE__ */ i.jsx("div", { className: "bg-card border border-border rounded-lg p-4 shadow-sm", children: /* @__PURE__ */ i.jsx("p", { className: "text-muted-foreground", children: "🚧 批量处理功能开发中..." }) })
    ] })
  ] });
}, cb = ({ onClose: c }) => {
  const [o, f] = w.useState("dashboard"), s = () => {
    switch (o) {
      case "dashboard":
        return /* @__PURE__ */ i.jsx(Lm, { onNavigate: f });
      case "presets":
        return /* @__PURE__ */ i.jsx(Z2, {});
      case "graph":
        return /* @__PURE__ */ i.jsx(l2, {});
      case "devlog":
        return /* @__PURE__ */ i.jsx(p2, {});
      case "settings":
        return /* @__PURE__ */ i.jsx(tb, {});
      case "memory":
        return /* @__PURE__ */ i.jsx(lb, {});
      case "processing":
        return /* @__PURE__ */ i.jsx(ib, {});
      default:
        return /* @__PURE__ */ i.jsx(Lm, {});
    }
  };
  return /* @__PURE__ */ i.jsx(Sg, { activeTab: o, setActiveTab: f, onClose: c, children: s() });
};
Ig((c, o) => {
  const f = Jh.createRoot(c);
  return f.render(Km.createElement(cb, { onClose: o })), f;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", qm) : qm();
export {
  bi as D,
  si as M,
  h0 as R,
  La as S,
  Zm as a,
  $g as b,
  sb as c,
  f0 as g,
  ob as i,
  fb as r
};
//# sourceMappingURL=index-BvcZWTGb.js.map
