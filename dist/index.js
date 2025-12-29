var D4 = Object.defineProperty;
var U4 = (o, s, u) => s in o ? D4(o, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : o[s] = u;
var Xe = (o, s, u) => U4(o, typeof s != "symbol" ? s + "" : s, u);
function Do(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var oo = { exports: {} }, Wn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var P0;
function B4() {
  if (P0) return Wn;
  P0 = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function u(c, f, h) {
    var x = null;
    if (h !== void 0 && (x = "" + h), f.key !== void 0 && (x = "" + f.key), "key" in f) {
      h = {};
      for (var v in f)
        v !== "key" && (h[v] = f[v]);
    } else h = f;
    return f = h.ref, {
      $$typeof: o,
      type: c,
      key: x,
      ref: f !== void 0 ? f : null,
      props: h
    };
  }
  return Wn.Fragment = s, Wn.jsx = u, Wn.jsxs = u, Wn;
}
var e1;
function H4() {
  return e1 || (e1 = 1, oo.exports = B4()), oo.exports;
}
var i = H4(), co = { exports: {} }, ee = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var t1;
function L4() {
  if (t1) return ee;
  t1 = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), x = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), D = Symbol.iterator;
  function V(b) {
    return b === null || typeof b != "object" ? null : (b = D && b[D] || b["@@iterator"], typeof b == "function" ? b : null);
  }
  var H = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, q = Object.assign, te = {};
  function $(b, R, G) {
    this.props = b, this.context = R, this.refs = te, this.updater = G || H;
  }
  $.prototype.isReactComponent = {}, $.prototype.setState = function(b, R) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, b, R, "setState");
  }, $.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function L() {
  }
  L.prototype = $.prototype;
  function B(b, R, G) {
    this.props = b, this.context = R, this.refs = te, this.updater = G || H;
  }
  var re = B.prototype = new L();
  re.constructor = B, q(re, $.prototype), re.isPureReactComponent = !0;
  var F = Array.isArray;
  function ie() {
  }
  var W = { H: null, A: null, T: null, S: null }, he = Object.prototype.hasOwnProperty;
  function Le(b, R, G) {
    var Q = G.ref;
    return {
      $$typeof: o,
      type: b,
      key: R,
      ref: Q !== void 0 ? Q : null,
      props: G
    };
  }
  function ft(b, R) {
    return Le(b.type, R, b.props);
  }
  function Ke(b) {
    return typeof b == "object" && b !== null && b.$$typeof === o;
  }
  function Te(b) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(G) {
      return R[G];
    });
  }
  var Ae = /\/+/g;
  function fe(b, R) {
    return typeof b == "object" && b !== null && b.key != null ? Te("" + b.key) : R.toString(36);
  }
  function Y(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (typeof b.status == "string" ? b.then(ie, ie) : (b.status = "pending", b.then(
          function(R) {
            b.status === "pending" && (b.status = "fulfilled", b.value = R);
          },
          function(R) {
            b.status === "pending" && (b.status = "rejected", b.reason = R);
          }
        )), b.status) {
          case "fulfilled":
            return b.value;
          case "rejected":
            throw b.reason;
        }
    }
    throw b;
  }
  function C(b, R, G, Q, le) {
    var se = typeof b;
    (se === "undefined" || se === "boolean") && (b = null);
    var be = !1;
    if (b === null) be = !0;
    else
      switch (se) {
        case "bigint":
        case "string":
        case "number":
          be = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case o:
            case s:
              be = !0;
              break;
            case A:
              return be = b._init, C(
                be(b._payload),
                R,
                G,
                Q,
                le
              );
          }
      }
    if (be)
      return le = le(b), be = Q === "" ? "." + fe(b, 0) : Q, F(le) ? (G = "", be != null && (G = be.replace(Ae, "$&/") + "/"), C(le, R, G, "", function(an) {
        return an;
      })) : le != null && (Ke(le) && (le = ft(
        le,
        G + (le.key == null || b && b.key === le.key ? "" : ("" + le.key).replace(
          Ae,
          "$&/"
        ) + "/") + be
      )), R.push(le)), 1;
    be = 0;
    var lt = Q === "" ? "." : Q + ":";
    if (F(b))
      for (var Ue = 0; Ue < b.length; Ue++)
        Q = b[Ue], se = lt + fe(Q, Ue), be += C(
          Q,
          R,
          G,
          se,
          le
        );
    else if (Ue = V(b), typeof Ue == "function")
      for (b = Ue.call(b), Ue = 0; !(Q = b.next()).done; )
        Q = Q.value, se = lt + fe(Q, Ue++), be += C(
          Q,
          R,
          G,
          se,
          le
        );
    else if (se === "object") {
      if (typeof b.then == "function")
        return C(
          Y(b),
          R,
          G,
          Q,
          le
        );
      throw R = String(b), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return be;
  }
  function U(b, R, G) {
    if (b == null) return b;
    var Q = [], le = 0;
    return C(b, Q, "", "", function(se) {
      return R.call(G, se, le++);
    }), Q;
  }
  function I(b) {
    if (b._status === -1) {
      var R = b._result;
      R = R(), R.then(
        function(G) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = G);
        },
        function(G) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = G);
        }
      ), b._status === -1 && (b._status = 0, b._result = R);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var je = typeof reportError == "function" ? reportError : function(b) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b),
        error: b
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", b);
      return;
    }
    console.error(b);
  }, _e = {
    map: U,
    forEach: function(b, R, G) {
      U(
        b,
        function() {
          R.apply(this, arguments);
        },
        G
      );
    },
    count: function(b) {
      var R = 0;
      return U(b, function() {
        R++;
      }), R;
    },
    toArray: function(b) {
      return U(b, function(R) {
        return R;
      }) || [];
    },
    only: function(b) {
      if (!Ke(b))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return b;
    }
  };
  return ee.Activity = j, ee.Children = _e, ee.Component = $, ee.Fragment = u, ee.Profiler = f, ee.PureComponent = B, ee.StrictMode = c, ee.Suspense = p, ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, ee.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(b) {
      return W.H.useMemoCache(b);
    }
  }, ee.cache = function(b) {
    return function() {
      return b.apply(null, arguments);
    };
  }, ee.cacheSignal = function() {
    return null;
  }, ee.cloneElement = function(b, R, G) {
    if (b == null)
      throw Error(
        "The argument must be a React element, but you passed " + b + "."
      );
    var Q = q({}, b.props), le = b.key;
    if (R != null)
      for (se in R.key !== void 0 && (le = "" + R.key), R)
        !he.call(R, se) || se === "key" || se === "__self" || se === "__source" || se === "ref" && R.ref === void 0 || (Q[se] = R[se]);
    var se = arguments.length - 2;
    if (se === 1) Q.children = G;
    else if (1 < se) {
      for (var be = Array(se), lt = 0; lt < se; lt++)
        be[lt] = arguments[lt + 2];
      Q.children = be;
    }
    return Le(b.type, le, Q);
  }, ee.createContext = function(b) {
    return b = {
      $$typeof: x,
      _currentValue: b,
      _currentValue2: b,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, b.Provider = b, b.Consumer = {
      $$typeof: h,
      _context: b
    }, b;
  }, ee.createElement = function(b, R, G) {
    var Q, le = {}, se = null;
    if (R != null)
      for (Q in R.key !== void 0 && (se = "" + R.key), R)
        he.call(R, Q) && Q !== "key" && Q !== "__self" && Q !== "__source" && (le[Q] = R[Q]);
    var be = arguments.length - 2;
    if (be === 1) le.children = G;
    else if (1 < be) {
      for (var lt = Array(be), Ue = 0; Ue < be; Ue++)
        lt[Ue] = arguments[Ue + 2];
      le.children = lt;
    }
    if (b && b.defaultProps)
      for (Q in be = b.defaultProps, be)
        le[Q] === void 0 && (le[Q] = be[Q]);
    return Le(b, se, le);
  }, ee.createRef = function() {
    return { current: null };
  }, ee.forwardRef = function(b) {
    return { $$typeof: v, render: b };
  }, ee.isValidElement = Ke, ee.lazy = function(b) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: b },
      _init: I
    };
  }, ee.memo = function(b, R) {
    return {
      $$typeof: S,
      type: b,
      compare: R === void 0 ? null : R
    };
  }, ee.startTransition = function(b) {
    var R = W.T, G = {};
    W.T = G;
    try {
      var Q = b(), le = W.S;
      le !== null && le(G, Q), typeof Q == "object" && Q !== null && typeof Q.then == "function" && Q.then(ie, je);
    } catch (se) {
      je(se);
    } finally {
      R !== null && G.types !== null && (R.types = G.types), W.T = R;
    }
  }, ee.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, ee.use = function(b) {
    return W.H.use(b);
  }, ee.useActionState = function(b, R, G) {
    return W.H.useActionState(b, R, G);
  }, ee.useCallback = function(b, R) {
    return W.H.useCallback(b, R);
  }, ee.useContext = function(b) {
    return W.H.useContext(b);
  }, ee.useDebugValue = function() {
  }, ee.useDeferredValue = function(b, R) {
    return W.H.useDeferredValue(b, R);
  }, ee.useEffect = function(b, R) {
    return W.H.useEffect(b, R);
  }, ee.useEffectEvent = function(b) {
    return W.H.useEffectEvent(b);
  }, ee.useId = function() {
    return W.H.useId();
  }, ee.useImperativeHandle = function(b, R, G) {
    return W.H.useImperativeHandle(b, R, G);
  }, ee.useInsertionEffect = function(b, R) {
    return W.H.useInsertionEffect(b, R);
  }, ee.useLayoutEffect = function(b, R) {
    return W.H.useLayoutEffect(b, R);
  }, ee.useMemo = function(b, R) {
    return W.H.useMemo(b, R);
  }, ee.useOptimistic = function(b, R) {
    return W.H.useOptimistic(b, R);
  }, ee.useReducer = function(b, R, G) {
    return W.H.useReducer(b, R, G);
  }, ee.useRef = function(b) {
    return W.H.useRef(b);
  }, ee.useState = function(b) {
    return W.H.useState(b);
  }, ee.useSyncExternalStore = function(b, R, G) {
    return W.H.useSyncExternalStore(
      b,
      R,
      G
    );
  }, ee.useTransition = function() {
    return W.H.useTransition();
  }, ee.version = "19.2.3", ee;
}
var l1;
function Uo() {
  return l1 || (l1 = 1, co.exports = L4()), co.exports;
}
var O = Uo();
const q4 = /* @__PURE__ */ Do(O);
var fo = { exports: {} }, In = {}, mo = { exports: {} }, ho = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var a1;
function G4() {
  return a1 || (a1 = 1, (function(o) {
    function s(C, U) {
      var I = C.length;
      C.push(U);
      e: for (; 0 < I; ) {
        var je = I - 1 >>> 1, _e = C[je];
        if (0 < f(_e, U))
          C[je] = U, C[I] = _e, I = je;
        else break e;
      }
    }
    function u(C) {
      return C.length === 0 ? null : C[0];
    }
    function c(C) {
      if (C.length === 0) return null;
      var U = C[0], I = C.pop();
      if (I !== U) {
        C[0] = I;
        e: for (var je = 0, _e = C.length, b = _e >>> 1; je < b; ) {
          var R = 2 * (je + 1) - 1, G = C[R], Q = R + 1, le = C[Q];
          if (0 > f(G, I))
            Q < _e && 0 > f(le, G) ? (C[je] = le, C[Q] = I, je = Q) : (C[je] = G, C[R] = I, je = R);
          else if (Q < _e && 0 > f(le, I))
            C[je] = le, C[Q] = I, je = Q;
          else break e;
        }
      }
      return U;
    }
    function f(C, U) {
      var I = C.sortIndex - U.sortIndex;
      return I !== 0 ? I : C.id - U.id;
    }
    if (o.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      o.unstable_now = function() {
        return h.now();
      };
    } else {
      var x = Date, v = x.now();
      o.unstable_now = function() {
        return x.now() - v;
      };
    }
    var p = [], S = [], A = 1, j = null, D = 3, V = !1, H = !1, q = !1, te = !1, $ = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, B = typeof setImmediate < "u" ? setImmediate : null;
    function re(C) {
      for (var U = u(S); U !== null; ) {
        if (U.callback === null) c(S);
        else if (U.startTime <= C)
          c(S), U.sortIndex = U.expirationTime, s(p, U);
        else break;
        U = u(S);
      }
    }
    function F(C) {
      if (q = !1, re(C), !H)
        if (u(p) !== null)
          H = !0, ie || (ie = !0, Te());
        else {
          var U = u(S);
          U !== null && Y(F, U.startTime - C);
        }
    }
    var ie = !1, W = -1, he = 5, Le = -1;
    function ft() {
      return te ? !0 : !(o.unstable_now() - Le < he);
    }
    function Ke() {
      if (te = !1, ie) {
        var C = o.unstable_now();
        Le = C;
        var U = !0;
        try {
          e: {
            H = !1, q && (q = !1, L(W), W = -1), V = !0;
            var I = D;
            try {
              t: {
                for (re(C), j = u(p); j !== null && !(j.expirationTime > C && ft()); ) {
                  var je = j.callback;
                  if (typeof je == "function") {
                    j.callback = null, D = j.priorityLevel;
                    var _e = je(
                      j.expirationTime <= C
                    );
                    if (C = o.unstable_now(), typeof _e == "function") {
                      j.callback = _e, re(C), U = !0;
                      break t;
                    }
                    j === u(p) && c(p), re(C);
                  } else c(p);
                  j = u(p);
                }
                if (j !== null) U = !0;
                else {
                  var b = u(S);
                  b !== null && Y(
                    F,
                    b.startTime - C
                  ), U = !1;
                }
              }
              break e;
            } finally {
              j = null, D = I, V = !1;
            }
            U = void 0;
          }
        } finally {
          U ? Te() : ie = !1;
        }
      }
    }
    var Te;
    if (typeof B == "function")
      Te = function() {
        B(Ke);
      };
    else if (typeof MessageChannel < "u") {
      var Ae = new MessageChannel(), fe = Ae.port2;
      Ae.port1.onmessage = Ke, Te = function() {
        fe.postMessage(null);
      };
    } else
      Te = function() {
        $(Ke, 0);
      };
    function Y(C, U) {
      W = $(function() {
        C(o.unstable_now());
      }, U);
    }
    o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, o.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, o.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : he = 0 < C ? Math.floor(1e3 / C) : 5;
    }, o.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, o.unstable_next = function(C) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = D;
      }
      var I = D;
      D = U;
      try {
        return C();
      } finally {
        D = I;
      }
    }, o.unstable_requestPaint = function() {
      te = !0;
    }, o.unstable_runWithPriority = function(C, U) {
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
      var I = D;
      D = C;
      try {
        return U();
      } finally {
        D = I;
      }
    }, o.unstable_scheduleCallback = function(C, U, I) {
      var je = o.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? je + I : je) : I = je, C) {
        case 1:
          var _e = -1;
          break;
        case 2:
          _e = 250;
          break;
        case 5:
          _e = 1073741823;
          break;
        case 4:
          _e = 1e4;
          break;
        default:
          _e = 5e3;
      }
      return _e = I + _e, C = {
        id: A++,
        callback: U,
        priorityLevel: C,
        startTime: I,
        expirationTime: _e,
        sortIndex: -1
      }, I > je ? (C.sortIndex = I, s(S, C), u(p) === null && C === u(S) && (q ? (L(W), W = -1) : q = !0, Y(F, I - je))) : (C.sortIndex = _e, s(p, C), H || V || (H = !0, ie || (ie = !0, Te()))), C;
    }, o.unstable_shouldYield = ft, o.unstable_wrapCallback = function(C) {
      var U = D;
      return function() {
        var I = D;
        D = U;
        try {
          return C.apply(this, arguments);
        } finally {
          D = I;
        }
      };
    };
  })(ho)), ho;
}
var n1;
function Y4() {
  return n1 || (n1 = 1, mo.exports = G4()), mo.exports;
}
var go = { exports: {} }, tt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var r1;
function V4() {
  if (r1) return tt;
  r1 = 1;
  var o = Uo();
  function s(p) {
    var S = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        S += "&args[]=" + encodeURIComponent(arguments[A]);
    }
    return "Minified React error #" + p + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var c = {
    d: {
      f: u,
      r: function() {
        throw Error(s(522));
      },
      D: u,
      C: u,
      L: u,
      m: u,
      X: u,
      S: u,
      M: u
    },
    p: 0,
    findDOMNode: null
  }, f = Symbol.for("react.portal");
  function h(p, S, A) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: j == null ? null : "" + j,
      children: p,
      containerInfo: S,
      implementation: A
    };
  }
  var x = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(p, S) {
    if (p === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, tt.createPortal = function(p, S) {
    var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(s(299));
    return h(p, S, null, A);
  }, tt.flushSync = function(p) {
    var S = x.T, A = c.p;
    try {
      if (x.T = null, c.p = 2, p) return p();
    } finally {
      x.T = S, c.p = A, c.d.f();
    }
  }, tt.preconnect = function(p, S) {
    typeof p == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, c.d.C(p, S));
  }, tt.prefetchDNS = function(p) {
    typeof p == "string" && c.d.D(p);
  }, tt.preinit = function(p, S) {
    if (typeof p == "string" && S && typeof S.as == "string") {
      var A = S.as, j = v(A, S.crossOrigin), D = typeof S.integrity == "string" ? S.integrity : void 0, V = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      A === "style" ? c.d.S(
        p,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: j,
          integrity: D,
          fetchPriority: V
        }
      ) : A === "script" && c.d.X(p, {
        crossOrigin: j,
        integrity: D,
        fetchPriority: V,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, tt.preinitModule = function(p, S) {
    if (typeof p == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var A = v(
            S.as,
            S.crossOrigin
          );
          c.d.M(p, {
            crossOrigin: A,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0
          });
        }
      } else S == null && c.d.M(p);
  }, tt.preload = function(p, S) {
    if (typeof p == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var A = S.as, j = v(A, S.crossOrigin);
      c.d.L(p, A, {
        crossOrigin: j,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, tt.preloadModule = function(p, S) {
    if (typeof p == "string")
      if (S) {
        var A = v(S.as, S.crossOrigin);
        c.d.m(p, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: A,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0
        });
      } else c.d.m(p);
  }, tt.requestFormReset = function(p) {
    c.d.r(p);
  }, tt.unstable_batchedUpdates = function(p, S) {
    return p(S);
  }, tt.useFormState = function(p, S, A) {
    return x.H.useFormState(p, S, A);
  }, tt.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, tt.version = "19.2.3", tt;
}
var i1;
function D1() {
  if (i1) return go.exports;
  i1 = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return o(), go.exports = V4(), go.exports;
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
var s1;
function X4() {
  if (s1) return In;
  s1 = 1;
  var o = Y4(), s = Uo(), u = D1();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function h(e) {
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
  function x(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (h(e) !== e)
      throw Error(c(188));
  }
  function S(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var r = n.alternate;
      if (r === null) {
        if (a = n.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === r.child) {
        for (r = n.child; r; ) {
          if (r === l) return p(n), e;
          if (r === a) return p(n), t;
          r = r.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== a.return) l = n, a = r;
      else {
        for (var d = !1, m = n.child; m; ) {
          if (m === l) {
            d = !0, l = n, a = r;
            break;
          }
          if (m === a) {
            d = !0, a = n, l = r;
            break;
          }
          m = m.sibling;
        }
        if (!d) {
          for (m = r.child; m; ) {
            if (m === l) {
              d = !0, l = r, a = n;
              break;
            }
            if (m === a) {
              d = !0, a = r, l = n;
              break;
            }
            m = m.sibling;
          }
          if (!d) throw Error(c(189));
        }
      }
      if (l.alternate !== a) throw Error(c(190));
    }
    if (l.tag !== 3) throw Error(c(188));
    return l.stateNode.current === l ? e : t;
  }
  function A(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = A(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var j = Object.assign, D = Symbol.for("react.element"), V = Symbol.for("react.transitional.element"), H = Symbol.for("react.portal"), q = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), B = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), Le = Symbol.for("react.activity"), ft = Symbol.for("react.memo_cache_sentinel"), Ke = Symbol.iterator;
  function Te(e) {
    return e === null || typeof e != "object" ? null : (e = Ke && e[Ke] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ae = Symbol.for("react.client.reference");
  function fe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ae ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case q:
        return "Fragment";
      case $:
        return "Profiler";
      case te:
        return "StrictMode";
      case F:
        return "Suspense";
      case ie:
        return "SuspenseList";
      case Le:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case H:
          return "Portal";
        case B:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case re:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case W:
          return t = e.displayName || null, t !== null ? t : fe(e.type) || "Memo";
        case he:
          t = e._payload, e = e._init;
          try {
            return fe(e(t));
          } catch {
          }
      }
    return null;
  }
  var Y = Array.isArray, C = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, je = [], _e = -1;
  function b(e) {
    return { current: e };
  }
  function R(e) {
    0 > _e || (e.current = je[_e], je[_e] = null, _e--);
  }
  function G(e, t) {
    _e++, je[_e] = e.current, e.current = t;
  }
  var Q = b(null), le = b(null), se = b(null), be = b(null);
  function lt(e, t) {
    switch (G(se, t), G(le, e), G(Q, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? j0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = j0(t), e = C0(t, e);
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
    R(Q), G(Q, e);
  }
  function Ue() {
    R(Q), R(le), R(se);
  }
  function an(e) {
    e.memoizedState !== null && G(be, e);
    var t = Q.current, l = C0(t, e.type);
    t !== l && (G(le, e), G(Q, l));
  }
  function cr(e) {
    le.current === e && (R(Q), R(le)), be.current === e && (R(be), $n._currentValue = I);
  }
  var Qi, Wo;
  function Ll(e) {
    if (Qi === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Qi = t && t[1] || "", Wo = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qi + e + Wo;
  }
  var Zi = !1;
  function $i(e, t) {
    if (!e || Zi) return "";
    Zi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var k = function() {
                throw Error();
              };
              if (Object.defineProperty(k.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(k, []);
                } catch (z) {
                  var _ = z;
                }
                Reflect.construct(e, [], k);
              } else {
                try {
                  k.call();
                } catch (z) {
                  _ = z;
                }
                e.call(k.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                _ = z;
              }
              (k = e()) && typeof k.catch == "function" && k.catch(function() {
              });
            }
          } catch (z) {
            if (z && _ && typeof z.stack == "string")
              return [z.stack, _.stack];
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
      var r = a.DetermineComponentFrameRoot(), d = r[0], m = r[1];
      if (d && m) {
        var g = d.split(`
`), T = m.split(`
`);
        for (n = a = 0; a < g.length && !g[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < T.length && !T[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === g.length || n === T.length)
          for (a = g.length - 1, n = T.length - 1; 1 <= a && 0 <= n && g[a] !== T[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (g[a] !== T[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || g[a] !== T[n]) {
                  var M = `
` + g[a].replace(" at new ", " at ");
                  return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), M;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Zi = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Ll(l) : "";
  }
  function f2(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ll(e.type);
      case 16:
        return Ll("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ll("Suspense Fallback") : Ll("Suspense");
      case 19:
        return Ll("SuspenseList");
      case 0:
      case 15:
        return $i(e.type, !1);
      case 11:
        return $i(e.type.render, !1);
      case 1:
        return $i(e.type, !0);
      case 31:
        return Ll("Activity");
      default:
        return "";
    }
  }
  function Io(e) {
    try {
      var t = "", l = null;
      do
        t += f2(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ki = Object.prototype.hasOwnProperty, Ji = o.unstable_scheduleCallback, Fi = o.unstable_cancelCallback, m2 = o.unstable_shouldYield, h2 = o.unstable_requestPaint, mt = o.unstable_now, g2 = o.unstable_getCurrentPriorityLevel, Po = o.unstable_ImmediatePriority, ec = o.unstable_UserBlockingPriority, dr = o.unstable_NormalPriority, p2 = o.unstable_LowPriority, tc = o.unstable_IdlePriority, x2 = o.log, y2 = o.unstable_setDisableYieldValue, nn = null, ht = null;
  function dl(e) {
    if (typeof x2 == "function" && y2(e), ht && typeof ht.setStrictMode == "function")
      try {
        ht.setStrictMode(nn, e);
      } catch {
      }
  }
  var gt = Math.clz32 ? Math.clz32 : S2, b2 = Math.log, v2 = Math.LN2;
  function S2(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (b2(e) / v2 | 0) | 0;
  }
  var fr = 256, mr = 262144, hr = 4194304;
  function ql(e) {
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
  function gr(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0, r = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var m = a & 134217727;
    return m !== 0 ? (a = m & ~r, a !== 0 ? n = ql(a) : (d &= m, d !== 0 ? n = ql(d) : l || (l = m & ~e, l !== 0 && (n = ql(l))))) : (m = a & ~r, m !== 0 ? n = ql(m) : d !== 0 ? n = ql(d) : l || (l = a & ~e, l !== 0 && (n = ql(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & r) === 0 && (r = n & -n, l = t & -t, r >= l || r === 32 && (l & 4194048) !== 0) ? t : n;
  }
  function rn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function j2(e, t) {
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
  function lc() {
    var e = hr;
    return hr <<= 1, (hr & 62914560) === 0 && (hr = 4194304), e;
  }
  function Wi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function sn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function C2(e, t, l, a, n, r) {
    var d = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var m = e.entanglements, g = e.expirationTimes, T = e.hiddenUpdates;
    for (l = d & ~l; 0 < l; ) {
      var M = 31 - gt(l), k = 1 << M;
      m[M] = 0, g[M] = -1;
      var _ = T[M];
      if (_ !== null)
        for (T[M] = null, M = 0; M < _.length; M++) {
          var z = _[M];
          z !== null && (z.lane &= -536870913);
        }
      l &= ~k;
    }
    a !== 0 && ac(e, a, 0), r !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(d & ~t));
  }
  function ac(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - gt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function nc(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - gt(l), n = 1 << a;
      n & t | e[a] & t && (e[a] |= t), l &= ~n;
    }
  }
  function rc(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Ii(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Ii(e) {
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
  function Pi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ic() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Z0(e.type));
  }
  function sc(e, t) {
    var l = U.p;
    try {
      return U.p = e, t();
    } finally {
      U.p = l;
    }
  }
  var fl = Math.random().toString(36).slice(2), Je = "__reactFiber$" + fl, nt = "__reactProps$" + fl, da = "__reactContainer$" + fl, es = "__reactEvents$" + fl, N2 = "__reactListeners$" + fl, E2 = "__reactHandles$" + fl, uc = "__reactResources$" + fl, un = "__reactMarker$" + fl;
  function ts(e) {
    delete e[Je], delete e[nt], delete e[es], delete e[N2], delete e[E2];
  }
  function fa(e) {
    var t = e[Je];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[da] || l[Je]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = M0(e); e !== null; ) {
            if (l = e[Je]) return l;
            e = M0(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function ma(e) {
    if (e = e[Je] || e[da]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function on(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function ha(e) {
    var t = e[uc];
    return t || (t = e[uc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ze(e) {
    e[un] = !0;
  }
  var oc = /* @__PURE__ */ new Set(), cc = {};
  function Gl(e, t) {
    ga(e, t), ga(e + "Capture", t);
  }
  function ga(e, t) {
    for (cc[e] = t, e = 0; e < t.length; e++)
      oc.add(t[e]);
  }
  var T2 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), dc = {}, fc = {};
  function _2(e) {
    return Ki.call(fc, e) ? !0 : Ki.call(dc, e) ? !1 : T2.test(e) ? fc[e] = !0 : (dc[e] = !0, !1);
  }
  function pr(e, t, l) {
    if (_2(t))
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
  function xr(e, t, l) {
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
  function Zt(e, t, l, a) {
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
  function Tt(e) {
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
  function mc(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function z2(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, r = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(d) {
          l = "" + d, r.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(d) {
          l = "" + d;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ls(e) {
    if (!e._valueTracker) {
      var t = mc(e) ? "checked" : "value";
      e._valueTracker = z2(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function hc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = mc(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function yr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var A2 = /[\n"\\]/g;
  function _t(e) {
    return e.replace(
      A2,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function as(e, t, l, a, n, r, d, m) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Tt(t)) : e.value !== "" + Tt(t) && (e.value = "" + Tt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? ns(e, d, Tt(t)) : l != null ? ns(e, d, Tt(l)) : a != null && e.removeAttribute("value"), n == null && r != null && (e.defaultChecked = !!r), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.name = "" + Tt(m) : e.removeAttribute("name");
  }
  function gc(e, t, l, a, n, r, d, m) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || l != null) {
      if (!(r !== "submit" && r !== "reset" || t != null)) {
        ls(e);
        return;
      }
      l = l != null ? "" + Tt(l) : "", t = t != null ? "" + Tt(t) : l, m || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = m ? e.checked : !!a, e.defaultChecked = !!a, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), ls(e);
  }
  function ns(e, t, l) {
    t === "number" && yr(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function pa(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < l.length; n++)
        t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Tt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          e[n].selected = !0, a && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function pc(e, t, l) {
    if (t != null && (t = "" + Tt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Tt(l) : "";
  }
  function xc(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(c(92));
        if (Y(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = Tt(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), ls(e);
  }
  function xa(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var M2 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function yc(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || M2.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function bc(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && l[n] !== a && yc(e, n, a);
    } else
      for (var r in t)
        t.hasOwnProperty(r) && yc(e, r, t[r]);
  }
  function rs(e) {
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
  var w2 = /* @__PURE__ */ new Map([
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
  ]), k2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function br(e) {
    return k2.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function $t() {
  }
  var is = null;
  function ss(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ya = null, ba = null;
  function vc(e) {
    var t = ma(e);
    if (t && (e = t.stateNode)) {
      var l = e[nt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (as(
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
              'input[name="' + _t(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[nt] || null;
                if (!n) throw Error(c(90));
                as(
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
              a = l[t], a.form === e.form && hc(a);
          }
          break e;
        case "textarea":
          pc(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && pa(e, !!l.multiple, t, !1);
      }
    }
  }
  var us = !1;
  function Sc(e, t, l) {
    if (us) return e(t, l);
    us = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (us = !1, (ya !== null || ba !== null) && (ii(), ya && (t = ya, e = ba, ba = ya = null, vc(t), e)))
        for (t = 0; t < e.length; t++) vc(e[t]);
    }
  }
  function cn(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[nt] || null;
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
        c(231, t, typeof l)
      );
    return l;
  }
  var Kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), os = !1;
  if (Kt)
    try {
      var dn = {};
      Object.defineProperty(dn, "passive", {
        get: function() {
          os = !0;
        }
      }), window.addEventListener("test", dn, dn), window.removeEventListener("test", dn, dn);
    } catch {
      os = !1;
    }
  var ml = null, cs = null, vr = null;
  function jc() {
    if (vr) return vr;
    var e, t = cs, l = t.length, a, n = "value" in ml ? ml.value : ml.textContent, r = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++) ;
    var d = l - e;
    for (a = 1; a <= d && t[l - a] === n[r - a]; a++) ;
    return vr = n.slice(e, 1 < a ? 1 - a : void 0);
  }
  function Sr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function jr() {
    return !0;
  }
  function Cc() {
    return !1;
  }
  function rt(e) {
    function t(l, a, n, r, d) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = r, this.target = d, this.currentTarget = null;
      for (var m in e)
        e.hasOwnProperty(m) && (l = e[m], this[m] = l ? l(r) : r[m]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? jr : Cc, this.isPropagationStopped = Cc, this;
    }
    return j(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = jr);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = jr);
      },
      persist: function() {
      },
      isPersistent: jr
    }), t;
  }
  var Yl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Cr = rt(Yl), fn = j({}, Yl, { view: 0, detail: 0 }), O2 = rt(fn), ds, fs, mn, Nr = j({}, fn, {
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
    getModifierState: hs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== mn && (mn && e.type === "mousemove" ? (ds = e.screenX - mn.screenX, fs = e.screenY - mn.screenY) : fs = ds = 0, mn = e), ds);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : fs;
    }
  }), Nc = rt(Nr), R2 = j({}, Nr, { dataTransfer: 0 }), D2 = rt(R2), U2 = j({}, fn, { relatedTarget: 0 }), ms = rt(U2), B2 = j({}, Yl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), H2 = rt(B2), L2 = j({}, Yl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), q2 = rt(L2), G2 = j({}, Yl, { data: 0 }), Ec = rt(G2), Y2 = {
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
  }, V2 = {
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
  }, X2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Q2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = X2[e]) ? !!t[e] : !1;
  }
  function hs() {
    return Q2;
  }
  var Z2 = j({}, fn, {
    key: function(e) {
      if (e.key) {
        var t = Y2[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Sr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? V2[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: hs,
    charCode: function(e) {
      return e.type === "keypress" ? Sr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Sr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), $2 = rt(Z2), K2 = j({}, Nr, {
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
  }), Tc = rt(K2), J2 = j({}, fn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hs
  }), F2 = rt(J2), W2 = j({}, Yl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), I2 = rt(W2), P2 = j({}, Nr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), em = rt(P2), tm = j({}, Yl, {
    newState: 0,
    oldState: 0
  }), lm = rt(tm), am = [9, 13, 27, 32], gs = Kt && "CompositionEvent" in window, hn = null;
  Kt && "documentMode" in document && (hn = document.documentMode);
  var nm = Kt && "TextEvent" in window && !hn, _c = Kt && (!gs || hn && 8 < hn && 11 >= hn), zc = " ", Ac = !1;
  function Mc(e, t) {
    switch (e) {
      case "keyup":
        return am.indexOf(t.keyCode) !== -1;
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
  function wc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var va = !1;
  function rm(e, t) {
    switch (e) {
      case "compositionend":
        return wc(t);
      case "keypress":
        return t.which !== 32 ? null : (Ac = !0, zc);
      case "textInput":
        return e = t.data, e === zc && Ac ? null : e;
      default:
        return null;
    }
  }
  function im(e, t) {
    if (va)
      return e === "compositionend" || !gs && Mc(e, t) ? (e = jc(), vr = cs = ml = null, va = !1, e) : null;
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
        return _c && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var sm = {
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
  function kc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!sm[e.type] : t === "textarea";
  }
  function Oc(e, t, l, a) {
    ya ? ba ? ba.push(a) : ba = [a] : ya = a, t = mi(t, "onChange"), 0 < t.length && (l = new Cr(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var gn = null, pn = null;
  function um(e) {
    p0(e, 0);
  }
  function Er(e) {
    var t = on(e);
    if (hc(t)) return e;
  }
  function Rc(e, t) {
    if (e === "change") return t;
  }
  var Dc = !1;
  if (Kt) {
    var ps;
    if (Kt) {
      var xs = "oninput" in document;
      if (!xs) {
        var Uc = document.createElement("div");
        Uc.setAttribute("oninput", "return;"), xs = typeof Uc.oninput == "function";
      }
      ps = xs;
    } else ps = !1;
    Dc = ps && (!document.documentMode || 9 < document.documentMode);
  }
  function Bc() {
    gn && (gn.detachEvent("onpropertychange", Hc), pn = gn = null);
  }
  function Hc(e) {
    if (e.propertyName === "value" && Er(pn)) {
      var t = [];
      Oc(
        t,
        pn,
        e,
        ss(e)
      ), Sc(um, t);
    }
  }
  function om(e, t, l) {
    e === "focusin" ? (Bc(), gn = t, pn = l, gn.attachEvent("onpropertychange", Hc)) : e === "focusout" && Bc();
  }
  function cm(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Er(pn);
  }
  function dm(e, t) {
    if (e === "click") return Er(t);
  }
  function fm(e, t) {
    if (e === "input" || e === "change")
      return Er(t);
  }
  function mm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var pt = typeof Object.is == "function" ? Object.is : mm;
  function xn(e, t) {
    if (pt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Ki.call(t, n) || !pt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function Lc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function qc(e, t) {
    var l = Lc(e);
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
      l = Lc(l);
    }
  }
  function Gc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Yc(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = yr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = yr(e.document);
    }
    return t;
  }
  function ys(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var hm = Kt && "documentMode" in document && 11 >= document.documentMode, Sa = null, bs = null, yn = null, vs = !1;
  function Vc(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    vs || Sa == null || Sa !== yr(a) || (a = Sa, "selectionStart" in a && ys(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), yn && xn(yn, a) || (yn = a, a = mi(bs, "onSelect"), 0 < a.length && (t = new Cr(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = Sa)));
  }
  function Vl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var ja = {
    animationend: Vl("Animation", "AnimationEnd"),
    animationiteration: Vl("Animation", "AnimationIteration"),
    animationstart: Vl("Animation", "AnimationStart"),
    transitionrun: Vl("Transition", "TransitionRun"),
    transitionstart: Vl("Transition", "TransitionStart"),
    transitioncancel: Vl("Transition", "TransitionCancel"),
    transitionend: Vl("Transition", "TransitionEnd")
  }, Ss = {}, Xc = {};
  Kt && (Xc = document.createElement("div").style, "AnimationEvent" in window || (delete ja.animationend.animation, delete ja.animationiteration.animation, delete ja.animationstart.animation), "TransitionEvent" in window || delete ja.transitionend.transition);
  function Xl(e) {
    if (Ss[e]) return Ss[e];
    if (!ja[e]) return e;
    var t = ja[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Xc)
        return Ss[e] = t[l];
    return e;
  }
  var Qc = Xl("animationend"), Zc = Xl("animationiteration"), $c = Xl("animationstart"), gm = Xl("transitionrun"), pm = Xl("transitionstart"), xm = Xl("transitioncancel"), Kc = Xl("transitionend"), Jc = /* @__PURE__ */ new Map(), js = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  js.push("scrollEnd");
  function Ut(e, t) {
    Jc.set(e, t), Gl(t, [e]);
  }
  var Tr = typeof reportError == "function" ? reportError : function(e) {
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
  }, zt = [], Ca = 0, Cs = 0;
  function _r() {
    for (var e = Ca, t = Cs = Ca = 0; t < e; ) {
      var l = zt[t];
      zt[t++] = null;
      var a = zt[t];
      zt[t++] = null;
      var n = zt[t];
      zt[t++] = null;
      var r = zt[t];
      if (zt[t++] = null, a !== null && n !== null) {
        var d = a.pending;
        d === null ? n.next = n : (n.next = d.next, d.next = n), a.pending = n;
      }
      r !== 0 && Fc(l, n, r);
    }
  }
  function zr(e, t, l, a) {
    zt[Ca++] = e, zt[Ca++] = t, zt[Ca++] = l, zt[Ca++] = a, Cs |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Ns(e, t, l, a) {
    return zr(e, t, l, a), Ar(e);
  }
  function Ql(e, t) {
    return zr(e, null, null, t), Ar(e);
  }
  function Fc(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, r = e.return; r !== null; )
      r.childLanes |= l, a = r.alternate, a !== null && (a.childLanes |= l), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (n = !0)), e = r, r = r.return;
    return e.tag === 3 ? (r = e.stateNode, n && t !== null && (n = 31 - gt(l), e = r.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), r) : null;
  }
  function Ar(e) {
    if (50 < qn)
      throw qn = 0, Ou = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Na = {};
  function ym(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function xt(e, t, l, a) {
    return new ym(e, t, l, a);
  }
  function Es(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Jt(e, t) {
    var l = e.alternate;
    return l === null ? (l = xt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Wc(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Mr(e, t, l, a, n, r) {
    var d = 0;
    if (a = e, typeof e == "function") Es(e) && (d = 1);
    else if (typeof e == "string")
      d = C4(
        e,
        l,
        Q.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Le:
          return e = xt(31, l, t, n), e.elementType = Le, e.lanes = r, e;
        case q:
          return Zl(l.children, n, r, t);
        case te:
          d = 8, n |= 24;
          break;
        case $:
          return e = xt(12, l, t, n | 2), e.elementType = $, e.lanes = r, e;
        case F:
          return e = xt(13, l, t, n), e.elementType = F, e.lanes = r, e;
        case ie:
          return e = xt(19, l, t, n), e.elementType = ie, e.lanes = r, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case B:
                d = 10;
                break e;
              case L:
                d = 9;
                break e;
              case re:
                d = 11;
                break e;
              case W:
                d = 14;
                break e;
              case he:
                d = 16, a = null;
                break e;
            }
          d = 29, l = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = xt(d, l, t, n), t.elementType = e, t.type = a, t.lanes = r, t;
  }
  function Zl(e, t, l, a) {
    return e = xt(7, e, a, t), e.lanes = l, e;
  }
  function Ts(e, t, l) {
    return e = xt(6, e, null, t), e.lanes = l, e;
  }
  function Ic(e) {
    var t = xt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function _s(e, t, l) {
    return t = xt(
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
  var Pc = /* @__PURE__ */ new WeakMap();
  function At(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Pc.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Io(t)
      }, Pc.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Io(t)
    };
  }
  var Ea = [], Ta = 0, wr = null, bn = 0, Mt = [], wt = 0, hl = null, Lt = 1, qt = "";
  function Ft(e, t) {
    Ea[Ta++] = bn, Ea[Ta++] = wr, wr = e, bn = t;
  }
  function ed(e, t, l) {
    Mt[wt++] = Lt, Mt[wt++] = qt, Mt[wt++] = hl, hl = e;
    var a = Lt;
    e = qt;
    var n = 32 - gt(a) - 1;
    a &= ~(1 << n), l += 1;
    var r = 32 - gt(t) + n;
    if (30 < r) {
      var d = n - n % 5;
      r = (a & (1 << d) - 1).toString(32), a >>= d, n -= d, Lt = 1 << 32 - gt(t) + n | l << n | a, qt = r + e;
    } else
      Lt = 1 << r | l << n | a, qt = e;
  }
  function zs(e) {
    e.return !== null && (Ft(e, 1), ed(e, 1, 0));
  }
  function As(e) {
    for (; e === wr; )
      wr = Ea[--Ta], Ea[Ta] = null, bn = Ea[--Ta], Ea[Ta] = null;
    for (; e === hl; )
      hl = Mt[--wt], Mt[wt] = null, qt = Mt[--wt], Mt[wt] = null, Lt = Mt[--wt], Mt[wt] = null;
  }
  function td(e, t) {
    Mt[wt++] = Lt, Mt[wt++] = qt, Mt[wt++] = hl, Lt = t.id, qt = t.overflow, hl = e;
  }
  var Fe = null, we = null, me = !1, gl = null, kt = !1, Ms = Error(c(519));
  function pl(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vn(At(t, e)), Ms;
  }
  function ld(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Je] = e, t[nt] = a, l) {
      case "dialog":
        oe("cancel", t), oe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        oe("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Yn.length; l++)
          oe(Yn[l], t);
        break;
      case "source":
        oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        oe("error", t), oe("load", t);
        break;
      case "details":
        oe("toggle", t);
        break;
      case "input":
        oe("invalid", t), gc(
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
        oe("invalid", t);
        break;
      case "textarea":
        oe("invalid", t), xc(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || v0(t.textContent, l) ? (a.popover != null && (oe("beforetoggle", t), oe("toggle", t)), a.onScroll != null && oe("scroll", t), a.onScrollEnd != null && oe("scrollend", t), a.onClick != null && (t.onclick = $t), t = !0) : t = !1, t || pl(e, !0);
  }
  function ad(e) {
    for (Fe = e.return; Fe; )
      switch (Fe.tag) {
        case 5:
        case 31:
        case 13:
          kt = !1;
          return;
        case 27:
        case 3:
          kt = !0;
          return;
        default:
          Fe = Fe.return;
      }
  }
  function _a(e) {
    if (e !== Fe) return !1;
    if (!me) return ad(e), me = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Ku(e.type, e.memoizedProps)), l = !l), l && we && pl(e), ad(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      we = A0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      we = A0(e);
    } else
      t === 27 ? (t = we, Ml(e.type) ? (e = Pu, Pu = null, we = e) : we = t) : we = Fe ? Rt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $l() {
    we = Fe = null, me = !1;
  }
  function ws() {
    var e = gl;
    return e !== null && (ot === null ? ot = e : ot.push.apply(
      ot,
      e
    ), gl = null), e;
  }
  function vn(e) {
    gl === null ? gl = [e] : gl.push(e);
  }
  var ks = b(null), Kl = null, Wt = null;
  function xl(e, t, l) {
    G(ks, t._currentValue), t._currentValue = l;
  }
  function It(e) {
    e._currentValue = ks.current, R(ks);
  }
  function Os(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function Rs(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var r = n.dependencies;
      if (r !== null) {
        var d = n.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var m = r;
          r = n;
          for (var g = 0; g < t.length; g++)
            if (m.context === t[g]) {
              r.lanes |= l, m = r.alternate, m !== null && (m.lanes |= l), Os(
                r.return,
                l,
                e
              ), a || (d = null);
              break e;
            }
          r = m.next;
        }
      } else if (n.tag === 18) {
        if (d = n.return, d === null) throw Error(c(341));
        d.lanes |= l, r = d.alternate, r !== null && (r.lanes |= l), Os(d, l, e), d = null;
      } else d = n.child;
      if (d !== null) d.return = n;
      else
        for (d = n; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (n = d.sibling, n !== null) {
            n.return = d.return, d = n;
            break;
          }
          d = d.return;
        }
      n = d;
    }
  }
  function za(e, t, l, a) {
    e = null;
    for (var n = t, r = !1; n !== null; ) {
      if (!r) {
        if ((n.flags & 524288) !== 0) r = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var d = n.alternate;
        if (d === null) throw Error(c(387));
        if (d = d.memoizedProps, d !== null) {
          var m = n.type;
          pt(n.pendingProps.value, d.value) || (e !== null ? e.push(m) : e = [m]);
        }
      } else if (n === be.current) {
        if (d = n.alternate, d === null) throw Error(c(387));
        d.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push($n) : e = [$n]);
      }
      n = n.return;
    }
    e !== null && Rs(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function kr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!pt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Jl(e) {
    Kl = e, Wt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function We(e) {
    return nd(Kl, e);
  }
  function Or(e, t) {
    return Kl === null && Jl(e), nd(e, t);
  }
  function nd(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Wt === null) {
      if (e === null) throw Error(c(308));
      Wt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Wt = Wt.next = t;
    return l;
  }
  var bm = typeof AbortController < "u" ? AbortController : function() {
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
  }, vm = o.unstable_scheduleCallback, Sm = o.unstable_NormalPriority, qe = {
    $$typeof: B,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ds() {
    return {
      controller: new bm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Sn(e) {
    e.refCount--, e.refCount === 0 && vm(Sm, function() {
      e.controller.abort();
    });
  }
  var jn = null, Us = 0, Aa = 0, Ma = null;
  function jm(e, t) {
    if (jn === null) {
      var l = jn = [];
      Us = 0, Aa = Lu(), Ma = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return Us++, t.then(rd, rd), t;
  }
  function rd() {
    if (--Us === 0 && jn !== null) {
      Ma !== null && (Ma.status = "fulfilled");
      var e = jn;
      jn = null, Aa = 0, Ma = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Cm(e, t) {
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
  var id = C.S;
  C.S = function(e, t) {
    Xf = mt(), typeof t == "object" && t !== null && typeof t.then == "function" && jm(e, t), id !== null && id(e, t);
  };
  var Fl = b(null);
  function Bs() {
    var e = Fl.current;
    return e !== null ? e : ze.pooledCache;
  }
  function Rr(e, t) {
    t === null ? G(Fl, Fl.current) : G(Fl, t.pool);
  }
  function sd() {
    var e = Bs();
    return e === null ? null : { parent: qe._currentValue, pool: e };
  }
  var wa = Error(c(460)), Hs = Error(c(474)), Dr = Error(c(542)), Ur = { then: function() {
  } };
  function ud(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function od(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then($t, $t), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, dd(e), e;
      default:
        if (typeof t.status == "string") t.then($t, $t);
        else {
          if (e = ze, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
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
            throw e = t.reason, dd(e), e;
        }
        throw Il = t, wa;
    }
  }
  function Wl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Il = l, wa) : l;
    }
  }
  var Il = null;
  function cd() {
    if (Il === null) throw Error(c(459));
    var e = Il;
    return Il = null, e;
  }
  function dd(e) {
    if (e === wa || e === Dr)
      throw Error(c(483));
  }
  var ka = null, Cn = 0;
  function Br(e) {
    var t = Cn;
    return Cn += 1, ka === null && (ka = []), od(ka, e, t);
  }
  function Nn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Hr(e, t) {
    throw t.$$typeof === D ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function fd(e) {
    function t(N, y) {
      if (e) {
        var E = N.deletions;
        E === null ? (N.deletions = [y], N.flags |= 16) : E.push(y);
      }
    }
    function l(N, y) {
      if (!e) return null;
      for (; y !== null; )
        t(N, y), y = y.sibling;
      return null;
    }
    function a(N) {
      for (var y = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? y.set(N.key, N) : y.set(N.index, N), N = N.sibling;
      return y;
    }
    function n(N, y) {
      return N = Jt(N, y), N.index = 0, N.sibling = null, N;
    }
    function r(N, y, E) {
      return N.index = E, e ? (E = N.alternate, E !== null ? (E = E.index, E < y ? (N.flags |= 67108866, y) : E) : (N.flags |= 67108866, y)) : (N.flags |= 1048576, y);
    }
    function d(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function m(N, y, E, w) {
      return y === null || y.tag !== 6 ? (y = Ts(E, N.mode, w), y.return = N, y) : (y = n(y, E), y.return = N, y);
    }
    function g(N, y, E, w) {
      var J = E.type;
      return J === q ? M(
        N,
        y,
        E.props.children,
        w,
        E.key
      ) : y !== null && (y.elementType === J || typeof J == "object" && J !== null && J.$$typeof === he && Wl(J) === y.type) ? (y = n(y, E.props), Nn(y, E), y.return = N, y) : (y = Mr(
        E.type,
        E.key,
        E.props,
        null,
        N.mode,
        w
      ), Nn(y, E), y.return = N, y);
    }
    function T(N, y, E, w) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== E.containerInfo || y.stateNode.implementation !== E.implementation ? (y = _s(E, N.mode, w), y.return = N, y) : (y = n(y, E.children || []), y.return = N, y);
    }
    function M(N, y, E, w, J) {
      return y === null || y.tag !== 7 ? (y = Zl(
        E,
        N.mode,
        w,
        J
      ), y.return = N, y) : (y = n(y, E), y.return = N, y);
    }
    function k(N, y, E) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = Ts(
          "" + y,
          N.mode,
          E
        ), y.return = N, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case V:
            return E = Mr(
              y.type,
              y.key,
              y.props,
              null,
              N.mode,
              E
            ), Nn(E, y), E.return = N, E;
          case H:
            return y = _s(
              y,
              N.mode,
              E
            ), y.return = N, y;
          case he:
            return y = Wl(y), k(N, y, E);
        }
        if (Y(y) || Te(y))
          return y = Zl(
            y,
            N.mode,
            E,
            null
          ), y.return = N, y;
        if (typeof y.then == "function")
          return k(N, Br(y), E);
        if (y.$$typeof === B)
          return k(
            N,
            Or(N, y),
            E
          );
        Hr(N, y);
      }
      return null;
    }
    function _(N, y, E, w) {
      var J = y !== null ? y.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return J !== null ? null : m(N, y, "" + E, w);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case V:
            return E.key === J ? g(N, y, E, w) : null;
          case H:
            return E.key === J ? T(N, y, E, w) : null;
          case he:
            return E = Wl(E), _(N, y, E, w);
        }
        if (Y(E) || Te(E))
          return J !== null ? null : M(N, y, E, w, null);
        if (typeof E.then == "function")
          return _(
            N,
            y,
            Br(E),
            w
          );
        if (E.$$typeof === B)
          return _(
            N,
            y,
            Or(N, E),
            w
          );
        Hr(N, E);
      }
      return null;
    }
    function z(N, y, E, w, J) {
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return N = N.get(E) || null, m(y, N, "" + w, J);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case V:
            return N = N.get(
              w.key === null ? E : w.key
            ) || null, g(y, N, w, J);
          case H:
            return N = N.get(
              w.key === null ? E : w.key
            ) || null, T(y, N, w, J);
          case he:
            return w = Wl(w), z(
              N,
              y,
              E,
              w,
              J
            );
        }
        if (Y(w) || Te(w))
          return N = N.get(E) || null, M(y, N, w, J, null);
        if (typeof w.then == "function")
          return z(
            N,
            y,
            E,
            Br(w),
            J
          );
        if (w.$$typeof === B)
          return z(
            N,
            y,
            E,
            Or(y, w),
            J
          );
        Hr(y, w);
      }
      return null;
    }
    function X(N, y, E, w) {
      for (var J = null, ge = null, Z = y, ne = y = 0, de = null; Z !== null && ne < E.length; ne++) {
        Z.index > ne ? (de = Z, Z = null) : de = Z.sibling;
        var pe = _(
          N,
          Z,
          E[ne],
          w
        );
        if (pe === null) {
          Z === null && (Z = de);
          break;
        }
        e && Z && pe.alternate === null && t(N, Z), y = r(pe, y, ne), ge === null ? J = pe : ge.sibling = pe, ge = pe, Z = de;
      }
      if (ne === E.length)
        return l(N, Z), me && Ft(N, ne), J;
      if (Z === null) {
        for (; ne < E.length; ne++)
          Z = k(N, E[ne], w), Z !== null && (y = r(
            Z,
            y,
            ne
          ), ge === null ? J = Z : ge.sibling = Z, ge = Z);
        return me && Ft(N, ne), J;
      }
      for (Z = a(Z); ne < E.length; ne++)
        de = z(
          Z,
          N,
          ne,
          E[ne],
          w
        ), de !== null && (e && de.alternate !== null && Z.delete(
          de.key === null ? ne : de.key
        ), y = r(
          de,
          y,
          ne
        ), ge === null ? J = de : ge.sibling = de, ge = de);
      return e && Z.forEach(function(Dl) {
        return t(N, Dl);
      }), me && Ft(N, ne), J;
    }
    function P(N, y, E, w) {
      if (E == null) throw Error(c(151));
      for (var J = null, ge = null, Z = y, ne = y = 0, de = null, pe = E.next(); Z !== null && !pe.done; ne++, pe = E.next()) {
        Z.index > ne ? (de = Z, Z = null) : de = Z.sibling;
        var Dl = _(N, Z, pe.value, w);
        if (Dl === null) {
          Z === null && (Z = de);
          break;
        }
        e && Z && Dl.alternate === null && t(N, Z), y = r(Dl, y, ne), ge === null ? J = Dl : ge.sibling = Dl, ge = Dl, Z = de;
      }
      if (pe.done)
        return l(N, Z), me && Ft(N, ne), J;
      if (Z === null) {
        for (; !pe.done; ne++, pe = E.next())
          pe = k(N, pe.value, w), pe !== null && (y = r(pe, y, ne), ge === null ? J = pe : ge.sibling = pe, ge = pe);
        return me && Ft(N, ne), J;
      }
      for (Z = a(Z); !pe.done; ne++, pe = E.next())
        pe = z(Z, N, ne, pe.value, w), pe !== null && (e && pe.alternate !== null && Z.delete(pe.key === null ? ne : pe.key), y = r(pe, y, ne), ge === null ? J = pe : ge.sibling = pe, ge = pe);
      return e && Z.forEach(function(R4) {
        return t(N, R4);
      }), me && Ft(N, ne), J;
    }
    function Ee(N, y, E, w) {
      if (typeof E == "object" && E !== null && E.type === q && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case V:
            e: {
              for (var J = E.key; y !== null; ) {
                if (y.key === J) {
                  if (J = E.type, J === q) {
                    if (y.tag === 7) {
                      l(
                        N,
                        y.sibling
                      ), w = n(
                        y,
                        E.props.children
                      ), w.return = N, N = w;
                      break e;
                    }
                  } else if (y.elementType === J || typeof J == "object" && J !== null && J.$$typeof === he && Wl(J) === y.type) {
                    l(
                      N,
                      y.sibling
                    ), w = n(y, E.props), Nn(w, E), w.return = N, N = w;
                    break e;
                  }
                  l(N, y);
                  break;
                } else t(N, y);
                y = y.sibling;
              }
              E.type === q ? (w = Zl(
                E.props.children,
                N.mode,
                w,
                E.key
              ), w.return = N, N = w) : (w = Mr(
                E.type,
                E.key,
                E.props,
                null,
                N.mode,
                w
              ), Nn(w, E), w.return = N, N = w);
            }
            return d(N);
          case H:
            e: {
              for (J = E.key; y !== null; ) {
                if (y.key === J)
                  if (y.tag === 4 && y.stateNode.containerInfo === E.containerInfo && y.stateNode.implementation === E.implementation) {
                    l(
                      N,
                      y.sibling
                    ), w = n(y, E.children || []), w.return = N, N = w;
                    break e;
                  } else {
                    l(N, y);
                    break;
                  }
                else t(N, y);
                y = y.sibling;
              }
              w = _s(E, N.mode, w), w.return = N, N = w;
            }
            return d(N);
          case he:
            return E = Wl(E), Ee(
              N,
              y,
              E,
              w
            );
        }
        if (Y(E))
          return X(
            N,
            y,
            E,
            w
          );
        if (Te(E)) {
          if (J = Te(E), typeof J != "function") throw Error(c(150));
          return E = J.call(E), P(
            N,
            y,
            E,
            w
          );
        }
        if (typeof E.then == "function")
          return Ee(
            N,
            y,
            Br(E),
            w
          );
        if (E.$$typeof === B)
          return Ee(
            N,
            y,
            Or(N, E),
            w
          );
        Hr(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, y !== null && y.tag === 6 ? (l(N, y.sibling), w = n(y, E), w.return = N, N = w) : (l(N, y), w = Ts(E, N.mode, w), w.return = N, N = w), d(N)) : l(N, y);
    }
    return function(N, y, E, w) {
      try {
        Cn = 0;
        var J = Ee(
          N,
          y,
          E,
          w
        );
        return ka = null, J;
      } catch (Z) {
        if (Z === wa || Z === Dr) throw Z;
        var ge = xt(29, Z, null, N.mode);
        return ge.lanes = w, ge.return = N, ge;
      } finally {
      }
    };
  }
  var Pl = fd(!0), md = fd(!1), yl = !1;
  function Ls(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function bl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function vl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (xe & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Ar(e), Fc(e, null, l), t;
    }
    return zr(e, a, t, l), Ar(e);
  }
  function En(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, nc(e, l);
    }
  }
  function Gs(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, r = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var d = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          r === null ? n = r = d : r = r.next = d, l = l.next;
        } while (l !== null);
        r === null ? n = r = t : r = r.next = t;
      } else n = r = t;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: r,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var Ys = !1;
  function Tn() {
    if (Ys) {
      var e = Ma;
      if (e !== null) throw e;
    }
  }
  function _n(e, t, l, a) {
    Ys = !1;
    var n = e.updateQueue;
    yl = !1;
    var r = n.firstBaseUpdate, d = n.lastBaseUpdate, m = n.shared.pending;
    if (m !== null) {
      n.shared.pending = null;
      var g = m, T = g.next;
      g.next = null, d === null ? r = T : d.next = T, d = g;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, m = M.lastBaseUpdate, m !== d && (m === null ? M.firstBaseUpdate = T : m.next = T, M.lastBaseUpdate = g));
    }
    if (r !== null) {
      var k = n.baseState;
      d = 0, M = T = g = null, m = r;
      do {
        var _ = m.lane & -536870913, z = _ !== m.lane;
        if (z ? (ce & _) === _ : (a & _) === _) {
          _ !== 0 && _ === Aa && (Ys = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var X = e, P = m;
            _ = t;
            var Ee = l;
            switch (P.tag) {
              case 1:
                if (X = P.payload, typeof X == "function") {
                  k = X.call(Ee, k, _);
                  break e;
                }
                k = X;
                break e;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = P.payload, _ = typeof X == "function" ? X.call(Ee, k, _) : X, _ == null) break e;
                k = j({}, k, _);
                break e;
              case 2:
                yl = !0;
            }
          }
          _ = m.callback, _ !== null && (e.flags |= 64, z && (e.flags |= 8192), z = n.callbacks, z === null ? n.callbacks = [_] : z.push(_));
        } else
          z = {
            lane: _,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, M === null ? (T = M = z, g = k) : M = M.next = z, d |= _;
        if (m = m.next, m === null) {
          if (m = n.shared.pending, m === null)
            break;
          z = m, m = z.next, z.next = null, n.lastBaseUpdate = z, n.shared.pending = null;
        }
      } while (!0);
      M === null && (g = k), n.baseState = g, n.firstBaseUpdate = T, n.lastBaseUpdate = M, r === null && (n.shared.lanes = 0), El |= d, e.lanes = d, e.memoizedState = k;
    }
  }
  function hd(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function gd(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        hd(l[e], t);
  }
  var Oa = b(null), Lr = b(0);
  function pd(e, t) {
    e = sl, G(Lr, e), G(Oa, t), sl = e | t.baseLanes;
  }
  function Vs() {
    G(Lr, sl), G(Oa, Oa.current);
  }
  function Xs() {
    sl = Lr.current, R(Oa), R(Lr);
  }
  var yt = b(null), Ot = null;
  function Sl(e) {
    var t = e.alternate;
    G(Be, Be.current & 1), G(yt, e), Ot === null && (t === null || Oa.current !== null || t.memoizedState !== null) && (Ot = e);
  }
  function Qs(e) {
    G(Be, Be.current), G(yt, e), Ot === null && (Ot = e);
  }
  function xd(e) {
    e.tag === 22 ? (G(Be, Be.current), G(yt, e), Ot === null && (Ot = e)) : jl();
  }
  function jl() {
    G(Be, Be.current), G(yt, yt.current);
  }
  function bt(e) {
    R(yt), Ot === e && (Ot = null), R(Be);
  }
  var Be = b(0);
  function qr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Wu(l) || Iu(l)))
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
  var Pt = 0, ae = null, Ce = null, Ge = null, Gr = !1, Ra = !1, ea = !1, Yr = 0, zn = 0, Da = null, Nm = 0;
  function Re() {
    throw Error(c(321));
  }
  function Zs(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!pt(e[l], t[l])) return !1;
    return !0;
  }
  function $s(e, t, l, a, n, r) {
    return Pt = r, ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e === null || e.memoizedState === null ? ef : uu, ea = !1, r = l(a, n), ea = !1, Ra && (r = bd(
      t,
      l,
      a,
      n
    )), yd(e), r;
  }
  function yd(e) {
    C.H = wn;
    var t = Ce !== null && Ce.next !== null;
    if (Pt = 0, Ge = Ce = ae = null, Gr = !1, zn = 0, Da = null, t) throw Error(c(300));
    e === null || Ye || (e = e.dependencies, e !== null && kr(e) && (Ye = !0));
  }
  function bd(e, t, l, a) {
    ae = e;
    var n = 0;
    do {
      if (Ra && (Da = null), zn = 0, Ra = !1, 25 <= n) throw Error(c(301));
      if (n += 1, Ge = Ce = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      C.H = tf, r = t(l, a);
    } while (Ra);
    return r;
  }
  function Em() {
    var e = C.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? An(t) : t, e = e.useState()[0], (Ce !== null ? Ce.memoizedState : null) !== e && (ae.flags |= 1024), t;
  }
  function Ks() {
    var e = Yr !== 0;
    return Yr = 0, e;
  }
  function Js(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Fs(e) {
    if (Gr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Gr = !1;
    }
    Pt = 0, Ge = Ce = ae = null, Ra = !1, zn = Yr = 0, Da = null;
  }
  function at() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ge === null ? ae.memoizedState = Ge = e : Ge = Ge.next = e, Ge;
  }
  function He() {
    if (Ce === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ce.next;
    var t = Ge === null ? ae.memoizedState : Ge.next;
    if (t !== null)
      Ge = t, Ce = e;
    else {
      if (e === null)
        throw ae.alternate === null ? Error(c(467)) : Error(c(310));
      Ce = e, e = {
        memoizedState: Ce.memoizedState,
        baseState: Ce.baseState,
        baseQueue: Ce.baseQueue,
        queue: Ce.queue,
        next: null
      }, Ge === null ? ae.memoizedState = Ge = e : Ge = Ge.next = e;
    }
    return Ge;
  }
  function Vr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function An(e) {
    var t = zn;
    return zn += 1, Da === null && (Da = []), e = od(Da, e, t), t = ae, (Ge === null ? t.memoizedState : Ge.next) === null && (t = t.alternate, C.H = t === null || t.memoizedState === null ? ef : uu), e;
  }
  function Xr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return An(e);
      if (e.$$typeof === B) return We(e);
    }
    throw Error(c(438, String(e)));
  }
  function Ws(e) {
    var t = null, l = ae.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = ae.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Vr(), ae.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = ft;
    return t.index++, l;
  }
  function el(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Qr(e) {
    var t = He();
    return Is(t, Ce, e);
  }
  function Is(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue, r = a.pending;
    if (r !== null) {
      if (n !== null) {
        var d = n.next;
        n.next = r.next, r.next = d;
      }
      t.baseQueue = n = r, a.pending = null;
    }
    if (r = e.baseState, n === null) e.memoizedState = r;
    else {
      t = n.next;
      var m = d = null, g = null, T = t, M = !1;
      do {
        var k = T.lane & -536870913;
        if (k !== T.lane ? (ce & k) === k : (Pt & k) === k) {
          var _ = T.revertLane;
          if (_ === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), k === Aa && (M = !0);
          else if ((Pt & _) === _) {
            T = T.next, _ === Aa && (M = !0);
            continue;
          } else
            k = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, g === null ? (m = g = k, d = r) : g = g.next = k, ae.lanes |= _, El |= _;
          k = T.action, ea && l(r, k), r = T.hasEagerState ? T.eagerState : l(r, k);
        } else
          _ = {
            lane: k,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, g === null ? (m = g = _, d = r) : g = g.next = _, ae.lanes |= k, El |= k;
        T = T.next;
      } while (T !== null && T !== t);
      if (g === null ? d = r : g.next = m, !pt(r, e.memoizedState) && (Ye = !0, M && (l = Ma, l !== null)))
        throw l;
      e.memoizedState = r, e.baseState = d, e.baseQueue = g, a.lastRenderedState = r;
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Ps(e) {
    var t = He(), l = t.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, n = l.pending, r = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var d = n = n.next;
      do
        r = e(r, d.action), d = d.next;
      while (d !== n);
      pt(r, t.memoizedState) || (Ye = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), l.lastRenderedState = r;
    }
    return [r, a];
  }
  function vd(e, t, l) {
    var a = ae, n = He(), r = me;
    if (r) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = t();
    var d = !pt(
      (Ce || n).memoizedState,
      l
    );
    if (d && (n.memoizedState = l, Ye = !0), n = n.queue, lu(Cd.bind(null, a, n, e), [
      e
    ]), n.getSnapshot !== t || d || Ge !== null && Ge.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ua(
        9,
        { destroy: void 0 },
        jd.bind(
          null,
          a,
          n,
          l,
          t
        ),
        null
      ), ze === null) throw Error(c(349));
      r || (Pt & 127) !== 0 || Sd(a, t, l);
    }
    return l;
  }
  function Sd(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = ae.updateQueue, t === null ? (t = Vr(), ae.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function jd(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Nd(t) && Ed(e);
  }
  function Cd(e, t, l) {
    return l(function() {
      Nd(t) && Ed(e);
    });
  }
  function Nd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !pt(e, l);
    } catch {
      return !0;
    }
  }
  function Ed(e) {
    var t = Ql(e, 2);
    t !== null && ct(t, e, 2);
  }
  function eu(e) {
    var t = at();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), ea) {
        dl(!0);
        try {
          l();
        } finally {
          dl(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: el,
      lastRenderedState: e
    }, t;
  }
  function Td(e, t, l, a) {
    return e.baseState = l, Is(
      e,
      Ce,
      typeof a == "function" ? a : el
    );
  }
  function Tm(e, t, l, a, n) {
    if (Kr(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var r = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          r.listeners.push(d);
        }
      };
      C.T !== null ? l(!0) : r.isTransition = !1, a(r), l = t.pending, l === null ? (r.next = t.pending = r, _d(t, r)) : (r.next = l.next, t.pending = l.next = r);
    }
  }
  function _d(e, t) {
    var l = t.action, a = t.payload, n = e.state;
    if (t.isTransition) {
      var r = C.T, d = {};
      C.T = d;
      try {
        var m = l(n, a), g = C.S;
        g !== null && g(d, m), zd(e, t, m);
      } catch (T) {
        tu(e, t, T);
      } finally {
        r !== null && d.types !== null && (r.types = d.types), C.T = r;
      }
    } else
      try {
        r = l(n, a), zd(e, t, r);
      } catch (T) {
        tu(e, t, T);
      }
  }
  function zd(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Ad(e, t, a);
      },
      function(a) {
        return tu(e, t, a);
      }
    ) : Ad(e, t, l);
  }
  function Ad(e, t, l) {
    t.status = "fulfilled", t.value = l, Md(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, _d(e, l)));
  }
  function tu(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, Md(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Md(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function wd(e, t) {
    return t;
  }
  function kd(e, t) {
    if (me) {
      var l = ze.formState;
      if (l !== null) {
        e: {
          var a = ae;
          if (me) {
            if (we) {
              t: {
                for (var n = we, r = kt; n.nodeType !== 8; ) {
                  if (!r) {
                    n = null;
                    break t;
                  }
                  if (n = Rt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                r = n.data, n = r === "F!" || r === "F" ? n : null;
              }
              if (n) {
                we = Rt(
                  n.nextSibling
                ), a = n.data === "F!";
                break e;
              }
            }
            pl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return l = at(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wd,
      lastRenderedState: t
    }, l.queue = a, l = Wd.bind(
      null,
      ae,
      a
    ), a.dispatch = l, a = eu(!1), r = su.bind(
      null,
      ae,
      !1,
      a.queue
    ), a = at(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = n, l = Tm.bind(
      null,
      ae,
      n,
      r,
      l
    ), n.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function Od(e) {
    var t = He();
    return Rd(t, Ce, e);
  }
  function Rd(e, t, l) {
    if (t = Is(
      e,
      t,
      wd
    )[0], e = Qr(el)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = An(t);
      } catch (d) {
        throw d === wa ? Dr : d;
      }
    else a = t;
    t = He();
    var n = t.queue, r = n.dispatch;
    return l !== t.memoizedState && (ae.flags |= 2048, Ua(
      9,
      { destroy: void 0 },
      _m.bind(null, n, l),
      null
    )), [a, r, e];
  }
  function _m(e, t) {
    e.action = t;
  }
  function Dd(e) {
    var t = He(), l = Ce;
    if (l !== null)
      return Rd(t, l, e);
    He(), t = t.memoizedState, l = He();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function Ua(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = ae.updateQueue, t === null && (t = Vr(), ae.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Ud() {
    return He().memoizedState;
  }
  function Zr(e, t, l, a) {
    var n = at();
    ae.flags |= e, n.memoizedState = Ua(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function $r(e, t, l, a) {
    var n = He();
    a = a === void 0 ? null : a;
    var r = n.memoizedState.inst;
    Ce !== null && a !== null && Zs(a, Ce.memoizedState.deps) ? n.memoizedState = Ua(t, r, l, a) : (ae.flags |= e, n.memoizedState = Ua(
      1 | t,
      r,
      l,
      a
    ));
  }
  function Bd(e, t) {
    Zr(8390656, 8, e, t);
  }
  function lu(e, t) {
    $r(2048, 8, e, t);
  }
  function zm(e) {
    ae.flags |= 4;
    var t = ae.updateQueue;
    if (t === null)
      t = Vr(), ae.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Hd(e) {
    var t = He().memoizedState;
    return zm({ ref: t, nextImpl: e }), function() {
      if ((xe & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Ld(e, t) {
    return $r(4, 2, e, t);
  }
  function qd(e, t) {
    return $r(4, 4, e, t);
  }
  function Gd(e, t) {
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
  function Yd(e, t, l) {
    l = l != null ? l.concat([e]) : null, $r(4, 4, Gd.bind(null, t, e), l);
  }
  function au() {
  }
  function Vd(e, t) {
    var l = He();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && Zs(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function Xd(e, t) {
    var l = He();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && Zs(t, a[1]))
      return a[0];
    if (a = e(), ea) {
      dl(!0);
      try {
        e();
      } finally {
        dl(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function nu(e, t, l) {
    return l === void 0 || (Pt & 1073741824) !== 0 && (ce & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Zf(), ae.lanes |= e, El |= e, l);
  }
  function Qd(e, t, l, a) {
    return pt(l, t) ? l : Oa.current !== null ? (e = nu(e, l, a), pt(e, t) || (Ye = !0), e) : (Pt & 42) === 0 || (Pt & 1073741824) !== 0 && (ce & 261930) === 0 ? (Ye = !0, e.memoizedState = l) : (e = Zf(), ae.lanes |= e, El |= e, t);
  }
  function Zd(e, t, l, a, n) {
    var r = U.p;
    U.p = r !== 0 && 8 > r ? r : 8;
    var d = C.T, m = {};
    C.T = m, su(e, !1, t, l);
    try {
      var g = n(), T = C.S;
      if (T !== null && T(m, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var M = Cm(
          g,
          a
        );
        Mn(
          e,
          t,
          M,
          jt(e)
        );
      } else
        Mn(
          e,
          t,
          a,
          jt(e)
        );
    } catch (k) {
      Mn(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: k },
        jt()
      );
    } finally {
      U.p = r, d !== null && m.types !== null && (d.types = m.types), C.T = d;
    }
  }
  function Am() {
  }
  function ru(e, t, l, a) {
    if (e.tag !== 5) throw Error(c(476));
    var n = $d(e).queue;
    Zd(
      e,
      n,
      t,
      I,
      l === null ? Am : function() {
        return Kd(e), l(a);
      }
    );
  }
  function $d(e) {
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
        lastRenderedReducer: el,
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
        lastRenderedReducer: el,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Kd(e) {
    var t = $d(e);
    t.next === null && (t = e.alternate.memoizedState), Mn(
      e,
      t.next.queue,
      {},
      jt()
    );
  }
  function iu() {
    return We($n);
  }
  function Jd() {
    return He().memoizedState;
  }
  function Fd() {
    return He().memoizedState;
  }
  function Mm(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = jt();
          e = bl(l);
          var a = vl(t, e, l);
          a !== null && (ct(a, t, l), En(a, t, l)), t = { cache: Ds() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function wm(e, t, l) {
    var a = jt();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kr(e) ? Id(t, l) : (l = Ns(e, t, l, a), l !== null && (ct(l, e, a), Pd(l, t, a)));
  }
  function Wd(e, t, l) {
    var a = jt();
    Mn(e, t, l, a);
  }
  function Mn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Kr(e)) Id(t, n);
    else {
      var r = e.alternate;
      if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null))
        try {
          var d = t.lastRenderedState, m = r(d, l);
          if (n.hasEagerState = !0, n.eagerState = m, pt(m, d))
            return zr(e, t, n, 0), ze === null && _r(), !1;
        } catch {
        } finally {
        }
      if (l = Ns(e, t, n, a), l !== null)
        return ct(l, e, a), Pd(l, t, a), !0;
    }
    return !1;
  }
  function su(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: Lu(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kr(e)) {
      if (t) throw Error(c(479));
    } else
      t = Ns(
        e,
        l,
        a,
        2
      ), t !== null && ct(t, e, 2);
  }
  function Kr(e) {
    var t = e.alternate;
    return e === ae || t !== null && t === ae;
  }
  function Id(e, t) {
    Ra = Gr = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Pd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, nc(e, l);
    }
  }
  var wn = {
    readContext: We,
    use: Xr,
    useCallback: Re,
    useContext: Re,
    useEffect: Re,
    useImperativeHandle: Re,
    useLayoutEffect: Re,
    useInsertionEffect: Re,
    useMemo: Re,
    useReducer: Re,
    useRef: Re,
    useState: Re,
    useDebugValue: Re,
    useDeferredValue: Re,
    useTransition: Re,
    useSyncExternalStore: Re,
    useId: Re,
    useHostTransitionStatus: Re,
    useFormState: Re,
    useActionState: Re,
    useOptimistic: Re,
    useMemoCache: Re,
    useCacheRefresh: Re
  };
  wn.useEffectEvent = Re;
  var ef = {
    readContext: We,
    use: Xr,
    useCallback: function(e, t) {
      return at().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: We,
    useEffect: Bd,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Zr(
        4194308,
        4,
        Gd.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Zr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Zr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = at();
      t = t === void 0 ? null : t;
      var a = e();
      if (ea) {
        dl(!0);
        try {
          e();
        } finally {
          dl(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = at();
      if (l !== void 0) {
        var n = l(t);
        if (ea) {
          dl(!0);
          try {
            l(t);
          } finally {
            dl(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, a.queue = e, e = e.dispatch = wm.bind(
        null,
        ae,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = at();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = eu(e);
      var t = e.queue, l = Wd.bind(null, ae, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: au,
    useDeferredValue: function(e, t) {
      var l = at();
      return nu(l, e, t);
    },
    useTransition: function() {
      var e = eu(!1);
      return e = Zd.bind(
        null,
        ae,
        e.queue,
        !0,
        !1
      ), at().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = ae, n = at();
      if (me) {
        if (l === void 0)
          throw Error(c(407));
        l = l();
      } else {
        if (l = t(), ze === null)
          throw Error(c(349));
        (ce & 127) !== 0 || Sd(a, t, l);
      }
      n.memoizedState = l;
      var r = { value: l, getSnapshot: t };
      return n.queue = r, Bd(Cd.bind(null, a, r, e), [
        e
      ]), a.flags |= 2048, Ua(
        9,
        { destroy: void 0 },
        jd.bind(
          null,
          a,
          r,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = at(), t = ze.identifierPrefix;
      if (me) {
        var l = qt, a = Lt;
        l = (a & ~(1 << 32 - gt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Yr++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Nm++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: iu,
    useFormState: kd,
    useActionState: kd,
    useOptimistic: function(e) {
      var t = at();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = su.bind(
        null,
        ae,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: Ws,
    useCacheRefresh: function() {
      return at().memoizedState = Mm.bind(
        null,
        ae
      );
    },
    useEffectEvent: function(e) {
      var t = at(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((xe & 2) !== 0)
          throw Error(c(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, uu = {
    readContext: We,
    use: Xr,
    useCallback: Vd,
    useContext: We,
    useEffect: lu,
    useImperativeHandle: Yd,
    useInsertionEffect: Ld,
    useLayoutEffect: qd,
    useMemo: Xd,
    useReducer: Qr,
    useRef: Ud,
    useState: function() {
      return Qr(el);
    },
    useDebugValue: au,
    useDeferredValue: function(e, t) {
      var l = He();
      return Qd(
        l,
        Ce.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Qr(el)[0], t = He().memoizedState;
      return [
        typeof e == "boolean" ? e : An(e),
        t
      ];
    },
    useSyncExternalStore: vd,
    useId: Jd,
    useHostTransitionStatus: iu,
    useFormState: Od,
    useActionState: Od,
    useOptimistic: function(e, t) {
      var l = He();
      return Td(l, Ce, e, t);
    },
    useMemoCache: Ws,
    useCacheRefresh: Fd
  };
  uu.useEffectEvent = Hd;
  var tf = {
    readContext: We,
    use: Xr,
    useCallback: Vd,
    useContext: We,
    useEffect: lu,
    useImperativeHandle: Yd,
    useInsertionEffect: Ld,
    useLayoutEffect: qd,
    useMemo: Xd,
    useReducer: Ps,
    useRef: Ud,
    useState: function() {
      return Ps(el);
    },
    useDebugValue: au,
    useDeferredValue: function(e, t) {
      var l = He();
      return Ce === null ? nu(l, e, t) : Qd(
        l,
        Ce.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ps(el)[0], t = He().memoizedState;
      return [
        typeof e == "boolean" ? e : An(e),
        t
      ];
    },
    useSyncExternalStore: vd,
    useId: Jd,
    useHostTransitionStatus: iu,
    useFormState: Dd,
    useActionState: Dd,
    useOptimistic: function(e, t) {
      var l = He();
      return Ce !== null ? Td(l, Ce, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Ws,
    useCacheRefresh: Fd
  };
  tf.useEffectEvent = Hd;
  function ou(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : j({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var cu = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = jt(), n = bl(a);
      n.payload = t, l != null && (n.callback = l), t = vl(e, n, a), t !== null && (ct(t, e, a), En(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = jt(), n = bl(a);
      n.tag = 1, n.payload = t, l != null && (n.callback = l), t = vl(e, n, a), t !== null && (ct(t, e, a), En(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = jt(), a = bl(l);
      a.tag = 2, t != null && (a.callback = t), t = vl(e, a, l), t !== null && (ct(t, e, l), En(t, e, l));
    }
  };
  function lf(e, t, l, a, n, r, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, r, d) : t.prototype && t.prototype.isPureReactComponent ? !xn(l, a) || !xn(n, r) : !0;
  }
  function af(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && cu.enqueueReplaceState(t, t.state, null);
  }
  function ta(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = j({}, l));
      for (var n in e)
        l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function nf(e) {
    Tr(e);
  }
  function rf(e) {
    console.error(e);
  }
  function sf(e) {
    Tr(e);
  }
  function Jr(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function uf(e, t, l) {
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
  function du(e, t, l) {
    return l = bl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Jr(e, t);
    }, l;
  }
  function of(e) {
    return e = bl(e), e.tag = 3, e;
  }
  function cf(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var r = a.value;
      e.payload = function() {
        return n(r);
      }, e.callback = function() {
        uf(t, l, a);
      };
    }
    var d = l.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      uf(t, l, a), typeof n != "function" && (Tl === null ? Tl = /* @__PURE__ */ new Set([this]) : Tl.add(this));
      var m = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function km(e, t, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && za(
        t,
        l,
        n,
        !0
      ), l = yt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Ot === null ? si() : l.alternate === null && De === 0 && (De = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Ur ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Uu(e, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Ur ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Uu(e, a, n)), !1;
        }
        throw Error(c(435, l.tag));
      }
      return Uu(e, a, n), si(), !1;
    }
    if (me)
      return t = yt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Ms && (e = Error(c(422), { cause: a }), vn(At(e, l)))) : (a !== Ms && (t = Error(c(423), {
        cause: a
      }), vn(
        At(t, l)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = At(a, l), n = du(
        e.stateNode,
        a,
        n
      ), Gs(e, n), De !== 4 && (De = 2)), !1;
    var r = Error(c(520), { cause: a });
    if (r = At(r, l), Ln === null ? Ln = [r] : Ln.push(r), De !== 4 && (De = 2), t === null) return !0;
    a = At(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = n & -n, l.lanes |= e, e = du(l.stateNode, a, e), Gs(l, e), !1;
        case 1:
          if (t = l.type, r = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (Tl === null || !Tl.has(r))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = of(n), cf(
              n,
              e,
              l,
              a
            ), Gs(l, n), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var fu = Error(c(461)), Ye = !1;
  function Ie(e, t, l, a) {
    t.child = e === null ? md(t, null, l, a) : Pl(
      t,
      e.child,
      l,
      a
    );
  }
  function df(e, t, l, a, n) {
    l = l.render;
    var r = t.ref;
    if ("ref" in a) {
      var d = {};
      for (var m in a)
        m !== "ref" && (d[m] = a[m]);
    } else d = a;
    return Jl(t), a = $s(
      e,
      t,
      l,
      d,
      r,
      n
    ), m = Ks(), e !== null && !Ye ? (Js(e, t, n), tl(e, t, n)) : (me && m && zs(t), t.flags |= 1, Ie(e, t, a, n), t.child);
  }
  function ff(e, t, l, a, n) {
    if (e === null) {
      var r = l.type;
      return typeof r == "function" && !Es(r) && r.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = r, mf(
        e,
        t,
        r,
        a,
        n
      )) : (e = Mr(
        l.type,
        null,
        a,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (r = e.child, !vu(e, n)) {
      var d = r.memoizedProps;
      if (l = l.compare, l = l !== null ? l : xn, l(d, a) && e.ref === t.ref)
        return tl(e, t, n);
    }
    return t.flags |= 1, e = Jt(r, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function mf(e, t, l, a, n) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (xn(r, a) && e.ref === t.ref)
        if (Ye = !1, t.pendingProps = a = r, vu(e, n))
          (e.flags & 131072) !== 0 && (Ye = !0);
        else
          return t.lanes = e.lanes, tl(e, t, n);
    }
    return mu(
      e,
      t,
      l,
      a,
      n
    );
  }
  function hf(e, t, l, a) {
    var n = a.children, r = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | l : l, e !== null) {
          for (a = t.child = e.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~r;
        } else a = 0, t.child = null;
        return gf(
          e,
          t,
          r,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Rr(
          t,
          r !== null ? r.cachePool : null
        ), r !== null ? pd(t, r) : Vs(), xd(t);
      else
        return a = t.lanes = 536870912, gf(
          e,
          t,
          r !== null ? r.baseLanes | l : l,
          l,
          a
        );
    } else
      r !== null ? (Rr(t, r.cachePool), pd(t, r), jl(), t.memoizedState = null) : (e !== null && Rr(t, null), Vs(), jl());
    return Ie(e, t, n, l), t.child;
  }
  function kn(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function gf(e, t, l, a, n) {
    var r = Bs();
    return r = r === null ? null : { parent: qe._currentValue, pool: r }, t.memoizedState = {
      baseLanes: l,
      cachePool: r
    }, e !== null && Rr(t, null), Vs(), xd(t), e !== null && za(e, t, a, !0), t.childLanes = n, null;
  }
  function Fr(e, t) {
    return t = Ir(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function pf(e, t, l) {
    return Pl(t, e.child, null, l), e = Fr(t, t.pendingProps), e.flags |= 2, bt(t), t.memoizedState = null, e;
  }
  function Om(e, t, l) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (me) {
        if (a.mode === "hidden")
          return e = Fr(t, a), t.lanes = 536870912, kn(null, e);
        if (Qs(t), (e = we) ? (e = z0(
          e,
          kt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: hl !== null ? { id: Lt, overflow: qt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Ic(e), l.return = t, t.child = l, Fe = t, we = null)) : e = null, e === null) throw pl(t);
        return t.lanes = 536870912, null;
      }
      return Fr(t, a);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var d = r.dehydrated;
      if (Qs(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = pf(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Ye || za(e, t, l, !1), n = (l & e.childLanes) !== 0, Ye || n) {
        if (a = ze, a !== null && (d = rc(a, l), d !== 0 && d !== r.retryLane))
          throw r.retryLane = d, Ql(e, d), ct(a, e, d), fu;
        si(), t = pf(
          e,
          t,
          l
        );
      } else
        e = r.treeContext, we = Rt(d.nextSibling), Fe = t, me = !0, gl = null, kt = !1, e !== null && td(t, e), t = Fr(t, a), t.flags |= 4096;
      return t;
    }
    return e = Jt(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Wr(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(c(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function mu(e, t, l, a, n) {
    return Jl(t), l = $s(
      e,
      t,
      l,
      a,
      void 0,
      n
    ), a = Ks(), e !== null && !Ye ? (Js(e, t, n), tl(e, t, n)) : (me && a && zs(t), t.flags |= 1, Ie(e, t, l, n), t.child);
  }
  function xf(e, t, l, a, n, r) {
    return Jl(t), t.updateQueue = null, l = bd(
      t,
      a,
      l,
      n
    ), yd(e), a = Ks(), e !== null && !Ye ? (Js(e, t, r), tl(e, t, r)) : (me && a && zs(t), t.flags |= 1, Ie(e, t, l, r), t.child);
  }
  function yf(e, t, l, a, n) {
    if (Jl(t), t.stateNode === null) {
      var r = Na, d = l.contextType;
      typeof d == "object" && d !== null && (r = We(d)), r = new l(a, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = cu, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = a, r.state = t.memoizedState, r.refs = {}, Ls(t), d = l.contextType, r.context = typeof d == "object" && d !== null ? We(d) : Na, r.state = t.memoizedState, d = l.getDerivedStateFromProps, typeof d == "function" && (ou(
        t,
        l,
        d,
        a
      ), r.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (d = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), d !== r.state && cu.enqueueReplaceState(r, r.state, null), _n(t, a, r, n), Tn(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      r = t.stateNode;
      var m = t.memoizedProps, g = ta(l, m);
      r.props = g;
      var T = r.context, M = l.contextType;
      d = Na, typeof M == "object" && M !== null && (d = We(M));
      var k = l.getDerivedStateFromProps;
      M = typeof k == "function" || typeof r.getSnapshotBeforeUpdate == "function", m = t.pendingProps !== m, M || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m || T !== d) && af(
        t,
        r,
        a,
        d
      ), yl = !1;
      var _ = t.memoizedState;
      r.state = _, _n(t, a, r, n), Tn(), T = t.memoizedState, m || _ !== T || yl ? (typeof k == "function" && (ou(
        t,
        l,
        k,
        a
      ), T = t.memoizedState), (g = yl || lf(
        t,
        l,
        g,
        a,
        _,
        T,
        d
      )) ? (M || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = T), r.props = a, r.state = T, r.context = d, a = g) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      r = t.stateNode, qs(e, t), d = t.memoizedProps, M = ta(l, d), r.props = M, k = t.pendingProps, _ = r.context, T = l.contextType, g = Na, typeof T == "object" && T !== null && (g = We(T)), m = l.getDerivedStateFromProps, (T = typeof m == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (d !== k || _ !== g) && af(
        t,
        r,
        a,
        g
      ), yl = !1, _ = t.memoizedState, r.state = _, _n(t, a, r, n), Tn();
      var z = t.memoizedState;
      d !== k || _ !== z || yl || e !== null && e.dependencies !== null && kr(e.dependencies) ? (typeof m == "function" && (ou(
        t,
        l,
        m,
        a
      ), z = t.memoizedState), (M = yl || lf(
        t,
        l,
        M,
        a,
        _,
        z,
        g
      ) || e !== null && e.dependencies !== null && kr(e.dependencies)) ? (T || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(a, z, g), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        a,
        z,
        g
      )), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = z), r.props = a, r.state = z, r.context = g, a = M) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return r = a, Wr(e, t), a = (t.flags & 128) !== 0, r || a ? (r = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : r.render(), t.flags |= 1, e !== null && a ? (t.child = Pl(
      t,
      e.child,
      null,
      n
    ), t.child = Pl(
      t,
      null,
      l,
      n
    )) : Ie(e, t, l, n), t.memoizedState = r.state, e = t.child) : e = tl(
      e,
      t,
      n
    ), e;
  }
  function bf(e, t, l, a) {
    return $l(), t.flags |= 256, Ie(e, t, l, a), t.child;
  }
  var hu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function gu(e) {
    return { baseLanes: e, cachePool: sd() };
  }
  function pu(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= St), e;
  }
  function vf(e, t, l) {
    var a = t.pendingProps, n = !1, r = (t.flags & 128) !== 0, d;
    if ((d = r) || (d = e !== null && e.memoizedState === null ? !1 : (Be.current & 2) !== 0), d && (n = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (me) {
        if (n ? Sl(t) : jl(), (e = we) ? (e = z0(
          e,
          kt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: hl !== null ? { id: Lt, overflow: qt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Ic(e), l.return = t, t.child = l, Fe = t, we = null)) : e = null, e === null) throw pl(t);
        return Iu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var m = a.children;
      return a = a.fallback, n ? (jl(), n = t.mode, m = Ir(
        { mode: "hidden", children: m },
        n
      ), a = Zl(
        a,
        n,
        l,
        null
      ), m.return = t, a.return = t, m.sibling = a, t.child = m, a = t.child, a.memoizedState = gu(l), a.childLanes = pu(
        e,
        d,
        l
      ), t.memoizedState = hu, kn(null, a)) : (Sl(t), xu(t, m));
    }
    var g = e.memoizedState;
    if (g !== null && (m = g.dehydrated, m !== null)) {
      if (r)
        t.flags & 256 ? (Sl(t), t.flags &= -257, t = yu(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (jl(), t.child = e.child, t.flags |= 128, t = null) : (jl(), m = a.fallback, n = t.mode, a = Ir(
          { mode: "visible", children: a.children },
          n
        ), m = Zl(
          m,
          n,
          l,
          null
        ), m.flags |= 2, a.return = t, m.return = t, a.sibling = m, t.child = a, Pl(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = gu(l), a.childLanes = pu(
          e,
          d,
          l
        ), t.memoizedState = hu, t = kn(null, a));
      else if (Sl(t), Iu(m)) {
        if (d = m.nextSibling && m.nextSibling.dataset, d) var T = d.dgst;
        d = T, a = Error(c(419)), a.stack = "", a.digest = d, vn({ value: a, source: null, stack: null }), t = yu(
          e,
          t,
          l
        );
      } else if (Ye || za(e, t, l, !1), d = (l & e.childLanes) !== 0, Ye || d) {
        if (d = ze, d !== null && (a = rc(d, l), a !== 0 && a !== g.retryLane))
          throw g.retryLane = a, Ql(e, a), ct(d, e, a), fu;
        Wu(m) || si(), t = yu(
          e,
          t,
          l
        );
      } else
        Wu(m) ? (t.flags |= 192, t.child = e.child, t = null) : (e = g.treeContext, we = Rt(
          m.nextSibling
        ), Fe = t, me = !0, gl = null, kt = !1, e !== null && td(t, e), t = xu(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (jl(), m = a.fallback, n = t.mode, g = e.child, T = g.sibling, a = Jt(g, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = g.subtreeFlags & 65011712, T !== null ? m = Jt(
      T,
      m
    ) : (m = Zl(
      m,
      n,
      l,
      null
    ), m.flags |= 2), m.return = t, a.return = t, a.sibling = m, t.child = a, kn(null, a), a = t.child, m = e.child.memoizedState, m === null ? m = gu(l) : (n = m.cachePool, n !== null ? (g = qe._currentValue, n = n.parent !== g ? { parent: g, pool: g } : n) : n = sd(), m = {
      baseLanes: m.baseLanes | l,
      cachePool: n
    }), a.memoizedState = m, a.childLanes = pu(
      e,
      d,
      l
    ), t.memoizedState = hu, kn(e.child, a)) : (Sl(t), l = e.child, e = l.sibling, l = Jt(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function xu(e, t) {
    return t = Ir(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ir(e, t) {
    return e = xt(22, e, null, t), e.lanes = 0, e;
  }
  function yu(e, t, l) {
    return Pl(t, e.child, null, l), e = xu(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Sf(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Os(e.return, t, l);
  }
  function bu(e, t, l, a, n, r) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: r
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = a, d.tail = l, d.tailMode = n, d.treeForkCount = r);
  }
  function jf(e, t, l) {
    var a = t.pendingProps, n = a.revealOrder, r = a.tail;
    a = a.children;
    var d = Be.current, m = (d & 2) !== 0;
    if (m ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, G(Be, d), Ie(e, t, a, l), a = me ? bn : 0, !m && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Sf(e, l, t);
        else if (e.tag === 19)
          Sf(e, l, t);
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
          e = l.alternate, e !== null && qr(e) === null && (n = l), l = l.sibling;
        l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), bu(
          t,
          !1,
          n,
          l,
          r,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (e = n.alternate, e !== null && qr(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = l, l = n, n = e;
        }
        bu(
          t,
          !0,
          l,
          null,
          r,
          a
        );
        break;
      case "together":
        bu(
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
  function tl(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), El |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (za(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, l = Jt(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Jt(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function vu(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && kr(e)));
  }
  function Rm(e, t, l) {
    switch (t.tag) {
      case 3:
        lt(t, t.stateNode.containerInfo), xl(t, qe, e.memoizedState.cache), $l();
        break;
      case 27:
      case 5:
        an(t);
        break;
      case 4:
        lt(t, t.stateNode.containerInfo);
        break;
      case 10:
        xl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Qs(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Sl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? vf(e, t, l) : (Sl(t), e = tl(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        Sl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (za(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), n) {
          if (a)
            return jf(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), G(Be, Be.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, hf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        xl(t, qe, e.memoizedState.cache);
    }
    return tl(e, t, l);
  }
  function Cf(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ye = !0;
      else {
        if (!vu(e, l) && (t.flags & 128) === 0)
          return Ye = !1, Rm(
            e,
            t,
            l
          );
        Ye = (e.flags & 131072) !== 0;
      }
    else
      Ye = !1, me && (t.flags & 1048576) !== 0 && ed(t, bn, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = Wl(t.elementType), t.type = e, typeof e == "function")
            Es(e) ? (a = ta(e, a), t.tag = 1, t = yf(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = mu(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === re) {
                t.tag = 11, t = df(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (n === W) {
                t.tag = 14, t = ff(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = fe(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return mu(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return a = t.type, n = ta(
          a,
          t.pendingProps
        ), yf(
          e,
          t,
          a,
          n,
          l
        );
      case 3:
        e: {
          if (lt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          a = t.pendingProps;
          var r = t.memoizedState;
          n = r.element, qs(e, t), _n(t, a, null, l);
          var d = t.memoizedState;
          if (a = d.cache, xl(t, qe, a), a !== r.cache && Rs(
            t,
            [qe],
            l,
            !0
          ), Tn(), a = d.element, r.isDehydrated)
            if (r = {
              element: a,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
              t = bf(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== n) {
              n = At(
                Error(c(424)),
                t
              ), vn(n), t = bf(
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
              for (we = Rt(e.firstChild), Fe = t, me = !0, gl = null, kt = !0, l = md(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if ($l(), a === n) {
              t = tl(
                e,
                t,
                l
              );
              break e;
            }
            Ie(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Wr(e, t), e === null ? (l = R0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : me || (l = t.type, e = t.pendingProps, a = hi(
          se.current
        ).createElement(l), a[Je] = t, a[nt] = e, Pe(a, l, e), Ze(a), t.stateNode = a) : t.memoizedState = R0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return an(t), e === null && me && (a = t.stateNode = w0(
          t.type,
          t.pendingProps,
          se.current
        ), Fe = t, kt = !0, n = we, Ml(t.type) ? (Pu = n, we = Rt(a.firstChild)) : we = n), Ie(
          e,
          t,
          t.pendingProps.children,
          l
        ), Wr(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && me && ((n = a = we) && (a = c4(
          a,
          t.type,
          t.pendingProps,
          kt
        ), a !== null ? (t.stateNode = a, Fe = t, we = Rt(a.firstChild), kt = !1, n = !0) : n = !1), n || pl(t)), an(t), n = t.type, r = t.pendingProps, d = e !== null ? e.memoizedProps : null, a = r.children, Ku(n, r) ? a = null : d !== null && Ku(n, d) && (t.flags |= 32), t.memoizedState !== null && (n = $s(
          e,
          t,
          Em,
          null,
          null,
          l
        ), $n._currentValue = n), Wr(e, t), Ie(e, t, a, l), t.child;
      case 6:
        return e === null && me && ((e = l = we) && (l = d4(
          l,
          t.pendingProps,
          kt
        ), l !== null ? (t.stateNode = l, Fe = t, we = null, e = !0) : e = !1), e || pl(t)), null;
      case 13:
        return vf(e, t, l);
      case 4:
        return lt(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = Pl(
          t,
          null,
          a,
          l
        ) : Ie(e, t, a, l), t.child;
      case 11:
        return df(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Ie(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Ie(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Ie(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return a = t.pendingProps, xl(t, t.type, a.value), Ie(e, t, a.children, l), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Jl(t), n = We(n), a = a(n), t.flags |= 1, Ie(e, t, a, l), t.child;
      case 14:
        return ff(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return mf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return jf(e, t, l);
      case 31:
        return Om(e, t, l);
      case 22:
        return hf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Jl(t), a = We(qe), e === null ? (n = Bs(), n === null && (n = ze, r = Ds(), n.pooledCache = r, r.refCount++, r !== null && (n.pooledCacheLanes |= l), n = r), t.memoizedState = { parent: a, cache: n }, Ls(t), xl(t, qe, n)) : ((e.lanes & l) !== 0 && (qs(e, t), _n(t, null, null, l), Tn()), n = e.memoizedState, r = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), xl(t, qe, a)) : (a = r.cache, xl(t, qe, a), a !== n.cache && Rs(
          t,
          [qe],
          l,
          !0
        ))), Ie(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function ll(e) {
    e.flags |= 4;
  }
  function Su(e, t, l, a, n) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ff()) e.flags |= 8192;
        else
          throw Il = Ur, Hs;
    } else e.flags &= -16777217;
  }
  function Nf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !L0(t))
      if (Ff()) e.flags |= 8192;
      else
        throw Il = Ur, Hs;
  }
  function Pr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? lc() : 536870912, e.lanes |= t, qa |= t);
  }
  function On(e, t) {
    if (!me)
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
  function ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function Dm(e, t, l) {
    var a = t.pendingProps;
    switch (As(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ke(t), null;
      case 1:
        return ke(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), It(qe), Ue(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (_a(t) ? ll(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ws())), ke(t), null;
      case 26:
        var n = t.type, r = t.memoizedState;
        return e === null ? (ll(t), r !== null ? (ke(t), Nf(t, r)) : (ke(t), Su(
          t,
          n,
          null,
          a,
          l
        ))) : r ? r !== e.memoizedState ? (ll(t), ke(t), Nf(t, r)) : (ke(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && ll(t), ke(t), Su(
          t,
          n,
          e,
          a,
          l
        )), null;
      case 27:
        if (cr(t), l = se.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && ll(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return ke(t), null;
          }
          e = Q.current, _a(t) ? ld(t) : (e = w0(n, a, l), t.stateNode = e, ll(t));
        }
        return ke(t), null;
      case 5:
        if (cr(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && ll(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return ke(t), null;
          }
          if (r = Q.current, _a(t))
            ld(t);
          else {
            var d = hi(
              se.current
            );
            switch (r) {
              case 1:
                r = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                r = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    r = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    r = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    r = d.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof a.is == "string" ? d.createElement("select", {
                      is: a.is
                    }) : d.createElement("select"), a.multiple ? r.multiple = !0 : a.size && (r.size = a.size);
                    break;
                  default:
                    r = typeof a.is == "string" ? d.createElement(n, { is: a.is }) : d.createElement(n);
                }
            }
            r[Je] = t, r[nt] = a;
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                r.appendChild(d.stateNode);
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
            t.stateNode = r;
            e: switch (Pe(r, n, a), n) {
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
            a && ll(t);
          }
        }
        return ke(t), Su(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && ll(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = se.current, _a(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, n = Fe, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            e[Je] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || v0(e.nodeValue, l)), e || pl(t, !0);
          } else
            e = hi(e).createTextNode(
              a
            ), e[Je] = t, t.stateNode = e;
        }
        return ke(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = _a(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Je] = t;
            } else
              $l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ke(t), e = !1;
          } else
            l = ws(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (bt(t), t) : (bt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return ke(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = _a(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
              n[Je] = t;
            } else
              $l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ke(t), n = !1;
          } else
            n = ws(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (bt(t), t) : (bt(t), null);
        }
        return bt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), r = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (r = a.memoizedState.cachePool.pool), r !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Pr(t, t.updateQueue), ke(t), null);
      case 4:
        return Ue(), e === null && Vu(t.stateNode.containerInfo), ke(t), null;
      case 10:
        return It(t.type), ke(t), null;
      case 19:
        if (R(Be), a = t.memoizedState, a === null) return ke(t), null;
        if (n = (t.flags & 128) !== 0, r = a.rendering, r === null)
          if (n) On(a, !1);
          else {
            if (De !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (r = qr(e), r !== null) {
                  for (t.flags |= 128, On(a, !1), e = r.updateQueue, t.updateQueue = e, Pr(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    Wc(l, e), l = l.sibling;
                  return G(
                    Be,
                    Be.current & 1 | 2
                  ), me && Ft(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && mt() > ni && (t.flags |= 128, n = !0, On(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = qr(r), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Pr(t, e), On(a, !0), a.tail === null && a.tailMode === "hidden" && !r.alternate && !me)
                return ke(t), null;
            } else
              2 * mt() - a.renderingStartTime > ni && l !== 536870912 && (t.flags |= 128, n = !0, On(a, !1), t.lanes = 4194304);
          a.isBackwards ? (r.sibling = t.child, t.child = r) : (e = a.last, e !== null ? e.sibling = r : t.child = r, a.last = r);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = mt(), e.sibling = null, l = Be.current, G(
          Be,
          n ? l & 1 | 2 : l & 1
        ), me && Ft(t, a.treeForkCount), e) : (ke(t), null);
      case 22:
      case 23:
        return bt(t), Xs(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ke(t), l = t.updateQueue, l !== null && Pr(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && R(Fl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), It(qe), ke(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Um(e, t) {
    switch (As(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return It(qe), Ue(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return cr(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (bt(t), t.alternate === null)
            throw Error(c(340));
          $l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (bt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          $l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return R(Be), null;
      case 4:
        return Ue(), null;
      case 10:
        return It(t.type), null;
      case 22:
      case 23:
        return bt(t), Xs(), e !== null && R(Fl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return It(qe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ef(e, t) {
    switch (As(t), t.tag) {
      case 3:
        It(qe), Ue();
        break;
      case 26:
      case 27:
      case 5:
        cr(t);
        break;
      case 4:
        Ue();
        break;
      case 31:
        t.memoizedState !== null && bt(t);
        break;
      case 13:
        bt(t);
        break;
      case 19:
        R(Be);
        break;
      case 10:
        It(t.type);
        break;
      case 22:
      case 23:
        bt(t), Xs(), e !== null && R(Fl);
        break;
      case 24:
        It(qe);
    }
  }
  function Rn(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var r = l.create, d = l.inst;
            a = r(), d.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (m) {
      Se(t, t.return, m);
    }
  }
  function Cl(e, t, l) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var r = n.next;
        a = r;
        do {
          if ((a.tag & e) === e) {
            var d = a.inst, m = d.destroy;
            if (m !== void 0) {
              d.destroy = void 0, n = t;
              var g = l, T = m;
              try {
                T();
              } catch (M) {
                Se(
                  n,
                  g,
                  M
                );
              }
            }
          }
          a = a.next;
        } while (a !== r);
      }
    } catch (M) {
      Se(t, t.return, M);
    }
  }
  function Tf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        gd(t, l);
      } catch (a) {
        Se(e, e.return, a);
      }
    }
  }
  function _f(e, t, l) {
    l.props = ta(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Se(e, t, a);
    }
  }
  function Dn(e, t) {
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
      Se(e, t, n);
    }
  }
  function Gt(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Se(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Se(e, t, n);
        }
      else l.current = null;
  }
  function zf(e) {
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
      Se(e, e.return, n);
    }
  }
  function ju(e, t, l) {
    try {
      var a = e.stateNode;
      n4(a, e.type, l, t), a[nt] = t;
    } catch (n) {
      Se(e, e.return, n);
    }
  }
  function Af(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ml(e.type) || e.tag === 4;
  }
  function Cu(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Af(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ml(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Nu(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = $t));
    else if (a !== 4 && (a === 27 && Ml(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Nu(e, t, l), e = e.sibling; e !== null; )
        Nu(e, t, l), e = e.sibling;
  }
  function ei(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && Ml(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (ei(e, t, l), e = e.sibling; e !== null; )
        ei(e, t, l), e = e.sibling;
  }
  function Mf(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      Pe(t, a, l), t[Je] = e, t[nt] = l;
    } catch (r) {
      Se(e, e.return, r);
    }
  }
  var al = !1, Ve = !1, Eu = !1, wf = typeof WeakSet == "function" ? WeakSet : Set, $e = null;
  function Bm(e, t) {
    if (e = e.containerInfo, Zu = Si, e = Yc(e), ys(e)) {
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
            var n = a.anchorOffset, r = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, r.nodeType;
            } catch {
              l = null;
              break e;
            }
            var d = 0, m = -1, g = -1, T = 0, M = 0, k = e, _ = null;
            t: for (; ; ) {
              for (var z; k !== l || n !== 0 && k.nodeType !== 3 || (m = d + n), k !== r || a !== 0 && k.nodeType !== 3 || (g = d + a), k.nodeType === 3 && (d += k.nodeValue.length), (z = k.firstChild) !== null; )
                _ = k, k = z;
              for (; ; ) {
                if (k === e) break t;
                if (_ === l && ++T === n && (m = d), _ === r && ++M === a && (g = d), (z = k.nextSibling) !== null) break;
                k = _, _ = k.parentNode;
              }
              k = z;
            }
            l = m === -1 || g === -1 ? null : { start: m, end: g };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for ($u = { focusedElem: e, selectionRange: l }, Si = !1, $e = t; $e !== null; )
      if (t = $e, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, $e = e;
      else
        for (; $e !== null; ) {
          switch (t = $e, r = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  n = e[l], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && r !== null) {
                e = void 0, l = t, n = r.memoizedProps, r = r.memoizedState, a = l.stateNode;
                try {
                  var X = ta(
                    l.type,
                    n
                  );
                  e = a.getSnapshotBeforeUpdate(
                    X,
                    r
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (P) {
                  Se(
                    l,
                    l.return,
                    P
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  Fu(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Fu(e);
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
            e.return = t.return, $e = e;
            break;
          }
          $e = t.return;
        }
  }
  function kf(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        rl(e, l), a & 4 && Rn(5, l);
        break;
      case 1:
        if (rl(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              Se(l, l.return, d);
            }
          else {
            var n = ta(
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
            } catch (d) {
              Se(
                l,
                l.return,
                d
              );
            }
          }
        a & 64 && Tf(l), a & 512 && Dn(l, l.return);
        break;
      case 3:
        if (rl(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
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
            gd(e, t);
          } catch (d) {
            Se(l, l.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Mf(l);
      case 26:
      case 5:
        rl(e, l), t === null && a & 4 && zf(l), a & 512 && Dn(l, l.return);
        break;
      case 12:
        rl(e, l);
        break;
      case 31:
        rl(e, l), a & 4 && Df(e, l);
        break;
      case 13:
        rl(e, l), a & 4 && Uf(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = Zm.bind(
          null,
          l
        ), f4(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || al, !a) {
          t = t !== null && t.memoizedState !== null || Ve, n = al;
          var r = Ve;
          al = a, (Ve = t) && !r ? il(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : rl(e, l), al = n, Ve = r;
        }
        break;
      case 30:
        break;
      default:
        rl(e, l);
    }
  }
  function Of(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Of(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ts(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Oe = null, it = !1;
  function nl(e, t, l) {
    for (l = l.child; l !== null; )
      Rf(e, t, l), l = l.sibling;
  }
  function Rf(e, t, l) {
    if (ht && typeof ht.onCommitFiberUnmount == "function")
      try {
        ht.onCommitFiberUnmount(nn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Ve || Gt(l, t), nl(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Ve || Gt(l, t);
        var a = Oe, n = it;
        Ml(l.type) && (Oe = l.stateNode, it = !1), nl(
          e,
          t,
          l
        ), Xn(l.stateNode), Oe = a, it = n;
        break;
      case 5:
        Ve || Gt(l, t);
      case 6:
        if (a = Oe, n = it, Oe = null, nl(
          e,
          t,
          l
        ), Oe = a, it = n, Oe !== null)
          if (it)
            try {
              (Oe.nodeType === 9 ? Oe.body : Oe.nodeName === "HTML" ? Oe.ownerDocument.body : Oe).removeChild(l.stateNode);
            } catch (r) {
              Se(
                l,
                t,
                r
              );
            }
          else
            try {
              Oe.removeChild(l.stateNode);
            } catch (r) {
              Se(
                l,
                t,
                r
              );
            }
        break;
      case 18:
        Oe !== null && (it ? (e = Oe, T0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Ka(e)) : T0(Oe, l.stateNode));
        break;
      case 4:
        a = Oe, n = it, Oe = l.stateNode.containerInfo, it = !0, nl(
          e,
          t,
          l
        ), Oe = a, it = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Cl(2, l, t), Ve || Cl(4, l, t), nl(
          e,
          t,
          l
        );
        break;
      case 1:
        Ve || (Gt(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && _f(
          l,
          t,
          a
        )), nl(
          e,
          t,
          l
        );
        break;
      case 21:
        nl(
          e,
          t,
          l
        );
        break;
      case 22:
        Ve = (a = Ve) || l.memoizedState !== null, nl(
          e,
          t,
          l
        ), Ve = a;
        break;
      default:
        nl(
          e,
          t,
          l
        );
    }
  }
  function Df(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ka(e);
      } catch (l) {
        Se(t, t.return, l);
      }
    }
  }
  function Uf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ka(e);
      } catch (l) {
        Se(t, t.return, l);
      }
  }
  function Hm(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new wf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new wf()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function ti(e, t) {
    var l = Hm(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = $m.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function st(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a], r = e, d = t, m = d;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Ml(m.type)) {
                Oe = m.stateNode, it = !1;
                break e;
              }
              break;
            case 5:
              Oe = m.stateNode, it = !1;
              break e;
            case 3:
            case 4:
              Oe = m.stateNode.containerInfo, it = !0;
              break e;
          }
          m = m.return;
        }
        if (Oe === null) throw Error(c(160));
        Rf(r, d, n), Oe = null, it = !1, r = n.alternate, r !== null && (r.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Bf(t, e), t = t.sibling;
  }
  var Bt = null;
  function Bf(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        st(t, e), ut(e), a & 4 && (Cl(3, e, e.return), Rn(3, e), Cl(5, e, e.return));
        break;
      case 1:
        st(t, e), ut(e), a & 512 && (Ve || l === null || Gt(l, l.return)), a & 64 && al && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var n = Bt;
        if (st(t, e), ut(e), a & 512 && (Ve || l === null || Gt(l, l.return)), a & 4) {
          var r = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      r = n.getElementsByTagName("title")[0], (!r || r[un] || r[Je] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = n.createElement(a), n.head.insertBefore(
                        r,
                        n.querySelector("head > title")
                      )), Pe(r, a, l), r[Je] = e, Ze(r), a = r;
                      break e;
                    case "link":
                      var d = B0(
                        "link",
                        "href",
                        n
                      ).get(a + (l.href || ""));
                      if (d) {
                        for (var m = 0; m < d.length; m++)
                          if (r = d[m], r.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && r.getAttribute("rel") === (l.rel == null ? null : l.rel) && r.getAttribute("title") === (l.title == null ? null : l.title) && r.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            d.splice(m, 1);
                            break t;
                          }
                      }
                      r = n.createElement(a), Pe(r, a, l), n.head.appendChild(r);
                      break;
                    case "meta":
                      if (d = B0(
                        "meta",
                        "content",
                        n
                      ).get(a + (l.content || ""))) {
                        for (m = 0; m < d.length; m++)
                          if (r = d[m], r.getAttribute("content") === (l.content == null ? null : "" + l.content) && r.getAttribute("name") === (l.name == null ? null : l.name) && r.getAttribute("property") === (l.property == null ? null : l.property) && r.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && r.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            d.splice(m, 1);
                            break t;
                          }
                      }
                      r = n.createElement(a), Pe(r, a, l), n.head.appendChild(r);
                      break;
                    default:
                      throw Error(c(468, a));
                  }
                  r[Je] = e, Ze(r), a = r;
                }
                e.stateNode = a;
              } else
                H0(
                  n,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = U0(
                n,
                a,
                e.memoizedProps
              );
          else
            r !== a ? (r === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : r.count--, a === null ? H0(
              n,
              e.type,
              e.stateNode
            ) : U0(
              n,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && ju(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        st(t, e), ut(e), a & 512 && (Ve || l === null || Gt(l, l.return)), l !== null && a & 4 && ju(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (st(t, e), ut(e), a & 512 && (Ve || l === null || Gt(l, l.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            xa(n, "");
          } catch (X) {
            Se(e, e.return, X);
          }
        }
        a & 4 && e.stateNode != null && (n = e.memoizedProps, ju(
          e,
          n,
          l !== null ? l.memoizedProps : n
        )), a & 1024 && (Eu = !0);
        break;
      case 6:
        if (st(t, e), ut(e), a & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (X) {
            Se(e, e.return, X);
          }
        }
        break;
      case 3:
        if (xi = null, n = Bt, Bt = gi(t.containerInfo), st(t, e), Bt = n, ut(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ka(t.containerInfo);
          } catch (X) {
            Se(e, e.return, X);
          }
        Eu && (Eu = !1, Hf(e));
        break;
      case 4:
        a = Bt, Bt = gi(
          e.stateNode.containerInfo
        ), st(t, e), ut(e), Bt = a;
        break;
      case 12:
        st(t, e), ut(e);
        break;
      case 31:
        st(t, e), ut(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ti(e, a)));
        break;
      case 13:
        st(t, e), ut(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ai = mt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ti(e, a)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var g = l !== null && l.memoizedState !== null, T = al, M = Ve;
        if (al = T || n, Ve = M || g, st(t, e), Ve = M, al = T, ut(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || g || al || Ve || la(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                g = l = t;
                try {
                  if (r = g.stateNode, n)
                    d = r.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    m = g.stateNode;
                    var k = g.memoizedProps.style, _ = k != null && k.hasOwnProperty("display") ? k.display : null;
                    m.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (X) {
                  Se(g, g.return, X);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                g = t;
                try {
                  g.stateNode.nodeValue = n ? "" : g.memoizedProps;
                } catch (X) {
                  Se(g, g.return, X);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                g = t;
                try {
                  var z = g.stateNode;
                  n ? _0(z, !0) : _0(g.stateNode, !1);
                } catch (X) {
                  Se(g, g.return, X);
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
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, ti(e, l))));
        break;
      case 19:
        st(t, e), ut(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ti(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        st(t, e), ut(e);
    }
  }
  function ut(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (Af(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode, r = Cu(e);
            ei(e, r, n);
            break;
          case 5:
            var d = l.stateNode;
            l.flags & 32 && (xa(d, ""), l.flags &= -33);
            var m = Cu(e);
            ei(e, m, d);
            break;
          case 3:
          case 4:
            var g = l.stateNode.containerInfo, T = Cu(e);
            Nu(
              e,
              T,
              g
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (M) {
        Se(e, e.return, M);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Hf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Hf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function rl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        kf(e, t.alternate, t), t = t.sibling;
  }
  function la(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Cl(4, t, t.return), la(t);
          break;
        case 1:
          Gt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && _f(
            t,
            t.return,
            l
          ), la(t);
          break;
        case 27:
          Xn(t.stateNode);
        case 26:
        case 5:
          Gt(t, t.return), la(t);
          break;
        case 22:
          t.memoizedState === null && la(t);
          break;
        case 30:
          la(t);
          break;
        default:
          la(t);
      }
      e = e.sibling;
    }
  }
  function il(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = e, r = t, d = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          il(
            n,
            r,
            l
          ), Rn(4, r);
          break;
        case 1:
          if (il(
            n,
            r,
            l
          ), a = r, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (T) {
              Se(a, a.return, T);
            }
          if (a = r, n = a.updateQueue, n !== null) {
            var m = a.stateNode;
            try {
              var g = n.shared.hiddenCallbacks;
              if (g !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < g.length; n++)
                  hd(g[n], m);
            } catch (T) {
              Se(a, a.return, T);
            }
          }
          l && d & 64 && Tf(r), Dn(r, r.return);
          break;
        case 27:
          Mf(r);
        case 26:
        case 5:
          il(
            n,
            r,
            l
          ), l && a === null && d & 4 && zf(r), Dn(r, r.return);
          break;
        case 12:
          il(
            n,
            r,
            l
          );
          break;
        case 31:
          il(
            n,
            r,
            l
          ), l && d & 4 && Df(n, r);
          break;
        case 13:
          il(
            n,
            r,
            l
          ), l && d & 4 && Uf(n, r);
          break;
        case 22:
          r.memoizedState === null && il(
            n,
            r,
            l
          ), Dn(r, r.return);
          break;
        case 30:
          break;
        default:
          il(
            n,
            r,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Tu(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Sn(l));
  }
  function _u(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Sn(e));
  }
  function Ht(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Lf(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function Lf(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ht(
          e,
          t,
          l,
          a
        ), n & 2048 && Rn(9, t);
        break;
      case 1:
        Ht(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        Ht(
          e,
          t,
          l,
          a
        ), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Sn(e)));
        break;
      case 12:
        if (n & 2048) {
          Ht(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var r = t.memoizedProps, d = r.id, m = r.onPostCommit;
            typeof m == "function" && m(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (g) {
            Se(t, t.return, g);
          }
        } else
          Ht(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        Ht(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        Ht(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        r = t.stateNode, d = t.alternate, t.memoizedState !== null ? r._visibility & 2 ? Ht(
          e,
          t,
          l,
          a
        ) : Un(e, t) : r._visibility & 2 ? Ht(
          e,
          t,
          l,
          a
        ) : (r._visibility |= 2, Ba(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Tu(d, t);
        break;
      case 24:
        Ht(
          e,
          t,
          l,
          a
        ), n & 2048 && _u(t.alternate, t);
        break;
      default:
        Ht(
          e,
          t,
          l,
          a
        );
    }
  }
  function Ba(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e, d = t, m = l, g = a, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ba(
            r,
            d,
            m,
            g,
            n
          ), Rn(8, d);
          break;
        case 23:
          break;
        case 22:
          var M = d.stateNode;
          d.memoizedState !== null ? M._visibility & 2 ? Ba(
            r,
            d,
            m,
            g,
            n
          ) : Un(
            r,
            d
          ) : (M._visibility |= 2, Ba(
            r,
            d,
            m,
            g,
            n
          )), n && T & 2048 && Tu(
            d.alternate,
            d
          );
          break;
        case 24:
          Ba(
            r,
            d,
            m,
            g,
            n
          ), n && T & 2048 && _u(d.alternate, d);
          break;
        default:
          Ba(
            r,
            d,
            m,
            g,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Un(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            Un(l, a), n & 2048 && Tu(
              a.alternate,
              a
            );
            break;
          case 24:
            Un(l, a), n & 2048 && _u(a.alternate, a);
            break;
          default:
            Un(l, a);
        }
        t = t.sibling;
      }
  }
  var Bn = 8192;
  function Ha(e, t, l) {
    if (e.subtreeFlags & Bn)
      for (e = e.child; e !== null; )
        qf(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function qf(e, t, l) {
    switch (e.tag) {
      case 26:
        Ha(
          e,
          t,
          l
        ), e.flags & Bn && e.memoizedState !== null && N4(
          l,
          Bt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ha(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = Bt;
        Bt = gi(e.stateNode.containerInfo), Ha(
          e,
          t,
          l
        ), Bt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Bn, Bn = 16777216, Ha(
          e,
          t,
          l
        ), Bn = a) : Ha(
          e,
          t,
          l
        ));
        break;
      default:
        Ha(
          e,
          t,
          l
        );
    }
  }
  function Gf(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Hn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          $e = a, Vf(
            a,
            e
          );
        }
      Gf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Yf(e), e = e.sibling;
  }
  function Yf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Hn(e), e.flags & 2048 && Cl(9, e, e.return);
        break;
      case 3:
        Hn(e);
        break;
      case 12:
        Hn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, li(e)) : Hn(e);
        break;
      default:
        Hn(e);
    }
  }
  function li(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          $e = a, Vf(
            a,
            e
          );
        }
      Gf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Cl(8, t, t.return), li(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, li(t));
          break;
        default:
          li(t);
      }
      e = e.sibling;
    }
  }
  function Vf(e, t) {
    for (; $e !== null; ) {
      var l = $e;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Cl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Sn(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, $e = a;
      else
        e: for (l = e; $e !== null; ) {
          a = $e;
          var n = a.sibling, r = a.return;
          if (Of(a), a === l) {
            $e = null;
            break e;
          }
          if (n !== null) {
            n.return = r, $e = n;
            break e;
          }
          $e = r;
        }
    }
  }
  var Lm = {
    getCacheForType: function(e) {
      var t = We(qe), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return We(qe).controller.signal;
    }
  }, qm = typeof WeakMap == "function" ? WeakMap : Map, xe = 0, ze = null, ue = null, ce = 0, ve = 0, vt = null, Nl = !1, La = !1, zu = !1, sl = 0, De = 0, El = 0, aa = 0, Au = 0, St = 0, qa = 0, Ln = null, ot = null, Mu = !1, ai = 0, Xf = 0, ni = 1 / 0, ri = null, Tl = null, Qe = 0, _l = null, Ga = null, ul = 0, wu = 0, ku = null, Qf = null, qn = 0, Ou = null;
  function jt() {
    return (xe & 2) !== 0 && ce !== 0 ? ce & -ce : C.T !== null ? Lu() : ic();
  }
  function Zf() {
    if (St === 0)
      if ((ce & 536870912) === 0 || me) {
        var e = mr;
        mr <<= 1, (mr & 3932160) === 0 && (mr = 262144), St = e;
      } else St = 536870912;
    return e = yt.current, e !== null && (e.flags |= 32), St;
  }
  function ct(e, t, l) {
    (e === ze && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null) && (Ya(e, 0), zl(
      e,
      ce,
      St,
      !1
    )), sn(e, l), ((xe & 2) === 0 || e !== ze) && (e === ze && ((xe & 2) === 0 && (aa |= l), De === 4 && zl(
      e,
      ce,
      St,
      !1
    )), Yt(e));
  }
  function $f(e, t, l) {
    if ((xe & 6) !== 0) throw Error(c(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || rn(e, t), n = a ? Vm(e, t) : Du(e, t, !0), r = a;
    do {
      if (n === 0) {
        La && !a && zl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, r && !Gm(l)) {
          n = Du(e, t, !1), r = !1;
          continue;
        }
        if (n === 2) {
          if (r = t, e.errorRecoveryDisabledLanes & r)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var m = e;
              n = Ln;
              var g = m.current.memoizedState.isDehydrated;
              if (g && (Ya(m, d).flags |= 256), d = Du(
                m,
                d,
                !1
              ), d !== 2) {
                if (zu && !g) {
                  m.errorRecoveryDisabledLanes |= r, aa |= r, n = 4;
                  break e;
                }
                r = ot, ot = n, r !== null && (ot === null ? ot = r : ot.push.apply(
                  ot,
                  r
                ));
              }
              n = d;
            }
            if (r = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Ya(e, 0), zl(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, r = n, r) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              zl(
                a,
                t,
                St,
                !Nl
              );
              break e;
            case 2:
              ot = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (n = ai + 300 - mt(), 10 < n)) {
            if (zl(
              a,
              t,
              St,
              !Nl
            ), gr(a, 0, !0) !== 0) break e;
            ul = t, a.timeoutHandle = N0(
              Kf.bind(
                null,
                a,
                l,
                ot,
                ri,
                Mu,
                t,
                St,
                aa,
                qa,
                Nl,
                r,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          Kf(
            a,
            l,
            ot,
            ri,
            Mu,
            t,
            St,
            aa,
            qa,
            Nl,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Yt(e);
  }
  function Kf(e, t, l, a, n, r, d, m, g, T, M, k, _, z) {
    if (e.timeoutHandle = -1, k = t.subtreeFlags, k & 8192 || (k & 16785408) === 16785408) {
      k = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: $t
      }, qf(
        t,
        r,
        k
      );
      var X = (r & 62914560) === r ? ai - mt() : (r & 4194048) === r ? Xf - mt() : 0;
      if (X = E4(
        k,
        X
      ), X !== null) {
        ul = r, e.cancelPendingCommit = X(
          l0.bind(
            null,
            e,
            t,
            r,
            l,
            a,
            n,
            d,
            m,
            g,
            M,
            k,
            null,
            _,
            z
          )
        ), zl(e, r, d, !T);
        return;
      }
    }
    l0(
      e,
      t,
      r,
      l,
      a,
      n,
      d,
      m,
      g
    );
  }
  function Gm(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], r = n.getSnapshot;
          n = n.value;
          try {
            if (!pt(r(), n)) return !1;
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
  function zl(e, t, l, a) {
    t &= ~Au, t &= ~aa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var r = 31 - gt(n), d = 1 << r;
      a[r] = -1, n &= ~d;
    }
    l !== 0 && ac(e, l, t);
  }
  function ii() {
    return (xe & 6) === 0 ? (Gn(0), !1) : !0;
  }
  function Ru() {
    if (ue !== null) {
      if (ve === 0)
        var e = ue.return;
      else
        e = ue, Wt = Kl = null, Fs(e), ka = null, Cn = 0, e = ue;
      for (; e !== null; )
        Ef(e.alternate, e), e = e.return;
      ue = null;
    }
  }
  function Ya(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, s4(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ul = 0, Ru(), ze = e, ue = l = Jt(e.current, null), ce = t, ve = 0, vt = null, Nl = !1, La = rn(e, t), zu = !1, qa = St = Au = aa = El = De = 0, ot = Ln = null, Mu = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - gt(a), r = 1 << n;
        t |= e[n], a &= ~r;
      }
    return sl = t, _r(), l;
  }
  function Jf(e, t) {
    ae = null, C.H = wn, t === wa || t === Dr ? (t = cd(), ve = 3) : t === Hs ? (t = cd(), ve = 4) : ve = t === fu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, vt = t, ue === null && (De = 1, Jr(
      e,
      At(t, e.current)
    ));
  }
  function Ff() {
    var e = yt.current;
    return e === null ? !0 : (ce & 4194048) === ce ? Ot === null : (ce & 62914560) === ce || (ce & 536870912) !== 0 ? e === Ot : !1;
  }
  function Wf() {
    var e = C.H;
    return C.H = wn, e === null ? wn : e;
  }
  function If() {
    var e = C.A;
    return C.A = Lm, e;
  }
  function si() {
    De = 4, Nl || (ce & 4194048) !== ce && yt.current !== null || (La = !0), (El & 134217727) === 0 && (aa & 134217727) === 0 || ze === null || zl(
      ze,
      ce,
      St,
      !1
    );
  }
  function Du(e, t, l) {
    var a = xe;
    xe |= 2;
    var n = Wf(), r = If();
    (ze !== e || ce !== t) && (ri = null, Ya(e, t)), t = !1;
    var d = De;
    e: do
      try {
        if (ve !== 0 && ue !== null) {
          var m = ue, g = vt;
          switch (ve) {
            case 8:
              Ru(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              yt.current === null && (t = !0);
              var T = ve;
              if (ve = 0, vt = null, Va(e, m, g, T), l && La) {
                d = 0;
                break e;
              }
              break;
            default:
              T = ve, ve = 0, vt = null, Va(e, m, g, T);
          }
        }
        Ym(), d = De;
        break;
      } catch (M) {
        Jf(e, M);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Wt = Kl = null, xe = a, C.H = n, C.A = r, ue === null && (ze = null, ce = 0, _r()), d;
  }
  function Ym() {
    for (; ue !== null; ) Pf(ue);
  }
  function Vm(e, t) {
    var l = xe;
    xe |= 2;
    var a = Wf(), n = If();
    ze !== e || ce !== t ? (ri = null, ni = mt() + 500, Ya(e, t)) : La = rn(
      e,
      t
    );
    e: do
      try {
        if (ve !== 0 && ue !== null) {
          t = ue;
          var r = vt;
          t: switch (ve) {
            case 1:
              ve = 0, vt = null, Va(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (ud(r)) {
                ve = 0, vt = null, e0(t);
                break;
              }
              t = function() {
                ve !== 2 && ve !== 9 || ze !== e || (ve = 7), Yt(e);
              }, r.then(t, t);
              break e;
            case 3:
              ve = 7;
              break e;
            case 4:
              ve = 5;
              break e;
            case 7:
              ud(r) ? (ve = 0, vt = null, e0(t)) : (ve = 0, vt = null, Va(e, t, r, 7));
              break;
            case 5:
              var d = null;
              switch (ue.tag) {
                case 26:
                  d = ue.memoizedState;
                case 5:
                case 27:
                  var m = ue;
                  if (d ? L0(d) : m.stateNode.complete) {
                    ve = 0, vt = null;
                    var g = m.sibling;
                    if (g !== null) ue = g;
                    else {
                      var T = m.return;
                      T !== null ? (ue = T, ui(T)) : ue = null;
                    }
                    break t;
                  }
              }
              ve = 0, vt = null, Va(e, t, r, 5);
              break;
            case 6:
              ve = 0, vt = null, Va(e, t, r, 6);
              break;
            case 8:
              Ru(), De = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        Xm();
        break;
      } catch (M) {
        Jf(e, M);
      }
    while (!0);
    return Wt = Kl = null, C.H = a, C.A = n, xe = l, ue !== null ? 0 : (ze = null, ce = 0, _r(), De);
  }
  function Xm() {
    for (; ue !== null && !m2(); )
      Pf(ue);
  }
  function Pf(e) {
    var t = Cf(e.alternate, e, sl);
    e.memoizedProps = e.pendingProps, t === null ? ui(e) : ue = t;
  }
  function e0(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = xf(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ce
        );
        break;
      case 11:
        t = xf(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ce
        );
        break;
      case 5:
        Fs(t);
      default:
        Ef(l, t), t = ue = Wc(t, sl), t = Cf(l, t, sl);
    }
    e.memoizedProps = e.pendingProps, t === null ? ui(e) : ue = t;
  }
  function Va(e, t, l, a) {
    Wt = Kl = null, Fs(t), ka = null, Cn = 0;
    var n = t.return;
    try {
      if (km(
        e,
        n,
        t,
        l,
        ce
      )) {
        De = 1, Jr(
          e,
          At(l, e.current)
        ), ue = null;
        return;
      }
    } catch (r) {
      if (n !== null) throw ue = n, r;
      De = 1, Jr(
        e,
        At(l, e.current)
      ), ue = null;
      return;
    }
    t.flags & 32768 ? (me || a === 1 ? e = !0 : La || (ce & 536870912) !== 0 ? e = !1 : (Nl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = yt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), t0(t, e)) : ui(t);
  }
  function ui(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        t0(
          t,
          Nl
        );
        return;
      }
      e = t.return;
      var l = Dm(
        t.alternate,
        t,
        sl
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
  function t0(e, t) {
    do {
      var l = Um(e.alternate, e);
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
  function l0(e, t, l, a, n, r, d, m, g) {
    e.cancelPendingCommit = null;
    do
      oi();
    while (Qe !== 0);
    if ((xe & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (r = t.lanes | t.childLanes, r |= Cs, C2(
        e,
        l,
        r,
        d,
        m,
        g
      ), e === ze && (ue = ze = null, ce = 0), Ga = t, _l = e, ul = l, wu = r, ku = n, Qf = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Km(dr, function() {
        return s0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = C.T, C.T = null, n = U.p, U.p = 2, d = xe, xe |= 4;
        try {
          Bm(e, t, l);
        } finally {
          xe = d, U.p = n, C.T = a;
        }
      }
      Qe = 1, a0(), n0(), r0();
    }
  }
  function a0() {
    if (Qe === 1) {
      Qe = 0;
      var e = _l, t = Ga, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = C.T, C.T = null;
        var a = U.p;
        U.p = 2;
        var n = xe;
        xe |= 4;
        try {
          Bf(t, e);
          var r = $u, d = Yc(e.containerInfo), m = r.focusedElem, g = r.selectionRange;
          if (d !== m && m && m.ownerDocument && Gc(
            m.ownerDocument.documentElement,
            m
          )) {
            if (g !== null && ys(m)) {
              var T = g.start, M = g.end;
              if (M === void 0 && (M = T), "selectionStart" in m)
                m.selectionStart = T, m.selectionEnd = Math.min(
                  M,
                  m.value.length
                );
              else {
                var k = m.ownerDocument || document, _ = k && k.defaultView || window;
                if (_.getSelection) {
                  var z = _.getSelection(), X = m.textContent.length, P = Math.min(g.start, X), Ee = g.end === void 0 ? P : Math.min(g.end, X);
                  !z.extend && P > Ee && (d = Ee, Ee = P, P = d);
                  var N = qc(
                    m,
                    P
                  ), y = qc(
                    m,
                    Ee
                  );
                  if (N && y && (z.rangeCount !== 1 || z.anchorNode !== N.node || z.anchorOffset !== N.offset || z.focusNode !== y.node || z.focusOffset !== y.offset)) {
                    var E = k.createRange();
                    E.setStart(N.node, N.offset), z.removeAllRanges(), P > Ee ? (z.addRange(E), z.extend(y.node, y.offset)) : (E.setEnd(y.node, y.offset), z.addRange(E));
                  }
                }
              }
            }
            for (k = [], z = m; z = z.parentNode; )
              z.nodeType === 1 && k.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < k.length; m++) {
              var w = k[m];
              w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
            }
          }
          Si = !!Zu, $u = Zu = null;
        } finally {
          xe = n, U.p = a, C.T = l;
        }
      }
      e.current = t, Qe = 2;
    }
  }
  function n0() {
    if (Qe === 2) {
      Qe = 0;
      var e = _l, t = Ga, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = C.T, C.T = null;
        var a = U.p;
        U.p = 2;
        var n = xe;
        xe |= 4;
        try {
          kf(e, t.alternate, t);
        } finally {
          xe = n, U.p = a, C.T = l;
        }
      }
      Qe = 3;
    }
  }
  function r0() {
    if (Qe === 4 || Qe === 3) {
      Qe = 0, h2();
      var e = _l, t = Ga, l = ul, a = Qf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Qe = 5 : (Qe = 0, Ga = _l = null, i0(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (Tl = null), Pi(l), t = t.stateNode, ht && typeof ht.onCommitFiberRoot == "function")
        try {
          ht.onCommitFiberRoot(
            nn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = C.T, n = U.p, U.p = 2, C.T = null;
        try {
          for (var r = e.onRecoverableError, d = 0; d < a.length; d++) {
            var m = a[d];
            r(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          C.T = t, U.p = n;
        }
      }
      (ul & 3) !== 0 && oi(), Yt(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === Ou ? qn++ : (qn = 0, Ou = e) : qn = 0, Gn(0);
    }
  }
  function i0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Sn(t)));
  }
  function oi() {
    return a0(), n0(), r0(), s0();
  }
  function s0() {
    if (Qe !== 5) return !1;
    var e = _l, t = wu;
    wu = 0;
    var l = Pi(ul), a = C.T, n = U.p;
    try {
      U.p = 32 > l ? 32 : l, C.T = null, l = ku, ku = null;
      var r = _l, d = ul;
      if (Qe = 0, Ga = _l = null, ul = 0, (xe & 6) !== 0) throw Error(c(331));
      var m = xe;
      if (xe |= 4, Yf(r.current), Lf(
        r,
        r.current,
        d,
        l
      ), xe = m, Gn(0, !1), ht && typeof ht.onPostCommitFiberRoot == "function")
        try {
          ht.onPostCommitFiberRoot(nn, r);
        } catch {
        }
      return !0;
    } finally {
      U.p = n, C.T = a, i0(e, t);
    }
  }
  function u0(e, t, l) {
    t = At(l, t), t = du(e.stateNode, t, 2), e = vl(e, t, 2), e !== null && (sn(e, 2), Yt(e));
  }
  function Se(e, t, l) {
    if (e.tag === 3)
      u0(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          u0(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Tl === null || !Tl.has(a))) {
            e = At(l, e), l = of(2), a = vl(t, l, 2), a !== null && (cf(
              l,
              a,
              t,
              e
            ), sn(a, 2), Yt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Uu(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new qm();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(l) || (zu = !0, n.add(l), e = Qm.bind(null, e, t, l), t.then(e, e));
  }
  function Qm(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, ze === e && (ce & l) === l && (De === 4 || De === 3 && (ce & 62914560) === ce && 300 > mt() - ai ? (xe & 2) === 0 && Ya(e, 0) : Au |= l, qa === ce && (qa = 0)), Yt(e);
  }
  function o0(e, t) {
    t === 0 && (t = lc()), e = Ql(e, t), e !== null && (sn(e, t), Yt(e));
  }
  function Zm(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), o0(e, l);
  }
  function $m(e, t) {
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
        throw Error(c(314));
    }
    a !== null && a.delete(t), o0(e, l);
  }
  function Km(e, t) {
    return Ji(e, t);
  }
  var ci = null, Xa = null, Bu = !1, di = !1, Hu = !1, Al = 0;
  function Yt(e) {
    e !== Xa && e.next === null && (Xa === null ? ci = Xa = e : Xa = Xa.next = e), di = !0, Bu || (Bu = !0, Fm());
  }
  function Gn(e, t) {
    if (!Hu && di) {
      Hu = !0;
      do
        for (var l = !1, a = ci; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var r = 0;
            else {
              var d = a.suspendedLanes, m = a.pingedLanes;
              r = (1 << 31 - gt(42 | e) + 1) - 1, r &= n & ~(d & ~m), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (l = !0, m0(a, r));
          } else
            r = ce, r = gr(
              a,
              a === ze ? r : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (r & 3) === 0 || rn(a, r) || (l = !0, m0(a, r));
          a = a.next;
        }
      while (l);
      Hu = !1;
    }
  }
  function Jm() {
    c0();
  }
  function c0() {
    di = Bu = !1;
    var e = 0;
    Al !== 0 && i4() && (e = Al);
    for (var t = mt(), l = null, a = ci; a !== null; ) {
      var n = a.next, r = d0(a, t);
      r === 0 ? (a.next = null, l === null ? ci = n : l.next = n, n === null && (Xa = l)) : (l = a, (e !== 0 || (r & 3) !== 0) && (di = !0)), a = n;
    }
    Qe !== 0 && Qe !== 5 || Gn(e), Al !== 0 && (Al = 0);
  }
  function d0(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r; ) {
      var d = 31 - gt(r), m = 1 << d, g = n[d];
      g === -1 ? ((m & l) === 0 || (m & a) !== 0) && (n[d] = j2(m, t)) : g <= t && (e.expiredLanes |= m), r &= ~m;
    }
    if (t = ze, l = ce, l = gr(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && Fi(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || rn(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && Fi(a), Pi(l)) {
        case 2:
        case 8:
          l = ec;
          break;
        case 32:
          l = dr;
          break;
        case 268435456:
          l = tc;
          break;
        default:
          l = dr;
      }
      return a = f0.bind(null, e), l = Ji(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && Fi(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function f0(e, t) {
    if (Qe !== 0 && Qe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (oi() && e.callbackNode !== l)
      return null;
    var a = ce;
    return a = gr(
      e,
      e === ze ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : ($f(e, a, t), d0(e, mt()), e.callbackNode != null && e.callbackNode === l ? f0.bind(null, e) : null);
  }
  function m0(e, t) {
    if (oi()) return null;
    $f(e, t, !0);
  }
  function Fm() {
    u4(function() {
      (xe & 6) !== 0 ? Ji(
        Po,
        Jm
      ) : c0();
    });
  }
  function Lu() {
    if (Al === 0) {
      var e = Aa;
      e === 0 && (e = fr, fr <<= 1, (fr & 261888) === 0 && (fr = 256)), Al = e;
    }
    return Al;
  }
  function h0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : br("" + e);
  }
  function g0(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function Wm(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var r = h0(
        (n[nt] || null).action
      ), d = a.submitter;
      d && (t = (t = d[nt] || null) ? h0(t.formAction) : d.getAttribute("formAction"), t !== null && (r = t, d = null));
      var m = new Cr(
        "action",
        "action",
        null,
        a,
        n
      );
      e.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Al !== 0) {
                  var g = d ? g0(n, d) : new FormData(n);
                  ru(
                    l,
                    {
                      pending: !0,
                      data: g,
                      method: n.method,
                      action: r
                    },
                    null,
                    g
                  );
                }
              } else
                typeof r == "function" && (m.preventDefault(), g = d ? g0(n, d) : new FormData(n), ru(
                  l,
                  {
                    pending: !0,
                    data: g,
                    method: n.method,
                    action: r
                  },
                  r,
                  g
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var qu = 0; qu < js.length; qu++) {
    var Gu = js[qu], Im = Gu.toLowerCase(), Pm = Gu[0].toUpperCase() + Gu.slice(1);
    Ut(
      Im,
      "on" + Pm
    );
  }
  Ut(Qc, "onAnimationEnd"), Ut(Zc, "onAnimationIteration"), Ut($c, "onAnimationStart"), Ut("dblclick", "onDoubleClick"), Ut("focusin", "onFocus"), Ut("focusout", "onBlur"), Ut(gm, "onTransitionRun"), Ut(pm, "onTransitionStart"), Ut(xm, "onTransitionCancel"), Ut(Kc, "onTransitionEnd"), ga("onMouseEnter", ["mouseout", "mouseover"]), ga("onMouseLeave", ["mouseout", "mouseover"]), ga("onPointerEnter", ["pointerout", "pointerover"]), ga("onPointerLeave", ["pointerout", "pointerover"]), Gl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Gl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Gl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Gl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Gl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Gl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Yn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), e4 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yn)
  );
  function p0(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], n = a.event;
      a = a.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var m = a[d], g = m.instance, T = m.currentTarget;
            if (m = m.listener, g !== r && n.isPropagationStopped())
              break e;
            r = m, n.currentTarget = T;
            try {
              r(n);
            } catch (M) {
              Tr(M);
            }
            n.currentTarget = null, r = g;
          }
        else
          for (d = 0; d < a.length; d++) {
            if (m = a[d], g = m.instance, T = m.currentTarget, m = m.listener, g !== r && n.isPropagationStopped())
              break e;
            r = m, n.currentTarget = T;
            try {
              r(n);
            } catch (M) {
              Tr(M);
            }
            n.currentTarget = null, r = g;
          }
      }
    }
  }
  function oe(e, t) {
    var l = t[es];
    l === void 0 && (l = t[es] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (x0(t, e, 2, !1), l.add(a));
  }
  function Yu(e, t, l) {
    var a = 0;
    t && (a |= 4), x0(
      l,
      e,
      a,
      t
    );
  }
  var fi = "_reactListening" + Math.random().toString(36).slice(2);
  function Vu(e) {
    if (!e[fi]) {
      e[fi] = !0, oc.forEach(function(l) {
        l !== "selectionchange" && (e4.has(l) || Yu(l, !1, e), Yu(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[fi] || (t[fi] = !0, Yu("selectionchange", !1, t));
    }
  }
  function x0(e, t, l, a) {
    switch (Z0(t)) {
      case 2:
        var n = z4;
        break;
      case 8:
        n = A4;
        break;
      default:
        n = no;
    }
    l = n.bind(
      null,
      t,
      l,
      e
    ), n = void 0, !os || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
      passive: n
    }) : e.addEventListener(t, l, !1);
  }
  function Xu(e, t, l, a, n) {
    var r = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var d = a.tag;
        if (d === 3 || d === 4) {
          var m = a.stateNode.containerInfo;
          if (m === n) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var g = d.tag;
              if ((g === 3 || g === 4) && d.stateNode.containerInfo === n)
                return;
              d = d.return;
            }
          for (; m !== null; ) {
            if (d = fa(m), d === null) return;
            if (g = d.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = r = d;
              continue e;
            }
            m = m.parentNode;
          }
        }
        a = a.return;
      }
    Sc(function() {
      var T = r, M = ss(l), k = [];
      e: {
        var _ = Jc.get(e);
        if (_ !== void 0) {
          var z = Cr, X = e;
          switch (e) {
            case "keypress":
              if (Sr(l) === 0) break e;
            case "keydown":
            case "keyup":
              z = $2;
              break;
            case "focusin":
              X = "focus", z = ms;
              break;
            case "focusout":
              X = "blur", z = ms;
              break;
            case "beforeblur":
            case "afterblur":
              z = ms;
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
              z = Nc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = D2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = F2;
              break;
            case Qc:
            case Zc:
            case $c:
              z = H2;
              break;
            case Kc:
              z = I2;
              break;
            case "scroll":
            case "scrollend":
              z = O2;
              break;
            case "wheel":
              z = em;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = q2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Tc;
              break;
            case "toggle":
            case "beforetoggle":
              z = lm;
          }
          var P = (t & 4) !== 0, Ee = !P && (e === "scroll" || e === "scrollend"), N = P ? _ !== null ? _ + "Capture" : null : _;
          P = [];
          for (var y = T, E; y !== null; ) {
            var w = y;
            if (E = w.stateNode, w = w.tag, w !== 5 && w !== 26 && w !== 27 || E === null || N === null || (w = cn(y, N), w != null && P.push(
              Vn(y, w, E)
            )), Ee) break;
            y = y.return;
          }
          0 < P.length && (_ = new z(
            _,
            X,
            null,
            l,
            M
          ), k.push({ event: _, listeners: P }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (_ = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", _ && l !== is && (X = l.relatedTarget || l.fromElement) && (fa(X) || X[da]))
            break e;
          if ((z || _) && (_ = M.window === M ? M : (_ = M.ownerDocument) ? _.defaultView || _.parentWindow : window, z ? (X = l.relatedTarget || l.toElement, z = T, X = X ? fa(X) : null, X !== null && (Ee = h(X), P = X.tag, X !== Ee || P !== 5 && P !== 27 && P !== 6) && (X = null)) : (z = null, X = T), z !== X)) {
            if (P = Nc, w = "onMouseLeave", N = "onMouseEnter", y = "mouse", (e === "pointerout" || e === "pointerover") && (P = Tc, w = "onPointerLeave", N = "onPointerEnter", y = "pointer"), Ee = z == null ? _ : on(z), E = X == null ? _ : on(X), _ = new P(
              w,
              y + "leave",
              z,
              l,
              M
            ), _.target = Ee, _.relatedTarget = E, w = null, fa(M) === T && (P = new P(
              N,
              y + "enter",
              X,
              l,
              M
            ), P.target = E, P.relatedTarget = Ee, w = P), Ee = w, z && X)
              t: {
                for (P = t4, N = z, y = X, E = 0, w = N; w; w = P(w))
                  E++;
                w = 0;
                for (var J = y; J; J = P(J))
                  w++;
                for (; 0 < E - w; )
                  N = P(N), E--;
                for (; 0 < w - E; )
                  y = P(y), w--;
                for (; E--; ) {
                  if (N === y || y !== null && N === y.alternate) {
                    P = N;
                    break t;
                  }
                  N = P(N), y = P(y);
                }
                P = null;
              }
            else P = null;
            z !== null && y0(
              k,
              _,
              z,
              P,
              !1
            ), X !== null && Ee !== null && y0(
              k,
              Ee,
              X,
              P,
              !0
            );
          }
        }
        e: {
          if (_ = T ? on(T) : window, z = _.nodeName && _.nodeName.toLowerCase(), z === "select" || z === "input" && _.type === "file")
            var ge = Rc;
          else if (kc(_))
            if (Dc)
              ge = fm;
            else {
              ge = cm;
              var Z = om;
            }
          else
            z = _.nodeName, !z || z.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? T && rs(T.elementType) && (ge = Rc) : ge = dm;
          if (ge && (ge = ge(e, T))) {
            Oc(
              k,
              ge,
              l,
              M
            );
            break e;
          }
          Z && Z(e, _, T), e === "focusout" && T && _.type === "number" && T.memoizedProps.value != null && ns(_, "number", _.value);
        }
        switch (Z = T ? on(T) : window, e) {
          case "focusin":
            (kc(Z) || Z.contentEditable === "true") && (Sa = Z, bs = T, yn = null);
            break;
          case "focusout":
            yn = bs = Sa = null;
            break;
          case "mousedown":
            vs = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vs = !1, Vc(k, l, M);
            break;
          case "selectionchange":
            if (hm) break;
          case "keydown":
          case "keyup":
            Vc(k, l, M);
        }
        var ne;
        if (gs)
          e: {
            switch (e) {
              case "compositionstart":
                var de = "onCompositionStart";
                break e;
              case "compositionend":
                de = "onCompositionEnd";
                break e;
              case "compositionupdate":
                de = "onCompositionUpdate";
                break e;
            }
            de = void 0;
          }
        else
          va ? Mc(e, l) && (de = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (de = "onCompositionStart");
        de && (_c && l.locale !== "ko" && (va || de !== "onCompositionStart" ? de === "onCompositionEnd" && va && (ne = jc()) : (ml = M, cs = "value" in ml ? ml.value : ml.textContent, va = !0)), Z = mi(T, de), 0 < Z.length && (de = new Ec(
          de,
          e,
          null,
          l,
          M
        ), k.push({ event: de, listeners: Z }), ne ? de.data = ne : (ne = wc(l), ne !== null && (de.data = ne)))), (ne = nm ? rm(e, l) : im(e, l)) && (de = mi(T, "onBeforeInput"), 0 < de.length && (Z = new Ec(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          M
        ), k.push({
          event: Z,
          listeners: de
        }), Z.data = ne)), Wm(
          k,
          e,
          T,
          l,
          M
        );
      }
      p0(k, t);
    });
  }
  function Vn(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function mi(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e, r = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || r === null || (n = cn(e, l), n != null && a.unshift(
        Vn(e, n, r)
      ), n = cn(e, t), n != null && a.push(
        Vn(e, n, r)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function t4(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function y0(e, t, l, a, n) {
    for (var r = t._reactName, d = []; l !== null && l !== a; ) {
      var m = l, g = m.alternate, T = m.stateNode;
      if (m = m.tag, g !== null && g === a) break;
      m !== 5 && m !== 26 && m !== 27 || T === null || (g = T, n ? (T = cn(l, r), T != null && d.unshift(
        Vn(l, T, g)
      )) : n || (T = cn(l, r), T != null && d.push(
        Vn(l, T, g)
      ))), l = l.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var l4 = /\r\n?/g, a4 = /\u0000|\uFFFD/g;
  function b0(e) {
    return (typeof e == "string" ? e : "" + e).replace(l4, `
`).replace(a4, "");
  }
  function v0(e, t) {
    return t = b0(t), b0(e) === t;
  }
  function Ne(e, t, l, a, n, r) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || xa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && xa(e, "" + a);
        break;
      case "className":
        xr(e, "class", a);
        break;
      case "tabIndex":
        xr(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        xr(e, l, a);
        break;
      case "style":
        bc(e, a, r);
        break;
      case "data":
        if (t !== "object") {
          xr(e, "data", a);
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
        a = br("" + a), e.setAttribute(l, a);
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
          typeof r == "function" && (l === "formAction" ? (t !== "input" && Ne(e, t, "name", n.name, n, null), Ne(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ne(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ne(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ne(e, t, "encType", n.encType, n, null), Ne(e, t, "method", n.method, n, null), Ne(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = br("" + a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = $t);
        break;
      case "onScroll":
        a != null && oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(c(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(c(60));
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
        l = br("" + a), e.setAttributeNS(
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
        oe("beforetoggle", e), oe("toggle", e), pr(e, "popover", a);
        break;
      case "xlinkActuate":
        Zt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Zt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Zt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Zt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Zt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Zt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Zt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Zt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Zt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        pr(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = w2.get(l) || l, pr(e, l, a));
    }
  }
  function Qu(e, t, l, a, n, r) {
    switch (l) {
      case "style":
        bc(e, a, r);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(c(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(c(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string" ? xa(e, a) : (typeof a == "number" || typeof a == "bigint") && xa(e, "" + a);
        break;
      case "onScroll":
        a != null && oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && oe("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = $t);
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
        if (!cc.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), r = e[nt] || null, r = r != null ? r[l] : null, typeof r == "function" && e.removeEventListener(t, r, n), typeof a == "function")) {
              typeof r != "function" && r !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : pr(e, l, a);
          }
    }
  }
  function Pe(e, t, l) {
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
        oe("error", e), oe("load", e);
        var a = !1, n = !1, r;
        for (r in l)
          if (l.hasOwnProperty(r)) {
            var d = l[r];
            if (d != null)
              switch (r) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  Ne(e, t, r, d, l, null);
              }
          }
        n && Ne(e, t, "srcSet", l.srcSet, l, null), a && Ne(e, t, "src", l.src, l, null);
        return;
      case "input":
        oe("invalid", e);
        var m = r = d = n = null, g = null, T = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var M = l[a];
            if (M != null)
              switch (a) {
                case "name":
                  n = M;
                  break;
                case "type":
                  d = M;
                  break;
                case "checked":
                  g = M;
                  break;
                case "defaultChecked":
                  T = M;
                  break;
                case "value":
                  r = M;
                  break;
                case "defaultValue":
                  m = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(c(137, t));
                  break;
                default:
                  Ne(e, t, a, M, l, null);
              }
          }
        gc(
          e,
          r,
          m,
          g,
          T,
          d,
          n,
          !1
        );
        return;
      case "select":
        oe("invalid", e), a = d = r = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (m = l[n], m != null))
            switch (n) {
              case "value":
                r = m;
                break;
              case "defaultValue":
                d = m;
                break;
              case "multiple":
                a = m;
              default:
                Ne(e, t, n, m, l, null);
            }
        t = r, l = d, e.multiple = !!a, t != null ? pa(e, !!a, t, !1) : l != null && pa(e, !!a, l, !0);
        return;
      case "textarea":
        oe("invalid", e), r = n = a = null;
        for (d in l)
          if (l.hasOwnProperty(d) && (m = l[d], m != null))
            switch (d) {
              case "value":
                a = m;
                break;
              case "defaultValue":
                n = m;
                break;
              case "children":
                r = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(c(91));
                break;
              default:
                Ne(e, t, d, m, l, null);
            }
        xc(e, a, n, r);
        return;
      case "option":
        for (g in l)
          if (l.hasOwnProperty(g) && (a = l[g], a != null))
            switch (g) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ne(e, t, g, a, l, null);
            }
        return;
      case "dialog":
        oe("beforetoggle", e), oe("toggle", e), oe("cancel", e), oe("close", e);
        break;
      case "iframe":
      case "object":
        oe("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Yn.length; a++)
          oe(Yn[a], e);
        break;
      case "image":
        oe("error", e), oe("load", e);
        break;
      case "details":
        oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        oe("error", e), oe("load", e);
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
        for (T in l)
          if (l.hasOwnProperty(T) && (a = l[T], a != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Ne(e, t, T, a, l, null);
            }
        return;
      default:
        if (rs(t)) {
          for (M in l)
            l.hasOwnProperty(M) && (a = l[M], a !== void 0 && Qu(
              e,
              t,
              M,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (m in l)
      l.hasOwnProperty(m) && (a = l[m], a != null && Ne(e, t, m, a, l, null));
  }
  function n4(e, t, l, a) {
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
        var n = null, r = null, d = null, m = null, g = null, T = null, M = null;
        for (z in l) {
          var k = l[z];
          if (l.hasOwnProperty(z) && k != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = k;
              default:
                a.hasOwnProperty(z) || Ne(e, t, z, null, a, k);
            }
        }
        for (var _ in a) {
          var z = a[_];
          if (k = l[_], a.hasOwnProperty(_) && (z != null || k != null))
            switch (_) {
              case "type":
                r = z;
                break;
              case "name":
                n = z;
                break;
              case "checked":
                T = z;
                break;
              case "defaultChecked":
                M = z;
                break;
              case "value":
                d = z;
                break;
              case "defaultValue":
                m = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(c(137, t));
                break;
              default:
                z !== k && Ne(
                  e,
                  t,
                  _,
                  z,
                  a,
                  k
                );
            }
        }
        as(
          e,
          d,
          m,
          g,
          T,
          M,
          r,
          n
        );
        return;
      case "select":
        z = d = m = _ = null;
        for (r in l)
          if (g = l[r], l.hasOwnProperty(r) && g != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                z = g;
              default:
                a.hasOwnProperty(r) || Ne(
                  e,
                  t,
                  r,
                  null,
                  a,
                  g
                );
            }
        for (n in a)
          if (r = a[n], g = l[n], a.hasOwnProperty(n) && (r != null || g != null))
            switch (n) {
              case "value":
                _ = r;
                break;
              case "defaultValue":
                m = r;
                break;
              case "multiple":
                d = r;
              default:
                r !== g && Ne(
                  e,
                  t,
                  n,
                  r,
                  a,
                  g
                );
            }
        t = m, l = d, a = z, _ != null ? pa(e, !!l, _, !1) : !!a != !!l && (t != null ? pa(e, !!l, t, !0) : pa(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        z = _ = null;
        for (m in l)
          if (n = l[m], l.hasOwnProperty(m) && n != null && !a.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ne(e, t, m, null, a, n);
            }
        for (d in a)
          if (n = a[d], r = l[d], a.hasOwnProperty(d) && (n != null || r != null))
            switch (d) {
              case "value":
                _ = n;
                break;
              case "defaultValue":
                z = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(c(91));
                break;
              default:
                n !== r && Ne(e, t, d, n, a, r);
            }
        pc(e, _, z);
        return;
      case "option":
        for (var X in l)
          if (_ = l[X], l.hasOwnProperty(X) && _ != null && !a.hasOwnProperty(X))
            switch (X) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ne(
                  e,
                  t,
                  X,
                  null,
                  a,
                  _
                );
            }
        for (g in a)
          if (_ = a[g], z = l[g], a.hasOwnProperty(g) && _ !== z && (_ != null || z != null))
            switch (g) {
              case "selected":
                e.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                Ne(
                  e,
                  t,
                  g,
                  _,
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
        for (var P in l)
          _ = l[P], l.hasOwnProperty(P) && _ != null && !a.hasOwnProperty(P) && Ne(e, t, P, null, a, _);
        for (T in a)
          if (_ = a[T], z = l[T], a.hasOwnProperty(T) && _ !== z && (_ != null || z != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(c(137, t));
                break;
              default:
                Ne(
                  e,
                  t,
                  T,
                  _,
                  a,
                  z
                );
            }
        return;
      default:
        if (rs(t)) {
          for (var Ee in l)
            _ = l[Ee], l.hasOwnProperty(Ee) && _ !== void 0 && !a.hasOwnProperty(Ee) && Qu(
              e,
              t,
              Ee,
              void 0,
              a,
              _
            );
          for (M in a)
            _ = a[M], z = l[M], !a.hasOwnProperty(M) || _ === z || _ === void 0 && z === void 0 || Qu(
              e,
              t,
              M,
              _,
              a,
              z
            );
          return;
        }
    }
    for (var N in l)
      _ = l[N], l.hasOwnProperty(N) && _ != null && !a.hasOwnProperty(N) && Ne(e, t, N, null, a, _);
    for (k in a)
      _ = a[k], z = l[k], !a.hasOwnProperty(k) || _ === z || _ == null && z == null || Ne(e, t, k, _, a, z);
  }
  function S0(e) {
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
  function r4() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], r = n.transferSize, d = n.initiatorType, m = n.duration;
        if (r && m && S0(d)) {
          for (d = 0, m = n.responseEnd, a += 1; a < l.length; a++) {
            var g = l[a], T = g.startTime;
            if (T > m) break;
            var M = g.transferSize, k = g.initiatorType;
            M && S0(k) && (g = g.responseEnd, d += M * (g < m ? 1 : (m - T) / (g - T)));
          }
          if (--a, t += 8 * (r + d) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Zu = null, $u = null;
  function hi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function j0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function C0(e, t) {
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
  function Ku(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ju = null;
  function i4() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ju ? !1 : (Ju = e, !0) : (Ju = null, !1);
  }
  var N0 = typeof setTimeout == "function" ? setTimeout : void 0, s4 = typeof clearTimeout == "function" ? clearTimeout : void 0, E0 = typeof Promise == "function" ? Promise : void 0, u4 = typeof queueMicrotask == "function" ? queueMicrotask : typeof E0 < "u" ? function(e) {
    return E0.resolve(null).then(e).catch(o4);
  } : N0;
  function o4(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ml(e) {
    return e === "head";
  }
  function T0(e, t) {
    var l = t, a = 0;
    do {
      var n = l.nextSibling;
      if (e.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(n), Ka(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Xn(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Xn(l);
          for (var r = l.firstChild; r; ) {
            var d = r.nextSibling, m = r.nodeName;
            r[un] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && r.rel.toLowerCase() === "stylesheet" || l.removeChild(r), r = d;
          }
        } else
          l === "body" && Xn(e.ownerDocument.body);
      l = n;
    } while (l);
    Ka(t);
  }
  function _0(e, t) {
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
  function Fu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Fu(l), ts(l);
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
  function c4(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[un])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (r = e.getAttribute("rel"), r === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (r !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (r = e.getAttribute("src"), (r !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && r && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === r)
          return e;
      } else return e;
      if (e = Rt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function d4(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Rt(e.nextSibling), e === null)) return null;
    return e;
  }
  function z0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Rt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Wu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Iu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function f4(e, t) {
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
  function Rt(e) {
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
  var Pu = null;
  function A0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Rt(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function M0(e) {
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
  function w0(e, t, l) {
    switch (t = hi(l), e) {
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
  function Xn(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ts(e);
  }
  var Dt = /* @__PURE__ */ new Map(), k0 = /* @__PURE__ */ new Set();
  function gi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ol = U.d;
  U.d = {
    f: m4,
    r: h4,
    D: g4,
    C: p4,
    L: x4,
    m: y4,
    X: v4,
    S: b4,
    M: S4
  };
  function m4() {
    var e = ol.f(), t = ii();
    return e || t;
  }
  function h4(e) {
    var t = ma(e);
    t !== null && t.tag === 5 && t.type === "form" ? Kd(t) : ol.r(e);
  }
  var Qa = typeof document > "u" ? null : document;
  function O0(e, t, l) {
    var a = Qa;
    if (a && typeof t == "string" && t) {
      var n = _t(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), k0.has(n) || (k0.add(n), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), Pe(t, "link", e), Ze(t), a.head.appendChild(t)));
    }
  }
  function g4(e) {
    ol.D(e), O0("dns-prefetch", e, null);
  }
  function p4(e, t) {
    ol.C(e, t), O0("preconnect", e, t);
  }
  function x4(e, t, l) {
    ol.L(e, t, l);
    var a = Qa;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + _t(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + _t(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + _t(
        l.imageSizes
      ) + '"]')) : n += '[href="' + _t(e) + '"]';
      var r = n;
      switch (t) {
        case "style":
          r = Za(e);
          break;
        case "script":
          r = $a(e);
      }
      Dt.has(r) || (e = j(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Dt.set(r, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Qn(r)) || t === "script" && a.querySelector(Zn(r)) || (t = a.createElement("link"), Pe(t, "link", e), Ze(t), a.head.appendChild(t)));
    }
  }
  function y4(e, t) {
    ol.m(e, t);
    var l = Qa;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + _t(a) + '"][href="' + _t(e) + '"]', r = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = $a(e);
      }
      if (!Dt.has(r) && (e = j({ rel: "modulepreload", href: e }, t), Dt.set(r, e), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Zn(r)))
              return;
        }
        a = l.createElement("link"), Pe(a, "link", e), Ze(a), l.head.appendChild(a);
      }
    }
  }
  function b4(e, t, l) {
    ol.S(e, t, l);
    var a = Qa;
    if (a && e) {
      var n = ha(a).hoistableStyles, r = Za(e);
      t = t || "default";
      var d = n.get(r);
      if (!d) {
        var m = { loading: 0, preload: null };
        if (d = a.querySelector(
          Qn(r)
        ))
          m.loading = 5;
        else {
          e = j(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Dt.get(r)) && eo(e, l);
          var g = d = a.createElement("link");
          Ze(g), Pe(g, "link", e), g._p = new Promise(function(T, M) {
            g.onload = T, g.onerror = M;
          }), g.addEventListener("load", function() {
            m.loading |= 1;
          }), g.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, pi(d, t, a);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: m
        }, n.set(r, d);
      }
    }
  }
  function v4(e, t) {
    ol.X(e, t);
    var l = Qa;
    if (l && e) {
      var a = ha(l).hoistableScripts, n = $a(e), r = a.get(n);
      r || (r = l.querySelector(Zn(n)), r || (e = j({ src: e, async: !0 }, t), (t = Dt.get(n)) && to(e, t), r = l.createElement("script"), Ze(r), Pe(r, "link", e), l.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, a.set(n, r));
    }
  }
  function S4(e, t) {
    ol.M(e, t);
    var l = Qa;
    if (l && e) {
      var a = ha(l).hoistableScripts, n = $a(e), r = a.get(n);
      r || (r = l.querySelector(Zn(n)), r || (e = j({ src: e, async: !0, type: "module" }, t), (t = Dt.get(n)) && to(e, t), r = l.createElement("script"), Ze(r), Pe(r, "link", e), l.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, a.set(n, r));
    }
  }
  function R0(e, t, l, a) {
    var n = (n = se.current) ? gi(n) : null;
    if (!n) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Za(l.href), l = ha(
          n
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Za(l.href);
          var r = ha(
            n
          ).hoistableStyles, d = r.get(e);
          if (d || (n = n.ownerDocument || n, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(e, d), (r = n.querySelector(
            Qn(e)
          )) && !r._p && (d.instance = r, d.state.loading = 5), Dt.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Dt.set(e, l), r || j4(
            n,
            e,
            l,
            d.state
          ))), t && a === null)
            throw Error(c(528, ""));
          return d;
        }
        if (t && a !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = $a(l), l = ha(
          n
        ).hoistableScripts, a = l.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function Za(e) {
    return 'href="' + _t(e) + '"';
  }
  function Qn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function D0(e) {
    return j({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function j4(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Pe(t, "link", l), Ze(t), e.head.appendChild(t));
  }
  function $a(e) {
    return '[src="' + _t(e) + '"]';
  }
  function Zn(e) {
    return "script[async]" + e;
  }
  function U0(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + _t(l.href) + '"]'
          );
          if (a)
            return t.instance = a, Ze(a), a;
          var n = j({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Ze(a), Pe(a, "style", n), pi(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = Za(l.href);
          var r = e.querySelector(
            Qn(n)
          );
          if (r)
            return t.state.loading |= 4, t.instance = r, Ze(r), r;
          a = D0(l), (n = Dt.get(n)) && eo(a, n), r = (e.ownerDocument || e).createElement("link"), Ze(r);
          var d = r;
          return d._p = new Promise(function(m, g) {
            d.onload = m, d.onerror = g;
          }), Pe(r, "link", a), t.state.loading |= 4, pi(r, l.precedence, e), t.instance = r;
        case "script":
          return r = $a(l.src), (n = e.querySelector(
            Zn(r)
          )) ? (t.instance = n, Ze(n), n) : (a = l, (n = Dt.get(r)) && (a = j({}, l), to(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ze(n), Pe(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, pi(a, l.precedence, e));
    return t.instance;
  }
  function pi(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, r = n, d = 0; d < a.length; d++) {
      var m = a[d];
      if (m.dataset.precedence === t) r = m;
      else if (r !== n) break;
    }
    r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function eo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function to(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var xi = null;
  function B0(e, t, l) {
    if (xi === null) {
      var a = /* @__PURE__ */ new Map(), n = xi = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = xi, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
      var r = l[n];
      if (!(r[un] || r[Je] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = r.getAttribute(t) || "";
        d = e + d;
        var m = a.get(d);
        m ? m.push(r) : a.set(d, [r]);
      }
    }
    return a;
  }
  function H0(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function C4(e, t, l) {
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
  function L0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function N4(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Za(a.href), r = t.querySelector(
          Qn(n)
        );
        if (r) {
          t = r._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = yi.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = r, Ze(r);
          return;
        }
        r = t.ownerDocument || t, a = D0(a), (n = Dt.get(n)) && eo(a, n), r = r.createElement("link"), Ze(r);
        var d = r;
        d._p = new Promise(function(m, g) {
          d.onload = m, d.onerror = g;
        }), Pe(r, "link", a), l.instance = r;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = yi.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var lo = 0;
  function E4(e, t) {
    return e.stylesheets && e.count === 0 && vi(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && vi(e, e.stylesheets), e.unsuspend) {
          var r = e.unsuspend;
          e.unsuspend = null, r();
        }
      }, 6e4 + t);
      0 < e.imgBytes && lo === 0 && (lo = 62500 * r4());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && vi(e, e.stylesheets), e.unsuspend)) {
            var r = e.unsuspend;
            e.unsuspend = null, r();
          }
        },
        (e.imgBytes > lo ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function yi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) vi(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var bi = null;
  function vi(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, bi = /* @__PURE__ */ new Map(), t.forEach(T4, e), bi = null, yi.call(e));
  }
  function T4(e, t) {
    if (!(t.state.loading & 4)) {
      var l = bi.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), bi.set(e, l);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < n.length; r++) {
          var d = n[r];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (l.set(d.dataset.precedence, d), a = d);
        }
        a && l.set(null, a);
      }
      n = t.instance, d = n.getAttribute("data-precedence"), r = l.get(d) || a, r === a && l.set(null, n), l.set(d, n), this.count++, a = yi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), r ? r.parentNode.insertBefore(n, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var $n = {
    $$typeof: B,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0
  };
  function _4(e, t, l, a, n, r, d, m, g) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Wi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wi(0), this.hiddenUpdates = Wi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = r, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function q0(e, t, l, a, n, r, d, m, g, T, M, k) {
    return e = new _4(
      e,
      t,
      l,
      d,
      g,
      T,
      M,
      k,
      m
    ), t = 1, r === !0 && (t |= 24), r = xt(3, null, null, t), e.current = r, r.stateNode = e, t = Ds(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, Ls(r), e;
  }
  function G0(e) {
    return e ? (e = Na, e) : Na;
  }
  function Y0(e, t, l, a, n, r) {
    n = G0(n), a.context === null ? a.context = n : a.pendingContext = n, a = bl(t), a.payload = { element: l }, r = r === void 0 ? null : r, r !== null && (a.callback = r), l = vl(e, a, t), l !== null && (ct(l, e, t), En(l, e, t));
  }
  function V0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function ao(e, t) {
    V0(e, t), (e = e.alternate) && V0(e, t);
  }
  function X0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ql(e, 67108864);
      t !== null && ct(t, e, 67108864), ao(e, 67108864);
    }
  }
  function Q0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = jt();
      t = Ii(t);
      var l = Ql(e, t);
      l !== null && ct(l, e, t), ao(e, t);
    }
  }
  var Si = !0;
  function z4(e, t, l, a) {
    var n = C.T;
    C.T = null;
    var r = U.p;
    try {
      U.p = 2, no(e, t, l, a);
    } finally {
      U.p = r, C.T = n;
    }
  }
  function A4(e, t, l, a) {
    var n = C.T;
    C.T = null;
    var r = U.p;
    try {
      U.p = 8, no(e, t, l, a);
    } finally {
      U.p = r, C.T = n;
    }
  }
  function no(e, t, l, a) {
    if (Si) {
      var n = ro(a);
      if (n === null)
        Xu(
          e,
          t,
          a,
          ji,
          l
        ), $0(e, a);
      else if (w4(
        n,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if ($0(e, a), t & 4 && -1 < M4.indexOf(e)) {
        for (; n !== null; ) {
          var r = ma(n);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var d = ql(r.pendingLanes);
                  if (d !== 0) {
                    var m = r;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; d; ) {
                      var g = 1 << 31 - gt(d);
                      m.entanglements[1] |= g, d &= ~g;
                    }
                    Yt(r), (xe & 6) === 0 && (ni = mt() + 500, Gn(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Ql(r, 2), m !== null && ct(m, r, 2), ii(), ao(r, 2);
            }
          if (r = ro(a), r === null && Xu(
            e,
            t,
            a,
            ji,
            l
          ), r === n) break;
          n = r;
        }
        n !== null && a.stopPropagation();
      } else
        Xu(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function ro(e) {
    return e = ss(e), io(e);
  }
  var ji = null;
  function io(e) {
    if (ji = null, e = fa(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = x(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = v(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ji = e, null;
  }
  function Z0(e) {
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
        switch (g2()) {
          case Po:
            return 2;
          case ec:
            return 8;
          case dr:
          case p2:
            return 32;
          case tc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var so = !1, wl = null, kl = null, Ol = null, Kn = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new Map(), Rl = [], M4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function $0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        wl = null;
        break;
      case "dragenter":
      case "dragleave":
        kl = null;
        break;
      case "mouseover":
      case "mouseout":
        Ol = null;
        break;
      case "pointerover":
      case "pointerout":
        Kn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Jn.delete(t.pointerId);
    }
  }
  function Fn(e, t, l, a, n, r) {
    return e === null || e.nativeEvent !== r ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: r,
      targetContainers: [n]
    }, t !== null && (t = ma(t), t !== null && X0(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function w4(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return wl = Fn(
          wl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return kl = Fn(
          kl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return Ol = Fn(
          Ol,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var r = n.pointerId;
        return Kn.set(
          r,
          Fn(
            Kn.get(r) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return r = n.pointerId, Jn.set(
          r,
          Fn(
            Jn.get(r) || null,
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
  function K0(e) {
    var t = fa(e.target);
    if (t !== null) {
      var l = h(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = x(l), t !== null) {
            e.blockedOn = t, sc(e.priority, function() {
              Q0(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = v(l), t !== null) {
            e.blockedOn = t, sc(e.priority, function() {
              Q0(l);
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
  function Ci(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = ro(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        is = a, l.target.dispatchEvent(a), is = null;
      } else
        return t = ma(l), t !== null && X0(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function J0(e, t, l) {
    Ci(e) && l.delete(t);
  }
  function k4() {
    so = !1, wl !== null && Ci(wl) && (wl = null), kl !== null && Ci(kl) && (kl = null), Ol !== null && Ci(Ol) && (Ol = null), Kn.forEach(J0), Jn.forEach(J0);
  }
  function Ni(e, t) {
    e.blockedOn === t && (e.blockedOn = null, so || (so = !0, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      k4
    )));
  }
  var Ei = null;
  function F0(e) {
    Ei !== e && (Ei = e, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      function() {
        Ei === e && (Ei = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (io(a || l) === null)
              continue;
            break;
          }
          var r = ma(l);
          r !== null && (e.splice(t, 3), t -= 3, ru(
            r,
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
  function Ka(e) {
    function t(g) {
      return Ni(g, e);
    }
    wl !== null && Ni(wl, e), kl !== null && Ni(kl, e), Ol !== null && Ni(Ol, e), Kn.forEach(t), Jn.forEach(t);
    for (var l = 0; l < Rl.length; l++) {
      var a = Rl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Rl.length && (l = Rl[0], l.blockedOn === null); )
      K0(l), l.blockedOn === null && Rl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], r = l[a + 1], d = n[nt] || null;
        if (typeof r == "function")
          d || F0(l);
        else if (d) {
          var m = null;
          if (r && r.hasAttribute("formAction")) {
            if (n = r, d = r[nt] || null)
              m = d.formAction;
            else if (io(n) !== null) continue;
          } else m = d.action;
          typeof m == "function" ? l[a + 1] = m : (l.splice(a, 3), a -= 3), F0(l);
        }
      }
  }
  function W0() {
    function e(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
        handler: function() {
          return new Promise(function(d) {
            return n = d;
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
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
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
  function uo(e) {
    this._internalRoot = e;
  }
  Ti.prototype.render = uo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var l = t.current, a = jt();
    Y0(l, a, e, t, null, null);
  }, Ti.prototype.unmount = uo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Y0(e.current, 2, null, e, null, null), ii(), t[da] = null;
    }
  };
  function Ti(e) {
    this._internalRoot = e;
  }
  Ti.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ic();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Rl.length && t !== 0 && t < Rl[l].priority; l++) ;
      Rl.splice(l, 0, e), l === 0 && K0(e);
    }
  };
  var I0 = s.version;
  if (I0 !== "19.2.3")
    throw Error(
      c(
        527,
        I0,
        "19.2.3"
      )
    );
  U.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = S(t), e = e !== null ? A(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var O4 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _i = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_i.isDisabled && _i.supportsFiber)
      try {
        nn = _i.inject(
          O4
        ), ht = _i;
      } catch {
      }
  }
  return In.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var l = !1, a = "", n = nf, r = rf, d = sf;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = q0(
      e,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      n,
      r,
      d,
      W0
    ), e[da] = t.current, Vu(e), new uo(t);
  }, In.hydrateRoot = function(e, t, l) {
    if (!f(e)) throw Error(c(299));
    var a = !1, n = "", r = nf, d = rf, m = sf, g = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (r = l.onUncaughtError), l.onCaughtError !== void 0 && (d = l.onCaughtError), l.onRecoverableError !== void 0 && (m = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), t = q0(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      n,
      g,
      r,
      d,
      m,
      W0
    ), t.context = G0(null), l = t.current, a = jt(), a = Ii(a), n = bl(a), n.callback = null, vl(l, n, a), l = a, t.current.lanes = l, sn(t, l), Yt(t), e[da] = t.current, Vu(e), new Ti(t);
  }, In.version = "19.2.3", In;
}
var u1;
function Q4() {
  if (u1) return fo.exports;
  u1 = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return o(), fo.exports = X4(), fo.exports;
}
var Z4 = Q4();
const U1 = /* @__PURE__ */ Do(Z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $4 = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), K4 = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, u, c) => c ? c.toUpperCase() : u.toLowerCase()
), o1 = (o) => {
  const s = K4(o);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, B1 = (...o) => o.filter((s, u, c) => !!s && s.trim() !== "" && c.indexOf(s) === u).join(" ").trim(), J4 = (o) => {
  for (const s in o)
    if (s.startsWith("aria-") || s === "role" || s === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var F4 = {
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
const W4 = O.forwardRef(
  ({
    color: o = "currentColor",
    size: s = 24,
    strokeWidth: u = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: h,
    iconNode: x,
    ...v
  }, p) => O.createElement(
    "svg",
    {
      ref: p,
      ...F4,
      width: s,
      height: s,
      stroke: o,
      strokeWidth: c ? Number(u) * 24 / Number(s) : u,
      className: B1("lucide", f),
      ...!h && !J4(v) && { "aria-hidden": "true" },
      ...v
    },
    [
      ...x.map(([S, A]) => O.createElement(S, A)),
      ...Array.isArray(h) ? h : [h]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K = (o, s) => {
  const u = O.forwardRef(
    ({ className: c, ...f }, h) => O.createElement(W4, {
      ref: h,
      iconNode: s,
      className: B1(
        `lucide-${$4(o1(o))}`,
        `lucide-${o}`,
        c
      ),
      ...f
    })
  );
  return u.displayName = o1(o), u;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I4 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], P4 = K("arrow-down-to-line", I4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eh = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], th = K("arrow-up-right", eh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lh = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], ah = K("bell", lh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nh = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], H1 = K("bot", nh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rh = [
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
], ih = K("boxes", rh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sh = [
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
], uh = K("brain-circuit", sh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oh = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], L1 = K("brain", oh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ch = [
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
], dh = K("calculator", ch);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fh = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], q1 = K("check", fh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mh = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], nr = K("chevron-down", mh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], G1 = K("chevron-right", hh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Bo = K("circle-alert", gh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ph = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Ho = K("circle-check-big", ph);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], yh = K("circle-check", xh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bh = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], vh = K("clock", bh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], jh = K("cloud", Sh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], Y1 = K("copy", Ch);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nh = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], c1 = K("corner-down-left", Nh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [
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
], Lo = K("cpu", Eh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Th = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], sr = K("database", Th);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Ui = K("download", _h);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], Ah = K("external-link", zh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], wh = K("eye", Mh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
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
], qo = K("file-text", kh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], Rh = K("hash", Oh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], Uh = K("info", Dh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Go = K("key", Bh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hh = [
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
], Yo = K("layers", Hh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lh = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], qh = K("layout-dashboard", Lh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gh = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], Yh = K("list", Gh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], V1 = K("loader-circle", Vh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xh = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], Qh = K("maximize-2", Xh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zh = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], $h = K("menu", Zh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kh = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], d1 = K("moon", Kh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jh = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], X1 = K("network", Jh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [
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
], f1 = K("palette", Fh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wh = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], Ih = K("pause", Wh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ph = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], e3 = K("pen", Ph);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t3 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Vo = K("play", t3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Xo = K("plus", l3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a3 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Qo = K("power", a3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n3 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], tn = K("refresh-cw", n3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r3 = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], Q1 = K("regex", r3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i3 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], s3 = K("save", i3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u3 = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], o3 = K("scissors", u3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], lr = K("search", c3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d3 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], f3 = K("send", d3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m3 = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], Z1 = K("server", m3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h3 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], $1 = K("settings", h3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g3 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], Zo = K("settings-2", g3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p3 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], x3 = K("sun", p3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y3 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], ln = K("terminal", y3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], ur = K("trash-2", b3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v3 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], S3 = K("triangle-alert", v3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j3 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], C3 = K("upload", j3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N3 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Yi = K("x", N3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E3 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], $o = K("zap", E3), T3 = () => /* @__PURE__ */ i.jsx("style", { children: `
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
  ` }), jo = [
  // 导航命令
  {
    id: "nav-memory",
    icon: Yh,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (o) => o("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: X1,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (o) => o("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: L1,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (o) => o("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Go,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (o) => o("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: ln,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (o) => o("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: $1,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (o) => o("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function _3(o) {
  const s = o.toLowerCase().trim();
  return s ? jo.filter((u) => {
    var c;
    return u.label.toLowerCase().includes(s) || ((c = u.description) == null ? void 0 : c.toLowerCase().includes(s)) || u.keywords.some((f) => f.toLowerCase().includes(s));
  }) : jo;
}
const z3 = {
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
}, A3 = {
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
}, M3 = {
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
}, w3 = {
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
}, k3 = {
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
}, O3 = {
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
}, Oi = {
  sillytavern: O3,
  // SillyTavern 继承主题
  paperLight: z3,
  twitterDark: M3,
  claudeDark: A3,
  catppuccin: k3,
  discord: w3
}, et = [];
for (let o = 0; o < 256; ++o)
  et.push((o + 256).toString(16).slice(1));
function R3(o, s = 0) {
  return (et[o[s + 0]] + et[o[s + 1]] + et[o[s + 2]] + et[o[s + 3]] + "-" + et[o[s + 4]] + et[o[s + 5]] + "-" + et[o[s + 6]] + et[o[s + 7]] + "-" + et[o[s + 8]] + et[o[s + 9]] + "-" + et[o[s + 10]] + et[o[s + 11]] + et[o[s + 12]] + et[o[s + 13]] + et[o[s + 14]] + et[o[s + 15]]).toLowerCase();
}
let po;
const D3 = new Uint8Array(16);
function U3() {
  if (!po) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    po = crypto.getRandomValues.bind(crypto);
  }
  return po(D3);
}
const B3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), m1 = { randomUUID: B3 };
function H3(o, s, u) {
  var f;
  o = o || {};
  const c = o.random ?? ((f = o.rng) == null ? void 0 : f.call(o)) ?? U3();
  if (c.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, R3(c);
}
function L3(o, s, u) {
  return m1.randomUUID && !o ? m1.randomUUID() : H3(o);
}
var Co = function(o, s) {
  return Co = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, c) {
    u.__proto__ = c;
  } || function(u, c) {
    for (var f in c) Object.prototype.hasOwnProperty.call(c, f) && (u[f] = c[f]);
  }, Co(o, s);
};
function or(o, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  Co(o, s);
  function u() {
    this.constructor = o;
  }
  o.prototype = s === null ? Object.create(s) : (u.prototype = s.prototype, new u());
}
function No(o) {
  var s = typeof Symbol == "function" && Symbol.iterator, u = s && o[s], c = 0;
  if (u) return u.call(o);
  if (o && typeof o.length == "number") return {
    next: function() {
      return o && c >= o.length && (o = void 0), { value: o && o[c++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Eo(o, s) {
  var u = typeof Symbol == "function" && o[Symbol.iterator];
  if (!u) return o;
  var c = u.call(o), f, h = [], x;
  try {
    for (; (s === void 0 || s-- > 0) && !(f = c.next()).done; ) h.push(f.value);
  } catch (v) {
    x = { error: v };
  } finally {
    try {
      f && !f.done && (u = c.return) && u.call(c);
    } finally {
      if (x) throw x.error;
    }
  }
  return h;
}
function To(o, s, u) {
  if (u || arguments.length === 2) for (var c = 0, f = s.length, h; c < f; c++)
    (h || !(c in s)) && (h || (h = Array.prototype.slice.call(s, 0, c)), h[c] = s[c]);
  return o.concat(h || Array.prototype.slice.call(s));
}
function Qt(o) {
  return typeof o == "function";
}
function K1(o) {
  var s = function(c) {
    Error.call(c), c.stack = new Error().stack;
  }, u = o(s);
  return u.prototype = Object.create(Error.prototype), u.prototype.constructor = u, u;
}
var xo = K1(function(o) {
  return function(u) {
    o(this), this.message = u ? u.length + ` errors occurred during unsubscription:
` + u.map(function(c, f) {
      return f + 1 + ") " + c.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = u;
  };
});
function _o(o, s) {
  if (o) {
    var u = o.indexOf(s);
    0 <= u && o.splice(u, 1);
  }
}
var Vi = (function() {
  function o(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return o.prototype.unsubscribe = function() {
    var s, u, c, f, h;
    if (!this.closed) {
      this.closed = !0;
      var x = this._parentage;
      if (x)
        if (this._parentage = null, Array.isArray(x))
          try {
            for (var v = No(x), p = v.next(); !p.done; p = v.next()) {
              var S = p.value;
              S.remove(this);
            }
          } catch (q) {
            s = { error: q };
          } finally {
            try {
              p && !p.done && (u = v.return) && u.call(v);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          x.remove(this);
      var A = this.initialTeardown;
      if (Qt(A))
        try {
          A();
        } catch (q) {
          h = q instanceof xo ? q.errors : [q];
        }
      var j = this._finalizers;
      if (j) {
        this._finalizers = null;
        try {
          for (var D = No(j), V = D.next(); !V.done; V = D.next()) {
            var H = V.value;
            try {
              h1(H);
            } catch (q) {
              h = h ?? [], q instanceof xo ? h = To(To([], Eo(h)), Eo(q.errors)) : h.push(q);
            }
          }
        } catch (q) {
          c = { error: q };
        } finally {
          try {
            V && !V.done && (f = D.return) && f.call(D);
          } finally {
            if (c) throw c.error;
          }
        }
      }
      if (h)
        throw new xo(h);
    }
  }, o.prototype.add = function(s) {
    var u;
    if (s && s !== this)
      if (this.closed)
        h1(s);
      else {
        if (s instanceof o) {
          if (s.closed || s._hasParent(this))
            return;
          s._addParent(this);
        }
        (this._finalizers = (u = this._finalizers) !== null && u !== void 0 ? u : []).push(s);
      }
  }, o.prototype._hasParent = function(s) {
    var u = this._parentage;
    return u === s || Array.isArray(u) && u.includes(s);
  }, o.prototype._addParent = function(s) {
    var u = this._parentage;
    this._parentage = Array.isArray(u) ? (u.push(s), u) : u ? [u, s] : s;
  }, o.prototype._removeParent = function(s) {
    var u = this._parentage;
    u === s ? this._parentage = null : Array.isArray(u) && _o(u, s);
  }, o.prototype.remove = function(s) {
    var u = this._finalizers;
    u && _o(u, s), s instanceof o && s._removeParent(this);
  }, o.EMPTY = (function() {
    var s = new o();
    return s.closed = !0, s;
  })(), o;
})(), J1 = Vi.EMPTY;
function F1(o) {
  return o instanceof Vi || o && "closed" in o && Qt(o.remove) && Qt(o.add) && Qt(o.unsubscribe);
}
function h1(o) {
  Qt(o) ? o() : o.unsubscribe();
}
var q3 = {
  Promise: void 0
}, G3 = {
  setTimeout: function(o, s) {
    for (var u = [], c = 2; c < arguments.length; c++)
      u[c - 2] = arguments[c];
    return setTimeout.apply(void 0, To([o, s], Eo(u)));
  },
  clearTimeout: function(o) {
    return clearTimeout(o);
  },
  delegate: void 0
};
function Y3(o) {
  G3.setTimeout(function() {
    throw o;
  });
}
function g1() {
}
function Ri(o) {
  o();
}
var Ko = (function(o) {
  or(s, o);
  function s(u) {
    var c = o.call(this) || this;
    return c.isStopped = !1, u ? (c.destination = u, F1(u) && u.add(c)) : c.destination = Q3, c;
  }
  return s.create = function(u, c, f) {
    return new zo(u, c, f);
  }, s.prototype.next = function(u) {
    this.isStopped || this._next(u);
  }, s.prototype.error = function(u) {
    this.isStopped || (this.isStopped = !0, this._error(u));
  }, s.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, s.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, o.prototype.unsubscribe.call(this), this.destination = null);
  }, s.prototype._next = function(u) {
    this.destination.next(u);
  }, s.prototype._error = function(u) {
    try {
      this.destination.error(u);
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
})(Vi), V3 = (function() {
  function o(s) {
    this.partialObserver = s;
  }
  return o.prototype.next = function(s) {
    var u = this.partialObserver;
    if (u.next)
      try {
        u.next(s);
      } catch (c) {
        zi(c);
      }
  }, o.prototype.error = function(s) {
    var u = this.partialObserver;
    if (u.error)
      try {
        u.error(s);
      } catch (c) {
        zi(c);
      }
    else
      zi(s);
  }, o.prototype.complete = function() {
    var s = this.partialObserver;
    if (s.complete)
      try {
        s.complete();
      } catch (u) {
        zi(u);
      }
  }, o;
})(), zo = (function(o) {
  or(s, o);
  function s(u, c, f) {
    var h = o.call(this) || this, x;
    return Qt(u) || !u ? x = {
      next: u ?? void 0,
      error: c ?? void 0,
      complete: f ?? void 0
    } : x = u, h.destination = new V3(x), h;
  }
  return s;
})(Ko);
function zi(o) {
  Y3(o);
}
function X3(o) {
  throw o;
}
var Q3 = {
  closed: !0,
  next: g1,
  error: X3,
  complete: g1
}, Z3 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function $3(o) {
  return o;
}
function K3(o) {
  return o.length === 0 ? $3 : o.length === 1 ? o[0] : function(u) {
    return o.reduce(function(c, f) {
      return f(c);
    }, u);
  };
}
var p1 = (function() {
  function o(s) {
    s && (this._subscribe = s);
  }
  return o.prototype.lift = function(s) {
    var u = new o();
    return u.source = this, u.operator = s, u;
  }, o.prototype.subscribe = function(s, u, c) {
    var f = this, h = F3(s) ? s : new zo(s, u, c);
    return Ri(function() {
      var x = f, v = x.operator, p = x.source;
      h.add(v ? v.call(h, p) : p ? f._subscribe(h) : f._trySubscribe(h));
    }), h;
  }, o.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (u) {
      s.error(u);
    }
  }, o.prototype.forEach = function(s, u) {
    var c = this;
    return u = x1(u), new u(function(f, h) {
      var x = new zo({
        next: function(v) {
          try {
            s(v);
          } catch (p) {
            h(p), x.unsubscribe();
          }
        },
        error: h,
        complete: f
      });
      c.subscribe(x);
    });
  }, o.prototype._subscribe = function(s) {
    var u;
    return (u = this.source) === null || u === void 0 ? void 0 : u.subscribe(s);
  }, o.prototype[Z3] = function() {
    return this;
  }, o.prototype.pipe = function() {
    for (var s = [], u = 0; u < arguments.length; u++)
      s[u] = arguments[u];
    return K3(s)(this);
  }, o.prototype.toPromise = function(s) {
    var u = this;
    return s = x1(s), new s(function(c, f) {
      var h;
      u.subscribe(function(x) {
        return h = x;
      }, function(x) {
        return f(x);
      }, function() {
        return c(h);
      });
    });
  }, o.create = function(s) {
    return new o(s);
  }, o;
})();
function x1(o) {
  var s;
  return (s = o ?? q3.Promise) !== null && s !== void 0 ? s : Promise;
}
function J3(o) {
  return o && Qt(o.next) && Qt(o.error) && Qt(o.complete);
}
function F3(o) {
  return o && o instanceof Ko || J3(o) && F1(o);
}
function W3(o) {
  return Qt(o == null ? void 0 : o.lift);
}
function I3(o) {
  return function(s) {
    if (W3(s))
      return s.lift(function(u) {
        try {
          return o(u, this);
        } catch (c) {
          this.error(c);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function P3(o, s, u, c, f) {
  return new e5(o, s, u, c, f);
}
var e5 = (function(o) {
  or(s, o);
  function s(u, c, f, h, x, v) {
    var p = o.call(this, u) || this;
    return p.onFinalize = x, p.shouldUnsubscribe = v, p._next = c ? function(S) {
      try {
        c(S);
      } catch (A) {
        u.error(A);
      }
    } : o.prototype._next, p._error = h ? function(S) {
      try {
        h(S);
      } catch (A) {
        u.error(A);
      } finally {
        this.unsubscribe();
      }
    } : o.prototype._error, p._complete = f ? function() {
      try {
        f();
      } catch (S) {
        u.error(S);
      } finally {
        this.unsubscribe();
      }
    } : o.prototype._complete, p;
  }
  return s.prototype.unsubscribe = function() {
    var u;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var c = this.closed;
      o.prototype.unsubscribe.call(this), !c && ((u = this.onFinalize) === null || u === void 0 || u.call(this));
    }
  }, s;
})(Ko), t5 = K1(function(o) {
  return function() {
    o(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Jo = (function(o) {
  or(s, o);
  function s() {
    var u = o.call(this) || this;
    return u.closed = !1, u.currentObservers = null, u.observers = [], u.isStopped = !1, u.hasError = !1, u.thrownError = null, u;
  }
  return s.prototype.lift = function(u) {
    var c = new y1(this, this);
    return c.operator = u, c;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new t5();
  }, s.prototype.next = function(u) {
    var c = this;
    Ri(function() {
      var f, h;
      if (c._throwIfClosed(), !c.isStopped) {
        c.currentObservers || (c.currentObservers = Array.from(c.observers));
        try {
          for (var x = No(c.currentObservers), v = x.next(); !v.done; v = x.next()) {
            var p = v.value;
            p.next(u);
          }
        } catch (S) {
          f = { error: S };
        } finally {
          try {
            v && !v.done && (h = x.return) && h.call(x);
          } finally {
            if (f) throw f.error;
          }
        }
      }
    });
  }, s.prototype.error = function(u) {
    var c = this;
    Ri(function() {
      if (c._throwIfClosed(), !c.isStopped) {
        c.hasError = c.isStopped = !0, c.thrownError = u;
        for (var f = c.observers; f.length; )
          f.shift().error(u);
      }
    });
  }, s.prototype.complete = function() {
    var u = this;
    Ri(function() {
      if (u._throwIfClosed(), !u.isStopped) {
        u.isStopped = !0;
        for (var c = u.observers; c.length; )
          c.shift().complete();
      }
    });
  }, s.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(s.prototype, "observed", {
    get: function() {
      var u;
      return ((u = this.observers) === null || u === void 0 ? void 0 : u.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), s.prototype._trySubscribe = function(u) {
    return this._throwIfClosed(), o.prototype._trySubscribe.call(this, u);
  }, s.prototype._subscribe = function(u) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(u), this._innerSubscribe(u);
  }, s.prototype._innerSubscribe = function(u) {
    var c = this, f = this, h = f.hasError, x = f.isStopped, v = f.observers;
    return h || x ? J1 : (this.currentObservers = null, v.push(u), new Vi(function() {
      c.currentObservers = null, _o(v, u);
    }));
  }, s.prototype._checkFinalizedStatuses = function(u) {
    var c = this, f = c.hasError, h = c.thrownError, x = c.isStopped;
    f ? u.error(h) : x && u.complete();
  }, s.prototype.asObservable = function() {
    var u = new p1();
    return u.source = this, u;
  }, s.create = function(u, c) {
    return new y1(u, c);
  }, s;
})(p1), y1 = (function(o) {
  or(s, o);
  function s(u, c) {
    var f = o.call(this) || this;
    return f.destination = u, f.source = c, f;
  }
  return s.prototype.next = function(u) {
    var c, f;
    (f = (c = this.destination) === null || c === void 0 ? void 0 : c.next) === null || f === void 0 || f.call(c, u);
  }, s.prototype.error = function(u) {
    var c, f;
    (f = (c = this.destination) === null || c === void 0 ? void 0 : c.error) === null || f === void 0 || f.call(c, u);
  }, s.prototype.complete = function() {
    var u, c;
    (c = (u = this.destination) === null || u === void 0 ? void 0 : u.complete) === null || c === void 0 || c.call(u);
  }, s.prototype._subscribe = function(u) {
    var c, f;
    return (f = (c = this.source) === null || c === void 0 ? void 0 : c.subscribe(u)) !== null && f !== void 0 ? f : J1;
  }, s;
})(Jo);
function l5(o, s) {
  return I3(function(u, c) {
    var f = 0;
    u.subscribe(P3(c, function(h) {
      return o.call(s, h, f++) && c.next(h);
    }));
  });
}
const Ai = new Jo(), a5 = {
  /**
   * 发布事件
   */
  emit(o) {
    Ai.next({
      ...o,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(o) {
    const s = Ai.subscribe(o);
    return {
      unsubscribe: () => s.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(o, s) {
    const u = Ai.pipe(l5((c) => c.type === o)).subscribe((c) => s(c.payload));
    return {
      unsubscribe: () => u.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Ai.asObservable();
  }
};
var Me = /* @__PURE__ */ ((o) => (o[o.DEBUG = 0] = "DEBUG", o[o.INFO = 1] = "INFO", o[o.SUCCESS = 2] = "SUCCESS", o[o.WARN = 3] = "WARN", o[o.ERROR = 4] = "ERROR", o))(Me || {});
const Bi = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, W1 = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, I1 = new Jo();
let cl = [], ar = { ...W1 };
function n5(o) {
  return new Date(o).toTimeString().slice(0, 8);
}
function Pa(o, s, u, c) {
  if (o < ar.minLevel) return;
  const f = {
    id: L3(),
    timestamp: Date.now(),
    level: o,
    module: s,
    message: u,
    data: c
  };
  cl.push(f), cl.length > ar.maxEntries && (cl = cl.slice(-ar.maxEntries)), I1.next(f);
}
function r5() {
  a5.subscribe((o) => {
    const u = {
      INGESTION_START: Me.INFO,
      INGESTION_COMPLETE: Me.SUCCESS,
      ENTITY_CREATED: Me.INFO,
      MEMORY_STORED: Me.SUCCESS,
      RETRIEVAL_START: Me.DEBUG,
      RETRIEVAL_COMPLETE: Me.SUCCESS,
      CHAT_CHANGED: Me.INFO,
      MESSAGE_RECEIVED: Me.DEBUG
    }[o.type] ?? Me.DEBUG;
    Pa(u, "EventBus", `${o.type}`, o.payload);
  });
}
const ye = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(o) {
    o && (ar = { ...ar, ...o }), cl = [], r5(), ye.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(o, s, u) {
    Pa(Me.DEBUG, o, s, u);
  },
  /**
   * INFO 级别日志
   */
  info(o, s, u) {
    Pa(Me.INFO, o, s, u);
  },
  /**
   * SUCCESS 级别日志
   */
  success(o, s, u) {
    Pa(Me.SUCCESS, o, s, u);
  },
  /**
   * WARN 级别日志
   */
  warn(o, s, u) {
    Pa(Me.WARN, o, s, u);
  },
  /**
   * ERROR 级别日志
   */
  error(o, s, u) {
    Pa(Me.ERROR, o, s, u);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...cl];
  },
  /**
   * 订阅新日志
   */
  subscribe(o) {
    const s = I1.subscribe(o);
    return () => s.unsubscribe();
  },
  /**
   * 清空所有日志（仅内存）
   */
  clear() {
    cl = [], ye.info("Logger", "日志已清空");
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const o = /* @__PURE__ */ new Date();
    o.toISOString().slice(0, 10), o.toTimeString().slice(0, 8).replace(/:/g, "");
    const s = {
      [Me.DEBUG]: "DEBUG",
      [Me.INFO]: "INFO",
      [Me.SUCCESS]: "SUCCESS",
      [Me.WARN]: "WARN",
      [Me.ERROR]: "ERROR"
    };
    let u = `# Engram Debug Log

`;
    u += `- **导出时间**: ${o.toLocaleString("zh-CN")}
`, u += `- **版本**: 0.1.0
`, u += `- **日志条数**: ${cl.length}

`, u += `---

`, u += `## 日志记录

`, u += "```\n";
    for (const c of cl) {
      const f = n5(c.timestamp), h = s[c.level].padEnd(7), x = c.module.padEnd(16);
      if (u += `[${f}] [${x}] ${h} ${c.message}
`, c.data !== void 0) {
        const v = JSON.stringify(c.data, null, 2).split(`
`).map((p) => `    ${p}`).join(`
`);
        u += `${v}
`;
      }
    }
    return u += "```\n", u;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const o = /* @__PURE__ */ new Date(), s = o.toISOString().slice(0, 10), u = o.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${s}_${u}.md`;
  }
}, P1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: W1,
  LogLevel: Me,
  LogLevelConfig: Bi,
  Logger: ye
}, Symbol.toStringTag, { value: "Module" })), na = Object.freeze({
  theme: "odysseia",
  presets: {},
  templates: {},
  promptTemplates: [],
  hasSeenWelcome: !1,
  lastReadVersion: "0.0.0",
  summarizerConfig: {}
});
class Et {
  /**
   * 获取 SillyTavern context
   */
  static getContext() {
    var s, u;
    return (u = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : u.call(s);
  }
  /**
   * 获取扩展设置对象
   * 如果不存在则创建
   */
  static getExtensionSettings() {
    const s = this.getContext();
    return s != null && s.extensionSettings ? (s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...na }, ye.debug("SettingsManager", "Initialized engram settings with defaults"), this.save()), s.extensionSettings[this.EXTENSION_NAME]) : (ye.warn("SettingsManager", "SillyTavern context.extensionSettings not available"), { ...na });
  }
  /**
   * 初始化设置（在扩展加载时调用）
   * 确保所有必需的字段都存在
   */
  static initSettings() {
    const s = this.getContext();
    if (!(s != null && s.extensionSettings)) {
      ye.warn("SettingsManager", "Cannot init settings: context not available");
      return;
    }
    let u = !1;
    s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...na }, u = !0, ye.info("SettingsManager", "Created engram settings"));
    const c = s.extensionSettings[this.EXTENSION_NAME];
    for (const f of Object.keys(na))
      f in c || (c[f] = na[f], u = !0, ye.debug("SettingsManager", `Added missing field: ${f}`));
    u && this.save();
  }
  /**
   * Get a specific setting value
   */
  static get(s) {
    const c = this.getExtensionSettings()[s];
    return c !== void 0 ? c : na[s];
  }
  /**
   * Save a specific setting value
   * 直接更新 context.extensionSettings 中的字段
   */
  static set(s, u) {
    const c = this.getContext();
    if (!(c != null && c.extensionSettings)) {
      ye.warn("SettingsManager", "Cannot set: context.extensionSettings not available");
      return;
    }
    c.extensionSettings[this.EXTENSION_NAME] || (c.extensionSettings[this.EXTENSION_NAME] = { ...na }), c.extensionSettings[this.EXTENSION_NAME][s] = u, ye.debug("SettingsManager", `Set ${String(s)} = ${JSON.stringify(u)}`), this.save();
  }
  /**
   * 保存设置到服务器
   */
  static save() {
    const s = this.getContext();
    s != null && s.saveSettingsDebounced ? (s.saveSettingsDebounced(), ye.debug("SettingsManager", "Saved via context.saveSettingsDebounced")) : ye.warn("SettingsManager", "saveSettingsDebounced not available");
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
}
Xe(Et, "EXTENSION_NAME", "engram");
const i5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: Et
}, Symbol.toStringTag, { value: "Module" }));
class Hl {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let u = Et.loadSettings().theme;
    u || (u = localStorage.getItem(this.STORAGE_KEY), u && Et.set("theme", u));
    const c = Oi[u] ? u : "claudeDark";
    this.setTheme(c), ye.info("ThemeManager", `主题系统初始化完成: ${c}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    Oi[s] || (ye.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, Et.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
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
    const u = document.createElement("link");
    u.id = s, u.rel = "stylesheet", u.type = "text/css", u.href = `scripts/extensions/Engram_project/dist/style.css?v=${Date.now()}`, document.head.appendChild(u);
  }
  /**
   * 应用 CSS 变量到根元素
   */
  static applyThemeVariables(s) {
    const u = Oi[s];
    if (!u) return;
    const c = document.documentElement, f = (x, v) => {
      c.style.setProperty(x, v);
    };
    Object.entries(u.colors).forEach(([x, v]) => {
      let p = `--${x.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      p = p.replace(/(\d+)/, "-$1"), f(p, v);
    }), Object.entries(u.variables).forEach(([x, v]) => {
      f(`--${x}`, v);
    }), s !== "paperLight" ? c.classList.add("dark") : c.classList.remove("dark");
  }
}
Xe(Hl, "STORAGE_KEY", "engram-theme"), Xe(Hl, "currentTheme", "claudeDark");
const s5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Hl
}, Symbol.toStringTag, { value: "Module" })), e2 = O.createContext(void 0);
function t2({ children: o }) {
  const [s, u] = O.useState(Hl.getTheme()), c = s !== "paperLight", f = (h) => {
    Hl.setTheme(h), u(h);
  };
  return O.useEffect(() => {
    const h = Hl.getTheme();
    h !== s && u(h);
  }, []), /* @__PURE__ */ i.jsx(e2.Provider, { value: { theme: s, setTheme: f, isDarkMode: c }, children: o });
}
function u5() {
  const o = O.useContext(e2);
  if (o === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return o;
}
const o5 = ({ onNavigate: o }) => {
  const { setTheme: s } = u5(), [u, c] = O.useState(""), [f, h] = O.useState(!1), [x, v] = O.useState(0), [p, S] = O.useState(jo), A = O.useRef(null), j = [
    {
      id: "theme-paper-light",
      icon: x3,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: d1,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: d1,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: f1,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: f1,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  O.useEffect(() => {
    const H = _3(u), q = u.toLowerCase().trim(), te = j.filter(
      ($) => {
        var L;
        return !q || $.label.toLowerCase().includes(q) || ((L = $.description) == null ? void 0 : L.toLowerCase().includes(q)) || $.keywords.some((B) => B.toLowerCase().includes(q));
      }
    );
    S([...H, ...te]), v(0);
  }, [u]), O.useEffect(() => {
    const H = (q) => {
      (q.metaKey || q.ctrlKey) && q.key === "k" && (q.preventDefault(), h(!0));
    };
    return window.addEventListener("keydown", H), () => window.removeEventListener("keydown", H);
  }, []), O.useEffect(() => {
    f && setTimeout(() => {
      var H;
      return (H = A.current) == null ? void 0 : H.focus();
    }, 50);
  }, [f]);
  const D = (H) => {
    const q = p.length + (u ? 1 : 0);
    switch (H.key) {
      case "ArrowDown":
        H.preventDefault(), v((te) => (te + 1) % q);
        break;
      case "ArrowUp":
        H.preventDefault(), v((te) => (te - 1 + q) % q);
        break;
      case "Enter":
        H.preventDefault(), V();
        break;
      case "Escape":
        h(!1);
        break;
    }
  }, V = () => {
    p.length > 0 && x < p.length ? p[x].action(o) : u && (console.log("Searching memory for:", u), o("/memory")), h(!1), c("");
  };
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        onClick: () => h(!0),
        className: "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors border border-transparent hover:border-border",
        title: "搜索 (Cmd+K)",
        children: [
          /* @__PURE__ */ i.jsx(lr, { size: 18 }),
          /* @__PURE__ */ i.jsx("span", { className: "hidden md:inline text-xs opacity-70", children: "搜索..." }),
          /* @__PURE__ */ i.jsxs("kbd", { className: "hidden md:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-xs", children: "⌘" }),
            "K"
          ] })
        ]
      }
    ),
    f && /* @__PURE__ */ i.jsx(
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
        onClick: (H) => {
          H.target === H.currentTarget && h(!1);
        },
        children: /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "w-full max-w-xl border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-top-4 duration-200",
            style: {
              backgroundColor: "var(--popover)",
              // Force theme background color
              color: "var(--popover-foreground)"
            },
            children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border/50", children: [
                /* @__PURE__ */ i.jsx(lr, { size: 20, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ i.jsx(
                  "input",
                  {
                    ref: A,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: u,
                    onChange: (H) => c(H.target.value),
                    onKeyDown: D
                  }
                ),
                /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                p.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ i.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  p.map((H, q) => /* @__PURE__ */ i.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${q === x ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        H.action(o), h(!1), c("");
                      },
                      onMouseEnter: () => v(q),
                      children: [
                        /* @__PURE__ */ i.jsx(H.icon, { size: 18, className: `shrink-0 ${q === x ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsx("div", { className: "text-sm font-medium", children: H.label }),
                          H.description && /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: H.description })
                        ] }),
                        q === x && /* @__PURE__ */ i.jsx(c1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    },
                    H.id
                  ))
                ] }),
                u && /* @__PURE__ */ i.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50", children: [
                  /* @__PURE__ */ i.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "全站搜索" }),
                  /* @__PURE__ */ i.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${x === p.length ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => V(),
                      onMouseEnter: () => v(p.length),
                      children: [
                        /* @__PURE__ */ i.jsx(lr, { size: 18, className: `shrink-0 ${x === p.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ i.jsx("span", { className: "text-primary", children: u }),
                            '"'
                          ] }),
                          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        x === p.length && /* @__PURE__ */ i.jsx(c1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    }
                  )
                ] }),
                p.length === 0 && !u && /* @__PURE__ */ i.jsxs("div", { className: "px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ i.jsx(lr, { size: 32, className: "opacity-20 mb-2" }),
                  /* @__PURE__ */ i.jsx("p", { children: "输入关键词开始搜索..." })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}, Ao = ({ className: o = "", size: s = 24 }) => /* @__PURE__ */ i.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 592",
    width: s,
    height: s,
    className: o,
    "aria-label": "Engram Icon",
    children: /* @__PURE__ */ i.jsx(
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
), c5 = ({
  onToggleSidebar: o,
  isMobile: s,
  // Deprecated prop, handled by CSS
  onClose: u,
  onNavigate: c
}) => /* @__PURE__ */ i.jsxs("header", { className: "h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar/95 backdrop-blur z-50 transition-all duration-300 w-full flex-shrink-0", children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 w-16 md:w-64", children: [
    /* @__PURE__ */ i.jsx(
      "button",
      {
        className: "p-2 -ml-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden",
        onClick: o,
        title: "菜单",
        children: /* @__PURE__ */ i.jsx($h, { size: 20 })
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ i.jsx(Ao, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Ao, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 flex justify-center max-w-xl mx-2 md:mx-4", children: /* @__PURE__ */ i.jsx(o5, { onNavigate: c }) }),
  /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-2 w-16 md:w-64 justify-end", children: /* @__PURE__ */ i.jsx(
    "button",
    {
      className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
      onClick: u,
      title: "关闭扩展",
      children: /* @__PURE__ */ i.jsx(Yi, { size: 20 })
    }
  ) })
] }), d5 = ({ className: o = "", height: s = 24 }) => {
  const u = Math.round(s * 3.17);
  return /* @__PURE__ */ i.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "235 175 555 175",
      width: u,
      height: s,
      className: o,
      "aria-label": "Engram",
      children: [
        /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M752.3,294.5c-0.2-11.8-0.3-23.1-0.4-34.4c0-2.7,0-5.3-0.2-8c-0.6-6.4-4.1-10.1-9.8-10.9 c-6.9-0.9-12.2,2-14.5,7.9c-1,2.5-1.2,5.2-1.2,7.9c0,11,-0.3,22,0,33c0.1,5.2-1.7,6.9-6.7,6.4c-3.3-0.3-6.7-0.3-10,0 c-4.9,0.5-5.9-1.9-5.8-6.2c0.2-11.8,0.2-23.7,0-35.5c-0.2-9.4-5.4-14.3-14.1-13.5c-6.4,0.6-11.1,5.7-11.3,13 c-0.3,11.7-0.2,23.3-0.3,35c0,7.1,0,7.1-7.3,7.1c-3.3,0-6.7-0.1-10,0c-3.3,0.1-4.9-1.1-4.9-4.6c0.1-21.5,0-43-0.1-64.5 c0-2.9,1.3-4.3,4.2-4.3c3.2,0,6.3-0.1,9.5,0.1c4,0,8.8-1,7.5,6.6c8.6-6.1,16.9-8.7,26.3-7c5.2,1,10.1,2.7,13.7,6.6 c2.8,2.9,4.6,2.4,7.4,0c6.8-5.8,15-7.9,23.8-6.9c16.3,1.8,25.1,11.7,25.8,29.5c0.5,13.3,0.1,26.6,0.2,40 c0,3.4-1.2,5.1-4.7,4.7C763.8,295.7,757.9,298,752.3,294.5z" }),
        /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M463.1,324.1c-10.8-0.7-20.9-2.4-30.2-7.5c-3.6-2-5-4-2.4-7.8c2.3-3.4,4.1-7.1,6.5-11.3 c6.1,3.6,11.8,6.8,18.5,7.7c5.3,0.7,10.6,1.1,15.8-0.5c8.3-2.6,12.2-9.1,10.9-18.6c-9.1,7.5-19.3,8.6-30.2,6.4 c-7.8-1.6-14.2-5.6-19.2-11.8c-10.5-12.8-10.6-32.5-0.5-45.5c11.2-14.3,28.6-16.4,50.9-6.1c-0.4-6.2,3.5-6.3,8.1-6.2 c13,0.2,13,0.1,13,13c0,16.3-0.5,32.7,0.1,49C505.4,309.3,491.3,322.1,467.6,324C466.2,324.1,464.9,324.1,463.1,324.1z M482.1,252.6 c-0.6-2.1-1.6-4-3-5.7c-4.6-6-13.5-8.4-21.2-5.5c-7.4,2.7-11.1,8.9-10.6,17.8c0.4,7.4,5.7,13.5,13.6,15.2 C474.1,277.2,485.2,266.4,482.1,252.6z" }),
        /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M258.1,201.6c20.3,0,40.1,0.1,60-0.1c4.5,0,6.3,1.3,6.1,5.9c-0.4,14.6,2.1,12.6-12.7,12.7 c-10.7,0.1-21.3,0.1-32-0.1c-3.8-0.1-5.2,1-5.3,5.1c0,13.4-0.2,13.4,13.4,13.4c8.7,0,17.3,0.1,26,0c3.4-0.1,4.7,1.2,4.7,4.7 c-0.2,16.4,1.9,13.7-13.1,13.9c-8.8,0.1-17.7,0.1-26.5,0c-3.2,0-4.6,1.1-4.4,4.4c0.2,3.8,0.2,7.7,0,11.5 c-0.2,3.5,1.1,4.7,4.6,4.7c13.7-0.1,27.3,0.2,41-0.1c5.1-0.1,6.6,1.5,6.5,6.5c-0.2,12.3,0,12.3-12.1,12.3 c-18.7-0.1-37.3-0.2-56,0c-4.9,0.1-6.7-1.2-6.7-6.4c0.2-27.5,0.2-55,0-82.5C251.6,203,253,200.9,258.1,201.6z" }),
        /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M599.5,239.6c-5.6,0.9-10.6,2.1-15,4.9c-2.5,1.6-4,0.9-5.1-1.6c-0.9-2-1.9-3.9-2.9-5.8 c-3.1-6.1-3-6.4,3-9.3c11.6-5.6,23.9-7.1,36.5-4.6c15.1,2.9,23.6,12.8,24.1,28.7c0.4,13.3,0.1,26.6,0.2,40 c0,3.5-1.5,4.8-4.8,4.6c-3,0-6,0-9,0.1c-4.2,0.2-8.1,0.2-6.6-6.6c-12.4,9.5-24.9,10.4-37.7,3.9c-8.5-4.3-11.9-12-11.3-21.2 c0.6-9.1,5.9-15,14.4-17.9c5.7-1.9,11.6-2.8,17.7-2.8c4.6,0,9.3,0.5,13.8-0.4c1.9-7.2-7.4-13.5-17.2-11.9 M617.7,271.9 c-0.1-2.5,1-5.8-3.3-5.8c-5,0-10-0.1-15,0.2c-4,0.3-6.9,2.4-7.1,6.9c-0.2,4.5,2.2,7.2,6.3,8.4C606.5,283.8,613.8,280.3,617.7,271.9z" }),
        /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M346.2,222.9c2.6,0,4.8,0.1,7,0c4.7-0.4,8.1,0.7,7,7.3c6-4,11.6-7.1,18.2-7.9c18.2-2.1,34.8,7.7,35,29.4 c0.1,13.2-0.1,26.3,0.1,39.5c0,3.9-1.2,5.5-5.2,5.2c-4,0-8,0-12,0.2c-3.5,0.2-4.7-1.3-4.7-4.7c0.1-10.3,0.1-20.7,0-31 c0-2.3-0.1-4.7-0.5-7c-1.3-8.4-5.4-12.3-12.9-12.6c-8.4-0.3-14.3,3.9-16,11.9c-2,9.6-0.7,19.3-0.9,28.9 c-0.2,14.4,0,14.4-14.4,14.4c-7.8,0-7.9,0-7.9-8c0-19.5,0-39,0-58.5C339,223.3,339.2,223.2,346.2,222.9z" }),
        /* @__PURE__ */ i.jsx("path", { fill: "currentColor", d: "M543.2,258.4c-0.1,11.1-0.3,21.8-0.2,32.4c0,4-1.2,5.9-5.4,5.6c-4.3-0.3-8.7-0.1-13-0.1 c-2.7,0-3.9-1.3-3.9-4c0-21.8,0-43.6,0-65.5c0-2.8,1.3-3.9,3.9-4c2.8,0,5.7,0,8.5-0.1c4.8-0.2,9.6-0.5,8.7,6.4 c2.1,0.8,2.8-0.7,3.9-1.3c2.3-1.2,4.5-2.8,7-3.8c11.8-4.7,14.3-3,14.3,9.3c0,0.8-0.1,1.7,0,2.5c0.6,4.6-1,6.4-6,6.5 C550,242.6,544.8,247.5,543.2,258.4z" })
      ]
    }
  );
}, Mi = {
  timeOut: 5e3,
  extendedTimeOut: 1e3,
  closeButton: !0,
  progressBar: !0
}, sa = class sa {
  constructor() {
  }
  static getInstance() {
    return sa.instance || (sa.instance = new sa()), sa.instance;
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
  success(s, u = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.success(s, u, { ...Mi, ...c }) : console.log(`[Engram] SUCCESS: ${u} - ${s}`), ye.info("Notification", `Success: ${s}`);
  }
  /**
   * 发送信息通知
   */
  info(s, u = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.info(s, u, { ...Mi, ...c }) : console.log(`[Engram] INFO: ${u} - ${s}`), ye.info("Notification", `Info: ${s}`);
  }
  /**
   * 发送警告通知
   */
  warning(s, u = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.warning(s, u, { ...Mi, ...c }) : console.warn(`[Engram] WARNING: ${u} - ${s}`), ye.warn("Notification", `Warning: ${s}`);
  }
  /**
   * 发送错误通知
   */
  error(s, u = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.error(s, u, { ...Mi, timeOut: 8e3, ...c }) : console.error(`[Engram] ERROR: ${u} - ${s}`), ye.error("Notification", `Error: ${s}`);
  }
  /**
   * 清除所有通知
   */
  clear() {
    const s = this.getToastr();
    s && s.clear();
  }
};
Xe(sa, "instance");
let Mo = sa;
const ia = Mo.getInstance(), f5 = "0.2.0", m5 = {
  version: f5
}, Ja = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
  // 实际分支名是 master
}, wi = m5.version;
let Pn = null, er = null;
function yo(o, s) {
  const u = o.split(".").map(Number), c = s.split(".").map(Number);
  for (let f = 0; f < Math.max(u.length, c.length); f++) {
    const h = u[f] || 0, x = c[f] || 0;
    if (h > x) return 1;
    if (h < x) return -1;
  }
  return 0;
}
class ra {
  /**
   * 获取当前版本
   */
  static getCurrentVersion() {
    return wi;
  }
  /**
   * 从 GitHub 获取最新版本号
   */
  static async getLatestVersion() {
    if (Pn)
      return Pn;
    try {
      const s = `https://raw.githubusercontent.com/${Ja.owner}/${Ja.repo}/${Ja.branch}/manifest.json`, u = await fetch(s);
      return u.ok ? (Pn = (await u.json()).version || null, Pn) : null;
    } catch {
      return null;
    }
  }
  /**
   * 检查是否有更新
   */
  static async hasUpdate() {
    const s = await this.getLatestVersion();
    return s ? yo(s, wi) > 0 : !1;
  }
  /**
   * 获取更新日志
   */
  static async getChangelog() {
    if (er)
      return er;
    try {
      const s = `https://raw.githubusercontent.com/${Ja.owner}/${Ja.repo}/${Ja.branch}/CHANGELOG.md`, u = await fetch(s);
      return u.ok ? (er = await u.text(), er) : (console.warn("[Engram] UpdateService: 获取更新日志失败", u.status), ia.warning(`获取更新日志失败: ${u.status}`, "更新检测"), null);
    } catch (s) {
      return console.error("[Engram] UpdateService: 获取更新日志异常", s), ia.error("获取更新日志异常", "更新检测"), null;
    }
  }
  /**
   * 获取已读版本（上次用户确认查看的版本）
   */
  static getReadVersion() {
    try {
      return Et.get("lastReadVersion") || "0.0.0";
    } catch {
      return "0.0.0";
    }
  }
  /**
   * 标记版本已读
   */
  static async markAsRead(s) {
    const u = s || await this.getLatestVersion() || wi;
    try {
      Et.set("lastReadVersion", u), console.debug("[Engram] UpdateService: 已标记版本已读", u);
    } catch (c) {
      console.error("[Engram] UpdateService: 标记已读失败", c);
    }
  }
  /**
   * 检查是否有未读更新
   */
  static async hasUnreadUpdate() {
    const s = await this.getLatestVersion();
    if (!s || yo(s, wi) <= 0)
      return !1;
    const u = this.getReadVersion();
    return yo(s, u) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    Pn = null, er = null;
  }
}
const h5 = ({ isOpen: o, onClose: s }) => {
  const [u, c] = O.useState(!0), [f, h] = O.useState(null), [x, v] = O.useState(null), [p, S] = O.useState(!1), [A, j] = O.useState(!1), D = ra.getCurrentVersion();
  O.useEffect(() => {
    o && V();
  }, [o]);
  const V = async () => {
    c(!0);
    try {
      const [te, $, L] = await Promise.all([
        ra.getLatestVersion(),
        ra.getChangelog(),
        ra.hasUpdate()
      ]);
      h(te), v($), S(L);
    } catch (te) {
      console.error("[Engram] 加载更新信息失败", te);
    } finally {
      c(!1);
    }
  }, H = async () => {
    j(!0);
    try {
      const te = f || D;
      console.debug("[Engram] Marking update as read:", te), await ra.markAsRead(te), s();
    } finally {
      j(!1);
    }
  }, q = () => {
    ra.clearCache(), V();
  };
  return o ? /* @__PURE__ */ i.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ i.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: s
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/50", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ i.jsx(Ui, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("h2", { className: "text-base font-semibold text-foreground", children: "更新通知" }),
            /* @__PURE__ */ i.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "当前版本: v",
              D
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: q,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              title: "刷新",
              children: /* @__PURE__ */ i.jsx(tn, { size: 16, className: u ? "animate-spin" : "" })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: s,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ i.jsx(Yi, { size: 16 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-5", children: u ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(tn, { size: 24, className: "animate-spin mb-3" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "正在检查更新..." })
      ] }) : /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ i.jsx("div", { className: `
                                p-4 rounded-lg border
                                ${p ? "bg-primary/5 border-primary/20" : "bg-green-500/5 border-green-500/20"}
                            `, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
          p ? /* @__PURE__ */ i.jsx(Ui, { size: 20, className: "text-primary" }) : /* @__PURE__ */ i.jsx(Ho, { size: 20, className: "text-green-500" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("p", { className: "font-medium text-foreground", children: p ? `发现新版本: v${f}` : "已是最新版本" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: p ? "请手动更新扩展以获取新功能" : "无需更新" })
          ] })
        ] }) }),
        x && /* @__PURE__ */ i.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "更新日志" }),
          /* @__PURE__ */ i.jsx("div", { className: "bg-muted/20 rounded-lg p-4 max-h-64 overflow-y-auto", children: /* @__PURE__ */ i.jsxs("pre", { className: "text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed", children: [
            x.substring(0, 2e3),
            x.length > 2e3 && `

... (更多内容请查看完整日志)`
          ] }) })
        ] }),
        !x && !u && /* @__PURE__ */ i.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "无法获取更新日志" }) })
      ] }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "px-5 py-4 border-t border-border/50 flex justify-end gap-3", children: [
        /* @__PURE__ */ i.jsx(
          "button",
          {
            onClick: s,
            className: "px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "关闭"
          }
        ),
        p && /* @__PURE__ */ i.jsx(
          "button",
          {
            onClick: H,
            disabled: A,
            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            children: A ? "处理中..." : "我知道了"
          }
        )
      ] })
    ] })
  ] }) : null;
}, b1 = [
  { id: "dashboard", label: "仪表盘", icon: qh },
  { id: "memory", label: "记忆流", icon: uh },
  { id: "graph", label: "神经图谱", icon: X1 },
  { id: "processing", label: "数据处理", icon: th },
  { id: "presets", label: "API 预设", icon: sr },
  { id: "devlog", label: "开发日志", icon: ln },
  { id: "settings", label: "系统设置", icon: Zo }
], g5 = ({ children: o, activeTab: s, setActiveTab: u, onClose: c }) => {
  const [f, h] = O.useState(!1), [x, v] = O.useState(!1), [p, S] = O.useState(!1);
  return O.useEffect(() => {
    (async () => {
      try {
        const j = await ra.hasUnreadUpdate();
        S(j);
      } catch (j) {
        console.debug("[Engram] 检查更新失败", j);
      }
    })();
  }, []), /* @__PURE__ */ i.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ i.jsx(T3, {}),
    /* @__PURE__ */ i.jsx(
      h5,
      {
        isOpen: x,
        onClose: () => {
          v(!1), S(!1);
        }
      }
    ),
    /* @__PURE__ */ i.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50", children: [
      /* @__PURE__ */ i.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: b1.map((A) => {
        const j = A.icon, D = s === A.id;
        return /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => u(A.id),
            className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${D ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
            children: [
              /* @__PURE__ */ i.jsx(j, { size: 18, strokeWidth: D ? 2 : 1.5, className: "flex-shrink-0" }),
              /* @__PURE__ */ i.jsx("span", { className: `text-xs ${D ? "font-medium" : "font-normal"}`, children: A.label })
            ]
          },
          A.id
        );
      }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "pb-3 pt-2 border-t border-border/30 mt-2 space-y-2", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => v(!0),
            className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left",
            children: [
              /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ i.jsx(ah, { size: 16, strokeWidth: 1.5 }),
                p && /* @__PURE__ */ i.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ i.jsx("span", { className: "text-xs", children: "更新通知" }),
              p && /* @__PURE__ */ i.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
            ]
          }
        ),
        /* @__PURE__ */ i.jsx("div", { className: "opacity-40 text-muted-foreground px-2", children: /* @__PURE__ */ i.jsx(d5, { height: 12 }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ i.jsx(
        c5,
        {
          onToggleSidebar: () => h(!f),
          isMobile: !1,
          onClose: c,
          onNavigate: (A) => u(A.replace("/", ""))
        }
      ),
      f && /* @__PURE__ */ i.jsxs(
        "div",
        {
          className: "fixed inset-0 z-50 flex justify-start",
          style: { height: "100dvh", width: "100vw" },
          children: [
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",
                onClick: () => h(!1)
              }
            ),
            /* @__PURE__ */ i.jsxs(
              "div",
              {
                id: "mobile-menu-drawer",
                className: "relative w-64 max-w-[80vw] h-full bg-sidebar border-r border-border shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300",
                style: { height: "100dvh" },
                children: [
                  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
                    /* @__PURE__ */ i.jsx("span", { className: "text-lg font-semibold text-sidebar-foreground/80", children: "导航" }),
                    /* @__PURE__ */ i.jsx(
                      "button",
                      {
                        onClick: () => h(!1),
                        className: "p-2 -mr-2 rounded-md hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors",
                        children: /* @__PURE__ */ i.jsx(Yi, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i.jsx("nav", { className: "space-y-4 flex-1 overflow-y-auto", children: b1.map((A) => {
                    const j = s === A.id;
                    return /* @__PURE__ */ i.jsxs(
                      "button",
                      {
                        onClick: () => {
                          u(A.id), h(!1);
                        },
                        className: `
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${j ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                            `,
                        children: [
                          /* @__PURE__ */ i.jsx(A.icon, { size: 22, className: j ? "text-primary" : "text-muted-foreground/70" }),
                          /* @__PURE__ */ i.jsx("span", { children: A.label })
                        ]
                      },
                      A.id
                    );
                  }) }),
                  /* @__PURE__ */ i.jsx("div", { className: "mt-auto pt-6 border-t border-border/20", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 px-2 text-xs text-muted-foreground/50", children: [
                    /* @__PURE__ */ i.jsx(Ao, { size: 14 }),
                    /* @__PURE__ */ i.jsx("span", { children: "Engram v0.1.0" })
                  ] }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ i.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background", children: /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth", children: /* @__PURE__ */ i.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: o }) }) })
    ] }),
    "  "
  ] });
}, bo = ({
  title: o,
  value: s,
  icon: u,
  subtext: c,
  highlight: f = !1
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${f ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ i.jsx("div", { className: `p-2 rounded-lg ${f ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ i.jsx(u, { size: 20 }) }),
    f && /* @__PURE__ */ i.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: s }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: o }),
    c && /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: c })
  ] })
] });
function rr() {
  var o, s;
  try {
    return ((s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) || null;
  } catch (u) {
    return console.warn("[Engram] Failed to get ST context:", u), null;
  }
}
function p5() {
  const o = rr();
  return (o == null ? void 0 : o.chat) || [];
}
function x5() {
  return p5();
}
function y5() {
  return rr() !== null;
}
async function v1() {
  const { Logger: o } = await Promise.resolve().then(() => P1);
  await o.init(), o.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: s } = await Promise.resolve().then(() => i5);
  s.initSettings(), o.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: c } = await Promise.resolve().then(() => Eg), f = await c();
    o.info("TavernAPI", "酒馆接口对接状态", f);
  } catch (c) {
    o.warn("TavernAPI", "酒馆接口检查失败", { error: String(c) });
  }
  try {
    const { summarizerService: c } = await Promise.resolve().then(() => Xt);
    c.start();
    const f = c.getStatus();
    o.info("Summarizer", "服务已启动", f);
  } catch (c) {
    o.warn("Summarizer", "服务启动失败", { error: String(c) });
  }
  b5();
  const { ThemeManager: u } = await Promise.resolve().then(() => s5);
  u.init(), C5(), o.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const l2 = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function b5() {
  const o = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!o) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), v5();
    return;
  }
  const u = document.createElement("div");
  u.id = "engram-drawer", u.className = "drawer";
  const c = document.createElement("div");
  c.className = "drawer-toggle drawer-header";
  const f = document.createElement("div");
  f.id = "engram-drawer-icon", f.className = "drawer-icon fa-fw closedIcon", f.title = "Engram - 记忆操作系统", f.setAttribute("data-i18n", "[title]Engram - Memory OS"), f.innerHTML = l2, f.addEventListener("click", Li), c.appendChild(f), u.appendChild(c), s ? (o.insertBefore(u, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (o.appendChild(u), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function v5() {
  const o = document.createElement("div");
  o.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", o.title = "Engram - 记忆操作系统", o.innerHTML = l2, o.addEventListener("click", Li), document.body.appendChild(o);
}
let Hi = null;
function S5(o) {
  Hi = o, Hi = o;
}
let wo = null, S1 = null;
function j5(o) {
  wo = o;
}
function C5() {
  if (!wo) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const o = "engram-global-overlay";
  let s = document.getElementById(o);
  s || (s = document.createElement("div"), s.id = o, s.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(s)), S1 || (S1 = wo(s, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let vo = !1, tr = null, Di = null;
function Li() {
  vo && tr ? (Di && (Di.unmount(), Di = null), tr.remove(), tr = null, vo = !1) : (tr = N5(), document.body.appendChild(tr), vo = !0);
}
function N5() {
  var s;
  const o = document.createElement("div");
  return o.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", o.style.backgroundColor = "var(--background)", o.style.color = "var(--foreground)", o.style.height = "100dvh", o.style.width = "100vw", o.style.top = "0", o.style.left = "0", o.id = "engram-panel-root", Hi ? Di = Hi(o, Li) : (o.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = o.querySelector("button")) == null || s.addEventListener("click", Li)), o;
}
async function E5(o, s) {
  try {
    const c = await new Function("path", "return import(path)")("/scripts/chats.js");
    c && typeof c.hideChatMessageRange == "function" ? (await c.hideChatMessageRange(o, s, !1), console.log(`[Engram] Hidden messages range: ${o}-${s}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (u) {
    console.error("[Engram] Failed to hide messages:", u);
  }
}
const T5 = (o) => {
  switch (o) {
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
}, j1 = ({ onNavigate: o }) => {
  const [s, u] = O.useState([]), [c, f] = O.useState(rr()), [h, x] = O.useState(0);
  O.useEffect(() => (u(ye.getLogs().slice(0, 3)), ye.subscribe((j) => {
    u((D) => [j, ...D].slice(0, 3));
  })), []), O.useEffect(() => {
    const A = setInterval(() => {
      x((j) => j + 1);
    }, 1e3);
    return () => clearInterval(A);
  }, []);
  const v = (A) => {
    const j = Math.floor(A / 3600), D = Math.floor(A % 3600 / 60), V = A % 60;
    return `${j.toString().padStart(2, "0")}:${D.toString().padStart(2, "0")}:${V.toString().padStart(2, "0")}`;
  }, p = (c == null ? void 0 : c.name2) || "Unknown", S = (A) => {
    o && o(A);
  };
  return /* @__PURE__ */ i.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ i.jsx(
        bo,
        {
          title: "ACTIVE MODEL",
          value: c ? "Connected" : "Offline",
          subtext: c ? `Chatting with ${p}` : "Waiting for connection...",
          icon: Z1,
          highlight: !!c
        }
      ),
      /* @__PURE__ */ i.jsx(
        bo,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: sr
        }
      ),
      /* @__PURE__ */ i.jsx(
        bo,
        {
          title: "SYSTEM UPTIME",
          value: v(h),
          subtext: "Session Duration",
          icon: Lo
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx($o, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => S("memory"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => S("graph"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => S("processing"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => S("settings"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(ln, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ i.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => S("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map((A) => /* @__PURE__ */ i.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${T5(A.level)}`, children: [
        /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(A.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: A.message })
      ] }, A.id)) })
    ] })
  ] }) });
}, Xi = ({ title: o, subtitle: s, actions: u }) => /* @__PURE__ */ i.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: o }),
    s && /* @__PURE__ */ i.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: s })
  ] }),
  u && /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: u })
] }), C1 = ({
  icon: o,
  label: s,
  primary: u = !1,
  size: c = "md",
  className: f = "",
  ...h
}) => /* @__PURE__ */ i.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${c === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${u ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${f}
        `,
    ...h,
    children: [
      o && /* @__PURE__ */ i.jsx(o, { size: c === "sm" ? 14 : 16 }),
      s
    ]
  }
), _5 = () => {
  const [o] = O.useState([
    { id: "1", x: 250, y: 150, label: "User Input", type: "input" },
    { id: "2", x: 250, y: 300, label: "Memory Retriever", type: "process" },
    { id: "3", x: 100, y: 450, label: "Summary Agent", type: "output" },
    { id: "4", x: 400, y: 450, label: "Context Builder", type: "output" }
  ]), s = [
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
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Xo, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Qh, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Zo, { size: 16 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ i.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((u, c) => {
        const f = o.find((j) => j.id === u.source), h = o.find((j) => j.id === u.target);
        if (!f || !h) return null;
        const x = f.x + 150 / 2, v = f.y + 60, p = h.x + 150 / 2, S = h.y, A = `M ${x} ${v} C ${x} ${v + 50}, ${p} ${S - 50}, ${p} ${S}`;
        return /* @__PURE__ */ i.jsx("g", { children: /* @__PURE__ */ i.jsx("path", { d: A, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, c);
      })
    ] }),
    o.map((u) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "absolute w-[150px] group/node cursor-grab active:cursor-grabbing",
        style: { left: u.x, top: u.y },
        children: [
          u.type !== "input" && /* @__PURE__ */ i.jsx("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          u.type !== "output" && /* @__PURE__ */ i.jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          /* @__PURE__ */ i.jsxs("div", { className: `
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${u.type === "input" ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-border group-hover/node:border-border shadow-lg"}
                    `, children: [
            /* @__PURE__ */ i.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold", children: u.type }),
            /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-foreground font-medium flex items-center gap-2", children: [
              u.type === "input" && /* @__PURE__ */ i.jsx(ln, { size: 12, className: "text-blue-400" }),
              u.type === "process" && /* @__PURE__ */ i.jsx(Lo, { size: 12, className: "text-purple-400" }),
              u.type === "output" && /* @__PURE__ */ i.jsx(sr, { size: 12, className: "text-emerald-400" }),
              u.label
            ] })
          ] })
        ]
      },
      u.id
    ))
  ] });
}, z5 = () => /* @__PURE__ */ i.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ i.jsx(
    Xi,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i.jsx(C1, { icon: Vo, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ i.jsx(C1, { icon: Zo, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ i.jsx(_5, {}) })
] });
function A5(o) {
  return new Date(o).toTimeString().slice(0, 8);
}
const M5 = {
  [Me.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Me.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Me.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Me.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Me.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, w5 = ({ entry: o }) => {
  const [s, u] = O.useState(!1), c = o.data !== void 0, f = Bi[o.level], h = M5[o.level];
  return /* @__PURE__ */ i.jsxs("div", { className: "group", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                    flex items-start gap-3 px-2 py-1 rounded-sm transition-colors
                    hover:bg-white/[0.02]
                    ${c ? "cursor-pointer" : ""}
                `,
        onClick: () => c && u(!s),
        children: [
          /* @__PURE__ */ i.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: c ? s ? /* @__PURE__ */ i.jsx(nr, { size: 12 }) : /* @__PURE__ */ i.jsx(G1, { size: 12 }) : null }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: A5(o.timestamp) }),
          /* @__PURE__ */ i.jsx("span", { className: `
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${h.text} ${h.bg}
                `, children: f.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-500 shrink-0 text-[11px]", children: o.module }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-300 text-[11px] break-words flex-1 leading-relaxed", children: o.message })
        ]
      }
    ),
    s && c && /* @__PURE__ */ i.jsx("div", { className: "ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]", children: /* @__PURE__ */ i.jsx("pre", { className: "m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono", children: JSON.stringify(o.data, null, 2) }) })
  ] });
}, N1 = 100;
class k5 {
  constructor() {
    Xe(this, "entries", []);
    Xe(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * 创建新的日志条目（发送阶段）
   */
  logSend(s) {
    const u = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, c = {
      id: u,
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
    return this.entries.unshift(c), this.trimEntries(), this.notifyListeners(), u;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(s, u) {
    const c = this.entries.find((x) => x.id === s);
    if (!c) return;
    const f = {
      id: `${s}_recv`,
      timestamp: Date.now(),
      type: c.type,
      direction: "received",
      response: u.response,
      tokensReceived: u.tokensReceived,
      status: u.status,
      error: u.error,
      duration: u.duration,
      model: c.model,
      floorRange: c.floorRange
    };
    c.status = u.status, c.duration = u.duration;
    const h = this.entries.findIndex((x) => x.id === s);
    h >= 0 ? this.entries.splice(h, 0, f) : this.entries.unshift(f), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(s, u) {
    const c = this.logSend(s), f = Date.now();
    try {
      const h = await u();
      return this.logReceive(c, {
        response: typeof h == "string" ? h : JSON.stringify(h),
        status: "success",
        duration: Date.now() - f
      }), h;
    } catch (h) {
      throw this.logReceive(c, {
        status: "error",
        error: h instanceof Error ? h.message : String(h),
        duration: Date.now() - f
      }), h;
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
    const s = [], u = this.entries.filter((c) => c.direction === "sent");
    for (const c of u) {
      const f = this.entries.find(
        (h) => h.id === `${c.id}_recv` && h.direction === "received"
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
    this.entries.length > N1 * 2 && (this.entries = this.entries.slice(0, N1 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const en = new k5(), O5 = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, R5 = ({ status: o }) => {
  switch (o) {
    case "pending":
      return /* @__PURE__ */ i.jsx(V1, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ i.jsx(Ho, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ i.jsx(Bo, { size: 14, className: "text-red-400" });
  }
}, D5 = (o) => new Date(o).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), U5 = (o) => o === void 0 ? "-" : o < 1e3 ? `${o}ms` : `${(o / 1e3).toFixed(1)}s`, B5 = ({ sent: o, received: s }) => {
  const [u, c] = O.useState(!1), f = O5[o.type];
  return /* @__PURE__ */ i.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => c(!u),
        children: [
          u ? /* @__PURE__ */ i.jsx(nr, { size: 14 }) : /* @__PURE__ */ i.jsx(G1, { size: 14 }),
          /* @__PURE__ */ i.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${f.color}`, children: f.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: D5(o.timestamp) }),
          /* @__PURE__ */ i.jsx(R5, { status: (s == null ? void 0 : s.status) || o.status }),
          o.floorRange && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            o.floorRange[0],
            "-",
            o.floorRange[1]
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ i.jsx(vh, { size: 12 }),
            U5((s == null ? void 0 : s.duration) || o.duration)
          ] })
        ]
      }
    ),
    u && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ i.jsx(f3, { size: 14 }),
          "发送",
          o.tokensSent && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            o.tokensSent,
            " tokens"
          ] })
        ] }),
        o.systemPrompt && /* @__PURE__ */ i.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: o.systemPrompt })
        ] }),
        o.userPrompt && /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: o.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ i.jsx(H1, { size: 14 }),
          "接收",
          (s == null ? void 0 : s.tokensReceived) && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            s.tokensReceived,
            " tokens"
          ] })
        ] }),
        (s == null ? void 0 : s.status) === "error" && s.error && /* @__PURE__ */ i.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: s.error }),
        (s == null ? void 0 : s.response) && /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: s.response }),
        !s && o.status === "pending" && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(V1, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, H5 = () => {
  const [o, s] = O.useState(en.getPaired());
  return O.useEffect(() => en.subscribe(() => {
    s(en.getPaired());
  }), []), /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx($o, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          o.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => en.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ i.jsx(ur, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: o.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ i.jsx(H1, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-3", children: o.map(({ sent: u, received: c }) => /* @__PURE__ */ i.jsx(B5, { sent: u, received: c }, u.id)) }) })
  ] });
}, qi = ({ tabs: o, activeTab: s, onChange: u, sticky: c = !0, top: f = 0, className: h = "" }) => /* @__PURE__ */ i.jsx(
  "div",
  {
    className: `
            flex overflow-x-auto gap-2 mb-6 pb-1 no-scrollbar border-b border-border
            ${c ? "sticky z-10 bg-background pt-4 pb-2 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12" : "px-0"}
            ${h}
        `,
    style: c ? { top: f } : void 0,
    children: o.map((x) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        onClick: () => u(x.id),
        className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === x.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          x.icon && /* @__PURE__ */ i.jsx("span", { className: "w-4 h-4", children: x.icon }),
          x.label,
          s === x.id && /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" })
        ]
      },
      x.id
    ))
  }
), L5 = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ i.jsx(ln, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ i.jsx($o, { size: 14 }) }
], q5 = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], G5 = () => {
  const [o, s] = O.useState("runtime"), [u, c] = O.useState([]), [f, h] = O.useState([]), [x, v] = O.useState(""), [p, S] = O.useState(-1), [A, j] = O.useState("ALL"), [D, V] = O.useState(!0), [H, q] = O.useState(!1), [te, $] = O.useState(!1), L = O.useRef(null);
  O.useEffect(() => {
    c(ye.getLogs());
    const F = ye.subscribe((ie) => {
      c((W) => [...W, ie]);
    });
    return () => F();
  }, []), O.useEffect(() => {
    let F = u;
    if (p !== -1 && (F = F.filter((ie) => ie.level >= p)), A !== "ALL" && (F = F.filter((ie) => ie.module.startsWith(A))), x.trim()) {
      const ie = x.toLowerCase();
      F = F.filter(
        (W) => W.message.toLowerCase().includes(ie) || W.module.toLowerCase().includes(ie)
      );
    }
    h(F);
  }, [u, p, A, x]), O.useEffect(() => {
    D && L.current && L.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [f, D]);
  const B = O.useCallback(async () => {
    await ye.clear(), c([]);
  }, []), re = O.useCallback(() => {
    const F = ye.exportToMarkdown(), ie = ye.getExportFilename(), W = new Blob([F], { type: "text/markdown" }), he = URL.createObjectURL(W), Le = document.createElement("a");
    Le.href = he, Le.download = ie, Le.click(), URL.revokeObjectURL(he), ye.success("DevLog", `日志已导出: ${ie}`);
  }, []);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ i.jsx(
      qi,
      {
        tabs: L5,
        activeTab: o,
        onChange: (F) => s(F),
        sticky: !0
      }
    ),
    o === "runtime" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col flex-1 min-h-0", children: [
      /* @__PURE__ */ i.jsx("div", { className: "sticky top-[52px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => q(!H),
              children: [
                p === -1 ? "全部级别" : Bi[p].label,
                /* @__PURE__ */ i.jsx(nr, { size: 12 })
              ]
            }
          ),
          H && /* @__PURE__ */ i.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  S(-1), q(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(Bi).map(([F, ie]) => /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  S(Number(F)), q(!1);
                },
                children: [
                  ie.icon,
                  " ",
                  ie.label
                ]
              },
              F
            ))
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => $(!te),
              children: [
                A,
                /* @__PURE__ */ i.jsx(nr, { size: 12 })
              ]
            }
          ),
          te && /* @__PURE__ */ i.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto", children: q5.map((F) => /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                j(F), $(!1);
              },
              children: F
            },
            F
          )) })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(lr, { size: 12 }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: x,
              onChange: (F) => v(F.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${D ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => V(!D),
              title: "自动滚动",
              children: /* @__PURE__ */ i.jsx(P4, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: B,
              title: "清空",
              children: /* @__PURE__ */ i.jsx(ur, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: re,
              children: [
                /* @__PURE__ */ i.jsx(Ui, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: f.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(ln, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        f.map((F) => /* @__PURE__ */ i.jsx(w5, { entry: F }, F.id)),
        /* @__PURE__ */ i.jsx("div", { ref: L })
      ] }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        u.length,
        " 条日志",
        f.length !== u.length && ` · ${f.length} 条匹配`
      ] })
    ] }),
    o === "model" && /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ i.jsx(H5, {}) })
  ] });
}, Y5 = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, V5 = ({
  icon: o,
  title: s,
  subtitle: u,
  meta: c,
  badges: f = [],
  selected: h = !1,
  disabled: x = !1,
  toggle: v,
  onClick: p,
  actions: S = [],
  className: A = "",
  compact: j = !1
}) => {
  const D = S.filter((H) => !H.hidden), V = !!v;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${j ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${h ? "bg-accent/60" : "hover:bg-muted/40"}
                ${x ? "opacity-50 pointer-events-none" : ""}
                ${A}
            `,
      onClick: p,
      children: [
        (o || V) && /* @__PURE__ */ i.jsx("div", { className: "flex-shrink-0", children: V ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${v.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (H) => {
              H.stopPropagation(), v.onChange(!v.checked);
            },
            children: /* @__PURE__ */ i.jsx(Qo, { size: 14 })
          }
        ) : /* @__PURE__ */ i.jsx("div", { className: `
                            w-7 h-7 flex items-center justify-center rounded-md transition-colors
                            ${h ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                        `, children: o }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i.jsx("span", { className: `
                        text-sm font-medium truncate transition-colors
                        ${h ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                        ${v && !v.checked ? "line-through opacity-60" : ""}
                    `, children: s }),
            f.map((H, q) => /* @__PURE__ */ i.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${Y5[H.color || "default"]}
                            `,
                children: H.text
              },
              q
            ))
          ] }),
          (u || c) && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            u && /* @__PURE__ */ i.jsx("span", { className: "truncate", children: u }),
            c && /* @__PURE__ */ i.jsx("span", { className: "flex-shrink-0 font-mono", children: c })
          ] })
        ] }),
        h && !D.length && /* @__PURE__ */ i.jsx(q1, { size: 14, className: "text-primary flex-shrink-0" }),
        D.length > 0 && /* @__PURE__ */ i.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${h ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: D.map((H, q) => /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `
                                p-1.5 rounded transition-colors
                                ${H.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                            `,
            onClick: (te) => {
              te.stopPropagation(), H.onClick(te);
            },
            title: H.title,
            children: H.icon
          },
          q
        )) })
      ]
    }
  );
}, X5 = ({
  preset: o,
  isSelected: s,
  onSelect: u,
  onEdit: c,
  onCopy: f,
  onDelete: h
}) => {
  var p;
  const x = o.source === "tavern" || o.source === "tavern_profile" ? Z1 : jh, v = o.source === "custom" ? ((p = o.custom) == null ? void 0 : p.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ i.jsx(
    V5,
    {
      icon: /* @__PURE__ */ i.jsx(x, { size: 14 }),
      title: o.name,
      subtitle: v,
      meta: `T:${o.parameters.temperature}`,
      badges: o.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: s,
      onClick: u,
      actions: [
        { icon: /* @__PURE__ */ i.jsx(e3, { size: 12 }), onClick: () => c(), title: "编辑" },
        { icon: /* @__PURE__ */ i.jsx(Y1, { size: 12 }), onClick: () => f(), title: "复制" },
        { icon: /* @__PURE__ */ i.jsx(ur, { size: 12 }), onClick: () => h(), title: "删除", danger: !0, hidden: o.isDefault }
      ]
    }
  );
}, Nt = ({ title: o, description: s, children: u, className: c = "" }) => /* @__PURE__ */ i.jsxs("div", { className: `mb-8 ${c}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-foreground", children: o }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "space-y-4", children: u })
] }), dt = ({
  label: o,
  description: s,
  error: u,
  required: c,
  className: f = "",
  value: h,
  onChange: x,
  placeholder: v,
  type: p = "text",
  disabled: S,
  multiline: A,
  rows: j = 3
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${f}`, children: [
  /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    o,
    c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "relative group", children: A ? /* @__PURE__ */ i.jsx(
    "textarea",
    {
      value: h,
      onChange: (D) => x(D.target.value),
      placeholder: v,
      disabled: S,
      rows: j,
      className: `
                            engram-input w-full bg-transparent text-foreground text-sm px-3 py-2 border border-input rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) : /* @__PURE__ */ i.jsx(
    "input",
    {
      type: p,
      value: h,
      onChange: (D) => x(D.target.value),
      placeholder: v,
      disabled: S,
      className: `
                            engram-input w-full bg-transparent text-foreground text-sm px-3 py-2 border border-input rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) }),
  s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: s }),
  u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: u })
] }), Ul = ({
  label: o,
  description: s,
  error: u,
  required: c,
  className: f = "",
  value: h,
  onChange: x,
  min: v,
  max: p,
  step: S = 1,
  showSlider: A = !0
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${f}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
      o,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded", children: h })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
    A && v !== void 0 && p !== void 0 && /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "range",
        min: v,
        max: p,
        step: S,
        value: h,
        onChange: (j) => x(Number(j.target.value)),
        className: "flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
      }
    ),
    /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "number",
        min: v,
        max: p,
        step: S,
        value: h,
        onChange: (j) => x(Number(j.target.value)),
        className: `
                        bg-transparent border border-input rounded-md text-foreground text-xs px-2 py-1 font-mono text-center
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-20
                        [appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
                    `
      }
    )
  ] }),
  s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: s }),
  u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: u })
] }), oa = ({
  label: o,
  description: s,
  error: u,
  required: c,
  className: f = "",
  value: h,
  onChange: x,
  options: v,
  placeholder: p = "Select...",
  disabled: S
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1.5 ${f}`, children: [
  /* @__PURE__ */ i.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    o,
    c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ i.jsxs(
      "select",
      {
        value: h,
        onChange: (A) => x(A.target.value),
        disabled: S,
        className: `
                        engram-select w-full bg-transparent text-foreground text-sm pl-3 pr-8 py-2 border border-input rounded-md
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `,
        children: [
          /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: p }),
          v.map((A) => /* @__PURE__ */ i.jsx("option", { value: A.value, className: "bg-popover text-foreground", children: A.label }, A.value))
        ]
      }
    ),
    /* @__PURE__ */ i.jsx(nr, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" })
  ] }),
  s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: s }),
  u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: u })
] }), ko = ({
  label: o,
  description: s,
  error: u,
  className: c = "",
  checked: f,
  onChange: h,
  disabled: x
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex items-start justify-between gap-4 py-1 ${c} ${x ? "opacity-50 pointer-events-none" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ i.jsx("label", { className: "text-xs font-medium text-foreground cursor-pointer", onClick: () => !x && h(!f), children: o }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/80 mt-0.5", children: s }),
    u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: u })
  ] }),
  /* @__PURE__ */ i.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": f,
      onClick: () => !x && h(!f),
      disabled: x,
      className: `
                    relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                    ${f ? "bg-primary" : "bg-input"}
                `,
      children: /* @__PURE__ */ i.jsx(
        "span",
        {
          className: `
                        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${f ? "translate-x-4" : "translate-x-0"}
                    `
        }
      )
    }
  )
] }), Q5 = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], Z5 = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function $5() {
  var o, s, u, c;
  try {
    const f = (u = (s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) == null ? void 0 : u.extensionSettings;
    return ((c = f == null ? void 0 : f.connectionManager) == null ? void 0 : c.profiles) || [];
  } catch (f) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", f), [];
  }
}
const K5 = ({
  preset: o,
  onChange: s,
  isNew: u = !1
}) => {
  var q, te, $, L;
  const [c, f] = O.useState([]), [h, x] = O.useState(!1), v = () => {
    x(!0);
    try {
      const B = $5();
      f(B);
    } finally {
      x(!1);
    }
  };
  O.useEffect(() => {
    v();
  }, []);
  const p = (B) => {
    s({ ...o, ...B, updatedAt: Date.now() });
  }, S = (B, re) => {
    p({
      parameters: { ...o.parameters, [B]: re }
    });
  }, A = (B, re) => {
    p({
      context: { ...o.context, [B]: re }
    });
  }, j = (B, re) => {
    var F, ie, W, he;
    p({
      custom: {
        apiUrl: ((F = o.custom) == null ? void 0 : F.apiUrl) || "",
        apiKey: ((ie = o.custom) == null ? void 0 : ie.apiKey) || "",
        model: ((W = o.custom) == null ? void 0 : W.model) || "",
        apiSource: ((he = o.custom) == null ? void 0 : he.apiSource) || "openai",
        [B]: re
      }
    });
  }, D = (B) => {
    const re = B;
    p({
      source: re,
      tavernProfileId: re === "tavern_profile" ? o.tavernProfileId : void 0
    }), re === "tavern_profile" && v();
  }, V = c.map((B) => ({
    value: B.id,
    label: `${B.name} (${B.api || "Unknown"} - ${B.model || "Unknown"})`
  })), H = c.find((B) => B.id === o.tavernProfileId);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(Nt, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "预设名称",
          value: o.name,
          onChange: (B) => p({ name: B }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        oa,
        {
          label: "配置源",
          value: o.source,
          onChange: D,
          options: Z5,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    o.source === "tavern_profile" && /* @__PURE__ */ i.jsxs(Nt, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ i.jsx(
          oa,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: o.tavernProfileId || "",
            onChange: (B) => p({ tavernProfileId: B }),
            options: V,
            placeholder: h ? "加载中..." : "请选择配置文件",
            disabled: h || V.length === 0
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: v,
            disabled: h,
            title: "刷新配置列表",
            children: /* @__PURE__ */ i.jsx(tn, { size: 16, className: h ? "animate-spin" : "" })
          }
        )
      ] }),
      V.length === 0 && !h && /* @__PURE__ */ i.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      H && /* @__PURE__ */ i.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: H.api || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: H.model || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: H.preset || "-" })
        ] })
      ] })
    ] }),
    o.source === "custom" && /* @__PURE__ */ i.jsxs(Nt, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ i.jsx(
        oa,
        {
          label: "API 类型",
          value: ((q = o.custom) == null ? void 0 : q.apiSource) || "openai",
          onChange: (B) => j("apiSource", B),
          options: Q5
        }
      ),
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "API URL",
          type: "url",
          value: ((te = o.custom) == null ? void 0 : te.apiUrl) || "",
          onChange: (B) => j("apiUrl", B),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "API Key",
          type: "password",
          value: (($ = o.custom) == null ? void 0 : $.apiKey) || "",
          onChange: (B) => j("apiKey", B),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "模型名称",
          value: ((L = o.custom) == null ? void 0 : L.model) || "",
          onChange: (B) => j("model", B),
          placeholder: "gpt-4o-mini",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(Nt, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ i.jsx(
        Ul,
        {
          label: "温度 (Temperature)",
          value: o.parameters.temperature,
          onChange: (B) => S("temperature", B),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ul,
        {
          label: "Top-P",
          value: o.parameters.topP,
          onChange: (B) => S("topP", B),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ul,
        {
          label: "最大输出 Tokens",
          value: o.parameters.maxTokens,
          onChange: (B) => S("maxTokens", B),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ul,
        {
          label: "频率惩罚",
          value: o.parameters.frequencyPenalty,
          onChange: (B) => S("frequencyPenalty", B),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ul,
        {
          label: "存在惩罚",
          value: o.parameters.presencePenalty,
          onChange: (B) => S("presencePenalty", B),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(Nt, { title: "上下文设置", description: "控制发送给模型的上下文内容", children: /* @__PURE__ */ i.jsx(
      Ul,
      {
        label: "聊天历史条数",
        value: o.context.maxChatHistory,
        onChange: (B) => A("maxChatHistory", B),
        min: 0,
        max: 100,
        step: 1,
        showSlider: !1,
        description: "使用多少条聊天历史（0 表示不使用）"
      }
    ) })
  ] });
}, J5 = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], E1 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, T1 = ["ollama", "vllm"], _1 = ["openai", "cohere", "jina", "voyage"], F5 = ({
  config: o,
  onChange: s
}) => {
  var x;
  const u = (v) => {
    s({ ...o, ...v });
  }, c = (v) => {
    u({
      source: v,
      model: E1[v],
      apiUrl: T1.includes(v) ? o.apiUrl : void 0,
      apiKey: _1.includes(v) ? o.apiKey : void 0
    });
  }, f = T1.includes(o.source), h = _1.includes(o.source);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(Nt, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ i.jsx(
        oa,
        {
          label: "向量源",
          value: o.source,
          onChange: (v) => c(v),
          options: J5,
          description: "选择向量化服务提供商"
        }
      ),
      f && /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "API URL",
          type: "url",
          value: o.apiUrl || "",
          onChange: (v) => u({ apiUrl: v }),
          placeholder: o.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${o.source} 服务的 API 端点`
        }
      ),
      h && /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "API Key",
          type: "password",
          value: o.apiKey || "",
          onChange: (v) => u({ apiKey: v }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "模型名称",
          value: o.model || "",
          onChange: (v) => u({ model: v }),
          placeholder: E1[o.source],
          description: "使用的向量化模型"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(Nt, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ i.jsx(
      dt,
      {
        label: "向量维度",
        value: ((x = o.dimensions) == null ? void 0 : x.toString()) || "",
        onChange: (v) => {
          const p = parseInt(v, 10);
          u({ dimensions: isNaN(p) ? void 0 : p });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, W5 = [
  "BAAI/bge-reranker-v2-m3",
  "BAAI/bge-reranker-base",
  "BAAI/bge-reranker-large",
  "cross-encoder/ms-marco-MiniLM-L-12-v2",
  "Xenova/ms-marco-MiniLM-L-6-v2"
], I5 = ({
  config: o,
  onChange: s
}) => {
  const u = (c) => {
    s({ ...o, ...c });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsx(Nt, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ i.jsx(
      ko,
      {
        label: "启用 Rerank",
        checked: o.enabled,
        onChange: (c) => u({ enabled: c }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    o.enabled && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs(Nt, { title: "API 配置", children: [
        /* @__PURE__ */ i.jsx(
          dt,
          {
            label: "API URL",
            type: "url",
            value: o.url,
            onChange: (c) => u({ url: c }),
            placeholder: "http://localhost:8000/rerank",
            description: "Rerank 服务的 API 端点",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          dt,
          {
            label: "API Key",
            type: "password",
            value: o.apiKey,
            onChange: (c) => u({ apiKey: c }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ i.jsx(
            dt,
            {
              label: "模型名称",
              value: o.model,
              onChange: (c) => u({ model: c }),
              placeholder: "BAAI/bge-reranker-v2-m3",
              description: "使用的 Rerank 模型",
              required: !0
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("span", { className: "block text-[10px] text-muted-foreground mb-2", children: "常用模型：" }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: W5.map((c) => /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `
                                                px-2.5 py-1 border rounded text-xs cursor-pointer transition-all 
                                                ${o.model === c ? "bg-accent border-input text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}
                                            `,
                onClick: () => u({ model: c }),
                children: c.split("/").pop()
              },
              c
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs(Nt, { title: "参数设置", children: [
        /* @__PURE__ */ i.jsx(
          Ul,
          {
            label: "Top-N",
            value: o.topN,
            onChange: (c) => u({ topN: c }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ i.jsx(
          Ul,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: o.hybridAlpha,
            onChange: (c) => u({ hybridAlpha: c }),
            min: 0,
            max: 1,
            step: 0.1,
            description: "0 = 纯向量检索评分，1 = 纯 Rerank 评分"
          }
        )
      ] })
    ] })
  ] });
}, Gi = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], P5 = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, eg = {
  maxChatHistory: 10
}, tg = {
  source: "transformers"
}, lg = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function a2(o = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: o,
    source: "tavern",
    parameters: { ...P5 },
    context: { ...eg },
    isDefault: !0,
    createdAt: s,
    updatedAt: s
  };
}
function ua(o, s, u = {}) {
  const c = Date.now();
  return {
    id: `template_${c}_${Math.random().toString(36).slice(2, 8)}`,
    name: o,
    category: s,
    enabled: u.enabled ?? !1,
    isBuiltIn: u.isBuiltIn ?? !1,
    boundPresetId: u.boundPresetId ?? null,
    systemPrompt: u.systemPrompt ?? "",
    userPromptTemplate: u.userPromptTemplate ?? "",
    outputFormat: u.outputFormat ?? "plain",
    availableVariables: u.availableVariables ?? ["{{chatHistory}}", "{{context}}", "{{char}}", "{{user}}"],
    createdAt: c,
    updatedAt: c
  };
}
function ag() {
  return [
    ua("纯文本剧情总结", "text_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: `<system_configuration>
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
      userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
      outputFormat: "plain"
    }),
    ua("向量化剧情总结", "vector_summary", {
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
    ua("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: "你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。",
      userPromptTemplate: `请将以下多条剧情摘要合并精简：

{{context}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    ua("查询增强", "query_enhance", {
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
const ng = {
  enabled: !0,
  includeGlobal: !0
}, rg = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  floorLimit: 50,
  countLimit: 5
};
function ig() {
  return {
    llmPresets: [a2()],
    selectedPresetId: null,
    vectorConfig: { ...tg },
    rerankConfig: { ...lg },
    promptTemplates: ag(),
    worldbookConfig: { ...ng }
  };
}
function sg(o) {
  switch (o) {
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
function ug(o) {
  var s;
  return ((s = Gi.find((u) => u.value === o)) == null ? void 0 : s.label) || o;
}
const og = ({
  template: o,
  isSelected: s = !1,
  onSelect: u,
  onCopy: c,
  onDelete: f,
  onToggleEnabled: h,
  onImport: x
}) => {
  const v = O.useRef(null), p = (j) => {
    j.stopPropagation();
    const D = {
      version: "1.0",
      exportedAt: Date.now(),
      template: {
        name: o.name,
        category: o.category,
        boundPresetId: o.boundPresetId,
        systemPrompt: o.systemPrompt,
        userPromptTemplate: o.userPromptTemplate,
        outputFormat: o.outputFormat,
        availableVariables: o.availableVariables
      }
    }, V = new Blob([JSON.stringify(D, null, 2)], { type: "application/json" }), H = URL.createObjectURL(V), q = document.createElement("a");
    q.href = H, q.download = `engram_template_${o.name.replace(/\s+/g, "_")}.json`, q.click(), URL.revokeObjectURL(H);
  }, S = (j) => {
    var D;
    j.stopPropagation(), (D = v.current) == null || D.click();
  }, A = (j) => {
    var H;
    const D = (H = j.target.files) == null ? void 0 : H[0];
    if (!D || !x) return;
    const V = new FileReader();
    V.onload = (q) => {
      var te;
      try {
        const $ = JSON.parse((te = q.target) == null ? void 0 : te.result);
        if ($.version && $.template) {
          const L = ua(
            $.template.name,
            $.template.category,
            {
              enabled: o.enabled,
              // 保持当前启用状态
              isBuiltIn: o.isBuiltIn,
              // 保持内置状态
              boundPresetId: $.template.boundPresetId,
              systemPrompt: $.template.systemPrompt,
              userPromptTemplate: $.template.userPromptTemplate,
              outputFormat: $.template.outputFormat,
              availableVariables: $.template.availableVariables
            }
          );
          L.id = o.id, x(L);
        }
      } catch ($) {
        console.error("导入失败:", $);
      }
    }, V.readAsText(D), v.current && (v.current.value = "");
  };
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${s ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: u,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${o.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (j) => {
                j.stopPropagation(), h == null || h(!o.enabled);
              },
              children: /* @__PURE__ */ i.jsx(Qo, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: o.name }),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ i.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${sg(o.category)}`, children: ug(o.category) }),
                o.isBuiltIn && /* @__PURE__ */ i.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ i.jsx("span", { className: "truncate max-w-[120px]", children: o.boundPresetId ? `BOUND: ${o.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ i.jsx("span", { children: o.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${s || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: S, title: "Import", children: /* @__PURE__ */ i.jsx(C3, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: p, title: "Export", children: /* @__PURE__ */ i.jsx(Ui, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (j) => {
            j.stopPropagation(), c == null || c();
          }, title: "Copy", children: /* @__PURE__ */ i.jsx(Y1, { size: 12 }) }),
          !o.isBuiltIn && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (j) => {
            j.stopPropagation(), f == null || f();
          }, title: "Delete", children: /* @__PURE__ */ i.jsx(ur, { size: 12 }) })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            ref: v,
            type: "file",
            accept: ".json",
            onChange: A,
            className: "hidden"
          }
        )
      ]
    }
  );
}, cg = ({
  templates: o,
  selectedId: s,
  onSelect: u,
  onAdd: c,
  onUpdate: f,
  onDelete: h
}) => {
  const x = () => {
    const j = ua(
      `新模板 ${o.length + 1}`,
      "text_summary"
    );
    c(j), u(j);
  }, v = (j) => {
    const D = ua(
      `${j.name} (副本)`,
      j.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: j.boundPresetId,
        systemPrompt: j.systemPrompt,
        userPromptTemplate: j.userPromptTemplate,
        outputFormat: j.outputFormat,
        availableVariables: [...j.availableVariables]
      }
    );
    c(D);
  }, p = (j, D) => {
    D && o.filter((V) => V.category === j.category && V.id !== j.id && V.enabled).forEach((V) => f({ ...V, enabled: !1 })), f({ ...j, enabled: D });
  }, S = (j) => {
    f(j);
  }, A = Gi.map((j) => ({
    ...j,
    templates: o.filter((D) => D.category === j.value)
  })).filter((j) => j.templates.length > 0);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: x,
          children: /* @__PURE__ */ i.jsx(Xo, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      A.map((j) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          j.label,
          /* @__PURE__ */ i.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: j.templates.map((D) => /* @__PURE__ */ i.jsx(
          og,
          {
            template: D,
            isSelected: s === D.id,
            onSelect: () => u(D),
            onCopy: () => v(D),
            onDelete: () => h(D),
            onToggleEnabled: (V) => p(D, V),
            onImport: S
          },
          D.id
        )) })
      ] }, j.value)),
      o.length === 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ i.jsx(qo, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, dg = [
  { value: "plain", label: "纯文本" },
  { value: "markdown", label: "Markdown" },
  { value: "json", label: "JSON" }
], fg = ({
  template: o,
  llmPresets: s,
  defaultPresetId: u,
  onChange: c
}) => {
  var x, v;
  const f = [
    { value: "", label: "使用默认预设" + (u ? ` (${((x = s.find((p) => p.id === u)) == null ? void 0 : x.name) || u})` : "") },
    ...s.map((p) => ({ value: p.id, label: p.name }))
  ], h = (p) => {
    c({ ...o, ...p, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ i.jsxs(Nt, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "模板名称",
          value: o.name,
          onChange: (p) => h({ name: p }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: o.isBuiltIn
        }
      ),
      /* @__PURE__ */ i.jsx(
        oa,
        {
          label: "模板分类",
          value: o.category,
          onChange: (p) => h({ category: p }),
          options: Gi.map((p) => ({ value: p.value, label: p.label })),
          description: (v = Gi.find((p) => p.value === o.category)) == null ? void 0 : v.description
        }
      ),
      /* @__PURE__ */ i.jsx(
        oa,
        {
          label: "模型来源",
          value: o.boundPresetId || "",
          onChange: (p) => h({ boundPresetId: p || null }),
          options: f,
          description: "选择用于此模板的 LLM 预设"
        }
      ),
      /* @__PURE__ */ i.jsx(
        oa,
        {
          label: "输出格式",
          value: o.outputFormat,
          onChange: (p) => h({ outputFormat: p }),
          options: dg
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(Nt, { title: "提示词内容", description: "支持变量：{{chatHistory}}, {{context}}, {{char}}, {{user}}, {{userInput}}", children: [
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "系统提示词",
          value: o.systemPrompt,
          onChange: (p) => h({ systemPrompt: p }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ i.jsx(
        dt,
        {
          label: "用户提示词模板",
          value: o.userPromptTemplate,
          onChange: (p) => h({ userPromptTemplate: p }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用变量" }),
      /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: o.availableVariables.map((p) => /* @__PURE__ */ i.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px] text-primary font-mono", children: p }, p)) })
    ] })
  ] });
}, mg = ({
  rules: o,
  selectedId: s,
  onSelect: u,
  onToggle: c,
  onDelete: f,
  onAdd: h,
  onReset: x
}) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: x,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: h,
          children: /* @__PURE__ */ i.jsx(Q1, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
    o.map((v) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${s === v.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => u(v.id),
        children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${v.enabled ? s === v.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (p) => {
                p.stopPropagation(), c(v.id);
              },
              title: v.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ i.jsx(Qo, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${s === v.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!v.enabled && "opacity-50 line-through"}`, children: v.name }) }),
            /* @__PURE__ */ i.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ i.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              v.pattern,
              "/",
              v.flags
            ] }) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: `flex items-center ${s === v.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (p) => {
                p.stopPropagation(), f(v.id);
              },
              children: /* @__PURE__ */ i.jsx(ur, { size: 12 })
            }
          ) })
        ]
      },
      v.id
    )),
    o.length === 0 && /* @__PURE__ */ i.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), z1 = [
  { value: "input", label: "输入", description: "清洗发给 LLM 的聊天内容" },
  { value: "output", label: "输出", description: "清洗 LLM 返回的内容（预览/写入前）" },
  { value: "both", label: "两者", description: "输入和输出都应用" }
], ir = [
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
class Fo {
  constructor(s) {
    Xe(this, "rules", []);
    this.rules = s || [...ir];
  }
  /**
   * 应用所有启用的规则处理文本
   * @param text 要处理的文本
   * @param scope 可选，只应用特定作用域的规则
   */
  process(s, u) {
    let c = s;
    for (const f of this.rules)
      if (f.enabled && !(u && f.scope !== u && f.scope !== "both"))
        try {
          const h = new RegExp(f.pattern, f.flags);
          c = c.replace(h, f.replacement);
        } catch (h) {
          console.warn(`[RegexProcessor] 规则 "${f.name}" 执行失败:`, h);
        }
    return c;
  }
  /**
   * 使用指定规则处理文本（用于预览）
   */
  processWithRule(s, u) {
    try {
      const c = new RegExp(u.pattern, u.flags);
      return s.replace(c, u.replacement);
    } catch (c) {
      return console.warn("[RegexProcessor] 规则执行失败:", c), s;
    }
  }
  /**
   * 验证正则表达式是否有效
   */
  validatePattern(s, u) {
    try {
      return new RegExp(s, u), { valid: !0 };
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
  updateRule(s, u) {
    const c = this.rules.findIndex((f) => f.id === s);
    c >= 0 && (this.rules[c] = { ...this.rules[c], ...u });
  }
  /**
   * 删除规则
   */
  deleteRule(s) {
    this.rules = this.rules.filter((u) => u.id !== s);
  }
  /**
   * 启用/禁用规则
   */
  toggleRule(s) {
    const u = this.rules.find((c) => c.id === s);
    u && (u.enabled = !u.enabled);
  }
  /**
   * 重置为默认规则
   */
  resetToDefaults() {
    this.rules = [...ir];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((s) => s.enabled).length;
  }
}
const Oo = new Fo(), hg = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], gg = ({ rule: o, onChange: s }) => {
  var A;
  const [u, c] = O.useState(""), [f, h] = O.useState(""), [x, v] = O.useState({ valid: !0 }), p = new Fo();
  O.useEffect(() => {
    const j = p.validatePattern(o.pattern, o.flags);
    v(j);
  }, [o.pattern, o.flags]), O.useEffect(() => {
    if (u && x.valid) {
      const j = p.processWithRule(u, o);
      h(j);
    } else
      h("");
  }, [u, o, x.valid]);
  const S = (j) => {
    const D = o.flags.split(""), V = D.indexOf(j);
    V >= 0 ? D.splice(V, 1) : D.push(j), s({ flags: D.join("") });
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
            value: o.name,
            onChange: (j) => s({ name: j.target.value }),
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
            value: o.description || "",
            onChange: (j) => s({ description: j.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: z1.map((j) => /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${o.scope === j.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => s({ scope: j.value }),
            title: j.description,
            children: j.label
          },
          j.value
        )) }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: (A = z1.find((j) => j.value === o.scope)) == null ? void 0 : A.description })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          x.valid ? /* @__PURE__ */ i.jsx(Ho, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ i.jsx(Bo, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${x.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: o.pattern,
            onChange: (j) => s({ pattern: j.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !x.valid && x.error && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-red-500", children: x.error })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: o.replacement,
            onChange: (j) => s({ replacement: j.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: hg.map((j) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${o.flags.includes(j.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => S(j.value),
            title: j.description,
            children: [
              j.label,
              " (",
              j.value,
              ")"
            ]
          },
          j.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ i.jsx(Vo, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: u,
            onChange: (j) => c(j.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      u && x.valid && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ i.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: f || /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ i.jsx(Uh, { size: 16, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("strong", { children: "输入" }),
        "：清洗发给 LLM 的聊天内容。",
        /* @__PURE__ */ i.jsx("strong", { children: "输出" }),
        "：清洗 LLM 返回的内容（如移除 ",
        /* @__PURE__ */ i.jsx("code", { className: "bg-blue-500/20 px-1 rounded", children: "<think>" }),
        "）。"
      ] })
    ] })
  ] });
}, pg = ({
  config: o,
  onChange: s
}) => {
  const u = (c) => {
    s({
      ...o,
      [c]: !o[c]
    });
  };
  return /* @__PURE__ */ i.jsx("div", { className: "", children: /* @__PURE__ */ i.jsxs(Nt, { title: "世界书配置", description: "总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。", children: [
    /* @__PURE__ */ i.jsx(
      ko,
      {
        label: "启用世界书",
        description: "总结时注入始终激活（蓝灯）的世界书条目",
        checked: o.enabled,
        onChange: () => u("enabled")
      }
    ),
    /* @__PURE__ */ i.jsx(
      ko,
      {
        label: "包含全局世界书",
        description: "关闭后只读取角色世界书和聊天世界书",
        checked: o.includeGlobal,
        onChange: () => u("includeGlobal"),
        disabled: !o.enabled
      }
    )
  ] }) });
};
function xg() {
  const [o, s] = O.useState(ig), [u, c] = O.useState(null), [f, h] = O.useState(null), [x, v] = O.useState(!1), [p, S] = O.useState([...ir]), [A, j] = O.useState(null);
  O.useEffect(() => {
  }, []);
  const D = O.useCallback((Y) => {
    s((C) => ({ ...C, selectedPresetId: Y.id })), c(Y);
  }, []), V = O.useCallback(() => {
    const Y = a2(`预设 ${o.llmPresets.length + 1}`);
    Y.isDefault = !1, s((C) => ({
      ...C,
      llmPresets: [...C.llmPresets, Y],
      selectedPresetId: Y.id
    })), c(Y), v(!0);
  }, [o.llmPresets.length]), H = O.useCallback((Y) => {
    s((C) => ({
      ...C,
      llmPresets: C.llmPresets.map((U) => U.id === Y.id ? Y : U)
    })), c(Y), v(!0);
  }, []), q = O.useCallback((Y) => {
    const C = {
      ...Y,
      id: `preset_${Date.now()}`,
      name: `${Y.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((U) => ({ ...U, llmPresets: [...U.llmPresets, C] })), v(!0);
  }, []), te = O.useCallback((Y) => {
    Y.isDefault || (s((C) => ({
      ...C,
      llmPresets: C.llmPresets.filter((U) => U.id !== Y.id),
      selectedPresetId: C.selectedPresetId === Y.id ? null : C.selectedPresetId
    })), c((C) => (C == null ? void 0 : C.id) === Y.id ? null : C), v(!0));
  }, []), $ = O.useCallback((Y) => {
    h(Y);
  }, []), L = O.useCallback((Y) => {
    s((C) => ({
      ...C,
      promptTemplates: [...C.promptTemplates, Y]
    })), v(!0);
  }, []), B = O.useCallback((Y) => {
    s((C) => ({
      ...C,
      promptTemplates: C.promptTemplates.map((U) => U.id === Y.id ? Y : U)
    })), h(Y), v(!0);
  }, []), re = O.useCallback((Y) => {
    Y.isBuiltIn || (s((C) => ({
      ...C,
      promptTemplates: C.promptTemplates.filter((U) => U.id !== Y.id)
    })), h((C) => (C == null ? void 0 : C.id) === Y.id ? null : C), v(!0));
  }, []), F = O.useCallback((Y) => {
    s((C) => ({ ...C, vectorConfig: Y })), v(!0);
  }, []), ie = O.useCallback((Y) => {
    s((C) => ({ ...C, rerankConfig: Y })), v(!0);
  }, []), W = O.useCallback((Y) => {
    s((C) => ({ ...C, worldbookConfig: Y })), v(!0);
  }, []), he = O.useCallback((Y) => {
    const C = p.find((U) => U.id === Y);
    j(C || null);
  }, [p]), Le = O.useCallback(() => {
    const Y = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    S((C) => [...C, Y]), j(Y), v(!0);
  }, []), ft = O.useCallback((Y) => {
    if (!A) return;
    const C = { ...A, ...Y };
    j(C), S((U) => U.map((I) => I.id === C.id ? C : I)), v(!0);
  }, [A]), Ke = O.useCallback((Y) => {
    S((C) => C.map(
      (U) => U.id === Y ? { ...U, enabled: !U.enabled } : U
    )), v(!0);
  }, []), Te = O.useCallback((Y) => {
    S((C) => C.filter((U) => U.id !== Y)), j((C) => (C == null ? void 0 : C.id) === Y ? null : C), v(!0);
  }, []), Ae = O.useCallback(() => {
    S([...ir]), j(null), v(!0);
  }, []), fe = O.useCallback(() => {
    console.log("保存配置:", o, p), v(!1);
  }, [o, p]);
  return {
    settings: o,
    editingPreset: u,
    editingTemplate: f,
    hasChanges: x,
    regexRules: p,
    editingRule: A,
    selectPreset: D,
    addPreset: V,
    updatePreset: H,
    copyPreset: q,
    deletePreset: te,
    selectTemplate: $,
    addTemplate: L,
    updateTemplate: B,
    deleteTemplate: re,
    updateVectorConfig: F,
    updateRerankConfig: ie,
    updateWorldbookConfig: W,
    selectRule: he,
    addRule: Le,
    updateRule: ft,
    toggleRule: Ke,
    deleteRule: Te,
    resetRules: Ae,
    save: fe
  };
}
const yg = [
  { id: "llm", label: "LLM 预设", icon: Go },
  { id: "vector", label: "向量化", icon: Lo },
  { id: "rerank", label: "Rerank", icon: Yo }
], bg = () => {
  const [o, s] = O.useState("model"), [u, c] = O.useState("llm"), {
    settings: f,
    editingPreset: h,
    editingTemplate: x,
    hasChanges: v,
    regexRules: p,
    editingRule: S,
    selectPreset: A,
    addPreset: j,
    updatePreset: D,
    copyPreset: V,
    deletePreset: H,
    selectTemplate: q,
    addTemplate: te,
    updateTemplate: $,
    deleteTemplate: L,
    updateVectorConfig: B,
    updateRerankConfig: re,
    updateWorldbookConfig: F,
    selectRule: ie,
    addRule: W,
    updateRule: he,
    toggleRule: Le,
    deleteRule: ft,
    resetRules: Ke,
    save: Te
  } = xg();
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(
      Xi,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则",
        actions: v && /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 text-sm shadow-sm",
            onClick: Te,
            children: [
              /* @__PURE__ */ i.jsx(s3, { size: 16 }),
              "保存更改"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsx(
      qi,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: o,
        onChange: (Ae) => s(Ae)
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      o === "model" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ i.jsx(
          qi,
          {
            tabs: yg.map((Ae) => ({ ...Ae, icon: /* @__PURE__ */ i.jsx(Ae.icon, { size: 14 }) })),
            activeTab: u,
            onChange: (Ae) => c(Ae),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        u === "llm" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ i.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: j, children: /* @__PURE__ */ i.jsx(Xo, { size: 16 }) })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: f.llmPresets.map((Ae) => /* @__PURE__ */ i.jsx(
              X5,
              {
                preset: Ae,
                isSelected: f.selectedPresetId === Ae.id,
                onSelect: () => A(Ae),
                onEdit: () => A(Ae),
                onCopy: () => V(Ae),
                onDelete: () => H(Ae)
              },
              Ae.id
            )) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "flex flex-col", children: h ? /* @__PURE__ */ i.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ i.jsx(K5, { preset: h, onChange: D }) }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ i.jsx(Go, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        u === "vector" && /* @__PURE__ */ i.jsx(F5, { config: f.vectorConfig, onChange: B }),
        u === "rerank" && /* @__PURE__ */ i.jsx(I5, { config: f.rerankConfig, onChange: re })
      ] }),
      o === "prompt" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          cg,
          {
            templates: f.promptTemplates,
            selectedId: (x == null ? void 0 : x.id) || null,
            onSelect: q,
            onAdd: te,
            onUpdate: $,
            onDelete: L
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: x ? /* @__PURE__ */ i.jsx(
          fg,
          {
            template: x,
            llmPresets: f.llmPresets,
            defaultPresetId: f.selectedPresetId,
            onChange: $
          }
        ) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(qo, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      o === "regex" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          mg,
          {
            rules: p,
            selectedId: (S == null ? void 0 : S.id) || null,
            onSelect: ie,
            onToggle: Le,
            onDelete: ft,
            onAdd: W,
            onReset: Ke
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: S ? /* @__PURE__ */ i.jsx(gg, { rule: S, onChange: he }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(Q1, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      o === "worldbook" && /* @__PURE__ */ i.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ i.jsx(
        pg,
        {
          config: f.worldbookConfig,
          onChange: F
        }
      ) })
    ] })
  ] });
}, vg = () => {
  const [o, s] = O.useState("claudeDark");
  O.useEffect(() => {
    s(Hl.getTheme());
  }, []);
  const u = (f) => {
    Hl.setTheme(f), Et.set("theme", f), s(f);
  }, c = Object.entries(Oi).map(([f, h]) => {
    let x = h.colors.background, v = h.colors.primary;
    return {
      id: f,
      name: h.name,
      background: x,
      sidebar: h.colors.sidebar,
      // Add sidebar color
      primary: v
    };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: c.map((f) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        onClick: () => u(f.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${o === f.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
                        `,
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-center -space-x-3 mb-2", children: [
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-10",
                style: { background: f.background },
                title: "Background"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-20",
                style: { background: f.sidebar },
                title: "Sidebar"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background",
                style: { background: f.primary },
                title: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: `text-sm font-medium ${o === f.id ? "text-primary" : "text-muted-foreground"}`, children: f.name }),
          o === f.id && /* @__PURE__ */ i.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      f.id
    )) })
  ] });
}, Bl = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function Fa() {
  try {
    const o = window.SillyTavern;
    if (o != null && o.getContext) {
      const s = o.getContext();
      return (s == null ? void 0 : s.eventSource) || null;
    }
    return null;
  } catch {
    return console.warn("[Engram] EventBus: 无法获取 SillyTavern eventSource"), null;
  }
}
class ca {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, u) {
    const c = Fa();
    return c && c.on(s, u), this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set()), this.listeners.get(s).add(u), () => {
      this.off(s, u);
    };
  }
  /**
   * 一次性订阅事件（触发后自动取消）
   * @param event 事件名称
   * @param callback 回调函数
   */
  static once(s, u) {
    const c = Fa();
    if (c)
      c.once(s, u);
    else {
      const f = (...h) => {
        this.off(s, f), u(...h);
      };
      this.on(s, f);
    }
  }
  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  static off(s, u) {
    var f;
    const c = Fa();
    c && c.removeListener(s, u), (f = this.listeners.get(s)) == null || f.delete(u);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(s, ...u) {
    const c = Fa();
    c && c.emit(s, ...u);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = Fa();
    for (const [u, c] of this.listeners)
      for (const f of c)
        s && s.removeListener(u, f);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return Fa() !== null;
  }
}
Xe(ca, "listeners", /* @__PURE__ */ new Map());
const Sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: ca,
  TavernEventType: Bl
}, Symbol.toStringTag, { value: "Module" }));
function jg(o, s) {
  let u = "assistant";
  return o.is_user ? u = "user" : o.is_system && (u = "system"), {
    id: s,
    role: u,
    content: o.mes || "",
    name: o.name || "",
    isHidden: o.is_hidden ?? !1,
    raw: o
  };
}
class n2 {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const u = rr();
    if (!(u != null && u.chat))
      return [];
    let c = u.chat.map((f, h) => jg(f, h));
    if (s.includeHidden || (c = c.filter((f) => !f.isHidden)), s.role) {
      const f = Array.isArray(s.role) ? s.role : [s.role];
      c = c.filter((h) => f.includes(h.role));
    }
    return c;
  }
  /**
   * 获取最近 N 条消息
   * @param count 消息数量
   * @param options 查询选项
   */
  static getRecentMessages(s, u = {}) {
    return this.getAllMessages(u).slice(-s);
  }
  /**
   * 获取指定范围的消息
   * @param start 起始索引（包含）
   * @param end 结束索引（不包含）
   * @param options 查询选项
   */
  static getMessages(s, u, c = {}) {
    return this.getAllMessages(c).slice(s, u);
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
    const u = this.getAllMessages(s);
    return u.length > 0 ? u[u.length - 1] : null;
  }
  /**
   * 获取当前角色名称
   */
  static getCurrentCharacterName() {
    var u;
    const s = rr();
    return !(s != null && s.characters) || s.characterId < 0 ? null : ((u = s.characters[s.characterId]) == null ? void 0 : u.name) || null;
  }
  /**
   * 格式化消息为纯文本（用于传给 LLM）
   * @param messages 消息数组
   * @param format 格式化模板
   */
  static formatMessagesAsText(s, u = "simple") {
    return u === "simple" ? s.map((c) => `${c.name}: ${c.content}`).join(`

`) : s.map((c) => `[${c.role.toUpperCase()}] ${c.name}:
${c.content}`).join(`

---

`);
  }
  /**
   * 检查 MessageService 是否可用
   */
  static isAvailable() {
    return y5();
  }
}
const Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: n2
}, Symbol.toStringTag, { value: "Module" }));
async function A1(o) {
  try {
    const s = window.SillyTavern;
    if (s != null && s.getContext) {
      const u = s.getContext();
      if (u != null && u.getTokenCountAsync)
        return await u.getTokenCountAsync(o);
    }
    return Math.ceil(o.length / 4);
  } catch {
    return console.warn("[Engram] WorldInfoService: 无法使用酒馆 Token 计数，使用估算"), Math.ceil(o.length / 4);
  }
}
function Wa() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class Ct {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(s) {
    return A1(s);
  }
  /**
   * 计算特定世界书中所有"剧情摘要"条目的 Token 总和
   * 仅计算已启用的条目
   * @param worldbookName 世界书名称
   */
  static async countSummaryTokens(s) {
    const c = (await this.getEntries(s)).filter(
      (x) => x.enabled && x.name.startsWith("剧情摘要_")
    );
    if (c.length === 0) return 0;
    const f = c.map((x) => x.content);
    return (await Promise.all(f.map((x) => this.countTokens(x)))).reduce((x, v) => x + v, 0);
  }
  /**
   * 批量计算多段文本的 Token 数量
   * @param texts 文本数组
   */
  static async countTokensBatch(s) {
    return Promise.all(s.map((u) => A1(u)));
  }
  /**
   * 查找已绑定的 Engram 世界书（不创建）
   * 用于面板显示等只读场景
   */
  static findExistingWorldbook() {
    try {
      const s = Wa();
      if (!(s != null && s.getCharWorldbookNames))
        return null;
      const u = s.getCharWorldbookNames("current");
      return u && [...u.additional || [], u.primary].filter(Boolean).find((h) => h == null ? void 0 : h.startsWith("[Engram]")) || null;
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
    var s, u;
    try {
      const c = this.findExistingWorldbook();
      if (c)
        return console.debug("[Engram] WorldInfoService: 使用已绑定的世界书", c), c;
      const f = Wa();
      if (!f)
        return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), null;
      const h = (u = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : u.call(s);
      if (!(h != null && h.name2) || h.name2 === "SillyTavern System")
        return console.warn("[Engram] WorldInfoService: 无效的角色上下文"), null;
      const x = h.name2, v = `[Engram] ${x}`;
      if (console.debug("[Engram] WorldInfoService: 创建新世界书", v), f.createWorldbook)
        await f.createWorldbook(v);
      else
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用"), null;
      if (f.getCharWorldbookNames && f.rebindCharWorldbooks) {
        const p = f.getCharWorldbookNames("current");
        p && (p.additional.push(v), await f.rebindCharWorldbooks("current", p), console.info("[Engram] WorldInfoService: 世界书已绑定到角色", {
          character: x,
          worldbook: v
        }));
      }
      return v;
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
    const u = Wa();
    if (!(u != null && u.getWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), [];
    try {
      return (await u.getWorldbook(s)).map((f) => {
        const h = f;
        return {
          uid: h.uid || 0,
          name: h.name || "",
          content: h.content || "",
          enabled: h.enabled ?? !0,
          constant: h.constant ?? !1,
          keys: h.key || [],
          position: h.position || "before_character_definition",
          depth: h.depth || 0,
          order: h.order || 100
        };
      });
    } catch (c) {
      return console.error("[Engram] WorldInfoService: 获取世界书条目失败", c), [];
    }
  }
  /**
   * 创建新的世界书条目
   * 使用 TavernHelper API（与 the_world 插件保持一致）
   * @param worldbookName 世界书名称
   * @param params 条目参数
   */
  static async createEntry(s, u) {
    try {
      const c = Wa();
      if (!(c != null && c.createWorldbookEntries))
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbookEntries 不可用"), !1;
      const f = {
        name: u.name,
        content: u.content,
        comment: u.name,
        // 用作备注
        strategy: {
          type: u.constant ? "constant" : "selective",
          keys: u.keys || []
        },
        position: {
          type: u.position || "before_character_definition",
          order: u.order ?? 100,
          depth: u.depth ?? 4
        }
      };
      return console.debug("[Engram] WorldInfoService: 创建条目", {
        worldbook: s,
        name: u.name,
        contentLength: u.content.length
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
  static async updateEntry(s, u, c) {
    const f = Wa();
    if (!(f != null && f.createWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), !1;
    try {
      const h = { ...c, uid: u };
      return await f.createWorldbookEntries(s, [h]), !0;
    } catch (h) {
      return console.error("[Engram] WorldInfoService: 更新世界书条目失败", h), !1;
    }
  }
  /**
   * 根据 Key 查找条目
   * @param worldbookName 世界书名称
   * @param key 关键词
   */
  static async findEntryByKey(s, u) {
    return (await this.getEntries(s)).find((f) => f.keys.includes(u)) || null;
  }
  /**
   * 获取世界书的 Token 统计
   * @param worldbookName 世界书名称
   */
  static async getWorldbookTokenStats(s) {
    const u = await this.getEntries(s), c = await Promise.all(
      u.map(async (h) => ({
        name: h.name,
        tokens: await this.countTokens(h.content)
      }))
    );
    return {
      totalTokens: c.reduce((h, x) => h + x.tokens, 0),
      entryCount: u.length,
      entries: c
    };
  }
  /**
   * 检查 WorldInfoService 是否可用
   */
  static isAvailable() {
    return Wa() !== null;
  }
  /**
   * 检查 Token 计数是否使用酒馆原生 API
   */
  static async isNativeTokenCountAvailable() {
    try {
      const s = window.SillyTavern;
      if (s != null && s.getContext) {
        const u = s.getContext();
        return typeof (u == null ? void 0 : u.getTokenCountAsync) == "function";
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
    var u, c;
    try {
      const h = await new Function("path", "return import(path)")("/scripts/world-info.js"), x = h == null ? void 0 : h.getWorldInfoPrompt;
      if (typeof x != "function")
        return console.warn("[Engram] WorldInfoService: getWorldInfoPrompt 不可用，回退到常驻条目"), this.getConstantWorldInfo();
      let v = s;
      if (!v || v.length === 0) {
        const j = (c = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : c.call(u);
        j != null && j.chat && Array.isArray(j.chat) && (v = j.chat.map((D) => D.mes || "").reverse());
      }
      if (!v || v.length === 0)
        return console.warn("[Engram] WorldInfoService: 无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      const S = await x(v, 8192, !0, {
        trigger: "normal"
      }), A = [
        (S == null ? void 0 : S.worldInfoBefore) || "",
        (S == null ? void 0 : S.worldInfoAfter) || ""
      ].filter(Boolean).join(`

`).trim();
      return A && console.debug(`[Engram] WorldInfoService: 获取到激活的世界书内容 (${A.length} 字符)`), A;
    } catch (f) {
      return console.warn("[Engram] WorldInfoService: 获取世界书失败，回退到常驻条目", f), this.getConstantWorldInfo();
    }
  }
  /**
   * 获取常驻激活的世界书条目（蓝灯）
   * 作为 getActivatedWorldInfo 的回退方案
   */
  static async getConstantWorldInfo() {
    try {
      const u = await new Function("path", "return import(path)")("/scripts/world-info.js"), c = u == null ? void 0 : u.getSortedEntries;
      if (typeof c != "function")
        return "";
      const f = await c();
      if (!f || !Array.isArray(f))
        return "";
      const h = f.filter((x) => x.constant === !0 && x.disable !== !0 && x.content);
      return h.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${h.length} 个常驻条目`), h.map((x) => x.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const r2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldInfoService: Ct
}, Symbol.toStringTag, { value: "Module" }));
async function Ng() {
  const { EventBus: o } = await Promise.resolve().then(() => Sg), { MessageService: s } = await Promise.resolve().then(() => Cg), { WorldInfoService: u } = await Promise.resolve().then(() => r2);
  return {
    eventBus: o.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: u.isAvailable(),
    nativeTokenCount: await u.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const Eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: ca,
  MessageService: n2,
  TavernEventType: Bl,
  WorldInfoService: Ct,
  checkTavernIntegration: Ng
}, Symbol.toStringTag, { value: "Module" })), Tg = [
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
class i2 {
  constructor(s) {
    Xe(this, "rules");
    this.rules = s || Tg;
  }
  /**
   * 清洗 LLM 输出文本
   * @param text 原始文本
   * @returns 清洗后的文本
   */
  clean(s) {
    let u = s;
    for (const c of this.rules)
      u = u.replace(c.pattern, c.replacement);
    return u.trim();
  }
  /**
   * 格式化为世界书条目格式
   * @param summary 总结内容
   * @param metadata 元数据
   */
  formatAsWorldEntry(s, u) {
    new Date(u.timestamp).toLocaleDateString("zh-CN");
    let h = `📜 剧情摘要 [楼层${`${u.floorRange[0]}-${u.floorRange[1]}`}]
`;
    return h += s, h;
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
  truncate(s, u, c = "...") {
    return s.length <= u ? s : s.slice(0, u - c.length) + c;
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
const s2 = new i2();
function M1() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class u2 {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const u = M1();
    if (!(u != null && u.generateRaw) && !(u != null && u.generate))
      return {
        success: !1,
        content: "",
        error: "TavernHelper 不可用"
      };
    try {
      let c;
      if (u.generateRaw)
        c = await u.generateRaw({
          ordered_prompts: [
            { role: "system", content: s.systemPrompt },
            { role: "user", content: s.userPrompt }
          ]
          // 如果指定了预设 ID，可以在这里配置
          // custom_api: request.presetId ? await this.getPresetConfig(request.presetId) : undefined,
        });
      else if (u.generate)
        c = await u.generate({
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
    const s = M1();
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
const o2 = new u2(), So = "__ENGRAM_STATE__", ki = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  version: "1.0",
  updatedAt: Date.now()
};
class w1 {
  /**
   * 加载状态
   */
  static async loadState(s) {
    try {
      const u = await Ct.findEntryByKey(s, So);
      if (!u)
        return { ...ki };
      try {
        const c = JSON.parse(u.content);
        return { ...ki, ...c };
      } catch (c) {
        return ye.warn("WorldBookStateService", "状态条目解析失败，重置状态", c), { ...ki };
      }
    } catch (u) {
      return ye.error("WorldBookStateService", "加载状态失败", u), { ...ki };
    }
  }
  /**
   * 保存状态
   */
  static async saveState(s, u) {
    try {
      const f = {
        ...await this.loadState(s),
        ...u,
        updatedAt: Date.now()
      }, h = JSON.stringify(f, null, 2), x = await Ct.findEntryByKey(s, So);
      if (x)
        return ye.debug("WorldBookStateService", "更新状态条目", { uid: x.uid, state: f }), await Ct.updateEntry(s, x.uid, {
          content: h,
          name: "Engram System State",
          // 确保是禁用的
          enabled: !1
        });
      {
        ye.debug("WorldBookStateService", "创建状态条目", { state: f });
        const v = {
          name: "Engram System State",
          content: h,
          keys: [So],
          enabled: !1,
          // 默认禁用，防止干扰上下文
          constant: !1,
          position: "before_character_definition",
          role: "system",
          order: 0
          // 置顶
        };
        return await Ct.createEntry(s, v);
      }
    } catch (c) {
      return ye.error("WorldBookStateService", "保存状态失败", c), !1;
    }
  }
}
class _g {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(s, u, c) {
    return new Promise((f, h) => {
      ca.emit(Bl.ENGRAM_REQUEST_REVISION, {
        title: s,
        description: u,
        content: c,
        onConfirm: (x) => f(x),
        onCancel: () => h(new Error("User cancelled revision"))
      });
    });
  }
}
const zg = new _g(), c2 = {
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
}, k1 = {
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
}, Ia = "engram";
function O1() {
  var o, s;
  try {
    return ((s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) || null;
  } catch {
    return null;
  }
}
function R1() {
  var o, s;
  try {
    const u = (s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o);
    return u != null && u.chat_metadata ? u.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function Ag() {
  var o;
  try {
    (o = window.saveChatDebounced) == null || o.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class d2 {
  constructor(s, u, c) {
    Xe(this, "config");
    Xe(this, "textProcessor");
    Xe(this, "llmAdapter");
    Xe(this, "currentChatId", null);
    Xe(this, "isRunning", !1);
    Xe(this, "isSummarizing", !1);
    Xe(this, "unsubscribeMessage", null);
    Xe(this, "unsubscribeChat", null);
    Xe(this, "summaryHistory", []);
    // 缓存最后总结的楼层，用于同步读取
    Xe(this, "_lastSummarizedFloor", 0);
    const f = Et.get("summarizerConfig");
    this.config = { ...c2, ...f, ...s }, this.textProcessor = u || s2, this.llmAdapter = c || o2;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const u = R1();
    if (u)
      return u.extensions || (u.extensions = {}), u.extensions[Ia] || (u.extensions[Ia] = {}), u.extensions[Ia][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, u) {
    const c = R1();
    c && (c.extensions || (c.extensions = {}), c.extensions[Ia] || (c.extensions[Ia] = {}), c.extensions[Ia][s] = u, this.log("debug", `已保存到 chat_metadata: ${s} = ${u}`), Ag());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const s = await Ct.getChatWorldbook();
    if (!s) return this._lastSummarizedFloor;
    const u = await w1.loadState(s);
    return this._lastSummarizedFloor = u.lastSummarizedFloor, this._lastSummarizedFloor;
  }
  /**
   * 设置上次总结的楼层
   * 同时更新内存和持久化存储
   */
  async setLastSummarizedFloor(s) {
    this._lastSummarizedFloor = s;
    const u = await Ct.getChatWorldbook();
    u && await w1.saveState(u, {
      lastSummarizedFloor: s
    });
  }
  // ==================== 楼层计算 ====================
  /**
   * 获取当前真实楼层数
   */
  getCurrentFloor() {
    const s = O1();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = O1();
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
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = ca.on(
      Bl.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${Bl.MESSAGE_RECEIVED}`)), this.unsubscribeChat = ca.on(
      Bl.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${Bl.CHAT_CHANGED}`), this.isRunning = !0;
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
    const s = this.getCurrentChatId(), u = this.getCurrentFloor();
    this.currentChatId = s, this.summaryHistory = [], this._lastSummarizedFloor = 0;
    const c = await this.getLastSummarizedFloor();
    this.log("info", "初始化当前聊天状态", {
      chatId: s,
      currentFloor: u,
      lastSummarizedFloor: c,
      pendingFloors: u - c
    });
  }
  // ==================== 事件处理 ====================
  /**
   * 处理消息接收事件
   */
  async handleMessageReceived() {
    const s = this.getCurrentFloor(), u = await this.getLastSummarizedFloor(), c = s - u;
    this.log("debug", "收到新消息", {
      currentFloor: s,
      lastSummarized: u,
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
    const u = this.getCurrentFloor(), c = await this.getLastSummarizedFloor();
    this.isSummarizing = !0, this.log("info", "开始执行总结", {
      floorRange: [c + 1, u],
      manual: s
    });
    try {
      const h = this._lastSummarizedFloor + 1, x = this.config.bufferSize || 0, v = u - x;
      if (h > v)
        return s && ia.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const p = this.config.floorInterval || 10, S = h + p - 1, A = Math.min(v, S);
      if (h > A)
        return null;
      const j = [h, A];
      this.log("info", "准备总结", { startFloor: h, endFloor: A, currentFloor: u, buffer: x });
      const V = x5().slice(h - 1, A);
      if (this.log("info", "提取消息范围", {
        range: j,
        msgCount: V.length,
        firstMsg: (((f = V[0]) == null ? void 0 : f.mes) || "").substring(0, 20)
      }), V.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: j }), null;
      const H = {
        messages: V.map((fe) => {
          const Y = fe.mes || fe.content || fe.message || "";
          return Y || console.warn("[Engram] Message content is empty/undefined:", fe), {
            role: fe.is_user ? "user" : "assistant",
            content: Y,
            name: fe.name
          };
        }),
        floorRange: j,
        templateId: this.config.promptTemplateId || void 0
      }, q = V.map((fe) => fe.mes || fe.content || fe.message || "").join(`

`), te = Oo.process(q, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: q.length,
        cleanedLength: te.length
      });
      let $ = "";
      try {
        const fe = await Ct.getActivatedWorldInfo();
        fe && ($ = `【背景设定】
` + fe + `

`, this.log("debug", "已加载世界书内容", { length: fe.length }));
      } catch (fe) {
        this.log("warn", "获取世界书失败", { error: String(fe) });
      }
      const L = Et.getEnabledPromptTemplate("text_summary"), B = (L == null ? void 0 : L.systemPrompt) || k1.system, F = ((L == null ? void 0 : L.userPromptTemplate) || k1.user).replace("{{worldbookContext}}", $).replace("{{chatHistory}}", te).replace("{{context}}", $);
      this.log("debug", "使用提示词模板", {
        source: L ? "APIPresets" : "fallback",
        templateName: (L == null ? void 0 : L.name) || "default"
      });
      const ie = en.logSend({
        type: "summarize",
        systemPrompt: B,
        userPrompt: F,
        floorRange: H.floorRange
      }), W = Date.now(), he = await this.llmAdapter.generate({
        systemPrompt: B,
        userPrompt: F
      });
      if (en.logReceive(ie, {
        response: he.content,
        status: he.success ? "success" : "error",
        error: he.error,
        duration: Date.now() - W
      }), !he.success)
        return this.log("error", "LLM 调用失败", { error: he.error }), ia.error(`总结失败: ${he.error}`, "Engram 错误"), null;
      const Le = this.textProcessor.clean(he.content), ft = Oo.process(Le, "output"), Ke = await Ct.countTokens(ft), Te = {
        id: Date.now().toString(),
        content: ft,
        sourceFloors: H.floorRange,
        timestamp: Date.now(),
        tokenCount: Ke,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: Te });
        try {
          const fe = await zg.requestRevision(
            "剧情摘要修订",
            `范围: ${H.floorRange[0]} - ${H.floorRange[1]} 楼 | Token: ${Ke}`,
            Te.content
          );
          Te.content = fe, Te.tokenCount = await Ct.countTokens(fe), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), ia.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const Ae = await this.writeToWorldbook(Te);
      if (Te.writtenToWorldbook = Ae, await this.setLastSummarizedFloor(H.floorRange[1]), this.summaryHistory.push(Te), ia.success(`已总结 ${H.floorRange[0]}-${H.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const fe = H.floorRange[0] - 1, Y = H.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: fe, endIndex: Y }), E5(fe, Y).catch((C) => {
          this.log("error", "自动隐藏失败", C);
        });
      }
      return Te;
    } catch (h) {
      const x = h instanceof Error ? h.message : String(h);
      return this.log("error", "总结执行异常", { error: x }), ia.error(`总结异常: ${x}`, "Engram 错误"), null;
    } finally {
      this.isSummarizing = !1;
    }
  }
  /**
   * 写入世界书
   */
  async writeToWorldbook(s) {
    try {
      const u = await Ct.getChatWorldbook();
      if (!u)
        return this.log("warn", "无法获取聊天世界书"), !1;
      const c = `{{// ${JSON.stringify({
        floors: s.sourceFloors,
        tokens: s.tokenCount,
        timestamp: s.timestamp
      })} }}`, f = `${s.content}

${c}`, h = await Ct.createEntry(u, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: f,
        enabled: !0,
        constant: !0
      });
      return h && this.log("success", "已写入世界书", { worldbook: u }), h;
    } catch (u) {
      return this.log("error", "写入世界书失败", { error: String(u) }), !1;
    }
  }
  // ==================== 状态查询 ====================
  /**
   * 获取当前状态
   */
  getStatus() {
    const s = this.getCurrentFloor(), u = this._lastSummarizedFloor;
    return {
      running: this.isRunning,
      currentFloor: s,
      lastSummarizedFloor: u,
      pendingFloors: Math.max(0, s - u),
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
    this.config = { ...this.config, ...s }, Et.set("summarizerConfig", this.config), this.log("debug", "配置已更新并保存", this.config);
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
  async log(s, u, c) {
    try {
      const { Logger: f } = await Promise.resolve().then(() => P1);
      f[s]("Summarizer", u, c);
    } catch {
      console.log(`[Summarizer] ${s}: ${u}`, c);
    }
  }
}
const Ro = new d2(), Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: ir,
  DEFAULT_SUMMARIZER_CONFIG: c2,
  LLMAdapter: u2,
  RegexProcessor: Fo,
  SummarizerService: d2,
  TextProcessor: i2,
  llmAdapter: o2,
  regexProcessor: Oo,
  summarizerService: Ro,
  textProcessor: s2
}, Symbol.toStringTag, { value: "Module" })), Mg = () => {
  const [o, s] = O.useState(
    Ro.getConfig().previewEnabled
  ), u = (c) => {
    const f = c.target.checked;
    s(f), Ro.updateConfig({ previewEnabled: f });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(Xi, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ i.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ i.jsx(vg, {})
      ] }),
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ i.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ i.jsx(wh, { size: 20 }) }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("h4", { className: "font-medium text-foreground", children: "启用修订模式" }),
              /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "在写入长期记忆前，弹出预览窗口进行人工核对" })
            ] })
          ] }),
          /* @__PURE__ */ i.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                className: "sr-only peer",
                checked: o,
                onChange: u
              }
            ),
            /* @__PURE__ */ i.jsx("div", { className: "w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
        /* @__PURE__ */ i.jsx($1, { size: 32 }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, wg = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(Xi, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ i.jsx(L1, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ i.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), kg = [
  { id: "token", label: "Token 数", icon: dh },
  { id: "floor", label: "楼层数", icon: Yo },
  { id: "count", label: "总结次数", icon: Rh }
], Og = () => {
  const [o, s] = O.useState(null), [u, c] = O.useState(!1), [f, h] = O.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [x, v] = O.useState({ ...rg }), [p, S] = O.useState(0);
  O.useEffect(() => {
    A();
  }, []);
  const A = async () => {
    try {
      const { summarizerService: L } = await Promise.resolve().then(() => Xt);
      s(L.getStatus());
      const B = L.getConfig();
      h({
        autoEnabled: B.enabled,
        floorInterval: B.floorInterval,
        bufferSize: B.bufferSize || 3,
        autoHide: B.autoHide || !1
      });
      const { WorldInfoService: re } = await Promise.resolve().then(() => r2), F = re.findExistingWorldbook();
      if (F) {
        const ie = await re.countSummaryTokens(F);
        S(ie);
      } else
        S(0);
    } catch (L) {
      console.error("加载 Summarizer 状态失败:", L);
    }
  }, j = async () => {
    try {
      const { summarizerService: L } = await Promise.resolve().then(() => Xt);
      L.start(), await A();
    } catch (L) {
      console.error("启动失败:", L);
    }
  }, D = async () => {
    try {
      const { summarizerService: L } = await Promise.resolve().then(() => Xt);
      L.stop(), await A();
    } catch (L) {
      console.error("停止失败:", L);
    }
  }, V = async () => {
    c(!0);
    try {
      const { summarizerService: L } = await Promise.resolve().then(() => Xt);
      await L.triggerSummary(!0), await A();
    } catch (L) {
      console.error("触发失败:", L);
    } finally {
      c(!1);
    }
  }, H = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      c(!0);
      try {
        const { summarizerService: L } = await Promise.resolve().then(() => Xt);
        await L.setLastSummarizedFloor(0), await A();
      } catch (L) {
        console.error("重置失败:", L);
      } finally {
        c(!1);
      }
    }
  }, q = (L, B) => {
    v({ ...x, [L]: B });
  }, $ = (() => {
    switch (x.trigger) {
      case "token":
        return { value: x.tokenLimit, min: 1024, max: 16384, step: 512, label: "Token 上限" };
      case "floor":
        return { value: x.floorLimit, min: 10, max: 200, step: 10, label: "楼层上限" };
      case "count":
        return { value: x.countLimit, min: 2, max: 20, step: 1, label: "次数上限" };
    }
  })();
  return /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", children: [
    /* @__PURE__ */ i.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ i.jsx("h2", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "状态监控" }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: A,
              title: "刷新",
              children: /* @__PURE__ */ i.jsx(tn, { size: 14 })
            }
          )
        ] }),
        o ? /* @__PURE__ */ i.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "运行状态" }),
              /* @__PURE__ */ i.jsxs("div", { className: `flex items-center gap-2 text-lg font-medium ${o.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                o.running ? /* @__PURE__ */ i.jsx(yh, { size: 18 }) : /* @__PURE__ */ i.jsx(Bo, { size: 18 }),
                o.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "待处理" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-3xl font-light text-amber-500 font-mono", children: o.pendingFloors })
            ] })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6 pt-4 border-t border-border/30", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "当前楼层" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-xl font-mono text-foreground/80", children: o.currentFloor })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "总结次数" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-xl font-mono text-foreground/80", children: o.historyCount })
            ] })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "pt-4 border-t border-border/30", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1", children: "已总结内容 Token (Engram)" }),
            /* @__PURE__ */ i.jsx("div", { className: "text-sm font-mono text-primary/80", children: p.toLocaleString() })
          ] })
        ] }) : /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex gap-3", children: [
        o != null && o.running ? /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors",
            onClick: D,
            children: [
              /* @__PURE__ */ i.jsx(Ih, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: j,
            children: [
              /* @__PURE__ */ i.jsx(Vo, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: V,
            disabled: u || (o == null ? void 0 : o.isSummarizing),
            children: [
              /* @__PURE__ */ i.jsx(tn, { size: 14, className: u ? "animate-spin" : "" }),
              u ? "处理中..." : "手动触发"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "pt-6 border-t border-border/50 space-y-4", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-sm text-foreground", children: "自动总结" }),
            /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
              "每 ",
              f.floorInterval,
              " 楼"
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              onClick: async () => {
                const L = !f.autoEnabled;
                h((re) => ({ ...re, autoEnabled: L }));
                const { summarizerService: B } = await Promise.resolve().then(() => Xt);
                B.updateConfig({ enabled: L });
              },
              className: `relative w-9 h-5 rounded-full transition-colors ${f.autoEnabled ? "bg-primary" : "bg-input"}`,
              children: /* @__PURE__ */ i.jsx("span", { className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${f.autoEnabled ? "translate-x-4" : "translate-x-0"}` })
            }
          )
        ] }),
        f.autoEnabled && /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-4", children: [
            /* @__PURE__ */ i.jsx("span", { children: "触发间隔" }),
            /* @__PURE__ */ i.jsxs("span", { children: [
              f.floorInterval,
              " 楼"
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "range",
              min: 5,
              max: 100,
              step: 5,
              value: f.floorInterval,
              onChange: async (L) => {
                const B = Number(L.target.value);
                h((F) => ({ ...F, floorInterval: B }));
                const { summarizerService: re } = await Promise.resolve().then(() => Xt);
                re.updateConfig({ floorInterval: B });
              },
              className: "w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer range-thumb-sm"
            }
          ),
          /* @__PURE__ */ i.jsx("span", { children: "1" }),
          /* @__PURE__ */ i.jsx("span", { children: "25" }),
          /* @__PURE__ */ i.jsx("span", { children: "50" })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "pt-4 border-t border-border/30 grid grid-cols-1 gap-4 text-xs", children: /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("span", { className: "block text-muted-foreground mb-1.5", children: "缓冲楼层 (Buffer)" }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "number",
                min: "0",
                max: "20",
                value: f.bufferSize,
                onChange: (L) => {
                  const B = Number(L.target.value);
                  h((re) => ({ ...re, bufferSize: B })), Promise.resolve().then(() => Xt).then(({ summarizerService: re }) => {
                    re.updateConfig({ bufferSize: B });
                  });
                },
                className: "w-full bg-input border border-border rounded px-2 py-1 text-right font-mono"
              }
            ),
            /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground/60 w-6", children: "楼" })
          ] })
        ] }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-sm", children: "自动隐藏" }),
            /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground", children: "处理完后隐藏原文" })
          ] }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                const L = !f.autoHide;
                h((B) => ({ ...B, autoHide: L })), Promise.resolve().then(() => Xt).then(({ summarizerService: B }) => {
                  B.updateConfig({ autoHide: L });
                });
              },
              className: `relative w-9 h-5 rounded-full transition-colors ${f.autoHide ? "bg-primary" : "bg-input"}`,
              children: /* @__PURE__ */ i.jsx("span", { className: `absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${f.autoHide ? "translate-x-4" : "translate-x-0"}` })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "pt-4 border-t border-border/30 flex justify-end", children: /* @__PURE__ */ i.jsxs(
        "button",
        {
          className: "inline-flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 border border-red-200 rounded transition-colors",
          onClick: H,
          disabled: u,
          title: "重置进度 (重新扫描历史)",
          children: [
            /* @__PURE__ */ i.jsx(tn, { size: 12, className: u ? "animate-spin" : "" }),
            "重置所有进度"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "space-y-6 lg:border-l lg:border-border/30 lg:pl-8", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("h2", { className: "text-sm font-medium text-foreground", children: "精简配置" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "将多次总结压缩为更简洁的摘要" })
        ] }),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            onClick: () => v((L) => ({ ...L, enabled: !L.enabled })),
            className: `relative w-9 h-5 rounded-full transition-colors ${x.enabled ? "bg-primary" : "bg-input"}`,
            children: /* @__PURE__ */ i.jsx("span", { className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${x.enabled ? "translate-x-4" : "translate-x-0"}` })
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: `space-y-6 transition-opacity ${x.enabled ? "opacity-100" : "opacity-40 pointer-events-none"}`, children: [
        /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: "触发条件" }),
          /* @__PURE__ */ i.jsx("div", { className: "flex gap-6", children: kg.map((L) => /* @__PURE__ */ i.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer group",
              children: [
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${x.trigger === L.id ? "border-primary bg-primary" : "border-border group-hover:border-muted-foreground"}`,
                    children: x.trigger === L.id && /* @__PURE__ */ i.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ i.jsx("span", { className: `text-sm transition-colors ${x.trigger === L.id ? "text-foreground" : "text-muted-foreground"}`, children: L.label })
              ]
            },
            L.id
          )) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: $.label }),
            /* @__PURE__ */ i.jsx("span", { className: "text-xs font-mono text-primary", children: $.value })
          ] }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "range",
              min: $.min,
              max: $.max,
              step: $.step,
              value: $.value,
              onChange: (L) => {
                const B = x.trigger === "token" ? "tokenLimit" : x.trigger === "floor" ? "floorLimit" : "countLimit";
                q(B, Number(L.target.value));
              },
              className: "w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground/60 font-mono", children: [
            /* @__PURE__ */ i.jsx("span", { children: $.min }),
            /* @__PURE__ */ i.jsx("span", { children: Math.round(($.min + $.max) / 2) }),
            /* @__PURE__ */ i.jsx("span", { children: $.max })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: () => console.log("手动触发精简..."),
            children: [
              /* @__PURE__ */ i.jsx(o3, { size: 14 }),
              "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, Rg = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ i.jsx(qo, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ i.jsx(sr, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ i.jsx(Yo, { size: 16 }) }
], Dg = [
  { id: "devlog", label: "模型日志", linkTo: "devlog" },
  { id: "presets", label: "提示词模板", linkTo: "presets" }
], Ug = ({ onNavigate: o }) => {
  const [s, u] = O.useState("summary");
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between border-b border-border mb-6", children: [
      /* @__PURE__ */ i.jsx(
        qi,
        {
          tabs: Rg,
          activeTab: s,
          onChange: (c) => u(c),
          sticky: !1,
          className: "border-b-0 mb-0"
        }
      ),
      /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-4 pr-2", children: Dg.map((c) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
          onClick: () => o == null ? void 0 : o(c.linkTo),
          children: [
            /* @__PURE__ */ i.jsx(Ah, { size: 12 }),
            c.label
          ]
        },
        c.id
      )) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "summary" && /* @__PURE__ */ i.jsx(Og, {}),
      s === "vectorization" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ i.jsx(sr, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ i.jsx(ih, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, Vt = {
  primary: "#FFFFFF",
  grid: "#111111"
}, Bg = ({ onComplete: o }) => {
  const s = O.useRef(null), u = O.useRef(null), c = O.useRef(null), f = O.useRef(null), [h, x] = O.useState(!1);
  O.useEffect(() => {
    if (window.gsap) {
      x(!0);
      return;
    }
    const p = document.createElement("script");
    p.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", p.async = !0, p.onload = () => x(!0), document.body.appendChild(p);
  }, []);
  const v = () => {
    var V;
    if (!h || !u.current) return;
    const p = window.gsap, S = u.current, A = S.getTotalLength();
    p.set(S, {
      strokeDasharray: A,
      strokeDashoffset: A,
      stroke: Vt.primary,
      fillOpacity: 0,
      opacity: 1,
      strokeWidth: 2
    });
    const j = (V = c.current) == null ? void 0 : V.querySelectorAll("path");
    j && p.set(j, { opacity: 0, y: 10 }), p.set(f.current, { scale: 1, opacity: 1 }), p.set(s.current, { opacity: 1 });
    const D = p.timeline({
      onComplete: () => {
        p.to(s.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: o
        });
      }
    });
    D.to(S, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), j && D.to(j, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), D.to({}, { duration: 1 });
  };
  return O.useEffect(() => {
    if (h) {
      const p = setTimeout(v, 800);
      return () => clearTimeout(p);
    }
  }, [h]), /* @__PURE__ */ i.jsxs(
    "div",
    {
      ref: s,
      className: "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden",
      style: { touchAction: "none" },
      children: [
        /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: `
                        linear-gradient(to right, ${Vt.grid} 1px, transparent 1px),
                        linear-gradient(to bottom, ${Vt.grid} 1px, transparent 1px)
                    `,
              backgroundSize: "40px 40px",
              opacity: 0.3
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: { background: "radial-gradient(circle at center, transparent 0%, black 100%)", opacity: 0.9 }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "z-10 relative flex flex-col items-center justify-center w-full h-full p-4", children: [
          /* @__PURE__ */ i.jsx("div", { className: "w-full max-w-[600px] md:max-w-[800px] aspect-[4/3]", children: /* @__PURE__ */ i.jsx(
            "svg",
            {
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "250 0 550 600",
              className: "w-full h-full overflow-visible",
              children: /* @__PURE__ */ i.jsxs("g", { ref: f, className: "origin-center", children: [
                /* @__PURE__ */ i.jsx(
                  "path",
                  {
                    ref: u,
                    fill: "none",
                    stroke: Vt.primary,
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M463.360840,364.455627 C437.246704,381.338409 406.466644,366.209045 404.026672,335.650848 C402.910156,321.667206 412.549713,306.544678 426.813293,300.633850 C430.474335,299.116699 431.826355,297.290924 431.760071,293.302460 C431.519287,278.808716 431.584564,264.307892 431.718292,249.811417 C431.748169,246.574463 430.886292,244.713684 427.681274,243.389038 C412.366425,237.059357 404.237366,225.144638 404.208862,208.867447 C404.179871,192.298615 412.621979,180.486938 428.224701,174.293686 C430.850494,173.251419 431.710938,171.751862 431.696136,169.060089 C431.613586,154.062912 431.568054,139.064117 431.723419,124.068092 C431.759430,120.590492 430.119568,119.052467 427.243103,117.790627 C413.349915,111.695946 405.841095,101.009903 404.195740,85.916542 C402.099884,66.690948 418.566650,47.364159 437.884277,46.682220 C456.888519,46.011345 468.064789,52.989845 476.252197,70.840332 C477.174438,72.851059 478.313995,73.541710 480.422974,73.516098 C499.569031,73.283493 518.722961,73.393646 537.862915,73.456795 C545.529785,73.482086 549.225952,71.767975 552.791809,64.663139 C559.898376,50.503635 576.618042,43.921410 592.447876,47.234680 C608.699890,50.636322 619.276489,62.116261 621.438904,78.701805 C623.839478,97.113228 612.679382,114.371338 595.357910,119.034004 C577.219604,123.916542 558.125427,115.204048 550.887390,98.365906 C549.251465,94.560234 547.316284,93.116508 543.150696,93.160004 C522.989380,93.370483 502.824707,93.284561 482.661285,93.261726 C479.716156,93.258385 477.395905,93.379341 475.956635,96.902077 C474.571899,100.291283 475.702576,102.070137 477.892181,104.225159 C501.524139,127.483910 525.127991,150.771423 548.653259,174.137985 C550.803162,176.273376 552.520325,176.380997 555.207153,175.171799 C569.642334,168.675354 583.205750,171.177368 594.759277,181.252563 C606.783813,191.738449 610.379395,205.504944 605.248840,220.725037 C600.321167,235.343246 589.568848,243.345337 574.305420,245.467117 C567.655396,246.391541 561.334045,245.373352 555.347839,242.591797 C552.373169,241.209595 550.274536,241.303284 547.832886,243.728531 C524.197693,267.205322 500.499634,290.619415 476.704651,313.934174 C474.165771,316.421844 475.106598,318.487793 476.015411,321.059723 C476.869354,323.476318 478.159149,324.356232 480.796143,324.332367 C501.456360,324.145294 522.118530,324.019531 542.778870,324.122131 C546.987793,324.143005 549.216675,322.931549 551.044983,318.871887 C558.230042,302.918091 576.073181,294.652069 593.497131,298.684143 C610.451355,302.607544 622.335205,317.668091 622.119812,334.958160 C621.900024,352.608002 609.316650,367.564362 591.822144,370.969543 C574.585754,374.324463 557.004028,364.861755 550.521484,348.456757 C549.268677,345.286346 547.631836,344.200745 544.294861,344.220337 C523.465576,344.342865 502.634888,344.322540 481.805359,344.218109 C478.697174,344.202545 476.993927,345.152252 475.888916,348.205902 C473.513214,354.771179 469.417969,360.183167 463.360840,364.455627 M472.733368,188.880936 C473.545441,190.333145 474.799072,191.702774 475.088898,193.252655 C476.058929,198.439468 479.434326,198.919983 483.888489,198.861130 C499.042145,198.660889 514.201233,198.707901 529.355957,198.872879 C532.819580,198.910583 534.700989,197.913788 536.177185,194.588806 C537.657104,191.255417 536.060120,189.735016 534.097900,187.805573 C510.706268,164.804840 487.354065,141.764008 463.949341,118.776604 C462.445251,117.299316 461.277863,114.441566 458.282349,116.423027 C455.343719,118.366882 451.028107,118.406143 451.180542,123.994591 C451.584534,138.807007 451.429443,153.638779 451.250458,168.459885 C451.208984,171.894135 452.474548,173.487930 455.559784,174.673798 C462.566864,177.367126 468.343140,181.758774 472.733368,188.880936 M457.308807,300.958954 C460.540070,302.823181 462.218414,300.310028 464.063263,298.488586 C487.164032,275.681519 510.248199,252.857559 533.326538,230.027756 C535.300171,228.075378 537.458679,226.516449 535.970032,222.843750 C534.495117,219.205124 532.067688,218.878906 528.898010,218.890778 C513.414001,218.948746 497.929138,219.002151 482.445862,218.887329 C478.998230,218.861771 477.090668,219.941055 475.670502,223.284790 C471.742218,232.533905 465.159332,239.474701 455.665497,243.103836 C452.239746,244.413376 451.216278,246.302231 451.253540,249.781387 C451.406891,264.098541 451.489380,278.421356 451.223358,292.735107 C451.142975,297.059998 452.224640,299.783386 457.308807,300.958954 z"
                  }
                ),
                /* @__PURE__ */ i.jsxs("g", { ref: c, children: [
                  /* @__PURE__ */ i.jsx("path", { fill: Vt.primary, d: "M732.215698,483.876190 C732.750061,488.775055 731.110779,490.523590 726.372742,490.479736 C713.642639,490.361908 713.645874,490.566711 713.641113,477.834442 C713.638428,470.668732 713.788818,463.497284 713.552246,456.338928 C713.318970,449.278015 710.633911,445.451111 705.788818,444.403778 C698.667542,442.864441 692.689270,447.076904 692.324463,454.647736 C691.851685,464.458313 691.862549,474.305084 692.048706,484.128967 C692.137085,488.792786 690.778625,490.578705 685.827454,490.500549 C672.843933,490.295532 672.845886,490.510315 672.820435,477.502625 C672.805786,470.003754 672.887146,462.502136 672.708618,455.006927 C672.557556,448.666412 669.519653,444.981689 664.341858,444.320343 C658.234436,443.540314 653.997803,446.541077 652.162415,452.864807 C651.503052,455.136719 651.331299,457.435608 651.335754,459.781158 C651.352234,468.446747 651.306274,477.112488 651.338745,485.777985 C651.348389,488.341766 651.062439,490.138977 647.717529,490.447815 C632.733521,491.831421 632.748596,491.913239 632.764404,477.031830 C632.778870,463.366852 632.738831,449.701782 632.731445,436.036774 C632.727478,428.732941 632.735718,428.732544 640.257812,428.707031 C641.591003,428.702484 642.924194,428.695312 644.257324,428.701721 C647.429321,428.717010 651.058289,427.916016 650.925598,433.229431 C655.308960,431.486603 658.595154,429.192383 662.595154,428.377930 C670.453491,426.777832 677.619019,428.117981 683.735718,433.181641 C686.512207,435.480164 688.239807,435.373474 690.953918,433.250153 C697.176208,428.382202 704.485840,426.832367 712.194946,428.080414 C725.100098,430.169739 731.944641,439.074829 732.175659,453.896454 C732.328857,463.726379 732.212036,473.560547 732.215698,483.876190 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: Vt.primary, d: "M487.575867,485.935303 C487.614716,484.616028 487.614716,483.640503 487.614716,481.796417 C479.116760,488.238525 470.153107,489.257660 460.718079,486.787720 C454.401794,485.134186 449.163879,481.675842 445.200134,476.457642 C436.960876,465.610748 437.295532,448.722229 445.889771,438.315796 C455.451538,426.737823 470.295227,425.042450 488.444458,433.733826 C487.913239,428.612457 491.194366,428.604004 494.772766,428.684540 C508.272736,428.988373 506.179840,426.849945 506.294434,440.421967 C506.411133,454.245575 506.366882,468.071228 506.299957,481.895538 C506.205750,501.359833 494.742065,512.847900 475.259460,513.370544 C465.272614,513.638489 455.717651,512.255005 446.682343,507.725311 C443.034790,505.896667 441.336151,503.847290 444.229065,500.105438 C444.329590,499.975464 444.390869,499.814941 444.469086,499.667908 C448.861603,491.411743 448.894196,491.340729 457.207886,495.157196 C463.352356,497.977905 469.817169,498.376801 476.285126,497.456818 C482.543640,496.566620 486.238434,492.476532 487.575867,485.935303 M469.264740,471.577881 C471.084900,471.642700 472.915710,471.865356 474.723328,471.743805 C481.074341,471.316620 486.258820,466.628052 487.489288,460.346558 C488.669373,454.322296 485.713593,448.118378 480.288971,445.234039 C472.426056,441.053253 462.868591,443.867035 459.399658,451.384033 C455.705688,459.388580 459.382996,467.492737 469.264740,471.577881 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: Vt.primary, d: "M350.790619,410.644409 C354.007477,410.561554 355.147522,411.945587 355.144592,414.620361 C355.128937,428.846375 356.152588,426.165161 344.558044,426.338898 C335.900940,426.468628 327.237854,426.493591 318.582581,426.315826 C314.804382,426.238220 313.157715,427.376373 313.262451,431.424896 C313.571655,443.375275 312.019470,441.570435 323.204529,441.691742 C330.530579,441.771271 337.860626,441.831665 345.183899,441.671692 C348.853607,441.591553 350.203705,443.056824 350.190338,446.675842 C350.143219,459.433014 350.725433,457.207275 340.024445,457.368561 C332.865692,457.476471 325.700195,457.536346 318.545349,457.339996 C314.731018,457.235291 313.250702,458.478516 313.234222,462.478668 C313.185364,474.308960 313.038177,474.321259 324.813477,474.130890 C334.298523,473.977539 343.772430,475.169159 353.264343,474.338776 C354.864075,474.198792 356.466827,474.576569 356.702301,476.439850 C357.203217,480.403656 357.364838,484.405273 356.646729,488.365631 C356.297211,490.293060 354.652405,490.369568 353.118927,490.370575 C334.801880,490.382568 316.484711,490.350647 298.167847,490.412506 C295.104187,490.422852 294.024323,488.921082 294.024200,486.130402 C294.023224,462.484924 294.047699,438.839325 293.967896,415.194092 C293.954620,411.261261 296.028046,410.593658 299.359711,410.610138 C316.344330,410.694275 333.329620,410.638672 350.790619,410.644409 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: Vt.primary, d: "M620.003906,453.402435 C620.062195,464.023071 619.882812,474.188721 620.189575,484.339661 C620.338318,489.262421 618.431458,490.973572 613.757507,490.452362 C611.783386,490.232208 609.754700,490.291412 607.767883,490.444916 C604.889648,490.667267 602.478821,490.168823 601.296570,486.513000 C594.831909,490.991821 587.888184,491.843719 580.600464,491.328247 C565.916626,490.289642 557.201233,476.053131 563.502625,463.374390 C565.502930,459.349640 568.872803,457.136932 572.794861,455.506927 C578.118103,453.294647 583.702881,452.709900 589.425354,452.731232 C592.879822,452.744110 596.387085,453.235260 599.791443,452.317169 C599.855774,446.843750 597.260681,443.903503 591.552673,443.177338 C585.446533,442.400513 579.495911,443.228607 574.179382,446.386688 C570.948853,448.305603 569.535645,447.214966 568.011658,444.340485 C563.043945,434.970917 563.058899,434.663818 573.199219,430.800537 C582.143921,427.392792 591.347961,426.734100 600.678101,428.904358 C613.358643,431.853943 619.173157,440.405762 620.003906,453.402435 M582.869263,466.083313 C579.496887,469.605530 579.013306,473.431427 581.947998,475.906952 C585.513611,478.914764 589.714966,478.291107 593.721985,477.031647 C597.412354,475.871704 599.990784,473.365112 600.658081,469.369629 C601.070496,466.900665 600.409729,465.044220 597.411255,465.098297 C592.800171,465.181488 588.157471,464.530182 582.869263,466.083313 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: Vt.primary, d: "M410.915314,457.280090 C410.311127,447.930115 406.925934,444.198608 399.452026,444.194855 C391.667114,444.190948 386.727997,448.953094 386.409271,457.536652 C386.075653,466.521088 386.068634,475.532593 386.350006,484.518738 C386.494904,489.147247 384.896912,490.532959 380.337830,490.481964 C367.440552,490.337616 367.627808,490.513641 367.533173,477.713593 C367.426025,463.226135 368.160004,448.728760 367.168365,434.251617 C366.898468,430.311462 368.239288,428.249725 372.529694,428.668640 C374.840057,428.894196 377.203857,428.868896 379.519684,428.673553 C383.194244,428.363556 385.817352,429.188293 385.487488,434.182526 C390.858826,430.844635 395.856995,428.304504 401.601257,427.794434 C418.292908,426.312286 429.386810,436.518799 429.975342,454.379517 C430.315308,464.696716 429.971527,475.035126 430.046204,485.363190 C430.071198,488.817627 428.985992,490.534210 425.145325,490.442291 C408.307220,490.039520 411.204895,492.848450 410.942963,476.734924 C410.840088,470.406036 410.927368,464.074036 410.915314,457.280090 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: Vt.primary, d: "M556.799500,444.921539 C554.214233,445.227783 552.026184,445.174683 549.913574,445.548401 C542.544189,446.852142 538.560974,452.210632 538.387756,461.266998 C538.231995,469.411011 538.239258,477.561676 538.377136,485.705963 C538.433838,489.055634 537.355591,490.537964 533.812988,490.447296 C516.656677,490.008148 519.942505,492.939087 519.712585,476.823181 C519.510925,462.693848 519.801025,448.557343 519.590698,434.428253 C519.527222,430.165985 520.732788,428.169983 525.216187,428.665833 C527.350830,428.901917 529.549255,428.854156 531.692566,428.654297 C535.487610,428.300446 537.940002,429.350586 537.432373,434.447845 C542.475464,431.817810 546.689819,428.862549 551.859985,428.147003 C557.409912,427.378845 558.504028,428.019318 558.285950,433.612213 C558.141113,437.327057 559.514648,441.236115 556.799500,444.921539 z" })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ i.jsx("p", { className: "mt-6 md:mt-8 text-white/30 text-xs md:text-sm tracking-widest uppercase", children: "Where memories leave their trace" })
        ] })
      ]
    }
  );
}, Hg = ({ onClose: o }) => {
  const [s, u] = O.useState("dashboard"), [c, f] = O.useState(!1), [h, x] = O.useState(!1);
  O.useEffect(() => {
    const S = setTimeout(() => {
      const A = Et.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", A), A || f(!0), x(!0);
    }, 1e3);
    return () => clearTimeout(S);
  }, []);
  const v = () => {
    Et.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), f(!1);
  };
  if (!h)
    return null;
  const p = () => {
    switch (s) {
      case "dashboard":
        return /* @__PURE__ */ i.jsx(j1, { onNavigate: u });
      case "presets":
        return /* @__PURE__ */ i.jsx(bg, {});
      case "graph":
        return /* @__PURE__ */ i.jsx(z5, {});
      case "devlog":
        return /* @__PURE__ */ i.jsx(G5, {});
      case "settings":
        return /* @__PURE__ */ i.jsx(Mg, {});
      case "memory":
        return /* @__PURE__ */ i.jsx(wg, {});
      case "processing":
        return /* @__PURE__ */ i.jsx(Ug, { onNavigate: u });
      default:
        return /* @__PURE__ */ i.jsx(j1, {});
    }
  };
  return /* @__PURE__ */ i.jsxs(t2, { children: [
    c && /* @__PURE__ */ i.jsx(Bg, { onComplete: v }),
    /* @__PURE__ */ i.jsx(g5, { activeTab: s, setActiveTab: u, onClose: o, children: p() })
  ] });
};
var Lg = D1();
const qg = /* @__PURE__ */ Do(Lg), Gg = () => {
  const [o, s] = O.useState(!1), [u, c] = O.useState(null), [f, h] = O.useState("");
  O.useEffect(() => {
    const p = ca.on(
      Bl.ENGRAM_REQUEST_REVISION,
      (S) => {
        const A = S;
        c(A), h(A.content), s(!0);
      }
    );
    return () => {
      p();
    };
  }, []);
  const x = () => {
    u && (u.onConfirm(f), s(!1), c(null));
  }, v = () => {
    u && u.onCancel(), s(!1), c(null);
  };
  return o ? qg.createPortal(
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[11000] flex items-center justify-center p-4",
        style: { height: "100dvh", width: "100vw" },
        children: [
          /* @__PURE__ */ i.jsx(
            "div",
            {
              className: "absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200",
              onClick: v
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "relative w-full max-w-2xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-border", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ i.jsx("h3", { className: "text-lg font-medium text-foreground tracking-tight", children: (u == null ? void 0 : u.title) || "内容修订" }),
                (u == null ? void 0 : u.description) && /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: u.description })
              ] }),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: v,
                  className: "p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ i.jsx(Yi, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ i.jsx(S3, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ i.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "请仔细检查内容的格式、关键信息和一致性。这是写入长期记忆前的最后确认。" })
              ] }),
              /* @__PURE__ */ i.jsx(
                "textarea",
                {
                  value: f,
                  onChange: (p) => h(p.target.value),
                  className: "flex-1 w-full min-h-[200px] p-4 bg-muted border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                  spellCheck: !1,
                  placeholder: "在此编辑内容..."
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-muted-foreground text-right font-mono", children: [
                f.length,
                " 字符"
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-muted/30", children: [
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: v,
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors",
                  children: "取消"
                }
              ),
              /* @__PURE__ */ i.jsxs(
                "button",
                {
                  onClick: x,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity",
                  children: [
                    /* @__PURE__ */ i.jsx(q1, { size: 16 }),
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
S5((o, s) => {
  const u = U1.createRoot(o);
  return u.render(q4.createElement(Hg, { onClose: s })), u;
});
j5((o) => {
  const s = U1.createRoot(o);
  return s.render(
    /* @__PURE__ */ i.jsx(t2, { children: /* @__PURE__ */ i.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ i.jsx(Gg, {}) }) })
  ), s;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", v1) : v1();
//# sourceMappingURL=index.js.map
