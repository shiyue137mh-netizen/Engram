var B4 = Object.defineProperty;
var H4 = (o, s, u) => s in o ? B4(o, s, { enumerable: !0, configurable: !0, writable: !0, value: u }) : o[s] = u;
var Qe = (o, s, u) => H4(o, typeof s != "symbol" ? s + "" : s, u);
function Uo(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var co = { exports: {} }, In = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e1;
function L4() {
  if (e1) return In;
  e1 = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function u(c, m, h) {
    var x = null;
    if (h !== void 0 && (x = "" + h), m.key !== void 0 && (x = "" + m.key), "key" in m) {
      h = {};
      for (var y in m)
        y !== "key" && (h[y] = m[y]);
    } else h = m;
    return m = h.ref, {
      $$typeof: o,
      type: c,
      key: x,
      ref: m !== void 0 ? m : null,
      props: h
    };
  }
  return In.Fragment = s, In.jsx = u, In.jsxs = u, In;
}
var t1;
function q4() {
  return t1 || (t1 = 1, co.exports = L4()), co.exports;
}
var i = q4(), fo = { exports: {} }, le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l1;
function G4() {
  if (l1) return le;
  l1 = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), x = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), j = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), S = Symbol.for("react.activity"), U = Symbol.iterator;
  function L(b) {
    return b === null || typeof b != "object" ? null : (b = U && b[U] || b["@@iterator"], typeof b == "function" ? b : null);
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
  }, G = Object.assign, te = {};
  function P(b, R, Y) {
    this.props = b, this.context = R, this.refs = te, this.updater = Y || H;
  }
  P.prototype.isReactComponent = {}, P.prototype.setState = function(b, R) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, b, R, "setState");
  }, P.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function q() {
  }
  q.prototype = P.prototype;
  function ae(b, R, Y) {
    this.props = b, this.context = R, this.refs = te, this.updater = Y || H;
  }
  var V = ae.prototype = new q();
  V.constructor = ae, G(V, P.prototype), V.isPureReactComponent = !0;
  var ee = Array.isArray;
  function X() {
  }
  var Q = { H: null, A: null, T: null, S: null }, xe = Object.prototype.hasOwnProperty;
  function Se(b, R, Y) {
    var $ = Y.ref;
    return {
      $$typeof: o,
      type: b,
      key: R,
      ref: $ !== void 0 ? $ : null,
      props: Y
    };
  }
  function Xe(b, R) {
    return Se(b.type, R, b.props);
  }
  function Ze(b) {
    return typeof b == "object" && b !== null && b.$$typeof === o;
  }
  function De(b) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(Y) {
      return R[Y];
    });
  }
  var Le = /\/+/g;
  function je(b, R) {
    return typeof b == "object" && b !== null && b.key != null ? De("" + b.key) : R.toString(36);
  }
  function B(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (typeof b.status == "string" ? b.then(X, X) : (b.status = "pending", b.then(
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
  function C(b, R, Y, $, ne) {
    var se = typeof b;
    (se === "undefined" || se === "boolean") && (b = null);
    var ye = !1;
    if (b === null) ye = !0;
    else
      switch (se) {
        case "bigint":
        case "string":
        case "number":
          ye = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case o:
            case s:
              ye = !0;
              break;
            case A:
              return ye = b._init, C(
                ye(b._payload),
                R,
                Y,
                $,
                ne
              );
          }
      }
    if (ye)
      return ne = ne(b), ye = $ === "" ? "." + je(b, 0) : $, ee(ne) ? (Y = "", ye != null && (Y = ye.replace(Le, "$&/") + "/"), C(ne, R, Y, "", function(nn) {
        return nn;
      })) : ne != null && (Ze(ne) && (ne = Xe(
        ne,
        Y + (ne.key == null || b && b.key === ne.key ? "" : ("" + ne.key).replace(
          Le,
          "$&/"
        ) + "/") + ye
      )), R.push(ne)), 1;
    ye = 0;
    var rt = $ === "" ? "." : $ + ":";
    if (ee(b))
      for (var Ue = 0; Ue < b.length; Ue++)
        $ = b[Ue], se = rt + je($, Ue), ye += C(
          $,
          R,
          Y,
          se,
          ne
        );
    else if (Ue = L(b), typeof Ue == "function")
      for (b = Ue.call(b), Ue = 0; !($ = b.next()).done; )
        $ = $.value, se = rt + je($, Ue++), ye += C(
          $,
          R,
          Y,
          se,
          ne
        );
    else if (se === "object") {
      if (typeof b.then == "function")
        return C(
          B(b),
          R,
          Y,
          $,
          ne
        );
      throw R = String(b), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ye;
  }
  function D(b, R, Y) {
    if (b == null) return b;
    var $ = [], ne = 0;
    return C(b, $, "", "", function(se) {
      return R.call(Y, se, ne++);
    }), $;
  }
  function W(b) {
    if (b._status === -1) {
      var R = b._result;
      R = R(), R.then(
        function(Y) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = Y);
        },
        function(Y) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = Y);
        }
      ), b._status === -1 && (b._status = 0, b._result = R);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var Ce = typeof reportError == "function" ? reportError : function(b) {
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
    map: D,
    forEach: function(b, R, Y) {
      D(
        b,
        function() {
          R.apply(this, arguments);
        },
        Y
      );
    },
    count: function(b) {
      var R = 0;
      return D(b, function() {
        R++;
      }), R;
    },
    toArray: function(b) {
      return D(b, function(R) {
        return R;
      }) || [];
    },
    only: function(b) {
      if (!Ze(b))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return b;
    }
  };
  return le.Activity = S, le.Children = _e, le.Component = P, le.Fragment = u, le.Profiler = m, le.PureComponent = ae, le.StrictMode = c, le.Suspense = p, le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(b) {
      return Q.H.useMemoCache(b);
    }
  }, le.cache = function(b) {
    return function() {
      return b.apply(null, arguments);
    };
  }, le.cacheSignal = function() {
    return null;
  }, le.cloneElement = function(b, R, Y) {
    if (b == null)
      throw Error(
        "The argument must be a React element, but you passed " + b + "."
      );
    var $ = G({}, b.props), ne = b.key;
    if (R != null)
      for (se in R.key !== void 0 && (ne = "" + R.key), R)
        !xe.call(R, se) || se === "key" || se === "__self" || se === "__source" || se === "ref" && R.ref === void 0 || ($[se] = R[se]);
    var se = arguments.length - 2;
    if (se === 1) $.children = Y;
    else if (1 < se) {
      for (var ye = Array(se), rt = 0; rt < se; rt++)
        ye[rt] = arguments[rt + 2];
      $.children = ye;
    }
    return Se(b.type, ne, $);
  }, le.createContext = function(b) {
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
  }, le.createElement = function(b, R, Y) {
    var $, ne = {}, se = null;
    if (R != null)
      for ($ in R.key !== void 0 && (se = "" + R.key), R)
        xe.call(R, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (ne[$] = R[$]);
    var ye = arguments.length - 2;
    if (ye === 1) ne.children = Y;
    else if (1 < ye) {
      for (var rt = Array(ye), Ue = 0; Ue < ye; Ue++)
        rt[Ue] = arguments[Ue + 2];
      ne.children = rt;
    }
    if (b && b.defaultProps)
      for ($ in ye = b.defaultProps, ye)
        ne[$] === void 0 && (ne[$] = ye[$]);
    return Se(b, se, ne);
  }, le.createRef = function() {
    return { current: null };
  }, le.forwardRef = function(b) {
    return { $$typeof: y, render: b };
  }, le.isValidElement = Ze, le.lazy = function(b) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: b },
      _init: W
    };
  }, le.memo = function(b, R) {
    return {
      $$typeof: j,
      type: b,
      compare: R === void 0 ? null : R
    };
  }, le.startTransition = function(b) {
    var R = Q.T, Y = {};
    Q.T = Y;
    try {
      var $ = b(), ne = Q.S;
      ne !== null && ne(Y, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(X, Ce);
    } catch (se) {
      Ce(se);
    } finally {
      R !== null && Y.types !== null && (R.types = Y.types), Q.T = R;
    }
  }, le.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, le.use = function(b) {
    return Q.H.use(b);
  }, le.useActionState = function(b, R, Y) {
    return Q.H.useActionState(b, R, Y);
  }, le.useCallback = function(b, R) {
    return Q.H.useCallback(b, R);
  }, le.useContext = function(b) {
    return Q.H.useContext(b);
  }, le.useDebugValue = function() {
  }, le.useDeferredValue = function(b, R) {
    return Q.H.useDeferredValue(b, R);
  }, le.useEffect = function(b, R) {
    return Q.H.useEffect(b, R);
  }, le.useEffectEvent = function(b) {
    return Q.H.useEffectEvent(b);
  }, le.useId = function() {
    return Q.H.useId();
  }, le.useImperativeHandle = function(b, R, Y) {
    return Q.H.useImperativeHandle(b, R, Y);
  }, le.useInsertionEffect = function(b, R) {
    return Q.H.useInsertionEffect(b, R);
  }, le.useLayoutEffect = function(b, R) {
    return Q.H.useLayoutEffect(b, R);
  }, le.useMemo = function(b, R) {
    return Q.H.useMemo(b, R);
  }, le.useOptimistic = function(b, R) {
    return Q.H.useOptimistic(b, R);
  }, le.useReducer = function(b, R, Y) {
    return Q.H.useReducer(b, R, Y);
  }, le.useRef = function(b) {
    return Q.H.useRef(b);
  }, le.useState = function(b) {
    return Q.H.useState(b);
  }, le.useSyncExternalStore = function(b, R, Y) {
    return Q.H.useSyncExternalStore(
      b,
      R,
      Y
    );
  }, le.useTransition = function() {
    return Q.H.useTransition();
  }, le.version = "19.2.3", le;
}
var a1;
function Bo() {
  return a1 || (a1 = 1, fo.exports = G4()), fo.exports;
}
var O = Bo();
const Y4 = /* @__PURE__ */ Uo(O);
var mo = { exports: {} }, Pn = {}, ho = { exports: {} }, go = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var n1;
function V4() {
  return n1 || (n1 = 1, (function(o) {
    function s(C, D) {
      var W = C.length;
      C.push(D);
      e: for (; 0 < W; ) {
        var Ce = W - 1 >>> 1, _e = C[Ce];
        if (0 < m(_e, D))
          C[Ce] = D, C[W] = _e, W = Ce;
        else break e;
      }
    }
    function u(C) {
      return C.length === 0 ? null : C[0];
    }
    function c(C) {
      if (C.length === 0) return null;
      var D = C[0], W = C.pop();
      if (W !== D) {
        C[0] = W;
        e: for (var Ce = 0, _e = C.length, b = _e >>> 1; Ce < b; ) {
          var R = 2 * (Ce + 1) - 1, Y = C[R], $ = R + 1, ne = C[$];
          if (0 > m(Y, W))
            $ < _e && 0 > m(ne, Y) ? (C[Ce] = ne, C[$] = W, Ce = $) : (C[Ce] = Y, C[R] = W, Ce = R);
          else if ($ < _e && 0 > m(ne, W))
            C[Ce] = ne, C[$] = W, Ce = $;
          else break e;
        }
      }
      return D;
    }
    function m(C, D) {
      var W = C.sortIndex - D.sortIndex;
      return W !== 0 ? W : C.id - D.id;
    }
    if (o.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      o.unstable_now = function() {
        return h.now();
      };
    } else {
      var x = Date, y = x.now();
      o.unstable_now = function() {
        return x.now() - y;
      };
    }
    var p = [], j = [], A = 1, S = null, U = 3, L = !1, H = !1, G = !1, te = !1, P = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, ae = typeof setImmediate < "u" ? setImmediate : null;
    function V(C) {
      for (var D = u(j); D !== null; ) {
        if (D.callback === null) c(j);
        else if (D.startTime <= C)
          c(j), D.sortIndex = D.expirationTime, s(p, D);
        else break;
        D = u(j);
      }
    }
    function ee(C) {
      if (G = !1, V(C), !H)
        if (u(p) !== null)
          H = !0, X || (X = !0, De());
        else {
          var D = u(j);
          D !== null && B(ee, D.startTime - C);
        }
    }
    var X = !1, Q = -1, xe = 5, Se = -1;
    function Xe() {
      return te ? !0 : !(o.unstable_now() - Se < xe);
    }
    function Ze() {
      if (te = !1, X) {
        var C = o.unstable_now();
        Se = C;
        var D = !0;
        try {
          e: {
            H = !1, G && (G = !1, q(Q), Q = -1), L = !0;
            var W = U;
            try {
              t: {
                for (V(C), S = u(p); S !== null && !(S.expirationTime > C && Xe()); ) {
                  var Ce = S.callback;
                  if (typeof Ce == "function") {
                    S.callback = null, U = S.priorityLevel;
                    var _e = Ce(
                      S.expirationTime <= C
                    );
                    if (C = o.unstable_now(), typeof _e == "function") {
                      S.callback = _e, V(C), D = !0;
                      break t;
                    }
                    S === u(p) && c(p), V(C);
                  } else c(p);
                  S = u(p);
                }
                if (S !== null) D = !0;
                else {
                  var b = u(j);
                  b !== null && B(
                    ee,
                    b.startTime - C
                  ), D = !1;
                }
              }
              break e;
            } finally {
              S = null, U = W, L = !1;
            }
            D = void 0;
          }
        } finally {
          D ? De() : X = !1;
        }
      }
    }
    var De;
    if (typeof ae == "function")
      De = function() {
        ae(Ze);
      };
    else if (typeof MessageChannel < "u") {
      var Le = new MessageChannel(), je = Le.port2;
      Le.port1.onmessage = Ze, De = function() {
        je.postMessage(null);
      };
    } else
      De = function() {
        P(Ze, 0);
      };
    function B(C, D) {
      Q = P(function() {
        C(o.unstable_now());
      }, D);
    }
    o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, o.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, o.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : xe = 0 < C ? Math.floor(1e3 / C) : 5;
    }, o.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, o.unstable_next = function(C) {
      switch (U) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = U;
      }
      var W = U;
      U = D;
      try {
        return C();
      } finally {
        U = W;
      }
    }, o.unstable_requestPaint = function() {
      te = !0;
    }, o.unstable_runWithPriority = function(C, D) {
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
      var W = U;
      U = C;
      try {
        return D();
      } finally {
        U = W;
      }
    }, o.unstable_scheduleCallback = function(C, D, W) {
      var Ce = o.unstable_now();
      switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? Ce + W : Ce) : W = Ce, C) {
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
      return _e = W + _e, C = {
        id: A++,
        callback: D,
        priorityLevel: C,
        startTime: W,
        expirationTime: _e,
        sortIndex: -1
      }, W > Ce ? (C.sortIndex = W, s(j, C), u(p) === null && C === u(j) && (G ? (q(Q), Q = -1) : G = !0, B(ee, W - Ce))) : (C.sortIndex = _e, s(p, C), H || L || (H = !0, X || (X = !0, De()))), C;
    }, o.unstable_shouldYield = Xe, o.unstable_wrapCallback = function(C) {
      var D = U;
      return function() {
        var W = U;
        U = D;
        try {
          return C.apply(this, arguments);
        } finally {
          U = W;
        }
      };
    };
  })(go)), go;
}
var r1;
function Q4() {
  return r1 || (r1 = 1, ho.exports = V4()), ho.exports;
}
var po = { exports: {} }, at = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var i1;
function X4() {
  if (i1) return at;
  i1 = 1;
  var o = Bo();
  function s(p) {
    var j = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      j += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        j += "&args[]=" + encodeURIComponent(arguments[A]);
    }
    return "Minified React error #" + p + "; visit " + j + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, m = Symbol.for("react.portal");
  function h(p, j, A) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: S == null ? null : "" + S,
      children: p,
      containerInfo: j,
      implementation: A
    };
  }
  var x = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(p, j) {
    if (p === "font") return "";
    if (typeof j == "string")
      return j === "use-credentials" ? j : "";
  }
  return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, at.createPortal = function(p, j) {
    var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!j || j.nodeType !== 1 && j.nodeType !== 9 && j.nodeType !== 11)
      throw Error(s(299));
    return h(p, j, null, A);
  }, at.flushSync = function(p) {
    var j = x.T, A = c.p;
    try {
      if (x.T = null, c.p = 2, p) return p();
    } finally {
      x.T = j, c.p = A, c.d.f();
    }
  }, at.preconnect = function(p, j) {
    typeof p == "string" && (j ? (j = j.crossOrigin, j = typeof j == "string" ? j === "use-credentials" ? j : "" : void 0) : j = null, c.d.C(p, j));
  }, at.prefetchDNS = function(p) {
    typeof p == "string" && c.d.D(p);
  }, at.preinit = function(p, j) {
    if (typeof p == "string" && j && typeof j.as == "string") {
      var A = j.as, S = y(A, j.crossOrigin), U = typeof j.integrity == "string" ? j.integrity : void 0, L = typeof j.fetchPriority == "string" ? j.fetchPriority : void 0;
      A === "style" ? c.d.S(
        p,
        typeof j.precedence == "string" ? j.precedence : void 0,
        {
          crossOrigin: S,
          integrity: U,
          fetchPriority: L
        }
      ) : A === "script" && c.d.X(p, {
        crossOrigin: S,
        integrity: U,
        fetchPriority: L,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0
      });
    }
  }, at.preinitModule = function(p, j) {
    if (typeof p == "string")
      if (typeof j == "object" && j !== null) {
        if (j.as == null || j.as === "script") {
          var A = y(
            j.as,
            j.crossOrigin
          );
          c.d.M(p, {
            crossOrigin: A,
            integrity: typeof j.integrity == "string" ? j.integrity : void 0,
            nonce: typeof j.nonce == "string" ? j.nonce : void 0
          });
        }
      } else j == null && c.d.M(p);
  }, at.preload = function(p, j) {
    if (typeof p == "string" && typeof j == "object" && j !== null && typeof j.as == "string") {
      var A = j.as, S = y(A, j.crossOrigin);
      c.d.L(p, A, {
        crossOrigin: S,
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
  }, at.preloadModule = function(p, j) {
    if (typeof p == "string")
      if (j) {
        var A = y(j.as, j.crossOrigin);
        c.d.m(p, {
          as: typeof j.as == "string" && j.as !== "script" ? j.as : void 0,
          crossOrigin: A,
          integrity: typeof j.integrity == "string" ? j.integrity : void 0
        });
      } else c.d.m(p);
  }, at.requestFormReset = function(p) {
    c.d.r(p);
  }, at.unstable_batchedUpdates = function(p, j) {
    return p(j);
  }, at.useFormState = function(p, j, A) {
    return x.H.useFormState(p, j, A);
  }, at.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, at.version = "19.2.3", at;
}
var s1;
function B1() {
  if (s1) return po.exports;
  s1 = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return o(), po.exports = X4(), po.exports;
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
var u1;
function Z4() {
  if (u1) return Pn;
  u1 = 1;
  var o = Q4(), s = Bo(), u = B1();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m(e) {
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
  function y(e) {
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
  function j(e) {
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
        for (var d = !1, f = n.child; f; ) {
          if (f === l) {
            d = !0, l = n, a = r;
            break;
          }
          if (f === a) {
            d = !0, a = n, l = r;
            break;
          }
          f = f.sibling;
        }
        if (!d) {
          for (f = r.child; f; ) {
            if (f === l) {
              d = !0, l = r, a = n;
              break;
            }
            if (f === a) {
              d = !0, a = r, l = n;
              break;
            }
            f = f.sibling;
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
  var S = Object.assign, U = Symbol.for("react.element"), L = Symbol.for("react.transitional.element"), H = Symbol.for("react.portal"), G = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), q = Symbol.for("react.consumer"), ae = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), xe = Symbol.for("react.lazy"), Se = Symbol.for("react.activity"), Xe = Symbol.for("react.memo_cache_sentinel"), Ze = Symbol.iterator;
  function De(e) {
    return e === null || typeof e != "object" ? null : (e = Ze && e[Ze] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Le = Symbol.for("react.client.reference");
  function je(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case G:
        return "Fragment";
      case P:
        return "Profiler";
      case te:
        return "StrictMode";
      case ee:
        return "Suspense";
      case X:
        return "SuspenseList";
      case Se:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case H:
          return "Portal";
        case ae:
          return e.displayName || "Context";
        case q:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Q:
          return t = e.displayName || null, t !== null ? t : je(e.type) || "Memo";
        case xe:
          t = e._payload, e = e._init;
          try {
            return je(e(t));
          } catch {
          }
      }
    return null;
  }
  var B = Array.isArray, C = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ce = [], _e = -1;
  function b(e) {
    return { current: e };
  }
  function R(e) {
    0 > _e || (e.current = Ce[_e], Ce[_e] = null, _e--);
  }
  function Y(e, t) {
    _e++, Ce[_e] = e.current, e.current = t;
  }
  var $ = b(null), ne = b(null), se = b(null), ye = b(null);
  function rt(e, t) {
    switch (Y(se, t), Y(ne, e), Y($, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? C0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = C0(t), e = N0(t, e);
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
    R($), Y($, e);
  }
  function Ue() {
    R($), R(ne), R(se);
  }
  function nn(e) {
    e.memoizedState !== null && Y(ye, e);
    var t = $.current, l = N0(t, e.type);
    t !== l && (Y(ne, e), Y($, l));
  }
  function dr(e) {
    ne.current === e && (R($), R(ne)), ye.current === e && (R(ye), Kn._currentValue = W);
  }
  var Zi, Io;
  function Ll(e) {
    if (Zi === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Zi = t && t[1] || "", Io = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Zi + e + Io;
  }
  var $i = !1;
  function Ki(e, t) {
    if (!e || $i) return "";
    $i = !0;
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
      var r = a.DetermineComponentFrameRoot(), d = r[0], f = r[1];
      if (d && f) {
        var g = d.split(`
`), T = f.split(`
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
      $i = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Ll(l) : "";
  }
  function h2(e, t) {
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
        return Ki(e.type, !1);
      case 11:
        return Ki(e.type.render, !1);
      case 1:
        return Ki(e.type, !0);
      case 31:
        return Ll("Activity");
      default:
        return "";
    }
  }
  function Po(e) {
    try {
      var t = "", l = null;
      do
        t += h2(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ji = Object.prototype.hasOwnProperty, Fi = o.unstable_scheduleCallback, Wi = o.unstable_cancelCallback, g2 = o.unstable_shouldYield, p2 = o.unstable_requestPaint, gt = o.unstable_now, x2 = o.unstable_getCurrentPriorityLevel, ec = o.unstable_ImmediatePriority, tc = o.unstable_UserBlockingPriority, fr = o.unstable_NormalPriority, y2 = o.unstable_LowPriority, lc = o.unstable_IdlePriority, v2 = o.log, b2 = o.unstable_setDisableYieldValue, rn = null, pt = null;
  function dl(e) {
    if (typeof v2 == "function" && b2(e), pt && typeof pt.setStrictMode == "function")
      try {
        pt.setStrictMode(rn, e);
      } catch {
      }
  }
  var xt = Math.clz32 ? Math.clz32 : C2, S2 = Math.log, j2 = Math.LN2;
  function C2(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (S2(e) / j2 | 0) | 0;
  }
  var mr = 256, hr = 262144, gr = 4194304;
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
  function pr(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0, r = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~r, a !== 0 ? n = ql(a) : (d &= f, d !== 0 ? n = ql(d) : l || (l = f & ~e, l !== 0 && (n = ql(l))))) : (f = a & ~r, f !== 0 ? n = ql(f) : d !== 0 ? n = ql(d) : l || (l = a & ~e, l !== 0 && (n = ql(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & r) === 0 && (r = n & -n, l = t & -t, r >= l || r === 32 && (l & 4194048) !== 0) ? t : n;
  }
  function sn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function N2(e, t) {
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
  function ac() {
    var e = gr;
    return gr <<= 1, (gr & 62914560) === 0 && (gr = 4194304), e;
  }
  function Ii(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function un(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function E2(e, t, l, a, n, r) {
    var d = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var f = e.entanglements, g = e.expirationTimes, T = e.hiddenUpdates;
    for (l = d & ~l; 0 < l; ) {
      var M = 31 - xt(l), k = 1 << M;
      f[M] = 0, g[M] = -1;
      var _ = T[M];
      if (_ !== null)
        for (T[M] = null, M = 0; M < _.length; M++) {
          var z = _[M];
          z !== null && (z.lane &= -536870913);
        }
      l &= ~k;
    }
    a !== 0 && nc(e, a, 0), r !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(d & ~t));
  }
  function nc(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - xt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function rc(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - xt(l), n = 1 << a;
      n & t | e[a] & t && (e[a] |= t), l &= ~n;
    }
  }
  function ic(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Pi(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Pi(e) {
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
  function es(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function sc() {
    var e = D.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : $0(e.type));
  }
  function uc(e, t) {
    var l = D.p;
    try {
      return D.p = e, t();
    } finally {
      D.p = l;
    }
  }
  var fl = Math.random().toString(36).slice(2), Fe = "__reactFiber$" + fl, st = "__reactProps$" + fl, ca = "__reactContainer$" + fl, ts = "__reactEvents$" + fl, T2 = "__reactListeners$" + fl, _2 = "__reactHandles$" + fl, oc = "__reactResources$" + fl, on = "__reactMarker$" + fl;
  function ls(e) {
    delete e[Fe], delete e[st], delete e[ts], delete e[T2], delete e[_2];
  }
  function da(e) {
    var t = e[Fe];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[ca] || l[Fe]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = w0(e); e !== null; ) {
            if (l = e[Fe]) return l;
            e = w0(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function fa(e) {
    if (e = e[Fe] || e[ca]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function cn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function ma(e) {
    var t = e[oc];
    return t || (t = e[oc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ke(e) {
    e[on] = !0;
  }
  var cc = /* @__PURE__ */ new Set(), dc = {};
  function Gl(e, t) {
    ha(e, t), ha(e + "Capture", t);
  }
  function ha(e, t) {
    for (dc[e] = t, e = 0; e < t.length; e++)
      cc.add(t[e]);
  }
  var z2 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), fc = {}, mc = {};
  function A2(e) {
    return Ji.call(mc, e) ? !0 : Ji.call(fc, e) ? !1 : z2.test(e) ? mc[e] = !0 : (fc[e] = !0, !1);
  }
  function xr(e, t, l) {
    if (A2(t))
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
  function yr(e, t, l) {
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
  function Et(e) {
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
  function hc(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function M2(e, t, l) {
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
  function as(e) {
    if (!e._valueTracker) {
      var t = hc(e) ? "checked" : "value";
      e._valueTracker = M2(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function gc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = hc(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function vr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var w2 = /[\n"\\]/g;
  function Tt(e) {
    return e.replace(
      w2,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ns(e, t, l, a, n, r, d, f) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Et(t)) : e.value !== "" + Et(t) && (e.value = "" + Et(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? rs(e, d, Et(t)) : l != null ? rs(e, d, Et(l)) : a != null && e.removeAttribute("value"), n == null && r != null && (e.defaultChecked = !!r), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + Et(f) : e.removeAttribute("name");
  }
  function pc(e, t, l, a, n, r, d, f) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || l != null) {
      if (!(r !== "submit" && r !== "reset" || t != null)) {
        as(e);
        return;
      }
      l = l != null ? "" + Et(l) : "", t = t != null ? "" + Et(t) : l, f || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = f ? e.checked : !!a, e.defaultChecked = !!a, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), as(e);
  }
  function rs(e, t, l) {
    t === "number" && vr(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function ga(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < l.length; n++)
        t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Et(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          e[n].selected = !0, a && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function xc(e, t, l) {
    if (t != null && (t = "" + Et(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Et(l) : "";
  }
  function yc(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(c(92));
        if (B(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = Et(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), as(e);
  }
  function pa(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var k2 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function vc(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || k2.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function bc(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && l[n] !== a && vc(e, n, a);
    } else
      for (var r in t)
        t.hasOwnProperty(r) && vc(e, r, t[r]);
  }
  function is(e) {
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
  var O2 = /* @__PURE__ */ new Map([
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
  ]), R2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function br(e) {
    return R2.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function $t() {
  }
  var ss = null;
  function us(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var xa = null, ya = null;
  function Sc(e) {
    var t = fa(e);
    if (t && (e = t.stateNode)) {
      var l = e[st] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ns(
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
                var n = a[st] || null;
                if (!n) throw Error(c(90));
                ns(
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
              a = l[t], a.form === e.form && gc(a);
          }
          break e;
        case "textarea":
          xc(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && ga(e, !!l.multiple, t, !1);
      }
    }
  }
  var os = !1;
  function jc(e, t, l) {
    if (os) return e(t, l);
    os = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (os = !1, (xa !== null || ya !== null) && (si(), xa && (t = xa, e = ya, ya = xa = null, Sc(t), e)))
        for (t = 0; t < e.length; t++) Sc(e[t]);
    }
  }
  function dn(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[st] || null;
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
  var Kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), cs = !1;
  if (Kt)
    try {
      var fn = {};
      Object.defineProperty(fn, "passive", {
        get: function() {
          cs = !0;
        }
      }), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn);
    } catch {
      cs = !1;
    }
  var ml = null, ds = null, Sr = null;
  function Cc() {
    if (Sr) return Sr;
    var e, t = ds, l = t.length, a, n = "value" in ml ? ml.value : ml.textContent, r = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++) ;
    var d = l - e;
    for (a = 1; a <= d && t[l - a] === n[r - a]; a++) ;
    return Sr = n.slice(e, 1 < a ? 1 - a : void 0);
  }
  function jr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Cr() {
    return !0;
  }
  function Nc() {
    return !1;
  }
  function ut(e) {
    function t(l, a, n, r, d) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = r, this.target = d, this.currentTarget = null;
      for (var f in e)
        e.hasOwnProperty(f) && (l = e[f], this[f] = l ? l(r) : r[f]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Cr : Nc, this.isPropagationStopped = Nc, this;
    }
    return S(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Cr);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Cr);
      },
      persist: function() {
      },
      isPersistent: Cr
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
  }, Nr = ut(Yl), mn = S({}, Yl, { view: 0, detail: 0 }), D2 = ut(mn), fs, ms, hn, Er = S({}, mn, {
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
    getModifierState: gs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== hn && (hn && e.type === "mousemove" ? (fs = e.screenX - hn.screenX, ms = e.screenY - hn.screenY) : ms = fs = 0, hn = e), fs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ms;
    }
  }), Ec = ut(Er), U2 = S({}, Er, { dataTransfer: 0 }), B2 = ut(U2), H2 = S({}, mn, { relatedTarget: 0 }), hs = ut(H2), L2 = S({}, Yl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), q2 = ut(L2), G2 = S({}, Yl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Y2 = ut(G2), V2 = S({}, Yl, { data: 0 }), Tc = ut(V2), Q2 = {
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
  }, X2 = {
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
  }, Z2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function $2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Z2[e]) ? !!t[e] : !1;
  }
  function gs() {
    return $2;
  }
  var K2 = S({}, mn, {
    key: function(e) {
      if (e.key) {
        var t = Q2[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = jr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? X2[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: gs,
    charCode: function(e) {
      return e.type === "keypress" ? jr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? jr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), J2 = ut(K2), F2 = S({}, Er, {
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
  }), _c = ut(F2), W2 = S({}, mn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: gs
  }), I2 = ut(W2), P2 = S({}, Yl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), em = ut(P2), tm = S({}, Er, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), lm = ut(tm), am = S({}, Yl, {
    newState: 0,
    oldState: 0
  }), nm = ut(am), rm = [9, 13, 27, 32], ps = Kt && "CompositionEvent" in window, gn = null;
  Kt && "documentMode" in document && (gn = document.documentMode);
  var im = Kt && "TextEvent" in window && !gn, zc = Kt && (!ps || gn && 8 < gn && 11 >= gn), Ac = " ", Mc = !1;
  function wc(e, t) {
    switch (e) {
      case "keyup":
        return rm.indexOf(t.keyCode) !== -1;
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
  function kc(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var va = !1;
  function sm(e, t) {
    switch (e) {
      case "compositionend":
        return kc(t);
      case "keypress":
        return t.which !== 32 ? null : (Mc = !0, Ac);
      case "textInput":
        return e = t.data, e === Ac && Mc ? null : e;
      default:
        return null;
    }
  }
  function um(e, t) {
    if (va)
      return e === "compositionend" || !ps && wc(e, t) ? (e = Cc(), Sr = ds = ml = null, va = !1, e) : null;
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
        return zc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var om = {
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
  function Oc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!om[e.type] : t === "textarea";
  }
  function Rc(e, t, l, a) {
    xa ? ya ? ya.push(a) : ya = [a] : xa = a, t = hi(t, "onChange"), 0 < t.length && (l = new Nr(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var pn = null, xn = null;
  function cm(e) {
    x0(e, 0);
  }
  function Tr(e) {
    var t = cn(e);
    if (gc(t)) return e;
  }
  function Dc(e, t) {
    if (e === "change") return t;
  }
  var Uc = !1;
  if (Kt) {
    var xs;
    if (Kt) {
      var ys = "oninput" in document;
      if (!ys) {
        var Bc = document.createElement("div");
        Bc.setAttribute("oninput", "return;"), ys = typeof Bc.oninput == "function";
      }
      xs = ys;
    } else xs = !1;
    Uc = xs && (!document.documentMode || 9 < document.documentMode);
  }
  function Hc() {
    pn && (pn.detachEvent("onpropertychange", Lc), xn = pn = null);
  }
  function Lc(e) {
    if (e.propertyName === "value" && Tr(xn)) {
      var t = [];
      Rc(
        t,
        xn,
        e,
        us(e)
      ), jc(cm, t);
    }
  }
  function dm(e, t, l) {
    e === "focusin" ? (Hc(), pn = t, xn = l, pn.attachEvent("onpropertychange", Lc)) : e === "focusout" && Hc();
  }
  function fm(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Tr(xn);
  }
  function mm(e, t) {
    if (e === "click") return Tr(t);
  }
  function hm(e, t) {
    if (e === "input" || e === "change")
      return Tr(t);
  }
  function gm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var yt = typeof Object.is == "function" ? Object.is : gm;
  function yn(e, t) {
    if (yt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Ji.call(t, n) || !yt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function qc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Gc(e, t) {
    var l = qc(e);
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
      l = qc(l);
    }
  }
  function Yc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Yc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Vc(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = vr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = vr(e.document);
    }
    return t;
  }
  function vs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var pm = Kt && "documentMode" in document && 11 >= document.documentMode, ba = null, bs = null, vn = null, Ss = !1;
  function Qc(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ss || ba == null || ba !== vr(a) || (a = ba, "selectionStart" in a && vs(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), vn && yn(vn, a) || (vn = a, a = hi(bs, "onSelect"), 0 < a.length && (t = new Nr(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = ba)));
  }
  function Vl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Sa = {
    animationend: Vl("Animation", "AnimationEnd"),
    animationiteration: Vl("Animation", "AnimationIteration"),
    animationstart: Vl("Animation", "AnimationStart"),
    transitionrun: Vl("Transition", "TransitionRun"),
    transitionstart: Vl("Transition", "TransitionStart"),
    transitioncancel: Vl("Transition", "TransitionCancel"),
    transitionend: Vl("Transition", "TransitionEnd")
  }, js = {}, Xc = {};
  Kt && (Xc = document.createElement("div").style, "AnimationEvent" in window || (delete Sa.animationend.animation, delete Sa.animationiteration.animation, delete Sa.animationstart.animation), "TransitionEvent" in window || delete Sa.transitionend.transition);
  function Ql(e) {
    if (js[e]) return js[e];
    if (!Sa[e]) return e;
    var t = Sa[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Xc)
        return js[e] = t[l];
    return e;
  }
  var Zc = Ql("animationend"), $c = Ql("animationiteration"), Kc = Ql("animationstart"), xm = Ql("transitionrun"), ym = Ql("transitionstart"), vm = Ql("transitioncancel"), Jc = Ql("transitionend"), Fc = /* @__PURE__ */ new Map(), Cs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Cs.push("scrollEnd");
  function Ut(e, t) {
    Fc.set(e, t), Gl(t, [e]);
  }
  var _r = typeof reportError == "function" ? reportError : function(e) {
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
  }, _t = [], ja = 0, Ns = 0;
  function zr() {
    for (var e = ja, t = Ns = ja = 0; t < e; ) {
      var l = _t[t];
      _t[t++] = null;
      var a = _t[t];
      _t[t++] = null;
      var n = _t[t];
      _t[t++] = null;
      var r = _t[t];
      if (_t[t++] = null, a !== null && n !== null) {
        var d = a.pending;
        d === null ? n.next = n : (n.next = d.next, d.next = n), a.pending = n;
      }
      r !== 0 && Wc(l, n, r);
    }
  }
  function Ar(e, t, l, a) {
    _t[ja++] = e, _t[ja++] = t, _t[ja++] = l, _t[ja++] = a, Ns |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Es(e, t, l, a) {
    return Ar(e, t, l, a), Mr(e);
  }
  function Xl(e, t) {
    return Ar(e, null, null, t), Mr(e);
  }
  function Wc(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, r = e.return; r !== null; )
      r.childLanes |= l, a = r.alternate, a !== null && (a.childLanes |= l), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (n = !0)), e = r, r = r.return;
    return e.tag === 3 ? (r = e.stateNode, n && t !== null && (n = 31 - xt(l), e = r.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), r) : null;
  }
  function Mr(e) {
    if (50 < Gn)
      throw Gn = 0, Ru = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ca = {};
  function bm(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function vt(e, t, l, a) {
    return new bm(e, t, l, a);
  }
  function Ts(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Jt(e, t) {
    var l = e.alternate;
    return l === null ? (l = vt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Ic(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function wr(e, t, l, a, n, r) {
    var d = 0;
    if (a = e, typeof e == "function") Ts(e) && (d = 1);
    else if (typeof e == "string")
      d = E4(
        e,
        l,
        $.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Se:
          return e = vt(31, l, t, n), e.elementType = Se, e.lanes = r, e;
        case G:
          return Zl(l.children, n, r, t);
        case te:
          d = 8, n |= 24;
          break;
        case P:
          return e = vt(12, l, t, n | 2), e.elementType = P, e.lanes = r, e;
        case ee:
          return e = vt(13, l, t, n), e.elementType = ee, e.lanes = r, e;
        case X:
          return e = vt(19, l, t, n), e.elementType = X, e.lanes = r, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ae:
                d = 10;
                break e;
              case q:
                d = 9;
                break e;
              case V:
                d = 11;
                break e;
              case Q:
                d = 14;
                break e;
              case xe:
                d = 16, a = null;
                break e;
            }
          d = 29, l = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = vt(d, l, t, n), t.elementType = e, t.type = a, t.lanes = r, t;
  }
  function Zl(e, t, l, a) {
    return e = vt(7, e, a, t), e.lanes = l, e;
  }
  function _s(e, t, l) {
    return e = vt(6, e, null, t), e.lanes = l, e;
  }
  function Pc(e) {
    var t = vt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function zs(e, t, l) {
    return t = vt(
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
  var ed = /* @__PURE__ */ new WeakMap();
  function zt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = ed.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Po(t)
      }, ed.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Po(t)
    };
  }
  var Na = [], Ea = 0, kr = null, bn = 0, At = [], Mt = 0, hl = null, Lt = 1, qt = "";
  function Ft(e, t) {
    Na[Ea++] = bn, Na[Ea++] = kr, kr = e, bn = t;
  }
  function td(e, t, l) {
    At[Mt++] = Lt, At[Mt++] = qt, At[Mt++] = hl, hl = e;
    var a = Lt;
    e = qt;
    var n = 32 - xt(a) - 1;
    a &= ~(1 << n), l += 1;
    var r = 32 - xt(t) + n;
    if (30 < r) {
      var d = n - n % 5;
      r = (a & (1 << d) - 1).toString(32), a >>= d, n -= d, Lt = 1 << 32 - xt(t) + n | l << n | a, qt = r + e;
    } else
      Lt = 1 << r | l << n | a, qt = e;
  }
  function As(e) {
    e.return !== null && (Ft(e, 1), td(e, 1, 0));
  }
  function Ms(e) {
    for (; e === kr; )
      kr = Na[--Ea], Na[Ea] = null, bn = Na[--Ea], Na[Ea] = null;
    for (; e === hl; )
      hl = At[--Mt], At[Mt] = null, qt = At[--Mt], At[Mt] = null, Lt = At[--Mt], At[Mt] = null;
  }
  function ld(e, t) {
    At[Mt++] = Lt, At[Mt++] = qt, At[Mt++] = hl, Lt = t.id, qt = t.overflow, hl = e;
  }
  var We = null, Me = null, fe = !1, gl = null, wt = !1, ws = Error(c(519));
  function pl(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Sn(zt(t, e)), ws;
  }
  function ad(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Fe] = e, t[st] = a, l) {
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
        for (l = 0; l < Vn.length; l++)
          oe(Vn[l], t);
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
        oe("invalid", t), pc(
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
        oe("invalid", t), yc(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || S0(t.textContent, l) ? (a.popover != null && (oe("beforetoggle", t), oe("toggle", t)), a.onScroll != null && oe("scroll", t), a.onScrollEnd != null && oe("scrollend", t), a.onClick != null && (t.onclick = $t), t = !0) : t = !1, t || pl(e, !0);
  }
  function nd(e) {
    for (We = e.return; We; )
      switch (We.tag) {
        case 5:
        case 31:
        case 13:
          wt = !1;
          return;
        case 27:
        case 3:
          wt = !0;
          return;
        default:
          We = We.return;
      }
  }
  function Ta(e) {
    if (e !== We) return !1;
    if (!fe) return nd(e), fe = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Ju(e.type, e.memoizedProps)), l = !l), l && Me && pl(e), nd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Me = M0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Me = M0(e);
    } else
      t === 27 ? (t = Me, Ml(e.type) ? (e = eo, eo = null, Me = e) : Me = t) : Me = We ? Ot(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $l() {
    Me = We = null, fe = !1;
  }
  function ks() {
    var e = gl;
    return e !== null && (ft === null ? ft = e : ft.push.apply(
      ft,
      e
    ), gl = null), e;
  }
  function Sn(e) {
    gl === null ? gl = [e] : gl.push(e);
  }
  var Os = b(null), Kl = null, Wt = null;
  function xl(e, t, l) {
    Y(Os, t._currentValue), t._currentValue = l;
  }
  function It(e) {
    e._currentValue = Os.current, R(Os);
  }
  function Rs(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function Ds(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var r = n.dependencies;
      if (r !== null) {
        var d = n.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var f = r;
          r = n;
          for (var g = 0; g < t.length; g++)
            if (f.context === t[g]) {
              r.lanes |= l, f = r.alternate, f !== null && (f.lanes |= l), Rs(
                r.return,
                l,
                e
              ), a || (d = null);
              break e;
            }
          r = f.next;
        }
      } else if (n.tag === 18) {
        if (d = n.return, d === null) throw Error(c(341));
        d.lanes |= l, r = d.alternate, r !== null && (r.lanes |= l), Rs(d, l, e), d = null;
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
  function _a(e, t, l, a) {
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
          var f = n.type;
          yt(n.pendingProps.value, d.value) || (e !== null ? e.push(f) : e = [f]);
        }
      } else if (n === ye.current) {
        if (d = n.alternate, d === null) throw Error(c(387));
        d.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Kn) : e = [Kn]);
      }
      n = n.return;
    }
    e !== null && Ds(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function Or(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!yt(
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
  function Ie(e) {
    return rd(Kl, e);
  }
  function Rr(e, t) {
    return Kl === null && Jl(e), rd(e, t);
  }
  function rd(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Wt === null) {
      if (e === null) throw Error(c(308));
      Wt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Wt = Wt.next = t;
    return l;
  }
  var Sm = typeof AbortController < "u" ? AbortController : function() {
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
  }, jm = o.unstable_scheduleCallback, Cm = o.unstable_NormalPriority, qe = {
    $$typeof: ae,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Us() {
    return {
      controller: new Sm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function jn(e) {
    e.refCount--, e.refCount === 0 && jm(Cm, function() {
      e.controller.abort();
    });
  }
  var Cn = null, Bs = 0, za = 0, Aa = null;
  function Nm(e, t) {
    if (Cn === null) {
      var l = Cn = [];
      Bs = 0, za = qu(), Aa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return Bs++, t.then(id, id), t;
  }
  function id() {
    if (--Bs === 0 && Cn !== null) {
      Aa !== null && (Aa.status = "fulfilled");
      var e = Cn;
      Cn = null, za = 0, Aa = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Em(e, t) {
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
  var sd = C.S;
  C.S = function(e, t) {
    Xf = gt(), typeof t == "object" && t !== null && typeof t.then == "function" && Nm(e, t), sd !== null && sd(e, t);
  };
  var Fl = b(null);
  function Hs() {
    var e = Fl.current;
    return e !== null ? e : ze.pooledCache;
  }
  function Dr(e, t) {
    t === null ? Y(Fl, Fl.current) : Y(Fl, t.pool);
  }
  function ud() {
    var e = Hs();
    return e === null ? null : { parent: qe._currentValue, pool: e };
  }
  var Ma = Error(c(460)), Ls = Error(c(474)), Ur = Error(c(542)), Br = { then: function() {
  } };
  function od(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function cd(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then($t, $t), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, fd(e), e;
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
            throw e = t.reason, fd(e), e;
        }
        throw Il = t, Ma;
    }
  }
  function Wl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Il = l, Ma) : l;
    }
  }
  var Il = null;
  function dd() {
    if (Il === null) throw Error(c(459));
    var e = Il;
    return Il = null, e;
  }
  function fd(e) {
    if (e === Ma || e === Ur)
      throw Error(c(483));
  }
  var wa = null, Nn = 0;
  function Hr(e) {
    var t = Nn;
    return Nn += 1, wa === null && (wa = []), cd(wa, e, t);
  }
  function En(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Lr(e, t) {
    throw t.$$typeof === U ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function md(e) {
    function t(N, v) {
      if (e) {
        var E = N.deletions;
        E === null ? (N.deletions = [v], N.flags |= 16) : E.push(v);
      }
    }
    function l(N, v) {
      if (!e) return null;
      for (; v !== null; )
        t(N, v), v = v.sibling;
      return null;
    }
    function a(N) {
      for (var v = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? v.set(N.key, N) : v.set(N.index, N), N = N.sibling;
      return v;
    }
    function n(N, v) {
      return N = Jt(N, v), N.index = 0, N.sibling = null, N;
    }
    function r(N, v, E) {
      return N.index = E, e ? (E = N.alternate, E !== null ? (E = E.index, E < v ? (N.flags |= 67108866, v) : E) : (N.flags |= 67108866, v)) : (N.flags |= 1048576, v);
    }
    function d(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function f(N, v, E, w) {
      return v === null || v.tag !== 6 ? (v = _s(E, N.mode, w), v.return = N, v) : (v = n(v, E), v.return = N, v);
    }
    function g(N, v, E, w) {
      var F = E.type;
      return F === G ? M(
        N,
        v,
        E.props.children,
        w,
        E.key
      ) : v !== null && (v.elementType === F || typeof F == "object" && F !== null && F.$$typeof === xe && Wl(F) === v.type) ? (v = n(v, E.props), En(v, E), v.return = N, v) : (v = wr(
        E.type,
        E.key,
        E.props,
        null,
        N.mode,
        w
      ), En(v, E), v.return = N, v);
    }
    function T(N, v, E, w) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== E.containerInfo || v.stateNode.implementation !== E.implementation ? (v = zs(E, N.mode, w), v.return = N, v) : (v = n(v, E.children || []), v.return = N, v);
    }
    function M(N, v, E, w, F) {
      return v === null || v.tag !== 7 ? (v = Zl(
        E,
        N.mode,
        w,
        F
      ), v.return = N, v) : (v = n(v, E), v.return = N, v);
    }
    function k(N, v, E) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return v = _s(
          "" + v,
          N.mode,
          E
        ), v.return = N, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case L:
            return E = wr(
              v.type,
              v.key,
              v.props,
              null,
              N.mode,
              E
            ), En(E, v), E.return = N, E;
          case H:
            return v = zs(
              v,
              N.mode,
              E
            ), v.return = N, v;
          case xe:
            return v = Wl(v), k(N, v, E);
        }
        if (B(v) || De(v))
          return v = Zl(
            v,
            N.mode,
            E,
            null
          ), v.return = N, v;
        if (typeof v.then == "function")
          return k(N, Hr(v), E);
        if (v.$$typeof === ae)
          return k(
            N,
            Rr(N, v),
            E
          );
        Lr(N, v);
      }
      return null;
    }
    function _(N, v, E, w) {
      var F = v !== null ? v.key : null;
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return F !== null ? null : f(N, v, "" + E, w);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case L:
            return E.key === F ? g(N, v, E, w) : null;
          case H:
            return E.key === F ? T(N, v, E, w) : null;
          case xe:
            return E = Wl(E), _(N, v, E, w);
        }
        if (B(E) || De(E))
          return F !== null ? null : M(N, v, E, w, null);
        if (typeof E.then == "function")
          return _(
            N,
            v,
            Hr(E),
            w
          );
        if (E.$$typeof === ae)
          return _(
            N,
            v,
            Rr(N, E),
            w
          );
        Lr(N, E);
      }
      return null;
    }
    function z(N, v, E, w, F) {
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return N = N.get(E) || null, f(v, N, "" + w, F);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case L:
            return N = N.get(
              w.key === null ? E : w.key
            ) || null, g(v, N, w, F);
          case H:
            return N = N.get(
              w.key === null ? E : w.key
            ) || null, T(v, N, w, F);
          case xe:
            return w = Wl(w), z(
              N,
              v,
              E,
              w,
              F
            );
        }
        if (B(w) || De(w))
          return N = N.get(E) || null, M(v, N, w, F, null);
        if (typeof w.then == "function")
          return z(
            N,
            v,
            E,
            Hr(w),
            F
          );
        if (w.$$typeof === ae)
          return z(
            N,
            v,
            E,
            Rr(v, w),
            F
          );
        Lr(v, w);
      }
      return null;
    }
    function Z(N, v, E, w) {
      for (var F = null, me = null, K = v, ie = v = 0, de = null; K !== null && ie < E.length; ie++) {
        K.index > ie ? (de = K, K = null) : de = K.sibling;
        var he = _(
          N,
          K,
          E[ie],
          w
        );
        if (he === null) {
          K === null && (K = de);
          break;
        }
        e && K && he.alternate === null && t(N, K), v = r(he, v, ie), me === null ? F = he : me.sibling = he, me = he, K = de;
      }
      if (ie === E.length)
        return l(N, K), fe && Ft(N, ie), F;
      if (K === null) {
        for (; ie < E.length; ie++)
          K = k(N, E[ie], w), K !== null && (v = r(
            K,
            v,
            ie
          ), me === null ? F = K : me.sibling = K, me = K);
        return fe && Ft(N, ie), F;
      }
      for (K = a(K); ie < E.length; ie++)
        de = z(
          K,
          N,
          ie,
          E[ie],
          w
        ), de !== null && (e && de.alternate !== null && K.delete(
          de.key === null ? ie : de.key
        ), v = r(
          de,
          v,
          ie
        ), me === null ? F = de : me.sibling = de, me = de);
      return e && K.forEach(function(Dl) {
        return t(N, Dl);
      }), fe && Ft(N, ie), F;
    }
    function I(N, v, E, w) {
      if (E == null) throw Error(c(151));
      for (var F = null, me = null, K = v, ie = v = 0, de = null, he = E.next(); K !== null && !he.done; ie++, he = E.next()) {
        K.index > ie ? (de = K, K = null) : de = K.sibling;
        var Dl = _(N, K, he.value, w);
        if (Dl === null) {
          K === null && (K = de);
          break;
        }
        e && K && Dl.alternate === null && t(N, K), v = r(Dl, v, ie), me === null ? F = Dl : me.sibling = Dl, me = Dl, K = de;
      }
      if (he.done)
        return l(N, K), fe && Ft(N, ie), F;
      if (K === null) {
        for (; !he.done; ie++, he = E.next())
          he = k(N, he.value, w), he !== null && (v = r(he, v, ie), me === null ? F = he : me.sibling = he, me = he);
        return fe && Ft(N, ie), F;
      }
      for (K = a(K); !he.done; ie++, he = E.next())
        he = z(K, N, ie, he.value, w), he !== null && (e && he.alternate !== null && K.delete(he.key === null ? ie : he.key), v = r(he, v, ie), me === null ? F = he : me.sibling = he, me = he);
      return e && K.forEach(function(U4) {
        return t(N, U4);
      }), fe && Ft(N, ie), F;
    }
    function Te(N, v, E, w) {
      if (typeof E == "object" && E !== null && E.type === G && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case L:
            e: {
              for (var F = E.key; v !== null; ) {
                if (v.key === F) {
                  if (F = E.type, F === G) {
                    if (v.tag === 7) {
                      l(
                        N,
                        v.sibling
                      ), w = n(
                        v,
                        E.props.children
                      ), w.return = N, N = w;
                      break e;
                    }
                  } else if (v.elementType === F || typeof F == "object" && F !== null && F.$$typeof === xe && Wl(F) === v.type) {
                    l(
                      N,
                      v.sibling
                    ), w = n(v, E.props), En(w, E), w.return = N, N = w;
                    break e;
                  }
                  l(N, v);
                  break;
                } else t(N, v);
                v = v.sibling;
              }
              E.type === G ? (w = Zl(
                E.props.children,
                N.mode,
                w,
                E.key
              ), w.return = N, N = w) : (w = wr(
                E.type,
                E.key,
                E.props,
                null,
                N.mode,
                w
              ), En(w, E), w.return = N, N = w);
            }
            return d(N);
          case H:
            e: {
              for (F = E.key; v !== null; ) {
                if (v.key === F)
                  if (v.tag === 4 && v.stateNode.containerInfo === E.containerInfo && v.stateNode.implementation === E.implementation) {
                    l(
                      N,
                      v.sibling
                    ), w = n(v, E.children || []), w.return = N, N = w;
                    break e;
                  } else {
                    l(N, v);
                    break;
                  }
                else t(N, v);
                v = v.sibling;
              }
              w = zs(E, N.mode, w), w.return = N, N = w;
            }
            return d(N);
          case xe:
            return E = Wl(E), Te(
              N,
              v,
              E,
              w
            );
        }
        if (B(E))
          return Z(
            N,
            v,
            E,
            w
          );
        if (De(E)) {
          if (F = De(E), typeof F != "function") throw Error(c(150));
          return E = F.call(E), I(
            N,
            v,
            E,
            w
          );
        }
        if (typeof E.then == "function")
          return Te(
            N,
            v,
            Hr(E),
            w
          );
        if (E.$$typeof === ae)
          return Te(
            N,
            v,
            Rr(N, E),
            w
          );
        Lr(N, E);
      }
      return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, v !== null && v.tag === 6 ? (l(N, v.sibling), w = n(v, E), w.return = N, N = w) : (l(N, v), w = _s(E, N.mode, w), w.return = N, N = w), d(N)) : l(N, v);
    }
    return function(N, v, E, w) {
      try {
        Nn = 0;
        var F = Te(
          N,
          v,
          E,
          w
        );
        return wa = null, F;
      } catch (K) {
        if (K === Ma || K === Ur) throw K;
        var me = vt(29, K, null, N.mode);
        return me.lanes = w, me.return = N, me;
      } finally {
      }
    };
  }
  var Pl = md(!0), hd = md(!1), yl = !1;
  function qs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Gs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function vl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function bl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ge & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Mr(e), Wc(e, null, l), t;
    }
    return Ar(e, a, t, l), Mr(e);
  }
  function Tn(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, rc(e, l);
    }
  }
  function Ys(e, t) {
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
  var Vs = !1;
  function _n() {
    if (Vs) {
      var e = Aa;
      if (e !== null) throw e;
    }
  }
  function zn(e, t, l, a) {
    Vs = !1;
    var n = e.updateQueue;
    yl = !1;
    var r = n.firstBaseUpdate, d = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var g = f, T = g.next;
      g.next = null, d === null ? r = T : d.next = T, d = g;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, f = M.lastBaseUpdate, f !== d && (f === null ? M.firstBaseUpdate = T : f.next = T, M.lastBaseUpdate = g));
    }
    if (r !== null) {
      var k = n.baseState;
      d = 0, M = T = g = null, f = r;
      do {
        var _ = f.lane & -536870913, z = _ !== f.lane;
        if (z ? (ce & _) === _ : (a & _) === _) {
          _ !== 0 && _ === za && (Vs = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var Z = e, I = f;
            _ = t;
            var Te = l;
            switch (I.tag) {
              case 1:
                if (Z = I.payload, typeof Z == "function") {
                  k = Z.call(Te, k, _);
                  break e;
                }
                k = Z;
                break e;
              case 3:
                Z.flags = Z.flags & -65537 | 128;
              case 0:
                if (Z = I.payload, _ = typeof Z == "function" ? Z.call(Te, k, _) : Z, _ == null) break e;
                k = S({}, k, _);
                break e;
              case 2:
                yl = !0;
            }
          }
          _ = f.callback, _ !== null && (e.flags |= 64, z && (e.flags |= 8192), z = n.callbacks, z === null ? n.callbacks = [_] : z.push(_));
        } else
          z = {
            lane: _,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, M === null ? (T = M = z, g = k) : M = M.next = z, d |= _;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          z = f, f = z.next, z.next = null, n.lastBaseUpdate = z, n.shared.pending = null;
        }
      } while (!0);
      M === null && (g = k), n.baseState = g, n.firstBaseUpdate = T, n.lastBaseUpdate = M, r === null && (n.shared.lanes = 0), El |= d, e.lanes = d, e.memoizedState = k;
    }
  }
  function gd(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function pd(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        gd(l[e], t);
  }
  var ka = b(null), qr = b(0);
  function xd(e, t) {
    e = sl, Y(qr, e), Y(ka, t), sl = e | t.baseLanes;
  }
  function Qs() {
    Y(qr, sl), Y(ka, ka.current);
  }
  function Xs() {
    sl = qr.current, R(ka), R(qr);
  }
  var bt = b(null), kt = null;
  function Sl(e) {
    var t = e.alternate;
    Y(Be, Be.current & 1), Y(bt, e), kt === null && (t === null || ka.current !== null || t.memoizedState !== null) && (kt = e);
  }
  function Zs(e) {
    Y(Be, Be.current), Y(bt, e), kt === null && (kt = e);
  }
  function yd(e) {
    e.tag === 22 ? (Y(Be, Be.current), Y(bt, e), kt === null && (kt = e)) : jl();
  }
  function jl() {
    Y(Be, Be.current), Y(bt, bt.current);
  }
  function St(e) {
    R(bt), kt === e && (kt = null), R(Be);
  }
  var Be = b(0);
  function Gr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Iu(l) || Pu(l)))
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
  var Pt = 0, re = null, Ne = null, Ge = null, Yr = !1, Oa = !1, ea = !1, Vr = 0, An = 0, Ra = null, Tm = 0;
  function Oe() {
    throw Error(c(321));
  }
  function $s(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!yt(e[l], t[l])) return !1;
    return !0;
  }
  function Ks(e, t, l, a, n, r) {
    return Pt = r, re = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e === null || e.memoizedState === null ? tf : ou, ea = !1, r = l(a, n), ea = !1, Oa && (r = bd(
      t,
      l,
      a,
      n
    )), vd(e), r;
  }
  function vd(e) {
    C.H = kn;
    var t = Ne !== null && Ne.next !== null;
    if (Pt = 0, Ge = Ne = re = null, Yr = !1, An = 0, Ra = null, t) throw Error(c(300));
    e === null || Ye || (e = e.dependencies, e !== null && Or(e) && (Ye = !0));
  }
  function bd(e, t, l, a) {
    re = e;
    var n = 0;
    do {
      if (Oa && (Ra = null), An = 0, Oa = !1, 25 <= n) throw Error(c(301));
      if (n += 1, Ge = Ne = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      C.H = lf, r = t(l, a);
    } while (Oa);
    return r;
  }
  function _m() {
    var e = C.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Mn(t) : t, e = e.useState()[0], (Ne !== null ? Ne.memoizedState : null) !== e && (re.flags |= 1024), t;
  }
  function Js() {
    var e = Vr !== 0;
    return Vr = 0, e;
  }
  function Fs(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Ws(e) {
    if (Yr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Yr = !1;
    }
    Pt = 0, Ge = Ne = re = null, Oa = !1, An = Vr = 0, Ra = null;
  }
  function it() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ge === null ? re.memoizedState = Ge = e : Ge = Ge.next = e, Ge;
  }
  function He() {
    if (Ne === null) {
      var e = re.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = Ge === null ? re.memoizedState : Ge.next;
    if (t !== null)
      Ge = t, Ne = e;
    else {
      if (e === null)
        throw re.alternate === null ? Error(c(467)) : Error(c(310));
      Ne = e, e = {
        memoizedState: Ne.memoizedState,
        baseState: Ne.baseState,
        baseQueue: Ne.baseQueue,
        queue: Ne.queue,
        next: null
      }, Ge === null ? re.memoizedState = Ge = e : Ge = Ge.next = e;
    }
    return Ge;
  }
  function Qr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Mn(e) {
    var t = An;
    return An += 1, Ra === null && (Ra = []), e = cd(Ra, e, t), t = re, (Ge === null ? t.memoizedState : Ge.next) === null && (t = t.alternate, C.H = t === null || t.memoizedState === null ? tf : ou), e;
  }
  function Xr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Mn(e);
      if (e.$$typeof === ae) return Ie(e);
    }
    throw Error(c(438, String(e)));
  }
  function Is(e) {
    var t = null, l = re.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = re.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Qr(), re.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = Xe;
    return t.index++, l;
  }
  function el(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Zr(e) {
    var t = He();
    return Ps(t, Ne, e);
  }
  function Ps(e, t, l) {
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
      var f = d = null, g = null, T = t, M = !1;
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
            }), k === za && (M = !0);
          else if ((Pt & _) === _) {
            T = T.next, _ === za && (M = !0);
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
            }, g === null ? (f = g = k, d = r) : g = g.next = k, re.lanes |= _, El |= _;
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
          }, g === null ? (f = g = _, d = r) : g = g.next = _, re.lanes |= k, El |= k;
        T = T.next;
      } while (T !== null && T !== t);
      if (g === null ? d = r : g.next = f, !yt(r, e.memoizedState) && (Ye = !0, M && (l = Aa, l !== null)))
        throw l;
      e.memoizedState = r, e.baseState = d, e.baseQueue = g, a.lastRenderedState = r;
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function eu(e) {
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
      yt(r, t.memoizedState) || (Ye = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), l.lastRenderedState = r;
    }
    return [r, a];
  }
  function Sd(e, t, l) {
    var a = re, n = He(), r = fe;
    if (r) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = t();
    var d = !yt(
      (Ne || n).memoizedState,
      l
    );
    if (d && (n.memoizedState = l, Ye = !0), n = n.queue, au(Nd.bind(null, a, n, e), [
      e
    ]), n.getSnapshot !== t || d || Ge !== null && Ge.memoizedState.tag & 1) {
      if (a.flags |= 2048, Da(
        9,
        { destroy: void 0 },
        Cd.bind(
          null,
          a,
          n,
          l,
          t
        ),
        null
      ), ze === null) throw Error(c(349));
      r || (Pt & 127) !== 0 || jd(a, t, l);
    }
    return l;
  }
  function jd(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = re.updateQueue, t === null ? (t = Qr(), re.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Cd(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Ed(t) && Td(e);
  }
  function Nd(e, t, l) {
    return l(function() {
      Ed(t) && Td(e);
    });
  }
  function Ed(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !yt(e, l);
    } catch {
      return !0;
    }
  }
  function Td(e) {
    var t = Xl(e, 2);
    t !== null && mt(t, e, 2);
  }
  function tu(e) {
    var t = it();
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
  function _d(e, t, l, a) {
    return e.baseState = l, Ps(
      e,
      Ne,
      typeof a == "function" ? a : el
    );
  }
  function zm(e, t, l, a, n) {
    if (Jr(e)) throw Error(c(485));
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
      C.T !== null ? l(!0) : r.isTransition = !1, a(r), l = t.pending, l === null ? (r.next = t.pending = r, zd(t, r)) : (r.next = l.next, t.pending = l.next = r);
    }
  }
  function zd(e, t) {
    var l = t.action, a = t.payload, n = e.state;
    if (t.isTransition) {
      var r = C.T, d = {};
      C.T = d;
      try {
        var f = l(n, a), g = C.S;
        g !== null && g(d, f), Ad(e, t, f);
      } catch (T) {
        lu(e, t, T);
      } finally {
        r !== null && d.types !== null && (r.types = d.types), C.T = r;
      }
    } else
      try {
        r = l(n, a), Ad(e, t, r);
      } catch (T) {
        lu(e, t, T);
      }
  }
  function Ad(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Md(e, t, a);
      },
      function(a) {
        return lu(e, t, a);
      }
    ) : Md(e, t, l);
  }
  function Md(e, t, l) {
    t.status = "fulfilled", t.value = l, wd(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, zd(e, l)));
  }
  function lu(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, wd(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function wd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function kd(e, t) {
    return t;
  }
  function Od(e, t) {
    if (fe) {
      var l = ze.formState;
      if (l !== null) {
        e: {
          var a = re;
          if (fe) {
            if (Me) {
              t: {
                for (var n = Me, r = wt; n.nodeType !== 8; ) {
                  if (!r) {
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
                r = n.data, n = r === "F!" || r === "F" ? n : null;
              }
              if (n) {
                Me = Ot(
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
    return l = it(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: kd,
      lastRenderedState: t
    }, l.queue = a, l = Id.bind(
      null,
      re,
      a
    ), a.dispatch = l, a = tu(!1), r = uu.bind(
      null,
      re,
      !1,
      a.queue
    ), a = it(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = n, l = zm.bind(
      null,
      re,
      n,
      r,
      l
    ), n.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function Rd(e) {
    var t = He();
    return Dd(t, Ne, e);
  }
  function Dd(e, t, l) {
    if (t = Ps(
      e,
      t,
      kd
    )[0], e = Zr(el)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Mn(t);
      } catch (d) {
        throw d === Ma ? Ur : d;
      }
    else a = t;
    t = He();
    var n = t.queue, r = n.dispatch;
    return l !== t.memoizedState && (re.flags |= 2048, Da(
      9,
      { destroy: void 0 },
      Am.bind(null, n, l),
      null
    )), [a, r, e];
  }
  function Am(e, t) {
    e.action = t;
  }
  function Ud(e) {
    var t = He(), l = Ne;
    if (l !== null)
      return Dd(t, l, e);
    He(), t = t.memoizedState, l = He();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function Da(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = re.updateQueue, t === null && (t = Qr(), re.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Bd() {
    return He().memoizedState;
  }
  function $r(e, t, l, a) {
    var n = it();
    re.flags |= e, n.memoizedState = Da(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Kr(e, t, l, a) {
    var n = He();
    a = a === void 0 ? null : a;
    var r = n.memoizedState.inst;
    Ne !== null && a !== null && $s(a, Ne.memoizedState.deps) ? n.memoizedState = Da(t, r, l, a) : (re.flags |= e, n.memoizedState = Da(
      1 | t,
      r,
      l,
      a
    ));
  }
  function Hd(e, t) {
    $r(8390656, 8, e, t);
  }
  function au(e, t) {
    Kr(2048, 8, e, t);
  }
  function Mm(e) {
    re.flags |= 4;
    var t = re.updateQueue;
    if (t === null)
      t = Qr(), re.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Ld(e) {
    var t = He().memoizedState;
    return Mm({ ref: t, nextImpl: e }), function() {
      if ((ge & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function qd(e, t) {
    return Kr(4, 2, e, t);
  }
  function Gd(e, t) {
    return Kr(4, 4, e, t);
  }
  function Yd(e, t) {
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
  function Vd(e, t, l) {
    l = l != null ? l.concat([e]) : null, Kr(4, 4, Yd.bind(null, t, e), l);
  }
  function nu() {
  }
  function Qd(e, t) {
    var l = He();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && $s(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function Xd(e, t) {
    var l = He();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && $s(t, a[1]))
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
  function ru(e, t, l) {
    return l === void 0 || (Pt & 1073741824) !== 0 && (ce & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = $f(), re.lanes |= e, El |= e, l);
  }
  function Zd(e, t, l, a) {
    return yt(l, t) ? l : ka.current !== null ? (e = ru(e, l, a), yt(e, t) || (Ye = !0), e) : (Pt & 42) === 0 || (Pt & 1073741824) !== 0 && (ce & 261930) === 0 ? (Ye = !0, e.memoizedState = l) : (e = $f(), re.lanes |= e, El |= e, t);
  }
  function $d(e, t, l, a, n) {
    var r = D.p;
    D.p = r !== 0 && 8 > r ? r : 8;
    var d = C.T, f = {};
    C.T = f, uu(e, !1, t, l);
    try {
      var g = n(), T = C.S;
      if (T !== null && T(f, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var M = Em(
          g,
          a
        );
        wn(
          e,
          t,
          M,
          Nt(e)
        );
      } else
        wn(
          e,
          t,
          a,
          Nt(e)
        );
    } catch (k) {
      wn(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: k },
        Nt()
      );
    } finally {
      D.p = r, d !== null && f.types !== null && (d.types = f.types), C.T = d;
    }
  }
  function wm() {
  }
  function iu(e, t, l, a) {
    if (e.tag !== 5) throw Error(c(476));
    var n = Kd(e).queue;
    $d(
      e,
      n,
      t,
      W,
      l === null ? wm : function() {
        return Jd(e), l(a);
      }
    );
  }
  function Kd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: W
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
  function Jd(e) {
    var t = Kd(e);
    t.next === null && (t = e.alternate.memoizedState), wn(
      e,
      t.next.queue,
      {},
      Nt()
    );
  }
  function su() {
    return Ie(Kn);
  }
  function Fd() {
    return He().memoizedState;
  }
  function Wd() {
    return He().memoizedState;
  }
  function km(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Nt();
          e = vl(l);
          var a = bl(t, e, l);
          a !== null && (mt(a, t, l), Tn(a, t, l)), t = { cache: Us() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Om(e, t, l) {
    var a = Nt();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Jr(e) ? Pd(t, l) : (l = Es(e, t, l, a), l !== null && (mt(l, e, a), ef(l, t, a)));
  }
  function Id(e, t, l) {
    var a = Nt();
    wn(e, t, l, a);
  }
  function wn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Jr(e)) Pd(t, n);
    else {
      var r = e.alternate;
      if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null))
        try {
          var d = t.lastRenderedState, f = r(d, l);
          if (n.hasEagerState = !0, n.eagerState = f, yt(f, d))
            return Ar(e, t, n, 0), ze === null && zr(), !1;
        } catch {
        } finally {
        }
      if (l = Es(e, t, n, a), l !== null)
        return mt(l, e, a), ef(l, t, a), !0;
    }
    return !1;
  }
  function uu(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: qu(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Jr(e)) {
      if (t) throw Error(c(479));
    } else
      t = Es(
        e,
        l,
        a,
        2
      ), t !== null && mt(t, e, 2);
  }
  function Jr(e) {
    var t = e.alternate;
    return e === re || t !== null && t === re;
  }
  function Pd(e, t) {
    Oa = Yr = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function ef(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, rc(e, l);
    }
  }
  var kn = {
    readContext: Ie,
    use: Xr,
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
  kn.useEffectEvent = Oe;
  var tf = {
    readContext: Ie,
    use: Xr,
    useCallback: function(e, t) {
      return it().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ie,
    useEffect: Hd,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, $r(
        4194308,
        4,
        Yd.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return $r(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      $r(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = it();
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
      var a = it();
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
      }, a.queue = e, e = e.dispatch = Om.bind(
        null,
        re,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = it();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = tu(e);
      var t = e.queue, l = Id.bind(null, re, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: nu,
    useDeferredValue: function(e, t) {
      var l = it();
      return ru(l, e, t);
    },
    useTransition: function() {
      var e = tu(!1);
      return e = $d.bind(
        null,
        re,
        e.queue,
        !0,
        !1
      ), it().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = re, n = it();
      if (fe) {
        if (l === void 0)
          throw Error(c(407));
        l = l();
      } else {
        if (l = t(), ze === null)
          throw Error(c(349));
        (ce & 127) !== 0 || jd(a, t, l);
      }
      n.memoizedState = l;
      var r = { value: l, getSnapshot: t };
      return n.queue = r, Hd(Nd.bind(null, a, r, e), [
        e
      ]), a.flags |= 2048, Da(
        9,
        { destroy: void 0 },
        Cd.bind(
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
      var e = it(), t = ze.identifierPrefix;
      if (fe) {
        var l = qt, a = Lt;
        l = (a & ~(1 << 32 - xt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Vr++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Tm++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: su,
    useFormState: Od,
    useActionState: Od,
    useOptimistic: function(e) {
      var t = it();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = uu.bind(
        null,
        re,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: Is,
    useCacheRefresh: function() {
      return it().memoizedState = km.bind(
        null,
        re
      );
    },
    useEffectEvent: function(e) {
      var t = it(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((ge & 2) !== 0)
          throw Error(c(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, ou = {
    readContext: Ie,
    use: Xr,
    useCallback: Qd,
    useContext: Ie,
    useEffect: au,
    useImperativeHandle: Vd,
    useInsertionEffect: qd,
    useLayoutEffect: Gd,
    useMemo: Xd,
    useReducer: Zr,
    useRef: Bd,
    useState: function() {
      return Zr(el);
    },
    useDebugValue: nu,
    useDeferredValue: function(e, t) {
      var l = He();
      return Zd(
        l,
        Ne.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Zr(el)[0], t = He().memoizedState;
      return [
        typeof e == "boolean" ? e : Mn(e),
        t
      ];
    },
    useSyncExternalStore: Sd,
    useId: Fd,
    useHostTransitionStatus: su,
    useFormState: Rd,
    useActionState: Rd,
    useOptimistic: function(e, t) {
      var l = He();
      return _d(l, Ne, e, t);
    },
    useMemoCache: Is,
    useCacheRefresh: Wd
  };
  ou.useEffectEvent = Ld;
  var lf = {
    readContext: Ie,
    use: Xr,
    useCallback: Qd,
    useContext: Ie,
    useEffect: au,
    useImperativeHandle: Vd,
    useInsertionEffect: qd,
    useLayoutEffect: Gd,
    useMemo: Xd,
    useReducer: eu,
    useRef: Bd,
    useState: function() {
      return eu(el);
    },
    useDebugValue: nu,
    useDeferredValue: function(e, t) {
      var l = He();
      return Ne === null ? ru(l, e, t) : Zd(
        l,
        Ne.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = eu(el)[0], t = He().memoizedState;
      return [
        typeof e == "boolean" ? e : Mn(e),
        t
      ];
    },
    useSyncExternalStore: Sd,
    useId: Fd,
    useHostTransitionStatus: su,
    useFormState: Ud,
    useActionState: Ud,
    useOptimistic: function(e, t) {
      var l = He();
      return Ne !== null ? _d(l, Ne, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Is,
    useCacheRefresh: Wd
  };
  lf.useEffectEvent = Ld;
  function cu(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : S({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var du = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = Nt(), n = vl(a);
      n.payload = t, l != null && (n.callback = l), t = bl(e, n, a), t !== null && (mt(t, e, a), Tn(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = Nt(), n = vl(a);
      n.tag = 1, n.payload = t, l != null && (n.callback = l), t = bl(e, n, a), t !== null && (mt(t, e, a), Tn(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Nt(), a = vl(l);
      a.tag = 2, t != null && (a.callback = t), t = bl(e, a, l), t !== null && (mt(t, e, l), Tn(t, e, l));
    }
  };
  function af(e, t, l, a, n, r, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, r, d) : t.prototype && t.prototype.isPureReactComponent ? !yn(l, a) || !yn(n, r) : !0;
  }
  function nf(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && du.enqueueReplaceState(t, t.state, null);
  }
  function ta(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = S({}, l));
      for (var n in e)
        l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function rf(e) {
    _r(e);
  }
  function sf(e) {
    console.error(e);
  }
  function uf(e) {
    _r(e);
  }
  function Fr(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function of(e, t, l) {
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
  function fu(e, t, l) {
    return l = vl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Fr(e, t);
    }, l;
  }
  function cf(e) {
    return e = vl(e), e.tag = 3, e;
  }
  function df(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var r = a.value;
      e.payload = function() {
        return n(r);
      }, e.callback = function() {
        of(t, l, a);
      };
    }
    var d = l.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      of(t, l, a), typeof n != "function" && (Tl === null ? Tl = /* @__PURE__ */ new Set([this]) : Tl.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function Rm(e, t, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && _a(
        t,
        l,
        n,
        !0
      ), l = bt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return kt === null ? ui() : l.alternate === null && Re === 0 && (Re = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Br ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Bu(e, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Br ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Bu(e, a, n)), !1;
        }
        throw Error(c(435, l.tag));
      }
      return Bu(e, a, n), ui(), !1;
    }
    if (fe)
      return t = bt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== ws && (e = Error(c(422), { cause: a }), Sn(zt(e, l)))) : (a !== ws && (t = Error(c(423), {
        cause: a
      }), Sn(
        zt(t, l)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = zt(a, l), n = fu(
        e.stateNode,
        a,
        n
      ), Ys(e, n), Re !== 4 && (Re = 2)), !1;
    var r = Error(c(520), { cause: a });
    if (r = zt(r, l), qn === null ? qn = [r] : qn.push(r), Re !== 4 && (Re = 2), t === null) return !0;
    a = zt(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = n & -n, l.lanes |= e, e = fu(l.stateNode, a, e), Ys(l, e), !1;
        case 1:
          if (t = l.type, r = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (Tl === null || !Tl.has(r))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = cf(n), df(
              n,
              e,
              l,
              a
            ), Ys(l, n), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var mu = Error(c(461)), Ye = !1;
  function Pe(e, t, l, a) {
    t.child = e === null ? hd(t, null, l, a) : Pl(
      t,
      e.child,
      l,
      a
    );
  }
  function ff(e, t, l, a, n) {
    l = l.render;
    var r = t.ref;
    if ("ref" in a) {
      var d = {};
      for (var f in a)
        f !== "ref" && (d[f] = a[f]);
    } else d = a;
    return Jl(t), a = Ks(
      e,
      t,
      l,
      d,
      r,
      n
    ), f = Js(), e !== null && !Ye ? (Fs(e, t, n), tl(e, t, n)) : (fe && f && As(t), t.flags |= 1, Pe(e, t, a, n), t.child);
  }
  function mf(e, t, l, a, n) {
    if (e === null) {
      var r = l.type;
      return typeof r == "function" && !Ts(r) && r.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = r, hf(
        e,
        t,
        r,
        a,
        n
      )) : (e = wr(
        l.type,
        null,
        a,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (r = e.child, !Su(e, n)) {
      var d = r.memoizedProps;
      if (l = l.compare, l = l !== null ? l : yn, l(d, a) && e.ref === t.ref)
        return tl(e, t, n);
    }
    return t.flags |= 1, e = Jt(r, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function hf(e, t, l, a, n) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (yn(r, a) && e.ref === t.ref)
        if (Ye = !1, t.pendingProps = a = r, Su(e, n))
          (e.flags & 131072) !== 0 && (Ye = !0);
        else
          return t.lanes = e.lanes, tl(e, t, n);
    }
    return hu(
      e,
      t,
      l,
      a,
      n
    );
  }
  function gf(e, t, l, a) {
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
        return pf(
          e,
          t,
          r,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Dr(
          t,
          r !== null ? r.cachePool : null
        ), r !== null ? xd(t, r) : Qs(), yd(t);
      else
        return a = t.lanes = 536870912, pf(
          e,
          t,
          r !== null ? r.baseLanes | l : l,
          l,
          a
        );
    } else
      r !== null ? (Dr(t, r.cachePool), xd(t, r), jl(), t.memoizedState = null) : (e !== null && Dr(t, null), Qs(), jl());
    return Pe(e, t, n, l), t.child;
  }
  function On(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function pf(e, t, l, a, n) {
    var r = Hs();
    return r = r === null ? null : { parent: qe._currentValue, pool: r }, t.memoizedState = {
      baseLanes: l,
      cachePool: r
    }, e !== null && Dr(t, null), Qs(), yd(t), e !== null && _a(e, t, a, !0), t.childLanes = n, null;
  }
  function Wr(e, t) {
    return t = Pr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function xf(e, t, l) {
    return Pl(t, e.child, null, l), e = Wr(t, t.pendingProps), e.flags |= 2, St(t), t.memoizedState = null, e;
  }
  function Dm(e, t, l) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (fe) {
        if (a.mode === "hidden")
          return e = Wr(t, a), t.lanes = 536870912, On(null, e);
        if (Zs(t), (e = Me) ? (e = A0(
          e,
          wt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: hl !== null ? { id: Lt, overflow: qt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Pc(e), l.return = t, t.child = l, We = t, Me = null)) : e = null, e === null) throw pl(t);
        return t.lanes = 536870912, null;
      }
      return Wr(t, a);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var d = r.dehydrated;
      if (Zs(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = xf(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Ye || _a(e, t, l, !1), n = (l & e.childLanes) !== 0, Ye || n) {
        if (a = ze, a !== null && (d = ic(a, l), d !== 0 && d !== r.retryLane))
          throw r.retryLane = d, Xl(e, d), mt(a, e, d), mu;
        ui(), t = xf(
          e,
          t,
          l
        );
      } else
        e = r.treeContext, Me = Ot(d.nextSibling), We = t, fe = !0, gl = null, wt = !1, e !== null && ld(t, e), t = Wr(t, a), t.flags |= 4096;
      return t;
    }
    return e = Jt(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ir(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(c(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function hu(e, t, l, a, n) {
    return Jl(t), l = Ks(
      e,
      t,
      l,
      a,
      void 0,
      n
    ), a = Js(), e !== null && !Ye ? (Fs(e, t, n), tl(e, t, n)) : (fe && a && As(t), t.flags |= 1, Pe(e, t, l, n), t.child);
  }
  function yf(e, t, l, a, n, r) {
    return Jl(t), t.updateQueue = null, l = bd(
      t,
      a,
      l,
      n
    ), vd(e), a = Js(), e !== null && !Ye ? (Fs(e, t, r), tl(e, t, r)) : (fe && a && As(t), t.flags |= 1, Pe(e, t, l, r), t.child);
  }
  function vf(e, t, l, a, n) {
    if (Jl(t), t.stateNode === null) {
      var r = Ca, d = l.contextType;
      typeof d == "object" && d !== null && (r = Ie(d)), r = new l(a, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = du, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = a, r.state = t.memoizedState, r.refs = {}, qs(t), d = l.contextType, r.context = typeof d == "object" && d !== null ? Ie(d) : Ca, r.state = t.memoizedState, d = l.getDerivedStateFromProps, typeof d == "function" && (cu(
        t,
        l,
        d,
        a
      ), r.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (d = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), d !== r.state && du.enqueueReplaceState(r, r.state, null), zn(t, a, r, n), _n(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      r = t.stateNode;
      var f = t.memoizedProps, g = ta(l, f);
      r.props = g;
      var T = r.context, M = l.contextType;
      d = Ca, typeof M == "object" && M !== null && (d = Ie(M));
      var k = l.getDerivedStateFromProps;
      M = typeof k == "function" || typeof r.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, M || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (f || T !== d) && nf(
        t,
        r,
        a,
        d
      ), yl = !1;
      var _ = t.memoizedState;
      r.state = _, zn(t, a, r, n), _n(), T = t.memoizedState, f || _ !== T || yl ? (typeof k == "function" && (cu(
        t,
        l,
        k,
        a
      ), T = t.memoizedState), (g = yl || af(
        t,
        l,
        g,
        a,
        _,
        T,
        d
      )) ? (M || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = T), r.props = a, r.state = T, r.context = d, a = g) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      r = t.stateNode, Gs(e, t), d = t.memoizedProps, M = ta(l, d), r.props = M, k = t.pendingProps, _ = r.context, T = l.contextType, g = Ca, typeof T == "object" && T !== null && (g = Ie(T)), f = l.getDerivedStateFromProps, (T = typeof f == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (d !== k || _ !== g) && nf(
        t,
        r,
        a,
        g
      ), yl = !1, _ = t.memoizedState, r.state = _, zn(t, a, r, n), _n();
      var z = t.memoizedState;
      d !== k || _ !== z || yl || e !== null && e.dependencies !== null && Or(e.dependencies) ? (typeof f == "function" && (cu(
        t,
        l,
        f,
        a
      ), z = t.memoizedState), (M = yl || af(
        t,
        l,
        M,
        a,
        _,
        z,
        g
      ) || e !== null && e.dependencies !== null && Or(e.dependencies)) ? (T || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(a, z, g), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        a,
        z,
        g
      )), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = z), r.props = a, r.state = z, r.context = g, a = M) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return r = a, Ir(e, t), a = (t.flags & 128) !== 0, r || a ? (r = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : r.render(), t.flags |= 1, e !== null && a ? (t.child = Pl(
      t,
      e.child,
      null,
      n
    ), t.child = Pl(
      t,
      null,
      l,
      n
    )) : Pe(e, t, l, n), t.memoizedState = r.state, e = t.child) : e = tl(
      e,
      t,
      n
    ), e;
  }
  function bf(e, t, l, a) {
    return $l(), t.flags |= 256, Pe(e, t, l, a), t.child;
  }
  var gu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function pu(e) {
    return { baseLanes: e, cachePool: ud() };
  }
  function xu(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Ct), e;
  }
  function Sf(e, t, l) {
    var a = t.pendingProps, n = !1, r = (t.flags & 128) !== 0, d;
    if ((d = r) || (d = e !== null && e.memoizedState === null ? !1 : (Be.current & 2) !== 0), d && (n = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (fe) {
        if (n ? Sl(t) : jl(), (e = Me) ? (e = A0(
          e,
          wt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: hl !== null ? { id: Lt, overflow: qt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Pc(e), l.return = t, t.child = l, We = t, Me = null)) : e = null, e === null) throw pl(t);
        return Pu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (jl(), n = t.mode, f = Pr(
        { mode: "hidden", children: f },
        n
      ), a = Zl(
        a,
        n,
        l,
        null
      ), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = pu(l), a.childLanes = xu(
        e,
        d,
        l
      ), t.memoizedState = gu, On(null, a)) : (Sl(t), yu(t, f));
    }
    var g = e.memoizedState;
    if (g !== null && (f = g.dehydrated, f !== null)) {
      if (r)
        t.flags & 256 ? (Sl(t), t.flags &= -257, t = vu(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (jl(), t.child = e.child, t.flags |= 128, t = null) : (jl(), f = a.fallback, n = t.mode, a = Pr(
          { mode: "visible", children: a.children },
          n
        ), f = Zl(
          f,
          n,
          l,
          null
        ), f.flags |= 2, a.return = t, f.return = t, a.sibling = f, t.child = a, Pl(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = pu(l), a.childLanes = xu(
          e,
          d,
          l
        ), t.memoizedState = gu, t = On(null, a));
      else if (Sl(t), Pu(f)) {
        if (d = f.nextSibling && f.nextSibling.dataset, d) var T = d.dgst;
        d = T, a = Error(c(419)), a.stack = "", a.digest = d, Sn({ value: a, source: null, stack: null }), t = vu(
          e,
          t,
          l
        );
      } else if (Ye || _a(e, t, l, !1), d = (l & e.childLanes) !== 0, Ye || d) {
        if (d = ze, d !== null && (a = ic(d, l), a !== 0 && a !== g.retryLane))
          throw g.retryLane = a, Xl(e, a), mt(d, e, a), mu;
        Iu(f) || ui(), t = vu(
          e,
          t,
          l
        );
      } else
        Iu(f) ? (t.flags |= 192, t.child = e.child, t = null) : (e = g.treeContext, Me = Ot(
          f.nextSibling
        ), We = t, fe = !0, gl = null, wt = !1, e !== null && ld(t, e), t = yu(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (jl(), f = a.fallback, n = t.mode, g = e.child, T = g.sibling, a = Jt(g, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = g.subtreeFlags & 65011712, T !== null ? f = Jt(
      T,
      f
    ) : (f = Zl(
      f,
      n,
      l,
      null
    ), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, On(null, a), a = t.child, f = e.child.memoizedState, f === null ? f = pu(l) : (n = f.cachePool, n !== null ? (g = qe._currentValue, n = n.parent !== g ? { parent: g, pool: g } : n) : n = ud(), f = {
      baseLanes: f.baseLanes | l,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = xu(
      e,
      d,
      l
    ), t.memoizedState = gu, On(e.child, a)) : (Sl(t), l = e.child, e = l.sibling, l = Jt(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function yu(e, t) {
    return t = Pr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Pr(e, t) {
    return e = vt(22, e, null, t), e.lanes = 0, e;
  }
  function vu(e, t, l) {
    return Pl(t, e.child, null, l), e = yu(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function jf(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Rs(e.return, t, l);
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
  function Cf(e, t, l) {
    var a = t.pendingProps, n = a.revealOrder, r = a.tail;
    a = a.children;
    var d = Be.current, f = (d & 2) !== 0;
    if (f ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, Y(Be, d), Pe(e, t, a, l), a = fe ? bn : 0, !f && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && jf(e, l, t);
        else if (e.tag === 19)
          jf(e, l, t);
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
          e = l.alternate, e !== null && Gr(e) === null && (n = l), l = l.sibling;
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
          if (e = n.alternate, e !== null && Gr(e) === null) {
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
        if (_a(
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
  function Su(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Or(e)));
  }
  function Um(e, t, l) {
    switch (t.tag) {
      case 3:
        rt(t, t.stateNode.containerInfo), xl(t, qe, e.memoizedState.cache), $l();
        break;
      case 27:
      case 5:
        nn(t);
        break;
      case 4:
        rt(t, t.stateNode.containerInfo);
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
          return t.flags |= 128, Zs(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Sl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Sf(e, t, l) : (Sl(t), e = tl(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        Sl(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (_a(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), n) {
          if (a)
            return Cf(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Y(Be, Be.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, gf(
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
  function Nf(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ye = !0;
      else {
        if (!Su(e, l) && (t.flags & 128) === 0)
          return Ye = !1, Um(
            e,
            t,
            l
          );
        Ye = (e.flags & 131072) !== 0;
      }
    else
      Ye = !1, fe && (t.flags & 1048576) !== 0 && td(t, bn, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = Wl(t.elementType), t.type = e, typeof e == "function")
            Ts(e) ? (a = ta(e, a), t.tag = 1, t = vf(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = hu(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === V) {
                t.tag = 11, t = ff(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (n === Q) {
                t.tag = 14, t = mf(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = je(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return hu(
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
        ), vf(
          e,
          t,
          a,
          n,
          l
        );
      case 3:
        e: {
          if (rt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          a = t.pendingProps;
          var r = t.memoizedState;
          n = r.element, Gs(e, t), zn(t, a, null, l);
          var d = t.memoizedState;
          if (a = d.cache, xl(t, qe, a), a !== r.cache && Ds(
            t,
            [qe],
            l,
            !0
          ), _n(), a = d.element, r.isDehydrated)
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
              n = zt(
                Error(c(424)),
                t
              ), Sn(n), t = bf(
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
              for (Me = Ot(e.firstChild), We = t, fe = !0, gl = null, wt = !0, l = hd(
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
            Pe(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ir(e, t), e === null ? (l = D0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : fe || (l = t.type, e = t.pendingProps, a = gi(
          se.current
        ).createElement(l), a[Fe] = t, a[st] = e, et(a, l, e), Ke(a), t.stateNode = a) : t.memoizedState = D0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return nn(t), e === null && fe && (a = t.stateNode = k0(
          t.type,
          t.pendingProps,
          se.current
        ), We = t, wt = !0, n = Me, Ml(t.type) ? (eo = n, Me = Ot(a.firstChild)) : Me = n), Pe(
          e,
          t,
          t.pendingProps.children,
          l
        ), Ir(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && fe && ((n = a = Me) && (a = f4(
          a,
          t.type,
          t.pendingProps,
          wt
        ), a !== null ? (t.stateNode = a, We = t, Me = Ot(a.firstChild), wt = !1, n = !0) : n = !1), n || pl(t)), nn(t), n = t.type, r = t.pendingProps, d = e !== null ? e.memoizedProps : null, a = r.children, Ju(n, r) ? a = null : d !== null && Ju(n, d) && (t.flags |= 32), t.memoizedState !== null && (n = Ks(
          e,
          t,
          _m,
          null,
          null,
          l
        ), Kn._currentValue = n), Ir(e, t), Pe(e, t, a, l), t.child;
      case 6:
        return e === null && fe && ((e = l = Me) && (l = m4(
          l,
          t.pendingProps,
          wt
        ), l !== null ? (t.stateNode = l, We = t, Me = null, e = !0) : e = !1), e || pl(t)), null;
      case 13:
        return Sf(e, t, l);
      case 4:
        return rt(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = Pl(
          t,
          null,
          a,
          l
        ) : Pe(e, t, a, l), t.child;
      case 11:
        return ff(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Pe(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Pe(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Pe(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return a = t.pendingProps, xl(t, t.type, a.value), Pe(e, t, a.children, l), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Jl(t), n = Ie(n), a = a(n), t.flags |= 1, Pe(e, t, a, l), t.child;
      case 14:
        return mf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return hf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Cf(e, t, l);
      case 31:
        return Dm(e, t, l);
      case 22:
        return gf(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Jl(t), a = Ie(qe), e === null ? (n = Hs(), n === null && (n = ze, r = Us(), n.pooledCache = r, r.refCount++, r !== null && (n.pooledCacheLanes |= l), n = r), t.memoizedState = { parent: a, cache: n }, qs(t), xl(t, qe, n)) : ((e.lanes & l) !== 0 && (Gs(e, t), zn(t, null, null, l), _n()), n = e.memoizedState, r = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), xl(t, qe, a)) : (a = r.cache, xl(t, qe, a), a !== n.cache && Ds(
          t,
          [qe],
          l,
          !0
        ))), Pe(
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
  function ju(e, t, l, a, n) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Wf()) e.flags |= 8192;
        else
          throw Il = Br, Ls;
    } else e.flags &= -16777217;
  }
  function Ef(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !q0(t))
      if (Wf()) e.flags |= 8192;
      else
        throw Il = Br, Ls;
  }
  function ei(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? ac() : 536870912, e.lanes |= t, La |= t);
  }
  function Rn(e, t) {
    if (!fe)
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
  function we(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function Bm(e, t, l) {
    var a = t.pendingProps;
    switch (Ms(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return we(t), null;
      case 1:
        return we(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), It(qe), Ue(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Ta(t) ? ll(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ks())), we(t), null;
      case 26:
        var n = t.type, r = t.memoizedState;
        return e === null ? (ll(t), r !== null ? (we(t), Ef(t, r)) : (we(t), ju(
          t,
          n,
          null,
          a,
          l
        ))) : r ? r !== e.memoizedState ? (ll(t), we(t), Ef(t, r)) : (we(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && ll(t), we(t), ju(
          t,
          n,
          e,
          a,
          l
        )), null;
      case 27:
        if (dr(t), l = se.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && ll(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return we(t), null;
          }
          e = $.current, Ta(t) ? ad(t) : (e = k0(n, a, l), t.stateNode = e, ll(t));
        }
        return we(t), null;
      case 5:
        if (dr(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && ll(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(c(166));
            return we(t), null;
          }
          if (r = $.current, Ta(t))
            ad(t);
          else {
            var d = gi(
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
            r[Fe] = t, r[st] = a;
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
            e: switch (et(r, n, a), n) {
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
        return we(t), ju(
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
          if (e = se.current, Ta(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, n = We, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            e[Fe] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || S0(e.nodeValue, l)), e || pl(t, !0);
          } else
            e = gi(e).createTextNode(
              a
            ), e[Fe] = t, t.stateNode = e;
        }
        return we(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Ta(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Fe] = t;
            } else
              $l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            we(t), e = !1;
          } else
            l = ks(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (St(t), t) : (St(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return we(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = Ta(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
              n[Fe] = t;
            } else
              $l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            we(t), n = !1;
          } else
            n = ks(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (St(t), t) : (St(t), null);
        }
        return St(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), r = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (r = a.memoizedState.cachePool.pool), r !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), ei(t, t.updateQueue), we(t), null);
      case 4:
        return Ue(), e === null && Qu(t.stateNode.containerInfo), we(t), null;
      case 10:
        return It(t.type), we(t), null;
      case 19:
        if (R(Be), a = t.memoizedState, a === null) return we(t), null;
        if (n = (t.flags & 128) !== 0, r = a.rendering, r === null)
          if (n) Rn(a, !1);
          else {
            if (Re !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (r = Gr(e), r !== null) {
                  for (t.flags |= 128, Rn(a, !1), e = r.updateQueue, t.updateQueue = e, ei(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    Ic(l, e), l = l.sibling;
                  return Y(
                    Be,
                    Be.current & 1 | 2
                  ), fe && Ft(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && gt() > ri && (t.flags |= 128, n = !0, Rn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Gr(r), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, ei(t, e), Rn(a, !0), a.tail === null && a.tailMode === "hidden" && !r.alternate && !fe)
                return we(t), null;
            } else
              2 * gt() - a.renderingStartTime > ri && l !== 536870912 && (t.flags |= 128, n = !0, Rn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (r.sibling = t.child, t.child = r) : (e = a.last, e !== null ? e.sibling = r : t.child = r, a.last = r);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = gt(), e.sibling = null, l = Be.current, Y(
          Be,
          n ? l & 1 | 2 : l & 1
        ), fe && Ft(t, a.treeForkCount), e) : (we(t), null);
      case 22:
      case 23:
        return St(t), Xs(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (we(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : we(t), l = t.updateQueue, l !== null && ei(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && R(Fl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), It(qe), we(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Hm(e, t) {
    switch (Ms(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return It(qe), Ue(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return dr(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (St(t), t.alternate === null)
            throw Error(c(340));
          $l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (St(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
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
        return St(t), Xs(), e !== null && R(Fl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return It(qe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Tf(e, t) {
    switch (Ms(t), t.tag) {
      case 3:
        It(qe), Ue();
        break;
      case 26:
      case 27:
      case 5:
        dr(t);
        break;
      case 4:
        Ue();
        break;
      case 31:
        t.memoizedState !== null && St(t);
        break;
      case 13:
        St(t);
        break;
      case 19:
        R(Be);
        break;
      case 10:
        It(t.type);
        break;
      case 22:
      case 23:
        St(t), Xs(), e !== null && R(Fl);
        break;
      case 24:
        It(qe);
    }
  }
  function Dn(e, t) {
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
    } catch (f) {
      be(t, t.return, f);
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
            var d = a.inst, f = d.destroy;
            if (f !== void 0) {
              d.destroy = void 0, n = t;
              var g = l, T = f;
              try {
                T();
              } catch (M) {
                be(
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
      be(t, t.return, M);
    }
  }
  function _f(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        pd(t, l);
      } catch (a) {
        be(e, e.return, a);
      }
    }
  }
  function zf(e, t, l) {
    l.props = ta(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      be(e, t, a);
    }
  }
  function Un(e, t) {
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
      be(e, t, n);
    }
  }
  function Gt(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          be(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          be(e, t, n);
        }
      else l.current = null;
  }
  function Af(e) {
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
      be(e, e.return, n);
    }
  }
  function Cu(e, t, l) {
    try {
      var a = e.stateNode;
      i4(a, e.type, l, t), a[st] = t;
    } catch (n) {
      be(e, e.return, n);
    }
  }
  function Mf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ml(e.type) || e.tag === 4;
  }
  function Nu(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Mf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ml(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Eu(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = $t));
    else if (a !== 4 && (a === 27 && Ml(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Eu(e, t, l), e = e.sibling; e !== null; )
        Eu(e, t, l), e = e.sibling;
  }
  function ti(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && Ml(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (ti(e, t, l), e = e.sibling; e !== null; )
        ti(e, t, l), e = e.sibling;
  }
  function wf(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      et(t, a, l), t[Fe] = e, t[st] = l;
    } catch (r) {
      be(e, e.return, r);
    }
  }
  var al = !1, Ve = !1, Tu = !1, kf = typeof WeakSet == "function" ? WeakSet : Set, Je = null;
  function Lm(e, t) {
    if (e = e.containerInfo, $u = ji, e = Vc(e), vs(e)) {
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
            var d = 0, f = -1, g = -1, T = 0, M = 0, k = e, _ = null;
            t: for (; ; ) {
              for (var z; k !== l || n !== 0 && k.nodeType !== 3 || (f = d + n), k !== r || a !== 0 && k.nodeType !== 3 || (g = d + a), k.nodeType === 3 && (d += k.nodeValue.length), (z = k.firstChild) !== null; )
                _ = k, k = z;
              for (; ; ) {
                if (k === e) break t;
                if (_ === l && ++T === n && (f = d), _ === r && ++M === a && (g = d), (z = k.nextSibling) !== null) break;
                k = _, _ = k.parentNode;
              }
              k = z;
            }
            l = f === -1 || g === -1 ? null : { start: f, end: g };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ku = { focusedElem: e, selectionRange: l }, ji = !1, Je = t; Je !== null; )
      if (t = Je, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Je = e;
      else
        for (; Je !== null; ) {
          switch (t = Je, r = t.alternate, e = t.flags, t.tag) {
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
                  var Z = ta(
                    l.type,
                    n
                  );
                  e = a.getSnapshotBeforeUpdate(
                    Z,
                    r
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (I) {
                  be(
                    l,
                    l.return,
                    I
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  Wu(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wu(e);
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
            e.return = t.return, Je = e;
            break;
          }
          Je = t.return;
        }
  }
  function Of(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        rl(e, l), a & 4 && Dn(5, l);
        break;
      case 1:
        if (rl(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              be(l, l.return, d);
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
              be(
                l,
                l.return,
                d
              );
            }
          }
        a & 64 && _f(l), a & 512 && Un(l, l.return);
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
            pd(e, t);
          } catch (d) {
            be(l, l.return, d);
          }
        }
        break;
      case 27:
        t === null && a & 4 && wf(l);
      case 26:
      case 5:
        rl(e, l), t === null && a & 4 && Af(l), a & 512 && Un(l, l.return);
        break;
      case 12:
        rl(e, l);
        break;
      case 31:
        rl(e, l), a & 4 && Uf(e, l);
        break;
      case 13:
        rl(e, l), a & 4 && Bf(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = Km.bind(
          null,
          l
        ), h4(e, l))));
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
  function Rf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Rf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ls(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ke = null, ot = !1;
  function nl(e, t, l) {
    for (l = l.child; l !== null; )
      Df(e, t, l), l = l.sibling;
  }
  function Df(e, t, l) {
    if (pt && typeof pt.onCommitFiberUnmount == "function")
      try {
        pt.onCommitFiberUnmount(rn, l);
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
        var a = ke, n = ot;
        Ml(l.type) && (ke = l.stateNode, ot = !1), nl(
          e,
          t,
          l
        ), Xn(l.stateNode), ke = a, ot = n;
        break;
      case 5:
        Ve || Gt(l, t);
      case 6:
        if (a = ke, n = ot, ke = null, nl(
          e,
          t,
          l
        ), ke = a, ot = n, ke !== null)
          if (ot)
            try {
              (ke.nodeType === 9 ? ke.body : ke.nodeName === "HTML" ? ke.ownerDocument.body : ke).removeChild(l.stateNode);
            } catch (r) {
              be(
                l,
                t,
                r
              );
            }
          else
            try {
              ke.removeChild(l.stateNode);
            } catch (r) {
              be(
                l,
                t,
                r
              );
            }
        break;
      case 18:
        ke !== null && (ot ? (e = ke, _0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), $a(e)) : _0(ke, l.stateNode));
        break;
      case 4:
        a = ke, n = ot, ke = l.stateNode.containerInfo, ot = !0, nl(
          e,
          t,
          l
        ), ke = a, ot = n;
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
        Ve || (Gt(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && zf(
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
  function Uf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        $a(e);
      } catch (l) {
        be(t, t.return, l);
      }
    }
  }
  function Bf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        $a(e);
      } catch (l) {
        be(t, t.return, l);
      }
  }
  function qm(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new kf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new kf()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function li(e, t) {
    var l = qm(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = Jm.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function ct(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a], r = e, d = t, f = d;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Ml(f.type)) {
                ke = f.stateNode, ot = !1;
                break e;
              }
              break;
            case 5:
              ke = f.stateNode, ot = !1;
              break e;
            case 3:
            case 4:
              ke = f.stateNode.containerInfo, ot = !0;
              break e;
          }
          f = f.return;
        }
        if (ke === null) throw Error(c(160));
        Df(r, d, n), ke = null, ot = !1, r = n.alternate, r !== null && (r.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Hf(t, e), t = t.sibling;
  }
  var Bt = null;
  function Hf(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ct(t, e), dt(e), a & 4 && (Cl(3, e, e.return), Dn(3, e), Cl(5, e, e.return));
        break;
      case 1:
        ct(t, e), dt(e), a & 512 && (Ve || l === null || Gt(l, l.return)), a & 64 && al && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var n = Bt;
        if (ct(t, e), dt(e), a & 512 && (Ve || l === null || Gt(l, l.return)), a & 4) {
          var r = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      r = n.getElementsByTagName("title")[0], (!r || r[on] || r[Fe] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = n.createElement(a), n.head.insertBefore(
                        r,
                        n.querySelector("head > title")
                      )), et(r, a, l), r[Fe] = e, Ke(r), a = r;
                      break e;
                    case "link":
                      var d = H0(
                        "link",
                        "href",
                        n
                      ).get(a + (l.href || ""));
                      if (d) {
                        for (var f = 0; f < d.length; f++)
                          if (r = d[f], r.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && r.getAttribute("rel") === (l.rel == null ? null : l.rel) && r.getAttribute("title") === (l.title == null ? null : l.title) && r.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            d.splice(f, 1);
                            break t;
                          }
                      }
                      r = n.createElement(a), et(r, a, l), n.head.appendChild(r);
                      break;
                    case "meta":
                      if (d = H0(
                        "meta",
                        "content",
                        n
                      ).get(a + (l.content || ""))) {
                        for (f = 0; f < d.length; f++)
                          if (r = d[f], r.getAttribute("content") === (l.content == null ? null : "" + l.content) && r.getAttribute("name") === (l.name == null ? null : l.name) && r.getAttribute("property") === (l.property == null ? null : l.property) && r.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && r.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            d.splice(f, 1);
                            break t;
                          }
                      }
                      r = n.createElement(a), et(r, a, l), n.head.appendChild(r);
                      break;
                    default:
                      throw Error(c(468, a));
                  }
                  r[Fe] = e, Ke(r), a = r;
                }
                e.stateNode = a;
              } else
                L0(
                  n,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = B0(
                n,
                a,
                e.memoizedProps
              );
          else
            r !== a ? (r === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : r.count--, a === null ? L0(
              n,
              e.type,
              e.stateNode
            ) : B0(
              n,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Cu(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ct(t, e), dt(e), a & 512 && (Ve || l === null || Gt(l, l.return)), l !== null && a & 4 && Cu(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ct(t, e), dt(e), a & 512 && (Ve || l === null || Gt(l, l.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            pa(n, "");
          } catch (Z) {
            be(e, e.return, Z);
          }
        }
        a & 4 && e.stateNode != null && (n = e.memoizedProps, Cu(
          e,
          n,
          l !== null ? l.memoizedProps : n
        )), a & 1024 && (Tu = !0);
        break;
      case 6:
        if (ct(t, e), dt(e), a & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (Z) {
            be(e, e.return, Z);
          }
        }
        break;
      case 3:
        if (yi = null, n = Bt, Bt = pi(t.containerInfo), ct(t, e), Bt = n, dt(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            $a(t.containerInfo);
          } catch (Z) {
            be(e, e.return, Z);
          }
        Tu && (Tu = !1, Lf(e));
        break;
      case 4:
        a = Bt, Bt = pi(
          e.stateNode.containerInfo
        ), ct(t, e), dt(e), Bt = a;
        break;
      case 12:
        ct(t, e), dt(e);
        break;
      case 31:
        ct(t, e), dt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, li(e, a)));
        break;
      case 13:
        ct(t, e), dt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ni = gt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, li(e, a)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var g = l !== null && l.memoizedState !== null, T = al, M = Ve;
        if (al = T || n, Ve = M || g, ct(t, e), Ve = M, al = T, dt(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || g || al || Ve || la(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                g = l = t;
                try {
                  if (r = g.stateNode, n)
                    d = r.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    f = g.stateNode;
                    var k = g.memoizedProps.style, _ = k != null && k.hasOwnProperty("display") ? k.display : null;
                    f.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (Z) {
                  be(g, g.return, Z);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                g = t;
                try {
                  g.stateNode.nodeValue = n ? "" : g.memoizedProps;
                } catch (Z) {
                  be(g, g.return, Z);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                g = t;
                try {
                  var z = g.stateNode;
                  n ? z0(z, !0) : z0(g.stateNode, !1);
                } catch (Z) {
                  be(g, g.return, Z);
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
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, li(e, l))));
        break;
      case 19:
        ct(t, e), dt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, li(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ct(t, e), dt(e);
    }
  }
  function dt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (Mf(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode, r = Nu(e);
            ti(e, r, n);
            break;
          case 5:
            var d = l.stateNode;
            l.flags & 32 && (pa(d, ""), l.flags &= -33);
            var f = Nu(e);
            ti(e, f, d);
            break;
          case 3:
          case 4:
            var g = l.stateNode.containerInfo, T = Nu(e);
            Eu(
              e,
              T,
              g
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (M) {
        be(e, e.return, M);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Lf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Lf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function rl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Of(e, t.alternate, t), t = t.sibling;
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
          typeof l.componentWillUnmount == "function" && zf(
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
          ), Dn(4, r);
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
              be(a, a.return, T);
            }
          if (a = r, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var g = n.shared.hiddenCallbacks;
              if (g !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < g.length; n++)
                  gd(g[n], f);
            } catch (T) {
              be(a, a.return, T);
            }
          }
          l && d & 64 && _f(r), Un(r, r.return);
          break;
        case 27:
          wf(r);
        case 26:
        case 5:
          il(
            n,
            r,
            l
          ), l && a === null && d & 4 && Af(r), Un(r, r.return);
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
          ), l && d & 4 && Uf(n, r);
          break;
        case 13:
          il(
            n,
            r,
            l
          ), l && d & 4 && Bf(n, r);
          break;
        case 22:
          r.memoizedState === null && il(
            n,
            r,
            l
          ), Un(r, r.return);
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
  function _u(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && jn(l));
  }
  function zu(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && jn(e));
  }
  function Ht(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        qf(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function qf(e, t, l, a) {
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
        ), n & 2048 && Dn(9, t);
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
        ), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && jn(e)));
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
            var r = t.memoizedProps, d = r.id, f = r.onPostCommit;
            typeof f == "function" && f(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (g) {
            be(t, t.return, g);
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
        ) : Bn(e, t) : r._visibility & 2 ? Ht(
          e,
          t,
          l,
          a
        ) : (r._visibility |= 2, Ua(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && _u(d, t);
        break;
      case 24:
        Ht(
          e,
          t,
          l,
          a
        ), n & 2048 && zu(t.alternate, t);
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
  function Ua(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e, d = t, f = l, g = a, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ua(
            r,
            d,
            f,
            g,
            n
          ), Dn(8, d);
          break;
        case 23:
          break;
        case 22:
          var M = d.stateNode;
          d.memoizedState !== null ? M._visibility & 2 ? Ua(
            r,
            d,
            f,
            g,
            n
          ) : Bn(
            r,
            d
          ) : (M._visibility |= 2, Ua(
            r,
            d,
            f,
            g,
            n
          )), n && T & 2048 && _u(
            d.alternate,
            d
          );
          break;
        case 24:
          Ua(
            r,
            d,
            f,
            g,
            n
          ), n && T & 2048 && zu(d.alternate, d);
          break;
        default:
          Ua(
            r,
            d,
            f,
            g,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Bn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            Bn(l, a), n & 2048 && _u(
              a.alternate,
              a
            );
            break;
          case 24:
            Bn(l, a), n & 2048 && zu(a.alternate, a);
            break;
          default:
            Bn(l, a);
        }
        t = t.sibling;
      }
  }
  var Hn = 8192;
  function Ba(e, t, l) {
    if (e.subtreeFlags & Hn)
      for (e = e.child; e !== null; )
        Gf(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Gf(e, t, l) {
    switch (e.tag) {
      case 26:
        Ba(
          e,
          t,
          l
        ), e.flags & Hn && e.memoizedState !== null && T4(
          l,
          Bt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ba(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = Bt;
        Bt = pi(e.stateNode.containerInfo), Ba(
          e,
          t,
          l
        ), Bt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Hn, Hn = 16777216, Ba(
          e,
          t,
          l
        ), Hn = a) : Ba(
          e,
          t,
          l
        ));
        break;
      default:
        Ba(
          e,
          t,
          l
        );
    }
  }
  function Yf(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ln(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Je = a, Qf(
            a,
            e
          );
        }
      Yf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Vf(e), e = e.sibling;
  }
  function Vf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ln(e), e.flags & 2048 && Cl(9, e, e.return);
        break;
      case 3:
        Ln(e);
        break;
      case 12:
        Ln(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ai(e)) : Ln(e);
        break;
      default:
        Ln(e);
    }
  }
  function ai(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Je = a, Qf(
            a,
            e
          );
        }
      Yf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Cl(8, t, t.return), ai(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, ai(t));
          break;
        default:
          ai(t);
      }
      e = e.sibling;
    }
  }
  function Qf(e, t) {
    for (; Je !== null; ) {
      var l = Je;
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
          jn(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Je = a;
      else
        e: for (l = e; Je !== null; ) {
          a = Je;
          var n = a.sibling, r = a.return;
          if (Rf(a), a === l) {
            Je = null;
            break e;
          }
          if (n !== null) {
            n.return = r, Je = n;
            break e;
          }
          Je = r;
        }
    }
  }
  var Gm = {
    getCacheForType: function(e) {
      var t = Ie(qe), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Ie(qe).controller.signal;
    }
  }, Ym = typeof WeakMap == "function" ? WeakMap : Map, ge = 0, ze = null, ue = null, ce = 0, ve = 0, jt = null, Nl = !1, Ha = !1, Au = !1, sl = 0, Re = 0, El = 0, aa = 0, Mu = 0, Ct = 0, La = 0, qn = null, ft = null, wu = !1, ni = 0, Xf = 0, ri = 1 / 0, ii = null, Tl = null, $e = 0, _l = null, qa = null, ul = 0, ku = 0, Ou = null, Zf = null, Gn = 0, Ru = null;
  function Nt() {
    return (ge & 2) !== 0 && ce !== 0 ? ce & -ce : C.T !== null ? qu() : sc();
  }
  function $f() {
    if (Ct === 0)
      if ((ce & 536870912) === 0 || fe) {
        var e = hr;
        hr <<= 1, (hr & 3932160) === 0 && (hr = 262144), Ct = e;
      } else Ct = 536870912;
    return e = bt.current, e !== null && (e.flags |= 32), Ct;
  }
  function mt(e, t, l) {
    (e === ze && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null) && (Ga(e, 0), zl(
      e,
      ce,
      Ct,
      !1
    )), un(e, l), ((ge & 2) === 0 || e !== ze) && (e === ze && ((ge & 2) === 0 && (aa |= l), Re === 4 && zl(
      e,
      ce,
      Ct,
      !1
    )), Yt(e));
  }
  function Kf(e, t, l) {
    if ((ge & 6) !== 0) throw Error(c(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || sn(e, t), n = a ? Xm(e, t) : Uu(e, t, !0), r = a;
    do {
      if (n === 0) {
        Ha && !a && zl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, r && !Vm(l)) {
          n = Uu(e, t, !1), r = !1;
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
              var f = e;
              n = qn;
              var g = f.current.memoizedState.isDehydrated;
              if (g && (Ga(f, d).flags |= 256), d = Uu(
                f,
                d,
                !1
              ), d !== 2) {
                if (Au && !g) {
                  f.errorRecoveryDisabledLanes |= r, aa |= r, n = 4;
                  break e;
                }
                r = ft, ft = n, r !== null && (ft === null ? ft = r : ft.push.apply(
                  ft,
                  r
                ));
              }
              n = d;
            }
            if (r = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Ga(e, 0), zl(e, t, 0, !0);
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
                Ct,
                !Nl
              );
              break e;
            case 2:
              ft = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (n = ni + 300 - gt(), 10 < n)) {
            if (zl(
              a,
              t,
              Ct,
              !Nl
            ), pr(a, 0, !0) !== 0) break e;
            ul = t, a.timeoutHandle = E0(
              Jf.bind(
                null,
                a,
                l,
                ft,
                ii,
                wu,
                t,
                Ct,
                aa,
                La,
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
          Jf(
            a,
            l,
            ft,
            ii,
            wu,
            t,
            Ct,
            aa,
            La,
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
  function Jf(e, t, l, a, n, r, d, f, g, T, M, k, _, z) {
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
      }, Gf(
        t,
        r,
        k
      );
      var Z = (r & 62914560) === r ? ni - gt() : (r & 4194048) === r ? Xf - gt() : 0;
      if (Z = _4(
        k,
        Z
      ), Z !== null) {
        ul = r, e.cancelPendingCommit = Z(
          a0.bind(
            null,
            e,
            t,
            r,
            l,
            a,
            n,
            d,
            f,
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
    a0(
      e,
      t,
      r,
      l,
      a,
      n,
      d,
      f,
      g
    );
  }
  function Vm(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], r = n.getSnapshot;
          n = n.value;
          try {
            if (!yt(r(), n)) return !1;
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
    t &= ~Mu, t &= ~aa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var r = 31 - xt(n), d = 1 << r;
      a[r] = -1, n &= ~d;
    }
    l !== 0 && nc(e, l, t);
  }
  function si() {
    return (ge & 6) === 0 ? (Yn(0), !1) : !0;
  }
  function Du() {
    if (ue !== null) {
      if (ve === 0)
        var e = ue.return;
      else
        e = ue, Wt = Kl = null, Ws(e), wa = null, Nn = 0, e = ue;
      for (; e !== null; )
        Tf(e.alternate, e), e = e.return;
      ue = null;
    }
  }
  function Ga(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, o4(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ul = 0, Du(), ze = e, ue = l = Jt(e.current, null), ce = t, ve = 0, jt = null, Nl = !1, Ha = sn(e, t), Au = !1, La = Ct = Mu = aa = El = Re = 0, ft = qn = null, wu = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - xt(a), r = 1 << n;
        t |= e[n], a &= ~r;
      }
    return sl = t, zr(), l;
  }
  function Ff(e, t) {
    re = null, C.H = kn, t === Ma || t === Ur ? (t = dd(), ve = 3) : t === Ls ? (t = dd(), ve = 4) : ve = t === mu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, jt = t, ue === null && (Re = 1, Fr(
      e,
      zt(t, e.current)
    ));
  }
  function Wf() {
    var e = bt.current;
    return e === null ? !0 : (ce & 4194048) === ce ? kt === null : (ce & 62914560) === ce || (ce & 536870912) !== 0 ? e === kt : !1;
  }
  function If() {
    var e = C.H;
    return C.H = kn, e === null ? kn : e;
  }
  function Pf() {
    var e = C.A;
    return C.A = Gm, e;
  }
  function ui() {
    Re = 4, Nl || (ce & 4194048) !== ce && bt.current !== null || (Ha = !0), (El & 134217727) === 0 && (aa & 134217727) === 0 || ze === null || zl(
      ze,
      ce,
      Ct,
      !1
    );
  }
  function Uu(e, t, l) {
    var a = ge;
    ge |= 2;
    var n = If(), r = Pf();
    (ze !== e || ce !== t) && (ii = null, Ga(e, t)), t = !1;
    var d = Re;
    e: do
      try {
        if (ve !== 0 && ue !== null) {
          var f = ue, g = jt;
          switch (ve) {
            case 8:
              Du(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              bt.current === null && (t = !0);
              var T = ve;
              if (ve = 0, jt = null, Ya(e, f, g, T), l && Ha) {
                d = 0;
                break e;
              }
              break;
            default:
              T = ve, ve = 0, jt = null, Ya(e, f, g, T);
          }
        }
        Qm(), d = Re;
        break;
      } catch (M) {
        Ff(e, M);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Wt = Kl = null, ge = a, C.H = n, C.A = r, ue === null && (ze = null, ce = 0, zr()), d;
  }
  function Qm() {
    for (; ue !== null; ) e0(ue);
  }
  function Xm(e, t) {
    var l = ge;
    ge |= 2;
    var a = If(), n = Pf();
    ze !== e || ce !== t ? (ii = null, ri = gt() + 500, Ga(e, t)) : Ha = sn(
      e,
      t
    );
    e: do
      try {
        if (ve !== 0 && ue !== null) {
          t = ue;
          var r = jt;
          t: switch (ve) {
            case 1:
              ve = 0, jt = null, Ya(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (od(r)) {
                ve = 0, jt = null, t0(t);
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
              od(r) ? (ve = 0, jt = null, t0(t)) : (ve = 0, jt = null, Ya(e, t, r, 7));
              break;
            case 5:
              var d = null;
              switch (ue.tag) {
                case 26:
                  d = ue.memoizedState;
                case 5:
                case 27:
                  var f = ue;
                  if (d ? q0(d) : f.stateNode.complete) {
                    ve = 0, jt = null;
                    var g = f.sibling;
                    if (g !== null) ue = g;
                    else {
                      var T = f.return;
                      T !== null ? (ue = T, oi(T)) : ue = null;
                    }
                    break t;
                  }
              }
              ve = 0, jt = null, Ya(e, t, r, 5);
              break;
            case 6:
              ve = 0, jt = null, Ya(e, t, r, 6);
              break;
            case 8:
              Du(), Re = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        Zm();
        break;
      } catch (M) {
        Ff(e, M);
      }
    while (!0);
    return Wt = Kl = null, C.H = a, C.A = n, ge = l, ue !== null ? 0 : (ze = null, ce = 0, zr(), Re);
  }
  function Zm() {
    for (; ue !== null && !g2(); )
      e0(ue);
  }
  function e0(e) {
    var t = Nf(e.alternate, e, sl);
    e.memoizedProps = e.pendingProps, t === null ? oi(e) : ue = t;
  }
  function t0(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = yf(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ce
        );
        break;
      case 11:
        t = yf(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ce
        );
        break;
      case 5:
        Ws(t);
      default:
        Tf(l, t), t = ue = Ic(t, sl), t = Nf(l, t, sl);
    }
    e.memoizedProps = e.pendingProps, t === null ? oi(e) : ue = t;
  }
  function Ya(e, t, l, a) {
    Wt = Kl = null, Ws(t), wa = null, Nn = 0;
    var n = t.return;
    try {
      if (Rm(
        e,
        n,
        t,
        l,
        ce
      )) {
        Re = 1, Fr(
          e,
          zt(l, e.current)
        ), ue = null;
        return;
      }
    } catch (r) {
      if (n !== null) throw ue = n, r;
      Re = 1, Fr(
        e,
        zt(l, e.current)
      ), ue = null;
      return;
    }
    t.flags & 32768 ? (fe || a === 1 ? e = !0 : Ha || (ce & 536870912) !== 0 ? e = !1 : (Nl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = bt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), l0(t, e)) : oi(t);
  }
  function oi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        l0(
          t,
          Nl
        );
        return;
      }
      e = t.return;
      var l = Bm(
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
    Re === 0 && (Re = 5);
  }
  function l0(e, t) {
    do {
      var l = Hm(e.alternate, e);
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
    Re = 6, ue = null;
  }
  function a0(e, t, l, a, n, r, d, f, g) {
    e.cancelPendingCommit = null;
    do
      ci();
    while ($e !== 0);
    if ((ge & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (r = t.lanes | t.childLanes, r |= Ns, E2(
        e,
        l,
        r,
        d,
        f,
        g
      ), e === ze && (ue = ze = null, ce = 0), qa = t, _l = e, ul = l, ku = r, Ou = n, Zf = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Fm(fr, function() {
        return u0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = C.T, C.T = null, n = D.p, D.p = 2, d = ge, ge |= 4;
        try {
          Lm(e, t, l);
        } finally {
          ge = d, D.p = n, C.T = a;
        }
      }
      $e = 1, n0(), r0(), i0();
    }
  }
  function n0() {
    if ($e === 1) {
      $e = 0;
      var e = _l, t = qa, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = C.T, C.T = null;
        var a = D.p;
        D.p = 2;
        var n = ge;
        ge |= 4;
        try {
          Hf(t, e);
          var r = Ku, d = Vc(e.containerInfo), f = r.focusedElem, g = r.selectionRange;
          if (d !== f && f && f.ownerDocument && Yc(
            f.ownerDocument.documentElement,
            f
          )) {
            if (g !== null && vs(f)) {
              var T = g.start, M = g.end;
              if (M === void 0 && (M = T), "selectionStart" in f)
                f.selectionStart = T, f.selectionEnd = Math.min(
                  M,
                  f.value.length
                );
              else {
                var k = f.ownerDocument || document, _ = k && k.defaultView || window;
                if (_.getSelection) {
                  var z = _.getSelection(), Z = f.textContent.length, I = Math.min(g.start, Z), Te = g.end === void 0 ? I : Math.min(g.end, Z);
                  !z.extend && I > Te && (d = Te, Te = I, I = d);
                  var N = Gc(
                    f,
                    I
                  ), v = Gc(
                    f,
                    Te
                  );
                  if (N && v && (z.rangeCount !== 1 || z.anchorNode !== N.node || z.anchorOffset !== N.offset || z.focusNode !== v.node || z.focusOffset !== v.offset)) {
                    var E = k.createRange();
                    E.setStart(N.node, N.offset), z.removeAllRanges(), I > Te ? (z.addRange(E), z.extend(v.node, v.offset)) : (E.setEnd(v.node, v.offset), z.addRange(E));
                  }
                }
              }
            }
            for (k = [], z = f; z = z.parentNode; )
              z.nodeType === 1 && k.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < k.length; f++) {
              var w = k[f];
              w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
            }
          }
          ji = !!$u, Ku = $u = null;
        } finally {
          ge = n, D.p = a, C.T = l;
        }
      }
      e.current = t, $e = 2;
    }
  }
  function r0() {
    if ($e === 2) {
      $e = 0;
      var e = _l, t = qa, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = C.T, C.T = null;
        var a = D.p;
        D.p = 2;
        var n = ge;
        ge |= 4;
        try {
          Of(e, t.alternate, t);
        } finally {
          ge = n, D.p = a, C.T = l;
        }
      }
      $e = 3;
    }
  }
  function i0() {
    if ($e === 4 || $e === 3) {
      $e = 0, p2();
      var e = _l, t = qa, l = ul, a = Zf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? $e = 5 : ($e = 0, qa = _l = null, s0(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (Tl = null), es(l), t = t.stateNode, pt && typeof pt.onCommitFiberRoot == "function")
        try {
          pt.onCommitFiberRoot(
            rn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = C.T, n = D.p, D.p = 2, C.T = null;
        try {
          for (var r = e.onRecoverableError, d = 0; d < a.length; d++) {
            var f = a[d];
            r(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          C.T = t, D.p = n;
        }
      }
      (ul & 3) !== 0 && ci(), Yt(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === Ru ? Gn++ : (Gn = 0, Ru = e) : Gn = 0, Yn(0);
    }
  }
  function s0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, jn(t)));
  }
  function ci() {
    return n0(), r0(), i0(), u0();
  }
  function u0() {
    if ($e !== 5) return !1;
    var e = _l, t = ku;
    ku = 0;
    var l = es(ul), a = C.T, n = D.p;
    try {
      D.p = 32 > l ? 32 : l, C.T = null, l = Ou, Ou = null;
      var r = _l, d = ul;
      if ($e = 0, qa = _l = null, ul = 0, (ge & 6) !== 0) throw Error(c(331));
      var f = ge;
      if (ge |= 4, Vf(r.current), qf(
        r,
        r.current,
        d,
        l
      ), ge = f, Yn(0, !1), pt && typeof pt.onPostCommitFiberRoot == "function")
        try {
          pt.onPostCommitFiberRoot(rn, r);
        } catch {
        }
      return !0;
    } finally {
      D.p = n, C.T = a, s0(e, t);
    }
  }
  function o0(e, t, l) {
    t = zt(l, t), t = fu(e.stateNode, t, 2), e = bl(e, t, 2), e !== null && (un(e, 2), Yt(e));
  }
  function be(e, t, l) {
    if (e.tag === 3)
      o0(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          o0(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Tl === null || !Tl.has(a))) {
            e = zt(l, e), l = cf(2), a = bl(t, l, 2), a !== null && (df(
              l,
              a,
              t,
              e
            ), un(a, 2), Yt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Bu(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Ym();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(l) || (Au = !0, n.add(l), e = $m.bind(null, e, t, l), t.then(e, e));
  }
  function $m(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, ze === e && (ce & l) === l && (Re === 4 || Re === 3 && (ce & 62914560) === ce && 300 > gt() - ni ? (ge & 2) === 0 && Ga(e, 0) : Mu |= l, La === ce && (La = 0)), Yt(e);
  }
  function c0(e, t) {
    t === 0 && (t = ac()), e = Xl(e, t), e !== null && (un(e, t), Yt(e));
  }
  function Km(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), c0(e, l);
  }
  function Jm(e, t) {
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
    a !== null && a.delete(t), c0(e, l);
  }
  function Fm(e, t) {
    return Fi(e, t);
  }
  var di = null, Va = null, Hu = !1, fi = !1, Lu = !1, Al = 0;
  function Yt(e) {
    e !== Va && e.next === null && (Va === null ? di = Va = e : Va = Va.next = e), fi = !0, Hu || (Hu = !0, Im());
  }
  function Yn(e, t) {
    if (!Lu && fi) {
      Lu = !0;
      do
        for (var l = !1, a = di; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var r = 0;
            else {
              var d = a.suspendedLanes, f = a.pingedLanes;
              r = (1 << 31 - xt(42 | e) + 1) - 1, r &= n & ~(d & ~f), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (l = !0, h0(a, r));
          } else
            r = ce, r = pr(
              a,
              a === ze ? r : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (r & 3) === 0 || sn(a, r) || (l = !0, h0(a, r));
          a = a.next;
        }
      while (l);
      Lu = !1;
    }
  }
  function Wm() {
    d0();
  }
  function d0() {
    fi = Hu = !1;
    var e = 0;
    Al !== 0 && u4() && (e = Al);
    for (var t = gt(), l = null, a = di; a !== null; ) {
      var n = a.next, r = f0(a, t);
      r === 0 ? (a.next = null, l === null ? di = n : l.next = n, n === null && (Va = l)) : (l = a, (e !== 0 || (r & 3) !== 0) && (fi = !0)), a = n;
    }
    $e !== 0 && $e !== 5 || Yn(e), Al !== 0 && (Al = 0);
  }
  function f0(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r; ) {
      var d = 31 - xt(r), f = 1 << d, g = n[d];
      g === -1 ? ((f & l) === 0 || (f & a) !== 0) && (n[d] = N2(f, t)) : g <= t && (e.expiredLanes |= f), r &= ~f;
    }
    if (t = ze, l = ce, l = pr(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (ve === 2 || ve === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && Wi(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || sn(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && Wi(a), es(l)) {
        case 2:
        case 8:
          l = tc;
          break;
        case 32:
          l = fr;
          break;
        case 268435456:
          l = lc;
          break;
        default:
          l = fr;
      }
      return a = m0.bind(null, e), l = Fi(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && Wi(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function m0(e, t) {
    if ($e !== 0 && $e !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (ci() && e.callbackNode !== l)
      return null;
    var a = ce;
    return a = pr(
      e,
      e === ze ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (Kf(e, a, t), f0(e, gt()), e.callbackNode != null && e.callbackNode === l ? m0.bind(null, e) : null);
  }
  function h0(e, t) {
    if (ci()) return null;
    Kf(e, t, !0);
  }
  function Im() {
    c4(function() {
      (ge & 6) !== 0 ? Fi(
        ec,
        Wm
      ) : d0();
    });
  }
  function qu() {
    if (Al === 0) {
      var e = za;
      e === 0 && (e = mr, mr <<= 1, (mr & 261888) === 0 && (mr = 256)), Al = e;
    }
    return Al;
  }
  function g0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : br("" + e);
  }
  function p0(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function Pm(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var r = g0(
        (n[st] || null).action
      ), d = a.submitter;
      d && (t = (t = d[st] || null) ? g0(t.formAction) : d.getAttribute("formAction"), t !== null && (r = t, d = null));
      var f = new Nr(
        "action",
        "action",
        null,
        a,
        n
      );
      e.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Al !== 0) {
                  var g = d ? p0(n, d) : new FormData(n);
                  iu(
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
                typeof r == "function" && (f.preventDefault(), g = d ? p0(n, d) : new FormData(n), iu(
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
  for (var Gu = 0; Gu < Cs.length; Gu++) {
    var Yu = Cs[Gu], e4 = Yu.toLowerCase(), t4 = Yu[0].toUpperCase() + Yu.slice(1);
    Ut(
      e4,
      "on" + t4
    );
  }
  Ut(Zc, "onAnimationEnd"), Ut($c, "onAnimationIteration"), Ut(Kc, "onAnimationStart"), Ut("dblclick", "onDoubleClick"), Ut("focusin", "onFocus"), Ut("focusout", "onBlur"), Ut(xm, "onTransitionRun"), Ut(ym, "onTransitionStart"), Ut(vm, "onTransitionCancel"), Ut(Jc, "onTransitionEnd"), ha("onMouseEnter", ["mouseout", "mouseover"]), ha("onMouseLeave", ["mouseout", "mouseover"]), ha("onPointerEnter", ["pointerout", "pointerover"]), ha("onPointerLeave", ["pointerout", "pointerover"]), Gl(
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
  var Vn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), l4 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vn)
  );
  function x0(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], n = a.event;
      a = a.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var d = a.length - 1; 0 <= d; d--) {
            var f = a[d], g = f.instance, T = f.currentTarget;
            if (f = f.listener, g !== r && n.isPropagationStopped())
              break e;
            r = f, n.currentTarget = T;
            try {
              r(n);
            } catch (M) {
              _r(M);
            }
            n.currentTarget = null, r = g;
          }
        else
          for (d = 0; d < a.length; d++) {
            if (f = a[d], g = f.instance, T = f.currentTarget, f = f.listener, g !== r && n.isPropagationStopped())
              break e;
            r = f, n.currentTarget = T;
            try {
              r(n);
            } catch (M) {
              _r(M);
            }
            n.currentTarget = null, r = g;
          }
      }
    }
  }
  function oe(e, t) {
    var l = t[ts];
    l === void 0 && (l = t[ts] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (y0(t, e, 2, !1), l.add(a));
  }
  function Vu(e, t, l) {
    var a = 0;
    t && (a |= 4), y0(
      l,
      e,
      a,
      t
    );
  }
  var mi = "_reactListening" + Math.random().toString(36).slice(2);
  function Qu(e) {
    if (!e[mi]) {
      e[mi] = !0, cc.forEach(function(l) {
        l !== "selectionchange" && (l4.has(l) || Vu(l, !1, e), Vu(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[mi] || (t[mi] = !0, Vu("selectionchange", !1, t));
    }
  }
  function y0(e, t, l, a) {
    switch ($0(t)) {
      case 2:
        var n = M4;
        break;
      case 8:
        n = w4;
        break;
      default:
        n = ro;
    }
    l = n.bind(
      null,
      t,
      l,
      e
    ), n = void 0, !cs || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
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
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (d === 4)
            for (d = a.return; d !== null; ) {
              var g = d.tag;
              if ((g === 3 || g === 4) && d.stateNode.containerInfo === n)
                return;
              d = d.return;
            }
          for (; f !== null; ) {
            if (d = da(f), d === null) return;
            if (g = d.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = r = d;
              continue e;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    jc(function() {
      var T = r, M = us(l), k = [];
      e: {
        var _ = Fc.get(e);
        if (_ !== void 0) {
          var z = Nr, Z = e;
          switch (e) {
            case "keypress":
              if (jr(l) === 0) break e;
            case "keydown":
            case "keyup":
              z = J2;
              break;
            case "focusin":
              Z = "focus", z = hs;
              break;
            case "focusout":
              Z = "blur", z = hs;
              break;
            case "beforeblur":
            case "afterblur":
              z = hs;
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
              z = Ec;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = B2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = I2;
              break;
            case Zc:
            case $c:
            case Kc:
              z = q2;
              break;
            case Jc:
              z = em;
              break;
            case "scroll":
            case "scrollend":
              z = D2;
              break;
            case "wheel":
              z = lm;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = Y2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = _c;
              break;
            case "toggle":
            case "beforetoggle":
              z = nm;
          }
          var I = (t & 4) !== 0, Te = !I && (e === "scroll" || e === "scrollend"), N = I ? _ !== null ? _ + "Capture" : null : _;
          I = [];
          for (var v = T, E; v !== null; ) {
            var w = v;
            if (E = w.stateNode, w = w.tag, w !== 5 && w !== 26 && w !== 27 || E === null || N === null || (w = dn(v, N), w != null && I.push(
              Qn(v, w, E)
            )), Te) break;
            v = v.return;
          }
          0 < I.length && (_ = new z(
            _,
            Z,
            null,
            l,
            M
          ), k.push({ event: _, listeners: I }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (_ = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", _ && l !== ss && (Z = l.relatedTarget || l.fromElement) && (da(Z) || Z[ca]))
            break e;
          if ((z || _) && (_ = M.window === M ? M : (_ = M.ownerDocument) ? _.defaultView || _.parentWindow : window, z ? (Z = l.relatedTarget || l.toElement, z = T, Z = Z ? da(Z) : null, Z !== null && (Te = h(Z), I = Z.tag, Z !== Te || I !== 5 && I !== 27 && I !== 6) && (Z = null)) : (z = null, Z = T), z !== Z)) {
            if (I = Ec, w = "onMouseLeave", N = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (I = _c, w = "onPointerLeave", N = "onPointerEnter", v = "pointer"), Te = z == null ? _ : cn(z), E = Z == null ? _ : cn(Z), _ = new I(
              w,
              v + "leave",
              z,
              l,
              M
            ), _.target = Te, _.relatedTarget = E, w = null, da(M) === T && (I = new I(
              N,
              v + "enter",
              Z,
              l,
              M
            ), I.target = E, I.relatedTarget = Te, w = I), Te = w, z && Z)
              t: {
                for (I = a4, N = z, v = Z, E = 0, w = N; w; w = I(w))
                  E++;
                w = 0;
                for (var F = v; F; F = I(F))
                  w++;
                for (; 0 < E - w; )
                  N = I(N), E--;
                for (; 0 < w - E; )
                  v = I(v), w--;
                for (; E--; ) {
                  if (N === v || v !== null && N === v.alternate) {
                    I = N;
                    break t;
                  }
                  N = I(N), v = I(v);
                }
                I = null;
              }
            else I = null;
            z !== null && v0(
              k,
              _,
              z,
              I,
              !1
            ), Z !== null && Te !== null && v0(
              k,
              Te,
              Z,
              I,
              !0
            );
          }
        }
        e: {
          if (_ = T ? cn(T) : window, z = _.nodeName && _.nodeName.toLowerCase(), z === "select" || z === "input" && _.type === "file")
            var me = Dc;
          else if (Oc(_))
            if (Uc)
              me = hm;
            else {
              me = fm;
              var K = dm;
            }
          else
            z = _.nodeName, !z || z.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? T && is(T.elementType) && (me = Dc) : me = mm;
          if (me && (me = me(e, T))) {
            Rc(
              k,
              me,
              l,
              M
            );
            break e;
          }
          K && K(e, _, T), e === "focusout" && T && _.type === "number" && T.memoizedProps.value != null && rs(_, "number", _.value);
        }
        switch (K = T ? cn(T) : window, e) {
          case "focusin":
            (Oc(K) || K.contentEditable === "true") && (ba = K, bs = T, vn = null);
            break;
          case "focusout":
            vn = bs = ba = null;
            break;
          case "mousedown":
            Ss = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ss = !1, Qc(k, l, M);
            break;
          case "selectionchange":
            if (pm) break;
          case "keydown":
          case "keyup":
            Qc(k, l, M);
        }
        var ie;
        if (ps)
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
          va ? wc(e, l) && (de = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (de = "onCompositionStart");
        de && (zc && l.locale !== "ko" && (va || de !== "onCompositionStart" ? de === "onCompositionEnd" && va && (ie = Cc()) : (ml = M, ds = "value" in ml ? ml.value : ml.textContent, va = !0)), K = hi(T, de), 0 < K.length && (de = new Tc(
          de,
          e,
          null,
          l,
          M
        ), k.push({ event: de, listeners: K }), ie ? de.data = ie : (ie = kc(l), ie !== null && (de.data = ie)))), (ie = im ? sm(e, l) : um(e, l)) && (de = hi(T, "onBeforeInput"), 0 < de.length && (K = new Tc(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          M
        ), k.push({
          event: K,
          listeners: de
        }), K.data = ie)), Pm(
          k,
          e,
          T,
          l,
          M
        );
      }
      x0(k, t);
    });
  }
  function Qn(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function hi(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e, r = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || r === null || (n = dn(e, l), n != null && a.unshift(
        Qn(e, n, r)
      ), n = dn(e, t), n != null && a.push(
        Qn(e, n, r)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function a4(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function v0(e, t, l, a, n) {
    for (var r = t._reactName, d = []; l !== null && l !== a; ) {
      var f = l, g = f.alternate, T = f.stateNode;
      if (f = f.tag, g !== null && g === a) break;
      f !== 5 && f !== 26 && f !== 27 || T === null || (g = T, n ? (T = dn(l, r), T != null && d.unshift(
        Qn(l, T, g)
      )) : n || (T = dn(l, r), T != null && d.push(
        Qn(l, T, g)
      ))), l = l.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var n4 = /\r\n?/g, r4 = /\u0000|\uFFFD/g;
  function b0(e) {
    return (typeof e == "string" ? e : "" + e).replace(n4, `
`).replace(r4, "");
  }
  function S0(e, t) {
    return t = b0(t), b0(e) === t;
  }
  function Ee(e, t, l, a, n, r) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || pa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && pa(e, "" + a);
        break;
      case "className":
        yr(e, "class", a);
        break;
      case "tabIndex":
        yr(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        yr(e, l, a);
        break;
      case "style":
        bc(e, a, r);
        break;
      case "data":
        if (t !== "object") {
          yr(e, "data", a);
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
          typeof r == "function" && (l === "formAction" ? (t !== "input" && Ee(e, t, "name", n.name, n, null), Ee(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ee(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ee(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ee(e, t, "encType", n.encType, n, null), Ee(e, t, "method", n.method, n, null), Ee(e, t, "target", n.target, n, null)));
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
        oe("beforetoggle", e), oe("toggle", e), xr(e, "popover", a);
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
        xr(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = O2.get(l) || l, xr(e, l, a));
    }
  }
  function Zu(e, t, l, a, n, r) {
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
        typeof a == "string" ? pa(e, a) : (typeof a == "number" || typeof a == "bigint") && pa(e, "" + a);
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
        if (!dc.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), r = e[st] || null, r = r != null ? r[l] : null, typeof r == "function" && e.removeEventListener(t, r, n), typeof a == "function")) {
              typeof r != "function" && r !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : xr(e, l, a);
          }
    }
  }
  function et(e, t, l) {
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
                  Ee(e, t, r, d, l, null);
              }
          }
        n && Ee(e, t, "srcSet", l.srcSet, l, null), a && Ee(e, t, "src", l.src, l, null);
        return;
      case "input":
        oe("invalid", e);
        var f = r = d = n = null, g = null, T = null;
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
                  f = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(c(137, t));
                  break;
                default:
                  Ee(e, t, a, M, l, null);
              }
          }
        pc(
          e,
          r,
          f,
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
          if (l.hasOwnProperty(n) && (f = l[n], f != null))
            switch (n) {
              case "value":
                r = f;
                break;
              case "defaultValue":
                d = f;
                break;
              case "multiple":
                a = f;
              default:
                Ee(e, t, n, f, l, null);
            }
        t = r, l = d, e.multiple = !!a, t != null ? ga(e, !!a, t, !1) : l != null && ga(e, !!a, l, !0);
        return;
      case "textarea":
        oe("invalid", e), r = n = a = null;
        for (d in l)
          if (l.hasOwnProperty(d) && (f = l[d], f != null))
            switch (d) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                r = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(c(91));
                break;
              default:
                Ee(e, t, d, f, l, null);
            }
        yc(e, a, n, r);
        return;
      case "option":
        for (g in l)
          if (l.hasOwnProperty(g) && (a = l[g], a != null))
            switch (g) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ee(e, t, g, a, l, null);
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
        for (a = 0; a < Vn.length; a++)
          oe(Vn[a], e);
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
                Ee(e, t, T, a, l, null);
            }
        return;
      default:
        if (is(t)) {
          for (M in l)
            l.hasOwnProperty(M) && (a = l[M], a !== void 0 && Zu(
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
    for (f in l)
      l.hasOwnProperty(f) && (a = l[f], a != null && Ee(e, t, f, a, l, null));
  }
  function i4(e, t, l, a) {
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
        var n = null, r = null, d = null, f = null, g = null, T = null, M = null;
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
                a.hasOwnProperty(z) || Ee(e, t, z, null, a, k);
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
                f = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(c(137, t));
                break;
              default:
                z !== k && Ee(
                  e,
                  t,
                  _,
                  z,
                  a,
                  k
                );
            }
        }
        ns(
          e,
          d,
          f,
          g,
          T,
          M,
          r,
          n
        );
        return;
      case "select":
        z = d = f = _ = null;
        for (r in l)
          if (g = l[r], l.hasOwnProperty(r) && g != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                z = g;
              default:
                a.hasOwnProperty(r) || Ee(
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
                f = r;
                break;
              case "multiple":
                d = r;
              default:
                r !== g && Ee(
                  e,
                  t,
                  n,
                  r,
                  a,
                  g
                );
            }
        t = f, l = d, a = z, _ != null ? ga(e, !!l, _, !1) : !!a != !!l && (t != null ? ga(e, !!l, t, !0) : ga(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        z = _ = null;
        for (f in l)
          if (n = l[f], l.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ee(e, t, f, null, a, n);
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
                n !== r && Ee(e, t, d, n, a, r);
            }
        xc(e, _, z);
        return;
      case "option":
        for (var Z in l)
          if (_ = l[Z], l.hasOwnProperty(Z) && _ != null && !a.hasOwnProperty(Z))
            switch (Z) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ee(
                  e,
                  t,
                  Z,
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
                Ee(
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
        for (var I in l)
          _ = l[I], l.hasOwnProperty(I) && _ != null && !a.hasOwnProperty(I) && Ee(e, t, I, null, a, _);
        for (T in a)
          if (_ = a[T], z = l[T], a.hasOwnProperty(T) && _ !== z && (_ != null || z != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(c(137, t));
                break;
              default:
                Ee(
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
        if (is(t)) {
          for (var Te in l)
            _ = l[Te], l.hasOwnProperty(Te) && _ !== void 0 && !a.hasOwnProperty(Te) && Zu(
              e,
              t,
              Te,
              void 0,
              a,
              _
            );
          for (M in a)
            _ = a[M], z = l[M], !a.hasOwnProperty(M) || _ === z || _ === void 0 && z === void 0 || Zu(
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
      _ = l[N], l.hasOwnProperty(N) && _ != null && !a.hasOwnProperty(N) && Ee(e, t, N, null, a, _);
    for (k in a)
      _ = a[k], z = l[k], !a.hasOwnProperty(k) || _ === z || _ == null && z == null || Ee(e, t, k, _, a, z);
  }
  function j0(e) {
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
  function s4() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], r = n.transferSize, d = n.initiatorType, f = n.duration;
        if (r && f && j0(d)) {
          for (d = 0, f = n.responseEnd, a += 1; a < l.length; a++) {
            var g = l[a], T = g.startTime;
            if (T > f) break;
            var M = g.transferSize, k = g.initiatorType;
            M && j0(k) && (g = g.responseEnd, d += M * (g < f ? 1 : (f - T) / (g - T)));
          }
          if (--a, t += 8 * (r + d) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var $u = null, Ku = null;
  function gi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function C0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function N0(e, t) {
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
  function Ju(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Fu = null;
  function u4() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Fu ? !1 : (Fu = e, !0) : (Fu = null, !1);
  }
  var E0 = typeof setTimeout == "function" ? setTimeout : void 0, o4 = typeof clearTimeout == "function" ? clearTimeout : void 0, T0 = typeof Promise == "function" ? Promise : void 0, c4 = typeof queueMicrotask == "function" ? queueMicrotask : typeof T0 < "u" ? function(e) {
    return T0.resolve(null).then(e).catch(d4);
  } : E0;
  function d4(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ml(e) {
    return e === "head";
  }
  function _0(e, t) {
    var l = t, a = 0;
    do {
      var n = l.nextSibling;
      if (e.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(n), $a(t);
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
            var d = r.nextSibling, f = r.nodeName;
            r[on] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && r.rel.toLowerCase() === "stylesheet" || l.removeChild(r), r = d;
          }
        } else
          l === "body" && Xn(e.ownerDocument.body);
      l = n;
    } while (l);
    $a(t);
  }
  function z0(e, t) {
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
  function Wu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wu(l), ls(l);
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
  function f4(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[on])
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
      if (e = Ot(e.nextSibling), e === null) break;
    }
    return null;
  }
  function m4(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function A0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ot(e.nextSibling), e === null)) return null;
    return e;
  }
  function Iu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Pu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function h4(e, t) {
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
  var eo = null;
  function M0(e) {
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
  function w0(e) {
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
  function k0(e, t, l) {
    switch (t = gi(l), e) {
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
    ls(e);
  }
  var Rt = /* @__PURE__ */ new Map(), O0 = /* @__PURE__ */ new Set();
  function pi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ol = D.d;
  D.d = {
    f: g4,
    r: p4,
    D: x4,
    C: y4,
    L: v4,
    m: b4,
    X: j4,
    S: S4,
    M: C4
  };
  function g4() {
    var e = ol.f(), t = si();
    return e || t;
  }
  function p4(e) {
    var t = fa(e);
    t !== null && t.tag === 5 && t.type === "form" ? Jd(t) : ol.r(e);
  }
  var Qa = typeof document > "u" ? null : document;
  function R0(e, t, l) {
    var a = Qa;
    if (a && typeof t == "string" && t) {
      var n = Tt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), O0.has(n) || (O0.add(n), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), et(t, "link", e), Ke(t), a.head.appendChild(t)));
    }
  }
  function x4(e) {
    ol.D(e), R0("dns-prefetch", e, null);
  }
  function y4(e, t) {
    ol.C(e, t), R0("preconnect", e, t);
  }
  function v4(e, t, l) {
    ol.L(e, t, l);
    var a = Qa;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + Tt(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Tt(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Tt(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Tt(e) + '"]';
      var r = n;
      switch (t) {
        case "style":
          r = Xa(e);
          break;
        case "script":
          r = Za(e);
      }
      Rt.has(r) || (e = S(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Rt.set(r, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Zn(r)) || t === "script" && a.querySelector($n(r)) || (t = a.createElement("link"), et(t, "link", e), Ke(t), a.head.appendChild(t)));
    }
  }
  function b4(e, t) {
    ol.m(e, t);
    var l = Qa;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Tt(a) + '"][href="' + Tt(e) + '"]', r = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Za(e);
      }
      if (!Rt.has(r) && (e = S({ rel: "modulepreload", href: e }, t), Rt.set(r, e), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector($n(r)))
              return;
        }
        a = l.createElement("link"), et(a, "link", e), Ke(a), l.head.appendChild(a);
      }
    }
  }
  function S4(e, t, l) {
    ol.S(e, t, l);
    var a = Qa;
    if (a && e) {
      var n = ma(a).hoistableStyles, r = Xa(e);
      t = t || "default";
      var d = n.get(r);
      if (!d) {
        var f = { loading: 0, preload: null };
        if (d = a.querySelector(
          Zn(r)
        ))
          f.loading = 5;
        else {
          e = S(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Rt.get(r)) && to(e, l);
          var g = d = a.createElement("link");
          Ke(g), et(g, "link", e), g._p = new Promise(function(T, M) {
            g.onload = T, g.onerror = M;
          }), g.addEventListener("load", function() {
            f.loading |= 1;
          }), g.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, xi(d, t, a);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: f
        }, n.set(r, d);
      }
    }
  }
  function j4(e, t) {
    ol.X(e, t);
    var l = Qa;
    if (l && e) {
      var a = ma(l).hoistableScripts, n = Za(e), r = a.get(n);
      r || (r = l.querySelector($n(n)), r || (e = S({ src: e, async: !0 }, t), (t = Rt.get(n)) && lo(e, t), r = l.createElement("script"), Ke(r), et(r, "link", e), l.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, a.set(n, r));
    }
  }
  function C4(e, t) {
    ol.M(e, t);
    var l = Qa;
    if (l && e) {
      var a = ma(l).hoistableScripts, n = Za(e), r = a.get(n);
      r || (r = l.querySelector($n(n)), r || (e = S({ src: e, async: !0, type: "module" }, t), (t = Rt.get(n)) && lo(e, t), r = l.createElement("script"), Ke(r), et(r, "link", e), l.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, a.set(n, r));
    }
  }
  function D0(e, t, l, a) {
    var n = (n = se.current) ? pi(n) : null;
    if (!n) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Xa(l.href), l = ma(
          n
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Xa(l.href);
          var r = ma(
            n
          ).hoistableStyles, d = r.get(e);
          if (d || (n = n.ownerDocument || n, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(e, d), (r = n.querySelector(
            Zn(e)
          )) && !r._p && (d.instance = r, d.state.loading = 5), Rt.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Rt.set(e, l), r || N4(
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
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Za(l), l = ma(
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
  function Xa(e) {
    return 'href="' + Tt(e) + '"';
  }
  function Zn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function U0(e) {
    return S({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function N4(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), et(t, "link", l), Ke(t), e.head.appendChild(t));
  }
  function Za(e) {
    return '[src="' + Tt(e) + '"]';
  }
  function $n(e) {
    return "script[async]" + e;
  }
  function B0(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Tt(l.href) + '"]'
          );
          if (a)
            return t.instance = a, Ke(a), a;
          var n = S({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Ke(a), et(a, "style", n), xi(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = Xa(l.href);
          var r = e.querySelector(
            Zn(n)
          );
          if (r)
            return t.state.loading |= 4, t.instance = r, Ke(r), r;
          a = U0(l), (n = Rt.get(n)) && to(a, n), r = (e.ownerDocument || e).createElement("link"), Ke(r);
          var d = r;
          return d._p = new Promise(function(f, g) {
            d.onload = f, d.onerror = g;
          }), et(r, "link", a), t.state.loading |= 4, xi(r, l.precedence, e), t.instance = r;
        case "script":
          return r = Za(l.src), (n = e.querySelector(
            $n(r)
          )) ? (t.instance = n, Ke(n), n) : (a = l, (n = Rt.get(r)) && (a = S({}, l), lo(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ke(n), et(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, xi(a, l.precedence, e));
    return t.instance;
  }
  function xi(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, r = n, d = 0; d < a.length; d++) {
      var f = a[d];
      if (f.dataset.precedence === t) r = f;
      else if (r !== n) break;
    }
    r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function to(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function lo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var yi = null;
  function H0(e, t, l) {
    if (yi === null) {
      var a = /* @__PURE__ */ new Map(), n = yi = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = yi, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
      var r = l[n];
      if (!(r[on] || r[Fe] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = r.getAttribute(t) || "";
        d = e + d;
        var f = a.get(d);
        f ? f.push(r) : a.set(d, [r]);
      }
    }
    return a;
  }
  function L0(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function E4(e, t, l) {
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
  function q0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function T4(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Xa(a.href), r = t.querySelector(
          Zn(n)
        );
        if (r) {
          t = r._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = vi.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = r, Ke(r);
          return;
        }
        r = t.ownerDocument || t, a = U0(a), (n = Rt.get(n)) && to(a, n), r = r.createElement("link"), Ke(r);
        var d = r;
        d._p = new Promise(function(f, g) {
          d.onload = f, d.onerror = g;
        }), et(r, "link", a), l.instance = r;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = vi.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var ao = 0;
  function _4(e, t) {
    return e.stylesheets && e.count === 0 && Si(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && Si(e, e.stylesheets), e.unsuspend) {
          var r = e.unsuspend;
          e.unsuspend = null, r();
        }
      }, 6e4 + t);
      0 < e.imgBytes && ao === 0 && (ao = 62500 * s4());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Si(e, e.stylesheets), e.unsuspend)) {
            var r = e.unsuspend;
            e.unsuspend = null, r();
          }
        },
        (e.imgBytes > ao ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function vi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Si(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var bi = null;
  function Si(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, bi = /* @__PURE__ */ new Map(), t.forEach(z4, e), bi = null, vi.call(e));
  }
  function z4(e, t) {
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
      n = t.instance, d = n.getAttribute("data-precedence"), r = l.get(d) || a, r === a && l.set(null, n), l.set(d, n), this.count++, a = vi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), r ? r.parentNode.insertBefore(n, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Kn = {
    $$typeof: ae,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0
  };
  function A4(e, t, l, a, n, r, d, f, g) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ii(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ii(0), this.hiddenUpdates = Ii(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = r, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function G0(e, t, l, a, n, r, d, f, g, T, M, k) {
    return e = new A4(
      e,
      t,
      l,
      d,
      g,
      T,
      M,
      k,
      f
    ), t = 1, r === !0 && (t |= 24), r = vt(3, null, null, t), e.current = r, r.stateNode = e, t = Us(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, qs(r), e;
  }
  function Y0(e) {
    return e ? (e = Ca, e) : Ca;
  }
  function V0(e, t, l, a, n, r) {
    n = Y0(n), a.context === null ? a.context = n : a.pendingContext = n, a = vl(t), a.payload = { element: l }, r = r === void 0 ? null : r, r !== null && (a.callback = r), l = bl(e, a, t), l !== null && (mt(l, e, t), Tn(l, e, t));
  }
  function Q0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function no(e, t) {
    Q0(e, t), (e = e.alternate) && Q0(e, t);
  }
  function X0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xl(e, 67108864);
      t !== null && mt(t, e, 67108864), no(e, 67108864);
    }
  }
  function Z0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Nt();
      t = Pi(t);
      var l = Xl(e, t);
      l !== null && mt(l, e, t), no(e, t);
    }
  }
  var ji = !0;
  function M4(e, t, l, a) {
    var n = C.T;
    C.T = null;
    var r = D.p;
    try {
      D.p = 2, ro(e, t, l, a);
    } finally {
      D.p = r, C.T = n;
    }
  }
  function w4(e, t, l, a) {
    var n = C.T;
    C.T = null;
    var r = D.p;
    try {
      D.p = 8, ro(e, t, l, a);
    } finally {
      D.p = r, C.T = n;
    }
  }
  function ro(e, t, l, a) {
    if (ji) {
      var n = io(a);
      if (n === null)
        Xu(
          e,
          t,
          a,
          Ci,
          l
        ), K0(e, a);
      else if (O4(
        n,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (K0(e, a), t & 4 && -1 < k4.indexOf(e)) {
        for (; n !== null; ) {
          var r = fa(n);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var d = ql(r.pendingLanes);
                  if (d !== 0) {
                    var f = r;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; d; ) {
                      var g = 1 << 31 - xt(d);
                      f.entanglements[1] |= g, d &= ~g;
                    }
                    Yt(r), (ge & 6) === 0 && (ri = gt() + 500, Yn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Xl(r, 2), f !== null && mt(f, r, 2), si(), no(r, 2);
            }
          if (r = io(a), r === null && Xu(
            e,
            t,
            a,
            Ci,
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
  function io(e) {
    return e = us(e), so(e);
  }
  var Ci = null;
  function so(e) {
    if (Ci = null, e = da(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = x(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = y(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Ci = e, null;
  }
  function $0(e) {
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
        switch (x2()) {
          case ec:
            return 2;
          case tc:
            return 8;
          case fr:
          case y2:
            return 32;
          case lc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var uo = !1, wl = null, kl = null, Ol = null, Jn = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new Map(), Rl = [], k4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function K0(e, t) {
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
        Jn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fn.delete(t.pointerId);
    }
  }
  function Wn(e, t, l, a, n, r) {
    return e === null || e.nativeEvent !== r ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: r,
      targetContainers: [n]
    }, t !== null && (t = fa(t), t !== null && X0(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function O4(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return wl = Wn(
          wl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return kl = Wn(
          kl,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return Ol = Wn(
          Ol,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var r = n.pointerId;
        return Jn.set(
          r,
          Wn(
            Jn.get(r) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return r = n.pointerId, Fn.set(
          r,
          Wn(
            Fn.get(r) || null,
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
  function J0(e) {
    var t = da(e.target);
    if (t !== null) {
      var l = h(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = x(l), t !== null) {
            e.blockedOn = t, uc(e.priority, function() {
              Z0(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = y(l), t !== null) {
            e.blockedOn = t, uc(e.priority, function() {
              Z0(l);
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
  function Ni(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = io(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        ss = a, l.target.dispatchEvent(a), ss = null;
      } else
        return t = fa(l), t !== null && X0(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function F0(e, t, l) {
    Ni(e) && l.delete(t);
  }
  function R4() {
    uo = !1, wl !== null && Ni(wl) && (wl = null), kl !== null && Ni(kl) && (kl = null), Ol !== null && Ni(Ol) && (Ol = null), Jn.forEach(F0), Fn.forEach(F0);
  }
  function Ei(e, t) {
    e.blockedOn === t && (e.blockedOn = null, uo || (uo = !0, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      R4
    )));
  }
  var Ti = null;
  function W0(e) {
    Ti !== e && (Ti = e, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      function() {
        Ti === e && (Ti = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (so(a || l) === null)
              continue;
            break;
          }
          var r = fa(l);
          r !== null && (e.splice(t, 3), t -= 3, iu(
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
  function $a(e) {
    function t(g) {
      return Ei(g, e);
    }
    wl !== null && Ei(wl, e), kl !== null && Ei(kl, e), Ol !== null && Ei(Ol, e), Jn.forEach(t), Fn.forEach(t);
    for (var l = 0; l < Rl.length; l++) {
      var a = Rl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < Rl.length && (l = Rl[0], l.blockedOn === null); )
      J0(l), l.blockedOn === null && Rl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], r = l[a + 1], d = n[st] || null;
        if (typeof r == "function")
          d || W0(l);
        else if (d) {
          var f = null;
          if (r && r.hasAttribute("formAction")) {
            if (n = r, d = r[st] || null)
              f = d.formAction;
            else if (so(n) !== null) continue;
          } else f = d.action;
          typeof f == "function" ? l[a + 1] = f : (l.splice(a, 3), a -= 3), W0(l);
        }
      }
  }
  function I0() {
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
  function oo(e) {
    this._internalRoot = e;
  }
  _i.prototype.render = oo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var l = t.current, a = Nt();
    V0(l, a, e, t, null, null);
  }, _i.prototype.unmount = oo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      V0(e.current, 2, null, e, null, null), si(), t[ca] = null;
    }
  };
  function _i(e) {
    this._internalRoot = e;
  }
  _i.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = sc();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Rl.length && t !== 0 && t < Rl[l].priority; l++) ;
      Rl.splice(l, 0, e), l === 0 && J0(e);
    }
  };
  var P0 = s.version;
  if (P0 !== "19.2.3")
    throw Error(
      c(
        527,
        P0,
        "19.2.3"
      )
    );
  D.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = j(t), e = e !== null ? A(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var D4 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zi.isDisabled && zi.supportsFiber)
      try {
        rn = zi.inject(
          D4
        ), pt = zi;
      } catch {
      }
  }
  return Pn.createRoot = function(e, t) {
    if (!m(e)) throw Error(c(299));
    var l = !1, a = "", n = rf, r = sf, d = uf;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = G0(
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
      I0
    ), e[ca] = t.current, Qu(e), new oo(t);
  }, Pn.hydrateRoot = function(e, t, l) {
    if (!m(e)) throw Error(c(299));
    var a = !1, n = "", r = rf, d = sf, f = uf, g = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (r = l.onUncaughtError), l.onCaughtError !== void 0 && (d = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), t = G0(
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
      f,
      I0
    ), t.context = Y0(null), l = t.current, a = Nt(), a = Pi(a), n = vl(a), n.callback = null, bl(l, n, a), l = a, t.current.lanes = l, un(t, l), Yt(t), e[ca] = t.current, Qu(e), new _i(t);
  }, Pn.version = "19.2.3", Pn;
}
var o1;
function $4() {
  if (o1) return mo.exports;
  o1 = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return o(), mo.exports = Z4(), mo.exports;
}
var K4 = $4();
const H1 = /* @__PURE__ */ Uo(K4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J4 = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), F4 = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, u, c) => c ? c.toUpperCase() : u.toLowerCase()
), c1 = (o) => {
  const s = F4(o);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, L1 = (...o) => o.filter((s, u, c) => !!s && s.trim() !== "" && c.indexOf(s) === u).join(" ").trim(), W4 = (o) => {
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
var I4 = {
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
const P4 = O.forwardRef(
  ({
    color: o = "currentColor",
    size: s = 24,
    strokeWidth: u = 2,
    absoluteStrokeWidth: c,
    className: m = "",
    children: h,
    iconNode: x,
    ...y
  }, p) => O.createElement(
    "svg",
    {
      ref: p,
      ...I4,
      width: s,
      height: s,
      stroke: o,
      strokeWidth: c ? Number(u) * 24 / Number(s) : u,
      className: L1("lucide", m),
      ...!h && !W4(y) && { "aria-hidden": "true" },
      ...y
    },
    [
      ...x.map(([j, A]) => O.createElement(j, A)),
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
const J = (o, s) => {
  const u = O.forwardRef(
    ({ className: c, ...m }, h) => O.createElement(P4, {
      ref: h,
      iconNode: s,
      className: L1(
        `lucide-${J4(c1(o))}`,
        `lucide-${o}`,
        c
      ),
      ...m
    })
  );
  return u.displayName = c1(o), u;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eh = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], th = J("arrow-down-to-line", eh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lh = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], ah = J("arrow-up-right", lh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nh = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], rh = J("bell", nh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ih = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], sh = J("book-open", ih);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uh = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], q1 = J("bot", uh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oh = [
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
], ch = J("boxes", oh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dh = [
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
], fh = J("brain-circuit", dh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mh = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], G1 = J("brain", mh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [
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
], gh = J("calculator", hh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ph = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Y1 = J("check", ph);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], rr = J("chevron-down", xh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], V1 = J("chevron-right", yh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Ho = J("circle-alert", vh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bh = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Lo = J("circle-check-big", bh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], jh = J("circle-check", Sh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Nh = J("clock", Ch);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], Th = J("cloud", Eh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], Q1 = J("copy", _h);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], d1 = J("corner-down-left", zh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ah = [
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
], qo = J("cpu", Ah);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], ur = J("database", Mh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Hi = J("download", wh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], Oh = J("external-link", kh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Dh = J("eye", Rh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uh = [
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
], Go = J("file-text", Uh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], Hh = J("hash", Bh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], qh = J("info", Lh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gh = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Yo = J("key", Gh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yh = [
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
], Vo = J("layers", Yh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Qh = J("layout-dashboard", Vh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xh = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], Zh = J("list", Xh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $h = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], X1 = J("loader-circle", $h);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kh = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], Jh = J("maximize-2", Kh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], Wh = J("menu", Fh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], f1 = J("moon", Ih);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ph = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], Z1 = J("network", Ph);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e3 = [
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
], m1 = J("palette", e3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t3 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], l3 = J("pause", t3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], n3 = J("pen", a3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r3 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Qo = J("play", r3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Xo = J("plus", i3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s3 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Zo = J("power", s3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u3 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], en = J("refresh-cw", u3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o3 = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], $1 = J("regex", o3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c3 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], d3 = J("save", c3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f3 = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], m3 = J("scissors", f3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h3 = [
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
], g3 = J("scroll-text", h3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], ar = J("search", p3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x3 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], y3 = J("send", x3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v3 = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], K1 = J("server", v3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b3 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], J1 = J("settings", b3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S3 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], $o = J("settings-2", S3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j3 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], C3 = J("sun", j3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N3 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], an = J("terminal", N3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], or = J("trash-2", E3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T3 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], _3 = J("triangle-alert", T3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z3 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], A3 = J("upload", z3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M3 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Vi = J("x", M3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w3 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Ko = J("zap", w3), k3 = () => /* @__PURE__ */ i.jsx("style", { children: `
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
  ` }), Co = [
  // 导航命令
  {
    id: "nav-memory",
    icon: Zh,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (o) => o("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: Z1,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (o) => o("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: G1,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (o) => o("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Yo,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (o) => o("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: an,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (o) => o("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: J1,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (o) => o("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function O3(o) {
  const s = o.toLowerCase().trim();
  return s ? Co.filter((u) => {
    var c;
    return u.label.toLowerCase().includes(s) || ((c = u.description) == null ? void 0 : c.toLowerCase().includes(s)) || u.keywords.some((m) => m.toLowerCase().includes(s));
  }) : Co;
}
const R3 = {
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
}, D3 = {
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
}, U3 = {
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
}, B3 = {
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
}, H3 = {
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
}, L3 = {
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
}, Di = {
  sillytavern: L3,
  // SillyTavern 继承主题
  paperLight: R3,
  twitterDark: U3,
  claudeDark: D3,
  catppuccin: H3,
  discord: B3
}, tt = [];
for (let o = 0; o < 256; ++o)
  tt.push((o + 256).toString(16).slice(1));
function q3(o, s = 0) {
  return (tt[o[s + 0]] + tt[o[s + 1]] + tt[o[s + 2]] + tt[o[s + 3]] + "-" + tt[o[s + 4]] + tt[o[s + 5]] + "-" + tt[o[s + 6]] + tt[o[s + 7]] + "-" + tt[o[s + 8]] + tt[o[s + 9]] + "-" + tt[o[s + 10]] + tt[o[s + 11]] + tt[o[s + 12]] + tt[o[s + 13]] + tt[o[s + 14]] + tt[o[s + 15]]).toLowerCase();
}
let xo;
const G3 = new Uint8Array(16);
function Y3() {
  if (!xo) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    xo = crypto.getRandomValues.bind(crypto);
  }
  return xo(G3);
}
const V3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), h1 = { randomUUID: V3 };
function Q3(o, s, u) {
  var m;
  o = o || {};
  const c = o.random ?? ((m = o.rng) == null ? void 0 : m.call(o)) ?? Y3();
  if (c.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, q3(c);
}
function X3(o, s, u) {
  return h1.randomUUID && !o ? h1.randomUUID() : Q3(o);
}
var No = function(o, s) {
  return No = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, c) {
    u.__proto__ = c;
  } || function(u, c) {
    for (var m in c) Object.prototype.hasOwnProperty.call(c, m) && (u[m] = c[m]);
  }, No(o, s);
};
function cr(o, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  No(o, s);
  function u() {
    this.constructor = o;
  }
  o.prototype = s === null ? Object.create(s) : (u.prototype = s.prototype, new u());
}
function Eo(o) {
  var s = typeof Symbol == "function" && Symbol.iterator, u = s && o[s], c = 0;
  if (u) return u.call(o);
  if (o && typeof o.length == "number") return {
    next: function() {
      return o && c >= o.length && (o = void 0), { value: o && o[c++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function To(o, s) {
  var u = typeof Symbol == "function" && o[Symbol.iterator];
  if (!u) return o;
  var c = u.call(o), m, h = [], x;
  try {
    for (; (s === void 0 || s-- > 0) && !(m = c.next()).done; ) h.push(m.value);
  } catch (y) {
    x = { error: y };
  } finally {
    try {
      m && !m.done && (u = c.return) && u.call(c);
    } finally {
      if (x) throw x.error;
    }
  }
  return h;
}
function _o(o, s, u) {
  if (u || arguments.length === 2) for (var c = 0, m = s.length, h; c < m; c++)
    (h || !(c in s)) && (h || (h = Array.prototype.slice.call(s, 0, c)), h[c] = s[c]);
  return o.concat(h || Array.prototype.slice.call(s));
}
function Xt(o) {
  return typeof o == "function";
}
function F1(o) {
  var s = function(c) {
    Error.call(c), c.stack = new Error().stack;
  }, u = o(s);
  return u.prototype = Object.create(Error.prototype), u.prototype.constructor = u, u;
}
var yo = F1(function(o) {
  return function(u) {
    o(this), this.message = u ? u.length + ` errors occurred during unsubscription:
` + u.map(function(c, m) {
      return m + 1 + ") " + c.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = u;
  };
});
function zo(o, s) {
  if (o) {
    var u = o.indexOf(s);
    0 <= u && o.splice(u, 1);
  }
}
var Qi = (function() {
  function o(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return o.prototype.unsubscribe = function() {
    var s, u, c, m, h;
    if (!this.closed) {
      this.closed = !0;
      var x = this._parentage;
      if (x)
        if (this._parentage = null, Array.isArray(x))
          try {
            for (var y = Eo(x), p = y.next(); !p.done; p = y.next()) {
              var j = p.value;
              j.remove(this);
            }
          } catch (G) {
            s = { error: G };
          } finally {
            try {
              p && !p.done && (u = y.return) && u.call(y);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          x.remove(this);
      var A = this.initialTeardown;
      if (Xt(A))
        try {
          A();
        } catch (G) {
          h = G instanceof yo ? G.errors : [G];
        }
      var S = this._finalizers;
      if (S) {
        this._finalizers = null;
        try {
          for (var U = Eo(S), L = U.next(); !L.done; L = U.next()) {
            var H = L.value;
            try {
              g1(H);
            } catch (G) {
              h = h ?? [], G instanceof yo ? h = _o(_o([], To(h)), To(G.errors)) : h.push(G);
            }
          }
        } catch (G) {
          c = { error: G };
        } finally {
          try {
            L && !L.done && (m = U.return) && m.call(U);
          } finally {
            if (c) throw c.error;
          }
        }
      }
      if (h)
        throw new yo(h);
    }
  }, o.prototype.add = function(s) {
    var u;
    if (s && s !== this)
      if (this.closed)
        g1(s);
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
    u === s ? this._parentage = null : Array.isArray(u) && zo(u, s);
  }, o.prototype.remove = function(s) {
    var u = this._finalizers;
    u && zo(u, s), s instanceof o && s._removeParent(this);
  }, o.EMPTY = (function() {
    var s = new o();
    return s.closed = !0, s;
  })(), o;
})(), W1 = Qi.EMPTY;
function I1(o) {
  return o instanceof Qi || o && "closed" in o && Xt(o.remove) && Xt(o.add) && Xt(o.unsubscribe);
}
function g1(o) {
  Xt(o) ? o() : o.unsubscribe();
}
var Z3 = {
  Promise: void 0
}, $3 = {
  setTimeout: function(o, s) {
    for (var u = [], c = 2; c < arguments.length; c++)
      u[c - 2] = arguments[c];
    return setTimeout.apply(void 0, _o([o, s], To(u)));
  },
  clearTimeout: function(o) {
    return clearTimeout(o);
  },
  delegate: void 0
};
function K3(o) {
  $3.setTimeout(function() {
    throw o;
  });
}
function p1() {
}
function Ui(o) {
  o();
}
var Jo = (function(o) {
  cr(s, o);
  function s(u) {
    var c = o.call(this) || this;
    return c.isStopped = !1, u ? (c.destination = u, I1(u) && u.add(c)) : c.destination = W3, c;
  }
  return s.create = function(u, c, m) {
    return new Ao(u, c, m);
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
})(Qi), J3 = (function() {
  function o(s) {
    this.partialObserver = s;
  }
  return o.prototype.next = function(s) {
    var u = this.partialObserver;
    if (u.next)
      try {
        u.next(s);
      } catch (c) {
        Ai(c);
      }
  }, o.prototype.error = function(s) {
    var u = this.partialObserver;
    if (u.error)
      try {
        u.error(s);
      } catch (c) {
        Ai(c);
      }
    else
      Ai(s);
  }, o.prototype.complete = function() {
    var s = this.partialObserver;
    if (s.complete)
      try {
        s.complete();
      } catch (u) {
        Ai(u);
      }
  }, o;
})(), Ao = (function(o) {
  cr(s, o);
  function s(u, c, m) {
    var h = o.call(this) || this, x;
    return Xt(u) || !u ? x = {
      next: u ?? void 0,
      error: c ?? void 0,
      complete: m ?? void 0
    } : x = u, h.destination = new J3(x), h;
  }
  return s;
})(Jo);
function Ai(o) {
  K3(o);
}
function F3(o) {
  throw o;
}
var W3 = {
  closed: !0,
  next: p1,
  error: F3,
  complete: p1
}, I3 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function P3(o) {
  return o;
}
function e5(o) {
  return o.length === 0 ? P3 : o.length === 1 ? o[0] : function(u) {
    return o.reduce(function(c, m) {
      return m(c);
    }, u);
  };
}
var x1 = (function() {
  function o(s) {
    s && (this._subscribe = s);
  }
  return o.prototype.lift = function(s) {
    var u = new o();
    return u.source = this, u.operator = s, u;
  }, o.prototype.subscribe = function(s, u, c) {
    var m = this, h = l5(s) ? s : new Ao(s, u, c);
    return Ui(function() {
      var x = m, y = x.operator, p = x.source;
      h.add(y ? y.call(h, p) : p ? m._subscribe(h) : m._trySubscribe(h));
    }), h;
  }, o.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (u) {
      s.error(u);
    }
  }, o.prototype.forEach = function(s, u) {
    var c = this;
    return u = y1(u), new u(function(m, h) {
      var x = new Ao({
        next: function(y) {
          try {
            s(y);
          } catch (p) {
            h(p), x.unsubscribe();
          }
        },
        error: h,
        complete: m
      });
      c.subscribe(x);
    });
  }, o.prototype._subscribe = function(s) {
    var u;
    return (u = this.source) === null || u === void 0 ? void 0 : u.subscribe(s);
  }, o.prototype[I3] = function() {
    return this;
  }, o.prototype.pipe = function() {
    for (var s = [], u = 0; u < arguments.length; u++)
      s[u] = arguments[u];
    return e5(s)(this);
  }, o.prototype.toPromise = function(s) {
    var u = this;
    return s = y1(s), new s(function(c, m) {
      var h;
      u.subscribe(function(x) {
        return h = x;
      }, function(x) {
        return m(x);
      }, function() {
        return c(h);
      });
    });
  }, o.create = function(s) {
    return new o(s);
  }, o;
})();
function y1(o) {
  var s;
  return (s = o ?? Z3.Promise) !== null && s !== void 0 ? s : Promise;
}
function t5(o) {
  return o && Xt(o.next) && Xt(o.error) && Xt(o.complete);
}
function l5(o) {
  return o && o instanceof Jo || t5(o) && I1(o);
}
function a5(o) {
  return Xt(o == null ? void 0 : o.lift);
}
function n5(o) {
  return function(s) {
    if (a5(s))
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
function r5(o, s, u, c, m) {
  return new i5(o, s, u, c, m);
}
var i5 = (function(o) {
  cr(s, o);
  function s(u, c, m, h, x, y) {
    var p = o.call(this, u) || this;
    return p.onFinalize = x, p.shouldUnsubscribe = y, p._next = c ? function(j) {
      try {
        c(j);
      } catch (A) {
        u.error(A);
      }
    } : o.prototype._next, p._error = h ? function(j) {
      try {
        h(j);
      } catch (A) {
        u.error(A);
      } finally {
        this.unsubscribe();
      }
    } : o.prototype._error, p._complete = m ? function() {
      try {
        m();
      } catch (j) {
        u.error(j);
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
})(Jo), s5 = F1(function(o) {
  return function() {
    o(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Fo = (function(o) {
  cr(s, o);
  function s() {
    var u = o.call(this) || this;
    return u.closed = !1, u.currentObservers = null, u.observers = [], u.isStopped = !1, u.hasError = !1, u.thrownError = null, u;
  }
  return s.prototype.lift = function(u) {
    var c = new v1(this, this);
    return c.operator = u, c;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new s5();
  }, s.prototype.next = function(u) {
    var c = this;
    Ui(function() {
      var m, h;
      if (c._throwIfClosed(), !c.isStopped) {
        c.currentObservers || (c.currentObservers = Array.from(c.observers));
        try {
          for (var x = Eo(c.currentObservers), y = x.next(); !y.done; y = x.next()) {
            var p = y.value;
            p.next(u);
          }
        } catch (j) {
          m = { error: j };
        } finally {
          try {
            y && !y.done && (h = x.return) && h.call(x);
          } finally {
            if (m) throw m.error;
          }
        }
      }
    });
  }, s.prototype.error = function(u) {
    var c = this;
    Ui(function() {
      if (c._throwIfClosed(), !c.isStopped) {
        c.hasError = c.isStopped = !0, c.thrownError = u;
        for (var m = c.observers; m.length; )
          m.shift().error(u);
      }
    });
  }, s.prototype.complete = function() {
    var u = this;
    Ui(function() {
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
    var c = this, m = this, h = m.hasError, x = m.isStopped, y = m.observers;
    return h || x ? W1 : (this.currentObservers = null, y.push(u), new Qi(function() {
      c.currentObservers = null, zo(y, u);
    }));
  }, s.prototype._checkFinalizedStatuses = function(u) {
    var c = this, m = c.hasError, h = c.thrownError, x = c.isStopped;
    m ? u.error(h) : x && u.complete();
  }, s.prototype.asObservable = function() {
    var u = new x1();
    return u.source = this, u;
  }, s.create = function(u, c) {
    return new v1(u, c);
  }, s;
})(x1), v1 = (function(o) {
  cr(s, o);
  function s(u, c) {
    var m = o.call(this) || this;
    return m.destination = u, m.source = c, m;
  }
  return s.prototype.next = function(u) {
    var c, m;
    (m = (c = this.destination) === null || c === void 0 ? void 0 : c.next) === null || m === void 0 || m.call(c, u);
  }, s.prototype.error = function(u) {
    var c, m;
    (m = (c = this.destination) === null || c === void 0 ? void 0 : c.error) === null || m === void 0 || m.call(c, u);
  }, s.prototype.complete = function() {
    var u, c;
    (c = (u = this.destination) === null || u === void 0 ? void 0 : u.complete) === null || c === void 0 || c.call(u);
  }, s.prototype._subscribe = function(u) {
    var c, m;
    return (m = (c = this.source) === null || c === void 0 ? void 0 : c.subscribe(u)) !== null && m !== void 0 ? m : W1;
  }, s;
})(Fo);
function u5(o, s) {
  return n5(function(u, c) {
    var m = 0;
    u.subscribe(r5(c, function(h) {
      return o.call(s, h, m++) && c.next(h);
    }));
  });
}
const Mi = new Fo(), o5 = {
  /**
   * 发布事件
   */
  emit(o) {
    Mi.next({
      ...o,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(o) {
    const s = Mi.subscribe(o);
    return {
      unsubscribe: () => s.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(o, s) {
    const u = Mi.pipe(u5((c) => c.type === o)).subscribe((c) => s(c.payload));
    return {
      unsubscribe: () => u.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Mi.asObservable();
  }
};
var Ae = /* @__PURE__ */ ((o) => (o[o.DEBUG = 0] = "DEBUG", o[o.INFO = 1] = "INFO", o[o.SUCCESS = 2] = "SUCCESS", o[o.WARN = 3] = "WARN", o[o.ERROR = 4] = "ERROR", o))(Ae || {});
const Li = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, P1 = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, e2 = new Fo();
let cl = [], nr = { ...P1 };
function c5(o) {
  return new Date(o).toTimeString().slice(0, 8);
}
function Ia(o, s, u, c) {
  if (o < nr.minLevel) return;
  const m = {
    id: X3(),
    timestamp: Date.now(),
    level: o,
    module: s,
    message: u,
    data: c
  };
  cl.push(m), cl.length > nr.maxEntries && (cl = cl.slice(-nr.maxEntries)), e2.next(m);
}
function d5() {
  o5.subscribe((o) => {
    const u = {
      INGESTION_START: Ae.INFO,
      INGESTION_COMPLETE: Ae.SUCCESS,
      ENTITY_CREATED: Ae.INFO,
      MEMORY_STORED: Ae.SUCCESS,
      RETRIEVAL_START: Ae.DEBUG,
      RETRIEVAL_COMPLETE: Ae.SUCCESS,
      CHAT_CHANGED: Ae.INFO,
      MESSAGE_RECEIVED: Ae.DEBUG
    }[o.type] ?? Ae.DEBUG;
    Ia(u, "EventBus", `${o.type}`, o.payload);
  });
}
const pe = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(o) {
    o && (nr = { ...nr, ...o }), cl = [], d5(), pe.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(o, s, u) {
    Ia(Ae.DEBUG, o, s, u);
  },
  /**
   * INFO 级别日志
   */
  info(o, s, u) {
    Ia(Ae.INFO, o, s, u);
  },
  /**
   * SUCCESS 级别日志
   */
  success(o, s, u) {
    Ia(Ae.SUCCESS, o, s, u);
  },
  /**
   * WARN 级别日志
   */
  warn(o, s, u) {
    Ia(Ae.WARN, o, s, u);
  },
  /**
   * ERROR 级别日志
   */
  error(o, s, u) {
    Ia(Ae.ERROR, o, s, u);
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
    const s = e2.subscribe(o);
    return () => s.unsubscribe();
  },
  /**
   * 清空所有日志（仅内存）
   */
  clear() {
    cl = [], pe.info("Logger", "日志已清空");
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const o = /* @__PURE__ */ new Date();
    o.toISOString().slice(0, 10), o.toTimeString().slice(0, 8).replace(/:/g, "");
    const s = {
      [Ae.DEBUG]: "DEBUG",
      [Ae.INFO]: "INFO",
      [Ae.SUCCESS]: "SUCCESS",
      [Ae.WARN]: "WARN",
      [Ae.ERROR]: "ERROR"
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
      const m = c5(c.timestamp), h = s[c.level].padEnd(7), x = c.module.padEnd(16);
      if (u += `[${m}] [${x}] ${h} ${c.message}
`, c.data !== void 0) {
        const y = JSON.stringify(c.data, null, 2).split(`
`).map((p) => `    ${p}`).join(`
`);
        u += `${y}
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
}, t2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: P1,
  LogLevel: Ae,
  LogLevelConfig: Li,
  Logger: pe
}, Symbol.toStringTag, { value: "Module" })), na = Object.freeze({
  theme: "odysseia",
  presets: {},
  templates: {},
  promptTemplates: [],
  hasSeenWelcome: !1,
  lastReadVersion: "0.0.0",
  summarizerConfig: {},
  regexRules: []
});
class lt {
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
    return s != null && s.extensionSettings ? (s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...na }, pe.debug("SettingsManager", "Initialized engram settings with defaults"), this.save()), s.extensionSettings[this.EXTENSION_NAME]) : (pe.warn("SettingsManager", "SillyTavern context.extensionSettings not available"), { ...na });
  }
  /**
   * 初始化设置（在扩展加载时调用）
   * 确保所有必需的字段都存在
   */
  static initSettings() {
    const s = this.getContext();
    if (!(s != null && s.extensionSettings)) {
      pe.warn("SettingsManager", "Cannot init settings: context not available");
      return;
    }
    let u = !1;
    s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...na }, u = !0, pe.info("SettingsManager", "Created engram settings"));
    const c = s.extensionSettings[this.EXTENSION_NAME];
    for (const m of Object.keys(na))
      m in c || (c[m] = na[m], u = !0, pe.debug("SettingsManager", `Added missing field: ${m}`));
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
      pe.warn("SettingsManager", "Cannot set: context.extensionSettings not available");
      return;
    }
    c.extensionSettings[this.EXTENSION_NAME] || (c.extensionSettings[this.EXTENSION_NAME] = { ...na }), c.extensionSettings[this.EXTENSION_NAME][s] = u, pe.debug("SettingsManager", `Set ${String(s)} = ${JSON.stringify(u)}`), this.save();
  }
  /**
   * 保存设置到服务器
   */
  static save() {
    const s = this.getContext();
    s != null && s.saveSettingsDebounced ? (s.saveSettingsDebounced(), pe.debug("SettingsManager", "Saved via context.saveSettingsDebounced")) : pe.warn("SettingsManager", "saveSettingsDebounced not available");
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
    const u = this.getSummarizerSettings();
    this.set("summarizerConfig", { ...u, ...s });
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
Qe(lt, "EXTENSION_NAME", "engram");
const f5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: lt
}, Symbol.toStringTag, { value: "Module" }));
class Hl {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let u = lt.loadSettings().theme;
    u || (u = localStorage.getItem(this.STORAGE_KEY), u && lt.set("theme", u));
    const c = Di[u] ? u : "claudeDark";
    this.setTheme(c), pe.info("ThemeManager", `主题系统初始化完成: ${c}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    Di[s] || (pe.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, lt.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
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
    const u = Di[s];
    if (!u) return;
    const c = document.documentElement, m = (x, y) => {
      c.style.setProperty(x, y);
    };
    Object.entries(u.colors).forEach(([x, y]) => {
      let p = `--${x.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      p = p.replace(/(\d+)/, "-$1"), m(p, y);
    }), Object.entries(u.variables).forEach(([x, y]) => {
      m(`--${x}`, y);
    }), s !== "paperLight" ? c.classList.add("dark") : c.classList.remove("dark");
  }
}
Qe(Hl, "STORAGE_KEY", "engram-theme"), Qe(Hl, "currentTheme", "claudeDark");
const m5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Hl
}, Symbol.toStringTag, { value: "Module" })), l2 = O.createContext(void 0);
function a2({ children: o }) {
  const [s, u] = O.useState(Hl.getTheme()), c = s !== "paperLight", m = (h) => {
    Hl.setTheme(h), u(h);
  };
  return O.useEffect(() => {
    const h = Hl.getTheme();
    h !== s && u(h);
  }, []), /* @__PURE__ */ i.jsx(l2.Provider, { value: { theme: s, setTheme: m, isDarkMode: c }, children: o });
}
function h5() {
  const o = O.useContext(l2);
  if (o === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return o;
}
const g5 = ({ onNavigate: o }) => {
  const { setTheme: s } = h5(), [u, c] = O.useState(""), [m, h] = O.useState(!1), [x, y] = O.useState(0), [p, j] = O.useState(Co), A = O.useRef(null), S = [
    {
      id: "theme-paper-light",
      icon: C3,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: f1,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: f1,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: m1,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: m1,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  O.useEffect(() => {
    const H = O3(u), G = u.toLowerCase().trim(), te = S.filter(
      (P) => {
        var q;
        return !G || P.label.toLowerCase().includes(G) || ((q = P.description) == null ? void 0 : q.toLowerCase().includes(G)) || P.keywords.some((ae) => ae.toLowerCase().includes(G));
      }
    );
    j([...H, ...te]), y(0);
  }, [u]), O.useEffect(() => {
    const H = (G) => {
      (G.metaKey || G.ctrlKey) && G.key === "k" && (G.preventDefault(), h(!0));
    };
    return window.addEventListener("keydown", H), () => window.removeEventListener("keydown", H);
  }, []), O.useEffect(() => {
    m && setTimeout(() => {
      var H;
      return (H = A.current) == null ? void 0 : H.focus();
    }, 50);
  }, [m]);
  const U = (H) => {
    const G = p.length + (u ? 1 : 0);
    switch (H.key) {
      case "ArrowDown":
        H.preventDefault(), y((te) => (te + 1) % G);
        break;
      case "ArrowUp":
        H.preventDefault(), y((te) => (te - 1 + G) % G);
        break;
      case "Enter":
        H.preventDefault(), L();
        break;
      case "Escape":
        h(!1);
        break;
    }
  }, L = () => {
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
          /* @__PURE__ */ i.jsx(ar, { size: 18 }),
          /* @__PURE__ */ i.jsx("span", { className: "hidden md:inline text-xs opacity-70", children: "搜索..." }),
          /* @__PURE__ */ i.jsxs("kbd", { className: "hidden md:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-xs", children: "⌘" }),
            "K"
          ] })
        ]
      }
    ),
    m && /* @__PURE__ */ i.jsx(
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
                /* @__PURE__ */ i.jsx(ar, { size: 20, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ i.jsx(
                  "input",
                  {
                    ref: A,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: u,
                    onChange: (H) => c(H.target.value),
                    onKeyDown: U
                  }
                ),
                /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                p.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ i.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  p.map((H, G) => /* @__PURE__ */ i.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${G === x ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        H.action(o), h(!1), c("");
                      },
                      onMouseEnter: () => y(G),
                      children: [
                        /* @__PURE__ */ i.jsx(H.icon, { size: 18, className: `shrink-0 ${G === x ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsx("div", { className: "text-sm font-medium", children: H.label }),
                          H.description && /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: H.description })
                        ] }),
                        G === x && /* @__PURE__ */ i.jsx(d1, { size: 16, className: "text-muted-foreground/50" })
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
                      onClick: () => L(),
                      onMouseEnter: () => y(p.length),
                      children: [
                        /* @__PURE__ */ i.jsx(ar, { size: 18, className: `shrink-0 ${x === p.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ i.jsx("span", { className: "text-primary", children: u }),
                            '"'
                          ] }),
                          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        x === p.length && /* @__PURE__ */ i.jsx(d1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    }
                  )
                ] }),
                p.length === 0 && !u && /* @__PURE__ */ i.jsxs("div", { className: "px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ i.jsx(ar, { size: 32, className: "opacity-20 mb-2" }),
                  /* @__PURE__ */ i.jsx("p", { children: "输入关键词开始搜索..." })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}, Mo = ({ className: o = "", size: s = 24 }) => /* @__PURE__ */ i.jsx(
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
), p5 = ({
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
        children: /* @__PURE__ */ i.jsx(Wh, { size: 20 })
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ i.jsx(Mo, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Mo, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 flex justify-center max-w-xl mx-2 md:mx-4", children: /* @__PURE__ */ i.jsx(g5, { onNavigate: c }) }),
  /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-2 w-16 md:w-64 justify-end", children: /* @__PURE__ */ i.jsx(
    "button",
    {
      className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
      onClick: u,
      title: "关闭扩展",
      children: /* @__PURE__ */ i.jsx(Vi, { size: 20 })
    }
  ) })
] }), x5 = ({ className: o = "", height: s = 24 }) => {
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
}, wi = {
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
    const m = this.getToastr();
    m ? m.success(s, u, { ...wi, ...c }) : console.log(`[Engram] SUCCESS: ${u} - ${s}`), pe.info("Notification", `Success: ${s}`);
  }
  /**
   * 发送信息通知
   */
  info(s, u = "Engram", c = {}) {
    const m = this.getToastr();
    m ? m.info(s, u, { ...wi, ...c }) : console.log(`[Engram] INFO: ${u} - ${s}`), pe.info("Notification", `Info: ${s}`);
  }
  /**
   * 发送警告通知
   */
  warning(s, u = "Engram", c = {}) {
    const m = this.getToastr();
    m ? m.warning(s, u, { ...wi, ...c }) : console.warn(`[Engram] WARNING: ${u} - ${s}`), pe.warn("Notification", `Warning: ${s}`);
  }
  /**
   * 发送错误通知
   */
  error(s, u = "Engram", c = {}) {
    const m = this.getToastr();
    m ? m.error(s, u, { ...wi, timeOut: 8e3, ...c }) : console.error(`[Engram] ERROR: ${u} - ${s}`), pe.error("Notification", `Error: ${s}`);
  }
  /**
   * 清除所有通知
   */
  clear() {
    const s = this.getToastr();
    s && s.clear();
  }
};
Qe(sa, "instance");
let wo = sa;
const ia = wo.getInstance(), y5 = "0.2.0", v5 = {
  version: y5
}, Ka = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
  // 实际分支名是 master
}, ki = v5.version;
let er = null, tr = null;
function vo(o, s) {
  const u = o.split(".").map(Number), c = s.split(".").map(Number);
  for (let m = 0; m < Math.max(u.length, c.length); m++) {
    const h = u[m] || 0, x = c[m] || 0;
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
    return ki;
  }
  /**
   * 从 GitHub 获取最新版本号
   */
  static async getLatestVersion() {
    if (er)
      return er;
    try {
      const s = `https://raw.githubusercontent.com/${Ka.owner}/${Ka.repo}/${Ka.branch}/manifest.json`, u = await fetch(s);
      return u.ok ? (er = (await u.json()).version || null, er) : null;
    } catch {
      return null;
    }
  }
  /**
   * 检查是否有更新
   */
  static async hasUpdate() {
    const s = await this.getLatestVersion();
    return s ? vo(s, ki) > 0 : !1;
  }
  /**
   * 获取更新日志
   */
  static async getChangelog() {
    if (tr)
      return tr;
    try {
      const s = `https://raw.githubusercontent.com/${Ka.owner}/${Ka.repo}/${Ka.branch}/CHANGELOG.md`, u = await fetch(s);
      return u.ok ? (tr = await u.text(), tr) : (console.warn("[Engram] UpdateService: 获取更新日志失败", u.status), ia.warning(`获取更新日志失败: ${u.status}`, "更新检测"), null);
    } catch (s) {
      return console.error("[Engram] UpdateService: 获取更新日志异常", s), ia.error("获取更新日志异常", "更新检测"), null;
    }
  }
  /**
   * 获取已读版本（上次用户确认查看的版本）
   */
  static getReadVersion() {
    try {
      return lt.get("lastReadVersion") || "0.0.0";
    } catch {
      return "0.0.0";
    }
  }
  /**
   * 标记版本已读
   */
  static async markAsRead(s) {
    const u = s || await this.getLatestVersion() || ki;
    try {
      lt.set("lastReadVersion", u), console.debug("[Engram] UpdateService: 已标记版本已读", u);
    } catch (c) {
      console.error("[Engram] UpdateService: 标记已读失败", c);
    }
  }
  /**
   * 检查是否有未读更新
   */
  static async hasUnreadUpdate() {
    const s = await this.getLatestVersion();
    if (!s || vo(s, ki) <= 0)
      return !1;
    const u = this.getReadVersion();
    return vo(s, u) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    er = null, tr = null;
  }
}
const b5 = ({ isOpen: o, onClose: s }) => {
  const [u, c] = O.useState(!0), [m, h] = O.useState(null), [x, y] = O.useState(null), [p, j] = O.useState(!1), [A, S] = O.useState(!1), U = ra.getCurrentVersion();
  O.useEffect(() => {
    o && L();
  }, [o]);
  const L = async () => {
    c(!0);
    try {
      const [te, P, q] = await Promise.all([
        ra.getLatestVersion(),
        ra.getChangelog(),
        ra.hasUpdate()
      ]);
      h(te), y(P), j(q);
    } catch (te) {
      console.error("[Engram] 加载更新信息失败", te);
    } finally {
      c(!1);
    }
  }, H = async () => {
    S(!0);
    try {
      const te = m || U;
      console.debug("[Engram] Marking update as read:", te), await ra.markAsRead(te), s();
    } finally {
      S(!1);
    }
  }, G = () => {
    ra.clearCache(), L();
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
          /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ i.jsx(Hi, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("h2", { className: "text-base font-semibold text-foreground", children: "更新通知" }),
            /* @__PURE__ */ i.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "当前版本: v",
              U
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: G,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              title: "刷新",
              children: /* @__PURE__ */ i.jsx(en, { size: 16, className: u ? "animate-spin" : "" })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: s,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ i.jsx(Vi, { size: 16 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-5", children: u ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(en, { size: 24, className: "animate-spin mb-3" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "正在检查更新..." })
      ] }) : /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ i.jsx("div", { className: `
                                p-4 rounded-lg border
                                ${p ? "bg-primary/5 border-primary/20" : "bg-green-500/5 border-green-500/20"}
                            `, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
          p ? /* @__PURE__ */ i.jsx(Hi, { size: 20, className: "text-primary" }) : /* @__PURE__ */ i.jsx(Lo, { size: 20, className: "text-green-500" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("p", { className: "font-medium text-foreground", children: p ? `发现新版本: v${m}` : "已是最新版本" }),
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
  { id: "dashboard", label: "仪表盘", icon: Qh },
  { id: "memory", label: "记忆流", icon: fh },
  { id: "graph", label: "神经图谱", icon: Z1 },
  { id: "processing", label: "数据处理", icon: ah },
  { id: "presets", label: "API 预设", icon: ur },
  { id: "devlog", label: "开发日志", icon: an },
  { id: "settings", label: "系统设置", icon: $o }
], S5 = ({ children: o, activeTab: s, setActiveTab: u, onClose: c }) => {
  const [m, h] = O.useState(!1), [x, y] = O.useState(!1), [p, j] = O.useState(!1);
  return O.useEffect(() => {
    (async () => {
      try {
        const S = await ra.hasUnreadUpdate();
        j(S);
      } catch (S) {
        console.debug("[Engram] 检查更新失败", S);
      }
    })();
  }, []), /* @__PURE__ */ i.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ i.jsx(k3, {}),
    /* @__PURE__ */ i.jsx(
      b5,
      {
        isOpen: x,
        onClose: () => {
          y(!1), j(!1);
        }
      }
    ),
    /* @__PURE__ */ i.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50", children: [
      /* @__PURE__ */ i.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: b1.map((A) => {
        const S = A.icon, U = s === A.id;
        return /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => u(A.id),
            className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${U ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
            children: [
              /* @__PURE__ */ i.jsx(S, { size: 18, strokeWidth: U ? 2 : 1.5, className: "flex-shrink-0" }),
              /* @__PURE__ */ i.jsx("span", { className: `text-xs ${U ? "font-medium" : "font-normal"}`, children: A.label })
            ]
          },
          A.id
        );
      }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "pb-3 pt-2 border-t border-border/30 mt-2 space-y-2", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => y(!0),
            className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left",
            children: [
              /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ i.jsx(rh, { size: 16, strokeWidth: 1.5 }),
                p && /* @__PURE__ */ i.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ i.jsx("span", { className: "text-xs", children: "更新通知" }),
              p && /* @__PURE__ */ i.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
            ]
          }
        ),
        /* @__PURE__ */ i.jsx("div", { className: "opacity-40 text-muted-foreground px-2", children: /* @__PURE__ */ i.jsx(x5, { height: 12 }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ i.jsx(
        p5,
        {
          onToggleSidebar: () => h(!m),
          isMobile: !1,
          onClose: c,
          onNavigate: (A) => u(A.replace("/", ""))
        }
      ),
      m && /* @__PURE__ */ i.jsxs(
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
                        children: /* @__PURE__ */ i.jsx(Vi, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i.jsx("nav", { className: "space-y-4 flex-1 overflow-y-auto", children: b1.map((A) => {
                    const S = s === A.id;
                    return /* @__PURE__ */ i.jsxs(
                      "button",
                      {
                        onClick: () => {
                          u(A.id), h(!1);
                        },
                        className: `
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${S ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                            `,
                        children: [
                          /* @__PURE__ */ i.jsx(A.icon, { size: 22, className: S ? "text-primary" : "text-muted-foreground/70" }),
                          /* @__PURE__ */ i.jsx("span", { children: A.label })
                        ]
                      },
                      A.id
                    );
                  }) }),
                  /* @__PURE__ */ i.jsx("div", { className: "mt-auto pt-6 border-t border-border/20", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 px-2 text-xs text-muted-foreground/50", children: [
                    /* @__PURE__ */ i.jsx(Mo, { size: 14 }),
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
  highlight: m = !1
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${m ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ i.jsx("div", { className: `p-2 rounded-lg ${m ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ i.jsx(u, { size: 20 }) }),
    m && /* @__PURE__ */ i.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: s }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: o }),
    c && /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: c })
  ] })
] });
function ir() {
  var o, s;
  try {
    return ((s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) || null;
  } catch (u) {
    return console.warn("[Engram] Failed to get ST context:", u), null;
  }
}
function j5() {
  const o = ir();
  return (o == null ? void 0 : o.chat) || [];
}
function C5() {
  return j5();
}
function N5() {
  return ir() !== null;
}
async function S1() {
  const { Logger: o } = await Promise.resolve().then(() => t2);
  await o.init(), o.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: s } = await Promise.resolve().then(() => f5);
  s.initSettings(), o.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: c } = await Promise.resolve().then(() => Mg), m = await c();
    o.info("TavernAPI", "酒馆接口对接状态", m);
  } catch (c) {
    o.warn("TavernAPI", "酒馆接口检查失败", { error: String(c) });
  }
  try {
    const { summarizerService: c } = await Promise.resolve().then(() => Qt);
    c.start();
    const m = c.getStatus();
    o.info("Summarizer", "服务已启动", m);
  } catch (c) {
    o.warn("Summarizer", "服务启动失败", { error: String(c) });
  }
  E5();
  const { ThemeManager: u } = await Promise.resolve().then(() => m5);
  u.init(), A5(), o.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const n2 = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function E5() {
  const o = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!o) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), T5();
    return;
  }
  const u = document.createElement("div");
  u.id = "engram-drawer", u.className = "drawer";
  const c = document.createElement("div");
  c.className = "drawer-toggle drawer-header";
  const m = document.createElement("div");
  m.id = "engram-drawer-icon", m.className = "drawer-icon fa-fw closedIcon", m.title = "Engram - 记忆操作系统", m.setAttribute("data-i18n", "[title]Engram - Memory OS"), m.innerHTML = n2, m.addEventListener("click", Gi), c.appendChild(m), u.appendChild(c), s ? (o.insertBefore(u, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (o.appendChild(u), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function T5() {
  const o = document.createElement("div");
  o.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", o.title = "Engram - 记忆操作系统", o.innerHTML = n2, o.addEventListener("click", Gi), document.body.appendChild(o);
}
let qi = null;
function _5(o) {
  qi = o, qi = o;
}
let ko = null, j1 = null;
function z5(o) {
  ko = o;
}
function A5() {
  if (!ko) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const o = "engram-global-overlay";
  let s = document.getElementById(o);
  s || (s = document.createElement("div"), s.id = o, s.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(s)), j1 || (j1 = ko(s, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let So = !1, lr = null, Bi = null;
function Gi() {
  So && lr ? (Bi && (Bi.unmount(), Bi = null), lr.remove(), lr = null, So = !1) : (lr = M5(), document.body.appendChild(lr), So = !0);
}
function M5() {
  var s;
  const o = document.createElement("div");
  return o.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", o.style.backgroundColor = "var(--background)", o.style.color = "var(--foreground)", o.style.height = "100dvh", o.style.width = "100vw", o.style.top = "0", o.style.left = "0", o.id = "engram-panel-root", qi ? Bi = qi(o, Gi) : (o.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = o.querySelector("button")) == null || s.addEventListener("click", Gi)), o;
}
async function w5(o, s) {
  try {
    const c = await new Function("path", "return import(path)")("/scripts/chats.js");
    c && typeof c.hideChatMessageRange == "function" ? (await c.hideChatMessageRange(o, s, !1), console.log(`[Engram] Hidden messages range: ${o}-${s}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (u) {
    console.error("[Engram] Failed to hide messages:", u);
  }
}
const k5 = (o) => {
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
}, C1 = ({ onNavigate: o }) => {
  const [s, u] = O.useState([]), [c, m] = O.useState(ir()), [h, x] = O.useState(0);
  O.useEffect(() => (u(pe.getLogs().slice(0, 3)), pe.subscribe((S) => {
    u((U) => [S, ...U].slice(0, 3));
  })), []), O.useEffect(() => {
    const A = setInterval(() => {
      x((S) => S + 1);
    }, 1e3);
    return () => clearInterval(A);
  }, []);
  const y = (A) => {
    const S = Math.floor(A / 3600), U = Math.floor(A % 3600 / 60), L = A % 60;
    return `${S.toString().padStart(2, "0")}:${U.toString().padStart(2, "0")}:${L.toString().padStart(2, "0")}`;
  }, p = (c == null ? void 0 : c.name2) || "Unknown", j = (A) => {
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
          icon: K1,
          highlight: !!c
        }
      ),
      /* @__PURE__ */ i.jsx(
        bo,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: ur
        }
      ),
      /* @__PURE__ */ i.jsx(
        bo,
        {
          title: "SYSTEM UPTIME",
          value: y(h),
          subtext: "Session Duration",
          icon: qo
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(Ko, { size: 16 }),
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
        /* @__PURE__ */ i.jsx(an, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ i.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => j("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map((A) => /* @__PURE__ */ i.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${k5(A.level)}`, children: [
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
] }), N1 = ({
  icon: o,
  label: s,
  primary: u = !1,
  size: c = "md",
  className: m = "",
  ...h
}) => /* @__PURE__ */ i.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${c === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${u ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${m}
        `,
    ...h,
    children: [
      o && /* @__PURE__ */ i.jsx(o, { size: c === "sm" ? 14 : 16 }),
      s
    ]
  }
), O5 = () => {
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
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Jh, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx($o, { size: 16 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ i.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((u, c) => {
        const m = o.find((S) => S.id === u.source), h = o.find((S) => S.id === u.target);
        if (!m || !h) return null;
        const x = m.x + 150 / 2, y = m.y + 60, p = h.x + 150 / 2, j = h.y, A = `M ${x} ${y} C ${x} ${y + 50}, ${p} ${j - 50}, ${p} ${j}`;
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
              u.type === "input" && /* @__PURE__ */ i.jsx(an, { size: 12, className: "text-blue-400" }),
              u.type === "process" && /* @__PURE__ */ i.jsx(qo, { size: 12, className: "text-purple-400" }),
              u.type === "output" && /* @__PURE__ */ i.jsx(ur, { size: 12, className: "text-emerald-400" }),
              u.label
            ] })
          ] })
        ]
      },
      u.id
    ))
  ] });
}, R5 = () => /* @__PURE__ */ i.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ i.jsx(
    Xi,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i.jsx(N1, { icon: Qo, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ i.jsx(N1, { icon: $o, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ i.jsx(O5, {}) })
] });
function D5(o) {
  return new Date(o).toTimeString().slice(0, 8);
}
const U5 = {
  [Ae.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Ae.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Ae.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Ae.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Ae.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, B5 = ({ entry: o }) => {
  const [s, u] = O.useState(!1), c = o.data !== void 0, m = Li[o.level], h = U5[o.level];
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
          /* @__PURE__ */ i.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: c ? s ? /* @__PURE__ */ i.jsx(rr, { size: 12 }) : /* @__PURE__ */ i.jsx(V1, { size: 12 }) : null }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: D5(o.timestamp) }),
          /* @__PURE__ */ i.jsx("span", { className: `
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${h.text} ${h.bg}
                `, children: m.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-500 shrink-0 text-[11px]", children: o.module }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-300 text-[11px] break-words flex-1 leading-relaxed", children: o.message })
        ]
      }
    ),
    s && c && /* @__PURE__ */ i.jsx("div", { className: "ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]", children: /* @__PURE__ */ i.jsx("pre", { className: "m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono", children: JSON.stringify(o.data, null, 2) }) })
  ] });
}, E1 = 100;
class H5 {
  constructor() {
    Qe(this, "entries", []);
    Qe(this, "listeners", /* @__PURE__ */ new Set());
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
    const m = {
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
    h >= 0 ? this.entries.splice(h, 0, m) : this.entries.unshift(m), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(s, u) {
    const c = this.logSend(s), m = Date.now();
    try {
      const h = await u();
      return this.logReceive(c, {
        response: typeof h == "string" ? h : JSON.stringify(h),
        status: "success",
        duration: Date.now() - m
      }), h;
    } catch (h) {
      throw this.logReceive(c, {
        status: "error",
        error: h instanceof Error ? h.message : String(h),
        duration: Date.now() - m
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
      const m = this.entries.find(
        (h) => h.id === `${c.id}_recv` && h.direction === "received"
      );
      s.push({ sent: c, received: m });
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
    this.entries.length > E1 * 2 && (this.entries = this.entries.slice(0, E1 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const Pa = new H5(), L5 = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, q5 = ({ status: o }) => {
  switch (o) {
    case "pending":
      return /* @__PURE__ */ i.jsx(X1, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ i.jsx(Lo, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ i.jsx(Ho, { size: 14, className: "text-red-400" });
  }
}, G5 = (o) => new Date(o).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), Y5 = (o) => o === void 0 ? "-" : o < 1e3 ? `${o}ms` : `${(o / 1e3).toFixed(1)}s`, V5 = ({ sent: o, received: s }) => {
  const [u, c] = O.useState(!1), m = L5[o.type];
  return /* @__PURE__ */ i.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => c(!u),
        children: [
          u ? /* @__PURE__ */ i.jsx(rr, { size: 14 }) : /* @__PURE__ */ i.jsx(V1, { size: 14 }),
          /* @__PURE__ */ i.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${m.color}`, children: m.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: G5(o.timestamp) }),
          /* @__PURE__ */ i.jsx(q5, { status: (s == null ? void 0 : s.status) || o.status }),
          o.floorRange && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            o.floorRange[0],
            "-",
            o.floorRange[1]
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ i.jsx(Nh, { size: 12 }),
            Y5((s == null ? void 0 : s.duration) || o.duration)
          ] })
        ]
      }
    ),
    u && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ i.jsx(y3, { size: 14 }),
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
          /* @__PURE__ */ i.jsx(q1, { size: 14 }),
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
          /* @__PURE__ */ i.jsx(X1, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, Q5 = () => {
  const [o, s] = O.useState(Pa.getPaired());
  return O.useEffect(() => Pa.subscribe(() => {
    s(Pa.getPaired());
  }), []), /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Ko, { size: 16, className: "text-primary" }),
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
          onClick: () => Pa.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ i.jsx(or, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: o.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ i.jsx(q1, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-3", children: o.map(({ sent: u, received: c }) => /* @__PURE__ */ i.jsx(V5, { sent: u, received: c }, u.id)) }) })
  ] });
}, Oo = ({ tabs: o, activeTab: s, onChange: u, sticky: c = !0, top: m = 0, className: h = "", actions: x }) => /* @__PURE__ */ i.jsxs(
  "div",
  {
    className: `
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${c ? "sticky z-10 bg-background pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12" : "px-0"}
            ${h}
        `,
    style: c ? { top: m } : void 0,
    children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex overflow-x-auto gap-2 pb-1 no-scrollbar", children: o.map((y) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          onClick: () => u(y.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === y.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            y.icon && /* @__PURE__ */ i.jsx("span", { className: "w-4 h-4", children: y.icon }),
            y.label,
            s === y.id && /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" })
          ]
        },
        y.id
      )) }),
      x && /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-2 pb-1 shrink-0", children: x })
    ]
  }
), X5 = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ i.jsx(an, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ i.jsx(Ko, { size: 14 }) }
], Z5 = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], $5 = ({ initialTab: o }) => {
  const [s, u] = O.useState(o || "runtime"), [c, m] = O.useState([]), [h, x] = O.useState([]), [y, p] = O.useState(""), [j, A] = O.useState(-1), [S, U] = O.useState("ALL"), [L, H] = O.useState(!0), [G, te] = O.useState(!1), [P, q] = O.useState(!1), ae = O.useRef(null);
  O.useEffect(() => {
    m(pe.getLogs());
    const X = pe.subscribe((Q) => {
      m((xe) => [...xe, Q]);
    });
    return () => X();
  }, []), O.useEffect(() => {
    let X = c;
    if (j !== -1 && (X = X.filter((Q) => Q.level >= j)), S !== "ALL" && (X = X.filter((Q) => Q.module.startsWith(S))), y.trim()) {
      const Q = y.toLowerCase();
      X = X.filter(
        (xe) => xe.message.toLowerCase().includes(Q) || xe.module.toLowerCase().includes(Q)
      );
    }
    x(X);
  }, [c, j, S, y]), O.useEffect(() => {
    L && ae.current && ae.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [h, L]);
  const V = O.useCallback(async () => {
    await pe.clear(), m([]);
  }, []), ee = O.useCallback(() => {
    const X = pe.exportToMarkdown(), Q = pe.getExportFilename(), xe = new Blob([X], { type: "text/markdown" }), Se = URL.createObjectURL(xe), Xe = document.createElement("a");
    Xe.href = Se, Xe.download = Q, Xe.click(), URL.revokeObjectURL(Se), pe.success("DevLog", `日志已导出: ${Q}`);
  }, []);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Oo,
      {
        tabs: X5,
        activeTab: s,
        onChange: (X) => u(X),
        sticky: !0
      }
    ),
    s === "runtime" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col flex-1 min-h-0", children: [
      /* @__PURE__ */ i.jsx("div", { className: "sticky top-[52px] z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => te(!G),
              children: [
                j === -1 ? "全部级别" : Li[j].label,
                /* @__PURE__ */ i.jsx(rr, { size: 12 })
              ]
            }
          ),
          G && /* @__PURE__ */ i.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  A(-1), te(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(Li).map(([X, Q]) => /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  A(Number(X)), te(!1);
                },
                children: [
                  Q.icon,
                  " ",
                  Q.label
                ]
              },
              X
            ))
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => q(!P),
              children: [
                S,
                /* @__PURE__ */ i.jsx(rr, { size: 12 })
              ]
            }
          ),
          P && /* @__PURE__ */ i.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col", children: Z5.map((X) => /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                U(X), q(!1);
              },
              children: X
            },
            X
          )) })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(ar, { size: 12 }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: y,
              onChange: (X) => p(X.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${L ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => H(!L),
              title: "自动滚动",
              children: /* @__PURE__ */ i.jsx(th, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: V,
              title: "清空",
              children: /* @__PURE__ */ i.jsx(or, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: ee,
              children: [
                /* @__PURE__ */ i.jsx(Hi, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: h.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(an, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        h.map((X) => /* @__PURE__ */ i.jsx(B5, { entry: X }, X.id)),
        /* @__PURE__ */ i.jsx("div", { ref: ae })
      ] }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        c.length,
        " 条日志",
        h.length !== c.length && ` · ${h.length} 条匹配`
      ] })
    ] }),
    s === "model" && /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ i.jsx(Q5, {}) })
  ] });
}, K5 = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, J5 = ({
  icon: o,
  title: s,
  subtitle: u,
  meta: c,
  badges: m = [],
  selected: h = !1,
  disabled: x = !1,
  toggle: y,
  onClick: p,
  actions: j = [],
  className: A = "",
  compact: S = !1
}) => {
  const U = j.filter((H) => !H.hidden), L = !!y;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${S ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${h ? "bg-accent/60" : "hover:bg-muted/40"}
                ${x ? "opacity-50 pointer-events-none" : ""}
                ${A}
            `,
      onClick: p,
      children: [
        (o || L) && /* @__PURE__ */ i.jsx("div", { className: "flex-shrink-0", children: L ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${y.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (H) => {
              H.stopPropagation(), y.onChange(!y.checked);
            },
            children: /* @__PURE__ */ i.jsx(Zo, { size: 14 })
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
                        ${y && !y.checked ? "line-through opacity-60" : ""}
                    `, children: s }),
            m.map((H, G) => /* @__PURE__ */ i.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${K5[H.color || "default"]}
                            `,
                children: H.text
              },
              G
            ))
          ] }),
          (u || c) && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            u && /* @__PURE__ */ i.jsx("span", { className: "truncate", children: u }),
            c && /* @__PURE__ */ i.jsx("span", { className: "flex-shrink-0 font-mono", children: c })
          ] })
        ] }),
        h && !U.length && /* @__PURE__ */ i.jsx(Y1, { size: 14, className: "text-primary flex-shrink-0" }),
        U.length > 0 && /* @__PURE__ */ i.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${h ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: U.map((H, G) => /* @__PURE__ */ i.jsx(
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
          G
        )) })
      ]
    }
  );
}, F5 = ({
  preset: o,
  isSelected: s,
  onSelect: u,
  onEdit: c,
  onCopy: m,
  onDelete: h
}) => {
  var p;
  const x = o.source === "tavern" || o.source === "tavern_profile" ? K1 : Th, y = o.source === "custom" ? ((p = o.custom) == null ? void 0 : p.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ i.jsx(
    J5,
    {
      icon: /* @__PURE__ */ i.jsx(x, { size: 14 }),
      title: o.name,
      subtitle: y,
      meta: `T:${o.parameters.temperature}`,
      badges: o.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: s,
      onClick: u,
      actions: [
        { icon: /* @__PURE__ */ i.jsx(n3, { size: 12 }), onClick: () => c(), title: "编辑" },
        { icon: /* @__PURE__ */ i.jsx(Q1, { size: 12 }), onClick: () => m(), title: "复制" },
        { icon: /* @__PURE__ */ i.jsx(or, { size: 12 }), onClick: () => h(), title: "删除", danger: !0, hidden: o.isDefault }
      ]
    }
  );
}, Dt = ({ title: o, description: s, children: u, className: c = "" }) => /* @__PURE__ */ i.jsxs("div", { className: `mb-8 ${c}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-primary", children: o }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "space-y-4", children: u })
] }), ht = ({
  label: o,
  description: s,
  error: u,
  required: c,
  className: m = "",
  value: h,
  onChange: x,
  placeholder: y,
  type: p = "text",
  disabled: j,
  multiline: A,
  rows: S = 3
}) => {
  const U = {
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
  return /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1 ${m}`, children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      o,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    A ? /* @__PURE__ */ i.jsx(
      "textarea",
      {
        value: h,
        onChange: (L) => x(L.target.value),
        placeholder: y,
        disabled: j,
        rows: S,
        style: U,
        className: "font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ) : /* @__PURE__ */ i.jsx(
      "input",
      {
        type: p,
        value: h,
        onChange: (L) => x(L.target.value),
        placeholder: y,
        disabled: j,
        style: U,
        className: "placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: u })
  ] });
}, Ul = ({
  label: o,
  description: s,
  error: u,
  required: c,
  className: m = "",
  value: h,
  onChange: x,
  min: y,
  max: p,
  step: j = 1,
  showSlider: A = !0,
  suffix: S
}) => {
  const U = {
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
  }, L = y !== void 0 && p !== void 0 ? Math.min(100, Math.max(0, (h - y) / (p - y) * 100)) : 0;
  return /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-2 ${m}`, children: [
    /* @__PURE__ */ i.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ i.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      o,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
      A && y !== void 0 && p !== void 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex-1 relative h-4 flex items-center group cursor-pointer", children: [
        /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "absolute inset-x-0 h-[1px]",
            style: { backgroundColor: "var(--border)" }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "div",
          {
            className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
            style: { left: `${L}%`, transform: "translate(-50%, -50%)" }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "range",
            min: y,
            max: p,
            step: j,
            value: h,
            onChange: (H) => x(Number(H.target.value)),
            className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
            style: { appearance: "none", WebkitAppearance: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "number",
          min: y,
          max: p,
          step: j,
          value: h,
          onChange: (H) => x(Number(H.target.value)),
          style: U,
          className: "focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }
      )
    ] }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: u })
  ] });
}, tn = ({
  label: o,
  description: s,
  error: u,
  required: c,
  className: m = "",
  value: h,
  onChange: x,
  options: y,
  placeholder: p = "请选择...",
  disabled: j
}) => {
  const A = {
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
  return /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1 ${m}`, children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      o,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          value: h,
          onChange: (S) => x(S.target.value),
          disabled: j,
          style: A,
          className: "disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors",
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: p }),
            y.map((S) => /* @__PURE__ */ i.jsx("option", { value: S.value, className: "bg-popover text-foreground", children: S.label }, S.value))
          ]
        }
      ),
      /* @__PURE__ */ i.jsx(rr, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" })
    ] }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: u })
  ] });
}, ln = ({
  label: o,
  description: s,
  error: u,
  className: c = "",
  checked: m,
  onChange: h,
  disabled: x
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex items-start justify-between gap-4 py-1 ${c} ${x ? "opacity-50 pointer-events-none" : ""}`, children: [
  o && // 只有当 label 存在时才渲染左侧区域，避免只有开关时占用过多空间
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ i.jsx(
      "label",
      {
        className: "text-xs text-foreground cursor-pointer",
        onClick: () => !x && h(!m),
        children: o
      }
    ),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: s }),
    u && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: u })
  ] }),
  /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": m,
      onClick: () => !x && h(!m),
      disabled: x,
      className: "relative inline-flex h-4 w-8 shrink-0 items-center justify-center cursor-pointer focus:outline-none group",
      children: [
        /* @__PURE__ */ i.jsx(
          "span",
          {
            className: "absolute left-0 w-full h-[1px]",
            style: { backgroundColor: "var(--border)" }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "span",
          {
            className: `
                        absolute block h-2.5 w-2.5 rounded-full shadow-sm transition-all duration-200 group-hover:scale-110
                        ${m ? "left-full -translate-x-full bg-foreground" : "left-0 bg-muted-foreground"}
                    `,
            style: { top: "50%", transform: m ? "translate(-100%, -50%)" : "translate(0, -50%)" }
          }
        )
      ]
    }
  )
] }), W5 = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], I5 = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function P5() {
  var o, s, u, c;
  try {
    const m = (u = (s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) == null ? void 0 : u.extensionSettings;
    return ((c = m == null ? void 0 : m.connectionManager) == null ? void 0 : c.profiles) || [];
  } catch (m) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", m), [];
  }
}
const eg = ({
  preset: o,
  onChange: s,
  isNew: u = !1
}) => {
  var H, G, te, P;
  const [c, m] = O.useState([]), [h, x] = O.useState(!1), y = () => {
    x(!0);
    try {
      const q = P5();
      m(q);
    } finally {
      x(!1);
    }
  };
  O.useEffect(() => {
    y();
  }, []);
  const p = (q) => {
    s({ ...o, ...q, updatedAt: Date.now() });
  }, j = (q, ae) => {
    p({
      parameters: { ...o.parameters, [q]: ae }
    });
  }, A = (q, ae) => {
    var V, ee, X, Q;
    p({
      custom: {
        apiUrl: ((V = o.custom) == null ? void 0 : V.apiUrl) || "",
        apiKey: ((ee = o.custom) == null ? void 0 : ee.apiKey) || "",
        model: ((X = o.custom) == null ? void 0 : X.model) || "",
        apiSource: ((Q = o.custom) == null ? void 0 : Q.apiSource) || "openai",
        [q]: ae
      }
    });
  }, S = (q) => {
    const ae = q;
    p({
      source: ae,
      tavernProfileId: ae === "tavern_profile" ? o.tavernProfileId : void 0
    }), ae === "tavern_profile" && y();
  }, U = c.map((q) => ({
    value: q.id,
    label: `${q.name} (${q.api || "Unknown"} - ${q.model || "Unknown"})`
  })), L = c.find((q) => q.id === o.tavernProfileId);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(Dt, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "预设名称",
          value: o.name,
          onChange: (q) => p({ name: q }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        tn,
        {
          label: "配置源",
          value: o.source,
          onChange: S,
          options: I5,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    o.source === "tavern_profile" && /* @__PURE__ */ i.jsxs(Dt, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ i.jsx(
          tn,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: o.tavernProfileId || "",
            onChange: (q) => p({ tavernProfileId: q }),
            options: U,
            placeholder: h ? "加载中..." : "请选择配置文件",
            disabled: h || U.length === 0
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: y,
            disabled: h,
            title: "刷新配置列表",
            children: /* @__PURE__ */ i.jsx(en, { size: 16, className: h ? "animate-spin" : "" })
          }
        )
      ] }),
      U.length === 0 && !h && /* @__PURE__ */ i.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      L && /* @__PURE__ */ i.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: L.api || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: L.model || "-" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-foreground font-mono", children: L.preset || "-" })
        ] })
      ] })
    ] }),
    o.source === "custom" && /* @__PURE__ */ i.jsxs(Dt, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ i.jsx(
        tn,
        {
          label: "API 类型",
          value: ((H = o.custom) == null ? void 0 : H.apiSource) || "openai",
          onChange: (q) => A("apiSource", q),
          options: W5
        }
      ),
      /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "API URL",
          type: "url",
          value: ((G = o.custom) == null ? void 0 : G.apiUrl) || "",
          onChange: (q) => A("apiUrl", q),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "API Key",
          type: "password",
          value: ((te = o.custom) == null ? void 0 : te.apiKey) || "",
          onChange: (q) => A("apiKey", q),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "模型名称",
          value: ((P = o.custom) == null ? void 0 : P.model) || "",
          onChange: (q) => A("model", q),
          placeholder: "gpt-4o-mini",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(Dt, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ i.jsx(
        Ul,
        {
          label: "温度 (Temperature)",
          value: o.parameters.temperature,
          onChange: (q) => j("temperature", q),
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
          onChange: (q) => j("topP", q),
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
          onChange: (q) => j("maxTokens", q),
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
          onChange: (q) => j("frequencyPenalty", q),
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
          onChange: (q) => j("presencePenalty", q),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] })
  ] });
}, tg = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], T1 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, _1 = ["ollama", "vllm"], z1 = ["openai", "cohere", "jina", "voyage"], lg = ({
  config: o,
  onChange: s
}) => {
  var x;
  const u = (y) => {
    s({ ...o, ...y });
  }, c = (y) => {
    u({
      source: y,
      model: T1[y],
      apiUrl: _1.includes(y) ? o.apiUrl : void 0,
      apiKey: z1.includes(y) ? o.apiKey : void 0
    });
  }, m = _1.includes(o.source), h = z1.includes(o.source);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(Dt, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ i.jsx(
        tn,
        {
          label: "向量源",
          value: o.source,
          onChange: (y) => c(y),
          options: tg,
          description: "选择向量化服务提供商"
        }
      ),
      m && /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "API URL",
          type: "url",
          value: o.apiUrl || "",
          onChange: (y) => u({ apiUrl: y }),
          placeholder: o.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${o.source} 服务的 API 端点`
        }
      ),
      h && /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "API Key",
          type: "password",
          value: o.apiKey || "",
          onChange: (y) => u({ apiKey: y }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ i.jsx(
        ht,
        {
          label: "模型名称",
          value: o.model || "",
          onChange: (y) => u({ model: y }),
          placeholder: T1[o.source],
          description: "使用的向量化模型"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(Dt, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ i.jsx(
      ht,
      {
        label: "向量维度",
        value: ((x = o.dimensions) == null ? void 0 : x.toString()) || "",
        onChange: (y) => {
          const p = parseInt(y, 10);
          u({ dimensions: isNaN(p) ? void 0 : p });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, ag = [
  "BAAI/bge-reranker-v2-m3",
  "BAAI/bge-reranker-base",
  "BAAI/bge-reranker-large",
  "cross-encoder/ms-marco-MiniLM-L-12-v2",
  "Xenova/ms-marco-MiniLM-L-6-v2"
], ng = ({
  config: o,
  onChange: s
}) => {
  const u = (c) => {
    s({ ...o, ...c });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsx(Dt, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ i.jsx(
      ln,
      {
        label: "启用 Rerank",
        checked: o.enabled,
        onChange: (c) => u({ enabled: c }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    o.enabled && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs(Dt, { title: "API 配置", children: [
        /* @__PURE__ */ i.jsx(
          ht,
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
          ht,
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
            ht,
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
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: ag.map((c) => /* @__PURE__ */ i.jsx(
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
      /* @__PURE__ */ i.jsxs(Dt, { title: "参数设置", children: [
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
}, Yi = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], rg = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, ig = {
  maxChatHistory: 10
}, sg = {
  source: "transformers"
}, ug = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function r2(o = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: o,
    source: "tavern",
    parameters: { ...rg },
    context: { ...ig },
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
function og() {
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
const cg = {
  enabled: !0,
  includeGlobal: !0
}, A1 = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  floorLimit: 50,
  countLimit: 5
};
function dg() {
  return {
    llmPresets: [r2()],
    selectedPresetId: null,
    vectorConfig: { ...sg },
    rerankConfig: { ...ug },
    promptTemplates: og(),
    worldbookConfig: { ...cg }
  };
}
function fg(o) {
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
function mg(o) {
  var s;
  return ((s = Yi.find((u) => u.value === o)) == null ? void 0 : s.label) || o;
}
const hg = ({
  template: o,
  isSelected: s = !1,
  onSelect: u,
  onCopy: c,
  onDelete: m,
  onToggleEnabled: h,
  onImport: x
}) => {
  const y = O.useRef(null), p = (S) => {
    S.stopPropagation();
    const U = {
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
    }, L = new Blob([JSON.stringify(U, null, 2)], { type: "application/json" }), H = URL.createObjectURL(L), G = document.createElement("a");
    G.href = H, G.download = `engram_template_${o.name.replace(/\s+/g, "_")}.json`, G.click(), URL.revokeObjectURL(H);
  }, j = (S) => {
    var U;
    S.stopPropagation(), (U = y.current) == null || U.click();
  }, A = (S) => {
    var H;
    const U = (H = S.target.files) == null ? void 0 : H[0];
    if (!U || !x) return;
    const L = new FileReader();
    L.onload = (G) => {
      var te;
      try {
        const P = JSON.parse((te = G.target) == null ? void 0 : te.result);
        if (P.version && P.template) {
          const q = ua(
            P.template.name,
            P.template.category,
            {
              enabled: o.enabled,
              // 保持当前启用状态
              isBuiltIn: o.isBuiltIn,
              // 保持内置状态
              boundPresetId: P.template.boundPresetId,
              systemPrompt: P.template.systemPrompt,
              userPromptTemplate: P.template.userPromptTemplate,
              outputFormat: P.template.outputFormat,
              availableVariables: P.template.availableVariables
            }
          );
          q.id = o.id, x(q);
        }
      } catch (P) {
        console.error("导入失败:", P);
      }
    }, L.readAsText(U), y.current && (y.current.value = "");
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
              onClick: (S) => {
                S.stopPropagation(), h == null || h(!o.enabled);
              },
              children: /* @__PURE__ */ i.jsx(Zo, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: o.name }),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ i.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${fg(o.category)}`, children: mg(o.category) }),
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
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: j, title: "Import", children: /* @__PURE__ */ i.jsx(A3, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: p, title: "Export", children: /* @__PURE__ */ i.jsx(Hi, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (S) => {
            S.stopPropagation(), c == null || c();
          }, title: "Copy", children: /* @__PURE__ */ i.jsx(Q1, { size: 12 }) }),
          !o.isBuiltIn && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (S) => {
            S.stopPropagation(), m == null || m();
          }, title: "Delete", children: /* @__PURE__ */ i.jsx(or, { size: 12 }) })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            ref: y,
            type: "file",
            accept: ".json",
            onChange: A,
            className: "hidden"
          }
        )
      ]
    }
  );
}, gg = ({
  templates: o,
  selectedId: s,
  onSelect: u,
  onAdd: c,
  onUpdate: m,
  onDelete: h
}) => {
  const x = () => {
    const S = ua(
      `新模板 ${o.length + 1}`,
      "text_summary"
    );
    c(S), u(S);
  }, y = (S) => {
    const U = ua(
      `${S.name} (副本)`,
      S.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: S.boundPresetId,
        systemPrompt: S.systemPrompt,
        userPromptTemplate: S.userPromptTemplate,
        outputFormat: S.outputFormat,
        availableVariables: [...S.availableVariables]
      }
    );
    c(U);
  }, p = (S, U) => {
    U && o.filter((L) => L.category === S.category && L.id !== S.id && L.enabled).forEach((L) => m({ ...L, enabled: !1 })), m({ ...S, enabled: U });
  }, j = (S) => {
    m(S);
  }, A = Yi.map((S) => ({
    ...S,
    templates: o.filter((U) => U.category === S.value)
  })).filter((S) => S.templates.length > 0);
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
      A.map((S) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          S.label,
          /* @__PURE__ */ i.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: S.templates.map((U) => /* @__PURE__ */ i.jsx(
          hg,
          {
            template: U,
            isSelected: s === U.id,
            onSelect: () => u(U),
            onCopy: () => y(U),
            onDelete: () => h(U),
            onToggleEnabled: (L) => p(U, L),
            onImport: j
          },
          U.id
        )) })
      ] }, S.value)),
      o.length === 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ i.jsx(Go, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, pg = [
  { name: "{{chatHistory}}", desc: "待处理的对话历史" },
  { name: "{{context}}", desc: "角色卡设定" },
  { name: "{{char}}", desc: "角色名" },
  { name: "{{user}}", desc: "用户名" },
  { name: "{{userInput}}", desc: "当前用户输入" },
  { name: "{{worldbookContext}}", desc: "世界书激活内容" },
  { name: "{{engramSummaries}}", desc: "Engram 所有摘要（用于精简）" }
], xg = ({
  template: o,
  llmPresets: s,
  defaultPresetId: u,
  onChange: c
}) => {
  var x, y;
  const m = [
    { value: "", label: "使用默认预设" + (u ? ` (${((x = s.find((p) => p.id === u)) == null ? void 0 : x.name) || u})` : "") },
    ...s.map((p) => ({ value: p.id, label: p.name }))
  ], h = (p) => {
    c({ ...o, ...p, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ i.jsxs(Dt, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        ht,
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
        tn,
        {
          label: "模板分类",
          value: o.category,
          onChange: (p) => h({ category: p }),
          options: Yi.map((p) => ({ value: p.value, label: p.label })),
          description: (y = Yi.find((p) => p.value === o.category)) == null ? void 0 : y.description
        }
      ),
      /* @__PURE__ */ i.jsx(
        tn,
        {
          label: "模型来源",
          value: o.boundPresetId || "",
          onChange: (p) => h({ boundPresetId: p || null }),
          options: m,
          description: "选择用于此模板的 LLM 预设"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(Dt, { title: "提示词内容", children: [
      /* @__PURE__ */ i.jsx(
        ht,
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
        ht,
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
      /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用宏" }),
      /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: pg.map((p) => /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ i.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap", children: p.name }),
        /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground", children: p.desc })
      ] }, p.name)) })
    ] })
  ] });
}, yg = ({
  rules: o,
  selectedId: s,
  onSelect: u,
  onToggle: c,
  onDelete: m,
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
          children: /* @__PURE__ */ i.jsx($1, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
    o.map((y) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${s === y.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => u(y.id),
        children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${y.enabled ? s === y.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (p) => {
                p.stopPropagation(), c(y.id);
              },
              title: y.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ i.jsx(Zo, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${s === y.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!y.enabled && "opacity-50 line-through"}`, children: y.name }) }),
            /* @__PURE__ */ i.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ i.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              y.pattern,
              "/",
              y.flags
            ] }) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: `flex items-center ${s === y.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (p) => {
                p.stopPropagation(), m(y.id);
              },
              children: /* @__PURE__ */ i.jsx(or, { size: 12 })
            }
          ) })
        ]
      },
      y.id
    )),
    o.length === 0 && /* @__PURE__ */ i.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), M1 = [
  { value: "input", label: "输入", description: "清洗发给 LLM 的聊天内容" },
  { value: "output", label: "输出", description: "清洗 LLM 返回的内容（预览/写入前）" },
  { value: "both", label: "两者", description: "输入和输出都应用" }
], sr = [
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
class Wo {
  constructor(s) {
    Qe(this, "rules", []);
    this.rules = s || [...sr];
  }
  /**
   * 应用所有启用的规则处理文本
   * @param text 要处理的文本
   * @param scope 可选，只应用特定作用域的规则
   */
  process(s, u) {
    let c = s;
    for (const m of this.rules)
      if (m.enabled && !(u && m.scope !== u && m.scope !== "both"))
        try {
          const h = new RegExp(m.pattern, m.flags);
          c = c.replace(h, m.replacement);
        } catch (h) {
          console.warn(`[RegexProcessor] 规则 "${m.name}" 执行失败:`, h);
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
    const c = this.rules.findIndex((m) => m.id === s);
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
    this.rules = [...sr];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((s) => s.enabled).length;
  }
}
const Ro = new Wo(), vg = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], bg = ({ rule: o, onChange: s }) => {
  var A;
  const [u, c] = O.useState(""), [m, h] = O.useState(""), [x, y] = O.useState({ valid: !0 }), p = new Wo();
  O.useEffect(() => {
    const S = p.validatePattern(o.pattern, o.flags);
    y(S);
  }, [o.pattern, o.flags]), O.useEffect(() => {
    if (u && x.valid) {
      const S = p.processWithRule(u, o);
      h(S);
    } else
      h("");
  }, [u, o, x.valid]);
  const j = (S) => {
    const U = o.flags.split(""), L = U.indexOf(S);
    L >= 0 ? U.splice(L, 1) : U.push(S), s({ flags: U.join("") });
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
            onChange: (S) => s({ name: S.target.value }),
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
            onChange: (S) => s({ description: S.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: M1.map((S) => /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${o.scope === S.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => s({ scope: S.value }),
            title: S.description,
            children: S.label
          },
          S.value
        )) }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: (A = M1.find((S) => S.value === o.scope)) == null ? void 0 : A.description })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          x.valid ? /* @__PURE__ */ i.jsx(Lo, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ i.jsx(Ho, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${x.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: o.pattern,
            onChange: (S) => s({ pattern: S.target.value }),
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
            onChange: (S) => s({ replacement: S.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: vg.map((S) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${o.flags.includes(S.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => j(S.value),
            title: S.description,
            children: [
              S.label,
              " (",
              S.value,
              ")"
            ]
          },
          S.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ i.jsx(Qo, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: u,
            onChange: (S) => c(S.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      u && x.valid && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ i.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: m || /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ i.jsx(qh, { size: 16, className: "shrink-0 mt-0.5" }),
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
}, Sg = ({
  config: o,
  onChange: s
}) => {
  const u = (c) => {
    s({
      ...o,
      [c]: !o[c]
    });
  };
  return /* @__PURE__ */ i.jsx("div", { className: "", children: /* @__PURE__ */ i.jsxs(Dt, { title: "世界书配置", description: "总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。", children: [
    /* @__PURE__ */ i.jsx(
      ln,
      {
        label: "启用世界书",
        description: "总结时注入始终激活（蓝灯）的世界书条目",
        checked: o.enabled,
        onChange: () => u("enabled")
      }
    ),
    /* @__PURE__ */ i.jsx(
      ln,
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
function jg() {
  const [o, s] = O.useState(dg), [u, c] = O.useState(null), [m, h] = O.useState(null), [x, y] = O.useState(!1), [p, j] = O.useState([...sr]), [A, S] = O.useState(null);
  O.useEffect(() => {
    const B = lt.getRegexRules();
    B && B.length > 0 && j(B);
  }, []);
  const U = O.useCallback((B) => {
    s((C) => ({ ...C, selectedPresetId: B.id })), c(B);
  }, []), L = O.useCallback(() => {
    const B = r2(`预设 ${o.llmPresets.length + 1}`);
    B.isDefault = !1, s((C) => ({
      ...C,
      llmPresets: [...C.llmPresets, B],
      selectedPresetId: B.id
    })), c(B), y(!0);
  }, [o.llmPresets.length]), H = O.useCallback((B) => {
    s((C) => ({
      ...C,
      llmPresets: C.llmPresets.map((D) => D.id === B.id ? B : D)
    })), c(B), y(!0);
  }, []), G = O.useCallback((B) => {
    const C = {
      ...B,
      id: `preset_${Date.now()}`,
      name: `${B.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((D) => ({ ...D, llmPresets: [...D.llmPresets, C] })), y(!0);
  }, []), te = O.useCallback((B) => {
    B.isDefault || (s((C) => ({
      ...C,
      llmPresets: C.llmPresets.filter((D) => D.id !== B.id),
      selectedPresetId: C.selectedPresetId === B.id ? null : C.selectedPresetId
    })), c((C) => (C == null ? void 0 : C.id) === B.id ? null : C), y(!0));
  }, []), P = O.useCallback((B) => {
    h(B);
  }, []), q = O.useCallback((B) => {
    s((C) => ({
      ...C,
      promptTemplates: [...C.promptTemplates, B]
    })), y(!0);
  }, []), ae = O.useCallback((B) => {
    s((C) => ({
      ...C,
      promptTemplates: C.promptTemplates.map((D) => D.id === B.id ? B : D)
    })), h(B), y(!0);
  }, []), V = O.useCallback((B) => {
    B.isBuiltIn || (s((C) => ({
      ...C,
      promptTemplates: C.promptTemplates.filter((D) => D.id !== B.id)
    })), h((C) => (C == null ? void 0 : C.id) === B.id ? null : C), y(!0));
  }, []), ee = O.useCallback((B) => {
    s((C) => ({ ...C, vectorConfig: B })), y(!0);
  }, []), X = O.useCallback((B) => {
    s((C) => ({ ...C, rerankConfig: B })), y(!0);
  }, []), Q = O.useCallback((B) => {
    s((C) => ({ ...C, worldbookConfig: B })), y(!0);
  }, []), xe = O.useCallback((B) => {
    const C = p.find((D) => D.id === B);
    S(C || null);
  }, [p]), Se = O.useCallback(() => {
    const B = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    j((C) => [...C, B]), S(B), y(!0);
  }, []), Xe = O.useCallback((B) => {
    if (!A) return;
    const C = { ...A, ...B };
    S(C), j((D) => D.map((W) => W.id === C.id ? C : W)), y(!0);
  }, [A]), Ze = O.useCallback((B) => {
    j((C) => C.map(
      (D) => D.id === B ? { ...D, enabled: !D.enabled } : D
    )), y(!0);
  }, []), De = O.useCallback((B) => {
    j((C) => C.filter((D) => D.id !== B)), S((C) => (C == null ? void 0 : C.id) === B ? null : C), y(!0);
  }, []), Le = O.useCallback(() => {
    j([...sr]), S(null), y(!0);
  }, []), je = O.useCallback(() => {
    lt.setRegexRules(p), console.log("保存配置:", o, p), y(!1);
  }, [o, p]);
  return {
    settings: o,
    editingPreset: u,
    editingTemplate: m,
    hasChanges: x,
    regexRules: p,
    editingRule: A,
    selectPreset: U,
    addPreset: L,
    updatePreset: H,
    copyPreset: G,
    deletePreset: te,
    selectTemplate: P,
    addTemplate: q,
    updateTemplate: ae,
    deleteTemplate: V,
    updateVectorConfig: ee,
    updateRerankConfig: X,
    updateWorldbookConfig: Q,
    selectRule: xe,
    addRule: Se,
    updateRule: Xe,
    toggleRule: Ze,
    deleteRule: De,
    resetRules: Le,
    save: je
  };
}
const Cg = [
  { id: "llm", label: "LLM 预设", icon: Yo },
  { id: "vector", label: "向量化", icon: qo },
  { id: "rerank", label: "Rerank", icon: Vo }
], Ng = ({ initialTab: o }) => {
  const [s, u] = O.useState(o || "model"), [c, m] = O.useState("llm"), {
    settings: h,
    editingPreset: x,
    editingTemplate: y,
    hasChanges: p,
    regexRules: j,
    editingRule: A,
    selectPreset: S,
    addPreset: U,
    updatePreset: L,
    copyPreset: H,
    deletePreset: G,
    selectTemplate: te,
    addTemplate: P,
    updateTemplate: q,
    deleteTemplate: ae,
    updateVectorConfig: V,
    updateRerankConfig: ee,
    updateWorldbookConfig: X,
    selectRule: Q,
    addRule: xe,
    updateRule: Se,
    toggleRule: Xe,
    deleteRule: Ze,
    resetRules: De,
    save: Le
  } = jg();
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(
      Xi,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则"
      }
    ),
    /* @__PURE__ */ i.jsx(
      Oo,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: s,
        onChange: (je) => u(je),
        actions: p && /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors",
            onClick: Le,
            children: [
              /* @__PURE__ */ i.jsx(d3, { size: 12 }),
              "保存"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "model" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ i.jsx(
          Oo,
          {
            tabs: Cg.map((je) => ({ ...je, icon: /* @__PURE__ */ i.jsx(je.icon, { size: 14 }) })),
            activeTab: c,
            onChange: (je) => m(je),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        c === "llm" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ i.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: U, children: /* @__PURE__ */ i.jsx(Xo, { size: 16 }) })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: h.llmPresets.map((je) => /* @__PURE__ */ i.jsx(
              F5,
              {
                preset: je,
                isSelected: h.selectedPresetId === je.id,
                onSelect: () => S(je),
                onEdit: () => S(je),
                onCopy: () => H(je),
                onDelete: () => G(je)
              },
              je.id
            )) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "flex flex-col", children: x ? /* @__PURE__ */ i.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ i.jsx(eg, { preset: x, onChange: L }) }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ i.jsx(Yo, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        c === "vector" && /* @__PURE__ */ i.jsx(lg, { config: h.vectorConfig, onChange: V }),
        c === "rerank" && /* @__PURE__ */ i.jsx(ng, { config: h.rerankConfig, onChange: ee })
      ] }),
      s === "prompt" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          gg,
          {
            templates: h.promptTemplates,
            selectedId: (y == null ? void 0 : y.id) || null,
            onSelect: te,
            onAdd: P,
            onUpdate: q,
            onDelete: ae
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: y ? /* @__PURE__ */ i.jsx(
          xg,
          {
            template: y,
            llmPresets: h.llmPresets,
            defaultPresetId: h.selectedPresetId,
            onChange: q
          }
        ) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(Go, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      s === "regex" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          yg,
          {
            rules: j,
            selectedId: (A == null ? void 0 : A.id) || null,
            onSelect: Q,
            onToggle: Xe,
            onDelete: Ze,
            onAdd: xe,
            onReset: De
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: A ? /* @__PURE__ */ i.jsx(bg, { rule: A, onChange: Se }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx($1, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      s === "worldbook" && /* @__PURE__ */ i.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ i.jsx(
        Sg,
        {
          config: h.worldbookConfig,
          onChange: X
        }
      ) })
    ] })
  ] });
}, Eg = () => {
  const [o, s] = O.useState("claudeDark");
  O.useEffect(() => {
    s(Hl.getTheme());
  }, []);
  const u = (m) => {
    Hl.setTheme(m), lt.set("theme", m), s(m);
  }, c = Object.entries(Di).map(([m, h]) => {
    let x = h.colors.background, y = h.colors.primary;
    return {
      id: m,
      name: h.name,
      background: x,
      sidebar: h.colors.sidebar,
      // Add sidebar color
      primary: y
    };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: c.map((m) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        onClick: () => u(m.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${o === m.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
                        `,
        children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-center -space-x-3 mb-2", children: [
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-10",
                style: { background: m.background },
                title: "Background"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-20",
                style: { background: m.sidebar },
                title: "Sidebar"
              }
            ),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background",
                style: { background: m.primary },
                title: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ i.jsx("span", { className: `text-sm font-medium ${o === m.id ? "text-primary" : "text-muted-foreground"}`, children: m.name }),
          o === m.id && /* @__PURE__ */ i.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      m.id
    )) })
  ] });
}, Bl = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function Ja() {
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
class oa {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, u) {
    const c = Ja();
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
    const c = Ja();
    if (c)
      c.once(s, u);
    else {
      const m = (...h) => {
        this.off(s, m), u(...h);
      };
      this.on(s, m);
    }
  }
  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  static off(s, u) {
    var m;
    const c = Ja();
    c && c.removeListener(s, u), (m = this.listeners.get(s)) == null || m.delete(u);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(s, ...u) {
    const c = Ja();
    c && c.emit(s, ...u);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = Ja();
    for (const [u, c] of this.listeners)
      for (const m of c)
        s && s.removeListener(u, m);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return Ja() !== null;
  }
}
Qe(oa, "listeners", /* @__PURE__ */ new Map());
const Tg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: oa,
  TavernEventType: Bl
}, Symbol.toStringTag, { value: "Module" }));
function _g(o, s) {
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
class i2 {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const u = ir();
    if (!(u != null && u.chat))
      return [];
    let c = u.chat.map((m, h) => _g(m, h));
    if (s.includeHidden || (c = c.filter((m) => !m.isHidden)), s.role) {
      const m = Array.isArray(s.role) ? s.role : [s.role];
      c = c.filter((h) => m.includes(h.role));
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
    const s = ir();
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
    return N5();
  }
}
const zg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: i2
}, Symbol.toStringTag, { value: "Module" }));
async function w1(o) {
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
function Fa() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class nt {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(s) {
    return w1(s);
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
    const m = c.map((x) => x.content);
    return (await Promise.all(m.map((x) => this.countTokens(x)))).reduce((x, y) => x + y, 0);
  }
  /**
   * 获取当前角色的所有 Engram 摘要内容（用于 {{engramSummaries}} 宏）
   * 返回格式化后的摘要文本，供精简功能使用
   */
  static async getEngramSummariesContent() {
    const s = this.findExistingWorldbook();
    if (!s)
      return "";
    const c = (await this.getEntries(s)).filter((h) => h.name.startsWith("剧情摘要_"));
    return c.length === 0 ? "" : (c.sort((h, x) => h.name.localeCompare(x.name, void 0, { numeric: !0 })), c.map((h) => {
      const x = h.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
      return `【${h.name}】
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
    return Promise.all(s.map((u) => w1(u)));
  }
  /**
   * 查找已绑定的 Engram 世界书（不创建）
   * 用于面板显示等只读场景
   */
  static findExistingWorldbook() {
    try {
      const s = Fa();
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
      const m = Fa();
      if (!m)
        return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), null;
      const h = (u = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : u.call(s);
      if (!(h != null && h.name2) || h.name2 === "SillyTavern System")
        return console.warn("[Engram] WorldInfoService: 无效的角色上下文"), null;
      const x = h.name2, y = `[Engram] ${x}`;
      if (console.debug("[Engram] WorldInfoService: 创建新世界书", y), m.createWorldbook)
        await m.createWorldbook(y);
      else
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用"), null;
      if (m.getCharWorldbookNames && m.rebindCharWorldbooks) {
        const p = m.getCharWorldbookNames("current");
        p && (p.additional.push(y), await m.rebindCharWorldbooks("current", p), console.info("[Engram] WorldInfoService: 世界书已绑定到角色", {
          character: x,
          worldbook: y
        }));
      }
      return y;
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
    const u = Fa();
    if (!(u != null && u.getWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), [];
    try {
      return (await u.getWorldbook(s)).map((m) => {
        const h = m;
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
      const c = Fa();
      if (!(c != null && c.createWorldbookEntries))
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbookEntries 不可用"), !1;
      const m = {
        name: u.name,
        content: u.content,
        comment: u.name,
        // 用作备注
        disable: !(u.enabled ?? !0),
        // TavernHelper 使用 disable 字段
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
      }), await c.createWorldbookEntries(s, [m]), console.info("[Engram] WorldInfoService: 条目已保存到世界书", s), !0;
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
    const m = Fa();
    if (!(m != null && m.createWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), !1;
    try {
      const h = { ...c, uid: u };
      return "enabled" in c && (h.disable = !c.enabled, delete h.enabled), await m.createWorldbookEntries(s, [h]), !0;
    } catch (h) {
      return console.error("[Engram] WorldInfoService: 更新世界书条目失败", h), !1;
    }
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
    const c = (await this.getEntries(s)).map((h) => h.order).filter((h) => h >= 9e3 && h < 1e4);
    return c.length === 0 ? 9e3 : Math.max(...c) + 1;
  }
  /**
   * 根据 Key 或名称查找条目
   * @param worldbookName 世界书名称
   * @param key 关键词
   */
  static async findEntryByKey(s, u) {
    const c = await this.getEntries(s);
    let m = c.find((h) => h.keys.includes(u));
    return m || (m = c.find((h) => h.name === u || u === "__ENGRAM_STATE__" && h.name === "Engram System State")), m || null;
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
    return Fa() !== null;
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
      let y = s;
      if (!y || y.length === 0) {
        const S = (c = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : c.call(u);
        S != null && S.chat && Array.isArray(S.chat) && (y = S.chat.map((U) => U.mes || "").reverse());
      }
      if (!y || y.length === 0)
        return console.warn("[Engram] WorldInfoService: 无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      const j = await x(y, 8192, !0, {
        trigger: "normal"
      }), A = [
        (j == null ? void 0 : j.worldInfoBefore) || "",
        (j == null ? void 0 : j.worldInfoAfter) || ""
      ].filter(Boolean).join(`

`).trim();
      return A && console.debug(`[Engram] WorldInfoService: 获取到激活的世界书内容 (${A.length} 字符)`), A;
    } catch (m) {
      return console.warn("[Engram] WorldInfoService: 获取世界书失败，回退到常驻条目", m), this.getConstantWorldInfo();
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
      const m = await c();
      if (!m || !Array.isArray(m))
        return "";
      const h = m.filter((x) => x.constant === !0 && x.disable !== !0 && x.content);
      return h.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${h.length} 个常驻条目`), h.map((x) => x.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const s2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldInfoService: nt
}, Symbol.toStringTag, { value: "Module" }));
async function Ag() {
  const { EventBus: o } = await Promise.resolve().then(() => Tg), { MessageService: s } = await Promise.resolve().then(() => zg), { WorldInfoService: u } = await Promise.resolve().then(() => s2);
  return {
    eventBus: o.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: u.isAvailable(),
    nativeTokenCount: await u.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const Mg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: oa,
  MessageService: i2,
  TavernEventType: Bl,
  WorldInfoService: nt,
  checkTavernIntegration: Ag
}, Symbol.toStringTag, { value: "Module" })), wg = [
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
class u2 {
  constructor(s) {
    Qe(this, "rules");
    this.rules = s || wg;
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
const o2 = new u2();
function k1() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class c2 {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const u = k1();
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
      const m = c instanceof Error ? c.message : String(c);
      return console.error("[Engram] LLMAdapter 调用失败:", c), {
        success: !1,
        content: "",
        error: m
      };
    }
  }
  /**
   * 检查 LLM API 是否可用
   */
  isAvailable() {
    const s = k1();
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
const d2 = new c2(), jo = "__ENGRAM_STATE__", Oi = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  updatedAt: Date.now()
};
class O1 {
  /**
   * 加载状态
   */
  static async loadState(s) {
    try {
      const u = await nt.findEntryByKey(s, jo);
      if (!u)
        return { ...Oi };
      try {
        const c = JSON.parse(u.content);
        return { ...Oi, ...c };
      } catch (c) {
        return pe.warn("WorldBookStateService", "状态条目解析失败，重置状态", c), { ...Oi };
      }
    } catch (u) {
      return pe.error("WorldBookStateService", "加载状态失败", u), { ...Oi };
    }
  }
  /**
   * 保存状态
   */
  static async saveState(s, u) {
    try {
      const m = {
        ...await this.loadState(s),
        ...u,
        updatedAt: Date.now()
      }, h = JSON.stringify(m, null, 2), x = await nt.findEntryByKey(s, jo);
      if (x)
        return pe.debug("WorldBookStateService", "更新状态条目", { uid: x.uid, state: m }), await nt.updateEntry(s, x.uid, {
          content: h,
          name: "Engram System State",
          // 确保是禁用的
          enabled: !1
        });
      {
        pe.debug("WorldBookStateService", "创建状态条目", { state: m });
        const y = {
          name: "Engram System State",
          content: h,
          keys: [jo],
          enabled: !1,
          // 默认禁用，防止干扰上下文
          constant: !1,
          position: "before_character_definition",
          role: "system",
          order: 0
          // 置顶
        };
        return await nt.createEntry(s, y);
      }
    } catch (c) {
      return pe.error("WorldBookStateService", "保存状态失败", c), !1;
    }
  }
}
class kg {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(s, u, c) {
    return new Promise((m, h) => {
      oa.emit(Bl.ENGRAM_REQUEST_REVISION, {
        title: s,
        description: u,
        content: c,
        onConfirm: (x) => m(x),
        onCancel: () => h(new Error("User cancelled revision"))
      });
    });
  }
}
const Og = new kg(), f2 = {
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
}, R1 = {
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
}, Wa = "engram";
function D1() {
  var o, s;
  try {
    return ((s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) || null;
  } catch {
    return null;
  }
}
function U1() {
  var o, s;
  try {
    const u = (s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o);
    return u != null && u.chat_metadata ? u.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function Rg() {
  var o;
  try {
    (o = window.saveChatDebounced) == null || o.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class m2 {
  constructor(s, u, c) {
    Qe(this, "config");
    Qe(this, "textProcessor");
    Qe(this, "llmAdapter");
    Qe(this, "currentChatId", null);
    Qe(this, "isRunning", !1);
    Qe(this, "isSummarizing", !1);
    Qe(this, "unsubscribeMessage", null);
    Qe(this, "unsubscribeChat", null);
    Qe(this, "summaryHistory", []);
    // 缓存最后总结的楼层，用于同步读取
    Qe(this, "_lastSummarizedFloor", 0);
    const m = lt.get("summarizerConfig");
    this.config = { ...f2, ...m, ...s }, this.textProcessor = u || o2, this.llmAdapter = c || d2;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const u = U1();
    if (u)
      return u.extensions || (u.extensions = {}), u.extensions[Wa] || (u.extensions[Wa] = {}), u.extensions[Wa][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, u) {
    const c = U1();
    c && (c.extensions || (c.extensions = {}), c.extensions[Wa] || (c.extensions[Wa] = {}), c.extensions[Wa][s] = u, this.log("debug", `已保存到 chat_metadata: ${s} = ${u}`), Rg());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const s = nt.findExistingWorldbook();
    if (!s) return this._lastSummarizedFloor;
    const u = await O1.loadState(s);
    return this._lastSummarizedFloor = u.lastSummarizedFloor, this._lastSummarizedFloor;
  }
  /**
   * 设置上次总结的楼层
   * 同时更新内存和持久化存储
   */
  async setLastSummarizedFloor(s) {
    this._lastSummarizedFloor = s;
    const u = nt.findExistingWorldbook();
    if (!u) {
      this.log("debug", "世界书未创建，跳过保存进度", { floor: s });
      return;
    }
    await O1.saveState(u, {
      lastSummarizedFloor: s
    });
  }
  /**
  
      // ==================== 楼层计算 ====================
  
      /**
       * 获取当前真实楼层数
       */
  getCurrentFloor() {
    const s = D1();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = D1();
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
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = oa.on(
      Bl.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${Bl.MESSAGE_RECEIVED}`)), this.unsubscribeChat = oa.on(
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
    var m;
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
      const h = this._lastSummarizedFloor + 1, x = this.config.bufferSize || 0, y = u - x;
      if (h > y)
        return s && ia.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const p = this.config.floorInterval || 10, j = h + p - 1, A = Math.min(y, j);
      if (h > A)
        return null;
      const S = [h, A];
      this.log("info", "准备总结", { startFloor: h, endFloor: A, currentFloor: u, buffer: x });
      const L = C5().slice(h - 1, A);
      if (this.log("info", "提取消息范围", {
        range: S,
        msgCount: L.length,
        firstMsg: (((m = L[0]) == null ? void 0 : m.mes) || "").substring(0, 20)
      }), L.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: S }), null;
      const H = {
        messages: L.map((B) => {
          const C = B.mes || B.content || B.message || "";
          return C || console.warn("[Engram] Message content is empty/undefined:", B), {
            role: B.is_user ? "user" : "assistant",
            content: C,
            name: B.name
          };
        }),
        floorRange: S,
        templateId: this.config.promptTemplateId || void 0
      }, G = L.map((B) => B.mes || B.content || B.message || "").join(`

`), te = Ro.process(G, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: G.length,
        cleanedLength: te.length
      });
      let P = "";
      try {
        const B = await nt.getActivatedWorldInfo();
        B && (P = `【背景设定】
` + B + `

`, this.log("debug", "已加载世界书内容", { length: B.length }));
      } catch (B) {
        this.log("warn", "获取世界书失败", { error: String(B) });
      }
      const q = lt.getEnabledPromptTemplate("text_summary"), ae = (q == null ? void 0 : q.systemPrompt) || R1.system, V = (q == null ? void 0 : q.userPromptTemplate) || R1.user;
      let ee = "";
      try {
        ee = await nt.getEngramSummariesContent(), ee && this.log("debug", "已加载 Engram 摘要", { length: ee.length });
      } catch (B) {
        this.log("warn", "获取 Engram 摘要失败", { error: String(B) });
      }
      const X = V.replace("{{worldbookContext}}", P).replace("{{chatHistory}}", te).replace("{{context}}", P).replace("{{engramSummaries}}", ee);
      this.log("debug", "使用提示词模板", {
        source: q ? "APIPresets" : "fallback",
        templateName: (q == null ? void 0 : q.name) || "default"
      });
      const Q = Pa.logSend({
        type: "summarize",
        systemPrompt: ae,
        userPrompt: X,
        floorRange: H.floorRange
      }), xe = Date.now(), Se = await this.llmAdapter.generate({
        systemPrompt: ae,
        userPrompt: X
      });
      if (Pa.logReceive(Q, {
        response: Se.content,
        status: Se.success ? "success" : "error",
        error: Se.error,
        duration: Date.now() - xe
      }), !Se.success)
        return this.log("error", "LLM 调用失败", { error: Se.error }), ia.error(`总结失败: ${Se.error}`, "Engram 错误"), null;
      const Xe = this.textProcessor.clean(Se.content), Ze = Ro.process(Xe, "output"), De = await nt.countTokens(Ze), Le = {
        id: Date.now().toString(),
        content: Ze,
        sourceFloors: H.floorRange,
        timestamp: Date.now(),
        tokenCount: De,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: Le });
        try {
          const B = await Og.requestRevision(
            "剧情摘要修订",
            `范围: ${H.floorRange[0]} - ${H.floorRange[1]} 楼 | Token: ${De}`,
            Le.content
          );
          Le.content = B, Le.tokenCount = await nt.countTokens(B), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), ia.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const je = await this.writeToWorldbook(Le);
      if (Le.writtenToWorldbook = je, await this.setLastSummarizedFloor(H.floorRange[1]), this.summaryHistory.push(Le), ia.success(`已总结 ${H.floorRange[0]}-${H.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const B = H.floorRange[0] - 1, C = H.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: B, endIndex: C }), w5(B, C).catch((D) => {
          this.log("error", "自动隐藏失败", D);
        });
      }
      return Le;
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
      const u = await nt.getChatWorldbook();
      if (!u)
        return this.log("warn", "无法获取聊天世界书"), !1;
      await nt.ensureSeparatorEntries(u);
      const c = await nt.getNextSummaryOrder(u), m = `{{// ${JSON.stringify({
        floors: s.sourceFloors,
        tokens: s.tokenCount,
        timestamp: s.timestamp
      })} }}`, h = `${s.content}

${m}`, x = await nt.createEntry(u, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: h,
        enabled: !0,
        // 开启状态，让摘要能被激活进入上下文
        constant: !0,
        order: c
        // 使用计算出的递增顺序
      });
      return x && this.log("success", "已写入世界书", { worldbook: u, order: c }), x;
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
    this.config = { ...this.config, ...s }, lt.set("summarizerConfig", this.config), this.log("debug", "配置已更新并保存", this.config);
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
      const { Logger: m } = await Promise.resolve().then(() => t2);
      m[s]("Summarizer", u, c);
    } catch {
      console.log(`[Summarizer] ${s}: ${u}`, c);
    }
  }
}
const Do = new m2(), Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: sr,
  DEFAULT_SUMMARIZER_CONFIG: f2,
  LLMAdapter: c2,
  RegexProcessor: Wo,
  SummarizerService: m2,
  TextProcessor: u2,
  llmAdapter: d2,
  regexProcessor: Ro,
  summarizerService: Do,
  textProcessor: o2
}, Symbol.toStringTag, { value: "Module" })), Dg = () => {
  const [o, s] = O.useState(
    Do.getConfig().previewEnabled
  ), u = (c) => {
    const m = c.target.checked;
    s(m), Do.updateConfig({ previewEnabled: m });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(Xi, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ i.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ i.jsx(Eg, {})
      ] }),
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ i.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ i.jsx(Dh, { size: 20 }) }),
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
        /* @__PURE__ */ i.jsx(J1, { size: 32 }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, Ug = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(Xi, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ i.jsx(G1, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ i.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), Bg = ({ links: o, onNavigate: s, className: u = "" }) => o.length === 0 ? null : /* @__PURE__ */ i.jsx("div", { className: `flex items-center gap-4 ${u}`, children: o.map((c) => {
  const m = c.icon || Oh;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
      onClick: () => s(c.linkTo),
      title: c.label,
      children: [
        /* @__PURE__ */ i.jsx(m, { size: 12 }),
        /* @__PURE__ */ i.jsx("span", { children: c.label })
      ]
    },
    c.id
  );
}) }), Hg = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6"
}, Ri = ({
  orientation: o = "horizontal",
  length: s = 100,
  className: u = "",
  responsive: c = !1,
  spacing: m = "none"
}) => {
  const h = Hg[m];
  return c ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(
      "div",
      {
        className: `hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 border-l border-border/30 ${u}`,
        style: { height: `${s}%` }
      }
    ),
    /* @__PURE__ */ i.jsx(
      "div",
      {
        className: `lg:hidden border-t border-border/30 mx-auto ${h} ${u}`,
        style: { width: `${s}%` }
      }
    )
  ] }) : o === "vertical" ? /* @__PURE__ */ i.jsx(
    "div",
    {
      className: `border-l border-border/30 mx-auto ${u}`,
      style: { height: `${s}%` }
    }
  ) : /* @__PURE__ */ i.jsx(
    "div",
    {
      className: `border-t border-border/30 ${h} ${u}`,
      style: { width: `${s}%` }
    }
  );
}, Lg = [
  { id: "token", label: "Token 数", icon: gh },
  { id: "floor", label: "楼层数", icon: Vo },
  { id: "count", label: "总结次数", icon: Hh }
], qg = () => {
  const [o, s] = O.useState(null), [u, c] = O.useState(!1), [m, h] = O.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [x, y] = O.useState({ ...A1 }), [p, j] = O.useState(0);
  O.useEffect(() => {
    A();
  }, []);
  const A = async () => {
    var V;
    try {
      const { summarizerService: ee } = await Promise.resolve().then(() => Qt);
      let X = ee.getStatus();
      X.lastSummarizedFloor === 0 && (await ee.initializeForCurrentChat(), X = ee.getStatus()), s(X);
      const Q = ee.getConfig();
      h({
        autoEnabled: Q.enabled,
        floorInterval: Q.floorInterval,
        bufferSize: Q.bufferSize || 3,
        autoHide: Q.autoHide || !1
      });
      const xe = (V = lt.getSummarizerSettings()) == null ? void 0 : V.trimConfig;
      xe && y({ ...A1, ...xe });
      const { WorldInfoService: Se } = await Promise.resolve().then(() => s2), Xe = Se.findExistingWorldbook();
      if (Xe) {
        const Ze = await Se.countSummaryTokens(Xe);
        j(Ze);
      } else
        j(0);
    } catch (ee) {
      console.error("加载 Summarizer 状态失败:", ee);
    }
  }, S = async () => {
    try {
      const { summarizerService: V } = await Promise.resolve().then(() => Qt);
      V.start(), await A();
    } catch (V) {
      console.error("启动失败:", V);
    }
  }, U = async () => {
    try {
      const { summarizerService: V } = await Promise.resolve().then(() => Qt);
      V.stop(), await A();
    } catch (V) {
      console.error("停止失败:", V);
    }
  }, L = async () => {
    c(!0);
    try {
      const { summarizerService: V } = await Promise.resolve().then(() => Qt);
      await V.triggerSummary(!0), await A();
    } catch (V) {
      console.error("触发失败:", V);
    } finally {
      c(!1);
    }
  }, H = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      c(!0);
      try {
        const { summarizerService: V } = await Promise.resolve().then(() => Qt);
        await V.setLastSummarizedFloor(0), await A();
      } catch (V) {
        console.error("重置失败:", V);
      } finally {
        c(!1);
      }
    }
  }, G = (V, ee) => {
    const X = { ...x, [V]: ee };
    y(X), te(X);
  }, te = (V) => {
    lt.setSummarizerSettings({ trimConfig: V });
  }, P = () => {
    const V = { ...x, enabled: !x.enabled };
    y(V), te(V);
  }, ae = (() => {
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
              children: /* @__PURE__ */ i.jsx(en, { size: 14 })
            }
          )
        ] }),
        o ? /* @__PURE__ */ i.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "运行状态" }),
              /* @__PURE__ */ i.jsxs("div", { className: `flex items-center gap-2 text-lg font-medium ${o.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                o.running ? /* @__PURE__ */ i.jsx(jh, { size: 18 }) : /* @__PURE__ */ i.jsx(Ho, { size: 18 }),
                o.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "待处理" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-3xl font-light text-amber-500 font-mono", children: o.pendingFloors })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(Ri, { length: 100, spacing: "md" }),
          /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "当前楼层" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-xl font-mono text-foreground/80", children: o.currentFloor })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "总结次数" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-xl font-mono text-foreground/80", children: o.historyCount })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(Ri, { length: 30, spacing: "md" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
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
            onClick: U,
            children: [
              /* @__PURE__ */ i.jsx(l3, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: S,
            children: [
              /* @__PURE__ */ i.jsx(Qo, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: L,
            disabled: u || (o == null ? void 0 : o.isSummarizing),
            children: [
              /* @__PURE__ */ i.jsx(en, { size: 14, className: u ? "animate-spin" : "" }),
              u ? "处理中..." : "手动触发"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "pt-6 space-y-6", children: [
        /* @__PURE__ */ i.jsx(Ri, { length: 100 }),
        /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-sm text-foreground", children: "自动总结" }),
            /* @__PURE__ */ i.jsx(
              ln,
              {
                label: "",
                checked: m.autoEnabled,
                onChange: async (V) => {
                  h((X) => ({ ...X, autoEnabled: V }));
                  const { summarizerService: ee } = await Promise.resolve().then(() => Qt);
                  ee.updateConfig({ enabled: V });
                }
              }
            )
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-sm text-foreground", children: "自动隐藏" }),
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground", children: "处理完后隐藏原文" })
            ] }),
            /* @__PURE__ */ i.jsx(
              ln,
              {
                label: "",
                checked: m.autoHide,
                onChange: (V) => {
                  h((ee) => ({ ...ee, autoHide: V })), Promise.resolve().then(() => Qt).then(({ summarizerService: ee }) => {
                    ee.updateConfig({ autoHide: V });
                  });
                }
              }
            )
          ] })
        ] }),
        m.autoEnabled && /* @__PURE__ */ i.jsx(i.Fragment, { children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "楼层将每隔 ",
              /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: m.floorInterval }),
              " 层总结"
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ i.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ i.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${(m.floorInterval - 5) / 95 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "range",
                  min: 5,
                  max: 100,
                  step: 5,
                  value: m.floorInterval,
                  onChange: async (V) => {
                    const ee = Number(V.target.value);
                    h((Q) => ({ ...Q, floorInterval: ee }));
                    const { summarizerService: X } = await Promise.resolve().then(() => Qt);
                    X.updateConfig({ floorInterval: ee });
                  },
                  className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                  style: { appearance: "none", WebkitAppearance: "none" }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "保留最近 ",
              /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: m.bufferSize }),
              " 层作为缓冲"
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ i.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ i.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${m.bufferSize / 20 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 20,
                  step: 1,
                  value: m.bufferSize,
                  onChange: (V) => {
                    const ee = Number(V.target.value);
                    h((X) => ({ ...X, bufferSize: ee })), Promise.resolve().then(() => Qt).then(({ summarizerService: X }) => {
                      X.updateConfig({ bufferSize: ee });
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
      /* @__PURE__ */ i.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ i.jsxs(
        "button",
        {
          className: "inline-flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 border border-red-200 rounded transition-colors",
          onClick: H,
          disabled: u,
          title: "重置进度 (重新扫描历史)",
          children: [
            /* @__PURE__ */ i.jsx(en, { size: 12, className: u ? "animate-spin" : "" }),
            "重置所有进度"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "space-y-6 lg:pl-8 relative", children: [
      /* @__PURE__ */ i.jsx(Ri, { responsive: !0, length: 30 }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("h2", { className: "text-sm font-medium text-foreground", children: "精简配置" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "将多次总结压缩为更简洁的摘要" })
        ] }),
        /* @__PURE__ */ i.jsx(
          ln,
          {
            label: "",
            checked: x.enabled,
            onChange: P
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: `space-y-6 transition-opacity ${x.enabled ? "opacity-100" : "opacity-40 pointer-events-none"}`, children: [
        /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: "触发条件" }),
          /* @__PURE__ */ i.jsx("div", { className: "flex gap-6", children: Lg.map((V) => /* @__PURE__ */ i.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer group",
              children: [
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${x.trigger === V.id ? "border-primary bg-primary" : "border-border group-hover:border-muted-foreground"}`,
                    children: x.trigger === V.id && /* @__PURE__ */ i.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ i.jsx("span", { className: `text-sm transition-colors ${x.trigger === V.id ? "text-foreground" : "text-muted-foreground"}`, children: V.label })
              ]
            },
            V.id
          )) })
        ] }),
        /* @__PURE__ */ i.jsx(
          Ul,
          {
            label: ae.label,
            value: ae.value,
            onChange: (V) => {
              const ee = x.trigger === "token" ? "tokenLimit" : x.trigger === "floor" ? "floorLimit" : "countLimit";
              G(ee, V);
            },
            min: ae.min,
            max: ae.max,
            step: ae.step,
            showSlider: !0
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: () => console.log("手动触发精简..."),
            children: [
              /* @__PURE__ */ i.jsx(m3, { size: 14 }),
              "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, Gg = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ i.jsx(Go, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ i.jsx(ur, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ i.jsx(Vo, { size: 16 }) }
], Yg = [
  { id: "devlog", label: "模型日志", icon: g3, linkTo: "devlog:model" },
  { id: "presets", label: "提示词模板", icon: sh, linkTo: "presets:prompt" }
], Vg = ({ onNavigate: o }) => {
  const [s, u] = O.useState("summary");
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "sticky top-0 z-10 bg-background -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 pt-2 -mt-2", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-2", children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex overflow-x-auto gap-2 no-scrollbar", children: Gg.map((c) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          onClick: () => u(c.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === c.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            c.icon && /* @__PURE__ */ i.jsx("span", { className: "w-4 h-4", children: c.icon }),
            c.label,
            s === c.id && /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" })
          ]
        },
        c.id
      )) }),
      /* @__PURE__ */ i.jsx(
        Bg,
        {
          links: Yg,
          onNavigate: (c) => o == null ? void 0 : o(c)
        }
      )
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "summary" && /* @__PURE__ */ i.jsx(qg, {}),
      s === "vectorization" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ i.jsx(ur, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ i.jsx(ch, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, Vt = {
  primary: "#FFFFFF",
  grid: "#111111"
}, Qg = ({ onComplete: o }) => {
  const s = O.useRef(null), u = O.useRef(null), c = O.useRef(null), m = O.useRef(null), [h, x] = O.useState(!1);
  O.useEffect(() => {
    if (window.gsap) {
      x(!0);
      return;
    }
    const p = document.createElement("script");
    p.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", p.async = !0, p.onload = () => x(!0), document.body.appendChild(p);
  }, []);
  const y = () => {
    var L;
    if (!h || !u.current) return;
    const p = window.gsap, j = u.current, A = j.getTotalLength();
    p.set(j, {
      strokeDasharray: A,
      strokeDashoffset: A,
      stroke: Vt.primary,
      fillOpacity: 0,
      opacity: 1,
      strokeWidth: 2
    });
    const S = (L = c.current) == null ? void 0 : L.querySelectorAll("path");
    S && p.set(S, { opacity: 0, y: 10 }), p.set(m.current, { scale: 1, opacity: 1 }), p.set(s.current, { opacity: 1 });
    const U = p.timeline({
      onComplete: () => {
        p.to(s.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: o
        });
      }
    });
    U.to(j, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), S && U.to(S, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), U.to({}, { duration: 1 });
  };
  return O.useEffect(() => {
    if (h) {
      const p = setTimeout(y, 800);
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
              children: /* @__PURE__ */ i.jsxs("g", { ref: m, className: "origin-center", children: [
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
}, Xg = ({ onClose: o }) => {
  const [s, u] = O.useState("dashboard"), [c, m] = O.useState(!1), [h, x] = O.useState(!1);
  O.useEffect(() => {
    const j = setTimeout(() => {
      const A = lt.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", A), A || m(!0), x(!0);
    }, 1e3);
    return () => clearTimeout(j);
  }, []);
  const y = () => {
    lt.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), m(!1);
  };
  if (!h)
    return null;
  const p = () => {
    const [j, A] = s.split(":");
    switch (j) {
      case "dashboard":
        return /* @__PURE__ */ i.jsx(C1, { onNavigate: u });
      case "presets":
        return /* @__PURE__ */ i.jsx(Ng, { initialTab: A });
      case "graph":
        return /* @__PURE__ */ i.jsx(R5, {});
      case "devlog":
        return /* @__PURE__ */ i.jsx($5, { initialTab: A });
      case "settings":
        return /* @__PURE__ */ i.jsx(Dg, {});
      case "memory":
        return /* @__PURE__ */ i.jsx(Ug, {});
      case "processing":
        return /* @__PURE__ */ i.jsx(Vg, { onNavigate: u });
      default:
        return /* @__PURE__ */ i.jsx(C1, {});
    }
  };
  return /* @__PURE__ */ i.jsxs(a2, { children: [
    c && /* @__PURE__ */ i.jsx(Qg, { onComplete: y }),
    /* @__PURE__ */ i.jsx(S5, { activeTab: s, setActiveTab: u, onClose: o, children: p() })
  ] });
};
var Zg = B1();
const $g = /* @__PURE__ */ Uo(Zg), Kg = () => {
  const [o, s] = O.useState(!1), [u, c] = O.useState(null), [m, h] = O.useState("");
  O.useEffect(() => {
    const p = oa.on(
      Bl.ENGRAM_REQUEST_REVISION,
      (j) => {
        const A = j;
        c(A), h(A.content), s(!0);
      }
    );
    return () => {
      p();
    };
  }, []);
  const x = () => {
    u && (u.onConfirm(m), s(!1), c(null));
  }, y = () => {
    u && u.onCancel(), s(!1), c(null);
  };
  return o ? $g.createPortal(
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
              onClick: y
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
                  onClick: y,
                  className: "p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ i.jsx(Vi, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ i.jsx(_3, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ i.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "请仔细检查内容的格式、关键信息和一致性。这是写入长期记忆前的最后确认。" })
              ] }),
              /* @__PURE__ */ i.jsx(
                "textarea",
                {
                  value: m,
                  onChange: (p) => h(p.target.value),
                  className: "flex-1 w-full min-h-[200px] p-4 bg-muted border border-border rounded-md font-mono text-sm text-foreground leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                  spellCheck: !1,
                  placeholder: "在此编辑内容..."
                }
              ),
              /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-muted-foreground text-right font-mono", children: [
                m.length,
                " 字符"
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-muted/30", children: [
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: y,
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors",
                  style: { backgroundColor: "transparent" },
                  children: "取消"
                }
              ),
              /* @__PURE__ */ i.jsxs(
                "button",
                {
                  onClick: x,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-opacity",
                  style: {
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  },
                  children: [
                    /* @__PURE__ */ i.jsx(Y1, { size: 16 }),
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
_5((o, s) => {
  const u = H1.createRoot(o);
  return u.render(Y4.createElement(Xg, { onClose: s })), u;
});
z5((o) => {
  const s = H1.createRoot(o);
  return s.render(
    /* @__PURE__ */ i.jsx(a2, { children: /* @__PURE__ */ i.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ i.jsx(Kg, {}) }) })
  ), s;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", S1) : S1();
//# sourceMappingURL=index.js.map
