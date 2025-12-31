var Wh = Object.defineProperty;
var Fh = (u, s, o) => s in u ? Wh(u, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : u[s] = o;
var He = (u, s, o) => Fh(u, typeof s != "symbol" ? s + "" : s, o);
function $c(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Sc = { exports: {} }, rr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var o1;
function Ih() {
  if (o1) return rr;
  o1 = 1;
  var u = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(c, f, m) {
    var p = null;
    if (m !== void 0 && (p = "" + m), f.key !== void 0 && (p = "" + f.key), "key" in f) {
      m = {};
      for (var x in f)
        x !== "key" && (m[x] = f[x]);
    } else m = f;
    return f = m.ref, {
      $$typeof: u,
      type: c,
      key: p,
      ref: f !== void 0 ? f : null,
      props: m
    };
  }
  return rr.Fragment = s, rr.jsx = o, rr.jsxs = o, rr;
}
var c1;
function Ph() {
  return c1 || (c1 = 1, Sc.exports = Ih()), Sc.exports;
}
var r = Ph(), jc = { exports: {} }, ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var u1;
function e4() {
  if (u1) return ue;
  u1 = 1;
  var u = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), p = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), M = Symbol.iterator;
  function G(C) {
    return C === null || typeof C != "object" ? null : (C = M && C[M] || C["@@iterator"], typeof C == "function" ? C : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, H = Object.assign, Q = {};
  function X(C, B, K) {
    this.props = C, this.context = B, this.refs = Q, this.updater = K || z;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(C, B) {
    if (typeof C != "object" && typeof C != "function" && C != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, C, B, "setState");
  }, X.prototype.forceUpdate = function(C) {
    this.updater.enqueueForceUpdate(this, C, "forceUpdate");
  };
  function P() {
  }
  P.prototype = X.prototype;
  function F(C, B, K) {
    this.props = C, this.context = B, this.refs = Q, this.updater = K || z;
  }
  var ie = F.prototype = new P();
  ie.constructor = F, H(ie, X.prototype), ie.isPureReactComponent = !0;
  var Se = Array.isArray;
  function $() {
  }
  var Y = { H: null, A: null, T: null, S: null }, oe = Object.prototype.hasOwnProperty;
  function _e(C, B, K) {
    var O = K.ref;
    return {
      $$typeof: u,
      type: C,
      key: B,
      ref: O !== void 0 ? O : null,
      props: K
    };
  }
  function ce(C, B) {
    return _e(C.type, B, C.props);
  }
  function U(C) {
    return typeof C == "object" && C !== null && C.$$typeof === u;
  }
  function te(C) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + C.replace(/[=:]/g, function(K) {
      return B[K];
    });
  }
  var xe = /\/+/g;
  function me(C, B) {
    return typeof C == "object" && C !== null && C.key != null ? te("" + C.key) : B.toString(36);
  }
  function Ge(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (typeof C.status == "string" ? C.then($, $) : (C.status = "pending", C.then(
          function(B) {
            C.status === "pending" && (C.status = "fulfilled", C.value = B);
          },
          function(B) {
            C.status === "pending" && (C.status = "rejected", C.reason = B);
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
  function w(C, B, K, O, q) {
    var Z = typeof C;
    (Z === "undefined" || Z === "boolean") && (C = null);
    var se = !1;
    if (C === null) se = !0;
    else
      switch (Z) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case u:
            case s:
              se = !0;
              break;
            case S:
              return se = C._init, w(
                se(C._payload),
                B,
                K,
                O,
                q
              );
          }
      }
    if (se)
      return q = q(C), se = O === "" ? "." + me(C, 0) : O, Se(q) ? (K = "", se != null && (K = se.replace(xe, "$&/") + "/"), w(q, B, K, "", function(Zn) {
        return Zn;
      })) : q != null && (U(q) && (q = ce(
        q,
        K + (q.key == null || C && C.key === q.key ? "" : ("" + q.key).replace(
          xe,
          "$&/"
        ) + "/") + se
      )), B.push(q)), 1;
    se = 0;
    var Re = O === "" ? "." : O + ":";
    if (Se(C))
      for (var Te = 0; Te < C.length; Te++)
        O = C[Te], Z = Re + me(O, Te), se += w(
          O,
          B,
          K,
          Z,
          q
        );
    else if (Te = G(C), typeof Te == "function")
      for (C = Te.call(C), Te = 0; !(O = C.next()).done; )
        O = O.value, Z = Re + me(O, Te++), se += w(
          O,
          B,
          K,
          Z,
          q
        );
    else if (Z === "object") {
      if (typeof C.then == "function")
        return w(
          Ge(C),
          B,
          K,
          O,
          q
        );
      throw B = String(C), Error(
        "Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function V(C, B, K) {
    if (C == null) return C;
    var O = [], q = 0;
    return w(C, O, "", "", function(Z) {
      return B.call(K, Z, q++);
    }), O;
  }
  function ee(C) {
    if (C._status === -1) {
      var B = C._result;
      B = B(), B.then(
        function(K) {
          (C._status === 0 || C._status === -1) && (C._status = 1, C._result = K);
        },
        function(K) {
          (C._status === 0 || C._status === -1) && (C._status = 2, C._result = K);
        }
      ), C._status === -1 && (C._status = 0, C._result = B);
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var re = typeof reportError == "function" ? reportError : function(C) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var B = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof C == "object" && C !== null && typeof C.message == "string" ? String(C.message) : String(C),
        error: C
      });
      if (!window.dispatchEvent(B)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", C);
      return;
    }
    console.error(C);
  }, je = {
    map: V,
    forEach: function(C, B, K) {
      V(
        C,
        function() {
          B.apply(this, arguments);
        },
        K
      );
    },
    count: function(C) {
      var B = 0;
      return V(C, function() {
        B++;
      }), B;
    },
    toArray: function(C) {
      return V(C, function(B) {
        return B;
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
  return ue.Activity = y, ue.Children = je, ue.Component = X, ue.Fragment = o, ue.Profiler = f, ue.PureComponent = F, ue.StrictMode = c, ue.Suspense = g, ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, ue.__COMPILER_RUNTIME = {
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
  }, ue.cloneElement = function(C, B, K) {
    if (C == null)
      throw Error(
        "The argument must be a React element, but you passed " + C + "."
      );
    var O = H({}, C.props), q = C.key;
    if (B != null)
      for (Z in B.key !== void 0 && (q = "" + B.key), B)
        !oe.call(B, Z) || Z === "key" || Z === "__self" || Z === "__source" || Z === "ref" && B.ref === void 0 || (O[Z] = B[Z]);
    var Z = arguments.length - 2;
    if (Z === 1) O.children = K;
    else if (1 < Z) {
      for (var se = Array(Z), Re = 0; Re < Z; Re++)
        se[Re] = arguments[Re + 2];
      O.children = se;
    }
    return _e(C.type, q, O);
  }, ue.createContext = function(C) {
    return C = {
      $$typeof: p,
      _currentValue: C,
      _currentValue2: C,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, C.Provider = C, C.Consumer = {
      $$typeof: m,
      _context: C
    }, C;
  }, ue.createElement = function(C, B, K) {
    var O, q = {}, Z = null;
    if (B != null)
      for (O in B.key !== void 0 && (Z = "" + B.key), B)
        oe.call(B, O) && O !== "key" && O !== "__self" && O !== "__source" && (q[O] = B[O]);
    var se = arguments.length - 2;
    if (se === 1) q.children = K;
    else if (1 < se) {
      for (var Re = Array(se), Te = 0; Te < se; Te++)
        Re[Te] = arguments[Te + 2];
      q.children = Re;
    }
    if (C && C.defaultProps)
      for (O in se = C.defaultProps, se)
        q[O] === void 0 && (q[O] = se[O]);
    return _e(C, Z, q);
  }, ue.createRef = function() {
    return { current: null };
  }, ue.forwardRef = function(C) {
    return { $$typeof: x, render: C };
  }, ue.isValidElement = U, ue.lazy = function(C) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: C },
      _init: ee
    };
  }, ue.memo = function(C, B) {
    return {
      $$typeof: b,
      type: C,
      compare: B === void 0 ? null : B
    };
  }, ue.startTransition = function(C) {
    var B = Y.T, K = {};
    Y.T = K;
    try {
      var O = C(), q = Y.S;
      q !== null && q(K, O), typeof O == "object" && O !== null && typeof O.then == "function" && O.then($, re);
    } catch (Z) {
      re(Z);
    } finally {
      B !== null && K.types !== null && (B.types = K.types), Y.T = B;
    }
  }, ue.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, ue.use = function(C) {
    return Y.H.use(C);
  }, ue.useActionState = function(C, B, K) {
    return Y.H.useActionState(C, B, K);
  }, ue.useCallback = function(C, B) {
    return Y.H.useCallback(C, B);
  }, ue.useContext = function(C) {
    return Y.H.useContext(C);
  }, ue.useDebugValue = function() {
  }, ue.useDeferredValue = function(C, B) {
    return Y.H.useDeferredValue(C, B);
  }, ue.useEffect = function(C, B) {
    return Y.H.useEffect(C, B);
  }, ue.useEffectEvent = function(C) {
    return Y.H.useEffectEvent(C);
  }, ue.useId = function() {
    return Y.H.useId();
  }, ue.useImperativeHandle = function(C, B, K) {
    return Y.H.useImperativeHandle(C, B, K);
  }, ue.useInsertionEffect = function(C, B) {
    return Y.H.useInsertionEffect(C, B);
  }, ue.useLayoutEffect = function(C, B) {
    return Y.H.useLayoutEffect(C, B);
  }, ue.useMemo = function(C, B) {
    return Y.H.useMemo(C, B);
  }, ue.useOptimistic = function(C, B) {
    return Y.H.useOptimistic(C, B);
  }, ue.useReducer = function(C, B, K) {
    return Y.H.useReducer(C, B, K);
  }, ue.useRef = function(C) {
    return Y.H.useRef(C);
  }, ue.useState = function(C) {
    return Y.H.useState(C);
  }, ue.useSyncExternalStore = function(C, B, K) {
    return Y.H.useSyncExternalStore(
      C,
      B,
      K
    );
  }, ue.useTransition = function() {
    return Y.H.useTransition();
  }, ue.version = "19.2.3", ue;
}
var d1;
function Vc() {
  return d1 || (d1 = 1, jc.exports = e4()), jc.exports;
}
var A = Vc();
const t4 = /* @__PURE__ */ $c(A);
var Cc = { exports: {} }, sr = {}, Nc = { exports: {} }, Ec = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f1;
function n4() {
  return f1 || (f1 = 1, (function(u) {
    function s(w, V) {
      var ee = w.length;
      w.push(V);
      e: for (; 0 < ee; ) {
        var re = ee - 1 >>> 1, je = w[re];
        if (0 < f(je, V))
          w[re] = V, w[ee] = je, ee = re;
        else break e;
      }
    }
    function o(w) {
      return w.length === 0 ? null : w[0];
    }
    function c(w) {
      if (w.length === 0) return null;
      var V = w[0], ee = w.pop();
      if (ee !== V) {
        w[0] = ee;
        e: for (var re = 0, je = w.length, C = je >>> 1; re < C; ) {
          var B = 2 * (re + 1) - 1, K = w[B], O = B + 1, q = w[O];
          if (0 > f(K, ee))
            O < je && 0 > f(q, K) ? (w[re] = q, w[O] = ee, re = O) : (w[re] = K, w[B] = ee, re = B);
          else if (O < je && 0 > f(q, ee))
            w[re] = q, w[O] = ee, re = O;
          else break e;
        }
      }
      return V;
    }
    function f(w, V) {
      var ee = w.sortIndex - V.sortIndex;
      return ee !== 0 ? ee : w.id - V.id;
    }
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      u.unstable_now = function() {
        return m.now();
      };
    } else {
      var p = Date, x = p.now();
      u.unstable_now = function() {
        return p.now() - x;
      };
    }
    var g = [], b = [], S = 1, y = null, M = 3, G = !1, z = !1, H = !1, Q = !1, X = typeof setTimeout == "function" ? setTimeout : null, P = typeof clearTimeout == "function" ? clearTimeout : null, F = typeof setImmediate < "u" ? setImmediate : null;
    function ie(w) {
      for (var V = o(b); V !== null; ) {
        if (V.callback === null) c(b);
        else if (V.startTime <= w)
          c(b), V.sortIndex = V.expirationTime, s(g, V);
        else break;
        V = o(b);
      }
    }
    function Se(w) {
      if (H = !1, ie(w), !z)
        if (o(g) !== null)
          z = !0, $ || ($ = !0, te());
        else {
          var V = o(b);
          V !== null && Ge(Se, V.startTime - w);
        }
    }
    var $ = !1, Y = -1, oe = 5, _e = -1;
    function ce() {
      return Q ? !0 : !(u.unstable_now() - _e < oe);
    }
    function U() {
      if (Q = !1, $) {
        var w = u.unstable_now();
        _e = w;
        var V = !0;
        try {
          e: {
            z = !1, H && (H = !1, P(Y), Y = -1), G = !0;
            var ee = M;
            try {
              t: {
                for (ie(w), y = o(g); y !== null && !(y.expirationTime > w && ce()); ) {
                  var re = y.callback;
                  if (typeof re == "function") {
                    y.callback = null, M = y.priorityLevel;
                    var je = re(
                      y.expirationTime <= w
                    );
                    if (w = u.unstable_now(), typeof je == "function") {
                      y.callback = je, ie(w), V = !0;
                      break t;
                    }
                    y === o(g) && c(g), ie(w);
                  } else c(g);
                  y = o(g);
                }
                if (y !== null) V = !0;
                else {
                  var C = o(b);
                  C !== null && Ge(
                    Se,
                    C.startTime - w
                  ), V = !1;
                }
              }
              break e;
            } finally {
              y = null, M = ee, G = !1;
            }
            V = void 0;
          }
        } finally {
          V ? te() : $ = !1;
        }
      }
    }
    var te;
    if (typeof F == "function")
      te = function() {
        F(U);
      };
    else if (typeof MessageChannel < "u") {
      var xe = new MessageChannel(), me = xe.port2;
      xe.port1.onmessage = U, te = function() {
        me.postMessage(null);
      };
    } else
      te = function() {
        X(U, 0);
      };
    function Ge(w, V) {
      Y = X(function() {
        w(u.unstable_now());
      }, V);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(w) {
      w.callback = null;
    }, u.unstable_forceFrameRate = function(w) {
      0 > w || 125 < w ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : oe = 0 < w ? Math.floor(1e3 / w) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return M;
    }, u.unstable_next = function(w) {
      switch (M) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = M;
      }
      var ee = M;
      M = V;
      try {
        return w();
      } finally {
        M = ee;
      }
    }, u.unstable_requestPaint = function() {
      Q = !0;
    }, u.unstable_runWithPriority = function(w, V) {
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
      var ee = M;
      M = w;
      try {
        return V();
      } finally {
        M = ee;
      }
    }, u.unstable_scheduleCallback = function(w, V, ee) {
      var re = u.unstable_now();
      switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? re + ee : re) : ee = re, w) {
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
        id: S++,
        callback: V,
        priorityLevel: w,
        startTime: ee,
        expirationTime: je,
        sortIndex: -1
      }, ee > re ? (w.sortIndex = ee, s(b, w), o(g) === null && w === o(b) && (H ? (P(Y), Y = -1) : H = !0, Ge(Se, ee - re))) : (w.sortIndex = je, s(g, w), z || G || (z = !0, $ || ($ = !0, te()))), w;
    }, u.unstable_shouldYield = ce, u.unstable_wrapCallback = function(w) {
      var V = M;
      return function() {
        var ee = M;
        M = V;
        try {
          return w.apply(this, arguments);
        } finally {
          M = ee;
        }
      };
    };
  })(Ec)), Ec;
}
var m1;
function a4() {
  return m1 || (m1 = 1, Nc.exports = n4()), Nc.exports;
}
var Tc = { exports: {} }, rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h1;
function l4() {
  if (h1) return rt;
  h1 = 1;
  var u = Vc();
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
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: y == null ? null : "" + y,
      children: g,
      containerInfo: b,
      implementation: S
    };
  }
  var p = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(g, b) {
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
    var b = p.T, S = c.p;
    try {
      if (p.T = null, c.p = 2, g) return g();
    } finally {
      p.T = b, c.p = S, c.d.f();
    }
  }, rt.preconnect = function(g, b) {
    typeof g == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, c.d.C(g, b));
  }, rt.prefetchDNS = function(g) {
    typeof g == "string" && c.d.D(g);
  }, rt.preinit = function(g, b) {
    if (typeof g == "string" && b && typeof b.as == "string") {
      var S = b.as, y = x(S, b.crossOrigin), M = typeof b.integrity == "string" ? b.integrity : void 0, G = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      S === "style" ? c.d.S(
        g,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: y,
          integrity: M,
          fetchPriority: G
        }
      ) : S === "script" && c.d.X(g, {
        crossOrigin: y,
        integrity: M,
        fetchPriority: G,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, rt.preinitModule = function(g, b) {
    if (typeof g == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var S = x(
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
      var S = b.as, y = x(S, b.crossOrigin);
      c.d.L(g, S, {
        crossOrigin: y,
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
        var S = x(b.as, b.crossOrigin);
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
    return p.H.useFormState(g, b, S);
  }, rt.useFormStatus = function() {
    return p.H.useHostTransitionStatus();
  }, rt.version = "19.2.3", rt;
}
var g1;
function X1() {
  if (g1) return Tc.exports;
  g1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (s) {
        console.error(s);
      }
  }
  return u(), Tc.exports = l4(), Tc.exports;
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
var p1;
function r4() {
  if (p1) return sr;
  p1 = 1;
  var u = a4(), s = Vc(), o = X1();
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
  function p(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function x(e) {
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
        throw Error(c(188));
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
          if (!d) throw Error(c(189));
        }
      }
      if (n.alternate !== a) throw Error(c(190));
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
  var y = Object.assign, M = Symbol.for("react.element"), G = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), H = Symbol.for("react.fragment"), Q = Symbol.for("react.strict_mode"), X = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), F = Symbol.for("react.context"), ie = Symbol.for("react.forward_ref"), Se = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), _e = Symbol.for("react.activity"), ce = Symbol.for("react.memo_cache_sentinel"), U = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object" ? null : (e = U && e[U] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var xe = Symbol.for("react.client.reference");
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === xe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case H:
        return "Fragment";
      case X:
        return "Profiler";
      case Q:
        return "StrictMode";
      case Se:
        return "Suspense";
      case $:
        return "SuspenseList";
      case _e:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case z:
          return "Portal";
        case F:
          return e.displayName || "Context";
        case P:
          return (e._context.displayName || "Context") + ".Consumer";
        case ie:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Y:
          return t = e.displayName || null, t !== null ? t : me(e.type) || "Memo";
        case oe:
          t = e._payload, e = e._init;
          try {
            return me(e(t));
          } catch {
          }
      }
    return null;
  }
  var Ge = Array.isArray, w = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, re = [], je = -1;
  function C(e) {
    return { current: e };
  }
  function B(e) {
    0 > je || (e.current = re[je], re[je] = null, je--);
  }
  function K(e, t) {
    je++, re[je] = e.current, e.current = t;
  }
  var O = C(null), q = C(null), Z = C(null), se = C(null);
  function Re(e, t) {
    switch (K(Z, t), K(q, e), K(O, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? A0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = A0(t), e = M0(t, e);
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
    B(O), K(O, e);
  }
  function Te() {
    B(O), B(q), B(Z);
  }
  function Zn(e) {
    e.memoizedState !== null && K(se, e);
    var t = O.current, n = M0(t, e.type);
    t !== n && (K(q, e), K(O, n));
  }
  function pr(e) {
    q.current === e && (B(O), B(q)), se.current === e && (B(se), tr._currentValue = ee);
  }
  var ni, su;
  function Kn(e) {
    if (ni === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ni = t && t[1] || "", su = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ni + e + su;
  }
  var ai = !1;
  function li(e, t) {
    if (!e || ai) return "";
    ai = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var L = function() {
                throw Error();
              };
              if (Object.defineProperty(L.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(L, []);
                } catch (k) {
                  var _ = k;
                }
                Reflect.construct(e, [], L);
              } else {
                try {
                  L.call();
                } catch (k) {
                  _ = k;
                }
                e.call(L.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (k) {
                _ = k;
              }
              (L = e()) && typeof L.catch == "function" && L.catch(function() {
              });
            }
          } catch (k) {
            if (k && _ && typeof k.stack == "string")
              return [k.stack, _.stack];
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
        var v = d.split(`
`), T = h.split(`
`);
        for (l = a = 0; a < v.length && !v[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; l < T.length && !T[l].includes(
          "DetermineComponentFrameRoot"
        ); )
          l++;
        if (a === v.length || l === T.length)
          for (a = v.length - 1, l = T.length - 1; 1 <= a && 0 <= l && v[a] !== T[l]; )
            l--;
        for (; 1 <= a && 0 <= l; a--, l--)
          if (v[a] !== T[l]) {
            if (a !== 1 || l !== 1)
              do
                if (a--, l--, 0 > l || v[a] !== T[l]) {
                  var R = `
` + v[a].replace(" at new ", " at ");
                  return e.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", e.displayName)), R;
                }
              while (1 <= a && 0 <= l);
            break;
          }
      }
    } finally {
      ai = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Kn(n) : "";
  }
  function wm(e, t) {
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
        return li(e.type, !1);
      case 11:
        return li(e.type.render, !1);
      case 1:
        return li(e.type, !0);
      case 31:
        return Kn("Activity");
      default:
        return "";
    }
  }
  function iu(e) {
    try {
      var t = "", n = null;
      do
        t += wm(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ri = Object.prototype.hasOwnProperty, si = u.unstable_scheduleCallback, ii = u.unstable_cancelCallback, _m = u.unstable_shouldYield, zm = u.unstable_requestPaint, xt = u.unstable_now, km = u.unstable_getCurrentPriorityLevel, ou = u.unstable_ImmediatePriority, cu = u.unstable_UserBlockingPriority, xr = u.unstable_NormalPriority, Am = u.unstable_LowPriority, uu = u.unstable_IdlePriority, Mm = u.log, Om = u.unstable_setDisableYieldValue, ml = null, bt = null;
  function bn(e) {
    if (typeof Mm == "function" && Om(e), bt && typeof bt.setStrictMode == "function")
      try {
        bt.setStrictMode(ml, e);
      } catch {
      }
  }
  var yt = Math.clz32 ? Math.clz32 : Um, Rm = Math.log, Dm = Math.LN2;
  function Um(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Rm(e) / Dm | 0) | 0;
  }
  var br = 256, yr = 262144, vr = 4194304;
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
  function Sr(e, t, n) {
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
  function Bm(e, t) {
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
  function du() {
    var e = vr;
    return vr <<= 1, (vr & 62914560) === 0 && (vr = 4194304), e;
  }
  function oi(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function gl(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Lm(e, t, n, a, l, i) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var h = e.entanglements, v = e.expirationTimes, T = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var R = 31 - yt(n), L = 1 << R;
      h[R] = 0, v[R] = -1;
      var _ = T[R];
      if (_ !== null)
        for (T[R] = null, R = 0; R < _.length; R++) {
          var k = _[R];
          k !== null && (k.lane &= -536870913);
        }
      n &= ~L;
    }
    a !== 0 && fu(e, a, 0), i !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(d & ~t));
  }
  function fu(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - yt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 261930;
  }
  function mu(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - yt(n), l = 1 << a;
      l & t | e[a] & t && (e[a] |= t), n &= ~l;
    }
  }
  function hu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : ci(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function ci(e) {
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
  function ui(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function gu() {
    var e = V.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : t1(e.type));
  }
  function pu(e, t) {
    var n = V.p;
    try {
      return V.p = e, t();
    } finally {
      V.p = n;
    }
  }
  var yn = Math.random().toString(36).slice(2), Pe = "__reactFiber$" + yn, ot = "__reactProps$" + yn, va = "__reactContainer$" + yn, di = "__reactEvents$" + yn, Hm = "__reactListeners$" + yn, qm = "__reactHandles$" + yn, xu = "__reactResources$" + yn, pl = "__reactMarker$" + yn;
  function fi(e) {
    delete e[Pe], delete e[ot], delete e[di], delete e[Hm], delete e[qm];
  }
  function Sa(e) {
    var t = e[Pe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[va] || n[Pe]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = H0(e); e !== null; ) {
            if (n = e[Pe]) return n;
            e = H0(e);
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
    throw Error(c(33));
  }
  function Ca(e) {
    var t = e[xu];
    return t || (t = e[xu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fe(e) {
    e[pl] = !0;
  }
  var bu = /* @__PURE__ */ new Set(), yu = {};
  function Wn(e, t) {
    Na(e, t), Na(e + "Capture", t);
  }
  function Na(e, t) {
    for (yu[e] = t, e = 0; e < t.length; e++)
      bu.add(t[e]);
  }
  var Gm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), vu = {}, Su = {};
  function Ym(e) {
    return ri.call(Su, e) ? !0 : ri.call(vu, e) ? !1 : Gm.test(e) ? Su[e] = !0 : (vu[e] = !0, !1);
  }
  function jr(e, t, n) {
    if (Ym(t))
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
  function ju(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function $m(e, t, n) {
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
  function mi(e) {
    if (!e._valueTracker) {
      var t = ju(e) ? "checked" : "value";
      e._valueTracker = $m(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Cu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), a = "";
    return e && (a = ju(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Nr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Vm = /[\n"\\]/g;
  function kt(e) {
    return e.replace(
      Vm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function hi(e, t, n, a, l, i, d, h) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zt(t)) : e.value !== "" + zt(t) && (e.value = "" + zt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? gi(e, d, zt(t)) : n != null ? gi(e, d, zt(n)) : a != null && e.removeAttribute("value"), l == null && i != null && (e.defaultChecked = !!i), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + zt(h) : e.removeAttribute("name");
  }
  function Nu(e, t, n, a, l, i, d, h) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || n != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        mi(e);
        return;
      }
      n = n != null ? "" + zt(n) : "", t = t != null ? "" + zt(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? l, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = h ? e.checked : !!a, e.defaultChecked = !!a, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), mi(e);
  }
  function gi(e, t, n) {
    t === "number" && Nr(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
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
  function Eu(e, t, n) {
    if (t != null && (t = "" + zt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + zt(n) : "";
  }
  function Tu(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(c(92));
        if (Ge(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = zt(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a), mi(e);
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
  var Xm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function wu(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Xm.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function _u(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var l in t)
        a = t[l], t.hasOwnProperty(l) && n[l] !== a && wu(e, l, a);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && wu(e, i, t[i]);
  }
  function pi(e) {
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
  var Qm = /* @__PURE__ */ new Map([
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
  ]), Zm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Er(e) {
    return Zm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Wt() {
  }
  var xi = null;
  function bi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var wa = null, _a = null;
  function zu(e) {
    var t = ja(e);
    if (t && (e = t.stateNode)) {
      var n = e[ot] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (hi(
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
                if (!l) throw Error(c(90));
                hi(
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
              a = n[t], a.form === e.form && Cu(a);
          }
          break e;
        case "textarea":
          Eu(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Ea(e, !!n.multiple, t, !1);
      }
    }
  }
  var yi = !1;
  function ku(e, t, n) {
    if (yi) return e(t, n);
    yi = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (yi = !1, (wa !== null || _a !== null) && (fs(), wa && (t = wa, e = _a, _a = wa = null, zu(t), e)))
        for (t = 0; t < e.length; t++) zu(e[t]);
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
        c(231, t, typeof n)
      );
    return n;
  }
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vi = !1;
  if (Ft)
    try {
      var yl = {};
      Object.defineProperty(yl, "passive", {
        get: function() {
          vi = !0;
        }
      }), window.addEventListener("test", yl, yl), window.removeEventListener("test", yl, yl);
    } catch {
      vi = !1;
    }
  var vn = null, Si = null, Tr = null;
  function Au() {
    if (Tr) return Tr;
    var e, t = Si, n = t.length, a, l = "value" in vn ? vn.value : vn.textContent, i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var d = n - e;
    for (a = 1; a <= d && t[n - a] === l[i - a]; a++) ;
    return Tr = l.slice(e, 1 < a ? 1 - a : void 0);
  }
  function wr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function _r() {
    return !0;
  }
  function Mu() {
    return !1;
  }
  function ct(e) {
    function t(n, a, l, i, d) {
      this._reactName = n, this._targetInst = l, this.type = a, this.nativeEvent = i, this.target = d, this.currentTarget = null;
      for (var h in e)
        e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(i) : i[h]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? _r : Mu, this.isPropagationStopped = Mu, this;
    }
    return y(t.prototype, {
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
  var Fn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zr = ct(Fn), vl = y({}, Fn, { view: 0, detail: 0 }), Km = ct(vl), ji, Ci, Sl, kr = y({}, vl, {
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
    getModifierState: Ei,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Sl && (Sl && e.type === "mousemove" ? (ji = e.screenX - Sl.screenX, Ci = e.screenY - Sl.screenY) : Ci = ji = 0, Sl = e), ji);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ci;
    }
  }), Ou = ct(kr), Jm = y({}, kr, { dataTransfer: 0 }), Wm = ct(Jm), Fm = y({}, vl, { relatedTarget: 0 }), Ni = ct(Fm), Im = y({}, Fn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Pm = ct(Im), e2 = y({}, Fn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), t2 = ct(e2), n2 = y({}, Fn, { data: 0 }), Ru = ct(n2), a2 = {
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
  }, l2 = {
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
  }, r2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function s2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = r2[e]) ? !!t[e] : !1;
  }
  function Ei() {
    return s2;
  }
  var i2 = y({}, vl, {
    key: function(e) {
      if (e.key) {
        var t = a2[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = wr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? l2[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ei,
    charCode: function(e) {
      return e.type === "keypress" ? wr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? wr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), o2 = ct(i2), c2 = y({}, kr, {
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
  }), Du = ct(c2), u2 = y({}, vl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ei
  }), d2 = ct(u2), f2 = y({}, Fn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), m2 = ct(f2), h2 = y({}, kr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), g2 = ct(h2), p2 = y({}, Fn, {
    newState: 0,
    oldState: 0
  }), x2 = ct(p2), b2 = [9, 13, 27, 32], Ti = Ft && "CompositionEvent" in window, jl = null;
  Ft && "documentMode" in document && (jl = document.documentMode);
  var y2 = Ft && "TextEvent" in window && !jl, Uu = Ft && (!Ti || jl && 8 < jl && 11 >= jl), Bu = " ", Lu = !1;
  function Hu(e, t) {
    switch (e) {
      case "keyup":
        return b2.indexOf(t.keyCode) !== -1;
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
  function qu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var za = !1;
  function v2(e, t) {
    switch (e) {
      case "compositionend":
        return qu(t);
      case "keypress":
        return t.which !== 32 ? null : (Lu = !0, Bu);
      case "textInput":
        return e = t.data, e === Bu && Lu ? null : e;
      default:
        return null;
    }
  }
  function S2(e, t) {
    if (za)
      return e === "compositionend" || !Ti && Hu(e, t) ? (e = Au(), Tr = Si = vn = null, za = !1, e) : null;
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
        return Uu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var j2 = {
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
  function Gu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!j2[e.type] : t === "textarea";
  }
  function Yu(e, t, n, a) {
    wa ? _a ? _a.push(a) : _a = [a] : wa = a, t = ys(t, "onChange"), 0 < t.length && (n = new zr(
      "onChange",
      "change",
      null,
      n,
      a
    ), e.push({ event: n, listeners: t }));
  }
  var Cl = null, Nl = null;
  function C2(e) {
    E0(e, 0);
  }
  function Ar(e) {
    var t = xl(e);
    if (Cu(t)) return e;
  }
  function $u(e, t) {
    if (e === "change") return t;
  }
  var Vu = !1;
  if (Ft) {
    var wi;
    if (Ft) {
      var _i = "oninput" in document;
      if (!_i) {
        var Xu = document.createElement("div");
        Xu.setAttribute("oninput", "return;"), _i = typeof Xu.oninput == "function";
      }
      wi = _i;
    } else wi = !1;
    Vu = wi && (!document.documentMode || 9 < document.documentMode);
  }
  function Qu() {
    Cl && (Cl.detachEvent("onpropertychange", Zu), Nl = Cl = null);
  }
  function Zu(e) {
    if (e.propertyName === "value" && Ar(Nl)) {
      var t = [];
      Yu(
        t,
        Nl,
        e,
        bi(e)
      ), ku(C2, t);
    }
  }
  function N2(e, t, n) {
    e === "focusin" ? (Qu(), Cl = t, Nl = n, Cl.attachEvent("onpropertychange", Zu)) : e === "focusout" && Qu();
  }
  function E2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ar(Nl);
  }
  function T2(e, t) {
    if (e === "click") return Ar(t);
  }
  function w2(e, t) {
    if (e === "input" || e === "change")
      return Ar(t);
  }
  function _2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var vt = typeof Object.is == "function" ? Object.is : _2;
  function El(e, t) {
    if (vt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var l = n[a];
      if (!ri.call(t, l) || !vt(e[l], t[l]))
        return !1;
    }
    return !0;
  }
  function Ku(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ju(e, t) {
    var n = Ku(e);
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
      n = Ku(n);
    }
  }
  function Wu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Wu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Fu(e) {
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
  function zi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var z2 = Ft && "documentMode" in document && 11 >= document.documentMode, ka = null, ki = null, Tl = null, Ai = !1;
  function Iu(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ai || ka == null || ka !== Nr(a) || (a = ka, "selectionStart" in a && zi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Tl && El(Tl, a) || (Tl = a, a = ys(ki, "onSelect"), 0 < a.length && (t = new zr(
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
  }, Mi = {}, Pu = {};
  Ft && (Pu = document.createElement("div").style, "AnimationEvent" in window || (delete Aa.animationend.animation, delete Aa.animationiteration.animation, delete Aa.animationstart.animation), "TransitionEvent" in window || delete Aa.transitionend.transition);
  function Pn(e) {
    if (Mi[e]) return Mi[e];
    if (!Aa[e]) return e;
    var t = Aa[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Pu)
        return Mi[e] = t[n];
    return e;
  }
  var ed = Pn("animationend"), td = Pn("animationiteration"), nd = Pn("animationstart"), k2 = Pn("transitionrun"), A2 = Pn("transitionstart"), M2 = Pn("transitioncancel"), ad = Pn("transitionend"), ld = /* @__PURE__ */ new Map(), Oi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Oi.push("scrollEnd");
  function Ht(e, t) {
    ld.set(e, t), Wn(t, [e]);
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
  }, At = [], Ma = 0, Ri = 0;
  function Or() {
    for (var e = Ma, t = Ri = Ma = 0; t < e; ) {
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
      i !== 0 && rd(n, l, i);
    }
  }
  function Rr(e, t, n, a) {
    At[Ma++] = e, At[Ma++] = t, At[Ma++] = n, At[Ma++] = a, Ri |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Di(e, t, n, a) {
    return Rr(e, t, n, a), Dr(e);
  }
  function ea(e, t) {
    return Rr(e, null, null, t), Dr(e);
  }
  function rd(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var l = !1, i = e.return; i !== null; )
      i.childLanes |= n, a = i.alternate, a !== null && (a.childLanes |= n), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (l = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, l && t !== null && (l = 31 - yt(n), e = i.hiddenUpdates, a = e[l], a === null ? e[l] = [t] : a.push(t), t.lane = n | 536870912), i) : null;
  }
  function Dr(e) {
    if (50 < Kl)
      throw Kl = 0, Xo = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Oa = {};
  function O2(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function St(e, t, n, a) {
    return new O2(e, t, n, a);
  }
  function Ui(e) {
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
  function sd(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ur(e, t, n, a, l, i) {
    var d = 0;
    if (a = e, typeof e == "function") Ui(e) && (d = 1);
    else if (typeof e == "string")
      d = Lh(
        e,
        n,
        O.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case _e:
          return e = St(31, n, t, l), e.elementType = _e, e.lanes = i, e;
        case H:
          return ta(n.children, l, i, t);
        case Q:
          d = 8, l |= 24;
          break;
        case X:
          return e = St(12, n, t, l | 2), e.elementType = X, e.lanes = i, e;
        case Se:
          return e = St(13, n, t, l), e.elementType = Se, e.lanes = i, e;
        case $:
          return e = St(19, n, t, l), e.elementType = $, e.lanes = i, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case F:
                d = 10;
                break e;
              case P:
                d = 9;
                break e;
              case ie:
                d = 11;
                break e;
              case Y:
                d = 14;
                break e;
              case oe:
                d = 16, a = null;
                break e;
            }
          d = 29, n = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = St(d, n, t, l), t.elementType = e, t.type = a, t.lanes = i, t;
  }
  function ta(e, t, n, a) {
    return e = St(7, e, a, t), e.lanes = n, e;
  }
  function Bi(e, t, n) {
    return e = St(6, e, null, t), e.lanes = n, e;
  }
  function id(e) {
    var t = St(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Li(e, t, n) {
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
  var od = /* @__PURE__ */ new WeakMap();
  function Mt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = od.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: iu(t)
      }, od.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: iu(t)
    };
  }
  var Ra = [], Da = 0, Br = null, wl = 0, Ot = [], Rt = 0, Sn = null, Yt = 1, $t = "";
  function Pt(e, t) {
    Ra[Da++] = wl, Ra[Da++] = Br, Br = e, wl = t;
  }
  function cd(e, t, n) {
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
  function Hi(e) {
    e.return !== null && (Pt(e, 1), cd(e, 1, 0));
  }
  function qi(e) {
    for (; e === Br; )
      Br = Ra[--Da], Ra[Da] = null, wl = Ra[--Da], Ra[Da] = null;
    for (; e === Sn; )
      Sn = Ot[--Rt], Ot[Rt] = null, $t = Ot[--Rt], Ot[Rt] = null, Yt = Ot[--Rt], Ot[Rt] = null;
  }
  function ud(e, t) {
    Ot[Rt++] = Yt, Ot[Rt++] = $t, Ot[Rt++] = Sn, Yt = t.id, $t = t.overflow, Sn = e;
  }
  var et = null, Be = null, ve = !1, jn = null, Dt = !1, Gi = Error(c(519));
  function Cn(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw _l(Mt(t, e)), Gi;
  }
  function dd(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[Pe] = e, t[ot] = a, n) {
      case "dialog":
        ge("cancel", t), ge("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ge("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Wl.length; n++)
          ge(Wl[n], t);
        break;
      case "source":
        ge("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ge("error", t), ge("load", t);
        break;
      case "details":
        ge("toggle", t);
        break;
      case "input":
        ge("invalid", t), Nu(
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
        ge("invalid", t);
        break;
      case "textarea":
        ge("invalid", t), Tu(t, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === !0 || z0(t.textContent, n) ? (a.popover != null && (ge("beforetoggle", t), ge("toggle", t)), a.onScroll != null && ge("scroll", t), a.onScrollEnd != null && ge("scrollend", t), a.onClick != null && (t.onclick = Wt), t = !0) : t = !1, t || Cn(e, !0);
  }
  function fd(e) {
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
    if (!ve) return fd(e), ve = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || sc(e.type, e.memoizedProps)), n = !n), n && Be && Cn(e), fd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Be = L0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Be = L0(e);
    } else
      t === 27 ? (t = Be, Bn(e.type) ? (e = dc, dc = null, Be = e) : Be = t) : Be = et ? Bt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function na() {
    Be = et = null, ve = !1;
  }
  function Yi() {
    var e = jn;
    return e !== null && (mt === null ? mt = e : mt.push.apply(
      mt,
      e
    ), jn = null), e;
  }
  function _l(e) {
    jn === null ? jn = [e] : jn.push(e);
  }
  var $i = C(null), aa = null, en = null;
  function Nn(e, t, n) {
    K($i, t._currentValue), t._currentValue = n;
  }
  function tn(e) {
    e._currentValue = $i.current, B($i);
  }
  function Vi(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Xi(e, t, n, a) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var i = l.dependencies;
      if (i !== null) {
        var d = l.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var h = i;
          i = l;
          for (var v = 0; v < t.length; v++)
            if (h.context === t[v]) {
              i.lanes |= n, h = i.alternate, h !== null && (h.lanes |= n), Vi(
                i.return,
                n,
                e
              ), a || (d = null);
              break e;
            }
          i = h.next;
        }
      } else if (l.tag === 18) {
        if (d = l.return, d === null) throw Error(c(341));
        d.lanes |= n, i = d.alternate, i !== null && (i.lanes |= n), Vi(d, n, e), d = null;
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
  function Ba(e, t, n, a) {
    e = null;
    for (var l = t, i = !1; l !== null; ) {
      if (!i) {
        if ((l.flags & 524288) !== 0) i = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var d = l.alternate;
        if (d === null) throw Error(c(387));
        if (d = d.memoizedProps, d !== null) {
          var h = l.type;
          vt(l.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
        }
      } else if (l === se.current) {
        if (d = l.alternate, d === null) throw Error(c(387));
        d.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(tr) : e = [tr]);
      }
      l = l.return;
    }
    e !== null && Xi(
      t,
      e,
      n,
      a
    ), t.flags |= 262144;
  }
  function Lr(e) {
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
    return md(aa, e);
  }
  function Hr(e, t) {
    return aa === null && la(e), md(e, t);
  }
  function md(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, en === null) {
      if (e === null) throw Error(c(308));
      en = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else en = en.next = t;
    return n;
  }
  var R2 = typeof AbortController < "u" ? AbortController : function() {
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
  }, D2 = u.unstable_scheduleCallback, U2 = u.unstable_NormalPriority, Qe = {
    $$typeof: F,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Qi() {
    return {
      controller: new R2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zl(e) {
    e.refCount--, e.refCount === 0 && D2(U2, function() {
      e.controller.abort();
    });
  }
  var kl = null, Zi = 0, La = 0, Ha = null;
  function B2(e, t) {
    if (kl === null) {
      var n = kl = [];
      Zi = 0, La = Fo(), Ha = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return Zi++, t.then(hd, hd), t;
  }
  function hd() {
    if (--Zi === 0 && kl !== null) {
      Ha !== null && (Ha.status = "fulfilled");
      var e = kl;
      kl = null, La = 0, Ha = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function L2(e, t) {
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
  var gd = w.S;
  w.S = function(e, t) {
    Pf = xt(), typeof t == "object" && t !== null && typeof t.then == "function" && B2(e, t), gd !== null && gd(e, t);
  };
  var ra = C(null);
  function Ki() {
    var e = ra.current;
    return e !== null ? e : De.pooledCache;
  }
  function qr(e, t) {
    t === null ? K(ra, ra.current) : K(ra, t.pool);
  }
  function pd() {
    var e = Ki();
    return e === null ? null : { parent: Qe._currentValue, pool: e };
  }
  var qa = Error(c(460)), Ji = Error(c(474)), Gr = Error(c(542)), Yr = { then: function() {
  } };
  function xd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function bd(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Wt, Wt), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, vd(e), e;
      default:
        if (typeof t.status == "string") t.then(Wt, Wt);
        else {
          if (e = De, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
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
            throw e = t.reason, vd(e), e;
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
  function yd() {
    if (ia === null) throw Error(c(459));
    var e = ia;
    return ia = null, e;
  }
  function vd(e) {
    if (e === qa || e === Gr)
      throw Error(c(483));
  }
  var Ga = null, Al = 0;
  function $r(e) {
    var t = Al;
    return Al += 1, Ga === null && (Ga = []), bd(Ga, e, t);
  }
  function Ml(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Vr(e, t) {
    throw t.$$typeof === M ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Sd(e) {
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
    function h(N, j, E, D) {
      return j === null || j.tag !== 6 ? (j = Bi(E, N.mode, D), j.return = N, j) : (j = l(j, E), j.return = N, j);
    }
    function v(N, j, E, D) {
      var ne = E.type;
      return ne === H ? R(
        N,
        j,
        E.props.children,
        D,
        E.key
      ) : j !== null && (j.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === oe && sa(ne) === j.type) ? (j = l(j, E.props), Ml(j, E), j.return = N, j) : (j = Ur(
        E.type,
        E.key,
        E.props,
        null,
        N.mode,
        D
      ), Ml(j, E), j.return = N, j);
    }
    function T(N, j, E, D) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== E.containerInfo || j.stateNode.implementation !== E.implementation ? (j = Li(E, N.mode, D), j.return = N, j) : (j = l(j, E.children || []), j.return = N, j);
    }
    function R(N, j, E, D, ne) {
      return j === null || j.tag !== 7 ? (j = ta(
        E,
        N.mode,
        D,
        ne
      ), j.return = N, j) : (j = l(j, E), j.return = N, j);
    }
    function L(N, j, E) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return j = Bi(
          "" + j,
          N.mode,
          E
        ), j.return = N, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case G:
            return E = Ur(
              j.type,
              j.key,
              j.props,
              null,
              N.mode,
              E
            ), Ml(E, j), E.return = N, E;
          case z:
            return j = Li(
              j,
              N.mode,
              E
            ), j.return = N, j;
          case oe:
            return j = sa(j), L(N, j, E);
        }
        if (Ge(j) || te(j))
          return j = ta(
            j,
            N.mode,
            E,
            null
          ), j.return = N, j;
        if (typeof j.then == "function")
          return L(N, $r(j), E);
        if (j.$$typeof === F)
          return L(
            N,
            Hr(N, j),
            E
          );
        Vr(N, j);
      }
      return null;
    }
    function _(N, j, E, D) {
      var ne = j !== null ? j.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return ne !== null ? null : h(N, j, "" + E, D);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case G:
            return E.key === ne ? v(N, j, E, D) : null;
          case z:
            return E.key === ne ? T(N, j, E, D) : null;
          case oe:
            return E = sa(E), _(N, j, E, D);
        }
        if (Ge(E) || te(E))
          return ne !== null ? null : R(N, j, E, D, null);
        if (typeof E.then == "function")
          return _(
            N,
            j,
            $r(E),
            D
          );
        if (E.$$typeof === F)
          return _(
            N,
            j,
            Hr(N, E),
            D
          );
        Vr(N, E);
      }
      return null;
    }
    function k(N, j, E, D, ne) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return N = N.get(E) || null, h(j, N, "" + D, ne);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case G:
            return N = N.get(
              D.key === null ? E : D.key
            ) || null, v(j, N, D, ne);
          case z:
            return N = N.get(
              D.key === null ? E : D.key
            ) || null, T(j, N, D, ne);
          case oe:
            return D = sa(D), k(
              N,
              j,
              E,
              D,
              ne
            );
        }
        if (Ge(D) || te(D))
          return N = N.get(E) || null, R(j, N, D, ne, null);
        if (typeof D.then == "function")
          return k(
            N,
            j,
            E,
            $r(D),
            ne
          );
        if (D.$$typeof === F)
          return k(
            N,
            j,
            E,
            Hr(j, D),
            ne
          );
        Vr(j, D);
      }
      return null;
    }
    function J(N, j, E, D) {
      for (var ne = null, Ne = null, W = j, fe = j = 0, ye = null; W !== null && fe < E.length; fe++) {
        W.index > fe ? (ye = W, W = null) : ye = W.sibling;
        var Ee = _(
          N,
          W,
          E[fe],
          D
        );
        if (Ee === null) {
          W === null && (W = ye);
          break;
        }
        e && W && Ee.alternate === null && t(N, W), j = i(Ee, j, fe), Ne === null ? ne = Ee : Ne.sibling = Ee, Ne = Ee, W = ye;
      }
      if (fe === E.length)
        return n(N, W), ve && Pt(N, fe), ne;
      if (W === null) {
        for (; fe < E.length; fe++)
          W = L(N, E[fe], D), W !== null && (j = i(
            W,
            j,
            fe
          ), Ne === null ? ne = W : Ne.sibling = W, Ne = W);
        return ve && Pt(N, fe), ne;
      }
      for (W = a(W); fe < E.length; fe++)
        ye = k(
          W,
          N,
          fe,
          E[fe],
          D
        ), ye !== null && (e && ye.alternate !== null && W.delete(
          ye.key === null ? fe : ye.key
        ), j = i(
          ye,
          j,
          fe
        ), Ne === null ? ne = ye : Ne.sibling = ye, Ne = ye);
      return e && W.forEach(function(Yn) {
        return t(N, Yn);
      }), ve && Pt(N, fe), ne;
    }
    function le(N, j, E, D) {
      if (E == null) throw Error(c(151));
      for (var ne = null, Ne = null, W = j, fe = j = 0, ye = null, Ee = E.next(); W !== null && !Ee.done; fe++, Ee = E.next()) {
        W.index > fe ? (ye = W, W = null) : ye = W.sibling;
        var Yn = _(N, W, Ee.value, D);
        if (Yn === null) {
          W === null && (W = ye);
          break;
        }
        e && W && Yn.alternate === null && t(N, W), j = i(Yn, j, fe), Ne === null ? ne = Yn : Ne.sibling = Yn, Ne = Yn, W = ye;
      }
      if (Ee.done)
        return n(N, W), ve && Pt(N, fe), ne;
      if (W === null) {
        for (; !Ee.done; fe++, Ee = E.next())
          Ee = L(N, Ee.value, D), Ee !== null && (j = i(Ee, j, fe), Ne === null ? ne = Ee : Ne.sibling = Ee, Ne = Ee);
        return ve && Pt(N, fe), ne;
      }
      for (W = a(W); !Ee.done; fe++, Ee = E.next())
        Ee = k(W, N, fe, Ee.value, D), Ee !== null && (e && Ee.alternate !== null && W.delete(Ee.key === null ? fe : Ee.key), j = i(Ee, j, fe), Ne === null ? ne = Ee : Ne.sibling = Ee, Ne = Ee);
      return e && W.forEach(function(Jh) {
        return t(N, Jh);
      }), ve && Pt(N, fe), ne;
    }
    function Oe(N, j, E, D) {
      if (typeof E == "object" && E !== null && E.type === H && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case G:
            e: {
              for (var ne = E.key; j !== null; ) {
                if (j.key === ne) {
                  if (ne = E.type, ne === H) {
                    if (j.tag === 7) {
                      n(
                        N,
                        j.sibling
                      ), D = l(
                        j,
                        E.props.children
                      ), D.return = N, N = D;
                      break e;
                    }
                  } else if (j.elementType === ne || typeof ne == "object" && ne !== null && ne.$$typeof === oe && sa(ne) === j.type) {
                    n(
                      N,
                      j.sibling
                    ), D = l(j, E.props), Ml(D, E), D.return = N, N = D;
                    break e;
                  }
                  n(N, j);
                  break;
                } else t(N, j);
                j = j.sibling;
              }
              E.type === H ? (D = ta(
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
              ), Ml(D, E), D.return = N, N = D);
            }
            return d(N);
          case z:
            e: {
              for (ne = E.key; j !== null; ) {
                if (j.key === ne)
                  if (j.tag === 4 && j.stateNode.containerInfo === E.containerInfo && j.stateNode.implementation === E.implementation) {
                    n(
                      N,
                      j.sibling
                    ), D = l(j, E.children || []), D.return = N, N = D;
                    break e;
                  } else {
                    n(N, j);
                    break;
                  }
                else t(N, j);
                j = j.sibling;
              }
              D = Li(E, N.mode, D), D.return = N, N = D;
            }
            return d(N);
          case oe:
            return E = sa(E), Oe(
              N,
              j,
              E,
              D
            );
        }
        if (Ge(E))
          return J(
            N,
            j,
            E,
            D
          );
        if (te(E)) {
          if (ne = te(E), typeof ne != "function") throw Error(c(150));
          return E = ne.call(E), le(
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
        if (E.$$typeof === F)
          return Oe(
            N,
            j,
            Hr(N, E),
            D
          );
        Vr(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, j !== null && j.tag === 6 ? (n(N, j.sibling), D = l(j, E), D.return = N, N = D) : (n(N, j), D = Bi(E, N.mode, D), D.return = N, N = D), d(N)) : n(N, j);
    }
    return function(N, j, E, D) {
      try {
        Al = 0;
        var ne = Oe(
          N,
          j,
          E,
          D
        );
        return Ga = null, ne;
      } catch (W) {
        if (W === qa || W === Gr) throw W;
        var Ne = St(29, W, null, N.mode);
        return Ne.lanes = D, Ne.return = N, Ne;
      } finally {
      }
    };
  }
  var oa = Sd(!0), jd = Sd(!1), En = !1;
  function Wi(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fi(e, t) {
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
  function wn(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (we & 2) !== 0) {
      var l = a.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), a.pending = t, t = Dr(e), rd(e, null, n), t;
    }
    return Rr(e, a, t, n), Dr(e);
  }
  function Ol(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, mu(e, n);
    }
  }
  function Ii(e, t) {
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
  var Pi = !1;
  function Rl() {
    if (Pi) {
      var e = Ha;
      if (e !== null) throw e;
    }
  }
  function Dl(e, t, n, a) {
    Pi = !1;
    var l = e.updateQueue;
    En = !1;
    var i = l.firstBaseUpdate, d = l.lastBaseUpdate, h = l.shared.pending;
    if (h !== null) {
      l.shared.pending = null;
      var v = h, T = v.next;
      v.next = null, d === null ? i = T : d.next = T, d = v;
      var R = e.alternate;
      R !== null && (R = R.updateQueue, h = R.lastBaseUpdate, h !== d && (h === null ? R.firstBaseUpdate = T : h.next = T, R.lastBaseUpdate = v));
    }
    if (i !== null) {
      var L = l.baseState;
      d = 0, R = T = v = null, h = i;
      do {
        var _ = h.lane & -536870913, k = _ !== h.lane;
        if (k ? (be & _) === _ : (a & _) === _) {
          _ !== 0 && _ === La && (Pi = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: null,
            next: null
          });
          e: {
            var J = e, le = h;
            _ = t;
            var Oe = n;
            switch (le.tag) {
              case 1:
                if (J = le.payload, typeof J == "function") {
                  L = J.call(Oe, L, _);
                  break e;
                }
                L = J;
                break e;
              case 3:
                J.flags = J.flags & -65537 | 128;
              case 0:
                if (J = le.payload, _ = typeof J == "function" ? J.call(Oe, L, _) : J, _ == null) break e;
                L = y({}, L, _);
                break e;
              case 2:
                En = !0;
            }
          }
          _ = h.callback, _ !== null && (e.flags |= 64, k && (e.flags |= 8192), k = l.callbacks, k === null ? l.callbacks = [_] : k.push(_));
        } else
          k = {
            lane: _,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          }, R === null ? (T = R = k, v = L) : R = R.next = k, d |= _;
        if (h = h.next, h === null) {
          if (h = l.shared.pending, h === null)
            break;
          k = h, h = k.next, k.next = null, l.lastBaseUpdate = k, l.shared.pending = null;
        }
      } while (!0);
      R === null && (v = L), l.baseState = v, l.firstBaseUpdate = T, l.lastBaseUpdate = R, i === null && (l.shared.lanes = 0), Mn |= d, e.lanes = d, e.memoizedState = L;
    }
  }
  function Cd(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function Nd(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Cd(n[e], t);
  }
  var Ya = C(null), Xr = C(0);
  function Ed(e, t) {
    e = dn, K(Xr, e), K(Ya, t), dn = e | t.baseLanes;
  }
  function eo() {
    K(Xr, dn), K(Ya, Ya.current);
  }
  function to() {
    dn = Xr.current, B(Ya), B(Xr);
  }
  var jt = C(null), Ut = null;
  function _n(e) {
    var t = e.alternate;
    K(Ve, Ve.current & 1), K(jt, e), Ut === null && (t === null || Ya.current !== null || t.memoizedState !== null) && (Ut = e);
  }
  function no(e) {
    K(Ve, Ve.current), K(jt, e), Ut === null && (Ut = e);
  }
  function Td(e) {
    e.tag === 22 ? (K(Ve, Ve.current), K(jt, e), Ut === null && (Ut = e)) : zn();
  }
  function zn() {
    K(Ve, Ve.current), K(jt, jt.current);
  }
  function Ct(e) {
    B(jt), Ut === e && (Ut = null), B(Ve);
  }
  var Ve = C(0);
  function Qr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || cc(n) || uc(n)))
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
  var nn = 0, de = null, Ae = null, Ze = null, Zr = !1, $a = !1, ca = !1, Kr = 0, Ul = 0, Va = null, H2 = 0;
  function Ye() {
    throw Error(c(321));
  }
  function ao(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!vt(e[n], t[n])) return !1;
    return !0;
  }
  function lo(e, t, n, a, l, i) {
    return nn = i, de = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? uf : vo, ca = !1, i = n(a, l), ca = !1, $a && (i = _d(
      t,
      n,
      a,
      l
    )), wd(e), i;
  }
  function wd(e) {
    w.H = Hl;
    var t = Ae !== null && Ae.next !== null;
    if (nn = 0, Ze = Ae = de = null, Zr = !1, Ul = 0, Va = null, t) throw Error(c(300));
    e === null || Ke || (e = e.dependencies, e !== null && Lr(e) && (Ke = !0));
  }
  function _d(e, t, n, a) {
    de = e;
    var l = 0;
    do {
      if ($a && (Va = null), Ul = 0, $a = !1, 25 <= l) throw Error(c(301));
      if (l += 1, Ze = Ae = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      w.H = df, i = t(n, a);
    } while ($a);
    return i;
  }
  function q2() {
    var e = w.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Bl(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (de.flags |= 1024), t;
  }
  function ro() {
    var e = Kr !== 0;
    return Kr = 0, e;
  }
  function so(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function io(e) {
    if (Zr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Zr = !1;
    }
    nn = 0, Ze = Ae = de = null, $a = !1, Ul = Kr = 0, Va = null;
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
        throw de.alternate === null ? Error(c(467)) : Error(c(310));
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
  function Jr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Bl(e) {
    var t = Ul;
    return Ul += 1, Va === null && (Va = []), e = bd(Va, e, t), t = de, (Ze === null ? t.memoizedState : Ze.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? uf : vo), e;
  }
  function Wr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Bl(e);
      if (e.$$typeof === F) return tt(e);
    }
    throw Error(c(438, String(e)));
  }
  function oo(e) {
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
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Jr(), de.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++)
        n[a] = ce;
    return t.index++, n;
  }
  function an(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Fr(e) {
    var t = Xe();
    return co(t, Ae, e);
  }
  function co(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(c(311));
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
      var h = d = null, v = null, T = t, R = !1;
      do {
        var L = T.lane & -536870913;
        if (L !== T.lane ? (be & L) === L : (nn & L) === L) {
          var _ = T.revertLane;
          if (_ === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), L === La && (R = !0);
          else if ((nn & _) === _) {
            T = T.next, _ === La && (R = !0);
            continue;
          } else
            L = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, v === null ? (h = v = L, d = i) : v = v.next = L, de.lanes |= _, Mn |= _;
          L = T.action, ca && n(i, L), i = T.hasEagerState ? T.eagerState : n(i, L);
        } else
          _ = {
            lane: L,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, v === null ? (h = v = _, d = i) : v = v.next = _, de.lanes |= L, Mn |= L;
        T = T.next;
      } while (T !== null && T !== t);
      if (v === null ? d = i : v.next = h, !vt(i, e.memoizedState) && (Ke = !0, R && (n = Ha, n !== null)))
        throw n;
      e.memoizedState = i, e.baseState = d, e.baseQueue = v, a.lastRenderedState = i;
    }
    return l === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function uo(e) {
    var t = Xe(), n = t.queue;
    if (n === null) throw Error(c(311));
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
  function zd(e, t, n) {
    var a = de, l = Xe(), i = ve;
    if (i) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var d = !vt(
      (Ae || l).memoizedState,
      n
    );
    if (d && (l.memoizedState = n, Ke = !0), l = l.queue, ho(Md.bind(null, a, l, e), [
      e
    ]), l.getSnapshot !== t || d || Ze !== null && Ze.memoizedState.tag & 1) {
      if (a.flags |= 2048, Xa(
        9,
        { destroy: void 0 },
        Ad.bind(
          null,
          a,
          l,
          n,
          t
        ),
        null
      ), De === null) throw Error(c(349));
      i || (nn & 127) !== 0 || kd(a, t, n);
    }
    return n;
  }
  function kd(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = de.updateQueue, t === null ? (t = Jr(), de.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Ad(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Od(t) && Rd(e);
  }
  function Md(e, t, n) {
    return n(function() {
      Od(t) && Rd(e);
    });
  }
  function Od(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !vt(e, n);
    } catch {
      return !0;
    }
  }
  function Rd(e) {
    var t = ea(e, 2);
    t !== null && ht(t, e, 2);
  }
  function fo(e) {
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
  function Dd(e, t, n, a) {
    return e.baseState = n, co(
      e,
      Ae,
      typeof a == "function" ? a : an
    );
  }
  function G2(e, t, n, a, l) {
    if (es(e)) throw Error(c(485));
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
      w.T !== null ? n(!0) : i.isTransition = !1, a(i), n = t.pending, n === null ? (i.next = t.pending = i, Ud(t, i)) : (i.next = n.next, t.pending = n.next = i);
    }
  }
  function Ud(e, t) {
    var n = t.action, a = t.payload, l = e.state;
    if (t.isTransition) {
      var i = w.T, d = {};
      w.T = d;
      try {
        var h = n(l, a), v = w.S;
        v !== null && v(d, h), Bd(e, t, h);
      } catch (T) {
        mo(e, t, T);
      } finally {
        i !== null && d.types !== null && (i.types = d.types), w.T = i;
      }
    } else
      try {
        i = n(l, a), Bd(e, t, i);
      } catch (T) {
        mo(e, t, T);
      }
  }
  function Bd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        Ld(e, t, a);
      },
      function(a) {
        return mo(e, t, a);
      }
    ) : Ld(e, t, n);
  }
  function Ld(e, t, n) {
    t.status = "fulfilled", t.value = n, Hd(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ud(e, n)));
  }
  function mo(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, Hd(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Hd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function qd(e, t) {
    return t;
  }
  function Gd(e, t) {
    if (ve) {
      var n = De.formState;
      if (n !== null) {
        e: {
          var a = de;
          if (ve) {
            if (Be) {
              t: {
                for (var l = Be, i = Dt; l.nodeType !== 8; ) {
                  if (!i) {
                    l = null;
                    break t;
                  }
                  if (l = Bt(
                    l.nextSibling
                  ), l === null) {
                    l = null;
                    break t;
                  }
                }
                i = l.data, l = i === "F!" || i === "F" ? l : null;
              }
              if (l) {
                Be = Bt(
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
      lastRenderedReducer: qd,
      lastRenderedState: t
    }, n.queue = a, n = sf.bind(
      null,
      de,
      a
    ), a.dispatch = n, a = fo(!1), i = yo.bind(
      null,
      de,
      !1,
      a.queue
    ), a = it(), l = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = l, n = G2.bind(
      null,
      de,
      l,
      i,
      n
    ), l.dispatch = n, a.memoizedState = e, [t, n, !1];
  }
  function Yd(e) {
    var t = Xe();
    return $d(t, Ae, e);
  }
  function $d(e, t, n) {
    if (t = co(
      e,
      t,
      qd
    )[0], e = Fr(an)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Bl(t);
      } catch (d) {
        throw d === qa ? Gr : d;
      }
    else a = t;
    t = Xe();
    var l = t.queue, i = l.dispatch;
    return n !== t.memoizedState && (de.flags |= 2048, Xa(
      9,
      { destroy: void 0 },
      Y2.bind(null, l, n),
      null
    )), [a, i, e];
  }
  function Y2(e, t) {
    e.action = t;
  }
  function Vd(e) {
    var t = Xe(), n = Ae;
    if (n !== null)
      return $d(t, n, e);
    Xe(), t = t.memoizedState, n = Xe();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, !1];
  }
  function Xa(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = de.updateQueue, t === null && (t = Jr(), de.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Xd() {
    return Xe().memoizedState;
  }
  function Ir(e, t, n, a) {
    var l = it();
    de.flags |= e, l.memoizedState = Xa(
      1 | t,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function Pr(e, t, n, a) {
    var l = Xe();
    a = a === void 0 ? null : a;
    var i = l.memoizedState.inst;
    Ae !== null && a !== null && ao(a, Ae.memoizedState.deps) ? l.memoizedState = Xa(t, i, n, a) : (de.flags |= e, l.memoizedState = Xa(
      1 | t,
      i,
      n,
      a
    ));
  }
  function Qd(e, t) {
    Ir(8390656, 8, e, t);
  }
  function ho(e, t) {
    Pr(2048, 8, e, t);
  }
  function $2(e) {
    de.flags |= 4;
    var t = de.updateQueue;
    if (t === null)
      t = Jr(), de.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Zd(e) {
    var t = Xe().memoizedState;
    return $2({ ref: t, nextImpl: e }), function() {
      if ((we & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Kd(e, t) {
    return Pr(4, 2, e, t);
  }
  function Jd(e, t) {
    return Pr(4, 4, e, t);
  }
  function Wd(e, t) {
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
  function Fd(e, t, n) {
    n = n != null ? n.concat([e]) : null, Pr(4, 4, Wd.bind(null, t, e), n);
  }
  function go() {
  }
  function Id(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && ao(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function Pd(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && ao(t, a[1]))
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
  function po(e, t, n) {
    return n === void 0 || (nn & 1073741824) !== 0 && (be & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = t0(), de.lanes |= e, Mn |= e, n);
  }
  function ef(e, t, n, a) {
    return vt(n, t) ? n : Ya.current !== null ? (e = po(e, n, a), vt(e, t) || (Ke = !0), e) : (nn & 42) === 0 || (nn & 1073741824) !== 0 && (be & 261930) === 0 ? (Ke = !0, e.memoizedState = n) : (e = t0(), de.lanes |= e, Mn |= e, t);
  }
  function tf(e, t, n, a, l) {
    var i = V.p;
    V.p = i !== 0 && 8 > i ? i : 8;
    var d = w.T, h = {};
    w.T = h, yo(e, !1, t, n);
    try {
      var v = l(), T = w.S;
      if (T !== null && T(h, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var R = L2(
          v,
          a
        );
        Ll(
          e,
          t,
          R,
          Tt(e)
        );
      } else
        Ll(
          e,
          t,
          a,
          Tt(e)
        );
    } catch (L) {
      Ll(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: L },
        Tt()
      );
    } finally {
      V.p = i, d !== null && h.types !== null && (d.types = h.types), w.T = d;
    }
  }
  function V2() {
  }
  function xo(e, t, n, a) {
    if (e.tag !== 5) throw Error(c(476));
    var l = nf(e).queue;
    tf(
      e,
      l,
      t,
      ee,
      n === null ? V2 : function() {
        return af(e), n(a);
      }
    );
  }
  function nf(e) {
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
  function af(e) {
    var t = nf(e);
    t.next === null && (t = e.alternate.memoizedState), Ll(
      e,
      t.next.queue,
      {},
      Tt()
    );
  }
  function bo() {
    return tt(tr);
  }
  function lf() {
    return Xe().memoizedState;
  }
  function rf() {
    return Xe().memoizedState;
  }
  function X2(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Tt();
          e = Tn(n);
          var a = wn(t, e, n);
          a !== null && (ht(a, t, n), Ol(a, t, n)), t = { cache: Qi() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Q2(e, t, n) {
    var a = Tt();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, es(e) ? of(t, n) : (n = Di(e, t, n, a), n !== null && (ht(n, e, a), cf(n, t, a)));
  }
  function sf(e, t, n) {
    var a = Tt();
    Ll(e, t, n, a);
  }
  function Ll(e, t, n, a) {
    var l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (es(e)) of(t, l);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var d = t.lastRenderedState, h = i(d, n);
          if (l.hasEagerState = !0, l.eagerState = h, vt(h, d))
            return Rr(e, t, l, 0), De === null && Or(), !1;
        } catch {
        } finally {
        }
      if (n = Di(e, t, l, a), n !== null)
        return ht(n, e, a), cf(n, t, a), !0;
    }
    return !1;
  }
  function yo(e, t, n, a) {
    if (a = {
      lane: 2,
      revertLane: Fo(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, es(e)) {
      if (t) throw Error(c(479));
    } else
      t = Di(
        e,
        n,
        a,
        2
      ), t !== null && ht(t, e, 2);
  }
  function es(e) {
    var t = e.alternate;
    return e === de || t !== null && t === de;
  }
  function of(e, t) {
    $a = Zr = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function cf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, mu(e, n);
    }
  }
  var Hl = {
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
  Hl.useEffectEvent = Ye;
  var uf = {
    readContext: tt,
    use: Wr,
    useCallback: function(e, t) {
      return it().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: tt,
    useEffect: Qd,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Ir(
        4194308,
        4,
        Wd.bind(null, t, e),
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
      }, a.queue = e, e = e.dispatch = Q2.bind(
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
      e = fo(e);
      var t = e.queue, n = sf.bind(null, de, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: go,
    useDeferredValue: function(e, t) {
      var n = it();
      return po(n, e, t);
    },
    useTransition: function() {
      var e = fo(!1);
      return e = tf.bind(
        null,
        de,
        e.queue,
        !0,
        !1
      ), it().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var a = de, l = it();
      if (ve) {
        if (n === void 0)
          throw Error(c(407));
        n = n();
      } else {
        if (n = t(), De === null)
          throw Error(c(349));
        (be & 127) !== 0 || kd(a, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return l.queue = i, Qd(Md.bind(null, a, i, e), [
        e
      ]), a.flags |= 2048, Xa(
        9,
        { destroy: void 0 },
        Ad.bind(
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
      if (ve) {
        var n = $t, a = Yt;
        n = (a & ~(1 << 32 - yt(a) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Kr++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = H2++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: bo,
    useFormState: Gd,
    useActionState: Gd,
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
      return t.queue = n, t = yo.bind(
        null,
        de,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: oo,
    useCacheRefresh: function() {
      return it().memoizedState = X2.bind(
        null,
        de
      );
    },
    useEffectEvent: function(e) {
      var t = it(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((we & 2) !== 0)
          throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, vo = {
    readContext: tt,
    use: Wr,
    useCallback: Id,
    useContext: tt,
    useEffect: ho,
    useImperativeHandle: Fd,
    useInsertionEffect: Kd,
    useLayoutEffect: Jd,
    useMemo: Pd,
    useReducer: Fr,
    useRef: Xd,
    useState: function() {
      return Fr(an);
    },
    useDebugValue: go,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return ef(
        n,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Fr(an)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Bl(e),
        t
      ];
    },
    useSyncExternalStore: zd,
    useId: lf,
    useHostTransitionStatus: bo,
    useFormState: Yd,
    useActionState: Yd,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Dd(n, Ae, e, t);
    },
    useMemoCache: oo,
    useCacheRefresh: rf
  };
  vo.useEffectEvent = Zd;
  var df = {
    readContext: tt,
    use: Wr,
    useCallback: Id,
    useContext: tt,
    useEffect: ho,
    useImperativeHandle: Fd,
    useInsertionEffect: Kd,
    useLayoutEffect: Jd,
    useMemo: Pd,
    useReducer: uo,
    useRef: Xd,
    useState: function() {
      return uo(an);
    },
    useDebugValue: go,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return Ae === null ? po(n, e, t) : ef(
        n,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = uo(an)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Bl(e),
        t
      ];
    },
    useSyncExternalStore: zd,
    useId: lf,
    useHostTransitionStatus: bo,
    useFormState: Vd,
    useActionState: Vd,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Ae !== null ? Dd(n, Ae, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: oo,
    useCacheRefresh: rf
  };
  df.useEffectEvent = Zd;
  function So(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : y({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var jo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var a = Tt(), l = Tn(a);
      l.payload = t, n != null && (l.callback = n), t = wn(e, l, a), t !== null && (ht(t, e, a), Ol(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var a = Tt(), l = Tn(a);
      l.tag = 1, l.payload = t, n != null && (l.callback = n), t = wn(e, l, a), t !== null && (ht(t, e, a), Ol(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Tt(), a = Tn(n);
      a.tag = 2, t != null && (a.callback = t), t = wn(e, a, n), t !== null && (ht(t, e, n), Ol(t, e, n));
    }
  };
  function ff(e, t, n, a, l, i, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, i, d) : t.prototype && t.prototype.isPureReactComponent ? !El(n, a) || !El(l, i) : !0;
  }
  function mf(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && jo.enqueueReplaceState(t, t.state, null);
  }
  function ua(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t)
        a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = y({}, n));
      for (var l in e)
        n[l] === void 0 && (n[l] = e[l]);
    }
    return n;
  }
  function hf(e) {
    Mr(e);
  }
  function gf(e) {
    console.error(e);
  }
  function pf(e) {
    Mr(e);
  }
  function ts(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function xf(e, t, n) {
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
  function Co(e, t, n) {
    return n = Tn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ts(e, t);
    }, n;
  }
  function bf(e) {
    return e = Tn(e), e.tag = 3, e;
  }
  function yf(e, t, n, a) {
    var l = n.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var i = a.value;
      e.payload = function() {
        return l(i);
      }, e.callback = function() {
        xf(t, n, a);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      xf(t, n, a), typeof l != "function" && (On === null ? On = /* @__PURE__ */ new Set([this]) : On.add(this));
      var h = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: h !== null ? h : ""
      });
    });
  }
  function Z2(e, t, n, a, l) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && Ba(
        t,
        n,
        l,
        !0
      ), n = jt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ut === null ? ms() : n.alternate === null && $e === 0 && ($e = 3), n.flags &= -257, n.flags |= 65536, n.lanes = l, a === Yr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Ko(e, a, l)), !1;
          case 22:
            return n.flags |= 65536, a === Yr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), Ko(e, a, l)), !1;
        }
        throw Error(c(435, n.tag));
      }
      return Ko(e, a, l), ms(), !1;
    }
    if (ve)
      return t = jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, a !== Gi && (e = Error(c(422), { cause: a }), _l(Mt(e, n)))) : (a !== Gi && (t = Error(c(423), {
        cause: a
      }), _l(
        Mt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, a = Mt(a, n), l = Co(
        e.stateNode,
        a,
        l
      ), Ii(e, l), $e !== 4 && ($e = 2)), !1;
    var i = Error(c(520), { cause: a });
    if (i = Mt(i, n), Zl === null ? Zl = [i] : Zl.push(i), $e !== 4 && ($e = 2), t === null) return !0;
    a = Mt(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = l & -l, n.lanes |= e, e = Co(n.stateNode, a, e), Ii(n, e), !1;
        case 1:
          if (t = n.type, i = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (On === null || !On.has(i))))
            return n.flags |= 65536, l &= -l, n.lanes |= l, l = bf(l), yf(
              l,
              e,
              n,
              a
            ), Ii(n, l), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var No = Error(c(461)), Ke = !1;
  function nt(e, t, n, a) {
    t.child = e === null ? jd(t, null, n, a) : oa(
      t,
      e.child,
      n,
      a
    );
  }
  function vf(e, t, n, a, l) {
    n = n.render;
    var i = t.ref;
    if ("ref" in a) {
      var d = {};
      for (var h in a)
        h !== "ref" && (d[h] = a[h]);
    } else d = a;
    return la(t), a = lo(
      e,
      t,
      n,
      d,
      i,
      l
    ), h = ro(), e !== null && !Ke ? (so(e, t, l), ln(e, t, l)) : (ve && h && Hi(t), t.flags |= 1, nt(e, t, a, l), t.child);
  }
  function Sf(e, t, n, a, l) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" && !Ui(i) && i.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = i, jf(
        e,
        t,
        i,
        a,
        l
      )) : (e = Ur(
        n.type,
        null,
        a,
        t,
        t.mode,
        l
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !Mo(e, l)) {
      var d = i.memoizedProps;
      if (n = n.compare, n = n !== null ? n : El, n(d, a) && e.ref === t.ref)
        return ln(e, t, l);
    }
    return t.flags |= 1, e = It(i, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function jf(e, t, n, a, l) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (El(i, a) && e.ref === t.ref)
        if (Ke = !1, t.pendingProps = a = i, Mo(e, l))
          (e.flags & 131072) !== 0 && (Ke = !0);
        else
          return t.lanes = e.lanes, ln(e, t, l);
    }
    return Eo(
      e,
      t,
      n,
      a,
      l
    );
  }
  function Cf(e, t, n, a) {
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
        return Nf(
          e,
          t,
          i,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && qr(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? Ed(t, i) : eo(), Td(t);
      else
        return a = t.lanes = 536870912, Nf(
          e,
          t,
          i !== null ? i.baseLanes | n : n,
          n,
          a
        );
    } else
      i !== null ? (qr(t, i.cachePool), Ed(t, i), zn(), t.memoizedState = null) : (e !== null && qr(t, null), eo(), zn());
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
  function Nf(e, t, n, a, l) {
    var i = Ki();
    return i = i === null ? null : { parent: Qe._currentValue, pool: i }, t.memoizedState = {
      baseLanes: n,
      cachePool: i
    }, e !== null && qr(t, null), eo(), Td(t), e !== null && Ba(e, t, a, !0), t.childLanes = l, null;
  }
  function ns(e, t) {
    return t = ls(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Ef(e, t, n) {
    return oa(t, e.child, null, n), e = ns(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function K2(e, t, n) {
    var a = t.pendingProps, l = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ve) {
        if (a.mode === "hidden")
          return e = ns(t, a), t.lanes = 536870912, ql(null, e);
        if (no(t), (e = Be) ? (e = B0(
          e,
          Dt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Sn !== null ? { id: Yt, overflow: $t } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = id(e), n.return = t, t.child = n, et = t, Be = null)) : e = null, e === null) throw Cn(t);
        return t.lanes = 536870912, null;
      }
      return ns(t, a);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var d = i.dehydrated;
      if (no(t), l)
        if (t.flags & 256)
          t.flags &= -257, t = Ef(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Ke || Ba(e, t, n, !1), l = (n & e.childLanes) !== 0, Ke || l) {
        if (a = De, a !== null && (d = hu(a, n), d !== 0 && d !== i.retryLane))
          throw i.retryLane = d, ea(e, d), ht(a, e, d), No;
        ms(), t = Ef(
          e,
          t,
          n
        );
      } else
        e = i.treeContext, Be = Bt(d.nextSibling), et = t, ve = !0, jn = null, Dt = !1, e !== null && ud(t, e), t = ns(t, a), t.flags |= 4096;
      return t;
    }
    return e = It(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function as(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(c(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Eo(e, t, n, a, l) {
    return la(t), n = lo(
      e,
      t,
      n,
      a,
      void 0,
      l
    ), a = ro(), e !== null && !Ke ? (so(e, t, l), ln(e, t, l)) : (ve && a && Hi(t), t.flags |= 1, nt(e, t, n, l), t.child);
  }
  function Tf(e, t, n, a, l, i) {
    return la(t), t.updateQueue = null, n = _d(
      t,
      a,
      n,
      l
    ), wd(e), a = ro(), e !== null && !Ke ? (so(e, t, i), ln(e, t, i)) : (ve && a && Hi(t), t.flags |= 1, nt(e, t, n, i), t.child);
  }
  function wf(e, t, n, a, l) {
    if (la(t), t.stateNode === null) {
      var i = Oa, d = n.contextType;
      typeof d == "object" && d !== null && (i = tt(d)), i = new n(a, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = jo, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = a, i.state = t.memoizedState, i.refs = {}, Wi(t), d = n.contextType, i.context = typeof d == "object" && d !== null ? tt(d) : Oa, i.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (So(
        t,
        n,
        d,
        a
      ), i.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (d = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), d !== i.state && jo.enqueueReplaceState(i, i.state, null), Dl(t, a, i, l), Rl(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      i = t.stateNode;
      var h = t.memoizedProps, v = ua(n, h);
      i.props = v;
      var T = i.context, R = n.contextType;
      d = Oa, typeof R == "object" && R !== null && (d = tt(R));
      var L = n.getDerivedStateFromProps;
      R = typeof L == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, R || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || T !== d) && mf(
        t,
        i,
        a,
        d
      ), En = !1;
      var _ = t.memoizedState;
      i.state = _, Dl(t, a, i, l), Rl(), T = t.memoizedState, h || _ !== T || En ? (typeof L == "function" && (So(
        t,
        n,
        L,
        a
      ), T = t.memoizedState), (v = En || ff(
        t,
        n,
        v,
        a,
        _,
        T,
        d
      )) ? (R || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = T), i.props = a, i.state = T, i.context = d, a = v) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      i = t.stateNode, Fi(e, t), d = t.memoizedProps, R = ua(n, d), i.props = R, L = t.pendingProps, _ = i.context, T = n.contextType, v = Oa, typeof T == "object" && T !== null && (v = tt(T)), h = n.getDerivedStateFromProps, (T = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (d !== L || _ !== v) && mf(
        t,
        i,
        a,
        v
      ), En = !1, _ = t.memoizedState, i.state = _, Dl(t, a, i, l), Rl();
      var k = t.memoizedState;
      d !== L || _ !== k || En || e !== null && e.dependencies !== null && Lr(e.dependencies) ? (typeof h == "function" && (So(
        t,
        n,
        h,
        a
      ), k = t.memoizedState), (R = En || ff(
        t,
        n,
        R,
        a,
        _,
        k,
        v
      ) || e !== null && e.dependencies !== null && Lr(e.dependencies)) ? (T || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, k, v), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        a,
        k,
        v
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = k), i.props = a, i.state = k, i.context = v, a = R) : (typeof i.componentDidUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return i = a, as(e, t), a = (t.flags & 128) !== 0, i || a ? (i = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && a ? (t.child = oa(
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
  function _f(e, t, n, a) {
    return na(), t.flags |= 256, nt(e, t, n, a), t.child;
  }
  var To = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function wo(e) {
    return { baseLanes: e, cachePool: pd() };
  }
  function _o(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Et), e;
  }
  function zf(e, t, n) {
    var a = t.pendingProps, l = !1, i = (t.flags & 128) !== 0, d;
    if ((d = i) || (d = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0), d && (l = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ve) {
        if (l ? _n(t) : zn(), (e = Be) ? (e = B0(
          e,
          Dt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Sn !== null ? { id: Yt, overflow: $t } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = id(e), n.return = t, t.child = n, et = t, Be = null)) : e = null, e === null) throw Cn(t);
        return uc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var h = a.children;
      return a = a.fallback, l ? (zn(), l = t.mode, h = ls(
        { mode: "hidden", children: h },
        l
      ), a = ta(
        a,
        l,
        n,
        null
      ), h.return = t, a.return = t, h.sibling = a, t.child = h, a = t.child, a.memoizedState = wo(n), a.childLanes = _o(
        e,
        d,
        n
      ), t.memoizedState = To, ql(null, a)) : (_n(t), zo(t, h));
    }
    var v = e.memoizedState;
    if (v !== null && (h = v.dehydrated, h !== null)) {
      if (i)
        t.flags & 256 ? (_n(t), t.flags &= -257, t = ko(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (zn(), t.child = e.child, t.flags |= 128, t = null) : (zn(), h = a.fallback, l = t.mode, a = ls(
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
        ), a = t.child, a.memoizedState = wo(n), a.childLanes = _o(
          e,
          d,
          n
        ), t.memoizedState = To, t = ql(null, a));
      else if (_n(t), uc(h)) {
        if (d = h.nextSibling && h.nextSibling.dataset, d) var T = d.dgst;
        d = T, a = Error(c(419)), a.stack = "", a.digest = d, _l({ value: a, source: null, stack: null }), t = ko(
          e,
          t,
          n
        );
      } else if (Ke || Ba(e, t, n, !1), d = (n & e.childLanes) !== 0, Ke || d) {
        if (d = De, d !== null && (a = hu(d, n), a !== 0 && a !== v.retryLane))
          throw v.retryLane = a, ea(e, a), ht(d, e, a), No;
        cc(h) || ms(), t = ko(
          e,
          t,
          n
        );
      } else
        cc(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = v.treeContext, Be = Bt(
          h.nextSibling
        ), et = t, ve = !0, jn = null, Dt = !1, e !== null && ud(t, e), t = zo(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return l ? (zn(), h = a.fallback, l = t.mode, v = e.child, T = v.sibling, a = It(v, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = v.subtreeFlags & 65011712, T !== null ? h = It(
      T,
      h
    ) : (h = ta(
      h,
      l,
      n,
      null
    ), h.flags |= 2), h.return = t, a.return = t, a.sibling = h, t.child = a, ql(null, a), a = t.child, h = e.child.memoizedState, h === null ? h = wo(n) : (l = h.cachePool, l !== null ? (v = Qe._currentValue, l = l.parent !== v ? { parent: v, pool: v } : l) : l = pd(), h = {
      baseLanes: h.baseLanes | n,
      cachePool: l
    }), a.memoizedState = h, a.childLanes = _o(
      e,
      d,
      n
    ), t.memoizedState = To, ql(e.child, a)) : (_n(t), n = e.child, e = n.sibling, n = It(n, {
      mode: "visible",
      children: a.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function zo(e, t) {
    return t = ls(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function ls(e, t) {
    return e = St(22, e, null, t), e.lanes = 0, e;
  }
  function ko(e, t, n) {
    return oa(t, e.child, null, n), e = zo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function kf(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Vi(e.return, t, n);
  }
  function Ao(e, t, n, a, l, i) {
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
  function Af(e, t, n) {
    var a = t.pendingProps, l = a.revealOrder, i = a.tail;
    a = a.children;
    var d = Ve.current, h = (d & 2) !== 0;
    if (h ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, K(Ve, d), nt(e, t, a, n), a = ve ? wl : 0, !h && e !== null && (e.flags & 128) !== 0)
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
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && Qr(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Ao(
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
          if (e = l.alternate, e !== null && Qr(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        Ao(
          t,
          !0,
          n,
          null,
          i,
          a
        );
        break;
      case "together":
        Ao(
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
        if (Ba(
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
  function Mo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Lr(e)));
  }
  function J2(e, t, n) {
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
          return t.flags |= 128, no(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (_n(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? zf(e, t, n) : (_n(t), e = ln(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        _n(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (Ba(
          e,
          t,
          n,
          !1
        ), a = (n & t.childLanes) !== 0), l) {
          if (a)
            return Af(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), K(Ve, Ve.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Cf(
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
  function Mf(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ke = !0;
      else {
        if (!Mo(e, n) && (t.flags & 128) === 0)
          return Ke = !1, J2(
            e,
            t,
            n
          );
        Ke = (e.flags & 131072) !== 0;
      }
    else
      Ke = !1, ve && (t.flags & 1048576) !== 0 && cd(t, wl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = sa(t.elementType), t.type = e, typeof e == "function")
            Ui(e) ? (a = ua(e, a), t.tag = 1, t = wf(
              null,
              t,
              e,
              a,
              n
            )) : (t.tag = 0, t = Eo(
              null,
              t,
              e,
              a,
              n
            ));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === ie) {
                t.tag = 11, t = vf(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              } else if (l === Y) {
                t.tag = 14, t = Sf(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              }
            }
            throw t = me(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return Eo(
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
        ), wf(
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
          ), e === null) throw Error(c(387));
          a = t.pendingProps;
          var i = t.memoizedState;
          l = i.element, Fi(e, t), Dl(t, a, null, n);
          var d = t.memoizedState;
          if (a = d.cache, Nn(t, Qe, a), a !== i.cache && Xi(
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
              t = _f(
                e,
                t,
                a,
                n
              );
              break e;
            } else if (a !== l) {
              l = Mt(
                Error(c(424)),
                t
              ), _l(l), t = _f(
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
              for (Be = Bt(e.firstChild), et = t, ve = !0, jn = null, Dt = !0, n = jd(
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
        return as(e, t), e === null ? (n = $0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : ve || (n = t.type, e = t.pendingProps, a = vs(
          Z.current
        ).createElement(n), a[Pe] = t, a[ot] = e, at(a, n, e), Fe(a), t.stateNode = a) : t.memoizedState = $0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Zn(t), e === null && ve && (a = t.stateNode = q0(
          t.type,
          t.pendingProps,
          Z.current
        ), et = t, Dt = !0, l = Be, Bn(t.type) ? (dc = l, Be = Bt(a.firstChild)) : Be = l), nt(
          e,
          t,
          t.pendingProps.children,
          n
        ), as(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ve && ((l = a = Be) && (a = Eh(
          a,
          t.type,
          t.pendingProps,
          Dt
        ), a !== null ? (t.stateNode = a, et = t, Be = Bt(a.firstChild), Dt = !1, l = !0) : l = !1), l || Cn(t)), Zn(t), l = t.type, i = t.pendingProps, d = e !== null ? e.memoizedProps : null, a = i.children, sc(l, i) ? a = null : d !== null && sc(l, d) && (t.flags |= 32), t.memoizedState !== null && (l = lo(
          e,
          t,
          q2,
          null,
          null,
          n
        ), tr._currentValue = l), as(e, t), nt(e, t, a, n), t.child;
      case 6:
        return e === null && ve && ((e = n = Be) && (n = Th(
          n,
          t.pendingProps,
          Dt
        ), n !== null ? (t.stateNode = n, et = t, Be = null, e = !0) : e = !1), e || Cn(t)), null;
      case 13:
        return zf(e, t, n);
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
        return vf(
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
        return Sf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return jf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Af(e, t, n);
      case 31:
        return K2(e, t, n);
      case 22:
        return Cf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return la(t), a = tt(Qe), e === null ? (l = Ki(), l === null && (l = De, i = Qi(), l.pooledCache = i, i.refCount++, i !== null && (l.pooledCacheLanes |= n), l = i), t.memoizedState = { parent: a, cache: l }, Wi(t), Nn(t, Qe, l)) : ((e.lanes & n) !== 0 && (Fi(e, t), Dl(t, null, null, n), Rl()), l = e.memoizedState, i = t.memoizedState, l.parent !== a ? (l = { parent: a, cache: a }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), Nn(t, Qe, a)) : (a = i.cache, Nn(t, Qe, a), a !== l.cache && Xi(
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
  function Oo(e, t, n, a, l) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (l & 335544128) === l)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (r0()) e.flags |= 8192;
        else
          throw ia = Yr, Ji;
    } else e.flags &= -16777217;
  }
  function Of(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !K0(t))
      if (r0()) e.flags |= 8192;
      else
        throw ia = Yr, Ji;
  }
  function rs(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? du() : 536870912, e.lanes |= t, Ja |= t);
  }
  function Gl(e, t) {
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
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function Le(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t)
      for (var l = e.child; l !== null; )
        n |= l.lanes | l.childLanes, a |= l.subtreeFlags & 65011712, a |= l.flags & 65011712, l.return = e, l = l.sibling;
    else
      for (l = e.child; l !== null; )
        n |= l.lanes | l.childLanes, a |= l.subtreeFlags, a |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function W2(e, t, n) {
    var a = t.pendingProps;
    switch (qi(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Le(t), null;
      case 1:
        return Le(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), tn(Qe), Te(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ua(t) ? rn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Yi())), Le(t), null;
      case 26:
        var l = t.type, i = t.memoizedState;
        return e === null ? (rn(t), i !== null ? (Le(t), Of(t, i)) : (Le(t), Oo(
          t,
          l,
          null,
          a,
          n
        ))) : i ? i !== e.memoizedState ? (rn(t), Le(t), Of(t, i)) : (Le(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && rn(t), Le(t), Oo(
          t,
          l,
          e,
          a,
          n
        )), null;
      case 27:
        if (pr(t), n = Z.current, l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && rn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Le(t), null;
          }
          e = O.current, Ua(t) ? dd(t) : (e = q0(l, a, n), t.stateNode = e, rn(t));
        }
        return Le(t), null;
      case 5:
        if (pr(t), l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && rn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Le(t), null;
          }
          if (i = O.current, Ua(t))
            dd(t);
          else {
            var d = vs(
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
        return Le(t), Oo(
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
            throw Error(c(166));
          if (e = Z.current, Ua(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, l = et, l !== null)
              switch (l.tag) {
                case 27:
                case 5:
                  a = l.memoizedProps;
              }
            e[Pe] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || z0(e.nodeValue, n)), e || Cn(t, !0);
          } else
            e = vs(e).createTextNode(
              a
            ), e[Pe] = t, t.stateNode = e;
        }
        return Le(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Ua(t), n !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Pe] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Le(t), e = !1;
          } else
            n = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return Le(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (l = Ua(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(c(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(c(317));
              l[Pe] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Le(t), l = !1;
          } else
            l = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = !0;
          if (!l)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = a !== null, e = e !== null && e.memoizedState !== null, n && (a = t.child, l = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (l = a.alternate.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== l && (a.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), rs(t, t.updateQueue), Le(t), null);
      case 4:
        return Te(), e === null && tc(t.stateNode.containerInfo), Le(t), null;
      case 10:
        return tn(t.type), Le(t), null;
      case 19:
        if (B(Ve), a = t.memoizedState, a === null) return Le(t), null;
        if (l = (t.flags & 128) !== 0, i = a.rendering, i === null)
          if (l) Gl(a, !1);
          else {
            if ($e !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = Qr(e), i !== null) {
                  for (t.flags |= 128, Gl(a, !1), e = i.updateQueue, t.updateQueue = e, rs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    sd(n, e), n = n.sibling;
                  return K(
                    Ve,
                    Ve.current & 1 | 2
                  ), ve && Pt(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && xt() > us && (t.flags |= 128, l = !0, Gl(a, !1), t.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = Qr(i), e !== null) {
              if (t.flags |= 128, l = !0, e = e.updateQueue, t.updateQueue = e, rs(t, e), Gl(a, !0), a.tail === null && a.tailMode === "hidden" && !i.alternate && !ve)
                return Le(t), null;
            } else
              2 * xt() - a.renderingStartTime > us && n !== 536870912 && (t.flags |= 128, l = !0, Gl(a, !1), t.lanes = 4194304);
          a.isBackwards ? (i.sibling = t.child, t.child = i) : (e = a.last, e !== null ? e.sibling = i : t.child = i, a.last = i);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = xt(), e.sibling = null, n = Ve.current, K(
          Ve,
          l ? n & 1 | 2 : n & 1
        ), ve && Pt(t, a.treeForkCount), e) : (Le(t), null);
      case 22:
      case 23:
        return Ct(t), to(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Le(t), n = t.updateQueue, n !== null && rs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && B(ra), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), tn(Qe), Le(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function F2(e, t) {
    switch (qi(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return tn(Qe), Te(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return pr(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null)
            throw Error(c(340));
          na();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          na();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return B(Ve), null;
      case 4:
        return Te(), null;
      case 10:
        return tn(t.type), null;
      case 22:
      case 23:
        return Ct(t), to(), e !== null && B(ra), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return tn(Qe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Rf(e, t) {
    switch (qi(t), t.tag) {
      case 3:
        tn(Qe), Te();
        break;
      case 26:
      case 27:
      case 5:
        pr(t);
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
        B(Ve);
        break;
      case 10:
        tn(t.type);
        break;
      case 22:
      case 23:
        Ct(t), to(), e !== null && B(ra);
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
              var v = n, T = h;
              try {
                T();
              } catch (R) {
                ke(
                  l,
                  v,
                  R
                );
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (R) {
      ke(t, t.return, R);
    }
  }
  function Df(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Nd(t, n);
      } catch (a) {
        ke(e, e.return, a);
      }
    }
  }
  function Uf(e, t, n) {
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
  function Bf(e) {
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
  function Ro(e, t, n) {
    try {
      var a = e.stateNode;
      yh(a, e.type, n, t), a[ot] = t;
    } catch (l) {
      ke(e, e.return, l);
    }
  }
  function Lf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Bn(e.type) || e.tag === 4;
  }
  function Do(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Lf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Bn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Uo(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Wt));
    else if (a !== 4 && (a === 27 && Bn(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Uo(e, t, n), e = e.sibling; e !== null; )
        Uo(e, t, n), e = e.sibling;
  }
  function ss(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && Bn(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (ss(e, t, n), e = e.sibling; e !== null; )
        ss(e, t, n), e = e.sibling;
  }
  function Hf(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      at(t, a, n), t[Pe] = e, t[ot] = n;
    } catch (i) {
      ke(e, e.return, i);
    }
  }
  var sn = !1, Je = !1, Bo = !1, qf = typeof WeakSet == "function" ? WeakSet : Set, Ie = null;
  function I2(e, t) {
    if (e = e.containerInfo, lc = ws, e = Fu(e), zi(e)) {
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
            var d = 0, h = -1, v = -1, T = 0, R = 0, L = e, _ = null;
            t: for (; ; ) {
              for (var k; L !== n || l !== 0 && L.nodeType !== 3 || (h = d + l), L !== i || a !== 0 && L.nodeType !== 3 || (v = d + a), L.nodeType === 3 && (d += L.nodeValue.length), (k = L.firstChild) !== null; )
                _ = L, L = k;
              for (; ; ) {
                if (L === e) break t;
                if (_ === n && ++T === l && (h = d), _ === i && ++R === a && (v = d), (k = L.nextSibling) !== null) break;
                L = _, _ = L.parentNode;
              }
              L = k;
            }
            n = h === -1 || v === -1 ? null : { start: h, end: v };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (rc = { focusedElem: e, selectionRange: n }, ws = !1, Ie = t; Ie !== null; )
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
                  var J = ua(
                    n.type,
                    l
                  );
                  e = a.getSnapshotBeforeUpdate(
                    J,
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
                  oc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      oc(e);
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
  function Gf(e, t, n) {
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
        a & 64 && Df(n), a & 512 && $l(n, n.return);
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
            Nd(e, t);
          } catch (d) {
            ke(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Hf(n);
      case 26:
      case 5:
        cn(e, n), t === null && a & 4 && Bf(n), a & 512 && $l(n, n.return);
        break;
      case 12:
        cn(e, n);
        break;
      case 31:
        cn(e, n), a & 4 && Vf(e, n);
        break;
      case 13:
        cn(e, n), a & 4 && Xf(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = ih.bind(
          null,
          n
        ), wh(e, n))));
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
  function Yf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Yf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && fi(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var qe = null, ut = !1;
  function on(e, t, n) {
    for (n = n.child; n !== null; )
      $f(e, t, n), n = n.sibling;
  }
  function $f(e, t, n) {
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
        Bn(n.type) && (qe = n.stateNode, ut = !1), on(
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
        qe !== null && (ut ? (e = qe, D0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), al(e)) : D0(qe, n.stateNode));
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
        Je || (Vt(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && Uf(
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
  function Vf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        al(e);
      } catch (n) {
        ke(t, t.return, n);
      }
    }
  }
  function Xf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        al(e);
      } catch (n) {
        ke(t, t.return, n);
      }
  }
  function P2(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new qf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new qf()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function is(e, t) {
    var n = P2(e);
    t.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var l = oh.bind(null, e, a);
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
              if (Bn(h.type)) {
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
        if (qe === null) throw Error(c(160));
        $f(i, d, l), qe = null, ut = !1, i = l.alternate, i !== null && (i.return = null), l.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Qf(t, e), t = t.sibling;
  }
  var qt = null;
  function Qf(e, t) {
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
                      var d = Q0(
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
                      if (d = Q0(
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
                      throw Error(c(468, a));
                  }
                  i[Pe] = e, Fe(i), a = i;
                }
                e.stateNode = a;
              } else
                Z0(
                  l,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = X0(
                l,
                a,
                e.memoizedProps
              );
          else
            i !== a ? (i === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : i.count--, a === null ? Z0(
              l,
              e.type,
              e.stateNode
            ) : X0(
              l,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Ro(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        dt(t, e), ft(e), a & 512 && (Je || n === null || Vt(n, n.return)), n !== null && a & 4 && Ro(
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
          } catch (J) {
            ke(e, e.return, J);
          }
        }
        a & 4 && e.stateNode != null && (l = e.memoizedProps, Ro(
          e,
          l,
          n !== null ? n.memoizedProps : l
        )), a & 1024 && (Bo = !0);
        break;
      case 6:
        if (dt(t, e), ft(e), a & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (J) {
            ke(e, e.return, J);
          }
        }
        break;
      case 3:
        if (Cs = null, l = qt, qt = Ss(t.containerInfo), dt(t, e), qt = l, ft(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            al(t.containerInfo);
          } catch (J) {
            ke(e, e.return, J);
          }
        Bo && (Bo = !1, Zf(e));
        break;
      case 4:
        a = qt, qt = Ss(
          e.stateNode.containerInfo
        ), dt(t, e), ft(e), qt = a;
        break;
      case 12:
        dt(t, e), ft(e);
        break;
      case 31:
        dt(t, e), ft(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, is(e, a)));
        break;
      case 13:
        dt(t, e), ft(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (cs = xt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, is(e, a)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var v = n !== null && n.memoizedState !== null, T = sn, R = Je;
        if (sn = T || l, Je = R || v, dt(t, e), Je = R, sn = T, ft(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (n === null || v || sn || Je || da(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                v = n = t;
                try {
                  if (i = v.stateNode, l)
                    d = i.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    h = v.stateNode;
                    var L = v.memoizedProps.style, _ = L != null && L.hasOwnProperty("display") ? L.display : null;
                    h.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (J) {
                  ke(v, v.return, J);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                v = t;
                try {
                  v.stateNode.nodeValue = l ? "" : v.memoizedProps;
                } catch (J) {
                  ke(v, v.return, J);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                v = t;
                try {
                  var k = v.stateNode;
                  l ? U0(k, !0) : U0(v.stateNode, !1);
                } catch (J) {
                  ke(v, v.return, J);
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
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, is(e, n))));
        break;
      case 19:
        dt(t, e), ft(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, is(e, a)));
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
          if (Lf(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var l = n.stateNode, i = Do(e);
            ss(e, i, l);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (Ta(d, ""), n.flags &= -33);
            var h = Do(e);
            ss(e, h, d);
            break;
          case 3:
          case 4:
            var v = n.stateNode.containerInfo, T = Do(e);
            Uo(
              e,
              T,
              v
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (R) {
        ke(e, e.return, R);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Zf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Zf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function cn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Gf(e, t.alternate, t), t = t.sibling;
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
          typeof n.componentWillUnmount == "function" && Uf(
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
              var v = l.shared.hiddenCallbacks;
              if (v !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < v.length; l++)
                  Cd(v[l], h);
            } catch (T) {
              ke(a, a.return, T);
            }
          }
          n && d & 64 && Df(i), $l(i, i.return);
          break;
        case 27:
          Hf(i);
        case 26:
        case 5:
          un(
            l,
            i,
            n
          ), n && a === null && d & 4 && Bf(i), $l(i, i.return);
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
          ), n && d & 4 && Vf(l, i);
          break;
        case 13:
          un(
            l,
            i,
            n
          ), n && d & 4 && Xf(l, i);
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
  function Lo(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && zl(n));
  }
  function Ho(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && zl(e));
  }
  function Gt(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Kf(
          e,
          t,
          n,
          a
        ), t = t.sibling;
  }
  function Kf(e, t, n, a) {
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
          } catch (v) {
            ke(t, t.return, v);
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
        )), l & 2048 && Lo(d, t);
        break;
      case 24:
        Gt(
          e,
          t,
          n,
          a
        ), l & 2048 && Ho(t.alternate, t);
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
      var i = e, d = t, h = n, v = a, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Qa(
            i,
            d,
            h,
            v,
            l
          ), Yl(8, d);
          break;
        case 23:
          break;
        case 22:
          var R = d.stateNode;
          d.memoizedState !== null ? R._visibility & 2 ? Qa(
            i,
            d,
            h,
            v,
            l
          ) : Vl(
            i,
            d
          ) : (R._visibility |= 2, Qa(
            i,
            d,
            h,
            v,
            l
          )), l && T & 2048 && Lo(
            d.alternate,
            d
          );
          break;
        case 24:
          Qa(
            i,
            d,
            h,
            v,
            l
          ), l && T & 2048 && Ho(d.alternate, d);
          break;
        default:
          Qa(
            i,
            d,
            h,
            v,
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
            Vl(n, a), l & 2048 && Lo(
              a.alternate,
              a
            );
            break;
          case 24:
            Vl(n, a), l & 2048 && Ho(a.alternate, a);
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
        Jf(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Jf(e, t, n) {
    switch (e.tag) {
      case 26:
        Za(
          e,
          t,
          n
        ), e.flags & Xl && e.memoizedState !== null && Hh(
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
        qt = Ss(e.stateNode.containerInfo), Za(
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
  function Wf(e) {
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
          Ie = a, If(
            a,
            e
          );
        }
      Wf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Ff(e), e = e.sibling;
  }
  function Ff(e) {
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
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, os(e)) : Ql(e);
        break;
      default:
        Ql(e);
    }
  }
  function os(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          Ie = a, If(
            a,
            e
          );
        }
      Wf(e);
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
  function If(e, t) {
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
          if (Yf(a), a === n) {
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
  var eh = {
    getCacheForType: function(e) {
      var t = tt(Qe), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return tt(Qe).controller.signal;
    }
  }, th = typeof WeakMap == "function" ? WeakMap : Map, we = 0, De = null, he = null, be = 0, ze = 0, Nt = null, An = !1, Ka = !1, qo = !1, dn = 0, $e = 0, Mn = 0, fa = 0, Go = 0, Et = 0, Ja = 0, Zl = null, mt = null, Yo = !1, cs = 0, Pf = 0, us = 1 / 0, ds = null, On = null, We = 0, Rn = null, Wa = null, fn = 0, $o = 0, Vo = null, e0 = null, Kl = 0, Xo = null;
  function Tt() {
    return (we & 2) !== 0 && be !== 0 ? be & -be : w.T !== null ? Fo() : gu();
  }
  function t0() {
    if (Et === 0)
      if ((be & 536870912) === 0 || ve) {
        var e = yr;
        yr <<= 1, (yr & 3932160) === 0 && (yr = 262144), Et = e;
      } else Et = 536870912;
    return e = jt.current, e !== null && (e.flags |= 32), Et;
  }
  function ht(e, t, n) {
    (e === De && (ze === 2 || ze === 9) || e.cancelPendingCommit !== null) && (Fa(e, 0), Dn(
      e,
      be,
      Et,
      !1
    )), gl(e, n), ((we & 2) === 0 || e !== De) && (e === De && ((we & 2) === 0 && (fa |= n), $e === 4 && Dn(
      e,
      be,
      Et,
      !1
    )), Xt(e));
  }
  function n0(e, t, n) {
    if ((we & 6) !== 0) throw Error(c(327));
    var a = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || hl(e, t), l = a ? lh(e, t) : Zo(e, t, !0), i = a;
    do {
      if (l === 0) {
        Ka && !a && Dn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, i && !nh(n)) {
          l = Zo(e, t, !1), i = !1;
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
              var v = h.current.memoizedState.isDehydrated;
              if (v && (Fa(h, d).flags |= 256), d = Zo(
                h,
                d,
                !1
              ), d !== 2) {
                if (qo && !v) {
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
              throw Error(c(345));
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
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (l = cs + 300 - xt(), 10 < l)) {
            if (Dn(
              a,
              t,
              Et,
              !An
            ), Sr(a, 0, !0) !== 0) break e;
            fn = t, a.timeoutHandle = O0(
              a0.bind(
                null,
                a,
                n,
                mt,
                ds,
                Yo,
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
          a0(
            a,
            n,
            mt,
            ds,
            Yo,
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
  function a0(e, t, n, a, l, i, d, h, v, T, R, L, _, k) {
    if (e.timeoutHandle = -1, L = t.subtreeFlags, L & 8192 || (L & 16785408) === 16785408) {
      L = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wt
      }, Jf(
        t,
        i,
        L
      );
      var J = (i & 62914560) === i ? cs - xt() : (i & 4194048) === i ? Pf - xt() : 0;
      if (J = qh(
        L,
        J
      ), J !== null) {
        fn = i, e.cancelPendingCommit = J(
          d0.bind(
            null,
            e,
            t,
            i,
            n,
            a,
            l,
            d,
            h,
            v,
            R,
            L,
            null,
            _,
            k
          )
        ), Dn(e, i, d, !T);
        return;
      }
    }
    d0(
      e,
      t,
      i,
      n,
      a,
      l,
      d,
      h,
      v
    );
  }
  function nh(e) {
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
    t &= ~Go, t &= ~fa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var l = t; 0 < l; ) {
      var i = 31 - yt(l), d = 1 << i;
      a[i] = -1, l &= ~d;
    }
    n !== 0 && fu(e, n, t);
  }
  function fs() {
    return (we & 6) === 0 ? (Jl(0), !1) : !0;
  }
  function Qo() {
    if (he !== null) {
      if (ze === 0)
        var e = he.return;
      else
        e = he, en = aa = null, io(e), Ga = null, Al = 0, e = he;
      for (; e !== null; )
        Rf(e.alternate, e), e = e.return;
      he = null;
    }
  }
  function Fa(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, jh(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), fn = 0, Qo(), De = e, he = n = It(e.current, null), be = t, ze = 0, Nt = null, An = !1, Ka = hl(e, t), qo = !1, Ja = Et = Go = fa = Mn = $e = 0, mt = Zl = null, Yo = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - yt(a), i = 1 << l;
        t |= e[l], a &= ~i;
      }
    return dn = t, Or(), n;
  }
  function l0(e, t) {
    de = null, w.H = Hl, t === qa || t === Gr ? (t = yd(), ze = 3) : t === Ji ? (t = yd(), ze = 4) : ze = t === No ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Nt = t, he === null && ($e = 1, ts(
      e,
      Mt(t, e.current)
    ));
  }
  function r0() {
    var e = jt.current;
    return e === null ? !0 : (be & 4194048) === be ? Ut === null : (be & 62914560) === be || (be & 536870912) !== 0 ? e === Ut : !1;
  }
  function s0() {
    var e = w.H;
    return w.H = Hl, e === null ? Hl : e;
  }
  function i0() {
    var e = w.A;
    return w.A = eh, e;
  }
  function ms() {
    $e = 4, An || (be & 4194048) !== be && jt.current !== null || (Ka = !0), (Mn & 134217727) === 0 && (fa & 134217727) === 0 || De === null || Dn(
      De,
      be,
      Et,
      !1
    );
  }
  function Zo(e, t, n) {
    var a = we;
    we |= 2;
    var l = s0(), i = i0();
    (De !== e || be !== t) && (ds = null, Fa(e, t)), t = !1;
    var d = $e;
    e: do
      try {
        if (ze !== 0 && he !== null) {
          var h = he, v = Nt;
          switch (ze) {
            case 8:
              Qo(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var T = ze;
              if (ze = 0, Nt = null, Ia(e, h, v, T), n && Ka) {
                d = 0;
                break e;
              }
              break;
            default:
              T = ze, ze = 0, Nt = null, Ia(e, h, v, T);
          }
        }
        ah(), d = $e;
        break;
      } catch (R) {
        l0(e, R);
      }
    while (!0);
    return t && e.shellSuspendCounter++, en = aa = null, we = a, w.H = l, w.A = i, he === null && (De = null, be = 0, Or()), d;
  }
  function ah() {
    for (; he !== null; ) o0(he);
  }
  function lh(e, t) {
    var n = we;
    we |= 2;
    var a = s0(), l = i0();
    De !== e || be !== t ? (ds = null, us = xt() + 500, Fa(e, t)) : Ka = hl(
      e,
      t
    );
    e: do
      try {
        if (ze !== 0 && he !== null) {
          t = he;
          var i = Nt;
          t: switch (ze) {
            case 1:
              ze = 0, Nt = null, Ia(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (xd(i)) {
                ze = 0, Nt = null, c0(t);
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
              xd(i) ? (ze = 0, Nt = null, c0(t)) : (ze = 0, Nt = null, Ia(e, t, i, 7));
              break;
            case 5:
              var d = null;
              switch (he.tag) {
                case 26:
                  d = he.memoizedState;
                case 5:
                case 27:
                  var h = he;
                  if (d ? K0(d) : h.stateNode.complete) {
                    ze = 0, Nt = null;
                    var v = h.sibling;
                    if (v !== null) he = v;
                    else {
                      var T = h.return;
                      T !== null ? (he = T, hs(T)) : he = null;
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
              Qo(), $e = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        rh();
        break;
      } catch (R) {
        l0(e, R);
      }
    while (!0);
    return en = aa = null, w.H = a, w.A = l, we = n, he !== null ? 0 : (De = null, be = 0, Or(), $e);
  }
  function rh() {
    for (; he !== null && !_m(); )
      o0(he);
  }
  function o0(e) {
    var t = Mf(e.alternate, e, dn);
    e.memoizedProps = e.pendingProps, t === null ? hs(e) : he = t;
  }
  function c0(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Tf(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          be
        );
        break;
      case 11:
        t = Tf(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          be
        );
        break;
      case 5:
        io(t);
      default:
        Rf(n, t), t = he = sd(t, dn), t = Mf(n, t, dn);
    }
    e.memoizedProps = e.pendingProps, t === null ? hs(e) : he = t;
  }
  function Ia(e, t, n, a) {
    en = aa = null, io(t), Ga = null, Al = 0;
    var l = t.return;
    try {
      if (Z2(
        e,
        l,
        t,
        n,
        be
      )) {
        $e = 1, ts(
          e,
          Mt(n, e.current)
        ), he = null;
        return;
      }
    } catch (i) {
      if (l !== null) throw he = l, i;
      $e = 1, ts(
        e,
        Mt(n, e.current)
      ), he = null;
      return;
    }
    t.flags & 32768 ? (ve || a === 1 ? e = !0 : Ka || (be & 536870912) !== 0 ? e = !1 : (An = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = jt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), u0(t, e)) : hs(t);
  }
  function hs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        u0(
          t,
          An
        );
        return;
      }
      e = t.return;
      var n = W2(
        t.alternate,
        t,
        dn
      );
      if (n !== null) {
        he = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        he = t;
        return;
      }
      he = t = e;
    } while (t !== null);
    $e === 0 && ($e = 5);
  }
  function u0(e, t) {
    do {
      var n = F2(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, he = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        he = e;
        return;
      }
      he = e = n;
    } while (e !== null);
    $e = 6, he = null;
  }
  function d0(e, t, n, a, l, i, d, h, v) {
    e.cancelPendingCommit = null;
    do
      gs();
    while (We !== 0);
    if ((we & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (i = t.lanes | t.childLanes, i |= Ri, Lm(
        e,
        n,
        i,
        d,
        h,
        v
      ), e === De && (he = De = null, be = 0), Wa = t, Rn = e, fn = n, $o = i, Vo = l, e0 = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, ch(xr, function() {
        return p0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = w.T, w.T = null, l = V.p, V.p = 2, d = we, we |= 4;
        try {
          I2(e, t, n);
        } finally {
          we = d, V.p = l, w.T = a;
        }
      }
      We = 1, f0(), m0(), h0();
    }
  }
  function f0() {
    if (We === 1) {
      We = 0;
      var e = Rn, t = Wa, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = w.T, w.T = null;
        var a = V.p;
        V.p = 2;
        var l = we;
        we |= 4;
        try {
          Qf(t, e);
          var i = rc, d = Fu(e.containerInfo), h = i.focusedElem, v = i.selectionRange;
          if (d !== h && h && h.ownerDocument && Wu(
            h.ownerDocument.documentElement,
            h
          )) {
            if (v !== null && zi(h)) {
              var T = v.start, R = v.end;
              if (R === void 0 && (R = T), "selectionStart" in h)
                h.selectionStart = T, h.selectionEnd = Math.min(
                  R,
                  h.value.length
                );
              else {
                var L = h.ownerDocument || document, _ = L && L.defaultView || window;
                if (_.getSelection) {
                  var k = _.getSelection(), J = h.textContent.length, le = Math.min(v.start, J), Oe = v.end === void 0 ? le : Math.min(v.end, J);
                  !k.extend && le > Oe && (d = Oe, Oe = le, le = d);
                  var N = Ju(
                    h,
                    le
                  ), j = Ju(
                    h,
                    Oe
                  );
                  if (N && j && (k.rangeCount !== 1 || k.anchorNode !== N.node || k.anchorOffset !== N.offset || k.focusNode !== j.node || k.focusOffset !== j.offset)) {
                    var E = L.createRange();
                    E.setStart(N.node, N.offset), k.removeAllRanges(), le > Oe ? (k.addRange(E), k.extend(j.node, j.offset)) : (E.setEnd(j.node, j.offset), k.addRange(E));
                  }
                }
              }
            }
            for (L = [], k = h; k = k.parentNode; )
              k.nodeType === 1 && L.push({
                element: k,
                left: k.scrollLeft,
                top: k.scrollTop
              });
            for (typeof h.focus == "function" && h.focus(), h = 0; h < L.length; h++) {
              var D = L[h];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          ws = !!lc, rc = lc = null;
        } finally {
          we = l, V.p = a, w.T = n;
        }
      }
      e.current = t, We = 2;
    }
  }
  function m0() {
    if (We === 2) {
      We = 0;
      var e = Rn, t = Wa, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = w.T, w.T = null;
        var a = V.p;
        V.p = 2;
        var l = we;
        we |= 4;
        try {
          Gf(e, t.alternate, t);
        } finally {
          we = l, V.p = a, w.T = n;
        }
      }
      We = 3;
    }
  }
  function h0() {
    if (We === 4 || We === 3) {
      We = 0, zm();
      var e = Rn, t = Wa, n = fn, a = e0;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? We = 5 : (We = 0, Wa = Rn = null, g0(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (l === 0 && (On = null), ui(n), t = t.stateNode, bt && typeof bt.onCommitFiberRoot == "function")
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
        t = w.T, l = V.p, V.p = 2, w.T = null;
        try {
          for (var i = e.onRecoverableError, d = 0; d < a.length; d++) {
            var h = a[d];
            i(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          w.T = t, V.p = l;
        }
      }
      (fn & 3) !== 0 && gs(), Xt(e), l = e.pendingLanes, (n & 261930) !== 0 && (l & 42) !== 0 ? e === Xo ? Kl++ : (Kl = 0, Xo = e) : Kl = 0, Jl(0);
    }
  }
  function g0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, zl(t)));
  }
  function gs() {
    return f0(), m0(), h0(), p0();
  }
  function p0() {
    if (We !== 5) return !1;
    var e = Rn, t = $o;
    $o = 0;
    var n = ui(fn), a = w.T, l = V.p;
    try {
      V.p = 32 > n ? 32 : n, w.T = null, n = Vo, Vo = null;
      var i = Rn, d = fn;
      if (We = 0, Wa = Rn = null, fn = 0, (we & 6) !== 0) throw Error(c(331));
      var h = we;
      if (we |= 4, Ff(i.current), Kf(
        i,
        i.current,
        d,
        n
      ), we = h, Jl(0, !1), bt && typeof bt.onPostCommitFiberRoot == "function")
        try {
          bt.onPostCommitFiberRoot(ml, i);
        } catch {
        }
      return !0;
    } finally {
      V.p = l, w.T = a, g0(e, t);
    }
  }
  function x0(e, t, n) {
    t = Mt(n, t), t = Co(e.stateNode, t, 2), e = wn(e, t, 2), e !== null && (gl(e, 2), Xt(e));
  }
  function ke(e, t, n) {
    if (e.tag === 3)
      x0(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          x0(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (On === null || !On.has(a))) {
            e = Mt(n, e), n = bf(2), a = wn(t, n, 2), a !== null && (yf(
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
  function Ko(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new th();
      var l = /* @__PURE__ */ new Set();
      a.set(t, l);
    } else
      l = a.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), a.set(t, l));
    l.has(n) || (qo = !0, l.add(n), e = sh.bind(null, e, t, n), t.then(e, e));
  }
  function sh(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, De === e && (be & n) === n && ($e === 4 || $e === 3 && (be & 62914560) === be && 300 > xt() - cs ? (we & 2) === 0 && Fa(e, 0) : Go |= n, Ja === be && (Ja = 0)), Xt(e);
  }
  function b0(e, t) {
    t === 0 && (t = du()), e = ea(e, t), e !== null && (gl(e, t), Xt(e));
  }
  function ih(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), b0(e, n);
  }
  function oh(e, t) {
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
        throw Error(c(314));
    }
    a !== null && a.delete(t), b0(e, n);
  }
  function ch(e, t) {
    return si(e, t);
  }
  var ps = null, Pa = null, Jo = !1, xs = !1, Wo = !1, Un = 0;
  function Xt(e) {
    e !== Pa && e.next === null && (Pa === null ? ps = Pa = e : Pa = Pa.next = e), xs = !0, Jo || (Jo = !0, dh());
  }
  function Jl(e, t) {
    if (!Wo && xs) {
      Wo = !0;
      do
        for (var n = !1, a = ps; a !== null; ) {
          if (e !== 0) {
            var l = a.pendingLanes;
            if (l === 0) var i = 0;
            else {
              var d = a.suspendedLanes, h = a.pingedLanes;
              i = (1 << 31 - yt(42 | e) + 1) - 1, i &= l & ~(d & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (n = !0, j0(a, i));
          } else
            i = be, i = Sr(
              a,
              a === De ? i : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (i & 3) === 0 || hl(a, i) || (n = !0, j0(a, i));
          a = a.next;
        }
      while (n);
      Wo = !1;
    }
  }
  function uh() {
    y0();
  }
  function y0() {
    xs = Jo = !1;
    var e = 0;
    Un !== 0 && Sh() && (e = Un);
    for (var t = xt(), n = null, a = ps; a !== null; ) {
      var l = a.next, i = v0(a, t);
      i === 0 ? (a.next = null, n === null ? ps = l : n.next = l, l === null && (Pa = n)) : (n = a, (e !== 0 || (i & 3) !== 0) && (xs = !0)), a = l;
    }
    We !== 0 && We !== 5 || Jl(e), Un !== 0 && (Un = 0);
  }
  function v0(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var d = 31 - yt(i), h = 1 << d, v = l[d];
      v === -1 ? ((h & n) === 0 || (h & a) !== 0) && (l[d] = Bm(h, t)) : v <= t && (e.expiredLanes |= h), i &= ~h;
    }
    if (t = De, n = be, n = Sr(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, n === 0 || e === t && (ze === 2 || ze === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && ii(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || hl(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && ii(a), ui(n)) {
        case 2:
        case 8:
          n = cu;
          break;
        case 32:
          n = xr;
          break;
        case 268435456:
          n = uu;
          break;
        default:
          n = xr;
      }
      return a = S0.bind(null, e), n = si(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && ii(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function S0(e, t) {
    if (We !== 0 && We !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (gs() && e.callbackNode !== n)
      return null;
    var a = be;
    return a = Sr(
      e,
      e === De ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (n0(e, a, t), v0(e, xt()), e.callbackNode != null && e.callbackNode === n ? S0.bind(null, e) : null);
  }
  function j0(e, t) {
    if (gs()) return null;
    n0(e, t, !0);
  }
  function dh() {
    Ch(function() {
      (we & 6) !== 0 ? si(
        ou,
        uh
      ) : y0();
    });
  }
  function Fo() {
    if (Un === 0) {
      var e = La;
      e === 0 && (e = br, br <<= 1, (br & 261888) === 0 && (br = 256)), Un = e;
    }
    return Un;
  }
  function C0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Er("" + e);
  }
  function N0(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function fh(e, t, n, a, l) {
    if (t === "submit" && n && n.stateNode === l) {
      var i = C0(
        (l[ot] || null).action
      ), d = a.submitter;
      d && (t = (t = d[ot] || null) ? C0(t.formAction) : d.getAttribute("formAction"), t !== null && (i = t, d = null));
      var h = new zr(
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
                  var v = d ? N0(l, d) : new FormData(l);
                  xo(
                    n,
                    {
                      pending: !0,
                      data: v,
                      method: l.method,
                      action: i
                    },
                    null,
                    v
                  );
                }
              } else
                typeof i == "function" && (h.preventDefault(), v = d ? N0(l, d) : new FormData(l), xo(
                  n,
                  {
                    pending: !0,
                    data: v,
                    method: l.method,
                    action: i
                  },
                  i,
                  v
                ));
            },
            currentTarget: l
          }
        ]
      });
    }
  }
  for (var Io = 0; Io < Oi.length; Io++) {
    var Po = Oi[Io], mh = Po.toLowerCase(), hh = Po[0].toUpperCase() + Po.slice(1);
    Ht(
      mh,
      "on" + hh
    );
  }
  Ht(ed, "onAnimationEnd"), Ht(td, "onAnimationIteration"), Ht(nd, "onAnimationStart"), Ht("dblclick", "onDoubleClick"), Ht("focusin", "onFocus"), Ht("focusout", "onBlur"), Ht(k2, "onTransitionRun"), Ht(A2, "onTransitionStart"), Ht(M2, "onTransitionCancel"), Ht(ad, "onTransitionEnd"), Na("onMouseEnter", ["mouseout", "mouseover"]), Na("onMouseLeave", ["mouseout", "mouseover"]), Na("onPointerEnter", ["pointerout", "pointerover"]), Na("onPointerLeave", ["pointerout", "pointerover"]), Wn(
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
  ), gh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wl)
  );
  function E0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], l = a.event;
      a = a.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var h = a[d], v = h.instance, T = h.currentTarget;
            if (h = h.listener, v !== i && l.isPropagationStopped())
              break e;
            i = h, l.currentTarget = T;
            try {
              i(l);
            } catch (R) {
              Mr(R);
            }
            l.currentTarget = null, i = v;
          }
        else
          for (d = 0; d < a.length; d++) {
            if (h = a[d], v = h.instance, T = h.currentTarget, h = h.listener, v !== i && l.isPropagationStopped())
              break e;
            i = h, l.currentTarget = T;
            try {
              i(l);
            } catch (R) {
              Mr(R);
            }
            l.currentTarget = null, i = v;
          }
      }
    }
  }
  function ge(e, t) {
    var n = t[di];
    n === void 0 && (n = t[di] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (T0(t, e, 2, !1), n.add(a));
  }
  function ec(e, t, n) {
    var a = 0;
    t && (a |= 4), T0(
      n,
      e,
      a,
      t
    );
  }
  var bs = "_reactListening" + Math.random().toString(36).slice(2);
  function tc(e) {
    if (!e[bs]) {
      e[bs] = !0, bu.forEach(function(n) {
        n !== "selectionchange" && (gh.has(n) || ec(n, !1, e), ec(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[bs] || (t[bs] = !0, ec("selectionchange", !1, t));
    }
  }
  function T0(e, t, n, a) {
    switch (t1(t)) {
      case 2:
        var l = $h;
        break;
      case 8:
        l = Vh;
        break;
      default:
        l = pc;
    }
    n = l.bind(
      null,
      t,
      n,
      e
    ), l = void 0, !vi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), a ? l !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
      passive: l
    }) : e.addEventListener(t, n, !1);
  }
  function nc(e, t, n, a, l) {
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
              var v = d.tag;
              if ((v === 3 || v === 4) && d.stateNode.containerInfo === l)
                return;
              d = d.return;
            }
          for (; h !== null; ) {
            if (d = Sa(h), d === null) return;
            if (v = d.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              a = i = d;
              continue e;
            }
            h = h.parentNode;
          }
        }
        a = a.return;
      }
    ku(function() {
      var T = i, R = bi(n), L = [];
      e: {
        var _ = ld.get(e);
        if (_ !== void 0) {
          var k = zr, J = e;
          switch (e) {
            case "keypress":
              if (wr(n) === 0) break e;
            case "keydown":
            case "keyup":
              k = o2;
              break;
            case "focusin":
              J = "focus", k = Ni;
              break;
            case "focusout":
              J = "blur", k = Ni;
              break;
            case "beforeblur":
            case "afterblur":
              k = Ni;
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
              k = Ou;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k = Wm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k = d2;
              break;
            case ed:
            case td:
            case nd:
              k = Pm;
              break;
            case ad:
              k = m2;
              break;
            case "scroll":
            case "scrollend":
              k = Km;
              break;
            case "wheel":
              k = g2;
              break;
            case "copy":
            case "cut":
            case "paste":
              k = t2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k = Du;
              break;
            case "toggle":
            case "beforetoggle":
              k = x2;
          }
          var le = (t & 4) !== 0, Oe = !le && (e === "scroll" || e === "scrollend"), N = le ? _ !== null ? _ + "Capture" : null : _;
          le = [];
          for (var j = T, E; j !== null; ) {
            var D = j;
            if (E = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || E === null || N === null || (D = bl(j, N), D != null && le.push(
              Fl(j, D, E)
            )), Oe) break;
            j = j.return;
          }
          0 < le.length && (_ = new k(
            _,
            J,
            null,
            n,
            R
          ), L.push({ event: _, listeners: le }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (_ = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", _ && n !== xi && (J = n.relatedTarget || n.fromElement) && (Sa(J) || J[va]))
            break e;
          if ((k || _) && (_ = R.window === R ? R : (_ = R.ownerDocument) ? _.defaultView || _.parentWindow : window, k ? (J = n.relatedTarget || n.toElement, k = T, J = J ? Sa(J) : null, J !== null && (Oe = m(J), le = J.tag, J !== Oe || le !== 5 && le !== 27 && le !== 6) && (J = null)) : (k = null, J = T), k !== J)) {
            if (le = Ou, D = "onMouseLeave", N = "onMouseEnter", j = "mouse", (e === "pointerout" || e === "pointerover") && (le = Du, D = "onPointerLeave", N = "onPointerEnter", j = "pointer"), Oe = k == null ? _ : xl(k), E = J == null ? _ : xl(J), _ = new le(
              D,
              j + "leave",
              k,
              n,
              R
            ), _.target = Oe, _.relatedTarget = E, D = null, Sa(R) === T && (le = new le(
              N,
              j + "enter",
              J,
              n,
              R
            ), le.target = E, le.relatedTarget = Oe, D = le), Oe = D, k && J)
              t: {
                for (le = ph, N = k, j = J, E = 0, D = N; D; D = le(D))
                  E++;
                D = 0;
                for (var ne = j; ne; ne = le(ne))
                  D++;
                for (; 0 < E - D; )
                  N = le(N), E--;
                for (; 0 < D - E; )
                  j = le(j), D--;
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
            k !== null && w0(
              L,
              _,
              k,
              le,
              !1
            ), J !== null && Oe !== null && w0(
              L,
              Oe,
              J,
              le,
              !0
            );
          }
        }
        e: {
          if (_ = T ? xl(T) : window, k = _.nodeName && _.nodeName.toLowerCase(), k === "select" || k === "input" && _.type === "file")
            var Ne = $u;
          else if (Gu(_))
            if (Vu)
              Ne = w2;
            else {
              Ne = E2;
              var W = N2;
            }
          else
            k = _.nodeName, !k || k.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? T && pi(T.elementType) && (Ne = $u) : Ne = T2;
          if (Ne && (Ne = Ne(e, T))) {
            Yu(
              L,
              Ne,
              n,
              R
            );
            break e;
          }
          W && W(e, _, T), e === "focusout" && T && _.type === "number" && T.memoizedProps.value != null && gi(_, "number", _.value);
        }
        switch (W = T ? xl(T) : window, e) {
          case "focusin":
            (Gu(W) || W.contentEditable === "true") && (ka = W, ki = T, Tl = null);
            break;
          case "focusout":
            Tl = ki = ka = null;
            break;
          case "mousedown":
            Ai = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ai = !1, Iu(L, n, R);
            break;
          case "selectionchange":
            if (z2) break;
          case "keydown":
          case "keyup":
            Iu(L, n, R);
        }
        var fe;
        if (Ti)
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
          za ? Hu(e, n) && (ye = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ye = "onCompositionStart");
        ye && (Uu && n.locale !== "ko" && (za || ye !== "onCompositionStart" ? ye === "onCompositionEnd" && za && (fe = Au()) : (vn = R, Si = "value" in vn ? vn.value : vn.textContent, za = !0)), W = ys(T, ye), 0 < W.length && (ye = new Ru(
          ye,
          e,
          null,
          n,
          R
        ), L.push({ event: ye, listeners: W }), fe ? ye.data = fe : (fe = qu(n), fe !== null && (ye.data = fe)))), (fe = y2 ? v2(e, n) : S2(e, n)) && (ye = ys(T, "onBeforeInput"), 0 < ye.length && (W = new Ru(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          R
        ), L.push({
          event: W,
          listeners: ye
        }), W.data = fe)), fh(
          L,
          e,
          T,
          n,
          R
        );
      }
      E0(L, t);
    });
  }
  function Fl(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function ys(e, t) {
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
  function ph(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function w0(e, t, n, a, l) {
    for (var i = t._reactName, d = []; n !== null && n !== a; ) {
      var h = n, v = h.alternate, T = h.stateNode;
      if (h = h.tag, v !== null && v === a) break;
      h !== 5 && h !== 26 && h !== 27 || T === null || (v = T, l ? (T = bl(n, i), T != null && d.unshift(
        Fl(n, T, v)
      )) : l || (T = bl(n, i), T != null && d.push(
        Fl(n, T, v)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var xh = /\r\n?/g, bh = /\u0000|\uFFFD/g;
  function _0(e) {
    return (typeof e == "string" ? e : "" + e).replace(xh, `
`).replace(bh, "");
  }
  function z0(e, t) {
    return t = _0(t), _0(e) === t;
  }
  function Me(e, t, n, a, l, i) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ta(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ta(e, "" + a);
        break;
      case "className":
        Cr(e, "class", a);
        break;
      case "tabIndex":
        Cr(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Cr(e, n, a);
        break;
      case "style":
        _u(e, a, i);
        break;
      case "data":
        if (t !== "object") {
          Cr(e, "data", a);
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
        a = Er("" + a), e.setAttribute(n, a);
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
        a = Er("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = Wt);
        break;
      case "onScroll":
        a != null && ge("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ge("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(c(61));
          if (n = a.__html, n != null) {
            if (l.children != null) throw Error(c(60));
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
        n = Er("" + a), e.setAttributeNS(
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
        ge("beforetoggle", e), ge("toggle", e), jr(e, "popover", a);
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
        jr(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Qm.get(n) || n, jr(e, n, a));
    }
  }
  function ac(e, t, n, a, l, i) {
    switch (n) {
      case "style":
        _u(e, a, i);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(c(61));
          if (n = a.__html, n != null) {
            if (l.children != null) throw Error(c(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ta(e, a) : (typeof a == "number" || typeof a == "bigint") && Ta(e, "" + a);
        break;
      case "onScroll":
        a != null && ge("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ge("scrollend", e);
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
        if (!yu.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (l = n.endsWith("Capture"), t = n.slice(2, l ? n.length - 7 : void 0), i = e[ot] || null, i = i != null ? i[n] : null, typeof i == "function" && e.removeEventListener(t, i, l), typeof a == "function")) {
              typeof i != "function" && i !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, l);
              break e;
            }
            n in e ? e[n] = a : a === !0 ? e.setAttribute(n, "") : jr(e, n, a);
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
        ge("error", e), ge("load", e);
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
                  throw Error(c(137, t));
                default:
                  Me(e, t, i, d, n, null);
              }
          }
        l && Me(e, t, "srcSet", n.srcSet, n, null), a && Me(e, t, "src", n.src, n, null);
        return;
      case "input":
        ge("invalid", e);
        var h = i = d = l = null, v = null, T = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var R = n[a];
            if (R != null)
              switch (a) {
                case "name":
                  l = R;
                  break;
                case "type":
                  d = R;
                  break;
                case "checked":
                  v = R;
                  break;
                case "defaultChecked":
                  T = R;
                  break;
                case "value":
                  i = R;
                  break;
                case "defaultValue":
                  h = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(c(137, t));
                  break;
                default:
                  Me(e, t, a, R, n, null);
              }
          }
        Nu(
          e,
          i,
          h,
          v,
          T,
          d,
          l,
          !1
        );
        return;
      case "select":
        ge("invalid", e), a = d = i = null;
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
        ge("invalid", e), i = l = a = null;
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
                if (h != null) throw Error(c(91));
                break;
              default:
                Me(e, t, d, h, n, null);
            }
        Tu(e, a, l, i);
        return;
      case "option":
        for (v in n)
          if (n.hasOwnProperty(v) && (a = n[v], a != null))
            switch (v) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Me(e, t, v, a, n, null);
            }
        return;
      case "dialog":
        ge("beforetoggle", e), ge("toggle", e), ge("cancel", e), ge("close", e);
        break;
      case "iframe":
      case "object":
        ge("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Wl.length; a++)
          ge(Wl[a], e);
        break;
      case "image":
        ge("error", e), ge("load", e);
        break;
      case "details":
        ge("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ge("error", e), ge("load", e);
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
                throw Error(c(137, t));
              default:
                Me(e, t, T, a, n, null);
            }
        return;
      default:
        if (pi(t)) {
          for (R in n)
            n.hasOwnProperty(R) && (a = n[R], a !== void 0 && ac(
              e,
              t,
              R,
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
  function yh(e, t, n, a) {
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
        var l = null, i = null, d = null, h = null, v = null, T = null, R = null;
        for (k in n) {
          var L = n[k];
          if (n.hasOwnProperty(k) && L != null)
            switch (k) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = L;
              default:
                a.hasOwnProperty(k) || Me(e, t, k, null, a, L);
            }
        }
        for (var _ in a) {
          var k = a[_];
          if (L = n[_], a.hasOwnProperty(_) && (k != null || L != null))
            switch (_) {
              case "type":
                i = k;
                break;
              case "name":
                l = k;
                break;
              case "checked":
                T = k;
                break;
              case "defaultChecked":
                R = k;
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
                k !== L && Me(
                  e,
                  t,
                  _,
                  k,
                  a,
                  L
                );
            }
        }
        hi(
          e,
          d,
          h,
          v,
          T,
          R,
          i,
          l
        );
        return;
      case "select":
        k = d = h = _ = null;
        for (i in n)
          if (v = n[i], n.hasOwnProperty(i) && v != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                k = v;
              default:
                a.hasOwnProperty(i) || Me(
                  e,
                  t,
                  i,
                  null,
                  a,
                  v
                );
            }
        for (l in a)
          if (i = a[l], v = n[l], a.hasOwnProperty(l) && (i != null || v != null))
            switch (l) {
              case "value":
                _ = i;
                break;
              case "defaultValue":
                h = i;
                break;
              case "multiple":
                d = i;
              default:
                i !== v && Me(
                  e,
                  t,
                  l,
                  i,
                  a,
                  v
                );
            }
        t = h, n = d, a = k, _ != null ? Ea(e, !!n, _, !1) : !!a != !!n && (t != null ? Ea(e, !!n, t, !0) : Ea(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        k = _ = null;
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
                _ = l;
                break;
              case "defaultValue":
                k = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(c(91));
                break;
              default:
                l !== i && Me(e, t, d, l, a, i);
            }
        Eu(e, _, k);
        return;
      case "option":
        for (var J in n)
          if (_ = n[J], n.hasOwnProperty(J) && _ != null && !a.hasOwnProperty(J))
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
                  a,
                  _
                );
            }
        for (v in a)
          if (_ = a[v], k = n[v], a.hasOwnProperty(v) && _ !== k && (_ != null || k != null))
            switch (v) {
              case "selected":
                e.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                Me(
                  e,
                  t,
                  v,
                  _,
                  a,
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
        for (var le in n)
          _ = n[le], n.hasOwnProperty(le) && _ != null && !a.hasOwnProperty(le) && Me(e, t, le, null, a, _);
        for (T in a)
          if (_ = a[T], k = n[T], a.hasOwnProperty(T) && _ !== k && (_ != null || k != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(c(137, t));
                break;
              default:
                Me(
                  e,
                  t,
                  T,
                  _,
                  a,
                  k
                );
            }
        return;
      default:
        if (pi(t)) {
          for (var Oe in n)
            _ = n[Oe], n.hasOwnProperty(Oe) && _ !== void 0 && !a.hasOwnProperty(Oe) && ac(
              e,
              t,
              Oe,
              void 0,
              a,
              _
            );
          for (R in a)
            _ = a[R], k = n[R], !a.hasOwnProperty(R) || _ === k || _ === void 0 && k === void 0 || ac(
              e,
              t,
              R,
              _,
              a,
              k
            );
          return;
        }
    }
    for (var N in n)
      _ = n[N], n.hasOwnProperty(N) && _ != null && !a.hasOwnProperty(N) && Me(e, t, N, null, a, _);
    for (L in a)
      _ = a[L], k = n[L], !a.hasOwnProperty(L) || _ === k || _ == null && k == null || Me(e, t, L, _, a, k);
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
  function vh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var l = n[a], i = l.transferSize, d = l.initiatorType, h = l.duration;
        if (i && h && k0(d)) {
          for (d = 0, h = l.responseEnd, a += 1; a < n.length; a++) {
            var v = n[a], T = v.startTime;
            if (T > h) break;
            var R = v.transferSize, L = v.initiatorType;
            R && k0(L) && (v = v.responseEnd, d += R * (v < h ? 1 : (h - T) / (v - T)));
          }
          if (--a, t += 8 * (i + d) / (l.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var lc = null, rc = null;
  function vs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function A0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function M0(e, t) {
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
  function sc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ic = null;
  function Sh() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ic ? !1 : (ic = e, !0) : (ic = null, !1);
  }
  var O0 = typeof setTimeout == "function" ? setTimeout : void 0, jh = typeof clearTimeout == "function" ? clearTimeout : void 0, R0 = typeof Promise == "function" ? Promise : void 0, Ch = typeof queueMicrotask == "function" ? queueMicrotask : typeof R0 < "u" ? function(e) {
    return R0.resolve(null).then(e).catch(Nh);
  } : O0;
  function Nh(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Bn(e) {
    return e === "head";
  }
  function D0(e, t) {
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
  function U0(e, t) {
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
  function oc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          oc(n), fi(n);
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
  function Eh(e, t, n, a) {
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
      if (e = Bt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Th(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Bt(e.nextSibling), e === null)) return null;
    return e;
  }
  function B0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Bt(e.nextSibling), e === null)) return null;
    return e;
  }
  function cc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function uc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function wh(e, t) {
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
  function Bt(e) {
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
  var dc = null;
  function L0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Bt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function H0(e) {
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
  function q0(e, t, n) {
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
  function Il(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    fi(e);
  }
  var Lt = /* @__PURE__ */ new Map(), G0 = /* @__PURE__ */ new Set();
  function Ss(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var mn = V.d;
  V.d = {
    f: _h,
    r: zh,
    D: kh,
    C: Ah,
    L: Mh,
    m: Oh,
    X: Dh,
    S: Rh,
    M: Uh
  };
  function _h() {
    var e = mn.f(), t = fs();
    return e || t;
  }
  function zh(e) {
    var t = ja(e);
    t !== null && t.tag === 5 && t.type === "form" ? af(t) : mn.r(e);
  }
  var el = typeof document > "u" ? null : document;
  function Y0(e, t, n) {
    var a = el;
    if (a && typeof t == "string" && t) {
      var l = kt(t);
      l = 'link[rel="' + e + '"][href="' + l + '"]', typeof n == "string" && (l += '[crossorigin="' + n + '"]'), G0.has(l) || (G0.add(l), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(l) === null && (t = a.createElement("link"), at(t, "link", e), Fe(t), a.head.appendChild(t)));
    }
  }
  function kh(e) {
    mn.D(e), Y0("dns-prefetch", e, null);
  }
  function Ah(e, t) {
    mn.C(e, t), Y0("preconnect", e, t);
  }
  function Mh(e, t, n) {
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
      Lt.has(i) || (e = y(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Lt.set(i, e), a.querySelector(l) !== null || t === "style" && a.querySelector(Pl(i)) || t === "script" && a.querySelector(er(i)) || (t = a.createElement("link"), at(t, "link", e), Fe(t), a.head.appendChild(t)));
    }
  }
  function Oh(e, t) {
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
      if (!Lt.has(i) && (e = y({ rel: "modulepreload", href: e }, t), Lt.set(i, e), n.querySelector(l) === null)) {
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
  function Rh(e, t, n) {
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
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Lt.get(i)) && fc(e, n);
          var v = d = a.createElement("link");
          Fe(v), at(v, "link", e), v._p = new Promise(function(T, R) {
            v.onload = T, v.onerror = R;
          }), v.addEventListener("load", function() {
            h.loading |= 1;
          }), v.addEventListener("error", function() {
            h.loading |= 2;
          }), h.loading |= 4, js(d, t, a);
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
  function Dh(e, t) {
    mn.X(e, t);
    var n = el;
    if (n && e) {
      var a = Ca(n).hoistableScripts, l = nl(e), i = a.get(l);
      i || (i = n.querySelector(er(l)), i || (e = y({ src: e, async: !0 }, t), (t = Lt.get(l)) && mc(e, t), i = n.createElement("script"), Fe(i), at(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, a.set(l, i));
    }
  }
  function Uh(e, t) {
    mn.M(e, t);
    var n = el;
    if (n && e) {
      var a = Ca(n).hoistableScripts, l = nl(e), i = a.get(l);
      i || (i = n.querySelector(er(l)), i || (e = y({ src: e, async: !0, type: "module" }, t), (t = Lt.get(l)) && mc(e, t), i = n.createElement("script"), Fe(i), at(i, "link", e), n.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, a.set(l, i));
    }
  }
  function $0(e, t, n, a) {
    var l = (l = Z.current) ? Ss(l) : null;
    if (!l) throw Error(c(446));
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
          )) && !i._p && (d.instance = i, d.state.loading = 5), Lt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Lt.set(e, n), i || Bh(
            l,
            e,
            n,
            d.state
          ))), t && a === null)
            throw Error(c(528, ""));
          return d;
        }
        if (t && a !== null)
          throw Error(c(529, ""));
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
        throw Error(c(444, e));
    }
  }
  function tl(e) {
    return 'href="' + kt(e) + '"';
  }
  function Pl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function V0(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Bh(e, t, n, a) {
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
  function X0(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + kt(n.href) + '"]'
          );
          if (a)
            return t.instance = a, Fe(a), a;
          var l = y({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Fe(a), at(a, "style", l), js(a, n.precedence, e), t.instance = a;
        case "stylesheet":
          l = tl(n.href);
          var i = e.querySelector(
            Pl(l)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, Fe(i), i;
          a = V0(n), (l = Lt.get(l)) && fc(a, l), i = (e.ownerDocument || e).createElement("link"), Fe(i);
          var d = i;
          return d._p = new Promise(function(h, v) {
            d.onload = h, d.onerror = v;
          }), at(i, "link", a), t.state.loading |= 4, js(i, n.precedence, e), t.instance = i;
        case "script":
          return i = nl(n.src), (l = e.querySelector(
            er(i)
          )) ? (t.instance = l, Fe(l), l) : (a = n, (l = Lt.get(i)) && (a = y({}, n), mc(a, l)), e = e.ownerDocument || e, l = e.createElement("script"), Fe(l), at(l, "link", a), e.head.appendChild(l), t.instance = l);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, js(a, n.precedence, e));
    return t.instance;
  }
  function js(e, t, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), l = a.length ? a[a.length - 1] : null, i = l, d = 0; d < a.length; d++) {
      var h = a[d];
      if (h.dataset.precedence === t) i = h;
      else if (i !== l) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function fc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function mc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Cs = null;
  function Q0(e, t, n) {
    if (Cs === null) {
      var a = /* @__PURE__ */ new Map(), l = Cs = /* @__PURE__ */ new Map();
      l.set(n, a);
    } else
      l = Cs, a = l.get(n), a || (a = /* @__PURE__ */ new Map(), l.set(n, a));
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
  function Z0(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Lh(e, t, n) {
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
  function K0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Hh(e, t, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var l = tl(a.href), i = t.querySelector(
          Pl(l)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ns.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = i, Fe(i);
          return;
        }
        i = t.ownerDocument || t, a = V0(a), (l = Lt.get(l)) && fc(a, l), i = i.createElement("link"), Fe(i);
        var d = i;
        d._p = new Promise(function(h, v) {
          d.onload = h, d.onerror = v;
        }), at(i, "link", a), n.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Ns.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var hc = 0;
  function qh(e, t) {
    return e.stylesheets && e.count === 0 && Ts(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (e.stylesheets && Ts(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && hc === 0 && (hc = 62500 * vh());
      var l = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ts(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        },
        (e.imgBytes > hc ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(l);
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Es = /* @__PURE__ */ new Map(), t.forEach(Gh, e), Es = null, Ns.call(e));
  }
  function Gh(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Es.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Es.set(e, n);
        for (var l = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < l.length; i++) {
          var d = l[i];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), a = d);
        }
        a && n.set(null, a);
      }
      l = t.instance, d = l.getAttribute("data-precedence"), i = n.get(d) || a, i === a && n.set(null, l), n.set(d, l), this.count++, a = Ns.bind(this), l.addEventListener("load", a), l.addEventListener("error", a), i ? i.parentNode.insertBefore(l, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), t.state.loading |= 4;
    }
  }
  var tr = {
    $$typeof: F,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0
  };
  function Yh(e, t, n, a, l, i, d, h, v) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = oi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = oi(0), this.hiddenUpdates = oi(null), this.identifierPrefix = a, this.onUncaughtError = l, this.onCaughtError = i, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function J0(e, t, n, a, l, i, d, h, v, T, R, L) {
    return e = new Yh(
      e,
      t,
      n,
      d,
      v,
      T,
      R,
      L,
      h
    ), t = 1, i === !0 && (t |= 24), i = St(3, null, null, t), e.current = i, i.stateNode = e, t = Qi(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: t
    }, Wi(i), e;
  }
  function W0(e) {
    return e ? (e = Oa, e) : Oa;
  }
  function F0(e, t, n, a, l, i) {
    l = W0(l), a.context === null ? a.context = l : a.pendingContext = l, a = Tn(t), a.payload = { element: n }, i = i === void 0 ? null : i, i !== null && (a.callback = i), n = wn(e, a, t), n !== null && (ht(n, e, t), Ol(n, e, t));
  }
  function I0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function gc(e, t) {
    I0(e, t), (e = e.alternate) && I0(e, t);
  }
  function P0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ea(e, 67108864);
      t !== null && ht(t, e, 67108864), gc(e, 67108864);
    }
  }
  function e1(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Tt();
      t = ci(t);
      var n = ea(e, t);
      n !== null && ht(n, e, t), gc(e, t);
    }
  }
  var ws = !0;
  function $h(e, t, n, a) {
    var l = w.T;
    w.T = null;
    var i = V.p;
    try {
      V.p = 2, pc(e, t, n, a);
    } finally {
      V.p = i, w.T = l;
    }
  }
  function Vh(e, t, n, a) {
    var l = w.T;
    w.T = null;
    var i = V.p;
    try {
      V.p = 8, pc(e, t, n, a);
    } finally {
      V.p = i, w.T = l;
    }
  }
  function pc(e, t, n, a) {
    if (ws) {
      var l = xc(a);
      if (l === null)
        nc(
          e,
          t,
          a,
          _s,
          n
        ), n1(e, a);
      else if (Qh(
        l,
        e,
        t,
        n,
        a
      ))
        a.stopPropagation();
      else if (n1(e, a), t & 4 && -1 < Xh.indexOf(e)) {
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
                      var v = 1 << 31 - yt(d);
                      h.entanglements[1] |= v, d &= ~v;
                    }
                    Xt(i), (we & 6) === 0 && (us = xt() + 500, Jl(0));
                  }
                }
                break;
              case 31:
              case 13:
                h = ea(i, 2), h !== null && ht(h, i, 2), fs(), gc(i, 2);
            }
          if (i = xc(a), i === null && nc(
            e,
            t,
            a,
            _s,
            n
          ), i === l) break;
          l = i;
        }
        l !== null && a.stopPropagation();
      } else
        nc(
          e,
          t,
          a,
          null,
          n
        );
    }
  }
  function xc(e) {
    return e = bi(e), bc(e);
  }
  var _s = null;
  function bc(e) {
    if (_s = null, e = Sa(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = x(t), e !== null) return e;
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
  function t1(e) {
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
        switch (km()) {
          case ou:
            return 2;
          case cu:
            return 8;
          case xr:
          case Am:
            return 32;
          case uu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var yc = !1, Ln = null, Hn = null, qn = null, nr = /* @__PURE__ */ new Map(), ar = /* @__PURE__ */ new Map(), Gn = [], Xh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function n1(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ln = null;
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
    }, t !== null && (t = ja(t), t !== null && P0(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Qh(e, t, n, a, l) {
    switch (t) {
      case "focusin":
        return Ln = lr(
          Ln,
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
  function a1(e) {
    var t = Sa(e.target);
    if (t !== null) {
      var n = m(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, pu(e.priority, function() {
              e1(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = x(n), t !== null) {
            e.blockedOn = t, pu(e.priority, function() {
              e1(n);
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
  function zs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = xc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        xi = a, n.target.dispatchEvent(a), xi = null;
      } else
        return t = ja(n), t !== null && P0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function l1(e, t, n) {
    zs(e) && n.delete(t);
  }
  function Zh() {
    yc = !1, Ln !== null && zs(Ln) && (Ln = null), Hn !== null && zs(Hn) && (Hn = null), qn !== null && zs(qn) && (qn = null), nr.forEach(l1), ar.forEach(l1);
  }
  function ks(e, t) {
    e.blockedOn === t && (e.blockedOn = null, yc || (yc = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      Zh
    )));
  }
  var As = null;
  function r1(e) {
    As !== e && (As = e, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        As === e && (As = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], a = e[t + 1], l = e[t + 2];
          if (typeof a != "function") {
            if (bc(a || n) === null)
              continue;
            break;
          }
          var i = ja(n);
          i !== null && (e.splice(t, 3), t -= 3, xo(
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
    function t(v) {
      return ks(v, e);
    }
    Ln !== null && ks(Ln, e), Hn !== null && ks(Hn, e), qn !== null && ks(qn, e), nr.forEach(t), ar.forEach(t);
    for (var n = 0; n < Gn.length; n++) {
      var a = Gn[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Gn.length && (n = Gn[0], n.blockedOn === null); )
      a1(n), n.blockedOn === null && Gn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var l = n[a], i = n[a + 1], d = l[ot] || null;
        if (typeof i == "function")
          d || r1(n);
        else if (d) {
          var h = null;
          if (i && i.hasAttribute("formAction")) {
            if (l = i, d = i[ot] || null)
              h = d.formAction;
            else if (bc(l) !== null) continue;
          } else h = d.action;
          typeof h == "function" ? n[a + 1] = h : (n.splice(a, 3), a -= 3), r1(n);
        }
      }
  }
  function s1() {
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
  function vc(e) {
    this._internalRoot = e;
  }
  Ms.prototype.render = vc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var n = t.current, a = Tt();
    F0(n, a, e, t, null, null);
  }, Ms.prototype.unmount = vc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      F0(e.current, 2, null, e, null, null), fs(), t[va] = null;
    }
  };
  function Ms(e) {
    this._internalRoot = e;
  }
  Ms.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = gu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Gn.length && t !== 0 && t < Gn[n].priority; n++) ;
      Gn.splice(n, 0, e), n === 0 && a1(e);
    }
  };
  var i1 = s.version;
  if (i1 !== "19.2.3")
    throw Error(
      c(
        527,
        i1,
        "19.2.3"
      )
    );
  V.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = b(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Kh = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: w,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Os = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Os.isDisabled && Os.supportsFiber)
      try {
        ml = Os.inject(
          Kh
        ), bt = Os;
      } catch {
      }
  }
  return sr.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var n = !1, a = "", l = hf, i = gf, d = pf;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = J0(
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
      s1
    ), e[va] = t.current, tc(e), new vc(t);
  }, sr.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(c(299));
    var a = !1, l = "", i = hf, d = gf, h = pf, v = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (i = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.formState !== void 0 && (v = n.formState)), t = J0(
      e,
      1,
      !0,
      t,
      n ?? null,
      a,
      l,
      v,
      i,
      d,
      h,
      s1
    ), t.context = W0(null), n = t.current, a = Tt(), a = ci(a), l = Tn(a), l.callback = null, wn(n, l, a), n = a, t.current.lanes = n, gl(t, n), Xt(t), e[va] = t.current, tc(e), new Ms(t);
  }, sr.version = "19.2.3", sr;
}
var x1;
function s4() {
  if (x1) return Cc.exports;
  x1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (s) {
        console.error(s);
      }
  }
  return u(), Cc.exports = r4(), Cc.exports;
}
var i4 = s4();
const Q1 = /* @__PURE__ */ $c(i4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o4 = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), c4 = (u) => u.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, o, c) => c ? c.toUpperCase() : o.toLowerCase()
), b1 = (u) => {
  const s = c4(u);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, Z1 = (...u) => u.filter((s, o, c) => !!s && s.trim() !== "" && c.indexOf(s) === o).join(" ").trim(), u4 = (u) => {
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
var d4 = {
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
const f4 = A.forwardRef(
  ({
    color: u = "currentColor",
    size: s = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: m,
    iconNode: p,
    ...x
  }, g) => A.createElement(
    "svg",
    {
      ref: g,
      ...d4,
      width: s,
      height: s,
      stroke: u,
      strokeWidth: c ? Number(o) * 24 / Number(s) : o,
      className: Z1("lucide", f),
      ...!m && !u4(x) && { "aria-hidden": "true" },
      ...x
    },
    [
      ...p.map(([b, S]) => A.createElement(b, S)),
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
    ({ className: c, ...f }, m) => A.createElement(f4, {
      ref: m,
      iconNode: s,
      className: Z1(
        `lucide-${o4(b1(u))}`,
        `lucide-${u}`,
        c
      ),
      ...f
    })
  );
  return o.displayName = b1(u), o;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m4 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], h4 = I("arrow-down-to-line", m4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], p4 = I("arrow-up-right", g4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], b4 = I("bell", x4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], v4 = I("book-open", y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S4 = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], j4 = I("book", S4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C4 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], K1 = I("bot", C4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N4 = [
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
], E4 = I("boxes", N4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T4 = [
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
], w4 = I("brain-circuit", T4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _4 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], J1 = I("brain", _4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z4 = [
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
], k4 = I("calculator", z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], W1 = I("check", A4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ul = I("chevron-down", M4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Xc = I("chevron-right", O4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Is = I("circle-alert", R4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Qc = I("circle-check-big", D4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], B4 = I("circle-check", U4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L4 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], H4 = I("clock", L4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q4 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], G4 = I("cloud", q4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], F1 = I("copy", Y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $4 = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], y1 = I("corner-down-left", $4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V4 = [
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
], Zc = I("cpu", V4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X4 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], mr = I("database", X4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q4 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Vs = I("download", Q4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], K4 = I("external-link", Z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J4 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], W4 = I("eye", J4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F4 = [
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
], Kc = I("file-text", F4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I4 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], P4 = I("hash", I4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eg = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], tg = I("info", eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ng = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Jc = I("key", ng);
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
], I1 = I("layers", ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lg = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], rg = I("layout-dashboard", lg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sg = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], ig = I("list", sg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const og = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], hr = I("loader-circle", og);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], ug = I("maximize-2", cg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dg = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], fg = I("menu", dg);
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
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], v1 = I("moon", mg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], P1 = I("network", hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gg = [
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
], S1 = I("palette", gg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pg = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], xg = I("pause", pg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bg = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], yg = I("pen", bg);
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
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Wc = I("play", vg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sg = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Fc = I("plus", Sg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jg = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Ic = I("power", jg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Zt = I("refresh-cw", Cg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ng = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], em = I("regex", Ng);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], Tg = I("save", Eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], _g = I("scissors", wg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zg = [
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
], kg = I("scroll-text", zg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ag = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], cl = I("search", Ag);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], Og = I("send", Mg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rg = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], tm = I("server", Rg);
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
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], nm = I("settings", Dg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ug = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], Pc = I("settings-2", Ug);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bg = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], Lg = I("sun", Bg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hg = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], dl = I("terminal", Hg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qg = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], fl = I("trash-2", qg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gg = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Yg = I("triangle-alert", Gg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $g = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], Vg = I("upload", $g);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xg = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Ps = I("x", Xg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qg = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], eu = I("zap", Qg), Zg = () => /* @__PURE__ */ r.jsx("style", { children: `
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
  ` }), Mc = [
  // 导航命令
  {
    id: "nav-memory",
    icon: ig,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (u) => u("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: P1,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (u) => u("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: J1,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (u) => u("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Jc,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (u) => u("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: dl,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (u) => u("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: nm,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (u) => u("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function Kg(u) {
  const s = u.toLowerCase().trim();
  return s ? Mc.filter((o) => {
    var c;
    return o.label.toLowerCase().includes(s) || ((c = o.description) == null ? void 0 : c.toLowerCase().includes(s)) || o.keywords.some((f) => f.toLowerCase().includes(s));
  }) : Mc;
}
const Jg = {
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
}, Wg = {
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
}, Fg = {
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
}, Ig = {
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
}, Pg = {
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
}, e3 = {
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
}, t3 = {
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
}, qs = {
  sillytavern: e3,
  // SillyTavern 继承主题
  paperLight: Jg,
  twitterDark: Fg,
  claudeDark: Wg,
  catppuccin: Pg,
  discord: Ig,
  glass: t3
}, lt = [];
for (let u = 0; u < 256; ++u)
  lt.push((u + 256).toString(16).slice(1));
function n3(u, s = 0) {
  return (lt[u[s + 0]] + lt[u[s + 1]] + lt[u[s + 2]] + lt[u[s + 3]] + "-" + lt[u[s + 4]] + lt[u[s + 5]] + "-" + lt[u[s + 6]] + lt[u[s + 7]] + "-" + lt[u[s + 8]] + lt[u[s + 9]] + "-" + lt[u[s + 10]] + lt[u[s + 11]] + lt[u[s + 12]] + lt[u[s + 13]] + lt[u[s + 14]] + lt[u[s + 15]]).toLowerCase();
}
let wc;
const a3 = new Uint8Array(16);
function l3() {
  if (!wc) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    wc = crypto.getRandomValues.bind(crypto);
  }
  return wc(a3);
}
const r3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), j1 = { randomUUID: r3 };
function s3(u, s, o) {
  var f;
  u = u || {};
  const c = u.random ?? ((f = u.rng) == null ? void 0 : f.call(u)) ?? l3();
  if (c.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, n3(c);
}
function i3(u, s, o) {
  return j1.randomUUID && !u ? j1.randomUUID() : s3(u);
}
var Oc = function(u, s) {
  return Oc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, c) {
    o.__proto__ = c;
  } || function(o, c) {
    for (var f in c) Object.prototype.hasOwnProperty.call(c, f) && (o[f] = c[f]);
  }, Oc(u, s);
};
function gr(u, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  Oc(u, s);
  function o() {
    this.constructor = u;
  }
  u.prototype = s === null ? Object.create(s) : (o.prototype = s.prototype, new o());
}
function Rc(u) {
  var s = typeof Symbol == "function" && Symbol.iterator, o = s && u[s], c = 0;
  if (o) return o.call(u);
  if (u && typeof u.length == "number") return {
    next: function() {
      return u && c >= u.length && (u = void 0), { value: u && u[c++], done: !u };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Dc(u, s) {
  var o = typeof Symbol == "function" && u[Symbol.iterator];
  if (!o) return u;
  var c = o.call(u), f, m = [], p;
  try {
    for (; (s === void 0 || s-- > 0) && !(f = c.next()).done; ) m.push(f.value);
  } catch (x) {
    p = { error: x };
  } finally {
    try {
      f && !f.done && (o = c.return) && o.call(c);
    } finally {
      if (p) throw p.error;
    }
  }
  return m;
}
function Uc(u, s, o) {
  if (o || arguments.length === 2) for (var c = 0, f = s.length, m; c < f; c++)
    (m || !(c in s)) && (m || (m = Array.prototype.slice.call(s, 0, c)), m[c] = s[c]);
  return u.concat(m || Array.prototype.slice.call(s));
}
function Kt(u) {
  return typeof u == "function";
}
function am(u) {
  var s = function(c) {
    Error.call(c), c.stack = new Error().stack;
  }, o = u(s);
  return o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o;
}
var _c = am(function(u) {
  return function(o) {
    u(this), this.message = o ? o.length + ` errors occurred during unsubscription:
` + o.map(function(c, f) {
      return f + 1 + ") " + c.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = o;
  };
});
function Bc(u, s) {
  if (u) {
    var o = u.indexOf(s);
    0 <= o && u.splice(o, 1);
  }
}
var ei = (function() {
  function u(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return u.prototype.unsubscribe = function() {
    var s, o, c, f, m;
    if (!this.closed) {
      this.closed = !0;
      var p = this._parentage;
      if (p)
        if (this._parentage = null, Array.isArray(p))
          try {
            for (var x = Rc(p), g = x.next(); !g.done; g = x.next()) {
              var b = g.value;
              b.remove(this);
            }
          } catch (H) {
            s = { error: H };
          } finally {
            try {
              g && !g.done && (o = x.return) && o.call(x);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          p.remove(this);
      var S = this.initialTeardown;
      if (Kt(S))
        try {
          S();
        } catch (H) {
          m = H instanceof _c ? H.errors : [H];
        }
      var y = this._finalizers;
      if (y) {
        this._finalizers = null;
        try {
          for (var M = Rc(y), G = M.next(); !G.done; G = M.next()) {
            var z = G.value;
            try {
              C1(z);
            } catch (H) {
              m = m ?? [], H instanceof _c ? m = Uc(Uc([], Dc(m)), Dc(H.errors)) : m.push(H);
            }
          }
        } catch (H) {
          c = { error: H };
        } finally {
          try {
            G && !G.done && (f = M.return) && f.call(M);
          } finally {
            if (c) throw c.error;
          }
        }
      }
      if (m)
        throw new _c(m);
    }
  }, u.prototype.add = function(s) {
    var o;
    if (s && s !== this)
      if (this.closed)
        C1(s);
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
    o === s ? this._parentage = null : Array.isArray(o) && Bc(o, s);
  }, u.prototype.remove = function(s) {
    var o = this._finalizers;
    o && Bc(o, s), s instanceof u && s._removeParent(this);
  }, u.EMPTY = (function() {
    var s = new u();
    return s.closed = !0, s;
  })(), u;
})(), lm = ei.EMPTY;
function rm(u) {
  return u instanceof ei || u && "closed" in u && Kt(u.remove) && Kt(u.add) && Kt(u.unsubscribe);
}
function C1(u) {
  Kt(u) ? u() : u.unsubscribe();
}
var o3 = {
  Promise: void 0
}, c3 = {
  setTimeout: function(u, s) {
    for (var o = [], c = 2; c < arguments.length; c++)
      o[c - 2] = arguments[c];
    return setTimeout.apply(void 0, Uc([u, s], Dc(o)));
  },
  clearTimeout: function(u) {
    return clearTimeout(u);
  },
  delegate: void 0
};
function u3(u) {
  c3.setTimeout(function() {
    throw u;
  });
}
function N1() {
}
function Gs(u) {
  u();
}
var tu = (function(u) {
  gr(s, u);
  function s(o) {
    var c = u.call(this) || this;
    return c.isStopped = !1, o ? (c.destination = o, rm(o) && o.add(c)) : c.destination = m3, c;
  }
  return s.create = function(o, c, f) {
    return new Lc(o, c, f);
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
})(ei), d3 = (function() {
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
})(), Lc = (function(u) {
  gr(s, u);
  function s(o, c, f) {
    var m = u.call(this) || this, p;
    return Kt(o) || !o ? p = {
      next: o ?? void 0,
      error: c ?? void 0,
      complete: f ?? void 0
    } : p = o, m.destination = new d3(p), m;
  }
  return s;
})(tu);
function Rs(u) {
  u3(u);
}
function f3(u) {
  throw u;
}
var m3 = {
  closed: !0,
  next: N1,
  error: f3,
  complete: N1
}, h3 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function g3(u) {
  return u;
}
function p3(u) {
  return u.length === 0 ? g3 : u.length === 1 ? u[0] : function(o) {
    return u.reduce(function(c, f) {
      return f(c);
    }, o);
  };
}
var E1 = (function() {
  function u(s) {
    s && (this._subscribe = s);
  }
  return u.prototype.lift = function(s) {
    var o = new u();
    return o.source = this, o.operator = s, o;
  }, u.prototype.subscribe = function(s, o, c) {
    var f = this, m = b3(s) ? s : new Lc(s, o, c);
    return Gs(function() {
      var p = f, x = p.operator, g = p.source;
      m.add(x ? x.call(m, g) : g ? f._subscribe(m) : f._trySubscribe(m));
    }), m;
  }, u.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (o) {
      s.error(o);
    }
  }, u.prototype.forEach = function(s, o) {
    var c = this;
    return o = T1(o), new o(function(f, m) {
      var p = new Lc({
        next: function(x) {
          try {
            s(x);
          } catch (g) {
            m(g), p.unsubscribe();
          }
        },
        error: m,
        complete: f
      });
      c.subscribe(p);
    });
  }, u.prototype._subscribe = function(s) {
    var o;
    return (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(s);
  }, u.prototype[h3] = function() {
    return this;
  }, u.prototype.pipe = function() {
    for (var s = [], o = 0; o < arguments.length; o++)
      s[o] = arguments[o];
    return p3(s)(this);
  }, u.prototype.toPromise = function(s) {
    var o = this;
    return s = T1(s), new s(function(c, f) {
      var m;
      o.subscribe(function(p) {
        return m = p;
      }, function(p) {
        return f(p);
      }, function() {
        return c(m);
      });
    });
  }, u.create = function(s) {
    return new u(s);
  }, u;
})();
function T1(u) {
  var s;
  return (s = u ?? o3.Promise) !== null && s !== void 0 ? s : Promise;
}
function x3(u) {
  return u && Kt(u.next) && Kt(u.error) && Kt(u.complete);
}
function b3(u) {
  return u && u instanceof tu || x3(u) && rm(u);
}
function y3(u) {
  return Kt(u == null ? void 0 : u.lift);
}
function v3(u) {
  return function(s) {
    if (y3(s))
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
function S3(u, s, o, c, f) {
  return new j3(u, s, o, c, f);
}
var j3 = (function(u) {
  gr(s, u);
  function s(o, c, f, m, p, x) {
    var g = u.call(this, o) || this;
    return g.onFinalize = p, g.shouldUnsubscribe = x, g._next = c ? function(b) {
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
})(tu), C3 = am(function(u) {
  return function() {
    u(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), nu = (function(u) {
  gr(s, u);
  function s() {
    var o = u.call(this) || this;
    return o.closed = !1, o.currentObservers = null, o.observers = [], o.isStopped = !1, o.hasError = !1, o.thrownError = null, o;
  }
  return s.prototype.lift = function(o) {
    var c = new w1(this, this);
    return c.operator = o, c;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new C3();
  }, s.prototype.next = function(o) {
    var c = this;
    Gs(function() {
      var f, m;
      if (c._throwIfClosed(), !c.isStopped) {
        c.currentObservers || (c.currentObservers = Array.from(c.observers));
        try {
          for (var p = Rc(c.currentObservers), x = p.next(); !x.done; x = p.next()) {
            var g = x.value;
            g.next(o);
          }
        } catch (b) {
          f = { error: b };
        } finally {
          try {
            x && !x.done && (m = p.return) && m.call(p);
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
    var c = this, f = this, m = f.hasError, p = f.isStopped, x = f.observers;
    return m || p ? lm : (this.currentObservers = null, x.push(o), new ei(function() {
      c.currentObservers = null, Bc(x, o);
    }));
  }, s.prototype._checkFinalizedStatuses = function(o) {
    var c = this, f = c.hasError, m = c.thrownError, p = c.isStopped;
    f ? o.error(m) : p && o.complete();
  }, s.prototype.asObservable = function() {
    var o = new E1();
    return o.source = this, o;
  }, s.create = function(o, c) {
    return new w1(o, c);
  }, s;
})(E1), w1 = (function(u) {
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
})(nu);
function N3(u, s) {
  return v3(function(o, c) {
    var f = 0;
    o.subscribe(S3(c, function(m) {
      return u.call(s, m, f++) && c.next(m);
    }));
  });
}
const Ds = new nu(), E3 = {
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
    const o = Ds.pipe(N3((c) => c.type === u)).subscribe((c) => s(c.payload));
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
const Xs = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, sm = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, im = new nu();
let hn = [], ur = { ...sm };
function T3(u) {
  return new Date(u).toTimeString().slice(0, 8);
}
function ol(u, s, o, c) {
  if (u < ur.minLevel) return;
  const f = {
    id: i3(),
    timestamp: Date.now(),
    level: u,
    module: s,
    message: o,
    data: c
  };
  hn.push(f), hn.length > ur.maxEntries && (hn = hn.slice(-ur.maxEntries)), im.next(f);
}
function w3() {
  E3.subscribe((u) => {
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
    ol(o, "EventBus", `${u.type}`, u.payload);
  });
}
const ae = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(u) {
    u && (ur = { ...ur, ...u }), hn = [], w3(), ae.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(u, s, o) {
    ol(Ue.DEBUG, u, s, o);
  },
  /**
   * INFO 级别日志
   */
  info(u, s, o) {
    ol(Ue.INFO, u, s, o);
  },
  /**
   * SUCCESS 级别日志
   */
  success(u, s, o) {
    ol(Ue.SUCCESS, u, s, o);
  },
  /**
   * WARN 级别日志
   */
  warn(u, s, o) {
    ol(Ue.WARN, u, s, o);
  },
  /**
   * ERROR 级别日志
   */
  error(u, s, o) {
    ol(Ue.ERROR, u, s, o);
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
    const s = im.subscribe(u);
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
      const f = T3(c.timestamp), m = s[c.level].padEnd(7), p = c.module.padEnd(16);
      if (o += `[${f}] [${p}] ${m} ${c.message}
`, c.data !== void 0) {
        const x = JSON.stringify(c.data, null, 2).split(`
`).map((g) => `    ${g}`).join(`
`);
        o += `${x}
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
}, au = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: sm,
  LogLevel: Ue,
  LogLevelConfig: Xs,
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
    opacity: 0.3,
    blur: 10
  }
});
class pe {
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
    const c = s.extensionSettings[this.EXTENSION_NAME];
    for (const f of Object.keys(ma))
      f in c || (c[f] = ma[f], o = !0, ae.debug("SettingsManager", `Added missing field: ${f}`));
    o && this.save();
  }
  /**
   * Get a specific setting value
   */
  static get(s) {
    const c = this.getExtensionSettings()[s];
    return c !== void 0 ? c : ma[s];
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
    c.extensionSettings[this.EXTENSION_NAME] || (c.extensionSettings[this.EXTENSION_NAME] = { ...ma }), c.extensionSettings[this.EXTENSION_NAME][s] = o, ae.debug("SettingsManager", `Set ${String(s)} = ${JSON.stringify(o)}`), this.save();
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
He(pe, "EXTENSION_NAME", "engram");
const om = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: pe
}, Symbol.toStringTag, { value: "Module" }));
class Qn {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let o = pe.loadSettings().theme;
    o || (o = localStorage.getItem(this.STORAGE_KEY), o && pe.set("theme", o));
    const c = qs[o] ? o : "claudeDark";
    this.setTheme(c), ae.info("ThemeManager", `主题系统初始化完成: ${c}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    qs[s] || (ae.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, pe.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
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
    var G;
    const o = qs[s];
    if (!o) return;
    const c = document.documentElement, f = (z, H) => {
      c.style.setProperty(z, H);
    }, p = ((G = pe.getSettings().glassSettings) == null ? void 0 : G.opacity) ?? 1, g = !(s === "glass") && p < 1, b = Math.round((1 - p) * 100), S = [
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
    Object.entries(o.colors).forEach(([z, H]) => {
      let Q = `--${z.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      Q = Q.replace(/(\d+)/, "-$1");
      let X = H;
      if (g && S.includes(z)) {
        const F = z.toLowerCase().includes("border") ? Math.round(b * 0.1) : b;
        X = `color-mix(in srgb, ${H}, transparent ${F}%)`;
      }
      f(Q, X);
    }), Object.entries(o.variables).forEach(([z, H]) => {
      f(`--${z}`, H);
    }), s !== "paperLight" ? c.classList.add("dark") : c.classList.remove("dark");
    const M = pe.getSettings();
    M.glassSettings ? (f("--glass-opacity", M.glassSettings.opacity.toString()), f("--glass-blur", `${M.glassSettings.blur}px`), M.glassSettings.blur > 0 ? f("--glass-backdrop-filter", `blur(${M.glassSettings.blur}px)`) : f("--glass-backdrop-filter", "none")) : f("--glass-backdrop-filter", "none");
  }
}
He(Qn, "STORAGE_KEY", "engram-theme"), He(Qn, "currentTheme", "claudeDark");
const Hc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Qn
}, Symbol.toStringTag, { value: "Module" })), cm = A.createContext(void 0);
function um({ children: u }) {
  const [s, o] = A.useState(Qn.getTheme()), c = s !== "paperLight", f = (m) => {
    Qn.setTheme(m), o(m);
  };
  return A.useEffect(() => {
    const m = Qn.getTheme();
    m !== s && o(m);
  }, []), /* @__PURE__ */ r.jsx(cm.Provider, { value: { theme: s, setTheme: f, isDarkMode: c }, children: u });
}
function _3() {
  const u = A.useContext(cm);
  if (u === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return u;
}
const z3 = ({ onNavigate: u }) => {
  const { setTheme: s } = _3(), [o, c] = A.useState(""), [f, m] = A.useState(!1), [p, x] = A.useState(0), [g, b] = A.useState(Mc), S = A.useRef(null), y = [
    {
      id: "theme-paper-light",
      icon: Lg,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: v1,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: v1,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: S1,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: S1,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  A.useEffect(() => {
    const z = Kg(o), H = o.toLowerCase().trim(), Q = y.filter(
      (X) => {
        var P;
        return !H || X.label.toLowerCase().includes(H) || ((P = X.description) == null ? void 0 : P.toLowerCase().includes(H)) || X.keywords.some((F) => F.toLowerCase().includes(H));
      }
    );
    b([...z, ...Q]), x(0);
  }, [o]), A.useEffect(() => {
    const z = (H) => {
      (H.metaKey || H.ctrlKey) && H.key === "k" && (H.preventDefault(), m(!0));
    };
    return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z);
  }, []), A.useEffect(() => {
    f && setTimeout(() => {
      var z;
      return (z = S.current) == null ? void 0 : z.focus();
    }, 50);
  }, [f]);
  const M = (z) => {
    const H = g.length + (o ? 1 : 0);
    switch (z.key) {
      case "ArrowDown":
        z.preventDefault(), x((Q) => (Q + 1) % H);
        break;
      case "ArrowUp":
        z.preventDefault(), x((Q) => (Q - 1 + H) % H);
        break;
      case "Enter":
        z.preventDefault(), G();
        break;
      case "Escape":
        m(!1);
        break;
    }
  }, G = () => {
    g.length > 0 && p < g.length ? g[p].action(u) : o && (console.log("Searching memory for:", o), u("/memory")), m(!1), c("");
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
        onClick: (z) => {
          z.target === z.currentTarget && m(!1);
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
                    ref: S,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: o,
                    onChange: (z) => c(z.target.value),
                    onKeyDown: M
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                g.length > 0 && /* @__PURE__ */ r.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  g.map((z, H) => /* @__PURE__ */ r.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${H === p ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        z.action(u), m(!1), c("");
                      },
                      onMouseEnter: () => x(H),
                      children: [
                        /* @__PURE__ */ r.jsx(z.icon, { size: 18, className: `shrink-0 ${H === p ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ r.jsx("div", { className: "text-sm font-medium", children: z.label }),
                          z.description && /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: z.description })
                        ] }),
                        H === p && /* @__PURE__ */ r.jsx(y1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    },
                    z.id
                  ))
                ] }),
                o && /* @__PURE__ */ r.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "全站搜索" }),
                  /* @__PURE__ */ r.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${p === g.length ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => G(),
                      onMouseEnter: () => x(g.length),
                      children: [
                        /* @__PURE__ */ r.jsx(cl, { size: 18, className: `shrink-0 ${p === g.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ r.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ r.jsx("span", { className: "text-primary", children: o }),
                            '"'
                          ] }),
                          /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        p === g.length && /* @__PURE__ */ r.jsx(y1, { size: 16, className: "text-muted-foreground/50" })
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
}, qc = ({ className: u = "", size: s = 24 }) => /* @__PURE__ */ r.jsx(
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
), k3 = ({
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
        children: /* @__PURE__ */ r.jsx(fg, { size: 20 })
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ r.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ r.jsx(qc, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ r.jsx(qc, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ r.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ r.jsx("div", { className: "flex-1" }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
    /* @__PURE__ */ r.jsx(z3, { onNavigate: c }),
    /* @__PURE__ */ r.jsx("div", { className: "h-4 w-[1px] bg-border mx-1" }),
    /* @__PURE__ */ r.jsx(
      "button",
      {
        className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
        onClick: o,
        title: "关闭扩展",
        children: /* @__PURE__ */ r.jsx(Ps, { size: 20 })
      }
    )
  ] })
] }), A3 = ({ className: u = "", height: s = 24 }) => {
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
He(ga, "instance");
let Gc = ga;
const st = Gc.getInstance(), M3 = "0.2.1", O3 = {
  version: M3
}, ll = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
  // 实际分支名是 master
}, Bs = O3.version;
let ir = null, or = null;
function zc(u, s) {
  const o = u.split(".").map(Number), c = s.split(".").map(Number);
  for (let f = 0; f < Math.max(o.length, c.length); f++) {
    const m = o[f] || 0, p = c[f] || 0;
    if (m > p) return 1;
    if (m < p) return -1;
  }
  return 0;
}
class ha {
  /**
   * 获取当前版本
   */
  static getCurrentVersion() {
    return Bs;
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
    return s ? zc(s, Bs) > 0 : !1;
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
      return pe.get("lastReadVersion") || "0.0.0";
    } catch {
      return "0.0.0";
    }
  }
  /**
   * 标记版本已读
   */
  static async markAsRead(s) {
    const o = s || await this.getLatestVersion() || Bs;
    try {
      pe.set("lastReadVersion", o), console.debug("[Engram] UpdateService: 已标记版本已读", o);
    } catch (c) {
      console.error("[Engram] UpdateService: 标记已读失败", c);
    }
  }
  /**
   * 检查是否有未读更新
   */
  static async hasUnreadUpdate() {
    const s = await this.getLatestVersion();
    if (!s || zc(s, Bs) <= 0)
      return !1;
    const o = this.getReadVersion();
    return zc(s, o) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    ir = null, or = null;
  }
}
const R3 = ({ isOpen: u, onClose: s }) => {
  const [o, c] = A.useState(!0), [f, m] = A.useState(null), [p, x] = A.useState(null), [g, b] = A.useState(!1), [S, y] = A.useState(!1), M = ha.getCurrentVersion();
  A.useEffect(() => {
    u && G();
  }, [u]);
  const G = async () => {
    c(!0);
    try {
      const [Q, X, P] = await Promise.all([
        ha.getLatestVersion(),
        ha.getChangelog(),
        ha.hasUpdate()
      ]);
      m(Q), x(X), b(P);
    } catch (Q) {
      console.error("[Engram] 加载更新信息失败", Q);
    } finally {
      c(!1);
    }
  }, z = async () => {
    y(!0);
    try {
      const Q = f || M;
      console.debug("[Engram] Marking update as read:", Q), await ha.markAsRead(Q), s();
    } finally {
      y(!1);
    }
  }, H = () => {
    ha.clearCache(), G();
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
          /* @__PURE__ */ r.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ r.jsx(Vs, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("h2", { className: "text-base font-semibold text-foreground", children: "更新通知" }),
            /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "当前版本: v",
              M
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: H,
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
              children: /* @__PURE__ */ r.jsx(Ps, { size: 16 })
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
          g ? /* @__PURE__ */ r.jsx(Vs, { size: 20, className: "text-primary" }) : /* @__PURE__ */ r.jsx(Qc, { size: 20, className: "text-green-500" }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("p", { className: "font-medium text-foreground", children: g ? `发现新版本: v${f}` : "已是最新版本" }),
            /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: g ? "请手动更新扩展以获取新功能" : "无需更新" })
          ] })
        ] }) }),
        p && /* @__PURE__ */ r.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "更新日志" }),
          /* @__PURE__ */ r.jsx("div", { className: "bg-muted/20 rounded-lg p-4 max-h-64 overflow-y-auto", children: /* @__PURE__ */ r.jsxs("pre", { className: "text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed", children: [
            p.substring(0, 2e3),
            p.length > 2e3 && `

... (更多内容请查看完整日志)`
          ] }) })
        ] }),
        !p && !o && /* @__PURE__ */ r.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "无法获取更新日志" }) })
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
            onClick: z,
            disabled: S,
            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            children: S ? "处理中..." : "我知道了"
          }
        )
      ] })
    ] })
  ] }) : null;
}, _1 = [
  { id: "dashboard", label: "仪表盘", icon: rg },
  { id: "memory", label: "记忆流", icon: w4 },
  { id: "graph", label: "神经图谱", icon: P1 },
  { id: "processing", label: "数据处理", icon: p4 },
  { id: "presets", label: "API 预设", icon: mr },
  { id: "devlog", label: "开发日志", icon: dl },
  { id: "settings", label: "系统设置", icon: Pc }
], D3 = ({ children: u, activeTab: s, setActiveTab: o, onClose: c }) => {
  const [f, m] = A.useState(!1), [p, x] = A.useState(!1), [g, b] = A.useState(!1);
  return A.useEffect(() => {
    (async () => {
      try {
        const y = await ha.hasUnreadUpdate();
        b(y);
      } catch (y) {
        console.debug("[Engram] 检查更新失败", y);
      }
    })();
  }, []), /* @__PURE__ */ r.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary animate-in fade-in duration-300", id: "engram-layout-root", children: [
    /* @__PURE__ */ r.jsx(Zg, {}),
    /* @__PURE__ */ r.jsx(
      R3,
      {
        isOpen: p,
        onClose: () => {
          x(!1), b(!1);
        }
      }
    ),
    /* @__PURE__ */ r.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50 animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both", style: { animationDelay: "100ms", animationFillMode: "both" }, children: [
      /* @__PURE__ */ r.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: _1.map((S) => {
        const y = S.icon, M = s === S.id;
        return /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: () => o(S.id),
            className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${M ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
            children: [
              /* @__PURE__ */ r.jsx(y, { size: 18, strokeWidth: M ? 2 : 1.5, className: "flex-shrink-0" }),
              /* @__PURE__ */ r.jsx("span", { className: `text-xs ${M ? "font-medium" : "font-normal"}`, children: S.label })
            ]
          },
          S.id
        );
      }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "pb-3 pt-2 border-t border-border/30 mt-2 space-y-2", children: [
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            onClick: () => x(!0),
            className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left",
            children: [
              /* @__PURE__ */ r.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ r.jsx(b4, { size: 16, strokeWidth: 1.5 }),
                g && /* @__PURE__ */ r.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ r.jsx("span", { className: "text-xs", children: "更新通知" }),
              g && /* @__PURE__ */ r.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("div", { className: "opacity-40 text-muted-foreground px-2", children: /* @__PURE__ */ r.jsx(A3, { height: 12 }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ r.jsx(
        k3,
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
                        children: /* @__PURE__ */ r.jsx(Ps, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsx("nav", { className: "space-y-4 flex-1 overflow-y-auto", children: _1.map((S) => {
                    const y = s === S.id;
                    return /* @__PURE__ */ r.jsxs(
                      "button",
                      {
                        onClick: () => {
                          o(S.id), m(!1);
                        },
                        className: `
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${y ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                            `,
                        children: [
                          /* @__PURE__ */ r.jsx(S.icon, { size: 22, className: y ? "text-primary" : "text-muted-foreground/70" }),
                          /* @__PURE__ */ r.jsx("span", { children: S.label })
                        ]
                      },
                      S.id
                    );
                  }) }),
                  /* @__PURE__ */ r.jsx("div", { className: "mt-auto pt-6 border-t border-border/20", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 px-2 text-xs text-muted-foreground/50", children: [
                    /* @__PURE__ */ r.jsx(qc, { size: 14 }),
                    /* @__PURE__ */ r.jsx("span", { children: "Engram v0.1.0" })
                  ] }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ r.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background", children: /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth animate-blur-in fill-mode-both", style: { animationDelay: "200ms", animationFillMode: "both" }, children: /* @__PURE__ */ r.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: u }) }) })
    ] }),
    "  "
  ] });
}, kc = ({
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
function ba() {
  var u, s;
  try {
    return ((s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) || null;
  } catch (o) {
    return console.warn("[Engram] Failed to get ST context:", o), null;
  }
}
function U3() {
  const u = ba();
  return (u == null ? void 0 : u.chat) || [];
}
function B3() {
  return U3();
}
function dm() {
  const u = ba();
  return u ? {
    name: u.name2,
    id: u.characterId
  } : null;
}
function fm() {
  try {
    return window.selected_model || void 0;
  } catch {
    return;
  }
}
function L3() {
  return ba() !== null;
}
async function z1() {
  const { Logger: u } = await Promise.resolve().then(() => au);
  await u.init(), u.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: s } = await Promise.resolve().then(() => om);
  s.initSettings(), u.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: c } = await Promise.resolve().then(() => K5), f = await c();
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
  H3();
  const { ThemeManager: o } = await Promise.resolve().then(() => Hc);
  o.init(), $3();
  try {
    const { CharacterDeleteService: c } = await Promise.resolve().then(() => hp);
    c.init(), u.info("STBridge", "CharacterDeleteService initialized");
  } catch (c) {
    u.warn("STBridge", "Failed to initialize CharacterDeleteService", { error: String(c) });
  }
  u.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const mm = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function H3() {
  const u = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!u) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), q3();
    return;
  }
  const o = document.createElement("div");
  o.id = "engram-drawer", o.className = "drawer";
  const c = document.createElement("div");
  c.className = "drawer-toggle drawer-header";
  const f = document.createElement("div");
  f.id = "engram-drawer-icon", f.className = "drawer-icon fa-fw closedIcon", f.title = "Engram - 记忆操作系统", f.setAttribute("data-i18n", "[title]Engram - Memory OS"), f.innerHTML = mm, f.addEventListener("click", Zs), c.appendChild(f), o.appendChild(c), s ? (u.insertBefore(o, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (u.appendChild(o), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function q3() {
  const u = document.createElement("div");
  u.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", u.title = "Engram - 记忆操作系统", u.innerHTML = mm, u.addEventListener("click", Zs), document.body.appendChild(u);
}
let Qs = null;
function G3(u) {
  Qs = u, Qs = u;
}
let Yc = null, k1 = null;
function Y3(u) {
  Yc = u;
}
function $3() {
  if (!Yc) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const u = "engram-global-overlay";
  let s = document.getElementById(u);
  s || (s = document.createElement("div"), s.id = u, s.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(s)), k1 || (k1 = Yc(s, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let Ac = !1, cr = null, Ys = null;
function Zs() {
  Ac && cr ? (Ys && (Ys.unmount(), Ys = null), cr.remove(), cr = null, Ac = !1) : (cr = V3(), document.body.appendChild(cr), Ac = !0);
}
function V3() {
  var s;
  const u = document.createElement("div");
  return u.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", u.style.backgroundColor = "var(--background)", u.style.color = "var(--foreground)", u.style.height = "100dvh", u.style.width = "100vw", u.style.top = "0", u.style.left = "0", u.id = "engram-panel-root", Qs ? Ys = Qs(u, Zs) : (u.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = u.querySelector("button")) == null || s.addEventListener("click", Zs)), u;
}
async function X3(u, s) {
  try {
    const c = await new Function("path", "return import(path)")("/scripts/chats.js");
    c && typeof c.hideChatMessageRange == "function" ? (await c.hideChatMessageRange(u, s, !1), console.log(`[Engram] Hidden messages range: ${u}-${s}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (o) {
    console.error("[Engram] Failed to hide messages:", o);
  }
}
async function Q3(u, s = "text", o = "") {
  return window.callPopup ? window.callPopup(u, s, o) : (console.warn("[Engram] callPopup not available"), Promise.resolve(s === "confirm" ? !0 : null));
}
const Z3 = (u) => {
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
}, A1 = ({ onNavigate: u }) => {
  const [s, o] = A.useState([]), [c, f] = A.useState(ba()), [m, p] = A.useState(0);
  A.useEffect(() => (o(ae.getLogs().slice(0, 3)), ae.subscribe((y) => {
    o((M) => [y, ...M].slice(0, 3));
  })), []), A.useEffect(() => {
    const S = setInterval(() => {
      p((y) => y + 1);
    }, 1e3);
    return () => clearInterval(S);
  }, []);
  const x = (S) => {
    const y = Math.floor(S / 3600), M = Math.floor(S % 3600 / 60), G = S % 60;
    return `${y.toString().padStart(2, "0")}:${M.toString().padStart(2, "0")}:${G.toString().padStart(2, "0")}`;
  }, g = (c == null ? void 0 : c.name2) || "Unknown", b = (S) => {
    u && u(S);
  };
  return /* @__PURE__ */ r.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ r.jsx(
        kc,
        {
          title: "ACTIVE MODEL",
          value: c ? "Connected" : "Offline",
          subtext: c ? `Chatting with ${g}` : "Waiting for connection...",
          icon: tm,
          highlight: !!c
        }
      ),
      /* @__PURE__ */ r.jsx(
        kc,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: mr
        }
      ),
      /* @__PURE__ */ r.jsx(
        kc,
        {
          title: "SYSTEM UPTIME",
          value: x(m),
          subtext: "Session Duration",
          icon: Zc
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ r.jsx(eu, { size: 16 }),
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
        /* @__PURE__ */ r.jsx(dl, { size: 16 }),
        /* @__PURE__ */ r.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ r.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => b("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map((S) => /* @__PURE__ */ r.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${Z3(S.level)}`, children: [
        /* @__PURE__ */ r.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(S.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ r.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: S.message })
      ] }, S.id)) })
    ] })
  ] }) });
}, ti = ({ title: u, subtitle: s, actions: o }) => /* @__PURE__ */ r.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: u }),
    s && /* @__PURE__ */ r.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: s })
  ] }),
  o && /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: o })
] }), M1 = ({
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
), K3 = () => {
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
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(Fc, { size: 16 }) }),
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(ug, { size: 16 }) }),
      /* @__PURE__ */ r.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ r.jsx(Pc, { size: 16 }) })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ r.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ r.jsx("defs", { children: /* @__PURE__ */ r.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ r.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((o, c) => {
        const f = u.find((y) => y.id === o.source), m = u.find((y) => y.id === o.target);
        if (!f || !m) return null;
        const p = f.x + 150 / 2, x = f.y + 60, g = m.x + 150 / 2, b = m.y, S = `M ${p} ${x} C ${p} ${x + 50}, ${g} ${b - 50}, ${g} ${b}`;
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
              o.type === "input" && /* @__PURE__ */ r.jsx(dl, { size: 12, className: "text-blue-400" }),
              o.type === "process" && /* @__PURE__ */ r.jsx(Zc, { size: 12, className: "text-purple-400" }),
              o.type === "output" && /* @__PURE__ */ r.jsx(mr, { size: 12, className: "text-emerald-400" }),
              o.label
            ] })
          ] })
        ]
      },
      o.id
    ))
  ] });
}, J3 = () => /* @__PURE__ */ r.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ r.jsx(
    ti,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ r.jsx(M1, { icon: Wc, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ r.jsx(M1, { icon: Pc, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ r.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ r.jsx(K3, {}) })
] });
function W3(u) {
  return new Date(u).toTimeString().slice(0, 8);
}
const F3 = {
  [Ue.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Ue.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Ue.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Ue.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Ue.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, I3 = ({ entry: u }) => {
  const [s, o] = A.useState(!1), c = u.data !== void 0, f = Xs[u.level], m = F3[u.level];
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
          /* @__PURE__ */ r.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: c ? s ? /* @__PURE__ */ r.jsx(ul, { size: 12 }) : /* @__PURE__ */ r.jsx(Xc, { size: 12 }) : null }),
          /* @__PURE__ */ r.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: W3(u.timestamp) }),
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
}, O1 = 100;
class P3 {
  constructor() {
    He(this, "entries", []);
    He(this, "listeners", /* @__PURE__ */ new Set());
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
      character: s.character,
      floorRange: s.floorRange,
      status: "pending"
    };
    return this.entries.unshift(c), this.trimEntries(), this.notifyListeners(), o;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(s, o) {
    const c = this.entries.find((p) => p.id === s);
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
      character: c.character,
      floorRange: c.floorRange
    };
    c.status = o.status, c.duration = o.duration;
    const m = this.entries.findIndex((p) => p.id === s);
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
    this.entries.length > O1 * 2 && (this.entries = this.entries.slice(0, O1 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const $n = new P3(), e5 = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  trim: { label: "修剪", color: "bg-yellow-500/20 text-yellow-500" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, t5 = ({ status: u }) => {
  switch (u) {
    case "pending":
      return /* @__PURE__ */ r.jsx(hr, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ r.jsx(Qc, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ r.jsx(Is, { size: 14, className: "text-red-400" });
  }
}, n5 = (u) => new Date(u).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), a5 = (u) => u === void 0 ? "-" : u < 1e3 ? `${u}ms` : `${(u / 1e3).toFixed(1)}s`, l5 = ({ sent: u, received: s }) => {
  const [o, c] = A.useState(!1), f = e5[u.type];
  return /* @__PURE__ */ r.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => c(!o),
        children: [
          o ? /* @__PURE__ */ r.jsx(ul, { size: 14 }) : /* @__PURE__ */ r.jsx(Xc, { size: 14 }),
          /* @__PURE__ */ r.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${f.color}`, children: f.label }),
          u.model && /* @__PURE__ */ r.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 truncate max-w-[100px]", title: `模型: ${u.model}`, children: u.model }),
          u.character && /* @__PURE__ */ r.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 truncate max-w-[80px]", title: `角色: ${u.character}`, children: u.character }),
          /* @__PURE__ */ r.jsx("span", { className: "text-xs text-muted-foreground", children: n5(u.timestamp) }),
          /* @__PURE__ */ r.jsx(t5, { status: (s == null ? void 0 : s.status) || u.status }),
          u.floorRange && /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            u.floorRange[0],
            "-",
            u.floorRange[1]
          ] }),
          /* @__PURE__ */ r.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ r.jsx(H4, { size: 12 }),
            a5((s == null ? void 0 : s.duration) || u.duration)
          ] })
        ]
      }
    ),
    o && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ r.jsx(Og, { size: 14 }),
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
          /* @__PURE__ */ r.jsx(K1, { size: 14 }),
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
}, r5 = () => {
  const [u, s] = A.useState($n.getPaired());
  return A.useEffect(() => $n.subscribe(() => {
    s($n.getPaired());
  }), []), /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ r.jsx(eu, { size: 16, className: "text-primary" }),
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
          onClick: () => $n.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ r.jsx(fl, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: u.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ r.jsx(K1, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-3", children: u.map(({ sent: o, received: c }) => /* @__PURE__ */ r.jsx(l5, { sent: o, received: c }, o.id)) }) })
  ] });
}, Ks = ({ tabs: u, activeTab: s, onChange: o, sticky: c = !0, top: f = 0, className: m = "", actions: p }) => /* @__PURE__ */ r.jsxs(
  "div",
  {
    className: `
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${c ? "sticky z-20 pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 backdrop-blur bg-background/80" : "px-0"}
            ${m}
        `,
    style: c ? {
      top: f
    } : void 0,
    children: [
      /* @__PURE__ */ r.jsx("div", { className: "flex overflow-x-auto gap-2 pb-1 no-scrollbar", children: u.map((x) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          onClick: () => o(x.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === x.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            x.icon && /* @__PURE__ */ r.jsx("span", { className: "w-4 h-4", children: x.icon }),
            x.label,
            s === x.id && /* @__PURE__ */ r.jsx("div", { className: "absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)] z-10 transition-all duration-300" })
          ]
        },
        x.id
      )) }),
      p && /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-2 pb-1 shrink-0", children: p })
    ]
  }
), s5 = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ r.jsx(dl, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ r.jsx(eu, { size: 14 }) }
], i5 = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], o5 = ({ initialTab: u }) => {
  const [s, o] = A.useState(u || "runtime"), [c, f] = A.useState([]), [m, p] = A.useState([]), [x, g] = A.useState(""), [b, S] = A.useState(-1), [y, M] = A.useState("ALL"), [G, z] = A.useState(!0), [H, Q] = A.useState(!1), [X, P] = A.useState(!1), F = A.useRef(null);
  A.useEffect(() => {
    f(ae.getLogs());
    const $ = ae.subscribe((Y) => {
      f((oe) => [...oe, Y]);
    });
    return () => $();
  }, []), A.useEffect(() => {
    let $ = c;
    if (b !== -1 && ($ = $.filter((Y) => Y.level >= b)), y !== "ALL" && ($ = $.filter((Y) => Y.module.startsWith(y))), x.trim()) {
      const Y = x.toLowerCase();
      $ = $.filter(
        (oe) => oe.message.toLowerCase().includes(Y) || oe.module.toLowerCase().includes(Y)
      );
    }
    p($);
  }, [c, b, y, x]), A.useEffect(() => {
    G && F.current && F.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [m, G]);
  const ie = A.useCallback(async () => {
    await ae.clear(), f([]);
  }, []), Se = A.useCallback(() => {
    const $ = ae.exportToMarkdown(), Y = ae.getExportFilename(), oe = new Blob([$], { type: "text/markdown" }), _e = URL.createObjectURL(oe), ce = document.createElement("a");
    ce.href = _e, ce.download = Y, ce.click(), URL.revokeObjectURL(_e), ae.success("DevLog", `日志已导出: ${Y}`);
  }, []);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ r.jsx(
      Ks,
      {
        tabs: s5,
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
              onClick: () => Q(!H),
              children: [
                b === -1 ? "全部级别" : Xs[b].label,
                /* @__PURE__ */ r.jsx(ul, { size: 12 })
              ]
            }
          ),
          H && /* @__PURE__ */ r.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col", children: [
            /* @__PURE__ */ r.jsx(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  S(-1), Q(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(Xs).map(([$, Y]) => /* @__PURE__ */ r.jsxs(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  S(Number($)), Q(!1);
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
              onClick: () => P(!X),
              children: [
                y,
                /* @__PURE__ */ r.jsx(ul, { size: 12 })
              ]
            }
          ),
          X && /* @__PURE__ */ r.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col", children: i5.map(($) => /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                M($), P(!1);
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
              value: x,
              onChange: ($) => g($.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${G ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => z(!G),
              title: "自动滚动",
              children: /* @__PURE__ */ r.jsx(h4, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: ie,
              title: "清空",
              children: /* @__PURE__ */ r.jsx(fl, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: Se,
              children: [
                /* @__PURE__ */ r.jsx(Vs, { size: 12 }),
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
        m.map(($) => /* @__PURE__ */ r.jsx(I3, { entry: $ }, $.id)),
        /* @__PURE__ */ r.jsx("div", { ref: F })
      ] }) }),
      /* @__PURE__ */ r.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        c.length,
        " 条日志",
        m.length !== c.length && ` · ${m.length} 条匹配`
      ] })
    ] }),
    s === "model" && /* @__PURE__ */ r.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ r.jsx(r5, {}) })
  ] });
}, c5 = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, u5 = ({
  icon: u,
  title: s,
  subtitle: o,
  meta: c,
  badges: f = [],
  selected: m = !1,
  disabled: p = !1,
  toggle: x,
  onClick: g,
  actions: b = [],
  className: S = "",
  compact: y = !1
}) => {
  const M = b.filter((z) => !z.hidden), G = !!x;
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${y ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${m ? "bg-accent/60" : "hover:bg-muted/40"}
                ${p ? "opacity-50 pointer-events-none" : ""}
                ${S}
            `,
      onClick: g,
      children: [
        (u || G) && /* @__PURE__ */ r.jsx("div", { className: "flex-shrink-0", children: G ? /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${x.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (z) => {
              z.stopPropagation(), x.onChange(!x.checked);
            },
            children: /* @__PURE__ */ r.jsx(Ic, { size: 14 })
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
                        ${x && !x.checked ? "line-through opacity-60" : ""}
                    `, children: s }),
            f.map((z, H) => /* @__PURE__ */ r.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${c5[z.color || "default"]}
                            `,
                children: z.text
              },
              H
            ))
          ] }),
          (o || c) && /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            o && /* @__PURE__ */ r.jsx("span", { className: "truncate", children: o }),
            c && /* @__PURE__ */ r.jsx("span", { className: "flex-shrink-0 font-mono", children: c })
          ] })
        ] }),
        m && !M.length && /* @__PURE__ */ r.jsx(W1, { size: 14, className: "text-primary flex-shrink-0" }),
        M.length > 0 && /* @__PURE__ */ r.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${m ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: M.map((z, H) => /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `
                                p-1.5 rounded transition-colors
                                ${z.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                            `,
            onClick: (Q) => {
              Q.stopPropagation(), z.onClick(Q);
            },
            title: z.title,
            children: z.icon
          },
          H
        )) })
      ]
    }
  );
}, d5 = ({
  preset: u,
  isSelected: s,
  onSelect: o,
  onEdit: c,
  onCopy: f,
  onDelete: m
}) => {
  var g;
  const p = u.source === "tavern" || u.source === "tavern_profile" ? tm : G4, x = u.source === "custom" ? ((g = u.custom) == null ? void 0 : g.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ r.jsx(
    u5,
    {
      icon: /* @__PURE__ */ r.jsx(p, { size: 14 }),
      title: u.name,
      subtitle: x,
      meta: `T:${u.parameters.temperature}`,
      badges: u.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: s,
      onClick: o,
      actions: [
        { icon: /* @__PURE__ */ r.jsx(yg, { size: 12 }), onClick: () => c(), title: "编辑" },
        { icon: /* @__PURE__ */ r.jsx(F1, { size: 12 }), onClick: () => f(), title: "复制" },
        { icon: /* @__PURE__ */ r.jsx(fl, { size: 12 }), onClick: () => m(), title: "删除", danger: !0, hidden: u.isDefault }
      ]
    }
  );
}, $s = ({
  checked: u,
  onChange: s,
  disabled: o = !1,
  className: c = "",
  id: f
}) => {
  const m = (p) => {
    o || (p.stopPropagation(), s(!u));
  };
  return /* @__PURE__ */ r.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      id: f,
      "aria-checked": u,
      onClick: m,
      disabled: o,
      className: `
                relative inline-flex h-3.5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-all duration-300 focus:outline-none
                ${u ? "bg-primary/20 border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)]" : "bg-black/20 border-border shadow-inner"}
                ${o ? "opacity-50 cursor-not-allowed" : ""}
                ${c}
            `,
      children: /* @__PURE__ */ r.jsx(
        "span",
        {
          className: `
                    pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full shadow-sm ring-0 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                    ${u ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary-foreground/20" : "bg-muted-foreground border border-transparent opacity-60"}
                `,
          style: { transform: u ? "translateX(24px)" : "translateX(2px)" }
        }
      )
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
  onChange: p,
  placeholder: x,
  type: g = "text",
  disabled: b,
  multiline: S,
  rows: y = 3
}) => {
  const M = {
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
        onChange: (G) => p(G.target.value),
        placeholder: x,
        disabled: b,
        rows: y,
        style: M,
        className: "font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ) : /* @__PURE__ */ r.jsx(
      "input",
      {
        type: g,
        value: m,
        onChange: (G) => p(G.target.value),
        placeholder: x,
        disabled: b,
        style: M,
        className: "placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ),
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
  onChange: p,
  min: x,
  max: g,
  step: b = 1,
  showSlider: S = !0,
  suffix: y
}) => {
  const M = {
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
  }, G = x !== void 0 && g !== void 0 ? Math.min(100, Math.max(0, (m - x) / (g - x) * 100)) : 0;
  return /* @__PURE__ */ r.jsxs("div", { className: `flex flex-col gap-2 ${f}`, children: [
    /* @__PURE__ */ r.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ r.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ r.jsx("span", { className: "text-destructive", children: "*" })
    ] }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
      S && x !== void 0 && g !== void 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex-1 relative h-4 flex items-center group cursor-pointer", children: [
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
            style: { left: `${G}%`, transform: "translate(-50%, -50%)" }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            min: x,
            max: g,
            step: b,
            value: m,
            onChange: (z) => p(Number(z.target.value)),
            className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
            style: { appearance: "none", WebkitAppearance: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          type: "number",
          min: x,
          max: g,
          step: b,
          value: m,
          onChange: (z) => p(Number(z.target.value)),
          style: M,
          className: "focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }
      )
    ] }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, pn = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: m,
  onChange: p,
  options: x,
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
          onChange: (y) => p(y.target.value),
          disabled: b,
          style: S,
          className: "disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors",
          children: [
            /* @__PURE__ */ r.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: g }),
            x.map((y) => /* @__PURE__ */ r.jsx("option", { value: y.value, className: "bg-popover text-foreground", children: y.label }, y.value))
          ]
        }
      ),
      /* @__PURE__ */ r.jsx(ul, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" })
    ] }),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, Vn = ({
  label: u,
  description: s,
  error: o,
  className: c = "",
  checked: f,
  onChange: m,
  disabled: p,
  compact: x
}) => /* @__PURE__ */ r.jsxs("div", { className: `flex items-start justify-between gap-4 ${x ? "py-0" : "py-1"} ${c} ${p ? "opacity-50 pointer-events-none" : ""}`, children: [
  u && /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ r.jsx(
      "label",
      {
        className: "text-xs text-foreground cursor-pointer block truncate",
        onClick: () => !p && m(!f),
        children: u
      }
    ),
    s && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5 break-words", children: s }),
    o && /* @__PURE__ */ r.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: o })
  ] }),
  /* @__PURE__ */ r.jsx(
    $s,
    {
      checked: f,
      onChange: m,
      disabled: p
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
    const { apiUrl: o, apiKey: c, timeout: f = this.DEFAULT_TIMEOUT } = s, m = o.replace(/\/+$/, ""), p = m.endsWith("/v1") ? `${m}/models` : `${m}/v1/models`;
    try {
      const x = new AbortController(), g = setTimeout(() => x.abort(), f), b = {
        "Content-Type": "application/json"
      };
      c && (b.Authorization = `Bearer ${c}`);
      const S = await fetch(p, {
        method: "GET",
        headers: b,
        signal: x.signal
      });
      if (clearTimeout(g), !S.ok)
        throw new Error(`HTTP ${S.status}: ${S.statusText}`);
      const y = await S.json(), M = (y.data || y || []).map((G) => ({
        id: G.id || G.model,
        name: G.name || G.id || G.model,
        owned_by: G.owned_by
      }));
      return ae.info("ModelService", `Fetched ${M.length} models from OpenAI API`), M.sort((G, z) => G.id.localeCompare(z.id));
    } catch (x) {
      throw x.name === "AbortError" ? ae.error("ModelService", "OpenAI API request timeout") : ae.error("ModelService", `OpenAI API error: ${x.message}`), x;
    }
  }
  /**
   * 获取 Ollama 模型列表
   */
  static async fetchOllamaModels(s) {
    const { apiUrl: o, timeout: c = this.DEFAULT_TIMEOUT } = s, m = `${o.replace(/\/+$/, "")}/api/tags`;
    try {
      const p = new AbortController(), x = setTimeout(() => p.abort(), c), g = await fetch(m, {
        method: "GET",
        signal: p.signal
      });
      if (clearTimeout(x), !g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const S = ((await g.json()).models || []).map((y) => ({
        id: y.name || y.model,
        name: y.name || y.model
      }));
      return ae.info("ModelService", `Fetched ${S.length} models from Ollama`), S;
    } catch (p) {
      throw ae.error("ModelService", `Ollama API error: ${p.message}`), p;
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
      const f = new AbortController(), m = setTimeout(() => f.abort(), c), p = await fetch("https://api.cohere.ai/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${o}`,
          "Content-Type": "application/json"
        },
        signal: f.signal
      });
      if (clearTimeout(m), !p.ok)
        throw new Error(`HTTP ${p.status}: ${p.statusText}`);
      const g = ((await p.json()).models || []).filter((b) => {
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
He(xn, "DEFAULT_TIMEOUT", 1e4);
const f5 = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], m5 = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function h5() {
  var u, s, o, c;
  try {
    const f = (o = (s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) == null ? void 0 : o.extensionSettings;
    return ((c = f == null ? void 0 : f.connectionManager) == null ? void 0 : c.profiles) || [];
  } catch (f) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", f), [];
  }
}
const g5 = ({
  preset: u,
  onChange: s,
  isNew: o = !1
}) => {
  var Se, $, Y, oe, _e, ce;
  const [c, f] = A.useState([]), [m, p] = A.useState(!1), [x, g] = A.useState([]), [b, S] = A.useState(!1), [y, M] = A.useState(null), G = () => {
    p(!0);
    try {
      const U = h5();
      f(U);
    } finally {
      p(!1);
    }
  }, z = async () => {
    const { apiUrl: U, apiKey: te, apiSource: xe } = u.custom || {};
    if (!U) {
      M("请先填写 API URL");
      return;
    }
    S(!0), M(null);
    try {
      let me = [];
      xe === "ollama" ? me = await xn.fetchOllamaModels({ apiUrl: U }) : me = await xn.fetchOpenAIModels({ apiUrl: U, apiKey: te }), g(me), me.length === 0 && M("未找到可用模型");
    } catch (me) {
      M(me.message || "获取模型列表失败"), g([]);
    } finally {
      S(!1);
    }
  };
  A.useEffect(() => {
    G();
  }, []);
  const H = (U) => {
    s({ ...u, ...U, updatedAt: Date.now() });
  }, Q = (U, te) => {
    H({
      parameters: { ...u.parameters, [U]: te }
    });
  }, X = (U, te) => {
    var xe, me, Ge, w;
    H({
      custom: {
        apiUrl: ((xe = u.custom) == null ? void 0 : xe.apiUrl) || "",
        apiKey: ((me = u.custom) == null ? void 0 : me.apiKey) || "",
        model: ((Ge = u.custom) == null ? void 0 : Ge.model) || "",
        apiSource: ((w = u.custom) == null ? void 0 : w.apiSource) || "openai",
        [U]: te
      }
    });
  }, P = (U) => {
    const te = U;
    H({
      source: te,
      tavernProfileId: te === "tavern_profile" ? u.tavernProfileId : void 0
    }), te === "tavern_profile" && G();
  }, F = c.map((U) => ({
    value: U.id,
    label: `${U.name} (${U.api || "Unknown"} - ${U.model || "Unknown"})`
  })), ie = c.find((U) => U.id === u.tavernProfileId);
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "基本信息", children: [
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "预设名称",
          value: u.name,
          onChange: (U) => H({ name: U }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "配置源",
          value: u.source,
          onChange: P,
          options: m5,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    u.source === "tavern_profile" && /* @__PURE__ */ r.jsxs(_t, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ r.jsx(
          pn,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: u.tavernProfileId || "",
            onChange: (U) => H({ tavernProfileId: U }),
            options: F,
            placeholder: m ? "加载中..." : "请选择配置文件",
            disabled: m || F.length === 0
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: G,
            disabled: m,
            title: "刷新配置列表",
            children: /* @__PURE__ */ r.jsx(Zt, { size: 16, className: m ? "animate-spin" : "" })
          }
        )
      ] }),
      F.length === 0 && !m && /* @__PURE__ */ r.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      ie && /* @__PURE__ */ r.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: ie.api || "-" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: ie.model || "-" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ r.jsx("span", { className: "text-foreground font-mono", children: ie.preset || "-" })
        ] })
      ] })
    ] }),
    u.source === "custom" && /* @__PURE__ */ r.jsxs(_t, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "API 类型",
          value: ((Se = u.custom) == null ? void 0 : Se.apiSource) || "openai",
          onChange: (U) => X("apiSource", U),
          options: f5
        }
      ),
      /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API URL",
          type: "url",
          value: (($ = u.custom) == null ? void 0 : $.apiUrl) || "",
          onChange: (U) => X("apiUrl", U),
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
          onChange: (U) => X("apiKey", U),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
          x.length > 0 ? /* @__PURE__ */ r.jsx(
            pn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((oe = u.custom) == null ? void 0 : oe.model) || "",
              onChange: (U) => X("model", U),
              options: x.map((U) => ({ value: U.id, label: U.name || U.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ r.jsx(
            pt,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((_e = u.custom) == null ? void 0 : _e.model) || "",
              onChange: (U) => X("model", U),
              placeholder: "gpt-4o-mini",
              required: !0
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: z,
              disabled: b || !((ce = u.custom) != null && ce.apiUrl),
              title: "获取模型列表",
              children: b ? /* @__PURE__ */ r.jsx(hr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
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
    /* @__PURE__ */ r.jsxs(_t, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ r.jsx(
        gn,
        {
          label: "温度 (Temperature)",
          value: u.parameters.temperature,
          onChange: (U) => Q("temperature", U),
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
          value: u.parameters.topP,
          onChange: (U) => Q("topP", U),
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
          value: u.parameters.maxTokens,
          onChange: (U) => Q("maxTokens", U),
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
          value: u.parameters.frequencyPenalty,
          onChange: (U) => Q("frequencyPenalty", U),
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
          value: u.parameters.presencePenalty,
          onChange: (U) => Q("presencePenalty", U),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] })
  ] });
}, p5 = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], R1 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, D1 = ["ollama", "vllm"], U1 = ["openai", "cohere", "jina", "voyage"], x5 = ({
  config: u,
  onChange: s
}) => {
  var G;
  const o = (z) => {
    s({ ...u, ...z });
  }, c = (z) => {
    o({
      source: z,
      model: R1[z],
      apiUrl: D1.includes(z) ? u.apiUrl : void 0,
      apiKey: U1.includes(z) ? u.apiKey : void 0
    });
  }, f = D1.includes(u.source), m = U1.includes(u.source), [p, x] = A.useState([]), [g, b] = A.useState(!1), [S, y] = A.useState(null), M = async () => {
    b(!0), y(null);
    try {
      let z = [];
      const H = { apiUrl: u.apiUrl || "", apiKey: u.apiKey };
      switch (u.source) {
        case "ollama":
          if (!u.apiUrl) {
            y("请先填写 API URL");
            return;
          }
          z = await xn.fetchOllamaModels(H);
          break;
        case "vllm":
          if (!u.apiUrl) {
            y("请先填写 API URL");
            return;
          }
          z = await xn.fetchVLLMModels(H);
          break;
        case "openai":
        case "cohere":
        case "jina":
        case "voyage":
          z = xn.getPresetModels(u.source);
          break;
        default:
          z = [];
      }
      x(z), z.length === 0 && y("未找到可用模型");
    } catch (z) {
      y(z.message || "获取模型列表失败"), x([]);
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ r.jsx(
        pn,
        {
          label: "向量源",
          value: u.source,
          onChange: (z) => c(z),
          options: p5,
          description: "选择向量化服务提供商"
        }
      ),
      f && /* @__PURE__ */ r.jsx(
        pt,
        {
          label: "API URL",
          type: "url",
          value: u.apiUrl || "",
          onChange: (z) => o({ apiUrl: z }),
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
          onChange: (z) => o({ apiKey: z }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-end gap-2", children: [
          p.length > 0 ? /* @__PURE__ */ r.jsx(
            pn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: u.model || "",
              onChange: (z) => o({ model: z }),
              options: p.map((z) => ({ value: z.id, label: z.name || z.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ r.jsx(
            pt,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: u.model || "",
              onChange: (z) => o({ model: z }),
              placeholder: R1[u.source],
              description: "使用的向量化模型"
            }
          ),
          (f || m) && /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: M,
              disabled: g,
              title: "获取模型列表",
              children: g ? /* @__PURE__ */ r.jsx(hr, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ r.jsx(Zt, { size: 16 })
            }
          )
        ] }),
        S && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: S }),
        p.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          p.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(_t, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ r.jsx(
      pt,
      {
        label: "向量维度",
        value: ((G = u.dimensions) == null ? void 0 : G.toString()) || "",
        onChange: (z) => {
          const H = parseInt(z, 10);
          o({ dimensions: isNaN(H) ? void 0 : H });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, b5 = ({
  config: u,
  onChange: s
}) => {
  const o = (S) => {
    s({ ...u, ...S });
  }, [c, f] = A.useState([]), [m, p] = A.useState(!1), [x, g] = A.useState(null), b = async () => {
    if (!u.url) {
      g("请先填写 API URL");
      return;
    }
    p(!0), g(null);
    try {
      const S = await xn.fetchOpenAIModels({
        apiUrl: u.url,
        apiKey: u.apiKey
      });
      S.length > 0 ? f(S) : f(xn.getCommonRerankModels());
    } catch {
      f(xn.getCommonRerankModels());
    } finally {
      p(!1);
    }
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "", children: [
    /* @__PURE__ */ r.jsx(_t, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ r.jsx(
      Vn,
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
              pn,
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
          x && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-destructive", children: x }),
          c.length > 0 && /* @__PURE__ */ r.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "已加载 ",
            c.length,
            " 个模型"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs(_t, { title: "参数设置", children: [
        /* @__PURE__ */ r.jsx(
          gn,
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
          gn,
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
}, y5 = `<system_configuration>
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
`, v5 = `你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。
`, S5 = `你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。
`, j5 = `你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。
`, Js = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], C5 = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, N5 = {
  maxChatHistory: 10
}, E5 = {
  source: "transformers"
}, T5 = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function hm(u = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: u,
    source: "tavern",
    parameters: { ...C5 },
    context: { ...N5 },
    isDefault: !0,
    createdAt: s,
    updatedAt: s
  };
}
function pa(u, s, o = {}) {
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
function w5() {
  return [
    pa("纯文本剧情总结", "text_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: y5,
      userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
      outputFormat: "plain"
    }),
    pa("向量化剧情总结", "vector_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: v5,
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
    pa("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: S5,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请将以下多条剧情摘要合并精简：

{{engramSummaries}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    pa("查询增强", "query_enhance", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: j5,
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
const _5 = {
  enabled: !0,
  includeGlobal: !0,
  disabledWorldbooks: []
}, z5 = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  countLimit: 5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
};
function B1() {
  return {
    llmPresets: [hm()],
    selectedPresetId: null,
    vectorConfig: { ...E5 },
    rerankConfig: { ...T5 },
    promptTemplates: w5(),
    worldbookConfig: { ..._5 }
  };
}
function k5(u) {
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
function A5(u) {
  var s;
  return ((s = Js.find((o) => o.value === u)) == null ? void 0 : s.label) || u;
}
const M5 = ({
  template: u,
  isSelected: s = !1,
  onSelect: o,
  onCopy: c,
  onDelete: f,
  onToggleEnabled: m,
  onImport: p
}) => {
  const x = A.useRef(null), g = (y) => {
    y.stopPropagation();
    const M = {
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
    }, G = new Blob([JSON.stringify(M, null, 2)], { type: "application/json" }), z = URL.createObjectURL(G), H = document.createElement("a");
    H.href = z, H.download = `engram_template_${u.name.replace(/\s+/g, "_")}.json`, H.click(), URL.revokeObjectURL(z);
  }, b = (y) => {
    var M;
    y.stopPropagation(), (M = x.current) == null || M.click();
  }, S = (y) => {
    var z;
    const M = (z = y.target.files) == null ? void 0 : z[0];
    if (!M || !p) return;
    const G = new FileReader();
    G.onload = (H) => {
      var Q;
      try {
        const X = JSON.parse((Q = H.target) == null ? void 0 : Q.result);
        if (X.version && X.template) {
          const P = pa(
            X.template.name,
            X.template.category,
            {
              enabled: u.enabled,
              // 保持当前启用状态
              isBuiltIn: u.isBuiltIn,
              // 保持内置状态
              boundPresetId: X.template.boundPresetId,
              systemPrompt: X.template.systemPrompt,
              userPromptTemplate: X.template.userPromptTemplate,
              outputFormat: X.template.outputFormat,
              availableVariables: X.template.availableVariables
            }
          );
          P.id = u.id, p(P);
        }
      } catch (X) {
        console.error("导入失败:", X);
      }
    }, G.readAsText(M), x.current && (x.current.value = "");
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
              onClick: (y) => {
                y.stopPropagation(), m == null || m(!u.enabled);
              },
              children: /* @__PURE__ */ r.jsx(Ic, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ r.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: u.name }),
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ r.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${k5(u.category)}`, children: A5(u.category) }),
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
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: b, title: "Import", children: /* @__PURE__ */ r.jsx(Vg, { size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: g, title: "Export", children: /* @__PURE__ */ r.jsx(Vs, { size: 12 }) }),
          /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (y) => {
            y.stopPropagation(), c == null || c();
          }, title: "Copy", children: /* @__PURE__ */ r.jsx(F1, { size: 12 }) }),
          !u.isBuiltIn && /* @__PURE__ */ r.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (y) => {
            y.stopPropagation(), f == null || f();
          }, title: "Delete", children: /* @__PURE__ */ r.jsx(fl, { size: 12 }) })
        ] }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            ref: x,
            type: "file",
            accept: ".json",
            onChange: S,
            className: "hidden"
          }
        )
      ]
    }
  );
}, O5 = ({
  templates: u,
  selectedId: s,
  onSelect: o,
  onAdd: c,
  onUpdate: f,
  onDelete: m
}) => {
  const p = () => {
    const y = pa(
      `新模板 ${u.length + 1}`,
      "text_summary"
    );
    c(y), o(y);
  }, x = (y) => {
    const M = pa(
      `${y.name} (副本)`,
      y.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: y.boundPresetId,
        systemPrompt: y.systemPrompt,
        userPromptTemplate: y.userPromptTemplate,
        outputFormat: y.outputFormat,
        availableVariables: [...y.availableVariables]
      }
    );
    c(M);
  }, g = (y, M) => {
    M && u.filter((G) => G.category === y.category && G.id !== y.id && G.enabled).forEach((G) => f({ ...G, enabled: !1 })), f({ ...y, enabled: M });
  }, b = (y) => {
    f(y);
  }, S = Js.map((y) => ({
    ...y,
    templates: u.filter((M) => M.category === y.value)
  })).filter((y) => y.templates.length > 0);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: p,
          children: /* @__PURE__ */ r.jsx(Fc, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      S.map((y) => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          y.label,
          /* @__PURE__ */ r.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: y.templates.map((M) => /* @__PURE__ */ r.jsx(
          M5,
          {
            template: M,
            isSelected: s === M.id,
            onSelect: () => o(M),
            onCopy: () => x(M),
            onDelete: () => m(M),
            onToggleEnabled: (G) => g(M, G),
            onImport: b
          },
          M.id
        )) })
      ] }, y.value)),
      u.length === 0 && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ r.jsx(Kc, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, R5 = [
  { name: "{{chatHistory}}", desc: "待处理的对话历史" },
  { name: "{{context}}", desc: "角色卡设定" },
  { name: "{{char}}", desc: "角色名" },
  { name: "{{user}}", desc: "用户名" },
  { name: "{{userInput}}", desc: "当前用户输入" },
  { name: "{{worldbookContext}}", desc: "世界书激活内容" },
  { name: "{{engramSummaries}}", desc: "Engram 所有摘要（用于精简）" }
], D5 = ({
  template: u,
  llmPresets: s,
  defaultPresetId: o,
  onChange: c
}) => {
  var p, x;
  const f = [
    { value: "", label: "使用默认预设" + (o ? ` (${((p = s.find((g) => g.id === o)) == null ? void 0 : p.name) || o})` : "") },
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
        pn,
        {
          label: "模板分类",
          value: u.category,
          onChange: (g) => m({ category: g }),
          options: Js.map((g) => ({ value: g.value, label: g.label })),
          description: (x = Js.find((g) => g.value === u.category)) == null ? void 0 : x.description
        }
      ),
      /* @__PURE__ */ r.jsx(
        pn,
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
      /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: R5.map((g) => /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ r.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap", children: g.name }),
        /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground", children: g.desc })
      ] }, g.name)) })
    ] })
  ] });
}, U5 = ({
  rules: u,
  selectedId: s,
  onSelect: o,
  onToggle: c,
  onDelete: f,
  onAdd: m,
  onReset: p
}) => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: p,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: m,
          children: /* @__PURE__ */ r.jsx(em, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1", children: [
    u.map((x) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${s === x.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => o(x.id),
        children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${x.enabled ? s === x.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (g) => {
                g.stopPropagation(), c(x.id);
              },
              title: x.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ r.jsx(Ic, { size: 14 })
            }
          ),
          /* @__PURE__ */ r.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ r.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ r.jsx("h4", { className: `text-sm font-medium truncate ${s === x.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!x.enabled && "opacity-50 line-through"}`, children: x.name }) }),
            /* @__PURE__ */ r.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ r.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              x.pattern,
              "/",
              x.flags
            ] }) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: `flex items-center ${s === x.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ r.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (g) => {
                g.stopPropagation(), f(x.id);
              },
              children: /* @__PURE__ */ r.jsx(fl, { size: 12 })
            }
          ) })
        ]
      },
      x.id
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
    He(this, "rules", []);
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
const Ws = new lu(), B5 = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], L5 = ({ rule: u, onChange: s }) => {
  var S;
  const [o, c] = A.useState(""), [f, m] = A.useState(""), [p, x] = A.useState({ valid: !0 }), g = new lu();
  A.useEffect(() => {
    const y = g.validatePattern(u.pattern, u.flags);
    x(y);
  }, [u.pattern, u.flags]), A.useEffect(() => {
    if (o && p.valid) {
      const y = g.processWithRule(o, u);
      m(y);
    } else
      m("");
  }, [o, u, p.valid]);
  const b = (y) => {
    const M = u.flags.split(""), G = M.indexOf(y);
    G >= 0 ? M.splice(G, 1) : M.push(y), s({ flags: M.join("") });
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
            onChange: (y) => s({ name: y.target.value }),
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
            onChange: (y) => s({ description: y.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ r.jsx("div", { className: "flex gap-2", children: L1.map((y) => /* @__PURE__ */ r.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${u.scope === y.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => s({ scope: y.value }),
            title: y.description,
            children: y.label
          },
          y.value
        )) }),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground", children: (S = L1.find((y) => y.value === u.scope)) == null ? void 0 : S.description })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          p.valid ? /* @__PURE__ */ r.jsx(Qc, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ r.jsx(Is, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${p.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: u.pattern,
            onChange: (y) => s({ pattern: y.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !p.valid && p.error && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-red-500", children: p.error })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: u.replacement,
            onChange: (y) => s({ replacement: y.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-wrap gap-2", children: B5.map((y) => /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${u.flags.includes(y.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => b(y.value),
            title: y.description,
            children: [
              y.label,
              " (",
              y.value,
              ")"
            ]
          },
          y.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ r.jsx(Wc, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ r.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: o,
            onChange: (y) => c(y.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      o && p.valid && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ r.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ r.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: f || /* @__PURE__ */ r.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ r.jsx(tg, { size: 16, className: "shrink-0 mt-0.5" }),
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
}, H5 = ({
  config: u,
  onChange: s,
  worldbookStructure: o = {},
  disabledEntries: c = {},
  onToggleWorldbook: f,
  onToggleEntry: m,
  onRefresh: p
}) => {
  const [x, g] = A.useState(/* @__PURE__ */ new Set()), [b, S] = A.useState(""), y = (X) => {
    s({
      ...u,
      [X]: !u[X]
    });
  }, M = (X) => {
    const P = new Set(x);
    P.has(X) ? P.delete(X) : P.add(X), g(P);
  }, G = (X) => {
    var P;
    return ((P = u.disabledWorldbooks) == null ? void 0 : P.includes(X)) || !1;
  }, z = (X, P) => {
    var F;
    return ((F = c[X]) == null ? void 0 : F.includes(P)) || !1;
  }, Q = Object.keys(o).sort().filter(
    (X) => X.toLowerCase().includes(b.toLowerCase()) || o[X].some(
      (P) => {
        var F, ie;
        return ((F = P.names) == null ? void 0 : F.join(" ").toLowerCase().includes(b.toLowerCase())) || ((ie = P.comment) == null ? void 0 : ie.toLowerCase().includes(b.toLowerCase()));
      }
    )
  );
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ r.jsxs(_t, { title: "基础设置", description: "控制世界书功能的全局开关", children: [
      /* @__PURE__ */ r.jsx(
        Vn,
        {
          label: "启用世界书增强",
          description: "是否在生成摘要时注入世界书内容",
          checked: u.enabled,
          onChange: () => y("enabled")
        }
      ),
      /* @__PURE__ */ r.jsx(
        Vn,
        {
          label: "包含全局世界书",
          description: "是否引入全局世界书（相当于 全选/全不选 全局世界书）",
          checked: u.includeGlobal,
          onChange: () => y("includeGlobal"),
          disabled: !u.enabled
        }
      )
    ] }),
    u.enabled && /* @__PURE__ */ r.jsxs(_t, { title: "世界书管理", description: "精细控制每个世界书及其条目的启用状态", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between mb-4 gap-4", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ r.jsx(cl, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索世界书或条目...",
              className: "w-full h-9 pl-9 pr-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              value: b,
              onChange: (X) => S(X.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            onClick: p,
            className: "inline-flex items-center justify-center rounded-md w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors",
            title: "刷新列表",
            children: /* @__PURE__ */ r.jsx(Zt, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-2", children: Q.length === 0 ? /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border border-dashed rounded-lg", children: [
        /* @__PURE__ */ r.jsx(Is, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ r.jsx("span", { className: "text-sm", children: "未找到匹配的世界书" })
      ] }) : Q.map((X) => {
        const P = G(X), F = o[X] || [], ie = x.has(X), Se = F.filter(($) => !z(X, $.uid)).length;
        return /* @__PURE__ */ r.jsxs("div", { className: `transition-all border-b border-border last:border-0 ${P ? "bg-muted/10 opacity-60 grayscale" : ""}`, children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between p-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3 flex-1 overflow-hidden", children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  onClick: () => M(X),
                  className: "p-1 hover:bg-accent rounded-sm transition-colors",
                  children: ie ? /* @__PURE__ */ r.jsx(ul, { size: 16 }) : /* @__PURE__ */ r.jsx(Xc, { size: 16 })
                }
              ),
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ r.jsx(j4, { size: 16, className: P ? "text-muted-foreground" : "text-primary" }),
                /* @__PURE__ */ r.jsx("span", { className: `font-medium truncate ${P ? "text-muted-foreground line-through" : ""}`, children: X }),
                /* @__PURE__ */ r.jsxs("span", { className: "text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full whitespace-nowrap", children: [
                  Se,
                  " / ",
                  F.length,
                  " 激活"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ r.jsx(
              Vn,
              {
                label: "",
                checked: !P,
                onChange: ($) => f == null ? void 0 : f(X, !$),
                compact: !0
              }
            ) })
          ] }),
          ie && !P && /* @__PURE__ */ r.jsx("div", { className: "pl-4 pr-1 py-1 flex flex-col gap-0 animate-in slide-in-from-top-1 duration-200", children: F.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "text-xs text-muted-foreground text-center py-4", children: "暂无条目" }) : F.map(($) => {
            const Y = z(X, $.uid);
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
                    $.keys.slice(0, 3).map((oe, _e) => /* @__PURE__ */ r.jsx("span", { className: "text-[10px] px-1 py-0.5 rounded border border-border bg-muted/20 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]", children: oe }, _e)),
                    $.keys.length > 3 && /* @__PURE__ */ r.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "+",
                      $.keys.length - 3
                    ] })
                  ] })
                ] }),
                ($.comment || $.content) && /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground/80 pl-3.5 break-words line-clamp-2", children: $.comment || $.content })
              ] }),
              /* @__PURE__ */ r.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ r.jsx(
                Vn,
                {
                  label: "",
                  checked: !Y,
                  onChange: (oe) => m == null ? void 0 : m(X, $.uid, !oe),
                  compact: !0
                }
              ) })
            ] }, $.uid);
          }) })
        ] }, X);
      }) })
    ] })
  ] });
};
async function H1(u) {
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
    return H1(s);
  }
  /**
   * 计算特定世界书中所有 Engram 总结条目的 Token 总和
   * 仅计算已启用的条目，使用关键词筛选
   * @param worldbookName 世界书名称
   */
  static async countSummaryTokens(s) {
    const c = (await this.getEntries(s)).filter(
      (p) => p.enabled && p.keys.includes(dr)
    );
    if (c.length === 0) return 0;
    const f = c.map((p) => p.content);
    return (await Promise.all(f.map((p) => this.countTokens(p)))).reduce((p, x) => p + x, 0);
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
    return c.length === 0 ? "" : (c.sort((m, p) => m.order - p.order), c.map((m) => {
      const p = m.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
      return `【${m.name}】
${p}`;
    }).join(`

---

`));
  }
  /**
   * 批量计算多段文本的 Token 数量
   * @param texts 文本数组
   */
  static async countTokensBatch(s) {
    return Promise.all(s.map((o) => H1(o)));
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
      const p = m.name2, x = `[Engram] ${p}`;
      if (console.debug("[Engram] WorldInfoService: 创建新世界书", x), f.createWorldbook)
        await f.createWorldbook(x);
      else
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用"), null;
      if (f.getCharWorldbookNames && f.rebindCharWorldbooks) {
        const g = f.getCharWorldbookNames("current");
        g && (g.additional.push(x), await f.rebindCharWorldbooks("current", g), console.info("[Engram] WorldInfoService: 世界书已绑定到角色", {
          character: p,
          worldbook: x
        }));
      }
      return x;
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
        const m = f, p = m.strategy, x = m.position, g = m.recursion, b = [];
        if (p != null && p.keys && Array.isArray(p.keys))
          for (const S of p.keys)
            typeof S == "string" ? b.push(S) : S && typeof S == "object" && "source" in S && b.push(S.source);
        return {
          uid: m.uid || 0,
          name: m.name || "",
          content: m.content || "",
          enabled: m.enabled ?? !0,
          constant: (p == null ? void 0 : p.type) === "constant",
          keys: b,
          position: (x == null ? void 0 : x.type) || "before_character_definition",
          depth: (x == null ? void 0 : x.depth) || 0,
          order: (x == null ? void 0 : x.order) || 100,
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
        var x;
        const p = m.findIndex((g) => g.uid === o);
        if (p !== -1) {
          const g = m[p];
          let b = g.disable;
          "enabled" in c && (b = !c.enabled);
          let S = g.strategy || { type: "selective", keys: [] };
          if ("constant" in c || "keys" in c) {
            const G = c.constant !== void 0 ? c.constant : S.type === "constant", z = c.keys !== void 0 ? c.keys : S.keys || [];
            S = {
              ...S,
              type: G ? "constant" : "selective",
              keys: z
            };
          }
          let y = g.position || { type: "before_character_definition", order: 0, depth: 0 };
          (c.position || typeof c.order == "number" || typeof c.depth == "number") && (y = {
            ...y,
            type: (typeof c.position == "string" ? c.position : (x = c.position) == null ? void 0 : x.type) || y.type,
            order: c.order ?? y.order,
            depth: c.depth ?? y.depth
          });
          let M = g.recursion;
          c.recursion && (M = c.recursion), m[p] = {
            ...g,
            name: c.name ?? g.name,
            content: c.content ?? g.content,
            comment: c.name ?? g.comment,
            // 同步更新备注
            disable: b,
            strategy: S,
            position: y,
            recursion: M
          }, console.debug("[Engram] WorldInfoService: 条目已更新 (In-Place)", { uid: o, name: m[p].name });
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
      totalTokens: c.reduce((m, p) => m + p.tokens, 0),
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
    const { Logger: o } = await Promise.resolve().then(() => au);
    try {
      const x = await new Function("path", "return import(path)")("/scripts/world-info.js"), g = x == null ? void 0 : x.getWorldInfoPrompt, b = x == null ? void 0 : x.getSortedEntries;
      if (typeof b == "function") {
        const Y = await b(), oe = [...new Set((Y == null ? void 0 : Y.map((ce) => ce.world)) || [])], _e = ((c = Y == null ? void 0 : Y.filter((ce) => ce.constant)) == null ? void 0 : c.length) || 0;
        o.info("WorldInfo", "getSortedEntries 诊断", {
          totalEntries: (Y == null ? void 0 : Y.length) || 0,
          worlds: oe,
          constantCount: _e,
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
        Y != null && Y.chat && Array.isArray(Y.chat) && (S = Y.chat.map((oe) => oe.mes || "").reverse());
      }
      if (!S || S.length === 0)
        return o.warn("WorldInfo", "无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      o.debug("WorldInfo", "调用 getWorldInfoPrompt", {
        messageCount: S.length
      });
      const y = 1e6, M = x == null ? void 0 : x.checkWorldInfo;
      if (typeof M != "function")
        return o.error("WorldInfo", "checkWorldInfo 不可用"), this.getConstantWorldInfo();
      const G = await M(S, y, !0, {
        trigger: "normal"
      }), z = G == null ? void 0 : G.allActivatedEntries, H = z ? Array.from(z.values()) : [];
      o.info("WorldInfo", `扫描完成，共激活 ${H.length} 个条目`);
      const Q = await this.loadFilteringState(), { disabledGlobalBooks: X, disabledEntries: P, globalWorldbooks: F, config: ie } = Q, Se = H.filter(
        (Y) => this.shouldIncludeEntry(Y, F, X, P, ie)
      );
      return o.info("WorldInfo", "筛选结果", {
        total: H.length,
        kept: Se.length,
        filteredOut: H.length - Se.length,
        keptWorlds: [...new Set(Se.map((Y) => Y.world))]
      }), Se.sort((Y, oe) => (Y.order || 0) - (oe.order || 0)), Se.map((Y) => Y.content).filter(Boolean).join(`

`);
    } catch (p) {
      return o.error("WorldInfo", "获取激活世界书失败", p), this.getConstantWorldInfo();
    }
  }
  /**
   * 加载过滤所需的所有状态配置
   * @private
   */
  static async loadFilteringState() {
    var S, y, M;
    const s = gt(), o = ((S = s == null ? void 0 : s.getGlobalWorldbookNames) == null ? void 0 : S.call(s)) || [], { SettingsManager: c } = await Promise.resolve().then(() => om), m = (y = c.getSettings().apiSettings) == null ? void 0 : y.worldbookConfig, p = (m == null ? void 0 : m.disabledWorldbooks) || [], { WorldBookStateService: x } = await Promise.resolve().then(() => pm), g = (M = s == null ? void 0 : s.getCharWorldbookNames) == null ? void 0 : M.call(s, "current");
    let b = {};
    return g != null && g.primary && (b = (await x.loadState(g.primary)).disabledEntries || {}), {
      globalWorldbooks: o,
      disabledGlobalBooks: p,
      disabledEntries: b,
      config: m
    };
  }
  /**
   * 判断单个条目是否应该被包含
   * @private
   */
  static shouldIncludeEntry(s, o, c, f, m) {
    var p, x, g, b;
    if (((p = s.extra) == null ? void 0 : p.engram) === !0 || (x = s.world) != null && x.startsWith("[Engram]")) return !0;
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
    var p;
    const s = gt();
    if (!s) return {};
    const o = ((p = s.getGlobalWorldbookNames) == null ? void 0 : p.call(s)) || [];
    let c = [];
    if (s.getCharWorldbookNames) {
      const x = s.getCharWorldbookNames("current");
      x && (c = [...x.additional || [], x.primary].filter(Boolean));
    }
    const f = Array.from(/* @__PURE__ */ new Set([...o, ...c])).sort(), m = {};
    for (const x of f)
      try {
        const g = await this.getEntries(x);
        m[x] = g.map((b) => {
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
        console.warn(`[Engram] WorldInfoService: 读取世界书 ${x} 失败`, g), m[x] = [];
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
      const m = f.filter((p) => p.constant === !0 && p.disable !== !0 && p.content);
      return m.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${m.length} 个常驻条目`), m.map((p) => p.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const gm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUMMARY_ENTRY_KEY: dr,
  WorldInfoService: Ce,
  getTavernHelper: gt
}, Symbol.toStringTag, { value: "Module" })), rl = "__ENGRAM_STATE__", Ls = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  updatedAt: Date.now()
};
class xa {
  /**
   * 加载状态
   */
  static async loadState(s) {
    try {
      const o = await Ce.findEntryByKey(s, rl);
      if (!o)
        return { ...Ls };
      try {
        const c = JSON.parse(o.content);
        return { ...Ls, ...c };
      } catch (c) {
        return ae.warn("WorldBookStateService", "状态条目解析失败，重置状态", c), { ...Ls };
      }
    } catch (o) {
      return ae.error("WorldBookStateService", "加载状态失败", o), { ...Ls };
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
      }, m = JSON.stringify(f, null, 2), x = (await Ce.getEntries(s)).filter(
        (g) => g.name === "Engram System State" || g.keys.includes(rl)
      );
      if (x.length > 0) {
        x.sort((y, M) => {
          const G = y.keys.includes(rl) ? 1 : 0;
          return (M.keys.includes(rl) ? 1 : 0) - G;
        });
        const [g, ...b] = x;
        if (b.length > 0) {
          ae.warn("WorldBookStateService", `发现 ${b.length} 个重复的状态条目，正在清理...`);
          for (const y of b)
            await Ce.deleteEntry(s, y.uid);
        }
        ae.debug("WorldBookStateService", "更新并修复状态条目", { uid: g.uid, state: f });
        const S = {
          content: m,
          name: "Engram System State",
          enabled: !1,
          constant: !1,
          keys: [rl],
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
          keys: [rl],
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
const pm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldBookStateService: xa
}, Symbol.toStringTag, { value: "Module" }));
function q5() {
  const [u, s] = A.useState(B1), [o, c] = A.useState(null), [f, m] = A.useState(null), [p, x] = A.useState(!1), [g, b] = A.useState([...fr]), [S, y] = A.useState(null), [M, G] = A.useState({}), [z, H] = A.useState({}), [Q, X] = A.useState(null), P = A.useCallback(async () => {
    var se;
    const O = await Ce.getWorldbookStructure();
    G(O);
    const q = gt(), Z = (se = q == null ? void 0 : q.getCharWorldbookNames) == null ? void 0 : se.call(q, "current");
    if (Z != null && Z.primary) {
      X(Z.primary);
      const Re = await xa.loadState(Z.primary);
      Re.disabledEntries && H(Re.disabledEntries);
    }
  }, []);
  A.useEffect(() => {
    P();
  }, [P]), A.useEffect(() => {
    var Z;
    const O = pe.get("apiSettings");
    if (O) {
      const se = B1(), Re = {
        ...se,
        ...O,
        // 合并预设：保留用户预设，确保至少有一个默认
        llmPresets: ((Z = O.llmPresets) == null ? void 0 : Z.length) > 0 ? O.llmPresets : se.llmPresets,
        // 合并模板：内置模板 + 用户自定义模板
        promptTemplates: [
          ...se.promptTemplates.filter((Te) => Te.isBuiltIn),
          ...(O.promptTemplates || []).filter((Te) => !Te.isBuiltIn)
        ]
      };
      s(Re);
    }
    const q = pe.getRegexRules();
    q && q.length > 0 && b(q);
  }, []);
  const F = A.useCallback((O) => {
    s((q) => ({ ...q, selectedPresetId: O.id })), c(O);
  }, []), ie = A.useCallback(() => {
    const O = hm(`预设 ${u.llmPresets.length + 1}`);
    O.isDefault = !1, s((q) => ({
      ...q,
      llmPresets: [...q.llmPresets, O],
      selectedPresetId: O.id
    })), c(O), x(!0);
  }, [u.llmPresets.length]), Se = A.useCallback((O) => {
    s((q) => ({
      ...q,
      llmPresets: q.llmPresets.map((Z) => Z.id === O.id ? O : Z)
    })), c(O), x(!0);
  }, []), $ = A.useCallback((O) => {
    const q = {
      ...O,
      id: `preset_${Date.now()}`,
      name: `${O.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((Z) => ({ ...Z, llmPresets: [...Z.llmPresets, q] })), x(!0);
  }, []), Y = A.useCallback((O) => {
    O.isDefault || (s((q) => ({
      ...q,
      llmPresets: q.llmPresets.filter((Z) => Z.id !== O.id),
      selectedPresetId: q.selectedPresetId === O.id ? null : q.selectedPresetId
    })), c((q) => (q == null ? void 0 : q.id) === O.id ? null : q), x(!0));
  }, []), oe = A.useCallback((O) => {
    m(O);
  }, []), _e = A.useCallback((O) => {
    s((q) => ({
      ...q,
      promptTemplates: [...q.promptTemplates, O]
    })), x(!0);
  }, []), ce = A.useCallback((O) => {
    s((q) => ({
      ...q,
      promptTemplates: q.promptTemplates.map((Z) => Z.id === O.id ? O : Z)
    })), m(O), x(!0);
  }, []), U = A.useCallback((O) => {
    O.isBuiltIn || (s((q) => ({
      ...q,
      promptTemplates: q.promptTemplates.filter((Z) => Z.id !== O.id)
    })), m((q) => (q == null ? void 0 : q.id) === O.id ? null : q), x(!0));
  }, []), te = A.useCallback((O) => {
    s((q) => ({ ...q, vectorConfig: O })), x(!0);
  }, []), xe = A.useCallback((O) => {
    s((q) => ({ ...q, rerankConfig: O })), x(!0);
  }, []), me = A.useCallback((O) => {
    s((q) => ({ ...q, worldbookConfig: O })), x(!0);
  }, []), Ge = A.useCallback((O, q) => {
    s((Z) => {
      const se = Z.worldbookConfig.disabledWorldbooks || [];
      let Re;
      return q ? Re = [.../* @__PURE__ */ new Set([...se, O])] : Re = se.filter((Te) => Te !== O), {
        ...Z,
        worldbookConfig: {
          ...Z.worldbookConfig,
          disabledWorldbooks: Re
        }
      };
    }), x(!0);
  }, []), w = A.useCallback((O, q, Z) => {
    H((se) => {
      const Re = se[O] || [];
      let Te;
      return Z ? Te = [.../* @__PURE__ */ new Set([...Re, q])] : Te = Re.filter((Zn) => Zn !== q), {
        ...se,
        [O]: Te
      };
    }), x(!0);
  }, []), V = A.useCallback((O) => {
    const q = g.find((Z) => Z.id === O);
    y(q || null);
  }, [g]), ee = A.useCallback(() => {
    const O = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    b((q) => [...q, O]), y(O), x(!0);
  }, []), re = A.useCallback((O) => {
    if (!S) return;
    const q = { ...S, ...O };
    y(q), b((Z) => Z.map((se) => se.id === q.id ? q : se)), x(!0);
  }, [S]), je = A.useCallback((O) => {
    b((q) => q.map(
      (Z) => Z.id === O ? { ...Z, enabled: !Z.enabled } : Z
    )), x(!0);
  }, []), C = A.useCallback((O) => {
    b((q) => q.filter((Z) => Z.id !== O)), y((q) => (q == null ? void 0 : q.id) === O ? null : q), x(!0);
  }, []), B = A.useCallback(() => {
    b([...fr]), y(null), x(!0);
  }, []), K = A.useCallback(async () => {
    pe.set("apiSettings", u), pe.setRegexRules(g), Q && await xa.saveState(Q, {
      disabledEntries: z
    }), console.log("[Engram] 保存配置:", u, g, z), x(!1);
  }, [u, g, Q, z]);
  return {
    settings: u,
    editingPreset: o,
    editingTemplate: f,
    hasChanges: p,
    regexRules: g,
    editingRule: S,
    selectPreset: F,
    addPreset: ie,
    updatePreset: Se,
    copyPreset: $,
    deletePreset: Y,
    selectTemplate: oe,
    addTemplate: _e,
    updateTemplate: ce,
    deleteTemplate: U,
    updateVectorConfig: te,
    updateRerankConfig: xe,
    updateWorldbookConfig: me,
    toggleWorldbook: Ge,
    toggleEntry: w,
    refreshWorldbooks: P,
    worldbookStructure: M,
    disabledEntries: z,
    currentCharWorldbook: Q,
    selectRule: V,
    addRule: ee,
    updateRule: re,
    toggleRule: je,
    deleteRule: C,
    resetRules: B,
    save: K
  };
}
const G5 = [
  { id: "llm", label: "LLM 预设", icon: Jc },
  { id: "vector", label: "向量化", icon: Zc },
  { id: "rerank", label: "Rerank", icon: I1 }
], Y5 = ({ initialTab: u }) => {
  const [s, o] = A.useState(u || "model"), [c, f] = A.useState("llm"), {
    settings: m,
    editingPreset: p,
    editingTemplate: x,
    hasChanges: g,
    regexRules: b,
    editingRule: S,
    selectPreset: y,
    addPreset: M,
    updatePreset: G,
    copyPreset: z,
    deletePreset: H,
    selectTemplate: Q,
    addTemplate: X,
    updateTemplate: P,
    deleteTemplate: F,
    updateVectorConfig: ie,
    updateRerankConfig: Se,
    updateWorldbookConfig: $,
    selectRule: Y,
    addRule: oe,
    updateRule: _e,
    toggleRule: ce,
    deleteRule: U,
    resetRules: te,
    save: xe,
    // Worldbook filtering
    worldbookStructure: me,
    disabledEntries: Ge,
    toggleWorldbook: w,
    toggleEntry: V,
    refreshWorldbooks: ee
  } = q5();
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ r.jsx(
      ti,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则"
      }
    ),
    /* @__PURE__ */ r.jsx(
      Ks,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: s,
        onChange: (re) => o(re),
        actions: g && /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors",
            onClick: xe,
            children: [
              /* @__PURE__ */ r.jsx(Tg, { size: 12 }),
              "保存"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "model" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ r.jsx(
          Ks,
          {
            tabs: G5.map((re) => ({ ...re, icon: /* @__PURE__ */ r.jsx(re.icon, { size: 14 }) })),
            activeTab: c,
            onChange: (re) => f(re),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        c === "llm" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ r.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ r.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: M, children: /* @__PURE__ */ r.jsx(Fc, { size: 16 }) })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1", children: m.llmPresets.map((re) => /* @__PURE__ */ r.jsx(
              d5,
              {
                preset: re,
                isSelected: m.selectedPresetId === re.id,
                onSelect: () => y(re),
                onEdit: () => y(re),
                onCopy: () => z(re),
                onDelete: () => H(re)
              },
              re.id
            )) })
          ] }),
          /* @__PURE__ */ r.jsx("div", { className: "flex flex-col", children: p ? /* @__PURE__ */ r.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ r.jsx(g5, { preset: p, onChange: G }) }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ r.jsx(Jc, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        c === "vector" && /* @__PURE__ */ r.jsx(x5, { config: m.vectorConfig, onChange: ie }),
        c === "rerank" && /* @__PURE__ */ r.jsx(b5, { config: m.rerankConfig, onChange: Se })
      ] }),
      s === "prompt" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ r.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ r.jsx(
          O5,
          {
            templates: m.promptTemplates,
            selectedId: (x == null ? void 0 : x.id) || null,
            onSelect: Q,
            onAdd: X,
            onUpdate: P,
            onDelete: F
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: x ? /* @__PURE__ */ r.jsx(
          D5,
          {
            template: x,
            llmPresets: m.llmPresets,
            defaultPresetId: m.selectedPresetId,
            onChange: P
          }
        ) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ r.jsx(Kc, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      s === "regex" && /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ r.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ r.jsx(
          U5,
          {
            rules: b,
            selectedId: (S == null ? void 0 : S.id) || null,
            onSelect: Y,
            onToggle: ce,
            onDelete: U,
            onAdd: oe,
            onReset: te
          }
        ) }),
        /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: S ? /* @__PURE__ */ r.jsx(L5, { rule: S, onChange: _e }) : /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ r.jsx(em, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      s === "worldbook" && /* @__PURE__ */ r.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ r.jsx(
        H5,
        {
          config: m.worldbookConfig,
          onChange: $,
          worldbookStructure: me,
          disabledEntries: Ge,
          onToggleWorldbook: w,
          onToggleEntry: V,
          onRefresh: ee
        }
      ) })
    ] })
  ] });
}, $5 = () => {
  const [u, s] = A.useState("claudeDark");
  A.useEffect(() => {
    s(Qn.getTheme());
  }, []);
  const o = (f) => {
    Qn.setTheme(f), pe.set("theme", f), s(f);
  }, c = Object.entries(qs).map(([f, m]) => {
    let p = m.colors.background, x = m.colors.primary;
    return {
      id: f,
      name: m.name,
      background: p,
      sidebar: m.colors.sidebar,
      // Add sidebar color
      primary: x
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
}, Xn = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function sl() {
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
class ya {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, o) {
    const c = sl();
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
    const c = sl();
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
    const c = sl();
    c && c.removeListener(s, o), (f = this.listeners.get(s)) == null || f.delete(o);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(s, ...o) {
    const c = sl();
    c && c.emit(s, ...o);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = sl();
    for (const [o, c] of this.listeners)
      for (const f of c)
        s && s.removeListener(o, f);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return sl() !== null;
  }
}
He(ya, "listeners", /* @__PURE__ */ new Map());
const V5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: ya,
  TavernEventType: Xn
}, Symbol.toStringTag, { value: "Module" }));
function X5(u, s) {
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
class xm {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const o = ba();
    if (!(o != null && o.chat))
      return [];
    let c = o.chat.map((f, m) => X5(f, m));
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
    const s = ba();
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
    return L3();
  }
}
const Q5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: xm
}, Symbol.toStringTag, { value: "Module" }));
async function Z5() {
  const { EventBus: u } = await Promise.resolve().then(() => V5), { MessageService: s } = await Promise.resolve().then(() => Q5), { WorldInfoService: o } = await Promise.resolve().then(() => gm);
  return {
    eventBus: u.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: o.isAvailable(),
    nativeTokenCount: await o.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const K5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: ya,
  MessageService: xm,
  TavernEventType: Xn,
  WorldInfoService: Ce,
  checkTavernIntegration: Z5
}, Symbol.toStringTag, { value: "Module" })), J5 = [
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
class bm {
  constructor(s) {
    He(this, "rules");
    this.rules = s || J5;
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
const ym = new bm();
function q1() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class vm {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const o = q1();
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
    const s = q1();
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
const ru = new vm();
class W5 {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(s, o, c) {
    return new Promise((f, m) => {
      ya.emit(Xn.ENGRAM_REQUEST_REVISION, {
        title: s,
        description: o,
        content: c,
        onConfirm: (p) => f(p),
        onCancel: () => m(new Error("User cancelled revision"))
      });
    });
  }
}
const Sm = new W5(), jm = {
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
}, G1 = {
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
}, il = "engram", F5 = "engram总结";
function Y1() {
  var u, s;
  try {
    return ((s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) || null;
  } catch {
    return null;
  }
}
function $1() {
  var u, s;
  try {
    const o = (s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u);
    return o != null && o.chat_metadata ? o.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function I5() {
  var u;
  try {
    (u = window.saveChatDebounced) == null || u.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class Cm {
  constructor(s, o, c) {
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
    const f = pe.get("summarizerConfig");
    this.config = { ...jm, ...f, ...s }, this.textProcessor = o || ym, this.llmAdapter = c || ru;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const o = $1();
    if (o)
      return o.extensions || (o.extensions = {}), o.extensions[il] || (o.extensions[il] = {}), o.extensions[il][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, o) {
    const c = $1();
    c && (c.extensions || (c.extensions = {}), c.extensions[il] || (c.extensions[il] = {}), c.extensions[il][s] = o, this.log("debug", `已保存到 chat_metadata: ${s} = ${o}`), I5());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const s = Ce.findExistingWorldbook();
    if (!s) return this._lastSummarizedFloor;
    const o = await xa.loadState(s);
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
    await xa.saveState(o, {
      lastSummarizedFloor: s
    });
  }
  /**
  
      // ==================== 楼层计算 ====================
  
      /**
       * 获取当前真实楼层数
       */
  getCurrentFloor() {
    const s = Y1();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = Y1();
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
      Xn.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${Xn.MESSAGE_RECEIVED}`)), this.unsubscribeChat = ya.on(
      Xn.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${Xn.CHAT_CHANGED}`), this.isRunning = !0;
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
    var f, m;
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
      const p = this._lastSummarizedFloor + 1, x = this.config.bufferSize || 0, g = o - x;
      if (p > g)
        return s && st.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const b = this.config.floorInterval || 10, S = p + b - 1, y = Math.min(g, S);
      if (p > y)
        return null;
      const M = [p, y];
      this.log("info", "准备总结", { startFloor: p, endFloor: y, currentFloor: o, buffer: x });
      const z = B3().slice(p - 1, y);
      if (this.log("info", "提取消息范围", {
        range: M,
        msgCount: z.length,
        firstMsg: (((f = z[0]) == null ? void 0 : f.mes) || "").substring(0, 20)
      }), z.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: M }), null;
      const H = {
        messages: z.map((w) => {
          const V = w.mes || w.content || w.message || "";
          return V || console.warn("[Engram] Message content is empty/undefined:", w), {
            role: w.is_user ? "user" : "assistant",
            content: V,
            name: w.name
          };
        }),
        floorRange: M,
        templateId: this.config.promptTemplateId || void 0
      }, Q = z.map((w) => w.mes || w.content || w.message || "").join(`

`), X = Ws.process(Q, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: Q.length,
        cleanedLength: X.length
      });
      let P = "";
      try {
        const w = await Ce.getActivatedWorldInfo();
        w && (P = `【背景设定】
` + w + `

`, this.log("debug", "已加载世界书内容", { length: w.length }));
      } catch (w) {
        this.log("warn", "获取世界书失败", { error: String(w) });
      }
      const F = pe.getEnabledPromptTemplate("text_summary"), ie = (F == null ? void 0 : F.systemPrompt) || G1.system, Se = (F == null ? void 0 : F.userPromptTemplate) || G1.user;
      let $ = "";
      try {
        $ = await Ce.getEngramSummariesContent(), $ && this.log("debug", "已加载 Engram 摘要", { length: $.length });
      } catch (w) {
        this.log("warn", "获取 Engram 摘要失败", { error: String(w) });
      }
      const Y = Se.replace("{{worldbookContext}}", P).replace("{{chatHistory}}", X).replace("{{context}}", P).replace("{{engramSummaries}}", $);
      this.log("debug", "使用提示词模板", {
        source: F ? "APIPresets" : "fallback",
        templateName: (F == null ? void 0 : F.name) || "default"
      });
      const oe = $n.logSend({
        type: "summarize",
        systemPrompt: ie,
        userPrompt: Y,
        floorRange: H.floorRange,
        model: fm(),
        character: (m = dm()) == null ? void 0 : m.name
      }), _e = Date.now(), ce = await this.llmAdapter.generate({
        systemPrompt: ie,
        userPrompt: Y
      });
      if ($n.logReceive(oe, {
        response: ce.content,
        status: ce.success ? "success" : "error",
        error: ce.error,
        duration: Date.now() - _e
      }), !ce.success)
        return this.log("error", "LLM 调用失败", { error: ce.error }), st.error(`总结失败: ${ce.error}`, "Engram 错误"), null;
      const U = this.textProcessor.clean(ce.content), te = Ws.process(U, "output"), xe = await Ce.countTokens(te), me = {
        id: Date.now().toString(),
        content: te,
        sourceFloors: H.floorRange,
        timestamp: Date.now(),
        tokenCount: xe,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: me });
        try {
          const w = await Sm.requestRevision(
            "剧情摘要修订",
            `范围: ${H.floorRange[0]} - ${H.floorRange[1]} 楼 | Token: ${xe}`,
            me.content
          );
          me.content = w, me.tokenCount = await Ce.countTokens(w), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), st.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const Ge = await this.writeToWorldbook(me);
      if (me.writtenToWorldbook = Ge, await this.setLastSummarizedFloor(H.floorRange[1]), this.summaryHistory.push(me), st.success(`已总结 ${H.floorRange[0]}-${H.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const w = H.floorRange[0] - 1, V = H.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: w, endIndex: V }), X3(w, V).catch((ee) => {
          this.log("error", "自动隐藏失败", ee);
        });
      }
      return me;
    } catch (p) {
      const x = p instanceof Error ? p.message : String(p);
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

${f}`, p = await Ce.createEntry(o, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: m,
        keys: [F5],
        // 添加关键词用于筛选
        enabled: !0,
        // 开启状态，让摘要能被激活进入上下文
        constant: !0,
        order: c
        // 使用计算出的递增顺序
      });
      if (p) {
        this.log("success", "已写入世界书", { worldbook: o, order: c });
        const x = await xa.loadState(o);
        await xa.saveState(o, {
          totalSummaries: x.totalSummaries + 1
        });
      }
      return p;
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
    this.config = { ...this.config, ...s }, pe.set("summarizerConfig", this.config), this.log("debug", "配置已更新并保存", this.config);
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
      const { Logger: f } = await Promise.resolve().then(() => au);
      f[s]("Summarizer", o, c);
    } catch {
      console.log(`[Summarizer] ${s}: ${o}`, c);
    }
  }
}
const Nm = new Cm(), Fs = {
  ...z5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
}, V1 = {
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
class Em {
  constructor(s, o) {
    He(this, "config");
    He(this, "llmAdapter");
    He(this, "isTrimming", !1);
    const c = pe.get("trimmerConfig") || {};
    this.config = { ...Fs, ...c, ...s }, this.llmAdapter = o || ru;
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
    const o = pe.get("summarizerConfig") || {};
    pe.set("summarizerConfig", {
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
    var f;
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
      const m = c.map(($) => Ce.parseFloorRangeFromName($.name)).filter(($) => $ !== null);
      if (m.length === 0)
        return this.log("error", "无法解析楼层范围"), null;
      const p = Math.min(...m.map(($) => $[0])), x = Math.max(...m.map(($) => $[1])), g = [p, x], b = c.map(($) => {
        const Y = Ce.parseFloorRangeFromName($.name), oe = Y ? `【${Y[0]}-${Y[1]}楼】` : `【${$.name}】`, _e = $.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
        return `${oe}
${_e}`;
      }).join(`

---

`), S = pe.getEnabledPromptTemplate("trim"), y = (S == null ? void 0 : S.systemPrompt) || V1.system, G = ((S == null ? void 0 : S.userPromptTemplate) || V1.user).replace("{{engramSummaries}}", b).replace("{{context}}", b);
      this.log("debug", "使用提示词模板", {
        source: S ? "APIPresets" : "fallback",
        templateName: (S == null ? void 0 : S.name) || "default",
        inputLength: b.length
      });
      const z = $n.logSend({
        type: "trim",
        systemPrompt: y,
        userPrompt: G,
        floorRange: g,
        model: fm(),
        character: (f = dm()) == null ? void 0 : f.name
      }), H = Date.now(), Q = await this.llmAdapter.generate({
        systemPrompt: y,
        userPrompt: G
      });
      if ($n.logReceive(z, {
        response: Q.content,
        status: Q.success ? "success" : "error",
        error: Q.error,
        duration: Date.now() - H
      }), !Q.success)
        return this.log("error", "LLM 调用失败", { error: Q.error }), st.error(`精简失败: ${Q.error}`, "Engram 错误"), null;
      const X = Ws.process(Q.content, "output"), P = await Ce.countTokens(X), F = Math.min(...c.map(($) => $.order)), ie = {
        content: X,
        tokenCount: P,
        sourceEntryIds: c.map(($) => $.uid),
        newFloorRange: g,
        newOrder: F
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: ie });
        try {
          const $ = await Sm.requestRevision(
            "精简摘要修订",
            `合并 ${c.length} 条 | 范围: ${g[0]}-${g[1]} 楼 | Token: ${P}`,
            ie.content
          );
          ie.content = $, ie.tokenCount = await Ce.countTokens($), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了精简写入"), st.info("已取消精简操作", "操作取消"), null;
        }
      }
      return await this.writeCompactedEntry(o, ie) ? (await this.removeOriginalEntries(o, ie.sourceEntryIds), st.success(
        `已精简 ${c.length} 条摘要为 1 条 (${g[0]}-${g[1]} 楼)`,
        "Engram"
      ), ie) : (this.log("error", "写入精简条目失败"), null);
    } catch (m) {
      const p = m instanceof Error ? m.message : String(m);
      return this.log("error", "精简执行异常", { error: p }), st.error(`精简异常: ${p}`, "Engram 错误"), null;
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
const P5 = new Em(), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: fr,
  DEFAULT_SUMMARIZER_CONFIG: jm,
  DEFAULT_TRIMMER_CONFIG: Fs,
  LLMAdapter: vm,
  RegexProcessor: lu,
  SummarizerService: Cm,
  TextProcessor: bm,
  TrimmerService: Em,
  llmAdapter: ru,
  regexProcessor: Ws,
  summarizerService: Nm,
  textProcessor: ym,
  trimmerService: P5
}, Symbol.toStringTag, { value: "Module" })), ep = () => {
  var m, p, x;
  const [u, s] = A.useState(((m = pe.getSettings().apiSettings) == null ? void 0 : m.previewEnabled) ?? !0), [, o] = A.useState({});
  A.useEffect(() => {
    pe.loadSettings();
  }, []);
  const [c, f] = A.useState(pe.getSettings().linkedDeletion);
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ r.jsx(ti, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ r.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ r.jsx($5, {})
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "毛玻璃特效 (Glass Effect)" }),
        /* @__PURE__ */ r.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-6", children: [
          /* @__PURE__ */ r.jsx(
            gn,
            {
              label: "不透明度 (Opacity)",
              description: "调整面板背景的遮罩强度，数值越低越透明",
              value: ((p = pe.getSettings().glassSettings) == null ? void 0 : p.opacity) ?? 0.8,
              onChange: (g) => {
                const S = {
                  ...pe.getSettings().glassSettings,
                  opacity: g
                };
                pe.set("glassSettings", S), Promise.resolve().then(() => Hc).then(({ ThemeManager: y }) => {
                  y.setTheme(y.getTheme());
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
              description: "调整背景模糊程度 (px)，仅在支持 backdrop-filter 的环境下有效",
              value: ((x = pe.getSettings().glassSettings) == null ? void 0 : x.blur) ?? 10,
              onChange: (g) => {
                const S = {
                  ...pe.getSettings().glassSettings,
                  blur: g
                };
                pe.set("glassSettings", S), Promise.resolve().then(() => Hc).then(({ ThemeManager: y }) => {
                  y.setTheme(y.getTheme());
                }), o({});
              },
              min: 0,
              max: 50,
              step: 1,
              showSlider: !0
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("section", { children: [
        /* @__PURE__ */ r.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ r.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ r.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ r.jsx(W4, { size: 20 }) }),
            /* @__PURE__ */ r.jsxs("div", { children: [
              /* @__PURE__ */ r.jsx("h4", { className: "font-medium text-foreground", children: "启用修订模式" }),
              /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "在写入长期记忆前，弹出预览窗口进行人工核对" })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(
            $s,
            {
              checked: u,
              onChange: (g) => {
                s(g), Nm.updateConfig({ previewEnabled: g });
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
              $s,
              {
                checked: c.enabled,
                onChange: (g) => {
                  const b = { ...c, enabled: g };
                  f(b), pe.set("linkedDeletion", b);
                }
              }
            )
          ] }),
          c.enabled && /* @__PURE__ */ r.jsx("div", { className: "pl-14 space-y-3 border-t border-border pt-3", children: /* @__PURE__ */ r.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-sm text-muted-foreground", children: "删除前确认" }),
            /* @__PURE__ */ r.jsx(
              $s,
              {
                checked: c.showConfirmation,
                onChange: (g) => {
                  const b = { ...c, showConfirmation: g };
                  f(b), pe.set("linkedDeletion", b);
                },
                className: "scale-90"
              }
            )
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
        /* @__PURE__ */ r.jsx(nm, { size: 32 }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, tp = () => /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ r.jsx(ti, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ r.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ r.jsx(J1, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ r.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), np = ({ links: u, onNavigate: s, className: o = "" }) => u.length === 0 ? null : /* @__PURE__ */ r.jsx("div", { className: `flex items-center gap-4 ${o}`, children: u.map((c) => {
  const f = c.icon || K4;
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
}) }), ap = {
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
  const m = ap[f];
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
}, lp = [
  { id: "token", label: "Token 数", icon: k4 },
  { id: "count", label: "总结次数", icon: P4 }
], rp = () => {
  const [u, s] = A.useState(null), [o, c] = A.useState(!1), [f, m] = A.useState(!1), [p, x] = A.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [g, b] = A.useState({ ...Fs }), [S, y] = A.useState(null), [M, G] = A.useState(0), [z, H] = A.useState(0);
  A.useEffect(() => {
    Q();
  }, []);
  const Q = async () => {
    var U;
    try {
      const { summarizerService: te } = await Promise.resolve().then(() => wt);
      let xe = te.getStatus();
      xe.lastSummarizedFloor === 0 && (await te.initializeForCurrentChat(), xe = te.getStatus()), s(xe);
      const me = te.getConfig();
      x({
        autoEnabled: me.enabled,
        floorInterval: me.floorInterval,
        bufferSize: me.bufferSize || 3,
        autoHide: me.autoHide || !1
      });
      const Ge = (U = pe.getSummarizerSettings()) == null ? void 0 : U.trimConfig;
      Ge && b({ ...Fs, ...Ge });
      const { trimmerService: w } = await Promise.resolve().then(() => wt), V = await w.getStatus();
      y(V);
      const { WorldInfoService: ee } = await Promise.resolve().then(() => gm), { WorldBookStateService: re } = await Promise.resolve().then(() => pm), je = ee.findExistingWorldbook();
      if (je) {
        const C = await ee.countSummaryTokens(je);
        G(C);
        const B = await re.loadState(je);
        H(B.totalSummaries);
      } else
        G(0), H(0);
    } catch (te) {
      console.error("加载 Summarizer 状态失败:", te);
    }
  }, X = async () => {
    try {
      const { summarizerService: U } = await Promise.resolve().then(() => wt);
      U.start(), await Q();
    } catch (U) {
      console.error("启动失败:", U);
    }
  }, P = async () => {
    try {
      const { summarizerService: U } = await Promise.resolve().then(() => wt);
      U.stop(), await Q();
    } catch (U) {
      console.error("停止失败:", U);
    }
  }, F = async () => {
    c(!0);
    try {
      const { summarizerService: U } = await Promise.resolve().then(() => wt);
      await U.triggerSummary(!0), await Q();
    } catch (U) {
      console.error("触发失败:", U);
    } finally {
      c(!1);
    }
  }, ie = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      c(!0);
      try {
        const { summarizerService: U } = await Promise.resolve().then(() => wt);
        await U.setLastSummarizedFloor(0), await Q();
      } catch (U) {
        console.error("重置失败:", U);
      } finally {
        c(!1);
      }
    }
  }, Se = (U, te) => {
    const xe = { ...g, [U]: te };
    b(xe), $(xe);
  }, $ = (U) => {
    pe.setSummarizerSettings({ trimConfig: U });
  }, Y = async () => {
    const U = { ...g, enabled: !g.enabled };
    b(U), $(U);
    const { trimmerService: te } = await Promise.resolve().then(() => wt);
    te.updateConfig({ enabled: U.enabled });
  }, oe = async () => {
    m(!0);
    try {
      const { trimmerService: U } = await Promise.resolve().then(() => wt);
      await U.triggerTrim(!0), await Q();
    } catch (U) {
      console.error("精简失败:", U);
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
              onClick: Q,
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
                u.running ? /* @__PURE__ */ r.jsx(B4, { size: 18 }) : /* @__PURE__ */ r.jsx(Is, { size: 18 }),
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
              /* @__PURE__ */ r.jsx("div", { className: "text-xl font-mono text-foreground/80", children: z })
            ] })
          ] }),
          /* @__PURE__ */ r.jsx(Hs, { length: 30, spacing: "md" }),
          /* @__PURE__ */ r.jsxs("div", { children: [
            /* @__PURE__ */ r.jsx("span", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1", children: "已总结内容 Token (Engram)" }),
            /* @__PURE__ */ r.jsx("div", { className: "text-sm font-mono text-primary/80", children: M.toLocaleString() })
          ] })
        ] }) : /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-3", children: [
        u != null && u.running ? /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors",
            onClick: P,
            children: [
              /* @__PURE__ */ r.jsx(xg, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: X,
            children: [
              /* @__PURE__ */ r.jsx(Wc, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: F,
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
              Vn,
              {
                label: "",
                checked: p.autoEnabled,
                onChange: async (U) => {
                  x((xe) => ({ ...xe, autoEnabled: U }));
                  const { summarizerService: te } = await Promise.resolve().then(() => wt);
                  te.updateConfig({ enabled: U });
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
              Vn,
              {
                label: "",
                checked: p.autoHide,
                onChange: (U) => {
                  x((te) => ({ ...te, autoHide: U })), Promise.resolve().then(() => wt).then(({ summarizerService: te }) => {
                    te.updateConfig({ autoHide: U });
                  });
                }
              }
            )
          ] })
        ] }),
        p.autoEnabled && /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "楼层将每隔 ",
              /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: p.floorInterval }),
              " 层总结"
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ r.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${(p.floorInterval - 5) / 95 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "range",
                  min: 5,
                  max: 100,
                  step: 5,
                  value: p.floorInterval,
                  onChange: async (U) => {
                    const te = Number(U.target.value);
                    x((me) => ({ ...me, floorInterval: te }));
                    const { summarizerService: xe } = await Promise.resolve().then(() => wt);
                    xe.updateConfig({ floorInterval: te });
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
              /* @__PURE__ */ r.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: p.bufferSize }),
              " 层作为缓冲"
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ r.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ r.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${p.bufferSize / 20 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ r.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 20,
                  step: 1,
                  value: p.bufferSize,
                  onChange: (U) => {
                    const te = Number(U.target.value);
                    x((xe) => ({ ...xe, bufferSize: te })), Promise.resolve().then(() => wt).then(({ summarizerService: xe }) => {
                      xe.updateConfig({ bufferSize: te });
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
          onClick: ie,
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
          Vn,
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
          /* @__PURE__ */ r.jsx("div", { className: "flex gap-6", children: lp.map((U) => /* @__PURE__ */ r.jsxs(
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
                onChange: (U) => {
                  const te = Number(U.target.value), xe = g.trigger === "token" ? "tokenLimit" : "countLimit";
                  Se(xe, te);
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
                onChange: (U) => Se("keepRecentCount", Number(U.target.value)),
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
              ce.value
            ] })
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            onClick: oe,
            disabled: f || ((S == null ? void 0 : S.pendingEntryCount) ?? 0) < 2,
            children: [
              /* @__PURE__ */ r.jsx(_g, { size: 14, className: f ? "animate-pulse" : "" }),
              f ? "精简中..." : "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, sp = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ r.jsx(Kc, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ r.jsx(mr, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ r.jsx(I1, { size: 16 }) }
], ip = [
  { id: "devlog", label: "模型日志", icon: kg, linkTo: "devlog:model" },
  { id: "presets", label: "提示词模板", icon: v4, linkTo: "presets:prompt" }
], op = ({ onNavigate: u }) => {
  const [s, o] = A.useState("summary");
  return /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ r.jsx(
      Ks,
      {
        tabs: sp,
        activeTab: s,
        onChange: (c) => o(c),
        actions: /* @__PURE__ */ r.jsx(
          np,
          {
            links: ip,
            onNavigate: (c) => u == null ? void 0 : u(c)
          }
        )
      }
    ),
    /* @__PURE__ */ r.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "summary" && /* @__PURE__ */ r.jsx(rp, {}),
      s === "vectorization" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ r.jsx(mr, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ r.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ r.jsx(E4, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, Qt = {
  primary: "#FFFFFF",
  grid: "#111111"
}, cp = ({ onComplete: u }) => {
  const s = A.useRef(null), o = A.useRef(null), c = A.useRef(null), f = A.useRef(null), [m, p] = A.useState(!1);
  A.useEffect(() => {
    if (window.gsap) {
      p(!0);
      return;
    }
    const g = document.createElement("script");
    g.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", g.async = !0, g.onload = () => p(!0), document.body.appendChild(g);
  }, []);
  const x = () => {
    var G;
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
    const y = (G = c.current) == null ? void 0 : G.querySelectorAll("path");
    y && g.set(y, { opacity: 0, y: 10 }), g.set(f.current, { scale: 1, opacity: 1 }), g.set(s.current, { opacity: 1 });
    const M = g.timeline({
      onComplete: () => {
        g.to(s.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: u
        });
      }
    });
    M.to(b, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), y && M.to(y, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), M.to({}, { duration: 1 });
  };
  return A.useEffect(() => {
    if (m) {
      const g = setTimeout(x, 800);
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
}, up = ({ onClose: u }) => {
  const [s, o] = A.useState("dashboard"), [c, f] = A.useState(!1), [m, p] = A.useState(!1);
  A.useEffect(() => {
    const b = setTimeout(() => {
      const S = pe.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", S), S || f(!0), p(!0);
    }, 1e3);
    return () => clearTimeout(b);
  }, []);
  const x = () => {
    pe.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), f(!1);
  };
  if (!m)
    return null;
  const g = () => {
    const [b, S] = s.split(":");
    switch (b) {
      case "dashboard":
        return /* @__PURE__ */ r.jsx(A1, { onNavigate: o });
      case "presets":
        return /* @__PURE__ */ r.jsx(Y5, { initialTab: S });
      case "graph":
        return /* @__PURE__ */ r.jsx(J3, {});
      case "devlog":
        return /* @__PURE__ */ r.jsx(o5, { initialTab: S });
      case "settings":
        return /* @__PURE__ */ r.jsx(ep, {});
      case "memory":
        return /* @__PURE__ */ r.jsx(tp, {});
      case "processing":
        return /* @__PURE__ */ r.jsx(op, { onNavigate: o });
      default:
        return /* @__PURE__ */ r.jsx(A1, {});
    }
  };
  return /* @__PURE__ */ r.jsxs(um, { children: [
    c && /* @__PURE__ */ r.jsx(cp, { onComplete: x }),
    /* @__PURE__ */ r.jsx(D3, { activeTab: s, setActiveTab: o, onClose: u, children: g() })
  ] });
};
var dp = X1();
const fp = /* @__PURE__ */ $c(dp), mp = () => {
  const [u, s] = A.useState(!1), [o, c] = A.useState(null), [f, m] = A.useState("");
  A.useEffect(() => {
    const g = ya.on(
      Xn.ENGRAM_REQUEST_REVISION,
      (b) => {
        const S = b;
        c(S), m(S.content), s(!0);
      }
    );
    return () => {
      g();
    };
  }, []);
  const p = () => {
    o && (o.onConfirm(f), s(!1), c(null));
  }, x = () => {
    o && o.onCancel(), s(!1), c(null);
  };
  return u ? fp.createPortal(
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
              onClick: x
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
                  onClick: x,
                  className: "p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ r.jsx(Ps, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ r.jsx(Yg, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
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
                  onClick: x,
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors",
                  children: "取消"
                }
              ),
              /* @__PURE__ */ r.jsxs(
                "button",
                {
                  onClick: p,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)] hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] focus:outline-none focus:ring-2 focus:ring-primary/50",
                  children: [
                    /* @__PURE__ */ r.jsx(W1, { size: 16 }),
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
G3((u, s) => {
  const o = Q1.createRoot(u);
  return o.render(t4.createElement(up, { onClose: s })), o;
});
Y3((u) => {
  const s = Q1.createRoot(u);
  return s.render(
    /* @__PURE__ */ r.jsx(um, { children: /* @__PURE__ */ r.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ r.jsx(mp, {}) }) })
  ), s;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", z1) : z1();
class Tm {
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
    var y, M;
    const o = pe.getSettings().linkedDeletion;
    if (!(o != null && o.enabled)) return;
    ae.debug("CharacterDeleteService", "检测到角色删除", s);
    const c = s.character, f = (c == null ? void 0 : c.name) || (c == null ? void 0 : c.avatar) || (c == null ? void 0 : c.ch_name) || ((y = c == null ? void 0 : c.data) == null ? void 0 : y.name);
    if (!f) {
      ae.warn("CharacterDeleteService", "无法获取已删除角色的名称");
      return;
    }
    const m = /* @__PURE__ */ new Set();
    m.add(`[Engram] ${f}`), m.add(`Engram_${f}`);
    const p = c.data || c, x = (M = p == null ? void 0 : p.extensions) == null ? void 0 : M.world;
    x && typeof x == "string" && (ae.debug("CharacterDeleteService", `从角色数据中发现绑定世界书: ${x}`), m.add(x));
    const g = await Ce.getWorldbookNames(), b = new Set(g), S = Array.from(m).filter((G) => {
      if (!b.has(G)) return !1;
      const z = G.toLowerCase().includes("engram");
      return z || ae.info("CharacterDeleteService", `跳过非 Engram 世界书: ${G}`), z;
    });
    if (S.length === 0) {
      ae.debug("CharacterDeleteService", `未找到角色 "${f}" 关联的 Engram 世界书`);
      return;
    }
    if (ae.info("CharacterDeleteService", `准备删除关联世界书: ${S.join(", ")}`), o.showConfirmation) {
      const G = `
                <div style="font-size: 0.9em;">
                    <h3>🧹 Engram 联动清理</h3>
                    <p>检测到角色 <b>${f}</b> 已被删除。</p>
                    <p>发现以下关联的 Engram 记忆库：</p>
                    <ul style="max-height: 100px; overflow-y: auto; background: var(--black50a); padding: 5px; border-radius: 4px; list-style: none; margin: 10px 0;">
                        ${S.map((H) => `<li style="padding: 2px 0;">• ${H}</li>`).join("")}
                    </ul>
                    <p>是否一并删除？</p>
                    <small style="opacity: 0.7;">这将永久删除这些记忆库及其包含的所有摘要。</small>
                </div>
            `;
      if (!await Q3(G, "confirm")) {
        ae.info("CharacterDeleteService", "用户取消删除关联世界书");
        return;
      }
    }
    if (o.deleteWorldbook) {
      let G = 0;
      const z = [];
      st.info("正在清理 Engram 记忆库...", "Engram");
      for (const H of S)
        try {
          await Ce.deleteWorldbook(H) ? (G++, ae.info("CharacterDeleteService", `已删除世界书: ${H}`)) : z.push(H);
        } catch (Q) {
          ae.error("CharacterDeleteService", `删除世界书 ${H} 失败`, Q), z.push(H);
        }
      G > 0 && st.success(`已清理 ${G} 个关联记忆库`, "Engram"), z.length > 0 && st.warning(`部分记忆库删除失败: ${z.join(", ")}`, "Engram");
    }
    o.deleteIndexedDB;
  }
}
He(Tm, "isInitialized", !1);
const hp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CharacterDeleteService: Tm
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=index.js.map
