var W4 = Object.defineProperty;
var J4 = (n, r, l) => r in n ? W4(n, r, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[r] = l;
var Je = (n, r, l) => J4(n, typeof r != "symbol" ? r + "" : r, l);
function ni(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Vc = { exports: {} }, ea = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var y0;
function ey() {
  if (y0) return ea;
  y0 = 1;
  var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function l(a, s, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), s.key !== void 0 && (f = "" + s.key), "key" in s) {
      u = {};
      for (var h in s)
        h !== "key" && (u[h] = s[h]);
    } else u = s;
    return s = u.ref, {
      $$typeof: n,
      type: a,
      key: f,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return ea.Fragment = r, ea.jsx = l, ea.jsxs = l, ea;
}
var b0;
function ty() {
  return b0 || (b0 = 1, Vc.exports = ey()), Vc.exports;
}
var d = ty(), $c = { exports: {} }, Se = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var v0;
function ny() {
  if (v0) return Se;
  v0 = 1;
  var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), x = Symbol.for("react.activity"), S = Symbol.iterator;
  function v(A) {
    return A === null || typeof A != "object" ? null : (A = S && A[S] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var C = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, M = {};
  function T(A, Q, w) {
    this.props = A, this.context = Q, this.refs = M, this.updater = w || C;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(A, Q) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, Q, "setState");
  }, T.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function I() {
  }
  I.prototype = T.prototype;
  function L(A, Q, w) {
    this.props = A, this.context = Q, this.refs = M, this.updater = w || C;
  }
  var re = L.prototype = new I();
  re.constructor = L, j(re, T.prototype), re.isPureReactComponent = !0;
  var le = Array.isArray;
  function _() {
  }
  var U = { H: null, A: null, T: null, S: null }, ae = Object.prototype.hasOwnProperty;
  function fe(A, Q, w) {
    var G = w.ref;
    return {
      $$typeof: n,
      type: A,
      key: Q,
      ref: G !== void 0 ? G : null,
      props: w
    };
  }
  function R(A, Q) {
    return fe(A.type, Q, A.props);
  }
  function O(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function J(A) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(w) {
      return Q[w];
    });
  }
  var ue = /\/+/g;
  function ie(A, Q) {
    return typeof A == "object" && A !== null && A.key != null ? J("" + A.key) : Q.toString(36);
  }
  function ee(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(_, _) : (A.status = "pending", A.then(
          function(Q) {
            A.status === "pending" && (A.status = "fulfilled", A.value = Q);
          },
          function(Q) {
            A.status === "pending" && (A.status = "rejected", A.reason = Q);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function B(A, Q, w, G, P) {
    var te = typeof A;
    (te === "undefined" || te === "boolean") && (A = null);
    var xe = !1;
    if (A === null) xe = !0;
    else
      switch (te) {
        case "bigint":
        case "string":
        case "number":
          xe = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case n:
            case r:
              xe = !0;
              break;
            case y:
              return xe = A._init, B(
                xe(A._payload),
                Q,
                w,
                G,
                P
              );
          }
      }
    if (xe)
      return P = P(A), xe = G === "" ? "." + ie(A, 0) : G, le(P) ? (w = "", xe != null && (w = xe.replace(ue, "$&/") + "/"), B(P, Q, w, "", function(Tt) {
        return Tt;
      })) : P != null && (O(P) && (P = R(
        P,
        w + (P.key == null || A && A.key === P.key ? "" : ("" + P.key).replace(
          ue,
          "$&/"
        ) + "/") + xe
      )), Q.push(P)), 1;
    xe = 0;
    var ze = G === "" ? "." : G + ":";
    if (le(A))
      for (var De = 0; De < A.length; De++)
        G = A[De], te = ze + ie(G, De), xe += B(
          G,
          Q,
          w,
          te,
          P
        );
    else if (De = v(A), typeof De == "function")
      for (A = De.call(A), De = 0; !(G = A.next()).done; )
        G = G.value, te = ze + ie(G, De++), xe += B(
          G,
          Q,
          w,
          te,
          P
        );
    else if (te === "object") {
      if (typeof A.then == "function")
        return B(
          ee(A),
          Q,
          w,
          G,
          P
        );
      throw Q = String(A), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return xe;
  }
  function Y(A, Q, w) {
    if (A == null) return A;
    var G = [], P = 0;
    return B(A, G, "", "", function(te) {
      return Q.call(w, te, P++);
    }), G;
  }
  function se(A) {
    if (A._status === -1) {
      var Q = A._result;
      Q = Q(), Q.then(
        function(w) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = w);
        },
        function(w) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = w);
        }
      ), A._status === -1 && (A._status = 0, A._result = Q);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var he = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, E = {
    map: Y,
    forEach: function(A, Q, w) {
      Y(
        A,
        function() {
          Q.apply(this, arguments);
        },
        w
      );
    },
    count: function(A) {
      var Q = 0;
      return Y(A, function() {
        Q++;
      }), Q;
    },
    toArray: function(A) {
      return Y(A, function(Q) {
        return Q;
      }) || [];
    },
    only: function(A) {
      if (!O(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Se.Activity = x, Se.Children = E, Se.Component = T, Se.Fragment = l, Se.Profiler = s, Se.PureComponent = L, Se.StrictMode = a, Se.Suspense = p, Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U, Se.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return U.H.useMemoCache(A);
    }
  }, Se.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Se.cacheSignal = function() {
    return null;
  }, Se.cloneElement = function(A, Q, w) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var G = j({}, A.props), P = A.key;
    if (Q != null)
      for (te in Q.key !== void 0 && (P = "" + Q.key), Q)
        !ae.call(Q, te) || te === "key" || te === "__self" || te === "__source" || te === "ref" && Q.ref === void 0 || (G[te] = Q[te]);
    var te = arguments.length - 2;
    if (te === 1) G.children = w;
    else if (1 < te) {
      for (var xe = Array(te), ze = 0; ze < te; ze++)
        xe[ze] = arguments[ze + 2];
      G.children = xe;
    }
    return fe(A.type, P, G);
  }, Se.createContext = function(A) {
    return A = {
      $$typeof: f,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: u,
      _context: A
    }, A;
  }, Se.createElement = function(A, Q, w) {
    var G, P = {}, te = null;
    if (Q != null)
      for (G in Q.key !== void 0 && (te = "" + Q.key), Q)
        ae.call(Q, G) && G !== "key" && G !== "__self" && G !== "__source" && (P[G] = Q[G]);
    var xe = arguments.length - 2;
    if (xe === 1) P.children = w;
    else if (1 < xe) {
      for (var ze = Array(xe), De = 0; De < xe; De++)
        ze[De] = arguments[De + 2];
      P.children = ze;
    }
    if (A && A.defaultProps)
      for (G in xe = A.defaultProps, xe)
        P[G] === void 0 && (P[G] = xe[G]);
    return fe(A, te, P);
  }, Se.createRef = function() {
    return { current: null };
  }, Se.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Se.isValidElement = O, Se.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: se
    };
  }, Se.memo = function(A, Q) {
    return {
      $$typeof: g,
      type: A,
      compare: Q === void 0 ? null : Q
    };
  }, Se.startTransition = function(A) {
    var Q = U.T, w = {};
    U.T = w;
    try {
      var G = A(), P = U.S;
      P !== null && P(w, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(_, he);
    } catch (te) {
      he(te);
    } finally {
      Q !== null && w.types !== null && (Q.types = w.types), U.T = Q;
    }
  }, Se.unstable_useCacheRefresh = function() {
    return U.H.useCacheRefresh();
  }, Se.use = function(A) {
    return U.H.use(A);
  }, Se.useActionState = function(A, Q, w) {
    return U.H.useActionState(A, Q, w);
  }, Se.useCallback = function(A, Q) {
    return U.H.useCallback(A, Q);
  }, Se.useContext = function(A) {
    return U.H.useContext(A);
  }, Se.useDebugValue = function() {
  }, Se.useDeferredValue = function(A, Q) {
    return U.H.useDeferredValue(A, Q);
  }, Se.useEffect = function(A, Q) {
    return U.H.useEffect(A, Q);
  }, Se.useEffectEvent = function(A) {
    return U.H.useEffectEvent(A);
  }, Se.useId = function() {
    return U.H.useId();
  }, Se.useImperativeHandle = function(A, Q, w) {
    return U.H.useImperativeHandle(A, Q, w);
  }, Se.useInsertionEffect = function(A, Q) {
    return U.H.useInsertionEffect(A, Q);
  }, Se.useLayoutEffect = function(A, Q) {
    return U.H.useLayoutEffect(A, Q);
  }, Se.useMemo = function(A, Q) {
    return U.H.useMemo(A, Q);
  }, Se.useOptimistic = function(A, Q) {
    return U.H.useOptimistic(A, Q);
  }, Se.useReducer = function(A, Q, w) {
    return U.H.useReducer(A, Q, w);
  }, Se.useRef = function(A) {
    return U.H.useRef(A);
  }, Se.useState = function(A) {
    return U.H.useState(A);
  }, Se.useSyncExternalStore = function(A, Q, w) {
    return U.H.useSyncExternalStore(
      A,
      Q,
      w
    );
  }, Se.useTransition = function() {
    return U.H.useTransition();
  }, Se.version = "19.2.3", Se;
}
var S0;
function ya() {
  return S0 || (S0 = 1, $c.exports = ny()), $c.exports;
}
var V = ya();
const Zp = /* @__PURE__ */ ni(V);
var Gc = { exports: {} }, ta = {}, Yc = { exports: {} }, Xc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var k0;
function ry() {
  return k0 || (k0 = 1, (function(n) {
    function r(B, Y) {
      var se = B.length;
      B.push(Y);
      e: for (; 0 < se; ) {
        var he = se - 1 >>> 1, E = B[he];
        if (0 < s(E, Y))
          B[he] = Y, B[se] = E, se = he;
        else break e;
      }
    }
    function l(B) {
      return B.length === 0 ? null : B[0];
    }
    function a(B) {
      if (B.length === 0) return null;
      var Y = B[0], se = B.pop();
      if (se !== Y) {
        B[0] = se;
        e: for (var he = 0, E = B.length, A = E >>> 1; he < A; ) {
          var Q = 2 * (he + 1) - 1, w = B[Q], G = Q + 1, P = B[G];
          if (0 > s(w, se))
            G < E && 0 > s(P, w) ? (B[he] = P, B[G] = se, he = G) : (B[he] = w, B[Q] = se, he = Q);
          else if (G < E && 0 > s(P, se))
            B[he] = P, B[G] = se, he = G;
          else break e;
        }
      }
      return Y;
    }
    function s(B, Y) {
      var se = B.sortIndex - Y.sortIndex;
      return se !== 0 ? se : B.id - Y.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      n.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, h = f.now();
      n.unstable_now = function() {
        return f.now() - h;
      };
    }
    var p = [], g = [], y = 1, x = null, S = 3, v = !1, C = !1, j = !1, M = !1, T = typeof setTimeout == "function" ? setTimeout : null, I = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function re(B) {
      for (var Y = l(g); Y !== null; ) {
        if (Y.callback === null) a(g);
        else if (Y.startTime <= B)
          a(g), Y.sortIndex = Y.expirationTime, r(p, Y);
        else break;
        Y = l(g);
      }
    }
    function le(B) {
      if (j = !1, re(B), !C)
        if (l(p) !== null)
          C = !0, _ || (_ = !0, J());
        else {
          var Y = l(g);
          Y !== null && ee(le, Y.startTime - B);
        }
    }
    var _ = !1, U = -1, ae = 5, fe = -1;
    function R() {
      return M ? !0 : !(n.unstable_now() - fe < ae);
    }
    function O() {
      if (M = !1, _) {
        var B = n.unstable_now();
        fe = B;
        var Y = !0;
        try {
          e: {
            C = !1, j && (j = !1, I(U), U = -1), v = !0;
            var se = S;
            try {
              t: {
                for (re(B), x = l(p); x !== null && !(x.expirationTime > B && R()); ) {
                  var he = x.callback;
                  if (typeof he == "function") {
                    x.callback = null, S = x.priorityLevel;
                    var E = he(
                      x.expirationTime <= B
                    );
                    if (B = n.unstable_now(), typeof E == "function") {
                      x.callback = E, re(B), Y = !0;
                      break t;
                    }
                    x === l(p) && a(p), re(B);
                  } else a(p);
                  x = l(p);
                }
                if (x !== null) Y = !0;
                else {
                  var A = l(g);
                  A !== null && ee(
                    le,
                    A.startTime - B
                  ), Y = !1;
                }
              }
              break e;
            } finally {
              x = null, S = se, v = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? J() : _ = !1;
        }
      }
    }
    var J;
    if (typeof L == "function")
      J = function() {
        L(O);
      };
    else if (typeof MessageChannel < "u") {
      var ue = new MessageChannel(), ie = ue.port2;
      ue.port1.onmessage = O, J = function() {
        ie.postMessage(null);
      };
    } else
      J = function() {
        T(O, 0);
      };
    function ee(B, Y) {
      U = T(function() {
        B(n.unstable_now());
      }, Y);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, n.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ae = 0 < B ? Math.floor(1e3 / B) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(B) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = S;
      }
      var se = S;
      S = Y;
      try {
        return B();
      } finally {
        S = se;
      }
    }, n.unstable_requestPaint = function() {
      M = !0;
    }, n.unstable_runWithPriority = function(B, Y) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var se = S;
      S = B;
      try {
        return Y();
      } finally {
        S = se;
      }
    }, n.unstable_scheduleCallback = function(B, Y, se) {
      var he = n.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? he + se : he) : se = he, B) {
        case 1:
          var E = -1;
          break;
        case 2:
          E = 250;
          break;
        case 5:
          E = 1073741823;
          break;
        case 4:
          E = 1e4;
          break;
        default:
          E = 5e3;
      }
      return E = se + E, B = {
        id: y++,
        callback: Y,
        priorityLevel: B,
        startTime: se,
        expirationTime: E,
        sortIndex: -1
      }, se > he ? (B.sortIndex = se, r(g, B), l(p) === null && B === l(g) && (j ? (I(U), U = -1) : j = !0, ee(le, se - he))) : (B.sortIndex = E, r(p, B), C || v || (C = !0, _ || (_ = !0, J()))), B;
    }, n.unstable_shouldYield = R, n.unstable_wrapCallback = function(B) {
      var Y = S;
      return function() {
        var se = S;
        S = Y;
        try {
          return B.apply(this, arguments);
        } finally {
          S = se;
        }
      };
    };
  })(Xc)), Xc;
}
var C0;
function ly() {
  return C0 || (C0 = 1, Yc.exports = ry()), Yc.exports;
}
var Qc = { exports: {} }, vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var w0;
function iy() {
  if (w0) return vt;
  w0 = 1;
  var n = ya();
  function r(p) {
    var g = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        g += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var a = {
    d: {
      f: l,
      r: function() {
        throw Error(r(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
    },
    p: 0,
    findDOMNode: null
  }, s = Symbol.for("react.portal");
  function u(p, g, y) {
    var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: x == null ? null : "" + x,
      children: p,
      containerInfo: g,
      implementation: y
    };
  }
  var f = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, g) {
    if (p === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, vt.createPortal = function(p, g) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(r(299));
    return u(p, g, null, y);
  }, vt.flushSync = function(p) {
    var g = f.T, y = a.p;
    try {
      if (f.T = null, a.p = 2, p) return p();
    } finally {
      f.T = g, a.p = y, a.d.f();
    }
  }, vt.preconnect = function(p, g) {
    typeof p == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, a.d.C(p, g));
  }, vt.prefetchDNS = function(p) {
    typeof p == "string" && a.d.D(p);
  }, vt.preinit = function(p, g) {
    if (typeof p == "string" && g && typeof g.as == "string") {
      var y = g.as, x = h(y, g.crossOrigin), S = typeof g.integrity == "string" ? g.integrity : void 0, v = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      y === "style" ? a.d.S(
        p,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: x,
          integrity: S,
          fetchPriority: v
        }
      ) : y === "script" && a.d.X(p, {
        crossOrigin: x,
        integrity: S,
        fetchPriority: v,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, vt.preinitModule = function(p, g) {
    if (typeof p == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var y = h(
            g.as,
            g.crossOrigin
          );
          a.d.M(p, {
            crossOrigin: y,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && a.d.M(p);
  }, vt.preload = function(p, g) {
    if (typeof p == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var y = g.as, x = h(y, g.crossOrigin);
      a.d.L(p, y, {
        crossOrigin: x,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, vt.preloadModule = function(p, g) {
    if (typeof p == "string")
      if (g) {
        var y = h(g.as, g.crossOrigin);
        a.d.m(p, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: y,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else a.d.m(p);
  }, vt.requestFormReset = function(p) {
    a.d.r(p);
  }, vt.unstable_batchedUpdates = function(p, g) {
    return p(g);
  }, vt.useFormState = function(p, g, y) {
    return f.H.useFormState(p, g, y);
  }, vt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, vt.version = "19.2.3", vt;
}
var E0;
function Kp() {
  if (E0) return Qc.exports;
  E0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Qc.exports = iy(), Qc.exports;
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
var j0;
function ay() {
  if (j0) return ta;
  j0 = 1;
  var n = ly(), r = ya(), l = Kp();
  function a(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        t += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var t = e, i = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (i = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? i : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (u(e) !== e)
      throw Error(a(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = u(e), t === null) throw Error(a(188));
      return t !== e ? null : e;
    }
    for (var i = e, o = t; ; ) {
      var c = i.return;
      if (c === null) break;
      var m = c.alternate;
      if (m === null) {
        if (o = c.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (c.child === m.child) {
        for (m = c.child; m; ) {
          if (m === i) return p(c), e;
          if (m === o) return p(c), t;
          m = m.sibling;
        }
        throw Error(a(188));
      }
      if (i.return !== o.return) i = c, o = m;
      else {
        for (var b = !1, k = c.child; k; ) {
          if (k === i) {
            b = !0, i = c, o = m;
            break;
          }
          if (k === o) {
            b = !0, o = c, i = m;
            break;
          }
          k = k.sibling;
        }
        if (!b) {
          for (k = m.child; k; ) {
            if (k === i) {
              b = !0, i = m, o = c;
              break;
            }
            if (k === o) {
              b = !0, o = m, i = c;
              break;
            }
            k = k.sibling;
          }
          if (!b) throw Error(a(189));
        }
      }
      if (i.alternate !== o) throw Error(a(190));
    }
    if (i.tag !== 3) throw Error(a(188));
    return i.stateNode.current === i ? e : t;
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
  var x = Object.assign, S = Symbol.for("react.element"), v = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), I = Symbol.for("react.consumer"), L = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), le = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), ae = Symbol.for("react.lazy"), fe = Symbol.for("react.activity"), R = Symbol.for("react.memo_cache_sentinel"), O = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ue = Symbol.for("react.client.reference");
  function ie(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ue ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case j:
        return "Fragment";
      case T:
        return "Profiler";
      case M:
        return "StrictMode";
      case le:
        return "Suspense";
      case _:
        return "SuspenseList";
      case fe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case C:
          return "Portal";
        case L:
          return e.displayName || "Context";
        case I:
          return (e._context.displayName || "Context") + ".Consumer";
        case re:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case U:
          return t = e.displayName || null, t !== null ? t : ie(e.type) || "Memo";
        case ae:
          t = e._payload, e = e._init;
          try {
            return ie(e(t));
          } catch {
          }
      }
    return null;
  }
  var ee = Array.isArray, B = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, he = [], E = -1;
  function A(e) {
    return { current: e };
  }
  function Q(e) {
    0 > E || (e.current = he[E], he[E] = null, E--);
  }
  function w(e, t) {
    E++, he[E] = e.current, e.current = t;
  }
  var G = A(null), P = A(null), te = A(null), xe = A(null);
  function ze(e, t) {
    switch (w(te, t), w(P, e), w(G, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? I1(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = I1(t), e = F1(t, e);
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
    Q(G), w(G, e);
  }
  function De() {
    Q(G), Q(P), Q(te);
  }
  function Tt(e) {
    e.memoizedState !== null && w(xe, e);
    var t = G.current, i = F1(t, e.type);
    t !== i && (w(P, e), w(G, i));
  }
  function En(e) {
    P.current === e && (Q(G), Q(P)), xe.current === e && (Q(xe), Zi._currentValue = se);
  }
  var oi, wa;
  function jn(e) {
    if (oi === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        oi = t && t[1] || "", wa = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + oi + e + wa;
  }
  var nl = !1;
  function rl(e, t) {
    if (!e || nl) return "";
    nl = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var W = function() {
                throw Error();
              };
              if (Object.defineProperty(W.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(W, []);
                } catch ($) {
                  var F = $;
                }
                Reflect.construct(e, [], W);
              } else {
                try {
                  W.call();
                } catch ($) {
                  F = $;
                }
                e.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch ($) {
                F = $;
              }
              (W = e()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch ($) {
            if ($ && F && typeof $.stack == "string")
              return [$.stack, F.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var m = o.DetermineComponentFrameRoot(), b = m[0], k = m[1];
      if (b && k) {
        var N = b.split(`
`), q = k.split(`
`);
        for (c = o = 0; o < N.length && !N[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; c < q.length && !q[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (o === N.length || c === q.length)
          for (o = N.length - 1, c = q.length - 1; 1 <= o && 0 <= c && N[o] !== q[c]; )
            c--;
        for (; 1 <= o && 0 <= c; o--, c--)
          if (N[o] !== q[c]) {
            if (o !== 1 || c !== 1)
              do
                if (o--, c--, 0 > c || N[o] !== q[c]) {
                  var X = `
` + N[o].replace(" at new ", " at ");
                  return e.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", e.displayName)), X;
                }
              while (1 <= o && 0 <= c);
            break;
          }
      }
    } finally {
      nl = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? jn(i) : "";
  }
  function Ea(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return jn(e.type);
      case 16:
        return jn("Lazy");
      case 13:
        return e.child !== t && t !== null ? jn("Suspense Fallback") : jn("Suspense");
      case 19:
        return jn("SuspenseList");
      case 0:
      case 15:
        return rl(e.type, !1);
      case 11:
        return rl(e.type.render, !1);
      case 1:
        return rl(e.type, !0);
      case 31:
        return jn("Activity");
      default:
        return "";
    }
  }
  function ja(e) {
    try {
      var t = "", i = null;
      do
        t += Ea(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var ll = Object.prototype.hasOwnProperty, il = n.unstable_scheduleCallback, si = n.unstable_cancelCallback, Ts = n.unstable_shouldYield, As = n.unstable_requestPaint, wt = n.unstable_now, zs = n.unstable_getCurrentPriorityLevel, Z = n.unstable_ImmediatePriority, oe = n.unstable_UserBlockingPriority, ve = n.unstable_NormalPriority, je = n.unstable_LowPriority, qe = n.unstable_IdlePriority, It = n.log, Nn = n.unstable_setDisableYieldValue, Et = null, ct = null;
  function At(e) {
    if (typeof It == "function" && Nn(e), ct && typeof ct.setStrictMode == "function")
      try {
        ct.setStrictMode(Et, e);
      } catch {
      }
  }
  var Ye = Math.clz32 ? Math.clz32 : B2, Kn = Math.log, fn = Math.LN2;
  function B2(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Kn(e) / fn | 0) | 0;
  }
  var Na = 256, Ta = 262144, Aa = 4194304;
  function Tr(e) {
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
  function za(e, t, i) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var c = 0, m = e.suspendedLanes, b = e.pingedLanes;
    e = e.warmLanes;
    var k = o & 134217727;
    return k !== 0 ? (o = k & ~m, o !== 0 ? c = Tr(o) : (b &= k, b !== 0 ? c = Tr(b) : i || (i = k & ~e, i !== 0 && (c = Tr(i))))) : (k = o & ~m, k !== 0 ? c = Tr(k) : b !== 0 ? c = Tr(b) : i || (i = o & ~e, i !== 0 && (c = Tr(i)))), c === 0 ? 0 : t !== 0 && t !== c && (t & m) === 0 && (m = c & -c, i = t & -t, m >= i || m === 32 && (i & 4194048) !== 0) ? t : c;
  }
  function ui(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function H2(e, t) {
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
  function kd() {
    var e = Aa;
    return Aa <<= 1, (Aa & 62914560) === 0 && (Aa = 4194304), e;
  }
  function _s(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function ci(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function q2(e, t, i, o, c, m) {
    var b = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var k = e.entanglements, N = e.expirationTimes, q = e.hiddenUpdates;
    for (i = b & ~i; 0 < i; ) {
      var X = 31 - Ye(i), W = 1 << X;
      k[X] = 0, N[X] = -1;
      var F = q[X];
      if (F !== null)
        for (q[X] = null, X = 0; X < F.length; X++) {
          var $ = F[X];
          $ !== null && ($.lane &= -536870913);
        }
      i &= ~W;
    }
    o !== 0 && Cd(e, o, 0), m !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= m & ~(b & ~t));
  }
  function Cd(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var o = 31 - Ye(t);
    e.entangledLanes |= t, e.entanglements[o] = e.entanglements[o] | 1073741824 | i & 261930;
  }
  function wd(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var o = 31 - Ye(i), c = 1 << o;
      c & t | e[o] & t && (e[o] |= t), i &= ~c;
    }
  }
  function Ed(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : Ms(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function Ms(e) {
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
  function Os(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function jd() {
    var e = Y.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : f0(e.type));
  }
  function Nd(e, t) {
    var i = Y.p;
    try {
      return Y.p = e, t();
    } finally {
      Y.p = i;
    }
  }
  var Wn = Math.random().toString(36).slice(2), ht = "__reactFiber$" + Wn, zt = "__reactProps$" + Wn, al = "__reactContainer$" + Wn, Ds = "__reactEvents$" + Wn, I2 = "__reactListeners$" + Wn, F2 = "__reactHandles$" + Wn, Td = "__reactResources$" + Wn, fi = "__reactMarker$" + Wn;
  function Rs(e) {
    delete e[ht], delete e[zt], delete e[Ds], delete e[I2], delete e[F2];
  }
  function ol(e) {
    var t = e[ht];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[al] || i[ht]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = P1(e); e !== null; ) {
            if (i = e[ht]) return i;
            e = P1(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[ht] || e[al]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function di(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(a(33));
  }
  function ul(e) {
    var t = e[Td];
    return t || (t = e[Td] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function dt(e) {
    e[fi] = !0;
  }
  var Ad = /* @__PURE__ */ new Set(), zd = {};
  function Ar(e, t) {
    cl(e, t), cl(e + "Capture", t);
  }
  function cl(e, t) {
    for (zd[e] = t, e = 0; e < t.length; e++)
      Ad.add(t[e]);
  }
  var V2 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _d = {}, Md = {};
  function $2(e) {
    return ll.call(Md, e) ? !0 : ll.call(_d, e) ? !1 : V2.test(e) ? Md[e] = !0 : (_d[e] = !0, !1);
  }
  function _a(e, t, i) {
    if ($2(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var o = t.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + i);
      }
  }
  function Ma(e, t, i) {
    if (i === null) e.removeAttribute(t);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + i);
    }
  }
  function Tn(e, t, i, o) {
    if (o === null) e.removeAttribute(i);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(t, i, "" + o);
    }
  }
  function Jt(e) {
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
  function Od(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function G2(e, t, i) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var c = o.get, m = o.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(b) {
          i = "" + b, m.call(this, b);
        }
      }), Object.defineProperty(e, t, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(b) {
          i = "" + b;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ls(e) {
    if (!e._valueTracker) {
      var t = Od(e) ? "checked" : "value";
      e._valueTracker = G2(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Dd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), o = "";
    return e && (o = Od(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== i ? (t.setValue(e), !0) : !1;
  }
  function Oa(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Y2 = /[\n"\\]/g;
  function en(e) {
    return e.replace(
      Y2,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Us(e, t, i, o, c, m, b, k) {
    e.name = "", b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.type = b : e.removeAttribute("type"), t != null ? b === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Jt(t)) : e.value !== "" + Jt(t) && (e.value = "" + Jt(t)) : b !== "submit" && b !== "reset" || e.removeAttribute("value"), t != null ? Bs(e, b, Jt(t)) : i != null ? Bs(e, b, Jt(i)) : o != null && e.removeAttribute("value"), c == null && m != null && (e.defaultChecked = !!m), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), k != null && typeof k != "function" && typeof k != "symbol" && typeof k != "boolean" ? e.name = "" + Jt(k) : e.removeAttribute("name");
  }
  function Rd(e, t, i, o, c, m, b, k) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.type = m), t != null || i != null) {
      if (!(m !== "submit" && m !== "reset" || t != null)) {
        Ls(e);
        return;
      }
      i = i != null ? "" + Jt(i) : "", t = t != null ? "" + Jt(t) : i, k || t === e.value || (e.value = t), e.defaultValue = t;
    }
    o = o ?? c, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = k ? e.checked : !!o, e.defaultChecked = !!o, b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" && (e.name = b), Ls(e);
  }
  function Bs(e, t, i) {
    t === "number" && Oa(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function fl(e, t, i, o) {
    if (e = e.options, t) {
      t = {};
      for (var c = 0; c < i.length; c++)
        t["$" + i[c]] = !0;
      for (i = 0; i < e.length; i++)
        c = t.hasOwnProperty("$" + e[i].value), e[i].selected !== c && (e[i].selected = c), c && o && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + Jt(i), t = null, c = 0; c < e.length; c++) {
        if (e[c].value === i) {
          e[c].selected = !0, o && (e[c].defaultSelected = !0);
          return;
        }
        t !== null || e[c].disabled || (t = e[c]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ld(e, t, i) {
    if (t != null && (t = "" + Jt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + Jt(i) : "";
  }
  function Ud(e, t, i, o) {
    if (t == null) {
      if (o != null) {
        if (i != null) throw Error(a(92));
        if (ee(o)) {
          if (1 < o.length) throw Error(a(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), t = i;
    }
    i = Jt(t), e.defaultValue = i, o = e.textContent, o === i && o !== "" && o !== null && (e.value = o), Ls(e);
  }
  function dl(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var X2 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bd(e, t, i) {
    var o = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : o ? e.setProperty(t, i) : typeof i != "number" || i === 0 || X2.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Hd(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(a(62));
    if (e = e.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || t != null && t.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var c in t)
        o = t[c], t.hasOwnProperty(c) && i[c] !== o && Bd(e, c, o);
    } else
      for (var m in t)
        t.hasOwnProperty(m) && Bd(e, m, t[m]);
  }
  function Hs(e) {
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
  var Q2 = /* @__PURE__ */ new Map([
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
  ]), P2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Da(e) {
    return P2.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function An() {
  }
  var qs = null;
  function Is(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ml = null, hl = null;
  function qd(e) {
    var t = sl(e);
    if (t && (e = t.stateNode)) {
      var i = e[zt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Us(
            e,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), t = i.name, i.type === "radio" && t != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + en(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var o = i[t];
              if (o !== e && o.form === e.form) {
                var c = o[zt] || null;
                if (!c) throw Error(a(90));
                Us(
                  o,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name
                );
              }
            }
            for (t = 0; t < i.length; t++)
              o = i[t], o.form === e.form && Dd(o);
          }
          break e;
        case "textarea":
          Ld(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && fl(e, !!i.multiple, t, !1);
      }
    }
  }
  var Fs = !1;
  function Id(e, t, i) {
    if (Fs) return e(t, i);
    Fs = !0;
    try {
      var o = e(t);
      return o;
    } finally {
      if (Fs = !1, (ml !== null || hl !== null) && (ko(), ml && (t = ml, e = hl, hl = ml = null, qd(t), e)))
        for (t = 0; t < e.length; t++) qd(e[t]);
    }
  }
  function mi(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var o = i[zt] || null;
    if (o === null) return null;
    i = o[t];
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
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function")
      throw Error(
        a(231, t, typeof i)
      );
    return i;
  }
  var zn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Vs = !1;
  if (zn)
    try {
      var hi = {};
      Object.defineProperty(hi, "passive", {
        get: function() {
          Vs = !0;
        }
      }), window.addEventListener("test", hi, hi), window.removeEventListener("test", hi, hi);
    } catch {
      Vs = !1;
    }
  var Jn = null, $s = null, Ra = null;
  function Fd() {
    if (Ra) return Ra;
    var e, t = $s, i = t.length, o, c = "value" in Jn ? Jn.value : Jn.textContent, m = c.length;
    for (e = 0; e < i && t[e] === c[e]; e++) ;
    var b = i - e;
    for (o = 1; o <= b && t[i - o] === c[m - o]; o++) ;
    return Ra = c.slice(e, 1 < o ? 1 - o : void 0);
  }
  function La(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ua() {
    return !0;
  }
  function Vd() {
    return !1;
  }
  function _t(e) {
    function t(i, o, c, m, b) {
      this._reactName = i, this._targetInst = c, this.type = o, this.nativeEvent = m, this.target = b, this.currentTarget = null;
      for (var k in e)
        e.hasOwnProperty(k) && (i = e[k], this[k] = i ? i(m) : m[k]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Ua : Vd, this.isPropagationStopped = Vd, this;
    }
    return x(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ua);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ua);
      },
      persist: function() {
      },
      isPersistent: Ua
    }), t;
  }
  var zr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ba = _t(zr), pi = x({}, zr, { view: 0, detail: 0 }), Z2 = _t(pi), Gs, Ys, gi, Ha = x({}, pi, {
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
    getModifierState: Qs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== gi && (gi && e.type === "mousemove" ? (Gs = e.screenX - gi.screenX, Ys = e.screenY - gi.screenY) : Ys = Gs = 0, gi = e), Gs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ys;
    }
  }), $d = _t(Ha), K2 = x({}, Ha, { dataTransfer: 0 }), W2 = _t(K2), J2 = x({}, pi, { relatedTarget: 0 }), Xs = _t(J2), ex = x({}, zr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), tx = _t(ex), nx = x({}, zr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rx = _t(nx), lx = x({}, zr, { data: 0 }), Gd = _t(lx), ix = {
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
  }, ax = {
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
  }, ox = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function sx(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = ox[e]) ? !!t[e] : !1;
  }
  function Qs() {
    return sx;
  }
  var ux = x({}, pi, {
    key: function(e) {
      if (e.key) {
        var t = ix[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = La(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ax[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Qs,
    charCode: function(e) {
      return e.type === "keypress" ? La(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? La(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), cx = _t(ux), fx = x({}, Ha, {
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
  }), Yd = _t(fx), dx = x({}, pi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qs
  }), mx = _t(dx), hx = x({}, zr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), px = _t(hx), gx = x({}, Ha, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xx = _t(gx), yx = x({}, zr, {
    newState: 0,
    oldState: 0
  }), bx = _t(yx), vx = [9, 13, 27, 32], Ps = zn && "CompositionEvent" in window, xi = null;
  zn && "documentMode" in document && (xi = document.documentMode);
  var Sx = zn && "TextEvent" in window && !xi, Xd = zn && (!Ps || xi && 8 < xi && 11 >= xi), Qd = " ", Pd = !1;
  function Zd(e, t) {
    switch (e) {
      case "keyup":
        return vx.indexOf(t.keyCode) !== -1;
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
  function Kd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pl = !1;
  function kx(e, t) {
    switch (e) {
      case "compositionend":
        return Kd(t);
      case "keypress":
        return t.which !== 32 ? null : (Pd = !0, Qd);
      case "textInput":
        return e = t.data, e === Qd && Pd ? null : e;
      default:
        return null;
    }
  }
  function Cx(e, t) {
    if (pl)
      return e === "compositionend" || !Ps && Zd(e, t) ? (e = Fd(), Ra = $s = Jn = null, pl = !1, e) : null;
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
        return Xd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var wx = {
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
  function Wd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!wx[e.type] : t === "textarea";
  }
  function Jd(e, t, i, o) {
    ml ? hl ? hl.push(o) : hl = [o] : ml = o, t = Ao(t, "onChange"), 0 < t.length && (i = new Ba(
      "onChange",
      "change",
      null,
      i,
      o
    ), e.push({ event: i, listeners: t }));
  }
  var yi = null, bi = null;
  function Ex(e) {
    R1(e, 0);
  }
  function qa(e) {
    var t = di(e);
    if (Dd(t)) return e;
  }
  function em(e, t) {
    if (e === "change") return t;
  }
  var tm = !1;
  if (zn) {
    var Zs;
    if (zn) {
      var Ks = "oninput" in document;
      if (!Ks) {
        var nm = document.createElement("div");
        nm.setAttribute("oninput", "return;"), Ks = typeof nm.oninput == "function";
      }
      Zs = Ks;
    } else Zs = !1;
    tm = Zs && (!document.documentMode || 9 < document.documentMode);
  }
  function rm() {
    yi && (yi.detachEvent("onpropertychange", lm), bi = yi = null);
  }
  function lm(e) {
    if (e.propertyName === "value" && qa(bi)) {
      var t = [];
      Jd(
        t,
        bi,
        e,
        Is(e)
      ), Id(Ex, t);
    }
  }
  function jx(e, t, i) {
    e === "focusin" ? (rm(), yi = t, bi = i, yi.attachEvent("onpropertychange", lm)) : e === "focusout" && rm();
  }
  function Nx(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return qa(bi);
  }
  function Tx(e, t) {
    if (e === "click") return qa(t);
  }
  function Ax(e, t) {
    if (e === "input" || e === "change")
      return qa(t);
  }
  function zx(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ft = typeof Object.is == "function" ? Object.is : zx;
  function vi(e, t) {
    if (Ft(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), o = Object.keys(t);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var c = i[o];
      if (!ll.call(t, c) || !Ft(e[c], t[c]))
        return !1;
    }
    return !0;
  }
  function im(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function am(e, t) {
    var i = im(e);
    e = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = e + i.textContent.length, e <= t && o >= t)
          return { node: i, offset: t - e };
        e = o;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = im(i);
    }
  }
  function om(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? om(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function sm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Oa(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = Oa(e.document);
    }
    return t;
  }
  function Ws(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var _x = zn && "documentMode" in document && 11 >= document.documentMode, gl = null, Js = null, Si = null, eu = !1;
  function um(e, t, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    eu || gl == null || gl !== Oa(o) || (o = gl, "selectionStart" in o && Ws(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Si && vi(Si, o) || (Si = o, o = Ao(Js, "onSelect"), 0 < o.length && (t = new Ba(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: o }), t.target = gl)));
  }
  function _r(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var xl = {
    animationend: _r("Animation", "AnimationEnd"),
    animationiteration: _r("Animation", "AnimationIteration"),
    animationstart: _r("Animation", "AnimationStart"),
    transitionrun: _r("Transition", "TransitionRun"),
    transitionstart: _r("Transition", "TransitionStart"),
    transitioncancel: _r("Transition", "TransitionCancel"),
    transitionend: _r("Transition", "TransitionEnd")
  }, tu = {}, cm = {};
  zn && (cm = document.createElement("div").style, "AnimationEvent" in window || (delete xl.animationend.animation, delete xl.animationiteration.animation, delete xl.animationstart.animation), "TransitionEvent" in window || delete xl.transitionend.transition);
  function Mr(e) {
    if (tu[e]) return tu[e];
    if (!xl[e]) return e;
    var t = xl[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in cm)
        return tu[e] = t[i];
    return e;
  }
  var fm = Mr("animationend"), dm = Mr("animationiteration"), mm = Mr("animationstart"), Mx = Mr("transitionrun"), Ox = Mr("transitionstart"), Dx = Mr("transitioncancel"), hm = Mr("transitionend"), pm = /* @__PURE__ */ new Map(), nu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  nu.push("scrollEnd");
  function dn(e, t) {
    pm.set(e, t), Ar(t, [e]);
  }
  var Ia = typeof reportError == "function" ? reportError : function(e) {
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
  }, tn = [], yl = 0, ru = 0;
  function Fa() {
    for (var e = yl, t = ru = yl = 0; t < e; ) {
      var i = tn[t];
      tn[t++] = null;
      var o = tn[t];
      tn[t++] = null;
      var c = tn[t];
      tn[t++] = null;
      var m = tn[t];
      if (tn[t++] = null, o !== null && c !== null) {
        var b = o.pending;
        b === null ? c.next = c : (c.next = b.next, b.next = c), o.pending = c;
      }
      m !== 0 && gm(i, c, m);
    }
  }
  function Va(e, t, i, o) {
    tn[yl++] = e, tn[yl++] = t, tn[yl++] = i, tn[yl++] = o, ru |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function lu(e, t, i, o) {
    return Va(e, t, i, o), $a(e);
  }
  function Or(e, t) {
    return Va(e, null, null, t), $a(e);
  }
  function gm(e, t, i) {
    e.lanes |= i;
    var o = e.alternate;
    o !== null && (o.lanes |= i);
    for (var c = !1, m = e.return; m !== null; )
      m.childLanes |= i, o = m.alternate, o !== null && (o.childLanes |= i), m.tag === 22 && (e = m.stateNode, e === null || e._visibility & 1 || (c = !0)), e = m, m = m.return;
    return e.tag === 3 ? (m = e.stateNode, c && t !== null && (c = 31 - Ye(i), e = m.hiddenUpdates, o = e[c], o === null ? e[c] = [t] : o.push(t), t.lane = i | 536870912), m) : null;
  }
  function $a(e) {
    if (50 < Vi)
      throw Vi = 0, mc = null, Error(a(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var bl = {};
  function Rx(e, t, i, o) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Vt(e, t, i, o) {
    return new Rx(e, t, i, o);
  }
  function iu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function _n(e, t) {
    var i = e.alternate;
    return i === null ? (i = Vt(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function xm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ga(e, t, i, o, c, m) {
    var b = 0;
    if (o = e, typeof e == "function") iu(e) && (b = 1);
    else if (typeof e == "string")
      b = q4(
        e,
        i,
        G.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case fe:
          return e = Vt(31, i, t, c), e.elementType = fe, e.lanes = m, e;
        case j:
          return Dr(i.children, c, m, t);
        case M:
          b = 8, c |= 24;
          break;
        case T:
          return e = Vt(12, i, t, c | 2), e.elementType = T, e.lanes = m, e;
        case le:
          return e = Vt(13, i, t, c), e.elementType = le, e.lanes = m, e;
        case _:
          return e = Vt(19, i, t, c), e.elementType = _, e.lanes = m, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
                b = 10;
                break e;
              case I:
                b = 9;
                break e;
              case re:
                b = 11;
                break e;
              case U:
                b = 14;
                break e;
              case ae:
                b = 16, o = null;
                break e;
            }
          b = 29, i = Error(
            a(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return t = Vt(b, i, t, c), t.elementType = e, t.type = o, t.lanes = m, t;
  }
  function Dr(e, t, i, o) {
    return e = Vt(7, e, o, t), e.lanes = i, e;
  }
  function au(e, t, i) {
    return e = Vt(6, e, null, t), e.lanes = i, e;
  }
  function ym(e) {
    var t = Vt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ou(e, t, i) {
    return t = Vt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = i, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var bm = /* @__PURE__ */ new WeakMap();
  function nn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = bm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: ja(t)
      }, bm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ja(t)
    };
  }
  var vl = [], Sl = 0, Ya = null, ki = 0, rn = [], ln = 0, er = null, gn = 1, xn = "";
  function Mn(e, t) {
    vl[Sl++] = ki, vl[Sl++] = Ya, Ya = e, ki = t;
  }
  function vm(e, t, i) {
    rn[ln++] = gn, rn[ln++] = xn, rn[ln++] = er, er = e;
    var o = gn;
    e = xn;
    var c = 32 - Ye(o) - 1;
    o &= ~(1 << c), i += 1;
    var m = 32 - Ye(t) + c;
    if (30 < m) {
      var b = c - c % 5;
      m = (o & (1 << b) - 1).toString(32), o >>= b, c -= b, gn = 1 << 32 - Ye(t) + c | i << c | o, xn = m + e;
    } else
      gn = 1 << m | i << c | o, xn = e;
  }
  function su(e) {
    e.return !== null && (Mn(e, 1), vm(e, 1, 0));
  }
  function uu(e) {
    for (; e === Ya; )
      Ya = vl[--Sl], vl[Sl] = null, ki = vl[--Sl], vl[Sl] = null;
    for (; e === er; )
      er = rn[--ln], rn[ln] = null, xn = rn[--ln], rn[ln] = null, gn = rn[--ln], rn[ln] = null;
  }
  function Sm(e, t) {
    rn[ln++] = gn, rn[ln++] = xn, rn[ln++] = er, gn = t.id, xn = t.overflow, er = e;
  }
  var pt = null, Ke = null, Oe = !1, tr = null, an = !1, cu = Error(a(519));
  function nr(e) {
    var t = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ci(nn(t, e)), cu;
  }
  function km(e) {
    var t = e.stateNode, i = e.type, o = e.memoizedProps;
    switch (t[ht] = e, t[zt] = o, i) {
      case "dialog":
        Te("cancel", t), Te("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Te("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Gi.length; i++)
          Te(Gi[i], t);
        break;
      case "source":
        Te("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Te("error", t), Te("load", t);
        break;
      case "details":
        Te("toggle", t);
        break;
      case "input":
        Te("invalid", t), Rd(
          t,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        Te("invalid", t);
        break;
      case "textarea":
        Te("invalid", t), Ud(t, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || o.suppressHydrationWarning === !0 || H1(t.textContent, i) ? (o.popover != null && (Te("beforetoggle", t), Te("toggle", t)), o.onScroll != null && Te("scroll", t), o.onScrollEnd != null && Te("scrollend", t), o.onClick != null && (t.onclick = An), t = !0) : t = !1, t || nr(e, !0);
  }
  function Cm(e) {
    for (pt = e.return; pt; )
      switch (pt.tag) {
        case 5:
        case 31:
        case 13:
          an = !1;
          return;
        case 27:
        case 3:
          an = !0;
          return;
        default:
          pt = pt.return;
      }
  }
  function kl(e) {
    if (e !== pt) return !1;
    if (!Oe) return Cm(e), Oe = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Tc(e.type, e.memoizedProps)), i = !i), i && Ke && nr(e), Cm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Ke = Q1(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      Ke = Q1(e);
    } else
      t === 27 ? (t = Ke, gr(e.type) ? (e = Oc, Oc = null, Ke = e) : Ke = t) : Ke = pt ? sn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Rr() {
    Ke = pt = null, Oe = !1;
  }
  function fu() {
    var e = tr;
    return e !== null && (Rt === null ? Rt = e : Rt.push.apply(
      Rt,
      e
    ), tr = null), e;
  }
  function Ci(e) {
    tr === null ? tr = [e] : tr.push(e);
  }
  var du = A(null), Lr = null, On = null;
  function rr(e, t, i) {
    w(du, t._currentValue), t._currentValue = i;
  }
  function Dn(e) {
    e._currentValue = du.current, Q(du);
  }
  function mu(e, t, i) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function hu(e, t, i, o) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var m = c.dependencies;
      if (m !== null) {
        var b = c.child;
        m = m.firstContext;
        e: for (; m !== null; ) {
          var k = m;
          m = c;
          for (var N = 0; N < t.length; N++)
            if (k.context === t[N]) {
              m.lanes |= i, k = m.alternate, k !== null && (k.lanes |= i), mu(
                m.return,
                i,
                e
              ), o || (b = null);
              break e;
            }
          m = k.next;
        }
      } else if (c.tag === 18) {
        if (b = c.return, b === null) throw Error(a(341));
        b.lanes |= i, m = b.alternate, m !== null && (m.lanes |= i), mu(b, i, e), b = null;
      } else b = c.child;
      if (b !== null) b.return = c;
      else
        for (b = c; b !== null; ) {
          if (b === e) {
            b = null;
            break;
          }
          if (c = b.sibling, c !== null) {
            c.return = b.return, b = c;
            break;
          }
          b = b.return;
        }
      c = b;
    }
  }
  function Cl(e, t, i, o) {
    e = null;
    for (var c = t, m = !1; c !== null; ) {
      if (!m) {
        if ((c.flags & 524288) !== 0) m = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var b = c.alternate;
        if (b === null) throw Error(a(387));
        if (b = b.memoizedProps, b !== null) {
          var k = c.type;
          Ft(c.pendingProps.value, b.value) || (e !== null ? e.push(k) : e = [k]);
        }
      } else if (c === xe.current) {
        if (b = c.alternate, b === null) throw Error(a(387));
        b.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(Zi) : e = [Zi]);
      }
      c = c.return;
    }
    e !== null && hu(
      t,
      e,
      i,
      o
    ), t.flags |= 262144;
  }
  function Xa(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ft(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ur(e) {
    Lr = e, On = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function gt(e) {
    return wm(Lr, e);
  }
  function Qa(e, t) {
    return Lr === null && Ur(e), wm(e, t);
  }
  function wm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, On === null) {
      if (e === null) throw Error(a(308));
      On = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else On = On.next = t;
    return i;
  }
  var Lx = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(i, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, Ux = n.unstable_scheduleCallback, Bx = n.unstable_NormalPriority, it = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function pu() {
    return {
      controller: new Lx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function wi(e) {
    e.refCount--, e.refCount === 0 && Ux(Bx, function() {
      e.controller.abort();
    });
  }
  var Ei = null, gu = 0, wl = 0, El = null;
  function Hx(e, t) {
    if (Ei === null) {
      var i = Ei = [];
      gu = 0, wl = bc(), El = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return gu++, t.then(Em, Em), t;
  }
  function Em() {
    if (--gu === 0 && Ei !== null) {
      El !== null && (El.status = "fulfilled");
      var e = Ei;
      Ei = null, wl = 0, El = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function qx(e, t) {
    var i = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        i.push(c);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = t;
        for (var c = 0; c < i.length; c++) (0, i[c])(t);
      },
      function(c) {
        for (o.status = "rejected", o.reason = c, c = 0; c < i.length; c++)
          (0, i[c])(void 0);
      }
    ), o;
  }
  var jm = B.S;
  B.S = function(e, t) {
    u1 = wt(), typeof t == "object" && t !== null && typeof t.then == "function" && Hx(e, t), jm !== null && jm(e, t);
  };
  var Br = A(null);
  function xu() {
    var e = Br.current;
    return e !== null ? e : Xe.pooledCache;
  }
  function Pa(e, t) {
    t === null ? w(Br, Br.current) : w(Br, t.pool);
  }
  function Nm() {
    var e = xu();
    return e === null ? null : { parent: it._currentValue, pool: e };
  }
  var jl = Error(a(460)), yu = Error(a(474)), Za = Error(a(542)), Ka = { then: function() {
  } };
  function Tm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Am(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(An, An), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, _m(e), e;
      default:
        if (typeof t.status == "string") t.then(An, An);
        else {
          if (e = Xe, e !== null && 100 < e.shellSuspendCounter)
            throw Error(a(482));
          e = t, e.status = "pending", e.then(
            function(o) {
              if (t.status === "pending") {
                var c = t;
                c.status = "fulfilled", c.value = o;
              }
            },
            function(o) {
              if (t.status === "pending") {
                var c = t;
                c.status = "rejected", c.reason = o;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, _m(e), e;
        }
        throw qr = t, jl;
    }
  }
  function Hr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (qr = i, jl) : i;
    }
  }
  var qr = null;
  function zm() {
    if (qr === null) throw Error(a(459));
    var e = qr;
    return qr = null, e;
  }
  function _m(e) {
    if (e === jl || e === Za)
      throw Error(a(483));
  }
  var Nl = null, ji = 0;
  function Wa(e) {
    var t = ji;
    return ji += 1, Nl === null && (Nl = []), Am(Nl, e, t);
  }
  function Ni(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ja(e, t) {
    throw t.$$typeof === S ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Mm(e) {
    function t(D, z) {
      if (e) {
        var H = D.deletions;
        H === null ? (D.deletions = [z], D.flags |= 16) : H.push(z);
      }
    }
    function i(D, z) {
      if (!e) return null;
      for (; z !== null; )
        t(D, z), z = z.sibling;
      return null;
    }
    function o(D) {
      for (var z = /* @__PURE__ */ new Map(); D !== null; )
        D.key !== null ? z.set(D.key, D) : z.set(D.index, D), D = D.sibling;
      return z;
    }
    function c(D, z) {
      return D = _n(D, z), D.index = 0, D.sibling = null, D;
    }
    function m(D, z, H) {
      return D.index = H, e ? (H = D.alternate, H !== null ? (H = H.index, H < z ? (D.flags |= 67108866, z) : H) : (D.flags |= 67108866, z)) : (D.flags |= 1048576, z);
    }
    function b(D) {
      return e && D.alternate === null && (D.flags |= 67108866), D;
    }
    function k(D, z, H, K) {
      return z === null || z.tag !== 6 ? (z = au(H, D.mode, K), z.return = D, z) : (z = c(z, H), z.return = D, z);
    }
    function N(D, z, H, K) {
      var pe = H.type;
      return pe === j ? X(
        D,
        z,
        H.props.children,
        K,
        H.key
      ) : z !== null && (z.elementType === pe || typeof pe == "object" && pe !== null && pe.$$typeof === ae && Hr(pe) === z.type) ? (z = c(z, H.props), Ni(z, H), z.return = D, z) : (z = Ga(
        H.type,
        H.key,
        H.props,
        null,
        D.mode,
        K
      ), Ni(z, H), z.return = D, z);
    }
    function q(D, z, H, K) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== H.containerInfo || z.stateNode.implementation !== H.implementation ? (z = ou(H, D.mode, K), z.return = D, z) : (z = c(z, H.children || []), z.return = D, z);
    }
    function X(D, z, H, K, pe) {
      return z === null || z.tag !== 7 ? (z = Dr(
        H,
        D.mode,
        K,
        pe
      ), z.return = D, z) : (z = c(z, H), z.return = D, z);
    }
    function W(D, z, H) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = au(
          "" + z,
          D.mode,
          H
        ), z.return = D, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case v:
            return H = Ga(
              z.type,
              z.key,
              z.props,
              null,
              D.mode,
              H
            ), Ni(H, z), H.return = D, H;
          case C:
            return z = ou(
              z,
              D.mode,
              H
            ), z.return = D, z;
          case ae:
            return z = Hr(z), W(D, z, H);
        }
        if (ee(z) || J(z))
          return z = Dr(
            z,
            D.mode,
            H,
            null
          ), z.return = D, z;
        if (typeof z.then == "function")
          return W(D, Wa(z), H);
        if (z.$$typeof === L)
          return W(
            D,
            Qa(D, z),
            H
          );
        Ja(D, z);
      }
      return null;
    }
    function F(D, z, H, K) {
      var pe = z !== null ? z.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return pe !== null ? null : k(D, z, "" + H, K);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case v:
            return H.key === pe ? N(D, z, H, K) : null;
          case C:
            return H.key === pe ? q(D, z, H, K) : null;
          case ae:
            return H = Hr(H), F(D, z, H, K);
        }
        if (ee(H) || J(H))
          return pe !== null ? null : X(D, z, H, K, null);
        if (typeof H.then == "function")
          return F(
            D,
            z,
            Wa(H),
            K
          );
        if (H.$$typeof === L)
          return F(
            D,
            z,
            Qa(D, H),
            K
          );
        Ja(D, H);
      }
      return null;
    }
    function $(D, z, H, K, pe) {
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return D = D.get(H) || null, k(z, D, "" + K, pe);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case v:
            return D = D.get(
              K.key === null ? H : K.key
            ) || null, N(z, D, K, pe);
          case C:
            return D = D.get(
              K.key === null ? H : K.key
            ) || null, q(z, D, K, pe);
          case ae:
            return K = Hr(K), $(
              D,
              z,
              H,
              K,
              pe
            );
        }
        if (ee(K) || J(K))
          return D = D.get(H) || null, X(z, D, K, pe, null);
        if (typeof K.then == "function")
          return $(
            D,
            z,
            H,
            Wa(K),
            pe
          );
        if (K.$$typeof === L)
          return $(
            D,
            z,
            H,
            Qa(z, K),
            pe
          );
        Ja(z, K);
      }
      return null;
    }
    function ce(D, z, H, K) {
      for (var pe = null, Ue = null, de = z, Ce = z = 0, Me = null; de !== null && Ce < H.length; Ce++) {
        de.index > Ce ? (Me = de, de = null) : Me = de.sibling;
        var Be = F(
          D,
          de,
          H[Ce],
          K
        );
        if (Be === null) {
          de === null && (de = Me);
          break;
        }
        e && de && Be.alternate === null && t(D, de), z = m(Be, z, Ce), Ue === null ? pe = Be : Ue.sibling = Be, Ue = Be, de = Me;
      }
      if (Ce === H.length)
        return i(D, de), Oe && Mn(D, Ce), pe;
      if (de === null) {
        for (; Ce < H.length; Ce++)
          de = W(D, H[Ce], K), de !== null && (z = m(
            de,
            z,
            Ce
          ), Ue === null ? pe = de : Ue.sibling = de, Ue = de);
        return Oe && Mn(D, Ce), pe;
      }
      for (de = o(de); Ce < H.length; Ce++)
        Me = $(
          de,
          D,
          Ce,
          H[Ce],
          K
        ), Me !== null && (e && Me.alternate !== null && de.delete(
          Me.key === null ? Ce : Me.key
        ), z = m(
          Me,
          z,
          Ce
        ), Ue === null ? pe = Me : Ue.sibling = Me, Ue = Me);
      return e && de.forEach(function(Sr) {
        return t(D, Sr);
      }), Oe && Mn(D, Ce), pe;
    }
    function be(D, z, H, K) {
      if (H == null) throw Error(a(151));
      for (var pe = null, Ue = null, de = z, Ce = z = 0, Me = null, Be = H.next(); de !== null && !Be.done; Ce++, Be = H.next()) {
        de.index > Ce ? (Me = de, de = null) : Me = de.sibling;
        var Sr = F(D, de, Be.value, K);
        if (Sr === null) {
          de === null && (de = Me);
          break;
        }
        e && de && Sr.alternate === null && t(D, de), z = m(Sr, z, Ce), Ue === null ? pe = Sr : Ue.sibling = Sr, Ue = Sr, de = Me;
      }
      if (Be.done)
        return i(D, de), Oe && Mn(D, Ce), pe;
      if (de === null) {
        for (; !Be.done; Ce++, Be = H.next())
          Be = W(D, Be.value, K), Be !== null && (z = m(Be, z, Ce), Ue === null ? pe = Be : Ue.sibling = Be, Ue = Be);
        return Oe && Mn(D, Ce), pe;
      }
      for (de = o(de); !Be.done; Ce++, Be = H.next())
        Be = $(de, D, Ce, Be.value, K), Be !== null && (e && Be.alternate !== null && de.delete(Be.key === null ? Ce : Be.key), z = m(Be, z, Ce), Ue === null ? pe = Be : Ue.sibling = Be, Ue = Be);
      return e && de.forEach(function(K4) {
        return t(D, K4);
      }), Oe && Mn(D, Ce), pe;
    }
    function Ge(D, z, H, K) {
      if (typeof H == "object" && H !== null && H.type === j && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case v:
            e: {
              for (var pe = H.key; z !== null; ) {
                if (z.key === pe) {
                  if (pe = H.type, pe === j) {
                    if (z.tag === 7) {
                      i(
                        D,
                        z.sibling
                      ), K = c(
                        z,
                        H.props.children
                      ), K.return = D, D = K;
                      break e;
                    }
                  } else if (z.elementType === pe || typeof pe == "object" && pe !== null && pe.$$typeof === ae && Hr(pe) === z.type) {
                    i(
                      D,
                      z.sibling
                    ), K = c(z, H.props), Ni(K, H), K.return = D, D = K;
                    break e;
                  }
                  i(D, z);
                  break;
                } else t(D, z);
                z = z.sibling;
              }
              H.type === j ? (K = Dr(
                H.props.children,
                D.mode,
                K,
                H.key
              ), K.return = D, D = K) : (K = Ga(
                H.type,
                H.key,
                H.props,
                null,
                D.mode,
                K
              ), Ni(K, H), K.return = D, D = K);
            }
            return b(D);
          case C:
            e: {
              for (pe = H.key; z !== null; ) {
                if (z.key === pe)
                  if (z.tag === 4 && z.stateNode.containerInfo === H.containerInfo && z.stateNode.implementation === H.implementation) {
                    i(
                      D,
                      z.sibling
                    ), K = c(z, H.children || []), K.return = D, D = K;
                    break e;
                  } else {
                    i(D, z);
                    break;
                  }
                else t(D, z);
                z = z.sibling;
              }
              K = ou(H, D.mode, K), K.return = D, D = K;
            }
            return b(D);
          case ae:
            return H = Hr(H), Ge(
              D,
              z,
              H,
              K
            );
        }
        if (ee(H))
          return ce(
            D,
            z,
            H,
            K
          );
        if (J(H)) {
          if (pe = J(H), typeof pe != "function") throw Error(a(150));
          return H = pe.call(H), be(
            D,
            z,
            H,
            K
          );
        }
        if (typeof H.then == "function")
          return Ge(
            D,
            z,
            Wa(H),
            K
          );
        if (H.$$typeof === L)
          return Ge(
            D,
            z,
            Qa(D, H),
            K
          );
        Ja(D, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, z !== null && z.tag === 6 ? (i(D, z.sibling), K = c(z, H), K.return = D, D = K) : (i(D, z), K = au(H, D.mode, K), K.return = D, D = K), b(D)) : i(D, z);
    }
    return function(D, z, H, K) {
      try {
        ji = 0;
        var pe = Ge(
          D,
          z,
          H,
          K
        );
        return Nl = null, pe;
      } catch (de) {
        if (de === jl || de === Za) throw de;
        var Ue = Vt(29, de, null, D.mode);
        return Ue.lanes = K, Ue.return = D, Ue;
      } finally {
      }
    };
  }
  var Ir = Mm(!0), Om = Mm(!1), lr = !1;
  function bu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function vu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ir(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ar(e, t, i) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (He & 2) !== 0) {
      var c = o.pending;
      return c === null ? t.next = t : (t.next = c.next, c.next = t), o.pending = t, t = $a(e), gm(e, null, i), t;
    }
    return Va(e, o, t, i), $a(e);
  }
  function Ti(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var o = t.lanes;
      o &= e.pendingLanes, i |= o, t.lanes = i, wd(e, i);
    }
  }
  function Su(e, t) {
    var i = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var c = null, m = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var b = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          m === null ? c = m = b : m = m.next = b, i = i.next;
        } while (i !== null);
        m === null ? c = m = t : m = m.next = t;
      } else c = m = t;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: m,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var ku = !1;
  function Ai() {
    if (ku) {
      var e = El;
      if (e !== null) throw e;
    }
  }
  function zi(e, t, i, o) {
    ku = !1;
    var c = e.updateQueue;
    lr = !1;
    var m = c.firstBaseUpdate, b = c.lastBaseUpdate, k = c.shared.pending;
    if (k !== null) {
      c.shared.pending = null;
      var N = k, q = N.next;
      N.next = null, b === null ? m = q : b.next = q, b = N;
      var X = e.alternate;
      X !== null && (X = X.updateQueue, k = X.lastBaseUpdate, k !== b && (k === null ? X.firstBaseUpdate = q : k.next = q, X.lastBaseUpdate = N));
    }
    if (m !== null) {
      var W = c.baseState;
      b = 0, X = q = N = null, k = m;
      do {
        var F = k.lane & -536870913, $ = F !== k.lane;
        if ($ ? (_e & F) === F : (o & F) === F) {
          F !== 0 && F === wl && (ku = !0), X !== null && (X = X.next = {
            lane: 0,
            tag: k.tag,
            payload: k.payload,
            callback: null,
            next: null
          });
          e: {
            var ce = e, be = k;
            F = t;
            var Ge = i;
            switch (be.tag) {
              case 1:
                if (ce = be.payload, typeof ce == "function") {
                  W = ce.call(Ge, W, F);
                  break e;
                }
                W = ce;
                break e;
              case 3:
                ce.flags = ce.flags & -65537 | 128;
              case 0:
                if (ce = be.payload, F = typeof ce == "function" ? ce.call(Ge, W, F) : ce, F == null) break e;
                W = x({}, W, F);
                break e;
              case 2:
                lr = !0;
            }
          }
          F = k.callback, F !== null && (e.flags |= 64, $ && (e.flags |= 8192), $ = c.callbacks, $ === null ? c.callbacks = [F] : $.push(F));
        } else
          $ = {
            lane: F,
            tag: k.tag,
            payload: k.payload,
            callback: k.callback,
            next: null
          }, X === null ? (q = X = $, N = W) : X = X.next = $, b |= F;
        if (k = k.next, k === null) {
          if (k = c.shared.pending, k === null)
            break;
          $ = k, k = $.next, $.next = null, c.lastBaseUpdate = $, c.shared.pending = null;
        }
      } while (!0);
      X === null && (N = W), c.baseState = N, c.firstBaseUpdate = q, c.lastBaseUpdate = X, m === null && (c.shared.lanes = 0), fr |= b, e.lanes = b, e.memoizedState = W;
    }
  }
  function Dm(e, t) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(t);
  }
  function Rm(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Dm(i[e], t);
  }
  var Tl = A(null), eo = A(0);
  function Lm(e, t) {
    e = Vn, w(eo, e), w(Tl, t), Vn = e | t.baseLanes;
  }
  function Cu() {
    w(eo, Vn), w(Tl, Tl.current);
  }
  function wu() {
    Vn = eo.current, Q(Tl), Q(eo);
  }
  var $t = A(null), on = null;
  function or(e) {
    var t = e.alternate;
    w(rt, rt.current & 1), w($t, e), on === null && (t === null || Tl.current !== null || t.memoizedState !== null) && (on = e);
  }
  function Eu(e) {
    w(rt, rt.current), w($t, e), on === null && (on = e);
  }
  function Um(e) {
    e.tag === 22 ? (w(rt, rt.current), w($t, e), on === null && (on = e)) : sr();
  }
  function sr() {
    w(rt, rt.current), w($t, $t.current);
  }
  function Gt(e) {
    Q($t), on === e && (on = null), Q(rt);
  }
  var rt = A(0);
  function to(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || _c(i) || Mc(i)))
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
  var Rn = 0, ke = null, Ve = null, at = null, no = !1, Al = !1, Fr = !1, ro = 0, _i = 0, zl = null, Ix = 0;
  function tt() {
    throw Error(a(321));
  }
  function ju(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Ft(e[i], t[i])) return !1;
    return !0;
  }
  function Nu(e, t, i, o, c, m) {
    return Rn = m, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, B.H = e === null || e.memoizedState === null ? vh : Fu, Fr = !1, m = i(o, c), Fr = !1, Al && (m = Hm(
      t,
      i,
      o,
      c
    )), Bm(e), m;
  }
  function Bm(e) {
    B.H = Di;
    var t = Ve !== null && Ve.next !== null;
    if (Rn = 0, at = Ve = ke = null, no = !1, _i = 0, zl = null, t) throw Error(a(300));
    e === null || ot || (e = e.dependencies, e !== null && Xa(e) && (ot = !0));
  }
  function Hm(e, t, i, o) {
    ke = e;
    var c = 0;
    do {
      if (Al && (zl = null), _i = 0, Al = !1, 25 <= c) throw Error(a(301));
      if (c += 1, at = Ve = null, e.updateQueue != null) {
        var m = e.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      B.H = Sh, m = t(i, o);
    } while (Al);
    return m;
  }
  function Fx() {
    var e = B.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Mi(t) : t, e = e.useState()[0], (Ve !== null ? Ve.memoizedState : null) !== e && (ke.flags |= 1024), t;
  }
  function Tu() {
    var e = ro !== 0;
    return ro = 0, e;
  }
  function Au(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function zu(e) {
    if (no) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      no = !1;
    }
    Rn = 0, at = Ve = ke = null, Al = !1, _i = ro = 0, zl = null;
  }
  function jt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return at === null ? ke.memoizedState = at = e : at = at.next = e, at;
  }
  function lt() {
    if (Ve === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ve.next;
    var t = at === null ? ke.memoizedState : at.next;
    if (t !== null)
      at = t, Ve = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(a(467)) : Error(a(310));
      Ve = e, e = {
        memoizedState: Ve.memoizedState,
        baseState: Ve.baseState,
        baseQueue: Ve.baseQueue,
        queue: Ve.queue,
        next: null
      }, at === null ? ke.memoizedState = at = e : at = at.next = e;
    }
    return at;
  }
  function lo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Mi(e) {
    var t = _i;
    return _i += 1, zl === null && (zl = []), e = Am(zl, e, t), t = ke, (at === null ? t.memoizedState : at.next) === null && (t = t.alternate, B.H = t === null || t.memoizedState === null ? vh : Fu), e;
  }
  function io(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Mi(e);
      if (e.$$typeof === L) return gt(e);
    }
    throw Error(a(438, String(e)));
  }
  function _u(e) {
    var t = null, i = ke.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var o = ke.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (t = {
        data: o.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = lo(), ke.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), o = 0; o < e; o++)
        i[o] = R;
    return t.index++, i;
  }
  function Ln(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ao(e) {
    var t = lt();
    return Mu(t, Ve, e);
  }
  function Mu(e, t, i) {
    var o = e.queue;
    if (o === null) throw Error(a(311));
    o.lastRenderedReducer = i;
    var c = e.baseQueue, m = o.pending;
    if (m !== null) {
      if (c !== null) {
        var b = c.next;
        c.next = m.next, m.next = b;
      }
      t.baseQueue = c = m, o.pending = null;
    }
    if (m = e.baseState, c === null) e.memoizedState = m;
    else {
      t = c.next;
      var k = b = null, N = null, q = t, X = !1;
      do {
        var W = q.lane & -536870913;
        if (W !== q.lane ? (_e & W) === W : (Rn & W) === W) {
          var F = q.revertLane;
          if (F === 0)
            N !== null && (N = N.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), W === wl && (X = !0);
          else if ((Rn & F) === F) {
            q = q.next, F === wl && (X = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: q.revertLane,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }, N === null ? (k = N = W, b = m) : N = N.next = W, ke.lanes |= F, fr |= F;
          W = q.action, Fr && i(m, W), m = q.hasEagerState ? q.eagerState : i(m, W);
        } else
          F = {
            lane: W,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, N === null ? (k = N = F, b = m) : N = N.next = F, ke.lanes |= W, fr |= W;
        q = q.next;
      } while (q !== null && q !== t);
      if (N === null ? b = m : N.next = k, !Ft(m, e.memoizedState) && (ot = !0, X && (i = El, i !== null)))
        throw i;
      e.memoizedState = m, e.baseState = b, e.baseQueue = N, o.lastRenderedState = m;
    }
    return c === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function Ou(e) {
    var t = lt(), i = t.queue;
    if (i === null) throw Error(a(311));
    i.lastRenderedReducer = e;
    var o = i.dispatch, c = i.pending, m = t.memoizedState;
    if (c !== null) {
      i.pending = null;
      var b = c = c.next;
      do
        m = e(m, b.action), b = b.next;
      while (b !== c);
      Ft(m, t.memoizedState) || (ot = !0), t.memoizedState = m, t.baseQueue === null && (t.baseState = m), i.lastRenderedState = m;
    }
    return [m, o];
  }
  function qm(e, t, i) {
    var o = ke, c = lt(), m = Oe;
    if (m) {
      if (i === void 0) throw Error(a(407));
      i = i();
    } else i = t();
    var b = !Ft(
      (Ve || c).memoizedState,
      i
    );
    if (b && (c.memoizedState = i, ot = !0), c = c.queue, Lu(Vm.bind(null, o, c, e), [
      e
    ]), c.getSnapshot !== t || b || at !== null && at.memoizedState.tag & 1) {
      if (o.flags |= 2048, _l(
        9,
        { destroy: void 0 },
        Fm.bind(
          null,
          o,
          c,
          i,
          t
        ),
        null
      ), Xe === null) throw Error(a(349));
      m || (Rn & 127) !== 0 || Im(o, t, i);
    }
    return i;
  }
  function Im(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = ke.updateQueue, t === null ? (t = lo(), ke.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Fm(e, t, i, o) {
    t.value = i, t.getSnapshot = o, $m(t) && Gm(e);
  }
  function Vm(e, t, i) {
    return i(function() {
      $m(t) && Gm(e);
    });
  }
  function $m(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Ft(e, i);
    } catch {
      return !0;
    }
  }
  function Gm(e) {
    var t = Or(e, 2);
    t !== null && Lt(t, e, 2);
  }
  function Du(e) {
    var t = jt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Fr) {
        At(!0);
        try {
          i();
        } finally {
          At(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ln,
      lastRenderedState: e
    }, t;
  }
  function Ym(e, t, i, o) {
    return e.baseState = i, Mu(
      e,
      Ve,
      typeof o == "function" ? o : Ln
    );
  }
  function Vx(e, t, i, o, c) {
    if (uo(e)) throw Error(a(485));
    if (e = t.action, e !== null) {
      var m = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(b) {
          m.listeners.push(b);
        }
      };
      B.T !== null ? i(!0) : m.isTransition = !1, o(m), i = t.pending, i === null ? (m.next = t.pending = m, Xm(t, m)) : (m.next = i.next, t.pending = i.next = m);
    }
  }
  function Xm(e, t) {
    var i = t.action, o = t.payload, c = e.state;
    if (t.isTransition) {
      var m = B.T, b = {};
      B.T = b;
      try {
        var k = i(c, o), N = B.S;
        N !== null && N(b, k), Qm(e, t, k);
      } catch (q) {
        Ru(e, t, q);
      } finally {
        m !== null && b.types !== null && (m.types = b.types), B.T = m;
      }
    } else
      try {
        m = i(c, o), Qm(e, t, m);
      } catch (q) {
        Ru(e, t, q);
      }
  }
  function Qm(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        Pm(e, t, o);
      },
      function(o) {
        return Ru(e, t, o);
      }
    ) : Pm(e, t, i);
  }
  function Pm(e, t, i) {
    t.status = "fulfilled", t.value = i, Zm(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, Xm(e, i)));
  }
  function Ru(e, t, i) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        t.status = "rejected", t.reason = i, Zm(t), t = t.next;
      while (t !== o);
    }
    e.action = null;
  }
  function Zm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Km(e, t) {
    return t;
  }
  function Wm(e, t) {
    if (Oe) {
      var i = Xe.formState;
      if (i !== null) {
        e: {
          var o = ke;
          if (Oe) {
            if (Ke) {
              t: {
                for (var c = Ke, m = an; c.nodeType !== 8; ) {
                  if (!m) {
                    c = null;
                    break t;
                  }
                  if (c = sn(
                    c.nextSibling
                  ), c === null) {
                    c = null;
                    break t;
                  }
                }
                m = c.data, c = m === "F!" || m === "F" ? c : null;
              }
              if (c) {
                Ke = sn(
                  c.nextSibling
                ), o = c.data === "F!";
                break e;
              }
            }
            nr(o);
          }
          o = !1;
        }
        o && (t = i[0]);
      }
    }
    return i = jt(), i.memoizedState = i.baseState = t, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Km,
      lastRenderedState: t
    }, i.queue = o, i = xh.bind(
      null,
      ke,
      o
    ), o.dispatch = i, o = Du(!1), m = Iu.bind(
      null,
      ke,
      !1,
      o.queue
    ), o = jt(), c = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = c, i = Vx.bind(
      null,
      ke,
      c,
      m,
      i
    ), c.dispatch = i, o.memoizedState = e, [t, i, !1];
  }
  function Jm(e) {
    var t = lt();
    return eh(t, Ve, e);
  }
  function eh(e, t, i) {
    if (t = Mu(
      e,
      t,
      Km
    )[0], e = ao(Ln)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var o = Mi(t);
      } catch (b) {
        throw b === jl ? Za : b;
      }
    else o = t;
    t = lt();
    var c = t.queue, m = c.dispatch;
    return i !== t.memoizedState && (ke.flags |= 2048, _l(
      9,
      { destroy: void 0 },
      $x.bind(null, c, i),
      null
    )), [o, m, e];
  }
  function $x(e, t) {
    e.action = t;
  }
  function th(e) {
    var t = lt(), i = Ve;
    if (i !== null)
      return eh(t, i, e);
    lt(), t = t.memoizedState, i = lt();
    var o = i.queue.dispatch;
    return i.memoizedState = e, [t, o, !1];
  }
  function _l(e, t, i, o) {
    return e = { tag: e, create: i, deps: o, inst: t, next: null }, t = ke.updateQueue, t === null && (t = lo(), ke.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (o = i.next, i.next = e, e.next = o, t.lastEffect = e), e;
  }
  function nh() {
    return lt().memoizedState;
  }
  function oo(e, t, i, o) {
    var c = jt();
    ke.flags |= e, c.memoizedState = _l(
      1 | t,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function so(e, t, i, o) {
    var c = lt();
    o = o === void 0 ? null : o;
    var m = c.memoizedState.inst;
    Ve !== null && o !== null && ju(o, Ve.memoizedState.deps) ? c.memoizedState = _l(t, m, i, o) : (ke.flags |= e, c.memoizedState = _l(
      1 | t,
      m,
      i,
      o
    ));
  }
  function rh(e, t) {
    oo(8390656, 8, e, t);
  }
  function Lu(e, t) {
    so(2048, 8, e, t);
  }
  function Gx(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null)
      t = lo(), ke.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function lh(e) {
    var t = lt().memoizedState;
    return Gx({ ref: t, nextImpl: e }), function() {
      if ((He & 2) !== 0) throw Error(a(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ih(e, t) {
    return so(4, 2, e, t);
  }
  function ah(e, t) {
    return so(4, 4, e, t);
  }
  function oh(e, t) {
    if (typeof t == "function") {
      e = e();
      var i = t(e);
      return function() {
        typeof i == "function" ? i() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function sh(e, t, i) {
    i = i != null ? i.concat([e]) : null, so(4, 4, oh.bind(null, t, e), i);
  }
  function Uu() {
  }
  function uh(e, t) {
    var i = lt();
    t = t === void 0 ? null : t;
    var o = i.memoizedState;
    return t !== null && ju(t, o[1]) ? o[0] : (i.memoizedState = [e, t], e);
  }
  function ch(e, t) {
    var i = lt();
    t = t === void 0 ? null : t;
    var o = i.memoizedState;
    if (t !== null && ju(t, o[1]))
      return o[0];
    if (o = e(), Fr) {
      At(!0);
      try {
        e();
      } finally {
        At(!1);
      }
    }
    return i.memoizedState = [o, t], o;
  }
  function Bu(e, t, i) {
    return i === void 0 || (Rn & 1073741824) !== 0 && (_e & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = f1(), ke.lanes |= e, fr |= e, i);
  }
  function fh(e, t, i, o) {
    return Ft(i, t) ? i : Tl.current !== null ? (e = Bu(e, i, o), Ft(e, t) || (ot = !0), e) : (Rn & 42) === 0 || (Rn & 1073741824) !== 0 && (_e & 261930) === 0 ? (ot = !0, e.memoizedState = i) : (e = f1(), ke.lanes |= e, fr |= e, t);
  }
  function dh(e, t, i, o, c) {
    var m = Y.p;
    Y.p = m !== 0 && 8 > m ? m : 8;
    var b = B.T, k = {};
    B.T = k, Iu(e, !1, t, i);
    try {
      var N = c(), q = B.S;
      if (q !== null && q(k, N), N !== null && typeof N == "object" && typeof N.then == "function") {
        var X = qx(
          N,
          o
        );
        Oi(
          e,
          t,
          X,
          Qt(e)
        );
      } else
        Oi(
          e,
          t,
          o,
          Qt(e)
        );
    } catch (W) {
      Oi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: W },
        Qt()
      );
    } finally {
      Y.p = m, b !== null && k.types !== null && (b.types = k.types), B.T = b;
    }
  }
  function Yx() {
  }
  function Hu(e, t, i, o) {
    if (e.tag !== 5) throw Error(a(476));
    var c = mh(e).queue;
    dh(
      e,
      c,
      t,
      se,
      i === null ? Yx : function() {
        return hh(e), i(o);
      }
    );
  }
  function mh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: se,
      baseState: se,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ln,
        lastRenderedState: se
      },
      next: null
    };
    var i = {};
    return t.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ln,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function hh(e) {
    var t = mh(e);
    t.next === null && (t = e.alternate.memoizedState), Oi(
      e,
      t.next.queue,
      {},
      Qt()
    );
  }
  function qu() {
    return gt(Zi);
  }
  function ph() {
    return lt().memoizedState;
  }
  function gh() {
    return lt().memoizedState;
  }
  function Xx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = Qt();
          e = ir(i);
          var o = ar(t, e, i);
          o !== null && (Lt(o, t, i), Ti(o, t, i)), t = { cache: pu() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Qx(e, t, i) {
    var o = Qt();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, uo(e) ? yh(t, i) : (i = lu(e, t, i, o), i !== null && (Lt(i, e, o), bh(i, t, o)));
  }
  function xh(e, t, i) {
    var o = Qt();
    Oi(e, t, i, o);
  }
  function Oi(e, t, i, o) {
    var c = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (uo(e)) yh(t, c);
    else {
      var m = e.alternate;
      if (e.lanes === 0 && (m === null || m.lanes === 0) && (m = t.lastRenderedReducer, m !== null))
        try {
          var b = t.lastRenderedState, k = m(b, i);
          if (c.hasEagerState = !0, c.eagerState = k, Ft(k, b))
            return Va(e, t, c, 0), Xe === null && Fa(), !1;
        } catch {
        } finally {
        }
      if (i = lu(e, t, c, o), i !== null)
        return Lt(i, e, o), bh(i, t, o), !0;
    }
    return !1;
  }
  function Iu(e, t, i, o) {
    if (o = {
      lane: 2,
      revertLane: bc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, uo(e)) {
      if (t) throw Error(a(479));
    } else
      t = lu(
        e,
        i,
        o,
        2
      ), t !== null && Lt(t, e, 2);
  }
  function uo(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function yh(e, t) {
    Al = no = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function bh(e, t, i) {
    if ((i & 4194048) !== 0) {
      var o = t.lanes;
      o &= e.pendingLanes, i |= o, t.lanes = i, wd(e, i);
    }
  }
  var Di = {
    readContext: gt,
    use: io,
    useCallback: tt,
    useContext: tt,
    useEffect: tt,
    useImperativeHandle: tt,
    useLayoutEffect: tt,
    useInsertionEffect: tt,
    useMemo: tt,
    useReducer: tt,
    useRef: tt,
    useState: tt,
    useDebugValue: tt,
    useDeferredValue: tt,
    useTransition: tt,
    useSyncExternalStore: tt,
    useId: tt,
    useHostTransitionStatus: tt,
    useFormState: tt,
    useActionState: tt,
    useOptimistic: tt,
    useMemoCache: tt,
    useCacheRefresh: tt
  };
  Di.useEffectEvent = tt;
  var vh = {
    readContext: gt,
    use: io,
    useCallback: function(e, t) {
      return jt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: gt,
    useEffect: rh,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, oo(
        4194308,
        4,
        oh.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return oo(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      oo(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = jt();
      t = t === void 0 ? null : t;
      var o = e();
      if (Fr) {
        At(!0);
        try {
          e();
        } finally {
          At(!1);
        }
      }
      return i.memoizedState = [o, t], o;
    },
    useReducer: function(e, t, i) {
      var o = jt();
      if (i !== void 0) {
        var c = i(t);
        if (Fr) {
          At(!0);
          try {
            i(t);
          } finally {
            At(!1);
          }
        }
      } else c = t;
      return o.memoizedState = o.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, o.queue = e, e = e.dispatch = Qx.bind(
        null,
        ke,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var t = jt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Du(e);
      var t = e.queue, i = xh.bind(null, ke, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Uu,
    useDeferredValue: function(e, t) {
      var i = jt();
      return Bu(i, e, t);
    },
    useTransition: function() {
      var e = Du(!1);
      return e = dh.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), jt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var o = ke, c = jt();
      if (Oe) {
        if (i === void 0)
          throw Error(a(407));
        i = i();
      } else {
        if (i = t(), Xe === null)
          throw Error(a(349));
        (_e & 127) !== 0 || Im(o, t, i);
      }
      c.memoizedState = i;
      var m = { value: i, getSnapshot: t };
      return c.queue = m, rh(Vm.bind(null, o, m, e), [
        e
      ]), o.flags |= 2048, _l(
        9,
        { destroy: void 0 },
        Fm.bind(
          null,
          o,
          m,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = jt(), t = Xe.identifierPrefix;
      if (Oe) {
        var i = xn, o = gn;
        i = (o & ~(1 << 32 - Ye(o) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = ro++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = Ix++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: qu,
    useFormState: Wm,
    useActionState: Wm,
    useOptimistic: function(e) {
      var t = jt();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = Iu.bind(
        null,
        ke,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: _u,
    useCacheRefresh: function() {
      return jt().memoizedState = Xx.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var t = jt(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((He & 2) !== 0)
          throw Error(a(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Fu = {
    readContext: gt,
    use: io,
    useCallback: uh,
    useContext: gt,
    useEffect: Lu,
    useImperativeHandle: sh,
    useInsertionEffect: ih,
    useLayoutEffect: ah,
    useMemo: ch,
    useReducer: ao,
    useRef: nh,
    useState: function() {
      return ao(Ln);
    },
    useDebugValue: Uu,
    useDeferredValue: function(e, t) {
      var i = lt();
      return fh(
        i,
        Ve.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ao(Ln)[0], t = lt().memoizedState;
      return [
        typeof e == "boolean" ? e : Mi(e),
        t
      ];
    },
    useSyncExternalStore: qm,
    useId: ph,
    useHostTransitionStatus: qu,
    useFormState: Jm,
    useActionState: Jm,
    useOptimistic: function(e, t) {
      var i = lt();
      return Ym(i, Ve, e, t);
    },
    useMemoCache: _u,
    useCacheRefresh: gh
  };
  Fu.useEffectEvent = lh;
  var Sh = {
    readContext: gt,
    use: io,
    useCallback: uh,
    useContext: gt,
    useEffect: Lu,
    useImperativeHandle: sh,
    useInsertionEffect: ih,
    useLayoutEffect: ah,
    useMemo: ch,
    useReducer: Ou,
    useRef: nh,
    useState: function() {
      return Ou(Ln);
    },
    useDebugValue: Uu,
    useDeferredValue: function(e, t) {
      var i = lt();
      return Ve === null ? Bu(i, e, t) : fh(
        i,
        Ve.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ou(Ln)[0], t = lt().memoizedState;
      return [
        typeof e == "boolean" ? e : Mi(e),
        t
      ];
    },
    useSyncExternalStore: qm,
    useId: ph,
    useHostTransitionStatus: qu,
    useFormState: th,
    useActionState: th,
    useOptimistic: function(e, t) {
      var i = lt();
      return Ve !== null ? Ym(i, Ve, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: _u,
    useCacheRefresh: gh
  };
  Sh.useEffectEvent = lh;
  function Vu(e, t, i, o) {
    t = e.memoizedState, i = i(o, t), i = i == null ? t : x({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var $u = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var o = Qt(), c = ir(o);
      c.payload = t, i != null && (c.callback = i), t = ar(e, c, o), t !== null && (Lt(t, e, o), Ti(t, e, o));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var o = Qt(), c = ir(o);
      c.tag = 1, c.payload = t, i != null && (c.callback = i), t = ar(e, c, o), t !== null && (Lt(t, e, o), Ti(t, e, o));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = Qt(), o = ir(i);
      o.tag = 2, t != null && (o.callback = t), t = ar(e, o, i), t !== null && (Lt(t, e, i), Ti(t, e, i));
    }
  };
  function kh(e, t, i, o, c, m, b) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, m, b) : t.prototype && t.prototype.isPureReactComponent ? !vi(i, o) || !vi(c, m) : !0;
  }
  function Ch(e, t, i, o) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, o), t.state !== e && $u.enqueueReplaceState(t, t.state, null);
  }
  function Vr(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var o in t)
        o !== "ref" && (i[o] = t[o]);
    }
    if (e = e.defaultProps) {
      i === t && (i = x({}, i));
      for (var c in e)
        i[c] === void 0 && (i[c] = e[c]);
    }
    return i;
  }
  function wh(e) {
    Ia(e);
  }
  function Eh(e) {
    console.error(e);
  }
  function jh(e) {
    Ia(e);
  }
  function co(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Nh(e, t, i) {
    try {
      var o = e.onCaughtError;
      o(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Gu(e, t, i) {
    return i = ir(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      co(e, t);
    }, i;
  }
  function Th(e) {
    return e = ir(e), e.tag = 3, e;
  }
  function Ah(e, t, i, o) {
    var c = i.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var m = o.value;
      e.payload = function() {
        return c(m);
      }, e.callback = function() {
        Nh(t, i, o);
      };
    }
    var b = i.stateNode;
    b !== null && typeof b.componentDidCatch == "function" && (e.callback = function() {
      Nh(t, i, o), typeof c != "function" && (dr === null ? dr = /* @__PURE__ */ new Set([this]) : dr.add(this));
      var k = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: k !== null ? k : ""
      });
    });
  }
  function Px(e, t, i, o, c) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (t = i.alternate, t !== null && Cl(
        t,
        i,
        c,
        !0
      ), i = $t.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return on === null ? Co() : i.alternate === null && nt === 0 && (nt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = c, o === Ka ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : t.add(o), gc(e, o, c)), !1;
          case 22:
            return i.flags |= 65536, o === Ka ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), gc(e, o, c)), !1;
        }
        throw Error(a(435, i.tag));
      }
      return gc(e, o, c), Co(), !1;
    }
    if (Oe)
      return t = $t.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = c, o !== cu && (e = Error(a(422), { cause: o }), Ci(nn(e, i)))) : (o !== cu && (t = Error(a(423), {
        cause: o
      }), Ci(
        nn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, o = nn(o, i), c = Gu(
        e.stateNode,
        o,
        c
      ), Su(e, c), nt !== 4 && (nt = 2)), !1;
    var m = Error(a(520), { cause: o });
    if (m = nn(m, i), Fi === null ? Fi = [m] : Fi.push(m), nt !== 4 && (nt = 2), t === null) return !0;
    o = nn(o, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = c & -c, i.lanes |= e, e = Gu(i.stateNode, o, e), Su(i, e), !1;
        case 1:
          if (t = i.type, m = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (dr === null || !dr.has(m))))
            return i.flags |= 65536, c &= -c, i.lanes |= c, c = Th(c), Ah(
              c,
              e,
              i,
              o
            ), Su(i, c), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Yu = Error(a(461)), ot = !1;
  function xt(e, t, i, o) {
    t.child = e === null ? Om(t, null, i, o) : Ir(
      t,
      e.child,
      i,
      o
    );
  }
  function zh(e, t, i, o, c) {
    i = i.render;
    var m = t.ref;
    if ("ref" in o) {
      var b = {};
      for (var k in o)
        k !== "ref" && (b[k] = o[k]);
    } else b = o;
    return Ur(t), o = Nu(
      e,
      t,
      i,
      b,
      m,
      c
    ), k = Tu(), e !== null && !ot ? (Au(e, t, c), Un(e, t, c)) : (Oe && k && su(t), t.flags |= 1, xt(e, t, o, c), t.child);
  }
  function _h(e, t, i, o, c) {
    if (e === null) {
      var m = i.type;
      return typeof m == "function" && !iu(m) && m.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = m, Mh(
        e,
        t,
        m,
        o,
        c
      )) : (e = Ga(
        i.type,
        null,
        o,
        t,
        t.mode,
        c
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (m = e.child, !ec(e, c)) {
      var b = m.memoizedProps;
      if (i = i.compare, i = i !== null ? i : vi, i(b, o) && e.ref === t.ref)
        return Un(e, t, c);
    }
    return t.flags |= 1, e = _n(m, o), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Mh(e, t, i, o, c) {
    if (e !== null) {
      var m = e.memoizedProps;
      if (vi(m, o) && e.ref === t.ref)
        if (ot = !1, t.pendingProps = o = m, ec(e, c))
          (e.flags & 131072) !== 0 && (ot = !0);
        else
          return t.lanes = e.lanes, Un(e, t, c);
    }
    return Xu(
      e,
      t,
      i,
      o,
      c
    );
  }
  function Oh(e, t, i, o) {
    var c = o.children, m = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (m = m !== null ? m.baseLanes | i : i, e !== null) {
          for (o = t.child = e.child, c = 0; o !== null; )
            c = c | o.lanes | o.childLanes, o = o.sibling;
          o = c & ~m;
        } else o = 0, t.child = null;
        return Dh(
          e,
          t,
          m,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Pa(
          t,
          m !== null ? m.cachePool : null
        ), m !== null ? Lm(t, m) : Cu(), Um(t);
      else
        return o = t.lanes = 536870912, Dh(
          e,
          t,
          m !== null ? m.baseLanes | i : i,
          i,
          o
        );
    } else
      m !== null ? (Pa(t, m.cachePool), Lm(t, m), sr(), t.memoizedState = null) : (e !== null && Pa(t, null), Cu(), sr());
    return xt(e, t, c, i), t.child;
  }
  function Ri(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Dh(e, t, i, o, c) {
    var m = xu();
    return m = m === null ? null : { parent: it._currentValue, pool: m }, t.memoizedState = {
      baseLanes: i,
      cachePool: m
    }, e !== null && Pa(t, null), Cu(), Um(t), e !== null && Cl(e, t, o, !0), t.childLanes = c, null;
  }
  function fo(e, t) {
    return t = ho(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Rh(e, t, i) {
    return Ir(t, e.child, null, i), e = fo(t, t.pendingProps), e.flags |= 2, Gt(t), t.memoizedState = null, e;
  }
  function Zx(e, t, i) {
    var o = t.pendingProps, c = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Oe) {
        if (o.mode === "hidden")
          return e = fo(t, o), t.lanes = 536870912, Ri(null, e);
        if (Eu(t), (e = Ke) ? (e = X1(
          e,
          an
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: er !== null ? { id: gn, overflow: xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = ym(e), i.return = t, t.child = i, pt = t, Ke = null)) : e = null, e === null) throw nr(t);
        return t.lanes = 536870912, null;
      }
      return fo(t, o);
    }
    var m = e.memoizedState;
    if (m !== null) {
      var b = m.dehydrated;
      if (Eu(t), c)
        if (t.flags & 256)
          t.flags &= -257, t = Rh(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(a(558));
      else if (ot || Cl(e, t, i, !1), c = (i & e.childLanes) !== 0, ot || c) {
        if (o = Xe, o !== null && (b = Ed(o, i), b !== 0 && b !== m.retryLane))
          throw m.retryLane = b, Or(e, b), Lt(o, e, b), Yu;
        Co(), t = Rh(
          e,
          t,
          i
        );
      } else
        e = m.treeContext, Ke = sn(b.nextSibling), pt = t, Oe = !0, tr = null, an = !1, e !== null && Sm(t, e), t = fo(t, o), t.flags |= 4096;
      return t;
    }
    return e = _n(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function mo(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(a(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Xu(e, t, i, o, c) {
    return Ur(t), i = Nu(
      e,
      t,
      i,
      o,
      void 0,
      c
    ), o = Tu(), e !== null && !ot ? (Au(e, t, c), Un(e, t, c)) : (Oe && o && su(t), t.flags |= 1, xt(e, t, i, c), t.child);
  }
  function Lh(e, t, i, o, c, m) {
    return Ur(t), t.updateQueue = null, i = Hm(
      t,
      o,
      i,
      c
    ), Bm(e), o = Tu(), e !== null && !ot ? (Au(e, t, m), Un(e, t, m)) : (Oe && o && su(t), t.flags |= 1, xt(e, t, i, m), t.child);
  }
  function Uh(e, t, i, o, c) {
    if (Ur(t), t.stateNode === null) {
      var m = bl, b = i.contextType;
      typeof b == "object" && b !== null && (m = gt(b)), m = new i(o, m), t.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = $u, t.stateNode = m, m._reactInternals = t, m = t.stateNode, m.props = o, m.state = t.memoizedState, m.refs = {}, bu(t), b = i.contextType, m.context = typeof b == "object" && b !== null ? gt(b) : bl, m.state = t.memoizedState, b = i.getDerivedStateFromProps, typeof b == "function" && (Vu(
        t,
        i,
        b,
        o
      ), m.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (b = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), b !== m.state && $u.enqueueReplaceState(m, m.state, null), zi(t, o, m, c), Ai(), m.state = t.memoizedState), typeof m.componentDidMount == "function" && (t.flags |= 4194308), o = !0;
    } else if (e === null) {
      m = t.stateNode;
      var k = t.memoizedProps, N = Vr(i, k);
      m.props = N;
      var q = m.context, X = i.contextType;
      b = bl, typeof X == "object" && X !== null && (b = gt(X));
      var W = i.getDerivedStateFromProps;
      X = typeof W == "function" || typeof m.getSnapshotBeforeUpdate == "function", k = t.pendingProps !== k, X || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (k || q !== b) && Ch(
        t,
        m,
        o,
        b
      ), lr = !1;
      var F = t.memoizedState;
      m.state = F, zi(t, o, m, c), Ai(), q = t.memoizedState, k || F !== q || lr ? (typeof W == "function" && (Vu(
        t,
        i,
        W,
        o
      ), q = t.memoizedState), (N = lr || kh(
        t,
        i,
        N,
        o,
        F,
        q,
        b
      )) ? (X || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = o, t.memoizedState = q), m.props = o, m.state = q, m.context = b, o = N) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308), o = !1);
    } else {
      m = t.stateNode, vu(e, t), b = t.memoizedProps, X = Vr(i, b), m.props = X, W = t.pendingProps, F = m.context, q = i.contextType, N = bl, typeof q == "object" && q !== null && (N = gt(q)), k = i.getDerivedStateFromProps, (q = typeof k == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (b !== W || F !== N) && Ch(
        t,
        m,
        o,
        N
      ), lr = !1, F = t.memoizedState, m.state = F, zi(t, o, m, c), Ai();
      var $ = t.memoizedState;
      b !== W || F !== $ || lr || e !== null && e.dependencies !== null && Xa(e.dependencies) ? (typeof k == "function" && (Vu(
        t,
        i,
        k,
        o
      ), $ = t.memoizedState), (X = lr || kh(
        t,
        i,
        X,
        o,
        F,
        $,
        N
      ) || e !== null && e.dependencies !== null && Xa(e.dependencies)) ? (q || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, $, N), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        o,
        $,
        N
      )), typeof m.componentDidUpdate == "function" && (t.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || b === e.memoizedProps && F === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && F === e.memoizedState || (t.flags |= 1024), t.memoizedProps = o, t.memoizedState = $), m.props = o, m.state = $, m.context = N, o = X) : (typeof m.componentDidUpdate != "function" || b === e.memoizedProps && F === e.memoizedState || (t.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || b === e.memoizedProps && F === e.memoizedState || (t.flags |= 1024), o = !1);
    }
    return m = o, mo(e, t), o = (t.flags & 128) !== 0, m || o ? (m = t.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : m.render(), t.flags |= 1, e !== null && o ? (t.child = Ir(
      t,
      e.child,
      null,
      c
    ), t.child = Ir(
      t,
      null,
      i,
      c
    )) : xt(e, t, i, c), t.memoizedState = m.state, e = t.child) : e = Un(
      e,
      t,
      c
    ), e;
  }
  function Bh(e, t, i, o) {
    return Rr(), t.flags |= 256, xt(e, t, i, o), t.child;
  }
  var Qu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Pu(e) {
    return { baseLanes: e, cachePool: Nm() };
  }
  function Zu(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= Xt), e;
  }
  function Hh(e, t, i) {
    var o = t.pendingProps, c = !1, m = (t.flags & 128) !== 0, b;
    if ((b = m) || (b = e !== null && e.memoizedState === null ? !1 : (rt.current & 2) !== 0), b && (c = !0, t.flags &= -129), b = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Oe) {
        if (c ? or(t) : sr(), (e = Ke) ? (e = X1(
          e,
          an
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: er !== null ? { id: gn, overflow: xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = ym(e), i.return = t, t.child = i, pt = t, Ke = null)) : e = null, e === null) throw nr(t);
        return Mc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var k = o.children;
      return o = o.fallback, c ? (sr(), c = t.mode, k = ho(
        { mode: "hidden", children: k },
        c
      ), o = Dr(
        o,
        c,
        i,
        null
      ), k.return = t, o.return = t, k.sibling = o, t.child = k, o = t.child, o.memoizedState = Pu(i), o.childLanes = Zu(
        e,
        b,
        i
      ), t.memoizedState = Qu, Ri(null, o)) : (or(t), Ku(t, k));
    }
    var N = e.memoizedState;
    if (N !== null && (k = N.dehydrated, k !== null)) {
      if (m)
        t.flags & 256 ? (or(t), t.flags &= -257, t = Wu(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (sr(), t.child = e.child, t.flags |= 128, t = null) : (sr(), k = o.fallback, c = t.mode, o = ho(
          { mode: "visible", children: o.children },
          c
        ), k = Dr(
          k,
          c,
          i,
          null
        ), k.flags |= 2, o.return = t, k.return = t, o.sibling = k, t.child = o, Ir(
          t,
          e.child,
          null,
          i
        ), o = t.child, o.memoizedState = Pu(i), o.childLanes = Zu(
          e,
          b,
          i
        ), t.memoizedState = Qu, t = Ri(null, o));
      else if (or(t), Mc(k)) {
        if (b = k.nextSibling && k.nextSibling.dataset, b) var q = b.dgst;
        b = q, o = Error(a(419)), o.stack = "", o.digest = b, Ci({ value: o, source: null, stack: null }), t = Wu(
          e,
          t,
          i
        );
      } else if (ot || Cl(e, t, i, !1), b = (i & e.childLanes) !== 0, ot || b) {
        if (b = Xe, b !== null && (o = Ed(b, i), o !== 0 && o !== N.retryLane))
          throw N.retryLane = o, Or(e, o), Lt(b, e, o), Yu;
        _c(k) || Co(), t = Wu(
          e,
          t,
          i
        );
      } else
        _c(k) ? (t.flags |= 192, t.child = e.child, t = null) : (e = N.treeContext, Ke = sn(
          k.nextSibling
        ), pt = t, Oe = !0, tr = null, an = !1, e !== null && Sm(t, e), t = Ku(
          t,
          o.children
        ), t.flags |= 4096);
      return t;
    }
    return c ? (sr(), k = o.fallback, c = t.mode, N = e.child, q = N.sibling, o = _n(N, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = N.subtreeFlags & 65011712, q !== null ? k = _n(
      q,
      k
    ) : (k = Dr(
      k,
      c,
      i,
      null
    ), k.flags |= 2), k.return = t, o.return = t, o.sibling = k, t.child = o, Ri(null, o), o = t.child, k = e.child.memoizedState, k === null ? k = Pu(i) : (c = k.cachePool, c !== null ? (N = it._currentValue, c = c.parent !== N ? { parent: N, pool: N } : c) : c = Nm(), k = {
      baseLanes: k.baseLanes | i,
      cachePool: c
    }), o.memoizedState = k, o.childLanes = Zu(
      e,
      b,
      i
    ), t.memoizedState = Qu, Ri(e.child, o)) : (or(t), i = e.child, e = i.sibling, i = _n(i, {
      mode: "visible",
      children: o.children
    }), i.return = t, i.sibling = null, e !== null && (b = t.deletions, b === null ? (t.deletions = [e], t.flags |= 16) : b.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Ku(e, t) {
    return t = ho(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function ho(e, t) {
    return e = Vt(22, e, null, t), e.lanes = 0, e;
  }
  function Wu(e, t, i) {
    return Ir(t, e.child, null, i), e = Ku(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function qh(e, t, i) {
    e.lanes |= t;
    var o = e.alternate;
    o !== null && (o.lanes |= t), mu(e.return, t, i);
  }
  function Ju(e, t, i, o, c, m) {
    var b = e.memoizedState;
    b === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: c,
      treeForkCount: m
    } : (b.isBackwards = t, b.rendering = null, b.renderingStartTime = 0, b.last = o, b.tail = i, b.tailMode = c, b.treeForkCount = m);
  }
  function Ih(e, t, i) {
    var o = t.pendingProps, c = o.revealOrder, m = o.tail;
    o = o.children;
    var b = rt.current, k = (b & 2) !== 0;
    if (k ? (b = b & 1 | 2, t.flags |= 128) : b &= 1, w(rt, b), xt(e, t, o, i), o = Oe ? ki : 0, !k && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && qh(e, i, t);
        else if (e.tag === 19)
          qh(e, i, t);
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
    switch (c) {
      case "forwards":
        for (i = t.child, c = null; i !== null; )
          e = i.alternate, e !== null && to(e) === null && (c = i), i = i.sibling;
        i = c, i === null ? (c = t.child, t.child = null) : (c = i.sibling, i.sibling = null), Ju(
          t,
          !1,
          c,
          i,
          m,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, c = t.child, t.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && to(e) === null) {
            t.child = c;
            break;
          }
          e = c.sibling, c.sibling = i, i = c, c = e;
        }
        Ju(
          t,
          !0,
          i,
          null,
          m,
          o
        );
        break;
      case "together":
        Ju(
          t,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Un(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), fr |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (Cl(
          e,
          t,
          i,
          !1
        ), (i & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(a(153));
    if (t.child !== null) {
      for (e = t.child, i = _n(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = _n(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function ec(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Xa(e)));
  }
  function Kx(e, t, i) {
    switch (t.tag) {
      case 3:
        ze(t, t.stateNode.containerInfo), rr(t, it, e.memoizedState.cache), Rr();
        break;
      case 27:
      case 5:
        Tt(t);
        break;
      case 4:
        ze(t, t.stateNode.containerInfo);
        break;
      case 10:
        rr(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Eu(t), null;
        break;
      case 13:
        var o = t.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (or(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Hh(e, t, i) : (or(t), e = Un(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        or(t);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (o = (i & t.childLanes) !== 0, o || (Cl(
          e,
          t,
          i,
          !1
        ), o = (i & t.childLanes) !== 0), c) {
          if (o)
            return Ih(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (c = t.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), w(rt, rt.current), o) break;
        return null;
      case 22:
        return t.lanes = 0, Oh(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        rr(t, it, e.memoizedState.cache);
    }
    return Un(e, t, i);
  }
  function Fh(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        ot = !0;
      else {
        if (!ec(e, i) && (t.flags & 128) === 0)
          return ot = !1, Kx(
            e,
            t,
            i
          );
        ot = (e.flags & 131072) !== 0;
      }
    else
      ot = !1, Oe && (t.flags & 1048576) !== 0 && vm(t, ki, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var o = t.pendingProps;
          if (e = Hr(t.elementType), t.type = e, typeof e == "function")
            iu(e) ? (o = Vr(e, o), t.tag = 1, t = Uh(
              null,
              t,
              e,
              o,
              i
            )) : (t.tag = 0, t = Xu(
              null,
              t,
              e,
              o,
              i
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === re) {
                t.tag = 11, t = zh(
                  null,
                  t,
                  e,
                  o,
                  i
                );
                break e;
              } else if (c === U) {
                t.tag = 14, t = _h(
                  null,
                  t,
                  e,
                  o,
                  i
                );
                break e;
              }
            }
            throw t = ie(e) || e, Error(a(306, t, ""));
          }
        }
        return t;
      case 0:
        return Xu(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return o = t.type, c = Vr(
          o,
          t.pendingProps
        ), Uh(
          e,
          t,
          o,
          c,
          i
        );
      case 3:
        e: {
          if (ze(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          o = t.pendingProps;
          var m = t.memoizedState;
          c = m.element, vu(e, t), zi(t, o, null, i);
          var b = t.memoizedState;
          if (o = b.cache, rr(t, it, o), o !== m.cache && hu(
            t,
            [it],
            i,
            !0
          ), Ai(), o = b.element, m.isDehydrated)
            if (m = {
              element: o,
              isDehydrated: !1,
              cache: b.cache
            }, t.updateQueue.baseState = m, t.memoizedState = m, t.flags & 256) {
              t = Bh(
                e,
                t,
                o,
                i
              );
              break e;
            } else if (o !== c) {
              c = nn(
                Error(a(424)),
                t
              ), Ci(c), t = Bh(
                e,
                t,
                o,
                i
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
              for (Ke = sn(e.firstChild), pt = t, Oe = !0, tr = null, an = !0, i = Om(
                t,
                null,
                o,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Rr(), o === c) {
              t = Un(
                e,
                t,
                i
              );
              break e;
            }
            xt(e, t, o, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return mo(e, t), e === null ? (i = J1(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Oe || (i = t.type, e = t.pendingProps, o = zo(
          te.current
        ).createElement(i), o[ht] = t, o[zt] = e, yt(o, i, e), dt(o), t.stateNode = o) : t.memoizedState = J1(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Tt(t), e === null && Oe && (o = t.stateNode = Z1(
          t.type,
          t.pendingProps,
          te.current
        ), pt = t, an = !0, c = Ke, gr(t.type) ? (Oc = c, Ke = sn(o.firstChild)) : Ke = c), xt(
          e,
          t,
          t.pendingProps.children,
          i
        ), mo(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Oe && ((c = o = Ke) && (o = N4(
          o,
          t.type,
          t.pendingProps,
          an
        ), o !== null ? (t.stateNode = o, pt = t, Ke = sn(o.firstChild), an = !1, c = !0) : c = !1), c || nr(t)), Tt(t), c = t.type, m = t.pendingProps, b = e !== null ? e.memoizedProps : null, o = m.children, Tc(c, m) ? o = null : b !== null && Tc(c, b) && (t.flags |= 32), t.memoizedState !== null && (c = Nu(
          e,
          t,
          Fx,
          null,
          null,
          i
        ), Zi._currentValue = c), mo(e, t), xt(e, t, o, i), t.child;
      case 6:
        return e === null && Oe && ((e = i = Ke) && (i = T4(
          i,
          t.pendingProps,
          an
        ), i !== null ? (t.stateNode = i, pt = t, Ke = null, e = !0) : e = !1), e || nr(t)), null;
      case 13:
        return Hh(e, t, i);
      case 4:
        return ze(
          t,
          t.stateNode.containerInfo
        ), o = t.pendingProps, e === null ? t.child = Ir(
          t,
          null,
          o,
          i
        ) : xt(e, t, o, i), t.child;
      case 11:
        return zh(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return xt(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return xt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return xt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return o = t.pendingProps, rr(t, t.type, o.value), xt(e, t, o.children, i), t.child;
      case 9:
        return c = t.type._context, o = t.pendingProps.children, Ur(t), c = gt(c), o = o(c), t.flags |= 1, xt(e, t, o, i), t.child;
      case 14:
        return _h(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Mh(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Ih(e, t, i);
      case 31:
        return Zx(e, t, i);
      case 22:
        return Oh(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return Ur(t), o = gt(it), e === null ? (c = xu(), c === null && (c = Xe, m = pu(), c.pooledCache = m, m.refCount++, m !== null && (c.pooledCacheLanes |= i), c = m), t.memoizedState = { parent: o, cache: c }, bu(t), rr(t, it, c)) : ((e.lanes & i) !== 0 && (vu(e, t), zi(t, null, null, i), Ai()), c = e.memoizedState, m = t.memoizedState, c.parent !== o ? (c = { parent: o, cache: o }, t.memoizedState = c, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = c), rr(t, it, o)) : (o = m.cache, rr(t, it, o), o !== c.cache && hu(
          t,
          [it],
          i,
          !0
        ))), xt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(a(156, t.tag));
  }
  function Bn(e) {
    e.flags |= 4;
  }
  function tc(e, t, i, o, c) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (p1()) e.flags |= 8192;
        else
          throw qr = Ka, yu;
    } else e.flags &= -16777217;
  }
  function Vh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !l0(t))
      if (p1()) e.flags |= 8192;
      else
        throw qr = Ka, yu;
  }
  function po(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? kd() : 536870912, e.lanes |= t, Rl |= t);
  }
  function Li(e, t) {
    if (!Oe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var o = null; i !== null; )
            i.alternate !== null && (o = i), i = i.sibling;
          o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function We(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, o = 0;
    if (t)
      for (var c = e.child; c !== null; )
        i |= c.lanes | c.childLanes, o |= c.subtreeFlags & 65011712, o |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        i |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= o, e.childLanes = i, t;
  }
  function Wx(e, t, i) {
    var o = t.pendingProps;
    switch (uu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return We(t), null;
      case 1:
        return We(t), null;
      case 3:
        return i = t.stateNode, o = null, e !== null && (o = e.memoizedState.cache), t.memoizedState.cache !== o && (t.flags |= 2048), Dn(it), De(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (kl(t) ? Bn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, fu())), We(t), null;
      case 26:
        var c = t.type, m = t.memoizedState;
        return e === null ? (Bn(t), m !== null ? (We(t), Vh(t, m)) : (We(t), tc(
          t,
          c,
          null,
          o,
          i
        ))) : m ? m !== e.memoizedState ? (Bn(t), We(t), Vh(t, m)) : (We(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== o && Bn(t), We(t), tc(
          t,
          c,
          e,
          o,
          i
        )), null;
      case 27:
        if (En(t), i = te.current, c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== o && Bn(t);
        else {
          if (!o) {
            if (t.stateNode === null)
              throw Error(a(166));
            return We(t), null;
          }
          e = G.current, kl(t) ? km(t) : (e = Z1(c, o, i), t.stateNode = e, Bn(t));
        }
        return We(t), null;
      case 5:
        if (En(t), c = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== o && Bn(t);
        else {
          if (!o) {
            if (t.stateNode === null)
              throw Error(a(166));
            return We(t), null;
          }
          if (m = G.current, kl(t))
            km(t);
          else {
            var b = zo(
              te.current
            );
            switch (m) {
              case 1:
                m = b.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                m = b.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    m = b.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    m = b.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    m = b.createElement("div"), m.innerHTML = "<script><\/script>", m = m.removeChild(
                      m.firstChild
                    );
                    break;
                  case "select":
                    m = typeof o.is == "string" ? b.createElement("select", {
                      is: o.is
                    }) : b.createElement("select"), o.multiple ? m.multiple = !0 : o.size && (m.size = o.size);
                    break;
                  default:
                    m = typeof o.is == "string" ? b.createElement(c, { is: o.is }) : b.createElement(c);
                }
            }
            m[ht] = t, m[zt] = o;
            e: for (b = t.child; b !== null; ) {
              if (b.tag === 5 || b.tag === 6)
                m.appendChild(b.stateNode);
              else if (b.tag !== 4 && b.tag !== 27 && b.child !== null) {
                b.child.return = b, b = b.child;
                continue;
              }
              if (b === t) break e;
              for (; b.sibling === null; ) {
                if (b.return === null || b.return === t)
                  break e;
                b = b.return;
              }
              b.sibling.return = b.return, b = b.sibling;
            }
            t.stateNode = m;
            e: switch (yt(m, c, o), c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
            o && Bn(t);
          }
        }
        return We(t), tc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== o && Bn(t);
        else {
          if (typeof o != "string" && t.stateNode === null)
            throw Error(a(166));
          if (e = te.current, kl(t)) {
            if (e = t.stateNode, i = t.memoizedProps, o = null, c = pt, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  o = c.memoizedProps;
              }
            e[ht] = t, e = !!(e.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || H1(e.nodeValue, i)), e || nr(t, !0);
          } else
            e = zo(e).createTextNode(
              o
            ), e[ht] = t, t.stateNode = e;
        }
        return We(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (o = kl(t), i !== null) {
            if (e === null) {
              if (!o) throw Error(a(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[ht] = t;
            } else
              Rr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            We(t), e = !1;
          } else
            i = fu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(a(558));
        }
        return We(t), null;
      case 13:
        if (o = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = kl(t), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(a(318));
              if (c = t.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(a(317));
              c[ht] = t;
            } else
              Rr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            We(t), c = !1;
          } else
            c = fu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
        }
        return Gt(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = o !== null, e = e !== null && e.memoizedState !== null, i && (o = t.child, c = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (c = o.alternate.memoizedState.cachePool.pool), m = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (m = o.memoizedState.cachePool.pool), m !== c && (o.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), po(t, t.updateQueue), We(t), null);
      case 4:
        return De(), e === null && Cc(t.stateNode.containerInfo), We(t), null;
      case 10:
        return Dn(t.type), We(t), null;
      case 19:
        if (Q(rt), o = t.memoizedState, o === null) return We(t), null;
        if (c = (t.flags & 128) !== 0, m = o.rendering, m === null)
          if (c) Li(o, !1);
          else {
            if (nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (m = to(e), m !== null) {
                  for (t.flags |= 128, Li(o, !1), e = m.updateQueue, t.updateQueue = e, po(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    xm(i, e), i = i.sibling;
                  return w(
                    rt,
                    rt.current & 1 | 2
                  ), Oe && Mn(t, o.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            o.tail !== null && wt() > vo && (t.flags |= 128, c = !0, Li(o, !1), t.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = to(m), e !== null) {
              if (t.flags |= 128, c = !0, e = e.updateQueue, t.updateQueue = e, po(t, e), Li(o, !0), o.tail === null && o.tailMode === "hidden" && !m.alternate && !Oe)
                return We(t), null;
            } else
              2 * wt() - o.renderingStartTime > vo && i !== 536870912 && (t.flags |= 128, c = !0, Li(o, !1), t.lanes = 4194304);
          o.isBackwards ? (m.sibling = t.child, t.child = m) : (e = o.last, e !== null ? e.sibling = m : t.child = m, o.last = m);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = wt(), e.sibling = null, i = rt.current, w(
          rt,
          c ? i & 1 | 2 : i & 1
        ), Oe && Mn(t, o.treeForkCount), e) : (We(t), null);
      case 22:
      case 23:
        return Gt(t), wu(), o = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (t.flags |= 8192) : o && (t.flags |= 8192), o ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (We(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : We(t), i = t.updateQueue, i !== null && po(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), o = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (o = t.memoizedState.cachePool.pool), o !== i && (t.flags |= 2048), e !== null && Q(Br), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Dn(it), We(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function Jx(e, t) {
    switch (uu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Dn(it), De(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return En(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Gt(t), t.alternate === null)
            throw Error(a(340));
          Rr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Gt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(a(340));
          Rr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Q(rt), null;
      case 4:
        return De(), null;
      case 10:
        return Dn(t.type), null;
      case 22:
      case 23:
        return Gt(t), wu(), e !== null && Q(Br), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Dn(it), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $h(e, t) {
    switch (uu(t), t.tag) {
      case 3:
        Dn(it), De();
        break;
      case 26:
      case 27:
      case 5:
        En(t);
        break;
      case 4:
        De();
        break;
      case 31:
        t.memoizedState !== null && Gt(t);
        break;
      case 13:
        Gt(t);
        break;
      case 19:
        Q(rt);
        break;
      case 10:
        Dn(t.type);
        break;
      case 22:
      case 23:
        Gt(t), wu(), e !== null && Q(Br);
        break;
      case 24:
        Dn(it);
    }
  }
  function Ui(e, t) {
    try {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            o = void 0;
            var m = i.create, b = i.inst;
            o = m(), b.destroy = o;
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (k) {
      Fe(t, t.return, k);
    }
  }
  function ur(e, t, i) {
    try {
      var o = t.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var m = c.next;
        o = m;
        do {
          if ((o.tag & e) === e) {
            var b = o.inst, k = b.destroy;
            if (k !== void 0) {
              b.destroy = void 0, c = t;
              var N = i, q = k;
              try {
                q();
              } catch (X) {
                Fe(
                  c,
                  N,
                  X
                );
              }
            }
          }
          o = o.next;
        } while (o !== m);
      }
    } catch (X) {
      Fe(t, t.return, X);
    }
  }
  function Gh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Rm(t, i);
      } catch (o) {
        Fe(e, e.return, o);
      }
    }
  }
  function Yh(e, t, i) {
    i.props = Vr(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      Fe(e, t, o);
    }
  }
  function Bi(e, t) {
    try {
      var i = e.ref;
      if (i !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var o = e.stateNode;
            break;
          case 30:
            o = e.stateNode;
            break;
          default:
            o = e.stateNode;
        }
        typeof i == "function" ? e.refCleanup = i(o) : i.current = o;
      }
    } catch (c) {
      Fe(e, t, c);
    }
  }
  function yn(e, t) {
    var i = e.ref, o = e.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (c) {
          Fe(e, t, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (c) {
          Fe(e, t, c);
        }
      else i.current = null;
  }
  function Xh(e) {
    var t = e.type, i = e.memoizedProps, o = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && o.focus();
          break e;
        case "img":
          i.src ? o.src = i.src : i.srcSet && (o.srcset = i.srcSet);
      }
    } catch (c) {
      Fe(e, e.return, c);
    }
  }
  function nc(e, t, i) {
    try {
      var o = e.stateNode;
      S4(o, e.type, i, t), o[zt] = t;
    } catch (c) {
      Fe(e, e.return, c);
    }
  }
  function Qh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && gr(e.type) || e.tag === 4;
  }
  function rc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Qh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && gr(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function lc(e, t, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = An));
    else if (o !== 4 && (o === 27 && gr(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (lc(e, t, i), e = e.sibling; e !== null; )
        lc(e, t, i), e = e.sibling;
  }
  function go(e, t, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (o !== 4 && (o === 27 && gr(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (go(e, t, i), e = e.sibling; e !== null; )
        go(e, t, i), e = e.sibling;
  }
  function Ph(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var o = e.type, c = t.attributes; c.length; )
        t.removeAttributeNode(c[0]);
      yt(t, o, i), t[ht] = e, t[zt] = i;
    } catch (m) {
      Fe(e, e.return, m);
    }
  }
  var Hn = !1, st = !1, ic = !1, Zh = typeof WeakSet == "function" ? WeakSet : Set, mt = null;
  function e4(e, t) {
    if (e = e.containerInfo, jc = Uo, e = sm(e), Ws(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var c = o.anchorOffset, m = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, m.nodeType;
            } catch {
              i = null;
              break e;
            }
            var b = 0, k = -1, N = -1, q = 0, X = 0, W = e, F = null;
            t: for (; ; ) {
              for (var $; W !== i || c !== 0 && W.nodeType !== 3 || (k = b + c), W !== m || o !== 0 && W.nodeType !== 3 || (N = b + o), W.nodeType === 3 && (b += W.nodeValue.length), ($ = W.firstChild) !== null; )
                F = W, W = $;
              for (; ; ) {
                if (W === e) break t;
                if (F === i && ++q === c && (k = b), F === m && ++X === o && (N = b), ($ = W.nextSibling) !== null) break;
                W = F, F = W.parentNode;
              }
              W = $;
            }
            i = k === -1 || N === -1 ? null : { start: k, end: N };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Nc = { focusedElem: e, selectionRange: i }, Uo = !1, mt = t; mt !== null; )
      if (t = mt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, mt = e;
      else
        for (; mt !== null; ) {
          switch (t = mt, m = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  c = e[i], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && m !== null) {
                e = void 0, i = t, c = m.memoizedProps, m = m.memoizedState, o = i.stateNode;
                try {
                  var ce = Vr(
                    i.type,
                    c
                  );
                  e = o.getSnapshotBeforeUpdate(
                    ce,
                    m
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (be) {
                  Fe(
                    i,
                    i.return,
                    be
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  zc(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      zc(e);
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
              if ((e & 1024) !== 0) throw Error(a(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, mt = e;
            break;
          }
          mt = t.return;
        }
  }
  function Kh(e, t, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        In(e, i), o & 4 && Ui(5, i);
        break;
      case 1:
        if (In(e, i), o & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (b) {
              Fe(i, i.return, b);
            }
          else {
            var c = Vr(
              i.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                c,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (b) {
              Fe(
                i,
                i.return,
                b
              );
            }
          }
        o & 64 && Gh(i), o & 512 && Bi(i, i.return);
        break;
      case 3:
        if (In(e, i), o & 64 && (e = i.updateQueue, e !== null)) {
          if (t = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                t = i.child.stateNode;
                break;
              case 1:
                t = i.child.stateNode;
            }
          try {
            Rm(e, t);
          } catch (b) {
            Fe(i, i.return, b);
          }
        }
        break;
      case 27:
        t === null && o & 4 && Ph(i);
      case 26:
      case 5:
        In(e, i), t === null && o & 4 && Xh(i), o & 512 && Bi(i, i.return);
        break;
      case 12:
        In(e, i);
        break;
      case 31:
        In(e, i), o & 4 && e1(e, i);
        break;
      case 13:
        In(e, i), o & 4 && t1(e, i), o & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = u4.bind(
          null,
          i
        ), A4(e, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Hn, !o) {
          t = t !== null && t.memoizedState !== null || st, c = Hn;
          var m = st;
          Hn = o, (st = t) && !m ? Fn(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : In(e, i), Hn = c, st = m;
        }
        break;
      case 30:
        break;
      default:
        In(e, i);
    }
  }
  function Wh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Wh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Rs(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var et = null, Mt = !1;
  function qn(e, t, i) {
    for (i = i.child; i !== null; )
      Jh(e, t, i), i = i.sibling;
  }
  function Jh(e, t, i) {
    if (ct && typeof ct.onCommitFiberUnmount == "function")
      try {
        ct.onCommitFiberUnmount(Et, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        st || yn(i, t), qn(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        st || yn(i, t);
        var o = et, c = Mt;
        gr(i.type) && (et = i.stateNode, Mt = !1), qn(
          e,
          t,
          i
        ), Xi(i.stateNode), et = o, Mt = c;
        break;
      case 5:
        st || yn(i, t);
      case 6:
        if (o = et, c = Mt, et = null, qn(
          e,
          t,
          i
        ), et = o, Mt = c, et !== null)
          if (Mt)
            try {
              (et.nodeType === 9 ? et.body : et.nodeName === "HTML" ? et.ownerDocument.body : et).removeChild(i.stateNode);
            } catch (m) {
              Fe(
                i,
                t,
                m
              );
            }
          else
            try {
              et.removeChild(i.stateNode);
            } catch (m) {
              Fe(
                i,
                t,
                m
              );
            }
        break;
      case 18:
        et !== null && (Mt ? (e = et, G1(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Vl(e)) : G1(et, i.stateNode));
        break;
      case 4:
        o = et, c = Mt, et = i.stateNode.containerInfo, Mt = !0, qn(
          e,
          t,
          i
        ), et = o, Mt = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ur(2, i, t), st || ur(4, i, t), qn(
          e,
          t,
          i
        );
        break;
      case 1:
        st || (yn(i, t), o = i.stateNode, typeof o.componentWillUnmount == "function" && Yh(
          i,
          t,
          o
        )), qn(
          e,
          t,
          i
        );
        break;
      case 21:
        qn(
          e,
          t,
          i
        );
        break;
      case 22:
        st = (o = st) || i.memoizedState !== null, qn(
          e,
          t,
          i
        ), st = o;
        break;
      default:
        qn(
          e,
          t,
          i
        );
    }
  }
  function e1(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Vl(e);
      } catch (i) {
        Fe(t, t.return, i);
      }
    }
  }
  function t1(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Vl(e);
      } catch (i) {
        Fe(t, t.return, i);
      }
  }
  function t4(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Zh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Zh()), t;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function xo(e, t) {
    var i = t4(e);
    t.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var c = c4.bind(null, e, o);
        o.then(c, c);
      }
    });
  }
  function Ot(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var c = i[o], m = e, b = t, k = b;
        e: for (; k !== null; ) {
          switch (k.tag) {
            case 27:
              if (gr(k.type)) {
                et = k.stateNode, Mt = !1;
                break e;
              }
              break;
            case 5:
              et = k.stateNode, Mt = !1;
              break e;
            case 3:
            case 4:
              et = k.stateNode.containerInfo, Mt = !0;
              break e;
          }
          k = k.return;
        }
        if (et === null) throw Error(a(160));
        Jh(m, b, c), et = null, Mt = !1, m = c.alternate, m !== null && (m.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        n1(t, e), t = t.sibling;
  }
  var mn = null;
  function n1(e, t) {
    var i = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ot(t, e), Dt(e), o & 4 && (ur(3, e, e.return), Ui(3, e), ur(5, e, e.return));
        break;
      case 1:
        Ot(t, e), Dt(e), o & 512 && (st || i === null || yn(i, i.return)), o & 64 && Hn && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var c = mn;
        if (Ot(t, e), Dt(e), o & 512 && (st || i === null || yn(i, i.return)), o & 4) {
          var m = i !== null ? i.memoizedState : null;
          if (o = e.memoizedState, i === null)
            if (o === null)
              if (e.stateNode === null) {
                e: {
                  o = e.type, i = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (o) {
                    case "title":
                      m = c.getElementsByTagName("title")[0], (!m || m[fi] || m[ht] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = c.createElement(o), c.head.insertBefore(
                        m,
                        c.querySelector("head > title")
                      )), yt(m, o, i), m[ht] = e, dt(m), o = m;
                      break e;
                    case "link":
                      var b = n0(
                        "link",
                        "href",
                        c
                      ).get(o + (i.href || ""));
                      if (b) {
                        for (var k = 0; k < b.length; k++)
                          if (m = b[k], m.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && m.getAttribute("rel") === (i.rel == null ? null : i.rel) && m.getAttribute("title") === (i.title == null ? null : i.title) && m.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            b.splice(k, 1);
                            break t;
                          }
                      }
                      m = c.createElement(o), yt(m, o, i), c.head.appendChild(m);
                      break;
                    case "meta":
                      if (b = n0(
                        "meta",
                        "content",
                        c
                      ).get(o + (i.content || ""))) {
                        for (k = 0; k < b.length; k++)
                          if (m = b[k], m.getAttribute("content") === (i.content == null ? null : "" + i.content) && m.getAttribute("name") === (i.name == null ? null : i.name) && m.getAttribute("property") === (i.property == null ? null : i.property) && m.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && m.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            b.splice(k, 1);
                            break t;
                          }
                      }
                      m = c.createElement(o), yt(m, o, i), c.head.appendChild(m);
                      break;
                    default:
                      throw Error(a(468, o));
                  }
                  m[ht] = e, dt(m), o = m;
                }
                e.stateNode = o;
              } else
                r0(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = t0(
                c,
                o,
                e.memoizedProps
              );
          else
            m !== o ? (m === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : m.count--, o === null ? r0(
              c,
              e.type,
              e.stateNode
            ) : t0(
              c,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && nc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Ot(t, e), Dt(e), o & 512 && (st || i === null || yn(i, i.return)), i !== null && o & 4 && nc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Ot(t, e), Dt(e), o & 512 && (st || i === null || yn(i, i.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            dl(c, "");
          } catch (ce) {
            Fe(e, e.return, ce);
          }
        }
        o & 4 && e.stateNode != null && (c = e.memoizedProps, nc(
          e,
          c,
          i !== null ? i.memoizedProps : c
        )), o & 1024 && (ic = !0);
        break;
      case 6:
        if (Ot(t, e), Dt(e), o & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          o = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = o;
          } catch (ce) {
            Fe(e, e.return, ce);
          }
        }
        break;
      case 3:
        if (Oo = null, c = mn, mn = _o(t.containerInfo), Ot(t, e), mn = c, Dt(e), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Vl(t.containerInfo);
          } catch (ce) {
            Fe(e, e.return, ce);
          }
        ic && (ic = !1, r1(e));
        break;
      case 4:
        o = mn, mn = _o(
          e.stateNode.containerInfo
        ), Ot(t, e), Dt(e), mn = o;
        break;
      case 12:
        Ot(t, e), Dt(e);
        break;
      case 31:
        Ot(t, e), Dt(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, xo(e, o)));
        break;
      case 13:
        Ot(t, e), Dt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (bo = wt()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, xo(e, o)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var N = i !== null && i.memoizedState !== null, q = Hn, X = st;
        if (Hn = q || c, st = X || N, Ot(t, e), st = X, Hn = q, Dt(e), o & 8192)
          e: for (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, c && (i === null || N || Hn || st || $r(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                N = i = t;
                try {
                  if (m = N.stateNode, c)
                    b = m.style, typeof b.setProperty == "function" ? b.setProperty("display", "none", "important") : b.display = "none";
                  else {
                    k = N.stateNode;
                    var W = N.memoizedProps.style, F = W != null && W.hasOwnProperty("display") ? W.display : null;
                    k.style.display = F == null || typeof F == "boolean" ? "" : ("" + F).trim();
                  }
                } catch (ce) {
                  Fe(N, N.return, ce);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                N = t;
                try {
                  N.stateNode.nodeValue = c ? "" : N.memoizedProps;
                } catch (ce) {
                  Fe(N, N.return, ce);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                N = t;
                try {
                  var $ = N.stateNode;
                  c ? Y1($, !0) : Y1(N.stateNode, !1);
                } catch (ce) {
                  Fe(N, N.return, ce);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              i === t && (i = null), t = t.return;
            }
            i === t && (i = null), t.sibling.return = t.return, t = t.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, xo(e, i))));
        break;
      case 19:
        Ot(t, e), Dt(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, xo(e, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ot(t, e), Dt(e);
    }
  }
  function Dt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, o = e.return; o !== null; ) {
          if (Qh(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(a(160));
        switch (i.tag) {
          case 27:
            var c = i.stateNode, m = rc(e);
            go(e, m, c);
            break;
          case 5:
            var b = i.stateNode;
            i.flags & 32 && (dl(b, ""), i.flags &= -33);
            var k = rc(e);
            go(e, k, b);
            break;
          case 3:
          case 4:
            var N = i.stateNode.containerInfo, q = rc(e);
            lc(
              e,
              q,
              N
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (X) {
        Fe(e, e.return, X);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function r1(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        r1(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function In(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Kh(e, t.alternate, t), t = t.sibling;
  }
  function $r(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ur(4, t, t.return), $r(t);
          break;
        case 1:
          yn(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && Yh(
            t,
            t.return,
            i
          ), $r(t);
          break;
        case 27:
          Xi(t.stateNode);
        case 26:
        case 5:
          yn(t, t.return), $r(t);
          break;
        case 22:
          t.memoizedState === null && $r(t);
          break;
        case 30:
          $r(t);
          break;
        default:
          $r(t);
      }
      e = e.sibling;
    }
  }
  function Fn(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var o = t.alternate, c = e, m = t, b = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Fn(
            c,
            m,
            i
          ), Ui(4, m);
          break;
        case 1:
          if (Fn(
            c,
            m,
            i
          ), o = m, c = o.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (q) {
              Fe(o, o.return, q);
            }
          if (o = m, c = o.updateQueue, c !== null) {
            var k = o.stateNode;
            try {
              var N = c.shared.hiddenCallbacks;
              if (N !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < N.length; c++)
                  Dm(N[c], k);
            } catch (q) {
              Fe(o, o.return, q);
            }
          }
          i && b & 64 && Gh(m), Bi(m, m.return);
          break;
        case 27:
          Ph(m);
        case 26:
        case 5:
          Fn(
            c,
            m,
            i
          ), i && o === null && b & 4 && Xh(m), Bi(m, m.return);
          break;
        case 12:
          Fn(
            c,
            m,
            i
          );
          break;
        case 31:
          Fn(
            c,
            m,
            i
          ), i && b & 4 && e1(c, m);
          break;
        case 13:
          Fn(
            c,
            m,
            i
          ), i && b & 4 && t1(c, m);
          break;
        case 22:
          m.memoizedState === null && Fn(
            c,
            m,
            i
          ), Bi(m, m.return);
          break;
        case 30:
          break;
        default:
          Fn(
            c,
            m,
            i
          );
      }
      t = t.sibling;
    }
  }
  function ac(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && wi(i));
  }
  function oc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wi(e));
  }
  function hn(e, t, i, o) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        l1(
          e,
          t,
          i,
          o
        ), t = t.sibling;
  }
  function l1(e, t, i, o) {
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        hn(
          e,
          t,
          i,
          o
        ), c & 2048 && Ui(9, t);
        break;
      case 1:
        hn(
          e,
          t,
          i,
          o
        );
        break;
      case 3:
        hn(
          e,
          t,
          i,
          o
        ), c & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wi(e)));
        break;
      case 12:
        if (c & 2048) {
          hn(
            e,
            t,
            i,
            o
          ), e = t.stateNode;
          try {
            var m = t.memoizedProps, b = m.id, k = m.onPostCommit;
            typeof k == "function" && k(
              b,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (N) {
            Fe(t, t.return, N);
          }
        } else
          hn(
            e,
            t,
            i,
            o
          );
        break;
      case 31:
        hn(
          e,
          t,
          i,
          o
        );
        break;
      case 13:
        hn(
          e,
          t,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        m = t.stateNode, b = t.alternate, t.memoizedState !== null ? m._visibility & 2 ? hn(
          e,
          t,
          i,
          o
        ) : Hi(e, t) : m._visibility & 2 ? hn(
          e,
          t,
          i,
          o
        ) : (m._visibility |= 2, Ml(
          e,
          t,
          i,
          o,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && ac(b, t);
        break;
      case 24:
        hn(
          e,
          t,
          i,
          o
        ), c & 2048 && oc(t.alternate, t);
        break;
      default:
        hn(
          e,
          t,
          i,
          o
        );
    }
  }
  function Ml(e, t, i, o, c) {
    for (c = c && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var m = e, b = t, k = i, N = o, q = b.flags;
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          Ml(
            m,
            b,
            k,
            N,
            c
          ), Ui(8, b);
          break;
        case 23:
          break;
        case 22:
          var X = b.stateNode;
          b.memoizedState !== null ? X._visibility & 2 ? Ml(
            m,
            b,
            k,
            N,
            c
          ) : Hi(
            m,
            b
          ) : (X._visibility |= 2, Ml(
            m,
            b,
            k,
            N,
            c
          )), c && q & 2048 && ac(
            b.alternate,
            b
          );
          break;
        case 24:
          Ml(
            m,
            b,
            k,
            N,
            c
          ), c && q & 2048 && oc(b.alternate, b);
          break;
        default:
          Ml(
            m,
            b,
            k,
            N,
            c
          );
      }
      t = t.sibling;
    }
  }
  function Hi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, o = t, c = o.flags;
        switch (o.tag) {
          case 22:
            Hi(i, o), c & 2048 && ac(
              o.alternate,
              o
            );
            break;
          case 24:
            Hi(i, o), c & 2048 && oc(o.alternate, o);
            break;
          default:
            Hi(i, o);
        }
        t = t.sibling;
      }
  }
  var qi = 8192;
  function Ol(e, t, i) {
    if (e.subtreeFlags & qi)
      for (e = e.child; e !== null; )
        i1(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function i1(e, t, i) {
    switch (e.tag) {
      case 26:
        Ol(
          e,
          t,
          i
        ), e.flags & qi && e.memoizedState !== null && I4(
          i,
          mn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ol(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var o = mn;
        mn = _o(e.stateNode.containerInfo), Ol(
          e,
          t,
          i
        ), mn = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = qi, qi = 16777216, Ol(
          e,
          t,
          i
        ), qi = o) : Ol(
          e,
          t,
          i
        ));
        break;
      default:
        Ol(
          e,
          t,
          i
        );
    }
  }
  function a1(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ii(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var o = t[i];
          mt = o, s1(
            o,
            e
          );
        }
      a1(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        o1(e), e = e.sibling;
  }
  function o1(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ii(e), e.flags & 2048 && ur(9, e, e.return);
        break;
      case 3:
        Ii(e);
        break;
      case 12:
        Ii(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, yo(e)) : Ii(e);
        break;
      default:
        Ii(e);
    }
  }
  function yo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var o = t[i];
          mt = o, s1(
            o,
            e
          );
        }
      a1(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ur(8, t, t.return), yo(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, yo(t));
          break;
        default:
          yo(t);
      }
      e = e.sibling;
    }
  }
  function s1(e, t) {
    for (; mt !== null; ) {
      var i = mt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ur(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          wi(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, mt = o;
      else
        e: for (i = e; mt !== null; ) {
          o = mt;
          var c = o.sibling, m = o.return;
          if (Wh(o), o === i) {
            mt = null;
            break e;
          }
          if (c !== null) {
            c.return = m, mt = c;
            break e;
          }
          mt = m;
        }
    }
  }
  var n4 = {
    getCacheForType: function(e) {
      var t = gt(it), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return gt(it).controller.signal;
    }
  }, r4 = typeof WeakMap == "function" ? WeakMap : Map, He = 0, Xe = null, Ne = null, _e = 0, Ie = 0, Yt = null, cr = !1, Dl = !1, sc = !1, Vn = 0, nt = 0, fr = 0, Gr = 0, uc = 0, Xt = 0, Rl = 0, Fi = null, Rt = null, cc = !1, bo = 0, u1 = 0, vo = 1 / 0, So = null, dr = null, ft = 0, mr = null, Ll = null, $n = 0, fc = 0, dc = null, c1 = null, Vi = 0, mc = null;
  function Qt() {
    return (He & 2) !== 0 && _e !== 0 ? _e & -_e : B.T !== null ? bc() : jd();
  }
  function f1() {
    if (Xt === 0)
      if ((_e & 536870912) === 0 || Oe) {
        var e = Ta;
        Ta <<= 1, (Ta & 3932160) === 0 && (Ta = 262144), Xt = e;
      } else Xt = 536870912;
    return e = $t.current, e !== null && (e.flags |= 32), Xt;
  }
  function Lt(e, t, i) {
    (e === Xe && (Ie === 2 || Ie === 9) || e.cancelPendingCommit !== null) && (Ul(e, 0), hr(
      e,
      _e,
      Xt,
      !1
    )), ci(e, i), ((He & 2) === 0 || e !== Xe) && (e === Xe && ((He & 2) === 0 && (Gr |= i), nt === 4 && hr(
      e,
      _e,
      Xt,
      !1
    )), bn(e));
  }
  function d1(e, t, i) {
    if ((He & 6) !== 0) throw Error(a(327));
    var o = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ui(e, t), c = o ? a4(e, t) : pc(e, t, !0), m = o;
    do {
      if (c === 0) {
        Dl && !o && hr(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, m && !l4(i)) {
          c = pc(e, t, !1), m = !1;
          continue;
        }
        if (c === 2) {
          if (m = t, e.errorRecoveryDisabledLanes & m)
            var b = 0;
          else
            b = e.pendingLanes & -536870913, b = b !== 0 ? b : b & 536870912 ? 536870912 : 0;
          if (b !== 0) {
            t = b;
            e: {
              var k = e;
              c = Fi;
              var N = k.current.memoizedState.isDehydrated;
              if (N && (Ul(k, b).flags |= 256), b = pc(
                k,
                b,
                !1
              ), b !== 2) {
                if (sc && !N) {
                  k.errorRecoveryDisabledLanes |= m, Gr |= m, c = 4;
                  break e;
                }
                m = Rt, Rt = c, m !== null && (Rt === null ? Rt = m : Rt.push.apply(
                  Rt,
                  m
                ));
              }
              c = b;
            }
            if (m = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Ul(e, 0), hr(e, t, 0, !0);
          break;
        }
        e: {
          switch (o = e, m = c, m) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              hr(
                o,
                t,
                Xt,
                !cr
              );
              break e;
            case 2:
              Rt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((t & 62914560) === t && (c = bo + 300 - wt(), 10 < c)) {
            if (hr(
              o,
              t,
              Xt,
              !cr
            ), za(o, 0, !0) !== 0) break e;
            $n = t, o.timeoutHandle = V1(
              m1.bind(
                null,
                o,
                i,
                Rt,
                So,
                cc,
                t,
                Xt,
                Gr,
                Rl,
                cr,
                m,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          m1(
            o,
            i,
            Rt,
            So,
            cc,
            t,
            Xt,
            Gr,
            Rl,
            cr,
            m,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    bn(e);
  }
  function m1(e, t, i, o, c, m, b, k, N, q, X, W, F, $) {
    if (e.timeoutHandle = -1, W = t.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: An
      }, i1(
        t,
        m,
        W
      );
      var ce = (m & 62914560) === m ? bo - wt() : (m & 4194048) === m ? u1 - wt() : 0;
      if (ce = F4(
        W,
        ce
      ), ce !== null) {
        $n = m, e.cancelPendingCommit = ce(
          S1.bind(
            null,
            e,
            t,
            m,
            i,
            o,
            c,
            b,
            k,
            N,
            X,
            W,
            null,
            F,
            $
          )
        ), hr(e, m, b, !q);
        return;
      }
    }
    S1(
      e,
      t,
      m,
      i,
      o,
      c,
      b,
      k,
      N
    );
  }
  function l4(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var c = i[o], m = c.getSnapshot;
          c = c.value;
          try {
            if (!Ft(m(), c)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = t.child, t.subtreeFlags & 16384 && i !== null)
        i.return = t, t = i;
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
  function hr(e, t, i, o) {
    t &= ~uc, t &= ~Gr, e.suspendedLanes |= t, e.pingedLanes &= ~t, o && (e.warmLanes |= t), o = e.expirationTimes;
    for (var c = t; 0 < c; ) {
      var m = 31 - Ye(c), b = 1 << m;
      o[m] = -1, c &= ~b;
    }
    i !== 0 && Cd(e, i, t);
  }
  function ko() {
    return (He & 6) === 0 ? ($i(0), !1) : !0;
  }
  function hc() {
    if (Ne !== null) {
      if (Ie === 0)
        var e = Ne.return;
      else
        e = Ne, On = Lr = null, zu(e), Nl = null, ji = 0, e = Ne;
      for (; e !== null; )
        $h(e.alternate, e), e = e.return;
      Ne = null;
    }
  }
  function Ul(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, w4(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), $n = 0, hc(), Xe = e, Ne = i = _n(e.current, null), _e = t, Ie = 0, Yt = null, cr = !1, Dl = ui(e, t), sc = !1, Rl = Xt = uc = Gr = fr = nt = 0, Rt = Fi = null, cc = !1, (t & 8) !== 0 && (t |= t & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= t; 0 < o; ) {
        var c = 31 - Ye(o), m = 1 << c;
        t |= e[c], o &= ~m;
      }
    return Vn = t, Fa(), i;
  }
  function h1(e, t) {
    ke = null, B.H = Di, t === jl || t === Za ? (t = zm(), Ie = 3) : t === yu ? (t = zm(), Ie = 4) : Ie = t === Yu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Yt = t, Ne === null && (nt = 1, co(
      e,
      nn(t, e.current)
    ));
  }
  function p1() {
    var e = $t.current;
    return e === null ? !0 : (_e & 4194048) === _e ? on === null : (_e & 62914560) === _e || (_e & 536870912) !== 0 ? e === on : !1;
  }
  function g1() {
    var e = B.H;
    return B.H = Di, e === null ? Di : e;
  }
  function x1() {
    var e = B.A;
    return B.A = n4, e;
  }
  function Co() {
    nt = 4, cr || (_e & 4194048) !== _e && $t.current !== null || (Dl = !0), (fr & 134217727) === 0 && (Gr & 134217727) === 0 || Xe === null || hr(
      Xe,
      _e,
      Xt,
      !1
    );
  }
  function pc(e, t, i) {
    var o = He;
    He |= 2;
    var c = g1(), m = x1();
    (Xe !== e || _e !== t) && (So = null, Ul(e, t)), t = !1;
    var b = nt;
    e: do
      try {
        if (Ie !== 0 && Ne !== null) {
          var k = Ne, N = Yt;
          switch (Ie) {
            case 8:
              hc(), b = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $t.current === null && (t = !0);
              var q = Ie;
              if (Ie = 0, Yt = null, Bl(e, k, N, q), i && Dl) {
                b = 0;
                break e;
              }
              break;
            default:
              q = Ie, Ie = 0, Yt = null, Bl(e, k, N, q);
          }
        }
        i4(), b = nt;
        break;
      } catch (X) {
        h1(e, X);
      }
    while (!0);
    return t && e.shellSuspendCounter++, On = Lr = null, He = o, B.H = c, B.A = m, Ne === null && (Xe = null, _e = 0, Fa()), b;
  }
  function i4() {
    for (; Ne !== null; ) y1(Ne);
  }
  function a4(e, t) {
    var i = He;
    He |= 2;
    var o = g1(), c = x1();
    Xe !== e || _e !== t ? (So = null, vo = wt() + 500, Ul(e, t)) : Dl = ui(
      e,
      t
    );
    e: do
      try {
        if (Ie !== 0 && Ne !== null) {
          t = Ne;
          var m = Yt;
          t: switch (Ie) {
            case 1:
              Ie = 0, Yt = null, Bl(e, t, m, 1);
              break;
            case 2:
            case 9:
              if (Tm(m)) {
                Ie = 0, Yt = null, b1(t);
                break;
              }
              t = function() {
                Ie !== 2 && Ie !== 9 || Xe !== e || (Ie = 7), bn(e);
              }, m.then(t, t);
              break e;
            case 3:
              Ie = 7;
              break e;
            case 4:
              Ie = 5;
              break e;
            case 7:
              Tm(m) ? (Ie = 0, Yt = null, b1(t)) : (Ie = 0, Yt = null, Bl(e, t, m, 7));
              break;
            case 5:
              var b = null;
              switch (Ne.tag) {
                case 26:
                  b = Ne.memoizedState;
                case 5:
                case 27:
                  var k = Ne;
                  if (b ? l0(b) : k.stateNode.complete) {
                    Ie = 0, Yt = null;
                    var N = k.sibling;
                    if (N !== null) Ne = N;
                    else {
                      var q = k.return;
                      q !== null ? (Ne = q, wo(q)) : Ne = null;
                    }
                    break t;
                  }
              }
              Ie = 0, Yt = null, Bl(e, t, m, 5);
              break;
            case 6:
              Ie = 0, Yt = null, Bl(e, t, m, 6);
              break;
            case 8:
              hc(), nt = 6;
              break e;
            default:
              throw Error(a(462));
          }
        }
        o4();
        break;
      } catch (X) {
        h1(e, X);
      }
    while (!0);
    return On = Lr = null, B.H = o, B.A = c, He = i, Ne !== null ? 0 : (Xe = null, _e = 0, Fa(), nt);
  }
  function o4() {
    for (; Ne !== null && !Ts(); )
      y1(Ne);
  }
  function y1(e) {
    var t = Fh(e.alternate, e, Vn);
    e.memoizedProps = e.pendingProps, t === null ? wo(e) : Ne = t;
  }
  function b1(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Lh(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          _e
        );
        break;
      case 11:
        t = Lh(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          _e
        );
        break;
      case 5:
        zu(t);
      default:
        $h(i, t), t = Ne = xm(t, Vn), t = Fh(i, t, Vn);
    }
    e.memoizedProps = e.pendingProps, t === null ? wo(e) : Ne = t;
  }
  function Bl(e, t, i, o) {
    On = Lr = null, zu(t), Nl = null, ji = 0;
    var c = t.return;
    try {
      if (Px(
        e,
        c,
        t,
        i,
        _e
      )) {
        nt = 1, co(
          e,
          nn(i, e.current)
        ), Ne = null;
        return;
      }
    } catch (m) {
      if (c !== null) throw Ne = c, m;
      nt = 1, co(
        e,
        nn(i, e.current)
      ), Ne = null;
      return;
    }
    t.flags & 32768 ? (Oe || o === 1 ? e = !0 : Dl || (_e & 536870912) !== 0 ? e = !1 : (cr = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = $t.current, o !== null && o.tag === 13 && (o.flags |= 16384))), v1(t, e)) : wo(t);
  }
  function wo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        v1(
          t,
          cr
        );
        return;
      }
      e = t.return;
      var i = Wx(
        t.alternate,
        t,
        Vn
      );
      if (i !== null) {
        Ne = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    nt === 0 && (nt = 5);
  }
  function v1(e, t) {
    do {
      var i = Jx(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ne = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ne = e;
        return;
      }
      Ne = e = i;
    } while (e !== null);
    nt = 6, Ne = null;
  }
  function S1(e, t, i, o, c, m, b, k, N) {
    e.cancelPendingCommit = null;
    do
      Eo();
    while (ft !== 0);
    if ((He & 6) !== 0) throw Error(a(327));
    if (t !== null) {
      if (t === e.current) throw Error(a(177));
      if (m = t.lanes | t.childLanes, m |= ru, q2(
        e,
        i,
        m,
        b,
        k,
        N
      ), e === Xe && (Ne = Xe = null, _e = 0), Ll = t, mr = e, $n = i, fc = m, dc = c, c1 = o, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, f4(ve, function() {
        return j1(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || o) {
        o = B.T, B.T = null, c = Y.p, Y.p = 2, b = He, He |= 4;
        try {
          e4(e, t, i);
        } finally {
          He = b, Y.p = c, B.T = o;
        }
      }
      ft = 1, k1(), C1(), w1();
    }
  }
  function k1() {
    if (ft === 1) {
      ft = 0;
      var e = mr, t = Ll, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = B.T, B.T = null;
        var o = Y.p;
        Y.p = 2;
        var c = He;
        He |= 4;
        try {
          n1(t, e);
          var m = Nc, b = sm(e.containerInfo), k = m.focusedElem, N = m.selectionRange;
          if (b !== k && k && k.ownerDocument && om(
            k.ownerDocument.documentElement,
            k
          )) {
            if (N !== null && Ws(k)) {
              var q = N.start, X = N.end;
              if (X === void 0 && (X = q), "selectionStart" in k)
                k.selectionStart = q, k.selectionEnd = Math.min(
                  X,
                  k.value.length
                );
              else {
                var W = k.ownerDocument || document, F = W && W.defaultView || window;
                if (F.getSelection) {
                  var $ = F.getSelection(), ce = k.textContent.length, be = Math.min(N.start, ce), Ge = N.end === void 0 ? be : Math.min(N.end, ce);
                  !$.extend && be > Ge && (b = Ge, Ge = be, be = b);
                  var D = am(
                    k,
                    be
                  ), z = am(
                    k,
                    Ge
                  );
                  if (D && z && ($.rangeCount !== 1 || $.anchorNode !== D.node || $.anchorOffset !== D.offset || $.focusNode !== z.node || $.focusOffset !== z.offset)) {
                    var H = W.createRange();
                    H.setStart(D.node, D.offset), $.removeAllRanges(), be > Ge ? ($.addRange(H), $.extend(z.node, z.offset)) : (H.setEnd(z.node, z.offset), $.addRange(H));
                  }
                }
              }
            }
            for (W = [], $ = k; $ = $.parentNode; )
              $.nodeType === 1 && W.push({
                element: $,
                left: $.scrollLeft,
                top: $.scrollTop
              });
            for (typeof k.focus == "function" && k.focus(), k = 0; k < W.length; k++) {
              var K = W[k];
              K.element.scrollLeft = K.left, K.element.scrollTop = K.top;
            }
          }
          Uo = !!jc, Nc = jc = null;
        } finally {
          He = c, Y.p = o, B.T = i;
        }
      }
      e.current = t, ft = 2;
    }
  }
  function C1() {
    if (ft === 2) {
      ft = 0;
      var e = mr, t = Ll, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = B.T, B.T = null;
        var o = Y.p;
        Y.p = 2;
        var c = He;
        He |= 4;
        try {
          Kh(e, t.alternate, t);
        } finally {
          He = c, Y.p = o, B.T = i;
        }
      }
      ft = 3;
    }
  }
  function w1() {
    if (ft === 4 || ft === 3) {
      ft = 0, As();
      var e = mr, t = Ll, i = $n, o = c1;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ft = 5 : (ft = 0, Ll = mr = null, E1(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (dr = null), Os(i), t = t.stateNode, ct && typeof ct.onCommitFiberRoot == "function")
        try {
          ct.onCommitFiberRoot(
            Et,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        t = B.T, c = Y.p, Y.p = 2, B.T = null;
        try {
          for (var m = e.onRecoverableError, b = 0; b < o.length; b++) {
            var k = o[b];
            m(k.value, {
              componentStack: k.stack
            });
          }
        } finally {
          B.T = t, Y.p = c;
        }
      }
      ($n & 3) !== 0 && Eo(), bn(e), c = e.pendingLanes, (i & 261930) !== 0 && (c & 42) !== 0 ? e === mc ? Vi++ : (Vi = 0, mc = e) : Vi = 0, $i(0);
    }
  }
  function E1(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, wi(t)));
  }
  function Eo() {
    return k1(), C1(), w1(), j1();
  }
  function j1() {
    if (ft !== 5) return !1;
    var e = mr, t = fc;
    fc = 0;
    var i = Os($n), o = B.T, c = Y.p;
    try {
      Y.p = 32 > i ? 32 : i, B.T = null, i = dc, dc = null;
      var m = mr, b = $n;
      if (ft = 0, Ll = mr = null, $n = 0, (He & 6) !== 0) throw Error(a(331));
      var k = He;
      if (He |= 4, o1(m.current), l1(
        m,
        m.current,
        b,
        i
      ), He = k, $i(0, !1), ct && typeof ct.onPostCommitFiberRoot == "function")
        try {
          ct.onPostCommitFiberRoot(Et, m);
        } catch {
        }
      return !0;
    } finally {
      Y.p = c, B.T = o, E1(e, t);
    }
  }
  function N1(e, t, i) {
    t = nn(i, t), t = Gu(e.stateNode, t, 2), e = ar(e, t, 2), e !== null && (ci(e, 2), bn(e));
  }
  function Fe(e, t, i) {
    if (e.tag === 3)
      N1(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          N1(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var o = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (dr === null || !dr.has(o))) {
            e = nn(i, e), i = Th(2), o = ar(t, i, 2), o !== null && (Ah(
              i,
              o,
              t,
              e
            ), ci(o, 2), bn(o));
            break;
          }
        }
        t = t.return;
      }
  }
  function gc(e, t, i) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new r4();
      var c = /* @__PURE__ */ new Set();
      o.set(t, c);
    } else
      c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c));
    c.has(i) || (sc = !0, c.add(i), e = s4.bind(null, e, t, i), t.then(e, e));
  }
  function s4(e, t, i) {
    var o = e.pingCache;
    o !== null && o.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Xe === e && (_e & i) === i && (nt === 4 || nt === 3 && (_e & 62914560) === _e && 300 > wt() - bo ? (He & 2) === 0 && Ul(e, 0) : uc |= i, Rl === _e && (Rl = 0)), bn(e);
  }
  function T1(e, t) {
    t === 0 && (t = kd()), e = Or(e, t), e !== null && (ci(e, t), bn(e));
  }
  function u4(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), T1(e, i);
  }
  function c4(e, t) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var o = e.stateNode, c = e.memoizedState;
        c !== null && (i = c.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      case 22:
        o = e.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    o !== null && o.delete(t), T1(e, i);
  }
  function f4(e, t) {
    return il(e, t);
  }
  var jo = null, Hl = null, xc = !1, No = !1, yc = !1, pr = 0;
  function bn(e) {
    e !== Hl && e.next === null && (Hl === null ? jo = Hl = e : Hl = Hl.next = e), No = !0, xc || (xc = !0, m4());
  }
  function $i(e, t) {
    if (!yc && No) {
      yc = !0;
      do
        for (var i = !1, o = jo; o !== null; ) {
          if (e !== 0) {
            var c = o.pendingLanes;
            if (c === 0) var m = 0;
            else {
              var b = o.suspendedLanes, k = o.pingedLanes;
              m = (1 << 31 - Ye(42 | e) + 1) - 1, m &= c & ~(b & ~k), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (i = !0, M1(o, m));
          } else
            m = _e, m = za(
              o,
              o === Xe ? m : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (m & 3) === 0 || ui(o, m) || (i = !0, M1(o, m));
          o = o.next;
        }
      while (i);
      yc = !1;
    }
  }
  function d4() {
    A1();
  }
  function A1() {
    No = xc = !1;
    var e = 0;
    pr !== 0 && C4() && (e = pr);
    for (var t = wt(), i = null, o = jo; o !== null; ) {
      var c = o.next, m = z1(o, t);
      m === 0 ? (o.next = null, i === null ? jo = c : i.next = c, c === null && (Hl = i)) : (i = o, (e !== 0 || (m & 3) !== 0) && (No = !0)), o = c;
    }
    ft !== 0 && ft !== 5 || $i(e), pr !== 0 && (pr = 0);
  }
  function z1(e, t) {
    for (var i = e.suspendedLanes, o = e.pingedLanes, c = e.expirationTimes, m = e.pendingLanes & -62914561; 0 < m; ) {
      var b = 31 - Ye(m), k = 1 << b, N = c[b];
      N === -1 ? ((k & i) === 0 || (k & o) !== 0) && (c[b] = H2(k, t)) : N <= t && (e.expiredLanes |= k), m &= ~k;
    }
    if (t = Xe, i = _e, i = za(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, i === 0 || e === t && (Ie === 2 || Ie === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && si(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ui(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (o !== null && si(o), Os(i)) {
        case 2:
        case 8:
          i = oe;
          break;
        case 32:
          i = ve;
          break;
        case 268435456:
          i = qe;
          break;
        default:
          i = ve;
      }
      return o = _1.bind(null, e), i = il(i, o), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return o !== null && o !== null && si(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function _1(e, t) {
    if (ft !== 0 && ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Eo() && e.callbackNode !== i)
      return null;
    var o = _e;
    return o = za(
      e,
      e === Xe ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (d1(e, o, t), z1(e, wt()), e.callbackNode != null && e.callbackNode === i ? _1.bind(null, e) : null);
  }
  function M1(e, t) {
    if (Eo()) return null;
    d1(e, t, !0);
  }
  function m4() {
    E4(function() {
      (He & 6) !== 0 ? il(
        Z,
        d4
      ) : A1();
    });
  }
  function bc() {
    if (pr === 0) {
      var e = wl;
      e === 0 && (e = Na, Na <<= 1, (Na & 261888) === 0 && (Na = 256)), pr = e;
    }
    return pr;
  }
  function O1(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Da("" + e);
  }
  function D1(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function h4(e, t, i, o, c) {
    if (t === "submit" && i && i.stateNode === c) {
      var m = O1(
        (c[zt] || null).action
      ), b = o.submitter;
      b && (t = (t = b[zt] || null) ? O1(t.formAction) : b.getAttribute("formAction"), t !== null && (m = t, b = null));
      var k = new Ba(
        "action",
        "action",
        null,
        o,
        c
      );
      e.push({
        event: k,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (pr !== 0) {
                  var N = b ? D1(c, b) : new FormData(c);
                  Hu(
                    i,
                    {
                      pending: !0,
                      data: N,
                      method: c.method,
                      action: m
                    },
                    null,
                    N
                  );
                }
              } else
                typeof m == "function" && (k.preventDefault(), N = b ? D1(c, b) : new FormData(c), Hu(
                  i,
                  {
                    pending: !0,
                    data: N,
                    method: c.method,
                    action: m
                  },
                  m,
                  N
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var vc = 0; vc < nu.length; vc++) {
    var Sc = nu[vc], p4 = Sc.toLowerCase(), g4 = Sc[0].toUpperCase() + Sc.slice(1);
    dn(
      p4,
      "on" + g4
    );
  }
  dn(fm, "onAnimationEnd"), dn(dm, "onAnimationIteration"), dn(mm, "onAnimationStart"), dn("dblclick", "onDoubleClick"), dn("focusin", "onFocus"), dn("focusout", "onBlur"), dn(Mx, "onTransitionRun"), dn(Ox, "onTransitionStart"), dn(Dx, "onTransitionCancel"), dn(hm, "onTransitionEnd"), cl("onMouseEnter", ["mouseout", "mouseover"]), cl("onMouseLeave", ["mouseout", "mouseover"]), cl("onPointerEnter", ["pointerout", "pointerover"]), cl("onPointerLeave", ["pointerout", "pointerover"]), Ar(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ar(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ar("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ar(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ar(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ar(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Gi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), x4 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Gi)
  );
  function R1(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var o = e[i], c = o.event;
      o = o.listeners;
      e: {
        var m = void 0;
        if (t)
          for (var b = o.length - 1; 0 <= b; b--) {
            var k = o[b], N = k.instance, q = k.currentTarget;
            if (k = k.listener, N !== m && c.isPropagationStopped())
              break e;
            m = k, c.currentTarget = q;
            try {
              m(c);
            } catch (X) {
              Ia(X);
            }
            c.currentTarget = null, m = N;
          }
        else
          for (b = 0; b < o.length; b++) {
            if (k = o[b], N = k.instance, q = k.currentTarget, k = k.listener, N !== m && c.isPropagationStopped())
              break e;
            m = k, c.currentTarget = q;
            try {
              m(c);
            } catch (X) {
              Ia(X);
            }
            c.currentTarget = null, m = N;
          }
      }
    }
  }
  function Te(e, t) {
    var i = t[Ds];
    i === void 0 && (i = t[Ds] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    i.has(o) || (L1(t, e, 2, !1), i.add(o));
  }
  function kc(e, t, i) {
    var o = 0;
    t && (o |= 4), L1(
      i,
      e,
      o,
      t
    );
  }
  var To = "_reactListening" + Math.random().toString(36).slice(2);
  function Cc(e) {
    if (!e[To]) {
      e[To] = !0, Ad.forEach(function(i) {
        i !== "selectionchange" && (x4.has(i) || kc(i, !1, e), kc(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[To] || (t[To] = !0, kc("selectionchange", !1, t));
    }
  }
  function L1(e, t, i, o) {
    switch (f0(t)) {
      case 2:
        var c = G4;
        break;
      case 8:
        c = Y4;
        break;
      default:
        c = Bc;
    }
    i = c.bind(
      null,
      t,
      i,
      e
    ), c = void 0, !Vs || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (c = !0), o ? c !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: c
    }) : e.addEventListener(t, i, !0) : c !== void 0 ? e.addEventListener(t, i, {
      passive: c
    }) : e.addEventListener(t, i, !1);
  }
  function wc(e, t, i, o, c) {
    var m = o;
    if ((t & 1) === 0 && (t & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var b = o.tag;
        if (b === 3 || b === 4) {
          var k = o.stateNode.containerInfo;
          if (k === c) break;
          if (b === 4)
            for (b = o.return; b !== null; ) {
              var N = b.tag;
              if ((N === 3 || N === 4) && b.stateNode.containerInfo === c)
                return;
              b = b.return;
            }
          for (; k !== null; ) {
            if (b = ol(k), b === null) return;
            if (N = b.tag, N === 5 || N === 6 || N === 26 || N === 27) {
              o = m = b;
              continue e;
            }
            k = k.parentNode;
          }
        }
        o = o.return;
      }
    Id(function() {
      var q = m, X = Is(i), W = [];
      e: {
        var F = pm.get(e);
        if (F !== void 0) {
          var $ = Ba, ce = e;
          switch (e) {
            case "keypress":
              if (La(i) === 0) break e;
            case "keydown":
            case "keyup":
              $ = cx;
              break;
            case "focusin":
              ce = "focus", $ = Xs;
              break;
            case "focusout":
              ce = "blur", $ = Xs;
              break;
            case "beforeblur":
            case "afterblur":
              $ = Xs;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              $ = $d;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              $ = W2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              $ = mx;
              break;
            case fm:
            case dm:
            case mm:
              $ = tx;
              break;
            case hm:
              $ = px;
              break;
            case "scroll":
            case "scrollend":
              $ = Z2;
              break;
            case "wheel":
              $ = xx;
              break;
            case "copy":
            case "cut":
            case "paste":
              $ = rx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              $ = Yd;
              break;
            case "toggle":
            case "beforetoggle":
              $ = bx;
          }
          var be = (t & 4) !== 0, Ge = !be && (e === "scroll" || e === "scrollend"), D = be ? F !== null ? F + "Capture" : null : F;
          be = [];
          for (var z = q, H; z !== null; ) {
            var K = z;
            if (H = K.stateNode, K = K.tag, K !== 5 && K !== 26 && K !== 27 || H === null || D === null || (K = mi(z, D), K != null && be.push(
              Yi(z, K, H)
            )), Ge) break;
            z = z.return;
          }
          0 < be.length && (F = new $(
            F,
            ce,
            null,
            i,
            X
          ), W.push({ event: F, listeners: be }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (F = e === "mouseover" || e === "pointerover", $ = e === "mouseout" || e === "pointerout", F && i !== qs && (ce = i.relatedTarget || i.fromElement) && (ol(ce) || ce[al]))
            break e;
          if (($ || F) && (F = X.window === X ? X : (F = X.ownerDocument) ? F.defaultView || F.parentWindow : window, $ ? (ce = i.relatedTarget || i.toElement, $ = q, ce = ce ? ol(ce) : null, ce !== null && (Ge = u(ce), be = ce.tag, ce !== Ge || be !== 5 && be !== 27 && be !== 6) && (ce = null)) : ($ = null, ce = q), $ !== ce)) {
            if (be = $d, K = "onMouseLeave", D = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (be = Yd, K = "onPointerLeave", D = "onPointerEnter", z = "pointer"), Ge = $ == null ? F : di($), H = ce == null ? F : di(ce), F = new be(
              K,
              z + "leave",
              $,
              i,
              X
            ), F.target = Ge, F.relatedTarget = H, K = null, ol(X) === q && (be = new be(
              D,
              z + "enter",
              ce,
              i,
              X
            ), be.target = H, be.relatedTarget = Ge, K = be), Ge = K, $ && ce)
              t: {
                for (be = y4, D = $, z = ce, H = 0, K = D; K; K = be(K))
                  H++;
                K = 0;
                for (var pe = z; pe; pe = be(pe))
                  K++;
                for (; 0 < H - K; )
                  D = be(D), H--;
                for (; 0 < K - H; )
                  z = be(z), K--;
                for (; H--; ) {
                  if (D === z || z !== null && D === z.alternate) {
                    be = D;
                    break t;
                  }
                  D = be(D), z = be(z);
                }
                be = null;
              }
            else be = null;
            $ !== null && U1(
              W,
              F,
              $,
              be,
              !1
            ), ce !== null && Ge !== null && U1(
              W,
              Ge,
              ce,
              be,
              !0
            );
          }
        }
        e: {
          if (F = q ? di(q) : window, $ = F.nodeName && F.nodeName.toLowerCase(), $ === "select" || $ === "input" && F.type === "file")
            var Ue = em;
          else if (Wd(F))
            if (tm)
              Ue = Ax;
            else {
              Ue = Nx;
              var de = jx;
            }
          else
            $ = F.nodeName, !$ || $.toLowerCase() !== "input" || F.type !== "checkbox" && F.type !== "radio" ? q && Hs(q.elementType) && (Ue = em) : Ue = Tx;
          if (Ue && (Ue = Ue(e, q))) {
            Jd(
              W,
              Ue,
              i,
              X
            );
            break e;
          }
          de && de(e, F, q), e === "focusout" && q && F.type === "number" && q.memoizedProps.value != null && Bs(F, "number", F.value);
        }
        switch (de = q ? di(q) : window, e) {
          case "focusin":
            (Wd(de) || de.contentEditable === "true") && (gl = de, Js = q, Si = null);
            break;
          case "focusout":
            Si = Js = gl = null;
            break;
          case "mousedown":
            eu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            eu = !1, um(W, i, X);
            break;
          case "selectionchange":
            if (_x) break;
          case "keydown":
          case "keyup":
            um(W, i, X);
        }
        var Ce;
        if (Ps)
          e: {
            switch (e) {
              case "compositionstart":
                var Me = "onCompositionStart";
                break e;
              case "compositionend":
                Me = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Me = "onCompositionUpdate";
                break e;
            }
            Me = void 0;
          }
        else
          pl ? Zd(e, i) && (Me = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Me = "onCompositionStart");
        Me && (Xd && i.locale !== "ko" && (pl || Me !== "onCompositionStart" ? Me === "onCompositionEnd" && pl && (Ce = Fd()) : (Jn = X, $s = "value" in Jn ? Jn.value : Jn.textContent, pl = !0)), de = Ao(q, Me), 0 < de.length && (Me = new Gd(
          Me,
          e,
          null,
          i,
          X
        ), W.push({ event: Me, listeners: de }), Ce ? Me.data = Ce : (Ce = Kd(i), Ce !== null && (Me.data = Ce)))), (Ce = Sx ? kx(e, i) : Cx(e, i)) && (Me = Ao(q, "onBeforeInput"), 0 < Me.length && (de = new Gd(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          X
        ), W.push({
          event: de,
          listeners: Me
        }), de.data = Ce)), h4(
          W,
          e,
          q,
          i,
          X
        );
      }
      R1(W, t);
    });
  }
  function Yi(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function Ao(e, t) {
    for (var i = t + "Capture", o = []; e !== null; ) {
      var c = e, m = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || m === null || (c = mi(e, i), c != null && o.unshift(
        Yi(e, c, m)
      ), c = mi(e, t), c != null && o.push(
        Yi(e, c, m)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function y4(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function U1(e, t, i, o, c) {
    for (var m = t._reactName, b = []; i !== null && i !== o; ) {
      var k = i, N = k.alternate, q = k.stateNode;
      if (k = k.tag, N !== null && N === o) break;
      k !== 5 && k !== 26 && k !== 27 || q === null || (N = q, c ? (q = mi(i, m), q != null && b.unshift(
        Yi(i, q, N)
      )) : c || (q = mi(i, m), q != null && b.push(
        Yi(i, q, N)
      ))), i = i.return;
    }
    b.length !== 0 && e.push({ event: t, listeners: b });
  }
  var b4 = /\r\n?/g, v4 = /\u0000|\uFFFD/g;
  function B1(e) {
    return (typeof e == "string" ? e : "" + e).replace(b4, `
`).replace(v4, "");
  }
  function H1(e, t) {
    return t = B1(t), B1(e) === t;
  }
  function $e(e, t, i, o, c, m) {
    switch (i) {
      case "children":
        typeof o == "string" ? t === "body" || t === "textarea" && o === "" || dl(e, o) : (typeof o == "number" || typeof o == "bigint") && t !== "body" && dl(e, "" + o);
        break;
      case "className":
        Ma(e, "class", o);
        break;
      case "tabIndex":
        Ma(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ma(e, i, o);
        break;
      case "style":
        Hd(e, o, m);
        break;
      case "data":
        if (t !== "object") {
          Ma(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(i);
          break;
        }
        o = Da("" + o), e.setAttribute(i, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof m == "function" && (i === "formAction" ? (t !== "input" && $e(e, t, "name", c.name, c, null), $e(
            e,
            t,
            "formEncType",
            c.formEncType,
            c,
            null
          ), $e(
            e,
            t,
            "formMethod",
            c.formMethod,
            c,
            null
          ), $e(
            e,
            t,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : ($e(e, t, "encType", c.encType, c, null), $e(e, t, "method", c.method, c, null), $e(e, t, "target", c.target, c, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(i);
          break;
        }
        o = Da("" + o), e.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (e.onclick = An);
        break;
      case "onScroll":
        o != null && Te("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Te("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(a(61));
          if (i = o.__html, i != null) {
            if (c.children != null) throw Error(a(60));
            e.innerHTML = i;
          }
        }
        break;
      case "multiple":
        e.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        e.muted = o && typeof o != "function" && typeof o != "symbol";
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
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        i = Da("" + o), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          i
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
        o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, "" + o) : e.removeAttribute(i);
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
        o && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        o === !0 ? e.setAttribute(i, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, o) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? e.setAttribute(i, o) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? e.removeAttribute(i) : e.setAttribute(i, o);
        break;
      case "popover":
        Te("beforetoggle", e), Te("toggle", e), _a(e, "popover", o);
        break;
      case "xlinkActuate":
        Tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Tn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Tn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Tn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Tn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        _a(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Q2.get(i) || i, _a(e, i, o));
    }
  }
  function Ec(e, t, i, o, c, m) {
    switch (i) {
      case "style":
        Hd(e, o, m);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(a(61));
          if (i = o.__html, i != null) {
            if (c.children != null) throw Error(a(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof o == "string" ? dl(e, o) : (typeof o == "number" || typeof o == "bigint") && dl(e, "" + o);
        break;
      case "onScroll":
        o != null && Te("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Te("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = An);
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
        if (!zd.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (c = i.endsWith("Capture"), t = i.slice(2, c ? i.length - 7 : void 0), m = e[zt] || null, m = m != null ? m[i] : null, typeof m == "function" && e.removeEventListener(t, m, c), typeof o == "function")) {
              typeof m != "function" && m !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, o, c);
              break e;
            }
            i in e ? e[i] = o : o === !0 ? e.setAttribute(i, "") : _a(e, i, o);
          }
    }
  }
  function yt(e, t, i) {
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
        Te("error", e), Te("load", e);
        var o = !1, c = !1, m;
        for (m in i)
          if (i.hasOwnProperty(m)) {
            var b = i[m];
            if (b != null)
              switch (m) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, t));
                default:
                  $e(e, t, m, b, i, null);
              }
          }
        c && $e(e, t, "srcSet", i.srcSet, i, null), o && $e(e, t, "src", i.src, i, null);
        return;
      case "input":
        Te("invalid", e);
        var k = m = b = c = null, N = null, q = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var X = i[o];
            if (X != null)
              switch (o) {
                case "name":
                  c = X;
                  break;
                case "type":
                  b = X;
                  break;
                case "checked":
                  N = X;
                  break;
                case "defaultChecked":
                  q = X;
                  break;
                case "value":
                  m = X;
                  break;
                case "defaultValue":
                  k = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null)
                    throw Error(a(137, t));
                  break;
                default:
                  $e(e, t, o, X, i, null);
              }
          }
        Rd(
          e,
          m,
          k,
          N,
          q,
          b,
          c,
          !1
        );
        return;
      case "select":
        Te("invalid", e), o = b = m = null;
        for (c in i)
          if (i.hasOwnProperty(c) && (k = i[c], k != null))
            switch (c) {
              case "value":
                m = k;
                break;
              case "defaultValue":
                b = k;
                break;
              case "multiple":
                o = k;
              default:
                $e(e, t, c, k, i, null);
            }
        t = m, i = b, e.multiple = !!o, t != null ? fl(e, !!o, t, !1) : i != null && fl(e, !!o, i, !0);
        return;
      case "textarea":
        Te("invalid", e), m = c = o = null;
        for (b in i)
          if (i.hasOwnProperty(b) && (k = i[b], k != null))
            switch (b) {
              case "value":
                o = k;
                break;
              case "defaultValue":
                c = k;
                break;
              case "children":
                m = k;
                break;
              case "dangerouslySetInnerHTML":
                if (k != null) throw Error(a(91));
                break;
              default:
                $e(e, t, b, k, i, null);
            }
        Ud(e, o, c, m);
        return;
      case "option":
        for (N in i)
          if (i.hasOwnProperty(N) && (o = i[N], o != null))
            switch (N) {
              case "selected":
                e.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                $e(e, t, N, o, i, null);
            }
        return;
      case "dialog":
        Te("beforetoggle", e), Te("toggle", e), Te("cancel", e), Te("close", e);
        break;
      case "iframe":
      case "object":
        Te("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < Gi.length; o++)
          Te(Gi[o], e);
        break;
      case "image":
        Te("error", e), Te("load", e);
        break;
      case "details":
        Te("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Te("error", e), Te("load", e);
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
        for (q in i)
          if (i.hasOwnProperty(q) && (o = i[q], o != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, t));
              default:
                $e(e, t, q, o, i, null);
            }
        return;
      default:
        if (Hs(t)) {
          for (X in i)
            i.hasOwnProperty(X) && (o = i[X], o !== void 0 && Ec(
              e,
              t,
              X,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (k in i)
      i.hasOwnProperty(k) && (o = i[k], o != null && $e(e, t, k, o, i, null));
  }
  function S4(e, t, i, o) {
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
        var c = null, m = null, b = null, k = null, N = null, q = null, X = null;
        for ($ in i) {
          var W = i[$];
          if (i.hasOwnProperty($) && W != null)
            switch ($) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                N = W;
              default:
                o.hasOwnProperty($) || $e(e, t, $, null, o, W);
            }
        }
        for (var F in o) {
          var $ = o[F];
          if (W = i[F], o.hasOwnProperty(F) && ($ != null || W != null))
            switch (F) {
              case "type":
                m = $;
                break;
              case "name":
                c = $;
                break;
              case "checked":
                q = $;
                break;
              case "defaultChecked":
                X = $;
                break;
              case "value":
                b = $;
                break;
              case "defaultValue":
                k = $;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(a(137, t));
                break;
              default:
                $ !== W && $e(
                  e,
                  t,
                  F,
                  $,
                  o,
                  W
                );
            }
        }
        Us(
          e,
          b,
          k,
          N,
          q,
          X,
          m,
          c
        );
        return;
      case "select":
        $ = b = k = F = null;
        for (m in i)
          if (N = i[m], i.hasOwnProperty(m) && N != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                $ = N;
              default:
                o.hasOwnProperty(m) || $e(
                  e,
                  t,
                  m,
                  null,
                  o,
                  N
                );
            }
        for (c in o)
          if (m = o[c], N = i[c], o.hasOwnProperty(c) && (m != null || N != null))
            switch (c) {
              case "value":
                F = m;
                break;
              case "defaultValue":
                k = m;
                break;
              case "multiple":
                b = m;
              default:
                m !== N && $e(
                  e,
                  t,
                  c,
                  m,
                  o,
                  N
                );
            }
        t = k, i = b, o = $, F != null ? fl(e, !!i, F, !1) : !!o != !!i && (t != null ? fl(e, !!i, t, !0) : fl(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        $ = F = null;
        for (k in i)
          if (c = i[k], i.hasOwnProperty(k) && c != null && !o.hasOwnProperty(k))
            switch (k) {
              case "value":
                break;
              case "children":
                break;
              default:
                $e(e, t, k, null, o, c);
            }
        for (b in o)
          if (c = o[b], m = i[b], o.hasOwnProperty(b) && (c != null || m != null))
            switch (b) {
              case "value":
                F = c;
                break;
              case "defaultValue":
                $ = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(a(91));
                break;
              default:
                c !== m && $e(e, t, b, c, o, m);
            }
        Ld(e, F, $);
        return;
      case "option":
        for (var ce in i)
          if (F = i[ce], i.hasOwnProperty(ce) && F != null && !o.hasOwnProperty(ce))
            switch (ce) {
              case "selected":
                e.selected = !1;
                break;
              default:
                $e(
                  e,
                  t,
                  ce,
                  null,
                  o,
                  F
                );
            }
        for (N in o)
          if (F = o[N], $ = i[N], o.hasOwnProperty(N) && F !== $ && (F != null || $ != null))
            switch (N) {
              case "selected":
                e.selected = F && typeof F != "function" && typeof F != "symbol";
                break;
              default:
                $e(
                  e,
                  t,
                  N,
                  F,
                  o,
                  $
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
        for (var be in i)
          F = i[be], i.hasOwnProperty(be) && F != null && !o.hasOwnProperty(be) && $e(e, t, be, null, o, F);
        for (q in o)
          if (F = o[q], $ = i[q], o.hasOwnProperty(q) && F !== $ && (F != null || $ != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (F != null)
                  throw Error(a(137, t));
                break;
              default:
                $e(
                  e,
                  t,
                  q,
                  F,
                  o,
                  $
                );
            }
        return;
      default:
        if (Hs(t)) {
          for (var Ge in i)
            F = i[Ge], i.hasOwnProperty(Ge) && F !== void 0 && !o.hasOwnProperty(Ge) && Ec(
              e,
              t,
              Ge,
              void 0,
              o,
              F
            );
          for (X in o)
            F = o[X], $ = i[X], !o.hasOwnProperty(X) || F === $ || F === void 0 && $ === void 0 || Ec(
              e,
              t,
              X,
              F,
              o,
              $
            );
          return;
        }
    }
    for (var D in i)
      F = i[D], i.hasOwnProperty(D) && F != null && !o.hasOwnProperty(D) && $e(e, t, D, null, o, F);
    for (W in o)
      F = o[W], $ = i[W], !o.hasOwnProperty(W) || F === $ || F == null && $ == null || $e(e, t, W, F, o, $);
  }
  function q1(e) {
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
  function k4() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var c = i[o], m = c.transferSize, b = c.initiatorType, k = c.duration;
        if (m && k && q1(b)) {
          for (b = 0, k = c.responseEnd, o += 1; o < i.length; o++) {
            var N = i[o], q = N.startTime;
            if (q > k) break;
            var X = N.transferSize, W = N.initiatorType;
            X && q1(W) && (N = N.responseEnd, b += X * (N < k ? 1 : (k - q) / (N - q)));
          }
          if (--o, t += 8 * (m + b) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var jc = null, Nc = null;
  function zo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function I1(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function F1(e, t) {
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
  var Ac = null;
  function C4() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ac ? !1 : (Ac = e, !0) : (Ac = null, !1);
  }
  var V1 = typeof setTimeout == "function" ? setTimeout : void 0, w4 = typeof clearTimeout == "function" ? clearTimeout : void 0, $1 = typeof Promise == "function" ? Promise : void 0, E4 = typeof queueMicrotask == "function" ? queueMicrotask : typeof $1 < "u" ? function(e) {
    return $1.resolve(null).then(e).catch(j4);
  } : V1;
  function j4(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function gr(e) {
    return e === "head";
  }
  function G1(e, t) {
    var i = t, o = 0;
    do {
      var c = i.nextSibling;
      if (e.removeChild(i), c && c.nodeType === 8)
        if (i = c.data, i === "/$" || i === "/&") {
          if (o === 0) {
            e.removeChild(c), Vl(t);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          Xi(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Xi(i);
          for (var m = i.firstChild; m; ) {
            var b = m.nextSibling, k = m.nodeName;
            m[fi] || k === "SCRIPT" || k === "STYLE" || k === "LINK" && m.rel.toLowerCase() === "stylesheet" || i.removeChild(m), m = b;
          }
        } else
          i === "body" && Xi(e.ownerDocument.body);
      i = c;
    } while (i);
    Vl(t);
  }
  function Y1(e, t) {
    var i = e;
    e = 0;
    do {
      var o = i.nextSibling;
      if (i.nodeType === 1 ? t ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (t ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), o && o.nodeType === 8)
        if (i = o.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = o;
    } while (i);
  }
  function zc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          zc(i), Rs(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(i);
    }
  }
  function N4(e, t, i, o) {
    for (; e.nodeType === 1; ) {
      var c = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[fi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (m = e.getAttribute("rel"), m === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (m !== c.rel || e.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || e.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (m = e.getAttribute("src"), (m !== (c.src == null ? null : c.src) || e.getAttribute("type") !== (c.type == null ? null : c.type) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && m && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var m = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === m)
          return e;
      } else return e;
      if (e = sn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function T4(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = sn(e.nextSibling), e === null)) return null;
    return e;
  }
  function X1(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = sn(e.nextSibling), e === null)) return null;
    return e;
  }
  function _c(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Mc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function A4(e, t) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || i.readyState !== "loading")
      t();
    else {
      var o = function() {
        t(), i.removeEventListener("DOMContentLoaded", o);
      };
      i.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function sn(e) {
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
  var Oc = null;
  function Q1(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return sn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function P1(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (t === 0) return e;
          t--;
        } else i !== "/$" && i !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Z1(e, t, i) {
    switch (t = zo(i), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(a(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(a(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(a(454));
        return e;
      default:
        throw Error(a(451));
    }
  }
  function Xi(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Rs(e);
  }
  var un = /* @__PURE__ */ new Map(), K1 = /* @__PURE__ */ new Set();
  function _o(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Gn = Y.d;
  Y.d = {
    f: z4,
    r: _4,
    D: M4,
    C: O4,
    L: D4,
    m: R4,
    X: U4,
    S: L4,
    M: B4
  };
  function z4() {
    var e = Gn.f(), t = ko();
    return e || t;
  }
  function _4(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? hh(t) : Gn.r(e);
  }
  var ql = typeof document > "u" ? null : document;
  function W1(e, t, i) {
    var o = ql;
    if (o && typeof t == "string" && t) {
      var c = en(t);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof i == "string" && (c += '[crossorigin="' + i + '"]'), K1.has(c) || (K1.add(c), e = { rel: e, crossOrigin: i, href: t }, o.querySelector(c) === null && (t = o.createElement("link"), yt(t, "link", e), dt(t), o.head.appendChild(t)));
    }
  }
  function M4(e) {
    Gn.D(e), W1("dns-prefetch", e, null);
  }
  function O4(e, t) {
    Gn.C(e, t), W1("preconnect", e, t);
  }
  function D4(e, t, i) {
    Gn.L(e, t, i);
    var o = ql;
    if (o && e && t) {
      var c = 'link[rel="preload"][as="' + en(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (c += '[imagesrcset="' + en(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (c += '[imagesizes="' + en(
        i.imageSizes
      ) + '"]')) : c += '[href="' + en(e) + '"]';
      var m = c;
      switch (t) {
        case "style":
          m = Il(e);
          break;
        case "script":
          m = Fl(e);
      }
      un.has(m) || (e = x(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), un.set(m, e), o.querySelector(c) !== null || t === "style" && o.querySelector(Qi(m)) || t === "script" && o.querySelector(Pi(m)) || (t = o.createElement("link"), yt(t, "link", e), dt(t), o.head.appendChild(t)));
    }
  }
  function R4(e, t) {
    Gn.m(e, t);
    var i = ql;
    if (i && e) {
      var o = t && typeof t.as == "string" ? t.as : "script", c = 'link[rel="modulepreload"][as="' + en(o) + '"][href="' + en(e) + '"]', m = c;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = Fl(e);
      }
      if (!un.has(m) && (e = x({ rel: "modulepreload", href: e }, t), un.set(m, e), i.querySelector(c) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Pi(m)))
              return;
        }
        o = i.createElement("link"), yt(o, "link", e), dt(o), i.head.appendChild(o);
      }
    }
  }
  function L4(e, t, i) {
    Gn.S(e, t, i);
    var o = ql;
    if (o && e) {
      var c = ul(o).hoistableStyles, m = Il(e);
      t = t || "default";
      var b = c.get(m);
      if (!b) {
        var k = { loading: 0, preload: null };
        if (b = o.querySelector(
          Qi(m)
        ))
          k.loading = 5;
        else {
          e = x(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = un.get(m)) && Dc(e, i);
          var N = b = o.createElement("link");
          dt(N), yt(N, "link", e), N._p = new Promise(function(q, X) {
            N.onload = q, N.onerror = X;
          }), N.addEventListener("load", function() {
            k.loading |= 1;
          }), N.addEventListener("error", function() {
            k.loading |= 2;
          }), k.loading |= 4, Mo(b, t, o);
        }
        b = {
          type: "stylesheet",
          instance: b,
          count: 1,
          state: k
        }, c.set(m, b);
      }
    }
  }
  function U4(e, t) {
    Gn.X(e, t);
    var i = ql;
    if (i && e) {
      var o = ul(i).hoistableScripts, c = Fl(e), m = o.get(c);
      m || (m = i.querySelector(Pi(c)), m || (e = x({ src: e, async: !0 }, t), (t = un.get(c)) && Rc(e, t), m = i.createElement("script"), dt(m), yt(m, "link", e), i.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, o.set(c, m));
    }
  }
  function B4(e, t) {
    Gn.M(e, t);
    var i = ql;
    if (i && e) {
      var o = ul(i).hoistableScripts, c = Fl(e), m = o.get(c);
      m || (m = i.querySelector(Pi(c)), m || (e = x({ src: e, async: !0, type: "module" }, t), (t = un.get(c)) && Rc(e, t), m = i.createElement("script"), dt(m), yt(m, "link", e), i.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, o.set(c, m));
    }
  }
  function J1(e, t, i, o) {
    var c = (c = te.current) ? _o(c) : null;
    if (!c) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Il(i.href), i = ul(
          c
        ).hoistableStyles, o = i.get(t), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Il(i.href);
          var m = ul(
            c
          ).hoistableStyles, b = m.get(e);
          if (b || (c = c.ownerDocument || c, b = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(e, b), (m = c.querySelector(
            Qi(e)
          )) && !m._p && (b.instance = m, b.state.loading = 5), un.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, un.set(e, i), m || H4(
            c,
            e,
            i,
            b.state
          ))), t && o === null)
            throw Error(a(528, ""));
          return b;
        }
        if (t && o !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Fl(i), i = ul(
          c
        ).hoistableScripts, o = i.get(t), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, e));
    }
  }
  function Il(e) {
    return 'href="' + en(e) + '"';
  }
  function Qi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function e0(e) {
    return x({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function H4(e, t, i, o) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? o.loading = 1 : (t = e.createElement("link"), o.preload = t, t.addEventListener("load", function() {
      return o.loading |= 1;
    }), t.addEventListener("error", function() {
      return o.loading |= 2;
    }), yt(t, "link", i), dt(t), e.head.appendChild(t));
  }
  function Fl(e) {
    return '[src="' + en(e) + '"]';
  }
  function Pi(e) {
    return "script[async]" + e;
  }
  function t0(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + en(i.href) + '"]'
          );
          if (o)
            return t.instance = o, dt(o), o;
          var c = x({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), dt(o), yt(o, "style", c), Mo(o, i.precedence, e), t.instance = o;
        case "stylesheet":
          c = Il(i.href);
          var m = e.querySelector(
            Qi(c)
          );
          if (m)
            return t.state.loading |= 4, t.instance = m, dt(m), m;
          o = e0(i), (c = un.get(c)) && Dc(o, c), m = (e.ownerDocument || e).createElement("link"), dt(m);
          var b = m;
          return b._p = new Promise(function(k, N) {
            b.onload = k, b.onerror = N;
          }), yt(m, "link", o), t.state.loading |= 4, Mo(m, i.precedence, e), t.instance = m;
        case "script":
          return m = Fl(i.src), (c = e.querySelector(
            Pi(m)
          )) ? (t.instance = c, dt(c), c) : (o = i, (c = un.get(m)) && (o = x({}, i), Rc(o, c)), e = e.ownerDocument || e, c = e.createElement("script"), dt(c), yt(c, "link", o), e.head.appendChild(c), t.instance = c);
        case "void":
          return null;
        default:
          throw Error(a(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (o = t.instance, t.state.loading |= 4, Mo(o, i.precedence, e));
    return t.instance;
  }
  function Mo(e, t, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = o.length ? o[o.length - 1] : null, m = c, b = 0; b < o.length; b++) {
      var k = o[b];
      if (k.dataset.precedence === t) m = k;
      else if (m !== c) break;
    }
    m ? m.parentNode.insertBefore(e, m.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Dc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Rc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Oo = null;
  function n0(e, t, i) {
    if (Oo === null) {
      var o = /* @__PURE__ */ new Map(), c = Oo = /* @__PURE__ */ new Map();
      c.set(i, o);
    } else
      c = Oo, o = c.get(i), o || (o = /* @__PURE__ */ new Map(), c.set(i, o));
    if (o.has(e)) return o;
    for (o.set(e, null), i = i.getElementsByTagName(e), c = 0; c < i.length; c++) {
      var m = i[c];
      if (!(m[fi] || m[ht] || e === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var b = m.getAttribute(t) || "";
        b = e + b;
        var k = o.get(b);
        k ? k.push(m) : o.set(b, [m]);
      }
    }
    return o;
  }
  function r0(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function q4(e, t, i) {
    if (i === 1 || t.itemProp != null) return !1;
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
  function l0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function I4(e, t, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var c = Il(o.href), m = t.querySelector(
          Qi(c)
        );
        if (m) {
          t = m._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Do.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = m, dt(m);
          return;
        }
        m = t.ownerDocument || t, o = e0(o), (c = un.get(c)) && Dc(o, c), m = m.createElement("link"), dt(m);
        var b = m;
        b._p = new Promise(function(k, N) {
          b.onload = k, b.onerror = N;
        }), yt(m, "link", o), i.instance = m;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Do.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Lc = 0;
  function F4(e, t) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var m = e.unsuspend;
          e.unsuspend = null, m();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Lc === 0 && (Lc = 62500 * k4());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend)) {
            var m = e.unsuspend;
            e.unsuspend = null, m();
          }
        },
        (e.imgBytes > Lc ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(c);
      };
    } : null;
  }
  function Do() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ro = null;
  function Lo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ro = /* @__PURE__ */ new Map(), t.forEach(V4, e), Ro = null, Do.call(e));
  }
  function V4(e, t) {
    if (!(t.state.loading & 4)) {
      var i = Ro.get(e);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Ro.set(e, i);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < c.length; m++) {
          var b = c[m];
          (b.nodeName === "LINK" || b.getAttribute("media") !== "not all") && (i.set(b.dataset.precedence, b), o = b);
        }
        o && i.set(null, o);
      }
      c = t.instance, b = c.getAttribute("data-precedence"), m = i.get(b) || o, m === o && i.set(null, c), i.set(b, c), this.count++, o = Do.bind(this), c.addEventListener("load", o), c.addEventListener("error", o), m ? m.parentNode.insertBefore(c, m.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Zi = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: se,
    _currentValue2: se,
    _threadCount: 0
  };
  function $4(e, t, i, o, c, m, b, k, N) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = _s(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = _s(0), this.hiddenUpdates = _s(null), this.identifierPrefix = o, this.onUncaughtError = c, this.onCaughtError = m, this.onRecoverableError = b, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = N, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function i0(e, t, i, o, c, m, b, k, N, q, X, W) {
    return e = new $4(
      e,
      t,
      i,
      b,
      N,
      q,
      X,
      W,
      k
    ), t = 1, m === !0 && (t |= 24), m = Vt(3, null, null, t), e.current = m, m.stateNode = e, t = pu(), t.refCount++, e.pooledCache = t, t.refCount++, m.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: t
    }, bu(m), e;
  }
  function a0(e) {
    return e ? (e = bl, e) : bl;
  }
  function o0(e, t, i, o, c, m) {
    c = a0(c), o.context === null ? o.context = c : o.pendingContext = c, o = ir(t), o.payload = { element: i }, m = m === void 0 ? null : m, m !== null && (o.callback = m), i = ar(e, o, t), i !== null && (Lt(i, e, t), Ti(i, e, t));
  }
  function s0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Uc(e, t) {
    s0(e, t), (e = e.alternate) && s0(e, t);
  }
  function u0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Or(e, 67108864);
      t !== null && Lt(t, e, 67108864), Uc(e, 67108864);
    }
  }
  function c0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Qt();
      t = Ms(t);
      var i = Or(e, t);
      i !== null && Lt(i, e, t), Uc(e, t);
    }
  }
  var Uo = !0;
  function G4(e, t, i, o) {
    var c = B.T;
    B.T = null;
    var m = Y.p;
    try {
      Y.p = 2, Bc(e, t, i, o);
    } finally {
      Y.p = m, B.T = c;
    }
  }
  function Y4(e, t, i, o) {
    var c = B.T;
    B.T = null;
    var m = Y.p;
    try {
      Y.p = 8, Bc(e, t, i, o);
    } finally {
      Y.p = m, B.T = c;
    }
  }
  function Bc(e, t, i, o) {
    if (Uo) {
      var c = Hc(o);
      if (c === null)
        wc(
          e,
          t,
          o,
          Bo,
          i
        ), d0(e, o);
      else if (Q4(
        c,
        e,
        t,
        i,
        o
      ))
        o.stopPropagation();
      else if (d0(e, o), t & 4 && -1 < X4.indexOf(e)) {
        for (; c !== null; ) {
          var m = sl(c);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var b = Tr(m.pendingLanes);
                  if (b !== 0) {
                    var k = m;
                    for (k.pendingLanes |= 2, k.entangledLanes |= 2; b; ) {
                      var N = 1 << 31 - Ye(b);
                      k.entanglements[1] |= N, b &= ~N;
                    }
                    bn(m), (He & 6) === 0 && (vo = wt() + 500, $i(0));
                  }
                }
                break;
              case 31:
              case 13:
                k = Or(m, 2), k !== null && Lt(k, m, 2), ko(), Uc(m, 2);
            }
          if (m = Hc(o), m === null && wc(
            e,
            t,
            o,
            Bo,
            i
          ), m === c) break;
          c = m;
        }
        c !== null && o.stopPropagation();
      } else
        wc(
          e,
          t,
          o,
          null,
          i
        );
    }
  }
  function Hc(e) {
    return e = Is(e), qc(e);
  }
  var Bo = null;
  function qc(e) {
    if (Bo = null, e = ol(e), e !== null) {
      var t = u(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Bo = e, null;
  }
  function f0(e) {
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
        switch (zs()) {
          case Z:
            return 2;
          case oe:
            return 8;
          case ve:
          case je:
            return 32;
          case qe:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ic = !1, xr = null, yr = null, br = null, Ki = /* @__PURE__ */ new Map(), Wi = /* @__PURE__ */ new Map(), vr = [], X4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function d0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        xr = null;
        break;
      case "dragenter":
      case "dragleave":
        yr = null;
        break;
      case "mouseover":
      case "mouseout":
        br = null;
        break;
      case "pointerover":
      case "pointerout":
        Ki.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wi.delete(t.pointerId);
    }
  }
  function Ji(e, t, i, o, c, m) {
    return e === null || e.nativeEvent !== m ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: m,
      targetContainers: [c]
    }, t !== null && (t = sl(t), t !== null && u0(t)), e) : (e.eventSystemFlags |= o, t = e.targetContainers, c !== null && t.indexOf(c) === -1 && t.push(c), e);
  }
  function Q4(e, t, i, o, c) {
    switch (t) {
      case "focusin":
        return xr = Ji(
          xr,
          e,
          t,
          i,
          o,
          c
        ), !0;
      case "dragenter":
        return yr = Ji(
          yr,
          e,
          t,
          i,
          o,
          c
        ), !0;
      case "mouseover":
        return br = Ji(
          br,
          e,
          t,
          i,
          o,
          c
        ), !0;
      case "pointerover":
        var m = c.pointerId;
        return Ki.set(
          m,
          Ji(
            Ki.get(m) || null,
            e,
            t,
            i,
            o,
            c
          )
        ), !0;
      case "gotpointercapture":
        return m = c.pointerId, Wi.set(
          m,
          Ji(
            Wi.get(m) || null,
            e,
            t,
            i,
            o,
            c
          )
        ), !0;
    }
    return !1;
  }
  function m0(e) {
    var t = ol(e.target);
    if (t !== null) {
      var i = u(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = f(i), t !== null) {
            e.blockedOn = t, Nd(e.priority, function() {
              c0(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, Nd(e.priority, function() {
              c0(i);
            });
            return;
          }
        } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ho(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Hc(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        qs = o, i.target.dispatchEvent(o), qs = null;
      } else
        return t = sl(i), t !== null && u0(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function h0(e, t, i) {
    Ho(e) && i.delete(t);
  }
  function P4() {
    Ic = !1, xr !== null && Ho(xr) && (xr = null), yr !== null && Ho(yr) && (yr = null), br !== null && Ho(br) && (br = null), Ki.forEach(h0), Wi.forEach(h0);
  }
  function qo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ic || (Ic = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      P4
    )));
  }
  var Io = null;
  function p0(e) {
    Io !== e && (Io = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Io === e && (Io = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], o = e[t + 1], c = e[t + 2];
          if (typeof o != "function") {
            if (qc(o || i) === null)
              continue;
            break;
          }
          var m = sl(i);
          m !== null && (e.splice(t, 3), t -= 3, Hu(
            m,
            {
              pending: !0,
              data: c,
              method: i.method,
              action: o
            },
            o,
            c
          ));
        }
      }
    ));
  }
  function Vl(e) {
    function t(N) {
      return qo(N, e);
    }
    xr !== null && qo(xr, e), yr !== null && qo(yr, e), br !== null && qo(br, e), Ki.forEach(t), Wi.forEach(t);
    for (var i = 0; i < vr.length; i++) {
      var o = vr[i];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < vr.length && (i = vr[0], i.blockedOn === null); )
      m0(i), i.blockedOn === null && vr.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var c = i[o], m = i[o + 1], b = c[zt] || null;
        if (typeof m == "function")
          b || p0(i);
        else if (b) {
          var k = null;
          if (m && m.hasAttribute("formAction")) {
            if (c = m, b = m[zt] || null)
              k = b.formAction;
            else if (qc(c) !== null) continue;
          } else k = b.action;
          typeof k == "function" ? i[o + 1] = k : (i.splice(o, 3), o -= 3), p0(i);
        }
      }
  }
  function g0() {
    function e(m) {
      m.canIntercept && m.info === "react-transition" && m.intercept({
        handler: function() {
          return new Promise(function(b) {
            return c = b;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      c !== null && (c(), c = null), o || setTimeout(i, 20);
    }
    function i() {
      if (!o && !navigation.transition) {
        var m = navigation.currentEntry;
        m && m.url != null && navigation.navigate(m.url, {
          state: m.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(i, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), c !== null && (c(), c = null);
      };
    }
  }
  function Fc(e) {
    this._internalRoot = e;
  }
  Fo.prototype.render = Fc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    var i = t.current, o = Qt();
    o0(i, o, e, t, null, null);
  }, Fo.prototype.unmount = Fc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      o0(e.current, 2, null, e, null, null), ko(), t[al] = null;
    }
  };
  function Fo(e) {
    this._internalRoot = e;
  }
  Fo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = jd();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < vr.length && t !== 0 && t < vr[i].priority; i++) ;
      vr.splice(i, 0, e), i === 0 && m0(e);
    }
  };
  var x0 = r.version;
  if (x0 !== "19.2.3")
    throw Error(
      a(
        527,
        x0,
        "19.2.3"
      )
    );
  Y.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = g(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Z4 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: B,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vo.isDisabled && Vo.supportsFiber)
      try {
        Et = Vo.inject(
          Z4
        ), ct = Vo;
      } catch {
      }
  }
  return ta.createRoot = function(e, t) {
    if (!s(e)) throw Error(a(299));
    var i = !1, o = "", c = wh, m = Eh, b = jh;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onUncaughtError !== void 0 && (c = t.onUncaughtError), t.onCaughtError !== void 0 && (m = t.onCaughtError), t.onRecoverableError !== void 0 && (b = t.onRecoverableError)), t = i0(
      e,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      c,
      m,
      b,
      g0
    ), e[al] = t.current, Cc(e), new Fc(t);
  }, ta.hydrateRoot = function(e, t, i) {
    if (!s(e)) throw Error(a(299));
    var o = !1, c = "", m = wh, b = Eh, k = jh, N = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (c = i.identifierPrefix), i.onUncaughtError !== void 0 && (m = i.onUncaughtError), i.onCaughtError !== void 0 && (b = i.onCaughtError), i.onRecoverableError !== void 0 && (k = i.onRecoverableError), i.formState !== void 0 && (N = i.formState)), t = i0(
      e,
      1,
      !0,
      t,
      i ?? null,
      o,
      c,
      N,
      m,
      b,
      k,
      g0
    ), t.context = a0(null), i = t.current, o = Qt(), o = Ms(o), c = ir(o), c.callback = null, ar(i, c, o), i = o, t.current.lanes = i, ci(t, i), bn(t), e[al] = t.current, Cc(e), new Fo(t);
  }, ta.version = "19.2.3", ta;
}
var N0;
function oy() {
  if (N0) return Gc.exports;
  N0 = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Gc.exports = ay(), Gc.exports;
}
var sy = oy();
const Wp = /* @__PURE__ */ ni(sy), uy = () => {
  if (document.getElementById("engram-font-preload")) return;
  [
    "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap",
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap"
  ].forEach((r, l) => {
    const a = document.createElement("link");
    a.rel = "preload", a.as = "style", a.href = r, l === 0 && (a.id = "engram-font-preload"), document.head.appendChild(a);
    const s = document.createElement("link");
    s.rel = "stylesheet", s.href = r, document.head.appendChild(s);
  });
}, cy = () => (V.useEffect(() => {
  uy();
}, []), /* @__PURE__ */ d.jsx("style", { children: `
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
  ` }));
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fy = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), dy = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, l, a) => a ? a.toUpperCase() : l.toLowerCase()
), T0 = (n) => {
  const r = dy(n);
  return r.charAt(0).toUpperCase() + r.slice(1);
}, Jp = (...n) => n.filter((r, l, a) => !!r && r.trim() !== "" && a.indexOf(r) === l).join(" ").trim(), my = (n) => {
  for (const r in n)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var hy = {
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
const py = V.forwardRef(
  ({
    color: n = "currentColor",
    size: r = 24,
    strokeWidth: l = 2,
    absoluteStrokeWidth: a,
    className: s = "",
    children: u,
    iconNode: f,
    ...h
  }, p) => V.createElement(
    "svg",
    {
      ref: p,
      ...hy,
      width: r,
      height: r,
      stroke: n,
      strokeWidth: a ? Number(l) * 24 / Number(r) : l,
      className: Jp("lucide", s),
      ...!u && !my(h) && { "aria-hidden": "true" },
      ...h
    },
    [
      ...f.map(([g, y]) => V.createElement(g, y)),
      ...Array.isArray(u) ? u : [u]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const me = (n, r) => {
  const l = V.forwardRef(
    ({ className: a, ...s }, u) => V.createElement(py, {
      ref: u,
      iconNode: r,
      className: Jp(
        `lucide-${fy(T0(n))}`,
        `lucide-${n}`,
        a
      ),
      ...s
    })
  );
  return l.displayName = T0(n), l;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gy = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], xy = me("arrow-down-to-line", gy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yy = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], by = me("bell", yy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vy = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], Sy = me("book-open", vy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ky = [
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
], Cy = me("book", ky);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wy = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], eg = me("bot", wy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ey = [
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
], jy = me("boxes", Ey);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ny = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], Ff = me("brain", Ny);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ty = [
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
], Ay = me("calculator", Ty);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zy = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], tg = me("check", zy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _y = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ei = me("chevron-down", _y);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const My = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Vf = me("chevron-right", My);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oy = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], xs = me("circle-alert", Oy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dy = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], $f = me("circle-check-big", Dy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ry = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Ly = me("circle-check", Ry);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uy = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], By = me("clock", Uy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hy = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], qy = me("cloud", Hy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iy = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], ng = me("copy", Iy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fy = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], A0 = me("corner-down-left", Fy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vy = [
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
], Gf = me("cpu", Vy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $y = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], ys = me("database", $y);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gy = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], is = me("download", Gy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yy = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], Xy = me("external-link", Yy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qy = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Py = me("eye", Qy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zy = [
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
], Yf = me("file-text", Zy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
], Wy = me("github", Ky);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jy = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], eb = me("hash", Jy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tb = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], nb = me("info", tb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rb = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], bs = me("key", rb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lb = [
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
], rg = me("layers", lb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ib = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], ab = me("layout-dashboard", ib);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ob = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], lg = me("list", ob);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sb = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], ba = me("loader-circle", sb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ub = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], cb = me("maximize-2", ub);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fb = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], db = me("menu", fb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mb = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], z0 = me("moon", mb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hb = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], ig = me("network", hb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pb = [
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
], _0 = me("palette", pb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gb = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], xb = me("pause", gb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yb = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], bb = me("pen", yb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vb = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Xf = me("play", vb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sb = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Qf = me("plus", Sb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kb = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Pf = me("power", kb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cb = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], kn = me("refresh-cw", Cb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wb = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], ag = me("regex", wb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eb = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], jb = me("rotate-ccw", Eb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nb = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], Tb = me("save", Nb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ab = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], zb = me("scissors", Ab);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _b = [
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
], Mb = me("scroll-text", _b);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ob = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Wl = me("search", Ob);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Db = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], Rb = me("send", Db);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lb = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], og = me("server", Lb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ub = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Zf = me("settings", Ub);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bb = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], sg = me("settings-2", Bb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hb = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], qb = me("sun", Hb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ib = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], ri = me("terminal", Ib);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fb = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], li = me("trash-2", Fb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vb = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], $b = me("triangle-alert", Vb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gb = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], Yb = me("upload", Gb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xb = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], vs = me("x", Xb);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qb = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Kf = me("zap", Qb), kf = [
  // 导航命令
  {
    id: "nav-memory",
    icon: lg,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (n) => n("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: ig,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (n) => n("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: Ff,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (n) => n("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: bs,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (n) => n("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: ri,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (n) => n("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: Zf,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (n) => n("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function Pb(n) {
  const r = n.toLowerCase().trim();
  return r ? kf.filter((l) => {
    var a;
    return l.label.toLowerCase().includes(r) || ((a = l.description) == null ? void 0 : a.toLowerCase().includes(r)) || l.keywords.some((s) => s.toLowerCase().includes(r));
  }) : kf;
}
const Zb = {}, M0 = (n) => {
  let r;
  const l = /* @__PURE__ */ new Set(), a = (y, x) => {
    const S = typeof y == "function" ? y(r) : y;
    if (!Object.is(S, r)) {
      const v = r;
      r = x ?? (typeof S != "object" || S === null) ? S : Object.assign({}, r, S), l.forEach((C) => C(r, v));
    }
  }, s = () => r, p = { setState: a, getState: s, getInitialState: () => g, subscribe: (y) => (l.add(y), () => l.delete(y)), destroy: () => {
    (Zb ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), l.clear();
  } }, g = r = n(a, s, p);
  return p;
}, Kb = (n) => n ? M0(n) : M0;
var Pc = { exports: {} }, Zc = {}, Kc = { exports: {} }, Wc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var O0;
function Wb() {
  if (O0) return Wc;
  O0 = 1;
  var n = ya();
  function r(x, S) {
    return x === S && (x !== 0 || 1 / x === 1 / S) || x !== x && S !== S;
  }
  var l = typeof Object.is == "function" ? Object.is : r, a = n.useState, s = n.useEffect, u = n.useLayoutEffect, f = n.useDebugValue;
  function h(x, S) {
    var v = S(), C = a({ inst: { value: v, getSnapshot: S } }), j = C[0].inst, M = C[1];
    return u(
      function() {
        j.value = v, j.getSnapshot = S, p(j) && M({ inst: j });
      },
      [x, v, S]
    ), s(
      function() {
        return p(j) && M({ inst: j }), x(function() {
          p(j) && M({ inst: j });
        });
      },
      [x]
    ), f(v), v;
  }
  function p(x) {
    var S = x.getSnapshot;
    x = x.value;
    try {
      var v = S();
      return !l(x, v);
    } catch {
      return !0;
    }
  }
  function g(x, S) {
    return S();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : h;
  return Wc.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, Wc;
}
var D0;
function Jb() {
  return D0 || (D0 = 1, Kc.exports = Wb()), Kc.exports;
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
var R0;
function e3() {
  if (R0) return Zc;
  R0 = 1;
  var n = ya(), r = Jb();
  function l(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var a = typeof Object.is == "function" ? Object.is : l, s = r.useSyncExternalStore, u = n.useRef, f = n.useEffect, h = n.useMemo, p = n.useDebugValue;
  return Zc.useSyncExternalStoreWithSelector = function(g, y, x, S, v) {
    var C = u(null);
    if (C.current === null) {
      var j = { hasValue: !1, value: null };
      C.current = j;
    } else j = C.current;
    C = h(
      function() {
        function T(_) {
          if (!I) {
            if (I = !0, L = _, _ = S(_), v !== void 0 && j.hasValue) {
              var U = j.value;
              if (v(U, _))
                return re = U;
            }
            return re = _;
          }
          if (U = re, a(L, _)) return U;
          var ae = S(_);
          return v !== void 0 && v(U, ae) ? (L = _, U) : (L = _, re = ae);
        }
        var I = !1, L, re, le = x === void 0 ? null : x;
        return [
          function() {
            return T(y());
          },
          le === null ? void 0 : function() {
            return T(le());
          }
        ];
      },
      [y, x, S, v]
    );
    var M = s(g, C[0], C[1]);
    return f(
      function() {
        j.hasValue = !0, j.value = M;
      },
      [M]
    ), p(M), M;
  }, Zc;
}
var L0;
function t3() {
  return L0 || (L0 = 1, Pc.exports = e3()), Pc.exports;
}
var n3 = t3();
const r3 = /* @__PURE__ */ ni(n3), ug = {}, { useDebugValue: l3 } = Zp, { useSyncExternalStoreWithSelector: i3 } = r3;
let U0 = !1;
const a3 = (n) => n;
function o3(n, r = a3, l) {
  (ug ? "production" : void 0) !== "production" && l && !U0 && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), U0 = !0);
  const a = i3(
    n.subscribe,
    n.getState,
    n.getServerState || n.getInitialState,
    r,
    l
  );
  return l3(a), a;
}
const B0 = (n) => {
  (ug ? "production" : void 0) !== "production" && typeof n != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const r = typeof n == "function" ? Kb(n) : n, l = (a, s) => o3(r, a, s);
  return Object.assign(l, r), l;
}, s3 = (n) => n ? B0(n) : B0, u3 = {
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
}, c3 = {
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
}, f3 = {
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
}, d3 = {
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
}, m3 = {
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
}, h3 = {
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
}, p3 = {
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
}, es = {
  sillytavern: h3,
  // SillyTavern 继承主题
  paperLight: u3,
  twitterDark: f3,
  claudeDark: c3,
  catppuccin: m3,
  discord: d3,
  glass: p3
}, bt = [];
for (let n = 0; n < 256; ++n)
  bt.push((n + 256).toString(16).slice(1));
function g3(n, r = 0) {
  return (bt[n[r + 0]] + bt[n[r + 1]] + bt[n[r + 2]] + bt[n[r + 3]] + "-" + bt[n[r + 4]] + bt[n[r + 5]] + "-" + bt[n[r + 6]] + bt[n[r + 7]] + "-" + bt[n[r + 8]] + bt[n[r + 9]] + "-" + bt[n[r + 10]] + bt[n[r + 11]] + bt[n[r + 12]] + bt[n[r + 13]] + bt[n[r + 14]] + bt[n[r + 15]]).toLowerCase();
}
let Jc;
const x3 = new Uint8Array(16);
function y3() {
  if (!Jc) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Jc = crypto.getRandomValues.bind(crypto);
  }
  return Jc(x3);
}
const b3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), H0 = { randomUUID: b3 };
function v3(n, r, l) {
  var s;
  n = n || {};
  const a = n.random ?? ((s = n.rng) == null ? void 0 : s.call(n)) ?? y3();
  if (a.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, g3(a);
}
function S3(n, r, l) {
  return H0.randomUUID && !n ? H0.randomUUID() : v3(n);
}
var Cf = function(n, r) {
  return Cf = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(l, a) {
    l.__proto__ = a;
  } || function(l, a) {
    for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (l[s] = a[s]);
  }, Cf(n, r);
};
function va(n, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  Cf(n, r);
  function l() {
    this.constructor = n;
  }
  n.prototype = r === null ? Object.create(r) : (l.prototype = r.prototype, new l());
}
function wf(n) {
  var r = typeof Symbol == "function" && Symbol.iterator, l = r && n[r], a = 0;
  if (l) return l.call(n);
  if (n && typeof n.length == "number") return {
    next: function() {
      return n && a >= n.length && (n = void 0), { value: n && n[a++], done: !n };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ef(n, r) {
  var l = typeof Symbol == "function" && n[Symbol.iterator];
  if (!l) return n;
  var a = l.call(n), s, u = [], f;
  try {
    for (; (r === void 0 || r-- > 0) && !(s = a.next()).done; ) u.push(s.value);
  } catch (h) {
    f = { error: h };
  } finally {
    try {
      s && !s.done && (l = a.return) && l.call(a);
    } finally {
      if (f) throw f.error;
    }
  }
  return u;
}
function jf(n, r, l) {
  if (l || arguments.length === 2) for (var a = 0, s = r.length, u; a < s; a++)
    (u || !(a in r)) && (u || (u = Array.prototype.slice.call(r, 0, a)), u[a] = r[a]);
  return n.concat(u || Array.prototype.slice.call(r));
}
function Cn(n) {
  return typeof n == "function";
}
function cg(n) {
  var r = function(a) {
    Error.call(a), a.stack = new Error().stack;
  }, l = n(r);
  return l.prototype = Object.create(Error.prototype), l.prototype.constructor = l, l;
}
var ef = cg(function(n) {
  return function(l) {
    n(this), this.message = l ? l.length + ` errors occurred during unsubscription:
` + l.map(function(a, s) {
      return s + 1 + ") " + a.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = l;
  };
});
function Nf(n, r) {
  if (n) {
    var l = n.indexOf(r);
    0 <= l && n.splice(l, 1);
  }
}
var Ss = (function() {
  function n(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return n.prototype.unsubscribe = function() {
    var r, l, a, s, u;
    if (!this.closed) {
      this.closed = !0;
      var f = this._parentage;
      if (f)
        if (this._parentage = null, Array.isArray(f))
          try {
            for (var h = wf(f), p = h.next(); !p.done; p = h.next()) {
              var g = p.value;
              g.remove(this);
            }
          } catch (j) {
            r = { error: j };
          } finally {
            try {
              p && !p.done && (l = h.return) && l.call(h);
            } finally {
              if (r) throw r.error;
            }
          }
        else
          f.remove(this);
      var y = this.initialTeardown;
      if (Cn(y))
        try {
          y();
        } catch (j) {
          u = j instanceof ef ? j.errors : [j];
        }
      var x = this._finalizers;
      if (x) {
        this._finalizers = null;
        try {
          for (var S = wf(x), v = S.next(); !v.done; v = S.next()) {
            var C = v.value;
            try {
              q0(C);
            } catch (j) {
              u = u ?? [], j instanceof ef ? u = jf(jf([], Ef(u)), Ef(j.errors)) : u.push(j);
            }
          }
        } catch (j) {
          a = { error: j };
        } finally {
          try {
            v && !v.done && (s = S.return) && s.call(S);
          } finally {
            if (a) throw a.error;
          }
        }
      }
      if (u)
        throw new ef(u);
    }
  }, n.prototype.add = function(r) {
    var l;
    if (r && r !== this)
      if (this.closed)
        q0(r);
      else {
        if (r instanceof n) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (l = this._finalizers) !== null && l !== void 0 ? l : []).push(r);
      }
  }, n.prototype._hasParent = function(r) {
    var l = this._parentage;
    return l === r || Array.isArray(l) && l.includes(r);
  }, n.prototype._addParent = function(r) {
    var l = this._parentage;
    this._parentage = Array.isArray(l) ? (l.push(r), l) : l ? [l, r] : r;
  }, n.prototype._removeParent = function(r) {
    var l = this._parentage;
    l === r ? this._parentage = null : Array.isArray(l) && Nf(l, r);
  }, n.prototype.remove = function(r) {
    var l = this._finalizers;
    l && Nf(l, r), r instanceof n && r._removeParent(this);
  }, n.EMPTY = (function() {
    var r = new n();
    return r.closed = !0, r;
  })(), n;
})(), fg = Ss.EMPTY;
function dg(n) {
  return n instanceof Ss || n && "closed" in n && Cn(n.remove) && Cn(n.add) && Cn(n.unsubscribe);
}
function q0(n) {
  Cn(n) ? n() : n.unsubscribe();
}
var k3 = {
  Promise: void 0
}, C3 = {
  setTimeout: function(n, r) {
    for (var l = [], a = 2; a < arguments.length; a++)
      l[a - 2] = arguments[a];
    return setTimeout.apply(void 0, jf([n, r], Ef(l)));
  },
  clearTimeout: function(n) {
    return clearTimeout(n);
  },
  delegate: void 0
};
function w3(n) {
  C3.setTimeout(function() {
    throw n;
  });
}
function I0() {
}
function ts(n) {
  n();
}
var Wf = (function(n) {
  va(r, n);
  function r(l) {
    var a = n.call(this) || this;
    return a.isStopped = !1, l ? (a.destination = l, dg(l) && l.add(a)) : a.destination = N3, a;
  }
  return r.create = function(l, a, s) {
    return new Tf(l, a, s);
  }, r.prototype.next = function(l) {
    this.isStopped || this._next(l);
  }, r.prototype.error = function(l) {
    this.isStopped || (this.isStopped = !0, this._error(l));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, n.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(l) {
    this.destination.next(l);
  }, r.prototype._error = function(l) {
    try {
      this.destination.error(l);
    } finally {
      this.unsubscribe();
    }
  }, r.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r;
})(Ss), E3 = (function() {
  function n(r) {
    this.partialObserver = r;
  }
  return n.prototype.next = function(r) {
    var l = this.partialObserver;
    if (l.next)
      try {
        l.next(r);
      } catch (a) {
        $o(a);
      }
  }, n.prototype.error = function(r) {
    var l = this.partialObserver;
    if (l.error)
      try {
        l.error(r);
      } catch (a) {
        $o(a);
      }
    else
      $o(r);
  }, n.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (l) {
        $o(l);
      }
  }, n;
})(), Tf = (function(n) {
  va(r, n);
  function r(l, a, s) {
    var u = n.call(this) || this, f;
    return Cn(l) || !l ? f = {
      next: l ?? void 0,
      error: a ?? void 0,
      complete: s ?? void 0
    } : f = l, u.destination = new E3(f), u;
  }
  return r;
})(Wf);
function $o(n) {
  w3(n);
}
function j3(n) {
  throw n;
}
var N3 = {
  closed: !0,
  next: I0,
  error: j3,
  complete: I0
}, T3 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function A3(n) {
  return n;
}
function z3(n) {
  return n.length === 0 ? A3 : n.length === 1 ? n[0] : function(l) {
    return n.reduce(function(a, s) {
      return s(a);
    }, l);
  };
}
var F0 = (function() {
  function n(r) {
    r && (this._subscribe = r);
  }
  return n.prototype.lift = function(r) {
    var l = new n();
    return l.source = this, l.operator = r, l;
  }, n.prototype.subscribe = function(r, l, a) {
    var s = this, u = M3(r) ? r : new Tf(r, l, a);
    return ts(function() {
      var f = s, h = f.operator, p = f.source;
      u.add(h ? h.call(u, p) : p ? s._subscribe(u) : s._trySubscribe(u));
    }), u;
  }, n.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (l) {
      r.error(l);
    }
  }, n.prototype.forEach = function(r, l) {
    var a = this;
    return l = V0(l), new l(function(s, u) {
      var f = new Tf({
        next: function(h) {
          try {
            r(h);
          } catch (p) {
            u(p), f.unsubscribe();
          }
        },
        error: u,
        complete: s
      });
      a.subscribe(f);
    });
  }, n.prototype._subscribe = function(r) {
    var l;
    return (l = this.source) === null || l === void 0 ? void 0 : l.subscribe(r);
  }, n.prototype[T3] = function() {
    return this;
  }, n.prototype.pipe = function() {
    for (var r = [], l = 0; l < arguments.length; l++)
      r[l] = arguments[l];
    return z3(r)(this);
  }, n.prototype.toPromise = function(r) {
    var l = this;
    return r = V0(r), new r(function(a, s) {
      var u;
      l.subscribe(function(f) {
        return u = f;
      }, function(f) {
        return s(f);
      }, function() {
        return a(u);
      });
    });
  }, n.create = function(r) {
    return new n(r);
  }, n;
})();
function V0(n) {
  var r;
  return (r = n ?? k3.Promise) !== null && r !== void 0 ? r : Promise;
}
function _3(n) {
  return n && Cn(n.next) && Cn(n.error) && Cn(n.complete);
}
function M3(n) {
  return n && n instanceof Wf || _3(n) && dg(n);
}
function O3(n) {
  return Cn(n == null ? void 0 : n.lift);
}
function D3(n) {
  return function(r) {
    if (O3(r))
      return r.lift(function(l) {
        try {
          return n(l, this);
        } catch (a) {
          this.error(a);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function R3(n, r, l, a, s) {
  return new L3(n, r, l, a, s);
}
var L3 = (function(n) {
  va(r, n);
  function r(l, a, s, u, f, h) {
    var p = n.call(this, l) || this;
    return p.onFinalize = f, p.shouldUnsubscribe = h, p._next = a ? function(g) {
      try {
        a(g);
      } catch (y) {
        l.error(y);
      }
    } : n.prototype._next, p._error = u ? function(g) {
      try {
        u(g);
      } catch (y) {
        l.error(y);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._error, p._complete = s ? function() {
      try {
        s();
      } catch (g) {
        l.error(g);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._complete, p;
  }
  return r.prototype.unsubscribe = function() {
    var l;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var a = this.closed;
      n.prototype.unsubscribe.call(this), !a && ((l = this.onFinalize) === null || l === void 0 || l.call(this));
    }
  }, r;
})(Wf), U3 = cg(function(n) {
  return function() {
    n(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Jf = (function(n) {
  va(r, n);
  function r() {
    var l = n.call(this) || this;
    return l.closed = !1, l.currentObservers = null, l.observers = [], l.isStopped = !1, l.hasError = !1, l.thrownError = null, l;
  }
  return r.prototype.lift = function(l) {
    var a = new $0(this, this);
    return a.operator = l, a;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new U3();
  }, r.prototype.next = function(l) {
    var a = this;
    ts(function() {
      var s, u;
      if (a._throwIfClosed(), !a.isStopped) {
        a.currentObservers || (a.currentObservers = Array.from(a.observers));
        try {
          for (var f = wf(a.currentObservers), h = f.next(); !h.done; h = f.next()) {
            var p = h.value;
            p.next(l);
          }
        } catch (g) {
          s = { error: g };
        } finally {
          try {
            h && !h.done && (u = f.return) && u.call(f);
          } finally {
            if (s) throw s.error;
          }
        }
      }
    });
  }, r.prototype.error = function(l) {
    var a = this;
    ts(function() {
      if (a._throwIfClosed(), !a.isStopped) {
        a.hasError = a.isStopped = !0, a.thrownError = l;
        for (var s = a.observers; s.length; )
          s.shift().error(l);
      }
    });
  }, r.prototype.complete = function() {
    var l = this;
    ts(function() {
      if (l._throwIfClosed(), !l.isStopped) {
        l.isStopped = !0;
        for (var a = l.observers; a.length; )
          a.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var l;
      return ((l = this.observers) === null || l === void 0 ? void 0 : l.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(l) {
    return this._throwIfClosed(), n.prototype._trySubscribe.call(this, l);
  }, r.prototype._subscribe = function(l) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(l), this._innerSubscribe(l);
  }, r.prototype._innerSubscribe = function(l) {
    var a = this, s = this, u = s.hasError, f = s.isStopped, h = s.observers;
    return u || f ? fg : (this.currentObservers = null, h.push(l), new Ss(function() {
      a.currentObservers = null, Nf(h, l);
    }));
  }, r.prototype._checkFinalizedStatuses = function(l) {
    var a = this, s = a.hasError, u = a.thrownError, f = a.isStopped;
    s ? l.error(u) : f && l.complete();
  }, r.prototype.asObservable = function() {
    var l = new F0();
    return l.source = this, l;
  }, r.create = function(l, a) {
    return new $0(l, a);
  }, r;
})(F0), $0 = (function(n) {
  va(r, n);
  function r(l, a) {
    var s = n.call(this) || this;
    return s.destination = l, s.source = a, s;
  }
  return r.prototype.next = function(l) {
    var a, s;
    (s = (a = this.destination) === null || a === void 0 ? void 0 : a.next) === null || s === void 0 || s.call(a, l);
  }, r.prototype.error = function(l) {
    var a, s;
    (s = (a = this.destination) === null || a === void 0 ? void 0 : a.error) === null || s === void 0 || s.call(a, l);
  }, r.prototype.complete = function() {
    var l, a;
    (a = (l = this.destination) === null || l === void 0 ? void 0 : l.complete) === null || a === void 0 || a.call(l);
  }, r.prototype._subscribe = function(l) {
    var a, s;
    return (s = (a = this.source) === null || a === void 0 ? void 0 : a.subscribe(l)) !== null && s !== void 0 ? s : fg;
  }, r;
})(Jf);
function B3(n, r) {
  return D3(function(l, a) {
    var s = 0;
    l.subscribe(R3(a, function(u) {
      return n.call(r, u, s++) && a.next(u);
    }));
  });
}
const Go = new Jf(), H3 = {
  /**
   * 发布事件
   */
  emit(n) {
    Go.next({
      ...n,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(n) {
    const r = Go.subscribe(n);
    return {
      unsubscribe: () => r.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(n, r) {
    const l = Go.pipe(B3((a) => a.type === n)).subscribe((a) => r(a.payload));
    return {
      unsubscribe: () => l.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Go.asObservable();
  }
};
var Ze = /* @__PURE__ */ ((n) => (n[n.DEBUG = 0] = "DEBUG", n[n.INFO = 1] = "INFO", n[n.SUCCESS = 2] = "SUCCESS", n[n.WARN = 3] = "WARN", n[n.ERROR = 4] = "ERROR", n))(Ze || {});
const as = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, mg = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, hg = new Jf();
let Yn = [], ca = { ...mg };
function q3(n) {
  return new Date(n).toTimeString().slice(0, 8);
}
function Zl(n, r, l, a) {
  if (n < ca.minLevel) return;
  const s = {
    id: S3(),
    timestamp: Date.now(),
    level: n,
    module: r,
    message: l,
    data: a
  };
  Yn.push(s), Yn.length > ca.maxEntries && (Yn = Yn.slice(-ca.maxEntries)), hg.next(s);
}
function I3() {
  H3.subscribe((n) => {
    const l = {
      INGESTION_START: Ze.INFO,
      INGESTION_COMPLETE: Ze.SUCCESS,
      ENTITY_CREATED: Ze.INFO,
      MEMORY_STORED: Ze.SUCCESS,
      RETRIEVAL_START: Ze.DEBUG,
      RETRIEVAL_COMPLETE: Ze.SUCCESS,
      CHAT_CHANGED: Ze.INFO,
      MESSAGE_RECEIVED: Ze.DEBUG
    }[n.type] ?? Ze.DEBUG;
    Zl(l, "EventBus", `${n.type}`, n.payload);
  });
}
const ge = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(n) {
    n && (ca = { ...ca, ...n }), Yn = [], I3(), ge.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(n, r, l) {
    Zl(Ze.DEBUG, n, r, l);
  },
  /**
   * INFO 级别日志
   */
  info(n, r, l) {
    Zl(Ze.INFO, n, r, l);
  },
  /**
   * SUCCESS 级别日志
   */
  success(n, r, l) {
    Zl(Ze.SUCCESS, n, r, l);
  },
  /**
   * WARN 级别日志
   */
  warn(n, r, l) {
    Zl(Ze.WARN, n, r, l);
  },
  /**
   * ERROR 级别日志
   */
  error(n, r, l) {
    Zl(Ze.ERROR, n, r, l);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...Yn];
  },
  /**
   * 订阅新日志
   */
  subscribe(n) {
    const r = hg.subscribe(n);
    return () => r.unsubscribe();
  },
  /**
   * 清空所有日志（仅内存）
   */
  clear() {
    Yn = [], ge.info("Logger", "日志已清空");
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const n = /* @__PURE__ */ new Date();
    n.toISOString().slice(0, 10), n.toTimeString().slice(0, 8).replace(/:/g, "");
    const r = {
      [Ze.DEBUG]: "DEBUG",
      [Ze.INFO]: "INFO",
      [Ze.SUCCESS]: "SUCCESS",
      [Ze.WARN]: "WARN",
      [Ze.ERROR]: "ERROR"
    };
    let l = `# Engram Debug Log

`;
    l += `- **导出时间**: ${n.toLocaleString("zh-CN")}
`, l += `- **版本**: 0.1.0
`, l += `- **日志条数**: ${Yn.length}

`, l += `---

`, l += `## 日志记录

`, l += "```\n";
    for (const a of Yn) {
      const s = q3(a.timestamp), u = r[a.level].padEnd(7), f = a.module.padEnd(16);
      if (l += `[${s}] [${f}] ${u} ${a.message}
`, a.data !== void 0) {
        const h = JSON.stringify(a.data, null, 2).split(`
`).map((p) => `    ${p}`).join(`
`);
        l += `${h}
`;
      }
    }
    return l += "```\n", l;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const n = /* @__PURE__ */ new Date(), r = n.toISOString().slice(0, 10), l = n.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${r}_${l}.md`;
  }
}, ed = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: mg,
  LogLevel: Ze,
  LogLevelConfig: as,
  Logger: ge
}, Symbol.toStringTag, { value: "Module" })), Yr = Object.freeze({
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
class Ee {
  /**
   * 获取 SillyTavern context
   */
  static getContext() {
    var r, l;
    return (l = (r = window.SillyTavern) == null ? void 0 : r.getContext) == null ? void 0 : l.call(r);
  }
  /**
   * 获取扩展设置对象
   * 如果不存在则创建
   */
  static getSettings() {
    const r = this.getContext();
    return r != null && r.extensionSettings ? (r.extensionSettings[this.EXTENSION_NAME] || (r.extensionSettings[this.EXTENSION_NAME] = { ...Yr }, ge.debug("SettingsManager", "Initialized engram settings with defaults"), this.save()), r.extensionSettings[this.EXTENSION_NAME]) : (ge.warn("SettingsManager", "SillyTavern context.extensionSettings not available"), { ...Yr });
  }
  static getExtensionSettings() {
    return this.getSettings();
  }
  /**
   * 初始化设置（在扩展加载时调用）
   * 确保所有必需的字段都存在
   */
  static initSettings() {
    const r = this.getContext();
    if (!(r != null && r.extensionSettings)) {
      ge.warn("SettingsManager", "Cannot init settings: context not available");
      return;
    }
    let l = !1;
    r.extensionSettings[this.EXTENSION_NAME] || (r.extensionSettings[this.EXTENSION_NAME] = { ...Yr }, l = !0, ge.info("SettingsManager", "Created engram settings"));
    const a = r.extensionSettings[this.EXTENSION_NAME];
    for (const s of Object.keys(Yr))
      s in a || (a[s] = Yr[s], l = !0, ge.debug("SettingsManager", `Added missing field: ${s}`));
    l && this.save();
  }
  /**
   * Get a specific setting value
   */
  static get(r) {
    const a = this.getExtensionSettings()[r];
    return a !== void 0 ? a : Yr[r];
  }
  /**
   * Save a specific setting value
   * 直接更新 context.extensionSettings 中的字段
   */
  static set(r, l) {
    const a = this.getContext();
    if (!(a != null && a.extensionSettings)) {
      ge.warn("SettingsManager", "Cannot set: context.extensionSettings not available");
      return;
    }
    a.extensionSettings[this.EXTENSION_NAME] || (a.extensionSettings[this.EXTENSION_NAME] = { ...Yr }), a.extensionSettings[this.EXTENSION_NAME][r] = l, ge.debug("SettingsManager", `Set ${String(r)} = ${JSON.stringify(l)}`), this.save();
  }
  /**
   * 保存设置到服务器
   */
  static save() {
    const r = this.getContext();
    r != null && r.saveSettingsDebounced ? (r.saveSettingsDebounced(), ge.debug("SettingsManager", "Saved via context.saveSettingsDebounced")) : ge.warn("SettingsManager", "saveSettingsDebounced not available");
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
  static getEnabledPromptTemplate(r) {
    return (this.get("promptTemplates") || []).find((a) => a.category === r && a.enabled) || null;
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
  static setSummarizerSettings(r) {
    const l = this.getSummarizerSettings();
    this.set("summarizerConfig", { ...l, ...r });
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
  static setRegexRules(r) {
    this.set("regexRules", r);
  }
}
Je(Ee, "EXTENSION_NAME", "engram");
const pg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: Ee
}, Symbol.toStringTag, { value: "Module" }));
class jr {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let l = Ee.loadSettings().theme;
    l || (l = localStorage.getItem(this.STORAGE_KEY), l && Ee.set("theme", l));
    const a = es[l] ? l : "claudeDark";
    this.setTheme(a), ge.info("ThemeManager", `主题系统初始化完成: ${a}`);
  }
  /**
   * 切换主题
   */
  static setTheme(r) {
    es[r] || (ge.warn("ThemeManager", `未知主题: ${r}, 回退到 claudeDark`), r = "claudeDark"), this.currentTheme = r, Ee.set("theme", r), localStorage.setItem(this.STORAGE_KEY, r), this.applyThemeVariables(r);
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
    const r = "engram-styles";
    if (document.getElementById(r)) return;
    const l = document.createElement("link");
    l.id = r, l.rel = "stylesheet", l.type = "text/css", l.href = `scripts/extensions/Engram_project/dist/style.css?v=${Date.now()}`, document.head.appendChild(l);
  }
  /**
   * 应用 CSS 变量到根元素
   */
  static applyThemeVariables(r) {
    var C, j;
    const l = es[r];
    if (!l) return;
    const a = document.documentElement, s = (M, T) => {
      a.style.setProperty(M, T);
    }, u = Ee.getSettings(), h = ((C = u.glassSettings) == null ? void 0 : C.enabled) ?? !0 ? ((j = u.glassSettings) == null ? void 0 : j.opacity) ?? 1 : 1, g = !(r === "glass") && h < 1, y = Math.round((1 - h) * 100), x = [
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
    Object.entries(l.colors).forEach(([M, T]) => {
      let I = `--${M.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      I = I.replace(/(\d+)/, "-$1");
      let L = T;
      if (g && x.includes(M)) {
        const le = M.toLowerCase().includes("border") ? Math.round(y * 0.1) : y;
        L = `color-mix(in srgb, ${T}, transparent ${le}%)`;
      }
      s(I, L);
    }), Object.entries(l.variables).forEach(([M, T]) => {
      s(`--${M}`, T);
    }), r !== "paperLight" ? a.classList.add("dark") : a.classList.remove("dark");
    const v = Ee.getSettings().glassSettings;
    v && v.enabled ? (s("--glass-opacity", v.opacity.toString()), s("--glass-blur", `${v.blur}px`), v.blur > 0 ? s("--glass-backdrop-filter", `blur(${v.blur}px)`) : s("--glass-backdrop-filter", "none")) : (s("--glass-opacity", "1"), s("--glass-blur", "0px"), s("--glass-backdrop-filter", "none"));
  }
}
Je(jr, "STORAGE_KEY", "engram-theme"), Je(jr, "currentTheme", "claudeDark");
const ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: jr
}, Symbol.toStringTag, { value: "Module" })), F3 = s3((n) => ({
  theme: jr.getTheme(),
  isDarkMode: jr.getTheme() !== "paperLight",
  setTheme: (r) => {
    jr.setTheme(r), n({
      theme: r,
      isDarkMode: r !== "paperLight"
    });
  }
})), V3 = ({ onNavigate: n }) => {
  const r = F3((C) => C.setTheme), [l, a] = V.useState(""), [s, u] = V.useState(!1), [f, h] = V.useState(0), [p, g] = V.useState(kf), y = V.useRef(null), x = [
    {
      id: "theme-paper-light",
      icon: qb,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => r("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: z0,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => r("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: z0,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => r("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: _0,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => r("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: _0,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => r("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  V.useEffect(() => {
    const C = Pb(l), j = l.toLowerCase().trim(), M = x.filter(
      (T) => {
        var I;
        return !j || T.label.toLowerCase().includes(j) || ((I = T.description) == null ? void 0 : I.toLowerCase().includes(j)) || T.keywords.some((L) => L.toLowerCase().includes(j));
      }
    );
    g([...C, ...M]), h(0);
  }, [l]), V.useEffect(() => {
    const C = (j) => {
      (j.metaKey || j.ctrlKey) && j.key === "k" && (j.preventDefault(), u(!0));
    };
    return window.addEventListener("keydown", C), () => window.removeEventListener("keydown", C);
  }, []), V.useEffect(() => {
    s && setTimeout(() => {
      var C;
      return (C = y.current) == null ? void 0 : C.focus();
    }, 50);
  }, [s]);
  const S = (C) => {
    const j = p.length + (l ? 1 : 0);
    switch (C.key) {
      case "ArrowDown":
        C.preventDefault(), h((M) => (M + 1) % j);
        break;
      case "ArrowUp":
        C.preventDefault(), h((M) => (M - 1 + j) % j);
        break;
      case "Enter":
        C.preventDefault(), v();
        break;
      case "Escape":
        u(!1);
        break;
    }
  }, v = () => {
    p.length > 0 && f < p.length ? p[f].action(n) : l && (console.log("Searching memory for:", l), n("/memory")), u(!1), a("");
  };
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      "button",
      {
        onClick: () => u(!0),
        className: "p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground",
        title: "搜索 (Cmd+K)",
        children: /* @__PURE__ */ d.jsx(Wl, { size: 20 })
      }
    ),
    s && /* @__PURE__ */ d.jsx(
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
        onClick: (C) => {
          C.target === C.currentTarget && u(!1);
        },
        children: /* @__PURE__ */ d.jsxs(
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
              /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-border/50", children: [
                /* @__PURE__ */ d.jsx(Wl, { size: 20, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    ref: y,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: l,
                    onChange: (C) => a(C.target.value),
                    onKeyDown: S
                  }
                ),
                /* @__PURE__ */ d.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ d.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                p.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ d.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  p.map((C, j) => /* @__PURE__ */ d.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${j === f ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        C.action(n), u(!1), a("");
                      },
                      onMouseEnter: () => h(j),
                      children: [
                        /* @__PURE__ */ d.jsx(C.icon, { size: 18, className: `shrink-0 ${j === f ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ d.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ d.jsx("div", { className: "text-sm font-medium", children: C.label }),
                          C.description && /* @__PURE__ */ d.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: C.description })
                        ] }),
                        j === f && /* @__PURE__ */ d.jsx(A0, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    },
                    C.id
                  ))
                ] }),
                l && /* @__PURE__ */ d.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50", children: [
                  /* @__PURE__ */ d.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "全站搜索" }),
                  /* @__PURE__ */ d.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${f === p.length ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => v(),
                      onMouseEnter: () => h(p.length),
                      children: [
                        /* @__PURE__ */ d.jsx(Wl, { size: 18, className: `shrink-0 ${f === p.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ d.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ d.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ d.jsx("span", { className: "text-primary", children: l }),
                            '"'
                          ] }),
                          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        f === p.length && /* @__PURE__ */ d.jsx(A0, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    }
                  )
                ] }),
                p.length === 0 && !l && /* @__PURE__ */ d.jsxs("div", { className: "px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ d.jsx(Wl, { size: 32, className: "opacity-20 mb-2" }),
                  /* @__PURE__ */ d.jsx("p", { children: "输入关键词开始搜索..." })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}, $3 = ({ className: n = "", size: r = 24 }) => /* @__PURE__ */ d.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 592",
    width: r,
    height: r,
    className: n,
    "aria-label": "Engram Icon",
    children: /* @__PURE__ */ d.jsx(
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
), G3 = ({
  onToggleSidebar: n,
  isMobile: r,
  // Deprecated prop, handled by CSS
  onClose: l,
  onNavigate: a
}) => /* @__PURE__ */ d.jsxs("header", { className: "h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar/95 backdrop-blur z-50 transition-all duration-300 w-full flex-shrink-0", children: [
  /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3 w-16 md:w-64", children: [
    /* @__PURE__ */ d.jsx(
      "button",
      {
        className: "p-2 -ml-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden",
        onClick: n,
        title: "菜单",
        children: /* @__PURE__ */ d.jsx(db, { size: 20 })
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
      /* @__PURE__ */ d.jsx($3, { size: 20, className: "text-primary" }),
      /* @__PURE__ */ d.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
    ] })
  ] }),
  /* @__PURE__ */ d.jsx("div", { className: "flex-1" }),
  /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
    /* @__PURE__ */ d.jsx(V3, { onNavigate: a }),
    /* @__PURE__ */ d.jsx("div", { className: "h-4 w-[1px] bg-border mx-1" }),
    /* @__PURE__ */ d.jsx(
      "button",
      {
        className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
        onClick: l,
        title: "关闭扩展",
        children: /* @__PURE__ */ d.jsx(vs, { size: 20 })
      }
    )
  ] })
] }), G0 = [
  { id: "dashboard", icon: ab, label: "仪表盘", path: "/dashboard" },
  { id: "memory", icon: lg, label: "记忆流", path: "/memory" },
  { id: "graph", icon: ig, label: "世界图谱", path: "/graph" },
  { id: "processing", icon: Ff, label: "处理", path: "/processing" },
  { id: "presets", icon: bs, label: "API 预设", path: "/presets" },
  { id: "devlog", icon: ri, label: "开发日志", path: "/devlog" },
  { id: "settings", icon: Zf, label: "设置", path: "/settings" }
], Y3 = ({ className: n = "", height: r = 24 }) => {
  const l = Math.round(r * 3.17);
  return /* @__PURE__ */ d.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "235 175 555 175",
      width: l,
      height: r,
      className: n,
      "aria-label": "Engram",
      children: [
        /* @__PURE__ */ d.jsx("path", { fill: "currentColor", d: "M752.3,294.5c-0.2-11.8-0.3-23.1-0.4-34.4c0-2.7,0-5.3-0.2-8c-0.6-6.4-4.1-10.1-9.8-10.9 c-6.9-0.9-12.2,2-14.5,7.9c-1,2.5-1.2,5.2-1.2,7.9c0,11,-0.3,22,0,33c0.1,5.2-1.7,6.9-6.7,6.4c-3.3-0.3-6.7-0.3-10,0 c-4.9,0.5-5.9-1.9-5.8-6.2c0.2-11.8,0.2-23.7,0-35.5c-0.2-9.4-5.4-14.3-14.1-13.5c-6.4,0.6-11.1,5.7-11.3,13 c-0.3,11.7-0.2,23.3-0.3,35c0,7.1,0,7.1-7.3,7.1c-3.3,0-6.7-0.1-10,0c-3.3,0.1-4.9-1.1-4.9-4.6c0.1-21.5,0-43-0.1-64.5 c0-2.9,1.3-4.3,4.2-4.3c3.2,0,6.3-0.1,9.5,0.1c4,0,8.8-1,7.5,6.6c8.6-6.1,16.9-8.7,26.3-7c5.2,1,10.1,2.7,13.7,6.6 c2.8,2.9,4.6,2.4,7.4,0c6.8-5.8,15-7.9,23.8-6.9c16.3,1.8,25.1,11.7,25.8,29.5c0.5,13.3,0.1,26.6,0.2,40 c0,3.4-1.2,5.1-4.7,4.7C763.8,295.7,757.9,298,752.3,294.5z" }),
        /* @__PURE__ */ d.jsx("path", { fill: "currentColor", d: "M463.1,324.1c-10.8-0.7-20.9-2.4-30.2-7.5c-3.6-2-5-4-2.4-7.8c2.3-3.4,4.1-7.1,6.5-11.3 c6.1,3.6,11.8,6.8,18.5,7.7c5.3,0.7,10.6,1.1,15.8-0.5c8.3-2.6,12.2-9.1,10.9-18.6c-9.1,7.5-19.3,8.6-30.2,6.4 c-7.8-1.6-14.2-5.6-19.2-11.8c-10.5-12.8-10.6-32.5-0.5-45.5c11.2-14.3,28.6-16.4,50.9-6.1c-0.4-6.2,3.5-6.3,8.1-6.2 c13,0.2,13,0.1,13,13c0,16.3-0.5,32.7,0.1,49C505.4,309.3,491.3,322.1,467.6,324C466.2,324.1,464.9,324.1,463.1,324.1z M482.1,252.6 c-0.6-2.1-1.6-4-3-5.7c-4.6-6-13.5-8.4-21.2-5.5c-7.4,2.7-11.1,8.9-10.6,17.8c0.4,7.4,5.7,13.5,13.6,15.2 C474.1,277.2,485.2,266.4,482.1,252.6z" }),
        /* @__PURE__ */ d.jsx("path", { fill: "currentColor", d: "M258.1,201.6c20.3,0,40.1,0.1,60-0.1c4.5,0,6.3,1.3,6.1,5.9c-0.4,14.6,2.1,12.6-12.7,12.7 c-10.7,0.1-21.3,0.1-32-0.1c-3.8-0.1-5.2,1-5.3,5.1c0,13.4-0.2,13.4,13.4,13.4c8.7,0,17.3,0.1,26,0c3.4-0.1,4.7,1.2,4.7,4.7 c-0.2,16.4,1.9,13.7-13.1,13.9c-8.8,0.1-17.7,0.1-26.5,0c-3.2,0-4.6,1.1-4.4,4.4c0.2,3.8,0.2,7.7,0,11.5 c-0.2,3.5,1.1,4.7,4.6,4.7c13.7-0.1,27.3,0.2,41-0.1c5.1-0.1,6.6,1.5,6.5,6.5c-0.2,12.3,0,12.3-12.1,12.3 c-18.7-0.1-37.3-0.2-56,0c-4.9,0.1-6.7-1.2-6.7-6.4c0.2-27.5,0.2-55,0-82.5C251.6,203,253,200.9,258.1,201.6z" }),
        /* @__PURE__ */ d.jsx("path", { fill: "currentColor", d: "M599.5,239.6c-5.6,0.9-10.6,2.1-15,4.9c-2.5,1.6-4,0.9-5.1-1.6c-0.9-2-1.9-3.9-2.9-5.8 c-3.1-6.1-3-6.4,3-9.3c11.6-5.6,23.9-7.1,36.5-4.6c15.1,2.9,23.6,12.8,24.1,28.7c0.4,13.3,0.1,26.6,0.2,40 c0,3.5-1.5,4.8-4.8,4.6c-3,0-6,0-9,0.1c-4.2,0.2-8.1,0.2-6.6-6.6c-12.4,9.5-24.9,10.4-37.7,3.9c-8.5-4.3-11.9-12-11.3-21.2 c0.6-9.1,5.9-15,14.4-17.9c5.7-1.9,11.6-2.8,17.7-2.8c4.6,0,9.3,0.5,13.8-0.4c1.9-7.2-7.4-13.5-17.2-11.9 M617.7,271.9 c-0.1-2.5,1-5.8-3.3-5.8c-5,0-10-0.1-15,0.2c-4,0.3-6.9,2.4-7.1,6.9c-0.2,4.5,2.2,7.2,6.3,8.4C606.5,283.8,613.8,280.3,617.7,271.9z" }),
        /* @__PURE__ */ d.jsx("path", { fill: "currentColor", d: "M346.2,222.9c2.6,0,4.8,0.1,7,0c4.7-0.4,8.1,0.7,7,7.3c6-4,11.6-7.1,18.2-7.9c18.2-2.1,34.8,7.7,35,29.4 c0.1,13.2-0.1,26.3,0.1,39.5c0,3.9-1.2,5.5-5.2,5.2c-4,0-8,0-12,0.2c-3.5,0.2-4.7-1.3-4.7-4.7c0.1-10.3,0.1-20.7,0-31 c0-2.3-0.1-4.7-0.5-7c-1.3-8.4-5.4-12.3-12.9-12.6c-8.4-0.3-14.3,3.9-16,11.9c-2,9.6-0.7,19.3-0.9,28.9 c-0.2,14.4,0,14.4-14.4,14.4c-7.8,0-7.9,0-7.9-8c0-19.5,0-39,0-58.5C339,223.3,339.2,223.2,346.2,222.9z" }),
        /* @__PURE__ */ d.jsx("path", { fill: "currentColor", d: "M543.2,258.4c-0.1,11.1-0.3,21.8-0.2,32.4c0,4-1.2,5.9-5.4,5.6c-4.3-0.3-8.7-0.1-13-0.1 c-2.7,0-3.9-1.3-3.9-4c0-21.8,0-43.6,0-65.5c0-2.8,1.3-3.9,3.9-4c2.8,0,5.7,0,8.5-0.1c4.8-0.2,9.6-0.5,8.7,6.4 c2.1,0.8,2.8-0.7,3.9-1.3c2.3-1.2,4.5-2.8,7-3.8c11.8-4.7,14.3-3,14.3,9.3c0,0.8-0.1,1.7,0,2.5c0.6,4.6-1,6.4-6,6.5 C550,242.6,544.8,247.5,543.2,258.4z" })
      ]
    }
  );
}, X3 = "0.3.0", gg = {
  version: X3
}, Y0 = ({
  activeTab: n,
  onNavigate: r,
  isMobile: l,
  isOpen: a = !1,
  onClose: s,
  onShowUpdateNotice: u,
  hasUnreadUpdate: f
}) => {
  const h = (g) => {
    r(g), l && s && s();
  }, p = () => /* @__PURE__ */ d.jsxs("div", { className: "pt-4 border-t border-border/30 mt-2 space-y-2", children: [
    /* @__PURE__ */ d.jsxs(
      "button",
      {
        onClick: u,
        className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left",
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ d.jsx(by, { size: 16, strokeWidth: 1.5 }),
            f && /* @__PURE__ */ d.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
          ] }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs", children: "更新通知" }),
          f && /* @__PURE__ */ d.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs(
      "a",
      {
        href: "https://github.com/shiyue137mh-netizen/Engram",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10",
        title: "点个星⭐支持一下",
        children: [
          /* @__PURE__ */ d.jsx(Wy, { size: 16, strokeWidth: 1.5, className: "group-hover:text-primary transition-colors" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs", children: "GitHub" }),
          /* @__PURE__ */ d.jsx("span", { className: "ml-auto text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: "Star ⭐" })
        ]
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 px-2 py-1 opacity-50", children: [
      /* @__PURE__ */ d.jsx(Y3, { height: 12 }),
      /* @__PURE__ */ d.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
        "v",
        gg.version
      ] })
    ] })
  ] });
  return l && !a ? null : l ? /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex justify-start",
      style: { height: "100dvh", width: "100vw" },
      children: [
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",
            onClick: s
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            id: "mobile-menu-drawer",
            className: "relative w-64 max-w-[80vw] h-full bg-sidebar border-r border-border shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300",
            style: { height: "100dvh" },
            children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-center mb-8", children: [
                /* @__PURE__ */ d.jsx("span", { className: "text-lg font-semibold text-sidebar-foreground/80", children: "导航" }),
                /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    onClick: s,
                    className: "p-2 -mr-2 rounded-md hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors",
                    children: /* @__PURE__ */ d.jsx(vs, { size: 20 })
                  }
                )
              ] }),
              /* @__PURE__ */ d.jsx("nav", { className: "space-y-2 flex-1 overflow-y-auto", children: G0.map((g) => {
                const y = g.icon, x = n === g.id;
                return /* @__PURE__ */ d.jsxs(
                  "button",
                  {
                    onClick: () => h(g.id),
                    className: `
                                    w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                    ${x ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                `,
                    children: [
                      /* @__PURE__ */ d.jsx(y, { size: 22, className: x ? "text-primary" : "text-muted-foreground/70" }),
                      /* @__PURE__ */ d.jsx("span", { children: g.label })
                    ]
                  },
                  g.id
                );
              }) }),
              /* @__PURE__ */ d.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ d.jsx(p, {}) })
            ]
          }
        )
      ]
    }
  ) : /* @__PURE__ */ d.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50 animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both", style: { animationDelay: "100ms", animationFillMode: "both" }, children: [
    /* @__PURE__ */ d.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: G0.map((g) => {
      const y = g.icon, x = n === g.id;
      return /* @__PURE__ */ d.jsxs(
        "button",
        {
          onClick: () => h(g.id),
          className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${x ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
          children: [
            /* @__PURE__ */ d.jsx(y, { size: 18, strokeWidth: x ? 2 : 1.5, className: "flex-shrink-0" }),
            /* @__PURE__ */ d.jsx("span", { className: `text-xs ${x ? "font-medium" : "font-normal"}`, children: g.label })
          ]
        },
        g.id
      );
    }) }),
    /* @__PURE__ */ d.jsx("div", { className: "pb-3", children: /* @__PURE__ */ d.jsx(p, {}) })
  ] });
}, Yo = {
  timeOut: 5e3,
  extendedTimeOut: 1e3,
  closeButton: !0,
  progressBar: !0
}, Pr = class Pr {
  constructor() {
  }
  static getInstance() {
    return Pr.instance || (Pr.instance = new Pr()), Pr.instance;
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
  success(r, l = "Engram", a = {}) {
    const s = this.getToastr();
    s ? s.success(r, l, { ...Yo, ...a }) : console.log(`[Engram] SUCCESS: ${l} - ${r}`), ge.info("Notification", `Success: ${r}`);
  }
  /**
   * 发送信息通知
   */
  info(r, l = "Engram", a = {}) {
    const s = this.getToastr();
    s ? s.info(r, l, { ...Yo, ...a }) : console.log(`[Engram] INFO: ${l} - ${r}`), ge.info("Notification", `Info: ${r}`);
  }
  /**
   * 发送警告通知
   */
  warning(r, l = "Engram", a = {}) {
    const s = this.getToastr();
    s ? s.warning(r, l, { ...Yo, ...a }) : console.warn(`[Engram] WARNING: ${l} - ${r}`), ge.warn("Notification", `Warning: ${r}`);
  }
  /**
   * 发送错误通知
   */
  error(r, l = "Engram", a = {}) {
    const s = this.getToastr();
    s ? s.error(r, l, { ...Yo, timeOut: 8e3, ...a }) : console.error(`[Engram] ERROR: ${l} - ${r}`), ge.error("Notification", `Error: ${r}`);
  }
  /**
   * 清除所有通知
   */
  clear() {
    const r = this.getToastr();
    r && r.clear();
  }
};
Je(Pr, "instance");
let Af = Pr;
const St = Af.getInstance(), $l = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
}, Xo = gg.version;
let na = null, ra = null;
function tf(n, r) {
  const l = n.split(".").map(Number), a = r.split(".").map(Number);
  for (let s = 0; s < Math.max(l.length, a.length); s++) {
    const u = l[s] || 0, f = a[s] || 0;
    if (u > f) return 1;
    if (u < f) return -1;
  }
  return 0;
}
class Qr {
  /**
   * 获取当前版本
   */
  static getCurrentVersion() {
    return Xo;
  }
  /**
   * 从 GitHub 获取最新版本号
   */
  static async getLatestVersion() {
    if (na)
      return na;
    try {
      const r = `https://raw.githubusercontent.com/${$l.owner}/${$l.repo}/${$l.branch}/manifest.json`, l = await fetch(r);
      return l.ok ? (na = (await l.json()).version || null, na) : null;
    } catch {
      return null;
    }
  }
  /**
   * 检查是否有更新
   */
  static async hasUpdate() {
    const r = await this.getLatestVersion();
    return r ? tf(r, Xo) > 0 : !1;
  }
  /**
   * 获取更新日志
   */
  static async getChangelog() {
    if (ra)
      return ra;
    try {
      const r = `https://raw.githubusercontent.com/${$l.owner}/${$l.repo}/${$l.branch}/CHANGELOG.md`, l = await fetch(r);
      return l.ok ? (ra = await l.text(), ra) : (console.warn("[Engram] UpdateService: 获取更新日志失败", l.status), St.warning(`获取更新日志失败: ${l.status}`, "更新检测"), null);
    } catch (r) {
      return console.error("[Engram] UpdateService: 获取更新日志异常", r), St.error("获取更新日志异常", "更新检测"), null;
    }
  }
  /**
   * 获取已读版本（上次用户确认查看的版本）
   */
  static getReadVersion() {
    try {
      return Ee.get("lastReadVersion") || "0.0.0";
    } catch {
      return "0.0.0";
    }
  }
  /**
   * 标记版本已读
   */
  static async markAsRead(r) {
    const l = r || await this.getLatestVersion() || Xo;
    try {
      Ee.set("lastReadVersion", l), console.debug("[Engram] UpdateService: 已标记版本已读", l);
    } catch (a) {
      console.error("[Engram] UpdateService: 标记已读失败", a);
    }
  }
  /**
   * 检查是否有未读更新
   */
  static async hasUnreadUpdate() {
    const r = await this.getLatestVersion();
    if (!r || tf(r, Xo) <= 0)
      return !1;
    const l = this.getReadVersion();
    return tf(r, l) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    na = null, ra = null;
  }
}
function Q3(n, r) {
  const l = {};
  return (n[n.length - 1] === "" ? [...n, ""] : n).join(
    (l.padRight ? " " : "") + "," + (l.padLeft === !1 ? "" : " ")
  ).trim();
}
const P3 = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Z3 = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, K3 = {};
function X0(n, r) {
  return (K3.jsx ? Z3 : P3).test(n);
}
const W3 = /[ \t\n\f\r]/g;
function J3(n) {
  return typeof n == "object" ? n.type === "text" ? Q0(n.value) : !1 : Q0(n);
}
function Q0(n) {
  return n.replace(W3, "") === "";
}
class Sa {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(r, l, a) {
    this.normal = l, this.property = r, a && (this.space = a);
  }
}
Sa.prototype.normal = {};
Sa.prototype.property = {};
Sa.prototype.space = void 0;
function xg(n, r) {
  const l = {}, a = {};
  for (const s of n)
    Object.assign(l, s.property), Object.assign(a, s.normal);
  return new Sa(l, a, r);
}
function zf(n) {
  return n.toLowerCase();
}
class qt {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(r, l) {
    this.attribute = l, this.property = r;
  }
}
qt.prototype.attribute = "";
qt.prototype.booleanish = !1;
qt.prototype.boolean = !1;
qt.prototype.commaOrSpaceSeparated = !1;
qt.prototype.commaSeparated = !1;
qt.prototype.defined = !1;
qt.prototype.mustUseProperty = !1;
qt.prototype.number = !1;
qt.prototype.overloadedBoolean = !1;
qt.prototype.property = "";
qt.prototype.spaceSeparated = !1;
qt.prototype.space = void 0;
let e5 = 0;
const we = tl(), ut = tl(), _f = tl(), ne = tl(), Pe = tl(), Jl = tl(), Pt = tl();
function tl() {
  return 2 ** ++e5;
}
const Mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: we,
  booleanish: ut,
  commaOrSpaceSeparated: Pt,
  commaSeparated: Jl,
  number: ne,
  overloadedBoolean: _f,
  spaceSeparated: Pe
}, Symbol.toStringTag, { value: "Module" })), nf = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Mf)
);
class td extends qt {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(r, l, a, s) {
    let u = -1;
    if (super(r, l), P0(this, "space", s), typeof a == "number")
      for (; ++u < nf.length; ) {
        const f = nf[u];
        P0(this, nf[u], (a & Mf[f]) === Mf[f]);
      }
  }
}
td.prototype.defined = !0;
function P0(n, r, l) {
  l && (n[r] = l);
}
function ii(n) {
  const r = {}, l = {};
  for (const [a, s] of Object.entries(n.properties)) {
    const u = new td(
      a,
      n.transform(n.attributes || {}, a),
      s,
      n.space
    );
    n.mustUseProperty && n.mustUseProperty.includes(a) && (u.mustUseProperty = !0), r[a] = u, l[zf(a)] = a, l[zf(u.attribute)] = a;
  }
  return new Sa(r, l, n.space);
}
const yg = ii({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ut,
    ariaAutoComplete: null,
    ariaBusy: ut,
    ariaChecked: ut,
    ariaColCount: ne,
    ariaColIndex: ne,
    ariaColSpan: ne,
    ariaControls: Pe,
    ariaCurrent: null,
    ariaDescribedBy: Pe,
    ariaDetails: null,
    ariaDisabled: ut,
    ariaDropEffect: Pe,
    ariaErrorMessage: null,
    ariaExpanded: ut,
    ariaFlowTo: Pe,
    ariaGrabbed: ut,
    ariaHasPopup: null,
    ariaHidden: ut,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Pe,
    ariaLevel: ne,
    ariaLive: null,
    ariaModal: ut,
    ariaMultiLine: ut,
    ariaMultiSelectable: ut,
    ariaOrientation: null,
    ariaOwns: Pe,
    ariaPlaceholder: null,
    ariaPosInSet: ne,
    ariaPressed: ut,
    ariaReadOnly: ut,
    ariaRelevant: null,
    ariaRequired: ut,
    ariaRoleDescription: Pe,
    ariaRowCount: ne,
    ariaRowIndex: ne,
    ariaRowSpan: ne,
    ariaSelected: ut,
    ariaSetSize: ne,
    ariaSort: null,
    ariaValueMax: ne,
    ariaValueMin: ne,
    ariaValueNow: ne,
    ariaValueText: null,
    role: null
  },
  transform(n, r) {
    return r === "role" ? r : "aria-" + r.slice(4).toLowerCase();
  }
});
function bg(n, r) {
  return r in n ? n[r] : r;
}
function vg(n, r) {
  return bg(n, r.toLowerCase());
}
const t5 = ii({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Jl,
    acceptCharset: Pe,
    accessKey: Pe,
    action: null,
    allow: null,
    allowFullScreen: we,
    allowPaymentRequest: we,
    allowUserMedia: we,
    alt: null,
    as: null,
    async: we,
    autoCapitalize: null,
    autoComplete: Pe,
    autoFocus: we,
    autoPlay: we,
    blocking: Pe,
    capture: null,
    charSet: null,
    checked: we,
    cite: null,
    className: Pe,
    cols: ne,
    colSpan: null,
    content: null,
    contentEditable: ut,
    controls: we,
    controlsList: Pe,
    coords: ne | Jl,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: we,
    defer: we,
    dir: null,
    dirName: null,
    disabled: we,
    download: _f,
    draggable: ut,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: we,
    formTarget: null,
    headers: Pe,
    height: ne,
    hidden: _f,
    high: ne,
    href: null,
    hrefLang: null,
    htmlFor: Pe,
    httpEquiv: Pe,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: we,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: we,
    itemId: null,
    itemProp: Pe,
    itemRef: Pe,
    itemScope: we,
    itemType: Pe,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: we,
    low: ne,
    manifest: null,
    max: null,
    maxLength: ne,
    media: null,
    method: null,
    min: null,
    minLength: ne,
    multiple: we,
    muted: we,
    name: null,
    nonce: null,
    noModule: we,
    noValidate: we,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: we,
    optimum: ne,
    pattern: null,
    ping: Pe,
    placeholder: null,
    playsInline: we,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: we,
    referrerPolicy: null,
    rel: Pe,
    required: we,
    reversed: we,
    rows: ne,
    rowSpan: ne,
    sandbox: Pe,
    scope: null,
    scoped: we,
    seamless: we,
    selected: we,
    shadowRootClonable: we,
    shadowRootDelegatesFocus: we,
    shadowRootMode: null,
    shape: null,
    size: ne,
    sizes: null,
    slot: null,
    span: ne,
    spellCheck: ut,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: ne,
    step: null,
    style: null,
    tabIndex: ne,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: we,
    useMap: null,
    value: ut,
    width: ne,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Pe,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: ne,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: ne,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: we,
    // Lists. Use CSS to reduce space between items instead
    declare: we,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: ne,
    // `<img>` and `<object>`
    leftMargin: ne,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: ne,
    // `<body>`
    marginWidth: ne,
    // `<body>`
    noResize: we,
    // `<frame>`
    noHref: we,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: we,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: we,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: ne,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ut,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: ne,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: ne,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: we,
    disableRemotePlayback: we,
    prefix: null,
    property: null,
    results: ne,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: vg
}), n5 = ii({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: Pt,
    accentHeight: ne,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: ne,
    amplitude: ne,
    arabicForm: null,
    ascent: ne,
    attributeName: null,
    attributeType: null,
    azimuth: ne,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: ne,
    by: null,
    calcMode: null,
    capHeight: ne,
    className: Pe,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: ne,
    diffuseConstant: ne,
    direction: null,
    display: null,
    dur: null,
    divisor: ne,
    dominantBaseline: null,
    download: we,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: ne,
    enableBackground: null,
    end: null,
    event: null,
    exponent: ne,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: ne,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Jl,
    g2: Jl,
    glyphName: Jl,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: ne,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: ne,
    horizOriginX: ne,
    horizOriginY: ne,
    id: null,
    ideographic: ne,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: ne,
    k: ne,
    k1: ne,
    k2: ne,
    k3: ne,
    k4: ne,
    kernelMatrix: Pt,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: ne,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: ne,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: ne,
    overlineThickness: ne,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: ne,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Pe,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: ne,
    pointsAtY: ne,
    pointsAtZ: ne,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Pt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Pt,
    rev: Pt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Pt,
    requiredFeatures: Pt,
    requiredFonts: Pt,
    requiredFormats: Pt,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: ne,
    specularExponent: ne,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: ne,
    strikethroughThickness: ne,
    string: null,
    stroke: null,
    strokeDashArray: Pt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: ne,
    strokeOpacity: ne,
    strokeWidth: null,
    style: null,
    surfaceScale: ne,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Pt,
    tabIndex: ne,
    tableValues: null,
    target: null,
    targetX: ne,
    targetY: ne,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Pt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: ne,
    underlineThickness: ne,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: ne,
    values: null,
    vAlphabetic: ne,
    vMathematical: ne,
    vectorEffect: null,
    vHanging: ne,
    vIdeographic: ne,
    version: null,
    vertAdvY: ne,
    vertOriginX: ne,
    vertOriginY: ne,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: ne,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: bg
}), Sg = ii({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(n, r) {
    return "xlink:" + r.slice(5).toLowerCase();
  }
}), kg = ii({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: vg
}), Cg = ii({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(n, r) {
    return "xml:" + r.slice(3).toLowerCase();
  }
}), r5 = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, l5 = /[A-Z]/g, Z0 = /-[a-z]/g, i5 = /^data[-\w.:]+$/i;
function a5(n, r) {
  const l = zf(r);
  let a = r, s = qt;
  if (l in n.normal)
    return n.property[n.normal[l]];
  if (l.length > 4 && l.slice(0, 4) === "data" && i5.test(r)) {
    if (r.charAt(4) === "-") {
      const u = r.slice(5).replace(Z0, s5);
      a = "data" + u.charAt(0).toUpperCase() + u.slice(1);
    } else {
      const u = r.slice(4);
      if (!Z0.test(u)) {
        let f = u.replace(l5, o5);
        f.charAt(0) !== "-" && (f = "-" + f), r = "data" + f;
      }
    }
    s = td;
  }
  return new s(a, r);
}
function o5(n) {
  return "-" + n.toLowerCase();
}
function s5(n) {
  return n.charAt(1).toUpperCase();
}
const u5 = xg([yg, t5, Sg, kg, Cg], "html"), nd = xg([yg, n5, Sg, kg, Cg], "svg");
function c5(n) {
  return n.join(" ").trim();
}
var Gl = {}, rf, K0;
function f5() {
  if (K0) return rf;
  K0 = 1;
  var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, l = /^\s*/, a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, s = /^:\s*/, u = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, f = /^[;\s]*/, h = /^\s+|\s+$/g, p = `
`, g = "/", y = "*", x = "", S = "comment", v = "declaration";
  function C(M, T) {
    if (typeof M != "string")
      throw new TypeError("First argument must be a string");
    if (!M) return [];
    T = T || {};
    var I = 1, L = 1;
    function re(ie) {
      var ee = ie.match(r);
      ee && (I += ee.length);
      var B = ie.lastIndexOf(p);
      L = ~B ? ie.length - B : L + ie.length;
    }
    function le() {
      var ie = { line: I, column: L };
      return function(ee) {
        return ee.position = new _(ie), fe(), ee;
      };
    }
    function _(ie) {
      this.start = ie, this.end = { line: I, column: L }, this.source = T.source;
    }
    _.prototype.content = M;
    function U(ie) {
      var ee = new Error(
        T.source + ":" + I + ":" + L + ": " + ie
      );
      if (ee.reason = ie, ee.filename = T.source, ee.line = I, ee.column = L, ee.source = M, !T.silent) throw ee;
    }
    function ae(ie) {
      var ee = ie.exec(M);
      if (ee) {
        var B = ee[0];
        return re(B), M = M.slice(B.length), ee;
      }
    }
    function fe() {
      ae(l);
    }
    function R(ie) {
      var ee;
      for (ie = ie || []; ee = O(); )
        ee !== !1 && ie.push(ee);
      return ie;
    }
    function O() {
      var ie = le();
      if (!(g != M.charAt(0) || y != M.charAt(1))) {
        for (var ee = 2; x != M.charAt(ee) && (y != M.charAt(ee) || g != M.charAt(ee + 1)); )
          ++ee;
        if (ee += 2, x === M.charAt(ee - 1))
          return U("End of comment missing");
        var B = M.slice(2, ee - 2);
        return L += 2, re(B), M = M.slice(ee), L += 2, ie({
          type: S,
          comment: B
        });
      }
    }
    function J() {
      var ie = le(), ee = ae(a);
      if (ee) {
        if (O(), !ae(s)) return U("property missing ':'");
        var B = ae(u), Y = ie({
          type: v,
          property: j(ee[0].replace(n, x)),
          value: B ? j(B[0].replace(n, x)) : x
        });
        return ae(f), Y;
      }
    }
    function ue() {
      var ie = [];
      R(ie);
      for (var ee; ee = J(); )
        ee !== !1 && (ie.push(ee), R(ie));
      return ie;
    }
    return fe(), ue();
  }
  function j(M) {
    return M ? M.replace(h, x) : x;
  }
  return rf = C, rf;
}
var W0;
function d5() {
  if (W0) return Gl;
  W0 = 1;
  var n = Gl && Gl.__importDefault || function(a) {
    return a && a.__esModule ? a : { default: a };
  };
  Object.defineProperty(Gl, "__esModule", { value: !0 }), Gl.default = l;
  const r = n(f5());
  function l(a, s) {
    let u = null;
    if (!a || typeof a != "string")
      return u;
    const f = (0, r.default)(a), h = typeof s == "function";
    return f.forEach((p) => {
      if (p.type !== "declaration")
        return;
      const { property: g, value: y } = p;
      h ? s(g, y, p) : y && (u = u || {}, u[g] = y);
    }), u;
  }
  return Gl;
}
var la = {}, J0;
function m5() {
  if (J0) return la;
  J0 = 1, Object.defineProperty(la, "__esModule", { value: !0 }), la.camelCase = void 0;
  var n = /^--[a-zA-Z0-9_-]+$/, r = /-([a-z])/g, l = /^[^-]+$/, a = /^-(webkit|moz|ms|o|khtml)-/, s = /^-(ms)-/, u = function(g) {
    return !g || l.test(g) || n.test(g);
  }, f = function(g, y) {
    return y.toUpperCase();
  }, h = function(g, y) {
    return "".concat(y, "-");
  }, p = function(g, y) {
    return y === void 0 && (y = {}), u(g) ? g : (g = g.toLowerCase(), y.reactCompat ? g = g.replace(s, h) : g = g.replace(a, h), g.replace(r, f));
  };
  return la.camelCase = p, la;
}
var ia, ep;
function h5() {
  if (ep) return ia;
  ep = 1;
  var n = ia && ia.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  }, r = n(d5()), l = m5();
  function a(s, u) {
    var f = {};
    return !s || typeof s != "string" || (0, r.default)(s, function(h, p) {
      h && p && (f[(0, l.camelCase)(h, u)] = p);
    }), f;
  }
  return a.default = a, ia = a, ia;
}
var p5 = h5();
const g5 = /* @__PURE__ */ ni(p5), wg = Eg("end"), rd = Eg("start");
function Eg(n) {
  return r;
  function r(l) {
    const a = l && l.position && l.position[n] || {};
    if (typeof a.line == "number" && a.line > 0 && typeof a.column == "number" && a.column > 0)
      return {
        line: a.line,
        column: a.column,
        offset: typeof a.offset == "number" && a.offset > -1 ? a.offset : void 0
      };
  }
}
function x5(n) {
  const r = rd(n), l = wg(n);
  if (r && l)
    return { start: r, end: l };
}
function fa(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? tp(n.position) : "start" in n || "end" in n ? tp(n) : "line" in n || "column" in n ? Of(n) : "";
}
function Of(n) {
  return np(n && n.line) + ":" + np(n && n.column);
}
function tp(n) {
  return Of(n && n.start) + "-" + Of(n && n.end);
}
function np(n) {
  return n && typeof n == "number" ? n : 1;
}
class Ct extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(r, l, a) {
    super(), typeof l == "string" && (a = l, l = void 0);
    let s = "", u = {}, f = !1;
    if (l && ("line" in l && "column" in l ? u = { place: l } : "start" in l && "end" in l ? u = { place: l } : "type" in l ? u = {
      ancestors: [l],
      place: l.position
    } : u = { ...l }), typeof r == "string" ? s = r : !u.cause && r && (f = !0, s = r.message, u.cause = r), !u.ruleId && !u.source && typeof a == "string") {
      const p = a.indexOf(":");
      p === -1 ? u.ruleId = a : (u.source = a.slice(0, p), u.ruleId = a.slice(p + 1));
    }
    if (!u.place && u.ancestors && u.ancestors) {
      const p = u.ancestors[u.ancestors.length - 1];
      p && (u.place = p.position);
    }
    const h = u.place && "start" in u.place ? u.place.start : u.place;
    this.ancestors = u.ancestors || void 0, this.cause = u.cause || void 0, this.column = h ? h.column : void 0, this.fatal = void 0, this.file = "", this.message = s, this.line = h ? h.line : void 0, this.name = fa(u.place) || "1:1", this.place = u.place || void 0, this.reason = this.message, this.ruleId = u.ruleId || void 0, this.source = u.source || void 0, this.stack = f && u.cause && typeof u.cause.stack == "string" ? u.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Ct.prototype.file = "";
Ct.prototype.name = "";
Ct.prototype.reason = "";
Ct.prototype.message = "";
Ct.prototype.stack = "";
Ct.prototype.column = void 0;
Ct.prototype.line = void 0;
Ct.prototype.ancestors = void 0;
Ct.prototype.cause = void 0;
Ct.prototype.fatal = void 0;
Ct.prototype.place = void 0;
Ct.prototype.ruleId = void 0;
Ct.prototype.source = void 0;
const ld = {}.hasOwnProperty, y5 = /* @__PURE__ */ new Map(), b5 = /[A-Z]/g, v5 = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), S5 = /* @__PURE__ */ new Set(["td", "th"]), jg = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function k5(n, r) {
  if (!r || r.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const l = r.filePath || void 0;
  let a;
  if (r.development) {
    if (typeof r.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    a = z5(l, r.jsxDEV);
  } else {
    if (typeof r.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof r.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    a = A5(l, r.jsx, r.jsxs);
  }
  const s = {
    Fragment: r.Fragment,
    ancestors: [],
    components: r.components || {},
    create: a,
    elementAttributeNameCase: r.elementAttributeNameCase || "react",
    evaluater: r.createEvaluater ? r.createEvaluater() : void 0,
    filePath: l,
    ignoreInvalidStyle: r.ignoreInvalidStyle || !1,
    passKeys: r.passKeys !== !1,
    passNode: r.passNode || !1,
    schema: r.space === "svg" ? nd : u5,
    stylePropertyNameCase: r.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: r.tableCellAlignToStyle !== !1
  }, u = Ng(s, n, void 0);
  return u && typeof u != "string" ? u : s.create(
    n,
    s.Fragment,
    { children: u || void 0 },
    void 0
  );
}
function Ng(n, r, l) {
  if (r.type === "element")
    return C5(n, r, l);
  if (r.type === "mdxFlowExpression" || r.type === "mdxTextExpression")
    return w5(n, r);
  if (r.type === "mdxJsxFlowElement" || r.type === "mdxJsxTextElement")
    return j5(n, r, l);
  if (r.type === "mdxjsEsm")
    return E5(n, r);
  if (r.type === "root")
    return N5(n, r, l);
  if (r.type === "text")
    return T5(n, r);
}
function C5(n, r, l) {
  const a = n.schema;
  let s = a;
  r.tagName.toLowerCase() === "svg" && a.space === "html" && (s = nd, n.schema = s), n.ancestors.push(r);
  const u = Ag(n, r.tagName, !1), f = _5(n, r);
  let h = ad(n, r);
  return v5.has(r.tagName) && (h = h.filter(function(p) {
    return typeof p == "string" ? !J3(p) : !0;
  })), Tg(n, f, u, r), id(f, h), n.ancestors.pop(), n.schema = a, n.create(r, u, f, l);
}
function w5(n, r) {
  if (r.data && r.data.estree && n.evaluater) {
    const a = r.data.estree.body[0];
    return a.type, /** @type {Child | undefined} */
    n.evaluater.evaluateExpression(a.expression);
  }
  pa(n, r.position);
}
function E5(n, r) {
  if (r.data && r.data.estree && n.evaluater)
    return (
      /** @type {Child | undefined} */
      n.evaluater.evaluateProgram(r.data.estree)
    );
  pa(n, r.position);
}
function j5(n, r, l) {
  const a = n.schema;
  let s = a;
  r.name === "svg" && a.space === "html" && (s = nd, n.schema = s), n.ancestors.push(r);
  const u = r.name === null ? n.Fragment : Ag(n, r.name, !0), f = M5(n, r), h = ad(n, r);
  return Tg(n, f, u, r), id(f, h), n.ancestors.pop(), n.schema = a, n.create(r, u, f, l);
}
function N5(n, r, l) {
  const a = {};
  return id(a, ad(n, r)), n.create(r, n.Fragment, a, l);
}
function T5(n, r) {
  return r.value;
}
function Tg(n, r, l, a) {
  typeof l != "string" && l !== n.Fragment && n.passNode && (r.node = a);
}
function id(n, r) {
  if (r.length > 0) {
    const l = r.length > 1 ? r : r[0];
    l && (n.children = l);
  }
}
function A5(n, r, l) {
  return a;
  function a(s, u, f, h) {
    const g = Array.isArray(f.children) ? l : r;
    return h ? g(u, f, h) : g(u, f);
  }
}
function z5(n, r) {
  return l;
  function l(a, s, u, f) {
    const h = Array.isArray(u.children), p = rd(a);
    return r(
      s,
      u,
      f,
      h,
      {
        columnNumber: p ? p.column - 1 : void 0,
        fileName: n,
        lineNumber: p ? p.line : void 0
      },
      void 0
    );
  }
}
function _5(n, r) {
  const l = {};
  let a, s;
  for (s in r.properties)
    if (s !== "children" && ld.call(r.properties, s)) {
      const u = O5(n, s, r.properties[s]);
      if (u) {
        const [f, h] = u;
        n.tableCellAlignToStyle && f === "align" && typeof h == "string" && S5.has(r.tagName) ? a = h : l[f] = h;
      }
    }
  if (a) {
    const u = (
      /** @type {Style} */
      l.style || (l.style = {})
    );
    u[n.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = a;
  }
  return l;
}
function M5(n, r) {
  const l = {};
  for (const a of r.attributes)
    if (a.type === "mdxJsxExpressionAttribute")
      if (a.data && a.data.estree && n.evaluater) {
        const u = a.data.estree.body[0];
        u.type;
        const f = u.expression;
        f.type;
        const h = f.properties[0];
        h.type, Object.assign(
          l,
          n.evaluater.evaluateExpression(h.argument)
        );
      } else
        pa(n, r.position);
    else {
      const s = a.name;
      let u;
      if (a.value && typeof a.value == "object")
        if (a.value.data && a.value.data.estree && n.evaluater) {
          const h = a.value.data.estree.body[0];
          h.type, u = n.evaluater.evaluateExpression(h.expression);
        } else
          pa(n, r.position);
      else
        u = a.value === null ? !0 : a.value;
      l[s] = /** @type {Props[keyof Props]} */
      u;
    }
  return l;
}
function ad(n, r) {
  const l = [];
  let a = -1;
  const s = n.passKeys ? /* @__PURE__ */ new Map() : y5;
  for (; ++a < r.children.length; ) {
    const u = r.children[a];
    let f;
    if (n.passKeys) {
      const p = u.type === "element" ? u.tagName : u.type === "mdxJsxFlowElement" || u.type === "mdxJsxTextElement" ? u.name : void 0;
      if (p) {
        const g = s.get(p) || 0;
        f = p + "-" + g, s.set(p, g + 1);
      }
    }
    const h = Ng(n, u, f);
    h !== void 0 && l.push(h);
  }
  return l;
}
function O5(n, r, l) {
  const a = a5(n.schema, r);
  if (!(l == null || typeof l == "number" && Number.isNaN(l))) {
    if (Array.isArray(l) && (l = a.commaSeparated ? Q3(l) : c5(l)), a.property === "style") {
      let s = typeof l == "object" ? l : D5(n, String(l));
      return n.stylePropertyNameCase === "css" && (s = R5(s)), ["style", s];
    }
    return [
      n.elementAttributeNameCase === "react" && a.space ? r5[a.property] || a.property : a.attribute,
      l
    ];
  }
}
function D5(n, r) {
  try {
    return g5(r, { reactCompat: !0 });
  } catch (l) {
    if (n.ignoreInvalidStyle)
      return {};
    const a = (
      /** @type {Error} */
      l
    ), s = new Ct("Cannot parse `style` attribute", {
      ancestors: n.ancestors,
      cause: a,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw s.file = n.filePath || void 0, s.url = jg + "#cannot-parse-style-attribute", s;
  }
}
function Ag(n, r, l) {
  let a;
  if (!l)
    a = { type: "Literal", value: r };
  else if (r.includes(".")) {
    const s = r.split(".");
    let u = -1, f;
    for (; ++u < s.length; ) {
      const h = X0(s[u]) ? { type: "Identifier", name: s[u] } : { type: "Literal", value: s[u] };
      f = f ? {
        type: "MemberExpression",
        object: f,
        property: h,
        computed: !!(u && h.type === "Literal"),
        optional: !1
      } : h;
    }
    a = f;
  } else
    a = X0(r) && !/^[a-z]/.test(r) ? { type: "Identifier", name: r } : { type: "Literal", value: r };
  if (a.type === "Literal") {
    const s = (
      /** @type {string | number} */
      a.value
    );
    return ld.call(n.components, s) ? n.components[s] : s;
  }
  if (n.evaluater)
    return n.evaluater.evaluateExpression(a);
  pa(n);
}
function pa(n, r) {
  const l = new Ct(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: n.ancestors,
      place: r,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw l.file = n.filePath || void 0, l.url = jg + "#cannot-handle-mdx-estrees-without-createevaluater", l;
}
function R5(n) {
  const r = {};
  let l;
  for (l in n)
    ld.call(n, l) && (r[L5(l)] = n[l]);
  return r;
}
function L5(n) {
  let r = n.replace(b5, U5);
  return r.slice(0, 3) === "ms-" && (r = "-" + r), r;
}
function U5(n) {
  return "-" + n.toLowerCase();
}
const lf = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, B5 = {};
function od(n, r) {
  const l = B5, a = typeof l.includeImageAlt == "boolean" ? l.includeImageAlt : !0, s = typeof l.includeHtml == "boolean" ? l.includeHtml : !0;
  return zg(n, a, s);
}
function zg(n, r, l) {
  if (H5(n)) {
    if ("value" in n)
      return n.type === "html" && !l ? "" : n.value;
    if (r && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return rp(n.children, r, l);
  }
  return Array.isArray(n) ? rp(n, r, l) : "";
}
function rp(n, r, l) {
  const a = [];
  let s = -1;
  for (; ++s < n.length; )
    a[s] = zg(n[s], r, l);
  return a.join("");
}
function H5(n) {
  return !!(n && typeof n == "object");
}
const lp = document.createElement("i");
function sd(n) {
  const r = "&" + n + ";";
  lp.innerHTML = r;
  const l = lp.textContent;
  return (
    // @ts-expect-error: TypeScript is wrong that `textContent` on elements can
    // yield `null`.
    l.charCodeAt(l.length - 1) === 59 && n !== "semi" || l === r ? !1 : l
  );
}
function Wt(n, r, l, a) {
  const s = n.length;
  let u = 0, f;
  if (r < 0 ? r = -r > s ? 0 : s + r : r = r > s ? s : r, l = l > 0 ? l : 0, a.length < 1e4)
    f = Array.from(a), f.unshift(r, l), n.splice(...f);
  else
    for (l && n.splice(r, l); u < a.length; )
      f = a.slice(u, u + 1e4), f.unshift(r, 0), n.splice(...f), u += 1e4, r += 1e4;
}
function cn(n, r) {
  return n.length > 0 ? (Wt(n, n.length, 0, r), n) : r;
}
const ip = {}.hasOwnProperty;
function _g(n) {
  const r = {};
  let l = -1;
  for (; ++l < n.length; )
    q5(r, n[l]);
  return r;
}
function q5(n, r) {
  let l;
  for (l in r) {
    const s = (ip.call(n, l) ? n[l] : void 0) || (n[l] = {}), u = r[l];
    let f;
    if (u)
      for (f in u) {
        ip.call(s, f) || (s[f] = []);
        const h = u[f];
        I5(
          // @ts-expect-error Looks like a list.
          s[f],
          Array.isArray(h) ? h : h ? [h] : []
        );
      }
  }
}
function I5(n, r) {
  let l = -1;
  const a = [];
  for (; ++l < r.length; )
    (r[l].add === "after" ? n : a).push(r[l]);
  Wt(n, 0, 0, a);
}
function Mg(n, r) {
  const l = Number.parseInt(n, r);
  return (
    // C0 except for HT, LF, FF, CR, space.
    l < 9 || l === 11 || l > 13 && l < 32 || // Control character (DEL) of C0, and C1 controls.
    l > 126 && l < 160 || // Lone high surrogates and low surrogates.
    l > 55295 && l < 57344 || // Noncharacters.
    l > 64975 && l < 65008 || /* eslint-disable no-bitwise */
    (l & 65535) === 65535 || (l & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    l > 1114111 ? "�" : String.fromCodePoint(l)
  );
}
function pn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Nt = Nr(/[A-Za-z]/), kt = Nr(/[\dA-Za-z]/), F5 = Nr(/[#-'*+\--9=?A-Z^-~]/);
function os(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const Df = Nr(/\d/), V5 = Nr(/[\dA-Fa-f]/), $5 = Nr(/[!-/:-@[-`{-~]/);
function ye(n) {
  return n !== null && n < -2;
}
function Qe(n) {
  return n !== null && (n < 0 || n === 32);
}
function Ae(n) {
  return n === -2 || n === -1 || n === 32;
}
const ks = Nr(new RegExp("\\p{P}|\\p{S}", "u")), Wr = Nr(/\s/);
function Nr(n) {
  return r;
  function r(l) {
    return l !== null && l > -1 && n.test(String.fromCharCode(l));
  }
}
function ai(n) {
  const r = [];
  let l = -1, a = 0, s = 0;
  for (; ++l < n.length; ) {
    const u = n.charCodeAt(l);
    let f = "";
    if (u === 37 && kt(n.charCodeAt(l + 1)) && kt(n.charCodeAt(l + 2)))
      s = 2;
    else if (u < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) || (f = String.fromCharCode(u));
    else if (u > 55295 && u < 57344) {
      const h = n.charCodeAt(l + 1);
      u < 56320 && h > 56319 && h < 57344 ? (f = String.fromCharCode(u, h), s = 1) : f = "�";
    } else
      f = String.fromCharCode(u);
    f && (r.push(n.slice(a, l), encodeURIComponent(f)), a = l + s + 1, f = ""), s && (l += s, s = 0);
  }
  return r.join("") + n.slice(a);
}
function Re(n, r, l, a) {
  const s = a ? a - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return f;
  function f(p) {
    return Ae(p) ? (n.enter(l), h(p)) : r(p);
  }
  function h(p) {
    return Ae(p) && u++ < s ? (n.consume(p), h) : (n.exit(l), r(p));
  }
}
const G5 = {
  tokenize: Y5
};
function Y5(n) {
  const r = n.attempt(this.parser.constructs.contentInitial, a, s);
  let l;
  return r;
  function a(h) {
    if (h === null) {
      n.consume(h);
      return;
    }
    return n.enter("lineEnding"), n.consume(h), n.exit("lineEnding"), Re(n, r, "linePrefix");
  }
  function s(h) {
    return n.enter("paragraph"), u(h);
  }
  function u(h) {
    const p = n.enter("chunkText", {
      contentType: "text",
      previous: l
    });
    return l && (l.next = p), l = p, f(h);
  }
  function f(h) {
    if (h === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(h);
      return;
    }
    return ye(h) ? (n.consume(h), n.exit("chunkText"), u) : (n.consume(h), f);
  }
}
const X5 = {
  tokenize: Q5
}, ap = {
  tokenize: P5
};
function Q5(n) {
  const r = this, l = [];
  let a = 0, s, u, f;
  return h;
  function h(L) {
    if (a < l.length) {
      const re = l[a];
      return r.containerState = re[1], n.attempt(re[0].continuation, p, g)(L);
    }
    return g(L);
  }
  function p(L) {
    if (a++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, s && I();
      const re = r.events.length;
      let le = re, _;
      for (; le--; )
        if (r.events[le][0] === "exit" && r.events[le][1].type === "chunkFlow") {
          _ = r.events[le][1].end;
          break;
        }
      T(a);
      let U = re;
      for (; U < r.events.length; )
        r.events[U][1].end = {
          ..._
        }, U++;
      return Wt(r.events, le + 1, 0, r.events.slice(re)), r.events.length = U, g(L);
    }
    return h(L);
  }
  function g(L) {
    if (a === l.length) {
      if (!s)
        return S(L);
      if (s.currentConstruct && s.currentConstruct.concrete)
        return C(L);
      r.interrupt = !!(s.currentConstruct && !s._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(ap, y, x)(L);
  }
  function y(L) {
    return s && I(), T(a), S(L);
  }
  function x(L) {
    return r.parser.lazy[r.now().line] = a !== l.length, f = r.now().offset, C(L);
  }
  function S(L) {
    return r.containerState = {}, n.attempt(ap, v, C)(L);
  }
  function v(L) {
    return a++, l.push([r.currentConstruct, r.containerState]), S(L);
  }
  function C(L) {
    if (L === null) {
      s && I(), T(0), n.consume(L);
      return;
    }
    return s = s || r.parser.flow(r.now()), n.enter("chunkFlow", {
      _tokenizer: s,
      contentType: "flow",
      previous: u
    }), j(L);
  }
  function j(L) {
    if (L === null) {
      M(n.exit("chunkFlow"), !0), T(0), n.consume(L);
      return;
    }
    return ye(L) ? (n.consume(L), M(n.exit("chunkFlow")), a = 0, r.interrupt = void 0, h) : (n.consume(L), j);
  }
  function M(L, re) {
    const le = r.sliceStream(L);
    if (re && le.push(null), L.previous = u, u && (u.next = L), u = L, s.defineSkip(L.start), s.write(le), r.parser.lazy[L.start.line]) {
      let _ = s.events.length;
      for (; _--; )
        if (
          // The token starts before the line ending…
          s.events[_][1].start.offset < f && // …and either is not ended yet…
          (!s.events[_][1].end || // …or ends after it.
          s.events[_][1].end.offset > f)
        )
          return;
      const U = r.events.length;
      let ae = U, fe, R;
      for (; ae--; )
        if (r.events[ae][0] === "exit" && r.events[ae][1].type === "chunkFlow") {
          if (fe) {
            R = r.events[ae][1].end;
            break;
          }
          fe = !0;
        }
      for (T(a), _ = U; _ < r.events.length; )
        r.events[_][1].end = {
          ...R
        }, _++;
      Wt(r.events, ae + 1, 0, r.events.slice(U)), r.events.length = _;
    }
  }
  function T(L) {
    let re = l.length;
    for (; re-- > L; ) {
      const le = l[re];
      r.containerState = le[1], le[0].exit.call(r, n);
    }
    l.length = L;
  }
  function I() {
    s.write([null]), u = void 0, s = void 0, r.containerState._closeFlow = void 0;
  }
}
function P5(n, r, l) {
  return Re(n, n.attempt(this.parser.constructs.document, r, l), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function ti(n) {
  if (n === null || Qe(n) || Wr(n))
    return 1;
  if (ks(n))
    return 2;
}
function Cs(n, r, l) {
  const a = [];
  let s = -1;
  for (; ++s < n.length; ) {
    const u = n[s].resolveAll;
    u && !a.includes(u) && (r = u(r, l), a.push(u));
  }
  return r;
}
const Rf = {
  name: "attention",
  resolveAll: Z5,
  tokenize: K5
};
function Z5(n, r) {
  let l = -1, a, s, u, f, h, p, g, y;
  for (; ++l < n.length; )
    if (n[l][0] === "enter" && n[l][1].type === "attentionSequence" && n[l][1]._close) {
      for (a = l; a--; )
        if (n[a][0] === "exit" && n[a][1].type === "attentionSequence" && n[a][1]._open && // If the markers are the same:
        r.sliceSerialize(n[a][1]).charCodeAt(0) === r.sliceSerialize(n[l][1]).charCodeAt(0)) {
          if ((n[a][1]._close || n[l][1]._open) && (n[l][1].end.offset - n[l][1].start.offset) % 3 && !((n[a][1].end.offset - n[a][1].start.offset + n[l][1].end.offset - n[l][1].start.offset) % 3))
            continue;
          p = n[a][1].end.offset - n[a][1].start.offset > 1 && n[l][1].end.offset - n[l][1].start.offset > 1 ? 2 : 1;
          const x = {
            ...n[a][1].end
          }, S = {
            ...n[l][1].start
          };
          op(x, -p), op(S, p), f = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: x,
            end: {
              ...n[a][1].end
            }
          }, h = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[l][1].start
            },
            end: S
          }, u = {
            type: p > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[a][1].end
            },
            end: {
              ...n[l][1].start
            }
          }, s = {
            type: p > 1 ? "strong" : "emphasis",
            start: {
              ...f.start
            },
            end: {
              ...h.end
            }
          }, n[a][1].end = {
            ...f.start
          }, n[l][1].start = {
            ...h.end
          }, g = [], n[a][1].end.offset - n[a][1].start.offset && (g = cn(g, [["enter", n[a][1], r], ["exit", n[a][1], r]])), g = cn(g, [["enter", s, r], ["enter", f, r], ["exit", f, r], ["enter", u, r]]), g = cn(g, Cs(r.parser.constructs.insideSpan.null, n.slice(a + 1, l), r)), g = cn(g, [["exit", u, r], ["enter", h, r], ["exit", h, r], ["exit", s, r]]), n[l][1].end.offset - n[l][1].start.offset ? (y = 2, g = cn(g, [["enter", n[l][1], r], ["exit", n[l][1], r]])) : y = 0, Wt(n, a - 1, l - a + 3, g), l = a + g.length - y - 2;
          break;
        }
    }
  for (l = -1; ++l < n.length; )
    n[l][1].type === "attentionSequence" && (n[l][1].type = "data");
  return n;
}
function K5(n, r) {
  const l = this.parser.constructs.attentionMarkers.null, a = this.previous, s = ti(a);
  let u;
  return f;
  function f(p) {
    return u = p, n.enter("attentionSequence"), h(p);
  }
  function h(p) {
    if (p === u)
      return n.consume(p), h;
    const g = n.exit("attentionSequence"), y = ti(p), x = !y || y === 2 && s || l.includes(p), S = !s || s === 2 && y || l.includes(a);
    return g._open = !!(u === 42 ? x : x && (s || !S)), g._close = !!(u === 42 ? S : S && (y || !x)), r(p);
  }
}
function op(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const W5 = {
  name: "autolink",
  tokenize: J5
};
function J5(n, r, l) {
  let a = 0;
  return s;
  function s(v) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), u;
  }
  function u(v) {
    return Nt(v) ? (n.consume(v), f) : v === 64 ? l(v) : g(v);
  }
  function f(v) {
    return v === 43 || v === 45 || v === 46 || kt(v) ? (a = 1, h(v)) : g(v);
  }
  function h(v) {
    return v === 58 ? (n.consume(v), a = 0, p) : (v === 43 || v === 45 || v === 46 || kt(v)) && a++ < 32 ? (n.consume(v), h) : (a = 0, g(v));
  }
  function p(v) {
    return v === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.exit("autolink"), r) : v === null || v === 32 || v === 60 || os(v) ? l(v) : (n.consume(v), p);
  }
  function g(v) {
    return v === 64 ? (n.consume(v), y) : F5(v) ? (n.consume(v), g) : l(v);
  }
  function y(v) {
    return kt(v) ? x(v) : l(v);
  }
  function x(v) {
    return v === 46 ? (n.consume(v), a = 0, y) : v === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.exit("autolink"), r) : S(v);
  }
  function S(v) {
    if ((v === 45 || kt(v)) && a++ < 63) {
      const C = v === 45 ? S : x;
      return n.consume(v), C;
    }
    return l(v);
  }
}
const ka = {
  partial: !0,
  tokenize: ev
};
function ev(n, r, l) {
  return a;
  function a(u) {
    return Ae(u) ? Re(n, s, "linePrefix")(u) : s(u);
  }
  function s(u) {
    return u === null || ye(u) ? r(u) : l(u);
  }
}
const Og = {
  continuation: {
    tokenize: nv
  },
  exit: rv,
  name: "blockQuote",
  tokenize: tv
};
function tv(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    if (f === 62) {
      const h = a.containerState;
      return h.open || (n.enter("blockQuote", {
        _container: !0
      }), h.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(f), n.exit("blockQuoteMarker"), u;
    }
    return l(f);
  }
  function u(f) {
    return Ae(f) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(f), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(f));
  }
}
function nv(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return Ae(f) ? Re(n, u, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : u(f);
  }
  function u(f) {
    return n.attempt(Og, r, l)(f);
  }
}
function rv(n) {
  n.exit("blockQuote");
}
const Dg = {
  name: "characterEscape",
  tokenize: lv
};
function lv(n, r, l) {
  return a;
  function a(u) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(u), n.exit("escapeMarker"), s;
  }
  function s(u) {
    return $5(u) ? (n.enter("characterEscapeValue"), n.consume(u), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : l(u);
  }
}
const Rg = {
  name: "characterReference",
  tokenize: iv
};
function iv(n, r, l) {
  const a = this;
  let s = 0, u, f;
  return h;
  function h(x) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(x), n.exit("characterReferenceMarker"), p;
  }
  function p(x) {
    return x === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(x), n.exit("characterReferenceMarkerNumeric"), g) : (n.enter("characterReferenceValue"), u = 31, f = kt, y(x));
  }
  function g(x) {
    return x === 88 || x === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(x), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), u = 6, f = V5, y) : (n.enter("characterReferenceValue"), u = 7, f = Df, y(x));
  }
  function y(x) {
    if (x === 59 && s) {
      const S = n.exit("characterReferenceValue");
      return f === kt && !sd(a.sliceSerialize(S)) ? l(x) : (n.enter("characterReferenceMarker"), n.consume(x), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return f(x) && s++ < u ? (n.consume(x), y) : l(x);
  }
}
const sp = {
  partial: !0,
  tokenize: ov
}, up = {
  concrete: !0,
  name: "codeFenced",
  tokenize: av
};
function av(n, r, l) {
  const a = this, s = {
    partial: !0,
    tokenize: le
  };
  let u = 0, f = 0, h;
  return p;
  function p(_) {
    return g(_);
  }
  function g(_) {
    const U = a.events[a.events.length - 1];
    return u = U && U[1].type === "linePrefix" ? U[2].sliceSerialize(U[1], !0).length : 0, h = _, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), y(_);
  }
  function y(_) {
    return _ === h ? (f++, n.consume(_), y) : f < 3 ? l(_) : (n.exit("codeFencedFenceSequence"), Ae(_) ? Re(n, x, "whitespace")(_) : x(_));
  }
  function x(_) {
    return _ === null || ye(_) ? (n.exit("codeFencedFence"), a.interrupt ? r(_) : n.check(sp, j, re)(_)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), S(_));
  }
  function S(_) {
    return _ === null || ye(_) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), x(_)) : Ae(_) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), Re(n, v, "whitespace")(_)) : _ === 96 && _ === h ? l(_) : (n.consume(_), S);
  }
  function v(_) {
    return _ === null || ye(_) ? x(_) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), C(_));
  }
  function C(_) {
    return _ === null || ye(_) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), x(_)) : _ === 96 && _ === h ? l(_) : (n.consume(_), C);
  }
  function j(_) {
    return n.attempt(s, re, M)(_);
  }
  function M(_) {
    return n.enter("lineEnding"), n.consume(_), n.exit("lineEnding"), T;
  }
  function T(_) {
    return u > 0 && Ae(_) ? Re(n, I, "linePrefix", u + 1)(_) : I(_);
  }
  function I(_) {
    return _ === null || ye(_) ? n.check(sp, j, re)(_) : (n.enter("codeFlowValue"), L(_));
  }
  function L(_) {
    return _ === null || ye(_) ? (n.exit("codeFlowValue"), I(_)) : (n.consume(_), L);
  }
  function re(_) {
    return n.exit("codeFenced"), r(_);
  }
  function le(_, U, ae) {
    let fe = 0;
    return R;
    function R(ee) {
      return _.enter("lineEnding"), _.consume(ee), _.exit("lineEnding"), O;
    }
    function O(ee) {
      return _.enter("codeFencedFence"), Ae(ee) ? Re(_, J, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(ee) : J(ee);
    }
    function J(ee) {
      return ee === h ? (_.enter("codeFencedFenceSequence"), ue(ee)) : ae(ee);
    }
    function ue(ee) {
      return ee === h ? (fe++, _.consume(ee), ue) : fe >= f ? (_.exit("codeFencedFenceSequence"), Ae(ee) ? Re(_, ie, "whitespace")(ee) : ie(ee)) : ae(ee);
    }
    function ie(ee) {
      return ee === null || ye(ee) ? (_.exit("codeFencedFence"), U(ee)) : ae(ee);
    }
  }
}
function ov(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return f === null ? l(f) : (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), u);
  }
  function u(f) {
    return a.parser.lazy[a.now().line] ? l(f) : r(f);
  }
}
const af = {
  name: "codeIndented",
  tokenize: uv
}, sv = {
  partial: !0,
  tokenize: cv
};
function uv(n, r, l) {
  const a = this;
  return s;
  function s(g) {
    return n.enter("codeIndented"), Re(n, u, "linePrefix", 5)(g);
  }
  function u(g) {
    const y = a.events[a.events.length - 1];
    return y && y[1].type === "linePrefix" && y[2].sliceSerialize(y[1], !0).length >= 4 ? f(g) : l(g);
  }
  function f(g) {
    return g === null ? p(g) : ye(g) ? n.attempt(sv, f, p)(g) : (n.enter("codeFlowValue"), h(g));
  }
  function h(g) {
    return g === null || ye(g) ? (n.exit("codeFlowValue"), f(g)) : (n.consume(g), h);
  }
  function p(g) {
    return n.exit("codeIndented"), r(g);
  }
}
function cv(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return a.parser.lazy[a.now().line] ? l(f) : ye(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), s) : Re(n, u, "linePrefix", 5)(f);
  }
  function u(f) {
    const h = a.events[a.events.length - 1];
    return h && h[1].type === "linePrefix" && h[2].sliceSerialize(h[1], !0).length >= 4 ? r(f) : ye(f) ? s(f) : l(f);
  }
}
const fv = {
  name: "codeText",
  previous: mv,
  resolve: dv,
  tokenize: hv
};
function dv(n) {
  let r = n.length - 4, l = 3, a, s;
  if ((n[l][1].type === "lineEnding" || n[l][1].type === "space") && (n[r][1].type === "lineEnding" || n[r][1].type === "space")) {
    for (a = l; ++a < r; )
      if (n[a][1].type === "codeTextData") {
        n[l][1].type = "codeTextPadding", n[r][1].type = "codeTextPadding", l += 2, r -= 2;
        break;
      }
  }
  for (a = l - 1, r++; ++a <= r; )
    s === void 0 ? a !== r && n[a][1].type !== "lineEnding" && (s = a) : (a === r || n[a][1].type === "lineEnding") && (n[s][1].type = "codeTextData", a !== s + 2 && (n[s][1].end = n[a - 1][1].end, n.splice(s + 2, a - s - 2), r -= a - s - 2, a = s + 2), s = void 0);
  return n;
}
function mv(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function hv(n, r, l) {
  let a = 0, s, u;
  return f;
  function f(x) {
    return n.enter("codeText"), n.enter("codeTextSequence"), h(x);
  }
  function h(x) {
    return x === 96 ? (n.consume(x), a++, h) : (n.exit("codeTextSequence"), p(x));
  }
  function p(x) {
    return x === null ? l(x) : x === 32 ? (n.enter("space"), n.consume(x), n.exit("space"), p) : x === 96 ? (u = n.enter("codeTextSequence"), s = 0, y(x)) : ye(x) ? (n.enter("lineEnding"), n.consume(x), n.exit("lineEnding"), p) : (n.enter("codeTextData"), g(x));
  }
  function g(x) {
    return x === null || x === 32 || x === 96 || ye(x) ? (n.exit("codeTextData"), p(x)) : (n.consume(x), g);
  }
  function y(x) {
    return x === 96 ? (n.consume(x), s++, y) : s === a ? (n.exit("codeTextSequence"), n.exit("codeText"), r(x)) : (u.type = "codeTextData", g(x));
  }
}
class pv {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(r) {
    this.left = r ? [...r] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(r) {
    if (r < 0 || r >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + r + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return r < this.left.length ? this.left[r] : this.right[this.right.length - r + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(r, l) {
    const a = l ?? Number.POSITIVE_INFINITY;
    return a < this.left.length ? this.left.slice(r, a) : r > this.left.length ? this.right.slice(this.right.length - a + this.left.length, this.right.length - r + this.left.length).reverse() : this.left.slice(r).concat(this.right.slice(this.right.length - a + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(r, l, a) {
    const s = l || 0;
    this.setCursor(Math.trunc(r));
    const u = this.right.splice(this.right.length - s, Number.POSITIVE_INFINITY);
    return a && aa(this.left, a), u.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(r) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(r);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(r) {
    this.setCursor(Number.POSITIVE_INFINITY), aa(this.left, r);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(r) {
    this.setCursor(0), this.right.push(r);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(r) {
    this.setCursor(0), aa(this.right, r.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(r) {
    if (!(r === this.left.length || r > this.left.length && this.right.length === 0 || r < 0 && this.left.length === 0))
      if (r < this.left.length) {
        const l = this.left.splice(r, Number.POSITIVE_INFINITY);
        aa(this.right, l.reverse());
      } else {
        const l = this.right.splice(this.left.length + this.right.length - r, Number.POSITIVE_INFINITY);
        aa(this.left, l.reverse());
      }
  }
}
function aa(n, r) {
  let l = 0;
  if (r.length < 1e4)
    n.push(...r);
  else
    for (; l < r.length; )
      n.push(...r.slice(l, l + 1e4)), l += 1e4;
}
function Lg(n) {
  const r = {};
  let l = -1, a, s, u, f, h, p, g;
  const y = new pv(n);
  for (; ++l < y.length; ) {
    for (; l in r; )
      l = r[l];
    if (a = y.get(l), l && a[1].type === "chunkFlow" && y.get(l - 1)[1].type === "listItemPrefix" && (p = a[1]._tokenizer.events, u = 0, u < p.length && p[u][1].type === "lineEndingBlank" && (u += 2), u < p.length && p[u][1].type === "content"))
      for (; ++u < p.length && p[u][1].type !== "content"; )
        p[u][1].type === "chunkText" && (p[u][1]._isInFirstContentOfListItem = !0, u++);
    if (a[0] === "enter")
      a[1].contentType && (Object.assign(r, gv(y, l)), l = r[l], g = !0);
    else if (a[1]._container) {
      for (u = l, s = void 0; u--; )
        if (f = y.get(u), f[1].type === "lineEnding" || f[1].type === "lineEndingBlank")
          f[0] === "enter" && (s && (y.get(s)[1].type = "lineEndingBlank"), f[1].type = "lineEnding", s = u);
        else if (!(f[1].type === "linePrefix" || f[1].type === "listItemIndent")) break;
      s && (a[1].end = {
        ...y.get(s)[1].start
      }, h = y.slice(s, l), h.unshift(a), y.splice(s, l - s + 1, h));
    }
  }
  return Wt(n, 0, Number.POSITIVE_INFINITY, y.slice(0)), !g;
}
function gv(n, r) {
  const l = n.get(r)[1], a = n.get(r)[2];
  let s = r - 1;
  const u = [];
  let f = l._tokenizer;
  f || (f = a.parser[l.contentType](l.start), l._contentTypeTextTrailing && (f._contentTypeTextTrailing = !0));
  const h = f.events, p = [], g = {};
  let y, x, S = -1, v = l, C = 0, j = 0;
  const M = [j];
  for (; v; ) {
    for (; n.get(++s)[1] !== v; )
      ;
    u.push(s), v._tokenizer || (y = a.sliceStream(v), v.next || y.push(null), x && f.defineSkip(v.start), v._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = !0), f.write(y), v._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = void 0)), x = v, v = v.next;
  }
  for (v = l; ++S < h.length; )
    // Find a void token that includes a break.
    h[S][0] === "exit" && h[S - 1][0] === "enter" && h[S][1].type === h[S - 1][1].type && h[S][1].start.line !== h[S][1].end.line && (j = S + 1, M.push(j), v._tokenizer = void 0, v.previous = void 0, v = v.next);
  for (f.events = [], v ? (v._tokenizer = void 0, v.previous = void 0) : M.pop(), S = M.length; S--; ) {
    const T = h.slice(M[S], M[S + 1]), I = u.pop();
    p.push([I, I + T.length - 1]), n.splice(I, 2, T);
  }
  for (p.reverse(), S = -1; ++S < p.length; )
    g[C + p[S][0]] = C + p[S][1], C += p[S][1] - p[S][0] - 1;
  return g;
}
const xv = {
  resolve: bv,
  tokenize: vv
}, yv = {
  partial: !0,
  tokenize: Sv
};
function bv(n) {
  return Lg(n), n;
}
function vv(n, r) {
  let l;
  return a;
  function a(h) {
    return n.enter("content"), l = n.enter("chunkContent", {
      contentType: "content"
    }), s(h);
  }
  function s(h) {
    return h === null ? u(h) : ye(h) ? n.check(yv, f, u)(h) : (n.consume(h), s);
  }
  function u(h) {
    return n.exit("chunkContent"), n.exit("content"), r(h);
  }
  function f(h) {
    return n.consume(h), n.exit("chunkContent"), l.next = n.enter("chunkContent", {
      contentType: "content",
      previous: l
    }), l = l.next, s;
  }
}
function Sv(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), Re(n, u, "linePrefix");
  }
  function u(f) {
    if (f === null || ye(f))
      return l(f);
    const h = a.events[a.events.length - 1];
    return !a.parser.constructs.disable.null.includes("codeIndented") && h && h[1].type === "linePrefix" && h[2].sliceSerialize(h[1], !0).length >= 4 ? r(f) : n.interrupt(a.parser.constructs.flow, l, r)(f);
  }
}
function Ug(n, r, l, a, s, u, f, h, p) {
  const g = p || Number.POSITIVE_INFINITY;
  let y = 0;
  return x;
  function x(T) {
    return T === 60 ? (n.enter(a), n.enter(s), n.enter(u), n.consume(T), n.exit(u), S) : T === null || T === 32 || T === 41 || os(T) ? l(T) : (n.enter(a), n.enter(f), n.enter(h), n.enter("chunkString", {
      contentType: "string"
    }), j(T));
  }
  function S(T) {
    return T === 62 ? (n.enter(u), n.consume(T), n.exit(u), n.exit(s), n.exit(a), r) : (n.enter(h), n.enter("chunkString", {
      contentType: "string"
    }), v(T));
  }
  function v(T) {
    return T === 62 ? (n.exit("chunkString"), n.exit(h), S(T)) : T === null || T === 60 || ye(T) ? l(T) : (n.consume(T), T === 92 ? C : v);
  }
  function C(T) {
    return T === 60 || T === 62 || T === 92 ? (n.consume(T), v) : v(T);
  }
  function j(T) {
    return !y && (T === null || T === 41 || Qe(T)) ? (n.exit("chunkString"), n.exit(h), n.exit(f), n.exit(a), r(T)) : y < g && T === 40 ? (n.consume(T), y++, j) : T === 41 ? (n.consume(T), y--, j) : T === null || T === 32 || T === 40 || os(T) ? l(T) : (n.consume(T), T === 92 ? M : j);
  }
  function M(T) {
    return T === 40 || T === 41 || T === 92 ? (n.consume(T), j) : j(T);
  }
}
function Bg(n, r, l, a, s, u) {
  const f = this;
  let h = 0, p;
  return g;
  function g(v) {
    return n.enter(a), n.enter(s), n.consume(v), n.exit(s), n.enter(u), y;
  }
  function y(v) {
    return h > 999 || v === null || v === 91 || v === 93 && !p || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    v === 94 && !h && "_hiddenFootnoteSupport" in f.parser.constructs ? l(v) : v === 93 ? (n.exit(u), n.enter(s), n.consume(v), n.exit(s), n.exit(a), r) : ye(v) ? (n.enter("lineEnding"), n.consume(v), n.exit("lineEnding"), y) : (n.enter("chunkString", {
      contentType: "string"
    }), x(v));
  }
  function x(v) {
    return v === null || v === 91 || v === 93 || ye(v) || h++ > 999 ? (n.exit("chunkString"), y(v)) : (n.consume(v), p || (p = !Ae(v)), v === 92 ? S : x);
  }
  function S(v) {
    return v === 91 || v === 92 || v === 93 ? (n.consume(v), h++, x) : x(v);
  }
}
function Hg(n, r, l, a, s, u) {
  let f;
  return h;
  function h(S) {
    return S === 34 || S === 39 || S === 40 ? (n.enter(a), n.enter(s), n.consume(S), n.exit(s), f = S === 40 ? 41 : S, p) : l(S);
  }
  function p(S) {
    return S === f ? (n.enter(s), n.consume(S), n.exit(s), n.exit(a), r) : (n.enter(u), g(S));
  }
  function g(S) {
    return S === f ? (n.exit(u), p(f)) : S === null ? l(S) : ye(S) ? (n.enter("lineEnding"), n.consume(S), n.exit("lineEnding"), Re(n, g, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), y(S));
  }
  function y(S) {
    return S === f || S === null || ye(S) ? (n.exit("chunkString"), g(S)) : (n.consume(S), S === 92 ? x : y);
  }
  function x(S) {
    return S === f || S === 92 ? (n.consume(S), y) : y(S);
  }
}
function da(n, r) {
  let l;
  return a;
  function a(s) {
    return ye(s) ? (n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), l = !0, a) : Ae(s) ? Re(n, a, l ? "linePrefix" : "lineSuffix")(s) : r(s);
  }
}
const kv = {
  name: "definition",
  tokenize: wv
}, Cv = {
  partial: !0,
  tokenize: Ev
};
function wv(n, r, l) {
  const a = this;
  let s;
  return u;
  function u(v) {
    return n.enter("definition"), f(v);
  }
  function f(v) {
    return Bg.call(
      a,
      n,
      h,
      // Note: we don’t need to reset the way `markdown-rs` does.
      l,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(v);
  }
  function h(v) {
    return s = pn(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1)), v === 58 ? (n.enter("definitionMarker"), n.consume(v), n.exit("definitionMarker"), p) : l(v);
  }
  function p(v) {
    return Qe(v) ? da(n, g)(v) : g(v);
  }
  function g(v) {
    return Ug(
      n,
      y,
      // Note: we don’t need to reset the way `markdown-rs` does.
      l,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(v);
  }
  function y(v) {
    return n.attempt(Cv, x, x)(v);
  }
  function x(v) {
    return Ae(v) ? Re(n, S, "whitespace")(v) : S(v);
  }
  function S(v) {
    return v === null || ye(v) ? (n.exit("definition"), a.parser.defined.push(s), r(v)) : l(v);
  }
}
function Ev(n, r, l) {
  return a;
  function a(h) {
    return Qe(h) ? da(n, s)(h) : l(h);
  }
  function s(h) {
    return Hg(n, u, l, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(h);
  }
  function u(h) {
    return Ae(h) ? Re(n, f, "whitespace")(h) : f(h);
  }
  function f(h) {
    return h === null || ye(h) ? r(h) : l(h);
  }
}
const jv = {
  name: "hardBreakEscape",
  tokenize: Nv
};
function Nv(n, r, l) {
  return a;
  function a(u) {
    return n.enter("hardBreakEscape"), n.consume(u), s;
  }
  function s(u) {
    return ye(u) ? (n.exit("hardBreakEscape"), r(u)) : l(u);
  }
}
const Tv = {
  name: "headingAtx",
  resolve: Av,
  tokenize: zv
};
function Av(n, r) {
  let l = n.length - 2, a = 3, s, u;
  return n[a][1].type === "whitespace" && (a += 2), l - 2 > a && n[l][1].type === "whitespace" && (l -= 2), n[l][1].type === "atxHeadingSequence" && (a === l - 1 || l - 4 > a && n[l - 2][1].type === "whitespace") && (l -= a + 1 === l ? 2 : 4), l > a && (s = {
    type: "atxHeadingText",
    start: n[a][1].start,
    end: n[l][1].end
  }, u = {
    type: "chunkText",
    start: n[a][1].start,
    end: n[l][1].end,
    contentType: "text"
  }, Wt(n, a, l - a + 1, [["enter", s, r], ["enter", u, r], ["exit", u, r], ["exit", s, r]])), n;
}
function zv(n, r, l) {
  let a = 0;
  return s;
  function s(y) {
    return n.enter("atxHeading"), u(y);
  }
  function u(y) {
    return n.enter("atxHeadingSequence"), f(y);
  }
  function f(y) {
    return y === 35 && a++ < 6 ? (n.consume(y), f) : y === null || Qe(y) ? (n.exit("atxHeadingSequence"), h(y)) : l(y);
  }
  function h(y) {
    return y === 35 ? (n.enter("atxHeadingSequence"), p(y)) : y === null || ye(y) ? (n.exit("atxHeading"), r(y)) : Ae(y) ? Re(n, h, "whitespace")(y) : (n.enter("atxHeadingText"), g(y));
  }
  function p(y) {
    return y === 35 ? (n.consume(y), p) : (n.exit("atxHeadingSequence"), h(y));
  }
  function g(y) {
    return y === null || y === 35 || Qe(y) ? (n.exit("atxHeadingText"), h(y)) : (n.consume(y), g);
  }
}
const _v = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], cp = ["pre", "script", "style", "textarea"], Mv = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Rv,
  tokenize: Lv
}, Ov = {
  partial: !0,
  tokenize: Bv
}, Dv = {
  partial: !0,
  tokenize: Uv
};
function Rv(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function Lv(n, r, l) {
  const a = this;
  let s, u, f, h, p;
  return g;
  function g(w) {
    return y(w);
  }
  function y(w) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(w), x;
  }
  function x(w) {
    return w === 33 ? (n.consume(w), S) : w === 47 ? (n.consume(w), u = !0, j) : w === 63 ? (n.consume(w), s = 3, a.interrupt ? r : E) : Nt(w) ? (n.consume(w), f = String.fromCharCode(w), M) : l(w);
  }
  function S(w) {
    return w === 45 ? (n.consume(w), s = 2, v) : w === 91 ? (n.consume(w), s = 5, h = 0, C) : Nt(w) ? (n.consume(w), s = 4, a.interrupt ? r : E) : l(w);
  }
  function v(w) {
    return w === 45 ? (n.consume(w), a.interrupt ? r : E) : l(w);
  }
  function C(w) {
    const G = "CDATA[";
    return w === G.charCodeAt(h++) ? (n.consume(w), h === G.length ? a.interrupt ? r : J : C) : l(w);
  }
  function j(w) {
    return Nt(w) ? (n.consume(w), f = String.fromCharCode(w), M) : l(w);
  }
  function M(w) {
    if (w === null || w === 47 || w === 62 || Qe(w)) {
      const G = w === 47, P = f.toLowerCase();
      return !G && !u && cp.includes(P) ? (s = 1, a.interrupt ? r(w) : J(w)) : _v.includes(f.toLowerCase()) ? (s = 6, G ? (n.consume(w), T) : a.interrupt ? r(w) : J(w)) : (s = 7, a.interrupt && !a.parser.lazy[a.now().line] ? l(w) : u ? I(w) : L(w));
    }
    return w === 45 || kt(w) ? (n.consume(w), f += String.fromCharCode(w), M) : l(w);
  }
  function T(w) {
    return w === 62 ? (n.consume(w), a.interrupt ? r : J) : l(w);
  }
  function I(w) {
    return Ae(w) ? (n.consume(w), I) : R(w);
  }
  function L(w) {
    return w === 47 ? (n.consume(w), R) : w === 58 || w === 95 || Nt(w) ? (n.consume(w), re) : Ae(w) ? (n.consume(w), L) : R(w);
  }
  function re(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || kt(w) ? (n.consume(w), re) : le(w);
  }
  function le(w) {
    return w === 61 ? (n.consume(w), _) : Ae(w) ? (n.consume(w), le) : L(w);
  }
  function _(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? l(w) : w === 34 || w === 39 ? (n.consume(w), p = w, U) : Ae(w) ? (n.consume(w), _) : ae(w);
  }
  function U(w) {
    return w === p ? (n.consume(w), p = null, fe) : w === null || ye(w) ? l(w) : (n.consume(w), U);
  }
  function ae(w) {
    return w === null || w === 34 || w === 39 || w === 47 || w === 60 || w === 61 || w === 62 || w === 96 || Qe(w) ? le(w) : (n.consume(w), ae);
  }
  function fe(w) {
    return w === 47 || w === 62 || Ae(w) ? L(w) : l(w);
  }
  function R(w) {
    return w === 62 ? (n.consume(w), O) : l(w);
  }
  function O(w) {
    return w === null || ye(w) ? J(w) : Ae(w) ? (n.consume(w), O) : l(w);
  }
  function J(w) {
    return w === 45 && s === 2 ? (n.consume(w), B) : w === 60 && s === 1 ? (n.consume(w), Y) : w === 62 && s === 4 ? (n.consume(w), A) : w === 63 && s === 3 ? (n.consume(w), E) : w === 93 && s === 5 ? (n.consume(w), he) : ye(w) && (s === 6 || s === 7) ? (n.exit("htmlFlowData"), n.check(Ov, Q, ue)(w)) : w === null || ye(w) ? (n.exit("htmlFlowData"), ue(w)) : (n.consume(w), J);
  }
  function ue(w) {
    return n.check(Dv, ie, Q)(w);
  }
  function ie(w) {
    return n.enter("lineEnding"), n.consume(w), n.exit("lineEnding"), ee;
  }
  function ee(w) {
    return w === null || ye(w) ? ue(w) : (n.enter("htmlFlowData"), J(w));
  }
  function B(w) {
    return w === 45 ? (n.consume(w), E) : J(w);
  }
  function Y(w) {
    return w === 47 ? (n.consume(w), f = "", se) : J(w);
  }
  function se(w) {
    if (w === 62) {
      const G = f.toLowerCase();
      return cp.includes(G) ? (n.consume(w), A) : J(w);
    }
    return Nt(w) && f.length < 8 ? (n.consume(w), f += String.fromCharCode(w), se) : J(w);
  }
  function he(w) {
    return w === 93 ? (n.consume(w), E) : J(w);
  }
  function E(w) {
    return w === 62 ? (n.consume(w), A) : w === 45 && s === 2 ? (n.consume(w), E) : J(w);
  }
  function A(w) {
    return w === null || ye(w) ? (n.exit("htmlFlowData"), Q(w)) : (n.consume(w), A);
  }
  function Q(w) {
    return n.exit("htmlFlow"), r(w);
  }
}
function Uv(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return ye(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), u) : l(f);
  }
  function u(f) {
    return a.parser.lazy[a.now().line] ? l(f) : r(f);
  }
}
function Bv(n, r, l) {
  return a;
  function a(s) {
    return n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), n.attempt(ka, r, l);
  }
}
const Hv = {
  name: "htmlText",
  tokenize: qv
};
function qv(n, r, l) {
  const a = this;
  let s, u, f;
  return h;
  function h(E) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(E), p;
  }
  function p(E) {
    return E === 33 ? (n.consume(E), g) : E === 47 ? (n.consume(E), le) : E === 63 ? (n.consume(E), L) : Nt(E) ? (n.consume(E), ae) : l(E);
  }
  function g(E) {
    return E === 45 ? (n.consume(E), y) : E === 91 ? (n.consume(E), u = 0, C) : Nt(E) ? (n.consume(E), I) : l(E);
  }
  function y(E) {
    return E === 45 ? (n.consume(E), v) : l(E);
  }
  function x(E) {
    return E === null ? l(E) : E === 45 ? (n.consume(E), S) : ye(E) ? (f = x, Y(E)) : (n.consume(E), x);
  }
  function S(E) {
    return E === 45 ? (n.consume(E), v) : x(E);
  }
  function v(E) {
    return E === 62 ? B(E) : E === 45 ? S(E) : x(E);
  }
  function C(E) {
    const A = "CDATA[";
    return E === A.charCodeAt(u++) ? (n.consume(E), u === A.length ? j : C) : l(E);
  }
  function j(E) {
    return E === null ? l(E) : E === 93 ? (n.consume(E), M) : ye(E) ? (f = j, Y(E)) : (n.consume(E), j);
  }
  function M(E) {
    return E === 93 ? (n.consume(E), T) : j(E);
  }
  function T(E) {
    return E === 62 ? B(E) : E === 93 ? (n.consume(E), T) : j(E);
  }
  function I(E) {
    return E === null || E === 62 ? B(E) : ye(E) ? (f = I, Y(E)) : (n.consume(E), I);
  }
  function L(E) {
    return E === null ? l(E) : E === 63 ? (n.consume(E), re) : ye(E) ? (f = L, Y(E)) : (n.consume(E), L);
  }
  function re(E) {
    return E === 62 ? B(E) : L(E);
  }
  function le(E) {
    return Nt(E) ? (n.consume(E), _) : l(E);
  }
  function _(E) {
    return E === 45 || kt(E) ? (n.consume(E), _) : U(E);
  }
  function U(E) {
    return ye(E) ? (f = U, Y(E)) : Ae(E) ? (n.consume(E), U) : B(E);
  }
  function ae(E) {
    return E === 45 || kt(E) ? (n.consume(E), ae) : E === 47 || E === 62 || Qe(E) ? fe(E) : l(E);
  }
  function fe(E) {
    return E === 47 ? (n.consume(E), B) : E === 58 || E === 95 || Nt(E) ? (n.consume(E), R) : ye(E) ? (f = fe, Y(E)) : Ae(E) ? (n.consume(E), fe) : B(E);
  }
  function R(E) {
    return E === 45 || E === 46 || E === 58 || E === 95 || kt(E) ? (n.consume(E), R) : O(E);
  }
  function O(E) {
    return E === 61 ? (n.consume(E), J) : ye(E) ? (f = O, Y(E)) : Ae(E) ? (n.consume(E), O) : fe(E);
  }
  function J(E) {
    return E === null || E === 60 || E === 61 || E === 62 || E === 96 ? l(E) : E === 34 || E === 39 ? (n.consume(E), s = E, ue) : ye(E) ? (f = J, Y(E)) : Ae(E) ? (n.consume(E), J) : (n.consume(E), ie);
  }
  function ue(E) {
    return E === s ? (n.consume(E), s = void 0, ee) : E === null ? l(E) : ye(E) ? (f = ue, Y(E)) : (n.consume(E), ue);
  }
  function ie(E) {
    return E === null || E === 34 || E === 39 || E === 60 || E === 61 || E === 96 ? l(E) : E === 47 || E === 62 || Qe(E) ? fe(E) : (n.consume(E), ie);
  }
  function ee(E) {
    return E === 47 || E === 62 || Qe(E) ? fe(E) : l(E);
  }
  function B(E) {
    return E === 62 ? (n.consume(E), n.exit("htmlTextData"), n.exit("htmlText"), r) : l(E);
  }
  function Y(E) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(E), n.exit("lineEnding"), se;
  }
  function se(E) {
    return Ae(E) ? Re(n, he, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(E) : he(E);
  }
  function he(E) {
    return n.enter("htmlTextData"), f(E);
  }
}
const ud = {
  name: "labelEnd",
  resolveAll: $v,
  resolveTo: Gv,
  tokenize: Yv
}, Iv = {
  tokenize: Xv
}, Fv = {
  tokenize: Qv
}, Vv = {
  tokenize: Pv
};
function $v(n) {
  let r = -1;
  const l = [];
  for (; ++r < n.length; ) {
    const a = n[r][1];
    if (l.push(n[r]), a.type === "labelImage" || a.type === "labelLink" || a.type === "labelEnd") {
      const s = a.type === "labelImage" ? 4 : 2;
      a.type = "data", r += s;
    }
  }
  return n.length !== l.length && Wt(n, 0, n.length, l), n;
}
function Gv(n, r) {
  let l = n.length, a = 0, s, u, f, h;
  for (; l--; )
    if (s = n[l][1], u) {
      if (s.type === "link" || s.type === "labelLink" && s._inactive)
        break;
      n[l][0] === "enter" && s.type === "labelLink" && (s._inactive = !0);
    } else if (f) {
      if (n[l][0] === "enter" && (s.type === "labelImage" || s.type === "labelLink") && !s._balanced && (u = l, s.type !== "labelLink")) {
        a = 2;
        break;
      }
    } else s.type === "labelEnd" && (f = l);
  const p = {
    type: n[u][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, g = {
    type: "label",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[f][1].end
    }
  }, y = {
    type: "labelText",
    start: {
      ...n[u + a + 2][1].end
    },
    end: {
      ...n[f - 2][1].start
    }
  };
  return h = [["enter", p, r], ["enter", g, r]], h = cn(h, n.slice(u + 1, u + a + 3)), h = cn(h, [["enter", y, r]]), h = cn(h, Cs(r.parser.constructs.insideSpan.null, n.slice(u + a + 4, f - 3), r)), h = cn(h, [["exit", y, r], n[f - 2], n[f - 1], ["exit", g, r]]), h = cn(h, n.slice(f + 1)), h = cn(h, [["exit", p, r]]), Wt(n, u, n.length, h), n;
}
function Yv(n, r, l) {
  const a = this;
  let s = a.events.length, u, f;
  for (; s--; )
    if ((a.events[s][1].type === "labelImage" || a.events[s][1].type === "labelLink") && !a.events[s][1]._balanced) {
      u = a.events[s][1];
      break;
    }
  return h;
  function h(S) {
    return u ? u._inactive ? x(S) : (f = a.parser.defined.includes(pn(a.sliceSerialize({
      start: u.end,
      end: a.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(S), n.exit("labelMarker"), n.exit("labelEnd"), p) : l(S);
  }
  function p(S) {
    return S === 40 ? n.attempt(Iv, y, f ? y : x)(S) : S === 91 ? n.attempt(Fv, y, f ? g : x)(S) : f ? y(S) : x(S);
  }
  function g(S) {
    return n.attempt(Vv, y, x)(S);
  }
  function y(S) {
    return r(S);
  }
  function x(S) {
    return u._balanced = !0, l(S);
  }
}
function Xv(n, r, l) {
  return a;
  function a(x) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(x), n.exit("resourceMarker"), s;
  }
  function s(x) {
    return Qe(x) ? da(n, u)(x) : u(x);
  }
  function u(x) {
    return x === 41 ? y(x) : Ug(n, f, h, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(x);
  }
  function f(x) {
    return Qe(x) ? da(n, p)(x) : y(x);
  }
  function h(x) {
    return l(x);
  }
  function p(x) {
    return x === 34 || x === 39 || x === 40 ? Hg(n, g, l, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(x) : y(x);
  }
  function g(x) {
    return Qe(x) ? da(n, y)(x) : y(x);
  }
  function y(x) {
    return x === 41 ? (n.enter("resourceMarker"), n.consume(x), n.exit("resourceMarker"), n.exit("resource"), r) : l(x);
  }
}
function Qv(n, r, l) {
  const a = this;
  return s;
  function s(h) {
    return Bg.call(a, n, u, f, "reference", "referenceMarker", "referenceString")(h);
  }
  function u(h) {
    return a.parser.defined.includes(pn(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1))) ? r(h) : l(h);
  }
  function f(h) {
    return l(h);
  }
}
function Pv(n, r, l) {
  return a;
  function a(u) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), s;
  }
  function s(u) {
    return u === 93 ? (n.enter("referenceMarker"), n.consume(u), n.exit("referenceMarker"), n.exit("reference"), r) : l(u);
  }
}
const Zv = {
  name: "labelStartImage",
  resolveAll: ud.resolveAll,
  tokenize: Kv
};
function Kv(n, r, l) {
  const a = this;
  return s;
  function s(h) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(h), n.exit("labelImageMarker"), u;
  }
  function u(h) {
    return h === 91 ? (n.enter("labelMarker"), n.consume(h), n.exit("labelMarker"), n.exit("labelImage"), f) : l(h);
  }
  function f(h) {
    return h === 94 && "_hiddenFootnoteSupport" in a.parser.constructs ? l(h) : r(h);
  }
}
const Wv = {
  name: "labelStartLink",
  resolveAll: ud.resolveAll,
  tokenize: Jv
};
function Jv(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(f), n.exit("labelMarker"), n.exit("labelLink"), u;
  }
  function u(f) {
    return f === 94 && "_hiddenFootnoteSupport" in a.parser.constructs ? l(f) : r(f);
  }
}
const of = {
  name: "lineEnding",
  tokenize: e6
};
function e6(n, r) {
  return l;
  function l(a) {
    return n.enter("lineEnding"), n.consume(a), n.exit("lineEnding"), Re(n, r, "linePrefix");
  }
}
const rs = {
  name: "thematicBreak",
  tokenize: t6
};
function t6(n, r, l) {
  let a = 0, s;
  return u;
  function u(g) {
    return n.enter("thematicBreak"), f(g);
  }
  function f(g) {
    return s = g, h(g);
  }
  function h(g) {
    return g === s ? (n.enter("thematicBreakSequence"), p(g)) : a >= 3 && (g === null || ye(g)) ? (n.exit("thematicBreak"), r(g)) : l(g);
  }
  function p(g) {
    return g === s ? (n.consume(g), a++, p) : (n.exit("thematicBreakSequence"), Ae(g) ? Re(n, h, "whitespace")(g) : h(g));
  }
}
const Ut = {
  continuation: {
    tokenize: i6
  },
  exit: o6,
  name: "list",
  tokenize: l6
}, n6 = {
  partial: !0,
  tokenize: s6
}, r6 = {
  partial: !0,
  tokenize: a6
};
function l6(n, r, l) {
  const a = this, s = a.events[a.events.length - 1];
  let u = s && s[1].type === "linePrefix" ? s[2].sliceSerialize(s[1], !0).length : 0, f = 0;
  return h;
  function h(v) {
    const C = a.containerState.type || (v === 42 || v === 43 || v === 45 ? "listUnordered" : "listOrdered");
    if (C === "listUnordered" ? !a.containerState.marker || v === a.containerState.marker : Df(v)) {
      if (a.containerState.type || (a.containerState.type = C, n.enter(C, {
        _container: !0
      })), C === "listUnordered")
        return n.enter("listItemPrefix"), v === 42 || v === 45 ? n.check(rs, l, g)(v) : g(v);
      if (!a.interrupt || v === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), p(v);
    }
    return l(v);
  }
  function p(v) {
    return Df(v) && ++f < 10 ? (n.consume(v), p) : (!a.interrupt || f < 2) && (a.containerState.marker ? v === a.containerState.marker : v === 41 || v === 46) ? (n.exit("listItemValue"), g(v)) : l(v);
  }
  function g(v) {
    return n.enter("listItemMarker"), n.consume(v), n.exit("listItemMarker"), a.containerState.marker = a.containerState.marker || v, n.check(
      ka,
      // Can’t be empty when interrupting.
      a.interrupt ? l : y,
      n.attempt(n6, S, x)
    );
  }
  function y(v) {
    return a.containerState.initialBlankLine = !0, u++, S(v);
  }
  function x(v) {
    return Ae(v) ? (n.enter("listItemPrefixWhitespace"), n.consume(v), n.exit("listItemPrefixWhitespace"), S) : l(v);
  }
  function S(v) {
    return a.containerState.size = u + a.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(v);
  }
}
function i6(n, r, l) {
  const a = this;
  return a.containerState._closeFlow = void 0, n.check(ka, s, u);
  function s(h) {
    return a.containerState.furtherBlankLines = a.containerState.furtherBlankLines || a.containerState.initialBlankLine, Re(n, r, "listItemIndent", a.containerState.size + 1)(h);
  }
  function u(h) {
    return a.containerState.furtherBlankLines || !Ae(h) ? (a.containerState.furtherBlankLines = void 0, a.containerState.initialBlankLine = void 0, f(h)) : (a.containerState.furtherBlankLines = void 0, a.containerState.initialBlankLine = void 0, n.attempt(r6, r, f)(h));
  }
  function f(h) {
    return a.containerState._closeFlow = !0, a.interrupt = void 0, Re(n, n.attempt(Ut, r, l), "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(h);
  }
}
function a6(n, r, l) {
  const a = this;
  return Re(n, s, "listItemIndent", a.containerState.size + 1);
  function s(u) {
    const f = a.events[a.events.length - 1];
    return f && f[1].type === "listItemIndent" && f[2].sliceSerialize(f[1], !0).length === a.containerState.size ? r(u) : l(u);
  }
}
function o6(n) {
  n.exit(this.containerState.type);
}
function s6(n, r, l) {
  const a = this;
  return Re(n, s, "listItemPrefixWhitespace", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function s(u) {
    const f = a.events[a.events.length - 1];
    return !Ae(u) && f && f[1].type === "listItemPrefixWhitespace" ? r(u) : l(u);
  }
}
const fp = {
  name: "setextUnderline",
  resolveTo: u6,
  tokenize: c6
};
function u6(n, r) {
  let l = n.length, a, s, u;
  for (; l--; )
    if (n[l][0] === "enter") {
      if (n[l][1].type === "content") {
        a = l;
        break;
      }
      n[l][1].type === "paragraph" && (s = l);
    } else
      n[l][1].type === "content" && n.splice(l, 1), !u && n[l][1].type === "definition" && (u = l);
  const f = {
    type: "setextHeading",
    start: {
      ...n[a][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[s][1].type = "setextHeadingText", u ? (n.splice(s, 0, ["enter", f, r]), n.splice(u + 1, 0, ["exit", n[a][1], r]), n[a][1].end = {
    ...n[u][1].end
  }) : n[a][1] = f, n.push(["exit", f, r]), n;
}
function c6(n, r, l) {
  const a = this;
  let s;
  return u;
  function u(g) {
    let y = a.events.length, x;
    for (; y--; )
      if (a.events[y][1].type !== "lineEnding" && a.events[y][1].type !== "linePrefix" && a.events[y][1].type !== "content") {
        x = a.events[y][1].type === "paragraph";
        break;
      }
    return !a.parser.lazy[a.now().line] && (a.interrupt || x) ? (n.enter("setextHeadingLine"), s = g, f(g)) : l(g);
  }
  function f(g) {
    return n.enter("setextHeadingLineSequence"), h(g);
  }
  function h(g) {
    return g === s ? (n.consume(g), h) : (n.exit("setextHeadingLineSequence"), Ae(g) ? Re(n, p, "lineSuffix")(g) : p(g));
  }
  function p(g) {
    return g === null || ye(g) ? (n.exit("setextHeadingLine"), r(g)) : l(g);
  }
}
const f6 = {
  tokenize: d6
};
function d6(n) {
  const r = this, l = n.attempt(
    // Try to parse a blank line.
    ka,
    a,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, s, Re(n, n.attempt(this.parser.constructs.flow, s, n.attempt(xv, s)), "linePrefix"))
  );
  return l;
  function a(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(u), n.exit("lineEndingBlank"), r.currentConstruct = void 0, l;
  }
  function s(u) {
    if (u === null) {
      n.consume(u);
      return;
    }
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), r.currentConstruct = void 0, l;
  }
}
const m6 = {
  resolveAll: Ig()
}, h6 = qg("string"), p6 = qg("text");
function qg(n) {
  return {
    resolveAll: Ig(n === "text" ? g6 : void 0),
    tokenize: r
  };
  function r(l) {
    const a = this, s = this.parser.constructs[n], u = l.attempt(s, f, h);
    return f;
    function f(y) {
      return g(y) ? u(y) : h(y);
    }
    function h(y) {
      if (y === null) {
        l.consume(y);
        return;
      }
      return l.enter("data"), l.consume(y), p;
    }
    function p(y) {
      return g(y) ? (l.exit("data"), u(y)) : (l.consume(y), p);
    }
    function g(y) {
      if (y === null)
        return !0;
      const x = s[y];
      let S = -1;
      if (x)
        for (; ++S < x.length; ) {
          const v = x[S];
          if (!v.previous || v.previous.call(a, a.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Ig(n) {
  return r;
  function r(l, a) {
    let s = -1, u;
    for (; ++s <= l.length; )
      u === void 0 ? l[s] && l[s][1].type === "data" && (u = s, s++) : (!l[s] || l[s][1].type !== "data") && (s !== u + 2 && (l[u][1].end = l[s - 1][1].end, l.splice(u + 2, s - u - 2), s = u + 2), u = void 0);
    return n ? n(l, a) : l;
  }
}
function g6(n, r) {
  let l = 0;
  for (; ++l <= n.length; )
    if ((l === n.length || n[l][1].type === "lineEnding") && n[l - 1][1].type === "data") {
      const a = n[l - 1][1], s = r.sliceStream(a);
      let u = s.length, f = -1, h = 0, p;
      for (; u--; ) {
        const g = s[u];
        if (typeof g == "string") {
          for (f = g.length; g.charCodeAt(f - 1) === 32; )
            h++, f--;
          if (f) break;
          f = -1;
        } else if (g === -2)
          p = !0, h++;
        else if (g !== -1) {
          u++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && l === n.length && (h = 0), h) {
        const g = {
          type: l === n.length || p || h < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: u ? f : a.start._bufferIndex + f,
            _index: a.start._index + u,
            line: a.end.line,
            column: a.end.column - h,
            offset: a.end.offset - h
          },
          end: {
            ...a.end
          }
        };
        a.end = {
          ...g.start
        }, a.start.offset === a.end.offset ? Object.assign(a, g) : (n.splice(l, 0, ["enter", g, r], ["exit", g, r]), l += 2);
      }
      l++;
    }
  return n;
}
const x6 = {
  42: Ut,
  43: Ut,
  45: Ut,
  48: Ut,
  49: Ut,
  50: Ut,
  51: Ut,
  52: Ut,
  53: Ut,
  54: Ut,
  55: Ut,
  56: Ut,
  57: Ut,
  62: Og
}, y6 = {
  91: kv
}, b6 = {
  [-2]: af,
  [-1]: af,
  32: af
}, v6 = {
  35: Tv,
  42: rs,
  45: [fp, rs],
  60: Mv,
  61: fp,
  95: rs,
  96: up,
  126: up
}, S6 = {
  38: Rg,
  92: Dg
}, k6 = {
  [-5]: of,
  [-4]: of,
  [-3]: of,
  33: Zv,
  38: Rg,
  42: Rf,
  60: [W5, Hv],
  91: Wv,
  92: [jv, Dg],
  93: ud,
  95: Rf,
  96: fv
}, C6 = {
  null: [Rf, m6]
}, w6 = {
  null: [42, 95]
}, E6 = {
  null: []
}, j6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: w6,
  contentInitial: y6,
  disable: E6,
  document: x6,
  flow: v6,
  flowInitial: b6,
  insideSpan: C6,
  string: S6,
  text: k6
}, Symbol.toStringTag, { value: "Module" }));
function N6(n, r, l) {
  let a = {
    _bufferIndex: -1,
    _index: 0,
    line: l && l.line || 1,
    column: l && l.column || 1,
    offset: l && l.offset || 0
  };
  const s = {}, u = [];
  let f = [], h = [];
  const p = {
    attempt: U(le),
    check: U(_),
    consume: I,
    enter: L,
    exit: re,
    interrupt: U(_, {
      interrupt: !0
    })
  }, g = {
    code: null,
    containerState: {},
    defineSkip: j,
    events: [],
    now: C,
    parser: n,
    previous: null,
    sliceSerialize: S,
    sliceStream: v,
    write: x
  };
  let y = r.tokenize.call(g, p);
  return r.resolveAll && u.push(r), g;
  function x(O) {
    return f = cn(f, O), M(), f[f.length - 1] !== null ? [] : (ae(r, 0), g.events = Cs(u, g.events, g), g.events);
  }
  function S(O, J) {
    return A6(v(O), J);
  }
  function v(O) {
    return T6(f, O);
  }
  function C() {
    const {
      _bufferIndex: O,
      _index: J,
      line: ue,
      column: ie,
      offset: ee
    } = a;
    return {
      _bufferIndex: O,
      _index: J,
      line: ue,
      column: ie,
      offset: ee
    };
  }
  function j(O) {
    s[O.line] = O.column, R();
  }
  function M() {
    let O;
    for (; a._index < f.length; ) {
      const J = f[a._index];
      if (typeof J == "string")
        for (O = a._index, a._bufferIndex < 0 && (a._bufferIndex = 0); a._index === O && a._bufferIndex < J.length; )
          T(J.charCodeAt(a._bufferIndex));
      else
        T(J);
    }
  }
  function T(O) {
    y = y(O);
  }
  function I(O) {
    ye(O) ? (a.line++, a.column = 1, a.offset += O === -3 ? 2 : 1, R()) : O !== -1 && (a.column++, a.offset++), a._bufferIndex < 0 ? a._index++ : (a._bufferIndex++, a._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    f[a._index].length && (a._bufferIndex = -1, a._index++)), g.previous = O;
  }
  function L(O, J) {
    const ue = J || {};
    return ue.type = O, ue.start = C(), g.events.push(["enter", ue, g]), h.push(ue), ue;
  }
  function re(O) {
    const J = h.pop();
    return J.end = C(), g.events.push(["exit", J, g]), J;
  }
  function le(O, J) {
    ae(O, J.from);
  }
  function _(O, J) {
    J.restore();
  }
  function U(O, J) {
    return ue;
    function ue(ie, ee, B) {
      let Y, se, he, E;
      return Array.isArray(ie) ? (
        /* c8 ignore next 1 */
        Q(ie)
      ) : "tokenize" in ie ? (
        // Looks like a construct.
        Q([
          /** @type {Construct} */
          ie
        ])
      ) : A(ie);
      function A(te) {
        return xe;
        function xe(ze) {
          const De = ze !== null && te[ze], Tt = ze !== null && te.null, En = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(De) ? De : De ? [De] : [],
            ...Array.isArray(Tt) ? Tt : Tt ? [Tt] : []
          ];
          return Q(En)(ze);
        }
      }
      function Q(te) {
        return Y = te, se = 0, te.length === 0 ? B : w(te[se]);
      }
      function w(te) {
        return xe;
        function xe(ze) {
          return E = fe(), he = te, te.partial || (g.currentConstruct = te), te.name && g.parser.constructs.disable.null.includes(te.name) ? P() : te.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            J ? Object.assign(Object.create(g), J) : g,
            p,
            G,
            P
          )(ze);
        }
      }
      function G(te) {
        return O(he, E), ee;
      }
      function P(te) {
        return E.restore(), ++se < Y.length ? w(Y[se]) : B;
      }
    }
  }
  function ae(O, J) {
    O.resolveAll && !u.includes(O) && u.push(O), O.resolve && Wt(g.events, J, g.events.length - J, O.resolve(g.events.slice(J), g)), O.resolveTo && (g.events = O.resolveTo(g.events, g));
  }
  function fe() {
    const O = C(), J = g.previous, ue = g.currentConstruct, ie = g.events.length, ee = Array.from(h);
    return {
      from: ie,
      restore: B
    };
    function B() {
      a = O, g.previous = J, g.currentConstruct = ue, g.events.length = ie, h = ee, R();
    }
  }
  function R() {
    a.line in s && a.column < 2 && (a.column = s[a.line], a.offset += s[a.line] - 1);
  }
}
function T6(n, r) {
  const l = r.start._index, a = r.start._bufferIndex, s = r.end._index, u = r.end._bufferIndex;
  let f;
  if (l === s)
    f = [n[l].slice(a, u)];
  else {
    if (f = n.slice(l, s), a > -1) {
      const h = f[0];
      typeof h == "string" ? f[0] = h.slice(a) : f.shift();
    }
    u > 0 && f.push(n[s].slice(0, u));
  }
  return f;
}
function A6(n, r) {
  let l = -1;
  const a = [];
  let s;
  for (; ++l < n.length; ) {
    const u = n[l];
    let f;
    if (typeof u == "string")
      f = u;
    else switch (u) {
      case -5: {
        f = "\r";
        break;
      }
      case -4: {
        f = `
`;
        break;
      }
      case -3: {
        f = `\r
`;
        break;
      }
      case -2: {
        f = r ? " " : "	";
        break;
      }
      case -1: {
        if (!r && s) continue;
        f = " ";
        break;
      }
      default:
        f = String.fromCharCode(u);
    }
    s = u === -2, a.push(f);
  }
  return a.join("");
}
function z6(n) {
  const a = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      _g([j6, ...(n || {}).extensions || []])
    ),
    content: s(G5),
    defined: [],
    document: s(X5),
    flow: s(f6),
    lazy: {},
    string: s(h6),
    text: s(p6)
  };
  return a;
  function s(u) {
    return f;
    function f(h) {
      return N6(a, u, h);
    }
  }
}
function _6(n) {
  for (; !Lg(n); )
    ;
  return n;
}
const dp = /[\0\t\n\r]/g;
function M6() {
  let n = 1, r = "", l = !0, a;
  return s;
  function s(u, f, h) {
    const p = [];
    let g, y, x, S, v;
    for (u = r + (typeof u == "string" ? u.toString() : new TextDecoder(f || void 0).decode(u)), x = 0, r = "", l && (u.charCodeAt(0) === 65279 && x++, l = void 0); x < u.length; ) {
      if (dp.lastIndex = x, g = dp.exec(u), S = g && g.index !== void 0 ? g.index : u.length, v = u.charCodeAt(S), !g) {
        r = u.slice(x);
        break;
      }
      if (v === 10 && x === S && a)
        p.push(-3), a = void 0;
      else
        switch (a && (p.push(-5), a = void 0), x < S && (p.push(u.slice(x, S)), n += S - x), v) {
          case 0: {
            p.push(65533), n++;
            break;
          }
          case 9: {
            for (y = Math.ceil(n / 4) * 4, p.push(-2); n++ < y; ) p.push(-1);
            break;
          }
          case 10: {
            p.push(-4), n = 1;
            break;
          }
          default:
            a = !0, n = 1;
        }
      x = S + 1;
    }
    return h && (a && p.push(-5), r && p.push(r), p.push(null)), p;
  }
}
const O6 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function D6(n) {
  return n.replace(O6, R6);
}
function R6(n, r, l) {
  if (r)
    return r;
  if (l.charCodeAt(0) === 35) {
    const s = l.charCodeAt(1), u = s === 120 || s === 88;
    return Mg(l.slice(u ? 2 : 1), u ? 16 : 10);
  }
  return sd(l) || n;
}
const Fg = {}.hasOwnProperty;
function L6(n, r, l) {
  return typeof r != "string" && (l = r, r = void 0), U6(l)(_6(z6(l).document().write(M6()(n, r, !0))));
}
function U6(n) {
  const r = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: u(ll),
      autolinkProtocol: fe,
      autolinkEmail: fe,
      atxHeading: u(nl),
      blockQuote: u(Tt),
      characterEscape: fe,
      characterReference: fe,
      codeFenced: u(En),
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: f,
      codeIndented: u(En, f),
      codeText: u(oi, f),
      codeTextData: fe,
      data: fe,
      codeFlowValue: fe,
      definition: u(wa),
      definitionDestinationString: f,
      definitionLabelString: f,
      definitionTitleString: f,
      emphasis: u(jn),
      hardBreakEscape: u(rl),
      hardBreakTrailing: u(rl),
      htmlFlow: u(Ea, f),
      htmlFlowData: fe,
      htmlText: u(Ea, f),
      htmlTextData: fe,
      image: u(ja),
      label: f,
      link: u(ll),
      listItem: u(si),
      listItemValue: S,
      listOrdered: u(il, x),
      listUnordered: u(il),
      paragraph: u(Ts),
      reference: w,
      referenceString: f,
      resourceDestinationString: f,
      resourceTitleString: f,
      setextHeading: u(nl),
      strong: u(As),
      thematicBreak: u(zs)
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: le,
      autolink: p(),
      autolinkEmail: De,
      autolinkProtocol: ze,
      blockQuote: p(),
      characterEscapeValue: R,
      characterReferenceMarkerHexadecimal: P,
      characterReferenceMarkerNumeric: P,
      characterReferenceValue: te,
      characterReference: xe,
      codeFenced: p(M),
      codeFencedFence: j,
      codeFencedFenceInfo: v,
      codeFencedFenceMeta: C,
      codeFlowValue: R,
      codeIndented: p(T),
      codeText: p(ee),
      codeTextData: R,
      data: R,
      definition: p(),
      definitionDestinationString: re,
      definitionLabelString: I,
      definitionTitleString: L,
      emphasis: p(),
      hardBreakEscape: p(J),
      hardBreakTrailing: p(J),
      htmlFlow: p(ue),
      htmlFlowData: R,
      htmlText: p(ie),
      htmlTextData: R,
      image: p(Y),
      label: he,
      labelText: se,
      lineEnding: O,
      link: p(B),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: G,
      resourceDestinationString: E,
      resourceTitleString: A,
      resource: Q,
      setextHeading: p(ae),
      setextHeadingLineSequence: U,
      setextHeadingText: _,
      strong: p(),
      thematicBreak: p()
    }
  };
  Vg(r, (n || {}).mdastExtensions || []);
  const l = {};
  return a;
  function a(Z) {
    let oe = {
      type: "root",
      children: []
    };
    const ve = {
      stack: [oe],
      tokenStack: [],
      config: r,
      enter: h,
      exit: g,
      buffer: f,
      resume: y,
      data: l
    }, je = [];
    let qe = -1;
    for (; ++qe < Z.length; )
      if (Z[qe][1].type === "listOrdered" || Z[qe][1].type === "listUnordered")
        if (Z[qe][0] === "enter")
          je.push(qe);
        else {
          const It = je.pop();
          qe = s(Z, It, qe);
        }
    for (qe = -1; ++qe < Z.length; ) {
      const It = r[Z[qe][0]];
      Fg.call(It, Z[qe][1].type) && It[Z[qe][1].type].call(Object.assign({
        sliceSerialize: Z[qe][2].sliceSerialize
      }, ve), Z[qe][1]);
    }
    if (ve.tokenStack.length > 0) {
      const It = ve.tokenStack[ve.tokenStack.length - 1];
      (It[1] || mp).call(ve, void 0, It[0]);
    }
    for (oe.position = {
      start: kr(Z.length > 0 ? Z[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: kr(Z.length > 0 ? Z[Z.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, qe = -1; ++qe < r.transforms.length; )
      oe = r.transforms[qe](oe) || oe;
    return oe;
  }
  function s(Z, oe, ve) {
    let je = oe - 1, qe = -1, It = !1, Nn, Et, ct, At;
    for (; ++je <= ve; ) {
      const Ye = Z[je];
      switch (Ye[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Ye[0] === "enter" ? qe++ : qe--, At = void 0;
          break;
        }
        case "lineEndingBlank": {
          Ye[0] === "enter" && (Nn && !At && !qe && !ct && (ct = je), At = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          At = void 0;
      }
      if (!qe && Ye[0] === "enter" && Ye[1].type === "listItemPrefix" || qe === -1 && Ye[0] === "exit" && (Ye[1].type === "listUnordered" || Ye[1].type === "listOrdered")) {
        if (Nn) {
          let Kn = je;
          for (Et = void 0; Kn--; ) {
            const fn = Z[Kn];
            if (fn[1].type === "lineEnding" || fn[1].type === "lineEndingBlank") {
              if (fn[0] === "exit") continue;
              Et && (Z[Et][1].type = "lineEndingBlank", It = !0), fn[1].type = "lineEnding", Et = Kn;
            } else if (!(fn[1].type === "linePrefix" || fn[1].type === "blockQuotePrefix" || fn[1].type === "blockQuotePrefixWhitespace" || fn[1].type === "blockQuoteMarker" || fn[1].type === "listItemIndent")) break;
          }
          ct && (!Et || ct < Et) && (Nn._spread = !0), Nn.end = Object.assign({}, Et ? Z[Et][1].start : Ye[1].end), Z.splice(Et || je, 0, ["exit", Nn, Ye[2]]), je++, ve++;
        }
        if (Ye[1].type === "listItemPrefix") {
          const Kn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ye[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Nn = Kn, Z.splice(je, 0, ["enter", Kn, Ye[2]]), je++, ve++, ct = void 0, At = !0;
        }
      }
    }
    return Z[oe][1]._spread = It, ve;
  }
  function u(Z, oe) {
    return ve;
    function ve(je) {
      h.call(this, Z(je), je), oe && oe.call(this, je);
    }
  }
  function f() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function h(Z, oe, ve) {
    this.stack[this.stack.length - 1].children.push(Z), this.stack.push(Z), this.tokenStack.push([oe, ve || void 0]), Z.position = {
      start: kr(oe.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function p(Z) {
    return oe;
    function oe(ve) {
      Z && Z.call(this, ve), g.call(this, ve);
    }
  }
  function g(Z, oe) {
    const ve = this.stack.pop(), je = this.tokenStack.pop();
    if (je)
      je[0].type !== Z.type && (oe ? oe.call(this, Z, je[0]) : (je[1] || mp).call(this, Z, je[0]));
    else throw new Error("Cannot close `" + Z.type + "` (" + fa({
      start: Z.start,
      end: Z.end
    }) + "): it’s not open");
    ve.position.end = kr(Z.end);
  }
  function y() {
    return od(this.stack.pop());
  }
  function x() {
    this.data.expectingFirstListItemValue = !0;
  }
  function S(Z) {
    if (this.data.expectingFirstListItemValue) {
      const oe = this.stack[this.stack.length - 2];
      oe.start = Number.parseInt(this.sliceSerialize(Z), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function v() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.lang = Z;
  }
  function C() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.meta = Z;
  }
  function j() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function M() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.value = Z.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function T() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.value = Z.replace(/(\r?\n|\r)$/g, "");
  }
  function I(Z) {
    const oe = this.resume(), ve = this.stack[this.stack.length - 1];
    ve.label = oe, ve.identifier = pn(this.sliceSerialize(Z)).toLowerCase();
  }
  function L() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.title = Z;
  }
  function re() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.url = Z;
  }
  function le(Z) {
    const oe = this.stack[this.stack.length - 1];
    if (!oe.depth) {
      const ve = this.sliceSerialize(Z).length;
      oe.depth = ve;
    }
  }
  function _() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function U(Z) {
    const oe = this.stack[this.stack.length - 1];
    oe.depth = this.sliceSerialize(Z).codePointAt(0) === 61 ? 1 : 2;
  }
  function ae() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function fe(Z) {
    const ve = this.stack[this.stack.length - 1].children;
    let je = ve[ve.length - 1];
    (!je || je.type !== "text") && (je = wt(), je.position = {
      start: kr(Z.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, ve.push(je)), this.stack.push(je);
  }
  function R(Z) {
    const oe = this.stack.pop();
    oe.value += this.sliceSerialize(Z), oe.position.end = kr(Z.end);
  }
  function O(Z) {
    const oe = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const ve = oe.children[oe.children.length - 1];
      ve.position.end = kr(Z.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && r.canContainEols.includes(oe.type) && (fe.call(this, Z), R.call(this, Z));
  }
  function J() {
    this.data.atHardBreak = !0;
  }
  function ue() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.value = Z;
  }
  function ie() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.value = Z;
  }
  function ee() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.value = Z;
  }
  function B() {
    const Z = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const oe = this.data.referenceType || "shortcut";
      Z.type += "Reference", Z.referenceType = oe, delete Z.url, delete Z.title;
    } else
      delete Z.identifier, delete Z.label;
    this.data.referenceType = void 0;
  }
  function Y() {
    const Z = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const oe = this.data.referenceType || "shortcut";
      Z.type += "Reference", Z.referenceType = oe, delete Z.url, delete Z.title;
    } else
      delete Z.identifier, delete Z.label;
    this.data.referenceType = void 0;
  }
  function se(Z) {
    const oe = this.sliceSerialize(Z), ve = this.stack[this.stack.length - 2];
    ve.label = D6(oe), ve.identifier = pn(oe).toLowerCase();
  }
  function he() {
    const Z = this.stack[this.stack.length - 1], oe = this.resume(), ve = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, ve.type === "link") {
      const je = Z.children;
      ve.children = je;
    } else
      ve.alt = oe;
  }
  function E() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.url = Z;
  }
  function A() {
    const Z = this.resume(), oe = this.stack[this.stack.length - 1];
    oe.title = Z;
  }
  function Q() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function G(Z) {
    const oe = this.resume(), ve = this.stack[this.stack.length - 1];
    ve.label = oe, ve.identifier = pn(this.sliceSerialize(Z)).toLowerCase(), this.data.referenceType = "full";
  }
  function P(Z) {
    this.data.characterReferenceType = Z.type;
  }
  function te(Z) {
    const oe = this.sliceSerialize(Z), ve = this.data.characterReferenceType;
    let je;
    ve ? (je = Mg(oe, ve === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : je = sd(oe);
    const qe = this.stack[this.stack.length - 1];
    qe.value += je;
  }
  function xe(Z) {
    const oe = this.stack.pop();
    oe.position.end = kr(Z.end);
  }
  function ze(Z) {
    R.call(this, Z);
    const oe = this.stack[this.stack.length - 1];
    oe.url = this.sliceSerialize(Z);
  }
  function De(Z) {
    R.call(this, Z);
    const oe = this.stack[this.stack.length - 1];
    oe.url = "mailto:" + this.sliceSerialize(Z);
  }
  function Tt() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function En() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function oi() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function wa() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function jn() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function nl() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function rl() {
    return {
      type: "break"
    };
  }
  function Ea() {
    return {
      type: "html",
      value: ""
    };
  }
  function ja() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function ll() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function il(Z) {
    return {
      type: "list",
      ordered: Z.type === "listOrdered",
      start: null,
      spread: Z._spread,
      children: []
    };
  }
  function si(Z) {
    return {
      type: "listItem",
      spread: Z._spread,
      checked: null,
      children: []
    };
  }
  function Ts() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function As() {
    return {
      type: "strong",
      children: []
    };
  }
  function wt() {
    return {
      type: "text",
      value: ""
    };
  }
  function zs() {
    return {
      type: "thematicBreak"
    };
  }
}
function kr(n) {
  return {
    line: n.line,
    column: n.column,
    offset: n.offset
  };
}
function Vg(n, r) {
  let l = -1;
  for (; ++l < r.length; ) {
    const a = r[l];
    Array.isArray(a) ? Vg(n, a) : B6(n, a);
  }
}
function B6(n, r) {
  let l;
  for (l in r)
    if (Fg.call(r, l))
      switch (l) {
        case "canContainEols": {
          const a = r[l];
          a && n[l].push(...a);
          break;
        }
        case "transforms": {
          const a = r[l];
          a && n[l].push(...a);
          break;
        }
        case "enter":
        case "exit": {
          const a = r[l];
          a && Object.assign(n[l], a);
          break;
        }
      }
}
function mp(n, r) {
  throw n ? new Error("Cannot close `" + n.type + "` (" + fa({
    start: n.start,
    end: n.end
  }) + "): a different token (`" + r.type + "`, " + fa({
    start: r.start,
    end: r.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + r.type + "`, " + fa({
    start: r.start,
    end: r.end
  }) + ") is still open");
}
function H6(n) {
  const r = this;
  r.parser = l;
  function l(a) {
    return L6(a, {
      ...r.data("settings"),
      ...n,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: r.data("micromarkExtensions") || [],
      mdastExtensions: r.data("fromMarkdownExtensions") || []
    });
  }
}
function q6(n, r) {
  const l = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: n.wrap(n.all(r), !0)
  };
  return n.patch(r, l), n.applyData(r, l);
}
function I6(n, r) {
  const l = { type: "element", tagName: "br", properties: {}, children: [] };
  return n.patch(r, l), [n.applyData(r, l), { type: "text", value: `
` }];
}
function F6(n, r) {
  const l = r.value ? r.value + `
` : "", a = {}, s = r.lang ? r.lang.split(/\s+/) : [];
  s.length > 0 && (a.className = ["language-" + s[0]]);
  let u = {
    type: "element",
    tagName: "code",
    properties: a,
    children: [{ type: "text", value: l }]
  };
  return r.meta && (u.data = { meta: r.meta }), n.patch(r, u), u = n.applyData(r, u), u = { type: "element", tagName: "pre", properties: {}, children: [u] }, n.patch(r, u), u;
}
function V6(n, r) {
  const l = {
    type: "element",
    tagName: "del",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, l), n.applyData(r, l);
}
function $6(n, r) {
  const l = {
    type: "element",
    tagName: "em",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, l), n.applyData(r, l);
}
function G6(n, r) {
  const l = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", a = String(r.identifier).toUpperCase(), s = ai(a.toLowerCase()), u = n.footnoteOrder.indexOf(a);
  let f, h = n.footnoteCounts.get(a);
  h === void 0 ? (h = 0, n.footnoteOrder.push(a), f = n.footnoteOrder.length) : f = u + 1, h += 1, n.footnoteCounts.set(a, h);
  const p = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + l + "fn-" + s,
      id: l + "fnref-" + s + (h > 1 ? "-" + h : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(f) }]
  };
  n.patch(r, p);
  const g = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [p]
  };
  return n.patch(r, g), n.applyData(r, g);
}
function Y6(n, r) {
  const l = {
    type: "element",
    tagName: "h" + r.depth,
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, l), n.applyData(r, l);
}
function X6(n, r) {
  if (n.options.allowDangerousHtml) {
    const l = { type: "raw", value: r.value };
    return n.patch(r, l), n.applyData(r, l);
  }
}
function $g(n, r) {
  const l = r.referenceType;
  let a = "]";
  if (l === "collapsed" ? a += "[]" : l === "full" && (a += "[" + (r.label || r.identifier) + "]"), r.type === "imageReference")
    return [{ type: "text", value: "![" + r.alt + a }];
  const s = n.all(r), u = s[0];
  u && u.type === "text" ? u.value = "[" + u.value : s.unshift({ type: "text", value: "[" });
  const f = s[s.length - 1];
  return f && f.type === "text" ? f.value += a : s.push({ type: "text", value: a }), s;
}
function Q6(n, r) {
  const l = String(r.identifier).toUpperCase(), a = n.definitionById.get(l);
  if (!a)
    return $g(n, r);
  const s = { src: ai(a.url || ""), alt: r.alt };
  a.title !== null && a.title !== void 0 && (s.title = a.title);
  const u = { type: "element", tagName: "img", properties: s, children: [] };
  return n.patch(r, u), n.applyData(r, u);
}
function P6(n, r) {
  const l = { src: ai(r.url) };
  r.alt !== null && r.alt !== void 0 && (l.alt = r.alt), r.title !== null && r.title !== void 0 && (l.title = r.title);
  const a = { type: "element", tagName: "img", properties: l, children: [] };
  return n.patch(r, a), n.applyData(r, a);
}
function Z6(n, r) {
  const l = { type: "text", value: r.value.replace(/\r?\n|\r/g, " ") };
  n.patch(r, l);
  const a = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [l]
  };
  return n.patch(r, a), n.applyData(r, a);
}
function K6(n, r) {
  const l = String(r.identifier).toUpperCase(), a = n.definitionById.get(l);
  if (!a)
    return $g(n, r);
  const s = { href: ai(a.url || "") };
  a.title !== null && a.title !== void 0 && (s.title = a.title);
  const u = {
    type: "element",
    tagName: "a",
    properties: s,
    children: n.all(r)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function W6(n, r) {
  const l = { href: ai(r.url) };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: l,
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function J6(n, r, l) {
  const a = n.all(r), s = l ? e8(l) : Gg(r), u = {}, f = [];
  if (typeof r.checked == "boolean") {
    const y = a[0];
    let x;
    y && y.type === "element" && y.tagName === "p" ? x = y : (x = { type: "element", tagName: "p", properties: {}, children: [] }, a.unshift(x)), x.children.length > 0 && x.children.unshift({ type: "text", value: " " }), x.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: r.checked, disabled: !0 },
      children: []
    }), u.className = ["task-list-item"];
  }
  let h = -1;
  for (; ++h < a.length; ) {
    const y = a[h];
    (s || h !== 0 || y.type !== "element" || y.tagName !== "p") && f.push({ type: "text", value: `
` }), y.type === "element" && y.tagName === "p" && !s ? f.push(...y.children) : f.push(y);
  }
  const p = a[a.length - 1];
  p && (s || p.type !== "element" || p.tagName !== "p") && f.push({ type: "text", value: `
` });
  const g = { type: "element", tagName: "li", properties: u, children: f };
  return n.patch(r, g), n.applyData(r, g);
}
function e8(n) {
  let r = !1;
  if (n.type === "list") {
    r = n.spread || !1;
    const l = n.children;
    let a = -1;
    for (; !r && ++a < l.length; )
      r = Gg(l[a]);
  }
  return r;
}
function Gg(n) {
  const r = n.spread;
  return r ?? n.children.length > 1;
}
function t8(n, r) {
  const l = {}, a = n.all(r);
  let s = -1;
  for (typeof r.start == "number" && r.start !== 1 && (l.start = r.start); ++s < a.length; ) {
    const f = a[s];
    if (f.type === "element" && f.tagName === "li" && f.properties && Array.isArray(f.properties.className) && f.properties.className.includes("task-list-item")) {
      l.className = ["contains-task-list"];
      break;
    }
  }
  const u = {
    type: "element",
    tagName: r.ordered ? "ol" : "ul",
    properties: l,
    children: n.wrap(a, !0)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function n8(n, r) {
  const l = {
    type: "element",
    tagName: "p",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, l), n.applyData(r, l);
}
function r8(n, r) {
  const l = { type: "root", children: n.wrap(n.all(r)) };
  return n.patch(r, l), n.applyData(r, l);
}
function l8(n, r) {
  const l = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, l), n.applyData(r, l);
}
function i8(n, r) {
  const l = n.all(r), a = l.shift(), s = [];
  if (a) {
    const f = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: n.wrap([a], !0)
    };
    n.patch(r.children[0], f), s.push(f);
  }
  if (l.length > 0) {
    const f = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: n.wrap(l, !0)
    }, h = rd(r.children[1]), p = wg(r.children[r.children.length - 1]);
    h && p && (f.position = { start: h, end: p }), s.push(f);
  }
  const u = {
    type: "element",
    tagName: "table",
    properties: {},
    children: n.wrap(s, !0)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function a8(n, r, l) {
  const a = l ? l.children : void 0, u = (a ? a.indexOf(r) : 1) === 0 ? "th" : "td", f = l && l.type === "table" ? l.align : void 0, h = f ? f.length : r.children.length;
  let p = -1;
  const g = [];
  for (; ++p < h; ) {
    const x = r.children[p], S = {}, v = f ? f[p] : void 0;
    v && (S.align = v);
    let C = { type: "element", tagName: u, properties: S, children: [] };
    x && (C.children = n.all(x), n.patch(x, C), C = n.applyData(x, C)), g.push(C);
  }
  const y = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: n.wrap(g, !0)
  };
  return n.patch(r, y), n.applyData(r, y);
}
function o8(n, r) {
  const l = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, l), n.applyData(r, l);
}
const hp = 9, pp = 32;
function s8(n) {
  const r = String(n), l = /\r?\n|\r/g;
  let a = l.exec(r), s = 0;
  const u = [];
  for (; a; )
    u.push(
      gp(r.slice(s, a.index), s > 0, !0),
      a[0]
    ), s = a.index + a[0].length, a = l.exec(r);
  return u.push(gp(r.slice(s), s > 0, !1)), u.join("");
}
function gp(n, r, l) {
  let a = 0, s = n.length;
  if (r) {
    let u = n.codePointAt(a);
    for (; u === hp || u === pp; )
      a++, u = n.codePointAt(a);
  }
  if (l) {
    let u = n.codePointAt(s - 1);
    for (; u === hp || u === pp; )
      s--, u = n.codePointAt(s - 1);
  }
  return s > a ? n.slice(a, s) : "";
}
function u8(n, r) {
  const l = { type: "text", value: s8(String(r.value)) };
  return n.patch(r, l), n.applyData(r, l);
}
function c8(n, r) {
  const l = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return n.patch(r, l), n.applyData(r, l);
}
const f8 = {
  blockquote: q6,
  break: I6,
  code: F6,
  delete: V6,
  emphasis: $6,
  footnoteReference: G6,
  heading: Y6,
  html: X6,
  imageReference: Q6,
  image: P6,
  inlineCode: Z6,
  linkReference: K6,
  link: W6,
  listItem: J6,
  list: t8,
  paragraph: n8,
  // @ts-expect-error: root is different, but hard to type.
  root: r8,
  strong: l8,
  table: i8,
  tableCell: o8,
  tableRow: a8,
  text: u8,
  thematicBreak: c8,
  toml: Qo,
  yaml: Qo,
  definition: Qo,
  footnoteDefinition: Qo
};
function Qo() {
}
const Yg = -1, ws = 0, ma = 1, ss = 2, cd = 3, fd = 4, dd = 5, md = 6, Xg = 7, Qg = 8, xp = typeof self == "object" ? self : globalThis, d8 = (n, r) => {
  const l = (s, u) => (n.set(u, s), s), a = (s) => {
    if (n.has(s))
      return n.get(s);
    const [u, f] = r[s];
    switch (u) {
      case ws:
      case Yg:
        return l(f, s);
      case ma: {
        const h = l([], s);
        for (const p of f)
          h.push(a(p));
        return h;
      }
      case ss: {
        const h = l({}, s);
        for (const [p, g] of f)
          h[a(p)] = a(g);
        return h;
      }
      case cd:
        return l(new Date(f), s);
      case fd: {
        const { source: h, flags: p } = f;
        return l(new RegExp(h, p), s);
      }
      case dd: {
        const h = l(/* @__PURE__ */ new Map(), s);
        for (const [p, g] of f)
          h.set(a(p), a(g));
        return h;
      }
      case md: {
        const h = l(/* @__PURE__ */ new Set(), s);
        for (const p of f)
          h.add(a(p));
        return h;
      }
      case Xg: {
        const { name: h, message: p } = f;
        return l(new xp[h](p), s);
      }
      case Qg:
        return l(BigInt(f), s);
      case "BigInt":
        return l(Object(BigInt(f)), s);
      case "ArrayBuffer":
        return l(new Uint8Array(f).buffer, f);
      case "DataView": {
        const { buffer: h } = new Uint8Array(f);
        return l(new DataView(h), f);
      }
    }
    return l(new xp[u](f), s);
  };
  return a;
}, yp = (n) => d8(/* @__PURE__ */ new Map(), n)(0), Yl = "", { toString: m8 } = {}, { keys: h8 } = Object, oa = (n) => {
  const r = typeof n;
  if (r !== "object" || !n)
    return [ws, r];
  const l = m8.call(n).slice(8, -1);
  switch (l) {
    case "Array":
      return [ma, Yl];
    case "Object":
      return [ss, Yl];
    case "Date":
      return [cd, Yl];
    case "RegExp":
      return [fd, Yl];
    case "Map":
      return [dd, Yl];
    case "Set":
      return [md, Yl];
    case "DataView":
      return [ma, l];
  }
  return l.includes("Array") ? [ma, l] : l.includes("Error") ? [Xg, l] : [ss, l];
}, Po = ([n, r]) => n === ws && (r === "function" || r === "symbol"), p8 = (n, r, l, a) => {
  const s = (f, h) => {
    const p = a.push(f) - 1;
    return l.set(h, p), p;
  }, u = (f) => {
    if (l.has(f))
      return l.get(f);
    let [h, p] = oa(f);
    switch (h) {
      case ws: {
        let y = f;
        switch (p) {
          case "bigint":
            h = Qg, y = f.toString();
            break;
          case "function":
          case "symbol":
            if (n)
              throw new TypeError("unable to serialize " + p);
            y = null;
            break;
          case "undefined":
            return s([Yg], f);
        }
        return s([h, y], f);
      }
      case ma: {
        if (p) {
          let S = f;
          return p === "DataView" ? S = new Uint8Array(f.buffer) : p === "ArrayBuffer" && (S = new Uint8Array(f)), s([p, [...S]], f);
        }
        const y = [], x = s([h, y], f);
        for (const S of f)
          y.push(u(S));
        return x;
      }
      case ss: {
        if (p)
          switch (p) {
            case "BigInt":
              return s([p, f.toString()], f);
            case "Boolean":
            case "Number":
            case "String":
              return s([p, f.valueOf()], f);
          }
        if (r && "toJSON" in f)
          return u(f.toJSON());
        const y = [], x = s([h, y], f);
        for (const S of h8(f))
          (n || !Po(oa(f[S]))) && y.push([u(S), u(f[S])]);
        return x;
      }
      case cd:
        return s([h, f.toISOString()], f);
      case fd: {
        const { source: y, flags: x } = f;
        return s([h, { source: y, flags: x }], f);
      }
      case dd: {
        const y = [], x = s([h, y], f);
        for (const [S, v] of f)
          (n || !(Po(oa(S)) || Po(oa(v)))) && y.push([u(S), u(v)]);
        return x;
      }
      case md: {
        const y = [], x = s([h, y], f);
        for (const S of f)
          (n || !Po(oa(S))) && y.push(u(S));
        return x;
      }
    }
    const { message: g } = f;
    return s([h, { name: p, message: g }], f);
  };
  return u;
}, bp = (n, { json: r, lossy: l } = {}) => {
  const a = [];
  return p8(!(r || l), !!r, /* @__PURE__ */ new Map(), a)(n), a;
}, us = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (n, r) => r && ("json" in r || "lossy" in r) ? yp(bp(n, r)) : structuredClone(n)
) : (n, r) => yp(bp(n, r));
function g8(n, r) {
  const l = [{ type: "text", value: "↩" }];
  return r > 1 && l.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(r) }]
  }), l;
}
function x8(n, r) {
  return "Back to reference " + (n + 1) + (r > 1 ? "-" + r : "");
}
function y8(n) {
  const r = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", l = n.options.footnoteBackContent || g8, a = n.options.footnoteBackLabel || x8, s = n.options.footnoteLabel || "Footnotes", u = n.options.footnoteLabelTagName || "h2", f = n.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, h = [];
  let p = -1;
  for (; ++p < n.footnoteOrder.length; ) {
    const g = n.footnoteById.get(
      n.footnoteOrder[p]
    );
    if (!g)
      continue;
    const y = n.all(g), x = String(g.identifier).toUpperCase(), S = ai(x.toLowerCase());
    let v = 0;
    const C = [], j = n.footnoteCounts.get(x);
    for (; j !== void 0 && ++v <= j; ) {
      C.length > 0 && C.push({ type: "text", value: " " });
      let I = typeof l == "string" ? l : l(p, v);
      typeof I == "string" && (I = { type: "text", value: I }), C.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + r + "fnref-" + S + (v > 1 ? "-" + v : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof a == "string" ? a : a(p, v),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(I) ? I : [I]
      });
    }
    const M = y[y.length - 1];
    if (M && M.type === "element" && M.tagName === "p") {
      const I = M.children[M.children.length - 1];
      I && I.type === "text" ? I.value += " " : M.children.push({ type: "text", value: " " }), M.children.push(...C);
    } else
      y.push(...C);
    const T = {
      type: "element",
      tagName: "li",
      properties: { id: r + "fn-" + S },
      children: n.wrap(y, !0)
    };
    n.patch(g, T), h.push(T);
  }
  if (h.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: u,
          properties: {
            ...us(f),
            id: "footnote-label"
          },
          children: [{ type: "text", value: s }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: n.wrap(h, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Es = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(n) {
    if (n == null)
      return k8;
    if (typeof n == "function")
      return js(n);
    if (typeof n == "object")
      return Array.isArray(n) ? b8(n) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        v8(
          /** @type {Props} */
          n
        )
      );
    if (typeof n == "string")
      return S8(n);
    throw new Error("Expected function, string, or object as test");
  })
);
function b8(n) {
  const r = [];
  let l = -1;
  for (; ++l < n.length; )
    r[l] = Es(n[l]);
  return js(a);
  function a(...s) {
    let u = -1;
    for (; ++u < r.length; )
      if (r[u].apply(this, s)) return !0;
    return !1;
  }
}
function v8(n) {
  const r = (
    /** @type {Record<string, unknown>} */
    n
  );
  return js(l);
  function l(a) {
    const s = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      a
    );
    let u;
    for (u in n)
      if (s[u] !== r[u]) return !1;
    return !0;
  }
}
function S8(n) {
  return js(r);
  function r(l) {
    return l && l.type === n;
  }
}
function js(n) {
  return r;
  function r(l, a, s) {
    return !!(C8(l) && n.call(
      this,
      l,
      typeof a == "number" ? a : void 0,
      s || void 0
    ));
  }
}
function k8() {
  return !0;
}
function C8(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const Pg = [], w8 = !0, Lf = !1, E8 = "skip";
function Zg(n, r, l, a) {
  let s;
  typeof r == "function" && typeof l != "function" ? (a = l, l = r) : s = r;
  const u = Es(s), f = a ? -1 : 1;
  h(n, void 0, [])();
  function h(p, g, y) {
    const x = (
      /** @type {Record<string, unknown>} */
      p && typeof p == "object" ? p : {}
    );
    if (typeof x.type == "string") {
      const v = (
        // `hast`
        typeof x.tagName == "string" ? x.tagName : (
          // `xast`
          typeof x.name == "string" ? x.name : void 0
        )
      );
      Object.defineProperty(S, "name", {
        value: "node (" + (p.type + (v ? "<" + v + ">" : "")) + ")"
      });
    }
    return S;
    function S() {
      let v = Pg, C, j, M;
      if ((!r || u(p, g, y[y.length - 1] || void 0)) && (v = j8(l(p, y)), v[0] === Lf))
        return v;
      if ("children" in p && p.children) {
        const T = (
          /** @type {UnistParent} */
          p
        );
        if (T.children && v[0] !== E8)
          for (j = (a ? T.children.length : -1) + f, M = y.concat(T); j > -1 && j < T.children.length; ) {
            const I = T.children[j];
            if (C = h(I, j, M)(), C[0] === Lf)
              return C;
            j = typeof C[1] == "number" ? C[1] : j + f;
          }
      }
      return v;
    }
  }
}
function j8(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [w8, n] : n == null ? Pg : [n];
}
function hd(n, r, l, a) {
  let s, u, f;
  typeof r == "function" && typeof l != "function" ? (u = void 0, f = r, s = l) : (u = r, f = l, s = a), Zg(n, u, h, s);
  function h(p, g) {
    const y = g[g.length - 1], x = y ? y.children.indexOf(p) : void 0;
    return f(p, x, y);
  }
}
const Uf = {}.hasOwnProperty, N8 = {};
function T8(n, r) {
  const l = r || N8, a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), f = { ...f8, ...l.handlers }, h = {
    all: g,
    applyData: z8,
    definitionById: a,
    footnoteById: s,
    footnoteCounts: u,
    footnoteOrder: [],
    handlers: f,
    one: p,
    options: l,
    patch: A8,
    wrap: M8
  };
  return hd(n, function(y) {
    if (y.type === "definition" || y.type === "footnoteDefinition") {
      const x = y.type === "definition" ? a : s, S = String(y.identifier).toUpperCase();
      x.has(S) || x.set(S, y);
    }
  }), h;
  function p(y, x) {
    const S = y.type, v = h.handlers[S];
    if (Uf.call(h.handlers, S) && v)
      return v(h, y, x);
    if (h.options.passThrough && h.options.passThrough.includes(S)) {
      if ("children" in y) {
        const { children: j, ...M } = y, T = us(M);
        return T.children = h.all(y), T;
      }
      return us(y);
    }
    return (h.options.unknownHandler || _8)(h, y, x);
  }
  function g(y) {
    const x = [];
    if ("children" in y) {
      const S = y.children;
      let v = -1;
      for (; ++v < S.length; ) {
        const C = h.one(S[v], y);
        if (C) {
          if (v && S[v - 1].type === "break" && (!Array.isArray(C) && C.type === "text" && (C.value = vp(C.value)), !Array.isArray(C) && C.type === "element")) {
            const j = C.children[0];
            j && j.type === "text" && (j.value = vp(j.value));
          }
          Array.isArray(C) ? x.push(...C) : x.push(C);
        }
      }
    }
    return x;
  }
}
function A8(n, r) {
  n.position && (r.position = x5(n));
}
function z8(n, r) {
  let l = r;
  if (n && n.data) {
    const a = n.data.hName, s = n.data.hChildren, u = n.data.hProperties;
    if (typeof a == "string")
      if (l.type === "element")
        l.tagName = a;
      else {
        const f = "children" in l ? l.children : [l];
        l = { type: "element", tagName: a, properties: {}, children: f };
      }
    l.type === "element" && u && Object.assign(l.properties, us(u)), "children" in l && l.children && s !== null && s !== void 0 && (l.children = s);
  }
  return l;
}
function _8(n, r) {
  const l = r.data || {}, a = "value" in r && !(Uf.call(l, "hProperties") || Uf.call(l, "hChildren")) ? { type: "text", value: r.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function M8(n, r) {
  const l = [];
  let a = -1;
  for (r && l.push({ type: "text", value: `
` }); ++a < n.length; )
    a && l.push({ type: "text", value: `
` }), l.push(n[a]);
  return r && n.length > 0 && l.push({ type: "text", value: `
` }), l;
}
function vp(n) {
  let r = 0, l = n.charCodeAt(r);
  for (; l === 9 || l === 32; )
    r++, l = n.charCodeAt(r);
  return n.slice(r);
}
function Sp(n, r) {
  const l = T8(n, r), a = l.one(n, void 0), s = y8(l), u = Array.isArray(a) ? { type: "root", children: a } : a || { type: "root", children: [] };
  return s && u.children.push({ type: "text", value: `
` }, s), u;
}
function O8(n, r) {
  return n && "run" in n ? async function(l, a) {
    const s = (
      /** @type {HastRoot} */
      Sp(l, { file: a, ...r })
    );
    await n.run(s, a);
  } : function(l, a) {
    return (
      /** @type {HastRoot} */
      Sp(l, { file: a, ...n || r })
    );
  };
}
function kp(n) {
  if (n)
    throw n;
}
var sf, Cp;
function D8() {
  if (Cp) return sf;
  Cp = 1;
  var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, l = Object.defineProperty, a = Object.getOwnPropertyDescriptor, s = function(g) {
    return typeof Array.isArray == "function" ? Array.isArray(g) : r.call(g) === "[object Array]";
  }, u = function(g) {
    if (!g || r.call(g) !== "[object Object]")
      return !1;
    var y = n.call(g, "constructor"), x = g.constructor && g.constructor.prototype && n.call(g.constructor.prototype, "isPrototypeOf");
    if (g.constructor && !y && !x)
      return !1;
    var S;
    for (S in g)
      ;
    return typeof S > "u" || n.call(g, S);
  }, f = function(g, y) {
    l && y.name === "__proto__" ? l(g, y.name, {
      enumerable: !0,
      configurable: !0,
      value: y.newValue,
      writable: !0
    }) : g[y.name] = y.newValue;
  }, h = function(g, y) {
    if (y === "__proto__")
      if (n.call(g, y)) {
        if (a)
          return a(g, y).value;
      } else return;
    return g[y];
  };
  return sf = function p() {
    var g, y, x, S, v, C, j = arguments[0], M = 1, T = arguments.length, I = !1;
    for (typeof j == "boolean" && (I = j, j = arguments[1] || {}, M = 2), (j == null || typeof j != "object" && typeof j != "function") && (j = {}); M < T; ++M)
      if (g = arguments[M], g != null)
        for (y in g)
          x = h(j, y), S = h(g, y), j !== S && (I && S && (u(S) || (v = s(S))) ? (v ? (v = !1, C = x && s(x) ? x : []) : C = x && u(x) ? x : {}, f(j, { name: y, newValue: p(I, C, S) })) : typeof S < "u" && f(j, { name: y, newValue: S }));
    return j;
  }, sf;
}
var R8 = D8();
const uf = /* @__PURE__ */ ni(R8);
function Bf(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const r = Object.getPrototypeOf(n);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}
function L8() {
  const n = [], r = { run: l, use: a };
  return r;
  function l(...s) {
    let u = -1;
    const f = s.pop();
    if (typeof f != "function")
      throw new TypeError("Expected function as last argument, not " + f);
    h(null, ...s);
    function h(p, ...g) {
      const y = n[++u];
      let x = -1;
      if (p) {
        f(p);
        return;
      }
      for (; ++x < s.length; )
        (g[x] === null || g[x] === void 0) && (g[x] = s[x]);
      s = g, y ? U8(y, h)(...g) : f(null, ...g);
    }
  }
  function a(s) {
    if (typeof s != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + s
      );
    return n.push(s), r;
  }
}
function U8(n, r) {
  let l;
  return a;
  function a(...f) {
    const h = n.length > f.length;
    let p;
    h && f.push(s);
    try {
      p = n.apply(this, f);
    } catch (g) {
      const y = (
        /** @type {Error} */
        g
      );
      if (h && l)
        throw y;
      return s(y);
    }
    h || (p && p.then && typeof p.then == "function" ? p.then(u, s) : p instanceof Error ? s(p) : u(p));
  }
  function s(f, ...h) {
    l || (l = !0, r(f, ...h));
  }
  function u(f) {
    s(null, f);
  }
}
const Sn = { basename: B8, dirname: H8, extname: q8, join: I8, sep: "/" };
function B8(n, r) {
  if (r !== void 0 && typeof r != "string")
    throw new TypeError('"ext" argument must be a string');
  Ca(n);
  let l = 0, a = -1, s = n.length, u;
  if (r === void 0 || r.length === 0 || r.length > n.length) {
    for (; s--; )
      if (n.codePointAt(s) === 47) {
        if (u) {
          l = s + 1;
          break;
        }
      } else a < 0 && (u = !0, a = s + 1);
    return a < 0 ? "" : n.slice(l, a);
  }
  if (r === n)
    return "";
  let f = -1, h = r.length - 1;
  for (; s--; )
    if (n.codePointAt(s) === 47) {
      if (u) {
        l = s + 1;
        break;
      }
    } else
      f < 0 && (u = !0, f = s + 1), h > -1 && (n.codePointAt(s) === r.codePointAt(h--) ? h < 0 && (a = s) : (h = -1, a = f));
  return l === a ? a = f : a < 0 && (a = n.length), n.slice(l, a);
}
function H8(n) {
  if (Ca(n), n.length === 0)
    return ".";
  let r = -1, l = n.length, a;
  for (; --l; )
    if (n.codePointAt(l) === 47) {
      if (a) {
        r = l;
        break;
      }
    } else a || (a = !0);
  return r < 0 ? n.codePointAt(0) === 47 ? "/" : "." : r === 1 && n.codePointAt(0) === 47 ? "//" : n.slice(0, r);
}
function q8(n) {
  Ca(n);
  let r = n.length, l = -1, a = 0, s = -1, u = 0, f;
  for (; r--; ) {
    const h = n.codePointAt(r);
    if (h === 47) {
      if (f) {
        a = r + 1;
        break;
      }
      continue;
    }
    l < 0 && (f = !0, l = r + 1), h === 46 ? s < 0 ? s = r : u !== 1 && (u = 1) : s > -1 && (u = -1);
  }
  return s < 0 || l < 0 || // We saw a non-dot character immediately before the dot.
  u === 0 || // The (right-most) trimmed path component is exactly `..`.
  u === 1 && s === l - 1 && s === a + 1 ? "" : n.slice(s, l);
}
function I8(...n) {
  let r = -1, l;
  for (; ++r < n.length; )
    Ca(n[r]), n[r] && (l = l === void 0 ? n[r] : l + "/" + n[r]);
  return l === void 0 ? "." : F8(l);
}
function F8(n) {
  Ca(n);
  const r = n.codePointAt(0) === 47;
  let l = V8(n, !r);
  return l.length === 0 && !r && (l = "."), l.length > 0 && n.codePointAt(n.length - 1) === 47 && (l += "/"), r ? "/" + l : l;
}
function V8(n, r) {
  let l = "", a = 0, s = -1, u = 0, f = -1, h, p;
  for (; ++f <= n.length; ) {
    if (f < n.length)
      h = n.codePointAt(f);
    else {
      if (h === 47)
        break;
      h = 47;
    }
    if (h === 47) {
      if (!(s === f - 1 || u === 1)) if (s !== f - 1 && u === 2) {
        if (l.length < 2 || a !== 2 || l.codePointAt(l.length - 1) !== 46 || l.codePointAt(l.length - 2) !== 46) {
          if (l.length > 2) {
            if (p = l.lastIndexOf("/"), p !== l.length - 1) {
              p < 0 ? (l = "", a = 0) : (l = l.slice(0, p), a = l.length - 1 - l.lastIndexOf("/")), s = f, u = 0;
              continue;
            }
          } else if (l.length > 0) {
            l = "", a = 0, s = f, u = 0;
            continue;
          }
        }
        r && (l = l.length > 0 ? l + "/.." : "..", a = 2);
      } else
        l.length > 0 ? l += "/" + n.slice(s + 1, f) : l = n.slice(s + 1, f), a = f - s - 1;
      s = f, u = 0;
    } else h === 46 && u > -1 ? u++ : u = -1;
  }
  return l;
}
function Ca(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(n)
    );
}
const $8 = { cwd: G8 };
function G8() {
  return "/";
}
function Hf(n) {
  return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && // @ts-expect-error: indexing is fine.
  n.auth === void 0);
}
function Y8(n) {
  if (typeof n == "string")
    n = new URL(n);
  else if (!Hf(n)) {
    const r = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + n + "`"
    );
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
  if (n.protocol !== "file:") {
    const r = new TypeError("The URL must be of scheme file");
    throw r.code = "ERR_INVALID_URL_SCHEME", r;
  }
  return X8(n);
}
function X8(n) {
  if (n.hostname !== "") {
    const a = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw a.code = "ERR_INVALID_FILE_URL_HOST", a;
  }
  const r = n.pathname;
  let l = -1;
  for (; ++l < r.length; )
    if (r.codePointAt(l) === 37 && r.codePointAt(l + 1) === 50) {
      const a = r.codePointAt(l + 2);
      if (a === 70 || a === 102) {
        const s = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw s.code = "ERR_INVALID_FILE_URL_PATH", s;
      }
    }
  return decodeURIComponent(r);
}
const cf = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Kg {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(r) {
    let l;
    r ? Hf(r) ? l = { path: r } : typeof r == "string" || Q8(r) ? l = { value: r } : l = r : l = {}, this.cwd = "cwd" in l ? "" : $8.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let a = -1;
    for (; ++a < cf.length; ) {
      const u = cf[a];
      u in l && l[u] !== void 0 && l[u] !== null && (this[u] = u === "history" ? [...l[u]] : l[u]);
    }
    let s;
    for (s in l)
      cf.includes(s) || (this[s] = l[s]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Sn.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(r) {
    df(r, "basename"), ff(r, "basename"), this.path = Sn.join(this.dirname || "", r);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Sn.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(r) {
    wp(this.basename, "dirname"), this.path = Sn.join(r || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Sn.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(r) {
    if (ff(r, "extname"), wp(this.dirname, "extname"), r) {
      if (r.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (r.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Sn.join(this.dirname, this.stem + (r || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(r) {
    Hf(r) && (r = Y8(r)), df(r, "path"), this.path !== r && this.history.push(r);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Sn.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(r) {
    df(r, "stem"), ff(r, "stem"), this.path = Sn.join(this.dirname || "", r + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(r, l, a) {
    const s = this.message(r, l, a);
    throw s.fatal = !0, s;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(r, l, a) {
    const s = this.message(r, l, a);
    return s.fatal = void 0, s;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(r, l, a) {
    const s = new Ct(
      // @ts-expect-error: the overloads are fine.
      r,
      l,
      a
    );
    return this.path && (s.name = this.path + ":" + s.name, s.file = this.path), s.fatal = !1, this.messages.push(s), s;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(r) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(r || void 0).decode(this.value);
  }
}
function ff(n, r) {
  if (n && n.includes(Sn.sep))
    throw new Error(
      "`" + r + "` cannot be a path: did not expect `" + Sn.sep + "`"
    );
}
function df(n, r) {
  if (!n)
    throw new Error("`" + r + "` cannot be empty");
}
function wp(n, r) {
  if (!n)
    throw new Error("Setting `" + r + "` requires `path` to be set too");
}
function Q8(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const P8 = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(n) {
    const a = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), s = a[n], u = function() {
      return s.apply(u, arguments);
    };
    return Object.setPrototypeOf(u, a), u;
  })
), Z8 = {}.hasOwnProperty;
class pd extends P8 {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = L8();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const r = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new pd()
    );
    let l = -1;
    for (; ++l < this.attachers.length; ) {
      const a = this.attachers[l];
      r.use(...a);
    }
    return r.data(uf(!0, {}, this.namespace)), r;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(r, l) {
    return typeof r == "string" ? arguments.length === 2 ? (pf("data", this.frozen), this.namespace[r] = l, this) : Z8.call(this.namespace, r) && this.namespace[r] || void 0 : r ? (pf("data", this.frozen), this.namespace = r, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const r = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [l, ...a] = this.attachers[this.freezeIndex];
      if (a[0] === !1)
        continue;
      a[0] === !0 && (a[0] = void 0);
      const s = l.call(r, ...a);
      typeof s == "function" && this.transformers.use(s);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(r) {
    this.freeze();
    const l = Zo(r), a = this.parser || this.Parser;
    return mf("parse", a), a(String(l), l);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(r, l) {
    const a = this;
    return this.freeze(), mf("process", this.parser || this.Parser), hf("process", this.compiler || this.Compiler), l ? s(void 0, l) : new Promise(s);
    function s(u, f) {
      const h = Zo(r), p = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        a.parse(h)
      );
      a.run(p, h, function(y, x, S) {
        if (y || !x || !S)
          return g(y);
        const v = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          x
        ), C = a.stringify(v, S);
        J8(C) ? S.value = C : S.result = C, g(
          y,
          /** @type {VFileWithOutput<CompileResult>} */
          S
        );
      });
      function g(y, x) {
        y || !x ? f(y) : u ? u(x) : l(void 0, x);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(r) {
    let l = !1, a;
    return this.freeze(), mf("processSync", this.parser || this.Parser), hf("processSync", this.compiler || this.Compiler), this.process(r, s), jp("processSync", "process", l), a;
    function s(u, f) {
      l = !0, kp(u), a = f;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(r, l, a) {
    Ep(r), this.freeze();
    const s = this.transformers;
    return !a && typeof l == "function" && (a = l, l = void 0), a ? u(void 0, a) : new Promise(u);
    function u(f, h) {
      const p = Zo(l);
      s.run(r, p, g);
      function g(y, x, S) {
        const v = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          x || r
        );
        y ? h(y) : f ? f(v) : a(void 0, v, S);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(r, l) {
    let a = !1, s;
    return this.run(r, l, u), jp("runSync", "run", a), s;
    function u(f, h) {
      kp(f), s = h, a = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(r, l) {
    this.freeze();
    const a = Zo(l), s = this.compiler || this.Compiler;
    return hf("stringify", s), Ep(r), s(r, a);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(r, ...l) {
    const a = this.attachers, s = this.namespace;
    if (pf("use", this.frozen), r != null) if (typeof r == "function")
      p(r, l);
    else if (typeof r == "object")
      Array.isArray(r) ? h(r) : f(r);
    else
      throw new TypeError("Expected usable value, not `" + r + "`");
    return this;
    function u(g) {
      if (typeof g == "function")
        p(g, []);
      else if (typeof g == "object")
        if (Array.isArray(g)) {
          const [y, ...x] = (
            /** @type {PluginTuple<Array<unknown>>} */
            g
          );
          p(y, x);
        } else
          f(g);
      else
        throw new TypeError("Expected usable value, not `" + g + "`");
    }
    function f(g) {
      if (!("plugins" in g) && !("settings" in g))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      h(g.plugins), g.settings && (s.settings = uf(!0, s.settings, g.settings));
    }
    function h(g) {
      let y = -1;
      if (g != null) if (Array.isArray(g))
        for (; ++y < g.length; ) {
          const x = g[y];
          u(x);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + g + "`");
    }
    function p(g, y) {
      let x = -1, S = -1;
      for (; ++x < a.length; )
        if (a[x][0] === g) {
          S = x;
          break;
        }
      if (S === -1)
        a.push([g, ...y]);
      else if (y.length > 0) {
        let [v, ...C] = y;
        const j = a[S][1];
        Bf(j) && Bf(v) && (v = uf(!0, j, v)), a[S] = [g, v, ...C];
      }
    }
  }
}
const K8 = new pd().freeze();
function mf(n, r) {
  if (typeof r != "function")
    throw new TypeError("Cannot `" + n + "` without `parser`");
}
function hf(n, r) {
  if (typeof r != "function")
    throw new TypeError("Cannot `" + n + "` without `compiler`");
}
function pf(n, r) {
  if (r)
    throw new Error(
      "Cannot call `" + n + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ep(n) {
  if (!Bf(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function jp(n, r, l) {
  if (!l)
    throw new Error(
      "`" + n + "` finished async. Use `" + r + "` instead"
    );
}
function Zo(n) {
  return W8(n) ? n : new Kg(n);
}
function W8(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function J8(n) {
  return typeof n == "string" || e7(n);
}
function e7(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const t7 = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Np = [], Tp = { allowDangerousHtml: !0 }, n7 = /^(https?|ircs?|mailto|xmpp)$/i, r7 = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function l7(n) {
  const r = i7(n), l = a7(n);
  return o7(r.runSync(r.parse(l), l), n);
}
function i7(n) {
  const r = n.rehypePlugins || Np, l = n.remarkPlugins || Np, a = n.remarkRehypeOptions ? { ...n.remarkRehypeOptions, ...Tp } : Tp;
  return K8().use(H6).use(l).use(O8, a).use(r);
}
function a7(n) {
  const r = n.children || "", l = new Kg();
  return typeof r == "string" && (l.value = r), l;
}
function o7(n, r) {
  const l = r.allowedElements, a = r.allowElement, s = r.components, u = r.disallowedElements, f = r.skipHtml, h = r.unwrapDisallowed, p = r.urlTransform || s7;
  for (const y of r7)
    Object.hasOwn(r, y.from) && ("" + y.from + (y.to ? "use `" + y.to + "` instead" : "remove it") + t7 + y.id, void 0);
  return hd(n, g), k5(n, {
    Fragment: d.Fragment,
    components: s,
    ignoreInvalidStyle: !0,
    jsx: d.jsx,
    jsxs: d.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function g(y, x, S) {
    if (y.type === "raw" && S && typeof x == "number")
      return f ? S.children.splice(x, 1) : S.children[x] = { type: "text", value: y.value }, x;
    if (y.type === "element") {
      let v;
      for (v in lf)
        if (Object.hasOwn(lf, v) && Object.hasOwn(y.properties, v)) {
          const C = y.properties[v], j = lf[v];
          (j === null || j.includes(y.tagName)) && (y.properties[v] = p(String(C || ""), v, y));
        }
    }
    if (y.type === "element") {
      let v = l ? !l.includes(y.tagName) : u ? u.includes(y.tagName) : !1;
      if (!v && a && typeof x == "number" && (v = !a(y, x, S)), v && S && typeof x == "number")
        return h && y.children ? S.children.splice(x, 1, ...y.children) : S.children.splice(x, 1), x;
    }
  }
}
function s7(n) {
  const r = n.indexOf(":"), l = n.indexOf("?"), a = n.indexOf("#"), s = n.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    s !== -1 && r > s || l !== -1 && r > l || a !== -1 && r > a || // It is a protocol, it should be allowed.
    n7.test(n.slice(0, r)) ? n : ""
  );
}
function Ap(n, r) {
  const l = String(n);
  if (typeof r != "string")
    throw new TypeError("Expected character");
  let a = 0, s = l.indexOf(r);
  for (; s !== -1; )
    a++, s = l.indexOf(r, s + r.length);
  return a;
}
function u7(n) {
  if (typeof n != "string")
    throw new TypeError("Expected a string");
  return n.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function c7(n, r, l) {
  const s = Es((l || {}).ignore || []), u = f7(r);
  let f = -1;
  for (; ++f < u.length; )
    Zg(n, "text", h);
  function h(g, y) {
    let x = -1, S;
    for (; ++x < y.length; ) {
      const v = y[x], C = S ? S.children : void 0;
      if (s(
        v,
        C ? C.indexOf(v) : void 0,
        S
      ))
        return;
      S = v;
    }
    if (S)
      return p(g, y);
  }
  function p(g, y) {
    const x = y[y.length - 1], S = u[f][0], v = u[f][1];
    let C = 0;
    const M = x.children.indexOf(g);
    let T = !1, I = [];
    S.lastIndex = 0;
    let L = S.exec(g.value);
    for (; L; ) {
      const re = L.index, le = {
        index: L.index,
        input: L.input,
        stack: [...y, g]
      };
      let _ = v(...L, le);
      if (typeof _ == "string" && (_ = _.length > 0 ? { type: "text", value: _ } : void 0), _ === !1 ? S.lastIndex = re + 1 : (C !== re && I.push({
        type: "text",
        value: g.value.slice(C, re)
      }), Array.isArray(_) ? I.push(..._) : _ && I.push(_), C = re + L[0].length, T = !0), !S.global)
        break;
      L = S.exec(g.value);
    }
    return T ? (C < g.value.length && I.push({ type: "text", value: g.value.slice(C) }), x.children.splice(M, 1, ...I)) : I = [g], M + I.length;
  }
}
function f7(n) {
  const r = [];
  if (!Array.isArray(n))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const l = !n[0] || Array.isArray(n[0]) ? n : [n];
  let a = -1;
  for (; ++a < l.length; ) {
    const s = l[a];
    r.push([d7(s[0]), m7(s[1])]);
  }
  return r;
}
function d7(n) {
  return typeof n == "string" ? new RegExp(u7(n), "g") : n;
}
function m7(n) {
  return typeof n == "function" ? n : function() {
    return n;
  };
}
const gf = "phrasing", xf = ["autolink", "link", "image", "label"];
function h7() {
  return {
    transforms: [S7],
    enter: {
      literalAutolink: g7,
      literalAutolinkEmail: yf,
      literalAutolinkHttp: yf,
      literalAutolinkWww: yf
    },
    exit: {
      literalAutolink: v7,
      literalAutolinkEmail: b7,
      literalAutolinkHttp: x7,
      literalAutolinkWww: y7
    }
  };
}
function p7() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: gf,
        notInConstruct: xf
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: gf,
        notInConstruct: xf
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: gf,
        notInConstruct: xf
      }
    ]
  };
}
function g7(n) {
  this.enter({ type: "link", title: null, url: "", children: [] }, n);
}
function yf(n) {
  this.config.enter.autolinkProtocol.call(this, n);
}
function x7(n) {
  this.config.exit.autolinkProtocol.call(this, n);
}
function y7(n) {
  this.config.exit.data.call(this, n);
  const r = this.stack[this.stack.length - 1];
  r.type, r.url = "http://" + this.sliceSerialize(n);
}
function b7(n) {
  this.config.exit.autolinkEmail.call(this, n);
}
function v7(n) {
  this.exit(n);
}
function S7(n) {
  c7(
    n,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, k7],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), C7]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function k7(n, r, l, a, s) {
  let u = "";
  if (!Wg(s) || (/^w/i.test(r) && (l = r + l, r = "", u = "http://"), !w7(l)))
    return !1;
  const f = E7(l + a);
  if (!f[0]) return !1;
  const h = {
    type: "link",
    title: null,
    url: u + r + f[0],
    children: [{ type: "text", value: r + f[0] }]
  };
  return f[1] ? [h, { type: "text", value: f[1] }] : h;
}
function C7(n, r, l, a) {
  return (
    // Not an expected previous character.
    !Wg(a, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(l) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + r + "@" + l,
      children: [{ type: "text", value: r + "@" + l }]
    }
  );
}
function w7(n) {
  const r = n.split(".");
  return !(r.length < 2 || r[r.length - 1] && (/_/.test(r[r.length - 1]) || !/[a-zA-Z\d]/.test(r[r.length - 1])) || r[r.length - 2] && (/_/.test(r[r.length - 2]) || !/[a-zA-Z\d]/.test(r[r.length - 2])));
}
function E7(n) {
  const r = /[!"&'),.:;<>?\]}]+$/.exec(n);
  if (!r)
    return [n, void 0];
  n = n.slice(0, r.index);
  let l = r[0], a = l.indexOf(")");
  const s = Ap(n, "(");
  let u = Ap(n, ")");
  for (; a !== -1 && s > u; )
    n += l.slice(0, a + 1), l = l.slice(a + 1), a = l.indexOf(")"), u++;
  return [n, l];
}
function Wg(n, r) {
  const l = n.input.charCodeAt(n.index - 1);
  return (n.index === 0 || Wr(l) || ks(l)) && // If it’s an email, the previous character should not be a slash.
  (!r || l !== 47);
}
Jg.peek = D7;
function j7() {
  this.buffer();
}
function N7(n) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, n);
}
function T7() {
  this.buffer();
}
function A7(n) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    n
  );
}
function z7(n) {
  const r = this.resume(), l = this.stack[this.stack.length - 1];
  l.type, l.identifier = pn(
    this.sliceSerialize(n)
  ).toLowerCase(), l.label = r;
}
function _7(n) {
  this.exit(n);
}
function M7(n) {
  const r = this.resume(), l = this.stack[this.stack.length - 1];
  l.type, l.identifier = pn(
    this.sliceSerialize(n)
  ).toLowerCase(), l.label = r;
}
function O7(n) {
  this.exit(n);
}
function D7() {
  return "[";
}
function Jg(n, r, l, a) {
  const s = l.createTracker(a);
  let u = s.move("[^");
  const f = l.enter("footnoteReference"), h = l.enter("reference");
  return u += s.move(
    l.safe(l.associationId(n), { after: "]", before: u })
  ), h(), f(), u += s.move("]"), u;
}
function R7() {
  return {
    enter: {
      gfmFootnoteCallString: j7,
      gfmFootnoteCall: N7,
      gfmFootnoteDefinitionLabelString: T7,
      gfmFootnoteDefinition: A7
    },
    exit: {
      gfmFootnoteCallString: z7,
      gfmFootnoteCall: _7,
      gfmFootnoteDefinitionLabelString: M7,
      gfmFootnoteDefinition: O7
    }
  };
}
function L7(n) {
  let r = !1;
  return n && n.firstLineBlank && (r = !0), {
    handlers: { footnoteDefinition: l, footnoteReference: Jg },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function l(a, s, u, f) {
    const h = u.createTracker(f);
    let p = h.move("[^");
    const g = u.enter("footnoteDefinition"), y = u.enter("label");
    return p += h.move(
      u.safe(u.associationId(a), { before: p, after: "]" })
    ), y(), p += h.move("]:"), a.children && a.children.length > 0 && (h.shift(4), p += h.move(
      (r ? `
` : " ") + u.indentLines(
        u.containerFlow(a, h.current()),
        r ? e2 : U7
      )
    )), g(), p;
  }
}
function U7(n, r, l) {
  return r === 0 ? n : e2(n, r, l);
}
function e2(n, r, l) {
  return (l ? "" : "    ") + n;
}
const B7 = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
t2.peek = V7;
function H7() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: I7 },
    exit: { strikethrough: F7 }
  };
}
function q7() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: B7
      }
    ],
    handlers: { delete: t2 }
  };
}
function I7(n) {
  this.enter({ type: "delete", children: [] }, n);
}
function F7(n) {
  this.exit(n);
}
function t2(n, r, l, a) {
  const s = l.createTracker(a), u = l.enter("strikethrough");
  let f = s.move("~~");
  return f += l.containerPhrasing(n, {
    ...s.current(),
    before: f,
    after: "~"
  }), f += s.move("~~"), u(), f;
}
function V7() {
  return "~";
}
function $7(n) {
  return n.length;
}
function G7(n, r) {
  const l = r || {}, a = (l.align || []).concat(), s = l.stringLength || $7, u = [], f = [], h = [], p = [];
  let g = 0, y = -1;
  for (; ++y < n.length; ) {
    const j = [], M = [];
    let T = -1;
    for (n[y].length > g && (g = n[y].length); ++T < n[y].length; ) {
      const I = Y7(n[y][T]);
      if (l.alignDelimiters !== !1) {
        const L = s(I);
        M[T] = L, (p[T] === void 0 || L > p[T]) && (p[T] = L);
      }
      j.push(I);
    }
    f[y] = j, h[y] = M;
  }
  let x = -1;
  if (typeof a == "object" && "length" in a)
    for (; ++x < g; )
      u[x] = zp(a[x]);
  else {
    const j = zp(a);
    for (; ++x < g; )
      u[x] = j;
  }
  x = -1;
  const S = [], v = [];
  for (; ++x < g; ) {
    const j = u[x];
    let M = "", T = "";
    j === 99 ? (M = ":", T = ":") : j === 108 ? M = ":" : j === 114 && (T = ":");
    let I = l.alignDelimiters === !1 ? 1 : Math.max(
      1,
      p[x] - M.length - T.length
    );
    const L = M + "-".repeat(I) + T;
    l.alignDelimiters !== !1 && (I = M.length + I + T.length, I > p[x] && (p[x] = I), v[x] = I), S[x] = L;
  }
  f.splice(1, 0, S), h.splice(1, 0, v), y = -1;
  const C = [];
  for (; ++y < f.length; ) {
    const j = f[y], M = h[y];
    x = -1;
    const T = [];
    for (; ++x < g; ) {
      const I = j[x] || "";
      let L = "", re = "";
      if (l.alignDelimiters !== !1) {
        const le = p[x] - (M[x] || 0), _ = u[x];
        _ === 114 ? L = " ".repeat(le) : _ === 99 ? le % 2 ? (L = " ".repeat(le / 2 + 0.5), re = " ".repeat(le / 2 - 0.5)) : (L = " ".repeat(le / 2), re = L) : re = " ".repeat(le);
      }
      l.delimiterStart !== !1 && !x && T.push("|"), l.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(l.alignDelimiters === !1 && I === "") && (l.delimiterStart !== !1 || x) && T.push(" "), l.alignDelimiters !== !1 && T.push(L), T.push(I), l.alignDelimiters !== !1 && T.push(re), l.padding !== !1 && T.push(" "), (l.delimiterEnd !== !1 || x !== g - 1) && T.push("|");
    }
    C.push(
      l.delimiterEnd === !1 ? T.join("").replace(/ +$/, "") : T.join("")
    );
  }
  return C.join(`
`);
}
function Y7(n) {
  return n == null ? "" : String(n);
}
function zp(n) {
  const r = typeof n == "string" ? n.codePointAt(0) : 0;
  return r === 67 || r === 99 ? 99 : r === 76 || r === 108 ? 108 : r === 82 || r === 114 ? 114 : 0;
}
function X7(n, r, l, a) {
  const s = l.enter("blockquote"), u = l.createTracker(a);
  u.move("> "), u.shift(2);
  const f = l.indentLines(
    l.containerFlow(n, u.current()),
    Q7
  );
  return s(), f;
}
function Q7(n, r, l) {
  return ">" + (l ? "" : " ") + n;
}
function P7(n, r) {
  return _p(n, r.inConstruct, !0) && !_p(n, r.notInConstruct, !1);
}
function _p(n, r, l) {
  if (typeof r == "string" && (r = [r]), !r || r.length === 0)
    return l;
  let a = -1;
  for (; ++a < r.length; )
    if (n.includes(r[a]))
      return !0;
  return !1;
}
function Mp(n, r, l, a) {
  let s = -1;
  for (; ++s < l.unsafe.length; )
    if (l.unsafe[s].character === `
` && P7(l.stack, l.unsafe[s]))
      return /[ \t]/.test(a.before) ? "" : " ";
  return `\\
`;
}
function Z7(n, r) {
  const l = String(n);
  let a = l.indexOf(r), s = a, u = 0, f = 0;
  if (typeof r != "string")
    throw new TypeError("Expected substring");
  for (; a !== -1; )
    a === s ? ++u > f && (f = u) : u = 1, s = a + r.length, a = l.indexOf(r, s);
  return f;
}
function K7(n, r) {
  return !!(r.options.fences === !1 && n.value && // If there’s no info…
  !n.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(n.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value));
}
function W7(n) {
  const r = n.options.fence || "`";
  if (r !== "`" && r !== "~")
    throw new Error(
      "Cannot serialize code with `" + r + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return r;
}
function J7(n, r, l, a) {
  const s = W7(l), u = n.value || "", f = s === "`" ? "GraveAccent" : "Tilde";
  if (K7(n, l)) {
    const x = l.enter("codeIndented"), S = l.indentLines(u, e9);
    return x(), S;
  }
  const h = l.createTracker(a), p = s.repeat(Math.max(Z7(u, s) + 1, 3)), g = l.enter("codeFenced");
  let y = h.move(p);
  if (n.lang) {
    const x = l.enter(`codeFencedLang${f}`);
    y += h.move(
      l.safe(n.lang, {
        before: y,
        after: " ",
        encode: ["`"],
        ...h.current()
      })
    ), x();
  }
  if (n.lang && n.meta) {
    const x = l.enter(`codeFencedMeta${f}`);
    y += h.move(" "), y += h.move(
      l.safe(n.meta, {
        before: y,
        after: `
`,
        encode: ["`"],
        ...h.current()
      })
    ), x();
  }
  return y += h.move(`
`), u && (y += h.move(u + `
`)), y += h.move(p), g(), y;
}
function e9(n, r, l) {
  return (l ? "" : "    ") + n;
}
function gd(n) {
  const r = n.options.quote || '"';
  if (r !== '"' && r !== "'")
    throw new Error(
      "Cannot serialize title with `" + r + "` for `options.quote`, expected `\"`, or `'`"
    );
  return r;
}
function t9(n, r, l, a) {
  const s = gd(l), u = s === '"' ? "Quote" : "Apostrophe", f = l.enter("definition");
  let h = l.enter("label");
  const p = l.createTracker(a);
  let g = p.move("[");
  return g += p.move(
    l.safe(l.associationId(n), {
      before: g,
      after: "]",
      ...p.current()
    })
  ), g += p.move("]: "), h(), // If there’s no url, or…
  !n.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (h = l.enter("destinationLiteral"), g += p.move("<"), g += p.move(
    l.safe(n.url, { before: g, after: ">", ...p.current() })
  ), g += p.move(">")) : (h = l.enter("destinationRaw"), g += p.move(
    l.safe(n.url, {
      before: g,
      after: n.title ? " " : `
`,
      ...p.current()
    })
  )), h(), n.title && (h = l.enter(`title${u}`), g += p.move(" " + s), g += p.move(
    l.safe(n.title, {
      before: g,
      after: s,
      ...p.current()
    })
  ), g += p.move(s), h()), f(), g;
}
function n9(n) {
  const r = n.options.emphasis || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + r + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return r;
}
function ga(n) {
  return "&#x" + n.toString(16).toUpperCase() + ";";
}
function cs(n, r, l) {
  const a = ti(n), s = ti(r);
  return a === void 0 ? s === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    l === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : s === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : a === 1 ? s === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : s === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : s === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : s === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
n2.peek = r9;
function n2(n, r, l, a) {
  const s = n9(l), u = l.enter("emphasis"), f = l.createTracker(a), h = f.move(s);
  let p = f.move(
    l.containerPhrasing(n, {
      after: s,
      before: h,
      ...f.current()
    })
  );
  const g = p.charCodeAt(0), y = cs(
    a.before.charCodeAt(a.before.length - 1),
    g,
    s
  );
  y.inside && (p = ga(g) + p.slice(1));
  const x = p.charCodeAt(p.length - 1), S = cs(a.after.charCodeAt(0), x, s);
  S.inside && (p = p.slice(0, -1) + ga(x));
  const v = f.move(s);
  return u(), l.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: y.outside
  }, h + p + v;
}
function r9(n, r, l) {
  return l.options.emphasis || "*";
}
function l9(n, r) {
  let l = !1;
  return hd(n, function(a) {
    if ("value" in a && /\r?\n|\r/.test(a.value) || a.type === "break")
      return l = !0, Lf;
  }), !!((!n.depth || n.depth < 3) && od(n) && (r.options.setext || l));
}
function i9(n, r, l, a) {
  const s = Math.max(Math.min(6, n.depth || 1), 1), u = l.createTracker(a);
  if (l9(n, l)) {
    const y = l.enter("headingSetext"), x = l.enter("phrasing"), S = l.containerPhrasing(n, {
      ...u.current(),
      before: `
`,
      after: `
`
    });
    return x(), y(), S + `
` + (s === 1 ? "=" : "-").repeat(
      // The whole size…
      S.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(S.lastIndexOf("\r"), S.lastIndexOf(`
`)) + 1)
    );
  }
  const f = "#".repeat(s), h = l.enter("headingAtx"), p = l.enter("phrasing");
  u.move(f + " ");
  let g = l.containerPhrasing(n, {
    before: "# ",
    after: `
`,
    ...u.current()
  });
  return /^[\t ]/.test(g) && (g = ga(g.charCodeAt(0)) + g.slice(1)), g = g ? f + " " + g : f, l.options.closeAtx && (g += " " + f), p(), h(), g;
}
r2.peek = a9;
function r2(n) {
  return n.value || "";
}
function a9() {
  return "<";
}
l2.peek = o9;
function l2(n, r, l, a) {
  const s = gd(l), u = s === '"' ? "Quote" : "Apostrophe", f = l.enter("image");
  let h = l.enter("label");
  const p = l.createTracker(a);
  let g = p.move("![");
  return g += p.move(
    l.safe(n.alt, { before: g, after: "]", ...p.current() })
  ), g += p.move("]("), h(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (h = l.enter("destinationLiteral"), g += p.move("<"), g += p.move(
    l.safe(n.url, { before: g, after: ">", ...p.current() })
  ), g += p.move(">")) : (h = l.enter("destinationRaw"), g += p.move(
    l.safe(n.url, {
      before: g,
      after: n.title ? " " : ")",
      ...p.current()
    })
  )), h(), n.title && (h = l.enter(`title${u}`), g += p.move(" " + s), g += p.move(
    l.safe(n.title, {
      before: g,
      after: s,
      ...p.current()
    })
  ), g += p.move(s), h()), g += p.move(")"), f(), g;
}
function o9() {
  return "!";
}
i2.peek = s9;
function i2(n, r, l, a) {
  const s = n.referenceType, u = l.enter("imageReference");
  let f = l.enter("label");
  const h = l.createTracker(a);
  let p = h.move("![");
  const g = l.safe(n.alt, {
    before: p,
    after: "]",
    ...h.current()
  });
  p += h.move(g + "]["), f();
  const y = l.stack;
  l.stack = [], f = l.enter("reference");
  const x = l.safe(l.associationId(n), {
    before: p,
    after: "]",
    ...h.current()
  });
  return f(), l.stack = y, u(), s === "full" || !g || g !== x ? p += h.move(x + "]") : s === "shortcut" ? p = p.slice(0, -1) : p += h.move("]"), p;
}
function s9() {
  return "!";
}
a2.peek = u9;
function a2(n, r, l) {
  let a = n.value || "", s = "`", u = -1;
  for (; new RegExp("(^|[^`])" + s + "([^`]|$)").test(a); )
    s += "`";
  for (/[^ \r\n]/.test(a) && (/^[ \r\n]/.test(a) && /[ \r\n]$/.test(a) || /^`|`$/.test(a)) && (a = " " + a + " "); ++u < l.unsafe.length; ) {
    const f = l.unsafe[u], h = l.compilePattern(f);
    let p;
    if (f.atBreak)
      for (; p = h.exec(a); ) {
        let g = p.index;
        a.charCodeAt(g) === 10 && a.charCodeAt(g - 1) === 13 && g--, a = a.slice(0, g) + " " + a.slice(p.index + 1);
      }
  }
  return s + a + s;
}
function u9() {
  return "`";
}
function o2(n, r) {
  const l = od(n);
  return !!(!r.options.resourceLink && // If there’s a url…
  n.url && // And there’s a no title…
  !n.title && // And the content of `node` is a single text node…
  n.children && n.children.length === 1 && n.children[0].type === "text" && // And if the url is the same as the content…
  (l === n.url || "mailto:" + l === n.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(n.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(n.url));
}
s2.peek = c9;
function s2(n, r, l, a) {
  const s = gd(l), u = s === '"' ? "Quote" : "Apostrophe", f = l.createTracker(a);
  let h, p;
  if (o2(n, l)) {
    const y = l.stack;
    l.stack = [], h = l.enter("autolink");
    let x = f.move("<");
    return x += f.move(
      l.containerPhrasing(n, {
        before: x,
        after: ">",
        ...f.current()
      })
    ), x += f.move(">"), h(), l.stack = y, x;
  }
  h = l.enter("link"), p = l.enter("label");
  let g = f.move("[");
  return g += f.move(
    l.containerPhrasing(n, {
      before: g,
      after: "](",
      ...f.current()
    })
  ), g += f.move("]("), p(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (p = l.enter("destinationLiteral"), g += f.move("<"), g += f.move(
    l.safe(n.url, { before: g, after: ">", ...f.current() })
  ), g += f.move(">")) : (p = l.enter("destinationRaw"), g += f.move(
    l.safe(n.url, {
      before: g,
      after: n.title ? " " : ")",
      ...f.current()
    })
  )), p(), n.title && (p = l.enter(`title${u}`), g += f.move(" " + s), g += f.move(
    l.safe(n.title, {
      before: g,
      after: s,
      ...f.current()
    })
  ), g += f.move(s), p()), g += f.move(")"), h(), g;
}
function c9(n, r, l) {
  return o2(n, l) ? "<" : "[";
}
u2.peek = f9;
function u2(n, r, l, a) {
  const s = n.referenceType, u = l.enter("linkReference");
  let f = l.enter("label");
  const h = l.createTracker(a);
  let p = h.move("[");
  const g = l.containerPhrasing(n, {
    before: p,
    after: "]",
    ...h.current()
  });
  p += h.move(g + "]["), f();
  const y = l.stack;
  l.stack = [], f = l.enter("reference");
  const x = l.safe(l.associationId(n), {
    before: p,
    after: "]",
    ...h.current()
  });
  return f(), l.stack = y, u(), s === "full" || !g || g !== x ? p += h.move(x + "]") : s === "shortcut" ? p = p.slice(0, -1) : p += h.move("]"), p;
}
function f9() {
  return "[";
}
function xd(n) {
  const r = n.options.bullet || "*";
  if (r !== "*" && r !== "+" && r !== "-")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return r;
}
function d9(n) {
  const r = xd(n), l = n.options.bulletOther;
  if (!l)
    return r === "*" ? "-" : "*";
  if (l !== "*" && l !== "+" && l !== "-")
    throw new Error(
      "Cannot serialize items with `" + l + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (l === r)
    throw new Error(
      "Expected `bullet` (`" + r + "`) and `bulletOther` (`" + l + "`) to be different"
    );
  return l;
}
function m9(n) {
  const r = n.options.bulletOrdered || ".";
  if (r !== "." && r !== ")")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return r;
}
function c2(n) {
  const r = n.options.rule || "*";
  if (r !== "*" && r !== "-" && r !== "_")
    throw new Error(
      "Cannot serialize rules with `" + r + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return r;
}
function h9(n, r, l, a) {
  const s = l.enter("list"), u = l.bulletCurrent;
  let f = n.ordered ? m9(l) : xd(l);
  const h = n.ordered ? f === "." ? ")" : "." : d9(l);
  let p = r && l.bulletLastUsed ? f === l.bulletLastUsed : !1;
  if (!n.ordered) {
    const y = n.children ? n.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (f === "*" || f === "-") && // Empty first list item:
      y && (!y.children || !y.children[0]) && // Directly in two other list items:
      l.stack[l.stack.length - 1] === "list" && l.stack[l.stack.length - 2] === "listItem" && l.stack[l.stack.length - 3] === "list" && l.stack[l.stack.length - 4] === "listItem" && // That are each the first child.
      l.indexStack[l.indexStack.length - 1] === 0 && l.indexStack[l.indexStack.length - 2] === 0 && l.indexStack[l.indexStack.length - 3] === 0 && (p = !0), c2(l) === f && y
    ) {
      let x = -1;
      for (; ++x < n.children.length; ) {
        const S = n.children[x];
        if (S && S.type === "listItem" && S.children && S.children[0] && S.children[0].type === "thematicBreak") {
          p = !0;
          break;
        }
      }
    }
  }
  p && (f = h), l.bulletCurrent = f;
  const g = l.containerFlow(n, a);
  return l.bulletLastUsed = f, l.bulletCurrent = u, s(), g;
}
function p9(n) {
  const r = n.options.listItemIndent || "one";
  if (r !== "tab" && r !== "one" && r !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return r;
}
function g9(n, r, l, a) {
  const s = p9(l);
  let u = l.bulletCurrent || xd(l);
  r && r.type === "list" && r.ordered && (u = (typeof r.start == "number" && r.start > -1 ? r.start : 1) + (l.options.incrementListMarker === !1 ? 0 : r.children.indexOf(n)) + u);
  let f = u.length + 1;
  (s === "tab" || s === "mixed" && (r && r.type === "list" && r.spread || n.spread)) && (f = Math.ceil(f / 4) * 4);
  const h = l.createTracker(a);
  h.move(u + " ".repeat(f - u.length)), h.shift(f);
  const p = l.enter("listItem"), g = l.indentLines(
    l.containerFlow(n, h.current()),
    y
  );
  return p(), g;
  function y(x, S, v) {
    return S ? (v ? "" : " ".repeat(f)) + x : (v ? u : u + " ".repeat(f - u.length)) + x;
  }
}
function x9(n, r, l, a) {
  const s = l.enter("paragraph"), u = l.enter("phrasing"), f = l.containerPhrasing(n, a);
  return u(), s(), f;
}
const y9 = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Es([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function b9(n, r, l, a) {
  return (n.children.some(function(f) {
    return y9(f);
  }) ? l.containerPhrasing : l.containerFlow).call(l, n, a);
}
function v9(n) {
  const r = n.options.strong || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize strong with `" + r + "` for `options.strong`, expected `*`, or `_`"
    );
  return r;
}
f2.peek = S9;
function f2(n, r, l, a) {
  const s = v9(l), u = l.enter("strong"), f = l.createTracker(a), h = f.move(s + s);
  let p = f.move(
    l.containerPhrasing(n, {
      after: s,
      before: h,
      ...f.current()
    })
  );
  const g = p.charCodeAt(0), y = cs(
    a.before.charCodeAt(a.before.length - 1),
    g,
    s
  );
  y.inside && (p = ga(g) + p.slice(1));
  const x = p.charCodeAt(p.length - 1), S = cs(a.after.charCodeAt(0), x, s);
  S.inside && (p = p.slice(0, -1) + ga(x));
  const v = f.move(s + s);
  return u(), l.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: y.outside
  }, h + p + v;
}
function S9(n, r, l) {
  return l.options.strong || "*";
}
function k9(n, r, l, a) {
  return l.safe(n.value, a);
}
function C9(n) {
  const r = n.options.ruleRepetition || 3;
  if (r < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + r + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return r;
}
function w9(n, r, l) {
  const a = (c2(l) + (l.options.ruleSpaces ? " " : "")).repeat(C9(l));
  return l.options.ruleSpaces ? a.slice(0, -1) : a;
}
const d2 = {
  blockquote: X7,
  break: Mp,
  code: J7,
  definition: t9,
  emphasis: n2,
  hardBreak: Mp,
  heading: i9,
  html: r2,
  image: l2,
  imageReference: i2,
  inlineCode: a2,
  link: s2,
  linkReference: u2,
  list: h9,
  listItem: g9,
  paragraph: x9,
  root: b9,
  strong: f2,
  text: k9,
  thematicBreak: w9
};
function E9() {
  return {
    enter: {
      table: j9,
      tableData: Op,
      tableHeader: Op,
      tableRow: T9
    },
    exit: {
      codeText: A9,
      table: N9,
      tableData: bf,
      tableHeader: bf,
      tableRow: bf
    }
  };
}
function j9(n) {
  const r = n._align;
  this.enter(
    {
      type: "table",
      align: r.map(function(l) {
        return l === "none" ? null : l;
      }),
      children: []
    },
    n
  ), this.data.inTable = !0;
}
function N9(n) {
  this.exit(n), this.data.inTable = void 0;
}
function T9(n) {
  this.enter({ type: "tableRow", children: [] }, n);
}
function bf(n) {
  this.exit(n);
}
function Op(n) {
  this.enter({ type: "tableCell", children: [] }, n);
}
function A9(n) {
  let r = this.resume();
  this.data.inTable && (r = r.replace(/\\([\\|])/g, z9));
  const l = this.stack[this.stack.length - 1];
  l.type, l.value = r, this.exit(n);
}
function z9(n, r) {
  return r === "|" ? r : n;
}
function _9(n) {
  const r = n || {}, l = r.tableCellPadding, a = r.tablePipeAlign, s = r.stringLength, u = l ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: S,
      table: f,
      tableCell: p,
      tableRow: h
    }
  };
  function f(v, C, j, M) {
    return g(y(v, j, M), v.align);
  }
  function h(v, C, j, M) {
    const T = x(v, j, M), I = g([T]);
    return I.slice(0, I.indexOf(`
`));
  }
  function p(v, C, j, M) {
    const T = j.enter("tableCell"), I = j.enter("phrasing"), L = j.containerPhrasing(v, {
      ...M,
      before: u,
      after: u
    });
    return I(), T(), L;
  }
  function g(v, C) {
    return G7(v, {
      align: C,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: a,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: l,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: s
    });
  }
  function y(v, C, j) {
    const M = v.children;
    let T = -1;
    const I = [], L = C.enter("table");
    for (; ++T < M.length; )
      I[T] = x(M[T], C, j);
    return L(), I;
  }
  function x(v, C, j) {
    const M = v.children;
    let T = -1;
    const I = [], L = C.enter("tableRow");
    for (; ++T < M.length; )
      I[T] = p(M[T], v, C, j);
    return L(), I;
  }
  function S(v, C, j) {
    let M = d2.inlineCode(v, C, j);
    return j.stack.includes("tableCell") && (M = M.replace(/\|/g, "\\$&")), M;
  }
}
function M9() {
  return {
    exit: {
      taskListCheckValueChecked: Dp,
      taskListCheckValueUnchecked: Dp,
      paragraph: D9
    }
  };
}
function O9() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: R9 }
  };
}
function Dp(n) {
  const r = this.stack[this.stack.length - 2];
  r.type, r.checked = n.type === "taskListCheckValueChecked";
}
function D9(n) {
  const r = this.stack[this.stack.length - 2];
  if (r && r.type === "listItem" && typeof r.checked == "boolean") {
    const l = this.stack[this.stack.length - 1];
    l.type;
    const a = l.children[0];
    if (a && a.type === "text") {
      const s = r.children;
      let u = -1, f;
      for (; ++u < s.length; ) {
        const h = s[u];
        if (h.type === "paragraph") {
          f = h;
          break;
        }
      }
      f === l && (a.value = a.value.slice(1), a.value.length === 0 ? l.children.shift() : l.position && a.position && typeof a.position.start.offset == "number" && (a.position.start.column++, a.position.start.offset++, l.position.start = Object.assign({}, a.position.start)));
    }
  }
  this.exit(n);
}
function R9(n, r, l, a) {
  const s = n.children[0], u = typeof n.checked == "boolean" && s && s.type === "paragraph", f = "[" + (n.checked ? "x" : " ") + "] ", h = l.createTracker(a);
  u && h.move(f);
  let p = d2.listItem(n, r, l, {
    ...a,
    ...h.current()
  });
  return u && (p = p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, g)), p;
  function g(y) {
    return y + f;
  }
}
function L9() {
  return [
    h7(),
    R7(),
    H7(),
    E9(),
    M9()
  ];
}
function U9(n) {
  return {
    extensions: [
      p7(),
      L7(n),
      q7(),
      _9(n),
      O9()
    ]
  };
}
const B9 = {
  tokenize: $9,
  partial: !0
}, m2 = {
  tokenize: G9,
  partial: !0
}, h2 = {
  tokenize: Y9,
  partial: !0
}, p2 = {
  tokenize: X9,
  partial: !0
}, H9 = {
  tokenize: Q9,
  partial: !0
}, g2 = {
  name: "wwwAutolink",
  tokenize: F9,
  previous: y2
}, x2 = {
  name: "protocolAutolink",
  tokenize: V9,
  previous: b2
}, Zn = {
  name: "emailAutolink",
  tokenize: I9,
  previous: v2
}, wn = {};
function q9() {
  return {
    text: wn
  };
}
let Xr = 48;
for (; Xr < 123; )
  wn[Xr] = Zn, Xr++, Xr === 58 ? Xr = 65 : Xr === 91 && (Xr = 97);
wn[43] = Zn;
wn[45] = Zn;
wn[46] = Zn;
wn[95] = Zn;
wn[72] = [Zn, x2];
wn[104] = [Zn, x2];
wn[87] = [Zn, g2];
wn[119] = [Zn, g2];
function I9(n, r, l) {
  const a = this;
  let s, u;
  return f;
  function f(x) {
    return !qf(x) || !v2.call(a, a.previous) || yd(a.events) ? l(x) : (n.enter("literalAutolink"), n.enter("literalAutolinkEmail"), h(x));
  }
  function h(x) {
    return qf(x) ? (n.consume(x), h) : x === 64 ? (n.consume(x), p) : l(x);
  }
  function p(x) {
    return x === 46 ? n.check(H9, y, g)(x) : x === 45 || x === 95 || kt(x) ? (u = !0, n.consume(x), p) : y(x);
  }
  function g(x) {
    return n.consume(x), s = !0, p;
  }
  function y(x) {
    return u && s && Nt(a.previous) ? (n.exit("literalAutolinkEmail"), n.exit("literalAutolink"), r(x)) : l(x);
  }
}
function F9(n, r, l) {
  const a = this;
  return s;
  function s(f) {
    return f !== 87 && f !== 119 || !y2.call(a, a.previous) || yd(a.events) ? l(f) : (n.enter("literalAutolink"), n.enter("literalAutolinkWww"), n.check(B9, n.attempt(m2, n.attempt(h2, u), l), l)(f));
  }
  function u(f) {
    return n.exit("literalAutolinkWww"), n.exit("literalAutolink"), r(f);
  }
}
function V9(n, r, l) {
  const a = this;
  let s = "", u = !1;
  return f;
  function f(x) {
    return (x === 72 || x === 104) && b2.call(a, a.previous) && !yd(a.events) ? (n.enter("literalAutolink"), n.enter("literalAutolinkHttp"), s += String.fromCodePoint(x), n.consume(x), h) : l(x);
  }
  function h(x) {
    if (Nt(x) && s.length < 5)
      return s += String.fromCodePoint(x), n.consume(x), h;
    if (x === 58) {
      const S = s.toLowerCase();
      if (S === "http" || S === "https")
        return n.consume(x), p;
    }
    return l(x);
  }
  function p(x) {
    return x === 47 ? (n.consume(x), u ? g : (u = !0, p)) : l(x);
  }
  function g(x) {
    return x === null || os(x) || Qe(x) || Wr(x) || ks(x) ? l(x) : n.attempt(m2, n.attempt(h2, y), l)(x);
  }
  function y(x) {
    return n.exit("literalAutolinkHttp"), n.exit("literalAutolink"), r(x);
  }
}
function $9(n, r, l) {
  let a = 0;
  return s;
  function s(f) {
    return (f === 87 || f === 119) && a < 3 ? (a++, n.consume(f), s) : f === 46 && a === 3 ? (n.consume(f), u) : l(f);
  }
  function u(f) {
    return f === null ? l(f) : r(f);
  }
}
function G9(n, r, l) {
  let a, s, u;
  return f;
  function f(g) {
    return g === 46 || g === 95 ? n.check(p2, p, h)(g) : g === null || Qe(g) || Wr(g) || g !== 45 && ks(g) ? p(g) : (u = !0, n.consume(g), f);
  }
  function h(g) {
    return g === 95 ? a = !0 : (s = a, a = void 0), n.consume(g), f;
  }
  function p(g) {
    return s || a || !u ? l(g) : r(g);
  }
}
function Y9(n, r) {
  let l = 0, a = 0;
  return s;
  function s(f) {
    return f === 40 ? (l++, n.consume(f), s) : f === 41 && a < l ? u(f) : f === 33 || f === 34 || f === 38 || f === 39 || f === 41 || f === 42 || f === 44 || f === 46 || f === 58 || f === 59 || f === 60 || f === 63 || f === 93 || f === 95 || f === 126 ? n.check(p2, r, u)(f) : f === null || Qe(f) || Wr(f) ? r(f) : (n.consume(f), s);
  }
  function u(f) {
    return f === 41 && a++, n.consume(f), s;
  }
}
function X9(n, r, l) {
  return a;
  function a(h) {
    return h === 33 || h === 34 || h === 39 || h === 41 || h === 42 || h === 44 || h === 46 || h === 58 || h === 59 || h === 63 || h === 95 || h === 126 ? (n.consume(h), a) : h === 38 ? (n.consume(h), u) : h === 93 ? (n.consume(h), s) : (
      // `<` is an end.
      h === 60 || // So is whitespace.
      h === null || Qe(h) || Wr(h) ? r(h) : l(h)
    );
  }
  function s(h) {
    return h === null || h === 40 || h === 91 || Qe(h) || Wr(h) ? r(h) : a(h);
  }
  function u(h) {
    return Nt(h) ? f(h) : l(h);
  }
  function f(h) {
    return h === 59 ? (n.consume(h), a) : Nt(h) ? (n.consume(h), f) : l(h);
  }
}
function Q9(n, r, l) {
  return a;
  function a(u) {
    return n.consume(u), s;
  }
  function s(u) {
    return kt(u) ? l(u) : r(u);
  }
}
function y2(n) {
  return n === null || n === 40 || n === 42 || n === 95 || n === 91 || n === 93 || n === 126 || Qe(n);
}
function b2(n) {
  return !Nt(n);
}
function v2(n) {
  return !(n === 47 || qf(n));
}
function qf(n) {
  return n === 43 || n === 45 || n === 46 || n === 95 || kt(n);
}
function yd(n) {
  let r = n.length, l = !1;
  for (; r--; ) {
    const a = n[r][1];
    if ((a.type === "labelLink" || a.type === "labelImage") && !a._balanced) {
      l = !0;
      break;
    }
    if (a._gfmAutolinkLiteralWalkedInto) {
      l = !1;
      break;
    }
  }
  return n.length > 0 && !l && (n[n.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), l;
}
const P9 = {
  tokenize: rS,
  partial: !0
};
function Z9() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: eS,
        continuation: {
          tokenize: tS
        },
        exit: nS
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: J9
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: K9,
        resolveTo: W9
      }
    }
  };
}
function K9(n, r, l) {
  const a = this;
  let s = a.events.length;
  const u = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let f;
  for (; s--; ) {
    const p = a.events[s][1];
    if (p.type === "labelImage") {
      f = p;
      break;
    }
    if (p.type === "gfmFootnoteCall" || p.type === "labelLink" || p.type === "label" || p.type === "image" || p.type === "link")
      break;
  }
  return h;
  function h(p) {
    if (!f || !f._balanced)
      return l(p);
    const g = pn(a.sliceSerialize({
      start: f.end,
      end: a.now()
    }));
    return g.codePointAt(0) !== 94 || !u.includes(g.slice(1)) ? l(p) : (n.enter("gfmFootnoteCallLabelMarker"), n.consume(p), n.exit("gfmFootnoteCallLabelMarker"), r(p));
  }
}
function W9(n, r) {
  let l = n.length;
  for (; l--; )
    if (n[l][1].type === "labelImage" && n[l][0] === "enter") {
      n[l][1];
      break;
    }
  n[l + 1][1].type = "data", n[l + 3][1].type = "gfmFootnoteCallLabelMarker";
  const a = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, n[l + 3][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  }, s = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, n[l + 3][1].end),
    end: Object.assign({}, n[l + 3][1].end)
  };
  s.end.column++, s.end.offset++, s.end._bufferIndex++;
  const u = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, s.end),
    end: Object.assign({}, n[n.length - 1][1].start)
  }, f = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, u.start),
    end: Object.assign({}, u.end)
  }, h = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    n[l + 1],
    n[l + 2],
    ["enter", a, r],
    // The `[`
    n[l + 3],
    n[l + 4],
    // The `^`.
    ["enter", s, r],
    ["exit", s, r],
    // Everything in between.
    ["enter", u, r],
    ["enter", f, r],
    ["exit", f, r],
    ["exit", u, r],
    // The ending (`]`, properly parsed and labelled).
    n[n.length - 2],
    n[n.length - 1],
    ["exit", a, r]
  ];
  return n.splice(l, n.length - l + 1, ...h), n;
}
function J9(n, r, l) {
  const a = this, s = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let u = 0, f;
  return h;
  function h(x) {
    return n.enter("gfmFootnoteCall"), n.enter("gfmFootnoteCallLabelMarker"), n.consume(x), n.exit("gfmFootnoteCallLabelMarker"), p;
  }
  function p(x) {
    return x !== 94 ? l(x) : (n.enter("gfmFootnoteCallMarker"), n.consume(x), n.exit("gfmFootnoteCallMarker"), n.enter("gfmFootnoteCallString"), n.enter("chunkString").contentType = "string", g);
  }
  function g(x) {
    if (
      // Too long.
      u > 999 || // Closing brace with nothing.
      x === 93 && !f || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      x === null || x === 91 || Qe(x)
    )
      return l(x);
    if (x === 93) {
      n.exit("chunkString");
      const S = n.exit("gfmFootnoteCallString");
      return s.includes(pn(a.sliceSerialize(S))) ? (n.enter("gfmFootnoteCallLabelMarker"), n.consume(x), n.exit("gfmFootnoteCallLabelMarker"), n.exit("gfmFootnoteCall"), r) : l(x);
    }
    return Qe(x) || (f = !0), u++, n.consume(x), x === 92 ? y : g;
  }
  function y(x) {
    return x === 91 || x === 92 || x === 93 ? (n.consume(x), u++, g) : g(x);
  }
}
function eS(n, r, l) {
  const a = this, s = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let u, f = 0, h;
  return p;
  function p(C) {
    return n.enter("gfmFootnoteDefinition")._container = !0, n.enter("gfmFootnoteDefinitionLabel"), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(C), n.exit("gfmFootnoteDefinitionLabelMarker"), g;
  }
  function g(C) {
    return C === 94 ? (n.enter("gfmFootnoteDefinitionMarker"), n.consume(C), n.exit("gfmFootnoteDefinitionMarker"), n.enter("gfmFootnoteDefinitionLabelString"), n.enter("chunkString").contentType = "string", y) : l(C);
  }
  function y(C) {
    if (
      // Too long.
      f > 999 || // Closing brace with nothing.
      C === 93 && !h || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      C === null || C === 91 || Qe(C)
    )
      return l(C);
    if (C === 93) {
      n.exit("chunkString");
      const j = n.exit("gfmFootnoteDefinitionLabelString");
      return u = pn(a.sliceSerialize(j)), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(C), n.exit("gfmFootnoteDefinitionLabelMarker"), n.exit("gfmFootnoteDefinitionLabel"), S;
    }
    return Qe(C) || (h = !0), f++, n.consume(C), C === 92 ? x : y;
  }
  function x(C) {
    return C === 91 || C === 92 || C === 93 ? (n.consume(C), f++, y) : y(C);
  }
  function S(C) {
    return C === 58 ? (n.enter("definitionMarker"), n.consume(C), n.exit("definitionMarker"), s.includes(u) || s.push(u), Re(n, v, "gfmFootnoteDefinitionWhitespace")) : l(C);
  }
  function v(C) {
    return r(C);
  }
}
function tS(n, r, l) {
  return n.check(ka, r, n.attempt(P9, r, l));
}
function nS(n) {
  n.exit("gfmFootnoteDefinition");
}
function rS(n, r, l) {
  const a = this;
  return Re(n, s, "gfmFootnoteDefinitionIndent", 5);
  function s(u) {
    const f = a.events[a.events.length - 1];
    return f && f[1].type === "gfmFootnoteDefinitionIndent" && f[2].sliceSerialize(f[1], !0).length === 4 ? r(u) : l(u);
  }
}
function lS(n) {
  let l = (n || {}).singleTilde;
  const a = {
    name: "strikethrough",
    tokenize: u,
    resolveAll: s
  };
  return l == null && (l = !0), {
    text: {
      126: a
    },
    insideSpan: {
      null: [a]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function s(f, h) {
    let p = -1;
    for (; ++p < f.length; )
      if (f[p][0] === "enter" && f[p][1].type === "strikethroughSequenceTemporary" && f[p][1]._close) {
        let g = p;
        for (; g--; )
          if (f[g][0] === "exit" && f[g][1].type === "strikethroughSequenceTemporary" && f[g][1]._open && // If the sizes are the same:
          f[p][1].end.offset - f[p][1].start.offset === f[g][1].end.offset - f[g][1].start.offset) {
            f[p][1].type = "strikethroughSequence", f[g][1].type = "strikethroughSequence";
            const y = {
              type: "strikethrough",
              start: Object.assign({}, f[g][1].start),
              end: Object.assign({}, f[p][1].end)
            }, x = {
              type: "strikethroughText",
              start: Object.assign({}, f[g][1].end),
              end: Object.assign({}, f[p][1].start)
            }, S = [["enter", y, h], ["enter", f[g][1], h], ["exit", f[g][1], h], ["enter", x, h]], v = h.parser.constructs.insideSpan.null;
            v && Wt(S, S.length, 0, Cs(v, f.slice(g + 1, p), h)), Wt(S, S.length, 0, [["exit", x, h], ["enter", f[p][1], h], ["exit", f[p][1], h], ["exit", y, h]]), Wt(f, g - 1, p - g + 3, S), p = g + S.length - 2;
            break;
          }
      }
    for (p = -1; ++p < f.length; )
      f[p][1].type === "strikethroughSequenceTemporary" && (f[p][1].type = "data");
    return f;
  }
  function u(f, h, p) {
    const g = this.previous, y = this.events;
    let x = 0;
    return S;
    function S(C) {
      return g === 126 && y[y.length - 1][1].type !== "characterEscape" ? p(C) : (f.enter("strikethroughSequenceTemporary"), v(C));
    }
    function v(C) {
      const j = ti(g);
      if (C === 126)
        return x > 1 ? p(C) : (f.consume(C), x++, v);
      if (x < 2 && !l) return p(C);
      const M = f.exit("strikethroughSequenceTemporary"), T = ti(C);
      return M._open = !T || T === 2 && !!j, M._close = !j || j === 2 && !!T, h(C);
    }
  }
}
class iS {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(r, l, a) {
    aS(this, r, l, a);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(r) {
    if (this.map.sort(function(u, f) {
      return u[0] - f[0];
    }), this.map.length === 0)
      return;
    let l = this.map.length;
    const a = [];
    for (; l > 0; )
      l -= 1, a.push(r.slice(this.map[l][0] + this.map[l][1]), this.map[l][2]), r.length = this.map[l][0];
    a.push(r.slice()), r.length = 0;
    let s = a.pop();
    for (; s; ) {
      for (const u of s)
        r.push(u);
      s = a.pop();
    }
    this.map.length = 0;
  }
}
function aS(n, r, l, a) {
  let s = 0;
  if (!(l === 0 && a.length === 0)) {
    for (; s < n.map.length; ) {
      if (n.map[s][0] === r) {
        n.map[s][1] += l, n.map[s][2].push(...a);
        return;
      }
      s += 1;
    }
    n.map.push([r, l, a]);
  }
}
function oS(n, r) {
  let l = !1;
  const a = [];
  for (; r < n.length; ) {
    const s = n[r];
    if (l) {
      if (s[0] === "enter")
        s[1].type === "tableContent" && a.push(n[r + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (s[1].type === "tableContent") {
        if (n[r - 1][1].type === "tableDelimiterMarker") {
          const u = a.length - 1;
          a[u] = a[u] === "left" ? "center" : "right";
        }
      } else if (s[1].type === "tableDelimiterRow")
        break;
    } else s[0] === "enter" && s[1].type === "tableDelimiterRow" && (l = !0);
    r += 1;
  }
  return a;
}
function sS() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: uS,
        resolveAll: cS
      }
    }
  };
}
function uS(n, r, l) {
  const a = this;
  let s = 0, u = 0, f;
  return h;
  function h(R) {
    let O = a.events.length - 1;
    for (; O > -1; ) {
      const ie = a.events[O][1].type;
      if (ie === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      ie === "linePrefix") O--;
      else break;
    }
    const J = O > -1 ? a.events[O][1].type : null, ue = J === "tableHead" || J === "tableRow" ? _ : p;
    return ue === _ && a.parser.lazy[a.now().line] ? l(R) : ue(R);
  }
  function p(R) {
    return n.enter("tableHead"), n.enter("tableRow"), g(R);
  }
  function g(R) {
    return R === 124 || (f = !0, u += 1), y(R);
  }
  function y(R) {
    return R === null ? l(R) : ye(R) ? u > 1 ? (u = 0, a.interrupt = !0, n.exit("tableRow"), n.enter("lineEnding"), n.consume(R), n.exit("lineEnding"), v) : l(R) : Ae(R) ? Re(n, y, "whitespace")(R) : (u += 1, f && (f = !1, s += 1), R === 124 ? (n.enter("tableCellDivider"), n.consume(R), n.exit("tableCellDivider"), f = !0, y) : (n.enter("data"), x(R)));
  }
  function x(R) {
    return R === null || R === 124 || Qe(R) ? (n.exit("data"), y(R)) : (n.consume(R), R === 92 ? S : x);
  }
  function S(R) {
    return R === 92 || R === 124 ? (n.consume(R), x) : x(R);
  }
  function v(R) {
    return a.interrupt = !1, a.parser.lazy[a.now().line] ? l(R) : (n.enter("tableDelimiterRow"), f = !1, Ae(R) ? Re(n, C, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(R) : C(R));
  }
  function C(R) {
    return R === 45 || R === 58 ? M(R) : R === 124 ? (f = !0, n.enter("tableCellDivider"), n.consume(R), n.exit("tableCellDivider"), j) : le(R);
  }
  function j(R) {
    return Ae(R) ? Re(n, M, "whitespace")(R) : M(R);
  }
  function M(R) {
    return R === 58 ? (u += 1, f = !0, n.enter("tableDelimiterMarker"), n.consume(R), n.exit("tableDelimiterMarker"), T) : R === 45 ? (u += 1, T(R)) : R === null || ye(R) ? re(R) : le(R);
  }
  function T(R) {
    return R === 45 ? (n.enter("tableDelimiterFiller"), I(R)) : le(R);
  }
  function I(R) {
    return R === 45 ? (n.consume(R), I) : R === 58 ? (f = !0, n.exit("tableDelimiterFiller"), n.enter("tableDelimiterMarker"), n.consume(R), n.exit("tableDelimiterMarker"), L) : (n.exit("tableDelimiterFiller"), L(R));
  }
  function L(R) {
    return Ae(R) ? Re(n, re, "whitespace")(R) : re(R);
  }
  function re(R) {
    return R === 124 ? C(R) : R === null || ye(R) ? !f || s !== u ? le(R) : (n.exit("tableDelimiterRow"), n.exit("tableHead"), r(R)) : le(R);
  }
  function le(R) {
    return l(R);
  }
  function _(R) {
    return n.enter("tableRow"), U(R);
  }
  function U(R) {
    return R === 124 ? (n.enter("tableCellDivider"), n.consume(R), n.exit("tableCellDivider"), U) : R === null || ye(R) ? (n.exit("tableRow"), r(R)) : Ae(R) ? Re(n, U, "whitespace")(R) : (n.enter("data"), ae(R));
  }
  function ae(R) {
    return R === null || R === 124 || Qe(R) ? (n.exit("data"), U(R)) : (n.consume(R), R === 92 ? fe : ae);
  }
  function fe(R) {
    return R === 92 || R === 124 ? (n.consume(R), ae) : ae(R);
  }
}
function cS(n, r) {
  let l = -1, a = !0, s = 0, u = [0, 0, 0, 0], f = [0, 0, 0, 0], h = !1, p = 0, g, y, x;
  const S = new iS();
  for (; ++l < n.length; ) {
    const v = n[l], C = v[1];
    v[0] === "enter" ? C.type === "tableHead" ? (h = !1, p !== 0 && (Rp(S, r, p, g, y), y = void 0, p = 0), g = {
      type: "table",
      start: Object.assign({}, C.start),
      // Note: correct end is set later.
      end: Object.assign({}, C.end)
    }, S.add(l, 0, [["enter", g, r]])) : C.type === "tableRow" || C.type === "tableDelimiterRow" ? (a = !0, x = void 0, u = [0, 0, 0, 0], f = [0, l + 1, 0, 0], h && (h = !1, y = {
      type: "tableBody",
      start: Object.assign({}, C.start),
      // Note: correct end is set later.
      end: Object.assign({}, C.end)
    }, S.add(l, 0, [["enter", y, r]])), s = C.type === "tableDelimiterRow" ? 2 : y ? 3 : 1) : s && (C.type === "data" || C.type === "tableDelimiterMarker" || C.type === "tableDelimiterFiller") ? (a = !1, f[2] === 0 && (u[1] !== 0 && (f[0] = f[1], x = Ko(S, r, u, s, void 0, x), u = [0, 0, 0, 0]), f[2] = l)) : C.type === "tableCellDivider" && (a ? a = !1 : (u[1] !== 0 && (f[0] = f[1], x = Ko(S, r, u, s, void 0, x)), u = f, f = [u[1], l, 0, 0])) : C.type === "tableHead" ? (h = !0, p = l) : C.type === "tableRow" || C.type === "tableDelimiterRow" ? (p = l, u[1] !== 0 ? (f[0] = f[1], x = Ko(S, r, u, s, l, x)) : f[1] !== 0 && (x = Ko(S, r, f, s, l, x)), s = 0) : s && (C.type === "data" || C.type === "tableDelimiterMarker" || C.type === "tableDelimiterFiller") && (f[3] = l);
  }
  for (p !== 0 && Rp(S, r, p, g, y), S.consume(r.events), l = -1; ++l < r.events.length; ) {
    const v = r.events[l];
    v[0] === "enter" && v[1].type === "table" && (v[1]._align = oS(r.events, l));
  }
  return n;
}
function Ko(n, r, l, a, s, u) {
  const f = a === 1 ? "tableHeader" : a === 2 ? "tableDelimiter" : "tableData", h = "tableContent";
  l[0] !== 0 && (u.end = Object.assign({}, Kl(r.events, l[0])), n.add(l[0], 0, [["exit", u, r]]));
  const p = Kl(r.events, l[1]);
  if (u = {
    type: f,
    start: Object.assign({}, p),
    // Note: correct end is set later.
    end: Object.assign({}, p)
  }, n.add(l[1], 0, [["enter", u, r]]), l[2] !== 0) {
    const g = Kl(r.events, l[2]), y = Kl(r.events, l[3]), x = {
      type: h,
      start: Object.assign({}, g),
      end: Object.assign({}, y)
    };
    if (n.add(l[2], 0, [["enter", x, r]]), a !== 2) {
      const S = r.events[l[2]], v = r.events[l[3]];
      if (S[1].end = Object.assign({}, v[1].end), S[1].type = "chunkText", S[1].contentType = "text", l[3] > l[2] + 1) {
        const C = l[2] + 1, j = l[3] - l[2] - 1;
        n.add(C, j, []);
      }
    }
    n.add(l[3] + 1, 0, [["exit", x, r]]);
  }
  return s !== void 0 && (u.end = Object.assign({}, Kl(r.events, s)), n.add(s, 0, [["exit", u, r]]), u = void 0), u;
}
function Rp(n, r, l, a, s) {
  const u = [], f = Kl(r.events, l);
  s && (s.end = Object.assign({}, f), u.push(["exit", s, r])), a.end = Object.assign({}, f), u.push(["exit", a, r]), n.add(l + 1, 0, u);
}
function Kl(n, r) {
  const l = n[r], a = l[0] === "enter" ? "start" : "end";
  return l[1][a];
}
const fS = {
  name: "tasklistCheck",
  tokenize: mS
};
function dS() {
  return {
    text: {
      91: fS
    }
  };
}
function mS(n, r, l) {
  const a = this;
  return s;
  function s(p) {
    return (
      // Exit if there’s stuff before.
      a.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !a._gfmTasklistFirstContentOfListItem ? l(p) : (n.enter("taskListCheck"), n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), u)
    );
  }
  function u(p) {
    return Qe(p) ? (n.enter("taskListCheckValueUnchecked"), n.consume(p), n.exit("taskListCheckValueUnchecked"), f) : p === 88 || p === 120 ? (n.enter("taskListCheckValueChecked"), n.consume(p), n.exit("taskListCheckValueChecked"), f) : l(p);
  }
  function f(p) {
    return p === 93 ? (n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), n.exit("taskListCheck"), h) : l(p);
  }
  function h(p) {
    return ye(p) ? r(p) : Ae(p) ? n.check({
      tokenize: hS
    }, r, l)(p) : l(p);
  }
}
function hS(n, r, l) {
  return Re(n, a, "whitespace");
  function a(s) {
    return s === null ? l(s) : r(s);
  }
}
function pS(n) {
  return _g([
    q9(),
    Z9(),
    lS(n),
    sS(),
    dS()
  ]);
}
const gS = {};
function xS(n) {
  const r = (
    /** @type {Processor<Root>} */
    this
  ), l = n || gS, a = r.data(), s = a.micromarkExtensions || (a.micromarkExtensions = []), u = a.fromMarkdownExtensions || (a.fromMarkdownExtensions = []), f = a.toMarkdownExtensions || (a.toMarkdownExtensions = []);
  s.push(pS(l)), u.push(L9()), f.push(U9(l));
}
const yS = ({ isOpen: n, onClose: r }) => {
  const [l, a] = V.useState(!0), [s, u] = V.useState(null), [f, h] = V.useState(null), [p, g] = V.useState(!1), [y, x] = V.useState(!1), S = Qr.getCurrentVersion();
  V.useEffect(() => {
    n && v();
  }, [n]);
  const v = async () => {
    a(!0);
    try {
      const [M, T, I] = await Promise.all([
        Qr.getLatestVersion(),
        Qr.getChangelog(),
        Qr.hasUpdate()
      ]);
      u(M), h(T), g(I);
    } catch (M) {
      console.error("[Engram] 加载更新信息失败", M);
    } finally {
      a(!1);
    }
  }, C = async () => {
    x(!0);
    try {
      const M = s || S;
      console.debug("[Engram] Marking update as read:", M), await Qr.markAsRead(M), r();
    } finally {
      x(!1);
    }
  }, j = () => {
    Qr.clearCache(), v();
  };
  return n ? /* @__PURE__ */ d.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ d.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: r
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/50", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ d.jsx(is, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ d.jsxs("div", { children: [
            /* @__PURE__ */ d.jsx("h2", { className: "text-base font-semibold text-foreground", children: "更新通知" }),
            /* @__PURE__ */ d.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "当前版本: v",
              S
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: j,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              title: "刷新",
              children: /* @__PURE__ */ d.jsx(kn, { size: 16, className: l ? "animate-spin" : "" })
            }
          ),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              onClick: r,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ d.jsx(vs, { size: 16 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "flex-1 overflow-y-auto p-5", children: l ? /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ d.jsx(kn, { size: 24, className: "animate-spin mb-3" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "正在检查更新..." })
      ] }) : /* @__PURE__ */ d.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ d.jsx("div", { className: `
                                p-4 rounded-lg border
                                ${p ? "bg-primary/5 border-primary/20" : "bg-green-500/5 border-green-500/20"}
                            `, children: /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3", children: [
          p ? /* @__PURE__ */ d.jsx(is, { size: 20, className: "text-primary" }) : /* @__PURE__ */ d.jsx($f, { size: 20, className: "text-green-500" }),
          /* @__PURE__ */ d.jsxs("div", { children: [
            /* @__PURE__ */ d.jsx("p", { className: "font-medium text-foreground", children: p ? `发现新版本: v${s}` : "已是最新版本" }),
            /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: p ? "请手动更新扩展以获取新功能" : "无需更新" })
          ] })
        ] }) }),
        f && /* @__PURE__ */ d.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ d.jsx("h3", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "更新日志" }),
          /* @__PURE__ */ d.jsx("div", { className: "bg-muted/20 rounded-lg p-4 max-h-64 overflow-y-auto engram-changelog-content text-sm", children: /* @__PURE__ */ d.jsx(l7, { remarkPlugins: [xS], children: f }) })
        ] }),
        !f && !l && /* @__PURE__ */ d.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "无法获取更新日志" }) })
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "px-5 py-4 border-t border-border/50 flex justify-end gap-3", children: [
        /* @__PURE__ */ d.jsx(
          "button",
          {
            onClick: r,
            className: "px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "关闭"
          }
        ),
        p && /* @__PURE__ */ d.jsx(
          "button",
          {
            onClick: C,
            disabled: y,
            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            children: y ? "处理中..." : "我知道了"
          }
        )
      ] })
    ] })
  ] }) : null;
}, bS = ({ children: n, activeTab: r, setActiveTab: l, onClose: a }) => {
  const [s, u] = V.useState(!1), [f, h] = V.useState(!1), [p, g] = V.useState(!1);
  V.useEffect(() => {
    (async () => {
      try {
        const v = await Qr.hasUnreadUpdate();
        g(v);
      } catch (v) {
        console.debug("[Engram] 检查更新失败", v);
      }
    })();
  }, []);
  const y = () => {
    h(!0);
  }, x = () => {
    h(!1), g(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary animate-in fade-in duration-300", id: "engram-layout-root", children: [
    /* @__PURE__ */ d.jsx(cy, {}),
    /* @__PURE__ */ d.jsx(
      yS,
      {
        isOpen: f,
        onClose: x
      }
    ),
    /* @__PURE__ */ d.jsx(
      Y0,
      {
        activeTab: r,
        onNavigate: l,
        isMobile: !1,
        onShowUpdateNotice: y,
        hasUnreadUpdate: p
      }
    ),
    /* @__PURE__ */ d.jsx(
      Y0,
      {
        activeTab: r,
        onNavigate: l,
        isMobile: !0,
        isOpen: s,
        onClose: () => u(!1),
        onShowUpdateNotice: y,
        hasUnreadUpdate: p
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ d.jsx(
        G3,
        {
          onToggleSidebar: () => u(!s),
          isMobile: !1,
          onClose: a,
          onNavigate: (S) => l(S.replace("/", ""))
        }
      ),
      /* @__PURE__ */ d.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background", children: /* @__PURE__ */ d.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth animate-blur-in fill-mode-both", style: { animationDelay: "200ms", animationFillMode: "both" }, children: /* @__PURE__ */ d.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: n }) }) })
    ] }),
    "  "
  ] });
}, vn = {
  primary: "#FFFFFF",
  grid: "#111111"
}, vS = ({ onComplete: n }) => {
  const r = V.useRef(null), l = V.useRef(null), a = V.useRef(null), s = V.useRef(null), [u, f] = V.useState(!1);
  V.useEffect(() => {
    if (window.gsap) {
      f(!0);
      return;
    }
    const p = document.createElement("script");
    p.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", p.async = !0, p.onload = () => f(!0), document.body.appendChild(p);
  }, []);
  const h = () => {
    var v;
    if (!u || !l.current) return;
    const p = window.gsap, g = l.current, y = g.getTotalLength();
    p.set(g, {
      strokeDasharray: y,
      strokeDashoffset: y,
      stroke: vn.primary,
      fillOpacity: 0,
      opacity: 1,
      strokeWidth: 2
    });
    const x = (v = a.current) == null ? void 0 : v.querySelectorAll("path");
    x && p.set(x, { opacity: 0, y: 10 }), p.set(s.current, { scale: 1, opacity: 1 }), p.set(r.current, { opacity: 1 });
    const S = p.timeline({
      onComplete: () => {
        p.to(r.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: n
        });
      }
    });
    S.to(g, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), x && S.to(x, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), S.to({}, { duration: 1 });
  };
  return V.useEffect(() => {
    if (u) {
      const p = setTimeout(h, 800);
      return () => clearTimeout(p);
    }
  }, [u]), /* @__PURE__ */ d.jsxs(
    "div",
    {
      ref: r,
      className: "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden",
      style: { touchAction: "none" },
      children: [
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: `
                        linear-gradient(to right, ${vn.grid} 1px, transparent 1px),
                        linear-gradient(to bottom, ${vn.grid} 1px, transparent 1px)
                    `,
              backgroundSize: "40px 40px",
              opacity: 0.3
            }
          }
        ),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: { background: "radial-gradient(circle at center, transparent 0%, black 100%)", opacity: 0.9 }
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: "z-10 relative flex flex-col items-center justify-center w-full h-full p-4", children: [
          /* @__PURE__ */ d.jsx("div", { className: "w-full max-w-[600px] md:max-w-[800px] aspect-[4/3]", children: /* @__PURE__ */ d.jsx(
            "svg",
            {
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "250 0 550 600",
              className: "w-full h-full overflow-visible",
              children: /* @__PURE__ */ d.jsxs("g", { ref: s, className: "origin-center", children: [
                /* @__PURE__ */ d.jsx(
                  "path",
                  {
                    ref: l,
                    fill: "none",
                    stroke: vn.primary,
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M463.360840,364.455627 C437.246704,381.338409 406.466644,366.209045 404.026672,335.650848 C402.910156,321.667206 412.549713,306.544678 426.813293,300.633850 C430.474335,299.116699 431.826355,297.290924 431.760071,293.302460 C431.519287,278.808716 431.584564,264.307892 431.718292,249.811417 C431.748169,246.574463 430.886292,244.713684 427.681274,243.389038 C412.366425,237.059357 404.237366,225.144638 404.208862,208.867447 C404.179871,192.298615 412.621979,180.486938 428.224701,174.293686 C430.850494,173.251419 431.710938,171.751862 431.696136,169.060089 C431.613586,154.062912 431.568054,139.064117 431.723419,124.068092 C431.759430,120.590492 430.119568,119.052467 427.243103,117.790627 C413.349915,111.695946 405.841095,101.009903 404.195740,85.916542 C402.099884,66.690948 418.566650,47.364159 437.884277,46.682220 C456.888519,46.011345 468.064789,52.989845 476.252197,70.840332 C477.174438,72.851059 478.313995,73.541710 480.422974,73.516098 C499.569031,73.283493 518.722961,73.393646 537.862915,73.456795 C545.529785,73.482086 549.225952,71.767975 552.791809,64.663139 C559.898376,50.503635 576.618042,43.921410 592.447876,47.234680 C608.699890,50.636322 619.276489,62.116261 621.438904,78.701805 C623.839478,97.113228 612.679382,114.371338 595.357910,119.034004 C577.219604,123.916542 558.125427,115.204048 550.887390,98.365906 C549.251465,94.560234 547.316284,93.116508 543.150696,93.160004 C522.989380,93.370483 502.824707,93.284561 482.661285,93.261726 C479.716156,93.258385 477.395905,93.379341 475.956635,96.902077 C474.571899,100.291283 475.702576,102.070137 477.892181,104.225159 C501.524139,127.483910 525.127991,150.771423 548.653259,174.137985 C550.803162,176.273376 552.520325,176.380997 555.207153,175.171799 C569.642334,168.675354 583.205750,171.177368 594.759277,181.252563 C606.783813,191.738449 610.379395,205.504944 605.248840,220.725037 C600.321167,235.343246 589.568848,243.345337 574.305420,245.467117 C567.655396,246.391541 561.334045,245.373352 555.347839,242.591797 C552.373169,241.209595 550.274536,241.303284 547.832886,243.728531 C524.197693,267.205322 500.499634,290.619415 476.704651,313.934174 C474.165771,316.421844 475.106598,318.487793 476.015411,321.059723 C476.869354,323.476318 478.159149,324.356232 480.796143,324.332367 C501.456360,324.145294 522.118530,324.019531 542.778870,324.122131 C546.987793,324.143005 549.216675,322.931549 551.044983,318.871887 C558.230042,302.918091 576.073181,294.652069 593.497131,298.684143 C610.451355,302.607544 622.335205,317.668091 622.119812,334.958160 C621.900024,352.608002 609.316650,367.564362 591.822144,370.969543 C574.585754,374.324463 557.004028,364.861755 550.521484,348.456757 C549.268677,345.286346 547.631836,344.200745 544.294861,344.220337 C523.465576,344.342865 502.634888,344.322540 481.805359,344.218109 C478.697174,344.202545 476.993927,345.152252 475.888916,348.205902 C473.513214,354.771179 469.417969,360.183167 463.360840,364.455627 M472.733368,188.880936 C473.545441,190.333145 474.799072,191.702774 475.088898,193.252655 C476.058929,198.439468 479.434326,198.919983 483.888489,198.861130 C499.042145,198.660889 514.201233,198.707901 529.355957,198.872879 C532.819580,198.910583 534.700989,197.913788 536.177185,194.588806 C537.657104,191.255417 536.060120,189.735016 534.097900,187.805573 C510.706268,164.804840 487.354065,141.764008 463.949341,118.776604 C462.445251,117.299316 461.277863,114.441566 458.282349,116.423027 C455.343719,118.366882 451.028107,118.406143 451.180542,123.994591 C451.584534,138.807007 451.429443,153.638779 451.250458,168.459885 C451.208984,171.894135 452.474548,173.487930 455.559784,174.673798 C462.566864,177.367126 468.343140,181.758774 472.733368,188.880936 M457.308807,300.958954 C460.540070,302.823181 462.218414,300.310028 464.063263,298.488586 C487.164032,275.681519 510.248199,252.857559 533.326538,230.027756 C535.300171,228.075378 537.458679,226.516449 535.970032,222.843750 C534.495117,219.205124 532.067688,218.878906 528.898010,218.890778 C513.414001,218.948746 497.929138,219.002151 482.445862,218.887329 C478.998230,218.861771 477.090668,219.941055 475.670502,223.284790 C471.742218,232.533905 465.159332,239.474701 455.665497,243.103836 C452.239746,244.413376 451.216278,246.302231 451.253540,249.781387 C451.406891,264.098541 451.489380,278.421356 451.223358,292.735107 C451.142975,297.059998 452.224640,299.783386 457.308807,300.958954 z"
                  }
                ),
                /* @__PURE__ */ d.jsxs("g", { ref: a, children: [
                  /* @__PURE__ */ d.jsx("path", { fill: vn.primary, d: "M732.215698,483.876190 C732.750061,488.775055 731.110779,490.523590 726.372742,490.479736 C713.642639,490.361908 713.645874,490.566711 713.641113,477.834442 C713.638428,470.668732 713.788818,463.497284 713.552246,456.338928 C713.318970,449.278015 710.633911,445.451111 705.788818,444.403778 C698.667542,442.864441 692.689270,447.076904 692.324463,454.647736 C691.851685,464.458313 691.862549,474.305084 692.048706,484.128967 C692.137085,488.792786 690.778625,490.578705 685.827454,490.500549 C672.843933,490.295532 672.845886,490.510315 672.820435,477.502625 C672.805786,470.003754 672.887146,462.502136 672.708618,455.006927 C672.557556,448.666412 669.519653,444.981689 664.341858,444.320343 C658.234436,443.540314 653.997803,446.541077 652.162415,452.864807 C651.503052,455.136719 651.331299,457.435608 651.335754,459.781158 C651.352234,468.446747 651.306274,477.112488 651.338745,485.777985 C651.348389,488.341766 651.062439,490.138977 647.717529,490.447815 C632.733521,491.831421 632.748596,491.913239 632.764404,477.031830 C632.778870,463.366852 632.738831,449.701782 632.731445,436.036774 C632.727478,428.732941 632.735718,428.732544 640.257812,428.707031 C641.591003,428.702484 642.924194,428.695312 644.257324,428.701721 C647.429321,428.717010 651.058289,427.916016 650.925598,433.229431 C655.308960,431.486603 658.595154,429.192383 662.595154,428.377930 C670.453491,426.777832 677.619019,428.117981 683.735718,433.181641 C686.512207,435.480164 688.239807,435.373474 690.953918,433.250153 C697.176208,428.382202 704.485840,426.832367 712.194946,428.080414 C725.100098,430.169739 731.944641,439.074829 732.175659,453.896454 C732.328857,463.726379 732.212036,473.560547 732.215698,483.876190 z" }),
                  /* @__PURE__ */ d.jsx("path", { fill: vn.primary, d: "M487.575867,485.935303 C487.614716,484.616028 487.614716,483.640503 487.614716,481.796417 C479.116760,488.238525 470.153107,489.257660 460.718079,486.787720 C454.401794,485.134186 449.163879,481.675842 445.200134,476.457642 C436.960876,465.610748 437.295532,448.722229 445.889771,438.315796 C455.451538,426.737823 470.295227,425.042450 488.444458,433.733826 C487.913239,428.612457 491.194366,428.604004 494.772766,428.684540 C508.272736,428.988373 506.179840,426.849945 506.294434,440.421967 C506.411133,454.245575 506.366882,468.071228 506.299957,481.895538 C506.205750,501.359833 494.742065,512.847900 475.259460,513.370544 C465.272614,513.638489 455.717651,512.255005 446.682343,507.725311 C443.034790,505.896667 441.336151,503.847290 444.229065,500.105438 C444.329590,499.975464 444.390869,499.814941 444.469086,499.667908 C448.861603,491.411743 448.894196,491.340729 457.207886,495.157196 C463.352356,497.977905 469.817169,498.376801 476.285126,497.456818 C482.543640,496.566620 486.238434,492.476532 487.575867,485.935303 M469.264740,471.577881 C471.084900,471.642700 472.915710,471.865356 474.723328,471.743805 C481.074341,471.316620 486.258820,466.628052 487.489288,460.346558 C488.669373,454.322296 485.713593,448.118378 480.288971,445.234039 C472.426056,441.053253 462.868591,443.867035 459.399658,451.384033 C455.705688,459.388580 459.382996,467.492737 469.264740,471.577881 z" }),
                  /* @__PURE__ */ d.jsx("path", { fill: vn.primary, d: "M350.790619,410.644409 C354.007477,410.561554 355.147522,411.945587 355.144592,414.620361 C355.128937,428.846375 356.152588,426.165161 344.558044,426.338898 C335.900940,426.468628 327.237854,426.493591 318.582581,426.315826 C314.804382,426.238220 313.157715,427.376373 313.262451,431.424896 C313.571655,443.375275 312.019470,441.570435 323.204529,441.691742 C330.530579,441.771271 337.860626,441.831665 345.183899,441.671692 C348.853607,441.591553 350.203705,443.056824 350.190338,446.675842 C350.143219,459.433014 350.725433,457.207275 340.024445,457.368561 C332.865692,457.476471 325.700195,457.536346 318.545349,457.339996 C314.731018,457.235291 313.250702,458.478516 313.234222,462.478668 C313.185364,474.308960 313.038177,474.321259 324.813477,474.130890 C334.298523,473.977539 343.772430,475.169159 353.264343,474.338776 C354.864075,474.198792 356.466827,474.576569 356.702301,476.439850 C357.203217,480.403656 357.364838,484.405273 356.646729,488.365631 C356.297211,490.293060 354.652405,490.369568 353.118927,490.370575 C334.801880,490.382568 316.484711,490.350647 298.167847,490.412506 C295.104187,490.422852 294.024323,488.921082 294.024200,486.130402 C294.023224,462.484924 294.047699,438.839325 293.967896,415.194092 C293.954620,411.261261 296.028046,410.593658 299.359711,410.610138 C316.344330,410.694275 333.329620,410.638672 350.790619,410.644409 z" }),
                  /* @__PURE__ */ d.jsx("path", { fill: vn.primary, d: "M620.003906,453.402435 C620.062195,464.023071 619.882812,474.188721 620.189575,484.339661 C620.338318,489.262421 618.431458,490.973572 613.757507,490.452362 C611.783386,490.232208 609.754700,490.291412 607.767883,490.444916 C604.889648,490.667267 602.478821,490.168823 601.296570,486.513000 C594.831909,490.991821 587.888184,491.843719 580.600464,491.328247 C565.916626,490.289642 557.201233,476.053131 563.502625,463.374390 C565.502930,459.349640 568.872803,457.136932 572.794861,455.506927 C578.118103,453.294647 583.702881,452.709900 589.425354,452.731232 C592.879822,452.744110 596.387085,453.235260 599.791443,452.317169 C599.855774,446.843750 597.260681,443.903503 591.552673,443.177338 C585.446533,442.400513 579.495911,443.228607 574.179382,446.386688 C570.948853,448.305603 569.535645,447.214966 568.011658,444.340485 C563.043945,434.970917 563.058899,434.663818 573.199219,430.800537 C582.143921,427.392792 591.347961,426.734100 600.678101,428.904358 C613.358643,431.853943 619.173157,440.405762 620.003906,453.402435 M582.869263,466.083313 C579.496887,469.605530 579.013306,473.431427 581.947998,475.906952 C585.513611,478.914764 589.714966,478.291107 593.721985,477.031647 C597.412354,475.871704 599.990784,473.365112 600.658081,469.369629 C601.070496,466.900665 600.409729,465.044220 597.411255,465.098297 C592.800171,465.181488 588.157471,464.530182 582.869263,466.083313 z" }),
                  /* @__PURE__ */ d.jsx("path", { fill: vn.primary, d: "M410.915314,457.280090 C410.311127,447.930115 406.925934,444.198608 399.452026,444.194855 C391.667114,444.190948 386.727997,448.953094 386.409271,457.536652 C386.075653,466.521088 386.068634,475.532593 386.350006,484.518738 C386.494904,489.147247 384.896912,490.532959 380.337830,490.481964 C367.440552,490.337616 367.627808,490.513641 367.533173,477.713593 C367.426025,463.226135 368.160004,448.728760 367.168365,434.251617 C366.898468,430.311462 368.239288,428.249725 372.529694,428.668640 C374.840057,428.894196 377.203857,428.868896 379.519684,428.673553 C383.194244,428.363556 385.817352,429.188293 385.487488,434.182526 C390.858826,430.844635 395.856995,428.304504 401.601257,427.794434 C418.292908,426.312286 429.386810,436.518799 429.975342,454.379517 C430.315308,464.696716 429.971527,475.035126 430.046204,485.363190 C430.071198,488.817627 428.985992,490.534210 425.145325,490.442291 C408.307220,490.039520 411.204895,492.848450 410.942963,476.734924 C410.840088,470.406036 410.927368,464.074036 410.915314,457.280090 z" }),
                  /* @__PURE__ */ d.jsx("path", { fill: vn.primary, d: "M556.799500,444.921539 C554.214233,445.227783 552.026184,445.174683 549.913574,445.548401 C542.544189,446.852142 538.560974,452.210632 538.387756,461.266998 C538.231995,469.411011 538.239258,477.561676 538.377136,485.705963 C538.433838,489.055634 537.355591,490.537964 533.812988,490.447296 C516.656677,490.008148 519.942505,492.939087 519.712585,476.823181 C519.510925,462.693848 519.801025,448.557343 519.590698,434.428253 C519.527222,430.165985 520.732788,428.169983 525.216187,428.665833 C527.350830,428.901917 529.549255,428.854156 531.692566,428.654297 C535.487610,428.300446 537.940002,429.350586 537.432373,434.447845 C542.475464,431.817810 546.689819,428.862549 551.859985,428.147003 C557.409912,427.378845 558.504028,428.019318 558.285950,433.612213 C558.141113,437.327057 559.514648,441.236115 556.799500,444.921539 z" })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ d.jsx("p", { className: "mt-6 md:mt-8 text-white/30 text-xs md:text-sm tracking-widest uppercase", children: "Where memories leave their trace" })
        ] })
      ]
    }
  );
}, vf = ({
  title: n,
  value: r,
  icon: l,
  subtext: a,
  highlight: s = !1
}) => /* @__PURE__ */ d.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${s ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ d.jsx("div", { className: `p-2 rounded-lg ${s ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ d.jsx(l, { size: 20 }) }),
    s && /* @__PURE__ */ d.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: r }),
    /* @__PURE__ */ d.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: n }),
    a && /* @__PURE__ */ d.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: a })
  ] })
] });
function Jr() {
  var n, r;
  try {
    return ((r = (n = window.SillyTavern) == null ? void 0 : n.getContext) == null ? void 0 : r.call(n)) || null;
  } catch (l) {
    return console.warn("[Engram] Failed to get ST context:", l), null;
  }
}
function SS() {
  const n = Jr();
  return (n == null ? void 0 : n.chat) || [];
}
function kS() {
  return SS();
}
function S2() {
  const n = Jr();
  return n ? {
    name: n.name2,
    id: n.characterId
  } : null;
}
function k2() {
  try {
    return window.selected_model || void 0;
  } catch {
    return;
  }
}
function CS() {
  return Jr() !== null;
}
async function Lp() {
  const { Logger: n } = await Promise.resolve().then(() => ed);
  await n.init(), n.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: r } = await Promise.resolve().then(() => pg);
  r.initSettings(), n.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: a } = await Promise.resolve().then(() => XS), s = await a();
    n.info("TavernAPI", "酒馆接口对接状态", s);
  } catch (a) {
    n.warn("TavernAPI", "酒馆接口检查失败", { error: String(a) });
  }
  try {
    const { summarizerService: a } = await Promise.resolve().then(() => Zt);
    a.start();
    const s = a.getStatus();
    n.info("Summarizer", "服务已启动", s);
  } catch (a) {
    n.warn("Summarizer", "服务启动失败", { error: String(a) });
  }
  wS();
  const { ThemeManager: l } = await Promise.resolve().then(() => ns);
  l.init(), TS();
  try {
    const { CharacterDeleteService: a } = await Promise.resolve().then(() => fk);
    a.init(), n.info("STBridge", "CharacterDeleteService initialized");
  } catch (a) {
    n.warn("STBridge", "Failed to initialize CharacterDeleteService", { error: String(a) });
  }
  n.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const C2 = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function wS() {
  const n = document.querySelector("#top-settings-holder"), r = document.querySelector("#WI-SP-button");
  if (!n) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), ES();
    return;
  }
  const l = document.createElement("div");
  l.id = "engram-drawer", l.className = "drawer";
  const a = document.createElement("div");
  a.className = "drawer-toggle drawer-header";
  const s = document.createElement("div");
  s.id = "engram-drawer-icon", s.className = "drawer-icon fa-fw closedIcon", s.title = "Engram - 记忆操作系统", s.setAttribute("data-i18n", "[title]Engram - Memory OS"), s.innerHTML = C2, s.addEventListener("click", ds), a.appendChild(s), l.appendChild(a), r ? (n.insertBefore(l, r), console.log("[Engram] Top bar button injected before WI-SP-button")) : (n.appendChild(l), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function ES() {
  const n = document.createElement("div");
  n.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", n.title = "Engram - 记忆操作系统", n.innerHTML = C2, n.addEventListener("click", ds), document.body.appendChild(n);
}
let fs = null;
function jS(n) {
  fs = n, fs = n;
}
let If = null, Up = null;
function NS(n) {
  If = n;
}
function TS() {
  if (!If) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const n = "engram-global-overlay";
  let r = document.getElementById(n);
  r || (r = document.createElement("div"), r.id = n, r.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(r)), Up || (Up = If(r, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let Sf = !1, sa = null, ls = null;
function ds() {
  Sf && sa ? (ls && (ls.unmount(), ls = null), sa.remove(), sa = null, Sf = !1) : (sa = AS(), document.body.appendChild(sa), Sf = !0);
}
function AS() {
  var r;
  const n = document.createElement("div");
  return n.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", n.style.backgroundColor = "var(--background)", n.style.color = "var(--foreground)", n.style.height = "100dvh", n.style.width = "100vw", n.style.top = "0", n.style.left = "0", n.id = "engram-panel-root", fs ? ls = fs(n, ds) : (n.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (r = n.querySelector("button")) == null || r.addEventListener("click", ds)), n;
}
async function zS(n, r) {
  try {
    const a = await new Function("path", "return import(path)")("/scripts/chats.js");
    a && typeof a.hideChatMessageRange == "function" ? (await a.hideChatMessageRange(n, r, !1), console.log(`[Engram] Hidden messages range: ${n}-${r}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (l) {
    console.error("[Engram] Failed to hide messages:", l);
  }
}
async function _S(n, r = "text", l = "") {
  return window.callPopup ? window.callPopup(n, r, l) : (console.warn("[Engram] callPopup not available"), Promise.resolve(r === "confirm" ? !0 : null));
}
const MS = (n) => {
  switch (n) {
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
}, Bp = ({ onNavigate: n }) => {
  const [r, l] = V.useState([]), [a, s] = V.useState(Jr()), [u, f] = V.useState(0);
  V.useEffect(() => (l(ge.getLogs().slice(0, 3)), ge.subscribe((x) => {
    l((S) => [x, ...S].slice(0, 3));
  })), []), V.useEffect(() => {
    const y = setInterval(() => {
      f((x) => x + 1);
    }, 1e3);
    return () => clearInterval(y);
  }, []);
  const h = (y) => {
    const x = Math.floor(y / 3600), S = Math.floor(y % 3600 / 60), v = y % 60;
    return `${x.toString().padStart(2, "0")}:${S.toString().padStart(2, "0")}:${v.toString().padStart(2, "0")}`;
  }, p = (a == null ? void 0 : a.name2) || "Unknown", g = (y) => {
    n && n(y);
  };
  return /* @__PURE__ */ d.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ d.jsx(
        vf,
        {
          title: "ACTIVE MODEL",
          value: a ? "Connected" : "Offline",
          subtext: a ? `Chatting with ${p}` : "Waiting for connection...",
          icon: og,
          highlight: !!a
        }
      ),
      /* @__PURE__ */ d.jsx(
        vf,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: ys
        }
      ),
      /* @__PURE__ */ d.jsx(
        vf,
        {
          title: "SYSTEM UPTIME",
          value: h(u),
          subtext: "Session Duration",
          icon: Gf
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ d.jsx(Kf, { size: 16 }),
        /* @__PURE__ */ d.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ d.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => g("memory"), children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => g("graph"), children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => g("processing"), children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => g("settings"), children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ d.jsx(ri, { size: 16 }),
        /* @__PURE__ */ d.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ d.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => g("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: r.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : r.map((y) => /* @__PURE__ */ d.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${MS(y.level)}`, children: [
        /* @__PURE__ */ d.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(y.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: y.message })
      ] }, y.id)) })
    ] })
  ] }) });
}, OS = V.lazy(() => Promise.resolve().then(() => hk).then((n) => ({ default: n.GraphView }))), DS = V.lazy(() => Promise.resolve().then(() => Nk).then((n) => ({ default: n.DevLog }))), RS = V.lazy(() => Promise.resolve().then(() => Wk).then((n) => ({ default: n.APIPresets }))), LS = V.lazy(() => Promise.resolve().then(() => tC).then((n) => ({ default: n.Settings }))), US = V.lazy(() => Promise.resolve().then(() => rC).then((n) => ({ default: n.MemoryStream }))), BS = V.lazy(() => Promise.resolve().then(() => fC).then((n) => ({ default: n.ProcessingView }))), HS = () => /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ d.jsx("div", { className: "animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" }) }), qS = ({ onClose: n }) => {
  const [r, l] = V.useState("dashboard"), [a, s] = V.useState(!1), [u, f] = V.useState(!1);
  V.useEffect(() => {
    const g = setTimeout(() => {
      const y = Ee.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", y), y || s(!0), f(!0);
    }, 1e3);
    return () => clearTimeout(g);
  }, []);
  const h = () => {
    Ee.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), s(!1);
  };
  if (!u)
    return null;
  const p = () => {
    const [g, y] = r.split(":");
    switch (g) {
      case "dashboard":
        return /* @__PURE__ */ d.jsx(Bp, { onNavigate: l });
      case "presets":
        return /* @__PURE__ */ d.jsx(RS, { initialTab: y });
      case "graph":
        return /* @__PURE__ */ d.jsx(OS, {});
      case "devlog":
        return /* @__PURE__ */ d.jsx(DS, { initialTab: y });
      case "settings":
        return /* @__PURE__ */ d.jsx(LS, {});
      case "memory":
        return /* @__PURE__ */ d.jsx(US, {});
      case "processing":
        return /* @__PURE__ */ d.jsx(BS, { onNavigate: l });
      default:
        return /* @__PURE__ */ d.jsx(Bp, {});
    }
  };
  return (
    /* 首次安装欢迎动画 */
    /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      a && /* @__PURE__ */ d.jsx(vS, { onComplete: h }),
      /* @__PURE__ */ d.jsx(bS, { activeTab: r, setActiveTab: l, onClose: n, children: /* @__PURE__ */ d.jsx(V.Suspense, { fallback: /* @__PURE__ */ d.jsx(HS, {}), children: p() }) })
    ] })
  );
};
var IS = Kp();
const FS = /* @__PURE__ */ ni(IS), Cr = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function Xl() {
  try {
    const n = window.SillyTavern;
    if (n != null && n.getContext) {
      const r = n.getContext();
      return (r == null ? void 0 : r.eventSource) || null;
    }
    return null;
  } catch {
    return console.warn("[Engram] EventBus: 无法获取 SillyTavern eventSource"), null;
  }
}
class el {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(r, l) {
    const a = Xl();
    return a && a.on(r, l), this.listeners.has(r) || this.listeners.set(r, /* @__PURE__ */ new Set()), this.listeners.get(r).add(l), () => {
      this.off(r, l);
    };
  }
  /**
   * 一次性订阅事件（触发后自动取消）
   * @param event 事件名称
   * @param callback 回调函数
   */
  static once(r, l) {
    const a = Xl();
    if (a)
      a.once(r, l);
    else {
      const s = (...u) => {
        this.off(r, s), l(...u);
      };
      this.on(r, s);
    }
  }
  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  static off(r, l) {
    var s;
    const a = Xl();
    a && a.removeListener(r, l), (s = this.listeners.get(r)) == null || s.delete(l);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(r, ...l) {
    const a = Xl();
    a && a.emit(r, ...l);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const r = Xl();
    for (const [l, a] of this.listeners)
      for (const s of a)
        r && r.removeListener(l, s);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return Xl() !== null;
  }
}
Je(el, "listeners", /* @__PURE__ */ new Map());
const VS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: el,
  TavernEventType: Cr
}, Symbol.toStringTag, { value: "Module" }));
function $S(n, r) {
  let l = "assistant";
  return n.is_user ? l = "user" : n.is_system && (l = "system"), {
    id: r,
    role: l,
    content: n.mes || "",
    name: n.name || "",
    isHidden: n.is_hidden ?? !1,
    raw: n
  };
}
class w2 {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(r = {}) {
    const l = Jr();
    if (!(l != null && l.chat))
      return [];
    let a = l.chat.map((s, u) => $S(s, u));
    if (r.includeHidden || (a = a.filter((s) => !s.isHidden)), r.role) {
      const s = Array.isArray(r.role) ? r.role : [r.role];
      a = a.filter((u) => s.includes(u.role));
    }
    return a;
  }
  /**
   * 获取最近 N 条消息
   * @param count 消息数量
   * @param options 查询选项
   */
  static getRecentMessages(r, l = {}) {
    return this.getAllMessages(l).slice(-r);
  }
  /**
   * 获取指定范围的消息
   * @param start 起始索引（包含）
   * @param end 结束索引（不包含）
   * @param options 查询选项
   */
  static getMessages(r, l, a = {}) {
    return this.getAllMessages(a).slice(r, l);
  }
  /**
   * 获取当前楼层数（消息总数）
   * @param options 查询选项
   */
  static getFloorCount(r = {}) {
    return this.getAllMessages(r).length;
  }
  /**
   * 获取最后一条消息
   * @param options 查询选项
   */
  static getLastMessage(r = {}) {
    const l = this.getAllMessages(r);
    return l.length > 0 ? l[l.length - 1] : null;
  }
  /**
   * 获取当前角色名称
   */
  static getCurrentCharacterName() {
    var l;
    const r = Jr();
    return !(r != null && r.characters) || r.characterId < 0 ? null : ((l = r.characters[r.characterId]) == null ? void 0 : l.name) || null;
  }
  /**
   * 格式化消息为纯文本（用于传给 LLM）
   * @param messages 消息数组
   * @param format 格式化模板
   */
  static formatMessagesAsText(r, l = "simple") {
    return l === "simple" ? r.map((a) => `${a.name}: ${a.content}`).join(`

`) : r.map((a) => `[${a.role.toUpperCase()}] ${a.name}:
${a.content}`).join(`

---

`);
  }
  /**
   * 检查 MessageService 是否可用
   */
  static isAvailable() {
    return CS();
  }
}
const GS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: w2
}, Symbol.toStringTag, { value: "Module" }));
async function Hp(n) {
  try {
    const r = window.SillyTavern;
    if (r != null && r.getContext) {
      const l = r.getContext();
      if (l != null && l.getTokenCountAsync)
        return await l.getTokenCountAsync(n);
    }
    return Math.ceil(n.length / 4);
  } catch {
    return console.warn("[Engram] WorldInfoService: 无法使用酒馆 Token 计数，使用估算"), Math.ceil(n.length / 4);
  }
}
function Bt() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
const ha = "engram总结";
class Le {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(r) {
    return Hp(r);
  }
  /**
   * 计算特定世界书中所有 Engram 总结条目的 Token 总和
   * 仅计算已启用的条目，使用关键词筛选
   * @param worldbookName 世界书名称
   */
  static async countSummaryTokens(r) {
    const a = (await this.getEntries(r)).filter(
      (f) => f.enabled && f.keys.includes(ha)
    );
    if (a.length === 0) return 0;
    const s = a.map((f) => f.content);
    return (await Promise.all(s.map((f) => this.countTokens(f)))).reduce((f, h) => f + h, 0);
  }
  /**
   * 获取当前角色的所有 Engram 摘要内容（用于 {{engramSummaries}} 宏）
   * 返回格式化后的摘要文本，供精简功能使用
   */
  static async getEngramSummariesContent() {
    const r = this.findExistingWorldbook();
    if (!r)
      return "";
    const a = (await this.getEntries(r)).filter((u) => u.keys.includes(ha));
    return a.length === 0 ? "" : (a.sort((u, f) => u.order - f.order), a.map((u) => {
      const f = u.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
      return `【${u.name}】
${f}`;
    }).join(`

---

`));
  }
  /**
   * 批量计算多段文本的 Token 数量
   * @param texts 文本数组
   */
  static async countTokensBatch(r) {
    return Promise.all(r.map((l) => Hp(l)));
  }
  /**
   * 查找已绑定的 Engram 世界书（不创建）
   * 用于面板显示等只读场景
   */
  static findExistingWorldbook() {
    try {
      const r = Bt();
      if (!(r != null && r.getCharWorldbookNames))
        return null;
      const l = r.getCharWorldbookNames("current");
      return l && [...l.additional || [], l.primary].filter(Boolean).find((u) => u == null ? void 0 : u.startsWith("[Engram]")) || null;
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
    var r, l;
    try {
      const a = this.findExistingWorldbook();
      if (a)
        return console.debug("[Engram] WorldInfoService: 使用已绑定的世界书", a), a;
      const s = Bt();
      if (!s)
        return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), null;
      const u = (l = (r = window.SillyTavern) == null ? void 0 : r.getContext) == null ? void 0 : l.call(r);
      if (!(u != null && u.name2) || u.name2 === "SillyTavern System")
        return console.warn("[Engram] WorldInfoService: 无效的角色上下文"), null;
      const f = u.name2, h = `[Engram] ${f}`;
      if (console.debug("[Engram] WorldInfoService: 创建新世界书", h), s.createWorldbook)
        await s.createWorldbook(h);
      else
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用"), null;
      if (s.getCharWorldbookNames && s.rebindCharWorldbooks) {
        const p = s.getCharWorldbookNames("current");
        p && (p.additional.push(h), await s.rebindCharWorldbooks("current", p), console.info("[Engram] WorldInfoService: 世界书已绑定到角色", {
          character: f,
          worldbook: h
        }));
      }
      return h;
    } catch (a) {
      return console.error("[Engram] WorldInfoService: 获取/创建世界书失败", a), null;
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
  static async getEntries(r) {
    const l = Bt();
    if (!(l != null && l.getWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), [];
    try {
      return (await l.getWorldbook(r)).map((s) => {
        const u = s, f = u.strategy, h = u.position, p = u.recursion, g = [];
        if (f != null && f.keys && Array.isArray(f.keys))
          for (const y of f.keys)
            typeof y == "string" ? g.push(y) : y && typeof y == "object" && "source" in y && g.push(y.source);
        return {
          uid: u.uid || 0,
          name: u.name || "",
          content: u.content || "",
          enabled: u.enabled ?? !0,
          constant: (f == null ? void 0 : f.type) === "constant",
          keys: g,
          position: (h == null ? void 0 : h.type) || "before_character_definition",
          depth: (h == null ? void 0 : h.depth) || 0,
          order: (h == null ? void 0 : h.order) || 100,
          recursion: p ? {
            prevent_incoming: p.prevent_incoming,
            prevent_outgoing: p.prevent_outgoing
          } : void 0,
          comment: u.comment || "",
          extra: u.extra || void 0
        };
      });
    } catch (a) {
      return console.error("[Engram] WorldInfoService: 获取世界书条目失败", a), [];
    }
  }
  /**
   * 获取所有世界书名称
   */
  static async getWorldbookNames() {
    const r = Bt();
    try {
      return r != null && r.getWorldbookNames ? r.getWorldbookNames() : [];
    } catch (l) {
      return console.error("[Engram] WorldInfoService: 获取世界书列表失败", l), [];
    }
  }
  /**
   * 删除世界书
   * @param worldbookName 世界书名称
   */
  static async deleteWorldbook(r) {
    const l = Bt();
    if (!(l != null && l.deleteWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbook 不可用"), !1;
    try {
      const a = await l.deleteWorldbook(r);
      return a && console.info("[Engram] WorldInfoService: 已删除世界书", r), a;
    } catch (a) {
      return console.error("[Engram] WorldInfoService: 删除世界书失败", a), !1;
    }
  }
  /**
   * 创建新的世界书条目
   * 使用 TavernHelper API（与 the_world 插件保持一致）
   * @param worldbookName 世界书名称
   * @param params 条目参数
   */
  static async createEntry(r, l) {
    try {
      const a = Bt();
      if (!(a != null && a.createWorldbookEntries))
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbookEntries 不可用"), !1;
      const s = {
        name: l.name,
        content: l.content,
        comment: l.name,
        // 用作备注
        disable: !(l.enabled ?? !0),
        // TavernHelper 使用 disable 字段
        strategy: {
          type: l.constant ? "constant" : "selective",
          keys: l.keys || []
        },
        position: {
          type: l.position || "before_character_definition",
          order: l.order ?? 100,
          depth: l.depth ?? 4
        },
        recursion: l.recursion,
        // 添加 Engram 身份标识
        extra: {
          engram: !0
        }
      };
      return console.debug("[Engram] WorldInfoService: 创建条目", {
        worldbook: r,
        name: l.name,
        contentLength: l.content.length
      }), await a.createWorldbookEntries(r, [s]), console.info("[Engram] WorldInfoService: 条目已保存到世界书", r), !0;
    } catch (a) {
      return console.error("[Engram] WorldInfoService: 创建世界书条目失败", a), !1;
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
  static async updateEntry(r, l, a) {
    const s = Bt();
    if (!(s != null && s.updateWorldbookWith))
      return console.warn("[Engram] WorldInfoService: TavernHelper.updateWorldbookWith 不可用"), !1;
    try {
      return await s.updateWorldbookWith(r, (u) => {
        var h;
        const f = u.findIndex((p) => p.uid === l);
        if (f !== -1) {
          const p = u[f];
          let g = p.disable;
          "enabled" in a && (g = !a.enabled);
          let y = p.strategy || { type: "selective", keys: [] };
          if ("constant" in a || "keys" in a) {
            const v = a.constant !== void 0 ? a.constant : y.type === "constant", C = a.keys !== void 0 ? a.keys : y.keys || [];
            y = {
              ...y,
              type: v ? "constant" : "selective",
              keys: C
            };
          }
          let x = p.position || { type: "before_character_definition", order: 0, depth: 0 };
          (a.position || typeof a.order == "number" || typeof a.depth == "number") && (x = {
            ...x,
            type: (typeof a.position == "string" ? a.position : (h = a.position) == null ? void 0 : h.type) || x.type,
            order: a.order ?? x.order,
            depth: a.depth ?? x.depth
          });
          let S = p.recursion;
          a.recursion && (S = a.recursion), u[f] = {
            ...p,
            name: a.name ?? p.name,
            content: a.content ?? p.content,
            comment: a.name ?? p.comment,
            // 同步更新备注
            disable: g,
            strategy: y,
            position: x,
            recursion: S
          }, console.debug("[Engram] WorldInfoService: 条目已更新 (In-Place)", { uid: l, name: u[f].name });
        } else
          console.warn("[Engram] WorldInfoService: updateEntry 未找到条目", l);
        return u;
      }), !0;
    } catch (u) {
      return console.error("[Engram] WorldInfoService: 更新世界书条目失败", u), !1;
    }
  }
  /**
   * 删除指定的世界书条目
   * @param worldbookName 世界书名称
   * @param uid 条目 UID
   */
  static async deleteEntry(r, l) {
    const a = Bt();
    if (!(a != null && a.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      return await a.deleteWorldbookEntries(r, (s) => s.uid === l), console.debug("[Engram] WorldInfoService: 已删除条目", { worldbook: r, uid: l }), !0;
    } catch (s) {
      return console.error("[Engram] WorldInfoService: 删除世界书条目失败", s), !1;
    }
  }
  /**
   * 批量删除世界书条目
   * @param worldbookName 世界书名称
   * @param uids 条目 UID 数组
   */
  static async deleteEntries(r, l) {
    const a = Bt();
    if (!(a != null && a.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      const s = new Set(l);
      return await a.deleteWorldbookEntries(r, (u) => s.has(u.uid)), console.debug("[Engram] WorldInfoService: 已批量删除条目", { worldbook: r, count: l.length }), !0;
    } catch (s) {
      return console.error("[Engram] WorldInfoService: 批量删除世界书条目失败", s), !1;
    }
  }
  /**
   * 获取所有 Engram 摘要条目（按 order 排序）
   * 使用关键词筛选，用于精简模块选取待合并的条目
   * @param worldbookName 世界书名称
   */
  static async getSummaryEntries(r) {
    const a = (await this.getEntries(r)).filter((s) => s.keys.includes(ha));
    return a.sort((s, u) => s.order - u.order), a;
  }
  /**
   * 从条目名称解析楼层范围
   * @param entryName 条目名称，如 "剧情摘要_1-10"
   * @returns [startFloor, endFloor] 或 null
   */
  static parseFloorRangeFromName(r) {
    const l = r.match(/剧情摘要_(\d+)-(\d+)/);
    return l ? [parseInt(l[1], 10), parseInt(l[2], 10)] : null;
  }
  /**
   * 确保分隔条目存在
   * 8999: 总结开始 <summary>
   * 10000: 总结结束 </summary>
   */
  static async ensureSeparatorEntries(r) {
    await this.findEntryByKey(r, "总结开始") || await this.createEntry(r, {
      name: "总结开始",
      content: "<summary>",
      keys: ["总结开始"],
      constant: !0,
      order: 8999,
      enabled: !0,
      position: "before_character_definition"
    }), await this.findEntryByKey(r, "总结结束") || await this.createEntry(r, {
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
  static async getNextSummaryOrder(r) {
    const a = (await this.getEntries(r)).map((u) => u.order).filter((u) => u >= 9e3 && u < 1e4);
    return a.length === 0 ? 9e3 : Math.max(...a) + 1;
  }
  /**
   * 根据 Key 或名称查找条目
   * @param worldbookName 世界书名称
   * @param key 关键词
   */
  static async findEntryByKey(r, l) {
    const a = await this.getEntries(r);
    let s = a.find((u) => u.keys.includes(l));
    return s || (s = a.find((u) => u.name === l || l === "__ENGRAM_STATE__" && u.name === "Engram System State")), s || null;
  }
  /**
   * 获取世界书的 Token 统计
   * @param worldbookName 世界书名称
   */
  static async getWorldbookTokenStats(r) {
    const l = await this.getEntries(r), a = await Promise.all(
      l.map(async (u) => ({
        name: u.name,
        tokens: await this.countTokens(u.content)
      }))
    );
    return {
      totalTokens: a.reduce((u, f) => u + f.tokens, 0),
      entryCount: l.length,
      entries: a
    };
  }
  /**
   * 检查 WorldInfoService 是否可用
   */
  static isAvailable() {
    return Bt() !== null;
  }
  /**
   * 检查 Token 计数是否使用酒馆原生 API
   */
  static async isNativeTokenCountAvailable() {
    try {
      const r = window.SillyTavern;
      if (r != null && r.getContext) {
        const l = r.getContext();
        return typeof (l == null ? void 0 : l.getTokenCountAsync) == "function";
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
  static async getActivatedWorldInfo(r) {
    var a, s, u;
    const { Logger: l } = await Promise.resolve().then(() => ed);
    try {
      const h = await new Function("path", "return import(path)")("/scripts/world-info.js"), p = h == null ? void 0 : h.getWorldInfoPrompt, g = h == null ? void 0 : h.getSortedEntries;
      if (typeof g == "function") {
        const U = await g(), ae = [...new Set((U == null ? void 0 : U.map((R) => R.world)) || [])], fe = ((a = U == null ? void 0 : U.filter((R) => R.constant)) == null ? void 0 : a.length) || 0;
        l.info("WorldInfo", "getSortedEntries 诊断", {
          totalEntries: (U == null ? void 0 : U.length) || 0,
          worlds: ae,
          constantCount: fe,
          sampleEntry: U != null && U[0] ? {
            name: U[0].name,
            world: U[0].world,
            constant: U[0].constant
          } : null
        });
      }
      if (typeof p != "function")
        return l.warn("WorldInfo", "getWorldInfoPrompt 不可用，回退到常驻条目"), this.getConstantWorldInfo();
      let y = r;
      if (!y || y.length === 0) {
        const U = (u = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : u.call(s);
        U != null && U.chat && Array.isArray(U.chat) && (y = U.chat.map((ae) => ae.mes || "").reverse());
      }
      if (!y || y.length === 0)
        return l.warn("WorldInfo", "无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      l.debug("WorldInfo", "调用 getWorldInfoPrompt", {
        messageCount: y.length
      });
      const x = 1e6, S = h == null ? void 0 : h.checkWorldInfo;
      if (typeof S != "function")
        return l.error("WorldInfo", "checkWorldInfo 不可用"), this.getConstantWorldInfo();
      const v = await S(y, x, !0, {
        trigger: "normal"
      }), C = v == null ? void 0 : v.allActivatedEntries, j = C ? Array.from(C.values()) : [];
      l.info("WorldInfo", `扫描完成，共激活 ${j.length} 个条目`);
      const M = await this.loadFilteringState(), { disabledGlobalBooks: T, disabledEntries: I, globalWorldbooks: L, config: re } = M, le = j.filter(
        (U) => this.shouldIncludeEntry(U, L, T, I, re)
      );
      return l.info("WorldInfo", "筛选结果", {
        total: j.length,
        kept: le.length,
        filteredOut: j.length - le.length,
        keptWorlds: [...new Set(le.map((U) => U.world))]
      }), le.sort((U, ae) => (U.order || 0) - (ae.order || 0)), le.map((U) => U.content).filter(Boolean).join(`

`);
    } catch (f) {
      return l.error("WorldInfo", "获取激活世界书失败", f), this.getConstantWorldInfo();
    }
  }
  /**
   * 加载过滤所需的所有状态配置
   * @private
   */
  static async loadFilteringState() {
    var y, x, S;
    const r = Bt(), l = ((y = r == null ? void 0 : r.getGlobalWorldbookNames) == null ? void 0 : y.call(r)) || [], { SettingsManager: a } = await Promise.resolve().then(() => pg), u = (x = a.getSettings().apiSettings) == null ? void 0 : x.worldbookConfig, f = (u == null ? void 0 : u.disabledWorldbooks) || [], { WorldBookStateService: h } = await Promise.resolve().then(() => A2), p = (S = r == null ? void 0 : r.getCharWorldbookNames) == null ? void 0 : S.call(r, "current");
    let g = {};
    return p != null && p.primary && (g = (await h.loadState(p.primary)).disabledEntries || {}), {
      globalWorldbooks: l,
      disabledGlobalBooks: f,
      disabledEntries: g,
      config: u
    };
  }
  /**
   * 判断单个条目是否应该被包含
   * @private
   */
  static shouldIncludeEntry(r, l, a, s, u) {
    var f, h, p, g;
    if (((f = r.extra) == null ? void 0 : f.engram) === !0 || (h = r.world) != null && h.startsWith("[Engram]")) return !0;
    if (r.world && l.includes(r.world) && ((u == null ? void 0 : u.includeGlobal) === !1 || a.includes(r.world)))
      return !1;
    if (r.world && r.uid) {
      const y = s[r.world];
      if (y && y.includes(r.uid))
        return !1;
    }
    return !((p = r.world) != null && p.startsWith("格式") || (g = r.world) != null && g.startsWith("---"));
  }
  /**
   * 获取世界书结构（用于 UI 展示）
   * 返回所有世界书及其包含的条目摘要
   */
  static async getWorldbookStructure() {
    var f;
    const r = Bt();
    if (!r) return {};
    const l = ((f = r.getGlobalWorldbookNames) == null ? void 0 : f.call(r)) || [];
    let a = [];
    if (r.getCharWorldbookNames) {
      const h = r.getCharWorldbookNames("current");
      h && (a = [...h.additional || [], h.primary].filter(Boolean));
    }
    const s = Array.from(/* @__PURE__ */ new Set([...l, ...a])).sort(), u = {};
    for (const h of s)
      try {
        const p = await this.getEntries(h);
        u[h] = p.map((g) => {
          var y;
          return {
            uid: g.uid,
            name: g.name,
            // 传递真实名称
            keys: g.keys,
            constant: g.constant,
            // 传递常驻状态
            comment: g.comment || "",
            content: ((y = g.content) == null ? void 0 : y.substring(0, 50)) + "..."
            // 预览内容
          };
        });
      } catch (p) {
        console.warn(`[Engram] WorldInfoService: 读取世界书 ${h} 失败`, p), u[h] = [];
      }
    return u;
  }
  /**
   * 获取常驻激活的世界书条目（蓝灯）
   * 作为 getActivatedWorldInfo 的回退方案
   */
  static async getConstantWorldInfo() {
    try {
      const l = await new Function("path", "return import(path)")("/scripts/world-info.js"), a = l == null ? void 0 : l.getSortedEntries;
      if (typeof a != "function")
        return "";
      const s = await a();
      if (!s || !Array.isArray(s))
        return "";
      const u = s.filter((f) => f.constant === !0 && f.disable !== !0 && f.content);
      return u.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${u.length} 个常驻条目`), u.map((f) => f.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const E2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUMMARY_ENTRY_KEY: ha,
  WorldInfoService: Le,
  getTavernHelper: Bt
}, Symbol.toStringTag, { value: "Module" }));
async function YS() {
  const { EventBus: n } = await Promise.resolve().then(() => VS), { MessageService: r } = await Promise.resolve().then(() => GS), { WorldInfoService: l } = await Promise.resolve().then(() => E2);
  return {
    eventBus: n.isAvailable(),
    messageService: r.isAvailable(),
    worldInfoService: l.isAvailable(),
    nativeTokenCount: await l.isNativeTokenCountAvailable(),
    floorCount: r.isAvailable() ? r.getFloorCount() : null,
    characterName: r.isAvailable() ? r.getCurrentCharacterName() : null
  };
}
const XS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: el,
  MessageService: w2,
  TavernEventType: Cr,
  WorldInfoService: Le,
  checkTavernIntegration: YS
}, Symbol.toStringTag, { value: "Module" })), QS = () => {
  const [n, r] = V.useState(!1), [l, a] = V.useState(null), [s, u] = V.useState("");
  V.useEffect(() => {
    const p = el.on(
      Cr.ENGRAM_REQUEST_REVISION,
      (g) => {
        const y = g;
        a(y), u(y.content), r(!0);
      }
    );
    return () => {
      p();
    };
  }, []);
  const f = () => {
    l && (l.onConfirm(s), r(!1), a(null));
  }, h = () => {
    l && l.onCancel(), r(!1), a(null);
  };
  return n ? FS.createPortal(
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[11000] flex items-center justify-center p-4",
        style: { height: "100dvh", width: "100vw" },
        children: [
          /* @__PURE__ */ d.jsx(
            "div",
            {
              className: "absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200",
              onClick: h
            }
          ),
          /* @__PURE__ */ d.jsxs("div", { className: "relative w-full max-w-2xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-border", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium text-foreground tracking-tight", children: (l == null ? void 0 : l.title) || "内容修订" }),
                (l == null ? void 0 : l.description) && /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground", children: l.description })
              ] }),
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  onClick: h,
                  className: "p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ d.jsx(vs, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ d.jsx($b, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ d.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "请仔细检查内容的格式、关键信息和一致性。这是写入长期记忆前的最后确认。" })
              ] }),
              /* @__PURE__ */ d.jsx(
                "textarea",
                {
                  value: s,
                  onChange: (p) => u(p.target.value),
                  className: "flex-1 w-full min-h-[200px] p-4 bg-muted border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                  spellCheck: !1,
                  placeholder: "在此编辑内容..."
                }
              ),
              /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-muted-foreground text-right font-mono", children: [
                s.length,
                " 字符"
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-muted/30", children: [
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  onClick: h,
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors",
                  children: "取消"
                }
              ),
              /* @__PURE__ */ d.jsxs(
                "button",
                {
                  onClick: f,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)] hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] focus:outline-none focus:ring-2 focus:ring-primary/50",
                  children: [
                    /* @__PURE__ */ d.jsx(tg, { size: 16 }),
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
jS((n, r) => {
  const l = Wp.createRoot(n);
  return l.render(Zp.createElement(qS, { onClose: r })), l;
});
NS((n) => {
  const r = Wp.createRoot(n);
  return r.render(
    /* @__PURE__ */ d.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ d.jsx(QS, {}) })
  ), r;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Lp) : Lp();
const PS = [
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
class j2 {
  constructor(r) {
    Je(this, "rules");
    this.rules = r || PS;
  }
  /**
   * 清洗 LLM 输出文本
   * @param text 原始文本
   * @returns 清洗后的文本
   */
  clean(r) {
    let l = r;
    for (const a of this.rules)
      l = l.replace(a.pattern, a.replacement);
    return l.trim();
  }
  /**
   * 格式化为世界书条目格式
   * @param summary 总结内容
   * @param metadata 元数据
   */
  formatAsWorldEntry(r, l) {
    let s = `📜 剧情摘要 [楼层${`${l.floorRange[0]}-${l.floorRange[1]}`}]
`;
    return s += r, s;
  }
  /**
   * 提取纯文本（移除所有格式标记）
   * @param text 原始文本
   */
  extractPlainText(r) {
    return r.replace(/```[\s\S]*?```/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_~`#]/g, "").replace(/\n{2,}/g, `
`).trim();
  }
  /**
   * 截断文本到指定长度
   * @param text 文本
   * @param maxLength 最大长度
   * @param suffix 截断后缀
   */
  truncate(r, l, a = "...") {
    return r.length <= l ? r : r.slice(0, l - a.length) + a;
  }
  /**
   * 添加自定义规则
   */
  addRule(r) {
    this.rules.push(r);
  }
  /**
   * 获取当前规则列表
   */
  getRules() {
    return [...this.rules];
  }
}
const N2 = new j2();
function qp() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class T2 {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(r) {
    const l = qp();
    if (!(l != null && l.generateRaw) && !(l != null && l.generate))
      return {
        success: !1,
        content: "",
        error: "TavernHelper 不可用"
      };
    try {
      let a;
      if (l.generateRaw)
        a = await l.generateRaw({
          ordered_prompts: [
            { role: "system", content: r.systemPrompt },
            { role: "user", content: r.userPrompt }
          ]
        });
      else if (l.generate)
        a = await l.generate({
          user_input: r.userPrompt,
          system_prompt: r.systemPrompt,
          should_stream: !1,
          max_chat_history: 0
        });
      else
        throw new Error("无可用的生成 API");
      return {
        success: !0,
        content: a || ""
      };
    } catch (a) {
      const s = a instanceof Error ? a.message : String(a);
      return console.error("[Engram] LLMAdapter 调用失败:", a), {
        success: !1,
        content: "",
        error: s
      };
    }
  }
  /**
   * 检查 LLM API 是否可用
   */
  isAvailable() {
    const r = qp();
    return !!(r != null && r.generate || r != null && r.generateRaw);
  }
  /**
   * 估算文本 Token 数（简单估算）
   * @param text 文本
   */
  estimateTokens(r) {
    return Math.ceil(r.length / 3);
  }
}
const bd = new T2(), Ip = [
  { value: "input", label: "输入", description: "清洗发给 LLM 的聊天内容" },
  { value: "output", label: "输出", description: "清洗 LLM 返回的内容（预览/写入前）" },
  { value: "both", label: "两者", description: "输入和输出都应用" }
], xa = [
  {
    id: "remove-think",
    name: "移除思维链",
    pattern: "<think>[\\s\\S]*?</think>",
    replacement: "",
    enabled: !0,
    flags: "gi",
    scope: "output",
    description: "移除 LLM 输出中的 <think>...</think> 思考过程"
  },
  {
    id: "remove-headless-think",
    name: "移除无头思维链",
    pattern: "[\\s\\S]*?</think>",
    replacement: "",
    enabled: !0,
    flags: "g",
    scope: "output",
    description: "移除无开头标签的思维链，如直接以 </think> 结尾的内容"
  },
  {
    id: "remove-update-variable",
    name: "移除 UpdateVariable",
    pattern: "<UpdateVariable>[\\s\\S]*?</UpdateVariable>",
    replacement: "",
    enabled: !0,
    flags: "gi",
    scope: "output",
    description: "移除 MVU 更新变量标签，避免污染提示词"
  },
  {
    id: "remove-status-placeholder",
    name: "移除 StatusPlaceHolder",
    pattern: "<StatusPlaceHolderImpl\\s*/>",
    replacement: "",
    enabled: !0,
    flags: "gi",
    scope: "input",
    description: "移除变量脚本在消息末尾添加的占位符标签"
  }
];
class vd {
  constructor(r) {
    Je(this, "rules", []);
    this.rules = r || [...xa];
  }
  /**
   * 应用所有启用的规则处理文本
   * @param text 要处理的文本
   * @param scope 可选，只应用特定作用域的规则
   */
  process(r, l) {
    let a = r;
    for (const s of this.rules)
      if (s.enabled && !(l && s.scope !== l && s.scope !== "both"))
        try {
          const u = new RegExp(s.pattern, s.flags);
          a = a.replace(u, s.replacement);
        } catch (u) {
          console.warn(`[RegexProcessor] 规则 "${s.name}" 执行失败:`, u);
        }
    return a;
  }
  /**
   * 使用指定规则处理文本（用于预览）
   */
  processWithRule(r, l) {
    try {
      const a = new RegExp(l.pattern, l.flags);
      return r.replace(a, l.replacement);
    } catch (a) {
      return console.warn("[RegexProcessor] 规则执行失败:", a), r;
    }
  }
  /**
   * 验证正则表达式是否有效
   */
  validatePattern(r, l) {
    try {
      return new RegExp(r, l), { valid: !0 };
    } catch (a) {
      return {
        valid: !1,
        error: a instanceof Error ? a.message : "无效的正则表达式"
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
  setRules(r) {
    this.rules = [...r];
  }
  /**
   * 添加规则
   */
  addRule(r) {
    this.rules.push(r);
  }
  /**
   * 更新规则
   */
  updateRule(r, l) {
    const a = this.rules.findIndex((s) => s.id === r);
    a >= 0 && (this.rules[a] = { ...this.rules[a], ...l });
  }
  /**
   * 删除规则
   */
  deleteRule(r) {
    this.rules = this.rules.filter((l) => l.id !== r);
  }
  /**
   * 启用/禁用规则
   */
  toggleRule(r) {
    const l = this.rules.find((a) => a.id === r);
    l && (l.enabled = !l.enabled);
  }
  /**
   * 重置为默认规则
   */
  resetToDefaults() {
    this.rules = [...xa];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((r) => r.enabled).length;
  }
}
const ms = new vd(), Fp = 100;
class ZS {
  constructor() {
    Je(this, "entries", []);
    Je(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * 创建新的日志条目（发送阶段）
   */
  logSend(r) {
    const l = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, a = {
      id: l,
      timestamp: Date.now(),
      type: r.type,
      direction: "sent",
      systemPrompt: r.systemPrompt,
      userPrompt: r.userPrompt,
      tokensSent: r.tokensSent,
      model: r.model,
      character: r.character,
      floorRange: r.floorRange,
      status: "pending"
    };
    return this.entries.unshift(a), this.trimEntries(), this.notifyListeners(), l;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(r, l) {
    const a = this.entries.find((f) => f.id === r);
    if (!a) return;
    const s = {
      id: `${r}_recv`,
      timestamp: Date.now(),
      type: a.type,
      direction: "received",
      response: l.response,
      tokensReceived: l.tokensReceived,
      status: l.status,
      error: l.error,
      duration: l.duration,
      model: a.model,
      character: a.character,
      floorRange: a.floorRange
    };
    a.status = l.status, a.duration = l.duration;
    const u = this.entries.findIndex((f) => f.id === r);
    u >= 0 ? this.entries.splice(u, 0, s) : this.entries.unshift(s), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(r, l) {
    const a = this.logSend(r), s = Date.now();
    try {
      const u = await l();
      return this.logReceive(a, {
        response: typeof u == "string" ? u : JSON.stringify(u),
        status: "success",
        duration: Date.now() - s
      }), u;
    } catch (u) {
      throw this.logReceive(a, {
        status: "error",
        error: u instanceof Error ? u.message : String(u),
        duration: Date.now() - s
      }), u;
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
    const r = [], l = this.entries.filter((a) => a.direction === "sent");
    for (const a of l) {
      const s = this.entries.find(
        (u) => u.id === `${a.id}_recv` && u.direction === "received"
      );
      r.push({ sent: a, received: s });
    }
    return r;
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
  subscribe(r) {
    return this.listeners.add(r), () => this.listeners.delete(r);
  }
  /**
   * 获取日志数量
   */
  getCount() {
    return this.entries.filter((r) => r.direction === "sent").length;
  }
  /**
   * 裁剪条目
   */
  trimEntries() {
    this.entries.length > Fp * 2 && (this.entries = this.entries.slice(0, Fp * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const r of this.listeners)
      r();
  }
}
const wr = new ZS(), Ql = "__ENGRAM_STATE__", Wo = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  updatedAt: Date.now()
};
class Zr {
  /**
   * 加载状态
   */
  static async loadState(r) {
    try {
      const l = await Le.findEntryByKey(r, Ql);
      if (!l)
        return { ...Wo };
      try {
        const a = JSON.parse(l.content);
        return { ...Wo, ...a };
      } catch (a) {
        return ge.warn("WorldBookStateService", "状态条目解析失败，重置状态", a), { ...Wo };
      }
    } catch (l) {
      return ge.error("WorldBookStateService", "加载状态失败", l), { ...Wo };
    }
  }
  /**
   * 保存状态
   */
  static async saveState(r, l) {
    try {
      const s = {
        ...await this.loadState(r),
        ...l,
        updatedAt: Date.now()
      }, u = JSON.stringify(s, null, 2), h = (await Le.getEntries(r)).filter(
        (p) => p.name === "Engram System State" || p.keys.includes(Ql)
      );
      if (h.length > 0) {
        h.sort((x, S) => {
          const v = x.keys.includes(Ql) ? 1 : 0;
          return (S.keys.includes(Ql) ? 1 : 0) - v;
        });
        const [p, ...g] = h;
        if (g.length > 0) {
          ge.warn("WorldBookStateService", `发现 ${g.length} 个重复的状态条目，正在清理...`);
          for (const x of g)
            await Le.deleteEntry(r, x.uid);
        }
        ge.debug("WorldBookStateService", "更新并修复状态条目", { uid: p.uid, state: s });
        const y = {
          content: u,
          name: "Engram System State",
          enabled: !1,
          constant: !1,
          keys: [Ql],
          recursion: {
            prevent_incoming: !0,
            prevent_outgoing: !0
          },
          position: "before_character_definition",
          order: 0
        };
        return await Le.updateEntry(r, p.uid, y);
      } else {
        ge.debug("WorldBookStateService", "创建状态条目", { state: s });
        const p = {
          name: "Engram System State",
          content: u,
          keys: [Ql],
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
        return await Le.createEntry(r, p);
      }
    } catch (a) {
      return ge.error("WorldBookStateService", "保存状态失败", a), !1;
    }
  }
}
const A2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldBookStateService: Zr
}, Symbol.toStringTag, { value: "Module" }));
class KS {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(r, l, a) {
    return new Promise((s, u) => {
      el.emit(Cr.ENGRAM_REQUEST_REVISION, {
        title: r,
        description: l,
        content: a,
        onConfirm: (f) => s(f),
        onCancel: () => u(new Error("User cancelled revision"))
      });
    });
  }
}
const z2 = new KS(), _2 = {
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
}, WS = `<system_configuration>
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
`, JS = `你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。
`, ek = `你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。
`, tk = `你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。
`, hs = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], nk = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, rk = {
  maxChatHistory: 10
}, lk = {
  source: "transformers"
}, ik = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function M2(n = "默认预设") {
  const r = Date.now();
  return {
    id: `preset_${r}`,
    name: n,
    source: "tavern",
    parameters: { ...nk },
    context: { ...rk },
    isDefault: !0,
    createdAt: r,
    updatedAt: r
  };
}
function Kr(n, r, l = {}) {
  const a = Date.now();
  return {
    id: `template_${a}_${Math.random().toString(36).slice(2, 8)}`,
    name: n,
    category: r,
    enabled: l.enabled ?? !1,
    isBuiltIn: l.isBuiltIn ?? !1,
    boundPresetId: l.boundPresetId ?? null,
    systemPrompt: l.systemPrompt ?? "",
    userPromptTemplate: l.userPromptTemplate ?? "",
    outputFormat: l.outputFormat ?? "plain",
    availableVariables: l.availableVariables ?? ["{{chatHistory}}", "{{context}}", "{{char}}", "{{user}}"],
    createdAt: a,
    updatedAt: a
  };
}
function O2() {
  return [
    Kr("纯文本剧情总结", "text_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: WS,
      userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
      outputFormat: "plain"
    }),
    Kr("向量化剧情总结", "vector_summary", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: JS,
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
    Kr("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: ek,
      userPromptTemplate: `{{worldbookContext}}
以上是相关设定和剧情。

请将以下多条剧情摘要合并精简：

{{engramSummaries}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    Kr("查询增强", "query_enhance", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: tk,
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
function Sd(n) {
  return O2().find((r) => r.category === n) || null;
}
const ak = {
  enabled: !0,
  includeGlobal: !0,
  disabledWorldbooks: []
}, ok = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  countLimit: 5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
};
function Vp() {
  return {
    llmPresets: [M2()],
    selectedPresetId: null,
    vectorConfig: { ...lk },
    rerankConfig: { ...ik },
    promptTemplates: O2(),
    worldbookConfig: { ...ak }
  };
}
const Pl = "engram", sk = "engram总结";
function $p() {
  var n, r;
  try {
    return ((r = (n = window.SillyTavern) == null ? void 0 : n.getContext) == null ? void 0 : r.call(n)) || null;
  } catch {
    return null;
  }
}
function Gp() {
  var n, r;
  try {
    const l = (r = (n = window.SillyTavern) == null ? void 0 : n.getContext) == null ? void 0 : r.call(n);
    return l != null && l.chat_metadata ? l.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function uk() {
  var n;
  try {
    (n = window.saveChatDebounced) == null || n.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class D2 {
  constructor(r, l, a) {
    Je(this, "config");
    Je(this, "textProcessor");
    Je(this, "llmAdapter");
    Je(this, "currentChatId", null);
    Je(this, "isRunning", !1);
    Je(this, "isSummarizing", !1);
    Je(this, "unsubscribeMessage", null);
    Je(this, "unsubscribeChat", null);
    Je(this, "summaryHistory", []);
    // 缓存最后总结的楼层，用于同步读取
    Je(this, "_lastSummarizedFloor", 0);
    const s = Ee.get("summarizerConfig");
    this.config = { ..._2, ...s, ...r }, this.textProcessor = l || N2, this.llmAdapter = a || bd;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(r) {
    const l = Gp();
    if (l)
      return l.extensions || (l.extensions = {}), l.extensions[Pl] || (l.extensions[Pl] = {}), l.extensions[Pl][r];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(r, l) {
    const a = Gp();
    a && (a.extensions || (a.extensions = {}), a.extensions[Pl] || (a.extensions[Pl] = {}), a.extensions[Pl][r] = l, this.log("debug", `已保存到 chat_metadata: ${r} = ${l}`), uk());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const r = Le.findExistingWorldbook();
    if (!r) return this._lastSummarizedFloor;
    const l = await Zr.loadState(r);
    return this._lastSummarizedFloor = l.lastSummarizedFloor, this._lastSummarizedFloor;
  }
  /**
   * 设置上次总结的楼层
   * 同时更新内存和持久化存储
   */
  async setLastSummarizedFloor(r) {
    this._lastSummarizedFloor = r;
    const l = Le.findExistingWorldbook();
    if (!l) {
      this.log("debug", "世界书未创建，跳过保存进度", { floor: r });
      return;
    }
    await Zr.saveState(l, {
      lastSummarizedFloor: r
    });
  }
  /**
  
      // ==================== 楼层计算 ====================
  
      /**
       * 获取当前真实楼层数
       */
  getCurrentFloor() {
    const r = $p();
    return r != null && r.chat ? r.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const r = $p();
    return (r == null ? void 0 : r.chatId) || null;
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
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = el.on(
      Cr.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${Cr.MESSAGE_RECEIVED}`)), this.unsubscribeChat = el.on(
      Cr.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${Cr.CHAT_CHANGED}`), this.isRunning = !0;
    const r = this.getStatus();
    this.log("info", "服务已启动", r);
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
    const r = this.getCurrentChatId(), l = this.getCurrentFloor();
    this.currentChatId = r, this.summaryHistory = [], this._lastSummarizedFloor = 0;
    const a = await this.getLastSummarizedFloor();
    this.log("info", "初始化当前聊天状态", {
      chatId: r,
      currentFloor: l,
      lastSummarizedFloor: a,
      pendingFloors: l - a
    });
  }
  // ==================== 事件处理 ====================
  /**
   * 处理消息接收事件
   */
  async handleMessageReceived() {
    const r = this.getCurrentFloor(), l = await this.getLastSummarizedFloor(), a = r - l;
    this.log("debug", "收到新消息", {
      currentFloor: r,
      lastSummarized: l,
      pendingFloors: a,
      triggerAt: this.config.floorInterval
    }), a >= this.config.floorInterval && (this.log("info", "达到触发条件，准备总结", {
      pendingFloors: a,
      interval: this.config.floorInterval
    }), await this.triggerSummary());
  }
  /**
   * 处理聊天切换事件
   */
  handleChatChanged() {
    const r = this.getCurrentChatId();
    this.log("info", "聊天已切换", {
      from: this.currentChatId,
      to: r
    }), this.initializeForCurrentChat();
  }
  // ==================== 总结逻辑 ====================
  /**
   * 手动/自动触发总结
   */
  async triggerSummary(r = !1) {
    var s, u;
    if (this.isSummarizing)
      return this.log("warn", "正在执行总结，跳过本次触发"), null;
    if (!this.config.enabled && !r)
      return this.log("debug", "自动总结已禁用"), null;
    const l = this.getCurrentFloor(), a = await this.getLastSummarizedFloor();
    this.isSummarizing = !0, this.log("info", "开始执行总结", {
      floorRange: [a + 1, l],
      manual: r
    });
    try {
      const f = this._lastSummarizedFloor + 1, h = this.config.bufferSize || 0, p = l - h;
      if (f > p)
        return r && St.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const g = this.config.floorInterval || 10, y = f + g - 1, x = Math.min(p, y);
      if (f > x)
        return null;
      const S = [f, x];
      this.log("info", "准备总结", { startFloor: f, endFloor: x, currentFloor: l, buffer: h });
      const C = kS().slice(f - 1, x);
      if (this.log("info", "提取消息范围", {
        range: S,
        msgCount: C.length,
        firstMsg: (((s = C[0]) == null ? void 0 : s.mes) || "").substring(0, 20)
      }), C.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: S }), null;
      const j = {
        messages: C.map((Y) => {
          const se = Y.mes || Y.content || Y.message || "";
          return se || console.warn("[Engram] Message content is empty/undefined:", Y), {
            role: Y.is_user ? "user" : "assistant",
            content: se,
            name: Y.name
          };
        }),
        floorRange: S,
        templateId: this.config.promptTemplateId || void 0
      }, M = C.map((Y) => Y.mes || Y.content || Y.message || "").join(`

`), T = ms.process(M, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: M.length,
        cleanedLength: T.length
      });
      let I = "";
      try {
        const Y = await Le.getActivatedWorldInfo();
        Y && (I = `【背景设定】
` + Y + `

`, this.log("debug", "已加载世界书内容", { length: Y.length }));
      } catch (Y) {
        this.log("warn", "获取世界书失败", { error: String(Y) });
      }
      const L = Ee.getEnabledPromptTemplate("text_summary"), re = Sd("text_summary"), le = (L == null ? void 0 : L.systemPrompt) || (re == null ? void 0 : re.systemPrompt) || "", _ = (L == null ? void 0 : L.userPromptTemplate) || (re == null ? void 0 : re.userPromptTemplate) || "";
      let U = "";
      try {
        U = await Le.getEngramSummariesContent(), U && this.log("debug", "已加载 Engram 摘要", { length: U.length });
      } catch (Y) {
        this.log("warn", "获取 Engram 摘要失败", { error: String(Y) });
      }
      const ae = _.replace("{{worldbookContext}}", I).replace("{{chatHistory}}", T).replace("{{context}}", I).replace("{{engramSummaries}}", U);
      this.log("debug", "使用提示词模板", {
        source: L ? "APIPresets" : "fallback",
        templateName: (L == null ? void 0 : L.name) || "default"
      });
      const fe = wr.logSend({
        type: "summarize",
        systemPrompt: le,
        userPrompt: ae,
        floorRange: j.floorRange,
        model: k2(),
        character: (u = S2()) == null ? void 0 : u.name
      }), R = Date.now(), O = await this.llmAdapter.generate({
        systemPrompt: le,
        userPrompt: ae
      });
      if (wr.logReceive(fe, {
        response: O.content,
        status: O.success ? "success" : "error",
        error: O.error,
        duration: Date.now() - R
      }), !O.success)
        return this.log("error", "LLM 调用失败", { error: O.error }), St.error(`总结失败: ${O.error}`, "Engram 错误"), null;
      const J = this.textProcessor.clean(O.content), ue = ms.process(J, "output"), ie = await Le.countTokens(ue), ee = {
        id: Date.now().toString(),
        content: ue,
        sourceFloors: j.floorRange,
        timestamp: Date.now(),
        tokenCount: ie,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: ee });
        try {
          const Y = await z2.requestRevision(
            "剧情摘要修订",
            `范围: ${j.floorRange[0]} - ${j.floorRange[1]} 楼 | Token: ${ie}`,
            ee.content
          );
          ee.content = Y, ee.tokenCount = await Le.countTokens(Y), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), St.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const B = await this.writeToWorldbook(ee);
      if (ee.writtenToWorldbook = B, await this.setLastSummarizedFloor(j.floorRange[1]), this.summaryHistory.push(ee), St.success(`已总结 ${j.floorRange[0]}-${j.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const Y = j.floorRange[0] - 1, se = j.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: Y, endIndex: se }), zS(Y, se).catch((he) => {
          this.log("error", "自动隐藏失败", he);
        });
      }
      return ee;
    } catch (f) {
      const h = f instanceof Error ? f.message : String(f);
      return this.log("error", "总结执行异常", { error: h }), St.error(`总结异常: ${h}`, "Engram 错误"), null;
    } finally {
      this.isSummarizing = !1;
    }
  }
  /**
   * 写入世界书
   */
  async writeToWorldbook(r) {
    try {
      const l = await Le.getChatWorldbook();
      if (!l)
        return this.log("warn", "无法获取聊天世界书"), !1;
      await Le.ensureSeparatorEntries(l);
      const a = await Le.getNextSummaryOrder(l), s = `{{// ${JSON.stringify({
        floors: r.sourceFloors,
        tokens: r.tokenCount,
        timestamp: r.timestamp
      })} }}`, u = `${r.content}

${s}`, f = await Le.createEntry(l, {
        name: `剧情摘要_${r.sourceFloors[0]}-${r.sourceFloors[1]}`,
        content: u,
        keys: [sk],
        // 添加关键词用于筛选
        enabled: !0,
        // 开启状态，让摘要能被激活进入上下文
        constant: !0,
        order: a
        // 使用计算出的递增顺序
      });
      if (f) {
        this.log("success", "已写入世界书", { worldbook: l, order: a });
        const h = await Zr.loadState(l);
        await Zr.saveState(l, {
          totalSummaries: h.totalSummaries + 1
        });
      }
      return f;
    } catch (l) {
      return this.log("error", "写入世界书失败", { error: String(l) }), !1;
    }
  }
  // ==================== 状态查询 ====================
  /**
   * 获取当前状态
   */
  getStatus() {
    const r = this.getCurrentFloor(), l = this._lastSummarizedFloor;
    return {
      running: this.isRunning,
      currentFloor: r,
      lastSummarizedFloor: l,
      pendingFloors: Math.max(0, r - l),
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
  updateConfig(r) {
    this.config = { ...this.config, ...r }, Ee.set("summarizerConfig", this.config), this.log("debug", "配置已更新并保存", this.config);
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
    const r = this.getCurrentFloor();
    await this.setLastSummarizedFloor(r), this.log("info", "已重置基准楼层", { currentFloor: r });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  async log(r, l, a) {
    try {
      const { Logger: s } = await Promise.resolve().then(() => ed);
      s[r]("Summarizer", l, a);
    } catch {
      console.log(`[Summarizer] ${r}: ${l}`, a);
    }
  }
}
const R2 = new D2(), ps = {
  ...ok,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
};
class L2 {
  constructor(r, l) {
    Je(this, "config");
    Je(this, "llmAdapter");
    Je(this, "isTrimming", !1);
    const a = Ee.get("trimmerConfig") || {};
    this.config = { ...ps, ...a, ...r }, this.llmAdapter = l || bd;
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
  updateConfig(r) {
    this.config = { ...this.config, ...r };
    const l = Ee.get("summarizerConfig") || {};
    Ee.set("summarizerConfig", {
      ...l,
      trimmer: this.config
    }), this.log("debug", "配置已更新", this.config);
  }
  // ==================== 状态检查 ====================
  /**
   * 获取当前状态
   */
  async getStatus() {
    const r = Le.findExistingWorldbook();
    if (!r)
      return {
        triggered: !1,
        triggerType: this.config.trigger,
        currentValue: 0,
        threshold: this.getThreshold(),
        pendingEntryCount: 0,
        isTrimming: this.isTrimming
      };
    const l = await Le.getSummaryEntries(r), a = Math.max(0, l.length - this.config.keepRecentCount), s = await this.getCurrentTriggerValue(r, l), u = this.getThreshold();
    return {
      triggered: this.config.enabled && s >= u,
      triggerType: this.config.trigger,
      currentValue: s,
      threshold: u,
      pendingEntryCount: a,
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
  async getCurrentTriggerValue(r, l) {
    switch (this.config.trigger) {
      case "token":
        return await Le.countSummaryTokens(r);
      case "count":
        return l.length;
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
    const r = Le.findExistingWorldbook();
    if (!r) return [];
    const l = await Le.getSummaryEntries(r), a = this.config.keepRecentCount;
    return l.length <= a ? [] : l.slice(0, l.length - a);
  }
  /**
   * 手动/自动触发精简
   */
  async triggerTrim(r = !1) {
    var s;
    if (this.isTrimming)
      return this.log("warn", "正在执行精简，跳过本次触发"), null;
    if (!this.config.enabled && !r)
      return this.log("debug", "精简功能已禁用"), null;
    const l = Le.findExistingWorldbook();
    if (!l)
      return this.log("warn", "世界书未找到"), St.warning("未找到 Engram 世界书", "Engram"), null;
    const a = await this.getEntriesToMerge();
    if (a.length < 2)
      return r && St.info("待合并的条目不足 (需要至少 2 条)", "Engram"), null;
    this.isTrimming = !0, this.log("info", "开始执行精简", {
      entryCount: a.length,
      manual: r
    });
    try {
      const u = a.map((U) => Le.parseFloorRangeFromName(U.name)).filter((U) => U !== null);
      if (u.length === 0)
        return this.log("error", "无法解析楼层范围"), null;
      const f = Math.min(...u.map((U) => U[0])), h = Math.max(...u.map((U) => U[1])), p = [f, h], g = a.map((U) => {
        const ae = Le.parseFloorRangeFromName(U.name), fe = ae ? `【${ae[0]}-${ae[1]}楼】` : `【${U.name}】`, R = U.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
        return `${fe}
${R}`;
      }).join(`

---

`), y = Ee.getEnabledPromptTemplate("trim"), x = Sd("trim"), S = (y == null ? void 0 : y.systemPrompt) || (x == null ? void 0 : x.systemPrompt) || "", C = ((y == null ? void 0 : y.userPromptTemplate) || (x == null ? void 0 : x.userPromptTemplate) || "").replace("{{engramSummaries}}", g).replace("{{context}}", g);
      this.log("debug", "使用提示词模板", {
        source: y ? "APIPresets" : "fallback",
        templateName: (y == null ? void 0 : y.name) || "default",
        inputLength: g.length
      });
      const j = wr.logSend({
        type: "trim",
        systemPrompt: S,
        userPrompt: C,
        floorRange: p,
        model: k2(),
        character: (s = S2()) == null ? void 0 : s.name
      }), M = Date.now(), T = await this.llmAdapter.generate({
        systemPrompt: S,
        userPrompt: C
      });
      if (wr.logReceive(j, {
        response: T.content,
        status: T.success ? "success" : "error",
        error: T.error,
        duration: Date.now() - M
      }), !T.success)
        return this.log("error", "LLM 调用失败", { error: T.error }), St.error(`精简失败: ${T.error}`, "Engram 错误"), null;
      const I = ms.process(T.content, "output"), L = await Le.countTokens(I), re = Math.min(...a.map((U) => U.order)), le = {
        content: I,
        tokenCount: L,
        sourceEntryIds: a.map((U) => U.uid),
        newFloorRange: p,
        newOrder: re
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: le });
        try {
          const U = await z2.requestRevision(
            "精简摘要修订",
            `合并 ${a.length} 条 | 范围: ${p[0]}-${p[1]} 楼 | Token: ${L}`,
            le.content
          );
          le.content = U, le.tokenCount = await Le.countTokens(U), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了精简写入"), St.info("已取消精简操作", "操作取消"), null;
        }
      }
      return await this.writeCompactedEntry(l, le) ? (await this.removeOriginalEntries(l, le.sourceEntryIds), St.success(
        `已精简 ${a.length} 条摘要为 1 条 (${p[0]}-${p[1]} 楼)`,
        "Engram"
      ), le) : (this.log("error", "写入精简条目失败"), null);
    } catch (u) {
      const f = u instanceof Error ? u.message : String(u);
      return this.log("error", "精简执行异常", { error: f }), St.error(`精简异常: ${f}`, "Engram 错误"), null;
    } finally {
      this.isTrimming = !1;
    }
  }
  /**
   * 写入精简后的条目
   */
  async writeCompactedEntry(r, l) {
    try {
      const a = `{{// ${JSON.stringify({
        floors: l.newFloorRange,
        tokens: l.tokenCount,
        timestamp: Date.now(),
        layer: 2,
        // 标记为二层精简
        mergedFrom: l.sourceEntryIds.length
      })} }}`, s = `${l.content}

${a}`, u = await Le.createEntry(r, {
        name: `剧情摘要_${l.newFloorRange[0]}-${l.newFloorRange[1]}`,
        content: s,
        keys: [ha],
        // 添加关键词用于筛选
        enabled: !0,
        constant: !0,
        order: l.newOrder
      });
      return u && this.log("success", "已写入精简条目", {
        worldbook: r,
        floorRange: l.newFloorRange,
        order: l.newOrder
      }), u;
    } catch (a) {
      return this.log("error", "写入精简条目失败", { error: String(a) }), !1;
    }
  }
  /**
   * 删除/禁用原始条目
   */
  async removeOriginalEntries(r, l) {
    if (this.config.preserveOriginal) {
      for (const a of l)
        await Le.updateEntry(r, a, { enabled: !1 });
      this.log("info", "已禁用原始条目", { count: l.length });
    } else
      await Le.deleteEntries(r, l) && this.log("info", "已删除原始条目", { count: l.length });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  log(r, l, a) {
    ge[r]("Trimmer", l, a);
  }
}
const ck = new L2(), Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: xa,
  DEFAULT_SUMMARIZER_CONFIG: _2,
  DEFAULT_TRIMMER_CONFIG: ps,
  LLMAdapter: T2,
  RegexProcessor: vd,
  SummarizerService: D2,
  TextProcessor: j2,
  TrimmerService: L2,
  llmAdapter: bd,
  regexProcessor: ms,
  summarizerService: R2,
  textProcessor: N2,
  trimmerService: ck
}, Symbol.toStringTag, { value: "Module" }));
class U2 {
  static init() {
    var r;
    if (!this.isInitialized)
      try {
        const l = Jr();
        l != null && l.eventSource && ((r = l == null ? void 0 : l.event_types) != null && r.CHARACTER_DELETED) ? (l.eventSource.on(l.event_types.CHARACTER_DELETED, this.onCharacterDeleted.bind(this)), ge.info("CharacterDeleteService", "监听 CHARACTER_DELETED 事件成功"), this.isInitialized = !0) : ge.warn("CharacterDeleteService", "无法监听 CHARACTER_DELETED 事件: eventSource 或事件类型缺失");
      } catch (l) {
        ge.error("CharacterDeleteService", "初始化失败", l);
      }
  }
  static async onCharacterDeleted(r) {
    var x, S;
    const l = Ee.getSettings().linkedDeletion;
    if (!(l != null && l.enabled)) return;
    ge.debug("CharacterDeleteService", "检测到角色删除", r);
    const a = r.character, s = (a == null ? void 0 : a.name) || (a == null ? void 0 : a.avatar) || (a == null ? void 0 : a.ch_name) || ((x = a == null ? void 0 : a.data) == null ? void 0 : x.name);
    if (!s) {
      ge.warn("CharacterDeleteService", "无法获取已删除角色的名称");
      return;
    }
    const u = /* @__PURE__ */ new Set();
    u.add(`[Engram] ${s}`), u.add(`Engram_${s}`);
    const f = a.data || a, h = (S = f == null ? void 0 : f.extensions) == null ? void 0 : S.world;
    h && typeof h == "string" && (ge.debug("CharacterDeleteService", `从角色数据中发现绑定世界书: ${h}`), u.add(h));
    const p = await Le.getWorldbookNames(), g = new Set(p), y = Array.from(u).filter((v) => {
      if (!g.has(v)) return !1;
      const C = v.toLowerCase().includes("engram");
      return C || ge.info("CharacterDeleteService", `跳过非 Engram 世界书: ${v}`), C;
    });
    if (y.length === 0) {
      ge.debug("CharacterDeleteService", `未找到角色 "${s}" 关联的 Engram 世界书`);
      return;
    }
    if (ge.info("CharacterDeleteService", `准备删除关联世界书: ${y.join(", ")}`), l.showConfirmation) {
      const v = `
                <div style="font-size: 0.9em;">
                    <h3>🧹 Engram 联动清理</h3>
                    <p>检测到角色 <b>${s}</b> 已被删除。</p>
                    <p>发现以下关联的 Engram 记忆库：</p>
                    <ul style="max-height: 100px; overflow-y: auto; background: var(--black50a); padding: 5px; border-radius: 4px; list-style: none; margin: 10px 0;">
                        ${y.map((j) => `<li style="padding: 2px 0;">• ${j}</li>`).join("")}
                    </ul>
                    <p>是否一并删除？</p>
                    <small style="opacity: 0.7;">这将永久删除这些记忆库及其包含的所有摘要。</small>
                </div>
            `;
      if (!await _S(v, "confirm")) {
        ge.info("CharacterDeleteService", "用户取消删除关联世界书");
        return;
      }
    }
    if (l.deleteWorldbook) {
      let v = 0;
      const C = [];
      St.info("正在清理 Engram 记忆库...", "Engram");
      for (const j of y)
        try {
          await Le.deleteWorldbook(j) ? (v++, ge.info("CharacterDeleteService", `已删除世界书: ${j}`)) : C.push(j);
        } catch (M) {
          ge.error("CharacterDeleteService", `删除世界书 ${j} 失败`, M), C.push(j);
        }
      v > 0 && St.success(`已清理 ${v} 个关联记忆库`, "Engram"), C.length > 0 && St.warning(`部分记忆库删除失败: ${C.join(", ")}`, "Engram");
    }
    l.deleteIndexedDB;
  }
}
Je(U2, "isInitialized", !1);
const fk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CharacterDeleteService: U2
}, Symbol.toStringTag, { value: "Module" })), Ns = ({ title: n, subtitle: r, actions: l }) => /* @__PURE__ */ d.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ d.jsxs("div", { children: [
    /* @__PURE__ */ d.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: n }),
    r && /* @__PURE__ */ d.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: r })
  ] }),
  l && /* @__PURE__ */ d.jsx("div", { className: "flex gap-2", children: l })
] }), Yp = ({
  icon: n,
  label: r,
  primary: l = !1,
  size: a = "md",
  className: s = "",
  ...u
}) => /* @__PURE__ */ d.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${a === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${l ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${s}
        `,
    ...u,
    children: [
      n && /* @__PURE__ */ d.jsx(n, { size: a === "sm" ? 14 : 16 }),
      r
    ]
  }
), dk = () => {
  const [n] = V.useState([
    { id: "1", x: 250, y: 150, label: "User Input", type: "input" },
    { id: "2", x: 250, y: 300, label: "Memory Retriever", type: "process" },
    { id: "3", x: 100, y: 450, label: "Summary Agent", type: "output" },
    { id: "4", x: 400, y: 450, label: "Context Builder", type: "output" }
  ]), r = [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "2", target: "4" }
  ];
  return /* @__PURE__ */ d.jsxs("div", { className: "h-full flex flex-col relative bg-card rounded-xl overflow-hidden border border-border shadow-inner group", children: [
    /* @__PURE__ */ d.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.15] pointer-events-none",
        style: {
          backgroundImage: "radial-gradient(#555 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
      /* @__PURE__ */ d.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ d.jsx(Qf, { size: 16 }) }),
      /* @__PURE__ */ d.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ d.jsx(cb, { size: 16 }) }),
      /* @__PURE__ */ d.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ d.jsx(sg, { size: 16 }) })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ d.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ d.jsx("defs", { children: /* @__PURE__ */ d.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ d.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      r.map((l, a) => {
        const s = n.find((x) => x.id === l.source), u = n.find((x) => x.id === l.target);
        if (!s || !u) return null;
        const f = s.x + 150 / 2, h = s.y + 60, p = u.x + 150 / 2, g = u.y, y = `M ${f} ${h} C ${f} ${h + 50}, ${p} ${g - 50}, ${p} ${g}`;
        return /* @__PURE__ */ d.jsx("g", { children: /* @__PURE__ */ d.jsx("path", { d: y, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, a);
      })
    ] }),
    n.map((l) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: "absolute w-[150px] group/node cursor-grab active:cursor-grabbing",
        style: { left: l.x, top: l.y },
        children: [
          l.type !== "input" && /* @__PURE__ */ d.jsx("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          l.type !== "output" && /* @__PURE__ */ d.jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          /* @__PURE__ */ d.jsxs("div", { className: `
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${l.type === "input" ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-border group-hover/node:border-border shadow-lg"}
                    `, children: [
            /* @__PURE__ */ d.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold", children: l.type }),
            /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-foreground font-medium flex items-center gap-2", children: [
              l.type === "input" && /* @__PURE__ */ d.jsx(ri, { size: 12, className: "text-blue-400" }),
              l.type === "process" && /* @__PURE__ */ d.jsx(Gf, { size: 12, className: "text-purple-400" }),
              l.type === "output" && /* @__PURE__ */ d.jsx(ys, { size: 12, className: "text-emerald-400" }),
              l.label
            ] })
          ] })
        ]
      },
      l.id
    ))
  ] });
}, mk = () => /* @__PURE__ */ d.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ d.jsx(
    Ns,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ d.jsx(Yp, { icon: Xf, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ d.jsx(Yp, { icon: sg, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ d.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ d.jsx(dk, {}) })
] }), hk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GraphView: mk
}, Symbol.toStringTag, { value: "Module" }));
function pk(n) {
  return new Date(n).toTimeString().slice(0, 8);
}
const gk = {
  [Ze.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Ze.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Ze.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Ze.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Ze.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, xk = ({ entry: n }) => {
  const [r, l] = V.useState(!1), a = n.data !== void 0, s = as[n.level], u = gk[n.level];
  return /* @__PURE__ */ d.jsxs("div", { className: "group", children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `
                    flex items-start gap-3 px-2 py-1 rounded-sm transition-colors
                    hover:bg-white/[0.02]
                    ${a ? "cursor-pointer" : ""}
                `,
        onClick: () => a && l(!r),
        children: [
          /* @__PURE__ */ d.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: a ? r ? /* @__PURE__ */ d.jsx(ei, { size: 12 }) : /* @__PURE__ */ d.jsx(Vf, { size: 12 }) : null }),
          /* @__PURE__ */ d.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: pk(n.timestamp) }),
          /* @__PURE__ */ d.jsx("span", { className: `
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${u.text} ${u.bg}
                `, children: s.label }),
          /* @__PURE__ */ d.jsx("span", { className: "text-zinc-500 shrink-0 text-[11px]", children: n.module }),
          /* @__PURE__ */ d.jsx("span", { className: "text-zinc-300 text-[11px] break-words flex-1 leading-relaxed", children: n.message })
        ]
      }
    ),
    r && a && /* @__PURE__ */ d.jsx("div", { className: "ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]", children: /* @__PURE__ */ d.jsx("pre", { className: "m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono", children: JSON.stringify(n.data, null, 2) }) })
  ] });
}, yk = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  trim: { label: "修剪", color: "bg-yellow-500/20 text-yellow-500" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, bk = ({ status: n }) => {
  switch (n) {
    case "pending":
      return /* @__PURE__ */ d.jsx(ba, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ d.jsx($f, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ d.jsx(xs, { size: 14, className: "text-red-400" });
  }
}, vk = (n) => new Date(n).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), Sk = (n) => n === void 0 ? "-" : n < 1e3 ? `${n}ms` : `${(n / 1e3).toFixed(1)}s`, kk = ({ sent: n, received: r }) => {
  const [l, a] = V.useState(!1), s = yk[n.type];
  return /* @__PURE__ */ d.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => a(!l),
        children: [
          l ? /* @__PURE__ */ d.jsx(ei, { size: 14 }) : /* @__PURE__ */ d.jsx(Vf, { size: 14 }),
          /* @__PURE__ */ d.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${s.color}`, children: s.label }),
          n.model && /* @__PURE__ */ d.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 truncate max-w-[100px]", title: `模型: ${n.model}`, children: n.model }),
          n.character && /* @__PURE__ */ d.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 truncate max-w-[80px]", title: `角色: ${n.character}`, children: n.character }),
          /* @__PURE__ */ d.jsx("span", { className: "text-xs text-muted-foreground", children: vk(n.timestamp) }),
          /* @__PURE__ */ d.jsx(bk, { status: (r == null ? void 0 : r.status) || n.status }),
          n.floorRange && /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            n.floorRange[0],
            "-",
            n.floorRange[1]
          ] }),
          /* @__PURE__ */ d.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ d.jsx(By, { size: 12 }),
            Sk((r == null ? void 0 : r.duration) || n.duration)
          ] })
        ]
      }
    ),
    l && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ d.jsx(Rb, { size: 14 }),
          "发送",
          n.tokensSent && /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            n.tokensSent,
            " tokens"
          ] })
        ] }),
        n.systemPrompt && /* @__PURE__ */ d.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ d.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: n.systemPrompt })
        ] }),
        n.userPrompt && /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ d.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: n.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ d.jsx(eg, { size: 14 }),
          "接收",
          (r == null ? void 0 : r.tokensReceived) && /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            r.tokensReceived,
            " tokens"
          ] })
        ] }),
        (r == null ? void 0 : r.status) === "error" && r.error && /* @__PURE__ */ d.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: r.error }),
        (r == null ? void 0 : r.response) && /* @__PURE__ */ d.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: r.response }),
        !r && n.status === "pending" && /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ d.jsx(ba, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, Ck = () => {
  const [n, r] = V.useState(wr.getPaired());
  return V.useEffect(() => wr.subscribe(() => {
    r(wr.getPaired());
  }), []), /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ d.jsx(Kf, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ d.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          n.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => wr.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ d.jsx(li, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: n.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ d.jsx(eg, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-3", children: n.map(({ sent: l, received: a }) => /* @__PURE__ */ d.jsx(kk, { sent: l, received: a }, l.id)) }) })
  ] });
}, gs = ({ tabs: n, activeTab: r, onChange: l, sticky: a = !0, top: s = 0, className: u = "", actions: f }) => /* @__PURE__ */ d.jsxs(
  "div",
  {
    className: `
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${a ? "sticky z-20 pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 backdrop-blur bg-background/80" : "px-0"}
            ${u}
        `,
    style: a ? {
      top: s
    } : void 0,
    children: [
      /* @__PURE__ */ d.jsx("div", { className: "flex overflow-x-auto gap-2 pb-1 no-scrollbar", children: n.map((h) => /* @__PURE__ */ d.jsxs(
        "button",
        {
          onClick: () => l(h.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${r === h.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            h.icon && /* @__PURE__ */ d.jsx("span", { className: "w-4 h-4", children: h.icon }),
            h.label,
            r === h.id && /* @__PURE__ */ d.jsx("div", { className: "absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)] z-10 transition-all duration-300" })
          ]
        },
        h.id
      )) }),
      f && /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-2 pb-1 shrink-0", children: f })
    ]
  }
), wk = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ d.jsx(ri, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ d.jsx(Kf, { size: 14 }) }
], Ek = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], jk = ({ initialTab: n }) => {
  const [r, l] = V.useState(n || "runtime"), [a, s] = V.useState([]), [u, f] = V.useState([]), [h, p] = V.useState(""), [g, y] = V.useState(-1), [x, S] = V.useState("ALL"), [v, C] = V.useState(!0), [j, M] = V.useState(!1), [T, I] = V.useState(!1), L = V.useRef(null);
  V.useEffect(() => {
    s(ge.getLogs());
    const _ = ge.subscribe((U) => {
      s((ae) => [...ae, U]);
    });
    return () => _();
  }, []), V.useEffect(() => {
    let _ = a;
    if (g !== -1 && (_ = _.filter((U) => U.level >= g)), x !== "ALL" && (_ = _.filter((U) => U.module.startsWith(x))), h.trim()) {
      const U = h.toLowerCase();
      _ = _.filter(
        (ae) => ae.message.toLowerCase().includes(U) || ae.module.toLowerCase().includes(U)
      );
    }
    f(_);
  }, [a, g, x, h]), V.useEffect(() => {
    v && L.current && L.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [u, v]);
  const re = V.useCallback(async () => {
    await ge.clear(), s([]);
  }, []), le = V.useCallback(() => {
    const _ = ge.exportToMarkdown(), U = ge.getExportFilename(), ae = new Blob([_], { type: "text/markdown" }), fe = URL.createObjectURL(ae), R = document.createElement("a");
    R.href = fe, R.download = U, R.click(), URL.revokeObjectURL(fe), ge.success("DevLog", `日志已导出: ${U}`);
  }, []);
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ d.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ d.jsx(
      gs,
      {
        tabs: wk,
        activeTab: r,
        onChange: (_) => l(_),
        sticky: !0
      }
    ),
    r === "runtime" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col flex-1 min-h-0", children: [
      /* @__PURE__ */ d.jsx("div", { className: "sticky top-[52px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border", children: /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ d.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => M(!j),
              children: [
                g === -1 ? "全部级别" : as[g].label,
                /* @__PURE__ */ d.jsx(ei, { size: 12 })
              ]
            }
          ),
          j && /* @__PURE__ */ d.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col", children: [
            /* @__PURE__ */ d.jsx(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  y(-1), M(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(as).map(([_, U]) => /* @__PURE__ */ d.jsxs(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  y(Number(_)), M(!1);
                },
                children: [
                  U.icon,
                  " ",
                  U.label
                ]
              },
              _
            ))
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ d.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => I(!T),
              children: [
                x,
                /* @__PURE__ */ d.jsx(ei, { size: 12 })
              ]
            }
          ),
          T && /* @__PURE__ */ d.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col", children: Ek.map((_) => /* @__PURE__ */ d.jsx(
            "button",
            {
              className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                S(_), I(!1);
              },
              children: _
            },
            _
          )) })
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ d.jsx(Wl, { size: 12 }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: h,
              onChange: (_) => p(_.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${v ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => C(!v),
              title: "自动滚动",
              children: /* @__PURE__ */ d.jsx(xy, { size: 14 })
            }
          ),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: re,
              title: "清空",
              children: /* @__PURE__ */ d.jsx(li, { size: 14 })
            }
          ),
          /* @__PURE__ */ d.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: le,
              children: [
                /* @__PURE__ */ d.jsx(is, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ d.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: u.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ d.jsx(ri, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        u.map((_) => /* @__PURE__ */ d.jsx(xk, { entry: _ }, _.id)),
        /* @__PURE__ */ d.jsx("div", { ref: L })
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        a.length,
        " 条日志",
        u.length !== a.length && ` · ${u.length} 条匹配`
      ] })
    ] }),
    r === "model" && /* @__PURE__ */ d.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ d.jsx(Ck, {}) })
  ] });
}, Nk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DevLog: jk
}, Symbol.toStringTag, { value: "Module" })), Tk = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, Ak = ({
  icon: n,
  title: r,
  subtitle: l,
  meta: a,
  badges: s = [],
  selected: u = !1,
  disabled: f = !1,
  toggle: h,
  onClick: p,
  actions: g = [],
  className: y = "",
  compact: x = !1
}) => {
  const S = g.filter((C) => !C.hidden), v = !!h;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${x ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${u ? "bg-accent/60" : "hover:bg-muted/40"}
                ${f ? "opacity-50 pointer-events-none" : ""}
                ${y}
            `,
      onClick: p,
      children: [
        (n || v) && /* @__PURE__ */ d.jsx("div", { className: "flex-shrink-0", children: v ? /* @__PURE__ */ d.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${h.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (C) => {
              C.stopPropagation(), h.onChange(!h.checked);
            },
            children: /* @__PURE__ */ d.jsx(Pf, { size: 14 })
          }
        ) : /* @__PURE__ */ d.jsx("div", { className: `
                            w-7 h-7 flex items-center justify-center rounded-md transition-colors
                            ${u ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                        `, children: n }) }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ d.jsx("span", { className: `
                        text-sm font-medium truncate transition-colors
                        ${u ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                        ${h && !h.checked ? "line-through opacity-60" : ""}
                    `, children: r }),
            s.map((C, j) => /* @__PURE__ */ d.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${Tk[C.color || "default"]}
                            `,
                children: C.text
              },
              j
            ))
          ] }),
          (l || a) && /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            l && /* @__PURE__ */ d.jsx("span", { className: "truncate", children: l }),
            a && /* @__PURE__ */ d.jsx("span", { className: "flex-shrink-0 font-mono", children: a })
          ] })
        ] }),
        u && !S.length && /* @__PURE__ */ d.jsx(tg, { size: 14, className: "text-primary flex-shrink-0" }),
        S.length > 0 && /* @__PURE__ */ d.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${u ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: S.map((C, j) => /* @__PURE__ */ d.jsx(
          "button",
          {
            className: `
                                p-1.5 rounded transition-colors
                                ${C.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                            `,
            onClick: (M) => {
              M.stopPropagation(), C.onClick(M);
            },
            title: C.title,
            children: C.icon
          },
          j
        )) })
      ]
    }
  );
}, zk = ({
  preset: n,
  isSelected: r,
  onSelect: l,
  onEdit: a,
  onCopy: s,
  onDelete: u
}) => {
  var p;
  const f = n.source === "tavern" || n.source === "tavern_profile" ? og : qy, h = n.source === "custom" ? ((p = n.custom) == null ? void 0 : p.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ d.jsx(
    Ak,
    {
      icon: /* @__PURE__ */ d.jsx(f, { size: 14 }),
      title: n.name,
      subtitle: h,
      meta: `T:${n.parameters.temperature}`,
      badges: n.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: r,
      onClick: l,
      actions: [
        { icon: /* @__PURE__ */ d.jsx(bb, { size: 12 }), onClick: () => a(), title: "编辑" },
        { icon: /* @__PURE__ */ d.jsx(ng, { size: 12 }), onClick: () => s(), title: "复制" },
        { icon: /* @__PURE__ */ d.jsx(li, { size: 12 }), onClick: () => u(), title: "删除", danger: !0, hidden: n.isDefault }
      ]
    }
  );
}, ua = ({
  checked: n,
  onChange: r,
  disabled: l = !1,
  className: a = "",
  id: s
}) => {
  const u = (f) => {
    l || (f.stopPropagation(), r(!n));
  };
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      id: s,
      "aria-checked": n,
      onClick: u,
      disabled: l,
      className: `
                relative inline-flex h-3.5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-all duration-300 focus:outline-none
                ${n ? "bg-primary/20 border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.2)]" : "bg-black/20 border-border shadow-inner"}
                ${l ? "opacity-50 cursor-not-allowed" : ""}
                ${a}
            `,
      children: /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `
                    pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full shadow-sm ring-0 transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
                    ${n ? "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] border border-primary-foreground/20" : "bg-muted-foreground border border-transparent opacity-60"}
                `,
          style: { transform: n ? "translateX(24px)" : "translateX(2px)" }
        }
      )
    }
  );
}, Kt = ({ title: n, description: r, children: l, className: a = "" }) => /* @__PURE__ */ d.jsxs("div", { className: `mb-8 ${a}`, children: [
  /* @__PURE__ */ d.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-sm font-medium text-primary", children: n }),
    r && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground mt-1 break-words", children: r })
  ] }),
  /* @__PURE__ */ d.jsx("div", { className: "space-y-4", children: l })
] }), Ht = ({
  label: n,
  description: r,
  error: l,
  required: a,
  className: s = "",
  value: u,
  onChange: f,
  placeholder: h,
  type: p = "text",
  disabled: g,
  multiline: y,
  rows: x = 3
}) => {
  const S = {
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
  return /* @__PURE__ */ d.jsxs("div", { className: `flex flex-col gap-1 ${s}`, children: [
    /* @__PURE__ */ d.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      n,
      a && /* @__PURE__ */ d.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    y ? /* @__PURE__ */ d.jsx(
      "textarea",
      {
        value: u,
        onChange: (v) => f(v.target.value),
        placeholder: h,
        disabled: g,
        rows: x,
        style: S,
        className: "font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ) : /* @__PURE__ */ d.jsx(
      "input",
      {
        type: p,
        value: u,
        onChange: (v) => f(v.target.value),
        placeholder: h,
        disabled: g,
        style: S,
        className: "placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ),
    r && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-muted-foreground/70 break-words", children: r }),
    l && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-destructive", children: l })
  ] });
}, Xn = ({
  label: n,
  description: r,
  error: l,
  required: a,
  className: s = "",
  value: u,
  onChange: f,
  min: h,
  max: p,
  step: g = 1,
  showSlider: y = !0,
  suffix: x
}) => {
  const S = {
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
  }, v = h !== void 0 && p !== void 0 ? Math.min(100, Math.max(0, (u - h) / (p - h) * 100)) : 0;
  return /* @__PURE__ */ d.jsxs("div", { className: `flex flex-col gap-2 ${s}`, children: [
    /* @__PURE__ */ d.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ d.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      n,
      a && /* @__PURE__ */ d.jsx("span", { className: "text-destructive", children: "*" })
    ] }) }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3", children: [
      y && h !== void 0 && p !== void 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex-1 relative h-4 flex items-center group cursor-pointer", children: [
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute inset-x-0 h-[1px]",
            style: { backgroundColor: "var(--border)" }
          }
        ),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
            style: { left: `${v}%`, transform: "translate(-50%, -50%)" }
          }
        ),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "range",
            min: h,
            max: p,
            step: g,
            value: u,
            onChange: (C) => f(Number(C.target.value)),
            className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
            style: { appearance: "none", WebkitAppearance: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx(
        "input",
        {
          type: "number",
          min: h,
          max: p,
          step: g,
          value: u,
          onChange: (C) => f(Number(C.target.value)),
          style: S,
          className: "focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }
      )
    ] }),
    r && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-muted-foreground/70 break-words", children: r }),
    l && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-destructive", children: l })
  ] });
}, Qn = ({
  label: n,
  description: r,
  error: l,
  required: a,
  className: s = "",
  value: u,
  onChange: f,
  options: h,
  placeholder: p = "请选择...",
  disabled: g
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
  return /* @__PURE__ */ d.jsxs("div", { className: `flex flex-col gap-1 ${s}`, children: [
    /* @__PURE__ */ d.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      n,
      a && /* @__PURE__ */ d.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ d.jsxs(
        "select",
        {
          value: u,
          onChange: (x) => f(x.target.value),
          disabled: g,
          style: y,
          className: "disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors",
          children: [
            /* @__PURE__ */ d.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: p }),
            h.map((x) => /* @__PURE__ */ d.jsx("option", { value: x.value, className: "bg-popover text-foreground", children: x.label }, x.value))
          ]
        }
      ),
      /* @__PURE__ */ d.jsx(ei, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" })
    ] }),
    r && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-muted-foreground/70 break-words", children: r }),
    l && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-destructive", children: l })
  ] });
}, Er = ({
  label: n,
  description: r,
  error: l,
  className: a = "",
  checked: s,
  onChange: u,
  disabled: f,
  compact: h
}) => /* @__PURE__ */ d.jsxs("div", { className: `flex items-start justify-between gap-4 ${h ? "py-0" : "py-1"} ${a} ${f ? "opacity-50 pointer-events-none" : ""}`, children: [
  n && /* @__PURE__ */ d.jsxs("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ d.jsx(
      "label",
      {
        className: "text-xs text-foreground cursor-pointer block truncate",
        onClick: () => !f && u(!s),
        children: n
      }
    ),
    r && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5 break-words", children: r }),
    l && /* @__PURE__ */ d.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: l })
  ] }),
  /* @__PURE__ */ d.jsx(
    ua,
    {
      checked: s,
      onChange: u,
      disabled: f
    }
  )
] });
class Pn {
  // 10秒
  /**
   * 通用入口：根据 API 类型获取模型列表
   */
  static async fetchModels(r, l) {
    switch (r) {
      case "openai":
        return this.fetchOpenAIModels(l);
      case "ollama":
        return this.fetchOllamaModels(l);
      case "vllm":
        return this.fetchVLLMModels(l);
      case "cohere":
        return this.fetchCohereModels(l);
      case "jina":
      case "voyage":
        return this.getPresetModels(r);
      default:
        return ge.warn("ModelService", `Unknown API type: ${r}`), [];
    }
  }
  /**
   * 获取 OpenAI 兼容 API 的模型列表
   * 适用于: OpenAI, Azure, 自定义 OpenAI 兼容服务
   */
  static async fetchOpenAIModels(r) {
    const { apiUrl: l, apiKey: a, timeout: s = this.DEFAULT_TIMEOUT } = r, u = l.replace(/\/+$/, ""), f = u.endsWith("/v1") ? `${u}/models` : `${u}/v1/models`;
    try {
      const h = new AbortController(), p = setTimeout(() => h.abort(), s), g = {
        "Content-Type": "application/json"
      };
      a && (g.Authorization = `Bearer ${a}`);
      const y = await fetch(f, {
        method: "GET",
        headers: g,
        signal: h.signal
      });
      if (clearTimeout(p), !y.ok)
        throw new Error(`HTTP ${y.status}: ${y.statusText}`);
      const x = await y.json(), S = (x.data || x || []).map((v) => ({
        id: v.id || v.model,
        name: v.name || v.id || v.model,
        owned_by: v.owned_by
      }));
      return ge.info("ModelService", `Fetched ${S.length} models from OpenAI API`), S.sort((v, C) => v.id.localeCompare(C.id));
    } catch (h) {
      throw h.name === "AbortError" ? ge.error("ModelService", "OpenAI API request timeout") : ge.error("ModelService", `OpenAI API error: ${h.message}`), h;
    }
  }
  /**
   * 获取 Ollama 模型列表
   */
  static async fetchOllamaModels(r) {
    const { apiUrl: l, timeout: a = this.DEFAULT_TIMEOUT } = r, u = `${l.replace(/\/+$/, "")}/api/tags`;
    try {
      const f = new AbortController(), h = setTimeout(() => f.abort(), a), p = await fetch(u, {
        method: "GET",
        signal: f.signal
      });
      if (clearTimeout(h), !p.ok)
        throw new Error(`HTTP ${p.status}: ${p.statusText}`);
      const y = ((await p.json()).models || []).map((x) => ({
        id: x.name || x.model,
        name: x.name || x.model
      }));
      return ge.info("ModelService", `Fetched ${y.length} models from Ollama`), y;
    } catch (f) {
      throw ge.error("ModelService", `Ollama API error: ${f.message}`), f;
    }
  }
  /**
   * 获取 vLLM 模型列表
   * vLLM 使用 OpenAI 兼容 API
   */
  static async fetchVLLMModels(r) {
    return this.fetchOpenAIModels(r);
  }
  /**
   * 获取 Cohere 模型列表
   */
  static async fetchCohereModels(r) {
    const { apiKey: l, timeout: a = this.DEFAULT_TIMEOUT } = r;
    if (!l)
      return ge.warn("ModelService", "Cohere API key required"), this.getPresetModels("cohere");
    try {
      const s = new AbortController(), u = setTimeout(() => s.abort(), a), f = await fetch("https://api.cohere.ai/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${l}`,
          "Content-Type": "application/json"
        },
        signal: s.signal
      });
      if (clearTimeout(u), !f.ok)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const p = ((await f.json()).models || []).filter((g) => {
        var y;
        return (y = g.endpoints) == null ? void 0 : y.includes("embed");
      }).map((g) => ({
        id: g.name,
        name: g.name,
        contextLength: g.context_length
      }));
      return ge.info("ModelService", `Fetched ${p.length} embed models from Cohere`), p;
    } catch (s) {
      return ge.error("ModelService", `Cohere API error: ${s.message}`), this.getPresetModels("cohere");
    }
  }
  /**
   * 获取预设模型列表（用于不支持动态获取的服务）
   */
  static getPresetModels(r) {
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
    }[r] || [];
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
Je(Pn, "DEFAULT_TIMEOUT", 1e4);
const _k = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], Mk = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function Ok() {
  var n, r, l, a;
  try {
    const s = (l = (r = (n = window.SillyTavern) == null ? void 0 : n.getContext) == null ? void 0 : r.call(n)) == null ? void 0 : l.extensionSettings;
    return ((a = s == null ? void 0 : s.connectionManager) == null ? void 0 : a.profiles) || [];
  } catch (s) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", s), [];
  }
}
const Dk = ({
  preset: n,
  onChange: r,
  isNew: l = !1
}) => {
  var le, _, U, ae, fe, R;
  const [a, s] = V.useState([]), [u, f] = V.useState(!1), [h, p] = V.useState([]), [g, y] = V.useState(!1), [x, S] = V.useState(null), v = () => {
    f(!0);
    try {
      const O = Ok();
      s(O);
    } finally {
      f(!1);
    }
  }, C = async () => {
    const { apiUrl: O, apiKey: J, apiSource: ue } = n.custom || {};
    if (!O) {
      S("请先填写 API URL");
      return;
    }
    y(!0), S(null);
    try {
      let ie = [];
      ue === "ollama" ? ie = await Pn.fetchOllamaModels({ apiUrl: O }) : ie = await Pn.fetchOpenAIModels({ apiUrl: O, apiKey: J }), p(ie), ie.length === 0 && S("未找到可用模型");
    } catch (ie) {
      S(ie.message || "获取模型列表失败"), p([]);
    } finally {
      y(!1);
    }
  };
  V.useEffect(() => {
    v();
  }, []);
  const j = (O) => {
    r({ ...n, ...O, updatedAt: Date.now() });
  }, M = (O, J) => {
    j({
      parameters: { ...n.parameters, [O]: J }
    });
  }, T = (O, J) => {
    var ue, ie, ee, B;
    j({
      custom: {
        apiUrl: ((ue = n.custom) == null ? void 0 : ue.apiUrl) || "",
        apiKey: ((ie = n.custom) == null ? void 0 : ie.apiKey) || "",
        model: ((ee = n.custom) == null ? void 0 : ee.model) || "",
        apiSource: ((B = n.custom) == null ? void 0 : B.apiSource) || "openai",
        [O]: J
      }
    });
  }, I = (O) => {
    const J = O;
    j({
      source: J,
      tavernProfileId: J === "tavern_profile" ? n.tavernProfileId : void 0
    }), J === "tavern_profile" && v();
  }, L = a.map((O) => ({
    value: O.id,
    label: `${O.name} (${O.api || "Unknown"} - ${O.model || "Unknown"})`
  })), re = a.find((O) => O.id === n.tavernProfileId);
  return /* @__PURE__ */ d.jsxs("div", { className: "", children: [
    /* @__PURE__ */ d.jsxs(Kt, { title: "基本信息", children: [
      /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "预设名称",
          value: n.name,
          onChange: (O) => j({ name: O }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Qn,
        {
          label: "配置源",
          value: n.source,
          onChange: I,
          options: Mk,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    n.source === "tavern_profile" && /* @__PURE__ */ d.jsxs(Kt, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ d.jsx(
          Qn,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: n.tavernProfileId || "",
            onChange: (O) => j({ tavernProfileId: O }),
            options: L,
            placeholder: u ? "加载中..." : "请选择配置文件",
            disabled: u || L.length === 0
          }
        ),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: v,
            disabled: u,
            title: "刷新配置列表",
            children: /* @__PURE__ */ d.jsx(kn, { size: 16, className: u ? "animate-spin" : "" })
          }
        )
      ] }),
      L.length === 0 && !u && /* @__PURE__ */ d.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      re && /* @__PURE__ */ d.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-foreground font-mono", children: re.api || "-" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-foreground font-mono", children: re.model || "-" })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ d.jsx("span", { className: "text-foreground font-mono", children: re.preset || "-" })
        ] })
      ] })
    ] }),
    n.source === "custom" && /* @__PURE__ */ d.jsxs(Kt, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ d.jsx(
        Qn,
        {
          label: "API 类型",
          value: ((le = n.custom) == null ? void 0 : le.apiSource) || "openai",
          onChange: (O) => T("apiSource", O),
          options: _k
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "API URL",
          type: "url",
          value: ((_ = n.custom) == null ? void 0 : _.apiUrl) || "",
          onChange: (O) => T("apiUrl", O),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "API Key",
          type: "password",
          value: ((U = n.custom) == null ? void 0 : U.apiKey) || "",
          onChange: (O) => T("apiKey", O),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-end gap-2", children: [
          h.length > 0 ? /* @__PURE__ */ d.jsx(
            Qn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((ae = n.custom) == null ? void 0 : ae.model) || "",
              onChange: (O) => T("model", O),
              options: h.map((O) => ({ value: O.id, label: O.name || O.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ d.jsx(
            Ht,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: ((fe = n.custom) == null ? void 0 : fe.model) || "",
              onChange: (O) => T("model", O),
              placeholder: "gpt-4o-mini",
              required: !0
            }
          ),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: C,
              disabled: g || !((R = n.custom) != null && R.apiUrl),
              title: "获取模型列表",
              children: g ? /* @__PURE__ */ d.jsx(ba, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ d.jsx(kn, { size: 16 })
            }
          )
        ] }),
        x && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-destructive", children: x }),
        h.length > 0 && /* @__PURE__ */ d.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          h.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs(Kt, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ d.jsx(
        Xn,
        {
          label: "温度 (Temperature)",
          value: n.parameters.temperature,
          onChange: (O) => M("temperature", O),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Xn,
        {
          label: "Top-P",
          value: n.parameters.topP,
          onChange: (O) => M("topP", O),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Xn,
        {
          label: "最大输出 Tokens",
          value: n.parameters.maxTokens,
          onChange: (O) => M("maxTokens", O),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ d.jsx(
        Xn,
        {
          label: "频率惩罚",
          value: n.parameters.frequencyPenalty,
          onChange: (O) => M("frequencyPenalty", O),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ d.jsx(
        Xn,
        {
          label: "存在惩罚",
          value: n.parameters.presencePenalty,
          onChange: (O) => M("presencePenalty", O),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] })
  ] });
}, Rk = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], Xp = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, Qp = ["ollama", "vllm"], Pp = ["openai", "cohere", "jina", "voyage"], Lk = ({
  config: n,
  onChange: r
}) => {
  var v;
  const l = (C) => {
    r({ ...n, ...C });
  }, a = (C) => {
    l({
      source: C,
      model: Xp[C],
      apiUrl: Qp.includes(C) ? n.apiUrl : void 0,
      apiKey: Pp.includes(C) ? n.apiKey : void 0
    });
  }, s = Qp.includes(n.source), u = Pp.includes(n.source), [f, h] = V.useState([]), [p, g] = V.useState(!1), [y, x] = V.useState(null), S = async () => {
    g(!0), x(null);
    try {
      let C = [];
      const j = { apiUrl: n.apiUrl || "", apiKey: n.apiKey };
      switch (n.source) {
        case "ollama":
          if (!n.apiUrl) {
            x("请先填写 API URL");
            return;
          }
          C = await Pn.fetchOllamaModels(j);
          break;
        case "vllm":
          if (!n.apiUrl) {
            x("请先填写 API URL");
            return;
          }
          C = await Pn.fetchVLLMModels(j);
          break;
        case "openai":
        case "cohere":
        case "jina":
        case "voyage":
          C = Pn.getPresetModels(n.source);
          break;
        default:
          C = [];
      }
      h(C), C.length === 0 && x("未找到可用模型");
    } catch (C) {
      x(C.message || "获取模型列表失败"), h([]);
    } finally {
      g(!1);
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "", children: [
    /* @__PURE__ */ d.jsxs(Kt, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ d.jsx(
        Qn,
        {
          label: "向量源",
          value: n.source,
          onChange: (C) => a(C),
          options: Rk,
          description: "选择向量化服务提供商"
        }
      ),
      s && /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "API URL",
          type: "url",
          value: n.apiUrl || "",
          onChange: (C) => l({ apiUrl: C }),
          placeholder: n.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${n.source} 服务的 API 端点`
        }
      ),
      u && /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "API Key",
          type: "password",
          value: n.apiKey || "",
          onChange: (C) => l({ apiKey: C }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-end gap-2", children: [
          f.length > 0 ? /* @__PURE__ */ d.jsx(
            Qn,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: n.model || "",
              onChange: (C) => l({ model: C }),
              options: f.map((C) => ({ value: C.id, label: C.name || C.id })),
              placeholder: "选择模型"
            }
          ) : /* @__PURE__ */ d.jsx(
            Ht,
            {
              className: "flex-1 !mb-0",
              label: "模型名称",
              value: n.model || "",
              onChange: (C) => l({ model: C }),
              placeholder: Xp[n.source],
              description: "使用的向量化模型"
            }
          ),
          (s || u) && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
              onClick: S,
              disabled: p,
              title: "获取模型列表",
              children: p ? /* @__PURE__ */ d.jsx(ba, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ d.jsx(kn, { size: 16 })
            }
          )
        ] }),
        y && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-destructive", children: y }),
        f.length > 0 && /* @__PURE__ */ d.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "已加载 ",
          f.length,
          " 个模型"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(Kt, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ d.jsx(
      Ht,
      {
        label: "向量维度",
        value: ((v = n.dimensions) == null ? void 0 : v.toString()) || "",
        onChange: (C) => {
          const j = parseInt(C, 10);
          l({ dimensions: isNaN(j) ? void 0 : j });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, Uk = ({
  config: n,
  onChange: r
}) => {
  const l = (y) => {
    r({ ...n, ...y });
  }, [a, s] = V.useState([]), [u, f] = V.useState(!1), [h, p] = V.useState(null), g = async () => {
    if (!n.url) {
      p("请先填写 API URL");
      return;
    }
    f(!0), p(null);
    try {
      const y = await Pn.fetchOpenAIModels({
        apiUrl: n.url,
        apiKey: n.apiKey
      });
      y.length > 0 ? s(y) : s(Pn.getCommonRerankModels());
    } catch {
      s(Pn.getCommonRerankModels());
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "", children: [
    /* @__PURE__ */ d.jsx(Kt, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ d.jsx(
      Er,
      {
        label: "启用 Rerank",
        checked: n.enabled,
        onChange: (y) => l({ enabled: y }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    n.enabled && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs(Kt, { title: "API 配置", children: [
        /* @__PURE__ */ d.jsx(
          Ht,
          {
            label: "API URL",
            type: "url",
            value: n.url,
            onChange: (y) => l({ url: y }),
            placeholder: "http://localhost:8000/rerank",
            description: "Rerank 服务的 API 端点",
            required: !0
          }
        ),
        /* @__PURE__ */ d.jsx(
          Ht,
          {
            label: "API Key",
            type: "password",
            value: n.apiKey,
            onChange: (y) => l({ apiKey: y }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-end gap-2", children: [
            a.length > 0 ? /* @__PURE__ */ d.jsx(
              Qn,
              {
                className: "flex-1 !mb-0",
                label: "模型名称",
                value: n.model,
                onChange: (y) => l({ model: y }),
                options: a.map((y) => ({ value: y.id, label: y.name || y.id })),
                placeholder: "选择模型"
              }
            ) : /* @__PURE__ */ d.jsx(
              Ht,
              {
                className: "flex-1 !mb-0",
                label: "模型名称",
                value: n.model,
                onChange: (y) => l({ model: y }),
                placeholder: "BAAI/bge-reranker-v2-m3",
                description: "使用的 Rerank 模型",
                required: !0
              }
            ),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                type: "button",
                className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
                onClick: g,
                disabled: u,
                title: "获取模型列表",
                children: u ? /* @__PURE__ */ d.jsx(ba, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ d.jsx(kn, { size: 16 })
              }
            )
          ] }),
          h && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-destructive", children: h }),
          a.length > 0 && /* @__PURE__ */ d.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "已加载 ",
            a.length,
            " 个模型"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(Kt, { title: "参数设置", children: [
        /* @__PURE__ */ d.jsx(
          Xn,
          {
            label: "Top-N",
            value: n.topN,
            onChange: (y) => l({ topN: y }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ d.jsx(
          Xn,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: n.hybridAlpha,
            onChange: (y) => l({ hybridAlpha: y }),
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
function Bk(n) {
  switch (n) {
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
function Hk(n) {
  var r;
  return ((r = hs.find((l) => l.value === n)) == null ? void 0 : r.label) || n;
}
const qk = ({
  template: n,
  isSelected: r = !1,
  onSelect: l,
  onCopy: a,
  onDelete: s,
  onToggleEnabled: u,
  onImport: f,
  onResetToDefault: h
}) => {
  const p = V.useRef(null), g = (S) => {
    S.stopPropagation();
    const v = {
      version: "1.0",
      exportedAt: Date.now(),
      template: {
        name: n.name,
        category: n.category,
        boundPresetId: n.boundPresetId,
        systemPrompt: n.systemPrompt,
        userPromptTemplate: n.userPromptTemplate,
        outputFormat: n.outputFormat,
        availableVariables: n.availableVariables
      }
    }, C = new Blob([JSON.stringify(v, null, 2)], { type: "application/json" }), j = URL.createObjectURL(C), M = document.createElement("a");
    M.href = j, M.download = `engram_template_${n.name.replace(/\s+/g, "_")}.json`, M.click(), URL.revokeObjectURL(j);
  }, y = (S) => {
    var v;
    S.stopPropagation(), (v = p.current) == null || v.click();
  }, x = (S) => {
    var j;
    const v = (j = S.target.files) == null ? void 0 : j[0];
    if (!v || !f) return;
    const C = new FileReader();
    C.onload = (M) => {
      var T;
      try {
        const I = JSON.parse((T = M.target) == null ? void 0 : T.result);
        if (I.version && I.template) {
          const L = Kr(
            I.template.name,
            I.template.category,
            {
              enabled: n.enabled,
              // 保持当前启用状态
              isBuiltIn: n.isBuiltIn,
              // 保持内置状态
              boundPresetId: I.template.boundPresetId,
              systemPrompt: I.template.systemPrompt,
              userPromptTemplate: I.template.userPromptTemplate,
              outputFormat: I.template.outputFormat,
              availableVariables: I.template.availableVariables
            }
          );
          L.id = n.id, f(L);
        }
      } catch (I) {
        console.error("导入失败:", I);
      }
    }, C.readAsText(v), p.current && (p.current.value = "");
  };
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: `
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${r ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: l,
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${n.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (S) => {
                S.stopPropagation(), u == null || u(!n.enabled);
              },
              children: /* @__PURE__ */ d.jsx(Pf, { size: 14 })
            }
          ),
          /* @__PURE__ */ d.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ d.jsx("h4", { className: `text-sm font-medium truncate ${r ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: n.name }),
              /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ d.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${Bk(n.category)}`, children: Hk(n.category) }),
                n.isBuiltIn && /* @__PURE__ */ d.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ d.jsx("span", { className: "truncate max-w-[120px]", children: n.boundPresetId ? `BOUND: ${n.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ d.jsx("span", { children: n.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${r || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ d.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: y, title: "Import", children: /* @__PURE__ */ d.jsx(Yb, { size: 12 }) }),
          /* @__PURE__ */ d.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: g, title: "Export", children: /* @__PURE__ */ d.jsx(is, { size: 12 }) }),
          /* @__PURE__ */ d.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (S) => {
            S.stopPropagation(), a == null || a();
          }, title: "Copy", children: /* @__PURE__ */ d.jsx(ng, { size: 12 }) }),
          n.isBuiltIn && /* @__PURE__ */ d.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-amber-500/10 rounded text-muted-foreground hover:text-amber-500 transition-colors",
              onClick: (S) => {
                S.stopPropagation();
                const v = Sd(n.category);
                v && h && h({
                  ...v,
                  id: n.id,
                  enabled: n.enabled
                });
              },
              title: "恢复默认",
              children: /* @__PURE__ */ d.jsx(jb, { size: 12 })
            }
          ),
          !n.isBuiltIn && /* @__PURE__ */ d.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (S) => {
            S.stopPropagation(), s == null || s();
          }, title: "Delete", children: /* @__PURE__ */ d.jsx(li, { size: 12 }) })
        ] }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            ref: p,
            type: "file",
            accept: ".json",
            onChange: x,
            className: "hidden"
          }
        )
      ]
    }
  );
}, Ik = ({
  templates: n,
  selectedId: r,
  onSelect: l,
  onAdd: a,
  onUpdate: s,
  onDelete: u
}) => {
  const f = () => {
    const x = Kr(
      `新模板 ${n.length + 1}`,
      "text_summary"
    );
    a(x), l(x);
  }, h = (x) => {
    const S = Kr(
      `${x.name} (副本)`,
      x.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: x.boundPresetId,
        systemPrompt: x.systemPrompt,
        userPromptTemplate: x.userPromptTemplate,
        outputFormat: x.outputFormat,
        availableVariables: [...x.availableVariables]
      }
    );
    a(S);
  }, p = (x, S) => {
    S && n.filter((v) => v.category === x.category && v.id !== x.id && v.enabled).forEach((v) => s({ ...v, enabled: !1 })), s({ ...x, enabled: S });
  }, g = (x) => {
    s(x);
  }, y = hs.map((x) => ({
    ...x,
    templates: n.filter((S) => S.category === x.value)
  })).filter((x) => x.templates.length > 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ d.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: f,
          children: /* @__PURE__ */ d.jsx(Qf, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      y.map((x) => /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          x.label,
          /* @__PURE__ */ d.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-1", children: x.templates.map((S) => /* @__PURE__ */ d.jsx(
          qk,
          {
            template: S,
            isSelected: r === S.id,
            onSelect: () => l(S),
            onCopy: () => h(S),
            onDelete: () => u(S),
            onToggleEnabled: (v) => p(S, v),
            onImport: g,
            onResetToDefault: (v) => s(v)
          },
          S.id
        )) })
      ] }, x.value)),
      n.length === 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ d.jsx(Yf, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, Fk = [
  { name: "{{chatHistory}}", desc: "待处理的对话历史" },
  { name: "{{context}}", desc: "角色卡设定" },
  { name: "{{char}}", desc: "角色名" },
  { name: "{{user}}", desc: "用户名" },
  { name: "{{userInput}}", desc: "当前用户输入" },
  { name: "{{worldbookContext}}", desc: "世界书激活内容" },
  { name: "{{engramSummaries}}", desc: "Engram 所有摘要（用于精简）" }
], Vk = ({
  template: n,
  llmPresets: r,
  defaultPresetId: l,
  onChange: a
}) => {
  var f, h;
  const s = [
    { value: "", label: "使用默认预设" + (l ? ` (${((f = r.find((p) => p.id === l)) == null ? void 0 : f.name) || l})` : "") },
    ...r.map((p) => ({ value: p.id, label: p.name }))
  ], u = (p) => {
    a({ ...n, ...p, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ d.jsxs(Kt, { title: "基本信息", children: [
      /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "模板名称",
          value: n.name,
          onChange: (p) => u({ name: p }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: n.isBuiltIn
        }
      ),
      /* @__PURE__ */ d.jsx(
        Qn,
        {
          label: "模板分类",
          value: n.category,
          onChange: (p) => u({ category: p }),
          options: hs.map((p) => ({ value: p.value, label: p.label })),
          description: (h = hs.find((p) => p.value === n.category)) == null ? void 0 : h.description
        }
      ),
      /* @__PURE__ */ d.jsx(
        Qn,
        {
          label: "模型来源",
          value: n.boundPresetId || "",
          onChange: (p) => u({ boundPresetId: p || null }),
          options: s,
          description: "选择用于此模板的 LLM 预设"
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs(Kt, { title: "提示词内容", children: [
      /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "系统提示词",
          value: n.systemPrompt,
          onChange: (p) => u({ systemPrompt: p }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ d.jsx(
        Ht,
        {
          label: "用户提示词模板",
          value: n.userPromptTemplate,
          onChange: (p) => u({ userPromptTemplate: p }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ d.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用宏" }),
      /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-1", children: Fk.map((p) => /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ d.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap", children: p.name }),
        /* @__PURE__ */ d.jsx("span", { className: "text-muted-foreground", children: p.desc })
      ] }, p.name)) })
    ] })
  ] });
}, $k = ({
  rules: n,
  selectedId: r,
  onSelect: l,
  onToggle: a,
  onDelete: s,
  onAdd: u,
  onReset: f
}) => /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: f,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: u,
          children: /* @__PURE__ */ d.jsx(ag, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1", children: [
    n.map((h) => /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${r === h.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => l(h.id),
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${h.enabled ? r === h.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (p) => {
                p.stopPropagation(), a(h.id);
              },
              title: h.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ d.jsx(Pf, { size: 14 })
            }
          ),
          /* @__PURE__ */ d.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ d.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ d.jsx("h4", { className: `text-sm font-medium truncate ${r === h.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!h.enabled && "opacity-50 line-through"}`, children: h.name }) }),
            /* @__PURE__ */ d.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ d.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              h.pattern,
              "/",
              h.flags
            ] }) })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: `flex items-center ${r === h.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ d.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (p) => {
                p.stopPropagation(), s(h.id);
              },
              children: /* @__PURE__ */ d.jsx(li, { size: 12 })
            }
          ) })
        ]
      },
      h.id
    )),
    n.length === 0 && /* @__PURE__ */ d.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), Gk = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], Yk = ({ rule: n, onChange: r }) => {
  var y;
  const [l, a] = V.useState(""), [s, u] = V.useState(""), [f, h] = V.useState({ valid: !0 }), p = new vd();
  V.useEffect(() => {
    const x = p.validatePattern(n.pattern, n.flags);
    h(x);
  }, [n.pattern, n.flags]), V.useEffect(() => {
    if (l && f.valid) {
      const x = p.processWithRule(l, n);
      u(x);
    } else
      u("");
  }, [l, n, f.valid]);
  const g = (x) => {
    const S = n.flags.split(""), v = S.indexOf(x);
    v >= 0 ? S.splice(v, 1) : S.push(x), r({ flags: S.join("") });
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-sm font-medium text-foreground", children: "规则名称" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: n.name,
            onChange: (x) => r({ name: x.target.value }),
            placeholder: "例如：移除思维链"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-sm font-medium text-foreground", children: "描述（可选）" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: n.description || "",
            onChange: (x) => r({ description: x.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ d.jsx("div", { className: "flex gap-2", children: Ip.map((x) => /* @__PURE__ */ d.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${n.scope === x.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => r({ scope: x.value }),
            title: x.description,
            children: x.label
          },
          x.value
        )) }),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground", children: (y = Ip.find((x) => x.value === n.scope)) == null ? void 0 : y.description })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ d.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          f.valid ? /* @__PURE__ */ d.jsx($f, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ d.jsx(xs, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${f.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: n.pattern,
            onChange: (x) => r({ pattern: x.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !f.valid && f.error && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-red-500", children: f.error })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ d.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: n.replacement,
            onChange: (x) => r({ replacement: x.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ d.jsx("div", { className: "flex flex-wrap gap-2", children: Gk.map((x) => /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${n.flags.includes(x.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => g(x.value),
            title: x.description,
            children: [
              x.label,
              " (",
              x.value,
              ")"
            ]
          },
          x.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ d.jsx(Xf, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ d.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: l,
            onChange: (x) => a(x.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      l && f.valid && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ d.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ d.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: s || /* @__PURE__ */ d.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ d.jsx(nb, { size: 16, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("strong", { children: "输入" }),
        "：清洗发给 LLM 的聊天内容。",
        /* @__PURE__ */ d.jsx("strong", { children: "输出" }),
        "：清洗 LLM 返回的内容（如移除 ",
        /* @__PURE__ */ d.jsx("code", { className: "bg-blue-500/20 px-1 rounded", children: "<think>" }),
        "）。"
      ] })
    ] })
  ] });
}, Xk = ({
  config: n,
  onChange: r,
  worldbookStructure: l = {},
  disabledEntries: a = {},
  onToggleWorldbook: s,
  onToggleEntry: u,
  onRefresh: f
}) => {
  const [h, p] = V.useState(/* @__PURE__ */ new Set()), [g, y] = V.useState(""), x = (T) => {
    r({
      ...n,
      [T]: !n[T]
    });
  }, S = (T) => {
    const I = new Set(h);
    I.has(T) ? I.delete(T) : I.add(T), p(I);
  }, v = (T) => {
    var I;
    return ((I = n.disabledWorldbooks) == null ? void 0 : I.includes(T)) || !1;
  }, C = (T, I) => {
    var L;
    return ((L = a[T]) == null ? void 0 : L.includes(I)) || !1;
  }, M = Object.keys(l).sort().filter(
    (T) => T.toLowerCase().includes(g.toLowerCase()) || l[T].some(
      (I) => {
        var L, re;
        return ((L = I.names) == null ? void 0 : L.join(" ").toLowerCase().includes(g.toLowerCase())) || ((re = I.comment) == null ? void 0 : re.toLowerCase().includes(g.toLowerCase()));
      }
    )
  );
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ d.jsxs(Kt, { title: "基础设置", description: "控制世界书功能的全局开关", children: [
      /* @__PURE__ */ d.jsx(
        Er,
        {
          label: "启用世界书增强",
          description: "是否在生成摘要时注入世界书内容",
          checked: n.enabled,
          onChange: () => x("enabled")
        }
      ),
      /* @__PURE__ */ d.jsx(
        Er,
        {
          label: "包含全局世界书",
          description: "是否引入全局世界书（相当于 全选/全不选 全局世界书）",
          checked: n.includeGlobal,
          onChange: () => x("includeGlobal"),
          disabled: !n.enabled
        }
      )
    ] }),
    n.enabled && /* @__PURE__ */ d.jsxs(Kt, { title: "世界书管理", description: "精细控制每个世界书及其条目的启用状态", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between mb-4 gap-4", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ d.jsx(Wl, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" }),
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索世界书或条目...",
              className: "w-full h-9 pl-9 pr-3 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              value: g,
              onChange: (T) => y(T.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx(
          "button",
          {
            onClick: f,
            className: "inline-flex items-center justify-center rounded-md w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors",
            title: "刷新列表",
            children: /* @__PURE__ */ d.jsx(kn, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-2", children: M.length === 0 ? /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-muted-foreground gap-2 border border-dashed rounded-lg", children: [
        /* @__PURE__ */ d.jsx(xs, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ d.jsx("span", { className: "text-sm", children: "未找到匹配的世界书" })
      ] }) : M.map((T) => {
        const I = v(T), L = l[T] || [], re = h.has(T), le = L.filter((_) => !C(T, _.uid)).length;
        return /* @__PURE__ */ d.jsxs("div", { className: `transition-all border-b border-border last:border-0 ${I ? "bg-muted/10 opacity-60 grayscale" : ""}`, children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between p-3", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3 flex-1 overflow-hidden", children: [
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  onClick: () => S(T),
                  className: "p-1 hover:bg-accent rounded-sm transition-colors",
                  children: re ? /* @__PURE__ */ d.jsx(ei, { size: 16 }) : /* @__PURE__ */ d.jsx(Vf, { size: 16 })
                }
              ),
              /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ d.jsx(Cy, { size: 16, className: I ? "text-muted-foreground" : "text-primary" }),
                /* @__PURE__ */ d.jsx("span", { className: `font-medium truncate ${I ? "text-muted-foreground line-through" : ""}`, children: T }),
                /* @__PURE__ */ d.jsxs("span", { className: "text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full whitespace-nowrap", children: [
                  le,
                  " / ",
                  L.length,
                  " 激活"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ d.jsx(
              Er,
              {
                label: "",
                checked: !I,
                onChange: (_) => s == null ? void 0 : s(T, !_),
                compact: !0
              }
            ) })
          ] }),
          re && !I && /* @__PURE__ */ d.jsx("div", { className: "pl-4 pr-1 py-1 flex flex-col gap-0 animate-in slide-in-from-top-1 duration-200", children: L.length === 0 ? /* @__PURE__ */ d.jsx("div", { className: "text-xs text-muted-foreground text-center py-4", children: "暂无条目" }) : L.map((_) => {
            const U = C(T, _.uid);
            return /* @__PURE__ */ d.jsxs("div", { className: `flex items-start justify-between py-2 -mx-2 px-2 rounded hover:bg-accent/40 transition-colors group ${U ? "bg-muted/10 opacity-60 grayscale" : ""}`, children: [
              /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-1 min-w-0 flex-1 pr-4", children: [
                /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-2 flex-wrap min-w-0", children: [
                  /* @__PURE__ */ d.jsx(
                    "div",
                    {
                      className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${_.constant ? "bg-primary" : "bg-emerald-500"}`,
                      title: _.constant ? "常驻 (Constant)" : "条件触发 (Selective)"
                    }
                  ),
                  /* @__PURE__ */ d.jsx("span", { className: `text-sm font-medium truncate max-w-full ${U ? "text-muted-foreground line-through" : "text-foreground"}`, children: _.name || `条目 #${_.uid}` }),
                  (_.keys || []).length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-1 ml-auto md:ml-2 overflow-hidden max-w-full", children: [
                    _.keys.slice(0, 3).map((ae, fe) => /* @__PURE__ */ d.jsx("span", { className: "text-[10px] px-1 py-0.5 rounded border border-border bg-muted/20 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px]", children: ae }, fe)),
                    _.keys.length > 3 && /* @__PURE__ */ d.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "+",
                      _.keys.length - 3
                    ] })
                  ] })
                ] }),
                (_.comment || _.content) && /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground/80 pl-3.5 break-words line-clamp-2", children: _.comment || _.content })
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ d.jsx(
                Er,
                {
                  label: "",
                  checked: !U,
                  onChange: (ae) => u == null ? void 0 : u(T, _.uid, !ae),
                  compact: !0
                }
              ) })
            ] }, _.uid);
          }) })
        ] }, T);
      }) })
    ] })
  ] });
};
function Qk(n, r) {
  const l = [];
  for (const s of n.filter((u) => u.isBuiltIn)) {
    const u = r.find(
      (f) => f.isBuiltIn && f.category === s.category
    );
    u ? l.push(u) : l.push(s);
  }
  const a = r.filter((s) => !s.isBuiltIn);
  return l.push(...a), l;
}
function Pk() {
  const [n, r] = V.useState(Vp), [l, a] = V.useState(null), [s, u] = V.useState(null), [f, h] = V.useState(!1), [p, g] = V.useState([...xa]), [y, x] = V.useState(null), [S, v] = V.useState({}), [C, j] = V.useState({}), [M, T] = V.useState(null), I = V.useCallback(async () => {
    var xe;
    const G = await Le.getWorldbookStructure();
    v(G);
    const P = Bt(), te = (xe = P == null ? void 0 : P.getCharWorldbookNames) == null ? void 0 : xe.call(P, "current");
    if (te != null && te.primary) {
      T(te.primary);
      const ze = await Zr.loadState(te.primary);
      ze.disabledEntries && j(ze.disabledEntries);
    }
  }, []);
  V.useEffect(() => {
    I();
  }, [I]), V.useEffect(() => {
    var te;
    const G = Ee.get("apiSettings");
    if (G) {
      const xe = Vp(), ze = {
        ...xe,
        ...G,
        // 合并预设：保留用户预设，确保至少有一个默认
        llmPresets: ((te = G.llmPresets) == null ? void 0 : te.length) > 0 ? G.llmPresets : xe.llmPresets,
        // 合并模板：保留用户对内置模板的修改，同时添加用户自定义模板
        promptTemplates: Qk(
          xe.promptTemplates,
          G.promptTemplates || []
        )
      };
      r(ze);
    }
    const P = Ee.getRegexRules();
    P && P.length > 0 && g(P);
  }, []);
  const L = V.useCallback((G) => {
    r((P) => ({ ...P, selectedPresetId: G.id })), a(G);
  }, []), re = V.useCallback(() => {
    const G = M2(`预设 ${n.llmPresets.length + 1}`);
    G.isDefault = !1, r((P) => ({
      ...P,
      llmPresets: [...P.llmPresets, G],
      selectedPresetId: G.id
    })), a(G), h(!0);
  }, [n.llmPresets.length]), le = V.useCallback((G) => {
    r((P) => ({
      ...P,
      llmPresets: P.llmPresets.map((te) => te.id === G.id ? G : te)
    })), a(G), h(!0);
  }, []), _ = V.useCallback((G) => {
    const P = {
      ...G,
      id: `preset_${Date.now()}`,
      name: `${G.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    r((te) => ({ ...te, llmPresets: [...te.llmPresets, P] })), h(!0);
  }, []), U = V.useCallback((G) => {
    G.isDefault || (r((P) => ({
      ...P,
      llmPresets: P.llmPresets.filter((te) => te.id !== G.id),
      selectedPresetId: P.selectedPresetId === G.id ? null : P.selectedPresetId
    })), a((P) => (P == null ? void 0 : P.id) === G.id ? null : P), h(!0));
  }, []), ae = V.useCallback((G) => {
    u(G);
  }, []), fe = V.useCallback((G) => {
    r((P) => ({
      ...P,
      promptTemplates: [...P.promptTemplates, G]
    })), h(!0);
  }, []), R = V.useCallback((G) => {
    r((P) => ({
      ...P,
      promptTemplates: P.promptTemplates.map((te) => te.id === G.id ? G : te)
    })), u(G), h(!0);
  }, []), O = V.useCallback((G) => {
    G.isBuiltIn || (r((P) => ({
      ...P,
      promptTemplates: P.promptTemplates.filter((te) => te.id !== G.id)
    })), u((P) => (P == null ? void 0 : P.id) === G.id ? null : P), h(!0));
  }, []), J = V.useCallback((G) => {
    r((P) => ({ ...P, vectorConfig: G })), h(!0);
  }, []), ue = V.useCallback((G) => {
    r((P) => ({ ...P, rerankConfig: G })), h(!0);
  }, []), ie = V.useCallback((G) => {
    r((P) => ({ ...P, worldbookConfig: G })), h(!0);
  }, []), ee = V.useCallback((G, P) => {
    r((te) => {
      const xe = te.worldbookConfig.disabledWorldbooks || [];
      let ze;
      return P ? ze = [.../* @__PURE__ */ new Set([...xe, G])] : ze = xe.filter((De) => De !== G), {
        ...te,
        worldbookConfig: {
          ...te.worldbookConfig,
          disabledWorldbooks: ze
        }
      };
    }), h(!0);
  }, []), B = V.useCallback((G, P, te) => {
    j((xe) => {
      const ze = xe[G] || [];
      let De;
      return te ? De = [.../* @__PURE__ */ new Set([...ze, P])] : De = ze.filter((Tt) => Tt !== P), {
        ...xe,
        [G]: De
      };
    }), h(!0);
  }, []), Y = V.useCallback((G) => {
    const P = p.find((te) => te.id === G);
    x(P || null);
  }, [p]), se = V.useCallback(() => {
    const G = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    g((P) => [...P, G]), x(G), h(!0);
  }, []), he = V.useCallback((G) => {
    if (!y) return;
    const P = { ...y, ...G };
    x(P), g((te) => te.map((xe) => xe.id === P.id ? P : xe)), h(!0);
  }, [y]), E = V.useCallback((G) => {
    g((P) => P.map(
      (te) => te.id === G ? { ...te, enabled: !te.enabled } : te
    )), h(!0);
  }, []), A = V.useCallback((G) => {
    g((P) => P.filter((te) => te.id !== G)), x((P) => (P == null ? void 0 : P.id) === G ? null : P), h(!0);
  }, []), Q = V.useCallback(() => {
    g([...xa]), x(null), h(!0);
  }, []), w = V.useCallback(async () => {
    Ee.set("apiSettings", n), Ee.setRegexRules(p), M && await Zr.saveState(M, {
      disabledEntries: C
    }), console.log("[Engram] 保存配置:", n, p, C), h(!1);
  }, [n, p, M, C]);
  return {
    settings: n,
    editingPreset: l,
    editingTemplate: s,
    hasChanges: f,
    regexRules: p,
    editingRule: y,
    selectPreset: L,
    addPreset: re,
    updatePreset: le,
    copyPreset: _,
    deletePreset: U,
    selectTemplate: ae,
    addTemplate: fe,
    updateTemplate: R,
    deleteTemplate: O,
    updateVectorConfig: J,
    updateRerankConfig: ue,
    updateWorldbookConfig: ie,
    toggleWorldbook: ee,
    toggleEntry: B,
    refreshWorldbooks: I,
    worldbookStructure: S,
    disabledEntries: C,
    currentCharWorldbook: M,
    selectRule: Y,
    addRule: se,
    updateRule: he,
    toggleRule: E,
    deleteRule: A,
    resetRules: Q,
    save: w
  };
}
const Zk = [
  { id: "llm", label: "LLM 预设", icon: bs },
  { id: "vector", label: "向量化", icon: Gf },
  { id: "rerank", label: "Rerank", icon: rg }
], Kk = ({ initialTab: n }) => {
  const [r, l] = V.useState(n || "model"), [a, s] = V.useState("llm"), {
    settings: u,
    editingPreset: f,
    editingTemplate: h,
    hasChanges: p,
    regexRules: g,
    editingRule: y,
    selectPreset: x,
    addPreset: S,
    updatePreset: v,
    copyPreset: C,
    deletePreset: j,
    selectTemplate: M,
    addTemplate: T,
    updateTemplate: I,
    deleteTemplate: L,
    updateVectorConfig: re,
    updateRerankConfig: le,
    updateWorldbookConfig: _,
    selectRule: U,
    addRule: ae,
    updateRule: fe,
    toggleRule: R,
    deleteRule: O,
    resetRules: J,
    save: ue,
    // Worldbook filtering
    worldbookStructure: ie,
    disabledEntries: ee,
    toggleWorldbook: B,
    toggleEntry: Y,
    refreshWorldbooks: se
  } = Pk();
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ d.jsx(
      Ns,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则"
      }
    ),
    /* @__PURE__ */ d.jsx(
      gs,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: r,
        onChange: (he) => l(he),
        actions: p && /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors",
            onClick: ue,
            children: [
              /* @__PURE__ */ d.jsx(Tb, { size: 12 }),
              "保存"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      r === "model" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ d.jsx(
          gs,
          {
            tabs: Zk.map((he) => ({ ...he, icon: /* @__PURE__ */ d.jsx(he.icon, { size: 14 }) })),
            activeTab: a,
            onChange: (he) => s(he),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        a === "llm" && /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ d.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ d.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: S, children: /* @__PURE__ */ d.jsx(Qf, { size: 16 }) })
            ] }),
            /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-1", children: u.llmPresets.map((he) => /* @__PURE__ */ d.jsx(
              zk,
              {
                preset: he,
                isSelected: u.selectedPresetId === he.id,
                onSelect: () => x(he),
                onEdit: () => x(he),
                onCopy: () => C(he),
                onDelete: () => j(he)
              },
              he.id
            )) })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "flex flex-col", children: f ? /* @__PURE__ */ d.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ d.jsx(Dk, { preset: f, onChange: v }) }) : /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ d.jsx(bs, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ d.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        a === "vector" && /* @__PURE__ */ d.jsx(Lk, { config: u.vectorConfig, onChange: re }),
        a === "rerank" && /* @__PURE__ */ d.jsx(Uk, { config: u.rerankConfig, onChange: le })
      ] }),
      r === "prompt" && /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ d.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ d.jsx(
          Ik,
          {
            templates: u.promptTemplates,
            selectedId: (h == null ? void 0 : h.id) || null,
            onSelect: M,
            onAdd: T,
            onUpdate: I,
            onDelete: L
          }
        ) }),
        /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: h ? /* @__PURE__ */ d.jsx(
          Vk,
          {
            template: h,
            llmPresets: u.llmPresets,
            defaultPresetId: u.selectedPresetId,
            onChange: I
          }
        ) : /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ d.jsx(Yf, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ d.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      r === "regex" && /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ d.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ d.jsx(
          $k,
          {
            rules: g,
            selectedId: (y == null ? void 0 : y.id) || null,
            onSelect: U,
            onToggle: R,
            onDelete: O,
            onAdd: ae,
            onReset: J
          }
        ) }),
        /* @__PURE__ */ d.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: y ? /* @__PURE__ */ d.jsx(Yk, { rule: y, onChange: fe }) : /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ d.jsx(ag, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ d.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      r === "worldbook" && /* @__PURE__ */ d.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ d.jsx(
        Xk,
        {
          config: u.worldbookConfig,
          onChange: _,
          worldbookStructure: ie,
          disabledEntries: ee,
          onToggleWorldbook: B,
          onToggleEntry: Y,
          onRefresh: se
        }
      ) })
    ] })
  ] });
}, Wk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  APIPresets: Kk
}, Symbol.toStringTag, { value: "Module" })), Jk = () => {
  const [n, r] = V.useState("claudeDark");
  V.useEffect(() => {
    r(jr.getTheme());
  }, []);
  const l = (s) => {
    jr.setTheme(s), Ee.set("theme", s), r(s);
  }, a = Object.entries(es).map(([s, u]) => {
    let f = u.colors.background, h = u.colors.primary;
    return {
      id: s,
      name: u.name,
      background: f,
      sidebar: u.colors.sidebar,
      // Add sidebar color
      primary: h
    };
  });
  return /* @__PURE__ */ d.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ d.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ d.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: a.map((s) => /* @__PURE__ */ d.jsxs(
      "button",
      {
        onClick: () => l(s.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${n === s.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
                        `,
        children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-center -space-x-3 mb-2", children: [
            /* @__PURE__ */ d.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-10",
                style: { background: s.background },
                title: "Background"
              }
            ),
            /* @__PURE__ */ d.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-20",
                style: { background: s.sidebar },
                title: "Sidebar"
              }
            ),
            /* @__PURE__ */ d.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background",
                style: { background: s.primary },
                title: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ d.jsx("span", { className: `text-sm font-medium ${n === s.id ? "text-primary" : "text-muted-foreground"}`, children: s.name }),
          n === s.id && /* @__PURE__ */ d.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      s.id
    )) })
  ] });
}, eC = () => {
  var u, f, h, p, g;
  const [n, r] = V.useState(((u = Ee.getSettings().summarizerConfig) == null ? void 0 : u.previewEnabled) ?? !0), [, l] = V.useState({});
  V.useEffect(() => {
    Ee.loadSettings();
  }, []);
  const [a, s] = V.useState(Ee.getSettings().linkedDeletion);
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ d.jsx(Ns, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ d.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ d.jsxs("section", { children: [
        /* @__PURE__ */ d.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ d.jsx(Jk, {})
      ] }),
      /* @__PURE__ */ d.jsxs("section", { children: [
        /* @__PURE__ */ d.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "毛玻璃特效 (Glass Effect)" }),
        /* @__PURE__ */ d.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-6", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ d.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ d.jsxs("div", { children: [
              /* @__PURE__ */ d.jsx("h4", { className: "font-medium text-foreground", children: "启用毛玻璃" }),
              /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground break-words max-w-[200px] sm:max-w-none", children: "开启后，面板背景将具有磨砂质感" })
            ] }) }),
            /* @__PURE__ */ d.jsx(
              ua,
              {
                checked: ((f = Ee.getSettings().glassSettings) == null ? void 0 : f.enabled) ?? !0,
                onChange: (y) => {
                  const S = {
                    ...Ee.getSettings().glassSettings,
                    enabled: y
                  };
                  Ee.set("glassSettings", S), Promise.resolve().then(() => ns).then(({ ThemeManager: v }) => {
                    v.setTheme(v.getTheme());
                  }), l({});
                }
              }
            )
          ] }),
          (((h = Ee.getSettings().glassSettings) == null ? void 0 : h.enabled) ?? !0) && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx(
              Xn,
              {
                label: "不透明度 (Opacity)",
                description: "调整面板背景的遮罩强度，数值越低越透明",
                value: ((p = Ee.getSettings().glassSettings) == null ? void 0 : p.opacity) ?? 0.8,
                onChange: (y) => {
                  const S = {
                    ...Ee.getSettings().glassSettings,
                    opacity: y
                  };
                  Ee.set("glassSettings", S), Promise.resolve().then(() => ns).then(({ ThemeManager: v }) => {
                    v.setTheme(v.getTheme());
                  }), l({});
                },
                min: 0,
                max: 1,
                step: 0.05,
                showSlider: !0
              }
            ),
            /* @__PURE__ */ d.jsx(
              Xn,
              {
                label: "背景磨砂 (Blur)",
                description: "调整背景模糊程度 (px)",
                value: ((g = Ee.getSettings().glassSettings) == null ? void 0 : g.blur) ?? 10,
                onChange: (y) => {
                  const S = {
                    ...Ee.getSettings().glassSettings,
                    blur: y
                  };
                  Ee.set("glassSettings", S), Promise.resolve().then(() => ns).then(({ ThemeManager: v }) => {
                    v.setTheme(v.getTheme());
                  }), l({});
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
      /* @__PURE__ */ d.jsxs("section", { children: [
        /* @__PURE__ */ d.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ d.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ d.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ d.jsx(Py, { size: 20 }) }),
            /* @__PURE__ */ d.jsxs("div", { children: [
              /* @__PURE__ */ d.jsx("h4", { className: "font-medium text-foreground", children: "启用修订模式" }),
              /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground", children: "在写入长期记忆前，弹出预览窗口进行人工核对" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(
            ua,
            {
              checked: n,
              onChange: (y) => {
                r(y), R2.updateConfig({ previewEnabled: y });
              }
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ d.jsxs("section", { children: [
        /* @__PURE__ */ d.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "数据管理" }),
        /* @__PURE__ */ d.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-4", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ d.jsx("div", { className: "p-2 rounded-lg bg-red-500/10 text-red-500", children: /* @__PURE__ */ d.jsx(li, { size: 20 }) }),
              /* @__PURE__ */ d.jsxs("div", { children: [
                /* @__PURE__ */ d.jsx("h4", { className: "font-medium text-foreground", children: "联动删除" }),
                /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground", children: "删除角色卡时，一并删除关联的 Engram 记忆库" })
              ] })
            ] }),
            /* @__PURE__ */ d.jsx(
              ua,
              {
                checked: a.enabled,
                onChange: (y) => {
                  const x = { ...a, enabled: y };
                  s(x), Ee.set("linkedDeletion", x);
                }
              }
            )
          ] }),
          a.enabled && /* @__PURE__ */ d.jsx("div", { className: "pl-14 space-y-3 border-t border-border pt-3", children: /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ d.jsx("span", { className: "text-sm text-muted-foreground", children: "删除前确认" }),
            /* @__PURE__ */ d.jsx(
              ua,
              {
                checked: a.showConfirmation,
                onChange: (y) => {
                  const x = { ...a, showConfirmation: y };
                  s(x), Ee.set("linkedDeletion", x);
                },
                className: "scale-90"
              }
            )
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ d.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
        /* @__PURE__ */ d.jsx(Zf, { size: 32 }),
        /* @__PURE__ */ d.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, tC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Settings: eC
}, Symbol.toStringTag, { value: "Module" })), nC = () => /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ d.jsx(Ns, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ d.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ d.jsx(Ff, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ d.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), rC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MemoryStream: nC
}, Symbol.toStringTag, { value: "Module" })), lC = ({ links: n, onNavigate: r, className: l = "" }) => n.length === 0 ? null : /* @__PURE__ */ d.jsx("div", { className: `flex items-center gap-4 ${l}`, children: n.map((a) => {
  const s = a.icon || Xy;
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
      onClick: () => r(a.linkTo),
      title: a.label,
      children: [
        /* @__PURE__ */ d.jsx(s, { size: 12 }),
        /* @__PURE__ */ d.jsx("span", { children: a.label })
      ]
    },
    a.id
  );
}) }), iC = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6"
}, Jo = ({
  orientation: n = "horizontal",
  length: r = 100,
  className: l = "",
  responsive: a = !1,
  spacing: s = "none"
}) => {
  const u = iC[s];
  return a ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(
      "div",
      {
        className: `hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 border-l border-border/30 ${l}`,
        style: { height: `${r}%` }
      }
    ),
    /* @__PURE__ */ d.jsx(
      "div",
      {
        className: `lg:hidden border-t border-border/30 mx-auto ${u} ${l}`,
        style: { width: `${r}%` }
      }
    )
  ] }) : n === "vertical" ? /* @__PURE__ */ d.jsx(
    "div",
    {
      className: `border-l border-border/30 mx-auto ${l}`,
      style: { height: `${r}%` }
    }
  ) : /* @__PURE__ */ d.jsx(
    "div",
    {
      className: `border-t border-border/30 ${u} ${l}`,
      style: { width: `${r}%` }
    }
  );
}, aC = [
  { id: "token", label: "Token 数", icon: Ay },
  { id: "count", label: "总结次数", icon: eb }
], oC = () => {
  const [n, r] = V.useState(null), [l, a] = V.useState(!1), [s, u] = V.useState(!1), [f, h] = V.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [p, g] = V.useState({ ...ps }), [y, x] = V.useState(null), [S, v] = V.useState(0), [C, j] = V.useState(0);
  V.useEffect(() => {
    M();
  }, []);
  const M = async () => {
    var O;
    try {
      const { summarizerService: J } = await Promise.resolve().then(() => Zt);
      let ue = J.getStatus();
      ue.lastSummarizedFloor === 0 && (await J.initializeForCurrentChat(), ue = J.getStatus()), r(ue);
      const ie = J.getConfig();
      h({
        autoEnabled: ie.enabled,
        floorInterval: ie.floorInterval,
        bufferSize: ie.bufferSize || 3,
        autoHide: ie.autoHide || !1
      });
      const ee = (O = Ee.getSummarizerSettings()) == null ? void 0 : O.trimConfig;
      ee && g({ ...ps, ...ee });
      const { trimmerService: B } = await Promise.resolve().then(() => Zt), Y = await B.getStatus();
      x(Y);
      const { WorldInfoService: se } = await Promise.resolve().then(() => E2), { WorldBookStateService: he } = await Promise.resolve().then(() => A2), E = se.findExistingWorldbook();
      if (E) {
        const A = await se.countSummaryTokens(E);
        v(A);
        const Q = await he.loadState(E);
        j(Q.totalSummaries);
      } else
        v(0), j(0);
    } catch (J) {
      console.error("加载 Summarizer 状态失败:", J);
    }
  }, T = async () => {
    try {
      const { summarizerService: O } = await Promise.resolve().then(() => Zt);
      O.start(), await M();
    } catch (O) {
      console.error("启动失败:", O);
    }
  }, I = async () => {
    try {
      const { summarizerService: O } = await Promise.resolve().then(() => Zt);
      O.stop(), await M();
    } catch (O) {
      console.error("停止失败:", O);
    }
  }, L = async () => {
    a(!0);
    try {
      const { summarizerService: O } = await Promise.resolve().then(() => Zt);
      await O.triggerSummary(!0), await M();
    } catch (O) {
      console.error("触发失败:", O);
    } finally {
      a(!1);
    }
  }, re = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      a(!0);
      try {
        const { summarizerService: O } = await Promise.resolve().then(() => Zt);
        await O.setLastSummarizedFloor(0), await M();
      } catch (O) {
        console.error("重置失败:", O);
      } finally {
        a(!1);
      }
    }
  }, le = (O, J) => {
    const ue = { ...p, [O]: J };
    g(ue), _(ue);
  }, _ = (O) => {
    Ee.setSummarizerSettings({ trimConfig: O });
  }, U = async () => {
    const O = { ...p, enabled: !p.enabled };
    g(O), _(O);
    const { trimmerService: J } = await Promise.resolve().then(() => Zt);
    J.updateConfig({ enabled: O.enabled });
  }, ae = async () => {
    u(!0);
    try {
      const { trimmerService: O } = await Promise.resolve().then(() => Zt);
      await O.triggerTrim(!0), await M();
    } catch (O) {
      console.error("精简失败:", O);
    } finally {
      u(!1);
    }
  }, R = (() => {
    switch (p.trigger) {
      case "token":
        return { value: p.tokenLimit, min: 1024, max: 1e5, step: 1024, label: "Token 上限" };
      case "count":
        return { value: p.countLimit, min: 2, max: 20, step: 1, label: "次数上限" };
    }
  })();
  return /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", children: [
    /* @__PURE__ */ d.jsxs("section", { className: "space-y-8", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ d.jsx("h2", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "状态监控" }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              className: "p-1 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: M,
              title: "刷新",
              children: /* @__PURE__ */ d.jsx(kn, { size: 14 })
            }
          )
        ] }),
        n ? /* @__PURE__ */ d.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ d.jsxs("div", { children: [
              /* @__PURE__ */ d.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "运行状态" }),
              /* @__PURE__ */ d.jsxs("div", { className: `flex items-center gap-2 text-lg font-medium ${n.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                n.running ? /* @__PURE__ */ d.jsx(Ly, { size: 18 }) : /* @__PURE__ */ d.jsx(xs, { size: 18 }),
                n.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { children: [
              /* @__PURE__ */ d.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "待处理" }),
              /* @__PURE__ */ d.jsx("div", { className: "text-3xl font-light text-amber-500 font-mono", children: n.pendingFloors })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(Jo, { length: 100, spacing: "md" }),
          /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ d.jsxs("div", { children: [
              /* @__PURE__ */ d.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "当前楼层" }),
              /* @__PURE__ */ d.jsx("div", { className: "text-xl font-mono text-foreground/80", children: n.currentFloor })
            ] }),
            /* @__PURE__ */ d.jsxs("div", { children: [
              /* @__PURE__ */ d.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "总结次数" }),
              /* @__PURE__ */ d.jsx("div", { className: "text-xl font-mono text-foreground/80", children: C })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx(Jo, { length: 30, spacing: "md" }),
          /* @__PURE__ */ d.jsxs("div", { children: [
            /* @__PURE__ */ d.jsx("span", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1", children: "已总结内容 Token (Engram)" }),
            /* @__PURE__ */ d.jsx("div", { className: "text-sm font-mono text-primary/80", children: S.toLocaleString() })
          ] })
        ] }) : /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex gap-3", children: [
        n != null && n.running ? /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors",
            onClick: I,
            children: [
              /* @__PURE__ */ d.jsx(xb, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: T,
            children: [
              /* @__PURE__ */ d.jsx(Xf, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: L,
            disabled: l || (n == null ? void 0 : n.isSummarizing),
            children: [
              /* @__PURE__ */ d.jsx(kn, { size: 14, className: l ? "animate-spin" : "" }),
              l ? "处理中..." : "手动触发"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "pt-6 space-y-6", children: [
        /* @__PURE__ */ d.jsx(Jo, { length: 100 }),
        /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ d.jsx("span", { className: "text-sm text-foreground", children: "自动总结" }),
            /* @__PURE__ */ d.jsx(
              Er,
              {
                label: "",
                checked: f.autoEnabled,
                onChange: async (O) => {
                  h((ue) => ({ ...ue, autoEnabled: O }));
                  const { summarizerService: J } = await Promise.resolve().then(() => Zt);
                  J.updateConfig({ enabled: O });
                }
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ d.jsx("span", { className: "text-sm text-foreground", children: "自动隐藏" }),
              /* @__PURE__ */ d.jsx("span", { className: "text-[10px] text-muted-foreground", children: "处理完后隐藏原文" })
            ] }),
            /* @__PURE__ */ d.jsx(
              Er,
              {
                label: "",
                checked: f.autoHide,
                onChange: (O) => {
                  h((J) => ({ ...J, autoHide: O })), Promise.resolve().then(() => Zt).then(({ summarizerService: J }) => {
                    J.updateConfig({ autoHide: O });
                  });
                }
              }
            )
          ] })
        ] }),
        f.autoEnabled && /* @__PURE__ */ d.jsx(d.Fragment, { children: /* @__PURE__ */ d.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "楼层将每隔 ",
              /* @__PURE__ */ d.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: f.floorInterval }),
              " 层总结"
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ d.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ d.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${(f.floorInterval - 5) / 95 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "range",
                  min: 5,
                  max: 100,
                  step: 5,
                  value: f.floorInterval,
                  onChange: async (O) => {
                    const J = Number(O.target.value);
                    h((ie) => ({ ...ie, floorInterval: J }));
                    const { summarizerService: ue } = await Promise.resolve().then(() => Zt);
                    ue.updateConfig({ floorInterval: J });
                  },
                  className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                  style: { appearance: "none", WebkitAppearance: "none" }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "保留最近 ",
              /* @__PURE__ */ d.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: f.bufferSize }),
              " 层作为缓冲"
            ] }),
            /* @__PURE__ */ d.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ d.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ d.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${f.bufferSize / 20 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 20,
                  step: 1,
                  value: f.bufferSize,
                  onChange: (O) => {
                    const J = Number(O.target.value);
                    h((ue) => ({ ...ue, bufferSize: J })), Promise.resolve().then(() => Zt).then(({ summarizerService: ue }) => {
                      ue.updateConfig({ bufferSize: J });
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
      /* @__PURE__ */ d.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ d.jsxs(
        "button",
        {
          className: "inline-flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 border border-red-200 rounded transition-colors",
          onClick: re,
          disabled: l,
          title: "重置进度 (重新扫描历史)",
          children: [
            /* @__PURE__ */ d.jsx(kn, { size: 12, className: l ? "animate-spin" : "" }),
            "重置所有进度"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "space-y-6 lg:pl-8 relative", children: [
      /* @__PURE__ */ d.jsx(Jo, { responsive: !0, length: 30 }),
      /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("h2", { className: "text-sm font-medium text-foreground", children: "精简配置" }),
          /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "将多次总结压缩为更简洁的摘要" })
        ] }),
        /* @__PURE__ */ d.jsx(
          Er,
          {
            label: "",
            checked: p.enabled,
            onChange: U
          }
        )
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: `space-y-6 transition-opacity ${p.enabled ? "opacity-100" : "opacity-40 pointer-events-none"}`, children: [
        /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ d.jsx("span", { className: "text-xs text-muted-foreground", children: "触发条件" }),
          /* @__PURE__ */ d.jsx("div", { className: "flex gap-6", children: aC.map((O) => /* @__PURE__ */ d.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer group",
              children: [
                /* @__PURE__ */ d.jsx(
                  "span",
                  {
                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${p.trigger === O.id ? "border-primary bg-primary" : "border-border group-hover:border-muted-foreground"}`,
                    children: p.trigger === O.id && /* @__PURE__ */ d.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ d.jsx("span", { className: `text-sm transition-colors ${p.trigger === O.id ? "text-foreground" : "text-muted-foreground"}`, children: O.label })
              ]
            },
            O.id
          )) })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ d.jsx("div", { className: "text-xs text-muted-foreground", children: R.label === "Token 上限" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            "当 Token 数超过 ",
            /* @__PURE__ */ d.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: R.value }),
            " 时触发"
          ] }) : R.label === "楼层上限" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            "当楼层数超过 ",
            /* @__PURE__ */ d.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: R.value }),
            " 层时触发"
          ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            "当总结次数超过 ",
            /* @__PURE__ */ d.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: R.value }),
            " 次时触发"
          ] }) }),
          /* @__PURE__ */ d.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ d.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ d.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(R.value - R.min) / (R.max - R.min) * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ d.jsx(
              "input",
              {
                type: "range",
                min: R.min,
                max: R.max,
                step: R.step,
                value: R.value,
                onChange: (O) => {
                  const J = Number(O.target.value), ue = p.trigger === "token" ? "tokenLimit" : "countLimit";
                  le(ue, J);
                },
                className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                style: { appearance: "none", WebkitAppearance: "none" }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "保留最近 ",
            /* @__PURE__ */ d.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: p.keepRecentCount ?? 3 }),
            " 条不合并"
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ d.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ d.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(p.keepRecentCount ?? 3) / 10 * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ d.jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: 10,
                step: 1,
                value: p.keepRecentCount ?? 3,
                onChange: (O) => le("keepRecentCount", Number(O.target.value)),
                className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                style: { appearance: "none", WebkitAppearance: "none" }
              }
            )
          ] })
        ] }),
        y && /* @__PURE__ */ d.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ d.jsx("span", { children: "待合并条目:" }),
            /* @__PURE__ */ d.jsx("span", { className: "font-mono", children: y.pendingEntryCount })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ d.jsxs("span", { children: [
              "当前",
              p.trigger === "token" ? "Token" : "条目数",
              ":"
            ] }),
            /* @__PURE__ */ d.jsxs("span", { className: `font-mono ${y.triggered ? "text-amber-500" : ""}`, children: [
              y.currentValue,
              " / ",
              R.value
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            onClick: ae,
            disabled: s || ((y == null ? void 0 : y.pendingEntryCount) ?? 0) < 2,
            children: [
              /* @__PURE__ */ d.jsx(zb, { size: 14, className: s ? "animate-pulse" : "" }),
              s ? "精简中..." : "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ d.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, sC = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ d.jsx(Yf, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ d.jsx(ys, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ d.jsx(rg, { size: 16 }) }
], uC = [
  { id: "devlog", label: "模型日志", icon: Mb, linkTo: "devlog:model" },
  { id: "presets", label: "提示词模板", icon: Sy, linkTo: "presets:prompt" }
], cC = ({ onNavigate: n }) => {
  const [r, l] = V.useState("summary");
  return /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ d.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ d.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ d.jsx(
      gs,
      {
        tabs: sC,
        activeTab: r,
        onChange: (a) => l(a),
        actions: /* @__PURE__ */ d.jsx("div", { className: "hidden md:flex", children: /* @__PURE__ */ d.jsx(
          lC,
          {
            links: uC,
            onNavigate: (a) => n == null ? void 0 : n(a)
          }
        ) })
      }
    ),
    /* @__PURE__ */ d.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      r === "summary" && /* @__PURE__ */ d.jsx(oC, {}),
      r === "vectorization" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ d.jsx(ys, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      r === "batch" && /* @__PURE__ */ d.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ d.jsx(jy, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ d.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, fC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ProcessingView: cC
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=index.js.map
