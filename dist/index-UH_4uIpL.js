var P2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pd(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Af = { exports: {} }, Z = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var td;
function th() {
  if (td) return Z;
  td = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), N = Symbol.for("react.consumer"), x = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), B = Symbol.for("react.activity"), $ = Symbol.iterator;
  function X(h) {
    return h === null || typeof h != "object" ? null : (h = $ && h[$] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var nt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, P = Object.assign, wt = {};
  function Yt(h, O, U) {
    this.props = h, this.context = O, this.refs = wt, this.updater = U || nt;
  }
  Yt.prototype.isReactComponent = {}, Yt.prototype.setState = function(h, O) {
    if (typeof h != "object" && typeof h != "function" && h != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, h, O, "setState");
  }, Yt.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function Nl() {
  }
  Nl.prototype = Yt.prototype;
  function Rt(h, O, U) {
    this.props = h, this.context = O, this.refs = wt, this.updater = U || nt;
  }
  var tt = Rt.prototype = new Nl();
  tt.constructor = Rt, P(tt, Yt.prototype), tt.isPureReactComponent = !0;
  var gt = Array.isArray;
  function At() {
  }
  var k = { H: null, A: null, T: null, S: null }, Ht = Object.prototype.hasOwnProperty;
  function Cl(h, O, U) {
    var H = U.ref;
    return {
      $$typeof: c,
      type: h,
      key: O,
      ref: H !== void 0 ? H : null,
      props: U
    };
  }
  function ke(h, O) {
    return Cl(h.type, O, h.props);
  }
  function xl(h) {
    return typeof h == "object" && h !== null && h.$$typeof === c;
  }
  function $t(h) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(U) {
      return O[U];
    });
  }
  var Ne = /\/+/g;
  function Bl(h, O) {
    return typeof h == "object" && h !== null && h.key != null ? $t("" + h.key) : O.toString(36);
  }
  function Tl(h) {
    switch (h.status) {
      case "fulfilled":
        return h.value;
      case "rejected":
        throw h.reason;
      default:
        switch (typeof h.status == "string" ? h.then(At, At) : (h.status = "pending", h.then(
          function(O) {
            h.status === "pending" && (h.status = "fulfilled", h.value = O);
          },
          function(O) {
            h.status === "pending" && (h.status = "rejected", h.reason = O);
          }
        )), h.status) {
          case "fulfilled":
            return h.value;
          case "rejected":
            throw h.reason;
        }
    }
    throw h;
  }
  function _(h, O, U, H, K) {
    var W = typeof h;
    (W === "undefined" || W === "boolean") && (h = null);
    var ft = !1;
    if (h === null) ft = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          ft = !0;
          break;
        case "object":
          switch (h.$$typeof) {
            case c:
            case r:
              ft = !0;
              break;
            case Y:
              return ft = h._init, _(
                ft(h._payload),
                O,
                U,
                H,
                K
              );
          }
      }
    if (ft)
      return K = K(h), ft = H === "" ? "." + Bl(h, 0) : H, gt(K) ? (U = "", ft != null && (U = ft.replace(Ne, "$&/") + "/"), _(K, O, U, "", function(Ra) {
        return Ra;
      })) : K != null && (xl(K) && (K = ke(
        K,
        U + (K.key == null || h && h.key === K.key ? "" : ("" + K.key).replace(
          Ne,
          "$&/"
        ) + "/") + ft
      )), O.push(K)), 1;
    ft = 0;
    var Jt = H === "" ? "." : H + ":";
    if (gt(h))
      for (var Mt = 0; Mt < h.length; Mt++)
        H = h[Mt], W = Jt + Bl(H, Mt), ft += _(
          H,
          O,
          U,
          W,
          K
        );
    else if (Mt = X(h), typeof Mt == "function")
      for (h = Mt.call(h), Mt = 0; !(H = h.next()).done; )
        H = H.value, W = Jt + Bl(H, Mt++), ft += _(
          H,
          O,
          U,
          W,
          K
        );
    else if (W === "object") {
      if (typeof h.then == "function")
        return _(
          Tl(h),
          O,
          U,
          H,
          K
        );
      throw O = String(h), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ft;
  }
  function D(h, O, U) {
    if (h == null) return h;
    var H = [], K = 0;
    return _(h, H, "", "", function(W) {
      return O.call(U, W, K++);
    }), H;
  }
  function L(h) {
    if (h._status === -1) {
      var O = h._result;
      O = O(), O.then(
        function(U) {
          (h._status === 0 || h._status === -1) && (h._status = 1, h._result = U);
        },
        function(U) {
          (h._status === 0 || h._status === -1) && (h._status = 2, h._result = U);
        }
      ), h._status === -1 && (h._status = 0, h._result = O);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var rt = typeof reportError == "function" ? reportError : function(h) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h),
        error: h
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", h);
      return;
    }
    console.error(h);
  }, vt = {
    map: D,
    forEach: function(h, O, U) {
      D(
        h,
        function() {
          O.apply(this, arguments);
        },
        U
      );
    },
    count: function(h) {
      var O = 0;
      return D(h, function() {
        O++;
      }), O;
    },
    toArray: function(h) {
      return D(h, function(O) {
        return O;
      }) || [];
    },
    only: function(h) {
      if (!xl(h))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return h;
    }
  };
  return Z.Activity = B, Z.Children = vt, Z.Component = Yt, Z.Fragment = o, Z.Profiler = p, Z.PureComponent = Rt, Z.StrictMode = s, Z.Suspense = C, Z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, Z.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(h) {
      return k.H.useMemoCache(h);
    }
  }, Z.cache = function(h) {
    return function() {
      return h.apply(null, arguments);
    };
  }, Z.cacheSignal = function() {
    return null;
  }, Z.cloneElement = function(h, O, U) {
    if (h == null)
      throw Error(
        "The argument must be a React element, but you passed " + h + "."
      );
    var H = P({}, h.props), K = h.key;
    if (O != null)
      for (W in O.key !== void 0 && (K = "" + O.key), O)
        !Ht.call(O, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && O.ref === void 0 || (H[W] = O[W]);
    var W = arguments.length - 2;
    if (W === 1) H.children = U;
    else if (1 < W) {
      for (var ft = Array(W), Jt = 0; Jt < W; Jt++)
        ft[Jt] = arguments[Jt + 2];
      H.children = ft;
    }
    return Cl(h.type, K, H);
  }, Z.createContext = function(h) {
    return h = {
      $$typeof: x,
      _currentValue: h,
      _currentValue2: h,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, h.Provider = h, h.Consumer = {
      $$typeof: N,
      _context: h
    }, h;
  }, Z.createElement = function(h, O, U) {
    var H, K = {}, W = null;
    if (O != null)
      for (H in O.key !== void 0 && (W = "" + O.key), O)
        Ht.call(O, H) && H !== "key" && H !== "__self" && H !== "__source" && (K[H] = O[H]);
    var ft = arguments.length - 2;
    if (ft === 1) K.children = U;
    else if (1 < ft) {
      for (var Jt = Array(ft), Mt = 0; Mt < ft; Mt++)
        Jt[Mt] = arguments[Mt + 2];
      K.children = Jt;
    }
    if (h && h.defaultProps)
      for (H in ft = h.defaultProps, ft)
        K[H] === void 0 && (K[H] = ft[H]);
    return Cl(h, W, K);
  }, Z.createRef = function() {
    return { current: null };
  }, Z.forwardRef = function(h) {
    return { $$typeof: j, render: h };
  }, Z.isValidElement = xl, Z.lazy = function(h) {
    return {
      $$typeof: Y,
      _payload: { _status: -1, _result: h },
      _init: L
    };
  }, Z.memo = function(h, O) {
    return {
      $$typeof: z,
      type: h,
      compare: O === void 0 ? null : O
    };
  }, Z.startTransition = function(h) {
    var O = k.T, U = {};
    k.T = U;
    try {
      var H = h(), K = k.S;
      K !== null && K(U, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(At, rt);
    } catch (W) {
      rt(W);
    } finally {
      O !== null && U.types !== null && (O.types = U.types), k.T = O;
    }
  }, Z.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, Z.use = function(h) {
    return k.H.use(h);
  }, Z.useActionState = function(h, O, U) {
    return k.H.useActionState(h, O, U);
  }, Z.useCallback = function(h, O) {
    return k.H.useCallback(h, O);
  }, Z.useContext = function(h) {
    return k.H.useContext(h);
  }, Z.useDebugValue = function() {
  }, Z.useDeferredValue = function(h, O) {
    return k.H.useDeferredValue(h, O);
  }, Z.useEffect = function(h, O) {
    return k.H.useEffect(h, O);
  }, Z.useEffectEvent = function(h) {
    return k.H.useEffectEvent(h);
  }, Z.useId = function() {
    return k.H.useId();
  }, Z.useImperativeHandle = function(h, O, U) {
    return k.H.useImperativeHandle(h, O, U);
  }, Z.useInsertionEffect = function(h, O) {
    return k.H.useInsertionEffect(h, O);
  }, Z.useLayoutEffect = function(h, O) {
    return k.H.useLayoutEffect(h, O);
  }, Z.useMemo = function(h, O) {
    return k.H.useMemo(h, O);
  }, Z.useOptimistic = function(h, O) {
    return k.H.useOptimistic(h, O);
  }, Z.useReducer = function(h, O, U) {
    return k.H.useReducer(h, O, U);
  }, Z.useRef = function(h) {
    return k.H.useRef(h);
  }, Z.useState = function(h) {
    return k.H.useState(h);
  }, Z.useSyncExternalStore = function(h, O, U) {
    return k.H.useSyncExternalStore(
      h,
      O,
      U
    );
  }, Z.useTransition = function() {
    return k.H.useTransition();
  }, Z.version = "19.2.3", Z;
}
var ld;
function Kf() {
  return ld || (ld = 1, Af.exports = th()), Af.exports;
}
var V = Kf();
const lh = /* @__PURE__ */ pd(V);
var Mf = { exports: {} }, Nn = {}, Of = { exports: {} }, Nf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ed;
function eh() {
  return ed || (ed = 1, (function(c) {
    function r(_, D) {
      var L = _.length;
      _.push(D);
      t: for (; 0 < L; ) {
        var rt = L - 1 >>> 1, vt = _[rt];
        if (0 < p(vt, D))
          _[rt] = D, _[L] = vt, L = rt;
        else break t;
      }
    }
    function o(_) {
      return _.length === 0 ? null : _[0];
    }
    function s(_) {
      if (_.length === 0) return null;
      var D = _[0], L = _.pop();
      if (L !== D) {
        _[0] = L;
        t: for (var rt = 0, vt = _.length, h = vt >>> 1; rt < h; ) {
          var O = 2 * (rt + 1) - 1, U = _[O], H = O + 1, K = _[H];
          if (0 > p(U, L))
            H < vt && 0 > p(K, U) ? (_[rt] = K, _[H] = L, rt = H) : (_[rt] = U, _[O] = L, rt = O);
          else if (H < vt && 0 > p(K, L))
            _[rt] = K, _[H] = L, rt = H;
          else break t;
        }
      }
      return D;
    }
    function p(_, D) {
      var L = _.sortIndex - D.sortIndex;
      return L !== 0 ? L : _.id - D.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var N = performance;
      c.unstable_now = function() {
        return N.now();
      };
    } else {
      var x = Date, j = x.now();
      c.unstable_now = function() {
        return x.now() - j;
      };
    }
    var C = [], z = [], Y = 1, B = null, $ = 3, X = !1, nt = !1, P = !1, wt = !1, Yt = typeof setTimeout == "function" ? setTimeout : null, Nl = typeof clearTimeout == "function" ? clearTimeout : null, Rt = typeof setImmediate < "u" ? setImmediate : null;
    function tt(_) {
      for (var D = o(z); D !== null; ) {
        if (D.callback === null) s(z);
        else if (D.startTime <= _)
          s(z), D.sortIndex = D.expirationTime, r(C, D);
        else break;
        D = o(z);
      }
    }
    function gt(_) {
      if (P = !1, tt(_), !nt)
        if (o(C) !== null)
          nt = !0, At || (At = !0, $t());
        else {
          var D = o(z);
          D !== null && Tl(gt, D.startTime - _);
        }
    }
    var At = !1, k = -1, Ht = 5, Cl = -1;
    function ke() {
      return wt ? !0 : !(c.unstable_now() - Cl < Ht);
    }
    function xl() {
      if (wt = !1, At) {
        var _ = c.unstable_now();
        Cl = _;
        var D = !0;
        try {
          t: {
            nt = !1, P && (P = !1, Nl(k), k = -1), X = !0;
            var L = $;
            try {
              l: {
                for (tt(_), B = o(C); B !== null && !(B.expirationTime > _ && ke()); ) {
                  var rt = B.callback;
                  if (typeof rt == "function") {
                    B.callback = null, $ = B.priorityLevel;
                    var vt = rt(
                      B.expirationTime <= _
                    );
                    if (_ = c.unstable_now(), typeof vt == "function") {
                      B.callback = vt, tt(_), D = !0;
                      break l;
                    }
                    B === o(C) && s(C), tt(_);
                  } else s(C);
                  B = o(C);
                }
                if (B !== null) D = !0;
                else {
                  var h = o(z);
                  h !== null && Tl(
                    gt,
                    h.startTime - _
                  ), D = !1;
                }
              }
              break t;
            } finally {
              B = null, $ = L, X = !1;
            }
            D = void 0;
          }
        } finally {
          D ? $t() : At = !1;
        }
      }
    }
    var $t;
    if (typeof Rt == "function")
      $t = function() {
        Rt(xl);
      };
    else if (typeof MessageChannel < "u") {
      var Ne = new MessageChannel(), Bl = Ne.port2;
      Ne.port1.onmessage = xl, $t = function() {
        Bl.postMessage(null);
      };
    } else
      $t = function() {
        Yt(xl, 0);
      };
    function Tl(_, D) {
      k = Yt(function() {
        _(c.unstable_now());
      }, D);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, c.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ht = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return $;
    }, c.unstable_next = function(_) {
      switch ($) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = $;
      }
      var L = $;
      $ = D;
      try {
        return _();
      } finally {
        $ = L;
      }
    }, c.unstable_requestPaint = function() {
      wt = !0;
    }, c.unstable_runWithPriority = function(_, D) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var L = $;
      $ = _;
      try {
        return D();
      } finally {
        $ = L;
      }
    }, c.unstable_scheduleCallback = function(_, D, L) {
      var rt = c.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? rt + L : rt) : L = rt, _) {
        case 1:
          var vt = -1;
          break;
        case 2:
          vt = 250;
          break;
        case 5:
          vt = 1073741823;
          break;
        case 4:
          vt = 1e4;
          break;
        default:
          vt = 5e3;
      }
      return vt = L + vt, _ = {
        id: Y++,
        callback: D,
        priorityLevel: _,
        startTime: L,
        expirationTime: vt,
        sortIndex: -1
      }, L > rt ? (_.sortIndex = L, r(z, _), o(C) === null && _ === o(z) && (P ? (Nl(k), k = -1) : P = !0, Tl(gt, L - rt))) : (_.sortIndex = vt, r(C, _), nt || X || (nt = !0, At || (At = !0, $t()))), _;
    }, c.unstable_shouldYield = ke, c.unstable_wrapCallback = function(_) {
      var D = $;
      return function() {
        var L = $;
        $ = D;
        try {
          return _.apply(this, arguments);
        } finally {
          $ = L;
        }
      };
    };
  })(Nf)), Nf;
}
var ad;
function ah() {
  return ad || (ad = 1, Of.exports = eh()), Of.exports;
}
var Cf = { exports: {} }, Kt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nd;
function nh() {
  if (nd) return Kt;
  nd = 1;
  var c = Kf();
  function r(C) {
    var z = "https://react.dev/errors/" + C;
    if (1 < arguments.length) {
      z += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Y = 2; Y < arguments.length; Y++)
        z += "&args[]=" + encodeURIComponent(arguments[Y]);
    }
    return "Minified React error #" + C + "; visit " + z + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var s = {
    d: {
      f: o,
      r: function() {
        throw Error(r(522));
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
  }, p = Symbol.for("react.portal");
  function N(C, z, Y) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: p,
      key: B == null ? null : "" + B,
      children: C,
      containerInfo: z,
      implementation: Y
    };
  }
  var x = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function j(C, z) {
    if (C === "font") return "";
    if (typeof z == "string")
      return z === "use-credentials" ? z : "";
  }
  return Kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Kt.createPortal = function(C, z) {
    var Y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!z || z.nodeType !== 1 && z.nodeType !== 9 && z.nodeType !== 11)
      throw Error(r(299));
    return N(C, z, null, Y);
  }, Kt.flushSync = function(C) {
    var z = x.T, Y = s.p;
    try {
      if (x.T = null, s.p = 2, C) return C();
    } finally {
      x.T = z, s.p = Y, s.d.f();
    }
  }, Kt.preconnect = function(C, z) {
    typeof C == "string" && (z ? (z = z.crossOrigin, z = typeof z == "string" ? z === "use-credentials" ? z : "" : void 0) : z = null, s.d.C(C, z));
  }, Kt.prefetchDNS = function(C) {
    typeof C == "string" && s.d.D(C);
  }, Kt.preinit = function(C, z) {
    if (typeof C == "string" && z && typeof z.as == "string") {
      var Y = z.as, B = j(Y, z.crossOrigin), $ = typeof z.integrity == "string" ? z.integrity : void 0, X = typeof z.fetchPriority == "string" ? z.fetchPriority : void 0;
      Y === "style" ? s.d.S(
        C,
        typeof z.precedence == "string" ? z.precedence : void 0,
        {
          crossOrigin: B,
          integrity: $,
          fetchPriority: X
        }
      ) : Y === "script" && s.d.X(C, {
        crossOrigin: B,
        integrity: $,
        fetchPriority: X,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0
      });
    }
  }, Kt.preinitModule = function(C, z) {
    if (typeof C == "string")
      if (typeof z == "object" && z !== null) {
        if (z.as == null || z.as === "script") {
          var Y = j(
            z.as,
            z.crossOrigin
          );
          s.d.M(C, {
            crossOrigin: Y,
            integrity: typeof z.integrity == "string" ? z.integrity : void 0,
            nonce: typeof z.nonce == "string" ? z.nonce : void 0
          });
        }
      } else z == null && s.d.M(C);
  }, Kt.preload = function(C, z) {
    if (typeof C == "string" && typeof z == "object" && z !== null && typeof z.as == "string") {
      var Y = z.as, B = j(Y, z.crossOrigin);
      s.d.L(C, Y, {
        crossOrigin: B,
        integrity: typeof z.integrity == "string" ? z.integrity : void 0,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0,
        type: typeof z.type == "string" ? z.type : void 0,
        fetchPriority: typeof z.fetchPriority == "string" ? z.fetchPriority : void 0,
        referrerPolicy: typeof z.referrerPolicy == "string" ? z.referrerPolicy : void 0,
        imageSrcSet: typeof z.imageSrcSet == "string" ? z.imageSrcSet : void 0,
        imageSizes: typeof z.imageSizes == "string" ? z.imageSizes : void 0,
        media: typeof z.media == "string" ? z.media : void 0
      });
    }
  }, Kt.preloadModule = function(C, z) {
    if (typeof C == "string")
      if (z) {
        var Y = j(z.as, z.crossOrigin);
        s.d.m(C, {
          as: typeof z.as == "string" && z.as !== "script" ? z.as : void 0,
          crossOrigin: Y,
          integrity: typeof z.integrity == "string" ? z.integrity : void 0
        });
      } else s.d.m(C);
  }, Kt.requestFormReset = function(C) {
    s.d.r(C);
  }, Kt.unstable_batchedUpdates = function(C, z) {
    return C(z);
  }, Kt.useFormState = function(C, z, Y) {
    return x.H.useFormState(C, z, Y);
  }, Kt.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, Kt.version = "19.2.3", Kt;
}
var ud;
function uh() {
  if (ud) return Cf.exports;
  ud = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), Cf.exports = nh(), Cf.exports;
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
var id;
function ih() {
  if (id) return Nn;
  id = 1;
  var c = ah(), r = Kf(), o = uh();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function N(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function x(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function j(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (N(t) !== t)
      throw Error(s(188));
  }
  function z(t) {
    var l = t.alternate;
    if (!l) {
      if (l = N(t), l === null) throw Error(s(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return C(n), t;
          if (u === a) return C(n), l;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var i = !1, f = n.child; f; ) {
          if (f === e) {
            i = !0, e = n, a = u;
            break;
          }
          if (f === a) {
            i = !0, a = n, e = u;
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = u.child; f; ) {
            if (f === e) {
              i = !0, e = u, a = n;
              break;
            }
            if (f === a) {
              i = !0, a = u, e = n;
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? t : l;
  }
  function Y(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = Y(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var B = Object.assign, $ = Symbol.for("react.element"), X = Symbol.for("react.transitional.element"), nt = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), wt = Symbol.for("react.strict_mode"), Yt = Symbol.for("react.profiler"), Nl = Symbol.for("react.consumer"), Rt = Symbol.for("react.context"), tt = Symbol.for("react.forward_ref"), gt = Symbol.for("react.suspense"), At = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), Ht = Symbol.for("react.lazy"), Cl = Symbol.for("react.activity"), ke = Symbol.for("react.memo_cache_sentinel"), xl = Symbol.iterator;
  function $t(t) {
    return t === null || typeof t != "object" ? null : (t = xl && t[xl] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Ne = Symbol.for("react.client.reference");
  function Bl(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Ne ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case P:
        return "Fragment";
      case Yt:
        return "Profiler";
      case wt:
        return "StrictMode";
      case gt:
        return "Suspense";
      case At:
        return "SuspenseList";
      case Cl:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case nt:
          return "Portal";
        case Rt:
          return t.displayName || "Context";
        case Nl:
          return (t._context.displayName || "Context") + ".Consumer";
        case tt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case k:
          return l = t.displayName || null, l !== null ? l : Bl(t.type) || "Memo";
        case Ht:
          l = t._payload, t = t._init;
          try {
            return Bl(t(l));
          } catch {
          }
      }
    return null;
  }
  var Tl = Array.isArray, _ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, rt = [], vt = -1;
  function h(t) {
    return { current: t };
  }
  function O(t) {
    0 > vt || (t.current = rt[vt], rt[vt] = null, vt--);
  }
  function U(t, l) {
    vt++, rt[vt] = t.current, t.current = l;
  }
  var H = h(null), K = h(null), W = h(null), ft = h(null);
  function Jt(t, l) {
    switch (U(W, l), U(K, t), U(H, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? T1(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = T1(l), t = _1(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    O(H), U(H, t);
  }
  function Mt() {
    O(H), O(K), O(W);
  }
  function Ra(t) {
    t.memoizedState !== null && U(ft, t);
    var l = H.current, e = _1(l, t.type);
    l !== e && (U(K, t), U(H, e));
  }
  function Un(t) {
    K.current === t && (O(H), O(K)), ft.current === t && (O(ft), _n._currentValue = L);
  }
  var ii, If;
  function Ce(t) {
    if (ii === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        ii = l && l[1] || "", If = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ii + t + If;
  }
  var ci = !1;
  function fi(t, l) {
    if (!t || ci) return "";
    ci = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (E) {
                  var S = E;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (E) {
                  S = E;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (E) {
                S = E;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (E) {
            if (E && S && typeof E.stack == "string")
              return [E.stack, S.stack];
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
      var u = a.DetermineComponentFrameRoot(), i = u[0], f = u[1];
      if (i && f) {
        var d = i.split(`
`), b = f.split(`
`);
        for (n = a = 0; a < d.length && !d[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === d.length || n === b.length)
          for (a = d.length - 1, n = b.length - 1; 1 <= a && 0 <= n && d[a] !== b[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (d[a] !== b[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || d[a] !== b[n]) {
                  var T = `
` + d[a].replace(" at new ", " at ");
                  return t.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", t.displayName)), T;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ci = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Ce(e) : "";
  }
  function jd(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ce(t.type);
      case 16:
        return Ce("Lazy");
      case 13:
        return t.child !== l && l !== null ? Ce("Suspense Fallback") : Ce("Suspense");
      case 19:
        return Ce("SuspenseList");
      case 0:
      case 15:
        return fi(t.type, !1);
      case 11:
        return fi(t.type.render, !1);
      case 1:
        return fi(t.type, !0);
      case 31:
        return Ce("Activity");
      default:
        return "";
    }
  }
  function Pf(t) {
    try {
      var l = "", e = null;
      do
        l += jd(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var si = Object.prototype.hasOwnProperty, oi = c.unstable_scheduleCallback, ri = c.unstable_cancelCallback, Dd = c.unstable_shouldYield, Ud = c.unstable_requestPaint, al = c.unstable_now, Rd = c.unstable_getCurrentPriorityLevel, ts = c.unstable_ImmediatePriority, ls = c.unstable_UserBlockingPriority, Rn = c.unstable_NormalPriority, Hd = c.unstable_LowPriority, es = c.unstable_IdlePriority, qd = c.log, Bd = c.unstable_setDisableYieldValue, Ha = null, nl = null;
  function ee(t) {
    if (typeof qd == "function" && Bd(t), nl && typeof nl.setStrictMode == "function")
      try {
        nl.setStrictMode(Ha, t);
      } catch {
      }
  }
  var ul = Math.clz32 ? Math.clz32 : Qd, Yd = Math.log, Gd = Math.LN2;
  function Qd(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Yd(t) / Gd | 0) | 0;
  }
  var Hn = 256, qn = 262144, Bn = 4194304;
  function xe(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Yn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = xe(a) : (i &= f, i !== 0 ? n = xe(i) : e || (e = f & ~t, e !== 0 && (n = xe(e))))) : (f = a & ~u, f !== 0 ? n = xe(f) : i !== 0 ? n = xe(i) : e || (e = a & ~t, e !== 0 && (n = xe(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function qa(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Ld(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
  function as() {
    var t = Bn;
    return Bn <<= 1, (Bn & 62914560) === 0 && (Bn = 4194304), t;
  }
  function di(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Ba(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Xd(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var f = t.entanglements, d = t.expirationTimes, b = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - ul(e), M = 1 << T;
      f[T] = 0, d[T] = -1;
      var S = b[T];
      if (S !== null)
        for (b[T] = null, T = 0; T < S.length; T++) {
          var E = S[T];
          E !== null && (E.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && ns(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function ns(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - ul(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function us(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - ul(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function is(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : mi(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function mi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function hi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function cs() {
    var t = D.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : J1(t.type));
  }
  function fs(t, l) {
    var e = D.p;
    try {
      return D.p = t, l();
    } finally {
      D.p = e;
    }
  }
  var ae = Math.random().toString(36).slice(2), Gt = "__reactFiber$" + ae, Wt = "__reactProps$" + ae, $e = "__reactContainer$" + ae, vi = "__reactEvents$" + ae, Zd = "__reactListeners$" + ae, Vd = "__reactHandles$" + ae, ss = "__reactResources$" + ae, Ya = "__reactMarker$" + ae;
  function yi(t) {
    delete t[Gt], delete t[Wt], delete t[vi], delete t[Zd], delete t[Vd];
  }
  function We(t) {
    var l = t[Gt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[$e] || e[Gt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = j1(t); t !== null; ) {
            if (e = t[Gt]) return e;
            t = j1(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Fe(t) {
    if (t = t[Gt] || t[$e]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Ga(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function Ie(t) {
    var l = t[ss];
    return l || (l = t[ss] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function qt(t) {
    t[Ya] = !0;
  }
  var os = /* @__PURE__ */ new Set(), rs = {};
  function je(t, l) {
    Pe(t, l), Pe(t + "Capture", l);
  }
  function Pe(t, l) {
    for (rs[t] = l, t = 0; t < l.length; t++)
      os.add(l[t]);
  }
  var Kd = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ds = {}, ms = {};
  function wd(t) {
    return si.call(ms, t) ? !0 : si.call(ds, t) ? !1 : Kd.test(t) ? ms[t] = !0 : (ds[t] = !0, !1);
  }
  function Gn(t, l, e) {
    if (wd(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function Qn(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function Yl(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function ml(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function hs(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Jd(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function gi(t) {
    if (!t._valueTracker) {
      var l = hs(t) ? "checked" : "value";
      t._valueTracker = Jd(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function vs(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = hs(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Ln(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var kd = /[\n"\\]/g;
  function hl(t) {
    return t.replace(
      kd,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function bi(t, l, e, a, n, u, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + ml(l)) : t.value !== "" + ml(l) && (t.value = "" + ml(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? Si(t, i, ml(l)) : e != null ? Si(t, i, ml(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + ml(f) : t.removeAttribute("name");
  }
  function ys(t, l, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        gi(t);
        return;
      }
      e = e != null ? "" + ml(e) : "", l = l != null ? "" + ml(l) : e, f || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), gi(t);
  }
  function Si(t, l, e) {
    l === "number" && Ln(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function ta(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + ml(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function gs(t, l, e) {
    if (l != null && (l = "" + ml(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + ml(e) : "";
  }
  function bs(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (Tl(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = ml(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), gi(t);
  }
  function la(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var $d = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ss(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || $d.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function ps(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Ss(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Ss(t, u, l[u]);
  }
  function pi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var Wd = /* @__PURE__ */ new Map([
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
  ]), Fd = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xn(t) {
    return Fd.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Gl() {
  }
  var Ei = null;
  function zi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var ea = null, aa = null;
  function Es(t) {
    var l = Fe(t);
    if (l && (t = l.stateNode)) {
      var e = t[Wt] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (bi(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + hl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[Wt] || null;
                if (!n) throw Error(s(90));
                bi(
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
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && vs(a);
          }
          break t;
        case "textarea":
          gs(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && ta(t, !!e.multiple, l, !1);
      }
    }
  }
  var Ti = !1;
  function zs(t, l, e) {
    if (Ti) return t(l, e);
    Ti = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (Ti = !1, (ea !== null || aa !== null) && (Cu(), ea && (l = ea, t = aa, aa = ea = null, Es(l), t)))
        for (l = 0; l < t.length; l++) Es(t[l]);
    }
  }
  function Qa(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[Wt] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
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
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        s(231, l, typeof e)
      );
    return e;
  }
  var Ql = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _i = !1;
  if (Ql)
    try {
      var La = {};
      Object.defineProperty(La, "passive", {
        get: function() {
          _i = !0;
        }
      }), window.addEventListener("test", La, La), window.removeEventListener("test", La, La);
    } catch {
      _i = !1;
    }
  var ne = null, Ai = null, Zn = null;
  function Ts() {
    if (Zn) return Zn;
    var t, l = Ai, e = l.length, a, n = "value" in ne ? ne.value : ne.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return Zn = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Vn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Kn() {
    return !0;
  }
  function _s() {
    return !1;
  }
  function Ft(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (e = t[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Kn : _s, this.isPropagationStopped = _s, this;
    }
    return B(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Kn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Kn);
      },
      persist: function() {
      },
      isPersistent: Kn
    }), l;
  }
  var De = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, wn = Ft(De), Xa = B({}, De, { view: 0, detail: 0 }), Id = Ft(Xa), Mi, Oi, Za, Jn = B({}, Xa, {
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
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Za && (Za && t.type === "mousemove" ? (Mi = t.screenX - Za.screenX, Oi = t.screenY - Za.screenY) : Oi = Mi = 0, Za = t), Mi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Oi;
    }
  }), As = Ft(Jn), Pd = B({}, Jn, { dataTransfer: 0 }), t0 = Ft(Pd), l0 = B({}, Xa, { relatedTarget: 0 }), Ni = Ft(l0), e0 = B({}, De, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), a0 = Ft(e0), n0 = B({}, De, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), u0 = Ft(n0), i0 = B({}, De, { data: 0 }), Ms = Ft(i0), c0 = {
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
  }, f0 = {
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
  }, s0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function o0(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = s0[t]) ? !!l[t] : !1;
  }
  function Ci() {
    return o0;
  }
  var r0 = B({}, Xa, {
    key: function(t) {
      if (t.key) {
        var l = c0[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Vn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? f0[t.keyCode] || "Unidentified" : "";
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
    charCode: function(t) {
      return t.type === "keypress" ? Vn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Vn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), d0 = Ft(r0), m0 = B({}, Jn, {
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
  }), Os = Ft(m0), h0 = B({}, Xa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ci
  }), v0 = Ft(h0), y0 = B({}, De, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), g0 = Ft(y0), b0 = B({}, Jn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), S0 = Ft(b0), p0 = B({}, De, {
    newState: 0,
    oldState: 0
  }), E0 = Ft(p0), z0 = [9, 13, 27, 32], xi = Ql && "CompositionEvent" in window, Va = null;
  Ql && "documentMode" in document && (Va = document.documentMode);
  var T0 = Ql && "TextEvent" in window && !Va, Ns = Ql && (!xi || Va && 8 < Va && 11 >= Va), Cs = " ", xs = !1;
  function js(t, l) {
    switch (t) {
      case "keyup":
        return z0.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ds(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var na = !1;
  function _0(t, l) {
    switch (t) {
      case "compositionend":
        return Ds(l);
      case "keypress":
        return l.which !== 32 ? null : (xs = !0, Cs);
      case "textInput":
        return t = l.data, t === Cs && xs ? null : t;
      default:
        return null;
    }
  }
  function A0(t, l) {
    if (na)
      return t === "compositionend" || !xi && js(t, l) ? (t = Ts(), Zn = Ai = ne = null, na = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Ns && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var M0 = {
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
  function Us(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!M0[t.type] : l === "textarea";
  }
  function Rs(t, l, e, a) {
    ea ? aa ? aa.push(a) : aa = [a] : ea = a, l = qu(l, "onChange"), 0 < l.length && (e = new wn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Ka = null, wa = null;
  function O0(t) {
    g1(t, 0);
  }
  function kn(t) {
    var l = Ga(t);
    if (vs(l)) return t;
  }
  function Hs(t, l) {
    if (t === "change") return l;
  }
  var qs = !1;
  if (Ql) {
    var ji;
    if (Ql) {
      var Di = "oninput" in document;
      if (!Di) {
        var Bs = document.createElement("div");
        Bs.setAttribute("oninput", "return;"), Di = typeof Bs.oninput == "function";
      }
      ji = Di;
    } else ji = !1;
    qs = ji && (!document.documentMode || 9 < document.documentMode);
  }
  function Ys() {
    Ka && (Ka.detachEvent("onpropertychange", Gs), wa = Ka = null);
  }
  function Gs(t) {
    if (t.propertyName === "value" && kn(wa)) {
      var l = [];
      Rs(
        l,
        wa,
        t,
        zi(t)
      ), zs(O0, l);
    }
  }
  function N0(t, l, e) {
    t === "focusin" ? (Ys(), Ka = l, wa = e, Ka.attachEvent("onpropertychange", Gs)) : t === "focusout" && Ys();
  }
  function C0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return kn(wa);
  }
  function x0(t, l) {
    if (t === "click") return kn(l);
  }
  function j0(t, l) {
    if (t === "input" || t === "change")
      return kn(l);
  }
  function D0(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var il = typeof Object.is == "function" ? Object.is : D0;
  function Ja(t, l) {
    if (il(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!si.call(l, n) || !il(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function Qs(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ls(t, l) {
    var e = Qs(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Qs(e);
    }
  }
  function Xs(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Xs(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Zs(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Ln(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Ln(t.document);
    }
    return l;
  }
  function Ui(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var U0 = Ql && "documentMode" in document && 11 >= document.documentMode, ua = null, Ri = null, ka = null, Hi = !1;
  function Vs(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Hi || ua == null || ua !== Ln(a) || (a = ua, "selectionStart" in a && Ui(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ka && Ja(ka, a) || (ka = a, a = qu(Ri, "onSelect"), 0 < a.length && (l = new wn(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ua)));
  }
  function Ue(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var ia = {
    animationend: Ue("Animation", "AnimationEnd"),
    animationiteration: Ue("Animation", "AnimationIteration"),
    animationstart: Ue("Animation", "AnimationStart"),
    transitionrun: Ue("Transition", "TransitionRun"),
    transitionstart: Ue("Transition", "TransitionStart"),
    transitioncancel: Ue("Transition", "TransitionCancel"),
    transitionend: Ue("Transition", "TransitionEnd")
  }, qi = {}, Ks = {};
  Ql && (Ks = document.createElement("div").style, "AnimationEvent" in window || (delete ia.animationend.animation, delete ia.animationiteration.animation, delete ia.animationstart.animation), "TransitionEvent" in window || delete ia.transitionend.transition);
  function Re(t) {
    if (qi[t]) return qi[t];
    if (!ia[t]) return t;
    var l = ia[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Ks)
        return qi[t] = l[e];
    return t;
  }
  var ws = Re("animationend"), Js = Re("animationiteration"), ks = Re("animationstart"), R0 = Re("transitionrun"), H0 = Re("transitionstart"), q0 = Re("transitioncancel"), $s = Re("transitionend"), Ws = /* @__PURE__ */ new Map(), Bi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Bi.push("scrollEnd");
  function _l(t, l) {
    Ws.set(t, l), je(l, [t]);
  }
  var $n = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, vl = [], ca = 0, Yi = 0;
  function Wn() {
    for (var t = ca, l = Yi = ca = 0; l < t; ) {
      var e = vl[l];
      vl[l++] = null;
      var a = vl[l];
      vl[l++] = null;
      var n = vl[l];
      vl[l++] = null;
      var u = vl[l];
      if (vl[l++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && Fs(e, n, u);
    }
  }
  function Fn(t, l, e, a) {
    vl[ca++] = t, vl[ca++] = l, vl[ca++] = e, vl[ca++] = a, Yi |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Gi(t, l, e, a) {
    return Fn(t, l, e, a), In(t);
  }
  function He(t, l) {
    return Fn(t, null, null, l), In(t);
  }
  function Fs(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - ul(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function In(t) {
    if (50 < gn)
      throw gn = 0, kc = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var fa = {};
  function B0(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function cl(t, l, e, a) {
    return new B0(t, l, e, a);
  }
  function Qi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ll(t, l) {
    var e = t.alternate;
    return e === null ? (e = cl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Is(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Pn(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") Qi(t) && (i = 1);
    else if (typeof t == "string")
      i = Xm(
        t,
        e,
        H.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Cl:
          return t = cl(31, e, l, n), t.elementType = Cl, t.lanes = u, t;
        case P:
          return qe(e.children, n, u, l);
        case wt:
          i = 8, n |= 24;
          break;
        case Yt:
          return t = cl(12, e, l, n | 2), t.elementType = Yt, t.lanes = u, t;
        case gt:
          return t = cl(13, e, l, n), t.elementType = gt, t.lanes = u, t;
        case At:
          return t = cl(19, e, l, n), t.elementType = At, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Rt:
                i = 10;
                break t;
              case Nl:
                i = 9;
                break t;
              case tt:
                i = 11;
                break t;
              case k:
                i = 14;
                break t;
              case Ht:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = cl(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function qe(t, l, e, a) {
    return t = cl(7, t, a, l), t.lanes = e, t;
  }
  function Li(t, l, e) {
    return t = cl(6, t, null, l), t.lanes = e, t;
  }
  function Ps(t) {
    var l = cl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Xi(t, l, e) {
    return l = cl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var to = /* @__PURE__ */ new WeakMap();
  function yl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = to.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Pf(l)
      }, to.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Pf(l)
    };
  }
  var sa = [], oa = 0, tu = null, $a = 0, gl = [], bl = 0, ue = null, jl = 1, Dl = "";
  function Xl(t, l) {
    sa[oa++] = $a, sa[oa++] = tu, tu = t, $a = l;
  }
  function lo(t, l, e) {
    gl[bl++] = jl, gl[bl++] = Dl, gl[bl++] = ue, ue = t;
    var a = jl;
    t = Dl;
    var n = 32 - ul(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - ul(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, jl = 1 << 32 - ul(l) + n | e << n | a, Dl = u + t;
    } else
      jl = 1 << u | e << n | a, Dl = t;
  }
  function Zi(t) {
    t.return !== null && (Xl(t, 1), lo(t, 1, 0));
  }
  function Vi(t) {
    for (; t === tu; )
      tu = sa[--oa], sa[oa] = null, $a = sa[--oa], sa[oa] = null;
    for (; t === ue; )
      ue = gl[--bl], gl[bl] = null, Dl = gl[--bl], gl[bl] = null, jl = gl[--bl], gl[bl] = null;
  }
  function eo(t, l) {
    gl[bl++] = jl, gl[bl++] = Dl, gl[bl++] = ue, jl = l.id, Dl = l.overflow, ue = t;
  }
  var Qt = null, bt = null, at = !1, ie = null, Sl = !1, Ki = Error(s(519));
  function ce(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wa(yl(l, t)), Ki;
  }
  function ao(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Gt] = t, l[Wt] = a, e) {
      case "dialog":
        I("cancel", l), I("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        I("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Sn.length; e++)
          I(Sn[e], l);
        break;
      case "source":
        I("error", l);
        break;
      case "img":
      case "image":
      case "link":
        I("error", l), I("load", l);
        break;
      case "details":
        I("toggle", l);
        break;
      case "input":
        I("invalid", l), ys(
          l,
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
        I("invalid", l);
        break;
      case "textarea":
        I("invalid", l), bs(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || E1(l.textContent, e) ? (a.popover != null && (I("beforetoggle", l), I("toggle", l)), a.onScroll != null && I("scroll", l), a.onScrollEnd != null && I("scrollend", l), a.onClick != null && (l.onclick = Gl), l = !0) : l = !1, l || ce(t, !0);
  }
  function no(t) {
    for (Qt = t.return; Qt; )
      switch (Qt.tag) {
        case 5:
        case 31:
        case 13:
          Sl = !1;
          return;
        case 27:
        case 3:
          Sl = !0;
          return;
        default:
          Qt = Qt.return;
      }
  }
  function ra(t) {
    if (t !== Qt) return !1;
    if (!at) return no(t), at = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || of(t.type, t.memoizedProps)), e = !e), e && bt && ce(t), no(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      bt = x1(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      bt = x1(t);
    } else
      l === 27 ? (l = bt, Ee(t.type) ? (t = vf, vf = null, bt = t) : bt = l) : bt = Qt ? El(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Be() {
    bt = Qt = null, at = !1;
  }
  function wi() {
    var t = ie;
    return t !== null && (ll === null ? ll = t : ll.push.apply(
      ll,
      t
    ), ie = null), t;
  }
  function Wa(t) {
    ie === null ? ie = [t] : ie.push(t);
  }
  var Ji = h(null), Ye = null, Zl = null;
  function fe(t, l, e) {
    U(Ji, l._currentValue), l._currentValue = e;
  }
  function Vl(t) {
    t._currentValue = Ji.current, O(Ji);
  }
  function ki(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function $i(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var d = 0; d < l.length; d++)
            if (f.context === l[d]) {
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), ki(
                u.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(s(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), ki(i, e, t), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function da(t, l, e, a) {
    t = null;
    for (var n = l, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          il(n.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (n === ft.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(_n) : t = [_n]);
      }
      n = n.return;
    }
    t !== null && $i(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function lu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!il(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ge(t) {
    Ye = t, Zl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Lt(t) {
    return uo(Ye, t);
  }
  function eu(t, l) {
    return Ye === null && Ge(t), uo(t, l);
  }
  function uo(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Zl === null) {
      if (t === null) throw Error(s(308));
      Zl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Zl = Zl.next = l;
    return e;
  }
  var Y0 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, G0 = c.unstable_scheduleCallback, Q0 = c.unstable_NormalPriority, Ct = {
    $$typeof: Rt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Wi() {
    return {
      controller: new Y0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Fa(t) {
    t.refCount--, t.refCount === 0 && G0(Q0, function() {
      t.controller.abort();
    });
  }
  var Ia = null, Fi = 0, ma = 0, ha = null;
  function L0(t, l) {
    if (Ia === null) {
      var e = Ia = [];
      Fi = 0, ma = tf(), ha = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Fi++, l.then(io, io), l;
  }
  function io() {
    if (--Fi === 0 && Ia !== null) {
      ha !== null && (ha.status = "fulfilled");
      var t = Ia;
      Ia = null, ma = 0, ha = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function X0(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var n = 0; n < e.length; n++) (0, e[n])(l);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var co = _.S;
  _.S = function(t, l) {
    Kr = al(), typeof l == "object" && l !== null && typeof l.then == "function" && L0(t, l), co !== null && co(t, l);
  };
  var Qe = h(null);
  function Ii() {
    var t = Qe.current;
    return t !== null ? t : yt.pooledCache;
  }
  function au(t, l) {
    l === null ? U(Qe, Qe.current) : U(Qe, l.pool);
  }
  function fo() {
    var t = Ii();
    return t === null ? null : { parent: Ct._currentValue, pool: t };
  }
  var va = Error(s(460)), Pi = Error(s(474)), nu = Error(s(542)), uu = { then: function() {
  } };
  function so(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function oo(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Gl, Gl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, mo(t), t;
      default:
        if (typeof l.status == "string") l.then(Gl, Gl);
        else {
          if (t = yt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, mo(t), t;
        }
        throw Xe = l, va;
    }
  }
  function Le(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Xe = e, va) : e;
    }
  }
  var Xe = null;
  function ro() {
    if (Xe === null) throw Error(s(459));
    var t = Xe;
    return Xe = null, t;
  }
  function mo(t) {
    if (t === va || t === nu)
      throw Error(s(483));
  }
  var ya = null, Pa = 0;
  function iu(t) {
    var l = Pa;
    return Pa += 1, ya === null && (ya = []), oo(ya, t, l);
  }
  function tn(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function cu(t, l) {
    throw l.$$typeof === $ ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function ho(t) {
    function l(y, m) {
      if (t) {
        var g = y.deletions;
        g === null ? (y.deletions = [m], y.flags |= 16) : g.push(m);
      }
    }
    function e(y, m) {
      if (!t) return null;
      for (; m !== null; )
        l(y, m), m = m.sibling;
      return null;
    }
    function a(y) {
      for (var m = /* @__PURE__ */ new Map(); y !== null; )
        y.key !== null ? m.set(y.key, y) : m.set(y.index, y), y = y.sibling;
      return m;
    }
    function n(y, m) {
      return y = Ll(y, m), y.index = 0, y.sibling = null, y;
    }
    function u(y, m, g) {
      return y.index = g, t ? (g = y.alternate, g !== null ? (g = g.index, g < m ? (y.flags |= 67108866, m) : g) : (y.flags |= 67108866, m)) : (y.flags |= 1048576, m);
    }
    function i(y) {
      return t && y.alternate === null && (y.flags |= 67108866), y;
    }
    function f(y, m, g, A) {
      return m === null || m.tag !== 6 ? (m = Li(g, y.mode, A), m.return = y, m) : (m = n(m, g), m.return = y, m);
    }
    function d(y, m, g, A) {
      var G = g.type;
      return G === P ? T(
        y,
        m,
        g.props.children,
        A,
        g.key
      ) : m !== null && (m.elementType === G || typeof G == "object" && G !== null && G.$$typeof === Ht && Le(G) === m.type) ? (m = n(m, g.props), tn(m, g), m.return = y, m) : (m = Pn(
        g.type,
        g.key,
        g.props,
        null,
        y.mode,
        A
      ), tn(m, g), m.return = y, m);
    }
    function b(y, m, g, A) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== g.containerInfo || m.stateNode.implementation !== g.implementation ? (m = Xi(g, y.mode, A), m.return = y, m) : (m = n(m, g.children || []), m.return = y, m);
    }
    function T(y, m, g, A, G) {
      return m === null || m.tag !== 7 ? (m = qe(
        g,
        y.mode,
        A,
        G
      ), m.return = y, m) : (m = n(m, g), m.return = y, m);
    }
    function M(y, m, g) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = Li(
          "" + m,
          y.mode,
          g
        ), m.return = y, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case X:
            return g = Pn(
              m.type,
              m.key,
              m.props,
              null,
              y.mode,
              g
            ), tn(g, m), g.return = y, g;
          case nt:
            return m = Xi(
              m,
              y.mode,
              g
            ), m.return = y, m;
          case Ht:
            return m = Le(m), M(y, m, g);
        }
        if (Tl(m) || $t(m))
          return m = qe(
            m,
            y.mode,
            g,
            null
          ), m.return = y, m;
        if (typeof m.then == "function")
          return M(y, iu(m), g);
        if (m.$$typeof === Rt)
          return M(
            y,
            eu(y, m),
            g
          );
        cu(y, m);
      }
      return null;
    }
    function S(y, m, g, A) {
      var G = m !== null ? m.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return G !== null ? null : f(y, m, "" + g, A);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case X:
            return g.key === G ? d(y, m, g, A) : null;
          case nt:
            return g.key === G ? b(y, m, g, A) : null;
          case Ht:
            return g = Le(g), S(y, m, g, A);
        }
        if (Tl(g) || $t(g))
          return G !== null ? null : T(y, m, g, A, null);
        if (typeof g.then == "function")
          return S(
            y,
            m,
            iu(g),
            A
          );
        if (g.$$typeof === Rt)
          return S(
            y,
            m,
            eu(y, g),
            A
          );
        cu(y, g);
      }
      return null;
    }
    function E(y, m, g, A, G) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return y = y.get(g) || null, f(m, y, "" + A, G);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case X:
            return y = y.get(
              A.key === null ? g : A.key
            ) || null, d(m, y, A, G);
          case nt:
            return y = y.get(
              A.key === null ? g : A.key
            ) || null, b(m, y, A, G);
          case Ht:
            return A = Le(A), E(
              y,
              m,
              g,
              A,
              G
            );
        }
        if (Tl(A) || $t(A))
          return y = y.get(g) || null, T(m, y, A, G, null);
        if (typeof A.then == "function")
          return E(
            y,
            m,
            g,
            iu(A),
            G
          );
        if (A.$$typeof === Rt)
          return E(
            y,
            m,
            g,
            eu(m, A),
            G
          );
        cu(m, A);
      }
      return null;
    }
    function R(y, m, g, A) {
      for (var G = null, ut = null, q = m, J = m = 0, et = null; q !== null && J < g.length; J++) {
        q.index > J ? (et = q, q = null) : et = q.sibling;
        var it = S(
          y,
          q,
          g[J],
          A
        );
        if (it === null) {
          q === null && (q = et);
          break;
        }
        t && q && it.alternate === null && l(y, q), m = u(it, m, J), ut === null ? G = it : ut.sibling = it, ut = it, q = et;
      }
      if (J === g.length)
        return e(y, q), at && Xl(y, J), G;
      if (q === null) {
        for (; J < g.length; J++)
          q = M(y, g[J], A), q !== null && (m = u(
            q,
            m,
            J
          ), ut === null ? G = q : ut.sibling = q, ut = q);
        return at && Xl(y, J), G;
      }
      for (q = a(q); J < g.length; J++)
        et = E(
          q,
          y,
          J,
          g[J],
          A
        ), et !== null && (t && et.alternate !== null && q.delete(
          et.key === null ? J : et.key
        ), m = u(
          et,
          m,
          J
        ), ut === null ? G = et : ut.sibling = et, ut = et);
      return t && q.forEach(function(Me) {
        return l(y, Me);
      }), at && Xl(y, J), G;
    }
    function Q(y, m, g, A) {
      if (g == null) throw Error(s(151));
      for (var G = null, ut = null, q = m, J = m = 0, et = null, it = g.next(); q !== null && !it.done; J++, it = g.next()) {
        q.index > J ? (et = q, q = null) : et = q.sibling;
        var Me = S(y, q, it.value, A);
        if (Me === null) {
          q === null && (q = et);
          break;
        }
        t && q && Me.alternate === null && l(y, q), m = u(Me, m, J), ut === null ? G = Me : ut.sibling = Me, ut = Me, q = et;
      }
      if (it.done)
        return e(y, q), at && Xl(y, J), G;
      if (q === null) {
        for (; !it.done; J++, it = g.next())
          it = M(y, it.value, A), it !== null && (m = u(it, m, J), ut === null ? G = it : ut.sibling = it, ut = it);
        return at && Xl(y, J), G;
      }
      for (q = a(q); !it.done; J++, it = g.next())
        it = E(q, y, J, it.value, A), it !== null && (t && it.alternate !== null && q.delete(it.key === null ? J : it.key), m = u(it, m, J), ut === null ? G = it : ut.sibling = it, ut = it);
      return t && q.forEach(function(Pm) {
        return l(y, Pm);
      }), at && Xl(y, J), G;
    }
    function ht(y, m, g, A) {
      if (typeof g == "object" && g !== null && g.type === P && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case X:
            t: {
              for (var G = g.key; m !== null; ) {
                if (m.key === G) {
                  if (G = g.type, G === P) {
                    if (m.tag === 7) {
                      e(
                        y,
                        m.sibling
                      ), A = n(
                        m,
                        g.props.children
                      ), A.return = y, y = A;
                      break t;
                    }
                  } else if (m.elementType === G || typeof G == "object" && G !== null && G.$$typeof === Ht && Le(G) === m.type) {
                    e(
                      y,
                      m.sibling
                    ), A = n(m, g.props), tn(A, g), A.return = y, y = A;
                    break t;
                  }
                  e(y, m);
                  break;
                } else l(y, m);
                m = m.sibling;
              }
              g.type === P ? (A = qe(
                g.props.children,
                y.mode,
                A,
                g.key
              ), A.return = y, y = A) : (A = Pn(
                g.type,
                g.key,
                g.props,
                null,
                y.mode,
                A
              ), tn(A, g), A.return = y, y = A);
            }
            return i(y);
          case nt:
            t: {
              for (G = g.key; m !== null; ) {
                if (m.key === G)
                  if (m.tag === 4 && m.stateNode.containerInfo === g.containerInfo && m.stateNode.implementation === g.implementation) {
                    e(
                      y,
                      m.sibling
                    ), A = n(m, g.children || []), A.return = y, y = A;
                    break t;
                  } else {
                    e(y, m);
                    break;
                  }
                else l(y, m);
                m = m.sibling;
              }
              A = Xi(g, y.mode, A), A.return = y, y = A;
            }
            return i(y);
          case Ht:
            return g = Le(g), ht(
              y,
              m,
              g,
              A
            );
        }
        if (Tl(g))
          return R(
            y,
            m,
            g,
            A
          );
        if ($t(g)) {
          if (G = $t(g), typeof G != "function") throw Error(s(150));
          return g = G.call(g), Q(
            y,
            m,
            g,
            A
          );
        }
        if (typeof g.then == "function")
          return ht(
            y,
            m,
            iu(g),
            A
          );
        if (g.$$typeof === Rt)
          return ht(
            y,
            m,
            eu(y, g),
            A
          );
        cu(y, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, m !== null && m.tag === 6 ? (e(y, m.sibling), A = n(m, g), A.return = y, y = A) : (e(y, m), A = Li(g, y.mode, A), A.return = y, y = A), i(y)) : e(y, m);
    }
    return function(y, m, g, A) {
      try {
        Pa = 0;
        var G = ht(
          y,
          m,
          g,
          A
        );
        return ya = null, G;
      } catch (q) {
        if (q === va || q === nu) throw q;
        var ut = cl(29, q, null, y.mode);
        return ut.lanes = A, ut.return = y, ut;
      } finally {
      }
    };
  }
  var Ze = ho(!0), vo = ho(!1), se = !1;
  function tc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function lc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function oe(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function re(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ct & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = In(t), Fs(t, null, e), l;
    }
    return Fn(t, a, l, e), In(t);
  }
  function ln(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, us(t, e);
    }
  }
  function ec(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = l : u = u.next = l;
      } else n = u = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var ac = !1;
  function en() {
    if (ac) {
      var t = ha;
      if (t !== null) throw t;
    }
  }
  function an(t, l, e, a) {
    ac = !1;
    var n = t.updateQueue;
    se = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var d = f, b = d.next;
      d.next = null, i === null ? u = b : i.next = b, i = d;
      var T = t.alternate;
      T !== null && (T = T.updateQueue, f = T.lastBaseUpdate, f !== i && (f === null ? T.firstBaseUpdate = b : f.next = b, T.lastBaseUpdate = d));
    }
    if (u !== null) {
      var M = n.baseState;
      i = 0, T = b = d = null, f = u;
      do {
        var S = f.lane & -536870913, E = S !== f.lane;
        if (E ? (lt & S) === S : (a & S) === S) {
          S !== 0 && S === ma && (ac = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var R = t, Q = f;
            S = l;
            var ht = e;
            switch (Q.tag) {
              case 1:
                if (R = Q.payload, typeof R == "function") {
                  M = R.call(ht, M, S);
                  break t;
                }
                M = R;
                break t;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = Q.payload, S = typeof R == "function" ? R.call(ht, M, S) : R, S == null) break t;
                M = B({}, M, S);
                break t;
              case 2:
                se = !0;
            }
          }
          S = f.callback, S !== null && (t.flags |= 64, E && (t.flags |= 8192), E = n.callbacks, E === null ? n.callbacks = [S] : E.push(S));
        } else
          E = {
            lane: S,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, T === null ? (b = T = E, d = M) : T = T.next = E, i |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          E = f, f = E.next, E.next = null, n.lastBaseUpdate = E, n.shared.pending = null;
        }
      } while (!0);
      T === null && (d = M), n.baseState = d, n.firstBaseUpdate = b, n.lastBaseUpdate = T, u === null && (n.shared.lanes = 0), ye |= i, t.lanes = i, t.memoizedState = M;
    }
  }
  function yo(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function go(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        yo(e[t], l);
  }
  var ga = h(null), fu = h(0);
  function bo(t, l) {
    t = Pl, U(fu, t), U(ga, l), Pl = t | l.baseLanes;
  }
  function nc() {
    U(fu, Pl), U(ga, ga.current);
  }
  function uc() {
    Pl = fu.current, O(ga), O(fu);
  }
  var fl = h(null), pl = null;
  function de(t) {
    var l = t.alternate;
    U(Ot, Ot.current & 1), U(fl, t), pl === null && (l === null || ga.current !== null || l.memoizedState !== null) && (pl = t);
  }
  function ic(t) {
    U(Ot, Ot.current), U(fl, t), pl === null && (pl = t);
  }
  function So(t) {
    t.tag === 22 ? (U(Ot, Ot.current), U(fl, t), pl === null && (pl = t)) : me();
  }
  function me() {
    U(Ot, Ot.current), U(fl, fl.current);
  }
  function sl(t) {
    O(fl), pl === t && (pl = null), O(Ot);
  }
  var Ot = h(0);
  function su(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || mf(e) || hf(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var Kl = 0, w = null, dt = null, xt = null, ou = !1, ba = !1, Ve = !1, ru = 0, nn = 0, Sa = null, Z0 = 0;
  function zt() {
    throw Error(s(321));
  }
  function cc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!il(t[e], l[e])) return !1;
    return !0;
  }
  function fc(t, l, e, a, n, u) {
    return Kl = u, w = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, _.H = t === null || t.memoizedState === null ? er : Tc, Ve = !1, u = e(a, n), Ve = !1, ba && (u = Eo(
      l,
      e,
      a,
      n
    )), po(t), u;
  }
  function po(t) {
    _.H = fn;
    var l = dt !== null && dt.next !== null;
    if (Kl = 0, xt = dt = w = null, ou = !1, nn = 0, Sa = null, l) throw Error(s(300));
    t === null || jt || (t = t.dependencies, t !== null && lu(t) && (jt = !0));
  }
  function Eo(t, l, e, a) {
    w = t;
    var n = 0;
    do {
      if (ba && (Sa = null), nn = 0, ba = !1, 25 <= n) throw Error(s(301));
      if (n += 1, xt = dt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      _.H = ar, u = l(e, a);
    } while (ba);
    return u;
  }
  function V0() {
    var t = _.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? un(l) : l, t = t.useState()[0], (dt !== null ? dt.memoizedState : null) !== t && (w.flags |= 1024), l;
  }
  function sc() {
    var t = ru !== 0;
    return ru = 0, t;
  }
  function oc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function rc(t) {
    if (ou) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      ou = !1;
    }
    Kl = 0, xt = dt = w = null, ba = !1, nn = ru = 0, Sa = null;
  }
  function kt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return xt === null ? w.memoizedState = xt = t : xt = xt.next = t, xt;
  }
  function Nt() {
    if (dt === null) {
      var t = w.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = dt.next;
    var l = xt === null ? w.memoizedState : xt.next;
    if (l !== null)
      xt = l, dt = t;
    else {
      if (t === null)
        throw w.alternate === null ? Error(s(467)) : Error(s(310));
      dt = t, t = {
        memoizedState: dt.memoizedState,
        baseState: dt.baseState,
        baseQueue: dt.baseQueue,
        queue: dt.queue,
        next: null
      }, xt === null ? w.memoizedState = xt = t : xt = xt.next = t;
    }
    return xt;
  }
  function du() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function un(t) {
    var l = nn;
    return nn += 1, Sa === null && (Sa = []), t = oo(Sa, t, l), l = w, (xt === null ? l.memoizedState : xt.next) === null && (l = l.alternate, _.H = l === null || l.memoizedState === null ? er : Tc), t;
  }
  function mu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return un(t);
      if (t.$$typeof === Rt) return Lt(t);
    }
    throw Error(s(438, String(t)));
  }
  function dc(t) {
    var l = null, e = w.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = w.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = du(), w.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = ke;
    return l.index++, e;
  }
  function wl(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function hu(t) {
    var l = Nt();
    return mc(l, dt, t);
  }
  function mc(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      l.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      l = n.next;
      var f = i = null, d = null, b = l, T = !1;
      do {
        var M = b.lane & -536870913;
        if (M !== b.lane ? (lt & M) === M : (Kl & M) === M) {
          var S = b.revertLane;
          if (S === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), M === ma && (T = !0);
          else if ((Kl & S) === S) {
            b = b.next, S === ma && (T = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, d === null ? (f = d = M, i = u) : d = d.next = M, w.lanes |= S, ye |= S;
          M = b.action, Ve && e(u, M), u = b.hasEagerState ? b.eagerState : e(u, M);
        } else
          S = {
            lane: M,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, d === null ? (f = d = S, i = u) : d = d.next = S, w.lanes |= M, ye |= M;
        b = b.next;
      } while (b !== null && b !== l);
      if (d === null ? i = u : d.next = f, !il(u, t.memoizedState) && (jt = !0, T && (e = ha, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = d, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function hc(t) {
    var l = Nt(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      il(u, l.memoizedState) || (jt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function zo(t, l, e) {
    var a = w, n = Nt(), u = at;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !il(
      (dt || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, jt = !0), n = n.queue, gc(Ao.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || xt !== null && xt.memoizedState.tag & 1) {
      if (a.flags |= 2048, pa(
        9,
        { destroy: void 0 },
        _o.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), yt === null) throw Error(s(349));
      u || (Kl & 127) !== 0 || To(a, l, e);
    }
    return e;
  }
  function To(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = w.updateQueue, l === null ? (l = du(), w.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function _o(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Mo(l) && Oo(t);
  }
  function Ao(t, l, e) {
    return e(function() {
      Mo(l) && Oo(t);
    });
  }
  function Mo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !il(t, e);
    } catch {
      return !0;
    }
  }
  function Oo(t) {
    var l = He(t, 2);
    l !== null && el(l, t, 2);
  }
  function vc(t) {
    var l = kt();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Ve) {
        ee(!0);
        try {
          e();
        } finally {
          ee(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wl,
      lastRenderedState: t
    }, l;
  }
  function No(t, l, e, a) {
    return t.baseState = e, mc(
      t,
      dt,
      typeof a == "function" ? a : wl
    );
  }
  function K0(t, l, e, a, n) {
    if (gu(t)) throw Error(s(485));
    if (t = l.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      _.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Co(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Co(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = _.T, i = {};
      _.T = i;
      try {
        var f = e(n, a), d = _.S;
        d !== null && d(i, f), xo(t, l, f);
      } catch (b) {
        yc(t, l, b);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), _.T = u;
      }
    } else
      try {
        u = e(n, a), xo(t, l, u);
      } catch (b) {
        yc(t, l, b);
      }
  }
  function xo(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        jo(t, l, a);
      },
      function(a) {
        return yc(t, l, a);
      }
    ) : jo(t, l, e);
  }
  function jo(t, l, e) {
    l.status = "fulfilled", l.value = e, Do(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Co(t, e)));
  }
  function yc(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Do(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Do(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Uo(t, l) {
    return l;
  }
  function Ro(t, l) {
    if (at) {
      var e = yt.formState;
      if (e !== null) {
        t: {
          var a = w;
          if (at) {
            if (bt) {
              l: {
                for (var n = bt, u = Sl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = El(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                bt = El(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            ce(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = kt(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Uo,
      lastRenderedState: l
    }, e.queue = a, e = Po.bind(
      null,
      w,
      a
    ), a.dispatch = e, a = vc(!1), u = zc.bind(
      null,
      w,
      !1,
      a.queue
    ), a = kt(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = K0.bind(
      null,
      w,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Ho(t) {
    var l = Nt();
    return qo(l, dt, t);
  }
  function qo(t, l, e) {
    if (l = mc(
      t,
      l,
      Uo
    )[0], t = hu(wl)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = un(l);
      } catch (i) {
        throw i === va ? nu : i;
      }
    else a = l;
    l = Nt();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (w.flags |= 2048, pa(
      9,
      { destroy: void 0 },
      w0.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function w0(t, l) {
    t.action = l;
  }
  function Bo(t) {
    var l = Nt(), e = dt;
    if (e !== null)
      return qo(l, e, t);
    Nt(), l = l.memoizedState, e = Nt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function pa(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = w.updateQueue, l === null && (l = du(), w.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Yo() {
    return Nt().memoizedState;
  }
  function vu(t, l, e, a) {
    var n = kt();
    w.flags |= t, n.memoizedState = pa(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function yu(t, l, e, a) {
    var n = Nt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    dt !== null && a !== null && cc(a, dt.memoizedState.deps) ? n.memoizedState = pa(l, u, e, a) : (w.flags |= t, n.memoizedState = pa(
      1 | l,
      u,
      e,
      a
    ));
  }
  function Go(t, l) {
    vu(8390656, 8, t, l);
  }
  function gc(t, l) {
    yu(2048, 8, t, l);
  }
  function J0(t) {
    w.flags |= 4;
    var l = w.updateQueue;
    if (l === null)
      l = du(), w.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Qo(t) {
    var l = Nt().memoizedState;
    return J0({ ref: l, nextImpl: t }), function() {
      if ((ct & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Lo(t, l) {
    return yu(4, 2, t, l);
  }
  function Xo(t, l) {
    return yu(4, 4, t, l);
  }
  function Zo(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function Vo(t, l, e) {
    e = e != null ? e.concat([t]) : null, yu(4, 4, Zo.bind(null, l, t), e);
  }
  function bc() {
  }
  function Ko(t, l) {
    var e = Nt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && cc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function wo(t, l) {
    var e = Nt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && cc(l, a[1]))
      return a[0];
    if (a = t(), Ve) {
      ee(!0);
      try {
        t();
      } finally {
        ee(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function Sc(t, l, e) {
    return e === void 0 || (Kl & 1073741824) !== 0 && (lt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = Jr(), w.lanes |= t, ye |= t, e);
  }
  function Jo(t, l, e, a) {
    return il(e, l) ? e : ga.current !== null ? (t = Sc(t, e, a), il(t, l) || (jt = !0), t) : (Kl & 42) === 0 || (Kl & 1073741824) !== 0 && (lt & 261930) === 0 ? (jt = !0, t.memoizedState = e) : (t = Jr(), w.lanes |= t, ye |= t, l);
  }
  function ko(t, l, e, a, n) {
    var u = D.p;
    D.p = u !== 0 && 8 > u ? u : 8;
    var i = _.T, f = {};
    _.T = f, zc(t, !1, l, e);
    try {
      var d = n(), b = _.S;
      if (b !== null && b(f, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var T = X0(
          d,
          a
        );
        cn(
          t,
          l,
          T,
          dl(t)
        );
      } else
        cn(
          t,
          l,
          a,
          dl(t)
        );
    } catch (M) {
      cn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: M },
        dl()
      );
    } finally {
      D.p = u, i !== null && f.types !== null && (i.types = f.types), _.T = i;
    }
  }
  function k0() {
  }
  function pc(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = $o(t).queue;
    ko(
      t,
      n,
      l,
      L,
      e === null ? k0 : function() {
        return Wo(t), e(a);
      }
    );
  }
  function $o(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: L,
      baseState: L,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wl,
        lastRenderedState: L
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wl,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function Wo(t) {
    var l = $o(t);
    l.next === null && (l = t.alternate.memoizedState), cn(
      t,
      l.next.queue,
      {},
      dl()
    );
  }
  function Ec() {
    return Lt(_n);
  }
  function Fo() {
    return Nt().memoizedState;
  }
  function Io() {
    return Nt().memoizedState;
  }
  function $0(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = dl();
          t = oe(e);
          var a = re(l, t, e);
          a !== null && (el(a, l, e), ln(a, l, e)), l = { cache: Wi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function W0(t, l, e) {
    var a = dl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, gu(t) ? tr(l, e) : (e = Gi(t, l, e, a), e !== null && (el(e, t, a), lr(e, l, a)));
  }
  function Po(t, l, e) {
    var a = dl();
    cn(t, l, e, a);
  }
  function cn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (gu(t)) tr(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, il(f, i))
            return Fn(t, l, n, 0), yt === null && Wn(), !1;
        } catch {
        } finally {
        }
      if (e = Gi(t, l, n, a), e !== null)
        return el(e, t, a), lr(e, l, a), !0;
    }
    return !1;
  }
  function zc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: tf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, gu(t)) {
      if (l) throw Error(s(479));
    } else
      l = Gi(
        t,
        e,
        a,
        2
      ), l !== null && el(l, t, 2);
  }
  function gu(t) {
    var l = t.alternate;
    return t === w || l !== null && l === w;
  }
  function tr(t, l) {
    ba = ou = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function lr(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, us(t, e);
    }
  }
  var fn = {
    readContext: Lt,
    use: mu,
    useCallback: zt,
    useContext: zt,
    useEffect: zt,
    useImperativeHandle: zt,
    useLayoutEffect: zt,
    useInsertionEffect: zt,
    useMemo: zt,
    useReducer: zt,
    useRef: zt,
    useState: zt,
    useDebugValue: zt,
    useDeferredValue: zt,
    useTransition: zt,
    useSyncExternalStore: zt,
    useId: zt,
    useHostTransitionStatus: zt,
    useFormState: zt,
    useActionState: zt,
    useOptimistic: zt,
    useMemoCache: zt,
    useCacheRefresh: zt
  };
  fn.useEffectEvent = zt;
  var er = {
    readContext: Lt,
    use: mu,
    useCallback: function(t, l) {
      return kt().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: Lt,
    useEffect: Go,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, vu(
        4194308,
        4,
        Zo.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return vu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      vu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = kt();
      l = l === void 0 ? null : l;
      var a = t();
      if (Ve) {
        ee(!0);
        try {
          t();
        } finally {
          ee(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = kt();
      if (e !== void 0) {
        var n = e(l);
        if (Ve) {
          ee(!0);
          try {
            e(l);
          } finally {
            ee(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = W0.bind(
        null,
        w,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = kt();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = vc(t);
      var l = t.queue, e = Po.bind(null, w, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: bc,
    useDeferredValue: function(t, l) {
      var e = kt();
      return Sc(e, t, l);
    },
    useTransition: function() {
      var t = vc(!1);
      return t = ko.bind(
        null,
        w,
        t.queue,
        !0,
        !1
      ), kt().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = w, n = kt();
      if (at) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), yt === null)
          throw Error(s(349));
        (lt & 127) !== 0 || To(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, Go(Ao.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, pa(
        9,
        { destroy: void 0 },
        _o.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = kt(), l = yt.identifierPrefix;
      if (at) {
        var e = Dl, a = jl;
        e = (a & ~(1 << 32 - ul(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ru++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Z0++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Ec,
    useFormState: Ro,
    useActionState: Ro,
    useOptimistic: function(t) {
      var l = kt();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = zc.bind(
        null,
        w,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: dc,
    useCacheRefresh: function() {
      return kt().memoizedState = $0.bind(
        null,
        w
      );
    },
    useEffectEvent: function(t) {
      var l = kt(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((ct & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Tc = {
    readContext: Lt,
    use: mu,
    useCallback: Ko,
    useContext: Lt,
    useEffect: gc,
    useImperativeHandle: Vo,
    useInsertionEffect: Lo,
    useLayoutEffect: Xo,
    useMemo: wo,
    useReducer: hu,
    useRef: Yo,
    useState: function() {
      return hu(wl);
    },
    useDebugValue: bc,
    useDeferredValue: function(t, l) {
      var e = Nt();
      return Jo(
        e,
        dt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = hu(wl)[0], l = Nt().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: zo,
    useId: Fo,
    useHostTransitionStatus: Ec,
    useFormState: Ho,
    useActionState: Ho,
    useOptimistic: function(t, l) {
      var e = Nt();
      return No(e, dt, t, l);
    },
    useMemoCache: dc,
    useCacheRefresh: Io
  };
  Tc.useEffectEvent = Qo;
  var ar = {
    readContext: Lt,
    use: mu,
    useCallback: Ko,
    useContext: Lt,
    useEffect: gc,
    useImperativeHandle: Vo,
    useInsertionEffect: Lo,
    useLayoutEffect: Xo,
    useMemo: wo,
    useReducer: hc,
    useRef: Yo,
    useState: function() {
      return hc(wl);
    },
    useDebugValue: bc,
    useDeferredValue: function(t, l) {
      var e = Nt();
      return dt === null ? Sc(e, t, l) : Jo(
        e,
        dt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = hc(wl)[0], l = Nt().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: zo,
    useId: Fo,
    useHostTransitionStatus: Ec,
    useFormState: Bo,
    useActionState: Bo,
    useOptimistic: function(t, l) {
      var e = Nt();
      return dt !== null ? No(e, dt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: dc,
    useCacheRefresh: Io
  };
  ar.useEffectEvent = Qo;
  function _c(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : B({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Ac = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = dl(), n = oe(a);
      n.payload = l, e != null && (n.callback = e), l = re(t, n, a), l !== null && (el(l, t, a), ln(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = dl(), n = oe(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = re(t, n, a), l !== null && (el(l, t, a), ln(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = dl(), a = oe(e);
      a.tag = 2, l != null && (a.callback = l), l = re(t, a, e), l !== null && (el(l, t, e), ln(l, t, e));
    }
  };
  function nr(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !Ja(e, a) || !Ja(n, u) : !0;
  }
  function ur(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && Ac.enqueueReplaceState(l, l.state, null);
  }
  function Ke(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = B({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function ir(t) {
    $n(t);
  }
  function cr(t) {
    console.error(t);
  }
  function fr(t) {
    $n(t);
  }
  function bu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function sr(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Mc(t, l, e) {
    return e = oe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      bu(t, l);
    }, e;
  }
  function or(t) {
    return t = oe(t), t.tag = 3, t;
  }
  function rr(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        sr(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      sr(l, e, a), typeof n != "function" && (ge === null ? ge = /* @__PURE__ */ new Set([this]) : ge.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function F0(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && da(
        l,
        e,
        n,
        !0
      ), e = fl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return pl === null ? xu() : e.alternate === null && Tt === 0 && (Tt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === uu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), Fc(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === uu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Fc(t, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return Fc(t, a, n), xu(), !1;
    }
    if (at)
      return l = fl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== Ki && (t = Error(s(422), { cause: a }), Wa(yl(t, e)))) : (a !== Ki && (l = Error(s(423), {
        cause: a
      }), Wa(
        yl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = yl(a, e), n = Mc(
        t.stateNode,
        a,
        n
      ), ec(t, n), Tt !== 4 && (Tt = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = yl(u, e), yn === null ? yn = [u] : yn.push(u), Tt !== 4 && (Tt = 2), l === null) return !0;
    a = yl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = Mc(e.stateNode, a, t), ec(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ge === null || !ge.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = or(n), rr(
              n,
              t,
              e,
              a
            ), ec(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Oc = Error(s(461)), jt = !1;
  function Xt(t, l, e, a) {
    l.child = t === null ? vo(l, null, e, a) : Ze(
      l,
      t.child,
      e,
      a
    );
  }
  function dr(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return Ge(l), a = fc(
      t,
      l,
      e,
      i,
      u,
      n
    ), f = sc(), t !== null && !jt ? (oc(t, l, n), Jl(t, l, n)) : (at && f && Zi(l), l.flags |= 1, Xt(t, l, a, n), l.child);
  }
  function mr(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !Qi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, hr(
        t,
        l,
        u,
        a,
        n
      )) : (t = Pn(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !Hc(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Ja, e(i, a) && t.ref === l.ref)
        return Jl(t, l, n);
    }
    return l.flags |= 1, t = Ll(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function hr(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Ja(u, a) && t.ref === l.ref)
        if (jt = !1, l.pendingProps = a = u, Hc(t, n))
          (t.flags & 131072) !== 0 && (jt = !0);
        else
          return l.lanes = t.lanes, Jl(t, l, n);
    }
    return Nc(
      t,
      l,
      e,
      a,
      n
    );
  }
  function vr(t, l, e, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, l.child = null;
        return yr(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && au(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? bo(l, u) : nc(), So(l);
      else
        return a = l.lanes = 536870912, yr(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (au(l, u.cachePool), bo(l, u), me(), l.memoizedState = null) : (t !== null && au(l, null), nc(), me());
    return Xt(t, l, n, e), l.child;
  }
  function sn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function yr(t, l, e, a, n) {
    var u = Ii();
    return u = u === null ? null : { parent: Ct._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && au(l, null), nc(), So(l), t !== null && da(t, l, a, !0), l.childLanes = n, null;
  }
  function Su(t, l) {
    return l = Eu(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function gr(t, l, e) {
    return Ze(l, t.child, null, e), t = Su(l, l.pendingProps), t.flags |= 2, sl(l), l.memoizedState = null, t;
  }
  function I0(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (at) {
        if (a.mode === "hidden")
          return t = Su(l, a), l.lanes = 536870912, sn(null, t);
        if (ic(l), (t = bt) ? (t = C1(
          t,
          Sl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ue !== null ? { id: jl, overflow: Dl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Ps(t), e.return = l, l.child = e, Qt = l, bt = null)) : t = null, t === null) throw ce(l);
        return l.lanes = 536870912, null;
      }
      return Su(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (ic(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = gr(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (jt || da(t, l, e, !1), n = (e & t.childLanes) !== 0, jt || n) {
        if (a = yt, a !== null && (i = is(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, He(t, i), el(a, t, i), Oc;
        xu(), l = gr(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, bt = El(i.nextSibling), Qt = l, at = !0, ie = null, Sl = !1, t !== null && eo(l, t), l = Su(l, a), l.flags |= 4096;
      return l;
    }
    return t = Ll(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function pu(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Nc(t, l, e, a, n) {
    return Ge(l), e = fc(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = sc(), t !== null && !jt ? (oc(t, l, n), Jl(t, l, n)) : (at && a && Zi(l), l.flags |= 1, Xt(t, l, e, n), l.child);
  }
  function br(t, l, e, a, n, u) {
    return Ge(l), l.updateQueue = null, e = Eo(
      l,
      a,
      e,
      n
    ), po(t), a = sc(), t !== null && !jt ? (oc(t, l, u), Jl(t, l, u)) : (at && a && Zi(l), l.flags |= 1, Xt(t, l, e, u), l.child);
  }
  function Sr(t, l, e, a, n) {
    if (Ge(l), l.stateNode === null) {
      var u = fa, i = e.contextType;
      typeof i == "object" && i !== null && (u = Lt(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Ac, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, tc(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? Lt(i) : fa, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (_c(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Ac.enqueueReplaceState(u, u.state, null), an(l, a, u, n), en(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var f = l.memoizedProps, d = Ke(e, f);
      u.props = d;
      var b = u.context, T = e.contextType;
      i = fa, typeof T == "object" && T !== null && (i = Lt(T));
      var M = e.getDerivedStateFromProps;
      T = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = l.pendingProps !== f, T || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || b !== i) && ur(
        l,
        u,
        a,
        i
      ), se = !1;
      var S = l.memoizedState;
      u.state = S, an(l, a, u, n), en(), b = l.memoizedState, f || S !== b || se ? (typeof M == "function" && (_c(
        l,
        e,
        M,
        a
      ), b = l.memoizedState), (d = se || nr(
        l,
        e,
        d,
        a,
        S,
        b,
        i
      )) ? (T || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = b), u.props = a, u.state = b, u.context = i, a = d) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, lc(t, l), i = l.memoizedProps, T = Ke(e, i), u.props = T, M = l.pendingProps, S = u.context, b = e.contextType, d = fa, typeof b == "object" && b !== null && (d = Lt(b)), f = e.getDerivedStateFromProps, (b = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== M || S !== d) && ur(
        l,
        u,
        a,
        d
      ), se = !1, S = l.memoizedState, u.state = S, an(l, a, u, n), en();
      var E = l.memoizedState;
      i !== M || S !== E || se || t !== null && t.dependencies !== null && lu(t.dependencies) ? (typeof f == "function" && (_c(
        l,
        e,
        f,
        a
      ), E = l.memoizedState), (T = se || nr(
        l,
        e,
        T,
        a,
        S,
        E,
        d
      ) || t !== null && t.dependencies !== null && lu(t.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, E, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        E,
        d
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = E), u.props = a, u.state = E, u.context = d, a = T) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, pu(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = Ze(
      l,
      t.child,
      null,
      n
    ), l.child = Ze(
      l,
      null,
      e,
      n
    )) : Xt(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Jl(
      t,
      l,
      n
    ), t;
  }
  function pr(t, l, e, a) {
    return Be(), l.flags |= 256, Xt(t, l, e, a), l.child;
  }
  var Cc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function xc(t) {
    return { baseLanes: t, cachePool: fo() };
  }
  function jc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= rl), t;
  }
  function Er(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Ot.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (at) {
        if (n ? de(l) : me(), (t = bt) ? (t = C1(
          t,
          Sl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ue !== null ? { id: jl, overflow: Dl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Ps(t), e.return = l, l.child = e, Qt = l, bt = null)) : t = null, t === null) throw ce(l);
        return hf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (me(), n = l.mode, f = Eu(
        { mode: "hidden", children: f },
        n
      ), a = qe(
        a,
        n,
        e,
        null
      ), f.return = l, a.return = l, f.sibling = a, l.child = f, a = l.child, a.memoizedState = xc(e), a.childLanes = jc(
        t,
        i,
        e
      ), l.memoizedState = Cc, sn(null, a)) : (de(l), Dc(l, f));
    }
    var d = t.memoizedState;
    if (d !== null && (f = d.dehydrated, f !== null)) {
      if (u)
        l.flags & 256 ? (de(l), l.flags &= -257, l = Uc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (me(), l.child = t.child, l.flags |= 128, l = null) : (me(), f = a.fallback, n = l.mode, a = Eu(
          { mode: "visible", children: a.children },
          n
        ), f = qe(
          f,
          n,
          e,
          null
        ), f.flags |= 2, a.return = l, f.return = l, a.sibling = f, l.child = a, Ze(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = xc(e), a.childLanes = jc(
          t,
          i,
          e
        ), l.memoizedState = Cc, l = sn(null, a));
      else if (de(l), hf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var b = i.dgst;
        i = b, a = Error(s(419)), a.stack = "", a.digest = i, Wa({ value: a, source: null, stack: null }), l = Uc(
          t,
          l,
          e
        );
      } else if (jt || da(t, l, e, !1), i = (e & t.childLanes) !== 0, jt || i) {
        if (i = yt, i !== null && (a = is(i, e), a !== 0 && a !== d.retryLane))
          throw d.retryLane = a, He(t, a), el(i, t, a), Oc;
        mf(f) || xu(), l = Uc(
          t,
          l,
          e
        );
      } else
        mf(f) ? (l.flags |= 192, l.child = t.child, l = null) : (t = d.treeContext, bt = El(
          f.nextSibling
        ), Qt = l, at = !0, ie = null, Sl = !1, t !== null && eo(l, t), l = Dc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (me(), f = a.fallback, n = l.mode, d = t.child, b = d.sibling, a = Ll(d, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = d.subtreeFlags & 65011712, b !== null ? f = Ll(
      b,
      f
    ) : (f = qe(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = l, a.return = l, a.sibling = f, l.child = a, sn(null, a), a = l.child, f = t.child.memoizedState, f === null ? f = xc(e) : (n = f.cachePool, n !== null ? (d = Ct._currentValue, n = n.parent !== d ? { parent: d, pool: d } : n) : n = fo(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = jc(
      t,
      i,
      e
    ), l.memoizedState = Cc, sn(t.child, a)) : (de(l), e = t.child, t = e.sibling, e = Ll(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Dc(t, l) {
    return l = Eu(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Eu(t, l) {
    return t = cl(22, t, null, l), t.lanes = 0, t;
  }
  function Uc(t, l, e) {
    return Ze(l, t.child, null, e), t = Dc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function zr(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), ki(t.return, l, e);
  }
  function Rc(t, l, e, a, n, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function Tr(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ot.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, U(Ot, i), Xt(t, l, a, e), a = at ? $a : 0, !f && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && zr(t, e, l);
        else if (t.tag === 19)
          zr(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = l.child, n = null; e !== null; )
          t = e.alternate, t !== null && su(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), Rc(
          l,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = l.child, l.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && su(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        Rc(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        Rc(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Jl(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), ye |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (da(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, e = Ll(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Ll(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Hc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && lu(t)));
  }
  function P0(t, l, e) {
    switch (l.tag) {
      case 3:
        Jt(l, l.stateNode.containerInfo), fe(l, Ct, t.memoizedState.cache), Be();
        break;
      case 27:
      case 5:
        Ra(l);
        break;
      case 4:
        Jt(l, l.stateNode.containerInfo);
        break;
      case 10:
        fe(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, ic(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (de(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Er(t, l, e) : (de(l), t = Jl(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        de(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (da(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Tr(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), U(Ot, Ot.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, vr(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        fe(l, Ct, t.memoizedState.cache);
    }
    return Jl(t, l, e);
  }
  function _r(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        jt = !0;
      else {
        if (!Hc(t, e) && (l.flags & 128) === 0)
          return jt = !1, P0(
            t,
            l,
            e
          );
        jt = (t.flags & 131072) !== 0;
      }
    else
      jt = !1, at && (l.flags & 1048576) !== 0 && lo(l, $a, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Le(l.elementType), l.type = t, typeof t == "function")
            Qi(t) ? (a = Ke(t, a), l.tag = 1, l = Sr(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Nc(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === tt) {
                l.tag = 11, l = dr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === k) {
                l.tag = 14, l = mr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Bl(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return Nc(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = Ke(
          a,
          l.pendingProps
        ), Sr(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (Jt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, lc(t, l), an(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, fe(l, Ct, a), a !== u.cache && $i(
            l,
            [Ct],
            e,
            !0
          ), en(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = pr(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = yl(
                Error(s(424)),
                l
              ), Wa(n), l = pr(
                t,
                l,
                a,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (bt = El(t.firstChild), Qt = l, at = !0, ie = null, Sl = !0, e = vo(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Be(), a === n) {
              l = Jl(
                t,
                l,
                e
              );
              break t;
            }
            Xt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return pu(t, l), t === null ? (e = H1(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : at || (e = l.type, t = l.pendingProps, a = Bu(
          W.current
        ).createElement(e), a[Gt] = l, a[Wt] = t, Zt(a, e, t), qt(a), l.stateNode = a) : l.memoizedState = H1(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ra(l), t === null && at && (a = l.stateNode = D1(
          l.type,
          l.pendingProps,
          W.current
        ), Qt = l, Sl = !0, n = bt, Ee(l.type) ? (vf = n, bt = El(a.firstChild)) : bt = n), Xt(
          t,
          l,
          l.pendingProps.children,
          e
        ), pu(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && at && ((n = a = bt) && (a = Cm(
          a,
          l.type,
          l.pendingProps,
          Sl
        ), a !== null ? (l.stateNode = a, Qt = l, bt = El(a.firstChild), Sl = !1, n = !0) : n = !1), n || ce(l)), Ra(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, of(n, u) ? a = null : i !== null && of(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = fc(
          t,
          l,
          V0,
          null,
          null,
          e
        ), _n._currentValue = n), pu(t, l), Xt(t, l, a, e), l.child;
      case 6:
        return t === null && at && ((t = e = bt) && (e = xm(
          e,
          l.pendingProps,
          Sl
        ), e !== null ? (l.stateNode = e, Qt = l, bt = null, t = !0) : t = !1), t || ce(l)), null;
      case 13:
        return Er(t, l, e);
      case 4:
        return Jt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Ze(
          l,
          null,
          a,
          e
        ) : Xt(t, l, a, e), l.child;
      case 11:
        return dr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return Xt(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return Xt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Xt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, fe(l, l.type, a.value), Xt(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Ge(l), n = Lt(n), a = a(n), l.flags |= 1, Xt(t, l, a, e), l.child;
      case 14:
        return mr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return hr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Tr(t, l, e);
      case 31:
        return I0(t, l, e);
      case 22:
        return vr(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Ge(l), a = Lt(Ct), t === null ? (n = Ii(), n === null && (n = yt, u = Wi(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, tc(l), fe(l, Ct, n)) : ((t.lanes & e) !== 0 && (lc(t, l), an(l, null, null, e), en()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), fe(l, Ct, a)) : (a = u.cache, fe(l, Ct, a), a !== n.cache && $i(
          l,
          [Ct],
          e,
          !0
        ))), Xt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function kl(t) {
    t.flags |= 4;
  }
  function qc(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Fr()) t.flags |= 8192;
        else
          throw Xe = uu, Pi;
    } else t.flags &= -16777217;
  }
  function Ar(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Q1(l))
      if (Fr()) t.flags |= 8192;
      else
        throw Xe = uu, Pi;
  }
  function zu(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? as() : 536870912, t.lanes |= l, _a |= l);
  }
  function on(t, l) {
    if (!at)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function St(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function tm(t, l, e) {
    var a = l.pendingProps;
    switch (Vi(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return St(l), null;
      case 1:
        return St(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Vl(Ct), Mt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (ra(l) ? kl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, wi())), St(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (kl(l), u !== null ? (St(l), Ar(l, u)) : (St(l), qc(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (kl(l), St(l), Ar(l, u)) : (St(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && kl(l), St(l), qc(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (Un(l), e = W.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && kl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return St(l), null;
          }
          t = H.current, ra(l) ? ao(l) : (t = D1(n, a, e), l.stateNode = t, kl(l));
        }
        return St(l), null;
      case 5:
        if (Un(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && kl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return St(l), null;
          }
          if (u = H.current, ra(l))
            ao(l);
          else {
            var i = Bu(
              W.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[Gt] = l, u[Wt] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            l.stateNode = u;
            t: switch (Zt(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && kl(l);
          }
        }
        return St(l), qc(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && kl(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(s(166));
          if (t = W.current, ra(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = Qt, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Gt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || E1(t.nodeValue, e)), t || ce(l, !0);
          } else
            t = Bu(t).createTextNode(
              a
            ), t[Gt] = l, l.stateNode = t;
        }
        return St(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = ra(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Gt] = l;
            } else
              Be(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            St(l), t = !1;
          } else
            e = wi(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (sl(l), l) : (sl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return St(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = ra(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Gt] = l;
            } else
              Be(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            St(l), n = !1;
          } else
            n = wi(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (sl(l), l) : (sl(l), null);
        }
        return sl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), zu(l, l.updateQueue), St(l), null);
      case 4:
        return Mt(), t === null && nf(l.stateNode.containerInfo), St(l), null;
      case 10:
        return Vl(l.type), St(l), null;
      case 19:
        if (O(Ot), a = l.memoizedState, a === null) return St(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) on(a, !1);
          else {
            if (Tt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = su(t), u !== null) {
                  for (l.flags |= 128, on(a, !1), t = u.updateQueue, l.updateQueue = t, zu(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Is(e, t), e = e.sibling;
                  return U(
                    Ot,
                    Ot.current & 1 | 2
                  ), at && Xl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && al() > Ou && (l.flags |= 128, n = !0, on(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = su(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, zu(l, t), on(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !at)
                return St(l), null;
            } else
              2 * al() - a.renderingStartTime > Ou && e !== 536870912 && (l.flags |= 128, n = !0, on(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = al(), t.sibling = null, e = Ot.current, U(
          Ot,
          n ? e & 1 | 2 : e & 1
        ), at && Xl(l, a.treeForkCount), t) : (St(l), null);
      case 22:
      case 23:
        return sl(l), uc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (St(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : St(l), e = l.updateQueue, e !== null && zu(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && O(Qe), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Vl(Ct), St(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function lm(t, l) {
    switch (Vi(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Vl(Ct), Mt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Un(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (sl(l), l.alternate === null)
            throw Error(s(340));
          Be();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (sl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          Be();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return O(Ot), null;
      case 4:
        return Mt(), null;
      case 10:
        return Vl(l.type), null;
      case 22:
      case 23:
        return sl(l), uc(), t !== null && O(Qe), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Vl(Ct), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Mr(t, l) {
    switch (Vi(l), l.tag) {
      case 3:
        Vl(Ct), Mt();
        break;
      case 26:
      case 27:
      case 5:
        Un(l);
        break;
      case 4:
        Mt();
        break;
      case 31:
        l.memoizedState !== null && sl(l);
        break;
      case 13:
        sl(l);
        break;
      case 19:
        O(Ot);
        break;
      case 10:
        Vl(l.type);
        break;
      case 22:
      case 23:
        sl(l), uc(), t !== null && O(Qe);
        break;
      case 24:
        Vl(Ct);
    }
  }
  function rn(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (f) {
      ot(l, l.return, f);
    }
  }
  function he(t, l, e) {
    try {
      var a = l.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, n = l;
              var d = e, b = f;
              try {
                b();
              } catch (T) {
                ot(
                  n,
                  d,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (T) {
      ot(l, l.return, T);
    }
  }
  function Or(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        go(l, e);
      } catch (a) {
        ot(t, t.return, a);
      }
    }
  }
  function Nr(t, l, e) {
    e.props = Ke(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      ot(t, l, a);
    }
  }
  function dn(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      ot(t, l, n);
    }
  }
  function Ul(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ot(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          ot(t, l, n);
        }
      else e.current = null;
  }
  function Cr(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      ot(t, t.return, n);
    }
  }
  function Bc(t, l, e) {
    try {
      var a = t.stateNode;
      Tm(a, t.type, e, l), a[Wt] = l;
    } catch (n) {
      ot(t, t.return, n);
    }
  }
  function xr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ee(t.type) || t.tag === 4;
  }
  function Yc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || xr(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ee(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Gc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Gl));
    else if (a !== 4 && (a === 27 && Ee(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Gc(t, l, e), t = t.sibling; t !== null; )
        Gc(t, l, e), t = t.sibling;
  }
  function Tu(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Ee(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Tu(t, l, e), t = t.sibling; t !== null; )
        Tu(t, l, e), t = t.sibling;
  }
  function jr(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      Zt(l, a, e), l[Gt] = t, l[Wt] = e;
    } catch (u) {
      ot(t, t.return, u);
    }
  }
  var $l = !1, Dt = !1, Qc = !1, Dr = typeof WeakSet == "function" ? WeakSet : Set, Bt = null;
  function em(t, l) {
    if (t = t.containerInfo, ff = Vu, t = Zs(t), Ui(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, f = -1, d = -1, b = 0, T = 0, M = t, S = null;
            l: for (; ; ) {
              for (var E; M !== e || n !== 0 && M.nodeType !== 3 || (f = i + n), M !== u || a !== 0 && M.nodeType !== 3 || (d = i + a), M.nodeType === 3 && (i += M.nodeValue.length), (E = M.firstChild) !== null; )
                S = M, M = E;
              for (; ; ) {
                if (M === t) break l;
                if (S === e && ++b === n && (f = i), S === u && ++T === a && (d = i), (E = M.nextSibling) !== null) break;
                M = S, S = M.parentNode;
              }
              M = E;
            }
            e = f === -1 || d === -1 ? null : { start: f, end: d };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (sf = { focusedElem: t, selectionRange: e }, Vu = !1, Bt = l; Bt !== null; )
      if (l = Bt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Bt = t;
      else
        for (; Bt !== null; ) {
          switch (l = Bt, u = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  n = t[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = l, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var R = Ke(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    R,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Q) {
                  ot(
                    e,
                    e.return,
                    Q
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  df(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      df(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Bt = t;
            break;
          }
          Bt = l.return;
        }
  }
  function Ur(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Fl(t, e), a & 4 && rn(5, e);
        break;
      case 1:
        if (Fl(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              ot(e, e.return, i);
            }
          else {
            var n = Ke(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              ot(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Or(e), a & 512 && dn(e, e.return);
        break;
      case 3:
        if (Fl(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            go(t, l);
          } catch (i) {
            ot(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && jr(e);
      case 26:
      case 5:
        Fl(t, e), l === null && a & 4 && Cr(e), a & 512 && dn(e, e.return);
        break;
      case 12:
        Fl(t, e);
        break;
      case 31:
        Fl(t, e), a & 4 && qr(t, e);
        break;
      case 13:
        Fl(t, e), a & 4 && Br(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = rm.bind(
          null,
          e
        ), jm(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || $l, !a) {
          l = l !== null && l.memoizedState !== null || Dt, n = $l;
          var u = Dt;
          $l = a, (Dt = l) && !u ? Il(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : Fl(t, e), $l = n, Dt = u;
        }
        break;
      case 30:
        break;
      default:
        Fl(t, e);
    }
  }
  function Rr(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Rr(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && yi(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Et = null, It = !1;
  function Wl(t, l, e) {
    for (e = e.child; e !== null; )
      Hr(t, l, e), e = e.sibling;
  }
  function Hr(t, l, e) {
    if (nl && typeof nl.onCommitFiberUnmount == "function")
      try {
        nl.onCommitFiberUnmount(Ha, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Dt || Ul(e, l), Wl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Dt || Ul(e, l);
        var a = Et, n = It;
        Ee(e.type) && (Et = e.stateNode, It = !1), Wl(
          t,
          l,
          e
        ), En(e.stateNode), Et = a, It = n;
        break;
      case 5:
        Dt || Ul(e, l);
      case 6:
        if (a = Et, n = It, Et = null, Wl(
          t,
          l,
          e
        ), Et = a, It = n, Et !== null)
          if (It)
            try {
              (Et.nodeType === 9 ? Et.body : Et.nodeName === "HTML" ? Et.ownerDocument.body : Et).removeChild(e.stateNode);
            } catch (u) {
              ot(
                e,
                l,
                u
              );
            }
          else
            try {
              Et.removeChild(e.stateNode);
            } catch (u) {
              ot(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        Et !== null && (It ? (t = Et, O1(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Da(t)) : O1(Et, e.stateNode));
        break;
      case 4:
        a = Et, n = It, Et = e.stateNode.containerInfo, It = !0, Wl(
          t,
          l,
          e
        ), Et = a, It = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        he(2, e, l), Dt || he(4, e, l), Wl(
          t,
          l,
          e
        );
        break;
      case 1:
        Dt || (Ul(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Nr(
          e,
          l,
          a
        )), Wl(
          t,
          l,
          e
        );
        break;
      case 21:
        Wl(
          t,
          l,
          e
        );
        break;
      case 22:
        Dt = (a = Dt) || e.memoizedState !== null, Wl(
          t,
          l,
          e
        ), Dt = a;
        break;
      default:
        Wl(
          t,
          l,
          e
        );
    }
  }
  function qr(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Da(t);
      } catch (e) {
        ot(l, l.return, e);
      }
    }
  }
  function Br(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Da(t);
      } catch (e) {
        ot(l, l.return, e);
      }
  }
  function am(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Dr()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Dr()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function _u(t, l) {
    var e = am(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = dm.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Pt(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, i = l, f = i;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Ee(f.type)) {
                Et = f.stateNode, It = !1;
                break t;
              }
              break;
            case 5:
              Et = f.stateNode, It = !1;
              break t;
            case 3:
            case 4:
              Et = f.stateNode.containerInfo, It = !0;
              break t;
          }
          f = f.return;
        }
        if (Et === null) throw Error(s(160));
        Hr(u, i, n), Et = null, It = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Yr(l, t), l = l.sibling;
  }
  var Al = null;
  function Yr(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Pt(l, t), tl(t), a & 4 && (he(3, t, t.return), rn(3, t), he(5, t, t.return));
        break;
      case 1:
        Pt(l, t), tl(t), a & 512 && (Dt || e === null || Ul(e, e.return)), a & 64 && $l && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Al;
        if (Pt(l, t), tl(t), a & 512 && (Dt || e === null || Ul(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Ya] || u[Gt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Zt(u, a, e), u[Gt] = t, qt(u), a = u;
                      break t;
                    case "link":
                      var i = Y1(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), Zt(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = Y1(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), Zt(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[Gt] = t, qt(u), a = u;
                }
                t.stateNode = a;
              } else
                G1(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = B1(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? G1(
              n,
              t.type,
              t.stateNode
            ) : B1(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && Bc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        Pt(l, t), tl(t), a & 512 && (Dt || e === null || Ul(e, e.return)), e !== null && a & 4 && Bc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (Pt(l, t), tl(t), a & 512 && (Dt || e === null || Ul(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            la(n, "");
          } catch (R) {
            ot(t, t.return, R);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, Bc(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (Qc = !0);
        break;
      case 6:
        if (Pt(l, t), tl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (R) {
            ot(t, t.return, R);
          }
        }
        break;
      case 3:
        if (Qu = null, n = Al, Al = Yu(l.containerInfo), Pt(l, t), Al = n, tl(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Da(l.containerInfo);
          } catch (R) {
            ot(t, t.return, R);
          }
        Qc && (Qc = !1, Gr(t));
        break;
      case 4:
        a = Al, Al = Yu(
          t.stateNode.containerInfo
        ), Pt(l, t), tl(t), Al = a;
        break;
      case 12:
        Pt(l, t), tl(t);
        break;
      case 31:
        Pt(l, t), tl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, _u(t, a)));
        break;
      case 13:
        Pt(l, t), tl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Mu = al()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, _u(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var d = e !== null && e.memoizedState !== null, b = $l, T = Dt;
        if ($l = b || n, Dt = T || d, Pt(l, t), Dt = T, $l = b, tl(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || d || $l || Dt || we(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                d = e = l;
                try {
                  if (u = d.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = d.stateNode;
                    var M = d.memoizedProps.style, S = M != null && M.hasOwnProperty("display") ? M.display : null;
                    f.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (R) {
                  ot(d, d.return, R);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                d = l;
                try {
                  d.stateNode.nodeValue = n ? "" : d.memoizedProps;
                } catch (R) {
                  ot(d, d.return, R);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                d = l;
                try {
                  var E = d.stateNode;
                  n ? N1(E, !0) : N1(d.stateNode, !1);
                } catch (R) {
                  ot(d, d.return, R);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, _u(t, e))));
        break;
      case 19:
        Pt(l, t), tl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, _u(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Pt(l, t), tl(t);
    }
  }
  function tl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (xr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Yc(t);
            Tu(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (la(i, ""), e.flags &= -33);
            var f = Yc(t);
            Tu(t, f, i);
            break;
          case 3:
          case 4:
            var d = e.stateNode.containerInfo, b = Yc(t);
            Gc(
              t,
              b,
              d
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (T) {
        ot(t, t.return, T);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Gr(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Gr(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function Fl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Ur(t, l.alternate, l), l = l.sibling;
  }
  function we(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          he(4, l, l.return), we(l);
          break;
        case 1:
          Ul(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Nr(
            l,
            l.return,
            e
          ), we(l);
          break;
        case 27:
          En(l.stateNode);
        case 26:
        case 5:
          Ul(l, l.return), we(l);
          break;
        case 22:
          l.memoizedState === null && we(l);
          break;
        case 30:
          we(l);
          break;
        default:
          we(l);
      }
      t = t.sibling;
    }
  }
  function Il(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Il(
            n,
            u,
            e
          ), rn(4, u);
          break;
        case 1:
          if (Il(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (b) {
              ot(a, a.return, b);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var d = n.shared.hiddenCallbacks;
              if (d !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < d.length; n++)
                  yo(d[n], f);
            } catch (b) {
              ot(a, a.return, b);
            }
          }
          e && i & 64 && Or(u), dn(u, u.return);
          break;
        case 27:
          jr(u);
        case 26:
        case 5:
          Il(
            n,
            u,
            e
          ), e && a === null && i & 4 && Cr(u), dn(u, u.return);
          break;
        case 12:
          Il(
            n,
            u,
            e
          );
          break;
        case 31:
          Il(
            n,
            u,
            e
          ), e && i & 4 && qr(n, u);
          break;
        case 13:
          Il(
            n,
            u,
            e
          ), e && i & 4 && Br(n, u);
          break;
        case 22:
          u.memoizedState === null && Il(
            n,
            u,
            e
          ), dn(u, u.return);
          break;
        case 30:
          break;
        default:
          Il(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Lc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Fa(e));
  }
  function Xc(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Fa(t));
  }
  function Ml(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Qr(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function Qr(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ml(
          t,
          l,
          e,
          a
        ), n & 2048 && rn(9, l);
        break;
      case 1:
        Ml(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Ml(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Fa(t)));
        break;
      case 12:
        if (n & 2048) {
          Ml(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var u = l.memoizedProps, i = u.id, f = u.onPostCommit;
            typeof f == "function" && f(
              i,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (d) {
            ot(l, l.return, d);
          }
        } else
          Ml(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Ml(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Ml(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Ml(
          t,
          l,
          e,
          a
        ) : mn(t, l) : u._visibility & 2 ? Ml(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, Ea(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Lc(i, l);
        break;
      case 24:
        Ml(
          t,
          l,
          e,
          a
        ), n & 2048 && Xc(l.alternate, l);
        break;
      default:
        Ml(
          t,
          l,
          e,
          a
        );
    }
  }
  function Ea(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, f = e, d = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ea(
            u,
            i,
            f,
            d,
            n
          ), rn(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Ea(
            u,
            i,
            f,
            d,
            n
          ) : mn(
            u,
            i
          ) : (T._visibility |= 2, Ea(
            u,
            i,
            f,
            d,
            n
          )), n && b & 2048 && Lc(
            i.alternate,
            i
          );
          break;
        case 24:
          Ea(
            u,
            i,
            f,
            d,
            n
          ), n && b & 2048 && Xc(i.alternate, i);
          break;
        default:
          Ea(
            u,
            i,
            f,
            d,
            n
          );
      }
      l = l.sibling;
    }
  }
  function mn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            mn(e, a), n & 2048 && Lc(
              a.alternate,
              a
            );
            break;
          case 24:
            mn(e, a), n & 2048 && Xc(a.alternate, a);
            break;
          default:
            mn(e, a);
        }
        l = l.sibling;
      }
  }
  var hn = 8192;
  function za(t, l, e) {
    if (t.subtreeFlags & hn)
      for (t = t.child; t !== null; )
        Lr(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Lr(t, l, e) {
    switch (t.tag) {
      case 26:
        za(
          t,
          l,
          e
        ), t.flags & hn && t.memoizedState !== null && Zm(
          e,
          Al,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        za(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Al;
        Al = Yu(t.stateNode.containerInfo), za(
          t,
          l,
          e
        ), Al = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = hn, hn = 16777216, za(
          t,
          l,
          e
        ), hn = a) : za(
          t,
          l,
          e
        ));
        break;
      default:
        za(
          t,
          l,
          e
        );
    }
  }
  function Xr(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function vn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Bt = a, Vr(
            a,
            t
          );
        }
      Xr(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Zr(t), t = t.sibling;
  }
  function Zr(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vn(t), t.flags & 2048 && he(9, t, t.return);
        break;
      case 3:
        vn(t);
        break;
      case 12:
        vn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Au(t)) : vn(t);
        break;
      default:
        vn(t);
    }
  }
  function Au(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Bt = a, Vr(
            a,
            t
          );
        }
      Xr(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          he(8, l, l.return), Au(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Au(l));
          break;
        default:
          Au(l);
      }
      t = t.sibling;
    }
  }
  function Vr(t, l) {
    for (; Bt !== null; ) {
      var e = Bt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          he(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Fa(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Bt = a;
      else
        t: for (e = t; Bt !== null; ) {
          a = Bt;
          var n = a.sibling, u = a.return;
          if (Rr(a), a === e) {
            Bt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Bt = n;
            break t;
          }
          Bt = u;
        }
    }
  }
  var nm = {
    getCacheForType: function(t) {
      var l = Lt(Ct), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return Lt(Ct).controller.signal;
    }
  }, um = typeof WeakMap == "function" ? WeakMap : Map, ct = 0, yt = null, F = null, lt = 0, st = 0, ol = null, ve = !1, Ta = !1, Zc = !1, Pl = 0, Tt = 0, ye = 0, Je = 0, Vc = 0, rl = 0, _a = 0, yn = null, ll = null, Kc = !1, Mu = 0, Kr = 0, Ou = 1 / 0, Nu = null, ge = null, Ut = 0, be = null, Aa = null, te = 0, wc = 0, Jc = null, wr = null, gn = 0, kc = null;
  function dl() {
    return (ct & 2) !== 0 && lt !== 0 ? lt & -lt : _.T !== null ? tf() : cs();
  }
  function Jr() {
    if (rl === 0)
      if ((lt & 536870912) === 0 || at) {
        var t = qn;
        qn <<= 1, (qn & 3932160) === 0 && (qn = 262144), rl = t;
      } else rl = 536870912;
    return t = fl.current, t !== null && (t.flags |= 32), rl;
  }
  function el(t, l, e) {
    (t === yt && (st === 2 || st === 9) || t.cancelPendingCommit !== null) && (Ma(t, 0), Se(
      t,
      lt,
      rl,
      !1
    )), Ba(t, e), ((ct & 2) === 0 || t !== yt) && (t === yt && ((ct & 2) === 0 && (Je |= e), Tt === 4 && Se(
      t,
      lt,
      rl,
      !1
    )), Rl(t));
  }
  function kr(t, l, e) {
    if ((ct & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || qa(t, l), n = a ? fm(t, l) : Wc(t, l, !0), u = a;
    do {
      if (n === 0) {
        Ta && !a && Se(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !im(e)) {
          n = Wc(t, l, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = l, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var f = t;
              n = yn;
              var d = f.current.memoizedState.isDehydrated;
              if (d && (Ma(f, i).flags |= 256), i = Wc(
                f,
                i,
                !1
              ), i !== 2) {
                if (Zc && !d) {
                  f.errorRecoveryDisabledLanes |= u, Je |= u, n = 4;
                  break t;
                }
                u = ll, ll = n, u !== null && (ll === null ? ll = u : ll.push.apply(
                  ll,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Ma(t, 0), Se(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              Se(
                a,
                l,
                rl,
                !ve
              );
              break t;
            case 2:
              ll = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && (n = Mu + 300 - al(), 10 < n)) {
            if (Se(
              a,
              l,
              rl,
              !ve
            ), Yn(a, 0, !0) !== 0) break t;
            te = l, a.timeoutHandle = A1(
              $r.bind(
                null,
                a,
                e,
                ll,
                Nu,
                Kc,
                l,
                rl,
                Je,
                _a,
                ve,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          $r(
            a,
            e,
            ll,
            Nu,
            Kc,
            l,
            rl,
            Je,
            _a,
            ve,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Rl(t);
  }
  function $r(t, l, e, a, n, u, i, f, d, b, T, M, S, E) {
    if (t.timeoutHandle = -1, M = l.subtreeFlags, M & 8192 || (M & 16785408) === 16785408) {
      M = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Gl
      }, Lr(
        l,
        u,
        M
      );
      var R = (u & 62914560) === u ? Mu - al() : (u & 4194048) === u ? Kr - al() : 0;
      if (R = Vm(
        M,
        R
      ), R !== null) {
        te = u, t.cancelPendingCommit = R(
          a1.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            i,
            f,
            d,
            T,
            M,
            null,
            S,
            E
          )
        ), Se(t, u, i, !b);
        return;
      }
    }
    a1(
      t,
      l,
      u,
      e,
      a,
      n,
      i,
      f,
      d
    );
  }
  function im(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!il(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function Se(t, l, e, a) {
    l &= ~Vc, l &= ~Je, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - ul(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && ns(t, e, l);
  }
  function Cu() {
    return (ct & 6) === 0 ? (bn(0), !1) : !0;
  }
  function $c() {
    if (F !== null) {
      if (st === 0)
        var t = F.return;
      else
        t = F, Zl = Ye = null, rc(t), ya = null, Pa = 0, t = F;
      for (; t !== null; )
        Mr(t.alternate, t), t = t.return;
      F = null;
    }
  }
  function Ma(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Mm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), te = 0, $c(), yt = t, F = e = Ll(t.current, null), lt = l, st = 0, ol = null, ve = !1, Ta = qa(t, l), Zc = !1, _a = rl = Vc = Je = ye = Tt = 0, ll = yn = null, Kc = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - ul(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return Pl = l, Wn(), e;
  }
  function Wr(t, l) {
    w = null, _.H = fn, l === va || l === nu ? (l = ro(), st = 3) : l === Pi ? (l = ro(), st = 4) : st = l === Oc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, ol = l, F === null && (Tt = 1, bu(
      t,
      yl(l, t.current)
    ));
  }
  function Fr() {
    var t = fl.current;
    return t === null ? !0 : (lt & 4194048) === lt ? pl === null : (lt & 62914560) === lt || (lt & 536870912) !== 0 ? t === pl : !1;
  }
  function Ir() {
    var t = _.H;
    return _.H = fn, t === null ? fn : t;
  }
  function Pr() {
    var t = _.A;
    return _.A = nm, t;
  }
  function xu() {
    Tt = 4, ve || (lt & 4194048) !== lt && fl.current !== null || (Ta = !0), (ye & 134217727) === 0 && (Je & 134217727) === 0 || yt === null || Se(
      yt,
      lt,
      rl,
      !1
    );
  }
  function Wc(t, l, e) {
    var a = ct;
    ct |= 2;
    var n = Ir(), u = Pr();
    (yt !== t || lt !== l) && (Nu = null, Ma(t, l)), l = !1;
    var i = Tt;
    t: do
      try {
        if (st !== 0 && F !== null) {
          var f = F, d = ol;
          switch (st) {
            case 8:
              $c(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              fl.current === null && (l = !0);
              var b = st;
              if (st = 0, ol = null, Oa(t, f, d, b), e && Ta) {
                i = 0;
                break t;
              }
              break;
            default:
              b = st, st = 0, ol = null, Oa(t, f, d, b);
          }
        }
        cm(), i = Tt;
        break;
      } catch (T) {
        Wr(t, T);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Zl = Ye = null, ct = a, _.H = n, _.A = u, F === null && (yt = null, lt = 0, Wn()), i;
  }
  function cm() {
    for (; F !== null; ) t1(F);
  }
  function fm(t, l) {
    var e = ct;
    ct |= 2;
    var a = Ir(), n = Pr();
    yt !== t || lt !== l ? (Nu = null, Ou = al() + 500, Ma(t, l)) : Ta = qa(
      t,
      l
    );
    t: do
      try {
        if (st !== 0 && F !== null) {
          l = F;
          var u = ol;
          l: switch (st) {
            case 1:
              st = 0, ol = null, Oa(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (so(u)) {
                st = 0, ol = null, l1(l);
                break;
              }
              l = function() {
                st !== 2 && st !== 9 || yt !== t || (st = 7), Rl(t);
              }, u.then(l, l);
              break t;
            case 3:
              st = 7;
              break t;
            case 4:
              st = 5;
              break t;
            case 7:
              so(u) ? (st = 0, ol = null, l1(l)) : (st = 0, ol = null, Oa(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (F.tag) {
                case 26:
                  i = F.memoizedState;
                case 5:
                case 27:
                  var f = F;
                  if (i ? Q1(i) : f.stateNode.complete) {
                    st = 0, ol = null;
                    var d = f.sibling;
                    if (d !== null) F = d;
                    else {
                      var b = f.return;
                      b !== null ? (F = b, ju(b)) : F = null;
                    }
                    break l;
                  }
              }
              st = 0, ol = null, Oa(t, l, u, 5);
              break;
            case 6:
              st = 0, ol = null, Oa(t, l, u, 6);
              break;
            case 8:
              $c(), Tt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        sm();
        break;
      } catch (T) {
        Wr(t, T);
      }
    while (!0);
    return Zl = Ye = null, _.H = a, _.A = n, ct = e, F !== null ? 0 : (yt = null, lt = 0, Wn(), Tt);
  }
  function sm() {
    for (; F !== null && !Dd(); )
      t1(F);
  }
  function t1(t) {
    var l = _r(t.alternate, t, Pl);
    t.memoizedProps = t.pendingProps, l === null ? ju(t) : F = l;
  }
  function l1(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = br(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          lt
        );
        break;
      case 11:
        l = br(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          lt
        );
        break;
      case 5:
        rc(l);
      default:
        Mr(e, l), l = F = Is(l, Pl), l = _r(e, l, Pl);
    }
    t.memoizedProps = t.pendingProps, l === null ? ju(t) : F = l;
  }
  function Oa(t, l, e, a) {
    Zl = Ye = null, rc(l), ya = null, Pa = 0;
    var n = l.return;
    try {
      if (F0(
        t,
        n,
        l,
        e,
        lt
      )) {
        Tt = 1, bu(
          t,
          yl(e, t.current)
        ), F = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw F = n, u;
      Tt = 1, bu(
        t,
        yl(e, t.current)
      ), F = null;
      return;
    }
    l.flags & 32768 ? (at || a === 1 ? t = !0 : Ta || (lt & 536870912) !== 0 ? t = !1 : (ve = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = fl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), e1(l, t)) : ju(l);
  }
  function ju(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        e1(
          l,
          ve
        );
        return;
      }
      t = l.return;
      var e = tm(
        l.alternate,
        l,
        Pl
      );
      if (e !== null) {
        F = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        F = l;
        return;
      }
      F = l = t;
    } while (l !== null);
    Tt === 0 && (Tt = 5);
  }
  function e1(t, l) {
    do {
      var e = lm(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, F = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        F = t;
        return;
      }
      F = t = e;
    } while (t !== null);
    Tt = 6, F = null;
  }
  function a1(t, l, e, a, n, u, i, f, d) {
    t.cancelPendingCommit = null;
    do
      Du();
    while (Ut !== 0);
    if ((ct & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (u = l.lanes | l.childLanes, u |= Yi, Xd(
        t,
        e,
        u,
        i,
        f,
        d
      ), t === yt && (F = yt = null, lt = 0), Aa = l, be = t, te = e, wc = u, Jc = n, wr = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, mm(Rn, function() {
        return f1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = D.p, D.p = 2, i = ct, ct |= 4;
        try {
          em(t, l, e);
        } finally {
          ct = i, D.p = n, _.T = a;
        }
      }
      Ut = 1, n1(), u1(), i1();
    }
  }
  function n1() {
    if (Ut === 1) {
      Ut = 0;
      var t = be, l = Aa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = _.T, _.T = null;
        var a = D.p;
        D.p = 2;
        var n = ct;
        ct |= 4;
        try {
          Yr(l, t);
          var u = sf, i = Zs(t.containerInfo), f = u.focusedElem, d = u.selectionRange;
          if (i !== f && f && f.ownerDocument && Xs(
            f.ownerDocument.documentElement,
            f
          )) {
            if (d !== null && Ui(f)) {
              var b = d.start, T = d.end;
              if (T === void 0 && (T = b), "selectionStart" in f)
                f.selectionStart = b, f.selectionEnd = Math.min(
                  T,
                  f.value.length
                );
              else {
                var M = f.ownerDocument || document, S = M && M.defaultView || window;
                if (S.getSelection) {
                  var E = S.getSelection(), R = f.textContent.length, Q = Math.min(d.start, R), ht = d.end === void 0 ? Q : Math.min(d.end, R);
                  !E.extend && Q > ht && (i = ht, ht = Q, Q = i);
                  var y = Ls(
                    f,
                    Q
                  ), m = Ls(
                    f,
                    ht
                  );
                  if (y && m && (E.rangeCount !== 1 || E.anchorNode !== y.node || E.anchorOffset !== y.offset || E.focusNode !== m.node || E.focusOffset !== m.offset)) {
                    var g = M.createRange();
                    g.setStart(y.node, y.offset), E.removeAllRanges(), Q > ht ? (E.addRange(g), E.extend(m.node, m.offset)) : (g.setEnd(m.node, m.offset), E.addRange(g));
                  }
                }
              }
            }
            for (M = [], E = f; E = E.parentNode; )
              E.nodeType === 1 && M.push({
                element: E,
                left: E.scrollLeft,
                top: E.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < M.length; f++) {
              var A = M[f];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          Vu = !!ff, sf = ff = null;
        } finally {
          ct = n, D.p = a, _.T = e;
        }
      }
      t.current = l, Ut = 2;
    }
  }
  function u1() {
    if (Ut === 2) {
      Ut = 0;
      var t = be, l = Aa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = _.T, _.T = null;
        var a = D.p;
        D.p = 2;
        var n = ct;
        ct |= 4;
        try {
          Ur(t, l.alternate, l);
        } finally {
          ct = n, D.p = a, _.T = e;
        }
      }
      Ut = 3;
    }
  }
  function i1() {
    if (Ut === 4 || Ut === 3) {
      Ut = 0, Ud();
      var t = be, l = Aa, e = te, a = wr;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Ut = 5 : (Ut = 0, Aa = be = null, c1(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (ge = null), hi(e), l = l.stateNode, nl && typeof nl.onCommitFiberRoot == "function")
        try {
          nl.onCommitFiberRoot(
            Ha,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = _.T, n = D.p, D.p = 2, _.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          _.T = l, D.p = n;
        }
      }
      (te & 3) !== 0 && Du(), Rl(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === kc ? gn++ : (gn = 0, kc = t) : gn = 0, bn(0);
    }
  }
  function c1(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Fa(l)));
  }
  function Du() {
    return n1(), u1(), i1(), f1();
  }
  function f1() {
    if (Ut !== 5) return !1;
    var t = be, l = wc;
    wc = 0;
    var e = hi(te), a = _.T, n = D.p;
    try {
      D.p = 32 > e ? 32 : e, _.T = null, e = Jc, Jc = null;
      var u = be, i = te;
      if (Ut = 0, Aa = be = null, te = 0, (ct & 6) !== 0) throw Error(s(331));
      var f = ct;
      if (ct |= 4, Zr(u.current), Qr(
        u,
        u.current,
        i,
        e
      ), ct = f, bn(0, !1), nl && typeof nl.onPostCommitFiberRoot == "function")
        try {
          nl.onPostCommitFiberRoot(Ha, u);
        } catch {
        }
      return !0;
    } finally {
      D.p = n, _.T = a, c1(t, l);
    }
  }
  function s1(t, l, e) {
    l = yl(e, l), l = Mc(t.stateNode, l, 2), t = re(t, l, 2), t !== null && (Ba(t, 2), Rl(t));
  }
  function ot(t, l, e) {
    if (t.tag === 3)
      s1(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          s1(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ge === null || !ge.has(a))) {
            t = yl(e, t), e = or(2), a = re(l, e, 2), a !== null && (rr(
              e,
              a,
              l,
              t
            ), Ba(a, 2), Rl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function Fc(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new um();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (Zc = !0, n.add(e), t = om.bind(null, t, l, e), l.then(t, t));
  }
  function om(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, yt === t && (lt & e) === e && (Tt === 4 || Tt === 3 && (lt & 62914560) === lt && 300 > al() - Mu ? (ct & 2) === 0 && Ma(t, 0) : Vc |= e, _a === lt && (_a = 0)), Rl(t);
  }
  function o1(t, l) {
    l === 0 && (l = as()), t = He(t, l), t !== null && (Ba(t, l), Rl(t));
  }
  function rm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), o1(t, e);
  }
  function dm(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(l), o1(t, e);
  }
  function mm(t, l) {
    return oi(t, l);
  }
  var Uu = null, Na = null, Ic = !1, Ru = !1, Pc = !1, pe = 0;
  function Rl(t) {
    t !== Na && t.next === null && (Na === null ? Uu = Na = t : Na = Na.next = t), Ru = !0, Ic || (Ic = !0, vm());
  }
  function bn(t, l) {
    if (!Pc && Ru) {
      Pc = !0;
      do
        for (var e = !1, a = Uu; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - ul(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, h1(a, u));
          } else
            u = lt, u = Yn(
              a,
              a === yt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || qa(a, u) || (e = !0, h1(a, u));
          a = a.next;
        }
      while (e);
      Pc = !1;
    }
  }
  function hm() {
    r1();
  }
  function r1() {
    Ru = Ic = !1;
    var t = 0;
    pe !== 0 && Am() && (t = pe);
    for (var l = al(), e = null, a = Uu; a !== null; ) {
      var n = a.next, u = d1(a, l);
      u === 0 ? (a.next = null, e === null ? Uu = n : e.next = n, n === null && (Na = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (Ru = !0)), a = n;
    }
    Ut !== 0 && Ut !== 5 || bn(t), pe !== 0 && (pe = 0);
  }
  function d1(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - ul(u), f = 1 << i, d = n[i];
      d === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = Ld(f, l)) : d <= l && (t.expiredLanes |= f), u &= ~f;
    }
    if (l = yt, e = lt, e = Yn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (st === 2 || st === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && ri(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || qa(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && ri(a), hi(e)) {
        case 2:
        case 8:
          e = ls;
          break;
        case 32:
          e = Rn;
          break;
        case 268435456:
          e = es;
          break;
        default:
          e = Rn;
      }
      return a = m1.bind(null, t), e = oi(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && ri(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function m1(t, l) {
    if (Ut !== 0 && Ut !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Du() && t.callbackNode !== e)
      return null;
    var a = lt;
    return a = Yn(
      t,
      t === yt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (kr(t, a, l), d1(t, al()), t.callbackNode != null && t.callbackNode === e ? m1.bind(null, t) : null);
  }
  function h1(t, l) {
    if (Du()) return null;
    kr(t, l, !0);
  }
  function vm() {
    Om(function() {
      (ct & 6) !== 0 ? oi(
        ts,
        hm
      ) : r1();
    });
  }
  function tf() {
    if (pe === 0) {
      var t = ma;
      t === 0 && (t = Hn, Hn <<= 1, (Hn & 261888) === 0 && (Hn = 256)), pe = t;
    }
    return pe;
  }
  function v1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Xn("" + t);
  }
  function y1(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function ym(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = v1(
        (n[Wt] || null).action
      ), i = a.submitter;
      i && (l = (l = i[Wt] || null) ? v1(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var f = new wn(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (pe !== 0) {
                  var d = i ? y1(n, i) : new FormData(n);
                  pc(
                    e,
                    {
                      pending: !0,
                      data: d,
                      method: n.method,
                      action: u
                    },
                    null,
                    d
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), d = i ? y1(n, i) : new FormData(n), pc(
                  e,
                  {
                    pending: !0,
                    data: d,
                    method: n.method,
                    action: u
                  },
                  u,
                  d
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var lf = 0; lf < Bi.length; lf++) {
    var ef = Bi[lf], gm = ef.toLowerCase(), bm = ef[0].toUpperCase() + ef.slice(1);
    _l(
      gm,
      "on" + bm
    );
  }
  _l(ws, "onAnimationEnd"), _l(Js, "onAnimationIteration"), _l(ks, "onAnimationStart"), _l("dblclick", "onDoubleClick"), _l("focusin", "onFocus"), _l("focusout", "onBlur"), _l(R0, "onTransitionRun"), _l(H0, "onTransitionStart"), _l(q0, "onTransitionCancel"), _l($s, "onTransitionEnd"), Pe("onMouseEnter", ["mouseout", "mouseover"]), Pe("onMouseLeave", ["mouseout", "mouseover"]), Pe("onPointerEnter", ["pointerout", "pointerover"]), Pe("onPointerLeave", ["pointerout", "pointerover"]), je(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), je(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), je("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), je(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), je(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), je(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Sn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sn)
  );
  function g1(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], d = f.instance, b = f.currentTarget;
            if (f = f.listener, d !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (T) {
              $n(T);
            }
            n.currentTarget = null, u = d;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], d = f.instance, b = f.currentTarget, f = f.listener, d !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (T) {
              $n(T);
            }
            n.currentTarget = null, u = d;
          }
      }
    }
  }
  function I(t, l) {
    var e = l[vi];
    e === void 0 && (e = l[vi] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (b1(l, t, 2, !1), e.add(a));
  }
  function af(t, l, e) {
    var a = 0;
    l && (a |= 4), b1(
      e,
      t,
      a,
      l
    );
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function nf(t) {
    if (!t[Hu]) {
      t[Hu] = !0, os.forEach(function(e) {
        e !== "selectionchange" && (Sm.has(e) || af(e, !1, t), af(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Hu] || (l[Hu] = !0, af("selectionchange", !1, l));
    }
  }
  function b1(t, l, e, a) {
    switch (J1(l)) {
      case 2:
        var n = Jm;
        break;
      case 8:
        n = km;
        break;
      default:
        n = pf;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !_i || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function uf(t, l, e, a, n) {
    var u = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = We(f), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    zs(function() {
      var b = u, T = zi(e), M = [];
      t: {
        var S = Ws.get(t);
        if (S !== void 0) {
          var E = wn, R = t;
          switch (t) {
            case "keypress":
              if (Vn(e) === 0) break t;
            case "keydown":
            case "keyup":
              E = d0;
              break;
            case "focusin":
              R = "focus", E = Ni;
              break;
            case "focusout":
              R = "blur", E = Ni;
              break;
            case "beforeblur":
            case "afterblur":
              E = Ni;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              E = As;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              E = t0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              E = v0;
              break;
            case ws:
            case Js:
            case ks:
              E = a0;
              break;
            case $s:
              E = g0;
              break;
            case "scroll":
            case "scrollend":
              E = Id;
              break;
            case "wheel":
              E = S0;
              break;
            case "copy":
            case "cut":
            case "paste":
              E = u0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              E = Os;
              break;
            case "toggle":
            case "beforetoggle":
              E = E0;
          }
          var Q = (l & 4) !== 0, ht = !Q && (t === "scroll" || t === "scrollend"), y = Q ? S !== null ? S + "Capture" : null : S;
          Q = [];
          for (var m = b, g; m !== null; ) {
            var A = m;
            if (g = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || g === null || y === null || (A = Qa(m, y), A != null && Q.push(
              pn(m, A, g)
            )), ht) break;
            m = m.return;
          }
          0 < Q.length && (S = new E(
            S,
            R,
            null,
            e,
            T
          ), M.push({ event: S, listeners: Q }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (S = t === "mouseover" || t === "pointerover", E = t === "mouseout" || t === "pointerout", S && e !== Ei && (R = e.relatedTarget || e.fromElement) && (We(R) || R[$e]))
            break t;
          if ((E || S) && (S = T.window === T ? T : (S = T.ownerDocument) ? S.defaultView || S.parentWindow : window, E ? (R = e.relatedTarget || e.toElement, E = b, R = R ? We(R) : null, R !== null && (ht = N(R), Q = R.tag, R !== ht || Q !== 5 && Q !== 27 && Q !== 6) && (R = null)) : (E = null, R = b), E !== R)) {
            if (Q = As, A = "onMouseLeave", y = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && (Q = Os, A = "onPointerLeave", y = "onPointerEnter", m = "pointer"), ht = E == null ? S : Ga(E), g = R == null ? S : Ga(R), S = new Q(
              A,
              m + "leave",
              E,
              e,
              T
            ), S.target = ht, S.relatedTarget = g, A = null, We(T) === b && (Q = new Q(
              y,
              m + "enter",
              R,
              e,
              T
            ), Q.target = g, Q.relatedTarget = ht, A = Q), ht = A, E && R)
              l: {
                for (Q = pm, y = E, m = R, g = 0, A = y; A; A = Q(A))
                  g++;
                A = 0;
                for (var G = m; G; G = Q(G))
                  A++;
                for (; 0 < g - A; )
                  y = Q(y), g--;
                for (; 0 < A - g; )
                  m = Q(m), A--;
                for (; g--; ) {
                  if (y === m || m !== null && y === m.alternate) {
                    Q = y;
                    break l;
                  }
                  y = Q(y), m = Q(m);
                }
                Q = null;
              }
            else Q = null;
            E !== null && S1(
              M,
              S,
              E,
              Q,
              !1
            ), R !== null && ht !== null && S1(
              M,
              ht,
              R,
              Q,
              !0
            );
          }
        }
        t: {
          if (S = b ? Ga(b) : window, E = S.nodeName && S.nodeName.toLowerCase(), E === "select" || E === "input" && S.type === "file")
            var ut = Hs;
          else if (Us(S))
            if (qs)
              ut = j0;
            else {
              ut = C0;
              var q = N0;
            }
          else
            E = S.nodeName, !E || E.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? b && pi(b.elementType) && (ut = Hs) : ut = x0;
          if (ut && (ut = ut(t, b))) {
            Rs(
              M,
              ut,
              e,
              T
            );
            break t;
          }
          q && q(t, S, b), t === "focusout" && b && S.type === "number" && b.memoizedProps.value != null && Si(S, "number", S.value);
        }
        switch (q = b ? Ga(b) : window, t) {
          case "focusin":
            (Us(q) || q.contentEditable === "true") && (ua = q, Ri = b, ka = null);
            break;
          case "focusout":
            ka = Ri = ua = null;
            break;
          case "mousedown":
            Hi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Hi = !1, Vs(M, e, T);
            break;
          case "selectionchange":
            if (U0) break;
          case "keydown":
          case "keyup":
            Vs(M, e, T);
        }
        var J;
        if (xi)
          t: {
            switch (t) {
              case "compositionstart":
                var et = "onCompositionStart";
                break t;
              case "compositionend":
                et = "onCompositionEnd";
                break t;
              case "compositionupdate":
                et = "onCompositionUpdate";
                break t;
            }
            et = void 0;
          }
        else
          na ? js(t, e) && (et = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (et = "onCompositionStart");
        et && (Ns && e.locale !== "ko" && (na || et !== "onCompositionStart" ? et === "onCompositionEnd" && na && (J = Ts()) : (ne = T, Ai = "value" in ne ? ne.value : ne.textContent, na = !0)), q = qu(b, et), 0 < q.length && (et = new Ms(
          et,
          t,
          null,
          e,
          T
        ), M.push({ event: et, listeners: q }), J ? et.data = J : (J = Ds(e), J !== null && (et.data = J)))), (J = T0 ? _0(t, e) : A0(t, e)) && (et = qu(b, "onBeforeInput"), 0 < et.length && (q = new Ms(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), M.push({
          event: q,
          listeners: et
        }), q.data = J)), ym(
          M,
          t,
          b,
          e,
          T
        );
      }
      g1(M, l);
    });
  }
  function pn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function qu(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Qa(t, e), n != null && a.unshift(
        pn(t, n, u)
      ), n = Qa(t, l), n != null && a.push(
        pn(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function pm(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function S1(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var f = e, d = f.alternate, b = f.stateNode;
      if (f = f.tag, d !== null && d === a) break;
      f !== 5 && f !== 26 && f !== 27 || b === null || (d = b, n ? (b = Qa(e, u), b != null && i.unshift(
        pn(e, b, d)
      )) : n || (b = Qa(e, u), b != null && i.push(
        pn(e, b, d)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Em = /\r\n?/g, zm = /\u0000|\uFFFD/g;
  function p1(t) {
    return (typeof t == "string" ? t : "" + t).replace(Em, `
`).replace(zm, "");
  }
  function E1(t, l) {
    return l = p1(l), p1(t) === l;
  }
  function mt(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || la(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && la(t, "" + a);
        break;
      case "className":
        Qn(t, "class", a);
        break;
      case "tabIndex":
        Qn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Qn(t, e, a);
        break;
      case "style":
        ps(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Qn(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Xn("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (l !== "input" && mt(t, l, "name", n.name, n, null), mt(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), mt(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), mt(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (mt(t, l, "encType", n.encType, n, null), mt(t, l, "method", n.method, n, null), mt(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Xn("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Gl);
        break;
      case "onScroll":
        a != null && I("scroll", t);
        break;
      case "onScrollEnd":
        a != null && I("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
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
          t.removeAttribute("xlink:href");
          break;
        }
        e = Xn("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        I("beforetoggle", t), I("toggle", t), Gn(t, "popover", a);
        break;
      case "xlinkActuate":
        Yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Yl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Yl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Yl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Yl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Gn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Wd.get(e) || e, Gn(t, e, a));
    }
  }
  function cf(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        ps(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? la(t, a) : (typeof a == "number" || typeof a == "bigint") && la(t, "" + a);
        break;
      case "onScroll":
        a != null && I("scroll", t);
        break;
      case "onScrollEnd":
        a != null && I("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Gl);
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
        if (!rs.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[Wt] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Gn(t, e, a);
          }
    }
  }
  function Zt(t, l, e) {
    switch (l) {
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
        I("error", t), I("load", t);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, l));
                default:
                  mt(t, l, u, i, e, null);
              }
          }
        n && mt(t, l, "srcSet", e.srcSet, e, null), a && mt(t, l, "src", e.src, e, null);
        return;
      case "input":
        I("invalid", t);
        var f = u = i = n = null, d = null, b = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  n = T;
                  break;
                case "type":
                  i = T;
                  break;
                case "checked":
                  d = T;
                  break;
                case "defaultChecked":
                  b = T;
                  break;
                case "value":
                  u = T;
                  break;
                case "defaultValue":
                  f = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(s(137, l));
                  break;
                default:
                  mt(t, l, a, T, e, null);
              }
          }
        ys(
          t,
          u,
          f,
          d,
          b,
          i,
          n,
          !1
        );
        return;
      case "select":
        I("invalid", t), a = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (f = e[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                mt(t, l, n, f, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? ta(t, !!a, l, !1) : e != null && ta(t, !!a, e, !0);
        return;
      case "textarea":
        I("invalid", t), u = n = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (f = e[i], f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(s(91));
                break;
              default:
                mt(t, l, i, f, e, null);
            }
        bs(t, a, n, u);
        return;
      case "option":
        for (d in e)
          if (e.hasOwnProperty(d) && (a = e[d], a != null))
            switch (d) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                mt(t, l, d, a, e, null);
            }
        return;
      case "dialog":
        I("beforetoggle", t), I("toggle", t), I("cancel", t), I("close", t);
        break;
      case "iframe":
      case "object":
        I("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Sn.length; a++)
          I(Sn[a], t);
        break;
      case "image":
        I("error", t), I("load", t);
        break;
      case "details":
        I("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        I("error", t), I("load", t);
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
        for (b in e)
          if (e.hasOwnProperty(b) && (a = e[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                mt(t, l, b, a, e, null);
            }
        return;
      default:
        if (pi(l)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && cf(
              t,
              l,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (f in e)
      e.hasOwnProperty(f) && (a = e[f], a != null && mt(t, l, f, a, e, null));
  }
  function Tm(t, l, e, a) {
    switch (l) {
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
        var n = null, u = null, i = null, f = null, d = null, b = null, T = null;
        for (E in e) {
          var M = e[E];
          if (e.hasOwnProperty(E) && M != null)
            switch (E) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = M;
              default:
                a.hasOwnProperty(E) || mt(t, l, E, null, a, M);
            }
        }
        for (var S in a) {
          var E = a[S];
          if (M = e[S], a.hasOwnProperty(S) && (E != null || M != null))
            switch (S) {
              case "type":
                u = E;
                break;
              case "name":
                n = E;
                break;
              case "checked":
                b = E;
                break;
              case "defaultChecked":
                T = E;
                break;
              case "value":
                i = E;
                break;
              case "defaultValue":
                f = E;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(s(137, l));
                break;
              default:
                E !== M && mt(
                  t,
                  l,
                  S,
                  E,
                  a,
                  M
                );
            }
        }
        bi(
          t,
          i,
          f,
          d,
          b,
          T,
          u,
          n
        );
        return;
      case "select":
        E = i = f = S = null;
        for (u in e)
          if (d = e[u], e.hasOwnProperty(u) && d != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                E = d;
              default:
                a.hasOwnProperty(u) || mt(
                  t,
                  l,
                  u,
                  null,
                  a,
                  d
                );
            }
        for (n in a)
          if (u = a[n], d = e[n], a.hasOwnProperty(n) && (u != null || d != null))
            switch (n) {
              case "value":
                S = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== d && mt(
                  t,
                  l,
                  n,
                  u,
                  a,
                  d
                );
            }
        l = f, e = i, a = E, S != null ? ta(t, !!e, S, !1) : !!a != !!e && (l != null ? ta(t, !!e, l, !0) : ta(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        E = S = null;
        for (f in e)
          if (n = e[f], e.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                mt(t, l, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                S = n;
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
                n !== u && mt(t, l, i, n, a, u);
            }
        gs(t, S, E);
        return;
      case "option":
        for (var R in e)
          if (S = e[R], e.hasOwnProperty(R) && S != null && !a.hasOwnProperty(R))
            switch (R) {
              case "selected":
                t.selected = !1;
                break;
              default:
                mt(
                  t,
                  l,
                  R,
                  null,
                  a,
                  S
                );
            }
        for (d in a)
          if (S = a[d], E = e[d], a.hasOwnProperty(d) && S !== E && (S != null || E != null))
            switch (d) {
              case "selected":
                t.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                mt(
                  t,
                  l,
                  d,
                  S,
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
        for (var Q in e)
          S = e[Q], e.hasOwnProperty(Q) && S != null && !a.hasOwnProperty(Q) && mt(t, l, Q, null, a, S);
        for (b in a)
          if (S = a[b], E = e[b], a.hasOwnProperty(b) && S !== E && (S != null || E != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(s(137, l));
                break;
              default:
                mt(
                  t,
                  l,
                  b,
                  S,
                  a,
                  E
                );
            }
        return;
      default:
        if (pi(l)) {
          for (var ht in e)
            S = e[ht], e.hasOwnProperty(ht) && S !== void 0 && !a.hasOwnProperty(ht) && cf(
              t,
              l,
              ht,
              void 0,
              a,
              S
            );
          for (T in a)
            S = a[T], E = e[T], !a.hasOwnProperty(T) || S === E || S === void 0 && E === void 0 || cf(
              t,
              l,
              T,
              S,
              a,
              E
            );
          return;
        }
    }
    for (var y in e)
      S = e[y], e.hasOwnProperty(y) && S != null && !a.hasOwnProperty(y) && mt(t, l, y, null, a, S);
    for (M in a)
      S = a[M], E = e[M], !a.hasOwnProperty(M) || S === E || S == null && E == null || mt(t, l, M, S, a, E);
  }
  function z1(t) {
    switch (t) {
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
  function _m() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && z1(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var d = e[a], b = d.startTime;
            if (b > f) break;
            var T = d.transferSize, M = d.initiatorType;
            T && z1(M) && (d = d.responseEnd, i += T * (d < f ? 1 : (f - b) / (d - b)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var ff = null, sf = null;
  function Bu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function T1(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _1(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function of(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var rf = null;
  function Am() {
    var t = window.event;
    return t && t.type === "popstate" ? t === rf ? !1 : (rf = t, !0) : (rf = null, !1);
  }
  var A1 = typeof setTimeout == "function" ? setTimeout : void 0, Mm = typeof clearTimeout == "function" ? clearTimeout : void 0, M1 = typeof Promise == "function" ? Promise : void 0, Om = typeof queueMicrotask == "function" ? queueMicrotask : typeof M1 < "u" ? function(t) {
    return M1.resolve(null).then(t).catch(Nm);
  } : A1;
  function Nm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ee(t) {
    return t === "head";
  }
  function O1(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Da(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          En(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, En(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[Ya] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && En(t.ownerDocument.body);
      e = n;
    } while (e);
    Da(l);
  }
  function N1(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function df(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          df(e), yi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function Cm(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Ya])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = El(t.nextSibling), t === null) break;
    }
    return null;
  }
  function xm(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = El(t.nextSibling), t === null)) return null;
    return t;
  }
  function C1(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = El(t.nextSibling), t === null)) return null;
    return t;
  }
  function mf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function hf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function jm(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function El(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var vf = null;
  function x1(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return El(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function j1(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function D1(t, l, e) {
    switch (l = Bu(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function En(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    yi(t);
  }
  var zl = /* @__PURE__ */ new Map(), U1 = /* @__PURE__ */ new Set();
  function Yu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var le = D.d;
  D.d = {
    f: Dm,
    r: Um,
    D: Rm,
    C: Hm,
    L: qm,
    m: Bm,
    X: Gm,
    S: Ym,
    M: Qm
  };
  function Dm() {
    var t = le.f(), l = Cu();
    return t || l;
  }
  function Um(t) {
    var l = Fe(t);
    l !== null && l.tag === 5 && l.type === "form" ? Wo(l) : le.r(t);
  }
  var Ca = typeof document > "u" ? null : document;
  function R1(t, l, e) {
    var a = Ca;
    if (a && typeof l == "string" && l) {
      var n = hl(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), U1.has(n) || (U1.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), Zt(l, "link", t), qt(l), a.head.appendChild(l)));
    }
  }
  function Rm(t) {
    le.D(t), R1("dns-prefetch", t, null);
  }
  function Hm(t, l) {
    le.C(t, l), R1("preconnect", t, l);
  }
  function qm(t, l, e) {
    le.L(t, l, e);
    var a = Ca;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + hl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + hl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + hl(
        e.imageSizes
      ) + '"]')) : n += '[href="' + hl(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = xa(t);
          break;
        case "script":
          u = ja(t);
      }
      zl.has(u) || (t = B(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), zl.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(zn(u)) || l === "script" && a.querySelector(Tn(u)) || (l = a.createElement("link"), Zt(l, "link", t), qt(l), a.head.appendChild(l)));
    }
  }
  function Bm(t, l) {
    le.m(t, l);
    var e = Ca;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + hl(a) + '"][href="' + hl(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = ja(t);
      }
      if (!zl.has(u) && (t = B({ rel: "modulepreload", href: t }, l), zl.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Tn(u)))
              return;
        }
        a = e.createElement("link"), Zt(a, "link", t), qt(a), e.head.appendChild(a);
      }
    }
  }
  function Ym(t, l, e) {
    le.S(t, l, e);
    var a = Ca;
    if (a && t) {
      var n = Ie(a).hoistableStyles, u = xa(t);
      l = l || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          zn(u)
        ))
          f.loading = 5;
        else {
          t = B(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = zl.get(u)) && yf(t, e);
          var d = i = a.createElement("link");
          qt(d), Zt(d, "link", t), d._p = new Promise(function(b, T) {
            d.onload = b, d.onerror = T;
          }), d.addEventListener("load", function() {
            f.loading |= 1;
          }), d.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, Gu(i, l, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: f
        }, n.set(u, i);
      }
    }
  }
  function Gm(t, l) {
    le.X(t, l);
    var e = Ca;
    if (e && t) {
      var a = Ie(e).hoistableScripts, n = ja(t), u = a.get(n);
      u || (u = e.querySelector(Tn(n)), u || (t = B({ src: t, async: !0 }, l), (l = zl.get(n)) && gf(t, l), u = e.createElement("script"), qt(u), Zt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Qm(t, l) {
    le.M(t, l);
    var e = Ca;
    if (e && t) {
      var a = Ie(e).hoistableScripts, n = ja(t), u = a.get(n);
      u || (u = e.querySelector(Tn(n)), u || (t = B({ src: t, async: !0, type: "module" }, l), (l = zl.get(n)) && gf(t, l), u = e.createElement("script"), qt(u), Zt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function H1(t, l, e, a) {
    var n = (n = W.current) ? Yu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = xa(e.href), e = Ie(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = xa(e.href);
          var u = Ie(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            zn(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), zl.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, zl.set(t, e), u || Lm(
            n,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = ja(e), e = Ie(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function xa(t) {
    return 'href="' + hl(t) + '"';
  }
  function zn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function q1(t) {
    return B({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Lm(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), Zt(l, "link", e), qt(l), t.head.appendChild(l));
  }
  function ja(t) {
    return '[src="' + hl(t) + '"]';
  }
  function Tn(t) {
    return "script[async]" + t;
  }
  function B1(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + hl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, qt(a), a;
          var n = B({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), qt(a), Zt(a, "style", n), Gu(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = xa(e.href);
          var u = t.querySelector(
            zn(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, qt(u), u;
          a = q1(e), (n = zl.get(n)) && yf(a, n), u = (t.ownerDocument || t).createElement("link"), qt(u);
          var i = u;
          return i._p = new Promise(function(f, d) {
            i.onload = f, i.onerror = d;
          }), Zt(u, "link", a), l.state.loading |= 4, Gu(u, e.precedence, t), l.instance = u;
        case "script":
          return u = ja(e.src), (n = t.querySelector(
            Tn(u)
          )) ? (l.instance = n, qt(n), n) : (a = e, (n = zl.get(u)) && (a = B({}, e), gf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), qt(n), Zt(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Gu(a, e.precedence, t));
    return l.instance;
  }
  function Gu(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === l) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function yf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function gf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Qu = null;
  function Y1(t, l, e) {
    if (Qu === null) {
      var a = /* @__PURE__ */ new Map(), n = Qu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Qu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Ya] || u[Gt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function G1(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Xm(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function Q1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Zm(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = xa(a.href), u = l.querySelector(
          zn(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Lu.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, qt(u);
          return;
        }
        u = l.ownerDocument || l, a = q1(a), (n = zl.get(n)) && yf(a, n), u = u.createElement("link"), qt(u);
        var i = u;
        i._p = new Promise(function(f, d) {
          i.onload = f, i.onerror = d;
        }), Zt(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Lu.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var bf = 0;
  function Vm(t, l) {
    return t.stylesheets && t.count === 0 && Zu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Zu(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && bf === 0 && (bf = 62500 * _m());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Zu(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > bf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Lu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Zu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Xu = null;
  function Zu(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Xu = /* @__PURE__ */ new Map(), l.forEach(Km, t), Xu = null, Lu.call(t));
  }
  function Km(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Xu.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Xu.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = Lu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var _n = {
    $$typeof: Rt,
    Provider: null,
    Consumer: null,
    _currentValue: L,
    _currentValue2: L,
    _threadCount: 0
  };
  function wm(t, l, e, a, n, u, i, f, d) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = di(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = di(0), this.hiddenUpdates = di(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = d, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function L1(t, l, e, a, n, u, i, f, d, b, T, M) {
    return t = new wm(
      t,
      l,
      e,
      i,
      d,
      b,
      T,
      M,
      f
    ), l = 1, u === !0 && (l |= 24), u = cl(3, null, null, l), t.current = u, u.stateNode = t, l = Wi(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, tc(u), t;
  }
  function X1(t) {
    return t ? (t = fa, t) : fa;
  }
  function Z1(t, l, e, a, n, u) {
    n = X1(n), a.context === null ? a.context = n : a.pendingContext = n, a = oe(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = re(t, a, l), e !== null && (el(e, t, l), ln(e, t, l));
  }
  function V1(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Sf(t, l) {
    V1(t, l), (t = t.alternate) && V1(t, l);
  }
  function K1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = He(t, 67108864);
      l !== null && el(l, t, 67108864), Sf(t, 67108864);
    }
  }
  function w1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = dl();
      l = mi(l);
      var e = He(t, l);
      e !== null && el(e, t, l), Sf(t, l);
    }
  }
  var Vu = !0;
  function Jm(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = D.p;
    try {
      D.p = 2, pf(t, l, e, a);
    } finally {
      D.p = u, _.T = n;
    }
  }
  function km(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = D.p;
    try {
      D.p = 8, pf(t, l, e, a);
    } finally {
      D.p = u, _.T = n;
    }
  }
  function pf(t, l, e, a) {
    if (Vu) {
      var n = Ef(a);
      if (n === null)
        uf(
          t,
          l,
          a,
          Ku,
          e
        ), k1(t, a);
      else if (Wm(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (k1(t, a), l & 4 && -1 < $m.indexOf(t)) {
        for (; n !== null; ) {
          var u = Fe(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = xe(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - ul(i);
                      f.entanglements[1] |= d, i &= ~d;
                    }
                    Rl(u), (ct & 6) === 0 && (Ou = al() + 500, bn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = He(u, 2), f !== null && el(f, u, 2), Cu(), Sf(u, 2);
            }
          if (u = Ef(a), u === null && uf(
            t,
            l,
            a,
            Ku,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        uf(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Ef(t) {
    return t = zi(t), zf(t);
  }
  var Ku = null;
  function zf(t) {
    if (Ku = null, t = We(t), t !== null) {
      var l = N(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = x(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = j(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Ku = t, null;
  }
  function J1(t) {
    switch (t) {
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
        switch (Rd()) {
          case ts:
            return 2;
          case ls:
            return 8;
          case Rn:
          case Hd:
            return 32;
          case es:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Tf = !1, ze = null, Te = null, _e = null, An = /* @__PURE__ */ new Map(), Mn = /* @__PURE__ */ new Map(), Ae = [], $m = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function k1(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        ze = null;
        break;
      case "dragenter":
      case "dragleave":
        Te = null;
        break;
      case "mouseover":
      case "mouseout":
        _e = null;
        break;
      case "pointerover":
      case "pointerout":
        An.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mn.delete(l.pointerId);
    }
  }
  function On(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = Fe(l), l !== null && K1(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function Wm(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return ze = On(
          ze,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Te = On(
          Te,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return _e = On(
          _e,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return An.set(
          u,
          On(
            An.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Mn.set(
          u,
          On(
            Mn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function $1(t) {
    var l = We(t.target);
    if (l !== null) {
      var e = N(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = x(e), l !== null) {
            t.blockedOn = l, fs(t.priority, function() {
              w1(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = j(e), l !== null) {
            t.blockedOn = l, fs(t.priority, function() {
              w1(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function wu(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Ef(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ei = a, e.target.dispatchEvent(a), Ei = null;
      } else
        return l = Fe(e), l !== null && K1(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function W1(t, l, e) {
    wu(t) && e.delete(l);
  }
  function Fm() {
    Tf = !1, ze !== null && wu(ze) && (ze = null), Te !== null && wu(Te) && (Te = null), _e !== null && wu(_e) && (_e = null), An.forEach(W1), Mn.forEach(W1);
  }
  function Ju(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Tf || (Tf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      Fm
    )));
  }
  var ku = null;
  function F1(t) {
    ku !== t && (ku = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        ku === t && (ku = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (zf(a || e) === null)
              continue;
            break;
          }
          var u = Fe(e);
          u !== null && (t.splice(l, 3), l -= 3, pc(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Da(t) {
    function l(d) {
      return Ju(d, t);
    }
    ze !== null && Ju(ze, t), Te !== null && Ju(Te, t), _e !== null && Ju(_e, t), An.forEach(l), Mn.forEach(l);
    for (var e = 0; e < Ae.length; e++) {
      var a = Ae[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ae.length && (e = Ae[0], e.blockedOn === null); )
      $1(e), e.blockedOn === null && Ae.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[Wt] || null;
        if (typeof u == "function")
          i || F1(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[Wt] || null)
              f = i.formAction;
            else if (zf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), F1(e);
        }
      }
  }
  function I1() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
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
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), n !== null && (n(), n = null);
      };
    }
  }
  function _f(t) {
    this._internalRoot = t;
  }
  $u.prototype.render = _f.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = dl();
    Z1(e, a, t, l, null, null);
  }, $u.prototype.unmount = _f.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      Z1(t.current, 2, null, t, null, null), Cu(), l[$e] = null;
    }
  };
  function $u(t) {
    this._internalRoot = t;
  }
  $u.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = cs();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ae.length && l !== 0 && l < Ae[e].priority; e++) ;
      Ae.splice(e, 0, t), e === 0 && $1(t);
    }
  };
  var P1 = r.version;
  if (P1 !== "19.2.3")
    throw Error(
      s(
        527,
        P1,
        "19.2.3"
      )
    );
  D.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = z(l), t = t !== null ? Y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Im = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wu.isDisabled && Wu.supportsFiber)
      try {
        Ha = Wu.inject(
          Im
        ), nl = Wu;
      } catch {
      }
  }
  return Nn.createRoot = function(t, l) {
    if (!p(t)) throw Error(s(299));
    var e = !1, a = "", n = ir, u = cr, i = fr;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = L1(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      i,
      I1
    ), t[$e] = l.current, nf(t), new _f(l);
  }, Nn.hydrateRoot = function(t, l, e) {
    if (!p(t)) throw Error(s(299));
    var a = !1, n = "", u = ir, i = cr, f = fr, d = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (d = e.formState)), l = L1(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      d,
      u,
      i,
      f,
      I1
    ), l.context = X1(null), e = l.current, a = dl(), a = mi(a), n = oe(a), n.callback = null, re(e, n, a), e = a, l.current.lanes = e, Ba(l, e), Rl(l), t[$e] = l.current, nf(t), new $u(l);
  }, Nn.version = "19.2.3", Nn;
}
var cd;
function ch() {
  if (cd) return Mf.exports;
  cd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), Mf.exports = ih(), Mf.exports;
}
var fh = ch();
const sh = /* @__PURE__ */ pd(fh);
var xf = { exports: {} }, Cn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fd;
function oh() {
  if (fd) return Cn;
  fd = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function o(s, p, N) {
    var x = null;
    if (N !== void 0 && (x = "" + N), p.key !== void 0 && (x = "" + p.key), "key" in p) {
      N = {};
      for (var j in p)
        j !== "key" && (N[j] = p[j]);
    } else N = p;
    return p = N.ref, {
      $$typeof: c,
      type: s,
      key: x,
      ref: p !== void 0 ? p : null,
      props: N
    };
  }
  return Cn.Fragment = r, Cn.jsx = o, Cn.jsxs = o, Cn;
}
var sd;
function rh() {
  return sd || (sd = 1, xf.exports = oh()), xf.exports;
}
var v = rh();
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dh = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), mh = (c) => c.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (r, o, s) => s ? s.toUpperCase() : o.toLowerCase()
), od = (c) => {
  const r = mh(c);
  return r.charAt(0).toUpperCase() + r.slice(1);
}, Ed = (...c) => c.filter((r, o, s) => !!r && r.trim() !== "" && s.indexOf(r) === o).join(" ").trim(), hh = (c) => {
  for (const r in c)
    if (r.startsWith("aria-") || r === "role" || r === "title")
      return !0;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var vh = {
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
const yh = V.forwardRef(
  ({
    color: c = "currentColor",
    size: r = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: s,
    className: p = "",
    children: N,
    iconNode: x,
    ...j
  }, C) => V.createElement(
    "svg",
    {
      ref: C,
      ...vh,
      width: r,
      height: r,
      stroke: c,
      strokeWidth: s ? Number(o) * 24 / Number(r) : o,
      className: Ed("lucide", p),
      ...!N && !hh(j) && { "aria-hidden": "true" },
      ...j
    },
    [
      ...x.map(([z, Y]) => V.createElement(z, Y)),
      ...Array.isArray(N) ? N : [N]
    ]
  )
);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pt = (c, r) => {
  const o = V.forwardRef(
    ({ className: s, ...p }, N) => V.createElement(yh, {
      ref: N,
      iconNode: r,
      className: Ed(
        `lucide-${dh(od(c))}`,
        `lucide-${c}`,
        s
      ),
      ...p
    })
  );
  return o.displayName = od(c), o;
};
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gh = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
], bh = pt("arrow-down-to-line", gh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [
  ["path", { d: "M12 18V5", key: "adv99a" }],
  ["path", { d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4", key: "1e3is1" }],
  ["path", { d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5", key: "1gqd8o" }],
  ["path", { d: "M17.997 5.125a4 4 0 0 1 2.526 5.77", key: "iwvgf7" }],
  ["path", { d: "M18 18a4 4 0 0 0 2-7.464", key: "efp6ie" }],
  ["path", { d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517", key: "1gq6am" }],
  ["path", { d: "M6 18a4 4 0 0 1-2-7.464", key: "k1g0md" }],
  ["path", { d: "M6.003 5.125a4 4 0 0 0-2.526 5.77", key: "q97ue3" }]
], wf = pt("brain", Sh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ph = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Eh = pt("chevron-down", ph);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Th = pt("chevron-right", zh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Ah = pt("clock", _h);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  [
    "path",
    { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
  ]
], Oh = pt("command", Mh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nh = [
  ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4", key: "6o5b7l" }],
  ["path", { d: "m9 10-5 5 5 5", key: "1kshq7" }]
], rd = pt("corner-down-left", Nh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
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
], xh = pt("cpu", Ch);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jh = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], Dh = pt("database", jh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uh = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Rh = pt("download", Uh);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], dd = pt("funnel", Hh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qh = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
], Jf = pt("key", qh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Yh = pt("layout-dashboard", Bh);
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
], zd = pt("list", Gh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qh = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
], Lh = pt("maximize-2", Qh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xh = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], Zh = pt("menu", Xh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [
  ["path", { d: "m14 10 7-7", key: "oa77jy" }],
  ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
], Kh = pt("minimize-2", Vh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], kf = pt("network", wh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jh = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], qf = pt("search", Jh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
], $h = pt("server", kh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wh = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], $f = pt("settings", Wh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
], jn = pt("terminal", Fh);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Ph = pt("trash-2", Ih);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t2 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Td = pt("x", t2);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l2 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], e2 = pt("zap", l2), Bf = [
  // 导航命令
  {
    id: "nav-memory",
    icon: zd,
    label: "前往记忆流",
    description: "查看所有记忆片段的时间线",
    action: (c) => c("/memory"),
    keywords: ["memory", "stream", "timeline", "记忆"],
    type: "navigation"
  },
  {
    id: "nav-graph",
    icon: kf,
    label: "前往世界图谱",
    description: "探索实体关系可视化网络",
    action: (c) => c("/graph"),
    keywords: ["graph", "world", "map", "图谱"],
    type: "navigation"
  },
  {
    id: "nav-brain",
    icon: wf,
    label: "前往大脑控制台",
    description: "记忆操作、总结与向量化",
    action: (c) => c("/brain"),
    keywords: ["brain", "console", "summarize", "大脑"],
    type: "navigation"
  },
  {
    id: "nav-api",
    icon: Jf,
    label: "API 预设配置",
    description: "管理 LLM 连接设置",
    action: (c) => c("/api"),
    keywords: ["api", "config", "llm", "设置"],
    type: "navigation"
  },
  {
    id: "nav-dev",
    icon: jn,
    label: "开发日志",
    description: "查看系统运行日志和状态",
    action: (c) => c("/dev"),
    keywords: ["dev", "log", "debug", "日志"],
    type: "navigation"
  },
  {
    id: "nav-settings",
    icon: $f,
    label: "系统设置",
    description: "调整 Engram 全局选项",
    action: (c) => c("/settings"),
    keywords: ["settings", "config", "option", "选项"],
    type: "navigation"
  }
];
function a2(c) {
  const r = c.toLowerCase().trim();
  return r ? Bf.filter((o) => {
    var s;
    return o.label.toLowerCase().includes(r) || ((s = o.description) == null ? void 0 : s.toLowerCase().includes(r)) || o.keywords.some((p) => p.toLowerCase().includes(r));
  }) : Bf;
}
const n2 = ({ onNavigate: c }) => {
  const [r, o] = V.useState(""), [s, p] = V.useState(!1), [N, x] = V.useState(0), [j, C] = V.useState(Bf), z = V.useRef(null), Y = V.useRef(null);
  V.useEffect(() => {
    C(a2(r)), x(0);
  }, [r]), V.useEffect(() => {
    const X = (nt) => {
      z.current && !z.current.contains(nt.target) && p(!1);
    };
    return document.addEventListener("mousedown", X), () => document.removeEventListener("mousedown", X);
  }, []), V.useEffect(() => {
    const X = (nt) => {
      var P;
      (nt.metaKey || nt.ctrlKey) && nt.key === "k" && (nt.preventDefault(), (P = Y.current) == null || P.focus(), p(!0));
    };
    return window.addEventListener("keydown", X), () => window.removeEventListener("keydown", X);
  }, []);
  const B = (X) => {
    var P;
    if (!s) {
      (X.key === "ArrowDown" || X.key === "Enter") && p(!0);
      return;
    }
    const nt = j.length + (r ? 1 : 0);
    switch (X.key) {
      case "ArrowDown":
        X.preventDefault(), x((wt) => (wt + 1) % nt);
        break;
      case "ArrowUp":
        X.preventDefault(), x((wt) => (wt - 1 + nt) % nt);
        break;
      case "Enter":
        X.preventDefault(), $();
        break;
      case "Escape":
        p(!1), (P = Y.current) == null || P.blur();
        break;
    }
  }, $ = () => {
    j.length > 0 && N < j.length ? j[N].action(c) : r && (console.log("Searching memory for:", r), c("/memory")), p(!1), o("");
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "engram-command-palette", ref: z, children: [
    /* @__PURE__ */ v.jsxs("div", { className: `engram-cp-input-wrapper ${s ? "active" : ""}`, children: [
      /* @__PURE__ */ v.jsx(qf, { size: 16, className: "engram-cp-icon" }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          ref: Y,
          type: "text",
          className: "engram-cp-input",
          placeholder: "搜索命令、页面或记忆... (Cmd+K)",
          value: r,
          onChange: (X) => {
            o(X.target.value), p(!0);
          },
          onFocus: () => p(!0),
          onKeyDown: B
        }
      ),
      !r && /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-shortcut", children: [
        /* @__PURE__ */ v.jsx(Oh, { size: 12 }),
        "K"
      ] })
    ] }),
    s && /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-dropdown", children: [
      j.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-group", children: [
        /* @__PURE__ */ v.jsx("div", { className: "engram-cp-label", children: "功能与导航" }),
        j.map((X, nt) => /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: `engram-cp-item ${nt === N ? "selected" : ""}`,
            onClick: () => {
              X.action(c), p(!1), o("");
            },
            children: [
              /* @__PURE__ */ v.jsx(X.icon, { size: 16, className: "engram-cp-item-icon" }),
              /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-item-content", children: [
                /* @__PURE__ */ v.jsx("div", { className: "engram-cp-item-title", children: X.label }),
                X.description && /* @__PURE__ */ v.jsx("div", { className: "engram-cp-item-desc", children: X.description })
              ] }),
              nt === N && /* @__PURE__ */ v.jsx(rd, { size: 14, className: "engram-cp-enter" })
            ]
          },
          X.id
        ))
      ] }),
      r && /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-group", children: [
        /* @__PURE__ */ v.jsx("div", { className: "engram-cp-label", children: "搜索" }),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: `engram-cp-item ${N === j.length ? "selected" : ""}`,
            onClick: () => {
              $();
            },
            children: [
              /* @__PURE__ */ v.jsx(qf, { size: 16, className: "engram-cp-item-icon" }),
              /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-item-content", children: [
                /* @__PURE__ */ v.jsxs("div", { className: "engram-cp-item-title", children: [
                  '搜索记忆: "',
                  r,
                  '"'
                ] }),
                /* @__PURE__ */ v.jsx("div", { className: "engram-cp-item-desc", children: "在记忆流和图谱中搜索此关键词" })
              ] }),
              N === j.length && /* @__PURE__ */ v.jsx(rd, { size: 14, className: "engram-cp-enter" })
            ]
          }
        )
      ] }),
      j.length === 0 && !r && /* @__PURE__ */ v.jsx("div", { className: "engram-cp-empty", children: "无需搜索，直接输入..." })
    ] })
  ] });
}, u2 = ({
  isFullscreen: c,
  onToggleFullscreen: r,
  onToggleSidebar: o,
  isMobile: s,
  onClose: p,
  onNavigate: N
}) => /* @__PURE__ */ v.jsxs("header", { className: "engram-header", children: [
  /* @__PURE__ */ v.jsxs("div", { className: "engram-header-left", children: [
    s && /* @__PURE__ */ v.jsx(
      "button",
      {
        className: "engram-icon-btn",
        onClick: o,
        title: "菜单",
        children: /* @__PURE__ */ v.jsx(Zh, { size: 20 })
      }
    ),
    /* @__PURE__ */ v.jsx("span", { className: "engram-logo-text", children: "Engram" })
  ] }),
  /* @__PURE__ */ v.jsx("div", { className: "engram-header-center", children: /* @__PURE__ */ v.jsx(n2, { onNavigate: N }) }),
  /* @__PURE__ */ v.jsxs("div", { className: "engram-header-right", children: [
    /* @__PURE__ */ v.jsx(
      "button",
      {
        className: "engram-icon-btn",
        onClick: r,
        title: c ? "退出全屏" : "全屏",
        children: c ? /* @__PURE__ */ v.jsx(Kh, { size: 18 }) : /* @__PURE__ */ v.jsx(Lh, { size: 18 })
      }
    ),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        className: "engram-icon-btn engram-close-btn",
        onClick: p,
        title: "关闭",
        children: /* @__PURE__ */ v.jsx(Td, { size: 18 })
      }
    )
  ] })
] }), i2 = [
  { id: "dashboard", icon: Yh, label: "仪表盘", path: "/dashboard" },
  { id: "memory", icon: zd, label: "记忆流", path: "/memory" },
  { id: "graph", icon: kf, label: "世界图谱", path: "/graph" },
  { id: "brain", icon: wf, label: "记忆", path: "/brain" },
  { id: "api", icon: Jf, label: "API 预设", path: "/api" },
  { id: "dev", icon: jn, label: "开发日志", path: "/dev" },
  { id: "settings", icon: $f, label: "设置", path: "/settings" }
], c2 = ({
  currentPath: c,
  onNavigate: r,
  isOpen: o,
  onClose: s,
  isMobile: p
}) => {
  const N = (j) => {
    r(j.path), p && s();
  }, x = (j) => c.startsWith(j);
  return p && !o ? null : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    p && o && /* @__PURE__ */ v.jsx("div", { className: "engram-sidebar-overlay", onClick: s }),
    /* @__PURE__ */ v.jsxs("nav", { className: `engram-sidebar ${o ? "open" : ""}`, children: [
      p && /* @__PURE__ */ v.jsxs("div", { className: "engram-sidebar-header", children: [
        /* @__PURE__ */ v.jsx("span", { children: "导航" }),
        /* @__PURE__ */ v.jsx("button", { className: "engram-icon-btn", onClick: s, children: /* @__PURE__ */ v.jsx(Td, { size: 18 }) })
      ] }),
      /* @__PURE__ */ v.jsx("ul", { className: "engram-nav-list", children: i2.map((j) => /* @__PURE__ */ v.jsx("li", { className: "engram-nav-item", children: /* @__PURE__ */ v.jsx(
        "button",
        {
          className: `engram-nav-btn ${x(j.path) ? "active" : ""}`,
          onClick: () => N(j),
          title: j.label,
          children: /* @__PURE__ */ v.jsx(j.icon, { size: 20 })
        }
      ) }, j.id)) })
    ] })
  ] });
}, f2 = ({
  children: c,
  currentPath: r,
  onNavigate: o,
  isFullscreen: s,
  onToggleFullscreen: p,
  isSidebarOpen: N,
  onToggleSidebar: x,
  onCloseSidebar: j,
  isMobile: C,
  onClose: z
}) => /* @__PURE__ */ v.jsxs("div", { className: `engram-layout ${s ? "eg-fullscreen" : ""}`, children: [
  /* @__PURE__ */ v.jsx(
    u2,
    {
      isFullscreen: s,
      onToggleFullscreen: p,
      onToggleSidebar: x,
      isMobile: C,
      onClose: z,
      onNavigate: o
    }
  ),
  /* @__PURE__ */ v.jsxs("div", { className: "engram-body", children: [
    /* @__PURE__ */ v.jsx(
      c2,
      {
        currentPath: r,
        onNavigate: o,
        isOpen: N,
        onClose: j,
        isMobile: C
      }
    ),
    /* @__PURE__ */ v.jsx("main", { className: "engram-content", children: c })
  ] })
] }), jf = ({
  title: c,
  value: r,
  icon: o,
  subtext: s,
  highlight: p = !1
}) => /* @__PURE__ */ v.jsxs("div", { className: `engram-stats-card ${p ? "highlight" : ""}`, children: [
  /* @__PURE__ */ v.jsxs("div", { className: "stats-header", children: [
    /* @__PURE__ */ v.jsx("div", { className: "stats-icon-wrapper", children: /* @__PURE__ */ v.jsx(o, { size: 20 }) }),
    p && /* @__PURE__ */ v.jsx("div", { className: "stats-pulse" })
  ] }),
  /* @__PURE__ */ v.jsxs("div", { className: "stats-content", children: [
    /* @__PURE__ */ v.jsx("div", { className: "stats-value", children: r }),
    /* @__PURE__ */ v.jsx("div", { className: "stats-title", children: c }),
    s && /* @__PURE__ */ v.jsx("div", { className: "stats-subtext", children: s })
  ] })
] }), Vt = [];
for (let c = 0; c < 256; ++c)
  Vt.push((c + 256).toString(16).slice(1));
function s2(c, r = 0) {
  return (Vt[c[r + 0]] + Vt[c[r + 1]] + Vt[c[r + 2]] + Vt[c[r + 3]] + "-" + Vt[c[r + 4]] + Vt[c[r + 5]] + "-" + Vt[c[r + 6]] + Vt[c[r + 7]] + "-" + Vt[c[r + 8]] + Vt[c[r + 9]] + "-" + Vt[c[r + 10]] + Vt[c[r + 11]] + Vt[c[r + 12]] + Vt[c[r + 13]] + Vt[c[r + 14]] + Vt[c[r + 15]]).toLowerCase();
}
let Df;
const o2 = new Uint8Array(16);
function r2() {
  if (!Df) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Df = crypto.getRandomValues.bind(crypto);
  }
  return Df(o2);
}
const d2 = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), md = { randomUUID: d2 };
function m2(c, r, o) {
  var p;
  c = c || {};
  const s = c.random ?? ((p = c.rng) == null ? void 0 : p.call(c)) ?? r2();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, s2(s);
}
function h2(c, r, o) {
  return md.randomUUID && !c ? md.randomUUID() : m2(c);
}
var Yf = function(c, r) {
  return Yf = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, s) {
    o.__proto__ = s;
  } || function(o, s) {
    for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (o[p] = s[p]);
  }, Yf(c, r);
};
function Dn(c, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  Yf(c, r);
  function o() {
    this.constructor = c;
  }
  c.prototype = r === null ? Object.create(r) : (o.prototype = r.prototype, new o());
}
function Gf(c) {
  var r = typeof Symbol == "function" && Symbol.iterator, o = r && c[r], s = 0;
  if (o) return o.call(c);
  if (c && typeof c.length == "number") return {
    next: function() {
      return c && s >= c.length && (c = void 0), { value: c && c[s++], done: !c };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Qf(c, r) {
  var o = typeof Symbol == "function" && c[Symbol.iterator];
  if (!o) return c;
  var s = o.call(c), p, N = [], x;
  try {
    for (; (r === void 0 || r-- > 0) && !(p = s.next()).done; ) N.push(p.value);
  } catch (j) {
    x = { error: j };
  } finally {
    try {
      p && !p.done && (o = s.return) && o.call(s);
    } finally {
      if (x) throw x.error;
    }
  }
  return N;
}
function Lf(c, r, o) {
  if (o || arguments.length === 2) for (var s = 0, p = r.length, N; s < p; s++)
    (N || !(s in r)) && (N || (N = Array.prototype.slice.call(r, 0, s)), N[s] = r[s]);
  return c.concat(N || Array.prototype.slice.call(r));
}
function ql(c) {
  return typeof c == "function";
}
function _d(c) {
  var r = function(s) {
    Error.call(s), s.stack = new Error().stack;
  }, o = c(r);
  return o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o;
}
var Uf = _d(function(c) {
  return function(o) {
    c(this), this.message = o ? o.length + ` errors occurred during unsubscription:
` + o.map(function(s, p) {
      return p + 1 + ") " + s.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = o;
  };
});
function Xf(c, r) {
  if (c) {
    var o = c.indexOf(r);
    0 <= o && c.splice(o, 1);
  }
}
var ui = (function() {
  function c(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return c.prototype.unsubscribe = function() {
    var r, o, s, p, N;
    if (!this.closed) {
      this.closed = !0;
      var x = this._parentage;
      if (x)
        if (this._parentage = null, Array.isArray(x))
          try {
            for (var j = Gf(x), C = j.next(); !C.done; C = j.next()) {
              var z = C.value;
              z.remove(this);
            }
          } catch (P) {
            r = { error: P };
          } finally {
            try {
              C && !C.done && (o = j.return) && o.call(j);
            } finally {
              if (r) throw r.error;
            }
          }
        else
          x.remove(this);
      var Y = this.initialTeardown;
      if (ql(Y))
        try {
          Y();
        } catch (P) {
          N = P instanceof Uf ? P.errors : [P];
        }
      var B = this._finalizers;
      if (B) {
        this._finalizers = null;
        try {
          for (var $ = Gf(B), X = $.next(); !X.done; X = $.next()) {
            var nt = X.value;
            try {
              hd(nt);
            } catch (P) {
              N = N ?? [], P instanceof Uf ? N = Lf(Lf([], Qf(N)), Qf(P.errors)) : N.push(P);
            }
          }
        } catch (P) {
          s = { error: P };
        } finally {
          try {
            X && !X.done && (p = $.return) && p.call($);
          } finally {
            if (s) throw s.error;
          }
        }
      }
      if (N)
        throw new Uf(N);
    }
  }, c.prototype.add = function(r) {
    var o;
    if (r && r !== this)
      if (this.closed)
        hd(r);
      else {
        if (r instanceof c) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (o = this._finalizers) !== null && o !== void 0 ? o : []).push(r);
      }
  }, c.prototype._hasParent = function(r) {
    var o = this._parentage;
    return o === r || Array.isArray(o) && o.includes(r);
  }, c.prototype._addParent = function(r) {
    var o = this._parentage;
    this._parentage = Array.isArray(o) ? (o.push(r), o) : o ? [o, r] : r;
  }, c.prototype._removeParent = function(r) {
    var o = this._parentage;
    o === r ? this._parentage = null : Array.isArray(o) && Xf(o, r);
  }, c.prototype.remove = function(r) {
    var o = this._finalizers;
    o && Xf(o, r), r instanceof c && r._removeParent(this);
  }, c.EMPTY = (function() {
    var r = new c();
    return r.closed = !0, r;
  })(), c;
})(), Ad = ui.EMPTY;
function Md(c) {
  return c instanceof ui || c && "closed" in c && ql(c.remove) && ql(c.add) && ql(c.unsubscribe);
}
function hd(c) {
  ql(c) ? c() : c.unsubscribe();
}
var v2 = {
  Promise: void 0
}, y2 = {
  setTimeout: function(c, r) {
    for (var o = [], s = 2; s < arguments.length; s++)
      o[s - 2] = arguments[s];
    return setTimeout.apply(void 0, Lf([c, r], Qf(o)));
  },
  clearTimeout: function(c) {
    return clearTimeout(c);
  },
  delegate: void 0
};
function g2(c) {
  y2.setTimeout(function() {
    throw c;
  });
}
function vd() {
}
function ti(c) {
  c();
}
var Wf = (function(c) {
  Dn(r, c);
  function r(o) {
    var s = c.call(this) || this;
    return s.isStopped = !1, o ? (s.destination = o, Md(o) && o.add(s)) : s.destination = p2, s;
  }
  return r.create = function(o, s, p) {
    return new Zf(o, s, p);
  }, r.prototype.next = function(o) {
    this.isStopped || this._next(o);
  }, r.prototype.error = function(o) {
    this.isStopped || (this.isStopped = !0, this._error(o));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, c.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(o) {
    this.destination.next(o);
  }, r.prototype._error = function(o) {
    try {
      this.destination.error(o);
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
})(ui), b2 = (function() {
  function c(r) {
    this.partialObserver = r;
  }
  return c.prototype.next = function(r) {
    var o = this.partialObserver;
    if (o.next)
      try {
        o.next(r);
      } catch (s) {
        Fu(s);
      }
  }, c.prototype.error = function(r) {
    var o = this.partialObserver;
    if (o.error)
      try {
        o.error(r);
      } catch (s) {
        Fu(s);
      }
    else
      Fu(r);
  }, c.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (o) {
        Fu(o);
      }
  }, c;
})(), Zf = (function(c) {
  Dn(r, c);
  function r(o, s, p) {
    var N = c.call(this) || this, x;
    return ql(o) || !o ? x = {
      next: o ?? void 0,
      error: s ?? void 0,
      complete: p ?? void 0
    } : x = o, N.destination = new b2(x), N;
  }
  return r;
})(Wf);
function Fu(c) {
  g2(c);
}
function S2(c) {
  throw c;
}
var p2 = {
  closed: !0,
  next: vd,
  error: S2,
  complete: vd
}, E2 = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function z2(c) {
  return c;
}
function T2(c) {
  return c.length === 0 ? z2 : c.length === 1 ? c[0] : function(o) {
    return c.reduce(function(s, p) {
      return p(s);
    }, o);
  };
}
var yd = (function() {
  function c(r) {
    r && (this._subscribe = r);
  }
  return c.prototype.lift = function(r) {
    var o = new c();
    return o.source = this, o.operator = r, o;
  }, c.prototype.subscribe = function(r, o, s) {
    var p = this, N = A2(r) ? r : new Zf(r, o, s);
    return ti(function() {
      var x = p, j = x.operator, C = x.source;
      N.add(j ? j.call(N, C) : C ? p._subscribe(N) : p._trySubscribe(N));
    }), N;
  }, c.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (o) {
      r.error(o);
    }
  }, c.prototype.forEach = function(r, o) {
    var s = this;
    return o = gd(o), new o(function(p, N) {
      var x = new Zf({
        next: function(j) {
          try {
            r(j);
          } catch (C) {
            N(C), x.unsubscribe();
          }
        },
        error: N,
        complete: p
      });
      s.subscribe(x);
    });
  }, c.prototype._subscribe = function(r) {
    var o;
    return (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(r);
  }, c.prototype[E2] = function() {
    return this;
  }, c.prototype.pipe = function() {
    for (var r = [], o = 0; o < arguments.length; o++)
      r[o] = arguments[o];
    return T2(r)(this);
  }, c.prototype.toPromise = function(r) {
    var o = this;
    return r = gd(r), new r(function(s, p) {
      var N;
      o.subscribe(function(x) {
        return N = x;
      }, function(x) {
        return p(x);
      }, function() {
        return s(N);
      });
    });
  }, c.create = function(r) {
    return new c(r);
  }, c;
})();
function gd(c) {
  var r;
  return (r = c ?? v2.Promise) !== null && r !== void 0 ? r : Promise;
}
function _2(c) {
  return c && ql(c.next) && ql(c.error) && ql(c.complete);
}
function A2(c) {
  return c && c instanceof Wf || _2(c) && Md(c);
}
function M2(c) {
  return ql(c == null ? void 0 : c.lift);
}
function O2(c) {
  return function(r) {
    if (M2(r))
      return r.lift(function(o) {
        try {
          return c(o, this);
        } catch (s) {
          this.error(s);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function N2(c, r, o, s, p) {
  return new C2(c, r, o, s, p);
}
var C2 = (function(c) {
  Dn(r, c);
  function r(o, s, p, N, x, j) {
    var C = c.call(this, o) || this;
    return C.onFinalize = x, C.shouldUnsubscribe = j, C._next = s ? function(z) {
      try {
        s(z);
      } catch (Y) {
        o.error(Y);
      }
    } : c.prototype._next, C._error = N ? function(z) {
      try {
        N(z);
      } catch (Y) {
        o.error(Y);
      } finally {
        this.unsubscribe();
      }
    } : c.prototype._error, C._complete = p ? function() {
      try {
        p();
      } catch (z) {
        o.error(z);
      } finally {
        this.unsubscribe();
      }
    } : c.prototype._complete, C;
  }
  return r.prototype.unsubscribe = function() {
    var o;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var s = this.closed;
      c.prototype.unsubscribe.call(this), !s && ((o = this.onFinalize) === null || o === void 0 || o.call(this));
    }
  }, r;
})(Wf), x2 = _d(function(c) {
  return function() {
    c(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ff = (function(c) {
  Dn(r, c);
  function r() {
    var o = c.call(this) || this;
    return o.closed = !1, o.currentObservers = null, o.observers = [], o.isStopped = !1, o.hasError = !1, o.thrownError = null, o;
  }
  return r.prototype.lift = function(o) {
    var s = new bd(this, this);
    return s.operator = o, s;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new x2();
  }, r.prototype.next = function(o) {
    var s = this;
    ti(function() {
      var p, N;
      if (s._throwIfClosed(), !s.isStopped) {
        s.currentObservers || (s.currentObservers = Array.from(s.observers));
        try {
          for (var x = Gf(s.currentObservers), j = x.next(); !j.done; j = x.next()) {
            var C = j.value;
            C.next(o);
          }
        } catch (z) {
          p = { error: z };
        } finally {
          try {
            j && !j.done && (N = x.return) && N.call(x);
          } finally {
            if (p) throw p.error;
          }
        }
      }
    });
  }, r.prototype.error = function(o) {
    var s = this;
    ti(function() {
      if (s._throwIfClosed(), !s.isStopped) {
        s.hasError = s.isStopped = !0, s.thrownError = o;
        for (var p = s.observers; p.length; )
          p.shift().error(o);
      }
    });
  }, r.prototype.complete = function() {
    var o = this;
    ti(function() {
      if (o._throwIfClosed(), !o.isStopped) {
        o.isStopped = !0;
        for (var s = o.observers; s.length; )
          s.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var o;
      return ((o = this.observers) === null || o === void 0 ? void 0 : o.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(o) {
    return this._throwIfClosed(), c.prototype._trySubscribe.call(this, o);
  }, r.prototype._subscribe = function(o) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(o), this._innerSubscribe(o);
  }, r.prototype._innerSubscribe = function(o) {
    var s = this, p = this, N = p.hasError, x = p.isStopped, j = p.observers;
    return N || x ? Ad : (this.currentObservers = null, j.push(o), new ui(function() {
      s.currentObservers = null, Xf(j, o);
    }));
  }, r.prototype._checkFinalizedStatuses = function(o) {
    var s = this, p = s.hasError, N = s.thrownError, x = s.isStopped;
    p ? o.error(N) : x && o.complete();
  }, r.prototype.asObservable = function() {
    var o = new yd();
    return o.source = this, o;
  }, r.create = function(o, s) {
    return new bd(o, s);
  }, r;
})(yd), bd = (function(c) {
  Dn(r, c);
  function r(o, s) {
    var p = c.call(this) || this;
    return p.destination = o, p.source = s, p;
  }
  return r.prototype.next = function(o) {
    var s, p;
    (p = (s = this.destination) === null || s === void 0 ? void 0 : s.next) === null || p === void 0 || p.call(s, o);
  }, r.prototype.error = function(o) {
    var s, p;
    (p = (s = this.destination) === null || s === void 0 ? void 0 : s.error) === null || p === void 0 || p.call(s, o);
  }, r.prototype.complete = function() {
    var o, s;
    (s = (o = this.destination) === null || o === void 0 ? void 0 : o.complete) === null || s === void 0 || s.call(o);
  }, r.prototype._subscribe = function(o) {
    var s, p;
    return (p = (s = this.source) === null || s === void 0 ? void 0 : s.subscribe(o)) !== null && p !== void 0 ? p : Ad;
  }, r;
})(Ff);
function j2(c, r) {
  return O2(function(o, s) {
    var p = 0;
    o.subscribe(N2(s, function(N) {
      return c.call(r, N, p++) && s.next(N);
    }));
  });
}
const Iu = new Ff(), D2 = {
  /**
   * 发布事件
   */
  emit(c) {
    Iu.next({
      ...c,
      timestamp: Date.now()
    });
  },
  /**
   * 订阅所有事件
   */
  subscribe(c) {
    const r = Iu.subscribe(c);
    return {
      unsubscribe: () => r.unsubscribe()
    };
  },
  /**
   * 订阅特定类型的事件
   */
  on(c, r) {
    const o = Iu.pipe(j2((s) => s.type === c)).subscribe((s) => r(s.payload));
    return {
      unsubscribe: () => o.unsubscribe()
    };
  },
  /**
   * 获取事件流（用于 RxJS 操作符）
   */
  asObservable() {
    return Iu.asObservable();
  }
};
var _t = /* @__PURE__ */ ((c) => (c[c.DEBUG = 0] = "DEBUG", c[c.INFO = 1] = "INFO", c[c.SUCCESS = 2] = "SUCCESS", c[c.WARN = 3] = "WARN", c[c.ERROR = 4] = "ERROR", c))(_t || {});
const ei = {
  0: { label: "DEBUG", icon: "🔍", color: "#6c757d" },
  1: { label: "INFO", icon: "ℹ️", color: "#17a2b8" },
  2: { label: "SUCCESS", icon: "✅", color: "#28a745" },
  3: { label: "WARN", icon: "⚠️", color: "#ffc107" },
  4: { label: "ERROR", icon: "❌", color: "#dc3545" }
}, Od = {
  maxEntries: 5e3,
  minLevel: 0
  /* DEBUG */
}, Nd = new Ff();
let Hl = [], Oe = { ...Od }, Rf = null;
async function ai() {
  if (!Rf) {
    const { db: c } = await import("./DexieDB-CryA3QeW.js");
    Rf = c;
  }
  return Rf;
}
function U2(c) {
  return new Date(c).toTimeString().slice(0, 8);
}
async function Ua(c, r, o, s) {
  if (c < Oe.minLevel) return;
  const p = {
    id: h2(),
    timestamp: Date.now(),
    level: c,
    module: r,
    message: o,
    data: s
  };
  Hl.push(p), Nd.next(p);
  try {
    const N = await ai();
    await N.logs.add(p);
    const x = await N.logs.count();
    x > Oe.maxEntries && await R2(x - Oe.maxEntries);
  } catch (N) {
    console.error("[Engram/Logger] 日志持久化失败:", N);
  }
}
async function R2(c) {
  try {
    const r = await ai(), s = (await r.logs.orderBy("timestamp").limit(c).toArray()).map((p) => p.id);
    await r.logs.bulkDelete(s), Hl = Hl.slice(-Oe.maxEntries);
  } catch (r) {
    console.error("[Engram/Logger] 清理旧日志失败:", r);
  }
}
function H2() {
  D2.subscribe((c) => {
    const o = {
      INGESTION_START: _t.INFO,
      INGESTION_COMPLETE: _t.SUCCESS,
      ENTITY_CREATED: _t.INFO,
      MEMORY_STORED: _t.SUCCESS,
      RETRIEVAL_START: _t.DEBUG,
      RETRIEVAL_COMPLETE: _t.SUCCESS,
      CHAT_CHANGED: _t.INFO,
      MESSAGE_RECEIVED: _t.DEBUG
    }[c.type] ?? _t.DEBUG;
    Ua(o, "EventBus", `${c.type}`, c.payload);
  });
}
const Ol = {
  /**
   * 初始化 Logger
   */
  async init(c) {
    c && (Oe = { ...Oe, ...c });
    try {
      Hl = await (await ai()).logs.orderBy("timestamp").reverse().limit(Oe.maxEntries).toArray(), Hl.reverse();
    } catch (r) {
      console.error("[Engram/Logger] 加载历史日志失败:", r), Hl = [];
    }
    H2(), Ol.info("Logger", "Logger 初始化完成", { maxEntries: Oe.maxEntries });
  },
  /**
   * DEBUG 级别日志
   */
  debug(c, r, o) {
    Ua(_t.DEBUG, c, r, o);
  },
  /**
   * INFO 级别日志
   */
  info(c, r, o) {
    Ua(_t.INFO, c, r, o);
  },
  /**
   * SUCCESS 级别日志
   */
  success(c, r, o) {
    Ua(_t.SUCCESS, c, r, o);
  },
  /**
   * WARN 级别日志
   */
  warn(c, r, o) {
    Ua(_t.WARN, c, r, o);
  },
  /**
   * ERROR 级别日志
   */
  error(c, r, o) {
    Ua(_t.ERROR, c, r, o);
  },
  /**
   * 获取所有缓存日志
   */
  getLogs() {
    return [...Hl];
  },
  /**
   * 订阅新日志
   */
  subscribe(c) {
    const r = Nd.subscribe(c);
    return () => r.unsubscribe();
  },
  /**
   * 清空所有日志
   */
  async clear() {
    try {
      await (await ai()).logs.clear(), Hl = [], Ol.info("Logger", "日志已清空");
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
    const r = {
      [_t.DEBUG]: "DEBUG",
      [_t.INFO]: "INFO",
      [_t.SUCCESS]: "SUCCESS",
      [_t.WARN]: "WARN",
      [_t.ERROR]: "ERROR"
    };
    let o = `# Engram Debug Log

`;
    o += `- **导出时间**: ${c.toLocaleString("zh-CN")}
`, o += `- **版本**: 0.1.0
`, o += `- **日志条数**: ${Hl.length}

`, o += `---

`, o += `## 日志记录

`, o += "```\n";
    for (const s of Hl) {
      const p = U2(s.timestamp), N = r[s.level].padEnd(7), x = s.module.padEnd(16);
      if (o += `[${p}] [${x}] ${N} ${s.message}
`, s.data !== void 0) {
        const j = JSON.stringify(s.data, null, 2).split(`
`).map((C) => `    ${C}`).join(`
`);
        o += `${j}
`;
      }
    }
    return o += "```\n", o;
  },
  /**
   * 获取导出文件名
   */
  getExportFilename() {
    const c = /* @__PURE__ */ new Date(), r = c.toISOString().slice(0, 10), o = c.toTimeString().slice(0, 8).replace(/:/g, "");
    return `engram_log_${r}_${o}.md`;
  }
}, q2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_LOGGER_CONFIG: Od,
  LogLevel: _t,
  LogLevelConfig: ei,
  Logger: Ol
}, Symbol.toStringTag, { value: "Module" }));
function B2() {
  var c, r;
  try {
    return ((r = (c = window.SillyTavern) == null ? void 0 : c.getContext) == null ? void 0 : r.call(c)) || null;
  } catch (o) {
    return console.warn("[Engram] Failed to get ST context:", o), null;
  }
}
async function Sd() {
  const { Logger: c } = await Promise.resolve().then(() => q2);
  await c.init(), c.info("STBridge", "Engram 插件正在初始化..."), Y2(), c.success("STBridge", "Engram 初始化完成 - Where memories leave their trace.");
}
const Cd = '<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>';
function Y2() {
  const c = document.querySelector("#top-settings-holder"), r = document.querySelector("#WI-SP-button");
  if (!c) {
    console.warn("[Engram] #top-settings-holder not found, fallback to floating orb"), G2();
    return;
  }
  const o = document.createElement("div");
  o.id = "engram-drawer", o.className = "drawer";
  const s = document.createElement("div");
  s.className = "drawer-toggle drawer-header";
  const p = document.createElement("div");
  p.id = "engram-drawer-icon", p.className = "drawer-icon fa-fw closedIcon", p.title = "Engram - 记忆操作系统", p.setAttribute("data-i18n", "[title]Engram - Memory OS"), p.innerHTML = Cd, p.addEventListener("click", ni), s.appendChild(p), o.appendChild(s), r ? (c.insertBefore(o, r), console.log("[Engram] Top bar button injected before WI-SP-button")) : (c.appendChild(o), console.log("[Engram] Top bar button injected at end (WI-SP-button not found)"));
}
function G2() {
  const c = document.createElement("div");
  c.className = "engram-orb", c.title = "Engram - 记忆操作系统", c.innerHTML = Cd, c.addEventListener("click", ni), document.body.appendChild(c);
}
let Vf = null;
function Q2(c) {
  Vf = c;
}
let Hf = !1, xn = null, li = null;
function ni() {
  Hf && xn ? (li && (li.unmount(), li = null), xn.remove(), xn = null, Hf = !1) : (xn = L2(), document.body.appendChild(xn), Hf = !0);
}
function L2() {
  var r;
  const c = document.createElement("div");
  return c.className = "engram-panel", c.id = "engram-panel-root", Vf ? li = Vf(c, ni) : (c.innerHTML = `
            <div class="engram-panel-header">
                <h2>🧠 Engram</h2>
                <button class="engram-panel-close">&times;</button>
            </div>
            <div class="engram-panel-content">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `, (r = c.querySelector(".engram-panel-close")) == null || r.addEventListener("click", ni)), c;
}
const xd = ({ onNavigate: c }) => {
  const [r, o] = V.useState([]), [s, p] = V.useState(B2()), [N, x] = V.useState(0);
  V.useEffect(() => (o(Ol.getLogs().slice(0, 3)), Ol.subscribe((Y) => {
    o((B) => [Y, ...B].slice(0, 3));
  })), []), V.useEffect(() => {
    const z = setInterval(() => {
      x((Y) => Y + 1);
    }, 1e3);
    return () => clearInterval(z);
  }, []);
  const j = (z) => {
    const Y = Math.floor(z / 3600), B = Math.floor(z % 3600 / 60), $ = z % 60;
    return `${Y.toString().padStart(2, "0")}:${B.toString().padStart(2, "0")}:${$.toString().padStart(2, "0")}`;
  }, C = (s == null ? void 0 : s.name2) || "Unknown";
  return s != null && s.name1, /* @__PURE__ */ v.jsx("div", { className: "engram-dashboard", children: /* @__PURE__ */ v.jsxs("div", { className: "engram-dashboard-grid", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "dashboard-stats-row", children: [
      /* @__PURE__ */ v.jsx(
        jf,
        {
          title: "ACTIVE MODEL",
          value: s ? "Connected" : "Offline",
          subtext: s ? `Chatting with ${C}` : "Waiting for connection...",
          icon: $h,
          highlight: !!s
        }
      ),
      /* @__PURE__ */ v.jsx(
        jf,
        {
          title: "MEMORY NODES",
          value: "0",
          subtext: "Graph Database",
          icon: Dh
        }
      ),
      /* @__PURE__ */ v.jsx(
        jf,
        {
          title: "SYSTEM UPTIME",
          value: j(N),
          subtext: "Session Duration",
          icon: xh
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "dashboard-cell cell-actions", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "cell-header", children: [
        /* @__PURE__ */ v.jsx(e2, { size: 16 }),
        /* @__PURE__ */ v.jsx("span", { children: "QUICK ACTIONS" })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "actions-grid", children: [
        /* @__PURE__ */ v.jsxs("button", { className: "action-tile", onClick: () => c("/memory"), children: [
          /* @__PURE__ */ v.jsx("span", { className: "tile-icon", children: "📜" }),
          /* @__PURE__ */ v.jsx("span", { className: "tile-label", children: "Memory Stream" })
        ] }),
        /* @__PURE__ */ v.jsxs("button", { className: "action-tile", onClick: () => c("/graph"), children: [
          /* @__PURE__ */ v.jsx("span", { className: "tile-icon", children: "🕸️" }),
          /* @__PURE__ */ v.jsx("span", { className: "tile-label", children: "Knowledge Graph" })
        ] }),
        /* @__PURE__ */ v.jsxs("button", { className: "action-tile", onClick: () => c("/brain"), children: [
          /* @__PURE__ */ v.jsx("span", { className: "tile-icon", children: "🧠" }),
          /* @__PURE__ */ v.jsx("span", { className: "tile-label", children: "Brain Console" })
        ] }),
        /* @__PURE__ */ v.jsxs("button", { className: "action-tile", onClick: () => c("/settings"), children: [
          /* @__PURE__ */ v.jsx("span", { className: "tile-icon", children: "⚙️" }),
          /* @__PURE__ */ v.jsx("span", { className: "tile-label", children: "Settings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "dashboard-cell cell-terminal", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "cell-header", children: [
        /* @__PURE__ */ v.jsx(jn, { size: 16 }),
        /* @__PURE__ */ v.jsx("span", { children: "SYSTEM LOGS" }),
        /* @__PURE__ */ v.jsx("button", { className: "mini-link", onClick: () => c("/dev"), children: "VIEW ALL" })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "mini-terminal-content", children: r.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: "mini-log-empty", children: "No activity recorded" }) : r.map((z) => /* @__PURE__ */ v.jsxs("div", { className: `mini-log-line level-${z.level}`, children: [
        /* @__PURE__ */ v.jsxs("span", { className: "log-time", children: [
          "[",
          new Date(z.timestamp).toLocaleTimeString([], { hour12: !1 }),
          "]"
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: "log-msg", children: z.message })
      ] }, z.id)) })
    ] })
  ] }) });
}, X2 = () => /* @__PURE__ */ v.jsxs("div", { className: "engram-memory-stream", children: [
  /* @__PURE__ */ v.jsxs("div", { className: "engram-page-header", children: [
    /* @__PURE__ */ v.jsx(Ah, { size: 24 }),
    /* @__PURE__ */ v.jsx("h2", { children: "记忆流" })
  ] }),
  /* @__PURE__ */ v.jsx("div", { className: "engram-page-content", children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "记忆时间轴将在这里展示..." }) })
] }), Z2 = () => /* @__PURE__ */ v.jsxs("div", { className: "engram-graph-view", children: [
  /* @__PURE__ */ v.jsxs("div", { className: "engram-page-header", children: [
    /* @__PURE__ */ v.jsx(kf, { size: 24 }),
    /* @__PURE__ */ v.jsx("h2", { children: "世界图谱" })
  ] }),
  /* @__PURE__ */ v.jsx("div", { className: "engram-page-content", children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "React Flow 图谱编辑器将在这里展示..." }) })
] }), V2 = [
  { id: "summarize", label: "总结剧情" },
  { id: "vectorize", label: "向量化" },
  { id: "batch", label: "批量处理" }
], Pu = () => {
  const [c, r] = V.useState("summarize");
  return /* @__PURE__ */ v.jsxs("div", { className: "engram-brain-view", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "engram-page-header", children: [
      /* @__PURE__ */ v.jsx(wf, { size: 24 }),
      /* @__PURE__ */ v.jsx("h2", { children: "记忆" })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "engram-tabs", children: V2.map((o) => /* @__PURE__ */ v.jsx(
      "button",
      {
        className: `engram-tab ${c === o.id ? "active" : ""}`,
        onClick: () => r(o.id),
        children: o.label
      },
      o.id
    )) }),
    /* @__PURE__ */ v.jsxs("div", { className: "engram-page-content", children: [
      c === "summarize" && /* @__PURE__ */ v.jsx("div", { children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "总结剧情功能..." }) }),
      c === "vectorize" && /* @__PURE__ */ v.jsx("div", { children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "向量化功能..." }) }),
      c === "batch" && /* @__PURE__ */ v.jsx("div", { children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "批量处理功能..." }) })
    ] })
  ] });
}, K2 = () => /* @__PURE__ */ v.jsxs("div", { className: "engram-api-presets", children: [
  /* @__PURE__ */ v.jsxs("div", { className: "engram-page-header", children: [
    /* @__PURE__ */ v.jsx(Jf, { size: 24 }),
    /* @__PURE__ */ v.jsx("h2", { children: "API 预设" })
  ] }),
  /* @__PURE__ */ v.jsx("div", { className: "engram-page-content", children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "API 和 预设配置将在这里管理..." }) })
] });
function w2(c) {
  return new Date(c).toTimeString().slice(0, 8);
}
const J2 = ({ entry: c }) => {
  const [r, o] = V.useState(!1), s = c.data !== void 0, p = ei[c.level], N = `log-level-${_t[c.level].toLowerCase()}`;
  return /* @__PURE__ */ v.jsxs("div", { className: "engram-log-entry", children: [
    /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: `engram-log-line ${s ? "has-data" : ""}`,
        onClick: () => s && o(!r),
        children: [
          /* @__PURE__ */ v.jsx("span", { className: "engram-log-expand", children: s ? r ? /* @__PURE__ */ v.jsx(Eh, { size: 12 }) : /* @__PURE__ */ v.jsx(Th, { size: 12 }) : /* @__PURE__ */ v.jsx("span", { style: { width: 12, display: "inline-block" } }) }),
          /* @__PURE__ */ v.jsxs("span", { className: "engram-log-time", children: [
            "[",
            w2(c.timestamp),
            "]"
          ] }),
          /* @__PURE__ */ v.jsxs("span", { className: "engram-log-module", children: [
            "[",
            c.module.padEnd(16),
            "]"
          ] }),
          /* @__PURE__ */ v.jsxs("span", { className: `engram-log-level ${N}`, children: [
            p.icon,
            " ",
            p.label.padEnd(7)
          ] }),
          /* @__PURE__ */ v.jsx("span", { className: "engram-log-message", children: c.message })
        ]
      }
    ),
    r && s && /* @__PURE__ */ v.jsx("div", { className: "engram-log-data", children: /* @__PURE__ */ v.jsx("pre", { children: JSON.stringify(c.data, null, 2) }) })
  ] });
}, k2 = [
  "ALL",
  "Logger",
  "EventBus",
  "CORE/Pipeline",
  "CORE/RAG",
  "CORE/Memory",
  "UI/GraphView",
  "UI/MemoryStream"
], $2 = () => {
  const [c, r] = V.useState([]), [o, s] = V.useState([]), [p, N] = V.useState(""), [x, j] = V.useState(-1), [C, z] = V.useState("ALL"), [Y, B] = V.useState(!0), [$, X] = V.useState(!1), [nt, P] = V.useState(!1), wt = V.useRef(null), Yt = V.useRef(null);
  V.useEffect(() => {
    r(Ol.getLogs());
    const tt = Ol.subscribe((gt) => {
      r((At) => [...At, gt]);
    });
    return () => tt();
  }, []), V.useEffect(() => {
    let tt = c;
    if (x !== -1 && (tt = tt.filter((gt) => gt.level >= x)), C !== "ALL" && (tt = tt.filter((gt) => gt.module.startsWith(C))), p.trim()) {
      const gt = p.toLowerCase();
      tt = tt.filter(
        (At) => At.message.toLowerCase().includes(gt) || At.module.toLowerCase().includes(gt)
      );
    }
    s(tt);
  }, [c, x, C, p]), V.useEffect(() => {
    Y && Yt.current && Yt.current.scrollIntoView({ behavior: "smooth" });
  }, [o, Y]);
  const Nl = V.useCallback(async () => {
    await Ol.clear(), r([]);
  }, []), Rt = V.useCallback(() => {
    const tt = Ol.exportToMarkdown(), gt = Ol.getExportFilename(), At = new Blob([tt], { type: "text/markdown" }), k = URL.createObjectURL(At), Ht = document.createElement("a");
    Ht.href = k, Ht.download = gt, Ht.click(), URL.revokeObjectURL(k), Ol.success("DevLog", `日志已导出: ${gt}`);
  }, []);
  return /* @__PURE__ */ v.jsxs("div", { className: "engram-dev-log", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "engram-page-header", children: [
      /* @__PURE__ */ v.jsx(jn, { size: 24 }),
      /* @__PURE__ */ v.jsx("h2", { children: "开发日志" })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "engram-log-toolbar", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "engram-dropdown", children: [
        /* @__PURE__ */ v.jsxs(
          "button",
          {
            className: "engram-btn engram-btn-ghost",
            onClick: () => X(!$),
            children: [
              /* @__PURE__ */ v.jsx(dd, { size: 14 }),
              x === -1 ? "全部级别" : ei[x].label
            ]
          }
        ),
        $ && /* @__PURE__ */ v.jsxs("div", { className: "engram-dropdown-menu", children: [
          /* @__PURE__ */ v.jsx(
            "button",
            {
              onClick: () => {
                j(-1), X(!1);
              },
              children: "全部级别"
            }
          ),
          Object.entries(ei).map(([tt, gt]) => /* @__PURE__ */ v.jsxs(
            "button",
            {
              onClick: () => {
                j(Number(tt)), X(!1);
              },
              children: [
                gt.icon,
                " ",
                gt.label
              ]
            },
            tt
          ))
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "engram-dropdown", children: [
        /* @__PURE__ */ v.jsxs(
          "button",
          {
            className: "engram-btn engram-btn-ghost",
            onClick: () => P(!nt),
            children: [
              /* @__PURE__ */ v.jsx(dd, { size: 14 }),
              C
            ]
          }
        ),
        nt && /* @__PURE__ */ v.jsx("div", { className: "engram-dropdown-menu", children: k2.map((tt) => /* @__PURE__ */ v.jsx(
          "button",
          {
            onClick: () => {
              z(tt), P(!1);
            },
            children: tt
          },
          tt
        )) })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "engram-search-box", children: [
        /* @__PURE__ */ v.jsx(qf, { size: 14 }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "text",
            placeholder: "搜索日志...",
            value: p,
            onChange: (tt) => N(tt.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "engram-toolbar-right", children: [
        /* @__PURE__ */ v.jsx(
          "button",
          {
            className: `engram-btn engram-btn-ghost ${Y ? "active" : ""}`,
            onClick: () => B(!Y),
            title: "自动滚动到最新",
            children: /* @__PURE__ */ v.jsx(bh, { size: 14 })
          }
        ),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            className: "engram-btn engram-btn-ghost",
            onClick: Nl,
            title: "清空日志",
            children: /* @__PURE__ */ v.jsx(Ph, { size: 14 })
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "button",
          {
            className: "engram-btn engram-btn-primary",
            onClick: Rt,
            title: "导出日志",
            children: [
              /* @__PURE__ */ v.jsx(Rh, { size: 14 }),
              "导出"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "engram-terminal", ref: wt, children: o.length === 0 ? /* @__PURE__ */ v.jsxs("div", { className: "engram-terminal-empty", children: [
      /* @__PURE__ */ v.jsx(jn, { size: 48, strokeWidth: 1 }),
      /* @__PURE__ */ v.jsx("p", { children: "暂无日志记录" })
    ] }) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      o.map((tt) => /* @__PURE__ */ v.jsx(J2, { entry: tt }, tt.id)),
      /* @__PURE__ */ v.jsx("div", { ref: Yt })
    ] }) }),
    /* @__PURE__ */ v.jsxs("div", { className: "engram-log-statusbar", children: [
      /* @__PURE__ */ v.jsxs("span", { children: [
        "共 ",
        c.length,
        " 条日志"
      ] }),
      o.length !== c.length && /* @__PURE__ */ v.jsxs("span", { children: [
        "（显示 ",
        o.length,
        " 条）"
      ] })
    ] })
  ] });
}, W2 = () => /* @__PURE__ */ v.jsxs("div", { className: "engram-settings", children: [
  /* @__PURE__ */ v.jsxs("div", { className: "engram-page-header", children: [
    /* @__PURE__ */ v.jsx($f, { size: 24 }),
    /* @__PURE__ */ v.jsx("h2", { children: "设置" })
  ] }),
  /* @__PURE__ */ v.jsx("div", { className: "engram-page-content", children: /* @__PURE__ */ v.jsx("p", { className: "engram-placeholder", children: "设置选项将在这里展示..." }) })
] }), F2 = {
  "/dashboard": xd,
  "/memory": X2,
  "/graph": Z2,
  "/brain": Pu,
  "/brain/summarize": Pu,
  "/brain/vectorize": Pu,
  "/brain/batch": Pu,
  "/api": K2,
  "/dev": $2,
  "/settings": W2
}, I2 = ({ onClose: c }) => {
  const [r, o] = V.useState("/dashboard"), [s, p] = V.useState(!1), [N, x] = V.useState(!0), [j, C] = V.useState(
    typeof window < "u" && window.innerWidth < 768
  );
  V.useEffect(() => {
    const Y = () => {
      C(window.innerWidth < 768);
    };
    return window.addEventListener("resize", Y), () => window.removeEventListener("resize", Y);
  }, []), V.useEffect(() => {
    j && (p(!0), x(!1));
  }, [j]);
  const z = F2[r] || xd;
  return /* @__PURE__ */ v.jsx(
    f2,
    {
      currentPath: r,
      onNavigate: o,
      isFullscreen: s,
      onToggleFullscreen: () => p(!s),
      isSidebarOpen: N,
      onToggleSidebar: () => x(!N),
      onCloseSidebar: () => x(!1),
      isMobile: j,
      onClose: c,
      children: /* @__PURE__ */ v.jsx(z, { onNavigate: o })
    }
  );
};
Q2((c, r) => {
  const o = sh.createRoot(c);
  return o.render(lh.createElement(I2, { onClose: r })), o;
});
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Sd) : Sd();
export {
  P2 as c,
  pd as g
};
//# sourceMappingURL=index-UH_4uIpL.js.map
