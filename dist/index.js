var x1 = Object.defineProperty;
var S1 = (o, s, d) => s in o ? x1(o, s, { enumerable: !0, configurable: !0, writable: !0, value: d }) : o[s] = d;
var wt = (o, s, d) => S1(o, typeof s != "symbol" ? s + "" : s, d);
var _1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Of(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var sf = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qm;
function j1() {
  if (Qm) return Le;
  Qm = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), M = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), $ = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), re = Symbol.iterator;
  function we(A) {
    return A === null || typeof A != "object" ? null : (A = re && A[re] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var Ae = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, oe = Object.assign, ke = {};
  function pe(A, ee, de) {
    this.props = A, this.context = ee, this.refs = ke, this.updater = de || Ae;
  }
  pe.prototype.isReactComponent = {}, pe.prototype.setState = function(A, ee) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, ee, "setState");
  }, pe.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function Me() {
  }
  Me.prototype = pe.prototype;
  function fe(A, ee, de) {
    this.props = A, this.context = ee, this.refs = ke, this.updater = de || Ae;
  }
  var Oe = fe.prototype = new Me();
  Oe.constructor = fe, oe(Oe, pe.prototype), Oe.isPureReactComponent = !0;
  var Ue = Array.isArray;
  function Be() {
  }
  var Se = { H: null, A: null, T: null, S: null }, ft = Object.prototype.hasOwnProperty;
  function kt(A, ee, de) {
    var be = de.ref;
    return {
      $$typeof: o,
      type: A,
      key: ee,
      ref: be !== void 0 ? be : null,
      props: de
    };
  }
  function _n(A, ee) {
    return kt(A.type, ee, A.props);
  }
  function Qt(A) {
    return typeof A == "object" && A !== null && A.$$typeof === o;
  }
  function Ge(A) {
    var ee = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(de) {
      return ee[de];
    });
  }
  var Vt = /\/+/g;
  function jn(A, ee) {
    return typeof A == "object" && A !== null && A.key != null ? Ge("" + A.key) : ee.toString(36);
  }
  function ve(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(Be, Be) : (A.status = "pending", A.then(
          function(ee) {
            A.status === "pending" && (A.status = "fulfilled", A.value = ee);
          },
          function(ee) {
            A.status === "pending" && (A.status = "rejected", A.reason = ee);
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
  function U(A, ee, de, be, De) {
    var qe = typeof A;
    (qe === "undefined" || qe === "boolean") && (A = null);
    var We = !1;
    if (A === null) We = !0;
    else
      switch (qe) {
        case "bigint":
        case "string":
        case "number":
          We = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case o:
            case s:
              We = !0;
              break;
            case $:
              return We = A._init, U(
                We(A._payload),
                ee,
                de,
                be,
                De
              );
          }
      }
    if (We)
      return De = De(A), We = be === "" ? "." + jn(A, 0) : be, Ue(De) ? (de = "", We != null && (de = We.replace(Vt, "$&/") + "/"), U(De, ee, de, "", function(Ja) {
        return Ja;
      })) : De != null && (Qt(De) && (De = _n(
        De,
        de + (De.key == null || A && A.key === De.key ? "" : ("" + De.key).replace(
          Vt,
          "$&/"
        ) + "/") + We
      )), ee.push(De)), 1;
    We = 0;
    var Xt = be === "" ? "." : be + ":";
    if (Ue(A))
      for (var me = 0; me < A.length; me++)
        be = A[me], qe = Xt + jn(be, me), We += U(
          be,
          ee,
          de,
          qe,
          De
        );
    else if (me = we(A), typeof me == "function")
      for (A = me.call(A), me = 0; !(be = A.next()).done; )
        be = be.value, qe = Xt + jn(be, me++), We += U(
          be,
          ee,
          de,
          qe,
          De
        );
    else if (qe === "object") {
      if (typeof A.then == "function")
        return U(
          ve(A),
          ee,
          de,
          be,
          De
        );
      throw ee = String(A), Error(
        "Objects are not valid as a React child (found: " + (ee === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : ee) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return We;
  }
  function te(A, ee, de) {
    if (A == null) return A;
    var be = [], De = 0;
    return U(A, be, "", "", function(qe) {
      return ee.call(de, qe, De++);
    }), be;
  }
  function je(A) {
    if (A._status === -1) {
      var ee = A._result;
      ee = ee(), ee.then(
        function(de) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = de);
        },
        function(de) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = de);
        }
      ), A._status === -1 && (A._status = 0, A._result = ee);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var $e = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var ee = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(ee)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, Ve = {
    map: te,
    forEach: function(A, ee, de) {
      te(
        A,
        function() {
          ee.apply(this, arguments);
        },
        de
      );
    },
    count: function(A) {
      var ee = 0;
      return te(A, function() {
        ee++;
      }), ee;
    },
    toArray: function(A) {
      return te(A, function(ee) {
        return ee;
      }) || [];
    },
    only: function(A) {
      if (!Qt(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Le.Activity = Q, Le.Children = Ve, Le.Component = pe, Le.Fragment = d, Le.Profiler = x, Le.PureComponent = fe, Le.StrictMode = h, Le.Suspense = k, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Se, Le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return Se.H.useMemoCache(A);
    }
  }, Le.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Le.cacheSignal = function() {
    return null;
  }, Le.cloneElement = function(A, ee, de) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var be = oe({}, A.props), De = A.key;
    if (ee != null)
      for (qe in ee.key !== void 0 && (De = "" + ee.key), ee)
        !ft.call(ee, qe) || qe === "key" || qe === "__self" || qe === "__source" || qe === "ref" && ee.ref === void 0 || (be[qe] = ee[qe]);
    var qe = arguments.length - 2;
    if (qe === 1) be.children = de;
    else if (1 < qe) {
      for (var We = Array(qe), Xt = 0; Xt < qe; Xt++)
        We[Xt] = arguments[Xt + 2];
      be.children = We;
    }
    return kt(A.type, De, be);
  }, Le.createContext = function(A) {
    return A = {
      $$typeof: M,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: S,
      _context: A
    }, A;
  }, Le.createElement = function(A, ee, de) {
    var be, De = {}, qe = null;
    if (ee != null)
      for (be in ee.key !== void 0 && (qe = "" + ee.key), ee)
        ft.call(ee, be) && be !== "key" && be !== "__self" && be !== "__source" && (De[be] = ee[be]);
    var We = arguments.length - 2;
    if (We === 1) De.children = de;
    else if (1 < We) {
      for (var Xt = Array(We), me = 0; me < We; me++)
        Xt[me] = arguments[me + 2];
      De.children = Xt;
    }
    if (A && A.defaultProps)
      for (be in We = A.defaultProps, We)
        De[be] === void 0 && (De[be] = We[be]);
    return kt(A, qe, De);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(A) {
    return { $$typeof: R, render: A };
  }, Le.isValidElement = Qt, Le.lazy = function(A) {
    return {
      $$typeof: $,
      _payload: { _status: -1, _result: A },
      _init: je
    };
  }, Le.memo = function(A, ee) {
    return {
      $$typeof: D,
      type: A,
      compare: ee === void 0 ? null : ee
    };
  }, Le.startTransition = function(A) {
    var ee = Se.T, de = {};
    Se.T = de;
    try {
      var be = A(), De = Se.S;
      De !== null && De(de, be), typeof be == "object" && be !== null && typeof be.then == "function" && be.then(Be, $e);
    } catch (qe) {
      $e(qe);
    } finally {
      ee !== null && de.types !== null && (ee.types = de.types), Se.T = ee;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return Se.H.useCacheRefresh();
  }, Le.use = function(A) {
    return Se.H.use(A);
  }, Le.useActionState = function(A, ee, de) {
    return Se.H.useActionState(A, ee, de);
  }, Le.useCallback = function(A, ee) {
    return Se.H.useCallback(A, ee);
  }, Le.useContext = function(A) {
    return Se.H.useContext(A);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(A, ee) {
    return Se.H.useDeferredValue(A, ee);
  }, Le.useEffect = function(A, ee) {
    return Se.H.useEffect(A, ee);
  }, Le.useEffectEvent = function(A) {
    return Se.H.useEffectEvent(A);
  }, Le.useId = function() {
    return Se.H.useId();
  }, Le.useImperativeHandle = function(A, ee, de) {
    return Se.H.useImperativeHandle(A, ee, de);
  }, Le.useInsertionEffect = function(A, ee) {
    return Se.H.useInsertionEffect(A, ee);
  }, Le.useLayoutEffect = function(A, ee) {
    return Se.H.useLayoutEffect(A, ee);
  }, Le.useMemo = function(A, ee) {
    return Se.H.useMemo(A, ee);
  }, Le.useOptimistic = function(A, ee) {
    return Se.H.useOptimistic(A, ee);
  }, Le.useReducer = function(A, ee, de) {
    return Se.H.useReducer(A, ee, de);
  }, Le.useRef = function(A) {
    return Se.H.useRef(A);
  }, Le.useState = function(A) {
    return Se.H.useState(A);
  }, Le.useSyncExternalStore = function(A, ee, de) {
    return Se.H.useSyncExternalStore(
      A,
      ee,
      de
    );
  }, Le.useTransition = function() {
    return Se.H.useTransition();
  }, Le.version = "19.2.3", Le;
}
var Vm;
function zf() {
  return Vm || (Vm = 1, sf.exports = j1()), sf.exports;
}
var le = zf();
const E0 = /* @__PURE__ */ Of(le);
var cf = { exports: {} }, Su = {}, ff = { exports: {} }, df = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xm;
function w1() {
  return Xm || (Xm = 1, (function(o) {
    function s(U, te) {
      var je = U.length;
      U.push(te);
      e: for (; 0 < je; ) {
        var $e = je - 1 >>> 1, Ve = U[$e];
        if (0 < x(Ve, te))
          U[$e] = te, U[je] = Ve, je = $e;
        else break e;
      }
    }
    function d(U) {
      return U.length === 0 ? null : U[0];
    }
    function h(U) {
      if (U.length === 0) return null;
      var te = U[0], je = U.pop();
      if (je !== te) {
        U[0] = je;
        e: for (var $e = 0, Ve = U.length, A = Ve >>> 1; $e < A; ) {
          var ee = 2 * ($e + 1) - 1, de = U[ee], be = ee + 1, De = U[be];
          if (0 > x(de, je))
            be < Ve && 0 > x(De, de) ? (U[$e] = De, U[be] = je, $e = be) : (U[$e] = de, U[ee] = je, $e = ee);
          else if (be < Ve && 0 > x(De, je))
            U[$e] = De, U[be] = je, $e = be;
          else break e;
        }
      }
      return te;
    }
    function x(U, te) {
      var je = U.sortIndex - te.sortIndex;
      return je !== 0 ? je : U.id - te.id;
    }
    if (o.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var S = performance;
      o.unstable_now = function() {
        return S.now();
      };
    } else {
      var M = Date, R = M.now();
      o.unstable_now = function() {
        return M.now() - R;
      };
    }
    var k = [], D = [], $ = 1, Q = null, re = 3, we = !1, Ae = !1, oe = !1, ke = !1, pe = typeof setTimeout == "function" ? setTimeout : null, Me = typeof clearTimeout == "function" ? clearTimeout : null, fe = typeof setImmediate < "u" ? setImmediate : null;
    function Oe(U) {
      for (var te = d(D); te !== null; ) {
        if (te.callback === null) h(D);
        else if (te.startTime <= U)
          h(D), te.sortIndex = te.expirationTime, s(k, te);
        else break;
        te = d(D);
      }
    }
    function Ue(U) {
      if (oe = !1, Oe(U), !Ae)
        if (d(k) !== null)
          Ae = !0, Be || (Be = !0, Ge());
        else {
          var te = d(D);
          te !== null && ve(Ue, te.startTime - U);
        }
    }
    var Be = !1, Se = -1, ft = 5, kt = -1;
    function _n() {
      return ke ? !0 : !(o.unstable_now() - kt < ft);
    }
    function Qt() {
      if (ke = !1, Be) {
        var U = o.unstable_now();
        kt = U;
        var te = !0;
        try {
          e: {
            Ae = !1, oe && (oe = !1, Me(Se), Se = -1), we = !0;
            var je = re;
            try {
              t: {
                for (Oe(U), Q = d(k); Q !== null && !(Q.expirationTime > U && _n()); ) {
                  var $e = Q.callback;
                  if (typeof $e == "function") {
                    Q.callback = null, re = Q.priorityLevel;
                    var Ve = $e(
                      Q.expirationTime <= U
                    );
                    if (U = o.unstable_now(), typeof Ve == "function") {
                      Q.callback = Ve, Oe(U), te = !0;
                      break t;
                    }
                    Q === d(k) && h(k), Oe(U);
                  } else h(k);
                  Q = d(k);
                }
                if (Q !== null) te = !0;
                else {
                  var A = d(D);
                  A !== null && ve(
                    Ue,
                    A.startTime - U
                  ), te = !1;
                }
              }
              break e;
            } finally {
              Q = null, re = je, we = !1;
            }
            te = void 0;
          }
        } finally {
          te ? Ge() : Be = !1;
        }
      }
    }
    var Ge;
    if (typeof fe == "function")
      Ge = function() {
        fe(Qt);
      };
    else if (typeof MessageChannel < "u") {
      var Vt = new MessageChannel(), jn = Vt.port2;
      Vt.port1.onmessage = Qt, Ge = function() {
        jn.postMessage(null);
      };
    } else
      Ge = function() {
        pe(Qt, 0);
      };
    function ve(U, te) {
      Se = pe(function() {
        U(o.unstable_now());
      }, te);
    }
    o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, o.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, o.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ft = 0 < U ? Math.floor(1e3 / U) : 5;
    }, o.unstable_getCurrentPriorityLevel = function() {
      return re;
    }, o.unstable_next = function(U) {
      switch (re) {
        case 1:
        case 2:
        case 3:
          var te = 3;
          break;
        default:
          te = re;
      }
      var je = re;
      re = te;
      try {
        return U();
      } finally {
        re = je;
      }
    }, o.unstable_requestPaint = function() {
      ke = !0;
    }, o.unstable_runWithPriority = function(U, te) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var je = re;
      re = U;
      try {
        return te();
      } finally {
        re = je;
      }
    }, o.unstable_scheduleCallback = function(U, te, je) {
      var $e = o.unstable_now();
      switch (typeof je == "object" && je !== null ? (je = je.delay, je = typeof je == "number" && 0 < je ? $e + je : $e) : je = $e, U) {
        case 1:
          var Ve = -1;
          break;
        case 2:
          Ve = 250;
          break;
        case 5:
          Ve = 1073741823;
          break;
        case 4:
          Ve = 1e4;
          break;
        default:
          Ve = 5e3;
      }
      return Ve = je + Ve, U = {
        id: $++,
        callback: te,
        priorityLevel: U,
        startTime: je,
        expirationTime: Ve,
        sortIndex: -1
      }, je > $e ? (U.sortIndex = je, s(D, U), d(k) === null && U === d(D) && (oe ? (Me(Se), Se = -1) : oe = !0, ve(Ue, je - $e))) : (U.sortIndex = Ve, s(k, U), Ae || we || (Ae = !0, Be || (Be = !0, Ge()))), U;
    }, o.unstable_shouldYield = _n, o.unstable_wrapCallback = function(U) {
      var te = re;
      return function() {
        var je = re;
        re = te;
        try {
          return U.apply(this, arguments);
        } finally {
          re = je;
        }
      };
    };
  })(df)), df;
}
var Zm;
function E1() {
  return Zm || (Zm = 1, ff.exports = w1()), ff.exports;
}
var hf = { exports: {} }, rn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jm;
function C1() {
  if (Jm) return rn;
  Jm = 1;
  var o = zf();
  function s(k) {
    var D = "https://react.dev/errors/" + k;
    if (1 < arguments.length) {
      D += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var $ = 2; $ < arguments.length; $++)
        D += "&args[]=" + encodeURIComponent(arguments[$]);
    }
    return "Minified React error #" + k + "; visit " + D + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var h = {
    d: {
      f: d,
      r: function() {
        throw Error(s(522));
      },
      D: d,
      C: d,
      L: d,
      m: d,
      X: d,
      S: d,
      M: d
    },
    p: 0,
    findDOMNode: null
  }, x = Symbol.for("react.portal");
  function S(k, D, $) {
    var Q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: x,
      key: Q == null ? null : "" + Q,
      children: k,
      containerInfo: D,
      implementation: $
    };
  }
  var M = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function R(k, D) {
    if (k === "font") return "";
    if (typeof D == "string")
      return D === "use-credentials" ? D : "";
  }
  return rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = h, rn.createPortal = function(k, D) {
    var $ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!D || D.nodeType !== 1 && D.nodeType !== 9 && D.nodeType !== 11)
      throw Error(s(299));
    return S(k, D, null, $);
  }, rn.flushSync = function(k) {
    var D = M.T, $ = h.p;
    try {
      if (M.T = null, h.p = 2, k) return k();
    } finally {
      M.T = D, h.p = $, h.d.f();
    }
  }, rn.preconnect = function(k, D) {
    typeof k == "string" && (D ? (D = D.crossOrigin, D = typeof D == "string" ? D === "use-credentials" ? D : "" : void 0) : D = null, h.d.C(k, D));
  }, rn.prefetchDNS = function(k) {
    typeof k == "string" && h.d.D(k);
  }, rn.preinit = function(k, D) {
    if (typeof k == "string" && D && typeof D.as == "string") {
      var $ = D.as, Q = R($, D.crossOrigin), re = typeof D.integrity == "string" ? D.integrity : void 0, we = typeof D.fetchPriority == "string" ? D.fetchPriority : void 0;
      $ === "style" ? h.d.S(
        k,
        typeof D.precedence == "string" ? D.precedence : void 0,
        {
          crossOrigin: Q,
          integrity: re,
          fetchPriority: we
        }
      ) : $ === "script" && h.d.X(k, {
        crossOrigin: Q,
        integrity: re,
        fetchPriority: we,
        nonce: typeof D.nonce == "string" ? D.nonce : void 0
      });
    }
  }, rn.preinitModule = function(k, D) {
    if (typeof k == "string")
      if (typeof D == "object" && D !== null) {
        if (D.as == null || D.as === "script") {
          var $ = R(
            D.as,
            D.crossOrigin
          );
          h.d.M(k, {
            crossOrigin: $,
            integrity: typeof D.integrity == "string" ? D.integrity : void 0,
            nonce: typeof D.nonce == "string" ? D.nonce : void 0
          });
        }
      } else D == null && h.d.M(k);
  }, rn.preload = function(k, D) {
    if (typeof k == "string" && typeof D == "object" && D !== null && typeof D.as == "string") {
      var $ = D.as, Q = R($, D.crossOrigin);
      h.d.L(k, $, {
        crossOrigin: Q,
        integrity: typeof D.integrity == "string" ? D.integrity : void 0,
        nonce: typeof D.nonce == "string" ? D.nonce : void 0,
        type: typeof D.type == "string" ? D.type : void 0,
        fetchPriority: typeof D.fetchPriority == "string" ? D.fetchPriority : void 0,
        referrerPolicy: typeof D.referrerPolicy == "string" ? D.referrerPolicy : void 0,
        imageSrcSet: typeof D.imageSrcSet == "string" ? D.imageSrcSet : void 0,
        imageSizes: typeof D.imageSizes == "string" ? D.imageSizes : void 0,
        media: typeof D.media == "string" ? D.media : void 0
      });
    }
  }, rn.preloadModule = function(k, D) {
    if (typeof k == "string")
      if (D) {
        var $ = R(D.as, D.crossOrigin);
        h.d.m(k, {
          as: typeof D.as == "string" && D.as !== "script" ? D.as : void 0,
          crossOrigin: $,
          integrity: typeof D.integrity == "string" ? D.integrity : void 0
        });
      } else h.d.m(k);
  }, rn.requestFormReset = function(k) {
    h.d.r(k);
  }, rn.unstable_batchedUpdates = function(k, D) {
    return k(D);
  }, rn.useFormState = function(k, D, $) {
    return M.H.useFormState(k, D, $);
  }, rn.useFormStatus = function() {
    return M.H.useHostTransitionStatus();
  }, rn.version = "19.2.3", rn;
}
var Fm;
function N1() {
  if (Fm) return hf.exports;
  Fm = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return o(), hf.exports = C1(), hf.exports;
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
var $m;
function T1() {
  if ($m) return Su;
  $m = 1;
  var o = E1(), s = zf(), d = N1();
  function h(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function x(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function S(e) {
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
  function M(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function R(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function k(e) {
    if (S(e) !== e)
      throw Error(h(188));
  }
  function D(e) {
    var t = e.alternate;
    if (!t) {
      if (t = S(e), t === null) throw Error(h(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var r = n.return;
      if (r === null) break;
      var u = r.alternate;
      if (u === null) {
        if (a = r.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (r.child === u.child) {
        for (u = r.child; u; ) {
          if (u === n) return k(r), e;
          if (u === a) return k(r), t;
          u = u.sibling;
        }
        throw Error(h(188));
      }
      if (n.return !== a.return) n = r, a = u;
      else {
        for (var p = !1, v = r.child; v; ) {
          if (v === n) {
            p = !0, n = r, a = u;
            break;
          }
          if (v === a) {
            p = !0, a = r, n = u;
            break;
          }
          v = v.sibling;
        }
        if (!p) {
          for (v = u.child; v; ) {
            if (v === n) {
              p = !0, n = u, a = r;
              break;
            }
            if (v === a) {
              p = !0, a = u, n = r;
              break;
            }
            v = v.sibling;
          }
          if (!p) throw Error(h(189));
        }
      }
      if (n.alternate !== a) throw Error(h(190));
    }
    if (n.tag !== 3) throw Error(h(188));
    return n.stateNode.current === n ? e : t;
  }
  function $(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = $(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Q = Object.assign, re = Symbol.for("react.element"), we = Symbol.for("react.transitional.element"), Ae = Symbol.for("react.portal"), oe = Symbol.for("react.fragment"), ke = Symbol.for("react.strict_mode"), pe = Symbol.for("react.profiler"), Me = Symbol.for("react.consumer"), fe = Symbol.for("react.context"), Oe = Symbol.for("react.forward_ref"), Ue = Symbol.for("react.suspense"), Be = Symbol.for("react.suspense_list"), Se = Symbol.for("react.memo"), ft = Symbol.for("react.lazy"), kt = Symbol.for("react.activity"), _n = Symbol.for("react.memo_cache_sentinel"), Qt = Symbol.iterator;
  function Ge(e) {
    return e === null || typeof e != "object" ? null : (e = Qt && e[Qt] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Vt = Symbol.for("react.client.reference");
  function jn(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Vt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case oe:
        return "Fragment";
      case pe:
        return "Profiler";
      case ke:
        return "StrictMode";
      case Ue:
        return "Suspense";
      case Be:
        return "SuspenseList";
      case kt:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ae:
          return "Portal";
        case fe:
          return e.displayName || "Context";
        case Me:
          return (e._context.displayName || "Context") + ".Consumer";
        case Oe:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Se:
          return t = e.displayName || null, t !== null ? t : jn(e.type) || "Memo";
        case ft:
          t = e._payload, e = e._init;
          try {
            return jn(e(t));
          } catch {
          }
      }
    return null;
  }
  var ve = Array.isArray, U = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, je = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, $e = [], Ve = -1;
  function A(e) {
    return { current: e };
  }
  function ee(e) {
    0 > Ve || (e.current = $e[Ve], $e[Ve] = null, Ve--);
  }
  function de(e, t) {
    Ve++, $e[Ve] = e.current, e.current = t;
  }
  var be = A(null), De = A(null), qe = A(null), We = A(null);
  function Xt(e, t) {
    switch (de(qe, t), de(De, e), de(be, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? hm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = hm(t), e = mm(t, e);
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
    ee(be), de(be, e);
  }
  function me() {
    ee(be), ee(De), ee(qe);
  }
  function Ja(e) {
    e.memoizedState !== null && de(We, e);
    var t = be.current, n = mm(t, e.type);
    t !== n && (de(De, e), de(be, n));
  }
  function ga(e) {
    De.current === e && (ee(be), ee(De)), We.current === e && (ee(We), gu._currentValue = je);
  }
  var et, Fa;
  function va(e) {
    if (et === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        et = t && t[1] || "", Fa = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + et + e + Fa;
  }
  var Xn = !1;
  function vi(e, t) {
    if (!e || Xn) return "";
    Xn = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
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
                } catch (Z) {
                  var X = Z;
                }
                Reflect.construct(e, [], W);
              } else {
                try {
                  W.call();
                } catch (Z) {
                  X = Z;
                }
                e.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Z) {
                X = Z;
              }
              (W = e()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (Z) {
            if (Z && X && typeof Z.stack == "string")
              return [Z.stack, X.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), p = u[0], v = u[1];
      if (p && v) {
        var j = p.split(`
`), G = v.split(`
`);
        for (r = a = 0; a < j.length && !j[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; r < G.length && !G[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (a === j.length || r === G.length)
          for (a = j.length - 1, r = G.length - 1; 1 <= a && 0 <= r && j[a] !== G[r]; )
            r--;
        for (; 1 <= a && 0 <= r; a--, r--)
          if (j[a] !== G[r]) {
            if (a !== 1 || r !== 1)
              do
                if (a--, r--, 0 > r || j[a] !== G[r]) {
                  var F = `
` + j[a].replace(" at new ", " at ");
                  return e.displayName && F.includes("<anonymous>") && (F = F.replace("<anonymous>", e.displayName)), F;
                }
              while (1 <= a && 0 <= r);
            break;
          }
      }
    } finally {
      Xn = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? va(n) : "";
  }
  function ms(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return va(e.type);
      case 16:
        return va("Lazy");
      case 13:
        return e.child !== t && t !== null ? va("Suspense Fallback") : va("Suspense");
      case 19:
        return va("SuspenseList");
      case 0:
      case 15:
        return vi(e.type, !1);
      case 11:
        return vi(e.type.render, !1);
      case 1:
        return vi(e.type, !0);
      case 31:
        return va("Activity");
      default:
        return "";
    }
  }
  function zu(e) {
    try {
      var t = "", n = null;
      do
        t += ms(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var bi = Object.prototype.hasOwnProperty, Dl = o.unstable_scheduleCallback, dn = o.unstable_cancelCallback, Mu = o.unstable_shouldYield, Rl = o.unstable_requestPaint, tn = o.unstable_now, Ul = o.unstable_getCurrentPriorityLevel, Wn = o.unstable_ImmediatePriority, ea = o.unstable_UserBlockingPriority, $a = o.unstable_NormalPriority, Bl = o.unstable_LowPriority, xr = o.unstable_IdlePriority, Sr = o.log, ba = o.unstable_setDisableYieldValue, ta = null, Zt = null;
  function Jt(e) {
    if (typeof Sr == "function" && ba(e), Zt && typeof Zt.setStrictMode == "function")
      try {
        Zt.setStrictMode(ta, e);
      } catch {
      }
  }
  var ye = Math.clz32 ? Math.clz32 : _r, ql = Math.log, xa = Math.LN2;
  function _r(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ql(e) / xa | 0) | 0;
  }
  var he = 256, Pa = 262144, Ll = 4194304;
  function Zn(e) {
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
  function Hl(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var r = 0, u = e.suspendedLanes, p = e.pingedLanes;
    e = e.warmLanes;
    var v = a & 134217727;
    return v !== 0 ? (a = v & ~u, a !== 0 ? r = Zn(a) : (p &= v, p !== 0 ? r = Zn(p) : n || (n = v & ~e, n !== 0 && (r = Zn(n))))) : (v = a & ~u, v !== 0 ? r = Zn(v) : p !== 0 ? r = Zn(p) : n || (n = a & ~e, n !== 0 && (r = Zn(n)))), r === 0 ? 0 : t !== 0 && t !== r && (t & u) === 0 && (u = r & -r, n = t & -t, u >= n || u === 32 && (n & 4194048) !== 0) ? t : r;
  }
  function Sa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function ps(e, t) {
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
  function Du() {
    var e = Ll;
    return Ll <<= 1, (Ll & 62914560) === 0 && (Ll = 4194304), e;
  }
  function na(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Mn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function xi(e, t, n, a, r, u) {
    var p = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var v = e.entanglements, j = e.expirationTimes, G = e.hiddenUpdates;
    for (n = p & ~n; 0 < n; ) {
      var F = 31 - ye(n), W = 1 << F;
      v[F] = 0, j[F] = -1;
      var X = G[F];
      if (X !== null)
        for (G[F] = null, F = 0; F < X.length; F++) {
          var Z = X[F];
          Z !== null && (Z.lane &= -536870913);
        }
      n &= ~W;
    }
    a !== 0 && Kl(e, a, 0), u !== 0 && r === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(p & ~t));
  }
  function Kl(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - ye(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 261930;
  }
  function dt(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - ye(n), r = 1 << a;
      r & t | e[a] & t && (e[a] |= t), n &= ~r;
    }
  }
  function Et(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Si(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function Si(e) {
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
  function Ia(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Yl() {
    var e = te.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Bm(e.type));
  }
  function Gl(e, t) {
    var n = te.p;
    try {
      return te.p = e, t();
    } finally {
      te.p = n;
    }
  }
  var aa = Math.random().toString(36).slice(2), mt = "__reactFiber$" + aa, Ct = "__reactProps$" + aa, on = "__reactContainer$" + aa, Wa = "__reactEvents$" + aa, ys = "__reactListeners$" + aa, la = "__reactHandles$" + aa, _i = "__reactResources$" + aa, wn = "__reactMarker$" + aa;
  function jr(e) {
    delete e[mt], delete e[Ct], delete e[Wa], delete e[ys], delete e[la];
  }
  function ra(e) {
    var t = e[mt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[on] || n[mt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Sm(e); e !== null; ) {
            if (n = e[mt]) return n;
            e = Sm(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function ut(e) {
    if (e = e[mt] || e[on]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function En(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(h(33));
  }
  function nn(e) {
    var t = e[_i];
    return t || (t = e[_i] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Nt(e) {
    e[wn] = !0;
  }
  var _a = /* @__PURE__ */ new Set(), Ql = {};
  function Jn(e, t) {
    ia(e, t), ia(e + "Capture", t);
  }
  function ia(e, t) {
    for (Ql[e] = t, e = 0; e < t.length; e++)
      _a.add(t[e]);
  }
  var ja = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ji = {}, Vl = {};
  function Ru(e) {
    return bi.call(Vl, e) ? !0 : bi.call(ji, e) ? !1 : ja.test(e) ? Vl[e] = !0 : (ji[e] = !0, !1);
  }
  function Qe(e, t, n) {
    if (Ru(t))
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
  function Xl(e, t, n) {
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
  function Dn(e, t, n, a) {
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
  function Ft(e) {
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
  function el(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Uu(e, t, n) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var r = a.get, u = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(p) {
          n = "" + p, u.call(this, p);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(p) {
          n = "" + p;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function wr(e) {
    if (!e._valueTracker) {
      var t = el(e) ? "checked" : "value";
      e._valueTracker = Uu(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function wi(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), a = "";
    return e && (a = el(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), !0) : !1;
  }
  function at(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Zl = /[\n"\\]/g;
  function Lt(e) {
    return e.replace(
      Zl,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ua(e, t, n, a, r, u, p, v) {
    e.name = "", p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.type = p : e.removeAttribute("type"), t != null ? p === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ft(t)) : e.value !== "" + Ft(t) && (e.value = "" + Ft(t)) : p !== "submit" && p !== "reset" || e.removeAttribute("value"), t != null ? Jl(e, p, Ft(t)) : n != null ? Jl(e, p, Ft(n)) : a != null && e.removeAttribute("value"), r == null && u != null && (e.defaultChecked = !!u), r != null && (e.checked = r && typeof r != "function" && typeof r != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.name = "" + Ft(v) : e.removeAttribute("name");
  }
  function Er(e, t, n, a, r, u, p, v) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        wr(e);
        return;
      }
      n = n != null ? "" + Ft(n) : "", t = t != null ? "" + Ft(t) : n, v || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? r, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = v ? e.checked : !!a, e.defaultChecked = !!a, p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.name = p), wr(e);
  }
  function Jl(e, t, n) {
    t === "number" && at(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Fn(e, t, n, a) {
    if (e = e.options, t) {
      t = {};
      for (var r = 0; r < n.length; r++)
        t["$" + n[r]] = !0;
      for (n = 0; n < e.length; n++)
        r = t.hasOwnProperty("$" + e[n].value), e[n].selected !== r && (e[n].selected = r), r && a && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Ft(n), t = null, r = 0; r < e.length; r++) {
        if (e[r].value === n) {
          e[r].selected = !0, a && (e[r].defaultSelected = !0);
          return;
        }
        t !== null || e[r].disabled || (t = e[r]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ei(e, t, n) {
    if (t != null && (t = "" + Ft(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Ft(n) : "";
  }
  function Fl(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(h(92));
        if (ve(a)) {
          if (1 < a.length) throw Error(h(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = Ft(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a), wr(e);
  }
  function wa(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var gs = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Pe(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || gs.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Ci(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(h(62));
    if (e = e.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var r in t)
        a = t[r], t.hasOwnProperty(r) && n[r] !== a && Pe(e, r, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Pe(e, u, t[u]);
  }
  function Ni(e) {
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
  var vs = /* @__PURE__ */ new Map([
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
  ]), sn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $n(e) {
    return sn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function hn() {
  }
  var Rn = null;
  function Cr(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ea = null, yt = null;
  function Cn(e) {
    var t = ut(e);
    if (t && (e = t.stateNode)) {
      var n = e[Ct] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ua(
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
              'input[name="' + Lt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var r = a[Ct] || null;
                if (!r) throw Error(h(90));
                ua(
                  a,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              a = n[t], a.form === e.form && wi(a);
          }
          break e;
        case "textarea":
          Ei(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Fn(e, !!n.multiple, t, !1);
      }
    }
  }
  var Ca = !1;
  function tl(e, t, n) {
    if (Ca) return e(t, n);
    Ca = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Ca = !1, (Ea !== null || yt !== null) && (Co(), Ea && (t = Ea, e = yt, yt = Ea = null, Cn(t), e)))
        for (t = 0; t < e.length; t++) Cn(e[t]);
    }
  }
  function Na(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[Ct] || null;
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
        h(231, t, typeof n)
      );
    return n;
  }
  var Ht = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ti = !1;
  if (Ht)
    try {
      var an = {};
      Object.defineProperty(an, "passive", {
        get: function() {
          Ti = !0;
        }
      }), window.addEventListener("test", an, an), window.removeEventListener("test", an, an);
    } catch {
      Ti = !1;
    }
  var Un = null, Nr = null, nl = null;
  function al() {
    if (nl) return nl;
    var e, t = Nr, n = t.length, a, r = "value" in Un ? Un.value : Un.textContent, u = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++) ;
    var p = n - e;
    for (a = 1; a <= p && t[n - a] === r[u - a]; a++) ;
    return nl = r.slice(e, 1 < a ? 1 - a : void 0);
  }
  function ll(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function $l() {
    return !0;
  }
  function Bu() {
    return !1;
  }
  function Ot(e) {
    function t(n, a, r, u, p) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = u, this.target = p, this.currentTarget = null;
      for (var v in e)
        e.hasOwnProperty(v) && (n = e[v], this[v] = n ? n(u) : u[v]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? $l : Bu, this.isPropagationStopped = Bu, this;
    }
    return Q(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = $l);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = $l);
      },
      persist: function() {
      },
      isPersistent: $l
    }), t;
  }
  var Ta = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Tr = Ot(Ta), oa = Q({}, Ta, { view: 0, detail: 0 }), Ar = Ot(oa), Pl, Ai, Il, kr = Q({}, oa, {
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
    getModifierState: Aa,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Il && (Il && e.type === "mousemove" ? (Pl = e.screenX - Il.screenX, Ai = e.screenY - Il.screenY) : Ai = Pl = 0, Il = e), Pl);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ai;
    }
  }), Or = Ot(kr), ki = Q({}, kr, { dataTransfer: 0 }), qu = Ot(ki), zr = Q({}, oa, { relatedTarget: 0 }), rl = Ot(zr), Mr = Q({}, Ta, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lu = Ot(Mr), bs = Q({}, Ta, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), il = Ot(bs), Oi = Q({}, Ta, { data: 0 }), Dr = Ot(Oi), zi = {
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
  }, Mi = {
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
  }, Kt = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Wl(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Kt[e]) ? !!t[e] : !1;
  }
  function Aa() {
    return Wl;
  }
  var Hu = Q({}, oa, {
    key: function(e) {
      if (e.key) {
        var t = zi[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ll(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Mi[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Aa,
    charCode: function(e) {
      return e.type === "keypress" ? ll(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ll(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Rr = Ot(Hu), Ku = Q({}, kr, {
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
  }), Di = Ot(Ku), Ur = Q({}, oa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Aa
  }), Ri = Ot(Ur), ka = Q({}, Ta, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ui = Ot(ka), Bi = Q({}, kr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Br = Ot(Bi), qi = Q({}, Ta, {
    newState: 0,
    oldState: 0
  }), Yu = Ot(qi), xs = [9, 13, 27, 32], er = Ht && "CompositionEvent" in window, sa = null;
  Ht && "documentMode" in document && (sa = document.documentMode);
  var Ss = Ht && "TextEvent" in window && !sa, qr = Ht && (!er || sa && 8 < sa && 11 >= sa), Lr = " ", Gu = !1;
  function Li(e, t) {
    switch (e) {
      case "keyup":
        return xs.indexOf(t.keyCode) !== -1;
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
  function Qu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Oa = !1;
  function Vu(e, t) {
    switch (e) {
      case "compositionend":
        return Qu(t);
      case "keypress":
        return t.which !== 32 ? null : (Gu = !0, Lr);
      case "textInput":
        return e = t.data, e === Lr && Gu ? null : e;
      default:
        return null;
    }
  }
  function _s(e, t) {
    if (Oa)
      return e === "compositionend" || !er && Li(e, t) ? (e = al(), nl = Nr = Un = null, Oa = !1, e) : null;
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
        return qr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Xu = {
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
  function Hr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Xu[e.type] : t === "textarea";
  }
  function Hi(e, t, n, a) {
    Ea ? yt ? yt.push(a) : yt = [a] : Ea = a, t = Mo(t, "onChange"), 0 < t.length && (n = new Tr(
      "onChange",
      "change",
      null,
      n,
      a
    ), e.push({ event: n, listeners: t }));
  }
  var ul = null, tr = null;
  function js(e) {
    um(e, 0);
  }
  function Kr(e) {
    var t = En(e);
    if (wi(t)) return e;
  }
  function nr(e, t) {
    if (e === "change") return t;
  }
  var Bn = !1;
  if (Ht) {
    var gt;
    if (Ht) {
      var ol = "oninput" in document;
      if (!ol) {
        var cn = document.createElement("div");
        cn.setAttribute("oninput", "return;"), ol = typeof cn.oninput == "function";
      }
      gt = ol;
    } else gt = !1;
    Bn = gt && (!document.documentMode || 9 < document.documentMode);
  }
  function Zu() {
    ul && (ul.detachEvent("onpropertychange", Yr), tr = ul = null);
  }
  function Yr(e) {
    if (e.propertyName === "value" && Kr(tr)) {
      var t = [];
      Hi(
        t,
        tr,
        e,
        Cr(e)
      ), tl(js, t);
    }
  }
  function Ju(e, t, n) {
    e === "focusin" ? (Zu(), ul = t, tr = n, ul.attachEvent("onpropertychange", Yr)) : e === "focusout" && Zu();
  }
  function za(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Kr(tr);
  }
  function Ki(e, t) {
    if (e === "click") return Kr(t);
  }
  function sl(e, t) {
    if (e === "input" || e === "change")
      return Kr(t);
  }
  function ca(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ln = typeof Object.is == "function" ? Object.is : ca;
  function l(e, t) {
    if (ln(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var r = n[a];
      if (!bi.call(t, r) || !ln(e[r], t[r]))
        return !1;
    }
    return !0;
  }
  function i(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function f(e, t) {
    var n = i(e);
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
      n = i(n);
    }
  }
  function m(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? m(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function y(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = at(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = at(e.document);
    }
    return t;
  }
  function g(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var b = Ht && "documentMode" in document && 11 >= document.documentMode, _ = null, E = null, C = null, B = !1;
  function w(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    B || _ == null || _ !== at(a) || (a = _, "selectionStart" in a && g(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), C && l(C, a) || (C = a, a = Mo(E, "onSelect"), 0 < a.length && (t = new Tr(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: a }), t.target = _)));
  }
  function L(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var N = {
    animationend: L("Animation", "AnimationEnd"),
    animationiteration: L("Animation", "AnimationIteration"),
    animationstart: L("Animation", "AnimationStart"),
    transitionrun: L("Transition", "TransitionRun"),
    transitionstart: L("Transition", "TransitionStart"),
    transitioncancel: L("Transition", "TransitionCancel"),
    transitionend: L("Transition", "TransitionEnd")
  }, O = {}, z = {};
  Ht && (z = document.createElement("div").style, "AnimationEvent" in window || (delete N.animationend.animation, delete N.animationiteration.animation, delete N.animationstart.animation), "TransitionEvent" in window || delete N.transitionend.transition);
  function q(e) {
    if (O[e]) return O[e];
    if (!N[e]) return e;
    var t = N[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in z)
        return O[e] = t[n];
    return e;
  }
  var K = q("animationend"), V = q("animationiteration"), J = q("animationstart"), I = q("transitionrun"), ie = q("transitionstart"), ce = q("transitioncancel"), ne = q("transitionend"), ue = /* @__PURE__ */ new Map(), se = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  se.push("scrollEnd");
  function ae(e, t) {
    ue.set(e, t), Jn(t, [e]);
  }
  var ge = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ee = [], Re = 0, He = 0;
  function Yt() {
    for (var e = Re, t = He = Re = 0; t < e; ) {
      var n = Ee[t];
      Ee[t++] = null;
      var a = Ee[t];
      Ee[t++] = null;
      var r = Ee[t];
      Ee[t++] = null;
      var u = Ee[t];
      if (Ee[t++] = null, a !== null && r !== null) {
        var p = a.pending;
        p === null ? r.next = r : (r.next = p.next, p.next = r), a.pending = r;
      }
      u !== 0 && ar(n, r, u);
    }
  }
  function ze(e, t, n, a) {
    Ee[Re++] = e, Ee[Re++] = t, Ee[Re++] = n, Ee[Re++] = a, He |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function zt(e, t, n, a) {
    return ze(e, t, n, a), Mt(e);
  }
  function xt(e, t) {
    return ze(e, null, null, t), Mt(e);
  }
  function ar(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var r = !1, u = e.return; u !== null; )
      u.childLanes |= n, a = u.alternate, a !== null && (a.childLanes |= n), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (r = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, r && t !== null && (r = 31 - ye(n), e = u.hiddenUpdates, a = e[r], a === null ? e[r] = [t] : a.push(t), t.lane = n | 536870912), u) : null;
  }
  function Mt(e) {
    if (50 < cu)
      throw cu = 0, zc = null, Error(h(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var mn = {};
  function Yi(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Nn(e, t, n, a) {
    return new Yi(e, t, n, a);
  }
  function ws(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ma(e, t) {
    var n = e.alternate;
    return n === null ? (n = Nn(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Gf(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Fu(e, t, n, a, r, u) {
    var p = 0;
    if (a = e, typeof e == "function") ws(e) && (p = 1);
    else if (typeof e == "string")
      p = o1(
        e,
        n,
        be.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case kt:
          return e = Nn(31, n, t, r), e.elementType = kt, e.lanes = u, e;
        case oe:
          return lr(n.children, r, u, t);
        case ke:
          p = 8, r |= 24;
          break;
        case pe:
          return e = Nn(12, n, t, r | 2), e.elementType = pe, e.lanes = u, e;
        case Ue:
          return e = Nn(13, n, t, r), e.elementType = Ue, e.lanes = u, e;
        case Be:
          return e = Nn(19, n, t, r), e.elementType = Be, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case fe:
                p = 10;
                break e;
              case Me:
                p = 9;
                break e;
              case Oe:
                p = 11;
                break e;
              case Se:
                p = 14;
                break e;
              case ft:
                p = 16, a = null;
                break e;
            }
          p = 29, n = Error(
            h(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = Nn(p, n, t, r), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function lr(e, t, n, a) {
    return e = Nn(7, e, a, t), e.lanes = n, e;
  }
  function Es(e, t, n) {
    return e = Nn(6, e, null, t), e.lanes = n, e;
  }
  function Qf(e) {
    var t = Nn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Cs(e, t, n) {
    return t = Nn(
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
  var Vf = /* @__PURE__ */ new WeakMap();
  function qn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Vf.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: zu(t)
      }, Vf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: zu(t)
    };
  }
  var Gr = [], Qr = 0, $u = null, Gi = 0, Ln = [], Hn = 0, cl = null, fa = 1, da = "";
  function Da(e, t) {
    Gr[Qr++] = Gi, Gr[Qr++] = $u, $u = e, Gi = t;
  }
  function Xf(e, t, n) {
    Ln[Hn++] = fa, Ln[Hn++] = da, Ln[Hn++] = cl, cl = e;
    var a = fa;
    e = da;
    var r = 32 - ye(a) - 1;
    a &= ~(1 << r), n += 1;
    var u = 32 - ye(t) + r;
    if (30 < u) {
      var p = r - r % 5;
      u = (a & (1 << p) - 1).toString(32), a >>= p, r -= p, fa = 1 << 32 - ye(t) + r | n << r | a, da = u + e;
    } else
      fa = 1 << u | n << r | a, da = e;
  }
  function Ns(e) {
    e.return !== null && (Da(e, 1), Xf(e, 1, 0));
  }
  function Ts(e) {
    for (; e === $u; )
      $u = Gr[--Qr], Gr[Qr] = null, Gi = Gr[--Qr], Gr[Qr] = null;
    for (; e === cl; )
      cl = Ln[--Hn], Ln[Hn] = null, da = Ln[--Hn], Ln[Hn] = null, fa = Ln[--Hn], Ln[Hn] = null;
  }
  function Zf(e, t) {
    Ln[Hn++] = fa, Ln[Hn++] = da, Ln[Hn++] = cl, fa = t.id, da = t.overflow, cl = e;
  }
  var $t = null, vt = null, Ie = !1, fl = null, Kn = !1, As = Error(h(519));
  function dl(e) {
    var t = Error(
      h(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Qi(qn(t, e)), As;
  }
  function Jf(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[mt] = e, t[Ct] = a, n) {
      case "dialog":
        Ze("cancel", t), Ze("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ze("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < du.length; n++)
          Ze(du[n], t);
        break;
      case "source":
        Ze("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ze("error", t), Ze("load", t);
        break;
      case "details":
        Ze("toggle", t);
        break;
      case "input":
        Ze("invalid", t), Er(
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
        Ze("invalid", t);
        break;
      case "textarea":
        Ze("invalid", t), Fl(t, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === !0 || fm(t.textContent, n) ? (a.popover != null && (Ze("beforetoggle", t), Ze("toggle", t)), a.onScroll != null && Ze("scroll", t), a.onScrollEnd != null && Ze("scrollend", t), a.onClick != null && (t.onclick = hn), t = !0) : t = !1, t || dl(e, !0);
  }
  function Ff(e) {
    for ($t = e.return; $t; )
      switch ($t.tag) {
        case 5:
        case 31:
        case 13:
          Kn = !1;
          return;
        case 27:
        case 3:
          Kn = !0;
          return;
        default:
          $t = $t.return;
      }
  }
  function Vr(e) {
    if (e !== $t) return !1;
    if (!Ie) return Ff(e), Ie = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Zc(e.type, e.memoizedProps)), n = !n), n && vt && dl(e), Ff(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(h(317));
      vt = xm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(h(317));
      vt = xm(e);
    } else
      t === 27 ? (t = vt, Cl(e.type) ? (e = Ic, Ic = null, vt = e) : vt = t) : vt = $t ? Gn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function rr() {
    vt = $t = null, Ie = !1;
  }
  function ks() {
    var e = fl;
    return e !== null && (vn === null ? vn = e : vn.push.apply(
      vn,
      e
    ), fl = null), e;
  }
  function Qi(e) {
    fl === null ? fl = [e] : fl.push(e);
  }
  var Os = A(null), ir = null, Ra = null;
  function hl(e, t, n) {
    de(Os, t._currentValue), t._currentValue = n;
  }
  function Ua(e) {
    e._currentValue = Os.current, ee(Os);
  }
  function zs(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Ms(e, t, n, a) {
    var r = e.child;
    for (r !== null && (r.return = e); r !== null; ) {
      var u = r.dependencies;
      if (u !== null) {
        var p = r.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var v = u;
          u = r;
          for (var j = 0; j < t.length; j++)
            if (v.context === t[j]) {
              u.lanes |= n, v = u.alternate, v !== null && (v.lanes |= n), zs(
                u.return,
                n,
                e
              ), a || (p = null);
              break e;
            }
          u = v.next;
        }
      } else if (r.tag === 18) {
        if (p = r.return, p === null) throw Error(h(341));
        p.lanes |= n, u = p.alternate, u !== null && (u.lanes |= n), zs(p, n, e), p = null;
      } else p = r.child;
      if (p !== null) p.return = r;
      else
        for (p = r; p !== null; ) {
          if (p === e) {
            p = null;
            break;
          }
          if (r = p.sibling, r !== null) {
            r.return = p.return, p = r;
            break;
          }
          p = p.return;
        }
      r = p;
    }
  }
  function Xr(e, t, n, a) {
    e = null;
    for (var r = t, u = !1; r !== null; ) {
      if (!u) {
        if ((r.flags & 524288) !== 0) u = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var p = r.alternate;
        if (p === null) throw Error(h(387));
        if (p = p.memoizedProps, p !== null) {
          var v = r.type;
          ln(r.pendingProps.value, p.value) || (e !== null ? e.push(v) : e = [v]);
        }
      } else if (r === We.current) {
        if (p = r.alternate, p === null) throw Error(h(387));
        p.memoizedState.memoizedState !== r.memoizedState.memoizedState && (e !== null ? e.push(gu) : e = [gu]);
      }
      r = r.return;
    }
    e !== null && Ms(
      t,
      e,
      n,
      a
    ), t.flags |= 262144;
  }
  function Pu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ln(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ur(e) {
    ir = e, Ra = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Pt(e) {
    return $f(ir, e);
  }
  function Iu(e, t) {
    return ir === null && ur(e), $f(e, t);
  }
  function $f(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Ra === null) {
      if (e === null) throw Error(h(308));
      Ra = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ra = Ra.next = t;
    return n;
  }
  var lp = typeof AbortController < "u" ? AbortController : function() {
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
  }, rp = o.unstable_scheduleCallback, ip = o.unstable_NormalPriority, Dt = {
    $$typeof: fe,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ds() {
    return {
      controller: new lp(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Vi(e) {
    e.refCount--, e.refCount === 0 && rp(ip, function() {
      e.controller.abort();
    });
  }
  var Xi = null, Rs = 0, Zr = 0, Jr = null;
  function up(e, t) {
    if (Xi === null) {
      var n = Xi = [];
      Rs = 0, Zr = qc(), Jr = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return Rs++, t.then(Pf, Pf), t;
  }
  function Pf() {
    if (--Rs === 0 && Xi !== null) {
      Jr !== null && (Jr.status = "fulfilled");
      var e = Xi;
      Xi = null, Zr = 0, Jr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function op(e, t) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        n.push(r);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var r = 0; r < n.length; r++) (0, n[r])(t);
      },
      function(r) {
        for (a.status = "rejected", a.reason = r, r = 0; r < n.length; r++)
          (0, n[r])(void 0);
      }
    ), a;
  }
  var If = U.S;
  U.S = function(e, t) {
    Rh = tn(), typeof t == "object" && t !== null && typeof t.then == "function" && up(e, t), If !== null && If(e, t);
  };
  var or = A(null);
  function Us() {
    var e = or.current;
    return e !== null ? e : ht.pooledCache;
  }
  function Wu(e, t) {
    t === null ? de(or, or.current) : de(or, t.pool);
  }
  function Wf() {
    var e = Us();
    return e === null ? null : { parent: Dt._currentValue, pool: e };
  }
  var Fr = Error(h(460)), Bs = Error(h(474)), eo = Error(h(542)), to = { then: function() {
  } };
  function ed(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function td(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(hn, hn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, ad(e), e;
      default:
        if (typeof t.status == "string") t.then(hn, hn);
        else {
          if (e = ht, e !== null && 100 < e.shellSuspendCounter)
            throw Error(h(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var r = t;
                r.status = "fulfilled", r.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var r = t;
                r.status = "rejected", r.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, ad(e), e;
        }
        throw cr = t, Fr;
    }
  }
  function sr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (cr = n, Fr) : n;
    }
  }
  var cr = null;
  function nd() {
    if (cr === null) throw Error(h(459));
    var e = cr;
    return cr = null, e;
  }
  function ad(e) {
    if (e === Fr || e === eo)
      throw Error(h(483));
  }
  var $r = null, Zi = 0;
  function no(e) {
    var t = Zi;
    return Zi += 1, $r === null && ($r = []), td($r, e, t);
  }
  function Ji(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ao(e, t) {
    throw t.$$typeof === re ? Error(h(525)) : (e = Object.prototype.toString.call(t), Error(
      h(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ld(e) {
    function t(H, T) {
      if (e) {
        var Y = H.deletions;
        Y === null ? (H.deletions = [T], H.flags |= 16) : Y.push(T);
      }
    }
    function n(H, T) {
      if (!e) return null;
      for (; T !== null; )
        t(H, T), T = T.sibling;
      return null;
    }
    function a(H) {
      for (var T = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? T.set(H.key, H) : T.set(H.index, H), H = H.sibling;
      return T;
    }
    function r(H, T) {
      return H = Ma(H, T), H.index = 0, H.sibling = null, H;
    }
    function u(H, T, Y) {
      return H.index = Y, e ? (Y = H.alternate, Y !== null ? (Y = Y.index, Y < T ? (H.flags |= 67108866, T) : Y) : (H.flags |= 67108866, T)) : (H.flags |= 1048576, T);
    }
    function p(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function v(H, T, Y, P) {
      return T === null || T.tag !== 6 ? (T = Es(Y, H.mode, P), T.return = H, T) : (T = r(T, Y), T.return = H, T);
    }
    function j(H, T, Y, P) {
      var Ce = Y.type;
      return Ce === oe ? F(
        H,
        T,
        Y.props.children,
        P,
        Y.key
      ) : T !== null && (T.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === ft && sr(Ce) === T.type) ? (T = r(T, Y.props), Ji(T, Y), T.return = H, T) : (T = Fu(
        Y.type,
        Y.key,
        Y.props,
        null,
        H.mode,
        P
      ), Ji(T, Y), T.return = H, T);
    }
    function G(H, T, Y, P) {
      return T === null || T.tag !== 4 || T.stateNode.containerInfo !== Y.containerInfo || T.stateNode.implementation !== Y.implementation ? (T = Cs(Y, H.mode, P), T.return = H, T) : (T = r(T, Y.children || []), T.return = H, T);
    }
    function F(H, T, Y, P, Ce) {
      return T === null || T.tag !== 7 ? (T = lr(
        Y,
        H.mode,
        P,
        Ce
      ), T.return = H, T) : (T = r(T, Y), T.return = H, T);
    }
    function W(H, T, Y) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return T = Es(
          "" + T,
          H.mode,
          Y
        ), T.return = H, T;
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case we:
            return Y = Fu(
              T.type,
              T.key,
              T.props,
              null,
              H.mode,
              Y
            ), Ji(Y, T), Y.return = H, Y;
          case Ae:
            return T = Cs(
              T,
              H.mode,
              Y
            ), T.return = H, T;
          case ft:
            return T = sr(T), W(H, T, Y);
        }
        if (ve(T) || Ge(T))
          return T = lr(
            T,
            H.mode,
            Y,
            null
          ), T.return = H, T;
        if (typeof T.then == "function")
          return W(H, no(T), Y);
        if (T.$$typeof === fe)
          return W(
            H,
            Iu(H, T),
            Y
          );
        ao(H, T);
      }
      return null;
    }
    function X(H, T, Y, P) {
      var Ce = T !== null ? T.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ce !== null ? null : v(H, T, "" + Y, P);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case we:
            return Y.key === Ce ? j(H, T, Y, P) : null;
          case Ae:
            return Y.key === Ce ? G(H, T, Y, P) : null;
          case ft:
            return Y = sr(Y), X(H, T, Y, P);
        }
        if (ve(Y) || Ge(Y))
          return Ce !== null ? null : F(H, T, Y, P, null);
        if (typeof Y.then == "function")
          return X(
            H,
            T,
            no(Y),
            P
          );
        if (Y.$$typeof === fe)
          return X(
            H,
            T,
            Iu(H, Y),
            P
          );
        ao(H, Y);
      }
      return null;
    }
    function Z(H, T, Y, P, Ce) {
      if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint")
        return H = H.get(Y) || null, v(T, H, "" + P, Ce);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case we:
            return H = H.get(
              P.key === null ? Y : P.key
            ) || null, j(T, H, P, Ce);
          case Ae:
            return H = H.get(
              P.key === null ? Y : P.key
            ) || null, G(T, H, P, Ce);
          case ft:
            return P = sr(P), Z(
              H,
              T,
              Y,
              P,
              Ce
            );
        }
        if (ve(P) || Ge(P))
          return H = H.get(Y) || null, F(T, H, P, Ce, null);
        if (typeof P.then == "function")
          return Z(
            H,
            T,
            Y,
            no(P),
            Ce
          );
        if (P.$$typeof === fe)
          return Z(
            H,
            T,
            Y,
            Iu(T, P),
            Ce
          );
        ao(T, P);
      }
      return null;
    }
    function xe(H, T, Y, P) {
      for (var Ce = null, tt = null, _e = T, Ye = T = 0, Fe = null; _e !== null && Ye < Y.length; Ye++) {
        _e.index > Ye ? (Fe = _e, _e = null) : Fe = _e.sibling;
        var nt = X(
          H,
          _e,
          Y[Ye],
          P
        );
        if (nt === null) {
          _e === null && (_e = Fe);
          break;
        }
        e && _e && nt.alternate === null && t(H, _e), T = u(nt, T, Ye), tt === null ? Ce = nt : tt.sibling = nt, tt = nt, _e = Fe;
      }
      if (Ye === Y.length)
        return n(H, _e), Ie && Da(H, Ye), Ce;
      if (_e === null) {
        for (; Ye < Y.length; Ye++)
          _e = W(H, Y[Ye], P), _e !== null && (T = u(
            _e,
            T,
            Ye
          ), tt === null ? Ce = _e : tt.sibling = _e, tt = _e);
        return Ie && Da(H, Ye), Ce;
      }
      for (_e = a(_e); Ye < Y.length; Ye++)
        Fe = Z(
          _e,
          H,
          Ye,
          Y[Ye],
          P
        ), Fe !== null && (e && Fe.alternate !== null && _e.delete(
          Fe.key === null ? Ye : Fe.key
        ), T = u(
          Fe,
          T,
          Ye
        ), tt === null ? Ce = Fe : tt.sibling = Fe, tt = Fe);
      return e && _e.forEach(function(Ol) {
        return t(H, Ol);
      }), Ie && Da(H, Ye), Ce;
    }
    function Te(H, T, Y, P) {
      if (Y == null) throw Error(h(151));
      for (var Ce = null, tt = null, _e = T, Ye = T = 0, Fe = null, nt = Y.next(); _e !== null && !nt.done; Ye++, nt = Y.next()) {
        _e.index > Ye ? (Fe = _e, _e = null) : Fe = _e.sibling;
        var Ol = X(H, _e, nt.value, P);
        if (Ol === null) {
          _e === null && (_e = Fe);
          break;
        }
        e && _e && Ol.alternate === null && t(H, _e), T = u(Ol, T, Ye), tt === null ? Ce = Ol : tt.sibling = Ol, tt = Ol, _e = Fe;
      }
      if (nt.done)
        return n(H, _e), Ie && Da(H, Ye), Ce;
      if (_e === null) {
        for (; !nt.done; Ye++, nt = Y.next())
          nt = W(H, nt.value, P), nt !== null && (T = u(nt, T, Ye), tt === null ? Ce = nt : tt.sibling = nt, tt = nt);
        return Ie && Da(H, Ye), Ce;
      }
      for (_e = a(_e); !nt.done; Ye++, nt = Y.next())
        nt = Z(_e, H, Ye, nt.value, P), nt !== null && (e && nt.alternate !== null && _e.delete(nt.key === null ? Ye : nt.key), T = u(nt, T, Ye), tt === null ? Ce = nt : tt.sibling = nt, tt = nt);
      return e && _e.forEach(function(b1) {
        return t(H, b1);
      }), Ie && Da(H, Ye), Ce;
    }
    function ct(H, T, Y, P) {
      if (typeof Y == "object" && Y !== null && Y.type === oe && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case we:
            e: {
              for (var Ce = Y.key; T !== null; ) {
                if (T.key === Ce) {
                  if (Ce = Y.type, Ce === oe) {
                    if (T.tag === 7) {
                      n(
                        H,
                        T.sibling
                      ), P = r(
                        T,
                        Y.props.children
                      ), P.return = H, H = P;
                      break e;
                    }
                  } else if (T.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === ft && sr(Ce) === T.type) {
                    n(
                      H,
                      T.sibling
                    ), P = r(T, Y.props), Ji(P, Y), P.return = H, H = P;
                    break e;
                  }
                  n(H, T);
                  break;
                } else t(H, T);
                T = T.sibling;
              }
              Y.type === oe ? (P = lr(
                Y.props.children,
                H.mode,
                P,
                Y.key
              ), P.return = H, H = P) : (P = Fu(
                Y.type,
                Y.key,
                Y.props,
                null,
                H.mode,
                P
              ), Ji(P, Y), P.return = H, H = P);
            }
            return p(H);
          case Ae:
            e: {
              for (Ce = Y.key; T !== null; ) {
                if (T.key === Ce)
                  if (T.tag === 4 && T.stateNode.containerInfo === Y.containerInfo && T.stateNode.implementation === Y.implementation) {
                    n(
                      H,
                      T.sibling
                    ), P = r(T, Y.children || []), P.return = H, H = P;
                    break e;
                  } else {
                    n(H, T);
                    break;
                  }
                else t(H, T);
                T = T.sibling;
              }
              P = Cs(Y, H.mode, P), P.return = H, H = P;
            }
            return p(H);
          case ft:
            return Y = sr(Y), ct(
              H,
              T,
              Y,
              P
            );
        }
        if (ve(Y))
          return xe(
            H,
            T,
            Y,
            P
          );
        if (Ge(Y)) {
          if (Ce = Ge(Y), typeof Ce != "function") throw Error(h(150));
          return Y = Ce.call(Y), Te(
            H,
            T,
            Y,
            P
          );
        }
        if (typeof Y.then == "function")
          return ct(
            H,
            T,
            no(Y),
            P
          );
        if (Y.$$typeof === fe)
          return ct(
            H,
            T,
            Iu(H, Y),
            P
          );
        ao(H, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, T !== null && T.tag === 6 ? (n(H, T.sibling), P = r(T, Y), P.return = H, H = P) : (n(H, T), P = Es(Y, H.mode, P), P.return = H, H = P), p(H)) : n(H, T);
    }
    return function(H, T, Y, P) {
      try {
        Zi = 0;
        var Ce = ct(
          H,
          T,
          Y,
          P
        );
        return $r = null, Ce;
      } catch (_e) {
        if (_e === Fr || _e === eo) throw _e;
        var tt = Nn(29, _e, null, H.mode);
        return tt.lanes = P, tt.return = H, tt;
      } finally {
      }
    };
  }
  var fr = ld(!0), rd = ld(!1), ml = !1;
  function qs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ls(e, t) {
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
  function yl(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (lt & 2) !== 0) {
      var r = a.pending;
      return r === null ? t.next = t : (t.next = r.next, r.next = t), a.pending = t, t = Mt(e), ar(e, null, n), t;
    }
    return ze(e, a, t, n), Mt(e);
  }
  function Fi(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, dt(e, n);
    }
  }
  function Hs(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var r = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var p = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          u === null ? r = u = p : u = u.next = p, n = n.next;
        } while (n !== null);
        u === null ? r = u = t : u = u.next = t;
      } else r = u = t;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Ks = !1;
  function $i() {
    if (Ks) {
      var e = Jr;
      if (e !== null) throw e;
    }
  }
  function Pi(e, t, n, a) {
    Ks = !1;
    var r = e.updateQueue;
    ml = !1;
    var u = r.firstBaseUpdate, p = r.lastBaseUpdate, v = r.shared.pending;
    if (v !== null) {
      r.shared.pending = null;
      var j = v, G = j.next;
      j.next = null, p === null ? u = G : p.next = G, p = j;
      var F = e.alternate;
      F !== null && (F = F.updateQueue, v = F.lastBaseUpdate, v !== p && (v === null ? F.firstBaseUpdate = G : v.next = G, F.lastBaseUpdate = j));
    }
    if (u !== null) {
      var W = r.baseState;
      p = 0, F = G = j = null, v = u;
      do {
        var X = v.lane & -536870913, Z = X !== v.lane;
        if (Z ? (Je & X) === X : (a & X) === X) {
          X !== 0 && X === Zr && (Ks = !0), F !== null && (F = F.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, Te = v;
            X = t;
            var ct = n;
            switch (Te.tag) {
              case 1:
                if (xe = Te.payload, typeof xe == "function") {
                  W = xe.call(ct, W, X);
                  break e;
                }
                W = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = Te.payload, X = typeof xe == "function" ? xe.call(ct, W, X) : xe, X == null) break e;
                W = Q({}, W, X);
                break e;
              case 2:
                ml = !0;
            }
          }
          X = v.callback, X !== null && (e.flags |= 64, Z && (e.flags |= 8192), Z = r.callbacks, Z === null ? r.callbacks = [X] : Z.push(X));
        } else
          Z = {
            lane: X,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, F === null ? (G = F = Z, j = W) : F = F.next = Z, p |= X;
        if (v = v.next, v === null) {
          if (v = r.shared.pending, v === null)
            break;
          Z = v, v = Z.next, Z.next = null, r.lastBaseUpdate = Z, r.shared.pending = null;
        }
      } while (!0);
      F === null && (j = W), r.baseState = j, r.firstBaseUpdate = G, r.lastBaseUpdate = F, u === null && (r.shared.lanes = 0), Sl |= p, e.lanes = p, e.memoizedState = W;
    }
  }
  function id(e, t) {
    if (typeof e != "function")
      throw Error(h(191, e));
    e.call(t);
  }
  function ud(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        id(n[e], t);
  }
  var Pr = A(null), lo = A(0);
  function od(e, t) {
    e = Va, de(lo, e), de(Pr, t), Va = e | t.baseLanes;
  }
  function Ys() {
    de(lo, Va), de(Pr, Pr.current);
  }
  function Gs() {
    Va = lo.current, ee(Pr), ee(lo);
  }
  var Tn = A(null), Yn = null;
  function gl(e) {
    var t = e.alternate;
    de(Tt, Tt.current & 1), de(Tn, e), Yn === null && (t === null || Pr.current !== null || t.memoizedState !== null) && (Yn = e);
  }
  function Qs(e) {
    de(Tt, Tt.current), de(Tn, e), Yn === null && (Yn = e);
  }
  function sd(e) {
    e.tag === 22 ? (de(Tt, Tt.current), de(Tn, e), Yn === null && (Yn = e)) : vl();
  }
  function vl() {
    de(Tt, Tt.current), de(Tn, Tn.current);
  }
  function An(e) {
    ee(Tn), Yn === e && (Yn = null), ee(Tt);
  }
  var Tt = A(0);
  function ro(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || $c(n) || Pc(n)))
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
  var Ba = 0, Ke = null, ot = null, Rt = null, io = !1, Ir = !1, dr = !1, uo = 0, Ii = 0, Wr = null, sp = 0;
  function _t() {
    throw Error(h(321));
  }
  function Vs(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ln(e[n], t[n])) return !1;
    return !0;
  }
  function Xs(e, t, n, a, r, u) {
    return Ba = u, Ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? Xd : uc, dr = !1, u = n(a, r), dr = !1, Ir && (u = fd(
      t,
      n,
      a,
      r
    )), cd(e), u;
  }
  function cd(e) {
    U.H = tu;
    var t = ot !== null && ot.next !== null;
    if (Ba = 0, Rt = ot = Ke = null, io = !1, Ii = 0, Wr = null, t) throw Error(h(300));
    e === null || Ut || (e = e.dependencies, e !== null && Pu(e) && (Ut = !0));
  }
  function fd(e, t, n, a) {
    Ke = e;
    var r = 0;
    do {
      if (Ir && (Wr = null), Ii = 0, Ir = !1, 25 <= r) throw Error(h(301));
      if (r += 1, Rt = ot = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      U.H = Zd, u = t(n, a);
    } while (Ir);
    return u;
  }
  function cp() {
    var e = U.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Wi(t) : t, e = e.useState()[0], (ot !== null ? ot.memoizedState : null) !== e && (Ke.flags |= 1024), t;
  }
  function Zs() {
    var e = uo !== 0;
    return uo = 0, e;
  }
  function Js(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Fs(e) {
    if (io) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      io = !1;
    }
    Ba = 0, Rt = ot = Ke = null, Ir = !1, Ii = uo = 0, Wr = null;
  }
  function fn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Rt === null ? Ke.memoizedState = Rt = e : Rt = Rt.next = e, Rt;
  }
  function At() {
    if (ot === null) {
      var e = Ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ot.next;
    var t = Rt === null ? Ke.memoizedState : Rt.next;
    if (t !== null)
      Rt = t, ot = e;
    else {
      if (e === null)
        throw Ke.alternate === null ? Error(h(467)) : Error(h(310));
      ot = e, e = {
        memoizedState: ot.memoizedState,
        baseState: ot.baseState,
        baseQueue: ot.baseQueue,
        queue: ot.queue,
        next: null
      }, Rt === null ? Ke.memoizedState = Rt = e : Rt = Rt.next = e;
    }
    return Rt;
  }
  function oo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Wi(e) {
    var t = Ii;
    return Ii += 1, Wr === null && (Wr = []), e = td(Wr, e, t), t = Ke, (Rt === null ? t.memoizedState : Rt.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? Xd : uc), e;
  }
  function so(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Wi(e);
      if (e.$$typeof === fe) return Pt(e);
    }
    throw Error(h(438, String(e)));
  }
  function $s(e) {
    var t = null, n = Ke.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var a = Ke.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = oo(), Ke.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++)
        n[a] = _n;
    return t.index++, n;
  }
  function qa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function co(e) {
    var t = At();
    return Ps(t, ot, e);
  }
  function Ps(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(h(311));
    a.lastRenderedReducer = n;
    var r = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (r !== null) {
        var p = r.next;
        r.next = u.next, u.next = p;
      }
      t.baseQueue = r = u, a.pending = null;
    }
    if (u = e.baseState, r === null) e.memoizedState = u;
    else {
      t = r.next;
      var v = p = null, j = null, G = t, F = !1;
      do {
        var W = G.lane & -536870913;
        if (W !== G.lane ? (Je & W) === W : (Ba & W) === W) {
          var X = G.revertLane;
          if (X === 0)
            j !== null && (j = j.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }), W === Zr && (F = !0);
          else if ((Ba & X) === X) {
            G = G.next, X === Zr && (F = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: G.revertLane,
              gesture: null,
              action: G.action,
              hasEagerState: G.hasEagerState,
              eagerState: G.eagerState,
              next: null
            }, j === null ? (v = j = W, p = u) : j = j.next = W, Ke.lanes |= X, Sl |= X;
          W = G.action, dr && n(u, W), u = G.hasEagerState ? G.eagerState : n(u, W);
        } else
          X = {
            lane: W,
            revertLane: G.revertLane,
            gesture: G.gesture,
            action: G.action,
            hasEagerState: G.hasEagerState,
            eagerState: G.eagerState,
            next: null
          }, j === null ? (v = j = X, p = u) : j = j.next = X, Ke.lanes |= W, Sl |= W;
        G = G.next;
      } while (G !== null && G !== t);
      if (j === null ? p = u : j.next = v, !ln(u, e.memoizedState) && (Ut = !0, F && (n = Jr, n !== null)))
        throw n;
      e.memoizedState = u, e.baseState = p, e.baseQueue = j, a.lastRenderedState = u;
    }
    return r === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Is(e) {
    var t = At(), n = t.queue;
    if (n === null) throw Error(h(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch, r = n.pending, u = t.memoizedState;
    if (r !== null) {
      n.pending = null;
      var p = r = r.next;
      do
        u = e(u, p.action), p = p.next;
      while (p !== r);
      ln(u, t.memoizedState) || (Ut = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, a];
  }
  function dd(e, t, n) {
    var a = Ke, r = At(), u = Ie;
    if (u) {
      if (n === void 0) throw Error(h(407));
      n = n();
    } else n = t();
    var p = !ln(
      (ot || r).memoizedState,
      n
    );
    if (p && (r.memoizedState = n, Ut = !0), r = r.queue, tc(pd.bind(null, a, r, e), [
      e
    ]), r.getSnapshot !== t || p || Rt !== null && Rt.memoizedState.tag & 1) {
      if (a.flags |= 2048, ei(
        9,
        { destroy: void 0 },
        md.bind(
          null,
          a,
          r,
          n,
          t
        ),
        null
      ), ht === null) throw Error(h(349));
      u || (Ba & 127) !== 0 || hd(a, t, n);
    }
    return n;
  }
  function hd(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ke.updateQueue, t === null ? (t = oo(), Ke.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function md(e, t, n, a) {
    t.value = n, t.getSnapshot = a, yd(t) && gd(e);
  }
  function pd(e, t, n) {
    return n(function() {
      yd(t) && gd(e);
    });
  }
  function yd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ln(e, n);
    } catch {
      return !0;
    }
  }
  function gd(e) {
    var t = xt(e, 2);
    t !== null && bn(t, e, 2);
  }
  function Ws(e) {
    var t = fn();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), dr) {
        Jt(!0);
        try {
          n();
        } finally {
          Jt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qa,
      lastRenderedState: e
    }, t;
  }
  function vd(e, t, n, a) {
    return e.baseState = n, Ps(
      e,
      ot,
      typeof a == "function" ? a : qa
    );
  }
  function fp(e, t, n, a, r) {
    if (mo(e)) throw Error(h(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: r,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(p) {
          u.listeners.push(p);
        }
      };
      U.T !== null ? n(!0) : u.isTransition = !1, a(u), n = t.pending, n === null ? (u.next = t.pending = u, bd(t, u)) : (u.next = n.next, t.pending = n.next = u);
    }
  }
  function bd(e, t) {
    var n = t.action, a = t.payload, r = e.state;
    if (t.isTransition) {
      var u = U.T, p = {};
      U.T = p;
      try {
        var v = n(r, a), j = U.S;
        j !== null && j(p, v), xd(e, t, v);
      } catch (G) {
        ec(e, t, G);
      } finally {
        u !== null && p.types !== null && (u.types = p.types), U.T = u;
      }
    } else
      try {
        u = n(r, a), xd(e, t, u);
      } catch (G) {
        ec(e, t, G);
      }
  }
  function xd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        Sd(e, t, a);
      },
      function(a) {
        return ec(e, t, a);
      }
    ) : Sd(e, t, n);
  }
  function Sd(e, t, n) {
    t.status = "fulfilled", t.value = n, _d(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, bd(e, n)));
  }
  function ec(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, _d(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function _d(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function jd(e, t) {
    return t;
  }
  function wd(e, t) {
    if (Ie) {
      var n = ht.formState;
      if (n !== null) {
        e: {
          var a = Ke;
          if (Ie) {
            if (vt) {
              t: {
                for (var r = vt, u = Kn; r.nodeType !== 8; ) {
                  if (!u) {
                    r = null;
                    break t;
                  }
                  if (r = Gn(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break t;
                  }
                }
                u = r.data, r = u === "F!" || u === "F" ? r : null;
              }
              if (r) {
                vt = Gn(
                  r.nextSibling
                ), a = r.data === "F!";
                break e;
              }
            }
            dl(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return n = fn(), n.memoizedState = n.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jd,
      lastRenderedState: t
    }, n.queue = a, n = Gd.bind(
      null,
      Ke,
      a
    ), a.dispatch = n, a = Ws(!1), u = ic.bind(
      null,
      Ke,
      !1,
      a.queue
    ), a = fn(), r = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = r, n = fp.bind(
      null,
      Ke,
      r,
      u,
      n
    ), r.dispatch = n, a.memoizedState = e, [t, n, !1];
  }
  function Ed(e) {
    var t = At();
    return Cd(t, ot, e);
  }
  function Cd(e, t, n) {
    if (t = Ps(
      e,
      t,
      jd
    )[0], e = co(qa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Wi(t);
      } catch (p) {
        throw p === Fr ? eo : p;
      }
    else a = t;
    t = At();
    var r = t.queue, u = r.dispatch;
    return n !== t.memoizedState && (Ke.flags |= 2048, ei(
      9,
      { destroy: void 0 },
      dp.bind(null, r, n),
      null
    )), [a, u, e];
  }
  function dp(e, t) {
    e.action = t;
  }
  function Nd(e) {
    var t = At(), n = ot;
    if (n !== null)
      return Cd(t, n, e);
    At(), t = t.memoizedState, n = At();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, !1];
  }
  function ei(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = Ke.updateQueue, t === null && (t = oo(), Ke.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Td() {
    return At().memoizedState;
  }
  function fo(e, t, n, a) {
    var r = fn();
    Ke.flags |= e, r.memoizedState = ei(
      1 | t,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function ho(e, t, n, a) {
    var r = At();
    a = a === void 0 ? null : a;
    var u = r.memoizedState.inst;
    ot !== null && a !== null && Vs(a, ot.memoizedState.deps) ? r.memoizedState = ei(t, u, n, a) : (Ke.flags |= e, r.memoizedState = ei(
      1 | t,
      u,
      n,
      a
    ));
  }
  function Ad(e, t) {
    fo(8390656, 8, e, t);
  }
  function tc(e, t) {
    ho(2048, 8, e, t);
  }
  function hp(e) {
    Ke.flags |= 4;
    var t = Ke.updateQueue;
    if (t === null)
      t = oo(), Ke.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function kd(e) {
    var t = At().memoizedState;
    return hp({ ref: t, nextImpl: e }), function() {
      if ((lt & 2) !== 0) throw Error(h(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Od(e, t) {
    return ho(4, 2, e, t);
  }
  function zd(e, t) {
    return ho(4, 4, e, t);
  }
  function Md(e, t) {
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
  function Dd(e, t, n) {
    n = n != null ? n.concat([e]) : null, ho(4, 4, Md.bind(null, t, e), n);
  }
  function nc() {
  }
  function Rd(e, t) {
    var n = At();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && Vs(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function Ud(e, t) {
    var n = At();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && Vs(t, a[1]))
      return a[0];
    if (a = e(), dr) {
      Jt(!0);
      try {
        e();
      } finally {
        Jt(!1);
      }
    }
    return n.memoizedState = [a, t], a;
  }
  function ac(e, t, n) {
    return n === void 0 || (Ba & 1073741824) !== 0 && (Je & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = Bh(), Ke.lanes |= e, Sl |= e, n);
  }
  function Bd(e, t, n, a) {
    return ln(n, t) ? n : Pr.current !== null ? (e = ac(e, n, a), ln(e, t) || (Ut = !0), e) : (Ba & 42) === 0 || (Ba & 1073741824) !== 0 && (Je & 261930) === 0 ? (Ut = !0, e.memoizedState = n) : (e = Bh(), Ke.lanes |= e, Sl |= e, t);
  }
  function qd(e, t, n, a, r) {
    var u = te.p;
    te.p = u !== 0 && 8 > u ? u : 8;
    var p = U.T, v = {};
    U.T = v, ic(e, !1, t, n);
    try {
      var j = r(), G = U.S;
      if (G !== null && G(v, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var F = op(
          j,
          a
        );
        eu(
          e,
          t,
          F,
          zn(e)
        );
      } else
        eu(
          e,
          t,
          a,
          zn(e)
        );
    } catch (W) {
      eu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: W },
        zn()
      );
    } finally {
      te.p = u, p !== null && v.types !== null && (p.types = v.types), U.T = p;
    }
  }
  function mp() {
  }
  function lc(e, t, n, a) {
    if (e.tag !== 5) throw Error(h(476));
    var r = Ld(e).queue;
    qd(
      e,
      r,
      t,
      je,
      n === null ? mp : function() {
        return Hd(e), n(a);
      }
    );
  }
  function Ld(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: je,
      baseState: je,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qa,
        lastRenderedState: je
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
        lastRenderedReducer: qa,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Hd(e) {
    var t = Ld(e);
    t.next === null && (t = e.alternate.memoizedState), eu(
      e,
      t.next.queue,
      {},
      zn()
    );
  }
  function rc() {
    return Pt(gu);
  }
  function Kd() {
    return At().memoizedState;
  }
  function Yd() {
    return At().memoizedState;
  }
  function pp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = zn();
          e = pl(n);
          var a = yl(t, e, n);
          a !== null && (bn(a, t, n), Fi(a, t, n)), t = { cache: Ds() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function yp(e, t, n) {
    var a = zn();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, mo(e) ? Qd(t, n) : (n = zt(e, t, n, a), n !== null && (bn(n, e, a), Vd(n, t, a)));
  }
  function Gd(e, t, n) {
    var a = zn();
    eu(e, t, n, a);
  }
  function eu(e, t, n, a) {
    var r = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (mo(e)) Qd(t, r);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var p = t.lastRenderedState, v = u(p, n);
          if (r.hasEagerState = !0, r.eagerState = v, ln(v, p))
            return ze(e, t, r, 0), ht === null && Yt(), !1;
        } catch {
        } finally {
        }
      if (n = zt(e, t, r, a), n !== null)
        return bn(n, e, a), Vd(n, t, a), !0;
    }
    return !1;
  }
  function ic(e, t, n, a) {
    if (a = {
      lane: 2,
      revertLane: qc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, mo(e)) {
      if (t) throw Error(h(479));
    } else
      t = zt(
        e,
        n,
        a,
        2
      ), t !== null && bn(t, e, 2);
  }
  function mo(e) {
    var t = e.alternate;
    return e === Ke || t !== null && t === Ke;
  }
  function Qd(e, t) {
    Ir = io = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Vd(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, dt(e, n);
    }
  }
  var tu = {
    readContext: Pt,
    use: so,
    useCallback: _t,
    useContext: _t,
    useEffect: _t,
    useImperativeHandle: _t,
    useLayoutEffect: _t,
    useInsertionEffect: _t,
    useMemo: _t,
    useReducer: _t,
    useRef: _t,
    useState: _t,
    useDebugValue: _t,
    useDeferredValue: _t,
    useTransition: _t,
    useSyncExternalStore: _t,
    useId: _t,
    useHostTransitionStatus: _t,
    useFormState: _t,
    useActionState: _t,
    useOptimistic: _t,
    useMemoCache: _t,
    useCacheRefresh: _t
  };
  tu.useEffectEvent = _t;
  var Xd = {
    readContext: Pt,
    use: so,
    useCallback: function(e, t) {
      return fn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Pt,
    useEffect: Ad,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, fo(
        4194308,
        4,
        Md.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return fo(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      fo(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = fn();
      t = t === void 0 ? null : t;
      var a = e();
      if (dr) {
        Jt(!0);
        try {
          e();
        } finally {
          Jt(!1);
        }
      }
      return n.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, n) {
      var a = fn();
      if (n !== void 0) {
        var r = n(t);
        if (dr) {
          Jt(!0);
          try {
            n(t);
          } finally {
            Jt(!1);
          }
        }
      } else r = t;
      return a.memoizedState = a.baseState = r, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: r
      }, a.queue = e, e = e.dispatch = yp.bind(
        null,
        Ke,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = fn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Ws(e);
      var t = e.queue, n = Gd.bind(null, Ke, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: nc,
    useDeferredValue: function(e, t) {
      var n = fn();
      return ac(n, e, t);
    },
    useTransition: function() {
      var e = Ws(!1);
      return e = qd.bind(
        null,
        Ke,
        e.queue,
        !0,
        !1
      ), fn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var a = Ke, r = fn();
      if (Ie) {
        if (n === void 0)
          throw Error(h(407));
        n = n();
      } else {
        if (n = t(), ht === null)
          throw Error(h(349));
        (Je & 127) !== 0 || hd(a, t, n);
      }
      r.memoizedState = n;
      var u = { value: n, getSnapshot: t };
      return r.queue = u, Ad(pd.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, ei(
        9,
        { destroy: void 0 },
        md.bind(
          null,
          a,
          u,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = fn(), t = ht.identifierPrefix;
      if (Ie) {
        var n = da, a = fa;
        n = (a & ~(1 << 32 - ye(a) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = uo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = sp++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: rc,
    useFormState: wd,
    useActionState: wd,
    useOptimistic: function(e) {
      var t = fn();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = ic.bind(
        null,
        Ke,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: $s,
    useCacheRefresh: function() {
      return fn().memoizedState = pp.bind(
        null,
        Ke
      );
    },
    useEffectEvent: function(e) {
      var t = fn(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((lt & 2) !== 0)
          throw Error(h(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, uc = {
    readContext: Pt,
    use: so,
    useCallback: Rd,
    useContext: Pt,
    useEffect: tc,
    useImperativeHandle: Dd,
    useInsertionEffect: Od,
    useLayoutEffect: zd,
    useMemo: Ud,
    useReducer: co,
    useRef: Td,
    useState: function() {
      return co(qa);
    },
    useDebugValue: nc,
    useDeferredValue: function(e, t) {
      var n = At();
      return Bd(
        n,
        ot.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = co(qa)[0], t = At().memoizedState;
      return [
        typeof e == "boolean" ? e : Wi(e),
        t
      ];
    },
    useSyncExternalStore: dd,
    useId: Kd,
    useHostTransitionStatus: rc,
    useFormState: Ed,
    useActionState: Ed,
    useOptimistic: function(e, t) {
      var n = At();
      return vd(n, ot, e, t);
    },
    useMemoCache: $s,
    useCacheRefresh: Yd
  };
  uc.useEffectEvent = kd;
  var Zd = {
    readContext: Pt,
    use: so,
    useCallback: Rd,
    useContext: Pt,
    useEffect: tc,
    useImperativeHandle: Dd,
    useInsertionEffect: Od,
    useLayoutEffect: zd,
    useMemo: Ud,
    useReducer: Is,
    useRef: Td,
    useState: function() {
      return Is(qa);
    },
    useDebugValue: nc,
    useDeferredValue: function(e, t) {
      var n = At();
      return ot === null ? ac(n, e, t) : Bd(
        n,
        ot.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Is(qa)[0], t = At().memoizedState;
      return [
        typeof e == "boolean" ? e : Wi(e),
        t
      ];
    },
    useSyncExternalStore: dd,
    useId: Kd,
    useHostTransitionStatus: rc,
    useFormState: Nd,
    useActionState: Nd,
    useOptimistic: function(e, t) {
      var n = At();
      return ot !== null ? vd(n, ot, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: $s,
    useCacheRefresh: Yd
  };
  Zd.useEffectEvent = kd;
  function oc(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : Q({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var sc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var a = zn(), r = pl(a);
      r.payload = t, n != null && (r.callback = n), t = yl(e, r, a), t !== null && (bn(t, e, a), Fi(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var a = zn(), r = pl(a);
      r.tag = 1, r.payload = t, n != null && (r.callback = n), t = yl(e, r, a), t !== null && (bn(t, e, a), Fi(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = zn(), a = pl(n);
      a.tag = 2, t != null && (a.callback = t), t = yl(e, a, n), t !== null && (bn(t, e, n), Fi(t, e, n));
    }
  };
  function Jd(e, t, n, a, r, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, p) : t.prototype && t.prototype.isPureReactComponent ? !l(n, a) || !l(r, u) : !0;
  }
  function Fd(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && sc.enqueueReplaceState(t, t.state, null);
  }
  function hr(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t)
        a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = Q({}, n));
      for (var r in e)
        n[r] === void 0 && (n[r] = e[r]);
    }
    return n;
  }
  function $d(e) {
    ge(e);
  }
  function Pd(e) {
    console.error(e);
  }
  function Id(e) {
    ge(e);
  }
  function po(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Wd(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function cc(e, t, n) {
    return n = pl(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      po(e, t);
    }, n;
  }
  function eh(e) {
    return e = pl(e), e.tag = 3, e;
  }
  function th(e, t, n, a) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var u = a.value;
      e.payload = function() {
        return r(u);
      }, e.callback = function() {
        Wd(t, n, a);
      };
    }
    var p = n.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      Wd(t, n, a), typeof r != "function" && (_l === null ? _l = /* @__PURE__ */ new Set([this]) : _l.add(this));
      var v = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: v !== null ? v : ""
      });
    });
  }
  function gp(e, t, n, a, r) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && Xr(
        t,
        n,
        r,
        !0
      ), n = Tn.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Yn === null ? No() : n.alternate === null && jt === 0 && (jt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = r, a === to ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Rc(e, a, r)), !1;
          case 22:
            return n.flags |= 65536, a === to ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), Rc(e, a, r)), !1;
        }
        throw Error(h(435, n.tag));
      }
      return Rc(e, a, r), No(), !1;
    }
    if (Ie)
      return t = Tn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = r, a !== As && (e = Error(h(422), { cause: a }), Qi(qn(e, n)))) : (a !== As && (t = Error(h(423), {
        cause: a
      }), Qi(
        qn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, r &= -r, e.lanes |= r, a = qn(a, n), r = cc(
        e.stateNode,
        a,
        r
      ), Hs(e, r), jt !== 4 && (jt = 2)), !1;
    var u = Error(h(520), { cause: a });
    if (u = qn(u, n), su === null ? su = [u] : su.push(u), jt !== 4 && (jt = 2), t === null) return !0;
    a = qn(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = r & -r, n.lanes |= e, e = cc(n.stateNode, a, e), Hs(n, e), !1;
        case 1:
          if (t = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (_l === null || !_l.has(u))))
            return n.flags |= 65536, r &= -r, n.lanes |= r, r = eh(r), th(
              r,
              e,
              n,
              a
            ), Hs(n, r), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var fc = Error(h(461)), Ut = !1;
  function It(e, t, n, a) {
    t.child = e === null ? rd(t, null, n, a) : fr(
      t,
      e.child,
      n,
      a
    );
  }
  function nh(e, t, n, a, r) {
    n = n.render;
    var u = t.ref;
    if ("ref" in a) {
      var p = {};
      for (var v in a)
        v !== "ref" && (p[v] = a[v]);
    } else p = a;
    return ur(t), a = Xs(
      e,
      t,
      n,
      p,
      u,
      r
    ), v = Zs(), e !== null && !Ut ? (Js(e, t, r), La(e, t, r)) : (Ie && v && Ns(t), t.flags |= 1, It(e, t, a, r), t.child);
  }
  function ah(e, t, n, a, r) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !ws(u) && u.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = u, lh(
        e,
        t,
        u,
        a,
        r
      )) : (e = Fu(
        n.type,
        null,
        a,
        t,
        t.mode,
        r
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !bc(e, r)) {
      var p = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : l, n(p, a) && e.ref === t.ref)
        return La(e, t, r);
    }
    return t.flags |= 1, e = Ma(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function lh(e, t, n, a, r) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (l(u, a) && e.ref === t.ref)
        if (Ut = !1, t.pendingProps = a = u, bc(e, r))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return t.lanes = e.lanes, La(e, t, r);
    }
    return dc(
      e,
      t,
      n,
      a,
      r
    );
  }
  function rh(e, t, n, a) {
    var r = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, e !== null) {
          for (a = t.child = e.child, r = 0; a !== null; )
            r = r | a.lanes | a.childLanes, a = a.sibling;
          a = r & ~u;
        } else a = 0, t.child = null;
        return ih(
          e,
          t,
          u,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Wu(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? od(t, u) : Ys(), sd(t);
      else
        return a = t.lanes = 536870912, ih(
          e,
          t,
          u !== null ? u.baseLanes | n : n,
          n,
          a
        );
    } else
      u !== null ? (Wu(t, u.cachePool), od(t, u), vl(), t.memoizedState = null) : (e !== null && Wu(t, null), Ys(), vl());
    return It(e, t, r, n), t.child;
  }
  function nu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function ih(e, t, n, a, r) {
    var u = Us();
    return u = u === null ? null : { parent: Dt._currentValue, pool: u }, t.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, e !== null && Wu(t, null), Ys(), sd(t), e !== null && Xr(e, t, a, !0), t.childLanes = r, null;
  }
  function yo(e, t) {
    return t = vo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function uh(e, t, n) {
    return fr(t, e.child, null, n), e = yo(t, t.pendingProps), e.flags |= 2, An(t), t.memoizedState = null, e;
  }
  function vp(e, t, n) {
    var a = t.pendingProps, r = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ie) {
        if (a.mode === "hidden")
          return e = yo(t, a), t.lanes = 536870912, nu(null, e);
        if (Qs(t), (e = vt) ? (e = bm(
          e,
          Kn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: cl !== null ? { id: fa, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Qf(e), n.return = t, t.child = n, $t = t, vt = null)) : e = null, e === null) throw dl(t);
        return t.lanes = 536870912, null;
      }
      return yo(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var p = u.dehydrated;
      if (Qs(t), r)
        if (t.flags & 256)
          t.flags &= -257, t = uh(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(h(558));
      else if (Ut || Xr(e, t, n, !1), r = (n & e.childLanes) !== 0, Ut || r) {
        if (a = ht, a !== null && (p = Et(a, n), p !== 0 && p !== u.retryLane))
          throw u.retryLane = p, xt(e, p), bn(a, e, p), fc;
        No(), t = uh(
          e,
          t,
          n
        );
      } else
        e = u.treeContext, vt = Gn(p.nextSibling), $t = t, Ie = !0, fl = null, Kn = !1, e !== null && Zf(t, e), t = yo(t, a), t.flags |= 4096;
      return t;
    }
    return e = Ma(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function go(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(h(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function dc(e, t, n, a, r) {
    return ur(t), n = Xs(
      e,
      t,
      n,
      a,
      void 0,
      r
    ), a = Zs(), e !== null && !Ut ? (Js(e, t, r), La(e, t, r)) : (Ie && a && Ns(t), t.flags |= 1, It(e, t, n, r), t.child);
  }
  function oh(e, t, n, a, r, u) {
    return ur(t), t.updateQueue = null, n = fd(
      t,
      a,
      n,
      r
    ), cd(e), a = Zs(), e !== null && !Ut ? (Js(e, t, u), La(e, t, u)) : (Ie && a && Ns(t), t.flags |= 1, It(e, t, n, u), t.child);
  }
  function sh(e, t, n, a, r) {
    if (ur(t), t.stateNode === null) {
      var u = mn, p = n.contextType;
      typeof p == "object" && p !== null && (u = Pt(p)), u = new n(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = sc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, qs(t), p = n.contextType, u.context = typeof p == "object" && p !== null ? Pt(p) : mn, u.state = t.memoizedState, p = n.getDerivedStateFromProps, typeof p == "function" && (oc(
        t,
        n,
        p,
        a
      ), u.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (p = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), p !== u.state && sc.enqueueReplaceState(u, u.state, null), Pi(t, a, u, r), $i(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var v = t.memoizedProps, j = hr(n, v);
      u.props = j;
      var G = u.context, F = n.contextType;
      p = mn, typeof F == "object" && F !== null && (p = Pt(F));
      var W = n.getDerivedStateFromProps;
      F = typeof W == "function" || typeof u.getSnapshotBeforeUpdate == "function", v = t.pendingProps !== v, F || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (v || G !== p) && Fd(
        t,
        u,
        a,
        p
      ), ml = !1;
      var X = t.memoizedState;
      u.state = X, Pi(t, a, u, r), $i(), G = t.memoizedState, v || X !== G || ml ? (typeof W == "function" && (oc(
        t,
        n,
        W,
        a
      ), G = t.memoizedState), (j = ml || Jd(
        t,
        n,
        j,
        a,
        X,
        G,
        p
      )) ? (F || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = G), u.props = a, u.state = G, u.context = p, a = j) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, Ls(e, t), p = t.memoizedProps, F = hr(n, p), u.props = F, W = t.pendingProps, X = u.context, G = n.contextType, j = mn, typeof G == "object" && G !== null && (j = Pt(G)), v = n.getDerivedStateFromProps, (G = typeof v == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p !== W || X !== j) && Fd(
        t,
        u,
        a,
        j
      ), ml = !1, X = t.memoizedState, u.state = X, Pi(t, a, u, r), $i();
      var Z = t.memoizedState;
      p !== W || X !== Z || ml || e !== null && e.dependencies !== null && Pu(e.dependencies) ? (typeof v == "function" && (oc(
        t,
        n,
        v,
        a
      ), Z = t.memoizedState), (F = ml || Jd(
        t,
        n,
        F,
        a,
        X,
        Z,
        j
      ) || e !== null && e.dependencies !== null && Pu(e.dependencies)) ? (G || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, Z, j), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        Z,
        j
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = Z), u.props = a, u.state = Z, u.context = j, a = F) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, go(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = fr(
      t,
      e.child,
      null,
      r
    ), t.child = fr(
      t,
      null,
      n,
      r
    )) : It(e, t, n, r), t.memoizedState = u.state, e = t.child) : e = La(
      e,
      t,
      r
    ), e;
  }
  function ch(e, t, n, a) {
    return rr(), t.flags |= 256, It(e, t, n, a), t.child;
  }
  var hc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mc(e) {
    return { baseLanes: e, cachePool: Wf() };
  }
  function pc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= On), e;
  }
  function fh(e, t, n) {
    var a = t.pendingProps, r = !1, u = (t.flags & 128) !== 0, p;
    if ((p = u) || (p = e !== null && e.memoizedState === null ? !1 : (Tt.current & 2) !== 0), p && (r = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ie) {
        if (r ? gl(t) : vl(), (e = vt) ? (e = bm(
          e,
          Kn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: cl !== null ? { id: fa, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Qf(e), n.return = t, t.child = n, $t = t, vt = null)) : e = null, e === null) throw dl(t);
        return Pc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var v = a.children;
      return a = a.fallback, r ? (vl(), r = t.mode, v = vo(
        { mode: "hidden", children: v },
        r
      ), a = lr(
        a,
        r,
        n,
        null
      ), v.return = t, a.return = t, v.sibling = a, t.child = v, a = t.child, a.memoizedState = mc(n), a.childLanes = pc(
        e,
        p,
        n
      ), t.memoizedState = hc, nu(null, a)) : (gl(t), yc(t, v));
    }
    var j = e.memoizedState;
    if (j !== null && (v = j.dehydrated, v !== null)) {
      if (u)
        t.flags & 256 ? (gl(t), t.flags &= -257, t = gc(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (vl(), t.child = e.child, t.flags |= 128, t = null) : (vl(), v = a.fallback, r = t.mode, a = vo(
          { mode: "visible", children: a.children },
          r
        ), v = lr(
          v,
          r,
          n,
          null
        ), v.flags |= 2, a.return = t, v.return = t, a.sibling = v, t.child = a, fr(
          t,
          e.child,
          null,
          n
        ), a = t.child, a.memoizedState = mc(n), a.childLanes = pc(
          e,
          p,
          n
        ), t.memoizedState = hc, t = nu(null, a));
      else if (gl(t), Pc(v)) {
        if (p = v.nextSibling && v.nextSibling.dataset, p) var G = p.dgst;
        p = G, a = Error(h(419)), a.stack = "", a.digest = p, Qi({ value: a, source: null, stack: null }), t = gc(
          e,
          t,
          n
        );
      } else if (Ut || Xr(e, t, n, !1), p = (n & e.childLanes) !== 0, Ut || p) {
        if (p = ht, p !== null && (a = Et(p, n), a !== 0 && a !== j.retryLane))
          throw j.retryLane = a, xt(e, a), bn(p, e, a), fc;
        $c(v) || No(), t = gc(
          e,
          t,
          n
        );
      } else
        $c(v) ? (t.flags |= 192, t.child = e.child, t = null) : (e = j.treeContext, vt = Gn(
          v.nextSibling
        ), $t = t, Ie = !0, fl = null, Kn = !1, e !== null && Zf(t, e), t = yc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return r ? (vl(), v = a.fallback, r = t.mode, j = e.child, G = j.sibling, a = Ma(j, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = j.subtreeFlags & 65011712, G !== null ? v = Ma(
      G,
      v
    ) : (v = lr(
      v,
      r,
      n,
      null
    ), v.flags |= 2), v.return = t, a.return = t, a.sibling = v, t.child = a, nu(null, a), a = t.child, v = e.child.memoizedState, v === null ? v = mc(n) : (r = v.cachePool, r !== null ? (j = Dt._currentValue, r = r.parent !== j ? { parent: j, pool: j } : r) : r = Wf(), v = {
      baseLanes: v.baseLanes | n,
      cachePool: r
    }), a.memoizedState = v, a.childLanes = pc(
      e,
      p,
      n
    ), t.memoizedState = hc, nu(e.child, a)) : (gl(t), n = e.child, e = n.sibling, n = Ma(n, {
      mode: "visible",
      children: a.children
    }), n.return = t, n.sibling = null, e !== null && (p = t.deletions, p === null ? (t.deletions = [e], t.flags |= 16) : p.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function yc(e, t) {
    return t = vo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function vo(e, t) {
    return e = Nn(22, e, null, t), e.lanes = 0, e;
  }
  function gc(e, t, n) {
    return fr(t, e.child, null, n), e = yc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function dh(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), zs(e.return, t, n);
  }
  function vc(e, t, n, a, r, u) {
    var p = e.memoizedState;
    p === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: r,
      treeForkCount: u
    } : (p.isBackwards = t, p.rendering = null, p.renderingStartTime = 0, p.last = a, p.tail = n, p.tailMode = r, p.treeForkCount = u);
  }
  function hh(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, u = a.tail;
    a = a.children;
    var p = Tt.current, v = (p & 2) !== 0;
    if (v ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, de(Tt, p), It(e, t, a, n), a = Ie ? Gi : 0, !v && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && dh(e, n, t);
        else if (e.tag === 19)
          dh(e, n, t);
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
    switch (r) {
      case "forwards":
        for (n = t.child, r = null; n !== null; )
          e = n.alternate, e !== null && ro(e) === null && (r = n), n = n.sibling;
        n = r, n === null ? (r = t.child, t.child = null) : (r = n.sibling, n.sibling = null), vc(
          t,
          !1,
          r,
          n,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, r = t.child, t.child = null; r !== null; ) {
          if (e = r.alternate, e !== null && ro(e) === null) {
            t.child = r;
            break;
          }
          e = r.sibling, r.sibling = n, n = r, r = e;
        }
        vc(
          t,
          !0,
          n,
          null,
          u,
          a
        );
        break;
      case "together":
        vc(
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
  function La(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Sl |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Xr(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(h(153));
    if (t.child !== null) {
      for (e = t.child, n = Ma(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Ma(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function bc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Pu(e)));
  }
  function bp(e, t, n) {
    switch (t.tag) {
      case 3:
        Xt(t, t.stateNode.containerInfo), hl(t, Dt, e.memoizedState.cache), rr();
        break;
      case 27:
      case 5:
        Ja(t);
        break;
      case 4:
        Xt(t, t.stateNode.containerInfo);
        break;
      case 10:
        hl(
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
          return a.dehydrated !== null ? (gl(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? fh(e, t, n) : (gl(t), e = La(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        gl(t);
        break;
      case 19:
        var r = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (Xr(
          e,
          t,
          n,
          !1
        ), a = (n & t.childLanes) !== 0), r) {
          if (a)
            return hh(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), de(Tt, Tt.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, rh(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        hl(t, Dt, e.memoizedState.cache);
    }
    return La(e, t, n);
  }
  function mh(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ut = !0;
      else {
        if (!bc(e, n) && (t.flags & 128) === 0)
          return Ut = !1, bp(
            e,
            t,
            n
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Ie && (t.flags & 1048576) !== 0 && Xf(t, Gi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = sr(t.elementType), t.type = e, typeof e == "function")
            ws(e) ? (a = hr(e, a), t.tag = 1, t = sh(
              null,
              t,
              e,
              a,
              n
            )) : (t.tag = 0, t = dc(
              null,
              t,
              e,
              a,
              n
            ));
          else {
            if (e != null) {
              var r = e.$$typeof;
              if (r === Oe) {
                t.tag = 11, t = nh(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              } else if (r === Se) {
                t.tag = 14, t = ah(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              }
            }
            throw t = jn(e) || e, Error(h(306, t, ""));
          }
        }
        return t;
      case 0:
        return dc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return a = t.type, r = hr(
          a,
          t.pendingProps
        ), sh(
          e,
          t,
          a,
          r,
          n
        );
      case 3:
        e: {
          if (Xt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(h(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          r = u.element, Ls(e, t), Pi(t, a, null, n);
          var p = t.memoizedState;
          if (a = p.cache, hl(t, Dt, a), a !== u.cache && Ms(
            t,
            [Dt],
            n,
            !0
          ), $i(), a = p.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: p.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = ch(
                e,
                t,
                a,
                n
              );
              break e;
            } else if (a !== r) {
              r = qn(
                Error(h(424)),
                t
              ), Qi(r), t = ch(
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
              for (vt = Gn(e.firstChild), $t = t, Ie = !0, fl = null, Kn = !0, n = rd(
                t,
                null,
                a,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (rr(), a === r) {
              t = La(
                e,
                t,
                n
              );
              break e;
            }
            It(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return go(e, t), e === null ? (n = Em(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Ie || (n = t.type, e = t.pendingProps, a = Do(
          qe.current
        ).createElement(n), a[mt] = t, a[Ct] = e, Wt(a, n, e), Nt(a), t.stateNode = a) : t.memoizedState = Em(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ja(t), e === null && Ie && (a = t.stateNode = _m(
          t.type,
          t.pendingProps,
          qe.current
        ), $t = t, Kn = !0, r = vt, Cl(t.type) ? (Ic = r, vt = Gn(a.firstChild)) : vt = r), It(
          e,
          t,
          t.pendingProps.children,
          n
        ), go(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ie && ((r = a = vt) && (a = Fp(
          a,
          t.type,
          t.pendingProps,
          Kn
        ), a !== null ? (t.stateNode = a, $t = t, vt = Gn(a.firstChild), Kn = !1, r = !0) : r = !1), r || dl(t)), Ja(t), r = t.type, u = t.pendingProps, p = e !== null ? e.memoizedProps : null, a = u.children, Zc(r, u) ? a = null : p !== null && Zc(r, p) && (t.flags |= 32), t.memoizedState !== null && (r = Xs(
          e,
          t,
          cp,
          null,
          null,
          n
        ), gu._currentValue = r), go(e, t), It(e, t, a, n), t.child;
      case 6:
        return e === null && Ie && ((e = n = vt) && (n = $p(
          n,
          t.pendingProps,
          Kn
        ), n !== null ? (t.stateNode = n, $t = t, vt = null, e = !0) : e = !1), e || dl(t)), null;
      case 13:
        return fh(e, t, n);
      case 4:
        return Xt(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = fr(
          t,
          null,
          a,
          n
        ) : It(e, t, a, n), t.child;
      case 11:
        return nh(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return It(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return It(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return It(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return a = t.pendingProps, hl(t, t.type, a.value), It(e, t, a.children, n), t.child;
      case 9:
        return r = t.type._context, a = t.pendingProps.children, ur(t), r = Pt(r), a = a(r), t.flags |= 1, It(e, t, a, n), t.child;
      case 14:
        return ah(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return lh(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return hh(e, t, n);
      case 31:
        return vp(e, t, n);
      case 22:
        return rh(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return ur(t), a = Pt(Dt), e === null ? (r = Us(), r === null && (r = ht, u = Ds(), r.pooledCache = u, u.refCount++, u !== null && (r.pooledCacheLanes |= n), r = u), t.memoizedState = { parent: a, cache: r }, qs(t), hl(t, Dt, r)) : ((e.lanes & n) !== 0 && (Ls(e, t), Pi(t, null, null, n), $i()), r = e.memoizedState, u = t.memoizedState, r.parent !== a ? (r = { parent: a, cache: a }, t.memoizedState = r, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = r), hl(t, Dt, a)) : (a = u.cache, hl(t, Dt, a), a !== r.cache && Ms(
          t,
          [Dt],
          n,
          !0
        ))), It(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(h(156, t.tag));
  }
  function Ha(e) {
    e.flags |= 4;
  }
  function xc(e, t, n, a, r) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (r & 335544128) === r)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Kh()) e.flags |= 8192;
        else
          throw cr = to, Bs;
    } else e.flags &= -16777217;
  }
  function ph(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !km(t))
      if (Kh()) e.flags |= 8192;
      else
        throw cr = to, Bs;
  }
  function bo(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Du() : 536870912, e.lanes |= t, li |= t);
  }
  function au(e, t) {
    if (!Ie)
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
  function bt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t)
      for (var r = e.child; r !== null; )
        n |= r.lanes | r.childLanes, a |= r.subtreeFlags & 65011712, a |= r.flags & 65011712, r.return = e, r = r.sibling;
    else
      for (r = e.child; r !== null; )
        n |= r.lanes | r.childLanes, a |= r.subtreeFlags, a |= r.flags, r.return = e, r = r.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function xp(e, t, n) {
    var a = t.pendingProps;
    switch (Ts(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bt(t), null;
      case 1:
        return bt(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Ua(Dt), me(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Vr(t) ? Ha(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ks())), bt(t), null;
      case 26:
        var r = t.type, u = t.memoizedState;
        return e === null ? (Ha(t), u !== null ? (bt(t), ph(t, u)) : (bt(t), xc(
          t,
          r,
          null,
          a,
          n
        ))) : u ? u !== e.memoizedState ? (Ha(t), bt(t), ph(t, u)) : (bt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Ha(t), bt(t), xc(
          t,
          r,
          e,
          a,
          n
        )), null;
      case 27:
        if (ga(t), n = qe.current, r = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Ha(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(h(166));
            return bt(t), null;
          }
          e = be.current, Vr(t) ? Jf(t) : (e = _m(r, a, n), t.stateNode = e, Ha(t));
        }
        return bt(t), null;
      case 5:
        if (ga(t), r = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Ha(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(h(166));
            return bt(t), null;
          }
          if (u = be.current, Vr(t))
            Jf(t);
          else {
            var p = Do(
              qe.current
            );
            switch (u) {
              case 1:
                u = p.createElementNS(
                  "http://www.w3.org/2000/svg",
                  r
                );
                break;
              case 2:
                u = p.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  r
                );
                break;
              default:
                switch (r) {
                  case "svg":
                    u = p.createElementNS(
                      "http://www.w3.org/2000/svg",
                      r
                    );
                    break;
                  case "math":
                    u = p.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r
                    );
                    break;
                  case "script":
                    u = p.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? p.createElement("select", {
                      is: a.is
                    }) : p.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? p.createElement(r, { is: a.is }) : p.createElement(r);
                }
            }
            u[mt] = t, u[Ct] = a;
            e: for (p = t.child; p !== null; ) {
              if (p.tag === 5 || p.tag === 6)
                u.appendChild(p.stateNode);
              else if (p.tag !== 4 && p.tag !== 27 && p.child !== null) {
                p.child.return = p, p = p.child;
                continue;
              }
              if (p === t) break e;
              for (; p.sibling === null; ) {
                if (p.return === null || p.return === t)
                  break e;
                p = p.return;
              }
              p.sibling.return = p.return, p = p.sibling;
            }
            t.stateNode = u;
            e: switch (Wt(u, r, a), r) {
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
            a && Ha(t);
          }
        }
        return bt(t), xc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Ha(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(h(166));
          if (e = qe.current, Vr(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, r = $t, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  a = r.memoizedProps;
              }
            e[mt] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || fm(e.nodeValue, n)), e || dl(t, !0);
          } else
            e = Do(e).createTextNode(
              a
            ), e[mt] = t, t.stateNode = e;
        }
        return bt(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Vr(t), n !== null) {
            if (e === null) {
              if (!a) throw Error(h(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(h(557));
              e[mt] = t;
            } else
              rr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            bt(t), e = !1;
          } else
            n = ks(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (An(t), t) : (An(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(h(558));
        }
        return bt(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (r = Vr(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!r) throw Error(h(318));
              if (r = t.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(h(317));
              r[mt] = t;
            } else
              rr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            bt(t), r = !1;
          } else
            r = ks(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return t.flags & 256 ? (An(t), t) : (An(t), null);
        }
        return An(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = a !== null, e = e !== null && e.memoizedState !== null, n && (a = t.child, r = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (r = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== r && (a.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), bo(t, t.updateQueue), bt(t), null);
      case 4:
        return me(), e === null && Yc(t.stateNode.containerInfo), bt(t), null;
      case 10:
        return Ua(t.type), bt(t), null;
      case 19:
        if (ee(Tt), a = t.memoizedState, a === null) return bt(t), null;
        if (r = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (r) au(a, !1);
          else {
            if (jt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = ro(e), u !== null) {
                  for (t.flags |= 128, au(a, !1), e = u.updateQueue, t.updateQueue = e, bo(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Gf(n, e), n = n.sibling;
                  return de(
                    Tt,
                    Tt.current & 1 | 2
                  ), Ie && Da(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && tn() > wo && (t.flags |= 128, r = !0, au(a, !1), t.lanes = 4194304);
          }
        else {
          if (!r)
            if (e = ro(u), e !== null) {
              if (t.flags |= 128, r = !0, e = e.updateQueue, t.updateQueue = e, bo(t, e), au(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !Ie)
                return bt(t), null;
            } else
              2 * tn() - a.renderingStartTime > wo && n !== 536870912 && (t.flags |= 128, r = !0, au(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = tn(), e.sibling = null, n = Tt.current, de(
          Tt,
          r ? n & 1 | 2 : n & 1
        ), Ie && Da(t, a.treeForkCount), e) : (bt(t), null);
      case 22:
      case 23:
        return An(t), Gs(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (bt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : bt(t), n = t.updateQueue, n !== null && bo(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && ee(or), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ua(Dt), bt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(h(156, t.tag));
  }
  function Sp(e, t) {
    switch (Ts(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ua(Dt), me(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return ga(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (An(t), t.alternate === null)
            throw Error(h(340));
          rr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (An(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(h(340));
          rr();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ee(Tt), null;
      case 4:
        return me(), null;
      case 10:
        return Ua(t.type), null;
      case 22:
      case 23:
        return An(t), Gs(), e !== null && ee(or), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ua(Dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function yh(e, t) {
    switch (Ts(t), t.tag) {
      case 3:
        Ua(Dt), me();
        break;
      case 26:
      case 27:
      case 5:
        ga(t);
        break;
      case 4:
        me();
        break;
      case 31:
        t.memoizedState !== null && An(t);
        break;
      case 13:
        An(t);
        break;
      case 19:
        ee(Tt);
        break;
      case 10:
        Ua(t.type);
        break;
      case 22:
      case 23:
        An(t), Gs(), e !== null && ee(or);
        break;
      case 24:
        Ua(Dt);
    }
  }
  function lu(e, t) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var r = a.next;
        n = r;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var u = n.create, p = n.inst;
            a = u(), p.destroy = a;
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (v) {
      it(t, t.return, v);
    }
  }
  function bl(e, t, n) {
    try {
      var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var p = a.inst, v = p.destroy;
            if (v !== void 0) {
              p.destroy = void 0, r = t;
              var j = n, G = v;
              try {
                G();
              } catch (F) {
                it(
                  r,
                  j,
                  F
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (F) {
      it(t, t.return, F);
    }
  }
  function gh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        ud(t, n);
      } catch (a) {
        it(e, e.return, a);
      }
    }
  }
  function vh(e, t, n) {
    n.props = hr(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      it(e, t, a);
    }
  }
  function ru(e, t) {
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
    } catch (r) {
      it(e, t, r);
    }
  }
  function ha(e, t) {
    var n = e.ref, a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (r) {
          it(e, t, r);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          it(e, t, r);
        }
      else n.current = null;
  }
  function bh(e) {
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
    } catch (r) {
      it(e, e.return, r);
    }
  }
  function Sc(e, t, n) {
    try {
      var a = e.stateNode;
      Gp(a, e.type, n, t), a[Ct] = t;
    } catch (r) {
      it(e, e.return, r);
    }
  }
  function xh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Cl(e.type) || e.tag === 4;
  }
  function _c(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || xh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Cl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function jc(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = hn));
    else if (a !== 4 && (a === 27 && Cl(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (jc(e, t, n), e = e.sibling; e !== null; )
        jc(e, t, n), e = e.sibling;
  }
  function xo(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && Cl(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (xo(e, t, n), e = e.sibling; e !== null; )
        xo(e, t, n), e = e.sibling;
  }
  function Sh(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, r = t.attributes; r.length; )
        t.removeAttributeNode(r[0]);
      Wt(t, a, n), t[mt] = e, t[Ct] = n;
    } catch (u) {
      it(e, e.return, u);
    }
  }
  var Ka = !1, Bt = !1, wc = !1, _h = typeof WeakSet == "function" ? WeakSet : Set, Gt = null;
  function _p(e, t) {
    if (e = e.containerInfo, Vc = Ko, e = y(e), g(e)) {
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
            var r = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, u.nodeType;
            } catch {
              n = null;
              break e;
            }
            var p = 0, v = -1, j = -1, G = 0, F = 0, W = e, X = null;
            t: for (; ; ) {
              for (var Z; W !== n || r !== 0 && W.nodeType !== 3 || (v = p + r), W !== u || a !== 0 && W.nodeType !== 3 || (j = p + a), W.nodeType === 3 && (p += W.nodeValue.length), (Z = W.firstChild) !== null; )
                X = W, W = Z;
              for (; ; ) {
                if (W === e) break t;
                if (X === n && ++G === r && (v = p), X === u && ++F === a && (j = p), (Z = W.nextSibling) !== null) break;
                W = X, X = W.parentNode;
              }
              W = Z;
            }
            n = v === -1 || j === -1 ? null : { start: v, end: j };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Xc = { focusedElem: e, selectionRange: n }, Ko = !1, Gt = t; Gt !== null; )
      if (t = Gt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Gt = e;
      else
        for (; Gt !== null; ) {
          switch (t = Gt, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  r = e[n], r.ref.impl = r.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, n = t, r = u.memoizedProps, u = u.memoizedState, a = n.stateNode;
                try {
                  var xe = hr(
                    n.type,
                    r
                  );
                  e = a.getSnapshotBeforeUpdate(
                    xe,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Te) {
                  it(
                    n,
                    n.return,
                    Te
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  Fc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Fc(e);
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
              if ((e & 1024) !== 0) throw Error(h(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Gt = e;
            break;
          }
          Gt = t.return;
        }
  }
  function jh(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Ga(e, n), a & 4 && lu(5, n);
        break;
      case 1:
        if (Ga(e, n), a & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (p) {
              it(n, n.return, p);
            }
          else {
            var r = hr(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                r,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (p) {
              it(
                n,
                n.return,
                p
              );
            }
          }
        a & 64 && gh(n), a & 512 && ru(n, n.return);
        break;
      case 3:
        if (Ga(e, n), a & 64 && (e = n.updateQueue, e !== null)) {
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
            ud(e, t);
          } catch (p) {
            it(n, n.return, p);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Sh(n);
      case 26:
      case 5:
        Ga(e, n), t === null && a & 4 && bh(n), a & 512 && ru(n, n.return);
        break;
      case 12:
        Ga(e, n);
        break;
      case 31:
        Ga(e, n), a & 4 && Ch(e, n);
        break;
      case 13:
        Ga(e, n), a & 4 && Nh(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Op.bind(
          null,
          n
        ), Pp(e, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || Ka, !a) {
          t = t !== null && t.memoizedState !== null || Bt, r = Ka;
          var u = Bt;
          Ka = a, (Bt = t) && !u ? Qa(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : Ga(e, n), Ka = r, Bt = u;
        }
        break;
      case 30:
        break;
      default:
        Ga(e, n);
    }
  }
  function wh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, wh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && jr(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var St = null, pn = !1;
  function Ya(e, t, n) {
    for (n = n.child; n !== null; )
      Eh(e, t, n), n = n.sibling;
  }
  function Eh(e, t, n) {
    if (Zt && typeof Zt.onCommitFiberUnmount == "function")
      try {
        Zt.onCommitFiberUnmount(ta, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Bt || ha(n, t), Ya(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Bt || ha(n, t);
        var a = St, r = pn;
        Cl(n.type) && (St = n.stateNode, pn = !1), Ya(
          e,
          t,
          n
        ), mu(n.stateNode), St = a, pn = r;
        break;
      case 5:
        Bt || ha(n, t);
      case 6:
        if (a = St, r = pn, St = null, Ya(
          e,
          t,
          n
        ), St = a, pn = r, St !== null)
          if (pn)
            try {
              (St.nodeType === 9 ? St.body : St.nodeName === "HTML" ? St.ownerDocument.body : St).removeChild(n.stateNode);
            } catch (u) {
              it(
                n,
                t,
                u
              );
            }
          else
            try {
              St.removeChild(n.stateNode);
            } catch (u) {
              it(
                n,
                t,
                u
              );
            }
        break;
      case 18:
        St !== null && (pn ? (e = St, gm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), di(e)) : gm(St, n.stateNode));
        break;
      case 4:
        a = St, r = pn, St = n.stateNode.containerInfo, pn = !0, Ya(
          e,
          t,
          n
        ), St = a, pn = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        bl(2, n, t), Bt || bl(4, n, t), Ya(
          e,
          t,
          n
        );
        break;
      case 1:
        Bt || (ha(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && vh(
          n,
          t,
          a
        )), Ya(
          e,
          t,
          n
        );
        break;
      case 21:
        Ya(
          e,
          t,
          n
        );
        break;
      case 22:
        Bt = (a = Bt) || n.memoizedState !== null, Ya(
          e,
          t,
          n
        ), Bt = a;
        break;
      default:
        Ya(
          e,
          t,
          n
        );
    }
  }
  function Ch(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        di(e);
      } catch (n) {
        it(t, t.return, n);
      }
    }
  }
  function Nh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        di(e);
      } catch (n) {
        it(t, t.return, n);
      }
  }
  function jp(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new _h()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new _h()), t;
      default:
        throw Error(h(435, e.tag));
    }
  }
  function So(e, t) {
    var n = jp(e);
    t.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var r = zp.bind(null, e, a);
        a.then(r, r);
      }
    });
  }
  function yn(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var r = n[a], u = e, p = t, v = p;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Cl(v.type)) {
                St = v.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              St = v.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              St = v.stateNode.containerInfo, pn = !0;
              break e;
          }
          v = v.return;
        }
        if (St === null) throw Error(h(160));
        Eh(u, p, r), St = null, pn = !1, u = r.alternate, u !== null && (u.return = null), r.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Th(t, e), t = t.sibling;
  }
  var Pn = null;
  function Th(e, t) {
    var n = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        yn(t, e), gn(e), a & 4 && (bl(3, e, e.return), lu(3, e), bl(5, e, e.return));
        break;
      case 1:
        yn(t, e), gn(e), a & 512 && (Bt || n === null || ha(n, n.return)), a & 64 && Ka && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var r = Pn;
        if (yn(t, e), gn(e), a & 512 && (Bt || n === null || ha(n, n.return)), a & 4) {
          var u = n !== null ? n.memoizedState : null;
          if (a = e.memoizedState, n === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, n = e.memoizedProps, r = r.ownerDocument || r;
                  t: switch (a) {
                    case "title":
                      u = r.getElementsByTagName("title")[0], (!u || u[wn] || u[mt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = r.createElement(a), r.head.insertBefore(
                        u,
                        r.querySelector("head > title")
                      )), Wt(u, a, n), u[mt] = e, Nt(u), a = u;
                      break e;
                    case "link":
                      var p = Tm(
                        "link",
                        "href",
                        r
                      ).get(a + (n.href || ""));
                      if (p) {
                        for (var v = 0; v < p.length; v++)
                          if (u = p[v], u.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && u.getAttribute("rel") === (n.rel == null ? null : n.rel) && u.getAttribute("title") === (n.title == null ? null : n.title) && u.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            p.splice(v, 1);
                            break t;
                          }
                      }
                      u = r.createElement(a), Wt(u, a, n), r.head.appendChild(u);
                      break;
                    case "meta":
                      if (p = Tm(
                        "meta",
                        "content",
                        r
                      ).get(a + (n.content || ""))) {
                        for (v = 0; v < p.length; v++)
                          if (u = p[v], u.getAttribute("content") === (n.content == null ? null : "" + n.content) && u.getAttribute("name") === (n.name == null ? null : n.name) && u.getAttribute("property") === (n.property == null ? null : n.property) && u.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && u.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            p.splice(v, 1);
                            break t;
                          }
                      }
                      u = r.createElement(a), Wt(u, a, n), r.head.appendChild(u);
                      break;
                    default:
                      throw Error(h(468, a));
                  }
                  u[mt] = e, Nt(u), a = u;
                }
                e.stateNode = a;
              } else
                Am(
                  r,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Nm(
                r,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : u.count--, a === null ? Am(
              r,
              e.type,
              e.stateNode
            ) : Nm(
              r,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Sc(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        yn(t, e), gn(e), a & 512 && (Bt || n === null || ha(n, n.return)), n !== null && a & 4 && Sc(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (yn(t, e), gn(e), a & 512 && (Bt || n === null || ha(n, n.return)), e.flags & 32) {
          r = e.stateNode;
          try {
            wa(r, "");
          } catch (xe) {
            it(e, e.return, xe);
          }
        }
        a & 4 && e.stateNode != null && (r = e.memoizedProps, Sc(
          e,
          r,
          n !== null ? n.memoizedProps : r
        )), a & 1024 && (wc = !0);
        break;
      case 6:
        if (yn(t, e), gn(e), a & 4) {
          if (e.stateNode === null)
            throw Error(h(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (xe) {
            it(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (Bo = null, r = Pn, Pn = Ro(t.containerInfo), yn(t, e), Pn = r, gn(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            di(t.containerInfo);
          } catch (xe) {
            it(e, e.return, xe);
          }
        wc && (wc = !1, Ah(e));
        break;
      case 4:
        a = Pn, Pn = Ro(
          e.stateNode.containerInfo
        ), yn(t, e), gn(e), Pn = a;
        break;
      case 12:
        yn(t, e), gn(e);
        break;
      case 31:
        yn(t, e), gn(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, So(e, a)));
        break;
      case 13:
        yn(t, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (jo = tn()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, So(e, a)));
        break;
      case 22:
        r = e.memoizedState !== null;
        var j = n !== null && n.memoizedState !== null, G = Ka, F = Bt;
        if (Ka = G || r, Bt = F || j, yn(t, e), Bt = F, Ka = G, gn(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = r ? t._visibility & -2 : t._visibility | 1, r && (n === null || j || Ka || Bt || mr(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                j = n = t;
                try {
                  if (u = j.stateNode, r)
                    p = u.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none";
                  else {
                    v = j.stateNode;
                    var W = j.memoizedProps.style, X = W != null && W.hasOwnProperty("display") ? W.display : null;
                    v.style.display = X == null || typeof X == "boolean" ? "" : ("" + X).trim();
                  }
                } catch (xe) {
                  it(j, j.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = r ? "" : j.memoizedProps;
                } catch (xe) {
                  it(j, j.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                j = t;
                try {
                  var Z = j.stateNode;
                  r ? vm(Z, !0) : vm(j.stateNode, !1);
                } catch (xe) {
                  it(j, j.return, xe);
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
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, So(e, n))));
        break;
      case 19:
        yn(t, e), gn(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, So(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        yn(t, e), gn(e);
    }
  }
  function gn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (xh(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(h(160));
        switch (n.tag) {
          case 27:
            var r = n.stateNode, u = _c(e);
            xo(e, u, r);
            break;
          case 5:
            var p = n.stateNode;
            n.flags & 32 && (wa(p, ""), n.flags &= -33);
            var v = _c(e);
            xo(e, v, p);
            break;
          case 3:
          case 4:
            var j = n.stateNode.containerInfo, G = _c(e);
            jc(
              e,
              G,
              j
            );
            break;
          default:
            throw Error(h(161));
        }
      } catch (F) {
        it(e, e.return, F);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ah(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ah(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Ga(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        jh(e, t.alternate, t), t = t.sibling;
  }
  function mr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          bl(4, t, t.return), mr(t);
          break;
        case 1:
          ha(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && vh(
            t,
            t.return,
            n
          ), mr(t);
          break;
        case 27:
          mu(t.stateNode);
        case 26:
        case 5:
          ha(t, t.return), mr(t);
          break;
        case 22:
          t.memoizedState === null && mr(t);
          break;
        case 30:
          mr(t);
          break;
        default:
          mr(t);
      }
      e = e.sibling;
    }
  }
  function Qa(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, r = e, u = t, p = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Qa(
            r,
            u,
            n
          ), lu(4, u);
          break;
        case 1:
          if (Qa(
            r,
            u,
            n
          ), a = u, r = a.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (G) {
              it(a, a.return, G);
            }
          if (a = u, r = a.updateQueue, r !== null) {
            var v = a.stateNode;
            try {
              var j = r.shared.hiddenCallbacks;
              if (j !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < j.length; r++)
                  id(j[r], v);
            } catch (G) {
              it(a, a.return, G);
            }
          }
          n && p & 64 && gh(u), ru(u, u.return);
          break;
        case 27:
          Sh(u);
        case 26:
        case 5:
          Qa(
            r,
            u,
            n
          ), n && a === null && p & 4 && bh(u), ru(u, u.return);
          break;
        case 12:
          Qa(
            r,
            u,
            n
          );
          break;
        case 31:
          Qa(
            r,
            u,
            n
          ), n && p & 4 && Ch(r, u);
          break;
        case 13:
          Qa(
            r,
            u,
            n
          ), n && p & 4 && Nh(r, u);
          break;
        case 22:
          u.memoizedState === null && Qa(
            r,
            u,
            n
          ), ru(u, u.return);
          break;
        case 30:
          break;
        default:
          Qa(
            r,
            u,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Ec(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Vi(n));
  }
  function Cc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Vi(e));
  }
  function In(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        kh(
          e,
          t,
          n,
          a
        ), t = t.sibling;
  }
  function kh(e, t, n, a) {
    var r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        In(
          e,
          t,
          n,
          a
        ), r & 2048 && lu(9, t);
        break;
      case 1:
        In(
          e,
          t,
          n,
          a
        );
        break;
      case 3:
        In(
          e,
          t,
          n,
          a
        ), r & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Vi(e)));
        break;
      case 12:
        if (r & 2048) {
          In(
            e,
            t,
            n,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, p = u.id, v = u.onPostCommit;
            typeof v == "function" && v(
              p,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (j) {
            it(t, t.return, j);
          }
        } else
          In(
            e,
            t,
            n,
            a
          );
        break;
      case 31:
        In(
          e,
          t,
          n,
          a
        );
        break;
      case 13:
        In(
          e,
          t,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, p = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? In(
          e,
          t,
          n,
          a
        ) : iu(e, t) : u._visibility & 2 ? In(
          e,
          t,
          n,
          a
        ) : (u._visibility |= 2, ti(
          e,
          t,
          n,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), r & 2048 && Ec(p, t);
        break;
      case 24:
        In(
          e,
          t,
          n,
          a
        ), r & 2048 && Cc(t.alternate, t);
        break;
      default:
        In(
          e,
          t,
          n,
          a
        );
    }
  }
  function ti(e, t, n, a, r) {
    for (r = r && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, p = t, v = n, j = a, G = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          ti(
            u,
            p,
            v,
            j,
            r
          ), lu(8, p);
          break;
        case 23:
          break;
        case 22:
          var F = p.stateNode;
          p.memoizedState !== null ? F._visibility & 2 ? ti(
            u,
            p,
            v,
            j,
            r
          ) : iu(
            u,
            p
          ) : (F._visibility |= 2, ti(
            u,
            p,
            v,
            j,
            r
          )), r && G & 2048 && Ec(
            p.alternate,
            p
          );
          break;
        case 24:
          ti(
            u,
            p,
            v,
            j,
            r
          ), r && G & 2048 && Cc(p.alternate, p);
          break;
        default:
          ti(
            u,
            p,
            v,
            j,
            r
          );
      }
      t = t.sibling;
    }
  }
  function iu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, a = t, r = a.flags;
        switch (a.tag) {
          case 22:
            iu(n, a), r & 2048 && Ec(
              a.alternate,
              a
            );
            break;
          case 24:
            iu(n, a), r & 2048 && Cc(a.alternate, a);
            break;
          default:
            iu(n, a);
        }
        t = t.sibling;
      }
  }
  var uu = 8192;
  function ni(e, t, n) {
    if (e.subtreeFlags & uu)
      for (e = e.child; e !== null; )
        Oh(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Oh(e, t, n) {
    switch (e.tag) {
      case 26:
        ni(
          e,
          t,
          n
        ), e.flags & uu && e.memoizedState !== null && s1(
          n,
          Pn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ni(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var a = Pn;
        Pn = Ro(e.stateNode.containerInfo), ni(
          e,
          t,
          n
        ), Pn = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = uu, uu = 16777216, ni(
          e,
          t,
          n
        ), uu = a) : ni(
          e,
          t,
          n
        ));
        break;
      default:
        ni(
          e,
          t,
          n
        );
    }
  }
  function zh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ou(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          Gt = a, Dh(
            a,
            e
          );
        }
      zh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Mh(e), e = e.sibling;
  }
  function Mh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ou(e), e.flags & 2048 && bl(9, e, e.return);
        break;
      case 3:
        ou(e);
        break;
      case 12:
        ou(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, _o(e)) : ou(e);
        break;
      default:
        ou(e);
    }
  }
  function _o(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          Gt = a, Dh(
            a,
            e
          );
        }
      zh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          bl(8, t, t.return), _o(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, _o(t));
          break;
        default:
          _o(t);
      }
      e = e.sibling;
    }
  }
  function Dh(e, t) {
    for (; Gt !== null; ) {
      var n = Gt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          bl(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Vi(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, Gt = a;
      else
        e: for (n = e; Gt !== null; ) {
          a = Gt;
          var r = a.sibling, u = a.return;
          if (wh(a), a === n) {
            Gt = null;
            break e;
          }
          if (r !== null) {
            r.return = u, Gt = r;
            break e;
          }
          Gt = u;
        }
    }
  }
  var wp = {
    getCacheForType: function(e) {
      var t = Pt(Dt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return Pt(Dt).controller.signal;
    }
  }, Ep = typeof WeakMap == "function" ? WeakMap : Map, lt = 0, ht = null, Xe = null, Je = 0, rt = 0, kn = null, xl = !1, ai = !1, Nc = !1, Va = 0, jt = 0, Sl = 0, pr = 0, Tc = 0, On = 0, li = 0, su = null, vn = null, Ac = !1, jo = 0, Rh = 0, wo = 1 / 0, Eo = null, _l = null, qt = 0, jl = null, ri = null, Xa = 0, kc = 0, Oc = null, Uh = null, cu = 0, zc = null;
  function zn() {
    return (lt & 2) !== 0 && Je !== 0 ? Je & -Je : U.T !== null ? qc() : Yl();
  }
  function Bh() {
    if (On === 0)
      if ((Je & 536870912) === 0 || Ie) {
        var e = Pa;
        Pa <<= 1, (Pa & 3932160) === 0 && (Pa = 262144), On = e;
      } else On = 536870912;
    return e = Tn.current, e !== null && (e.flags |= 32), On;
  }
  function bn(e, t, n) {
    (e === ht && (rt === 2 || rt === 9) || e.cancelPendingCommit !== null) && (ii(e, 0), wl(
      e,
      Je,
      On,
      !1
    )), Mn(e, n), ((lt & 2) === 0 || e !== ht) && (e === ht && ((lt & 2) === 0 && (pr |= n), jt === 4 && wl(
      e,
      Je,
      On,
      !1
    )), ma(e));
  }
  function qh(e, t, n) {
    if ((lt & 6) !== 0) throw Error(h(327));
    var a = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Sa(e, t), r = a ? Tp(e, t) : Dc(e, t, !0), u = a;
    do {
      if (r === 0) {
        ai && !a && wl(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, u && !Cp(n)) {
          r = Dc(e, t, !1), u = !1;
          continue;
        }
        if (r === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var p = 0;
          else
            p = e.pendingLanes & -536870913, p = p !== 0 ? p : p & 536870912 ? 536870912 : 0;
          if (p !== 0) {
            t = p;
            e: {
              var v = e;
              r = su;
              var j = v.current.memoizedState.isDehydrated;
              if (j && (ii(v, p).flags |= 256), p = Dc(
                v,
                p,
                !1
              ), p !== 2) {
                if (Nc && !j) {
                  v.errorRecoveryDisabledLanes |= u, pr |= u, r = 4;
                  break e;
                }
                u = vn, vn = r, u !== null && (vn === null ? vn = u : vn.push.apply(
                  vn,
                  u
                ));
              }
              r = p;
            }
            if (u = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          ii(e, 0), wl(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, u = r, u) {
            case 0:
            case 1:
              throw Error(h(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              wl(
                a,
                t,
                On,
                !xl
              );
              break e;
            case 2:
              vn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(h(329));
          }
          if ((t & 62914560) === t && (r = jo + 300 - tn(), 10 < r)) {
            if (wl(
              a,
              t,
              On,
              !xl
            ), Hl(a, 0, !0) !== 0) break e;
            Xa = t, a.timeoutHandle = pm(
              Lh.bind(
                null,
                a,
                n,
                vn,
                Eo,
                Ac,
                t,
                On,
                pr,
                li,
                xl,
                u,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break e;
          }
          Lh(
            a,
            n,
            vn,
            Eo,
            Ac,
            t,
            On,
            pr,
            li,
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
    ma(e);
  }
  function Lh(e, t, n, a, r, u, p, v, j, G, F, W, X, Z) {
    if (e.timeoutHandle = -1, W = t.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: hn
      }, Oh(
        t,
        u,
        W
      );
      var xe = (u & 62914560) === u ? jo - tn() : (u & 4194048) === u ? Rh - tn() : 0;
      if (xe = c1(
        W,
        xe
      ), xe !== null) {
        Xa = u, e.cancelPendingCommit = xe(
          Zh.bind(
            null,
            e,
            t,
            u,
            n,
            a,
            r,
            p,
            v,
            j,
            F,
            W,
            null,
            X,
            Z
          )
        ), wl(e, u, p, !G);
        return;
      }
    }
    Zh(
      e,
      t,
      u,
      n,
      a,
      r,
      p,
      v,
      j
    );
  }
  function Cp(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var r = n[a], u = r.getSnapshot;
          r = r.value;
          try {
            if (!ln(u(), r)) return !1;
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
  function wl(e, t, n, a) {
    t &= ~Tc, t &= ~pr, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var r = t; 0 < r; ) {
      var u = 31 - ye(r), p = 1 << u;
      a[u] = -1, r &= ~p;
    }
    n !== 0 && Kl(e, n, t);
  }
  function Co() {
    return (lt & 6) === 0 ? (fu(0), !1) : !0;
  }
  function Mc() {
    if (Xe !== null) {
      if (rt === 0)
        var e = Xe.return;
      else
        e = Xe, Ra = ir = null, Fs(e), $r = null, Zi = 0, e = Xe;
      for (; e !== null; )
        yh(e.alternate, e), e = e.return;
      Xe = null;
    }
  }
  function ii(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, Xp(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Xa = 0, Mc(), ht = e, Xe = n = Ma(e.current, null), Je = t, rt = 0, kn = null, xl = !1, ai = Sa(e, t), Nc = !1, li = On = Tc = pr = Sl = jt = 0, vn = su = null, Ac = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var r = 31 - ye(a), u = 1 << r;
        t |= e[r], a &= ~u;
      }
    return Va = t, Yt(), n;
  }
  function Hh(e, t) {
    Ke = null, U.H = tu, t === Fr || t === eo ? (t = nd(), rt = 3) : t === Bs ? (t = nd(), rt = 4) : rt = t === fc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, kn = t, Xe === null && (jt = 1, po(
      e,
      qn(t, e.current)
    ));
  }
  function Kh() {
    var e = Tn.current;
    return e === null ? !0 : (Je & 4194048) === Je ? Yn === null : (Je & 62914560) === Je || (Je & 536870912) !== 0 ? e === Yn : !1;
  }
  function Yh() {
    var e = U.H;
    return U.H = tu, e === null ? tu : e;
  }
  function Gh() {
    var e = U.A;
    return U.A = wp, e;
  }
  function No() {
    jt = 4, xl || (Je & 4194048) !== Je && Tn.current !== null || (ai = !0), (Sl & 134217727) === 0 && (pr & 134217727) === 0 || ht === null || wl(
      ht,
      Je,
      On,
      !1
    );
  }
  function Dc(e, t, n) {
    var a = lt;
    lt |= 2;
    var r = Yh(), u = Gh();
    (ht !== e || Je !== t) && (Eo = null, ii(e, t)), t = !1;
    var p = jt;
    e: do
      try {
        if (rt !== 0 && Xe !== null) {
          var v = Xe, j = kn;
          switch (rt) {
            case 8:
              Mc(), p = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Tn.current === null && (t = !0);
              var G = rt;
              if (rt = 0, kn = null, ui(e, v, j, G), n && ai) {
                p = 0;
                break e;
              }
              break;
            default:
              G = rt, rt = 0, kn = null, ui(e, v, j, G);
          }
        }
        Np(), p = jt;
        break;
      } catch (F) {
        Hh(e, F);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ra = ir = null, lt = a, U.H = r, U.A = u, Xe === null && (ht = null, Je = 0, Yt()), p;
  }
  function Np() {
    for (; Xe !== null; ) Qh(Xe);
  }
  function Tp(e, t) {
    var n = lt;
    lt |= 2;
    var a = Yh(), r = Gh();
    ht !== e || Je !== t ? (Eo = null, wo = tn() + 500, ii(e, t)) : ai = Sa(
      e,
      t
    );
    e: do
      try {
        if (rt !== 0 && Xe !== null) {
          t = Xe;
          var u = kn;
          t: switch (rt) {
            case 1:
              rt = 0, kn = null, ui(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (ed(u)) {
                rt = 0, kn = null, Vh(t);
                break;
              }
              t = function() {
                rt !== 2 && rt !== 9 || ht !== e || (rt = 7), ma(e);
              }, u.then(t, t);
              break e;
            case 3:
              rt = 7;
              break e;
            case 4:
              rt = 5;
              break e;
            case 7:
              ed(u) ? (rt = 0, kn = null, Vh(t)) : (rt = 0, kn = null, ui(e, t, u, 7));
              break;
            case 5:
              var p = null;
              switch (Xe.tag) {
                case 26:
                  p = Xe.memoizedState;
                case 5:
                case 27:
                  var v = Xe;
                  if (p ? km(p) : v.stateNode.complete) {
                    rt = 0, kn = null;
                    var j = v.sibling;
                    if (j !== null) Xe = j;
                    else {
                      var G = v.return;
                      G !== null ? (Xe = G, To(G)) : Xe = null;
                    }
                    break t;
                  }
              }
              rt = 0, kn = null, ui(e, t, u, 5);
              break;
            case 6:
              rt = 0, kn = null, ui(e, t, u, 6);
              break;
            case 8:
              Mc(), jt = 6;
              break e;
            default:
              throw Error(h(462));
          }
        }
        Ap();
        break;
      } catch (F) {
        Hh(e, F);
      }
    while (!0);
    return Ra = ir = null, U.H = a, U.A = r, lt = n, Xe !== null ? 0 : (ht = null, Je = 0, Yt(), jt);
  }
  function Ap() {
    for (; Xe !== null && !Mu(); )
      Qh(Xe);
  }
  function Qh(e) {
    var t = mh(e.alternate, e, Va);
    e.memoizedProps = e.pendingProps, t === null ? To(e) : Xe = t;
  }
  function Vh(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = oh(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Je
        );
        break;
      case 11:
        t = oh(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Je
        );
        break;
      case 5:
        Fs(t);
      default:
        yh(n, t), t = Xe = Gf(t, Va), t = mh(n, t, Va);
    }
    e.memoizedProps = e.pendingProps, t === null ? To(e) : Xe = t;
  }
  function ui(e, t, n, a) {
    Ra = ir = null, Fs(t), $r = null, Zi = 0;
    var r = t.return;
    try {
      if (gp(
        e,
        r,
        t,
        n,
        Je
      )) {
        jt = 1, po(
          e,
          qn(n, e.current)
        ), Xe = null;
        return;
      }
    } catch (u) {
      if (r !== null) throw Xe = r, u;
      jt = 1, po(
        e,
        qn(n, e.current)
      ), Xe = null;
      return;
    }
    t.flags & 32768 ? (Ie || a === 1 ? e = !0 : ai || (Je & 536870912) !== 0 ? e = !1 : (xl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Tn.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Xh(t, e)) : To(t);
  }
  function To(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Xh(
          t,
          xl
        );
        return;
      }
      e = t.return;
      var n = xp(
        t.alternate,
        t,
        Va
      );
      if (n !== null) {
        Xe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Xe = t;
        return;
      }
      Xe = t = e;
    } while (t !== null);
    jt === 0 && (jt = 5);
  }
  function Xh(e, t) {
    do {
      var n = Sp(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Xe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Xe = e;
        return;
      }
      Xe = e = n;
    } while (e !== null);
    jt = 6, Xe = null;
  }
  function Zh(e, t, n, a, r, u, p, v, j) {
    e.cancelPendingCommit = null;
    do
      Ao();
    while (qt !== 0);
    if ((lt & 6) !== 0) throw Error(h(327));
    if (t !== null) {
      if (t === e.current) throw Error(h(177));
      if (u = t.lanes | t.childLanes, u |= He, xi(
        e,
        n,
        u,
        p,
        v,
        j
      ), e === ht && (Xe = ht = null, Je = 0), ri = t, jl = e, Xa = n, kc = u, Oc = r, Uh = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Mp($a, function() {
        return Ih(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = U.T, U.T = null, r = te.p, te.p = 2, p = lt, lt |= 4;
        try {
          _p(e, t, n);
        } finally {
          lt = p, te.p = r, U.T = a;
        }
      }
      qt = 1, Jh(), Fh(), $h();
    }
  }
  function Jh() {
    if (qt === 1) {
      qt = 0;
      var e = jl, t = ri, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = U.T, U.T = null;
        var a = te.p;
        te.p = 2;
        var r = lt;
        lt |= 4;
        try {
          Th(t, e);
          var u = Xc, p = y(e.containerInfo), v = u.focusedElem, j = u.selectionRange;
          if (p !== v && v && v.ownerDocument && m(
            v.ownerDocument.documentElement,
            v
          )) {
            if (j !== null && g(v)) {
              var G = j.start, F = j.end;
              if (F === void 0 && (F = G), "selectionStart" in v)
                v.selectionStart = G, v.selectionEnd = Math.min(
                  F,
                  v.value.length
                );
              else {
                var W = v.ownerDocument || document, X = W && W.defaultView || window;
                if (X.getSelection) {
                  var Z = X.getSelection(), xe = v.textContent.length, Te = Math.min(j.start, xe), ct = j.end === void 0 ? Te : Math.min(j.end, xe);
                  !Z.extend && Te > ct && (p = ct, ct = Te, Te = p);
                  var H = f(
                    v,
                    Te
                  ), T = f(
                    v,
                    ct
                  );
                  if (H && T && (Z.rangeCount !== 1 || Z.anchorNode !== H.node || Z.anchorOffset !== H.offset || Z.focusNode !== T.node || Z.focusOffset !== T.offset)) {
                    var Y = W.createRange();
                    Y.setStart(H.node, H.offset), Z.removeAllRanges(), Te > ct ? (Z.addRange(Y), Z.extend(T.node, T.offset)) : (Y.setEnd(T.node, T.offset), Z.addRange(Y));
                  }
                }
              }
            }
            for (W = [], Z = v; Z = Z.parentNode; )
              Z.nodeType === 1 && W.push({
                element: Z,
                left: Z.scrollLeft,
                top: Z.scrollTop
              });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < W.length; v++) {
              var P = W[v];
              P.element.scrollLeft = P.left, P.element.scrollTop = P.top;
            }
          }
          Ko = !!Vc, Xc = Vc = null;
        } finally {
          lt = r, te.p = a, U.T = n;
        }
      }
      e.current = t, qt = 2;
    }
  }
  function Fh() {
    if (qt === 2) {
      qt = 0;
      var e = jl, t = ri, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = U.T, U.T = null;
        var a = te.p;
        te.p = 2;
        var r = lt;
        lt |= 4;
        try {
          jh(e, t.alternate, t);
        } finally {
          lt = r, te.p = a, U.T = n;
        }
      }
      qt = 3;
    }
  }
  function $h() {
    if (qt === 4 || qt === 3) {
      qt = 0, Rl();
      var e = jl, t = ri, n = Xa, a = Uh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? qt = 5 : (qt = 0, ri = jl = null, Ph(e, e.pendingLanes));
      var r = e.pendingLanes;
      if (r === 0 && (_l = null), Ia(n), t = t.stateNode, Zt && typeof Zt.onCommitFiberRoot == "function")
        try {
          Zt.onCommitFiberRoot(
            ta,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = U.T, r = te.p, te.p = 2, U.T = null;
        try {
          for (var u = e.onRecoverableError, p = 0; p < a.length; p++) {
            var v = a[p];
            u(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          U.T = t, te.p = r;
        }
      }
      (Xa & 3) !== 0 && Ao(), ma(e), r = e.pendingLanes, (n & 261930) !== 0 && (r & 42) !== 0 ? e === zc ? cu++ : (cu = 0, zc = e) : cu = 0, fu(0);
    }
  }
  function Ph(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Vi(t)));
  }
  function Ao() {
    return Jh(), Fh(), $h(), Ih();
  }
  function Ih() {
    if (qt !== 5) return !1;
    var e = jl, t = kc;
    kc = 0;
    var n = Ia(Xa), a = U.T, r = te.p;
    try {
      te.p = 32 > n ? 32 : n, U.T = null, n = Oc, Oc = null;
      var u = jl, p = Xa;
      if (qt = 0, ri = jl = null, Xa = 0, (lt & 6) !== 0) throw Error(h(331));
      var v = lt;
      if (lt |= 4, Mh(u.current), kh(
        u,
        u.current,
        p,
        n
      ), lt = v, fu(0, !1), Zt && typeof Zt.onPostCommitFiberRoot == "function")
        try {
          Zt.onPostCommitFiberRoot(ta, u);
        } catch {
        }
      return !0;
    } finally {
      te.p = r, U.T = a, Ph(e, t);
    }
  }
  function Wh(e, t, n) {
    t = qn(n, t), t = cc(e.stateNode, t, 2), e = yl(e, t, 2), e !== null && (Mn(e, 2), ma(e));
  }
  function it(e, t, n) {
    if (e.tag === 3)
      Wh(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Wh(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (_l === null || !_l.has(a))) {
            e = qn(n, e), n = eh(2), a = yl(t, n, 2), a !== null && (th(
              n,
              a,
              t,
              e
            ), Mn(a, 2), ma(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Rc(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Ep();
      var r = /* @__PURE__ */ new Set();
      a.set(t, r);
    } else
      r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r));
    r.has(n) || (Nc = !0, r.add(n), e = kp.bind(null, e, t, n), t.then(e, e));
  }
  function kp(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, ht === e && (Je & n) === n && (jt === 4 || jt === 3 && (Je & 62914560) === Je && 300 > tn() - jo ? (lt & 2) === 0 && ii(e, 0) : Tc |= n, li === Je && (li = 0)), ma(e);
  }
  function em(e, t) {
    t === 0 && (t = Du()), e = xt(e, t), e !== null && (Mn(e, t), ma(e));
  }
  function Op(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), em(e, n);
  }
  function zp(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(h(314));
    }
    a !== null && a.delete(t), em(e, n);
  }
  function Mp(e, t) {
    return Dl(e, t);
  }
  var ko = null, oi = null, Uc = !1, Oo = !1, Bc = !1, El = 0;
  function ma(e) {
    e !== oi && e.next === null && (oi === null ? ko = oi = e : oi = oi.next = e), Oo = !0, Uc || (Uc = !0, Rp());
  }
  function fu(e, t) {
    if (!Bc && Oo) {
      Bc = !0;
      do
        for (var n = !1, a = ko; a !== null; ) {
          if (e !== 0) {
            var r = a.pendingLanes;
            if (r === 0) var u = 0;
            else {
              var p = a.suspendedLanes, v = a.pingedLanes;
              u = (1 << 31 - ye(42 | e) + 1) - 1, u &= r & ~(p & ~v), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, lm(a, u));
          } else
            u = Je, u = Hl(
              a,
              a === ht ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Sa(a, u) || (n = !0, lm(a, u));
          a = a.next;
        }
      while (n);
      Bc = !1;
    }
  }
  function Dp() {
    tm();
  }
  function tm() {
    Oo = Uc = !1;
    var e = 0;
    El !== 0 && Vp() && (e = El);
    for (var t = tn(), n = null, a = ko; a !== null; ) {
      var r = a.next, u = nm(a, t);
      u === 0 ? (a.next = null, n === null ? ko = r : n.next = r, r === null && (oi = n)) : (n = a, (e !== 0 || (u & 3) !== 0) && (Oo = !0)), a = r;
    }
    qt !== 0 && qt !== 5 || fu(e), El !== 0 && (El = 0);
  }
  function nm(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, r = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var p = 31 - ye(u), v = 1 << p, j = r[p];
      j === -1 ? ((v & n) === 0 || (v & a) !== 0) && (r[p] = ps(v, t)) : j <= t && (e.expiredLanes |= v), u &= ~v;
    }
    if (t = ht, n = Je, n = Hl(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, n === 0 || e === t && (rt === 2 || rt === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && dn(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Sa(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && dn(a), Ia(n)) {
        case 2:
        case 8:
          n = ea;
          break;
        case 32:
          n = $a;
          break;
        case 268435456:
          n = xr;
          break;
        default:
          n = $a;
      }
      return a = am.bind(null, e), n = Dl(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && dn(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function am(e, t) {
    if (qt !== 0 && qt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Ao() && e.callbackNode !== n)
      return null;
    var a = Je;
    return a = Hl(
      e,
      e === ht ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (qh(e, a, t), nm(e, tn()), e.callbackNode != null && e.callbackNode === n ? am.bind(null, e) : null);
  }
  function lm(e, t) {
    if (Ao()) return null;
    qh(e, t, !0);
  }
  function Rp() {
    Zp(function() {
      (lt & 6) !== 0 ? Dl(
        Wn,
        Dp
      ) : tm();
    });
  }
  function qc() {
    if (El === 0) {
      var e = Zr;
      e === 0 && (e = he, he <<= 1, (he & 261888) === 0 && (he = 256)), El = e;
    }
    return El;
  }
  function rm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : $n("" + e);
  }
  function im(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Up(e, t, n, a, r) {
    if (t === "submit" && n && n.stateNode === r) {
      var u = rm(
        (r[Ct] || null).action
      ), p = a.submitter;
      p && (t = (t = p[Ct] || null) ? rm(t.formAction) : p.getAttribute("formAction"), t !== null && (u = t, p = null));
      var v = new Tr(
        "action",
        "action",
        null,
        a,
        r
      );
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (El !== 0) {
                  var j = p ? im(r, p) : new FormData(r);
                  lc(
                    n,
                    {
                      pending: !0,
                      data: j,
                      method: r.method,
                      action: u
                    },
                    null,
                    j
                  );
                }
              } else
                typeof u == "function" && (v.preventDefault(), j = p ? im(r, p) : new FormData(r), lc(
                  n,
                  {
                    pending: !0,
                    data: j,
                    method: r.method,
                    action: u
                  },
                  u,
                  j
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var Lc = 0; Lc < se.length; Lc++) {
    var Hc = se[Lc], Bp = Hc.toLowerCase(), qp = Hc[0].toUpperCase() + Hc.slice(1);
    ae(
      Bp,
      "on" + qp
    );
  }
  ae(K, "onAnimationEnd"), ae(V, "onAnimationIteration"), ae(J, "onAnimationStart"), ae("dblclick", "onDoubleClick"), ae("focusin", "onFocus"), ae("focusout", "onBlur"), ae(I, "onTransitionRun"), ae(ie, "onTransitionStart"), ae(ce, "onTransitionCancel"), ae(ne, "onTransitionEnd"), ia("onMouseEnter", ["mouseout", "mouseover"]), ia("onMouseLeave", ["mouseout", "mouseover"]), ia("onPointerEnter", ["pointerout", "pointerover"]), ia("onPointerLeave", ["pointerout", "pointerover"]), Jn(
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
  var du = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Lp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(du)
  );
  function um(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], r = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var p = a.length - 1; 0 <= p; p--) {
            var v = a[p], j = v.instance, G = v.currentTarget;
            if (v = v.listener, j !== u && r.isPropagationStopped())
              break e;
            u = v, r.currentTarget = G;
            try {
              u(r);
            } catch (F) {
              ge(F);
            }
            r.currentTarget = null, u = j;
          }
        else
          for (p = 0; p < a.length; p++) {
            if (v = a[p], j = v.instance, G = v.currentTarget, v = v.listener, j !== u && r.isPropagationStopped())
              break e;
            u = v, r.currentTarget = G;
            try {
              u(r);
            } catch (F) {
              ge(F);
            }
            r.currentTarget = null, u = j;
          }
      }
    }
  }
  function Ze(e, t) {
    var n = t[Wa];
    n === void 0 && (n = t[Wa] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (om(t, e, 2, !1), n.add(a));
  }
  function Kc(e, t, n) {
    var a = 0;
    t && (a |= 4), om(
      n,
      e,
      a,
      t
    );
  }
  var zo = "_reactListening" + Math.random().toString(36).slice(2);
  function Yc(e) {
    if (!e[zo]) {
      e[zo] = !0, _a.forEach(function(n) {
        n !== "selectionchange" && (Lp.has(n) || Kc(n, !1, e), Kc(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[zo] || (t[zo] = !0, Kc("selectionchange", !1, t));
    }
  }
  function om(e, t, n, a) {
    switch (Bm(t)) {
      case 2:
        var r = h1;
        break;
      case 8:
        r = m1;
        break;
      default:
        r = af;
    }
    n = r.bind(
      null,
      t,
      n,
      e
    ), r = void 0, !Ti || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), a ? r !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: r
    }) : e.addEventListener(t, n, !0) : r !== void 0 ? e.addEventListener(t, n, {
      passive: r
    }) : e.addEventListener(t, n, !1);
  }
  function Gc(e, t, n, a, r) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var p = a.tag;
        if (p === 3 || p === 4) {
          var v = a.stateNode.containerInfo;
          if (v === r) break;
          if (p === 4)
            for (p = a.return; p !== null; ) {
              var j = p.tag;
              if ((j === 3 || j === 4) && p.stateNode.containerInfo === r)
                return;
              p = p.return;
            }
          for (; v !== null; ) {
            if (p = ra(v), p === null) return;
            if (j = p.tag, j === 5 || j === 6 || j === 26 || j === 27) {
              a = u = p;
              continue e;
            }
            v = v.parentNode;
          }
        }
        a = a.return;
      }
    tl(function() {
      var G = u, F = Cr(n), W = [];
      e: {
        var X = ue.get(e);
        if (X !== void 0) {
          var Z = Tr, xe = e;
          switch (e) {
            case "keypress":
              if (ll(n) === 0) break e;
            case "keydown":
            case "keyup":
              Z = Rr;
              break;
            case "focusin":
              xe = "focus", Z = rl;
              break;
            case "focusout":
              xe = "blur", Z = rl;
              break;
            case "beforeblur":
            case "afterblur":
              Z = rl;
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
              Z = Or;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Z = qu;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Z = Ri;
              break;
            case K:
            case V:
            case J:
              Z = Lu;
              break;
            case ne:
              Z = Ui;
              break;
            case "scroll":
            case "scrollend":
              Z = Ar;
              break;
            case "wheel":
              Z = Br;
              break;
            case "copy":
            case "cut":
            case "paste":
              Z = il;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Z = Di;
              break;
            case "toggle":
            case "beforetoggle":
              Z = Yu;
          }
          var Te = (t & 4) !== 0, ct = !Te && (e === "scroll" || e === "scrollend"), H = Te ? X !== null ? X + "Capture" : null : X;
          Te = [];
          for (var T = G, Y; T !== null; ) {
            var P = T;
            if (Y = P.stateNode, P = P.tag, P !== 5 && P !== 26 && P !== 27 || Y === null || H === null || (P = Na(T, H), P != null && Te.push(
              hu(T, P, Y)
            )), ct) break;
            T = T.return;
          }
          0 < Te.length && (X = new Z(
            X,
            xe,
            null,
            n,
            F
          ), W.push({ event: X, listeners: Te }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (X = e === "mouseover" || e === "pointerover", Z = e === "mouseout" || e === "pointerout", X && n !== Rn && (xe = n.relatedTarget || n.fromElement) && (ra(xe) || xe[on]))
            break e;
          if ((Z || X) && (X = F.window === F ? F : (X = F.ownerDocument) ? X.defaultView || X.parentWindow : window, Z ? (xe = n.relatedTarget || n.toElement, Z = G, xe = xe ? ra(xe) : null, xe !== null && (ct = S(xe), Te = xe.tag, xe !== ct || Te !== 5 && Te !== 27 && Te !== 6) && (xe = null)) : (Z = null, xe = G), Z !== xe)) {
            if (Te = Or, P = "onMouseLeave", H = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (Te = Di, P = "onPointerLeave", H = "onPointerEnter", T = "pointer"), ct = Z == null ? X : En(Z), Y = xe == null ? X : En(xe), X = new Te(
              P,
              T + "leave",
              Z,
              n,
              F
            ), X.target = ct, X.relatedTarget = Y, P = null, ra(F) === G && (Te = new Te(
              H,
              T + "enter",
              xe,
              n,
              F
            ), Te.target = Y, Te.relatedTarget = ct, P = Te), ct = P, Z && xe)
              t: {
                for (Te = Hp, H = Z, T = xe, Y = 0, P = H; P; P = Te(P))
                  Y++;
                P = 0;
                for (var Ce = T; Ce; Ce = Te(Ce))
                  P++;
                for (; 0 < Y - P; )
                  H = Te(H), Y--;
                for (; 0 < P - Y; )
                  T = Te(T), P--;
                for (; Y--; ) {
                  if (H === T || T !== null && H === T.alternate) {
                    Te = H;
                    break t;
                  }
                  H = Te(H), T = Te(T);
                }
                Te = null;
              }
            else Te = null;
            Z !== null && sm(
              W,
              X,
              Z,
              Te,
              !1
            ), xe !== null && ct !== null && sm(
              W,
              ct,
              xe,
              Te,
              !0
            );
          }
        }
        e: {
          if (X = G ? En(G) : window, Z = X.nodeName && X.nodeName.toLowerCase(), Z === "select" || Z === "input" && X.type === "file")
            var tt = nr;
          else if (Hr(X))
            if (Bn)
              tt = sl;
            else {
              tt = za;
              var _e = Ju;
            }
          else
            Z = X.nodeName, !Z || Z.toLowerCase() !== "input" || X.type !== "checkbox" && X.type !== "radio" ? G && Ni(G.elementType) && (tt = nr) : tt = Ki;
          if (tt && (tt = tt(e, G))) {
            Hi(
              W,
              tt,
              n,
              F
            );
            break e;
          }
          _e && _e(e, X, G), e === "focusout" && G && X.type === "number" && G.memoizedProps.value != null && Jl(X, "number", X.value);
        }
        switch (_e = G ? En(G) : window, e) {
          case "focusin":
            (Hr(_e) || _e.contentEditable === "true") && (_ = _e, E = G, C = null);
            break;
          case "focusout":
            C = E = _ = null;
            break;
          case "mousedown":
            B = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            B = !1, w(W, n, F);
            break;
          case "selectionchange":
            if (b) break;
          case "keydown":
          case "keyup":
            w(W, n, F);
        }
        var Ye;
        if (er)
          e: {
            switch (e) {
              case "compositionstart":
                var Fe = "onCompositionStart";
                break e;
              case "compositionend":
                Fe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Fe = "onCompositionUpdate";
                break e;
            }
            Fe = void 0;
          }
        else
          Oa ? Li(e, n) && (Fe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Fe = "onCompositionStart");
        Fe && (qr && n.locale !== "ko" && (Oa || Fe !== "onCompositionStart" ? Fe === "onCompositionEnd" && Oa && (Ye = al()) : (Un = F, Nr = "value" in Un ? Un.value : Un.textContent, Oa = !0)), _e = Mo(G, Fe), 0 < _e.length && (Fe = new Dr(
          Fe,
          e,
          null,
          n,
          F
        ), W.push({ event: Fe, listeners: _e }), Ye ? Fe.data = Ye : (Ye = Qu(n), Ye !== null && (Fe.data = Ye)))), (Ye = Ss ? Vu(e, n) : _s(e, n)) && (Fe = Mo(G, "onBeforeInput"), 0 < Fe.length && (_e = new Dr(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          F
        ), W.push({
          event: _e,
          listeners: Fe
        }), _e.data = Ye)), Up(
          W,
          e,
          G,
          n,
          F
        );
      }
      um(W, t);
    });
  }
  function hu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Mo(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var r = e, u = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || u === null || (r = Na(e, n), r != null && a.unshift(
        hu(e, r, u)
      ), r = Na(e, t), r != null && a.push(
        hu(e, r, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function Hp(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function sm(e, t, n, a, r) {
    for (var u = t._reactName, p = []; n !== null && n !== a; ) {
      var v = n, j = v.alternate, G = v.stateNode;
      if (v = v.tag, j !== null && j === a) break;
      v !== 5 && v !== 26 && v !== 27 || G === null || (j = G, r ? (G = Na(n, u), G != null && p.unshift(
        hu(n, G, j)
      )) : r || (G = Na(n, u), G != null && p.push(
        hu(n, G, j)
      ))), n = n.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var Kp = /\r\n?/g, Yp = /\u0000|\uFFFD/g;
  function cm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Kp, `
`).replace(Yp, "");
  }
  function fm(e, t) {
    return t = cm(t), cm(e) === t;
  }
  function st(e, t, n, a, r, u) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || wa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && wa(e, "" + a);
        break;
      case "className":
        Xl(e, "class", a);
        break;
      case "tabIndex":
        Xl(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xl(e, n, a);
        break;
      case "style":
        Ci(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          Xl(e, "data", a);
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
        a = $n("" + a), e.setAttribute(n, a);
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
          typeof u == "function" && (n === "formAction" ? (t !== "input" && st(e, t, "name", r.name, r, null), st(
            e,
            t,
            "formEncType",
            r.formEncType,
            r,
            null
          ), st(
            e,
            t,
            "formMethod",
            r.formMethod,
            r,
            null
          ), st(
            e,
            t,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (st(e, t, "encType", r.encType, r, null), st(e, t, "method", r.method, r, null), st(e, t, "target", r.target, r, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = $n("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = hn);
        break;
      case "onScroll":
        a != null && Ze("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Ze("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(h(61));
          if (n = a.__html, n != null) {
            if (r.children != null) throw Error(h(60));
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
        n = $n("" + a), e.setAttributeNS(
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
        Ze("beforetoggle", e), Ze("toggle", e), Qe(e, "popover", a);
        break;
      case "xlinkActuate":
        Dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Qe(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = vs.get(n) || n, Qe(e, n, a));
    }
  }
  function Qc(e, t, n, a, r, u) {
    switch (n) {
      case "style":
        Ci(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(h(61));
          if (n = a.__html, n != null) {
            if (r.children != null) throw Error(h(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? wa(e, a) : (typeof a == "number" || typeof a == "bigint") && wa(e, "" + a);
        break;
      case "onScroll":
        a != null && Ze("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Ze("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = hn);
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
        if (!Ql.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (r = n.endsWith("Capture"), t = n.slice(2, r ? n.length - 7 : void 0), u = e[Ct] || null, u = u != null ? u[n] : null, typeof u == "function" && e.removeEventListener(t, u, r), typeof a == "function")) {
              typeof u != "function" && u !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, r);
              break e;
            }
            n in e ? e[n] = a : a === !0 ? e.setAttribute(n, "") : Qe(e, n, a);
          }
    }
  }
  function Wt(e, t, n) {
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
        Ze("error", e), Ze("load", e);
        var a = !1, r = !1, u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var p = n[u];
            if (p != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(h(137, t));
                default:
                  st(e, t, u, p, n, null);
              }
          }
        r && st(e, t, "srcSet", n.srcSet, n, null), a && st(e, t, "src", n.src, n, null);
        return;
      case "input":
        Ze("invalid", e);
        var v = u = p = r = null, j = null, G = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var F = n[a];
            if (F != null)
              switch (a) {
                case "name":
                  r = F;
                  break;
                case "type":
                  p = F;
                  break;
                case "checked":
                  j = F;
                  break;
                case "defaultChecked":
                  G = F;
                  break;
                case "value":
                  u = F;
                  break;
                case "defaultValue":
                  v = F;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (F != null)
                    throw Error(h(137, t));
                  break;
                default:
                  st(e, t, a, F, n, null);
              }
          }
        Er(
          e,
          u,
          v,
          j,
          G,
          p,
          r,
          !1
        );
        return;
      case "select":
        Ze("invalid", e), a = p = u = null;
        for (r in n)
          if (n.hasOwnProperty(r) && (v = n[r], v != null))
            switch (r) {
              case "value":
                u = v;
                break;
              case "defaultValue":
                p = v;
                break;
              case "multiple":
                a = v;
              default:
                st(e, t, r, v, n, null);
            }
        t = u, n = p, e.multiple = !!a, t != null ? Fn(e, !!a, t, !1) : n != null && Fn(e, !!a, n, !0);
        return;
      case "textarea":
        Ze("invalid", e), u = r = a = null;
        for (p in n)
          if (n.hasOwnProperty(p) && (v = n[p], v != null))
            switch (p) {
              case "value":
                a = v;
                break;
              case "defaultValue":
                r = v;
                break;
              case "children":
                u = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(h(91));
                break;
              default:
                st(e, t, p, v, n, null);
            }
        Fl(e, a, r, u);
        return;
      case "option":
        for (j in n)
          if (n.hasOwnProperty(j) && (a = n[j], a != null))
            switch (j) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                st(e, t, j, a, n, null);
            }
        return;
      case "dialog":
        Ze("beforetoggle", e), Ze("toggle", e), Ze("cancel", e), Ze("close", e);
        break;
      case "iframe":
      case "object":
        Ze("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < du.length; a++)
          Ze(du[a], e);
        break;
      case "image":
        Ze("error", e), Ze("load", e);
        break;
      case "details":
        Ze("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ze("error", e), Ze("load", e);
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
        for (G in n)
          if (n.hasOwnProperty(G) && (a = n[G], a != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(h(137, t));
              default:
                st(e, t, G, a, n, null);
            }
        return;
      default:
        if (Ni(t)) {
          for (F in n)
            n.hasOwnProperty(F) && (a = n[F], a !== void 0 && Qc(
              e,
              t,
              F,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (v in n)
      n.hasOwnProperty(v) && (a = n[v], a != null && st(e, t, v, a, n, null));
  }
  function Gp(e, t, n, a) {
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
        var r = null, u = null, p = null, v = null, j = null, G = null, F = null;
        for (Z in n) {
          var W = n[Z];
          if (n.hasOwnProperty(Z) && W != null)
            switch (Z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                j = W;
              default:
                a.hasOwnProperty(Z) || st(e, t, Z, null, a, W);
            }
        }
        for (var X in a) {
          var Z = a[X];
          if (W = n[X], a.hasOwnProperty(X) && (Z != null || W != null))
            switch (X) {
              case "type":
                u = Z;
                break;
              case "name":
                r = Z;
                break;
              case "checked":
                G = Z;
                break;
              case "defaultChecked":
                F = Z;
                break;
              case "value":
                p = Z;
                break;
              case "defaultValue":
                v = Z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Z != null)
                  throw Error(h(137, t));
                break;
              default:
                Z !== W && st(
                  e,
                  t,
                  X,
                  Z,
                  a,
                  W
                );
            }
        }
        ua(
          e,
          p,
          v,
          j,
          G,
          F,
          u,
          r
        );
        return;
      case "select":
        Z = p = v = X = null;
        for (u in n)
          if (j = n[u], n.hasOwnProperty(u) && j != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                Z = j;
              default:
                a.hasOwnProperty(u) || st(
                  e,
                  t,
                  u,
                  null,
                  a,
                  j
                );
            }
        for (r in a)
          if (u = a[r], j = n[r], a.hasOwnProperty(r) && (u != null || j != null))
            switch (r) {
              case "value":
                X = u;
                break;
              case "defaultValue":
                v = u;
                break;
              case "multiple":
                p = u;
              default:
                u !== j && st(
                  e,
                  t,
                  r,
                  u,
                  a,
                  j
                );
            }
        t = v, n = p, a = Z, X != null ? Fn(e, !!n, X, !1) : !!a != !!n && (t != null ? Fn(e, !!n, t, !0) : Fn(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        Z = X = null;
        for (v in n)
          if (r = n[v], n.hasOwnProperty(v) && r != null && !a.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                st(e, t, v, null, a, r);
            }
        for (p in a)
          if (r = a[p], u = n[p], a.hasOwnProperty(p) && (r != null || u != null))
            switch (p) {
              case "value":
                X = r;
                break;
              case "defaultValue":
                Z = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(h(91));
                break;
              default:
                r !== u && st(e, t, p, r, a, u);
            }
        Ei(e, X, Z);
        return;
      case "option":
        for (var xe in n)
          if (X = n[xe], n.hasOwnProperty(xe) && X != null && !a.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                st(
                  e,
                  t,
                  xe,
                  null,
                  a,
                  X
                );
            }
        for (j in a)
          if (X = a[j], Z = n[j], a.hasOwnProperty(j) && X !== Z && (X != null || Z != null))
            switch (j) {
              case "selected":
                e.selected = X && typeof X != "function" && typeof X != "symbol";
                break;
              default:
                st(
                  e,
                  t,
                  j,
                  X,
                  a,
                  Z
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
        for (var Te in n)
          X = n[Te], n.hasOwnProperty(Te) && X != null && !a.hasOwnProperty(Te) && st(e, t, Te, null, a, X);
        for (G in a)
          if (X = a[G], Z = n[G], a.hasOwnProperty(G) && X !== Z && (X != null || Z != null))
            switch (G) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(h(137, t));
                break;
              default:
                st(
                  e,
                  t,
                  G,
                  X,
                  a,
                  Z
                );
            }
        return;
      default:
        if (Ni(t)) {
          for (var ct in n)
            X = n[ct], n.hasOwnProperty(ct) && X !== void 0 && !a.hasOwnProperty(ct) && Qc(
              e,
              t,
              ct,
              void 0,
              a,
              X
            );
          for (F in a)
            X = a[F], Z = n[F], !a.hasOwnProperty(F) || X === Z || X === void 0 && Z === void 0 || Qc(
              e,
              t,
              F,
              X,
              a,
              Z
            );
          return;
        }
    }
    for (var H in n)
      X = n[H], n.hasOwnProperty(H) && X != null && !a.hasOwnProperty(H) && st(e, t, H, null, a, X);
    for (W in a)
      X = a[W], Z = n[W], !a.hasOwnProperty(W) || X === Z || X == null && Z == null || st(e, t, W, X, a, Z);
  }
  function dm(e) {
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
  function Qp() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var r = n[a], u = r.transferSize, p = r.initiatorType, v = r.duration;
        if (u && v && dm(p)) {
          for (p = 0, v = r.responseEnd, a += 1; a < n.length; a++) {
            var j = n[a], G = j.startTime;
            if (G > v) break;
            var F = j.transferSize, W = j.initiatorType;
            F && dm(W) && (j = j.responseEnd, p += F * (j < v ? 1 : (v - G) / (j - G)));
          }
          if (--a, t += 8 * (u + p) / (r.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Vc = null, Xc = null;
  function Do(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function hm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function mm(e, t) {
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
  function Zc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jc = null;
  function Vp() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Jc ? !1 : (Jc = e, !0) : (Jc = null, !1);
  }
  var pm = typeof setTimeout == "function" ? setTimeout : void 0, Xp = typeof clearTimeout == "function" ? clearTimeout : void 0, ym = typeof Promise == "function" ? Promise : void 0, Zp = typeof queueMicrotask == "function" ? queueMicrotask : typeof ym < "u" ? function(e) {
    return ym.resolve(null).then(e).catch(Jp);
  } : pm;
  function Jp(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Cl(e) {
    return e === "head";
  }
  function gm(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === 8)
        if (n = r.data, n === "/$" || n === "/&") {
          if (a === 0) {
            e.removeChild(r), di(t);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          mu(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, mu(n);
          for (var u = n.firstChild; u; ) {
            var p = u.nextSibling, v = u.nodeName;
            u[wn] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = p;
          }
        } else
          n === "body" && mu(e.ownerDocument.body);
      n = r;
    } while (n);
    di(t);
  }
  function vm(e, t) {
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
  function Fc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Fc(n), jr(n);
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
  function Fp(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var r = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[wn])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== r.rel || e.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || e.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || e.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (r.src == null ? null : r.src) || e.getAttribute("type") !== (r.type == null ? null : r.type) || e.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Gn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function $p(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Gn(e.nextSibling), e === null)) return null;
    return e;
  }
  function bm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Gn(e.nextSibling), e === null)) return null;
    return e;
  }
  function $c(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Pc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Pp(e, t) {
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
  function Gn(e) {
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
  var Ic = null;
  function xm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Gn(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Sm(e) {
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
  function _m(e, t, n) {
    switch (t = Do(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(h(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(h(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(h(454));
        return e;
      default:
        throw Error(h(451));
    }
  }
  function mu(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    jr(e);
  }
  var Qn = /* @__PURE__ */ new Map(), jm = /* @__PURE__ */ new Set();
  function Ro(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Za = te.d;
  te.d = {
    f: Ip,
    r: Wp,
    D: e1,
    C: t1,
    L: n1,
    m: a1,
    X: r1,
    S: l1,
    M: i1
  };
  function Ip() {
    var e = Za.f(), t = Co();
    return e || t;
  }
  function Wp(e) {
    var t = ut(e);
    t !== null && t.tag === 5 && t.type === "form" ? Hd(t) : Za.r(e);
  }
  var si = typeof document > "u" ? null : document;
  function wm(e, t, n) {
    var a = si;
    if (a && typeof t == "string" && t) {
      var r = Lt(t);
      r = 'link[rel="' + e + '"][href="' + r + '"]', typeof n == "string" && (r += '[crossorigin="' + n + '"]'), jm.has(r) || (jm.add(r), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(r) === null && (t = a.createElement("link"), Wt(t, "link", e), Nt(t), a.head.appendChild(t)));
    }
  }
  function e1(e) {
    Za.D(e), wm("dns-prefetch", e, null);
  }
  function t1(e, t) {
    Za.C(e, t), wm("preconnect", e, t);
  }
  function n1(e, t, n) {
    Za.L(e, t, n);
    var a = si;
    if (a && e && t) {
      var r = 'link[rel="preload"][as="' + Lt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (r += '[imagesrcset="' + Lt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (r += '[imagesizes="' + Lt(
        n.imageSizes
      ) + '"]')) : r += '[href="' + Lt(e) + '"]';
      var u = r;
      switch (t) {
        case "style":
          u = ci(e);
          break;
        case "script":
          u = fi(e);
      }
      Qn.has(u) || (e = Q(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Qn.set(u, e), a.querySelector(r) !== null || t === "style" && a.querySelector(pu(u)) || t === "script" && a.querySelector(yu(u)) || (t = a.createElement("link"), Wt(t, "link", e), Nt(t), a.head.appendChild(t)));
    }
  }
  function a1(e, t) {
    Za.m(e, t);
    var n = si;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", r = 'link[rel="modulepreload"][as="' + Lt(a) + '"][href="' + Lt(e) + '"]', u = r;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = fi(e);
      }
      if (!Qn.has(u) && (e = Q({ rel: "modulepreload", href: e }, t), Qn.set(u, e), n.querySelector(r) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(yu(u)))
              return;
        }
        a = n.createElement("link"), Wt(a, "link", e), Nt(a), n.head.appendChild(a);
      }
    }
  }
  function l1(e, t, n) {
    Za.S(e, t, n);
    var a = si;
    if (a && e) {
      var r = nn(a).hoistableStyles, u = ci(e);
      t = t || "default";
      var p = r.get(u);
      if (!p) {
        var v = { loading: 0, preload: null };
        if (p = a.querySelector(
          pu(u)
        ))
          v.loading = 5;
        else {
          e = Q(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Qn.get(u)) && Wc(e, n);
          var j = p = a.createElement("link");
          Nt(j), Wt(j, "link", e), j._p = new Promise(function(G, F) {
            j.onload = G, j.onerror = F;
          }), j.addEventListener("load", function() {
            v.loading |= 1;
          }), j.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, Uo(p, t, a);
        }
        p = {
          type: "stylesheet",
          instance: p,
          count: 1,
          state: v
        }, r.set(u, p);
      }
    }
  }
  function r1(e, t) {
    Za.X(e, t);
    var n = si;
    if (n && e) {
      var a = nn(n).hoistableScripts, r = fi(e), u = a.get(r);
      u || (u = n.querySelector(yu(r)), u || (e = Q({ src: e, async: !0 }, t), (t = Qn.get(r)) && ef(e, t), u = n.createElement("script"), Nt(u), Wt(u, "link", e), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(r, u));
    }
  }
  function i1(e, t) {
    Za.M(e, t);
    var n = si;
    if (n && e) {
      var a = nn(n).hoistableScripts, r = fi(e), u = a.get(r);
      u || (u = n.querySelector(yu(r)), u || (e = Q({ src: e, async: !0, type: "module" }, t), (t = Qn.get(r)) && ef(e, t), u = n.createElement("script"), Nt(u), Wt(u, "link", e), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(r, u));
    }
  }
  function Em(e, t, n, a) {
    var r = (r = qe.current) ? Ro(r) : null;
    if (!r) throw Error(h(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = ci(n.href), n = nn(
          r
        ).hoistableStyles, a = n.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = ci(n.href);
          var u = nn(
            r
          ).hoistableStyles, p = u.get(e);
          if (p || (r = r.ownerDocument || r, p = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, p), (u = r.querySelector(
            pu(e)
          )) && !u._p && (p.instance = u, p.state.loading = 5), Qn.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Qn.set(e, n), u || u1(
            r,
            e,
            n,
            p.state
          ))), t && a === null)
            throw Error(h(528, ""));
          return p;
        }
        if (t && a !== null)
          throw Error(h(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = fi(n), n = nn(
          r
        ).hoistableScripts, a = n.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(h(444, e));
    }
  }
  function ci(e) {
    return 'href="' + Lt(e) + '"';
  }
  function pu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Cm(e) {
    return Q({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function u1(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Wt(t, "link", n), Nt(t), e.head.appendChild(t));
  }
  function fi(e) {
    return '[src="' + Lt(e) + '"]';
  }
  function yu(e) {
    return "script[async]" + e;
  }
  function Nm(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Lt(n.href) + '"]'
          );
          if (a)
            return t.instance = a, Nt(a), a;
          var r = Q({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), Nt(a), Wt(a, "style", r), Uo(a, n.precedence, e), t.instance = a;
        case "stylesheet":
          r = ci(n.href);
          var u = e.querySelector(
            pu(r)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Nt(u), u;
          a = Cm(n), (r = Qn.get(r)) && Wc(a, r), u = (e.ownerDocument || e).createElement("link"), Nt(u);
          var p = u;
          return p._p = new Promise(function(v, j) {
            p.onload = v, p.onerror = j;
          }), Wt(u, "link", a), t.state.loading |= 4, Uo(u, n.precedence, e), t.instance = u;
        case "script":
          return u = fi(n.src), (r = e.querySelector(
            yu(u)
          )) ? (t.instance = r, Nt(r), r) : (a = n, (r = Qn.get(u)) && (a = Q({}, n), ef(a, r)), e = e.ownerDocument || e, r = e.createElement("script"), Nt(r), Wt(r, "link", a), e.head.appendChild(r), t.instance = r);
        case "void":
          return null;
        default:
          throw Error(h(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Uo(a, n.precedence, e));
    return t.instance;
  }
  function Uo(e, t, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = a.length ? a[a.length - 1] : null, u = r, p = 0; p < a.length; p++) {
      var v = a[p];
      if (v.dataset.precedence === t) u = v;
      else if (u !== r) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Wc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function ef(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Bo = null;
  function Tm(e, t, n) {
    if (Bo === null) {
      var a = /* @__PURE__ */ new Map(), r = Bo = /* @__PURE__ */ new Map();
      r.set(n, a);
    } else
      r = Bo, a = r.get(n), a || (a = /* @__PURE__ */ new Map(), r.set(n, a));
    if (a.has(e)) return a;
    for (a.set(e, null), n = n.getElementsByTagName(e), r = 0; r < n.length; r++) {
      var u = n[r];
      if (!(u[wn] || u[mt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var p = u.getAttribute(t) || "";
        p = e + p;
        var v = a.get(p);
        v ? v.push(u) : a.set(p, [u]);
      }
    }
    return a;
  }
  function Am(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function o1(e, t, n) {
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
  function km(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function s1(e, t, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var r = ci(a.href), u = t.querySelector(
          pu(r)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = qo.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = u, Nt(u);
          return;
        }
        u = t.ownerDocument || t, a = Cm(a), (r = Qn.get(r)) && Wc(a, r), u = u.createElement("link"), Nt(u);
        var p = u;
        p._p = new Promise(function(v, j) {
          p.onload = v, p.onerror = j;
        }), Wt(u, "link", a), n.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = qo.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var tf = 0;
  function c1(e, t) {
    return e.stylesheets && e.count === 0 && Ho(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (e.stylesheets && Ho(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && tf === 0 && (tf = 62500 * Qp());
      var r = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ho(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > tf ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(r);
      };
    } : null;
  }
  function qo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ho(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Lo = null;
  function Ho(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Lo = /* @__PURE__ */ new Map(), t.forEach(f1, e), Lo = null, qo.call(e));
  }
  function f1(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Lo.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Lo.set(e, n);
        for (var r = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < r.length; u++) {
          var p = r[u];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") && (n.set(p.dataset.precedence, p), a = p);
        }
        a && n.set(null, a);
      }
      r = t.instance, p = r.getAttribute("data-precedence"), u = n.get(p) || a, u === a && n.set(null, r), n.set(p, r), this.count++, a = qo.bind(this), r.addEventListener("load", a), r.addEventListener("error", a), u ? u.parentNode.insertBefore(r, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(r, e.firstChild)), t.state.loading |= 4;
    }
  }
  var gu = {
    $$typeof: fe,
    Provider: null,
    Consumer: null,
    _currentValue: je,
    _currentValue2: je,
    _threadCount: 0
  };
  function d1(e, t, n, a, r, u, p, v, j) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = na(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = na(0), this.hiddenUpdates = na(null), this.identifierPrefix = a, this.onUncaughtError = r, this.onCaughtError = u, this.onRecoverableError = p, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Om(e, t, n, a, r, u, p, v, j, G, F, W) {
    return e = new d1(
      e,
      t,
      n,
      p,
      j,
      G,
      F,
      W,
      v
    ), t = 1, u === !0 && (t |= 24), u = Nn(3, null, null, t), e.current = u, u.stateNode = e, t = Ds(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: t
    }, qs(u), e;
  }
  function zm(e) {
    return e ? (e = mn, e) : mn;
  }
  function Mm(e, t, n, a, r, u) {
    r = zm(r), a.context === null ? a.context = r : a.pendingContext = r, a = pl(t), a.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (a.callback = u), n = yl(e, a, t), n !== null && (bn(n, e, t), Fi(n, e, t));
  }
  function Dm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function nf(e, t) {
    Dm(e, t), (e = e.alternate) && Dm(e, t);
  }
  function Rm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xt(e, 67108864);
      t !== null && bn(t, e, 67108864), nf(e, 67108864);
    }
  }
  function Um(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zn();
      t = Si(t);
      var n = xt(e, t);
      n !== null && bn(n, e, t), nf(e, t);
    }
  }
  var Ko = !0;
  function h1(e, t, n, a) {
    var r = U.T;
    U.T = null;
    var u = te.p;
    try {
      te.p = 2, af(e, t, n, a);
    } finally {
      te.p = u, U.T = r;
    }
  }
  function m1(e, t, n, a) {
    var r = U.T;
    U.T = null;
    var u = te.p;
    try {
      te.p = 8, af(e, t, n, a);
    } finally {
      te.p = u, U.T = r;
    }
  }
  function af(e, t, n, a) {
    if (Ko) {
      var r = lf(a);
      if (r === null)
        Gc(
          e,
          t,
          a,
          Yo,
          n
        ), qm(e, a);
      else if (y1(
        r,
        e,
        t,
        n,
        a
      ))
        a.stopPropagation();
      else if (qm(e, a), t & 4 && -1 < p1.indexOf(e)) {
        for (; r !== null; ) {
          var u = ut(r);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var p = Zn(u.pendingLanes);
                  if (p !== 0) {
                    var v = u;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; p; ) {
                      var j = 1 << 31 - ye(p);
                      v.entanglements[1] |= j, p &= ~j;
                    }
                    ma(u), (lt & 6) === 0 && (wo = tn() + 500, fu(0));
                  }
                }
                break;
              case 31:
              case 13:
                v = xt(u, 2), v !== null && bn(v, u, 2), Co(), nf(u, 2);
            }
          if (u = lf(a), u === null && Gc(
            e,
            t,
            a,
            Yo,
            n
          ), u === r) break;
          r = u;
        }
        r !== null && a.stopPropagation();
      } else
        Gc(
          e,
          t,
          a,
          null,
          n
        );
    }
  }
  function lf(e) {
    return e = Cr(e), rf(e);
  }
  var Yo = null;
  function rf(e) {
    if (Yo = null, e = ra(e), e !== null) {
      var t = S(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = M(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = R(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Yo = e, null;
  }
  function Bm(e) {
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
        switch (Ul()) {
          case Wn:
            return 2;
          case ea:
            return 8;
          case $a:
          case Bl:
            return 32;
          case xr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var uf = !1, Nl = null, Tl = null, Al = null, vu = /* @__PURE__ */ new Map(), bu = /* @__PURE__ */ new Map(), kl = [], p1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function qm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Nl = null;
        break;
      case "dragenter":
      case "dragleave":
        Tl = null;
        break;
      case "mouseover":
      case "mouseout":
        Al = null;
        break;
      case "pointerover":
      case "pointerout":
        vu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bu.delete(t.pointerId);
    }
  }
  function xu(e, t, n, a, r, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [r]
    }, t !== null && (t = ut(t), t !== null && Rm(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
  }
  function y1(e, t, n, a, r) {
    switch (t) {
      case "focusin":
        return Nl = xu(
          Nl,
          e,
          t,
          n,
          a,
          r
        ), !0;
      case "dragenter":
        return Tl = xu(
          Tl,
          e,
          t,
          n,
          a,
          r
        ), !0;
      case "mouseover":
        return Al = xu(
          Al,
          e,
          t,
          n,
          a,
          r
        ), !0;
      case "pointerover":
        var u = r.pointerId;
        return vu.set(
          u,
          xu(
            vu.get(u) || null,
            e,
            t,
            n,
            a,
            r
          )
        ), !0;
      case "gotpointercapture":
        return u = r.pointerId, bu.set(
          u,
          xu(
            bu.get(u) || null,
            e,
            t,
            n,
            a,
            r
          )
        ), !0;
    }
    return !1;
  }
  function Lm(e) {
    var t = ra(e.target);
    if (t !== null) {
      var n = S(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = M(n), t !== null) {
            e.blockedOn = t, Gl(e.priority, function() {
              Um(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = R(n), t !== null) {
            e.blockedOn = t, Gl(e.priority, function() {
              Um(n);
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
  function Go(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = lf(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        Rn = a, n.target.dispatchEvent(a), Rn = null;
      } else
        return t = ut(n), t !== null && Rm(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Hm(e, t, n) {
    Go(e) && n.delete(t);
  }
  function g1() {
    uf = !1, Nl !== null && Go(Nl) && (Nl = null), Tl !== null && Go(Tl) && (Tl = null), Al !== null && Go(Al) && (Al = null), vu.forEach(Hm), bu.forEach(Hm);
  }
  function Qo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, uf || (uf = !0, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      g1
    )));
  }
  var Vo = null;
  function Km(e) {
    Vo !== e && (Vo = e, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      function() {
        Vo === e && (Vo = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], a = e[t + 1], r = e[t + 2];
          if (typeof a != "function") {
            if (rf(a || n) === null)
              continue;
            break;
          }
          var u = ut(n);
          u !== null && (e.splice(t, 3), t -= 3, lc(
            u,
            {
              pending: !0,
              data: r,
              method: n.method,
              action: a
            },
            a,
            r
          ));
        }
      }
    ));
  }
  function di(e) {
    function t(j) {
      return Qo(j, e);
    }
    Nl !== null && Qo(Nl, e), Tl !== null && Qo(Tl, e), Al !== null && Qo(Al, e), vu.forEach(t), bu.forEach(t);
    for (var n = 0; n < kl.length; n++) {
      var a = kl[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < kl.length && (n = kl[0], n.blockedOn === null); )
      Lm(n), n.blockedOn === null && kl.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var r = n[a], u = n[a + 1], p = r[Ct] || null;
        if (typeof u == "function")
          p || Km(n);
        else if (p) {
          var v = null;
          if (u && u.hasAttribute("formAction")) {
            if (r = u, p = u[Ct] || null)
              v = p.formAction;
            else if (rf(r) !== null) continue;
          } else v = p.action;
          typeof v == "function" ? n[a + 1] = v : (n.splice(a, 3), a -= 3), Km(n);
        }
      }
  }
  function Ym() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(p) {
            return r = p;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      r !== null && (r(), r = null), a || setTimeout(n, 20);
    }
    function n() {
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
      var a = !1, r = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), r !== null && (r(), r = null);
      };
    }
  }
  function of(e) {
    this._internalRoot = e;
  }
  Xo.prototype.render = of.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(h(409));
    var n = t.current, a = zn();
    Mm(n, a, e, t, null, null);
  }, Xo.prototype.unmount = of.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Mm(e.current, 2, null, e, null, null), Co(), t[on] = null;
    }
  };
  function Xo(e) {
    this._internalRoot = e;
  }
  Xo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Yl();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < kl.length && t !== 0 && t < kl[n].priority; n++) ;
      kl.splice(n, 0, e), n === 0 && Lm(e);
    }
  };
  var Gm = s.version;
  if (Gm !== "19.2.3")
    throw Error(
      h(
        527,
        Gm,
        "19.2.3"
      )
    );
  te.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(h(188)) : (e = Object.keys(e).join(","), Error(h(268, e)));
    return e = D(t), e = e !== null ? $(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var v1 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Zo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zo.isDisabled && Zo.supportsFiber)
      try {
        ta = Zo.inject(
          v1
        ), Zt = Zo;
      } catch {
      }
  }
  return Su.createRoot = function(e, t) {
    if (!x(e)) throw Error(h(299));
    var n = !1, a = "", r = $d, u = Pd, p = Id;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (r = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = Om(
      e,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      r,
      u,
      p,
      Ym
    ), e[on] = t.current, Yc(e), new of(t);
  }, Su.hydrateRoot = function(e, t, n) {
    if (!x(e)) throw Error(h(299));
    var a = !1, r = "", u = $d, p = Pd, v = Id, j = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (p = n.onCaughtError), n.onRecoverableError !== void 0 && (v = n.onRecoverableError), n.formState !== void 0 && (j = n.formState)), t = Om(
      e,
      1,
      !0,
      t,
      n ?? null,
      a,
      r,
      j,
      u,
      p,
      v,
      Ym
    ), t.context = zm(null), n = t.current, a = zn(), a = Si(a), r = pl(a), r.callback = null, yl(n, r, a), n = a, t.current.lanes = n, Mn(t, n), ma(t), e[on] = t.current, Yc(e), new Xo(t);
  }, Su.version = "19.2.3", Su;
}
var Pm;
function A1() {
  if (Pm) return cf.exports;
  Pm = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return o(), cf.exports = T1(), cf.exports;
}
var k1 = A1();
const O1 = /* @__PURE__ */ Of(k1);
var mf = { exports: {} }, _u = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Im;
function z1() {
  if (Im) return _u;
  Im = 1;
  var o = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function d(h, x, S) {
    var M = null;
    if (S !== void 0 && (M = "" + S), x.key !== void 0 && (M = "" + x.key), "key" in x) {
      S = {};
      for (var R in x)
        R !== "key" && (S[R] = x[R]);
    } else S = x;
    return x = S.ref, {
      $$typeof: o,
      type: h,
      key: M,
      ref: x !== void 0 ? x : null,
      props: S
    };
  }
  return _u.Fragment = s, _u.jsx = d, _u.jsxs = d, _u;
}
var Wm;
function M1() {
  return Wm || (Wm = 1, mf.exports = z1()), mf.exports;
}
var c = M1();
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D1 = (o) => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), R1 = (o) => o.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, d, h) => h ? h.toUpperCase() : d.toLowerCase()
), e0 = (o) => {
  const s = R1(o);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, C0 = (...o) => o.filter((s, d, h) => !!s && s.trim() !== "" && h.indexOf(s) === d).join(" ").trim(), U1 = (o) => {
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
var B1 = {
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
const q1 = le.forwardRef(
  ({
    color: o = "currentColor",
    size: s = 24,
    strokeWidth: d = 2,
    absoluteStrokeWidth: h,
    className: x = "",
    children: S,
    iconNode: M,
    ...R
  }, k) => le.createElement(
    "svg",
    {
      ref: k,
      ...B1,
      width: s,
      height: s,
      stroke: o,
      strokeWidth: h ? Number(d) * 24 / Number(s) : d,
      className: C0("lucide", x),
      ...!S && !U1(R) && { "aria-hidden": "true" },
      ...R
    },
    [
      ...M.map(([D, $]) => le.createElement(D, $)),
      ...Array.isArray(S) ? S : [S]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = (o, s) => {
  const d = le.forwardRef(
    ({ className: h, ...x }, S) => le.createElement(q1, {
      ref: S,
      iconNode: s,
      className: C0(
        `lucide-${D1(e0(o))}`,
        `lucide-${o}`,
        h
      ),
      ...x
    })
  );
  return d.displayName = e0(o), d;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L1 = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], H1 = Ne("arrow-down-to-line", L1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K1 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], Y1 = Ne("arrow-up-right", K1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G1 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
], N0 = Ne("bot", G1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q1 = [
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
], V1 = Ne("boxes", Q1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X1 = [
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
], Z1 = Ne("brain-circuit", X1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J1 = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], T0 = Ne("brain", J1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F1 = [
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
], $1 = Ne("calculator", F1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], I1 = Ne("check", P1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W1 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Cu = Ne("chevron-down", W1);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ey = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], A0 = Ne("chevron-right", ey);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ty = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Mf = Ne("circle-alert", ty);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ny = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
], k0 = Ne("circle-check-big", ny);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ay = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], ly = Ne("circle-check", ay);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ry = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], iy = Ne("clock", ry);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uy = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
], oy = Ne("cloud", uy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sy = [
  [
    "path",
    { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
  ]
], cy = Ne("command", sy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fy = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], O0 = Ne("copy", fy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dy = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], t0 = Ne("corner-down-left", dy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hy = [
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
], os = Ne("cpu", hy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const my = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], ss = Ne("database", my);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const py = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], z0 = Ne("download", py);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yy = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], gy = Ne("external-link", yy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vy = [
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
], cs = Ne("file-text", vy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const by = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
], xy = Ne("hash", by);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sy = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], _y = Ne("info", Sy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jy = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Df = Ne("key", jy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wy = [
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
], fs = Ne("layers", wy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ey = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Cy = Ne("layout-dashboard", Ey);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ny = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
], Ty = Ne("list", Ny);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ay = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], M0 = Ne("loader-circle", Ay);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ky = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], Oy = Ne("maximize-2", ky);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zy = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], My = Ne("menu", zy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dy = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], n0 = Ne("moon", Dy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ry = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], D0 = Ne("network", Ry);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uy = [
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
], a0 = Ne("palette", Uy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const By = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], qy = Ne("pause", By);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ly = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
], Hy = Ne("pen", Ly);
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
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], Rf = Ne("play", Ky);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yy = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Uf = Ne("plus", Yy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gy = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
], R0 = Ne("power", Gy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qy = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], xf = Ne("refresh-cw", Qy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vy = [
  ["path", { d: "M17 3v10", key: "15fgeh" }],
  ["path", { d: "m12.67 5.5 8.66 5", key: "1gpheq" }],
  ["path", { d: "m12.67 10.5 8.66-5", key: "1dkfa6" }],
  [
    "path",
    { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z", key: "swwfx4" }
  ]
], U0 = Ne("regex", Vy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xy = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
], Zy = Ne("save", Xy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jy = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
], Fy = Ne("scissors", Jy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $y = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Sf = Ne("search", $y);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Py = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], Iy = Ne("send", Py);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wy = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], B0 = Ne("server", Wy);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eg = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], q0 = Ne("settings", eg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tg = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], Bf = Ne("settings-2", tg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ng = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], ag = Ne("sun", ng);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lg = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], br = Ne("terminal", lg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rg = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], ku = Ne("trash-2", rg);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ig = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], ug = Ne("upload", ig);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const og = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], L0 = Ne("x", og);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], qf = Ne("zap", sg), cg = () => /* @__PURE__ */ c.jsx("style", { children: `
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
  ` }), _f = [
  // 导航命令
  {
    id: "nav-memory",
    icon: Ty,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (o) => o("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: D0,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (o) => o("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: T0,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (o) => o("/processing"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Df,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (o) => o("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: br,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (o) => o("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: q0,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (o) => o("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function fg(o) {
  const s = o.toLowerCase().trim();
  return s ? _f.filter((d) => {
    var h;
    return d.label.toLowerCase().includes(s) || ((h = d.description) == null ? void 0 : h.toLowerCase().includes(s)) || d.keywords.some((x) => x.toLowerCase().includes(s));
  }) : _f;
}
const dg = {
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
}, hg = {
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
}, mg = {
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
}, pg = {
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
}, yg = {
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
}, gg = {
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
}, Po = {
  sillytavern: gg,
  // SillyTavern 继承主题
  paperLight: dg,
  twitterDark: mg,
  claudeDark: hg,
  catppuccin: yg,
  discord: pg
}, en = [];
for (let o = 0; o < 256; ++o)
  en.push((o + 256).toString(16).slice(1));
function vg(o, s = 0) {
  return (en[o[s + 0]] + en[o[s + 1]] + en[o[s + 2]] + en[o[s + 3]] + "-" + en[o[s + 4]] + en[o[s + 5]] + "-" + en[o[s + 6]] + en[o[s + 7]] + "-" + en[o[s + 8]] + en[o[s + 9]] + "-" + en[o[s + 10]] + en[o[s + 11]] + en[o[s + 12]] + en[o[s + 13]] + en[o[s + 14]] + en[o[s + 15]]).toLowerCase();
}
let pf;
const bg = new Uint8Array(16);
function xg() {
  if (!pf) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    pf = crypto.getRandomValues.bind(crypto);
  }
  return pf(bg);
}
const Sg = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), l0 = { randomUUID: Sg };
function _g(o, s, d) {
  var x;
  o = o || {};
  const h = o.random ?? ((x = o.rng) == null ? void 0 : x.call(o)) ?? xg();
  if (h.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return h[6] = h[6] & 15 | 64, h[8] = h[8] & 63 | 128, vg(h);
}
function jg(o, s, d) {
  return l0.randomUUID && !o ? l0.randomUUID() : _g(o);
}
var jf = function(o, s) {
  return jf = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, h) {
    d.__proto__ = h;
  } || function(d, h) {
    for (var x in h) Object.prototype.hasOwnProperty.call(h, x) && (d[x] = h[x]);
  }, jf(o, s);
};
function Ou(o, s) {
  if (typeof s != "function" && s !== null)
    throw new TypeError("Class extends value " + String(s) + " is not a constructor or null");
  jf(o, s);
  function d() {
    this.constructor = o;
  }
  o.prototype = s === null ? Object.create(s) : (d.prototype = s.prototype, new d());
}
function wf(o) {
  var s = typeof Symbol == "function" && Symbol.iterator, d = s && o[s], h = 0;
  if (d) return d.call(o);
  if (o && typeof o.length == "number") return {
    next: function() {
      return o && h >= o.length && (o = void 0), { value: o && o[h++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ef(o, s) {
  var d = typeof Symbol == "function" && o[Symbol.iterator];
  if (!d) return o;
  var h = d.call(o), x, S = [], M;
  try {
    for (; (s === void 0 || s-- > 0) && !(x = h.next()).done; ) S.push(x.value);
  } catch (R) {
    M = { error: R };
  } finally {
    try {
      x && !x.done && (d = h.return) && d.call(h);
    } finally {
      if (M) throw M.error;
    }
  }
  return S;
}
function Cf(o, s, d) {
  if (d || arguments.length === 2) for (var h = 0, x = s.length, S; h < x; h++)
    (S || !(h in s)) && (S || (S = Array.prototype.slice.call(s, 0, h)), S[h] = s[h]);
  return o.concat(S || Array.prototype.slice.call(s));
}
function ya(o) {
  return typeof o == "function";
}
function H0(o) {
  var s = function(h) {
    Error.call(h), h.stack = new Error().stack;
  }, d = o(s);
  return d.prototype = Object.create(Error.prototype), d.prototype.constructor = d, d;
}
var yf = H0(function(o) {
  return function(d) {
    o(this), this.message = d ? d.length + ` errors occurred during unsubscription:
` + d.map(function(h, x) {
      return x + 1 + ") " + h.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = d;
  };
});
function Nf(o, s) {
  if (o) {
    var d = o.indexOf(s);
    0 <= d && o.splice(d, 1);
  }
}
var ds = (function() {
  function o(s) {
    this.initialTeardown = s, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return o.prototype.unsubscribe = function() {
    var s, d, h, x, S;
    if (!this.closed) {
      this.closed = !0;
      var M = this._parentage;
      if (M)
        if (this._parentage = null, Array.isArray(M))
          try {
            for (var R = wf(M), k = R.next(); !k.done; k = R.next()) {
              var D = k.value;
              D.remove(this);
            }
          } catch (oe) {
            s = { error: oe };
          } finally {
            try {
              k && !k.done && (d = R.return) && d.call(R);
            } finally {
              if (s) throw s.error;
            }
          }
        else
          M.remove(this);
      var $ = this.initialTeardown;
      if (ya($))
        try {
          $();
        } catch (oe) {
          S = oe instanceof yf ? oe.errors : [oe];
        }
      var Q = this._finalizers;
      if (Q) {
        this._finalizers = null;
        try {
          for (var re = wf(Q), we = re.next(); !we.done; we = re.next()) {
            var Ae = we.value;
            try {
              r0(Ae);
            } catch (oe) {
              S = S ?? [], oe instanceof yf ? S = Cf(Cf([], Ef(S)), Ef(oe.errors)) : S.push(oe);
            }
          }
        } catch (oe) {
          h = { error: oe };
        } finally {
          try {
            we && !we.done && (x = re.return) && x.call(re);
          } finally {
            if (h) throw h.error;
          }
        }
      }
      if (S)
        throw new yf(S);
    }
  }, o.prototype.add = function(s) {
    var d;
    if (s && s !== this)
      if (this.closed)
        r0(s);
      else {
        if (s instanceof o) {
          if (s.closed || s._hasParent(this))
            return;
          s._addParent(this);
        }
        (this._finalizers = (d = this._finalizers) !== null && d !== void 0 ? d : []).push(s);
      }
  }, o.prototype._hasParent = function(s) {
    var d = this._parentage;
    return d === s || Array.isArray(d) && d.includes(s);
  }, o.prototype._addParent = function(s) {
    var d = this._parentage;
    this._parentage = Array.isArray(d) ? (d.push(s), d) : d ? [d, s] : s;
  }, o.prototype._removeParent = function(s) {
    var d = this._parentage;
    d === s ? this._parentage = null : Array.isArray(d) && Nf(d, s);
  }, o.prototype.remove = function(s) {
    var d = this._finalizers;
    d && Nf(d, s), s instanceof o && s._removeParent(this);
  }, o.EMPTY = (function() {
    var s = new o();
    return s.closed = !0, s;
  })(), o;
})(), K0 = ds.EMPTY;
function Y0(o) {
  return o instanceof ds || o && "closed" in o && ya(o.remove) && ya(o.add) && ya(o.unsubscribe);
}
function r0(o) {
  ya(o) ? o() : o.unsubscribe();
}
var wg = {
  Promise: void 0
}, Eg = {
  setTimeout: function(o, s) {
    for (var d = [], h = 2; h < arguments.length; h++)
      d[h - 2] = arguments[h];
    return setTimeout.apply(void 0, Cf([o, s], Ef(d)));
  },
  clearTimeout: function(o) {
    return clearTimeout(o);
  },
  delegate: void 0
};
function Cg(o) {
  Eg.setTimeout(function() {
    throw o;
  });
}
function i0() {
}
function Io(o) {
  o();
}
var Lf = (function(o) {
  Ou(s, o);
  function s(d) {
    var h = o.call(this) || this;
    return h.isStopped = !1, d ? (h.destination = d, Y0(d) && d.add(h)) : h.destination = Ag, h;
  }
  return s.create = function(d, h, x) {
    return new Tf(d, h, x);
  }, s.prototype.next = function(d) {
    this.isStopped || this._next(d);
  }, s.prototype.error = function(d) {
    this.isStopped || (this.isStopped = !0, this._error(d));
  }, s.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, s.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, o.prototype.unsubscribe.call(this), this.destination = null);
  }, s.prototype._next = function(d) {
    this.destination.next(d);
  }, s.prototype._error = function(d) {
    try {
      this.destination.error(d);
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
})(ds), Ng = (function() {
  function o(s) {
    this.partialObserver = s;
  }
  return o.prototype.next = function(s) {
    var d = this.partialObserver;
    if (d.next)
      try {
        d.next(s);
      } catch (h) {
        Jo(h);
      }
  }, o.prototype.error = function(s) {
    var d = this.partialObserver;
    if (d.error)
      try {
        d.error(s);
      } catch (h) {
        Jo(h);
      }
    else
      Jo(s);
  }, o.prototype.complete = function() {
    var s = this.partialObserver;
    if (s.complete)
      try {
        s.complete();
      } catch (d) {
        Jo(d);
      }
  }, o;
})(), Tf = (function(o) {
  Ou(s, o);
  function s(d, h, x) {
    var S = o.call(this) || this, M;
    return ya(d) || !d ? M = {
      next: d ?? void 0,
      error: h ?? void 0,
      complete: x ?? void 0
    } : M = d, S.destination = new Ng(M), S;
  }
  return s;
})(Lf);
function Jo(o) {
  Cg(o);
}
function Tg(o) {
  throw o;
}
var Ag = {
  closed: !0,
  next: i0,
  error: Tg,
  complete: i0
}, kg = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Og(o) {
  return o;
}
function zg(o) {
  return o.length === 0 ? Og : o.length === 1 ? o[0] : function(d) {
    return o.reduce(function(h, x) {
      return x(h);
    }, d);
  };
}
var u0 = (function() {
  function o(s) {
    s && (this._subscribe = s);
  }
  return o.prototype.lift = function(s) {
    var d = new o();
    return d.source = this, d.operator = s, d;
  }, o.prototype.subscribe = function(s, d, h) {
    var x = this, S = Dg(s) ? s : new Tf(s, d, h);
    return Io(function() {
      var M = x, R = M.operator, k = M.source;
      S.add(R ? R.call(S, k) : k ? x._subscribe(S) : x._trySubscribe(S));
    }), S;
  }, o.prototype._trySubscribe = function(s) {
    try {
      return this._subscribe(s);
    } catch (d) {
      s.error(d);
    }
  }, o.prototype.forEach = function(s, d) {
    var h = this;
    return d = o0(d), new d(function(x, S) {
      var M = new Tf({
        next: function(R) {
          try {
            s(R);
          } catch (k) {
            S(k), M.unsubscribe();
          }
        },
        error: S,
        complete: x
      });
      h.subscribe(M);
    });
  }, o.prototype._subscribe = function(s) {
    var d;
    return (d = this.source) === null || d === void 0 ? void 0 : d.subscribe(s);
  }, o.prototype[kg] = function() {
    return this;
  }, o.prototype.pipe = function() {
    for (var s = [], d = 0; d < arguments.length; d++)
      s[d] = arguments[d];
    return zg(s)(this);
  }, o.prototype.toPromise = function(s) {
    var d = this;
    return s = o0(s), new s(function(h, x) {
      var S;
      d.subscribe(function(M) {
        return S = M;
      }, function(M) {
        return x(M);
      }, function() {
        return h(S);
      });
    });
  }, o.create = function(s) {
    return new o(s);
  }, o;
})();
function o0(o) {
  var s;
  return (s = o ?? wg.Promise) !== null && s !== void 0 ? s : Promise;
}
function Mg(o) {
  return o && ya(o.next) && ya(o.error) && ya(o.complete);
}
function Dg(o) {
  return o && o instanceof Lf || Mg(o) && Y0(o);
}
function Rg(o) {
  return ya(o == null ? void 0 : o.lift);
}
function Ug(o) {
  return function(s) {
    if (Rg(s))
      return s.lift(function(d) {
        try {
          return o(d, this);
        } catch (h) {
          this.error(h);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function Bg(o, s, d, h, x) {
  return new qg(o, s, d, h, x);
}
var qg = (function(o) {
  Ou(s, o);
  function s(d, h, x, S, M, R) {
    var k = o.call(this, d) || this;
    return k.onFinalize = M, k.shouldUnsubscribe = R, k._next = h ? function(D) {
      try {
        h(D);
      } catch ($) {
        d.error($);
      }
    } : o.prototype._next, k._error = S ? function(D) {
      try {
        S(D);
      } catch ($) {
        d.error($);
      } finally {
        this.unsubscribe();
      }
    } : o.prototype._error, k._complete = x ? function() {
      try {
        x();
      } catch (D) {
        d.error(D);
      } finally {
        this.unsubscribe();
      }
    } : o.prototype._complete, k;
  }
  return s.prototype.unsubscribe = function() {
    var d;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var h = this.closed;
      o.prototype.unsubscribe.call(this), !h && ((d = this.onFinalize) === null || d === void 0 || d.call(this));
    }
  }, s;
})(Lf), Lg = H0(function(o) {
  return function() {
    o(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Hf = (function(o) {
  Ou(s, o);
  function s() {
    var d = o.call(this) || this;
    return d.closed = !1, d.currentObservers = null, d.observers = [], d.isStopped = !1, d.hasError = !1, d.thrownError = null, d;
  }
  return s.prototype.lift = function(d) {
    var h = new s0(this, this);
    return h.operator = d, h;
  }, s.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Lg();
  }, s.prototype.next = function(d) {
    var h = this;
    Io(function() {
      var x, S;
      if (h._throwIfClosed(), !h.isStopped) {
        h.currentObservers || (h.currentObservers = Array.from(h.observers));
        try {
          for (var M = wf(h.currentObservers), R = M.next(); !R.done; R = M.next()) {
            var k = R.value;
            k.next(d);
          }
        } catch (D) {
          x = { error: D };
        } finally {
          try {
            R && !R.done && (S = M.return) && S.call(M);
          } finally {
            if (x) throw x.error;
          }
        }
      }
    });
  }, s.prototype.error = function(d) {
    var h = this;
    Io(function() {
      if (h._throwIfClosed(), !h.isStopped) {
        h.hasError = h.isStopped = !0, h.thrownError = d;
        for (var x = h.observers; x.length; )
          x.shift().error(d);
      }
    });
  }, s.prototype.complete = function() {
    var d = this;
    Io(function() {
      if (d._throwIfClosed(), !d.isStopped) {
        d.isStopped = !0;
        for (var h = d.observers; h.length; )
          h.shift().complete();
      }
    });
  }, s.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(s.prototype, "observed", {
    get: function() {
      var d;
      return ((d = this.observers) === null || d === void 0 ? void 0 : d.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), s.prototype._trySubscribe = function(d) {
    return this._throwIfClosed(), o.prototype._trySubscribe.call(this, d);
  }, s.prototype._subscribe = function(d) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(d), this._innerSubscribe(d);
  }, s.prototype._innerSubscribe = function(d) {
    var h = this, x = this, S = x.hasError, M = x.isStopped, R = x.observers;
    return S || M ? K0 : (this.currentObservers = null, R.push(d), new ds(function() {
      h.currentObservers = null, Nf(R, d);
    }));
  }, s.prototype._checkFinalizedStatuses = function(d) {
    var h = this, x = h.hasError, S = h.thrownError, M = h.isStopped;
    x ? d.error(S) : M && d.complete();
  }, s.prototype.asObservable = function() {
    var d = new u0();
    return d.source = this, d;
  }, s.create = function(d, h) {
    return new s0(d, h);
  }, s;
})(u0), s0 = (function(o) {
  Ou(s, o);
  function s(d, h) {
    var x = o.call(this) || this;
    return x.destination = d, x.source = h, x;
  }
  return s.prototype.next = function(d) {
    var h, x;
    (x = (h = this.destination) === null || h === void 0 ? void 0 : h.next) === null || x === void 0 || x.call(h, d);
  }, s.prototype.error = function(d) {
    var h, x;
    (x = (h = this.destination) === null || h === void 0 ? void 0 : h.error) === null || x === void 0 || x.call(h, d);
  }, s.prototype.complete = function() {
    var d, h;
    (h = (d = this.destination) === null || d === void 0 ? void 0 : d.complete) === null || h === void 0 || h.call(d);
  }, s.prototype._subscribe = function(d) {
    var h, x;
    return (x = (h = this.source) === null || h === void 0 ? void 0 : h.subscribe(d)) !== null && x !== void 0 ? x : K0;
  }, s;
})(Hf);
function Hg(o, s) {
  return Ug(function(d, h) {
    var x = 0;
    d.subscribe(Bg(h, function(S) {
      return o.call(s, S, x++) && h.next(S);
    }));
  });
}
const Fo = new Hf(), Kg = {
  /**
   * 发布事件
   */
  emit(o) {
    Fo.next({
      ...o,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(o) {
    const s = Fo.subscribe(o);
    return {
      unsubscribe: () => s.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(o, s) {
    const d = Fo.pipe(Hg((h) => h.type === o)).subscribe((h) => s(h.payload));
    return {
      unsubscribe: () => d.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Fo.asObservable();
  }
};
var pt = /* @__PURE__ */ ((o) => (o[o.DEBUG = 0] = "DEBUG", o[o.INFO = 1] = "INFO", o[o.SUCCESS = 2] = "SUCCESS", o[o.WARN = 3] = "WARN", o[o.ERROR = 4] = "ERROR", o))(pt || {});
const ts = {
  0: { label: "DEBUG", icon: "🔍", color: "#6c757d" },
  1: { label: "INFO", icon: "ℹ️", color: "#17a2b8" },
  2: { label: "SUCCESS", icon: "✅", color: "#28a745" },
  3: { label: "WARN", icon: "⚠️", color: "#ffc107" },
  4: { label: "ERROR", icon: "❌", color: "#dc3545" }
}, G0 = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, Q0 = new Hf();
let pa = [], zl = { ...G0 }, gf = null;
async function ns() {
  if (!gf) {
    const { db: o } = await Promise.resolve().then(() => ub);
    gf = o;
  }
  return gf;
}
function Yg(o) {
  return new Date(o).toTimeString().slice(0, 8);
}
async function mi(o, s, d, h) {
  if (o < zl.minLevel) return;
  const x = {
    id: jg(),
    timestamp: Date.now(),
    level: o,
    module: s,
    message: d,
    data: h
  };
  pa.push(x), Q0.next(x);
  try {
    const S = await ns();
    await S.logs.add(x);
    const M = await S.logs.count();
    M > zl.maxEntries && await Gg(M - zl.maxEntries);
  } catch (S) {
    console.error("[Engram/Logger] 日志持久化失败:", S);
  }
}
async function Gg(o) {
  try {
    const s = await ns(), h = (await s.logs.orderBy("timestamp").limit(o).toArray()).map((x) => x.id);
    await s.logs.bulkDelete(h), pa = pa.slice(-zl.maxEntries);
  } catch (s) {
    console.error("[Engram/Logger] 清理旧日志失败:", s);
  }
}
function Qg() {
  Kg.subscribe((o) => {
    const d = {
      INGESTION_START: pt.INFO,
      INGESTION_COMPLETE: pt.SUCCESS,
      ENTITY_CREATED: pt.INFO,
      MEMORY_STORED: pt.SUCCESS,
      RETRIEVAL_START: pt.DEBUG,
      RETRIEVAL_COMPLETE: pt.SUCCESS,
      CHAT_CHANGED: pt.INFO,
      MESSAGE_RECEIVED: pt.DEBUG
    }[o.type] ?? pt.DEBUG;
    mi(d, "EventBus", `${o.type}`, o.payload);
  });
}
const un = {
  /**
   * 初始化 Logger
   */
  async init(o) {
    o && (zl = { ...zl, ...o });
    try {
      pa = await (await ns()).logs.orderBy("timestamp").reverse().limit(zl.maxEntries).toArray(), pa.reverse();
    } catch (s) {
      console.error("[Engram/Logger] 加载历史日志失败:", s), pa = [];
    }
    Qg(), un.info("Logger", "Logger 初始化完成", { maxEntries: zl.maxEntries });
  },
  /**
   * DEBUG 级别日志
   */
  debug(o, s, d) {
    mi(pt.DEBUG, o, s, d);
  },
  /**
   * INFO 级别日志
   */
  info(o, s, d) {
    mi(pt.INFO, o, s, d);
  },
  /**
   * SUCCESS 级别日志
   */
  success(o, s, d) {
    mi(pt.SUCCESS, o, s, d);
  },
  /**
   * WARN 级别日志
   */
  warn(o, s, d) {
    mi(pt.WARN, o, s, d);
  },
  /**
   * ERROR 级别日志
   */
  error(o, s, d) {
    mi(pt.ERROR, o, s, d);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...pa];
  },
  /**
   * 订阅新日志
   */
  subscribe(o) {
    const s = Q0.subscribe(o);
    return () => s.unsubscribe();
  },
  /**
   * 清空所有日志
   */
  async clear() {
    try {
      await (await ns()).logs.clear(), pa = [], un.info("Logger", "日志已清空");
    } catch (o) {
      console.error("[Engram/Logger] 清空日志失败:", o);
    }
  },
  /**
   * 导出日志为 Markdown 格式
   */
  exportToMarkdown() {
    const o = /* @__PURE__ */ new Date();
    o.toISOString().slice(0, 10), o.toTimeString().slice(0, 8).replace(/:/g, "");
    const s = {
      [pt.DEBUG]: "DEBUG",
      [pt.INFO]: "INFO",
      [pt.SUCCESS]: "SUCCESS",
      [pt.WARN]: "WARN",
      [pt.ERROR]: "ERROR"
    };
    let d = `# Engram Debug Log

`;
    d += `- **导出时间**: ${o.toLocaleString("zh-CN")}
`, d += `- **版本**: 0.1.0
`, d += `- **日志条数**: ${pa.length}

`, d += `---

`, d += `## 日志记录

`, d += "```\n";
    for (const h of pa) {
      const x = Yg(h.timestamp), S = s[h.level].padEnd(7), M = h.module.padEnd(16);
      if (d += `[${x}] [${M}] ${S} ${h.message}
`, h.data !== void 0) {
        const R = JSON.stringify(h.data, null, 2).split(`
`).map((k) => `    ${k}`).join(`
`);
        d += `${R}
`;
      }
    }
    return d += "```\n", d;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const o = /* @__PURE__ */ new Date(), s = o.toISOString().slice(0, 10), d = o.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${s}_${d}.md`;
  }
}, V0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: G0,
  LogLevel: pt,
  LogLevelConfig: ts,
  Logger: un
}, Symbol.toStringTag, { value: "Module" }));
class gr {
  /**
   * Load settings from SillyTavern global state
   */
  static loadSettings() {
    var s, d;
    try {
      const h = ((d = (s = window.SillyTavern) == null ? void 0 : s.extension_settings) == null ? void 0 : d[this.EXTENSION_NAME]) || {};
      return {
        theme: h.theme || "odysseia",
        // Default to new theme
        presets: h.presets || {},
        templates: h.templates || {},
        promptTemplates: h.promptTemplates || []
      };
    } catch (h) {
      return un.warn("SettingsManager", "Failed to load settings", h), { theme: "odysseia", presets: {}, templates: {}, promptTemplates: [] };
    }
  }
  /**
   * Get a specific setting value
   */
  static get(s) {
    return this.loadSettings()[s];
  }
  /**
   * Save a specific setting value
   */
  static set(s, d) {
    const h = this.loadSettings();
    h[s] = d, this.saveToST(h);
  }
  /**
   * 获取指定分类下已启用的提示词模板
   * @param category 模板分类
   * @returns 启用的模板，如果没有则返回 null
   */
  static getEnabledPromptTemplate(s) {
    return (this.get("promptTemplates") || []).find((h) => h.category === s && h.enabled) || null;
  }
  /**
   * Persist to SillyTavern extension_settings
   * This updates the global object immediately for local usage,
   * and debounces the server save call.
   */
  static saveToST(s) {
    window.SillyTavern && (window.SillyTavern.extension_settings || (window.SillyTavern.extension_settings = {}), window.SillyTavern.extension_settings[this.EXTENSION_NAME] = s, this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
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
    un.info("SettingsManager", "Persisting settings to server...");
    try {
      window.saveSettingsDebounced && window.saveSettingsDebounced();
    } catch (s) {
      un.error("SettingsManager", "Failed to save settings", s);
    }
  }
}
wt(gr, "EXTENSION_NAME", "engram"), wt(gr, "saveTimeout", null);
class Ml {
  /**
   * 初始化主题系统
   */
  static init() {
    this.injectStyles();
    let d = gr.loadSettings().theme;
    d || (d = localStorage.getItem(this.STORAGE_KEY), d && gr.set("theme", d));
    const h = Po[d] ? d : "claudeDark";
    this.setTheme(h), un.info("ThemeManager", `主题系统初始化完成: ${h}`);
  }
  /**
   * 切换主题
   */
  static setTheme(s) {
    Po[s] || (un.warn("ThemeManager", `未知主题: ${s}, 回退到 claudeDark`), s = "claudeDark"), this.currentTheme = s, gr.set("theme", s), localStorage.setItem(this.STORAGE_KEY, s), this.applyThemeVariables(s);
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
    const d = document.createElement("link");
    d.id = s, d.rel = "stylesheet", d.type = "text/css", d.href = `scripts/extensions/Engram_project/dist/style.css?v=${Date.now()}`, document.head.appendChild(d);
  }
  /**
   * 应用 CSS 变量到根元素
   */
  static applyThemeVariables(s) {
    const d = Po[s];
    if (!d) return;
    const h = document.documentElement, x = (M, R) => {
      h.style.setProperty(M, R);
    };
    Object.entries(d.colors).forEach(([M, R]) => {
      let k = `--${M.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      k = k.replace(/(\d+)/, "-$1"), x(k, R);
    }), Object.entries(d.variables).forEach(([M, R]) => {
      x(`--${M}`, R);
    }), s !== "paperLight" ? h.classList.add("dark") : h.classList.remove("dark");
  }
}
wt(Ml, "STORAGE_KEY", "engram-theme"), wt(Ml, "currentTheme", "claudeDark");
const Vg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ThemeManager: Ml
}, Symbol.toStringTag, { value: "Module" })), X0 = le.createContext(void 0);
function Xg({ children: o }) {
  const [s, d] = le.useState(Ml.getTheme()), h = s !== "paperLight", x = (S) => {
    Ml.setTheme(S), d(S);
  };
  return le.useEffect(() => {
    const S = Ml.getTheme();
    S !== s && d(S);
  }, []), /* @__PURE__ */ c.jsx(X0.Provider, { value: { theme: s, setTheme: x, isDarkMode: h }, children: o });
}
function Zg() {
  const o = le.useContext(X0);
  if (o === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return o;
}
const Jg = ({ onNavigate: o }) => {
  const { setTheme: s } = Zg(), [d, h] = le.useState(""), [x, S] = le.useState(!1), [M, R] = le.useState(0), [k, D] = le.useState(_f), $ = le.useRef(null), Q = le.useRef(null), re = [
    {
      id: "theme-paper-light",
      icon: ag,
      label: "主题: Paper Light (Twitter)",
      description: "清爽明亮的推特风格",
      action: () => s("paperLight"),
      keywords: ["theme", "light", "white", "twitter", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-twitter-dark",
      icon: n0,
      label: "主题: Twitter Dark",
      description: "纯黑、高对比度的推特深色风格",
      action: () => s("twitterDark"),
      keywords: ["theme", "dark", "black", "twitter", "blue", "主题"],
      type: "action"
    },
    {
      id: "theme-claude-dark",
      icon: n0,
      label: "主题: Claude Dark",
      description: "深色纸感风格",
      action: () => s("claudeDark"),
      keywords: ["theme", "dark", "claude", "paper", "主题"],
      type: "action"
    },
    {
      id: "theme-catppuccin",
      icon: a0,
      label: "主题: Catppuccin Mocha",
      description: "柔和的粉彩深色主题",
      action: () => s("catppuccin"),
      keywords: ["theme", "dark", "catppuccin", "mocha", "主题"],
      type: "action"
    },
    {
      id: "theme-discord",
      icon: a0,
      label: "主题: Discord Dark",
      description: "经典的 Discord 深色风格",
      action: () => s("discord"),
      keywords: ["theme", "dark", "discord", "game", "主题"],
      type: "action"
    }
  ];
  le.useEffect(() => {
    const oe = fg(d), ke = d.toLowerCase().trim(), pe = re.filter(
      (Me) => {
        var fe;
        return !ke || Me.label.toLowerCase().includes(ke) || ((fe = Me.description) == null ? void 0 : fe.toLowerCase().includes(ke)) || Me.keywords.some((Oe) => Oe.toLowerCase().includes(ke));
      }
    );
    D([...oe, ...pe]), R(0);
  }, [d]), le.useEffect(() => {
    const oe = (ke) => {
      $.current && !$.current.contains(ke.target) && S(!1);
    };
    return document.addEventListener("mousedown", oe), () => document.removeEventListener("mousedown", oe);
  }, []), le.useEffect(() => {
    const oe = (ke) => {
      var pe;
      (ke.metaKey || ke.ctrlKey) && ke.key === "k" && (ke.preventDefault(), (pe = Q.current) == null || pe.focus(), S(!0));
    };
    return window.addEventListener("keydown", oe), () => window.removeEventListener("keydown", oe);
  }, []);
  const we = (oe) => {
    var pe;
    if (!x) {
      (oe.key === "ArrowDown" || oe.key === "Enter") && S(!0);
      return;
    }
    const ke = k.length + (d ? 1 : 0);
    switch (oe.key) {
      case "ArrowDown":
        oe.preventDefault(), R((Me) => (Me + 1) % ke);
        break;
      case "ArrowUp":
        oe.preventDefault(), R((Me) => (Me - 1 + ke) % ke);
        break;
      case "Enter":
        oe.preventDefault(), Ae();
        break;
      case "Escape":
        S(!1), (pe = Q.current) == null || pe.blur();
        break;
    }
  }, Ae = () => {
    k.length > 0 && M < k.length ? k[M].action(o) : d && (console.log("Searching memory for:", d), o("/memory")), S(!1), h("");
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "relative w-full max-w-xl", ref: $, children: [
    /* @__PURE__ */ c.jsxs("div", { className: `flex items-center gap-2 px-3 py-2 bg-muted-50 border border-input rounded-md transition-all duration-200 ${x ? "ring-2 ring-ring border-transparent bg-background" : "hover:bg-muted-80"}`, children: [
      /* @__PURE__ */ c.jsx(Sf, { size: 16, className: "text-muted-foreground shrink-0" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: Q,
          type: "text",
          className: "flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm",
          placeholder: "搜索命令、页面或记忆... (Cmd+K)",
          value: d,
          onChange: (oe) => {
            h(oe.target.value), S(!0);
          },
          onFocus: () => S(!0),
          onKeyDown: we
        }
      ),
      !d && /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-mono border border-border", children: [
        /* @__PURE__ */ c.jsx(cy, { size: 10 }),
        "K"
      ] })
    ] }),
    x && /* @__PURE__ */ c.jsxs("div", { className: "absolute top-full left-0 right-0 mt-2 p-1 bg-popover border border-border rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100", children: [
      k.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: "py-1", children: [
        /* @__PURE__ */ c.jsx("div", { className: "px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider", children: "功能与导航" }),
        k.map((oe, ke) => /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: `flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ${ke === M ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted-50"}`,
            onClick: () => {
              oe.action(o), S(!1), h("");
            },
            children: [
              /* @__PURE__ */ c.jsx(oe.icon, { size: 16, className: `shrink-0 ${ke === M ? "text-primary" : "text-muted-foreground"}` }),
              /* @__PURE__ */ c.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ c.jsx("div", { className: "text-sm font-medium", children: oe.label }),
                oe.description && /* @__PURE__ */ c.jsx("div", { className: "text-xs text-muted-foreground truncate", children: oe.description })
              ] }),
              ke === M && /* @__PURE__ */ c.jsx(t0, { size: 14, className: "text-muted-foreground" })
            ]
          },
          oe.id
        ))
      ] }),
      d && /* @__PURE__ */ c.jsxs("div", { className: "py-1 border-t border-border mt-1 pt-1", children: [
        /* @__PURE__ */ c.jsx("div", { className: "px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider", children: "搜索" }),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: `flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors ${M === k.length ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted-50"}`,
            onClick: () => {
              Ae();
            },
            children: [
              /* @__PURE__ */ c.jsx(Sf, { size: 16, className: `shrink-0 ${M === k.length ? "text-accent-foreground" : "text-muted-foreground"}` }),
              /* @__PURE__ */ c.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ c.jsxs("div", { className: "text-sm font-medium", children: [
                  '搜索记忆: "',
                  d,
                  '"'
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: "text-xs text-muted-foreground", children: "在记忆流和图谱中搜索此关键词" })
              ] }),
              M === k.length && /* @__PURE__ */ c.jsx(t0, { size: 14, className: "text-muted-foreground" })
            ]
          }
        )
      ] }),
      k.length === 0 && !d && /* @__PURE__ */ c.jsx("div", { className: "px-4 py-8 text-center text-muted-foreground text-sm", children: "无需搜索，直接输入..." })
    ] })
  ] });
}, Fg = ({
  onToggleSidebar: o,
  isMobile: s,
  onClose: d,
  onNavigate: h
}) => /* @__PURE__ */ c.jsxs("header", { className: "h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar text-sidebar-foreground z-50 transition-colors duration-300", children: [
  /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-3", children: [
    s && /* @__PURE__ */ c.jsx(
      "button",
      {
        className: "p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
        onClick: o,
        title: "菜单",
        children: /* @__PURE__ */ c.jsx(My, { size: 20 })
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: "font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "Engram" })
  ] }),
  /* @__PURE__ */ c.jsx("div", { className: "flex-1 max-w-xl mx-4 flex justify-center", children: /* @__PURE__ */ c.jsx(Jg, { onNavigate: h }) }),
  /* @__PURE__ */ c.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ c.jsx(
    "button",
    {
      className: "p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors",
      onClick: d,
      title: "关闭",
      children: /* @__PURE__ */ c.jsx(L0, { size: 18 })
    }
  ) })
] }), $g = ({ className: o = "", size: s = 24 }) => /* @__PURE__ */ c.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 592",
    width: s,
    height: s,
    className: o,
    "aria-label": "Engram Icon",
    children: /* @__PURE__ */ c.jsx(
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
), c0 = [
  { id: "dashboard", label: "仪表盘", icon: Cy },
  { id: "memory", label: "记忆流", icon: Z1 },
  { id: "graph", label: "神经图谱", icon: D0 },
  { id: "processing", label: "数据处理", icon: Y1 },
  { id: "presets", label: "API 预设", icon: ss },
  { id: "devlog", label: "开发日志", icon: br },
  { id: "settings", label: "系统设置", icon: Bf }
], Pg = ({ children: o, activeTab: s, setActiveTab: d, onClose: h }) => {
  const [x, S] = le.useState(!1);
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col absolute inset-0 w-full h-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary", id: "engram-layout-root", children: [
    /* @__PURE__ */ c.jsx(cg, {}),
    /* @__PURE__ */ c.jsx(
      Fg,
      {
        onToggleSidebar: () => S(!x),
        isMobile: !1,
        onClose: h,
        onNavigate: (M) => d(M.replace("/", ""))
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-1 overflow-hidden relative", children: [
      /* @__PURE__ */ c.jsxs("aside", { className: "flex w-12 flex-shrink-0 bg-sidebar flex-col z-40 items-center pt-3 border-r border-border/50", children: [
        /* @__PURE__ */ c.jsx("nav", { className: "flex-1 w-full flex flex-col items-center gap-2 overflow-y-auto no-scrollbar", children: c0.map((M) => {
          const R = M.icon, k = s === M.id;
          return /* @__PURE__ */ c.jsx(
            "button",
            {
              onClick: () => d(M.id),
              title: M.label,
              className: `
                                        w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 group
                                        ${k ? "text-primary bg-primary/10" : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/20"}
                                    `,
              children: /* @__PURE__ */ c.jsx(R, { size: 18, strokeWidth: k ? 2 : 1.5 })
            },
            M.id
          );
        }) }),
        /* @__PURE__ */ c.jsx("div", { className: "p-3 mb-2 flex justify-center opacity-50 hover:opacity-100 transition-opacity", children: /* @__PURE__ */ c.jsx($g, { size: 16, className: "text-muted-foreground" }) })
      ] }),
      x && /* @__PURE__ */ c.jsxs("div", { className: "fixed inset-0 z-50 bg-background flex flex-col p-6 animate-in slide-in-from-top-4 md:hidden", children: [
        /* @__PURE__ */ c.jsx("div", { className: "flex justify-end mb-8", children: /* @__PURE__ */ c.jsx("button", { onClick: () => S(!1), children: /* @__PURE__ */ c.jsx(L0, { size: 24, className: "text-muted-foreground" }) }) }),
        /* @__PURE__ */ c.jsx("nav", { className: "space-y-6", children: c0.map((M) => /* @__PURE__ */ c.jsx(
          "button",
          {
            onClick: () => {
              d(M.id), S(!1);
            },
            className: `text-2xl font-light block w-full text-left transition-colors ${s === M.id ? "text-primary" : "text-muted-foreground"}`,
            children: /* @__PURE__ */ c.jsxs("span", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ c.jsx(M.icon, { size: 20 }),
              M.label
            ] })
          },
          M.id
        )) })
      ] }),
      /* @__PURE__ */ c.jsx("main", { className: "flex-1 flex flex-col relative w-full overflow-hidden bg-background/50", children: /* @__PURE__ */ c.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 lg:px-12 pb-20 pt-0 scroll-smooth", children: /* @__PURE__ */ c.jsx("div", { className: "max-w-6xl mx-auto min-h-full fade-in pt-6", children: o }) }) })
    ] })
  ] });
}, vf = ({
  title: o,
  value: s,
  icon: d,
  subtext: h,
  highlight: x = !1
}) => /* @__PURE__ */ c.jsxs("div", { className: `flex-1 flex flex-col p-4 bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md ${x ? "bg-primary-10 border-primary-30" : ""}`, children: [
  /* @__PURE__ */ c.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
    /* @__PURE__ */ c.jsx("div", { className: `p-2 rounded-lg ${x ? "bg-primary-20 text-primary" : "bg-secondary text-secondary-foreground"}`, children: /* @__PURE__ */ c.jsx(d, { size: 20 }) }),
    x && /* @__PURE__ */ c.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" })
  ] }),
  /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("div", { className: "text-2xl font-bold text-foreground font-mono", children: s }),
    /* @__PURE__ */ c.jsx("div", { className: "text-[11px] text-muted-foreground font-semibold mt-1 tracking-[0.5px]", children: o }),
    h && /* @__PURE__ */ c.jsx("div", { className: "text-[10px] text-muted-foreground/70 mt-0.5", children: h })
  ] })
] });
function as() {
  var o, s;
  try {
    return ((s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) || null;
  } catch (d) {
    return console.warn("[Engram] Failed to get ST context:", d), null;
  }
}
function Ig() {
  return as() !== null;
}
async function f0() {
  const { Logger: o } = await Promise.resolve().then(() => V0);
  await o.init(), o.info("STBridge", "Engram 插件正在初始化...");
  try {
    const { checkTavernIntegration: d } = await Promise.resolve().then(() => db), h = await d();
    o.info("TavernAPI", "酒馆接口对接状态", h);
  } catch (d) {
    o.warn("TavernAPI", "酒馆接口检查失败", { error: String(d) });
  }
  try {
    const { summarizerService: d } = await Promise.resolve().then(() => Eu);
    d.start();
    const h = d.getStatus();
    o.info("Summarizer", "服务已启动", h);
  } catch (d) {
    o.warn("Summarizer", "服务启动失败", { error: String(d) });
  }
  Wg();
  const { ThemeManager: s } = await Promise.resolve().then(() => Vg);
  s.init(), o.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const Z0 = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function Wg() {
  const o = document.querySelector("#top-settings-holder"), s = document.querySelector("#WI-SP-button");
  if (!o) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), ev();
    return;
  }
  const d = document.createElement("div");
  d.id = "engram-drawer", d.className = "drawer";
  const h = document.createElement("div");
  h.className = "drawer-toggle drawer-header";
  const x = document.createElement("div");
  x.id = "engram-drawer-icon", x.className = "drawer-icon fa-fw closedIcon", x.title = "Engram - 记忆操作系统", x.setAttribute("data-i18n", "[title]Engram - Memory OS"), x.innerHTML = Z0, x.addEventListener("click", ls), h.appendChild(x), d.appendChild(h), s ? (o.insertBefore(d, s), console.log("[Engram] Top bar button injected before WI-SP-button")) : (o.appendChild(d), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function ev() {
  const o = document.createElement("div");
  o.className = "fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white", o.title = "Engram - 记忆操作系统", o.innerHTML = Z0, o.addEventListener("click", ls), document.body.appendChild(o);
}
let Af = null;
function tv(o) {
  Af = o;
}
let bf = !1, ju = null, Wo = null;
function ls() {
  bf && ju ? (Wo && (Wo.unmount(), Wo = null), ju.remove(), ju = null, bf = !1) : (ju = nv(), document.body.appendChild(ju), bf = !0);
}
function nv() {
  var s;
  const o = document.createElement("div");
  return o.className = "fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden", o.style.backgroundColor = "var(--background)", o.style.color = "var(--foreground)", o.style.height = "100dvh", o.style.width = "100vw", o.style.top = "0", o.style.left = "0", o.id = "engram-panel-root", Af ? Wo = Af(o, ls) : (o.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (s = o.querySelector("button")) == null || s.addEventListener("click", ls)), o;
}
const av = (o) => {
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
}, d0 = ({ onNavigate: o }) => {
  const [s, d] = le.useState([]), [h, x] = le.useState(as()), [S, M] = le.useState(0);
  le.useEffect(() => (d(un.getLogs().slice(0, 3)), un.subscribe((Q) => {
    d((re) => [Q, ...re].slice(0, 3));
  })), []), le.useEffect(() => {
    const $ = setInterval(() => {
      M((Q) => Q + 1);
    }, 1e3);
    return () => clearInterval($);
  }, []);
  const R = ($) => {
    const Q = Math.floor($ / 3600), re = Math.floor($ % 3600 / 60), we = $ % 60;
    return `${Q.toString().padStart(2, "0")}:${re.toString().padStart(2, "0")}:${we.toString().padStart(2, "0")}`;
  }, k = (h == null ? void 0 : h.name2) || "Unknown", D = ($) => {
    o && o($);
  };
  return /* @__PURE__ */ c.jsx("div", { className: "h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1000px] mx-auto", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 col-span-full", children: [
      /* @__PURE__ */ c.jsx(
        vf,
        {
          title: "ACTIVE MODEL",
          value: h ? "Connected" : "Offline",
          subtext: h ? `Chatting with ${k}` : "Waiting for connection...",
          icon: B0,
          highlight: !!h
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: ss
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          title: "SYSTEM UPTIME",
          value: R(S),
          subtext: "Session Duration",
          icon: os
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ c.jsx(qf, { size: 16 }),
        /* @__PURE__ */ c.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex-1 grid grid-cols-4 gap-3 p-4", children: [
        /* @__PURE__ */ c.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => D("memory"), children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-2xl", children: "📜" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-xs font-medium", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ c.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => D("graph"), children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-2xl", children: "🕸️" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-xs font-medium", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ c.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => D("processing"), children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-2xl", children: "🧠" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-xs font-medium", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ c.jsxs("button", { className: "flex flex-col items-center justify-center gap-2 p-3 bg-background border border-border rounded-xl cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-accent hover:-translate-y-0.5 hover:text-accent-foreground", onClick: () => D("settings"), children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-2xl", children: "⚙️" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-xs font-medium", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col bg-card border border-border rounded-lg overflow-hidden relative transition-all duration-200 hover:shadow-md", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 p-4 text-xs font-bold tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ c.jsx(br, { size: 16 }),
        /* @__PURE__ */ c.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ c.jsx("button", { className: "ml-auto text-[10px] text-primary bg-transparent border-none cursor-pointer opacity-80 hover:opacity-100 hover:underline", onClick: () => D("devlog"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "flex-1 p-3 font-mono text-[11px] bg-muted/20 overflow-hidden", children: s.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: "text-muted-foreground text-center mt-5 italic", children: "No activity recorded" }) : s.map(($) => /* @__PURE__ */ c.jsxs("div", { className: `flex gap-2 mb-1.5 opacity-80 ${av($.level)}`, children: [
        /* @__PURE__ */ c.jsxs("span", { className: "text-muted-foreground", children: [
          "[",
          new Date($.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "text-foreground flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis", children: $.message })
      ] }, $.id)) })
    ] })
  ] }) });
}, hs = ({ title: o, subtitle: s, actions: d }) => /* @__PURE__ */ c.jsxs("div", { className: "mb-8 px-4 md:px-0 flex justify-between items-start animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
  /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("h1", { className: "text-3xl font-light tracking-tight text-foreground", children: o }),
    s && /* @__PURE__ */ c.jsx("p", { className: "mt-2 text-muted-foreground text-sm font-light", children: s })
  ] }),
  d && /* @__PURE__ */ c.jsx("div", { className: "flex gap-2", children: d })
] }), h0 = ({
  icon: o,
  label: s,
  primary: d = !1,
  size: h = "md",
  className: x = "",
  ...S
}) => /* @__PURE__ */ c.jsxs(
  "button",
  {
    className: `
            flex items-center gap-2 rounded-full font-medium transition-all active:scale-95
            ${h === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}
            ${d ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_15px_var(--primary)] border border-transparent" : "text-muted-foreground hover:text-foreground border border-border hover:border-input bg-muted/50 hover:bg-muted"}
            ${x}
        `,
    ...S,
    children: [
      o && /* @__PURE__ */ c.jsx(o, { size: h === "sm" ? 14 : 16 }),
      s
    ]
  }
), lv = () => {
  const [o] = le.useState([
    { id: "1", x: 250, y: 150, label: "User Input", type: "input" },
    { id: "2", x: 250, y: 300, label: "Memory Retriever", type: "process" },
    { id: "3", x: 100, y: 450, label: "Summary Agent", type: "output" },
    { id: "4", x: 400, y: 450, label: "Context Builder", type: "output" }
  ]), s = [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "2", target: "4" }
  ];
  return /* @__PURE__ */ c.jsxs("div", { className: "h-full flex flex-col relative bg-card rounded-xl overflow-hidden border border-border shadow-inner group", children: [
    /* @__PURE__ */ c.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.15] pointer-events-none",
        style: {
          backgroundImage: "radial-gradient(#555 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
      /* @__PURE__ */ c.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ c.jsx(Uf, { size: 16 }) }),
      /* @__PURE__ */ c.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ c.jsx(Oy, { size: 16 }) }),
      /* @__PURE__ */ c.jsx("button", { className: "p-2 bg-muted text-muted-foreground hover:text-foreground rounded border border-border shadow-lg hover:border-border transition-colors", children: /* @__PURE__ */ c.jsx(Bf, { size: 16 }) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "absolute bottom-4 left-4 z-10 bg-muted/80 backdrop-blur border border-border px-3 py-1.5 rounded-full text-[10px] text-muted-foreground font-mono tracking-wider uppercase", children: "Render Engine: Mock 1.0" }),
    /* @__PURE__ */ c.jsxs("svg", { className: "w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ c.jsx("defs", { children: /* @__PURE__ */ c.jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "9", refY: "3.5", orient: "auto", children: /* @__PURE__ */ c.jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#3b82f6", opacity: "0.5" }) }) }),
      s.map((d, h) => {
        const x = o.find((Q) => Q.id === d.source), S = o.find((Q) => Q.id === d.target);
        if (!x || !S) return null;
        const M = x.x + 150 / 2, R = x.y + 60, k = S.x + 150 / 2, D = S.y, $ = `M ${M} ${R} C ${M} ${R + 50}, ${k} ${D - 50}, ${k} ${D}`;
        return /* @__PURE__ */ c.jsx("g", { children: /* @__PURE__ */ c.jsx("path", { d: $, stroke: "#3b82f6", strokeWidth: "1.5", fill: "none", className: "opacity-40", markerEnd: "url(#arrowhead)" }) }, h);
      })
    ] }),
    o.map((d) => /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: "absolute w-[150px] group/node cursor-grab active:cursor-grabbing",
        style: { left: d.x, top: d.y },
        children: [
          d.type !== "input" && /* @__PURE__ */ c.jsx("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          d.type !== "output" && /* @__PURE__ */ c.jsx("div", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-muted-foreground rounded-full border border-background z-10" }),
          /* @__PURE__ */ c.jsxs("div", { className: `
                        bg-background/90 border rounded-md p-3 backdrop-blur-sm transition-all duration-300
                        ${d.type === "input" ? "border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-border group-hover/node:border-border shadow-lg"}
                    `, children: [
            /* @__PURE__ */ c.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-widest mb-2 font-bold", children: d.type }),
            /* @__PURE__ */ c.jsxs("div", { className: "text-xs text-foreground font-medium flex items-center gap-2", children: [
              d.type === "input" && /* @__PURE__ */ c.jsx(br, { size: 12, className: "text-blue-400" }),
              d.type === "process" && /* @__PURE__ */ c.jsx(os, { size: 12, className: "text-purple-400" }),
              d.type === "output" && /* @__PURE__ */ c.jsx(ss, { size: 12, className: "text-emerald-400" }),
              d.label
            ] })
          ] })
        ]
      },
      d.id
    ))
  ] });
}, rv = () => /* @__PURE__ */ c.jsxs("div", { className: "h-[calc(100vh-140px)] animate-in fade-in flex flex-col", children: [
  /* @__PURE__ */ c.jsx(
    hs,
    {
      title: "神经图谱",
      subtitle: "知识节点可视化",
      actions: /* @__PURE__ */ c.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ c.jsx(h0, { icon: Rf, label: "Auto Layout", size: "sm" }),
        /* @__PURE__ */ c.jsx(h0, { icon: Bf, label: "Config", size: "sm" })
      ] })
    }
  ),
  /* @__PURE__ */ c.jsx("div", { className: "flex-1 pb-4 min-h-0", children: /* @__PURE__ */ c.jsx(lv, {}) })
] });
function iv(o) {
  return new Date(o).toTimeString().slice(0, 8);
}
const uv = {
  [pt.DEBUG]: "text-muted-foreground",
  [pt.INFO]: "text-blue-400",
  [pt.SUCCESS]: "text-green-400",
  [pt.WARN]: "text-yellow-400",
  [pt.ERROR]: "text-red-400"
}, ov = ({ entry: o }) => {
  const [s, d] = le.useState(!1), h = o.data !== void 0, x = ts[o.level], S = uv[o.level] || "";
  return /* @__PURE__ */ c.jsxs("div", { className: "mb-0.5", children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `flex items-start gap-2 px-1 py-0.5 rounded-sm transition-colors hover:bg-muted-50 ${h ? "cursor-pointer" : ""}`,
        onClick: () => h && d(!s),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: "flex items-center text-muted-foreground shrink-0", children: h ? s ? /* @__PURE__ */ c.jsx(Cu, { size: 12 }) : /* @__PURE__ */ c.jsx(A0, { size: 12 }) : /* @__PURE__ */ c.jsx("span", { style: { width: 12, display: "inline-block" } }) }),
          /* @__PURE__ */ c.jsxs("span", { className: "text-muted-foreground shrink-0", children: [
            "[",
            iv(o.timestamp),
            "]"
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: "text-purple-400 shrink-0 whitespace-pre", children: [
            "[",
            o.module.padEnd(16),
            "]"
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: `shrink-0 whitespace-pre ${S}`, children: [
            x.icon,
            " ",
            x.label.padEnd(7)
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: "text-foreground break-words", children: o.message })
        ]
      }
    ),
    s && h && /* @__PURE__ */ c.jsx("div", { className: "ml-8 px-3 py-2 bg-muted-30 border-l-2 border-border rounded-r-sm", children: /* @__PURE__ */ c.jsx("pre", { className: "m-0 text-muted-foreground text-sm whitespace-pre-wrap break-words", children: JSON.stringify(o.data, null, 2) }) })
  ] });
}, m0 = 100;
class sv {
  constructor() {
    wt(this, "entries", []);
    wt(this, "listeners", /* @__PURE__ */ new Set());
  }
  /**
   * 创建新的日志条目（发送阶段）
   */
  logSend(s) {
    const d = `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, h = {
      id: d,
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
    return this.entries.unshift(h), this.trimEntries(), this.notifyListeners(), d;
  }
  /**
   * 更新日志条目（接收阶段）
   */
  logReceive(s, d) {
    const h = this.entries.find((M) => M.id === s);
    if (!h) return;
    const x = {
      id: `${s}_recv`,
      timestamp: Date.now(),
      type: h.type,
      direction: "received",
      response: d.response,
      tokensReceived: d.tokensReceived,
      status: d.status,
      error: d.error,
      duration: d.duration,
      model: h.model,
      floorRange: h.floorRange
    };
    h.status = d.status, h.duration = d.duration;
    const S = this.entries.findIndex((M) => M.id === s);
    S >= 0 ? this.entries.splice(S, 0, x) : this.entries.unshift(x), this.trimEntries(), this.notifyListeners();
  }
  /**
   * 快捷方法：记录完整的调用过程
   */
  async logCall(s, d) {
    const h = this.logSend(s), x = Date.now();
    try {
      const S = await d();
      return this.logReceive(h, {
        response: typeof S == "string" ? S : JSON.stringify(S),
        status: "success",
        duration: Date.now() - x
      }), S;
    } catch (S) {
      throw this.logReceive(h, {
        status: "error",
        error: S instanceof Error ? S.message : String(S),
        duration: Date.now() - x
      }), S;
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
    const s = [], d = this.entries.filter((h) => h.direction === "sent");
    for (const h of d) {
      const x = this.entries.find(
        (S) => S.id === `${h.id}_recv` && S.direction === "received"
      );
      s.push({ sent: h, received: x });
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
    this.entries.length > m0 * 2 && (this.entries = this.entries.slice(0, m0 * 2));
  }
  /**
   * 通知监听器
   */
  notifyListeners() {
    for (const s of this.listeners)
      s();
  }
}
const pi = new sv(), cv = {
  summarize: { label: "总结", color: "bg-blue-500/20 text-blue-400" },
  vectorize: { label: "向量化", color: "bg-purple-500/20 text-purple-400" },
  query: { label: "查询", color: "bg-green-500/20 text-green-400" },
  other: { label: "其他", color: "bg-gray-500/20 text-gray-400" }
}, fv = ({ status: o }) => {
  switch (o) {
    case "pending":
      return /* @__PURE__ */ c.jsx(M0, { size: 14, className: "animate-spin text-yellow-400" });
    case "success":
      return /* @__PURE__ */ c.jsx(k0, { size: 14, className: "text-green-400" });
    case "error":
      return /* @__PURE__ */ c.jsx(Mf, { size: 14, className: "text-red-400" });
  }
}, dv = (o) => new Date(o).toLocaleTimeString("zh-CN", {
  hour12: !1,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}), hv = (o) => o === void 0 ? "-" : o < 1e3 ? `${o}ms` : `${(o / 1e3).toFixed(1)}s`, mv = ({ sent: o, received: s }) => {
  const [d, h] = le.useState(!1), x = cv[o.type];
  return /* @__PURE__ */ c.jsxs("div", { className: "border border-border rounded-lg overflow-hidden bg-card", children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 bg-muted-20 cursor-pointer hover:bg-muted-30",
        onClick: () => h(!d),
        children: [
          d ? /* @__PURE__ */ c.jsx(Cu, { size: 14 }) : /* @__PURE__ */ c.jsx(A0, { size: 14 }),
          /* @__PURE__ */ c.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${x.color}`, children: x.label }),
          /* @__PURE__ */ c.jsx("span", { className: "text-xs text-muted-foreground", children: dv(o.timestamp) }),
          /* @__PURE__ */ c.jsx(fv, { status: (s == null ? void 0 : s.status) || o.status }),
          o.floorRange && /* @__PURE__ */ c.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "楼层 #",
            o.floorRange[0],
            "-",
            o.floorRange[1]
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ c.jsx(iy, { size: 12 }),
            hv((s == null ? void 0 : s.duration) || o.duration)
          ] })
        ]
      }
    ),
    d && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex-1 border-r border-border p-3", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-blue-400", children: [
          /* @__PURE__ */ c.jsx(Iy, { size: 14 }),
          "发送",
          o.tokensSent && /* @__PURE__ */ c.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            o.tokensSent,
            " tokens"
          ] })
        ] }),
        o.systemPrompt && /* @__PURE__ */ c.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ c.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "System" }),
          /* @__PURE__ */ c.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-32 overflow-y-auto whitespace-pre-wrap", children: o.systemPrompt })
        ] }),
        o.userPrompt && /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "User" }),
          /* @__PURE__ */ c.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: o.userPrompt })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex-1 p-3", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 mb-2 text-sm font-medium text-green-400", children: [
          /* @__PURE__ */ c.jsx(N0, { size: 14 }),
          "接收",
          (s == null ? void 0 : s.tokensReceived) && /* @__PURE__ */ c.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            "~",
            s.tokensReceived,
            " tokens"
          ] })
        ] }),
        (s == null ? void 0 : s.status) === "error" && s.error && /* @__PURE__ */ c.jsx("div", { className: "p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400", children: s.error }),
        (s == null ? void 0 : s.response) && /* @__PURE__ */ c.jsx("div", { className: "text-sm p-2 bg-muted-20 rounded max-h-48 overflow-y-auto whitespace-pre-wrap", children: s.response }),
        !s && o.status === "pending" && /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ c.jsx(M0, { size: 14, className: "animate-spin" }),
          "等待响应..."
        ] })
      ] })
    ] })
  ] });
}, pv = () => {
  const [o, s] = le.useState(pi.getPaired());
  return le.useEffect(() => pi.subscribe(() => {
    s(pi.getPaired());
  }), []), /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ c.jsx(qf, { size: 16, className: "text-primary" }),
        /* @__PURE__ */ c.jsx("span", { className: "font-medium text-foreground", children: "模型调用日志" }),
        /* @__PURE__ */ c.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          o.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          className: "p-1.5 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors text-muted-foreground",
          onClick: () => pi.clear(),
          title: "清除日志",
          children: /* @__PURE__ */ c.jsx(ku, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: o.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-3", children: [
      /* @__PURE__ */ c.jsx(N0, { size: 48, className: "opacity-30" }),
      /* @__PURE__ */ c.jsx("p", { className: "text-sm", children: "暂无模型调用记录" }),
      /* @__PURE__ */ c.jsx("p", { className: "text-xs", children: "触发总结或向量化后，调用记录将显示在这里" })
    ] }) : /* @__PURE__ */ c.jsx("div", { className: "flex flex-col gap-3", children: o.map(({ sent: d, received: h }) => /* @__PURE__ */ c.jsx(mv, { sent: d, received: h }, d.id)) }) })
  ] });
}, Kf = ({ tabs: o, activeTab: s, onChange: d, sticky: h = !0, className: x = "" }) => /* @__PURE__ */ c.jsx("div", { className: `
        flex overflow-x-auto gap-2 mb-6 pb-1 no-scrollbar border-b border-border
        ${h ? "sticky top-0 z-10 bg-background py-2 -mx-6 px-6 md:-mx-12 md:px-12" : "px-4 md:px-0"}
        ${x}
    `, children: o.map((S) => /* @__PURE__ */ c.jsxs(
  "button",
  {
    onClick: () => d(S.id),
    className: `flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm transition-all relative ${s === S.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
    children: [
      S.icon && /* @__PURE__ */ c.jsx("span", { className: "w-4 h-4", children: S.icon }),
      S.label,
      s === S.id && /* @__PURE__ */ c.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]" })
    ]
  },
  S.id
)) }), yv = [
  { id: "runtime", label: "运行日志", icon: /* @__PURE__ */ c.jsx(br, { size: 14 }) },
  { id: "model", label: "模型日志", icon: /* @__PURE__ */ c.jsx(qf, { size: 14 }) }
], gv = [
  "ALL",
  "Logger",
  "EventBus",
  "Summarizer",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], vv = () => {
  const [o, s] = le.useState("runtime"), [d, h] = le.useState([]), [x, S] = le.useState([]), [M, R] = le.useState(""), [k, D] = le.useState(-1), [$, Q] = le.useState("ALL"), [re, we] = le.useState(!0), [Ae, oe] = le.useState(!1), [ke, pe] = le.useState(!1), Me = le.useRef(null);
  le.useEffect(() => {
    h(un.getLogs());
    const Ue = un.subscribe((Be) => {
      h((Se) => [...Se, Be]);
    });
    return () => Ue();
  }, []), le.useEffect(() => {
    let Ue = d;
    if (k !== -1 && (Ue = Ue.filter((Be) => Be.level >= k)), $ !== "ALL" && (Ue = Ue.filter((Be) => Be.module.startsWith($))), M.trim()) {
      const Be = M.toLowerCase();
      Ue = Ue.filter(
        (Se) => Se.message.toLowerCase().includes(Be) || Se.module.toLowerCase().includes(Be)
      );
    }
    S(Ue);
  }, [d, k, $, M]), le.useEffect(() => {
    re && Me.current && Me.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [x, re]);
  const fe = le.useCallback(async () => {
    await un.clear(), h([]);
  }, []), Oe = le.useCallback(() => {
    const Ue = un.exportToMarkdown(), Be = un.getExportFilename(), Se = new Blob([Ue], { type: "text/markdown" }), ft = URL.createObjectURL(Se), kt = document.createElement("a");
    kt.href = ft, kt.download = Be, kt.click(), URL.revokeObjectURL(ft), un.success("DevLog", `日志已导出: ${Be}`);
  }, []);
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ c.jsx(br, { size: 20, className: "text-muted-foreground" }),
      /* @__PURE__ */ c.jsx("h1", { className: "text-xl font-light text-foreground tracking-tight", children: "开发日志" })
    ] }),
    /* @__PURE__ */ c.jsx(
      Kf,
      {
        tabs: yv,
        activeTab: o,
        onChange: (Ue) => s(Ue)
      }
    ),
    o === "runtime" && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col flex-1 min-h-0", children: [
      /* @__PURE__ */ c.jsx("div", { className: "sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border", children: /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => oe(!Ae),
              children: [
                k === -1 ? "全部级别" : ts[k].label,
                /* @__PURE__ */ c.jsx(Cu, { size: 12 })
              ]
            }
          ),
          Ae && /* @__PURE__ */ c.jsxs("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[100px] py-1", children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  D(-1), oe(!1);
                },
                children: "全部级别"
              }
            ),
            Object.entries(ts).map(([Ue, Be]) => /* @__PURE__ */ c.jsxs(
              "button",
              {
                className: "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                onClick: () => {
                  D(Number(Ue)), oe(!1);
                },
                children: [
                  Be.icon,
                  " ",
                  Be.label
                ]
              },
              Ue
            ))
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ c.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => pe(!ke),
              children: [
                $,
                /* @__PURE__ */ c.jsx(Cu, { size: 12 })
              ]
            }
          ),
          ke && /* @__PURE__ */ c.jsx("div", { className: "absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-20 min-w-[120px] py-1 max-h-48 overflow-y-auto", children: gv.map((Ue) => /* @__PURE__ */ c.jsx(
            "button",
            {
              className: "w-full text-left px-3 py-1.5 text-xs hover:bg-accent transition-colors",
              onClick: () => {
                Q(Ue), pe(!1);
              },
              children: Ue
            },
            Ue
          )) })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "w-px h-4 bg-border" }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ c.jsx(Sf, { size: 12 }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索日志...",
              value: M,
              onChange: (Ue) => R(Ue.target.value),
              className: "bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground w-24 md:w-40"
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-1 ml-auto", children: [
          /* @__PURE__ */ c.jsx(
            "button",
            {
              className: `p-1.5 rounded transition-colors ${re ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
              onClick: () => we(!re),
              title: "自动滚动",
              children: /* @__PURE__ */ c.jsx(H1, { size: 14 })
            }
          ),
          /* @__PURE__ */ c.jsx(
            "button",
            {
              className: "p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors",
              onClick: fe,
              title: "清空",
              children: /* @__PURE__ */ c.jsx(ku, { size: 14 })
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
              onClick: Oe,
              children: [
                /* @__PURE__ */ c.jsx(z0, { size: 12 }),
                "导出"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ c.jsx("div", { className: "flex-1 overflow-y-auto font-mono text-xs leading-relaxed py-2", children: x.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ c.jsx(br, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ c.jsx("p", { className: "text-sm font-light", children: "暂无日志记录" })
      ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        x.map((Ue) => /* @__PURE__ */ c.jsx(ov, { entry: Ue }, Ue.id)),
        /* @__PURE__ */ c.jsx("div", { ref: Me })
      ] }) }),
      /* @__PURE__ */ c.jsxs("div", { className: "text-[10px] text-muted-foreground py-2 border-t border-border", children: [
        d.length,
        " 条日志",
        x.length !== d.length && ` · ${x.length} 条匹配`
      ] })
    ] }),
    o === "model" && /* @__PURE__ */ c.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ c.jsx(pv, {}) })
  ] });
}, bv = ({
  preset: o,
  isSelected: s,
  onSelect: d,
  onEdit: h,
  onCopy: x,
  onDelete: S
}) => {
  var k;
  const M = o.source === "tavern" || o.source === "tavern_profile" ? B0 : oy;
  o.source === "tavern" || o.source;
  const R = o.source === "custom" ? ((k = o.custom) == null ? void 0 : k.model) || "未设置" : "使用当前";
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: `
                group p-3 rounded-lg transition-all duration-200 cursor-pointer border
                ${s ? "bg-accent/50 border-input shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: d,
      children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ c.jsx(
            "div",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                        ${s ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"}
                    `,
              children: /* @__PURE__ */ c.jsx(M, { size: 16 })
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ c.jsx("h4", { className: `m-0 text-sm font-medium ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: o.name }),
              o.isDefault && /* @__PURE__ */ c.jsx("span", { className: "px-1.5 py-0.5 text-[10px] bg-primary/10 text-primary rounded-sm font-medium", children: "DEFAULT" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ c.jsxs("span", { className: "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground font-mono hidden md:inline-block", children: [
                "T:",
                o.parameters.temperature
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: "text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground truncate", children: R })
            ] })
          ] }),
          s && /* @__PURE__ */ c.jsx(I1, { size: 14, className: "text-primary" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${s || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: h, children: /* @__PURE__ */ c.jsx(Hy, { size: 12 }) }),
          /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: x, children: /* @__PURE__ */ c.jsx(O0, { size: 12 }) }),
          !o.isDefault && /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: S, children: /* @__PURE__ */ c.jsx(ku, { size: 12 }) })
        ] })
      ]
    }
  );
}, xn = ({ title: o, description: s, children: d, className: h = "" }) => /* @__PURE__ */ c.jsxs("div", { className: `mb-8 ${h}`, children: [
  /* @__PURE__ */ c.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "text-sm font-medium text-foreground", children: o }),
    s && /* @__PURE__ */ c.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s })
  ] }),
  /* @__PURE__ */ c.jsx("div", { className: "space-y-4", children: d })
] }), Sn = ({
  label: o,
  description: s,
  error: d,
  required: h,
  className: x = "",
  value: S,
  onChange: M,
  placeholder: R,
  type: k = "text",
  disabled: D,
  multiline: $,
  rows: Q = 3
}) => /* @__PURE__ */ c.jsxs("div", { className: `flex flex-col gap-1.5 ${x}`, children: [
  /* @__PURE__ */ c.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    o,
    h && /* @__PURE__ */ c.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ c.jsx("div", { className: "relative group", children: $ ? /* @__PURE__ */ c.jsx(
    "textarea",
    {
      value: S,
      onChange: (re) => M(re.target.value),
      placeholder: R,
      disabled: D,
      rows: Q,
      className: `
                            engram-input w-full bg-transparent text-foreground text-sm px-3 py-2 border border-input rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) : /* @__PURE__ */ c.jsx(
    "input",
    {
      type: k,
      value: S,
      onChange: (re) => M(re.target.value),
      placeholder: R,
      disabled: D,
      className: `
                            engram-input w-full bg-transparent text-foreground text-sm px-3 py-2 border border-input rounded-md
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono placeholder-muted-foreground/50
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `
    }
  ) }),
  s && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: s }),
  d && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-destructive", children: d })
] }), Vn = ({
  label: o,
  description: s,
  error: d,
  required: h,
  className: x = "",
  value: S,
  onChange: M,
  min: R,
  max: k,
  step: D = 1,
  showSlider: $ = !0
}) => /* @__PURE__ */ c.jsxs("div", { className: `flex flex-col gap-1.5 ${x}`, children: [
  /* @__PURE__ */ c.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ c.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
      o,
      h && /* @__PURE__ */ c.jsx("span", { className: "text-destructive", children: "*" })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded", children: S })
  ] }),
  /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-3", children: [
    $ && R !== void 0 && k !== void 0 && /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "range",
        min: R,
        max: k,
        step: D,
        value: S,
        onChange: (Q) => M(Number(Q.target.value)),
        className: "flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80"
      }
    ),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        type: "number",
        min: R,
        max: k,
        step: D,
        value: S,
        onChange: (Q) => M(Number(Q.target.value)),
        className: `
                        bg-transparent border border-input rounded-md text-foreground text-xs px-2 py-1 font-mono text-center
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-20
                        [appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
                    `
      }
    )
  ] }),
  s && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: s }),
  d && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-destructive", children: d })
] }), vr = ({
  label: o,
  description: s,
  error: d,
  required: h,
  className: x = "",
  value: S,
  onChange: M,
  options: R,
  placeholder: k = "Select...",
  disabled: D
}) => /* @__PURE__ */ c.jsxs("div", { className: `flex flex-col gap-1.5 ${x}`, children: [
  /* @__PURE__ */ c.jsxs("label", { className: "text-xs font-medium text-muted-foreground flex items-center gap-1", children: [
    o,
    h && /* @__PURE__ */ c.jsx("span", { className: "text-destructive", children: "*" })
  ] }),
  /* @__PURE__ */ c.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        value: S,
        onChange: ($) => M($.target.value),
        disabled: D,
        className: `
                        engram-select w-full bg-transparent text-foreground text-sm pl-3 pr-8 py-2 border border-input rounded-md
                        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `,
        children: [
          /* @__PURE__ */ c.jsx("option", { value: "", disabled: !0, className: "bg-popover text-muted-foreground", children: k }),
          R.map(($) => /* @__PURE__ */ c.jsx("option", { value: $.value, className: "bg-popover text-foreground", children: $.label }, $.value))
        ]
      }
    ),
    /* @__PURE__ */ c.jsx(Cu, { size: 14, className: "absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" })
  ] }),
  s && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-muted-foreground/80", children: s }),
  d && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-destructive", children: d })
] }), Nu = ({
  label: o,
  description: s,
  error: d,
  className: h = "",
  checked: x,
  onChange: S,
  disabled: M
}) => /* @__PURE__ */ c.jsxs("div", { className: `flex items-start justify-between gap-4 py-1 ${h} ${M ? "opacity-50 pointer-events-none" : ""}`, children: [
  /* @__PURE__ */ c.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ c.jsx("label", { className: "text-xs font-medium text-foreground cursor-pointer", onClick: () => !M && S(!x), children: o }),
    s && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-muted-foreground/80 mt-0.5", children: s }),
    d && /* @__PURE__ */ c.jsx("p", { className: "text-[10px] text-destructive mt-0.5", children: d })
  ] }),
  /* @__PURE__ */ c.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": x,
      onClick: () => !M && S(!x),
      disabled: M,
      className: `
                    relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                    ${x ? "bg-primary" : "bg-input"}
                `,
      children: /* @__PURE__ */ c.jsx(
        "span",
        {
          className: `
                        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${x ? "translate-x-4" : "translate-x-0"}
                    `
        }
      )
    }
  )
] }), xv = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "custom", label: "自定义" }
], Sv = [
  { value: "tavern", label: "使用酒馆当前配置" },
  { value: "tavern_profile", label: "使用酒馆配置文件" },
  { value: "custom", label: "自定义 API 配置" }
];
function _v() {
  var o, s, d, h;
  try {
    const x = (d = (s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) == null ? void 0 : d.extensionSettings;
    return ((h = x == null ? void 0 : x.connectionManager) == null ? void 0 : h.profiles) || [];
  } catch (x) {
    return console.warn("[Engram] 无法获取酒馆 connection_profiles:", x), [];
  }
}
const jv = ({
  preset: o,
  onChange: s,
  isNew: d = !1
}) => {
  var oe, ke, pe, Me;
  const [h, x] = le.useState([]), [S, M] = le.useState(!1), R = () => {
    M(!0);
    try {
      const fe = _v();
      x(fe);
    } finally {
      M(!1);
    }
  };
  le.useEffect(() => {
    R();
  }, []);
  const k = (fe) => {
    s({ ...o, ...fe, updatedAt: Date.now() });
  }, D = (fe, Oe) => {
    k({
      parameters: { ...o.parameters, [fe]: Oe }
    });
  }, $ = (fe, Oe) => {
    k({
      context: { ...o.context, [fe]: Oe }
    });
  }, Q = (fe, Oe) => {
    var Ue, Be, Se, ft;
    k({
      custom: {
        apiUrl: ((Ue = o.custom) == null ? void 0 : Ue.apiUrl) || "",
        apiKey: ((Be = o.custom) == null ? void 0 : Be.apiKey) || "",
        model: ((Se = o.custom) == null ? void 0 : Se.model) || "",
        apiSource: ((ft = o.custom) == null ? void 0 : ft.apiSource) || "openai",
        [fe]: Oe
      }
    });
  }, re = (fe) => {
    const Oe = fe;
    k({
      source: Oe,
      tavernProfileId: Oe === "tavern_profile" ? o.tavernProfileId : void 0
    }), Oe === "tavern_profile" && R();
  }, we = h.map((fe) => ({
    value: fe.id,
    label: `${fe.name} (${fe.api || "Unknown"} - ${fe.model || "Unknown"})`
  })), Ae = h.find((fe) => fe.id === o.tavernProfileId);
  return /* @__PURE__ */ c.jsxs("div", { className: "", children: [
    /* @__PURE__ */ c.jsxs(xn, { title: "基本信息", children: [
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "预设名称",
          value: o.name,
          onChange: (fe) => k({ name: fe }),
          placeholder: "输入预设名称",
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        vr,
        {
          label: "配置源",
          value: o.source,
          onChange: re,
          options: Sv,
          description: "选择 API 配置的来源"
        }
      )
    ] }),
    o.source === "tavern_profile" && /* @__PURE__ */ c.jsxs(xn, { title: "酒馆配置文件", description: "选择一个已保存的酒馆连接配置", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ c.jsx(
          vr,
          {
            className: "flex-1 !mb-0",
            label: "选择配置文件",
            value: o.tavernProfileId || "",
            onChange: (fe) => k({ tavernProfileId: fe }),
            options: we,
            placeholder: S ? "加载中..." : "请选择配置文件",
            disabled: S || we.length === 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: "h-[42px] w-[42px] min-w-[42px] flex items-center justify-center border-none rounded-md bg-muted text-muted-foreground cursor-pointer transition-all hover:bg-accent hover:text-foreground",
            onClick: R,
            disabled: S,
            title: "刷新配置列表",
            children: /* @__PURE__ */ c.jsx(xf, { size: 16, className: S ? "animate-spin" : "" })
          }
        )
      ] }),
      we.length === 0 && !S && /* @__PURE__ */ c.jsx("div", { className: "p-3 bg-muted/30 border border-dashed border-border rounded-lg text-muted-foreground text-sm text-center mt-3", children: "未找到酒馆配置文件。请在酒馆中创建连接配置后刷新。" }),
      Ae && /* @__PURE__ */ c.jsxs("div", { className: "mt-4 p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "API:" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-foreground font-mono", children: Ae.api || "-" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "模型:" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-foreground font-mono", children: Ae.model || "-" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 py-1 text-sm border-b border-border last:border-0", children: [
          /* @__PURE__ */ c.jsx("span", { className: "text-muted-foreground min-w-[60px]", children: "预设:" }),
          /* @__PURE__ */ c.jsx("span", { className: "text-foreground font-mono", children: Ae.preset || "-" })
        ] })
      ] })
    ] }),
    o.source === "custom" && /* @__PURE__ */ c.jsxs(xn, { title: "API 配置", description: "自定义 API 端点和密钥", children: [
      /* @__PURE__ */ c.jsx(
        vr,
        {
          label: "API 类型",
          value: ((oe = o.custom) == null ? void 0 : oe.apiSource) || "openai",
          onChange: (fe) => Q("apiSource", fe),
          options: xv
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "API URL",
          type: "url",
          value: ((ke = o.custom) == null ? void 0 : ke.apiUrl) || "",
          onChange: (fe) => Q("apiUrl", fe),
          placeholder: "https://api.openai.com/v1",
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "API Key",
          type: "password",
          value: ((pe = o.custom) == null ? void 0 : pe.apiKey) || "",
          onChange: (fe) => Q("apiKey", fe),
          placeholder: "sk-..."
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "模型名称",
          value: ((Me = o.custom) == null ? void 0 : Me.model) || "",
          onChange: (fe) => Q("model", fe),
          placeholder: "gpt-4o-mini",
          required: !0
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs(xn, { title: "采样参数", description: "控制模型输出的随机性和多样性", children: [
      /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "温度 (Temperature)",
          value: o.parameters.temperature,
          onChange: (fe) => D("temperature", fe),
          min: 0,
          max: 2,
          step: 0.1,
          description: "较高的值使输出更随机，较低的值使输出更确定"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "Top-P",
          value: o.parameters.topP,
          onChange: (fe) => D("topP", fe),
          min: 0,
          max: 1,
          step: 0.05,
          description: "核采样阈值，控制候选 token 的累积概率"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "最大输出 Tokens",
          value: o.parameters.maxTokens,
          onChange: (fe) => D("maxTokens", fe),
          min: 64,
          max: 16384,
          step: 64,
          showSlider: !1
        }
      ),
      /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "频率惩罚",
          value: o.parameters.frequencyPenalty,
          onChange: (fe) => D("frequencyPenalty", fe),
          min: -2,
          max: 2,
          step: 0.1,
          description: "降低重复 token 的概率"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "存在惩罚",
          value: o.parameters.presencePenalty,
          onChange: (fe) => D("presencePenalty", fe),
          min: -2,
          max: 2,
          step: 0.1,
          description: "鼓励模型讨论新主题"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs(xn, { title: "上下文设置", description: "控制发送给模型的上下文内容", children: [
      /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "聊天历史条数",
          value: o.context.maxChatHistory,
          onChange: (fe) => $("maxChatHistory", fe),
          min: 0,
          max: 100,
          step: 1,
          showSlider: !1,
          description: "使用多少条聊天历史（0 表示不使用）"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Nu,
        {
          label: "包含世界书设定",
          checked: o.context.includeWorldInfo,
          onChange: (fe) => $("includeWorldInfo", fe),
          description: "是否在提示词中包含已激活的世界书内容"
        }
      ),
      o.context.includeWorldInfo && /* @__PURE__ */ c.jsx(
        Vn,
        {
          label: "世界书 Token 预算",
          value: o.context.worldInfoBudget,
          onChange: (fe) => $("worldInfoBudget", fe),
          min: 256,
          max: 8192,
          step: 256,
          showSlider: !1,
          description: "分配给世界书内容的最大 token 数"
        }
      )
    ] })
  ] });
}, wv = [
  { value: "transformers", label: "Transformers (本地)" },
  { value: "openai", label: "OpenAI Embeddings" },
  { value: "ollama", label: "Ollama" },
  { value: "vllm", label: "vLLM" },
  { value: "cohere", label: "Cohere" },
  { value: "jina", label: "Jina AI" },
  { value: "voyage", label: "Voyage AI" }
], p0 = {
  transformers: "Xenova/all-MiniLM-L6-v2",
  openai: "text-embedding-3-small",
  ollama: "nomic-embed-text",
  vllm: "BAAI/bge-m3",
  cohere: "embed-multilingual-v3.0",
  jina: "jina-embeddings-v3",
  voyage: "voyage-large-2"
}, y0 = ["ollama", "vllm"], g0 = ["openai", "cohere", "jina", "voyage"], Ev = ({
  config: o,
  onChange: s
}) => {
  var M;
  const d = (R) => {
    s({ ...o, ...R });
  }, h = (R) => {
    d({
      source: R,
      model: p0[R],
      apiUrl: y0.includes(R) ? o.apiUrl : void 0,
      apiKey: g0.includes(R) ? o.apiKey : void 0
    });
  }, x = y0.includes(o.source), S = g0.includes(o.source);
  return /* @__PURE__ */ c.jsxs("div", { className: "", children: [
    /* @__PURE__ */ c.jsxs(xn, { title: "向量化设置", description: "配置文本向量化使用的模型和端点", children: [
      /* @__PURE__ */ c.jsx(
        vr,
        {
          label: "向量源",
          value: o.source,
          onChange: (R) => h(R),
          options: wv,
          description: "选择向量化服务提供商"
        }
      ),
      x && /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "API URL",
          type: "url",
          value: o.apiUrl || "",
          onChange: (R) => d({ apiUrl: R }),
          placeholder: o.source === "ollama" ? "http://localhost:11434" : "http://localhost:8000",
          description: `${o.source} 服务的 API 端点`
        }
      ),
      S && /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "API Key",
          type: "password",
          value: o.apiKey || "",
          onChange: (R) => d({ apiKey: R }),
          placeholder: "输入 API 密钥"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "模型名称",
          value: o.model || "",
          onChange: (R) => d({ model: R }),
          placeholder: p0[o.source],
          description: "使用的向量化模型"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(xn, { title: "高级选项", collapsible: !0, defaultCollapsed: !0, children: /* @__PURE__ */ c.jsx(
      Sn,
      {
        label: "向量维度",
        value: ((M = o.dimensions) == null ? void 0 : M.toString()) || "",
        onChange: (R) => {
          const k = parseInt(R, 10);
          d({ dimensions: isNaN(k) ? void 0 : k });
        },
        placeholder: "自动",
        description: "指定向量维度（留空则使用模型默认值）"
      }
    ) })
  ] });
}, Cv = [
  "BAAI/bge-reranker-v2-m3",
  "BAAI/bge-reranker-base",
  "BAAI/bge-reranker-large",
  "cross-encoder/ms-marco-MiniLM-L-12-v2",
  "Xenova/ms-marco-MiniLM-L-6-v2"
], Nv = ({
  config: o,
  onChange: s
}) => {
  const d = (h) => {
    s({ ...o, ...h });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "", children: [
    /* @__PURE__ */ c.jsx(xn, { title: "Rerank 设置", description: "配置重排序模型以优化检索结果", children: /* @__PURE__ */ c.jsx(
      Nu,
      {
        label: "启用 Rerank",
        checked: o.enabled,
        onChange: (h) => d({ enabled: h }),
        description: "使用 Rerank 模型对检索结果进行重新排序"
      }
    ) }),
    o.enabled && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs(xn, { title: "API 配置", children: [
        /* @__PURE__ */ c.jsx(
          Sn,
          {
            label: "API URL",
            type: "url",
            value: o.url,
            onChange: (h) => d({ url: h }),
            placeholder: "http://localhost:8000/rerank",
            description: "Rerank 服务的 API 端点",
            required: !0
          }
        ),
        /* @__PURE__ */ c.jsx(
          Sn,
          {
            label: "API Key",
            type: "password",
            value: o.apiKey,
            onChange: (h) => d({ apiKey: h }),
            placeholder: "输入 API 密钥（如需要）"
          }
        ),
        /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ c.jsx(
            Sn,
            {
              label: "模型名称",
              value: o.model,
              onChange: (h) => d({ model: h }),
              placeholder: "BAAI/bge-reranker-v2-m3",
              description: "使用的 Rerank 模型",
              required: !0
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { children: [
            /* @__PURE__ */ c.jsx("span", { className: "block text-[10px] text-muted-foreground mb-2", children: "常用模型：" }),
            /* @__PURE__ */ c.jsx("div", { className: "flex flex-wrap gap-2", children: Cv.map((h) => /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: `
                                                px-2.5 py-1 border rounded text-xs cursor-pointer transition-all 
                                                ${o.model === h ? "bg-accent border-input text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}
                                            `,
                onClick: () => d({ model: h }),
                children: h.split("/").pop()
              },
              h
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(xn, { title: "参数设置", children: [
        /* @__PURE__ */ c.jsx(
          Vn,
          {
            label: "Top-N",
            value: o.topN,
            onChange: (h) => d({ topN: h }),
            min: 1,
            max: 50,
            step: 1,
            description: "重排后返回的结果数量"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Vn,
          {
            label: "混合权重 (Hybrid Alpha)",
            value: o.hybridAlpha,
            onChange: (h) => d({ hybridAlpha: h }),
            min: 0,
            max: 1,
            step: 0.1,
            description: "0 = 纯向量检索评分，1 = 纯 Rerank 评分"
          }
        )
      ] })
    ] })
  ] });
}, rs = [
  { value: "text_summary", label: "纯文本总结", description: "将对话转为世界书条目" },
  { value: "vector_summary", label: "向量化总结", description: "输出结构化 JSON，含实体/关系" },
  { value: "trim", label: "精简/修剪", description: "合并、压缩旧的世界书条目" },
  { value: "query_enhance", label: "用户输入加强", description: "扩展用户输入，解决指代问题" }
], Tv = {
  temperature: 0.7,
  topP: 0.95,
  maxTokens: 2048,
  frequencyPenalty: 0,
  presencePenalty: 0
}, Av = {
  maxChatHistory: 10,
  includeWorldInfo: !0,
  worldInfoBudget: 2048
}, kv = {
  source: "transformers"
}, Ov = {
  enabled: !1,
  url: "",
  apiKey: "",
  model: "",
  topN: 5,
  hybridAlpha: 0.5
};
function J0(o = "默认预设") {
  const s = Date.now();
  return {
    id: `preset_${s}`,
    name: o,
    source: "tavern",
    parameters: { ...Tv },
    context: { ...Av },
    isDefault: !0,
    createdAt: s,
    updatedAt: s
  };
}
function yr(o, s, d = {}) {
  const h = Date.now();
  return {
    id: `template_${h}_${Math.random().toString(36).slice(2, 8)}`,
    name: o,
    category: s,
    enabled: d.enabled ?? !1,
    isBuiltIn: d.isBuiltIn ?? !1,
    boundPresetId: d.boundPresetId ?? null,
    systemPrompt: d.systemPrompt ?? "",
    userPromptTemplate: d.userPromptTemplate ?? "",
    outputFormat: d.outputFormat ?? "plain",
    availableVariables: d.availableVariables ?? ["{{chatHistory}}", "{{context}}", "{{char}}", "{{user}}"],
    createdAt: h,
    updatedAt: h
  };
}
function zv() {
  return [
    yr("纯文本剧情总结", "text_summary", {
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
    yr("向量化剧情总结", "vector_summary", {
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
    yr("记忆精简", "trim", {
      enabled: !0,
      isBuiltIn: !0,
      systemPrompt: "你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。",
      userPromptTemplate: `请将以下多条剧情摘要合并精简：

{{context}}

请输出一条精简后的综合摘要。`,
      outputFormat: "markdown"
    }),
    yr("查询增强", "query_enhance", {
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
const Mv = {
  enabled: !0,
  includeGlobal: !0
}, Dv = {
  enabled: !1,
  trigger: "token",
  tokenLimit: 4096,
  floorLimit: 50,
  countLimit: 5
};
function Rv() {
  return {
    llmPresets: [J0()],
    selectedPresetId: null,
    vectorConfig: { ...kv },
    rerankConfig: { ...Ov },
    promptTemplates: zv(),
    worldbookConfig: { ...Mv }
  };
}
function Uv(o) {
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
function Bv(o) {
  var s;
  return ((s = rs.find((d) => d.value === o)) == null ? void 0 : s.label) || o;
}
const qv = ({
  template: o,
  isSelected: s = !1,
  onSelect: d,
  onCopy: h,
  onDelete: x,
  onToggleEnabled: S,
  onImport: M
}) => {
  const R = le.useRef(null), k = (Q) => {
    Q.stopPropagation();
    const re = {
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
    }, we = new Blob([JSON.stringify(re, null, 2)], { type: "application/json" }), Ae = URL.createObjectURL(we), oe = document.createElement("a");
    oe.href = Ae, oe.download = `engram_template_${o.name.replace(/\s+/g, "_")}.json`, oe.click(), URL.revokeObjectURL(Ae);
  }, D = (Q) => {
    var re;
    Q.stopPropagation(), (re = R.current) == null || re.click();
  }, $ = (Q) => {
    var Ae;
    const re = (Ae = Q.target.files) == null ? void 0 : Ae[0];
    if (!re || !M) return;
    const we = new FileReader();
    we.onload = (oe) => {
      var ke;
      try {
        const pe = JSON.parse((ke = oe.target) == null ? void 0 : ke.result);
        if (pe.version && pe.template) {
          const Me = yr(
            pe.template.name,
            pe.template.category,
            {
              enabled: o.enabled,
              // 保持当前启用状态
              isBuiltIn: o.isBuiltIn,
              // 保持内置状态
              boundPresetId: pe.template.boundPresetId,
              systemPrompt: pe.template.systemPrompt,
              userPromptTemplate: pe.template.userPromptTemplate,
              outputFormat: pe.template.outputFormat,
              availableVariables: pe.template.availableVariables
            }
          );
          Me.id = o.id, M(Me);
        }
      } catch (pe) {
        console.error("导入失败:", pe);
      }
    }, we.readAsText(re), R.current && (R.current.value = "");
  };
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: `
                group relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${s ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
            `,
      onClick: d,
      children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ c.jsx(
            "button",
            {
              className: `
                        w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0
                        ${o.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"}
                    `,
              onClick: (Q) => {
                Q.stopPropagation(), S == null || S(!o.enabled);
              },
              children: /* @__PURE__ */ c.jsx(R0, { size: 14 })
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ c.jsx("h4", { className: `text-sm font-medium truncate ${s ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`, children: o.name }),
              /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ c.jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${Uv(o.category)}`, children: Bv(o.category) }),
                o.isBuiltIn && /* @__PURE__ */ c.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground", children: "BUILTIN" })
              ] })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground/70 font-mono", children: [
              /* @__PURE__ */ c.jsx("span", { className: "truncate max-w-[120px]", children: o.boundPresetId ? `BOUND: ${o.boundPresetId}` : "DEFAULT PRESET" }),
              /* @__PURE__ */ c.jsx("span", { children: o.outputFormat.toUpperCase() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: `mt-2 flex justify-end gap-1 ${s || "opacity-0 group-hover:opacity-100"} transition-opacity`, children: [
          /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: D, title: "Import", children: /* @__PURE__ */ c.jsx(ug, { size: 12 }) }),
          /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: k, title: "Export", children: /* @__PURE__ */ c.jsx(z0, { size: 12 }) }),
          /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors", onClick: (Q) => {
            Q.stopPropagation(), h == null || h();
          }, title: "Copy", children: /* @__PURE__ */ c.jsx(O0, { size: 12 }) }),
          !o.isBuiltIn && /* @__PURE__ */ c.jsx("button", { className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors", onClick: (Q) => {
            Q.stopPropagation(), x == null || x();
          }, title: "Delete", children: /* @__PURE__ */ c.jsx(ku, { size: 12 }) })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: R,
            type: "file",
            accept: ".json",
            onChange: $,
            className: "hidden"
          }
        )
      ]
    }
  );
}, Lv = ({
  templates: o,
  selectedId: s,
  onSelect: d,
  onAdd: h,
  onUpdate: x,
  onDelete: S
}) => {
  const M = () => {
    const Q = yr(
      `新模板 ${o.length + 1}`,
      "text_summary"
    );
    h(Q), d(Q);
  }, R = (Q) => {
    const re = yr(
      `${Q.name} (副本)`,
      Q.category,
      {
        enabled: !1,
        // 副本默认不启用
        boundPresetId: Q.boundPresetId,
        systemPrompt: Q.systemPrompt,
        userPromptTemplate: Q.userPromptTemplate,
        outputFormat: Q.outputFormat,
        availableVariables: [...Q.availableVariables]
      }
    );
    h(re);
  }, k = (Q, re) => {
    re && o.filter((we) => we.category === Q.category && we.id !== Q.id && we.enabled).forEach((we) => x({ ...we, enabled: !1 })), x({ ...Q, enabled: re });
  }, D = (Q) => {
    x(Q);
  }, $ = rs.map((Q) => ({
    ...Q,
    templates: o.filter((re) => re.category === Q.value)
  })).filter((Q) => Q.templates.length > 0);
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ c.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "提示词模板" }),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: M,
          children: /* @__PURE__ */ c.jsx(Uf, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-6 overflow-y-auto flex-1 no-scrollbar", children: [
      $.map((Q) => /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "text-[10px] items-center gap-2 text-muted-foreground font-medium px-1 uppercase tracking-wider flex", children: [
          Q.label,
          /* @__PURE__ */ c.jsx("div", { className: "h-px bg-border flex-1" })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "flex flex-col gap-1", children: Q.templates.map((re) => /* @__PURE__ */ c.jsx(
          qv,
          {
            template: re,
            isSelected: s === re.id,
            onSelect: () => d(re),
            onCopy: () => R(re),
            onDelete: () => S(re),
            onToggleEnabled: (we) => k(re, we),
            onImport: D
          },
          re.id
        )) })
      ] }, Q.value)),
      o.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground gap-2 border border-dashed border-border rounded-lg", children: [
        /* @__PURE__ */ c.jsx(cs, { size: 24, className: "opacity-50" }),
        /* @__PURE__ */ c.jsx("p", { className: "text-xs", children: "暂无模板" })
      ] })
    ] })
  ] });
}, Hv = [
  { value: "plain", label: "纯文本" },
  { value: "markdown", label: "Markdown" },
  { value: "json", label: "JSON" }
], Kv = ({
  template: o,
  llmPresets: s,
  defaultPresetId: d,
  onChange: h
}) => {
  var M, R;
  const x = [
    { value: "", label: "使用默认预设" + (d ? ` (${((M = s.find((k) => k.id === d)) == null ? void 0 : M.name) || d})` : "") },
    ...s.map((k) => ({ value: k.id, label: k.name }))
  ], S = (k) => {
    h({ ...o, ...k, updatedAt: Date.now() });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ c.jsxs(xn, { title: "基本信息", children: [
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "模板名称",
          value: o.name,
          onChange: (k) => S({ name: k }),
          placeholder: "输入模板名称",
          required: !0,
          disabled: o.isBuiltIn
        }
      ),
      /* @__PURE__ */ c.jsx(
        vr,
        {
          label: "模板分类",
          value: o.category,
          onChange: (k) => S({ category: k }),
          options: rs.map((k) => ({ value: k.value, label: k.label })),
          description: (R = rs.find((k) => k.value === o.category)) == null ? void 0 : R.description
        }
      ),
      /* @__PURE__ */ c.jsx(
        vr,
        {
          label: "模型来源",
          value: o.boundPresetId || "",
          onChange: (k) => S({ boundPresetId: k || null }),
          options: x,
          description: "选择用于此模板的 LLM 预设"
        }
      ),
      /* @__PURE__ */ c.jsx(
        vr,
        {
          label: "输出格式",
          value: o.outputFormat,
          onChange: (k) => S({ outputFormat: k }),
          options: Hv
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs(xn, { title: "提示词内容", description: "支持变量：{{chatHistory}}, {{context}}, {{char}}, {{user}}, {{userInput}}", children: [
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "系统提示词",
          value: o.systemPrompt,
          onChange: (k) => S({ systemPrompt: k }),
          placeholder: "输入系统提示词...",
          multiline: !0,
          rows: 4
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sn,
        {
          label: "用户提示词模板",
          value: o.userPromptTemplate,
          onChange: (k) => S({ userPromptTemplate: k }),
          placeholder: "输入用户提示词模板...",
          multiline: !0,
          rows: 6
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "px-3 py-2 bg-muted/30 rounded border border-border", children: [
      /* @__PURE__ */ c.jsx("div", { className: "text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "可用变量" }),
      /* @__PURE__ */ c.jsx("div", { className: "flex flex-wrap gap-2", children: o.availableVariables.map((k) => /* @__PURE__ */ c.jsx("code", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px] text-primary font-mono", children: k }, k)) })
    ] })
  ] });
}, Yv = ({
  rules: o,
  selectedId: s,
  onSelect: d,
  onToggle: h,
  onDelete: x,
  onAdd: S,
  onReset: M
}) => /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-4", children: [
  /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "正则规则列表" }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          className: "text-[10px] text-muted-foreground hover:text-destructive transition-colors",
          onClick: M,
          children: "重置默认"
        }
      ),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground transition-colors",
          onClick: S,
          children: /* @__PURE__ */ c.jsx(U0, { size: 16 })
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1", children: [
    o.map((R) => /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `
                            group p-3 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-3
                            ${s === R.id ? "bg-accent/50 border-input" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                        `,
        onClick: () => d(R.id),
        children: [
          /* @__PURE__ */ c.jsx(
            "button",
            {
              className: `
                                w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                                ${R.enabled ? s === R.id ? "bg-primary/20 text-primary" : "bg-muted text-primary" : "bg-muted text-muted-foreground"}
                            `,
              onClick: (k) => {
                k.stopPropagation(), h(R.id);
              },
              title: R.enabled ? "点击禁用" : "点击启用",
              children: /* @__PURE__ */ c.jsx(R0, { size: 14 })
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ c.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ c.jsx("h4", { className: `text-sm font-medium truncate ${s === R.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} ${!R.enabled && "opacity-50 line-through"}`, children: R.name }) }),
            /* @__PURE__ */ c.jsx("div", { className: "mt-0.5 flex items-center gap-2", children: /* @__PURE__ */ c.jsxs("code", { className: "text-[10px] bg-muted px-1 rounded text-muted-foreground font-mono truncate max-w-[120px]", children: [
              "/",
              R.pattern,
              "/",
              R.flags
            ] }) })
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: `flex items-center ${s === R.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`, children: /* @__PURE__ */ c.jsx(
            "button",
            {
              className: "p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors",
              onClick: (k) => {
                k.stopPropagation(), x(R.id);
              },
              children: /* @__PURE__ */ c.jsx(ku, { size: 12 })
            }
          ) })
        ]
      },
      R.id
    )),
    o.length === 0 && /* @__PURE__ */ c.jsx("div", { className: "text-center p-8 border border-dashed border-border rounded-lg", children: /* @__PURE__ */ c.jsx("p", { className: "text-xs text-muted-foreground", children: "无规则" }) })
  ] })
] }), Tu = [
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
class Yf {
  constructor(s) {
    wt(this, "rules", []);
    this.rules = s || [...Tu];
  }
  /**
   * 应用所有启用的规则处理文本
   */
  process(s) {
    let d = s;
    for (const h of this.rules)
      if (h.enabled)
        try {
          const x = new RegExp(h.pattern, h.flags);
          d = d.replace(x, h.replacement);
        } catch (x) {
          console.warn(`[RegexProcessor] 规则 "${h.name}" 执行失败:`, x);
        }
    return d;
  }
  /**
   * 使用指定规则处理文本（用于预览）
   */
  processWithRule(s, d) {
    try {
      const h = new RegExp(d.pattern, d.flags);
      return s.replace(h, d.replacement);
    } catch (h) {
      return console.warn("[RegexProcessor] 规则执行失败:", h), s;
    }
  }
  /**
   * 验证正则表达式是否有效
   */
  validatePattern(s, d) {
    try {
      return new RegExp(s, d), { valid: !0 };
    } catch (h) {
      return {
        valid: !1,
        error: h instanceof Error ? h.message : "无效的正则表达式"
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
  updateRule(s, d) {
    const h = this.rules.findIndex((x) => x.id === s);
    h >= 0 && (this.rules[h] = { ...this.rules[h], ...d });
  }
  /**
   * 删除规则
   */
  deleteRule(s) {
    this.rules = this.rules.filter((d) => d.id !== s);
  }
  /**
   * 启用/禁用规则
   */
  toggleRule(s) {
    const d = this.rules.find((h) => h.id === s);
    d && (d.enabled = !d.enabled);
  }
  /**
   * 重置为默认规则
   */
  resetToDefaults() {
    this.rules = [...Tu];
  }
  /**
   * 获取启用的规则数量
   */
  getEnabledCount() {
    return this.rules.filter((s) => s.enabled).length;
  }
}
const F0 = new Yf(), Gv = [
  { value: "g", label: "全局匹配", description: "匹配所有结果" },
  { value: "i", label: "忽略大小写", description: "不区分大小写" },
  { value: "m", label: "多行模式", description: "^$ 匹配每行" },
  { value: "s", label: "点号匹配换行", description: ". 匹配换行符" }
], Qv = ({ rule: o, onChange: s }) => {
  const [d, h] = le.useState(""), [x, S] = le.useState(""), [M, R] = le.useState({ valid: !0 }), k = new Yf();
  le.useEffect(() => {
    const $ = k.validatePattern(o.pattern, o.flags);
    R($);
  }, [o.pattern, o.flags]), le.useEffect(() => {
    if (d && M.valid) {
      const $ = k.processWithRule(d, o);
      S($);
    } else
      S("");
  }, [d, o, M.valid]);
  const D = ($) => {
    const Q = o.flags.split(""), re = Q.indexOf($);
    re >= 0 ? Q.splice(re, 1) : Q.push($), s({ flags: Q.join("") });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-sm font-medium text-foreground", children: "规则名称" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: o.name,
            onChange: ($) => s({ name: $.target.value }),
            placeholder: "例如：移除思维链"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-sm font-medium text-foreground", children: "描述（可选）" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: o.description || "",
            onChange: ($) => s({ description: $.target.value }),
            placeholder: "简短描述此规则的用途"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-card border border-border rounded-lg", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ c.jsx("label", { className: "text-sm font-medium text-foreground", children: "正则表达式" }),
          M.valid ? /* @__PURE__ */ c.jsx(k0, { size: 14, className: "text-green-500" }) : /* @__PURE__ */ c.jsx(Mf, { size: 14, className: "text-red-500" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "text",
            className: `w-full px-3 py-2 rounded-md border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${M.valid ? "border-input focus:ring-ring" : "border-red-500 focus:ring-red-500"}`,
            value: o.pattern,
            onChange: ($) => s({ pattern: $.target.value }),
            placeholder: "例如：<think>[\\s\\S]*?</think>"
          }
        ),
        !M.valid && M.error && /* @__PURE__ */ c.jsx("p", { className: "text-xs text-red-500", children: M.error })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-sm font-medium text-foreground", children: "替换为" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "text",
            className: "w-full px-3 py-2 rounded-md border border-input bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            value: o.replacement,
            onChange: ($) => s({ replacement: $.target.value }),
            placeholder: "留空表示删除匹配内容"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-sm font-medium text-foreground", children: "匹配选项" }),
        /* @__PURE__ */ c.jsx("div", { className: "flex flex-wrap gap-2", children: Gv.map(($) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            className: `px-2 py-1 text-xs rounded-md border transition-colors ${o.flags.includes($.value) ? "bg-primary-20 border-primary text-primary" : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
            onClick: () => D($.value),
            title: $.description,
            children: [
              $.label,
              " (",
              $.value,
              ")"
            ]
          },
          $.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-3 p-4 bg-muted-20 border border-border rounded-lg", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
        /* @__PURE__ */ c.jsx(Rf, { size: 14 }),
        "测试正则"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-xs text-muted-foreground", children: "输入文本" }),
        /* @__PURE__ */ c.jsx(
          "textarea",
          {
            className: "w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring",
            value: d,
            onChange: ($) => h($.target.value),
            placeholder: `在此输入测试文本，例如：
<think>这是思考内容</think>
正常对话内容`
          }
        )
      ] }),
      d && M.valid && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-xs text-muted-foreground", children: "处理结果" }),
        /* @__PURE__ */ c.jsx("div", { className: "min-h-[60px] px-3 py-2 rounded-md border border-border bg-background text-sm whitespace-pre-wrap", children: x || /* @__PURE__ */ c.jsx("span", { className: "text-muted-foreground italic", children: "（无内容）" }) })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400", children: [
      /* @__PURE__ */ c.jsx(_y, { size: 16, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        "正则规则会在发送给 LLM 之前应用于聊天内容，用于清理干扰信息。 常用规则如移除思维链 ",
        /* @__PURE__ */ c.jsx("code", { className: "bg-blue-500/20 px-1 rounded", children: "<think>" }),
        " 标签等。"
      ] })
    ] })
  ] });
}, Vv = ({
  config: o,
  onChange: s
}) => {
  const d = (h) => {
    s({
      ...o,
      [h]: !o[h]
    });
  };
  return /* @__PURE__ */ c.jsx("div", { className: "", children: /* @__PURE__ */ c.jsxs(xn, { title: "世界书配置", description: "总结时会自动获取所有始终激活（constant=true）的世界书条目作为背景设定注入到提示词中。", children: [
    /* @__PURE__ */ c.jsx(
      Nu,
      {
        label: "启用世界书",
        description: "总结时注入始终激活（蓝灯）的世界书条目",
        checked: o.enabled,
        onChange: () => d("enabled")
      }
    ),
    /* @__PURE__ */ c.jsx(
      Nu,
      {
        label: "包含全局世界书",
        description: "关闭后只读取角色世界书和聊天世界书",
        checked: o.includeGlobal,
        onChange: () => d("includeGlobal"),
        disabled: !o.enabled
      }
    )
  ] }) });
};
function Xv() {
  const [o, s] = le.useState(Rv), [d, h] = le.useState(null), [x, S] = le.useState(null), [M, R] = le.useState(!1), [k, D] = le.useState([...Tu]), [$, Q] = le.useState(null);
  le.useEffect(() => {
  }, []);
  const re = le.useCallback((ve) => {
    s((U) => ({ ...U, selectedPresetId: ve.id })), h(ve);
  }, []), we = le.useCallback(() => {
    const ve = J0(`预设 ${o.llmPresets.length + 1}`);
    ve.isDefault = !1, s((U) => ({
      ...U,
      llmPresets: [...U.llmPresets, ve],
      selectedPresetId: ve.id
    })), h(ve), R(!0);
  }, [o.llmPresets.length]), Ae = le.useCallback((ve) => {
    s((U) => ({
      ...U,
      llmPresets: U.llmPresets.map((te) => te.id === ve.id ? ve : te)
    })), h(ve), R(!0);
  }, []), oe = le.useCallback((ve) => {
    const U = {
      ...ve,
      id: `preset_${Date.now()}`,
      name: `${ve.name} (副本)`,
      isDefault: !1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    s((te) => ({ ...te, llmPresets: [...te.llmPresets, U] })), R(!0);
  }, []), ke = le.useCallback((ve) => {
    ve.isDefault || (s((U) => ({
      ...U,
      llmPresets: U.llmPresets.filter((te) => te.id !== ve.id),
      selectedPresetId: U.selectedPresetId === ve.id ? null : U.selectedPresetId
    })), h((U) => (U == null ? void 0 : U.id) === ve.id ? null : U), R(!0));
  }, []), pe = le.useCallback((ve) => {
    S(ve);
  }, []), Me = le.useCallback((ve) => {
    s((U) => ({
      ...U,
      promptTemplates: [...U.promptTemplates, ve]
    })), R(!0);
  }, []), fe = le.useCallback((ve) => {
    s((U) => ({
      ...U,
      promptTemplates: U.promptTemplates.map((te) => te.id === ve.id ? ve : te)
    })), S(ve), R(!0);
  }, []), Oe = le.useCallback((ve) => {
    ve.isBuiltIn || (s((U) => ({
      ...U,
      promptTemplates: U.promptTemplates.filter((te) => te.id !== ve.id)
    })), S((U) => (U == null ? void 0 : U.id) === ve.id ? null : U), R(!0));
  }, []), Ue = le.useCallback((ve) => {
    s((U) => ({ ...U, vectorConfig: ve })), R(!0);
  }, []), Be = le.useCallback((ve) => {
    s((U) => ({ ...U, rerankConfig: ve })), R(!0);
  }, []), Se = le.useCallback((ve) => {
    s((U) => ({ ...U, worldbookConfig: ve })), R(!0);
  }, []), ft = le.useCallback((ve) => {
    const U = k.find((te) => te.id === ve);
    Q(U || null);
  }, [k]), kt = le.useCallback(() => {
    const ve = {
      id: `rule_${Date.now()}`,
      name: "新规则",
      pattern: "",
      replacement: "",
      enabled: !0,
      flags: "gi",
      description: ""
    };
    D((U) => [...U, ve]), Q(ve), R(!0);
  }, []), _n = le.useCallback((ve) => {
    if (!$) return;
    const U = { ...$, ...ve };
    Q(U), D((te) => te.map((je) => je.id === U.id ? U : je)), R(!0);
  }, [$]), Qt = le.useCallback((ve) => {
    D((U) => U.map(
      (te) => te.id === ve ? { ...te, enabled: !te.enabled } : te
    )), R(!0);
  }, []), Ge = le.useCallback((ve) => {
    D((U) => U.filter((te) => te.id !== ve)), Q((U) => (U == null ? void 0 : U.id) === ve ? null : U), R(!0);
  }, []), Vt = le.useCallback(() => {
    D([...Tu]), Q(null), R(!0);
  }, []), jn = le.useCallback(() => {
    console.log("保存配置:", o, k), R(!1);
  }, [o, k]);
  return {
    settings: o,
    editingPreset: d,
    editingTemplate: x,
    hasChanges: M,
    regexRules: k,
    editingRule: $,
    selectPreset: re,
    addPreset: we,
    updatePreset: Ae,
    copyPreset: oe,
    deletePreset: ke,
    selectTemplate: pe,
    addTemplate: Me,
    updateTemplate: fe,
    deleteTemplate: Oe,
    updateVectorConfig: Ue,
    updateRerankConfig: Be,
    updateWorldbookConfig: Se,
    selectRule: ft,
    addRule: kt,
    updateRule: _n,
    toggleRule: Qt,
    deleteRule: Ge,
    resetRules: Vt,
    save: jn
  };
}
const Zv = [
  { id: "llm", label: "LLM 预设", icon: Df },
  { id: "vector", label: "向量化", icon: os },
  { id: "rerank", label: "Rerank", icon: fs }
], Jv = () => {
  const [o, s] = le.useState("model"), [d, h] = le.useState("llm"), {
    settings: x,
    editingPreset: S,
    editingTemplate: M,
    hasChanges: R,
    regexRules: k,
    editingRule: D,
    selectPreset: $,
    addPreset: Q,
    updatePreset: re,
    copyPreset: we,
    deletePreset: Ae,
    selectTemplate: oe,
    addTemplate: ke,
    updateTemplate: pe,
    deleteTemplate: Me,
    updateVectorConfig: fe,
    updateRerankConfig: Oe,
    selectRule: Ue,
    addRule: Be,
    updateRule: Se,
    toggleRule: ft,
    deleteRule: kt,
    resetRules: _n,
    save: Qt
  } = Xv();
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
    /* @__PURE__ */ c.jsx(
      hs,
      {
        title: "API 配置",
        subtitle: "管理模型参数和上下文规则",
        actions: R && /* @__PURE__ */ c.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90 text-sm shadow-sm",
            onClick: Qt,
            children: [
              /* @__PURE__ */ c.jsx(Zy, { size: 16 }),
              "保存更改"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ c.jsx(
      Kf,
      {
        tabs: [
          { id: "model", label: "模型配置" },
          { id: "prompt", label: "提示词模板" },
          { id: "regex", label: "正则规则" },
          { id: "worldbook", label: "世界书" }
        ],
        activeTab: o,
        onChange: (Ge) => s(Ge)
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "flex-1 overflow-y-auto no-scrollbar", children: [
      o === "model" && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ c.jsx("div", { className: "flex gap-1 border-b border-border pb-1", children: Zv.map((Ge) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            className: `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative
                                        ${d === Ge.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            onClick: () => h(Ge.id),
            children: [
              /* @__PURE__ */ c.jsx(Ge.icon, { size: 14 }),
              Ge.label,
              d === Ge.id && /* @__PURE__ */ c.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[1px] bg-foreground" })
            ]
          },
          Ge.id
        )) }),
        d === "llm" && /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8", children: [
          /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col gap-4 border-r border-border/50 pr-4", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ c.jsx("h3", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider", children: "预设列表" }),
              /* @__PURE__ */ c.jsx("button", { className: "text-muted-foreground hover:text-foreground transition-colors", onClick: Q, children: /* @__PURE__ */ c.jsx(Uf, { size: 16 }) })
            ] }),
            /* @__PURE__ */ c.jsx("div", { className: "flex flex-col gap-1", children: x.llmPresets.map((Ge) => /* @__PURE__ */ c.jsx(
              bv,
              {
                preset: Ge,
                isSelected: x.selectedPresetId === Ge.id,
                onSelect: () => $(Ge),
                onEdit: () => $(Ge),
                onCopy: () => we(Ge),
                onDelete: () => Ae(Ge)
              },
              Ge.id
            )) })
          ] }),
          /* @__PURE__ */ c.jsx("div", { className: "flex flex-col", children: S ? /* @__PURE__ */ c.jsx("div", { className: "animate-in fade-in slide-in-from-right-2 duration-300", children: /* @__PURE__ */ c.jsx(jv, { preset: S, onChange: re }) }) : /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
            /* @__PURE__ */ c.jsx(Df, { size: 32, className: "opacity-20" }),
            /* @__PURE__ */ c.jsx("p", { className: "text-sm font-light", children: "选择或创建一个预设开始配置" })
          ] }) })
        ] }),
        d === "vector" && /* @__PURE__ */ c.jsx(Ev, { config: x.vectorConfig, onChange: fe }),
        d === "rerank" && /* @__PURE__ */ c.jsx(Nv, { config: x.rerankConfig, onChange: Oe })
      ] }),
      o === "prompt" && /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ c.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ c.jsx(
          Lv,
          {
            templates: x.promptTemplates,
            selectedId: (M == null ? void 0 : M.id) || null,
            onSelect: oe,
            onAdd: ke,
            onUpdate: pe,
            onDelete: Me
          }
        ) }),
        /* @__PURE__ */ c.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: M ? /* @__PURE__ */ c.jsx(
          Kv,
          {
            template: M,
            llmPresets: x.llmPresets,
            defaultPresetId: x.selectedPresetId,
            onChange: pe
          }
        ) : /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ c.jsx(cs, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ c.jsx("p", { className: "text-sm font-light", children: "选择一个模板进行编辑" })
        ] }) })
      ] }),
      o === "regex" && /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 h-full", children: [
        /* @__PURE__ */ c.jsx("div", { className: "border-r border-border/50 pr-4", children: /* @__PURE__ */ c.jsx(
          Yv,
          {
            rules: k,
            selectedId: (D == null ? void 0 : D.id) || null,
            onSelect: Ue,
            onToggle: ft,
            onDelete: kt,
            onAdd: Be,
            onReset: _n
          }
        ) }),
        /* @__PURE__ */ c.jsx("div", { className: "flex flex-col gap-4 overflow-y-auto no-scrollbar", children: D ? /* @__PURE__ */ c.jsx(Qv, { rule: D, onChange: Se }) : /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-muted-foreground gap-4", children: [
          /* @__PURE__ */ c.jsx(U0, { size: 32, className: "opacity-20" }),
          /* @__PURE__ */ c.jsx("p", { className: "text-sm font-light", children: "选择或创建一个正则规则" })
        ] }) })
      ] }),
      o === "worldbook" && /* @__PURE__ */ c.jsx("div", { className: "max-w-2xl py-4", children: /* @__PURE__ */ c.jsx(
        Vv,
        {
          config: x.worldbookConfig,
          onChange: (Ge) => {
          }
        }
      ) })
    ] })
  ] });
}, Fv = () => {
  const [o, s] = le.useState("claudeDark");
  le.useEffect(() => {
    s(Ml.getTheme());
  }, []);
  const d = (x) => {
    Ml.setTheme(x), gr.set("theme", x), s(x);
  }, h = Object.entries(Po).map(([x, S]) => {
    let M = S.colors.background, R = S.colors.primary;
    return {
      id: x,
      name: S.name,
      background: M,
      sidebar: S.colors.sidebar,
      // Add sidebar color
      primary: R
    };
  });
  return /* @__PURE__ */ c.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ c.jsx("h3", { className: "text-lg font-medium", children: "主题设置" }),
    /* @__PURE__ */ c.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: h.map((x) => /* @__PURE__ */ c.jsxs(
      "button",
      {
        onClick: () => d(x.id),
        className: `
                            relative group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                            ${o === x.id ? "border-primary bg-accent/10" : "border-transparent hover:bg-accent/5"}
                        `,
        children: [
          /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-center -space-x-3 mb-2", children: [
            /* @__PURE__ */ c.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-10",
                style: { background: x.background },
                title: "Background"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-20",
                style: { background: x.sidebar },
                title: "Sidebar"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full border border-border shadow-sm z-30 ring-2 ring-background",
                style: { background: x.primary },
                title: "Primary"
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: `text-sm font-medium ${o === x.id ? "text-primary" : "text-muted-foreground"}`, children: x.name }),
          o === x.id && /* @__PURE__ */ c.jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" })
        ]
      },
      x.id
    )) })
  ] });
}, $v = () => /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ c.jsx(hs, { title: "设置", subtitle: "扩展全局选项" }),
  /* @__PURE__ */ c.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ c.jsx(Fv, {}),
    /* @__PURE__ */ c.jsx("div", { className: "mt-8 pt-8 border-t border-border", children: /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground gap-2 py-8 opacity-50", children: [
      /* @__PURE__ */ c.jsx(q0, { size: 32 }),
      /* @__PURE__ */ c.jsx("p", { className: "text-sm", children: "更多设置开发中..." })
    ] }) })
  ] })
] }), Pv = () => /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col h-full animate-in fade-in", children: [
  /* @__PURE__ */ c.jsx(hs, { title: "记忆流", subtitle: "查看和管理记忆碎片" }),
  /* @__PURE__ */ c.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4", children: [
    /* @__PURE__ */ c.jsx(T0, { size: 48, className: "opacity-20" }),
    /* @__PURE__ */ c.jsx("p", { children: "记忆流功能正在开发中..." })
  ] })
] }), Iv = [
  { id: "token", label: "Token 数", description: "总结内容达到 Token 上限时触发", icon: $1 },
  { id: "floor", label: "楼层数", description: "总结覆盖的楼层达到上限时触发", icon: fs },
  { id: "count", label: "总结次数", description: "执行总结的次数达到上限时触发", icon: xy }
], Wv = ({
  config: o,
  onChange: s
}) => {
  const d = (S) => {
    s({ ...o, enabled: S });
  }, h = (S) => {
    s({ ...o, trigger: S });
  }, x = (S, M) => {
    s({ ...o, [S]: M });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ c.jsx(
      xn,
      {
        title: "精简配置",
        description: "将多次总结压缩为更简洁的摘要",
        className: "!mb-4",
        children: /* @__PURE__ */ c.jsx(
          Nu,
          {
            label: "启用精简",
            checked: o.enabled,
            onChange: d
          }
        )
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: `space-y-6 transition-opacity ${o.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`, children: [
      /* @__PURE__ */ c.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ c.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "触发条件" }),
        /* @__PURE__ */ c.jsx("div", { className: "grid grid-cols-3 gap-3", children: Iv.map((S) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            onClick: () => h(S.id),
            className: `
                                    flex flex-col items-center gap-2 p-3 rounded-lg border transition-all text-sm
                                    ${o.trigger === S.id ? "border-primary bg-primary/10 text-primary font-medium shadow-sm" : "border-border bg-card text-muted-foreground hover:bg-muted hover:border-primary/50"}
                                `,
            children: [
              E0.createElement(S.icon, { className: "w-4 h-4" }),
              /* @__PURE__ */ c.jsx("span", { children: S.label })
            ]
          },
          S.id
        )) })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "space-y-4", children: [
        o.trigger === "token" && /* @__PURE__ */ c.jsx(
          Vn,
          {
            label: "Token 上限",
            description: "当总结内容 Token 超过此值时触发精简",
            value: o.tokenLimit,
            onChange: (S) => x("tokenLimit", S),
            min: 1024,
            max: 16384,
            step: 512
          }
        ),
        o.trigger === "floor" && /* @__PURE__ */ c.jsx(
          Vn,
          {
            label: "楼层上限",
            description: "当总结覆盖楼层数超过此值时触发精简",
            value: o.floorLimit,
            onChange: (S) => x("floorLimit", S),
            min: 10,
            max: 200,
            step: 10
          }
        ),
        o.trigger === "count" && /* @__PURE__ */ c.jsx(
          Vn,
          {
            label: "总结次数上限",
            description: "当执行总结次数超过此值时触发精简",
            value: o.countLimit,
            onChange: (S) => x("countLimit", S),
            min: 2,
            max: 20,
            step: 1
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: `w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                        bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-sm`,
          onClick: () => {
            console.log("手动触发精简...");
          },
          children: [
            /* @__PURE__ */ c.jsx(Fy, { className: "w-4 h-4" }),
            "手动执行精简"
          ]
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: "p-3 rounded-lg bg-accent/50 border border-accent text-xs text-accent-foreground", children: [
        /* @__PURE__ */ c.jsx("strong", { children: "说明：" }),
        "精简会将多次总结内容使用 ",
        /* @__PURE__ */ c.jsx("code", { children: "trim" }),
        " 类型的提示词模板压缩为更简洁的摘要，减少 Token 消耗。"
      ] })
    ] })
  ] });
}, eb = [
  { id: "summarization", label: "记忆摘要", icon: /* @__PURE__ */ c.jsx(cs, { size: 16 }) },
  { id: "vectorization", label: "向量化", icon: /* @__PURE__ */ c.jsx(ss, { size: 16 }) },
  { id: "batch", label: "批量处理", icon: /* @__PURE__ */ c.jsx(fs, { size: 16 }) }
], tb = ({ onNavigate: o }) => {
  const [s, d] = le.useState("summarization"), [h, x] = le.useState(null), [S, M] = le.useState(!1), [R, k] = le.useState({
    autoEnabled: !0,
    floorInterval: 10
  }), [D, $] = le.useState({ ...Dv }), [Q, re] = le.useState(0);
  le.useEffect(() => {
    we();
  }, []);
  const we = async () => {
    try {
      const { summarizerService: pe } = await Promise.resolve().then(() => Eu);
      x(pe.getStatus());
      const { WorldInfoService: Me } = await Promise.resolve().then(() => P0), fe = await Me.getActivatedWorldInfo();
      if (fe) {
        const Oe = await Me.countTokens(fe);
        re(Oe);
      }
    } catch (pe) {
      console.error("加载 Summarizer 状态失败:", pe);
    }
  }, Ae = async () => {
    try {
      const { summarizerService: pe } = await Promise.resolve().then(() => Eu);
      pe.start(), await we();
    } catch (pe) {
      console.error("启动失败:", pe);
    }
  }, oe = async () => {
    try {
      const { summarizerService: pe } = await Promise.resolve().then(() => Eu);
      pe.stop(), await we();
    } catch (pe) {
      console.error("停止失败:", pe);
    }
  }, ke = async () => {
    M(!0);
    try {
      const { summarizerService: pe } = await Promise.resolve().then(() => Eu);
      await pe.triggerSummary(!0), await we();
    } catch (pe) {
      console.error("触发失败:", pe);
    } finally {
      M(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ c.jsx(os, { size: 20, className: "text-muted-foreground" }),
        /* @__PURE__ */ c.jsx("h1", { className: "text-xl font-light text-foreground tracking-tight", children: "处理中心" })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
            onClick: () => o == null ? void 0 : o("devlog"),
            children: [
              /* @__PURE__ */ c.jsx(gy, { size: 12 }),
              "模型日志"
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
            onClick: () => o == null ? void 0 : o("presets"),
            children: [
              /* @__PURE__ */ c.jsx(cs, { size: 12 }),
              "提示词模板"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      Kf,
      {
        tabs: eb,
        activeTab: s,
        onChange: (pe) => d(pe)
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      s === "summarization" && /* @__PURE__ */ c.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ c.jsxs("section", { children: [
          /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ c.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "状态统计" }),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                className: "p-1 rounded text-muted-foreground hover:text-foreground transition-colors",
                onClick: we,
                title: "刷新",
                children: /* @__PURE__ */ c.jsx(xf, { size: 14 })
              }
            )
          ] }),
          h ? /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ c.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "运行状态" }),
              /* @__PURE__ */ c.jsxs("div", { className: `flex items-center gap-1.5 text-sm font-medium ${h.running ? "text-green-500" : "text-muted-foreground"}`, children: [
                h.running ? /* @__PURE__ */ c.jsx(ly, { size: 14 }) : /* @__PURE__ */ c.jsx(Mf, { size: 14 }),
                h.running ? "运行中" : "已停止"
              ] })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ c.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "当前楼层" }),
              /* @__PURE__ */ c.jsx("div", { className: "text-foreground font-mono text-lg", children: h.currentFloor })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ c.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "待处理" }),
              /* @__PURE__ */ c.jsx("div", { className: "text-amber-500 font-mono text-lg", children: h.pendingFloors })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ c.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "总结次数" }),
              /* @__PURE__ */ c.jsx("div", { className: "text-foreground font-mono text-lg", children: h.historyCount })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ c.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "世界书 Token" }),
              /* @__PURE__ */ c.jsx("div", { className: "text-primary font-mono text-lg", children: Q.toLocaleString() })
            ] })
          ] }) : /* @__PURE__ */ c.jsx("p", { className: "text-sm text-muted-foreground", children: "加载中..." })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex gap-2", children: [
          h != null && h.running ? /* @__PURE__ */ c.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
              onClick: oe,
              children: [
                /* @__PURE__ */ c.jsx(qy, { size: 14 }),
                "停止监听"
              ]
            }
          ) : /* @__PURE__ */ c.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors",
              onClick: Ae,
              children: [
                /* @__PURE__ */ c.jsx(Rf, { size: 14 }),
                "启动监听"
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50",
              onClick: ke,
              disabled: S || (h == null ? void 0 : h.isSummarizing),
              children: [
                /* @__PURE__ */ c.jsx(xf, { size: 14, className: S ? "animate-spin" : "" }),
                S ? "处理中..." : "手动触发"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "border-t border-border" }),
        /* @__PURE__ */ c.jsxs("section", { children: [
          /* @__PURE__ */ c.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4", children: "总结设置" }),
          /* @__PURE__ */ c.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ c.jsxs("div", { children: [
                /* @__PURE__ */ c.jsx("div", { className: "text-sm text-foreground", children: "自动总结" }),
                /* @__PURE__ */ c.jsx("div", { className: "text-xs text-muted-foreground", children: "达到楼层阈值时自动触发" })
              ] }),
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => k((pe) => ({ ...pe, autoEnabled: !pe.autoEnabled })),
                  className: `relative w-9 h-5 rounded-full transition-colors ${R.autoEnabled ? "bg-primary" : "bg-input"}`,
                  children: /* @__PURE__ */ c.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${R.autoEnabled ? "translate-x-4" : "translate-x-0"}`
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: R.autoEnabled ? "" : "opacity-50 pointer-events-none", children: [
              /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ c.jsx("span", { className: "text-xs text-muted-foreground", children: "楼层间隔" }),
                /* @__PURE__ */ c.jsx("span", { className: "text-xs font-mono text-primary", children: R.floorInterval })
              ] }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: "1",
                  max: "50",
                  value: R.floorInterval,
                  onChange: (pe) => k((Me) => ({ ...Me, floorInterval: Number(pe.target.value) })),
                  disabled: !R.autoEnabled,
                  className: "w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1 font-mono", children: [
                /* @__PURE__ */ c.jsx("span", { children: "1" }),
                /* @__PURE__ */ c.jsx("span", { children: "25" }),
                /* @__PURE__ */ c.jsx("span", { children: "50" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "border-t border-border" }),
        /* @__PURE__ */ c.jsx("section", { children: /* @__PURE__ */ c.jsx(
          Wv,
          {
            config: D,
            onChange: $
          }
        ) })
      ] }),
      s === "vectorization" && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ c.jsx(fs, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ c.jsx("p", { className: "text-sm font-light", children: "向量化功能开发中..." })
      ] }),
      s === "batch" && /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2", children: [
        /* @__PURE__ */ c.jsx(V1, { size: 32, strokeWidth: 1, className: "opacity-30" }),
        /* @__PURE__ */ c.jsx("p", { className: "text-sm font-light", children: "批量处理功能开发中..." })
      ] })
    ] })
  ] });
}, nb = ({ onClose: o }) => {
  const [s, d] = le.useState("dashboard"), h = () => {
    switch (s) {
      case "dashboard":
        return /* @__PURE__ */ c.jsx(d0, { onNavigate: d });
      case "presets":
        return /* @__PURE__ */ c.jsx(Jv, {});
      case "graph":
        return /* @__PURE__ */ c.jsx(rv, {});
      case "devlog":
        return /* @__PURE__ */ c.jsx(vv, {});
      case "settings":
        return /* @__PURE__ */ c.jsx($v, {});
      case "memory":
        return /* @__PURE__ */ c.jsx(Pv, {});
      case "processing":
        return /* @__PURE__ */ c.jsx(tb, {});
      default:
        return /* @__PURE__ */ c.jsx(d0, {});
    }
  };
  return /* @__PURE__ */ c.jsx(Xg, { children: /* @__PURE__ */ c.jsx(Pg, { activeTab: s, setActiveTab: d, onClose: o, children: h() }) });
};
tv((o, s) => {
  const d = O1.createRoot(o);
  return d.render(E0.createElement(nb, { onClose: s })), d;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", f0) : f0();
var es = { exports: {} }, ab = es.exports, v0;
function lb() {
  return v0 || (v0 = 1, (function(o, s) {
    (function(d, h) {
      o.exports = h();
    })(ab, function() {
      var d = function(l, i) {
        return (d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(f, m) {
          f.__proto__ = m;
        } || function(f, m) {
          for (var y in m) Object.prototype.hasOwnProperty.call(m, y) && (f[y] = m[y]);
        })(l, i);
      }, h = function() {
        return (h = Object.assign || function(l) {
          for (var i, f = 1, m = arguments.length; f < m; f++) for (var y in i = arguments[f]) Object.prototype.hasOwnProperty.call(i, y) && (l[y] = i[y]);
          return l;
        }).apply(this, arguments);
      };
      function x(l, i, f) {
        for (var m, y = 0, g = i.length; y < g; y++) !m && y in i || ((m = m || Array.prototype.slice.call(i, 0, y))[y] = i[y]);
        return l.concat(m || Array.prototype.slice.call(i));
      }
      var S = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : _1, M = Object.keys, R = Array.isArray;
      function k(l, i) {
        return typeof i != "object" || M(i).forEach(function(f) {
          l[f] = i[f];
        }), l;
      }
      typeof Promise > "u" || S.Promise || (S.Promise = Promise);
      var D = Object.getPrototypeOf, $ = {}.hasOwnProperty;
      function Q(l, i) {
        return $.call(l, i);
      }
      function re(l, i) {
        typeof i == "function" && (i = i(D(l))), (typeof Reflect > "u" ? M : Reflect.ownKeys)(i).forEach(function(f) {
          Ae(l, f, i[f]);
        });
      }
      var we = Object.defineProperty;
      function Ae(l, i, f, m) {
        we(l, i, k(f && Q(f, "get") && typeof f.get == "function" ? { get: f.get, set: f.set, configurable: !0 } : { value: f, configurable: !0, writable: !0 }, m));
      }
      function oe(l) {
        return { from: function(i) {
          return l.prototype = Object.create(i.prototype), Ae(l.prototype, "constructor", l), { extend: re.bind(null, l.prototype) };
        } };
      }
      var ke = Object.getOwnPropertyDescriptor, pe = [].slice;
      function Me(l, i, f) {
        return pe.call(l, i, f);
      }
      function fe(l, i) {
        return i(l);
      }
      function Oe(l) {
        if (!l) throw new Error("Assertion Failed");
      }
      function Ue(l) {
        S.setImmediate ? setImmediate(l) : setTimeout(l, 0);
      }
      function Be(l, i) {
        if (typeof i == "string" && Q(l, i)) return l[i];
        if (!i) return l;
        if (typeof i != "string") {
          for (var f = [], m = 0, y = i.length; m < y; ++m) {
            var g = Be(l, i[m]);
            f.push(g);
          }
          return f;
        }
        var b = i.indexOf(".");
        if (b !== -1) {
          var _ = l[i.substr(0, b)];
          return _ == null ? void 0 : Be(_, i.substr(b + 1));
        }
      }
      function Se(l, i, f) {
        if (l && i !== void 0 && !("isFrozen" in Object && Object.isFrozen(l))) if (typeof i != "string" && "length" in i) {
          Oe(typeof f != "string" && "length" in f);
          for (var m = 0, y = i.length; m < y; ++m) Se(l, i[m], f[m]);
        } else {
          var g, b, _ = i.indexOf(".");
          _ !== -1 ? (g = i.substr(0, _), (b = i.substr(_ + 1)) === "" ? f === void 0 ? R(l) && !isNaN(parseInt(g)) ? l.splice(g, 1) : delete l[g] : l[g] = f : Se(_ = !(_ = l[g]) || !Q(l, g) ? l[g] = {} : _, b, f)) : f === void 0 ? R(l) && !isNaN(parseInt(i)) ? l.splice(i, 1) : delete l[i] : l[i] = f;
        }
      }
      function ft(l) {
        var i, f = {};
        for (i in l) Q(l, i) && (f[i] = l[i]);
        return f;
      }
      var kt = [].concat;
      function _n(l) {
        return kt.apply([], l);
      }
      var Wn = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(_n([8, 16, 32, 64].map(function(l) {
        return ["Int", "Uint", "Float"].map(function(i) {
          return i + l + "Array";
        });
      }))).filter(function(l) {
        return S[l];
      }), Qt = new Set(Wn.map(function(l) {
        return S[l];
      })), Ge = null;
      function Vt(l) {
        return Ge = /* @__PURE__ */ new WeakMap(), l = (function i(f) {
          if (!f || typeof f != "object") return f;
          var m = Ge.get(f);
          if (m) return m;
          if (R(f)) {
            m = [], Ge.set(f, m);
            for (var y = 0, g = f.length; y < g; ++y) m.push(i(f[y]));
          } else if (Qt.has(f.constructor)) m = f;
          else {
            var b, _ = D(f);
            for (b in m = _ === Object.prototype ? {} : Object.create(_), Ge.set(f, m), f) Q(f, b) && (m[b] = i(f[b]));
          }
          return m;
        })(l), Ge = null, l;
      }
      var jn = {}.toString;
      function ve(l) {
        return jn.call(l).slice(8, -1);
      }
      var U = typeof Symbol < "u" ? Symbol.iterator : "@@iterator", te = typeof U == "symbol" ? function(l) {
        var i;
        return l != null && (i = l[U]) && i.apply(l);
      } : function() {
        return null;
      };
      function je(l, i) {
        return i = l.indexOf(i), 0 <= i && l.splice(i, 1), 0 <= i;
      }
      var $e = {};
      function Ve(l) {
        var i, f, m, y;
        if (arguments.length === 1) {
          if (R(l)) return l.slice();
          if (this === $e && typeof l == "string") return [l];
          if (y = te(l)) {
            for (f = []; !(m = y.next()).done; ) f.push(m.value);
            return f;
          }
          if (l == null) return [l];
          if (typeof (i = l.length) != "number") return [l];
          for (f = new Array(i); i--; ) f[i] = l[i];
          return f;
        }
        for (i = arguments.length, f = new Array(i); i--; ) f[i] = arguments[i];
        return f;
      }
      var A = typeof Symbol < "u" ? function(l) {
        return l[Symbol.toStringTag] === "AsyncFunction";
      } : function() {
        return !1;
      }, Ul = ["Unknown", "Constraint", "Data", "TransactionInactive", "ReadOnly", "Version", "NotFound", "InvalidState", "InvalidAccess", "Abort", "Timeout", "QuotaExceeded", "Syntax", "DataClone"], cn = ["Modify", "Bulk", "OpenFailed", "VersionChange", "Schema", "Upgrade", "InvalidTable", "MissingAPI", "NoSuchDatabase", "InvalidArgument", "SubTransaction", "Unsupported", "Internal", "DatabaseClosed", "PrematureCommit", "ForeignAwait"].concat(Ul), ee = { VersionChanged: "Database version changed by other database connection", DatabaseClosed: "Database has been closed", Abort: "Transaction aborted", TransactionInactive: "Transaction has already completed or failed", MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb" };
      function de(l, i) {
        this.name = l, this.message = i;
      }
      function be(l, i) {
        return l + ". Errors: " + Object.keys(i).map(function(f) {
          return i[f].toString();
        }).filter(function(f, m, y) {
          return y.indexOf(f) === m;
        }).join(`
`);
      }
      function De(l, i, f, m) {
        this.failures = i, this.failedKeys = m, this.successCount = f, this.message = be(l, i);
      }
      function qe(l, i) {
        this.name = "BulkError", this.failures = Object.keys(i).map(function(f) {
          return i[f];
        }), this.failuresByPos = i, this.message = be(l, this.failures);
      }
      oe(de).from(Error).extend({ toString: function() {
        return this.name + ": " + this.message;
      } }), oe(De).from(de), oe(qe).from(de);
      var We = cn.reduce(function(l, i) {
        return l[i] = i + "Error", l;
      }, {}), Xt = de, me = cn.reduce(function(l, i) {
        var f = i + "Error";
        function m(y, g) {
          this.name = f, y ? typeof y == "string" ? (this.message = "".concat(y).concat(g ? `
 ` + g : ""), this.inner = g || null) : typeof y == "object" && (this.message = "".concat(y.name, " ").concat(y.message), this.inner = y) : (this.message = ee[i] || f, this.inner = null);
        }
        return oe(m).from(Xt), l[i] = m, l;
      }, {});
      me.Syntax = SyntaxError, me.Type = TypeError, me.Range = RangeError;
      var Ja = Ul.reduce(function(l, i) {
        return l[i + "Error"] = me[i], l;
      }, {}), ga = cn.reduce(function(l, i) {
        return ["Syntax", "Type", "Range"].indexOf(i) === -1 && (l[i + "Error"] = me[i]), l;
      }, {});
      function et() {
      }
      function Fa(l) {
        return l;
      }
      function va(l, i) {
        return l == null || l === Fa ? i : function(f) {
          return i(l(f));
        };
      }
      function Xn(l, i) {
        return function() {
          l.apply(this, arguments), i.apply(this, arguments);
        };
      }
      function vi(l, i) {
        return l === et ? i : function() {
          var f = l.apply(this, arguments);
          f !== void 0 && (arguments[0] = f);
          var m = this.onsuccess, y = this.onerror;
          this.onsuccess = null, this.onerror = null;
          var g = i.apply(this, arguments);
          return m && (this.onsuccess = this.onsuccess ? Xn(m, this.onsuccess) : m), y && (this.onerror = this.onerror ? Xn(y, this.onerror) : y), g !== void 0 ? g : f;
        };
      }
      function ms(l, i) {
        return l === et ? i : function() {
          l.apply(this, arguments);
          var f = this.onsuccess, m = this.onerror;
          this.onsuccess = this.onerror = null, i.apply(this, arguments), f && (this.onsuccess = this.onsuccess ? Xn(f, this.onsuccess) : f), m && (this.onerror = this.onerror ? Xn(m, this.onerror) : m);
        };
      }
      function zu(l, i) {
        return l === et ? i : function(f) {
          var m = l.apply(this, arguments);
          k(f, m);
          var y = this.onsuccess, g = this.onerror;
          return this.onsuccess = null, this.onerror = null, f = i.apply(this, arguments), y && (this.onsuccess = this.onsuccess ? Xn(y, this.onsuccess) : y), g && (this.onerror = this.onerror ? Xn(g, this.onerror) : g), m === void 0 ? f === void 0 ? void 0 : f : k(m, f);
        };
      }
      function bi(l, i) {
        return l === et ? i : function() {
          return i.apply(this, arguments) !== !1 && l.apply(this, arguments);
        };
      }
      function Dl(l, i) {
        return l === et ? i : function() {
          var f = l.apply(this, arguments);
          if (f && typeof f.then == "function") {
            for (var m = this, y = arguments.length, g = new Array(y); y--; ) g[y] = arguments[y];
            return f.then(function() {
              return i.apply(m, g);
            });
          }
          return i.apply(this, arguments);
        };
      }
      ga.ModifyError = De, ga.DexieError = de, ga.BulkError = qe;
      var dn = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
      function Mu(l) {
        dn = l;
      }
      var Rl = {}, tn = 100, Wn = typeof Promise > "u" ? [] : (function() {
        var l = Promise.resolve();
        if (typeof crypto > "u" || !crypto.subtle) return [l, D(l), l];
        var i = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
        return [i, D(i), l];
      })(), Ul = Wn[0], cn = Wn[1], Wn = Wn[2], cn = cn && cn.then, ea = Ul && Ul.constructor, $a = !!Wn, Bl = function(l, i) {
        ql.push([l, i]), Sr && (queueMicrotask(Du), Sr = !1);
      }, xr = !0, Sr = !0, ba = [], ta = [], Zt = Fa, Jt = { id: "global", global: !0, ref: 0, unhandleds: [], onunhandled: et, pgp: !1, env: {}, finalize: et }, ye = Jt, ql = [], xa = 0, _r = [];
      function he(l) {
        if (typeof this != "object") throw new TypeError("Promises must be constructed via new");
        this._listeners = [], this._lib = !1;
        var i = this._PSD = ye;
        if (typeof l != "function") {
          if (l !== Rl) throw new TypeError("Not a function");
          return this._state = arguments[1], this._value = arguments[2], void (this._state === !1 && Zn(this, this._value));
        }
        this._state = null, this._value = null, ++i.ref, (function f(m, y) {
          try {
            y(function(g) {
              if (m._state === null) {
                if (g === m) throw new TypeError("A promise cannot be resolved with itself.");
                var b = m._lib && na();
                g && typeof g.then == "function" ? f(m, function(_, E) {
                  g instanceof he ? g._then(_, E) : g.then(_, E);
                }) : (m._state = !0, m._value = g, Hl(m)), b && Mn();
              }
            }, Zn.bind(null, m));
          } catch (g) {
            Zn(m, g);
          }
        })(this, l);
      }
      var Pa = { get: function() {
        var l = ye, i = Gl;
        function f(m, y) {
          var g = this, b = !l.global && (l !== ye || i !== Gl), _ = b && !on(), E = new he(function(C, B) {
            Sa(g, new Ll(jr(m, l, b, _), jr(y, l, b, _), C, B, l));
          });
          return this._consoleTask && (E._consoleTask = this._consoleTask), E;
        }
        return f.prototype = Rl, f;
      }, set: function(l) {
        Ae(this, "then", l && l.prototype === Rl ? Pa : { get: function() {
          return l;
        }, set: Pa.set });
      } };
      function Ll(l, i, f, m, y) {
        this.onFulfilled = typeof l == "function" ? l : null, this.onRejected = typeof i == "function" ? i : null, this.resolve = f, this.reject = m, this.psd = y;
      }
      function Zn(l, i) {
        var f, m;
        ta.push(i), l._state === null && (f = l._lib && na(), i = Zt(i), l._state = !1, l._value = i, m = l, ba.some(function(y) {
          return y._value === m._value;
        }) || ba.push(m), Hl(l), f && Mn());
      }
      function Hl(l) {
        var i = l._listeners;
        l._listeners = [];
        for (var f = 0, m = i.length; f < m; ++f) Sa(l, i[f]);
        var y = l._PSD;
        --y.ref || y.finalize(), xa === 0 && (++xa, Bl(function() {
          --xa == 0 && xi();
        }, []));
      }
      function Sa(l, i) {
        if (l._state !== null) {
          var f = l._state ? i.onFulfilled : i.onRejected;
          if (f === null) return (l._state ? i.resolve : i.reject)(l._value);
          ++i.psd.ref, ++xa, Bl(ps, [f, l, i]);
        } else l._listeners.push(i);
      }
      function ps(l, i, f) {
        try {
          var m, y = i._value;
          !i._state && ta.length && (ta = []), m = dn && i._consoleTask ? i._consoleTask.run(function() {
            return l(y);
          }) : l(y), i._state || ta.indexOf(y) !== -1 || (function(g) {
            for (var b = ba.length; b; ) if (ba[--b]._value === g._value) return ba.splice(b, 1);
          })(i), f.resolve(m);
        } catch (g) {
          f.reject(g);
        } finally {
          --xa == 0 && xi(), --f.psd.ref || f.psd.finalize();
        }
      }
      function Du() {
        wn(Jt, function() {
          na() && Mn();
        });
      }
      function na() {
        var l = xr;
        return Sr = xr = !1, l;
      }
      function Mn() {
        var l, i, f;
        do
          for (; 0 < ql.length; ) for (l = ql, ql = [], f = l.length, i = 0; i < f; ++i) {
            var m = l[i];
            m[0].apply(null, m[1]);
          }
        while (0 < ql.length);
        Sr = xr = !0;
      }
      function xi() {
        var l = ba;
        ba = [], l.forEach(function(m) {
          m._PSD.onunhandled.call(null, m._value, m);
        });
        for (var i = _r.slice(0), f = i.length; f; ) i[--f]();
      }
      function Kl(l) {
        return new he(Rl, !1, l);
      }
      function dt(l, i) {
        var f = ye;
        return function() {
          var m = na(), y = ye;
          try {
            return la(f, !0), l.apply(this, arguments);
          } catch (g) {
            i && i(g);
          } finally {
            la(y, !1), m && Mn();
          }
        };
      }
      re(he.prototype, { then: Pa, _then: function(l, i) {
        Sa(this, new Ll(null, null, l, i, ye));
      }, catch: function(l) {
        if (arguments.length === 1) return this.then(null, l);
        var i = l, f = arguments[1];
        return typeof i == "function" ? this.then(null, function(m) {
          return (m instanceof i ? f : Kl)(m);
        }) : this.then(null, function(m) {
          return (m && m.name === i ? f : Kl)(m);
        });
      }, finally: function(l) {
        return this.then(function(i) {
          return he.resolve(l()).then(function() {
            return i;
          });
        }, function(i) {
          return he.resolve(l()).then(function() {
            return Kl(i);
          });
        });
      }, timeout: function(l, i) {
        var f = this;
        return l < 1 / 0 ? new he(function(m, y) {
          var g = setTimeout(function() {
            return y(new me.Timeout(i));
          }, l);
          f.then(m, y).finally(clearTimeout.bind(null, g));
        }) : this;
      } }), typeof Symbol < "u" && Symbol.toStringTag && Ae(he.prototype, Symbol.toStringTag, "Dexie.Promise"), Jt.env = _i(), re(he, { all: function() {
        var l = Ve.apply(null, arguments).map(Wa);
        return new he(function(i, f) {
          l.length === 0 && i([]);
          var m = l.length;
          l.forEach(function(y, g) {
            return he.resolve(y).then(function(b) {
              l[g] = b, --m || i(l);
            }, f);
          });
        });
      }, resolve: function(l) {
        return l instanceof he ? l : l && typeof l.then == "function" ? new he(function(i, f) {
          l.then(i, f);
        }) : new he(Rl, !0, l);
      }, reject: Kl, race: function() {
        var l = Ve.apply(null, arguments).map(Wa);
        return new he(function(i, f) {
          l.map(function(m) {
            return he.resolve(m).then(i, f);
          });
        });
      }, PSD: { get: function() {
        return ye;
      }, set: function(l) {
        return ye = l;
      } }, totalEchoes: { get: function() {
        return Gl;
      } }, newPSD: mt, usePSD: wn, scheduler: { get: function() {
        return Bl;
      }, set: function(l) {
        Bl = l;
      } }, rejectionMapper: { get: function() {
        return Zt;
      }, set: function(l) {
        Zt = l;
      } }, follow: function(l, i) {
        return new he(function(f, m) {
          return mt(function(y, g) {
            var b = ye;
            b.unhandleds = [], b.onunhandled = g, b.finalize = Xn(function() {
              var _, E = this;
              _ = function() {
                E.unhandleds.length === 0 ? y() : g(E.unhandleds[0]);
              }, _r.push(function C() {
                _(), _r.splice(_r.indexOf(C), 1);
              }), ++xa, Bl(function() {
                --xa == 0 && xi();
              }, []);
            }, b.finalize), l();
          }, i, f, m);
        });
      } }), ea && (ea.allSettled && Ae(he, "allSettled", function() {
        var l = Ve.apply(null, arguments).map(Wa);
        return new he(function(i) {
          l.length === 0 && i([]);
          var f = l.length, m = new Array(f);
          l.forEach(function(y, g) {
            return he.resolve(y).then(function(b) {
              return m[g] = { status: "fulfilled", value: b };
            }, function(b) {
              return m[g] = { status: "rejected", reason: b };
            }).then(function() {
              return --f || i(m);
            });
          });
        });
      }), ea.any && typeof AggregateError < "u" && Ae(he, "any", function() {
        var l = Ve.apply(null, arguments).map(Wa);
        return new he(function(i, f) {
          l.length === 0 && f(new AggregateError([]));
          var m = l.length, y = new Array(m);
          l.forEach(function(g, b) {
            return he.resolve(g).then(function(_) {
              return i(_);
            }, function(_) {
              y[b] = _, --m || f(new AggregateError(y));
            });
          });
        });
      }), ea.withResolvers && (he.withResolvers = ea.withResolvers));
      var Et = { awaits: 0, echoes: 0, id: 0 }, Si = 0, Ia = [], Yl = 0, Gl = 0, aa = 0;
      function mt(l, i, f, m) {
        var y = ye, g = Object.create(y);
        return g.parent = y, g.ref = 0, g.global = !1, g.id = ++aa, Jt.env, g.env = $a ? { Promise: he, PromiseProp: { value: he, configurable: !0, writable: !0 }, all: he.all, race: he.race, allSettled: he.allSettled, any: he.any, resolve: he.resolve, reject: he.reject } : {}, i && k(g, i), ++y.ref, g.finalize = function() {
          --this.parent.ref || this.parent.finalize();
        }, m = wn(g, l, f, m), g.ref === 0 && g.finalize(), m;
      }
      function Ct() {
        return Et.id || (Et.id = ++Si), ++Et.awaits, Et.echoes += tn, Et.id;
      }
      function on() {
        return !!Et.awaits && (--Et.awaits == 0 && (Et.id = 0), Et.echoes = Et.awaits * tn, !0);
      }
      function Wa(l) {
        return Et.echoes && l && l.constructor === ea ? (Ct(), l.then(function(i) {
          return on(), i;
        }, function(i) {
          return on(), ut(i);
        })) : l;
      }
      function ys() {
        var l = Ia[Ia.length - 1];
        Ia.pop(), la(l, !1);
      }
      function la(l, i) {
        var f, m = ye;
        (i ? !Et.echoes || Yl++ && l === ye : !Yl || --Yl && l === ye) || queueMicrotask(i ? (function(y) {
          ++Gl, Et.echoes && --Et.echoes != 0 || (Et.echoes = Et.awaits = Et.id = 0), Ia.push(ye), la(y, !0);
        }).bind(null, l) : ys), l !== ye && (ye = l, m === Jt && (Jt.env = _i()), $a && (f = Jt.env.Promise, i = l.env, (m.global || l.global) && (Object.defineProperty(S, "Promise", i.PromiseProp), f.all = i.all, f.race = i.race, f.resolve = i.resolve, f.reject = i.reject, i.allSettled && (f.allSettled = i.allSettled), i.any && (f.any = i.any))));
      }
      function _i() {
        var l = S.Promise;
        return $a ? { Promise: l, PromiseProp: Object.getOwnPropertyDescriptor(S, "Promise"), all: l.all, race: l.race, allSettled: l.allSettled, any: l.any, resolve: l.resolve, reject: l.reject } : {};
      }
      function wn(l, i, f, m, y) {
        var g = ye;
        try {
          return la(l, !0), i(f, m, y);
        } finally {
          la(g, !1);
        }
      }
      function jr(l, i, f, m) {
        return typeof l != "function" ? l : function() {
          var y = ye;
          f && Ct(), la(i, !0);
          try {
            return l.apply(this, arguments);
          } finally {
            la(y, !1), m && queueMicrotask(on);
          }
        };
      }
      function ra(l) {
        Promise === ea && Et.echoes === 0 ? Yl === 0 ? l() : enqueueNativeMicroTask(l) : setTimeout(l, 0);
      }
      ("" + cn).indexOf("[native code]") === -1 && (Ct = on = et);
      var ut = he.reject, En = "￿", nn = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", Nt = "String expected.", _a = [], Ql = "__dbnames", Jn = "readonly", ia = "readwrite";
      function ja(l, i) {
        return l ? i ? function() {
          return l.apply(this, arguments) && i.apply(this, arguments);
        } : l : i;
      }
      var ji = { type: 3, lower: -1 / 0, lowerOpen: !1, upper: [[]], upperOpen: !1 };
      function Vl(l) {
        return typeof l != "string" || /\./.test(l) ? function(i) {
          return i;
        } : function(i) {
          return i[l] === void 0 && l in i && delete (i = Vt(i))[l], i;
        };
      }
      function Ru() {
        throw me.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.");
      }
      function Qe(l, i) {
        try {
          var f = Xl(l), m = Xl(i);
          if (f !== m) return f === "Array" ? 1 : m === "Array" ? -1 : f === "binary" ? 1 : m === "binary" ? -1 : f === "string" ? 1 : m === "string" ? -1 : f === "Date" ? 1 : m !== "Date" ? NaN : -1;
          switch (f) {
            case "number":
            case "Date":
            case "string":
              return i < l ? 1 : l < i ? -1 : 0;
            case "binary":
              return (function(y, g) {
                for (var b = y.length, _ = g.length, E = b < _ ? b : _, C = 0; C < E; ++C) if (y[C] !== g[C]) return y[C] < g[C] ? -1 : 1;
                return b === _ ? 0 : b < _ ? -1 : 1;
              })(Dn(l), Dn(i));
            case "Array":
              return (function(y, g) {
                for (var b = y.length, _ = g.length, E = b < _ ? b : _, C = 0; C < E; ++C) {
                  var B = Qe(y[C], g[C]);
                  if (B !== 0) return B;
                }
                return b === _ ? 0 : b < _ ? -1 : 1;
              })(l, i);
          }
        } catch {
        }
        return NaN;
      }
      function Xl(l) {
        var i = typeof l;
        return i != "object" ? i : ArrayBuffer.isView(l) ? "binary" : (l = ve(l), l === "ArrayBuffer" ? "binary" : l);
      }
      function Dn(l) {
        return l instanceof Uint8Array ? l : ArrayBuffer.isView(l) ? new Uint8Array(l.buffer, l.byteOffset, l.byteLength) : new Uint8Array(l);
      }
      function Ft(l, i, f) {
        var m = l.schema.yProps;
        return m ? (i && 0 < f.numFailures && (i = i.filter(function(y, g) {
          return !f.failures[g];
        })), Promise.all(m.map(function(y) {
          return y = y.updatesTable, i ? l.db.table(y).where("k").anyOf(i).delete() : l.db.table(y).clear();
        })).then(function() {
          return f;
        })) : f;
      }
      var el = (Uu.prototype.execute = function(l) {
        var i = this["@@propmod"];
        if (i.add !== void 0) {
          var f = i.add;
          if (R(f)) return x(x([], R(l) ? l : [], !0), f).sort();
          if (typeof f == "number") return (Number(l) || 0) + f;
          if (typeof f == "bigint") try {
            return BigInt(l) + f;
          } catch {
            return BigInt(0) + f;
          }
          throw new TypeError("Invalid term ".concat(f));
        }
        if (i.remove !== void 0) {
          var m = i.remove;
          if (R(m)) return R(l) ? l.filter(function(y) {
            return !m.includes(y);
          }).sort() : [];
          if (typeof m == "number") return Number(l) - m;
          if (typeof m == "bigint") try {
            return BigInt(l) - m;
          } catch {
            return BigInt(0) - m;
          }
          throw new TypeError("Invalid subtrahend ".concat(m));
        }
        return f = (f = i.replacePrefix) === null || f === void 0 ? void 0 : f[0], f && typeof l == "string" && l.startsWith(f) ? i.replacePrefix[1] + l.substring(f.length) : l;
      }, Uu);
      function Uu(l) {
        this["@@propmod"] = l;
      }
      function wr(l, i) {
        for (var f = M(i), m = f.length, y = !1, g = 0; g < m; ++g) {
          var b = f[g], _ = i[b], E = Be(l, b);
          _ instanceof el ? (Se(l, b, _.execute(E)), y = !0) : E !== _ && (Se(l, b, _), y = !0);
        }
        return y;
      }
      var wi = (at.prototype._trans = function(l, i, f) {
        var m = this._tx || ye.trans, y = this.name, g = dn && typeof console < "u" && console.createTask && console.createTask("Dexie: ".concat(l === "readonly" ? "read" : "write", " ").concat(this.name));
        function b(C, B, w) {
          if (!w.schema[y]) throw new me.NotFound("Table " + y + " not part of transaction");
          return i(w.idbtrans, w);
        }
        var _ = na();
        try {
          var E = m && m.db._novip === this.db._novip ? m === ye.trans ? m._promise(l, b, f) : mt(function() {
            return m._promise(l, b, f);
          }, { trans: m, transless: ye.transless || ye }) : (function C(B, w, L, N) {
            if (B.idbdb && (B._state.openComplete || ye.letThrough || B._vip)) {
              var O = B._createTransaction(w, L, B._dbSchema);
              try {
                O.create(), B._state.PR1398_maxLoop = 3;
              } catch (z) {
                return z.name === We.InvalidState && B.isOpen() && 0 < --B._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), B.close({ disableAutoOpen: !1 }), B.open().then(function() {
                  return C(B, w, L, N);
                })) : ut(z);
              }
              return O._promise(w, function(z, q) {
                return mt(function() {
                  return ye.trans = O, N(z, q, O);
                });
              }).then(function(z) {
                if (w === "readwrite") try {
                  O.idbtrans.commit();
                } catch {
                }
                return w === "readonly" ? z : O._completion.then(function() {
                  return z;
                });
              });
            }
            if (B._state.openComplete) return ut(new me.DatabaseClosed(B._state.dbOpenError));
            if (!B._state.isBeingOpened) {
              if (!B._state.autoOpen) return ut(new me.DatabaseClosed());
              B.open().catch(et);
            }
            return B._state.dbReadyPromise.then(function() {
              return C(B, w, L, N);
            });
          })(this.db, l, [this.name], b);
          return g && (E._consoleTask = g, E = E.catch(function(C) {
            return console.trace(C), ut(C);
          })), E;
        } finally {
          _ && Mn();
        }
      }, at.prototype.get = function(l, i) {
        var f = this;
        return l && l.constructor === Object ? this.where(l).first(i) : l == null ? ut(new me.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(m) {
          return f.core.get({ trans: m, key: l }).then(function(y) {
            return f.hook.reading.fire(y);
          });
        }).then(i);
      }, at.prototype.where = function(l) {
        if (typeof l == "string") return new this.db.WhereClause(this, l);
        if (R(l)) return new this.db.WhereClause(this, "[".concat(l.join("+"), "]"));
        var i = M(l);
        if (i.length === 1) return this.where(i[0]).equals(l[i[0]]);
        var f = this.schema.indexes.concat(this.schema.primKey).filter(function(_) {
          if (_.compound && i.every(function(C) {
            return 0 <= _.keyPath.indexOf(C);
          })) {
            for (var E = 0; E < i.length; ++E) if (i.indexOf(_.keyPath[E]) === -1) return !1;
            return !0;
          }
          return !1;
        }).sort(function(_, E) {
          return _.keyPath.length - E.keyPath.length;
        })[0];
        if (f && this.db._maxKey !== En) {
          var g = f.keyPath.slice(0, i.length);
          return this.where(g).equals(g.map(function(E) {
            return l[E];
          }));
        }
        !f && dn && console.warn("The query ".concat(JSON.stringify(l), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(i.join("+"), "]"));
        var m = this.schema.idxByName;
        function y(_, E) {
          return Qe(_, E) === 0;
        }
        var b = i.reduce(function(w, E) {
          var C = w[0], B = w[1], w = m[E], L = l[E];
          return [C || w, C || !w ? ja(B, w && w.multi ? function(N) {
            return N = Be(N, E), R(N) && N.some(function(O) {
              return y(L, O);
            });
          } : function(N) {
            return y(L, Be(N, E));
          }) : B];
        }, [null, null]), g = b[0], b = b[1];
        return g ? this.where(g.name).equals(l[g.keyPath]).filter(b) : f ? this.filter(b) : this.where(i).equals("");
      }, at.prototype.filter = function(l) {
        return this.toCollection().and(l);
      }, at.prototype.count = function(l) {
        return this.toCollection().count(l);
      }, at.prototype.offset = function(l) {
        return this.toCollection().offset(l);
      }, at.prototype.limit = function(l) {
        return this.toCollection().limit(l);
      }, at.prototype.each = function(l) {
        return this.toCollection().each(l);
      }, at.prototype.toArray = function(l) {
        return this.toCollection().toArray(l);
      }, at.prototype.toCollection = function() {
        return new this.db.Collection(new this.db.WhereClause(this));
      }, at.prototype.orderBy = function(l) {
        return new this.db.Collection(new this.db.WhereClause(this, R(l) ? "[".concat(l.join("+"), "]") : l));
      }, at.prototype.reverse = function() {
        return this.toCollection().reverse();
      }, at.prototype.mapToClass = function(l) {
        var i, f = this.db, m = this.name;
        function y() {
          return i !== null && i.apply(this, arguments) || this;
        }
        (this.schema.mappedClass = l).prototype instanceof Ru && ((function(E, C) {
          if (typeof C != "function" && C !== null) throw new TypeError("Class extends value " + String(C) + " is not a constructor or null");
          function B() {
            this.constructor = E;
          }
          d(E, C), E.prototype = C === null ? Object.create(C) : (B.prototype = C.prototype, new B());
        })(y, i = l), Object.defineProperty(y.prototype, "db", { get: function() {
          return f;
        }, enumerable: !1, configurable: !0 }), y.prototype.table = function() {
          return m;
        }, l = y);
        for (var g = /* @__PURE__ */ new Set(), b = l.prototype; b; b = D(b)) Object.getOwnPropertyNames(b).forEach(function(E) {
          return g.add(E);
        });
        function _(E) {
          if (!E) return E;
          var C, B = Object.create(l.prototype);
          for (C in E) if (!g.has(C)) try {
            B[C] = E[C];
          } catch {
          }
          return B;
        }
        return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = _, this.hook("reading", _), l;
      }, at.prototype.defineClass = function() {
        return this.mapToClass(function(l) {
          k(this, l);
        });
      }, at.prototype.add = function(l, i) {
        var f = this, m = this.schema.primKey, y = m.auto, g = m.keyPath, b = l;
        return g && y && (b = Vl(g)(l)), this._trans("readwrite", function(_) {
          return f.core.mutate({ trans: _, type: "add", keys: i != null ? [i] : null, values: [b] });
        }).then(function(_) {
          return _.numFailures ? he.reject(_.failures[0]) : _.lastResult;
        }).then(function(_) {
          if (g) try {
            Se(l, g, _);
          } catch {
          }
          return _;
        });
      }, at.prototype.upsert = function(l, i) {
        var f = this, m = this.schema.primKey.keyPath;
        return this._trans("readwrite", function(y) {
          return f.core.get({ trans: y, key: l }).then(function(g) {
            var b = g ?? {};
            return wr(b, i), m && Se(b, m, l), f.core.mutate({ trans: y, type: "put", values: [b], keys: [l], upsert: !0, updates: { keys: [l], changeSpecs: [i] } }).then(function(_) {
              return _.numFailures ? he.reject(_.failures[0]) : !!g;
            });
          });
        });
      }, at.prototype.update = function(l, i) {
        return typeof l != "object" || R(l) ? this.where(":id").equals(l).modify(i) : (l = Be(l, this.schema.primKey.keyPath), l === void 0 ? ut(new me.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(l).modify(i));
      }, at.prototype.put = function(l, i) {
        var f = this, m = this.schema.primKey, y = m.auto, g = m.keyPath, b = l;
        return g && y && (b = Vl(g)(l)), this._trans("readwrite", function(_) {
          return f.core.mutate({ trans: _, type: "put", values: [b], keys: i != null ? [i] : null });
        }).then(function(_) {
          return _.numFailures ? he.reject(_.failures[0]) : _.lastResult;
        }).then(function(_) {
          if (g) try {
            Se(l, g, _);
          } catch {
          }
          return _;
        });
      }, at.prototype.delete = function(l) {
        var i = this;
        return this._trans("readwrite", function(f) {
          return i.core.mutate({ trans: f, type: "delete", keys: [l] }).then(function(m) {
            return Ft(i, [l], m);
          }).then(function(m) {
            return m.numFailures ? he.reject(m.failures[0]) : void 0;
          });
        });
      }, at.prototype.clear = function() {
        var l = this;
        return this._trans("readwrite", function(i) {
          return l.core.mutate({ trans: i, type: "deleteRange", range: ji }).then(function(f) {
            return Ft(l, null, f);
          });
        }).then(function(i) {
          return i.numFailures ? he.reject(i.failures[0]) : void 0;
        });
      }, at.prototype.bulkGet = function(l) {
        var i = this;
        return this._trans("readonly", function(f) {
          return i.core.getMany({ keys: l, trans: f }).then(function(m) {
            return m.map(function(y) {
              return i.hook.reading.fire(y);
            });
          });
        });
      }, at.prototype.bulkAdd = function(l, i, f) {
        var m = this, y = Array.isArray(i) ? i : void 0, g = (f = f || (y ? void 0 : i)) ? f.allKeys : void 0;
        return this._trans("readwrite", function(b) {
          var C = m.schema.primKey, _ = C.auto, C = C.keyPath;
          if (C && y) throw new me.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
          if (y && y.length !== l.length) throw new me.InvalidArgument("Arguments objects and keys must have the same length");
          var E = l.length, C = C && _ ? l.map(Vl(C)) : l;
          return m.core.mutate({ trans: b, type: "add", keys: y, values: C, wantResults: g }).then(function(O) {
            var w = O.numFailures, L = O.results, N = O.lastResult, O = O.failures;
            if (w === 0) return g ? L : N;
            throw new qe("".concat(m.name, ".bulkAdd(): ").concat(w, " of ").concat(E, " operations failed"), O);
          });
        });
      }, at.prototype.bulkPut = function(l, i, f) {
        var m = this, y = Array.isArray(i) ? i : void 0, g = (f = f || (y ? void 0 : i)) ? f.allKeys : void 0;
        return this._trans("readwrite", function(b) {
          var C = m.schema.primKey, _ = C.auto, C = C.keyPath;
          if (C && y) throw new me.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
          if (y && y.length !== l.length) throw new me.InvalidArgument("Arguments objects and keys must have the same length");
          var E = l.length, C = C && _ ? l.map(Vl(C)) : l;
          return m.core.mutate({ trans: b, type: "put", keys: y, values: C, wantResults: g }).then(function(O) {
            var w = O.numFailures, L = O.results, N = O.lastResult, O = O.failures;
            if (w === 0) return g ? L : N;
            throw new qe("".concat(m.name, ".bulkPut(): ").concat(w, " of ").concat(E, " operations failed"), O);
          });
        });
      }, at.prototype.bulkUpdate = function(l) {
        var i = this, f = this.core, m = l.map(function(b) {
          return b.key;
        }), y = l.map(function(b) {
          return b.changes;
        }), g = [];
        return this._trans("readwrite", function(b) {
          return f.getMany({ trans: b, keys: m, cache: "clone" }).then(function(_) {
            var E = [], C = [];
            l.forEach(function(w, L) {
              var N = w.key, O = w.changes, z = _[L];
              if (z) {
                for (var q = 0, K = Object.keys(O); q < K.length; q++) {
                  var V = K[q], J = O[V];
                  if (V === i.schema.primKey.keyPath) {
                    if (Qe(J, N) !== 0) throw new me.Constraint("Cannot update primary key in bulkUpdate()");
                  } else Se(z, V, J);
                }
                g.push(L), E.push(N), C.push(z);
              }
            });
            var B = E.length;
            return f.mutate({ trans: b, type: "put", keys: E, values: C, updates: { keys: m, changeSpecs: y } }).then(function(w) {
              var L = w.numFailures, N = w.failures;
              if (L === 0) return B;
              for (var O = 0, z = Object.keys(N); O < z.length; O++) {
                var q, K = z[O], V = g[Number(K)];
                V != null && (q = N[K], delete N[K], N[V] = q);
              }
              throw new qe("".concat(i.name, ".bulkUpdate(): ").concat(L, " of ").concat(B, " operations failed"), N);
            });
          });
        });
      }, at.prototype.bulkDelete = function(l) {
        var i = this, f = l.length;
        return this._trans("readwrite", function(m) {
          return i.core.mutate({ trans: m, type: "delete", keys: l }).then(function(y) {
            return Ft(i, l, y);
          });
        }).then(function(b) {
          var y = b.numFailures, g = b.lastResult, b = b.failures;
          if (y === 0) return g;
          throw new qe("".concat(i.name, ".bulkDelete(): ").concat(y, " of ").concat(f, " operations failed"), b);
        });
      }, at);
      function at() {
      }
      function Zl(l) {
        function i(b, _) {
          if (_) {
            for (var E = arguments.length, C = new Array(E - 1); --E; ) C[E - 1] = arguments[E];
            return f[b].subscribe.apply(null, C), l;
          }
          if (typeof b == "string") return f[b];
        }
        var f = {};
        i.addEventType = g;
        for (var m = 1, y = arguments.length; m < y; ++m) g(arguments[m]);
        return i;
        function g(b, _, E) {
          if (typeof b != "object") {
            var C;
            _ = _ || bi;
            var B = { subscribers: [], fire: E = E || et, subscribe: function(w) {
              B.subscribers.indexOf(w) === -1 && (B.subscribers.push(w), B.fire = _(B.fire, w));
            }, unsubscribe: function(w) {
              B.subscribers = B.subscribers.filter(function(L) {
                return L !== w;
              }), B.fire = B.subscribers.reduce(_, E);
            } };
            return f[b] = i[b] = B;
          }
          M(C = b).forEach(function(w) {
            var L = C[w];
            if (R(L)) g(w, C[w][0], C[w][1]);
            else {
              if (L !== "asap") throw new me.InvalidArgument("Invalid event config");
              var N = g(w, Fa, function() {
                for (var O = arguments.length, z = new Array(O); O--; ) z[O] = arguments[O];
                N.subscribers.forEach(function(q) {
                  Ue(function() {
                    q.apply(null, z);
                  });
                });
              });
            }
          });
        }
      }
      function Lt(l, i) {
        return oe(i).from({ prototype: l }), i;
      }
      function ua(l, i) {
        return !(l.filter || l.algorithm || l.or) && (i ? l.justLimit : !l.replayFilter);
      }
      function Er(l, i) {
        l.filter = ja(l.filter, i);
      }
      function Jl(l, i, f) {
        var m = l.replayFilter;
        l.replayFilter = m ? function() {
          return ja(m(), i());
        } : i, l.justLimit = f && !m;
      }
      function Fn(l, i) {
        if (l.isPrimKey) return i.primaryKey;
        var f = i.getIndexByKeyPath(l.index);
        if (!f) throw new me.Schema("KeyPath " + l.index + " on object store " + i.name + " is not indexed");
        return f;
      }
      function Ei(l, i, f) {
        var m = Fn(l, i.schema);
        return i.openCursor({ trans: f, values: !l.keysOnly, reverse: l.dir === "prev", unique: !!l.unique, query: { index: m, range: l.range } });
      }
      function Fl(l, i, f, m) {
        var y = l.replayFilter ? ja(l.filter, l.replayFilter()) : l.filter;
        if (l.or) {
          var g = {}, b = function(_, E, C) {
            var B, w;
            y && !y(E, C, function(L) {
              return E.stop(L);
            }, function(L) {
              return E.fail(L);
            }) || ((w = "" + (B = E.primaryKey)) == "[object ArrayBuffer]" && (w = "" + new Uint8Array(B)), Q(g, w) || (g[w] = !0, i(_, E, C)));
          };
          return Promise.all([l.or._iterate(b, f), wa(Ei(l, m, f), l.algorithm, b, !l.keysOnly && l.valueMapper)]);
        }
        return wa(Ei(l, m, f), ja(l.algorithm, y), i, !l.keysOnly && l.valueMapper);
      }
      function wa(l, i, f, m) {
        var y = dt(m ? function(g, b, _) {
          return f(m(g), b, _);
        } : f);
        return l.then(function(g) {
          if (g) return g.start(function() {
            var b = function() {
              return g.continue();
            };
            i && !i(g, function(_) {
              return b = _;
            }, function(_) {
              g.stop(_), b = et;
            }, function(_) {
              g.fail(_), b = et;
            }) || y(g.value, g, function(_) {
              return b = _;
            }), b();
          });
        });
      }
      var gs = (Pe.prototype._read = function(l, i) {
        var f = this._ctx;
        return f.error ? f.table._trans(null, ut.bind(null, f.error)) : f.table._trans("readonly", l).then(i);
      }, Pe.prototype._write = function(l) {
        var i = this._ctx;
        return i.error ? i.table._trans(null, ut.bind(null, i.error)) : i.table._trans("readwrite", l, "locked");
      }, Pe.prototype._addAlgorithm = function(l) {
        var i = this._ctx;
        i.algorithm = ja(i.algorithm, l);
      }, Pe.prototype._iterate = function(l, i) {
        return Fl(this._ctx, l, i, this._ctx.table.core);
      }, Pe.prototype.clone = function(l) {
        var i = Object.create(this.constructor.prototype), f = Object.create(this._ctx);
        return l && k(f, l), i._ctx = f, i;
      }, Pe.prototype.raw = function() {
        return this._ctx.valueMapper = null, this;
      }, Pe.prototype.each = function(l) {
        var i = this._ctx;
        return this._read(function(f) {
          return Fl(i, l, f, i.table.core);
        });
      }, Pe.prototype.count = function(l) {
        var i = this;
        return this._read(function(f) {
          var m = i._ctx, y = m.table.core;
          if (ua(m, !0)) return y.count({ trans: f, query: { index: Fn(m, y.schema), range: m.range } }).then(function(b) {
            return Math.min(b, m.limit);
          });
          var g = 0;
          return Fl(m, function() {
            return ++g, !1;
          }, f, y).then(function() {
            return g;
          });
        }).then(l);
      }, Pe.prototype.sortBy = function(l, i) {
        var f = l.split(".").reverse(), m = f[0], y = f.length - 1;
        function g(E, C) {
          return C ? g(E[f[C]], C - 1) : E[m];
        }
        var b = this._ctx.dir === "next" ? 1 : -1;
        function _(E, C) {
          return Qe(g(E, y), g(C, y)) * b;
        }
        return this.toArray(function(E) {
          return E.sort(_);
        }).then(i);
      }, Pe.prototype.toArray = function(l) {
        var i = this;
        return this._read(function(f) {
          var m = i._ctx;
          if (m.dir === "next" && ua(m, !0) && 0 < m.limit) {
            var y = m.valueMapper, g = Fn(m, m.table.core.schema);
            return m.table.core.query({ trans: f, limit: m.limit, values: !0, query: { index: g, range: m.range } }).then(function(_) {
              return _ = _.result, y ? _.map(y) : _;
            });
          }
          var b = [];
          return Fl(m, function(_) {
            return b.push(_);
          }, f, m.table.core).then(function() {
            return b;
          });
        }, l);
      }, Pe.prototype.offset = function(l) {
        var i = this._ctx;
        return l <= 0 || (i.offset += l, ua(i) ? Jl(i, function() {
          var f = l;
          return function(m, y) {
            return f === 0 || (f === 1 ? --f : y(function() {
              m.advance(f), f = 0;
            }), !1);
          };
        }) : Jl(i, function() {
          var f = l;
          return function() {
            return --f < 0;
          };
        })), this;
      }, Pe.prototype.limit = function(l) {
        return this._ctx.limit = Math.min(this._ctx.limit, l), Jl(this._ctx, function() {
          var i = l;
          return function(f, m, y) {
            return --i <= 0 && m(y), 0 <= i;
          };
        }, !0), this;
      }, Pe.prototype.until = function(l, i) {
        return Er(this._ctx, function(f, m, y) {
          return !l(f.value) || (m(y), i);
        }), this;
      }, Pe.prototype.first = function(l) {
        return this.limit(1).toArray(function(i) {
          return i[0];
        }).then(l);
      }, Pe.prototype.last = function(l) {
        return this.reverse().first(l);
      }, Pe.prototype.filter = function(l) {
        var i;
        return Er(this._ctx, function(f) {
          return l(f.value);
        }), (i = this._ctx).isMatch = ja(i.isMatch, l), this;
      }, Pe.prototype.and = function(l) {
        return this.filter(l);
      }, Pe.prototype.or = function(l) {
        return new this.db.WhereClause(this._ctx.table, l, this);
      }, Pe.prototype.reverse = function() {
        return this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
      }, Pe.prototype.desc = function() {
        return this.reverse();
      }, Pe.prototype.eachKey = function(l) {
        var i = this._ctx;
        return i.keysOnly = !i.isMatch, this.each(function(f, m) {
          l(m.key, m);
        });
      }, Pe.prototype.eachUniqueKey = function(l) {
        return this._ctx.unique = "unique", this.eachKey(l);
      }, Pe.prototype.eachPrimaryKey = function(l) {
        var i = this._ctx;
        return i.keysOnly = !i.isMatch, this.each(function(f, m) {
          l(m.primaryKey, m);
        });
      }, Pe.prototype.keys = function(l) {
        var i = this._ctx;
        i.keysOnly = !i.isMatch;
        var f = [];
        return this.each(function(m, y) {
          f.push(y.key);
        }).then(function() {
          return f;
        }).then(l);
      }, Pe.prototype.primaryKeys = function(l) {
        var i = this._ctx;
        if (i.dir === "next" && ua(i, !0) && 0 < i.limit) return this._read(function(m) {
          var y = Fn(i, i.table.core.schema);
          return i.table.core.query({ trans: m, values: !1, limit: i.limit, query: { index: y, range: i.range } });
        }).then(function(m) {
          return m.result;
        }).then(l);
        i.keysOnly = !i.isMatch;
        var f = [];
        return this.each(function(m, y) {
          f.push(y.primaryKey);
        }).then(function() {
          return f;
        }).then(l);
      }, Pe.prototype.uniqueKeys = function(l) {
        return this._ctx.unique = "unique", this.keys(l);
      }, Pe.prototype.firstKey = function(l) {
        return this.limit(1).keys(function(i) {
          return i[0];
        }).then(l);
      }, Pe.prototype.lastKey = function(l) {
        return this.reverse().firstKey(l);
      }, Pe.prototype.distinct = function() {
        var l = this._ctx, l = l.index && l.table.schema.idxByName[l.index];
        if (!l || !l.multi) return this;
        var i = {};
        return Er(this._ctx, function(y) {
          var m = y.primaryKey.toString(), y = Q(i, m);
          return i[m] = !0, !y;
        }), this;
      }, Pe.prototype.modify = function(l) {
        var i = this, f = this._ctx;
        return this._write(function(m) {
          var y = typeof l == "function" ? l : function(z) {
            return wr(z, l);
          }, g = f.table.core, C = g.schema.primaryKey, b = C.outbound, _ = C.extractKey, E = 200, C = i.db._options.modifyChunkSize;
          C && (E = typeof C == "object" ? C[g.name] || C["*"] || 200 : C);
          function B(z, V) {
            var K = V.failures, V = V.numFailures;
            L += z - V;
            for (var J = 0, I = M(K); J < I.length; J++) {
              var ie = I[J];
              w.push(K[ie]);
            }
          }
          var w = [], L = 0, N = [], O = l === Ci;
          return i.clone().primaryKeys().then(function(z) {
            function q(V) {
              var J = Math.min(E, z.length - V), I = z.slice(V, V + J);
              return (O ? Promise.resolve([]) : g.getMany({ trans: m, keys: I, cache: "immutable" })).then(function(ie) {
                var ce = [], ne = [], ue = b ? [] : null, se = O ? I : [];
                if (!O) for (var ae = 0; ae < J; ++ae) {
                  var ge = ie[ae], Ee = { value: Vt(ge), primKey: z[V + ae] };
                  y.call(Ee, Ee.value, Ee) !== !1 && (Ee.value == null ? se.push(z[V + ae]) : b || Qe(_(ge), _(Ee.value)) === 0 ? (ne.push(Ee.value), b && ue.push(z[V + ae])) : (se.push(z[V + ae]), ce.push(Ee.value)));
                }
                return Promise.resolve(0 < ce.length && g.mutate({ trans: m, type: "add", values: ce }).then(function(Re) {
                  for (var He in Re.failures) se.splice(parseInt(He), 1);
                  B(ce.length, Re);
                })).then(function() {
                  return (0 < ne.length || K && typeof l == "object") && g.mutate({ trans: m, type: "put", keys: ue, values: ne, criteria: K, changeSpec: typeof l != "function" && l, isAdditionalChunk: 0 < V }).then(function(Re) {
                    return B(ne.length, Re);
                  });
                }).then(function() {
                  return (0 < se.length || K && O) && g.mutate({ trans: m, type: "delete", keys: se, criteria: K, isAdditionalChunk: 0 < V }).then(function(Re) {
                    return Ft(f.table, se, Re);
                  }).then(function(Re) {
                    return B(se.length, Re);
                  });
                }).then(function() {
                  return z.length > V + J && q(V + E);
                });
              });
            }
            var K = ua(f) && f.limit === 1 / 0 && (typeof l != "function" || O) && { index: f.index, range: f.range };
            return q(0).then(function() {
              if (0 < w.length) throw new De("Error modifying one or more objects", w, L, N);
              return z.length;
            });
          });
        });
      }, Pe.prototype.delete = function() {
        var l = this._ctx, i = l.range;
        return !ua(l) || l.table.schema.yProps || !l.isPrimKey && i.type !== 3 ? this.modify(Ci) : this._write(function(f) {
          var m = l.table.core.schema.primaryKey, y = i;
          return l.table.core.count({ trans: f, query: { index: m, range: y } }).then(function(g) {
            return l.table.core.mutate({ trans: f, type: "deleteRange", range: y }).then(function(E) {
              var _ = E.failures, E = E.numFailures;
              if (E) throw new De("Could not delete some values", Object.keys(_).map(function(C) {
                return _[C];
              }), g - E);
              return g - E;
            });
          });
        });
      }, Pe);
      function Pe() {
      }
      var Ci = function(l, i) {
        return i.value = null;
      };
      function Ni(l, i) {
        return l < i ? -1 : l === i ? 0 : 1;
      }
      function vs(l, i) {
        return i < l ? -1 : l === i ? 0 : 1;
      }
      function sn(l, i, f) {
        return l = l instanceof Ea ? new l.Collection(l) : l, l._ctx.error = new (f || TypeError)(i), l;
      }
      function $n(l) {
        return new l.Collection(l, function() {
          return Cr("");
        }).limit(0);
      }
      function hn(l, i, f, m) {
        var y, g, b, _, E, C, B, w = f.length;
        if (!f.every(function(O) {
          return typeof O == "string";
        })) return sn(l, Nt);
        function L(O) {
          y = O === "next" ? function(q) {
            return q.toUpperCase();
          } : function(q) {
            return q.toLowerCase();
          }, g = O === "next" ? function(q) {
            return q.toLowerCase();
          } : function(q) {
            return q.toUpperCase();
          }, b = O === "next" ? Ni : vs;
          var z = f.map(function(q) {
            return { lower: g(q), upper: y(q) };
          }).sort(function(q, K) {
            return b(q.lower, K.lower);
          });
          _ = z.map(function(q) {
            return q.upper;
          }), E = z.map(function(q) {
            return q.lower;
          }), B = (C = O) === "next" ? "" : m;
        }
        L("next"), l = new l.Collection(l, function() {
          return Rn(_[0], E[w - 1] + m);
        }), l._ondirectionchange = function(O) {
          L(O);
        };
        var N = 0;
        return l._addAlgorithm(function(O, z, q) {
          var K = O.key;
          if (typeof K != "string") return !1;
          var V = g(K);
          if (i(V, E, N)) return !0;
          for (var J = null, I = N; I < w; ++I) {
            var ie = (function(ce, ne, ue, se, ae, ge) {
              for (var Ee = Math.min(ce.length, se.length), Re = -1, He = 0; He < Ee; ++He) {
                var Yt = ne[He];
                if (Yt !== se[He]) return ae(ce[He], ue[He]) < 0 ? ce.substr(0, He) + ue[He] + ue.substr(He + 1) : ae(ce[He], se[He]) < 0 ? ce.substr(0, He) + se[He] + ue.substr(He + 1) : 0 <= Re ? ce.substr(0, Re) + ne[Re] + ue.substr(Re + 1) : null;
                ae(ce[He], Yt) < 0 && (Re = He);
              }
              return Ee < se.length && ge === "next" ? ce + ue.substr(ce.length) : Ee < ce.length && ge === "prev" ? ce.substr(0, ue.length) : Re < 0 ? null : ce.substr(0, Re) + se[Re] + ue.substr(Re + 1);
            })(K, V, _[I], E[I], b, C);
            ie === null && J === null ? N = I + 1 : (J === null || 0 < b(J, ie)) && (J = ie);
          }
          return z(J !== null ? function() {
            O.continue(J + B);
          } : q), !1;
        }), l;
      }
      function Rn(l, i, f, m) {
        return { type: 2, lower: l, upper: i, lowerOpen: f, upperOpen: m };
      }
      function Cr(l) {
        return { type: 1, lower: l, upper: l };
      }
      var Ea = (Object.defineProperty(yt.prototype, "Collection", { get: function() {
        return this._ctx.table.db.Collection;
      }, enumerable: !1, configurable: !0 }), yt.prototype.between = function(l, i, f, m) {
        f = f !== !1, m = m === !0;
        try {
          return 0 < this._cmp(l, i) || this._cmp(l, i) === 0 && (f || m) && (!f || !m) ? $n(this) : new this.Collection(this, function() {
            return Rn(l, i, !f, !m);
          });
        } catch {
          return sn(this, nn);
        }
      }, yt.prototype.equals = function(l) {
        return l == null ? sn(this, nn) : new this.Collection(this, function() {
          return Cr(l);
        });
      }, yt.prototype.above = function(l) {
        return l == null ? sn(this, nn) : new this.Collection(this, function() {
          return Rn(l, void 0, !0);
        });
      }, yt.prototype.aboveOrEqual = function(l) {
        return l == null ? sn(this, nn) : new this.Collection(this, function() {
          return Rn(l, void 0, !1);
        });
      }, yt.prototype.below = function(l) {
        return l == null ? sn(this, nn) : new this.Collection(this, function() {
          return Rn(void 0, l, !1, !0);
        });
      }, yt.prototype.belowOrEqual = function(l) {
        return l == null ? sn(this, nn) : new this.Collection(this, function() {
          return Rn(void 0, l);
        });
      }, yt.prototype.startsWith = function(l) {
        return typeof l != "string" ? sn(this, Nt) : this.between(l, l + En, !0, !0);
      }, yt.prototype.startsWithIgnoreCase = function(l) {
        return l === "" ? this.startsWith(l) : hn(this, function(i, f) {
          return i.indexOf(f[0]) === 0;
        }, [l], En);
      }, yt.prototype.equalsIgnoreCase = function(l) {
        return hn(this, function(i, f) {
          return i === f[0];
        }, [l], "");
      }, yt.prototype.anyOfIgnoreCase = function() {
        var l = Ve.apply($e, arguments);
        return l.length === 0 ? $n(this) : hn(this, function(i, f) {
          return f.indexOf(i) !== -1;
        }, l, "");
      }, yt.prototype.startsWithAnyOfIgnoreCase = function() {
        var l = Ve.apply($e, arguments);
        return l.length === 0 ? $n(this) : hn(this, function(i, f) {
          return f.some(function(m) {
            return i.indexOf(m) === 0;
          });
        }, l, En);
      }, yt.prototype.anyOf = function() {
        var l = this, i = Ve.apply($e, arguments), f = this._cmp;
        try {
          i.sort(f);
        } catch {
          return sn(this, nn);
        }
        if (i.length === 0) return $n(this);
        var m = new this.Collection(this, function() {
          return Rn(i[0], i[i.length - 1]);
        });
        m._ondirectionchange = function(g) {
          f = g === "next" ? l._ascending : l._descending, i.sort(f);
        };
        var y = 0;
        return m._addAlgorithm(function(g, b, _) {
          for (var E = g.key; 0 < f(E, i[y]); ) if (++y === i.length) return b(_), !1;
          return f(E, i[y]) === 0 || (b(function() {
            g.continue(i[y]);
          }), !1);
        }), m;
      }, yt.prototype.notEqual = function(l) {
        return this.inAnyRange([[-1 / 0, l], [l, this.db._maxKey]], { includeLowers: !1, includeUppers: !1 });
      }, yt.prototype.noneOf = function() {
        var l = Ve.apply($e, arguments);
        if (l.length === 0) return new this.Collection(this);
        try {
          l.sort(this._ascending);
        } catch {
          return sn(this, nn);
        }
        var i = l.reduce(function(f, m) {
          return f ? f.concat([[f[f.length - 1][1], m]]) : [[-1 / 0, m]];
        }, null);
        return i.push([l[l.length - 1], this.db._maxKey]), this.inAnyRange(i, { includeLowers: !1, includeUppers: !1 });
      }, yt.prototype.inAnyRange = function(K, i) {
        var f = this, m = this._cmp, y = this._ascending, g = this._descending, b = this._min, _ = this._max;
        if (K.length === 0) return $n(this);
        if (!K.every(function(V) {
          return V[0] !== void 0 && V[1] !== void 0 && y(V[0], V[1]) <= 0;
        })) return sn(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", me.InvalidArgument);
        var E = !i || i.includeLowers !== !1, C = i && i.includeUppers === !0, B, w = y;
        function L(V, J) {
          return w(V[0], J[0]);
        }
        try {
          (B = K.reduce(function(V, J) {
            for (var I = 0, ie = V.length; I < ie; ++I) {
              var ce = V[I];
              if (m(J[0], ce[1]) < 0 && 0 < m(J[1], ce[0])) {
                ce[0] = b(ce[0], J[0]), ce[1] = _(ce[1], J[1]);
                break;
              }
            }
            return I === ie && V.push(J), V;
          }, [])).sort(L);
        } catch {
          return sn(this, nn);
        }
        var N = 0, O = C ? function(V) {
          return 0 < y(V, B[N][1]);
        } : function(V) {
          return 0 <= y(V, B[N][1]);
        }, z = E ? function(V) {
          return 0 < g(V, B[N][0]);
        } : function(V) {
          return 0 <= g(V, B[N][0]);
        }, q = O, K = new this.Collection(this, function() {
          return Rn(B[0][0], B[B.length - 1][1], !E, !C);
        });
        return K._ondirectionchange = function(V) {
          w = V === "next" ? (q = O, y) : (q = z, g), B.sort(L);
        }, K._addAlgorithm(function(V, J, I) {
          for (var ie, ce = V.key; q(ce); ) if (++N === B.length) return J(I), !1;
          return !O(ie = ce) && !z(ie) || (f._cmp(ce, B[N][1]) === 0 || f._cmp(ce, B[N][0]) === 0 || J(function() {
            w === y ? V.continue(B[N][0]) : V.continue(B[N][1]);
          }), !1);
        }), K;
      }, yt.prototype.startsWithAnyOf = function() {
        var l = Ve.apply($e, arguments);
        return l.every(function(i) {
          return typeof i == "string";
        }) ? l.length === 0 ? $n(this) : this.inAnyRange(l.map(function(i) {
          return [i, i + En];
        })) : sn(this, "startsWithAnyOf() only works with strings");
      }, yt);
      function yt() {
      }
      function Cn(l) {
        return dt(function(i) {
          return Ca(i), l(i.target.error), !1;
        });
      }
      function Ca(l) {
        l.stopPropagation && l.stopPropagation(), l.preventDefault && l.preventDefault();
      }
      var tl = "storagemutated", Na = "x-storagemutated-1", Ht = Zl(null, tl), Ti = (an.prototype._lock = function() {
        return Oe(!ye.global), ++this._reculock, this._reculock !== 1 || ye.global || (ye.lockOwnerFor = this), this;
      }, an.prototype._unlock = function() {
        if (Oe(!ye.global), --this._reculock == 0) for (ye.global || (ye.lockOwnerFor = null); 0 < this._blockedFuncs.length && !this._locked(); ) {
          var l = this._blockedFuncs.shift();
          try {
            wn(l[1], l[0]);
          } catch {
          }
        }
        return this;
      }, an.prototype._locked = function() {
        return this._reculock && ye.lockOwnerFor !== this;
      }, an.prototype.create = function(l) {
        var i = this;
        if (!this.mode) return this;
        var f = this.db.idbdb, m = this.db._state.dbOpenError;
        if (Oe(!this.idbtrans), !l && !f) switch (m && m.name) {
          case "DatabaseClosedError":
            throw new me.DatabaseClosed(m);
          case "MissingAPIError":
            throw new me.MissingAPI(m.message, m);
          default:
            throw new me.OpenFailed(m);
        }
        if (!this.active) throw new me.TransactionInactive();
        return Oe(this._completion._state === null), (l = this.idbtrans = l || (this.db.core || f).transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })).onerror = dt(function(y) {
          Ca(y), i._reject(l.error);
        }), l.onabort = dt(function(y) {
          Ca(y), i.active && i._reject(new me.Abort(l.error)), i.active = !1, i.on("abort").fire(y);
        }), l.oncomplete = dt(function() {
          i.active = !1, i._resolve(), "mutatedParts" in l && Ht.storagemutated.fire(l.mutatedParts);
        }), this;
      }, an.prototype._promise = function(l, i, f) {
        var m = this;
        if (l === "readwrite" && this.mode !== "readwrite") return ut(new me.ReadOnly("Transaction is readonly"));
        if (!this.active) return ut(new me.TransactionInactive());
        if (this._locked()) return new he(function(g, b) {
          m._blockedFuncs.push([function() {
            m._promise(l, i, f).then(g, b);
          }, ye]);
        });
        if (f) return mt(function() {
          var g = new he(function(b, _) {
            m._lock();
            var E = i(b, _, m);
            E && E.then && E.then(b, _);
          });
          return g.finally(function() {
            return m._unlock();
          }), g._lib = !0, g;
        });
        var y = new he(function(g, b) {
          var _ = i(g, b, m);
          _ && _.then && _.then(g, b);
        });
        return y._lib = !0, y;
      }, an.prototype._root = function() {
        return this.parent ? this.parent._root() : this;
      }, an.prototype.waitFor = function(l) {
        var i, f = this._root(), m = he.resolve(l);
        f._waitingFor ? f._waitingFor = f._waitingFor.then(function() {
          return m;
        }) : (f._waitingFor = m, f._waitingQueue = [], i = f.idbtrans.objectStore(f.storeNames[0]), (function g() {
          for (++f._spinCount; f._waitingQueue.length; ) f._waitingQueue.shift()();
          f._waitingFor && (i.get(-1 / 0).onsuccess = g);
        })());
        var y = f._waitingFor;
        return new he(function(g, b) {
          m.then(function(_) {
            return f._waitingQueue.push(dt(g.bind(null, _)));
          }, function(_) {
            return f._waitingQueue.push(dt(b.bind(null, _)));
          }).finally(function() {
            f._waitingFor === y && (f._waitingFor = null);
          });
        });
      }, an.prototype.abort = function() {
        this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new me.Abort()));
      }, an.prototype.table = function(l) {
        var i = this._memoizedTables || (this._memoizedTables = {});
        if (Q(i, l)) return i[l];
        var f = this.schema[l];
        if (!f) throw new me.NotFound("Table " + l + " not part of transaction");
        return f = new this.db.Table(l, f, this), f.core = this.db.core.table(l), i[l] = f;
      }, an);
      function an() {
      }
      function Un(l, i, f, m, y, g, b, _) {
        return { name: l, keyPath: i, unique: f, multi: m, auto: y, compound: g, src: (f && !b ? "&" : "") + (m ? "*" : "") + (y ? "++" : "") + Nr(i), type: _ };
      }
      function Nr(l) {
        return typeof l == "string" ? l : l ? "[" + [].join.call(l, "+") + "]" : "";
      }
      function nl(l, i, f) {
        return { name: l, primKey: i, indexes: f, mappedClass: null, idxByName: (m = function(y) {
          return [y.name, y];
        }, f.reduce(function(y, g, b) {
          return b = m(g, b), b && (y[b[0]] = b[1]), y;
        }, {})) };
        var m;
      }
      var al = function(l) {
        try {
          return l.only([[]]), al = function() {
            return [[]];
          }, [[]];
        } catch {
          return al = function() {
            return En;
          }, En;
        }
      };
      function ll(l) {
        return l == null ? function() {
        } : typeof l == "string" ? (i = l).split(".").length === 1 ? function(f) {
          return f[i];
        } : function(f) {
          return Be(f, i);
        } : function(f) {
          return Be(f, l);
        };
        var i;
      }
      function $l(l) {
        return [].slice.call(l);
      }
      var Bu = 0;
      function Ot(l) {
        return l == null ? ":id" : typeof l == "string" ? l : "[".concat(l.join("+"), "]");
      }
      function Ta(l, i, E) {
        function m(q) {
          if (q.type === 3) return null;
          if (q.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
          var N = q.lower, O = q.upper, z = q.lowerOpen, q = q.upperOpen;
          return N === void 0 ? O === void 0 ? null : i.upperBound(O, !!q) : O === void 0 ? i.lowerBound(N, !!z) : i.bound(N, O, !!z, !!q);
        }
        function y(L) {
          var N, O = L.name;
          return { name: O, schema: L, mutate: function(z) {
            var q = z.trans, K = z.type, V = z.keys, J = z.values, I = z.range;
            return new Promise(function(ie, ce) {
              ie = dt(ie);
              var ne = q.objectStore(O), ue = ne.keyPath == null, se = K === "put" || K === "add";
              if (!se && K !== "delete" && K !== "deleteRange") throw new Error("Invalid operation type: " + K);
              var ae, ge = (V || J || { length: 1 }).length;
              if (V && J && V.length !== J.length) throw new Error("Given keys array must have same length as given values array.");
              if (ge === 0) return ie({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
              function Ee(Mt) {
                ++Yt, Ca(Mt);
              }
              var Re = [], He = [], Yt = 0;
              if (K === "deleteRange") {
                if (I.type === 4) return ie({ numFailures: Yt, failures: He, results: [], lastResult: void 0 });
                I.type === 3 ? Re.push(ae = ne.clear()) : Re.push(ae = ne.delete(m(I)));
              } else {
                var ue = se ? ue ? [J, V] : [J, null] : [V, null], ze = ue[0], zt = ue[1];
                if (se) for (var xt = 0; xt < ge; ++xt) Re.push(ae = zt && zt[xt] !== void 0 ? ne[K](ze[xt], zt[xt]) : ne[K](ze[xt])), ae.onerror = Ee;
                else for (xt = 0; xt < ge; ++xt) Re.push(ae = ne[K](ze[xt])), ae.onerror = Ee;
              }
              function ar(Mt) {
                Mt = Mt.target.result, Re.forEach(function(mn, Yi) {
                  return mn.error != null && (He[Yi] = mn.error);
                }), ie({ numFailures: Yt, failures: He, results: K === "delete" ? V : Re.map(function(mn) {
                  return mn.result;
                }), lastResult: Mt });
              }
              ae.onerror = function(Mt) {
                Ee(Mt), ar(Mt);
              }, ae.onsuccess = ar;
            });
          }, getMany: function(z) {
            var q = z.trans, K = z.keys;
            return new Promise(function(V, J) {
              V = dt(V);
              for (var I, ie = q.objectStore(O), ce = K.length, ne = new Array(ce), ue = 0, se = 0, ae = function(Re) {
                Re = Re.target, ne[Re._pos] = Re.result, ++se === ue && V(ne);
              }, ge = Cn(J), Ee = 0; Ee < ce; ++Ee) K[Ee] != null && ((I = ie.get(K[Ee]))._pos = Ee, I.onsuccess = ae, I.onerror = ge, ++ue);
              ue === 0 && V(ne);
            });
          }, get: function(z) {
            var q = z.trans, K = z.key;
            return new Promise(function(V, J) {
              V = dt(V);
              var I = q.objectStore(O).get(K);
              I.onsuccess = function(ie) {
                return V(ie.target.result);
              }, I.onerror = Cn(J);
            });
          }, query: (N = C, function(z) {
            return new Promise(function(q, K) {
              q = dt(q);
              var V, J, I, ue = z.trans, ie = z.values, ce = z.limit, ae = z.query, ne = ce === 1 / 0 ? void 0 : ce, se = ae.index, ae = ae.range, ue = ue.objectStore(O), se = se.isPrimaryKey ? ue : ue.index(se.name), ae = m(ae);
              if (ce === 0) return q({ result: [] });
              N ? ((ne = ie ? se.getAll(ae, ne) : se.getAllKeys(ae, ne)).onsuccess = function(ge) {
                return q({ result: ge.target.result });
              }, ne.onerror = Cn(K)) : (V = 0, J = !ie && "openKeyCursor" in se ? se.openKeyCursor(ae) : se.openCursor(ae), I = [], J.onsuccess = function(ge) {
                var Ee = J.result;
                return Ee ? (I.push(ie ? Ee.value : Ee.primaryKey), ++V === ce ? q({ result: I }) : void Ee.continue()) : q({ result: I });
              }, J.onerror = Cn(K));
            });
          }), openCursor: function(z) {
            var q = z.trans, K = z.values, V = z.query, J = z.reverse, I = z.unique;
            return new Promise(function(ie, ce) {
              ie = dt(ie);
              var se = V.index, ne = V.range, ue = q.objectStore(O), ue = se.isPrimaryKey ? ue : ue.index(se.name), se = J ? I ? "prevunique" : "prev" : I ? "nextunique" : "next", ae = !K && "openKeyCursor" in ue ? ue.openKeyCursor(m(ne), se) : ue.openCursor(m(ne), se);
              ae.onerror = Cn(ce), ae.onsuccess = dt(function(ge) {
                var Ee, Re, He, Yt, ze = ae.result;
                ze ? (ze.___id = ++Bu, ze.done = !1, Ee = ze.continue.bind(ze), Re = (Re = ze.continuePrimaryKey) && Re.bind(ze), He = ze.advance.bind(ze), Yt = function() {
                  throw new Error("Cursor not stopped");
                }, ze.trans = q, ze.stop = ze.continue = ze.continuePrimaryKey = ze.advance = function() {
                  throw new Error("Cursor not started");
                }, ze.fail = dt(ce), ze.next = function() {
                  var zt = this, xt = 1;
                  return this.start(function() {
                    return xt-- ? zt.continue() : zt.stop();
                  }).then(function() {
                    return zt;
                  });
                }, ze.start = function(zt) {
                  function xt() {
                    if (ae.result) try {
                      zt();
                    } catch (Mt) {
                      ze.fail(Mt);
                    }
                    else ze.done = !0, ze.start = function() {
                      throw new Error("Cursor behind last entry");
                    }, ze.stop();
                  }
                  var ar = new Promise(function(Mt, mn) {
                    Mt = dt(Mt), ae.onerror = Cn(mn), ze.fail = mn, ze.stop = function(Yi) {
                      ze.stop = ze.continue = ze.continuePrimaryKey = ze.advance = Yt, Mt(Yi);
                    };
                  });
                  return ae.onsuccess = dt(function(Mt) {
                    ae.onsuccess = xt, xt();
                  }), ze.continue = Ee, ze.continuePrimaryKey = Re, ze.advance = He, xt(), ar;
                }, ie(ze)) : ie(null);
              }, ce);
            });
          }, count: function(z) {
            var q = z.query, K = z.trans, V = q.index, J = q.range;
            return new Promise(function(I, ie) {
              var ce = K.objectStore(O), ne = V.isPrimaryKey ? ce : ce.index(V.name), ce = m(J), ne = ce ? ne.count(ce) : ne.count();
              ne.onsuccess = dt(function(ue) {
                return I(ue.target.result);
              }), ne.onerror = Cn(ie);
            });
          } };
        }
        var g, b, _, B = (b = E, _ = $l((g = l).objectStoreNames), { schema: { name: g.name, tables: _.map(function(L) {
          return b.objectStore(L);
        }).map(function(L) {
          var N = L.keyPath, q = L.autoIncrement, O = R(N), z = {}, q = { name: L.name, primaryKey: { name: null, isPrimaryKey: !0, outbound: N == null, compound: O, keyPath: N, autoIncrement: q, unique: !0, extractKey: ll(N) }, indexes: $l(L.indexNames).map(function(K) {
            return L.index(K);
          }).map(function(I) {
            var V = I.name, J = I.unique, ie = I.multiEntry, I = I.keyPath, ie = { name: V, compound: R(I), keyPath: I, unique: J, multiEntry: ie, extractKey: ll(I) };
            return z[Ot(I)] = ie;
          }), getIndexByKeyPath: function(K) {
            return z[Ot(K)];
          } };
          return z[":id"] = q.primaryKey, N != null && (z[Ot(N)] = q.primaryKey), q;
        }) }, hasGetAll: 0 < _.length && "getAll" in b.objectStore(_[0]) && !(typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) }), E = B.schema, C = B.hasGetAll, B = E.tables.map(y), w = {};
        return B.forEach(function(L) {
          return w[L.name] = L;
        }), { stack: "dbcore", transaction: l.transaction.bind(l), table: function(L) {
          if (!w[L]) throw new Error("Table '".concat(L, "' not found"));
          return w[L];
        }, MIN_KEY: -1 / 0, MAX_KEY: al(i), schema: E };
      }
      function Tr(l, i, f, m) {
        var y = f.IDBKeyRange;
        return f.indexedDB, { dbcore: (m = Ta(i, y, m), l.dbcore.reduce(function(g, b) {
          return b = b.create, h(h({}, g), b(g));
        }, m)) };
      }
      function oa(l, m) {
        var f = m.db, m = Tr(l._middlewares, f, l._deps, m);
        l.core = m.dbcore, l.tables.forEach(function(y) {
          var g = y.name;
          l.core.schema.tables.some(function(b) {
            return b.name === g;
          }) && (y.core = l.core.table(g), l[g] instanceof l.Table && (l[g].core = y.core));
        });
      }
      function Ar(l, i, f, m) {
        f.forEach(function(y) {
          var g = m[y];
          i.forEach(function(b) {
            var _ = (function E(C, B) {
              return ke(C, B) || (C = D(C)) && E(C, B);
            })(b, y);
            (!_ || "value" in _ && _.value === void 0) && (b === l.Transaction.prototype || b instanceof l.Transaction ? Ae(b, y, { get: function() {
              return this.table(y);
            }, set: function(E) {
              we(this, y, { value: E, writable: !0, configurable: !0, enumerable: !0 });
            } }) : b[y] = new l.Table(y, g));
          });
        });
      }
      function Pl(l, i) {
        i.forEach(function(f) {
          for (var m in f) f[m] instanceof l.Table && delete f[m];
        });
      }
      function Ai(l, i) {
        return l._cfg.version - i._cfg.version;
      }
      function Il(l, i, f, m) {
        var y = l._dbSchema;
        f.objectStoreNames.contains("$meta") && !y.$meta && (y.$meta = nl("$meta", Lu("")[0], []), l._storeNames.push("$meta"));
        var g = l._createTransaction("readwrite", l._storeNames, y);
        g.create(f), g._completion.catch(m);
        var b = g._reject.bind(g), _ = ye.transless || ye;
        mt(function() {
          return ye.trans = g, ye.transless = _, i !== 0 ? (oa(l, f), C = i, ((E = g).storeNames.includes("$meta") ? E.table("$meta").get("version").then(function(B) {
            return B ?? C;
          }) : he.resolve(C)).then(function(B) {
            return L = B, N = g, O = f, z = [], B = (w = l)._versions, q = w._dbSchema = rl(0, w.idbdb, O), (B = B.filter(function(K) {
              return K._cfg.version >= L;
            })).length !== 0 ? (B.forEach(function(K) {
              z.push(function() {
                var V = q, J = K._cfg.dbschema;
                Mr(w, V, O), Mr(w, J, O), q = w._dbSchema = J;
                var I = Or(V, J);
                I.add.forEach(function(se) {
                  ki(O, se[0], se[1].primKey, se[1].indexes);
                }), I.change.forEach(function(se) {
                  if (se.recreate) throw new me.Upgrade("Not yet support for changing primary key");
                  var ae = O.objectStore(se.name);
                  se.add.forEach(function(ge) {
                    return zr(ae, ge);
                  }), se.change.forEach(function(ge) {
                    ae.deleteIndex(ge.name), zr(ae, ge);
                  }), se.del.forEach(function(ge) {
                    return ae.deleteIndex(ge);
                  });
                });
                var ie = K._cfg.contentUpgrade;
                if (ie && K._cfg.version > L) {
                  oa(w, O), N._memoizedTables = {};
                  var ce = ft(J);
                  I.del.forEach(function(se) {
                    ce[se] = V[se];
                  }), Pl(w, [w.Transaction.prototype]), Ar(w, [w.Transaction.prototype], M(ce), ce), N.schema = ce;
                  var ne, ue = A(ie);
                  return ue && Ct(), I = he.follow(function() {
                    var se;
                    (ne = ie(N)) && ue && (se = on.bind(null, null), ne.then(se, se));
                  }), ne && typeof ne.then == "function" ? he.resolve(ne) : I.then(function() {
                    return ne;
                  });
                }
              }), z.push(function(V) {
                var J, I, ie = K._cfg.dbschema;
                J = ie, I = V, [].slice.call(I.db.objectStoreNames).forEach(function(ce) {
                  return J[ce] == null && I.db.deleteObjectStore(ce);
                }), Pl(w, [w.Transaction.prototype]), Ar(w, [w.Transaction.prototype], w._storeNames, w._dbSchema), N.schema = w._dbSchema;
              }), z.push(function(V) {
                w.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(w.idbdb.version / 10) === K._cfg.version ? (w.idbdb.deleteObjectStore("$meta"), delete w._dbSchema.$meta, w._storeNames = w._storeNames.filter(function(J) {
                  return J !== "$meta";
                })) : V.objectStore("$meta").put(K._cfg.version, "version"));
              });
            }), (function K() {
              return z.length ? he.resolve(z.shift()(N.idbtrans)).then(K) : he.resolve();
            })().then(function() {
              qu(q, O);
            })) : he.resolve();
            var w, L, N, O, z, q;
          }).catch(b)) : (M(y).forEach(function(B) {
            ki(f, B, y[B].primKey, y[B].indexes);
          }), oa(l, f), void he.follow(function() {
            return l.on.populate.fire(g);
          }).catch(b));
          var E, C;
        });
      }
      function kr(l, i) {
        qu(l._dbSchema, i), i.db.version % 10 != 0 || i.objectStoreNames.contains("$meta") || i.db.createObjectStore("$meta").add(Math.ceil(i.db.version / 10 - 1), "version");
        var f = rl(0, l.idbdb, i);
        Mr(l, l._dbSchema, i);
        for (var m = 0, y = Or(f, l._dbSchema).change; m < y.length; m++) {
          var g = (function(b) {
            if (b.change.length || b.recreate) return console.warn("Unable to patch indexes of table ".concat(b.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
            var _ = i.objectStore(b.name);
            b.add.forEach(function(E) {
              dn && console.debug("Dexie upgrade patch: Creating missing index ".concat(b.name, ".").concat(E.src)), zr(_, E);
            });
          })(y[m]);
          if (typeof g == "object") return g.value;
        }
      }
      function Or(l, i) {
        var f, m = { del: [], add: [], change: [] };
        for (f in l) i[f] || m.del.push(f);
        for (f in i) {
          var y = l[f], g = i[f];
          if (y) {
            var b = { name: f, def: g, recreate: !1, del: [], add: [], change: [] };
            if ("" + (y.primKey.keyPath || "") != "" + (g.primKey.keyPath || "") || y.primKey.auto !== g.primKey.auto) b.recreate = !0, m.change.push(b);
            else {
              var _ = y.idxByName, E = g.idxByName, C = void 0;
              for (C in _) E[C] || b.del.push(C);
              for (C in E) {
                var B = _[C], w = E[C];
                B ? B.src !== w.src && b.change.push(w) : b.add.push(w);
              }
              (0 < b.del.length || 0 < b.add.length || 0 < b.change.length) && m.change.push(b);
            }
          } else m.add.push([f, g]);
        }
        return m;
      }
      function ki(l, i, f, m) {
        var y = l.db.createObjectStore(i, f.keyPath ? { keyPath: f.keyPath, autoIncrement: f.auto } : { autoIncrement: f.auto });
        return m.forEach(function(g) {
          return zr(y, g);
        }), y;
      }
      function qu(l, i) {
        M(l).forEach(function(f) {
          i.db.objectStoreNames.contains(f) || (dn && console.debug("Dexie: Creating missing table", f), ki(i, f, l[f].primKey, l[f].indexes));
        });
      }
      function zr(l, i) {
        l.createIndex(i.name, i.keyPath, { unique: i.unique, multiEntry: i.multi });
      }
      function rl(l, i, f) {
        var m = {};
        return Me(i.objectStoreNames, 0).forEach(function(y) {
          for (var g = f.objectStore(y), b = Un(Nr(C = g.keyPath), C || "", !0, !1, !!g.autoIncrement, C && typeof C != "string", !0), _ = [], E = 0; E < g.indexNames.length; ++E) {
            var B = g.index(g.indexNames[E]), C = B.keyPath, B = Un(B.name, C, !!B.unique, !!B.multiEntry, !1, C && typeof C != "string", !1);
            _.push(B);
          }
          m[y] = nl(y, b, _);
        }), m;
      }
      function Mr(l, i, f) {
        for (var m = f.db.objectStoreNames, y = 0; y < m.length; ++y) {
          var g = m[y], b = f.objectStore(g);
          l._hasGetAll = "getAll" in b;
          for (var _ = 0; _ < b.indexNames.length; ++_) {
            var E = b.indexNames[_], C = b.index(E).keyPath, B = typeof C == "string" ? C : "[" + Me(C).join("+") + "]";
            !i[g] || (C = i[g].idxByName[B]) && (C.name = E, delete i[g].idxByName[B], i[g].idxByName[E] = C);
          }
        }
        typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && S.WorkerGlobalScope && S instanceof S.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (l._hasGetAll = !1);
      }
      function Lu(l) {
        return l.split(",").map(function(i, f) {
          var g = i.split(":"), m = (y = g[1]) === null || y === void 0 ? void 0 : y.trim(), y = (i = g[0].trim()).replace(/([&*]|\+\+)/g, ""), g = /^\[/.test(y) ? y.match(/^\[(.*)\]$/)[1].split("+") : y;
          return Un(y, g || null, /\&/.test(i), /\*/.test(i), /\+\+/.test(i), R(g), f === 0, m);
        });
      }
      var bs = (il.prototype._createTableSchema = nl, il.prototype._parseIndexSyntax = Lu, il.prototype._parseStoresSpec = function(l, i) {
        var f = this;
        M(l).forEach(function(m) {
          if (l[m] !== null) {
            var y = f._parseIndexSyntax(l[m]), g = y.shift();
            if (!g) throw new me.Schema("Invalid schema for table " + m + ": " + l[m]);
            if (g.unique = !0, g.multi) throw new me.Schema("Primary key cannot be multiEntry*");
            y.forEach(function(b) {
              if (b.auto) throw new me.Schema("Only primary key can be marked as autoIncrement (++)");
              if (!b.keyPath) throw new me.Schema("Index must have a name and cannot be an empty string");
            }), y = f._createTableSchema(m, g, y), i[m] = y;
          }
        });
      }, il.prototype.stores = function(f) {
        var i = this.db;
        this._cfg.storesSource = this._cfg.storesSource ? k(this._cfg.storesSource, f) : f;
        var f = i._versions, m = {}, y = {};
        return f.forEach(function(g) {
          k(m, g._cfg.storesSource), y = g._cfg.dbschema = {}, g._parseStoresSpec(m, y);
        }), i._dbSchema = y, Pl(i, [i._allTables, i, i.Transaction.prototype]), Ar(i, [i._allTables, i, i.Transaction.prototype, this._cfg.tables], M(y), y), i._storeNames = M(y), this;
      }, il.prototype.upgrade = function(l) {
        return this._cfg.contentUpgrade = Dl(this._cfg.contentUpgrade || et, l), this;
      }, il);
      function il() {
      }
      function Oi(l, i) {
        var f = l._dbNamesDB;
        return f || (f = l._dbNamesDB = new Bn(Ql, { addons: [], indexedDB: l, IDBKeyRange: i })).version(1).stores({ dbnames: "name" }), f.table("dbnames");
      }
      function Dr(l) {
        return l && typeof l.databases == "function";
      }
      function zi(l) {
        return mt(function() {
          return ye.letThrough = !0, l();
        });
      }
      function Mi(l) {
        return !("from" in l);
      }
      var Kt = function(l, i) {
        if (!this) {
          var f = new Kt();
          return l && "d" in l && k(f, l), f;
        }
        k(this, arguments.length ? { d: 1, from: l, to: 1 < arguments.length ? i : l } : { d: 0 });
      };
      function Wl(l, i, f) {
        var m = Qe(i, f);
        if (!isNaN(m)) {
          if (0 < m) throw RangeError();
          if (Mi(l)) return k(l, { from: i, to: f, d: 1 });
          var y = l.l, m = l.r;
          if (Qe(f, l.from) < 0) return y ? Wl(y, i, f) : l.l = { from: i, to: f, d: 1, l: null, r: null }, Ku(l);
          if (0 < Qe(i, l.to)) return m ? Wl(m, i, f) : l.r = { from: i, to: f, d: 1, l: null, r: null }, Ku(l);
          Qe(i, l.from) < 0 && (l.from = i, l.l = null, l.d = m ? m.d + 1 : 1), 0 < Qe(f, l.to) && (l.to = f, l.r = null, l.d = l.l ? l.l.d + 1 : 1), f = !l.r, y && !l.l && Aa(l, y), m && f && Aa(l, m);
        }
      }
      function Aa(l, i) {
        Mi(i) || (function f(m, E) {
          var g = E.from, b = E.to, _ = E.l, E = E.r;
          Wl(m, g, b), _ && f(m, _), E && f(m, E);
        })(l, i);
      }
      function Hu(l, i) {
        var f = Rr(i), m = f.next();
        if (m.done) return !1;
        for (var y = m.value, g = Rr(l), b = g.next(y.from), _ = b.value; !m.done && !b.done; ) {
          if (Qe(_.from, y.to) <= 0 && 0 <= Qe(_.to, y.from)) return !0;
          Qe(y.from, _.from) < 0 ? y = (m = f.next(_.from)).value : _ = (b = g.next(y.from)).value;
        }
        return !1;
      }
      function Rr(l) {
        var i = Mi(l) ? null : { s: 0, n: l };
        return { next: function(f) {
          for (var m = 0 < arguments.length; i; ) switch (i.s) {
            case 0:
              if (i.s = 1, m) for (; i.n.l && Qe(f, i.n.from) < 0; ) i = { up: i, n: i.n.l, s: 1 };
              else for (; i.n.l; ) i = { up: i, n: i.n.l, s: 1 };
            case 1:
              if (i.s = 2, !m || Qe(f, i.n.to) <= 0) return { value: i.n, done: !1 };
            case 2:
              if (i.n.r) {
                i.s = 3, i = { up: i, n: i.n.r, s: 0 };
                continue;
              }
            case 3:
              i = i.up;
          }
          return { done: !0 };
        } };
      }
      function Ku(l) {
        var i, f, m = (((i = l.r) === null || i === void 0 ? void 0 : i.d) || 0) - (((f = l.l) === null || f === void 0 ? void 0 : f.d) || 0), y = 1 < m ? "r" : m < -1 ? "l" : "";
        y && (i = y == "r" ? "l" : "r", f = h({}, l), m = l[y], l.from = m.from, l.to = m.to, l[y] = m[y], f[y] = m[i], (l[i] = f).d = Di(f)), l.d = Di(l);
      }
      function Di(f) {
        var i = f.r, f = f.l;
        return (i ? f ? Math.max(i.d, f.d) : i.d : f ? f.d : 0) + 1;
      }
      function Ur(l, i) {
        return M(i).forEach(function(f) {
          l[f] ? Aa(l[f], i[f]) : l[f] = (function m(y) {
            var g, b, _ = {};
            for (g in y) Q(y, g) && (b = y[g], _[g] = !b || typeof b != "object" || Qt.has(b.constructor) ? b : m(b));
            return _;
          })(i[f]);
        }), l;
      }
      function Ri(l, i) {
        return l.all || i.all || Object.keys(l).some(function(f) {
          return i[f] && Hu(i[f], l[f]);
        });
      }
      re(Kt.prototype, ((cn = { add: function(l) {
        return Aa(this, l), this;
      }, addKey: function(l) {
        return Wl(this, l, l), this;
      }, addKeys: function(l) {
        var i = this;
        return l.forEach(function(f) {
          return Wl(i, f, f);
        }), this;
      }, hasKey: function(l) {
        var i = Rr(this).next(l).value;
        return i && Qe(i.from, l) <= 0 && 0 <= Qe(i.to, l);
      } })[U] = function() {
        return Rr(this);
      }, cn));
      var ka = {}, Ui = {}, Bi = !1;
      function Br(l) {
        Ur(Ui, l), Bi || (Bi = !0, setTimeout(function() {
          Bi = !1, qi(Ui, !(Ui = {}));
        }, 0));
      }
      function qi(l, i) {
        i === void 0 && (i = !1);
        var f = /* @__PURE__ */ new Set();
        if (l.all) for (var m = 0, y = Object.values(ka); m < y.length; m++) Yu(b = y[m], l, f, i);
        else for (var g in l) {
          var b, _ = /^idb\:\/\/(.*)\/(.*)\//.exec(g);
          _ && (g = _[1], _ = _[2], (b = ka["idb://".concat(g, "/").concat(_)]) && Yu(b, l, f, i));
        }
        f.forEach(function(E) {
          return E();
        });
      }
      function Yu(l, i, f, m) {
        for (var y = [], g = 0, b = Object.entries(l.queries.query); g < b.length; g++) {
          for (var _ = b[g], E = _[0], C = [], B = 0, w = _[1]; B < w.length; B++) {
            var L = w[B];
            Ri(i, L.obsSet) ? L.subscribers.forEach(function(q) {
              return f.add(q);
            }) : m && C.push(L);
          }
          m && y.push([E, C]);
        }
        if (m) for (var N = 0, O = y; N < O.length; N++) {
          var z = O[N], E = z[0], C = z[1];
          l.queries.query[E] = C;
        }
      }
      function xs(l) {
        var i = l._state, f = l._deps.indexedDB;
        if (i.isBeingOpened || l.idbdb) return i.dbReadyPromise.then(function() {
          return i.dbOpenError ? ut(i.dbOpenError) : l;
        });
        i.isBeingOpened = !0, i.dbOpenError = null, i.openComplete = !1;
        var m = i.openCanceller, y = Math.round(10 * l.verno), g = !1;
        function b() {
          if (i.openCanceller !== m) throw new me.DatabaseClosed("db.open() was cancelled");
        }
        function _() {
          return new he(function(L, N) {
            if (b(), !f) throw new me.MissingAPI();
            var O = l.name, z = i.autoSchema || !y ? f.open(O) : f.open(O, y);
            if (!z) throw new me.MissingAPI();
            z.onerror = Cn(N), z.onblocked = dt(l._fireOnBlocked), z.onupgradeneeded = dt(function(q) {
              var K;
              B = z.transaction, i.autoSchema && !l._options.allowEmptyDB ? (z.onerror = Ca, B.abort(), z.result.close(), (K = f.deleteDatabase(O)).onsuccess = K.onerror = dt(function() {
                N(new me.NoSuchDatabase("Database ".concat(O, " doesnt exist")));
              })) : (B.onerror = Cn(N), q = q.oldVersion > Math.pow(2, 62) ? 0 : q.oldVersion, w = q < 1, l.idbdb = z.result, g && kr(l, B), Il(l, q / 10, B, N));
            }, N), z.onsuccess = dt(function() {
              B = null;
              var q, K, V, J, I, ie = l.idbdb = z.result, ce = Me(ie.objectStoreNames);
              if (0 < ce.length) try {
                var ne = ie.transaction((J = ce).length === 1 ? J[0] : J, "readonly");
                if (i.autoSchema) K = ie, V = ne, (q = l).verno = K.version / 10, V = q._dbSchema = rl(0, K, V), q._storeNames = Me(K.objectStoreNames, 0), Ar(q, [q._allTables], M(V), V);
                else if (Mr(l, l._dbSchema, ne), ((I = Or(rl(0, (I = l).idbdb, ne), I._dbSchema)).add.length || I.change.some(function(ue) {
                  return ue.add.length || ue.change.length;
                })) && !g) return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), ie.close(), y = ie.version + 1, g = !0, L(_());
                oa(l, ne);
              } catch {
              }
              _a.push(l), ie.onversionchange = dt(function(ue) {
                i.vcFired = !0, l.on("versionchange").fire(ue);
              }), ie.onclose = dt(function() {
                l.close({ disableAutoOpen: !1 });
              }), w && (I = l._deps, ne = O, ie = I.indexedDB, I = I.IDBKeyRange, Dr(ie) || ne === Ql || Oi(ie, I).put({ name: ne }).catch(et)), L();
            }, N);
          }).catch(function(L) {
            switch (L == null ? void 0 : L.name) {
              case "UnknownError":
                if (0 < i.PR1398_maxLoop) return i.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), _();
                break;
              case "VersionError":
                if (0 < y) return y = 0, _();
            }
            return he.reject(L);
          });
        }
        var E, C = i.dbReadyResolve, B = null, w = !1;
        return he.race([m, (typeof navigator > "u" ? he.resolve() : !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(L) {
          function N() {
            return indexedDB.databases().finally(L);
          }
          E = setInterval(N, 100), N();
        }).finally(function() {
          return clearInterval(E);
        }) : Promise.resolve()).then(_)]).then(function() {
          return b(), i.onReadyBeingFired = [], he.resolve(zi(function() {
            return l.on.ready.fire(l.vip);
          })).then(function L() {
            if (0 < i.onReadyBeingFired.length) {
              var N = i.onReadyBeingFired.reduce(Dl, et);
              return i.onReadyBeingFired = [], he.resolve(zi(function() {
                return N(l.vip);
              })).then(L);
            }
          });
        }).finally(function() {
          i.openCanceller === m && (i.onReadyBeingFired = null, i.isBeingOpened = !1);
        }).catch(function(L) {
          i.dbOpenError = L;
          try {
            B && B.abort();
          } catch {
          }
          return m === i.openCanceller && l._close(), ut(L);
        }).finally(function() {
          i.openComplete = !0, C();
        }).then(function() {
          var L;
          return w && (L = {}, l.tables.forEach(function(N) {
            N.schema.indexes.forEach(function(O) {
              O.name && (L["idb://".concat(l.name, "/").concat(N.name, "/").concat(O.name)] = new Kt(-1 / 0, [[[]]]));
            }), L["idb://".concat(l.name, "/").concat(N.name, "/")] = L["idb://".concat(l.name, "/").concat(N.name, "/:dels")] = new Kt(-1 / 0, [[[]]]);
          }), Ht(tl).fire(L), qi(L, !0)), l;
        });
      }
      function er(l) {
        function i(g) {
          return l.next(g);
        }
        var f = y(i), m = y(function(g) {
          return l.throw(g);
        });
        function y(g) {
          return function(E) {
            var _ = g(E), E = _.value;
            return _.done ? E : E && typeof E.then == "function" ? E.then(f, m) : R(E) ? Promise.all(E).then(f, m) : f(E);
          };
        }
        return y(i)();
      }
      function sa(l, i, f) {
        for (var m = R(l) ? l.slice() : [l], y = 0; y < f; ++y) m.push(i);
        return m;
      }
      var Ss = { stack: "dbcore", name: "VirtualIndexMiddleware", level: 1, create: function(l) {
        return h(h({}, l), { table: function(i) {
          var f = l.table(i), m = f.schema, y = {}, g = [];
          function b(w, L, N) {
            var O = Ot(w), z = y[O] = y[O] || [], q = w == null ? 0 : typeof w == "string" ? 1 : w.length, K = 0 < L, K = h(h({}, N), { name: K ? "".concat(O, "(virtual-from:").concat(N.name, ")") : N.name, lowLevelIndex: N, isVirtual: K, keyTail: L, keyLength: q, extractKey: ll(w), unique: !K && N.unique });
            return z.push(K), K.isPrimaryKey || g.push(K), 1 < q && b(q === 2 ? w[0] : w.slice(0, q - 1), L + 1, N), z.sort(function(V, J) {
              return V.keyTail - J.keyTail;
            }), K;
          }
          i = b(m.primaryKey.keyPath, 0, m.primaryKey), y[":id"] = [i];
          for (var _ = 0, E = m.indexes; _ < E.length; _++) {
            var C = E[_];
            b(C.keyPath, 0, C);
          }
          function B(w) {
            var L, N = w.query.index;
            return N.isVirtual ? h(h({}, w), { query: { index: N.lowLevelIndex, range: (L = w.query.range, N = N.keyTail, { type: L.type === 1 ? 2 : L.type, lower: sa(L.lower, L.lowerOpen ? l.MAX_KEY : l.MIN_KEY, N), lowerOpen: !0, upper: sa(L.upper, L.upperOpen ? l.MIN_KEY : l.MAX_KEY, N), upperOpen: !0 }) } }) : w;
          }
          return h(h({}, f), { schema: h(h({}, m), { primaryKey: i, indexes: g, getIndexByKeyPath: function(w) {
            return (w = y[Ot(w)]) && w[0];
          } }), count: function(w) {
            return f.count(B(w));
          }, query: function(w) {
            return f.query(B(w));
          }, openCursor: function(w) {
            var L = w.query.index, N = L.keyTail, O = L.isVirtual, z = L.keyLength;
            return O ? f.openCursor(B(w)).then(function(K) {
              return K && q(K);
            }) : f.openCursor(w);
            function q(K) {
              return Object.create(K, { continue: { value: function(V) {
                V != null ? K.continue(sa(V, w.reverse ? l.MAX_KEY : l.MIN_KEY, N)) : w.unique ? K.continue(K.key.slice(0, z).concat(w.reverse ? l.MIN_KEY : l.MAX_KEY, N)) : K.continue();
              } }, continuePrimaryKey: { value: function(V, J) {
                K.continuePrimaryKey(sa(V, l.MAX_KEY, N), J);
              } }, primaryKey: { get: function() {
                return K.primaryKey;
              } }, key: { get: function() {
                var V = K.key;
                return z === 1 ? V[0] : V.slice(0, z);
              } }, value: { get: function() {
                return K.value;
              } } });
            }
          } });
        } });
      } };
      function qr(l, i, f, m) {
        return f = f || {}, m = m || "", M(l).forEach(function(y) {
          var g, b, _;
          Q(i, y) ? (g = l[y], b = i[y], typeof g == "object" && typeof b == "object" && g && b ? (_ = ve(g)) !== ve(b) ? f[m + y] = i[y] : _ === "Object" ? qr(g, b, f, m + y + ".") : g !== b && (f[m + y] = i[y]) : g !== b && (f[m + y] = i[y])) : f[m + y] = void 0;
        }), M(i).forEach(function(y) {
          Q(l, y) || (f[m + y] = i[y]);
        }), f;
      }
      function Lr(l, i) {
        return i.type === "delete" ? i.keys : i.keys || i.values.map(l.extractKey);
      }
      var Gu = { stack: "dbcore", name: "HooksMiddleware", level: 2, create: function(l) {
        return h(h({}, l), { table: function(i) {
          var f = l.table(i), m = f.schema.primaryKey;
          return h(h({}, f), { mutate: function(y) {
            var g = ye.trans, b = g.table(i).hook, _ = b.deleting, E = b.creating, C = b.updating;
            switch (y.type) {
              case "add":
                if (E.fire === et) break;
                return g._promise("readwrite", function() {
                  return B(y);
                }, !0);
              case "put":
                if (E.fire === et && C.fire === et) break;
                return g._promise("readwrite", function() {
                  return B(y);
                }, !0);
              case "delete":
                if (_.fire === et) break;
                return g._promise("readwrite", function() {
                  return B(y);
                }, !0);
              case "deleteRange":
                if (_.fire === et) break;
                return g._promise("readwrite", function() {
                  return (function w(L, N, O) {
                    return f.query({ trans: L, values: !1, query: { index: m, range: N }, limit: O }).then(function(z) {
                      var q = z.result;
                      return B({ type: "delete", keys: q, trans: L }).then(function(K) {
                        return 0 < K.numFailures ? Promise.reject(K.failures[0]) : q.length < O ? { failures: [], numFailures: 0, lastResult: void 0 } : w(L, h(h({}, N), { lower: q[q.length - 1], lowerOpen: !0 }), O);
                      });
                    });
                  })(y.trans, y.range, 1e4);
                }, !0);
            }
            return f.mutate(y);
            function B(w) {
              var L, N, O, z = ye.trans, q = w.keys || Lr(m, w);
              if (!q) throw new Error("Keys missing");
              return (w = w.type === "add" || w.type === "put" ? h(h({}, w), { keys: q }) : h({}, w)).type !== "delete" && (w.values = x([], w.values)), w.keys && (w.keys = x([], w.keys)), L = f, O = q, ((N = w).type === "add" ? Promise.resolve([]) : L.getMany({ trans: N.trans, keys: O, cache: "immutable" })).then(function(K) {
                var V = q.map(function(J, I) {
                  var ie, ce, ne, ue = K[I], se = { onerror: null, onsuccess: null };
                  return w.type === "delete" ? _.fire.call(se, J, ue, z) : w.type === "add" || ue === void 0 ? (ie = E.fire.call(se, J, w.values[I], z), J == null && ie != null && (w.keys[I] = J = ie, m.outbound || Se(w.values[I], m.keyPath, J))) : (ie = qr(ue, w.values[I]), (ce = C.fire.call(se, ie, J, ue, z)) && (ne = w.values[I], Object.keys(ce).forEach(function(ae) {
                    Q(ne, ae) ? ne[ae] = ce[ae] : Se(ne, ae, ce[ae]);
                  }))), se;
                });
                return f.mutate(w).then(function(J) {
                  for (var I = J.failures, ie = J.results, ce = J.numFailures, J = J.lastResult, ne = 0; ne < q.length; ++ne) {
                    var ue = (ie || q)[ne], se = V[ne];
                    ue == null ? se.onerror && se.onerror(I[ne]) : se.onsuccess && se.onsuccess(w.type === "put" && K[ne] ? w.values[ne] : ue);
                  }
                  return { failures: I, results: ie, numFailures: ce, lastResult: J };
                }).catch(function(J) {
                  return V.forEach(function(I) {
                    return I.onerror && I.onerror(J);
                  }), Promise.reject(J);
                });
              });
            }
          } });
        } });
      } };
      function Li(l, i, f) {
        try {
          if (!i || i.keys.length < l.length) return null;
          for (var m = [], y = 0, g = 0; y < i.keys.length && g < l.length; ++y) Qe(i.keys[y], l[g]) === 0 && (m.push(f ? Vt(i.values[y]) : i.values[y]), ++g);
          return m.length === l.length ? m : null;
        } catch {
          return null;
        }
      }
      var Qu = { stack: "dbcore", level: -1, create: function(l) {
        return { table: function(i) {
          var f = l.table(i);
          return h(h({}, f), { getMany: function(m) {
            if (!m.cache) return f.getMany(m);
            var y = Li(m.keys, m.trans._cache, m.cache === "clone");
            return y ? he.resolve(y) : f.getMany(m).then(function(g) {
              return m.trans._cache = { keys: m.keys, values: m.cache === "clone" ? Vt(g) : g }, g;
            });
          }, mutate: function(m) {
            return m.type !== "add" && (m.trans._cache = null), f.mutate(m);
          } });
        } };
      } };
      function Oa(l, i) {
        return l.trans.mode === "readonly" && !!l.subscr && !l.trans.explicit && l.trans.db._options.cache !== "disabled" && !i.schema.primaryKey.outbound;
      }
      function Vu(l, i) {
        switch (l) {
          case "query":
            return i.values && !i.unique;
          case "get":
          case "getMany":
          case "count":
          case "openCursor":
            return !1;
        }
      }
      var _s = { stack: "dbcore", level: 0, name: "Observability", create: function(l) {
        var i = l.schema.name, f = new Kt(l.MIN_KEY, l.MAX_KEY);
        return h(h({}, l), { transaction: function(m, y, g) {
          if (ye.subscr && y !== "readonly") throw new me.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(ye.querier));
          return l.transaction(m, y, g);
        }, table: function(m) {
          var y = l.table(m), g = y.schema, b = g.primaryKey, w = g.indexes, _ = b.extractKey, E = b.outbound, C = b.autoIncrement && w.filter(function(N) {
            return N.compound && N.keyPath.includes(b.keyPath);
          }), B = h(h({}, y), { mutate: function(N) {
            function O(ae) {
              return ae = "idb://".concat(i, "/").concat(m, "/").concat(ae), J[ae] || (J[ae] = new Kt());
            }
            var z, q, K, V = N.trans, J = N.mutatedParts || (N.mutatedParts = {}), I = O(""), ie = O(":dels"), ce = N.type, se = N.type === "deleteRange" ? [N.range] : N.type === "delete" ? [N.keys] : N.values.length < 50 ? [Lr(b, N).filter(function(ae) {
              return ae;
            }), N.values] : [], ne = se[0], ue = se[1], se = N.trans._cache;
            return R(ne) ? (I.addKeys(ne), (se = ce === "delete" || ne.length === ue.length ? Li(ne, se) : null) || ie.addKeys(ne), (se || ue) && (z = O, q = se, K = ue, g.indexes.forEach(function(ae) {
              var ge = z(ae.name || "");
              function Ee(He) {
                return He != null ? ae.extractKey(He) : null;
              }
              function Re(He) {
                return ae.multiEntry && R(He) ? He.forEach(function(Yt) {
                  return ge.addKey(Yt);
                }) : ge.addKey(He);
              }
              (q || K).forEach(function(He, zt) {
                var ze = q && Ee(q[zt]), zt = K && Ee(K[zt]);
                Qe(ze, zt) !== 0 && (ze != null && Re(ze), zt != null && Re(zt));
              });
            }))) : ne ? (ue = { from: (ue = ne.lower) !== null && ue !== void 0 ? ue : l.MIN_KEY, to: (ue = ne.upper) !== null && ue !== void 0 ? ue : l.MAX_KEY }, ie.add(ue), I.add(ue)) : (I.add(f), ie.add(f), g.indexes.forEach(function(ae) {
              return O(ae.name).add(f);
            })), y.mutate(N).then(function(ae) {
              return !ne || N.type !== "add" && N.type !== "put" || (I.addKeys(ae.results), C && C.forEach(function(ge) {
                for (var Ee = N.values.map(function(ze) {
                  return ge.extractKey(ze);
                }), Re = ge.keyPath.findIndex(function(ze) {
                  return ze === b.keyPath;
                }), He = 0, Yt = ae.results.length; He < Yt; ++He) Ee[He][Re] = ae.results[He];
                O(ge.name).addKeys(Ee);
              })), V.mutatedParts = Ur(V.mutatedParts || {}, J), ae;
            });
          } }), w = function(O) {
            var z = O.query, O = z.index, z = z.range;
            return [O, new Kt((O = z.lower) !== null && O !== void 0 ? O : l.MIN_KEY, (z = z.upper) !== null && z !== void 0 ? z : l.MAX_KEY)];
          }, L = { get: function(N) {
            return [b, new Kt(N.key)];
          }, getMany: function(N) {
            return [b, new Kt().addKeys(N.keys)];
          }, count: w, query: w, openCursor: w };
          return M(L).forEach(function(N) {
            B[N] = function(O) {
              var z = ye.subscr, q = !!z, K = Oa(ye, y) && Vu(N, O) ? O.obsSet = {} : z;
              if (q) {
                var V = function(ue) {
                  return ue = "idb://".concat(i, "/").concat(m, "/").concat(ue), K[ue] || (K[ue] = new Kt());
                }, J = V(""), I = V(":dels"), z = L[N](O), q = z[0], z = z[1];
                if ((N === "query" && q.isPrimaryKey && !O.values ? I : V(q.name || "")).add(z), !q.isPrimaryKey) {
                  if (N !== "count") {
                    var ie = N === "query" && E && O.values && y.query(h(h({}, O), { values: !1 }));
                    return y[N].apply(this, arguments).then(function(ue) {
                      if (N === "query") {
                        if (E && O.values) return ie.then(function(Ee) {
                          return Ee = Ee.result, J.addKeys(Ee), ue;
                        });
                        var se = O.values ? ue.result.map(_) : ue.result;
                        (O.values ? J : I).addKeys(se);
                      } else if (N === "openCursor") {
                        var ae = ue, ge = O.values;
                        return ae && Object.create(ae, { key: { get: function() {
                          return I.addKey(ae.primaryKey), ae.key;
                        } }, primaryKey: { get: function() {
                          var Ee = ae.primaryKey;
                          return I.addKey(Ee), Ee;
                        } }, value: { get: function() {
                          return ge && J.addKey(ae.primaryKey), ae.value;
                        } } });
                      }
                      return ue;
                    });
                  }
                  I.add(f);
                }
              }
              return y[N].apply(this, arguments);
            };
          }), B;
        } });
      } };
      function Xu(l, i, f) {
        if (f.numFailures === 0) return i;
        if (i.type === "deleteRange") return null;
        var m = i.keys ? i.keys.length : "values" in i && i.values ? i.values.length : 1;
        return f.numFailures === m ? null : (i = h({}, i), R(i.keys) && (i.keys = i.keys.filter(function(y, g) {
          return !(g in f.failures);
        })), "values" in i && R(i.values) && (i.values = i.values.filter(function(y, g) {
          return !(g in f.failures);
        })), i);
      }
      function Hr(l, i) {
        return f = l, ((m = i).lower === void 0 || (m.lowerOpen ? 0 < Qe(f, m.lower) : 0 <= Qe(f, m.lower))) && (l = l, (i = i).upper === void 0 || (i.upperOpen ? Qe(l, i.upper) < 0 : Qe(l, i.upper) <= 0));
        var f, m;
      }
      function Hi(l, i, L, m, y, g) {
        if (!L || L.length === 0) return l;
        var b = i.query.index, _ = b.multiEntry, E = i.query.range, C = m.schema.primaryKey.extractKey, B = b.extractKey, w = (b.lowLevelIndex || b).extractKey, L = L.reduce(function(N, O) {
          var z = N, q = [];
          if (O.type === "add" || O.type === "put") for (var K = new Kt(), V = O.values.length - 1; 0 <= V; --V) {
            var J, I = O.values[V], ie = C(I);
            K.hasKey(ie) || (J = B(I), (_ && R(J) ? J.some(function(ae) {
              return Hr(ae, E);
            }) : Hr(J, E)) && (K.addKey(ie), q.push(I)));
          }
          switch (O.type) {
            case "add":
              var ce = new Kt().addKeys(i.values ? N.map(function(ge) {
                return C(ge);
              }) : N), z = N.concat(i.values ? q.filter(function(ge) {
                return ge = C(ge), !ce.hasKey(ge) && (ce.addKey(ge), !0);
              }) : q.map(function(ge) {
                return C(ge);
              }).filter(function(ge) {
                return !ce.hasKey(ge) && (ce.addKey(ge), !0);
              }));
              break;
            case "put":
              var ne = new Kt().addKeys(O.values.map(function(ge) {
                return C(ge);
              }));
              z = N.filter(function(ge) {
                return !ne.hasKey(i.values ? C(ge) : ge);
              }).concat(i.values ? q : q.map(function(ge) {
                return C(ge);
              }));
              break;
            case "delete":
              var ue = new Kt().addKeys(O.keys);
              z = N.filter(function(ge) {
                return !ue.hasKey(i.values ? C(ge) : ge);
              });
              break;
            case "deleteRange":
              var se = O.range;
              z = N.filter(function(ge) {
                return !Hr(C(ge), se);
              });
          }
          return z;
        }, l);
        return L === l ? l : (L.sort(function(N, O) {
          return Qe(w(N), w(O)) || Qe(C(N), C(O));
        }), i.limit && i.limit < 1 / 0 && (L.length > i.limit ? L.length = i.limit : l.length === i.limit && L.length < i.limit && (y.dirty = !0)), g ? Object.freeze(L) : L);
      }
      function ul(l, i) {
        return Qe(l.lower, i.lower) === 0 && Qe(l.upper, i.upper) === 0 && !!l.lowerOpen == !!i.lowerOpen && !!l.upperOpen == !!i.upperOpen;
      }
      function tr(l, i) {
        return (function(f, m, y, g) {
          if (f === void 0) return m !== void 0 ? -1 : 0;
          if (m === void 0) return 1;
          if ((m = Qe(f, m)) === 0) {
            if (y && g) return 0;
            if (y) return 1;
            if (g) return -1;
          }
          return m;
        })(l.lower, i.lower, l.lowerOpen, i.lowerOpen) <= 0 && 0 <= (function(f, m, y, g) {
          if (f === void 0) return m !== void 0 ? 1 : 0;
          if (m === void 0) return -1;
          if ((m = Qe(f, m)) === 0) {
            if (y && g) return 0;
            if (y) return -1;
            if (g) return 1;
          }
          return m;
        })(l.upper, i.upper, l.upperOpen, i.upperOpen);
      }
      function js(l, i, f, m) {
        l.subscribers.add(f), m.addEventListener("abort", function() {
          var y, g;
          l.subscribers.delete(f), l.subscribers.size === 0 && (y = l, g = i, setTimeout(function() {
            y.subscribers.size === 0 && je(g, y);
          }, 3e3));
        });
      }
      var Kr = { stack: "dbcore", level: 0, name: "Cache", create: function(l) {
        var i = l.schema.name;
        return h(h({}, l), { transaction: function(f, m, y) {
          var g, b, _ = l.transaction(f, m, y);
          return m === "readwrite" && (b = (g = new AbortController()).signal, y = function(E) {
            return function() {
              if (g.abort(), m === "readwrite") {
                for (var C = /* @__PURE__ */ new Set(), B = 0, w = f; B < w.length; B++) {
                  var L = w[B], N = ka["idb://".concat(i, "/").concat(L)];
                  if (N) {
                    var O = l.table(L), z = N.optimisticOps.filter(function(ge) {
                      return ge.trans === _;
                    });
                    if (_._explicit && E && _.mutatedParts) for (var q = 0, K = Object.values(N.queries.query); q < K.length; q++) for (var V = 0, J = (ce = K[q]).slice(); V < J.length; V++) Ri((ne = J[V]).obsSet, _.mutatedParts) && (je(ce, ne), ne.subscribers.forEach(function(ge) {
                      return C.add(ge);
                    }));
                    else if (0 < z.length) {
                      N.optimisticOps = N.optimisticOps.filter(function(ge) {
                        return ge.trans !== _;
                      });
                      for (var I = 0, ie = Object.values(N.queries.query); I < ie.length; I++) for (var ce, ne, ue, se = 0, ae = (ce = ie[I]).slice(); se < ae.length; se++) (ne = ae[se]).res != null && _.mutatedParts && (E && !ne.dirty ? (ue = Object.isFrozen(ne.res), ue = Hi(ne.res, ne.req, z, O, ne, ue), ne.dirty ? (je(ce, ne), ne.subscribers.forEach(function(ge) {
                        return C.add(ge);
                      })) : ue !== ne.res && (ne.res = ue, ne.promise = he.resolve({ result: ue }))) : (ne.dirty && je(ce, ne), ne.subscribers.forEach(function(ge) {
                        return C.add(ge);
                      })));
                    }
                  }
                }
                C.forEach(function(ge) {
                  return ge();
                });
              }
            };
          }, _.addEventListener("abort", y(!1), { signal: b }), _.addEventListener("error", y(!1), { signal: b }), _.addEventListener("complete", y(!0), { signal: b })), _;
        }, table: function(f) {
          var m = l.table(f), y = m.schema.primaryKey;
          return h(h({}, m), { mutate: function(g) {
            var b = ye.trans;
            if (y.outbound || b.db._options.cache === "disabled" || b.explicit || b.idbtrans.mode !== "readwrite") return m.mutate(g);
            var _ = ka["idb://".concat(i, "/").concat(f)];
            return _ ? (b = m.mutate(g), g.type !== "add" && g.type !== "put" || !(50 <= g.values.length || Lr(y, g).some(function(E) {
              return E == null;
            })) ? (_.optimisticOps.push(g), g.mutatedParts && Br(g.mutatedParts), b.then(function(E) {
              0 < E.numFailures && (je(_.optimisticOps, g), (E = Xu(0, g, E)) && _.optimisticOps.push(E), g.mutatedParts && Br(g.mutatedParts));
            }), b.catch(function() {
              je(_.optimisticOps, g), g.mutatedParts && Br(g.mutatedParts);
            })) : b.then(function(E) {
              var C = Xu(0, h(h({}, g), { values: g.values.map(function(B, w) {
                var L;
                return E.failures[w] ? B : (B = (L = y.keyPath) !== null && L !== void 0 && L.includes(".") ? Vt(B) : h({}, B), Se(B, y.keyPath, E.results[w]), B);
              }) }), E);
              _.optimisticOps.push(C), queueMicrotask(function() {
                return g.mutatedParts && Br(g.mutatedParts);
              });
            }), b) : m.mutate(g);
          }, query: function(g) {
            if (!Oa(ye, m) || !Vu("query", g)) return m.query(g);
            var b = ((C = ye.trans) === null || C === void 0 ? void 0 : C.db._options.cache) === "immutable", w = ye, _ = w.requery, E = w.signal, C = (function(O, z, q, K) {
              var V = ka["idb://".concat(O, "/").concat(z)];
              if (!V) return [];
              if (!(z = V.queries[q])) return [null, !1, V, null];
              var J = z[(K.query ? K.query.index.name : null) || ""];
              if (!J) return [null, !1, V, null];
              switch (q) {
                case "query":
                  var I = J.find(function(ie) {
                    return ie.req.limit === K.limit && ie.req.values === K.values && ul(ie.req.query.range, K.query.range);
                  });
                  return I ? [I, !0, V, J] : [J.find(function(ie) {
                    return ("limit" in ie.req ? ie.req.limit : 1 / 0) >= K.limit && (!K.values || ie.req.values) && tr(ie.req.query.range, K.query.range);
                  }), !1, V, J];
                case "count":
                  return I = J.find(function(ie) {
                    return ul(ie.req.query.range, K.query.range);
                  }), [I, !!I, V, J];
              }
            })(i, f, "query", g), B = C[0], w = C[1], L = C[2], N = C[3];
            return B && w ? B.obsSet = g.obsSet : (w = m.query(g).then(function(O) {
              var z = O.result;
              if (B && (B.res = z), b) {
                for (var q = 0, K = z.length; q < K; ++q) Object.freeze(z[q]);
                Object.freeze(z);
              } else O.result = Vt(z);
              return O;
            }).catch(function(O) {
              return N && B && je(N, B), Promise.reject(O);
            }), B = { obsSet: g.obsSet, promise: w, subscribers: /* @__PURE__ */ new Set(), type: "query", req: g, dirty: !1 }, N ? N.push(B) : (N = [B], (L = L || (ka["idb://".concat(i, "/").concat(f)] = { queries: { query: {}, count: {} }, objs: /* @__PURE__ */ new Map(), optimisticOps: [], unsignaledParts: {} })).queries.query[g.query.index.name || ""] = N)), js(B, N, _, E), B.promise.then(function(O) {
              return { result: Hi(O.result, g, L == null ? void 0 : L.optimisticOps, m, B, b) };
            });
          } });
        } });
      } };
      function nr(l, i) {
        return new Proxy(l, { get: function(f, m, y) {
          return m === "db" ? i : Reflect.get(f, m, y);
        } });
      }
      var Bn = (gt.prototype.version = function(l) {
        if (isNaN(l) || l < 0.1) throw new me.Type("Given version is not a positive number");
        if (l = Math.round(10 * l) / 10, this.idbdb || this._state.isBeingOpened) throw new me.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, l);
        var i = this._versions, f = i.filter(function(m) {
          return m._cfg.version === l;
        })[0];
        return f || (f = new this.Version(l), i.push(f), i.sort(Ai), f.stores({}), this._state.autoSchema = !1, f);
      }, gt.prototype._whenReady = function(l) {
        var i = this;
        return this.idbdb && (this._state.openComplete || ye.letThrough || this._vip) ? l() : new he(function(f, m) {
          if (i._state.openComplete) return m(new me.DatabaseClosed(i._state.dbOpenError));
          if (!i._state.isBeingOpened) {
            if (!i._state.autoOpen) return void m(new me.DatabaseClosed());
            i.open().catch(et);
          }
          i._state.dbReadyPromise.then(f, m);
        }).then(l);
      }, gt.prototype.use = function(l) {
        var i = l.stack, f = l.create, m = l.level, y = l.name;
        return y && this.unuse({ stack: i, name: y }), l = this._middlewares[i] || (this._middlewares[i] = []), l.push({ stack: i, create: f, level: m ?? 10, name: y }), l.sort(function(g, b) {
          return g.level - b.level;
        }), this;
      }, gt.prototype.unuse = function(l) {
        var i = l.stack, f = l.name, m = l.create;
        return i && this._middlewares[i] && (this._middlewares[i] = this._middlewares[i].filter(function(y) {
          return m ? y.create !== m : !!f && y.name !== f;
        })), this;
      }, gt.prototype.open = function() {
        var l = this;
        return wn(Jt, function() {
          return xs(l);
        });
      }, gt.prototype._close = function() {
        this.on.close.fire(new CustomEvent("close"));
        var l = this._state, i = _a.indexOf(this);
        if (0 <= i && _a.splice(i, 1), this.idbdb) {
          try {
            this.idbdb.close();
          } catch {
          }
          this.idbdb = null;
        }
        l.isBeingOpened || (l.dbReadyPromise = new he(function(f) {
          l.dbReadyResolve = f;
        }), l.openCanceller = new he(function(f, m) {
          l.cancelOpen = m;
        }));
      }, gt.prototype.close = function(f) {
        var i = (f === void 0 ? { disableAutoOpen: !0 } : f).disableAutoOpen, f = this._state;
        i ? (f.isBeingOpened && f.cancelOpen(new me.DatabaseClosed()), this._close(), f.autoOpen = !1, f.dbOpenError = new me.DatabaseClosed()) : (this._close(), f.autoOpen = this._options.autoOpen || f.isBeingOpened, f.openComplete = !1, f.dbOpenError = null);
      }, gt.prototype.delete = function(l) {
        var i = this;
        l === void 0 && (l = { disableAutoOpen: !0 });
        var f = 0 < arguments.length && typeof arguments[0] != "object", m = this._state;
        return new he(function(y, g) {
          function b() {
            i.close(l);
            var _ = i._deps.indexedDB.deleteDatabase(i.name);
            _.onsuccess = dt(function() {
              var E, C, B;
              E = i._deps, C = i.name, B = E.indexedDB, E = E.IDBKeyRange, Dr(B) || C === Ql || Oi(B, E).delete(C).catch(et), y();
            }), _.onerror = Cn(g), _.onblocked = i._fireOnBlocked;
          }
          if (f) throw new me.InvalidArgument("Invalid closeOptions argument to db.delete()");
          m.isBeingOpened ? m.dbReadyPromise.then(b) : b();
        });
      }, gt.prototype.backendDB = function() {
        return this.idbdb;
      }, gt.prototype.isOpen = function() {
        return this.idbdb !== null;
      }, gt.prototype.hasBeenClosed = function() {
        var l = this._state.dbOpenError;
        return l && l.name === "DatabaseClosed";
      }, gt.prototype.hasFailed = function() {
        return this._state.dbOpenError !== null;
      }, gt.prototype.dynamicallyOpened = function() {
        return this._state.autoSchema;
      }, Object.defineProperty(gt.prototype, "tables", { get: function() {
        var l = this;
        return M(this._allTables).map(function(i) {
          return l._allTables[i];
        });
      }, enumerable: !1, configurable: !0 }), gt.prototype.transaction = function() {
        var l = (function(i, f, m) {
          var y = arguments.length;
          if (y < 2) throw new me.InvalidArgument("Too few arguments");
          for (var g = new Array(y - 1); --y; ) g[y - 1] = arguments[y];
          return m = g.pop(), [i, _n(g), m];
        }).apply(this, arguments);
        return this._transaction.apply(this, l);
      }, gt.prototype._transaction = function(l, i, f) {
        var m = this, y = ye.trans;
        y && y.db === this && l.indexOf("!") === -1 || (y = null);
        var g, b, _ = l.indexOf("?") !== -1;
        l = l.replace("!", "").replace("?", "");
        try {
          if (b = i.map(function(C) {
            if (C = C instanceof m.Table ? C.name : C, typeof C != "string") throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
            return C;
          }), l == "r" || l === Jn) g = Jn;
          else {
            if (l != "rw" && l != ia) throw new me.InvalidArgument("Invalid transaction mode: " + l);
            g = ia;
          }
          if (y) {
            if (y.mode === Jn && g === ia) {
              if (!_) throw new me.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
              y = null;
            }
            y && b.forEach(function(C) {
              if (y && y.storeNames.indexOf(C) === -1) {
                if (!_) throw new me.SubTransaction("Table " + C + " not included in parent transaction.");
                y = null;
              }
            }), _ && y && !y.active && (y = null);
          }
        } catch (C) {
          return y ? y._promise(null, function(B, w) {
            w(C);
          }) : ut(C);
        }
        var E = (function C(B, w, L, N, O) {
          return he.resolve().then(function() {
            var z = ye.transless || ye, q = B._createTransaction(w, L, B._dbSchema, N);
            if (q.explicit = !0, z = { trans: q, transless: z }, N) q.idbtrans = N.idbtrans;
            else try {
              q.create(), q.idbtrans._explicit = !0, B._state.PR1398_maxLoop = 3;
            } catch (J) {
              return J.name === We.InvalidState && B.isOpen() && 0 < --B._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), B.close({ disableAutoOpen: !1 }), B.open().then(function() {
                return C(B, w, L, null, O);
              })) : ut(J);
            }
            var K, V = A(O);
            return V && Ct(), z = he.follow(function() {
              var J;
              (K = O.call(q, q)) && (V ? (J = on.bind(null, null), K.then(J, J)) : typeof K.next == "function" && typeof K.throw == "function" && (K = er(K)));
            }, z), (K && typeof K.then == "function" ? he.resolve(K).then(function(J) {
              return q.active ? J : ut(new me.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
            }) : z.then(function() {
              return K;
            })).then(function(J) {
              return N && q._resolve(), q._completion.then(function() {
                return J;
              });
            }).catch(function(J) {
              return q._reject(J), ut(J);
            });
          });
        }).bind(null, this, g, b, y, f);
        return y ? y._promise(g, E, "lock") : ye.trans ? wn(ye.transless, function() {
          return m._whenReady(E);
        }) : this._whenReady(E);
      }, gt.prototype.table = function(l) {
        if (!Q(this._allTables, l)) throw new me.InvalidTable("Table ".concat(l, " does not exist"));
        return this._allTables[l];
      }, gt);
      function gt(l, i) {
        var f = this;
        this._middlewares = {}, this.verno = 0;
        var m = gt.dependencies;
        this._options = i = h({ addons: gt.addons, autoOpen: !0, indexedDB: m.indexedDB, IDBKeyRange: m.IDBKeyRange, cache: "cloned" }, i), this._deps = { indexedDB: i.indexedDB, IDBKeyRange: i.IDBKeyRange }, m = i.addons, this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
        var y, g, b, _, E, C = { dbOpenError: null, isBeingOpened: !1, onReadyBeingFired: null, openComplete: !1, dbReadyResolve: et, dbReadyPromise: null, cancelOpen: et, openCanceller: null, autoSchema: !0, PR1398_maxLoop: 3, autoOpen: i.autoOpen };
        C.dbReadyPromise = new he(function(w) {
          C.dbReadyResolve = w;
        }), C.openCanceller = new he(function(w, L) {
          C.cancelOpen = L;
        }), this._state = C, this.name = l, this.on = Zl(this, "populate", "blocked", "versionchange", "close", { ready: [Dl, et] }), this.once = function(w, L) {
          var N = function() {
            for (var O = [], z = 0; z < arguments.length; z++) O[z] = arguments[z];
            f.on(w).unsubscribe(N), L.apply(f, O);
          };
          return f.on(w, N);
        }, this.on.ready.subscribe = fe(this.on.ready.subscribe, function(w) {
          return function(L, N) {
            gt.vip(function() {
              var O, z = f._state;
              z.openComplete ? (z.dbOpenError || he.resolve().then(L), N && w(L)) : z.onReadyBeingFired ? (z.onReadyBeingFired.push(L), N && w(L)) : (w(L), O = f, N || w(function q() {
                O.on.ready.unsubscribe(L), O.on.ready.unsubscribe(q);
              }));
            });
          };
        }), this.Collection = (y = this, Lt(gs.prototype, function(K, q) {
          this.db = y;
          var N = ji, O = null;
          if (q) try {
            N = q();
          } catch (V) {
            O = V;
          }
          var z = K._ctx, q = z.table, K = q.hook.reading.fire;
          this._ctx = { table: q, index: z.index, isPrimKey: !z.index || q.schema.primKey.keyPath && z.index === q.schema.primKey.name, range: N, keysOnly: !1, dir: "next", unique: "", algorithm: null, filter: null, replayFilter: null, justLimit: !0, isMatch: null, offset: 0, limit: 1 / 0, error: O, or: z.or, valueMapper: K !== Fa ? K : null };
        })), this.Table = (g = this, Lt(wi.prototype, function(w, L, N) {
          this.db = g, this._tx = N, this.name = w, this.schema = L, this.hook = g._allTables[w] ? g._allTables[w].hook : Zl(null, { creating: [vi, et], reading: [va, Fa], updating: [zu, et], deleting: [ms, et] });
        })), this.Transaction = (b = this, Lt(Ti.prototype, function(w, L, N, O, z) {
          var q = this;
          w !== "readonly" && L.forEach(function(K) {
            K = (K = N[K]) === null || K === void 0 ? void 0 : K.yProps, K && (L = L.concat(K.map(function(V) {
              return V.updatesTable;
            })));
          }), this.db = b, this.mode = w, this.storeNames = L, this.schema = N, this.chromeTransactionDurability = O, this.idbtrans = null, this.on = Zl(this, "complete", "error", "abort"), this.parent = z || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new he(function(K, V) {
            q._resolve = K, q._reject = V;
          }), this._completion.then(function() {
            q.active = !1, q.on.complete.fire();
          }, function(K) {
            var V = q.active;
            return q.active = !1, q.on.error.fire(K), q.parent ? q.parent._reject(K) : V && q.idbtrans && q.idbtrans.abort(), ut(K);
          });
        })), this.Version = (_ = this, Lt(bs.prototype, function(w) {
          this.db = _, this._cfg = { version: w, storesSource: null, dbschema: {}, tables: {}, contentUpgrade: null };
        })), this.WhereClause = (E = this, Lt(Ea.prototype, function(w, L, N) {
          if (this.db = E, this._ctx = { table: w, index: L === ":id" ? null : L, or: N }, this._cmp = this._ascending = Qe, this._descending = function(O, z) {
            return Qe(z, O);
          }, this._max = function(O, z) {
            return 0 < Qe(O, z) ? O : z;
          }, this._min = function(O, z) {
            return Qe(O, z) < 0 ? O : z;
          }, this._IDBKeyRange = E._deps.IDBKeyRange, !this._IDBKeyRange) throw new me.MissingAPI();
        })), this.on("versionchange", function(w) {
          0 < w.newVersion ? console.warn("Another connection wants to upgrade database '".concat(f.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(f.name, "'. Closing db now to resume the delete request.")), f.close({ disableAutoOpen: !1 });
        }), this.on("blocked", function(w) {
          !w.newVersion || w.newVersion < w.oldVersion ? console.warn("Dexie.delete('".concat(f.name, "') was blocked")) : console.warn("Upgrade '".concat(f.name, "' blocked by other connection holding version ").concat(w.oldVersion / 10));
        }), this._maxKey = al(i.IDBKeyRange), this._createTransaction = function(w, L, N, O) {
          return new f.Transaction(w, L, N, f._options.chromeTransactionDurability, O);
        }, this._fireOnBlocked = function(w) {
          f.on("blocked").fire(w), _a.filter(function(L) {
            return L.name === f.name && L !== f && !L._state.vcFired;
          }).map(function(L) {
            return L.on("versionchange").fire(w);
          });
        }, this.use(Qu), this.use(Kr), this.use(_s), this.use(Ss), this.use(Gu);
        var B = new Proxy(this, { get: function(w, L, N) {
          if (L === "_vip") return !0;
          if (L === "table") return function(z) {
            return nr(f.table(z), B);
          };
          var O = Reflect.get(w, L, N);
          return O instanceof wi ? nr(O, B) : L === "tables" ? O.map(function(z) {
            return nr(z, B);
          }) : L === "_createTransaction" ? function() {
            return nr(O.apply(this, arguments), B);
          } : O;
        } });
        this.vip = B, m.forEach(function(w) {
          return w(f);
        });
      }
      var ol, cn = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable", Zu = (Yr.prototype.subscribe = function(l, i, f) {
        return this._subscribe(l && typeof l != "function" ? l : { next: l, error: i, complete: f });
      }, Yr.prototype[cn] = function() {
        return this;
      }, Yr);
      function Yr(l) {
        this._subscribe = l;
      }
      try {
        ol = { indexedDB: S.indexedDB || S.mozIndexedDB || S.webkitIndexedDB || S.msIndexedDB, IDBKeyRange: S.IDBKeyRange || S.webkitIDBKeyRange };
      } catch {
        ol = { indexedDB: null, IDBKeyRange: null };
      }
      function Ju(l) {
        var i, f = !1, m = new Zu(function(y) {
          var g = A(l), b, _ = !1, E = {}, C = {}, B = { get closed() {
            return _;
          }, unsubscribe: function() {
            _ || (_ = !0, b && b.abort(), w && Ht.storagemutated.unsubscribe(N));
          } };
          y.start && y.start(B);
          var w = !1, L = function() {
            return ra(O);
          }, N = function(z) {
            Ur(E, z), Ri(C, E) && L();
          }, O = function() {
            var z, q, K;
            !_ && ol.indexedDB && (E = {}, z = {}, b && b.abort(), b = new AbortController(), K = (function(V) {
              var J = na();
              try {
                g && Ct();
                var I = mt(l, V);
                return I = g ? I.finally(on) : I;
              } finally {
                J && Mn();
              }
            })(q = { subscr: z, signal: b.signal, requery: L, querier: l, trans: null }), Promise.resolve(K).then(function(V) {
              f = !0, i = V, _ || q.signal.aborted || (E = {}, (function(J) {
                for (var I in J) if (Q(J, I)) return;
                return 1;
              })(C = z) || w || (Ht(tl, N), w = !0), ra(function() {
                return !_ && y.next && y.next(V);
              }));
            }, function(V) {
              f = !1, ["DatabaseClosedError", "AbortError"].includes(V == null ? void 0 : V.name) || _ || ra(function() {
                _ || y.error && y.error(V);
              });
            }));
          };
          return setTimeout(L, 0), B;
        });
        return m.hasValue = function() {
          return f;
        }, m.getValue = function() {
          return i;
        }, m;
      }
      var za = Bn;
      function Ki(l) {
        var i = ca;
        try {
          ca = !0, Ht.storagemutated.fire(l), qi(l, !0);
        } finally {
          ca = i;
        }
      }
      re(za, h(h({}, ga), { delete: function(l) {
        return new za(l, { addons: [] }).delete();
      }, exists: function(l) {
        return new za(l, { addons: [] }).open().then(function(i) {
          return i.close(), !0;
        }).catch("NoSuchDatabaseError", function() {
          return !1;
        });
      }, getDatabaseNames: function(l) {
        try {
          return i = za.dependencies, f = i.indexedDB, i = i.IDBKeyRange, (Dr(f) ? Promise.resolve(f.databases()).then(function(m) {
            return m.map(function(y) {
              return y.name;
            }).filter(function(y) {
              return y !== Ql;
            });
          }) : Oi(f, i).toCollection().primaryKeys()).then(l);
        } catch {
          return ut(new me.MissingAPI());
        }
        var i, f;
      }, defineClass: function() {
        return function(l) {
          k(this, l);
        };
      }, ignoreTransaction: function(l) {
        return ye.trans ? wn(ye.transless, l) : l();
      }, vip: zi, async: function(l) {
        return function() {
          try {
            var i = er(l.apply(this, arguments));
            return i && typeof i.then == "function" ? i : he.resolve(i);
          } catch (f) {
            return ut(f);
          }
        };
      }, spawn: function(l, i, f) {
        try {
          var m = er(l.apply(f, i || []));
          return m && typeof m.then == "function" ? m : he.resolve(m);
        } catch (y) {
          return ut(y);
        }
      }, currentTransaction: { get: function() {
        return ye.trans || null;
      } }, waitFor: function(l, i) {
        return i = he.resolve(typeof l == "function" ? za.ignoreTransaction(l) : l).timeout(i || 6e4), ye.trans ? ye.trans.waitFor(i) : i;
      }, Promise: he, debug: { get: function() {
        return dn;
      }, set: function(l) {
        Mu(l);
      } }, derive: oe, extend: k, props: re, override: fe, Events: Zl, on: Ht, liveQuery: Ju, extendObservabilitySet: Ur, getByKeyPath: Be, setByKeyPath: Se, delByKeyPath: function(l, i) {
        typeof i == "string" ? Se(l, i, void 0) : "length" in i && [].map.call(i, function(f) {
          Se(l, f, void 0);
        });
      }, shallowClone: ft, deepClone: Vt, getObjectDiff: qr, cmp: Qe, asap: Ue, minKey: -1 / 0, addons: [], connections: _a, errnames: We, dependencies: ol, cache: ka, semVer: "4.2.1", version: "4.2.1".split(".").map(function(l) {
        return parseInt(l);
      }).reduce(function(l, i, f) {
        return l + i / Math.pow(10, 2 * f);
      }) })), za.maxKey = al(za.dependencies.IDBKeyRange), typeof dispatchEvent < "u" && typeof addEventListener < "u" && (Ht(tl, function(l) {
        ca || (l = new CustomEvent(Na, { detail: l }), ca = !0, dispatchEvent(l), ca = !1);
      }), addEventListener(Na, function(l) {
        l = l.detail, ca || Ki(l);
      }));
      var sl, ca = !1, ln = function() {
      };
      return typeof BroadcastChannel < "u" && ((ln = function() {
        (sl = new BroadcastChannel(Na)).onmessage = function(l) {
          return l.data && Ki(l.data);
        };
      })(), typeof sl.unref == "function" && sl.unref(), Ht(tl, function(l) {
        ca || sl.postMessage(l);
      })), typeof addEventListener < "u" && (addEventListener("pagehide", function(l) {
        if (!Bn.disableBfCache && l.persisted) {
          dn && console.debug("Dexie: handling persisted pagehide"), sl != null && sl.close();
          for (var i = 0, f = _a; i < f.length; i++) f[i].close({ disableAutoOpen: !1 });
        }
      }), addEventListener("pageshow", function(l) {
        !Bn.disableBfCache && l.persisted && (dn && console.debug("Dexie: handling persisted pageshow"), ln(), Ki({ all: new Kt(-1 / 0, [[]]) }));
      })), he.rejectionMapper = function(l, i) {
        return !l || l instanceof de || l instanceof TypeError || l instanceof SyntaxError || !l.name || !Ja[l.name] ? l : (i = new Ja[l.name](i || l.message, l), "stack" in l && Ae(i, "stack", { get: function() {
          return this.inner.stack;
        } }), i);
      }, Mu(dn), h(Bn, Object.freeze({ __proto__: null, Dexie: Bn, liveQuery: Ju, Entity: Ru, cmp: Qe, PropModification: el, replacePrefix: function(l, i) {
        return new el({ replacePrefix: [l, i] });
      }, add: function(l) {
        return new el({ add: l });
      }, remove: function(l) {
        return new el({ remove: l });
      }, default: Bn, RangeSet: Kt, mergeRanges: Aa, rangesOverlap: Hu }), { default: Bn }), Bn;
    });
  })(es)), es.exports;
}
var rb = lb();
const kf = /* @__PURE__ */ Of(rb), b0 = Symbol.for("Dexie"), is = globalThis[b0] || (globalThis[b0] = kf);
if (kf.semVer !== is.semVer)
  throw new Error(`Two different versions of Dexie loaded in the same app: ${kf.semVer} and ${is.semVer}`);
const {
  liveQuery: gb,
  mergeRanges: vb,
  rangesOverlap: bb,
  RangeSet: xb,
  cmp: Sb,
  Entity: _b,
  PropModification: jb,
  replacePrefix: wb,
  add: Eb,
  remove: Cb,
  DexieYProvider: Nb
} = is;
class $0 extends is {
  constructor() {
    super("EngramDB");
    wt(this, "entities");
    wt(this, "events");
    wt(this, "logs");
    this.version(1).stores({
      entities: "id, name, type, brainId",
      events: "id, timestamp, significance, brainId, *relatedEntities"
    }), this.version(2).stores({
      entities: "id, name, type, brainId",
      events: "id, timestamp, significance, brainId, *relatedEntities",
      logs: "id, timestamp, level, module"
    });
  }
}
const ib = new $0(), ub = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EngramDatabase: $0,
  db: ib
}, Symbol.toStringTag, { value: "Module" })), yi = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed"
};
function wu() {
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
class Au {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(s, d) {
    const h = wu();
    return h && h.on(s, d), this.listeners.has(s) || this.listeners.set(s, /* @__PURE__ */ new Set()), this.listeners.get(s).add(d), () => {
      this.off(s, d);
    };
  }
  /**
   * 一次性订阅事件（触发后自动取消）
   * @param event 事件名称
   * @param callback 回调函数
   */
  static once(s, d) {
    const h = wu();
    if (h)
      h.once(s, d);
    else {
      const x = (...S) => {
        this.off(s, x), d(...S);
      };
      this.on(s, x);
    }
  }
  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  static off(s, d) {
    var x;
    const h = wu();
    h && h.removeListener(s, d), (x = this.listeners.get(s)) == null || x.delete(d);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const s = wu();
    for (const [d, h] of this.listeners)
      for (const x of h)
        s && s.removeListener(d, x);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return wu() !== null;
  }
}
wt(Au, "listeners", /* @__PURE__ */ new Map());
const ob = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: Au,
  TavernEventType: yi
}, Symbol.toStringTag, { value: "Module" }));
function sb(o, s) {
  let d = "assistant";
  return o.is_user ? d = "user" : o.is_system && (d = "system"), {
    id: s,
    role: d,
    content: o.mes || "",
    name: o.name || "",
    isHidden: o.is_hidden ?? !1,
    raw: o
  };
}
class us {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(s = {}) {
    const d = as();
    if (!(d != null && d.chat))
      return [];
    let h = d.chat.map((x, S) => sb(x, S));
    if (s.includeHidden || (h = h.filter((x) => !x.isHidden)), s.role) {
      const x = Array.isArray(s.role) ? s.role : [s.role];
      h = h.filter((S) => x.includes(S.role));
    }
    return h;
  }
  /**
   * 获取最近 N 条消息
   * @param count 消息数量
   * @param options 查询选项
   */
  static getRecentMessages(s, d = {}) {
    return this.getAllMessages(d).slice(-s);
  }
  /**
   * 获取指定范围的消息
   * @param start 起始索引（包含）
   * @param end 结束索引（不包含）
   * @param options 查询选项
   */
  static getMessages(s, d, h = {}) {
    return this.getAllMessages(h).slice(s, d);
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
    const d = this.getAllMessages(s);
    return d.length > 0 ? d[d.length - 1] : null;
  }
  /**
   * 获取当前角色名称
   */
  static getCurrentCharacterName() {
    var d;
    const s = as();
    return !(s != null && s.characters) || s.characterId < 0 ? null : ((d = s.characters[s.characterId]) == null ? void 0 : d.name) || null;
  }
  /**
   * 格式化消息为纯文本（用于传给 LLM）
   * @param messages 消息数组
   * @param format 格式化模板
   */
  static formatMessagesAsText(s, d = "simple") {
    return d === "simple" ? s.map((h) => `${h.name}: ${h.content}`).join(`

`) : s.map((h) => `[${h.role.toUpperCase()}] ${h.name}:
${h.content}`).join(`

---

`);
  }
  /**
   * 检查 MessageService 是否可用
   */
  static isAvailable() {
    return Ig();
  }
}
const cb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: us
}, Symbol.toStringTag, { value: "Module" }));
async function x0(o) {
  try {
    const s = window.SillyTavern;
    if (s != null && s.getContext) {
      const d = s.getContext();
      if (d != null && d.getTokenCountAsync)
        return await d.getTokenCountAsync(o);
    }
    return Math.ceil(o.length / 4);
  } catch {
    return console.warn("[Engram] WorldInfoService: 无法使用酒馆 Token 计数，使用估算"), Math.ceil(o.length / 4);
  }
}
function $o() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class gi {
  /**
   * 计算文本的 Token 数量
   * @param text 文本内容
   */
  static async countTokens(s) {
    return x0(s);
  }
  /**
   * 批量计算多段文本的 Token 数量
   * @param texts 文本数组
   */
  static async countTokensBatch(s) {
    return Promise.all(s.map((d) => x0(d)));
  }
  /**
   * 获取当前聊天的绑定世界书名称
   * 如果不存在则创建
   */
  static async getChatWorldbook() {
    const s = $o();
    if (s != null && s.getOrCreateChatWorldbook)
      try {
        return await s.getOrCreateChatWorldbook("current");
      } catch (d) {
        return console.error("[Engram] WorldInfoService: 获取聊天世界书失败", d), null;
      }
    return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), null;
  }
  /**
   * 获取世界书的所有条目
   * @param worldbookName 世界书名称
   */
  static async getEntries(s) {
    const d = $o();
    if (!(d != null && d.getWorldbook))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), [];
    try {
      return (await d.getWorldbook(s)).map((x) => {
        const S = x;
        return {
          uid: S.uid || 0,
          name: S.name || "",
          content: S.content || "",
          enabled: S.enabled ?? !0,
          constant: S.constant ?? !1,
          keys: S.key || [],
          position: S.position || "before_character_definition",
          depth: S.depth || 0,
          order: S.order || 100
        };
      });
    } catch (h) {
      return console.error("[Engram] WorldInfoService: 获取世界书条目失败", h), [];
    }
  }
  /**
   * 创建新的世界书条目
   * @param worldbookName 世界书名称
   * @param params 条目参数
   */
  static async createEntry(s, d) {
    const h = $o();
    if (!(h != null && h.createWorldbookEntries))
      return console.warn("[Engram] WorldInfoService: TavernHelper 不可用"), !1;
    try {
      const x = {
        name: d.name,
        content: d.content,
        enabled: d.enabled ?? !0,
        strategy: {
          type: d.constant ? "constant" : "selective",
          keys: d.keys || [],
          keys_secondary: {
            logic: "and_any",
            keys: d.keysSecondary || []
          },
          scan_depth: "same_as_global"
        },
        position: {
          type: d.position || "before_character_definition",
          role: d.role || "system",
          depth: d.depth || 0,
          order: d.order || 100
        },
        probability: d.probability || 100
      };
      return await h.createWorldbookEntries(s, [x]), !0;
    } catch (x) {
      return console.error("[Engram] WorldInfoService: 创建世界书条目失败", x), !1;
    }
  }
  /**
   * 获取世界书的 Token 统计
   * @param worldbookName 世界书名称
   */
  static async getWorldbookTokenStats(s) {
    const d = await this.getEntries(s), h = await Promise.all(
      d.map(async (S) => ({
        name: S.name,
        tokens: await this.countTokens(S.content)
      }))
    );
    return {
      totalTokens: h.reduce((S, M) => S + M.tokens, 0),
      entryCount: d.length,
      entries: h
    };
  }
  /**
   * 检查 WorldInfoService 是否可用
   */
  static isAvailable() {
    return $o() !== null;
  }
  /**
   * 检查 Token 计数是否使用酒馆原生 API
   */
  static async isNativeTokenCountAvailable() {
    try {
      const s = window.SillyTavern;
      if (s != null && s.getContext) {
        const d = s.getContext();
        return typeof (d == null ? void 0 : d.getTokenCountAsync) == "function";
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
    var d, h;
    try {
      const S = await new Function("path", "return import(path)")("/scripts/world-info.js"), M = S == null ? void 0 : S.getWorldInfoPrompt;
      if (typeof M != "function")
        return console.warn("[Engram] WorldInfoService: getWorldInfoPrompt 不可用，回退到常驻条目"), this.getConstantWorldInfo();
      let R = s;
      if (!R || R.length === 0) {
        const Q = (h = (d = window.SillyTavern) == null ? void 0 : d.getContext) == null ? void 0 : h.call(d);
        Q != null && Q.chat && Array.isArray(Q.chat) && (R = Q.chat.map((re) => re.mes || "").reverse());
      }
      if (!R || R.length === 0)
        return console.warn("[Engram] WorldInfoService: 无聊天消息，回退到常驻条目"), this.getConstantWorldInfo();
      const D = await M(R, 8192, !0, {
        trigger: "normal"
      }), $ = [
        (D == null ? void 0 : D.worldInfoBefore) || "",
        (D == null ? void 0 : D.worldInfoAfter) || ""
      ].filter(Boolean).join(`

`).trim();
      return $ && console.debug(`[Engram] WorldInfoService: 获取到激活的世界书内容 (${$.length} 字符)`), $;
    } catch (x) {
      return console.warn("[Engram] WorldInfoService: 获取世界书失败，回退到常驻条目", x), this.getConstantWorldInfo();
    }
  }
  /**
   * 获取常驻激活的世界书条目（蓝灯）
   * 作为 getActivatedWorldInfo 的回退方案
   */
  static async getConstantWorldInfo() {
    try {
      const d = await new Function("path", "return import(path)")("/scripts/world-info.js"), h = d == null ? void 0 : d.getSortedEntries;
      if (typeof h != "function")
        return "";
      const x = await h();
      if (!x || !Array.isArray(x))
        return "";
      const S = x.filter((M) => M.constant === !0 && M.disable !== !0 && M.content);
      return S.length === 0 ? "" : (console.debug(`[Engram] WorldInfoService: 回退获取 ${S.length} 个常驻条目`), S.map((M) => M.content).join(`

`));
    } catch {
      return "";
    }
  }
}
const P0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WorldInfoService: gi
}, Symbol.toStringTag, { value: "Module" }));
async function fb() {
  const { EventBus: o } = await Promise.resolve().then(() => ob), { MessageService: s } = await Promise.resolve().then(() => cb), { WorldInfoService: d } = await Promise.resolve().then(() => P0);
  return {
    eventBus: o.isAvailable(),
    messageService: s.isAvailable(),
    worldInfoService: d.isAvailable(),
    nativeTokenCount: await d.isNativeTokenCountAvailable(),
    floorCount: s.isAvailable() ? s.getFloorCount() : null,
    characterName: s.isAvailable() ? s.getCurrentCharacterName() : null
  };
}
const db = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: Au,
  MessageService: us,
  TavernEventType: yi,
  WorldInfoService: gi,
  checkTavernIntegration: fb
}, Symbol.toStringTag, { value: "Module" })), hb = [
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
class I0 {
  constructor(s) {
    wt(this, "rules");
    this.rules = s || hb;
  }
  /**
   * 清洗 LLM 输出文本
   * @param text 原始文本
   * @returns 清洗后的文本
   */
  clean(s) {
    let d = s;
    for (const h of this.rules)
      d = d.replace(h.pattern, h.replacement);
    return d.trim();
  }
  /**
   * 格式化为世界书条目格式
   * @param summary 总结内容
   * @param metadata 元数据
   */
  formatAsWorldEntry(s, d) {
    new Date(d.timestamp).toLocaleDateString("zh-CN");
    let S = `📜 剧情摘要 [楼层${`${d.floorRange[0]}-${d.floorRange[1]}`}]
`;
    return S += s, S;
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
  truncate(s, d, h = "...") {
    return s.length <= d ? s : s.slice(0, d - h.length) + h;
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
const W0 = new I0();
function S0() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class ep {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(s) {
    const d = S0();
    if (!(d != null && d.generateRaw) && !(d != null && d.generate))
      return {
        success: !1,
        content: "",
        error: "TavernHelper 不可用"
      };
    try {
      let h;
      if (d.generateRaw)
        h = await d.generateRaw({
          ordered_prompts: [
            { role: "system", content: s.systemPrompt },
            { role: "user", content: s.userPrompt }
          ]
          // 如果指定了预设 ID，可以在这里配置
          // custom_api: request.presetId ? await this.getPresetConfig(request.presetId) : undefined,
        });
      else if (d.generate)
        h = await d.generate({
          user_input: s.userPrompt,
          system_prompt: s.systemPrompt,
          should_stream: !1,
          max_chat_history: 0
        });
      else
        throw new Error("无可用的生成 API");
      return {
        success: !0,
        content: h || ""
      };
    } catch (h) {
      const x = h instanceof Error ? h.message : String(h);
      return console.error("[Engram] LLMAdapter 调用失败:", h), {
        success: !1,
        content: "",
        error: x
      };
    }
  }
  /**
   * 检查 LLM API 是否可用
   */
  isAvailable() {
    const s = S0();
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
const tp = new ep(), np = {
  enabled: !0,
  triggerMode: "auto",
  floorInterval: 10,
  worldbookMode: "chat",
  previewEnabled: !0,
  promptTemplateId: null,
  // 使用内置默认模板
  llmPresetId: null
  // 使用默认预设
}, _0 = {
  system: `你是一个专业的剧情总结助手。你的任务是将对话内容提炼为简洁的剧情摘要。

要求：
1. 保留关键情节和转折点
2. 提取重要的角色互动和情感变化
3. 使用第三人称叙述
4. 保持简洁，避免冗余
5. 直接输出摘要内容，不要添加前缀或解释`,
  user: `{{worldbookContext}}请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请输出简洁的剧情摘要：`
}, hi = "engram";
function j0() {
  var o, s;
  try {
    return ((s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o)) || null;
  } catch {
    return null;
  }
}
function w0() {
  var o, s;
  try {
    const d = (s = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : s.call(o);
    return d != null && d.chat_metadata ? d.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function mb() {
  var o;
  try {
    (o = window.saveChatDebounced) == null || o.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class ap {
  constructor(s, d, h) {
    wt(this, "config");
    wt(this, "textProcessor");
    wt(this, "llmAdapter");
    wt(this, "currentChatId", null);
    wt(this, "isRunning", !1);
    wt(this, "isSummarizing", !1);
    wt(this, "unsubscribeMessage", null);
    wt(this, "unsubscribeChat", null);
    wt(this, "summaryHistory", []);
    this.config = { ...np, ...s }, this.textProcessor = d || W0, this.llmAdapter = h || tp;
  }
  // ==================== 元数据操作 ====================
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(s) {
    const d = w0();
    if (!d) {
      this.log("warn", "chat_metadata 不可用");
      return;
    }
    return d.extensions || (d.extensions = {}), d.extensions[hi] || (d.extensions[hi] = {}), d.extensions[hi][s];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(s, d) {
    const h = w0();
    if (!h) {
      this.log("warn", "chat_metadata 不可用，无法保存");
      return;
    }
    h.extensions || (h.extensions = {}), h.extensions[hi] || (h.extensions[hi] = {}), h.extensions[hi][s] = d, this.log("debug", `已保存到 chat_metadata: ${s} = ${d}`), mb();
  }
  /**
   * 获取上次总结的楼层（从聊天元数据）
   */
  getLastSummarizedFloor() {
    const s = this.getFromChatMetadata("lastSummarizedFloor");
    return typeof s == "number" ? s : 0;
  }
  /**
   * 设置上次总结的楼层（保存到聊天元数据）
   */
  setLastSummarizedFloor(s) {
    this.saveToChatMetadata("lastSummarizedFloor", s);
  }
  // ==================== 楼层计算 ====================
  /**
   * 获取当前真实楼层数
   */
  getCurrentFloor() {
    const s = j0();
    return s != null && s.chat ? s.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const s = j0();
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
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = Au.on(
      yi.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${yi.MESSAGE_RECEIVED}`)), this.unsubscribeChat = Au.on(
      yi.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${yi.CHAT_CHANGED}`), this.isRunning = !0;
    const s = this.getStatus();
    this.log("info", "服务已启动", s);
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
  initializeForCurrentChat() {
    const s = this.getCurrentChatId(), d = this.getCurrentFloor(), h = this.getLastSummarizedFloor();
    this.currentChatId = s, this.log("info", "初始化当前聊天状态", {
      chatId: s,
      currentFloor: d,
      lastSummarizedFloor: h,
      pendingFloors: d - h
    }), h === 0 && d > 0 && (this.log("info", "首次初始化，设置基准为当前楼层", { currentFloor: d }), this.setLastSummarizedFloor(d));
  }
  // ==================== 事件处理 ====================
  /**
   * 处理消息接收事件
   */
  async handleMessageReceived() {
    const s = this.getCurrentFloor(), d = this.getLastSummarizedFloor(), h = s - d;
    this.log("debug", "收到新消息", {
      currentFloor: s,
      lastSummarized: d,
      pendingFloors: h,
      triggerAt: this.config.floorInterval
    }), h >= this.config.floorInterval && (this.log("info", "达到触发条件，准备总结", {
      pendingFloors: h,
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
    if (this.isSummarizing)
      return this.log("warn", "正在执行总结，跳过本次触发"), null;
    if (!this.config.enabled && !s)
      return this.log("debug", "自动总结已禁用"), null;
    const d = this.getCurrentFloor(), h = this.getLastSummarizedFloor();
    this.isSummarizing = !0, this.log("info", "开始执行总结", {
      floorRange: [h + 1, d],
      manual: s
    });
    try {
      const x = us.getMessages(h, d);
      if (x.length === 0)
        return this.log("warn", "没有待总结的消息"), null;
      const S = {
        messages: x.map((Oe) => ({
          role: Oe.role,
          content: Oe.content,
          name: Oe.name
        })),
        floorRange: [h + 1, d]
      }, M = us.formatMessagesAsText(x), R = F0.process(M);
      this.log("debug", "应用正则清洗", {
        originalLength: M.length,
        cleanedLength: R.length
      });
      let k = "";
      try {
        const Oe = await gi.getActivatedWorldInfo();
        Oe && (k = `【背景设定】
` + Oe + `

`, this.log("debug", "已加载世界书内容", { length: Oe.length }));
      } catch (Oe) {
        this.log("warn", "获取世界书失败", { error: String(Oe) });
      }
      const D = gr.getEnabledPromptTemplate("text_summary"), $ = (D == null ? void 0 : D.systemPrompt) || _0.system, re = ((D == null ? void 0 : D.userPromptTemplate) || _0.user).replace("{{worldbookContext}}", k).replace("{{chatHistory}}", R).replace("{{context}}", k);
      this.log("debug", "使用提示词模板", {
        source: D ? "APIPresets" : "fallback",
        templateName: (D == null ? void 0 : D.name) || "default"
      });
      const we = pi.logSend({
        type: "summarize",
        systemPrompt: $,
        userPrompt: re,
        floorRange: S.floorRange
      }), Ae = Date.now(), oe = await this.llmAdapter.generate({
        systemPrompt: $,
        userPrompt: re
      });
      if (pi.logReceive(we, {
        response: oe.content,
        status: oe.success ? "success" : "error",
        error: oe.error,
        duration: Date.now() - Ae
      }), !oe.success)
        return this.log("error", "LLM 调用失败", { error: oe.error }), this.showNotification("error", `总结失败: ${oe.error}`), null;
      const ke = this.textProcessor.clean(oe.content), pe = await gi.countTokens(ke), Me = {
        content: ke,
        tokenCount: pe,
        sourceFloors: S.floorRange,
        timestamp: Date.now(),
        writtenToWorldbook: !1
      };
      this.config.previewEnabled && this.log("info", "预览模式：等待用户确认", { result: Me });
      const fe = await this.writeToWorldbook(Me);
      return Me.writtenToWorldbook = fe, this.setLastSummarizedFloor(d), this.summaryHistory.push(Me), this.log("success", "总结完成", {
        tokens: pe,
        floorRange: Me.sourceFloors,
        newLastSummarized: d
      }), Me;
    } catch (x) {
      const S = x instanceof Error ? x.message : String(x);
      return this.log("error", "总结执行异常", { error: S }), this.showNotification("error", `总结异常: ${S}`), null;
    } finally {
      this.isSummarizing = !1;
    }
  }
  /**
   * 写入世界书
   */
  async writeToWorldbook(s) {
    try {
      const d = await gi.getChatWorldbook();
      if (!d)
        return this.log("warn", "无法获取聊天世界书"), !1;
      const h = this.textProcessor.formatAsWorldEntry(
        s.content,
        {
          floorRange: s.sourceFloors,
          timestamp: s.timestamp
        }
      ), x = await gi.createEntry(d, {
        name: `剧情摘要_${s.sourceFloors[0]}-${s.sourceFloors[1]}`,
        content: h,
        enabled: !0,
        constant: !0
      });
      return x && this.log("success", "已写入世界书", { worldbook: d }), x;
    } catch (d) {
      return this.log("error", "写入世界书失败", { error: String(d) }), !1;
    }
  }
  // ==================== 状态查询 ====================
  /**
   * 获取当前状态
   */
  getStatus() {
    const s = this.getCurrentFloor(), d = this.getLastSummarizedFloor();
    return {
      running: this.isRunning,
      currentFloor: s,
      lastSummarizedFloor: d,
      pendingFloors: Math.max(0, s - d),
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
    this.config = { ...this.config, ...s }, this.log("info", "配置已更新", { config: this.config });
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
  resetBaseFloor() {
    const s = this.getCurrentFloor();
    this.setLastSummarizedFloor(s), this.log("info", "已重置基准楼层", { currentFloor: s });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  async log(s, d, h) {
    try {
      const { Logger: x } = await Promise.resolve().then(() => V0);
      x[s]("Summarizer", d, h);
    } catch {
      console.log(`[Summarizer] ${s}: ${d}`, h);
    }
  }
  /**
   * 显示通知
   */
  showNotification(s, d) {
    try {
      const h = window.toastr;
      h != null && h[s] && h[s](d, "Engram");
    } catch {
      console.log(`[Engram Notification] ${s}: ${d}`);
    }
  }
}
const pb = new ap(), Eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_REGEX_RULES: Tu,
  DEFAULT_SUMMARIZER_CONFIG: np,
  LLMAdapter: ep,
  RegexProcessor: Yf,
  SummarizerService: ap,
  TextProcessor: I0,
  llmAdapter: tp,
  regexProcessor: F0,
  summarizerService: pb,
  textProcessor: W0
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=index.js.map
