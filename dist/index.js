var i4 = Object.defineProperty;
var o4 = (c, s, o) => s in c ? i4(c, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : c[s] = o;
var He = (c, s, o) => o4(c, typeof s != "symbol" ? s + "" : s, o);
function ei(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Nc = { exports: {} }, rr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f1;
function c4() {
  if (f1) return rr;
  f1 = 1;
  var c = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(u, f, m) {
    var x = null;
    if (m !== void 0 && (x = "" + m), f.key !== void 0 && (x = "" + f.key), "key" in f) {
      m = {};
      for (var p in f)
        p !== "key" && (m[p] = f[p]);
    } else m = f;
    return f = m.ref, {
      $$typeof: c,
      type: u,
      key: x,
      ref: f !== void 0 ? f : null,
      props: m
    };
  }
  return rr.Fragment = s, rr.jsx = o, rr.jsxs = o, rr;
}
var m1;
function u4() {
  return m1 || (m1 = 1, Nc.exports = c4()), Nc.exports;
}
var r = u4(), Ec = { exports: {} }, ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h1;
function d4() {
  if (h1) return ue;
  h1 = 1;
  var c = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), x = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), z = Symbol.iterator;
  function M(C) {
    return C === null || typeof C != "object" ? null : (C = z && C[z] || C["@@iterator"], typeof C == "function" ? C : null);
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
  }, R = Object.assign, X = {};
  function V(C, H, K) {
    this.props = C, this.context = H, this.refs = X, this.updater = K || _;
  }
  V.prototype.isReactComponent = {}, V.prototype.setState = function(C, H) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, H, "setState");
  }, V.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function W() {
  }
  W.prototype = V.prototype;
  function J(C, H, K) {
    this.props = C, this.context = H, this.refs = X, this.updater = K || _;
  }
  var re = J.prototype = new W();
  re.constructor = J, R(re, V.prototype), re.isPureReactComponent = !0;
  var ge = Array.isArray;
  function $() {
  }
  var Y = { H: null, A: null, T: null, S: null }, se = Object.prototype.hasOwnProperty;
  function we(C, H, K) {
    var D = K.ref;
    return {
      $$typeof: c,
      type: C,
      key: H,
      ref: D !== void 0 ? D : null,
      props: K
    };
  }
  function ce(C, H) {
    return we(C.type, H, C.props);
  }
  function B(C) {
    return typeof C == "object" && C !== null && C.$$typeof === c;
  }
  function te(C) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(K) {
      return H[K];
    });
  }
  var be = /\/+/g;
  function he(C, H) {
    return typeof C == "object" && C !== null && C.key != null ? te("" + C.key) : H.toString(36);
  }
  function Ge(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then($, $) : (C.status = "pending", C.then(
          function(H) {
            C.status === "pending" && (C.status = "fulfilled", C.value = H);
          },
          function(H) {
            C.status === "pending" && (C.status = "rejected", C.reason = H);
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
  function w(C, H, K, D, G) {
    var Z = typeof C;
    (Z === "undefined" || Z === "boolean") && (C = null);
    var oe = !1;
    if (C === null) oe = !0;
    else
      switch (Z) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case c:
            case s:
              oe = !0;
              break;
            case y:
              return oe = C._init, w(
                oe(C._payload),
                H,
                K,
                D,
                G
              );
          }
      }
    if (oe)
      return G = G(C), oe = D === "" ? "." + he(C, 0) : D, ge(G) ? (K = "", oe != null && (K = oe.replace(be, "$&/") + "/"), w(G, H, K, "", function(Zn) {
        return Zn;
      })) : G != null && (B(G) && (G = ce(
        G,
        K + (G.key == null || C && C.key === G.key ? "" : ("" + G.key).replace(
          be,
          "$&/"
        ) + "/") + oe
      )), H.push(G)), 1;
    oe = 0;
    var Re = D === "" ? "." : D + ":";
    if (ge(C))
      for (var Te = 0; Te < C.length; Te++)
        D = C[Te], Z = Re + he(D, Te), oe += w(
          D,
          H,
          K,
          Z,
          G
        );
    else if (Te = M(C), typeof Te == "function")
      for (C = Te.call(C), Te = 0; !(D = C.next()).done; )
        D = D.value, Z = Re + he(D, Te++), oe += w(
          D,
          H,
          K,
          Z,
          G
        );
    else if (Z === "object") {
      if (typeof C.then == "function")
        return w(
          Ge(C),
          H,
          K,
          D,
          G
        );
      throw H = String(C), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return oe;
  }
  function Q(C, H, K) {
    if (C == null) return C;
    var D = [], G = 0;
    return w(C, D, "", "", function(Z) {
      return H.call(K, Z, G++);
    }), D;
  }
  function ee(C) {
    if (C._status === -1) {
      var H = C._result;
      H = H(), H.then(
        function(K) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = K);
        },
        function(K) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = K);
        }
      ), C._status === -1 && (C._status = 0, C._result = H);
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ie = typeof reportError == "function" ? reportError : function(C) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof C == "object" && C !== null && typeof C.message == "string" ? String(C.message) : String(C),
        error: C
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", C);
      return;
    }
    console.error(C);
  }, je = {
    map: Q,
    forEach: function(C, H, K) {
      Q(
        C,
        function() {
          H.apply(this, arguments);
        },
        K
      );
    },
    count: function(C) {
      var H = 0;
      return Q(C, function() {
        H++;
      }), H;
    },
    toArray: function(C) {
      return Q(C, function(H) {
        return H;
      }) || [];
    },
    only: function(C) {
      if (!B(C))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return C;
    }
  };
  return ue.Activity = b, ue.Children = je, ue.Component = V, ue.Fragment = o, ue.Profiler = f, ue.PureComponent = J, ue.StrictMode = u, ue.Suspense = g, ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, ue.__COMPILER_RUNTIME = {
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
  }, ue.cloneElement = function(C, H, K) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var D = R({}, C.props), G = C.key;
    if (H != null)
      for (Z in H.key !== void 0 && (G = "" + H.key), H)
        !se.call(H, Z) || Z === "key" || Z === "__self" || Z === "__source" || Z === "ref" && H.ref === void 0 || (D[Z] = H[Z]);
    var Z = arguments.length - 2;
    if (Z === 1) D.children = K;
    else if (1 < Z) {
      for (var oe = Array(Z), Re = 0; Re < Z; Re++)
        oe[Re] = arguments[Re + 2];
      D.children = oe;
    }
    return we(C.type, G, D);
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
  }, ue.createElement = function(C, H, K) {
    var D, G = {}, Z = null;
    if (H != null)
      for (D in H.key !== void 0 && (Z = "" + H.key), H)
        se.call(H, D) && D !== "key" && D !== "__self" && D !== "__source" && (G[D] = H[D]);
    var oe = arguments.length - 2;
    if (oe === 1) G.children = K;
    else if (1 < oe) {
      for (var Re = Array(oe), Te = 0; Te < oe; Te++)
        Re[Te] = arguments[Te + 2];
      G.children = Re;
    }
    if (C && C.defaultProps)
      for (D in oe = C.defaultProps, oe)
        G[D] === void 0 && (G[D] = oe[D]);
    return we(C, Z, G);
  }, ue.createRef = function() {
    return { current: null };
  }, ue.forwardRef = function(C) {
    return { $$typeof: p, render: C };
  }, ue.isValidElement = B, ue.lazy = function(C) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: C },
      _init: ee
    };
  }, ue.memo = function(C, H) {
    return {
      $$typeof: v,
      type: C,
      compare: H === void 0 ? null : H
    };
  }, ue.startTransition = function(C) {
    var H = Y.T, K = {};
    Y.T = K;
    try {
      var D = C(), G = Y.S;
      G !== null && G(K, D), typeof D == "object" && D !== null && typeof D.then == "function" && D.then($, ie);
    } catch (Z) {
      ie(Z);
    } finally {
      H !== null && K.types !== null && (H.types = K.types), Y.T = H;
    }
  }, ue.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, ue.use = function(C) {
    return Y.H.use(C);
  }, ue.useActionState = function(C, H, K) {
    return Y.H.useActionState(C, H, K);
  }, ue.useCallback = function(C, H) {
    return Y.H.useCallback(C, H);
  }, ue.useContext = function(C) {
    return Y.H.useContext(C);
  }, ue.useDebugValue = function() {
  }, ue.useDeferredValue = function(C, H) {
    return Y.H.useDeferredValue(C, H);
  }, ue.useEffect = function(C, H) {
    return Y.H.useEffect(C, H);
  }, ue.useEffectEvent = function(C) {
    return Y.H.useEffectEvent(C);
  }, ue.useId = function() {
    return Y.H.useId();
  }, ue.useImperativeHandle = function(C, H, K) {
    return Y.H.useImperativeHandle(C, H, K);
  }, ue.useInsertionEffect = function(C, H) {
    return Y.H.useInsertionEffect(C, H);
  }, ue.useLayoutEffect = function(C, H) {
    return Y.H.useLayoutEffect(C, H);
  }, ue.useMemo = function(C, H) {
    return Y.H.useMemo(C, H);
  }, ue.useOptimistic = function(C, H) {
    return Y.H.useOptimistic(C, H);
  }, ue.useReducer = function(C, H, K) {
    return Y.H.useReducer(C, H, K);
  }, ue.useRef = function(C) {
    return Y.H.useRef(C);
  }, ue.useState = function(C) {
    return Y.H.useState(C);
  }, ue.useSyncExternalStore = function(C, H, K) {
    return Y.H.useSyncExternalStore(
      C,
      H,
      K
    );
  }, ue.useTransition = function() {
    return Y.H.useTransition();
  }, ue.version = "19.2.3", ue;
}
var g1;
function hr() {
  return g1 || (g1 = 1, Ec.exports = d4()), Ec.exports;
}
var A = hr();
const nm = /* @__PURE__ */ ei(A);
var Tc = { exports: {} }, sr = {}, _c = { exports: {} }, wc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var p1;
function f4() {
  return p1 || (p1 = 1, (function(c) {
    function s(w, Q) {
      var ee = w.length;
      w.push(Q);
      e: for (; 0 < ee; ) {
        var ie = ee - 1 >>> 1, je = w[ie];
        if (0 < f(je, Q))
          w[ie] = Q, w[ee] = je, ee = ie;
        else break e;
      }
    }
    function o(w) {
      return w.length === 0 ? null : w[0];
    }
    function u(w) {
      if (w.length === 0) return null;
      var Q = w[0], ee = w.pop();
      if (ee !== Q) {
        w[0] = ee;
        e: for (var ie = 0, je = w.length, C = je >>> 1; ie < C; ) {
          var H = 2 * (ie + 1) - 1, K = w[H], D = H + 1, G = w[D];
          if (0 > f(K, ee))
            D < je && 0 > f(G, K) ? (w[ie] = G, w[D] = ee, ie = D) : (w[ie] = K, w[H] = ee, ie = H);
          else if (D < je && 0 > f(G, ee))
            w[ie] = G, w[D] = ee, ie = D;
          else break e;
        }
      }
      return Q;
    }
    function f(w, Q) {
      var ee = w.sortIndex - Q.sortIndex;
      return ee !== 0 ? ee : w.id - Q.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      c.unstable_now = function() {
        return m.now();
      };
    } else {
      var x = Date, p = x.now();
      c.unstable_now = function() {
        return x.now() - p;
      };
    }
    var g = [], v = [], y = 1, b = null, z = 3, M = !1, _ = !1, R = !1, X = !1, V = typeof setTimeout == "function" ? setTimeout : null, W = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    function re(w) {
      for (var Q = o(v); Q !== null; ) {
        if (Q.callback === null) u(v);
        else if (Q.startTime <= w)
          u(v), Q.sortIndex = Q.expirationTime, s(g, Q);
        else break;
        Q = o(v);
      }
    }
    function ge(w) {
      if (R = !1, re(w), !_)
        if (o(g) !== null)
          _ = !0, $ || ($ = !0, te());
        else {
          var Q = o(v);
          Q !== null && Ge(ge, Q.startTime - w);
        }
    }
    var $ = !1, Y = -1, se = 5, we = -1;
    function ce() {
      return X ? !0 : !(c.unstable_now() - we < se);
    }
    function B() {
      if (X = !1, $) {
        var w = c.unstable_now();
        we = w;
        var Q = !0;
        try {
          e: {
            _ = !1, R && (R = !1, W(Y), Y = -1), M = !0;
            var ee = z;
            try {
              t: {
                for (re(w), b = o(g); b !== null && !(b.expirationTime > w && ce()); ) {
                  var ie = b.callback;
                  if (typeof ie == "function") {
                    b.callback = null, z = b.priorityLevel;
                    var je = ie(
                      b.expirationTime <= w
                    );
                    if (w = c.unstable_now(), typeof je == "function") {
                      b.callback = je, re(w), Q = !0;
                      break t;
                    }
                    b === o(g) && u(g), re(w);
                  } else u(g);
                  b = o(g);
                }
                if (b !== null) Q = !0;
                else {
                  var C = o(v);
                  C !== null && Ge(
                    ge,
                    C.startTime - w
                  ), Q = !1;
                }
              }
              break e;
            } finally {
              b = null, z = ee, M = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? te() : $ = !1;
        }
      }
    }
    var te;
    if (typeof J == "function")
      te = function() {
        J(B);
      };
    else if (typeof MessageChannel < "u") {
      var be = new MessageChannel(), he = be.port2;
      be.port1.onmessage = B, te = function() {
        he.postMessage(null);
      };
    } else
      te = function() {
        V(B, 0);
      };
    function Ge(w, Q) {
      Y = V(function() {
        w(c.unstable_now());
      }, Q);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(w) {
      w.callback = null;
    }, c.unstable_forceFrameRate = function(w) {
      0 > w || 125 < w ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : se = 0 < w ? Math.floor(1e3 / w) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, c.unstable_next = function(w) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = z;
      }
      var ee = z;
      z = Q;
      try {
        return w();
      } finally {
        z = ee;
      }
    }, c.unstable_requestPaint = function() {
      X = !0;
    }, c.unstable_runWithPriority = function(w, Q) {
      switch (w) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          w = 3;
      }
      var ee = z;
      z = w;
      try {
        return Q();
      } finally {
        z = ee;
      }
    }, c.unstable_scheduleCallback = function(w, Q, ee) {
      var ie = c.unstable_now();
      switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? ie + ee : ie) : ee = ie, w) {
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
      return je = ee + je, w = {
        id: y++,
        callback: Q,
        priorityLevel: w,
        startTime: ee,
        expirationTime: je,
        sortIndex: -1
      }, ee > ie ? (w.sortIndex = ee, s(v, w), o(g) === null && w === o(v) && (R ? (W(Y), Y = -1) : R = !0, Ge(ge, ee - ie))) : (w.sortIndex = je, s(g, w), _ || M || (_ = !0, $ || ($ = !0, te()))), w;
    }, c.unstable_shouldYield = ce, c.unstable_wrapCallback = function(w) {
      var Q = z;
      return function() {
        var ee = z;
        z = Q;
        try {
          return w.apply(this, arguments);
        } finally {
          z = ee;
        }
      };
    };
  })(wc)), wc;
}
var x1;
function m4() {
  return x1 || (x1 = 1, _c.exports = f4()), _c.exports;
}
var zc = { exports: {} }, rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b1;
function h4() {
  if (b1) return rt;
  b1 = 1;
  var c = hr();
  function s(g) {
    var v = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        v += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var u = {
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
  function m(g, v, y) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: b == null ? null : "" + b,
      children: g,
      containerInfo: v,
      implementation: y
    };
  }
  var x = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, v) {
    if (g === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, rt.createPortal = function(g, v) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(s(299));
    return m(g, v, null, y);
  }, rt.flushSync = function(g) {
    var v = x.T, y = u.p;
    try {
      if (x.T = null, u.p = 2, g) return g();
    } finally {
      x.T = v, u.p = y, u.d.f();
    }
  }, rt.preconnect = function(g, v) {
    typeof g == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, u.d.C(g, v));
  }, rt.prefetchDNS = function(g) {
    typeof g == "string" && u.d.D(g);
  }, rt.preinit = function(g, v) {
    if (typeof g == "string" && v && typeof v.as == "string") {
      var y = v.as, b = p(y, v.crossOrigin), z = typeof v.integrity == "string" ? v.integrity : void 0, M = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      y === "style" ? u.d.S(
        g,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: z,
          fetchPriority: M
        }
      ) : y === "script" && u.d.X(g, {
        crossOrigin: b,
        integrity: z,
        fetchPriority: M,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, rt.preinitModule = function(g, v) {
    if (typeof g == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var y = p(
            v.as,
            v.crossOrigin
          );
          u.d.M(g, {
            crossOrigin: y,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && u.d.M(g);
  }, rt.preload = function(g, v) {
    if (typeof g == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var y = v.as, b = p(y, v.crossOrigin);
      u.d.L(g, y, {
        crossOrigin: b,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, rt.preloadModule = function(g, v) {
    if (typeof g == "string")
      if (v) {
        var y = p(v.as, v.crossOrigin);
        u.d.m(g, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: y,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else u.d.m(g);
  }, rt.requestFormReset = function(g) {
    u.d.r(g);
  }, rt.unstable_batchedUpdates = function(g, v) {
    return g(v);
  }, rt.useFormState = function(g, v, y) {
    return x.H.useFormState(g, v, y);
  }, rt.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, rt.version = "19.2.3", rt;
}
var y1;
function am() {
  if (y1) return zc.exports;
  y1 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (s) {
        console.error(s);
      }
  }
  return c(), zc.exports = h4(), zc.exports;
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
var v1;
function g4() {
  if (v1) return sr;
  v1 = 1;
  var c = m4(), s = hr(), o = am();
  function u(e) {
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
      throw Error(u(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var i = l.alternate;
      if (i === null) {
        if (a = l.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (l.child === i.child) {
        for (i = l.child; i; ) {
          if (i === n) return g(l), e;
          if (i === a) return g(l), t;
          i = i.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== a.return) n = l, a = i;
      else {
        for (var d = !1, h = l.child; h; ) {
          if (h === n) {
            d = !0, n = l, a = i;
            break;
          }
          if (h === a) {
            d = !0, a = l, n = i;
            break;
          }
          h = h.sibling;
        }
        if (!d) {
          for (h = i.child; h; ) {
            if (h === n) {
              d = !0, n = i, a = l;
              break;
            }
            if (h === a) {
              d = !0, a = i, n = l;
              break;
            }
            h = h.sibling;
          }
          if (!d) throw Error(u(189));
        }
      }
      if (n.alternate !== a) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = y(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, z = Symbol.for("react.element"), M = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), X = Symbol.for("react.strict_mode"), V = Symbol.for("react.profiler"), W = Symbol.for("react.consumer"), J = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), ge = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), we = Symbol.for("react.activity"), ce = Symbol.for("react.memo_cache_sentinel"), B = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object" ? null : (e = B && e[B] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var be = Symbol.for("react.client.reference");
  function he(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === be ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case R:
        return "Fragment";
      case V:
        return "Profiler";
      case X:
        return "StrictMode";
      case ge:
        return "Suspense";
      case $:
        return "SuspenseList";
      case we:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case _:
          return "Portal";
        case J:
          return e.displayName || "Context";
        case W:
          return (e._context.displayName || "Context") + ".Consumer";
        case re:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Y:
          return t = e.displayName || null, t !== null ? t : he(e.type) || "Memo";
        case se:
          t = e._payload, e = e._init;
          try {
            return he(e(t));
          } catch {
          }
      }
    return null;
  }
  var Ge = Array.isArray, w = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ie = [], je = -1;
  function C(e) {
    return { current: e };
  }
  function H(e) {
    0 > je || (e.current = ie[je], ie[je] = null, je--);
  }
  function K(e, t) {
    je++, ie[je] = e.current, e.current = t;
  }
  var D = C(null), G = C(null), Z = C(null), oe = C(null);
  function Re(e, t) {
    switch (K(Z, t), K(G, e), K(D, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? D0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = D0(t), e = U0(t, e);
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
    H(D), K(D, e);
  }
  function Te() {
    H(D), H(G), H(Z);
  }
  function Zn(e) {
    e.memoizedState !== null && K(oe, e);
    var t = D.current, n = U0(t, e.type);
    t !== n && (K(G, e), K(D, n));
  }
  function br(e) {
    G.current === e && (H(D), H(G)), oe.current === e && (H(oe), tr._currentValue = ee);
  }
  var ri, uu;
  function Kn(e) {
    if (ri === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ri = t && t[1] || "", uu = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ri + e + uu;
  }
  var si = !1;
  function ii(e, t) {
    if (!e || si) return "";
    si = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var q = function() {
                throw Error();
              };
              if (Object.defineProperty(q.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(q, []);
                } catch (O) {
                  var k = O;
                }
                Reflect.construct(e, [], q);
              } else {
                try {
                  q.call();
                } catch (O) {
                  k = O;
                }
                e.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (O) {
                k = O;
              }
              (q = e()) && typeof q.catch == "function" && q.catch(function() {
              });
            }
          } catch (O) {
            if (O && k && typeof O.stack == "string")
              return [O.stack, k.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      l && l.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var i = a.DetermineComponentFrameRoot(), d = i[0], h = i[1];
      if (d && h) {
        var S = d.split(`
`), T = h.split(`
`);
        for (l = a = 0; a < S.length && !S[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; l < T.length && !T[l].includes(
          "DetermineComponentFrameRoot"
        ); )
          l++;
        if (a === S.length || l === T.length)
          for (a = S.length - 1, l = T.length - 1; 1 <= a && 0 <= l && S[a] !== T[l]; )
            l--;
        for (; 1 <= a && 0 <= l; a--, l--)
          if (S[a] !== T[l]) {
            if (a !== 1 || l !== 1)
              do
                if (a--, l--, 0 > l || S[a] !== T[l]) {
                  var U = `
` + S[a].replace(" at new ", " at ");
                  return e.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", e.displayName)), U;
                }
              while (1 <= a && 0 <= l);
            break;
          }
      }
    } finally {
      si = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Kn(n) : "";
  }
  function Bm(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Kn(e.type);
      case 16:
        return Kn("Lazy");
      case 13:
        return e.child !== t && t !== null ? Kn("Suspense Fallback") : Kn("Suspense");
      case 19:
        return Kn("SuspenseList");
      case 0:
      case 15:
        return ii(e.type, !1);
      case 11:
        return ii(e.type.render, !1);
      case 1:
        return ii(e.type, !0);
      case 31:
        return Kn("Activity");
      default:
        return "";
    }
  }
  function du(e) {
    try {
      var t = "", n = null;
      do
        t += Bm(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var oi = Object.prototype.hasOwnProperty, ci = c.unstable_scheduleCallback, ui = c.unstable_cancelCallback, Hm = c.unstable_shouldYield, qm = c.unstable_requestPaint, xt = c.unstable_now, Gm = c.unstable_getCurrentPriorityLevel, fu = c.unstable_ImmediatePriority, mu = c.unstable_UserBlockingPriority, yr = c.unstable_NormalPriority, Ym = c.unstable_LowPriority, hu = c.unstable_IdlePriority, $m = c.log, Vm = c.unstable_setDisableYieldValue, ml = null, bt = null;
  function bn(e) {
    if (typeof $m == "function" && Vm(e), bt && typeof bt.setStrictMode == "function")
      try {
        bt.setStrictMode(ml, e);
      } catch {
      }
  }
  var yt = Math.clz32 ? Math.clz32 : Zm, Xm = Math.log, Qm = Math.LN2;
  function Zm(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Xm(e) / Qm | 0) | 0;
  }
  var vr = 256, Sr = 262144, jr = 4194304;
  function Jn(e) {
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
  function Cr(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var l = 0, i = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var h = a & 134217727;
    return h !== 0 ? (a = h & ~i, a !== 0 ? l = Jn(a) : (d &= h, d !== 0 ? l = Jn(d) : n || (n = h & ~e, n !== 0 && (l = Jn(n))))) : (h = a & ~i, h !== 0 ? l = Jn(h) : d !== 0 ? l = Jn(d) : n || (n = a & ~e, n !== 0 && (l = Jn(n)))), l === 0 ? 0 : t !== 0 && t !== l && (t & i) === 0 && (i = l & -l, n = t & -t, i >= n || i === 32 && (n & 4194048) !== 0) ? t : l;
  }
  function hl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Km(e, t) {
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
  function gu() {
    var e = jr;
    return jr <<= 1, (jr & 62914560) === 0 && (jr = 4194304), e;
  }
  function di(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function gl(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Jm(e, t, n, a, l, i) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var h = e.entanglements, S = e.expirationTimes, T = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var U = 31 - yt(n), q = 1 << U;
      h[U] = 0, S[U] = -1;
      var k = T[U];
      if (k !== null)
        for (T[U] = null, U = 0; U < k.length; U++) {
          var O = k[U];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~q;
    }
    a !== 0 && pu(e, a, 0), i !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(d & ~t));
  }
  function pu(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - yt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 261930;
  }
  function xu(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - yt(n), l = 1 << a;
      l & t | e[a] & t && (e[a] |= t), n &= ~l;
    }
  }
  function bu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : fi(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function fi(e) {
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
  function mi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function yu() {
    var e = Q.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : r1(e.type));
  }
  function vu(e, t) {
    var n = Q.p;
    try {
      return Q.p = e, t();
    } finally {
      Q.p = n;
    }
  }
  var yn = Math.random().toString(36).slice(2), Pe = "__reactFiber$" + yn, ot = "__reactProps$" + yn, va = "__reactContainer$" + yn, hi = "__reactEvents$" + yn, Wm = "__reactListeners$" + yn, Fm = "__reactHandles$" + yn, Su = "__reactResources$" + yn, pl = "__reactMarker$" + yn;
  function gi(e) {
    delete e[Pe], delete e[ot], delete e[hi], delete e[Wm], delete e[Fm];
  }
  function Sa(e) {
    var t = e[Pe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[va] || n[Pe]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = $0(e); e !== null; ) {
            if (n = e[Pe]) return n;
            e = $0(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function ja(e) {
    if (e = e[Pe] || e[va]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function xl(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Ca(e) {
    var t = e[Su];
    return t || (t = e[Su] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fe(e) {
    e[pl] = !0;
  }
  var ju = /* @__PURE__ */ new Set(), Cu = {};
  function Wn(e, t) {
    Na(e, t), Na(e + "Capture", t);
  }
  function Na(e, t) {
    for (Cu[e] = t, e = 0; e < t.length; e++)
      ju.add(t[e]);
  }
  var Im = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Nu = {}, Eu = {};
  function Pm(e) {
    return oi.call(Eu, e) ? !0 : oi.call(Nu, e) ? !1 : Im.test(e) ? Eu[e] = !0 : (Nu[e] = !0, !1);
  }
  function Nr(e, t, n) {
    if (Pm(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
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
        e.setAttribute(t, "" + n);
      }
  }
  function Er(e, t, n) {
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
  function Jt(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  function zt(e) {
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
  function Tu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function e2(e, t, n) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var l = a.get, i = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return l.call(this);
        },
        set: function(d) {
          n = "" + d, i.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
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
  function pi(e) {
    if (!e._valueTracker) {
      var t = Tu(e) ? "checked" : "value";
      e._valueTracker = e2(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function _u(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), a = "";
    return e && (a = Tu(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Tr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var t2 = /[\n"\\]/g;
  function kt(e) {
    return e.replace(
      t2,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function xi(e, t, n, a, l, i, d, h) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zt(t)) : e.value !== "" + zt(t) && (e.value = "" + zt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? bi(e, d, zt(t)) : n != null ? bi(e, d, zt(n)) : a != null && e.removeAttribute("value"), l == null && i != null && (e.defaultChecked = !!i), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + zt(h) : e.removeAttribute("name");
  }
  function wu(e, t, n, a, l, i, d, h) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        pi(e);
        return;
      }
      n = n != null ? "" + zt(n) : "", t = t != null ? "" + zt(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? l, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = h ? e.checked : !!a, e.defaultChecked = !!a, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), pi(e);
  }
  function bi(e, t, n) {
    t === "number" && Tr(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Ea(e, t, n, a) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++)
        t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && a && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + zt(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, a && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function zu(e, t, n) {
    if (t != null && (t = "" + zt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + zt(n) : "";
  }
  function ku(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(u(92));
        if (Ge(a)) {
          if (1 < a.length) throw Error(u(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = zt(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a), pi(e);
  }
  function Ta(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var n2 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Au(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || n2.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Mu(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var l in t)
        a = t[l], t.hasOwnProperty(l) && n[l] !== a && Au(e, l, a);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && Au(e, i, t[i]);
  }
  function yi(e) {
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
  var a2 = /* @__PURE__ */ new Map([
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
  ]), l2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function _r(e) {
    return l2.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Wt() {
  }
  var vi = null;
  function Si(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var _a = null, wa = null;
  function Ou(e) {
    var t = ja(e);
    if (t && (e = t.stateNode)) {
      var n = e[ot] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (xi(
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
              'input[name="' + kt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var l = a[ot] || null;
                if (!l) throw Error(u(90));
                xi(
                  a,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              a = n[t], a.form === e.form && _u(a);
          }
          break e;
        case "textarea":
          zu(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Ea(e, !!n.multiple, t, !1);
      }
    }
  }
  var ji = !1;
  function Ru(e, t, n) {
    if (ji) return e(t, n);
    ji = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (ji = !1, (_a !== null || wa !== null) && (hs(), _a && (t = _a, e = wa, wa = _a = null, Ou(t), e)))
        for (t = 0; t < e.length; t++) Ou(e[t]);
    }
  }
  function bl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[ot] || null;
    if (a === null) return null;
    n = a[t];
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
    if (n && typeof n != "function")
      throw Error(
        u(231, t, typeof n)
      );
    return n;
  }
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ci = !1;
  if (Ft)
    try {
      var yl = {};
      Object.defineProperty(yl, "passive", {
        get: function() {
          Ci = !0;
        }
      }), window.addEventListener("test", yl, yl), window.removeEventListener("test", yl, yl);
    } catch {
      Ci = !1;
    }
  var vn = null, Ni = null, wr = null;
  function Du() {
    if (wr) return wr;
    var e, t = Ni, n = t.length, a, l = "value" in vn ? vn.value : vn.textContent, i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var d = n - e;
    for (a = 1; a <= d && t[n - a] === l[i - a]; a++) ;
    return wr = l.slice(e, 1 < a ? 1 - a : void 0);
  }
  function zr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function kr() {
    return !0;
  }
  function Uu() {
    return !1;
  }
  function ct(e) {
    function t(n, a, l, i, d) {
      this._reactName = n, this._targetInst = l, this.type = a, this.nativeEvent = i, this.target = d, this.currentTarget = null;
      for (var h in e)
        e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(i) : i[h]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? kr : Uu, this.isPropagationStopped = Uu, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = kr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = kr);
      },
      persist: function() {
      },
      isPersistent: kr
    }), t;
  }
  var Fn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ar = ct(Fn), vl = b({}, Fn, { view: 0, detail: 0 }), r2 = ct(vl), Ei, Ti, Sl, Mr = b({}, vl, {
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
    getModifierState: wi,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Sl && (Sl && e.type === "mousemove" ? (Ei = e.screenX - Sl.screenX, Ti = e.screenY - Sl.screenY) : Ti = Ei = 0, Sl = e), Ei);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ti;
    }
  }), Lu = ct(Mr), s2 = b({}, Mr, { dataTransfer: 0 }), i2 = ct(s2), o2 = b({}, vl, { relatedTarget: 0 }), _i = ct(o2), c2 = b({}, Fn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), u2 = ct(c2), d2 = b({}, Fn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), f2 = ct(d2), m2 = b({}, Fn, { data: 0 }), Bu = ct(m2), h2 = {
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
  }, g2 = {
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
  }, p2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function x2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = p2[e]) ? !!t[e] : !1;
  }
  function wi() {
    return x2;
  }
  var b2 = b({}, vl, {
    key: function(e) {
      if (e.key) {
        var t = h2[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = zr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? g2[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: wi,
    charCode: function(e) {
      return e.type === "keypress" ? zr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? zr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), y2 = ct(b2), v2 = b({}, Mr, {
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
  }), Hu = ct(v2), S2 = b({}, vl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: wi
  }), j2 = ct(S2), C2 = b({}, Fn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), N2 = ct(C2), E2 = b({}, Mr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), T2 = ct(E2), _2 = b({}, Fn, {
    newState: 0,
    oldState: 0
  }), w2 = ct(_2), z2 = [9, 13, 27, 32], zi = Ft && "CompositionEvent" in window, jl = null;
  Ft && "documentMode" in document && (jl = document.documentMode);
  var k2 = Ft && "TextEvent" in window && !jl, qu = Ft && (!zi || jl && 8 < jl && 11 >= jl), Gu = " ", Yu = !1;
  function $u(e, t) {
    switch (e) {
      case "keyup":
        return z2.indexOf(t.keyCode) !== -1;
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
  function Vu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var za = !1;
  function A2(e, t) {
    switch (e) {
      case "compositionend":
        return Vu(t);
      case "keypress":
        return t.which !== 32 ? null : (Yu = !0, Gu);
      case "textInput":
        return e = t.data, e === Gu && Yu ? null : e;
      default:
        return null;
    }
  }
  function M2(e, t) {
    if (za)
      return e === "compositionend" || !zi && $u(e, t) ? (e = Du(), wr = Ni = vn = null, za = !1, e) : null;
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
        return qu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var O2 = {
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
  function Xu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!O2[e.type] : t === "textarea";
  }
  function Qu(e, t, n, a) {
    _a ? wa ? wa.push(a) : wa = [a] : _a = a, t = Ss(t, "onChange"), 0 < t.length && (n = new Ar(
      "onChange",
      "change",
      null,
      n,
      a
    ), e.push({ event: n, listeners: t }));
  }
  var Cl = null, Nl = null;
  function R2(e) {
    z0(e, 0);
  }
  function Or(e) {
    var t = xl(e);
    if (_u(t)) return e;
  }
  function Zu(e, t) {
    if (e === "change") return t;
  }
  var Ku = !1;
  if (Ft) {
    var ki;
    if (Ft) {
      var Ai = "oninput" in document;
      if (!Ai) {
        var Ju = document.createElement("div");
        Ju.setAttribute("oninput", "return;"), Ai = typeof Ju.oninput == "function";
      }
      ki = Ai;
    } else ki = !1;
    Ku = ki && (!document.documentMode || 9 < document.documentMode);
  }
  function Wu() {
    Cl && (Cl.detachEvent("onpropertychange", Fu), Nl = Cl = null);
  }
  function Fu(e) {
    if (e.propertyName === "value" && Or(Nl)) {
      var t = [];
      Qu(
        t,
        Nl,
        e,
        Si(e)
      ), Ru(R2, t);
    }
  }
  function D2(e, t, n) {
    e === "focusin" ? (Wu(), Cl = t, Nl = n, Cl.attachEvent("onpropertychange", Fu)) : e === "focusout" && Wu();
  }
  function U2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Or(Nl);
  }
  function L2(e, t) {
    if (e === "click") return Or(t);
  }
  function B2(e, t) {
    if (e === "input" || e === "change")
      return Or(t);
  }
  function H2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var vt = typeof Object.is == "function" ? Object.is : H2;
  function El(e, t) {
    if (vt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var l = n[a];
      if (!oi.call(t, l) || !vt(e[l], t[l]))
        return !1;
    }
    return !0;
  }
  function Iu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Pu(e, t) {
    var n = Iu(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = e + n.textContent.length, e <= t && a >= t)
          return { node: n, offset: t - e };
        e = a;
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
      n = Iu(n);
    }
  }
  function ed(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ed(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function td(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Tr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Tr(e.document);
    }
    return t;
  }
  function Mi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var q2 = Ft && "documentMode" in document && 11 >= document.documentMode, ka = null, Oi = null, Tl = null, Ri = !1;
  function nd(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ri || ka == null || ka !== Tr(a) || (a = ka, "selectionStart" in a && Mi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Tl && El(Tl, a) || (Tl = a, a = Ss(Oi, "onSelect"), 0 < a.length && (t = new Ar(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: a }), t.target = ka)));
  }
  function In(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Aa = {
    animationend: In("Animation", "AnimationEnd"),
    animationiteration: In("Animation", "AnimationIteration"),
    animationstart: In("Animation", "AnimationStart"),
    transitionrun: In("Transition", "TransitionRun"),
    transitionstart: In("Transition", "TransitionStart"),
    transitioncancel: In("Transition", "TransitionCancel"),
    transitionend: In("Transition", "TransitionEnd")
  }, Di = {}, ad = {};
  Ft && (ad = document.createElement("div").style, "AnimationEvent" in window || (delete Aa.animationend.animation, delete Aa.animationiteration.animation, delete Aa.animationstart.animation), "TransitionEvent" in window || delete Aa.transitionend.transition);
  function Pn(e) {
    if (Di[e]) return Di[e];
    if (!Aa[e]) return e;
    var t = Aa[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in ad)
        return Di[e] = t[n];
    return e;
  }
  var ld = Pn("animationend"), rd = Pn("animationiteration"), sd = Pn("animationstart"), G2 = Pn("transitionrun"), Y2 = Pn("transitionstart"), $2 = Pn("transitioncancel"), id = Pn("transitionend"), od = /* @__PURE__ */ new Map(), Ui = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ui.push("scrollEnd");
  function Ht(e, t) {
    od.set(e, t), Wn(t, [e]);
  }
  var Rr = typeof reportError == "function" ? reportError : function(e) {
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
  }, At = [], Ma = 0, Li = 0;
  function Dr() {
    for (var e = Ma, t = Li = Ma = 0; t < e; ) {
      var n = At[t];
      At[t++] = null;
      var a = At[t];
      At[t++] = null;
      var l = At[t];
      At[t++] = null;
      var i = At[t];
      if (At[t++] = null, a !== null && l !== null) {
        var d = a.pending;
        d === null ? l.next = l : (l.next = d.next, d.next = l), a.pending = l;
      }
      i !== 0 && cd(n, l, i);
    }
  }
  function Ur(e, t, n, a) {
    At[Ma++] = e, At[Ma++] = t, At[Ma++] = n, At[Ma++] = a, Li |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Bi(e, t, n, a) {
    return Ur(e, t, n, a), Lr(e);
  }
  function ea(e, t) {
    return Ur(e, null, null, t), Lr(e);
  }
  function cd(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var l = !1, i = e.return; i !== null; )
      i.childLanes |= n, a = i.alternate, a !== null && (a.childLanes |= n), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (l = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, l && t !== null && (l = 31 - yt(n), e = i.hiddenUpdates, a = e[l], a === null ? e[l] = [t] : a.push(t), t.lane = n | 536870912), i) : null;
  }
  function Lr(e) {
    if (50 < Kl)
      throw Kl = 0, Ko = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Oa = {};
  function V2(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function St(e, t, n, a) {
    return new V2(e, t, n, a);
  }
  function Hi(e) {
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
  function ud(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Br(e, t, n, a, l, i) {
    var d = 0;
    if (a = e, typeof e == "function") Hi(e) && (d = 1);
    else if (typeof e == "string")
      d = Jh(
        e,
        n,
        D.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case we:
          return e = St(31, n, t, l), e.elementType = we, e.lanes = i, e;
        case R:
          return ta(n.children, l, i, t);
        case X:
          d = 8, l |= 24;
          break;
        case V:
          return e = St(12, n, t, l | 2), e.elementType = V, e.lanes = i, e;
        case ge:
          return e = St(13, n, t, l), e.elementType = ge, e.lanes = i, e;
        case $:
          return e = St(19, n, t, l), e.elementType = $, e.lanes = i, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case J:
                d = 10;
                break e;
              case W:
                d = 9;
                break e;
              case re:
                d = 11;
                break e;
              case Y:
                d = 14;
                break e;
              case se:
                d = 16, a = null;
                break e;
            }
          d = 29, n = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = St(d, n, t, l), t.elementType = e, t.type = a, t.lanes = i, t;
  }
  function ta(e, t, n, a) {
    return e = St(7, e, a, t), e.lanes = n, e;
  }
  function qi(e, t, n) {
    return e = St(6, e, null, t), e.lanes = n, e;
  }
  function dd(e) {
    var t = St(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Gi(e, t, n) {
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
  var fd = /* @__PURE__ */ new WeakMap();
  function Mt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = fd.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: du(t)
      }, fd.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: du(t)
    };
  }
  var Ra = [], Da = 0, Hr = null, _l = 0, Ot = [], Rt = 0, Sn = null, Yt = 1, $t = "";
  function Pt(e, t) {
    Ra[Da++] = _l, Ra[Da++] = Hr, Hr = e, _l = t;
  }
  function md(e, t, n) {
    Ot[Rt++] = Yt, Ot[Rt++] = $t, Ot[Rt++] = Sn, Sn = e;
    var a = Yt;
    e = $t;
    var l = 32 - yt(a) - 1;
    a &= ~(1 << l), n += 1;
    var i = 32 - yt(t) + l;
    if (30 < i) {
      var d = l - l % 5;
      i = (a & (1 << d) - 1).toString(32), a >>= d, l -= d, Yt = 1 << 32 - yt(t) + l | n << l | a, $t = i + e;
    } else
      Yt = 1 << i | n << l | a, $t = e;
  }
  function Yi(e) {
    e.return !== null && (Pt(e, 1), md(e, 1, 0));
  }
  function $i(e) {
    for (; e === Hr; )
      Hr = Ra[--Da], Ra[Da] = null, _l = Ra[--Da], Ra[Da] = null;
    for (; e === Sn; )
      Sn = Ot[--Rt], Ot[Rt] = null, $t = Ot[--Rt], Ot[Rt] = null, Yt = Ot[--Rt], Ot[Rt] = null;
  }
  function hd(e, t) {
    Ot[Rt++] = Yt, Ot[Rt++] = $t, Ot[Rt++] = Sn, Yt = t.id, $t = t.overflow, Sn = e;
  }
  var et = null, Le = null, Se = !1, jn = null, Dt = !1, Vi = Error(u(519));
  function Cn(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw wl(Mt(t, e)), Vi;
  }
  function gd(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[Pe] = e, t[ot] = a, n) {
      case "dialog":
        xe("cancel", t), xe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        xe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Wl.length; n++)
          xe(Wl[n], t);
        break;
      case "source":
        xe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        xe("error", t), xe("load", t);
        break;
      case "details":
        xe("toggle", t);
        break;
      case "input":
        xe("invalid", t), wu(
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
        xe("invalid", t);
        break;
      case "textarea":
        xe("invalid", t), ku(t, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === !0 || O0(t.textContent, n) ? (a.popover != null && (xe("beforetoggle", t), xe("toggle", t)), a.onScroll != null && xe("scroll", t), a.onScrollEnd != null && xe("scrollend", t), a.onClick != null && (t.onclick = Wt), t = !0) : t = !1, t || Cn(e, !0);
  }
  function pd(e) {
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
  function Ua(e) {
    if (e !== et) return !1;
    if (!Se) return pd(e), Se = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || cc(e.type, e.memoizedProps)), n = !n), n && Le && Cn(e), pd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Le = Y0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Le = Y0(e);
    } else
      t === 27 ? (t = Le, Ln(e.type) ? (e = hc, hc = null, Le = e) : Le = t) : Le = et ? Lt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function na() {
    Le = et = null, Se = !1;
  }
  function Xi() {
    var e = jn;
    return e !== null && (mt === null ? mt = e : mt.push.apply(
      mt,
      e
    ), jn = null), e;
  }
  function wl(e) {
    jn === null ? jn = [e] : jn.push(e);
  }
  var Qi = C(null), aa = null, en = null;
  function Nn(e, t, n) {
    K(Qi, t._currentValue), t._currentValue = n;
  }
  function tn(e) {
    e._currentValue = Qi.current, H(Qi);
  }
  function Zi(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Ki(e, t, n, a) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var i = l.dependencies;
      if (i !== null) {
        var d = l.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var h = i;
          i = l;
          for (var S = 0; S < t.length; S++)
            if (h.context === t[S]) {
              i.lanes |= n, h = i.alternate, h !== null && (h.lanes |= n), Zi(
                i.return,
                n,
                e
              ), a || (d = null);
              break e;
            }
          i = h.next;
        }
      } else if (l.tag === 18) {
        if (d = l.return, d === null) throw Error(u(341));
        d.lanes |= n, i = d.alternate, i !== null && (i.lanes |= n), Zi(d, n, e), d = null;
      } else d = l.child;
      if (d !== null) d.return = l;
      else
        for (d = l; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (l = d.sibling, l !== null) {
            l.return = d.return, d = l;
            break;
          }
          d = d.return;
        }
      l = d;
    }
  }
  function La(e, t, n, a) {
    e = null;
    for (var l = t, i = !1; l !== null; ) {
      if (!i) {
        if ((l.flags & 524288) !== 0) i = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var d = l.alternate;
        if (d === null) throw Error(u(387));
        if (d = d.memoizedProps, d !== null) {
          var h = l.type;
          vt(l.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
        }
      } else if (l === oe.current) {
        if (d = l.alternate, d === null) throw Error(u(387));
        d.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(tr) : e = [tr]);
      }
      l = l.return;
    }
    e !== null && Ki(
      t,
      e,
      n,
      a
    ), t.flags |= 262144;
  }
  function qr(e) {
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
  function la(e) {
    aa = e, en = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function tt(e) {
    return xd(aa, e);
  }
  function Gr(e, t) {
    return aa === null && la(e), xd(e, t);
  }
  function xd(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, en === null) {
      if (e === null) throw Error(u(308));
      en = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else en = en.next = t;
    return n;
  }
  var X2 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, Q2 = c.unstable_scheduleCallback, Z2 = c.unstable_NormalPriority, Qe = {
    $$typeof: J,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ji() {
    return {
      controller: new X2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zl(e) {
    e.refCount--, e.refCount === 0 && Q2(Z2, function() {
      e.controller.abort();
    });
  }
  var kl = null, Wi = 0, Ba = 0, Ha = null;
  function K2(e, t) {
    if (kl === null) {
      var n = kl = [];
      Wi = 0, Ba = ec(), Ha = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return Wi++, t.then(bd, bd), t;
  }
  function bd() {
    if (--Wi === 0 && kl !== null) {
      Ha !== null && (Ha.status = "fulfilled");
      var e = kl;
      kl = null, Ba = 0, Ha = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function J2(e, t) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(l) {
        n.push(l);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var l = 0; l < n.length; l++) (0, n[l])(t);
      },
      function(l) {
        for (a.status = "rejected", a.reason = l, l = 0; l < n.length; l++)
          (0, n[l])(void 0);
      }
    ), a;
  }
  var yd = w.S;
  w.S = function(e, t) {
    a0 = xt(), typeof t == "object" && t !== null && typeof t.then == "function" && K2(e, t), yd !== null && yd(e, t);
  };
  var ra = C(null);
  function Fi() {
    var e = ra.current;
    return e !== null ? e : De.pooledCache;
  }
  function Yr(e, t) {
    t === null ? K(ra, ra.current) : K(ra, t.pool);
  }
  function vd() {
    var e = Fi();
    return e === null ? null : { parent: Qe._currentValue, pool: e };
  }
  var qa = Error(u(460)), Ii = Error(u(474)), $r = Error(u(542)), Vr = { then: function() {
  } };
  function Sd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jd(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Wt, Wt), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Nd(e), e;
      default:
        if (typeof t.status == "string") t.then(Wt, Wt);
        else {
          if (e = De, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var l = t;
                l.status = "fulfilled", l.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var l = t;
                l.status = "rejected", l.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Nd(e), e;
        }
        throw ia = t, qa;
    }
  }
  function sa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (ia = n, qa) : n;
    }
  }
  var ia = null;
  function Cd() {
    if (ia === null) throw Error(u(459));
    var e = ia;
    return ia = null, e;
  }
  function Nd(e) {
    if (e === qa || e === $r)
      throw Error(u(483));
  }
  var Ga = null, Al = 0;
  function Xr(e) {
    var t = Al;
    return Al += 1, Ga === null && (Ga = []), jd(Ga, e, t);
  }
  function Ml(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Qr(e, t) {
    throw t.$$typeof === z ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Ed(e) {
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
    function a(N) {
      for (var j = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? j.set(N.key, N) : j.set(N.index, N), N = N.sibling;
      return j;
    }
    function l(N, j) {
      return N = It(N, j), N.index = 0, N.sibling = null, N;
    }
    function i(N, j, E) {
      return N.index = E, e ? (E = N.alternate, E !== null ? (E = E.index, E < j ? (N.flags |= 67108866, j) : E) : (N.flags |= 67108866, j)) : (N.flags |= 1048576, j);
    }
    function d(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function h(N, j, E, L) {
      return j === null || j.tag !== 6 ? (j = qi(E, N.mode, L), j.return = N, j) : (j = l(j, E), j.return = N, j);
    }
    function S(N, j, E, L) {
      var ne = E.type;
      return ne === R ? U(
        N,
        j,
        E.props.children,
        L,
        E.key
      ) : j !== null && (j.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === se && sa(ne) === j.type) ? (j = l(j, E.props), Ml(j, E), j.return = N, j) : (j = Br(
        E.type,
        E.key,
        E.props,
        null,
        N.mode,
        L
      ), Ml(j, E), j.return = N, j);
    }
    function T(N, j, E, L) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== E.containerInfo || j.stateNode.implementation !== E.implementation ? (j = Gi(E, N.mode, L), j.return = N, j) : (j = l(j, E.children || []), j.return = N, j);
    }
    function U(N, j, E, L, ne) {
      return j === null || j.tag !== 7 ? (j = ta(
        E,
        N.mode,
        L,
        ne
      ), j.return = N, j) : (j = l(j, E), j.return = N, j);
    }
    function q(N, j, E) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return j = qi(
          "" + j,
          N.mode,
          E
        ), j.return = N, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case M:
            return E = Br(
              j.type,
              j.key,
              j.props,
              null,
              N.mode,
              E
            ), Ml(E, j), E.return = N, E;
          case _:
            return j = Gi(
              j,
              N.mode,
              E
            ), j.return = N, j;
          case se:
            return j = sa(j), q(N, j, E);
        }
        if (Ge(j) || te(j))
          return j = ta(
            j,
            N.mode,
            E,
            null
          ), j.return = N, j;
        if (typeof j.then == "function")
          return q(N, Xr(j), E);
        if (j.$$typeof === J)
          return q(
            N,
            Gr(N, j),
            E
          );
        Qr(N, j);
      }
      return null;
    }
    function k(N, j, E, L) {
      var ne = j !== null ? j.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return ne !== null ? null : h(N, j, "" + E, L);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case M:
            return E.key === ne ? S(N, j, E, L) : null;
          case _:
            return E.key === ne ? T(N, j, E, L) : null;
          case se:
            return E = sa(E), k(N, j, E, L);
        }
        if (Ge(E) || te(E))
          return ne !== null ? null : U(N, j, E, L, null);
        if (typeof E.then == "function")
          return k(
            N,
            j,
            Xr(E),
            L
          );
        if (E.$$typeof === J)
          return k(
            N,
            j,
            Gr(N, E),
            L
          );
        Qr(N, E);
      }
      return null;
    }
    function O(N, j, E, L, ne) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return N = N.get(E) || null, h(j, N, "" + L, ne);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case M:
            return N = N.get(
              L.key === null ? E : L.key
            ) || null, S(j, N, L, ne);
          case _:
            return N = N.get(
              L.key === null ? E : L.key
            ) || null, T(j, N, L, ne);
          case se:
            return L = sa(L), O(
              N,
              j,
              E,
              L,
              ne
            );
        }
        if (Ge(L) || te(L))
          return N = N.get(E) || null, U(j, N, L, ne, null);
        if (typeof L.then == "function")
          return O(
            N,
            j,
            E,
            Xr(L),
            ne
          );
        if (L.$$typeof === J)
          return O(
            N,
            j,
            E,
            Gr(j, L),
            ne
          );
        Qr(j, L);
      }
      return null;
    }
    function F(N, j, E, L) {
      for (var ne = null, Ne = null, I = j, fe = j = 0, ve = null; I !== null && fe < E.length; fe++) {
        I.index > fe ? (ve = I, I = null) : ve = I.sibling;
        var Ee = k(
          N,
          I,
          E[fe],
          L
        );
        if (Ee === null) {
          I === null && (I = ve);
          break;
        }
        e && I && Ee.alternate === null && t(N, I), j = i(Ee, j, fe), Ne === null ? ne = Ee : Ne.sibling = Ee, Ne = Ee, I = ve;
      }
      if (fe === E.length)
        return n(N, I), Se && Pt(N, fe), ne;
      if (I === null) {
        for (; fe < E.length; fe++)
          I = q(N, E[fe], L), I !== null && (j = i(
            I,
            j,
            fe
          ), Ne === null ? ne = I : Ne.sibling = I, Ne = I);
        return Se && Pt(N, fe), ne;
      }
      for (I = a(I); fe < E.length; fe++)
        ve = O(
          I,
          N,
          fe,
          E[fe],
          L
        ), ve !== null && (e && ve.alternate !== null && I.delete(
          ve.key === null ? fe : ve.key
        ), j = i(
          ve,
          j,
          fe
        ), Ne === null ? ne = ve : Ne.sibling = ve, Ne = ve);
      return e && I.forEach(function(Yn) {
        return t(N, Yn);
      }), Se && Pt(N, fe), ne;
    }
    function le(N, j, E, L) {
      if (E == null) throw Error(u(151));
      for (var ne = null, Ne = null, I = j, fe = j = 0, ve = null, Ee = E.next(); I !== null && !Ee.done; fe++, Ee = E.next()) {
        I.index > fe ? (ve = I, I = null) : ve = I.sibling;
        var Yn = k(N, I, Ee.value, L);
        if (Yn === null) {
          I === null && (I = ve);
          break;
        }
        e && I && Yn.alternate === null && t(N, I), j = i(Yn, j, fe), Ne === null ? ne = Yn : Ne.sibling = Yn, Ne = Yn, I = ve;
      }
      if (Ee.done)
        return n(N, I), Se && Pt(N, fe), ne;
      if (I === null) {
        for (; !Ee.done; fe++, Ee = E.next())
          Ee = q(N, Ee.value, L), Ee !== null && (j = i(Ee, j, fe), Ne === null ? ne = Ee : Ne.sibling = Ee, Ne = Ee);
        return Se && Pt(N, fe), ne;
      }
      for (I = a(I); !Ee.done; fe++, Ee = E.next())
        Ee = O(I, N, fe, Ee.value, L), Ee !== null && (e && Ee.alternate !== null && I.delete(Ee.key === null ? fe : Ee.key), j = i(Ee, j, fe), Ne === null ? ne = Ee : Ne.sibling = Ee, Ne = Ee);
      return e && I.forEach(function(s4) {
        return t(N, s4);
      }), Se && Pt(N, fe), ne;
    }
    function Oe(N, j, E, L) {
      if (typeof E == "object" && E !== null && E.type === R && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case M:
            e: {
              for (var ne = E.key; j !== null; ) {
                if (j.key === ne) {
                  if (ne = E.type, ne === R) {
                    if (j.tag === 7) {
                      n(
                        N,
                        j.sibling
                      ), L = l(
                        j,
                        E.props.children
                      ), L.return = N, N = L;
                      break e;
                    }
                  } else if (j.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === se && sa(ne) === j.type) {
                    n(
                      N,
                      j.sibling
                    ), L = l(j, E.props), Ml(L, E), L.return = N, N = L;
                    break e;
                  }
                  n(N, j);
                  break;
                } else t(N, j);
                j = j.sibling;
              }
              E.type === R ? (L = ta(
                E.props.children,
                N.mode,
                L,
                E.key
              ), L.return = N, N = L) : (L = Br(
                E.type,
                E.key,
                E.props,
                null,
                N.mode,
                L
              ), Ml(L, E), L.return = N, N = L);
            }
            return d(N);
          case _:
            e: {
              for (ne = E.key; j !== null; ) {
                if (j.key === ne)
                  if (j.tag === 4 && j.stateNode.containerInfo === E.containerInfo && j.stateNode.implementation === E.implementation) {
                    n(
                      N,
                      j.sibling
                    ), L = l(j, E.children || []), L.return = N, N = L;
                    break e;
                  } else {
                    n(N, j);
                    break;
                  }
                else t(N, j);
                j = j.sibling;
              }
              L = Gi(E, N.mode, L), L.return = N, N = L;
            }
            return d(N);
          case se:
            return E = sa(E), Oe(
              N,
              j,
              E,
              L
            );
        }
        if (Ge(E))
          return F(
            N,
            j,
            E,
            L
          );
        if (te(E)) {
          if (ne = te(E), typeof ne != "function") throw Error(u(150));
          return E = ne.call(E), le(
            N,
            j,
            E,
            L
          );
        }
        if (typeof E.then == "function")
          return Oe(
            N,
            j,
            Xr(E),
            L
          );
        if (E.$$typeof === J)
          return Oe(
            N,
            j,
            Gr(N, E),
            L
          );
        Qr(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, j !== null && j.tag === 6 ? (n(N, j.sibling), L = l(j, E), L.return = N, N = L) : (n(N, j), L = qi(E, N.mode, L), L.return = N, N = L), d(N)) : n(N, j);
    }
    return function(N, j, E, L) {
      try {
        Al = 0;
        var ne = Oe(
          N,
          j,
          E,
          L
        );
        return Ga = null, ne;
      } catch (I) {
        if (I === qa || I === $r) throw I;
        var Ne = St(29, I, null, N.mode);
        return Ne.lanes = L, Ne.return = N, Ne;
      } finally {
      }
    };
  }
  var oa = Ed(!0), Td = Ed(!1), En = !1;
  function Pi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function eo(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Tn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function _n(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (_e & 2) !== 0) {
      var l = a.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), a.pending = t, t = Lr(e), cd(e, null, n), t;
    }
    return Ur(e, a, t, n), Lr(e);
  }
  function Ol(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, xu(e, n);
    }
  }
  function to(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var l = null, i = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          i === null ? l = i = d : i = i.next = d, n = n.next;
        } while (n !== null);
        i === null ? l = i = t : i = i.next = t;
      } else l = i = t;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: i,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var no = !1;
  function Rl() {
    if (no) {
      var e = Ha;
      if (e !== null) throw e;
    }
  }
  function Dl(e, t, n, a) {
    no = !1;
    var l = e.updateQueue;
    En = !1;
    var i = l.firstBaseUpdate, d = l.lastBaseUpdate, h = l.shared.pending;
    if (h !== null) {
      l.shared.pending = null;
      var S = h, T = S.next;
      S.next = null, d === null ? i = T : d.next = T, d = S;
      var U = e.alternate;
      U !== null && (U = U.updateQueue, h = U.lastBaseUpdate, h !== d && (h === null ? U.firstBaseUpdate = T : h.next = T, U.lastBaseUpdate = S));
    }
    if (i !== null) {
      var q = l.baseState;
      d = 0, U = T = S = null, h = i;
      do {
        var k = h.lane & -536870913, O = k !== h.lane;
        if (O ? (ye & k) === k : (a & k) === k) {
          k !== 0 && k === Ba && (no = !0), U !== null && (U = U.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          e: {
            var F = e, le = h;
            k = t;
            var Oe = n;
            switch (le.tag) {
              case 1:
                if (F = le.payload, typeof F == "function") {
                  q = F.call(Oe, q, k);
                  break e;
                }
                q = F;
                break e;
              case 3:
                F.flags = F.flags & -65537 | 128;
              case 0:
                if (F = le.payload, k = typeof F == "function" ? F.call(Oe, q, k) : F, k == null) break e;
                q = b({}, q, k);
                break e;
              case 2:
                En = !0;
            }
          }
          k = h.callback, k !== null && (e.flags |= 64, O && (e.flags |= 8192), O = l.callbacks, O === null ? l.callbacks = [k] : O.push(k));
        } else
          O = {
            lane: k,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, U === null ? (T = U = O, S = q) : U = U.next = O, d |= k;
        if (h = h.next, h === null) {
          if (h = l.shared.pending, h === null)
            break;
          O = h, h = O.next, O.next = null, l.lastBaseUpdate = O, l.shared.pending = null;
        }
      } while (!0);
      U === null && (S = q), l.baseState = S, l.firstBaseUpdate = T, l.lastBaseUpdate = U, i === null && (l.shared.lanes = 0), Mn |= d, e.lanes = d, e.memoizedState = q;
    }
  }
  function _d(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function wd(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        _d(n[e], t);
  }
  var Ya = C(null), Zr = C(0);
  function zd(e, t) {
    e = dn, K(Zr, e), K(Ya, t), dn = e | t.baseLanes;
  }
  function ao() {
    K(Zr, dn), K(Ya, Ya.current);
  }
  function lo() {
    dn = Zr.current, H(Ya), H(Zr);
  }
  var jt = C(null), Ut = null;
  function wn(e) {
    var t = e.alternate;
    K(Ve, Ve.current & 1), K(jt, e), Ut === null && (t === null || Ya.current !== null || t.memoizedState !== null) && (Ut = e);
  }
  function ro(e) {
    K(Ve, Ve.current), K(jt, e), Ut === null && (Ut = e);
  }
  function kd(e) {
    e.tag === 22 ? (K(Ve, Ve.current), K(jt, e), Ut === null && (Ut = e)) : zn();
  }
  function zn() {
    K(Ve, Ve.current), K(jt, jt.current);
  }
  function Ct(e) {
    H(jt), Ut === e && (Ut = null), H(Ve);
  }
  var Ve = C(0);
  function Kr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || fc(n) || mc(n)))
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
  var nn = 0, de = null, Ae = null, Ze = null, Jr = !1, $a = !1, ca = !1, Wr = 0, Ul = 0, Va = null, W2 = 0;
  function Ye() {
    throw Error(u(321));
  }
  function so(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!vt(e[n], t[n])) return !1;
    return !0;
  }
  function io(e, t, n, a, l, i) {
    return nn = i, de = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? hf : Co, ca = !1, i = n(a, l), ca = !1, $a && (i = Md(
      t,
      n,
      a,
      l
    )), Ad(e), i;
  }
  function Ad(e) {
    w.H = Hl;
    var t = Ae !== null && Ae.next !== null;
    if (nn = 0, Ze = Ae = de = null, Jr = !1, Ul = 0, Va = null, t) throw Error(u(300));
    e === null || Ke || (e = e.dependencies, e !== null && qr(e) && (Ke = !0));
  }
  function Md(e, t, n, a) {
    de = e;
    var l = 0;
    do {
      if ($a && (Va = null), Ul = 0, $a = !1, 25 <= l) throw Error(u(301));
      if (l += 1, Ze = Ae = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      w.H = gf, i = t(n, a);
    } while ($a);
    return i;
  }
  function F2() {
    var e = w.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ll(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (de.flags |= 1024), t;
  }
  function oo() {
    var e = Wr !== 0;
    return Wr = 0, e;
  }
  function co(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function uo(e) {
    if (Jr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Jr = !1;
    }
    nn = 0, Ze = Ae = de = null, $a = !1, Ul = Wr = 0, Va = null;
  }
  function it() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ze === null ? de.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
  }
  function Xe() {
    if (Ae === null) {
      var e = de.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = Ze === null ? de.memoizedState : Ze.next;
    if (t !== null)
      Ze = t, Ae = e;
    else {
      if (e === null)
        throw de.alternate === null ? Error(u(467)) : Error(u(310));
      Ae = e, e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, Ze === null ? de.memoizedState = Ze = e : Ze = Ze.next = e;
    }
    return Ze;
  }
  function Fr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ll(e) {
    var t = Ul;
    return Ul += 1, Va === null && (Va = []), e = jd(Va, e, t), t = de, (Ze === null ? t.memoizedState : Ze.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? hf : Co), e;
  }
  function Ir(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ll(e);
      if (e.$$typeof === J) return tt(e);
    }
    throw Error(u(438, String(e)));
  }
  function fo(e) {
    var t = null, n = de.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var a = de.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(l) {
          return l.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Fr(), de.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++)
        n[a] = ce;
    return t.index++, n;
  }
  function an(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Pr(e) {
    var t = Xe();
    return mo(t, Ae, e);
  }
  function mo(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = n;
    var l = e.baseQueue, i = a.pending;
    if (i !== null) {
      if (l !== null) {
        var d = l.next;
        l.next = i.next, i.next = d;
      }
      t.baseQueue = l = i, a.pending = null;
    }
    if (i = e.baseState, l === null) e.memoizedState = i;
    else {
      t = l.next;
      var h = d = null, S = null, T = t, U = !1;
      do {
        var q = T.lane & -536870913;
        if (q !== T.lane ? (ye & q) === q : (nn & q) === q) {
          var k = T.revertLane;
          if (k === 0)
            S !== null && (S = S.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), q === Ba && (U = !0);
          else if ((nn & k) === k) {
            T = T.next, k === Ba && (U = !0);
            continue;
          } else
            q = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, S === null ? (h = S = q, d = i) : S = S.next = q, de.lanes |= k, Mn |= k;
          q = T.action, ca && n(i, q), i = T.hasEagerState ? T.eagerState : n(i, q);
        } else
          k = {
            lane: q,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, S === null ? (h = S = k, d = i) : S = S.next = k, de.lanes |= q, Mn |= q;
        T = T.next;
      } while (T !== null && T !== t);
      if (S === null ? d = i : S.next = h, !vt(i, e.memoizedState) && (Ke = !0, U && (n = Ha, n !== null)))
        throw n;
      e.memoizedState = i, e.baseState = d, e.baseQueue = S, a.lastRenderedState = i;
    }
    return l === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function ho(e) {
    var t = Xe(), n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch, l = n.pending, i = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var d = l = l.next;
      do
        i = e(i, d.action), d = d.next;
      while (d !== l);
      vt(i, t.memoizedState) || (Ke = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
    }
    return [i, a];
  }
  function Od(e, t, n) {
    var a = de, l = Xe(), i = Se;
    if (i) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var d = !vt(
      (Ae || l).memoizedState,
      n
    );
    if (d && (l.memoizedState = n, Ke = !0), l = l.queue, xo(Ud.bind(null, a, l, e), [
      e
    ]), l.getSnapshot !== t || d || Ze !== null && Ze.memoizedState.tag & 1) {
      if (a.flags |= 2048, Xa(
        9,
        { destroy: void 0 },
        Dd.bind(
          null,
          a,
          l,
          n,
          t
        ),
        null
      ), De === null) throw Error(u(349));
      i || (nn & 127) !== 0 || Rd(a, t, n);
    }
    return n;
  }
  function Rd(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = de.updateQueue, t === null ? (t = Fr(), de.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Dd(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Ld(t) && Bd(e);
  }
  function Ud(e, t, n) {
    return n(function() {
      Ld(t) && Bd(e);
    });
  }
  function Ld(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !vt(e, n);
    } catch {
      return !0;
    }
  }
  function Bd(e) {
    var t = ea(e, 2);
    t !== null && ht(t, e, 2);
  }
  function go(e) {
    var t = it();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ca) {
        bn(!0);
        try {
          n();
        } finally {
          bn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: an,
      lastRenderedState: e
    }, t;
  }
  function Hd(e, t, n, a) {
    return e.baseState = n, mo(
      e,
      Ae,
      typeof a == "function" ? a : an
    );
  }
  function I2(e, t, n, a, l) {
    if (ns(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: l,
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
      w.T !== null ? n(!0) : i.isTransition = !1, a(i), n = t.pending, n === null ? (i.next = t.pending = i, qd(t, i)) : (i.next = n.next, t.pending = n.next = i);
    }
  }
  function qd(e, t) {
    var n = t.action, a = t.payload, l = e.state;
    if (t.isTransition) {
      var i = w.T, d = {};
      w.T = d;
      try {
        var h = n(l, a), S = w.S;
        S !== null && S(d, h), Gd(e, t, h);
      } catch (T) {
        po(e, t, T);
      } finally {
        i !== null && d.types !== null && (i.types = d.types), w.T = i;
      }
    } else
      try {
        i = n(l, a), Gd(e, t, i);
      } catch (T) {
        po(e, t, T);
      }
  }
  function Gd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        Yd(e, t, a);
      },
      function(a) {
        return po(e, t, a);
      }
    ) : Yd(e, t, n);
  }
  function Yd(e, t, n) {
    t.status = "fulfilled", t.value = n, $d(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, qd(e, n)));
  }
  function po(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, $d(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function $d(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Vd(e, t) {
    return t;
  }
  function Xd(e, t) {
    if (Se) {
      var n = De.formState;
      if (n !== null) {
        e: {
          var a = de;
          if (Se) {
            if (Le) {
              t: {
                for (var l = Le, i = Dt; l.nodeType !== 8; ) {
                  if (!i) {
                    l = null;
                    break t;
                  }
                  if (l = Lt(
                    l.nextSibling
                  ), l === null) {
                    l = null;
                    break t;
                  }
                }
                i = l.data, l = i === "F!" || i === "F" ? l : null;
              }
              if (l) {
                Le = Lt(
                  l.nextSibling
                ), a = l.data === "F!";
                break e;
              }
            }
            Cn(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return n = it(), n.memoizedState = n.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vd,
      lastRenderedState: t
    }, n.queue = a, n = df.bind(
      null,
      de,
      a
    ), a.dispatch = n, a = go(!1), i = jo.bind(
      null,
      de,
      !1,
      a.queue
    ), a = it(), l = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = l, n = I2.bind(
      null,
      de,
      l,
      i,
      n
    ), l.dispatch = n, a.memoizedState = e, [t, n, !1];
  }
  function Qd(e) {
    var t = Xe();
    return Zd(t, Ae, e);
  }
  function Zd(e, t, n) {
    if (t = mo(
      e,
      t,
      Vd
    )[0], e = Pr(an)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Ll(t);
      } catch (d) {
        throw d === qa ? $r : d;
      }
    else a = t;
    t = Xe();
    var l = t.queue, i = l.dispatch;
    return n !== t.memoizedState && (de.flags |= 2048, Xa(
      9,
      { destroy: void 0 },
      P2.bind(null, l, n),
      null
    )), [a, i, e];
  }
  function P2(e, t) {
    e.action = t;
  }
  function Kd(e) {
    var t = Xe(), n = Ae;
    if (n !== null)
      return Zd(t, n, e);
    Xe(), t = t.memoizedState, n = Xe();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, !1];
  }
  function Xa(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = de.updateQueue, t === null && (t = Fr(), de.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Jd() {
    return Xe().memoizedState;
  }
  function es(e, t, n, a) {
    var l = it();
    de.flags |= e, l.memoizedState = Xa(
      1 | t,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function ts(e, t, n, a) {
    var l = Xe();
    a = a === void 0 ? null : a;
    var i = l.memoizedState.inst;
    Ae !== null && a !== null && so(a, Ae.memoizedState.deps) ? l.memoizedState = Xa(t, i, n, a) : (de.flags |= e, l.memoizedState = Xa(
      1 | t,
      i,
      n,
      a
    ));
  }
  function Wd(e, t) {
    es(8390656, 8, e, t);
  }
  function xo(e, t) {
    ts(2048, 8, e, t);
  }
  function eh(e) {
    de.flags |= 4;
    var t = de.updateQueue;
    if (t === null)
      t = Fr(), de.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Fd(e) {
    var t = Xe().memoizedState;
    return eh({ ref: t, nextImpl: e }), function() {
      if ((_e & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Id(e, t) {
    return ts(4, 2, e, t);
  }
  function Pd(e, t) {
    return ts(4, 4, e, t);
  }
  function ef(e, t) {
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
  function tf(e, t, n) {
    n = n != null ? n.concat([e]) : null, ts(4, 4, ef.bind(null, t, e), n);
  }
  function bo() {
  }
  function nf(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && so(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function af(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && so(t, a[1]))
      return a[0];
    if (a = e(), ca) {
      bn(!0);
      try {
        e();
      } finally {
        bn(!1);
      }
    }
    return n.memoizedState = [a, t], a;
  }
  function yo(e, t, n) {
    return n === void 0 || (nn & 1073741824) !== 0 && (ye & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = r0(), de.lanes |= e, Mn |= e, n);
  }
  function lf(e, t, n, a) {
    return vt(n, t) ? n : Ya.current !== null ? (e = yo(e, n, a), vt(e, t) || (Ke = !0), e) : (nn & 42) === 0 || (nn & 1073741824) !== 0 && (ye & 261930) === 0 ? (Ke = !0, e.memoizedState = n) : (e = r0(), de.lanes |= e, Mn |= e, t);
  }
  function rf(e, t, n, a, l) {
    var i = Q.p;
    Q.p = i !== 0 && 8 > i ? i : 8;
    var d = w.T, h = {};
    w.T = h, jo(e, !1, t, n);
    try {
      var S = l(), T = w.S;
      if (T !== null && T(h, S), S !== null && typeof S == "object" && typeof S.then == "function") {
        var U = J2(
          S,
          a
        );
        Bl(
          e,
          t,
          U,
          Tt(e)
        );
      } else
        Bl(
          e,
          t,
          a,
          Tt(e)
        );
    } catch (q) {
      Bl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: q },
        Tt()
      );
    } finally {
      Q.p = i, d !== null && h.types !== null && (d.types = h.types), w.T = d;
    }
  }
  function th() {
  }
  function vo(e, t, n, a) {
    if (e.tag !== 5) throw Error(u(476));
    var l = sf(e).queue;
    rf(
      e,
      l,
      t,
      ee,
      n === null ? th : function() {
        return of(e), n(a);
      }
    );
  }
  function sf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: an,
        lastRenderedState: ee
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
        lastRenderedReducer: an,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function of(e) {
    var t = sf(e);
    t.next === null && (t = e.alternate.memoizedState), Bl(
      e,
      t.next.queue,
      {},
      Tt()
    );
  }
  function So() {
    return tt(tr);
  }
  function cf() {
    return Xe().memoizedState;
  }
  function uf() {
    return Xe().memoizedState;
  }
  function nh(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Tt();
          e = Tn(n);
          var a = _n(t, e, n);
          a !== null && (ht(a, t, n), Ol(a, t, n)), t = { cache: Ji() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ah(e, t, n) {
    var a = Tt();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ns(e) ? ff(t, n) : (n = Bi(e, t, n, a), n !== null && (ht(n, e, a), mf(n, t, a)));
  }
  function df(e, t, n) {
    var a = Tt();
    Bl(e, t, n, a);
  }
  function Bl(e, t, n, a) {
    var l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ns(e)) ff(t, l);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var d = t.lastRenderedState, h = i(d, n);
          if (l.hasEagerState = !0, l.eagerState = h, vt(h, d))
            return Ur(e, t, l, 0), De === null && Dr(), !1;
        } catch {
        } finally {
        }
      if (n = Bi(e, t, l, a), n !== null)
        return ht(n, e, a), mf(n, t, a), !0;
    }
    return !1;
  }
  function jo(e, t, n, a) {
    if (a = {
      lane: 2,
      revertLane: ec(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ns(e)) {
      if (t) throw Error(u(479));
    } else
      t = Bi(
        e,
        n,
        a,
        2
      ), t !== null && ht(t, e, 2);
  }
  function ns(e) {
    var t = e.alternate;
    return e === de || t !== null && t === de;
  }
  function ff(e, t) {
    $a = Jr = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function mf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, xu(e, n);
    }
  }
  var Hl = {
    readContext: tt,
    use: Ir,
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
  Hl.useEffectEvent = Ye;
  var hf = {
    readContext: tt,
    use: Ir,
    useCallback: function(e, t) {
      return it().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: tt,
    useEffect: Wd,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, es(
        4194308,
        4,
        ef.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return es(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      es(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = it();
      t = t === void 0 ? null : t;
      var a = e();
      if (ca) {
        bn(!0);
        try {
          e();
        } finally {
          bn(!1);
        }
      }
      return n.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, n) {
      var a = it();
      if (n !== void 0) {
        var l = n(t);
        if (ca) {
          bn(!0);
          try {
            n(t);
          } finally {
            bn(!1);
          }
        }
      } else l = t;
      return a.memoizedState = a.baseState = l, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: l
      }, a.queue = e, e = e.dispatch = ah.bind(
        null,
        de,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = it();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = go(e);
      var t = e.queue, n = df.bind(null, de, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: bo,
    useDeferredValue: function(e, t) {
      var n = it();
      return yo(n, e, t);
    },
    useTransition: function() {
      var e = go(!1);
      return e = rf.bind(
        null,
        de,
        e.queue,
        !0,
        !1
      ), it().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var a = de, l = it();
      if (Se) {
        if (n === void 0)
          throw Error(u(407));
        n = n();
      } else {
        if (n = t(), De === null)
          throw Error(u(349));
        (ye & 127) !== 0 || Rd(a, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return l.queue = i, Wd(Ud.bind(null, a, i, e), [
        e
      ]), a.flags |= 2048, Xa(
        9,
        { destroy: void 0 },
        Dd.bind(
          null,
          a,
          i,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = it(), t = De.identifierPrefix;
      if (Se) {
        var n = $t, a = Yt;
        n = (a & ~(1 << 32 - yt(a) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Wr++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = W2++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: So,
    useFormState: Xd,
    useActionState: Xd,
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
      return t.queue = n, t = jo.bind(
        null,
        de,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: fo,
    useCacheRefresh: function() {
      return it().memoizedState = nh.bind(
        null,
        de
      );
    },
    useEffectEvent: function(e) {
      var t = it(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((_e & 2) !== 0)
          throw Error(u(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Co = {
    readContext: tt,
    use: Ir,
    useCallback: nf,
    useContext: tt,
    useEffect: xo,
    useImperativeHandle: tf,
    useInsertionEffect: Id,
    useLayoutEffect: Pd,
    useMemo: af,
    useReducer: Pr,
    useRef: Jd,
    useState: function() {
      return Pr(an);
    },
    useDebugValue: bo,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return lf(
        n,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Pr(an)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ll(e),
        t
      ];
    },
    useSyncExternalStore: Od,
    useId: cf,
    useHostTransitionStatus: So,
    useFormState: Qd,
    useActionState: Qd,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Hd(n, Ae, e, t);
    },
    useMemoCache: fo,
    useCacheRefresh: uf
  };
  Co.useEffectEvent = Fd;
  var gf = {
    readContext: tt,
    use: Ir,
    useCallback: nf,
    useContext: tt,
    useEffect: xo,
    useImperativeHandle: tf,
    useInsertionEffect: Id,
    useLayoutEffect: Pd,
    useMemo: af,
    useReducer: ho,
    useRef: Jd,
    useState: function() {
      return ho(an);
    },
    useDebugValue: bo,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return Ae === null ? yo(n, e, t) : lf(
        n,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ho(an)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ll(e),
        t
      ];
    },
    useSyncExternalStore: Od,
    useId: cf,
    useHostTransitionStatus: So,
    useFormState: Kd,
    useActionState: Kd,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Ae !== null ? Hd(n, Ae, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: fo,
    useCacheRefresh: uf
  };
  gf.useEffectEvent = Fd;
  function No(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : b({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Eo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var a = Tt(), l = Tn(a);
      l.payload = t, n != null && (l.callback = n), t = _n(e, l, a), t !== null && (ht(t, e, a), Ol(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var a = Tt(), l = Tn(a);
      l.tag = 1, l.payload = t, n != null && (l.callback = n), t = _n(e, l, a), t !== null && (ht(t, e, a), Ol(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Tt(), a = Tn(n);
      a.tag = 2, t != null && (a.callback = t), t = _n(e, a, n), t !== null && (ht(t, e, n), Ol(t, e, n));
    }
  };
  function pf(e, t, n, a, l, i, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, i, d) : t.prototype && t.prototype.isPureReactComponent ? !El(n, a) || !El(l, i) : !0;
  }
  function xf(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && Eo.enqueueReplaceState(t, t.state, null);
  }
  function ua(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t)
        a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = b({}, n));
      for (var l in e)
        n[l] === void 0 && (n[l] = e[l]);
    }
    return n;
  }
  function bf(e) {
    Rr(e);
  }
  function yf(e) {
    console.error(e);
  }
  function vf(e) {
    Rr(e);
  }
  function as(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Sf(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function To(e, t, n) {
    return n = Tn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      as(e, t);
    }, n;
  }
  function jf(e) {
    return e = Tn(e), e.tag = 3, e;
  }
  function Cf(e, t, n, a) {
    var l = n.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var i = a.value;
      e.payload = function() {
        return l(i);
      }, e.callback = function() {
        Sf(t, n, a);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      Sf(t, n, a), typeof l != "function" && (On === null ? On = /* @__PURE__ */ new Set([this]) : On.add(this));
      var h = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function lh(e, t, n, a, l) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && La(
        t,
        n,
        l,
        !0
      ), n = jt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ut === null ? gs() : n.alternate === null && $e === 0 && ($e = 3), n.flags &= -257, n.flags |= 65536, n.lanes = l, a === Vr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Fo(e, a, l)), !1;
          case 22:
            return n.flags |= 65536, a === Vr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), Fo(e, a, l)), !1;
        }
        throw Error(u(435, n.tag));
      }
      return Fo(e, a, l), gs(), !1;
    }
    if (Se)
      return t = jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, a !== Vi && (e = Error(u(422), { cause: a }), wl(Mt(e, n)))) : (a !== Vi && (t = Error(u(423), {
        cause: a
      }), wl(
        Mt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, a = Mt(a, n), l = To(
        e.stateNode,
        a,
        l
      ), to(e, l), $e !== 4 && ($e = 2)), !1;
    var i = Error(u(520), { cause: a });
    if (i = Mt(i, n), Zl === null ? Zl = [i] : Zl.push(i), $e !== 4 && ($e = 2), t === null) return !0;
    a = Mt(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = l & -l, n.lanes |= e, e = To(n.stateNode, a, e), to(n, e), !1;
        case 1:
          if (t = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (On === null || !On.has(i))))
            return n.flags |= 65536, l &= -l, n.lanes |= l, l = jf(l), Cf(
              l,
              e,
              n,
              a
            ), to(n, l), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var _o = Error(u(461)), Ke = !1;
  function nt(e, t, n, a) {
    t.child = e === null ? Td(t, null, n, a) : oa(
      t,
      e.child,
      n,
      a
    );
  }
  function Nf(e, t, n, a, l) {
    n = n.render;
    var i = t.ref;
    if ("ref" in a) {
      var d = {};
      for (var h in a)
        h !== "ref" && (d[h] = a[h]);
    } else d = a;
    return la(t), a = io(
      e,
      t,
      n,
      d,
      i,
      l
    ), h = oo(), e !== null && !Ke ? (co(e, t, l), ln(e, t, l)) : (Se && h && Yi(t), t.flags |= 1, nt(e, t, a, l), t.child);
  }
  function Ef(e, t, n, a, l) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !Hi(i) && i.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = i, Tf(
        e,
        t,
        i,
        a,
        l
      )) : (e = Br(
        n.type,
        null,
        a,
        t,
        t.mode,
        l
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !Do(e, l)) {
      var d = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : El, n(d, a) && e.ref === t.ref)
        return ln(e, t, l);
    }
    return t.flags |= 1, e = It(i, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Tf(e, t, n, a, l) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (El(i, a) && e.ref === t.ref)
        if (Ke = !1, t.pendingProps = a = i, Do(e, l))
          (e.flags & 131072) !== 0 && (Ke = !0);
        else
          return t.lanes = e.lanes, ln(e, t, l);
    }
    return wo(
      e,
      t,
      n,
      a,
      l
    );
  }
  function _f(e, t, n, a) {
    var l = a.children, i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | n : n, e !== null) {
          for (a = t.child = e.child, l = 0; a !== null; )
            l = l | a.lanes | a.childLanes, a = a.sibling;
          a = l & ~i;
        } else a = 0, t.child = null;
        return wf(
          e,
          t,
          i,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Yr(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? zd(t, i) : ao(), kd(t);
      else
        return a = t.lanes = 536870912, wf(
          e,
          t,
          i !== null ? i.baseLanes | n : n,
          n,
          a
        );
    } else
      i !== null ? (Yr(t, i.cachePool), zd(t, i), zn(), t.memoizedState = null) : (e !== null && Yr(t, null), ao(), zn());
    return nt(e, t, l, n), t.child;
  }
  function ql(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function wf(e, t, n, a, l) {
    var i = Fi();
    return i = i === null ? null : { parent: Qe._currentValue, pool: i }, t.memoizedState = {
      baseLanes: n,
      cachePool: i
    }, e !== null && Yr(t, null), ao(), kd(t), e !== null && La(e, t, a, !0), t.childLanes = l, null;
  }
  function ls(e, t) {
    return t = ss(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function zf(e, t, n) {
    return oa(t, e.child, null, n), e = ls(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function rh(e, t, n) {
    var a = t.pendingProps, l = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Se) {
        if (a.mode === "hidden")
          return e = ls(t, a), t.lanes = 536870912, ql(null, e);
        if (ro(t), (e = Le) ? (e = G0(
          e,
          Dt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Sn !== null ? { id: Yt, overflow: $t } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = dd(e), n.return = t, t.child = n, et = t, Le = null)) : e = null, e === null) throw Cn(t);
        return t.lanes = 536870912, null;
      }
      return ls(t, a);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var d = i.dehydrated;
      if (ro(t), l)
        if (t.flags & 256)
          t.flags &= -257, t = zf(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (Ke || La(e, t, n, !1), l = (n & e.childLanes) !== 0, Ke || l) {
        if (a = De, a !== null && (d = bu(a, n), d !== 0 && d !== i.retryLane))
          throw i.retryLane = d, ea(e, d), ht(a, e, d), _o;
        gs(), t = zf(
          e,
          t,
          n
        );
      } else
        e = i.treeContext, Le = Lt(d.nextSibling), et = t, Se = !0, jn = null, Dt = !1, e !== null && hd(t, e), t = ls(t, a), t.flags |= 4096;
      return t;
    }
    return e = It(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function rs(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function wo(e, t, n, a, l) {
    return la(t), n = io(
      e,
      t,
      n,
      a,
      void 0,
      l
    ), a = oo(), e !== null && !Ke ? (co(e, t, l), ln(e, t, l)) : (Se && a && Yi(t), t.flags |= 1, nt(e, t, n, l), t.child);
  }
  function kf(e, t, n, a, l, i) {
    return la(t), t.updateQueue = null, n = Md(
      t,
      a,
      n,
      l
    ), Ad(e), a = oo(), e !== null && !Ke ? (co(e, t, i), ln(e, t, i)) : (Se && a && Yi(t), t.flags |= 1, nt(e, t, n, i), t.child);
  }
  function Af(e, t, n, a, l) {
    if (la(t), t.stateNode === null) {
      var i = Oa, d = n.contextType;
      typeof d == "object" && d !== null && (i = tt(d)), i = new n(a, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Eo, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = a, i.state = t.memoizedState, i.refs = {}, Pi(t), d = n.contextType, i.context = typeof d == "object" && d !== null ? tt(d) : Oa, i.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (No(
        t,
        n,
        d,
        a
      ), i.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (d = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), d !== i.state && Eo.enqueueReplaceState(i, i.state, null), Dl(t, a, i, l), Rl(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      i = t.stateNode;
      var h = t.memoizedProps, S = ua(n, h);
      i.props = S;
      var T = i.context, U = n.contextType;
      d = Oa, typeof U == "object" && U !== null && (d = tt(U));
      var q = n.getDerivedStateFromProps;
      U = typeof q == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, U || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || T !== d) && xf(
        t,
        i,
        a,
        d
      ), En = !1;
      var k = t.memoizedState;
      i.state = k, Dl(t, a, i, l), Rl(), T = t.memoizedState, h || k !== T || En ? (typeof q == "function" && (No(
        t,
        n,
        q,
        a
      ), T = t.memoizedState), (S = En || pf(
        t,
        n,
        S,
        a,
        k,
        T,
        d
      )) ? (U || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = T), i.props = a, i.state = T, i.context = d, a = S) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      i = t.stateNode, eo(e, t), d = t.memoizedProps, U = ua(n, d), i.props = U, q = t.pendingProps, k = i.context, T = n.contextType, S = Oa, typeof T == "object" && T !== null && (S = tt(T)), h = n.getDerivedStateFromProps, (T = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (d !== q || k !== S) && xf(
        t,
        i,
        a,
        S
      ), En = !1, k = t.memoizedState, i.state = k, Dl(t, a, i, l), Rl();
      var O = t.memoizedState;
      d !== q || k !== O || En || e !== null && e.dependencies !== null && qr(e.dependencies) ? (typeof h == "function" && (No(
        t,
        n,
        h,
        a
      ), O = t.memoizedState), (U = En || pf(
        t,
        n,
        U,
        a,
        k,
        O,
        S
      ) || e !== null && e.dependencies !== null && qr(e.dependencies)) ? (T || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, O, S), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        a,
        O,
        S
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = O), i.props = a, i.state = O, i.context = S, a = U) : (typeof i.componentDidUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return i = a, rs(e, t), a = (t.flags & 128) !== 0, i || a ? (i = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && a ? (t.child = oa(
      t,
      e.child,
      null,
      l
    ), t.child = oa(
      t,
      null,
      n,
      l
    )) : nt(e, t, n, l), t.memoizedState = i.state, e = t.child) : e = ln(
      e,
      t,
      l
    ), e;
  }
  function Mf(e, t, n, a) {
    return na(), t.flags |= 256, nt(e, t, n, a), t.child;
  }
  var zo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ko(e) {
    return { baseLanes: e, cachePool: vd() };
  }
  function Ao(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Et), e;
  }
  function Of(e, t, n) {
    var a = t.pendingProps, l = !1, i = (t.flags & 128) !== 0, d;
    if ((d = i) || (d = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0), d && (l = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Se) {
        if (l ? wn(t) : zn(), (e = Le) ? (e = G0(
          e,
          Dt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Sn !== null ? { id: Yt, overflow: $t } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = dd(e), n.return = t, t.child = n, et = t, Le = null)) : e = null, e === null) throw Cn(t);
        return mc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var h = a.children;
      return a = a.fallback, l ? (zn(), l = t.mode, h = ss(
        { mode: "hidden", children: h },
        l
      ), a = ta(
        a,
        l,
        n,
        null
      ), h.return = t, a.return = t, h.sibling = a, t.child = h, a = t.child, a.memoizedState = ko(n), a.childLanes = Ao(
        e,
        d,
        n
      ), t.memoizedState = zo, ql(null, a)) : (wn(t), Mo(t, h));
    }
    var S = e.memoizedState;
    if (S !== null && (h = S.dehydrated, h !== null)) {
      if (i)
        t.flags & 256 ? (wn(t), t.flags &= -257, t = Oo(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (zn(), t.child = e.child, t.flags |= 128, t = null) : (zn(), h = a.fallback, l = t.mode, a = ss(
          { mode: "visible", children: a.children },
          l
        ), h = ta(
          h,
          l,
          n,
          null
        ), h.flags |= 2, a.return = t, h.return = t, a.sibling = h, t.child = a, oa(
          t,
          e.child,
          null,
          n
        ), a = t.child, a.memoizedState = ko(n), a.childLanes = Ao(
          e,
          d,
          n
        ), t.memoizedState = zo, t = ql(null, a));
      else if (wn(t), mc(h)) {
        if (d = h.nextSibling && h.nextSibling.dataset, d) var T = d.dgst;
        d = T, a = Error(u(419)), a.stack = "", a.digest = d, wl({ value: a, source: null, stack: null }), t = Oo(
          e,
          t,
          n
        );
      } else if (Ke || La(e, t, n, !1), d = (n & e.childLanes) !== 0, Ke || d) {
        if (d = De, d !== null && (a = bu(d, n), a !== 0 && a !== S.retryLane))
          throw S.retryLane = a, ea(e, a), ht(d, e, a), _o;
        fc(h) || gs(), t = Oo(
          e,
          t,
          n
        );
      } else
        fc(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = S.treeContext, Le = Lt(
          h.nextSibling
        ), et = t, Se = !0, jn = null, Dt = !1, e !== null && hd(t, e), t = Mo(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return l ? (zn(), h = a.fallback, l = t.mode, S = e.child, T = S.sibling, a = It(S, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = S.subtreeFlags & 65011712, T !== null ? h = It(
      T,
      h
    ) : (h = ta(
      h,
      l,
      n,
      null
    ), h.flags |= 2), h.return = t, a.return = t, a.sibling = h, t.child = a, ql(null, a), a = t.child, h = e.child.memoizedState, h === null ? h = ko(n) : (l = h.cachePool, l !== null ? (S = Qe._currentValue, l = l.parent !== S ? { parent: S, pool: S } : l) : l = vd(), h = {
      baseLanes: h.baseLanes | n,
      cachePool: l
    }), a.memoizedState = h, a.childLanes = Ao(
      e,
      d,
      n
    ), t.memoizedState = zo, ql(e.child, a)) : (wn(t), n = e.child, e = n.sibling, n = It(n, {
      mode: "visible",
      children: a.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Mo(e, t) {
    return t = ss(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function ss(e, t) {
    return e = St(22, e, null, t), e.lanes = 0, e;
  }
  function Oo(e, t, n) {
    return oa(t, e.child, null, n), e = Mo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Rf(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Zi(e.return, t, n);
  }
  function Ro(e, t, n, a, l, i) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: l,
      treeForkCount: i
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = a, d.tail = n, d.tailMode = l, d.treeForkCount = i);
  }
  function Df(e, t, n) {
    var a = t.pendingProps, l = a.revealOrder, i = a.tail;
    a = a.children;
    var d = Ve.current, h = (d & 2) !== 0;
    if (h ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, K(Ve, d), nt(e, t, a, n), a = Se ? _l : 0, !h && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Rf(e, n, t);
        else if (e.tag === 19)
          Rf(e, n, t);
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
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && Kr(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Ro(
          t,
          !1,
          l,
          n,
          i,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && Kr(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        Ro(
          t,
          !0,
          n,
          null,
          i,
          a
        );
        break;
      case "together":
        Ro(
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
  function ln(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Mn |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (La(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, n = It(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = It(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Do(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && qr(e)));
  }
  function sh(e, t, n) {
    switch (t.tag) {
      case 3:
        Re(t, t.stateNode.containerInfo), Nn(t, Qe, e.memoizedState.cache), na();
        break;
      case 27:
      case 5:
        Zn(t);
        break;
      case 4:
        Re(t, t.stateNode.containerInfo);
        break;
      case 10:
        Nn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, ro(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (wn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Of(e, t, n) : (wn(t), e = ln(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        wn(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (La(
          e,
          t,
          n,
          !1
        ), a = (n & t.childLanes) !== 0), l) {
          if (a)
            return Df(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), K(Ve, Ve.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, _f(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Nn(t, Qe, e.memoizedState.cache);
    }
    return ln(e, t, n);
  }
  function Uf(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ke = !0;
      else {
        if (!Do(e, n) && (t.flags & 128) === 0)
          return Ke = !1, sh(
            e,
            t,
            n
          );
        Ke = (e.flags & 131072) !== 0;
      }
    else
      Ke = !1, Se && (t.flags & 1048576) !== 0 && md(t, _l, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = sa(t.elementType), t.type = e, typeof e == "function")
            Hi(e) ? (a = ua(e, a), t.tag = 1, t = Af(
              null,
              t,
              e,
              a,
              n
            )) : (t.tag = 0, t = wo(
              null,
              t,
              e,
              a,
              n
            ));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === re) {
                t.tag = 11, t = Nf(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              } else if (l === Y) {
                t.tag = 14, t = Ef(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              }
            }
            throw t = he(e) || e, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return wo(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return a = t.type, l = ua(
          a,
          t.pendingProps
        ), Af(
          e,
          t,
          a,
          l,
          n
        );
      case 3:
        e: {
          if (Re(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          a = t.pendingProps;
          var i = t.memoizedState;
          l = i.element, eo(e, t), Dl(t, a, null, n);
          var d = t.memoizedState;
          if (a = d.cache, Nn(t, Qe, a), a !== i.cache && Ki(
            t,
            [Qe],
            n,
            !0
          ), Rl(), a = d.element, i.isDehydrated)
            if (i = {
              element: a,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = Mf(
                e,
                t,
                a,
                n
              );
              break e;
            } else if (a !== l) {
              l = Mt(
                Error(u(424)),
                t
              ), wl(l), t = Mf(
                e,
                t,
                a,
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
              for (Le = Lt(e.firstChild), et = t, Se = !0, jn = null, Dt = !0, n = Td(
                t,
                null,
                a,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (na(), a === l) {
              t = ln(
                e,
                t,
                n
              );
              break e;
            }
            nt(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return rs(e, t), e === null ? (n = Z0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Se || (n = t.type, e = t.pendingProps, a = js(
          Z.current
        ).createElement(n), a[Pe] = t, a[ot] = e, at(a, n, e), Fe(a), t.stateNode = a) : t.memoizedState = Z0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Zn(t), e === null && Se && (a = t.stateNode = V0(
          t.type,
          t.pendingProps,
          Z.current
        ), et = t, Dt = !0, l = Le, Ln(t.type) ? (hc = l, Le = Lt(a.firstChild)) : Le = l), nt(
          e,
          t,
          t.pendingProps.children,
          n
        ), rs(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Se && ((l = a = Le) && (a = Uh(
          a,
          t.type,
          t.pendingProps,
          Dt
        ), a !== null ? (t.stateNode = a, et = t, Le = Lt(a.firstChild), Dt = !1, l = !0) : l = !1), l || Cn(t)), Zn(t), l = t.type, i = t.pendingProps, d = e !== null ? e.memoizedProps : null, a = i.children, cc(l, i) ? a = null : d !== null && cc(l, d) && (t.flags |= 32), t.memoizedState !== null && (l = io(
          e,
          t,
          F2,
          null,
          null,
          n
        ), tr._currentValue = l), rs(e, t), nt(e, t, a, n), t.child;
      case 6:
        return e === null && Se && ((e = n = Le) && (n = Lh(
          n,
          t.pendingProps,
          Dt
        ), n !== null ? (t.stateNode = n, et = t, Le = null, e = !0) : e = !1), e || Cn(t)), null;
      case 13:
        return Of(e, t, n);
      case 4:
        return Re(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = oa(
          t,
          null,
          a,
          n
        ) : nt(e, t, a, n), t.child;
      case 11:
        return Nf(
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
        return a = t.pendingProps, Nn(t, t.type, a.value), nt(e, t, a.children, n), t.child;
      case 9:
        return l = t.type._context, a = t.pendingProps.children, la(t), l = tt(l), a = a(l), t.flags |= 1, nt(e, t, a, n), t.child;
      case 14:
        return Ef(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Tf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Df(e, t, n);
      case 31:
        return rh(e, t, n);
      case 22:
        return _f(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return la(t), a = tt(Qe), e === null ? (l = Fi(), l === null && (l = De, i = Ji(), l.pooledCache = i, i.refCount++, i !== null && (l.pooledCacheLanes |= n), l = i), t.memoizedState = { parent: a, cache: l }, Pi(t), Nn(t, Qe, l)) : ((e.lanes & n) !== 0 && (eo(e, t), Dl(t, null, null, n), Rl()), l = e.memoizedState, i = t.memoizedState, l.parent !== a ? (l = { parent: a, cache: a }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), Nn(t, Qe, a)) : (a = i.cache, Nn(t, Qe, a), a !== l.cache && Ki(
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
    throw Error(u(156, t.tag));
  }
  function rn(e) {
    e.flags |= 4;
  }
  function Uo(e, t, n, a, l) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (l & 335544128) === l)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (c0()) e.flags |= 8192;
        else
          throw ia = Vr, Ii;
    } else e.flags &= -16777217;
  }
  function Lf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !I0(t))
      if (c0()) e.flags |= 8192;
      else
        throw ia = Vr, Ii;
  }
  function is(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? gu() : 536870912, e.lanes |= t, Ja |= t);
  }
  function Gl(e, t) {
    if (!Se)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function Be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t)
      for (var l = e.child; l !== null; )
        n |= l.lanes | l.childLanes, a |= l.subtreeFlags & 65011712, a |= l.flags & 65011712, l.return = e, l = l.sibling;
    else
      for (l = e.child; l !== null; )
        n |= l.lanes | l.childLanes, a |= l.subtreeFlags, a |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function ih(e, t, n) {
    var a = t.pendingProps;
    switch ($i(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Be(t), null;
      case 1:
        return Be(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), tn(Qe), Te(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ua(t) ? rn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Xi())), Be(t), null;
      case 26:
        var l = t.type, i = t.memoizedState;
        return e === null ? (rn(t), i !== null ? (Be(t), Lf(t, i)) : (Be(t), Uo(
          t,
          l,
          null,
          a,
          n
        ))) : i ? i !== e.memoizedState ? (rn(t), Be(t), Lf(t, i)) : (Be(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && rn(t), Be(t), Uo(
          t,
          l,
          e,
          a,
          n
        )), null;
      case 27:
        if (br(t), n = Z.current, l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && rn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Be(t), null;
          }
          e = D.current, Ua(t) ? gd(t) : (e = V0(l, a, n), t.stateNode = e, rn(t));
        }
        return Be(t), null;
      case 5:
        if (br(t), l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && rn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Be(t), null;
          }
          if (i = D.current, Ua(t))
            gd(t);
          else {
            var d = js(
              Z.current
            );
            switch (i) {
              case 1:
                i = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  l
                );
                break;
              case 2:
                i = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  l
                );
                break;
              default:
                switch (l) {
                  case "svg":
                    i = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      l
                    );
                    break;
                  case "math":
                    i = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    i = d.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof a.is == "string" ? d.createElement("select", {
                      is: a.is
                    }) : d.createElement("select"), a.multiple ? i.multiple = !0 : a.size && (i.size = a.size);
                    break;
                  default:
                    i = typeof a.is == "string" ? d.createElement(l, { is: a.is }) : d.createElement(l);
                }
            }
            i[Pe] = t, i[ot] = a;
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
            e: switch (at(i, l, a), l) {
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
            a && rn(t);
          }
        }
        return Be(t), Uo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && rn(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = Z.current, Ua(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, l = et, l !== null)
              switch (l.tag) {
                case 27:
                case 5:
                  a = l.memoizedProps;
              }
            e[Pe] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || O0(e.nodeValue, n)), e || Cn(t, !0);
          } else
            e = js(e).createTextNode(
              a
            ), e[Pe] = t, t.stateNode = e;
        }
        return Be(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Ua(t), n !== null) {
            if (e === null) {
              if (!a) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[Pe] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Be(t), e = !1;
          } else
            n = Xi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Be(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (l = Ua(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(u(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(u(317));
              l[Pe] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Be(t), l = !1;
          } else
            l = Xi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = !0;
          if (!l)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = a !== null, e = e !== null && e.memoizedState !== null, n && (a = t.child, l = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (l = a.alternate.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== l && (a.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), is(t, t.updateQueue), Be(t), null);
      case 4:
        return Te(), e === null && lc(t.stateNode.containerInfo), Be(t), null;
      case 10:
        return tn(t.type), Be(t), null;
      case 19:
        if (H(Ve), a = t.memoizedState, a === null) return Be(t), null;
        if (l = (t.flags & 128) !== 0, i = a.rendering, i === null)
          if (l) Gl(a, !1);
          else {
            if ($e !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = Kr(e), i !== null) {
                  for (t.flags |= 128, Gl(a, !1), e = i.updateQueue, t.updateQueue = e, is(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    ud(n, e), n = n.sibling;
                  return K(
                    Ve,
                    Ve.current & 1 | 2
                  ), Se && Pt(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && xt() > fs && (t.flags |= 128, l = !0, Gl(a, !1), t.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = Kr(i), e !== null) {
              if (t.flags |= 128, l = !0, e = e.updateQueue, t.updateQueue = e, is(t, e), Gl(a, !0), a.tail === null && a.tailMode === "hidden" && !i.alternate && !Se)
                return Be(t), null;
            } else
              2 * xt() - a.renderingStartTime > fs && n !== 536870912 && (t.flags |= 128, l = !0, Gl(a, !1), t.lanes = 4194304);
          a.isBackwards ? (i.sibling = t.child, t.child = i) : (e = a.last, e !== null ? e.sibling = i : t.child = i, a.last = i);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = xt(), e.sibling = null, n = Ve.current, K(
          Ve,
          l ? n & 1 | 2 : n & 1
        ), Se && Pt(t, a.treeForkCount), e) : (Be(t), null);
      case 22:
      case 23:
        return Ct(t), lo(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Be(t), n = t.updateQueue, n !== null && is(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && H(ra), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), tn(Qe), Be(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function oh(e, t) {
    switch ($i(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return tn(Qe), Te(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return br(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null)
            throw Error(u(340));
          na();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          na();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return H(Ve), null;
      case 4:
        return Te(), null;
      case 10:
        return tn(t.type), null;
      case 22:
      case 23:
        return Ct(t), lo(), e !== null && H(ra), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return tn(Qe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Bf(e, t) {
    switch ($i(t), t.tag) {
      case 3:
        tn(Qe), Te();
        break;
      case 26:
      case 27:
      case 5:
        br(t);
        break;
      case 4:
        Te();
        break;
      case 31:
        t.memoizedState !== null && Ct(t);
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        H(Ve);
        break;
      case 10:
        tn(t.type);
        break;
      case 22:
      case 23:
        Ct(t), lo(), e !== null && H(ra);
        break;
      case 24:
        tn(Qe);
    }
  }
  function Yl(e, t) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var l = a.next;
        n = l;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var i = n.create, d = n.inst;
            a = i(), d.destroy = a;
          }
          n = n.next;
        } while (n !== l);
      }
    } catch (h) {
      ke(t, t.return, h);
    }
  }
  function kn(e, t, n) {
    try {
      var a = t.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            var d = a.inst, h = d.destroy;
            if (h !== void 0) {
              d.destroy = void 0, l = t;
              var S = n, T = h;
              try {
                T();
              } catch (U) {
                ke(
                  l,
                  S,
                  U
                );
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (U) {
      ke(t, t.return, U);
    }
  }
  function Hf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        wd(t, n);
      } catch (a) {
        ke(e, e.return, a);
      }
    }
  }
  function qf(e, t, n) {
    n.props = ua(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      ke(e, t, a);
    }
  }
  function $l(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
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
        typeof n == "function" ? e.refCleanup = n(a) : n.current = a;
      }
    } catch (l) {
      ke(e, t, l);
    }
  }
  function Vt(e, t) {
    var n = e.ref, a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (l) {
          ke(e, t, l);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (l) {
          ke(e, t, l);
        }
      else n.current = null;
  }
  function Gf(e) {
    var t = e.type, n = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (l) {
      ke(e, e.return, l);
    }
  }
  function Lo(e, t, n) {
    try {
      var a = e.stateNode;
      kh(a, e.type, n, t), a[ot] = t;
    } catch (l) {
      ke(e, e.return, l);
    }
  }
  function Yf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ln(e.type) || e.tag === 4;
  }
  function Bo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Yf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ln(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ho(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wt));
    else if (a !== 4 && (a === 27 && Ln(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Ho(e, t, n), e = e.sibling; e !== null; )
        Ho(e, t, n), e = e.sibling;
  }
  function os(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && Ln(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (os(e, t, n), e = e.sibling; e !== null; )
        os(e, t, n), e = e.sibling;
  }
  function $f(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      at(t, a, n), t[Pe] = e, t[ot] = n;
    } catch (i) {
      ke(e, e.return, i);
    }
  }
  var sn = !1, Je = !1, qo = !1, Vf = typeof WeakSet == "function" ? WeakSet : Set, Ie = null;
  function ch(e, t) {
    if (e = e.containerInfo, ic = zs, e = td(e), Mi(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var l = a.anchorOffset, i = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, i.nodeType;
            } catch {
              n = null;
              break e;
            }
            var d = 0, h = -1, S = -1, T = 0, U = 0, q = e, k = null;
            t: for (; ; ) {
              for (var O; q !== n || l !== 0 && q.nodeType !== 3 || (h = d + l), q !== i || a !== 0 && q.nodeType !== 3 || (S = d + a), q.nodeType === 3 && (d += q.nodeValue.length), (O = q.firstChild) !== null; )
                k = q, q = O;
              for (; ; ) {
                if (q === e) break t;
                if (k === n && ++T === l && (h = d), k === i && ++U === a && (S = d), (O = q.nextSibling) !== null) break;
                q = k, k = q.parentNode;
              }
              q = O;
            }
            n = h === -1 || S === -1 ? null : { start: h, end: S };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (oc = { focusedElem: e, selectionRange: n }, zs = !1, Ie = t; Ie !== null; )
      if (t = Ie, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ie = e;
      else
        for (; Ie !== null; ) {
          switch (t = Ie, i = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  l = e[n], l.ref.impl = l.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                e = void 0, n = t, l = i.memoizedProps, i = i.memoizedState, a = n.stateNode;
                try {
                  var F = ua(
                    n.type,
                    l
                  );
                  e = a.getSnapshotBeforeUpdate(
                    F,
                    i
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (le) {
                  ke(
                    n,
                    n.return,
                    le
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  dc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      dc(e);
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
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ie = e;
            break;
          }
          Ie = t.return;
        }
  }
  function Xf(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        cn(e, n), a & 4 && Yl(5, n);
        break;
      case 1:
        if (cn(e, n), a & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              ke(n, n.return, d);
            }
          else {
            var l = ua(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                l,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (d) {
              ke(
                n,
                n.return,
                d
              );
            }
          }
        a & 64 && Hf(n), a & 512 && $l(n, n.return);
        break;
      case 3:
        if (cn(e, n), a & 64 && (e = n.updateQueue, e !== null)) {
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
            wd(e, t);
          } catch (d) {
            ke(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && $f(n);
      case 26:
      case 5:
        cn(e, n), t === null && a & 4 && Gf(n), a & 512 && $l(n, n.return);
        break;
      case 12:
        cn(e, n);
        break;
      case 31:
        cn(e, n), a & 4 && Kf(e, n);
        break;
      case 13:
        cn(e, n), a & 4 && Jf(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = bh.bind(
          null,
          n
        ), Bh(e, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || sn, !a) {
          t = t !== null && t.memoizedState !== null || Je, l = sn;
          var i = Je;
          sn = a, (Je = t) && !i ? un(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : cn(e, n), sn = l, Je = i;
        }
        break;
      case 30:
        break;
      default:
        cn(e, n);
    }
  }
  function Qf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Qf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && gi(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var qe = null, ut = !1;
  function on(e, t, n) {
    for (n = n.child; n !== null; )
      Zf(e, t, n), n = n.sibling;
  }
  function Zf(e, t, n) {
    if (bt && typeof bt.onCommitFiberUnmount == "function")
      try {
        bt.onCommitFiberUnmount(ml, n);
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
        var a = qe, l = ut;
        Ln(n.type) && (qe = n.stateNode, ut = !1), on(
          e,
          t,
          n
        ), Il(n.stateNode), qe = a, ut = l;
        break;
      case 5:
        Je || Vt(n, t);
      case 6:
        if (a = qe, l = ut, qe = null, on(
          e,
          t,
          n
        ), qe = a, ut = l, qe !== null)
          if (ut)
            try {
              (qe.nodeType === 9 ? qe.body : qe.nodeName === "HTML" ? qe.ownerDocument.body : qe).removeChild(n.stateNode);
            } catch (i) {
              ke(
                n,
                t,
                i
              );
            }
          else
            try {
              qe.removeChild(n.stateNode);
            } catch (i) {
              ke(
                n,
                t,
                i
              );
            }
        break;
      case 18:
        qe !== null && (ut ? (e = qe, H0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), al(e)) : H0(qe, n.stateNode));
        break;
      case 4:
        a = qe, l = ut, qe = n.stateNode.containerInfo, ut = !0, on(
          e,
          t,
          n
        ), qe = a, ut = l;
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
        Je || (Vt(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && qf(
          n,
          t,
          a
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
        Je = (a = Je) || n.memoizedState !== null, on(
          e,
          t,
          n
        ), Je = a;
        break;
      default:
        on(
          e,
          t,
          n
        );
    }
  }
  function Kf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        al(e);
      } catch (n) {
        ke(t, t.return, n);
      }
    }
  }
  function Jf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        al(e);
      } catch (n) {
        ke(t, t.return, n);
      }
  }
  function uh(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Vf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Vf()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function cs(e, t) {
    var n = uh(e);
    t.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var l = yh.bind(null, e, a);
        a.then(l, l);
      }
    });
  }
  function dt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var l = n[a], i = e, d = t, h = d;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Ln(h.type)) {
                qe = h.stateNode, ut = !1;
                break e;
              }
              break;
            case 5:
              qe = h.stateNode, ut = !1;
              break e;
            case 3:
            case 4:
              qe = h.stateNode.containerInfo, ut = !0;
              break e;
          }
          h = h.return;
        }
        if (qe === null) throw Error(u(160));
        Zf(i, d, l), qe = null, ut = !1, i = l.alternate, i !== null && (i.return = null), l.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Wf(t, e), t = t.sibling;
  }
  var qt = null;
  function Wf(e, t) {
    var n = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dt(t, e), ft(e), a & 4 && (kn(3, e, e.return), Yl(3, e), kn(5, e, e.return));
        break;
      case 1:
        dt(t, e), ft(e), a & 512 && (Je || n === null || Vt(n, n.return)), a & 64 && sn && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var l = qt;
        if (dt(t, e), ft(e), a & 512 && (Je || n === null || Vt(n, n.return)), a & 4) {
          var i = n !== null ? n.memoizedState : null;
          if (a = e.memoizedState, n === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, n = e.memoizedProps, l = l.ownerDocument || l;
                  t: switch (a) {
                    case "title":
                      i = l.getElementsByTagName("title")[0], (!i || i[pl] || i[Pe] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = l.createElement(a), l.head.insertBefore(
                        i,
                        l.querySelector("head > title")
                      )), at(i, a, n), i[Pe] = e, Fe(i), a = i;
                      break e;
                    case "link":
                      var d = W0(
                        "link",
                        "href",
                        l
                      ).get(a + (n.href || ""));
                      if (d) {
                        for (var h = 0; h < d.length; h++)
                          if (i = d[h], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            d.splice(h, 1);
                            break t;
                          }
                      }
                      i = l.createElement(a), at(i, a, n), l.head.appendChild(i);
                      break;
                    case "meta":
                      if (d = W0(
                        "meta",
                        "content",
                        l
                      ).get(a + (n.content || ""))) {
                        for (h = 0; h < d.length; h++)
                          if (i = d[h], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            d.splice(h, 1);
                            break t;
                          }
                      }
                      i = l.createElement(a), at(i, a, n), l.head.appendChild(i);
                      break;
                    default:
                      throw Error(u(468, a));
                  }
                  i[Pe] = e, Fe(i), a = i;
                }
                e.stateNode = a;
              } else
                F0(
                  l,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = J0(
                l,
                a,
                e.memoizedProps
              );
          else
            i !== a ? (i === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : i.count--, a === null ? F0(
              l,
              e.type,
              e.stateNode
            ) : J0(
              l,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Lo(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        dt(t, e), ft(e), a & 512 && (Je || n === null || Vt(n, n.return)), n !== null && a & 4 && Lo(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (dt(t, e), ft(e), a & 512 && (Je || n === null || Vt(n, n.return)), e.flags & 32) {
          l = e.stateNode;
          try {
            Ta(l, "");
          } catch (F) {
            ke(e, e.return, F);
          }
        }
        a & 4 && e.stateNode != null && (l = e.memoizedProps, Lo(
          e,
          l,
          n !== null ? n.memoizedProps : l
        )), a & 1024 && (qo = !0);
        break;
      case 6:
        if (dt(t, e), ft(e), a & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (F) {
            ke(e, e.return, F);
          }
        }
        break;
      case 3:
        if (Es = null, l = qt, qt = Cs(t.containerInfo), dt(t, e), qt = l, ft(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            al(t.containerInfo);
          } catch (F) {
            ke(e, e.return, F);
          }
        qo && (qo = !1, Ff(e));
        break;
      case 4:
        a = qt, qt = Cs(
          e.stateNode.containerInfo
        ), dt(t, e), ft(e), qt = a;
        break;
      case 12:
        dt(t, e), ft(e);
        break;
      case 31:
        dt(t, e), ft(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, cs(e, a)));
        break;
      case 13:
        dt(t, e), ft(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (ds = xt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, cs(e, a)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var S = n !== null && n.memoizedState !== null, T = sn, U = Je;
        if (sn = T || l, Je = U || S, dt(t, e), Je = U, sn = T, ft(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (n === null || S || sn || Je || da(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                S = n = t;
                try {
                  if (i = S.stateNode, l)
                    d = i.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    h = S.stateNode;
                    var q = S.memoizedProps.style, k = q != null && q.hasOwnProperty("display") ? q.display : null;
                    h.style.display = k == null || typeof k == "boolean" ? "" : ("" + k).trim();
                  }
                } catch (F) {
                  ke(S, S.return, F);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                S = t;
                try {
                  S.stateNode.nodeValue = l ? "" : S.memoizedProps;
                } catch (F) {
                  ke(S, S.return, F);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                S = t;
                try {
                  var O = S.stateNode;
                  l ? q0(O, !0) : q0(S.stateNode, !1);
                } catch (F) {
                  ke(S, S.return, F);
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
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, cs(e, n))));
        break;
      case 19:
        dt(t, e), ft(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, cs(e, a)));
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
        for (var n, a = e.return; a !== null; ) {
          if (Yf(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var l = n.stateNode, i = Bo(e);
            os(e, i, l);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (Ta(d, ""), n.flags &= -33);
            var h = Bo(e);
            os(e, h, d);
            break;
          case 3:
          case 4:
            var S = n.stateNode.containerInfo, T = Bo(e);
            Ho(
              e,
              T,
              S
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (U) {
        ke(e, e.return, U);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ff(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ff(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function cn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Xf(e, t.alternate, t), t = t.sibling;
  }
  function da(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          kn(4, t, t.return), da(t);
          break;
        case 1:
          Vt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && qf(
            t,
            t.return,
            n
          ), da(t);
          break;
        case 27:
          Il(t.stateNode);
        case 26:
        case 5:
          Vt(t, t.return), da(t);
          break;
        case 22:
          t.memoizedState === null && da(t);
          break;
        case 30:
          da(t);
          break;
        default:
          da(t);
      }
      e = e.sibling;
    }
  }
  function un(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, l = e, i = t, d = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          un(
            l,
            i,
            n
          ), Yl(4, i);
          break;
        case 1:
          if (un(
            l,
            i,
            n
          ), a = i, l = a.stateNode, typeof l.componentDidMount == "function")
            try {
              l.componentDidMount();
            } catch (T) {
              ke(a, a.return, T);
            }
          if (a = i, l = a.updateQueue, l !== null) {
            var h = a.stateNode;
            try {
              var S = l.shared.hiddenCallbacks;
              if (S !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < S.length; l++)
                  _d(S[l], h);
            } catch (T) {
              ke(a, a.return, T);
            }
          }
          n && d & 64 && Hf(i), $l(i, i.return);
          break;
        case 27:
          $f(i);
        case 26:
        case 5:
          un(
            l,
            i,
            n
          ), n && a === null && d & 4 && Gf(i), $l(i, i.return);
          break;
        case 12:
          un(
            l,
            i,
            n
          );
          break;
        case 31:
          un(
            l,
            i,
            n
          ), n && d & 4 && Kf(l, i);
          break;
        case 13:
          un(
            l,
            i,
            n
          ), n && d & 4 && Jf(l, i);
          break;
        case 22:
          i.memoizedState === null && un(
            l,
            i,
            n
          ), $l(i, i.return);
          break;
        case 30:
          break;
        default:
          un(
            l,
            i,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Go(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && zl(n));
  }
  function Yo(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && zl(e));
  }
  function Gt(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        If(
          e,
          t,
          n,
          a
        ), t = t.sibling;
  }
  function If(e, t, n, a) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Gt(
          e,
          t,
          n,
          a
        ), l & 2048 && Yl(9, t);
        break;
      case 1:
        Gt(
          e,
          t,
          n,
          a
        );
        break;
      case 3:
        Gt(
          e,
          t,
          n,
          a
        ), l & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && zl(e)));
        break;
      case 12:
        if (l & 2048) {
          Gt(
            e,
            t,
            n,
            a
          ), e = t.stateNode;
          try {
            var i = t.memoizedProps, d = i.id, h = i.onPostCommit;
            typeof h == "function" && h(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (S) {
            ke(t, t.return, S);
          }
        } else
          Gt(
            e,
            t,
            n,
            a
          );
        break;
      case 31:
        Gt(
          e,
          t,
          n,
          a
        );
        break;
      case 13:
        Gt(
          e,
          t,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, d = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? Gt(
          e,
          t,
          n,
          a
        ) : Vl(e, t) : i._visibility & 2 ? Gt(
          e,
          t,
          n,
          a
        ) : (i._visibility |= 2, Qa(
          e,
          t,
          n,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), l & 2048 && Go(d, t);
        break;
      case 24:
        Gt(
          e,
          t,
          n,
          a
        ), l & 2048 && Yo(t.alternate, t);
        break;
      default:
        Gt(
          e,
          t,
          n,
          a
        );
    }
  }
  function Qa(e, t, n, a, l) {
    for (l = l && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e, d = t, h = n, S = a, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Qa(
            i,
            d,
            h,
            S,
            l
          ), Yl(8, d);
          break;
        case 23:
          break;
        case 22:
          var U = d.stateNode;
          d.memoizedState !== null ? U._visibility & 2 ? Qa(
            i,
            d,
            h,
            S,
            l
          ) : Vl(
            i,
            d
          ) : (U._visibility |= 2, Qa(
            i,
            d,
            h,
            S,
            l
          )), l && T & 2048 && Go(
            d.alternate,
            d
          );
          break;
        case 24:
          Qa(
            i,
            d,
            h,
            S,
            l
          ), l && T & 2048 && Yo(d.alternate, d);
          break;
        default:
          Qa(
            i,
            d,
            h,
            S,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Vl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, a = t, l = a.flags;
        switch (a.tag) {
          case 22:
            Vl(n, a), l & 2048 && Go(
              a.alternate,
              a
            );
            break;
          case 24:
            Vl(n, a), l & 2048 && Yo(a.alternate, a);
            break;
          default:
            Vl(n, a);
        }
        t = t.sibling;
      }
  }
  var Xl = 8192;
  function Za(e, t, n) {
    if (e.subtreeFlags & Xl)
      for (e = e.child; e !== null; )
        Pf(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Pf(e, t, n) {
    switch (e.tag) {
      case 26:
        Za(
          e,
          t,
          n
        ), e.flags & Xl && e.memoizedState !== null && Wh(
          n,
          qt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Za(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var a = qt;
        qt = Cs(e.stateNode.containerInfo), Za(
          e,
          t,
          n
        ), qt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Xl, Xl = 16777216, Za(
          e,
          t,
          n
        ), Xl = a) : Za(
          e,
          t,
          n
        ));
        break;
      default:
        Za(
          e,
          t,
          n
        );
    }
  }
  function e0(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ql(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          Ie = a, n0(
            a,
            e
          );
        }
      e0(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        t0(e), e = e.sibling;
  }
  function t0(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ql(e), e.flags & 2048 && kn(9, e, e.return);
        break;
      case 3:
        Ql(e);
        break;
      case 12:
        Ql(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, us(e)) : Ql(e);
        break;
      default:
        Ql(e);
    }
  }
  function us(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          Ie = a, n0(
            a,
            e
          );
        }
      e0(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          kn(8, t, t.return), us(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, us(t));
          break;
        default:
          us(t);
      }
      e = e.sibling;
    }
  }
  function n0(e, t) {
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
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          zl(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, Ie = a;
      else
        e: for (n = e; Ie !== null; ) {
          a = Ie;
          var l = a.sibling, i = a.return;
          if (Qf(a), a === n) {
            Ie = null;
            break e;
          }
          if (l !== null) {
            l.return = i, Ie = l;
            break e;
          }
          Ie = i;
        }
    }
  }
  var dh = {
    getCacheForType: function(e) {
      var t = tt(Qe), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return tt(Qe).controller.signal;
    }
  }, fh = typeof WeakMap == "function" ? WeakMap : Map, _e = 0, De = null, pe = null, ye = 0, ze = 0, Nt = null, An = !1, Ka = !1, $o = !1, dn = 0, $e = 0, Mn = 0, fa = 0, Vo = 0, Et = 0, Ja = 0, Zl = null, mt = null, Xo = !1, ds = 0, a0 = 0, fs = 1 / 0, ms = null, On = null, We = 0, Rn = null, Wa = null, fn = 0, Qo = 0, Zo = null, l0 = null, Kl = 0, Ko = null;
  function Tt() {
    return (_e & 2) !== 0 && ye !== 0 ? ye & -ye : w.T !== null ? ec() : yu();
  }
  function r0() {
    if (Et === 0)
      if ((ye & 536870912) === 0 || Se) {
        var e = Sr;
        Sr <<= 1, (Sr & 3932160) === 0 && (Sr = 262144), Et = e;
      } else Et = 536870912;
    return e = jt.current, e !== null && (e.flags |= 32), Et;
  }
  function ht(e, t, n) {
    (e === De && (ze === 2 || ze === 9) || e.cancelPendingCommit !== null) && (Fa(e, 0), Dn(
      e,
      ye,
      Et,
      !1
    )), gl(e, n), ((_e & 2) === 0 || e !== De) && (e === De && ((_e & 2) === 0 && (fa |= n), $e === 4 && Dn(
      e,
      ye,
      Et,
      !1
    )), Xt(e));
  }
  function s0(e, t, n) {
    if ((_e & 6) !== 0) throw Error(u(327));
    var a = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || hl(e, t), l = a ? gh(e, t) : Wo(e, t, !0), i = a;
    do {
      if (l === 0) {
        Ka && !a && Dn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, i && !mh(n)) {
          l = Wo(e, t, !1), i = !1;
          continue;
        }
        if (l === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var h = e;
              l = Zl;
              var S = h.current.memoizedState.isDehydrated;
              if (S && (Fa(h, d).flags |= 256), d = Wo(
                h,
                d,
                !1
              ), d !== 2) {
                if ($o && !S) {
                  h.errorRecoveryDisabledLanes |= i, fa |= i, l = 4;
                  break e;
                }
                i = mt, mt = l, i !== null && (mt === null ? mt = i : mt.push.apply(
                  mt,
                  i
                ));
              }
              l = d;
            }
            if (i = !1, l !== 2) continue;
          }
        }
        if (l === 1) {
          Fa(e, 0), Dn(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, i = l, i) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Dn(
                a,
                t,
                Et,
                !An
              );
              break e;
            case 2:
              mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (l = ds + 300 - xt(), 10 < l)) {
            if (Dn(
              a,
              t,
              Et,
              !An
            ), Cr(a, 0, !0) !== 0) break e;
            fn = t, a.timeoutHandle = L0(
              i0.bind(
                null,
                a,
                n,
                mt,
                ms,
                Xo,
                t,
                Et,
                fa,
                Ja,
                An,
                i,
                "Throttled",
                -0,
                0
              ),
              l
            );
            break e;
          }
          i0(
            a,
            n,
            mt,
            ms,
            Xo,
            t,
            Et,
            fa,
            Ja,
            An,
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
  function i0(e, t, n, a, l, i, d, h, S, T, U, q, k, O) {
    if (e.timeoutHandle = -1, q = t.subtreeFlags, q & 8192 || (q & 16785408) === 16785408) {
      q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wt
      }, Pf(
        t,
        i,
        q
      );
      var F = (i & 62914560) === i ? ds - xt() : (i & 4194048) === i ? a0 - xt() : 0;
      if (F = Fh(
        q,
        F
      ), F !== null) {
        fn = i, e.cancelPendingCommit = F(
          g0.bind(
            null,
            e,
            t,
            i,
            n,
            a,
            l,
            d,
            h,
            S,
            U,
            q,
            null,
            k,
            O
          )
        ), Dn(e, i, d, !T);
        return;
      }
    }
    g0(
      e,
      t,
      i,
      n,
      a,
      l,
      d,
      h,
      S
    );
  }
  function mh(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var l = n[a], i = l.getSnapshot;
          l = l.value;
          try {
            if (!vt(i(), l)) return !1;
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
  function Dn(e, t, n, a) {
    t &= ~Vo, t &= ~fa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var l = t; 0 < l; ) {
      var i = 31 - yt(l), d = 1 << i;
      a[i] = -1, l &= ~d;
    }
    n !== 0 && pu(e, n, t);
  }
  function hs() {
    return (_e & 6) === 0 ? (Jl(0), !1) : !0;
  }
  function Jo() {
    if (pe !== null) {
      if (ze === 0)
        var e = pe.return;
      else
        e = pe, en = aa = null, uo(e), Ga = null, Al = 0, e = pe;
      for (; e !== null; )
        Bf(e.alternate, e), e = e.return;
      pe = null;
    }
  }
  function Fa(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, Oh(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), fn = 0, Jo(), De = e, pe = n = It(e.current, null), ye = t, ze = 0, Nt = null, An = !1, Ka = hl(e, t), $o = !1, Ja = Et = Vo = fa = Mn = $e = 0, mt = Zl = null, Xo = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - yt(a), i = 1 << l;
        t |= e[l], a &= ~i;
      }
    return dn = t, Dr(), n;
  }
  function o0(e, t) {
    de = null, w.H = Hl, t === qa || t === $r ? (t = Cd(), ze = 3) : t === Ii ? (t = Cd(), ze = 4) : ze = t === _o ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Nt = t, pe === null && ($e = 1, as(
      e,
      Mt(t, e.current)
    ));
  }
  function c0() {
    var e = jt.current;
    return e === null ? !0 : (ye & 4194048) === ye ? Ut === null : (ye & 62914560) === ye || (ye & 536870912) !== 0 ? e === Ut : !1;
  }
  function u0() {
    var e = w.H;
    return w.H = Hl, e === null ? Hl : e;
  }
  function d0() {
    var e = w.A;
    return w.A = dh, e;
  }
  function gs() {
    $e = 4, An || (ye & 4194048) !== ye && jt.current !== null || (Ka = !0), (Mn & 134217727) === 0 && (fa & 134217727) === 0 || De === null || Dn(
      De,
      ye,
      Et,
      !1
    );
  }
  function Wo(e, t, n) {
    var a = _e;
    _e |= 2;
    var l = u0(), i = d0();
    (De !== e || ye !== t) && (ms = null, Fa(e, t)), t = !1;
    var d = $e;
    e: do
      try {
        if (ze !== 0 && pe !== null) {
          var h = pe, S = Nt;
          switch (ze) {
            case 8:
              Jo(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var T = ze;
              if (ze = 0, Nt = null, Ia(e, h, S, T), n && Ka) {
                d = 0;
                break e;
              }
              break;
            default:
              T = ze, ze = 0, Nt = null, Ia(e, h, S, T);
          }
        }
        hh(), d = $e;
        break;
      } catch (U) {
        o0(e, U);
      }
    while (!0);
    return t && e.shellSuspendCounter++, en = aa = null, _e = a, w.H = l, w.A = i, pe === null && (De = null, ye = 0, Dr()), d;
  }
  function hh() {
    for (; pe !== null; ) f0(pe);
  }
  function gh(e, t) {
    var n = _e;
    _e |= 2;
    var a = u0(), l = d0();
    De !== e || ye !== t ? (ms = null, fs = xt() + 500, Fa(e, t)) : Ka = hl(
      e,
      t
    );
    e: do
      try {
        if (ze !== 0 && pe !== null) {
          t = pe;
          var i = Nt;
          t: switch (ze) {
            case 1:
              ze = 0, Nt = null, Ia(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (Sd(i)) {
                ze = 0, Nt = null, m0(t);
                break;
              }
              t = function() {
                ze !== 2 && ze !== 9 || De !== e || (ze = 7), Xt(e);
              }, i.then(t, t);
              break e;
            case 3:
              ze = 7;
              break e;
            case 4:
              ze = 5;
              break e;
            case 7:
              Sd(i) ? (ze = 0, Nt = null, m0(t)) : (ze = 0, Nt = null, Ia(e, t, i, 7));
              break;
            case 5:
              var d = null;
              switch (pe.tag) {
                case 26:
                  d = pe.memoizedState;
                case 5:
                case 27:
                  var h = pe;
                  if (d ? I0(d) : h.stateNode.complete) {
                    ze = 0, Nt = null;
                    var S = h.sibling;
                    if (S !== null) pe = S;
                    else {
                      var T = h.return;
                      T !== null ? (pe = T, ps(T)) : pe = null;
                    }
                    break t;
                  }
              }
              ze = 0, Nt = null, Ia(e, t, i, 5);
              break;
            case 6:
              ze = 0, Nt = null, Ia(e, t, i, 6);
              break;
            case 8:
              Jo(), $e = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        ph();
        break;
      } catch (U) {
        o0(e, U);
      }
    while (!0);
    return en = aa = null, w.H = a, w.A = l, _e = n, pe !== null ? 0 : (De = null, ye = 0, Dr(), $e);
  }
  function ph() {
    for (; pe !== null && !Hm(); )
      f0(pe);
  }
  function f0(e) {
    var t = Uf(e.alternate, e, dn);
    e.memoizedProps = e.pendingProps, t === null ? ps(e) : pe = t;
  }
  function m0(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = kf(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ye
        );
        break;
      case 11:
        t = kf(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ye
        );
        break;
      case 5:
        uo(t);
      default:
        Bf(n, t), t = pe = ud(t, dn), t = Uf(n, t, dn);
    }
    e.memoizedProps = e.pendingProps, t === null ? ps(e) : pe = t;
  }
  function Ia(e, t, n, a) {
    en = aa = null, uo(t), Ga = null, Al = 0;
    var l = t.return;
    try {
      if (lh(
        e,
        l,
        t,
        n,
        ye
      )) {
        $e = 1, as(
          e,
          Mt(n, e.current)
        ), pe = null;
        return;
      }
    } catch (i) {
      if (l !== null) throw pe = l, i;
      $e = 1, as(
        e,
        Mt(n, e.current)
      ), pe = null;
      return;
    }
    t.flags & 32768 ? (Se || a === 1 ? e = !0 : Ka || (ye & 536870912) !== 0 ? e = !1 : (An = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = jt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), h0(t, e)) : ps(t);
  }
  function ps(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        h0(
          t,
          An
        );
        return;
      }
      e = t.return;
      var n = ih(
        t.alternate,
        t,
        dn
      );
      if (n !== null) {
        pe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        pe = t;
        return;
      }
      pe = t = e;
    } while (t !== null);
    $e === 0 && ($e = 5);
  }
  function h0(e, t) {
    do {
      var n = oh(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, pe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        pe = e;
        return;
      }
      pe = e = n;
    } while (e !== null);
    $e = 6, pe = null;
  }
  function g0(e, t, n, a, l, i, d, h, S) {
    e.cancelPendingCommit = null;
    do
      xs();
    while (We !== 0);
    if ((_e & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (i = t.lanes | t.childLanes, i |= Li, Jm(
        e,
        n,
        i,
        d,
        h,
        S
      ), e === De && (pe = De = null, ye = 0), Wa = t, Rn = e, fn = n, Qo = i, Zo = l, l0 = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vh(yr, function() {
        return v0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = w.T, w.T = null, l = Q.p, Q.p = 2, d = _e, _e |= 4;
        try {
          ch(e, t, n);
        } finally {
          _e = d, Q.p = l, w.T = a;
        }
      }
      We = 1, p0(), x0(), b0();
    }
  }
  function p0() {
    if (We === 1) {
      We = 0;
      var e = Rn, t = Wa, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = w.T, w.T = null;
        var a = Q.p;
        Q.p = 2;
        var l = _e;
        _e |= 4;
        try {
          Wf(t, e);
          var i = oc, d = td(e.containerInfo), h = i.focusedElem, S = i.selectionRange;
          if (d !== h && h && h.ownerDocument && ed(
            h.ownerDocument.documentElement,
            h
          )) {
            if (S !== null && Mi(h)) {
              var T = S.start, U = S.end;
              if (U === void 0 && (U = T), "selectionStart" in h)
                h.selectionStart = T, h.selectionEnd = Math.min(
                  U,
                  h.value.length
                );
              else {
                var q = h.ownerDocument || document, k = q && q.defaultView || window;
                if (k.getSelection) {
                  var O = k.getSelection(), F = h.textContent.length, le = Math.min(S.start, F), Oe = S.end === void 0 ? le : Math.min(S.end, F);
                  !O.extend && le > Oe && (d = Oe, Oe = le, le = d);
                  var N = Pu(
                    h,
                    le
                  ), j = Pu(
                    h,
                    Oe
                  );
                  if (N && j && (O.rangeCount !== 1 || O.anchorNode !== N.node || O.anchorOffset !== N.offset || O.focusNode !== j.node || O.focusOffset !== j.offset)) {
                    var E = q.createRange();
                    E.setStart(N.node, N.offset), O.removeAllRanges(), le > Oe ? (O.addRange(E), O.extend(j.node, j.offset)) : (E.setEnd(j.node, j.offset), O.addRange(E));
                  }
                }
              }
            }
            for (q = [], O = h; O = O.parentNode; )
              O.nodeType === 1 && q.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < q.length; h++) {
              var L = q[h];
              L.element.scrollLeft = L.left, L.element.scrollTop = L.top;
            }
          }
          zs = !!ic, oc = ic = null;
        } finally {
          _e = l, Q.p = a, w.T = n;
        }
      }
      e.current = t, We = 2;
    }
  }
  function x0() {
    if (We === 2) {
      We = 0;
      var e = Rn, t = Wa, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = w.T, w.T = null;
        var a = Q.p;
        Q.p = 2;
        var l = _e;
        _e |= 4;
        try {
          Xf(e, t.alternate, t);
        } finally {
          _e = l, Q.p = a, w.T = n;
        }
      }
      We = 3;
    }
  }
  function b0() {
    if (We === 4 || We === 3) {
      We = 0, qm();
      var e = Rn, t = Wa, n = fn, a = l0;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? We = 5 : (We = 0, Wa = Rn = null, y0(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (l === 0 && (On = null), mi(n), t = t.stateNode, bt && typeof bt.onCommitFiberRoot == "function")
        try {
          bt.onCommitFiberRoot(
            ml,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = w.T, l = Q.p, Q.p = 2, w.T = null;
        try {
          for (var i = e.onRecoverableError, d = 0; d < a.length; d++) {
            var h = a[d];
            i(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          w.T = t, Q.p = l;
        }
      }
      (fn & 3) !== 0 && xs(), Xt(e), l = e.pendingLanes, (n & 261930) !== 0 && (l & 42) !== 0 ? e === Ko ? Kl++ : (Kl = 0, Ko = e) : Kl = 0, Jl(0);
    }
  }
  function y0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, zl(t)));
  }
  function xs() {
    return p0(), x0(), b0(), v0();
  }
  function v0() {
    if (We !== 5) return !1;
    var e = Rn, t = Qo;
    Qo = 0;
    var n = mi(fn), a = w.T, l = Q.p;
    try {
      Q.p = 32 > n ? 32 : n, w.T = null, n = Zo, Zo = null;
      var i = Rn, d = fn;
      if (We = 0, Wa = Rn = null, fn = 0, (_e & 6) !== 0) throw Error(u(331));
      var h = _e;
      if (_e |= 4, t0(i.current), If(
        i,
        i.current,
        d,
        n
      ), _e = h, Jl(0, !1), bt && typeof bt.onPostCommitFiberRoot == "function")
        try {
          bt.onPostCommitFiberRoot(ml, i);
        } catch {
        }
      return !0;
    } finally {
      Q.p = l, w.T = a, y0(e, t);
    }
  }
  function S0(e, t, n) {
    t = Mt(n, t), t = To(e.stateNode, t, 2), e = _n(e, t, 2), e !== null && (gl(e, 2), Xt(e));
  }
  function ke(e, t, n) {
    if (e.tag === 3)
      S0(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          S0(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (On === null || !On.has(a))) {
            e = Mt(n, e), n = jf(2), a = _n(t, n, 2), a !== null && (Cf(
              n,
              a,
              t,
              e
            ), gl(a, 2), Xt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Fo(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new fh();
      var l = /* @__PURE__ */ new Set();
      a.set(t, l);
    } else
      l = a.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), a.set(t, l));
    l.has(n) || ($o = !0, l.add(n), e = xh.bind(null, e, t, n), t.then(e, e));
  }
  function xh(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, De === e && (ye & n) === n && ($e === 4 || $e === 3 && (ye & 62914560) === ye && 300 > xt() - ds ? (_e & 2) === 0 && Fa(e, 0) : Vo |= n, Ja === ye && (Ja = 0)), Xt(e);
  }
  function j0(e, t) {
    t === 0 && (t = gu()), e = ea(e, t), e !== null && (gl(e, t), Xt(e));
  }
  function bh(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), j0(e, n);
  }
  function yh(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    a !== null && a.delete(t), j0(e, n);
  }
  function vh(e, t) {
    return ci(e, t);
  }
  var bs = null, Pa = null, Io = !1, ys = !1, Po = !1, Un = 0;
  function Xt(e) {
    e !== Pa && e.next === null && (Pa === null ? bs = Pa = e : Pa = Pa.next = e), ys = !0, Io || (Io = !0, jh());
  }
  function Jl(e, t) {
    if (!Po && ys) {
      Po = !0;
      do
        for (var n = !1, a = bs; a !== null; ) {
          if (e !== 0) {
            var l = a.pendingLanes;
            if (l === 0) var i = 0;
            else {
              var d = a.suspendedLanes, h = a.pingedLanes;
              i = (1 << 31 - yt(42 | e) + 1) - 1, i &= l & ~(d & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (n = !0, T0(a, i));
          } else
            i = ye, i = Cr(
              a,
              a === De ? i : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (i & 3) === 0 || hl(a, i) || (n = !0, T0(a, i));
          a = a.next;
        }
      while (n);
      Po = !1;
    }
  }
  function Sh() {
    C0();
  }
  function C0() {
    ys = Io = !1;
    var e = 0;
    Un !== 0 && Mh() && (e = Un);
    for (var t = xt(), n = null, a = bs; a !== null; ) {
      var l = a.next, i = N0(a, t);
      i === 0 ? (a.next = null, n === null ? bs = l : n.next = l, l === null && (Pa = n)) : (n = a, (e !== 0 || (i & 3) !== 0) && (ys = !0)), a = l;
    }
    We !== 0 && We !== 5 || Jl(e), Un !== 0 && (Un = 0);
  }
  function N0(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var d = 31 - yt(i), h = 1 << d, S = l[d];
      S === -1 ? ((h & n) === 0 || (h & a) !== 0) && (l[d] = Km(h, t)) : S <= t && (e.expiredLanes |= h), i &= ~h;
    }
    if (t = De, n = ye, n = Cr(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, n === 0 || e === t && (ze === 2 || ze === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && ui(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || hl(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && ui(a), mi(n)) {
        case 2:
        case 8:
          n = mu;
          break;
        case 32:
          n = yr;
          break;
        case 268435456:
          n = hu;
          break;
        default:
          n = yr;
      }
      return a = E0.bind(null, e), n = ci(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && ui(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function E0(e, t) {
    if (We !== 0 && We !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (xs() && e.callbackNode !== n)
      return null;
    var a = ye;
    return a = Cr(
      e,
      e === De ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (s0(e, a, t), N0(e, xt()), e.callbackNode != null && e.callbackNode === n ? E0.bind(null, e) : null);
  }
  function T0(e, t) {
    if (xs()) return null;
    s0(e, t, !0);
  }
  function jh() {
    Rh(function() {
      (_e & 6) !== 0 ? ci(
        fu,
        Sh
      ) : C0();
    });
  }
  function ec() {
    if (Un === 0) {
      var e = Ba;
      e === 0 && (e = vr, vr <<= 1, (vr & 261888) === 0 && (vr = 256)), Un = e;
    }
    return Un;
  }
  function _0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : _r("" + e);
  }
  function w0(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Ch(e, t, n, a, l) {
    if (t === "submit" && n && n.stateNode === l) {
      var i = _0(
        (l[ot] || null).action
      ), d = a.submitter;
      d && (t = (t = d[ot] || null) ? _0(t.formAction) : d.getAttribute("formAction"), t !== null && (i = t, d = null));
      var h = new Ar(
        "action",
        "action",
        null,
        a,
        l
      );
      e.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Un !== 0) {
                  var S = d ? w0(l, d) : new FormData(l);
                  vo(
                    n,
                    {
                      pending: !0,
                      data: S,
                      method: l.method,
                      action: i
                    },
                    null,
                    S
                  );
                }
              } else
                typeof i == "function" && (h.preventDefault(), S = d ? w0(l, d) : new FormData(l), vo(
                  n,
                  {
                    pending: !0,
                    data: S,
                    method: l.method,
                    action: i
                  },
                  i,
                  S
                ));
            },
            currentTarget: l
          }
        ]
      });
    }
  }
  for (var tc = 0; tc < Ui.length; tc++) {
    var nc = Ui[tc], Nh = nc.toLowerCase(), Eh = nc[0].toUpperCase() + nc.slice(1);
    Ht(
      Nh,
      "on" + Eh
    );
  }
  Ht(ld, "onAnimationEnd"), Ht(rd, "onAnimationIteration"), Ht(sd, "onAnimationStart"), Ht("dblclick", "onDoubleClick"), Ht("focusin", "onFocus"), Ht("focusout", "onBlur"), Ht(G2, "onTransitionRun"), Ht(Y2, "onTransitionStart"), Ht($2, "onTransitionCancel"), Ht(id, "onTransitionEnd"), Na("onMouseEnter", ["mouseout", "mouseover"]), Na("onMouseLeave", ["mouseout", "mouseover"]), Na("onPointerEnter", ["pointerout", "pointerover"]), Na("onPointerLeave", ["pointerout", "pointerover"]), Wn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Wn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Wn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Wn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Wn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Wn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Wl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Th = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wl)
  );
  function z0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], l = a.event;
      a = a.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var h = a[d], S = h.instance, T = h.currentTarget;
            if (h = h.listener, S !== i && l.isPropagationStopped())
              break e;
            i = h, l.currentTarget = T;
            try {
              i(l);
            } catch (U) {
              Rr(U);
            }
            l.currentTarget = null, i = S;
          }
        else
          for (d = 0; d < a.length; d++) {
            if (h = a[d], S = h.instance, T = h.currentTarget, h = h.listener, S !== i && l.isPropagationStopped())
              break e;
            i = h, l.currentTarget = T;
            try {
              i(l);
            } catch (U) {
              Rr(U);
            }
            l.currentTarget = null, i = S;
          }
      }
    }
  }
  function xe(e, t) {
    var n = t[hi];
    n === void 0 && (n = t[hi] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (k0(t, e, 2, !1), n.add(a));
  }
  function ac(e, t, n) {
    var a = 0;
    t && (a |= 4), k0(
      n,
      e,
      a,
      t
    );
  }
  var vs = "_reactListening" + Math.random().toString(36).slice(2);
  function lc(e) {
    if (!e[vs]) {
      e[vs] = !0, ju.forEach(function(n) {
        n !== "selectionchange" && (Th.has(n) || ac(n, !1, e), ac(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[vs] || (t[vs] = !0, ac("selectionchange", !1, t));
    }
  }
  function k0(e, t, n, a) {
    switch (r1(t)) {
      case 2:
        var l = e4;
        break;
      case 8:
        l = t4;
        break;
      default:
        l = yc;
    }
    n = l.bind(
      null,
      t,
      n,
      e
    ), l = void 0, !Ci || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), a ? l !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
      passive: l
    }) : e.addEventListener(t, n, !1);
  }
  function rc(e, t, n, a, l) {
    var i = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var d = a.tag;
        if (d === 3 || d === 4) {
          var h = a.stateNode.containerInfo;
          if (h === l) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var S = d.tag;
              if ((S === 3 || S === 4) && d.stateNode.containerInfo === l)
                return;
              d = d.return;
            }
          for (; h !== null; ) {
            if (d = Sa(h), d === null) return;
            if (S = d.tag, S === 5 || S === 6 || S === 26 || S === 27) {
              a = i = d;
              continue e;
            }
            h = h.parentNode;
          }
        }
        a = a.return;
      }
    Ru(function() {
      var T = i, U = Si(n), q = [];
      e: {
        var k = od.get(e);
        if (k !== void 0) {
          var O = Ar, F = e;
          switch (e) {
            case "keypress":
              if (zr(n) === 0) break e;
            case "keydown":
            case "keyup":
              O = y2;
              break;
            case "focusin":
              F = "focus", O = _i;
              break;
            case "focusout":
              F = "blur", O = _i;
              break;
            case "beforeblur":
            case "afterblur":
              O = _i;
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
              O = Lu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = i2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = j2;
              break;
            case ld:
            case rd:
            case sd:
              O = u2;
              break;
            case id:
              O = N2;
              break;
            case "scroll":
            case "scrollend":
              O = r2;
              break;
            case "wheel":
              O = T2;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = f2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = Hu;
              break;
            case "toggle":
            case "beforetoggle":
              O = w2;
          }
          var le = (t & 4) !== 0, Oe = !le && (e === "scroll" || e === "scrollend"), N = le ? k !== null ? k + "Capture" : null : k;
          le = [];
          for (var j = T, E; j !== null; ) {
            var L = j;
            if (E = L.stateNode, L = L.tag, L !== 5 && L !== 26 && L !== 27 || E === null || N === null || (L = bl(j, N), L != null && le.push(
              Fl(j, L, E)
            )), Oe) break;
            j = j.return;
          }
          0 < le.length && (k = new O(
            k,
            F,
            null,
            n,
            U
          ), q.push({ event: k, listeners: le }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (k = e === "mouseover" || e === "pointerover", O = e === "mouseout" || e === "pointerout", k && n !== vi && (F = n.relatedTarget || n.fromElement) && (Sa(F) || F[va]))
            break e;
          if ((O || k) && (k = U.window === U ? U : (k = U.ownerDocument) ? k.defaultView || k.parentWindow : window, O ? (F = n.relatedTarget || n.toElement, O = T, F = F ? Sa(F) : null, F !== null && (Oe = m(F), le = F.tag, F !== Oe || le !== 5 && le !== 27 && le !== 6) && (F = null)) : (O = null, F = T), O !== F)) {
            if (le = Lu, L = "onMouseLeave", N = "onMouseEnter", j = "mouse", (e === "pointerout" || e === "pointerover") && (le = Hu, L = "onPointerLeave", N = "onPointerEnter", j = "pointer"), Oe = O == null ? k : xl(O), E = F == null ? k : xl(F), k = new le(
              L,
              j + "leave",
              O,
              n,
              U
            ), k.target = Oe, k.relatedTarget = E, L = null, Sa(U) === T && (le = new le(
              N,
              j + "enter",
              F,
              n,
              U
            ), le.target = E, le.relatedTarget = Oe, L = le), Oe = L, O && F)
              t: {
                for (le = _h, N = O, j = F, E = 0, L = N; L; L = le(L))
                  E++;
                L = 0;
                for (var ne = j; ne; ne = le(ne))
                  L++;
                for (; 0 < E - L; )
                  N = le(N), E--;
                for (; 0 < L - E; )
                  j = le(j), L--;
                for (; E--; ) {
                  if (N === j || j !== null && N === j.alternate) {
                    le = N;
                    break t;
                  }
                  N = le(N), j = le(j);
                }
                le = null;
              }
            else le = null;
            O !== null && A0(
              q,
              k,
              O,
              le,
              !1
            ), F !== null && Oe !== null && A0(
              q,
              Oe,
              F,
              le,
              !0
            );
          }
        }
        e: {
          if (k = T ? xl(T) : window, O = k.nodeName && k.nodeName.toLowerCase(), O === "select" || O === "input" && k.type === "file")
            var Ne = Zu;
          else if (Xu(k))
            if (Ku)
              Ne = B2;
            else {
              Ne = U2;
              var I = D2;
            }
          else
            O = k.nodeName, !O || O.toLowerCase() !== "input" || k.type !== "checkbox" && k.type !== "radio" ? T && yi(T.elementType) && (Ne = Zu) : Ne = L2;
          if (Ne && (Ne = Ne(e, T))) {
            Qu(
              q,
              Ne,
              n,
              U
            );
            break e;
          }
          I && I(e, k, T), e === "focusout" && T && k.type === "number" && T.memoizedProps.value != null && bi(k, "number", k.value);
        }
        switch (I = T ? xl(T) : window, e) {
          case "focusin":
            (Xu(I) || I.contentEditable === "true") && (ka = I, Oi = T, Tl = null);
            break;
          case "focusout":
            Tl = Oi = ka = null;
            break;
          case "mousedown":
            Ri = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ri = !1, nd(q, n, U);
            break;
          case "selectionchange":
            if (q2) break;
          case "keydown":
          case "keyup":
            nd(q, n, U);
        }
        var fe;
        if (zi)
          e: {
            switch (e) {
              case "compositionstart":
                var ve = "onCompositionStart";
                break e;
              case "compositionend":
                ve = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ve = "onCompositionUpdate";
                break e;
            }
            ve = void 0;
          }
        else
          za ? $u(e, n) && (ve = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ve = "onCompositionStart");
        ve && (qu && n.locale !== "ko" && (za || ve !== "onCompositionStart" ? ve === "onCompositionEnd" && za && (fe = Du()) : (vn = U, Ni = "value" in vn ? vn.value : vn.textContent, za = !0)), I = Ss(T, ve), 0 < I.length && (ve = new Bu(
          ve,
          e,
          null,
          n,
          U
        ), q.push({ event: ve, listeners: I }), fe ? ve.data = fe : (fe = Vu(n), fe !== null && (ve.data = fe)))), (fe = k2 ? A2(e, n) : M2(e, n)) && (ve = Ss(T, "onBeforeInput"), 0 < ve.length && (I = new Bu(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          U
        ), q.push({
          event: I,
          listeners: ve
        }), I.data = fe)), Ch(
          q,
          e,
          T,
          n,
          U
        );
      }
      z0(q, t);
    });
  }
  function Fl(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Ss(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var l = e, i = l.stateNode;
      if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || i === null || (l = bl(e, n), l != null && a.unshift(
        Fl(e, l, i)
      ), l = bl(e, t), l != null && a.push(
        Fl(e, l, i)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function _h(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function A0(e, t, n, a, l) {
    for (var i = t._reactName, d = []; n !== null && n !== a; ) {
      var h = n, S = h.alternate, T = h.stateNode;
      if (h = h.tag, S !== null && S === a) break;
      h !== 5 && h !== 26 && h !== 27 || T === null || (S = T, l ? (T = bl(n, i), T != null && d.unshift(
        Fl(n, T, S)
      )) : l || (T = bl(n, i), T != null && d.push(
        Fl(n, T, S)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var wh = /\r\n?/g, zh = /\u0000|\uFFFD/g;
  function M0(e) {
    return (typeof e == "string" ? e : "" + e).replace(wh, `
`).replace(zh, "");
  }
  function O0(e, t) {
    return t = M0(t), M0(e) === t;
  }
  function Me(e, t, n, a, l, i) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ta(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ta(e, "" + a);
        break;
      case "className":
        Er(e, "class", a);
        break;
      case "tabIndex":
        Er(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Er(e, n, a);
        break;
      case "style":
        Mu(e, a, i);
        break;
      case "data":
        if (t !== "object") {
          Er(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = _r("" + a), e.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (n === "formAction" ? (t !== "input" && Me(e, t, "name", l.name, l, null), Me(
            e,
            t,
            "formEncType",
            l.formEncType,
            l,
            null
          ), Me(
            e,
            t,
            "formMethod",
            l.formMethod,
            l,
            null
          ), Me(
            e,
            t,
            "formTarget",
            l.formTarget,
            l,
            null
          )) : (Me(e, t, "encType", l.encType, l, null), Me(e, t, "method", l.method, l, null), Me(e, t, "target", l.target, l, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = _r("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = Wt);
        break;
      case "onScroll":
        a != null && xe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && xe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(u(61));
          if (n = a.__html, n != null) {
            if (l.children != null) throw Error(u(60));
            e.innerHTML = n;
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
        n = _r("" + a), e.setAttributeNS(
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
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "" + a) : e.removeAttribute(n);
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
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(n, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(n) : e.setAttribute(n, a);
        break;
      case "popover":
        xe("beforetoggle", e), xe("toggle", e), Nr(e, "popover", a);
        break;
      case "xlinkActuate":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Nr(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = a2.get(n) || n, Nr(e, n, a));
    }
  }
  function sc(e, t, n, a, l, i) {
    switch (n) {
      case "style":
        Mu(e, a, i);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(u(61));
          if (n = a.__html, n != null) {
            if (l.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ta(e, a) : (typeof a == "number" || typeof a == "bigint") && Ta(e, "" + a);
        break;
      case "onScroll":
        a != null && xe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && xe("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Wt);
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
        if (!Cu.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (l = n.endsWith("Capture"), t = n.slice(2, l ? n.length - 7 : void 0), i = e[ot] || null, i = i != null ? i[n] : null, typeof i == "function" && e.removeEventListener(t, i, l), typeof a == "function")) {
              typeof i != "function" && i !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, l);
              break e;
            }
            n in e ? e[n] = a : a === !0 ? e.setAttribute(n, "") : Nr(e, n, a);
          }
    }
  }
  function at(e, t, n) {
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
        xe("error", e), xe("load", e);
        var a = !1, l = !1, i;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var d = n[i];
            if (d != null)
              switch (i) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  l = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Me(e, t, i, d, n, null);
              }
          }
        l && Me(e, t, "srcSet", n.srcSet, n, null), a && Me(e, t, "src", n.src, n, null);
        return;
      case "input":
        xe("invalid", e);
        var h = i = d = l = null, S = null, T = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var U = n[a];
            if (U != null)
              switch (a) {
                case "name":
                  l = U;
                  break;
                case "type":
                  d = U;
                  break;
                case "checked":
                  S = U;
                  break;
                case "defaultChecked":
                  T = U;
                  break;
                case "value":
                  i = U;
                  break;
                case "defaultValue":
                  h = U;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (U != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Me(e, t, a, U, n, null);
              }
          }
        wu(
          e,
          i,
          h,
          S,
          T,
          d,
          l,
          !1
        );
        return;
      case "select":
        xe("invalid", e), a = d = i = null;
        for (l in n)
          if (n.hasOwnProperty(l) && (h = n[l], h != null))
            switch (l) {
              case "value":
                i = h;
                break;
              case "defaultValue":
                d = h;
                break;
              case "multiple":
                a = h;
              default:
                Me(e, t, l, h, n, null);
            }
        t = i, n = d, e.multiple = !!a, t != null ? Ea(e, !!a, t, !1) : n != null && Ea(e, !!a, n, !0);
        return;
      case "textarea":
        xe("invalid", e), i = l = a = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (h = n[d], h != null))
            switch (d) {
              case "value":
                a = h;
                break;
              case "defaultValue":
                l = h;
                break;
              case "children":
                i = h;
                break;
              case "dangerouslySetInnerHTML":
                if (h != null) throw Error(u(91));
                break;
              default:
                Me(e, t, d, h, n, null);
            }
        ku(e, a, l, i);
        return;
      case "option":
        for (S in n)
          if (n.hasOwnProperty(S) && (a = n[S], a != null))
            switch (S) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Me(e, t, S, a, n, null);
            }
        return;
      case "dialog":
        xe("beforetoggle", e), xe("toggle", e), xe("cancel", e), xe("close", e);
        break;
      case "iframe":
      case "object":
        xe("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Wl.length; a++)
          xe(Wl[a], e);
        break;
      case "image":
        xe("error", e), xe("load", e);
        break;
      case "details":
        xe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        xe("error", e), xe("load", e);
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
          if (n.hasOwnProperty(T) && (a = n[T], a != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Me(e, t, T, a, n, null);
            }
        return;
      default:
        if (yi(t)) {
          for (U in n)
            n.hasOwnProperty(U) && (a = n[U], a !== void 0 && sc(
              e,
              t,
              U,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (h in n)
      n.hasOwnProperty(h) && (a = n[h], a != null && Me(e, t, h, a, n, null));
  }
  function kh(e, t, n, a) {
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
        var l = null, i = null, d = null, h = null, S = null, T = null, U = null;
        for (O in n) {
          var q = n[O];
          if (n.hasOwnProperty(O) && q != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = q;
              default:
                a.hasOwnProperty(O) || Me(e, t, O, null, a, q);
            }
        }
        for (var k in a) {
          var O = a[k];
          if (q = n[k], a.hasOwnProperty(k) && (O != null || q != null))
            switch (k) {
              case "type":
                i = O;
                break;
              case "name":
                l = O;
                break;
              case "checked":
                T = O;
                break;
              case "defaultChecked":
                U = O;
                break;
              case "value":
                d = O;
                break;
              case "defaultValue":
                h = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(u(137, t));
                break;
              default:
                O !== q && Me(
                  e,
                  t,
                  k,
                  O,
                  a,
                  q
                );
            }
        }
        xi(
          e,
          d,
          h,
          S,
          T,
          U,
          i,
          l
        );
        return;
      case "select":
        O = d = h = k = null;
        for (i in n)
          if (S = n[i], n.hasOwnProperty(i) && S != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                O = S;
              default:
                a.hasOwnProperty(i) || Me(
                  e,
                  t,
                  i,
                  null,
                  a,
                  S
                );
            }
        for (l in a)
          if (i = a[l], S = n[l], a.hasOwnProperty(l) && (i != null || S != null))
            switch (l) {
              case "value":
                k = i;
                break;
              case "defaultValue":
                h = i;
                break;
              case "multiple":
                d = i;
              default:
                i !== S && Me(
                  e,
                  t,
                  l,
                  i,
                  a,
                  S
                );
            }
        t = h, n = d, a = O, k != null ? Ea(e, !!n, k, !1) : !!a != !!n && (t != null ? Ea(e, !!n, t, !0) : Ea(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        O = k = null;
        for (h in n)
          if (l = n[h], n.hasOwnProperty(h) && l != null && !a.hasOwnProperty(h))
            switch (h) {
              case "value":
                break;
              case "children":
                break;
              default:
                Me(e, t, h, null, a, l);
            }
        for (d in a)
          if (l = a[d], i = n[d], a.hasOwnProperty(d) && (l != null || i != null))
            switch (d) {
              case "value":
                k = l;
                break;
              case "defaultValue":
                O = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(u(91));
                break;
              default:
                l !== i && Me(e, t, d, l, a, i);
            }
        zu(e, k, O);
        return;
      case "option":
        for (var F in n)
          if (k = n[F], n.hasOwnProperty(F) && k != null && !a.hasOwnProperty(F))
            switch (F) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Me(
                  e,
                  t,
                  F,
                  null,
                  a,
                  k
                );
            }
        for (S in a)
          if (k = a[S], O = n[S], a.hasOwnProperty(S) && k !== O && (k != null || O != null))
            switch (S) {
              case "selected":
                e.selected = k && typeof k != "function" && typeof k != "symbol";
                break;
              default:
                Me(
                  e,
                  t,
                  S,
                  k,
                  a,
                  O
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
        for (var le in n)
          k = n[le], n.hasOwnProperty(le) && k != null && !a.hasOwnProperty(le) && Me(e, t, le, null, a, k);
        for (T in a)
          if (k = a[T], O = n[T], a.hasOwnProperty(T) && k !== O && (k != null || O != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null)
                  throw Error(u(137, t));
                break;
              default:
                Me(
                  e,
                  t,
                  T,
                  k,
                  a,
                  O
                );
            }
        return;
      default:
        if (yi(t)) {
          for (var Oe in n)
            k = n[Oe], n.hasOwnProperty(Oe) && k !== void 0 && !a.hasOwnProperty(Oe) && sc(
              e,
              t,
              Oe,
              void 0,
              a,
              k
            );
          for (U in a)
            k = a[U], O = n[U], !a.hasOwnProperty(U) || k === O || k === void 0 && O === void 0 || sc(
              e,
              t,
              U,
              k,
              a,
              O
            );
          return;
        }
    }
    for (var N in n)
      k = n[N], n.hasOwnProperty(N) && k != null && !a.hasOwnProperty(N) && Me(e, t, N, null, a, k);
    for (q in a)
      k = a[q], O = n[q], !a.hasOwnProperty(q) || k === O || k == null && O == null || Me(e, t, q, k, a, O);
  }
  function R0(e) {
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
  function Ah() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var l = n[a], i = l.transferSize, d = l.initiatorType, h = l.duration;
        if (i && h && R0(d)) {
          for (d = 0, h = l.responseEnd, a += 1; a < n.length; a++) {
            var S = n[a], T = S.startTime;
            if (T > h) break;
            var U = S.transferSize, q = S.initiatorType;
            U && R0(q) && (S = S.responseEnd, d += U * (S < h ? 1 : (h - T) / (S - T)));
          }
          if (--a, t += 8 * (i + d) / (l.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ic = null, oc = null;
  function js(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function D0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function U0(e, t) {
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
  function cc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var uc = null;
  function Mh() {
    var e = window.event;
    return e && e.type === "popstate" ? e === uc ? !1 : (uc = e, !0) : (uc = null, !1);
  }
  var L0 = typeof setTimeout == "function" ? setTimeout : void 0, Oh = typeof clearTimeout == "function" ? clearTimeout : void 0, B0 = typeof Promise == "function" ? Promise : void 0, Rh = typeof queueMicrotask == "function" ? queueMicrotask : typeof B0 < "u" ? function(e) {
    return B0.resolve(null).then(e).catch(Dh);
  } : L0;
  function Dh(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ln(e) {
    return e === "head";
  }
  function H0(e, t) {
    var n = t, a = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8)
        if (n = l.data, n === "/$" || n === "/&") {
          if (a === 0) {
            e.removeChild(l), al(t);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          Il(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Il(n);
          for (var i = n.firstChild; i; ) {
            var d = i.nextSibling, h = i.nodeName;
            i[pl] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || n.removeChild(i), i = d;
          }
        } else
          n === "body" && Il(e.ownerDocument.body);
      n = l;
    } while (n);
    al(t);
  }
  function q0(e, t) {
    var n = e;
    e = 0;
    do {
      var a = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), a && a.nodeType === 8)
        if (n = a.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = a;
    } while (n);
  }
  function dc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          dc(n), gi(n);
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
  function Uh(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var l = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[pl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (i !== l.rel || e.getAttribute("href") !== (l.href == null || l.href === "" ? null : l.href) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin) || e.getAttribute("title") !== (l.title == null ? null : l.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (i = e.getAttribute("src"), (i !== (l.src == null ? null : l.src) || e.getAttribute("type") !== (l.type == null ? null : l.type) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = l.name == null ? null : "" + l.name;
        if (l.type === "hidden" && e.getAttribute("name") === i)
          return e;
      } else return e;
      if (e = Lt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Lh(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Lt(e.nextSibling), e === null)) return null;
    return e;
  }
  function G0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Lt(e.nextSibling), e === null)) return null;
    return e;
  }
  function fc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function mc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Bh(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
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
  var hc = null;
  function Y0(e) {
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
  function $0(e) {
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
  function V0(e, t, n) {
    switch (t = js(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function Il(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    gi(e);
  }
  var Bt = /* @__PURE__ */ new Map(), X0 = /* @__PURE__ */ new Set();
  function Cs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var mn = Q.d;
  Q.d = {
    f: Hh,
    r: qh,
    D: Gh,
    C: Yh,
    L: $h,
    m: Vh,
    X: Qh,
    S: Xh,
    M: Zh
  };
  function Hh() {
    var e = mn.f(), t = hs();
    return e || t;
  }
  function qh(e) {
    var t = ja(e);
    t !== null && t.tag === 5 && t.type === "form" ? of(t) : mn.r(e);
  }
  var el = typeof document > "u" ? null : document;
  function Q0(e, t, n) {
    var a = el;
    if (a && typeof t == "string" && t) {
      var l = kt(t);
      l = 'link[rel="' + e + '"][href="' + l + '"]', typeof n == "string" && (l += '[crossorigin="' + n + '"]'), X0.has(l) || (X0.add(l), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(l) === null && (t = a.createElement("link"), at(t, "link", e), Fe(t), a.head.appendChild(t)));
    }
  }
  function Gh(e) {
    mn.D(e), Q0("dns-prefetch", e, null);
  }
  function Yh(e, t) {
    mn.C(e, t), Q0("preconnect", e, t);
  }
  function $h(e, t, n) {
    mn.L(e, t, n);
    var a = el;
    if (a && e && t) {
      var l = 'link[rel="preload"][as="' + kt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (l += '[imagesrcset="' + kt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (l += '[imagesizes="' + kt(
        n.imageSizes
      ) + '"]')) : l += '[href="' + kt(e) + '"]';
      var i = l;
      switch (t) {
        case "style":
          i = tl(e);
          break;
        case "script":
          i = nl(e);
      }
      Bt.has(i) || (e = b(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Bt.set(i, e), a.querySelector(l) !== null || t === "style" && a.querySelector(Pl(i)) || t === "script" && a.querySelector(er(i)) || (t = a.createElement("link"), at(t, "link", e), Fe(t), a.head.appendChild(t)));
    }
  }
  function Vh(e, t) {
    mn.m(e, t);
    var n = el;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", l = 'link[rel="modulepreload"][as="' + kt(a) + '"][href="' + kt(e) + '"]', i = l;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = nl(e);
      }
      if (!Bt.has(i) && (e = b({ rel: "modulepreload", href: e }, t), Bt.set(i, e), n.querySelector(l) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(er(i)))
              return;
        }
        a = n.createElement("link"), at(a, "link", e), Fe(a), n.head.appendChild(a);
      }
    }
  }
  function Xh(e, t, n) {
    mn.S(e, t, n);
    var a = el;
    if (a && e) {
      var l = Ca(a).hoistableStyles, i = tl(e);
      t = t || "default";
      var d = l.get(i);
      if (!d) {
        var h = { loading: 0, preload: null };
        if (d = a.querySelector(
          Pl(i)
        ))
          h.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Bt.get(i)) && gc(e, n);
          var S = d = a.createElement("link");
          Fe(S), at(S, "link", e), S._p = new Promise(function(T, U) {
            S.onload = T, S.onerror = U;
          }), S.addEventListener("load", function() {
            h.loading |= 1;
          }), S.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, Ns(d, t, a);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: h
        }, l.set(i, d);
      }
    }
  }
  function Qh(e, t) {
    mn.X(e, t);
    var n = el;
    if (n && e) {
      var a = Ca(n).hoistableScripts, l = nl(e), i = a.get(l);
      i || (i = n.querySelector(er(l)), i || (e = b({ src: e, async: !0 }, t), (t = Bt.get(l)) && pc(e, t), i = n.createElement("script"), Fe(i), at(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, a.set(l, i));
    }
  }
  function Zh(e, t) {
    mn.M(e, t);
    var n = el;
    if (n && e) {
      var a = Ca(n).hoistableScripts, l = nl(e), i = a.get(l);
      i || (i = n.querySelector(er(l)), i || (e = b({ src: e, async: !0, type: "module" }, t), (t = Bt.get(l)) && pc(e, t), i = n.createElement("script"), Fe(i), at(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, a.set(l, i));
    }
  }
  function Z0(e, t, n, a) {
    var l = (l = Z.current) ? Cs(l) : null;
    if (!l) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = tl(n.href), n = Ca(
          l
        ).hoistableStyles, a = n.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = tl(n.href);
          var i = Ca(
            l
          ).hoistableStyles, d = i.get(e);
          if (d || (l = l.ownerDocument || l, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(e, d), (i = l.querySelector(
            Pl(e)
          )) && !i._p && (d.instance = i, d.state.loading = 5), Bt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Bt.set(e, n), i || Kh(
            l,
            e,
            n,
            d.state
          ))), t && a === null)
            throw Error(u(528, ""));
          return d;
        }
        if (t && a !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = nl(n), n = Ca(
          l
        ).hoistableScripts, a = n.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function tl(e) {
    return 'href="' + kt(e) + '"';
  }
  function Pl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function K0(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Kh(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), at(t, "link", n), Fe(t), e.head.appendChild(t));
  }
  function nl(e) {
    return '[src="' + kt(e) + '"]';
  }
  function er(e) {
    return "script[async]" + e;
  }
  function J0(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + kt(n.href) + '"]'
          );
          if (a)
            return t.instance = a, Fe(a), a;
          var l = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Fe(a), at(a, "style", l), Ns(a, n.precedence, e), t.instance = a;
        case "stylesheet":
          l = tl(n.href);
          var i = e.querySelector(
            Pl(l)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, Fe(i), i;
          a = K0(n), (l = Bt.get(l)) && gc(a, l), i = (e.ownerDocument || e).createElement("link"), Fe(i);
          var d = i;
          return d._p = new Promise(function(h, S) {
            d.onload = h, d.onerror = S;
          }), at(i, "link", a), t.state.loading |= 4, Ns(i, n.precedence, e), t.instance = i;
        case "script":
          return i = nl(n.src), (l = e.querySelector(
            er(i)
          )) ? (t.instance = l, Fe(l), l) : (a = n, (l = Bt.get(i)) && (a = b({}, n), pc(a, l)), e = e.ownerDocument || e, l = e.createElement("script"), Fe(l), at(l, "link", a), e.head.appendChild(l), t.instance = l);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Ns(a, n.precedence, e));
    return t.instance;
  }
  function Ns(e, t, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), l = a.length ? a[a.length - 1] : null, i = l, d = 0; d < a.length; d++) {
      var h = a[d];
      if (h.dataset.precedence === t) i = h;
      else if (i !== l) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function gc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function pc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Es = null;
  function W0(e, t, n) {
    if (Es === null) {
      var a = /* @__PURE__ */ new Map(), l = Es = /* @__PURE__ */ new Map();
      l.set(n, a);
    } else
      l = Es, a = l.get(n), a || (a = /* @__PURE__ */ new Map(), l.set(n, a));
    if (a.has(e)) return a;
    for (a.set(e, null), n = n.getElementsByTagName(e), l = 0; l < n.length; l++) {
      var i = n[l];
      if (!(i[pl] || i[Pe] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = i.getAttribute(t) || "";
        d = e + d;
        var h = a.get(d);
        h ? h.push(i) : a.set(d, [i]);
      }
    }
    return a;
  }
  function F0(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Jh(e, t, n) {
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
  function I0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Wh(e, t, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var l = tl(a.href), i = t.querySelector(
          Pl(l)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ts.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = i, Fe(i);
          return;
        }
        i = t.ownerDocument || t, a = K0(a), (l = Bt.get(l)) && gc(a, l), i = i.createElement("link"), Fe(i);
        var d = i;
        d._p = new Promise(function(h, S) {
          d.onload = h, d.onerror = S;
        }), at(i, "link", a), n.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Ts.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var xc = 0;
  function Fh(e, t) {
    return e.stylesheets && e.count === 0 && ws(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (e.stylesheets && ws(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && xc === 0 && (xc = 62500 * Ah());
      var l = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ws(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        },
        (e.imgBytes > xc ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(l);
      };
    } : null;
  }
  function Ts() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ws(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var _s = null;
  function ws(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _s = /* @__PURE__ */ new Map(), t.forEach(Ih, e), _s = null, Ts.call(e));
  }
  function Ih(e, t) {
    if (!(t.state.loading & 4)) {
      var n = _s.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), _s.set(e, n);
        for (var l = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < l.length; i++) {
          var d = l[i];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), a = d);
        }
        a && n.set(null, a);
      }
      l = t.instance, d = l.getAttribute("data-precedence"), i = n.get(d) || a, i === a && n.set(null, l), n.set(d, l), this.count++, a = Ts.bind(this), l.addEventListener("load", a), l.addEventListener("error", a), i ? i.parentNode.insertBefore(l, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), t.state.loading |= 4;
    }
  }
  var tr = {
    $$typeof: J,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0
  };
  function Ph(e, t, n, a, l, i, d, h, S) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = di(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = di(0), this.hiddenUpdates = di(null), this.identifierPrefix = a, this.onUncaughtError = l, this.onCaughtError = i, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = S, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function P0(e, t, n, a, l, i, d, h, S, T, U, q) {
    return e = new Ph(
      e,
      t,
      n,
      d,
      S,
      T,
      U,
      q,
      h
    ), t = 1, i === !0 && (t |= 24), i = St(3, null, null, t), e.current = i, i.stateNode = e, t = Ji(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: t
    }, Pi(i), e;
  }
  function e1(e) {
    return e ? (e = Oa, e) : Oa;
  }
  function t1(e, t, n, a, l, i) {
    l = e1(l), a.context === null ? a.context = l : a.pendingContext = l, a = Tn(t), a.payload = { element: n }, i = i === void 0 ? null : i, i !== null && (a.callback = i), n = _n(e, a, t), n !== null && (ht(n, e, t), Ol(n, e, t));
  }
  function n1(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function bc(e, t) {
    n1(e, t), (e = e.alternate) && n1(e, t);
  }
  function a1(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ea(e, 67108864);
      t !== null && ht(t, e, 67108864), bc(e, 67108864);
    }
  }
  function l1(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Tt();
      t = fi(t);
      var n = ea(e, t);
      n !== null && ht(n, e, t), bc(e, t);
    }
  }
  var zs = !0;
  function e4(e, t, n, a) {
    var l = w.T;
    w.T = null;
    var i = Q.p;
    try {
      Q.p = 2, yc(e, t, n, a);
    } finally {
      Q.p = i, w.T = l;
    }
  }
  function t4(e, t, n, a) {
    var l = w.T;
    w.T = null;
    var i = Q.p;
    try {
      Q.p = 8, yc(e, t, n, a);
    } finally {
      Q.p = i, w.T = l;
    }
  }
  function yc(e, t, n, a) {
    if (zs) {
      var l = vc(a);
      if (l === null)
        rc(
          e,
          t,
          a,
          ks,
          n
        ), s1(e, a);
      else if (a4(
        l,
        e,
        t,
        n,
        a
      ))
        a.stopPropagation();
      else if (s1(e, a), t & 4 && -1 < n4.indexOf(e)) {
        for (; l !== null; ) {
          var i = ja(l);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var d = Jn(i.pendingLanes);
                  if (d !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                      var S = 1 << 31 - yt(d);
                      h.entanglements[1] |= S, d &= ~S;
                    }
                    Xt(i), (_e & 6) === 0 && (fs = xt() + 500, Jl(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = ea(i, 2), h !== null && ht(h, i, 2), hs(), bc(i, 2);
            }
          if (i = vc(a), i === null && rc(
            e,
            t,
            a,
            ks,
            n
          ), i === l) break;
          l = i;
        }
        l !== null && a.stopPropagation();
      } else
        rc(
          e,
          t,
          a,
          null,
          n
        );
    }
  }
  function vc(e) {
    return e = Si(e), Sc(e);
  }
  var ks = null;
  function Sc(e) {
    if (ks = null, e = Sa(e), e !== null) {
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
    return ks = e, null;
  }
  function r1(e) {
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
        switch (Gm()) {
          case fu:
            return 2;
          case mu:
            return 8;
          case yr:
          case Ym:
            return 32;
          case hu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var jc = !1, Bn = null, Hn = null, qn = null, nr = /* @__PURE__ */ new Map(), ar = /* @__PURE__ */ new Map(), Gn = [], n4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function s1(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Bn = null;
        break;
      case "dragenter":
      case "dragleave":
        Hn = null;
        break;
      case "mouseover":
      case "mouseout":
        qn = null;
        break;
      case "pointerover":
      case "pointerout":
        nr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ar.delete(t.pointerId);
    }
  }
  function lr(e, t, n, a, l, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: i,
      targetContainers: [l]
    }, t !== null && (t = ja(t), t !== null && a1(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function a4(e, t, n, a, l) {
    switch (t) {
      case "focusin":
        return Bn = lr(
          Bn,
          e,
          t,
          n,
          a,
          l
        ), !0;
      case "dragenter":
        return Hn = lr(
          Hn,
          e,
          t,
          n,
          a,
          l
        ), !0;
      case "mouseover":
        return qn = lr(
          qn,
          e,
          t,
          n,
          a,
          l
        ), !0;
      case "pointerover":
        var i = l.pointerId;
        return nr.set(
          i,
          lr(
            nr.get(i) || null,
            e,
            t,
            n,
            a,
            l
          )
        ), !0;
      case "gotpointercapture":
        return i = l.pointerId, ar.set(
          i,
          lr(
            ar.get(i) || null,
            e,
            t,
            n,
            a,
            l
          )
        ), !0;
    }
    return !1;
  }
  function i1(e) {
    var t = Sa(e.target);
    if (t !== null) {
      var n = m(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = x(n), t !== null) {
            e.blockedOn = t, vu(e.priority, function() {
              l1(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, vu(e.priority, function() {
              l1(n);
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
  function As(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = vc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        vi = a, n.target.dispatchEvent(a), vi = null;
      } else
        return t = ja(n), t !== null && a1(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function o1(e, t, n) {
    As(e) && n.delete(t);
  }
  function l4() {
    jc = !1, Bn !== null && As(Bn) && (Bn = null), Hn !== null && As(Hn) && (Hn = null), qn !== null && As(qn) && (qn = null), nr.forEach(o1), ar.forEach(o1);
  }
  function Ms(e, t) {
    e.blockedOn === t && (e.blockedOn = null, jc || (jc = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      l4
    )));
  }
  var Os = null;
  function c1(e) {
    Os !== e && (Os = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Os === e && (Os = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], a = e[t + 1], l = e[t + 2];
          if (typeof a != "function") {
            if (Sc(a || n) === null)
              continue;
            break;
          }
          var i = ja(n);
          i !== null && (e.splice(t, 3), t -= 3, vo(
            i,
            {
              pending: !0,
              data: l,
              method: n.method,
              action: a
            },
            a,
            l
          ));
        }
      }
    ));
  }
  function al(e) {
    function t(S) {
      return Ms(S, e);
    }
    Bn !== null && Ms(Bn, e), Hn !== null && Ms(Hn, e), qn !== null && Ms(qn, e), nr.forEach(t), ar.forEach(t);
    for (var n = 0; n < Gn.length; n++) {
      var a = Gn[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Gn.length && (n = Gn[0], n.blockedOn === null); )
      i1(n), n.blockedOn === null && Gn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var l = n[a], i = n[a + 1], d = l[ot] || null;
        if (typeof i == "function")
          d || c1(n);
        else if (d) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (l = i, d = i[ot] || null)
              h = d.formAction;
            else if (Sc(l) !== null) continue;
          } else h = d.action;
          typeof h == "function" ? n[a + 1] = h : (n.splice(a, 3), a -= 3), c1(n);
        }
      }
  }
  function u1() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(d) {
            return l = d;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      l !== null && (l(), l = null), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, l = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), l !== null && (l(), l = null);
      };
    }
  }
  function Cc(e) {
    this._internalRoot = e;
  }
  Rs.prototype.render = Cc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var n = t.current, a = Tt();
    t1(n, a, e, t, null, null);
  }, Rs.prototype.unmount = Cc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      t1(e.current, 2, null, e, null, null), hs(), t[va] = null;
    }
  };
  function Rs(e) {
    this._internalRoot = e;
  }
  Rs.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = yu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Gn.length && t !== 0 && t < Gn[n].priority; n++) ;
      Gn.splice(n, 0, e), n === 0 && i1(e);
    }
  };
  var d1 = s.version;
  if (d1 !== "19.2.3")
    throw Error(
      u(
        527,
        d1,
        "19.2.3"
      )
    );
  Q.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = v(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var r4 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: w,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ds = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ds.isDisabled && Ds.supportsFiber)
      try {
        ml = Ds.inject(
          r4
        ), bt = Ds;
      } catch {
      }
  }
  return sr.createRoot = function(e, t) {
    if (!f(e)) throw Error(u(299));
    var n = !1, a = "", l = bf, i = yf, d = vf;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = P0(
      e,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      l,
      i,
      d,
      u1
    ), e[va] = t.current, lc(e), new Cc(t);
  }, sr.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(u(299));
    var a = !1, l = "", i = bf, d = yf, h = vf, S = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (S = n.formState)), t = P0(
      e,
      1,
      !0,
      t,
      n ?? null,
      a,
      l,
      S,
      i,
      d,
      h,
      u1
    ), t.context = e1(null), n = t.current, a = Tt(), a = fi(a), l = Tn(a), l.callback = null, _n(n, l, a), n = a, t.current.lanes = n, gl(t, n), Xt(t), e[va] = t.current, lc(e), new Rs(t);
  }, sr.version = "19.2.3", sr;
}
var S1;
function p4() {
  if (S1) return Tc.exports;
  S1 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (s) {
        console.error(s);
      }
  }
  return c(), Tc.exports = g4(), Tc.exports;
}
var x4 = p4();
const lm = /* @__PURE__ */ ei(x4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b4 = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), y4 = (c) => c.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, o, u) => u ? u.toUpperCase() : o.toLowerCase()
), j1 = (c) => {
  const s = y4(c);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, rm = (...c) => c.filter((s, o, u) => !!s && s.trim() !== "" && u.indexOf(s) === o).join(" ").trim(), v4 = (c) => {
  for (const s in c)
    if (s.startsWith("aria-") || s === "role" || s === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var S4 = {
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
const j4 = A.forwardRef(
  ({
    color: c = "currentColor",
    size: s = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: u,
    className: f = "",
    children: m,
    iconNode: x,
    ...p
  }, g) => A.createElement(
    "svg",
    {
      ref: g,
      ...S4,
      width: s,
      height: s,
      stroke: c,
      strokeWidth: u ? Number(o) * 24 / Number(s) : o,
      className: rm("lucide", f),
      ...!m && !v4(p) && { "aria-hidden": "true" },
      ...p
    },
    [
      ...x.map(([v, y]) => A.createElement(v, y)),
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
const P = (c, s) => {
  const o = A.forwardRef(
    ({ className: u, ...f }, m) => A.createElement(j4, {
      ref: m,
      iconNode: s,
      className: rm(
        `lucide-${b4(j1(c))}`,
        `lucide-${c}`,
        u
      ),
      ...f
    })
  );
  return o.displayName = j1(c), o;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C4 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], N4 = P("arrow-down-to-line", C4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], T4 = P("arrow-up-right", E4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], w4 = P("bell", _4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], k4 = P("book-open", z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A4 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], M4 = P("book", A4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O4 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], sm = P("bot", O4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R4 = [
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
], D4 = P("boxes", R4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U4 = [
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
], L4 = P("brain-circuit", U4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B4 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], im = P("brain", B4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H4 = [
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
], q4 = P("calculator", H4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], om = P("check", G4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ul = P("chevron-down", Y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Jc = P("chevron-right", $4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], ti = P("circle-alert", V4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Wc = P("circle-check-big", X4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Z4 = P("circle-check", Q4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K4 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], J4 = P("clock", K4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W4 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], F4 = P("cloud", W4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], cm = P("copy", I4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P4 = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], C1 = P("corner-down-left", P4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eg = [
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
], Fc = P("cpu", eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tg = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], gr = P("database", tg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ng = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Qs = P("download", ng);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ag = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], lg = P("external-link", ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rg = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], sg = P("eye", rg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ig = [
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
], Ic = P("file-text", ig);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const og = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], cg = P("hash", og);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ug = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], dg = P("info", ug);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fg = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Pc = P("key", fg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mg = [
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
], um = P("layers", mg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], gg = P("layout-dashboard", hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pg = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], xg = P("list", pg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bg = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], pr = P("loader-circle", bg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], vg = P("maximize-2", yg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sg = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], jg = P("menu", Sg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], N1 = P("moon", Cg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ng = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], dm = P("network", Ng);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eg = [
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
], E1 = P("palette", Eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tg = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], _g = P("pause", Tg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], zg = P("pen", wg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], eu = P("play", kg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ag = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], tu = P("plus", Ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], nu = P("power", Mg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Og = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Zt = P("refresh-cw", Og);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rg = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], fm = P("regex", Rg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dg = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], Ug = P("save", Dg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lg = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], Bg = P("scissors", Lg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hg = [
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
], qg = P("scroll-text", Hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gg = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], cl = P("search", Gg);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], $g = P("send", Yg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vg = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], mm = P("server", Vg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xg = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], hm = P("settings", Xg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qg = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], au = P("settings-2", Qg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zg = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Kg = P("sun", Zg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jg = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], dl = P("terminal", Jg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wg = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], fl = P("trash-2", Wg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fg = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ig = P("triangle-alert", Fg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pg = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], e3 = P("upload", Pg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t3 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], ni = P("x", t3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n3 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], lu = P("zap", n3), a3 = () => {
  if (document.getElementById("engram-font-preload")) return;
  [
    "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap",
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
  ].forEach((s, o) => {
    const u = document.createElement("link");
    u.rel = "preload", u.as = "style", u.href = s, o === 0 && (u.id = "engram-font-preload"), document.head.appendChild(u);
    const f = document.createElement("link");
    f.rel = "stylesheet", f.href = s, document.head.appendChild(f);
  });
}, l3 = () => (A.useEffect(() => {
  a3();
}, []), /* @__PURE__ */ r.jsx("style", { children: `
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
  ` })), Hc = [
  // 导航命令
  {
    id: "nav-memory",
    icon: xg,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (c) => c("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: dm,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (c) => c("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: im,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (c) => c("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Pc,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (c) => c("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: dl,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (c) => c("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: hm,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (c) => c("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function r3(c) {
  const s = c.toLowerCase().trim();
  return s ? Hc.filter((o) => {
    var u;
    return o.label.toLowerCase().includes(s) || ((u = o.description) == null ? void 0 : u.toLowerCase().includes(s)) || o.keywords.some((f) => f.toLowerCase().includes(s));
  }) : Hc;
}
const s3 = {}, T1 = (c) => {
  let s;
  const o = /* @__PURE__ */ new Set(), u = (y, b) => {
    const z = typeof y == "function" ? y(s) : y;
    if (!Object.is(z, s)) {
      const M = s;
      s = b ?? (typeof z != "object" || z === null) ? z : Object.assign({}, s, z), o.forEach((_) => _(s, M));
    }
  }, f = () => s, g = { setState: u, getState: f, getInitialState: () => v, subscribe: (y) => (o.add(y), () => o.delete(y)), destroy: () => {
    (s3 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), o.clear();
  } }, v = s = c(u, f, g);
  return g;
}, i3 = (c) => c ? T1(c) : T1;
var kc = { exports: {} }, Ac = {}, Mc = { exports: {} }, Oc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _1;
function o3() {
  if (_1) return Oc;
  _1 = 1;
  var c = hr();
  function s(b, z) {
    return b === z && (b !== 0 || 1 / b === 1 / z) || b !== b && z !== z;
  }
  var o = typeof Object.is == "function" ? Object.is : s, u = c.useState, f = c.useEffect, m = c.useLayoutEffect, x = c.useDebugValue;
  function p(b, z) {
    var M = z(), _ = u({ inst: { value: M, getSnapshot: z } }), R = _[0].inst, X = _[1];
    return m(
      function() {
        R.value = M, R.getSnapshot = z, g(R) && X({ inst: R });
      },
      [b, M, z]
    ), f(
      function() {
        return g(R) && X({ inst: R }), b(function() {
          g(R) && X({ inst: R });
        });
      },
      [b]
    ), x(M), M;
  }
  function g(b) {
    var z = b.getSnapshot;
    b = b.value;
    try {
      var M = z();
      return !o(b, M);
    } catch {
      return !0;
    }
  }
  function v(b, z) {
    return z();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? v : p;
  return Oc.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : y, Oc;
}
var w1;
function c3() {
  return w1 || (w1 = 1, Mc.exports = o3()), Mc.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var z1;
function u3() {
  if (z1) return Ac;
  z1 = 1;
  var c = hr(), s = c3();
  function o(v, y) {
    return v === y && (v !== 0 || 1 / v === 1 / y) || v !== v && y !== y;
  }
  var u = typeof Object.is == "function" ? Object.is : o, f = s.useSyncExternalStore, m = c.useRef, x = c.useEffect, p = c.useMemo, g = c.useDebugValue;
  return Ac.useSyncExternalStoreWithSelector = function(v, y, b, z, M) {
    var _ = m(null);
    if (_.current === null) {
      var R = { hasValue: !1, value: null };
      _.current = R;
    } else R = _.current;
    _ = p(
      function() {
        function V($) {
          if (!W) {
            if (W = !0, J = $, $ = z($), M !== void 0 && R.hasValue) {
              var Y = R.value;
              if (M(Y, $))
                return re = Y;
            }
            return re = $;
          }
          if (Y = re, u(J, $)) return Y;
          var se = z($);
          return M !== void 0 && M(Y, se) ? (J = $, Y) : (J = $, re = se);
        }
        var W = !1, J, re, ge = b === void 0 ? null : b;
        return [
          function() {
            return V(y());
          },
          ge === null ? void 0 : function() {
            return V(ge());
          }
        ];
      },
      [y, b, z, M]
    );
    var X = f(v, _[0], _[1]);
    return x(
      function() {
        R.hasValue = !0, R.value = X;
      },
      [X]
    ), g(X), X;
  }, Ac;
}
var k1;
function d3() {
  return k1 || (k1 = 1, kc.exports = u3()), kc.exports;
}
var f3 = d3();
const m3 = /* @__PURE__ */ ei(f3), gm = {}, { useDebugValue: h3 } = nm, { useSyncExternalStoreWithSelector: g3 } = m3;
let A1 = !1;
const p3 = (c) => c;
function x3(c, s = p3, o) {
  (gm ? "production" : void 0) !== "production" && o && !A1 && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), A1 = !0);
  const u = g3(
    c.subscribe,
    c.getState,
    c.getServerState || c.getInitialState,
    s,
    o
  );
  return h3(u), u;
}
const M1 = (c) => {
  (gm ? "production" : void 0) !== "production" && typeof c != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const s = typeof c == "function" ? i3(c) : c, o = (u, f) => x3(s, u, f);
  return Object.assign(o, s), o;
}, b3 = (c) => c ? M1(c) : M1, y3 = {
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
    border: "oklch(0.1884 0.0128 248.5103 / 0.15)",
    // Darker (Foreground based) as requested
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
    sidebarBorder: "oklch(0.1884 0.0128 248.5103 / 0.1)",
    // Darker (Foreground based)
    sidebarRing: "oklch(0.6818 0.1584 243.3540)"
  },
  variables: {
    radius: "1.3rem"
  }
}, v3 = {
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
    border: "oklch(0.8074 0.0142 93.0137 / 0.15)",
    // Foreground / 0.15
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
    sidebarBorder: "oklch(0.7713 0.0169 99.0657 / 0.15)",
    // SidebarForeground / 0.15
    sidebarRing: "oklch(0.6724 0.1308 38.7559)"
  },
  variables: {
    radius: "0.4rem"
  }
}, S3 = {
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
    border: "oklch(0.9328 0.0025 228.7857 / 0.15)",
    // Foreground / 0.15
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
    sidebarBorder: "oklch(0.9328 0.0025 228.7857 / 0.15)",
    // SidebarForeground / 0.15
    sidebarRing: "oklch(0.6818 0.1584 243.3540)"
  },
  variables: {
    radius: "1.3rem"
  }
}, j3 = {
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
    border: "#f2f3f526",
    // Foreground #f2f3f5 with ~15% alpha
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
    sidebarBorder: "#949ba426",
    // SidebarForeground #949ba4 with ~15% alpha
    sidebarRing: "#5865f2"
  },
  variables: {
    radius: "0.25rem"
  }
}, C3 = {
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
    border: "#cba6f726",
    // Mauve with ~15% alpha
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
    sidebarBorder: "#cba6f726",
    // Mauve with ~15% alpha
    sidebarRing: "#89b4fa"
  },
  variables: {
    radius: "0.5rem"
  }
}, N3 = {
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
}, E3 = {
  name: "Glass (Frosted)",
  colors: {
    // 背景完全透明，但跟随透明度变化
    background: "rgba(255, 255, 255, var(--glass-opacity, 0.1))",
    foreground: "#0f172a",
    // 深色文字 (Slate-900) 以适应白色磨砂背景
    // 卡片使用动态透明度 - 改为白色基底
    card: "rgba(255, 255, 255, var(--glass-opacity, 0.25))",
    cardForeground: "#0f172a",
    popover: "rgba(255, 255, 255, var(--glass-opacity, 0.4))",
    popoverForeground: "#0f172a",
    primary: "rgba(15, 23, 42, 0.8)",
    // 深色主色
    primaryForeground: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.3)",
    secondaryForeground: "#0f172a",
    muted: "rgba(255, 255, 255, 0.3)",
    mutedForeground: "rgba(15, 23, 42, 0.6)",
    accent: "rgba(255, 255, 255, 0.4)",
    accentForeground: "#0f172a",
    destructive: "rgba(239, 68, 68, 0.8)",
    destructiveForeground: "#ffffff",
    border: "rgba(15, 23, 42, 0.15)",
    // Lighter base (will be resistant to fade)
    input: "rgba(255, 255, 255, 0.4)",
    ring: "rgba(15, 23, 42, 0.4)",
    chart1: "#0f172a",
    chart2: "rgba(15, 23, 42, 0.8)",
    chart3: "rgba(15, 23, 42, 0.6)",
    chart4: "rgba(15, 23, 42, 0.4)",
    chart5: "rgba(15, 23, 42, 0.2)",
    sidebar: "rgba(255, 255, 255, var(--glass-opacity, 0.15))",
    sidebarForeground: "#0f172a",
    sidebarPrimary: "rgba(15, 23, 42, 0.8)",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent: "rgba(255, 255, 255, 0.3)",
    sidebarAccentForeground: "#0f172a",
    sidebarBorder: "rgba(15, 23, 42, 0.1)",
    // Lighter base
    sidebarRing: "rgba(15, 23, 42, 0.4)"
  },
  variables: {
    radius: "1rem"
  }
}, Ys = {
  sillytavern: N3,
  // SillyTavern 继承主题
  paperLight: y3,
  twitterDark: S3,
  claudeDark: v3,
  catppuccin: C3,
  discord: j3,
  glass: E3
}, lt = [];
for (let c = 0; c < 256; ++c)
  lt.push((c + 256).toString(16).slice(1));
function T3(c, s = 0) {
  return (lt[c[s + 0]] + lt[c[s + 1]] + lt[c[s + 2]] + lt[c[s + 3]] + "-" + lt[c[s + 4]] + lt[c[s + 5]] + "-" + lt[c[s + 6]] + lt[c[s + 7]] + "-" + lt[c[s + 8]] + lt[c[s + 9]] + "-" + lt[c[s + 10]] + lt[c[s + 11]] + lt[c[s + 12]] + lt[c[s + 13]] + lt[c[s + 14]] + lt[c[s + 15]]).toLowerCase();
}
let Rc;
const _3 = new Uint8Array(16);
function w3() {
  if (!Rc) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Rc = crypto.getRandomValues.bind(crypto);
  }
  return Rc(_3);
}
const z3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), O1 = { randomUUID: z3 };
function k3(c, s, o) {
  var f;
  c = c || {};
  const u = c.random ?? ((f = c.rng) == null ? void 0 : f.call(c)) ?? w3();
  if (u.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return u[6] = u[6] & 15 | 64, u[8] = u[8] & 63 | 128, T3(u);
}
function A3(c, s, o) {
  return O1.randomUUID && !c ? O1.randomUUID() : k3(c);
}
var qc = function(c, s) {
  return qc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, u) {
    o.__proto__ = u;
  } || function(o, u) {
    for (var f in u) Object.prototype.hasOwnProperty.call(u, f) && (o[f] = u[f]);
  }, qc(c, s);
};
function xr(c, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  qc(c, s);
  function o() {
    this.constructor = c;
  }
  c.prototype = s === null ? Object.create(s) : (o.prototype = s.prototype, new o());
}
function Gc(c) {
  var s = typeof Symbol == "function" && Symbol.iterator, o = s && c[s], u = 0;
  if (o) return o.call(c);
  if (c && typeof c.length == "number") return {
    next: function() {
      return c && u >= c.length && (c = void 0), { value: c && c[u++], done: !c };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Yc(c, s) {
  var o = typeof Symbol == "function" && c[Symbol.iterator];
  if (!o) return c;
  var u = o.call(c), f, m = [], x;
  try {
    for (; (s === void 0 || s-- > 0) && !(f = u.next()).done; ) m.push(f.value);
  } catch (p) {
    x = { error: p };
  } finally {
    try {
      f && !f.done && (o = u.return) && o.call(u);
    } finally {
      if (x) throw x.error;
    }
  }
  return m;
}
function $c(c, s, o) {
  if (o || arguments.length === 2) for (var u = 0, f = s.length, m; u < f; u++)
    (m || !(u in s)) && (m || (m = Array.prototype.slice.call(s, 0, u)), m[u] = s[u]);
  return c.concat(m || Array.prototype.slice.call(s));
}
function Kt(c) {
  return typeof c == "function";
}
function pm(c) {
  var s = function(u) {
    Error.call(u), u.stack = new Error().stack;
  }, o = c(s);
  return o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o;
}
var Dc = pm(function(c) {
  return function(o) {
    c(this), this.message = o ? o.length + ` errors occurred during unsubscription:
` + o.map(function(u, f) {
      return f + 1 + ") " + u.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = o;
  };
});
function Vc(c, s) {
  if (c) {
    var o = c.indexOf(s);
    0 <= o && c.splice(o, 1);
  }
}
var ai = (function() {
  function c(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return c.prototype.unsubscribe = function() {
    var s, o, u, f, m;
    if (!this.closed) {
      this.closed = !0;
      var x = this._parentage;
      if (x)
        if (this._parentage = null, Array.isArray(x))
          try {
            for (var p = Gc(x), g = p.next(); !g.done; g = p.next()) {
              var v = g.value;
              v.remove(this);
            }
          } catch (R) {
            s = { error: R };
          } finally {
            try {
              g && !g.done && (o = p.return) && o.call(p);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          x.remove(this);
      var y = this.initialTeardown;
      if (Kt(y))
        try {
          y();
        } catch (R) {
          m = R instanceof Dc ? R.errors : [R];
        }
      var b = this._finalizers;
      if (b) {
        this._finalizers = null;
        try {
          for (var z = Gc(b), M = z.next(); !M.done; M = z.next()) {
            var _ = M.value;
            try {
              R1(_);
            } catch (R) {
              m = m ?? [], R instanceof Dc ? m = $c($c([], Yc(m)), Yc(R.errors)) : m.push(R);
            }
          }
        } catch (R) {
          u = { error: R };
        } finally {
          try {
            M && !M.done && (f = z.return) && f.call(z);
          } finally {
            if (u) throw u.error;
          }
        }
      }
      if (m)
        throw new Dc(m);
    }
  }, c.prototype.add = function(s) {
    var o;
    if (s && s !== this)
      if (this.closed)
        R1(s);
      else {
        if (s instanceof c) {
          if (s.closed || s._hasParent(this))
            return;
          s._addParent(this);
        }
        (this._finalizers = (o = this._finalizers) !== null && o !== void 0 ? o : []).push(s);
      }
  }, c.prototype._hasParent = function(s) {
    var o = this._parentage;
    return o === s || Array.isArray(o) && o.includes(s);
  }, c.prototype._addParent = function(s) {
    var o = this._parentage;
    this._parentage = Array.isArray(o) ? (o.push(s), o) : o ? [o, s] : s;
  }, c.prototype._removeParent = function(s) {
    var o = this._parentage;
    o === s ? this._parentage = null : Array.isArray(o) && Vc(o, s);
  }, c.prototype.remove = function(s) {
    var o = this._finalizers;
    o && Vc(o, s), s instanceof c && s._removeParent(this);
  }, c.EMPTY = (function() {
    var s = new c();
    return s.closed = !0, s;
  })(), c;
})(), xm = ai.EMPTY;
function bm(c) {
  return c instanceof ai || c && "closed" in c && Kt(c.remove) && Kt(c.add) && Kt(c.unsubscribe);
}
function R1(c) {
  Kt(c) ? c() : c.unsubscribe();
}
var M3 = {
  Promise: void 0
}, O3 = {
  setTimeout: function(c, s) {
    for (var o = [], u = 2; u < arguments.length; u++)
      o[u - 2] = arguments[u];
    return setTimeout.apply(void 0, $c([c, s], Yc(o)));
  },
  clearTimeout: function(c) {
    return clearTimeout(c);
  },
  delegate: void 0
};
function R3(c) {
  O3.setTimeout(function() {
    throw c;
  });
}
function D1() {
}
function $s(c) {
  c();
}
var ru = (function(c) {
  xr(s, c);
  function s(o) {
    var u = c.call(this) || this;
    return u.isStopped = !1, o ? (u.destination = o, bm(o) && o.add(u)) : u.destination = L3, u;
  }
  return s.create = function(o, u, f) {
    return new Xc(o, u, f);
  }, s.prototype.next = function(o) {
    this.isStopped || this._next(o);
  }, s.prototype.error = function(o) {
    this.isStopped || (this.isStopped = !0, this._error(o));
  }, s.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, s.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, c.prototype.unsubscribe.call(this), this.destination = null);
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
})(ai), D3 = (function() {
  function c(s) {
    this.partialObserver = s;
  }
  return c.prototype.next = function(s) {
    var o = this.partialObserver;
    if (o.next)
      try {
        o.next(s);
      } catch (u) {
        Us(u);
      }
  }, c.prototype.error = function(s) {
    var o = this.partialObserver;
    if (o.error)
      try {
        o.error(s);
      } catch (u) {
        Us(u);
      }
    else
      Us(s);
  }, c.prototype.complete = function() {
    var s = this.partialObserver;
    if (s.complete)
      try {
        s.complete();
      } catch (o) {
        Us(o);
      }
  }, c;
})(), Xc = (function(c) {
  xr(s, c);
  function s(o, u, f) {
    var m = c.call(this) || this, x;
    return Kt(o) || !o ? x = {
      next: o ?? void 0,
      error: u ?? void 0,
      complete: f ?? void 0
    } : x = o, m.destination = new D3(x), m;
  }
  return s;
})(ru);
function Us(c) {
  R3(c);
}
function U3(c) {
  throw c;
}
var L3 = {
  closed: !0,
  next: D1,
  error: U3,
  complete: D1
}, B3 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function H3(c) {
  return c;
}
function q3(c) {
  return c.length === 0 ? H3 : c.length === 1 ? c[0] : function(o) {
    return c.reduce(function(u, f) {
      return f(u);
    }, o);
  };
}
var U1 = (function() {
  function c(s) {
    s && (this._subscribe = s);
  }
  return c.prototype.lift = function(s) {
    var o = new c();
    return o.source = this, o.operator = s, o;
  }, c.prototype.subscribe = function(s, o, u) {
    var f = this, m = Y3(s) ? s : new Xc(s, o, u);
    return $s(function() {
      var x = f, p = x.operator, g = x.source;
      m.add(p ? p.call(m, g) : g ? f._subscribe(m) : f._trySubscribe(m));
    }), m;
  }, c.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (o) {
      s.error(o);
    }
  }, c.prototype.forEach = function(s, o) {
    var u = this;
    return o = L1(o), new o(function(f, m) {
      var x = new Xc({
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
      u.subscribe(x);
    });
  }, c.prototype._subscribe = function(s) {
    var o;
    return (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(s);
  }, c.prototype[B3] = function() {
    return this;
  }, c.prototype.pipe = function() {
    for (var s = [], o = 0; o < arguments.length; o++)
      s[o] = arguments[o];
    return q3(s)(this);
  }, c.prototype.toPromise = function(s) {
    var o = this;
    return s = L1(s), new s(function(u, f) {
      var m;
      o.subscribe(function(x) {
        return m = x;
      }, function(x) {
        return f(x);
      }, function() {
        return u(m);
      });
    });
  }, c.create = function(s) {
    return new c(s);
  }, c;
})();
function L1(c) {
  var s;
  return (s = c ?? M3.Promise) !== null && s !== void 0 ? s : Promise;
}
function G3(c) {
  return c && Kt(c.next) && Kt(c.error) && Kt(c.complete);
}
function Y3(c) {
  return c && c instanceof ru || G3(c) && bm(c);
}
function $3(c) {
  return Kt(c == null ? void 0 : c.lift);
}
function V3(c) {
  return function(s) {
    if ($3(s))
      return s.lift(function(o) {
        try {
          return c(o, this);
        } catch (u) {
          this.error(u);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function X3(c, s, o, u, f) {
  return new Q3(c, s, o, u, f);
}
var Q3 = (function(c) {
  xr(s, c);
  function s(o, u, f, m, x, p) {
    var g = c.call(this, o) || this;
    return g.onFinalize = x, g.shouldUnsubscribe = p, g._next = u ? function(v) {
      try {
        u(v);
      } catch (y) {
        o.error(y);
      }
    } : c.prototype._next, g._error = m ? function(v) {
      try {
        m(v);
      } catch (y) {
        o.error(y);
      } finally {
        this.unsubscribe();
      }
    } : c.prototype._error, g._complete = f ? function() {
      try {
        f();
      } catch (v) {
        o.error(v);
      } finally {
        this.unsubscribe();
      }
    } : c.prototype._complete, g;
  }
  return s.prototype.unsubscribe = function() {
    var o;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var u = this.closed;
      c.prototype.unsubscribe.call(this), !u && ((o = this.onFinalize) === null || o === void 0 || o.call(this));
    }
  }, s;
})(ru), Z3 = pm(function(c) {
  return function() {
    c(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), su = (function(c) {
  xr(s, c);
  function s() {
    var o = c.call(this) || this;
    return o.closed = !1, o.currentObservers = null, o.observers = [], o.isStopped = !1, o.hasError = !1, o.thrownError = null, o;
  }
  return s.prototype.lift = function(o) {
    var u = new B1(this, this);
    return u.operator = o, u;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Z3();
  }, s.prototype.next = function(o) {
    var u = this;
    $s(function() {
      var f, m;
      if (u._throwIfClosed(), !u.isStopped) {
        u.currentObservers || (u.currentObservers = Array.from(u.observers));
        try {
          for (var x = Gc(u.currentObservers), p = x.next(); !p.done; p = x.next()) {
            var g = p.value;
            g.next(o);
          }
        } catch (v) {
          f = { error: v };
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
    var u = this;
    $s(function() {
      if (u._throwIfClosed(), !u.isStopped) {
        u.hasError = u.isStopped = !0, u.thrownError = o;
        for (var f = u.observers; f.length; )
          f.shift().error(o);
      }
    });
  }, s.prototype.complete = function() {
    var o = this;
    $s(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.isStopped = !0;
        for (var u = o.observers; u.length; )
          u.shift().complete();
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
    return this._throwIfClosed(), c.prototype._trySubscribe.call(this, o);
  }, s.prototype._subscribe = function(o) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(o), this._innerSubscribe(o);
  }, s.prototype._innerSubscribe = function(o) {
    var u = this, f = this, m = f.hasError, x = f.isStopped, p = f.observers;
    return m || x ? xm : (this.currentObservers = null, p.push(o), new ai(function() {
      u.currentObservers = null, Vc(p, o);
    }));
  }, s.prototype._checkFinalizedStatuses = function(o) {
    var u = this, f = u.hasError, m = u.thrownError, x = u.isStopped;
    f ? o.error(m) : x && o.complete();
  }, s.prototype.asObservable = function() {
    var o = new U1();
    return o.source = this, o;
  }, s.create = function(o, u) {
    return new B1(o, u);
  }, s;
})(U1), B1 = (function(c) {
  xr(s, c);
  function s(o, u) {
    var f = c.call(this) || this;
    return f.destination = o, f.source = u, f;
  }
  return s.prototype.next = function(o) {
    var u, f;
    (f = (u = this.destination) === null || u === void 0 ? void 0 : u.next) === null || f === void 0 || f.call(u, o);
  }, s.prototype.error = function(o) {
    var u, f;
    (f = (u = this.destination) === null || u === void 0 ? void 0 : u.error) === null || f === void 0 || f.call(u, o);
  }, s.prototype.complete = function() {
    var o, u;
    (u = (o = this.destination) === null || o === void 0 ? void 0 : o.complete) === null || u === void 0 || u.call(o);
  }, s.prototype._subscribe = function(o) {
    var u, f;
    return (f = (u = this.source) === null || u === void 0 ? void 0 : u.subscribe(o)) !== null && f !== void 0 ? f : xm;
  }, s;
})(su);
function K3(c, s) {
  return V3(function(o, u) {
    var f = 0;
    o.subscribe(X3(u, function(m) {
      return c.call(s, m, f++) && u.next(m);
    }));
  });
}
const Ls = new su(), J3 = {
  /**
   * 发布事件
   */
  emit(c) {
    Ls.next({
      ...c,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(c) {
    const s = Ls.subscribe(c);
    return {
      unsubscribe: () => s.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(c, s) {
    const o = Ls.pipe(K3((u) => u.type === c)).subscribe((u) => s(u.payload));
    return {
      unsubscribe: () => o.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Ls.asObservable();
  }
};
var Ue = /* @__PURE__ */ ((c) => (c[c.DEBUG = 0] = "DEBUG", c[c.INFO = 1] = "INFO", c[c.SUCCESS = 2] = "SUCCESS", c[c.WARN = 3] = "WARN", c[c.ERROR = 4] = "ERROR", c))(Ue || {});
const Zs = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, ym = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, vm = new su();
let hn = [], dr = { ...ym };
function W3(c) {
  return new Date(c).toTimeString().slice(0, 8);
}
function ol(c, s, o, u) {
  if (c < dr.minLevel) return;
  const f = {
    id: A3(),
    timestamp: Date.now(),
    level: c,
    module: s,
    message: o,
    data: u
  };
  hn.push(f), hn.length > dr.maxEntries && (hn = hn.slice(-dr.maxEntries)), vm.next(f);
}
function F3() {
  J3.subscribe((c) => {
    const o = {
      INGESTION_START: Ue.INFO,
      INGESTION_COMPLETE: Ue.SUCCESS,
      ENTITY_CREATED: Ue.INFO,
      MEMORY_STORED: Ue.SUCCESS,
      RETRIEVAL_START: Ue.DEBUG,
      RETRIEVAL_COMPLETE: Ue.SUCCESS,
      CHAT_CHANGED: Ue.INFO,
      MESSAGE_RECEIVED: Ue.DEBUG
    }[c.type] ?? Ue.DEBUG;
    ol(o, "EventBus", `${c.type}`, c.payload);
  });
}
const ae = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(c) {
    c && (dr = { ...dr, ...c }), hn = [], F3(), ae.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(c, s, o) {
    ol(Ue.DEBUG, c, s, o);
  },
  /**
   * INFO 级别日志
   */
  info(c, s, o) {
    ol(Ue.INFO, c, s, o);
  },
  /**
   * SUCCESS 级别日志
   */
  success(c, s, o) {
    ol(Ue.SUCCESS, c, s, o);
  },
  /**
   * WARN 级别日志
   */
  warn(c, s, o) {
    ol(Ue.WARN, c, s, o);
  },
  /**
   * ERROR 级别日志
   */
  error(c, s, o) {
    ol(Ue.ERROR, c, s, o);
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
  subscribe(c) {
    const s = vm.subscribe(c);
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
    const c = /* @__PURE__ */ new Date();
    c.toISOString().slice(0, 10), c.toTimeString().slice(0, 8).replace(/:/g, "");
    const s = {
      [Ue.DEBUG]: "DEBUG",
      [Ue.INFO]: "INFO",
      [Ue.SUCCESS]: "SUCCESS",
      [Ue.WARN]: "WARN",
      [Ue.ERROR]: "ERROR"
    };
    let o = `# Engram Debug Log

`;
    o += `- **导出时间**: ${c.toLocaleString("zh-CN")}
`, o += `- **版本**: 0.1.0
`, o += `- **日志条数**: ${hn.length}

`, o += `---

`, o += `## 日志记录

`, o += "```\n";
    for (const u of hn) {
      const f = W3(u.timestamp), m = s[u.level].padEnd(7), x = u.module.padEnd(16);
      if (o += `[${f}] [${x}] ${m} ${u.message}
`, u.data !== void 0) {
        const p = JSON.stringify(u.data, null, 2).split(`
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
    const c = /* @__PURE__ */ new Date(), s = c.toISOString().slice(0, 10), o = c.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${s}_${o}.md`;
  }
}, iu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: ym,
  LogLevel: Ue,
  LogLevelConfig: Zs,
  Logger: ae
}, Symbol.toStringTag, { value: "Module" })), ma = Object.freeze({
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
  },
  glassSettings: {
    enabled: !0,
    opacity: 0.3,
    blur: 10
  }
});
class me {
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
  static getSettings() {
    const s = this.getContext();
    return s != null && s.extensionSettings ? (s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...ma }, ae.debug("SettingsManager", "Initialized engram settings with defaults"), this.save()), s.extensionSettings[this.EXTENSION_NAME]) : (ae.warn("SettingsManager", "SillyTavern context.extensionSettings not available"), { ...ma });
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
    s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...ma }, o = !0, ae.info("SettingsManager", "Created engram settings"));
    const u = s.extensionSettings[this.EXTENSION_NAME];
    for (const f of Object.keys(ma))
      f in u || (u[f] = ma[f], o = !0, ae.debug("SettingsManager", `Added missing field: ${f}`));
    o && this.save();
  }
  /**
   * Get a specific setting value
   */
  static get(s) {
    const u = this.getExtensionSettings()[s];
    return u !== void 0 ? u : ma[s];
  }
  /**
   * Save a specific setting value
   * 直接更新 context.extensionSettings 中的字段
   */
  static set(s, o) {
    const u = this.getContext();
    if (!(u != null && u.extensionSettings)) {
      ae.warn("SettingsManager", "Cannot set: context.extensionSettings not available");
      return;
    }
    u.extensionSettings[this.EXTENSION_NAME] || (u.extensionSettings[this.EXTENSION_NAME] = { ...ma }), u.extensionSettings[this.EXTENSION_NAME][s] = o, ae.debug("SettingsManager", `Set ${String(s)} = ${JSON.stringify(o)}`), this.save();
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
    return (this.get("promptTemplates") || []).find((u) => u.category === s && u.enabled) || null;
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
He(me, "EXTENSION_NAME", "engram");
const Sm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: me
}, Symbol.toStringTag, { value: "Module" }));
class Qn {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let o = me.loadSettings().theme;
    o || (o = localStorage.getItem(this.STORAGE_KEY), o && me.set("theme", o));
    const u = Ys[o] ? o : "claudeDark";
    this.setTheme(u), ae.info("ThemeManager", `主题系统初始化完成: ${u}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    Ys[s] || (ae.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, me.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
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
    var _, R;
    const o = Ys[s];
    if (!o) return;
    const u = document.documentElement, f = (X, V) => {
      u.style.setProperty(X, V);
    }, m = me.getSettings(), p = ((_ = m.glassSettings) == null ? void 0 : _.enabled) ?? !0 ? ((R = m.glassSettings) == null ? void 0 : R.opacity) ?? 1 : 1, v = !(s === "glass") && p < 1, y = Math.round((1 - p) * 100), b = [
      "background",
      "card",
      "popover",
      "sidebar",
      "secondary",
      "muted",
      "input",
      "border",
      "sidebarBorder"
    ];
    Object.entries(o.colors).forEach(([X, V]) => {
      let W = `--${X.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      W = W.replace(/(\d+)/, "-$1");
      let J = V;
      if (v && b.includes(X)) {
        const ge = X.toLowerCase().includes("border") ? Math.round(y * 0.1) : y;
        J = `color-mix(in srgb, ${V}, transparent ${ge}%)`;
      }
      f(W, J);
    }), Object.entries(o.variables).forEach(([X, V]) => {
      f(`--${X}`, V);
    }), s !== "paperLight" ? u.classList.add("dark") : u.classList.remove("dark");
    const M = me.getSettings().glassSettings;
    M && M.enabled ? (f("--glass-opacity", M.opacity.toString()), f("--glass-blur", `${M.blur}px`), M.blur > 0 ? f("--glass-backdrop-filter", `blur(${M.blur}px)`) : f("--glass-backdrop-filter", "none")) : (f("--glass-opacity", "1"), f("--glass-blur", "0px"), f("--glass-backdrop-filter", "none"));
  }
}
He(Qn, "STORAGE_KEY", "engram-theme"), He(Qn, "currentTheme", "claudeDark");
const Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Qn
}, Symbol.toStringTag, { value: "Module" })), I3 = b3((c) => ({
  theme: Qn.getTheme(),
  isDarkMode: Qn.getTheme() !== "paperLight",
  setTheme: (s) => {
    Qn.setTheme(s), c({
      theme: s,
      isDarkMode: s !== "paperLight"
    });
  }
})), P3 = ({ onNavigate: c }) => {
  const s = I3((_) => _.setTheme), [o, u] = A.useState(""), [f, m] = A.useState(!1), [x, p] = A.useState(0), [g, v] = A.useState(Hc), y = A.useRef(null), b = [
    {
      id: "theme-paper-light",
      icon: Kg,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: N1,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: N1,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: E1,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: E1,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  A.useEffect(() => {
    const _ = r3(o), R = o.toLowerCase().trim(), X = b.filter(
      (V) => {
        var W;
        return !R || V.label.toLowerCase().includes(R) || ((W = V.description) == null ? void 0 : W.toLowerCase().includes(R)) || V.keywords.some((J) => J.toLowerCase().includes(R));
      }
    );
    v([..._, ...X]), p(0);
  }, [o]), A.useEffect(() => {
    const _ = (R) => {
      (R.metaKey || R.ctrlKey) && R.key === "k" && (R.preventDefault(), m(!0));
    };
    return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
  }, []), A.useEffect(() => {
    f && setTimeout(() => {
      var _;
      return (_ = y.current) == null ? void 0 : _.focus();
    }, 50);
  }, [f]);
  const z = (_) => {
    const R = g.length + (o ? 1 : 0);
    switch (_.key) {
      case "ArrowDown":
        _.preventDefault(), p((X) => (X + 1) % R);
        break;
      case "ArrowUp":
        _.preventDefault(), p((X) => (X - 1 + R) % R);
        break;
      case "Enter":
        _.preventDefault(), M();
        break;
      case "Escape":
        m(!1);
        break;
    }
  }, M = () => {
    g.length > 0 && x < g.length ? g[x].action(c) : o && (console.log("Searching memory for:", o), c("/memory")), m(!1), u("");
  };
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(
      "button",
      {
        onClick: () => m(!0),
        className: "p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground",
        title: "搜索 (Cmd+K)",
        children: /* @__PURE__ */ r.jsx(cl, { size: 20 })
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
          backdropFilter: "var(--glass-backdrop-filter, blur(4px))"
          // Apply global glass blur variable
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
              // This will pick up the transparent color from theme
              color: "var(--popover-foreground)",
              backdropFilter: "var(--glass-backdrop-filter)"
              // Ensure the modal content itself also blurs what's behind it if it's transparent
            },
            children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border/50", children: [
                /* @__PURE__ */ r.jsx(cl, { size: 20, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    ref: y,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: o,
                    onChange: (_) => u(_.target.value),
                    onKeyDown: z
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                g.length > 0 && /* @__PURE__ */ r.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  g.map((_, R) => /* @__PURE__ */ r.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${R === x ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        _.action(c), m(!1), u("");
                      },
                      onMouseEnter: () => p(R),
                      children: [
                        /* @__PURE__ */ r.jsx(_.icon, { size: 18, className: `shrink-0 ${R === x ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ r.jsx("div", { className: "text-sm font-medium", children: _.label }),
                          _.description && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: _.description })
                        ] }),
                        R === x && /* @__PURE__ */ r.jsx(C1, { size: 16, className: "text-muted-foreground/50" })
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
                      onClick: () => M(),
                      onMouseEnter: () => p(g.length),
                      children: [
                        /* @__PURE__ */ r.jsx(cl, { size: 18, className: `shrink-0 ${x === g.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ r.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ r.jsx("span", { className: "text-primary", children: o }),
                            '"'
                          ] }),
                          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        x === g.length && /* @__PURE__ */ r.jsx(C1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    }
                  )
                ] }),
                g.length === 0 && !o && /* @__PURE__ */ r.jsxs("div", { className: "px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ r.jsx(cl, { size: 32, className: "opacity-20 mb-2" }),
                  /* @__PURE__ */ r.jsx("p", { children: "输入关键词开始搜索..." })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}, Qc = ({ className: c = "", size: s = 24 }) => /* @__PURE__ */ r.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 592",
    width: s,
    height: s,
    className: c,
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
), ep = ({
  onToggleSidebar: c,
  isMobile: s,
  // Deprecated prop, handled by CSS
  onClose: o,
  onNavigate: u
}) => /* @__PURE__ */ r.jsxs("header", { className: "h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar/95 backdrop-blur z-50 transition-all duration-300 w-full flex-shrink-0", children: [
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 w-16 md:w-64", children: [
    /* @__PURE__ */ r.jsx(
      "button",
      {
        className: "p-2 -ml-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden",
        onClick: c,
        title: "菜单",
        children: /* @__PURE__ */ r.jsx(jg, { size: 20 })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ r.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ r.jsx(Qc, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ r.jsx(Qc, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ r.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ r.jsx("div", { className: "flex-1" }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
    /* @__PURE__ */ r.jsx(P3, { onNavigate: u }),
    /* @__PURE__ */ r.jsx("div", { className: "h-4 w-[1px] bg-border mx-1" }),
    /* @__PURE__ */ r.jsx(
      "button",
      {
        className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
        onClick: o,
        title: "关闭扩展",
        children: /* @__PURE__ */ r.jsx(ni, { size: 20 })
      }
    )
  ] })
] }), tp = ({ className: c = "", height: s = 24 }) => {
  const o = Math.round(s * 3.17);
  return /* @__PURE__ */ r.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "235 175 555 175",
      width: o,
      height: s,
      className: c,
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
}, Bs = {
  timeOut: 5e3,
  extendedTimeOut: 1e3,
  closeButton: !0,
  progressBar: !0
}, ga = class ga {
  constructor() {
  }
  static getInstance() {
    return ga.instance || (ga.instance = new ga()), ga.instance;
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
  success(s, o = "Engram", u = {}) {
    const f = this.getToastr();
    f ? f.success(s, o, { ...Bs, ...u }) : console.log(`[Engram] SUCCESS: ${o} - ${s}`), ae.info("Notification", `Success: ${s}`);
  }
  /**
   * 发送信息通知
   */
  info(s, o = "Engram", u = {}) {
    const f = this.getToastr();
    f ? f.info(s, o, { ...Bs, ...u }) : console.log(`[Engram] INFO: ${o} - ${s}`), ae.info("Notification", `Info: ${s}`);
  }
  /**
   * 发送警告通知
   */
  warning(s, o = "Engram", u = {}) {
    const f = this.getToastr();
    f ? f.warning(s, o, { ...Bs, ...u }) : console.warn(`[Engram] WARNING: ${o} - ${s}`), ae.warn("Notification", `Warning: ${s}`);
  }
  /**
   * 发送错误通知
   */
  error(s, o = "Engram", u = {}) {
    const f = this.getToastr();
    f ? f.error(s, o, { ...Bs, timeOut: 8e3, ...u }) : console.error(`[Engram] ERROR: ${o} - ${s}`), ae.error("Notification", `Error: ${s}`);
  }
  /**
   * 清除所有通知
   */
  clear() {
    const s = this.getToastr();
    s && s.clear();
  }
};
He(ga, "instance");
let Zc = ga;
const st = Zc.getInstance(), np = "0.2.1", ap = {
  version: np
}, ll = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
}, Hs = ap.version;
let ir = null, or = null;
function Uc(c, s) {
  const o = c.split(".").map(Number), u = s.split(".").map(Number);
  for (let f = 0; f < Math.max(o.length, u.length); f++) {
    const m = o[f] || 0, x = u[f] || 0;
    if (m > x) return 1;
    if (m < x) return -1;
  }
  return 0;
}
class ha {
  /**
   * 获取当前版本
   */
  static getCurrentVersion() {
    return Hs;
  }
  /**
   * 从 GitHub 获取最新版本号
   */
  static async getLatestVersion() {
    if (ir)
      return ir;
    try {
      const s = `https://raw.githubusercontent.com/${ll.owner}/${ll.repo}/${ll.branch}/manifest.json`, o = await fetch(s);
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
    return s ? Uc(s, Hs) > 0 : !1;
  }
  /**
   * 获取更新日志
   */
  static async getChangelog() {
    if (or)
      return or;
    try {
      const s = `https://raw.githubusercontent.com/${ll.owner}/${ll.repo}/${ll.branch}/CHANGELOG.md`, o = await fetch(s);
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
      return me.get("lastReadVersion") || "0.0.0";
    } catch {
      return "0.0.0";
    }
  }
  /**
   * 标记版本已读
   */
  static async markAsRead(s) {
    const o = s || await this.getLatestVersion() || Hs;
    try {
      me.set("lastReadVersion", o), console.debug("[Engram] UpdateService: 已标记版本已读", o);
    } catch (u) {
      console.error("[Engram] UpdateService: 标记已读失败", u);
    }
  }
  /**
   * 检查是否有未读更新
   */
  static async hasUnreadUpdate() {
    const s = await this.getLatestVersion();
    if (!s || Uc(s, Hs) <= 0)
      return !1;
    const o = this.getReadVersion();
    return Uc(s, o) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    ir = null, or = null;
  }
}
const lp = ({ isOpen: c, onClose: s }) => {
  const [o, u] = A.useState(!0), [f, m] = A.useState(null), [x, p] = A.useState(null), [g, v] = A.useState(!1), [y, b] = A.useState(!1), z = ha.getCurrentVersion();
  A.useEffect(() => {
    c && M();
  }, [c]);
  const M = async () => {
    u(!0);
    try {
      const [X, V, W] = await Promise.all([
        ha.getLatestVersion(),
        ha.getChangelog(),
        ha.hasUpdate()
      ]);
      m(X), p(V), v(W);
    } catch (X) {
      console.error("[Engram] 加载更新信息失败", X);
    } finally {
      u(!1);
    }
  }, _ = async () => {
    b(!0);
    try {
      const X = f || z;
      console.debug("[Engram] Marking update as read:", X), await ha.markAsRead(X), s();
    } finally {
      b(!1);
    }
  }, R = () => {
    ha.clearCache(), M();
  };
  return c ? /* @__PURE__ */ r.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
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
          /* @__PURE__ */ r.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ r.jsx(Qs, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("h2", { className: "text-base font-semibold text-foreground", children: "更新通知" }),
            /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "当前版本: v",
              z
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: R,
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
              children: /* @__PURE__ */ r.jsx(ni, { size: 16 })
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
          g ? /* @__PURE__ */ r.jsx(Qs, { size: 20, className: "text-primary" }) : /* @__PURE__ */ r.jsx(Wc, { size: 20, className: "text-green-500" }),
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
            disabled: y,
            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            children: y ? "处理中..." : "我知道了"
          }
        )
      ] })
    ] })
  ] }) : null;
}, H1 = [
  { id: "dashboard", label: "仪表盘", icon: gg },
  { id: "memory", label: "记忆流", icon: L4 },
  { id: "graph", label: "神经图谱", icon: dm },
  { id: "processing", label: "数据处理", icon: T4 },
  { id: "presets", label: "API 预设", icon: gr },
  { id: "devlog", label: "开发日志", icon: dl },
  { id: "settings", label: "系统设置", icon: au }
], rp = ({ children: c, activeTab: s, setActiveTab: o, onClose: u }) => {
  const [f, m] = A.useState(!1), [x, p] = A.useState(!1), [g, v] = A.useState(!1);
  return A.useEffect(() => {
    (async () => {
      try {
        const b = await ha.hasUnreadUpdate();
        v(b);
      } catch (b) {
        console.debug("[Engram] 检查更新失败", b);
      }
    })();
  }, []), /* @__PURE__ */ r.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary animate-in fade-in duration-300", id: "engram-layout-root", children: [
    /* @__PURE__ */ r.jsx(l3, {}),
    /* @__PURE__ */ r.jsx(
      lp,
      {
        isOpen: x,
        onClose: () => {
          p(!1), v(!1);
        }
      }
    ),
    /* @__PURE__ */ r.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50 animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both", style: { animationDelay: "100ms", animationFillMode: "both" }, children: [
      /* @__PURE__ */ r.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: H1.map((y) => {
        const b = y.icon, z = s === y.id;
        return /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: () => o(y.id),
            className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${z ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
            children: [
              /* @__PURE__ */ r.jsx(b, { size: 18, strokeWidth: z ? 2 : 1.5, className: "flex-shrink-0" }),
              /* @__PURE__ */ r.jsx("span", { className: `text-xs ${z ? "font-medium" : "font-normal"}`, children: y.label })
            ]
          },
          y.id
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
                /* @__PURE__ */ r.jsx(w4, { size: 16, strokeWidth: 1.5 }),
                g && /* @__PURE__ */ r.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ r.jsx("span", { className: "text-xs", children: "更新通知" }),
              g && /* @__PURE__ */ r.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("div", { className: "opacity-40 text-muted-foreground px-2", children: /* @__PURE__ */ r.jsx(tp, { height: 12 }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ r.jsx(
        ep,
        {
          onToggleSidebar: () => m(!f),
          isMobile: !1,
          onClose: u,
          onNavigate: (y) => o(y.replace("/", ""))
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
                        children: /* @__PURE__ */ r.jsx(ni, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsx("nav", { className: "space-y-4 flex-1 overflow-y-auto", children: H1.map((y) => {
                    const b = s === y.id;
                    return /* @__PURE__ */ r.jsxs(
                      "button",
                      {
                        onClick: () => {
                          o(y.id), m(!1);
                        },
                        className: `
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${b ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                            `,
                        children: [
                          /* @__PURE__ */ r.jsx(y.icon, { size: 22, className: b ? "text-primary" : "text-muted-foreground/70" }),
                          /* @__PURE__ */ r.jsx("span", { children: y.label })
                        ]
                      },
                      y.id
                    );
                  }) }),
                  /* @__PURE__ */ r.jsx("div", { className: "mt-auto pt-6 border-t border-border/20", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 px-2 text-xs text-muted-foreground/50", children: [
                    /* @__PURE__ */ r.jsx(Qc, { size: 14 }),
                    /* @__PURE__ */ r.jsx("span", { children: "Engram v0.1.0" })
                  ] }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ r.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background", children: /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth animate-blur-in fill-mode-both", style: { animationDelay: "200ms", animationFillMode: "both" }, children: /* @__PURE__ */ r.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: c }) }) })
    ] }),
    "  "
  ] });
}, Qt = {
  primary: "#FFFFFF",
  grid: "#111111"
}, sp = ({ onComplete: c }) => {
  const s = A.useRef(null), o = A.useRef(null), u = A.useRef(null), f = A.useRef(null), [m, x] = A.useState(!1);
  A.useEffect(() => {
    if (window.gsap) {
      x(!0);
      return;
    }
    const g = document.createElement("script");
    g.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", g.async = !0, g.onload = () => x(!0), document.body.appendChild(g);
  }, []);
  const p = () => {
    var M;
    if (!m || !o.current) return;
    const g = window.gsap, v = o.current, y = v.getTotalLength();
    g.set(v, {
      strokeDasharray: y,
      strokeDashoffset: y,
      stroke: Qt.primary,
      fillOpacity: 0,
      opacity: 1,
      strokeWidth: 2
    });
    const b = (M = u.current) == null ? void 0 : M.querySelectorAll("path");
    b && g.set(b, { opacity: 0, y: 10 }), g.set(f.current, { scale: 1, opacity: 1 }), g.set(s.current, { opacity: 1 });
    const z = g.timeline({
      onComplete: () => {
        g.to(s.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: c
        });
      }
    });
    z.to(v, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), b && z.to(b, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), z.to({}, { duration: 1 });
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
                /* @__PURE__ */ r.jsxs("g", { ref: u, children: [
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
}, Lc = ({
  title: c,
  value: s,
  icon: o,
  subtext: u,
  highlight: f = !1
}) => /* @__PURE__ */ r.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${f ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ r.jsx("div", { className: `p-2 rounded-lg ${f ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ r.jsx(o, { size: 20 }) }),
    f && /* @__PURE__ */ r.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: s }),
    /* @__PURE__ */ r.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: c }),
    u && /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: u })
  ] })
] });
function ba() {
  var c, s;
  try {
    return ((s = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : s.call(c)) || null;
  } catch (o) {
    return console.warn("[Engram] Failed to get ST context:", o), null;
  }
}
function ip() {
  const c = ba();
  return (c == null ? void 0 : c.chat) || [];
}
function op() {
  return ip();
}
function jm() {
  const c = ba();
  return c ? {
    name: c.name2,
    id: c.characterId
  } : null;
}
function Cm() {
  try {
    return window.selected_model || void 0;
  } catch {
    return;
  }
}
function cp() {
  return ba() !== null;
}
async function q1() {
  const { Logger: c } = await Promise.resolve().then(() => iu);
  await c.init(), c.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: s } = await Promise.resolve().then(() => Sm);
  s.initSettings(), c.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: u } = await Promise.resolve().then(() => Op), f = await u();
    c.info("TavernAPI", "酒馆接口对接状态", f);
  } catch (u) {
    c.warn("TavernAPI", "酒馆接口检查失败", { error: String(u) });
  }
  try {
    const { summarizerService: u } = await Promise.resolve().then(() => _t);
    u.start();
    const f = u.getStatus();
    c.info("Summarizer", "服务已启动", f);
  } catch (u) {
    c.warn("Summarizer", "服务启动失败", { error: String(u) });
  }
  up();
  const { ThemeManager: o } = await Promise.resolve().then(() => Vs);
  o.init(), hp();
  try {
    const { CharacterDeleteService: u } = await Promise.resolve().then(() => Ip);
    u.init(), c.info("STBridge", "CharacterDeleteService initialized");
  } catch (u) {
    c.warn("STBridge", "Failed to initialize CharacterDeleteService", { error: String(u) });
  }
  c.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const Nm = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function up() {
  const c = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!c) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), dp();
    return;
  }
  const o = document.createElement("div");
  o.id = "engram-drawer", o.className = "drawer";
  const u = document.createElement("div");
  u.className = "drawer-toggle drawer-header";
  const f = document.createElement("div");
  f.id = "engram-drawer-icon", f.className = "drawer-icon fa-fw closedIcon", f.title = "Engram - 记忆操作系统", f.setAttribute("data-i18n", "[title]Engram - Memory OS"), f.innerHTML = Nm, f.addEventListener("click", Js), u.appendChild(f), o.appendChild(u), s ? (c.insertBefore(o, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (c.appendChild(o), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function dp() {
  const c = document.createElement("div");
  c.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", c.title = "Engram - 记忆操作系统", c.innerHTML = Nm, c.addEventListener("click", Js), document.body.appendChild(c);
}
let Ks = null;
function fp(c) {
  Ks = c, Ks = c;
}
let Kc = null, G1 = null;
function mp(c) {
  Kc = c;
}
function hp() {
  if (!Kc) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const c = "engram-global-overlay";
  let s = document.getElementById(c);
  s || (s = document.createElement("div"), s.id = c, s.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(s)), G1 || (G1 = Kc(s, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let Bc = !1, cr = null, Xs = null;
function Js() {
  Bc && cr ? (Xs && (Xs.unmount(), Xs = null), cr.remove(), cr = null, Bc = !1) : (cr = gp(), document.body.appendChild(cr), Bc = !0);
}
function gp() {
  var s;
  const c = document.createElement("div");
  return c.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", c.style.backgroundColor = "var(--background)", c.style.color = "var(--foreground)", c.style.height = "100dvh", c.style.width = "100vw", c.style.top = "0", c.style.left = "0", c.id = "engram-panel-root", Ks ? Xs = Ks(c, Js) : (c.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = c.querySelector("button")) == null || s.addEventListener("click", Js)), c;
}
async function pp(c, s) {
  try {
    const u = await new Function("path", "return import(path)")("/scripts/chats.js");
    u && typeof u.hideChatMessageRange == "function" ? (await u.hideChatMessageRange(c, s, !1), console.log(`[Engram] Hidden messages range: ${c}-${s}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (o) {
    console.error("[Engram] Failed to hide messages:", o);
  }
}
async function xp(c, s = "text", o = "") {
  return window.callPopup ? window.callPopup(c, s, o) : (console.warn("[Engram] callPopup not available"), Promise.resolve(s === "confirm" ? !0 : null));
}
const bp = (c) => {
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
}, Y1 = ({ onNavigate: c }) => {
  const [s, o] = A.useState([]), [u, f] = A.useState(ba()), [m, x] = A.useState(0);
  A.useEffect(() => (o(ae.getLogs().slice(0, 3)), ae.subscribe((b) => {
    o((z) => [b, ...z].slice(0, 3));
  })), []), A.useEffect(() => {
    const y = setInterval(() => {
      x((b) => b + 1);
    }, 1e3);
    return () => clearInterval(y);
  }, []);
  const p = (y) => {
    const b = Math.floor(y / 3600), z = Math.floor(y % 3600 / 60), M = y % 60;
    return `${b.toString().padStart(2, "0")}:${z.toString().padStart(2, "0")}:${M.toString().padStart(2, "0")}`;
  }, g = (u == null ? void 0 : u.name2) || "Unknown", v = (y) => {
    c && c(y);
  };
  return /* @__PURE__ */ r.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ r.jsx(
        Lc,
        {
          title: "ACTIVE MODEL",
          value: u ? "Connected" : "Offline",
          subtext: u ? `Chatting with ${g}` : "Waiting for connection...",
          icon: mm,
          highlight: !!u
        }
      ),
      /* @__PURE__ */ r.jsx(
        Lc,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: gr
        }
      ),
      /* @__PURE__ */ r.jsx(
        Lc,
        {
          title: "SYSTEM UPTIME",
          value: p(m),
          subtext: "Session Duration",
          icon: Fc
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ r.jsx(lu, { size: 16 }),
        /* @__PURE__ */ r.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("memory"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("graph"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("processing"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ r.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("settings"), children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ r.jsx(dl, { size: 16 }),
        /* @__PURE__ */ r.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ r.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => v("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map((y) => /* @__PURE__ */ r.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${bp(y.level)}`, children: [
        /* @__PURE__ */ r.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(y.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ r.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: y.message })
      ] }, y.id)) })
    ] })
  ] }) });
}, yp = A.lazy(() => Promise.resolve().then(() => t5).then((c) => ({ default: c.GraphView }))), vp = A.lazy(() => Promise.resolve().then(() => h5).then((c) => ({ default: c.DevLog }))), Sp = A.lazy(() => Promise.resolve().then(() => B5).then((c) => ({ default: c.APIPresets }))), jp = A.lazy(() => Promise.resolve().then(() => G5).then((c) => ({ default: c.Settings }))), Cp = A.lazy(() => Promise.resolve().then(() => $5).then((c) => ({ default: c.MemoryStream }))), Np = A.lazy(() => Promise.resolve().then(() => F5).then((c) => ({ default: c.ProcessingView }))), Ep = () => /* @__PURE__ */ r.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ r.jsx("div", { className: "animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" }) }), Tp = ({ onClose: c }) => {
  const [s, o] = A.useState("dashboard"), [u, f] = A.useState(!1), [m, x] = A.useState(!1);
  A.useEffect(() => {
    const v = setTimeout(() => {
      const y = me.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", y), y || f(!0), x(!0);
    }, 1e3);
    return () => clearTimeout(v);
  }, []);
  const p = () => {
    me.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), f(!1);
  };
  if (!m)
    return null;
  const g = () => {
    const [v, y] = s.split(":");
    switch (v) {
      case "dashboard":
        return /* @__PURE__ */ r.jsx(Y1, { onNavigate: o });
      case "presets":
        return /* @__PURE__ */ r.jsx(Sp, { initialTab: y });
      case "graph":
        return /* @__PURE__ */ r.jsx(yp, {});
      case "devlog":
        return /* @__PURE__ */ r.jsx(vp, { initialTab: y });
      case "settings":
        return /* @__PURE__ */ r.jsx(jp, {});
      case "memory":
        return /* @__PURE__ */ r.jsx(Cp, {});
      case "processing":
        return /* @__PURE__ */ r.jsx(Np, { onNavigate: o });
      default:
        return /* @__PURE__ */ r.jsx(Y1, {});
    }
  };
  return (
    /* 首次安装欢迎动画 */
    /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      u && /* @__PURE__ */ r.jsx(sp, { onComplete: p }),
      /* @__PURE__ */ r.jsx(rp, { activeTab: s, setActiveTab: o, onClose: c, children: /* @__PURE__ */ r.jsx(A.Suspense, { fallback: /* @__PURE__ */ r.jsx(Ep, {}), children: g() }) })
    ] })
  );
};
var _p = am();
const wp = /* @__PURE__ */ ei(_p), $n = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function rl() {
  try {
    const c = window.SillyTavern;
    if (c != null && c.getContext) {
      const s = c.getContext();
      return (s == null ? void 0 : s.eventSource) || null;
    }
    return null;
  } catch {
    return console.warn("[Engram] EventBus: 无法获取 SillyTavern eventSource"), null;
  }
}
class ya {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, o) {
    const u = rl();
    return u && u.on(s, o), this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set()), this.listeners.get(s).add(o), () => {
      this.off(s, o);
    };
  }
  /**
   * 一次性订阅事件（触发后自动取消）
   * @param event 事件名称
   * @param callback 回调函数
   */
  static once(s, o) {
    const u = rl();
    if (u)
      u.once(s, o);
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
    const u = rl();
    u && u.removeListener(s, o), (f = this.listeners.get(s)) == null || f.delete(o);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(s, ...o) {
    const u = rl();
    u && u.emit(s, ...o);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = rl();
    for (const [o, u] of this.listeners)
      for (const f of u)
        s && s.removeListener(o, f);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return rl() !== null;
  }
}
He(ya, "listeners", /* @__PURE__ */ new Map());
const zp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: ya,
  TavernEventType: $n
}, Symbol.toStringTag, { value: "Module" }));
function kp(c, s) {
  let o = "assistant";
  return c.is_user ? o = "user" : c.is_system && (o = "system"), {
    id: s,
    role: o,
    content: c.mes || "",
    name: c.name || "",
    isHidden: c.is_hidden ?? !1,
    raw: c
  };
}
class Em {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const o = ba();
    if (!(o != null && o.chat))
      return [];
    let u = o.chat.map((f, m) => kp(f, m));
    if (s.includeHidden || (u = u.filter((f) => !f.isHidden)), s.role) {
      const f = Array.isArray(s.role) ? s.role : [s.role];
      u = u.filter((m) => f.includes(m.role));
    }
    return u;
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
  static getMessages(s, o, u = {}) {
    return this.getAllMessages(u).slice(s, o);
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
    const s = ba();
    return !(s != null && s.characters) || s.characterId < 0 ? null : ((o = s.characters[s.characterId]) == null ? void 0 : o.name) || null;
  }
  /**
   * 格式化消息为纯文本（用于传给 LLM）
   * @param messages 消息数组
   * @param format 格式化模板
   */
  static formatMessagesAsText(s, o = "simple") {
    return o === "simple" ? s.map((u) => `${u.name}: ${u.content}`).join(`

`) : s.map((u) => `[${u.role.toUpperCase()}] ${u.name}:
${u.content}`).join(`

---

`);
  }
  /**
   * 检查 MessageService 是否可用
   */
  static isAvailable() {
    return cp();
  }
}
const Ap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: Em
}, Symbol.toStringTag, { value: "Module" }));
async function $1(c) {
  try {
    const s = window.SillyTavern;
    if (s != null && s.getContext) {
      const o = s.getContext();
      if (o != null && o.getTokenCountAsync)
        return await o.getTokenCountAsync(c);
    }
    return Math.ceil(c.length / 4);
  } catch {
    return console.warn("[Engram] WorldInfoService: 无法使用酒馆 Token 计数，使用估算"), Math.ceil(c.length / 4);
  }
}
function gt() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
const fr = "engram总结";
class Ce {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(s) {
    return $1(s);
  }
  /**
   * 计算特定世界书中所有 Engram 总结条目的 Token 总和
   * 仅计算已启用的条目，使用关键词筛选
   * @param worldbookName 世界书名称
   */
  static async countSummaryTokens(s) {
    const u = (await this.getEntries(s)).filter(
      (x) => x.enabled && x.keys.includes(fr)
    );
    if (u.length === 0) return 0;
    const f = u.map((x) => x.content);
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
    const u = (await this.getEntries(s)).filter((m) => m.keys.includes(fr));
    return u.length === 0 ? "" : (u.sort((m, x) => m.order - x.order), u.map((m) => {
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
    return Promise.all(s.map((o) => $1(o)));
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
      const u = this.findExistingWorldbook();
      if (u)
        return console.debug("[Engram] WorldInfoService: 使用已绑定的世界书", u), u;
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
    } catch (u) {
      return console.error("[Engram] WorldInfoService: 获取/创建世界书失败", u), null;
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
        const m = f, x = m.strategy, p = m.position, g = m.recursion, v = [];
        if (x != null && x.keys && Array.isArray(x.keys))
          for (const y of x.keys)
            typeof y == "string" ? v.push(y) : y && typeof y == "object" && "source" in y && v.push(y.source);
        return {
          uid: m.uid || 0,
          name: m.name || "",
          content: m.content || "",
          enabled: m.enabled ?? !0,
          constant: (x == null ? void 0 : x.type) === "constant",
          keys: v,
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
    } catch (u) {
      return console.error("[Engram] WorldInfoService: 获取世界书条目失败", u), [];
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
      const u = await o.deleteWorldbook(s);
      return u && console.info("[Engram] WorldInfoService: 已删除世界书", s), u;
    } catch (u) {
      return console.error("[Engram] WorldInfoService: 删除世界书失败", u), !1;
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
      const u = gt();
      if (!(u != null && u.createWorldbookEntries))
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
      }), await u.createWorldbookEntries(s, [f]), console.info("[Engram] WorldInfoService: 条目已保存到世界书", s), !0;
    } catch (u) {
      return console.error("[Engram] WorldInfoService: 创建世界书条目失败", u), !1;
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
  static async updateEntry(s, o, u) {
    const f = gt();
    if (!(f != null && f.updateWorldbookWith))
      return console.warn("[Engram] WorldInfoService: TavernHelper.updateWorldbookWith 不可用"), !1;
    try {
      return await f.updateWorldbookWith(s, (m) => {
        var p;
        const x = m.findIndex((g) => g.uid === o);
        if (x !== -1) {
          const g = m[x];
          let v = g.disable;
          "enabled" in u && (v = !u.enabled);
          let y = g.strategy || { type: "selective", keys: [] };
          if ("constant" in u || "keys" in u) {
            const M = u.constant !== void 0 ? u.constant : y.type === "constant", _ = u.keys !== void 0 ? u.keys : y.keys || [];
            y = {
              ...y,
              type: M ? "constant" : "selective",
              keys: _
            };
          }
          let b = g.position || { type: "before_character_definition", order: 0, depth: 0 };
          (u.position || typeof u.order == "number" || typeof u.depth == "number") && (b = {
            ...b,
            type: (typeof u.position == "string" ? u.position : (p = u.position) == null ? void 0 : p.type) || b.type,
            order: u.order ?? b.order,
            depth: u.depth ?? b.depth
          });
          let z = g.recursion;
          u.recursion && (z = u.recursion), m[x] = {
            ...g,
            name: u.name ?? g.name,
            content: u.content ?? g.content,
            comment: u.name ?? g.comment,
            // 同步更新备注
            disable: v,
            strategy: y,
            position: b,
            recursion: z
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
    const u = gt();
    if (!(u != null && u.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      return await u.deleteWorldbookEntries(s, (f) => f.uid === o), console.debug("[Engram] WorldInfoService: 已删除条目", { worldbook: s, uid: o }), !0;
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
    const u = gt();
    if (!(u != null && u.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      const f = new Set(o);
      return await u.deleteWorldbookEntries(s, (m) => f.has(m.uid)), console.debug("[Engram] WorldInfoService: 已批量删除条目", { worldbook: s, count: o.length }), !0;
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
    const u = (await this.getEntries(s)).filter((f) => f.keys.includes(fr));
    return u.sort((f, m) => f.order - m.order), u;
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
    const u = (await this.getEntries(s)).map((m) => m.order).filter((m) => m >= 9e3 && m < 1e4);
    return u.length === 0 ? 9e3 : Math.max(...u) + 1;
  }
  /**
   * 根据 Key 或名称查找条目
   * @param worldbookName 世界书名称
   * @param key 关键词
   */
  static async findEntryByKey(s, o) {
    const u = await this.getEntries(s);
    let f = u.find((m) => m.keys.includes(o));
    return f || (f = u.find((m) => m.name === o || o === "__ENGRAM_STATE__" && m.name === "Engram System State")), f || null;
  }
  /**
   * 获取世界书的 Token 统计
   * @param worldbookName 世界书名称
   */
  static async getWorldbookTokenStats(s) {
    const o = await this.getEntries(s), u = await Promise.all(
      o.map(async (m) => ({
        name: m.name,
        tokens: await this.countTokens(m.content)
      }))
    );
    return {
      totalTokens: u.reduce((m, x) => m + x.tokens, 0),
      entryCount: o.length,
      entries: u
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
    var u, f, m;
    const { Logger: o } = await Promise.resolve().then(() => iu);
    try {
      const p = await new Function("path", "return import(path)")("/scripts/world-info.js"), g = p == null ? void 0 : p.getWorldInfoPrompt, v = p == null ? void 0 : p.getSortedEntries;
      if (typeof v == "function") {
        const Y = await v(), se = [...new Set((Y == null ? void 0 : Y.map((ce) => ce.world)) || [])], we = ((u = Y == null ? void 0 : Y.filter((ce) => ce.constant)) == null ? void 0 : u.length) || 0;
        o.info("WorldInfo", "getSortedEntries 诊断", {
          totalEntries: (Y == null ? void 0 : Y.length) || 0,
          worlds: se,
          constantCount: we,
          sampleEntry: Y != null && Y[0] ? {
            name: Y[0].name,
            world: Y[0].world,
            constant: Y[0].constant
          } : null
        });
      }
      if (typeof g != "function")
        return o.warn("WorldInfo", "getWorldInfoPrompt 不可用，回退到常驻条目"), this.getConstantWorldInfo();
      let y = s;
      if (!y || y.length === 0) {
        const Y = (m = (f = window.SillyTavern) == null ? void 0 : f.getContext) == null ? void 0 : m.call(f);
        Y != null && Y.chat && Array.isArray(Y.chat) && (y = Y.chat.map((se) => se.mes || "").reverse());
      }
      if (!y || y.length === 0)
        return o.warn("WorldInfo", "无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      o.debug("WorldInfo", "调用 getWorldInfoPrompt", {
        messageCount: y.length
      });
      const b = 1e6, z = p == null ? void 0 : p.checkWorldInfo;
      if (typeof z != "function")
        return o.error("WorldInfo", "checkWorldInfo 不可用"), this.getConstantWorldInfo();
      const M = await z(y, b, !0, {
        trigger: "normal"
      }), _ = M == null ? void 0 : M.allActivatedEntries, R = _ ? Array.from(_.values()) : [];
      o.info("WorldInfo", `扫描完成，共激活 ${R.length} 个条目`);
      const X = await this.loadFilteringState(), { disabledGlobalBooks: V, disabledEntries: W, globalWorldbooks: J, config: re } = X, ge = R.filter(
        (Y) => this.shouldIncludeEntry(Y, J, V, W, re)
      );
      return o.info("WorldInfo", "筛选结果", {
        total: R.length,
        kept: ge.length,
        filteredOut: R.length - ge.length,
        keptWorlds: [...new Set(ge.map((Y) => Y.world))]
      }), ge.sort((Y, se) => (Y.order || 0) - (se.order || 0)), ge.map((Y) => Y.content).filter(Boolean).join(`

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
    var y, b, z;
    const s = gt(), o = ((y = s == null ? void 0 : s.getGlobalWorldbookNames) == null ? void 0 : y.call(s)) || [], { SettingsManager: u } = await Promise.resolve().then(() => Sm), m = (b = u.getSettings().apiSettings) == null ? void 0 : b.worldbookConfig, x = (m == null ? void 0 : m.disabledWorldbooks) || [], { WorldBookStateService: p } = await Promise.resolve().then(() => km), g = (z = s == null ? void 0 : s.getCharWorldbookNames) == null ? void 0 : z.call(s, "current");
    let v = {};
    return g != null && g.primary && (v = (await p.loadState(g.primary)).disabledEntries || {}), {
      globalWorldbooks: o,
      disabledGlobalBooks: x,
      disabledEntries: v,
      config: m
    };
  }
  /**
   * 判断单个条目是否应该被包含
   * @private
   */
  static shouldIncludeEntry(s, o, u, f, m) {
    var x, p, g, v;
    if (((x = s.extra) == null ? void 0 : x.engram) === !0 || (p = s.world) != null && p.startsWith("[Engram]")) return !0;
    if (s.world && o.includes(s.world) && ((m == null ? void 0 : m.includeGlobal) === !1 || u.includes(s.world)))
      return !1;
    if (s.world && s.uid) {
      const y = f[s.world];
      if (y && y.includes(s.uid))
        return !1;
    }
    return !((g = s.world) != null && g.startsWith("格式") || (v = s.world) != null && v.startsWith("---"));
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
    let u = [];
    if (s.getCharWorldbookNames) {
      const p = s.getCharWorldbookNames("current");
      p && (u = [...p.additional || [], p.primary].filter(Boolean));
    }
    const f = Array.from(/* @__PURE__ */ new Set([...o, ...u])).sort(), m = {};
    for (const p of f)
      try {
        const g = await this.getEntries(p);
        m[p] = g.map((v) => {
          var y;
          return {
            uid: v.uid,
            name: v.name,
            // 传递真实名称
            keys: v.keys,
            constant: v.constant,
            // 传递常驻状态
            comment: v.comment || "",
            content: ((y = v.content) == null ? void 0 : y.substring(0, 50)) + "..."
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
      const o = await new Function("path", "return import(path)")("/scripts/world-info.js"), u = o == null ? void 0 : o.getSortedEntries;
      if (typeof u != "function")
        return "";
      const f = await u();
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
const Tm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUMMARY_ENTRY_KEY: fr,
  WorldInfoService: Ce,
  getTavernHelper: gt
}, Symbol.toStringTag, { value: "Module" }));
async function Mp() {
  const { EventBus: c } = await Promise.resolve().then(() => zp), { MessageService: s } = await Promise.resolve().then(() => Ap), { WorldInfoService: o } = await Promise.resolve().then(() => Tm);
  return {
    eventBus: c.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: o.isAvailable(),
    nativeTokenCount: await o.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: ya,
  MessageService: Em,
  TavernEventType: $n,
  WorldInfoService: Ce,
  checkTavernIntegration: Mp
}, Symbol.toStringTag, { value: "Module" })), Rp = () => {
  const [c, s] = A.useState(!1), [o, u] = A.useState(null), [f, m] = A.useState("");
  A.useEffect(() => {
    const g = ya.on(
      $n.ENGRAM_REQUEST_REVISION,
      (v) => {
        const y = v;
        u(y), m(y.content), s(!0);
      }
    );
    return () => {
      g();
    };
  }, []);
  const x = () => {
    o && (o.onConfirm(f), s(!1), u(null));
  }, p = () => {
    o && o.onCancel(), s(!1), u(null);
  };
  return c ? wp.createPortal(
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
                  children: /* @__PURE__ */ r.jsx(ni, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ r.jsx(Ig, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
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
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors",
                  children: "取消"
                }
              ),
              /* @__PURE__ */ r.jsxs(
                "button",
                {
                  onClick: x,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)] hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] focus:outline-none focus:ring-2 focus:ring-primary/50",
                  children: [
                    /* @__PURE__ */ r.jsx(om, { size: 16 }),
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
fp((c, s) => {
  const o = lm.createRoot(c);
  return o.render(nm.createElement(Tp, { onClose: s })), o;
});
mp((c) => {
  const s = lm.createRoot(c);
  return s.render(
    /* @__PURE__ */ r.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ r.jsx(Rp, {}) })
  ), s;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", q1) : q1();
const Dp = [
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
class _m {
  constructor(s) {
    He(this, "rules");
    this.rules = s || Dp;
  }
  /**
   * 清洗 LLM 输出文本
   * @param text 原始文本
   * @returns 清洗后的文本
   */
  clean(s) {
    let o = s;
    for (const u of this.rules)
      o = o.replace(u.pattern, u.replacement);
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
  truncate(s, o, u = "...") {
    return s.length <= o ? s : s.slice(0, o - u.length) + u;
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
const wm = new _m();
function V1() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class zm {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const o = V1();
    if (!(o != null && o.generateRaw) && !(o != null && o.generate))
      return {
        success: !1,
        content: "",
        error: "TavernHelper 不可用"
      };
    try {
      let u;
      if (o.generateRaw)
        u = await o.generateRaw({
          ordered_prompts: [
            { role: "system", content: s.systemPrompt },
            { role: "user", content: s.userPrompt }
          ]
          // 如果指定了预设 ID，可以在这里配置
          // custom_api: request.presetId ? await this.getPresetConfig(request.presetId) : undefined,
        });
      else if (o.generate)
        u = await o.generate({
          user_input: s.userPrompt,
          system_prompt: s.systemPrompt,
          should_stream: !1,
          max_chat_history: 0
        });
      else
        throw new Error("无可用的生成 API");
      return {
        success: !0,
        content: u || ""
      };
    } catch (u) {
      const f = u instanceof Error ? u.message : String(u);
      return console.error("[Engram] LLMAdapter 调用失败:", u), {
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
    const s = V1();
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
const ou = new zm(), X1 = [
  { value: "input", label: "输入", description: "清洗发给 LLM 的聊天内容" },
  { value: "output", label: "输出", description: "清洗 LLM 返回的内容（预览/写入前）" },
  { value: "both", label: "两者", description: "输入和输出都应用" }
], mr = [
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
class cu {
  constructor(s) {
    He(this, "rules", []);
    this.rules = s || [...mr];
  }
  /**
   * 应用所有启用的规则处理文本
   * @param text 要处理的文本
   * @param scope 可选，只应用特定作用域的规则
   */
  process(s, o) {
    let u = s;
    for (const f of this.rules)
      if (f.enabled && !(o && f.scope !== o && f.scope !== "both"))
        try {
          const m = new RegExp(f.pattern, f.flags);
          u = u.replace(m, f.replacement);
        } catch (m) {
          console.warn(`[RegexProcessor] 规则 "${f.name}" 执行失败:`, m);
        }
    return u;
  }
  /**
   * 使用指定规则处理文本（用于预览）
   */
  processWithRule(s, o) {
    try {
      const u = new RegExp(o.pattern, o.flags);
      return s.replace(u, o.replacement);
    } catch (u) {
      return console.warn("[RegexProcessor] 规则执行失败:", u), s;
    }
  }
  /**
   * 验证正则表达式是否有效
   */
  validatePattern(s, o) {
    try {
      return new RegExp(s, o), { valid: !0 };
    } catch (u) {
      return {
        valid: !1,
        error: u instanceof Error ? u.message : "无效的正则表达式"
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
    const u = this.rules.findIndex((f) => f.id === s);
    u >= 0 && (this.rules[u] = { ...this.rules[u], ...o });
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
    const o = this.rules.find((u) => u.id === s);
    o && (o.enabled = !o.enabled);
  }
  /**
   * 重置为默认规则
   */
  resetToDefaults() {
    this.rules = [...mr];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((s) => s.enabled).length;
  }
}
const Ws = new cu(), Q1 = 100;
class Up {
  constructor() {
    He(this, "entries", []);
    He(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * 创建新的日志条目（发送阶段）
   */
  logSend(s) {
    const o = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, u = {
      id: o,
      timestamp: Date.now(),
      type: s.type,
      direction: "sent",
      systemPrompt: s.systemPrompt,
      userPrompt: s.userPrompt,
      tokensSent: s.tokensSent,
      model: s.model,
      character: s.character,
      floorRange: s.floorRange,
      status: "pending"
    };
    return this.entries.unshift(u), this.trimEntries(), this.notifyListeners(), o;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(s, o) {
    const u = this.entries.find((x) => x.id === s);
    if (!u) return;
    const f = {
      id: `${s}_recv`,
      timestamp: Date.now(),
      type: u.type,
      direction: "received",
      response: o.response,
      tokensReceived: o.tokensReceived,
      status: o.status,
      error: o.error,
      duration: o.duration,
      model: u.model,
      character: u.character,
      floorRange: u.floorRange
    };
    u.status = o.status, u.duration = o.duration;
    const m = this.entries.findIndex((x) => x.id === s);
    m >= 0 ? this.entries.splice(m, 0, f) : this.entries.unshift(f), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(s, o) {
    const u = this.logSend(s), f = Date.now();
    try {
      const m = await o();
      return this.logReceive(u, {
        response: typeof m == "string" ? m : JSON.stringify(m),
        status: "success",
        duration: Date.now() - f
      }), m;
    } catch (m) {
      throw this.logReceive(u, {
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
    const s = [], o = this.entries.filter((u) => u.direction === "sent");
    for (const u of o) {
      const f = this.entries.find(
        (m) => m.id === `${u.id}_recv` && m.direction === "received"
      );
      s.push({ sent: u, received: f });
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
    this.entries.length > Q1 * 2 && (this.entries = this.entries.slice(0, Q1 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const Vn = new Up(), sl = "__ENGRAM_STATE__", qs = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  updatedAt: Date.now()
};
class pa {
  /**
   * 加载状态
   */
  static async loadState(s) {
    try {
      const o = await Ce.findEntryByKey(s, sl);
      if (!o)
        return { ...qs };
      try {
        const u = JSON.parse(o.content);
        return { ...qs, ...u };
      } catch (u) {
        return ae.warn("WorldBookStateService", "状态条目解析失败，重置状态", u), { ...qs };
      }
    } catch (o) {
      return ae.error("WorldBookStateService", "加载状态失败", o), { ...qs };
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
        (g) => g.name === "Engram System State" || g.keys.includes(sl)
      );
      if (p.length > 0) {
        p.sort((b, z) => {
          const M = b.keys.includes(sl) ? 1 : 0;
          return (z.keys.includes(sl) ? 1 : 0) - M;
        });
        const [g, ...v] = p;
        if (v.length > 0) {
          ae.warn("WorldBookStateService", `发现 ${v.length} 个重复的状态条目，正在清理...`);
          for (const b of v)
            await Ce.deleteEntry(s, b.uid);
        }
        ae.debug("WorldBookStateService", "更新并修复状态条目", { uid: g.uid, state: f });
        const y = {
          content: m,
          name: "Engram System State",
          enabled: !1,
          constant: !1,
          keys: [sl],
          recursion: {
            prevent_incoming: !0,
            prevent_outgoing: !0
          },
          position: "before_character_definition",
          order: 0
        };
        return await Ce.updateEntry(s, g.uid, y);
      } else {
        ae.debug("WorldBookStateService", "创建状态条目", { state: f });
        const g = {
          name: "Engram System State",
          content: m,
          keys: [sl],
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
    } catch (u) {
      return ae.error("WorldBookStateService", "保存状态失败", u), !1;
    }
  }
}
const km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldBookStateService: pa
}, Symbol.toStringTag, { value: "Module" }));
class Lp {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(s, o, u) {
    return new Promise((f, m) => {
      ya.emit($n.ENGRAM_REQUEST_REVISION, {
        title: s,
        description: o,
        content: u,
        onConfirm: (x) => f(x),
        onCancel: () => m(new Error("User cancelled revision"))
      });
    });
  }
}
const Am = new Lp(), Mm = {
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
}, Z1 = {
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
}, il = "engram", Bp = "engram总结";
function K1() {
  var c, s;
  try {
    return ((s = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : s.call(c)) || null;
  } catch {
    return null;
  }
}
function J1() {
  var c, s;
  try {
    const o = (s = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : s.call(c);
    return o != null && o.chat_metadata ? o.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function Hp() {
  var c;
  try {
    (c = window.saveChatDebounced) == null || c.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class Om {
  constructor(s, o, u) {
    He(this, "config");
    He(this, "textProcessor");
    He(this, "llmAdapter");
    He(this, "currentChatId", null);
    He(this, "isRunning", !1);
    He(this, "isSummarizing", !1);
    He(this, "unsubscribeMessage", null);
    He(this, "unsubscribeChat", null);
    He(this, "summaryHistory", []);
    // 缓存最后总结的楼层，用于同步读取
    He(this, "_lastSummarizedFloor", 0);
    const f = me.get("summarizerConfig");
    this.config = { ...Mm, ...f, ...s }, this.textProcessor = o || wm, this.llmAdapter = u || ou;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const o = J1();
    if (o)
      return o.extensions || (o.extensions = {}), o.extensions[il] || (o.extensions[il] = {}), o.extensions[il][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, o) {
    const u = J1();
    u && (u.extensions || (u.extensions = {}), u.extensions[il] || (u.extensions[il] = {}), u.extensions[il][s] = o, this.log("debug", `已保存到 chat_metadata: ${s} = ${o}`), Hp());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const s = Ce.findExistingWorldbook();
    if (!s) return this._lastSummarizedFloor;
    const o = await pa.loadState(s);
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
    await pa.saveState(o, {
      lastSummarizedFloor: s
    });
  }
  /**
  
      // ==================== 楼层计算 ====================
  
      /**
       * 获取当前真实楼层数
       */
  getCurrentFloor() {
    const s = K1();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = K1();
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
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = ya.on(
      $n.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${$n.MESSAGE_RECEIVED}`)), this.unsubscribeChat = ya.on(
      $n.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${$n.CHAT_CHANGED}`), this.isRunning = !0;
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
    const u = await this.getLastSummarizedFloor();
    this.log("info", "初始化当前聊天状态", {
      chatId: s,
      currentFloor: o,
      lastSummarizedFloor: u,
      pendingFloors: o - u
    });
  }
  // ==================== 事件处理 ====================
  /**
   * 处理消息接收事件
   */
  async handleMessageReceived() {
    const s = this.getCurrentFloor(), o = await this.getLastSummarizedFloor(), u = s - o;
    this.log("debug", "收到新消息", {
      currentFloor: s,
      lastSummarized: o,
      pendingFloors: u,
      triggerAt: this.config.floorInterval
    }), u >= this.config.floorInterval && (this.log("info", "达到触发条件，准备总结", {
      pendingFloors: u,
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
    var f, m;
    if (this.isSummarizing)
      return this.log("warn", "正在执行总结，跳过本次触发"), null;
    if (!this.config.enabled && !s)
      return this.log("debug", "自动总结已禁用"), null;
    const o = this.getCurrentFloor(), u = await this.getLastSummarizedFloor();
    this.isSummarizing = !0, this.log("info", "开始执行总结", {
      floorRange: [u + 1, o],
      manual: s
    });
    try {
      const x = this._lastSummarizedFloor + 1, p = this.config.bufferSize || 0, g = o - p;
      if (x > g)
        return s && st.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const v = this.config.floorInterval || 10, y = x + v - 1, b = Math.min(g, y);
      if (x > b)
        return null;
      const z = [x, b];
      this.log("info", "准备总结", { startFloor: x, endFloor: b, currentFloor: o, buffer: p });
      const _ = op().slice(x - 1, b);
      if (this.log("info", "提取消息范围", {
        range: z,
        msgCount: _.length,
        firstMsg: (((f = _[0]) == null ? void 0 : f.mes) || "").substring(0, 20)
      }), _.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: z }), null;
      const R = {
        messages: _.map((w) => {
          const Q = w.mes || w.content || w.message || "";
          return Q || console.warn("[Engram] Message content is empty/undefined:", w), {
            role: w.is_user ? "user" : "assistant",
            content: Q,
            name: w.name
          };
        }),
        floorRange: z,
        templateId: this.config.promptTemplateId || void 0
      }, X = _.map((w) => w.mes || w.content || w.message || "").join(`

`), V = Ws.process(X, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: X.length,
        cleanedLength: V.length
      });
      let W = "";
      try {
        const w = await Ce.getActivatedWorldInfo();
        w && (W = `【背景设定】
` + w + `

`, this.log("debug", "已加载世界书内容", { length: w.length }));
      } catch (w) {
        this.log("warn", "获取世界书失败", { error: String(w) });
      }
      const J = me.getEnabledPromptTemplate("text_summary"), re = (J == null ? void 0 : J.systemPrompt) || Z1.system, ge = (J == null ? void 0 : J.userPromptTemplate) || Z1.user;
      let $ = "";
      try {
        $ = await Ce.getEngramSummariesContent(), $ && this.log("debug", "已加载 Engram 摘要", { length: $.length });
      } catch (w) {
        this.log("warn", "获取 Engram 摘要失败", { error: String(w) });
      }
      const Y = ge.replace("{{worldbookContext}}", W).replace("{{chatHistory}}", V).replace("{{context}}", W).replace("{{engramSummaries}}", $);
      this.log("debug", "使用提示词模板", {
        source: J ? "APIPresets" : "fallback",
        templateName: (J == null ? void 0 : J.name) || "default"
      });
      const se = Vn.logSend({
        type: "summarize",
        systemPrompt: re,
        userPrompt: Y,
        floorRange: R.floorRange,
        model: Cm(),
        character: (m = jm()) == null ? void 0 : m.name
      }), we = Date.now(), ce = await this.llmAdapter.generate({
        systemPrompt: re,
        userPrompt: Y
      });
      if (Vn.logReceive(se, {
        response: ce.content,
        status: ce.success ? "success" : "error",
        error: ce.error,
        duration: Date.now() - we
      }), !ce.success)
        return this.log("error", "LLM 调用失败", { error: ce.error }), st.error(`总结失败: ${ce.error}`, "Engram 错误"), null;
      const B = this.textProcessor.clean(ce.content), te = Ws.process(B, "output"), be = await Ce.countTokens(te), he = {
        id: Date.now().toString(),
        content: te,
        sourceFloors: R.floorRange,
        timestamp: Date.now(),
        tokenCount: be,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: he });
        try {
          const w = await Am.requestRevision(
            "剧情摘要修订",
            `范围: ${R.floorRange[0]} - ${R.floorRange[1]} 楼 | Token: ${be}`,
            he.content
          );
          he.content = w, he.tokenCount = await Ce.countTokens(w), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), st.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const Ge = await this.writeToWorldbook(he);
      if (he.writtenToWorldbook = Ge, await this.setLastSummarizedFloor(R.floorRange[1]), this.summaryHistory.push(he), st.success(`已总结 ${R.floorRange[0]}-${R.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const w = R.floorRange[0] - 1, Q = R.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: w, endIndex: Q }), pp(w, Q).catch((ee) => {
          this.log("error", "自动隐藏失败", ee);
        });
      }
      return he;
    } catch (x) {
      const p = x instanceof Error ? x.message : String(x);
      return this.log("error", "总结执行异常", { error: p }), st.error(`总结异常: ${p}`, "Engram 错误"), null;
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
      const u = await Ce.getNextSummaryOrder(o), f = `{{// ${JSON.stringify({
        floors: s.sourceFloors,
        tokens: s.tokenCount,
        timestamp: s.timestamp
      })} }}`, m = `${s.content}

${f}`, x = await Ce.createEntry(o, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: m,
        keys: [Bp],
        // 添加关键词用于筛选
        enabled: !0,
        // 开启状态，让摘要能被激活进入上下文
        constant: !0,
        order: u
        // 使用计算出的递增顺序
      });
      if (x) {
        this.log("success", "已写入世界书", { worldbook: o, order: u });
        const p = await pa.loadState(o);
        await pa.saveState(o, {
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
    this.config = { ...this.config, ...s }, me.set("summarizerConfig", this.config), this.log("debug", "配置已更新并保存", this.config);
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
  async log(s, o, u) {
    try {
      const { Logger: f } = await Promise.resolve().then(() => iu);
      f[s]("Summarizer", o, u);
    } catch {
      console.log(`[Summarizer] ${s}: ${o}`, u);
    }
  }
}
const Rm = new Om(), qp = `<system_configuration>
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
`, Gp = `你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。
`, Yp = `你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。
`, $p = `你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。
`, Fs = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], Vp = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, Xp = {
  maxChatHistory: 10
}, Qp = {
  source: "transformers"
}, Zp = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function Dm(c = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: c,
    source: "tavern",
    parameters: { ...Vp },
    context: { ...Xp },
    isDefault: !0,
    createdAt: s,
    updatedAt: s
  };
}
function xa(c, s, o = {}) {
  const u = Date.now();
  return {
    id: `template_${u}_${Math.random().toString(36).slice(2, 8)}`,
    name: c,
    category: s,
    enabled: o.enabled ?? !1,
    isBuiltIn: o.isBuiltIn ?? !1,
    boundPresetId: o.boundPresetId ?? null,
    systemPrompt: o.systemPrompt ?? "",
    userPromptTemplate: o.userPromptTemplate ?? "",
    outputFormat: o.outputFormat ?? "plain",
    availableVariables: o.availableVariables ?? ["{{chatHistory}}", "{{context}}", "{{char}}", "{{user}}"],
    createdAt: u,
    updatedAt: u
  };
}
function Kp() {
  return [
    xa("纯文本剧情总结", "text_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: qp,
      userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
      outputFormat: "plain"
    }),
    xa("向量化剧情总结", "vector_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: Gp,
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
    xa("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: Yp,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请将以下多条剧情摘要合并精简：

{{engramSummaries}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    xa("查询增强", "query_enhance", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: $p,
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
const Jp = {
  enabled: !0,
  includeGlobal: !0,
  disabledWorldbooks: []
}, Wp = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  countLimit: 5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
};
function W1() {
  return {
    llmPresets: [Dm()],
    selectedPresetId: null,
    vectorConfig: { ...Qp },
    rerankConfig: { ...Zp },
    promptTemplates: Kp(),
    worldbookConfig: { ...Jp }
  };
}
const Is = {
  ...Wp,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
}, F1 = {
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
class Um {
  constructor(s, o) {
    He(this, "config");
    He(this, "llmAdapter");
    He(this, "isTrimming", !1);
    const u = me.get("trimmerConfig") || {};
    this.config = { ...Is, ...u, ...s }, this.llmAdapter = o || ou;
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
    const o = me.get("summarizerConfig") || {};
    me.set("summarizerConfig", {
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
    const o = await Ce.getSummaryEntries(s), u = Math.max(0, o.length - this.config.keepRecentCount), f = await this.getCurrentTriggerValue(s, o), m = this.getThreshold();
    return {
      triggered: this.config.enabled && f >= m,
      triggerType: this.config.trigger,
      currentValue: f,
      threshold: m,
      pendingEntryCount: u,
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
    const o = await Ce.getSummaryEntries(s), u = this.config.keepRecentCount;
    return o.length <= u ? [] : o.slice(0, o.length - u);
  }
  /**
   * 手动/自动触发精简
   */
  async triggerTrim(s = !1) {
    var f;
    if (this.isTrimming)
      return this.log("warn", "正在执行精简，跳过本次触发"), null;
    if (!this.config.enabled && !s)
      return this.log("debug", "精简功能已禁用"), null;
    const o = Ce.findExistingWorldbook();
    if (!o)
      return this.log("warn", "世界书未找到"), st.warning("未找到 Engram 世界书", "Engram"), null;
    const u = await this.getEntriesToMerge();
    if (u.length < 2)
      return s && st.info("待合并的条目不足 (需要至少 2 条)", "Engram"), null;
    this.isTrimming = !0, this.log("info", "开始执行精简", {
      entryCount: u.length,
      manual: s
    });
    try {
      const m = u.map(($) => Ce.parseFloorRangeFromName($.name)).filter(($) => $ !== null);
      if (m.length === 0)
        return this.log("error", "无法解析楼层范围"), null;
      const x = Math.min(...m.map(($) => $[0])), p = Math.max(...m.map(($) => $[1])), g = [x, p], v = u.map(($) => {
        const Y = Ce.parseFloorRangeFromName($.name), se = Y ? `【${Y[0]}-${Y[1]}楼】` : `【${$.name}】`, we = $.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
        return `${se}
${we}`;
      }).join(`

---

`), y = me.getEnabledPromptTemplate("trim"), b = (y == null ? void 0 : y.systemPrompt) || F1.system, M = ((y == null ? void 0 : y.userPromptTemplate) || F1.user).replace("{{engramSummaries}}", v).replace("{{context}}", v);
      this.log("debug", "使用提示词模板", {
        source: y ? "APIPresets" : "fallback",
        templateName: (y == null ? void 0 : y.name) || "default",
        inputLength: v.length
      });
      const _ = Vn.logSend({
        type: "trim",
        systemPrompt: b,
        userPrompt: M,
        floorRange: g,
        model: Cm(),
        character: (f = jm()) == null ? void 0 : f.name
      }), R = Date.now(), X = await this.llmAdapter.generate({
        systemPrompt: b,
        userPrompt: M
      });
      if (Vn.logReceive(_, {
        response: X.content,
        status: X.success ? "success" : "error",
        error: X.error,
        duration: Date.now() - R
      }), !X.success)
        return this.log("error", "LLM 调用失败", { error: X.error }), st.error(`精简失败: ${X.error}`, "Engram 错误"), null;
      const V = Ws.process(X.content, "output"), W = await Ce.countTokens(V), J = Math.min(...u.map(($) => $.order)), re = {
        content: V,
        tokenCount: W,
        sourceEntryIds: u.map(($) => $.uid),
        newFloorRange: g,
        newOrder: J
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: re });
        try {
          const $ = await Am.requestRevision(
            "精简摘要修订",
            `合并 ${u.length} 条 | 范围: ${g[0]}-${g[1]} 楼 | Token: ${W}`,
            re.content
          );
          re.content = $, re.tokenCount = await Ce.countTokens($), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了精简写入"), st.info("已取消精简操作", "操作取消"), null;
        }
      }
      return await this.writeCompactedEntry(o, re) ? (await this.removeOriginalEntries(o, re.sourceEntryIds), st.success(
        `已精简 ${u.length} 条摘要为 1 条 (${g[0]}-${g[1]} 楼)`,
        "Engram"
      ), re) : (this.log("error", "写入精简条目失败"), null);
    } catch (m) {
      const x = m instanceof Error ? m.message : String(m);
      return this.log("error", "精简执行异常", { error: x }), st.error(`精简异常: ${x}`, "Engram 错误"), null;
    } finally {
      this.isTrimming = !1;
    }
  }
  /**
   * 写入精简后的条目
   */
  async writeCompactedEntry(s, o) {
    try {
      const u = `{{// ${JSON.stringify({
        floors: o.newFloorRange,
        tokens: o.tokenCount,
        timestamp: Date.now(),
        layer: 2,
        // 标记为二层精简
        mergedFrom: o.sourceEntryIds.length
      })} }}`, f = `${o.content}

${u}`, m = await Ce.createEntry(s, {
        name: `剧情摘要_${o.newFloorRange[0]}-${o.newFloorRange[1]}`,
        content: f,
        keys: [fr],
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
    } catch (u) {
      return this.log("error", "写入精简条目失败", { error: String(u) }), !1;
    }
  }
  /**
   * 删除/禁用原始条目
   */
  async removeOriginalEntries(s, o) {
    if (this.config.preserveOriginal) {
      for (const u of o)
        await Ce.updateEntry(s, u, { enabled: !1 });
      this.log("info", "已禁用原始条目", { count: o.length });
    } else
      await Ce.deleteEntries(s, o) && this.log("info", "已删除原始条目", { count: o.length });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  log(s, o, u) {
    ae[s]("Trimmer", o, u);
  }
}
const Fp = new Um(), _t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: mr,
  DEFAULT_SUMMARIZER_CONFIG: Mm,
  DEFAULT_TRIMMER_CONFIG: Is,
  LLMAdapter: zm,
  RegexProcessor: cu,
  SummarizerService: Om,
  TextProcessor: _m,
  TrimmerService: Um,
  llmAdapter: ou,
  regexProcessor: Ws,
  summarizerService: Rm,
  textProcessor: wm,
  trimmerService: Fp
}, Symbol.toStringTag, { value: "Module" }));
class Lm {
  static init() {
    var s;
    if (!this.isInitialized)
      try {
        const o = ba();
        o != null && o.eventSource && ((s = o == null ? void 0 : o.event_types) != null && s.CHARACTER_DELETED) ? (o.eventSource.on(o.event_types.CHARACTER_DELETED, this.onCharacterDeleted.bind(this)), ae.info("CharacterDeleteService", "监听 CHARACTER_DELETED 事件成功"), this.isInitialized = !0) : ae.warn("CharacterDeleteService", "无法监听 CHARACTER_DELETED 事件: eventSource 或事件类型缺失");
      } catch (o) {
        ae.error("CharacterDeleteService", "初始化失败", o);
      }
  }
  static async onCharacterDeleted(s) {
    var b, z;
    const o = me.getSettings().linkedDeletion;
    if (!(o != null && o.enabled)) return;
    ae.debug("CharacterDeleteService", "检测到角色删除", s);
    const u = s.character, f = (u == null ? void 0 : u.name) || (u == null ? void 0 : u.avatar) || (u == null ? void 0 : u.ch_name) || ((b = u == null ? void 0 : u.data) == null ? void 0 : b.name);
    if (!f) {
      ae.warn("CharacterDeleteService", "无法获取已删除角色的名称");
      return;
    }
    const m = /* @__PURE__ */ new Set();
    m.add(`[Engram] ${f}`), m.add(`Engram_${f}`);
    const x = u.data || u, p = (z = x == null ? void 0 : x.extensions) == null ? void 0 : z.world;
    p && typeof p == "string" && (ae.debug("CharacterDeleteService", `从角色数据中发现绑定世界书: ${p}`), m.add(p));
    const g = await Ce.getWorldbookNames(), v = new Set(g), y = Array.from(m).filter((M) => {
      if (!v.has(M)) return !1;
      const _ = M.toLowerCase().includes("engram");
      return _ || ae.info("CharacterDeleteService", `跳过非 Engram 世界书: ${M}`), _;
    });
    if (y.length === 0) {
      ae.debug("CharacterDeleteService", `未找到角色 "${f}" 关联的 Engram 世界书`);
      return;
    }
    if (ae.info("CharacterDeleteService", `准备删除关联世界书: ${y.join(", ")}`), o.showConfirmation) {
      const M = `
                <div style="font-size: 0.9em;">
                    <h3>🧹 Engram 联动清理</h3>
                    <p>检测到角色 <b>${f}</b> 已被删除。</p>
                    <p>发现以下关联的 Engram 记忆库：</p>
                    <ul style="max-height: 100px; overflow-y: auto; background: var(--black50a); padding: 5px; border-radius: 4px; list-style: none; margin: 10px 0;">
                        ${y.map((R) => `<li style="padding: 2px 0;">• ${R}</li>`).join("")}
                    </ul>
                    <p>是否一并删除？</p>
                    <small style="opacity: 0.7;">这将永久删除这些记忆库及其包含的所有摘要。</small>
                </div>
            `;
      if (!await xp(M, "confirm")) {
        ae.info("CharacterDeleteService", "用户取消删除关联世界书");
        return;
      }
    }
    if (o.deleteWorldbook) {
      let M = 0;
      const _ = [];
      st.info("正在清理 Engram 记忆库...", "Engram");
      for (const R of y)
        try {
          await Ce.deleteWorldbook(R) ? (M++, ae.info("CharacterDeleteService", `已删除世界书: ${R}`)) : _.push(R);
        } catch (X) {
          ae.error("CharacterDeleteService", `删除世界书 ${R} 失败`, X), _.push(R);
        }
      M > 0 && st.success(`已清理 ${M} 个关联记忆库`, "Engram"), _.length > 0 && st.warning(`部分记忆库删除失败: ${_.join(", ")}`, "Engram");
    }
    o.deleteIndexedDB;
  }
}
He(Lm, "isInitialized", !1);
const Ip = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CharacterDeleteService: Lm
}, Symbol.toStringTag, { value: "Module" })), li = ({ title: c, subtitle: s, actions: o }) => /* @__PURE__ */ r.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: c }),
    s && /* @__PURE__ */ r.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: s })
  ] }),
  o && /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: o })
] }), I1 = ({
  icon: c,
  label: s,
  primary: o = !1,
  size: u = "md",
  className: f = "",
  ...m
}) => /* @__PURE__ */ r.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${u === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${o ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${f}
        `,
    ...m,
    children: [
      c && /* @__PURE__ */ r.jsx(c, { size: u === "sm" ? 14 : 16 }),
      s
    ]
  }
), Pp = () => {
  const [c] = A.useState([
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
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(tu, { size: 16 }) }),
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(vg, { size: 16 }) }),
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(au, { size: 16 }) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ r.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ r.jsx("defs", { children: /* @__PURE__ */ r.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ r.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((o, u) => {
        const f = c.find((b) => b.id === o.source), m = c.find((b) => b.id === o.target);
        if (!f || !m) return null;
        const x = f.x + 150 / 2, p = f.y + 60, g = m.x + 150 / 2, v = m.y, y = `M ${x} ${p} C ${x} ${p + 50}, ${g} ${v - 50}, ${g} ${v}`;
        return /* @__PURE__ */ r.jsx("g", { children: /* @__PURE__ */ r.jsx("path", { d: y, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, u);
      })
    ] }),
    c.map((o) => /* @__PURE__ */ r.jsxs(
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
              o.type === "input" && /* @__PURE__ */ r.jsx(dl, { size: 12, className: "text-blue-400" }),
              o.type === "process" && /* @__PURE__ */ r.jsx(Fc, { size: 12, className: "text-purple-400" }),
              o.type === "output" && /* @__PURE__ */ r.jsx(gr, { size: 12, className: "text-emerald-400" }),
              o.label
            ] })
          ] })
        ]
      },
      o.id
    ))
  ] });
}, e5 = () => /* @__PURE__ */ r.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ r.jsx(
    li,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ r.jsx(I1, { icon: eu, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ r.jsx(I1, { icon: au, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ r.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ r.jsx(Pp, {}) })
] }), t5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GraphView: e5
}, Symbol.toStringTag, { value: "Module" }));
function n5(c) {
  return new Date(c).toTimeString().slice(0, 8);
}
const a5 = {
  [Ue.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Ue.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Ue.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Ue.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Ue.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, l5 = ({ entry: c }) => {
  const [s, o] = A.useState(!1), u = c.data !== void 0, f = Zs[c.level], m = a5[c.level];
  return /* @__PURE__ */ r.jsxs("div", { className: "group", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: `
                    flex items-start gap-3 px-2 py-1 rounded-sm transition-colors
                    hover:bg-white/[0.02]
                    ${u ? "cursor-pointer" : ""}
                `,
        onClick: () => u && o(!s),
        children: [
          /* @__PURE__ */ r.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: u ? s ? /* @__PURE__ */ r.jsx(ul, { size: 12 }) : /* @__PURE__ */ r.jsx(Jc, { size: 12 }) : null }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: n5(c.timestamp) }),
          /* @__PURE__ */ r.jsx("span", { className: `
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${m.text} ${m.bg}
                `, children: f.label }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-500 shrink-0 text-[11px]", children: c.module }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-300 text-[11px] break-words flex-1 leading-relaxed", children: c.message })
        ]
      }
    ),
    s && u && /* @__PURE__ */ r.jsx("div", { className: "ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]", children: /* @__PURE__ */ r.jsx("pre", { className: "m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono", children: JSON.stringify(c.data, null, 2) }) })
  ] });
}, r5 = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  trim: { label: "修剪", color: "bg-yellow-500/20 text-yellow-500" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, s5 = ({ status: c }) => {
  switch (c) {
    case "pending":
      return /* @__PURE__ */ r.jsx(pr, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ r.jsx(Wc, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ r.jsx(ti, { size: 14, className: "text-red-400" });
  }
}, i5 = (c) => new Date(c).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), o5 = (c) => c === void 0 ? "-" : c < 1e3 ? `${c}ms` : `${(c / 1e3).toFixed(1)}s`, c5 = ({ sent: c, received: s }) => {
  const [o, u] = A.useState(!1), f = r5[c.type];
  return /* @__PURE__ */ r.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => u(!o),
        children: [
          o ? /* @__PURE__ */ r.jsx(ul, { size: 14 }) : /* @__PURE__ */ r.jsx(Jc, { size: 14 }),
          /* @__PURE__ */ r.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${f.color}`, children: f.label }),
          c.model && /* @__PURE__ */ r.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 truncate max-w-[100px]", title: `模型: ${c.model}`, children: c.model }),
          c.character && /* @__PURE__ */ r.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 truncate max-w-[80px]", title: `角色: ${c.character}`, children: c.character }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground", children: i5(c.timestamp) }),
          /* @__PURE__ */ r.jsx(s5, { status: (s == null ? void 0 : s.status) || c.status }),
          c.floorRange && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            c.floorRange[0],
            "-",
            c.floorRange[1]
          ] }),
          /* @__PURE__ */ r.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ r.jsx(J4, { size: 12 }),
            o5((s == null ? void 0 : s.duration) || c.duration)
          ] })
        ]
      }
    ),
    o && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ r.jsx($g, { size: 14 }),
          "发送",
          c.tokensSent && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            c.tokensSent,
            " tokens"
          ] })
        ] }),
        c.systemPrompt && /* @__PURE__ */ r.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ r.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: c.systemPrompt })
        ] }),
        c.userPrompt && /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ r.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: c.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ r.jsx(sm, { size: 14 }),
          "接收",
          (s == null ? void 0 : s.tokensReceived) && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            s.tokensReceived,
            " tokens"
          ] })
        ] }),
        (s == null ? void 0 : s.status) === "error" && s.error && /* @__PURE__ */ r.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: s.error }),
        (s == null ? void 0 : s.response) && /* @__PURE__ */ r.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: s.response }),
        !s && c.status === "pending" && /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ r.jsx(pr, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, u5 = () => {
  const [c, s] = A.useState(Vn.getPaired());
  return A.useEffect(() => Vn.subscribe(() => {
    s(Vn.getPaired());
  }), []), /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r.jsx(lu, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ r.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          c.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => Vn.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ r.jsx(fl, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: c.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ r.jsx(sm, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-3", children: c.map(({ sent: o, received: u }) => /* @__PURE__ */ r.jsx(c5, { sent: o, received: u }, o.id)) }) })
  ] });
}, Ps = ({ tabs: c, activeTab: s, onChange: o, sticky: u = !0, top: f = 0, className: m = "", actions: x }) => /* @__PURE__ */ r.jsxs(
  "div",
  {
    className: `
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${u ? "sticky z-20 pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 backdrop-blur bg-background/80" : "px-0"}
            ${m}
        `,
    style: u ? {
      top: f
    } : void 0,
    children: [
      /* @__PURE__ */ r.jsx("div", { className: "flex overflow-x-auto gap-2 pb-1 no-scrollbar", children: c.map((p) => /* @__PURE__ */ r.jsxs(
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
), d5 = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ r.jsx(dl, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ r.jsx(lu, { size: 14 }) }
], f5 = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], m5 = ({ initialTab: c }) => {
  const [s, o] = A.useState(c || "runtime"), [u, f] = A.useState([]), [m, x] = A.useState([]), [p, g] = A.useState(""), [v, y] = A.useState(-1), [b, z] = A.useState("ALL"), [M, _] = A.useState(!0), [R, X] = A.useState(!1), [V, W] = A.useState(!1), J = A.useRef(null);
  A.useEffect(() => {
    f(ae.getLogs());
    const $ = ae.subscribe((Y) => {
      f((se) => [...se, Y]);
    });
    return () => $();
  }, []), A.useEffect(() => {
    let $ = u;
    if (v !== -1 && ($ = $.filter((Y) => Y.level >= v)), b !== "ALL" && ($ = $.filter((Y) => Y.module.startsWith(b))), p.trim()) {
      const Y = p.toLowerCase();
      $ = $.filter(
        (se) => se.message.toLowerCase().includes(Y) || se.module.toLowerCase().includes(Y)
      );
    }
    x($);
  }, [u, v, b, p]), A.useEffect(() => {
    M && J.current && J.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [m, M]);
  const re = A.useCallback(async () => {
    await ae.clear(), f([]);
  }, []), ge = A.useCallback(() => {
    const $ = ae.exportToMarkdown(), Y = ae.getExportFilename(), se = new Blob([$], { type: "text/markdown" }), we = URL.createObjectURL(se), ce = document.createElement("a");
    ce.href = we, ce.download = Y, ce.click(), URL.revokeObjectURL(we), ae.success("DevLog", `日志已导出: ${Y}`);
  }, []);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ r.jsx(
      Ps,
      {
        tabs: d5,
        activeTab: s,
        onChange: ($) => o($),
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
              onClick: () => X(!R),
              children: [
                v === -1 ? "全部级别" : Zs[v].label,
                /* @__PURE__ */ r.jsx(ul, { size: 12 })
              ]
            }
          ),
          R && /* @__PURE__ */ r.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col", children: [
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  y(-1), X(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(Zs).map(([$, Y]) => /* @__PURE__ */ r.jsxs(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  y(Number($)), X(!1);
                },
                children: [
                  Y.icon,
                  " ",
                  Y.label
                ]
              },
              $
            ))
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => W(!V),
              children: [
                b,
                /* @__PURE__ */ r.jsx(ul, { size: 12 })
              ]
            }
          ),
          V && /* @__PURE__ */ r.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col", children: f5.map(($) => /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                z($), W(!1);
              },
              children: $
            },
            $
          )) })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ r.jsx(cl, { size: 12 }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: p,
              onChange: ($) => g($.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${M ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => _(!M),
              title: "自动滚动",
              children: /* @__PURE__ */ r.jsx(N4, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: re,
              title: "清空",
              children: /* @__PURE__ */ r.jsx(fl, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: ge,
              children: [
                /* @__PURE__ */ r.jsx(Qs, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: m.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ r.jsx(dl, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        m.map(($) => /* @__PURE__ */ r.jsx(l5, { entry: $ }, $.id)),
        /* @__PURE__ */ r.jsx("div", { ref: J })
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        u.length,
        " 条日志",
        m.length !== u.length && ` · ${m.length} 条匹配`
      ] })
    ] }),
    s === "model" && /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ r.jsx(u5, {}) })
  ] });
}, h5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DevLog: m5
}, Symbol.toStringTag, { value: "Module" })), g5 = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, p5 = ({
  icon: c,
  title: s,
  subtitle: o,
  meta: u,
  badges: f = [],
  selected: m = !1,
  disabled: x = !1,
  toggle: p,
  onClick: g,
  actions: v = [],
  className: y = "",
  compact: b = !1
}) => {
  const z = v.filter((_) => !_.hidden), M = !!p;
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${b ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${m ? "bg-accent/60" : "hover:bg-muted/40"}
                ${x ? "opacity-50 pointer-events-none" : ""}
                ${y}
            `,
      onClick: g,
      children: [
        (c || M) && /* @__PURE__ */ r.jsx("div", { className: "flex-shrink-0", children: M ? /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${p.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (_) => {
              _.stopPropagation(), p.onChange(!p.checked);
            },
            children: /* @__PURE__ */ r.jsx(nu, { size: 14 })
          }
        ) : /* @__PURE__ */ r.jsx("div", { className: `
                            w-7 h-7 flex items-center justify-center rounded-md transition-colors
                            ${m ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                        `, children: c }) }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ r.jsx("span", { className: `
                        text-sm font-medium truncate transition-colors
                        ${m ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                        ${p && !p.checked ? "line-through opacity-60" : ""}
                    `, children: s }),
            f.map((_, R) => /* @__PURE__ */ r.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${g5[_.color || "default"]}
                            `,
                children: _.text
              },
              R
            ))
          ] }),
          (o || u) && /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            o && /* @__PURE__ */ r.jsx("span", { className: "truncate", children: o }),
            u && /* @__PURE__ */ r.jsx("span", { className: "flex-shrink-0 font-mono", children: u })
          ] })
        ] }),
        m && !z.length && /* @__PURE__ */ r.jsx(om, { size: 14, className: "text-primary flex-shrink-0" }),
        z.length > 0 && /* @__PURE__ */ r.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${m ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: z.map((_, R) => /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `
                                p-1.5 rounded transition-colors
                                ${_.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                            `,
            onClick: (X) => {
              X.stopPropagation(), _.onClick(X);
            },
            title: _.title,
            children: _.icon
          },
          R
        )) })
      ]
    }
  );
}, x5 = ({
  preset: c,
  isSelected: s,
  onSelect: o,
  onEdit: u,
  onCopy: f,
  onDelete: m
}) => {
  var g;
  const x = c.source === "tavern" || c.source === "tavern_profile" ? mm : F4, p = c.source === "custom" ? ((g = c.custom) == null ? void 0 : g.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ r.jsx(
    p5,
    {
      icon: /* @__PURE__ */ r.jsx(x, { size: 14 }),
      title: c.name,
      subtitle: p,
      meta: `T:${c.parameters.temperature}`,
      badges: c.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: s,
      onClick: o,
      actions: [
        { icon: /* @__PURE__ */ r.jsx(zg, { size: 12 }), onClick: () => u(), title: "编辑" },
        { icon: /* @__PURE__ */ r.jsx(cm, { size: 12 }), onClick: () => f(), title: "复制" },
        { icon: /* @__PURE__ */ r.jsx(fl, { size: 12 }), onClick: () => m(), title: "删除", danger: !0, hidden: c.isDefault }
      ]
    }
  );
}, ur = ({
  checked: c,
  onChange: s,
  disabled: o = !1,
  className: u = "",
  id: f
}) => {
  const m = (x) => {
    o || (x.stopPropagation(), s(!c));
  };
  return /* @__PURE__ */ r.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      id: f,
      "aria-checked": c,
      onClick: m,
      disabled: o,
      className: `
                relative inline-flex h-3.5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-all duration-300 focus:outline-none
                ${c ? "bg-primary/20 border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)]" : "bg-black/20 border-border shadow-inner"}
                ${o ? "opacity-50 cursor-not-allowed" : ""}
                ${u}
            `,
      children: /* @__PURE__ */ r.jsx(
        "span",
        {
          className: `
                    pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full shadow-sm ring-0 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                    ${c ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary-foreground/20" : "bg-muted-foreground border border-transparent opacity-60"}
                `,
          style: { transform: c ? "translateX(24px)" : "translateX(2px)" }
        }
      )
    }
  );
}, wt = ({ title: c, description: s, children: o, className: u = "" }) => /* @__PURE__ */ r.jsxs("div", { className: `mb-8 ${u}`, children: [
  /* @__PURE__ */ r.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-primary", children: c }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground mt-1 break-words", children: s })
  ] }),
  /* @__PURE__ */ r.jsx("div", { className: "space-y-4", children: o })
] }), pt = ({
  label: c,
  description: s,
  error: o,
  required: u,
  className: f = "",
  value: m,
  onChange: x,
  placeholder: p,
  type: g = "text",
  disabled: v,
  multiline: y,
  rows: b = 3
}) => {
  const z = {
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
      c,
      u && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    y ? /* @__PURE__ */ r.jsx(
      "textarea",
      {
        value: m,
        onChange: (M) => x(M.target.value),
        placeholder: p,
        disabled: v,
        rows: b,
        style: z,
        className: "font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ) : /* @__PURE__ */ r.jsx(
      "input",
      {
        type: g,
        value: m,
        onChange: (M) => x(M.target.value),
        placeholder: p,
        disabled: v,
        style: z,
        className: "placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70 break-words", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, gn = ({
  label: c,
  description: s,
  error: o,
  required: u,
  className: f = "",
  value: m,
  onChange: x,
  min: p,
  max: g,
  step: v = 1,
  showSlider: y = !0,
  suffix: b
}) => {
  const z = {
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
  }, M = p !== void 0 && g !== void 0 ? Math.min(100, Math.max(0, (m - p) / (g - p) * 100)) : 0;
  return /* @__PURE__ */ r.jsxs("div", { className: `flex flex-col gap-2 ${f}`, children: [
    /* @__PURE__ */ r.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ r.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      c,
      u && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
      y && p !== void 0 && g !== void 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex-1 relative h-4 flex items-center group cursor-pointer", children: [
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
            style: { left: `${M}%`, transform: "translate(-50%, -50%)" }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            min: p,
            max: g,
            step: v,
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
          step: v,
          value: m,
          onChange: (_) => x(Number(_.target.value)),
          style: z,
          className: "focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }
      )
    ] }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70 break-words", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, pn = ({
  label: c,
  description: s,
  error: o,
  required: u,
  className: f = "",
  value: m,
  onChange: x,
  options: p,
  placeholder: g = "请选择...",
  disabled: v
}) => {
  const y = {
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
      c,
      u && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ r.jsxs(
        "select",
        {
          value: m,
          onChange: (b) => x(b.target.value),
          disabled: v,
          style: y,
          className: "disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors",
          children: [
            /* @__PURE__ */ r.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: g }),
            p.map((b) => /* @__PURE__ */ r.jsx("option", { value: b.value, className: "bg-popover text-foreground", children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ r.jsx(ul, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" })
    ] }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70 break-words", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, Xn = ({
  label: c,
  description: s,
  error: o,
  className: u = "",
  checked: f,
  onChange: m,
  disabled: x,
  compact: p
}) => /* @__PURE__ */ r.jsxs("div", { className: `flex items-start justify-between gap-4 ${p ? "py-0" : "py-1"} ${u} ${x ? "opacity-50 pointer-events-none" : ""}`, children: [
  c && /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ r.jsx(
      "label",
      {
        className: "text-xs text-foreground cursor-pointer block truncate",
        onClick: () => !x && m(!f),
        children: c
      }
    ),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5 break-words", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: o })
  ] }),
  /* @__PURE__ */ r.jsx(
    ur,
    {
      checked: f,
      onChange: m,
      disabled: x
    }
  )
] });
class xn {
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
    const { apiUrl: o, apiKey: u, timeout: f = this.DEFAULT_TIMEOUT } = s, m = o.replace(/\/+$/, ""), x = m.endsWith("/v1") ? `${m}/models` : `${m}/v1/models`;
    try {
      const p = new AbortController(), g = setTimeout(() => p.abort(), f), v = {
        "Content-Type": "application/json"
      };
      u && (v.Authorization = `Bearer ${u}`);
      const y = await fetch(x, {
        method: "GET",
        headers: v,
        signal: p.signal
      });
      if (clearTimeout(g), !y.ok)
        throw new Error(`HTTP ${y.status}: ${y.statusText}`);
      const b = await y.json(), z = (b.data || b || []).map((M) => ({
        id: M.id || M.model,
        name: M.name || M.id || M.model,
        owned_by: M.owned_by
      }));
      return ae.info("ModelService", `Fetched ${z.length} models from OpenAI API`), z.sort((M, _) => M.id.localeCompare(_.id));
    } catch (p) {
      throw p.name === "AbortError" ? ae.error("ModelService", "OpenAI API request timeout") : ae.error("ModelService", `OpenAI API error: ${p.message}`), p;
    }
  }
  /**
   * 获取 Ollama 模型列表
   */
  static async fetchOllamaModels(s) {
    const { apiUrl: o, timeout: u = this.DEFAULT_TIMEOUT } = s, m = `${o.replace(/\/+$/, "")}/api/tags`;
    try {
      const x = new AbortController(), p = setTimeout(() => x.abort(), u), g = await fetch(m, {
        method: "GET",
        signal: x.signal
      });
      if (clearTimeout(p), !g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const y = ((await g.json()).models || []).map((b) => ({
        id: b.name || b.model,
        name: b.name || b.model
      }));
      return ae.info("ModelService", `Fetched ${y.length} models from Ollama`), y;
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
    const { apiKey: o, timeout: u = this.DEFAULT_TIMEOUT } = s;
    if (!o)
      return ae.warn("ModelService", "Cohere API key required"), this.getPresetModels("cohere");
    try {
      const f = new AbortController(), m = setTimeout(() => f.abort(), u), x = await fetch("https://api.cohere.ai/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${o}`,
          "Content-Type": "application/json"
        },
        signal: f.signal
      });
      if (clearTimeout(m), !x.ok)
        throw new Error(`HTTP ${x.status}: ${x.statusText}`);
      const g = ((await x.json()).models || []).filter((v) => {
        var y;
        return (y = v.endpoints) == null ? void 0 : y.includes("embed");
      }).map((v) => ({
        id: v.name,
        name: v.name,
        contextLength: v.context_length
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
He(xn, "DEFAULT_TIMEOUT", 1e4);
const b5 = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], y5 = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function v5() {
  var c, s, o, u;
  try {
    const f = (o = (s = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : s.call(c)) == null ? void 0 : o.extensionSettings;
    return ((u = f == null ? void 0 : f.connectionManager) == null ? void 0 : u.profiles) || [];
  } catch (f) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", f), [];
  }
}
const S5 = ({
  preset: c,
  onChange: s,
  isNew: o = !1
}) => {
  var ge, $, Y, se, we, ce;
  const [u, f] = A.useState([]), [m, x] = A.useState(!1), [p, g] = A.useState([]), [v, y] = A.useState(!1), [b, z] = A.useState(null), M = () => {
    x(!0);
    try {
      const B = v5();
      f(B);
    } finally {
      x(!1);
    }
  }, _ = async () => {
    const { apiUrl: B, apiKey: te, apiSource: be } = c.custom || {};
    if (!B) {
      z("请先填写 API URL");
      return;
    }
    y(!0), z(null);
    try {
      let he = [];
      be === "ollama" ? he = await xn.fetchOllamaModels({ apiUrl: B }) : he = await xn.fetchOpenAIModels({ apiUrl: B, apiKey: te }), g(he), he.length === 0 && z("未找到可用模型");
    } catch (he) {
      z(he.message || "获取模型列表失败"), g([]);
    } finally {
      y(!1);
    }
  };
  A.useEffect(() => {
    M();
  }, []);
  const R = (B) => {
    s({ ...c, ...B, updatedAt: Date.now() });
  }, X = (B, te) => {
    R({
      parameters: { ...c.parameters, [B]: te }
    });
  }, V = (B, te) => {
    var be, he, Ge, w;
    R({
      custom: {
        apiUrl: ((be = c.custom) == null ? void 0 : be.apiUrl) || "",
        apiKey: ((he = c.custom) == null ? void 0 : he.apiKey) || "",
        model: ((Ge = c.custom) == null ? void 0 : Ge.model) || "",
        apiSource: ((w = c.custom) == null ? void 0 : w.apiSource) || "openai",
        [B]: te
      }
    });
  }, W = (B) => {
    const te = B;
    R({
      source: te,
      tavernProfileId: te === "tavern_profile" ? c.tavernProfileId : void 0
    }), te === "tavern_profile" && M();
  }, J = u.map((B) => ({
    value: B.id,
    label: `${B.name} (${B.api || "Unknown"} - ${B.model || "Unknown"})`
  })), re = u.find((B) => B.id === c.tavernProfileId);
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsxs(wt, { title: "基本信息", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "预设名称",
          value: c.name,
          onChange: (B) => R({ name: B }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "配置源",
          value: c.source,
          onChange: W,
          options: y5,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    c.source === "tavern_profile" && /* @__PURE__ */ r.jsxs(wt, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ r.jsx(
          pn,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: c.tavernProfileId || "",
            onChange: (B) => R({ tavernProfileId: B }),
            options: J,
            placeholder: m ? "加载中..." : "请选择配置文件",
            disabled: m || J.length === 0
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: M,
            disabled: m,
            title: "刷新配置列表",
            children: /* @__PURE__ */ r.jsx(Zt, { size: 16, className: m ? "animate-spin" : "" })
          }
        )
      ] }),
      J.length === 0 && !m && /* @__PURE__ */ r.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      re && /* @__PURE__ */ r.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: re.api || "-" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: re.model || "-" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: re.preset || "-" })
        ] })
      ] })
    ] }),
    c.source === "custom" && /* @__PURE__ */ r.jsxs(wt, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "API 类型",
          value: ((ge = c.custom) == null ? void 0 : ge.apiSource) || "openai",
          onChange: (B) => V("apiSource", B),
          options: b5
        }
      ),
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API URL",
          type: "url",
          value: (($ = c.custom) == null ? void 0 : $.apiUrl) || "",
          onChange: (B) => V("apiUrl", B),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API Key",
          type: "password",
          value: ((Y = c.custom) == null ? void 0 : Y.apiKey) || "",
          onChange: (B) => V("apiKey", B),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
          p.length > 0 ? /* @__PURE__ */ r.jsx(
            pn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((se = c.custom) == null ? void 0 : se.model) || "",
              onChange: (B) => V("model", B),
              options: p.map((B) => ({ value: B.id, label: B.name || B.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ r.jsx(
            pt,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((we = c.custom) == null ? void 0 : we.model) || "",
              onChange: (B) => V("model", B),
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
              disabled: v || !((ce = c.custom) != null && ce.apiUrl),
              title: "获取模型列表",
              children: v ? /* @__PURE__ */ r.jsx(pr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
            }
          )
        ] }),
        b && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: b }),
        p.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          p.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs(wt, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "温度 (Temperature)",
          value: c.parameters.temperature,
          onChange: (B) => X("temperature", B),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "Top-P",
          value: c.parameters.topP,
          onChange: (B) => X("topP", B),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "最大输出 Tokens",
          value: c.parameters.maxTokens,
          onChange: (B) => X("maxTokens", B),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "频率惩罚",
          value: c.parameters.frequencyPenalty,
          onChange: (B) => X("frequencyPenalty", B),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "存在惩罚",
          value: c.parameters.presencePenalty,
          onChange: (B) => X("presencePenalty", B),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] })
  ] });
}, j5 = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], P1 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, em = ["ollama", "vllm"], tm = ["openai", "cohere", "jina", "voyage"], C5 = ({
  config: c,
  onChange: s
}) => {
  var M;
  const o = (_) => {
    s({ ...c, ..._ });
  }, u = (_) => {
    o({
      source: _,
      model: P1[_],
      apiUrl: em.includes(_) ? c.apiUrl : void 0,
      apiKey: tm.includes(_) ? c.apiKey : void 0
    });
  }, f = em.includes(c.source), m = tm.includes(c.source), [x, p] = A.useState([]), [g, v] = A.useState(!1), [y, b] = A.useState(null), z = async () => {
    v(!0), b(null);
    try {
      let _ = [];
      const R = { apiUrl: c.apiUrl || "", apiKey: c.apiKey };
      switch (c.source) {
        case "ollama":
          if (!c.apiUrl) {
            b("请先填写 API URL");
            return;
          }
          _ = await xn.fetchOllamaModels(R);
          break;
        case "vllm":
          if (!c.apiUrl) {
            b("请先填写 API URL");
            return;
          }
          _ = await xn.fetchVLLMModels(R);
          break;
        case "openai":
        case "cohere":
        case "jina":
        case "voyage":
          _ = xn.getPresetModels(c.source);
          break;
        default:
          _ = [];
      }
      p(_), _.length === 0 && b("未找到可用模型");
    } catch (_) {
      b(_.message || "获取模型列表失败"), p([]);
    } finally {
      v(!1);
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsxs(wt, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "向量源",
          value: c.source,
          onChange: (_) => u(_),
          options: j5,
          description: "选择向量化服务提供商"
        }
      ),
      f && /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API URL",
          type: "url",
          value: c.apiUrl || "",
          onChange: (_) => o({ apiUrl: _ }),
          placeholder: c.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${c.source} 服务的 API 端点`
        }
      ),
      m && /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API Key",
          type: "password",
          value: c.apiKey || "",
          onChange: (_) => o({ apiKey: _ }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
          x.length > 0 ? /* @__PURE__ */ r.jsx(
            pn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: c.model || "",
              onChange: (_) => o({ model: _ }),
              options: x.map((_) => ({ value: _.id, label: _.name || _.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ r.jsx(
            pt,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: c.model || "",
              onChange: (_) => o({ model: _ }),
              placeholder: P1[c.source],
              description: "使用的向量化模型"
            }
          ),
          (f || m) && /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: z,
              disabled: g,
              title: "获取模型列表",
              children: g ? /* @__PURE__ */ r.jsx(pr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
            }
          )
        ] }),
        y && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: y }),
        x.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          x.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(wt, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ r.jsx(
      pt,
      {
        label: "向量维度",
        value: ((M = c.dimensions) == null ? void 0 : M.toString()) || "",
        onChange: (_) => {
          const R = parseInt(_, 10);
          o({ dimensions: isNaN(R) ? void 0 : R });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, N5 = ({
  config: c,
  onChange: s
}) => {
  const o = (y) => {
    s({ ...c, ...y });
  }, [u, f] = A.useState([]), [m, x] = A.useState(!1), [p, g] = A.useState(null), v = async () => {
    if (!c.url) {
      g("请先填写 API URL");
      return;
    }
    x(!0), g(null);
    try {
      const y = await xn.fetchOpenAIModels({
        apiUrl: c.url,
        apiKey: c.apiKey
      });
      y.length > 0 ? f(y) : f(xn.getCommonRerankModels());
    } catch {
      f(xn.getCommonRerankModels());
    } finally {
      x(!1);
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsx(wt, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ r.jsx(
      Xn,
      {
        label: "启用 Rerank",
        checked: c.enabled,
        onChange: (y) => o({ enabled: y }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    c.enabled && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs(wt, { title: "API 配置", children: [
        /* @__PURE__ */ r.jsx(
          pt,
          {
            label: "API URL",
            type: "url",
            value: c.url,
            onChange: (y) => o({ url: y }),
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
            value: c.apiKey,
            onChange: (y) => o({ apiKey: y }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
            u.length > 0 ? /* @__PURE__ */ r.jsx(
              pn,
              {
                className: "flex-1 !mb-0",
                label: "模型名称",
                value: c.model,
                onChange: (y) => o({ model: y }),
                options: u.map((y) => ({ value: y.id, label: y.name || y.id })),
                placeholder: "选择模型"
              }
            ) : /* @__PURE__ */ r.jsx(
              pt,
              {
                className: "flex-1 !mb-0",
                label: "模型名称",
                value: c.model,
                onChange: (y) => o({ model: y }),
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
                onClick: v,
                disabled: m,
                title: "获取模型列表",
                children: m ? /* @__PURE__ */ r.jsx(pr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
              }
            )
          ] }),
          p && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: p }),
          u.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "已加载 ",
            u.length,
            " 个模型"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs(wt, { title: "参数设置", children: [
        /* @__PURE__ */ r.jsx(
          gn,
          {
            label: "Top-N",
            value: c.topN,
            onChange: (y) => o({ topN: y }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ r.jsx(
          gn,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: c.hybridAlpha,
            onChange: (y) => o({ hybridAlpha: y }),
            min: 0,
            max: 1,
            step: 0.1,
            description: "0 = 纯向量检索评分，1 = 纯 Rerank 评分"
          }
        )
      ] })
    ] })
  ] });
};
function E5(c) {
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
function T5(c) {
  var s;
  return ((s = Fs.find((o) => o.value === c)) == null ? void 0 : s.label) || c;
}
const _5 = ({
  template: c,
  isSelected: s = !1,
  onSelect: o,
  onCopy: u,
  onDelete: f,
  onToggleEnabled: m,
  onImport: x
}) => {
  const p = A.useRef(null), g = (b) => {
    b.stopPropagation();
    const z = {
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
    }, M = new Blob([JSON.stringify(z, null, 2)], { type: "application/json" }), _ = URL.createObjectURL(M), R = document.createElement("a");
    R.href = _, R.download = `engram_template_${c.name.replace(/\s+/g, "_")}.json`, R.click(), URL.revokeObjectURL(_);
  }, v = (b) => {
    var z;
    b.stopPropagation(), (z = p.current) == null || z.click();
  }, y = (b) => {
    var _;
    const z = (_ = b.target.files) == null ? void 0 : _[0];
    if (!z || !x) return;
    const M = new FileReader();
    M.onload = (R) => {
      var X;
      try {
        const V = JSON.parse((X = R.target) == null ? void 0 : X.result);
        if (V.version && V.template) {
          const W = xa(
            V.template.name,
            V.template.category,
            {
              enabled: c.enabled,
              // 保持当前启用状态
              isBuiltIn: c.isBuiltIn,
              // 保持内置状态
              boundPresetId: V.template.boundPresetId,
              systemPrompt: V.template.systemPrompt,
              userPromptTemplate: V.template.userPromptTemplate,
              outputFormat: V.template.outputFormat,
              availableVariables: V.template.availableVariables
            }
          );
          W.id = c.id, x(W);
        }
      } catch (V) {
        console.error("导入失败:", V);
      }
    }, M.readAsText(z), p.current && (p.current.value = "");
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
                        ${c.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (b) => {
                b.stopPropagation(), m == null || m(!c.enabled);
              },
              children: /* @__PURE__ */ r.jsx(nu, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ r.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: c.name }),
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ r.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${E5(c.category)}`, children: T5(c.category) }),
                c.isBuiltIn && /* @__PURE__ */ r.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ r.jsx("span", { className: "truncate max-w-[120px]", children: c.boundPresetId ? `BOUND: ${c.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ r.jsx("span", { children: c.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${s || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: v, title: "Import", children: /* @__PURE__ */ r.jsx(e3, { size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: g, title: "Export", children: /* @__PURE__ */ r.jsx(Qs, { size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (b) => {
            b.stopPropagation(), u == null || u();
          }, title: "Copy", children: /* @__PURE__ */ r.jsx(cm, { size: 12 }) }),
          !c.isBuiltIn && /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (b) => {
            b.stopPropagation(), f == null || f();
          }, title: "Delete", children: /* @__PURE__ */ r.jsx(fl, { size: 12 }) })
        ] }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            ref: p,
            type: "file",
            accept: ".json",
            onChange: y,
            className: "hidden"
          }
        )
      ]
    }
  );
}, w5 = ({
  templates: c,
  selectedId: s,
  onSelect: o,
  onAdd: u,
  onUpdate: f,
  onDelete: m
}) => {
  const x = () => {
    const b = xa(
      `新模板 ${c.length + 1}`,
      "text_summary"
    );
    u(b), o(b);
  }, p = (b) => {
    const z = xa(
      `${b.name} (副本)`,
      b.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: b.boundPresetId,
        systemPrompt: b.systemPrompt,
        userPromptTemplate: b.userPromptTemplate,
        outputFormat: b.outputFormat,
        availableVariables: [...b.availableVariables]
      }
    );
    u(z);
  }, g = (b, z) => {
    z && c.filter((M) => M.category === b.category && M.id !== b.id && M.enabled).forEach((M) => f({ ...M, enabled: !1 })), f({ ...b, enabled: z });
  }, v = (b) => {
    f(b);
  }, y = Fs.map((b) => ({
    ...b,
    templates: c.filter((z) => z.category === b.value)
  })).filter((b) => b.templates.length > 0);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: x,
          children: /* @__PURE__ */ r.jsx(tu, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      y.map((b) => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          b.label,
          /* @__PURE__ */ r.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: b.templates.map((z) => /* @__PURE__ */ r.jsx(
          _5,
          {
            template: z,
            isSelected: s === z.id,
            onSelect: () => o(z),
            onCopy: () => p(z),
            onDelete: () => m(z),
            onToggleEnabled: (M) => g(z, M),
            onImport: v
          },
          z.id
        )) })
      ] }, b.value)),
      c.length === 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ r.jsx(Ic, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, z5 = [
  { name: "{{chatHistory}}", desc: "待处理的对话历史" },
  { name: "{{context}}", desc: "角色卡设定" },
  { name: "{{char}}", desc: "角色名" },
  { name: "{{user}}", desc: "用户名" },
  { name: "{{userInput}}", desc: "当前用户输入" },
  { name: "{{worldbookContext}}", desc: "世界书激活内容" },
  { name: "{{engramSummaries}}", desc: "Engram 所有摘要（用于精简）" }
], k5 = ({
  template: c,
  llmPresets: s,
  defaultPresetId: o,
  onChange: u
}) => {
  var x, p;
  const f = [
    { value: "", label: "使用默认预设" + (o ? ` (${((x = s.find((g) => g.id === o)) == null ? void 0 : x.name) || o})` : "") },
    ...s.map((g) => ({ value: g.id, label: g.name }))
  ], m = (g) => {
    u({ ...c, ...g, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ r.jsxs(wt, { title: "基本信息", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "模板名称",
          value: c.name,
          onChange: (g) => m({ name: g }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: c.isBuiltIn
        }
      ),
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "模板分类",
          value: c.category,
          onChange: (g) => m({ category: g }),
          options: Fs.map((g) => ({ value: g.value, label: g.label })),
          description: (p = Fs.find((g) => g.value === c.category)) == null ? void 0 : p.description
        }
      ),
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "模型来源",
          value: c.boundPresetId || "",
          onChange: (g) => m({ boundPresetId: g || null }),
          options: f,
          description: "选择用于此模板的 LLM 预设"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs(wt, { title: "提示词内容", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "系统提示词",
          value: c.systemPrompt,
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
          value: c.userPromptTemplate,
          onChange: (g) => m({ userPromptTemplate: g }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用宏" }),
      /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: z5.map((g) => /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ r.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap", children: g.name }),
        /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground", children: g.desc })
      ] }, g.name)) })
    ] })
  ] });
}, A5 = ({
  rules: c,
  selectedId: s,
  onSelect: o,
  onToggle: u,
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
          children: /* @__PURE__ */ r.jsx(fm, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1", children: [
    c.map((p) => /* @__PURE__ */ r.jsxs(
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
                g.stopPropagation(), u(p.id);
              },
              title: p.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ r.jsx(nu, { size: 14 })
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
              children: /* @__PURE__ */ r.jsx(fl, { size: 12 })
            }
          ) })
        ]
      },
      p.id
    )),
    c.length === 0 && /* @__PURE__ */ r.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), M5 = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], O5 = ({ rule: c, onChange: s }) => {
  var y;
  const [o, u] = A.useState(""), [f, m] = A.useState(""), [x, p] = A.useState({ valid: !0 }), g = new cu();
  A.useEffect(() => {
    const b = g.validatePattern(c.pattern, c.flags);
    p(b);
  }, [c.pattern, c.flags]), A.useEffect(() => {
    if (o && x.valid) {
      const b = g.processWithRule(o, c);
      m(b);
    } else
      m("");
  }, [o, c, x.valid]);
  const v = (b) => {
    const z = c.flags.split(""), M = z.indexOf(b);
    M >= 0 ? z.splice(M, 1) : z.push(b), s({ flags: z.join("") });
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
            value: c.name,
            onChange: (b) => s({ name: b.target.value }),
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
            value: c.description || "",
            onChange: (b) => s({ description: b.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: X1.map((b) => /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${c.scope === b.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => s({ scope: b.value }),
            title: b.description,
            children: b.label
          },
          b.value
        )) }),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground", children: (y = X1.find((b) => b.value === c.scope)) == null ? void 0 : y.description })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          x.valid ? /* @__PURE__ */ r.jsx(Wc, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ r.jsx(ti, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${x.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: c.pattern,
            onChange: (b) => s({ pattern: b.target.value }),
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
            value: c.replacement,
            onChange: (b) => s({ replacement: b.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-wrap gap-2", children: M5.map((b) => /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${c.flags.includes(b.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => v(b.value),
            title: b.description,
            children: [
              b.label,
              " (",
              b.value,
              ")"
            ]
          },
          b.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ r.jsx(eu, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ r.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: o,
            onChange: (b) => u(b.target.value),
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
      /* @__PURE__ */ r.jsx(dg, { size: 16, className: "shrink-0 mt-0.5" }),
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
}, R5 = ({
  config: c,
  onChange: s,
  worldbookStructure: o = {},
  disabledEntries: u = {},
  onToggleWorldbook: f,
  onToggleEntry: m,
  onRefresh: x
}) => {
  const [p, g] = A.useState(/* @__PURE__ */ new Set()), [v, y] = A.useState(""), b = (V) => {
    s({
      ...c,
      [V]: !c[V]
    });
  }, z = (V) => {
    const W = new Set(p);
    W.has(V) ? W.delete(V) : W.add(V), g(W);
  }, M = (V) => {
    var W;
    return ((W = c.disabledWorldbooks) == null ? void 0 : W.includes(V)) || !1;
  }, _ = (V, W) => {
    var J;
    return ((J = u[V]) == null ? void 0 : J.includes(W)) || !1;
  }, X = Object.keys(o).sort().filter(
    (V) => V.toLowerCase().includes(v.toLowerCase()) || o[V].some(
      (W) => {
        var J, re;
        return ((J = W.names) == null ? void 0 : J.join(" ").toLowerCase().includes(v.toLowerCase())) || ((re = W.comment) == null ? void 0 : re.toLowerCase().includes(v.toLowerCase()));
      }
    )
  );
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ r.jsxs(wt, { title: "基础设置", description: "控制世界书功能的全局开关", children: [
      /* @__PURE__ */ r.jsx(
        Xn,
        {
          label: "启用世界书增强",
          description: "是否在生成摘要时注入世界书内容",
          checked: c.enabled,
          onChange: () => b("enabled")
        }
      ),
      /* @__PURE__ */ r.jsx(
        Xn,
        {
          label: "包含全局世界书",
          description: "是否引入全局世界书（相当于 全选/全不选 全局世界书）",
          checked: c.includeGlobal,
          onChange: () => b("includeGlobal"),
          disabled: !c.enabled
        }
      )
    ] }),
    c.enabled && /* @__PURE__ */ r.jsxs(wt, { title: "世界书管理", description: "精细控制每个世界书及其条目的启用状态", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mb-4 gap-4", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ r.jsx(cl, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索世界书或条目...",
              className: "w-full h-9 pl-9 pr-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              value: v,
              onChange: (V) => y(V.target.value)
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
      /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-2", children: X.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border border-dashed rounded-lg", children: [
        /* @__PURE__ */ r.jsx(ti, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ r.jsx("span", { className: "text-sm", children: "未找到匹配的世界书" })
      ] }) : X.map((V) => {
        const W = M(V), J = o[V] || [], re = p.has(V), ge = J.filter(($) => !_(V, $.uid)).length;
        return /* @__PURE__ */ r.jsxs("div", { className: `transition-all border-b border-border last:border-0 ${W ? "bg-muted/10 opacity-60 grayscale" : ""}`, children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 flex-1 overflow-hidden", children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  onClick: () => z(V),
                  className: "p-1 hover:bg-accent rounded-sm transition-colors",
                  children: re ? /* @__PURE__ */ r.jsx(ul, { size: 16 }) : /* @__PURE__ */ r.jsx(Jc, { size: 16 })
                }
              ),
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ r.jsx(M4, { size: 16, className: W ? "text-muted-foreground" : "text-primary" }),
                /* @__PURE__ */ r.jsx("span", { className: `font-medium truncate ${W ? "text-muted-foreground line-through" : ""}`, children: V }),
                /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full whitespace-nowrap", children: [
                  ge,
                  " / ",
                  J.length,
                  " 激活"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ r.jsx(
              Xn,
              {
                label: "",
                checked: !W,
                onChange: ($) => f == null ? void 0 : f(V, !$),
                compact: !0
              }
            ) })
          ] }),
          re && !W && /* @__PURE__ */ r.jsx("div", { className: "pl-4 pr-1 py-1 flex flex-col gap-0 animate-in slide-in-from-top-1 duration-200", children: J.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground text-center py-4", children: "暂无条目" }) : J.map(($) => {
            const Y = _(V, $.uid);
            return /* @__PURE__ */ r.jsxs("div", { className: `flex items-start justify-between py-2 -mx-2 px-2 rounded hover:bg-accent/40 transition-colors group ${Y ? "bg-muted/10 opacity-60 grayscale" : ""}`, children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1 min-w-0 flex-1 pr-4", children: [
                /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 flex-wrap min-w-0", children: [
                  /* @__PURE__ */ r.jsx(
                    "div",
                    {
                      className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${$.constant ? "bg-primary" : "bg-emerald-500"}`,
                      title: $.constant ? "常驻 (Constant)" : "条件触发 (Selective)"
                    }
                  ),
                  /* @__PURE__ */ r.jsx("span", { className: `text-sm font-medium truncate max-w-full ${Y ? "text-muted-foreground line-through" : "text-foreground"}`, children: $.name || `条目 #${$.uid}` }),
                  ($.keys || []).length > 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 ml-auto md:ml-2 overflow-hidden max-w-full", children: [
                    $.keys.slice(0, 3).map((se, we) => /* @__PURE__ */ r.jsx("span", { className: "text-[10px] px-1 py-0.5 rounded border border-border bg-muted/20 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]", children: se }, we)),
                    $.keys.length > 3 && /* @__PURE__ */ r.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "+",
                      $.keys.length - 3
                    ] })
                  ] })
                ] }),
                ($.comment || $.content) && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground/80 pl-3.5 break-words line-clamp-2", children: $.comment || $.content })
              ] }),
              /* @__PURE__ */ r.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ r.jsx(
                Xn,
                {
                  label: "",
                  checked: !Y,
                  onChange: (se) => m == null ? void 0 : m(V, $.uid, !se),
                  compact: !0
                }
              ) })
            ] }, $.uid);
          }) })
        ] }, V);
      }) })
    ] })
  ] });
};
function D5() {
  const [c, s] = A.useState(W1), [o, u] = A.useState(null), [f, m] = A.useState(null), [x, p] = A.useState(!1), [g, v] = A.useState([...mr]), [y, b] = A.useState(null), [z, M] = A.useState({}), [_, R] = A.useState({}), [X, V] = A.useState(null), W = A.useCallback(async () => {
    var oe;
    const D = await Ce.getWorldbookStructure();
    M(D);
    const G = gt(), Z = (oe = G == null ? void 0 : G.getCharWorldbookNames) == null ? void 0 : oe.call(G, "current");
    if (Z != null && Z.primary) {
      V(Z.primary);
      const Re = await pa.loadState(Z.primary);
      Re.disabledEntries && R(Re.disabledEntries);
    }
  }, []);
  A.useEffect(() => {
    W();
  }, [W]), A.useEffect(() => {
    var Z;
    const D = me.get("apiSettings");
    if (D) {
      const oe = W1(), Re = {
        ...oe,
        ...D,
        // 合并预设：保留用户预设，确保至少有一个默认
        llmPresets: ((Z = D.llmPresets) == null ? void 0 : Z.length) > 0 ? D.llmPresets : oe.llmPresets,
        // 合并模板：内置模板 + 用户自定义模板
        promptTemplates: [
          ...oe.promptTemplates.filter((Te) => Te.isBuiltIn),
          ...(D.promptTemplates || []).filter((Te) => !Te.isBuiltIn)
        ]
      };
      s(Re);
    }
    const G = me.getRegexRules();
    G && G.length > 0 && v(G);
  }, []);
  const J = A.useCallback((D) => {
    s((G) => ({ ...G, selectedPresetId: D.id })), u(D);
  }, []), re = A.useCallback(() => {
    const D = Dm(`预设 ${c.llmPresets.length + 1}`);
    D.isDefault = !1, s((G) => ({
      ...G,
      llmPresets: [...G.llmPresets, D],
      selectedPresetId: D.id
    })), u(D), p(!0);
  }, [c.llmPresets.length]), ge = A.useCallback((D) => {
    s((G) => ({
      ...G,
      llmPresets: G.llmPresets.map((Z) => Z.id === D.id ? D : Z)
    })), u(D), p(!0);
  }, []), $ = A.useCallback((D) => {
    const G = {
      ...D,
      id: `preset_${Date.now()}`,
      name: `${D.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((Z) => ({ ...Z, llmPresets: [...Z.llmPresets, G] })), p(!0);
  }, []), Y = A.useCallback((D) => {
    D.isDefault || (s((G) => ({
      ...G,
      llmPresets: G.llmPresets.filter((Z) => Z.id !== D.id),
      selectedPresetId: G.selectedPresetId === D.id ? null : G.selectedPresetId
    })), u((G) => (G == null ? void 0 : G.id) === D.id ? null : G), p(!0));
  }, []), se = A.useCallback((D) => {
    m(D);
  }, []), we = A.useCallback((D) => {
    s((G) => ({
      ...G,
      promptTemplates: [...G.promptTemplates, D]
    })), p(!0);
  }, []), ce = A.useCallback((D) => {
    s((G) => ({
      ...G,
      promptTemplates: G.promptTemplates.map((Z) => Z.id === D.id ? D : Z)
    })), m(D), p(!0);
  }, []), B = A.useCallback((D) => {
    D.isBuiltIn || (s((G) => ({
      ...G,
      promptTemplates: G.promptTemplates.filter((Z) => Z.id !== D.id)
    })), m((G) => (G == null ? void 0 : G.id) === D.id ? null : G), p(!0));
  }, []), te = A.useCallback((D) => {
    s((G) => ({ ...G, vectorConfig: D })), p(!0);
  }, []), be = A.useCallback((D) => {
    s((G) => ({ ...G, rerankConfig: D })), p(!0);
  }, []), he = A.useCallback((D) => {
    s((G) => ({ ...G, worldbookConfig: D })), p(!0);
  }, []), Ge = A.useCallback((D, G) => {
    s((Z) => {
      const oe = Z.worldbookConfig.disabledWorldbooks || [];
      let Re;
      return G ? Re = [.../* @__PURE__ */ new Set([...oe, D])] : Re = oe.filter((Te) => Te !== D), {
        ...Z,
        worldbookConfig: {
          ...Z.worldbookConfig,
          disabledWorldbooks: Re
        }
      };
    }), p(!0);
  }, []), w = A.useCallback((D, G, Z) => {
    R((oe) => {
      const Re = oe[D] || [];
      let Te;
      return Z ? Te = [.../* @__PURE__ */ new Set([...Re, G])] : Te = Re.filter((Zn) => Zn !== G), {
        ...oe,
        [D]: Te
      };
    }), p(!0);
  }, []), Q = A.useCallback((D) => {
    const G = g.find((Z) => Z.id === D);
    b(G || null);
  }, [g]), ee = A.useCallback(() => {
    const D = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    v((G) => [...G, D]), b(D), p(!0);
  }, []), ie = A.useCallback((D) => {
    if (!y) return;
    const G = { ...y, ...D };
    b(G), v((Z) => Z.map((oe) => oe.id === G.id ? G : oe)), p(!0);
  }, [y]), je = A.useCallback((D) => {
    v((G) => G.map(
      (Z) => Z.id === D ? { ...Z, enabled: !Z.enabled } : Z
    )), p(!0);
  }, []), C = A.useCallback((D) => {
    v((G) => G.filter((Z) => Z.id !== D)), b((G) => (G == null ? void 0 : G.id) === D ? null : G), p(!0);
  }, []), H = A.useCallback(() => {
    v([...mr]), b(null), p(!0);
  }, []), K = A.useCallback(async () => {
    me.set("apiSettings", c), me.setRegexRules(g), X && await pa.saveState(X, {
      disabledEntries: _
    }), console.log("[Engram] 保存配置:", c, g, _), p(!1);
  }, [c, g, X, _]);
  return {
    settings: c,
    editingPreset: o,
    editingTemplate: f,
    hasChanges: x,
    regexRules: g,
    editingRule: y,
    selectPreset: J,
    addPreset: re,
    updatePreset: ge,
    copyPreset: $,
    deletePreset: Y,
    selectTemplate: se,
    addTemplate: we,
    updateTemplate: ce,
    deleteTemplate: B,
    updateVectorConfig: te,
    updateRerankConfig: be,
    updateWorldbookConfig: he,
    toggleWorldbook: Ge,
    toggleEntry: w,
    refreshWorldbooks: W,
    worldbookStructure: z,
    disabledEntries: _,
    currentCharWorldbook: X,
    selectRule: Q,
    addRule: ee,
    updateRule: ie,
    toggleRule: je,
    deleteRule: C,
    resetRules: H,
    save: K
  };
}
const U5 = [
  { id: "llm", label: "LLM 预设", icon: Pc },
  { id: "vector", label: "向量化", icon: Fc },
  { id: "rerank", label: "Rerank", icon: um }
], L5 = ({ initialTab: c }) => {
  const [s, o] = A.useState(c || "model"), [u, f] = A.useState("llm"), {
    settings: m,
    editingPreset: x,
    editingTemplate: p,
    hasChanges: g,
    regexRules: v,
    editingRule: y,
    selectPreset: b,
    addPreset: z,
    updatePreset: M,
    copyPreset: _,
    deletePreset: R,
    selectTemplate: X,
    addTemplate: V,
    updateTemplate: W,
    deleteTemplate: J,
    updateVectorConfig: re,
    updateRerankConfig: ge,
    updateWorldbookConfig: $,
    selectRule: Y,
    addRule: se,
    updateRule: we,
    toggleRule: ce,
    deleteRule: B,
    resetRules: te,
    save: be,
    // Worldbook filtering
    worldbookStructure: he,
    disabledEntries: Ge,
    toggleWorldbook: w,
    toggleEntry: Q,
    refreshWorldbooks: ee
  } = D5();
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ r.jsx(
      li,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则"
      }
    ),
    /* @__PURE__ */ r.jsx(
      Ps,
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
            onClick: be,
            children: [
              /* @__PURE__ */ r.jsx(Ug, { size: 12 }),
              "保存"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "model" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ r.jsx(
          Ps,
          {
            tabs: U5.map((ie) => ({ ...ie, icon: /* @__PURE__ */ r.jsx(ie.icon, { size: 14 }) })),
            activeTab: u,
            onChange: (ie) => f(ie),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        u === "llm" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ r.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: z, children: /* @__PURE__ */ r.jsx(tu, { size: 16 }) })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: m.llmPresets.map((ie) => /* @__PURE__ */ r.jsx(
              x5,
              {
                preset: ie,
                isSelected: m.selectedPresetId === ie.id,
                onSelect: () => b(ie),
                onEdit: () => b(ie),
                onCopy: () => _(ie),
                onDelete: () => R(ie)
              },
              ie.id
            )) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: "flex flex-col", children: x ? /* @__PURE__ */ r.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ r.jsx(S5, { preset: x, onChange: M }) }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ r.jsx(Pc, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        u === "vector" && /* @__PURE__ */ r.jsx(C5, { config: m.vectorConfig, onChange: re }),
        u === "rerank" && /* @__PURE__ */ r.jsx(N5, { config: m.rerankConfig, onChange: ge })
      ] }),
      s === "prompt" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ r.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ r.jsx(
          w5,
          {
            templates: m.promptTemplates,
            selectedId: (p == null ? void 0 : p.id) || null,
            onSelect: X,
            onAdd: V,
            onUpdate: W,
            onDelete: J
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: p ? /* @__PURE__ */ r.jsx(
          k5,
          {
            template: p,
            llmPresets: m.llmPresets,
            defaultPresetId: m.selectedPresetId,
            onChange: W
          }
        ) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ r.jsx(Ic, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      s === "regex" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ r.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ r.jsx(
          A5,
          {
            rules: v,
            selectedId: (y == null ? void 0 : y.id) || null,
            onSelect: Y,
            onToggle: ce,
            onDelete: B,
            onAdd: se,
            onReset: te
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: y ? /* @__PURE__ */ r.jsx(O5, { rule: y, onChange: we }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ r.jsx(fm, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      s === "worldbook" && /* @__PURE__ */ r.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ r.jsx(
        R5,
        {
          config: m.worldbookConfig,
          onChange: $,
          worldbookStructure: he,
          disabledEntries: Ge,
          onToggleWorldbook: w,
          onToggleEntry: Q,
          onRefresh: ee
        }
      ) })
    ] })
  ] });
}, B5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APIPresets: L5
}, Symbol.toStringTag, { value: "Module" })), H5 = () => {
  const [c, s] = A.useState("claudeDark");
  A.useEffect(() => {
    s(Qn.getTheme());
  }, []);
  const o = (f) => {
    Qn.setTheme(f), me.set("theme", f), s(f);
  }, u = Object.entries(Ys).map(([f, m]) => {
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
    /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: u.map((f) => /* @__PURE__ */ r.jsxs(
      "button",
      {
        onClick: () => o(f.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${c === f.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
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
          /* @__PURE__ */ r.jsx("span", { className: `text-sm font-medium ${c === f.id ? "text-primary" : "text-muted-foreground"}`, children: f.name }),
          c === f.id && /* @__PURE__ */ r.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      f.id
    )) })
  ] });
}, q5 = () => {
  var m, x, p, g, v;
  const [c, s] = A.useState(((m = me.getSettings().summarizerConfig) == null ? void 0 : m.previewEnabled) ?? !0), [, o] = A.useState({});
  A.useEffect(() => {
    me.loadSettings();
  }, []);
  const [u, f] = A.useState(me.getSettings().linkedDeletion);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ r.jsx(li, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ r.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ r.jsx(H5, {})
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "毛玻璃特效 (Glass Effect)" }),
        /* @__PURE__ */ r.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-6", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("h4", { className: "font-medium text-foreground", children: "启用毛玻璃" }),
              /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground break-words max-w-[200px] sm:max-w-none", children: "开启后，面板背景将具有磨砂质感" })
            ] }) }),
            /* @__PURE__ */ r.jsx(
              ur,
              {
                checked: ((x = me.getSettings().glassSettings) == null ? void 0 : x.enabled) ?? !0,
                onChange: (y) => {
                  const z = {
                    ...me.getSettings().glassSettings,
                    enabled: y
                  };
                  me.set("glassSettings", z), Promise.resolve().then(() => Vs).then(({ ThemeManager: M }) => {
                    M.setTheme(M.getTheme());
                  }), o({});
                }
              }
            )
          ] }),
          (((p = me.getSettings().glassSettings) == null ? void 0 : p.enabled) ?? !0) && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            /* @__PURE__ */ r.jsx(
              gn,
              {
                label: "不透明度 (Opacity)",
                description: "调整面板背景的遮罩强度，数值越低越透明",
                value: ((g = me.getSettings().glassSettings) == null ? void 0 : g.opacity) ?? 0.8,
                onChange: (y) => {
                  const z = {
                    ...me.getSettings().glassSettings,
                    opacity: y
                  };
                  me.set("glassSettings", z), Promise.resolve().then(() => Vs).then(({ ThemeManager: M }) => {
                    M.setTheme(M.getTheme());
                  }), o({});
                },
                min: 0,
                max: 1,
                step: 0.05,
                showSlider: !0
              }
            ),
            /* @__PURE__ */ r.jsx(
              gn,
              {
                label: "背景磨砂 (Blur)",
                description: "调整背景模糊程度 (px)",
                value: ((v = me.getSettings().glassSettings) == null ? void 0 : v.blur) ?? 10,
                onChange: (y) => {
                  const z = {
                    ...me.getSettings().glassSettings,
                    blur: y
                  };
                  me.set("glassSettings", z), Promise.resolve().then(() => Vs).then(({ ThemeManager: M }) => {
                    M.setTheme(M.getTheme());
                  }), o({});
                },
                min: 0,
                max: 50,
                step: 1,
                showSlider: !0
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ r.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ r.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ r.jsx(sg, { size: 20 }) }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("h4", { className: "font-medium text-foreground", children: "启用修订模式" }),
              /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "在写入长期记忆前，弹出预览窗口进行人工核对" })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(
            ur,
            {
              checked: c,
              onChange: (y) => {
                s(y), Rm.updateConfig({ previewEnabled: y });
              }
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "数据管理" }),
        /* @__PURE__ */ r.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-4", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ r.jsx("div", { className: "p-2 rounded-lg bg-red-500/10 text-red-500", children: /* @__PURE__ */ r.jsx(fl, { size: 20 }) }),
              /* @__PURE__ */ r.jsxs("div", { children: [
                /* @__PURE__ */ r.jsx("h4", { className: "font-medium text-foreground", children: "联动删除" }),
                /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "删除角色卡时，一并删除关联的 Engram 记忆库" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsx(
              ur,
              {
                checked: u.enabled,
                onChange: (y) => {
                  const b = { ...u, enabled: y };
                  f(b), me.set("linkedDeletion", b);
                }
              }
            )
          ] }),
          u.enabled && /* @__PURE__ */ r.jsx("div", { className: "pl-14 space-y-3 border-t border-border pt-3", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-sm text-muted-foreground", children: "删除前确认" }),
            /* @__PURE__ */ r.jsx(
              ur,
              {
                checked: u.showConfirmation,
                onChange: (y) => {
                  const b = { ...u, showConfirmation: y };
                  f(b), me.set("linkedDeletion", b);
                },
                className: "scale-90"
              }
            )
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
        /* @__PURE__ */ r.jsx(hm, { size: 32 }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, G5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Settings: q5
}, Symbol.toStringTag, { value: "Module" })), Y5 = () => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ r.jsx(li, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ r.jsx(im, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ r.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), $5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MemoryStream: Y5
}, Symbol.toStringTag, { value: "Module" })), V5 = ({ links: c, onNavigate: s, className: o = "" }) => c.length === 0 ? null : /* @__PURE__ */ r.jsx("div", { className: `flex items-center gap-4 ${o}`, children: c.map((u) => {
  const f = u.icon || lg;
  return /* @__PURE__ */ r.jsxs(
    "button",
    {
      className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
      onClick: () => s(u.linkTo),
      title: u.label,
      children: [
        /* @__PURE__ */ r.jsx(f, { size: 12 }),
        /* @__PURE__ */ r.jsx("span", { children: u.label })
      ]
    },
    u.id
  );
}) }), X5 = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6"
}, Gs = ({
  orientation: c = "horizontal",
  length: s = 100,
  className: o = "",
  responsive: u = !1,
  spacing: f = "none"
}) => {
  const m = X5[f];
  return u ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
  ] }) : c === "vertical" ? /* @__PURE__ */ r.jsx(
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
}, Q5 = [
  { id: "token", label: "Token 数", icon: q4 },
  { id: "count", label: "总结次数", icon: cg }
], Z5 = () => {
  const [c, s] = A.useState(null), [o, u] = A.useState(!1), [f, m] = A.useState(!1), [x, p] = A.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [g, v] = A.useState({ ...Is }), [y, b] = A.useState(null), [z, M] = A.useState(0), [_, R] = A.useState(0);
  A.useEffect(() => {
    X();
  }, []);
  const X = async () => {
    var B;
    try {
      const { summarizerService: te } = await Promise.resolve().then(() => _t);
      let be = te.getStatus();
      be.lastSummarizedFloor === 0 && (await te.initializeForCurrentChat(), be = te.getStatus()), s(be);
      const he = te.getConfig();
      p({
        autoEnabled: he.enabled,
        floorInterval: he.floorInterval,
        bufferSize: he.bufferSize || 3,
        autoHide: he.autoHide || !1
      });
      const Ge = (B = me.getSummarizerSettings()) == null ? void 0 : B.trimConfig;
      Ge && v({ ...Is, ...Ge });
      const { trimmerService: w } = await Promise.resolve().then(() => _t), Q = await w.getStatus();
      b(Q);
      const { WorldInfoService: ee } = await Promise.resolve().then(() => Tm), { WorldBookStateService: ie } = await Promise.resolve().then(() => km), je = ee.findExistingWorldbook();
      if (je) {
        const C = await ee.countSummaryTokens(je);
        M(C);
        const H = await ie.loadState(je);
        R(H.totalSummaries);
      } else
        M(0), R(0);
    } catch (te) {
      console.error("加载 Summarizer 状态失败:", te);
    }
  }, V = async () => {
    try {
      const { summarizerService: B } = await Promise.resolve().then(() => _t);
      B.start(), await X();
    } catch (B) {
      console.error("启动失败:", B);
    }
  }, W = async () => {
    try {
      const { summarizerService: B } = await Promise.resolve().then(() => _t);
      B.stop(), await X();
    } catch (B) {
      console.error("停止失败:", B);
    }
  }, J = async () => {
    u(!0);
    try {
      const { summarizerService: B } = await Promise.resolve().then(() => _t);
      await B.triggerSummary(!0), await X();
    } catch (B) {
      console.error("触发失败:", B);
    } finally {
      u(!1);
    }
  }, re = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      u(!0);
      try {
        const { summarizerService: B } = await Promise.resolve().then(() => _t);
        await B.setLastSummarizedFloor(0), await X();
      } catch (B) {
        console.error("重置失败:", B);
      } finally {
        u(!1);
      }
    }
  }, ge = (B, te) => {
    const be = { ...g, [B]: te };
    v(be), $(be);
  }, $ = (B) => {
    me.setSummarizerSettings({ trimConfig: B });
  }, Y = async () => {
    const B = { ...g, enabled: !g.enabled };
    v(B), $(B);
    const { trimmerService: te } = await Promise.resolve().then(() => _t);
    te.updateConfig({ enabled: B.enabled });
  }, se = async () => {
    m(!0);
    try {
      const { trimmerService: B } = await Promise.resolve().then(() => _t);
      await B.triggerTrim(!0), await X();
    } catch (B) {
      console.error("精简失败:", B);
    } finally {
      m(!1);
    }
  }, ce = (() => {
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
              onClick: X,
              title: "刷新",
              children: /* @__PURE__ */ r.jsx(Zt, { size: 14 })
            }
          )
        ] }),
        c ? /* @__PURE__ */ r.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "运行状态" }),
              /* @__PURE__ */ r.jsxs("div", { className: `flex items-center gap-2 text-lg font-medium ${c.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                c.running ? /* @__PURE__ */ r.jsx(Z4, { size: 18 }) : /* @__PURE__ */ r.jsx(ti, { size: 18 }),
                c.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "待处理" }),
              /* @__PURE__ */ r.jsx("div", { className: "text-3xl font-light text-amber-500 font-mono", children: c.pendingFloors })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(Gs, { length: 100, spacing: "md" }),
          /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "当前楼层" }),
              /* @__PURE__ */ r.jsx("div", { className: "text-xl font-mono text-foreground/80", children: c.currentFloor })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "总结次数" }),
              /* @__PURE__ */ r.jsx("div", { className: "text-xl font-mono text-foreground/80", children: _ })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(Gs, { length: 30, spacing: "md" }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1", children: "已总结内容 Token (Engram)" }),
            /* @__PURE__ */ r.jsx("div", { className: "text-sm font-mono text-primary/80", children: z.toLocaleString() })
          ] })
        ] }) : /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-3", children: [
        c != null && c.running ? /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors",
            onClick: W,
            children: [
              /* @__PURE__ */ r.jsx(_g, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: V,
            children: [
              /* @__PURE__ */ r.jsx(eu, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: J,
            disabled: o || (c == null ? void 0 : c.isSummarizing),
            children: [
              /* @__PURE__ */ r.jsx(Zt, { size: 14, className: o ? "animate-spin" : "" }),
              o ? "处理中..." : "手动触发"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "pt-6 space-y-6", children: [
        /* @__PURE__ */ r.jsx(Gs, { length: 100 }),
        /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-sm text-foreground", children: "自动总结" }),
            /* @__PURE__ */ r.jsx(
              Xn,
              {
                label: "",
                checked: x.autoEnabled,
                onChange: async (B) => {
                  p((be) => ({ ...be, autoEnabled: B }));
                  const { summarizerService: te } = await Promise.resolve().then(() => _t);
                  te.updateConfig({ enabled: B });
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
              Xn,
              {
                label: "",
                checked: x.autoHide,
                onChange: (B) => {
                  p((te) => ({ ...te, autoHide: B })), Promise.resolve().then(() => _t).then(({ summarizerService: te }) => {
                    te.updateConfig({ autoHide: B });
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
                  onChange: async (B) => {
                    const te = Number(B.target.value);
                    p((he) => ({ ...he, floorInterval: te }));
                    const { summarizerService: be } = await Promise.resolve().then(() => _t);
                    be.updateConfig({ floorInterval: te });
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
                  onChange: (B) => {
                    const te = Number(B.target.value);
                    p((be) => ({ ...be, bufferSize: te })), Promise.resolve().then(() => _t).then(({ summarizerService: be }) => {
                      be.updateConfig({ bufferSize: te });
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
          onClick: re,
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
      /* @__PURE__ */ r.jsx(Gs, { responsive: !0, length: 30 }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("h2", { className: "text-sm font-medium text-foreground", children: "精简配置" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "将多次总结压缩为更简洁的摘要" })
        ] }),
        /* @__PURE__ */ r.jsx(
          Xn,
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
          /* @__PURE__ */ r.jsx("div", { className: "flex gap-6", children: Q5.map((B) => /* @__PURE__ */ r.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer group",
              children: [
                /* @__PURE__ */ r.jsx(
                  "span",
                  {
                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${g.trigger === B.id ? "border-primary bg-primary" : "border-border group-hover:border-muted-foreground"}`,
                    children: g.trigger === B.id && /* @__PURE__ */ r.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { className: `text-sm transition-colors ${g.trigger === B.id ? "text-foreground" : "text-muted-foreground"}`, children: B.label })
              ]
            },
            B.id
          )) })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground", children: ce.label === "Token 上限" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            "当 Token 数超过 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: ce.value }),
            " 时触发"
          ] }) : ce.label === "楼层上限" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            "当楼层数超过 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: ce.value }),
            " 层时触发"
          ] }) : /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            "当总结次数超过 ",
            /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: ce.value }),
            " 次时触发"
          ] }) }),
          /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(ce.value - ce.min) / (ce.max - ce.min) * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "range",
                min: ce.min,
                max: ce.max,
                step: ce.step,
                value: ce.value,
                onChange: (B) => {
                  const te = Number(B.target.value), be = g.trigger === "token" ? "tokenLimit" : "countLimit";
                  ge(be, te);
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
                onChange: (B) => ge("keepRecentCount", Number(B.target.value)),
                className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                style: { appearance: "none", WebkitAppearance: "none" }
              }
            )
          ] })
        ] }),
        y && /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { children: "待合并条目:" }),
            /* @__PURE__ */ r.jsx("span", { className: "font-mono", children: y.pendingEntryCount })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ r.jsxs("span", { children: [
              "当前",
              g.trigger === "token" ? "Token" : "条目数",
              ":"
            ] }),
            /* @__PURE__ */ r.jsxs("span", { className: `font-mono ${y.triggered ? "text-amber-500" : ""}`, children: [
              y.currentValue,
              " / ",
              ce.value
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            onClick: se,
            disabled: f || ((y == null ? void 0 : y.pendingEntryCount) ?? 0) < 2,
            children: [
              /* @__PURE__ */ r.jsx(Bg, { size: 14, className: f ? "animate-pulse" : "" }),
              f ? "精简中..." : "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, K5 = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ r.jsx(Ic, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ r.jsx(gr, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ r.jsx(um, { size: 16 }) }
], J5 = [
  { id: "devlog", label: "模型日志", icon: qg, linkTo: "devlog:model" },
  { id: "presets", label: "提示词模板", icon: k4, linkTo: "presets:prompt" }
], W5 = ({ onNavigate: c }) => {
  const [s, o] = A.useState("summary");
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ r.jsx(
      Ps,
      {
        tabs: K5,
        activeTab: s,
        onChange: (u) => o(u),
        actions: /* @__PURE__ */ r.jsx("div", { className: "hidden md:flex", children: /* @__PURE__ */ r.jsx(
          V5,
          {
            links: J5,
            onNavigate: (u) => c == null ? void 0 : c(u)
          }
        ) })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "summary" && /* @__PURE__ */ r.jsx(Z5, {}),
      s === "vectorization" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ r.jsx(gr, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ r.jsx(D4, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, F5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ProcessingView: W5
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=index.js.map
