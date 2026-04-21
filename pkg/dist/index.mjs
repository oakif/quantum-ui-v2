import { jsx as m, Fragment as Ee, jsxs as I } from "react/jsx-runtime";
import * as c from "react";
import N, { useState as At, useLayoutEffect as Ni, forwardRef as Ql, createElement as Ga, useEffect as sr, useMemo as qt, createContext as Jl, useContext as ec, useRef as gt, useCallback as Ae, memo as tc, Fragment as Zh } from "react";
import * as lr from "react-dom";
import nc from "react-dom";
function rc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = rc(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Pi() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = rc(e)) && (r && (r += " "), r += t);
  return r;
}
const Rs = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ms = Pi, Mn = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ms(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((u) => {
    const d = n == null ? void 0 : n[u], f = a == null ? void 0 : a[u];
    if (d === null) return null;
    const h = Rs(d) || Rs(f);
    return o[u][h];
  }), i = n && Object.entries(n).reduce((u, d) => {
    let [f, h] = d;
    return h === void 0 || (u[f] = h), u;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, d) => {
    let { class: f, className: h, ...g } = d;
    return Object.entries(g).every((v) => {
      let [p, b] = v;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...i
      }[p]) : {
        ...a,
        ...i
      }[p] === b;
    }) ? [
      ...u,
      f,
      h
    ] : u;
  }, []);
  return Ms(e, s, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
};
function Ns(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function yt(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Ns(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Ns(e[o], null);
        }
      };
  };
}
function ae(...e) {
  return c.useCallback(yt(...e), e);
}
// @__NO_SIDE_EFFECTS__
function It(e) {
  const t = /* @__PURE__ */ Qh(e), n = c.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = c.Children.toArray(a), l = i.find(ep);
    if (l) {
      const u = l.props.children, d = i.map((f) => f === l ? c.Children.count(u) > 1 ? c.Children.only(null) : c.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: c.isValidElement(u) ? c.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Di = /* @__PURE__ */ It("Slot");
// @__NO_SIDE_EFFECTS__
function Qh(e) {
  const t = c.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (c.isValidElement(o)) {
      const s = np(o), i = tp(a, o.props);
      return o.type !== c.Fragment && (i.ref = r ? yt(r, s) : s), c.cloneElement(o, i);
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var oc = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Jh(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(Ee, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = oc, t;
}
function ep(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === oc;
}
function tp(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const l = a(...i);
      return o(...i), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function np(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var rp = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], K = rp.reduce((e, t) => {
  const n = /* @__PURE__ */ It(`Primitive.${t}`), r = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(l, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function ac(e, t) {
  e && lr.flushSync(() => e.dispatchEvent(t));
}
var ic = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), op = "VisuallyHidden", sc = c.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    K.span,
    {
      ...e,
      ref: t,
      style: { ...ic, ...e.style }
    }
  )
);
sc.displayName = op;
var ap = sc;
function ip(e, t) {
  const n = c.createContext(t), r = (a) => {
    const { children: s, ...i } = a, l = c.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ m(n.Provider, { value: l, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = c.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function Le(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = c.createContext(s), l = n.length;
    n = [...n, s];
    const u = (f) => {
      var w;
      const { scope: h, children: g, ...v } = f, p = ((w = h == null ? void 0 : h[e]) == null ? void 0 : w[l]) || i, b = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ m(p.Provider, { value: b, children: g });
    };
    u.displayName = a + "Provider";
    function d(f, h) {
      var p;
      const g = ((p = h == null ? void 0 : h[e]) == null ? void 0 : p[l]) || i, v = c.useContext(g);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [u, d];
  }
  const o = () => {
    const a = n.map((s) => c.createContext(s));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, sp(o, ...t)];
}
function sp(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: l, scopeName: u }) => {
        const f = l(a)[`__scope${u}`];
        return { ...i, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function bo(e) {
  const t = e + "CollectionProvider", [n, r] = Le(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (p) => {
    const { scope: b, children: w } = p, x = N.useRef(null), y = N.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: b, itemMap: y, collectionRef: x, children: w });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ It(i), u = N.forwardRef(
    (p, b) => {
      const { scope: w, children: x } = p, y = a(i, w), S = ae(b, y.collectionRef);
      return /* @__PURE__ */ m(l, { ref: S, children: x });
    }
  );
  u.displayName = i;
  const d = e + "CollectionItemSlot", f = "data-radix-collection-item", h = /* @__PURE__ */ It(d), g = N.forwardRef(
    (p, b) => {
      const { scope: w, children: x, ...y } = p, S = N.useRef(null), C = ae(b, S), R = a(d, w);
      return N.useEffect(() => (R.itemMap.set(S, { ref: S, ...y }), () => void R.itemMap.delete(S))), /* @__PURE__ */ m(h, { [f]: "", ref: C, children: x });
    }
  );
  g.displayName = d;
  function v(p) {
    const b = a(e + "CollectionConsumer", p);
    return N.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const y = Array.from(x.querySelectorAll(`[${f}]`));
      return Array.from(b.itemMap.values()).sort(
        (R, E) => y.indexOf(R.ref.current) - y.indexOf(E.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: u, ItemSlot: g },
    v,
    r
  ];
}
function V(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
var ke = globalThis != null && globalThis.document ? c.useLayoutEffect : () => {
}, lp = c[" useInsertionEffect ".trim().toString()] || ke;
function Ue({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = cp({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const d = c.useRef(e !== void 0);
    c.useEffect(() => {
      const f = d.current;
      f !== i && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const u = c.useCallback(
    (d) => {
      var f;
      if (i) {
        const h = up(d) ? d(e) : d;
        h !== e && ((f = s.current) == null || f.call(s, h));
      } else
        a(d);
    },
    [i, e, a, s]
  );
  return [l, u];
}
function cp({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = c.useState(e), o = c.useRef(n), a = c.useRef(t);
  return lp(() => {
    a.current = t;
  }, [t]), c.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function up(e) {
  return typeof e == "function";
}
function dp(e, t) {
  return c.useReducer((n, r) => t[n][r] ?? n, e);
}
var _e = (e) => {
  const { present: t, children: n } = e, r = fp(t), o = typeof n == "function" ? n({ present: r.isPresent }) : c.Children.only(n), a = ae(r.ref, mp(o));
  return typeof n == "function" || r.isPresent ? c.cloneElement(o, { ref: a }) : null;
};
_e.displayName = "Presence";
function fp(e) {
  const [t, n] = c.useState(), r = c.useRef(null), o = c.useRef(e), a = c.useRef("none"), s = e ? "mounted" : "unmounted", [i, l] = dp(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return c.useEffect(() => {
    const u = _r(r.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), ke(() => {
    const u = r.current, d = o.current;
    if (d !== e) {
      const h = a.current, g = _r(u);
      e ? l("MOUNT") : g === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(d && h !== g ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), ke(() => {
    if (t) {
      let u;
      const d = t.ownerDocument.defaultView ?? window, f = (g) => {
        const p = _r(r.current).includes(CSS.escape(g.animationName));
        if (g.target === t && p && (l("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, h = (g) => {
        g.target === t && (a.current = _r(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: c.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function _r(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function mp(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var hp = c[" useId ".trim().toString()] || (() => {
}), pp = 0;
function Ce(e) {
  const [t, n] = c.useState(hp());
  return ke(() => {
    n((r) => r ?? String(pp++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var gp = c.createContext(void 0);
function Nn(e) {
  const t = c.useContext(gp);
  return e || t || "ltr";
}
function De(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function vp(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = De(e);
  c.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var bp = "DismissableLayer", ja = "dismissableLayer.update", wp = "dismissableLayer.pointerDownOutside", yp = "dismissableLayer.focusOutside", Ps, lc = c.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Pn = c.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...l
    } = e, u = c.useContext(lc), [d, f] = c.useState(null), h = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, g] = c.useState({}), v = ae(t, (E) => f(E)), p = Array.from(u.layers), [b] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), w = p.indexOf(b), x = d ? p.indexOf(d) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, S = x >= w, C = Cp((E) => {
      const k = E.target, M = [...u.branches].some((T) => T.contains(k));
      !S || M || (o == null || o(E), s == null || s(E), E.defaultPrevented || i == null || i());
    }, h), R = Ep((E) => {
      const k = E.target;
      [...u.branches].some((T) => T.contains(k)) || (a == null || a(E), s == null || s(E), E.defaultPrevented || i == null || i());
    }, h);
    return vp((E) => {
      x === u.layers.size - 1 && (r == null || r(E), !E.defaultPrevented && i && (E.preventDefault(), i()));
    }, h), c.useEffect(() => {
      if (d)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Ps = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Ds(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Ps);
        };
    }, [d, h, n, u]), c.useEffect(() => () => {
      d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Ds());
    }, [d, u]), c.useEffect(() => {
      const E = () => g({});
      return document.addEventListener(ja, E), () => document.removeEventListener(ja, E);
    }, []), /* @__PURE__ */ m(
      K.div,
      {
        ...l,
        ref: v,
        style: {
          pointerEvents: y ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: V(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: V(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: V(
          e.onPointerDownCapture,
          C.onPointerDownCapture
        )
      }
    );
  }
);
Pn.displayName = bp;
var xp = "DismissableLayerBranch", Sp = c.forwardRef((e, t) => {
  const n = c.useContext(lc), r = c.useRef(null), o = ae(t, r);
  return c.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ m(K.div, { ...e, ref: o });
});
Sp.displayName = xp;
function Cp(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = De(e), r = c.useRef(!1), o = c.useRef(() => {
  });
  return c.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          cc(
            wp,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Ep(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = De(e), r = c.useRef(!1);
  return c.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && cc(yp, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ds() {
  const e = new CustomEvent(ja);
  document.dispatchEvent(e);
}
function cc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? ac(o, a) : o.dispatchEvent(a);
}
var sa = "focusScope.autoFocusOnMount", la = "focusScope.autoFocusOnUnmount", Ts = { bubbles: !1, cancelable: !0 }, kp = "FocusScope", cr = c.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, l] = c.useState(null), u = De(o), d = De(a), f = c.useRef(null), h = ae(t, (p) => l(p)), g = c.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  c.useEffect(() => {
    if (r) {
      let p = function(y) {
        if (g.paused || !i) return;
        const S = y.target;
        i.contains(S) ? f.current = S : Dt(f.current, { select: !0 });
      }, b = function(y) {
        if (g.paused || !i) return;
        const S = y.relatedTarget;
        S !== null && (i.contains(S) || Dt(f.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const C of y)
            C.removedNodes.length > 0 && Dt(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", b);
      const x = new MutationObserver(w);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, g.paused]), c.useEffect(() => {
    if (i) {
      _s.add(g);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const w = new CustomEvent(sa, Ts);
        i.addEventListener(sa, u), i.dispatchEvent(w), w.defaultPrevented || (Rp(Tp(uc(i)), { select: !0 }), document.activeElement === p && Dt(i));
      }
      return () => {
        i.removeEventListener(sa, u), setTimeout(() => {
          const w = new CustomEvent(la, Ts);
          i.addEventListener(la, d), i.dispatchEvent(w), w.defaultPrevented || Dt(p ?? document.body, { select: !0 }), i.removeEventListener(la, d), _s.remove(g);
        }, 0);
      };
    }
  }, [i, u, d, g]);
  const v = c.useCallback(
    (p) => {
      if (!n && !r || g.paused) return;
      const b = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, w = document.activeElement;
      if (b && w) {
        const x = p.currentTarget, [y, S] = Mp(x);
        y && S ? !p.shiftKey && w === S ? (p.preventDefault(), n && Dt(y, { select: !0 })) : p.shiftKey && w === y && (p.preventDefault(), n && Dt(S, { select: !0 })) : w === x && p.preventDefault();
      }
    },
    [n, r, g.paused]
  );
  return /* @__PURE__ */ m(K.div, { tabIndex: -1, ...s, ref: h, onKeyDown: v });
});
cr.displayName = kp;
function Rp(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Dt(r, { select: t }), document.activeElement !== n) return;
}
function Mp(e) {
  const t = uc(e), n = Os(t, e), r = Os(t.reverse(), e);
  return [n, r];
}
function uc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Os(e, t) {
  for (const n of e)
    if (!Np(n, { upTo: t })) return n;
}
function Np(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Pp(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Dt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Pp(e) && t && e.select();
  }
}
var _s = Dp();
function Dp() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = As(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = As(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function As(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Tp(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Op = "Portal", Dn = c.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = c.useState(!1);
  ke(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? nc.createPortal(/* @__PURE__ */ m(K.div, { ...r, ref: t }), s) : null;
});
Dn.displayName = Op;
var ca = 0;
function wo() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Is()), document.body.insertAdjacentElement("beforeend", e[1] ?? Is()), ca++, () => {
      ca === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ca--;
    };
  }, []);
}
function Is() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var ot = function() {
  return ot = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, ot.apply(this, arguments);
};
function dc(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function _p(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Qr = "right-scroll-bar-position", Jr = "width-before-scroll-bar", Ap = "with-scroll-bars-hidden", Ip = "--removed-body-scroll-bar-size";
function ua(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Lp(e, t) {
  var n = At(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var $p = typeof window < "u" ? c.useLayoutEffect : c.useEffect, Ls = /* @__PURE__ */ new WeakMap();
function zp(e, t) {
  var n = Lp(null, function(r) {
    return e.forEach(function(o) {
      return ua(o, r);
    });
  });
  return $p(function() {
    var r = Ls.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || ua(i, null);
      }), a.forEach(function(i) {
        o.has(i) || ua(i, s);
      });
    }
    Ls.set(n, e);
  }, [e]), n;
}
function Fp(e) {
  return e;
}
function Wp(e, t) {
  t === void 0 && (t = Fp);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var s = t(a, r);
      return n.push(s), function() {
        n = n.filter(function(i) {
          return i !== s;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(a);
      }
      n = {
        push: function(i) {
          return a(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var s = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(a), s = n;
      }
      var l = function() {
        var d = s;
        s = [], d.forEach(a);
      }, u = function() {
        return Promise.resolve().then(l);
      };
      u(), n = {
        push: function(d) {
          s.push(d), u();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return o;
}
function Bp(e) {
  e === void 0 && (e = {});
  var t = Wp(null);
  return t.options = ot({ async: !0, ssr: !1 }, e), t;
}
var fc = function(e) {
  var t = e.sideCar, n = dc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return c.createElement(r, ot({}, n));
};
fc.isSideCarExport = !0;
function Vp(e, t) {
  return e.useMedium(t), fc;
}
var mc = Bp(), da = function() {
}, yo = c.forwardRef(function(e, t) {
  var n = c.useRef(null), r = c.useState({
    onScrollCapture: da,
    onWheelCapture: da,
    onTouchMoveCapture: da
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, h = e.sideCar, g = e.noRelative, v = e.noIsolation, p = e.inert, b = e.allowPinchZoom, w = e.as, x = w === void 0 ? "div" : w, y = e.gapMode, S = dc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), C = h, R = zp([n, t]), E = ot(ot({}, S), o);
  return c.createElement(
    c.Fragment,
    null,
    d && c.createElement(C, { sideCar: mc, removeScrollBar: u, shards: f, noRelative: g, noIsolation: v, inert: p, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    s ? c.cloneElement(c.Children.only(i), ot(ot({}, E), { ref: R })) : c.createElement(x, ot({}, E, { className: l, ref: R }), i)
  );
});
yo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
yo.classNames = {
  fullWidth: Jr,
  zeroRight: Qr
};
var Hp = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Yp() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Hp();
  return t && e.setAttribute("nonce", t), e;
}
function Up(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Gp(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var jp = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Yp()) && (Up(t, n), Gp(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Kp = function() {
  var e = jp();
  return function(t, n) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, hc = function() {
  var e = Kp(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, qp = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, fa = function(e) {
  return parseInt(e || "", 10) || 0;
}, Xp = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [fa(n), fa(r), fa(o)];
}, Zp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return qp;
  var t = Xp(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Qp = hc(), wn = "data-scroll-locked", Jp = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Ap, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(wn, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Qr, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Jr, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Qr, " .").concat(Qr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Jr, " .").concat(Jr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(wn, `] {
    `).concat(Ip, ": ").concat(i, `px;
  }
`);
}, $s = function() {
  var e = parseInt(document.body.getAttribute(wn) || "0", 10);
  return isFinite(e) ? e : 0;
}, eg = function() {
  c.useEffect(function() {
    return document.body.setAttribute(wn, ($s() + 1).toString()), function() {
      var e = $s() - 1;
      e <= 0 ? document.body.removeAttribute(wn) : document.body.setAttribute(wn, e.toString());
    };
  }, []);
}, tg = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  eg();
  var a = c.useMemo(function() {
    return Zp(o);
  }, [o]);
  return c.createElement(Qp, { styles: Jp(a, !t, o, n ? "" : "!important") });
}, Ka = !1;
if (typeof window < "u")
  try {
    var Ar = Object.defineProperty({}, "passive", {
      get: function() {
        return Ka = !0, !0;
      }
    });
    window.addEventListener("test", Ar, Ar), window.removeEventListener("test", Ar, Ar);
  } catch {
    Ka = !1;
  }
var ln = Ka ? { passive: !1 } : !1, ng = function(e) {
  return e.tagName === "TEXTAREA";
}, pc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !ng(e) && n[t] === "visible")
  );
}, rg = function(e) {
  return pc(e, "overflowY");
}, og = function(e) {
  return pc(e, "overflowX");
}, zs = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = gc(e, r);
    if (o) {
      var a = vc(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, ag = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, ig = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, gc = function(e, t) {
  return e === "v" ? rg(t) : og(t);
}, vc = function(e, t) {
  return e === "v" ? ag(t) : ig(t);
}, sg = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, lg = function(e, t, n, r, o) {
  var a = sg(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, l = t.contains(i), u = !1, d = s > 0, f = 0, h = 0;
  do {
    if (!i)
      break;
    var g = vc(e, i), v = g[0], p = g[1], b = g[2], w = p - b - a * v;
    (v || w) && gc(e, i) && (f += w, h += v);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (d && Math.abs(f) < 1 || !d && Math.abs(h) < 1) && (u = !0), u;
}, Ir = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Fs = function(e) {
  return [e.deltaX, e.deltaY];
}, Ws = function(e) {
  return e && "current" in e ? e.current : e;
}, cg = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, ug = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, dg = 0, cn = [];
function fg(e) {
  var t = c.useRef([]), n = c.useRef([0, 0]), r = c.useRef(), o = c.useState(dg++)[0], a = c.useState(hc)[0], s = c.useRef(e);
  c.useEffect(function() {
    s.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = _p([e.lockRef.current], (e.shards || []).map(Ws), !0).filter(Boolean);
      return p.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = c.useCallback(function(p, b) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !s.current.allowPinchZoom;
    var w = Ir(p), x = n.current, y = "deltaX" in p ? p.deltaX : x[0] - w[0], S = "deltaY" in p ? p.deltaY : x[1] - w[1], C, R = p.target, E = Math.abs(y) > Math.abs(S) ? "h" : "v";
    if ("touches" in p && E === "h" && R.type === "range")
      return !1;
    var k = zs(E, R);
    if (!k)
      return !0;
    if (k ? C = E : (C = E === "v" ? "h" : "v", k = zs(E, R)), !k)
      return !1;
    if (!r.current && "changedTouches" in p && (y || S) && (r.current = C), !C)
      return !0;
    var M = r.current || C;
    return lg(M, b, p, M === "h" ? y : S);
  }, []), l = c.useCallback(function(p) {
    var b = p;
    if (!(!cn.length || cn[cn.length - 1] !== a)) {
      var w = "deltaY" in b ? Fs(b) : Ir(b), x = t.current.filter(function(C) {
        return C.name === b.type && (C.target === b.target || b.target === C.shadowParent) && cg(C.delta, w);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var y = (s.current.shards || []).map(Ws).filter(Boolean).filter(function(C) {
          return C.contains(b.target);
        }), S = y.length > 0 ? i(b, y[0]) : !s.current.noIsolation;
        S && b.cancelable && b.preventDefault();
      }
    }
  }, []), u = c.useCallback(function(p, b, w, x) {
    var y = { name: p, delta: b, target: w, should: x, shadowParent: mg(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== y;
      });
    }, 1);
  }, []), d = c.useCallback(function(p) {
    n.current = Ir(p), r.current = void 0;
  }, []), f = c.useCallback(function(p) {
    u(p.type, Fs(p), p.target, i(p, e.lockRef.current));
  }, []), h = c.useCallback(function(p) {
    u(p.type, Ir(p), p.target, i(p, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return cn.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, ln), document.addEventListener("touchmove", l, ln), document.addEventListener("touchstart", d, ln), function() {
      cn = cn.filter(function(p) {
        return p !== a;
      }), document.removeEventListener("wheel", l, ln), document.removeEventListener("touchmove", l, ln), document.removeEventListener("touchstart", d, ln);
    };
  }, []);
  var g = e.removeScrollBar, v = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    v ? c.createElement(a, { styles: ug(o) }) : null,
    g ? c.createElement(tg, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function mg(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const hg = Vp(mc, fg);
var ur = c.forwardRef(function(e, t) {
  return c.createElement(yo, ot({}, e, { ref: t, sideCar: hg }));
});
ur.classNames = yo.classNames;
var pg = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, un = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), $r = {}, ma = 0, bc = function(e) {
  return e && (e.host || bc(e.parentNode));
}, gg = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = bc(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, vg = function(e, t, n, r) {
  var o = gg(t, Array.isArray(e) ? e : [e]);
  $r[n] || ($r[n] = /* @__PURE__ */ new WeakMap());
  var a = $r[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(f) {
    !f || i.has(f) || (i.add(f), u(f.parentNode));
  };
  o.forEach(u);
  var d = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(h) {
      if (i.has(h))
        d(h);
      else
        try {
          var g = h.getAttribute(r), v = g !== null && g !== "false", p = (un.get(h) || 0) + 1, b = (a.get(h) || 0) + 1;
          un.set(h, p), a.set(h, b), s.push(h), p === 1 && v && Lr.set(h, !0), b === 1 && h.setAttribute(n, "true"), v || h.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", h, w);
        }
    });
  };
  return d(t), i.clear(), ma++, function() {
    s.forEach(function(f) {
      var h = un.get(f) - 1, g = a.get(f) - 1;
      un.set(f, h), a.set(f, g), h || (Lr.has(f) || f.removeAttribute(r), Lr.delete(f)), g || f.removeAttribute(n);
    }), ma--, ma || (un = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), $r = {});
  };
}, xo = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = pg(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), vg(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, So = "Dialog", [wc, R1] = Le(So), [bg, Qe] = wc(So), yc = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = c.useRef(null), l = c.useRef(null), [u, d] = Ue({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: So
  });
  return /* @__PURE__ */ m(
    bg,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Ce(),
      titleId: Ce(),
      descriptionId: Ce(),
      open: u,
      onOpenChange: d,
      onOpenToggle: c.useCallback(() => d((f) => !f), [d]),
      modal: s,
      children: n
    }
  );
};
yc.displayName = So;
var xc = "DialogTrigger", Sc = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(xc, n), a = ae(t, o.triggerRef);
    return /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": _i(o.open),
        ...r,
        ref: a,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Sc.displayName = xc;
var Ti = "DialogPortal", [wg, Cc] = wc(Ti, {
  forceMount: void 0
}), Ec = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Qe(Ti, t);
  return /* @__PURE__ */ m(wg, { scope: t, forceMount: n, children: c.Children.map(r, (s) => /* @__PURE__ */ m(_e, { present: n || a.open, children: /* @__PURE__ */ m(Dn, { asChild: !0, container: o, children: s }) })) });
};
Ec.displayName = Ti;
var ro = "DialogOverlay", kc = c.forwardRef(
  (e, t) => {
    const n = Cc(ro, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Qe(ro, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ m(_e, { present: r || a.open, children: /* @__PURE__ */ m(xg, { ...o, ref: t }) }) : null;
  }
);
kc.displayName = ro;
var yg = /* @__PURE__ */ It("DialogOverlay.RemoveScroll"), xg = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(ro, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ m(ur, { as: yg, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ m(
        K.div,
        {
          "data-state": _i(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Xt = "DialogContent", Rc = c.forwardRef(
  (e, t) => {
    const n = Cc(Xt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Qe(Xt, e.__scopeDialog);
    return /* @__PURE__ */ m(_e, { present: r || a.open, children: a.modal ? /* @__PURE__ */ m(Sg, { ...o, ref: t }) : /* @__PURE__ */ m(Cg, { ...o, ref: t }) });
  }
);
Rc.displayName = Xt;
var Sg = c.forwardRef(
  (e, t) => {
    const n = Qe(Xt, e.__scopeDialog), r = c.useRef(null), o = ae(t, n.contentRef, r);
    return c.useEffect(() => {
      const a = r.current;
      if (a) return xo(a);
    }, []), /* @__PURE__ */ m(
      Mc,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: V(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: V(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Cg = c.forwardRef(
  (e, t) => {
    const n = Qe(Xt, e.__scopeDialog), r = c.useRef(!1), o = c.useRef(!1);
    return /* @__PURE__ */ m(
      Mc,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var l, u;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Mc = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Qe(Xt, n), l = c.useRef(null), u = ae(t, l);
    return wo(), /* @__PURE__ */ I(Ee, { children: [
      /* @__PURE__ */ m(
        cr,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ m(
            Pn,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": _i(i.open),
              ...s,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ I(Ee, { children: [
        /* @__PURE__ */ m(Eg, { titleId: i.titleId }),
        /* @__PURE__ */ m(Rg, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Oi = "DialogTitle", Nc = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(Oi, n);
    return /* @__PURE__ */ m(K.h2, { id: o.titleId, ...r, ref: t });
  }
);
Nc.displayName = Oi;
var Pc = "DialogDescription", Dc = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(Pc, n);
    return /* @__PURE__ */ m(K.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Dc.displayName = Pc;
var Tc = "DialogClose", Oc = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(Tc, n);
    return /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Oc.displayName = Tc;
function _i(e) {
  return e ? "open" : "closed";
}
var _c = "DialogTitleWarning", [M1, Ac] = ip(_c, {
  contentName: Xt,
  titleName: Oi,
  docsSlug: "dialog"
}), Eg = ({ titleId: e }) => {
  const t = Ac(_c), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return c.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, kg = "DialogDescriptionWarning", Rg = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ac(kg).contentName}}.`;
  return c.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Ai = yc, Ic = Sc, Ii = Ec, Li = kc, $i = Rc, Lc = Nc, $c = Dc, dr = Oc, zr = { exports: {} }, ha = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bs;
function Mg() {
  if (Bs) return ha;
  Bs = 1;
  var e = N;
  function t(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, o = e.useEffect, a = e.useLayoutEffect, s = e.useDebugValue;
  function i(f, h) {
    var g = h(), v = r({ inst: { value: g, getSnapshot: h } }), p = v[0].inst, b = v[1];
    return a(
      function() {
        p.value = g, p.getSnapshot = h, l(p) && b({ inst: p });
      },
      [f, g, h]
    ), o(
      function() {
        return l(p) && b({ inst: p }), f(function() {
          l(p) && b({ inst: p });
        });
      },
      [f]
    ), s(g), g;
  }
  function l(f) {
    var h = f.getSnapshot;
    f = f.value;
    try {
      var g = h();
      return !n(f, g);
    } catch {
      return !0;
    }
  }
  function u(f, h) {
    return h();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : i;
  return ha.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d, ha;
}
var pa = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vs;
function Ng() {
  return Vs || (Vs = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(g, v) {
      return g === v && (g !== 0 || 1 / g === 1 / v) || g !== g && v !== v;
    }
    function t(g, v) {
      d || o.startTransition === void 0 || (d = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var p = v();
      if (!f) {
        var b = v();
        a(p, b) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), f = !0);
      }
      b = s({
        inst: { value: p, getSnapshot: v }
      });
      var w = b[0].inst, x = b[1];
      return l(
        function() {
          w.value = p, w.getSnapshot = v, n(w) && x({ inst: w });
        },
        [g, p, v]
      ), i(
        function() {
          return n(w) && x({ inst: w }), g(function() {
            n(w) && x({ inst: w });
          });
        },
        [g]
      ), u(p), p;
    }
    function n(g) {
      var v = g.getSnapshot;
      g = g.value;
      try {
        var p = v();
        return !a(g, p);
      } catch {
        return !0;
      }
    }
    function r(g, v) {
      return v();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var o = N, a = typeof Object.is == "function" ? Object.is : e, s = o.useState, i = o.useEffect, l = o.useLayoutEffect, u = o.useDebugValue, d = !1, f = !1, h = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    pa.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), pa;
}
var Hs;
function Pg() {
  return Hs || (Hs = 1, process.env.NODE_ENV === "production" ? zr.exports = Mg() : zr.exports = Ng()), zr.exports;
}
var Dg = Pg();
function Tg() {
  return Dg.useSyncExternalStore(
    Og,
    () => !0,
    () => !1
  );
}
function Og() {
  return () => {
  };
}
var zi = "Avatar", [_g, N1] = Le(zi), [Ag, zc] = _g(zi), Fc = c.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...r } = e, [o, a] = c.useState("idle");
    return /* @__PURE__ */ m(
      Ag,
      {
        scope: n,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ m(K.span, { ...r, ref: t })
      }
    );
  }
);
Fc.displayName = zi;
var Wc = "AvatarImage", Bc = c.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {
    }, ...a } = e, s = zc(Wc, n), i = Ig(r, a), l = De((u) => {
      o(u), s.onImageLoadingStatusChange(u);
    });
    return ke(() => {
      i !== "idle" && l(i);
    }, [i, l]), i === "loaded" ? /* @__PURE__ */ m(K.img, { ...a, ref: t, src: r }) : null;
  }
);
Bc.displayName = Wc;
var Vc = "AvatarFallback", Hc = c.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e, a = zc(Vc, n), [s, i] = c.useState(r === void 0);
    return c.useEffect(() => {
      if (r !== void 0) {
        const l = window.setTimeout(() => i(!0), r);
        return () => window.clearTimeout(l);
      }
    }, [r]), s && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ m(K.span, { ...o, ref: t }) : null;
  }
);
Hc.displayName = Vc;
function Ys(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function Ig(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = Tg(), o = c.useRef(null), a = r ? (o.current || (o.current = new window.Image()), o.current) : null, [s, i] = c.useState(
    () => Ys(a, e)
  );
  return ke(() => {
    i(Ys(a, e));
  }, [a, e]), ke(() => {
    const l = (f) => () => {
      i(f);
    };
    if (!a) return;
    const u = l("loaded"), d = l("error");
    return a.addEventListener("load", u), a.addEventListener("error", d), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
      a.removeEventListener("load", u), a.removeEventListener("error", d);
    };
  }, [a, n, t]), s;
}
var Lg = Fc, $g = Bc, zg = Hc;
function Co(e) {
  const t = c.useRef({ value: e, previous: e });
  return c.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function Eo(e) {
  const [t, n] = c.useState(void 0);
  return ke(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const l = a.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          s = u.inlineSize, i = u.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var ko = "Checkbox", [Fg, P1] = Le(ko), [Wg, Fi] = Fg(ko);
function Bg(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: l,
    required: u,
    value: d = "on",
    // @ts-expect-error
    internal_do_not_use_render: f
  } = e, [h, g] = Ue({
    prop: n,
    defaultProp: o ?? !1,
    onChange: l,
    caller: ko
  }), [v, p] = c.useState(null), [b, w] = c.useState(null), x = c.useRef(!1), y = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: h,
    disabled: a,
    setChecked: g,
    control: v,
    setControl: p,
    name: i,
    form: s,
    value: d,
    hasConsumerStoppedPropagationRef: x,
    required: u,
    defaultChecked: Ot(o) ? !1 : o,
    isFormControl: y,
    bubbleInput: b,
    setBubbleInput: w
  };
  return /* @__PURE__ */ m(
    Wg,
    {
      scope: t,
      ...S,
      children: Vg(f) ? f(S) : r
    }
  );
}
var Yc = "CheckboxTrigger", Uc = c.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: l,
      required: u,
      setControl: d,
      setChecked: f,
      hasConsumerStoppedPropagationRef: h,
      isFormControl: g,
      bubbleInput: v
    } = Fi(Yc, e), p = ae(o, d), b = c.useRef(l);
    return c.useEffect(() => {
      const w = a == null ? void 0 : a.form;
      if (w) {
        const x = () => f(b.current);
        return w.addEventListener("reset", x), () => w.removeEventListener("reset", x);
      }
    }, [a, f]), /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": Ot(l) ? "mixed" : l,
        "aria-required": u,
        "data-state": Zc(l),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: p,
        onKeyDown: V(t, (w) => {
          w.key === "Enter" && w.preventDefault();
        }),
        onClick: V(n, (w) => {
          f((x) => Ot(x) ? !0 : !x), v && g && (h.current = w.isPropagationStopped(), h.current || w.stopPropagation());
        })
      }
    );
  }
);
Uc.displayName = Yc;
var Gc = c.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l,
      onCheckedChange: u,
      form: d,
      ...f
    } = e;
    return /* @__PURE__ */ m(
      Bg,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: u,
        name: r,
        form: d,
        value: l,
        internal_do_not_use_render: ({ isFormControl: h }) => /* @__PURE__ */ I(Ee, { children: [
          /* @__PURE__ */ m(
            Uc,
            {
              ...f,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          h && /* @__PURE__ */ m(
            Xc,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Gc.displayName = ko;
var jc = "CheckboxIndicator", Kc = c.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = Fi(jc, n);
    return /* @__PURE__ */ m(
      _e,
      {
        present: r || Ot(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ m(
          K.span,
          {
            "data-state": Zc(a.checked),
            "data-disabled": a.disabled ? "" : void 0,
            ...o,
            ref: t,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
Kc.displayName = jc;
var qc = "CheckboxBubbleInput", Xc = c.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: l,
      name: u,
      value: d,
      form: f,
      bubbleInput: h,
      setBubbleInput: g
    } = Fi(qc, e), v = ae(n, g), p = Co(a), b = Eo(r);
    c.useEffect(() => {
      const x = h;
      if (!x) return;
      const y = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(
        y,
        "checked"
      ).set, R = !o.current;
      if (p !== a && C) {
        const E = new Event("click", { bubbles: R });
        x.indeterminate = Ot(a), C.call(x, Ot(a) ? !1 : a), x.dispatchEvent(E);
      }
    }, [h, p, a, o]);
    const w = c.useRef(Ot(a) ? !1 : a);
    return /* @__PURE__ */ m(
      K.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? w.current,
        required: i,
        disabled: l,
        name: u,
        value: d,
        form: f,
        ...t,
        tabIndex: -1,
        ref: v,
        style: {
          ...t.style,
          ...b,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
Xc.displayName = qc;
function Vg(e) {
  return typeof e == "function";
}
function Ot(e) {
  return e === "indeterminate";
}
function Zc(e) {
  return Ot(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Hg = ["top", "right", "bottom", "left"], Lt = Math.min, Fe = Math.max, oo = Math.round, Fr = Math.floor, lt = (e) => ({
  x: e,
  y: e
}), Yg = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ug = {
  start: "end",
  end: "start"
};
function qa(e, t, n) {
  return Fe(e, Lt(t, n));
}
function xt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function St(e) {
  return e.split("-")[0];
}
function Tn(e) {
  return e.split("-")[1];
}
function Wi(e) {
  return e === "x" ? "y" : "x";
}
function Bi(e) {
  return e === "y" ? "height" : "width";
}
const Gg = /* @__PURE__ */ new Set(["top", "bottom"]);
function it(e) {
  return Gg.has(St(e)) ? "y" : "x";
}
function Vi(e) {
  return Wi(it(e));
}
function jg(e, t, n) {
  n === void 0 && (n = !1);
  const r = Tn(e), o = Vi(e), a = Bi(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = ao(s)), [s, ao(s)];
}
function Kg(e) {
  const t = ao(e);
  return [Xa(e), t, Xa(t)];
}
function Xa(e) {
  return e.replace(/start|end/g, (t) => Ug[t]);
}
const Us = ["left", "right"], Gs = ["right", "left"], qg = ["top", "bottom"], Xg = ["bottom", "top"];
function Zg(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Gs : Us : t ? Us : Gs;
    case "left":
    case "right":
      return t ? qg : Xg;
    default:
      return [];
  }
}
function Qg(e, t, n, r) {
  const o = Tn(e);
  let a = Zg(St(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Xa)))), a;
}
function ao(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Yg[t]);
}
function Jg(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Qc(e) {
  return typeof e != "number" ? Jg(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function io(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function js(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = it(t), s = Vi(t), i = Bi(s), l = St(t), u = a === "y", d = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, h = r[i] / 2 - o[i] / 2;
  let g;
  switch (l) {
    case "top":
      g = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      g = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      g = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      g = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      g = {
        x: r.x,
        y: r.y
      };
  }
  switch (Tn(t)) {
    case "start":
      g[s] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      g[s] += h * (n && u ? -1 : 1);
      break;
  }
  return g;
}
const ev = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: f
  } = js(u, r, l), h = r, g = {}, v = 0;
  for (let p = 0; p < i.length; p++) {
    const {
      name: b,
      fn: w
    } = i[p], {
      x,
      y,
      data: S,
      reset: C
    } = await w({
      x: d,
      y: f,
      initialPlacement: r,
      placement: h,
      strategy: o,
      middlewareData: g,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = x ?? d, f = y ?? f, g = {
      ...g,
      [b]: {
        ...g[b],
        ...S
      }
    }, C && v <= 50 && (v++, typeof C == "object" && (C.placement && (h = C.placement), C.rects && (u = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: d,
      y: f
    } = js(u, h, l)), p = -1);
  }
  return {
    x: d,
    y: f,
    placement: h,
    strategy: o,
    middlewareData: g
  };
};
async function Zn(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: s,
    elements: i,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: h = !1,
    padding: g = 0
  } = xt(t, e), v = Qc(g), b = i[h ? f === "floating" ? "reference" : "floating" : f], w = io(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: l
  })), x = f === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), S = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = io(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: y,
    strategy: l
  }) : x);
  return {
    top: (w.top - C.top + v.top) / S.y,
    bottom: (C.bottom - w.bottom + v.bottom) / S.y,
    left: (w.left - C.left + v.left) / S.x,
    right: (C.right - w.right + v.right) / S.x
  };
}
const tv = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: s,
      elements: i,
      middlewareData: l
    } = t, {
      element: u,
      padding: d = 0
    } = xt(e, t) || {};
    if (u == null)
      return {};
    const f = Qc(d), h = {
      x: n,
      y: r
    }, g = Vi(o), v = Bi(g), p = await s.getDimensions(u), b = g === "y", w = b ? "top" : "left", x = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", S = a.reference[v] + a.reference[g] - h[g] - a.floating[v], C = h[g] - a.reference[g], R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let E = R ? R[y] : 0;
    (!E || !await (s.isElement == null ? void 0 : s.isElement(R))) && (E = i.floating[y] || a.floating[v]);
    const k = S / 2 - C / 2, M = E / 2 - p[v] / 2 - 1, T = Lt(f[w], M), O = Lt(f[x], M), L = T, A = E - p[v] - O, Y = E / 2 - p[v] / 2 + k, j = qa(L, Y, A), F = !l.arrow && Tn(o) != null && Y !== j && a.reference[v] / 2 - (Y < L ? T : O) - p[v] / 2 < 0, G = F ? Y < L ? Y - L : Y - A : 0;
    return {
      [g]: h[g] + G,
      data: {
        [g]: j,
        centerOffset: Y - j - G,
        ...F && {
          alignmentOffset: G
        }
      },
      reset: F
    };
  }
}), nv = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: s,
        initialPlacement: i,
        platform: l,
        elements: u
      } = t, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: h,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: p = !0,
        ...b
      } = xt(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const w = St(o), x = it(i), y = St(i) === i, S = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), C = h || (y || !p ? [ao(i)] : Kg(i)), R = v !== "none";
      !h && R && C.push(...Qg(i, p, v, S));
      const E = [i, ...C], k = await Zn(t, b), M = [];
      let T = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (d && M.push(k[w]), f) {
        const Y = jg(o, s, S);
        M.push(k[Y[0]], k[Y[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: M
      }], !M.every((Y) => Y <= 0)) {
        var O, L;
        const Y = (((O = a.flip) == null ? void 0 : O.index) || 0) + 1, j = E[Y];
        if (j && (!(f === "alignment" ? x !== it(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((P) => it(P.placement) === x ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Y,
              overflows: T
            },
            reset: {
              placement: j
            }
          };
        let F = (L = T.filter((G) => G.overflows[0] <= 0).sort((G, P) => G.overflows[1] - P.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!F)
          switch (g) {
            case "bestFit": {
              var A;
              const G = (A = T.filter((P) => {
                if (R) {
                  const _ = it(P.placement);
                  return _ === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  _ === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((_) => _ > 0).reduce((_, Z) => _ + Z, 0)]).sort((P, _) => P[1] - _[1])[0]) == null ? void 0 : A[0];
              G && (F = G);
              break;
            }
            case "initialPlacement":
              F = i;
              break;
          }
        if (o !== F)
          return {
            reset: {
              placement: F
            }
          };
      }
      return {};
    }
  };
};
function Ks(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function qs(e) {
  return Hg.some((t) => e[t] >= 0);
}
const rv = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = xt(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await Zn(t, {
            ...o,
            elementContext: "reference"
          }), s = Ks(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: qs(s)
            }
          };
        }
        case "escaped": {
          const a = await Zn(t, {
            ...o,
            altBoundary: !0
          }), s = Ks(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: qs(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Jc = /* @__PURE__ */ new Set(["left", "top"]);
async function ov(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = St(n), i = Tn(n), l = it(n) === "y", u = Jc.has(s) ? -1 : 1, d = a && l ? -1 : 1, f = xt(t, e);
  let {
    mainAxis: h,
    crossAxis: g,
    alignmentAxis: v
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return i && typeof v == "number" && (g = i === "end" ? v * -1 : v), l ? {
    x: g * d,
    y: h * u
  } : {
    x: h * u,
    y: g * d
  };
}
const av = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: s,
        middlewareData: i
      } = t, l = await ov(t, e);
      return s === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: a + l.y,
        data: {
          ...l,
          placement: s
        }
      };
    }
  };
}, iv = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: s = !1,
        limiter: i = {
          fn: (b) => {
            let {
              x: w,
              y: x
            } = b;
            return {
              x: w,
              y: x
            };
          }
        },
        ...l
      } = xt(e, t), u = {
        x: n,
        y: r
      }, d = await Zn(t, l), f = it(St(o)), h = Wi(f);
      let g = u[h], v = u[f];
      if (a) {
        const b = h === "y" ? "top" : "left", w = h === "y" ? "bottom" : "right", x = g + d[b], y = g - d[w];
        g = qa(x, g, y);
      }
      if (s) {
        const b = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", x = v + d[b], y = v - d[w];
        v = qa(x, v, y);
      }
      const p = i.fn({
        ...t,
        [h]: g,
        [f]: v
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - r,
          enabled: {
            [h]: a,
            [f]: s
          }
        }
      };
    }
  };
}, sv = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: s
      } = t, {
        offset: i = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = xt(e, t), d = {
        x: n,
        y: r
      }, f = it(o), h = Wi(f);
      let g = d[h], v = d[f];
      const p = xt(i, t), b = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (l) {
        const y = h === "y" ? "height" : "width", S = a.reference[h] - a.floating[y] + b.mainAxis, C = a.reference[h] + a.reference[y] - b.mainAxis;
        g < S ? g = S : g > C && (g = C);
      }
      if (u) {
        var w, x;
        const y = h === "y" ? "width" : "height", S = Jc.has(St(o)), C = a.reference[f] - a.floating[y] + (S && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (S ? 0 : b.crossAxis), R = a.reference[f] + a.reference[y] + (S ? 0 : ((x = s.offset) == null ? void 0 : x[f]) || 0) - (S ? b.crossAxis : 0);
        v < C ? v = C : v > R && (v = R);
      }
      return {
        [h]: g,
        [f]: v
      };
    }
  };
}, lv = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: a,
        platform: s,
        elements: i
      } = t, {
        apply: l = () => {
        },
        ...u
      } = xt(e, t), d = await Zn(t, u), f = St(o), h = Tn(o), g = it(o) === "y", {
        width: v,
        height: p
      } = a.floating;
      let b, w;
      f === "top" || f === "bottom" ? (b = f, w = h === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = f, b = h === "end" ? "top" : "bottom");
      const x = p - d.top - d.bottom, y = v - d.left - d.right, S = Lt(p - d[b], x), C = Lt(v - d[w], y), R = !t.middlewareData.shift;
      let E = S, k = C;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = y), (r = t.middlewareData.shift) != null && r.enabled.y && (E = x), R && !h) {
        const T = Fe(d.left, 0), O = Fe(d.right, 0), L = Fe(d.top, 0), A = Fe(d.bottom, 0);
        g ? k = v - 2 * (T !== 0 || O !== 0 ? T + O : Fe(d.left, d.right)) : E = p - 2 * (L !== 0 || A !== 0 ? L + A : Fe(d.top, d.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: E
      });
      const M = await s.getDimensions(i.floating);
      return v !== M.width || p !== M.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ro() {
  return typeof window < "u";
}
function On(e) {
  return eu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Be(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ut(e) {
  var t;
  return (t = (eu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function eu(e) {
  return Ro() ? e instanceof Node || e instanceof Be(e).Node : !1;
}
function Xe(e) {
  return Ro() ? e instanceof Element || e instanceof Be(e).Element : !1;
}
function ct(e) {
  return Ro() ? e instanceof HTMLElement || e instanceof Be(e).HTMLElement : !1;
}
function Xs(e) {
  return !Ro() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Be(e).ShadowRoot;
}
const cv = /* @__PURE__ */ new Set(["inline", "contents"]);
function fr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !cv.has(o);
}
const uv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function dv(e) {
  return uv.has(On(e));
}
const fv = [":popover-open", ":modal"];
function Mo(e) {
  return fv.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const mv = ["transform", "translate", "scale", "rotate", "perspective"], hv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], pv = ["paint", "layout", "strict", "content"];
function Hi(e) {
  const t = Yi(), n = Xe(e) ? Ze(e) : e;
  return mv.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || hv.some((r) => (n.willChange || "").includes(r)) || pv.some((r) => (n.contain || "").includes(r));
}
function gv(e) {
  let t = $t(e);
  for (; ct(t) && !Sn(t); ) {
    if (Hi(t))
      return t;
    if (Mo(t))
      return null;
    t = $t(t);
  }
  return null;
}
function Yi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const vv = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Sn(e) {
  return vv.has(On(e));
}
function Ze(e) {
  return Be(e).getComputedStyle(e);
}
function No(e) {
  return Xe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function $t(e) {
  if (On(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Xs(e) && e.host || // Fallback.
    ut(e)
  );
  return Xs(t) ? t.host : t;
}
function tu(e) {
  const t = $t(e);
  return Sn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ct(t) && fr(t) ? t : tu(t);
}
function Qn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = tu(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Be(o);
  if (a) {
    const i = Za(s);
    return t.concat(s, s.visualViewport || [], fr(o) ? o : [], i && n ? Qn(i) : []);
  }
  return t.concat(o, Qn(o, [], n));
}
function Za(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function nu(e) {
  const t = Ze(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ct(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = oo(n) !== a || oo(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function Ui(e) {
  return Xe(e) ? e : e.contextElement;
}
function yn(e) {
  const t = Ui(e);
  if (!ct(t))
    return lt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = nu(t);
  let s = (a ? oo(n.width) : n.width) / r, i = (a ? oo(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const bv = /* @__PURE__ */ lt(0);
function ru(e) {
  const t = Be(e);
  return !Yi() || !t.visualViewport ? bv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function wv(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Be(e) ? !1 : t;
}
function Zt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = Ui(e);
  let s = lt(1);
  t && (r ? Xe(r) && (s = yn(r)) : s = yn(e));
  const i = wv(a, n, r) ? ru(a) : lt(0);
  let l = (o.left + i.x) / s.x, u = (o.top + i.y) / s.y, d = o.width / s.x, f = o.height / s.y;
  if (a) {
    const h = Be(a), g = r && Xe(r) ? Be(r) : r;
    let v = h, p = Za(v);
    for (; p && r && g !== v; ) {
      const b = yn(p), w = p.getBoundingClientRect(), x = Ze(p), y = w.left + (p.clientLeft + parseFloat(x.paddingLeft)) * b.x, S = w.top + (p.clientTop + parseFloat(x.paddingTop)) * b.y;
      l *= b.x, u *= b.y, d *= b.x, f *= b.y, l += y, u += S, v = Be(p), p = Za(v);
    }
  }
  return io({
    width: d,
    height: f,
    x: l,
    y: u
  });
}
function Po(e, t) {
  const n = No(e).scrollLeft;
  return t ? t.left + n : Zt(ut(e)).left + n;
}
function ou(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Po(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function yv(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = ut(r), i = t ? Mo(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = lt(1);
  const d = lt(0), f = ct(r);
  if ((f || !f && !a) && ((On(r) !== "body" || fr(s)) && (l = No(r)), ct(r))) {
    const g = Zt(r);
    u = yn(r), d.x = g.x + r.clientLeft, d.y = g.y + r.clientTop;
  }
  const h = s && !f && !a ? ou(s, l) : lt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + d.x + h.x,
    y: n.y * u.y - l.scrollTop * u.y + d.y + h.y
  };
}
function xv(e) {
  return Array.from(e.getClientRects());
}
function Sv(e) {
  const t = ut(e), n = No(e), r = e.ownerDocument.body, o = Fe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Fe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Po(e);
  const i = -n.scrollTop;
  return Ze(r).direction === "rtl" && (s += Fe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const Zs = 25;
function Cv(e, t) {
  const n = Be(e), r = ut(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, l = 0;
  if (o) {
    a = o.width, s = o.height;
    const d = Yi();
    (!d || d && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const u = Po(r);
  if (u <= 0) {
    const d = r.ownerDocument, f = d.body, h = getComputedStyle(f), g = d.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, v = Math.abs(r.clientWidth - f.clientWidth - g);
    v <= Zs && (a -= v);
  } else u <= Zs && (a += u);
  return {
    width: a,
    height: s,
    x: i,
    y: l
  };
}
const Ev = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function kv(e, t) {
  const n = Zt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = ct(e) ? yn(e) : lt(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, l = o * a.x, u = r * a.y;
  return {
    width: s,
    height: i,
    x: l,
    y: u
  };
}
function Qs(e, t, n) {
  let r;
  if (t === "viewport")
    r = Cv(e, n);
  else if (t === "document")
    r = Sv(ut(e));
  else if (Xe(t))
    r = kv(t, n);
  else {
    const o = ru(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return io(r);
}
function au(e, t) {
  const n = $t(e);
  return n === t || !Xe(n) || Sn(n) ? !1 : Ze(n).position === "fixed" || au(n, t);
}
function Rv(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Qn(e, [], !1).filter((i) => Xe(i) && On(i) !== "body"), o = null;
  const a = Ze(e).position === "fixed";
  let s = a ? $t(e) : e;
  for (; Xe(s) && !Sn(s); ) {
    const i = Ze(s), l = Hi(s);
    !l && i.position === "fixed" && (o = null), (a ? !l && !o : !l && i.position === "static" && !!o && Ev.has(o.position) || fr(s) && !l && au(e, s)) ? r = r.filter((d) => d !== s) : o = i, s = $t(s);
  }
  return t.set(e, r), r;
}
function Mv(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? Mo(t) ? [] : Rv(t, this._c) : [].concat(n), r], i = s[0], l = s.reduce((u, d) => {
    const f = Qs(t, d, o);
    return u.top = Fe(f.top, u.top), u.right = Lt(f.right, u.right), u.bottom = Lt(f.bottom, u.bottom), u.left = Fe(f.left, u.left), u;
  }, Qs(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Nv(e) {
  const {
    width: t,
    height: n
  } = nu(e);
  return {
    width: t,
    height: n
  };
}
function Pv(e, t, n) {
  const r = ct(t), o = ut(t), a = n === "fixed", s = Zt(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = lt(0);
  function u() {
    l.x = Po(o);
  }
  if (r || !r && !a)
    if ((On(t) !== "body" || fr(o)) && (i = No(t)), r) {
      const g = Zt(t, !0, a, t);
      l.x = g.x + t.clientLeft, l.y = g.y + t.clientTop;
    } else o && u();
  a && !r && o && u();
  const d = o && !r && !a ? ou(o, i) : lt(0), f = s.left + i.scrollLeft - l.x - d.x, h = s.top + i.scrollTop - l.y - d.y;
  return {
    x: f,
    y: h,
    width: s.width,
    height: s.height
  };
}
function ga(e) {
  return Ze(e).position === "static";
}
function Js(e, t) {
  if (!ct(e) || Ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ut(e) === n && (n = n.ownerDocument.body), n;
}
function iu(e, t) {
  const n = Be(e);
  if (Mo(e))
    return n;
  if (!ct(e)) {
    let o = $t(e);
    for (; o && !Sn(o); ) {
      if (Xe(o) && !ga(o))
        return o;
      o = $t(o);
    }
    return n;
  }
  let r = Js(e, t);
  for (; r && dv(r) && ga(r); )
    r = Js(r, t);
  return r && Sn(r) && ga(r) && !Hi(r) ? n : r || gv(e) || n;
}
const Dv = async function(e) {
  const t = this.getOffsetParent || iu, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Pv(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Tv(e) {
  return Ze(e).direction === "rtl";
}
const Ov = {
  convertOffsetParentRelativeRectToViewportRelativeRect: yv,
  getDocumentElement: ut,
  getClippingRect: Mv,
  getOffsetParent: iu,
  getElementRects: Dv,
  getClientRects: xv,
  getDimensions: Nv,
  getScale: yn,
  isElement: Xe,
  isRTL: Tv
};
function su(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function _v(e, t) {
  let n = null, r;
  const o = ut(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), a();
    const u = e.getBoundingClientRect(), {
      left: d,
      top: f,
      width: h,
      height: g
    } = u;
    if (i || t(), !h || !g)
      return;
    const v = Fr(f), p = Fr(o.clientWidth - (d + h)), b = Fr(o.clientHeight - (f + g)), w = Fr(d), y = {
      rootMargin: -v + "px " + -p + "px " + -b + "px " + -w + "px",
      threshold: Fe(0, Lt(1, l)) || 1
    };
    let S = !0;
    function C(R) {
      const E = R[0].intersectionRatio;
      if (E !== l) {
        if (!S)
          return s();
        E ? s(!1, E) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !su(u, e.getBoundingClientRect()) && s(), S = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, y);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function Av(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = Ui(e), d = o || a ? [...u ? Qn(u) : [], ...Qn(t)] : [];
  d.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), a && w.addEventListener("resize", n);
  });
  const f = u && i ? _v(u, n) : null;
  let h = -1, g = null;
  s && (g = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === u && g && (g.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var y;
      (y = g) == null || y.observe(t);
    })), n();
  }), u && !l && g.observe(u), g.observe(t));
  let v, p = l ? Zt(e) : null;
  l && b();
  function b() {
    const w = Zt(e);
    p && !su(p, w) && n(), p = w, v = requestAnimationFrame(b);
  }
  return n(), () => {
    var w;
    d.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), f == null || f(), (w = g) == null || w.disconnect(), g = null, l && cancelAnimationFrame(v);
  };
}
const Iv = av, Lv = iv, $v = nv, zv = lv, Fv = rv, el = tv, Wv = sv, Bv = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Ov,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return ev(e, t, {
    ...o,
    platform: a
  });
};
var Vv = typeof document < "u", Hv = function() {
}, eo = Vv ? Ni : Hv;
function so(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!so(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (!(a === "_owner" && e.$$typeof) && !so(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function lu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function tl(e, t) {
  const n = lu(e);
  return Math.round(t * n) / n;
}
function va(e) {
  const t = c.useRef(e);
  return eo(() => {
    t.current = e;
  }), t;
}
function Yv(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: a,
      floating: s
    } = {},
    transform: i = !0,
    whileElementsMounted: l,
    open: u
  } = e, [d, f] = c.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, g] = c.useState(r);
  so(h, r) || g(r);
  const [v, p] = c.useState(null), [b, w] = c.useState(null), x = c.useCallback((P) => {
    P !== R.current && (R.current = P, p(P));
  }, []), y = c.useCallback((P) => {
    P !== E.current && (E.current = P, w(P));
  }, []), S = a || v, C = s || b, R = c.useRef(null), E = c.useRef(null), k = c.useRef(d), M = l != null, T = va(l), O = va(o), L = va(u), A = c.useCallback(() => {
    if (!R.current || !E.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: h
    };
    O.current && (P.platform = O.current), Bv(R.current, E.current, P).then((_) => {
      const Z = {
        ..._,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      Y.current && !so(k.current, Z) && (k.current = Z, lr.flushSync(() => {
        f(Z);
      }));
    });
  }, [h, t, n, O, L]);
  eo(() => {
    u === !1 && k.current.isPositioned && (k.current.isPositioned = !1, f((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [u]);
  const Y = c.useRef(!1);
  eo(() => (Y.current = !0, () => {
    Y.current = !1;
  }), []), eo(() => {
    if (S && (R.current = S), C && (E.current = C), S && C) {
      if (T.current)
        return T.current(S, C, A);
      A();
    }
  }, [S, C, A, T, M]);
  const j = c.useMemo(() => ({
    reference: R,
    floating: E,
    setReference: x,
    setFloating: y
  }), [x, y]), F = c.useMemo(() => ({
    reference: S,
    floating: C
  }), [S, C]), G = c.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return P;
    const _ = tl(F.floating, d.x), Z = tl(F.floating, d.y);
    return i ? {
      ...P,
      transform: "translate(" + _ + "px, " + Z + "px)",
      ...lu(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: _,
      top: Z
    };
  }, [n, i, F.floating, d.x, d.y]);
  return c.useMemo(() => ({
    ...d,
    update: A,
    refs: j,
    elements: F,
    floatingStyles: G
  }), [d, A, j, F, G]);
}
const Uv = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? el({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? el({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Gv = (e, t) => ({
  ...Iv(e),
  options: [e, t]
}), jv = (e, t) => ({
  ...Lv(e),
  options: [e, t]
}), Kv = (e, t) => ({
  ...Wv(e),
  options: [e, t]
}), qv = (e, t) => ({
  ...$v(e),
  options: [e, t]
}), Xv = (e, t) => ({
  ...zv(e),
  options: [e, t]
}), Zv = (e, t) => ({
  ...Fv(e),
  options: [e, t]
}), Qv = (e, t) => ({
  ...Uv(e),
  options: [e, t]
});
var Jv = "Arrow", cu = c.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ m(
    K.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ m("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
cu.displayName = Jv;
var eb = cu, Gi = "Popper", [uu, Ft] = Le(Gi), [tb, du] = uu(Gi), fu = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = c.useState(null);
  return /* @__PURE__ */ m(tb, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
fu.displayName = Gi;
var mu = "PopperAnchor", hu = c.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = du(mu, n), s = c.useRef(null), i = ae(t, s), l = c.useRef(null);
    return c.useEffect(() => {
      const u = l.current;
      l.current = (r == null ? void 0 : r.current) || s.current, u !== l.current && a.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ m(K.div, { ...o, ref: i });
  }
);
hu.displayName = mu;
var ji = "PopperContent", [nb, rb] = uu(ji), pu = c.forwardRef(
  (e, t) => {
    var $, te, J, ie, ce, me;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u = [],
      collisionPadding: d = 0,
      sticky: f = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: g = "optimized",
      onPlaced: v,
      ...p
    } = e, b = du(ji, n), [w, x] = c.useState(null), y = ae(t, (Oe) => x(Oe)), [S, C] = c.useState(null), R = Eo(S), E = (R == null ? void 0 : R.width) ?? 0, k = (R == null ? void 0 : R.height) ?? 0, M = r + (a !== "center" ? "-" + a : ""), T = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, O = Array.isArray(u) ? u : [u], L = O.length > 0, A = {
      padding: T,
      boundary: O.filter(ab),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: Y, floatingStyles: j, placement: F, isPositioned: G, middlewareData: P } = Yv({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: M,
      whileElementsMounted: (...Oe) => Av(...Oe, {
        animationFrame: g === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Gv({ mainAxis: o + k, alignmentAxis: s }),
        l && jv({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? Kv() : void 0,
          ...A
        }),
        l && qv({ ...A }),
        Xv({
          ...A,
          apply: ({ elements: Oe, rects: ne, availableWidth: et, availableHeight: tt }) => {
            const { width: je, height: zn } = ne.reference, kt = Oe.floating.style;
            kt.setProperty("--radix-popper-available-width", `${et}px`), kt.setProperty("--radix-popper-available-height", `${tt}px`), kt.setProperty("--radix-popper-anchor-width", `${je}px`), kt.setProperty("--radix-popper-anchor-height", `${zn}px`);
          }
        }),
        S && Qv({ element: S, padding: i }),
        ib({ arrowWidth: E, arrowHeight: k }),
        h && Zv({ strategy: "referenceHidden", ...A })
      ]
    }), [_, Z] = bu(F), se = De(v);
    ke(() => {
      G && (se == null || se());
    }, [G, se]);
    const D = ($ = P.arrow) == null ? void 0 : $.x, B = (te = P.arrow) == null ? void 0 : te.y, W = ((J = P.arrow) == null ? void 0 : J.centerOffset) !== 0, [U, oe] = c.useState();
    return ke(() => {
      w && oe(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ m(
      "div",
      {
        ref: Y.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...j,
          transform: G ? j.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: U,
          "--radix-popper-transform-origin": [
            (ie = P.transformOrigin) == null ? void 0 : ie.x,
            (ce = P.transformOrigin) == null ? void 0 : ce.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((me = P.hide) == null ? void 0 : me.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ m(
          nb,
          {
            scope: n,
            placedSide: _,
            onArrowChange: C,
            arrowX: D,
            arrowY: B,
            shouldHideArrow: W,
            children: /* @__PURE__ */ m(
              K.div,
              {
                "data-side": _,
                "data-align": Z,
                ...p,
                ref: y,
                style: {
                  ...p.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: G ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
pu.displayName = ji;
var gu = "PopperArrow", ob = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, vu = c.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = rb(gu, r), s = ob[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ m(
      "span",
      {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ m(
          eb,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
vu.displayName = gu;
function ab(e) {
  return e !== null;
}
var ib = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, w, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [u, d] = bu(n), f = { start: "0%", center: "50%", end: "100%" }[d], h = (((w = o.arrow) == null ? void 0 : w.x) ?? 0) + i / 2, g = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + l / 2;
    let v = "", p = "";
    return u === "bottom" ? (v = s ? f : `${h}px`, p = `${-l}px`) : u === "top" ? (v = s ? f : `${h}px`, p = `${r.floating.height + l}px`) : u === "right" ? (v = `${-l}px`, p = s ? f : `${g}px`) : u === "left" && (v = `${r.floating.width + l}px`, p = s ? f : `${g}px`), { data: { x: v, y: p } };
  }
});
function bu(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var mr = fu, hr = hu, Do = pu, To = vu, ba = "rovingFocusGroup.onEntryFocus", sb = { bubbles: !1, cancelable: !0 }, pr = "RovingFocusGroup", [Qa, wu, lb] = bo(pr), [cb, Oo] = Le(
  pr,
  [lb]
), [ub, db] = cb(pr), yu = c.forwardRef(
  (e, t) => /* @__PURE__ */ m(Qa.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(Qa.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(fb, { ...e, ref: t }) }) })
);
yu.displayName = pr;
var fb = c.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: u,
    preventScrollOnEntryFocus: d = !1,
    ...f
  } = e, h = c.useRef(null), g = ae(t, h), v = Nn(a), [p, b] = Ue({
    prop: s,
    defaultProp: i ?? null,
    onChange: l,
    caller: pr
  }), [w, x] = c.useState(!1), y = De(u), S = wu(n), C = c.useRef(!1), [R, E] = c.useState(0);
  return c.useEffect(() => {
    const k = h.current;
    if (k)
      return k.addEventListener(ba, y), () => k.removeEventListener(ba, y);
  }, [y]), /* @__PURE__ */ m(
    ub,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: p,
      onItemFocus: c.useCallback(
        (k) => b(k),
        [b]
      ),
      onItemShiftTab: c.useCallback(() => x(!0), []),
      onFocusableItemAdd: c.useCallback(
        () => E((k) => k + 1),
        []
      ),
      onFocusableItemRemove: c.useCallback(
        () => E((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        K.div,
        {
          tabIndex: w || R === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: g,
          style: { outline: "none", ...e.style },
          onMouseDown: V(e.onMouseDown, () => {
            C.current = !0;
          }),
          onFocus: V(e.onFocus, (k) => {
            const M = !C.current;
            if (k.target === k.currentTarget && M && !w) {
              const T = new CustomEvent(ba, sb);
              if (k.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const O = S().filter((F) => F.focusable), L = O.find((F) => F.active), A = O.find((F) => F.id === p), j = [L, A, ...O].filter(
                  Boolean
                ).map((F) => F.ref.current);
                Cu(j, d);
              }
            }
            C.current = !1;
          }),
          onBlur: V(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), xu = "RovingFocusGroupItem", Su = c.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, l = Ce(), u = a || l, d = db(xu, n), f = d.currentTabStopId === u, h = wu(n), { onFocusableItemAdd: g, onFocusableItemRemove: v, currentTabStopId: p } = d;
    return c.useEffect(() => {
      if (r)
        return g(), () => v();
    }, [r, g, v]), /* @__PURE__ */ m(
      Qa.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          K.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: t,
            onMouseDown: V(e.onMouseDown, (b) => {
              r ? d.onItemFocus(u) : b.preventDefault();
            }),
            onFocus: V(e.onFocus, () => d.onItemFocus(u)),
            onKeyDown: V(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = pb(b, d.orientation, d.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = h().filter((S) => S.focusable).map((S) => S.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const S = y.indexOf(b.currentTarget);
                  y = d.loop ? gb(y, S + 1) : y.slice(S + 1);
                }
                setTimeout(() => Cu(y));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: f, hasTabStop: p != null }) : s
          }
        )
      }
    );
  }
);
Su.displayName = xu;
var mb = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function hb(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function pb(e, t, n) {
  const r = hb(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return mb[r];
}
function Cu(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function gb(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Eu = yu, ku = Su, Ja = ["Enter", " "], vb = ["ArrowDown", "PageUp", "Home"], Ru = ["ArrowUp", "PageDown", "End"], bb = [...vb, ...Ru], wb = {
  ltr: [...Ja, "ArrowRight"],
  rtl: [...Ja, "ArrowLeft"]
}, yb = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, gr = "Menu", [Jn, xb, Sb] = bo(gr), [nn, Mu] = Le(gr, [
  Sb,
  Ft,
  Oo
]), vr = Ft(), Nu = Oo(), [Pu, Wt] = nn(gr), [Cb, br] = nn(gr), Du = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = vr(t), [l, u] = c.useState(null), d = c.useRef(!1), f = De(a), h = Nn(o);
  return c.useEffect(() => {
    const g = () => {
      d.current = !0, document.addEventListener("pointerdown", v, { capture: !0, once: !0 }), document.addEventListener("pointermove", v, { capture: !0, once: !0 });
    }, v = () => d.current = !1;
    return document.addEventListener("keydown", g, { capture: !0 }), () => {
      document.removeEventListener("keydown", g, { capture: !0 }), document.removeEventListener("pointerdown", v, { capture: !0 }), document.removeEventListener("pointermove", v, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(mr, { ...i, children: /* @__PURE__ */ m(
    Pu,
    {
      scope: t,
      open: n,
      onOpenChange: f,
      content: l,
      onContentChange: u,
      children: /* @__PURE__ */ m(
        Cb,
        {
          scope: t,
          onClose: c.useCallback(() => f(!1), [f]),
          isUsingKeyboardRef: d,
          dir: h,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
Du.displayName = gr;
var Eb = "MenuAnchor", Ki = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = vr(n);
    return /* @__PURE__ */ m(hr, { ...o, ...r, ref: t });
  }
);
Ki.displayName = Eb;
var qi = "MenuPortal", [kb, Tu] = nn(qi, {
  forceMount: void 0
}), Ou = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = Wt(qi, t);
  return /* @__PURE__ */ m(kb, { scope: t, forceMount: n, children: /* @__PURE__ */ m(_e, { present: n || a.open, children: /* @__PURE__ */ m(Dn, { asChild: !0, container: o, children: r }) }) });
};
Ou.displayName = qi;
var Ye = "MenuContent", [Rb, Xi] = nn(Ye), _u = c.forwardRef(
  (e, t) => {
    const n = Tu(Ye, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = Wt(Ye, e.__scopeMenu), s = br(Ye, e.__scopeMenu);
    return /* @__PURE__ */ m(Jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(_e, { present: r || a.open, children: /* @__PURE__ */ m(Jn.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ m(Mb, { ...o, ref: t }) : /* @__PURE__ */ m(Nb, { ...o, ref: t }) }) }) });
  }
), Mb = c.forwardRef(
  (e, t) => {
    const n = Wt(Ye, e.__scopeMenu), r = c.useRef(null), o = ae(t, r);
    return c.useEffect(() => {
      const a = r.current;
      if (a) return xo(a);
    }, []), /* @__PURE__ */ m(
      Zi,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: V(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Nb = c.forwardRef((e, t) => {
  const n = Wt(Ye, e.__scopeMenu);
  return /* @__PURE__ */ m(
    Zi,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Pb = /* @__PURE__ */ It("MenuContent.ScrollLock"), Zi = c.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: l,
      onEscapeKeyDown: u,
      onPointerDownOutside: d,
      onFocusOutside: f,
      onInteractOutside: h,
      onDismiss: g,
      disableOutsideScroll: v,
      ...p
    } = e, b = Wt(Ye, n), w = br(Ye, n), x = vr(n), y = Nu(n), S = xb(n), [C, R] = c.useState(null), E = c.useRef(null), k = ae(t, E, b.onContentChange), M = c.useRef(0), T = c.useRef(""), O = c.useRef(0), L = c.useRef(null), A = c.useRef("right"), Y = c.useRef(0), j = v ? ur : c.Fragment, F = v ? { as: Pb, allowPinchZoom: !0 } : void 0, G = (_) => {
      var $, te;
      const Z = T.current + _, se = S().filter((J) => !J.disabled), D = document.activeElement, B = ($ = se.find((J) => J.ref.current === D)) == null ? void 0 : $.textValue, W = se.map((J) => J.textValue), U = Bb(W, Z, B), oe = (te = se.find((J) => J.textValue === U)) == null ? void 0 : te.ref.current;
      (function J(ie) {
        T.current = ie, window.clearTimeout(M.current), ie !== "" && (M.current = window.setTimeout(() => J(""), 1e3));
      })(Z), oe && setTimeout(() => oe.focus());
    };
    c.useEffect(() => () => window.clearTimeout(M.current), []), wo();
    const P = c.useCallback((_) => {
      var se, D;
      return A.current === ((se = L.current) == null ? void 0 : se.side) && Hb(_, (D = L.current) == null ? void 0 : D.area);
    }, []);
    return /* @__PURE__ */ m(
      Rb,
      {
        scope: n,
        searchRef: T,
        onItemEnter: c.useCallback(
          (_) => {
            P(_) && _.preventDefault();
          },
          [P]
        ),
        onItemLeave: c.useCallback(
          (_) => {
            var Z;
            P(_) || ((Z = E.current) == null || Z.focus(), R(null));
          },
          [P]
        ),
        onTriggerLeave: c.useCallback(
          (_) => {
            P(_) && _.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: O,
        onPointerGraceIntentChange: c.useCallback((_) => {
          L.current = _;
        }, []),
        children: /* @__PURE__ */ m(j, { ...F, children: /* @__PURE__ */ m(
          cr,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: V(a, (_) => {
              var Z;
              _.preventDefault(), (Z = E.current) == null || Z.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ m(
              Pn,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: d,
                onFocusOutside: f,
                onInteractOutside: h,
                onDismiss: g,
                children: /* @__PURE__ */ m(
                  Eu,
                  {
                    asChild: !0,
                    ...y,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: C,
                    onCurrentTabStopIdChange: R,
                    onEntryFocus: V(l, (_) => {
                      w.isUsingKeyboardRef.current || _.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      Do,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Xu(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...x,
                        ...p,
                        ref: k,
                        style: { outline: "none", ...p.style },
                        onKeyDown: V(p.onKeyDown, (_) => {
                          const se = _.target.closest("[data-radix-menu-content]") === _.currentTarget, D = _.ctrlKey || _.altKey || _.metaKey, B = _.key.length === 1;
                          se && (_.key === "Tab" && _.preventDefault(), !D && B && G(_.key));
                          const W = E.current;
                          if (_.target !== W || !bb.includes(_.key)) return;
                          _.preventDefault();
                          const oe = S().filter(($) => !$.disabled).map(($) => $.ref.current);
                          Ru.includes(_.key) && oe.reverse(), Fb(oe);
                        }),
                        onBlur: V(e.onBlur, (_) => {
                          _.currentTarget.contains(_.target) || (window.clearTimeout(M.current), T.current = "");
                        }),
                        onPointerMove: V(
                          e.onPointerMove,
                          er((_) => {
                            const Z = _.target, se = Y.current !== _.clientX;
                            if (_.currentTarget.contains(Z) && se) {
                              const D = _.clientX > Y.current ? "right" : "left";
                              A.current = D, Y.current = _.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
_u.displayName = Ye;
var Db = "MenuGroup", Qi = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(K.div, { role: "group", ...r, ref: t });
  }
);
Qi.displayName = Db;
var Tb = "MenuLabel", Au = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(K.div, { ...r, ref: t });
  }
);
Au.displayName = Tb;
var lo = "MenuItem", nl = "menu.itemSelect", _o = c.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = c.useRef(null), s = br(lo, e.__scopeMenu), i = Xi(lo, e.__scopeMenu), l = ae(t, a), u = c.useRef(!1), d = () => {
      const f = a.current;
      if (!n && f) {
        const h = new CustomEvent(nl, { bubbles: !0, cancelable: !0 });
        f.addEventListener(nl, (g) => r == null ? void 0 : r(g), { once: !0 }), ac(f, h), h.defaultPrevented ? u.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ m(
      Iu,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: V(e.onClick, d),
        onPointerDown: (f) => {
          var h;
          (h = e.onPointerDown) == null || h.call(e, f), u.current = !0;
        },
        onPointerUp: V(e.onPointerUp, (f) => {
          var h;
          u.current || (h = f.currentTarget) == null || h.click();
        }),
        onKeyDown: V(e.onKeyDown, (f) => {
          const h = i.searchRef.current !== "";
          n || h && f.key === " " || Ja.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
        })
      }
    );
  }
);
_o.displayName = lo;
var Iu = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = Xi(lo, n), i = Nu(n), l = c.useRef(null), u = ae(t, l), [d, f] = c.useState(!1), [h, g] = c.useState("");
    return c.useEffect(() => {
      const v = l.current;
      v && g((v.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ m(
      Jn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? h,
        children: /* @__PURE__ */ m(ku, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ m(
          K.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: u,
            onPointerMove: V(
              e.onPointerMove,
              er((v) => {
                r ? s.onItemLeave(v) : (s.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: V(
              e.onPointerLeave,
              er((v) => s.onItemLeave(v))
            ),
            onFocus: V(e.onFocus, () => f(!0)),
            onBlur: V(e.onBlur, () => f(!1))
          }
        ) })
      }
    );
  }
), Ob = "MenuCheckboxItem", Lu = c.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Bu, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      _o,
      {
        role: "menuitemcheckbox",
        "aria-checked": co(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ts(n),
        onSelect: V(
          o.onSelect,
          () => r == null ? void 0 : r(co(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Lu.displayName = Ob;
var $u = "MenuRadioGroup", [_b, Ab] = nn(
  $u,
  { value: void 0, onValueChange: () => {
  } }
), zu = c.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = De(r);
    return /* @__PURE__ */ m(_b, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ m(Qi, { ...o, ref: t }) });
  }
);
zu.displayName = $u;
var Fu = "MenuRadioItem", Wu = c.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Ab(Fu, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ m(Bu, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ m(
      _o,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": ts(a),
        onSelect: V(
          r.onSelect,
          () => {
            var s;
            return (s = o.onValueChange) == null ? void 0 : s.call(o, n);
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Wu.displayName = Fu;
var Ji = "MenuItemIndicator", [Bu, Ib] = nn(
  Ji,
  { checked: !1 }
), Vu = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = Ib(Ji, n);
    return /* @__PURE__ */ m(
      _e,
      {
        present: r || co(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ m(
          K.span,
          {
            ...o,
            ref: t,
            "data-state": ts(a.checked)
          }
        )
      }
    );
  }
);
Vu.displayName = Ji;
var Lb = "MenuSeparator", Hu = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      K.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Hu.displayName = Lb;
var $b = "MenuArrow", Yu = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = vr(n);
    return /* @__PURE__ */ m(To, { ...o, ...r, ref: t });
  }
);
Yu.displayName = $b;
var es = "MenuSub", [zb, Uu] = nn(es), Gu = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = Wt(es, t), s = vr(t), [i, l] = c.useState(null), [u, d] = c.useState(null), f = De(o);
  return c.useEffect(() => (a.open === !1 && f(!1), () => f(!1)), [a.open, f]), /* @__PURE__ */ m(mr, { ...s, children: /* @__PURE__ */ m(
    Pu,
    {
      scope: t,
      open: r,
      onOpenChange: f,
      content: u,
      onContentChange: d,
      children: /* @__PURE__ */ m(
        zb,
        {
          scope: t,
          contentId: Ce(),
          triggerId: Ce(),
          trigger: i,
          onTriggerChange: l,
          children: n
        }
      )
    }
  ) });
};
Gu.displayName = es;
var jn = "MenuSubTrigger", ju = c.forwardRef(
  (e, t) => {
    const n = Wt(jn, e.__scopeMenu), r = br(jn, e.__scopeMenu), o = Uu(jn, e.__scopeMenu), a = Xi(jn, e.__scopeMenu), s = c.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = a, u = { __scopeMenu: e.__scopeMenu }, d = c.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return c.useEffect(() => d, [d]), c.useEffect(() => {
      const f = i.current;
      return () => {
        window.clearTimeout(f), l(null);
      };
    }, [i, l]), /* @__PURE__ */ m(Ki, { asChild: !0, ...u, children: /* @__PURE__ */ m(
      Iu,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Xu(n.open),
        ...e,
        ref: yt(t, o.onTriggerChange),
        onClick: (f) => {
          var h;
          (h = e.onClick) == null || h.call(e, f), !(e.disabled || f.defaultPrevented) && (f.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: V(
          e.onPointerMove,
          er((f) => {
            a.onItemEnter(f), !f.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: V(
          e.onPointerLeave,
          er((f) => {
            var g, v;
            d();
            const h = (g = n.content) == null ? void 0 : g.getBoundingClientRect();
            if (h) {
              const p = (v = n.content) == null ? void 0 : v.dataset.side, b = p === "right", w = b ? -5 : 5, x = h[b ? "left" : "right"], y = h[b ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: f.clientX + w, y: f.clientY },
                  { x, y: h.top },
                  { x: y, y: h.top },
                  { x: y, y: h.bottom },
                  { x, y: h.bottom }
                ],
                side: p
              }), window.clearTimeout(i.current), i.current = window.setTimeout(
                () => a.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (a.onTriggerLeave(f), f.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: V(e.onKeyDown, (f) => {
          var g;
          const h = a.searchRef.current !== "";
          e.disabled || h && f.key === " " || wb[r.dir].includes(f.key) && (n.onOpenChange(!0), (g = n.content) == null || g.focus(), f.preventDefault());
        })
      }
    ) });
  }
);
ju.displayName = jn;
var Ku = "MenuSubContent", qu = c.forwardRef(
  (e, t) => {
    const n = Tu(Ye, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = Wt(Ye, e.__scopeMenu), s = br(Ye, e.__scopeMenu), i = Uu(Ku, e.__scopeMenu), l = c.useRef(null), u = ae(t, l);
    return /* @__PURE__ */ m(Jn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(_e, { present: r || a.open, children: /* @__PURE__ */ m(Jn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      Zi,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: u,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          var f;
          s.isUsingKeyboardRef.current && ((f = l.current) == null || f.focus()), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: V(e.onFocusOutside, (d) => {
          d.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: V(e.onEscapeKeyDown, (d) => {
          s.onClose(), d.preventDefault();
        }),
        onKeyDown: V(e.onKeyDown, (d) => {
          var g;
          const f = d.currentTarget.contains(d.target), h = yb[s.dir].includes(d.key);
          f && h && (a.onOpenChange(!1), (g = i.trigger) == null || g.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
qu.displayName = Ku;
function Xu(e) {
  return e ? "open" : "closed";
}
function co(e) {
  return e === "indeterminate";
}
function ts(e) {
  return co(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Fb(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Wb(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Bb(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = Wb(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const l = s.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Vb(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], l = t[s], u = i.x, d = i.y, f = l.x, h = l.y;
    d > r != h > r && n < (f - u) * (r - d) / (h - d) + u && (o = !o);
  }
  return o;
}
function Hb(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Vb(n, t);
}
function er(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Yb = Du, Ub = Ki, Gb = Ou, jb = _u, Kb = Qi, qb = Au, Xb = _o, Zb = Lu, Qb = zu, Jb = Wu, ew = Vu, tw = Hu, nw = Yu, rw = Gu, ow = ju, aw = qu, Ao = "DropdownMenu", [iw, D1] = Le(
  Ao,
  [Mu]
), $e = Mu(), [sw, Zu] = iw(Ao), Qu = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, l = $e(t), u = c.useRef(null), [d, f] = Ue({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: Ao
  });
  return /* @__PURE__ */ m(
    sw,
    {
      scope: t,
      triggerId: Ce(),
      triggerRef: u,
      contentId: Ce(),
      open: d,
      onOpenChange: f,
      onOpenToggle: c.useCallback(() => f((h) => !h), [f]),
      modal: i,
      children: /* @__PURE__ */ m(Yb, { ...l, open: d, onOpenChange: f, dir: r, modal: i, children: n })
    }
  );
};
Qu.displayName = Ao;
var Ju = "DropdownMenuTrigger", ed = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = Zu(Ju, n), s = $e(n);
    return /* @__PURE__ */ m(Ub, { asChild: !0, ...s, children: /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: yt(t, a.triggerRef),
        onPointerDown: V(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (a.onOpenToggle(), a.open || i.preventDefault());
        }),
        onKeyDown: V(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && a.onOpenToggle(), i.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
ed.displayName = Ju;
var lw = "DropdownMenuPortal", td = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = $e(t);
  return /* @__PURE__ */ m(Gb, { ...r, ...n });
};
td.displayName = lw;
var nd = "DropdownMenuContent", rd = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Zu(nd, n), a = $e(n), s = c.useRef(!1);
    return /* @__PURE__ */ m(
      jb,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (i) => {
          var l;
          s.current || (l = o.triggerRef.current) == null || l.focus(), s.current = !1, i.preventDefault();
        }),
        onInteractOutside: V(e.onInteractOutside, (i) => {
          const l = i.detail.originalEvent, u = l.button === 0 && l.ctrlKey === !0, d = l.button === 2 || u;
          (!o.modal || d) && (s.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
rd.displayName = nd;
var cw = "DropdownMenuGroup", od = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(Kb, { ...o, ...r, ref: t });
  }
);
od.displayName = cw;
var uw = "DropdownMenuLabel", ad = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(qb, { ...o, ...r, ref: t });
  }
);
ad.displayName = uw;
var dw = "DropdownMenuItem", id = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(Xb, { ...o, ...r, ref: t });
  }
);
id.displayName = dw;
var fw = "DropdownMenuCheckboxItem", sd = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Zb, { ...o, ...r, ref: t });
});
sd.displayName = fw;
var mw = "DropdownMenuRadioGroup", hw = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Qb, { ...o, ...r, ref: t });
});
hw.displayName = mw;
var pw = "DropdownMenuRadioItem", gw = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(Jb, { ...o, ...r, ref: t });
});
gw.displayName = pw;
var vw = "DropdownMenuItemIndicator", ld = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(ew, { ...o, ...r, ref: t });
});
ld.displayName = vw;
var bw = "DropdownMenuSeparator", cd = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(tw, { ...o, ...r, ref: t });
});
cd.displayName = bw;
var ww = "DropdownMenuArrow", yw = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
    return /* @__PURE__ */ m(nw, { ...o, ...r, ref: t });
  }
);
yw.displayName = ww;
var xw = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = $e(t), [i, l] = Ue({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ m(rw, { ...s, open: i, onOpenChange: l, children: n });
}, Sw = "DropdownMenuSubTrigger", ud = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(ow, { ...o, ...r, ref: t });
});
ud.displayName = Sw;
var Cw = "DropdownMenuSubContent", dd = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = $e(n);
  return /* @__PURE__ */ m(
    aw,
    {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
dd.displayName = Cw;
var Ew = Qu, kw = ed, Rw = td, Mw = rd, Nw = od, Pw = ad, Dw = id, Tw = sd, Ow = ld, _w = cd, Aw = xw, Iw = ud, Lw = dd, $w = "Label", fd = c.forwardRef((e, t) => /* @__PURE__ */ m(
  K.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
fd.displayName = $w;
var zw = fd;
function tr(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var Io = "Popover", [md, T1] = Le(Io, [
  Ft
]), wr = Ft(), [Fw, Bt] = md(Io), hd = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = wr(t), l = c.useRef(null), [u, d] = c.useState(!1), [f, h] = Ue({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Io
  });
  return /* @__PURE__ */ m(mr, { ...i, children: /* @__PURE__ */ m(
    Fw,
    {
      scope: t,
      contentId: Ce(),
      triggerRef: l,
      open: f,
      onOpenChange: h,
      onOpenToggle: c.useCallback(() => h((g) => !g), [h]),
      hasCustomAnchor: u,
      onCustomAnchorAdd: c.useCallback(() => d(!0), []),
      onCustomAnchorRemove: c.useCallback(() => d(!1), []),
      modal: s,
      children: n
    }
  ) });
};
hd.displayName = Io;
var pd = "PopoverAnchor", Ww = c.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Bt(pd, n), a = wr(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return c.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ m(hr, { ...a, ...r, ref: t });
  }
);
Ww.displayName = pd;
var gd = "PopoverTrigger", vd = c.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Bt(gd, n), a = wr(n), s = ae(t, o.triggerRef), i = /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Sd(o.open),
        ...r,
        ref: s,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ m(hr, { asChild: !0, ...a, children: i });
  }
);
vd.displayName = gd;
var ns = "PopoverPortal", [Bw, Vw] = md(ns, {
  forceMount: void 0
}), bd = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Bt(ns, t);
  return /* @__PURE__ */ m(Bw, { scope: t, forceMount: n, children: /* @__PURE__ */ m(_e, { present: n || a.open, children: /* @__PURE__ */ m(Dn, { asChild: !0, container: o, children: r }) }) });
};
bd.displayName = ns;
var Cn = "PopoverContent", wd = c.forwardRef(
  (e, t) => {
    const n = Vw(Cn, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Bt(Cn, e.__scopePopover);
    return /* @__PURE__ */ m(_e, { present: r || a.open, children: a.modal ? /* @__PURE__ */ m(Yw, { ...o, ref: t }) : /* @__PURE__ */ m(Uw, { ...o, ref: t }) });
  }
);
wd.displayName = Cn;
var Hw = /* @__PURE__ */ It("PopoverContent.RemoveScroll"), Yw = c.forwardRef(
  (e, t) => {
    const n = Bt(Cn, e.__scopePopover), r = c.useRef(null), o = ae(t, r), a = c.useRef(!1);
    return c.useEffect(() => {
      const s = r.current;
      if (s) return xo(s);
    }, []), /* @__PURE__ */ m(ur, { as: Hw, allowPinchZoom: !0, children: /* @__PURE__ */ m(
      yd,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: V(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: V(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, u = i.button === 2 || l;
            a.current = u;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: V(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Uw = c.forwardRef(
  (e, t) => {
    const n = Bt(Cn, e.__scopePopover), r = c.useRef(!1), o = c.useRef(!1);
    return /* @__PURE__ */ m(
      yd,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var l, u;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), yd = c.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: u,
      onInteractOutside: d,
      ...f
    } = e, h = Bt(Cn, n), g = wr(n);
    return wo(), /* @__PURE__ */ m(
      cr,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ m(
          Pn,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: d,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: u,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ m(
              Do,
              {
                "data-state": Sd(h.open),
                role: "dialog",
                id: h.contentId,
                ...g,
                ...f,
                ref: t,
                style: {
                  ...f.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), xd = "PopoverClose", Gw = c.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Bt(xd, n);
    return /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Gw.displayName = xd;
var jw = "PopoverArrow", Kw = c.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = wr(n);
    return /* @__PURE__ */ m(To, { ...o, ...r, ref: t });
  }
);
Kw.displayName = jw;
function Sd(e) {
  return e ? "open" : "closed";
}
var qw = hd, Xw = vd, Zw = bd, Qw = wd, rs = "Progress", os = 100, [Jw, O1] = Le(rs), [ey, ty] = Jw(rs), Cd = c.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: o,
      getValueLabel: a = ny,
      ...s
    } = e;
    (o || o === 0) && !rl(o) && console.error(ry(`${o}`, "Progress"));
    const i = rl(o) ? o : os;
    r !== null && !ol(r, i) && console.error(oy(`${r}`, "Progress"));
    const l = ol(r, i) ? r : null, u = uo(l) ? a(l, i) : void 0;
    return /* @__PURE__ */ m(ey, { scope: n, value: l, max: i, children: /* @__PURE__ */ m(
      K.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": uo(l) ? l : void 0,
        "aria-valuetext": u,
        role: "progressbar",
        "data-state": Rd(l, i),
        "data-value": l ?? void 0,
        "data-max": i,
        ...s,
        ref: t
      }
    ) });
  }
);
Cd.displayName = rs;
var Ed = "ProgressIndicator", kd = c.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...r } = e, o = ty(Ed, n);
    return /* @__PURE__ */ m(
      K.div,
      {
        "data-state": Rd(o.value, o.max),
        "data-value": o.value ?? void 0,
        "data-max": o.max,
        ...r,
        ref: t
      }
    );
  }
);
kd.displayName = Ed;
function ny(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function Rd(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function uo(e) {
  return typeof e == "number";
}
function rl(e) {
  return uo(e) && !isNaN(e) && e > 0;
}
function ol(e, t) {
  return uo(e) && !isNaN(e) && e <= t && e >= 0;
}
function ry(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${os}\`.`;
}
function oy(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${os} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var ay = Cd, iy = kd;
function sy(e, t) {
  return c.useReducer((n, r) => t[n][r] ?? n, e);
}
var as = "ScrollArea", [Md, _1] = Le(as), [ly, Ge] = Md(as), Nd = c.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, l] = c.useState(null), [u, d] = c.useState(null), [f, h] = c.useState(null), [g, v] = c.useState(null), [p, b] = c.useState(null), [w, x] = c.useState(0), [y, S] = c.useState(0), [C, R] = c.useState(!1), [E, k] = c.useState(!1), M = ae(t, (O) => l(O)), T = Nn(o);
    return /* @__PURE__ */ m(
      ly,
      {
        scope: n,
        type: r,
        dir: T,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: u,
        onViewportChange: d,
        content: f,
        onContentChange: h,
        scrollbarX: g,
        onScrollbarXChange: v,
        scrollbarXEnabled: C,
        onScrollbarXEnabledChange: R,
        scrollbarY: p,
        onScrollbarYChange: b,
        scrollbarYEnabled: E,
        onScrollbarYEnabledChange: k,
        onCornerWidthChange: x,
        onCornerHeightChange: S,
        children: /* @__PURE__ */ m(
          K.div,
          {
            dir: T,
            ...s,
            ref: M,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": w + "px",
              "--radix-scroll-area-corner-height": y + "px",
              ...e.style
            }
          }
        )
      }
    );
  }
);
Nd.displayName = as;
var Pd = "ScrollAreaViewport", Dd = c.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = Ge(Pd, n), i = c.useRef(null), l = ae(t, i, s.onViewportChange);
    return /* @__PURE__ */ I(Ee, { children: [
      /* @__PURE__ */ m(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ m(
        K.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...a,
          ref: l,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ m("div", { ref: s.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
Dd.displayName = Pd;
var dt = "ScrollAreaScrollbar", ei = c.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Ge(dt, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return c.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ m(cy, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ m(uy, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ m(Td, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ m(is, { ...r, ref: t }) : null;
  }
);
ei.displayName = dt;
var cy = c.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Ge(dt, e.__scopeScrollArea), [a, s] = c.useState(!1);
  return c.useEffect(() => {
    const i = o.scrollArea;
    let l = 0;
    if (i) {
      const u = () => {
        window.clearTimeout(l), s(!0);
      }, d = () => {
        l = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", u), i.addEventListener("pointerleave", d), () => {
        window.clearTimeout(l), i.removeEventListener("pointerenter", u), i.removeEventListener("pointerleave", d);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ m(_e, { present: n || a, children: /* @__PURE__ */ m(
    Td,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), uy = c.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Ge(dt, e.__scopeScrollArea), a = e.orientation === "horizontal", s = $o(() => l("SCROLL_END"), 100), [i, l] = sy("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return c.useEffect(() => {
    if (i === "idle") {
      const u = window.setTimeout(() => l("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(u);
    }
  }, [i, o.scrollHideDelay, l]), c.useEffect(() => {
    const u = o.viewport, d = a ? "scrollLeft" : "scrollTop";
    if (u) {
      let f = u[d];
      const h = () => {
        const g = u[d];
        f !== g && (l("SCROLL"), s()), f = g;
      };
      return u.addEventListener("scroll", h), () => u.removeEventListener("scroll", h);
    }
  }, [o.viewport, a, l, s]), /* @__PURE__ */ m(_e, { present: n || i !== "hidden", children: /* @__PURE__ */ m(
    is,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: V(e.onPointerEnter, () => l("POINTER_ENTER")),
      onPointerLeave: V(e.onPointerLeave, () => l("POINTER_LEAVE"))
    }
  ) });
}), Td = c.forwardRef((e, t) => {
  const n = Ge(dt, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = c.useState(!1), i = e.orientation === "horizontal", l = $o(() => {
    if (n.viewport) {
      const u = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? u : d);
    }
  }, 10);
  return En(n.viewport, l), En(n.content, l), /* @__PURE__ */ m(_e, { present: r || a, children: /* @__PURE__ */ m(
    is,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), is = c.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = Ge(dt, e.__scopeScrollArea), a = c.useRef(null), s = c.useRef(0), [i, l] = c.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = Ad(i.viewport, i.content), d = {
    ...r,
    sizes: i,
    onSizesChange: l,
    hasThumb: u > 0 && u < 1,
    onThumbChange: (h) => a.current = h,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (h) => s.current = h
  };
  function f(h, g) {
    return vy(h, s.current, i, g);
  }
  return n === "horizontal" ? /* @__PURE__ */ m(
    dy,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const h = o.viewport.scrollLeft, g = al(h, i, o.dir);
          a.current.style.transform = `translate3d(${g}px, 0, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = f(h, o.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ m(
    fy,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const h = o.viewport.scrollTop, g = al(h, i);
          a.current.style.transform = `translate3d(0, ${g}px, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollTop = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollTop = f(h));
      }
    }
  ) : null;
}), dy = c.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Ge(dt, e.__scopeScrollArea), [s, i] = c.useState(), l = c.useRef(null), u = ae(t, l, a.onScrollbarXChange);
  return c.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ m(
    _d,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: u,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Lo(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
      onDragScroll: (d) => e.onDragScroll(d.x),
      onWheelScroll: (d, f) => {
        if (a.viewport) {
          const h = a.viewport.scrollLeft + d.deltaX;
          e.onWheelScroll(h), Ld(h, f) && d.preventDefault();
        }
      },
      onResize: () => {
        l.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: l.current.clientWidth,
            paddingStart: mo(s.paddingLeft),
            paddingEnd: mo(s.paddingRight)
          }
        });
      }
    }
  );
}), fy = c.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Ge(dt, e.__scopeScrollArea), [s, i] = c.useState(), l = c.useRef(null), u = ae(t, l, a.onScrollbarYChange);
  return c.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ m(
    _d,
    {
      "data-orientation": "vertical",
      ...o,
      ref: u,
      sizes: n,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Lo(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
      onDragScroll: (d) => e.onDragScroll(d.y),
      onWheelScroll: (d, f) => {
        if (a.viewport) {
          const h = a.viewport.scrollTop + d.deltaY;
          e.onWheelScroll(h), Ld(h, f) && d.preventDefault();
        }
      },
      onResize: () => {
        l.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: l.current.clientHeight,
            paddingStart: mo(s.paddingTop),
            paddingEnd: mo(s.paddingBottom)
          }
        });
      }
    }
  );
}), [my, Od] = Md(dt), _d = c.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: l,
    onDragScroll: u,
    onWheelScroll: d,
    onResize: f,
    ...h
  } = e, g = Ge(dt, n), [v, p] = c.useState(null), b = ae(t, (M) => p(M)), w = c.useRef(null), x = c.useRef(""), y = g.viewport, S = r.content - r.viewport, C = De(d), R = De(l), E = $o(f, 10);
  function k(M) {
    if (w.current) {
      const T = M.clientX - w.current.left, O = M.clientY - w.current.top;
      u({ x: T, y: O });
    }
  }
  return c.useEffect(() => {
    const M = (T) => {
      const O = T.target;
      (v == null ? void 0 : v.contains(O)) && C(T, S);
    };
    return document.addEventListener("wheel", M, { passive: !1 }), () => document.removeEventListener("wheel", M, { passive: !1 });
  }, [y, v, S, C]), c.useEffect(R, [r, R]), En(v, E), En(g.content, E), /* @__PURE__ */ m(
    my,
    {
      scope: n,
      scrollbar: v,
      hasThumb: o,
      onThumbChange: De(a),
      onThumbPointerUp: De(s),
      onThumbPositionChange: R,
      onThumbPointerDown: De(i),
      children: /* @__PURE__ */ m(
        K.div,
        {
          ...h,
          ref: b,
          style: { position: "absolute", ...h.style },
          onPointerDown: V(e.onPointerDown, (M) => {
            M.button === 0 && (M.target.setPointerCapture(M.pointerId), w.current = v.getBoundingClientRect(), x.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", g.viewport && (g.viewport.style.scrollBehavior = "auto"), k(M));
          }),
          onPointerMove: V(e.onPointerMove, k),
          onPointerUp: V(e.onPointerUp, (M) => {
            const T = M.target;
            T.hasPointerCapture(M.pointerId) && T.releasePointerCapture(M.pointerId), document.body.style.webkitUserSelect = x.current, g.viewport && (g.viewport.style.scrollBehavior = ""), w.current = null;
          })
        }
      )
    }
  );
}), fo = "ScrollAreaThumb", ti = c.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Od(fo, e.__scopeScrollArea);
    return /* @__PURE__ */ m(_e, { present: n || o.hasThumb, children: /* @__PURE__ */ m(hy, { ref: t, ...r }) });
  }
), hy = c.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = Ge(fo, n), s = Od(fo, n), { onThumbPositionChange: i } = s, l = ae(
      t,
      (f) => s.onThumbChange(f)
    ), u = c.useRef(void 0), d = $o(() => {
      u.current && (u.current(), u.current = void 0);
    }, 100);
    return c.useEffect(() => {
      const f = a.viewport;
      if (f) {
        const h = () => {
          if (d(), !u.current) {
            const g = by(f, i);
            u.current = g, i();
          }
        };
        return i(), f.addEventListener("scroll", h), () => f.removeEventListener("scroll", h);
      }
    }, [a.viewport, d, i]), /* @__PURE__ */ m(
      K.div,
      {
        "data-state": s.hasThumb ? "visible" : "hidden",
        ...o,
        ref: l,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: V(e.onPointerDownCapture, (f) => {
          const g = f.target.getBoundingClientRect(), v = f.clientX - g.left, p = f.clientY - g.top;
          s.onThumbPointerDown({ x: v, y: p });
        }),
        onPointerUp: V(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
ti.displayName = fo;
var ss = "ScrollAreaCorner", py = c.forwardRef(
  (e, t) => {
    const n = Ge(ss, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ m(gy, { ...e, ref: t }) : null;
  }
);
py.displayName = ss;
var gy = c.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = Ge(ss, n), [a, s] = c.useState(0), [i, l] = c.useState(0), u = !!(a && i);
  return En(o.scrollbarX, () => {
    var f;
    const d = ((f = o.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    o.onCornerHeightChange(d), l(d);
  }), En(o.scrollbarY, () => {
    var f;
    const d = ((f = o.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    o.onCornerWidthChange(d), s(d);
  }), u ? /* @__PURE__ */ m(
    K.div,
    {
      ...r,
      ref: t,
      style: {
        width: a,
        height: i,
        position: "absolute",
        right: o.dir === "ltr" ? 0 : void 0,
        left: o.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
});
function mo(e) {
  return e ? parseInt(e, 10) : 0;
}
function Ad(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function Lo(e) {
  const t = Ad(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function vy(e, t, n, r = "ltr") {
  const o = Lo(n), a = o / 2, s = t || a, i = o - s, l = n.scrollbar.paddingStart + s, u = n.scrollbar.size - n.scrollbar.paddingEnd - i, d = n.content - n.viewport, f = r === "ltr" ? [0, d] : [d * -1, 0];
  return Id([l, u], f)(e);
}
function al(e, t, n = "ltr") {
  const r = Lo(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, l = n === "ltr" ? [0, s] : [s * -1, 0], u = tr(e, l);
  return Id([0, s], [0, i])(u);
}
function Id(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Ld(e, t) {
  return e > 0 && e < t;
}
var by = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return (function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
};
function $o(e, t) {
  const n = De(e), r = c.useRef(0);
  return c.useEffect(() => () => window.clearTimeout(r.current), []), c.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function En(e, t) {
  const n = De(t);
  ke(() => {
    let r = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return o.observe(e), () => {
        window.cancelAnimationFrame(r), o.unobserve(e);
      };
    }
  }, [e, n]);
}
var wy = Nd, yy = Dd, xy = [" ", "Enter", "ArrowUp", "ArrowDown"], Sy = [" ", "Enter"], Qt = "Select", [zo, Fo, Cy] = bo(Qt), [_n, A1] = Le(Qt, [
  Cy,
  Ft
]), Wo = Ft(), [Ey, Vt] = _n(Qt), [ky, Ry] = _n(Qt), $d = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: l,
    dir: u,
    name: d,
    autoComplete: f,
    disabled: h,
    required: g,
    form: v
  } = e, p = Wo(t), [b, w] = c.useState(null), [x, y] = c.useState(null), [S, C] = c.useState(!1), R = Nn(u), [E, k] = Ue({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Qt
  }), [M, T] = Ue({
    prop: s,
    defaultProp: i,
    onChange: l,
    caller: Qt
  }), O = c.useRef(null), L = b ? v || !!b.closest("form") : !0, [A, Y] = c.useState(/* @__PURE__ */ new Set()), j = Array.from(A).map((F) => F.props.value).join(";");
  return /* @__PURE__ */ m(mr, { ...p, children: /* @__PURE__ */ I(
    Ey,
    {
      required: g,
      scope: t,
      trigger: b,
      onTriggerChange: w,
      valueNode: x,
      onValueNodeChange: y,
      valueNodeHasChildren: S,
      onValueNodeHasChildrenChange: C,
      contentId: Ce(),
      value: M,
      onValueChange: T,
      open: E,
      onOpenChange: k,
      dir: R,
      triggerPointerDownPosRef: O,
      disabled: h,
      children: [
        /* @__PURE__ */ m(zo.Provider, { scope: t, children: /* @__PURE__ */ m(
          ky,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: c.useCallback((F) => {
              Y((G) => new Set(G).add(F));
            }, []),
            onNativeOptionRemove: c.useCallback((F) => {
              Y((G) => {
                const P = new Set(G);
                return P.delete(F), P;
              });
            }, []),
            children: n
          }
        ) }),
        L ? /* @__PURE__ */ I(
          cf,
          {
            "aria-hidden": !0,
            required: g,
            tabIndex: -1,
            name: d,
            autoComplete: f,
            value: M,
            onChange: (F) => T(F.target.value),
            disabled: h,
            form: v,
            children: [
              M === void 0 ? /* @__PURE__ */ m("option", { value: "" }) : null,
              Array.from(A)
            ]
          },
          j
        ) : null
      ]
    }
  ) });
};
$d.displayName = Qt;
var zd = "SelectTrigger", Fd = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = Wo(n), s = Vt(zd, n), i = s.disabled || r, l = ae(t, s.onTriggerChange), u = Fo(n), d = c.useRef("touch"), [f, h, g] = df((p) => {
      const b = u().filter((y) => !y.disabled), w = b.find((y) => y.value === s.value), x = ff(b, p, w);
      x !== void 0 && s.onValueChange(x.value);
    }), v = (p) => {
      i || (s.onOpenChange(!0), g()), p && (s.triggerPointerDownPosRef.current = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      });
    };
    return /* @__PURE__ */ m(hr, { asChild: !0, ...a, children: /* @__PURE__ */ m(
      K.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: i,
        "data-disabled": i ? "" : void 0,
        "data-placeholder": uf(s.value) ? "" : void 0,
        ...o,
        ref: l,
        onClick: V(o.onClick, (p) => {
          p.currentTarget.focus(), d.current !== "mouse" && v(p);
        }),
        onPointerDown: V(o.onPointerDown, (p) => {
          d.current = p.pointerType;
          const b = p.target;
          b.hasPointerCapture(p.pointerId) && b.releasePointerCapture(p.pointerId), p.button === 0 && p.ctrlKey === !1 && p.pointerType === "mouse" && (v(p), p.preventDefault());
        }),
        onKeyDown: V(o.onKeyDown, (p) => {
          const b = f.current !== "";
          !(p.ctrlKey || p.altKey || p.metaKey) && p.key.length === 1 && h(p.key), !(b && p.key === " ") && xy.includes(p.key) && (v(), p.preventDefault());
        })
      }
    ) });
  }
);
Fd.displayName = zd;
var Wd = "SelectValue", Bd = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, l = Vt(Wd, n), { onValueNodeHasChildrenChange: u } = l, d = a !== void 0, f = ae(t, l.onValueNodeChange);
    return ke(() => {
      u(d);
    }, [u, d]), /* @__PURE__ */ m(
      K.span,
      {
        ...i,
        ref: f,
        style: { pointerEvents: "none" },
        children: uf(l.value) ? /* @__PURE__ */ m(Ee, { children: s }) : a
      }
    );
  }
);
Bd.displayName = Wd;
var My = "SelectIcon", Vd = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ m(K.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Vd.displayName = My;
var Ny = "SelectPortal", Hd = (e) => /* @__PURE__ */ m(Dn, { asChild: !0, ...e });
Hd.displayName = Ny;
var Jt = "SelectContent", Yd = c.forwardRef(
  (e, t) => {
    const n = Vt(Jt, e.__scopeSelect), [r, o] = c.useState();
    if (ke(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? lr.createPortal(
        /* @__PURE__ */ m(Ud, { scope: e.__scopeSelect, children: /* @__PURE__ */ m(zo.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ m("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ m(Gd, { ...e, ref: t });
  }
);
Yd.displayName = Jt;
var Ke = 10, [Ud, Ht] = _n(Jt), Py = "SelectContentImpl", Dy = /* @__PURE__ */ It("SelectContent.RemoveScroll"), Gd = c.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: r = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      //
      // PopperContent props
      side: i,
      sideOffset: l,
      align: u,
      alignOffset: d,
      arrowPadding: f,
      collisionBoundary: h,
      collisionPadding: g,
      sticky: v,
      hideWhenDetached: p,
      avoidCollisions: b,
      //
      ...w
    } = e, x = Vt(Jt, n), [y, S] = c.useState(null), [C, R] = c.useState(null), E = ae(t, ($) => S($)), [k, M] = c.useState(null), [T, O] = c.useState(
      null
    ), L = Fo(n), [A, Y] = c.useState(!1), j = c.useRef(!1);
    c.useEffect(() => {
      if (y) return xo(y);
    }, [y]), wo();
    const F = c.useCallback(
      ($) => {
        const [te, ...J] = L().map((me) => me.ref.current), [ie] = J.slice(-1), ce = document.activeElement;
        for (const me of $)
          if (me === ce || (me == null || me.scrollIntoView({ block: "nearest" }), me === te && C && (C.scrollTop = 0), me === ie && C && (C.scrollTop = C.scrollHeight), me == null || me.focus(), document.activeElement !== ce)) return;
      },
      [L, C]
    ), G = c.useCallback(
      () => F([k, y]),
      [F, k, y]
    );
    c.useEffect(() => {
      A && G();
    }, [A, G]);
    const { onOpenChange: P, triggerPointerDownPosRef: _ } = x;
    c.useEffect(() => {
      if (y) {
        let $ = { x: 0, y: 0 };
        const te = (ie) => {
          var ce, me;
          $ = {
            x: Math.abs(Math.round(ie.pageX) - (((ce = _.current) == null ? void 0 : ce.x) ?? 0)),
            y: Math.abs(Math.round(ie.pageY) - (((me = _.current) == null ? void 0 : me.y) ?? 0))
          };
        }, J = (ie) => {
          $.x <= 10 && $.y <= 10 ? ie.preventDefault() : y.contains(ie.target) || P(!1), document.removeEventListener("pointermove", te), _.current = null;
        };
        return _.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", J, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", J, { capture: !0 });
        };
      }
    }, [y, P, _]), c.useEffect(() => {
      const $ = () => P(!1);
      return window.addEventListener("blur", $), window.addEventListener("resize", $), () => {
        window.removeEventListener("blur", $), window.removeEventListener("resize", $);
      };
    }, [P]);
    const [Z, se] = df(($) => {
      const te = L().filter((ce) => !ce.disabled), J = te.find((ce) => ce.ref.current === document.activeElement), ie = ff(te, $, J);
      ie && setTimeout(() => ie.ref.current.focus());
    }), D = c.useCallback(
      ($, te, J) => {
        const ie = !j.current && !J;
        (x.value !== void 0 && x.value === te || ie) && (M($), ie && (j.current = !0));
      },
      [x.value]
    ), B = c.useCallback(() => y == null ? void 0 : y.focus(), [y]), W = c.useCallback(
      ($, te, J) => {
        const ie = !j.current && !J;
        (x.value !== void 0 && x.value === te || ie) && O($);
      },
      [x.value]
    ), U = r === "popper" ? ni : jd, oe = U === ni ? {
      side: i,
      sideOffset: l,
      align: u,
      alignOffset: d,
      arrowPadding: f,
      collisionBoundary: h,
      collisionPadding: g,
      sticky: v,
      hideWhenDetached: p,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ m(
      Ud,
      {
        scope: n,
        content: y,
        viewport: C,
        onViewportChange: R,
        itemRefCallback: D,
        selectedItem: k,
        onItemLeave: B,
        itemTextRefCallback: W,
        focusSelectedItem: G,
        selectedItemText: T,
        position: r,
        isPositioned: A,
        searchRef: Z,
        children: /* @__PURE__ */ m(ur, { as: Dy, allowPinchZoom: !0, children: /* @__PURE__ */ m(
          cr,
          {
            asChild: !0,
            trapped: x.open,
            onMountAutoFocus: ($) => {
              $.preventDefault();
            },
            onUnmountAutoFocus: V(o, ($) => {
              var te;
              (te = x.trigger) == null || te.focus({ preventScroll: !0 }), $.preventDefault();
            }),
            children: /* @__PURE__ */ m(
              Pn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: ($) => $.preventDefault(),
                onDismiss: () => x.onOpenChange(!1),
                children: /* @__PURE__ */ m(
                  U,
                  {
                    role: "listbox",
                    id: x.contentId,
                    "data-state": x.open ? "open" : "closed",
                    dir: x.dir,
                    onContextMenu: ($) => $.preventDefault(),
                    ...w,
                    ...oe,
                    onPlaced: () => Y(!0),
                    ref: E,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: V(w.onKeyDown, ($) => {
                      const te = $.ctrlKey || $.altKey || $.metaKey;
                      if ($.key === "Tab" && $.preventDefault(), !te && $.key.length === 1 && se($.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes($.key)) {
                        let ie = L().filter((ce) => !ce.disabled).map((ce) => ce.ref.current);
                        if (["ArrowUp", "End"].includes($.key) && (ie = ie.slice().reverse()), ["ArrowUp", "ArrowDown"].includes($.key)) {
                          const ce = $.target, me = ie.indexOf(ce);
                          ie = ie.slice(me + 1);
                        }
                        setTimeout(() => F(ie)), $.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Gd.displayName = Py;
var Ty = "SelectItemAlignedPosition", jd = c.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = Vt(Jt, n), s = Ht(Jt, n), [i, l] = c.useState(null), [u, d] = c.useState(null), f = ae(t, (E) => d(E)), h = Fo(n), g = c.useRef(!1), v = c.useRef(!0), { viewport: p, selectedItem: b, selectedItemText: w, focusSelectedItem: x } = s, y = c.useCallback(() => {
    if (a.trigger && a.valueNode && i && u && p && b && w) {
      const E = a.trigger.getBoundingClientRect(), k = u.getBoundingClientRect(), M = a.valueNode.getBoundingClientRect(), T = w.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const ce = T.left - k.left, me = M.left - ce, Oe = E.left - me, ne = E.width + Oe, et = Math.max(ne, k.width), tt = window.innerWidth - Ke, je = tr(me, [
          Ke,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Ke, tt - et)
        ]);
        i.style.minWidth = ne + "px", i.style.left = je + "px";
      } else {
        const ce = k.right - T.right, me = window.innerWidth - M.right - ce, Oe = window.innerWidth - E.right - me, ne = E.width + Oe, et = Math.max(ne, k.width), tt = window.innerWidth - Ke, je = tr(me, [
          Ke,
          Math.max(Ke, tt - et)
        ]);
        i.style.minWidth = ne + "px", i.style.right = je + "px";
      }
      const O = h(), L = window.innerHeight - Ke * 2, A = p.scrollHeight, Y = window.getComputedStyle(u), j = parseInt(Y.borderTopWidth, 10), F = parseInt(Y.paddingTop, 10), G = parseInt(Y.borderBottomWidth, 10), P = parseInt(Y.paddingBottom, 10), _ = j + F + A + P + G, Z = Math.min(b.offsetHeight * 5, _), se = window.getComputedStyle(p), D = parseInt(se.paddingTop, 10), B = parseInt(se.paddingBottom, 10), W = E.top + E.height / 2 - Ke, U = L - W, oe = b.offsetHeight / 2, $ = b.offsetTop + oe, te = j + F + $, J = _ - te;
      if (te <= W) {
        const ce = O.length > 0 && b === O[O.length - 1].ref.current;
        i.style.bottom = "0px";
        const me = u.clientHeight - p.offsetTop - p.offsetHeight, Oe = Math.max(
          U,
          oe + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ce ? B : 0) + me + G
        ), ne = te + Oe;
        i.style.height = ne + "px";
      } else {
        const ce = O.length > 0 && b === O[0].ref.current;
        i.style.top = "0px";
        const Oe = Math.max(
          W,
          j + p.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ce ? D : 0) + oe
        ) + J;
        i.style.height = Oe + "px", p.scrollTop = te - W + p.offsetTop;
      }
      i.style.margin = `${Ke}px 0`, i.style.minHeight = Z + "px", i.style.maxHeight = L + "px", r == null || r(), requestAnimationFrame(() => g.current = !0);
    }
  }, [
    h,
    a.trigger,
    a.valueNode,
    i,
    u,
    p,
    b,
    w,
    a.dir,
    r
  ]);
  ke(() => y(), [y]);
  const [S, C] = c.useState();
  ke(() => {
    u && C(window.getComputedStyle(u).zIndex);
  }, [u]);
  const R = c.useCallback(
    (E) => {
      E && v.current === !0 && (y(), x == null || x(), v.current = !1);
    },
    [y, x]
  );
  return /* @__PURE__ */ m(
    _y,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: g,
      onScrollButtonChange: R,
      children: /* @__PURE__ */ m(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ m(
            K.div,
            {
              ...o,
              ref: f,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
jd.displayName = Ty;
var Oy = "SelectPopperPosition", ni = c.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Ke,
    ...a
  } = e, s = Wo(n);
  return /* @__PURE__ */ m(
    Do,
    {
      ...s,
      ...a,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...a.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
ni.displayName = Oy;
var [_y, ls] = _n(Jt, {}), ri = "SelectViewport", Kd = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = Ht(ri, n), s = ls(ri, n), i = ae(t, a.onViewportChange), l = c.useRef(0);
    return /* @__PURE__ */ I(Ee, { children: [
      /* @__PURE__ */ m(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ m(zo.Slot, { scope: n, children: /* @__PURE__ */ m(
        K.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: i,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: V(o.onScroll, (u) => {
            const d = u.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: h } = s;
            if (h != null && h.current && f) {
              const g = Math.abs(l.current - d.scrollTop);
              if (g > 0) {
                const v = window.innerHeight - Ke * 2, p = parseFloat(f.style.minHeight), b = parseFloat(f.style.height), w = Math.max(p, b);
                if (w < v) {
                  const x = w + g, y = Math.min(v, x), S = x - y;
                  f.style.height = y + "px", f.style.bottom === "0px" && (d.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end");
                }
              }
            }
            l.current = d.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Kd.displayName = ri;
var qd = "SelectGroup", [Ay, Iy] = _n(qd), Xd = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Ce();
    return /* @__PURE__ */ m(Ay, { scope: n, id: o, children: /* @__PURE__ */ m(K.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
Xd.displayName = qd;
var Zd = "SelectLabel", Qd = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Iy(Zd, n);
    return /* @__PURE__ */ m(K.div, { id: o.id, ...r, ref: t });
  }
);
Qd.displayName = Zd;
var ho = "SelectItem", [Ly, Jd] = _n(ho), ef = c.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = Vt(ho, n), l = Ht(ho, n), u = i.value === r, [d, f] = c.useState(a ?? ""), [h, g] = c.useState(!1), v = ae(
      t,
      (x) => {
        var y;
        return (y = l.itemRefCallback) == null ? void 0 : y.call(l, x, r, o);
      }
    ), p = Ce(), b = c.useRef("touch"), w = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ m(
      Ly,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: p,
        isSelected: u,
        onItemTextChange: c.useCallback((x) => {
          f((y) => y || ((x == null ? void 0 : x.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ m(
          zo.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: d,
            children: /* @__PURE__ */ m(
              K.div,
              {
                role: "option",
                "aria-labelledby": p,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": u && h,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: v,
                onFocus: V(s.onFocus, () => g(!0)),
                onBlur: V(s.onBlur, () => g(!1)),
                onClick: V(s.onClick, () => {
                  b.current !== "mouse" && w();
                }),
                onPointerUp: V(s.onPointerUp, () => {
                  b.current === "mouse" && w();
                }),
                onPointerDown: V(s.onPointerDown, (x) => {
                  b.current = x.pointerType;
                }),
                onPointerMove: V(s.onPointerMove, (x) => {
                  var y;
                  b.current = x.pointerType, o ? (y = l.onItemLeave) == null || y.call(l) : b.current === "mouse" && x.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: V(s.onPointerLeave, (x) => {
                  var y;
                  x.currentTarget === document.activeElement && ((y = l.onItemLeave) == null || y.call(l));
                }),
                onKeyDown: V(s.onKeyDown, (x) => {
                  var S;
                  ((S = l.searchRef) == null ? void 0 : S.current) !== "" && x.key === " " || (Sy.includes(x.key) && w(), x.key === " " && x.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
ef.displayName = ho;
var Kn = "SelectItemText", tf = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = Vt(Kn, n), i = Ht(Kn, n), l = Jd(Kn, n), u = Ry(Kn, n), [d, f] = c.useState(null), h = ae(
      t,
      (w) => f(w),
      l.onItemTextChange,
      (w) => {
        var x;
        return (x = i.itemTextRefCallback) == null ? void 0 : x.call(i, w, l.value, l.disabled);
      }
    ), g = d == null ? void 0 : d.textContent, v = c.useMemo(
      () => /* @__PURE__ */ m("option", { value: l.value, disabled: l.disabled, children: g }, l.value),
      [l.disabled, l.value, g]
    ), { onNativeOptionAdd: p, onNativeOptionRemove: b } = u;
    return ke(() => (p(v), () => b(v)), [p, b, v]), /* @__PURE__ */ I(Ee, { children: [
      /* @__PURE__ */ m(K.span, { id: l.textId, ...a, ref: h }),
      l.isSelected && s.valueNode && !s.valueNodeHasChildren ? lr.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
tf.displayName = Kn;
var nf = "SelectItemIndicator", rf = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return Jd(nf, n).isSelected ? /* @__PURE__ */ m(K.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
rf.displayName = nf;
var oi = "SelectScrollUpButton", of = c.forwardRef((e, t) => {
  const n = Ht(oi, e.__scopeSelect), r = ls(oi, e.__scopeSelect), [o, a] = c.useState(!1), s = ae(t, r.onScrollButtonChange);
  return ke(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const u = l.scrollTop > 0;
        a(u);
      };
      const l = n.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ m(
    sf,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: l } = n;
        i && l && (i.scrollTop = i.scrollTop - l.offsetHeight);
      }
    }
  ) : null;
});
of.displayName = oi;
var ai = "SelectScrollDownButton", af = c.forwardRef((e, t) => {
  const n = Ht(ai, e.__scopeSelect), r = ls(ai, e.__scopeSelect), [o, a] = c.useState(!1), s = ae(t, r.onScrollButtonChange);
  return ke(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const u = l.scrollHeight - l.clientHeight, d = Math.ceil(l.scrollTop) < u;
        a(d);
      };
      const l = n.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ m(
    sf,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: l } = n;
        i && l && (i.scrollTop = i.scrollTop + l.offsetHeight);
      }
    }
  ) : null;
});
af.displayName = ai;
var sf = c.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = Ht("SelectScrollButton", n), s = c.useRef(null), i = Fo(n), l = c.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return c.useEffect(() => () => l(), [l]), ke(() => {
    var d;
    const u = i().find((f) => f.ref.current === document.activeElement);
    (d = u == null ? void 0 : u.ref.current) == null || d.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ m(
    K.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: V(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: V(o.onPointerMove, () => {
        var u;
        (u = a.onItemLeave) == null || u.call(a), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: V(o.onPointerLeave, () => {
        l();
      })
    }
  );
}), $y = "SelectSeparator", lf = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ m(K.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
lf.displayName = $y;
var ii = "SelectArrow", zy = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Wo(n), a = Vt(ii, n), s = Ht(ii, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ m(To, { ...o, ...r, ref: t }) : null;
  }
);
zy.displayName = ii;
var Fy = "SelectBubbleInput", cf = c.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = c.useRef(null), a = ae(r, o), s = Co(t);
    return c.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const l = window.HTMLSelectElement.prototype, d = Object.getOwnPropertyDescriptor(
        l,
        "value"
      ).set;
      if (s !== t && d) {
        const f = new Event("change", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ m(
      K.select,
      {
        ...n,
        style: { ...ic, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
cf.displayName = Fy;
function uf(e) {
  return e === "" || e === void 0;
}
function df(e) {
  const t = De(e), n = c.useRef(""), r = c.useRef(0), o = c.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), (function l(u) {
        n.current = u, window.clearTimeout(r.current), u !== "" && (r.current = window.setTimeout(() => l(""), 1e3));
      })(i);
    },
    [t]
  ), a = c.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return c.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function ff(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = Wy(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const l = s.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Wy(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var By = $d, Vy = Fd, Hy = Bd, Yy = Vd, Uy = Hd, Gy = Yd, jy = Kd, Ky = Xd, qy = Qd, Xy = ef, Zy = tf, Qy = rf, Jy = of, ex = af, tx = lf, nx = "Separator", il = "horizontal", rx = ["horizontal", "vertical"], mf = c.forwardRef((e, t) => {
  const { decorative: n, orientation: r = il, ...o } = e, a = ox(r) ? r : il, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ m(
    K.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
mf.displayName = nx;
function ox(e) {
  return rx.includes(e);
}
var ax = mf, hf = ["PageUp", "PageDown"], pf = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], gf = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, An = "Slider", [si, ix, sx] = bo(An), [vf, I1] = Le(An, [
  sx
]), [lx, Bo] = vf(An), bf = c.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: l = 0,
      defaultValue: u = [r],
      value: d,
      onValueChange: f = () => {
      },
      onValueCommit: h = () => {
      },
      inverted: g = !1,
      form: v,
      ...p
    } = e, b = c.useRef(/* @__PURE__ */ new Set()), w = c.useRef(0), y = s === "horizontal" ? cx : ux, [S = [], C] = Ue({
      prop: d,
      defaultProp: u,
      onChange: (O) => {
        var A;
        (A = [...b.current][w.current]) == null || A.focus(), f(O);
      }
    }), R = c.useRef(S);
    function E(O) {
      const L = px(S, O);
      T(O, L);
    }
    function k(O) {
      T(O, w.current);
    }
    function M() {
      const O = R.current[w.current];
      S[w.current] !== O && h(S);
    }
    function T(O, L, { commit: A } = { commit: !1 }) {
      const Y = wx(a), j = yx(Math.round((O - r) / a) * a + r, Y), F = tr(j, [r, o]);
      C((G = []) => {
        const P = mx(G, F, L);
        if (bx(P, l * a)) {
          w.current = P.indexOf(F);
          const _ = String(P) !== String(G);
          return _ && A && h(P), _ ? P : G;
        } else
          return G;
      });
    }
    return /* @__PURE__ */ m(
      lx,
      {
        scope: e.__scopeSlider,
        name: n,
        disabled: i,
        min: r,
        max: o,
        valueIndexToChangeRef: w,
        thumbs: b.current,
        values: S,
        orientation: s,
        form: v,
        children: /* @__PURE__ */ m(si.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ m(si.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ m(
          y,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...p,
            ref: t,
            onPointerDown: V(p.onPointerDown, () => {
              i || (R.current = S);
            }),
            min: r,
            max: o,
            inverted: g,
            onSlideStart: i ? void 0 : E,
            onSlideMove: i ? void 0 : k,
            onSlideEnd: i ? void 0 : M,
            onHomeKeyDown: () => !i && T(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && T(o, S.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: O, direction: L }) => {
              if (!i) {
                const j = hf.includes(O.key) || O.shiftKey && pf.includes(O.key) ? 10 : 1, F = w.current, G = S[F], P = a * j * L;
                T(G + P, F, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
bf.displayName = An;
var [wf, yf] = vf(An, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), cx = c.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: l,
      onStepKeyDown: u,
      ...d
    } = e, [f, h] = c.useState(null), g = ae(t, (y) => h(y)), v = c.useRef(void 0), p = Nn(o), b = p === "ltr", w = b && !a || !b && a;
    function x(y) {
      const S = v.current || f.getBoundingClientRect(), C = [0, S.width], E = cs(C, w ? [n, r] : [r, n]);
      return v.current = S, E(y - S.left);
    }
    return /* @__PURE__ */ m(
      wf,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ m(
          xf,
          {
            dir: p,
            "data-orientation": "horizontal",
            ...d,
            ref: g,
            style: {
              ...d.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (y) => {
              const S = x(y.clientX);
              s == null || s(S);
            },
            onSlideMove: (y) => {
              const S = x(y.clientX);
              i == null || i(S);
            },
            onSlideEnd: () => {
              v.current = void 0, l == null || l();
            },
            onStepKeyDown: (y) => {
              const C = gf[w ? "from-left" : "from-right"].includes(y.key);
              u == null || u({ event: y, direction: C ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), ux = c.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: l,
      ...u
    } = e, d = c.useRef(null), f = ae(t, d), h = c.useRef(void 0), g = !o;
    function v(p) {
      const b = h.current || d.current.getBoundingClientRect(), w = [0, b.height], y = cs(w, g ? [r, n] : [n, r]);
      return h.current = b, y(p - b.top);
    }
    return /* @__PURE__ */ m(
      wf,
      {
        scope: e.__scopeSlider,
        startEdge: g ? "bottom" : "top",
        endEdge: g ? "top" : "bottom",
        size: "height",
        direction: g ? 1 : -1,
        children: /* @__PURE__ */ m(
          xf,
          {
            "data-orientation": "vertical",
            ...u,
            ref: f,
            style: {
              ...u.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (p) => {
              const b = v(p.clientY);
              a == null || a(b);
            },
            onSlideMove: (p) => {
              const b = v(p.clientY);
              s == null || s(b);
            },
            onSlideEnd: () => {
              h.current = void 0, i == null || i();
            },
            onStepKeyDown: (p) => {
              const w = gf[g ? "from-bottom" : "from-top"].includes(p.key);
              l == null || l({ event: p, direction: w ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), xf = c.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: l,
      ...u
    } = e, d = Bo(An, n);
    return /* @__PURE__ */ m(
      K.span,
      {
        ...u,
        ref: t,
        onKeyDown: V(e.onKeyDown, (f) => {
          f.key === "Home" ? (s(f), f.preventDefault()) : f.key === "End" ? (i(f), f.preventDefault()) : hf.concat(pf).includes(f.key) && (l(f), f.preventDefault());
        }),
        onPointerDown: V(e.onPointerDown, (f) => {
          const h = f.target;
          h.setPointerCapture(f.pointerId), f.preventDefault(), d.thumbs.has(h) ? h.focus() : r(f);
        }),
        onPointerMove: V(e.onPointerMove, (f) => {
          f.target.hasPointerCapture(f.pointerId) && o(f);
        }),
        onPointerUp: V(e.onPointerUp, (f) => {
          const h = f.target;
          h.hasPointerCapture(f.pointerId) && (h.releasePointerCapture(f.pointerId), a(f));
        })
      }
    );
  }
), Sf = "SliderTrack", Cf = c.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = Bo(Sf, n);
    return /* @__PURE__ */ m(
      K.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...r,
        ref: t
      }
    );
  }
);
Cf.displayName = Sf;
var li = "SliderRange", Ef = c.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = Bo(li, n), a = yf(li, n), s = c.useRef(null), i = ae(t, s), l = o.values.length, u = o.values.map(
      (h) => Mf(h, o.min, o.max)
    ), d = l > 1 ? Math.min(...u) : 0, f = 100 - Math.max(...u);
    return /* @__PURE__ */ m(
      K.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: i,
        style: {
          ...e.style,
          [a.startEdge]: d + "%",
          [a.endEdge]: f + "%"
        }
      }
    );
  }
);
Ef.displayName = li;
var ci = "SliderThumb", kf = c.forwardRef(
  (e, t) => {
    const n = ix(e.__scopeSlider), [r, o] = c.useState(null), a = ae(t, (i) => o(i)), s = c.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ m(dx, { ...e, ref: a, index: s });
  }
), dx = c.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = Bo(ci, n), i = yf(ci, n), [l, u] = c.useState(null), d = ae(t, (x) => u(x)), f = l ? s.form || !!l.closest("form") : !0, h = Eo(l), g = s.values[r], v = g === void 0 ? 0 : Mf(g, s.min, s.max), p = hx(r, s.values.length), b = h == null ? void 0 : h[i.size], w = b ? gx(b, v, i.direction) : 0;
    return c.useEffect(() => {
      if (l)
        return s.thumbs.add(l), () => {
          s.thumbs.delete(l);
        };
    }, [l, s.thumbs]), /* @__PURE__ */ I(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${v}% + ${w}px)`
        },
        children: [
          /* @__PURE__ */ m(si.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ m(
            K.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || p,
              "aria-valuemin": s.min,
              "aria-valuenow": g,
              "aria-valuemax": s.max,
              "aria-orientation": s.orientation,
              "data-orientation": s.orientation,
              "data-disabled": s.disabled ? "" : void 0,
              tabIndex: s.disabled ? void 0 : 0,
              ...a,
              ref: d,
              style: g === void 0 ? { display: "none" } : e.style,
              onFocus: V(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          f && /* @__PURE__ */ m(
            Rf,
            {
              name: o ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
              form: s.form,
              value: g
            },
            r
          )
        ]
      }
    );
  }
);
kf.displayName = ci;
var fx = "RadioBubbleInput", Rf = c.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = c.useRef(null), a = ae(o, r), s = Co(t);
    return c.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const l = window.HTMLInputElement.prototype, d = Object.getOwnPropertyDescriptor(l, "value").set;
      if (s !== t && d) {
        const f = new Event("input", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ m(
      K.input,
      {
        style: { display: "none" },
        ...n,
        ref: a,
        defaultValue: t
      }
    );
  }
);
Rf.displayName = fx;
function mx(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function Mf(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return tr(a, [0, 100]);
}
function hx(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function px(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function gx(e, t, n) {
  const r = e / 2, a = cs([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function vx(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function bx(e, t) {
  if (t > 0) {
    const n = vx(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function cs(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function wx(e) {
  return (String(e).split(".")[1] || "").length;
}
function yx(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var xx = bf, Sx = Cf, Cx = Ef, Ex = kf, Vo = "Switch", [kx, L1] = Le(Vo), [Rx, Mx] = kx(Vo), Nf = c.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l = "on",
      onCheckedChange: u,
      form: d,
      ...f
    } = e, [h, g] = c.useState(null), v = ae(t, (y) => g(y)), p = c.useRef(!1), b = h ? d || !!h.closest("form") : !0, [w, x] = Ue({
      prop: o,
      defaultProp: a ?? !1,
      onChange: u,
      caller: Vo
    });
    return /* @__PURE__ */ I(Rx, { scope: n, checked: w, disabled: i, children: [
      /* @__PURE__ */ m(
        K.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": s,
          "data-state": Of(w),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...f,
          ref: v,
          onClick: V(e.onClick, (y) => {
            x((S) => !S), b && (p.current = y.isPropagationStopped(), p.current || y.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ m(
        Tf,
        {
          control: h,
          bubbles: !p.current,
          name: r,
          value: l,
          checked: w,
          required: s,
          disabled: i,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Nf.displayName = Vo;
var Pf = "SwitchThumb", Df = c.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Mx(Pf, n);
    return /* @__PURE__ */ m(
      K.span,
      {
        "data-state": Of(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Df.displayName = Pf;
var Nx = "SwitchBubbleInput", Tf = c.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = c.useRef(null), i = ae(s, a), l = Co(n), u = Eo(t);
    return c.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const f = window.HTMLInputElement.prototype, g = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (l !== n && g) {
        const v = new Event("click", { bubbles: r });
        g.call(d, n), d.dispatchEvent(v);
      }
    }, [l, n, r]), /* @__PURE__ */ m(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...u,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Tf.displayName = Nx;
function Of(e) {
  return e ? "checked" : "unchecked";
}
var Px = Nf, Dx = Df, Ho = "Tabs", [Tx, $1] = Le(Ho, [
  Oo
]), _f = Oo(), [Ox, us] = Tx(Ho), Af = c.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: s = "horizontal",
      dir: i,
      activationMode: l = "automatic",
      ...u
    } = e, d = Nn(i), [f, h] = Ue({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: Ho
    });
    return /* @__PURE__ */ m(
      Ox,
      {
        scope: n,
        baseId: Ce(),
        value: f,
        onValueChange: h,
        orientation: s,
        dir: d,
        activationMode: l,
        children: /* @__PURE__ */ m(
          K.div,
          {
            dir: d,
            "data-orientation": s,
            ...u,
            ref: t
          }
        )
      }
    );
  }
);
Af.displayName = Ho;
var If = "TabsList", Lf = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = us(If, n), s = _f(n);
    return /* @__PURE__ */ m(
      Eu,
      {
        asChild: !0,
        ...s,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ m(
          K.div,
          {
            role: "tablist",
            "aria-orientation": a.orientation,
            ...o,
            ref: t
          }
        )
      }
    );
  }
);
Lf.displayName = If;
var $f = "TabsTrigger", zf = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, s = us($f, n), i = _f(n), l = Bf(s.baseId, r), u = Vf(s.baseId, r), d = r === s.value;
    return /* @__PURE__ */ m(
      ku,
      {
        asChild: !0,
        ...i,
        focusable: !o,
        active: d,
        children: /* @__PURE__ */ m(
          K.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": u,
            "data-state": d ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: l,
            ...a,
            ref: t,
            onMouseDown: V(e.onMouseDown, (f) => {
              !o && f.button === 0 && f.ctrlKey === !1 ? s.onValueChange(r) : f.preventDefault();
            }),
            onKeyDown: V(e.onKeyDown, (f) => {
              [" ", "Enter"].includes(f.key) && s.onValueChange(r);
            }),
            onFocus: V(e.onFocus, () => {
              const f = s.activationMode !== "manual";
              !d && !o && f && s.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
zf.displayName = $f;
var Ff = "TabsContent", Wf = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...s } = e, i = us(Ff, n), l = Bf(i.baseId, r), u = Vf(i.baseId, r), d = r === i.value, f = c.useRef(d);
    return c.useEffect(() => {
      const h = requestAnimationFrame(() => f.current = !1);
      return () => cancelAnimationFrame(h);
    }, []), /* @__PURE__ */ m(_e, { present: o || d, children: ({ present: h }) => /* @__PURE__ */ m(
      K.div,
      {
        "data-state": d ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": l,
        hidden: !h,
        id: u,
        tabIndex: 0,
        ...s,
        ref: t,
        style: {
          ...e.style,
          animationDuration: f.current ? "0s" : void 0
        },
        children: h && a
      }
    ) });
  }
);
Wf.displayName = Ff;
function Bf(e, t) {
  return `${e}-trigger-${t}`;
}
function Vf(e, t) {
  return `${e}-content-${t}`;
}
var _x = Af, Ax = Lf, Ix = zf, Lx = Wf, [Yo, z1] = Le("Tooltip", [
  Ft
]), Uo = Ft(), Hf = "TooltipProvider", $x = 700, ui = "tooltip.open", [zx, ds] = Yo(Hf), Yf = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = $x,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = c.useRef(!0), i = c.useRef(!1), l = c.useRef(0);
  return c.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ m(
    zx,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: c.useCallback(() => {
        window.clearTimeout(l.current), s.current = !1;
      }, []),
      onClose: c.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => s.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: c.useCallback((u) => {
        i.current = u;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
Yf.displayName = Hf;
var nr = "Tooltip", [Fx, yr] = Yo(nr), Uf = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, l = ds(nr, e.__scopeTooltip), u = Uo(t), [d, f] = c.useState(null), h = Ce(), g = c.useRef(0), v = s ?? l.disableHoverableContent, p = i ?? l.delayDuration, b = c.useRef(!1), [w, x] = Ue({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (E) => {
      E ? (l.onOpen(), document.dispatchEvent(new CustomEvent(ui))) : l.onClose(), a == null || a(E);
    },
    caller: nr
  }), y = c.useMemo(() => w ? b.current ? "delayed-open" : "instant-open" : "closed", [w]), S = c.useCallback(() => {
    window.clearTimeout(g.current), g.current = 0, b.current = !1, x(!0);
  }, [x]), C = c.useCallback(() => {
    window.clearTimeout(g.current), g.current = 0, x(!1);
  }, [x]), R = c.useCallback(() => {
    window.clearTimeout(g.current), g.current = window.setTimeout(() => {
      b.current = !0, x(!0), g.current = 0;
    }, p);
  }, [p, x]);
  return c.useEffect(() => () => {
    g.current && (window.clearTimeout(g.current), g.current = 0);
  }, []), /* @__PURE__ */ m(mr, { ...u, children: /* @__PURE__ */ m(
    Fx,
    {
      scope: t,
      contentId: h,
      open: w,
      stateAttribute: y,
      trigger: d,
      onTriggerChange: f,
      onTriggerEnter: c.useCallback(() => {
        l.isOpenDelayedRef.current ? R() : S();
      }, [l.isOpenDelayedRef, R, S]),
      onTriggerLeave: c.useCallback(() => {
        v ? C() : (window.clearTimeout(g.current), g.current = 0);
      }, [C, v]),
      onOpen: S,
      onClose: C,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
Uf.displayName = nr;
var di = "TooltipTrigger", Gf = c.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = yr(di, n), a = ds(di, n), s = Uo(n), i = c.useRef(null), l = ae(t, i, o.onTriggerChange), u = c.useRef(!1), d = c.useRef(!1), f = c.useCallback(() => u.current = !1, []);
    return c.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ m(hr, { asChild: !0, ...s, children: /* @__PURE__ */ m(
      K.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: V(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !d.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: V(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: V(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: V(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: V(e.onBlur, o.onClose),
        onClick: V(e.onClick, o.onClose)
      }
    ) });
  }
);
Gf.displayName = di;
var fs = "TooltipPortal", [Wx, Bx] = Yo(fs, {
  forceMount: void 0
}), jf = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = yr(fs, t);
  return /* @__PURE__ */ m(Wx, { scope: t, forceMount: n, children: /* @__PURE__ */ m(_e, { present: n || a.open, children: /* @__PURE__ */ m(Dn, { asChild: !0, container: o, children: r }) }) });
};
jf.displayName = fs;
var kn = "TooltipContent", Kf = c.forwardRef(
  (e, t) => {
    const n = Bx(kn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = yr(kn, e.__scopeTooltip);
    return /* @__PURE__ */ m(_e, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ m(qf, { side: o, ...a, ref: t }) : /* @__PURE__ */ m(Vx, { side: o, ...a, ref: t }) });
  }
), Vx = c.forwardRef((e, t) => {
  const n = yr(kn, e.__scopeTooltip), r = ds(kn, e.__scopeTooltip), o = c.useRef(null), a = ae(t, o), [s, i] = c.useState(null), { trigger: l, onClose: u } = n, d = o.current, { onPointerInTransitChange: f } = r, h = c.useCallback(() => {
    i(null), f(!1);
  }, [f]), g = c.useCallback(
    (v, p) => {
      const b = v.currentTarget, w = { x: v.clientX, y: v.clientY }, x = Gx(w, b.getBoundingClientRect()), y = jx(w, x), S = Kx(p.getBoundingClientRect()), C = Xx([...y, ...S]);
      i(C), f(!0);
    },
    [f]
  );
  return c.useEffect(() => () => h(), [h]), c.useEffect(() => {
    if (l && d) {
      const v = (b) => g(b, d), p = (b) => g(b, l);
      return l.addEventListener("pointerleave", v), d.addEventListener("pointerleave", p), () => {
        l.removeEventListener("pointerleave", v), d.removeEventListener("pointerleave", p);
      };
    }
  }, [l, d, g, h]), c.useEffect(() => {
    if (s) {
      const v = (p) => {
        const b = p.target, w = { x: p.clientX, y: p.clientY }, x = (l == null ? void 0 : l.contains(b)) || (d == null ? void 0 : d.contains(b)), y = !qx(w, s);
        x ? h() : y && (h(), u());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [l, d, s, u, h]), /* @__PURE__ */ m(qf, { ...e, ref: a });
}), [Hx, Yx] = Yo(nr, { isInside: !1 }), Ux = /* @__PURE__ */ Jh("TooltipContent"), qf = c.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, l = yr(kn, n), u = Uo(n), { onClose: d } = l;
    return c.useEffect(() => (document.addEventListener(ui, d), () => document.removeEventListener(ui, d)), [d]), c.useEffect(() => {
      if (l.trigger) {
        const f = (h) => {
          const g = h.target;
          g != null && g.contains(l.trigger) && d();
        };
        return window.addEventListener("scroll", f, { capture: !0 }), () => window.removeEventListener("scroll", f, { capture: !0 });
      }
    }, [l.trigger, d]), /* @__PURE__ */ m(
      Pn,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ I(
          Do,
          {
            "data-state": l.stateAttribute,
            ...u,
            ...i,
            ref: t,
            style: {
              ...i.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ m(Ux, { children: r }),
              /* @__PURE__ */ m(Hx, { scope: n, isInside: !0, children: /* @__PURE__ */ m(ap, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Kf.displayName = kn;
var Xf = "TooltipArrow", Zf = c.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Uo(n);
    return Yx(
      Xf,
      n
    ).isInside ? null : /* @__PURE__ */ m(To, { ...o, ...r, ref: t });
  }
);
Zf.displayName = Xf;
function Gx(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, a)) {
    case a:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function jx(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function Kx(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function qx(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], l = t[s], u = i.x, d = i.y, f = l.x, h = l.y;
    d > r != h > r && n < (f - u) * (r - d) / (h - d) + u && (o = !o);
  }
  return o;
}
function Xx(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Zx(t);
}
function Zx(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], s = t[t.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const a = n[n.length - 1], s = n[n.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var Qx = Yf, Jx = Uf, e0 = Gf, t0 = jf, n0 = Kf, r0 = Zf;
const ms = "-", o0 = (e) => {
  const t = i0(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(ms);
      return i[0] === "" && i.length !== 1 && i.shift(), Qf(i, t) || a0(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const l = n[s] || [];
      return i && r[s] ? [...l, ...r[s]] : l;
    }
  };
}, Qf = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Qf(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(ms);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, sl = /^\[(.+)\]$/, a0 = (e) => {
  if (sl.test(e)) {
    const t = sl.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, i0 = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    fi(n[o], r, o, t);
  return r;
}, fi = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : ll(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (s0(o)) {
        fi(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      fi(s, ll(t, a), n, r);
    });
  });
}, ll = (e, t) => {
  let n = e;
  return t.split(ms).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, s0 = (e) => e.isThemeGetter, l0 = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, s) => {
    n.set(a, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let s = n.get(a);
      if (s !== void 0)
        return s;
      if ((s = r.get(a)) !== void 0)
        return o(a, s), s;
    },
    set(a, s) {
      n.has(a) ? n.set(a, s) : o(a, s);
    }
  };
}, mi = "!", hi = ":", c0 = hi.length, u0 = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const a = [];
    let s = 0, i = 0, l = 0, u;
    for (let v = 0; v < o.length; v++) {
      let p = o[v];
      if (s === 0 && i === 0) {
        if (p === hi) {
          a.push(o.slice(l, v)), l = v + c0;
          continue;
        }
        if (p === "/") {
          u = v;
          continue;
        }
      }
      p === "[" ? s++ : p === "]" ? s-- : p === "(" ? i++ : p === ")" && i--;
    }
    const d = a.length === 0 ? o : o.substring(l), f = d0(d), h = f !== d, g = u && u > l ? u - l : void 0;
    return {
      modifiers: a,
      hasImportantModifier: h,
      baseClassName: f,
      maybePostfixModifierPosition: g
    };
  };
  if (t) {
    const o = t + hi, a = r;
    r = (s) => s.startsWith(o) ? a(s.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const o = r;
    r = (a) => n({
      className: a,
      parseClassName: o
    });
  }
  return r;
}, d0 = (e) => e.endsWith(mi) ? e.substring(0, e.length - 1) : e.startsWith(mi) ? e.substring(1) : e, f0 = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const o = [];
    let a = [];
    return r.forEach((s) => {
      s[0] === "[" || t[s] ? (o.push(...a.sort(), s), a = []) : a.push(s);
    }), o.push(...a.sort()), o;
  };
}, m0 = (e) => ({
  cache: l0(e.cacheSize),
  parseClassName: u0(e),
  sortModifiers: f0(e),
  ...o0(e)
}), h0 = /\s+/, p0 = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, s = [], i = e.trim().split(h0);
  let l = "";
  for (let u = i.length - 1; u >= 0; u -= 1) {
    const d = i[u], {
      isExternal: f,
      modifiers: h,
      hasImportantModifier: g,
      baseClassName: v,
      maybePostfixModifierPosition: p
    } = n(d);
    if (f) {
      l = d + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!p, w = r(b ? v.substring(0, p) : v);
    if (!w) {
      if (!b) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (w = r(v), !w) {
        l = d + (l.length > 0 ? " " + l : l);
        continue;
      }
      b = !1;
    }
    const x = a(h).join(":"), y = g ? x + mi : x, S = y + w;
    if (s.includes(S))
      continue;
    s.push(S);
    const C = o(w, b);
    for (let R = 0; R < C.length; ++R) {
      const E = C[R];
      s.push(y + E);
    }
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function g0() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Jf(t)) && (r && (r += " "), r += n);
  return r;
}
const Jf = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Jf(e[r])) && (n && (n += " "), n += t);
  return n;
};
function v0(e, ...t) {
  let n, r, o, a = s;
  function s(l) {
    const u = t.reduce((d, f) => f(d), e());
    return n = m0(u), r = n.cache.get, o = n.cache.set, a = i, i(l);
  }
  function i(l) {
    const u = r(l);
    if (u)
      return u;
    const d = p0(l, n);
    return o(l, d), d;
  }
  return function() {
    return a(g0.apply(null, arguments));
  };
}
const Ne = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, em = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, tm = /^\((?:(\w[\w-]*):)?(.+)\)$/i, b0 = /^\d+\/\d+$/, w0 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, y0 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, x0 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, S0 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, C0 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, dn = (e) => b0.test(e), fe = (e) => !!e && !Number.isNaN(Number(e)), Nt = (e) => !!e && Number.isInteger(Number(e)), wa = (e) => e.endsWith("%") && fe(e.slice(0, -1)), pt = (e) => w0.test(e), E0 = () => !0, k0 = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  y0.test(e) && !x0.test(e)
), nm = () => !1, R0 = (e) => S0.test(e), M0 = (e) => C0.test(e), N0 = (e) => !q(e) && !X(e), P0 = (e) => In(e, am, nm), q = (e) => em.test(e), Gt = (e) => In(e, im, k0), ya = (e) => In(e, A0, fe), cl = (e) => In(e, rm, nm), D0 = (e) => In(e, om, M0), Wr = (e) => In(e, sm, R0), X = (e) => tm.test(e), Wn = (e) => Ln(e, im), T0 = (e) => Ln(e, I0), ul = (e) => Ln(e, rm), O0 = (e) => Ln(e, am), _0 = (e) => Ln(e, om), Br = (e) => Ln(e, sm, !0), In = (e, t, n) => {
  const r = em.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Ln = (e, t, n = !1) => {
  const r = tm.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, rm = (e) => e === "position" || e === "percentage", om = (e) => e === "image" || e === "url", am = (e) => e === "length" || e === "size" || e === "bg-size", im = (e) => e === "length", A0 = (e) => e === "number", I0 = (e) => e === "family-name", sm = (e) => e === "shadow", L0 = () => {
  const e = Ne("color"), t = Ne("font"), n = Ne("text"), r = Ne("font-weight"), o = Ne("tracking"), a = Ne("leading"), s = Ne("breakpoint"), i = Ne("container"), l = Ne("spacing"), u = Ne("radius"), d = Ne("shadow"), f = Ne("inset-shadow"), h = Ne("text-shadow"), g = Ne("drop-shadow"), v = Ne("blur"), p = Ne("perspective"), b = Ne("aspect"), w = Ne("ease"), x = Ne("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], C = () => [...S(), X, q], R = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", "contain", "none"], k = () => [X, q, l], M = () => [dn, "full", "auto", ...k()], T = () => [Nt, "none", "subgrid", X, q], O = () => ["auto", {
    span: ["full", Nt, X, q]
  }, Nt, X, q], L = () => [Nt, "auto", X, q], A = () => ["auto", "min", "max", "fr", X, q], Y = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], j = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...k()], G = () => [dn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], P = () => [e, X, q], _ = () => [...S(), ul, cl, {
    position: [X, q]
  }], Z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], se = () => ["auto", "cover", "contain", O0, P0, {
    size: [X, q]
  }], D = () => [wa, Wn, Gt], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    X,
    q
  ], W = () => ["", fe, Wn, Gt], U = () => ["solid", "dashed", "dotted", "double"], oe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], $ = () => [fe, wa, ul, cl], te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    X,
    q
  ], J = () => ["none", fe, X, q], ie = () => ["none", fe, X, q], ce = () => [fe, X, q], me = () => [dn, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [pt],
      breakpoint: [pt],
      color: [E0],
      container: [pt],
      "drop-shadow": [pt],
      ease: ["in", "out", "in-out"],
      font: [N0],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [pt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [pt],
      shadow: [pt],
      spacing: ["px", fe],
      text: [pt],
      "text-shadow": [pt],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", dn, q, X, b]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [fe, q, X, i]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": y()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: C()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: R()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": R()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": R()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: E()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": E()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": E()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: M()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": M()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": M()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: M()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: M()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: M()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: M()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: M()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: M()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Nt, "auto", X, q]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [dn, "full", "auto", i, ...k()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [fe, dn, "auto", "initial", "none", q]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", fe, X, q]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", fe, X, q]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Nt, "first", "last", "none", X, q]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": T()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: O()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": L()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": L()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": T()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: O()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": L()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": L()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": A()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": A()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: k()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": k()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": k()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Y(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...j(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...j()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Y()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...j(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...j(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Y()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...j(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...j()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: k()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: k()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: k()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: k()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: k()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: k()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: k()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: k()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: k()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: F()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: F()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: F()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: F()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: F()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: F()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: F()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: F()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: F()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": k()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": k()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: G()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...G()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          i,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...G()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          i,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [s]
          },
          ...G()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...G()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...G()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...G()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Wn, Gt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, X, ya]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", wa, q]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [T0, q, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, X, q]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [fe, "none", X, ya]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...k()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", X, q]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", X, q]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: P()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: P()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...U(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [fe, "from-font", "auto", X, Gt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: P()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [fe, "auto", X, q]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: k()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", X, q]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", X, q]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: _()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Z()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: se()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Nt, X, q],
          radial: ["", X, q],
          conic: [Nt, X, q]
        }, _0, D0]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: P()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: D()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: P()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: B()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": B()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": B()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": B()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": B()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": B()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": B()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": B()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": B()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": B()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": B()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": B()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": B()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": B()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": B()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: W()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": W()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": W()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": W()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": W()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": W()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": W()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": W()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": W()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": W()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": W()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...U(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...U(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: P()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": P()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": P()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": P()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": P()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": P()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": P()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": P()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": P()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: P()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...U(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [fe, X, q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", fe, Wn, Gt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: P()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          d,
          Br,
          Wr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: P()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, Br, Wr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": P()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: W()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: P()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [fe, Gt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": P()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": W()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": P()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, Br, Wr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": P()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [fe, X, q]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...oe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": oe()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [fe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": $()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": $()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": $()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": $()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": $()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": $()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": $()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": $()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": $()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": $()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": $()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": $()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": $()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": $()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [X, q]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": $()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": $()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [fe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": $()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": $()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": P()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: _()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Z()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: se()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", X, q]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          X,
          q
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: te()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [fe, X, q]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [fe, X, q]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          g,
          Br,
          Wr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": P()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", fe, X, q]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [fe, X, q]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", fe, X, q]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [fe, X, q]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", fe, X, q]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          X,
          q
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": te()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [fe, X, q]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [fe, X, q]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", fe, X, q]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [fe, X, q]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", fe, X, q]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [fe, X, q]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [fe, X, q]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", fe, X, q]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": k()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": k()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": k()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", X, q]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [fe, "initial", X, q]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, X, q]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [fe, X, q]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, X, q]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [p, X, q]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": C()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: J()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": J()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": J()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": J()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ie()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ie()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ie()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ie()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ce()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ce()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ce()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [X, q, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: C()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: me()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": me()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": me()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": me()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: P()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: P()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", X, q]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": k()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": k()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": k()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": k()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": k()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": k()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": k()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": k()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": k()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": k()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": k()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": k()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": k()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": k()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": k()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": k()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": k()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": k()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", X, q]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...P()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [fe, Wn, Gt, ya]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...P()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, lm = /* @__PURE__ */ v0(L0);
function le(...e) {
  return lm(Pi(e));
}
const $0 = Mn(
  "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-emerald-600 text-white [a]:hover:bg-emerald-600/80",
        warning: "bg-amber-500 text-white [a]:hover:bg-amber-500/80",
        info: "bg-sky-600 text-white [a]:hover:bg-sky-600/80",
        "success-light": "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
        "warning-light": "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
        "info-light": "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
        "destructive-light": "bg-destructive/10 text-destructive dark:bg-destructive/20",
        "success-outline": "border-border text-emerald-600 dark:text-emerald-400 [a]:hover:bg-emerald-500/10",
        "warning-outline": "border-border text-amber-600 dark:text-amber-400 [a]:hover:bg-amber-500/10",
        "info-outline": "border-border text-sky-600 dark:text-sky-400 [a]:hover:bg-sky-500/10",
        "destructive-outline": "border-border text-destructive [a]:hover:bg-destructive/10"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function xa({
  className: e,
  variant: t = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ m(
    n ? Di : "span",
    {
      "data-slot": "badge",
      "data-variant": t,
      className: le($0({ variant: t }), e),
      ...r
    }
  );
}
const z0 = Mn(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 active:not-aria-[haspopup]:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function We({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ m(
    r ? Di : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      className: le(z0({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function F1({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card",
      "data-size": t,
      className: le("ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col", e),
      ...n
    }
  );
}
function W1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card-header",
      className: le(
        "gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        e
      ),
      ...t
    }
  );
}
function B1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card-title",
      className: le("text-base leading-normal font-medium group-data-[size=sm]/card:text-sm cn-font-heading", e),
      ...t
    }
  );
}
function V1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card-description",
      className: le("text-muted-foreground text-sm", e),
      ...t
    }
  );
}
function H1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card-action",
      className: le(
        "cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        e
      ),
      ...t
    }
  );
}
function Y1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card-content",
      className: le("px-6 group-data-[size=sm]/card:px-4", e),
      ...t
    }
  );
}
function U1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "card-footer",
      className: le("rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center", e),
      ...t
    }
  );
}
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F0 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), cm = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var W0 = {
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
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B0 = Ql(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, l) => Ga(
    "svg",
    {
      ref: l,
      ...W0,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: cm("lucide", o),
      ...i
    },
    [
      ...s.map(([u, d]) => Ga(u, d)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = (e, t) => {
  const n = Ql(
    ({ className: r, ...o }, a) => Ga(B0, {
      ref: a,
      iconNode: t,
      className: cm(`lucide-${F0(e)}`, r),
      ...o
    })
  );
  return n.displayName = `${e}`, n;
};
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V0 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], dl = ye("ArrowDown", V0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H0 = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
], Y0 = ye("ArrowLeftToLine", H0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U0 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], G0 = ye("ArrowLeft", U0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j0 = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], K0 = ye("ArrowRightToLine", j0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q0 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], X0 = ye("ArrowRight", q0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z0 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], fl = ye("ArrowUp", Z0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q0 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], J0 = ye("Calendar", Q0);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eS = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], vt = ye("Check", eS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tS = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], hs = ye("ChevronDown", tS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nS = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], um = ye("ChevronLeft", nS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rS = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], ps = ye("ChevronRight", rS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oS = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], aS = ye("ChevronUp", oS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iS = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], sS = ye("ChevronsLeft", iS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lS = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], cS = ye("ChevronsRight", lS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uS = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], dS = ye("ChevronsUpDown", uS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fS = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], dm = ye("CirclePlus", fS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mS = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], gs = ye("CircleX", mS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hS = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], pS = ye("LoaderCircle", hS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gS = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89", key: "znwnzq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
      key: "c9qhm2"
    }
  ]
], vS = ye("PinOff", gS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bS = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], wS = ye("Search", bS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yS = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], fm = ye("Settings2", yS);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xS = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], vs = ye("X", xS);
function G1({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Gc,
    {
      "data-slot": "checkbox",
      className: le(
        "border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border shadow-xs transition-shadow group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t,
      children: /* @__PURE__ */ m(
        Kc,
        {
          "data-slot": "checkbox-indicator",
          className: "[&>svg]:size-3.5 grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ m(vt, {})
        }
      )
    }
  );
}
function _t(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function ml(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function mm(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = ml(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : ml(e[o], null);
        }
      };
  };
}
function rn(...e) {
  return c.useCallback(mm(...e), e);
}
function SS(e, t) {
  const n = c.createContext(t), r = (a) => {
    const { children: s, ...i } = a, l = c.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ m(n.Provider, { value: l, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = c.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function CS(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = c.createContext(s), l = n.length;
    n = [...n, s];
    const u = (f) => {
      var w;
      const { scope: h, children: g, ...v } = f, p = ((w = h == null ? void 0 : h[e]) == null ? void 0 : w[l]) || i, b = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ m(p.Provider, { value: b, children: g });
    };
    u.displayName = a + "Provider";
    function d(f, h) {
      var p;
      const g = ((p = h == null ? void 0 : h[e]) == null ? void 0 : p[l]) || i, v = c.useContext(g);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [u, d];
  }
  const o = () => {
    const a = n.map((s) => c.createContext(s));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, ES(o, ...t)];
}
function ES(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: l, scopeName: u }) => {
        const f = l(a)[`__scope${u}`];
        return { ...i, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var rr = globalThis != null && globalThis.document ? c.useLayoutEffect : () => {
}, kS = c[" useId ".trim().toString()] || (() => {
}), RS = 0;
function Sa(e) {
  const [t, n] = c.useState(kS());
  return rr(() => {
    n((r) => r ?? String(RS++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var MS = c[" useInsertionEffect ".trim().toString()] || rr;
function NS({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = PS({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const d = c.useRef(e !== void 0);
    c.useEffect(() => {
      const f = d.current;
      f !== i && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const u = c.useCallback(
    (d) => {
      var f;
      if (i) {
        const h = DS(d) ? d(e) : d;
        h !== e && ((f = s.current) == null || f.call(s, h));
      } else
        a(d);
    },
    [i, e, a, s]
  );
  return [l, u];
}
function PS({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = c.useState(e), o = c.useRef(n), a = c.useRef(t);
  return MS(() => {
    a.current = t;
  }, [t]), c.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function DS(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function hm(e) {
  const t = /* @__PURE__ */ TS(e), n = c.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = c.Children.toArray(a), l = i.find(_S);
    if (l) {
      const u = l.props.children, d = i.map((f) => f === l ? c.Children.count(u) > 1 ? c.Children.only(null) : c.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: c.isValidElement(u) ? c.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function TS(e) {
  const t = c.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (c.isValidElement(o)) {
      const s = IS(o), i = AS(a, o.props);
      return o.type !== c.Fragment && (i.ref = r ? mm(r, s) : s), c.cloneElement(o, i);
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var OS = Symbol("radix.slottable");
function _S(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === OS;
}
function AS(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const l = a(...i);
      return o(...i), l;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function IS(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var LS = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Ct = LS.reduce((e, t) => {
  const n = /* @__PURE__ */ hm(`Primitive.${t}`), r = c.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(l, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function $S(e, t) {
  e && lr.flushSync(() => e.dispatchEvent(t));
}
function or(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function zS(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = or(e);
  c.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var FS = "DismissableLayer", pi = "dismissableLayer.update", WS = "dismissableLayer.pointerDownOutside", BS = "dismissableLayer.focusOutside", hl, pm = c.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), gm = c.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...l
    } = e, u = c.useContext(pm), [d, f] = c.useState(null), h = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, g] = c.useState({}), v = rn(t, (E) => f(E)), p = Array.from(u.layers), [b] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), w = p.indexOf(b), x = d ? p.indexOf(d) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, S = x >= w, C = YS((E) => {
      const k = E.target, M = [...u.branches].some((T) => T.contains(k));
      !S || M || (o == null || o(E), s == null || s(E), E.defaultPrevented || i == null || i());
    }, h), R = US((E) => {
      const k = E.target;
      [...u.branches].some((T) => T.contains(k)) || (a == null || a(E), s == null || s(E), E.defaultPrevented || i == null || i());
    }, h);
    return zS((E) => {
      x === u.layers.size - 1 && (r == null || r(E), !E.defaultPrevented && i && (E.preventDefault(), i()));
    }, h), c.useEffect(() => {
      if (d)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (hl = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), pl(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = hl);
        };
    }, [d, h, n, u]), c.useEffect(() => () => {
      d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), pl());
    }, [d, u]), c.useEffect(() => {
      const E = () => g({});
      return document.addEventListener(pi, E), () => document.removeEventListener(pi, E);
    }, []), /* @__PURE__ */ m(
      Ct.div,
      {
        ...l,
        ref: v,
        style: {
          pointerEvents: y ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: _t(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: _t(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: _t(
          e.onPointerDownCapture,
          C.onPointerDownCapture
        )
      }
    );
  }
);
gm.displayName = FS;
var VS = "DismissableLayerBranch", HS = c.forwardRef((e, t) => {
  const n = c.useContext(pm), r = c.useRef(null), o = rn(t, r);
  return c.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ m(Ct.div, { ...e, ref: o });
});
HS.displayName = VS;
function YS(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = or(e), r = c.useRef(!1), o = c.useRef(() => {
  });
  return c.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          vm(
            WS,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function US(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = or(e), r = c.useRef(!1);
  return c.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && vm(BS, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function pl() {
  const e = new CustomEvent(pi);
  document.dispatchEvent(e);
}
function vm(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? $S(o, a) : o.dispatchEvent(a);
}
var Ca = "focusScope.autoFocusOnMount", Ea = "focusScope.autoFocusOnUnmount", gl = { bubbles: !1, cancelable: !0 }, GS = "FocusScope", bm = c.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, l] = c.useState(null), u = or(o), d = or(a), f = c.useRef(null), h = rn(t, (p) => l(p)), g = c.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  c.useEffect(() => {
    if (r) {
      let p = function(y) {
        if (g.paused || !i) return;
        const S = y.target;
        i.contains(S) ? f.current = S : Tt(f.current, { select: !0 });
      }, b = function(y) {
        if (g.paused || !i) return;
        const S = y.relatedTarget;
        S !== null && (i.contains(S) || Tt(f.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const C of y)
            C.removedNodes.length > 0 && Tt(i);
      };
      document.addEventListener("focusin", p), document.addEventListener("focusout", b);
      const x = new MutationObserver(w);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", p), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, g.paused]), c.useEffect(() => {
    if (i) {
      bl.add(g);
      const p = document.activeElement;
      if (!i.contains(p)) {
        const w = new CustomEvent(Ca, gl);
        i.addEventListener(Ca, u), i.dispatchEvent(w), w.defaultPrevented || (jS(QS(wm(i)), { select: !0 }), document.activeElement === p && Tt(i));
      }
      return () => {
        i.removeEventListener(Ca, u), setTimeout(() => {
          const w = new CustomEvent(Ea, gl);
          i.addEventListener(Ea, d), i.dispatchEvent(w), w.defaultPrevented || Tt(p ?? document.body, { select: !0 }), i.removeEventListener(Ea, d), bl.remove(g);
        }, 0);
      };
    }
  }, [i, u, d, g]);
  const v = c.useCallback(
    (p) => {
      if (!n && !r || g.paused) return;
      const b = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, w = document.activeElement;
      if (b && w) {
        const x = p.currentTarget, [y, S] = KS(x);
        y && S ? !p.shiftKey && w === S ? (p.preventDefault(), n && Tt(y, { select: !0 })) : p.shiftKey && w === y && (p.preventDefault(), n && Tt(S, { select: !0 })) : w === x && p.preventDefault();
      }
    },
    [n, r, g.paused]
  );
  return /* @__PURE__ */ m(Ct.div, { tabIndex: -1, ...s, ref: h, onKeyDown: v });
});
bm.displayName = GS;
function jS(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Tt(r, { select: t }), document.activeElement !== n) return;
}
function KS(e) {
  const t = wm(e), n = vl(t, e), r = vl(t.reverse(), e);
  return [n, r];
}
function wm(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function vl(e, t) {
  for (const n of e)
    if (!qS(n, { upTo: t })) return n;
}
function qS(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function XS(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Tt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && XS(e) && t && e.select();
  }
}
var bl = ZS();
function ZS() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = wl(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = wl(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function wl(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function QS(e) {
  return e.filter((t) => t.tagName !== "A");
}
var JS = "Portal", ym = c.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = c.useState(!1);
  rr(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? nc.createPortal(/* @__PURE__ */ m(Ct.div, { ...r, ref: t }), s) : null;
});
ym.displayName = JS;
function eC(e, t) {
  return c.useReducer((n, r) => t[n][r] ?? n, e);
}
var Go = (e) => {
  const { present: t, children: n } = e, r = tC(t), o = typeof n == "function" ? n({ present: r.isPresent }) : c.Children.only(n), a = rn(r.ref, nC(o));
  return typeof n == "function" || r.isPresent ? c.cloneElement(o, { ref: a }) : null;
};
Go.displayName = "Presence";
function tC(e) {
  const [t, n] = c.useState(), r = c.useRef(null), o = c.useRef(e), a = c.useRef("none"), s = e ? "mounted" : "unmounted", [i, l] = eC(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return c.useEffect(() => {
    const u = Vr(r.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), rr(() => {
    const u = r.current, d = o.current;
    if (d !== e) {
      const h = a.current, g = Vr(u);
      e ? l("MOUNT") : g === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(d && h !== g ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), rr(() => {
    if (t) {
      let u;
      const d = t.ownerDocument.defaultView ?? window, f = (g) => {
        const p = Vr(r.current).includes(CSS.escape(g.animationName));
        if (g.target === t && p && (l("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, h = (g) => {
        g.target === t && (a.current = Vr(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: c.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Vr(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function nC(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ka = 0;
function rC() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? yl()), document.body.insertAdjacentElement("beforeend", e[1] ?? yl()), ka++, () => {
      ka === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ka--;
    };
  }, []);
}
function yl() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var at = function() {
  return at = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, at.apply(this, arguments);
};
function xm(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function oC(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var to = "right-scroll-bar-position", no = "width-before-scroll-bar", aC = "with-scroll-bars-hidden", iC = "--removed-body-scroll-bar-size";
function Ra(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function sC(e, t) {
  var n = At(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var lC = typeof window < "u" ? c.useLayoutEffect : c.useEffect, xl = /* @__PURE__ */ new WeakMap();
function cC(e, t) {
  var n = sC(null, function(r) {
    return e.forEach(function(o) {
      return Ra(o, r);
    });
  });
  return lC(function() {
    var r = xl.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Ra(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Ra(i, s);
      });
    }
    xl.set(n, e);
  }, [e]), n;
}
function uC(e) {
  return e;
}
function dC(e, t) {
  t === void 0 && (t = uC);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var s = t(a, r);
      return n.push(s), function() {
        n = n.filter(function(i) {
          return i !== s;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(a);
      }
      n = {
        push: function(i) {
          return a(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var s = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(a), s = n;
      }
      var l = function() {
        var d = s;
        s = [], d.forEach(a);
      }, u = function() {
        return Promise.resolve().then(l);
      };
      u(), n = {
        push: function(d) {
          s.push(d), u();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return o;
}
function fC(e) {
  e === void 0 && (e = {});
  var t = dC(null);
  return t.options = at({ async: !0, ssr: !1 }, e), t;
}
var Sm = function(e) {
  var t = e.sideCar, n = xm(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return c.createElement(r, at({}, n));
};
Sm.isSideCarExport = !0;
function mC(e, t) {
  return e.useMedium(t), Sm;
}
var Cm = fC(), Ma = function() {
}, jo = c.forwardRef(function(e, t) {
  var n = c.useRef(null), r = c.useState({
    onScrollCapture: Ma,
    onWheelCapture: Ma,
    onTouchMoveCapture: Ma
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, h = e.sideCar, g = e.noRelative, v = e.noIsolation, p = e.inert, b = e.allowPinchZoom, w = e.as, x = w === void 0 ? "div" : w, y = e.gapMode, S = xm(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), C = h, R = cC([n, t]), E = at(at({}, S), o);
  return c.createElement(
    c.Fragment,
    null,
    d && c.createElement(C, { sideCar: Cm, removeScrollBar: u, shards: f, noRelative: g, noIsolation: v, inert: p, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    s ? c.cloneElement(c.Children.only(i), at(at({}, E), { ref: R })) : c.createElement(x, at({}, E, { className: l, ref: R }), i)
  );
});
jo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
jo.classNames = {
  fullWidth: no,
  zeroRight: to
};
var hC = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function pC() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = hC();
  return t && e.setAttribute("nonce", t), e;
}
function gC(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function vC(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var bC = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = pC()) && (gC(t, n), vC(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, wC = function() {
  var e = bC();
  return function(t, n) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Em = function() {
  var e = wC(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, yC = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Na = function(e) {
  return parseInt(e || "", 10) || 0;
}, xC = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Na(n), Na(r), Na(o)];
}, SC = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return yC;
  var t = xC(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, CC = Em(), xn = "data-scroll-locked", EC = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(aC, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(xn, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(to, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(no, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(to, " .").concat(to, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(no, " .").concat(no, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(xn, `] {
    `).concat(iC, ": ").concat(i, `px;
  }
`);
}, Sl = function() {
  var e = parseInt(document.body.getAttribute(xn) || "0", 10);
  return isFinite(e) ? e : 0;
}, kC = function() {
  c.useEffect(function() {
    return document.body.setAttribute(xn, (Sl() + 1).toString()), function() {
      var e = Sl() - 1;
      e <= 0 ? document.body.removeAttribute(xn) : document.body.setAttribute(xn, e.toString());
    };
  }, []);
}, RC = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  kC();
  var a = c.useMemo(function() {
    return SC(o);
  }, [o]);
  return c.createElement(CC, { styles: EC(a, !t, o, n ? "" : "!important") });
}, gi = !1;
if (typeof window < "u")
  try {
    var Hr = Object.defineProperty({}, "passive", {
      get: function() {
        return gi = !0, !0;
      }
    });
    window.addEventListener("test", Hr, Hr), window.removeEventListener("test", Hr, Hr);
  } catch {
    gi = !1;
  }
var fn = gi ? { passive: !1 } : !1, MC = function(e) {
  return e.tagName === "TEXTAREA";
}, km = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !MC(e) && n[t] === "visible")
  );
}, NC = function(e) {
  return km(e, "overflowY");
}, PC = function(e) {
  return km(e, "overflowX");
}, Cl = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Rm(e, r);
    if (o) {
      var a = Mm(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, DC = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, TC = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Rm = function(e, t) {
  return e === "v" ? NC(t) : PC(t);
}, Mm = function(e, t) {
  return e === "v" ? DC(t) : TC(t);
}, OC = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, _C = function(e, t, n, r, o) {
  var a = OC(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, l = t.contains(i), u = !1, d = s > 0, f = 0, h = 0;
  do {
    if (!i)
      break;
    var g = Mm(e, i), v = g[0], p = g[1], b = g[2], w = p - b - a * v;
    (v || w) && Rm(e, i) && (f += w, h += v);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (d && Math.abs(f) < 1 || !d && Math.abs(h) < 1) && (u = !0), u;
}, Yr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, El = function(e) {
  return [e.deltaX, e.deltaY];
}, kl = function(e) {
  return e && "current" in e ? e.current : e;
}, AC = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, IC = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, LC = 0, mn = [];
function $C(e) {
  var t = c.useRef([]), n = c.useRef([0, 0]), r = c.useRef(), o = c.useState(LC++)[0], a = c.useState(Em)[0], s = c.useRef(e);
  c.useEffect(function() {
    s.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var p = oC([e.lockRef.current], (e.shards || []).map(kl), !0).filter(Boolean);
      return p.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), p.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = c.useCallback(function(p, b) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !s.current.allowPinchZoom;
    var w = Yr(p), x = n.current, y = "deltaX" in p ? p.deltaX : x[0] - w[0], S = "deltaY" in p ? p.deltaY : x[1] - w[1], C, R = p.target, E = Math.abs(y) > Math.abs(S) ? "h" : "v";
    if ("touches" in p && E === "h" && R.type === "range")
      return !1;
    var k = window.getSelection(), M = k && k.anchorNode, T = M ? M === R || M.contains(R) : !1;
    if (T)
      return !1;
    var O = Cl(E, R);
    if (!O)
      return !0;
    if (O ? C = E : (C = E === "v" ? "h" : "v", O = Cl(E, R)), !O)
      return !1;
    if (!r.current && "changedTouches" in p && (y || S) && (r.current = C), !C)
      return !0;
    var L = r.current || C;
    return _C(L, b, p, L === "h" ? y : S);
  }, []), l = c.useCallback(function(p) {
    var b = p;
    if (!(!mn.length || mn[mn.length - 1] !== a)) {
      var w = "deltaY" in b ? El(b) : Yr(b), x = t.current.filter(function(C) {
        return C.name === b.type && (C.target === b.target || b.target === C.shadowParent) && AC(C.delta, w);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var y = (s.current.shards || []).map(kl).filter(Boolean).filter(function(C) {
          return C.contains(b.target);
        }), S = y.length > 0 ? i(b, y[0]) : !s.current.noIsolation;
        S && b.cancelable && b.preventDefault();
      }
    }
  }, []), u = c.useCallback(function(p, b, w, x) {
    var y = { name: p, delta: b, target: w, should: x, shadowParent: zC(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== y;
      });
    }, 1);
  }, []), d = c.useCallback(function(p) {
    n.current = Yr(p), r.current = void 0;
  }, []), f = c.useCallback(function(p) {
    u(p.type, El(p), p.target, i(p, e.lockRef.current));
  }, []), h = c.useCallback(function(p) {
    u(p.type, Yr(p), p.target, i(p, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return mn.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, fn), document.addEventListener("touchmove", l, fn), document.addEventListener("touchstart", d, fn), function() {
      mn = mn.filter(function(p) {
        return p !== a;
      }), document.removeEventListener("wheel", l, fn), document.removeEventListener("touchmove", l, fn), document.removeEventListener("touchstart", d, fn);
    };
  }, []);
  var g = e.removeScrollBar, v = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    v ? c.createElement(a, { styles: IC(o) }) : null,
    g ? c.createElement(RC, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function zC(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const FC = mC(Cm, $C);
var Nm = c.forwardRef(function(e, t) {
  return c.createElement(jo, at({}, e, { ref: t, sideCar: FC }));
});
Nm.classNames = jo.classNames;
var WC = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, hn = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), Gr = {}, Pa = 0, Pm = function(e) {
  return e && (e.host || Pm(e.parentNode));
}, BC = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Pm(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, VC = function(e, t, n, r) {
  var o = BC(t, Array.isArray(e) ? e : [e]);
  Gr[n] || (Gr[n] = /* @__PURE__ */ new WeakMap());
  var a = Gr[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(f) {
    !f || i.has(f) || (i.add(f), u(f.parentNode));
  };
  o.forEach(u);
  var d = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(h) {
      if (i.has(h))
        d(h);
      else
        try {
          var g = h.getAttribute(r), v = g !== null && g !== "false", p = (hn.get(h) || 0) + 1, b = (a.get(h) || 0) + 1;
          hn.set(h, p), a.set(h, b), s.push(h), p === 1 && v && Ur.set(h, !0), b === 1 && h.setAttribute(n, "true"), v || h.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", h, w);
        }
    });
  };
  return d(t), i.clear(), Pa++, function() {
    s.forEach(function(f) {
      var h = hn.get(f) - 1, g = a.get(f) - 1;
      hn.set(f, h), a.set(f, g), h || (Ur.has(f) || f.removeAttribute(r), Ur.delete(f)), g || f.removeAttribute(n);
    }), Pa--, Pa || (hn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), Gr = {});
  };
}, HC = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = WC(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), VC(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Ko = "Dialog", [Dm, j1] = CS(Ko), [YC, Je] = Dm(Ko), Tm = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = c.useRef(null), l = c.useRef(null), [u, d] = NS({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Ko
  });
  return /* @__PURE__ */ m(
    YC,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Sa(),
      titleId: Sa(),
      descriptionId: Sa(),
      open: u,
      onOpenChange: d,
      onOpenToggle: c.useCallback(() => d((f) => !f), [d]),
      modal: s,
      children: n
    }
  );
};
Tm.displayName = Ko;
var Om = "DialogTrigger", _m = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Je(Om, n), a = rn(t, o.triggerRef);
    return /* @__PURE__ */ m(
      Ct.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": ys(o.open),
        ...r,
        ref: a,
        onClick: _t(e.onClick, o.onOpenToggle)
      }
    );
  }
);
_m.displayName = Om;
var bs = "DialogPortal", [UC, Am] = Dm(bs, {
  forceMount: void 0
}), Im = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Je(bs, t);
  return /* @__PURE__ */ m(UC, { scope: t, forceMount: n, children: c.Children.map(r, (s) => /* @__PURE__ */ m(Go, { present: n || a.open, children: /* @__PURE__ */ m(ym, { asChild: !0, container: o, children: s }) })) });
};
Im.displayName = bs;
var po = "DialogOverlay", Lm = c.forwardRef(
  (e, t) => {
    const n = Am(po, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Je(po, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ m(Go, { present: r || a.open, children: /* @__PURE__ */ m(jC, { ...o, ref: t }) }) : null;
  }
);
Lm.displayName = po;
var GC = /* @__PURE__ */ hm("DialogOverlay.RemoveScroll"), jC = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Je(po, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ m(Nm, { as: GC, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ m(
        Ct.div,
        {
          "data-state": ys(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), en = "DialogContent", $m = c.forwardRef(
  (e, t) => {
    const n = Am(en, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Je(en, e.__scopeDialog);
    return /* @__PURE__ */ m(Go, { present: r || a.open, children: a.modal ? /* @__PURE__ */ m(KC, { ...o, ref: t }) : /* @__PURE__ */ m(qC, { ...o, ref: t }) });
  }
);
$m.displayName = en;
var KC = c.forwardRef(
  (e, t) => {
    const n = Je(en, e.__scopeDialog), r = c.useRef(null), o = rn(t, n.contentRef, r);
    return c.useEffect(() => {
      const a = r.current;
      if (a) return HC(a);
    }, []), /* @__PURE__ */ m(
      zm,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: _t(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: _t(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: _t(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), qC = c.forwardRef(
  (e, t) => {
    const n = Je(en, e.__scopeDialog), r = c.useRef(!1), o = c.useRef(!1);
    return /* @__PURE__ */ m(
      zm,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var l, u;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), zm = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Je(en, n), l = c.useRef(null), u = rn(t, l);
    return rC(), /* @__PURE__ */ I(Ee, { children: [
      /* @__PURE__ */ m(
        bm,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ m(
            gm,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": ys(i.open),
              ...s,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ I(Ee, { children: [
        /* @__PURE__ */ m(XC, { titleId: i.titleId }),
        /* @__PURE__ */ m(QC, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), ws = "DialogTitle", Fm = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Je(ws, n);
    return /* @__PURE__ */ m(Ct.h2, { id: o.titleId, ...r, ref: t });
  }
);
Fm.displayName = ws;
var Wm = "DialogDescription", Bm = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Je(Wm, n);
    return /* @__PURE__ */ m(Ct.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Bm.displayName = Wm;
var Vm = "DialogClose", Hm = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Je(Vm, n);
    return /* @__PURE__ */ m(
      Ct.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: _t(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Hm.displayName = Vm;
function ys(e) {
  return e ? "open" : "closed";
}
var Ym = "DialogTitleWarning", [K1, Um] = SS(Ym, {
  contentName: en,
  titleName: ws,
  docsSlug: "dialog"
}), XC = ({ titleId: e }) => {
  const t = Um(Ym), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return c.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, ZC = "DialogDescriptionWarning", QC = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Um(ZC).contentName}}.`;
  return c.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, JC = Tm, eE = _m, tE = Im, nE = Lm, rE = $m, oE = Fm, aE = Bm, iE = Hm;
function sE(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const Gm = N.createContext({
  drawerRef: {
    current: null
  },
  overlayRef: {
    current: null
  },
  onPress: () => {
  },
  onRelease: () => {
  },
  onDrag: () => {
  },
  onNestedDrag: () => {
  },
  onNestedOpenChange: () => {
  },
  onNestedRelease: () => {
  },
  openProp: void 0,
  dismissible: !1,
  isOpen: !1,
  isDragging: !1,
  keyboardIsOpen: {
    current: !1
  },
  snapPointsOffset: null,
  snapPoints: null,
  handleOnly: !1,
  modal: !1,
  shouldFade: !1,
  activeSnapPoint: null,
  onOpenChange: () => {
  },
  setActiveSnapPoint: () => {
  },
  closeDrawer: () => {
  },
  direction: "bottom",
  shouldAnimate: {
    current: !0
  },
  shouldScaleBackground: !1,
  setBackgroundColorOnScale: !0,
  noBodyStyles: !1,
  container: null,
  autoFocus: !1
}), xr = () => {
  const e = N.useContext(Gm);
  if (!e)
    throw new Error("useDrawerContext must be used within a Drawer.Root");
  return e;
};
sE(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);
function lE() {
  const e = navigator.userAgent;
  return typeof window < "u" && (/Firefox/.test(e) && /Mobile/.test(e) || // Android Firefox
  /FxiOS/.test(e));
}
function cE() {
  return xs(/^Mac/);
}
function uE() {
  return xs(/^iPhone/);
}
function Rl() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function dE() {
  return xs(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  cE() && navigator.maxTouchPoints > 1;
}
function jm() {
  return uE() || dE();
}
function xs(e) {
  return typeof window < "u" && window.navigator != null ? e.test(window.navigator.platform) : void 0;
}
const fE = 24, mE = typeof window < "u" ? Ni : sr;
function Ml(...e) {
  return (...t) => {
    for (let n of e)
      typeof n == "function" && n(...t);
  };
}
const Da = typeof document < "u" && window.visualViewport;
function Nl(e) {
  let t = window.getComputedStyle(e);
  return /(auto|scroll)/.test(t.overflow + t.overflowX + t.overflowY);
}
function Km(e) {
  for (Nl(e) && (e = e.parentElement); e && !Nl(e); )
    e = e.parentElement;
  return e || document.scrollingElement || document.documentElement;
}
const hE = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
let jr = 0, Ta;
function pE(e = {}) {
  let { isDisabled: t } = e;
  mE(() => {
    if (!t)
      return jr++, jr === 1 && jm() && (Ta = gE()), () => {
        jr--, jr === 0 && (Ta == null || Ta());
      };
  }, [
    t
  ]);
}
function gE() {
  let e, t = 0, n = (f) => {
    e = Km(f.target), !(e === document.documentElement && e === document.body) && (t = f.changedTouches[0].pageY);
  }, r = (f) => {
    if (!e || e === document.documentElement || e === document.body) {
      f.preventDefault();
      return;
    }
    let h = f.changedTouches[0].pageY, g = e.scrollTop, v = e.scrollHeight - e.clientHeight;
    v !== 0 && ((g <= 0 && h > t || g >= v && h < t) && f.preventDefault(), t = h);
  }, o = (f) => {
    let h = f.target;
    vi(h) && h !== document.activeElement && (f.preventDefault(), h.style.transform = "translateY(-2000px)", h.focus(), requestAnimationFrame(() => {
      h.style.transform = "";
    }));
  }, a = (f) => {
    let h = f.target;
    vi(h) && (h.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
      h.style.transform = "", Da && (Da.height < window.innerHeight ? requestAnimationFrame(() => {
        Pl(h);
      }) : Da.addEventListener("resize", () => Pl(h), {
        once: !0
      }));
    }));
  }, s = () => {
    window.scrollTo(0, 0);
  }, i = window.pageXOffset, l = window.pageYOffset, u = Ml(vE(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
  window.scrollTo(0, 0);
  let d = Ml(Bn(document, "touchstart", n, {
    passive: !1,
    capture: !0
  }), Bn(document, "touchmove", r, {
    passive: !1,
    capture: !0
  }), Bn(document, "touchend", o, {
    passive: !1,
    capture: !0
  }), Bn(document, "focus", a, !0), Bn(window, "scroll", s));
  return () => {
    u(), d(), window.scrollTo(i, l);
  };
}
function vE(e, t, n) {
  let r = e.style[t];
  return e.style[t] = n, () => {
    e.style[t] = r;
  };
}
function Bn(e, t, n, r) {
  return e.addEventListener(t, n, r), () => {
    e.removeEventListener(t, n, r);
  };
}
function Pl(e) {
  let t = document.scrollingElement || document.documentElement;
  for (; e && e !== t; ) {
    let n = Km(e);
    if (n !== document.documentElement && n !== document.body && n !== e) {
      let r = n.getBoundingClientRect().top, o = e.getBoundingClientRect().top, a = e.getBoundingClientRect().bottom;
      const s = n.getBoundingClientRect().bottom + fE;
      a > s && (n.scrollTop += o - r);
    }
    e = n.parentElement;
  }
}
function vi(e) {
  return e instanceof HTMLInputElement && !hE.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
function bE(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function wE(...e) {
  return (t) => e.forEach((n) => bE(n, t));
}
function qm(...e) {
  return c.useCallback(wE(...e), e);
}
const Xm = /* @__PURE__ */ new WeakMap();
function Pe(e, t, n = !1) {
  if (!e || !(e instanceof HTMLElement)) return;
  let r = {};
  Object.entries(t).forEach(([o, a]) => {
    if (o.startsWith("--")) {
      e.style.setProperty(o, a);
      return;
    }
    r[o] = e.style[o], e.style[o] = a;
  }), !n && Xm.set(e, r);
}
function yE(e, t) {
  if (!e || !(e instanceof HTMLElement)) return;
  let n = Xm.get(e);
  n && (e.style[t] = n[t]);
}
const Se = (e) => {
  switch (e) {
    case "top":
    case "bottom":
      return !0;
    case "left":
    case "right":
      return !1;
    default:
      return e;
  }
};
function Kr(e, t) {
  if (!e)
    return null;
  const n = window.getComputedStyle(e), r = (
    // @ts-ignore
    n.transform || n.webkitTransform || n.mozTransform
  );
  let o = r.match(/^matrix3d\((.+)\)$/);
  return o ? parseFloat(o[1].split(", ")[Se(t) ? 13 : 12]) : (o = r.match(/^matrix\((.+)\)$/), o ? parseFloat(o[1].split(", ")[Se(t) ? 5 : 4]) : null);
}
function xE(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function Oa(e, t) {
  if (!e) return () => {
  };
  const n = e.style.cssText;
  return Object.assign(e.style, t), () => {
    e.style.cssText = n;
  };
}
function SE(...e) {
  return (...t) => {
    for (const n of e)
      typeof n == "function" && n(...t);
  };
}
const be = {
  DURATION: 0.5,
  EASE: [
    0.32,
    0.72,
    0,
    1
  ]
}, Zm = 0.4, CE = 0.25, EE = 100, Qm = 8, jt = 16, bi = 26, _a = "vaul-dragging";
function Jm(e) {
  const t = N.useRef(e);
  return N.useEffect(() => {
    t.current = e;
  }), N.useMemo(() => (...n) => t.current == null ? void 0 : t.current.call(t, ...n), []);
}
function kE({ defaultProp: e, onChange: t }) {
  const n = N.useState(e), [r] = n, o = N.useRef(r), a = Jm(t);
  return N.useEffect(() => {
    o.current !== r && (a(r), o.current = r);
  }, [
    r,
    o,
    a
  ]), n;
}
function eh({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [r, o] = kE({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, s = a ? e : r, i = Jm(n), l = N.useCallback((u) => {
    if (a) {
      const f = typeof u == "function" ? u(e) : u;
      f !== e && i(f);
    } else
      o(u);
  }, [
    a,
    e,
    o,
    i
  ]);
  return [
    s,
    l
  ];
}
function RE({ activeSnapPointProp: e, setActiveSnapPointProp: t, snapPoints: n, drawerRef: r, overlayRef: o, fadeFromIndex: a, onSnapPointChange: s, direction: i = "bottom", container: l, snapToSequentialPoint: u }) {
  const [d, f] = eh({
    prop: e,
    defaultProp: n == null ? void 0 : n[0],
    onChange: t
  }), [h, g] = N.useState(typeof window < "u" ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0);
  N.useEffect(() => {
    function E() {
      g({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      });
    }
    return window.addEventListener("resize", E), () => window.removeEventListener("resize", E);
  }, []);
  const v = N.useMemo(() => d === (n == null ? void 0 : n[n.length - 1]) || null, [
    n,
    d
  ]), p = N.useMemo(() => {
    var E;
    return (E = n == null ? void 0 : n.findIndex((k) => k === d)) != null ? E : null;
  }, [
    n,
    d
  ]), b = n && n.length > 0 && (a || a === 0) && !Number.isNaN(a) && n[a] === d || !n, w = N.useMemo(() => {
    const E = l ? {
      width: l.getBoundingClientRect().width,
      height: l.getBoundingClientRect().height
    } : typeof window < "u" ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: 0,
      height: 0
    };
    var k;
    return (k = n == null ? void 0 : n.map((M) => {
      const T = typeof M == "string";
      let O = 0;
      if (T && (O = parseInt(M, 10)), Se(i)) {
        const A = T ? O : h ? M * E.height : 0;
        return h ? i === "bottom" ? E.height - A : -E.height + A : A;
      }
      const L = T ? O : h ? M * E.width : 0;
      return h ? i === "right" ? E.width - L : -E.width + L : L;
    })) != null ? k : [];
  }, [
    n,
    h,
    l
  ]), x = N.useMemo(() => p !== null ? w == null ? void 0 : w[p] : null, [
    w,
    p
  ]), y = N.useCallback((E) => {
    var k;
    const M = (k = w == null ? void 0 : w.findIndex((T) => T === E)) != null ? k : null;
    s(M), Pe(r.current, {
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      transform: Se(i) ? `translate3d(0, ${E}px, 0)` : `translate3d(${E}px, 0, 0)`
    }), w && M !== w.length - 1 && a !== void 0 && M !== a && M < a ? Pe(o.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      opacity: "0"
    }) : Pe(o.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      opacity: "1"
    }), f(n == null ? void 0 : n[Math.max(M, 0)]);
  }, [
    r.current,
    n,
    w,
    a,
    o,
    f
  ]);
  N.useEffect(() => {
    if (d || e) {
      var E;
      const k = (E = n == null ? void 0 : n.findIndex((M) => M === e || M === d)) != null ? E : -1;
      w && k !== -1 && typeof w[k] == "number" && y(w[k]);
    }
  }, [
    d,
    e,
    n,
    w,
    y
  ]);
  function S({ draggedDistance: E, closeDrawer: k, velocity: M, dismissible: T }) {
    if (a === void 0) return;
    const O = i === "bottom" || i === "right" ? (x ?? 0) - E : (x ?? 0) + E, L = p === a - 1, A = p === 0, Y = E > 0;
    if (L && Pe(o.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`
    }), !u && M > 2 && !Y) {
      T ? k() : y(w[0]);
      return;
    }
    if (!u && M > 2 && Y && w && n) {
      y(w[n.length - 1]);
      return;
    }
    const j = w == null ? void 0 : w.reduce((G, P) => typeof G != "number" || typeof P != "number" ? G : Math.abs(P - O) < Math.abs(G - O) ? P : G), F = Se(i) ? window.innerHeight : window.innerWidth;
    if (M > Zm && Math.abs(E) < F * 0.4) {
      const G = Y ? 1 : -1;
      if (G > 0 && v && n) {
        y(w[n.length - 1]);
        return;
      }
      if (A && G < 0 && T && k(), p === null) return;
      y(w[p + G]);
      return;
    }
    y(j);
  }
  function C({ draggedDistance: E }) {
    if (x === null) return;
    const k = i === "bottom" || i === "right" ? x - E : x + E;
    (i === "bottom" || i === "right") && k < w[w.length - 1] || (i === "top" || i === "left") && k > w[w.length - 1] || Pe(r.current, {
      transform: Se(i) ? `translate3d(0, ${k}px, 0)` : `translate3d(${k}px, 0, 0)`
    });
  }
  function R(E, k) {
    if (!n || typeof p != "number" || !w || a === void 0) return null;
    const M = p === a - 1;
    if (p >= a && k)
      return 0;
    if (M && !k) return 1;
    if (!b && !M) return null;
    const O = M ? p + 1 : p - 1, L = M ? w[O] - w[O - 1] : w[O + 1] - w[O], A = E / Math.abs(L);
    return M ? 1 - A : A;
  }
  return {
    isLastSnapPoint: v,
    activeSnapPoint: d,
    shouldFade: b,
    getPercentageDragged: R,
    setActiveSnapPoint: f,
    activeSnapPointIndex: p,
    onRelease: S,
    onDrag: C,
    snapPointsOffset: w
  };
}
const ME = () => () => {
};
function NE() {
  const { direction: e, isOpen: t, shouldScaleBackground: n, setBackgroundColorOnScale: r, noBodyStyles: o } = xr(), a = N.useRef(null), s = qt(() => document.body.style.backgroundColor, []);
  function i() {
    return (window.innerWidth - bi) / window.innerWidth;
  }
  N.useEffect(() => {
    if (t && n) {
      a.current && clearTimeout(a.current);
      const l = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!l) return;
      SE(r && !o ? Oa(document.body, {
        background: "black"
      }) : ME, Oa(l, {
        transformOrigin: Se(e) ? "top" : "left",
        transitionProperty: "transform, border-radius",
        transitionDuration: `${be.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${be.EASE.join(",")})`
      }));
      const u = Oa(l, {
        borderRadius: `${Qm}px`,
        overflow: "hidden",
        ...Se(e) ? {
          transform: `scale(${i()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${i()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      return () => {
        u(), a.current = window.setTimeout(() => {
          s ? document.body.style.background = s : document.body.style.removeProperty("background");
        }, be.DURATION * 1e3);
      };
    }
  }, [
    t,
    n,
    s
  ]);
}
let Vn = null;
function PE({ isOpen: e, modal: t, nested: n, hasBeenOpened: r, preventScrollRestoration: o, noBodyStyles: a }) {
  const [s, i] = N.useState(() => typeof window < "u" ? window.location.href : ""), l = N.useRef(0), u = N.useCallback(() => {
    if (Rl() && Vn === null && e && !a) {
      Vn = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height,
        right: "unset"
      };
      const { scrollX: f, innerHeight: h } = window;
      document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
        top: `${-l.current}px`,
        left: `${-f}px`,
        right: "0px",
        height: "auto"
      }), window.setTimeout(() => window.requestAnimationFrame(() => {
        const g = h - window.innerHeight;
        g && l.current >= h && (document.body.style.top = `${-(l.current + g)}px`);
      }), 300);
    }
  }, [
    e
  ]), d = N.useCallback(() => {
    if (Rl() && Vn !== null && !a) {
      const f = -parseInt(document.body.style.top, 10), h = -parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, Vn), window.requestAnimationFrame(() => {
        if (o && s !== window.location.href) {
          i(window.location.href);
          return;
        }
        window.scrollTo(h, f);
      }), Vn = null;
    }
  }, [
    s
  ]);
  return N.useEffect(() => {
    function f() {
      l.current = window.scrollY;
    }
    return f(), window.addEventListener("scroll", f), () => {
      window.removeEventListener("scroll", f);
    };
  }, []), N.useEffect(() => {
    if (t)
      return () => {
        typeof document > "u" || document.querySelector("[data-vaul-drawer]") || d();
      };
  }, [
    t,
    d
  ]), N.useEffect(() => {
    n || !r || (e ? (!window.matchMedia("(display-mode: standalone)").matches && u(), t || window.setTimeout(() => {
      d();
    }, 500)) : d());
  }, [
    e,
    r,
    s,
    t,
    n,
    u,
    d
  ]), {
    restorePositionSetting: d
  };
}
function DE({ open: e, onOpenChange: t, children: n, onDrag: r, onRelease: o, snapPoints: a, shouldScaleBackground: s = !1, setBackgroundColorOnScale: i = !0, closeThreshold: l = CE, scrollLockTimeout: u = EE, dismissible: d = !0, handleOnly: f = !1, fadeFromIndex: h = a && a.length - 1, activeSnapPoint: g, setActiveSnapPoint: v, fixed: p, modal: b = !0, onClose: w, nested: x, noBodyStyles: y = !1, direction: S = "bottom", defaultOpen: C = !1, disablePreventScroll: R = !0, snapToSequentialPoint: E = !1, preventScrollRestoration: k = !1, repositionInputs: M = !0, onAnimationEnd: T, container: O, autoFocus: L = !1 }) {
  var A, Y;
  const [j = !1, F] = eh({
    defaultProp: C,
    prop: e,
    onChange: (H) => {
      t == null || t(H), !H && !x && ta(), setTimeout(() => {
        T == null || T(H);
      }, be.DURATION * 1e3), H && !b && typeof window < "u" && window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      }), H || (document.body.style.pointerEvents = "auto");
    }
  }), [G, P] = N.useState(!1), [_, Z] = N.useState(!1), [se, D] = N.useState(!1), B = N.useRef(null), W = N.useRef(null), U = N.useRef(null), oe = N.useRef(null), $ = N.useRef(null), te = N.useRef(!1), J = N.useRef(null), ie = N.useRef(0), ce = N.useRef(!1), me = N.useRef(!C), Oe = N.useRef(0), ne = N.useRef(null), et = N.useRef(((A = ne.current) == null ? void 0 : A.getBoundingClientRect().height) || 0), tt = N.useRef(((Y = ne.current) == null ? void 0 : Y.getBoundingClientRect().width) || 0), je = N.useRef(0), zn = N.useCallback((H) => {
    a && H === mt.length - 1 && (W.current = /* @__PURE__ */ new Date());
  }, []), { activeSnapPoint: kt, activeSnapPointIndex: Rt, setActiveSnapPoint: Rr, onRelease: Mr, snapPointsOffset: mt, onDrag: Fn, shouldFade: Nr, getPercentageDragged: ea } = RE({
    snapPoints: a,
    activeSnapPointProp: g,
    setActiveSnapPointProp: v,
    drawerRef: ne,
    fadeFromIndex: h,
    overlayRef: B,
    onSnapPointChange: zn,
    direction: S,
    container: O,
    snapToSequentialPoint: E
  });
  pE({
    isDisabled: !j || _ || !b || se || !G || !M || !R
  });
  const { restorePositionSetting: ta } = PE({
    isOpen: j,
    modal: b,
    nested: x ?? !1,
    hasBeenOpened: G,
    preventScrollRestoration: k,
    noBodyStyles: y
  });
  function an() {
    return (window.innerWidth - bi) / window.innerWidth;
  }
  function na(H) {
    var re, Q;
    !d && !a || ne.current && !ne.current.contains(H.target) || (et.current = ((re = ne.current) == null ? void 0 : re.getBoundingClientRect().height) || 0, tt.current = ((Q = ne.current) == null ? void 0 : Q.getBoundingClientRect().width) || 0, Z(!0), U.current = /* @__PURE__ */ new Date(), jm() && window.addEventListener("touchend", () => te.current = !1, {
      once: !0
    }), H.target.setPointerCapture(H.pointerId), ie.current = Se(S) ? H.pageY : H.pageX);
  }
  function Pr(H, re) {
    var Q;
    let ue = H;
    const he = (Q = window.getSelection()) == null ? void 0 : Q.toString(), Re = ne.current ? Kr(ne.current, S) : null, pe = /* @__PURE__ */ new Date();
    if (ue.tagName === "SELECT" || ue.hasAttribute("data-vaul-no-drag") || ue.closest("[data-vaul-no-drag]"))
      return !1;
    if (S === "right" || S === "left")
      return !0;
    if (W.current && pe.getTime() - W.current.getTime() < 500)
      return !1;
    if (Re !== null && (S === "bottom" ? Re > 0 : Re < 0))
      return !0;
    if (he && he.length > 0)
      return !1;
    if ($.current && pe.getTime() - $.current.getTime() < u && Re === 0 || re)
      return $.current = pe, !1;
    for (; ue; ) {
      if (ue.scrollHeight > ue.clientHeight) {
        if (ue.scrollTop !== 0)
          return $.current = /* @__PURE__ */ new Date(), !1;
        if (ue.getAttribute("role") === "dialog")
          return !0;
      }
      ue = ue.parentNode;
    }
    return !0;
  }
  function ra(H) {
    if (ne.current && _) {
      const re = S === "bottom" || S === "right" ? 1 : -1, Q = (ie.current - (Se(S) ? H.pageY : H.pageX)) * re, ue = Q > 0, he = a && !d && !ue;
      if (he && Rt === 0) return;
      const Re = Math.abs(Q), pe = document.querySelector("[data-vaul-drawer-wrapper]"), Me = S === "bottom" || S === "top" ? et.current : tt.current;
      let de = Re / Me;
      const ht = ea(Re, ue);
      if (ht !== null && (de = ht), he && de >= 1 || !te.current && !Pr(H.target, ue)) return;
      if (ne.current.classList.add(_a), te.current = !0, Pe(ne.current, {
        transition: "none"
      }), Pe(B.current, {
        transition: "none"
      }), a && Fn({
        draggedDistance: Q
      }), ue && !a) {
        const Ve = xE(Q), Mt = Math.min(Ve * -1, 0) * re;
        Pe(ne.current, {
          transform: Se(S) ? `translate3d(0, ${Mt}px, 0)` : `translate3d(${Mt}px, 0, 0)`
        });
        return;
      }
      const nt = 1 - de;
      if ((Nr || h && Rt === h - 1) && (r == null || r(H, de), Pe(B.current, {
        opacity: `${nt}`,
        transition: "none"
      }, !0)), pe && B.current && s) {
        const Ve = Math.min(an() + de * (1 - an()), 1), Mt = 8 - de * 8, sn = Math.max(0, 14 - de * 14);
        Pe(pe, {
          borderRadius: `${Mt}px`,
          transform: Se(S) ? `scale(${Ve}) translate3d(0, ${sn}px, 0)` : `scale(${Ve}) translate3d(${sn}px, 0, 0)`,
          transition: "none"
        }, !0);
      }
      if (!a) {
        const Ve = Re * re;
        Pe(ne.current, {
          transform: Se(S) ? `translate3d(0, ${Ve}px, 0)` : `translate3d(${Ve}px, 0, 0)`
        });
      }
    }
  }
  N.useEffect(() => {
    window.requestAnimationFrame(() => {
      me.current = !0;
    });
  }, []), N.useEffect(() => {
    var H;
    function re() {
      if (!ne.current || !M) return;
      const Q = document.activeElement;
      if (vi(Q) || ce.current) {
        var ue;
        const he = ((ue = window.visualViewport) == null ? void 0 : ue.height) || 0, Re = window.innerHeight;
        let pe = Re - he;
        const Me = ne.current.getBoundingClientRect().height || 0, de = Me > Re * 0.8;
        je.current || (je.current = Me);
        const ht = ne.current.getBoundingClientRect().top;
        if (Math.abs(Oe.current - pe) > 60 && (ce.current = !ce.current), a && a.length > 0 && mt && Rt) {
          const nt = mt[Rt] || 0;
          pe += nt;
        }
        if (Oe.current = pe, Me > he || ce.current) {
          const nt = ne.current.getBoundingClientRect().height;
          let Ve = nt;
          nt > he && (Ve = he - (de ? ht : bi)), p ? ne.current.style.height = `${nt - Math.max(pe, 0)}px` : ne.current.style.height = `${Math.max(Ve, he - ht)}px`;
        } else lE() || (ne.current.style.height = `${je.current}px`);
        a && a.length > 0 && !ce.current ? ne.current.style.bottom = "0px" : ne.current.style.bottom = `${Math.max(pe, 0)}px`;
      }
    }
    return (H = window.visualViewport) == null || H.addEventListener("resize", re), () => {
      var Q;
      return (Q = window.visualViewport) == null ? void 0 : Q.removeEventListener("resize", re);
    };
  }, [
    Rt,
    a,
    mt
  ]);
  function Ut(H) {
    oa(), w == null || w(), H || F(!1), setTimeout(() => {
      a && Rr(a[0]);
    }, be.DURATION * 1e3);
  }
  function Dr() {
    if (!ne.current) return;
    const H = document.querySelector("[data-vaul-drawer-wrapper]"), re = Kr(ne.current, S);
    Pe(ne.current, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`
    }), Pe(B.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      opacity: "1"
    }), s && re && re > 0 && j && Pe(H, {
      borderRadius: `${Qm}px`,
      overflow: "hidden",
      ...Se(S) ? {
        transform: `scale(${an()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
        transformOrigin: "top"
      } : {
        transform: `scale(${an()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
        transformOrigin: "left"
      },
      transitionProperty: "transform, border-radius",
      transitionDuration: `${be.DURATION}s`,
      transitionTimingFunction: `cubic-bezier(${be.EASE.join(",")})`
    }, !0);
  }
  function oa() {
    !_ || !ne.current || (ne.current.classList.remove(_a), te.current = !1, Z(!1), oe.current = /* @__PURE__ */ new Date());
  }
  function aa(H) {
    if (!_ || !ne.current) return;
    ne.current.classList.remove(_a), te.current = !1, Z(!1), oe.current = /* @__PURE__ */ new Date();
    const re = Kr(ne.current, S);
    if (!H || !Pr(H.target, !1) || !re || Number.isNaN(re) || U.current === null) return;
    const Q = oe.current.getTime() - U.current.getTime(), ue = ie.current - (Se(S) ? H.pageY : H.pageX), he = Math.abs(ue) / Q;
    if (he > 0.05 && (D(!0), setTimeout(() => {
      D(!1);
    }, 200)), a) {
      Mr({
        draggedDistance: ue * (S === "bottom" || S === "right" ? 1 : -1),
        closeDrawer: Ut,
        velocity: he,
        dismissible: d
      }), o == null || o(H, !0);
      return;
    }
    if (S === "bottom" || S === "right" ? ue > 0 : ue < 0) {
      Dr(), o == null || o(H, !0);
      return;
    }
    if (he > Zm) {
      Ut(), o == null || o(H, !1);
      return;
    }
    var Re;
    const pe = Math.min((Re = ne.current.getBoundingClientRect().height) != null ? Re : 0, window.innerHeight);
    var Me;
    const de = Math.min((Me = ne.current.getBoundingClientRect().width) != null ? Me : 0, window.innerWidth), ht = S === "left" || S === "right";
    if (Math.abs(re) >= (ht ? de : pe) * l) {
      Ut(), o == null || o(H, !1);
      return;
    }
    o == null || o(H, !0), Dr();
  }
  N.useEffect(() => (j && (Pe(document.documentElement, {
    scrollBehavior: "auto"
  }), W.current = /* @__PURE__ */ new Date()), () => {
    yE(document.documentElement, "scrollBehavior");
  }), [
    j
  ]);
  function Tr(H) {
    const re = H ? (window.innerWidth - jt) / window.innerWidth : 1, Q = H ? -jt : 0;
    J.current && window.clearTimeout(J.current), Pe(ne.current, {
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      transform: Se(S) ? `scale(${re}) translate3d(0, ${Q}px, 0)` : `scale(${re}) translate3d(${Q}px, 0, 0)`
    }), !H && ne.current && (J.current = setTimeout(() => {
      const ue = Kr(ne.current, S);
      Pe(ne.current, {
        transition: "none",
        transform: Se(S) ? `translate3d(0, ${ue}px, 0)` : `translate3d(${ue}px, 0, 0)`
      });
    }, 500));
  }
  function ia(H, re) {
    if (re < 0) return;
    const Q = (window.innerWidth - jt) / window.innerWidth, ue = Q + re * (1 - Q), he = -jt + re * jt;
    Pe(ne.current, {
      transform: Se(S) ? `scale(${ue}) translate3d(0, ${he}px, 0)` : `scale(${ue}) translate3d(${he}px, 0, 0)`,
      transition: "none"
    });
  }
  function Or(H, re) {
    const Q = Se(S) ? window.innerHeight : window.innerWidth, ue = re ? (Q - jt) / Q : 1, he = re ? -jt : 0;
    re && Pe(ne.current, {
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      transform: Se(S) ? `scale(${ue}) translate3d(0, ${he}px, 0)` : `scale(${ue}) translate3d(${he}px, 0, 0)`
    });
  }
  return N.useEffect(() => {
    b || window.requestAnimationFrame(() => {
      document.body.style.pointerEvents = "auto";
    });
  }, [
    b
  ]), /* @__PURE__ */ N.createElement(JC, {
    defaultOpen: C,
    onOpenChange: (H) => {
      !d && !H || (H ? P(!0) : Ut(!0), F(H));
    },
    open: j
  }, /* @__PURE__ */ N.createElement(Gm.Provider, {
    value: {
      activeSnapPoint: kt,
      snapPoints: a,
      setActiveSnapPoint: Rr,
      drawerRef: ne,
      overlayRef: B,
      onOpenChange: t,
      onPress: na,
      onRelease: aa,
      onDrag: ra,
      dismissible: d,
      shouldAnimate: me,
      handleOnly: f,
      isOpen: j,
      isDragging: _,
      shouldFade: Nr,
      closeDrawer: Ut,
      onNestedDrag: ia,
      onNestedOpenChange: Tr,
      onNestedRelease: Or,
      keyboardIsOpen: ce,
      modal: b,
      snapPointsOffset: mt,
      activeSnapPointIndex: Rt,
      direction: S,
      shouldScaleBackground: s,
      setBackgroundColorOnScale: i,
      noBodyStyles: y,
      container: O,
      autoFocus: L
    }
  }, n));
}
const th = /* @__PURE__ */ N.forwardRef(function({ ...e }, t) {
  const { overlayRef: n, snapPoints: r, onRelease: o, shouldFade: a, isOpen: s, modal: i, shouldAnimate: l } = xr(), u = qm(t, n), d = r && r.length > 0;
  if (!i)
    return null;
  const f = N.useCallback((h) => o(h), [
    o
  ]);
  return /* @__PURE__ */ N.createElement(nE, {
    onMouseUp: f,
    ref: u,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": s && d ? "true" : "false",
    "data-vaul-snap-points-overlay": s && a ? "true" : "false",
    "data-vaul-animate": l != null && l.current ? "true" : "false",
    ...e
  });
});
th.displayName = "Drawer.Overlay";
const nh = /* @__PURE__ */ N.forwardRef(function({ onPointerDownOutside: e, style: t, onOpenAutoFocus: n, ...r }, o) {
  const { drawerRef: a, onPress: s, onRelease: i, onDrag: l, keyboardIsOpen: u, snapPointsOffset: d, activeSnapPointIndex: f, modal: h, isOpen: g, direction: v, snapPoints: p, container: b, handleOnly: w, shouldAnimate: x, autoFocus: y } = xr(), [S, C] = N.useState(!1), R = qm(o, a), E = N.useRef(null), k = N.useRef(null), M = N.useRef(!1), T = p && p.length > 0;
  NE();
  const O = (A, Y, j = 0) => {
    if (M.current) return !0;
    const F = Math.abs(A.y), G = Math.abs(A.x), P = G > F, _ = [
      "bottom",
      "right"
    ].includes(Y) ? 1 : -1;
    if (Y === "left" || Y === "right") {
      if (!(A.x * _ < 0) && G >= 0 && G <= j)
        return P;
    } else if (!(A.y * _ < 0) && F >= 0 && F <= j)
      return !P;
    return M.current = !0, !0;
  };
  N.useEffect(() => {
    T && window.requestAnimationFrame(() => {
      C(!0);
    });
  }, []);
  function L(A) {
    E.current = null, M.current = !1, i(A);
  }
  return /* @__PURE__ */ N.createElement(rE, {
    "data-vaul-drawer-direction": v,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": S ? "true" : "false",
    "data-vaul-snap-points": g && T ? "true" : "false",
    "data-vaul-custom-container": b ? "true" : "false",
    "data-vaul-animate": x != null && x.current ? "true" : "false",
    ...r,
    ref: R,
    style: d && d.length > 0 ? {
      "--snap-point-height": `${d[f ?? 0]}px`,
      ...t
    } : t,
    onPointerDown: (A) => {
      w || (r.onPointerDown == null || r.onPointerDown.call(r, A), E.current = {
        x: A.pageX,
        y: A.pageY
      }, s(A));
    },
    onOpenAutoFocus: (A) => {
      n == null || n(A), y || A.preventDefault();
    },
    onPointerDownOutside: (A) => {
      if (e == null || e(A), !h || A.defaultPrevented) {
        A.preventDefault();
        return;
      }
      u.current && (u.current = !1);
    },
    onFocusOutside: (A) => {
      if (!h) {
        A.preventDefault();
        return;
      }
    },
    onPointerMove: (A) => {
      if (k.current = A, w || (r.onPointerMove == null || r.onPointerMove.call(r, A), !E.current)) return;
      const Y = A.pageY - E.current.y, j = A.pageX - E.current.x, F = A.pointerType === "touch" ? 10 : 2;
      O({
        x: j,
        y: Y
      }, v, F) ? l(A) : (Math.abs(j) > F || Math.abs(Y) > F) && (E.current = null);
    },
    onPointerUp: (A) => {
      r.onPointerUp == null || r.onPointerUp.call(r, A), E.current = null, M.current = !1, i(A);
    },
    onPointerOut: (A) => {
      r.onPointerOut == null || r.onPointerOut.call(r, A), L(k.current);
    },
    onContextMenu: (A) => {
      r.onContextMenu == null || r.onContextMenu.call(r, A), k.current && L(k.current);
    }
  });
});
nh.displayName = "Drawer.Content";
const TE = 250, OE = 120, _E = /* @__PURE__ */ N.forwardRef(function({ preventCycle: e = !1, children: t, ...n }, r) {
  const { closeDrawer: o, isDragging: a, snapPoints: s, activeSnapPoint: i, setActiveSnapPoint: l, dismissible: u, handleOnly: d, isOpen: f, onPress: h, onDrag: g } = xr(), v = N.useRef(null), p = N.useRef(!1);
  function b() {
    if (p.current) {
      y();
      return;
    }
    window.setTimeout(() => {
      w();
    }, OE);
  }
  function w() {
    if (a || e || p.current) {
      y();
      return;
    }
    if (y(), !s || s.length === 0) {
      u || o();
      return;
    }
    if (i === s[s.length - 1] && u) {
      o();
      return;
    }
    const C = s.findIndex((E) => E === i);
    if (C === -1) return;
    const R = s[C + 1];
    l(R);
  }
  function x() {
    v.current = window.setTimeout(() => {
      p.current = !0;
    }, TE);
  }
  function y() {
    v.current && window.clearTimeout(v.current), p.current = !1;
  }
  return /* @__PURE__ */ N.createElement("div", {
    onClick: b,
    onPointerCancel: y,
    onPointerDown: (S) => {
      d && h(S), x();
    },
    onPointerMove: (S) => {
      d && g(S);
    },
    // onPointerUp is already handled by the content component
    ref: r,
    "data-vaul-drawer-visible": f ? "true" : "false",
    "data-vaul-handle": "",
    "aria-hidden": "true",
    ...n
  }, /* @__PURE__ */ N.createElement("span", {
    "data-vaul-handle-hitarea": "",
    "aria-hidden": "true"
  }, t));
});
_E.displayName = "Drawer.Handle";
function AE(e) {
  const t = xr(), { container: n = t.container, ...r } = e;
  return /* @__PURE__ */ N.createElement(tE, {
    container: n,
    ...r
  });
}
const Yt = {
  Root: DE,
  Content: nh,
  Overlay: th,
  Trigger: eE,
  Portal: AE,
  Close: iE,
  Title: oE,
  Description: aE
};
function q1({
  ...e
}) {
  return /* @__PURE__ */ m(Yt.Root, { "data-slot": "drawer", ...e });
}
function X1({
  ...e
}) {
  return /* @__PURE__ */ m(Yt.Trigger, { "data-slot": "drawer-trigger", ...e });
}
function IE({
  ...e
}) {
  return /* @__PURE__ */ m(Yt.Portal, { "data-slot": "drawer-portal", ...e });
}
function Z1({
  ...e
}) {
  return /* @__PURE__ */ m(Yt.Close, { "data-slot": "drawer-close", ...e });
}
function LE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Yt.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: le("fixed inset-0 z-50 bg-black/50", e),
      ...t
    }
  );
}
function Q1({
  className: e,
  children: t,
  excludeFromDrag: n,
  ...r
}) {
  const o = c.useRef(null);
  return c.useEffect(() => {
    if (!n || !o.current) return;
    const a = o.current;
    function s() {
      a.querySelectorAll(n).forEach((u) => {
        u.setAttribute("data-vaul-no-drag", "");
      });
    }
    s();
    const i = new MutationObserver(s);
    return i.observe(a, { childList: !0, subtree: !0 }), () => i.disconnect();
  }, [n]), /* @__PURE__ */ I(IE, { children: [
    /* @__PURE__ */ m(LE, {}),
    /* @__PURE__ */ m(
      Yt.Content,
      {
        ref: o,
        "data-slot": "drawer-content",
        className: le("fixed z-50 flex h-auto flex-col bg-background data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-2xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-2xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm group/drawer-content", e),
        ...r,
        children: t
      }
    )
  ] });
}
function J1({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "drawer-handle",
      className: le("mx-auto mt-4 h-1.5 w-[60px] shrink-0 rounded-full bg-muted-foreground/30 group-data-[vaul-drawer-direction=bottom]/drawer-content:block hidden", e),
      ...t
    }
  );
}
function eP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "drawer-header",
      className: le("flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left", e),
      ...t
    }
  );
}
function tP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "drawer-footer",
      className: le("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function nP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Yt.Title,
    {
      "data-slot": "drawer-title",
      className: le("font-semibold text-foreground", e),
      ...t
    }
  );
}
function rP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Yt.Description,
    {
      "data-slot": "drawer-description",
      className: le("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function $E(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(
    () => ((...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    }),
    []
  );
}
function oP(e, t) {
  const n = $E(e), r = c.useRef(0);
  return c.useEffect(
    () => () => window.clearTimeout(r.current),
    []
  ), c.useCallback(
    (...a) => {
      window.clearTimeout(r.current), r.current = window.setTimeout(
        () => n(...a),
        t
      );
    },
    [n, t]
  );
}
function go({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ m(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: le(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...n
    }
  );
}
function rh({
  ...e
}) {
  return /* @__PURE__ */ m(By, { "data-slot": "select", ...e });
}
function aP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Ky,
    {
      "data-slot": "select-group",
      className: le("scroll-my-1 p-1", e),
      ...t
    }
  );
}
function oh({
  ...e
}) {
  return /* @__PURE__ */ m(Hy, { "data-slot": "select-value", ...e });
}
function ah({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    Vy,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: le(
        "border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ m(Yy, { asChild: !0, children: /* @__PURE__ */ m(hs, { className: "text-muted-foreground size-4 pointer-events-none" }) })
      ]
    }
  );
}
function ih({
  className: e,
  children: t,
  position: n = "item-aligned",
  align: r = "center",
  ...o
}) {
  return /* @__PURE__ */ m(Uy, { children: /* @__PURE__ */ I(
    Gy,
    {
      "data-slot": "select-content",
      "data-align-trigger": n === "item-aligned",
      className: le(
        "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-md shadow-md ring-1 duration-100 cn-menu-target cn-menu-translucent relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      align: r,
      ...o,
      children: [
        /* @__PURE__ */ m(zE, {}),
        /* @__PURE__ */ m(
          jy,
          {
            "data-position": n,
            className: le(
              "cn-select-viewport data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
              n === "popper" && ""
            ),
            children: t
          }
        ),
        /* @__PURE__ */ m(FE, {})
      ]
    }
  ) });
}
function iP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    qy,
    {
      "data-slot": "select-label",
      className: le("text-muted-foreground px-2 py-1.5 text-xs", e),
      ...t
    }
  );
}
function sh({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ I(
    Xy,
    {
      "data-slot": "select-item",
      className: le(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ m("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ m(Qy, { children: /* @__PURE__ */ m(vt, { className: "cn-select-item-indicator-icon pointer-events-none" }) }) }),
        /* @__PURE__ */ m(Zy, { children: t })
      ]
    }
  );
}
function sP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    tx,
    {
      "data-slot": "select-separator",
      className: le("bg-border -mx-1 my-1 h-px pointer-events-none", e),
      ...t
    }
  );
}
function zE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Jy,
    {
      "data-slot": "select-scroll-up-button",
      className: le("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", e),
      ...t,
      children: /* @__PURE__ */ m(aS, {})
    }
  );
}
function FE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    ex,
    {
      "data-slot": "select-scroll-down-button",
      className: le("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", e),
      ...t,
      children: /* @__PURE__ */ m(hs, {})
    }
  );
}
function lP({
  options: e,
  value: t,
  onChange: n,
  placeholder: r,
  disabled: o,
  className: a
}) {
  return /* @__PURE__ */ I(rh, { value: t, onValueChange: n, disabled: o, children: [
    /* @__PURE__ */ m(ah, { className: a, children: /* @__PURE__ */ m(oh, { placeholder: r }) }),
    /* @__PURE__ */ m(ih, { children: e.map((s) => /* @__PURE__ */ m(sh, { value: s.value, children: s.label }, s.value)) })
  ] });
}
function cP({
  className: e,
  style: t,
  size: n = "default",
  color: r,
  label: o,
  description: a,
  card: s,
  ...i
}) {
  const l = /* @__PURE__ */ m(
    Px,
    {
      "data-slot": "switch",
      "data-size": n,
      className: le(
        "[--switch-bg:var(--color-primary)] data-checked:bg-[var(--switch-bg)] data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent shadow-xs focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        e
      ),
      style: r ? { "--switch-bg": r, ...t } : t,
      ...i,
      children: /* @__PURE__ */ m(
        Dx,
        {
          "data-slot": "switch-thumb",
          className: "bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform"
        }
      )
    }
  );
  if (!o) return l;
  const u = !!a;
  return /* @__PURE__ */ I(
    "label",
    {
      "data-slot": "switch-field",
      className: le(
        "flex gap-3 select-none",
        u ? "items-start" : "items-center",
        s && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        i.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ m("div", { className: le(u && "pt-0.5"), children: l }),
        /* @__PURE__ */ I("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ m("span", { className: "text-sm font-medium leading-none", children: o }),
          a && /* @__PURE__ */ m("span", { className: "text-sm text-muted-foreground", children: a })
        ] })
      ]
    }
  );
}
function WE({ className: e, ...t }) {
  return /* @__PURE__ */ m("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ m(
    "table",
    {
      "data-slot": "table",
      className: le("w-full caption-bottom text-sm", e),
      ...t
    }
  ) });
}
function BE({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "thead",
    {
      "data-slot": "table-header",
      className: le("[&_tr]:border-b", e),
      ...t
    }
  );
}
function VE({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "tbody",
    {
      "data-slot": "table-body",
      className: le("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function uP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: le("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", e),
      ...t
    }
  );
}
function Dl({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "tr",
    {
      "data-slot": "table-row",
      className: le("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", e),
      ...t
    }
  );
}
function HE({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "th",
    {
      "data-slot": "table-head",
      className: le("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
      ...t
    }
  );
}
function YE({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "td",
    {
      "data-slot": "table-cell",
      className: le("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
      ...t
    }
  );
}
function dP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    "caption",
    {
      "data-slot": "table-caption",
      className: le("text-muted-foreground mt-4 text-sm", e),
      ...t
    }
  );
}
function fP({
  className: e,
  orientation: t = "horizontal",
  ...n
}) {
  return /* @__PURE__ */ m(
    _x,
    {
      "data-slot": "tabs",
      "data-orientation": t,
      className: le(
        "gap-2 group/tabs flex data-horizontal:flex-col",
        e
      ),
      ...n
    }
  );
}
const UE = Mn(
  "rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "cn-tabs-list-variant-default bg-muted",
        line: "cn-tabs-list-variant-line gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function mP({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ m(
    Ax,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: le(UE({ variant: t }), e),
      ...n
    }
  );
}
function hP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Ix,
    {
      "data-slot": "tabs-trigger",
      className: le(
        "gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        e
      ),
      ...t
    }
  );
}
function pP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Lx,
    {
      "data-slot": "tabs-content",
      className: le("text-sm flex-1 outline-none", e),
      ...t
    }
  );
}
function gP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "textarea",
    {
      "data-slot": "textarea",
      className: le(
        "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-3 aria-invalid:ring-3 md:text-sm flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function z(...e) {
  return lm(Pi(e));
}
function vP({ ...e }) {
  return /* @__PURE__ */ m(Ai, { "data-slot": "sheet", ...e });
}
function bP({
  ...e
}) {
  return /* @__PURE__ */ m(Ic, { "data-slot": "sheet-trigger", ...e });
}
function wP({
  ...e
}) {
  return /* @__PURE__ */ m(dr, { "data-slot": "sheet-close", ...e });
}
function GE({
  ...e
}) {
  return /* @__PURE__ */ m(Ii, { "data-slot": "sheet-portal", ...e });
}
function jE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Li,
    {
      "data-slot": "sheet-overlay",
      className: z(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function yP({
  className: e,
  children: t,
  side: n = "right",
  showCloseButton: r = !0,
  ...o
}) {
  return /* @__PURE__ */ I(GE, { children: [
    /* @__PURE__ */ m(jE, {}),
    /* @__PURE__ */ I(
      $i,
      {
        "data-slot": "sheet-content",
        className: z(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          n === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          n === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          n === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          n === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          e
        ),
        ...o,
        children: [
          t,
          r && /* @__PURE__ */ I(dr, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ m(vs, { className: "size-4" }),
            /* @__PURE__ */ m("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function xP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "sheet-header",
      className: z("flex flex-col gap-1.5 p-4", e),
      ...t
    }
  );
}
function SP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "sheet-footer",
      className: z("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function CP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Lc,
    {
      "data-slot": "sheet-title",
      className: z("font-semibold text-foreground", e),
      ...t
    }
  );
}
function EP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    $c,
    {
      "data-slot": "sheet-description",
      className: z("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function kP({
  className: e,
  value: t,
  ...n
}) {
  return /* @__PURE__ */ m(
    ay,
    {
      "data-slot": "progress",
      className: z(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        e
      ),
      ...n,
      children: /* @__PURE__ */ m(
        iy,
        {
          "data-slot": "progress-indicator",
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (t || 0)}%)` }
        }
      )
    }
  );
}
function RP({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ m(
    Lg,
    {
      "data-slot": "avatar",
      "data-size": t,
      className: z(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        e
      ),
      ...n
    }
  );
}
function MP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    $g,
    {
      "data-slot": "avatar-image",
      className: z("aspect-square size-full", e),
      ...t
    }
  );
}
function NP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    zg,
    {
      "data-slot": "avatar-fallback",
      className: z(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        e
      ),
      ...t
    }
  );
}
function vo({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ m(
    ax,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: z(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
function PP({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ m(
    Qx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function DP({
  ...e
}) {
  return /* @__PURE__ */ m(Jx, { "data-slot": "tooltip", ...e });
}
function TP({
  ...e
}) {
  return /* @__PURE__ */ m(e0, { "data-slot": "tooltip-trigger", ...e });
}
function OP({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ m(t0, { children: /* @__PURE__ */ I(
    n0,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: z(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ m(r0, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
function KE({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    pS,
    {
      role: "status",
      "aria-label": "Loading",
      className: z("size-4 animate-spin", e),
      ...t
    }
  );
}
const wi = Mn(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-primary bg-primary text-primary-foreground shadow-primary/24 shadow-xs hover:bg-primary/90 [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
        destructive: "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-destructive bg-destructive text-white shadow-destructive/24 shadow-xs hover:bg-destructive/90 [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
        outline: "border-input bg-popover text-foreground shadow-xs/5 hover:bg-accent/50 dark:bg-input/32 dark:hover:bg-input/64 [:disabled,:active,[data-pressed]]:shadow-none",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 [:active,[data-pressed]]:bg-secondary/80",
        ghost: "border-transparent text-foreground hover:bg-accent",
        link: "border-transparent text-foreground underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-[calc(--spacing(3)-1px)] sm:h-8",
        sm: "h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:h-7",
        lg: "h-10 px-[calc(--spacing(3.5)-1px)] sm:h-9",
        xs: "h-7 gap-1 rounded-md px-[calc(--spacing(2)-1px)] text-sm before:rounded-[calc(var(--radius-md)-1px)] sm:h-6 sm:text-xs [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-9 sm:size-8",
        "icon-sm": "size-8 sm:size-7",
        "icon-xs": "size-7 rounded-md before:rounded-[calc(var(--radius-md)-1px)] sm:size-6 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10 sm:size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function lh({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  loading: o = !1,
  disabled: a,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ m(
    r ? Di : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      disabled: o || a,
      className: z(wi({ variant: t, size: n, className: e })),
      ...i,
      children: o ? /* @__PURE__ */ I(Ee, { children: [
        /* @__PURE__ */ m(KE, { className: "opacity-100" }),
        /* @__PURE__ */ m("span", { className: "opacity-64", children: s })
      ] }) : s
    }
  );
}
function _P({
  ...e
}) {
  return /* @__PURE__ */ m(Ai, { "data-slot": "dialog", ...e });
}
function AP({
  ...e
}) {
  return /* @__PURE__ */ m(Ic, { "data-slot": "dialog-trigger", ...e });
}
function qE({
  ...e
}) {
  return /* @__PURE__ */ m(Ii, { "data-slot": "dialog-portal", ...e });
}
function IP({
  ...e
}) {
  return /* @__PURE__ */ m(dr, { "data-slot": "dialog-close", ...e });
}
function XE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Li,
    {
      "data-slot": "dialog-overlay",
      className: z(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function LP({
  className: e,
  children: t,
  showCloseButton: n = !0,
  ...r
}) {
  return /* @__PURE__ */ I(qE, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ m(XE, {}),
    /* @__PURE__ */ I(
      $i,
      {
        "data-slot": "dialog-content",
        className: z(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          e
        ),
        ...r,
        children: [
          t,
          n && /* @__PURE__ */ I(
            dr,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ m(vs, {}),
                /* @__PURE__ */ m("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function $P({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "dialog-header",
      className: z("flex flex-col gap-2 text-center sm:text-left", e),
      ...t
    }
  );
}
function zP({
  className: e,
  showCloseButton: t = !1,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    "div",
    {
      "data-slot": "dialog-footer",
      className: z(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        e
      ),
      ...r,
      children: [
        n,
        t && /* @__PURE__ */ m(dr, { asChild: !0, children: /* @__PURE__ */ m(lh, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function FP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Lc,
    {
      "data-slot": "dialog-title",
      className: z("text-lg leading-none font-semibold", e),
      ...t
    }
  );
}
function WP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    $c,
    {
      "data-slot": "dialog-description",
      className: z("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function ZE({
  ...e
}) {
  return /* @__PURE__ */ m(Ew, { "data-slot": "dropdown-menu", ...e });
}
function QE({
  ...e
}) {
  return /* @__PURE__ */ m(
    kw,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function JE({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ m(Rw, { children: /* @__PURE__ */ m(
    Mw,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: z(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function ek({
  ...e
}) {
  return /* @__PURE__ */ m(Nw, { "data-slot": "dropdown-menu-group", ...e });
}
function pn({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ m(
    Dw,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: z(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        e
      ),
      ...r
    }
  );
}
function tk({
  className: e,
  children: t,
  checked: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    Tw,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: z(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ m("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ m(Ow, { children: /* @__PURE__ */ m(vt, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function nk({
  className: e,
  inset: t,
  ...n
}) {
  return /* @__PURE__ */ m(
    Pw,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: z(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...n
    }
  );
}
function qr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    _w,
    {
      "data-slot": "dropdown-menu-separator",
      className: z("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function rk({
  ...e
}) {
  return /* @__PURE__ */ m(Aw, { "data-slot": "dropdown-menu-sub", ...e });
}
function ok({
  className: e,
  inset: t,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    Iw,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: z(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ m(ps, { className: "ml-auto size-4" })
      ]
    }
  );
}
function ak({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    Lw,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: z(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...t
    }
  );
}
function He({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "skeleton",
      className: z("animate-pulse rounded-md bg-accent", e),
      ...t
    }
  );
}
function BP({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "kbd",
    {
      "data-slot": "kbd",
      className: z(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        e
      ),
      ...t
    }
  );
}
function Tl(e) {
  const t = e.columnDef.meta;
  if (typeof (t == null ? void 0 : t.headerTitle) == "string") return t.headerTitle;
  const n = e.columnDef.header;
  return typeof n == "string" ? n : String(e.id);
}
const ch = Jl(void 0);
function xe() {
  const e = ec(ch);
  if (!e)
    throw new Error("useDataGrid must be used within a DataGridProvider");
  return e;
}
function ik({
  children: e,
  table: t,
  ...n
}) {
  var s, i;
  const r = t.getState(), o = ((s = n.tableLayout) == null ? void 0 : s.columnsResizeMode) ?? "onEnd";
  sr(() => {
    var l;
    (l = n.tableLayout) != null && l.columnsResizable && (t.options.columnResizeMode = o);
  }, [(i = n.tableLayout) == null ? void 0 : i.columnsResizable, o, t]);
  const a = qt(
    () => ({
      props: n,
      table: t,
      recordCount: n.recordCount,
      isLoading: n.isLoading || !1
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      t,
      n.recordCount,
      n.isLoading,
      n.loadingMode,
      n.loadingMessage,
      n.fetchingMoreMessage,
      n.allRowsLoadedMessage,
      n.emptyMessage,
      n.onRowClick,
      n.className,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(n.tableLayout),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(n.tableClassNames),
      r.sorting,
      r.pagination,
      r.columnFilters,
      r.rowSelection,
      r.expanded,
      r.columnVisibility,
      r.columnOrder,
      r.columnPinning,
      r.globalFilter
    ]
  );
  return /* @__PURE__ */ m(ch.Provider, { value: a, children: e });
}
function sk({
  children: e,
  table: t,
  ...n
}) {
  const r = {
    loadingMode: "skeleton",
    tableLayout: {
      dense: !1,
      cellBorder: !1,
      rowBorder: !0,
      rowRounded: !1,
      stripped: !1,
      headerSticky: !1,
      footerSticky: !1,
      headerBackground: !0,
      headerBorder: !0,
      width: "fixed",
      columnsVisibility: !1,
      columnsResizable: !1,
      columnsResizeMode: "onEnd",
      columnsPinnable: !1,
      columnsMovable: !1,
      columnsDraggable: !1,
      rowsDraggable: !1,
      rowsPinnable: !1
    },
    tableClassNames: {
      base: "",
      header: "",
      headerRow: "",
      headerSticky: "sticky top-0 z-15 bg-background/90 backdrop-blur-xs",
      footerSticky: "sticky bottom-0 z-15 bg-background/90 backdrop-blur-xs",
      body: "",
      bodyRow: "",
      footer: "",
      edgeCell: ""
    }
  }, o = {
    ...r,
    ...n,
    tableLayout: {
      ...r.tableLayout,
      ...n.tableLayout || {}
    },
    tableClassNames: {
      ...r.tableClassNames,
      ...n.tableClassNames || {}
    }
  };
  if (!t)
    throw new Error('DataGrid requires a "table" prop');
  return /* @__PURE__ */ m(ik, { table: t, ...o, children: e });
}
function lk({
  children: e,
  className: t,
  border: n = !0
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "data-grid",
      className: z(
        "w-full overflow-hidden",
        n && "border-border rounded-md border",
        t
      ),
      children: e
    }
  );
}
const ck = 24, uk = 12, Xr = {
  hasVerticalOverflow: !1,
  headerHeight: 0,
  horizontalScrollbarSize: 0,
  thumbHeight: 0,
  thumbTop: 0,
  trackHeight: 0
};
function Aa(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Ol(e, t) {
  return e.hasVerticalOverflow === t.hasVerticalOverflow && e.headerHeight === t.headerHeight && e.horizontalScrollbarSize === t.horizontalScrollbarSize && e.thumbHeight === t.thumbHeight && e.thumbTop === t.thumbTop && e.trackHeight === t.trackHeight;
}
function _l(e, t) {
  e.style.setProperty(
    "--data-grid-scrollbar-header-height",
    `${t.headerHeight}px`
  ), e.style.setProperty(
    "--data-grid-scrollbar-thumb-height",
    `${t.thumbHeight}px`
  ), e.style.setProperty(
    "--data-grid-scrollbar-thumb-top",
    `${t.thumbTop}px`
  ), e.style.setProperty(
    "--data-grid-scrollbar-track-height",
    `${t.trackHeight}px`
  );
}
function dk({
  children: e,
  className: t,
  orientation: n = "both",
  ...r
}) {
  var E;
  const { props: o } = xe(), a = gt(null), s = gt(null), i = gt(null), l = gt(Xr), u = gt({
    header: null,
    horizontalScrollbar: null,
    table: null,
    tableViewport: null
  }), d = n !== "vertical", f = n !== "horizontal", h = f && !!((E = o.tableLayout) != null && E.headerSticky), [g, v] = At(!1), p = Ae(() => {
    i.current = null, document.body.style.userSelect = "", document.body.style.webkitUserSelect = "";
  }, []), b = Ae(() => {
    const k = a.current;
    k && !Ol(Xr, l.current) && (_l(k, Xr), l.current = Xr), v((M) => M && !1);
  }, []), w = Ae(() => {
    const k = a.current, M = s.current;
    if (!k || !M || !h) {
      b();
      return;
    }
    const { header: T, horizontalScrollbar: O } = u.current, L = (T == null ? void 0 : T.getBoundingClientRect().height) ?? 0, A = M.clientHeight, Y = M.clientWidth, j = M.scrollHeight, F = M.scrollWidth, P = d && F > Y + 0.5 ? (O == null ? void 0 : O.offsetHeight) || uk : 0, _ = Math.max(
      0,
      A - L - P
    ), Z = Math.max(0, j - A);
    let se;
    if (_ === 0 || Z === 0)
      se = {
        hasVerticalOverflow: !1,
        headerHeight: L,
        horizontalScrollbarSize: P,
        thumbHeight: _,
        thumbTop: 0,
        trackHeight: _
      };
    else {
      const D = Math.max(
        _,
        j - L
      ), B = Aa(
        _ * (_ / D),
        ck,
        _
      ), W = Math.max(0, _ - B), U = W > 0 ? M.scrollTop / Z * W : 0;
      se = {
        hasVerticalOverflow: !0,
        headerHeight: L,
        horizontalScrollbarSize: P,
        thumbHeight: B,
        thumbTop: U,
        trackHeight: _
      };
    }
    Ol(se, l.current) || (_l(k, se), l.current = se), v(
      (D) => D === se.hasVerticalOverflow ? D : se.hasVerticalOverflow
    );
  }, [b, d, h]);
  sr(() => {
    const k = a.current, M = s.current;
    if (!k || !M) return;
    if (!h) {
      b();
      return;
    }
    u.current = {
      header: k.querySelector(
        '[data-slot="data-grid-table"] thead'
      ),
      horizontalScrollbar: k.querySelector(
        '[data-slot="data-grid-scrollbar"][data-orientation="horizontal"]'
      ),
      table: k.querySelector(
        '[data-slot="data-grid-table"]'
      ),
      tableViewport: k.querySelector(
        '[data-slot="data-grid-table-viewport"]'
      )
    };
    let T = 0;
    const O = () => {
      cancelAnimationFrame(T), T = window.requestAnimationFrame(w);
    };
    O(), M.addEventListener("scroll", O, { passive: !0 });
    const L = typeof ResizeObserver > "u" ? null : new ResizeObserver(O);
    return L == null || L.observe(M), u.current.header && (L == null || L.observe(u.current.header)), u.current.table && (L == null || L.observe(u.current.table)), u.current.tableViewport && (L == null || L.observe(u.current.tableViewport)), () => {
      cancelAnimationFrame(T), L == null || L.disconnect(), M.removeEventListener("scroll", O), p();
    };
  }, [
    p,
    b,
    w,
    h
  ]);
  const x = (k) => {
    const M = s.current, { thumbHeight: T, trackHeight: O } = l.current;
    if (!M) return;
    const L = Math.max(0, M.scrollHeight - M.clientHeight), A = Math.max(0, O - T);
    if (L === 0 || A === 0) {
      M.scrollTop = 0;
      return;
    }
    const Y = Aa(k, 0, A) / A;
    M.scrollTop = Y * L;
  }, y = (k) => {
    const M = s.current;
    M && (k.preventDefault(), k.stopPropagation(), k.currentTarget.setPointerCapture(k.pointerId), i.current = {
      pointerId: k.pointerId,
      startScrollTop: M.scrollTop,
      startY: k.clientY
    }, document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }, S = (k) => {
    const M = s.current, T = i.current, { thumbHeight: O, trackHeight: L } = l.current;
    if (!M || !T || T.pointerId !== k.pointerId)
      return;
    const A = Math.max(0, L - O), Y = Math.max(0, M.scrollHeight - M.clientHeight);
    if (A === 0 || Y === 0) return;
    const j = k.clientY - T.startY, F = T.startScrollTop + j / A * Y;
    M.scrollTop = Aa(F, 0, Y);
  }, C = (k) => {
    var M;
    ((M = i.current) == null ? void 0 : M.pointerId) === k.pointerId && p();
  }, R = (k) => {
    const { thumbHeight: M } = l.current;
    if (k.target !== k.currentTarget) return;
    k.preventDefault(), k.stopPropagation();
    const T = k.currentTarget.getBoundingClientRect(), O = k.clientY - T.top - M / 2;
    x(O);
  };
  return /* @__PURE__ */ I("div", { ref: a, className: "relative", children: [
    /* @__PURE__ */ I(
      wy,
      {
        "data-slot": "data-grid-scroll-area",
        className: z("relative", t),
        ...r,
        children: [
          /* @__PURE__ */ m(
            yy,
            {
              ref: s,
              "data-slot": "scroll-area-viewport",
              className: "focus-visible:ring-ring/50 rounded-md size-full transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
              children: /* @__PURE__ */ m("div", { "data-slot": "scroll-area-content", children: e })
            }
          ),
          d && /* @__PURE__ */ m(
            ei,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "horizontal",
              orientation: "horizontal",
              className: "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
              children: /* @__PURE__ */ m(
                ti,
                {
                  "data-slot": "data-grid-thumb",
                  className: "bg-border rounded-full relative flex-1"
                }
              )
            }
          ),
          f && /* @__PURE__ */ m(
            ei,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "vertical",
              orientation: "vertical",
              className: z(
                "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
                h && "pointer-events-none opacity-0"
              ),
              children: /* @__PURE__ */ m(
                ti,
                {
                  "data-slot": "data-grid-thumb",
                  className: "bg-border rounded-full relative flex-1"
                }
              )
            }
          )
        ]
      }
    ),
    h && g && /* @__PURE__ */ m(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute right-0 top-(--data-grid-scrollbar-header-height) z-20 h-(--data-grid-scrollbar-track-height)",
        children: /* @__PURE__ */ m(
          "div",
          {
            className: "pointer-events-auto relative h-full w-3 touch-none p-px",
            onPointerDown: R,
            children: /* @__PURE__ */ m(
              "div",
              {
                className: z(
                  "bg-border absolute right-px w-2",
                  "top-(--data-grid-scrollbar-thumb-top) h-(--data-grid-scrollbar-thumb-height)",
                  "rounded-full"
                ),
                onLostPointerCapture: p,
                onPointerCancel: C,
                onPointerDown: y,
                onPointerMove: S,
                onPointerUp: C
              }
            )
          }
        )
      }
    )
  ] });
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function yi(e, t) {
  return e ? fk(e) ? /* @__PURE__ */ c.createElement(e, t) : e : null;
}
function fk(e) {
  return mk(e) || typeof e == "function" || hk(e);
}
function mk(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function hk(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
const pk = Mn("", {
  variants: {
    size: {
      dense: "px-2.5 h-9",
      default: "px-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), uh = Mn("", {
  variants: {
    size: {
      dense: "px-2.5 py-2",
      default: "px-4 py-2.5"
    }
  },
  defaultVariants: {
    size: "default"
  }
});
function dh(e) {
  const t = e.getIsPinned();
  return {
    left: t === "left" ? `${e.getStart("left")}px` : void 0,
    right: t === "right" ? `${e.getAfter("right")}px` : void 0,
    position: t ? "sticky" : "relative",
    width: e.getSize(),
    zIndex: t ? 1 : 0
  };
}
function xi(e, t) {
  if (e) {
    if (typeof e == "function") {
      e(t);
      return;
    }
    e.current = t;
  }
}
function Si(e) {
  return "touches" in e;
}
function Ia(e) {
  var t, n;
  return Si(e) ? ((t = e.touches[0]) == null ? void 0 : t.clientX) ?? ((n = e.changedTouches[0]) == null ? void 0 : n.clientX) : e.clientX;
}
function Al(e, t, n) {
  var C;
  const r = n.getColumn(t.column.id);
  if (!r || !r.getCanResize() || Si(e) && e.touches.length > 1) return;
  (C = e.persist) == null || C.call(e);
  const o = e.currentTarget.ownerDocument, a = o.body.style.cursor, s = o.documentElement.style.cursor, i = t.getSize(), l = Ia(e), u = e.currentTarget.closest("th"), d = u == null ? void 0 : u.getBoundingClientRect(), f = d && Number.isFinite(
    n.options.columnResizeDirection === "rtl" ? d.left : d.right
  ) ? n.options.columnResizeDirection === "rtl" ? d.left : d.right : l;
  if (typeof l != "number" || typeof f != "number")
    return;
  o.body.style.cursor = "col-resize", o.documentElement.style.cursor = "col-resize";
  const h = t.getLeafHeaders().map(
    (R) => [R.column.id, R.column.getSize()]
  ), g = n.options.columnResizeDirection === "rtl" ? -1 : 1, v = (R, E = !1) => {
    if (typeof R != "number") return;
    let k = {};
    const M = (R - l) * g, T = Math.max(M / i, -0.999999);
    h.forEach(([O, L]) => {
      k[O] = Math.round(
        Math.max(L + L * T, 0) * 100
      ) / 100;
    }), n.setColumnSizingInfo((O) => ({
      ...O,
      startOffset: f,
      startSize: i,
      deltaOffset: M,
      deltaPercentage: T,
      columnSizingStart: h,
      isResizingColumn: r.id
    })), E && n.setColumnSizing((O) => ({
      ...O,
      ...k
    }));
  }, p = (R) => {
    v(R, !0), n.setColumnSizingInfo((E) => ({
      ...E,
      isResizingColumn: !1,
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      columnSizingStart: []
    })), o.body.style.cursor = a, o.documentElement.style.cursor = s;
  }, b = (R) => {
    v(R.clientX);
  }, w = (R) => {
    o.removeEventListener("mousemove", b), o.removeEventListener("mouseup", w), p(R.clientX);
  }, x = (R) => {
    R.cancelable && (R.preventDefault(), R.stopPropagation()), v(Ia(R));
  }, y = (R) => {
    o.removeEventListener("touchmove", x), o.removeEventListener("touchend", y), R.cancelable && (R.preventDefault(), R.stopPropagation()), p(Ia(R));
  }, S = { passive: !1 };
  Si(e) ? (o.addEventListener(
    "touchmove",
    x,
    S
  ), o.addEventListener(
    "touchend",
    y,
    S
  )) : (o.addEventListener(
    "mousemove",
    b,
    S
  ), o.addEventListener(
    "mouseup",
    w,
    S
  )), n.setColumnSizingInfo((R) => ({
    ...R,
    startOffset: f,
    startSize: i,
    deltaOffset: 0,
    deltaPercentage: 0,
    columnSizingStart: h,
    isResizingColumn: r.id
  }));
}
function gk(e, t) {
  return t ? {
    topRows: e.getTopRows(),
    centerRows: e.getCenterRows(),
    bottomRows: e.getBottomRows()
  } : {
    topRows: [],
    centerRows: e.getRowModel().rows,
    bottomRows: []
  };
}
function vk(e, t) {
  const { topRows: n, centerRows: r, bottomRows: o } = gk(
    e,
    t
  ), a = [];
  return n.forEach((s, i) => {
    a.push({
      row: s,
      pinnedBoundary: i === n.length - 1 && (r.length > 0 || o.length > 0) ? "top" : void 0
    });
  }), r.forEach((s) => {
    a.push({ row: s });
  }), o.forEach((s, i) => {
    a.push({
      row: s,
      pinnedBoundary: i === 0 && (r.length > 0 || n.length > 0) ? "bottom" : void 0
    });
  }), a;
}
function bk() {
  var t;
  const { props: e } = xe();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ m(
    "col",
    {
      "data-slot": "data-grid-table-fill-col",
      style: { width: "var(--data-grid-fill-size, 0px)" }
    }
  ) : null;
}
function wk() {
  var t;
  const { props: e } = xe();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ m(
    "th",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-head-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function fh() {
  var t;
  const { props: e } = xe();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ m(
    "td",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-body-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function yk({ children: e }) {
  var a, s, i, l, u, d, f;
  const { props: t, table: n } = xe(), r = n.getVisibleLeafColumns(), o = qt(() => {
    var v;
    if (!((v = t.tableLayout) != null && v.columnsResizable)) return;
    const h = n.getFlatHeaders(), g = {};
    for (let p = 0; p < h.length; p++) {
      const b = h[p];
      g[`--header-${b.id}-size`] = b.getSize(), g[`--col-${b.column.id}-size`] = b.column.getSize();
    }
    return g;
  }, [
    (a = t.tableLayout) == null ? void 0 : a.columnsResizable,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n.getState().columnSizingInfo,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n.getState().columnSizing
  ]);
  return /* @__PURE__ */ I(
    "table",
    {
      "data-slot": "data-grid-table",
      className: z(
        "text-foreground text-sm caption-bottom text-left align-middle font-normal rtl:text-right",
        (s = t.tableLayout) != null && s.columnsResizable ? "min-w-0" : "w-full min-w-full",
        ((i = t.tableLayout) == null ? void 0 : i.width) === "auto" ? "table-auto" : "table-fixed",
        !((l = t.tableLayout) != null && l.columnsResizable) && "",
        !((u = t.tableLayout) != null && u.columnsDraggable) && "border-separate border-spacing-0",
        (d = t.tableClassNames) == null ? void 0 : d.base
      ),
      style: (f = t.tableLayout) != null && f.columnsResizable ? {
        ...o,
        width: `calc(${n.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
      } : void 0,
      children: [
        /* @__PURE__ */ I("colgroup", { children: [
          r.map((h) => {
            var g, v;
            return /* @__PURE__ */ m(
              "col",
              {
                style: (g = t.tableLayout) != null && g.columnsResizable ? { width: `calc(var(--col-${h.id}-size) * 1px)` } : ((v = t.tableLayout) == null ? void 0 : v.width) === "fixed" ? { width: h.getSize() } : void 0
              },
              h.id
            );
          }),
          /* @__PURE__ */ m(bk, {})
        ] }),
        e
      ]
    }
  );
}
function xk({
  children: e,
  className: t,
  viewportRef: n,
  style: r
}) {
  var h, g, v;
  const { props: o, table: a } = xe(), [s, i] = At(
    null
  ), [l, u] = At(0), d = Ae(
    (p) => {
      i(p), xi(n, p);
    },
    [n]
  ), f = (h = o.tableLayout) != null && h.columnsResizable && l > 0 ? Math.max(0, l - a.getTotalSize()) : 0;
  return sr(() => {
    var y;
    if (!s || !((y = o.tableLayout) != null && y.columnsResizable)) {
      u(0);
      return;
    }
    const b = s.closest(
      '[data-slot="scroll-area-viewport"]'
    ) ?? s.parentElement ?? s, w = () => {
      u(b.clientWidth);
    };
    if (w(), typeof ResizeObserver > "u") return;
    const x = new ResizeObserver(w);
    return x.observe(b), () => {
      x.disconnect();
    };
  }, [(g = o.tableLayout) == null ? void 0 : g.columnsResizable, s]), /* @__PURE__ */ I(
    "div",
    {
      "data-slot": "data-grid-table-viewport",
      ref: d,
      className: z("relative min-w-full align-top", t),
      style: {
        ...(v = o.tableLayout) != null && v.columnsResizable ? {
          width: `calc(${a.getTotalSize()}px + var(--data-grid-fill-size, 0px))`,
          "--data-grid-fill-size": `${f}px`
        } : void 0,
        ...r
      },
      children: [
        e,
        /* @__PURE__ */ m(Rk, { viewportElement: s })
      ]
    }
  );
}
function Sk({ children: e }) {
  var n, r, o;
  const { props: t } = xe();
  return /* @__PURE__ */ m(
    "thead",
    {
      className: z(
        (n = t.tableClassNames) == null ? void 0 : n.header,
        ((r = t.tableLayout) == null ? void 0 : r.headerSticky) && ((o = t.tableClassNames) == null ? void 0 : o.headerSticky)
      ),
      children: e
    }
  );
}
function Ck({
  children: e,
  headerGroup: t
}) {
  var r, o, a, s, i;
  const { props: n } = xe();
  return /* @__PURE__ */ I(
    "tr",
    {
      className: z(
        "bg-muted/40",
        ((r = n.tableLayout) == null ? void 0 : r.headerBorder) && "[&>th]:border-b",
        ((o = n.tableLayout) == null ? void 0 : o.cellBorder) && "*:last:border-e-0",
        ((a = n.tableLayout) == null ? void 0 : a.stripped) && "bg-transparent",
        ((s = n.tableLayout) == null ? void 0 : s.headerBackground) === !1 && "bg-transparent",
        (i = n.tableClassNames) == null ? void 0 : i.headerRow
      ),
      children: [
        e,
        /* @__PURE__ */ m(wk, {})
      ]
    },
    t.id
  );
}
function Ek({
  children: e,
  header: t,
  dndRef: n,
  dndStyle: r
}) {
  var f, h, g, v, p, b, w, x, y, S, C;
  const { props: o } = xe(), { column: a } = t, s = a.getIsPinned(), i = s === "left" && a.getIsLastColumn("left"), l = s === "right" && a.getIsFirstColumn("right"), u = a.getIndex() === t.getContext().table.getVisibleLeafColumns().length - 1, d = pk({
    size: (f = o.tableLayout) != null && f.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ m(
    "th",
    {
      ref: n,
      style: {
        ...((h = o.tableLayout) == null ? void 0 : h.width) === "fixed" && !((g = o.tableLayout) != null && g.columnsResizable) && {
          width: t.getSize()
        },
        ...((v = o.tableLayout) == null ? void 0 : v.columnsPinnable) && a.getCanPin() && dh(a),
        ...((p = o.tableLayout) == null ? void 0 : p.columnsResizable) && {
          width: `calc(var(--header-${t.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": s || void 0,
      "data-last-col": i ? "left" : l ? "right" : void 0,
      className: z(
        "text-secondary-foreground/80 h-10 relative text-left align-middle font-normal rtl:text-right [&:has([role=checkbox])]:pe-0",
        d,
        ((b = o.tableLayout) == null ? void 0 : b.cellBorder) && "border-e",
        ((w = o.tableLayout) == null ? void 0 : w.columnsResizable) && a.getCanResize() && "overflow-visible",
        ((x = o.tableLayout) == null ? void 0 : x.columnsResizable) && a.getCanResize() && u && "pe-8",
        ((y = o.tableLayout) == null ? void 0 : y.columnsPinnable) && a.getCanPin() && "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s!",
        (S = t.column.columnDef.meta) == null ? void 0 : S.headerClassName,
        a.getIndex() === 0 || a.getIndex() === t.headerGroup.headers.length - 1 ? (C = o.tableClassNames) == null ? void 0 : C.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function kk({
  header: e
}) {
  var l, u;
  const { props: t, table: n } = xe(), { column: r } = e, o = r.getIndex() === e.getContext().table.getVisibleLeafColumns().length - 1, a = (((l = t.tableLayout) == null ? void 0 : l.columnsResizeMode) ?? n.options.columnResizeMode) === "onEnd";
  return /* @__PURE__ */ m(
    "div",
    {
      onDoubleClick: () => r.resetSize(),
      onMouseDown: (d) => {
        if (d.preventDefault(), d.stopPropagation(), a) {
          Al(d, e, n);
          return;
        }
        e.getResizeHandler()(d);
      },
      onTouchStart: (d) => {
        if (d.preventDefault(), d.stopPropagation(), a) {
          Al(d, e, n);
          return;
        }
        e.getResizeHandler()(d);
      },
      className: z(
        "absolute top-0 h-full cursor-col-resize user-select-none touch-none z-10 flex",
        o ? "end-0 w-5 justify-end before:hidden" : "-end-2 w-5 justify-center before:absolute before:inset-y-0 before:w-px before:-translate-x-px before:bg-border",
        ((u = t.tableLayout) == null ? void 0 : u.cellBorder) && !r.getIsResizing() && "before:hidden",
        r.getIsResizing() && (a ? "opacity-100" : o ? "before:absolute before:end-0 before:block before:inset-y-0 before:w-0.5 before:bg-primary opacity-100" : "before:block before:bg-primary before:w-0.5 opacity-100")
      )
    }
  );
}
function Rk({
  viewportElement: e
}) {
  var d, f, h;
  const { props: t, table: n } = xe(), r = n.getState().columnSizingInfo, o = r.isResizingColumn, a = ((d = t.tableLayout) == null ? void 0 : d.columnsResizeMode) ?? n.options.columnResizeMode;
  if (!((f = t.tableLayout) != null && f.columnsResizable) || a !== "onEnd" || !o)
    return null;
  const s = n.getFlatHeaders().find(
    (g) => g.column.id === o || g.id === o
  );
  if (!s) return null;
  const i = r.deltaOffset ?? 0, l = ((h = e == null ? void 0 : e.querySelector('[data-slot="data-grid-table"] thead')) == null ? void 0 : h.getBoundingClientRect().height) ?? 0, u = typeof r.startOffset == "number" && e ? r.startOffset - e.getBoundingClientRect().left : s.getStart() + s.getSize();
  return /* @__PURE__ */ I(
    "div",
    {
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-y-0 z-20",
      style: {
        left: u,
        transform: `translateX(${i}px)`
      },
      children: [
        /* @__PURE__ */ m("div", { className: "bg-primary/85 absolute inset-y-0 left-0 w-px -translate-x-1/2" }),
        /* @__PURE__ */ m(
          "div",
          {
            className: "bg-primary absolute top-0 left-0 -translate-x-1/2 rounded-b-sm shadow-xs",
            style: {
              width: 5,
              height: Math.max(l, 6)
            }
          }
        )
      ]
    }
  );
}
function Mk() {
  return /* @__PURE__ */ m("tbody", { "aria-hidden": "true", className: "h-2" });
}
function Nk({ children: e }) {
  var n, r, o;
  const { props: t } = xe();
  return /* @__PURE__ */ m(
    "tbody",
    {
      className: z(
        "[&_tr:last-child]:border-0",
        ((n = t.tableLayout) == null ? void 0 : n.rowRounded) && "[&_td:first-child]:rounded-l-lg",
        ((r = t.tableLayout) == null ? void 0 : r.rowRounded) && "[&_td:last-child]:rounded-r-lg",
        (o = t.tableClassNames) == null ? void 0 : o.body
      ),
      children: e
    }
  );
}
function Pk({ children: e }) {
  var n, r, o;
  const { props: t } = xe();
  return /* @__PURE__ */ m(
    "tfoot",
    {
      className: z(
        "border-t",
        ((n = t.tableLayout) == null ? void 0 : n.footerSticky) && ((r = t.tableClassNames) == null ? void 0 : r.footerSticky),
        (o = t.tableClassNames) == null ? void 0 : o.footer
      ),
      children: e
    }
  );
}
function Dk({ children: e }) {
  var r, o, a, s, i;
  const { table: t, props: n } = xe();
  return /* @__PURE__ */ I(
    "tr",
    {
      className: z(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        n.onRowClick && "cursor-pointer",
        !((r = n.tableLayout) != null && r.stripped) && ((o = n.tableLayout) == null ? void 0 : o.rowBorder) && "border-border border-b [&:not(:last-child)>td]:border-b",
        ((a = n.tableLayout) == null ? void 0 : a.cellBorder) && "*:last:border-e-0",
        ((s = n.tableLayout) == null ? void 0 : s.stripped) && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        t.options.enableRowSelection && "*:first:relative",
        (i = n.tableClassNames) == null ? void 0 : i.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ m(fh, {})
      ]
    }
  );
}
function Tk({
  children: e,
  column: t
}) {
  var a, s, i, l, u, d, f;
  const { props: n, table: r } = xe(), o = uh({
    size: (a = n.tableLayout) != null && a.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ m(
    "td",
    {
      style: (s = n.tableLayout) != null && s.columnsResizable ? { width: `calc(var(--col-${t.id}-size) * 1px)` } : void 0,
      className: z(
        "align-middle",
        o,
        ((i = n.tableLayout) == null ? void 0 : i.cellBorder) && "border-e",
        ((l = n.tableLayout) == null ? void 0 : l.columnsResizable) && t.getCanResize() && "truncate",
        (u = t.columnDef.meta) == null ? void 0 : u.cellClassName,
        ((d = n.tableLayout) == null ? void 0 : d.columnsPinnable) && t.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        t.getIndex() === 0 || t.getIndex() === r.getVisibleFlatColumns().length - 1 ? (f = n.tableClassNames) == null ? void 0 : f.edgeCell : ""
      ),
      children: e
    }
  );
}
function Ok({
  children: e,
  row: t,
  pinnedBoundary: n,
  rowRef: r,
  dndRef: o,
  dndStyle: a
}) {
  var u, d, f, h, g, v;
  const { props: s, table: i } = xe(), l = t.getIsPinned();
  return /* @__PURE__ */ I(
    "tr",
    {
      ref: (p) => {
        xi(r, p), xi(o, p);
      },
      style: { ...a || null },
      "data-state": i.options.enableRowSelection && t.getIsSelected() ? "selected" : void 0,
      "data-row-pinned": l || void 0,
      "data-row-pinned-boundary": n,
      onClick: () => s.onRowClick && s.onRowClick(t.original),
      className: z(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        s.onRowClick && "cursor-pointer",
        !((u = s.tableLayout) != null && u.stripped) && ((d = s.tableLayout) == null ? void 0 : d.rowBorder) && "border-border border-b [&:not(:last-child)>td]:border-b",
        ((f = s.tableLayout) == null ? void 0 : f.cellBorder) && "*:last:border-e-0",
        ((h = s.tableLayout) == null ? void 0 : h.stripped) && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        i.options.enableRowSelection && "*:first:relative",
        ((g = s.tableLayout) == null ? void 0 : g.rowsPinnable) && l && "bg-muted/30 hover:bg-muted/50",
        n === "top" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        n === "bottom" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        (v = s.tableClassNames) == null ? void 0 : v.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ m(fh, {})
      ]
    }
  );
}
function _k({ row: e }) {
  var r, o, a, s, i;
  const { props: t, table: n } = xe();
  return /* @__PURE__ */ m(
    "tr",
    {
      className: z(
        ((r = t.tableLayout) == null ? void 0 : r.rowBorder) && "[&:not(:last-child)>td]:border-b"
      ),
      children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getVisibleCells().length + ((o = t.tableLayout) != null && o.columnsResizable ? 1 : 0),
          children: (i = (s = (a = n.getAllColumns().find((l) => {
            var u;
            return (u = l.columnDef.meta) == null ? void 0 : u.expandedContent;
          })) == null ? void 0 : a.columnDef.meta) == null ? void 0 : s.expandedContent) == null ? void 0 : i.call(s, e.original)
        }
      )
    }
  );
}
function Ak({
  children: e,
  cell: t,
  dndRef: n,
  dndStyle: r
}) {
  var f, h, g, v, p, b, w, x, y;
  const { props: o } = xe(), { column: a, row: s } = t, i = a.getIsPinned(), l = i === "left" && a.getIsLastColumn("left"), u = i === "right" && a.getIsFirstColumn("right"), d = uh({
    size: (f = o.tableLayout) != null && f.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ m(
    "td",
    {
      ref: n,
      ...(h = o.tableLayout) != null && h.columnsDraggable && !i ? { cell: t } : {},
      style: {
        ...((g = o.tableLayout) == null ? void 0 : g.columnsPinnable) && a.getCanPin() && dh(a),
        ...((v = o.tableLayout) == null ? void 0 : v.columnsResizable) && {
          width: `calc(var(--col-${a.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": i || void 0,
      "data-last-col": l ? "left" : u ? "right" : void 0,
      className: z(
        "align-middle",
        d,
        ((p = o.tableLayout) == null ? void 0 : p.cellBorder) && "border-e",
        ((b = o.tableLayout) == null ? void 0 : b.columnsResizable) && a.getCanResize() && "truncate",
        (w = t.column.columnDef.meta) == null ? void 0 : w.cellClassName,
        ((x = o.tableLayout) == null ? void 0 : x.columnsPinnable) && a.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        a.getIndex() === 0 || a.getIndex() === s.getVisibleCells().length - 1 ? (y = o.tableClassNames) == null ? void 0 : y.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function Ik({
  row: e,
  pinnedBoundary: t,
  rowRef: n
}) {
  return /* @__PURE__ */ I(Zh, { children: [
    /* @__PURE__ */ m(
      Ok,
      {
        row: e,
        pinnedBoundary: t,
        rowRef: n,
        children: e.getVisibleCells().map((r) => /* @__PURE__ */ m(Ak, { cell: r, children: yi(r.column.columnDef.cell, r.getContext()) }, r.id))
      }
    ),
    e.getIsExpanded() && /* @__PURE__ */ m(_k, { row: e })
  ] });
}
function Lk() {
  var r;
  const { table: e, props: t } = xe(), n = e.getVisibleLeafColumns().length + ((r = t.tableLayout) != null && r.columnsResizable ? 1 : 0);
  return /* @__PURE__ */ m("tr", { children: /* @__PURE__ */ m(
    "td",
    {
      colSpan: Math.max(n, 1),
      className: "text-muted-foreground text-sm py-6 text-center",
      children: t.emptyMessage || "No data available"
    }
  ) });
}
function $k({ table: e }) {
  var a;
  const { isLoading: t, props: n } = xe(), r = e.getState().pagination;
  if (t && n.loadingMode === "skeleton" && (r != null && r.pageSize))
    return /* @__PURE__ */ m(Ee, { children: Array.from({ length: r.pageSize }).map((s, i) => /* @__PURE__ */ m(Dk, { children: e.getVisibleFlatColumns().map((l, u) => {
      var d;
      return /* @__PURE__ */ m(Tk, { column: l, children: (d = l.columnDef.meta) == null ? void 0 : d.skeleton }, u);
    }) }, i)) });
  if (t && n.loadingMode === "spinner")
    return /* @__PURE__ */ m("tr", { children: /* @__PURE__ */ m("td", { colSpan: e.getVisibleFlatColumns().length, className: "p-8", children: /* @__PURE__ */ I("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ I(
        "svg",
        {
          className: "text-muted-foreground mr-3 -ml-1 h-5 w-5 animate-spin",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          children: [
            /* @__PURE__ */ m(
              "circle",
              {
                className: "opacity-25",
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4"
              }
            ),
            /* @__PURE__ */ m(
              "path",
              {
                className: "opacity-75",
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              }
            )
          ]
        }
      ),
      n.loadingMessage || "Loading..."
    ] }) }) });
  const o = vk(
    e,
    (a = n.tableLayout) == null ? void 0 : a.rowsPinnable
  );
  return o.length ? /* @__PURE__ */ m(Ee, { children: o.map(({ row: s, pinnedBoundary: i }) => /* @__PURE__ */ m(
    Ik,
    {
      row: s,
      pinnedBoundary: i
    },
    s.id
  )) }) : /* @__PURE__ */ m(Lk, {});
}
const zk = tc(
  $k,
  (e, t) => !!t.table.getState().columnSizingInfo.isResizingColumn
);
function Fk({
  footerContent: e,
  renderHeader: t = !0
}) {
  var o, a;
  const { table: n, props: r } = xe();
  return /* @__PURE__ */ m(xk, { children: /* @__PURE__ */ I(yk, { children: [
    t && /* @__PURE__ */ m(Sk, { children: n.getHeaderGroups().map((s, i) => /* @__PURE__ */ m(Ck, { headerGroup: s, children: s.headers.map((l, u) => {
      var f, h;
      const { column: d } = l;
      return /* @__PURE__ */ I(Ek, { header: l, children: [
        l.isPlaceholder ? null : (f = r.tableLayout) != null && f.columnsResizable && d.getCanResize() ? /* @__PURE__ */ m("div", { className: "truncate", children: yi(
          l.column.columnDef.header,
          l.getContext()
        ) }) : yi(
          l.column.columnDef.header,
          l.getContext()
        ),
        ((h = r.tableLayout) == null ? void 0 : h.columnsResizable) && d.getCanResize() && /* @__PURE__ */ m(kk, { header: l })
      ] }, u);
    }) }, i)) }),
    t && (((o = r.tableLayout) == null ? void 0 : o.stripped) || !((a = r.tableLayout) != null && a.rowBorder)) && /* @__PURE__ */ m(Mk, {}),
    /* @__PURE__ */ m(Nk, { children: /* @__PURE__ */ m(zk, { table: n }) }),
    e && /* @__PURE__ */ m(Pk, { children: e })
  ] }) });
}
function Wk({
  table: e,
  pageSizeOptions: t = [10, 20, 30, 40, 50],
  className: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    "div",
    {
      className: z(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ m("div", { className: "flex-1 whitespace-nowrap tabular-nums text-muted-foreground text-sm", children: e.options.onRowSelectionChange ? /* @__PURE__ */ I(Ee, { children: [
          e.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          e.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }) : /* @__PURE__ */ I(Ee, { children: [
          e.getFilteredRowModel().rows.length,
          " row(s)"
        ] }) }),
        /* @__PURE__ */ I("div", { className: "flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8", children: [
          /* @__PURE__ */ I("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ m("p", { className: "whitespace-nowrap font-medium text-sm", children: "Rows per page" }),
            /* @__PURE__ */ I(
              rh,
              {
                value: `${e.getState().pagination.pageSize}`,
                onValueChange: (o) => {
                  e.setPageSize(Number(o));
                },
                children: [
                  /* @__PURE__ */ m(ah, { className: "h-8 w-18 data-size:h-8", children: /* @__PURE__ */ m(oh, { placeholder: e.getState().pagination.pageSize }) }),
                  /* @__PURE__ */ m(ih, { side: "top", children: t.map((o) => /* @__PURE__ */ m(sh, { value: `${o}`, children: o }, o)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ I("div", { className: "flex items-center justify-center whitespace-nowrap font-medium tabular-nums text-sm", children: [
            "Page ",
            e.getState().pagination.pageIndex + 1,
            " of",
            " ",
            e.getPageCount()
          ] }),
          /* @__PURE__ */ I("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ m(
              We,
              {
                "aria-label": "Go to first page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(0),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ m(sS, {})
              }
            ),
            /* @__PURE__ */ m(
              We,
              {
                "aria-label": "Go to previous page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.previousPage(),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ m(um, {})
              }
            ),
            /* @__PURE__ */ m(
              We,
              {
                "aria-label": "Go to next page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.nextPage(),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ m(ps, {})
              }
            ),
            /* @__PURE__ */ m(
              We,
              {
                "aria-label": "Go to last page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(e.getPageCount() - 1),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ m(cS, {})
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function VP({
  table: e,
  recordCount: t,
  actionBar: n,
  children: r,
  className: o,
  resizable: a = !1,
  stickyHeader: s = !1,
  stickyFooter: i = !1,
  height: l,
  footerContent: u,
  tableLayoutOverrides: d
}) {
  return /* @__PURE__ */ m(
    sk,
    {
      table: e,
      recordCount: t ?? e.getFilteredRowModel().rows.length,
      tableLayout: {
        columnsResizable: a,
        columnsResizeMode: "onEnd",
        headerSticky: s,
        footerSticky: i,
        headerBorder: !0,
        rowBorder: !1,
        ...d
      },
      children: /* @__PURE__ */ I("div", { className: z("flex w-full flex-col gap-2.5", o), children: [
        r,
        /* @__PURE__ */ m(lk, { children: /* @__PURE__ */ m(dk, { className: l, children: /* @__PURE__ */ m(Fk, { footerContent: u }) }) }),
        /* @__PURE__ */ I("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ m(Wk, { table: e }),
          n && e.getFilteredSelectedRowModel().rows.length > 0 && n
        ] })
      ] })
    }
  );
}
function Bk({
  column: e,
  label: t,
  icon: n,
  className: r,
  filter: o,
  visibility: a = !1
}) {
  var O, L, A, Y, j, F, G, P;
  const { isLoading: s, table: i, props: l, recordCount: u } = xe(), d = t ?? Tl(e), f = i.getState().columnOrder, h = JSON.stringify(i.getState().columnVisibility), g = e.getIsSorted(), v = e.getIsPinned(), p = e.getCanSort(), b = e.getCanPin(), w = e.getCanResize(), x = f.indexOf(e.id), y = x > 0, S = x < f.length - 1, C = () => {
    g === "asc" ? e.toggleSorting(!0) : g === "desc" ? e.clearSorting() : e.toggleSorting(!1);
  }, R = z(
    "text-secondary-foreground/80 inline-flex h-full items-center gap-1.5 font-normal [&_svg]:opacity-60 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5",
    r
  ), E = z(
    "text-secondary-foreground/80 hover:bg-secondary! data-[state=open]:bg-secondary! hover:text-foreground data-[state=open]:text-foreground -ms-2 px-2 py-0 font-normal h-7 rounded-md",
    r
  ), k = p && (g === "desc" ? /* @__PURE__ */ m(dl, { className: "size-3.5" }) : g === "asc" ? /* @__PURE__ */ m(fl, { className: "size-3.5" }) : /* @__PURE__ */ m(dS, { className: "mt-px size-3.5" })), M = ((O = l.tableLayout) == null ? void 0 : O.columnsMovable) || ((L = l.tableLayout) == null ? void 0 : L.columnsVisibility) && a || ((A = l.tableLayout) == null ? void 0 : A.columnsPinnable) && b || o, T = qt(() => {
    var se, D, B;
    const _ = [];
    let Z = !1;
    return o && (_.push(
      /* @__PURE__ */ m(ek, { children: /* @__PURE__ */ m(nk, { children: o }, "filter") }, "group-filter")
    ), Z = !0), p && (Z && _.push(/* @__PURE__ */ m(qr, {}, "sep-sort")), _.push(
      /* @__PURE__ */ I(
        pn,
        {
          onClick: () => {
            g === "asc" ? e.clearSorting() : e.toggleSorting(!1);
          },
          disabled: !p,
          children: [
            /* @__PURE__ */ m(fl, { className: "size-3.5!" }),
            /* @__PURE__ */ m("span", { className: "grow", children: "Asc" }),
            g === "asc" && /* @__PURE__ */ m(vt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-asc"
      ),
      /* @__PURE__ */ I(
        pn,
        {
          onClick: () => {
            g === "desc" ? e.clearSorting() : e.toggleSorting(!0);
          },
          disabled: !p,
          children: [
            /* @__PURE__ */ m(dl, { className: "size-3.5!" }),
            /* @__PURE__ */ m("span", { className: "grow", children: "Desc" }),
            g === "desc" && /* @__PURE__ */ m(vt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-desc"
      )
    ), Z = !0), (se = l.tableLayout) != null && se.columnsPinnable && b && (Z && _.push(/* @__PURE__ */ m(qr, {}, "sep-pin")), _.push(
      /* @__PURE__ */ I(
        pn,
        {
          onClick: () => e.pin(v === "left" ? !1 : "left"),
          children: [
            /* @__PURE__ */ m(Y0, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ m("span", { className: "grow", children: "Pin to left" }),
            v === "left" && /* @__PURE__ */ m(vt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-left"
      ),
      /* @__PURE__ */ I(
        pn,
        {
          onClick: () => e.pin(v === "right" ? !1 : "right"),
          children: [
            /* @__PURE__ */ m(K0, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ m("span", { className: "grow", children: "Pin to right" }),
            v === "right" && /* @__PURE__ */ m(vt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-right"
      )
    ), Z = !0), (D = l.tableLayout) != null && D.columnsMovable && (Z && _.push(/* @__PURE__ */ m(qr, {}, "sep-move")), _.push(
      /* @__PURE__ */ I(
        pn,
        {
          onClick: () => {
            if (x > 0) {
              const W = [...f], [U] = W.splice(x, 1);
              W.splice(x - 1, 0, U), i.setColumnOrder(W);
            }
          },
          disabled: !y || v !== !1,
          children: [
            /* @__PURE__ */ m(G0, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ m("span", { children: "Move to Left" })
          ]
        },
        "move-left"
      ),
      /* @__PURE__ */ I(
        pn,
        {
          onClick: () => {
            if (x < f.length - 1) {
              const W = [...f], [U] = W.splice(x, 1);
              W.splice(x + 1, 0, U), i.setColumnOrder(W);
            }
          },
          disabled: !S || v !== !1,
          children: [
            /* @__PURE__ */ m(X0, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ m("span", { children: "Move to Right" })
          ]
        },
        "move-right"
      )
    ), Z = !0), (B = l.tableLayout) != null && B.columnsVisibility && a && (Z && _.push(/* @__PURE__ */ m(qr, {}, "sep-visibility")), _.push(
      /* @__PURE__ */ I(rk, { children: [
        /* @__PURE__ */ I(ok, { children: [
          /* @__PURE__ */ m(fm, { className: "size-3.5!" }),
          /* @__PURE__ */ m("span", { children: "Columns" })
        ] }),
        /* @__PURE__ */ m(ak, { children: i.getAllColumns().filter((W) => W.getCanHide()).map((W) => /* @__PURE__ */ m(
          tk,
          {
            checked: W.getIsVisible(),
            onSelect: (U) => U.preventDefault(),
            onCheckedChange: (U) => W.toggleVisibility(!!U),
            className: "capitalize",
            children: Tl(W)
          },
          W.id
        )) })
      ] }, "visibility")
    )), _;
  }, [
    o,
    p,
    g,
    e,
    (Y = l.tableLayout) == null ? void 0 : Y.columnsPinnable,
    (j = l.tableLayout) == null ? void 0 : j.columnsMovable,
    (F = l.tableLayout) == null ? void 0 : F.columnsVisibility,
    b,
    v,
    y,
    S,
    a,
    i,
    x,
    f,
    h
  ]);
  return M ? /* @__PURE__ */ I("div", { className: "flex h-full items-center justify-between gap-1.5", children: [
    /* @__PURE__ */ I(ZE, { children: [
      /* @__PURE__ */ m(QE, { asChild: !0, children: /* @__PURE__ */ I(
        We,
        {
          variant: "ghost",
          className: E,
          disabled: s || u === 0,
          children: [
            n && n,
            d,
            k
          ]
        }
      ) }),
      /* @__PURE__ */ m(JE, { className: "w-40", align: "start", children: T })
    ] }),
    ((G = l.tableLayout) == null ? void 0 : G.columnsPinnable) && b && v && /* @__PURE__ */ m(
      We,
      {
        size: "icon",
        variant: "ghost",
        className: "-me-1 size-7 rounded-md",
        onClick: () => e.pin(!1),
        "aria-label": `Unpin ${d} column`,
        title: `Unpin ${d} column`,
        children: /* @__PURE__ */ m(vS, { className: "size-3.5! opacity-50!", "aria-hidden": "true" })
      }
    )
  ] }) : p || (P = l.tableLayout) != null && P.columnsResizable && w ? /* @__PURE__ */ m("div", { className: "flex h-full items-center", children: /* @__PURE__ */ I(
    We,
    {
      variant: "ghost",
      className: E,
      disabled: s || u === 0,
      onClick: C,
      children: [
        n && n,
        d,
        k
      ]
    }
  ) }) : /* @__PURE__ */ I("div", { className: R, children: [
    n && n,
    d
  ] });
}
const HP = tc(
  Bk
);
function Vk(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const La = {}, qn = {};
function Xn(e, t) {
  try {
    const r = (La[e] || (La[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in qn ? qn[r] : Il(r, r.split(":"));
  } catch {
    if (e in qn) return qn[e];
    const n = e == null ? void 0 : e.match(Hk);
    return n ? Il(e, n.slice(1)) : NaN;
  }
}
const Hk = /([+-]\d\d):?(\d\d)?/;
function Il(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0);
  return qn[e] = n > 0 ? n * 60 + r : n * 60 - r;
}
class st extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Xn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), mh(this), Ci(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new st(...n, t) : new st(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new st(+this, t);
  }
  getTimezoneOffset() {
    return -Xn(this.timeZone, this);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Ci(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new st(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ll = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ll.test(e)) return;
  const t = e.replace(Ll, "$1UTC");
  st.prototype[t] && (e.startsWith("get") ? st.prototype[e] = function() {
    return this.internal[t]();
  } : (st.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Yk(this), +this;
  }, st.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Ci(this), +this;
  }));
});
function Ci(e) {
  e.internal.setTime(+e), e.internal.setUTCMinutes(e.internal.getUTCMinutes() - e.getTimezoneOffset());
}
function Yk(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), mh(e);
}
function mh(e) {
  const t = Xn(e.timeZone, e), n = /* @__PURE__ */ new Date(+e);
  n.setUTCHours(n.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+n)).getTimezoneOffset(), a = r - o, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const i = r - t;
  i && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + i);
  const l = Xn(e.timeZone, e), d = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - l, f = l !== t, h = d - i;
  if (f && h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
    const g = Xn(e.timeZone, e), v = l - g;
    v && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + v), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v));
  }
}
class Ie extends st {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ie(...n, t) : new Ie(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + o;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, o] = this.internal.toUTCString().split(" ");
    return `${t == null ? void 0 : t.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${Vk(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, o];
  }
  //#endregion
  withTimeZone(t) {
    return new Ie(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ie(+new Date(t), this.timeZone);
  }
  //#endregion
}
var ee;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(ee || (ee = {}));
var we;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(we || (we = {}));
var qe;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(qe || (qe = {}));
var ze;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(ze || (ze = {}));
const hh = 6048e5, Uk = 864e5, $l = Symbol.for("constructDateFrom");
function Te(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && $l in e ? e[$l](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ve(e, t) {
  return Te(t || e, e);
}
function ph(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in);
  return isNaN(t) ? Te(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function gh(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return Te(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = Te(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let Gk = {};
function Sr() {
  return Gk;
}
function Rn(e, t) {
  var i, l, u, d;
  const n = Sr(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = ve(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function ar(e, t) {
  return Rn(e, { ...t, weekStartsOn: 1 });
}
function vh(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Te(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = ar(o), s = Te(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = ar(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function zl(e) {
  const t = ve(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function $n(e, ...t) {
  const n = Te.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ir(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function bh(e, t, n) {
  const [r, o] = $n(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = ir(r), s = ir(o), i = +a - zl(a), l = +s - zl(s);
  return Math.round((i - l) / Uk);
}
function jk(e, t) {
  const n = vh(e, t), r = Te(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ar(r);
}
function Kk(e, t, n) {
  return ph(e, t * 7, n);
}
function qk(e, t, n) {
  return gh(e, t * 12, n);
}
function Xk(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Te.bind(null, o));
    const a = ve(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), Te(r, n || NaN);
}
function Zk(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Te.bind(null, o));
    const a = ve(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), Te(r, n || NaN);
}
function Qk(e, t, n) {
  const [r, o] = $n(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +ir(r) == +ir(o);
}
function wh(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Jk(e) {
  return !(!wh(e) && typeof e != "number" || isNaN(+ve(e)));
}
function eR(e, t, n) {
  const [r, o] = $n(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function tR(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function nR(e, t) {
  const [n, r] = $n(e, t.start, t.end);
  return { start: n, end: r };
}
function rR(e, t) {
  const { start: n, end: r } = nR(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const l = [];
  for (; +s <= a; )
    l.push(Te(n, s)), s.setMonth(s.getMonth() + i);
  return o ? l.reverse() : l;
}
function oR(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function aR(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function yh(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function xh(e, t) {
  var i, l, u, d;
  const n = Sr(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = ve(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function iR(e, t) {
  return xh(e, { ...t, weekStartsOn: 1 });
}
const sR = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, lR = (e, t, n) => {
  let r;
  const o = sR[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function $a(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const cR = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, uR = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, dR = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, fR = {
  date: $a({
    formats: cR,
    defaultWidth: "full"
  }),
  time: $a({
    formats: uR,
    defaultWidth: "full"
  }),
  dateTime: $a({
    formats: dR,
    defaultWidth: "full"
  })
}, mR = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, hR = (e, t, n, r) => mR[e];
function Hn(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n != null && n.width ? String(n.width) : s;
      o = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n != null && n.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[s];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const pR = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, gR = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, vR = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, bR = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, wR = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, yR = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, xR = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, SR = {
  ordinalNumber: xR,
  era: Hn({
    values: pR,
    defaultWidth: "wide"
  }),
  quarter: Hn({
    values: gR,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Hn({
    values: vR,
    defaultWidth: "wide"
  }),
  day: Hn({
    values: bR,
    defaultWidth: "wide"
  }),
  dayPeriod: Hn({
    values: wR,
    defaultWidth: "wide",
    formattingValues: yR,
    defaultFormattingWidth: "wide"
  })
};
function Yn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? ER(i, (f) => f.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      CR(i, (f) => f.test(s))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const d = t.slice(s.length);
    return { value: u, rest: d };
  };
}
function CR(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function ER(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function kR(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let s = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const i = t.slice(o.length);
    return { value: s, rest: i };
  };
}
const RR = /^(\d+)(th|st|nd|rd)?/i, MR = /\d+/i, NR = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, PR = {
  any: [/^b/i, /^(a|c)/i]
}, DR = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, TR = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, OR = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, _R = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, AR = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, IR = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, LR = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, $R = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, zR = {
  ordinalNumber: kR({
    matchPattern: RR,
    parsePattern: MR,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Yn({
    matchPatterns: NR,
    defaultMatchWidth: "wide",
    parsePatterns: PR,
    defaultParseWidth: "any"
  }),
  quarter: Yn({
    matchPatterns: DR,
    defaultMatchWidth: "wide",
    parsePatterns: TR,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Yn({
    matchPatterns: OR,
    defaultMatchWidth: "wide",
    parsePatterns: _R,
    defaultParseWidth: "any"
  }),
  day: Yn({
    matchPatterns: AR,
    defaultMatchWidth: "wide",
    parsePatterns: IR,
    defaultParseWidth: "any"
  }),
  dayPeriod: Yn({
    matchPatterns: LR,
    defaultMatchWidth: "any",
    parsePatterns: $R,
    defaultParseWidth: "any"
  })
}, Ss = {
  code: "en-US",
  formatDistance: lR,
  formatLong: fR,
  formatRelative: hR,
  localize: SR,
  match: zR,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function FR(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return bh(n, yh(n)) + 1;
}
function Sh(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = +ar(n) - +jk(n);
  return Math.round(r / hh) + 1;
}
function Ch(e, t) {
  var d, f, h, g;
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Sr(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((f = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((g = (h = o.locale) == null ? void 0 : h.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, s = Te((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Rn(s, t), l = Te((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0);
  const u = Rn(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function WR(e, t) {
  var i, l, u, d;
  const n = Sr(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, o = Ch(e, t), a = Te((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Rn(a, t);
}
function Eh(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = +Rn(n, t) - +WR(n, t);
  return Math.round(r / hh) + 1;
}
function ge(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Pt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ge(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ge(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ge(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return ge(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ge(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ge(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ge(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ge(o, t.length);
  }
}, gn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Fl = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
      return n.ordinalNumber(o, { unit: "year" });
    }
    return Pt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Ch(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return ge(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : ge(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = vh(e);
    return ge(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return ge(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return ge(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(r);
      // 01, 02, 03, 04
      case "qq":
        return ge(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Pt.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(r + 1);
      // 01, 02, ..., 12
      case "LL":
        return ge(r + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const o = Eh(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ge(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Sh(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ge(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Pt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = FR(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ge(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(a);
      // Padded numerical value
      case "ee":
        return ge(a, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(a, { unit: "day" });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(a);
      // Padded numerical value
      case "cc":
        return ge(a, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), o = r === 0 ? 7 : r;
    switch (t) {
      // 2
      case "i":
        return String(o);
      // 02
      case "ii":
        return ge(o, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(o, { unit: "day" });
      // Tue
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r === 12 ? o = gn.noon : r === 0 ? o = gn.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r >= 17 ? o = gn.evening : r >= 12 ? o = gn.afternoon : r >= 4 ? o = gn.morning : o = gn.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return Pt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Pt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ge(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ge(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Pt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Pt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Pt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Bl(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Kt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Kt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Bl(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Kt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Kt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Wl(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Kt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Wl(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Kt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ge(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ge(+e, t.length);
  }
};
function Wl(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + ge(a, 2);
}
function Bl(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ge(Math.abs(e) / 60, 2) : Kt(e, t);
}
function Kt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ge(Math.trunc(r / 60), 2), a = ge(r % 60, 2);
  return n + o + t + a;
}
const Vl = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, kh = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, BR = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Vl(e, t);
  let a;
  switch (r) {
    case "P":
      a = t.dateTime({ width: "short" });
      break;
    case "PP":
      a = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      a = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      a = t.dateTime({ width: "full" });
      break;
  }
  return a.replace("{{date}}", Vl(r, t)).replace("{{time}}", kh(o, t));
}, VR = {
  p: kh,
  P: BR
}, HR = /^D+$/, YR = /^Y+$/, UR = ["D", "DD", "YY", "YYYY"];
function GR(e) {
  return HR.test(e);
}
function jR(e) {
  return YR.test(e);
}
function KR(e, t, n) {
  const r = qR(e, t, n);
  if (console.warn(r), UR.includes(e)) throw new RangeError(r);
}
function qR(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const XR = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ZR = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, QR = /^'([^]*?)'?$/, JR = /''/g, eM = /[a-zA-Z]/;
function tM(e, t, n) {
  var d, f, h, g, v, p, b, w;
  const r = Sr(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Ss, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((f = (d = n == null ? void 0 : n.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((g = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : g.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((p = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : p.weekStartsOn) ?? r.weekStartsOn ?? ((w = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : w.weekStartsOn) ?? 0, i = ve(e, n == null ? void 0 : n.in);
  if (!Jk(i))
    throw new RangeError("Invalid time value");
  let l = t.match(ZR).map((x) => {
    const y = x[0];
    if (y === "p" || y === "P") {
      const S = VR[y];
      return S(x, o.formatLong);
    }
    return x;
  }).join("").match(XR).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const y = x[0];
    if (y === "'")
      return { isToken: !1, value: nM(x) };
    if (Fl[y])
      return { isToken: !0, value: x };
    if (y.match(eM))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + y + "`"
      );
    return { isToken: !1, value: x };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(i, l));
  const u = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return l.map((x) => {
    if (!x.isToken) return x.value;
    const y = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && jR(y) || !(n != null && n.useAdditionalDayOfYearTokens) && GR(y)) && KR(y, t, String(e));
    const S = Fl[y[0]];
    return S(i, y, o.localize, u);
  }).join("");
}
function nM(e) {
  const t = e.match(QR);
  return t ? t[1].replace(JR, "'") : e;
}
function rM(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = Te(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function oM(e, t) {
  return ve(e, t == null ? void 0 : t.in).getMonth();
}
function aM(e, t) {
  return ve(e, t == null ? void 0 : t.in).getFullYear();
}
function iM(e, t) {
  return +ve(e) > +ve(t);
}
function sM(e, t) {
  return +ve(e) < +ve(t);
}
function lM(e, t, n) {
  const [r, o] = $n(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function cM(e, t, n) {
  const [r, o] = $n(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function uM(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = Te(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = rM(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function dM(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? Te(e, NaN) : (r.setFullYear(t), r);
}
const Hl = 5, fM = 4;
function mM(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Hl * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Hl : fM;
}
function Rh(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function hM(e, t) {
  const n = Rh(e, t), r = mM(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Et {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? Ie.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Ie(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : ph(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : gh(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : Kk(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : qk(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : bh(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : eR(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : rR(r);
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : hM(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : iR(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : tR(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : xh(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : aR(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : tM(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : Sh(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : oM(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : aM(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Eh(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : iM(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : sM(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : wh(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : Qk(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : lM(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : cM(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Xk(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : Zk(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : uM(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : dM(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Rh(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : ir(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : ar(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : oR(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Rn(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : yh(r);
    }, this.options = { locale: Ss, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let o = 0; o < 10; o++)
      r[o.toString()] = n.format(o);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
}
const ft = new Et();
class Mh {
  constructor(t, n, r = ft) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r;
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class pM {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class gM {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function bt(e, t, n = !1, r = ft) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Nh(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Cs(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Ph(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Dh(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Th(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Oh(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function wt(e, t, n = ft) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Oh(i, n))
      return i.includes(e);
    if (Cs(i))
      return bt(i, e, !1, n);
    if (Th(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Nh(i)) {
      const l = a(i.before, e), u = a(i.after, e), d = l > 0, f = u < 0;
      return s(i.before, i.after) ? f && d : d || f;
    }
    return Ph(i) ? a(e, i.after) > 0 : Dh(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function vM(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: d } = t, { isSameDay: f, isSameMonth: h, startOfMonth: g, isBefore: v, endOfMonth: p, isAfter: b } = o, w = n && g(n), x = r && p(r), y = {
    [we.focused]: [],
    [we.outside]: [],
    [we.disabled]: [],
    [we.hidden]: [],
    [we.today]: []
  }, S = {};
  for (const C of e) {
    const { date: R, displayMonth: E } = C, k = !!(E && !h(R, E)), M = !!(w && v(R, w)), T = !!(x && b(R, x)), O = !!(a && wt(R, a, o)), L = !!(s && wt(R, s, o)) || M || T || // Broadcast calendar will show outside days as default
    !u && !l && k || u && l === !1 && k, A = f(R, d ?? o.today());
    k && y.outside.push(C), O && y.disabled.push(C), L && y.hidden.push(C), A && y.today.push(C), i && Object.keys(i).forEach((Y) => {
      const j = i == null ? void 0 : i[Y];
      j && wt(R, j, o) && (S[Y] ? S[Y].push(C) : S[Y] = [C]);
    });
  }
  return (C) => {
    const R = {
      [we.focused]: !1,
      [we.disabled]: !1,
      [we.hidden]: !1,
      [we.outside]: !1,
      [we.today]: !1
    }, E = {};
    for (const k in y) {
      const M = y[k];
      R[k] = M.some((T) => T === C);
    }
    for (const k in S)
      E[k] = S[k].some((M) => M === C);
    return {
      ...R,
      // custom modifiers should override all the previous ones
      ...E
    };
  };
}
function bM(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[we[a]] ? o.push(t[we[a]]) : t[qe[a]] && o.push(t[qe[a]]), o), [t[ee.Day]]);
}
function wM(e) {
  return N.createElement("button", { ...e });
}
function yM(e) {
  return N.createElement("span", { ...e });
}
function xM(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return N.createElement(
    "svg",
    { className: r, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && N.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && N.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && N.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && N.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function SM(e) {
  const { day: t, modifiers: n, ...r } = e;
  return N.createElement("td", { ...r });
}
function CM(e) {
  const { day: t, modifiers: n, ...r } = e, o = N.useRef(null);
  return N.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), N.createElement("button", { ref: o, ...r });
}
function EM(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[ee.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: l }) => l === a.value);
  return N.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[ee.DropdownRoot] },
    N.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: l, label: u, disabled: d }) => N.createElement(r.Option, { key: l, value: l, disabled: d }, u))),
    N.createElement(
      "span",
      { className: o[ee.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      N.createElement(r.Chevron, { orientation: "down", size: 18, className: o[ee.Chevron] })
    )
  );
}
function kM(e) {
  return N.createElement("div", { ...e });
}
function RM(e) {
  return N.createElement("div", { ...e });
}
function MM(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return N.createElement("div", { ...r }, e.children);
}
function NM(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return N.createElement("div", { ...r });
}
function PM(e) {
  return N.createElement("table", { ...e });
}
function DM(e) {
  return N.createElement("div", { ...e });
}
const _h = Jl(void 0);
function Cr() {
  const e = ec(_h);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function TM(e) {
  const { components: t } = Cr();
  return N.createElement(t.Dropdown, { ...e });
}
function OM(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: l, labelNext: u } } = Cr(), d = Ae((h) => {
    o && (n == null || n(h));
  }, [o, n]), f = Ae((h) => {
    r && (t == null || t(h));
  }, [r, t]);
  return N.createElement(
    "nav",
    { ...a },
    N.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[ee.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: f },
      N.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[ee.Chevron], orientation: "left" })
    ),
    N.createElement(
      s.NextMonthButton,
      { type: "button", className: i[ee.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: d },
      N.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[ee.Chevron] })
    )
  );
}
function _M(e) {
  const { components: t } = Cr();
  return N.createElement(t.Button, { ...e });
}
function AM(e) {
  return N.createElement("option", { ...e });
}
function IM(e) {
  const { components: t } = Cr();
  return N.createElement(t.Button, { ...e });
}
function LM(e) {
  const { rootRef: t, ...n } = e;
  return N.createElement("div", { ...n, ref: t });
}
function $M(e) {
  return N.createElement("select", { ...e });
}
function zM(e) {
  const { week: t, ...n } = e;
  return N.createElement("tr", { ...n });
}
function FM(e) {
  return N.createElement("th", { ...e });
}
function WM(e) {
  return N.createElement(
    "thead",
    { "aria-hidden": !0 },
    N.createElement("tr", { ...e })
  );
}
function BM(e) {
  const { week: t, ...n } = e;
  return N.createElement("th", { ...n });
}
function VM(e) {
  return N.createElement("th", { ...e });
}
function HM(e) {
  return N.createElement("tbody", { ...e });
}
function YM(e) {
  const { components: t } = Cr();
  return N.createElement(t.Dropdown, { ...e });
}
const UM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: wM,
  CaptionLabel: yM,
  Chevron: xM,
  Day: SM,
  DayButton: CM,
  Dropdown: EM,
  DropdownNav: kM,
  Footer: RM,
  Month: MM,
  MonthCaption: NM,
  MonthGrid: PM,
  Months: DM,
  MonthsDropdown: TM,
  Nav: OM,
  NextMonthButton: _M,
  Option: AM,
  PreviousMonthButton: IM,
  Root: LM,
  Select: $M,
  Week: zM,
  WeekNumber: BM,
  WeekNumberHeader: VM,
  Weekday: FM,
  Weekdays: WM,
  Weeks: HM,
  YearsDropdown: YM
}, Symbol.toStringTag, { value: "Module" }));
function GM(e) {
  return {
    ...UM,
    ...e
  };
}
function jM(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function Es() {
  const e = {};
  for (const t in ee)
    e[ee[t]] = `rdp-${ee[t]}`;
  for (const t in we)
    e[we[t]] = `rdp-${we[t]}`;
  for (const t in qe)
    e[qe[t]] = `rdp-${qe[t]}`;
  for (const t in ze)
    e[ze[t]] = `rdp-${ze[t]}`;
  return e;
}
function Ah(e, t, n) {
  return (n ?? new Et(t)).format(e, "LLLL y");
}
const KM = Ah;
function qM(e, t, n) {
  return (n ?? new Et(t)).format(e, "d");
}
function XM(e, t = ft) {
  return t.format(e, "LLLL");
}
function ZM(e, t = ft) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function QM() {
  return "";
}
function JM(e, t, n) {
  return (n ?? new Et(t)).format(e, "cccccc");
}
function Ih(e, t = ft) {
  return t.format(e, "yyyy");
}
const eN = Ih, tN = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Ah,
  formatDay: qM,
  formatMonthCaption: KM,
  formatMonthDropdown: XM,
  formatWeekNumber: ZM,
  formatWeekNumberHeader: QM,
  formatWeekdayName: JM,
  formatYearCaption: eN,
  formatYearDropdown: Ih
}, Symbol.toStringTag, { value: "Module" }));
function nN(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...tN,
    ...e
  };
}
function rN(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = o;
  return l({
    start: s(e),
    end: i(e)
  }).map((h) => {
    const g = r.formatMonthDropdown(h, o), v = u(h), p = t && h < a(t) || n && h > a(n) || !1;
    return { value: v, label: g, disabled: p };
  });
}
function oN(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[ee.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function aN(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function iN(e, t, n, r) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, addYears: s, getYear: i, isBefore: l, isSameYear: u } = r, d = o(e), f = a(t), h = [];
  let g = d;
  for (; l(g, f) || u(g, f); )
    h.push(g), g = s(g, 1);
  return h.map((v) => {
    const p = n.formatYearDropdown(v, r);
    return {
      value: i(v),
      label: p,
      disabled: !1
    };
  });
}
function Lh(e, t, n) {
  return (n ?? new Et(t)).format(e, "LLLL y");
}
const sN = Lh;
function lN(e, t, n, r) {
  let o = (r ?? new Et(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function $h(e, t, n, r) {
  let o = (r ?? new Et(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const cN = $h;
function uN() {
  return "";
}
function dN(e) {
  return "Choose the Month";
}
function fN(e) {
  return "Go to the Next Month";
}
function mN(e) {
  return "Go to the Previous Month";
}
function hN(e, t, n) {
  return (n ?? new Et(t)).format(e, "cccc");
}
function pN(e, t) {
  return `Week ${e}`;
}
function gN(e) {
  return "Week Number";
}
function vN(e) {
  return "Choose the Year";
}
const bN = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: sN,
  labelDay: cN,
  labelDayButton: $h,
  labelGrid: Lh,
  labelGridcell: lN,
  labelMonthDropdown: dN,
  labelNav: uN,
  labelNext: fN,
  labelPrevious: mN,
  labelWeekNumber: pN,
  labelWeekNumberHeader: gN,
  labelWeekday: hN,
  labelYearDropdown: vN
}, Symbol.toStringTag, { value: "Module" })), Er = (e) => e instanceof HTMLElement ? e : null, za = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], wN = (e) => Er(e.querySelector("[data-animated-month]")), Fa = (e) => Er(e.querySelector("[data-animated-caption]")), Wa = (e) => Er(e.querySelector("[data-animated-weeks]")), yN = (e) => Er(e.querySelector("[data-animated-nav]")), xN = (e) => Er(e.querySelector("[data-animated-weekdays]"));
function SN(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = gt(null), i = gt(r), l = gt(!1);
  Ni(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const d = a.isSameMonth(r[0].date, u[0].date), f = a.isAfter(r[0].date, u[0].date), h = f ? n[ze.caption_after_enter] : n[ze.caption_before_enter], g = f ? n[ze.weeks_after_enter] : n[ze.weeks_before_enter], v = s.current, p = e.current.cloneNode(!0);
    if (p instanceof HTMLElement ? (za(p).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const S = wN(y);
      S && y.contains(S) && y.removeChild(S);
      const C = Fa(y);
      C && C.classList.remove(h);
      const R = Wa(y);
      R && R.classList.remove(g);
    }), s.current = p) : s.current = null, l.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = v instanceof HTMLElement ? za(v) : [], w = za(e.current);
    if (w && w.every((x) => x instanceof HTMLElement) && b && b.every((x) => x instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const x = yN(e.current);
      x && (x.style.zIndex = "1"), w.forEach((y, S) => {
        const C = b[S];
        if (!C)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const R = Fa(y);
        R && R.classList.add(h);
        const E = Wa(y);
        E && E.classList.add(g);
        const k = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), R && R.classList.remove(h), E && E.classList.remove(g), y.style.position = "", y.style.overflow = "", y.contains(C) && y.removeChild(C);
        };
        C.style.pointerEvents = "none", C.style.position = "absolute", C.style.overflow = "hidden", C.setAttribute("aria-hidden", "true");
        const M = xN(C);
        M && (M.style.opacity = "0");
        const T = Fa(C);
        T && (T.classList.add(f ? n[ze.caption_before_exit] : n[ze.caption_after_exit]), T.addEventListener("animationend", k));
        const O = Wa(C);
        O && O.classList.add(f ? n[ze.weeks_before_exit] : n[ze.weeks_after_exit]), y.insertBefore(C, y.firstChild);
      });
    }
  });
}
function CN(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: d, differenceInCalendarMonths: f, endOfBroadcastWeek: h, endOfISOWeek: g, endOfMonth: v, endOfWeek: p, isAfter: b, startOfBroadcastWeek: w, startOfISOWeek: x, startOfWeek: y } = r, S = l ? w(o, r) : s ? x(o) : y(o), C = l ? h(a) : s ? g(v(a)) : p(v(a)), R = d(C, S), E = f(a, o) + 1, k = [];
  for (let O = 0; O <= R; O++) {
    const L = u(S, O);
    if (t && b(L, t))
      break;
    k.push(L);
  }
  const T = (l ? 35 : 42) * E;
  if (i && k.length < T) {
    const O = T - k.length;
    for (let L = 0; L < O; L++) {
      const A = u(k[k.length - 1], 1);
      k.push(A);
    }
  }
  return k;
}
function EN(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => [...a, ...s.days], t);
    return [...n, ...o];
  }, t);
}
function kN(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Yl(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || a || s;
  const { differenceInCalendarMonths: u, addMonths: d, startOfMonth: f } = r;
  if (n && u(n, l) < i - 1) {
    const h = -1 * (i - 1);
    l = d(n, h);
  }
  return t && u(l, t) < 0 && (l = t), f(l);
}
function RN(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: d, startOfBroadcastWeek: f, startOfISOWeek: h, startOfWeek: g } = r, v = e.reduce((p, b) => {
    const w = n.broadcastCalendar ? f(b, r) : n.ISOWeek ? h(b) : g(b), x = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : l(i(b)), y = t.filter((E) => E >= w && E <= x), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < S) {
      const E = t.filter((k) => {
        const M = S - y.length;
        return k > x && k <= o(x, M);
      });
      y.push(...E);
    }
    const C = y.reduce((E, k) => {
      const M = n.ISOWeek ? u(k) : d(k), T = E.find((L) => L.weekNumber === M), O = new Mh(k, b, r);
      return T ? T.days.push(O) : E.push(new gM(M, [O])), E;
    }, []), R = new pM(b, C);
    return p.push(R), p;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function MN(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: l, endOfYear: u, newDate: d, today: f } = t, { fromYear: h, toYear: g, fromMonth: v, toMonth: p } = e;
  !n && v && (n = v), !n && h && (n = t.newDate(h, 0, 1)), !r && p && (r = p), !r && g && (r = d(g, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : h ? n = d(h, 0, 1) : !n && b && (n = o(l(e.today ?? f(), -100))), r ? r = i(r) : g ? r = d(g, 11, 31) : !r && b && (r = u(e.today ?? f())), [
    n && a(n),
    r && a(r)
  ];
}
function NN(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? a : 1, d = s(e);
  if (!t)
    return i(d, u);
  if (!(l(t, e) < a))
    return i(d, u);
}
function PN(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, u = o ? a ?? 1 : 1, d = s(e);
  if (!t)
    return i(d, -u);
  if (!(l(d, t) <= 0))
    return i(d, -u);
}
function DN(e) {
  const t = [];
  return e.reduce((n, r) => [...n, ...r.weeks], t);
}
function qo(e, t) {
  const [n, r] = At(e);
  return [t === void 0 ? n : t, r];
}
function TN(e, t) {
  const [n, r] = MN(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Yl(e, n, r, t), [i, l] = qo(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  sr(() => {
    const R = Yl(e, n, r, t);
    l(R);
  }, [e.timeZone]);
  const u = kN(i, r, e, t), d = CN(u, e.endMonth ? a(e.endMonth) : void 0, e, t), f = RN(u, d, e, t), h = DN(f), g = EN(f), v = PN(i, n, e, t), p = NN(i, r, e, t), { disableNavigation: b, onMonthChange: w } = e, x = (R) => h.some((E) => E.days.some((k) => k.isEqualTo(R))), y = (R) => {
    if (b)
      return;
    let E = o(R);
    n && E < o(n) && (E = o(n)), r && E > o(r) && (E = o(r)), l(E), w == null || w(E);
  };
  return {
    months: f,
    weeks: h,
    days: g,
    navStart: n,
    navEnd: r,
    previousMonth: v,
    nextMonth: p,
    goToMonth: y,
    goToDay: (R) => {
      x(R) || y(R.date);
    }
  };
}
var rt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(rt || (rt = {}));
function Ul(e) {
  return !e[we.disabled] && !e[we.hidden] && !e[we.outside];
}
function ON(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Ul(i) && (i[we.focused] && a < rt.FocusedModifier ? (o = s, a = rt.FocusedModifier) : r != null && r.isEqualTo(s) && a < rt.LastFocused ? (o = s, a = rt.LastFocused) : n(s.date) && a < rt.Selected ? (o = s, a = rt.Selected) : i[we.today] && a < rt.Today && (o = s, a = rt.Today));
  }
  return o || (o = e.find((s) => Ul(t(s)))), o;
}
function _N(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: l } = a, { addDays: u, addMonths: d, addWeeks: f, addYears: h, endOfBroadcastWeek: g, endOfISOWeek: v, endOfWeek: p, max: b, min: w, startOfBroadcastWeek: x, startOfISOWeek: y, startOfWeek: S } = s;
  let R = {
    day: u,
    week: f,
    month: d,
    year: h,
    startOfWeek: (E) => l ? x(E, s) : i ? y(E) : S(E),
    endOfWeek: (E) => l ? g(E) : i ? v(E) : p(E)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? R = b([r, R]) : t === "after" && o && (R = w([o, R])), R;
}
function zh(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const l = _N(e, t, n.date, r, o, a, s), u = !!(a.disabled && wt(l, a.disabled, s)), d = !!(a.hidden && wt(l, a.hidden, s)), f = l, h = new Mh(l, f, s);
  return !u && !d ? h : zh(e, t, h, r, o, a, s, i + 1);
}
function AN(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = At(), l = ON(t.days, n, r || (() => !1), s), [u, d] = At(a ? l : void 0);
  return {
    isFocusTarget: (p) => !!(l != null && l.isEqualTo(p)),
    setFocused: d,
    focused: u,
    blur: () => {
      i(u), d(void 0);
    },
    moveFocus: (p, b) => {
      if (!u)
        return;
      const w = zh(p, b, u, t.navStart, t.navEnd, e, o);
      w && (t.goToDay(w), d(w));
    }
  };
}
function IN(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = qo(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t, u = (g) => (i == null ? void 0 : i.some((v) => l(v, g))) ?? !1, { min: d, max: f } = e;
  return {
    selected: i,
    select: (g, v, p) => {
      let b = [...i ?? []];
      if (u(g)) {
        if ((i == null ? void 0 : i.length) === d || r && (i == null ? void 0 : i.length) === 1)
          return;
        b = i == null ? void 0 : i.filter((w) => !l(w, g));
      } else
        (i == null ? void 0 : i.length) === f ? b = [g] : b = [...b, g];
      return o || s(b), o == null || o(b, g, v, p), b;
    },
    isSelected: u
  };
}
function LN(e, t, n = 0, r = 0, o = !1, a = ft) {
  const { from: s, to: i } = t || {}, { isSameDay: l, isAfter: u, isBefore: d } = a;
  let f;
  if (!s && !i)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    l(s, e) ? o ? f = { from: s, to: void 0 } : f = void 0 : d(e, s) ? f = { from: e, to: s } : f = { from: s, to: e };
  else if (s && i)
    if (l(s, e) && l(i, e))
      o ? f = { from: s, to: i } : f = void 0;
    else if (l(s, e))
      f = { from: s, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, s))
      f = { from: e, to: i };
    else if (u(e, s))
      f = { from: s, to: e };
    else if (u(e, i))
      f = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (f != null && f.from && (f != null && f.to)) {
    const h = a.differenceInCalendarDays(f.to, f.from);
    r > 0 && h > r ? f = { from: e, to: void 0 } : n > 1 && h < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function $N(e, t, n = ft) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), s = Math.min(a, 6);
  for (let i = 0; i <= s; i++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function Gl(e, t, n = ft) {
  return bt(e, t.from, !1, n) || bt(e, t.to, !1, n) || bt(t, e.from, !1, n) || bt(t, e.to, !1, n);
}
function zN(e, t, n = ft) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? bt(e, i, !1, n) : Oh(i, n) ? i.some((l) => bt(e, l, !1, n)) : Cs(i) ? i.from && i.to ? Gl(e, { from: i.from, to: i.to }, n) : !1 : Th(i) ? $N(e, i.dayOfWeek, n) : Nh(i) ? n.isAfter(i.before, i.after) ? Gl(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : wt(e.from, i, n) || wt(e.to, i, n) : Ph(i) || Dh(i) ? wt(e.from, i, n) || wt(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= l; u++) {
      if (s.some((d) => d(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function FN(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, l] = qo(o, s ? o : void 0), u = s ? o : i;
  return {
    selected: u,
    select: (h, g, v) => {
      const { min: p, max: b } = e, w = h ? LN(h, u, p, b, a, t) : void 0;
      return r && n && (w != null && w.from) && w.to && zN({ from: w.from, to: w.to }, n, t) && (w.from = h, w.to = void 0), s || l(w), s == null || s(w, h, g, v), w;
    },
    isSelected: (h) => u && bt(u, h, !1, t)
  };
}
function WN(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = qo(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t;
  return {
    selected: i,
    select: (f, h, g) => {
      let v = f;
      return !r && i && i && l(f, i) && (v = void 0), o || s(v), o == null || o(v, f, h, g), v;
    },
    isSelected: (f) => i ? l(i, f) : !1
  };
}
function BN(e, t) {
  const n = WN(e, t), r = IN(e, t), o = FN(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return o;
    default:
      return;
  }
}
function VN(e) {
  var Or;
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ie(t.today, t.timeZone)), t.month && (t.month = new Ie(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ie(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ie(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ie(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ie(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = (Or = t.selected) == null ? void 0 : Or.map((H) => new Ie(H, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ie(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ie(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = qt(() => {
    const H = { ...Ss, ...t.locale };
    return {
      dateLib: new Et({
        locale: H,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: GM(t.components),
      formatters: nN(t.formatters),
      labels: { ...bN, ...t.labels },
      locale: H,
      classNames: { ...Es(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]), { captionLayout: l, mode: u, navLayout: d, numberOfMonths: f = 1, onDayBlur: h, onDayClick: g, onDayFocus: v, onDayKeyDown: p, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: x, onPrevClick: y, showWeekNumber: S, styles: C } = t, { formatCaption: R, formatDay: E, formatMonthDropdown: k, formatWeekNumber: M, formatWeekNumberHeader: T, formatWeekdayName: O, formatYearDropdown: L } = r, A = TN(t, a), { days: Y, months: j, navStart: F, navEnd: G, previousMonth: P, nextMonth: _, goToMonth: Z } = A, se = vM(Y, t, F, G, a), { isSelected: D, select: B, selected: W } = BN(t, a) ?? {}, { blur: U, focused: oe, isFocusTarget: $, moveFocus: te, setFocused: J } = AN(t, A, se, D ?? (() => !1), a), { labelDayButton: ie, labelGridcell: ce, labelGrid: me, labelMonthDropdown: Oe, labelNav: ne, labelPrevious: et, labelNext: tt, labelWeekday: je, labelWeekNumber: zn, labelWeekNumberHeader: kt, labelYearDropdown: Rt } = o, Rr = qt(() => aN(a, t.ISOWeek), [a, t.ISOWeek]), Mr = u !== void 0 || g !== void 0, mt = Ae(() => {
    P && (Z(P), y == null || y(P));
  }, [P, Z, y]), Fn = Ae(() => {
    _ && (Z(_), x == null || x(_));
  }, [Z, _, x]), Nr = Ae((H, re) => (Q) => {
    Q.preventDefault(), Q.stopPropagation(), J(H), B == null || B(H.date, re, Q), g == null || g(H.date, re, Q);
  }, [B, g, J]), ea = Ae((H, re) => (Q) => {
    J(H), v == null || v(H.date, re, Q);
  }, [v, J]), ta = Ae((H, re) => (Q) => {
    U(), h == null || h(H.date, re, Q);
  }, [U, h]), an = Ae((H, re) => (Q) => {
    const ue = {
      ArrowLeft: [
        Q.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        Q.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [Q.shiftKey ? "year" : "week", "after"],
      ArrowUp: [Q.shiftKey ? "year" : "week", "before"],
      PageUp: [Q.shiftKey ? "year" : "month", "before"],
      PageDown: [Q.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (ue[Q.key]) {
      Q.preventDefault(), Q.stopPropagation();
      const [he, Re] = ue[Q.key];
      te(he, Re);
    }
    p == null || p(H.date, re, Q);
  }, [te, p, t.dir]), na = Ae((H, re) => (Q) => {
    b == null || b(H.date, re, Q);
  }, [b]), Pr = Ae((H, re) => (Q) => {
    w == null || w(H.date, re, Q);
  }, [w]), ra = Ae((H) => (re) => {
    const Q = Number(re.target.value), ue = a.setMonth(a.startOfMonth(H), Q);
    Z(ue);
  }, [a, Z]), Ut = Ae((H) => (re) => {
    const Q = Number(re.target.value), ue = a.setYear(a.startOfMonth(H), Q);
    Z(ue);
  }, [a, Z]), { className: Dr, style: oa } = qt(() => ({
    className: [i[ee.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[ee.Root], ...t.style }
  }), [i, t.className, t.style, C]), aa = jM(t), Tr = gt(null);
  SN(Tr, !!t.animate, {
    classNames: i,
    months: j,
    focused: oe,
    dateLib: a
  });
  const ia = {
    dayPickerProps: t,
    selected: W,
    select: B,
    isSelected: D,
    months: j,
    nextMonth: _,
    previousMonth: P,
    goToMonth: Z,
    getModifiers: se,
    components: n,
    classNames: i,
    styles: C,
    labels: o,
    formatters: r
  };
  return N.createElement(
    _h.Provider,
    { value: ia },
    N.createElement(
      n.Root,
      { rootRef: t.animate ? Tr : void 0, className: Dr, style: oa, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], ...aa },
      N.createElement(
        n.Months,
        { className: i[ee.Months], style: C == null ? void 0 : C[ee.Months] },
        !t.hideNavigation && !d && N.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ee.Nav], style: C == null ? void 0 : C[ee.Nav], "aria-label": ne(), onPreviousClick: mt, onNextClick: Fn, previousMonth: P, nextMonth: _ }),
        j.map((H, re) => {
          const Q = rN(H.date, F, G, r, a), ue = iN(F, G, r, a);
          return N.createElement(
            n.Month,
            { "data-animated-month": t.animate ? "true" : void 0, className: i[ee.Month], style: C == null ? void 0 : C[ee.Month], key: re, displayIndex: re, calendarMonth: H },
            d === "around" && !t.hideNavigation && re === 0 && N.createElement(
              n.PreviousMonthButton,
              { type: "button", className: i[ee.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": et(P), onClick: mt, "data-animated-button": t.animate ? "true" : void 0 },
              N.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[ee.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            N.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[ee.MonthCaption], style: C == null ? void 0 : C[ee.MonthCaption], calendarMonth: H, displayIndex: re }, l != null && l.startsWith("dropdown") ? N.createElement(
              n.DropdownNav,
              { className: i[ee.Dropdowns], style: C == null ? void 0 : C[ee.Dropdowns] },
              l === "dropdown" || l === "dropdown-months" ? N.createElement(n.MonthsDropdown, { className: i[ee.MonthsDropdown], "aria-label": Oe(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: ra(H.date), options: Q, style: C == null ? void 0 : C[ee.Dropdown], value: a.getMonth(H.date) }) : N.createElement("span", null, k(H.date, a)),
              l === "dropdown" || l === "dropdown-years" ? N.createElement(n.YearsDropdown, { className: i[ee.YearsDropdown], "aria-label": Rt(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Ut(H.date), options: ue, style: C == null ? void 0 : C[ee.Dropdown], value: a.getYear(H.date) }) : N.createElement("span", null, L(H.date, a)),
              N.createElement("span", { role: "status", "aria-live": "polite", style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
              } }, R(H.date, a.options, a))
            ) : N.createElement(n.CaptionLabel, { className: i[ee.CaptionLabel], role: "status", "aria-live": "polite" }, R(H.date, a.options, a))),
            d === "around" && !t.hideNavigation && re === f - 1 && N.createElement(
              n.NextMonthButton,
              { type: "button", className: i[ee.NextMonthButton], tabIndex: _ ? void 0 : -1, "aria-disabled": _ ? void 0 : !0, "aria-label": tt(_), onClick: Fn, "data-animated-button": t.animate ? "true" : void 0 },
              N.createElement(n.Chevron, { disabled: _ ? void 0 : !0, className: i[ee.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            re === f - 1 && d === "after" && !t.hideNavigation && N.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ee.Nav], style: C == null ? void 0 : C[ee.Nav], "aria-label": ne(), onPreviousClick: mt, onNextClick: Fn, previousMonth: P, nextMonth: _ }),
            N.createElement(
              n.MonthGrid,
              { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": me(H.date, a.options, a) || void 0, className: i[ee.MonthGrid], style: C == null ? void 0 : C[ee.MonthGrid] },
              !t.hideWeekdays && N.createElement(
                n.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[ee.Weekdays], style: C == null ? void 0 : C[ee.Weekdays] },
                S && N.createElement(n.WeekNumberHeader, { "aria-label": kt(a.options), className: i[ee.WeekNumberHeader], style: C == null ? void 0 : C[ee.WeekNumberHeader], scope: "col" }, T()),
                Rr.map((he, Re) => N.createElement(n.Weekday, { "aria-label": je(he, a.options, a), className: i[ee.Weekday], key: Re, style: C == null ? void 0 : C[ee.Weekday], scope: "col" }, O(he, a.options, a)))
              ),
              N.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[ee.Weeks], style: C == null ? void 0 : C[ee.Weeks] }, H.weeks.map((he, Re) => N.createElement(
                n.Week,
                { className: i[ee.Week], key: he.weekNumber, style: C == null ? void 0 : C[ee.Week], week: he },
                S && N.createElement(n.WeekNumber, { week: he, style: C == null ? void 0 : C[ee.WeekNumber], "aria-label": zn(he.weekNumber, {
                  locale: s
                }), className: i[ee.WeekNumber], scope: "row", role: "rowheader" }, M(he.weekNumber, a)),
                he.days.map((pe) => {
                  const { date: Me } = pe, de = se(pe);
                  if (de[we.focused] = !de.hidden && !!(oe != null && oe.isEqualTo(pe)), de[qe.selected] = (D == null ? void 0 : D(Me)) || de.selected, Cs(W)) {
                    const { from: Mt, to: sn } = W;
                    de[qe.range_start] = !!(Mt && sn && a.isSameDay(Me, Mt)), de[qe.range_end] = !!(Mt && sn && a.isSameDay(Me, sn)), de[qe.range_middle] = bt(W, Me, !0, a);
                  }
                  const ht = oN(de, C, t.modifiersStyles), nt = bM(de, i, t.modifiersClassNames), Ve = !Mr && !de.hidden ? ce(Me, de, a.options, a) : void 0;
                  return N.createElement(n.Day, { key: `${a.format(Me, "yyyy-MM-dd")}_${a.format(pe.displayMonth, "yyyy-MM")}`, day: pe, modifiers: de, className: nt.join(" "), style: ht, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": Ve, "data-day": a.format(Me, "yyyy-MM-dd"), "data-month": pe.outside ? a.format(Me, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": pe.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && Mr ? N.createElement(n.DayButton, { className: i[ee.DayButton], style: C == null ? void 0 : C[ee.DayButton], type: "button", day: pe, modifiers: de, disabled: de.disabled || void 0, tabIndex: $(pe) ? 0 : -1, "aria-label": ie(Me, de, a.options, a), onClick: Nr(pe, de), onBlur: ta(pe, de), onFocus: ea(pe, de), onKeyDown: an(pe, de), onMouseEnter: na(pe, de), onMouseLeave: Pr(pe, de) }, E(Me, a.options, a)) : !de.hidden && E(pe.date, a.options, a));
                })
              )))
            )
          );
        })
      ),
      t.footer && N.createElement(n.Footer, { className: i[ee.Footer], style: C == null ? void 0 : C[ee.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function jl({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const l = Es();
  return /* @__PURE__ */ m(
    VN,
    {
      showOutsideDays: n,
      className: z(
        "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: z("w-fit", l.root),
        months: z(
          "relative flex flex-col gap-4 md:flex-row",
          l.months
        ),
        month: z("flex w-full flex-col gap-4", l.month),
        nav: z(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          l.nav
        ),
        button_previous: z(
          wi({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          l.button_previous
        ),
        button_next: z(
          wi({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          l.button_next
        ),
        month_caption: z(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: z(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          l.dropdowns
        ),
        dropdown_root: z(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
          l.dropdown_root
        ),
        dropdown: z(
          "absolute inset-0 bg-popover opacity-0",
          l.dropdown
        ),
        caption_label: z(
          "font-medium select-none",
          r === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: z("flex", l.weekdays),
        weekday: z(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          l.weekday
        ),
        week: z("mt-2 flex w-full", l.week),
        week_number_header: z(
          "w-(--cell-size) select-none",
          l.week_number_header
        ),
        week_number: z(
          "text-[0.8rem] text-muted-foreground select-none",
          l.week_number
        ),
        day: z(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          i.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          l.day
        ),
        range_start: z(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: z("rounded-none", l.range_middle),
        range_end: z("rounded-r-md bg-accent", l.range_end),
        today: z(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          l.today
        ),
        outside: z(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: z(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: z("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: u, rootRef: d, ...f }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: z(u),
            ...f
          }
        ),
        Chevron: ({ className: u, orientation: d, ...f }) => d === "left" ? /* @__PURE__ */ m(um, { className: z("size-4", u), ...f }) : d === "right" ? /* @__PURE__ */ m(
          ps,
          {
            className: z("size-4", u),
            ...f
          }
        ) : /* @__PURE__ */ m(hs, { className: z("size-4", u), ...f }),
        DayButton: HN,
        WeekNumber: ({ children: u, ...d }) => /* @__PURE__ */ m("td", { ...d, children: /* @__PURE__ */ m("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...s
      },
      ...i
    }
  );
}
function HN({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Es(), a = c.useRef(null);
  return c.useEffect(() => {
    var s;
    n.focused && ((s = a.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ m(
    lh,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: z(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
function Xo({
  ...e
}) {
  return /* @__PURE__ */ m(qw, { "data-slot": "popover", ...e });
}
function Zo({
  ...e
}) {
  return /* @__PURE__ */ m(Xw, { "data-slot": "popover-trigger", ...e });
}
function Qo({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ m(Zw, { children: /* @__PURE__ */ m(
    Qw,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: z(
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function Zr(e, t = {}) {
  if (!e) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: t.month ?? "long",
      day: t.day ?? "numeric",
      year: t.year ?? "numeric",
      ...t
    }).format(new Date(e));
  } catch {
    return "";
  }
}
function Un(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function Ba(e) {
  if (!e) return;
  const t = typeof e == "string" ? Number(e) : e, n = new Date(t);
  return Number.isNaN(n.getTime()) ? void 0 : n;
}
function Kl(e) {
  return e == null ? [] : Array.isArray(e) ? e.map((t) => {
    if (typeof t == "number" || typeof t == "string")
      return t;
  }) : typeof e == "string" || typeof e == "number" ? [e] : [];
}
function YN({
  column: e,
  title: t,
  multiple: n
}) {
  const r = e.getFilterValue(), o = c.useMemo(() => {
    if (!r)
      return n ? { from: void 0, to: void 0 } : [];
    if (n) {
      const h = Kl(r);
      return {
        from: Ba(h[0]),
        to: Ba(h[1])
      };
    }
    const d = Kl(r), f = Ba(d[0]);
    return f ? [f] : [];
  }, [r, n]), a = c.useCallback(
    (d) => {
      var f, h;
      if (!d) {
        e.setFilterValue(void 0);
        return;
      }
      if (n && !("getTime" in d)) {
        const g = (f = d.from) == null ? void 0 : f.getTime(), v = (h = d.to) == null ? void 0 : h.getTime();
        e.setFilterValue(g || v ? [g, v] : void 0);
      } else !n && "getTime" in d && e.setFilterValue(d.getTime());
    },
    [e, n]
  ), s = c.useCallback(
    (d) => {
      d.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  ), i = c.useMemo(() => n ? Un(o) ? o.from || o.to : !1 : Array.isArray(o) ? o.length > 0 : !1, [n, o]), l = c.useCallback((d) => !d.from && !d.to ? "" : d.from && d.to ? `${Zr(d.from)} - ${Zr(d.to)}` : Zr(d.from ?? d.to), []), u = c.useMemo(() => {
    if (n) {
      if (!Un(o)) return null;
      const h = o.from || o.to, g = h ? l(o) : "Select date range";
      return /* @__PURE__ */ I("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ m("span", { children: t }),
        h && /* @__PURE__ */ I(Ee, { children: [
          /* @__PURE__ */ m(
            vo,
            {
              orientation: "vertical",
              className: "mx-0.5 data-[orientation=vertical]:h-4"
            }
          ),
          /* @__PURE__ */ m("span", { children: g })
        ] })
      ] });
    }
    if (Un(o)) return null;
    const d = o.length > 0, f = d ? Zr(o[0]) : "Select date";
    return /* @__PURE__ */ I("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ m("span", { children: t }),
      d && /* @__PURE__ */ I(Ee, { children: [
        /* @__PURE__ */ m(
          vo,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ m("span", { children: f })
      ] })
    ] });
  }, [o, n, l, t]);
  return /* @__PURE__ */ I(Xo, { children: [
    /* @__PURE__ */ m(Zo, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          i ? /* @__PURE__ */ m(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              onClick: s,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              children: /* @__PURE__ */ m(gs, {})
            }
          ) : /* @__PURE__ */ m(J0, {}),
          u
        ]
      }
    ) }),
    /* @__PURE__ */ m(Qo, { className: "w-auto p-0", align: "start", children: n ? /* @__PURE__ */ m(
      jl,
      {
        autoFocus: !0,
        captionLayout: "dropdown",
        mode: "range",
        selected: Un(o) ? o : { from: void 0, to: void 0 },
        onSelect: a
      }
    ) : /* @__PURE__ */ m(
      jl,
      {
        captionLayout: "dropdown",
        mode: "single",
        selected: Un(o) ? void 0 : o[0],
        onSelect: a
      }
    ) })
  ] });
}
var ql = 1, UN = 0.9, GN = 0.8, jN = 0.17, Va = 0.1, Ha = 0.999, KN = 0.9999, qN = 0.99, XN = /[\\\/_+.#"@\[\(\{&]/, ZN = /[\\\/_+.#"@\[\(\{&]/g, QN = /[\s-]/, Fh = /[\s-]/g;
function Ei(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? ql : qN;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var l = r.charAt(a), u = n.indexOf(l, o), d = 0, f, h, g, v; u >= 0; ) f = Ei(e, t, n, r, u + 1, a + 1, s), f > d && (u === o ? f *= ql : XN.test(e.charAt(u - 1)) ? (f *= GN, g = e.slice(o, u - 1).match(ZN), g && o > 0 && (f *= Math.pow(Ha, g.length))) : QN.test(e.charAt(u - 1)) ? (f *= UN, v = e.slice(o, u - 1).match(Fh), v && o > 0 && (f *= Math.pow(Ha, v.length))) : (f *= jN, o > 0 && (f *= Math.pow(Ha, u - o))), e.charAt(u) !== t.charAt(a) && (f *= KN)), (f < Va && n.charAt(u - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(u - 1) !== r.charAt(a)) && (h = Ei(e, t, n, r, u + 1, a + 2, s), h * Va > f && (f = h * Va)), f > d && (d = f), u = n.indexOf(l, u + 1);
  return s[i] = d, d;
}
function Xl(e) {
  return e.toLowerCase().replace(Fh, " ");
}
function JN(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Ei(e, t, Xl(e), Xl(t), 0, 0, {});
}
var Gn = '[cmdk-group=""]', Ya = '[cmdk-group-items=""]', e1 = '[cmdk-group-heading=""]', Wh = '[cmdk-item=""]', Zl = `${Wh}:not([aria-disabled="true"])`, ki = "cmdk-item-select", vn = "data-value", t1 = (e, t, n) => JN(e, t, n), Bh = c.createContext(void 0), kr = () => c.useContext(Bh), Vh = c.createContext(void 0), ks = () => c.useContext(Vh), Hh = c.createContext(void 0), Yh = c.forwardRef((e, t) => {
  let n = bn(() => {
    var D, B;
    return { search: "", value: (B = (D = e.value) != null ? D : e.defaultValue) != null ? B : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = bn(() => /* @__PURE__ */ new Set()), o = bn(() => /* @__PURE__ */ new Map()), a = bn(() => /* @__PURE__ */ new Map()), s = bn(() => /* @__PURE__ */ new Set()), i = Uh(e), { label: l, children: u, value: d, onValueChange: f, filter: h, shouldFilter: g, loop: v, disablePointerSelection: p = !1, vimBindings: b = !0, ...w } = e, x = Ce(), y = Ce(), S = Ce(), C = c.useRef(null), R = f1();
  tn(() => {
    if (d !== void 0) {
      let D = d.trim();
      n.current.value = D, E.emit();
    }
  }, [d]), tn(() => {
    R(6, A);
  }, []);
  let E = c.useMemo(() => ({ subscribe: (D) => (s.current.add(D), () => s.current.delete(D)), snapshot: () => n.current, setState: (D, B, W) => {
    var U, oe, $, te;
    if (!Object.is(n.current[D], B)) {
      if (n.current[D] = B, D === "search") L(), T(), R(1, O);
      else if (D === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let J = document.getElementById(S);
          J ? J.focus() : (U = document.getElementById(x)) == null || U.focus();
        }
        if (R(7, () => {
          var J;
          n.current.selectedItemId = (J = Y()) == null ? void 0 : J.id, E.emit();
        }), W || R(5, A), ((oe = i.current) == null ? void 0 : oe.value) !== void 0) {
          let J = B ?? "";
          (te = ($ = i.current).onValueChange) == null || te.call($, J);
          return;
        }
      }
      E.emit();
    }
  }, emit: () => {
    s.current.forEach((D) => D());
  } }), []), k = c.useMemo(() => ({ value: (D, B, W) => {
    var U;
    B !== ((U = a.current.get(D)) == null ? void 0 : U.value) && (a.current.set(D, { value: B, keywords: W }), n.current.filtered.items.set(D, M(B, W)), R(2, () => {
      T(), E.emit();
    }));
  }, item: (D, B) => (r.current.add(D), B && (o.current.has(B) ? o.current.get(B).add(D) : o.current.set(B, /* @__PURE__ */ new Set([D]))), R(3, () => {
    L(), T(), n.current.value || O(), E.emit();
  }), () => {
    a.current.delete(D), r.current.delete(D), n.current.filtered.items.delete(D);
    let W = Y();
    R(4, () => {
      L(), (W == null ? void 0 : W.getAttribute("id")) === D && O(), E.emit();
    });
  }), group: (D) => (o.current.has(D) || o.current.set(D, /* @__PURE__ */ new Set()), () => {
    a.current.delete(D), o.current.delete(D);
  }), filter: () => i.current.shouldFilter, label: l || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: x, inputId: S, labelId: y, listInnerRef: C }), []);
  function M(D, B) {
    var W, U;
    let oe = (U = (W = i.current) == null ? void 0 : W.filter) != null ? U : t1;
    return D ? oe(D, n.current.search, B) : 0;
  }
  function T() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let D = n.current.filtered.items, B = [];
    n.current.filtered.groups.forEach((U) => {
      let oe = o.current.get(U), $ = 0;
      oe.forEach((te) => {
        let J = D.get(te);
        $ = Math.max(J, $);
      }), B.push([U, $]);
    });
    let W = C.current;
    j().sort((U, oe) => {
      var $, te;
      let J = U.getAttribute("id"), ie = oe.getAttribute("id");
      return (($ = D.get(ie)) != null ? $ : 0) - ((te = D.get(J)) != null ? te : 0);
    }).forEach((U) => {
      let oe = U.closest(Ya);
      oe ? oe.appendChild(U.parentElement === oe ? U : U.closest(`${Ya} > *`)) : W.appendChild(U.parentElement === W ? U : U.closest(`${Ya} > *`));
    }), B.sort((U, oe) => oe[1] - U[1]).forEach((U) => {
      var oe;
      let $ = (oe = C.current) == null ? void 0 : oe.querySelector(`${Gn}[${vn}="${encodeURIComponent(U[0])}"]`);
      $ == null || $.parentElement.appendChild($);
    });
  }
  function O() {
    let D = j().find((W) => W.getAttribute("aria-disabled") !== "true"), B = D == null ? void 0 : D.getAttribute(vn);
    E.setState("value", B || void 0);
  }
  function L() {
    var D, B, W, U;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let oe = 0;
    for (let $ of r.current) {
      let te = (B = (D = a.current.get($)) == null ? void 0 : D.value) != null ? B : "", J = (U = (W = a.current.get($)) == null ? void 0 : W.keywords) != null ? U : [], ie = M(te, J);
      n.current.filtered.items.set($, ie), ie > 0 && oe++;
    }
    for (let [$, te] of o.current) for (let J of te) if (n.current.filtered.items.get(J) > 0) {
      n.current.filtered.groups.add($);
      break;
    }
    n.current.filtered.count = oe;
  }
  function A() {
    var D, B, W;
    let U = Y();
    U && (((D = U.parentElement) == null ? void 0 : D.firstChild) === U && ((W = (B = U.closest(Gn)) == null ? void 0 : B.querySelector(e1)) == null || W.scrollIntoView({ block: "nearest" })), U.scrollIntoView({ block: "nearest" }));
  }
  function Y() {
    var D;
    return (D = C.current) == null ? void 0 : D.querySelector(`${Wh}[aria-selected="true"]`);
  }
  function j() {
    var D;
    return Array.from(((D = C.current) == null ? void 0 : D.querySelectorAll(Zl)) || []);
  }
  function F(D) {
    let B = j()[D];
    B && E.setState("value", B.getAttribute(vn));
  }
  function G(D) {
    var B;
    let W = Y(), U = j(), oe = U.findIndex((te) => te === W), $ = U[oe + D];
    (B = i.current) != null && B.loop && ($ = oe + D < 0 ? U[U.length - 1] : oe + D === U.length ? U[0] : U[oe + D]), $ && E.setState("value", $.getAttribute(vn));
  }
  function P(D) {
    let B = Y(), W = B == null ? void 0 : B.closest(Gn), U;
    for (; W && !U; ) W = D > 0 ? u1(W, Gn) : d1(W, Gn), U = W == null ? void 0 : W.querySelector(Zl);
    U ? E.setState("value", U.getAttribute(vn)) : G(D);
  }
  let _ = () => F(j().length - 1), Z = (D) => {
    D.preventDefault(), D.metaKey ? _() : D.altKey ? P(1) : G(1);
  }, se = (D) => {
    D.preventDefault(), D.metaKey ? F(0) : D.altKey ? P(-1) : G(-1);
  };
  return c.createElement(K.div, { ref: t, tabIndex: -1, ...w, "cmdk-root": "", onKeyDown: (D) => {
    var B;
    (B = w.onKeyDown) == null || B.call(w, D);
    let W = D.nativeEvent.isComposing || D.keyCode === 229;
    if (!(D.defaultPrevented || W)) switch (D.key) {
      case "n":
      case "j": {
        b && D.ctrlKey && Z(D);
        break;
      }
      case "ArrowDown": {
        Z(D);
        break;
      }
      case "p":
      case "k": {
        b && D.ctrlKey && se(D);
        break;
      }
      case "ArrowUp": {
        se(D);
        break;
      }
      case "Home": {
        D.preventDefault(), F(0);
        break;
      }
      case "End": {
        D.preventDefault(), _();
        break;
      }
      case "Enter": {
        D.preventDefault();
        let U = Y();
        if (U) {
          let oe = new Event(ki);
          U.dispatchEvent(oe);
        }
      }
    }
  } }, c.createElement("label", { "cmdk-label": "", htmlFor: k.inputId, id: k.labelId, style: h1 }, l), Jo(e, (D) => c.createElement(Vh.Provider, { value: E }, c.createElement(Bh.Provider, { value: k }, D))));
}), n1 = c.forwardRef((e, t) => {
  var n, r;
  let o = Ce(), a = c.useRef(null), s = c.useContext(Hh), i = kr(), l = Uh(e), u = (r = (n = l.current) == null ? void 0 : n.forceMount) != null ? r : s == null ? void 0 : s.forceMount;
  tn(() => {
    if (!u) return i.item(o, s == null ? void 0 : s.id);
  }, [u]);
  let d = Gh(o, a, [e.value, e.children, a], e.keywords), f = ks(), h = zt((R) => R.value && R.value === d.current), g = zt((R) => u || i.filter() === !1 ? !0 : R.search ? R.filtered.items.get(o) > 0 : !0);
  c.useEffect(() => {
    let R = a.current;
    if (!(!R || e.disabled)) return R.addEventListener(ki, v), () => R.removeEventListener(ki, v);
  }, [g, e.onSelect, e.disabled]);
  function v() {
    var R, E;
    p(), (E = (R = l.current).onSelect) == null || E.call(R, d.current);
  }
  function p() {
    f.setState("value", d.current, !0);
  }
  if (!g) return null;
  let { disabled: b, value: w, onSelect: x, forceMount: y, keywords: S, ...C } = e;
  return c.createElement(K.div, { ref: yt(a, t), ...C, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!h, "data-disabled": !!b, "data-selected": !!h, onPointerMove: b || i.getDisablePointerSelection() ? void 0 : p, onClick: b ? void 0 : v }, e.children);
}), r1 = c.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = Ce(), i = c.useRef(null), l = c.useRef(null), u = Ce(), d = kr(), f = zt((g) => o || d.filter() === !1 ? !0 : g.search ? g.filtered.groups.has(s) : !0);
  tn(() => d.group(s), []), Gh(s, i, [e.value, e.heading, l]);
  let h = c.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return c.createElement(K.div, { ref: yt(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: f ? void 0 : !0 }, n && c.createElement("div", { ref: l, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, n), Jo(e, (g) => c.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? u : void 0 }, c.createElement(Hh.Provider, { value: h }, g))));
}), o1 = c.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = c.useRef(null), a = zt((s) => !s.search);
  return !n && !a ? null : c.createElement(K.div, { ref: yt(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), a1 = c.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = ks(), s = zt((u) => u.search), i = zt((u) => u.selectedItemId), l = kr();
  return c.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), c.createElement(K.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": l.listId, "aria-labelledby": l.labelId, "aria-activedescendant": i, id: l.inputId, type: "text", value: o ? e.value : s, onChange: (u) => {
    o || a.setState("search", u.target.value), n == null || n(u.target.value);
  } });
}), i1 = c.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = c.useRef(null), s = c.useRef(null), i = zt((u) => u.selectedItemId), l = kr();
  return c.useEffect(() => {
    if (s.current && a.current) {
      let u = s.current, d = a.current, f, h = new ResizeObserver(() => {
        f = requestAnimationFrame(() => {
          let g = u.offsetHeight;
          d.style.setProperty("--cmdk-list-height", g.toFixed(1) + "px");
        });
      });
      return h.observe(u), () => {
        cancelAnimationFrame(f), h.unobserve(u);
      };
    }
  }, []), c.createElement(K.div, { ref: yt(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: l.listId }, Jo(e, (u) => c.createElement("div", { ref: yt(s, l.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), s1 = c.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return c.createElement(Ai, { open: n, onOpenChange: r }, c.createElement(Ii, { container: s }, c.createElement(Li, { "cmdk-overlay": "", className: o }), c.createElement($i, { "aria-label": e.label, "cmdk-dialog": "", className: a }, c.createElement(Yh, { ref: t, ...i }))));
}), l1 = c.forwardRef((e, t) => zt((n) => n.filtered.count === 0) ? c.createElement(K.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), c1 = c.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return c.createElement(K.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Jo(e, (s) => c.createElement("div", { "aria-hidden": !0 }, s)));
}), on = Object.assign(Yh, { List: i1, Item: n1, Input: a1, Group: r1, Separator: o1, Dialog: s1, Empty: l1, Loading: c1 });
function u1(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function d1(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function Uh(e) {
  let t = c.useRef(e);
  return tn(() => {
    t.current = e;
  }), t;
}
var tn = typeof window > "u" ? c.useEffect : c.useLayoutEffect;
function bn(e) {
  let t = c.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function zt(e) {
  let t = ks(), n = () => e(t.snapshot());
  return c.useSyncExternalStore(t.subscribe, n, n);
}
function Gh(e, t, n, r = []) {
  let o = c.useRef(), a = kr();
  return tn(() => {
    var s;
    let i = (() => {
      var u;
      for (let d of n) {
        if (typeof d == "string") return d.trim();
        if (typeof d == "object" && "current" in d) return d.current ? (u = d.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), l = r.map((u) => u.trim());
    a.value(e, i, l), (s = t.current) == null || s.setAttribute(vn, i), o.current = i;
  }), o;
}
var f1 = () => {
  let [e, t] = c.useState(), n = bn(() => /* @__PURE__ */ new Map());
  return tn(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function m1(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Jo({ asChild: e, children: t }, n) {
  return e && c.isValidElement(t) ? c.cloneElement(m1(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var h1 = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function jh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    on,
    {
      "data-slot": "command",
      className: z(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        e
      ),
      ...t
    }
  );
}
function Kh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ m(wS, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ m(
          on.Input,
          {
            "data-slot": "command-input",
            className: z(
              "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              e
            ),
            ...t
          }
        )
      ]
    }
  );
}
function qh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    on.List,
    {
      "data-slot": "command-list",
      className: z(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...t
    }
  );
}
function Xh({
  ...e
}) {
  return /* @__PURE__ */ m(
    on.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function Ri({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    on.Group,
    {
      "data-slot": "command-group",
      className: z(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function p1({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    on.Separator,
    {
      "data-slot": "command-separator",
      className: z("-mx-1 h-px bg-border", e),
      ...t
    }
  );
}
function Mi({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    on.Item,
    {
      "data-slot": "command-item",
      className: z(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function g1({
  column: e,
  title: t,
  options: n,
  multiple: r
}) {
  const [o, a] = c.useState(!1), s = e == null ? void 0 : e.getFilterValue(), i = new Set(
    Array.isArray(s) ? s : []
  ), l = c.useCallback(
    (d, f) => {
      if (e)
        if (r) {
          const h = new Set(i);
          f ? h.delete(d.value) : h.add(d.value);
          const g = Array.from(h);
          e.setFilterValue(g.length ? g : void 0);
        } else
          e.setFilterValue(f ? void 0 : [d.value]), a(!1);
    },
    [e, r, i]
  ), u = c.useCallback(
    (d) => {
      d == null || d.stopPropagation(), e == null || e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ I(Xo, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ m(Zo, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          (i == null ? void 0 : i.size) > 0 ? /* @__PURE__ */ m(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: u,
              children: /* @__PURE__ */ m(gs, {})
            }
          ) : /* @__PURE__ */ m(dm, {}),
          t,
          (i == null ? void 0 : i.size) > 0 && /* @__PURE__ */ I(Ee, { children: [
            /* @__PURE__ */ m(
              vo,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            /* @__PURE__ */ m(
              xa,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal lg:hidden",
                children: i.size
              }
            ),
            /* @__PURE__ */ m("div", { className: "hidden items-center gap-1 lg:flex", children: i.size > 2 ? /* @__PURE__ */ I(
              xa,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: [
                  i.size,
                  " selected"
                ]
              }
            ) : n.filter((d) => i.has(d.value)).map((d) => /* @__PURE__ */ m(
              xa,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: d.label
              },
              d.value
            )) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ m(Qo, { className: "w-50 p-0", align: "start", children: /* @__PURE__ */ I(jh, { children: [
      /* @__PURE__ */ m(Kh, { placeholder: t }),
      /* @__PURE__ */ I(qh, { className: "max-h-full", children: [
        /* @__PURE__ */ m(Xh, { children: "No results found." }),
        /* @__PURE__ */ m(Ri, { className: "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", children: n.map((d) => {
          const f = i.has(d.value);
          return /* @__PURE__ */ I(
            Mi,
            {
              onSelect: () => l(d, f),
              children: [
                /* @__PURE__ */ m(
                  "div",
                  {
                    className: z(
                      "flex size-4 items-center justify-center rounded-sm border border-primary",
                      f ? "bg-primary" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ m(vt, {})
                  }
                ),
                d.icon && /* @__PURE__ */ m(d.icon, {}),
                /* @__PURE__ */ m("span", { className: "truncate", children: d.label }),
                d.count && /* @__PURE__ */ m("span", { className: "ml-auto font-mono text-xs", children: d.count })
              ]
            },
            d.value
          );
        }) }),
        i.size > 0 && /* @__PURE__ */ I(Ee, { children: [
          /* @__PURE__ */ m(p1, {}),
          /* @__PURE__ */ m(Ri, { children: /* @__PURE__ */ m(
            Mi,
            {
              onSelect: () => u(),
              className: "justify-center text-center",
              children: "Clear filters"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
}
function Ua({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ m(
    zw,
    {
      "data-slot": "label",
      className: z(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function v1({
  className: e,
  defaultValue: t,
  value: n,
  min: r = 0,
  max: o = 100,
  ...a
}) {
  const s = c.useMemo(
    () => Array.isArray(n) ? n : Array.isArray(t) ? t : [r, o],
    [n, t, r, o]
  );
  return /* @__PURE__ */ I(
    xx,
    {
      "data-slot": "slider",
      defaultValue: t,
      value: n,
      min: r,
      max: o,
      className: z(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ m(
          Sx,
          {
            "data-slot": "slider-track",
            className: z(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ m(
              Cx,
              {
                "data-slot": "slider-range",
                className: z(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: s.length }, (i, l) => /* @__PURE__ */ m(
          Ex,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          l
        ))
      ]
    }
  );
}
function b1(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && typeof e[1] == "number";
}
function w1(e) {
  if (Array.isArray(e) && e.length === 2 && e.every(
    (t) => (typeof t == "string" || typeof t == "number") && !Number.isNaN(t)
  ))
    return [Number(e[0]), Number(e[1])];
}
function y1({
  column: e,
  title: t
}) {
  var p, b, w, x;
  const n = c.useId(), r = w1(e.getFilterValue()), o = (p = e.columnDef.meta) == null ? void 0 : p.range, a = (b = e.columnDef.meta) == null ? void 0 : b.unit, { min: s, max: i, step: l } = c.useMemo(() => {
    let y = 0, S = 100;
    if (o && b1(o))
      [y, S] = o;
    else {
      const E = e.getFacetedMinMaxValues();
      if (E && Array.isArray(E) && E.length === 2) {
        const [k, M] = E;
        typeof k == "number" && typeof M == "number" && (y = k, S = M);
      }
    }
    const C = S - y, R = C <= 20 ? 1 : C <= 100 ? Math.ceil(C / 20) : Math.ceil(C / 50);
    return { min: y, max: S, step: R };
  }, [e, o]), u = c.useMemo(() => r ?? [s, i], [r, s, i]), d = c.useCallback((y) => y.toLocaleString(void 0, { maximumFractionDigits: 0 }), []), f = c.useCallback(
    (y) => {
      const S = Number(y.target.value);
      !Number.isNaN(S) && S >= s && S <= u[1] && e.setFilterValue([S, u[1]]);
    },
    [e, s, u]
  ), h = c.useCallback(
    (y) => {
      const S = Number(y.target.value);
      !Number.isNaN(S) && S <= i && S >= u[0] && e.setFilterValue([u[0], S]);
    },
    [e, i, u]
  ), g = c.useCallback(
    (y) => {
      Array.isArray(y) && y.length === 2 && e.setFilterValue(y);
    },
    [e]
  ), v = c.useCallback(
    (y) => {
      y.target instanceof HTMLDivElement && y.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ I(Xo, { children: [
    /* @__PURE__ */ m(Zo, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          r ? /* @__PURE__ */ m(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: v,
              children: /* @__PURE__ */ m(gs, {})
            }
          ) : /* @__PURE__ */ m(dm, {}),
          /* @__PURE__ */ m("span", { children: t }),
          r ? /* @__PURE__ */ I(Ee, { children: [
            /* @__PURE__ */ m(
              vo,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            d(r[0]),
            " -",
            " ",
            d(r[1]),
            a ? ` ${a}` : ""
          ] }) : null
        ]
      }
    ) }),
    /* @__PURE__ */ I(Qo, { align: "start", className: "flex w-auto flex-col gap-4", children: [
      /* @__PURE__ */ I("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ m("p", { className: "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: t }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ m(Ua, { htmlFor: `${n}-from`, className: "sr-only", children: "From" }),
          /* @__PURE__ */ I("div", { className: "relative", children: [
            /* @__PURE__ */ m(
              go,
              {
                id: `${n}-from`,
                type: "number",
                "aria-valuemin": s,
                "aria-valuemax": i,
                inputMode: "numeric",
                pattern: "[0-9]*",
                placeholder: s.toString(),
                min: s,
                max: i,
                value: (w = u[0]) == null ? void 0 : w.toString(),
                onChange: f,
                className: z("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ m("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] }),
          /* @__PURE__ */ m(Ua, { htmlFor: `${n}-to`, className: "sr-only", children: "to" }),
          /* @__PURE__ */ I("div", { className: "relative", children: [
            /* @__PURE__ */ m(
              go,
              {
                id: `${n}-to`,
                type: "number",
                "aria-valuemin": s,
                "aria-valuemax": i,
                inputMode: "numeric",
                pattern: "[0-9]*",
                placeholder: i.toString(),
                min: s,
                max: i,
                value: (x = u[1]) == null ? void 0 : x.toString(),
                onChange: h,
                className: z("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ m("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] })
        ] }),
        /* @__PURE__ */ I(Ua, { htmlFor: `${n}-slider`, className: "sr-only", children: [
          t,
          " slider"
        ] }),
        /* @__PURE__ */ m(
          v1,
          {
            id: `${n}-slider`,
            min: s,
            max: i,
            step: l,
            value: u,
            onValueChange: g
          }
        )
      ] }),
      /* @__PURE__ */ m(
        We,
        {
          "aria-label": `Clear ${t} filter`,
          variant: "outline",
          size: "sm",
          onClick: v,
          children: "Clear"
        }
      )
    ] })
  ] });
}
function x1({
  table: e,
  disabled: t,
  ...n
}) {
  const r = c.useMemo(
    () => e.getAllColumns().filter(
      (o) => typeof o.accessorFn < "u" && o.getCanHide()
    ),
    [e]
  );
  return /* @__PURE__ */ I(Xo, { children: [
    /* @__PURE__ */ m(Zo, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        "aria-label": "Toggle columns",
        role: "combobox",
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 font-normal lg:flex",
        disabled: t,
        children: [
          /* @__PURE__ */ m(fm, { className: "text-muted-foreground" }),
          "View"
        ]
      }
    ) }),
    /* @__PURE__ */ m(Qo, { className: "w-44 p-0", ...n, children: /* @__PURE__ */ I(jh, { children: [
      /* @__PURE__ */ m(Kh, { placeholder: "Search columns..." }),
      /* @__PURE__ */ I(qh, { children: [
        /* @__PURE__ */ m(Xh, { children: "No columns found." }),
        /* @__PURE__ */ m(Ri, { children: r.map((o) => {
          var a;
          return /* @__PURE__ */ I(
            Mi,
            {
              onSelect: () => o.toggleVisibility(!o.getIsVisible()),
              children: [
                /* @__PURE__ */ m("span", { className: "truncate", children: ((a = o.columnDef.meta) == null ? void 0 : a.label) ?? o.id }),
                /* @__PURE__ */ m(
                  vt,
                  {
                    className: z(
                      "ml-auto size-4 shrink-0",
                      o.getIsVisible() ? "opacity-100" : "opacity-0"
                    )
                  }
                )
              ]
            },
            o.id
          );
        }) })
      ] })
    ] }) })
  ] });
}
function YP({
  table: e,
  children: t,
  className: n,
  ...r
}) {
  const o = e.getState().columnFilters.length > 0, a = c.useMemo(
    () => e.getAllColumns().filter((i) => i.getCanFilter()),
    [e]
  ), s = c.useCallback(() => {
    e.resetColumnFilters();
  }, [e]);
  return /* @__PURE__ */ I(
    "div",
    {
      role: "toolbar",
      "aria-orientation": "horizontal",
      className: z(
        "flex w-full items-start justify-between gap-2 p-1",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ I("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
          a.map((i) => /* @__PURE__ */ m(S1, { column: i }, i.id)),
          o && /* @__PURE__ */ I(
            We,
            {
              "aria-label": "Reset filters",
              variant: "outline",
              size: "sm",
              className: "border-dashed",
              onClick: s,
              children: [
                /* @__PURE__ */ m(vs, {}),
                "Reset"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
          t,
          /* @__PURE__ */ m(x1, { table: e, align: "end" })
        ] })
      ]
    }
  );
}
function S1({
  column: e
}) {
  {
    const t = e.columnDef.meta;
    return c.useCallback(() => {
      if (!(t != null && t.variant)) return null;
      switch (t.variant) {
        case "text":
          return /* @__PURE__ */ m(
            go,
            {
              placeholder: t.placeholder ?? t.label,
              value: e.getFilterValue() ?? "",
              onChange: (r) => e.setFilterValue(r.target.value),
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "number":
          return /* @__PURE__ */ I("div", { className: "relative", children: [
            /* @__PURE__ */ m(
              go,
              {
                type: "number",
                inputMode: "numeric",
                placeholder: t.placeholder ?? t.label,
                value: e.getFilterValue() ?? "",
                onChange: (r) => e.setFilterValue(r.target.value),
                className: z("h-8 w-[120px]", t.unit && "pr-8")
              }
            ),
            t.unit && /* @__PURE__ */ m("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: t.unit })
          ] });
        case "range":
          return /* @__PURE__ */ m(
            y1,
            {
              column: e,
              title: t.label ?? e.id
            }
          );
        case "date":
        case "dateRange":
          return /* @__PURE__ */ m(
            YN,
            {
              column: e,
              title: t.label ?? e.id,
              multiple: t.variant === "dateRange"
            }
          );
        case "select":
        case "multiSelect":
          return /* @__PURE__ */ m(
            g1,
            {
              column: e,
              title: t.label ?? e.id,
              options: t.options ?? [],
              multiple: t.variant === "multiSelect"
            }
          );
        default:
          return null;
      }
    }, [e, t])();
  }
}
function UP({
  columnCount: e,
  rowCount: t = 10,
  filterCount: n = 0,
  cellWidths: r = ["auto"],
  withViewOptions: o = !0,
  withPagination: a = !0,
  shrinkZero: s = !1,
  className: i,
  ...l
}) {
  const u = Array.from(
    { length: e },
    (d, f) => r[f % r.length] ?? "auto"
  );
  return /* @__PURE__ */ I(
    "div",
    {
      className: z("flex w-full flex-col gap-2.5 overflow-auto", i),
      ...l,
      children: [
        /* @__PURE__ */ I("div", { className: "flex w-full items-center justify-between gap-2 overflow-auto p-1", children: [
          /* @__PURE__ */ m("div", { className: "flex flex-1 items-center gap-2", children: n > 0 ? Array.from({ length: n }).map((d, f) => /* @__PURE__ */ m(He, { className: "h-7 w-18 border-dashed" }, f)) : null }),
          o ? /* @__PURE__ */ m(He, { className: "ml-auto hidden h-7 w-18 lg:flex" }) : null
        ] }),
        /* @__PURE__ */ m("div", { className: "rounded-md border", children: /* @__PURE__ */ I(WE, { children: [
          /* @__PURE__ */ m(BE, { children: Array.from({ length: 1 }).map((d, f) => /* @__PURE__ */ m(Dl, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((h, g) => /* @__PURE__ */ m(
            HE,
            {
              style: {
                width: u[g],
                minWidth: s ? u[g] : "auto"
              },
              children: /* @__PURE__ */ m(He, { className: "h-6 w-full" })
            },
            g
          )) }, f)) }),
          /* @__PURE__ */ m(VE, { children: Array.from({ length: t }).map((d, f) => /* @__PURE__ */ m(Dl, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((h, g) => /* @__PURE__ */ m(
            YE,
            {
              style: {
                width: u[g],
                minWidth: s ? u[g] : "auto"
              },
              children: /* @__PURE__ */ m(He, { className: "h-6 w-full" })
            },
            g
          )) }, f)) })
        ] }) }),
        a ? /* @__PURE__ */ I("div", { className: "flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8", children: [
          /* @__PURE__ */ m(He, { className: "h-7 w-40 shrink-0" }),
          /* @__PURE__ */ I("div", { className: "flex items-center gap-4 sm:gap-6 lg:gap-8", children: [
            /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ m(He, { className: "h-7 w-24" }),
              /* @__PURE__ */ m(He, { className: "h-7 w-18" })
            ] }),
            /* @__PURE__ */ m("div", { className: "flex items-center justify-center font-medium text-sm", children: /* @__PURE__ */ m(He, { className: "h-7 w-20" }) }),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ m(He, { className: "hidden size-7 lg:block" }),
              /* @__PURE__ */ m(He, { className: "size-7" }),
              /* @__PURE__ */ m(He, { className: "size-7" }),
              /* @__PURE__ */ m(He, { className: "hidden size-7 lg:block" })
            ] })
          ] })
        ] }) : null
      ]
    }
  );
}
const GP = {
  filterVariants: [
    "text",
    "number",
    "range",
    "date",
    "dateRange",
    "boolean",
    "select",
    "multiSelect"
  ],
  operators: [
    "iLike",
    "notILike",
    "eq",
    "ne",
    "inArray",
    "notInArray",
    "isEmpty",
    "isNotEmpty",
    "lt",
    "lte",
    "gt",
    "gte",
    "isBetween",
    "isRelativeToToday"
  ],
  joinOperators: ["and", "or"]
};
export {
  RP as Avatar,
  NP as AvatarFallback,
  MP as AvatarImage,
  xa as Badge,
  We as Button,
  F1 as Card,
  H1 as CardAction,
  Y1 as CardContent,
  V1 as CardDescription,
  U1 as CardFooter,
  W1 as CardHeader,
  B1 as CardTitle,
  G1 as Checkbox,
  sk as DataGrid,
  lk as DataGridContainer,
  ik as DataGridProvider,
  dk as DataGridScrollArea,
  Fk as DataGridTable,
  VP as DataTable,
  HP as DataTableColumnHeader,
  g1 as DataTableFacetedFilter,
  Wk as DataTablePagination,
  UP as DataTableSkeleton,
  YP as DataTableToolbar,
  x1 as DataTableViewOptions,
  _P as Dialog,
  IP as DialogClose,
  LP as DialogContent,
  WP as DialogDescription,
  zP as DialogFooter,
  $P as DialogHeader,
  FP as DialogTitle,
  AP as DialogTrigger,
  q1 as Drawer,
  Z1 as DrawerClose,
  Q1 as DrawerContent,
  rP as DrawerDescription,
  tP as DrawerFooter,
  J1 as DrawerHandle,
  eP as DrawerHeader,
  LE as DrawerOverlay,
  IE as DrawerPortal,
  nP as DrawerTitle,
  X1 as DrawerTrigger,
  ZE as DropdownMenu,
  JE as DropdownMenuContent,
  pn as DropdownMenuItem,
  nk as DropdownMenuLabel,
  qr as DropdownMenuSeparator,
  QE as DropdownMenuTrigger,
  go as Input,
  BP as Kbd,
  kP as Progress,
  rh as Select,
  ih as SelectContent,
  aP as SelectGroup,
  sh as SelectItem,
  iP as SelectLabel,
  FE as SelectScrollDownButton,
  zE as SelectScrollUpButton,
  sP as SelectSeparator,
  ah as SelectTrigger,
  oh as SelectValue,
  vo as Separator,
  vP as Sheet,
  wP as SheetClose,
  yP as SheetContent,
  EP as SheetDescription,
  SP as SheetFooter,
  xP as SheetHeader,
  CP as SheetTitle,
  bP as SheetTrigger,
  lP as SimpleSelect,
  He as Skeleton,
  cP as Switch,
  WE as Table,
  VE as TableBody,
  dP as TableCaption,
  YE as TableCell,
  uP as TableFooter,
  HE as TableHead,
  BE as TableHeader,
  Dl as TableRow,
  fP as Tabs,
  pP as TabsContent,
  mP as TabsList,
  hP as TabsTrigger,
  gP as Textarea,
  DP as Tooltip,
  OP as TooltipContent,
  PP as TooltipProvider,
  TP as TooltipTrigger,
  $0 as badgeVariants,
  z0 as buttonVariants,
  le as cn,
  GP as dataTableConfig,
  UE as tabsListVariants,
  $E as useCallbackRef,
  xe as useDataGrid,
  oP as useDebouncedCallback
};
//# sourceMappingURL=index.mjs.map
