var Gh = Object.defineProperty;
var Vh = (u, s, o) => s in u ? Gh(u, s, { enumerable: !0, configurable: !0, writable: !0, value: o }) : u[s] = o;
var He = (u, s, o) => Vh(u, typeof s != "symbol" ? s + "" : s, o);
function Lc(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var pc = { exports: {} }, tr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l1;
function Qh() {
  if (l1) return tr;
  l1 = 1;
  var u = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function o(c, f, h) {
    var y = null;
    if (h !== void 0 && (y = "" + h), f.key !== void 0 && (y = "" + f.key), "key" in f) {
      h = {};
      for (var p in f)
        p !== "key" && (h[p] = f[p]);
    } else h = f;
    return f = h.ref, {
      $$typeof: u,
      type: c,
      key: y,
      ref: f !== void 0 ? f : null,
      props: h
    };
  }
  return tr.Fragment = s, tr.jsx = o, tr.jsxs = o, tr;
}
var a1;
function Xh() {
  return a1 || (a1 = 1, pc.exports = Qh()), pc.exports;
}
var i = Xh(), xc = { exports: {} }, re = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var r1;
function $h() {
  if (r1) return re;
  r1 = 1;
  var u = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), y = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), D = Symbol.iterator;
  function H(j) {
    return j === null || typeof j != "object" ? null : (j = D && j[D] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, q = Object.assign, F = {};
  function ee(j, R, G) {
    this.props = j, this.context = R, this.refs = F, this.updater = G || B;
  }
  ee.prototype.isReactComponent = {}, ee.prototype.setState = function(j, R) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, R, "setState");
  }, ee.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = ee.prototype;
  function te(j, R, G) {
    this.props = j, this.context = R, this.refs = F, this.updater = G || B;
  }
  var Me = te.prototype = new Y();
  Me.constructor = te, q(Me, ee.prototype), Me.isPureReactComponent = !0;
  var ne = Array.isArray;
  function J() {
  }
  var X = { H: null, A: null, T: null, S: null }, be = Object.prototype.hasOwnProperty;
  function Oe(j, R, G) {
    var $ = G.ref;
    return {
      $$typeof: u,
      type: j,
      key: R,
      ref: $ !== void 0 ? $ : null,
      props: G
    };
  }
  function Se(j, R) {
    return Oe(j.type, R, j.props);
  }
  function V(j) {
    return typeof j == "object" && j !== null && j.$$typeof === u;
  }
  function le(j) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(G) {
      return R[G];
    });
  }
  var ce = /\/+/g;
  function ge(j, R) {
    return typeof j == "object" && j !== null && j.key != null ? le("" + j.key) : R.toString(36);
  }
  function L(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(J, J) : (j.status = "pending", j.then(
          function(R) {
            j.status === "pending" && (j.status = "fulfilled", j.value = R);
          },
          function(R) {
            j.status === "pending" && (j.status = "rejected", j.reason = R);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function C(j, R, G, $, ie) {
    var ue = typeof j;
    (ue === "undefined" || ue === "boolean") && (j = null);
    var Ee = !1;
    if (j === null) Ee = !0;
    else
      switch (ue) {
        case "bigint":
        case "string":
        case "number":
          Ee = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case u:
            case s:
              Ee = !0;
              break;
            case E:
              return Ee = j._init, C(
                Ee(j._payload),
                R,
                G,
                $,
                ie
              );
          }
      }
    if (Ee)
      return ie = ie(j), Ee = $ === "" ? "." + ge(j, 0) : $, ne(ie) ? (G = "", Ee != null && (G = Ee.replace(ce, "$&/") + "/"), C(ie, R, G, "", function(oa) {
        return oa;
      })) : ie != null && (V(ie) && (ie = Se(
        ie,
        G + (ie.key == null || j && j.key === ie.key ? "" : ("" + ie.key).replace(
          ce,
          "$&/"
        ) + "/") + Ee
      )), R.push(ie)), 1;
    Ee = 0;
    var it = $ === "" ? "." : $ + ":";
    if (ne(j))
      for (var Ge = 0; Ge < j.length; Ge++)
        $ = j[Ge], ue = it + ge($, Ge), Ee += C(
          $,
          R,
          G,
          ue,
          ie
        );
    else if (Ge = H(j), typeof Ge == "function")
      for (j = Ge.call(j), Ge = 0; !($ = j.next()).done; )
        $ = $.value, ue = it + ge($, Ge++), Ee += C(
          $,
          R,
          G,
          ue,
          ie
        );
    else if (ue === "object") {
      if (typeof j.then == "function")
        return C(
          L(j),
          R,
          G,
          $,
          ie
        );
      throw R = String(j), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ee;
  }
  function U(j, R, G) {
    if (j == null) return j;
    var $ = [], ie = 0;
    return C(j, $, "", "", function(ue) {
      return R.call(G, ue, ie++);
    }), $;
  }
  function I(j) {
    if (j._status === -1) {
      var R = j._result;
      R = R(), R.then(
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = G);
        },
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = G);
        }
      ), j._status === -1 && (j._status = 0, j._result = R);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var Ne = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  }, je = {
    map: U,
    forEach: function(j, R, G) {
      U(
        j,
        function() {
          R.apply(this, arguments);
        },
        G
      );
    },
    count: function(j) {
      var R = 0;
      return U(j, function() {
        R++;
      }), R;
    },
    toArray: function(j) {
      return U(j, function(R) {
        return R;
      }) || [];
    },
    only: function(j) {
      if (!V(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return re.Activity = b, re.Children = je, re.Component = ee, re.Fragment = o, re.Profiler = f, re.PureComponent = te, re.StrictMode = c, re.Suspense = g, re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = X, re.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return X.H.useMemoCache(j);
    }
  }, re.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, re.cacheSignal = function() {
    return null;
  }, re.cloneElement = function(j, R, G) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var $ = q({}, j.props), ie = j.key;
    if (R != null)
      for (ue in R.key !== void 0 && (ie = "" + R.key), R)
        !be.call(R, ue) || ue === "key" || ue === "__self" || ue === "__source" || ue === "ref" && R.ref === void 0 || ($[ue] = R[ue]);
    var ue = arguments.length - 2;
    if (ue === 1) $.children = G;
    else if (1 < ue) {
      for (var Ee = Array(ue), it = 0; it < ue; it++)
        Ee[it] = arguments[it + 2];
      $.children = Ee;
    }
    return Oe(j.type, ie, $);
  }, re.createContext = function(j) {
    return j = {
      $$typeof: y,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: h,
      _context: j
    }, j;
  }, re.createElement = function(j, R, G) {
    var $, ie = {}, ue = null;
    if (R != null)
      for ($ in R.key !== void 0 && (ue = "" + R.key), R)
        be.call(R, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (ie[$] = R[$]);
    var Ee = arguments.length - 2;
    if (Ee === 1) ie.children = G;
    else if (1 < Ee) {
      for (var it = Array(Ee), Ge = 0; Ge < Ee; Ge++)
        it[Ge] = arguments[Ge + 2];
      ie.children = it;
    }
    if (j && j.defaultProps)
      for ($ in Ee = j.defaultProps, Ee)
        ie[$] === void 0 && (ie[$] = Ee[$]);
    return Oe(j, ue, ie);
  }, re.createRef = function() {
    return { current: null };
  }, re.forwardRef = function(j) {
    return { $$typeof: p, render: j };
  }, re.isValidElement = V, re.lazy = function(j) {
    return {
      $$typeof: E,
      _payload: { _status: -1, _result: j },
      _init: I
    };
  }, re.memo = function(j, R) {
    return {
      $$typeof: v,
      type: j,
      compare: R === void 0 ? null : R
    };
  }, re.startTransition = function(j) {
    var R = X.T, G = {};
    X.T = G;
    try {
      var $ = j(), ie = X.S;
      ie !== null && ie(G, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(J, Ne);
    } catch (ue) {
      Ne(ue);
    } finally {
      R !== null && G.types !== null && (R.types = G.types), X.T = R;
    }
  }, re.unstable_useCacheRefresh = function() {
    return X.H.useCacheRefresh();
  }, re.use = function(j) {
    return X.H.use(j);
  }, re.useActionState = function(j, R, G) {
    return X.H.useActionState(j, R, G);
  }, re.useCallback = function(j, R) {
    return X.H.useCallback(j, R);
  }, re.useContext = function(j) {
    return X.H.useContext(j);
  }, re.useDebugValue = function() {
  }, re.useDeferredValue = function(j, R) {
    return X.H.useDeferredValue(j, R);
  }, re.useEffect = function(j, R) {
    return X.H.useEffect(j, R);
  }, re.useEffectEvent = function(j) {
    return X.H.useEffectEvent(j);
  }, re.useId = function() {
    return X.H.useId();
  }, re.useImperativeHandle = function(j, R, G) {
    return X.H.useImperativeHandle(j, R, G);
  }, re.useInsertionEffect = function(j, R) {
    return X.H.useInsertionEffect(j, R);
  }, re.useLayoutEffect = function(j, R) {
    return X.H.useLayoutEffect(j, R);
  }, re.useMemo = function(j, R) {
    return X.H.useMemo(j, R);
  }, re.useOptimistic = function(j, R) {
    return X.H.useOptimistic(j, R);
  }, re.useReducer = function(j, R, G) {
    return X.H.useReducer(j, R, G);
  }, re.useRef = function(j) {
    return X.H.useRef(j);
  }, re.useState = function(j) {
    return X.H.useState(j);
  }, re.useSyncExternalStore = function(j, R, G) {
    return X.H.useSyncExternalStore(
      j,
      R,
      G
    );
  }, re.useTransition = function() {
    return X.H.useTransition();
  }, re.version = "19.2.3", re;
}
var i1;
function qc() {
  return i1 || (i1 = 1, xc.exports = $h()), xc.exports;
}
var M = qc();
const Zh = /* @__PURE__ */ Lc(M);
var yc = { exports: {} }, nr = {}, vc = { exports: {} }, bc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var s1;
function Kh() {
  return s1 || (s1 = 1, (function(u) {
    function s(C, U) {
      var I = C.length;
      C.push(U);
      e: for (; 0 < I; ) {
        var Ne = I - 1 >>> 1, je = C[Ne];
        if (0 < f(je, U))
          C[Ne] = U, C[I] = je, I = Ne;
        else break e;
      }
    }
    function o(C) {
      return C.length === 0 ? null : C[0];
    }
    function c(C) {
      if (C.length === 0) return null;
      var U = C[0], I = C.pop();
      if (I !== U) {
        C[0] = I;
        e: for (var Ne = 0, je = C.length, j = je >>> 1; Ne < j; ) {
          var R = 2 * (Ne + 1) - 1, G = C[R], $ = R + 1, ie = C[$];
          if (0 > f(G, I))
            $ < je && 0 > f(ie, G) ? (C[Ne] = ie, C[$] = I, Ne = $) : (C[Ne] = G, C[R] = I, Ne = R);
          else if ($ < je && 0 > f(ie, I))
            C[Ne] = ie, C[$] = I, Ne = $;
          else break e;
        }
      }
      return U;
    }
    function f(C, U) {
      var I = C.sortIndex - U.sortIndex;
      return I !== 0 ? I : C.id - U.id;
    }
    if (u.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      u.unstable_now = function() {
        return h.now();
      };
    } else {
      var y = Date, p = y.now();
      u.unstable_now = function() {
        return y.now() - p;
      };
    }
    var g = [], v = [], E = 1, b = null, D = 3, H = !1, B = !1, q = !1, F = !1, ee = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, te = typeof setImmediate < "u" ? setImmediate : null;
    function Me(C) {
      for (var U = o(v); U !== null; ) {
        if (U.callback === null) c(v);
        else if (U.startTime <= C)
          c(v), U.sortIndex = U.expirationTime, s(g, U);
        else break;
        U = o(v);
      }
    }
    function ne(C) {
      if (q = !1, Me(C), !B)
        if (o(g) !== null)
          B = !0, J || (J = !0, le());
        else {
          var U = o(v);
          U !== null && L(ne, U.startTime - C);
        }
    }
    var J = !1, X = -1, be = 5, Oe = -1;
    function Se() {
      return F ? !0 : !(u.unstable_now() - Oe < be);
    }
    function V() {
      if (F = !1, J) {
        var C = u.unstable_now();
        Oe = C;
        var U = !0;
        try {
          e: {
            B = !1, q && (q = !1, Y(X), X = -1), H = !0;
            var I = D;
            try {
              t: {
                for (Me(C), b = o(g); b !== null && !(b.expirationTime > C && Se()); ) {
                  var Ne = b.callback;
                  if (typeof Ne == "function") {
                    b.callback = null, D = b.priorityLevel;
                    var je = Ne(
                      b.expirationTime <= C
                    );
                    if (C = u.unstable_now(), typeof je == "function") {
                      b.callback = je, Me(C), U = !0;
                      break t;
                    }
                    b === o(g) && c(g), Me(C);
                  } else c(g);
                  b = o(g);
                }
                if (b !== null) U = !0;
                else {
                  var j = o(v);
                  j !== null && L(
                    ne,
                    j.startTime - C
                  ), U = !1;
                }
              }
              break e;
            } finally {
              b = null, D = I, H = !1;
            }
            U = void 0;
          }
        } finally {
          U ? le() : J = !1;
        }
      }
    }
    var le;
    if (typeof te == "function")
      le = function() {
        te(V);
      };
    else if (typeof MessageChannel < "u") {
      var ce = new MessageChannel(), ge = ce.port2;
      ce.port1.onmessage = V, le = function() {
        ge.postMessage(null);
      };
    } else
      le = function() {
        ee(V, 0);
      };
    function L(C, U) {
      X = ee(function() {
        C(u.unstable_now());
      }, U);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, u.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : be = 0 < C ? Math.floor(1e3 / C) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, u.unstable_next = function(C) {
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
    }, u.unstable_requestPaint = function() {
      F = !0;
    }, u.unstable_runWithPriority = function(C, U) {
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
    }, u.unstable_scheduleCallback = function(C, U, I) {
      var Ne = u.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? Ne + I : Ne) : I = Ne, C) {
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
        id: E++,
        callback: U,
        priorityLevel: C,
        startTime: I,
        expirationTime: je,
        sortIndex: -1
      }, I > Ne ? (C.sortIndex = I, s(v, C), o(g) === null && C === o(v) && (q ? (Y(X), X = -1) : q = !0, L(ne, I - Ne))) : (C.sortIndex = je, s(g, C), B || H || (B = !0, J || (J = !0, le()))), C;
    }, u.unstable_shouldYield = Se, u.unstable_wrapCallback = function(C) {
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
  })(bc)), bc;
}
var o1;
function Jh() {
  return o1 || (o1 = 1, vc.exports = Kh()), vc.exports;
}
var Sc = { exports: {} }, at = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var c1;
function Fh() {
  if (c1) return at;
  c1 = 1;
  var u = qc();
  function s(g) {
    var v = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var E = 2; E < arguments.length; E++)
        v += "&args[]=" + encodeURIComponent(arguments[E]);
    }
    return "Minified React error #" + g + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function h(g, v, E) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: b == null ? null : "" + b,
      children: g,
      containerInfo: v,
      implementation: E
    };
  }
  var y = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, v) {
    if (g === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, at.createPortal = function(g, v) {
    var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(s(299));
    return h(g, v, null, E);
  }, at.flushSync = function(g) {
    var v = y.T, E = c.p;
    try {
      if (y.T = null, c.p = 2, g) return g();
    } finally {
      y.T = v, c.p = E, c.d.f();
    }
  }, at.preconnect = function(g, v) {
    typeof g == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, c.d.C(g, v));
  }, at.prefetchDNS = function(g) {
    typeof g == "string" && c.d.D(g);
  }, at.preinit = function(g, v) {
    if (typeof g == "string" && v && typeof v.as == "string") {
      var E = v.as, b = p(E, v.crossOrigin), D = typeof v.integrity == "string" ? v.integrity : void 0, H = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      E === "style" ? c.d.S(
        g,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: D,
          fetchPriority: H
        }
      ) : E === "script" && c.d.X(g, {
        crossOrigin: b,
        integrity: D,
        fetchPriority: H,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, at.preinitModule = function(g, v) {
    if (typeof g == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var E = p(
            v.as,
            v.crossOrigin
          );
          c.d.M(g, {
            crossOrigin: E,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && c.d.M(g);
  }, at.preload = function(g, v) {
    if (typeof g == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var E = v.as, b = p(E, v.crossOrigin);
      c.d.L(g, E, {
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
  }, at.preloadModule = function(g, v) {
    if (typeof g == "string")
      if (v) {
        var E = p(v.as, v.crossOrigin);
        c.d.m(g, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: E,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else c.d.m(g);
  }, at.requestFormReset = function(g) {
    c.d.r(g);
  }, at.unstable_batchedUpdates = function(g, v) {
    return g(v);
  }, at.useFormState = function(g, v, E) {
    return y.H.useFormState(g, v, E);
  }, at.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, at.version = "19.2.3", at;
}
var u1;
function L1() {
  if (u1) return Sc.exports;
  u1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (s) {
        console.error(s);
      }
  }
  return u(), Sc.exports = Fh(), Sc.exports;
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
var d1;
function Wh() {
  if (d1) return nr;
  d1 = 1;
  var u = Jh(), s = qc(), o = L1();
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
  function h(e) {
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
  function y(e) {
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
    if (h(e) !== e)
      throw Error(c(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var a = n.return;
      if (a === null) break;
      var r = a.alternate;
      if (r === null) {
        if (l = a.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === r.child) {
        for (r = a.child; r; ) {
          if (r === n) return g(a), e;
          if (r === l) return g(a), t;
          r = r.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== l.return) n = a, l = r;
      else {
        for (var d = !1, m = a.child; m; ) {
          if (m === n) {
            d = !0, n = a, l = r;
            break;
          }
          if (m === l) {
            d = !0, l = a, n = r;
            break;
          }
          m = m.sibling;
        }
        if (!d) {
          for (m = r.child; m; ) {
            if (m === n) {
              d = !0, n = r, l = a;
              break;
            }
            if (m === l) {
              d = !0, l = r, n = a;
              break;
            }
            m = m.sibling;
          }
          if (!d) throw Error(c(189));
        }
      }
      if (n.alternate !== l) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function E(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = E(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign, D = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), q = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), Y = Symbol.for("react.consumer"), te = Symbol.for("react.context"), Me = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), X = Symbol.for("react.memo"), be = Symbol.for("react.lazy"), Oe = Symbol.for("react.activity"), Se = Symbol.for("react.memo_cache_sentinel"), V = Symbol.iterator;
  function le(e) {
    return e === null || typeof e != "object" ? null : (e = V && e[V] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ce = Symbol.for("react.client.reference");
  function ge(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ce ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case q:
        return "Fragment";
      case ee:
        return "Profiler";
      case F:
        return "StrictMode";
      case ne:
        return "Suspense";
      case J:
        return "SuspenseList";
      case Oe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case B:
          return "Portal";
        case te:
          return e.displayName || "Context";
        case Y:
          return (e._context.displayName || "Context") + ".Consumer";
        case Me:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case X:
          return t = e.displayName || null, t !== null ? t : ge(e.type) || "Memo";
        case be:
          t = e._payload, e = e._init;
          try {
            return ge(e(t));
          } catch {
          }
      }
    return null;
  }
  var L = Array.isArray, C = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ne = [], je = -1;
  function j(e) {
    return { current: e };
  }
  function R(e) {
    0 > je || (e.current = Ne[je], Ne[je] = null, je--);
  }
  function G(e, t) {
    je++, Ne[je] = e.current, e.current = t;
  }
  var $ = j(null), ie = j(null), ue = j(null), Ee = j(null);
  function it(e, t) {
    switch (G(ue, t), G(ie, e), G($, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? T0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = T0(t), e = _0(t, e);
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
    R($), G($, e);
  }
  function Ge() {
    R($), R(ie), R(ue);
  }
  function oa(e) {
    e.memoizedState !== null && G(Ee, e);
    var t = $.current, n = _0(t, e.type);
    t !== n && (G(ie, e), G($, n));
  }
  function hr(e) {
    ie.current === e && (R($), R(ie)), Ee.current === e && (R(Ee), Wa._currentValue = I);
  }
  var Wi, tu;
  function Gn(e) {
    if (Wi === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Wi = t && t[1] || "", tu = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Wi + e + tu;
  }
  var Ii = !1;
  function Pi(e, t) {
    if (!e || Ii) return "";
    Ii = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
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
                } catch (A) {
                  var z = A;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (A) {
                  z = A;
                }
                e.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                z = A;
              }
              (O = e()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (A) {
            if (A && z && typeof A.stack == "string")
              return [A.stack, z.stack];
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
      var r = l.DetermineComponentFrameRoot(), d = r[0], m = r[1];
      if (d && m) {
        var x = d.split(`
`), _ = m.split(`
`);
        for (a = l = 0; l < x.length && !x[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; a < _.length && !_[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (l === x.length || a === _.length)
          for (l = x.length - 1, a = _.length - 1; 1 <= l && 0 <= a && x[l] !== _[a]; )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (x[l] !== _[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || x[l] !== _[a]) {
                  var w = `
` + x[l].replace(" at new ", " at ");
                  return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      Ii = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Gn(n) : "";
  }
  function vm(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Gn(e.type);
      case 16:
        return Gn("Lazy");
      case 13:
        return e.child !== t && t !== null ? Gn("Suspense Fallback") : Gn("Suspense");
      case 19:
        return Gn("SuspenseList");
      case 0:
      case 15:
        return Pi(e.type, !1);
      case 11:
        return Pi(e.type.render, !1);
      case 1:
        return Pi(e.type, !0);
      case 31:
        return Gn("Activity");
      default:
        return "";
    }
  }
  function nu(e) {
    try {
      var t = "", n = null;
      do
        t += vm(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var es = Object.prototype.hasOwnProperty, ts = u.unstable_scheduleCallback, ns = u.unstable_cancelCallback, bm = u.unstable_shouldYield, Sm = u.unstable_requestPaint, pt = u.unstable_now, jm = u.unstable_getCurrentPriorityLevel, lu = u.unstable_ImmediatePriority, au = u.unstable_UserBlockingPriority, gr = u.unstable_NormalPriority, Cm = u.unstable_LowPriority, ru = u.unstable_IdlePriority, Nm = u.log, Em = u.unstable_setDisableYieldValue, ca = null, xt = null;
  function hn(e) {
    if (typeof Nm == "function" && Em(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(ca, e);
      } catch {
      }
  }
  var yt = Math.clz32 ? Math.clz32 : zm, Tm = Math.log, _m = Math.LN2;
  function zm(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Tm(e) / _m | 0) | 0;
  }
  var pr = 256, xr = 262144, yr = 4194304;
  function Vn(e) {
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
  function vr(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var a = 0, r = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var m = l & 134217727;
    return m !== 0 ? (l = m & ~r, l !== 0 ? a = Vn(l) : (d &= m, d !== 0 ? a = Vn(d) : n || (n = m & ~e, n !== 0 && (a = Vn(n))))) : (m = l & ~r, m !== 0 ? a = Vn(m) : d !== 0 ? a = Vn(d) : n || (n = l & ~e, n !== 0 && (a = Vn(n)))), a === 0 ? 0 : t !== 0 && t !== a && (t & r) === 0 && (r = a & -a, n = t & -t, r >= n || r === 32 && (n & 4194048) !== 0) ? t : a;
  }
  function ua(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Am(e, t) {
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
  function iu() {
    var e = yr;
    return yr <<= 1, (yr & 62914560) === 0 && (yr = 4194304), e;
  }
  function ls(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function da(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function wm(e, t, n, l, a, r) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var m = e.entanglements, x = e.expirationTimes, _ = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var w = 31 - yt(n), O = 1 << w;
      m[w] = 0, x[w] = -1;
      var z = _[w];
      if (z !== null)
        for (_[w] = null, w = 0; w < z.length; w++) {
          var A = z[w];
          A !== null && (A.lane &= -536870913);
        }
      n &= ~O;
    }
    l !== 0 && su(e, l, 0), r !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(d & ~t));
  }
  function su(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - yt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function ou(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - yt(n), a = 1 << l;
      a & t | e[l] & t && (e[l] |= t), n &= ~a;
    }
  }
  function cu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : as(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function as(e) {
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
  function rs(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function uu() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : F0(e.type));
  }
  function du(e, t) {
    var n = U.p;
    try {
      return U.p = e, t();
    } finally {
      U.p = n;
    }
  }
  var gn = Math.random().toString(36).slice(2), Ie = "__reactFiber$" + gn, ot = "__reactProps$" + gn, ml = "__reactContainer$" + gn, is = "__reactEvents$" + gn, km = "__reactListeners$" + gn, Mm = "__reactHandles$" + gn, fu = "__reactResources$" + gn, fa = "__reactMarker$" + gn;
  function ss(e) {
    delete e[Ie], delete e[ot], delete e[is], delete e[km], delete e[Mm];
  }
  function hl(e) {
    var t = e[Ie];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ml] || n[Ie]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = R0(e); e !== null; ) {
            if (n = e[Ie]) return n;
            e = R0(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function gl(e) {
    if (e = e[Ie] || e[ml]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ma(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function pl(e) {
    var t = e[fu];
    return t || (t = e[fu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fe(e) {
    e[fa] = !0;
  }
  var mu = /* @__PURE__ */ new Set(), hu = {};
  function Qn(e, t) {
    xl(e, t), xl(e + "Capture", t);
  }
  function xl(e, t) {
    for (hu[e] = t, e = 0; e < t.length; e++)
      mu.add(t[e]);
  }
  var Om = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), gu = {}, pu = {};
  function Rm(e) {
    return es.call(pu, e) ? !0 : es.call(gu, e) ? !1 : Om.test(e) ? pu[e] = !0 : (gu[e] = !0, !1);
  }
  function br(e, t, n) {
    if (Rm(t))
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
  function Sr(e, t, n) {
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
  function Kt(e, t, n, l) {
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
  function _t(e) {
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
  function xu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Dm(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var a = l.get, r = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(d) {
          n = "" + d, r.call(this, d);
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
  function os(e) {
    if (!e._valueTracker) {
      var t = xu(e) ? "checked" : "value";
      e._valueTracker = Dm(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function yu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = xu(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function jr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Um = /[\n"\\]/g;
  function zt(e) {
    return e.replace(
      Um,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function cs(e, t, n, l, a, r, d, m) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + _t(t)) : e.value !== "" + _t(t) && (e.value = "" + _t(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? us(e, d, _t(t)) : n != null ? us(e, d, _t(n)) : l != null && e.removeAttribute("value"), a == null && r != null && (e.defaultChecked = !!r), a != null && (e.checked = a && typeof a != "function" && typeof a != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.name = "" + _t(m) : e.removeAttribute("name");
  }
  function vu(e, t, n, l, a, r, d, m) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || n != null) {
      if (!(r !== "submit" && r !== "reset" || t != null)) {
        os(e);
        return;
      }
      n = n != null ? "" + _t(n) : "", t = t != null ? "" + _t(t) : n, m || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = m ? e.checked : !!l, e.defaultChecked = !!l, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), os(e);
  }
  function us(e, t, n) {
    t === "number" && jr(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function yl(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++)
        t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++)
        a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + _t(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) {
          e[a].selected = !0, l && (e[a].defaultSelected = !0);
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function bu(e, t, n) {
    if (t != null && (t = "" + _t(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + _t(n) : "";
  }
  function Su(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(c(92));
        if (L(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = _t(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), os(e);
  }
  function vl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Bm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ju(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Bm.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Cu(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var a in t)
        l = t[a], t.hasOwnProperty(a) && n[a] !== l && ju(e, a, l);
    } else
      for (var r in t)
        t.hasOwnProperty(r) && ju(e, r, t[r]);
  }
  function ds(e) {
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
  var Hm = /* @__PURE__ */ new Map([
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
  ]), Lm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cr(e) {
    return Lm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Jt() {
  }
  var fs = null;
  function ms(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var bl = null, Sl = null;
  function Nu(e) {
    var t = gl(e);
    if (t && (e = t.stateNode)) {
      var n = e[ot] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (cs(
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
                cs(
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
              l = n[t], l.form === e.form && yu(l);
          }
          break e;
        case "textarea":
          bu(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && yl(e, !!n.multiple, t, !1);
      }
    }
  }
  var hs = !1;
  function Eu(e, t, n) {
    if (hs) return e(t, n);
    hs = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (hs = !1, (bl !== null || Sl !== null) && (ui(), bl && (t = bl, e = Sl, Sl = bl = null, Nu(t), e)))
        for (t = 0; t < e.length; t++) Nu(e[t]);
    }
  }
  function ha(e, t) {
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
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gs = !1;
  if (Ft)
    try {
      var ga = {};
      Object.defineProperty(ga, "passive", {
        get: function() {
          gs = !0;
        }
      }), window.addEventListener("test", ga, ga), window.removeEventListener("test", ga, ga);
    } catch {
      gs = !1;
    }
  var pn = null, ps = null, Nr = null;
  function Tu() {
    if (Nr) return Nr;
    var e, t = ps, n = t.length, l, a = "value" in pn ? pn.value : pn.textContent, r = a.length;
    for (e = 0; e < n && t[e] === a[e]; e++) ;
    var d = n - e;
    for (l = 1; l <= d && t[n - l] === a[r - l]; l++) ;
    return Nr = a.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Er(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Tr() {
    return !0;
  }
  function _u() {
    return !1;
  }
  function ct(e) {
    function t(n, l, a, r, d) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = r, this.target = d, this.currentTarget = null;
      for (var m in e)
        e.hasOwnProperty(m) && (n = e[m], this[m] = n ? n(r) : r[m]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Tr : _u, this.isPropagationStopped = _u, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Tr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Tr);
      },
      persist: function() {
      },
      isPersistent: Tr
    }), t;
  }
  var Xn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _r = ct(Xn), pa = b({}, Xn, { view: 0, detail: 0 }), qm = ct(pa), xs, ys, xa, zr = b({}, pa, {
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
    getModifierState: bs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== xa && (xa && e.type === "mousemove" ? (xs = e.screenX - xa.screenX, ys = e.screenY - xa.screenY) : ys = xs = 0, xa = e), xs);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ys;
    }
  }), zu = ct(zr), Ym = b({}, zr, { dataTransfer: 0 }), Gm = ct(Ym), Vm = b({}, pa, { relatedTarget: 0 }), vs = ct(Vm), Qm = b({}, Xn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xm = ct(Qm), $m = b({}, Xn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Zm = ct($m), Km = b({}, Xn, { data: 0 }), Au = ct(Km), Jm = {
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
  }, Fm = {
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
  }, Wm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Im(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Wm[e]) ? !!t[e] : !1;
  }
  function bs() {
    return Im;
  }
  var Pm = b({}, pa, {
    key: function(e) {
      if (e.key) {
        var t = Jm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Er(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fm[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bs,
    charCode: function(e) {
      return e.type === "keypress" ? Er(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Er(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), e2 = ct(Pm), t2 = b({}, zr, {
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
  }), wu = ct(t2), n2 = b({}, pa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bs
  }), l2 = ct(n2), a2 = b({}, Xn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), r2 = ct(a2), i2 = b({}, zr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), s2 = ct(i2), o2 = b({}, Xn, {
    newState: 0,
    oldState: 0
  }), c2 = ct(o2), u2 = [9, 13, 27, 32], Ss = Ft && "CompositionEvent" in window, ya = null;
  Ft && "documentMode" in document && (ya = document.documentMode);
  var d2 = Ft && "TextEvent" in window && !ya, ku = Ft && (!Ss || ya && 8 < ya && 11 >= ya), Mu = " ", Ou = !1;
  function Ru(e, t) {
    switch (e) {
      case "keyup":
        return u2.indexOf(t.keyCode) !== -1;
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
  function Du(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var jl = !1;
  function f2(e, t) {
    switch (e) {
      case "compositionend":
        return Du(t);
      case "keypress":
        return t.which !== 32 ? null : (Ou = !0, Mu);
      case "textInput":
        return e = t.data, e === Mu && Ou ? null : e;
      default:
        return null;
    }
  }
  function m2(e, t) {
    if (jl)
      return e === "compositionend" || !Ss && Ru(e, t) ? (e = Tu(), Nr = ps = pn = null, jl = !1, e) : null;
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
        return ku && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var h2 = {
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
  function Uu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!h2[e.type] : t === "textarea";
  }
  function Bu(e, t, n, l) {
    bl ? Sl ? Sl.push(l) : Sl = [l] : bl = l, t = xi(t, "onChange"), 0 < t.length && (n = new _r(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var va = null, ba = null;
  function g2(e) {
    b0(e, 0);
  }
  function Ar(e) {
    var t = ma(e);
    if (yu(t)) return e;
  }
  function Hu(e, t) {
    if (e === "change") return t;
  }
  var Lu = !1;
  if (Ft) {
    var js;
    if (Ft) {
      var Cs = "oninput" in document;
      if (!Cs) {
        var qu = document.createElement("div");
        qu.setAttribute("oninput", "return;"), Cs = typeof qu.oninput == "function";
      }
      js = Cs;
    } else js = !1;
    Lu = js && (!document.documentMode || 9 < document.documentMode);
  }
  function Yu() {
    va && (va.detachEvent("onpropertychange", Gu), ba = va = null);
  }
  function Gu(e) {
    if (e.propertyName === "value" && Ar(ba)) {
      var t = [];
      Bu(
        t,
        ba,
        e,
        ms(e)
      ), Eu(g2, t);
    }
  }
  function p2(e, t, n) {
    e === "focusin" ? (Yu(), va = t, ba = n, va.attachEvent("onpropertychange", Gu)) : e === "focusout" && Yu();
  }
  function x2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ar(ba);
  }
  function y2(e, t) {
    if (e === "click") return Ar(t);
  }
  function v2(e, t) {
    if (e === "input" || e === "change")
      return Ar(t);
  }
  function b2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var vt = typeof Object.is == "function" ? Object.is : b2;
  function Sa(e, t) {
    if (vt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!es.call(t, a) || !vt(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  function Vu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Qu(e, t) {
    var n = Vu(e);
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
      n = Vu(n);
    }
  }
  function Xu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Xu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function $u(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = jr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = jr(e.document);
    }
    return t;
  }
  function Ns(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var S2 = Ft && "documentMode" in document && 11 >= document.documentMode, Cl = null, Es = null, ja = null, Ts = !1;
  function Zu(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ts || Cl == null || Cl !== jr(l) || (l = Cl, "selectionStart" in l && Ns(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ja && Sa(ja, l) || (ja = l, l = xi(Es, "onSelect"), 0 < l.length && (t = new _r(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = Cl)));
  }
  function $n(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Nl = {
    animationend: $n("Animation", "AnimationEnd"),
    animationiteration: $n("Animation", "AnimationIteration"),
    animationstart: $n("Animation", "AnimationStart"),
    transitionrun: $n("Transition", "TransitionRun"),
    transitionstart: $n("Transition", "TransitionStart"),
    transitioncancel: $n("Transition", "TransitionCancel"),
    transitionend: $n("Transition", "TransitionEnd")
  }, _s = {}, Ku = {};
  Ft && (Ku = document.createElement("div").style, "AnimationEvent" in window || (delete Nl.animationend.animation, delete Nl.animationiteration.animation, delete Nl.animationstart.animation), "TransitionEvent" in window || delete Nl.transitionend.transition);
  function Zn(e) {
    if (_s[e]) return _s[e];
    if (!Nl[e]) return e;
    var t = Nl[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Ku)
        return _s[e] = t[n];
    return e;
  }
  var Ju = Zn("animationend"), Fu = Zn("animationiteration"), Wu = Zn("animationstart"), j2 = Zn("transitionrun"), C2 = Zn("transitionstart"), N2 = Zn("transitioncancel"), Iu = Zn("transitionend"), Pu = /* @__PURE__ */ new Map(), zs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  zs.push("scrollEnd");
  function Ht(e, t) {
    Pu.set(e, t), Qn(t, [e]);
  }
  var wr = typeof reportError == "function" ? reportError : function(e) {
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
  }, At = [], El = 0, As = 0;
  function kr() {
    for (var e = El, t = As = El = 0; t < e; ) {
      var n = At[t];
      At[t++] = null;
      var l = At[t];
      At[t++] = null;
      var a = At[t];
      At[t++] = null;
      var r = At[t];
      if (At[t++] = null, l !== null && a !== null) {
        var d = l.pending;
        d === null ? a.next = a : (a.next = d.next, d.next = a), l.pending = a;
      }
      r !== 0 && ed(n, a, r);
    }
  }
  function Mr(e, t, n, l) {
    At[El++] = e, At[El++] = t, At[El++] = n, At[El++] = l, As |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function ws(e, t, n, l) {
    return Mr(e, t, n, l), Or(e);
  }
  function Kn(e, t) {
    return Mr(e, null, null, t), Or(e);
  }
  function ed(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, r = e.return; r !== null; )
      r.childLanes |= n, l = r.alternate, l !== null && (l.childLanes |= n), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (a = !0)), e = r, r = r.return;
    return e.tag === 3 ? (r = e.stateNode, a && t !== null && (a = 31 - yt(n), e = r.hiddenUpdates, l = e[a], l === null ? e[a] = [t] : l.push(t), t.lane = n | 536870912), r) : null;
  }
  function Or(e) {
    if (50 < Qa)
      throw Qa = 0, qo = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Tl = {};
  function E2(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function bt(e, t, n, l) {
    return new E2(e, t, n, l);
  }
  function ks(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Wt(e, t) {
    var n = e.alternate;
    return n === null ? (n = bt(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function td(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Rr(e, t, n, l, a, r) {
    var d = 0;
    if (l = e, typeof e == "function") ks(e) && (d = 1);
    else if (typeof e == "string")
      d = wh(
        e,
        n,
        $.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Oe:
          return e = bt(31, n, t, a), e.elementType = Oe, e.lanes = r, e;
        case q:
          return Jn(n.children, a, r, t);
        case F:
          d = 8, a |= 24;
          break;
        case ee:
          return e = bt(12, n, t, a | 2), e.elementType = ee, e.lanes = r, e;
        case ne:
          return e = bt(13, n, t, a), e.elementType = ne, e.lanes = r, e;
        case J:
          return e = bt(19, n, t, a), e.elementType = J, e.lanes = r, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case te:
                d = 10;
                break e;
              case Y:
                d = 9;
                break e;
              case Me:
                d = 11;
                break e;
              case X:
                d = 14;
                break e;
              case be:
                d = 16, l = null;
                break e;
            }
          d = 29, n = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = bt(d, n, t, a), t.elementType = e, t.type = l, t.lanes = r, t;
  }
  function Jn(e, t, n, l) {
    return e = bt(7, e, l, t), e.lanes = n, e;
  }
  function Ms(e, t, n) {
    return e = bt(6, e, null, t), e.lanes = n, e;
  }
  function nd(e) {
    var t = bt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Os(e, t, n) {
    return t = bt(
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
  var ld = /* @__PURE__ */ new WeakMap();
  function wt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = ld.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: nu(t)
      }, ld.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: nu(t)
    };
  }
  var _l = [], zl = 0, Dr = null, Ca = 0, kt = [], Mt = 0, xn = null, Yt = 1, Gt = "";
  function It(e, t) {
    _l[zl++] = Ca, _l[zl++] = Dr, Dr = e, Ca = t;
  }
  function ad(e, t, n) {
    kt[Mt++] = Yt, kt[Mt++] = Gt, kt[Mt++] = xn, xn = e;
    var l = Yt;
    e = Gt;
    var a = 32 - yt(l) - 1;
    l &= ~(1 << a), n += 1;
    var r = 32 - yt(t) + a;
    if (30 < r) {
      var d = a - a % 5;
      r = (l & (1 << d) - 1).toString(32), l >>= d, a -= d, Yt = 1 << 32 - yt(t) + a | n << a | l, Gt = r + e;
    } else
      Yt = 1 << r | n << a | l, Gt = e;
  }
  function Rs(e) {
    e.return !== null && (It(e, 1), ad(e, 1, 0));
  }
  function Ds(e) {
    for (; e === Dr; )
      Dr = _l[--zl], _l[zl] = null, Ca = _l[--zl], _l[zl] = null;
    for (; e === xn; )
      xn = kt[--Mt], kt[Mt] = null, Gt = kt[--Mt], kt[Mt] = null, Yt = kt[--Mt], kt[Mt] = null;
  }
  function rd(e, t) {
    kt[Mt++] = Yt, kt[Mt++] = Gt, kt[Mt++] = xn, Yt = t.id, Gt = t.overflow, xn = e;
  }
  var Pe = null, De = null, pe = !1, yn = null, Ot = !1, Us = Error(c(519));
  function vn(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Na(wt(t, e)), Us;
  }
  function id(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[Ie] = e, t[ot] = l, n) {
      case "dialog":
        fe("cancel", t), fe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        fe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < $a.length; n++)
          fe($a[n], t);
        break;
      case "source":
        fe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        fe("error", t), fe("load", t);
        break;
      case "details":
        fe("toggle", t);
        break;
      case "input":
        fe("invalid", t), vu(
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
        fe("invalid", t);
        break;
      case "textarea":
        fe("invalid", t), Su(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || N0(t.textContent, n) ? (l.popover != null && (fe("beforetoggle", t), fe("toggle", t)), l.onScroll != null && fe("scroll", t), l.onScrollEnd != null && fe("scrollend", t), l.onClick != null && (t.onclick = Jt), t = !0) : t = !1, t || vn(e, !0);
  }
  function sd(e) {
    for (Pe = e.return; Pe; )
      switch (Pe.tag) {
        case 5:
        case 31:
        case 13:
          Ot = !1;
          return;
        case 27:
        case 3:
          Ot = !0;
          return;
        default:
          Pe = Pe.return;
      }
  }
  function Al(e) {
    if (e !== Pe) return !1;
    if (!pe) return sd(e), pe = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || tc(e.type, e.memoizedProps)), n = !n), n && De && vn(e), sd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      De = O0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      De = O0(e);
    } else
      t === 27 ? (t = De, On(e.type) ? (e = ic, ic = null, De = e) : De = t) : De = Pe ? Dt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Fn() {
    De = Pe = null, pe = !1;
  }
  function Bs() {
    var e = yn;
    return e !== null && (mt === null ? mt = e : mt.push.apply(
      mt,
      e
    ), yn = null), e;
  }
  function Na(e) {
    yn === null ? yn = [e] : yn.push(e);
  }
  var Hs = j(null), Wn = null, Pt = null;
  function bn(e, t, n) {
    G(Hs, t._currentValue), t._currentValue = n;
  }
  function en(e) {
    e._currentValue = Hs.current, R(Hs);
  }
  function Ls(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function qs(e, t, n, l) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = a.dependencies;
      if (r !== null) {
        var d = a.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var m = r;
          r = a;
          for (var x = 0; x < t.length; x++)
            if (m.context === t[x]) {
              r.lanes |= n, m = r.alternate, m !== null && (m.lanes |= n), Ls(
                r.return,
                n,
                e
              ), l || (d = null);
              break e;
            }
          r = m.next;
        }
      } else if (a.tag === 18) {
        if (d = a.return, d === null) throw Error(c(341));
        d.lanes |= n, r = d.alternate, r !== null && (r.lanes |= n), Ls(d, n, e), d = null;
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
  function wl(e, t, n, l) {
    e = null;
    for (var a = t, r = !1; a !== null; ) {
      if (!r) {
        if ((a.flags & 524288) !== 0) r = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var d = a.alternate;
        if (d === null) throw Error(c(387));
        if (d = d.memoizedProps, d !== null) {
          var m = a.type;
          vt(a.pendingProps.value, d.value) || (e !== null ? e.push(m) : e = [m]);
        }
      } else if (a === Ee.current) {
        if (d = a.alternate, d === null) throw Error(c(387));
        d.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e !== null ? e.push(Wa) : e = [Wa]);
      }
      a = a.return;
    }
    e !== null && qs(
      t,
      e,
      n,
      l
    ), t.flags |= 262144;
  }
  function Ur(e) {
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
  function In(e) {
    Wn = e, Pt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function et(e) {
    return od(Wn, e);
  }
  function Br(e, t) {
    return Wn === null && In(e), od(e, t);
  }
  function od(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Pt === null) {
      if (e === null) throw Error(c(308));
      Pt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Pt = Pt.next = t;
    return n;
  }
  var T2 = typeof AbortController < "u" ? AbortController : function() {
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
  }, _2 = u.unstable_scheduleCallback, z2 = u.unstable_NormalPriority, Xe = {
    $$typeof: te,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ys() {
    return {
      controller: new T2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ea(e) {
    e.refCount--, e.refCount === 0 && _2(z2, function() {
      e.controller.abort();
    });
  }
  var Ta = null, Gs = 0, kl = 0, Ml = null;
  function A2(e, t) {
    if (Ta === null) {
      var n = Ta = [];
      Gs = 0, kl = $o(), Ml = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return Gs++, t.then(cd, cd), t;
  }
  function cd() {
    if (--Gs === 0 && Ta !== null) {
      Ml !== null && (Ml.status = "fulfilled");
      var e = Ta;
      Ta = null, kl = 0, Ml = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function w2(e, t) {
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
  var ud = C.S;
  C.S = function(e, t) {
    Kf = pt(), typeof t == "object" && t !== null && typeof t.then == "function" && A2(e, t), ud !== null && ud(e, t);
  };
  var Pn = j(null);
  function Vs() {
    var e = Pn.current;
    return e !== null ? e : ke.pooledCache;
  }
  function Hr(e, t) {
    t === null ? G(Pn, Pn.current) : G(Pn, t.pool);
  }
  function dd() {
    var e = Vs();
    return e === null ? null : { parent: Xe._currentValue, pool: e };
  }
  var Ol = Error(c(460)), Qs = Error(c(474)), Lr = Error(c(542)), qr = { then: function() {
  } };
  function fd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function md(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Jt, Jt), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, gd(e), e;
      default:
        if (typeof t.status == "string") t.then(Jt, Jt);
        else {
          if (e = ke, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, gd(e), e;
        }
        throw tl = t, Ol;
    }
  }
  function el(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (tl = n, Ol) : n;
    }
  }
  var tl = null;
  function hd() {
    if (tl === null) throw Error(c(459));
    var e = tl;
    return tl = null, e;
  }
  function gd(e) {
    if (e === Ol || e === Lr)
      throw Error(c(483));
  }
  var Rl = null, _a = 0;
  function Yr(e) {
    var t = _a;
    return _a += 1, Rl === null && (Rl = []), md(Rl, e, t);
  }
  function za(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Gr(e, t) {
    throw t.$$typeof === D ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function pd(e) {
    function t(N, S) {
      if (e) {
        var T = N.deletions;
        T === null ? (N.deletions = [S], N.flags |= 16) : T.push(S);
      }
    }
    function n(N, S) {
      if (!e) return null;
      for (; S !== null; )
        t(N, S), S = S.sibling;
      return null;
    }
    function l(N) {
      for (var S = /* @__PURE__ */ new Map(); N !== null; )
        N.key !== null ? S.set(N.key, N) : S.set(N.index, N), N = N.sibling;
      return S;
    }
    function a(N, S) {
      return N = Wt(N, S), N.index = 0, N.sibling = null, N;
    }
    function r(N, S, T) {
      return N.index = T, e ? (T = N.alternate, T !== null ? (T = T.index, T < S ? (N.flags |= 67108866, S) : T) : (N.flags |= 67108866, S)) : (N.flags |= 1048576, S);
    }
    function d(N) {
      return e && N.alternate === null && (N.flags |= 67108866), N;
    }
    function m(N, S, T, k) {
      return S === null || S.tag !== 6 ? (S = Ms(T, N.mode, k), S.return = N, S) : (S = a(S, T), S.return = N, S);
    }
    function x(N, S, T, k) {
      var W = T.type;
      return W === q ? w(
        N,
        S,
        T.props.children,
        k,
        T.key
      ) : S !== null && (S.elementType === W || typeof W == "object" && W !== null && W.$$typeof === be && el(W) === S.type) ? (S = a(S, T.props), za(S, T), S.return = N, S) : (S = Rr(
        T.type,
        T.key,
        T.props,
        null,
        N.mode,
        k
      ), za(S, T), S.return = N, S);
    }
    function _(N, S, T, k) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== T.containerInfo || S.stateNode.implementation !== T.implementation ? (S = Os(T, N.mode, k), S.return = N, S) : (S = a(S, T.children || []), S.return = N, S);
    }
    function w(N, S, T, k, W) {
      return S === null || S.tag !== 7 ? (S = Jn(
        T,
        N.mode,
        k,
        W
      ), S.return = N, S) : (S = a(S, T), S.return = N, S);
    }
    function O(N, S, T) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return S = Ms(
          "" + S,
          N.mode,
          T
        ), S.return = N, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case H:
            return T = Rr(
              S.type,
              S.key,
              S.props,
              null,
              N.mode,
              T
            ), za(T, S), T.return = N, T;
          case B:
            return S = Os(
              S,
              N.mode,
              T
            ), S.return = N, S;
          case be:
            return S = el(S), O(N, S, T);
        }
        if (L(S) || le(S))
          return S = Jn(
            S,
            N.mode,
            T,
            null
          ), S.return = N, S;
        if (typeof S.then == "function")
          return O(N, Yr(S), T);
        if (S.$$typeof === te)
          return O(
            N,
            Br(N, S),
            T
          );
        Gr(N, S);
      }
      return null;
    }
    function z(N, S, T, k) {
      var W = S !== null ? S.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return W !== null ? null : m(N, S, "" + T, k);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case H:
            return T.key === W ? x(N, S, T, k) : null;
          case B:
            return T.key === W ? _(N, S, T, k) : null;
          case be:
            return T = el(T), z(N, S, T, k);
        }
        if (L(T) || le(T))
          return W !== null ? null : w(N, S, T, k, null);
        if (typeof T.then == "function")
          return z(
            N,
            S,
            Yr(T),
            k
          );
        if (T.$$typeof === te)
          return z(
            N,
            S,
            Br(N, T),
            k
          );
        Gr(N, T);
      }
      return null;
    }
    function A(N, S, T, k, W) {
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return N = N.get(T) || null, m(S, N, "" + k, W);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case H:
            return N = N.get(
              k.key === null ? T : k.key
            ) || null, x(S, N, k, W);
          case B:
            return N = N.get(
              k.key === null ? T : k.key
            ) || null, _(S, N, k, W);
          case be:
            return k = el(k), A(
              N,
              S,
              T,
              k,
              W
            );
        }
        if (L(k) || le(k))
          return N = N.get(T) || null, w(S, N, k, W, null);
        if (typeof k.then == "function")
          return A(
            N,
            S,
            T,
            Yr(k),
            W
          );
        if (k.$$typeof === te)
          return A(
            N,
            S,
            T,
            Br(S, k),
            W
          );
        Gr(S, k);
      }
      return null;
    }
    function Q(N, S, T, k) {
      for (var W = null, xe = null, Z = S, oe = S = 0, he = null; Z !== null && oe < T.length; oe++) {
        Z.index > oe ? (he = Z, Z = null) : he = Z.sibling;
        var ye = z(
          N,
          Z,
          T[oe],
          k
        );
        if (ye === null) {
          Z === null && (Z = he);
          break;
        }
        e && Z && ye.alternate === null && t(N, Z), S = r(ye, S, oe), xe === null ? W = ye : xe.sibling = ye, xe = ye, Z = he;
      }
      if (oe === T.length)
        return n(N, Z), pe && It(N, oe), W;
      if (Z === null) {
        for (; oe < T.length; oe++)
          Z = O(N, T[oe], k), Z !== null && (S = r(
            Z,
            S,
            oe
          ), xe === null ? W = Z : xe.sibling = Z, xe = Z);
        return pe && It(N, oe), W;
      }
      for (Z = l(Z); oe < T.length; oe++)
        he = A(
          Z,
          N,
          oe,
          T[oe],
          k
        ), he !== null && (e && he.alternate !== null && Z.delete(
          he.key === null ? oe : he.key
        ), S = r(
          he,
          S,
          oe
        ), xe === null ? W = he : xe.sibling = he, xe = he);
      return e && Z.forEach(function(Hn) {
        return t(N, Hn);
      }), pe && It(N, oe), W;
    }
    function P(N, S, T, k) {
      if (T == null) throw Error(c(151));
      for (var W = null, xe = null, Z = S, oe = S = 0, he = null, ye = T.next(); Z !== null && !ye.done; oe++, ye = T.next()) {
        Z.index > oe ? (he = Z, Z = null) : he = Z.sibling;
        var Hn = z(N, Z, ye.value, k);
        if (Hn === null) {
          Z === null && (Z = he);
          break;
        }
        e && Z && Hn.alternate === null && t(N, Z), S = r(Hn, S, oe), xe === null ? W = Hn : xe.sibling = Hn, xe = Hn, Z = he;
      }
      if (ye.done)
        return n(N, Z), pe && It(N, oe), W;
      if (Z === null) {
        for (; !ye.done; oe++, ye = T.next())
          ye = O(N, ye.value, k), ye !== null && (S = r(ye, S, oe), xe === null ? W = ye : xe.sibling = ye, xe = ye);
        return pe && It(N, oe), W;
      }
      for (Z = l(Z); !ye.done; oe++, ye = T.next())
        ye = A(Z, N, oe, ye.value, k), ye !== null && (e && ye.alternate !== null && Z.delete(ye.key === null ? oe : ye.key), S = r(ye, S, oe), xe === null ? W = ye : xe.sibling = ye, xe = ye);
      return e && Z.forEach(function(Yh) {
        return t(N, Yh);
      }), pe && It(N, oe), W;
    }
    function we(N, S, T, k) {
      if (typeof T == "object" && T !== null && T.type === q && T.key === null && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case H:
            e: {
              for (var W = T.key; S !== null; ) {
                if (S.key === W) {
                  if (W = T.type, W === q) {
                    if (S.tag === 7) {
                      n(
                        N,
                        S.sibling
                      ), k = a(
                        S,
                        T.props.children
                      ), k.return = N, N = k;
                      break e;
                    }
                  } else if (S.elementType === W || typeof W == "object" && W !== null && W.$$typeof === be && el(W) === S.type) {
                    n(
                      N,
                      S.sibling
                    ), k = a(S, T.props), za(k, T), k.return = N, N = k;
                    break e;
                  }
                  n(N, S);
                  break;
                } else t(N, S);
                S = S.sibling;
              }
              T.type === q ? (k = Jn(
                T.props.children,
                N.mode,
                k,
                T.key
              ), k.return = N, N = k) : (k = Rr(
                T.type,
                T.key,
                T.props,
                null,
                N.mode,
                k
              ), za(k, T), k.return = N, N = k);
            }
            return d(N);
          case B:
            e: {
              for (W = T.key; S !== null; ) {
                if (S.key === W)
                  if (S.tag === 4 && S.stateNode.containerInfo === T.containerInfo && S.stateNode.implementation === T.implementation) {
                    n(
                      N,
                      S.sibling
                    ), k = a(S, T.children || []), k.return = N, N = k;
                    break e;
                  } else {
                    n(N, S);
                    break;
                  }
                else t(N, S);
                S = S.sibling;
              }
              k = Os(T, N.mode, k), k.return = N, N = k;
            }
            return d(N);
          case be:
            return T = el(T), we(
              N,
              S,
              T,
              k
            );
        }
        if (L(T))
          return Q(
            N,
            S,
            T,
            k
          );
        if (le(T)) {
          if (W = le(T), typeof W != "function") throw Error(c(150));
          return T = W.call(T), P(
            N,
            S,
            T,
            k
          );
        }
        if (typeof T.then == "function")
          return we(
            N,
            S,
            Yr(T),
            k
          );
        if (T.$$typeof === te)
          return we(
            N,
            S,
            Br(N, T),
            k
          );
        Gr(N, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, S !== null && S.tag === 6 ? (n(N, S.sibling), k = a(S, T), k.return = N, N = k) : (n(N, S), k = Ms(T, N.mode, k), k.return = N, N = k), d(N)) : n(N, S);
    }
    return function(N, S, T, k) {
      try {
        _a = 0;
        var W = we(
          N,
          S,
          T,
          k
        );
        return Rl = null, W;
      } catch (Z) {
        if (Z === Ol || Z === Lr) throw Z;
        var xe = bt(29, Z, null, N.mode);
        return xe.lanes = k, xe.return = N, xe;
      } finally {
      }
    };
  }
  var nl = pd(!0), xd = pd(!1), Sn = !1;
  function Xs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function $s(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function jn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Cn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ce & 2) !== 0) {
      var a = l.pending;
      return a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t, t = Or(e), ed(e, null, n), t;
    }
    return Mr(e, l, t, n), Or(e);
  }
  function Aa(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, ou(e, n);
    }
  }
  function Zs(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var a = null, r = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          r === null ? a = r = d : r = r.next = d, n = n.next;
        } while (n !== null);
        r === null ? a = r = t : r = r.next = t;
      } else a = r = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: r,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Ks = !1;
  function wa() {
    if (Ks) {
      var e = Ml;
      if (e !== null) throw e;
    }
  }
  function ka(e, t, n, l) {
    Ks = !1;
    var a = e.updateQueue;
    Sn = !1;
    var r = a.firstBaseUpdate, d = a.lastBaseUpdate, m = a.shared.pending;
    if (m !== null) {
      a.shared.pending = null;
      var x = m, _ = x.next;
      x.next = null, d === null ? r = _ : d.next = _, d = x;
      var w = e.alternate;
      w !== null && (w = w.updateQueue, m = w.lastBaseUpdate, m !== d && (m === null ? w.firstBaseUpdate = _ : m.next = _, w.lastBaseUpdate = x));
    }
    if (r !== null) {
      var O = a.baseState;
      d = 0, w = _ = x = null, m = r;
      do {
        var z = m.lane & -536870913, A = z !== m.lane;
        if (A ? (me & z) === z : (l & z) === z) {
          z !== 0 && z === kl && (Ks = !0), w !== null && (w = w.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var Q = e, P = m;
            z = t;
            var we = n;
            switch (P.tag) {
              case 1:
                if (Q = P.payload, typeof Q == "function") {
                  O = Q.call(we, O, z);
                  break e;
                }
                O = Q;
                break e;
              case 3:
                Q.flags = Q.flags & -65537 | 128;
              case 0:
                if (Q = P.payload, z = typeof Q == "function" ? Q.call(we, O, z) : Q, z == null) break e;
                O = b({}, O, z);
                break e;
              case 2:
                Sn = !0;
            }
          }
          z = m.callback, z !== null && (e.flags |= 64, A && (e.flags |= 8192), A = a.callbacks, A === null ? a.callbacks = [z] : A.push(z));
        } else
          A = {
            lane: z,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, w === null ? (_ = w = A, x = O) : w = w.next = A, d |= z;
        if (m = m.next, m === null) {
          if (m = a.shared.pending, m === null)
            break;
          A = m, m = A.next, A.next = null, a.lastBaseUpdate = A, a.shared.pending = null;
        }
      } while (!0);
      w === null && (x = O), a.baseState = x, a.firstBaseUpdate = _, a.lastBaseUpdate = w, r === null && (a.shared.lanes = 0), zn |= d, e.lanes = d, e.memoizedState = O;
    }
  }
  function yd(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function vd(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        yd(n[e], t);
  }
  var Dl = j(null), Vr = j(0);
  function bd(e, t) {
    e = un, G(Vr, e), G(Dl, t), un = e | t.baseLanes;
  }
  function Js() {
    G(Vr, un), G(Dl, Dl.current);
  }
  function Fs() {
    un = Vr.current, R(Dl), R(Vr);
  }
  var St = j(null), Rt = null;
  function Nn(e) {
    var t = e.alternate;
    G(Ve, Ve.current & 1), G(St, e), Rt === null && (t === null || Dl.current !== null || t.memoizedState !== null) && (Rt = e);
  }
  function Ws(e) {
    G(Ve, Ve.current), G(St, e), Rt === null && (Rt = e);
  }
  function Sd(e) {
    e.tag === 22 ? (G(Ve, Ve.current), G(St, e), Rt === null && (Rt = e)) : En();
  }
  function En() {
    G(Ve, Ve.current), G(St, St.current);
  }
  function jt(e) {
    R(St), Rt === e && (Rt = null), R(Ve);
  }
  var Ve = j(0);
  function Qr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || ac(n) || rc(n)))
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
  var tn = 0, se = null, ze = null, $e = null, Xr = !1, Ul = !1, ll = !1, $r = 0, Ma = 0, Bl = null, k2 = 0;
  function qe() {
    throw Error(c(321));
  }
  function Is(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!vt(e[n], t[n])) return !1;
    return !0;
  }
  function Ps(e, t, n, l, a, r) {
    return tn = r, se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, C.H = e === null || e.memoizedState === null ? af : go, ll = !1, r = n(l, a), ll = !1, Ul && (r = Cd(
      t,
      n,
      l,
      a
    )), jd(e), r;
  }
  function jd(e) {
    C.H = Da;
    var t = ze !== null && ze.next !== null;
    if (tn = 0, $e = ze = se = null, Xr = !1, Ma = 0, Bl = null, t) throw Error(c(300));
    e === null || Ze || (e = e.dependencies, e !== null && Ur(e) && (Ze = !0));
  }
  function Cd(e, t, n, l) {
    se = e;
    var a = 0;
    do {
      if (Ul && (Bl = null), Ma = 0, Ul = !1, 25 <= a) throw Error(c(301));
      if (a += 1, $e = ze = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      C.H = rf, r = t(n, l);
    } while (Ul);
    return r;
  }
  function M2() {
    var e = C.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Oa(t) : t, e = e.useState()[0], (ze !== null ? ze.memoizedState : null) !== e && (se.flags |= 1024), t;
  }
  function eo() {
    var e = $r !== 0;
    return $r = 0, e;
  }
  function to(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function no(e) {
    if (Xr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Xr = !1;
    }
    tn = 0, $e = ze = se = null, Ul = !1, Ma = $r = 0, Bl = null;
  }
  function st() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $e === null ? se.memoizedState = $e = e : $e = $e.next = e, $e;
  }
  function Qe() {
    if (ze === null) {
      var e = se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ze.next;
    var t = $e === null ? se.memoizedState : $e.next;
    if (t !== null)
      $e = t, ze = e;
    else {
      if (e === null)
        throw se.alternate === null ? Error(c(467)) : Error(c(310));
      ze = e, e = {
        memoizedState: ze.memoizedState,
        baseState: ze.baseState,
        baseQueue: ze.baseQueue,
        queue: ze.queue,
        next: null
      }, $e === null ? se.memoizedState = $e = e : $e = $e.next = e;
    }
    return $e;
  }
  function Zr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Oa(e) {
    var t = Ma;
    return Ma += 1, Bl === null && (Bl = []), e = md(Bl, e, t), t = se, ($e === null ? t.memoizedState : $e.next) === null && (t = t.alternate, C.H = t === null || t.memoizedState === null ? af : go), e;
  }
  function Kr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Oa(e);
      if (e.$$typeof === te) return et(e);
    }
    throw Error(c(438, String(e)));
  }
  function lo(e) {
    var t = null, n = se.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = se.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Zr(), se.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = Se;
    return t.index++, n;
  }
  function nn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Jr(e) {
    var t = Qe();
    return ao(t, ze, e);
  }
  function ao(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var a = e.baseQueue, r = l.pending;
    if (r !== null) {
      if (a !== null) {
        var d = a.next;
        a.next = r.next, r.next = d;
      }
      t.baseQueue = a = r, l.pending = null;
    }
    if (r = e.baseState, a === null) e.memoizedState = r;
    else {
      t = a.next;
      var m = d = null, x = null, _ = t, w = !1;
      do {
        var O = _.lane & -536870913;
        if (O !== _.lane ? (me & O) === O : (tn & O) === O) {
          var z = _.revertLane;
          if (z === 0)
            x !== null && (x = x.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), O === kl && (w = !0);
          else if ((tn & z) === z) {
            _ = _.next, z === kl && (w = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: _.revertLane,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }, x === null ? (m = x = O, d = r) : x = x.next = O, se.lanes |= z, zn |= z;
          O = _.action, ll && n(r, O), r = _.hasEagerState ? _.eagerState : n(r, O);
        } else
          z = {
            lane: O,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, x === null ? (m = x = z, d = r) : x = x.next = z, se.lanes |= O, zn |= O;
        _ = _.next;
      } while (_ !== null && _ !== t);
      if (x === null ? d = r : x.next = m, !vt(r, e.memoizedState) && (Ze = !0, w && (n = Ml, n !== null)))
        throw n;
      e.memoizedState = r, e.baseState = d, e.baseQueue = x, l.lastRenderedState = r;
    }
    return a === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function ro(e) {
    var t = Qe(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, a = n.pending, r = t.memoizedState;
    if (a !== null) {
      n.pending = null;
      var d = a = a.next;
      do
        r = e(r, d.action), d = d.next;
      while (d !== a);
      vt(r, t.memoizedState) || (Ze = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), n.lastRenderedState = r;
    }
    return [r, l];
  }
  function Nd(e, t, n) {
    var l = se, a = Qe(), r = pe;
    if (r) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var d = !vt(
      (ze || a).memoizedState,
      n
    );
    if (d && (a.memoizedState = n, Ze = !0), a = a.queue, oo(_d.bind(null, l, a, e), [
      e
    ]), a.getSnapshot !== t || d || $e !== null && $e.memoizedState.tag & 1) {
      if (l.flags |= 2048, Hl(
        9,
        { destroy: void 0 },
        Td.bind(
          null,
          l,
          a,
          n,
          t
        ),
        null
      ), ke === null) throw Error(c(349));
      r || (tn & 127) !== 0 || Ed(l, t, n);
    }
    return n;
  }
  function Ed(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = se.updateQueue, t === null ? (t = Zr(), se.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Td(e, t, n, l) {
    t.value = n, t.getSnapshot = l, zd(t) && Ad(e);
  }
  function _d(e, t, n) {
    return n(function() {
      zd(t) && Ad(e);
    });
  }
  function zd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !vt(e, n);
    } catch {
      return !0;
    }
  }
  function Ad(e) {
    var t = Kn(e, 2);
    t !== null && ht(t, e, 2);
  }
  function io(e) {
    var t = st();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ll) {
        hn(!0);
        try {
          n();
        } finally {
          hn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nn,
      lastRenderedState: e
    }, t;
  }
  function wd(e, t, n, l) {
    return e.baseState = n, ao(
      e,
      ze,
      typeof l == "function" ? l : nn
    );
  }
  function O2(e, t, n, l, a) {
    if (Ir(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var r = {
        payload: a,
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
      C.T !== null ? n(!0) : r.isTransition = !1, l(r), n = t.pending, n === null ? (r.next = t.pending = r, kd(t, r)) : (r.next = n.next, t.pending = n.next = r);
    }
  }
  function kd(e, t) {
    var n = t.action, l = t.payload, a = e.state;
    if (t.isTransition) {
      var r = C.T, d = {};
      C.T = d;
      try {
        var m = n(a, l), x = C.S;
        x !== null && x(d, m), Md(e, t, m);
      } catch (_) {
        so(e, t, _);
      } finally {
        r !== null && d.types !== null && (r.types = d.types), C.T = r;
      }
    } else
      try {
        r = n(a, l), Md(e, t, r);
      } catch (_) {
        so(e, t, _);
      }
  }
  function Md(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Od(e, t, l);
      },
      function(l) {
        return so(e, t, l);
      }
    ) : Od(e, t, n);
  }
  function Od(e, t, n) {
    t.status = "fulfilled", t.value = n, Rd(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, kd(e, n)));
  }
  function so(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, Rd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Rd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Dd(e, t) {
    return t;
  }
  function Ud(e, t) {
    if (pe) {
      var n = ke.formState;
      if (n !== null) {
        e: {
          var l = se;
          if (pe) {
            if (De) {
              t: {
                for (var a = De, r = Ot; a.nodeType !== 8; ) {
                  if (!r) {
                    a = null;
                    break t;
                  }
                  if (a = Dt(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break t;
                  }
                }
                r = a.data, a = r === "F!" || r === "F" ? a : null;
              }
              if (a) {
                De = Dt(
                  a.nextSibling
                ), l = a.data === "F!";
                break e;
              }
            }
            vn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = st(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dd,
      lastRenderedState: t
    }, n.queue = l, n = tf.bind(
      null,
      se,
      l
    ), l.dispatch = n, l = io(!1), r = ho.bind(
      null,
      se,
      !1,
      l.queue
    ), l = st(), a = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = a, n = O2.bind(
      null,
      se,
      a,
      r,
      n
    ), a.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Bd(e) {
    var t = Qe();
    return Hd(t, ze, e);
  }
  function Hd(e, t, n) {
    if (t = ao(
      e,
      t,
      Dd
    )[0], e = Jr(nn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Oa(t);
      } catch (d) {
        throw d === Ol ? Lr : d;
      }
    else l = t;
    t = Qe();
    var a = t.queue, r = a.dispatch;
    return n !== t.memoizedState && (se.flags |= 2048, Hl(
      9,
      { destroy: void 0 },
      R2.bind(null, a, n),
      null
    )), [l, r, e];
  }
  function R2(e, t) {
    e.action = t;
  }
  function Ld(e) {
    var t = Qe(), n = ze;
    if (n !== null)
      return Hd(t, n, e);
    Qe(), t = t.memoizedState, n = Qe();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Hl(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = se.updateQueue, t === null && (t = Zr(), se.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function qd() {
    return Qe().memoizedState;
  }
  function Fr(e, t, n, l) {
    var a = st();
    se.flags |= e, a.memoizedState = Hl(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Wr(e, t, n, l) {
    var a = Qe();
    l = l === void 0 ? null : l;
    var r = a.memoizedState.inst;
    ze !== null && l !== null && Is(l, ze.memoizedState.deps) ? a.memoizedState = Hl(t, r, n, l) : (se.flags |= e, a.memoizedState = Hl(
      1 | t,
      r,
      n,
      l
    ));
  }
  function Yd(e, t) {
    Fr(8390656, 8, e, t);
  }
  function oo(e, t) {
    Wr(2048, 8, e, t);
  }
  function D2(e) {
    se.flags |= 4;
    var t = se.updateQueue;
    if (t === null)
      t = Zr(), se.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Gd(e) {
    var t = Qe().memoizedState;
    return D2({ ref: t, nextImpl: e }), function() {
      if ((Ce & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Vd(e, t) {
    return Wr(4, 2, e, t);
  }
  function Qd(e, t) {
    return Wr(4, 4, e, t);
  }
  function Xd(e, t) {
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
  function $d(e, t, n) {
    n = n != null ? n.concat([e]) : null, Wr(4, 4, Xd.bind(null, t, e), n);
  }
  function co() {
  }
  function Zd(e, t) {
    var n = Qe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && Is(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function Kd(e, t) {
    var n = Qe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && Is(t, l[1]))
      return l[0];
    if (l = e(), ll) {
      hn(!0);
      try {
        e();
      } finally {
        hn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function uo(e, t, n) {
    return n === void 0 || (tn & 1073741824) !== 0 && (me & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = Ff(), se.lanes |= e, zn |= e, n);
  }
  function Jd(e, t, n, l) {
    return vt(n, t) ? n : Dl.current !== null ? (e = uo(e, n, l), vt(e, t) || (Ze = !0), e) : (tn & 42) === 0 || (tn & 1073741824) !== 0 && (me & 261930) === 0 ? (Ze = !0, e.memoizedState = n) : (e = Ff(), se.lanes |= e, zn |= e, t);
  }
  function Fd(e, t, n, l, a) {
    var r = U.p;
    U.p = r !== 0 && 8 > r ? r : 8;
    var d = C.T, m = {};
    C.T = m, ho(e, !1, t, n);
    try {
      var x = a(), _ = C.S;
      if (_ !== null && _(m, x), x !== null && typeof x == "object" && typeof x.then == "function") {
        var w = w2(
          x,
          l
        );
        Ra(
          e,
          t,
          w,
          Et(e)
        );
      } else
        Ra(
          e,
          t,
          l,
          Et(e)
        );
    } catch (O) {
      Ra(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        Et()
      );
    } finally {
      U.p = r, d !== null && m.types !== null && (d.types = m.types), C.T = d;
    }
  }
  function U2() {
  }
  function fo(e, t, n, l) {
    if (e.tag !== 5) throw Error(c(476));
    var a = Wd(e).queue;
    Fd(
      e,
      a,
      t,
      I,
      n === null ? U2 : function() {
        return Id(e), n(l);
      }
    );
  }
  function Wd(e) {
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
        lastRenderedReducer: nn,
        lastRenderedState: I
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
        lastRenderedReducer: nn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Id(e) {
    var t = Wd(e);
    t.next === null && (t = e.alternate.memoizedState), Ra(
      e,
      t.next.queue,
      {},
      Et()
    );
  }
  function mo() {
    return et(Wa);
  }
  function Pd() {
    return Qe().memoizedState;
  }
  function ef() {
    return Qe().memoizedState;
  }
  function B2(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Et();
          e = jn(n);
          var l = Cn(t, e, n);
          l !== null && (ht(l, t, n), Aa(l, t, n)), t = { cache: Ys() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function H2(e, t, n) {
    var l = Et();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ir(e) ? nf(t, n) : (n = ws(e, t, n, l), n !== null && (ht(n, e, l), lf(n, t, l)));
  }
  function tf(e, t, n) {
    var l = Et();
    Ra(e, t, n, l);
  }
  function Ra(e, t, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ir(e)) nf(t, a);
    else {
      var r = e.alternate;
      if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null))
        try {
          var d = t.lastRenderedState, m = r(d, n);
          if (a.hasEagerState = !0, a.eagerState = m, vt(m, d))
            return Mr(e, t, a, 0), ke === null && kr(), !1;
        } catch {
        } finally {
        }
      if (n = ws(e, t, a, l), n !== null)
        return ht(n, e, l), lf(n, t, l), !0;
    }
    return !1;
  }
  function ho(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: $o(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ir(e)) {
      if (t) throw Error(c(479));
    } else
      t = ws(
        e,
        n,
        l,
        2
      ), t !== null && ht(t, e, 2);
  }
  function Ir(e) {
    var t = e.alternate;
    return e === se || t !== null && t === se;
  }
  function nf(e, t) {
    Ul = Xr = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function lf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, ou(e, n);
    }
  }
  var Da = {
    readContext: et,
    use: Kr,
    useCallback: qe,
    useContext: qe,
    useEffect: qe,
    useImperativeHandle: qe,
    useLayoutEffect: qe,
    useInsertionEffect: qe,
    useMemo: qe,
    useReducer: qe,
    useRef: qe,
    useState: qe,
    useDebugValue: qe,
    useDeferredValue: qe,
    useTransition: qe,
    useSyncExternalStore: qe,
    useId: qe,
    useHostTransitionStatus: qe,
    useFormState: qe,
    useActionState: qe,
    useOptimistic: qe,
    useMemoCache: qe,
    useCacheRefresh: qe
  };
  Da.useEffectEvent = qe;
  var af = {
    readContext: et,
    use: Kr,
    useCallback: function(e, t) {
      return st().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: et,
    useEffect: Yd,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Fr(
        4194308,
        4,
        Xd.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Fr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Fr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = st();
      t = t === void 0 ? null : t;
      var l = e();
      if (ll) {
        hn(!0);
        try {
          e();
        } finally {
          hn(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = st();
      if (n !== void 0) {
        var a = n(t);
        if (ll) {
          hn(!0);
          try {
            n(t);
          } finally {
            hn(!1);
          }
        }
      } else a = t;
      return l.memoizedState = l.baseState = a, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: a
      }, l.queue = e, e = e.dispatch = H2.bind(
        null,
        se,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = st();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = io(e);
      var t = e.queue, n = tf.bind(null, se, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: co,
    useDeferredValue: function(e, t) {
      var n = st();
      return uo(n, e, t);
    },
    useTransition: function() {
      var e = io(!1);
      return e = Fd.bind(
        null,
        se,
        e.queue,
        !0,
        !1
      ), st().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = se, a = st();
      if (pe) {
        if (n === void 0)
          throw Error(c(407));
        n = n();
      } else {
        if (n = t(), ke === null)
          throw Error(c(349));
        (me & 127) !== 0 || Ed(l, t, n);
      }
      a.memoizedState = n;
      var r = { value: n, getSnapshot: t };
      return a.queue = r, Yd(_d.bind(null, l, r, e), [
        e
      ]), l.flags |= 2048, Hl(
        9,
        { destroy: void 0 },
        Td.bind(
          null,
          l,
          r,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = st(), t = ke.identifierPrefix;
      if (pe) {
        var n = Gt, l = Yt;
        n = (l & ~(1 << 32 - yt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = $r++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = k2++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: mo,
    useFormState: Ud,
    useActionState: Ud,
    useOptimistic: function(e) {
      var t = st();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = ho.bind(
        null,
        se,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: lo,
    useCacheRefresh: function() {
      return st().memoizedState = B2.bind(
        null,
        se
      );
    },
    useEffectEvent: function(e) {
      var t = st(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ce & 2) !== 0)
          throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, go = {
    readContext: et,
    use: Kr,
    useCallback: Zd,
    useContext: et,
    useEffect: oo,
    useImperativeHandle: $d,
    useInsertionEffect: Vd,
    useLayoutEffect: Qd,
    useMemo: Kd,
    useReducer: Jr,
    useRef: qd,
    useState: function() {
      return Jr(nn);
    },
    useDebugValue: co,
    useDeferredValue: function(e, t) {
      var n = Qe();
      return Jd(
        n,
        ze.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Jr(nn)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : Oa(e),
        t
      ];
    },
    useSyncExternalStore: Nd,
    useId: Pd,
    useHostTransitionStatus: mo,
    useFormState: Bd,
    useActionState: Bd,
    useOptimistic: function(e, t) {
      var n = Qe();
      return wd(n, ze, e, t);
    },
    useMemoCache: lo,
    useCacheRefresh: ef
  };
  go.useEffectEvent = Gd;
  var rf = {
    readContext: et,
    use: Kr,
    useCallback: Zd,
    useContext: et,
    useEffect: oo,
    useImperativeHandle: $d,
    useInsertionEffect: Vd,
    useLayoutEffect: Qd,
    useMemo: Kd,
    useReducer: ro,
    useRef: qd,
    useState: function() {
      return ro(nn);
    },
    useDebugValue: co,
    useDeferredValue: function(e, t) {
      var n = Qe();
      return ze === null ? uo(n, e, t) : Jd(
        n,
        ze.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ro(nn)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : Oa(e),
        t
      ];
    },
    useSyncExternalStore: Nd,
    useId: Pd,
    useHostTransitionStatus: mo,
    useFormState: Ld,
    useActionState: Ld,
    useOptimistic: function(e, t) {
      var n = Qe();
      return ze !== null ? wd(n, ze, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: lo,
    useCacheRefresh: ef
  };
  rf.useEffectEvent = Gd;
  function po(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : b({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var xo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = Et(), a = jn(l);
      a.payload = t, n != null && (a.callback = n), t = Cn(e, a, l), t !== null && (ht(t, e, l), Aa(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = Et(), a = jn(l);
      a.tag = 1, a.payload = t, n != null && (a.callback = n), t = Cn(e, a, l), t !== null && (ht(t, e, l), Aa(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Et(), l = jn(n);
      l.tag = 2, t != null && (l.callback = t), t = Cn(e, l, n), t !== null && (ht(t, e, n), Aa(t, e, n));
    }
  };
  function sf(e, t, n, l, a, r, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, r, d) : t.prototype && t.prototype.isPureReactComponent ? !Sa(n, l) || !Sa(a, r) : !0;
  }
  function of(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && xo.enqueueReplaceState(t, t.state, null);
  }
  function al(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = b({}, n));
      for (var a in e)
        n[a] === void 0 && (n[a] = e[a]);
    }
    return n;
  }
  function cf(e) {
    wr(e);
  }
  function uf(e) {
    console.error(e);
  }
  function df(e) {
    wr(e);
  }
  function Pr(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function ff(e, t, n) {
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
  function yo(e, t, n) {
    return n = jn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Pr(e, t);
    }, n;
  }
  function mf(e) {
    return e = jn(e), e.tag = 3, e;
  }
  function hf(e, t, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var r = l.value;
      e.payload = function() {
        return a(r);
      }, e.callback = function() {
        ff(t, n, l);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      ff(t, n, l), typeof a != "function" && (An === null ? An = /* @__PURE__ */ new Set([this]) : An.add(this));
      var m = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function L2(e, t, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && wl(
        t,
        n,
        a,
        !0
      ), n = St.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Rt === null ? di() : n.alternate === null && Ye === 0 && (Ye = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === qr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Vo(e, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === qr ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Vo(e, l, a)), !1;
        }
        throw Error(c(435, n.tag));
      }
      return Vo(e, l, a), di(), !1;
    }
    if (pe)
      return t = St.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = a, l !== Us && (e = Error(c(422), { cause: l }), Na(wt(e, n)))) : (l !== Us && (t = Error(c(423), {
        cause: l
      }), Na(
        wt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, l = wt(l, n), a = yo(
        e.stateNode,
        l,
        a
      ), Zs(e, a), Ye !== 4 && (Ye = 2)), !1;
    var r = Error(c(520), { cause: l });
    if (r = wt(r, n), Va === null ? Va = [r] : Va.push(r), Ye !== 4 && (Ye = 2), t === null) return !0;
    l = wt(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = a & -a, n.lanes |= e, e = yo(n.stateNode, l, e), Zs(n, e), !1;
        case 1:
          if (t = n.type, r = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (An === null || !An.has(r))))
            return n.flags |= 65536, a &= -a, n.lanes |= a, a = mf(a), hf(
              a,
              e,
              n,
              l
            ), Zs(n, a), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var vo = Error(c(461)), Ze = !1;
  function tt(e, t, n, l) {
    t.child = e === null ? xd(t, null, n, l) : nl(
      t,
      e.child,
      n,
      l
    );
  }
  function gf(e, t, n, l, a) {
    n = n.render;
    var r = t.ref;
    if ("ref" in l) {
      var d = {};
      for (var m in l)
        m !== "ref" && (d[m] = l[m]);
    } else d = l;
    return In(t), l = Ps(
      e,
      t,
      n,
      d,
      r,
      a
    ), m = eo(), e !== null && !Ze ? (to(e, t, a), ln(e, t, a)) : (pe && m && Rs(t), t.flags |= 1, tt(e, t, l, a), t.child);
  }
  function pf(e, t, n, l, a) {
    if (e === null) {
      var r = n.type;
      return typeof r == "function" && !ks(r) && r.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = r, xf(
        e,
        t,
        r,
        l,
        a
      )) : (e = Rr(
        n.type,
        null,
        l,
        t,
        t.mode,
        a
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (r = e.child, !_o(e, a)) {
      var d = r.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Sa, n(d, l) && e.ref === t.ref)
        return ln(e, t, a);
    }
    return t.flags |= 1, e = Wt(r, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function xf(e, t, n, l, a) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (Sa(r, l) && e.ref === t.ref)
        if (Ze = !1, t.pendingProps = l = r, _o(e, a))
          (e.flags & 131072) !== 0 && (Ze = !0);
        else
          return t.lanes = e.lanes, ln(e, t, a);
    }
    return bo(
      e,
      t,
      n,
      l,
      a
    );
  }
  function yf(e, t, n, l) {
    var a = l.children, r = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, a = 0; l !== null; )
            a = a | l.lanes | l.childLanes, l = l.sibling;
          l = a & ~r;
        } else l = 0, t.child = null;
        return vf(
          e,
          t,
          r,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Hr(
          t,
          r !== null ? r.cachePool : null
        ), r !== null ? bd(t, r) : Js(), Sd(t);
      else
        return l = t.lanes = 536870912, vf(
          e,
          t,
          r !== null ? r.baseLanes | n : n,
          n,
          l
        );
    } else
      r !== null ? (Hr(t, r.cachePool), bd(t, r), En(), t.memoizedState = null) : (e !== null && Hr(t, null), Js(), En());
    return tt(e, t, a, n), t.child;
  }
  function Ua(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function vf(e, t, n, l, a) {
    var r = Vs();
    return r = r === null ? null : { parent: Xe._currentValue, pool: r }, t.memoizedState = {
      baseLanes: n,
      cachePool: r
    }, e !== null && Hr(t, null), Js(), Sd(t), e !== null && wl(e, t, l, !0), t.childLanes = a, null;
  }
  function ei(e, t) {
    return t = ni(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function bf(e, t, n) {
    return nl(t, e.child, null, n), e = ei(t, t.pendingProps), e.flags |= 2, jt(t), t.memoizedState = null, e;
  }
  function q2(e, t, n) {
    var l = t.pendingProps, a = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (pe) {
        if (l.mode === "hidden")
          return e = ei(t, l), t.lanes = 536870912, Ua(null, e);
        if (Ws(t), (e = De) ? (e = M0(
          e,
          Ot
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xn !== null ? { id: Yt, overflow: Gt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = nd(e), n.return = t, t.child = n, Pe = t, De = null)) : e = null, e === null) throw vn(t);
        return t.lanes = 536870912, null;
      }
      return ei(t, l);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var d = r.dehydrated;
      if (Ws(t), a)
        if (t.flags & 256)
          t.flags &= -257, t = bf(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (Ze || wl(e, t, n, !1), a = (n & e.childLanes) !== 0, Ze || a) {
        if (l = ke, l !== null && (d = cu(l, n), d !== 0 && d !== r.retryLane))
          throw r.retryLane = d, Kn(e, d), ht(l, e, d), vo;
        di(), t = bf(
          e,
          t,
          n
        );
      } else
        e = r.treeContext, De = Dt(d.nextSibling), Pe = t, pe = !0, yn = null, Ot = !1, e !== null && rd(t, e), t = ei(t, l), t.flags |= 4096;
      return t;
    }
    return e = Wt(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ti(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(c(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function bo(e, t, n, l, a) {
    return In(t), n = Ps(
      e,
      t,
      n,
      l,
      void 0,
      a
    ), l = eo(), e !== null && !Ze ? (to(e, t, a), ln(e, t, a)) : (pe && l && Rs(t), t.flags |= 1, tt(e, t, n, a), t.child);
  }
  function Sf(e, t, n, l, a, r) {
    return In(t), t.updateQueue = null, n = Cd(
      t,
      l,
      n,
      a
    ), jd(e), l = eo(), e !== null && !Ze ? (to(e, t, r), ln(e, t, r)) : (pe && l && Rs(t), t.flags |= 1, tt(e, t, n, r), t.child);
  }
  function jf(e, t, n, l, a) {
    if (In(t), t.stateNode === null) {
      var r = Tl, d = n.contextType;
      typeof d == "object" && d !== null && (r = et(d)), r = new n(l, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = xo, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = l, r.state = t.memoizedState, r.refs = {}, Xs(t), d = n.contextType, r.context = typeof d == "object" && d !== null ? et(d) : Tl, r.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (po(
        t,
        n,
        d,
        l
      ), r.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (d = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), d !== r.state && xo.enqueueReplaceState(r, r.state, null), ka(t, l, r, a), wa(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      r = t.stateNode;
      var m = t.memoizedProps, x = al(n, m);
      r.props = x;
      var _ = r.context, w = n.contextType;
      d = Tl, typeof w == "object" && w !== null && (d = et(w));
      var O = n.getDerivedStateFromProps;
      w = typeof O == "function" || typeof r.getSnapshotBeforeUpdate == "function", m = t.pendingProps !== m, w || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m || _ !== d) && of(
        t,
        r,
        l,
        d
      ), Sn = !1;
      var z = t.memoizedState;
      r.state = z, ka(t, l, r, a), wa(), _ = t.memoizedState, m || z !== _ || Sn ? (typeof O == "function" && (po(
        t,
        n,
        O,
        l
      ), _ = t.memoizedState), (x = Sn || sf(
        t,
        n,
        x,
        l,
        z,
        _,
        d
      )) ? (w || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = _), r.props = l, r.state = _, r.context = d, l = x) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      r = t.stateNode, $s(e, t), d = t.memoizedProps, w = al(n, d), r.props = w, O = t.pendingProps, z = r.context, _ = n.contextType, x = Tl, typeof _ == "object" && _ !== null && (x = et(_)), m = n.getDerivedStateFromProps, (_ = typeof m == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (d !== O || z !== x) && of(
        t,
        r,
        l,
        x
      ), Sn = !1, z = t.memoizedState, r.state = z, ka(t, l, r, a), wa();
      var A = t.memoizedState;
      d !== O || z !== A || Sn || e !== null && e.dependencies !== null && Ur(e.dependencies) ? (typeof m == "function" && (po(
        t,
        n,
        m,
        l
      ), A = t.memoizedState), (w = Sn || sf(
        t,
        n,
        w,
        l,
        z,
        A,
        x
      ) || e !== null && e.dependencies !== null && Ur(e.dependencies)) ? (_ || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(l, A, x), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        l,
        A,
        x
      )), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = A), r.props = l, r.state = A, r.context = x, l = w) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return r = l, ti(e, t), l = (t.flags & 128) !== 0, r || l ? (r = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : r.render(), t.flags |= 1, e !== null && l ? (t.child = nl(
      t,
      e.child,
      null,
      a
    ), t.child = nl(
      t,
      null,
      n,
      a
    )) : tt(e, t, n, a), t.memoizedState = r.state, e = t.child) : e = ln(
      e,
      t,
      a
    ), e;
  }
  function Cf(e, t, n, l) {
    return Fn(), t.flags |= 256, tt(e, t, n, l), t.child;
  }
  var So = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jo(e) {
    return { baseLanes: e, cachePool: dd() };
  }
  function Co(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Nt), e;
  }
  function Nf(e, t, n) {
    var l = t.pendingProps, a = !1, r = (t.flags & 128) !== 0, d;
    if ((d = r) || (d = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0), d && (a = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (pe) {
        if (a ? Nn(t) : En(), (e = De) ? (e = M0(
          e,
          Ot
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xn !== null ? { id: Yt, overflow: Gt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = nd(e), n.return = t, t.child = n, Pe = t, De = null)) : e = null, e === null) throw vn(t);
        return rc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var m = l.children;
      return l = l.fallback, a ? (En(), a = t.mode, m = ni(
        { mode: "hidden", children: m },
        a
      ), l = Jn(
        l,
        a,
        n,
        null
      ), m.return = t, l.return = t, m.sibling = l, t.child = m, l = t.child, l.memoizedState = jo(n), l.childLanes = Co(
        e,
        d,
        n
      ), t.memoizedState = So, Ua(null, l)) : (Nn(t), No(t, m));
    }
    var x = e.memoizedState;
    if (x !== null && (m = x.dehydrated, m !== null)) {
      if (r)
        t.flags & 256 ? (Nn(t), t.flags &= -257, t = Eo(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (En(), t.child = e.child, t.flags |= 128, t = null) : (En(), m = l.fallback, a = t.mode, l = ni(
          { mode: "visible", children: l.children },
          a
        ), m = Jn(
          m,
          a,
          n,
          null
        ), m.flags |= 2, l.return = t, m.return = t, l.sibling = m, t.child = l, nl(
          t,
          e.child,
          null,
          n
        ), l = t.child, l.memoizedState = jo(n), l.childLanes = Co(
          e,
          d,
          n
        ), t.memoizedState = So, t = Ua(null, l));
      else if (Nn(t), rc(m)) {
        if (d = m.nextSibling && m.nextSibling.dataset, d) var _ = d.dgst;
        d = _, l = Error(c(419)), l.stack = "", l.digest = d, Na({ value: l, source: null, stack: null }), t = Eo(
          e,
          t,
          n
        );
      } else if (Ze || wl(e, t, n, !1), d = (n & e.childLanes) !== 0, Ze || d) {
        if (d = ke, d !== null && (l = cu(d, n), l !== 0 && l !== x.retryLane))
          throw x.retryLane = l, Kn(e, l), ht(d, e, l), vo;
        ac(m) || di(), t = Eo(
          e,
          t,
          n
        );
      } else
        ac(m) ? (t.flags |= 192, t.child = e.child, t = null) : (e = x.treeContext, De = Dt(
          m.nextSibling
        ), Pe = t, pe = !0, yn = null, Ot = !1, e !== null && rd(t, e), t = No(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return a ? (En(), m = l.fallback, a = t.mode, x = e.child, _ = x.sibling, l = Wt(x, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = x.subtreeFlags & 65011712, _ !== null ? m = Wt(
      _,
      m
    ) : (m = Jn(
      m,
      a,
      n,
      null
    ), m.flags |= 2), m.return = t, l.return = t, l.sibling = m, t.child = l, Ua(null, l), l = t.child, m = e.child.memoizedState, m === null ? m = jo(n) : (a = m.cachePool, a !== null ? (x = Xe._currentValue, a = a.parent !== x ? { parent: x, pool: x } : a) : a = dd(), m = {
      baseLanes: m.baseLanes | n,
      cachePool: a
    }), l.memoizedState = m, l.childLanes = Co(
      e,
      d,
      n
    ), t.memoizedState = So, Ua(e.child, l)) : (Nn(t), n = e.child, e = n.sibling, n = Wt(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function No(e, t) {
    return t = ni(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function ni(e, t) {
    return e = bt(22, e, null, t), e.lanes = 0, e;
  }
  function Eo(e, t, n) {
    return nl(t, e.child, null, n), e = No(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ef(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Ls(e.return, t, n);
  }
  function To(e, t, n, l, a, r) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: a,
      treeForkCount: r
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = l, d.tail = n, d.tailMode = a, d.treeForkCount = r);
  }
  function Tf(e, t, n) {
    var l = t.pendingProps, a = l.revealOrder, r = l.tail;
    l = l.children;
    var d = Ve.current, m = (d & 2) !== 0;
    if (m ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, G(Ve, d), tt(e, t, l, n), l = pe ? Ca : 0, !m && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ef(e, n, t);
        else if (e.tag === 19)
          Ef(e, n, t);
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
        n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), To(
          t,
          !1,
          a,
          n,
          r,
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
        To(
          t,
          !0,
          n,
          null,
          r,
          l
        );
        break;
      case "together":
        To(
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
  function ln(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), zn |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (wl(
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
      for (e = t.child, n = Wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Wt(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function _o(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ur(e)));
  }
  function Y2(e, t, n) {
    switch (t.tag) {
      case 3:
        it(t, t.stateNode.containerInfo), bn(t, Xe, e.memoizedState.cache), Fn();
        break;
      case 27:
      case 5:
        oa(t);
        break;
      case 4:
        it(t, t.stateNode.containerInfo);
        break;
      case 10:
        bn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Ws(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Nn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Nf(e, t, n) : (Nn(t), e = ln(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Nn(t);
        break;
      case 19:
        var a = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (wl(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), a) {
          if (l)
            return Tf(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), G(Ve, Ve.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, yf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        bn(t, Xe, e.memoizedState.cache);
    }
    return ln(e, t, n);
  }
  function _f(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ze = !0;
      else {
        if (!_o(e, n) && (t.flags & 128) === 0)
          return Ze = !1, Y2(
            e,
            t,
            n
          );
        Ze = (e.flags & 131072) !== 0;
      }
    else
      Ze = !1, pe && (t.flags & 1048576) !== 0 && ad(t, Ca, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = el(t.elementType), t.type = e, typeof e == "function")
            ks(e) ? (l = al(e, l), t.tag = 1, t = jf(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = bo(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var a = e.$$typeof;
              if (a === Me) {
                t.tag = 11, t = gf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (a === X) {
                t.tag = 14, t = pf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              }
            }
            throw t = ge(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return bo(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, a = al(
          l,
          t.pendingProps
        ), jf(
          e,
          t,
          l,
          a,
          n
        );
      case 3:
        e: {
          if (it(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          l = t.pendingProps;
          var r = t.memoizedState;
          a = r.element, $s(e, t), ka(t, l, null, n);
          var d = t.memoizedState;
          if (l = d.cache, bn(t, Xe, l), l !== r.cache && qs(
            t,
            [Xe],
            n,
            !0
          ), wa(), l = d.element, r.isDehydrated)
            if (r = {
              element: l,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
              t = Cf(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== a) {
              a = wt(
                Error(c(424)),
                t
              ), Na(a), t = Cf(
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
              for (De = Dt(e.firstChild), Pe = t, pe = !0, yn = null, Ot = !0, n = xd(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Fn(), l === a) {
              t = ln(
                e,
                t,
                n
              );
              break e;
            }
            tt(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ti(e, t), e === null ? (n = H0(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : pe || (n = t.type, e = t.pendingProps, l = yi(
          ue.current
        ).createElement(n), l[Ie] = t, l[ot] = e, nt(l, n, e), Fe(l), t.stateNode = l) : t.memoizedState = H0(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return oa(t), e === null && pe && (l = t.stateNode = D0(
          t.type,
          t.pendingProps,
          ue.current
        ), Pe = t, Ot = !0, a = De, On(t.type) ? (ic = a, De = Dt(l.firstChild)) : De = a), tt(
          e,
          t,
          t.pendingProps.children,
          n
        ), ti(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && pe && ((a = l = De) && (l = xh(
          l,
          t.type,
          t.pendingProps,
          Ot
        ), l !== null ? (t.stateNode = l, Pe = t, De = Dt(l.firstChild), Ot = !1, a = !0) : a = !1), a || vn(t)), oa(t), a = t.type, r = t.pendingProps, d = e !== null ? e.memoizedProps : null, l = r.children, tc(a, r) ? l = null : d !== null && tc(a, d) && (t.flags |= 32), t.memoizedState !== null && (a = Ps(
          e,
          t,
          M2,
          null,
          null,
          n
        ), Wa._currentValue = a), ti(e, t), tt(e, t, l, n), t.child;
      case 6:
        return e === null && pe && ((e = n = De) && (n = yh(
          n,
          t.pendingProps,
          Ot
        ), n !== null ? (t.stateNode = n, Pe = t, De = null, e = !0) : e = !1), e || vn(t)), null;
      case 13:
        return Nf(e, t, n);
      case 4:
        return it(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = nl(
          t,
          null,
          l,
          n
        ) : tt(e, t, l, n), t.child;
      case 11:
        return gf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return tt(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return tt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return tt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return l = t.pendingProps, bn(t, t.type, l.value), tt(e, t, l.children, n), t.child;
      case 9:
        return a = t.type._context, l = t.pendingProps.children, In(t), a = et(a), l = l(a), t.flags |= 1, tt(e, t, l, n), t.child;
      case 14:
        return pf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return xf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Tf(e, t, n);
      case 31:
        return q2(e, t, n);
      case 22:
        return yf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return In(t), l = et(Xe), e === null ? (a = Vs(), a === null && (a = ke, r = Ys(), a.pooledCache = r, r.refCount++, r !== null && (a.pooledCacheLanes |= n), a = r), t.memoizedState = { parent: l, cache: a }, Xs(t), bn(t, Xe, a)) : ((e.lanes & n) !== 0 && ($s(e, t), ka(t, null, null, n), wa()), a = e.memoizedState, r = t.memoizedState, a.parent !== l ? (a = { parent: l, cache: l }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), bn(t, Xe, l)) : (l = r.cache, bn(t, Xe, l), l !== a.cache && qs(
          t,
          [Xe],
          n,
          !0
        ))), tt(
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
  function an(e) {
    e.flags |= 4;
  }
  function zo(e, t, n, l, a) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (a & 335544128) === a)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (e0()) e.flags |= 8192;
        else
          throw tl = qr, Qs;
    } else e.flags &= -16777217;
  }
  function zf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !V0(t))
      if (e0()) e.flags |= 8192;
      else
        throw tl = qr, Qs;
  }
  function li(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? iu() : 536870912, e.lanes |= t, Gl |= t);
  }
  function Ba(e, t) {
    if (!pe)
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
  function Ue(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 65011712, l |= a.flags & 65011712, a.return = e, a = a.sibling;
    else
      for (a = e.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function G2(e, t, n) {
    var l = t.pendingProps;
    switch (Ds(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ue(t), null;
      case 1:
        return Ue(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), en(Xe), Ge(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Al(t) ? an(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Bs())), Ue(t), null;
      case 26:
        var a = t.type, r = t.memoizedState;
        return e === null ? (an(t), r !== null ? (Ue(t), zf(t, r)) : (Ue(t), zo(
          t,
          a,
          null,
          l,
          n
        ))) : r ? r !== e.memoizedState ? (an(t), Ue(t), zf(t, r)) : (Ue(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && an(t), Ue(t), zo(
          t,
          a,
          e,
          l,
          n
        )), null;
      case 27:
        if (hr(t), n = ue.current, a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && an(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Ue(t), null;
          }
          e = $.current, Al(t) ? id(t) : (e = D0(a, l, n), t.stateNode = e, an(t));
        }
        return Ue(t), null;
      case 5:
        if (hr(t), a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && an(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Ue(t), null;
          }
          if (r = $.current, Al(t))
            id(t);
          else {
            var d = yi(
              ue.current
            );
            switch (r) {
              case 1:
                r = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                r = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    r = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    r = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    r = d.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof l.is == "string" ? d.createElement("select", {
                      is: l.is
                    }) : d.createElement("select"), l.multiple ? r.multiple = !0 : l.size && (r.size = l.size);
                    break;
                  default:
                    r = typeof l.is == "string" ? d.createElement(a, { is: l.is }) : d.createElement(a);
                }
            }
            r[Ie] = t, r[ot] = l;
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
            e: switch (nt(r, a, l), a) {
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
            l && an(t);
          }
        }
        return Ue(t), zo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && an(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = ue.current, Al(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, a = Pe, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            e[Ie] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || N0(e.nodeValue, n)), e || vn(t, !0);
          } else
            e = yi(e).createTextNode(
              l
            ), e[Ie] = t, t.stateNode = e;
        }
        return Ue(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Al(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[Ie] = t;
            } else
              Fn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ue(t), e = !1;
          } else
            n = Bs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (jt(t), t) : (jt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return Ue(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (a = Al(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!a) throw Error(c(318));
              if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(c(317));
              a[Ie] = t;
            } else
              Fn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ue(t), a = !1;
          } else
            a = Bs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return t.flags & 256 ? (jt(t), t) : (jt(t), null);
        }
        return jt(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), r = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (r = l.memoizedState.cachePool.pool), r !== a && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), li(t, t.updateQueue), Ue(t), null);
      case 4:
        return Ge(), e === null && Fo(t.stateNode.containerInfo), Ue(t), null;
      case 10:
        return en(t.type), Ue(t), null;
      case 19:
        if (R(Ve), l = t.memoizedState, l === null) return Ue(t), null;
        if (a = (t.flags & 128) !== 0, r = l.rendering, r === null)
          if (a) Ba(l, !1);
          else {
            if (Ye !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (r = Qr(e), r !== null) {
                  for (t.flags |= 128, Ba(l, !1), e = r.updateQueue, t.updateQueue = e, li(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    td(n, e), n = n.sibling;
                  return G(
                    Ve,
                    Ve.current & 1 | 2
                  ), pe && It(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && pt() > oi && (t.flags |= 128, a = !0, Ba(l, !1), t.lanes = 4194304);
          }
        else {
          if (!a)
            if (e = Qr(r), e !== null) {
              if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, li(t, e), Ba(l, !0), l.tail === null && l.tailMode === "hidden" && !r.alternate && !pe)
                return Ue(t), null;
            } else
              2 * pt() - l.renderingStartTime > oi && n !== 536870912 && (t.flags |= 128, a = !0, Ba(l, !1), t.lanes = 4194304);
          l.isBackwards ? (r.sibling = t.child, t.child = r) : (e = l.last, e !== null ? e.sibling = r : t.child = r, l.last = r);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = pt(), e.sibling = null, n = Ve.current, G(
          Ve,
          a ? n & 1 | 2 : n & 1
        ), pe && It(t, l.treeForkCount), e) : (Ue(t), null);
      case 22:
      case 23:
        return jt(t), Fs(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ue(t), n = t.updateQueue, n !== null && li(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && R(Pn), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), en(Xe), Ue(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function V2(e, t) {
    switch (Ds(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return en(Xe), Ge(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return hr(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (jt(t), t.alternate === null)
            throw Error(c(340));
          Fn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (jt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          Fn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return R(Ve), null;
      case 4:
        return Ge(), null;
      case 10:
        return en(t.type), null;
      case 22:
      case 23:
        return jt(t), Fs(), e !== null && R(Pn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return en(Xe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Af(e, t) {
    switch (Ds(t), t.tag) {
      case 3:
        en(Xe), Ge();
        break;
      case 26:
      case 27:
      case 5:
        hr(t);
        break;
      case 4:
        Ge();
        break;
      case 31:
        t.memoizedState !== null && jt(t);
        break;
      case 13:
        jt(t);
        break;
      case 19:
        R(Ve);
        break;
      case 10:
        en(t.type);
        break;
      case 22:
      case 23:
        jt(t), Fs(), e !== null && R(Pn);
        break;
      case 24:
        en(Xe);
    }
  }
  function Ha(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var r = n.create, d = n.inst;
            l = r(), d.destroy = l;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (m) {
      _e(t, t.return, m);
    }
  }
  function Tn(e, t, n) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var r = a.next;
        l = r;
        do {
          if ((l.tag & e) === e) {
            var d = l.inst, m = d.destroy;
            if (m !== void 0) {
              d.destroy = void 0, a = t;
              var x = n, _ = m;
              try {
                _();
              } catch (w) {
                _e(
                  a,
                  x,
                  w
                );
              }
            }
          }
          l = l.next;
        } while (l !== r);
      }
    } catch (w) {
      _e(t, t.return, w);
    }
  }
  function wf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        vd(t, n);
      } catch (l) {
        _e(e, e.return, l);
      }
    }
  }
  function kf(e, t, n) {
    n.props = al(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      _e(e, t, l);
    }
  }
  function La(e, t) {
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
      _e(e, t, a);
    }
  }
  function Vt(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          _e(e, t, a);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          _e(e, t, a);
        }
      else n.current = null;
  }
  function Mf(e) {
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
      _e(e, e.return, a);
    }
  }
  function Ao(e, t, n) {
    try {
      var l = e.stateNode;
      dh(l, e.type, n, t), l[ot] = t;
    } catch (a) {
      _e(e, e.return, a);
    }
  }
  function Of(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && On(e.type) || e.tag === 4;
  }
  function wo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Of(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && On(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ko(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Jt));
    else if (l !== 4 && (l === 27 && On(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (ko(e, t, n), e = e.sibling; e !== null; )
        ko(e, t, n), e = e.sibling;
  }
  function ai(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (l !== 4 && (l === 27 && On(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (ai(e, t, n), e = e.sibling; e !== null; )
        ai(e, t, n), e = e.sibling;
  }
  function Rf(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, a = t.attributes; a.length; )
        t.removeAttributeNode(a[0]);
      nt(t, l, n), t[Ie] = e, t[ot] = n;
    } catch (r) {
      _e(e, e.return, r);
    }
  }
  var rn = !1, Ke = !1, Mo = !1, Df = typeof WeakSet == "function" ? WeakSet : Set, We = null;
  function Q2(e, t) {
    if (e = e.containerInfo, Po = Ei, e = $u(e), Ns(e)) {
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
            var a = l.anchorOffset, r = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, r.nodeType;
            } catch {
              n = null;
              break e;
            }
            var d = 0, m = -1, x = -1, _ = 0, w = 0, O = e, z = null;
            t: for (; ; ) {
              for (var A; O !== n || a !== 0 && O.nodeType !== 3 || (m = d + a), O !== r || l !== 0 && O.nodeType !== 3 || (x = d + l), O.nodeType === 3 && (d += O.nodeValue.length), (A = O.firstChild) !== null; )
                z = O, O = A;
              for (; ; ) {
                if (O === e) break t;
                if (z === n && ++_ === a && (m = d), z === r && ++w === l && (x = d), (A = O.nextSibling) !== null) break;
                O = z, z = O.parentNode;
              }
              O = A;
            }
            n = m === -1 || x === -1 ? null : { start: m, end: x };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ec = { focusedElem: e, selectionRange: n }, Ei = !1, We = t; We !== null; )
      if (t = We, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, We = e;
      else
        for (; We !== null; ) {
          switch (t = We, r = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  a = e[n], a.ref.impl = a.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && r !== null) {
                e = void 0, n = t, a = r.memoizedProps, r = r.memoizedState, l = n.stateNode;
                try {
                  var Q = al(
                    n.type,
                    a
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Q,
                    r
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (P) {
                  _e(
                    n,
                    n.return,
                    P
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  lc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      lc(e);
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
            e.return = t.return, We = e;
            break;
          }
          We = t.return;
        }
  }
  function Uf(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        on(e, n), l & 4 && Ha(5, n);
        break;
      case 1:
        if (on(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              _e(n, n.return, d);
            }
          else {
            var a = al(
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
              _e(
                n,
                n.return,
                d
              );
            }
          }
        l & 64 && wf(n), l & 512 && La(n, n.return);
        break;
      case 3:
        if (on(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
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
            vd(e, t);
          } catch (d) {
            _e(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Rf(n);
      case 26:
      case 5:
        on(e, n), t === null && l & 4 && Mf(n), l & 512 && La(n, n.return);
        break;
      case 12:
        on(e, n);
        break;
      case 31:
        on(e, n), l & 4 && Lf(e, n);
        break;
      case 13:
        on(e, n), l & 4 && qf(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = P2.bind(
          null,
          n
        ), vh(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || rn, !l) {
          t = t !== null && t.memoizedState !== null || Ke, a = rn;
          var r = Ke;
          rn = l, (Ke = t) && !r ? cn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : on(e, n), rn = a, Ke = r;
        }
        break;
      case 30:
        break;
      default:
        on(e, n);
    }
  }
  function Bf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Bf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ss(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Be = null, ut = !1;
  function sn(e, t, n) {
    for (n = n.child; n !== null; )
      Hf(e, t, n), n = n.sibling;
  }
  function Hf(e, t, n) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(ca, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Ke || Vt(n, t), sn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ke || Vt(n, t);
        var l = Be, a = ut;
        On(n.type) && (Be = n.stateNode, ut = !1), sn(
          e,
          t,
          n
        ), Ka(n.stateNode), Be = l, ut = a;
        break;
      case 5:
        Ke || Vt(n, t);
      case 6:
        if (l = Be, a = ut, Be = null, sn(
          e,
          t,
          n
        ), Be = l, ut = a, Be !== null)
          if (ut)
            try {
              (Be.nodeType === 9 ? Be.body : Be.nodeName === "HTML" ? Be.ownerDocument.body : Be).removeChild(n.stateNode);
            } catch (r) {
              _e(
                n,
                t,
                r
              );
            }
          else
            try {
              Be.removeChild(n.stateNode);
            } catch (r) {
              _e(
                n,
                t,
                r
              );
            }
        break;
      case 18:
        Be !== null && (ut ? (e = Be, w0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Fl(e)) : w0(Be, n.stateNode));
        break;
      case 4:
        l = Be, a = ut, Be = n.stateNode.containerInfo, ut = !0, sn(
          e,
          t,
          n
        ), Be = l, ut = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(2, n, t), Ke || Tn(4, n, t), sn(
          e,
          t,
          n
        );
        break;
      case 1:
        Ke || (Vt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && kf(
          n,
          t,
          l
        )), sn(
          e,
          t,
          n
        );
        break;
      case 21:
        sn(
          e,
          t,
          n
        );
        break;
      case 22:
        Ke = (l = Ke) || n.memoizedState !== null, sn(
          e,
          t,
          n
        ), Ke = l;
        break;
      default:
        sn(
          e,
          t,
          n
        );
    }
  }
  function Lf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Fl(e);
      } catch (n) {
        _e(t, t.return, n);
      }
    }
  }
  function qf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Fl(e);
      } catch (n) {
        _e(t, t.return, n);
      }
  }
  function X2(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Df()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Df()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function ri(e, t) {
    var n = X2(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var a = eh.bind(null, e, l);
        l.then(a, a);
      }
    });
  }
  function dt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l], r = e, d = t, m = d;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (On(m.type)) {
                Be = m.stateNode, ut = !1;
                break e;
              }
              break;
            case 5:
              Be = m.stateNode, ut = !1;
              break e;
            case 3:
            case 4:
              Be = m.stateNode.containerInfo, ut = !0;
              break e;
          }
          m = m.return;
        }
        if (Be === null) throw Error(c(160));
        Hf(r, d, a), Be = null, ut = !1, r = a.alternate, r !== null && (r.return = null), a.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Yf(t, e), t = t.sibling;
  }
  var Lt = null;
  function Yf(e, t) {
    var n = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        dt(t, e), ft(e), l & 4 && (Tn(3, e, e.return), Ha(3, e), Tn(5, e, e.return));
        break;
      case 1:
        dt(t, e), ft(e), l & 512 && (Ke || n === null || Vt(n, n.return)), l & 64 && rn && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var a = Lt;
        if (dt(t, e), ft(e), l & 512 && (Ke || n === null || Vt(n, n.return)), l & 4) {
          var r = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
                  t: switch (l) {
                    case "title":
                      r = a.getElementsByTagName("title")[0], (!r || r[fa] || r[Ie] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(l), a.head.insertBefore(
                        r,
                        a.querySelector("head > title")
                      )), nt(r, l, n), r[Ie] = e, Fe(r), l = r;
                      break e;
                    case "link":
                      var d = Y0(
                        "link",
                        "href",
                        a
                      ).get(l + (n.href || ""));
                      if (d) {
                        for (var m = 0; m < d.length; m++)
                          if (r = d[m], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            d.splice(m, 1);
                            break t;
                          }
                      }
                      r = a.createElement(l), nt(r, l, n), a.head.appendChild(r);
                      break;
                    case "meta":
                      if (d = Y0(
                        "meta",
                        "content",
                        a
                      ).get(l + (n.content || ""))) {
                        for (m = 0; m < d.length; m++)
                          if (r = d[m], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            d.splice(m, 1);
                            break t;
                          }
                      }
                      r = a.createElement(l), nt(r, l, n), a.head.appendChild(r);
                      break;
                    default:
                      throw Error(c(468, l));
                  }
                  r[Ie] = e, Fe(r), l = r;
                }
                e.stateNode = l;
              } else
                G0(
                  a,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = q0(
                a,
                l,
                e.memoizedProps
              );
          else
            r !== l ? (r === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : r.count--, l === null ? G0(
              a,
              e.type,
              e.stateNode
            ) : q0(
              a,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Ao(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        dt(t, e), ft(e), l & 512 && (Ke || n === null || Vt(n, n.return)), n !== null && l & 4 && Ao(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (dt(t, e), ft(e), l & 512 && (Ke || n === null || Vt(n, n.return)), e.flags & 32) {
          a = e.stateNode;
          try {
            vl(a, "");
          } catch (Q) {
            _e(e, e.return, Q);
          }
        }
        l & 4 && e.stateNode != null && (a = e.memoizedProps, Ao(
          e,
          a,
          n !== null ? n.memoizedProps : a
        )), l & 1024 && (Mo = !0);
        break;
      case 6:
        if (dt(t, e), ft(e), l & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (Q) {
            _e(e, e.return, Q);
          }
        }
        break;
      case 3:
        if (Si = null, a = Lt, Lt = vi(t.containerInfo), dt(t, e), Lt = a, ft(e), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Fl(t.containerInfo);
          } catch (Q) {
            _e(e, e.return, Q);
          }
        Mo && (Mo = !1, Gf(e));
        break;
      case 4:
        l = Lt, Lt = vi(
          e.stateNode.containerInfo
        ), dt(t, e), ft(e), Lt = l;
        break;
      case 12:
        dt(t, e), ft(e);
        break;
      case 31:
        dt(t, e), ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ri(e, l)));
        break;
      case 13:
        dt(t, e), ft(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (si = pt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ri(e, l)));
        break;
      case 22:
        a = e.memoizedState !== null;
        var x = n !== null && n.memoizedState !== null, _ = rn, w = Ke;
        if (rn = _ || a, Ke = w || x, dt(t, e), Ke = w, rn = _, ft(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || x || rn || Ke || rl(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                x = n = t;
                try {
                  if (r = x.stateNode, a)
                    d = r.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none";
                  else {
                    m = x.stateNode;
                    var O = x.memoizedProps.style, z = O != null && O.hasOwnProperty("display") ? O.display : null;
                    m.style.display = z == null || typeof z == "boolean" ? "" : ("" + z).trim();
                  }
                } catch (Q) {
                  _e(x, x.return, Q);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = a ? "" : x.memoizedProps;
                } catch (Q) {
                  _e(x, x.return, Q);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                x = t;
                try {
                  var A = x.stateNode;
                  a ? k0(A, !0) : k0(x.stateNode, !1);
                } catch (Q) {
                  _e(x, x.return, Q);
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
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, ri(e, n))));
        break;
      case 19:
        dt(t, e), ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ri(e, l)));
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
          if (Of(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var a = n.stateNode, r = wo(e);
            ai(e, r, a);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (vl(d, ""), n.flags &= -33);
            var m = wo(e);
            ai(e, m, d);
            break;
          case 3:
          case 4:
            var x = n.stateNode.containerInfo, _ = wo(e);
            ko(
              e,
              _,
              x
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (w) {
        _e(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Gf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Gf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function on(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Uf(e, t.alternate, t), t = t.sibling;
  }
  function rl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Tn(4, t, t.return), rl(t);
          break;
        case 1:
          Vt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && kf(
            t,
            t.return,
            n
          ), rl(t);
          break;
        case 27:
          Ka(t.stateNode);
        case 26:
        case 5:
          Vt(t, t.return), rl(t);
          break;
        case 22:
          t.memoizedState === null && rl(t);
          break;
        case 30:
          rl(t);
          break;
        default:
          rl(t);
      }
      e = e.sibling;
    }
  }
  function cn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, a = e, r = t, d = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          cn(
            a,
            r,
            n
          ), Ha(4, r);
          break;
        case 1:
          if (cn(
            a,
            r,
            n
          ), l = r, a = l.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (_) {
              _e(l, l.return, _);
            }
          if (l = r, a = l.updateQueue, a !== null) {
            var m = l.stateNode;
            try {
              var x = a.shared.hiddenCallbacks;
              if (x !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < x.length; a++)
                  yd(x[a], m);
            } catch (_) {
              _e(l, l.return, _);
            }
          }
          n && d & 64 && wf(r), La(r, r.return);
          break;
        case 27:
          Rf(r);
        case 26:
        case 5:
          cn(
            a,
            r,
            n
          ), n && l === null && d & 4 && Mf(r), La(r, r.return);
          break;
        case 12:
          cn(
            a,
            r,
            n
          );
          break;
        case 31:
          cn(
            a,
            r,
            n
          ), n && d & 4 && Lf(a, r);
          break;
        case 13:
          cn(
            a,
            r,
            n
          ), n && d & 4 && qf(a, r);
          break;
        case 22:
          r.memoizedState === null && cn(
            a,
            r,
            n
          ), La(r, r.return);
          break;
        case 30:
          break;
        default:
          cn(
            a,
            r,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Oo(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ea(n));
  }
  function Ro(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ea(e));
  }
  function qt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Vf(
          e,
          t,
          n,
          l
        ), t = t.sibling;
  }
  function Vf(e, t, n, l) {
    var a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        qt(
          e,
          t,
          n,
          l
        ), a & 2048 && Ha(9, t);
        break;
      case 1:
        qt(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        qt(
          e,
          t,
          n,
          l
        ), a & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ea(e)));
        break;
      case 12:
        if (a & 2048) {
          qt(
            e,
            t,
            n,
            l
          ), e = t.stateNode;
          try {
            var r = t.memoizedProps, d = r.id, m = r.onPostCommit;
            typeof m == "function" && m(
              d,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (x) {
            _e(t, t.return, x);
          }
        } else
          qt(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        qt(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        qt(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        r = t.stateNode, d = t.alternate, t.memoizedState !== null ? r._visibility & 2 ? qt(
          e,
          t,
          n,
          l
        ) : qa(e, t) : r._visibility & 2 ? qt(
          e,
          t,
          n,
          l
        ) : (r._visibility |= 2, Ll(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), a & 2048 && Oo(d, t);
        break;
      case 24:
        qt(
          e,
          t,
          n,
          l
        ), a & 2048 && Ro(t.alternate, t);
        break;
      default:
        qt(
          e,
          t,
          n,
          l
        );
    }
  }
  function Ll(e, t, n, l, a) {
    for (a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e, d = t, m = n, x = l, _ = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ll(
            r,
            d,
            m,
            x,
            a
          ), Ha(8, d);
          break;
        case 23:
          break;
        case 22:
          var w = d.stateNode;
          d.memoizedState !== null ? w._visibility & 2 ? Ll(
            r,
            d,
            m,
            x,
            a
          ) : qa(
            r,
            d
          ) : (w._visibility |= 2, Ll(
            r,
            d,
            m,
            x,
            a
          )), a && _ & 2048 && Oo(
            d.alternate,
            d
          );
          break;
        case 24:
          Ll(
            r,
            d,
            m,
            x,
            a
          ), a && _ & 2048 && Ro(d.alternate, d);
          break;
        default:
          Ll(
            r,
            d,
            m,
            x,
            a
          );
      }
      t = t.sibling;
    }
  }
  function qa(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, a = l.flags;
        switch (l.tag) {
          case 22:
            qa(n, l), a & 2048 && Oo(
              l.alternate,
              l
            );
            break;
          case 24:
            qa(n, l), a & 2048 && Ro(l.alternate, l);
            break;
          default:
            qa(n, l);
        }
        t = t.sibling;
      }
  }
  var Ya = 8192;
  function ql(e, t, n) {
    if (e.subtreeFlags & Ya)
      for (e = e.child; e !== null; )
        Qf(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Qf(e, t, n) {
    switch (e.tag) {
      case 26:
        ql(
          e,
          t,
          n
        ), e.flags & Ya && e.memoizedState !== null && kh(
          n,
          Lt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ql(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var l = Lt;
        Lt = vi(e.stateNode.containerInfo), ql(
          e,
          t,
          n
        ), Lt = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ya, Ya = 16777216, ql(
          e,
          t,
          n
        ), Ya = l) : ql(
          e,
          t,
          n
        ));
        break;
      default:
        ql(
          e,
          t,
          n
        );
    }
  }
  function Xf(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ga(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          We = l, Zf(
            l,
            e
          );
        }
      Xf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        $f(e), e = e.sibling;
  }
  function $f(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ga(e), e.flags & 2048 && Tn(9, e, e.return);
        break;
      case 3:
        Ga(e);
        break;
      case 12:
        Ga(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ii(e)) : Ga(e);
        break;
      default:
        Ga(e);
    }
  }
  function ii(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          We = l, Zf(
            l,
            e
          );
        }
      Xf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Tn(8, t, t.return), ii(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, ii(t));
          break;
        default:
          ii(t);
      }
      e = e.sibling;
    }
  }
  function Zf(e, t) {
    for (; We !== null; ) {
      var n = We;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Tn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Ea(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, We = l;
      else
        e: for (n = e; We !== null; ) {
          l = We;
          var a = l.sibling, r = l.return;
          if (Bf(l), l === n) {
            We = null;
            break e;
          }
          if (a !== null) {
            a.return = r, We = a;
            break e;
          }
          We = r;
        }
    }
  }
  var $2 = {
    getCacheForType: function(e) {
      var t = et(Xe), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return et(Xe).controller.signal;
    }
  }, Z2 = typeof WeakMap == "function" ? WeakMap : Map, Ce = 0, ke = null, de = null, me = 0, Te = 0, Ct = null, _n = !1, Yl = !1, Do = !1, un = 0, Ye = 0, zn = 0, il = 0, Uo = 0, Nt = 0, Gl = 0, Va = null, mt = null, Bo = !1, si = 0, Kf = 0, oi = 1 / 0, ci = null, An = null, Je = 0, wn = null, Vl = null, dn = 0, Ho = 0, Lo = null, Jf = null, Qa = 0, qo = null;
  function Et() {
    return (Ce & 2) !== 0 && me !== 0 ? me & -me : C.T !== null ? $o() : uu();
  }
  function Ff() {
    if (Nt === 0)
      if ((me & 536870912) === 0 || pe) {
        var e = xr;
        xr <<= 1, (xr & 3932160) === 0 && (xr = 262144), Nt = e;
      } else Nt = 536870912;
    return e = St.current, e !== null && (e.flags |= 32), Nt;
  }
  function ht(e, t, n) {
    (e === ke && (Te === 2 || Te === 9) || e.cancelPendingCommit !== null) && (Ql(e, 0), kn(
      e,
      me,
      Nt,
      !1
    )), da(e, n), ((Ce & 2) === 0 || e !== ke) && (e === ke && ((Ce & 2) === 0 && (il |= n), Ye === 4 && kn(
      e,
      me,
      Nt,
      !1
    )), Qt(e));
  }
  function Wf(e, t, n) {
    if ((Ce & 6) !== 0) throw Error(c(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ua(e, t), a = l ? F2(e, t) : Go(e, t, !0), r = l;
    do {
      if (a === 0) {
        Yl && !l && kn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, r && !K2(n)) {
          a = Go(e, t, !1), r = !1;
          continue;
        }
        if (a === 2) {
          if (r = t, e.errorRecoveryDisabledLanes & r)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var m = e;
              a = Va;
              var x = m.current.memoizedState.isDehydrated;
              if (x && (Ql(m, d).flags |= 256), d = Go(
                m,
                d,
                !1
              ), d !== 2) {
                if (Do && !x) {
                  m.errorRecoveryDisabledLanes |= r, il |= r, a = 4;
                  break e;
                }
                r = mt, mt = a, r !== null && (mt === null ? mt = r : mt.push.apply(
                  mt,
                  r
                ));
              }
              a = d;
            }
            if (r = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Ql(e, 0), kn(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, r = a, r) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              kn(
                l,
                t,
                Nt,
                !_n
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
          if ((t & 62914560) === t && (a = si + 300 - pt(), 10 < a)) {
            if (kn(
              l,
              t,
              Nt,
              !_n
            ), vr(l, 0, !0) !== 0) break e;
            dn = t, l.timeoutHandle = z0(
              If.bind(
                null,
                l,
                n,
                mt,
                ci,
                Bo,
                t,
                Nt,
                il,
                Gl,
                _n,
                r,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break e;
          }
          If(
            l,
            n,
            mt,
            ci,
            Bo,
            t,
            Nt,
            il,
            Gl,
            _n,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Qt(e);
  }
  function If(e, t, n, l, a, r, d, m, x, _, w, O, z, A) {
    if (e.timeoutHandle = -1, O = t.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Jt
      }, Qf(
        t,
        r,
        O
      );
      var Q = (r & 62914560) === r ? si - pt() : (r & 4194048) === r ? Kf - pt() : 0;
      if (Q = Mh(
        O,
        Q
      ), Q !== null) {
        dn = r, e.cancelPendingCommit = Q(
          i0.bind(
            null,
            e,
            t,
            r,
            n,
            l,
            a,
            d,
            m,
            x,
            w,
            O,
            null,
            z,
            A
          )
        ), kn(e, r, d, !_);
        return;
      }
    }
    i0(
      e,
      t,
      r,
      n,
      l,
      a,
      d,
      m,
      x
    );
  }
  function K2(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var a = n[l], r = a.getSnapshot;
          a = a.value;
          try {
            if (!vt(r(), a)) return !1;
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
  function kn(e, t, n, l) {
    t &= ~Uo, t &= ~il, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var a = t; 0 < a; ) {
      var r = 31 - yt(a), d = 1 << r;
      l[r] = -1, a &= ~d;
    }
    n !== 0 && su(e, n, t);
  }
  function ui() {
    return (Ce & 6) === 0 ? (Xa(0), !1) : !0;
  }
  function Yo() {
    if (de !== null) {
      if (Te === 0)
        var e = de.return;
      else
        e = de, Pt = Wn = null, no(e), Rl = null, _a = 0, e = de;
      for (; e !== null; )
        Af(e.alternate, e), e = e.return;
      de = null;
    }
  }
  function Ql(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, hh(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), dn = 0, Yo(), ke = e, de = n = Wt(e.current, null), me = t, Te = 0, Ct = null, _n = !1, Yl = ua(e, t), Do = !1, Gl = Nt = Uo = il = zn = Ye = 0, mt = Va = null, Bo = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var a = 31 - yt(l), r = 1 << a;
        t |= e[a], l &= ~r;
      }
    return un = t, kr(), n;
  }
  function Pf(e, t) {
    se = null, C.H = Da, t === Ol || t === Lr ? (t = hd(), Te = 3) : t === Qs ? (t = hd(), Te = 4) : Te = t === vo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ct = t, de === null && (Ye = 1, Pr(
      e,
      wt(t, e.current)
    ));
  }
  function e0() {
    var e = St.current;
    return e === null ? !0 : (me & 4194048) === me ? Rt === null : (me & 62914560) === me || (me & 536870912) !== 0 ? e === Rt : !1;
  }
  function t0() {
    var e = C.H;
    return C.H = Da, e === null ? Da : e;
  }
  function n0() {
    var e = C.A;
    return C.A = $2, e;
  }
  function di() {
    Ye = 4, _n || (me & 4194048) !== me && St.current !== null || (Yl = !0), (zn & 134217727) === 0 && (il & 134217727) === 0 || ke === null || kn(
      ke,
      me,
      Nt,
      !1
    );
  }
  function Go(e, t, n) {
    var l = Ce;
    Ce |= 2;
    var a = t0(), r = n0();
    (ke !== e || me !== t) && (ci = null, Ql(e, t)), t = !1;
    var d = Ye;
    e: do
      try {
        if (Te !== 0 && de !== null) {
          var m = de, x = Ct;
          switch (Te) {
            case 8:
              Yo(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              St.current === null && (t = !0);
              var _ = Te;
              if (Te = 0, Ct = null, Xl(e, m, x, _), n && Yl) {
                d = 0;
                break e;
              }
              break;
            default:
              _ = Te, Te = 0, Ct = null, Xl(e, m, x, _);
          }
        }
        J2(), d = Ye;
        break;
      } catch (w) {
        Pf(e, w);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Pt = Wn = null, Ce = l, C.H = a, C.A = r, de === null && (ke = null, me = 0, kr()), d;
  }
  function J2() {
    for (; de !== null; ) l0(de);
  }
  function F2(e, t) {
    var n = Ce;
    Ce |= 2;
    var l = t0(), a = n0();
    ke !== e || me !== t ? (ci = null, oi = pt() + 500, Ql(e, t)) : Yl = ua(
      e,
      t
    );
    e: do
      try {
        if (Te !== 0 && de !== null) {
          t = de;
          var r = Ct;
          t: switch (Te) {
            case 1:
              Te = 0, Ct = null, Xl(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (fd(r)) {
                Te = 0, Ct = null, a0(t);
                break;
              }
              t = function() {
                Te !== 2 && Te !== 9 || ke !== e || (Te = 7), Qt(e);
              }, r.then(t, t);
              break e;
            case 3:
              Te = 7;
              break e;
            case 4:
              Te = 5;
              break e;
            case 7:
              fd(r) ? (Te = 0, Ct = null, a0(t)) : (Te = 0, Ct = null, Xl(e, t, r, 7));
              break;
            case 5:
              var d = null;
              switch (de.tag) {
                case 26:
                  d = de.memoizedState;
                case 5:
                case 27:
                  var m = de;
                  if (d ? V0(d) : m.stateNode.complete) {
                    Te = 0, Ct = null;
                    var x = m.sibling;
                    if (x !== null) de = x;
                    else {
                      var _ = m.return;
                      _ !== null ? (de = _, fi(_)) : de = null;
                    }
                    break t;
                  }
              }
              Te = 0, Ct = null, Xl(e, t, r, 5);
              break;
            case 6:
              Te = 0, Ct = null, Xl(e, t, r, 6);
              break;
            case 8:
              Yo(), Ye = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        W2();
        break;
      } catch (w) {
        Pf(e, w);
      }
    while (!0);
    return Pt = Wn = null, C.H = l, C.A = a, Ce = n, de !== null ? 0 : (ke = null, me = 0, kr(), Ye);
  }
  function W2() {
    for (; de !== null && !bm(); )
      l0(de);
  }
  function l0(e) {
    var t = _f(e.alternate, e, un);
    e.memoizedProps = e.pendingProps, t === null ? fi(e) : de = t;
  }
  function a0(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Sf(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          me
        );
        break;
      case 11:
        t = Sf(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          me
        );
        break;
      case 5:
        no(t);
      default:
        Af(n, t), t = de = td(t, un), t = _f(n, t, un);
    }
    e.memoizedProps = e.pendingProps, t === null ? fi(e) : de = t;
  }
  function Xl(e, t, n, l) {
    Pt = Wn = null, no(t), Rl = null, _a = 0;
    var a = t.return;
    try {
      if (L2(
        e,
        a,
        t,
        n,
        me
      )) {
        Ye = 1, Pr(
          e,
          wt(n, e.current)
        ), de = null;
        return;
      }
    } catch (r) {
      if (a !== null) throw de = a, r;
      Ye = 1, Pr(
        e,
        wt(n, e.current)
      ), de = null;
      return;
    }
    t.flags & 32768 ? (pe || l === 1 ? e = !0 : Yl || (me & 536870912) !== 0 ? e = !1 : (_n = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = St.current, l !== null && l.tag === 13 && (l.flags |= 16384))), r0(t, e)) : fi(t);
  }
  function fi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        r0(
          t,
          _n
        );
        return;
      }
      e = t.return;
      var n = G2(
        t.alternate,
        t,
        un
      );
      if (n !== null) {
        de = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        de = t;
        return;
      }
      de = t = e;
    } while (t !== null);
    Ye === 0 && (Ye = 5);
  }
  function r0(e, t) {
    do {
      var n = V2(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, de = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        de = e;
        return;
      }
      de = e = n;
    } while (e !== null);
    Ye = 6, de = null;
  }
  function i0(e, t, n, l, a, r, d, m, x) {
    e.cancelPendingCommit = null;
    do
      mi();
    while (Je !== 0);
    if ((Ce & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (r = t.lanes | t.childLanes, r |= As, wm(
        e,
        n,
        r,
        d,
        m,
        x
      ), e === ke && (de = ke = null, me = 0), Vl = t, wn = e, dn = n, Ho = r, Lo = a, Jf = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, th(gr, function() {
        return d0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = C.T, C.T = null, a = U.p, U.p = 2, d = Ce, Ce |= 4;
        try {
          Q2(e, t, n);
        } finally {
          Ce = d, U.p = a, C.T = l;
        }
      }
      Je = 1, s0(), o0(), c0();
    }
  }
  function s0() {
    if (Je === 1) {
      Je = 0;
      var e = wn, t = Vl, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = C.T, C.T = null;
        var l = U.p;
        U.p = 2;
        var a = Ce;
        Ce |= 4;
        try {
          Yf(t, e);
          var r = ec, d = $u(e.containerInfo), m = r.focusedElem, x = r.selectionRange;
          if (d !== m && m && m.ownerDocument && Xu(
            m.ownerDocument.documentElement,
            m
          )) {
            if (x !== null && Ns(m)) {
              var _ = x.start, w = x.end;
              if (w === void 0 && (w = _), "selectionStart" in m)
                m.selectionStart = _, m.selectionEnd = Math.min(
                  w,
                  m.value.length
                );
              else {
                var O = m.ownerDocument || document, z = O && O.defaultView || window;
                if (z.getSelection) {
                  var A = z.getSelection(), Q = m.textContent.length, P = Math.min(x.start, Q), we = x.end === void 0 ? P : Math.min(x.end, Q);
                  !A.extend && P > we && (d = we, we = P, P = d);
                  var N = Qu(
                    m,
                    P
                  ), S = Qu(
                    m,
                    we
                  );
                  if (N && S && (A.rangeCount !== 1 || A.anchorNode !== N.node || A.anchorOffset !== N.offset || A.focusNode !== S.node || A.focusOffset !== S.offset)) {
                    var T = O.createRange();
                    T.setStart(N.node, N.offset), A.removeAllRanges(), P > we ? (A.addRange(T), A.extend(S.node, S.offset)) : (T.setEnd(S.node, S.offset), A.addRange(T));
                  }
                }
              }
            }
            for (O = [], A = m; A = A.parentNode; )
              A.nodeType === 1 && O.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < O.length; m++) {
              var k = O[m];
              k.element.scrollLeft = k.left, k.element.scrollTop = k.top;
            }
          }
          Ei = !!Po, ec = Po = null;
        } finally {
          Ce = a, U.p = l, C.T = n;
        }
      }
      e.current = t, Je = 2;
    }
  }
  function o0() {
    if (Je === 2) {
      Je = 0;
      var e = wn, t = Vl, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = C.T, C.T = null;
        var l = U.p;
        U.p = 2;
        var a = Ce;
        Ce |= 4;
        try {
          Uf(e, t.alternate, t);
        } finally {
          Ce = a, U.p = l, C.T = n;
        }
      }
      Je = 3;
    }
  }
  function c0() {
    if (Je === 4 || Je === 3) {
      Je = 0, Sm();
      var e = wn, t = Vl, n = dn, l = Jf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Je = 5 : (Je = 0, Vl = wn = null, u0(e, e.pendingLanes));
      var a = e.pendingLanes;
      if (a === 0 && (An = null), rs(n), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            ca,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = C.T, a = U.p, U.p = 2, C.T = null;
        try {
          for (var r = e.onRecoverableError, d = 0; d < l.length; d++) {
            var m = l[d];
            r(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          C.T = t, U.p = a;
        }
      }
      (dn & 3) !== 0 && mi(), Qt(e), a = e.pendingLanes, (n & 261930) !== 0 && (a & 42) !== 0 ? e === qo ? Qa++ : (Qa = 0, qo = e) : Qa = 0, Xa(0);
    }
  }
  function u0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ea(t)));
  }
  function mi() {
    return s0(), o0(), c0(), d0();
  }
  function d0() {
    if (Je !== 5) return !1;
    var e = wn, t = Ho;
    Ho = 0;
    var n = rs(dn), l = C.T, a = U.p;
    try {
      U.p = 32 > n ? 32 : n, C.T = null, n = Lo, Lo = null;
      var r = wn, d = dn;
      if (Je = 0, Vl = wn = null, dn = 0, (Ce & 6) !== 0) throw Error(c(331));
      var m = Ce;
      if (Ce |= 4, $f(r.current), Vf(
        r,
        r.current,
        d,
        n
      ), Ce = m, Xa(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(ca, r);
        } catch {
        }
      return !0;
    } finally {
      U.p = a, C.T = l, u0(e, t);
    }
  }
  function f0(e, t, n) {
    t = wt(n, t), t = yo(e.stateNode, t, 2), e = Cn(e, t, 2), e !== null && (da(e, 2), Qt(e));
  }
  function _e(e, t, n) {
    if (e.tag === 3)
      f0(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          f0(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (An === null || !An.has(l))) {
            e = wt(n, e), n = mf(2), l = Cn(t, n, 2), l !== null && (hf(
              n,
              l,
              t,
              e
            ), da(l, 2), Qt(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Vo(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Z2();
      var a = /* @__PURE__ */ new Set();
      l.set(t, a);
    } else
      a = l.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(t, a));
    a.has(n) || (Do = !0, a.add(n), e = I2.bind(null, e, t, n), t.then(e, e));
  }
  function I2(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, ke === e && (me & n) === n && (Ye === 4 || Ye === 3 && (me & 62914560) === me && 300 > pt() - si ? (Ce & 2) === 0 && Ql(e, 0) : Uo |= n, Gl === me && (Gl = 0)), Qt(e);
  }
  function m0(e, t) {
    t === 0 && (t = iu()), e = Kn(e, t), e !== null && (da(e, t), Qt(e));
  }
  function P2(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), m0(e, n);
  }
  function eh(e, t) {
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
    l !== null && l.delete(t), m0(e, n);
  }
  function th(e, t) {
    return ts(e, t);
  }
  var hi = null, $l = null, Qo = !1, gi = !1, Xo = !1, Mn = 0;
  function Qt(e) {
    e !== $l && e.next === null && ($l === null ? hi = $l = e : $l = $l.next = e), gi = !0, Qo || (Qo = !0, lh());
  }
  function Xa(e, t) {
    if (!Xo && gi) {
      Xo = !0;
      do
        for (var n = !1, l = hi; l !== null; ) {
          if (e !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var r = 0;
            else {
              var d = l.suspendedLanes, m = l.pingedLanes;
              r = (1 << 31 - yt(42 | e) + 1) - 1, r &= a & ~(d & ~m), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (n = !0, x0(l, r));
          } else
            r = me, r = vr(
              l,
              l === ke ? r : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (r & 3) === 0 || ua(l, r) || (n = !0, x0(l, r));
          l = l.next;
        }
      while (n);
      Xo = !1;
    }
  }
  function nh() {
    h0();
  }
  function h0() {
    gi = Qo = !1;
    var e = 0;
    Mn !== 0 && mh() && (e = Mn);
    for (var t = pt(), n = null, l = hi; l !== null; ) {
      var a = l.next, r = g0(l, t);
      r === 0 ? (l.next = null, n === null ? hi = a : n.next = a, a === null && ($l = n)) : (n = l, (e !== 0 || (r & 3) !== 0) && (gi = !0)), l = a;
    }
    Je !== 0 && Je !== 5 || Xa(e), Mn !== 0 && (Mn = 0);
  }
  function g0(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, a = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r; ) {
      var d = 31 - yt(r), m = 1 << d, x = a[d];
      x === -1 ? ((m & n) === 0 || (m & l) !== 0) && (a[d] = Am(m, t)) : x <= t && (e.expiredLanes |= m), r &= ~m;
    }
    if (t = ke, n = me, n = vr(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (Te === 2 || Te === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ns(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || ua(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && ns(l), rs(n)) {
        case 2:
        case 8:
          n = au;
          break;
        case 32:
          n = gr;
          break;
        case 268435456:
          n = ru;
          break;
        default:
          n = gr;
      }
      return l = p0.bind(null, e), n = ts(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ns(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function p0(e, t) {
    if (Je !== 0 && Je !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (mi() && e.callbackNode !== n)
      return null;
    var l = me;
    return l = vr(
      e,
      e === ke ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Wf(e, l, t), g0(e, pt()), e.callbackNode != null && e.callbackNode === n ? p0.bind(null, e) : null);
  }
  function x0(e, t) {
    if (mi()) return null;
    Wf(e, t, !0);
  }
  function lh() {
    gh(function() {
      (Ce & 6) !== 0 ? ts(
        lu,
        nh
      ) : h0();
    });
  }
  function $o() {
    if (Mn === 0) {
      var e = kl;
      e === 0 && (e = pr, pr <<= 1, (pr & 261888) === 0 && (pr = 256)), Mn = e;
    }
    return Mn;
  }
  function y0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Cr("" + e);
  }
  function v0(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function ah(e, t, n, l, a) {
    if (t === "submit" && n && n.stateNode === a) {
      var r = y0(
        (a[ot] || null).action
      ), d = l.submitter;
      d && (t = (t = d[ot] || null) ? y0(t.formAction) : d.getAttribute("formAction"), t !== null && (r = t, d = null));
      var m = new _r(
        "action",
        "action",
        null,
        l,
        a
      );
      e.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Mn !== 0) {
                  var x = d ? v0(a, d) : new FormData(a);
                  fo(
                    n,
                    {
                      pending: !0,
                      data: x,
                      method: a.method,
                      action: r
                    },
                    null,
                    x
                  );
                }
              } else
                typeof r == "function" && (m.preventDefault(), x = d ? v0(a, d) : new FormData(a), fo(
                  n,
                  {
                    pending: !0,
                    data: x,
                    method: a.method,
                    action: r
                  },
                  r,
                  x
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var Zo = 0; Zo < zs.length; Zo++) {
    var Ko = zs[Zo], rh = Ko.toLowerCase(), ih = Ko[0].toUpperCase() + Ko.slice(1);
    Ht(
      rh,
      "on" + ih
    );
  }
  Ht(Ju, "onAnimationEnd"), Ht(Fu, "onAnimationIteration"), Ht(Wu, "onAnimationStart"), Ht("dblclick", "onDoubleClick"), Ht("focusin", "onFocus"), Ht("focusout", "onBlur"), Ht(j2, "onTransitionRun"), Ht(C2, "onTransitionStart"), Ht(N2, "onTransitionCancel"), Ht(Iu, "onTransitionEnd"), xl("onMouseEnter", ["mouseout", "mouseover"]), xl("onMouseLeave", ["mouseout", "mouseover"]), xl("onPointerEnter", ["pointerout", "pointerover"]), xl("onPointerLeave", ["pointerout", "pointerover"]), Qn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Qn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Qn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Qn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Qn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Qn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var $a = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), sh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($a)
  );
  function b0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], a = l.event;
      l = l.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var d = l.length - 1; 0 <= d; d--) {
            var m = l[d], x = m.instance, _ = m.currentTarget;
            if (m = m.listener, x !== r && a.isPropagationStopped())
              break e;
            r = m, a.currentTarget = _;
            try {
              r(a);
            } catch (w) {
              wr(w);
            }
            a.currentTarget = null, r = x;
          }
        else
          for (d = 0; d < l.length; d++) {
            if (m = l[d], x = m.instance, _ = m.currentTarget, m = m.listener, x !== r && a.isPropagationStopped())
              break e;
            r = m, a.currentTarget = _;
            try {
              r(a);
            } catch (w) {
              wr(w);
            }
            a.currentTarget = null, r = x;
          }
      }
    }
  }
  function fe(e, t) {
    var n = t[is];
    n === void 0 && (n = t[is] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (S0(t, e, 2, !1), n.add(l));
  }
  function Jo(e, t, n) {
    var l = 0;
    t && (l |= 4), S0(
      n,
      e,
      l,
      t
    );
  }
  var pi = "_reactListening" + Math.random().toString(36).slice(2);
  function Fo(e) {
    if (!e[pi]) {
      e[pi] = !0, mu.forEach(function(n) {
        n !== "selectionchange" && (sh.has(n) || Jo(n, !1, e), Jo(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[pi] || (t[pi] = !0, Jo("selectionchange", !1, t));
    }
  }
  function S0(e, t, n, l) {
    switch (F0(t)) {
      case 2:
        var a = Dh;
        break;
      case 8:
        a = Uh;
        break;
      default:
        a = dc;
    }
    n = a.bind(
      null,
      t,
      n,
      e
    ), a = void 0, !gs || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), l ? a !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function Wo(e, t, n, l, a) {
    var r = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var d = l.tag;
        if (d === 3 || d === 4) {
          var m = l.stateNode.containerInfo;
          if (m === a) break;
          if (d === 4)
            for (d = l.return; d !== null; ) {
              var x = d.tag;
              if ((x === 3 || x === 4) && d.stateNode.containerInfo === a)
                return;
              d = d.return;
            }
          for (; m !== null; ) {
            if (d = hl(m), d === null) return;
            if (x = d.tag, x === 5 || x === 6 || x === 26 || x === 27) {
              l = r = d;
              continue e;
            }
            m = m.parentNode;
          }
        }
        l = l.return;
      }
    Eu(function() {
      var _ = r, w = ms(n), O = [];
      e: {
        var z = Pu.get(e);
        if (z !== void 0) {
          var A = _r, Q = e;
          switch (e) {
            case "keypress":
              if (Er(n) === 0) break e;
            case "keydown":
            case "keyup":
              A = e2;
              break;
            case "focusin":
              Q = "focus", A = vs;
              break;
            case "focusout":
              Q = "blur", A = vs;
              break;
            case "beforeblur":
            case "afterblur":
              A = vs;
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
              A = zu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Gm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = l2;
              break;
            case Ju:
            case Fu:
            case Wu:
              A = Xm;
              break;
            case Iu:
              A = r2;
              break;
            case "scroll":
            case "scrollend":
              A = qm;
              break;
            case "wheel":
              A = s2;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Zm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = wu;
              break;
            case "toggle":
            case "beforetoggle":
              A = c2;
          }
          var P = (t & 4) !== 0, we = !P && (e === "scroll" || e === "scrollend"), N = P ? z !== null ? z + "Capture" : null : z;
          P = [];
          for (var S = _, T; S !== null; ) {
            var k = S;
            if (T = k.stateNode, k = k.tag, k !== 5 && k !== 26 && k !== 27 || T === null || N === null || (k = ha(S, N), k != null && P.push(
              Za(S, k, T)
            )), we) break;
            S = S.return;
          }
          0 < P.length && (z = new A(
            z,
            Q,
            null,
            n,
            w
          ), O.push({ event: z, listeners: P }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", A = e === "mouseout" || e === "pointerout", z && n !== fs && (Q = n.relatedTarget || n.fromElement) && (hl(Q) || Q[ml]))
            break e;
          if ((A || z) && (z = w.window === w ? w : (z = w.ownerDocument) ? z.defaultView || z.parentWindow : window, A ? (Q = n.relatedTarget || n.toElement, A = _, Q = Q ? hl(Q) : null, Q !== null && (we = h(Q), P = Q.tag, Q !== we || P !== 5 && P !== 27 && P !== 6) && (Q = null)) : (A = null, Q = _), A !== Q)) {
            if (P = zu, k = "onMouseLeave", N = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (P = wu, k = "onPointerLeave", N = "onPointerEnter", S = "pointer"), we = A == null ? z : ma(A), T = Q == null ? z : ma(Q), z = new P(
              k,
              S + "leave",
              A,
              n,
              w
            ), z.target = we, z.relatedTarget = T, k = null, hl(w) === _ && (P = new P(
              N,
              S + "enter",
              Q,
              n,
              w
            ), P.target = T, P.relatedTarget = we, k = P), we = k, A && Q)
              t: {
                for (P = oh, N = A, S = Q, T = 0, k = N; k; k = P(k))
                  T++;
                k = 0;
                for (var W = S; W; W = P(W))
                  k++;
                for (; 0 < T - k; )
                  N = P(N), T--;
                for (; 0 < k - T; )
                  S = P(S), k--;
                for (; T--; ) {
                  if (N === S || S !== null && N === S.alternate) {
                    P = N;
                    break t;
                  }
                  N = P(N), S = P(S);
                }
                P = null;
              }
            else P = null;
            A !== null && j0(
              O,
              z,
              A,
              P,
              !1
            ), Q !== null && we !== null && j0(
              O,
              we,
              Q,
              P,
              !0
            );
          }
        }
        e: {
          if (z = _ ? ma(_) : window, A = z.nodeName && z.nodeName.toLowerCase(), A === "select" || A === "input" && z.type === "file")
            var xe = Hu;
          else if (Uu(z))
            if (Lu)
              xe = v2;
            else {
              xe = x2;
              var Z = p2;
            }
          else
            A = z.nodeName, !A || A.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? _ && ds(_.elementType) && (xe = Hu) : xe = y2;
          if (xe && (xe = xe(e, _))) {
            Bu(
              O,
              xe,
              n,
              w
            );
            break e;
          }
          Z && Z(e, z, _), e === "focusout" && _ && z.type === "number" && _.memoizedProps.value != null && us(z, "number", z.value);
        }
        switch (Z = _ ? ma(_) : window, e) {
          case "focusin":
            (Uu(Z) || Z.contentEditable === "true") && (Cl = Z, Es = _, ja = null);
            break;
          case "focusout":
            ja = Es = Cl = null;
            break;
          case "mousedown":
            Ts = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ts = !1, Zu(O, n, w);
            break;
          case "selectionchange":
            if (S2) break;
          case "keydown":
          case "keyup":
            Zu(O, n, w);
        }
        var oe;
        if (Ss)
          e: {
            switch (e) {
              case "compositionstart":
                var he = "onCompositionStart";
                break e;
              case "compositionend":
                he = "onCompositionEnd";
                break e;
              case "compositionupdate":
                he = "onCompositionUpdate";
                break e;
            }
            he = void 0;
          }
        else
          jl ? Ru(e, n) && (he = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (he = "onCompositionStart");
        he && (ku && n.locale !== "ko" && (jl || he !== "onCompositionStart" ? he === "onCompositionEnd" && jl && (oe = Tu()) : (pn = w, ps = "value" in pn ? pn.value : pn.textContent, jl = !0)), Z = xi(_, he), 0 < Z.length && (he = new Au(
          he,
          e,
          null,
          n,
          w
        ), O.push({ event: he, listeners: Z }), oe ? he.data = oe : (oe = Du(n), oe !== null && (he.data = oe)))), (oe = d2 ? f2(e, n) : m2(e, n)) && (he = xi(_, "onBeforeInput"), 0 < he.length && (Z = new Au(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          w
        ), O.push({
          event: Z,
          listeners: he
        }), Z.data = oe)), ah(
          O,
          e,
          _,
          n,
          w
        );
      }
      b0(O, t);
    });
  }
  function Za(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function xi(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var a = e, r = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || r === null || (a = ha(e, n), a != null && l.unshift(
        Za(e, a, r)
      ), a = ha(e, t), a != null && l.push(
        Za(e, a, r)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function oh(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function j0(e, t, n, l, a) {
    for (var r = t._reactName, d = []; n !== null && n !== l; ) {
      var m = n, x = m.alternate, _ = m.stateNode;
      if (m = m.tag, x !== null && x === l) break;
      m !== 5 && m !== 26 && m !== 27 || _ === null || (x = _, a ? (_ = ha(n, r), _ != null && d.unshift(
        Za(n, _, x)
      )) : a || (_ = ha(n, r), _ != null && d.push(
        Za(n, _, x)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var ch = /\r\n?/g, uh = /\u0000|\uFFFD/g;
  function C0(e) {
    return (typeof e == "string" ? e : "" + e).replace(ch, `
`).replace(uh, "");
  }
  function N0(e, t) {
    return t = C0(t), C0(e) === t;
  }
  function Ae(e, t, n, l, a, r) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || vl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && vl(e, "" + l);
        break;
      case "className":
        Sr(e, "class", l);
        break;
      case "tabIndex":
        Sr(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Sr(e, n, l);
        break;
      case "style":
        Cu(e, l, r);
        break;
      case "data":
        if (t !== "object") {
          Sr(e, "data", l);
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
        l = Cr("" + l), e.setAttribute(n, l);
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
          typeof r == "function" && (n === "formAction" ? (t !== "input" && Ae(e, t, "name", a.name, a, null), Ae(
            e,
            t,
            "formEncType",
            a.formEncType,
            a,
            null
          ), Ae(
            e,
            t,
            "formMethod",
            a.formMethod,
            a,
            null
          ), Ae(
            e,
            t,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (Ae(e, t, "encType", a.encType, a, null), Ae(e, t, "method", a.method, a, null), Ae(e, t, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Cr("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = Jt);
        break;
      case "onScroll":
        l != null && fe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && fe("scrollend", e);
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
        n = Cr("" + l), e.setAttributeNS(
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
        fe("beforetoggle", e), fe("toggle", e), br(e, "popover", l);
        break;
      case "xlinkActuate":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        br(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Hm.get(n) || n, br(e, n, l));
    }
  }
  function Io(e, t, n, l, a, r) {
    switch (n) {
      case "style":
        Cu(e, l, r);
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
        typeof l == "string" ? vl(e, l) : (typeof l == "number" || typeof l == "bigint") && vl(e, "" + l);
        break;
      case "onScroll":
        l != null && fe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && fe("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Jt);
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
        if (!hu.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), r = e[ot] || null, r = r != null ? r[n] : null, typeof r == "function" && e.removeEventListener(t, r, a), typeof l == "function")) {
              typeof r != "function" && r !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, a);
              break e;
            }
            n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : br(e, n, l);
          }
    }
  }
  function nt(e, t, n) {
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
        fe("error", e), fe("load", e);
        var l = !1, a = !1, r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var d = n[r];
            if (d != null)
              switch (r) {
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
                  Ae(e, t, r, d, n, null);
              }
          }
        a && Ae(e, t, "srcSet", n.srcSet, n, null), l && Ae(e, t, "src", n.src, n, null);
        return;
      case "input":
        fe("invalid", e);
        var m = r = d = a = null, x = null, _ = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var w = n[l];
            if (w != null)
              switch (l) {
                case "name":
                  a = w;
                  break;
                case "type":
                  d = w;
                  break;
                case "checked":
                  x = w;
                  break;
                case "defaultChecked":
                  _ = w;
                  break;
                case "value":
                  r = w;
                  break;
                case "defaultValue":
                  m = w;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (w != null)
                    throw Error(c(137, t));
                  break;
                default:
                  Ae(e, t, l, w, n, null);
              }
          }
        vu(
          e,
          r,
          m,
          x,
          _,
          d,
          a,
          !1
        );
        return;
      case "select":
        fe("invalid", e), l = d = r = null;
        for (a in n)
          if (n.hasOwnProperty(a) && (m = n[a], m != null))
            switch (a) {
              case "value":
                r = m;
                break;
              case "defaultValue":
                d = m;
                break;
              case "multiple":
                l = m;
              default:
                Ae(e, t, a, m, n, null);
            }
        t = r, n = d, e.multiple = !!l, t != null ? yl(e, !!l, t, !1) : n != null && yl(e, !!l, n, !0);
        return;
      case "textarea":
        fe("invalid", e), r = a = l = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (m = n[d], m != null))
            switch (d) {
              case "value":
                l = m;
                break;
              case "defaultValue":
                a = m;
                break;
              case "children":
                r = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(c(91));
                break;
              default:
                Ae(e, t, d, m, n, null);
            }
        Su(e, l, a, r);
        return;
      case "option":
        for (x in n)
          if (n.hasOwnProperty(x) && (l = n[x], l != null))
            switch (x) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ae(e, t, x, l, n, null);
            }
        return;
      case "dialog":
        fe("beforetoggle", e), fe("toggle", e), fe("cancel", e), fe("close", e);
        break;
      case "iframe":
      case "object":
        fe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < $a.length; l++)
          fe($a[l], e);
        break;
      case "image":
        fe("error", e), fe("load", e);
        break;
      case "details":
        fe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        fe("error", e), fe("load", e);
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
        for (_ in n)
          if (n.hasOwnProperty(_) && (l = n[_], l != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Ae(e, t, _, l, n, null);
            }
        return;
      default:
        if (ds(t)) {
          for (w in n)
            n.hasOwnProperty(w) && (l = n[w], l !== void 0 && Io(
              e,
              t,
              w,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (l = n[m], l != null && Ae(e, t, m, l, n, null));
  }
  function dh(e, t, n, l) {
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
        var a = null, r = null, d = null, m = null, x = null, _ = null, w = null;
        for (A in n) {
          var O = n[A];
          if (n.hasOwnProperty(A) && O != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = O;
              default:
                l.hasOwnProperty(A) || Ae(e, t, A, null, l, O);
            }
        }
        for (var z in l) {
          var A = l[z];
          if (O = n[z], l.hasOwnProperty(z) && (A != null || O != null))
            switch (z) {
              case "type":
                r = A;
                break;
              case "name":
                a = A;
                break;
              case "checked":
                _ = A;
                break;
              case "defaultChecked":
                w = A;
                break;
              case "value":
                d = A;
                break;
              case "defaultValue":
                m = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(c(137, t));
                break;
              default:
                A !== O && Ae(
                  e,
                  t,
                  z,
                  A,
                  l,
                  O
                );
            }
        }
        cs(
          e,
          d,
          m,
          x,
          _,
          w,
          r,
          a
        );
        return;
      case "select":
        A = d = m = z = null;
        for (r in n)
          if (x = n[r], n.hasOwnProperty(r) && x != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                A = x;
              default:
                l.hasOwnProperty(r) || Ae(
                  e,
                  t,
                  r,
                  null,
                  l,
                  x
                );
            }
        for (a in l)
          if (r = l[a], x = n[a], l.hasOwnProperty(a) && (r != null || x != null))
            switch (a) {
              case "value":
                z = r;
                break;
              case "defaultValue":
                m = r;
                break;
              case "multiple":
                d = r;
              default:
                r !== x && Ae(
                  e,
                  t,
                  a,
                  r,
                  l,
                  x
                );
            }
        t = m, n = d, l = A, z != null ? yl(e, !!n, z, !1) : !!l != !!n && (t != null ? yl(e, !!n, t, !0) : yl(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        A = z = null;
        for (m in n)
          if (a = n[m], n.hasOwnProperty(m) && a != null && !l.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ae(e, t, m, null, l, a);
            }
        for (d in l)
          if (a = l[d], r = n[d], l.hasOwnProperty(d) && (a != null || r != null))
            switch (d) {
              case "value":
                z = a;
                break;
              case "defaultValue":
                A = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(c(91));
                break;
              default:
                a !== r && Ae(e, t, d, a, l, r);
            }
        bu(e, z, A);
        return;
      case "option":
        for (var Q in n)
          if (z = n[Q], n.hasOwnProperty(Q) && z != null && !l.hasOwnProperty(Q))
            switch (Q) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ae(
                  e,
                  t,
                  Q,
                  null,
                  l,
                  z
                );
            }
        for (x in l)
          if (z = l[x], A = n[x], l.hasOwnProperty(x) && z !== A && (z != null || A != null))
            switch (x) {
              case "selected":
                e.selected = z && typeof z != "function" && typeof z != "symbol";
                break;
              default:
                Ae(
                  e,
                  t,
                  x,
                  z,
                  l,
                  A
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
        for (var P in n)
          z = n[P], n.hasOwnProperty(P) && z != null && !l.hasOwnProperty(P) && Ae(e, t, P, null, l, z);
        for (_ in l)
          if (z = l[_], A = n[_], l.hasOwnProperty(_) && z !== A && (z != null || A != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(c(137, t));
                break;
              default:
                Ae(
                  e,
                  t,
                  _,
                  z,
                  l,
                  A
                );
            }
        return;
      default:
        if (ds(t)) {
          for (var we in n)
            z = n[we], n.hasOwnProperty(we) && z !== void 0 && !l.hasOwnProperty(we) && Io(
              e,
              t,
              we,
              void 0,
              l,
              z
            );
          for (w in l)
            z = l[w], A = n[w], !l.hasOwnProperty(w) || z === A || z === void 0 && A === void 0 || Io(
              e,
              t,
              w,
              z,
              l,
              A
            );
          return;
        }
    }
    for (var N in n)
      z = n[N], n.hasOwnProperty(N) && z != null && !l.hasOwnProperty(N) && Ae(e, t, N, null, l, z);
    for (O in l)
      z = l[O], A = n[O], !l.hasOwnProperty(O) || z === A || z == null && A == null || Ae(e, t, O, z, l, A);
  }
  function E0(e) {
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
  function fh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l], r = a.transferSize, d = a.initiatorType, m = a.duration;
        if (r && m && E0(d)) {
          for (d = 0, m = a.responseEnd, l += 1; l < n.length; l++) {
            var x = n[l], _ = x.startTime;
            if (_ > m) break;
            var w = x.transferSize, O = x.initiatorType;
            w && E0(O) && (x = x.responseEnd, d += w * (x < m ? 1 : (m - _) / (x - _)));
          }
          if (--l, t += 8 * (r + d) / (a.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Po = null, ec = null;
  function yi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function T0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _0(e, t) {
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
  function tc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var nc = null;
  function mh() {
    var e = window.event;
    return e && e.type === "popstate" ? e === nc ? !1 : (nc = e, !0) : (nc = null, !1);
  }
  var z0 = typeof setTimeout == "function" ? setTimeout : void 0, hh = typeof clearTimeout == "function" ? clearTimeout : void 0, A0 = typeof Promise == "function" ? Promise : void 0, gh = typeof queueMicrotask == "function" ? queueMicrotask : typeof A0 < "u" ? function(e) {
    return A0.resolve(null).then(e).catch(ph);
  } : z0;
  function ph(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function On(e) {
    return e === "head";
  }
  function w0(e, t) {
    var n = t, l = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && a.nodeType === 8)
        if (n = a.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(a), Fl(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Ka(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Ka(n);
          for (var r = n.firstChild; r; ) {
            var d = r.nextSibling, m = r.nodeName;
            r[fa] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && r.rel.toLowerCase() === "stylesheet" || n.removeChild(r), r = d;
          }
        } else
          n === "body" && Ka(e.ownerDocument.body);
      n = a;
    } while (n);
    Fl(t);
  }
  function k0(e, t) {
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
  function lc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          lc(n), ss(n);
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
  function xh(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var a = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[fa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (r = e.getAttribute("rel"), r === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (r !== a.rel || e.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || e.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (r = e.getAttribute("src"), (r !== (a.src == null ? null : a.src) || e.getAttribute("type") !== (a.type == null ? null : a.type) || e.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && r && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && e.getAttribute("name") === r)
          return e;
      } else return e;
      if (e = Dt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function yh(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Dt(e.nextSibling), e === null)) return null;
    return e;
  }
  function M0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Dt(e.nextSibling), e === null)) return null;
    return e;
  }
  function ac(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function rc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function vh(e, t) {
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
  function Dt(e) {
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
  var ic = null;
  function O0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Dt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function R0(e) {
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
  function D0(e, t, n) {
    switch (t = yi(n), e) {
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
  function Ka(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ss(e);
  }
  var Ut = /* @__PURE__ */ new Map(), U0 = /* @__PURE__ */ new Set();
  function vi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fn = U.d;
  U.d = {
    f: bh,
    r: Sh,
    D: jh,
    C: Ch,
    L: Nh,
    m: Eh,
    X: _h,
    S: Th,
    M: zh
  };
  function bh() {
    var e = fn.f(), t = ui();
    return e || t;
  }
  function Sh(e) {
    var t = gl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Id(t) : fn.r(e);
  }
  var Zl = typeof document > "u" ? null : document;
  function B0(e, t, n) {
    var l = Zl;
    if (l && typeof t == "string" && t) {
      var a = zt(t);
      a = 'link[rel="' + e + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), U0.has(a) || (U0.add(a), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(a) === null && (t = l.createElement("link"), nt(t, "link", e), Fe(t), l.head.appendChild(t)));
    }
  }
  function jh(e) {
    fn.D(e), B0("dns-prefetch", e, null);
  }
  function Ch(e, t) {
    fn.C(e, t), B0("preconnect", e, t);
  }
  function Nh(e, t, n) {
    fn.L(e, t, n);
    var l = Zl;
    if (l && e && t) {
      var a = 'link[rel="preload"][as="' + zt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + zt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + zt(
        n.imageSizes
      ) + '"]')) : a += '[href="' + zt(e) + '"]';
      var r = a;
      switch (t) {
        case "style":
          r = Kl(e);
          break;
        case "script":
          r = Jl(e);
      }
      Ut.has(r) || (e = b(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Ut.set(r, e), l.querySelector(a) !== null || t === "style" && l.querySelector(Ja(r)) || t === "script" && l.querySelector(Fa(r)) || (t = l.createElement("link"), nt(t, "link", e), Fe(t), l.head.appendChild(t)));
    }
  }
  function Eh(e, t) {
    fn.m(e, t);
    var n = Zl;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", a = 'link[rel="modulepreload"][as="' + zt(l) + '"][href="' + zt(e) + '"]', r = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Jl(e);
      }
      if (!Ut.has(r) && (e = b({ rel: "modulepreload", href: e }, t), Ut.set(r, e), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Fa(r)))
              return;
        }
        l = n.createElement("link"), nt(l, "link", e), Fe(l), n.head.appendChild(l);
      }
    }
  }
  function Th(e, t, n) {
    fn.S(e, t, n);
    var l = Zl;
    if (l && e) {
      var a = pl(l).hoistableStyles, r = Kl(e);
      t = t || "default";
      var d = a.get(r);
      if (!d) {
        var m = { loading: 0, preload: null };
        if (d = l.querySelector(
          Ja(r)
        ))
          m.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Ut.get(r)) && sc(e, n);
          var x = d = l.createElement("link");
          Fe(x), nt(x, "link", e), x._p = new Promise(function(_, w) {
            x.onload = _, x.onerror = w;
          }), x.addEventListener("load", function() {
            m.loading |= 1;
          }), x.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, bi(d, t, l);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: m
        }, a.set(r, d);
      }
    }
  }
  function _h(e, t) {
    fn.X(e, t);
    var n = Zl;
    if (n && e) {
      var l = pl(n).hoistableScripts, a = Jl(e), r = l.get(a);
      r || (r = n.querySelector(Fa(a)), r || (e = b({ src: e, async: !0 }, t), (t = Ut.get(a)) && oc(e, t), r = n.createElement("script"), Fe(r), nt(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, l.set(a, r));
    }
  }
  function zh(e, t) {
    fn.M(e, t);
    var n = Zl;
    if (n && e) {
      var l = pl(n).hoistableScripts, a = Jl(e), r = l.get(a);
      r || (r = n.querySelector(Fa(a)), r || (e = b({ src: e, async: !0, type: "module" }, t), (t = Ut.get(a)) && oc(e, t), r = n.createElement("script"), Fe(r), nt(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, l.set(a, r));
    }
  }
  function H0(e, t, n, l) {
    var a = (a = ue.current) ? vi(a) : null;
    if (!a) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Kl(n.href), n = pl(
          a
        ).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Kl(n.href);
          var r = pl(
            a
          ).hoistableStyles, d = r.get(e);
          if (d || (a = a.ownerDocument || a, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(e, d), (r = a.querySelector(
            Ja(e)
          )) && !r._p && (d.instance = r, d.state.loading = 5), Ut.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Ut.set(e, n), r || Ah(
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
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Jl(n), n = pl(
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
  function Kl(e) {
    return 'href="' + zt(e) + '"';
  }
  function Ja(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function L0(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Ah(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), nt(t, "link", n), Fe(t), e.head.appendChild(t));
  }
  function Jl(e) {
    return '[src="' + zt(e) + '"]';
  }
  function Fa(e) {
    return "script[async]" + e;
  }
  function q0(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + zt(n.href) + '"]'
          );
          if (l)
            return t.instance = l, Fe(l), l;
          var a = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Fe(l), nt(l, "style", a), bi(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          a = Kl(n.href);
          var r = e.querySelector(
            Ja(a)
          );
          if (r)
            return t.state.loading |= 4, t.instance = r, Fe(r), r;
          l = L0(n), (a = Ut.get(a)) && sc(l, a), r = (e.ownerDocument || e).createElement("link"), Fe(r);
          var d = r;
          return d._p = new Promise(function(m, x) {
            d.onload = m, d.onerror = x;
          }), nt(r, "link", l), t.state.loading |= 4, bi(r, n.precedence, e), t.instance = r;
        case "script":
          return r = Jl(n.src), (a = e.querySelector(
            Fa(r)
          )) ? (t.instance = a, Fe(a), a) : (l = n, (a = Ut.get(r)) && (l = b({}, n), oc(l, a)), e = e.ownerDocument || e, a = e.createElement("script"), Fe(a), nt(a, "link", l), e.head.appendChild(a), t.instance = a);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, bi(l, n.precedence, e));
    return t.instance;
  }
  function bi(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = l.length ? l[l.length - 1] : null, r = a, d = 0; d < l.length; d++) {
      var m = l[d];
      if (m.dataset.precedence === t) r = m;
      else if (r !== a) break;
    }
    r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function sc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function oc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Si = null;
  function Y0(e, t, n) {
    if (Si === null) {
      var l = /* @__PURE__ */ new Map(), a = Si = /* @__PURE__ */ new Map();
      a.set(n, l);
    } else
      a = Si, l = a.get(n), l || (l = /* @__PURE__ */ new Map(), a.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), a = 0; a < n.length; a++) {
      var r = n[a];
      if (!(r[fa] || r[Ie] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = r.getAttribute(t) || "";
        d = e + d;
        var m = l.get(d);
        m ? m.push(r) : l.set(d, [r]);
      }
    }
    return l;
  }
  function G0(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function wh(e, t, n) {
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
  function V0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function kh(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = Kl(l.href), r = t.querySelector(
          Ja(a)
        );
        if (r) {
          t = r._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = ji.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = r, Fe(r);
          return;
        }
        r = t.ownerDocument || t, l = L0(l), (a = Ut.get(a)) && sc(l, a), r = r.createElement("link"), Fe(r);
        var d = r;
        d._p = new Promise(function(m, x) {
          d.onload = m, d.onerror = x;
        }), nt(r, "link", l), n.instance = r;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = ji.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var cc = 0;
  function Mh(e, t) {
    return e.stylesheets && e.count === 0 && Ni(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && Ni(e, e.stylesheets), e.unsuspend) {
          var r = e.unsuspend;
          e.unsuspend = null, r();
        }
      }, 6e4 + t);
      0 < e.imgBytes && cc === 0 && (cc = 62500 * fh());
      var a = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ni(e, e.stylesheets), e.unsuspend)) {
            var r = e.unsuspend;
            e.unsuspend = null, r();
          }
        },
        (e.imgBytes > cc ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function ji() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ni(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ci = null;
  function Ni(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ci = /* @__PURE__ */ new Map(), t.forEach(Oh, e), Ci = null, ji.call(e));
  }
  function Oh(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Ci.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Ci.set(e, n);
        for (var a = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < a.length; r++) {
          var d = a[r];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), l = d);
        }
        l && n.set(null, l);
      }
      a = t.instance, d = a.getAttribute("data-precedence"), r = n.get(d) || l, r === l && n.set(null, a), n.set(d, a), this.count++, l = ji.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), r ? r.parentNode.insertBefore(a, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(a, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Wa = {
    $$typeof: te,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0
  };
  function Rh(e, t, n, l, a, r, d, m, x) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ls(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ls(0), this.hiddenUpdates = ls(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = r, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Q0(e, t, n, l, a, r, d, m, x, _, w, O) {
    return e = new Rh(
      e,
      t,
      n,
      d,
      x,
      _,
      w,
      O,
      m
    ), t = 1, r === !0 && (t |= 24), r = bt(3, null, null, t), e.current = r, r.stateNode = e, t = Ys(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, Xs(r), e;
  }
  function X0(e) {
    return e ? (e = Tl, e) : Tl;
  }
  function $0(e, t, n, l, a, r) {
    a = X0(a), l.context === null ? l.context = a : l.pendingContext = a, l = jn(t), l.payload = { element: n }, r = r === void 0 ? null : r, r !== null && (l.callback = r), n = Cn(e, l, t), n !== null && (ht(n, e, t), Aa(n, e, t));
  }
  function Z0(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function uc(e, t) {
    Z0(e, t), (e = e.alternate) && Z0(e, t);
  }
  function K0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Kn(e, 67108864);
      t !== null && ht(t, e, 67108864), uc(e, 67108864);
    }
  }
  function J0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Et();
      t = as(t);
      var n = Kn(e, t);
      n !== null && ht(n, e, t), uc(e, t);
    }
  }
  var Ei = !0;
  function Dh(e, t, n, l) {
    var a = C.T;
    C.T = null;
    var r = U.p;
    try {
      U.p = 2, dc(e, t, n, l);
    } finally {
      U.p = r, C.T = a;
    }
  }
  function Uh(e, t, n, l) {
    var a = C.T;
    C.T = null;
    var r = U.p;
    try {
      U.p = 8, dc(e, t, n, l);
    } finally {
      U.p = r, C.T = a;
    }
  }
  function dc(e, t, n, l) {
    if (Ei) {
      var a = fc(l);
      if (a === null)
        Wo(
          e,
          t,
          l,
          Ti,
          n
        ), W0(e, l);
      else if (Hh(
        a,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (W0(e, l), t & 4 && -1 < Bh.indexOf(e)) {
        for (; a !== null; ) {
          var r = gl(a);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var d = Vn(r.pendingLanes);
                  if (d !== 0) {
                    var m = r;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; d; ) {
                      var x = 1 << 31 - yt(d);
                      m.entanglements[1] |= x, d &= ~x;
                    }
                    Qt(r), (Ce & 6) === 0 && (oi = pt() + 500, Xa(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Kn(r, 2), m !== null && ht(m, r, 2), ui(), uc(r, 2);
            }
          if (r = fc(l), r === null && Wo(
            e,
            t,
            l,
            Ti,
            n
          ), r === a) break;
          a = r;
        }
        a !== null && l.stopPropagation();
      } else
        Wo(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function fc(e) {
    return e = ms(e), mc(e);
  }
  var Ti = null;
  function mc(e) {
    if (Ti = null, e = hl(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = y(t), e !== null) return e;
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
    return Ti = e, null;
  }
  function F0(e) {
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
        switch (jm()) {
          case lu:
            return 2;
          case au:
            return 8;
          case gr:
          case Cm:
            return 32;
          case ru:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hc = !1, Rn = null, Dn = null, Un = null, Ia = /* @__PURE__ */ new Map(), Pa = /* @__PURE__ */ new Map(), Bn = [], Bh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function W0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Rn = null;
        break;
      case "dragenter":
      case "dragleave":
        Dn = null;
        break;
      case "mouseover":
      case "mouseout":
        Un = null;
        break;
      case "pointerover":
      case "pointerout":
        Ia.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pa.delete(t.pointerId);
    }
  }
  function er(e, t, n, l, a, r) {
    return e === null || e.nativeEvent !== r ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: r,
      targetContainers: [a]
    }, t !== null && (t = gl(t), t !== null && K0(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
  }
  function Hh(e, t, n, l, a) {
    switch (t) {
      case "focusin":
        return Rn = er(
          Rn,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "dragenter":
        return Dn = er(
          Dn,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "mouseover":
        return Un = er(
          Un,
          e,
          t,
          n,
          l,
          a
        ), !0;
      case "pointerover":
        var r = a.pointerId;
        return Ia.set(
          r,
          er(
            Ia.get(r) || null,
            e,
            t,
            n,
            l,
            a
          )
        ), !0;
      case "gotpointercapture":
        return r = a.pointerId, Pa.set(
          r,
          er(
            Pa.get(r) || null,
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
  function I0(e) {
    var t = hl(e.target);
    if (t !== null) {
      var n = h(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = y(n), t !== null) {
            e.blockedOn = t, du(e.priority, function() {
              J0(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, du(e.priority, function() {
              J0(n);
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
  function _i(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = fc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        fs = l, n.target.dispatchEvent(l), fs = null;
      } else
        return t = gl(n), t !== null && K0(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function P0(e, t, n) {
    _i(e) && n.delete(t);
  }
  function Lh() {
    hc = !1, Rn !== null && _i(Rn) && (Rn = null), Dn !== null && _i(Dn) && (Dn = null), Un !== null && _i(Un) && (Un = null), Ia.forEach(P0), Pa.forEach(P0);
  }
  function zi(e, t) {
    e.blockedOn === t && (e.blockedOn = null, hc || (hc = !0, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      Lh
    )));
  }
  var Ai = null;
  function e1(e) {
    Ai !== e && (Ai = e, u.unstable_scheduleCallback(
      u.unstable_NormalPriority,
      function() {
        Ai === e && (Ai = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], a = e[t + 2];
          if (typeof l != "function") {
            if (mc(l || n) === null)
              continue;
            break;
          }
          var r = gl(n);
          r !== null && (e.splice(t, 3), t -= 3, fo(
            r,
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
  function Fl(e) {
    function t(x) {
      return zi(x, e);
    }
    Rn !== null && zi(Rn, e), Dn !== null && zi(Dn, e), Un !== null && zi(Un, e), Ia.forEach(t), Pa.forEach(t);
    for (var n = 0; n < Bn.length; n++) {
      var l = Bn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Bn.length && (n = Bn[0], n.blockedOn === null); )
      I0(n), n.blockedOn === null && Bn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var a = n[l], r = n[l + 1], d = a[ot] || null;
        if (typeof r == "function")
          d || e1(n);
        else if (d) {
          var m = null;
          if (r && r.hasAttribute("formAction")) {
            if (a = r, d = r[ot] || null)
              m = d.formAction;
            else if (mc(a) !== null) continue;
          } else m = d.action;
          typeof m == "function" ? n[l + 1] = m : (n.splice(l, 3), l -= 3), e1(n);
        }
      }
  }
  function t1() {
    function e(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
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
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
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
  function gc(e) {
    this._internalRoot = e;
  }
  wi.prototype.render = gc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var n = t.current, l = Et();
    $0(n, l, e, t, null, null);
  }, wi.prototype.unmount = gc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      $0(e.current, 2, null, e, null, null), ui(), t[ml] = null;
    }
  };
  function wi(e) {
    this._internalRoot = e;
  }
  wi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = uu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Bn.length && t !== 0 && t < Bn[n].priority; n++) ;
      Bn.splice(n, 0, e), n === 0 && I0(e);
    }
  };
  var n1 = s.version;
  if (n1 !== "19.2.3")
    throw Error(
      c(
        527,
        n1,
        "19.2.3"
      )
    );
  U.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = v(t), e = e !== null ? E(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var qh = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ki = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ki.isDisabled && ki.supportsFiber)
      try {
        ca = ki.inject(
          qh
        ), xt = ki;
      } catch {
      }
  }
  return nr.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var n = !1, l = "", a = cf, r = uf, d = df;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (a = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = Q0(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      a,
      r,
      d,
      t1
    ), e[ml] = t.current, Fo(e), new gc(t);
  }, nr.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(c(299));
    var l = !1, a = "", r = cf, d = uf, m = df, x = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (r = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (x = n.formState)), t = Q0(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      a,
      x,
      r,
      d,
      m,
      t1
    ), t.context = X0(null), n = t.current, l = Et(), l = as(l), a = jn(l), a.callback = null, Cn(n, a, l), n = l, t.current.lanes = n, da(t, n), Qt(t), e[ml] = t.current, Fo(e), new wi(t);
  }, nr.version = "19.2.3", nr;
}
var f1;
function Ih() {
  if (f1) return yc.exports;
  f1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (s) {
        console.error(s);
      }
  }
  return u(), yc.exports = Wh(), yc.exports;
}
var Ph = Ih();
const q1 = /* @__PURE__ */ Lc(Ph);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e4 = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), t4 = (u) => u.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, o, c) => c ? c.toUpperCase() : o.toLowerCase()
), m1 = (u) => {
  const s = t4(u);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, Y1 = (...u) => u.filter((s, o, c) => !!s && s.trim() !== "" && c.indexOf(s) === o).join(" ").trim(), n4 = (u) => {
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
var l4 = {
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
const a4 = M.forwardRef(
  ({
    color: u = "currentColor",
    size: s = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: h,
    iconNode: y,
    ...p
  }, g) => M.createElement(
    "svg",
    {
      ref: g,
      ...l4,
      width: s,
      height: s,
      stroke: u,
      strokeWidth: c ? Number(o) * 24 / Number(s) : o,
      className: Y1("lucide", f),
      ...!h && !n4(p) && { "aria-hidden": "true" },
      ...p
    },
    [
      ...y.map(([v, E]) => M.createElement(v, E)),
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
const K = (u, s) => {
  const o = M.forwardRef(
    ({ className: c, ...f }, h) => M.createElement(a4, {
      ref: h,
      iconNode: s,
      className: Y1(
        `lucide-${e4(m1(u))}`,
        `lucide-${u}`,
        c
      ),
      ...f
    })
  );
  return o.displayName = m1(u), o;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r4 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], i4 = K("arrow-down-to-line", r4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], o4 = K("arrow-up-right", s4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], u4 = K("bell", c4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], f4 = K("book-open", d4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m4 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], G1 = K("bot", m4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h4 = [
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
], g4 = K("boxes", h4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p4 = [
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
], x4 = K("brain-circuit", p4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y4 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], V1 = K("brain", y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v4 = [
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
], b4 = K("calculator", v4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Q1 = K("check", S4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ur = K("chevron-down", j4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], X1 = K("chevron-right", C4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Yc = K("circle-alert", N4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], Gc = K("circle-check-big", E4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], _4 = K("circle-check", T4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z4 = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], A4 = K("clock", z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w4 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], k4 = K("cloud", w4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], $1 = K("copy", M4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O4 = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], h1 = K("corner-down-left", O4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R4 = [
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
], Vc = K("cpu", R4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D4 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], fr = K("database", D4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U4 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Yi = K("download", U4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], H4 = K("external-link", B4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L4 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], q4 = K("eye", L4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y4 = [
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
], Qc = K("file-text", Y4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G4 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], V4 = K("hash", G4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], X4 = K("info", Q4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $4 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Xc = K("key", $4);
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
], Z1 = K("layers", Z4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K4 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], J4 = K("layout-dashboard", K4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F4 = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], W4 = K("list", F4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I4 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], K1 = K("loader-circle", I4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], e3 = K("maximize-2", P4);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t3 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], n3 = K("menu", t3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l3 = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], g1 = K("moon", l3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a3 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], J1 = K("network", a3);
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
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
], p1 = K("palette", r3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i3 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], s3 = K("pause", i3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], c3 = K("pen", o3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u3 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], $c = K("play", u3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Zc = K("plus", d3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f3 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], Kc = K("power", f3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m3 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], na = K("refresh-cw", m3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h3 = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], F1 = K("regex", h3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g3 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], p3 = K("save", g3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x3 = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], y3 = K("scissors", x3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v3 = [
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
], b3 = K("scroll-text", v3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], ir = K("search", S3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j3 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], C3 = K("send", j3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N3 = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], W1 = K("server", N3);
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
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], I1 = K("settings", E3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T3 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], Jc = K("settings-2", T3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _3 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], z3 = K("sun", _3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A3 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], ia = K("terminal", A3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], sa = K("trash-2", w3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k3 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], M3 = K("triangle-alert", k3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O3 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], R3 = K("upload", O3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D3 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Ki = K("x", D3);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U3 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], Fc = K("zap", U3), B3 = () => /* @__PURE__ */ i.jsx("style", { children: `
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
  ` }), _c = [
  // 导航命令
  {
    id: "nav-memory",
    icon: W4,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (u) => u("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: J1,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (u) => u("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: V1,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (u) => u("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Xc,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (u) => u("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: ia,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (u) => u("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: I1,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (u) => u("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function H3(u) {
  const s = u.toLowerCase().trim();
  return s ? _c.filter((o) => {
    var c;
    return o.label.toLowerCase().includes(s) || ((c = o.description) == null ? void 0 : c.toLowerCase().includes(s)) || o.keywords.some((f) => f.toLowerCase().includes(s));
  }) : _c;
}
const L3 = {
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
}, q3 = {
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
}, Y3 = {
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
}, G3 = {
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
}, V3 = {
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
}, Q3 = {
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
}, Hi = {
  sillytavern: Q3,
  // SillyTavern 继承主题
  paperLight: L3,
  twitterDark: Y3,
  claudeDark: q3,
  catppuccin: V3,
  discord: G3
}, lt = [];
for (let u = 0; u < 256; ++u)
  lt.push((u + 256).toString(16).slice(1));
function X3(u, s = 0) {
  return (lt[u[s + 0]] + lt[u[s + 1]] + lt[u[s + 2]] + lt[u[s + 3]] + "-" + lt[u[s + 4]] + lt[u[s + 5]] + "-" + lt[u[s + 6]] + lt[u[s + 7]] + "-" + lt[u[s + 8]] + lt[u[s + 9]] + "-" + lt[u[s + 10]] + lt[u[s + 11]] + lt[u[s + 12]] + lt[u[s + 13]] + lt[u[s + 14]] + lt[u[s + 15]]).toLowerCase();
}
let jc;
const $3 = new Uint8Array(16);
function Z3() {
  if (!jc) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    jc = crypto.getRandomValues.bind(crypto);
  }
  return jc($3);
}
const K3 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), x1 = { randomUUID: K3 };
function J3(u, s, o) {
  var f;
  u = u || {};
  const c = u.random ?? ((f = u.rng) == null ? void 0 : f.call(u)) ?? Z3();
  if (c.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return c[6] = c[6] & 15 | 64, c[8] = c[8] & 63 | 128, X3(c);
}
function F3(u, s, o) {
  return x1.randomUUID && !u ? x1.randomUUID() : J3(u);
}
var zc = function(u, s) {
  return zc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, c) {
    o.__proto__ = c;
  } || function(o, c) {
    for (var f in c) Object.prototype.hasOwnProperty.call(c, f) && (o[f] = c[f]);
  }, zc(u, s);
};
function mr(u, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  zc(u, s);
  function o() {
    this.constructor = u;
  }
  u.prototype = s === null ? Object.create(s) : (o.prototype = s.prototype, new o());
}
function Ac(u) {
  var s = typeof Symbol == "function" && Symbol.iterator, o = s && u[s], c = 0;
  if (o) return o.call(u);
  if (u && typeof u.length == "number") return {
    next: function() {
      return u && c >= u.length && (u = void 0), { value: u && u[c++], done: !u };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function wc(u, s) {
  var o = typeof Symbol == "function" && u[Symbol.iterator];
  if (!o) return u;
  var c = o.call(u), f, h = [], y;
  try {
    for (; (s === void 0 || s-- > 0) && !(f = c.next()).done; ) h.push(f.value);
  } catch (p) {
    y = { error: p };
  } finally {
    try {
      f && !f.done && (o = c.return) && o.call(c);
    } finally {
      if (y) throw y.error;
    }
  }
  return h;
}
function kc(u, s, o) {
  if (o || arguments.length === 2) for (var c = 0, f = s.length, h; c < f; c++)
    (h || !(c in s)) && (h || (h = Array.prototype.slice.call(s, 0, c)), h[c] = s[c]);
  return u.concat(h || Array.prototype.slice.call(s));
}
function Zt(u) {
  return typeof u == "function";
}
function P1(u) {
  var s = function(c) {
    Error.call(c), c.stack = new Error().stack;
  }, o = u(s);
  return o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o;
}
var Cc = P1(function(u) {
  return function(o) {
    u(this), this.message = o ? o.length + ` errors occurred during unsubscription:
` + o.map(function(c, f) {
      return f + 1 + ") " + c.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = o;
  };
});
function Mc(u, s) {
  if (u) {
    var o = u.indexOf(s);
    0 <= o && u.splice(o, 1);
  }
}
var Ji = (function() {
  function u(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return u.prototype.unsubscribe = function() {
    var s, o, c, f, h;
    if (!this.closed) {
      this.closed = !0;
      var y = this._parentage;
      if (y)
        if (this._parentage = null, Array.isArray(y))
          try {
            for (var p = Ac(y), g = p.next(); !g.done; g = p.next()) {
              var v = g.value;
              v.remove(this);
            }
          } catch (q) {
            s = { error: q };
          } finally {
            try {
              g && !g.done && (o = p.return) && o.call(p);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          y.remove(this);
      var E = this.initialTeardown;
      if (Zt(E))
        try {
          E();
        } catch (q) {
          h = q instanceof Cc ? q.errors : [q];
        }
      var b = this._finalizers;
      if (b) {
        this._finalizers = null;
        try {
          for (var D = Ac(b), H = D.next(); !H.done; H = D.next()) {
            var B = H.value;
            try {
              y1(B);
            } catch (q) {
              h = h ?? [], q instanceof Cc ? h = kc(kc([], wc(h)), wc(q.errors)) : h.push(q);
            }
          }
        } catch (q) {
          c = { error: q };
        } finally {
          try {
            H && !H.done && (f = D.return) && f.call(D);
          } finally {
            if (c) throw c.error;
          }
        }
      }
      if (h)
        throw new Cc(h);
    }
  }, u.prototype.add = function(s) {
    var o;
    if (s && s !== this)
      if (this.closed)
        y1(s);
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
    o === s ? this._parentage = null : Array.isArray(o) && Mc(o, s);
  }, u.prototype.remove = function(s) {
    var o = this._finalizers;
    o && Mc(o, s), s instanceof u && s._removeParent(this);
  }, u.EMPTY = (function() {
    var s = new u();
    return s.closed = !0, s;
  })(), u;
})(), em = Ji.EMPTY;
function tm(u) {
  return u instanceof Ji || u && "closed" in u && Zt(u.remove) && Zt(u.add) && Zt(u.unsubscribe);
}
function y1(u) {
  Zt(u) ? u() : u.unsubscribe();
}
var W3 = {
  Promise: void 0
}, I3 = {
  setTimeout: function(u, s) {
    for (var o = [], c = 2; c < arguments.length; c++)
      o[c - 2] = arguments[c];
    return setTimeout.apply(void 0, kc([u, s], wc(o)));
  },
  clearTimeout: function(u) {
    return clearTimeout(u);
  },
  delegate: void 0
};
function P3(u) {
  I3.setTimeout(function() {
    throw u;
  });
}
function v1() {
}
function Li(u) {
  u();
}
var Wc = (function(u) {
  mr(s, u);
  function s(o) {
    var c = u.call(this) || this;
    return c.isStopped = !1, o ? (c.destination = o, tm(o) && o.add(c)) : c.destination = ng, c;
  }
  return s.create = function(o, c, f) {
    return new Oc(o, c, f);
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
})(Ji), eg = (function() {
  function u(s) {
    this.partialObserver = s;
  }
  return u.prototype.next = function(s) {
    var o = this.partialObserver;
    if (o.next)
      try {
        o.next(s);
      } catch (c) {
        Mi(c);
      }
  }, u.prototype.error = function(s) {
    var o = this.partialObserver;
    if (o.error)
      try {
        o.error(s);
      } catch (c) {
        Mi(c);
      }
    else
      Mi(s);
  }, u.prototype.complete = function() {
    var s = this.partialObserver;
    if (s.complete)
      try {
        s.complete();
      } catch (o) {
        Mi(o);
      }
  }, u;
})(), Oc = (function(u) {
  mr(s, u);
  function s(o, c, f) {
    var h = u.call(this) || this, y;
    return Zt(o) || !o ? y = {
      next: o ?? void 0,
      error: c ?? void 0,
      complete: f ?? void 0
    } : y = o, h.destination = new eg(y), h;
  }
  return s;
})(Wc);
function Mi(u) {
  P3(u);
}
function tg(u) {
  throw u;
}
var ng = {
  closed: !0,
  next: v1,
  error: tg,
  complete: v1
}, lg = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function ag(u) {
  return u;
}
function rg(u) {
  return u.length === 0 ? ag : u.length === 1 ? u[0] : function(o) {
    return u.reduce(function(c, f) {
      return f(c);
    }, o);
  };
}
var b1 = (function() {
  function u(s) {
    s && (this._subscribe = s);
  }
  return u.prototype.lift = function(s) {
    var o = new u();
    return o.source = this, o.operator = s, o;
  }, u.prototype.subscribe = function(s, o, c) {
    var f = this, h = sg(s) ? s : new Oc(s, o, c);
    return Li(function() {
      var y = f, p = y.operator, g = y.source;
      h.add(p ? p.call(h, g) : g ? f._subscribe(h) : f._trySubscribe(h));
    }), h;
  }, u.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (o) {
      s.error(o);
    }
  }, u.prototype.forEach = function(s, o) {
    var c = this;
    return o = S1(o), new o(function(f, h) {
      var y = new Oc({
        next: function(p) {
          try {
            s(p);
          } catch (g) {
            h(g), y.unsubscribe();
          }
        },
        error: h,
        complete: f
      });
      c.subscribe(y);
    });
  }, u.prototype._subscribe = function(s) {
    var o;
    return (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(s);
  }, u.prototype[lg] = function() {
    return this;
  }, u.prototype.pipe = function() {
    for (var s = [], o = 0; o < arguments.length; o++)
      s[o] = arguments[o];
    return rg(s)(this);
  }, u.prototype.toPromise = function(s) {
    var o = this;
    return s = S1(s), new s(function(c, f) {
      var h;
      o.subscribe(function(y) {
        return h = y;
      }, function(y) {
        return f(y);
      }, function() {
        return c(h);
      });
    });
  }, u.create = function(s) {
    return new u(s);
  }, u;
})();
function S1(u) {
  var s;
  return (s = u ?? W3.Promise) !== null && s !== void 0 ? s : Promise;
}
function ig(u) {
  return u && Zt(u.next) && Zt(u.error) && Zt(u.complete);
}
function sg(u) {
  return u && u instanceof Wc || ig(u) && tm(u);
}
function og(u) {
  return Zt(u == null ? void 0 : u.lift);
}
function cg(u) {
  return function(s) {
    if (og(s))
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
function ug(u, s, o, c, f) {
  return new dg(u, s, o, c, f);
}
var dg = (function(u) {
  mr(s, u);
  function s(o, c, f, h, y, p) {
    var g = u.call(this, o) || this;
    return g.onFinalize = y, g.shouldUnsubscribe = p, g._next = c ? function(v) {
      try {
        c(v);
      } catch (E) {
        o.error(E);
      }
    } : u.prototype._next, g._error = h ? function(v) {
      try {
        h(v);
      } catch (E) {
        o.error(E);
      } finally {
        this.unsubscribe();
      }
    } : u.prototype._error, g._complete = f ? function() {
      try {
        f();
      } catch (v) {
        o.error(v);
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
})(Wc), fg = P1(function(u) {
  return function() {
    u(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ic = (function(u) {
  mr(s, u);
  function s() {
    var o = u.call(this) || this;
    return o.closed = !1, o.currentObservers = null, o.observers = [], o.isStopped = !1, o.hasError = !1, o.thrownError = null, o;
  }
  return s.prototype.lift = function(o) {
    var c = new j1(this, this);
    return c.operator = o, c;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new fg();
  }, s.prototype.next = function(o) {
    var c = this;
    Li(function() {
      var f, h;
      if (c._throwIfClosed(), !c.isStopped) {
        c.currentObservers || (c.currentObservers = Array.from(c.observers));
        try {
          for (var y = Ac(c.currentObservers), p = y.next(); !p.done; p = y.next()) {
            var g = p.value;
            g.next(o);
          }
        } catch (v) {
          f = { error: v };
        } finally {
          try {
            p && !p.done && (h = y.return) && h.call(y);
          } finally {
            if (f) throw f.error;
          }
        }
      }
    });
  }, s.prototype.error = function(o) {
    var c = this;
    Li(function() {
      if (c._throwIfClosed(), !c.isStopped) {
        c.hasError = c.isStopped = !0, c.thrownError = o;
        for (var f = c.observers; f.length; )
          f.shift().error(o);
      }
    });
  }, s.prototype.complete = function() {
    var o = this;
    Li(function() {
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
    var c = this, f = this, h = f.hasError, y = f.isStopped, p = f.observers;
    return h || y ? em : (this.currentObservers = null, p.push(o), new Ji(function() {
      c.currentObservers = null, Mc(p, o);
    }));
  }, s.prototype._checkFinalizedStatuses = function(o) {
    var c = this, f = c.hasError, h = c.thrownError, y = c.isStopped;
    f ? o.error(h) : y && o.complete();
  }, s.prototype.asObservable = function() {
    var o = new b1();
    return o.source = this, o;
  }, s.create = function(o, c) {
    return new j1(o, c);
  }, s;
})(b1), j1 = (function(u) {
  mr(s, u);
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
    return (f = (c = this.source) === null || c === void 0 ? void 0 : c.subscribe(o)) !== null && f !== void 0 ? f : em;
  }, s;
})(Ic);
function mg(u, s) {
  return cg(function(o, c) {
    var f = 0;
    o.subscribe(ug(c, function(h) {
      return u.call(s, h, f++) && c.next(h);
    }));
  });
}
const Oi = new Ic(), hg = {
  /**
   * 发布事件
   */
  emit(u) {
    Oi.next({
      ...u,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(u) {
    const s = Oi.subscribe(u);
    return {
      unsubscribe: () => s.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(u, s) {
    const o = Oi.pipe(mg((c) => c.type === u)).subscribe((c) => s(c.payload));
    return {
      unsubscribe: () => o.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Oi.asObservable();
  }
};
var Re = /* @__PURE__ */ ((u) => (u[u.DEBUG = 0] = "DEBUG", u[u.INFO = 1] = "INFO", u[u.SUCCESS = 2] = "SUCCESS", u[u.WARN = 3] = "WARN", u[u.ERROR = 4] = "ERROR", u))(Re || {});
const Gi = {
  0: { label: "DEBUG", icon: "●", color: "#6c757d" },
  1: { label: "INFO", icon: "●", color: "#17a2b8" },
  2: { label: "OK", icon: "●", color: "#28a745" },
  3: { label: "WARN", icon: "▲", color: "#ffc107" },
  4: { label: "ERROR", icon: "✕", color: "#dc3545" }
}, nm = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, lm = new Ic();
let mn = [], or = { ...nm };
function gg(u) {
  return new Date(u).toTimeString().slice(0, 8);
}
function ta(u, s, o, c) {
  if (u < or.minLevel) return;
  const f = {
    id: F3(),
    timestamp: Date.now(),
    level: u,
    module: s,
    message: o,
    data: c
  };
  mn.push(f), mn.length > or.maxEntries && (mn = mn.slice(-or.maxEntries)), lm.next(f);
}
function pg() {
  hg.subscribe((u) => {
    const o = {
      INGESTION_START: Re.INFO,
      INGESTION_COMPLETE: Re.SUCCESS,
      ENTITY_CREATED: Re.INFO,
      MEMORY_STORED: Re.SUCCESS,
      RETRIEVAL_START: Re.DEBUG,
      RETRIEVAL_COMPLETE: Re.SUCCESS,
      CHAT_CHANGED: Re.INFO,
      MESSAGE_RECEIVED: Re.DEBUG
    }[u.type] ?? Re.DEBUG;
    ta(o, "EventBus", `${u.type}`, u.payload);
  });
}
const ae = {
  /**
   * 初始化 Logger（纯内存模式）
   */
  init(u) {
    u && (or = { ...or, ...u }), mn = [], pg(), ae.info("Logger", "Logger 初始化完成");
  },
  /**
   * DEBUG 级别日志
   */
  debug(u, s, o) {
    ta(Re.DEBUG, u, s, o);
  },
  /**
   * INFO 级别日志
   */
  info(u, s, o) {
    ta(Re.INFO, u, s, o);
  },
  /**
   * SUCCESS 级别日志
   */
  success(u, s, o) {
    ta(Re.SUCCESS, u, s, o);
  },
  /**
   * WARN 级别日志
   */
  warn(u, s, o) {
    ta(Re.WARN, u, s, o);
  },
  /**
   * ERROR 级别日志
   */
  error(u, s, o) {
    ta(Re.ERROR, u, s, o);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...mn];
  },
  /**
   * 订阅新日志
   */
  subscribe(u) {
    const s = lm.subscribe(u);
    return () => s.unsubscribe();
  },
  /**
   * 清空所有日志（仅内存）
   */
  clear() {
    mn = [], ae.info("Logger", "日志已清空");
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const u = /* @__PURE__ */ new Date();
    u.toISOString().slice(0, 10), u.toTimeString().slice(0, 8).replace(/:/g, "");
    const s = {
      [Re.DEBUG]: "DEBUG",
      [Re.INFO]: "INFO",
      [Re.SUCCESS]: "SUCCESS",
      [Re.WARN]: "WARN",
      [Re.ERROR]: "ERROR"
    };
    let o = `# Engram Debug Log

`;
    o += `- **导出时间**: ${u.toLocaleString("zh-CN")}
`, o += `- **版本**: 0.1.0
`, o += `- **日志条数**: ${mn.length}

`, o += `---

`, o += `## 日志记录

`, o += "```\n";
    for (const c of mn) {
      const f = gg(c.timestamp), h = s[c.level].padEnd(7), y = c.module.padEnd(16);
      if (o += `[${f}] [${y}] ${h} ${c.message}
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
}, am = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: nm,
  LogLevel: Re,
  LogLevelConfig: Gi,
  Logger: ae
}, Symbol.toStringTag, { value: "Module" })), sl = Object.freeze({
  theme: "odysseia",
  presets: {},
  templates: {},
  promptTemplates: [],
  hasSeenWelcome: !1,
  lastReadVersion: "0.0.0",
  summarizerConfig: {},
  trimmerConfig: {},
  regexRules: [],
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
    return s != null && s.extensionSettings ? (s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...sl }, ae.debug("SettingsManager", "Initialized engram settings with defaults"), this.save()), s.extensionSettings[this.EXTENSION_NAME]) : (ae.warn("SettingsManager", "SillyTavern context.extensionSettings not available"), { ...sl });
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
    s.extensionSettings[this.EXTENSION_NAME] || (s.extensionSettings[this.EXTENSION_NAME] = { ...sl }, o = !0, ae.info("SettingsManager", "Created engram settings"));
    const c = s.extensionSettings[this.EXTENSION_NAME];
    for (const f of Object.keys(sl))
      f in c || (c[f] = sl[f], o = !0, ae.debug("SettingsManager", `Added missing field: ${f}`));
    o && this.save();
  }
  /**
   * Get a specific setting value
   */
  static get(s) {
    const c = this.getExtensionSettings()[s];
    return c !== void 0 ? c : sl[s];
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
    c.extensionSettings[this.EXTENSION_NAME] || (c.extensionSettings[this.EXTENSION_NAME] = { ...sl }), c.extensionSettings[this.EXTENSION_NAME][s] = o, ae.debug("SettingsManager", `Set ${String(s)} = ${JSON.stringify(o)}`), this.save();
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
He(Le, "EXTENSION_NAME", "engram");
const xg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SettingsManager: Le
}, Symbol.toStringTag, { value: "Module" }));
class Yn {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let o = Le.loadSettings().theme;
    o || (o = localStorage.getItem(this.STORAGE_KEY), o && Le.set("theme", o));
    const c = Hi[o] ? o : "claudeDark";
    this.setTheme(c), ae.info("ThemeManager", `主题系统初始化完成: ${c}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    Hi[s] || (ae.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, Le.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
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
    const o = Hi[s];
    if (!o) return;
    const c = document.documentElement, f = (y, p) => {
      c.style.setProperty(y, p);
    };
    Object.entries(o.colors).forEach(([y, p]) => {
      let g = `--${y.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      g = g.replace(/(\d+)/, "-$1"), f(g, p);
    }), Object.entries(o.variables).forEach(([y, p]) => {
      f(`--${y}`, p);
    }), s !== "paperLight" ? c.classList.add("dark") : c.classList.remove("dark");
  }
}
He(Yn, "STORAGE_KEY", "engram-theme"), He(Yn, "currentTheme", "claudeDark");
const yg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Yn
}, Symbol.toStringTag, { value: "Module" })), rm = M.createContext(void 0);
function im({ children: u }) {
  const [s, o] = M.useState(Yn.getTheme()), c = s !== "paperLight", f = (h) => {
    Yn.setTheme(h), o(h);
  };
  return M.useEffect(() => {
    const h = Yn.getTheme();
    h !== s && o(h);
  }, []), /* @__PURE__ */ i.jsx(rm.Provider, { value: { theme: s, setTheme: f, isDarkMode: c }, children: u });
}
function vg() {
  const u = M.useContext(rm);
  if (u === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return u;
}
const bg = ({ onNavigate: u }) => {
  const { setTheme: s } = vg(), [o, c] = M.useState(""), [f, h] = M.useState(!1), [y, p] = M.useState(0), [g, v] = M.useState(_c), E = M.useRef(null), b = [
    {
      id: "theme-paper-light",
      icon: z3,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: g1,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: g1,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: p1,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: p1,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  M.useEffect(() => {
    const B = H3(o), q = o.toLowerCase().trim(), F = b.filter(
      (ee) => {
        var Y;
        return !q || ee.label.toLowerCase().includes(q) || ((Y = ee.description) == null ? void 0 : Y.toLowerCase().includes(q)) || ee.keywords.some((te) => te.toLowerCase().includes(q));
      }
    );
    v([...B, ...F]), p(0);
  }, [o]), M.useEffect(() => {
    const B = (q) => {
      (q.metaKey || q.ctrlKey) && q.key === "k" && (q.preventDefault(), h(!0));
    };
    return window.addEventListener("keydown", B), () => window.removeEventListener("keydown", B);
  }, []), M.useEffect(() => {
    f && setTimeout(() => {
      var B;
      return (B = E.current) == null ? void 0 : B.focus();
    }, 50);
  }, [f]);
  const D = (B) => {
    const q = g.length + (o ? 1 : 0);
    switch (B.key) {
      case "ArrowDown":
        B.preventDefault(), p((F) => (F + 1) % q);
        break;
      case "ArrowUp":
        B.preventDefault(), p((F) => (F - 1 + q) % q);
        break;
      case "Enter":
        B.preventDefault(), H();
        break;
      case "Escape":
        h(!1);
        break;
    }
  }, H = () => {
    g.length > 0 && y < g.length ? g[y].action(u) : o && (console.log("Searching memory for:", o), u("/memory")), h(!1), c("");
  };
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(
      "button",
      {
        onClick: () => h(!0),
        className: "p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground",
        title: "搜索 (Cmd+K)",
        children: /* @__PURE__ */ i.jsx(ir, { size: 20 })
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
        onClick: (B) => {
          B.target === B.currentTarget && h(!1);
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
                /* @__PURE__ */ i.jsx(ir, { size: 20, className: "text-muted-foreground shrink-0" }),
                /* @__PURE__ */ i.jsx(
                  "input",
                  {
                    ref: E,
                    type: "text",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50",
                    placeholder: "输入命令、跳转页面或搜索记忆...",
                    value: o,
                    onChange: (B) => c(B.target.value),
                    onKeyDown: D
                  }
                ),
                /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-muted/50", children: "ESC" })
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2 scroll-smooth", children: [
                g.length > 0 && /* @__PURE__ */ i.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ i.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "建议操作" }),
                  g.map((B, q) => /* @__PURE__ */ i.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${q === y ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => {
                        B.action(u), h(!1), c("");
                      },
                      onMouseEnter: () => p(q),
                      children: [
                        /* @__PURE__ */ i.jsx(B.icon, { size: 18, className: `shrink-0 ${q === y ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsx("div", { className: "text-sm font-medium", children: B.label }),
                          B.description && /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground/80 truncate", children: B.description })
                        ] }),
                        q === y && /* @__PURE__ */ i.jsx(h1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    },
                    B.id
                  ))
                ] }),
                o && /* @__PURE__ */ i.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50", children: [
                  /* @__PURE__ */ i.jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider", children: "全站搜索" }),
                  /* @__PURE__ */ i.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${y === g.length ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"}`,
                      onClick: () => H(),
                      onMouseEnter: () => p(g.length),
                      children: [
                        /* @__PURE__ */ i.jsx(ir, { size: 18, className: `shrink-0 ${y === g.length ? "text-primary" : "text-muted-foreground"}` }),
                        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ i.jsxs("div", { className: "text-sm font-medium", children: [
                            '搜索记忆: "',
                            /* @__PURE__ */ i.jsx("span", { className: "text-primary", children: o }),
                            '"'
                          ] }),
                          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground/80", children: "在记忆流和知识图谱中深度搜索" })
                        ] }),
                        y === g.length && /* @__PURE__ */ i.jsx(h1, { size: 16, className: "text-muted-foreground/50" })
                      ]
                    }
                  )
                ] }),
                g.length === 0 && !o && /* @__PURE__ */ i.jsxs("div", { className: "px-4 py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ i.jsx(ir, { size: 32, className: "opacity-20 mb-2" }),
                  /* @__PURE__ */ i.jsx("p", { children: "输入关键词开始搜索..." })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}, Rc = ({ className: u = "", size: s = 24 }) => /* @__PURE__ */ i.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 592",
    width: s,
    height: s,
    className: u,
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
), Sg = ({
  onToggleSidebar: u,
  isMobile: s,
  // Deprecated prop, handled by CSS
  onClose: o,
  onNavigate: c
}) => /* @__PURE__ */ i.jsxs("header", { className: "h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar/95 backdrop-blur z-50 transition-all duration-300 w-full flex-shrink-0", children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 w-16 md:w-64", children: [
    /* @__PURE__ */ i.jsx(
      "button",
      {
        className: "p-2 -ml-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors md:hidden",
        onClick: u,
        title: "菜单",
        children: /* @__PURE__ */ i.jsx(n3, { size: 20 })
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ i.jsx(Rc, { size: 24, className: "text-primary" }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Rc, { size: 20, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-semibold text-sidebar-foreground tracking-tight", children: "Engram" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1" }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
    /* @__PURE__ */ i.jsx(bg, { onNavigate: c }),
    /* @__PURE__ */ i.jsx("div", { className: "h-4 w-[1px] bg-border mx-1" }),
    /* @__PURE__ */ i.jsx(
      "button",
      {
        className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
        onClick: o,
        title: "关闭扩展",
        children: /* @__PURE__ */ i.jsx(Ki, { size: 20 })
      }
    )
  ] })
] }), jg = ({ className: u = "", height: s = 24 }) => {
  const o = Math.round(s * 3.17);
  return /* @__PURE__ */ i.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "235 175 555 175",
      width: o,
      height: s,
      className: u,
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
}, Ri = {
  timeOut: 5e3,
  extendedTimeOut: 1e3,
  closeButton: !0,
  progressBar: !0
}, ul = class ul {
  constructor() {
  }
  static getInstance() {
    return ul.instance || (ul.instance = new ul()), ul.instance;
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
    f ? f.success(s, o, { ...Ri, ...c }) : console.log(`[Engram] SUCCESS: ${o} - ${s}`), ae.info("Notification", `Success: ${s}`);
  }
  /**
   * 发送信息通知
   */
  info(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.info(s, o, { ...Ri, ...c }) : console.log(`[Engram] INFO: ${o} - ${s}`), ae.info("Notification", `Info: ${s}`);
  }
  /**
   * 发送警告通知
   */
  warning(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.warning(s, o, { ...Ri, ...c }) : console.warn(`[Engram] WARNING: ${o} - ${s}`), ae.warn("Notification", `Warning: ${s}`);
  }
  /**
   * 发送错误通知
   */
  error(s, o = "Engram", c = {}) {
    const f = this.getToastr();
    f ? f.error(s, o, { ...Ri, timeOut: 8e3, ...c }) : console.error(`[Engram] ERROR: ${o} - ${s}`), ae.error("Notification", `Error: ${s}`);
  }
  /**
   * 清除所有通知
   */
  clear() {
    const s = this.getToastr();
    s && s.clear();
  }
};
He(ul, "instance");
let Dc = ul;
const rt = Dc.getInstance(), Cg = "0.2.0", Ng = {
  version: Cg
}, Wl = {
  owner: "shiyue137mh-netizen",
  repo: "Engram",
  branch: "master"
  // 实际分支名是 master
}, Di = Ng.version;
let lr = null, ar = null;
function Nc(u, s) {
  const o = u.split(".").map(Number), c = s.split(".").map(Number);
  for (let f = 0; f < Math.max(o.length, c.length); f++) {
    const h = o[f] || 0, y = c[f] || 0;
    if (h > y) return 1;
    if (h < y) return -1;
  }
  return 0;
}
class ol {
  /**
   * 获取当前版本
   */
  static getCurrentVersion() {
    return Di;
  }
  /**
   * 从 GitHub 获取最新版本号
   */
  static async getLatestVersion() {
    if (lr)
      return lr;
    try {
      const s = `https://raw.githubusercontent.com/${Wl.owner}/${Wl.repo}/${Wl.branch}/manifest.json`, o = await fetch(s);
      return o.ok ? (lr = (await o.json()).version || null, lr) : null;
    } catch {
      return null;
    }
  }
  /**
   * 检查是否有更新
   */
  static async hasUpdate() {
    const s = await this.getLatestVersion();
    return s ? Nc(s, Di) > 0 : !1;
  }
  /**
   * 获取更新日志
   */
  static async getChangelog() {
    if (ar)
      return ar;
    try {
      const s = `https://raw.githubusercontent.com/${Wl.owner}/${Wl.repo}/${Wl.branch}/CHANGELOG.md`, o = await fetch(s);
      return o.ok ? (ar = await o.text(), ar) : (console.warn("[Engram] UpdateService: 获取更新日志失败", o.status), rt.warning(`获取更新日志失败: ${o.status}`, "更新检测"), null);
    } catch (s) {
      return console.error("[Engram] UpdateService: 获取更新日志异常", s), rt.error("获取更新日志异常", "更新检测"), null;
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
    const o = s || await this.getLatestVersion() || Di;
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
    if (!s || Nc(s, Di) <= 0)
      return !1;
    const o = this.getReadVersion();
    return Nc(s, o) > 0;
  }
  /**
   * 清除缓存（强制刷新）
   */
  static clearCache() {
    lr = null, ar = null;
  }
}
const Eg = ({ isOpen: u, onClose: s }) => {
  const [o, c] = M.useState(!0), [f, h] = M.useState(null), [y, p] = M.useState(null), [g, v] = M.useState(!1), [E, b] = M.useState(!1), D = ol.getCurrentVersion();
  M.useEffect(() => {
    u && H();
  }, [u]);
  const H = async () => {
    c(!0);
    try {
      const [F, ee, Y] = await Promise.all([
        ol.getLatestVersion(),
        ol.getChangelog(),
        ol.hasUpdate()
      ]);
      h(F), p(ee), v(Y);
    } catch (F) {
      console.error("[Engram] 加载更新信息失败", F);
    } finally {
      c(!1);
    }
  }, B = async () => {
    b(!0);
    try {
      const F = f || D;
      console.debug("[Engram] Marking update as read:", F), await ol.markAsRead(F), s();
    } finally {
      b(!1);
    }
  }, q = () => {
    ol.clearCache(), H();
  };
  return u ? /* @__PURE__ */ i.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
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
          /* @__PURE__ */ i.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ i.jsx(Yi, { size: 16, className: "text-primary" }) }),
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
              children: /* @__PURE__ */ i.jsx(na, { size: 16, className: o ? "animate-spin" : "" })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              onClick: s,
              className: "p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ i.jsx(Ki, { size: 16 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-5", children: o ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(na, { size: 24, className: "animate-spin mb-3" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "正在检查更新..." })
      ] }) : /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ i.jsx("div", { className: `
                                p-4 rounded-lg border
                                ${g ? "bg-primary/5 border-primary/20" : "bg-green-500/5 border-green-500/20"}
                            `, children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
          g ? /* @__PURE__ */ i.jsx(Yi, { size: 20, className: "text-primary" }) : /* @__PURE__ */ i.jsx(Gc, { size: 20, className: "text-green-500" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("p", { className: "font-medium text-foreground", children: g ? `发现新版本: v${f}` : "已是最新版本" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: g ? "请手动更新扩展以获取新功能" : "无需更新" })
          ] })
        ] }) }),
        y && /* @__PURE__ */ i.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "更新日志" }),
          /* @__PURE__ */ i.jsx("div", { className: "bg-muted/20 rounded-lg p-4 max-h-64 overflow-y-auto", children: /* @__PURE__ */ i.jsxs("pre", { className: "text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed", children: [
            y.substring(0, 2e3),
            y.length > 2e3 && `

... (更多内容请查看完整日志)`
          ] }) })
        ] }),
        !y && !o && /* @__PURE__ */ i.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "无法获取更新日志" }) })
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
        g && /* @__PURE__ */ i.jsx(
          "button",
          {
            onClick: B,
            disabled: E,
            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            children: E ? "处理中..." : "我知道了"
          }
        )
      ] })
    ] })
  ] }) : null;
}, C1 = [
  { id: "dashboard", label: "仪表盘", icon: J4 },
  { id: "memory", label: "记忆流", icon: x4 },
  { id: "graph", label: "神经图谱", icon: J1 },
  { id: "processing", label: "数据处理", icon: o4 },
  { id: "presets", label: "API 预设", icon: fr },
  { id: "devlog", label: "开发日志", icon: ia },
  { id: "settings", label: "系统设置", icon: Jc }
], Tg = ({ children: u, activeTab: s, setActiveTab: o, onClose: c }) => {
  const [f, h] = M.useState(!1), [y, p] = M.useState(!1), [g, v] = M.useState(!1);
  return M.useEffect(() => {
    (async () => {
      try {
        const b = await ol.hasUnreadUpdate();
        v(b);
      } catch (b) {
        console.debug("[Engram] 检查更新失败", b);
      }
    })();
  }, []), /* @__PURE__ */ i.jsxs("div", { className: "flex absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ i.jsx(B3, {}),
    /* @__PURE__ */ i.jsx(
      Eg,
      {
        isOpen: y,
        onClose: () => {
          p(!1), v(!1);
        }
      }
    ),
    /* @__PURE__ */ i.jsxs("aside", { className: "[display:none] md:flex w-36 flex-shrink-0 bg-sidebar flex-col z-40 pt-4 px-2 border-r border-border/50", children: [
      /* @__PURE__ */ i.jsx("nav", { className: "flex-1 w-full flex flex-col gap-1 overflow-y-auto no-scrollbar", children: C1.map((E) => {
        const b = E.icon, D = s === E.id;
        return /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => o(E.id),
            className: `
                                    w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 text-left
                                    ${D ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                                `,
            children: [
              /* @__PURE__ */ i.jsx(b, { size: 18, strokeWidth: D ? 2 : 1.5, className: "flex-shrink-0" }),
              /* @__PURE__ */ i.jsx("span", { className: `text-xs ${D ? "font-medium" : "font-normal"}`, children: E.label })
            ]
          },
          E.id
        );
      }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "pb-3 pt-2 border-t border-border/30 mt-2 space-y-2", children: [
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            onClick: () => p(!0),
            className: "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted/10 text-left",
            children: [
              /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ i.jsx(u4, { size: 16, strokeWidth: 1.5 }),
                g && /* @__PURE__ */ i.jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" })
              ] }),
              /* @__PURE__ */ i.jsx("span", { className: "text-xs", children: "更新通知" }),
              g && /* @__PURE__ */ i.jsx("span", { className: "ml-auto text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded-full", children: "NEW" })
            ]
          }
        ),
        /* @__PURE__ */ i.jsx("div", { className: "opacity-40 text-muted-foreground px-2", children: /* @__PURE__ */ i.jsx(jg, { height: 12 }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ i.jsx(
        Sg,
        {
          onToggleSidebar: () => h(!f),
          isMobile: !1,
          onClose: c,
          onNavigate: (E) => o(E.replace("/", ""))
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
                        children: /* @__PURE__ */ i.jsx(Ki, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ i.jsx("nav", { className: "space-y-4 flex-1 overflow-y-auto", children: C1.map((E) => {
                    const b = s === E.id;
                    return /* @__PURE__ */ i.jsxs(
                      "button",
                      {
                        onClick: () => {
                          o(E.id), h(!1);
                        },
                        className: `
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200
                                                ${b ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"}
                                            `,
                        children: [
                          /* @__PURE__ */ i.jsx(E.icon, { size: 22, className: b ? "text-primary" : "text-muted-foreground/70" }),
                          /* @__PURE__ */ i.jsx("span", { children: E.label })
                        ]
                      },
                      E.id
                    );
                  }) }),
                  /* @__PURE__ */ i.jsx("div", { className: "mt-auto pt-6 border-t border-border/20", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3 px-2 text-xs text-muted-foreground/50", children: [
                    /* @__PURE__ */ i.jsx(Rc, { size: 14 }),
                    /* @__PURE__ */ i.jsx("span", { children: "Engram v0.1.0" })
                  ] }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ i.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background", children: /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden pt-0 px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 scroll-smooth", children: /* @__PURE__ */ i.jsx("div", { className: "max-w-6xl mx-auto min-h-full pb-20", children: u }) }) })
    ] }),
    "  "
  ] });
}, Ec = ({
  title: u,
  value: s,
  icon: o,
  subtext: c,
  highlight: f = !1
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${f ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ i.jsx("div", { className: `p-2 rounded-lg ${f ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ i.jsx(o, { size: 20 }) }),
    f && /* @__PURE__ */ i.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: s }),
    /* @__PURE__ */ i.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: u }),
    c && /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: c })
  ] })
] });
function ra() {
  var u, s;
  try {
    return ((s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) || null;
  } catch (o) {
    return console.warn("[Engram] Failed to get ST context:", o), null;
  }
}
function _g() {
  const u = ra();
  return (u == null ? void 0 : u.chat) || [];
}
function zg() {
  return _g();
}
function Ag() {
  return ra() !== null;
}
async function N1() {
  const { Logger: u } = await Promise.resolve().then(() => am);
  await u.init(), u.info("STBridge", "Engram 插件正在初始化...");
  const { SettingsManager: s } = await Promise.resolve().then(() => xg);
  s.initSettings(), u.info("STBridge", "SettingsManager initialized");
  try {
    const { checkTavernIntegration: c } = await Promise.resolve().then(() => B5), f = await c();
    u.info("TavernAPI", "酒馆接口对接状态", f);
  } catch (c) {
    u.warn("TavernAPI", "酒馆接口检查失败", { error: String(c) });
  }
  try {
    const { summarizerService: c } = await Promise.resolve().then(() => Tt);
    c.start();
    const f = c.getStatus();
    u.info("Summarizer", "服务已启动", f);
  } catch (c) {
    u.warn("Summarizer", "服务启动失败", { error: String(c) });
  }
  wg();
  const { ThemeManager: o } = await Promise.resolve().then(() => yg);
  o.init(), Rg();
  try {
    const { CharacterDeleteService: c } = await Promise.resolve().then(() => ap);
    c.init(), u.info("STBridge", "CharacterDeleteService initialized");
  } catch (c) {
    u.warn("STBridge", "Failed to initialize CharacterDeleteService", { error: String(c) });
  }
  u.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const sm = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function wg() {
  const u = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!u) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), kg();
    return;
  }
  const o = document.createElement("div");
  o.id = "engram-drawer", o.className = "drawer";
  const c = document.createElement("div");
  c.className = "drawer-toggle drawer-header";
  const f = document.createElement("div");
  f.id = "engram-drawer-icon", f.className = "drawer-icon fa-fw closedIcon", f.title = "Engram - 记忆操作系统", f.setAttribute("data-i18n", "[title]Engram - Memory OS"), f.innerHTML = sm, f.addEventListener("click", Qi), c.appendChild(f), o.appendChild(c), s ? (u.insertBefore(o, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (u.appendChild(o), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function kg() {
  const u = document.createElement("div");
  u.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", u.title = "Engram - 记忆操作系统", u.innerHTML = sm, u.addEventListener("click", Qi), document.body.appendChild(u);
}
let Vi = null;
function Mg(u) {
  Vi = u, Vi = u;
}
let Uc = null, E1 = null;
function Og(u) {
  Uc = u;
}
function Rg() {
  if (!Uc) {
    console.warn("[Engram] Global renderer not ready");
    return;
  }
  const u = "engram-global-overlay";
  let s = document.getElementById(u);
  s || (s = document.createElement("div"), s.id = u, s.className = "pointer-events-none fixed inset-0 z-[11000]", document.body.appendChild(s)), E1 || (E1 = Uc(s, () => {
  }), console.log("[Engram] Global overlay mounted"));
}
let Tc = !1, rr = null, qi = null;
function Qi() {
  Tc && rr ? (qi && (qi.unmount(), qi = null), rr.remove(), rr = null, Tc = !1) : (rr = Dg(), document.body.appendChild(rr), Tc = !0);
}
function Dg() {
  var s;
  const u = document.createElement("div");
  return u.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", u.style.backgroundColor = "var(--background)", u.style.color = "var(--foreground)", u.style.height = "100dvh", u.style.width = "100vw", u.style.top = "0", u.style.left = "0", u.id = "engram-panel-root", Vi ? qi = Vi(u, Qi) : (u.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = u.querySelector("button")) == null || s.addEventListener("click", Qi)), u;
}
async function Ug(u, s) {
  try {
    const c = await new Function("path", "return import(path)")("/scripts/chats.js");
    c && typeof c.hideChatMessageRange == "function" ? (await c.hideChatMessageRange(u, s, !1), console.log(`[Engram] Hidden messages range: ${u}-${s}`)) : console.warn("[Engram] hideChatMessageRange not found in chats.js");
  } catch (o) {
    console.error("[Engram] Failed to hide messages:", o);
  }
}
async function Bg(u, s = "text", o = "") {
  return window.callPopup ? window.callPopup(u, s, o) : (console.warn("[Engram] callPopup not available"), Promise.resolve(s === "confirm" ? !0 : null));
}
const Hg = (u) => {
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
}, T1 = ({ onNavigate: u }) => {
  const [s, o] = M.useState([]), [c, f] = M.useState(ra()), [h, y] = M.useState(0);
  M.useEffect(() => (o(ae.getLogs().slice(0, 3)), ae.subscribe((b) => {
    o((D) => [b, ...D].slice(0, 3));
  })), []), M.useEffect(() => {
    const E = setInterval(() => {
      y((b) => b + 1);
    }, 1e3);
    return () => clearInterval(E);
  }, []);
  const p = (E) => {
    const b = Math.floor(E / 3600), D = Math.floor(E % 3600 / 60), H = E % 60;
    return `${b.toString().padStart(2, "0")}:${D.toString().padStart(2, "0")}:${H.toString().padStart(2, "0")}`;
  }, g = (c == null ? void 0 : c.name2) || "Unknown", v = (E) => {
    u && u(E);
  };
  return /* @__PURE__ */ i.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ i.jsx(
        Ec,
        {
          title: "ACTIVE MODEL",
          value: c ? "Connected" : "Offline",
          subtext: c ? `Chatting with ${g}` : "Waiting for connection...",
          icon: W1,
          highlight: !!c
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ec,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: fr
        }
      ),
      /* @__PURE__ */ i.jsx(
        Ec,
        {
          title: "SYSTEM UPTIME",
          value: p(h),
          subtext: "Session Duration",
          icon: Vc
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(Fc, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("memory"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("graph"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("processing"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => v("settings"), children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ i.jsx(ia, { size: 16 }),
        /* @__PURE__ */ i.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ i.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => v("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map((E) => /* @__PURE__ */ i.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${Hg(E.level)}`, children: [
        /* @__PURE__ */ i.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date(E.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ i.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: E.message })
      ] }, E.id)) })
    ] })
  ] }) });
}, Fi = ({ title: u, subtitle: s, actions: o }) => /* @__PURE__ */ i.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: u }),
    s && /* @__PURE__ */ i.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: s })
  ] }),
  o && /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: o })
] }), _1 = ({
  icon: u,
  label: s,
  primary: o = !1,
  size: c = "md",
  className: f = "",
  ...h
}) => /* @__PURE__ */ i.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${c === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${o ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${f}
        `,
    ...h,
    children: [
      u && /* @__PURE__ */ i.jsx(u, { size: c === "sm" ? 14 : 16 }),
      s
    ]
  }
), Lg = () => {
  const [u] = M.useState([
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
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Zc, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(e3, { size: 16 }) }),
      /* @__PURE__ */ i.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ i.jsx(Jc, { size: 16 }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ i.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ i.jsx("defs", { children: /* @__PURE__ */ i.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ i.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((o, c) => {
        const f = u.find((b) => b.id === o.source), h = u.find((b) => b.id === o.target);
        if (!f || !h) return null;
        const y = f.x + 150 / 2, p = f.y + 60, g = h.x + 150 / 2, v = h.y, E = `M ${y} ${p} C ${y} ${p + 50}, ${g} ${v - 50}, ${g} ${v}`;
        return /* @__PURE__ */ i.jsx("g", { children: /* @__PURE__ */ i.jsx("path", { d: E, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, c);
      })
    ] }),
    u.map((o) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "absolute w-[150px] group/node cursor-grab active:cursor-grabbing",
        style: { left: o.x, top: o.y },
        children: [
          o.type !== "input" && /* @__PURE__ */ i.jsx("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          o.type !== "output" && /* @__PURE__ */ i.jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          /* @__PURE__ */ i.jsxs("div", { className: `
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${o.type === "input" ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-border group-hover/node:border-border shadow-lg"}
                    `, children: [
            /* @__PURE__ */ i.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold", children: o.type }),
            /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-foreground font-medium flex items-center gap-2", children: [
              o.type === "input" && /* @__PURE__ */ i.jsx(ia, { size: 12, className: "text-blue-400" }),
              o.type === "process" && /* @__PURE__ */ i.jsx(Vc, { size: 12, className: "text-purple-400" }),
              o.type === "output" && /* @__PURE__ */ i.jsx(fr, { size: 12, className: "text-emerald-400" }),
              o.label
            ] })
          ] })
        ]
      },
      o.id
    ))
  ] });
}, qg = () => /* @__PURE__ */ i.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ i.jsx(
    Fi,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i.jsx(_1, { icon: $c, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ i.jsx(_1, { icon: Jc, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ i.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ i.jsx(Lg, {}) })
] });
function Yg(u) {
  return new Date(u).toTimeString().slice(0, 8);
}
const Gg = {
  [Re.DEBUG]: { text: "text-zinc-500", bg: "bg-zinc-500/10" },
  [Re.INFO]: { text: "text-blue-400", bg: "bg-blue-500/10" },
  [Re.SUCCESS]: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  [Re.WARN]: { text: "text-amber-400", bg: "bg-amber-500/10" },
  [Re.ERROR]: { text: "text-red-400", bg: "bg-red-500/10" }
}, Vg = ({ entry: u }) => {
  const [s, o] = M.useState(!1), c = u.data !== void 0, f = Gi[u.level], h = Gg[u.level];
  return /* @__PURE__ */ i.jsxs("div", { className: "group", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                    flex items-start gap-3 px-2 py-1 rounded-sm transition-colors
                    hover:bg-white/[0.02]
                    ${c ? "cursor-pointer" : ""}
                `,
        onClick: () => c && o(!s),
        children: [
          /* @__PURE__ */ i.jsx("span", { className: "flex items-center text-zinc-600 shrink-0 mt-0.5 w-3", children: c ? s ? /* @__PURE__ */ i.jsx(ur, { size: 12 }) : /* @__PURE__ */ i.jsx(X1, { size: 12 }) : null }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-600 shrink-0 tabular-nums text-[11px]", children: Yg(u.timestamp) }),
          /* @__PURE__ */ i.jsx("span", { className: `
                    shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded
                    ${h.text} ${h.bg}
                `, children: f.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-500 shrink-0 text-[11px]", children: u.module }),
          /* @__PURE__ */ i.jsx("span", { className: "text-zinc-300 text-[11px] break-words flex-1 leading-relaxed", children: u.message })
        ]
      }
    ),
    s && c && /* @__PURE__ */ i.jsx("div", { className: "ml-10 mr-2 mb-1 px-3 py-2 bg-zinc-900/50 border-l-2 border-zinc-700 rounded-r text-[10px]", children: /* @__PURE__ */ i.jsx("pre", { className: "m-0 text-zinc-400 whitespace-pre-wrap break-words font-mono", children: JSON.stringify(u.data, null, 2) }) })
  ] });
}, z1 = 100;
class Qg {
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
      floorRange: s.floorRange,
      status: "pending"
    };
    return this.entries.unshift(c), this.trimEntries(), this.notifyListeners(), o;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(s, o) {
    const c = this.entries.find((y) => y.id === s);
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
    const h = this.entries.findIndex((y) => y.id === s);
    h >= 0 ? this.entries.splice(h, 0, f) : this.entries.unshift(f), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(s, o) {
    const c = this.logSend(s), f = Date.now();
    try {
      const h = await o();
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
    const s = [], o = this.entries.filter((c) => c.direction === "sent");
    for (const c of o) {
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
    this.entries.length > z1 * 2 && (this.entries = this.entries.slice(0, z1 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const Ln = new Qg(), Xg = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, $g = ({ status: u }) => {
  switch (u) {
    case "pending":
      return /* @__PURE__ */ i.jsx(K1, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ i.jsx(Gc, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ i.jsx(Yc, { size: 14, className: "text-red-400" });
  }
}, Zg = (u) => new Date(u).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), Kg = (u) => u === void 0 ? "-" : u < 1e3 ? `${u}ms` : `${(u / 1e3).toFixed(1)}s`, Jg = ({ sent: u, received: s }) => {
  const [o, c] = M.useState(!1), f = Xg[u.type];
  return /* @__PURE__ */ i.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => c(!o),
        children: [
          o ? /* @__PURE__ */ i.jsx(ur, { size: 14 }) : /* @__PURE__ */ i.jsx(X1, { size: 14 }),
          /* @__PURE__ */ i.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${f.color}`, children: f.label }),
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: Zg(u.timestamp) }),
          /* @__PURE__ */ i.jsx($g, { status: (s == null ? void 0 : s.status) || u.status }),
          u.floorRange && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            u.floorRange[0],
            "-",
            u.floorRange[1]
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ i.jsx(A4, { size: 12 }),
            Kg((s == null ? void 0 : s.duration) || u.duration)
          ] })
        ]
      }
    ),
    o && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ i.jsx(C3, { size: 14 }),
          "发送",
          u.tokensSent && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            u.tokensSent,
            " tokens"
          ] })
        ] }),
        u.systemPrompt && /* @__PURE__ */ i.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: u.systemPrompt })
        ] }),
        u.userPrompt && /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: u.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ i.jsx(G1, { size: 14 }),
          "接收",
          (s == null ? void 0 : s.tokensReceived) && /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            s.tokensReceived,
            " tokens"
          ] })
        ] }),
        (s == null ? void 0 : s.status) === "error" && s.error && /* @__PURE__ */ i.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: s.error }),
        (s == null ? void 0 : s.response) && /* @__PURE__ */ i.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: s.response }),
        !s && u.status === "pending" && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(K1, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, Fg = () => {
  const [u, s] = M.useState(Ln.getPaired());
  return M.useEffect(() => Ln.subscribe(() => {
    s(Ln.getPaired());
  }), []), /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i.jsx(Fc, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ i.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ i.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          u.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => Ln.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ i.jsx(sa, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: u.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ i.jsx(G1, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-3", children: u.map(({ sent: o, received: c }) => /* @__PURE__ */ i.jsx(Jg, { sent: o, received: c }, o.id)) }) })
  ] });
}, Bc = ({ tabs: u, activeTab: s, onChange: o, sticky: c = !0, top: f = 0, className: h = "", actions: y }) => /* @__PURE__ */ i.jsxs(
  "div",
  {
    className: `
            flex items-center justify-between gap-4 mb-6 border-b border-border
            ${c ? "sticky z-10 bg-background pt-4 pb-0 -mt-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12" : "px-0"}
            ${h}
        `,
    style: c ? { top: f } : void 0,
    children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex overflow-x-auto gap-2 pb-1 no-scrollbar", children: u.map((p) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          onClick: () => o(p.id),
          className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === p.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            p.icon && /* @__PURE__ */ i.jsx("span", { className: "w-4 h-4", children: p.icon }),
            p.label,
            s === p.id && /* @__PURE__ */ i.jsx("div", { className: "absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)] z-10 transition-all duration-300" })
          ]
        },
        p.id
      )) }),
      y && /* @__PURE__ */ i.jsx("div", { className: "flex items-center gap-2 pb-1 shrink-0", children: y })
    ]
  }
), Wg = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ i.jsx(ia, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ i.jsx(Fc, { size: 14 }) }
], Ig = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], Pg = ({ initialTab: u }) => {
  const [s, o] = M.useState(u || "runtime"), [c, f] = M.useState([]), [h, y] = M.useState([]), [p, g] = M.useState(""), [v, E] = M.useState(-1), [b, D] = M.useState("ALL"), [H, B] = M.useState(!0), [q, F] = M.useState(!1), [ee, Y] = M.useState(!1), te = M.useRef(null);
  M.useEffect(() => {
    f(ae.getLogs());
    const J = ae.subscribe((X) => {
      f((be) => [...be, X]);
    });
    return () => J();
  }, []), M.useEffect(() => {
    let J = c;
    if (v !== -1 && (J = J.filter((X) => X.level >= v)), b !== "ALL" && (J = J.filter((X) => X.module.startsWith(b))), p.trim()) {
      const X = p.toLowerCase();
      J = J.filter(
        (be) => be.message.toLowerCase().includes(X) || be.module.toLowerCase().includes(X)
      );
    }
    y(J);
  }, [c, v, b, p]), M.useEffect(() => {
    H && te.current && te.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [h, H]);
  const Me = M.useCallback(async () => {
    await ae.clear(), f([]);
  }, []), ne = M.useCallback(() => {
    const J = ae.exportToMarkdown(), X = ae.getExportFilename(), be = new Blob([J], { type: "text/markdown" }), Oe = URL.createObjectURL(be), Se = document.createElement("a");
    Se.href = Oe, Se.download = X, Se.click(), URL.revokeObjectURL(Oe), ae.success("DevLog", `日志已导出: ${X}`);
  }, []);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "开发日志" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "运行时日志和模型调用记录" })
    ] }),
    /* @__PURE__ */ i.jsx(
      Bc,
      {
        tabs: Wg,
        activeTab: s,
        onChange: (J) => o(J),
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
              onClick: () => F(!q),
              children: [
                v === -1 ? "全部级别" : Gi[v].label,
                /* @__PURE__ */ i.jsx(ur, { size: 12 })
              ]
            }
          ),
          q && /* @__PURE__ */ i.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1 flex flex-col", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  E(-1), F(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(Gi).map(([J, X]) => /* @__PURE__ */ i.jsxs(
              "button",
              {
                className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  E(Number(J)), F(!1);
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
        /* @__PURE__ */ i.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => Y(!ee),
              children: [
                b,
                /* @__PURE__ */ i.jsx(ur, { size: 12 })
              ]
            }
          ),
          ee && /* @__PURE__ */ i.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto flex flex-col", children: Ig.map((J) => /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "block w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                D(J), Y(!1);
              },
              children: J
            },
            J
          )) })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ i.jsx(ir, { size: 12 }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: p,
              onChange: (J) => g(J.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${H ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => B(!H),
              title: "自动滚动",
              children: /* @__PURE__ */ i.jsx(i4, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: Me,
              title: "清空",
              children: /* @__PURE__ */ i.jsx(sa, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: ne,
              children: [
                /* @__PURE__ */ i.jsx(Yi, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: h.length === 0 ? /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ i.jsx(ia, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        h.map((J) => /* @__PURE__ */ i.jsx(Vg, { entry: J }, J.id)),
        /* @__PURE__ */ i.jsx("div", { ref: te })
      ] }) }),
      /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        c.length,
        " 条日志",
        h.length !== c.length && ` · ${h.length} 条匹配`
      ] })
    ] }),
    s === "model" && /* @__PURE__ */ i.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ i.jsx(Fg, {}) })
  ] });
}, e5 = {
  default: "text-muted-foreground bg-muted/50",
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  emerald: "text-emerald-500 bg-emerald-500/10"
}, t5 = ({
  icon: u,
  title: s,
  subtitle: o,
  meta: c,
  badges: f = [],
  selected: h = !1,
  disabled: y = !1,
  toggle: p,
  onClick: g,
  actions: v = [],
  className: E = "",
  compact: b = !1
}) => {
  const D = v.filter((B) => !B.hidden), H = !!p;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group relative flex items-center gap-3 
                ${b ? "py-2 px-2" : "py-3 px-3"}
                rounded-lg cursor-pointer transition-all duration-150
                ${h ? "bg-accent/60" : "hover:bg-muted/40"}
                ${y ? "opacity-50 pointer-events-none" : ""}
                ${E}
            `,
      onClick: g,
      children: [
        (u || H) && /* @__PURE__ */ i.jsx("div", { className: "flex-shrink-0", children: H ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `
                                w-7 h-7 flex items-center justify-center rounded-md transition-colors
                                ${p.checked ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                            `,
            onClick: (B) => {
              B.stopPropagation(), p.onChange(!p.checked);
            },
            children: /* @__PURE__ */ i.jsx(Kc, { size: 14 })
          }
        ) : /* @__PURE__ */ i.jsx("div", { className: `
                            w-7 h-7 flex items-center justify-center rounded-md transition-colors
                            ${h ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
                        `, children: u }) }),
        /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i.jsx("span", { className: `
                        text-sm font-medium truncate transition-colors
                        ${h ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}
                        ${p && !p.checked ? "line-through opacity-60" : ""}
                    `, children: s }),
            f.map((B, q) => /* @__PURE__ */ i.jsx(
              "span",
              {
                className: `
                                text-[10px] px-1.5 py-0.5 rounded-sm font-medium flex-shrink-0
                                ${e5[B.color || "default"]}
                            `,
                children: B.text
              },
              q
            ))
          ] }),
          (o || c) && /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between mt-0.5 text-[11px] text-muted-foreground/70", children: [
            o && /* @__PURE__ */ i.jsx("span", { className: "truncate", children: o }),
            c && /* @__PURE__ */ i.jsx("span", { className: "flex-shrink-0 font-mono", children: c })
          ] })
        ] }),
        h && !D.length && /* @__PURE__ */ i.jsx(Q1, { size: 14, className: "text-primary flex-shrink-0" }),
        D.length > 0 && /* @__PURE__ */ i.jsx("div", { className: `
                    flex items-center gap-0.5 flex-shrink-0
                    ${h ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    transition-opacity
                `, children: D.map((B, q) => /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `
                                p-1.5 rounded transition-colors
                                ${B.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                            `,
            onClick: (F) => {
              F.stopPropagation(), B.onClick(F);
            },
            title: B.title,
            children: B.icon
          },
          q
        )) })
      ]
    }
  );
}, n5 = ({
  preset: u,
  isSelected: s,
  onSelect: o,
  onEdit: c,
  onCopy: f,
  onDelete: h
}) => {
  var g;
  const y = u.source === "tavern" || u.source === "tavern_profile" ? W1 : k4, p = u.source === "custom" ? ((g = u.custom) == null ? void 0 : g.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ i.jsx(
    t5,
    {
      icon: /* @__PURE__ */ i.jsx(y, { size: 14 }),
      title: u.name,
      subtitle: p,
      meta: `T:${u.parameters.temperature}`,
      badges: u.isDefault ? [{ text: "DEFAULT", color: "primary" }] : [],
      selected: s,
      onClick: o,
      actions: [
        { icon: /* @__PURE__ */ i.jsx(c3, { size: 12 }), onClick: () => c(), title: "编辑" },
        { icon: /* @__PURE__ */ i.jsx($1, { size: 12 }), onClick: () => f(), title: "复制" },
        { icon: /* @__PURE__ */ i.jsx(sa, { size: 12 }), onClick: () => h(), title: "删除", danger: !0, hidden: u.isDefault }
      ]
    }
  );
}, Bt = ({ title: u, description: s, children: o, className: c = "" }) => /* @__PURE__ */ i.jsxs("div", { className: `mb-8 ${c}`, children: [
  /* @__PURE__ */ i.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-primary", children: u }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s })
  ] }),
  /* @__PURE__ */ i.jsx("div", { className: "space-y-4", children: o })
] }), gt = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: h,
  onChange: y,
  placeholder: p,
  type: g = "text",
  disabled: v,
  multiline: E,
  rows: b = 3
}) => {
  const D = {
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
  return /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1 ${f}`, children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    E ? /* @__PURE__ */ i.jsx(
      "textarea",
      {
        value: h,
        onChange: (H) => y(H.target.value),
        placeholder: p,
        disabled: v,
        rows: b,
        style: D,
        className: "font-mono resize-y min-h-[80px] placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ) : /* @__PURE__ */ i.jsx(
      "input",
      {
        type: g,
        value: h,
        onChange: (H) => y(H.target.value),
        placeholder: p,
        disabled: v,
        style: D,
        className: "placeholder:text-muted-foreground/40 disabled:opacity-50 focus:border-primary transition-colors"
      }
    ),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, cl = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: h,
  onChange: y,
  min: p,
  max: g,
  step: v = 1,
  showSlider: E = !0,
  suffix: b
}) => {
  const D = {
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
  }, H = p !== void 0 && g !== void 0 ? Math.min(100, Math.max(0, (h - p) / (g - p) * 100)) : 0;
  return /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-2 ${f}`, children: [
    /* @__PURE__ */ i.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ i.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
      E && p !== void 0 && g !== void 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex-1 relative h-4 flex items-center group cursor-pointer", children: [
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
            style: { left: `${H}%`, transform: "translate(-50%, -50%)" }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "range",
            min: p,
            max: g,
            step: v,
            value: h,
            onChange: (B) => y(Number(B.target.value)),
            className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
            style: { appearance: "none", WebkitAppearance: "none" }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "number",
          min: p,
          max: g,
          step: v,
          value: h,
          onChange: (B) => y(Number(B.target.value)),
          style: D,
          className: "focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        }
      )
    ] }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, la = ({
  label: u,
  description: s,
  error: o,
  required: c,
  className: f = "",
  value: h,
  onChange: y,
  options: p,
  placeholder: g = "请选择...",
  disabled: v
}) => {
  const E = {
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
  return /* @__PURE__ */ i.jsxs("div", { className: `flex flex-col gap-1 ${f}`, children: [
    /* @__PURE__ */ i.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      u,
      c && /* @__PURE__ */ i.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          value: h,
          onChange: (b) => y(b.target.value),
          disabled: v,
          style: E,
          className: "disabled:opacity-50 disabled:cursor-not-allowed focus:border-primary transition-colors",
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: g }),
            p.map((b) => /* @__PURE__ */ i.jsx("option", { value: b.value, className: "bg-popover text-foreground", children: b.label }, b.value))
          ]
        }
      ),
      /* @__PURE__ */ i.jsx(ur, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" })
    ] }),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: s }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive", children: o })
  ] });
}, aa = ({
  label: u,
  description: s,
  error: o,
  className: c = "",
  checked: f,
  onChange: h,
  disabled: y
}) => /* @__PURE__ */ i.jsxs("div", { className: `flex items-start justify-between gap-4 py-1 ${c} ${y ? "opacity-50 pointer-events-none" : ""}`, children: [
  u && // 只有当 label 存在时才渲染左侧区域，避免只有开关时占用过多空间
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ i.jsx(
      "label",
      {
        className: "text-xs text-foreground cursor-pointer",
        onClick: () => !y && h(!f),
        children: u
      }
    ),
    s && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: s }),
    o && /* @__PURE__ */ i.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: o })
  ] }),
  /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": f,
      onClick: () => !y && h(!f),
      disabled: y,
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
                        ${f ? "left-full -translate-x-full bg-foreground" : "left-0 bg-muted-foreground"}
                    `,
            style: { top: "50%", transform: f ? "translate(-100%, -50%)" : "translate(0, -50%)" }
          }
        )
      ]
    }
  )
] }), l5 = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], a5 = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function r5() {
  var u, s, o, c;
  try {
    const f = (o = (s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) == null ? void 0 : o.extensionSettings;
    return ((c = f == null ? void 0 : f.connectionManager) == null ? void 0 : c.profiles) || [];
  } catch (f) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", f), [];
  }
}
const i5 = ({
  preset: u,
  onChange: s,
  isNew: o = !1
}) => {
  var B, q, F, ee;
  const [c, f] = M.useState([]), [h, y] = M.useState(!1), p = () => {
    y(!0);
    try {
      const Y = r5();
      f(Y);
    } finally {
      y(!1);
    }
  };
  M.useEffect(() => {
    p();
  }, []);
  const g = (Y) => {
    s({ ...u, ...Y, updatedAt: Date.now() });
  }, v = (Y, te) => {
    g({
      parameters: { ...u.parameters, [Y]: te }
    });
  }, E = (Y, te) => {
    var Me, ne, J, X;
    g({
      custom: {
        apiUrl: ((Me = u.custom) == null ? void 0 : Me.apiUrl) || "",
        apiKey: ((ne = u.custom) == null ? void 0 : ne.apiKey) || "",
        model: ((J = u.custom) == null ? void 0 : J.model) || "",
        apiSource: ((X = u.custom) == null ? void 0 : X.apiSource) || "openai",
        [Y]: te
      }
    });
  }, b = (Y) => {
    const te = Y;
    g({
      source: te,
      tavernProfileId: te === "tavern_profile" ? u.tavernProfileId : void 0
    }), te === "tavern_profile" && p();
  }, D = c.map((Y) => ({
    value: Y.id,
    label: `${Y.name} (${Y.api || "Unknown"} - ${Y.model || "Unknown"})`
  })), H = c.find((Y) => Y.id === u.tavernProfileId);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(Bt, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "预设名称",
          value: u.name,
          onChange: (Y) => g({ name: Y }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        la,
        {
          label: "配置源",
          value: u.source,
          onChange: b,
          options: a5,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    u.source === "tavern_profile" && /* @__PURE__ */ i.jsxs(Bt, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ i.jsx(
          la,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: u.tavernProfileId || "",
            onChange: (Y) => g({ tavernProfileId: Y }),
            options: D,
            placeholder: h ? "加载中..." : "请选择配置文件",
            disabled: h || D.length === 0
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: p,
            disabled: h,
            title: "刷新配置列表",
            children: /* @__PURE__ */ i.jsx(na, { size: 16, className: h ? "animate-spin" : "" })
          }
        )
      ] }),
      D.length === 0 && !h && /* @__PURE__ */ i.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
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
    u.source === "custom" && /* @__PURE__ */ i.jsxs(Bt, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ i.jsx(
        la,
        {
          label: "API 类型",
          value: ((B = u.custom) == null ? void 0 : B.apiSource) || "openai",
          onChange: (Y) => E("apiSource", Y),
          options: l5
        }
      ),
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "API URL",
          type: "url",
          value: ((q = u.custom) == null ? void 0 : q.apiUrl) || "",
          onChange: (Y) => E("apiUrl", Y),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "API Key",
          type: "password",
          value: ((F = u.custom) == null ? void 0 : F.apiKey) || "",
          onChange: (Y) => E("apiKey", Y),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "模型名称",
          value: ((ee = u.custom) == null ? void 0 : ee.model) || "",
          onChange: (Y) => E("model", Y),
          placeholder: "gpt-4o-mini",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(Bt, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ i.jsx(
        cl,
        {
          label: "温度 (Temperature)",
          value: u.parameters.temperature,
          onChange: (Y) => v("temperature", Y),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ i.jsx(
        cl,
        {
          label: "Top-P",
          value: u.parameters.topP,
          onChange: (Y) => v("topP", Y),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        cl,
        {
          label: "最大输出 Tokens",
          value: u.parameters.maxTokens,
          onChange: (Y) => v("maxTokens", Y),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ i.jsx(
        cl,
        {
          label: "频率惩罚",
          value: u.parameters.frequencyPenalty,
          onChange: (Y) => v("frequencyPenalty", Y),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ i.jsx(
        cl,
        {
          label: "存在惩罚",
          value: u.parameters.presencePenalty,
          onChange: (Y) => v("presencePenalty", Y),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] })
  ] });
}, s5 = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], A1 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, w1 = ["ollama", "vllm"], k1 = ["openai", "cohere", "jina", "voyage"], o5 = ({
  config: u,
  onChange: s
}) => {
  var y;
  const o = (p) => {
    s({ ...u, ...p });
  }, c = (p) => {
    o({
      source: p,
      model: A1[p],
      apiUrl: w1.includes(p) ? u.apiUrl : void 0,
      apiKey: k1.includes(p) ? u.apiKey : void 0
    });
  }, f = w1.includes(u.source), h = k1.includes(u.source);
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsxs(Bt, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ i.jsx(
        la,
        {
          label: "向量源",
          value: u.source,
          onChange: (p) => c(p),
          options: s5,
          description: "选择向量化服务提供商"
        }
      ),
      f && /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "API URL",
          type: "url",
          value: u.apiUrl || "",
          onChange: (p) => o({ apiUrl: p }),
          placeholder: u.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${u.source} 服务的 API 端点`
        }
      ),
      h && /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "API Key",
          type: "password",
          value: u.apiKey || "",
          onChange: (p) => o({ apiKey: p }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "模型名称",
          value: u.model || "",
          onChange: (p) => o({ model: p }),
          placeholder: A1[u.source],
          description: "使用的向量化模型"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(Bt, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ i.jsx(
      gt,
      {
        label: "向量维度",
        value: ((y = u.dimensions) == null ? void 0 : y.toString()) || "",
        onChange: (p) => {
          const g = parseInt(p, 10);
          o({ dimensions: isNaN(g) ? void 0 : g });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, c5 = [
  "BAAI/bge-reranker-v2-m3",
  "BAAI/bge-reranker-base",
  "BAAI/bge-reranker-large",
  "cross-encoder/ms-marco-MiniLM-L-12-v2",
  "Xenova/ms-marco-MiniLM-L-6-v2"
], u5 = ({
  config: u,
  onChange: s
}) => {
  const o = (c) => {
    s({ ...u, ...c });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "", children: [
    /* @__PURE__ */ i.jsx(Bt, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ i.jsx(
      aa,
      {
        label: "启用 Rerank",
        checked: u.enabled,
        onChange: (c) => o({ enabled: c }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    u.enabled && /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs(Bt, { title: "API 配置", children: [
        /* @__PURE__ */ i.jsx(
          gt,
          {
            label: "API URL",
            type: "url",
            value: u.url,
            onChange: (c) => o({ url: c }),
            placeholder: "http://localhost:8000/rerank",
            description: "Rerank 服务的 API 端点",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          gt,
          {
            label: "API Key",
            type: "password",
            value: u.apiKey,
            onChange: (c) => o({ apiKey: c }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ i.jsx(
            gt,
            {
              label: "模型名称",
              value: u.model,
              onChange: (c) => o({ model: c }),
              placeholder: "BAAI/bge-reranker-v2-m3",
              description: "使用的 Rerank 模型",
              required: !0
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("span", { className: "block text-[10px] text-muted-foreground mb-2", children: "常用模型：" }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: c5.map((c) => /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: `
                                                px-2.5 py-1 border rounded text-xs cursor-pointer transition-all 
                                                ${u.model === c ? "bg-accent border-input text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}
                                            `,
                onClick: () => o({ model: c }),
                children: c.split("/").pop()
              },
              c
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs(Bt, { title: "参数设置", children: [
        /* @__PURE__ */ i.jsx(
          cl,
          {
            label: "Top-N",
            value: u.topN,
            onChange: (c) => o({ topN: c }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ i.jsx(
          cl,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: u.hybridAlpha,
            onChange: (c) => o({ hybridAlpha: c }),
            min: 0,
            max: 1,
            step: 0.1,
            description: "0 = 纯向量检索评分，1 = 纯 Rerank 评分"
          }
        )
      ] })
    ] })
  ] });
}, Xi = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], d5 = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, f5 = {
  maxChatHistory: 10
}, m5 = {
  source: "transformers"
}, h5 = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function om(u = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: u,
    source: "tavern",
    parameters: { ...d5 },
    context: { ...f5 },
    isDefault: !0,
    createdAt: s,
    updatedAt: s
  };
}
function dl(u, s, o = {}) {
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
function g5() {
  return [
    dl("纯文本剧情总结", "text_summary", {
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
    dl("向量化剧情总结", "vector_summary", {
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
    dl("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: "你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。",
      userPromptTemplate: `请将以下多条剧情摘要合并精简：

{{context}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    dl("查询增强", "query_enhance", {
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
const p5 = {
  enabled: !0,
  includeGlobal: !0
}, x5 = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  countLimit: 5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
};
function y5() {
  return {
    llmPresets: [om()],
    selectedPresetId: null,
    vectorConfig: { ...m5 },
    rerankConfig: { ...h5 },
    promptTemplates: g5(),
    worldbookConfig: { ...p5 }
  };
}
function v5(u) {
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
function b5(u) {
  var s;
  return ((s = Xi.find((o) => o.value === u)) == null ? void 0 : s.label) || u;
}
const S5 = ({
  template: u,
  isSelected: s = !1,
  onSelect: o,
  onCopy: c,
  onDelete: f,
  onToggleEnabled: h,
  onImport: y
}) => {
  const p = M.useRef(null), g = (b) => {
    b.stopPropagation();
    const D = {
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
    }, H = new Blob([JSON.stringify(D, null, 2)], { type: "application/json" }), B = URL.createObjectURL(H), q = document.createElement("a");
    q.href = B, q.download = `engram_template_${u.name.replace(/\s+/g, "_")}.json`, q.click(), URL.revokeObjectURL(B);
  }, v = (b) => {
    var D;
    b.stopPropagation(), (D = p.current) == null || D.click();
  }, E = (b) => {
    var B;
    const D = (B = b.target.files) == null ? void 0 : B[0];
    if (!D || !y) return;
    const H = new FileReader();
    H.onload = (q) => {
      var F;
      try {
        const ee = JSON.parse((F = q.target) == null ? void 0 : F.result);
        if (ee.version && ee.template) {
          const Y = dl(
            ee.template.name,
            ee.template.category,
            {
              enabled: u.enabled,
              // 保持当前启用状态
              isBuiltIn: u.isBuiltIn,
              // 保持内置状态
              boundPresetId: ee.template.boundPresetId,
              systemPrompt: ee.template.systemPrompt,
              userPromptTemplate: ee.template.userPromptTemplate,
              outputFormat: ee.template.outputFormat,
              availableVariables: ee.template.availableVariables
            }
          );
          Y.id = u.id, y(Y);
        }
      } catch (ee) {
        console.error("导入失败:", ee);
      }
    }, H.readAsText(D), p.current && (p.current.value = "");
  };
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: `
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${s ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: o,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${u.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (b) => {
                b.stopPropagation(), h == null || h(!u.enabled);
              },
              children: /* @__PURE__ */ i.jsx(Kc, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: u.name }),
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ i.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${v5(u.category)}`, children: b5(u.category) }),
                u.isBuiltIn && /* @__PURE__ */ i.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ i.jsx("span", { className: "truncate max-w-[120px]", children: u.boundPresetId ? `BOUND: ${u.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ i.jsx("span", { children: u.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${s || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: v, title: "Import", children: /* @__PURE__ */ i.jsx(R3, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: g, title: "Export", children: /* @__PURE__ */ i.jsx(Yi, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (b) => {
            b.stopPropagation(), c == null || c();
          }, title: "Copy", children: /* @__PURE__ */ i.jsx($1, { size: 12 }) }),
          !u.isBuiltIn && /* @__PURE__ */ i.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (b) => {
            b.stopPropagation(), f == null || f();
          }, title: "Delete", children: /* @__PURE__ */ i.jsx(sa, { size: 12 }) })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            ref: p,
            type: "file",
            accept: ".json",
            onChange: E,
            className: "hidden"
          }
        )
      ]
    }
  );
}, j5 = ({
  templates: u,
  selectedId: s,
  onSelect: o,
  onAdd: c,
  onUpdate: f,
  onDelete: h
}) => {
  const y = () => {
    const b = dl(
      `新模板 ${u.length + 1}`,
      "text_summary"
    );
    c(b), o(b);
  }, p = (b) => {
    const D = dl(
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
    c(D);
  }, g = (b, D) => {
    D && u.filter((H) => H.category === b.category && H.id !== b.id && H.enabled).forEach((H) => f({ ...H, enabled: !1 })), f({ ...b, enabled: D });
  }, v = (b) => {
    f(b);
  }, E = Xi.map((b) => ({
    ...b,
    templates: u.filter((D) => D.category === b.value)
  })).filter((b) => b.templates.length > 0);
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: y,
          children: /* @__PURE__ */ i.jsx(Zc, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      E.map((b) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          b.label,
          /* @__PURE__ */ i.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: b.templates.map((D) => /* @__PURE__ */ i.jsx(
          S5,
          {
            template: D,
            isSelected: s === D.id,
            onSelect: () => o(D),
            onCopy: () => p(D),
            onDelete: () => h(D),
            onToggleEnabled: (H) => g(D, H),
            onImport: v
          },
          D.id
        )) })
      ] }, b.value)),
      u.length === 0 && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ i.jsx(Qc, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, C5 = [
  { name: "{{chatHistory}}", desc: "待处理的对话历史" },
  { name: "{{context}}", desc: "角色卡设定" },
  { name: "{{char}}", desc: "角色名" },
  { name: "{{user}}", desc: "用户名" },
  { name: "{{userInput}}", desc: "当前用户输入" },
  { name: "{{worldbookContext}}", desc: "世界书激活内容" },
  { name: "{{engramSummaries}}", desc: "Engram 所有摘要（用于精简）" }
], N5 = ({
  template: u,
  llmPresets: s,
  defaultPresetId: o,
  onChange: c
}) => {
  var y, p;
  const f = [
    { value: "", label: "使用默认预设" + (o ? ` (${((y = s.find((g) => g.id === o)) == null ? void 0 : y.name) || o})` : "") },
    ...s.map((g) => ({ value: g.id, label: g.name }))
  ], h = (g) => {
    c({ ...u, ...g, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ i.jsxs(Bt, { title: "基本信息", children: [
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "模板名称",
          value: u.name,
          onChange: (g) => h({ name: g }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: u.isBuiltIn
        }
      ),
      /* @__PURE__ */ i.jsx(
        la,
        {
          label: "模板分类",
          value: u.category,
          onChange: (g) => h({ category: g }),
          options: Xi.map((g) => ({ value: g.value, label: g.label })),
          description: (p = Xi.find((g) => g.value === u.category)) == null ? void 0 : p.description
        }
      ),
      /* @__PURE__ */ i.jsx(
        la,
        {
          label: "模型来源",
          value: u.boundPresetId || "",
          onChange: (g) => h({ boundPresetId: g || null }),
          options: f,
          description: "选择用于此模板的 LLM 预设"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(Bt, { title: "提示词内容", children: [
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "系统提示词",
          value: u.systemPrompt,
          onChange: (g) => h({ systemPrompt: g }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ i.jsx(
        gt,
        {
          label: "用户提示词模板",
          value: u.userPromptTemplate,
          onChange: (g) => h({ userPromptTemplate: g }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ i.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用宏" }),
      /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: C5.map((g) => /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ i.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-primary font-mono whitespace-nowrap", children: g.name }),
        /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground", children: g.desc })
      ] }, g.name)) })
    ] })
  ] });
}, E5 = ({
  rules: u,
  selectedId: s,
  onSelect: o,
  onToggle: c,
  onDelete: f,
  onAdd: h,
  onReset: y
}) => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: y,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ i.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: h,
          children: /* @__PURE__ */ i.jsx(F1, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
    u.map((p) => /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${s === p.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => o(p.id),
        children: [
          /* @__PURE__ */ i.jsx(
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
              children: /* @__PURE__ */ i.jsx(Kc, { size: 14 })
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ i.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ i.jsx("h4", { className: `text-sm font-medium truncate ${s === p.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!p.enabled && "opacity-50 line-through"}`, children: p.name }) }),
            /* @__PURE__ */ i.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ i.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              p.pattern,
              "/",
              p.flags
            ] }) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: `flex items-center ${s === p.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (g) => {
                g.stopPropagation(), f(p.id);
              },
              children: /* @__PURE__ */ i.jsx(sa, { size: 12 })
            }
          ) })
        ]
      },
      p.id
    )),
    u.length === 0 && /* @__PURE__ */ i.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), M1 = [
  { value: "input", label: "输入", description: "清洗发给 LLM 的聊天内容" },
  { value: "output", label: "输出", description: "清洗 LLM 返回的内容（预览/写入前）" },
  { value: "both", label: "两者", description: "输入和输出都应用" }
], dr = [
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
class Pc {
  constructor(s) {
    He(this, "rules", []);
    this.rules = s || [...dr];
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
    this.rules = [...dr];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((s) => s.enabled).length;
  }
}
const $i = new Pc(), T5 = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], _5 = ({ rule: u, onChange: s }) => {
  var E;
  const [o, c] = M.useState(""), [f, h] = M.useState(""), [y, p] = M.useState({ valid: !0 }), g = new Pc();
  M.useEffect(() => {
    const b = g.validatePattern(u.pattern, u.flags);
    p(b);
  }, [u.pattern, u.flags]), M.useEffect(() => {
    if (o && y.valid) {
      const b = g.processWithRule(o, u);
      h(b);
    } else
      h("");
  }, [o, u, y.valid]);
  const v = (b) => {
    const D = u.flags.split(""), H = D.indexOf(b);
    H >= 0 ? D.splice(H, 1) : D.push(b), s({ flags: D.join("") });
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
            value: u.name,
            onChange: (b) => s({ name: b.target.value }),
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
            value: u.description || "",
            onChange: (b) => s({ description: b.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "作用域" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex gap-2", children: M1.map((b) => /* @__PURE__ */ i.jsx(
          "button",
          {
            className: `flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${u.scope === b.value ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => s({ scope: b.value }),
            title: b.description,
            children: b.label
          },
          b.value
        )) }),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground", children: (E = M1.find((b) => b.value === u.scope)) == null ? void 0 : E.description })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          y.valid ? /* @__PURE__ */ i.jsx(Gc, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ i.jsx(Yc, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${y.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: u.pattern,
            onChange: (b) => s({ pattern: b.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !y.valid && y.error && /* @__PURE__ */ i.jsx("p", { className: "text-xs text-red-500", children: y.error })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: u.replacement,
            onChange: (b) => s({ replacement: b.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-wrap gap-2", children: T5.map((b) => /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${u.flags.includes(b.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
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
    /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ i.jsx($c, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: o,
            onChange: (b) => c(b.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      o && y.valid && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ i.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: f || /* @__PURE__ */ i.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ i.jsx(X4, { size: 16, className: "shrink-0 mt-0.5" }),
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
}, z5 = ({
  config: u,
  onChange: s
}) => {
  const o = (c) => {
    s({
      ...u,
      [c]: !u[c]
    });
  };
  return /* @__PURE__ */ i.jsx("div", { className: "", children: /* @__PURE__ */ i.jsxs(Bt, { title: "世界书配置", description: "总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。", children: [
    /* @__PURE__ */ i.jsx(
      aa,
      {
        label: "启用世界书",
        description: "总结时注入始终激活（蓝灯）的世界书条目",
        checked: u.enabled,
        onChange: () => o("enabled")
      }
    ),
    /* @__PURE__ */ i.jsx(
      aa,
      {
        label: "包含全局世界书",
        description: "关闭后只读取角色世界书和聊天世界书",
        checked: u.includeGlobal,
        onChange: () => o("includeGlobal"),
        disabled: !u.enabled
      }
    )
  ] }) });
};
function A5() {
  const [u, s] = M.useState(y5), [o, c] = M.useState(null), [f, h] = M.useState(null), [y, p] = M.useState(!1), [g, v] = M.useState([...dr]), [E, b] = M.useState(null);
  M.useEffect(() => {
    const L = Le.getRegexRules();
    L && L.length > 0 && v(L);
  }, []);
  const D = M.useCallback((L) => {
    s((C) => ({ ...C, selectedPresetId: L.id })), c(L);
  }, []), H = M.useCallback(() => {
    const L = om(`预设 ${u.llmPresets.length + 1}`);
    L.isDefault = !1, s((C) => ({
      ...C,
      llmPresets: [...C.llmPresets, L],
      selectedPresetId: L.id
    })), c(L), p(!0);
  }, [u.llmPresets.length]), B = M.useCallback((L) => {
    s((C) => ({
      ...C,
      llmPresets: C.llmPresets.map((U) => U.id === L.id ? L : U)
    })), c(L), p(!0);
  }, []), q = M.useCallback((L) => {
    const C = {
      ...L,
      id: `preset_${Date.now()}`,
      name: `${L.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((U) => ({ ...U, llmPresets: [...U.llmPresets, C] })), p(!0);
  }, []), F = M.useCallback((L) => {
    L.isDefault || (s((C) => ({
      ...C,
      llmPresets: C.llmPresets.filter((U) => U.id !== L.id),
      selectedPresetId: C.selectedPresetId === L.id ? null : C.selectedPresetId
    })), c((C) => (C == null ? void 0 : C.id) === L.id ? null : C), p(!0));
  }, []), ee = M.useCallback((L) => {
    h(L);
  }, []), Y = M.useCallback((L) => {
    s((C) => ({
      ...C,
      promptTemplates: [...C.promptTemplates, L]
    })), p(!0);
  }, []), te = M.useCallback((L) => {
    s((C) => ({
      ...C,
      promptTemplates: C.promptTemplates.map((U) => U.id === L.id ? L : U)
    })), h(L), p(!0);
  }, []), Me = M.useCallback((L) => {
    L.isBuiltIn || (s((C) => ({
      ...C,
      promptTemplates: C.promptTemplates.filter((U) => U.id !== L.id)
    })), h((C) => (C == null ? void 0 : C.id) === L.id ? null : C), p(!0));
  }, []), ne = M.useCallback((L) => {
    s((C) => ({ ...C, vectorConfig: L })), p(!0);
  }, []), J = M.useCallback((L) => {
    s((C) => ({ ...C, rerankConfig: L })), p(!0);
  }, []), X = M.useCallback((L) => {
    s((C) => ({ ...C, worldbookConfig: L })), p(!0);
  }, []), be = M.useCallback((L) => {
    const C = g.find((U) => U.id === L);
    b(C || null);
  }, [g]), Oe = M.useCallback(() => {
    const L = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      scope: "both",
      description: ""
    };
    v((C) => [...C, L]), b(L), p(!0);
  }, []), Se = M.useCallback((L) => {
    if (!E) return;
    const C = { ...E, ...L };
    b(C), v((U) => U.map((I) => I.id === C.id ? C : I)), p(!0);
  }, [E]), V = M.useCallback((L) => {
    v((C) => C.map(
      (U) => U.id === L ? { ...U, enabled: !U.enabled } : U
    )), p(!0);
  }, []), le = M.useCallback((L) => {
    v((C) => C.filter((U) => U.id !== L)), b((C) => (C == null ? void 0 : C.id) === L ? null : C), p(!0);
  }, []), ce = M.useCallback(() => {
    v([...dr]), b(null), p(!0);
  }, []), ge = M.useCallback(() => {
    Le.setRegexRules(g), console.log("保存配置:", u, g), p(!1);
  }, [u, g]);
  return {
    settings: u,
    editingPreset: o,
    editingTemplate: f,
    hasChanges: y,
    regexRules: g,
    editingRule: E,
    selectPreset: D,
    addPreset: H,
    updatePreset: B,
    copyPreset: q,
    deletePreset: F,
    selectTemplate: ee,
    addTemplate: Y,
    updateTemplate: te,
    deleteTemplate: Me,
    updateVectorConfig: ne,
    updateRerankConfig: J,
    updateWorldbookConfig: X,
    selectRule: be,
    addRule: Oe,
    updateRule: Se,
    toggleRule: V,
    deleteRule: le,
    resetRules: ce,
    save: ge
  };
}
const w5 = [
  { id: "llm", label: "LLM 预设", icon: Xc },
  { id: "vector", label: "向量化", icon: Vc },
  { id: "rerank", label: "Rerank", icon: Z1 }
], k5 = ({ initialTab: u }) => {
  const [s, o] = M.useState(u || "model"), [c, f] = M.useState("llm"), {
    settings: h,
    editingPreset: y,
    editingTemplate: p,
    hasChanges: g,
    regexRules: v,
    editingRule: E,
    selectPreset: b,
    addPreset: D,
    updatePreset: H,
    copyPreset: B,
    deletePreset: q,
    selectTemplate: F,
    addTemplate: ee,
    updateTemplate: Y,
    deleteTemplate: te,
    updateVectorConfig: Me,
    updateRerankConfig: ne,
    updateWorldbookConfig: J,
    selectRule: X,
    addRule: be,
    updateRule: Oe,
    toggleRule: Se,
    deleteRule: V,
    resetRules: le,
    save: ce
  } = A5();
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(
      Fi,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则"
      }
    ),
    /* @__PURE__ */ i.jsx(
      Bc,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: s,
        onChange: (ge) => o(ge),
        actions: g && /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary border border-primary/50 rounded transition-colors",
            onClick: ce,
            children: [
              /* @__PURE__ */ i.jsx(p3, { size: 12 }),
              "保存"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "model" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ i.jsx(
          Bc,
          {
            tabs: w5.map((ge) => ({ ...ge, icon: /* @__PURE__ */ i.jsx(ge.icon, { size: 14 }) })),
            activeTab: c,
            onChange: (ge) => f(ge),
            sticky: !0,
            top: 0,
            className: "mb-6"
          }
        ),
        c === "llm" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ i.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ i.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: D, children: /* @__PURE__ */ i.jsx(Zc, { size: 16 }) })
            ] }),
            /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-1", children: h.llmPresets.map((ge) => /* @__PURE__ */ i.jsx(
              n5,
              {
                preset: ge,
                isSelected: h.selectedPresetId === ge.id,
                onSelect: () => b(ge),
                onEdit: () => b(ge),
                onCopy: () => B(ge),
                onDelete: () => q(ge)
              },
              ge.id
            )) })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "flex flex-col", children: y ? /* @__PURE__ */ i.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ i.jsx(i5, { preset: y, onChange: H }) }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ i.jsx(Xc, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        c === "vector" && /* @__PURE__ */ i.jsx(o5, { config: h.vectorConfig, onChange: Me }),
        c === "rerank" && /* @__PURE__ */ i.jsx(u5, { config: h.rerankConfig, onChange: ne })
      ] }),
      s === "prompt" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          j5,
          {
            templates: h.promptTemplates,
            selectedId: (p == null ? void 0 : p.id) || null,
            onSelect: F,
            onAdd: ee,
            onUpdate: Y,
            onDelete: te
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: p ? /* @__PURE__ */ i.jsx(
          N5,
          {
            template: p,
            llmPresets: h.llmPresets,
            defaultPresetId: h.selectedPresetId,
            onChange: Y
          }
        ) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(Qc, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      s === "regex" && /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ i.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ i.jsx(
          E5,
          {
            rules: v,
            selectedId: (E == null ? void 0 : E.id) || null,
            onSelect: X,
            onToggle: Se,
            onDelete: V,
            onAdd: be,
            onReset: le
          }
        ) }),
        /* @__PURE__ */ i.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: E ? /* @__PURE__ */ i.jsx(_5, { rule: E, onChange: Oe }) : /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ i.jsx(F1, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      s === "worldbook" && /* @__PURE__ */ i.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ i.jsx(
        z5,
        {
          config: h.worldbookConfig,
          onChange: J
        }
      ) })
    ] })
  ] });
}, M5 = () => {
  const [u, s] = M.useState("claudeDark");
  M.useEffect(() => {
    s(Yn.getTheme());
  }, []);
  const o = (f) => {
    Yn.setTheme(f), Le.set("theme", f), s(f);
  }, c = Object.entries(Hi).map(([f, h]) => {
    let y = h.colors.background, p = h.colors.primary;
    return {
      id: f,
      name: h.name,
      background: y,
      sidebar: h.colors.sidebar,
      // Add sidebar color
      primary: p
    };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ i.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ i.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: c.map((f) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        onClick: () => o(f.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${u === f.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
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
          /* @__PURE__ */ i.jsx("span", { className: `text-sm font-medium ${u === f.id ? "text-primary" : "text-muted-foreground"}`, children: f.name }),
          u === f.id && /* @__PURE__ */ i.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      f.id
    )) })
  ] });
}, qn = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed",
  // 扩展事件
  ENGRAM_REQUEST_REVISION: "engram:request_revision"
};
function Il() {
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
class fl {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, o) {
    const c = Il();
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
    const c = Il();
    if (c)
      c.once(s, o);
    else {
      const f = (...h) => {
        this.off(s, f), o(...h);
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
    const c = Il();
    c && c.removeListener(s, o), (f = this.listeners.get(s)) == null || f.delete(o);
  }
  /**
   * 触发事件
   * @param event 事件名称
   * @param args 参数
   */
  static emit(s, ...o) {
    const c = Il();
    c && c.emit(s, ...o);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = Il();
    for (const [o, c] of this.listeners)
      for (const f of c)
        s && s.removeListener(o, f);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return Il() !== null;
  }
}
He(fl, "listeners", /* @__PURE__ */ new Map());
const O5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: fl,
  TavernEventType: qn
}, Symbol.toStringTag, { value: "Module" }));
function R5(u, s) {
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
class cm {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const o = ra();
    if (!(o != null && o.chat))
      return [];
    let c = o.chat.map((f, h) => R5(f, h));
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
    const s = ra();
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
    return Ag();
  }
}
const D5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: cm
}, Symbol.toStringTag, { value: "Module" }));
async function O1(u) {
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
function Xt() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
const cr = "engram总结";
class ve {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(s) {
    return O1(s);
  }
  /**
   * 计算特定世界书中所有 Engram 总结条目的 Token 总和
   * 仅计算已启用的条目，使用关键词筛选
   * @param worldbookName 世界书名称
   */
  static async countSummaryTokens(s) {
    const c = (await this.getEntries(s)).filter(
      (y) => y.enabled && y.keys.includes(cr)
    );
    if (c.length === 0) return 0;
    const f = c.map((y) => y.content);
    return (await Promise.all(f.map((y) => this.countTokens(y)))).reduce((y, p) => y + p, 0);
  }
  /**
   * 获取当前角色的所有 Engram 摘要内容（用于 {{engramSummaries}} 宏）
   * 返回格式化后的摘要文本，供精简功能使用
   */
  static async getEngramSummariesContent() {
    const s = this.findExistingWorldbook();
    if (!s)
      return "";
    const c = (await this.getEntries(s)).filter((h) => h.keys.includes(cr));
    return c.length === 0 ? "" : (c.sort((h, y) => h.order - y.order), c.map((h) => {
      const y = h.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
      return `【${h.name}】
${y}`;
    }).join(`

---

`));
  }
  /**
   * 批量计算多段文本的 Token 数量
   * @param texts 文本数组
   */
  static async countTokensBatch(s) {
    return Promise.all(s.map((o) => O1(o)));
  }
  /**
   * 查找已绑定的 Engram 世界书（不创建）
   * 用于面板显示等只读场景
   */
  static findExistingWorldbook() {
    try {
      const s = Xt();
      if (!(s != null && s.getCharWorldbookNames))
        return null;
      const o = s.getCharWorldbookNames("current");
      return o && [...o.additional || [], o.primary].filter(Boolean).find((h) => h == null ? void 0 : h.startsWith("[Engram]")) || null;
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
      const f = Xt();
      if (!f)
        return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), null;
      const h = (o = (s = window.SillyTavern) == null ? void 0 : s.getContext) == null ? void 0 : o.call(s);
      if (!(h != null && h.name2) || h.name2 === "SillyTavern System")
        return console.warn("[Engram] WorldInfoService: 无效的角色上下文"), null;
      const y = h.name2, p = `[Engram] ${y}`;
      if (console.debug("[Engram] WorldInfoService: 创建新世界书", p), f.createWorldbook)
        await f.createWorldbook(p);
      else
        return console.error("[Engram] WorldInfoService: TavernHelper.createWorldbook 不可用"), null;
      if (f.getCharWorldbookNames && f.rebindCharWorldbooks) {
        const g = f.getCharWorldbookNames("current");
        g && (g.additional.push(p), await f.rebindCharWorldbooks("current", g), console.info("[Engram] WorldInfoService: 世界书已绑定到角色", {
          character: y,
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
    const o = Xt();
    if (!(o != null && o.getWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), [];
    try {
      return (await o.getWorldbook(s)).map((f) => {
        const h = f, y = h.strategy, p = h.position, g = h.recursion, v = [];
        if (y != null && y.keys && Array.isArray(y.keys))
          for (const E of y.keys)
            typeof E == "string" ? v.push(E) : E && typeof E == "object" && "source" in E && v.push(E.source);
        return {
          uid: h.uid || 0,
          name: h.name || "",
          content: h.content || "",
          enabled: h.enabled ?? !0,
          constant: (y == null ? void 0 : y.type) === "constant",
          keys: v,
          position: (p == null ? void 0 : p.type) || "before_character_definition",
          depth: (p == null ? void 0 : p.depth) || 0,
          order: (p == null ? void 0 : p.order) || 100,
          recursion: g ? {
            prevent_incoming: g.prevent_incoming,
            prevent_outgoing: g.prevent_outgoing
          } : void 0
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
    const s = Xt();
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
    const o = Xt();
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
      const c = Xt();
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
        recursion: o.recursion
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
    const f = Xt();
    if (!(f != null && f.updateWorldbookWith))
      return console.warn("[Engram] WorldInfoService: TavernHelper.updateWorldbookWith 不可用"), !1;
    try {
      return await f.updateWorldbookWith(s, (h) => {
        var p;
        const y = h.findIndex((g) => g.uid === o);
        if (y !== -1) {
          const g = h[y];
          let v = g.disable;
          "enabled" in c && (v = !c.enabled);
          let E = g.strategy || { type: "selective", keys: [] };
          if ("constant" in c || "keys" in c) {
            const H = c.constant !== void 0 ? c.constant : E.type === "constant", B = c.keys !== void 0 ? c.keys : E.keys || [];
            E = {
              ...E,
              type: H ? "constant" : "selective",
              keys: B
            };
          }
          let b = g.position || { type: "before_character_definition", order: 0, depth: 0 };
          (c.position || typeof c.order == "number" || typeof c.depth == "number") && (b = {
            ...b,
            type: (typeof c.position == "string" ? c.position : (p = c.position) == null ? void 0 : p.type) || b.type,
            order: c.order ?? b.order,
            depth: c.depth ?? b.depth
          });
          let D = g.recursion;
          c.recursion && (D = c.recursion), h[y] = {
            ...g,
            name: c.name ?? g.name,
            content: c.content ?? g.content,
            comment: c.name ?? g.comment,
            // 同步更新备注
            disable: v,
            strategy: E,
            position: b,
            recursion: D
          }, console.debug("[Engram] WorldInfoService: 条目已更新 (In-Place)", { uid: o, name: h[y].name });
        } else
          console.warn("[Engram] WorldInfoService: updateEntry 未找到条目", o);
        return h;
      }), !0;
    } catch (h) {
      return console.error("[Engram] WorldInfoService: 更新世界书条目失败", h), !1;
    }
  }
  /**
   * 删除指定的世界书条目
   * @param worldbookName 世界书名称
   * @param uid 条目 UID
   */
  static async deleteEntry(s, o) {
    const c = Xt();
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
    const c = Xt();
    if (!(c != null && c.deleteWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper.deleteWorldbookEntries 不可用"), !1;
    try {
      const f = new Set(o);
      return await c.deleteWorldbookEntries(s, (h) => f.has(h.uid)), console.debug("[Engram] WorldInfoService: 已批量删除条目", { worldbook: s, count: o.length }), !0;
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
    const c = (await this.getEntries(s)).filter((f) => f.keys.includes(cr));
    return c.sort((f, h) => f.order - h.order), c;
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
    const c = (await this.getEntries(s)).map((h) => h.order).filter((h) => h >= 9e3 && h < 1e4);
    return c.length === 0 ? 9e3 : Math.max(...c) + 1;
  }
  /**
   * 根据 Key 或名称查找条目
   * @param worldbookName 世界书名称
   * @param key 关键词
   */
  static async findEntryByKey(s, o) {
    const c = await this.getEntries(s);
    let f = c.find((h) => h.keys.includes(o));
    return f || (f = c.find((h) => h.name === o || o === "__ENGRAM_STATE__" && h.name === "Engram System State")), f || null;
  }
  /**
   * 获取世界书的 Token 统计
   * @param worldbookName 世界书名称
   */
  static async getWorldbookTokenStats(s) {
    const o = await this.getEntries(s), c = await Promise.all(
      o.map(async (h) => ({
        name: h.name,
        tokens: await this.countTokens(h.content)
      }))
    );
    return {
      totalTokens: c.reduce((h, y) => h + y.tokens, 0),
      entryCount: o.length,
      entries: c
    };
  }
  /**
   * 检查 WorldInfoService 是否可用
   */
  static isAvailable() {
    return Xt() !== null;
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
    var o, c;
    try {
      const h = await new Function("path", "return import(path)")("/scripts/world-info.js"), y = h == null ? void 0 : h.getWorldInfoPrompt;
      if (typeof y != "function")
        return console.warn("[Engram] WorldInfoService: getWorldInfoPrompt 不可用，回退到常驻条目"), this.getConstantWorldInfo();
      let p = s;
      if (!p || p.length === 0) {
        const b = (c = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : c.call(o);
        b != null && b.chat && Array.isArray(b.chat) && (p = b.chat.map((D) => D.mes || "").reverse());
      }
      if (!p || p.length === 0)
        return console.warn("[Engram] WorldInfoService: 无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      const v = await y(p, 8192, !0, {
        trigger: "normal"
      }), E = [
        (v == null ? void 0 : v.worldInfoBefore) || "",
        (v == null ? void 0 : v.worldInfoAfter) || ""
      ].filter(Boolean).join(`

`).trim();
      return E && console.debug(`[Engram] WorldInfoService: 获取到激活的世界书内容 (${E.length} 字符)`), E;
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
      const o = await new Function("path", "return import(path)")("/scripts/world-info.js"), c = o == null ? void 0 : o.getSortedEntries;
      if (typeof c != "function")
        return "";
      const f = await c();
      if (!f || !Array.isArray(f))
        return "";
      const h = f.filter((y) => y.constant === !0 && y.disable !== !0 && y.content);
      return h.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${h.length} 个常驻条目`), h.map((y) => y.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const um = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUMMARY_ENTRY_KEY: cr,
  WorldInfoService: ve
}, Symbol.toStringTag, { value: "Module" }));
async function U5() {
  const { EventBus: u } = await Promise.resolve().then(() => O5), { MessageService: s } = await Promise.resolve().then(() => D5), { WorldInfoService: o } = await Promise.resolve().then(() => um);
  return {
    eventBus: u.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: o.isAvailable(),
    nativeTokenCount: await o.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const B5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: fl,
  MessageService: cm,
  TavernEventType: qn,
  WorldInfoService: ve,
  checkTavernIntegration: U5
}, Symbol.toStringTag, { value: "Module" })), H5 = [
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
class dm {
  constructor(s) {
    He(this, "rules");
    this.rules = s || H5;
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
    let h = `📜 剧情摘要 [楼层${`${o.floorRange[0]}-${o.floorRange[1]}`}]
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
const fm = new dm();
function R1() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class mm {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const o = R1();
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
    const s = R1();
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
const eu = new mm(), Pl = "__ENGRAM_STATE__", Ui = {
  lastSummarizedFloor: 0,
  totalSummaries: 0,
  totalTokens: 0,
  updatedAt: Date.now()
};
class sr {
  /**
   * 加载状态
   */
  static async loadState(s) {
    try {
      const o = await ve.findEntryByKey(s, Pl);
      if (!o)
        return { ...Ui };
      try {
        const c = JSON.parse(o.content);
        return { ...Ui, ...c };
      } catch (c) {
        return ae.warn("WorldBookStateService", "状态条目解析失败，重置状态", c), { ...Ui };
      }
    } catch (o) {
      return ae.error("WorldBookStateService", "加载状态失败", o), { ...Ui };
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
      }, h = JSON.stringify(f, null, 2), p = (await ve.getEntries(s)).filter(
        (g) => g.name === "Engram System State" || g.keys.includes(Pl)
      );
      if (p.length > 0) {
        p.sort((b, D) => {
          const H = b.keys.includes(Pl) ? 1 : 0;
          return (D.keys.includes(Pl) ? 1 : 0) - H;
        });
        const [g, ...v] = p;
        if (v.length > 0) {
          ae.warn("WorldBookStateService", `发现 ${v.length} 个重复的状态条目，正在清理...`);
          for (const b of v)
            await ve.deleteEntry(s, b.uid);
        }
        ae.debug("WorldBookStateService", "更新并修复状态条目", { uid: g.uid, state: f });
        const E = {
          content: h,
          name: "Engram System State",
          enabled: !1,
          constant: !1,
          keys: [Pl],
          recursion: {
            prevent_incoming: !0,
            prevent_outgoing: !0
          },
          position: "before_character_definition",
          order: 0
        };
        return await ve.updateEntry(s, g.uid, E);
      } else {
        ae.debug("WorldBookStateService", "创建状态条目", { state: f });
        const g = {
          name: "Engram System State",
          content: h,
          keys: [Pl],
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
        return await ve.createEntry(s, g);
      }
    } catch (c) {
      return ae.error("WorldBookStateService", "保存状态失败", c), !1;
    }
  }
}
const L5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldBookStateService: sr
}, Symbol.toStringTag, { value: "Module" }));
class q5 {
  /**
   * 请求用户修订内容
   * @returns Promise<string> 用户确认后的新内容
   * @throws Error 如果用户取消
   */
  async requestRevision(s, o, c) {
    return new Promise((f, h) => {
      fl.emit(qn.ENGRAM_REQUEST_REVISION, {
        title: s,
        description: o,
        content: c,
        onConfirm: (y) => f(y),
        onCancel: () => h(new Error("User cancelled revision"))
      });
    });
  }
}
const hm = new q5(), gm = {
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
}, D1 = {
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
}, ea = "engram", Y5 = "engram总结";
function U1() {
  var u, s;
  try {
    return ((s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u)) || null;
  } catch {
    return null;
  }
}
function B1() {
  var u, s;
  try {
    const o = (s = (u = window.SillyTavern) == null ? void 0 : u.getContext) == null ? void 0 : s.call(u);
    return o != null && o.chat_metadata ? o.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function G5() {
  var u;
  try {
    (u = window.saveChatDebounced) == null || u.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class pm {
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
    const f = Le.get("summarizerConfig");
    this.config = { ...gm, ...f, ...s }, this.textProcessor = o || fm, this.llmAdapter = c || eu;
  }
  // ==================== 元数据操作 ====================
  // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
  // 但主要逻辑已迁移至 WorldBookStateService。
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const o = B1();
    if (o)
      return o.extensions || (o.extensions = {}), o.extensions[ea] || (o.extensions[ea] = {}), o.extensions[ea][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, o) {
    const c = B1();
    c && (c.extensions || (c.extensions = {}), c.extensions[ea] || (c.extensions[ea] = {}), c.extensions[ea][s] = o, this.log("debug", `已保存到 chat_metadata: ${s} = ${o}`), G5());
  }
  /**
   * 获取上次总结的楼层
   * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
   */
  async getLastSummarizedFloor() {
    if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;
    const s = ve.findExistingWorldbook();
    if (!s) return this._lastSummarizedFloor;
    const o = await sr.loadState(s);
    return this._lastSummarizedFloor = o.lastSummarizedFloor, this._lastSummarizedFloor;
  }
  /**
   * 设置上次总结的楼层
   * 同时更新内存和持久化存储
   */
  async setLastSummarizedFloor(s) {
    this._lastSummarizedFloor = s;
    const o = ve.findExistingWorldbook();
    if (!o) {
      this.log("debug", "世界书未创建，跳过保存进度", { floor: s });
      return;
    }
    await sr.saveState(o, {
      lastSummarizedFloor: s
    });
  }
  /**
  
      // ==================== 楼层计算 ====================
  
      /**
       * 获取当前真实楼层数
       */
  getCurrentFloor() {
    const s = U1();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = U1();
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
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = fl.on(
      qn.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${qn.MESSAGE_RECEIVED}`)), this.unsubscribeChat = fl.on(
      qn.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${qn.CHAT_CHANGED}`), this.isRunning = !0;
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
      const h = this._lastSummarizedFloor + 1, y = this.config.bufferSize || 0, p = o - y;
      if (h > p)
        return s && rt.info("暂无足够的新内容需要总结 (缓冲期内)", "Engram"), null;
      const g = this.config.floorInterval || 10, v = h + g - 1, E = Math.min(p, v);
      if (h > E)
        return null;
      const b = [h, E];
      this.log("info", "准备总结", { startFloor: h, endFloor: E, currentFloor: o, buffer: y });
      const H = zg().slice(h - 1, E);
      if (this.log("info", "提取消息范围", {
        range: b,
        msgCount: H.length,
        firstMsg: (((f = H[0]) == null ? void 0 : f.mes) || "").substring(0, 20)
      }), H.length === 0)
        return this.log("warn", "消息提取为空", { floorRange: b }), null;
      const B = {
        messages: H.map((L) => {
          const C = L.mes || L.content || L.message || "";
          return C || console.warn("[Engram] Message content is empty/undefined:", L), {
            role: L.is_user ? "user" : "assistant",
            content: C,
            name: L.name
          };
        }),
        floorRange: b,
        templateId: this.config.promptTemplateId || void 0
      }, q = H.map((L) => L.mes || L.content || L.message || "").join(`

`), F = $i.process(q, "input");
      this.log("debug", "应用正则清洗", {
        originalLength: q.length,
        cleanedLength: F.length
      });
      let ee = "";
      try {
        const L = await ve.getActivatedWorldInfo();
        L && (ee = `【背景设定】
` + L + `

`, this.log("debug", "已加载世界书内容", { length: L.length }));
      } catch (L) {
        this.log("warn", "获取世界书失败", { error: String(L) });
      }
      const Y = Le.getEnabledPromptTemplate("text_summary"), te = (Y == null ? void 0 : Y.systemPrompt) || D1.system, Me = (Y == null ? void 0 : Y.userPromptTemplate) || D1.user;
      let ne = "";
      try {
        ne = await ve.getEngramSummariesContent(), ne && this.log("debug", "已加载 Engram 摘要", { length: ne.length });
      } catch (L) {
        this.log("warn", "获取 Engram 摘要失败", { error: String(L) });
      }
      const J = Me.replace("{{worldbookContext}}", ee).replace("{{chatHistory}}", F).replace("{{context}}", ee).replace("{{engramSummaries}}", ne);
      this.log("debug", "使用提示词模板", {
        source: Y ? "APIPresets" : "fallback",
        templateName: (Y == null ? void 0 : Y.name) || "default"
      });
      const X = Ln.logSend({
        type: "summarize",
        systemPrompt: te,
        userPrompt: J,
        floorRange: B.floorRange
      }), be = Date.now(), Oe = await this.llmAdapter.generate({
        systemPrompt: te,
        userPrompt: J
      });
      if (Ln.logReceive(X, {
        response: Oe.content,
        status: Oe.success ? "success" : "error",
        error: Oe.error,
        duration: Date.now() - be
      }), !Oe.success)
        return this.log("error", "LLM 调用失败", { error: Oe.error }), rt.error(`总结失败: ${Oe.error}`, "Engram 错误"), null;
      const Se = this.textProcessor.clean(Oe.content), V = $i.process(Se, "output"), le = await ve.countTokens(V), ce = {
        id: Date.now().toString(),
        content: V,
        sourceFloors: B.floorRange,
        timestamp: Date.now(),
        tokenCount: le,
        writtenToWorldbook: !1
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: ce });
        try {
          const L = await hm.requestRevision(
            "剧情摘要修订",
            `范围: ${B.floorRange[0]} - ${B.floorRange[1]} 楼 | Token: ${le}`,
            ce.content
          );
          ce.content = L, ce.tokenCount = await ve.countTokens(L), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了摘要写入"), rt.info("已取消写入世界书", "操作取消"), null;
        }
      }
      const ge = await this.writeToWorldbook(ce);
      if (ce.writtenToWorldbook = ge, await this.setLastSummarizedFloor(B.floorRange[1]), this.summaryHistory.push(ce), rt.success(`已总结 ${B.floorRange[0]}-${B.floorRange[1]} 楼`, "Engram"), this.config.autoHide) {
        const L = B.floorRange[0] - 1, C = B.floorRange[1] - 1;
        this.log("info", "自动隐藏已总结楼层", { startIndex: L, endIndex: C }), Ug(L, C).catch((U) => {
          this.log("error", "自动隐藏失败", U);
        });
      }
      return ce;
    } catch (h) {
      const y = h instanceof Error ? h.message : String(h);
      return this.log("error", "总结执行异常", { error: y }), rt.error(`总结异常: ${y}`, "Engram 错误"), null;
    } finally {
      this.isSummarizing = !1;
    }
  }
  /**
   * 写入世界书
   */
  async writeToWorldbook(s) {
    try {
      const o = await ve.getChatWorldbook();
      if (!o)
        return this.log("warn", "无法获取聊天世界书"), !1;
      await ve.ensureSeparatorEntries(o);
      const c = await ve.getNextSummaryOrder(o), f = `{{// ${JSON.stringify({
        floors: s.sourceFloors,
        tokens: s.tokenCount,
        timestamp: s.timestamp
      })} }}`, h = `${s.content}

${f}`, y = await ve.createEntry(o, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: h,
        keys: [Y5],
        // 添加关键词用于筛选
        enabled: !0,
        // 开启状态，让摘要能被激活进入上下文
        constant: !0,
        order: c
        // 使用计算出的递增顺序
      });
      if (y) {
        this.log("success", "已写入世界书", { worldbook: o, order: c });
        const p = await sr.loadState(o);
        await sr.saveState(o, {
          totalSummaries: p.totalSummaries + 1
        });
      }
      return y;
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
      const { Logger: f } = await Promise.resolve().then(() => am);
      f[s]("Summarizer", o, c);
    } catch {
      console.log(`[Summarizer] ${s}: ${o}`, c);
    }
  }
}
const Hc = new pm(), Zi = {
  ...x5,
  keepRecentCount: 3,
  preserveOriginal: !1,
  previewEnabled: !0
}, H1 = {
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
class xm {
  constructor(s, o) {
    He(this, "config");
    He(this, "llmAdapter");
    He(this, "isTrimming", !1);
    const c = Le.get("trimmerConfig") || {};
    this.config = { ...Zi, ...c, ...s }, this.llmAdapter = o || eu;
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
    const s = ve.findExistingWorldbook();
    if (!s)
      return {
        triggered: !1,
        triggerType: this.config.trigger,
        currentValue: 0,
        threshold: this.getThreshold(),
        pendingEntryCount: 0,
        isTrimming: this.isTrimming
      };
    const o = await ve.getSummaryEntries(s), c = Math.max(0, o.length - this.config.keepRecentCount), f = await this.getCurrentTriggerValue(s, o), h = this.getThreshold();
    return {
      triggered: this.config.enabled && f >= h,
      triggerType: this.config.trigger,
      currentValue: f,
      threshold: h,
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
        return await ve.countSummaryTokens(s);
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
    const s = ve.findExistingWorldbook();
    if (!s) return [];
    const o = await ve.getSummaryEntries(s), c = this.config.keepRecentCount;
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
    const o = ve.findExistingWorldbook();
    if (!o)
      return this.log("warn", "世界书未找到"), rt.warning("未找到 Engram 世界书", "Engram"), null;
    const c = await this.getEntriesToMerge();
    if (c.length < 2)
      return s && rt.info("待合并的条目不足 (需要至少 2 条)", "Engram"), null;
    this.isTrimming = !0, this.log("info", "开始执行精简", {
      entryCount: c.length,
      manual: s
    });
    try {
      const f = c.map((ne) => ve.parseFloorRangeFromName(ne.name)).filter((ne) => ne !== null);
      if (f.length === 0)
        return this.log("error", "无法解析楼层范围"), null;
      const h = Math.min(...f.map((ne) => ne[0])), y = Math.max(...f.map((ne) => ne[1])), p = [h, y], g = c.map((ne) => {
        const J = ve.parseFloorRangeFromName(ne.name), X = J ? `【${J[0]}-${J[1]}楼】` : `【${ne.name}】`, be = ne.content.replace(/\{\{\/\/.*?\}\}/gs, "").trim();
        return `${X}
${be}`;
      }).join(`

---

`), v = Le.getEnabledPromptTemplate("trim"), E = (v == null ? void 0 : v.systemPrompt) || H1.system, D = ((v == null ? void 0 : v.userPromptTemplate) || H1.user).replace("{{engramSummaries}}", g).replace("{{context}}", g);
      this.log("debug", "使用提示词模板", {
        source: v ? "APIPresets" : "fallback",
        templateName: (v == null ? void 0 : v.name) || "default",
        inputLength: g.length
      });
      const H = Ln.logSend({
        type: "trim",
        systemPrompt: E,
        userPrompt: D,
        floorRange: p
      }), B = Date.now(), q = await this.llmAdapter.generate({
        systemPrompt: E,
        userPrompt: D
      });
      if (Ln.logReceive(H, {
        response: q.content,
        status: q.success ? "success" : "error",
        error: q.error,
        duration: Date.now() - B
      }), !q.success)
        return this.log("error", "LLM 调用失败", { error: q.error }), rt.error(`精简失败: ${q.error}`, "Engram 错误"), null;
      const F = $i.process(q.content, "output"), ee = await ve.countTokens(F), Y = Math.min(...c.map((ne) => ne.order)), te = {
        content: F,
        tokenCount: ee,
        sourceEntryIds: c.map((ne) => ne.uid),
        newFloorRange: p,
        newOrder: Y
      };
      if (this.config.previewEnabled) {
        this.log("info", "预览模式：等待用户确认", { result: te });
        try {
          const ne = await hm.requestRevision(
            "精简摘要修订",
            `合并 ${c.length} 条 | 范围: ${p[0]}-${p[1]} 楼 | Token: ${ee}`,
            te.content
          );
          te.content = ne, te.tokenCount = await ve.countTokens(ne), this.log("info", "用户确认并修订了摘要");
        } catch {
          return this.log("warn", "用户取消了精简写入"), rt.info("已取消精简操作", "操作取消"), null;
        }
      }
      return await this.writeCompactedEntry(o, te) ? (await this.removeOriginalEntries(o, te.sourceEntryIds), rt.success(
        `已精简 ${c.length} 条摘要为 1 条 (${p[0]}-${p[1]} 楼)`,
        "Engram"
      ), te) : (this.log("error", "写入精简条目失败"), null);
    } catch (f) {
      const h = f instanceof Error ? f.message : String(f);
      return this.log("error", "精简执行异常", { error: h }), rt.error(`精简异常: ${h}`, "Engram 错误"), null;
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

${c}`, h = await ve.createEntry(s, {
        name: `剧情摘要_${o.newFloorRange[0]}-${o.newFloorRange[1]}`,
        content: f,
        keys: [cr],
        // 添加关键词用于筛选
        enabled: !0,
        constant: !0,
        order: o.newOrder
      });
      return h && this.log("success", "已写入精简条目", {
        worldbook: s,
        floorRange: o.newFloorRange,
        order: o.newOrder
      }), h;
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
        await ve.updateEntry(s, c, { enabled: !1 });
      this.log("info", "已禁用原始条目", { count: o.length });
    } else
      await ve.deleteEntries(s, o) && this.log("info", "已删除原始条目", { count: o.length });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  log(s, o, c) {
    ae[s]("Trimmer", o, c);
  }
}
const V5 = new xm(), Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: dr,
  DEFAULT_SUMMARIZER_CONFIG: gm,
  DEFAULT_TRIMMER_CONFIG: Zi,
  LLMAdapter: mm,
  RegexProcessor: Pc,
  SummarizerService: pm,
  TextProcessor: dm,
  TrimmerService: xm,
  llmAdapter: eu,
  regexProcessor: $i,
  summarizerService: Hc,
  textProcessor: fm,
  trimmerService: V5
}, Symbol.toStringTag, { value: "Module" })), Q5 = () => {
  const [u, s] = M.useState(
    Hc.getConfig().previewEnabled
  ), o = (y) => {
    const p = y.target.checked;
    s(p), Hc.updateConfig({ previewEnabled: p });
  }, [c, f] = M.useState(Le.getSettings().linkedDeletion), h = (y) => (p) => {
    const g = { ...c, [y]: p.target.checked };
    f(g), Le.set("linkedDeletion", g);
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ i.jsx(Fi, { title: "设置", subtitle: "扩展全局选项" }),
    /* @__PURE__ */ i.jsxs("div", { className: "p-6 space-y-8", children: [
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "外观" }),
        /* @__PURE__ */ i.jsx(M5, {})
      ] }),
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "功能" }),
        /* @__PURE__ */ i.jsx("div", { className: "bg-muted/30 border border-border rounded-lg p-4", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ i.jsx(q4, { size: 20 }) }),
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
                checked: u,
                onChange: o
              }
            ),
            /* @__PURE__ */ i.jsx("div", { className: "w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ i.jsxs("section", { children: [
        /* @__PURE__ */ i.jsx("h3", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "数据管理" }),
        /* @__PURE__ */ i.jsxs("div", { className: "bg-muted/30 border border-border rounded-lg p-4 space-y-4", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ i.jsx("div", { className: "p-2 rounded-lg bg-red-500/10 text-red-500", children: /* @__PURE__ */ i.jsx(sa, { size: 20 }) }),
              /* @__PURE__ */ i.jsxs("div", { children: [
                /* @__PURE__ */ i.jsx("h4", { className: "font-medium text-foreground", children: "联动删除" }),
                /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "删除角色卡时，一并删除关联的 Engram 记忆库" })
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: c.enabled,
                  onChange: h("enabled")
                }
              ),
              /* @__PURE__ */ i.jsx("div", { className: "w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" })
            ] })
          ] }),
          c.enabled && /* @__PURE__ */ i.jsx("div", { className: "pl-14 space-y-3 border-t border-border pt-3", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-sm text-muted-foreground", children: "删除前确认" }),
            /* @__PURE__ */ i.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: c.showConfirmation,
                  onChange: h("showConfirmation")
                }
              ),
              /* @__PURE__ */ i.jsx("div", { className: "w-9 h-5 bg-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
        /* @__PURE__ */ i.jsx(I1, { size: 32 }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
      ] }) })
    ] })
  ] });
}, X5 = () => /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ i.jsx(Fi, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ i.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ i.jsx(V1, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ i.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), $5 = ({ links: u, onNavigate: s, className: o = "" }) => u.length === 0 ? null : /* @__PURE__ */ i.jsx("div", { className: `flex items-center gap-4 ${o}`, children: u.map((c) => {
  const f = c.icon || H4;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
      onClick: () => s(c.linkTo),
      title: c.label,
      children: [
        /* @__PURE__ */ i.jsx(f, { size: 12 }),
        /* @__PURE__ */ i.jsx("span", { children: c.label })
      ]
    },
    c.id
  );
}) }), Z5 = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6"
}, Bi = ({
  orientation: u = "horizontal",
  length: s = 100,
  className: o = "",
  responsive: c = !1,
  spacing: f = "none"
}) => {
  const h = Z5[f];
  return c ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(
      "div",
      {
        className: `hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 border-l border-border/30 ${o}`,
        style: { height: `${s}%` }
      }
    ),
    /* @__PURE__ */ i.jsx(
      "div",
      {
        className: `lg:hidden border-t border-border/30 mx-auto ${h} ${o}`,
        style: { width: `${s}%` }
      }
    )
  ] }) : u === "vertical" ? /* @__PURE__ */ i.jsx(
    "div",
    {
      className: `border-l border-border/30 mx-auto ${o}`,
      style: { height: `${s}%` }
    }
  ) : /* @__PURE__ */ i.jsx(
    "div",
    {
      className: `border-t border-border/30 ${h} ${o}`,
      style: { width: `${s}%` }
    }
  );
}, K5 = [
  { id: "token", label: "Token 数", icon: b4 },
  { id: "count", label: "总结次数", icon: V4 }
], J5 = () => {
  const [u, s] = M.useState(null), [o, c] = M.useState(!1), [f, h] = M.useState(!1), [y, p] = M.useState({
    autoEnabled: !0,
    floorInterval: 10,
    bufferSize: 3,
    autoHide: !1
  }), [g, v] = M.useState({ ...Zi }), [E, b] = M.useState(null), [D, H] = M.useState(0), [B, q] = M.useState(0);
  M.useEffect(() => {
    F();
  }, []);
  const F = async () => {
    var V;
    try {
      const { summarizerService: le } = await Promise.resolve().then(() => Tt);
      let ce = le.getStatus();
      ce.lastSummarizedFloor === 0 && (await le.initializeForCurrentChat(), ce = le.getStatus()), s(ce);
      const ge = le.getConfig();
      p({
        autoEnabled: ge.enabled,
        floorInterval: ge.floorInterval,
        bufferSize: ge.bufferSize || 3,
        autoHide: ge.autoHide || !1
      });
      const L = (V = Le.getSummarizerSettings()) == null ? void 0 : V.trimConfig;
      L && v({ ...Zi, ...L });
      const { trimmerService: C } = await Promise.resolve().then(() => Tt), U = await C.getStatus();
      b(U);
      const { WorldInfoService: I } = await Promise.resolve().then(() => um), { WorldBookStateService: Ne } = await Promise.resolve().then(() => L5), je = I.findExistingWorldbook();
      if (je) {
        const j = await I.countSummaryTokens(je);
        H(j);
        const R = await Ne.loadState(je);
        q(R.totalSummaries);
      } else
        H(0), q(0);
    } catch (le) {
      console.error("加载 Summarizer 状态失败:", le);
    }
  }, ee = async () => {
    try {
      const { summarizerService: V } = await Promise.resolve().then(() => Tt);
      V.start(), await F();
    } catch (V) {
      console.error("启动失败:", V);
    }
  }, Y = async () => {
    try {
      const { summarizerService: V } = await Promise.resolve().then(() => Tt);
      V.stop(), await F();
    } catch (V) {
      console.error("停止失败:", V);
    }
  }, te = async () => {
    c(!0);
    try {
      const { summarizerService: V } = await Promise.resolve().then(() => Tt);
      await V.triggerSummary(!0), await F();
    } catch (V) {
      console.error("触发失败:", V);
    } finally {
      c(!1);
    }
  }, Me = async () => {
    if (confirm("确定要重置总结进度吗？这会导致扫描所有历史消息。")) {
      c(!0);
      try {
        const { summarizerService: V } = await Promise.resolve().then(() => Tt);
        await V.setLastSummarizedFloor(0), await F();
      } catch (V) {
        console.error("重置失败:", V);
      } finally {
        c(!1);
      }
    }
  }, ne = (V, le) => {
    const ce = { ...g, [V]: le };
    v(ce), J(ce);
  }, J = (V) => {
    Le.setSummarizerSettings({ trimConfig: V });
  }, X = async () => {
    const V = { ...g, enabled: !g.enabled };
    v(V), J(V);
    const { trimmerService: le } = await Promise.resolve().then(() => Tt);
    le.updateConfig({ enabled: V.enabled });
  }, be = async () => {
    h(!0);
    try {
      const { trimmerService: V } = await Promise.resolve().then(() => Tt);
      await V.triggerTrim(!0), await F();
    } catch (V) {
      console.error("精简失败:", V);
    } finally {
      h(!1);
    }
  }, Se = (() => {
    switch (g.trigger) {
      case "token":
        return { value: g.tokenLimit, min: 1024, max: 1e5, step: 1024, label: "Token 上限" };
      case "count":
        return { value: g.countLimit, min: 2, max: 20, step: 1, label: "次数上限" };
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
              onClick: F,
              title: "刷新",
              children: /* @__PURE__ */ i.jsx(na, { size: 14 })
            }
          )
        ] }),
        u ? /* @__PURE__ */ i.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "运行状态" }),
              /* @__PURE__ */ i.jsxs("div", { className: `flex items-center gap-2 text-lg font-medium ${u.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                u.running ? /* @__PURE__ */ i.jsx(_4, { size: 18 }) : /* @__PURE__ */ i.jsx(Yc, { size: 18 }),
                u.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: "待处理" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-3xl font-light text-amber-500 font-mono", children: u.pendingFloors })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(Bi, { length: 100, spacing: "md" }),
          /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "当前楼层" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-xl font-mono text-foreground/80", children: u.currentFloor })
            ] }),
            /* @__PURE__ */ i.jsxs("div", { children: [
              /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-1", children: "总结次数" }),
              /* @__PURE__ */ i.jsx("div", { className: "text-xl font-mono text-foreground/80", children: B })
            ] })
          ] }),
          /* @__PURE__ */ i.jsx(Bi, { length: 30, spacing: "md" }),
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wider block mb-1", children: "已总结内容 Token (Engram)" }),
            /* @__PURE__ */ i.jsx("div", { className: "text-sm font-mono text-primary/80", children: D.toLocaleString() })
          ] })
        ] }) : /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex gap-3", children: [
        u != null && u.running ? /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors",
            onClick: Y,
            children: [
              /* @__PURE__ */ i.jsx(s3, { size: 14 }),
              "停止监听"
            ]
          }
        ) : /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
            onClick: ee,
            children: [
              /* @__PURE__ */ i.jsx($c, { size: 14 }),
              "启动监听"
            ]
          }
        ),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors disabled:opacity-50",
            onClick: te,
            disabled: o || (u == null ? void 0 : u.isSummarizing),
            children: [
              /* @__PURE__ */ i.jsx(na, { size: 14, className: o ? "animate-spin" : "" }),
              o ? "处理中..." : "手动触发"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "pt-6 space-y-6", children: [
        /* @__PURE__ */ i.jsx(Bi, { length: 100 }),
        /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i.jsx("span", { className: "text-sm text-foreground", children: "自动总结" }),
            /* @__PURE__ */ i.jsx(
              aa,
              {
                label: "",
                checked: y.autoEnabled,
                onChange: async (V) => {
                  p((ce) => ({ ...ce, autoEnabled: V }));
                  const { summarizerService: le } = await Promise.resolve().then(() => Tt);
                  le.updateConfig({ enabled: V });
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
              aa,
              {
                label: "",
                checked: y.autoHide,
                onChange: (V) => {
                  p((le) => ({ ...le, autoHide: V })), Promise.resolve().then(() => Tt).then(({ summarizerService: le }) => {
                    le.updateConfig({ autoHide: V });
                  });
                }
              }
            )
          ] })
        ] }),
        y.autoEnabled && /* @__PURE__ */ i.jsx(i.Fragment, { children: /* @__PURE__ */ i.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "楼层将每隔 ",
              /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: y.floorInterval }),
              " 层总结"
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ i.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ i.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${(y.floorInterval - 5) / 95 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "range",
                  min: 5,
                  max: 100,
                  step: 5,
                  value: y.floorInterval,
                  onChange: async (V) => {
                    const le = Number(V.target.value);
                    p((ge) => ({ ...ge, floorInterval: le }));
                    const { summarizerService: ce } = await Promise.resolve().then(() => Tt);
                    ce.updateConfig({ floorInterval: le });
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
              /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: y.bufferSize }),
              " 层作为缓冲"
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
              /* @__PURE__ */ i.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
              /* @__PURE__ */ i.jsx(
                "div",
                {
                  className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                  style: { left: `${y.bufferSize / 20 * 100}%`, transform: "translate(-50%, -50%)" }
                }
              ),
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 20,
                  step: 1,
                  value: y.bufferSize,
                  onChange: (V) => {
                    const le = Number(V.target.value);
                    p((ce) => ({ ...ce, bufferSize: le })), Promise.resolve().then(() => Tt).then(({ summarizerService: ce }) => {
                      ce.updateConfig({ bufferSize: le });
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
          onClick: Me,
          disabled: o,
          title: "重置进度 (重新扫描历史)",
          children: [
            /* @__PURE__ */ i.jsx(na, { size: 12, className: o ? "animate-spin" : "" }),
            "重置所有进度"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "space-y-6 lg:pl-8 relative", children: [
      /* @__PURE__ */ i.jsx(Bi, { responsive: !0, length: 30 }),
      /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("h2", { className: "text-sm font-medium text-foreground", children: "精简配置" }),
          /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "将多次总结压缩为更简洁的摘要" })
        ] }),
        /* @__PURE__ */ i.jsx(
          aa,
          {
            label: "",
            checked: g.enabled,
            onChange: X
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: `space-y-6 transition-opacity ${g.enabled ? "opacity-100" : "opacity-40 pointer-events-none"}`, children: [
        /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ i.jsx("span", { className: "text-xs text-muted-foreground", children: "触发条件" }),
          /* @__PURE__ */ i.jsx("div", { className: "flex gap-6", children: K5.map((V) => /* @__PURE__ */ i.jsxs(
            "label",
            {
              className: "flex items-center gap-2 cursor-pointer group",
              children: [
                /* @__PURE__ */ i.jsx(
                  "span",
                  {
                    className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${g.trigger === V.id ? "border-primary bg-primary" : "border-border group-hover:border-muted-foreground"}`,
                    children: g.trigger === V.id && /* @__PURE__ */ i.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ i.jsx("span", { className: `text-sm transition-colors ${g.trigger === V.id ? "text-foreground" : "text-muted-foreground"}`, children: V.label })
              ]
            },
            V.id
          )) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ i.jsx("div", { className: "text-xs text-muted-foreground", children: Se.label === "Token 上限" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            "当 Token 数超过 ",
            /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: Se.value }),
            " 时触发"
          ] }) : Se.label === "楼层上限" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            "当楼层数超过 ",
            /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: Se.value }),
            " 层时触发"
          ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
            "当总结次数超过 ",
            /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: Se.value }),
            " 次时触发"
          ] }) }),
          /* @__PURE__ */ i.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ i.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(Se.value - Se.min) / (Se.max - Se.min) * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "range",
                min: Se.min,
                max: Se.max,
                step: Se.step,
                value: Se.value,
                onChange: (V) => {
                  const le = Number(V.target.value), ce = g.trigger === "token" ? "tokenLimit" : "countLimit";
                  ne(ce, le);
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
            /* @__PURE__ */ i.jsx("span", { className: "text-base font-medium text-foreground mx-0.5", children: g.keepRecentCount ?? 3 }),
            " 条不合并"
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "relative h-4 flex items-center group cursor-pointer", children: [
            /* @__PURE__ */ i.jsx("div", { className: "absolute inset-x-0 h-[1px]", style: { backgroundColor: "var(--border)" } }),
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-muted-foreground/80 rounded-full shadow-sm pointer-events-none transition-transform duration-75 ease-out group-hover:scale-125 group-hover:bg-foreground",
                style: { left: `${(g.keepRecentCount ?? 3) / 10 * 100}%`, transform: "translate(-50%, -50%)" }
              }
            ),
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: 10,
                step: 1,
                value: g.keepRecentCount ?? 3,
                onChange: (V) => ne("keepRecentCount", Number(V.target.value)),
                className: "absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10 m-0",
                style: { appearance: "none", WebkitAppearance: "none" }
              }
            )
          ] })
        ] }),
        E && /* @__PURE__ */ i.jsxs("div", { className: "text-xs text-muted-foreground space-y-1", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ i.jsx("span", { children: "待合并条目:" }),
            /* @__PURE__ */ i.jsx("span", { className: "font-mono", children: E.pendingEntryCount })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ i.jsxs("span", { children: [
              "当前",
              g.trigger === "token" ? "Token" : "条目数",
              ":"
            ] }),
            /* @__PURE__ */ i.jsxs("span", { className: `font-mono ${E.triggered ? "text-amber-500" : ""}`, children: [
              E.currentValue,
              " / ",
              Se.value
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50",
            onClick: be,
            disabled: f || ((E == null ? void 0 : E.pendingEntryCount) ?? 0) < 2,
            children: [
              /* @__PURE__ */ i.jsx(y3, { size: 14, className: f ? "animate-pulse" : "" }),
              f ? "精简中..." : "手动执行精简"
            ]
          }
        ),
        /* @__PURE__ */ i.jsx("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: "精简会将多次总结内容压缩为更简洁的摘要，减少 Token 消耗。" })
      ] })
    ] })
  ] });
}, F5 = [
  { id: "summary", label: "记忆摘要", icon: /* @__PURE__ */ i.jsx(Qc, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ i.jsx(fr, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ i.jsx(Z1, { size: 16 }) }
], W5 = [
  { id: "devlog", label: "模型日志", icon: b3, linkTo: "devlog:model" },
  { id: "presets", label: "提示词模板", icon: f4, linkTo: "presets:prompt" }
], I5 = ({ onNavigate: u }) => {
  const [s, o] = M.useState("summary");
  return /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ i.jsx("h1", { className: "text-2xl font-light text-foreground tracking-tight mb-2", children: "数据处理" }),
      /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: "记忆摘要、向量化存储和批量任务管理" })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "sticky top-0 z-10 bg-background -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 pt-2 -mt-2", children: /* @__PURE__ */ i.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-2", children: [
      /* @__PURE__ */ i.jsx("div", { className: "flex overflow-x-auto gap-2 no-scrollbar", children: F5.map((c) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          onClick: () => o(c.id),
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
        $5,
        {
          links: W5,
          onNavigate: (c) => u == null ? void 0 : u(c)
        }
      )
    ] }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      s === "summary" && /* @__PURE__ */ i.jsx(J5, {}),
      s === "vectorization" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ i.jsx(fr, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ i.jsx(g4, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ i.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, $t = {
  primary: "#FFFFFF",
  grid: "#111111"
}, P5 = ({ onComplete: u }) => {
  const s = M.useRef(null), o = M.useRef(null), c = M.useRef(null), f = M.useRef(null), [h, y] = M.useState(!1);
  M.useEffect(() => {
    if (window.gsap) {
      y(!0);
      return;
    }
    const g = document.createElement("script");
    g.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", g.async = !0, g.onload = () => y(!0), document.body.appendChild(g);
  }, []);
  const p = () => {
    var H;
    if (!h || !o.current) return;
    const g = window.gsap, v = o.current, E = v.getTotalLength();
    g.set(v, {
      strokeDasharray: E,
      strokeDashoffset: E,
      stroke: $t.primary,
      fillOpacity: 0,
      opacity: 1,
      strokeWidth: 2
    });
    const b = (H = c.current) == null ? void 0 : H.querySelectorAll("path");
    b && g.set(b, { opacity: 0, y: 10 }), g.set(f.current, { scale: 1, opacity: 1 }), g.set(s.current, { opacity: 1 });
    const D = g.timeline({
      onComplete: () => {
        g.to(s.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: u
        });
      }
    });
    D.to(v, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    }), b && D.to(b, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.8"), D.to({}, { duration: 1 });
  };
  return M.useEffect(() => {
    if (h) {
      const g = setTimeout(p, 800);
      return () => clearTimeout(g);
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
                        linear-gradient(to right, ${$t.grid} 1px, transparent 1px),
                        linear-gradient(to bottom, ${$t.grid} 1px, transparent 1px)
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
                    ref: o,
                    fill: "none",
                    stroke: $t.primary,
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M463.360840,364.455627 C437.246704,381.338409 406.466644,366.209045 404.026672,335.650848 C402.910156,321.667206 412.549713,306.544678 426.813293,300.633850 C430.474335,299.116699 431.826355,297.290924 431.760071,293.302460 C431.519287,278.808716 431.584564,264.307892 431.718292,249.811417 C431.748169,246.574463 430.886292,244.713684 427.681274,243.389038 C412.366425,237.059357 404.237366,225.144638 404.208862,208.867447 C404.179871,192.298615 412.621979,180.486938 428.224701,174.293686 C430.850494,173.251419 431.710938,171.751862 431.696136,169.060089 C431.613586,154.062912 431.568054,139.064117 431.723419,124.068092 C431.759430,120.590492 430.119568,119.052467 427.243103,117.790627 C413.349915,111.695946 405.841095,101.009903 404.195740,85.916542 C402.099884,66.690948 418.566650,47.364159 437.884277,46.682220 C456.888519,46.011345 468.064789,52.989845 476.252197,70.840332 C477.174438,72.851059 478.313995,73.541710 480.422974,73.516098 C499.569031,73.283493 518.722961,73.393646 537.862915,73.456795 C545.529785,73.482086 549.225952,71.767975 552.791809,64.663139 C559.898376,50.503635 576.618042,43.921410 592.447876,47.234680 C608.699890,50.636322 619.276489,62.116261 621.438904,78.701805 C623.839478,97.113228 612.679382,114.371338 595.357910,119.034004 C577.219604,123.916542 558.125427,115.204048 550.887390,98.365906 C549.251465,94.560234 547.316284,93.116508 543.150696,93.160004 C522.989380,93.370483 502.824707,93.284561 482.661285,93.261726 C479.716156,93.258385 477.395905,93.379341 475.956635,96.902077 C474.571899,100.291283 475.702576,102.070137 477.892181,104.225159 C501.524139,127.483910 525.127991,150.771423 548.653259,174.137985 C550.803162,176.273376 552.520325,176.380997 555.207153,175.171799 C569.642334,168.675354 583.205750,171.177368 594.759277,181.252563 C606.783813,191.738449 610.379395,205.504944 605.248840,220.725037 C600.321167,235.343246 589.568848,243.345337 574.305420,245.467117 C567.655396,246.391541 561.334045,245.373352 555.347839,242.591797 C552.373169,241.209595 550.274536,241.303284 547.832886,243.728531 C524.197693,267.205322 500.499634,290.619415 476.704651,313.934174 C474.165771,316.421844 475.106598,318.487793 476.015411,321.059723 C476.869354,323.476318 478.159149,324.356232 480.796143,324.332367 C501.456360,324.145294 522.118530,324.019531 542.778870,324.122131 C546.987793,324.143005 549.216675,322.931549 551.044983,318.871887 C558.230042,302.918091 576.073181,294.652069 593.497131,298.684143 C610.451355,302.607544 622.335205,317.668091 622.119812,334.958160 C621.900024,352.608002 609.316650,367.564362 591.822144,370.969543 C574.585754,374.324463 557.004028,364.861755 550.521484,348.456757 C549.268677,345.286346 547.631836,344.200745 544.294861,344.220337 C523.465576,344.342865 502.634888,344.322540 481.805359,344.218109 C478.697174,344.202545 476.993927,345.152252 475.888916,348.205902 C473.513214,354.771179 469.417969,360.183167 463.360840,364.455627 M472.733368,188.880936 C473.545441,190.333145 474.799072,191.702774 475.088898,193.252655 C476.058929,198.439468 479.434326,198.919983 483.888489,198.861130 C499.042145,198.660889 514.201233,198.707901 529.355957,198.872879 C532.819580,198.910583 534.700989,197.913788 536.177185,194.588806 C537.657104,191.255417 536.060120,189.735016 534.097900,187.805573 C510.706268,164.804840 487.354065,141.764008 463.949341,118.776604 C462.445251,117.299316 461.277863,114.441566 458.282349,116.423027 C455.343719,118.366882 451.028107,118.406143 451.180542,123.994591 C451.584534,138.807007 451.429443,153.638779 451.250458,168.459885 C451.208984,171.894135 452.474548,173.487930 455.559784,174.673798 C462.566864,177.367126 468.343140,181.758774 472.733368,188.880936 M457.308807,300.958954 C460.540070,302.823181 462.218414,300.310028 464.063263,298.488586 C487.164032,275.681519 510.248199,252.857559 533.326538,230.027756 C535.300171,228.075378 537.458679,226.516449 535.970032,222.843750 C534.495117,219.205124 532.067688,218.878906 528.898010,218.890778 C513.414001,218.948746 497.929138,219.002151 482.445862,218.887329 C478.998230,218.861771 477.090668,219.941055 475.670502,223.284790 C471.742218,232.533905 465.159332,239.474701 455.665497,243.103836 C452.239746,244.413376 451.216278,246.302231 451.253540,249.781387 C451.406891,264.098541 451.489380,278.421356 451.223358,292.735107 C451.142975,297.059998 452.224640,299.783386 457.308807,300.958954 z"
                  }
                ),
                /* @__PURE__ */ i.jsxs("g", { ref: c, children: [
                  /* @__PURE__ */ i.jsx("path", { fill: $t.primary, d: "M732.215698,483.876190 C732.750061,488.775055 731.110779,490.523590 726.372742,490.479736 C713.642639,490.361908 713.645874,490.566711 713.641113,477.834442 C713.638428,470.668732 713.788818,463.497284 713.552246,456.338928 C713.318970,449.278015 710.633911,445.451111 705.788818,444.403778 C698.667542,442.864441 692.689270,447.076904 692.324463,454.647736 C691.851685,464.458313 691.862549,474.305084 692.048706,484.128967 C692.137085,488.792786 690.778625,490.578705 685.827454,490.500549 C672.843933,490.295532 672.845886,490.510315 672.820435,477.502625 C672.805786,470.003754 672.887146,462.502136 672.708618,455.006927 C672.557556,448.666412 669.519653,444.981689 664.341858,444.320343 C658.234436,443.540314 653.997803,446.541077 652.162415,452.864807 C651.503052,455.136719 651.331299,457.435608 651.335754,459.781158 C651.352234,468.446747 651.306274,477.112488 651.338745,485.777985 C651.348389,488.341766 651.062439,490.138977 647.717529,490.447815 C632.733521,491.831421 632.748596,491.913239 632.764404,477.031830 C632.778870,463.366852 632.738831,449.701782 632.731445,436.036774 C632.727478,428.732941 632.735718,428.732544 640.257812,428.707031 C641.591003,428.702484 642.924194,428.695312 644.257324,428.701721 C647.429321,428.717010 651.058289,427.916016 650.925598,433.229431 C655.308960,431.486603 658.595154,429.192383 662.595154,428.377930 C670.453491,426.777832 677.619019,428.117981 683.735718,433.181641 C686.512207,435.480164 688.239807,435.373474 690.953918,433.250153 C697.176208,428.382202 704.485840,426.832367 712.194946,428.080414 C725.100098,430.169739 731.944641,439.074829 732.175659,453.896454 C732.328857,463.726379 732.212036,473.560547 732.215698,483.876190 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: $t.primary, d: "M487.575867,485.935303 C487.614716,484.616028 487.614716,483.640503 487.614716,481.796417 C479.116760,488.238525 470.153107,489.257660 460.718079,486.787720 C454.401794,485.134186 449.163879,481.675842 445.200134,476.457642 C436.960876,465.610748 437.295532,448.722229 445.889771,438.315796 C455.451538,426.737823 470.295227,425.042450 488.444458,433.733826 C487.913239,428.612457 491.194366,428.604004 494.772766,428.684540 C508.272736,428.988373 506.179840,426.849945 506.294434,440.421967 C506.411133,454.245575 506.366882,468.071228 506.299957,481.895538 C506.205750,501.359833 494.742065,512.847900 475.259460,513.370544 C465.272614,513.638489 455.717651,512.255005 446.682343,507.725311 C443.034790,505.896667 441.336151,503.847290 444.229065,500.105438 C444.329590,499.975464 444.390869,499.814941 444.469086,499.667908 C448.861603,491.411743 448.894196,491.340729 457.207886,495.157196 C463.352356,497.977905 469.817169,498.376801 476.285126,497.456818 C482.543640,496.566620 486.238434,492.476532 487.575867,485.935303 M469.264740,471.577881 C471.084900,471.642700 472.915710,471.865356 474.723328,471.743805 C481.074341,471.316620 486.258820,466.628052 487.489288,460.346558 C488.669373,454.322296 485.713593,448.118378 480.288971,445.234039 C472.426056,441.053253 462.868591,443.867035 459.399658,451.384033 C455.705688,459.388580 459.382996,467.492737 469.264740,471.577881 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: $t.primary, d: "M350.790619,410.644409 C354.007477,410.561554 355.147522,411.945587 355.144592,414.620361 C355.128937,428.846375 356.152588,426.165161 344.558044,426.338898 C335.900940,426.468628 327.237854,426.493591 318.582581,426.315826 C314.804382,426.238220 313.157715,427.376373 313.262451,431.424896 C313.571655,443.375275 312.019470,441.570435 323.204529,441.691742 C330.530579,441.771271 337.860626,441.831665 345.183899,441.671692 C348.853607,441.591553 350.203705,443.056824 350.190338,446.675842 C350.143219,459.433014 350.725433,457.207275 340.024445,457.368561 C332.865692,457.476471 325.700195,457.536346 318.545349,457.339996 C314.731018,457.235291 313.250702,458.478516 313.234222,462.478668 C313.185364,474.308960 313.038177,474.321259 324.813477,474.130890 C334.298523,473.977539 343.772430,475.169159 353.264343,474.338776 C354.864075,474.198792 356.466827,474.576569 356.702301,476.439850 C357.203217,480.403656 357.364838,484.405273 356.646729,488.365631 C356.297211,490.293060 354.652405,490.369568 353.118927,490.370575 C334.801880,490.382568 316.484711,490.350647 298.167847,490.412506 C295.104187,490.422852 294.024323,488.921082 294.024200,486.130402 C294.023224,462.484924 294.047699,438.839325 293.967896,415.194092 C293.954620,411.261261 296.028046,410.593658 299.359711,410.610138 C316.344330,410.694275 333.329620,410.638672 350.790619,410.644409 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: $t.primary, d: "M620.003906,453.402435 C620.062195,464.023071 619.882812,474.188721 620.189575,484.339661 C620.338318,489.262421 618.431458,490.973572 613.757507,490.452362 C611.783386,490.232208 609.754700,490.291412 607.767883,490.444916 C604.889648,490.667267 602.478821,490.168823 601.296570,486.513000 C594.831909,490.991821 587.888184,491.843719 580.600464,491.328247 C565.916626,490.289642 557.201233,476.053131 563.502625,463.374390 C565.502930,459.349640 568.872803,457.136932 572.794861,455.506927 C578.118103,453.294647 583.702881,452.709900 589.425354,452.731232 C592.879822,452.744110 596.387085,453.235260 599.791443,452.317169 C599.855774,446.843750 597.260681,443.903503 591.552673,443.177338 C585.446533,442.400513 579.495911,443.228607 574.179382,446.386688 C570.948853,448.305603 569.535645,447.214966 568.011658,444.340485 C563.043945,434.970917 563.058899,434.663818 573.199219,430.800537 C582.143921,427.392792 591.347961,426.734100 600.678101,428.904358 C613.358643,431.853943 619.173157,440.405762 620.003906,453.402435 M582.869263,466.083313 C579.496887,469.605530 579.013306,473.431427 581.947998,475.906952 C585.513611,478.914764 589.714966,478.291107 593.721985,477.031647 C597.412354,475.871704 599.990784,473.365112 600.658081,469.369629 C601.070496,466.900665 600.409729,465.044220 597.411255,465.098297 C592.800171,465.181488 588.157471,464.530182 582.869263,466.083313 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: $t.primary, d: "M410.915314,457.280090 C410.311127,447.930115 406.925934,444.198608 399.452026,444.194855 C391.667114,444.190948 386.727997,448.953094 386.409271,457.536652 C386.075653,466.521088 386.068634,475.532593 386.350006,484.518738 C386.494904,489.147247 384.896912,490.532959 380.337830,490.481964 C367.440552,490.337616 367.627808,490.513641 367.533173,477.713593 C367.426025,463.226135 368.160004,448.728760 367.168365,434.251617 C366.898468,430.311462 368.239288,428.249725 372.529694,428.668640 C374.840057,428.894196 377.203857,428.868896 379.519684,428.673553 C383.194244,428.363556 385.817352,429.188293 385.487488,434.182526 C390.858826,430.844635 395.856995,428.304504 401.601257,427.794434 C418.292908,426.312286 429.386810,436.518799 429.975342,454.379517 C430.315308,464.696716 429.971527,475.035126 430.046204,485.363190 C430.071198,488.817627 428.985992,490.534210 425.145325,490.442291 C408.307220,490.039520 411.204895,492.848450 410.942963,476.734924 C410.840088,470.406036 410.927368,464.074036 410.915314,457.280090 z" }),
                  /* @__PURE__ */ i.jsx("path", { fill: $t.primary, d: "M556.799500,444.921539 C554.214233,445.227783 552.026184,445.174683 549.913574,445.548401 C542.544189,446.852142 538.560974,452.210632 538.387756,461.266998 C538.231995,469.411011 538.239258,477.561676 538.377136,485.705963 C538.433838,489.055634 537.355591,490.537964 533.812988,490.447296 C516.656677,490.008148 519.942505,492.939087 519.712585,476.823181 C519.510925,462.693848 519.801025,448.557343 519.590698,434.428253 C519.527222,430.165985 520.732788,428.169983 525.216187,428.665833 C527.350830,428.901917 529.549255,428.854156 531.692566,428.654297 C535.487610,428.300446 537.940002,429.350586 537.432373,434.447845 C542.475464,431.817810 546.689819,428.862549 551.859985,428.147003 C557.409912,427.378845 558.504028,428.019318 558.285950,433.612213 C558.141113,437.327057 559.514648,441.236115 556.799500,444.921539 z" })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ i.jsx("p", { className: "mt-6 md:mt-8 text-white/30 text-xs md:text-sm tracking-widest uppercase", children: "Where memories leave their trace" })
        ] })
      ]
    }
  );
}, ep = ({ onClose: u }) => {
  const [s, o] = M.useState("dashboard"), [c, f] = M.useState(!1), [h, y] = M.useState(!1);
  M.useEffect(() => {
    const v = setTimeout(() => {
      const E = Le.get("hasSeenWelcome");
      console.debug("[Engram] hasSeenWelcome:", E), E || f(!0), y(!0);
    }, 1e3);
    return () => clearTimeout(v);
  }, []);
  const p = () => {
    Le.set("hasSeenWelcome", !0), console.debug("[Engram] hasSeenWelcome saved"), f(!1);
  };
  if (!h)
    return null;
  const g = () => {
    const [v, E] = s.split(":");
    switch (v) {
      case "dashboard":
        return /* @__PURE__ */ i.jsx(T1, { onNavigate: o });
      case "presets":
        return /* @__PURE__ */ i.jsx(k5, { initialTab: E });
      case "graph":
        return /* @__PURE__ */ i.jsx(qg, {});
      case "devlog":
        return /* @__PURE__ */ i.jsx(Pg, { initialTab: E });
      case "settings":
        return /* @__PURE__ */ i.jsx(Q5, {});
      case "memory":
        return /* @__PURE__ */ i.jsx(X5, {});
      case "processing":
        return /* @__PURE__ */ i.jsx(I5, { onNavigate: o });
      default:
        return /* @__PURE__ */ i.jsx(T1, {});
    }
  };
  return /* @__PURE__ */ i.jsxs(im, { children: [
    c && /* @__PURE__ */ i.jsx(P5, { onComplete: p }),
    /* @__PURE__ */ i.jsx(Tg, { activeTab: s, setActiveTab: o, onClose: u, children: g() })
  ] });
};
var tp = L1();
const np = /* @__PURE__ */ Lc(tp), lp = () => {
  const [u, s] = M.useState(!1), [o, c] = M.useState(null), [f, h] = M.useState("");
  M.useEffect(() => {
    const g = fl.on(
      qn.ENGRAM_REQUEST_REVISION,
      (v) => {
        const E = v;
        c(E), h(E.content), s(!0);
      }
    );
    return () => {
      g();
    };
  }, []);
  const y = () => {
    o && (o.onConfirm(f), s(!1), c(null));
  }, p = () => {
    o && o.onCancel(), s(!1), c(null);
  };
  return u ? np.createPortal(
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
              onClick: p
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "relative w-full max-w-2xl bg-popover border border-border rounded-lg shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200", children: [
            /* @__PURE__ */ i.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-border", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ i.jsx("h3", { className: "text-lg font-medium text-foreground tracking-tight", children: (o == null ? void 0 : o.title) || "内容修订" }),
                (o == null ? void 0 : o.description) && /* @__PURE__ */ i.jsx("p", { className: "text-sm text-muted-foreground", children: o.description })
              ] }),
              /* @__PURE__ */ i.jsx(
                "button",
                {
                  onClick: p,
                  className: "p-2 -m-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ i.jsx(Ki, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ i.jsxs("div", { className: "flex-1 p-5 overflow-hidden flex flex-col gap-4", children: [
              /* @__PURE__ */ i.jsxs("div", { className: "flex items-start gap-3 p-3 bg-primary/10 border border-primary/20 rounded-md", children: [
                /* @__PURE__ */ i.jsx(M3, { size: 16, className: "text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ i.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "请仔细检查内容的格式、关键信息和一致性。这是写入长期记忆前的最后确认。" })
              ] }),
              /* @__PURE__ */ i.jsx(
                "textarea",
                {
                  value: f,
                  onChange: (g) => h(g.target.value),
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
                  onClick: p,
                  className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors",
                  style: { backgroundColor: "transparent" },
                  children: "取消"
                }
              ),
              /* @__PURE__ */ i.jsxs(
                "button",
                {
                  onClick: y,
                  className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-opacity",
                  style: {
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)"
                  },
                  children: [
                    /* @__PURE__ */ i.jsx(Q1, { size: 16 }),
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
Mg((u, s) => {
  const o = q1.createRoot(u);
  return o.render(Zh.createElement(ep, { onClose: s })), o;
});
Og((u) => {
  const s = q1.createRoot(u);
  return s.render(
    /* @__PURE__ */ i.jsx(im, { children: /* @__PURE__ */ i.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ i.jsx(lp, {}) }) })
  ), s;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", N1) : N1();
class ym {
  static init() {
    var s;
    if (!this.isInitialized)
      try {
        const o = ra();
        o != null && o.eventSource && ((s = o == null ? void 0 : o.event_types) != null && s.CHARACTER_DELETED) ? (o.eventSource.on(o.event_types.CHARACTER_DELETED, this.onCharacterDeleted.bind(this)), ae.info("CharacterDeleteService", "监听 CHARACTER_DELETED 事件成功"), this.isInitialized = !0) : ae.warn("CharacterDeleteService", "无法监听 CHARACTER_DELETED 事件: eventSource 或事件类型缺失");
      } catch (o) {
        ae.error("CharacterDeleteService", "初始化失败", o);
      }
  }
  static async onCharacterDeleted(s) {
    var b, D;
    const o = Le.getSettings().linkedDeletion;
    if (!(o != null && o.enabled)) return;
    ae.debug("CharacterDeleteService", "检测到角色删除", s);
    const c = s.character, f = (c == null ? void 0 : c.name) || (c == null ? void 0 : c.avatar) || (c == null ? void 0 : c.ch_name) || ((b = c == null ? void 0 : c.data) == null ? void 0 : b.name);
    if (!f) {
      ae.warn("CharacterDeleteService", "无法获取已删除角色的名称");
      return;
    }
    const h = /* @__PURE__ */ new Set();
    h.add(`[Engram] ${f}`), h.add(`Engram_${f}`);
    const y = c.data || c, p = (D = y == null ? void 0 : y.extensions) == null ? void 0 : D.world;
    p && typeof p == "string" && (ae.debug("CharacterDeleteService", `从角色数据中发现绑定世界书: ${p}`), h.add(p));
    const g = await ve.getWorldbookNames(), v = new Set(g), E = Array.from(h).filter((H) => {
      if (!v.has(H)) return !1;
      const B = H.toLowerCase().includes("engram");
      return B || ae.info("CharacterDeleteService", `跳过非 Engram 世界书: ${H}`), B;
    });
    if (E.length === 0) {
      ae.debug("CharacterDeleteService", `未找到角色 "${f}" 关联的 Engram 世界书`);
      return;
    }
    if (ae.info("CharacterDeleteService", `准备删除关联世界书: ${E.join(", ")}`), o.showConfirmation) {
      const H = `
                <div style="font-size: 0.9em;">
                    <h3>🧹 Engram 联动清理</h3>
                    <p>检测到角色 <b>${f}</b> 已被删除。</p>
                    <p>发现以下关联的 Engram 记忆库：</p>
                    <ul style="max-height: 100px; overflow-y: auto; background: var(--black50a); padding: 5px; border-radius: 4px; list-style: none; margin: 10px 0;">
                        ${E.map((q) => `<li style="padding: 2px 0;">• ${q}</li>`).join("")}
                    </ul>
                    <p>是否一并删除？</p>
                    <small style="opacity: 0.7;">这将永久删除这些记忆库及其包含的所有摘要。</small>
                </div>
            `;
      if (!await Bg(H, "confirm")) {
        ae.info("CharacterDeleteService", "用户取消删除关联世界书");
        return;
      }
    }
    if (o.deleteWorldbook) {
      let H = 0;
      const B = [];
      rt.info("正在清理 Engram 记忆库...", "Engram");
      for (const q of E)
        try {
          await ve.deleteWorldbook(q) ? (H++, ae.info("CharacterDeleteService", `已删除世界书: ${q}`)) : B.push(q);
        } catch (F) {
          ae.error("CharacterDeleteService", `删除世界书 ${q} 失败`, F), B.push(q);
        }
      H > 0 && rt.success(`已清理 ${H} 个关联记忆库`, "Engram"), B.length > 0 && rt.warning(`部分记忆库删除失败: ${B.join(", ")}`, "Engram");
    }
    o.deleteIndexedDB;
  }
}
He(ym, "isInitialized", !1);
const ap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CharacterDeleteService: ym
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=index.js.map
