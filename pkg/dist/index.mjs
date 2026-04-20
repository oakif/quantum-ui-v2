import { jsx as u, Fragment as _e, jsxs as I } from "react/jsx-runtime";
import * as m from "react";
import N, { useState as Yt, useLayoutEffect as Qa, forwardRef as al, createElement as ba, useEffect as qn, useMemo as Vt, createContext as il, useContext as sl, useRef as ht, useCallback as Ae, memo as ll, Fragment as xm } from "react";
import * as qr from "react-dom";
import Sm from "react-dom";
function cl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = cl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Ja() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = cl(e)) && (r && (r += " "), r += t);
  return r;
}
const Ui = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ji = Ja, gn = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return ji(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((d) => {
    const c = n == null ? void 0 : n[d], f = a == null ? void 0 : a[d];
    if (c === null) return null;
    const h = Ui(c) || Ui(f);
    return o[d][h];
  }), i = n && Object.entries(n).reduce((d, c) => {
    let [f, h] = c;
    return h === void 0 || (d[f] = h), d;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, c) => {
    let { class: f, className: h, ...p } = c;
    return Object.entries(p).every((v) => {
      let [g, b] = v;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...i
      }[g]) : {
        ...a,
        ...i
      }[g] === b;
    }) ? [
      ...d,
      f,
      h
    ] : d;
  }, []);
  return ji(e, s, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
};
function Ki(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function bt(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Ki(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Ki(e[o], null);
        }
      };
  };
}
function ae(...e) {
  return m.useCallback(bt(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  const t = /* @__PURE__ */ Cm(e), n = m.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = m.Children.toArray(a), l = i.find(Em);
    if (l) {
      const d = l.props.children, c = i.map((f) => f === l ? m.Children.count(d) > 1 ? m.Children.only(null) : m.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: m.isValidElement(d) ? m.cloneElement(d, void 0, c) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var ei = /* @__PURE__ */ Dt("Slot");
// @__NO_SIDE_EFFECTS__
function Cm(e) {
  const t = m.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (m.isValidElement(o)) {
      const s = Mm(o), i = Rm(a, o.props);
      return o.type !== m.Fragment && (i.ref = r ? bt(r, s) : s), m.cloneElement(o, i);
    }
    return m.Children.count(o) > 1 ? m.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var dl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function km(e) {
  const t = ({ children: n }) => /* @__PURE__ */ u(_e, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = dl, t;
}
function Em(e) {
  return m.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === dl;
}
function Rm(e, t) {
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
function Mm(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Nm = [
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
], K = Nm.reduce((e, t) => {
  const n = /* @__PURE__ */ Dt(`Primitive.${t}`), r = m.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(l, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function ul(e, t) {
  e && qr.flushSync(() => e.dispatchEvent(t));
}
var fl = Object.freeze({
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
}), Dm = "VisuallyHidden", ml = m.forwardRef(
  (e, t) => /* @__PURE__ */ u(
    K.span,
    {
      ...e,
      ref: t,
      style: { ...fl, ...e.style }
    }
  )
);
ml.displayName = Dm;
var Pm = ml;
function Tm(e, t) {
  const n = m.createContext(t), r = (a) => {
    const { children: s, ...i } = a, l = m.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ u(n.Provider, { value: l, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = m.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function Le(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = m.createContext(s), l = n.length;
    n = [...n, s];
    const d = (f) => {
      var w;
      const { scope: h, children: p, ...v } = f, g = ((w = h == null ? void 0 : h[e]) == null ? void 0 : w[l]) || i, b = m.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ u(g.Provider, { value: b, children: p });
    };
    d.displayName = a + "Provider";
    function c(f, h) {
      var g;
      const p = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[l]) || i, v = m.useContext(p);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [d, c];
  }
  const o = () => {
    const a = n.map((s) => m.createContext(s));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return m.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, _m(o, ...t)];
}
function _m(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: l, scopeName: d }) => {
        const f = l(a)[`__scope${d}`];
        return { ...i, ...f };
      }, {});
      return m.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Xr(e) {
  const t = e + "CollectionProvider", [n, r] = Le(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: b, children: w } = g, x = N.useRef(null), y = N.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u(o, { scope: b, itemMap: y, collectionRef: x, children: w });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ Dt(i), d = N.forwardRef(
    (g, b) => {
      const { scope: w, children: x } = g, y = a(i, w), S = ae(b, y.collectionRef);
      return /* @__PURE__ */ u(l, { ref: S, children: x });
    }
  );
  d.displayName = i;
  const c = e + "CollectionItemSlot", f = "data-radix-collection-item", h = /* @__PURE__ */ Dt(c), p = N.forwardRef(
    (g, b) => {
      const { scope: w, children: x, ...y } = g, S = N.useRef(null), C = ae(b, S), R = a(c, w);
      return N.useEffect(() => (R.itemMap.set(S, { ref: S, ...y }), () => void R.itemMap.delete(S))), /* @__PURE__ */ u(h, { [f]: "", ref: C, children: x });
    }
  );
  p.displayName = c;
  function v(g) {
    const b = a(e + "CollectionConsumer", g);
    return N.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const y = Array.from(x.querySelectorAll(`[${f}]`));
      return Array.from(b.itemMap.values()).sort(
        (R, k) => y.indexOf(R.ref.current) - y.indexOf(k.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: p },
    v,
    r
  ];
}
function H(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
var ke = globalThis != null && globalThis.document ? m.useLayoutEffect : () => {
}, Om = m[" useInsertionEffect ".trim().toString()] || ke;
function Ge({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = Am({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const c = m.useRef(e !== void 0);
    m.useEffect(() => {
      const f = c.current;
      f !== i && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), c.current = i;
    }, [i, r]);
  }
  const d = m.useCallback(
    (c) => {
      var f;
      if (i) {
        const h = Im(c) ? c(e) : c;
        h !== e && ((f = s.current) == null || f.call(s, h));
      } else
        a(c);
    },
    [i, e, a, s]
  );
  return [l, d];
}
function Am({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = m.useState(e), o = m.useRef(n), a = m.useRef(t);
  return Om(() => {
    a.current = t;
  }, [t]), m.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function Im(e) {
  return typeof e == "function";
}
function Lm(e, t) {
  return m.useReducer((n, r) => t[n][r] ?? n, e);
}
var Oe = (e) => {
  const { present: t, children: n } = e, r = zm(t), o = typeof n == "function" ? n({ present: r.isPresent }) : m.Children.only(n), a = ae(r.ref, $m(o));
  return typeof n == "function" || r.isPresent ? m.cloneElement(o, { ref: a }) : null;
};
Oe.displayName = "Presence";
function zm(e) {
  const [t, n] = m.useState(), r = m.useRef(null), o = m.useRef(e), a = m.useRef("none"), s = e ? "mounted" : "unmounted", [i, l] = Lm(s, {
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
  return m.useEffect(() => {
    const d = wr(r.current);
    a.current = i === "mounted" ? d : "none";
  }, [i]), ke(() => {
    const d = r.current, c = o.current;
    if (c !== e) {
      const h = a.current, p = wr(d);
      e ? l("MOUNT") : p === "none" || (d == null ? void 0 : d.display) === "none" ? l("UNMOUNT") : l(c && h !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), ke(() => {
    if (t) {
      let d;
      const c = t.ownerDocument.defaultView ?? window, f = (p) => {
        const g = wr(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (l("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = c.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, h = (p) => {
        p.target === t && (a.current = wr(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        c.clearTimeout(d), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: m.useCallback((d) => {
      r.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function wr(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function $m(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Fm = m[" useId ".trim().toString()] || (() => {
}), Wm = 0;
function Ce(e) {
  const [t, n] = m.useState(Fm());
  return ke(() => {
    n((r) => r ?? String(Wm++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var Bm = m.createContext(void 0);
function vn(e) {
  const t = m.useContext(Bm);
  return e || t || "ltr";
}
function De(e) {
  const t = m.useRef(e);
  return m.useEffect(() => {
    t.current = e;
  }), m.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Hm(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = De(e);
  m.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Vm = "DismissableLayer", wa = "dismissableLayer.update", Ym = "dismissableLayer.pointerDownOutside", Gm = "dismissableLayer.focusOutside", qi, hl = m.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), bn = m.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...l
    } = e, d = m.useContext(hl), [c, f] = m.useState(null), h = (c == null ? void 0 : c.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, p] = m.useState({}), v = ae(t, (k) => f(k)), g = Array.from(d.layers), [b] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), w = g.indexOf(b), x = c ? g.indexOf(c) : -1, y = d.layersWithOutsidePointerEventsDisabled.size > 0, S = x >= w, C = Km((k) => {
      const E = k.target, M = [...d.branches].some((T) => T.contains(E));
      !S || M || (o == null || o(k), s == null || s(k), k.defaultPrevented || i == null || i());
    }, h), R = qm((k) => {
      const E = k.target;
      [...d.branches].some((T) => T.contains(E)) || (a == null || a(k), s == null || s(k), k.defaultPrevented || i == null || i());
    }, h);
    return Hm((k) => {
      x === d.layers.size - 1 && (r == null || r(k), !k.defaultPrevented && i && (k.preventDefault(), i()));
    }, h), m.useEffect(() => {
      if (c)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (qi = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(c)), d.layers.add(c), Xi(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = qi);
        };
    }, [c, h, n, d]), m.useEffect(() => () => {
      c && (d.layers.delete(c), d.layersWithOutsidePointerEventsDisabled.delete(c), Xi());
    }, [c, d]), m.useEffect(() => {
      const k = () => p({});
      return document.addEventListener(wa, k), () => document.removeEventListener(wa, k);
    }, []), /* @__PURE__ */ u(
      K.div,
      {
        ...l,
        ref: v,
        style: {
          pointerEvents: y ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: H(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: H(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: H(
          e.onPointerDownCapture,
          C.onPointerDownCapture
        )
      }
    );
  }
);
bn.displayName = Vm;
var Um = "DismissableLayerBranch", jm = m.forwardRef((e, t) => {
  const n = m.useContext(hl), r = m.useRef(null), o = ae(t, r);
  return m.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ u(K.div, { ...e, ref: o });
});
jm.displayName = Um;
function Km(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = De(e), r = m.useRef(!1), o = m.useRef(() => {
  });
  return m.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          pl(
            Ym,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: i };
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
function qm(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = De(e), r = m.useRef(!1);
  return m.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && pl(Gm, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Xi() {
  const e = new CustomEvent(wa);
  document.dispatchEvent(e);
}
function pl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? ul(o, a) : o.dispatchEvent(a);
}
var Bo = "focusScope.autoFocusOnMount", Ho = "focusScope.autoFocusOnUnmount", Zi = { bubbles: !1, cancelable: !0 }, Xm = "FocusScope", Xn = m.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, l] = m.useState(null), d = De(o), c = De(a), f = m.useRef(null), h = ae(t, (g) => l(g)), p = m.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  m.useEffect(() => {
    if (r) {
      let g = function(y) {
        if (p.paused || !i) return;
        const S = y.target;
        i.contains(S) ? f.current = S : Mt(f.current, { select: !0 });
      }, b = function(y) {
        if (p.paused || !i) return;
        const S = y.relatedTarget;
        S !== null && (i.contains(S) || Mt(f.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const C of y)
            C.removedNodes.length > 0 && Mt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const x = new MutationObserver(w);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, p.paused]), m.useEffect(() => {
    if (i) {
      Ji.add(p);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const w = new CustomEvent(Bo, Zi);
        i.addEventListener(Bo, d), i.dispatchEvent(w), w.defaultPrevented || (Zm(nh(gl(i)), { select: !0 }), document.activeElement === g && Mt(i));
      }
      return () => {
        i.removeEventListener(Bo, d), setTimeout(() => {
          const w = new CustomEvent(Ho, Zi);
          i.addEventListener(Ho, c), i.dispatchEvent(w), w.defaultPrevented || Mt(g ?? document.body, { select: !0 }), i.removeEventListener(Ho, c), Ji.remove(p);
        }, 0);
      };
    }
  }, [i, d, c, p]);
  const v = m.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, w = document.activeElement;
      if (b && w) {
        const x = g.currentTarget, [y, S] = Qm(x);
        y && S ? !g.shiftKey && w === S ? (g.preventDefault(), n && Mt(y, { select: !0 })) : g.shiftKey && w === y && (g.preventDefault(), n && Mt(S, { select: !0 })) : w === x && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ u(K.div, { tabIndex: -1, ...s, ref: h, onKeyDown: v });
});
Xn.displayName = Xm;
function Zm(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Mt(r, { select: t }), document.activeElement !== n) return;
}
function Qm(e) {
  const t = gl(e), n = Qi(t, e), r = Qi(t.reverse(), e);
  return [n, r];
}
function gl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Qi(e, t) {
  for (const n of e)
    if (!Jm(n, { upTo: t })) return n;
}
function Jm(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function eh(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Mt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && eh(e) && t && e.select();
  }
}
var Ji = th();
function th() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = es(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = es(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function es(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function nh(e) {
  return e.filter((t) => t.tagName !== "A");
}
var rh = "Portal", wn = m.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = m.useState(!1);
  ke(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? Sm.createPortal(/* @__PURE__ */ u(K.div, { ...r, ref: t }), s) : null;
});
wn.displayName = rh;
var Vo = 0;
function Zr() {
  m.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ts()), document.body.insertAdjacentElement("beforeend", e[1] ?? ts()), Vo++, () => {
      Vo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Vo--;
    };
  }, []);
}
function ts() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var rt = function() {
  return rt = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, rt.apply(this, arguments);
};
function vl(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function oh(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Or = "right-scroll-bar-position", Ar = "width-before-scroll-bar", ah = "with-scroll-bars-hidden", ih = "--removed-body-scroll-bar-size";
function Yo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function sh(e, t) {
  var n = Yt(function() {
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
var lh = typeof window < "u" ? m.useLayoutEffect : m.useEffect, ns = /* @__PURE__ */ new WeakMap();
function ch(e, t) {
  var n = sh(null, function(r) {
    return e.forEach(function(o) {
      return Yo(o, r);
    });
  });
  return lh(function() {
    var r = ns.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Yo(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Yo(i, s);
      });
    }
    ns.set(n, e);
  }, [e]), n;
}
function dh(e) {
  return e;
}
function uh(e, t) {
  t === void 0 && (t = dh);
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
        var c = s;
        s = [], c.forEach(a);
      }, d = function() {
        return Promise.resolve().then(l);
      };
      d(), n = {
        push: function(c) {
          s.push(c), d();
        },
        filter: function(c) {
          return s = s.filter(c), n;
        }
      };
    }
  };
  return o;
}
function fh(e) {
  e === void 0 && (e = {});
  var t = uh(null);
  return t.options = rt({ async: !0, ssr: !1 }, e), t;
}
var bl = function(e) {
  var t = e.sideCar, n = vl(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return m.createElement(r, rt({}, n));
};
bl.isSideCarExport = !0;
function mh(e, t) {
  return e.useMedium(t), bl;
}
var wl = fh(), Go = function() {
}, Qr = m.forwardRef(function(e, t) {
  var n = m.useRef(null), r = m.useState({
    onScrollCapture: Go,
    onWheelCapture: Go,
    onTouchMoveCapture: Go
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, l = e.className, d = e.removeScrollBar, c = e.enabled, f = e.shards, h = e.sideCar, p = e.noRelative, v = e.noIsolation, g = e.inert, b = e.allowPinchZoom, w = e.as, x = w === void 0 ? "div" : w, y = e.gapMode, S = vl(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), C = h, R = ch([n, t]), k = rt(rt({}, S), o);
  return m.createElement(
    m.Fragment,
    null,
    c && m.createElement(C, { sideCar: wl, removeScrollBar: d, shards: f, noRelative: p, noIsolation: v, inert: g, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    s ? m.cloneElement(m.Children.only(i), rt(rt({}, k), { ref: R })) : m.createElement(x, rt({}, k, { className: l, ref: R }), i)
  );
});
Qr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Qr.classNames = {
  fullWidth: Ar,
  zeroRight: Or
};
var hh = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function ph() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = hh();
  return t && e.setAttribute("nonce", t), e;
}
function gh(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function vh(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var bh = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = ph()) && (gh(t, n), vh(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, wh = function() {
  var e = bh();
  return function(t, n) {
    m.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, yl = function() {
  var e = wh(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, yh = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Uo = function(e) {
  return parseInt(e || "", 10) || 0;
}, xh = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Uo(n), Uo(r), Uo(o)];
}, Sh = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return yh;
  var t = xh(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Ch = yl(), cn = "data-scroll-locked", kh = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(ah, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(cn, `] {
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
  
  .`).concat(Or, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Ar, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Or, " .").concat(Or, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Ar, " .").concat(Ar, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(cn, `] {
    `).concat(ih, ": ").concat(i, `px;
  }
`);
}, rs = function() {
  var e = parseInt(document.body.getAttribute(cn) || "0", 10);
  return isFinite(e) ? e : 0;
}, Eh = function() {
  m.useEffect(function() {
    return document.body.setAttribute(cn, (rs() + 1).toString()), function() {
      var e = rs() - 1;
      e <= 0 ? document.body.removeAttribute(cn) : document.body.setAttribute(cn, e.toString());
    };
  }, []);
}, Rh = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Eh();
  var a = m.useMemo(function() {
    return Sh(o);
  }, [o]);
  return m.createElement(Ch, { styles: kh(a, !t, o, n ? "" : "!important") });
}, ya = !1;
if (typeof window < "u")
  try {
    var yr = Object.defineProperty({}, "passive", {
      get: function() {
        return ya = !0, !0;
      }
    });
    window.addEventListener("test", yr, yr), window.removeEventListener("test", yr, yr);
  } catch {
    ya = !1;
  }
var en = ya ? { passive: !1 } : !1, Mh = function(e) {
  return e.tagName === "TEXTAREA";
}, xl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Mh(e) && n[t] === "visible")
  );
}, Nh = function(e) {
  return xl(e, "overflowY");
}, Dh = function(e) {
  return xl(e, "overflowX");
}, os = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Sl(e, r);
    if (o) {
      var a = Cl(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ph = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Th = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Sl = function(e, t) {
  return e === "v" ? Nh(t) : Dh(t);
}, Cl = function(e, t) {
  return e === "v" ? Ph(t) : Th(t);
}, _h = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Oh = function(e, t, n, r, o) {
  var a = _h(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, l = t.contains(i), d = !1, c = s > 0, f = 0, h = 0;
  do {
    if (!i)
      break;
    var p = Cl(e, i), v = p[0], g = p[1], b = p[2], w = g - b - a * v;
    (v || w) && Sl(e, i) && (f += w, h += v);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (c && Math.abs(f) < 1 || !c && Math.abs(h) < 1) && (d = !0), d;
}, xr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, as = function(e) {
  return [e.deltaX, e.deltaY];
}, is = function(e) {
  return e && "current" in e ? e.current : e;
}, Ah = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Ih = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Lh = 0, tn = [];
function zh(e) {
  var t = m.useRef([]), n = m.useRef([0, 0]), r = m.useRef(), o = m.useState(Lh++)[0], a = m.useState(yl)[0], s = m.useRef(e);
  m.useEffect(function() {
    s.current = e;
  }, [e]), m.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = oh([e.lockRef.current], (e.shards || []).map(is), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = m.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var w = xr(g), x = n.current, y = "deltaX" in g ? g.deltaX : x[0] - w[0], S = "deltaY" in g ? g.deltaY : x[1] - w[1], C, R = g.target, k = Math.abs(y) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && k === "h" && R.type === "range")
      return !1;
    var E = os(k, R);
    if (!E)
      return !0;
    if (E ? C = k : (C = k === "v" ? "h" : "v", E = os(k, R)), !E)
      return !1;
    if (!r.current && "changedTouches" in g && (y || S) && (r.current = C), !C)
      return !0;
    var M = r.current || C;
    return Oh(M, b, g, M === "h" ? y : S);
  }, []), l = m.useCallback(function(g) {
    var b = g;
    if (!(!tn.length || tn[tn.length - 1] !== a)) {
      var w = "deltaY" in b ? as(b) : xr(b), x = t.current.filter(function(C) {
        return C.name === b.type && (C.target === b.target || b.target === C.shadowParent) && Ah(C.delta, w);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var y = (s.current.shards || []).map(is).filter(Boolean).filter(function(C) {
          return C.contains(b.target);
        }), S = y.length > 0 ? i(b, y[0]) : !s.current.noIsolation;
        S && b.cancelable && b.preventDefault();
      }
    }
  }, []), d = m.useCallback(function(g, b, w, x) {
    var y = { name: g, delta: b, target: w, should: x, shadowParent: $h(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== y;
      });
    }, 1);
  }, []), c = m.useCallback(function(g) {
    n.current = xr(g), r.current = void 0;
  }, []), f = m.useCallback(function(g) {
    d(g.type, as(g), g.target, i(g, e.lockRef.current));
  }, []), h = m.useCallback(function(g) {
    d(g.type, xr(g), g.target, i(g, e.lockRef.current));
  }, []);
  m.useEffect(function() {
    return tn.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, en), document.addEventListener("touchmove", l, en), document.addEventListener("touchstart", c, en), function() {
      tn = tn.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", l, en), document.removeEventListener("touchmove", l, en), document.removeEventListener("touchstart", c, en);
    };
  }, []);
  var p = e.removeScrollBar, v = e.inert;
  return m.createElement(
    m.Fragment,
    null,
    v ? m.createElement(a, { styles: Ih(o) }) : null,
    p ? m.createElement(Rh, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function $h(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Fh = mh(wl, zh);
var Zn = m.forwardRef(function(e, t) {
  return m.createElement(Qr, rt({}, e, { ref: t, sideCar: Fh }));
});
Zn.classNames = Qr.classNames;
var Wh = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, nn = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), Cr = {}, jo = 0, kl = function(e) {
  return e && (e.host || kl(e.parentNode));
}, Bh = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = kl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Hh = function(e, t, n, r) {
  var o = Bh(t, Array.isArray(e) ? e : [e]);
  Cr[n] || (Cr[n] = /* @__PURE__ */ new WeakMap());
  var a = Cr[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(o), d = function(f) {
    !f || i.has(f) || (i.add(f), d(f.parentNode));
  };
  o.forEach(d);
  var c = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(h) {
      if (i.has(h))
        c(h);
      else
        try {
          var p = h.getAttribute(r), v = p !== null && p !== "false", g = (nn.get(h) || 0) + 1, b = (a.get(h) || 0) + 1;
          nn.set(h, g), a.set(h, b), s.push(h), g === 1 && v && Sr.set(h, !0), b === 1 && h.setAttribute(n, "true"), v || h.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", h, w);
        }
    });
  };
  return c(t), i.clear(), jo++, function() {
    s.forEach(function(f) {
      var h = nn.get(f) - 1, p = a.get(f) - 1;
      nn.set(f, h), a.set(f, p), h || (Sr.has(f) || f.removeAttribute(r), Sr.delete(f)), p || f.removeAttribute(n);
    }), jo--, jo || (nn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), Cr = {});
  };
}, Jr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Wh(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Hh(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, eo = "Dialog", [El, fR] = Le(eo), [Vh, Qe] = El(eo), Rl = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = m.useRef(null), l = m.useRef(null), [d, c] = Ge({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: eo
  });
  return /* @__PURE__ */ u(
    Vh,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Ce(),
      titleId: Ce(),
      descriptionId: Ce(),
      open: d,
      onOpenChange: c,
      onOpenToggle: m.useCallback(() => c((f) => !f), [c]),
      modal: s,
      children: n
    }
  );
};
Rl.displayName = eo;
var Ml = "DialogTrigger", Nl = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(Ml, n), a = ae(t, o.triggerRef);
    return /* @__PURE__ */ u(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": ri(o.open),
        ...r,
        ref: a,
        onClick: H(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Nl.displayName = Ml;
var ti = "DialogPortal", [Yh, Dl] = El(ti, {
  forceMount: void 0
}), Pl = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Qe(ti, t);
  return /* @__PURE__ */ u(Yh, { scope: t, forceMount: n, children: m.Children.map(r, (s) => /* @__PURE__ */ u(Oe, { present: n || a.open, children: /* @__PURE__ */ u(wn, { asChild: !0, container: o, children: s }) })) });
};
Pl.displayName = ti;
var Lr = "DialogOverlay", Tl = m.forwardRef(
  (e, t) => {
    const n = Dl(Lr, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Qe(Lr, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ u(Oe, { present: r || a.open, children: /* @__PURE__ */ u(Uh, { ...o, ref: t }) }) : null;
  }
);
Tl.displayName = Lr;
var Gh = /* @__PURE__ */ Dt("DialogOverlay.RemoveScroll"), Uh = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(Lr, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u(Zn, { as: Gh, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ u(
        K.div,
        {
          "data-state": ri(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Gt = "DialogContent", _l = m.forwardRef(
  (e, t) => {
    const n = Dl(Gt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Qe(Gt, e.__scopeDialog);
    return /* @__PURE__ */ u(Oe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ u(jh, { ...o, ref: t }) : /* @__PURE__ */ u(Kh, { ...o, ref: t }) });
  }
);
_l.displayName = Gt;
var jh = m.forwardRef(
  (e, t) => {
    const n = Qe(Gt, e.__scopeDialog), r = m.useRef(null), o = ae(t, n.contentRef, r);
    return m.useEffect(() => {
      const a = r.current;
      if (a) return Jr(a);
    }, []), /* @__PURE__ */ u(
      Ol,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: H(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: H(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: H(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Kh = m.forwardRef(
  (e, t) => {
    const n = Qe(Gt, e.__scopeDialog), r = m.useRef(!1), o = m.useRef(!1);
    return /* @__PURE__ */ u(
      Ol,
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
          var l, d;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Ol = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Qe(Gt, n), l = m.useRef(null), d = ae(t, l);
    return Zr(), /* @__PURE__ */ I(_e, { children: [
      /* @__PURE__ */ u(
        Xn,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ u(
            bn,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": ri(i.open),
              ...s,
              ref: d,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ I(_e, { children: [
        /* @__PURE__ */ u(qh, { titleId: i.titleId }),
        /* @__PURE__ */ u(Zh, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), ni = "DialogTitle", Al = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(ni, n);
    return /* @__PURE__ */ u(K.h2, { id: o.titleId, ...r, ref: t });
  }
);
Al.displayName = ni;
var Il = "DialogDescription", Ll = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(Il, n);
    return /* @__PURE__ */ u(K.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Ll.displayName = Il;
var zl = "DialogClose", $l = m.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Qe(zl, n);
    return /* @__PURE__ */ u(
      K.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: H(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
$l.displayName = zl;
function ri(e) {
  return e ? "open" : "closed";
}
var Fl = "DialogTitleWarning", [mR, Wl] = Tm(Fl, {
  contentName: Gt,
  titleName: ni,
  docsSlug: "dialog"
}), qh = ({ titleId: e }) => {
  const t = Wl(Fl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return m.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, Xh = "DialogDescriptionWarning", Zh = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Wl(Xh).contentName}}.`;
  return m.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, to = Rl, oi = Nl, no = Pl, ro = Tl, oo = _l, ai = Al, ii = Ll, yn = $l, kr = { exports: {} }, Ko = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ss;
function Qh() {
  if (ss) return Ko;
  ss = 1;
  var e = N;
  function t(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, o = e.useEffect, a = e.useLayoutEffect, s = e.useDebugValue;
  function i(f, h) {
    var p = h(), v = r({ inst: { value: p, getSnapshot: h } }), g = v[0].inst, b = v[1];
    return a(
      function() {
        g.value = p, g.getSnapshot = h, l(g) && b({ inst: g });
      },
      [f, p, h]
    ), o(
      function() {
        return l(g) && b({ inst: g }), f(function() {
          l(g) && b({ inst: g });
        });
      },
      [f]
    ), s(p), p;
  }
  function l(f) {
    var h = f.getSnapshot;
    f = f.value;
    try {
      var p = h();
      return !n(f, p);
    } catch {
      return !0;
    }
  }
  function d(f, h) {
    return h();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? d : i;
  return Ko.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, Ko;
}
var qo = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ls;
function Jh() {
  return ls || (ls = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(p, v) {
      return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
    }
    function t(p, v) {
      c || o.startTransition === void 0 || (c = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var g = v();
      if (!f) {
        var b = v();
        a(g, b) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), f = !0);
      }
      b = s({
        inst: { value: g, getSnapshot: v }
      });
      var w = b[0].inst, x = b[1];
      return l(
        function() {
          w.value = g, w.getSnapshot = v, n(w) && x({ inst: w });
        },
        [p, g, v]
      ), i(
        function() {
          return n(w) && x({ inst: w }), p(function() {
            n(w) && x({ inst: w });
          });
        },
        [p]
      ), d(g), g;
    }
    function n(p) {
      var v = p.getSnapshot;
      p = p.value;
      try {
        var g = v();
        return !a(p, g);
      } catch {
        return !0;
      }
    }
    function r(p, v) {
      return v();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var o = N, a = typeof Object.is == "function" ? Object.is : e, s = o.useState, i = o.useEffect, l = o.useLayoutEffect, d = o.useDebugValue, c = !1, f = !1, h = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    qo.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), qo;
}
var cs;
function ep() {
  return cs || (cs = 1, process.env.NODE_ENV === "production" ? kr.exports = Qh() : kr.exports = Jh()), kr.exports;
}
var tp = ep();
function np() {
  return tp.useSyncExternalStore(
    rp,
    () => !0,
    () => !1
  );
}
function rp() {
  return () => {
  };
}
var si = "Avatar", [op, hR] = Le(si), [ap, Bl] = op(si), Hl = m.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...r } = e, [o, a] = m.useState("idle");
    return /* @__PURE__ */ u(
      ap,
      {
        scope: n,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ u(K.span, { ...r, ref: t })
      }
    );
  }
);
Hl.displayName = si;
var Vl = "AvatarImage", Yl = m.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {
    }, ...a } = e, s = Bl(Vl, n), i = ip(r, a), l = De((d) => {
      o(d), s.onImageLoadingStatusChange(d);
    });
    return ke(() => {
      i !== "idle" && l(i);
    }, [i, l]), i === "loaded" ? /* @__PURE__ */ u(K.img, { ...a, ref: t, src: r }) : null;
  }
);
Yl.displayName = Vl;
var Gl = "AvatarFallback", Ul = m.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e, a = Bl(Gl, n), [s, i] = m.useState(r === void 0);
    return m.useEffect(() => {
      if (r !== void 0) {
        const l = window.setTimeout(() => i(!0), r);
        return () => window.clearTimeout(l);
      }
    }, [r]), s && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ u(K.span, { ...o, ref: t }) : null;
  }
);
Ul.displayName = Gl;
function ds(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function ip(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = np(), o = m.useRef(null), a = r ? (o.current || (o.current = new window.Image()), o.current) : null, [s, i] = m.useState(
    () => ds(a, e)
  );
  return ke(() => {
    i(ds(a, e));
  }, [a, e]), ke(() => {
    const l = (f) => () => {
      i(f);
    };
    if (!a) return;
    const d = l("loaded"), c = l("error");
    return a.addEventListener("load", d), a.addEventListener("error", c), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
      a.removeEventListener("load", d), a.removeEventListener("error", c);
    };
  }, [a, n, t]), s;
}
var sp = Hl, lp = Yl, cp = Ul;
function ao(e) {
  const t = m.useRef({ value: e, previous: e });
  return m.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function io(e) {
  const [t, n] = m.useState(void 0);
  return ke(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const l = a.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          s = d.inlineSize, i = d.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var so = "Checkbox", [dp, pR] = Le(so), [up, li] = dp(so);
function fp(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: l,
    required: d,
    value: c = "on",
    // @ts-expect-error
    internal_do_not_use_render: f
  } = e, [h, p] = Ge({
    prop: n,
    defaultProp: o ?? !1,
    onChange: l,
    caller: so
  }), [v, g] = m.useState(null), [b, w] = m.useState(null), x = m.useRef(!1), y = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: h,
    disabled: a,
    setChecked: p,
    control: v,
    setControl: g,
    name: i,
    form: s,
    value: c,
    hasConsumerStoppedPropagationRef: x,
    required: d,
    defaultChecked: Nt(o) ? !1 : o,
    isFormControl: y,
    bubbleInput: b,
    setBubbleInput: w
  };
  return /* @__PURE__ */ u(
    up,
    {
      scope: t,
      ...S,
      children: mp(f) ? f(S) : r
    }
  );
}
var jl = "CheckboxTrigger", Kl = m.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: l,
      required: d,
      setControl: c,
      setChecked: f,
      hasConsumerStoppedPropagationRef: h,
      isFormControl: p,
      bubbleInput: v
    } = li(jl, e), g = ae(o, c), b = m.useRef(l);
    return m.useEffect(() => {
      const w = a == null ? void 0 : a.form;
      if (w) {
        const x = () => f(b.current);
        return w.addEventListener("reset", x), () => w.removeEventListener("reset", x);
      }
    }, [a, f]), /* @__PURE__ */ u(
      K.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": Nt(l) ? "mixed" : l,
        "aria-required": d,
        "data-state": ec(l),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: H(t, (w) => {
          w.key === "Enter" && w.preventDefault();
        }),
        onClick: H(n, (w) => {
          f((x) => Nt(x) ? !0 : !x), v && p && (h.current = w.isPropagationStopped(), h.current || w.stopPropagation());
        })
      }
    );
  }
);
Kl.displayName = jl;
var ql = m.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l,
      onCheckedChange: d,
      form: c,
      ...f
    } = e;
    return /* @__PURE__ */ u(
      fp,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: d,
        name: r,
        form: c,
        value: l,
        internal_do_not_use_render: ({ isFormControl: h }) => /* @__PURE__ */ I(_e, { children: [
          /* @__PURE__ */ u(
            Kl,
            {
              ...f,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          h && /* @__PURE__ */ u(
            Jl,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
ql.displayName = so;
var Xl = "CheckboxIndicator", Zl = m.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = li(Xl, n);
    return /* @__PURE__ */ u(
      Oe,
      {
        present: r || Nt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ u(
          K.span,
          {
            "data-state": ec(a.checked),
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
Zl.displayName = Xl;
var Ql = "CheckboxBubbleInput", Jl = m.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: l,
      name: d,
      value: c,
      form: f,
      bubbleInput: h,
      setBubbleInput: p
    } = li(Ql, e), v = ae(n, p), g = ao(a), b = io(r);
    m.useEffect(() => {
      const x = h;
      if (!x) return;
      const y = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(
        y,
        "checked"
      ).set, R = !o.current;
      if (g !== a && C) {
        const k = new Event("click", { bubbles: R });
        x.indeterminate = Nt(a), C.call(x, Nt(a) ? !1 : a), x.dispatchEvent(k);
      }
    }, [h, g, a, o]);
    const w = m.useRef(Nt(a) ? !1 : a);
    return /* @__PURE__ */ u(
      K.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? w.current,
        required: i,
        disabled: l,
        name: d,
        value: c,
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
Jl.displayName = Ql;
function mp(e) {
  return typeof e == "function";
}
function Nt(e) {
  return e === "indeterminate";
}
function ec(e) {
  return Nt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const hp = ["top", "right", "bottom", "left"], Pt = Math.min, Fe = Math.max, zr = Math.round, Er = Math.floor, it = (e) => ({
  x: e,
  y: e
}), pp = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, gp = {
  start: "end",
  end: "start"
};
function xa(e, t, n) {
  return Fe(e, Pt(t, n));
}
function wt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function yt(e) {
  return e.split("-")[0];
}
function xn(e) {
  return e.split("-")[1];
}
function ci(e) {
  return e === "x" ? "y" : "x";
}
function di(e) {
  return e === "y" ? "height" : "width";
}
const vp = /* @__PURE__ */ new Set(["top", "bottom"]);
function ot(e) {
  return vp.has(yt(e)) ? "y" : "x";
}
function ui(e) {
  return ci(ot(e));
}
function bp(e, t, n) {
  n === void 0 && (n = !1);
  const r = xn(e), o = ui(e), a = di(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = $r(s)), [s, $r(s)];
}
function wp(e) {
  const t = $r(e);
  return [Sa(e), t, Sa(t)];
}
function Sa(e) {
  return e.replace(/start|end/g, (t) => gp[t]);
}
const us = ["left", "right"], fs = ["right", "left"], yp = ["top", "bottom"], xp = ["bottom", "top"];
function Sp(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? fs : us : t ? us : fs;
    case "left":
    case "right":
      return t ? yp : xp;
    default:
      return [];
  }
}
function Cp(e, t, n, r) {
  const o = xn(e);
  let a = Sp(yt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Sa)))), a;
}
function $r(e) {
  return e.replace(/left|right|bottom|top/g, (t) => pp[t]);
}
function kp(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function tc(e) {
  return typeof e != "number" ? kp(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Fr(e) {
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
function ms(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = ot(t), s = ui(t), i = di(s), l = yt(t), d = a === "y", c = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, h = r[i] / 2 - o[i] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: c,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (xn(t)) {
    case "start":
      p[s] -= h * (n && d ? -1 : 1);
      break;
    case "end":
      p[s] += h * (n && d ? -1 : 1);
      break;
  }
  return p;
}
const Ep = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: c,
    y: f
  } = ms(d, r, l), h = r, p = {}, v = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: w
    } = i[g], {
      x,
      y,
      data: S,
      reset: C
    } = await w({
      x: c,
      y: f,
      initialPlacement: r,
      placement: h,
      strategy: o,
      middlewareData: p,
      rects: d,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = x ?? c, f = y ?? f, p = {
      ...p,
      [b]: {
        ...p[b],
        ...S
      }
    }, C && v <= 50 && (v++, typeof C == "object" && (C.placement && (h = C.placement), C.rects && (d = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: c,
      y: f
    } = ms(d, h, l)), g = -1);
  }
  return {
    x: c,
    y: f,
    placement: h,
    strategy: o,
    middlewareData: p
  };
};
async function Bn(e, t) {
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
    boundary: d = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: f = "floating",
    altBoundary: h = !1,
    padding: p = 0
  } = wt(t, e), v = tc(p), b = i[h ? f === "floating" ? "reference" : "floating" : f], w = Fr(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: d,
    rootBoundary: c,
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
  }, C = Fr(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const Rp = (e) => ({
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
      element: d,
      padding: c = 0
    } = wt(e, t) || {};
    if (d == null)
      return {};
    const f = tc(c), h = {
      x: n,
      y: r
    }, p = ui(o), v = di(p), g = await s.getDimensions(d), b = p === "y", w = b ? "top" : "left", x = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", S = a.reference[v] + a.reference[p] - h[p] - a.floating[v], C = h[p] - a.reference[p], R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
    let k = R ? R[y] : 0;
    (!k || !await (s.isElement == null ? void 0 : s.isElement(R))) && (k = i.floating[y] || a.floating[v]);
    const E = S / 2 - C / 2, M = k / 2 - g[v] / 2 - 1, T = Pt(f[w], M), _ = Pt(f[x], M), L = T, A = k - g[v] - _, Y = k / 2 - g[v] / 2 + E, j = xa(L, Y, A), F = !l.arrow && xn(o) != null && Y !== j && a.reference[v] / 2 - (Y < L ? T : _) - g[v] / 2 < 0, U = F ? Y < L ? Y - L : Y - A : 0;
    return {
      [p]: h[p] + U,
      data: {
        [p]: j,
        centerOffset: Y - j - U,
        ...F && {
          alignmentOffset: U
        }
      },
      reset: F
    };
  }
}), Mp = function(e) {
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
        elements: d
      } = t, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: h,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...b
      } = wt(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const w = yt(o), x = ot(i), y = yt(i) === i, S = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), C = h || (y || !g ? [$r(i)] : wp(i)), R = v !== "none";
      !h && R && C.push(...Cp(i, g, v, S));
      const k = [i, ...C], E = await Bn(t, b), M = [];
      let T = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (c && M.push(E[w]), f) {
        const Y = bp(o, s, S);
        M.push(E[Y[0]], E[Y[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: M
      }], !M.every((Y) => Y <= 0)) {
        var _, L;
        const Y = (((_ = a.flip) == null ? void 0 : _.index) || 0) + 1, j = k[Y];
        if (j && (!(f === "alignment" ? x !== ot(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((D) => ot(D.placement) === x ? D.overflows[0] > 0 : !0)))
          return {
            data: {
              index: Y,
              overflows: T
            },
            reset: {
              placement: j
            }
          };
        let F = (L = T.filter((U) => U.overflows[0] <= 0).sort((U, D) => U.overflows[1] - D.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!F)
          switch (p) {
            case "bestFit": {
              var A;
              const U = (A = T.filter((D) => {
                if (R) {
                  const O = ot(D.placement);
                  return O === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  O === "y";
                }
                return !0;
              }).map((D) => [D.placement, D.overflows.filter((O) => O > 0).reduce((O, Z) => O + Z, 0)]).sort((D, O) => D[1] - O[1])[0]) == null ? void 0 : A[0];
              U && (F = U);
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
function hs(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ps(e) {
  return hp.some((t) => e[t] >= 0);
}
const Np = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = wt(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await Bn(t, {
            ...o,
            elementContext: "reference"
          }), s = hs(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: ps(s)
            }
          };
        }
        case "escaped": {
          const a = await Bn(t, {
            ...o,
            altBoundary: !0
          }), s = hs(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: ps(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, nc = /* @__PURE__ */ new Set(["left", "top"]);
async function Dp(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = yt(n), i = xn(n), l = ot(n) === "y", d = nc.has(s) ? -1 : 1, c = a && l ? -1 : 1, f = wt(t, e);
  let {
    mainAxis: h,
    crossAxis: p,
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
  return i && typeof v == "number" && (p = i === "end" ? v * -1 : v), l ? {
    x: p * c,
    y: h * d
  } : {
    x: h * d,
    y: p * c
  };
}
const Pp = function(e) {
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
      } = t, l = await Dp(t, e);
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
}, Tp = function(e) {
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
      } = wt(e, t), d = {
        x: n,
        y: r
      }, c = await Bn(t, l), f = ot(yt(o)), h = ci(f);
      let p = d[h], v = d[f];
      if (a) {
        const b = h === "y" ? "top" : "left", w = h === "y" ? "bottom" : "right", x = p + c[b], y = p - c[w];
        p = xa(x, p, y);
      }
      if (s) {
        const b = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", x = v + c[b], y = v - c[w];
        v = xa(x, v, y);
      }
      const g = i.fn({
        ...t,
        [h]: p,
        [f]: v
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [h]: a,
            [f]: s
          }
        }
      };
    }
  };
}, _p = function(e) {
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
        crossAxis: d = !0
      } = wt(e, t), c = {
        x: n,
        y: r
      }, f = ot(o), h = ci(f);
      let p = c[h], v = c[f];
      const g = wt(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const y = h === "y" ? "height" : "width", S = a.reference[h] - a.floating[y] + b.mainAxis, C = a.reference[h] + a.reference[y] - b.mainAxis;
        p < S ? p = S : p > C && (p = C);
      }
      if (d) {
        var w, x;
        const y = h === "y" ? "width" : "height", S = nc.has(yt(o)), C = a.reference[f] - a.floating[y] + (S && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (S ? 0 : b.crossAxis), R = a.reference[f] + a.reference[y] + (S ? 0 : ((x = s.offset) == null ? void 0 : x[f]) || 0) - (S ? b.crossAxis : 0);
        v < C ? v = C : v > R && (v = R);
      }
      return {
        [h]: p,
        [f]: v
      };
    }
  };
}, Op = function(e) {
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
        ...d
      } = wt(e, t), c = await Bn(t, d), f = yt(o), h = xn(o), p = ot(o) === "y", {
        width: v,
        height: g
      } = a.floating;
      let b, w;
      f === "top" || f === "bottom" ? (b = f, w = h === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = f, b = h === "end" ? "top" : "bottom");
      const x = g - c.top - c.bottom, y = v - c.left - c.right, S = Pt(g - c[b], x), C = Pt(v - c[w], y), R = !t.middlewareData.shift;
      let k = S, E = C;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (E = y), (r = t.middlewareData.shift) != null && r.enabled.y && (k = x), R && !h) {
        const T = Fe(c.left, 0), _ = Fe(c.right, 0), L = Fe(c.top, 0), A = Fe(c.bottom, 0);
        p ? E = v - 2 * (T !== 0 || _ !== 0 ? T + _ : Fe(c.left, c.right)) : k = g - 2 * (L !== 0 || A !== 0 ? L + A : Fe(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: E,
        availableHeight: k
      });
      const M = await s.getDimensions(i.floating);
      return v !== M.width || g !== M.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function lo() {
  return typeof window < "u";
}
function Sn(e) {
  return rc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Be(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function lt(e) {
  var t;
  return (t = (rc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function rc(e) {
  return lo() ? e instanceof Node || e instanceof Be(e).Node : !1;
}
function Xe(e) {
  return lo() ? e instanceof Element || e instanceof Be(e).Element : !1;
}
function st(e) {
  return lo() ? e instanceof HTMLElement || e instanceof Be(e).HTMLElement : !1;
}
function gs(e) {
  return !lo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Be(e).ShadowRoot;
}
const Ap = /* @__PURE__ */ new Set(["inline", "contents"]);
function Qn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Ap.has(o);
}
const Ip = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Lp(e) {
  return Ip.has(Sn(e));
}
const zp = [":popover-open", ":modal"];
function co(e) {
  return zp.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const $p = ["transform", "translate", "scale", "rotate", "perspective"], Fp = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Wp = ["paint", "layout", "strict", "content"];
function fi(e) {
  const t = mi(), n = Xe(e) ? Ze(e) : e;
  return $p.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Fp.some((r) => (n.willChange || "").includes(r)) || Wp.some((r) => (n.contain || "").includes(r));
}
function Bp(e) {
  let t = Tt(e);
  for (; st(t) && !un(t); ) {
    if (fi(t))
      return t;
    if (co(t))
      return null;
    t = Tt(t);
  }
  return null;
}
function mi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Hp = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function un(e) {
  return Hp.has(Sn(e));
}
function Ze(e) {
  return Be(e).getComputedStyle(e);
}
function uo(e) {
  return Xe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Tt(e) {
  if (Sn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    gs(e) && e.host || // Fallback.
    lt(e)
  );
  return gs(t) ? t.host : t;
}
function oc(e) {
  const t = Tt(e);
  return un(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : st(t) && Qn(t) ? t : oc(t);
}
function Hn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = oc(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Be(o);
  if (a) {
    const i = Ca(s);
    return t.concat(s, s.visualViewport || [], Qn(o) ? o : [], i && n ? Hn(i) : []);
  }
  return t.concat(o, Hn(o, [], n));
}
function Ca(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ac(e) {
  const t = Ze(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = st(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = zr(n) !== a || zr(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function hi(e) {
  return Xe(e) ? e : e.contextElement;
}
function dn(e) {
  const t = hi(e);
  if (!st(t))
    return it(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = ac(t);
  let s = (a ? zr(n.width) : n.width) / r, i = (a ? zr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const Vp = /* @__PURE__ */ it(0);
function ic(e) {
  const t = Be(e);
  return !mi() || !t.visualViewport ? Vp : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Yp(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Be(e) ? !1 : t;
}
function Ut(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = hi(e);
  let s = it(1);
  t && (r ? Xe(r) && (s = dn(r)) : s = dn(e));
  const i = Yp(a, n, r) ? ic(a) : it(0);
  let l = (o.left + i.x) / s.x, d = (o.top + i.y) / s.y, c = o.width / s.x, f = o.height / s.y;
  if (a) {
    const h = Be(a), p = r && Xe(r) ? Be(r) : r;
    let v = h, g = Ca(v);
    for (; g && r && p !== v; ) {
      const b = dn(g), w = g.getBoundingClientRect(), x = Ze(g), y = w.left + (g.clientLeft + parseFloat(x.paddingLeft)) * b.x, S = w.top + (g.clientTop + parseFloat(x.paddingTop)) * b.y;
      l *= b.x, d *= b.y, c *= b.x, f *= b.y, l += y, d += S, v = Be(g), g = Ca(v);
    }
  }
  return Fr({
    width: c,
    height: f,
    x: l,
    y: d
  });
}
function fo(e, t) {
  const n = uo(e).scrollLeft;
  return t ? t.left + n : Ut(lt(e)).left + n;
}
function sc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - fo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Gp(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = lt(r), i = t ? co(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = it(1);
  const c = it(0), f = st(r);
  if ((f || !f && !a) && ((Sn(r) !== "body" || Qn(s)) && (l = uo(r)), st(r))) {
    const p = Ut(r);
    d = dn(r), c.x = p.x + r.clientLeft, c.y = p.y + r.clientTop;
  }
  const h = s && !f && !a ? sc(s, l) : it(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + c.x + h.x,
    y: n.y * d.y - l.scrollTop * d.y + c.y + h.y
  };
}
function Up(e) {
  return Array.from(e.getClientRects());
}
function jp(e) {
  const t = lt(e), n = uo(e), r = e.ownerDocument.body, o = Fe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Fe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + fo(e);
  const i = -n.scrollTop;
  return Ze(r).direction === "rtl" && (s += Fe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const vs = 25;
function Kp(e, t) {
  const n = Be(e), r = lt(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, l = 0;
  if (o) {
    a = o.width, s = o.height;
    const c = mi();
    (!c || c && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const d = fo(r);
  if (d <= 0) {
    const c = r.ownerDocument, f = c.body, h = getComputedStyle(f), p = c.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, v = Math.abs(r.clientWidth - f.clientWidth - p);
    v <= vs && (a -= v);
  } else d <= vs && (a += d);
  return {
    width: a,
    height: s,
    x: i,
    y: l
  };
}
const qp = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Xp(e, t) {
  const n = Ut(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = st(e) ? dn(e) : it(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, l = o * a.x, d = r * a.y;
  return {
    width: s,
    height: i,
    x: l,
    y: d
  };
}
function bs(e, t, n) {
  let r;
  if (t === "viewport")
    r = Kp(e, n);
  else if (t === "document")
    r = jp(lt(e));
  else if (Xe(t))
    r = Xp(t, n);
  else {
    const o = ic(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Fr(r);
}
function lc(e, t) {
  const n = Tt(e);
  return n === t || !Xe(n) || un(n) ? !1 : Ze(n).position === "fixed" || lc(n, t);
}
function Zp(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Hn(e, [], !1).filter((i) => Xe(i) && Sn(i) !== "body"), o = null;
  const a = Ze(e).position === "fixed";
  let s = a ? Tt(e) : e;
  for (; Xe(s) && !un(s); ) {
    const i = Ze(s), l = fi(s);
    !l && i.position === "fixed" && (o = null), (a ? !l && !o : !l && i.position === "static" && !!o && qp.has(o.position) || Qn(s) && !l && lc(e, s)) ? r = r.filter((c) => c !== s) : o = i, s = Tt(s);
  }
  return t.set(e, r), r;
}
function Qp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? co(t) ? [] : Zp(t, this._c) : [].concat(n), r], i = s[0], l = s.reduce((d, c) => {
    const f = bs(t, c, o);
    return d.top = Fe(f.top, d.top), d.right = Pt(f.right, d.right), d.bottom = Pt(f.bottom, d.bottom), d.left = Fe(f.left, d.left), d;
  }, bs(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Jp(e) {
  const {
    width: t,
    height: n
  } = ac(e);
  return {
    width: t,
    height: n
  };
}
function eg(e, t, n) {
  const r = st(t), o = lt(t), a = n === "fixed", s = Ut(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = it(0);
  function d() {
    l.x = fo(o);
  }
  if (r || !r && !a)
    if ((Sn(t) !== "body" || Qn(o)) && (i = uo(t)), r) {
      const p = Ut(t, !0, a, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && d();
  a && !r && o && d();
  const c = o && !r && !a ? sc(o, i) : it(0), f = s.left + i.scrollLeft - l.x - c.x, h = s.top + i.scrollTop - l.y - c.y;
  return {
    x: f,
    y: h,
    width: s.width,
    height: s.height
  };
}
function Xo(e) {
  return Ze(e).position === "static";
}
function ws(e, t) {
  if (!st(e) || Ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return lt(e) === n && (n = n.ownerDocument.body), n;
}
function cc(e, t) {
  const n = Be(e);
  if (co(e))
    return n;
  if (!st(e)) {
    let o = Tt(e);
    for (; o && !un(o); ) {
      if (Xe(o) && !Xo(o))
        return o;
      o = Tt(o);
    }
    return n;
  }
  let r = ws(e, t);
  for (; r && Lp(r) && Xo(r); )
    r = ws(r, t);
  return r && un(r) && Xo(r) && !fi(r) ? n : r || Bp(e) || n;
}
const tg = async function(e) {
  const t = this.getOffsetParent || cc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: eg(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function ng(e) {
  return Ze(e).direction === "rtl";
}
const rg = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Gp,
  getDocumentElement: lt,
  getClippingRect: Qp,
  getOffsetParent: cc,
  getElementRects: tg,
  getClientRects: Up,
  getDimensions: Jp,
  getScale: dn,
  isElement: Xe,
  isRTL: ng
};
function dc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function og(e, t) {
  let n = null, r;
  const o = lt(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), a();
    const d = e.getBoundingClientRect(), {
      left: c,
      top: f,
      width: h,
      height: p
    } = d;
    if (i || t(), !h || !p)
      return;
    const v = Er(f), g = Er(o.clientWidth - (c + h)), b = Er(o.clientHeight - (f + p)), w = Er(c), y = {
      rootMargin: -v + "px " + -g + "px " + -b + "px " + -w + "px",
      threshold: Fe(0, Pt(1, l)) || 1
    };
    let S = !0;
    function C(R) {
      const k = R[0].intersectionRatio;
      if (k !== l) {
        if (!S)
          return s();
        k ? s(!1, k) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      k === 1 && !dc(d, e.getBoundingClientRect()) && s(), S = !1;
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
function ag(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, d = hi(e), c = o || a ? [...d ? Hn(d) : [], ...Hn(t)] : [];
  c.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), a && w.addEventListener("resize", n);
  });
  const f = d && i ? og(d, n) : null;
  let h = -1, p = null;
  s && (p = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === d && p && (p.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var y;
      (y = p) == null || y.observe(t);
    })), n();
  }), d && !l && p.observe(d), p.observe(t));
  let v, g = l ? Ut(e) : null;
  l && b();
  function b() {
    const w = Ut(e);
    g && !dc(g, w) && n(), g = w, v = requestAnimationFrame(b);
  }
  return n(), () => {
    var w;
    c.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), f == null || f(), (w = p) == null || w.disconnect(), p = null, l && cancelAnimationFrame(v);
  };
}
const ig = Pp, sg = Tp, lg = Mp, cg = Op, dg = Np, ys = Rp, ug = _p, fg = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: rg,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return Ep(e, t, {
    ...o,
    platform: a
  });
};
var mg = typeof document < "u", hg = function() {
}, Ir = mg ? Qa : hg;
function Wr(e, t) {
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
        if (!Wr(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !Wr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function uc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function xs(e, t) {
  const n = uc(e);
  return Math.round(t * n) / n;
}
function Zo(e) {
  const t = m.useRef(e);
  return Ir(() => {
    t.current = e;
  }), t;
}
function pg(e) {
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
    open: d
  } = e, [c, f] = m.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, p] = m.useState(r);
  Wr(h, r) || p(r);
  const [v, g] = m.useState(null), [b, w] = m.useState(null), x = m.useCallback((D) => {
    D !== R.current && (R.current = D, g(D));
  }, []), y = m.useCallback((D) => {
    D !== k.current && (k.current = D, w(D));
  }, []), S = a || v, C = s || b, R = m.useRef(null), k = m.useRef(null), E = m.useRef(c), M = l != null, T = Zo(l), _ = Zo(o), L = Zo(d), A = m.useCallback(() => {
    if (!R.current || !k.current)
      return;
    const D = {
      placement: t,
      strategy: n,
      middleware: h
    };
    _.current && (D.platform = _.current), fg(R.current, k.current, D).then((O) => {
      const Z = {
        ...O,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      Y.current && !Wr(E.current, Z) && (E.current = Z, qr.flushSync(() => {
        f(Z);
      }));
    });
  }, [h, t, n, _, L]);
  Ir(() => {
    d === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((D) => ({
      ...D,
      isPositioned: !1
    })));
  }, [d]);
  const Y = m.useRef(!1);
  Ir(() => (Y.current = !0, () => {
    Y.current = !1;
  }), []), Ir(() => {
    if (S && (R.current = S), C && (k.current = C), S && C) {
      if (T.current)
        return T.current(S, C, A);
      A();
    }
  }, [S, C, A, T, M]);
  const j = m.useMemo(() => ({
    reference: R,
    floating: k,
    setReference: x,
    setFloating: y
  }), [x, y]), F = m.useMemo(() => ({
    reference: S,
    floating: C
  }), [S, C]), U = m.useMemo(() => {
    const D = {
      position: n,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return D;
    const O = xs(F.floating, c.x), Z = xs(F.floating, c.y);
    return i ? {
      ...D,
      transform: "translate(" + O + "px, " + Z + "px)",
      ...uc(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: O,
      top: Z
    };
  }, [n, i, F.floating, c.x, c.y]);
  return m.useMemo(() => ({
    ...c,
    update: A,
    refs: j,
    elements: F,
    floatingStyles: U
  }), [c, A, j, F, U]);
}
const gg = (e) => {
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
      return r && t(r) ? r.current != null ? ys({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ys({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, vg = (e, t) => ({
  ...ig(e),
  options: [e, t]
}), bg = (e, t) => ({
  ...sg(e),
  options: [e, t]
}), wg = (e, t) => ({
  ...ug(e),
  options: [e, t]
}), yg = (e, t) => ({
  ...lg(e),
  options: [e, t]
}), xg = (e, t) => ({
  ...cg(e),
  options: [e, t]
}), Sg = (e, t) => ({
  ...dg(e),
  options: [e, t]
}), Cg = (e, t) => ({
  ...gg(e),
  options: [e, t]
});
var kg = "Arrow", fc = m.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ u(
    K.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
fc.displayName = kg;
var Eg = fc, pi = "Popper", [mc, Ot] = Le(pi), [Rg, hc] = mc(pi), pc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = m.useState(null);
  return /* @__PURE__ */ u(Rg, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
pc.displayName = pi;
var gc = "PopperAnchor", vc = m.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = hc(gc, n), s = m.useRef(null), i = ae(t, s), l = m.useRef(null);
    return m.useEffect(() => {
      const d = l.current;
      l.current = (r == null ? void 0 : r.current) || s.current, d !== l.current && a.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ u(K.div, { ...o, ref: i });
  }
);
vc.displayName = gc;
var gi = "PopperContent", [Mg, Ng] = mc(gi), bc = m.forwardRef(
  (e, t) => {
    var z, te, J, ie, ce, me;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d = [],
      collisionPadding: c = 0,
      sticky: f = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: v,
      ...g
    } = e, b = hc(gi, n), [w, x] = m.useState(null), y = ae(t, (Te) => x(Te)), [S, C] = m.useState(null), R = io(S), k = (R == null ? void 0 : R.width) ?? 0, E = (R == null ? void 0 : R.height) ?? 0, M = r + (a !== "center" ? "-" + a : ""), T = typeof c == "number" ? c : { top: 0, right: 0, bottom: 0, left: 0, ...c }, _ = Array.isArray(d) ? d : [d], L = _.length > 0, A = {
      padding: T,
      boundary: _.filter(Pg),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: Y, floatingStyles: j, placement: F, isPositioned: U, middlewareData: D } = pg({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: M,
      whileElementsMounted: (...Te) => ag(...Te, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        vg({ mainAxis: o + E, alignmentAxis: s }),
        l && bg({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? wg() : void 0,
          ...A
        }),
        l && yg({ ...A }),
        xg({
          ...A,
          apply: ({ elements: Te, rects: ne, availableWidth: Je, availableHeight: et }) => {
            const { width: je, height: Nn } = ne.reference, St = Te.floating.style;
            St.setProperty("--radix-popper-available-width", `${Je}px`), St.setProperty("--radix-popper-available-height", `${et}px`), St.setProperty("--radix-popper-anchor-width", `${je}px`), St.setProperty("--radix-popper-anchor-height", `${Nn}px`);
          }
        }),
        S && Cg({ element: S, padding: i }),
        Tg({ arrowWidth: k, arrowHeight: E }),
        h && Sg({ strategy: "referenceHidden", ...A })
      ]
    }), [O, Z] = xc(F), se = De(v);
    ke(() => {
      U && (se == null || se());
    }, [U, se]);
    const P = (z = D.arrow) == null ? void 0 : z.x, B = (te = D.arrow) == null ? void 0 : te.y, W = ((J = D.arrow) == null ? void 0 : J.centerOffset) !== 0, [G, oe] = m.useState();
    return ke(() => {
      w && oe(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ u(
      "div",
      {
        ref: Y.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...j,
          transform: U ? j.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: G,
          "--radix-popper-transform-origin": [
            (ie = D.transformOrigin) == null ? void 0 : ie.x,
            (ce = D.transformOrigin) == null ? void 0 : ce.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((me = D.hide) == null ? void 0 : me.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ u(
          Mg,
          {
            scope: n,
            placedSide: O,
            onArrowChange: C,
            arrowX: P,
            arrowY: B,
            shouldHideArrow: W,
            children: /* @__PURE__ */ u(
              K.div,
              {
                "data-side": O,
                "data-align": Z,
                ...g,
                ref: y,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: U ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
bc.displayName = gi;
var wc = "PopperArrow", Dg = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, yc = m.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Ng(wc, r), s = Dg[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u(
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
        children: /* @__PURE__ */ u(
          Eg,
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
yc.displayName = wc;
function Pg(e) {
  return e !== null;
}
var Tg = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, w, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [d, c] = xc(n), f = { start: "0%", center: "50%", end: "100%" }[c], h = (((w = o.arrow) == null ? void 0 : w.x) ?? 0) + i / 2, p = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + l / 2;
    let v = "", g = "";
    return d === "bottom" ? (v = s ? f : `${h}px`, g = `${-l}px`) : d === "top" ? (v = s ? f : `${h}px`, g = `${r.floating.height + l}px`) : d === "right" ? (v = `${-l}px`, g = s ? f : `${p}px`) : d === "left" && (v = `${r.floating.width + l}px`, g = s ? f : `${p}px`), { data: { x: v, y: g } };
  }
});
function xc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Jn = pc, er = vc, mo = bc, ho = yc, Qo = "rovingFocusGroup.onEntryFocus", _g = { bubbles: !1, cancelable: !0 }, tr = "RovingFocusGroup", [ka, Sc, Og] = Xr(tr), [Ag, po] = Le(
  tr,
  [Og]
), [Ig, Lg] = Ag(tr), Cc = m.forwardRef(
  (e, t) => /* @__PURE__ */ u(ka.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u(ka.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u(zg, { ...e, ref: t }) }) })
);
Cc.displayName = tr;
var zg = m.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: d,
    preventScrollOnEntryFocus: c = !1,
    ...f
  } = e, h = m.useRef(null), p = ae(t, h), v = vn(a), [g, b] = Ge({
    prop: s,
    defaultProp: i ?? null,
    onChange: l,
    caller: tr
  }), [w, x] = m.useState(!1), y = De(d), S = Sc(n), C = m.useRef(!1), [R, k] = m.useState(0);
  return m.useEffect(() => {
    const E = h.current;
    if (E)
      return E.addEventListener(Qo, y), () => E.removeEventListener(Qo, y);
  }, [y]), /* @__PURE__ */ u(
    Ig,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: g,
      onItemFocus: m.useCallback(
        (E) => b(E),
        [b]
      ),
      onItemShiftTab: m.useCallback(() => x(!0), []),
      onFocusableItemAdd: m.useCallback(
        () => k((E) => E + 1),
        []
      ),
      onFocusableItemRemove: m.useCallback(
        () => k((E) => E - 1),
        []
      ),
      children: /* @__PURE__ */ u(
        K.div,
        {
          tabIndex: w || R === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: H(e.onMouseDown, () => {
            C.current = !0;
          }),
          onFocus: H(e.onFocus, (E) => {
            const M = !C.current;
            if (E.target === E.currentTarget && M && !w) {
              const T = new CustomEvent(Qo, _g);
              if (E.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const _ = S().filter((F) => F.focusable), L = _.find((F) => F.active), A = _.find((F) => F.id === g), j = [L, A, ..._].filter(
                  Boolean
                ).map((F) => F.ref.current);
                Rc(j, c);
              }
            }
            C.current = !1;
          }),
          onBlur: H(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), kc = "RovingFocusGroupItem", Ec = m.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, l = Ce(), d = a || l, c = Lg(kc, n), f = c.currentTabStopId === d, h = Sc(n), { onFocusableItemAdd: p, onFocusableItemRemove: v, currentTabStopId: g } = c;
    return m.useEffect(() => {
      if (r)
        return p(), () => v();
    }, [r, p, v]), /* @__PURE__ */ u(
      ka.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ u(
          K.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": c.orientation,
            ...i,
            ref: t,
            onMouseDown: H(e.onMouseDown, (b) => {
              r ? c.onItemFocus(d) : b.preventDefault();
            }),
            onFocus: H(e.onFocus, () => c.onItemFocus(d)),
            onKeyDown: H(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = Wg(b, c.orientation, c.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = h().filter((S) => S.focusable).map((S) => S.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const S = y.indexOf(b.currentTarget);
                  y = c.loop ? Bg(y, S + 1) : y.slice(S + 1);
                }
                setTimeout(() => Rc(y));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: f, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
Ec.displayName = kc;
var $g = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Fg(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Wg(e, t, n) {
  const r = Fg(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return $g[r];
}
function Rc(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Bg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Mc = Cc, Nc = Ec, Ea = ["Enter", " "], Hg = ["ArrowDown", "PageUp", "Home"], Dc = ["ArrowUp", "PageDown", "End"], Vg = [...Hg, ...Dc], Yg = {
  ltr: [...Ea, "ArrowRight"],
  rtl: [...Ea, "ArrowLeft"]
}, Gg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, nr = "Menu", [Vn, Ug, jg] = Xr(nr), [Xt, Pc] = Le(nr, [
  jg,
  Ot,
  po
]), rr = Ot(), Tc = po(), [_c, At] = Xt(nr), [Kg, or] = Xt(nr), Oc = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = rr(t), [l, d] = m.useState(null), c = m.useRef(!1), f = De(a), h = vn(o);
  return m.useEffect(() => {
    const p = () => {
      c.current = !0, document.addEventListener("pointerdown", v, { capture: !0, once: !0 }), document.addEventListener("pointermove", v, { capture: !0, once: !0 });
    }, v = () => c.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", v, { capture: !0 }), document.removeEventListener("pointermove", v, { capture: !0 });
    };
  }, []), /* @__PURE__ */ u(Jn, { ...i, children: /* @__PURE__ */ u(
    _c,
    {
      scope: t,
      open: n,
      onOpenChange: f,
      content: l,
      onContentChange: d,
      children: /* @__PURE__ */ u(
        Kg,
        {
          scope: t,
          onClose: m.useCallback(() => f(!1), [f]),
          isUsingKeyboardRef: c,
          dir: h,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
Oc.displayName = nr;
var qg = "MenuAnchor", vi = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = rr(n);
    return /* @__PURE__ */ u(er, { ...o, ...r, ref: t });
  }
);
vi.displayName = qg;
var bi = "MenuPortal", [Xg, Ac] = Xt(bi, {
  forceMount: void 0
}), Ic = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = At(bi, t);
  return /* @__PURE__ */ u(Xg, { scope: t, forceMount: n, children: /* @__PURE__ */ u(Oe, { present: n || a.open, children: /* @__PURE__ */ u(wn, { asChild: !0, container: o, children: r }) }) });
};
Ic.displayName = bi;
var Ye = "MenuContent", [Zg, wi] = Xt(Ye), Lc = m.forwardRef(
  (e, t) => {
    const n = Ac(Ye, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = At(Ye, e.__scopeMenu), s = or(Ye, e.__scopeMenu);
    return /* @__PURE__ */ u(Vn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ u(Oe, { present: r || a.open, children: /* @__PURE__ */ u(Vn.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ u(Qg, { ...o, ref: t }) : /* @__PURE__ */ u(Jg, { ...o, ref: t }) }) }) });
  }
), Qg = m.forwardRef(
  (e, t) => {
    const n = At(Ye, e.__scopeMenu), r = m.useRef(null), o = ae(t, r);
    return m.useEffect(() => {
      const a = r.current;
      if (a) return Jr(a);
    }, []), /* @__PURE__ */ u(
      yi,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: H(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Jg = m.forwardRef((e, t) => {
  const n = At(Ye, e.__scopeMenu);
  return /* @__PURE__ */ u(
    yi,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), ev = /* @__PURE__ */ Dt("MenuContent.ScrollLock"), yi = m.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: l,
      onEscapeKeyDown: d,
      onPointerDownOutside: c,
      onFocusOutside: f,
      onInteractOutside: h,
      onDismiss: p,
      disableOutsideScroll: v,
      ...g
    } = e, b = At(Ye, n), w = or(Ye, n), x = rr(n), y = Tc(n), S = Ug(n), [C, R] = m.useState(null), k = m.useRef(null), E = ae(t, k, b.onContentChange), M = m.useRef(0), T = m.useRef(""), _ = m.useRef(0), L = m.useRef(null), A = m.useRef("right"), Y = m.useRef(0), j = v ? Zn : m.Fragment, F = v ? { as: ev, allowPinchZoom: !0 } : void 0, U = (O) => {
      var z, te;
      const Z = T.current + O, se = S().filter((J) => !J.disabled), P = document.activeElement, B = (z = se.find((J) => J.ref.current === P)) == null ? void 0 : z.textValue, W = se.map((J) => J.textValue), G = fv(W, Z, B), oe = (te = se.find((J) => J.textValue === G)) == null ? void 0 : te.ref.current;
      (function J(ie) {
        T.current = ie, window.clearTimeout(M.current), ie !== "" && (M.current = window.setTimeout(() => J(""), 1e3));
      })(Z), oe && setTimeout(() => oe.focus());
    };
    m.useEffect(() => () => window.clearTimeout(M.current), []), Zr();
    const D = m.useCallback((O) => {
      var se, P;
      return A.current === ((se = L.current) == null ? void 0 : se.side) && hv(O, (P = L.current) == null ? void 0 : P.area);
    }, []);
    return /* @__PURE__ */ u(
      Zg,
      {
        scope: n,
        searchRef: T,
        onItemEnter: m.useCallback(
          (O) => {
            D(O) && O.preventDefault();
          },
          [D]
        ),
        onItemLeave: m.useCallback(
          (O) => {
            var Z;
            D(O) || ((Z = k.current) == null || Z.focus(), R(null));
          },
          [D]
        ),
        onTriggerLeave: m.useCallback(
          (O) => {
            D(O) && O.preventDefault();
          },
          [D]
        ),
        pointerGraceTimerRef: _,
        onPointerGraceIntentChange: m.useCallback((O) => {
          L.current = O;
        }, []),
        children: /* @__PURE__ */ u(j, { ...F, children: /* @__PURE__ */ u(
          Xn,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: H(a, (O) => {
              var Z;
              O.preventDefault(), (Z = k.current) == null || Z.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ u(
              bn,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: d,
                onPointerDownOutside: c,
                onFocusOutside: f,
                onInteractOutside: h,
                onDismiss: p,
                children: /* @__PURE__ */ u(
                  Mc,
                  {
                    asChild: !0,
                    ...y,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: C,
                    onCurrentTabStopIdChange: R,
                    onEntryFocus: H(l, (O) => {
                      w.isUsingKeyboardRef.current || O.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ u(
                      mo,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Jc(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...x,
                        ...g,
                        ref: E,
                        style: { outline: "none", ...g.style },
                        onKeyDown: H(g.onKeyDown, (O) => {
                          const se = O.target.closest("[data-radix-menu-content]") === O.currentTarget, P = O.ctrlKey || O.altKey || O.metaKey, B = O.key.length === 1;
                          se && (O.key === "Tab" && O.preventDefault(), !P && B && U(O.key));
                          const W = k.current;
                          if (O.target !== W || !Vg.includes(O.key)) return;
                          O.preventDefault();
                          const oe = S().filter((z) => !z.disabled).map((z) => z.ref.current);
                          Dc.includes(O.key) && oe.reverse(), dv(oe);
                        }),
                        onBlur: H(e.onBlur, (O) => {
                          O.currentTarget.contains(O.target) || (window.clearTimeout(M.current), T.current = "");
                        }),
                        onPointerMove: H(
                          e.onPointerMove,
                          Yn((O) => {
                            const Z = O.target, se = Y.current !== O.clientX;
                            if (O.currentTarget.contains(Z) && se) {
                              const P = O.clientX > Y.current ? "right" : "left";
                              A.current = P, Y.current = O.clientX;
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
Lc.displayName = Ye;
var tv = "MenuGroup", xi = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ u(K.div, { role: "group", ...r, ref: t });
  }
);
xi.displayName = tv;
var nv = "MenuLabel", zc = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ u(K.div, { ...r, ref: t });
  }
);
zc.displayName = nv;
var Br = "MenuItem", Ss = "menu.itemSelect", go = m.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = m.useRef(null), s = or(Br, e.__scopeMenu), i = wi(Br, e.__scopeMenu), l = ae(t, a), d = m.useRef(!1), c = () => {
      const f = a.current;
      if (!n && f) {
        const h = new CustomEvent(Ss, { bubbles: !0, cancelable: !0 });
        f.addEventListener(Ss, (p) => r == null ? void 0 : r(p), { once: !0 }), ul(f, h), h.defaultPrevented ? d.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ u(
      $c,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: H(e.onClick, c),
        onPointerDown: (f) => {
          var h;
          (h = e.onPointerDown) == null || h.call(e, f), d.current = !0;
        },
        onPointerUp: H(e.onPointerUp, (f) => {
          var h;
          d.current || (h = f.currentTarget) == null || h.click();
        }),
        onKeyDown: H(e.onKeyDown, (f) => {
          const h = i.searchRef.current !== "";
          n || h && f.key === " " || Ea.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
        })
      }
    );
  }
);
go.displayName = Br;
var $c = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = wi(Br, n), i = Tc(n), l = m.useRef(null), d = ae(t, l), [c, f] = m.useState(!1), [h, p] = m.useState("");
    return m.useEffect(() => {
      const v = l.current;
      v && p((v.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ u(
      Vn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? h,
        children: /* @__PURE__ */ u(Nc, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ u(
          K.div,
          {
            role: "menuitem",
            "data-highlighted": c ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: d,
            onPointerMove: H(
              e.onPointerMove,
              Yn((v) => {
                r ? s.onItemLeave(v) : (s.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: H(
              e.onPointerLeave,
              Yn((v) => s.onItemLeave(v))
            ),
            onFocus: H(e.onFocus, () => f(!0)),
            onBlur: H(e.onBlur, () => f(!1))
          }
        ) })
      }
    );
  }
), rv = "MenuCheckboxItem", Fc = m.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ u(Yc, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ u(
      go,
      {
        role: "menuitemcheckbox",
        "aria-checked": Hr(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ki(n),
        onSelect: H(
          o.onSelect,
          () => r == null ? void 0 : r(Hr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Fc.displayName = rv;
var Wc = "MenuRadioGroup", [ov, av] = Xt(
  Wc,
  { value: void 0, onValueChange: () => {
  } }
), Bc = m.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = De(r);
    return /* @__PURE__ */ u(ov, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ u(xi, { ...o, ref: t }) });
  }
);
Bc.displayName = Wc;
var Hc = "MenuRadioItem", Vc = m.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = av(Hc, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ u(Yc, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ u(
      go,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": ki(a),
        onSelect: H(
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
Vc.displayName = Hc;
var Si = "MenuItemIndicator", [Yc, iv] = Xt(
  Si,
  { checked: !1 }
), Gc = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = iv(Si, n);
    return /* @__PURE__ */ u(
      Oe,
      {
        present: r || Hr(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ u(
          K.span,
          {
            ...o,
            ref: t,
            "data-state": ki(a.checked)
          }
        )
      }
    );
  }
);
Gc.displayName = Si;
var sv = "MenuSeparator", Uc = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ u(
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
Uc.displayName = sv;
var lv = "MenuArrow", jc = m.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = rr(n);
    return /* @__PURE__ */ u(ho, { ...o, ...r, ref: t });
  }
);
jc.displayName = lv;
var Ci = "MenuSub", [cv, Kc] = Xt(Ci), qc = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = At(Ci, t), s = rr(t), [i, l] = m.useState(null), [d, c] = m.useState(null), f = De(o);
  return m.useEffect(() => (a.open === !1 && f(!1), () => f(!1)), [a.open, f]), /* @__PURE__ */ u(Jn, { ...s, children: /* @__PURE__ */ u(
    _c,
    {
      scope: t,
      open: r,
      onOpenChange: f,
      content: d,
      onContentChange: c,
      children: /* @__PURE__ */ u(
        cv,
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
qc.displayName = Ci;
var zn = "MenuSubTrigger", Xc = m.forwardRef(
  (e, t) => {
    const n = At(zn, e.__scopeMenu), r = or(zn, e.__scopeMenu), o = Kc(zn, e.__scopeMenu), a = wi(zn, e.__scopeMenu), s = m.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = a, d = { __scopeMenu: e.__scopeMenu }, c = m.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return m.useEffect(() => c, [c]), m.useEffect(() => {
      const f = i.current;
      return () => {
        window.clearTimeout(f), l(null);
      };
    }, [i, l]), /* @__PURE__ */ u(vi, { asChild: !0, ...d, children: /* @__PURE__ */ u(
      $c,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Jc(n.open),
        ...e,
        ref: bt(t, o.onTriggerChange),
        onClick: (f) => {
          var h;
          (h = e.onClick) == null || h.call(e, f), !(e.disabled || f.defaultPrevented) && (f.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: H(
          e.onPointerMove,
          Yn((f) => {
            a.onItemEnter(f), !f.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), c();
            }, 100));
          })
        ),
        onPointerLeave: H(
          e.onPointerLeave,
          Yn((f) => {
            var p, v;
            c();
            const h = (p = n.content) == null ? void 0 : p.getBoundingClientRect();
            if (h) {
              const g = (v = n.content) == null ? void 0 : v.dataset.side, b = g === "right", w = b ? -5 : 5, x = h[b ? "left" : "right"], y = h[b ? "right" : "left"];
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
                side: g
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
        onKeyDown: H(e.onKeyDown, (f) => {
          var p;
          const h = a.searchRef.current !== "";
          e.disabled || h && f.key === " " || Yg[r.dir].includes(f.key) && (n.onOpenChange(!0), (p = n.content) == null || p.focus(), f.preventDefault());
        })
      }
    ) });
  }
);
Xc.displayName = zn;
var Zc = "MenuSubContent", Qc = m.forwardRef(
  (e, t) => {
    const n = Ac(Ye, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = At(Ye, e.__scopeMenu), s = or(Ye, e.__scopeMenu), i = Kc(Zc, e.__scopeMenu), l = m.useRef(null), d = ae(t, l);
    return /* @__PURE__ */ u(Vn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ u(Oe, { present: r || a.open, children: /* @__PURE__ */ u(Vn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ u(
      yi,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: d,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (c) => {
          var f;
          s.isUsingKeyboardRef.current && ((f = l.current) == null || f.focus()), c.preventDefault();
        },
        onCloseAutoFocus: (c) => c.preventDefault(),
        onFocusOutside: H(e.onFocusOutside, (c) => {
          c.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: H(e.onEscapeKeyDown, (c) => {
          s.onClose(), c.preventDefault();
        }),
        onKeyDown: H(e.onKeyDown, (c) => {
          var p;
          const f = c.currentTarget.contains(c.target), h = Gg[s.dir].includes(c.key);
          f && h && (a.onOpenChange(!1), (p = i.trigger) == null || p.focus(), c.preventDefault());
        })
      }
    ) }) }) });
  }
);
Qc.displayName = Zc;
function Jc(e) {
  return e ? "open" : "closed";
}
function Hr(e) {
  return e === "indeterminate";
}
function ki(e) {
  return Hr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function dv(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function uv(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function fv(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = uv(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((d) => d !== n));
  const l = s.find(
    (d) => d.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function mv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], l = t[s], d = i.x, c = i.y, f = l.x, h = l.y;
    c > r != h > r && n < (f - d) * (r - c) / (h - c) + d && (o = !o);
  }
  return o;
}
function hv(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return mv(n, t);
}
function Yn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var pv = Oc, gv = vi, vv = Ic, bv = Lc, wv = xi, yv = zc, xv = go, Sv = Fc, Cv = Bc, kv = Vc, Ev = Gc, Rv = Uc, Mv = jc, Nv = qc, Dv = Xc, Pv = Qc, vo = "DropdownMenu", [Tv, gR] = Le(
  vo,
  [Pc]
), ze = Pc(), [_v, ed] = Tv(vo), td = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, l = ze(t), d = m.useRef(null), [c, f] = Ge({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: vo
  });
  return /* @__PURE__ */ u(
    _v,
    {
      scope: t,
      triggerId: Ce(),
      triggerRef: d,
      contentId: Ce(),
      open: c,
      onOpenChange: f,
      onOpenToggle: m.useCallback(() => f((h) => !h), [f]),
      modal: i,
      children: /* @__PURE__ */ u(pv, { ...l, open: c, onOpenChange: f, dir: r, modal: i, children: n })
    }
  );
};
td.displayName = vo;
var nd = "DropdownMenuTrigger", rd = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = ed(nd, n), s = ze(n);
    return /* @__PURE__ */ u(gv, { asChild: !0, ...s, children: /* @__PURE__ */ u(
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
        ref: bt(t, a.triggerRef),
        onPointerDown: H(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (a.onOpenToggle(), a.open || i.preventDefault());
        }),
        onKeyDown: H(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && a.onOpenToggle(), i.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
rd.displayName = nd;
var Ov = "DropdownMenuPortal", od = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = ze(t);
  return /* @__PURE__ */ u(vv, { ...r, ...n });
};
od.displayName = Ov;
var ad = "DropdownMenuContent", id = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ed(ad, n), a = ze(n), s = m.useRef(!1);
    return /* @__PURE__ */ u(
      bv,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: H(e.onCloseAutoFocus, (i) => {
          var l;
          s.current || (l = o.triggerRef.current) == null || l.focus(), s.current = !1, i.preventDefault();
        }),
        onInteractOutside: H(e.onInteractOutside, (i) => {
          const l = i.detail.originalEvent, d = l.button === 0 && l.ctrlKey === !0, c = l.button === 2 || d;
          (!o.modal || c) && (s.current = !0);
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
id.displayName = ad;
var Av = "DropdownMenuGroup", sd = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ u(wv, { ...o, ...r, ref: t });
  }
);
sd.displayName = Av;
var Iv = "DropdownMenuLabel", ld = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ u(yv, { ...o, ...r, ref: t });
  }
);
ld.displayName = Iv;
var Lv = "DropdownMenuItem", cd = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ u(xv, { ...o, ...r, ref: t });
  }
);
cd.displayName = Lv;
var zv = "DropdownMenuCheckboxItem", dd = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(Sv, { ...o, ...r, ref: t });
});
dd.displayName = zv;
var $v = "DropdownMenuRadioGroup", Fv = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(Cv, { ...o, ...r, ref: t });
});
Fv.displayName = $v;
var Wv = "DropdownMenuRadioItem", Bv = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(kv, { ...o, ...r, ref: t });
});
Bv.displayName = Wv;
var Hv = "DropdownMenuItemIndicator", ud = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(Ev, { ...o, ...r, ref: t });
});
ud.displayName = Hv;
var Vv = "DropdownMenuSeparator", fd = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(Rv, { ...o, ...r, ref: t });
});
fd.displayName = Vv;
var Yv = "DropdownMenuArrow", Gv = m.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
    return /* @__PURE__ */ u(Mv, { ...o, ...r, ref: t });
  }
);
Gv.displayName = Yv;
var Uv = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = ze(t), [i, l] = Ge({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ u(Nv, { ...s, open: i, onOpenChange: l, children: n });
}, jv = "DropdownMenuSubTrigger", md = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(Dv, { ...o, ...r, ref: t });
});
md.displayName = jv;
var Kv = "DropdownMenuSubContent", hd = m.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = ze(n);
  return /* @__PURE__ */ u(
    Pv,
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
hd.displayName = Kv;
var qv = td, Xv = rd, Zv = od, Qv = id, Jv = sd, eb = ld, tb = cd, nb = dd, rb = ud, ob = fd, ab = Uv, ib = md, sb = hd, lb = "Label", pd = m.forwardRef((e, t) => /* @__PURE__ */ u(
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
pd.displayName = lb;
var cb = pd;
function Gn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var bo = "Popover", [gd, vR] = Le(bo, [
  Ot
]), ar = Ot(), [db, It] = gd(bo), vd = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = ar(t), l = m.useRef(null), [d, c] = m.useState(!1), [f, h] = Ge({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: bo
  });
  return /* @__PURE__ */ u(Jn, { ...i, children: /* @__PURE__ */ u(
    db,
    {
      scope: t,
      contentId: Ce(),
      triggerRef: l,
      open: f,
      onOpenChange: h,
      onOpenToggle: m.useCallback(() => h((p) => !p), [h]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: m.useCallback(() => c(!0), []),
      onCustomAnchorRemove: m.useCallback(() => c(!1), []),
      modal: s,
      children: n
    }
  ) });
};
vd.displayName = bo;
var bd = "PopoverAnchor", ub = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = It(bd, n), a = ar(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return m.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ u(er, { ...a, ...r, ref: t });
  }
);
ub.displayName = bd;
var wd = "PopoverTrigger", yd = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = It(wd, n), a = ar(n), s = ae(t, o.triggerRef), i = /* @__PURE__ */ u(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ed(o.open),
        ...r,
        ref: s,
        onClick: H(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ u(er, { asChild: !0, ...a, children: i });
  }
);
yd.displayName = wd;
var Ei = "PopoverPortal", [fb, mb] = gd(Ei, {
  forceMount: void 0
}), xd = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = It(Ei, t);
  return /* @__PURE__ */ u(fb, { scope: t, forceMount: n, children: /* @__PURE__ */ u(Oe, { present: n || a.open, children: /* @__PURE__ */ u(wn, { asChild: !0, container: o, children: r }) }) });
};
xd.displayName = Ei;
var fn = "PopoverContent", Sd = m.forwardRef(
  (e, t) => {
    const n = mb(fn, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = It(fn, e.__scopePopover);
    return /* @__PURE__ */ u(Oe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ u(pb, { ...o, ref: t }) : /* @__PURE__ */ u(gb, { ...o, ref: t }) });
  }
);
Sd.displayName = fn;
var hb = /* @__PURE__ */ Dt("PopoverContent.RemoveScroll"), pb = m.forwardRef(
  (e, t) => {
    const n = It(fn, e.__scopePopover), r = m.useRef(null), o = ae(t, r), a = m.useRef(!1);
    return m.useEffect(() => {
      const s = r.current;
      if (s) return Jr(s);
    }, []), /* @__PURE__ */ u(Zn, { as: hb, allowPinchZoom: !0, children: /* @__PURE__ */ u(
      Cd,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: H(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: H(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, d = i.button === 2 || l;
            a.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: H(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), gb = m.forwardRef(
  (e, t) => {
    const n = It(fn, e.__scopePopover), r = m.useRef(!1), o = m.useRef(!1);
    return /* @__PURE__ */ u(
      Cd,
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
          var l, d;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Cd = m.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: c,
      ...f
    } = e, h = It(fn, n), p = ar(n);
    return Zr(), /* @__PURE__ */ u(
      Xn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ u(
          bn,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: c,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: d,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ u(
              mo,
              {
                "data-state": Ed(h.open),
                role: "dialog",
                id: h.contentId,
                ...p,
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
), kd = "PopoverClose", vb = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = It(kd, n);
    return /* @__PURE__ */ u(
      K.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: H(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
vb.displayName = kd;
var bb = "PopoverArrow", wb = m.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = ar(n);
    return /* @__PURE__ */ u(ho, { ...o, ...r, ref: t });
  }
);
wb.displayName = bb;
function Ed(e) {
  return e ? "open" : "closed";
}
var yb = vd, xb = yd, Sb = xd, Cb = Sd, Ri = "Progress", Mi = 100, [kb, bR] = Le(Ri), [Eb, Rb] = kb(Ri), Rd = m.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: o,
      getValueLabel: a = Mb,
      ...s
    } = e;
    (o || o === 0) && !Cs(o) && console.error(Nb(`${o}`, "Progress"));
    const i = Cs(o) ? o : Mi;
    r !== null && !ks(r, i) && console.error(Db(`${r}`, "Progress"));
    const l = ks(r, i) ? r : null, d = Vr(l) ? a(l, i) : void 0;
    return /* @__PURE__ */ u(Eb, { scope: n, value: l, max: i, children: /* @__PURE__ */ u(
      K.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": Vr(l) ? l : void 0,
        "aria-valuetext": d,
        role: "progressbar",
        "data-state": Dd(l, i),
        "data-value": l ?? void 0,
        "data-max": i,
        ...s,
        ref: t
      }
    ) });
  }
);
Rd.displayName = Ri;
var Md = "ProgressIndicator", Nd = m.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...r } = e, o = Rb(Md, n);
    return /* @__PURE__ */ u(
      K.div,
      {
        "data-state": Dd(o.value, o.max),
        "data-value": o.value ?? void 0,
        "data-max": o.max,
        ...r,
        ref: t
      }
    );
  }
);
Nd.displayName = Md;
function Mb(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function Dd(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Vr(e) {
  return typeof e == "number";
}
function Cs(e) {
  return Vr(e) && !isNaN(e) && e > 0;
}
function ks(e, t) {
  return Vr(e) && !isNaN(e) && e <= t && e >= 0;
}
function Nb(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Mi}\`.`;
}
function Db(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Mi} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Pb = Rd, Tb = Nd;
function _b(e, t) {
  return m.useReducer((n, r) => t[n][r] ?? n, e);
}
var Ni = "ScrollArea", [Pd, wR] = Le(Ni), [Ob, Ue] = Pd(Ni), Td = m.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, l] = m.useState(null), [d, c] = m.useState(null), [f, h] = m.useState(null), [p, v] = m.useState(null), [g, b] = m.useState(null), [w, x] = m.useState(0), [y, S] = m.useState(0), [C, R] = m.useState(!1), [k, E] = m.useState(!1), M = ae(t, (_) => l(_)), T = vn(o);
    return /* @__PURE__ */ u(
      Ob,
      {
        scope: n,
        type: r,
        dir: T,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: d,
        onViewportChange: c,
        content: f,
        onContentChange: h,
        scrollbarX: p,
        onScrollbarXChange: v,
        scrollbarXEnabled: C,
        onScrollbarXEnabledChange: R,
        scrollbarY: g,
        onScrollbarYChange: b,
        scrollbarYEnabled: k,
        onScrollbarYEnabledChange: E,
        onCornerWidthChange: x,
        onCornerHeightChange: S,
        children: /* @__PURE__ */ u(
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
Td.displayName = Ni;
var _d = "ScrollAreaViewport", Od = m.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = Ue(_d, n), i = m.useRef(null), l = ae(t, i, s.onViewportChange);
    return /* @__PURE__ */ I(_e, { children: [
      /* @__PURE__ */ u(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ u(
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
          children: /* @__PURE__ */ u("div", { ref: s.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
Od.displayName = _d;
var ct = "ScrollAreaScrollbar", Ra = m.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Ue(ct, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return m.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ u(Ab, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ u(Ib, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ u(Ad, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ u(Di, { ...r, ref: t }) : null;
  }
);
Ra.displayName = ct;
var Ab = m.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Ue(ct, e.__scopeScrollArea), [a, s] = m.useState(!1);
  return m.useEffect(() => {
    const i = o.scrollArea;
    let l = 0;
    if (i) {
      const d = () => {
        window.clearTimeout(l), s(!0);
      }, c = () => {
        l = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", d), i.addEventListener("pointerleave", c), () => {
        window.clearTimeout(l), i.removeEventListener("pointerenter", d), i.removeEventListener("pointerleave", c);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ u(Oe, { present: n || a, children: /* @__PURE__ */ u(
    Ad,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), Ib = m.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Ue(ct, e.__scopeScrollArea), a = e.orientation === "horizontal", s = yo(() => l("SCROLL_END"), 100), [i, l] = _b("hidden", {
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
  return m.useEffect(() => {
    if (i === "idle") {
      const d = window.setTimeout(() => l("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(d);
    }
  }, [i, o.scrollHideDelay, l]), m.useEffect(() => {
    const d = o.viewport, c = a ? "scrollLeft" : "scrollTop";
    if (d) {
      let f = d[c];
      const h = () => {
        const p = d[c];
        f !== p && (l("SCROLL"), s()), f = p;
      };
      return d.addEventListener("scroll", h), () => d.removeEventListener("scroll", h);
    }
  }, [o.viewport, a, l, s]), /* @__PURE__ */ u(Oe, { present: n || i !== "hidden", children: /* @__PURE__ */ u(
    Di,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: H(e.onPointerEnter, () => l("POINTER_ENTER")),
      onPointerLeave: H(e.onPointerLeave, () => l("POINTER_LEAVE"))
    }
  ) });
}), Ad = m.forwardRef((e, t) => {
  const n = Ue(ct, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = m.useState(!1), i = e.orientation === "horizontal", l = yo(() => {
    if (n.viewport) {
      const d = n.viewport.offsetWidth < n.viewport.scrollWidth, c = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? d : c);
    }
  }, 10);
  return mn(n.viewport, l), mn(n.content, l), /* @__PURE__ */ u(Oe, { present: r || a, children: /* @__PURE__ */ u(
    Di,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), Di = m.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = Ue(ct, e.__scopeScrollArea), a = m.useRef(null), s = m.useRef(0), [i, l] = m.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = zd(i.viewport, i.content), c = {
    ...r,
    sizes: i,
    onSizesChange: l,
    hasThumb: d > 0 && d < 1,
    onThumbChange: (h) => a.current = h,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (h) => s.current = h
  };
  function f(h, p) {
    return Hb(h, s.current, i, p);
  }
  return n === "horizontal" ? /* @__PURE__ */ u(
    Lb,
    {
      ...c,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const h = o.viewport.scrollLeft, p = Es(h, i, o.dir);
          a.current.style.transform = `translate3d(${p}px, 0, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = f(h, o.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ u(
    zb,
    {
      ...c,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const h = o.viewport.scrollTop, p = Es(h, i);
          a.current.style.transform = `translate3d(0, ${p}px, 0)`;
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
}), Lb = m.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Ue(ct, e.__scopeScrollArea), [s, i] = m.useState(), l = m.useRef(null), d = ae(t, l, a.onScrollbarXChange);
  return m.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ u(
    Ld,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: d,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": wo(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (c) => e.onThumbPointerDown(c.x),
      onDragScroll: (c) => e.onDragScroll(c.x),
      onWheelScroll: (c, f) => {
        if (a.viewport) {
          const h = a.viewport.scrollLeft + c.deltaX;
          e.onWheelScroll(h), Fd(h, f) && c.preventDefault();
        }
      },
      onResize: () => {
        l.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: l.current.clientWidth,
            paddingStart: Gr(s.paddingLeft),
            paddingEnd: Gr(s.paddingRight)
          }
        });
      }
    }
  );
}), zb = m.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Ue(ct, e.__scopeScrollArea), [s, i] = m.useState(), l = m.useRef(null), d = ae(t, l, a.onScrollbarYChange);
  return m.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ u(
    Ld,
    {
      "data-orientation": "vertical",
      ...o,
      ref: d,
      sizes: n,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": wo(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (c) => e.onThumbPointerDown(c.y),
      onDragScroll: (c) => e.onDragScroll(c.y),
      onWheelScroll: (c, f) => {
        if (a.viewport) {
          const h = a.viewport.scrollTop + c.deltaY;
          e.onWheelScroll(h), Fd(h, f) && c.preventDefault();
        }
      },
      onResize: () => {
        l.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: l.current.clientHeight,
            paddingStart: Gr(s.paddingTop),
            paddingEnd: Gr(s.paddingBottom)
          }
        });
      }
    }
  );
}), [$b, Id] = Pd(ct), Ld = m.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: l,
    onDragScroll: d,
    onWheelScroll: c,
    onResize: f,
    ...h
  } = e, p = Ue(ct, n), [v, g] = m.useState(null), b = ae(t, (M) => g(M)), w = m.useRef(null), x = m.useRef(""), y = p.viewport, S = r.content - r.viewport, C = De(c), R = De(l), k = yo(f, 10);
  function E(M) {
    if (w.current) {
      const T = M.clientX - w.current.left, _ = M.clientY - w.current.top;
      d({ x: T, y: _ });
    }
  }
  return m.useEffect(() => {
    const M = (T) => {
      const _ = T.target;
      (v == null ? void 0 : v.contains(_)) && C(T, S);
    };
    return document.addEventListener("wheel", M, { passive: !1 }), () => document.removeEventListener("wheel", M, { passive: !1 });
  }, [y, v, S, C]), m.useEffect(R, [r, R]), mn(v, k), mn(p.content, k), /* @__PURE__ */ u(
    $b,
    {
      scope: n,
      scrollbar: v,
      hasThumb: o,
      onThumbChange: De(a),
      onThumbPointerUp: De(s),
      onThumbPositionChange: R,
      onThumbPointerDown: De(i),
      children: /* @__PURE__ */ u(
        K.div,
        {
          ...h,
          ref: b,
          style: { position: "absolute", ...h.style },
          onPointerDown: H(e.onPointerDown, (M) => {
            M.button === 0 && (M.target.setPointerCapture(M.pointerId), w.current = v.getBoundingClientRect(), x.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", p.viewport && (p.viewport.style.scrollBehavior = "auto"), E(M));
          }),
          onPointerMove: H(e.onPointerMove, E),
          onPointerUp: H(e.onPointerUp, (M) => {
            const T = M.target;
            T.hasPointerCapture(M.pointerId) && T.releasePointerCapture(M.pointerId), document.body.style.webkitUserSelect = x.current, p.viewport && (p.viewport.style.scrollBehavior = ""), w.current = null;
          })
        }
      )
    }
  );
}), Yr = "ScrollAreaThumb", Ma = m.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Id(Yr, e.__scopeScrollArea);
    return /* @__PURE__ */ u(Oe, { present: n || o.hasThumb, children: /* @__PURE__ */ u(Fb, { ref: t, ...r }) });
  }
), Fb = m.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = Ue(Yr, n), s = Id(Yr, n), { onThumbPositionChange: i } = s, l = ae(
      t,
      (f) => s.onThumbChange(f)
    ), d = m.useRef(void 0), c = yo(() => {
      d.current && (d.current(), d.current = void 0);
    }, 100);
    return m.useEffect(() => {
      const f = a.viewport;
      if (f) {
        const h = () => {
          if (c(), !d.current) {
            const p = Vb(f, i);
            d.current = p, i();
          }
        };
        return i(), f.addEventListener("scroll", h), () => f.removeEventListener("scroll", h);
      }
    }, [a.viewport, c, i]), /* @__PURE__ */ u(
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
        onPointerDownCapture: H(e.onPointerDownCapture, (f) => {
          const p = f.target.getBoundingClientRect(), v = f.clientX - p.left, g = f.clientY - p.top;
          s.onThumbPointerDown({ x: v, y: g });
        }),
        onPointerUp: H(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
Ma.displayName = Yr;
var Pi = "ScrollAreaCorner", Wb = m.forwardRef(
  (e, t) => {
    const n = Ue(Pi, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ u(Bb, { ...e, ref: t }) : null;
  }
);
Wb.displayName = Pi;
var Bb = m.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = Ue(Pi, n), [a, s] = m.useState(0), [i, l] = m.useState(0), d = !!(a && i);
  return mn(o.scrollbarX, () => {
    var f;
    const c = ((f = o.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    o.onCornerHeightChange(c), l(c);
  }), mn(o.scrollbarY, () => {
    var f;
    const c = ((f = o.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    o.onCornerWidthChange(c), s(c);
  }), d ? /* @__PURE__ */ u(
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
function Gr(e) {
  return e ? parseInt(e, 10) : 0;
}
function zd(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function wo(e) {
  const t = zd(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function Hb(e, t, n, r = "ltr") {
  const o = wo(n), a = o / 2, s = t || a, i = o - s, l = n.scrollbar.paddingStart + s, d = n.scrollbar.size - n.scrollbar.paddingEnd - i, c = n.content - n.viewport, f = r === "ltr" ? [0, c] : [c * -1, 0];
  return $d([l, d], f)(e);
}
function Es(e, t, n = "ltr") {
  const r = wo(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, l = n === "ltr" ? [0, s] : [s * -1, 0], d = Gn(e, l);
  return $d([0, s], [0, i])(d);
}
function $d(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Fd(e, t) {
  return e > 0 && e < t;
}
var Vb = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return (function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
};
function yo(e, t) {
  const n = De(e), r = m.useRef(0);
  return m.useEffect(() => () => window.clearTimeout(r.current), []), m.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function mn(e, t) {
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
var Yb = Td, Gb = Od, Ub = [" ", "Enter", "ArrowUp", "ArrowDown"], jb = [" ", "Enter"], jt = "Select", [xo, So, Kb] = Xr(jt), [Cn, yR] = Le(jt, [
  Kb,
  Ot
]), Co = Ot(), [qb, Lt] = Cn(jt), [Xb, Zb] = Cn(jt), Wd = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: l,
    dir: d,
    name: c,
    autoComplete: f,
    disabled: h,
    required: p,
    form: v
  } = e, g = Co(t), [b, w] = m.useState(null), [x, y] = m.useState(null), [S, C] = m.useState(!1), R = vn(d), [k, E] = Ge({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: jt
  }), [M, T] = Ge({
    prop: s,
    defaultProp: i,
    onChange: l,
    caller: jt
  }), _ = m.useRef(null), L = b ? v || !!b.closest("form") : !0, [A, Y] = m.useState(/* @__PURE__ */ new Set()), j = Array.from(A).map((F) => F.props.value).join(";");
  return /* @__PURE__ */ u(Jn, { ...g, children: /* @__PURE__ */ I(
    qb,
    {
      required: p,
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
      open: k,
      onOpenChange: E,
      dir: R,
      triggerPointerDownPosRef: _,
      disabled: h,
      children: [
        /* @__PURE__ */ u(xo.Provider, { scope: t, children: /* @__PURE__ */ u(
          Xb,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: m.useCallback((F) => {
              Y((U) => new Set(U).add(F));
            }, []),
            onNativeOptionRemove: m.useCallback((F) => {
              Y((U) => {
                const D = new Set(U);
                return D.delete(F), D;
              });
            }, []),
            children: n
          }
        ) }),
        L ? /* @__PURE__ */ I(
          uu,
          {
            "aria-hidden": !0,
            required: p,
            tabIndex: -1,
            name: c,
            autoComplete: f,
            value: M,
            onChange: (F) => T(F.target.value),
            disabled: h,
            form: v,
            children: [
              M === void 0 ? /* @__PURE__ */ u("option", { value: "" }) : null,
              Array.from(A)
            ]
          },
          j
        ) : null
      ]
    }
  ) });
};
Wd.displayName = jt;
var Bd = "SelectTrigger", Hd = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = Co(n), s = Lt(Bd, n), i = s.disabled || r, l = ae(t, s.onTriggerChange), d = So(n), c = m.useRef("touch"), [f, h, p] = mu((g) => {
      const b = d().filter((y) => !y.disabled), w = b.find((y) => y.value === s.value), x = hu(b, g, w);
      x !== void 0 && s.onValueChange(x.value);
    }), v = (g) => {
      i || (s.onOpenChange(!0), p()), g && (s.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ u(er, { asChild: !0, ...a, children: /* @__PURE__ */ u(
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
        "data-placeholder": fu(s.value) ? "" : void 0,
        ...o,
        ref: l,
        onClick: H(o.onClick, (g) => {
          g.currentTarget.focus(), c.current !== "mouse" && v(g);
        }),
        onPointerDown: H(o.onPointerDown, (g) => {
          c.current = g.pointerType;
          const b = g.target;
          b.hasPointerCapture(g.pointerId) && b.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (v(g), g.preventDefault());
        }),
        onKeyDown: H(o.onKeyDown, (g) => {
          const b = f.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && h(g.key), !(b && g.key === " ") && Ub.includes(g.key) && (v(), g.preventDefault());
        })
      }
    ) });
  }
);
Hd.displayName = Bd;
var Vd = "SelectValue", Yd = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, l = Lt(Vd, n), { onValueNodeHasChildrenChange: d } = l, c = a !== void 0, f = ae(t, l.onValueNodeChange);
    return ke(() => {
      d(c);
    }, [d, c]), /* @__PURE__ */ u(
      K.span,
      {
        ...i,
        ref: f,
        style: { pointerEvents: "none" },
        children: fu(l.value) ? /* @__PURE__ */ u(_e, { children: s }) : a
      }
    );
  }
);
Yd.displayName = Vd;
var Qb = "SelectIcon", Gd = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ u(K.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Gd.displayName = Qb;
var Jb = "SelectPortal", Ud = (e) => /* @__PURE__ */ u(wn, { asChild: !0, ...e });
Ud.displayName = Jb;
var Kt = "SelectContent", jd = m.forwardRef(
  (e, t) => {
    const n = Lt(Kt, e.__scopeSelect), [r, o] = m.useState();
    if (ke(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? qr.createPortal(
        /* @__PURE__ */ u(Kd, { scope: e.__scopeSelect, children: /* @__PURE__ */ u(xo.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ u("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ u(qd, { ...e, ref: t });
  }
);
jd.displayName = Kt;
var Ke = 10, [Kd, zt] = Cn(Kt), ew = "SelectContentImpl", tw = /* @__PURE__ */ Dt("SelectContent.RemoveScroll"), qd = m.forwardRef(
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
      align: d,
      alignOffset: c,
      arrowPadding: f,
      collisionBoundary: h,
      collisionPadding: p,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b,
      //
      ...w
    } = e, x = Lt(Kt, n), [y, S] = m.useState(null), [C, R] = m.useState(null), k = ae(t, (z) => S(z)), [E, M] = m.useState(null), [T, _] = m.useState(
      null
    ), L = So(n), [A, Y] = m.useState(!1), j = m.useRef(!1);
    m.useEffect(() => {
      if (y) return Jr(y);
    }, [y]), Zr();
    const F = m.useCallback(
      (z) => {
        const [te, ...J] = L().map((me) => me.ref.current), [ie] = J.slice(-1), ce = document.activeElement;
        for (const me of z)
          if (me === ce || (me == null || me.scrollIntoView({ block: "nearest" }), me === te && C && (C.scrollTop = 0), me === ie && C && (C.scrollTop = C.scrollHeight), me == null || me.focus(), document.activeElement !== ce)) return;
      },
      [L, C]
    ), U = m.useCallback(
      () => F([E, y]),
      [F, E, y]
    );
    m.useEffect(() => {
      A && U();
    }, [A, U]);
    const { onOpenChange: D, triggerPointerDownPosRef: O } = x;
    m.useEffect(() => {
      if (y) {
        let z = { x: 0, y: 0 };
        const te = (ie) => {
          var ce, me;
          z = {
            x: Math.abs(Math.round(ie.pageX) - (((ce = O.current) == null ? void 0 : ce.x) ?? 0)),
            y: Math.abs(Math.round(ie.pageY) - (((me = O.current) == null ? void 0 : me.y) ?? 0))
          };
        }, J = (ie) => {
          z.x <= 10 && z.y <= 10 ? ie.preventDefault() : y.contains(ie.target) || D(!1), document.removeEventListener("pointermove", te), O.current = null;
        };
        return O.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", J, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", J, { capture: !0 });
        };
      }
    }, [y, D, O]), m.useEffect(() => {
      const z = () => D(!1);
      return window.addEventListener("blur", z), window.addEventListener("resize", z), () => {
        window.removeEventListener("blur", z), window.removeEventListener("resize", z);
      };
    }, [D]);
    const [Z, se] = mu((z) => {
      const te = L().filter((ce) => !ce.disabled), J = te.find((ce) => ce.ref.current === document.activeElement), ie = hu(te, z, J);
      ie && setTimeout(() => ie.ref.current.focus());
    }), P = m.useCallback(
      (z, te, J) => {
        const ie = !j.current && !J;
        (x.value !== void 0 && x.value === te || ie) && (M(z), ie && (j.current = !0));
      },
      [x.value]
    ), B = m.useCallback(() => y == null ? void 0 : y.focus(), [y]), W = m.useCallback(
      (z, te, J) => {
        const ie = !j.current && !J;
        (x.value !== void 0 && x.value === te || ie) && _(z);
      },
      [x.value]
    ), G = r === "popper" ? Na : Xd, oe = G === Na ? {
      side: i,
      sideOffset: l,
      align: d,
      alignOffset: c,
      arrowPadding: f,
      collisionBoundary: h,
      collisionPadding: p,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ u(
      Kd,
      {
        scope: n,
        content: y,
        viewport: C,
        onViewportChange: R,
        itemRefCallback: P,
        selectedItem: E,
        onItemLeave: B,
        itemTextRefCallback: W,
        focusSelectedItem: U,
        selectedItemText: T,
        position: r,
        isPositioned: A,
        searchRef: Z,
        children: /* @__PURE__ */ u(Zn, { as: tw, allowPinchZoom: !0, children: /* @__PURE__ */ u(
          Xn,
          {
            asChild: !0,
            trapped: x.open,
            onMountAutoFocus: (z) => {
              z.preventDefault();
            },
            onUnmountAutoFocus: H(o, (z) => {
              var te;
              (te = x.trigger) == null || te.focus({ preventScroll: !0 }), z.preventDefault();
            }),
            children: /* @__PURE__ */ u(
              bn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: (z) => z.preventDefault(),
                onDismiss: () => x.onOpenChange(!1),
                children: /* @__PURE__ */ u(
                  G,
                  {
                    role: "listbox",
                    id: x.contentId,
                    "data-state": x.open ? "open" : "closed",
                    dir: x.dir,
                    onContextMenu: (z) => z.preventDefault(),
                    ...w,
                    ...oe,
                    onPlaced: () => Y(!0),
                    ref: k,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: H(w.onKeyDown, (z) => {
                      const te = z.ctrlKey || z.altKey || z.metaKey;
                      if (z.key === "Tab" && z.preventDefault(), !te && z.key.length === 1 && se(z.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(z.key)) {
                        let ie = L().filter((ce) => !ce.disabled).map((ce) => ce.ref.current);
                        if (["ArrowUp", "End"].includes(z.key) && (ie = ie.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(z.key)) {
                          const ce = z.target, me = ie.indexOf(ce);
                          ie = ie.slice(me + 1);
                        }
                        setTimeout(() => F(ie)), z.preventDefault();
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
qd.displayName = ew;
var nw = "SelectItemAlignedPosition", Xd = m.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = Lt(Kt, n), s = zt(Kt, n), [i, l] = m.useState(null), [d, c] = m.useState(null), f = ae(t, (k) => c(k)), h = So(n), p = m.useRef(!1), v = m.useRef(!0), { viewport: g, selectedItem: b, selectedItemText: w, focusSelectedItem: x } = s, y = m.useCallback(() => {
    if (a.trigger && a.valueNode && i && d && g && b && w) {
      const k = a.trigger.getBoundingClientRect(), E = d.getBoundingClientRect(), M = a.valueNode.getBoundingClientRect(), T = w.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const ce = T.left - E.left, me = M.left - ce, Te = k.left - me, ne = k.width + Te, Je = Math.max(ne, E.width), et = window.innerWidth - Ke, je = Gn(me, [
          Ke,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Ke, et - Je)
        ]);
        i.style.minWidth = ne + "px", i.style.left = je + "px";
      } else {
        const ce = E.right - T.right, me = window.innerWidth - M.right - ce, Te = window.innerWidth - k.right - me, ne = k.width + Te, Je = Math.max(ne, E.width), et = window.innerWidth - Ke, je = Gn(me, [
          Ke,
          Math.max(Ke, et - Je)
        ]);
        i.style.minWidth = ne + "px", i.style.right = je + "px";
      }
      const _ = h(), L = window.innerHeight - Ke * 2, A = g.scrollHeight, Y = window.getComputedStyle(d), j = parseInt(Y.borderTopWidth, 10), F = parseInt(Y.paddingTop, 10), U = parseInt(Y.borderBottomWidth, 10), D = parseInt(Y.paddingBottom, 10), O = j + F + A + D + U, Z = Math.min(b.offsetHeight * 5, O), se = window.getComputedStyle(g), P = parseInt(se.paddingTop, 10), B = parseInt(se.paddingBottom, 10), W = k.top + k.height / 2 - Ke, G = L - W, oe = b.offsetHeight / 2, z = b.offsetTop + oe, te = j + F + z, J = O - te;
      if (te <= W) {
        const ce = _.length > 0 && b === _[_.length - 1].ref.current;
        i.style.bottom = "0px";
        const me = d.clientHeight - g.offsetTop - g.offsetHeight, Te = Math.max(
          G,
          oe + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ce ? B : 0) + me + U
        ), ne = te + Te;
        i.style.height = ne + "px";
      } else {
        const ce = _.length > 0 && b === _[0].ref.current;
        i.style.top = "0px";
        const Te = Math.max(
          W,
          j + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ce ? P : 0) + oe
        ) + J;
        i.style.height = Te + "px", g.scrollTop = te - W + g.offsetTop;
      }
      i.style.margin = `${Ke}px 0`, i.style.minHeight = Z + "px", i.style.maxHeight = L + "px", r == null || r(), requestAnimationFrame(() => p.current = !0);
    }
  }, [
    h,
    a.trigger,
    a.valueNode,
    i,
    d,
    g,
    b,
    w,
    a.dir,
    r
  ]);
  ke(() => y(), [y]);
  const [S, C] = m.useState();
  ke(() => {
    d && C(window.getComputedStyle(d).zIndex);
  }, [d]);
  const R = m.useCallback(
    (k) => {
      k && v.current === !0 && (y(), x == null || x(), v.current = !1);
    },
    [y, x]
  );
  return /* @__PURE__ */ u(
    ow,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: p,
      onScrollButtonChange: R,
      children: /* @__PURE__ */ u(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ u(
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
Xd.displayName = nw;
var rw = "SelectPopperPosition", Na = m.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Ke,
    ...a
  } = e, s = Co(n);
  return /* @__PURE__ */ u(
    mo,
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
Na.displayName = rw;
var [ow, Ti] = Cn(Kt, {}), Da = "SelectViewport", Zd = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = zt(Da, n), s = Ti(Da, n), i = ae(t, a.onViewportChange), l = m.useRef(0);
    return /* @__PURE__ */ I(_e, { children: [
      /* @__PURE__ */ u(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ u(xo.Slot, { scope: n, children: /* @__PURE__ */ u(
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
          onScroll: H(o.onScroll, (d) => {
            const c = d.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: h } = s;
            if (h != null && h.current && f) {
              const p = Math.abs(l.current - c.scrollTop);
              if (p > 0) {
                const v = window.innerHeight - Ke * 2, g = parseFloat(f.style.minHeight), b = parseFloat(f.style.height), w = Math.max(g, b);
                if (w < v) {
                  const x = w + p, y = Math.min(v, x), S = x - y;
                  f.style.height = y + "px", f.style.bottom === "0px" && (c.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end");
                }
              }
            }
            l.current = c.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Zd.displayName = Da;
var Qd = "SelectGroup", [aw, iw] = Cn(Qd), Jd = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Ce();
    return /* @__PURE__ */ u(aw, { scope: n, id: o, children: /* @__PURE__ */ u(K.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
Jd.displayName = Qd;
var eu = "SelectLabel", tu = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = iw(eu, n);
    return /* @__PURE__ */ u(K.div, { id: o.id, ...r, ref: t });
  }
);
tu.displayName = eu;
var Ur = "SelectItem", [sw, nu] = Cn(Ur), ru = m.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = Lt(Ur, n), l = zt(Ur, n), d = i.value === r, [c, f] = m.useState(a ?? ""), [h, p] = m.useState(!1), v = ae(
      t,
      (x) => {
        var y;
        return (y = l.itemRefCallback) == null ? void 0 : y.call(l, x, r, o);
      }
    ), g = Ce(), b = m.useRef("touch"), w = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ u(
      sw,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: g,
        isSelected: d,
        onItemTextChange: m.useCallback((x) => {
          f((y) => y || ((x == null ? void 0 : x.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ u(
          xo.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: c,
            children: /* @__PURE__ */ u(
              K.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": d && h,
                "data-state": d ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: v,
                onFocus: H(s.onFocus, () => p(!0)),
                onBlur: H(s.onBlur, () => p(!1)),
                onClick: H(s.onClick, () => {
                  b.current !== "mouse" && w();
                }),
                onPointerUp: H(s.onPointerUp, () => {
                  b.current === "mouse" && w();
                }),
                onPointerDown: H(s.onPointerDown, (x) => {
                  b.current = x.pointerType;
                }),
                onPointerMove: H(s.onPointerMove, (x) => {
                  var y;
                  b.current = x.pointerType, o ? (y = l.onItemLeave) == null || y.call(l) : b.current === "mouse" && x.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: H(s.onPointerLeave, (x) => {
                  var y;
                  x.currentTarget === document.activeElement && ((y = l.onItemLeave) == null || y.call(l));
                }),
                onKeyDown: H(s.onKeyDown, (x) => {
                  var S;
                  ((S = l.searchRef) == null ? void 0 : S.current) !== "" && x.key === " " || (jb.includes(x.key) && w(), x.key === " " && x.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
ru.displayName = Ur;
var $n = "SelectItemText", ou = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = Lt($n, n), i = zt($n, n), l = nu($n, n), d = Zb($n, n), [c, f] = m.useState(null), h = ae(
      t,
      (w) => f(w),
      l.onItemTextChange,
      (w) => {
        var x;
        return (x = i.itemTextRefCallback) == null ? void 0 : x.call(i, w, l.value, l.disabled);
      }
    ), p = c == null ? void 0 : c.textContent, v = m.useMemo(
      () => /* @__PURE__ */ u("option", { value: l.value, disabled: l.disabled, children: p }, l.value),
      [l.disabled, l.value, p]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: b } = d;
    return ke(() => (g(v), () => b(v)), [g, b, v]), /* @__PURE__ */ I(_e, { children: [
      /* @__PURE__ */ u(K.span, { id: l.textId, ...a, ref: h }),
      l.isSelected && s.valueNode && !s.valueNodeHasChildren ? qr.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
ou.displayName = $n;
var au = "SelectItemIndicator", iu = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return nu(au, n).isSelected ? /* @__PURE__ */ u(K.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
iu.displayName = au;
var Pa = "SelectScrollUpButton", su = m.forwardRef((e, t) => {
  const n = zt(Pa, e.__scopeSelect), r = Ti(Pa, e.__scopeSelect), [o, a] = m.useState(!1), s = ae(t, r.onScrollButtonChange);
  return ke(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const d = l.scrollTop > 0;
        a(d);
      };
      const l = n.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ u(
    cu,
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
su.displayName = Pa;
var Ta = "SelectScrollDownButton", lu = m.forwardRef((e, t) => {
  const n = zt(Ta, e.__scopeSelect), r = Ti(Ta, e.__scopeSelect), [o, a] = m.useState(!1), s = ae(t, r.onScrollButtonChange);
  return ke(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const d = l.scrollHeight - l.clientHeight, c = Math.ceil(l.scrollTop) < d;
        a(c);
      };
      const l = n.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ u(
    cu,
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
lu.displayName = Ta;
var cu = m.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = zt("SelectScrollButton", n), s = m.useRef(null), i = So(n), l = m.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return m.useEffect(() => () => l(), [l]), ke(() => {
    var c;
    const d = i().find((f) => f.ref.current === document.activeElement);
    (c = d == null ? void 0 : d.ref.current) == null || c.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ u(
    K.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: H(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: H(o.onPointerMove, () => {
        var d;
        (d = a.onItemLeave) == null || d.call(a), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: H(o.onPointerLeave, () => {
        l();
      })
    }
  );
}), lw = "SelectSeparator", du = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ u(K.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
du.displayName = lw;
var _a = "SelectArrow", cw = m.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Co(n), a = Lt(_a, n), s = zt(_a, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ u(ho, { ...o, ...r, ref: t }) : null;
  }
);
cw.displayName = _a;
var dw = "SelectBubbleInput", uu = m.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = m.useRef(null), a = ae(r, o), s = ao(t);
    return m.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const l = window.HTMLSelectElement.prototype, c = Object.getOwnPropertyDescriptor(
        l,
        "value"
      ).set;
      if (s !== t && c) {
        const f = new Event("change", { bubbles: !0 });
        c.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ u(
      K.select,
      {
        ...n,
        style: { ...fl, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
uu.displayName = dw;
function fu(e) {
  return e === "" || e === void 0;
}
function mu(e) {
  const t = De(e), n = m.useRef(""), r = m.useRef(0), o = m.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), (function l(d) {
        n.current = d, window.clearTimeout(r.current), d !== "" && (r.current = window.setTimeout(() => l(""), 1e3));
      })(i);
    },
    [t]
  ), a = m.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return m.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function hu(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = uw(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((d) => d !== n));
  const l = s.find(
    (d) => d.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function uw(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var fw = Wd, mw = Hd, hw = Yd, pw = Gd, gw = Ud, vw = jd, bw = Zd, ww = Jd, yw = tu, xw = ru, Sw = ou, Cw = iu, kw = su, Ew = lu, Rw = du, Mw = "Separator", Rs = "horizontal", Nw = ["horizontal", "vertical"], pu = m.forwardRef((e, t) => {
  const { decorative: n, orientation: r = Rs, ...o } = e, a = Dw(r) ? r : Rs, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ u(
    K.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
pu.displayName = Mw;
function Dw(e) {
  return Nw.includes(e);
}
var Pw = pu, gu = ["PageUp", "PageDown"], vu = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], bu = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, kn = "Slider", [Oa, Tw, _w] = Xr(kn), [wu, xR] = Le(kn, [
  _w
]), [Ow, ko] = wu(kn), yu = m.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: l = 0,
      defaultValue: d = [r],
      value: c,
      onValueChange: f = () => {
      },
      onValueCommit: h = () => {
      },
      inverted: p = !1,
      form: v,
      ...g
    } = e, b = m.useRef(/* @__PURE__ */ new Set()), w = m.useRef(0), y = s === "horizontal" ? Aw : Iw, [S = [], C] = Ge({
      prop: c,
      defaultProp: d,
      onChange: (_) => {
        var A;
        (A = [...b.current][w.current]) == null || A.focus(), f(_);
      }
    }), R = m.useRef(S);
    function k(_) {
      const L = Ww(S, _);
      T(_, L);
    }
    function E(_) {
      T(_, w.current);
    }
    function M() {
      const _ = R.current[w.current];
      S[w.current] !== _ && h(S);
    }
    function T(_, L, { commit: A } = { commit: !1 }) {
      const Y = Yw(a), j = Gw(Math.round((_ - r) / a) * a + r, Y), F = Gn(j, [r, o]);
      C((U = []) => {
        const D = $w(U, F, L);
        if (Vw(D, l * a)) {
          w.current = D.indexOf(F);
          const O = String(D) !== String(U);
          return O && A && h(D), O ? D : U;
        } else
          return U;
      });
    }
    return /* @__PURE__ */ u(
      Ow,
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
        children: /* @__PURE__ */ u(Oa.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ u(Oa.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ u(
          y,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: H(g.onPointerDown, () => {
              i || (R.current = S);
            }),
            min: r,
            max: o,
            inverted: p,
            onSlideStart: i ? void 0 : k,
            onSlideMove: i ? void 0 : E,
            onSlideEnd: i ? void 0 : M,
            onHomeKeyDown: () => !i && T(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && T(o, S.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: _, direction: L }) => {
              if (!i) {
                const j = gu.includes(_.key) || _.shiftKey && vu.includes(_.key) ? 10 : 1, F = w.current, U = S[F], D = a * j * L;
                T(U + D, F, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
yu.displayName = kn;
var [xu, Su] = wu(kn, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), Aw = m.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: l,
      onStepKeyDown: d,
      ...c
    } = e, [f, h] = m.useState(null), p = ae(t, (y) => h(y)), v = m.useRef(void 0), g = vn(o), b = g === "ltr", w = b && !a || !b && a;
    function x(y) {
      const S = v.current || f.getBoundingClientRect(), C = [0, S.width], k = _i(C, w ? [n, r] : [r, n]);
      return v.current = S, k(y - S.left);
    }
    return /* @__PURE__ */ u(
      xu,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ u(
          Cu,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...c,
            ref: p,
            style: {
              ...c.style,
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
              const C = bu[w ? "from-left" : "from-right"].includes(y.key);
              d == null || d({ event: y, direction: C ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Iw = m.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: l,
      ...d
    } = e, c = m.useRef(null), f = ae(t, c), h = m.useRef(void 0), p = !o;
    function v(g) {
      const b = h.current || c.current.getBoundingClientRect(), w = [0, b.height], y = _i(w, p ? [r, n] : [n, r]);
      return h.current = b, y(g - b.top);
    }
    return /* @__PURE__ */ u(
      xu,
      {
        scope: e.__scopeSlider,
        startEdge: p ? "bottom" : "top",
        endEdge: p ? "top" : "bottom",
        size: "height",
        direction: p ? 1 : -1,
        children: /* @__PURE__ */ u(
          Cu,
          {
            "data-orientation": "vertical",
            ...d,
            ref: f,
            style: {
              ...d.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (g) => {
              const b = v(g.clientY);
              a == null || a(b);
            },
            onSlideMove: (g) => {
              const b = v(g.clientY);
              s == null || s(b);
            },
            onSlideEnd: () => {
              h.current = void 0, i == null || i();
            },
            onStepKeyDown: (g) => {
              const w = bu[p ? "from-bottom" : "from-top"].includes(g.key);
              l == null || l({ event: g, direction: w ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Cu = m.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: l,
      ...d
    } = e, c = ko(kn, n);
    return /* @__PURE__ */ u(
      K.span,
      {
        ...d,
        ref: t,
        onKeyDown: H(e.onKeyDown, (f) => {
          f.key === "Home" ? (s(f), f.preventDefault()) : f.key === "End" ? (i(f), f.preventDefault()) : gu.concat(vu).includes(f.key) && (l(f), f.preventDefault());
        }),
        onPointerDown: H(e.onPointerDown, (f) => {
          const h = f.target;
          h.setPointerCapture(f.pointerId), f.preventDefault(), c.thumbs.has(h) ? h.focus() : r(f);
        }),
        onPointerMove: H(e.onPointerMove, (f) => {
          f.target.hasPointerCapture(f.pointerId) && o(f);
        }),
        onPointerUp: H(e.onPointerUp, (f) => {
          const h = f.target;
          h.hasPointerCapture(f.pointerId) && (h.releasePointerCapture(f.pointerId), a(f));
        })
      }
    );
  }
), ku = "SliderTrack", Eu = m.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = ko(ku, n);
    return /* @__PURE__ */ u(
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
Eu.displayName = ku;
var Aa = "SliderRange", Ru = m.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = ko(Aa, n), a = Su(Aa, n), s = m.useRef(null), i = ae(t, s), l = o.values.length, d = o.values.map(
      (h) => Du(h, o.min, o.max)
    ), c = l > 1 ? Math.min(...d) : 0, f = 100 - Math.max(...d);
    return /* @__PURE__ */ u(
      K.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: i,
        style: {
          ...e.style,
          [a.startEdge]: c + "%",
          [a.endEdge]: f + "%"
        }
      }
    );
  }
);
Ru.displayName = Aa;
var Ia = "SliderThumb", Mu = m.forwardRef(
  (e, t) => {
    const n = Tw(e.__scopeSlider), [r, o] = m.useState(null), a = ae(t, (i) => o(i)), s = m.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ u(Lw, { ...e, ref: a, index: s });
  }
), Lw = m.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = ko(Ia, n), i = Su(Ia, n), [l, d] = m.useState(null), c = ae(t, (x) => d(x)), f = l ? s.form || !!l.closest("form") : !0, h = io(l), p = s.values[r], v = p === void 0 ? 0 : Du(p, s.min, s.max), g = Fw(r, s.values.length), b = h == null ? void 0 : h[i.size], w = b ? Bw(b, v, i.direction) : 0;
    return m.useEffect(() => {
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
          /* @__PURE__ */ u(Oa.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ u(
            K.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || g,
              "aria-valuemin": s.min,
              "aria-valuenow": p,
              "aria-valuemax": s.max,
              "aria-orientation": s.orientation,
              "data-orientation": s.orientation,
              "data-disabled": s.disabled ? "" : void 0,
              tabIndex: s.disabled ? void 0 : 0,
              ...a,
              ref: c,
              style: p === void 0 ? { display: "none" } : e.style,
              onFocus: H(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          f && /* @__PURE__ */ u(
            Nu,
            {
              name: o ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
              form: s.form,
              value: p
            },
            r
          )
        ]
      }
    );
  }
);
Mu.displayName = Ia;
var zw = "RadioBubbleInput", Nu = m.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = m.useRef(null), a = ae(o, r), s = ao(t);
    return m.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const l = window.HTMLInputElement.prototype, c = Object.getOwnPropertyDescriptor(l, "value").set;
      if (s !== t && c) {
        const f = new Event("input", { bubbles: !0 });
        c.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ u(
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
Nu.displayName = zw;
function $w(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function Du(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return Gn(a, [0, 100]);
}
function Fw(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function Ww(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function Bw(e, t, n) {
  const r = e / 2, a = _i([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function Hw(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function Vw(e, t) {
  if (t > 0) {
    const n = Hw(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function _i(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Yw(e) {
  return (String(e).split(".")[1] || "").length;
}
function Gw(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var Uw = yu, jw = Eu, Kw = Ru, qw = Mu, Eo = "Switch", [Xw, SR] = Le(Eo), [Zw, Qw] = Xw(Eo), Pu = m.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l = "on",
      onCheckedChange: d,
      form: c,
      ...f
    } = e, [h, p] = m.useState(null), v = ae(t, (y) => p(y)), g = m.useRef(!1), b = h ? c || !!h.closest("form") : !0, [w, x] = Ge({
      prop: o,
      defaultProp: a ?? !1,
      onChange: d,
      caller: Eo
    });
    return /* @__PURE__ */ I(Zw, { scope: n, checked: w, disabled: i, children: [
      /* @__PURE__ */ u(
        K.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": s,
          "data-state": Au(w),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...f,
          ref: v,
          onClick: H(e.onClick, (y) => {
            x((S) => !S), b && (g.current = y.isPropagationStopped(), g.current || y.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ u(
        Ou,
        {
          control: h,
          bubbles: !g.current,
          name: r,
          value: l,
          checked: w,
          required: s,
          disabled: i,
          form: c,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Pu.displayName = Eo;
var Tu = "SwitchThumb", _u = m.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Qw(Tu, n);
    return /* @__PURE__ */ u(
      K.span,
      {
        "data-state": Au(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
_u.displayName = Tu;
var Jw = "SwitchBubbleInput", Ou = m.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = m.useRef(null), i = ae(s, a), l = ao(n), d = io(t);
    return m.useEffect(() => {
      const c = s.current;
      if (!c) return;
      const f = window.HTMLInputElement.prototype, p = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (l !== n && p) {
        const v = new Event("click", { bubbles: r });
        p.call(c, n), c.dispatchEvent(v);
      }
    }, [l, n, r]), /* @__PURE__ */ u(
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
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Ou.displayName = Jw;
function Au(e) {
  return e ? "checked" : "unchecked";
}
var ey = Pu, ty = _u, Ro = "Tabs", [ny, CR] = Le(Ro, [
  po
]), Iu = po(), [ry, Oi] = ny(Ro), Lu = m.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: s = "horizontal",
      dir: i,
      activationMode: l = "automatic",
      ...d
    } = e, c = vn(i), [f, h] = Ge({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: Ro
    });
    return /* @__PURE__ */ u(
      ry,
      {
        scope: n,
        baseId: Ce(),
        value: f,
        onValueChange: h,
        orientation: s,
        dir: c,
        activationMode: l,
        children: /* @__PURE__ */ u(
          K.div,
          {
            dir: c,
            "data-orientation": s,
            ...d,
            ref: t
          }
        )
      }
    );
  }
);
Lu.displayName = Ro;
var zu = "TabsList", $u = m.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = Oi(zu, n), s = Iu(n);
    return /* @__PURE__ */ u(
      Mc,
      {
        asChild: !0,
        ...s,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ u(
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
$u.displayName = zu;
var Fu = "TabsTrigger", Wu = m.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, s = Oi(Fu, n), i = Iu(n), l = Vu(s.baseId, r), d = Yu(s.baseId, r), c = r === s.value;
    return /* @__PURE__ */ u(
      Nc,
      {
        asChild: !0,
        ...i,
        focusable: !o,
        active: c,
        children: /* @__PURE__ */ u(
          K.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": c,
            "aria-controls": d,
            "data-state": c ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: l,
            ...a,
            ref: t,
            onMouseDown: H(e.onMouseDown, (f) => {
              !o && f.button === 0 && f.ctrlKey === !1 ? s.onValueChange(r) : f.preventDefault();
            }),
            onKeyDown: H(e.onKeyDown, (f) => {
              [" ", "Enter"].includes(f.key) && s.onValueChange(r);
            }),
            onFocus: H(e.onFocus, () => {
              const f = s.activationMode !== "manual";
              !c && !o && f && s.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
Wu.displayName = Fu;
var Bu = "TabsContent", Hu = m.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...s } = e, i = Oi(Bu, n), l = Vu(i.baseId, r), d = Yu(i.baseId, r), c = r === i.value, f = m.useRef(c);
    return m.useEffect(() => {
      const h = requestAnimationFrame(() => f.current = !1);
      return () => cancelAnimationFrame(h);
    }, []), /* @__PURE__ */ u(Oe, { present: o || c, children: ({ present: h }) => /* @__PURE__ */ u(
      K.div,
      {
        "data-state": c ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": l,
        hidden: !h,
        id: d,
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
Hu.displayName = Bu;
function Vu(e, t) {
  return `${e}-trigger-${t}`;
}
function Yu(e, t) {
  return `${e}-content-${t}`;
}
var oy = Lu, ay = $u, iy = Wu, sy = Hu, [Mo, kR] = Le("Tooltip", [
  Ot
]), No = Ot(), Gu = "TooltipProvider", ly = 700, La = "tooltip.open", [cy, Ai] = Mo(Gu), Uu = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = ly,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = m.useRef(!0), i = m.useRef(!1), l = m.useRef(0);
  return m.useEffect(() => {
    const d = l.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ u(
    cy,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: m.useCallback(() => {
        window.clearTimeout(l.current), s.current = !1;
      }, []),
      onClose: m.useCallback(() => {
        window.clearTimeout(l.current), l.current = window.setTimeout(
          () => s.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: m.useCallback((d) => {
        i.current = d;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
Uu.displayName = Gu;
var Un = "Tooltip", [dy, ir] = Mo(Un), ju = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, l = Ai(Un, e.__scopeTooltip), d = No(t), [c, f] = m.useState(null), h = Ce(), p = m.useRef(0), v = s ?? l.disableHoverableContent, g = i ?? l.delayDuration, b = m.useRef(!1), [w, x] = Ge({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (k) => {
      k ? (l.onOpen(), document.dispatchEvent(new CustomEvent(La))) : l.onClose(), a == null || a(k);
    },
    caller: Un
  }), y = m.useMemo(() => w ? b.current ? "delayed-open" : "instant-open" : "closed", [w]), S = m.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, b.current = !1, x(!0);
  }, [x]), C = m.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, x(!1);
  }, [x]), R = m.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      b.current = !0, x(!0), p.current = 0;
    }, g);
  }, [g, x]);
  return m.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ u(Jn, { ...d, children: /* @__PURE__ */ u(
    dy,
    {
      scope: t,
      contentId: h,
      open: w,
      stateAttribute: y,
      trigger: c,
      onTriggerChange: f,
      onTriggerEnter: m.useCallback(() => {
        l.isOpenDelayedRef.current ? R() : S();
      }, [l.isOpenDelayedRef, R, S]),
      onTriggerLeave: m.useCallback(() => {
        v ? C() : (window.clearTimeout(p.current), p.current = 0);
      }, [C, v]),
      onOpen: S,
      onClose: C,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
ju.displayName = Un;
var za = "TooltipTrigger", Ku = m.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = ir(za, n), a = Ai(za, n), s = No(n), i = m.useRef(null), l = ae(t, i, o.onTriggerChange), d = m.useRef(!1), c = m.useRef(!1), f = m.useCallback(() => d.current = !1, []);
    return m.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ u(er, { asChild: !0, ...s, children: /* @__PURE__ */ u(
      K.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: H(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !c.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: H(e.onPointerLeave, () => {
          o.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: H(e.onPointerDown, () => {
          o.open && o.onClose(), d.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: H(e.onFocus, () => {
          d.current || o.onOpen();
        }),
        onBlur: H(e.onBlur, o.onClose),
        onClick: H(e.onClick, o.onClose)
      }
    ) });
  }
);
Ku.displayName = za;
var Ii = "TooltipPortal", [uy, fy] = Mo(Ii, {
  forceMount: void 0
}), qu = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = ir(Ii, t);
  return /* @__PURE__ */ u(uy, { scope: t, forceMount: n, children: /* @__PURE__ */ u(Oe, { present: n || a.open, children: /* @__PURE__ */ u(wn, { asChild: !0, container: o, children: r }) }) });
};
qu.displayName = Ii;
var hn = "TooltipContent", Xu = m.forwardRef(
  (e, t) => {
    const n = fy(hn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = ir(hn, e.__scopeTooltip);
    return /* @__PURE__ */ u(Oe, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ u(Zu, { side: o, ...a, ref: t }) : /* @__PURE__ */ u(my, { side: o, ...a, ref: t }) });
  }
), my = m.forwardRef((e, t) => {
  const n = ir(hn, e.__scopeTooltip), r = Ai(hn, e.__scopeTooltip), o = m.useRef(null), a = ae(t, o), [s, i] = m.useState(null), { trigger: l, onClose: d } = n, c = o.current, { onPointerInTransitChange: f } = r, h = m.useCallback(() => {
    i(null), f(!1);
  }, [f]), p = m.useCallback(
    (v, g) => {
      const b = v.currentTarget, w = { x: v.clientX, y: v.clientY }, x = vy(w, b.getBoundingClientRect()), y = by(w, x), S = wy(g.getBoundingClientRect()), C = xy([...y, ...S]);
      i(C), f(!0);
    },
    [f]
  );
  return m.useEffect(() => () => h(), [h]), m.useEffect(() => {
    if (l && c) {
      const v = (b) => p(b, c), g = (b) => p(b, l);
      return l.addEventListener("pointerleave", v), c.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", v), c.removeEventListener("pointerleave", g);
      };
    }
  }, [l, c, p, h]), m.useEffect(() => {
    if (s) {
      const v = (g) => {
        const b = g.target, w = { x: g.clientX, y: g.clientY }, x = (l == null ? void 0 : l.contains(b)) || (c == null ? void 0 : c.contains(b)), y = !yy(w, s);
        x ? h() : y && (h(), d());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [l, c, s, d, h]), /* @__PURE__ */ u(Zu, { ...e, ref: a });
}), [hy, py] = Mo(Un, { isInside: !1 }), gy = /* @__PURE__ */ km("TooltipContent"), Zu = m.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, l = ir(hn, n), d = No(n), { onClose: c } = l;
    return m.useEffect(() => (document.addEventListener(La, c), () => document.removeEventListener(La, c)), [c]), m.useEffect(() => {
      if (l.trigger) {
        const f = (h) => {
          const p = h.target;
          p != null && p.contains(l.trigger) && c();
        };
        return window.addEventListener("scroll", f, { capture: !0 }), () => window.removeEventListener("scroll", f, { capture: !0 });
      }
    }, [l.trigger, c]), /* @__PURE__ */ u(
      bn,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ I(
          mo,
          {
            "data-state": l.stateAttribute,
            ...d,
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
              /* @__PURE__ */ u(gy, { children: r }),
              /* @__PURE__ */ u(hy, { scope: n, isInside: !0, children: /* @__PURE__ */ u(Pm, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Xu.displayName = hn;
var Qu = "TooltipArrow", Ju = m.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = No(n);
    return py(
      Qu,
      n
    ).isInside ? null : /* @__PURE__ */ u(ho, { ...o, ...r, ref: t });
  }
);
Ju.displayName = Qu;
function vy(e, t) {
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
function by(e, t, n = 5) {
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
function wy(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function yy(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], l = t[s], d = i.x, c = i.y, f = l.x, h = l.y;
    c > r != h > r && n < (f - d) * (r - c) / (h - c) + d && (o = !o);
  }
  return o;
}
function xy(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Sy(t);
}
function Sy(e) {
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
var Cy = Uu, ky = ju, Ey = Ku, Ry = qu, My = Xu, Ny = Ju;
const Li = "-", Dy = (e) => {
  const t = Ty(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(Li);
      return i[0] === "" && i.length !== 1 && i.shift(), ef(i, t) || Py(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const l = n[s] || [];
      return i && r[s] ? [...l, ...r[s]] : l;
    }
  };
}, ef = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? ef(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Li);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Ms = /^\[(.+)\]$/, Py = (e) => {
  if (Ms.test(e)) {
    const t = Ms.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ty = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    $a(n[o], r, o, t);
  return r;
}, $a = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Ns(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (_y(o)) {
        $a(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      $a(s, Ns(t, a), n, r);
    });
  });
}, Ns = (e, t) => {
  let n = e;
  return t.split(Li).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, _y = (e) => e.isThemeGetter, Oy = (e) => {
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
}, Fa = "!", Wa = ":", Ay = Wa.length, Iy = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const a = [];
    let s = 0, i = 0, l = 0, d;
    for (let v = 0; v < o.length; v++) {
      let g = o[v];
      if (s === 0 && i === 0) {
        if (g === Wa) {
          a.push(o.slice(l, v)), l = v + Ay;
          continue;
        }
        if (g === "/") {
          d = v;
          continue;
        }
      }
      g === "[" ? s++ : g === "]" ? s-- : g === "(" ? i++ : g === ")" && i--;
    }
    const c = a.length === 0 ? o : o.substring(l), f = Ly(c), h = f !== c, p = d && d > l ? d - l : void 0;
    return {
      modifiers: a,
      hasImportantModifier: h,
      baseClassName: f,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + Wa, a = r;
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
}, Ly = (e) => e.endsWith(Fa) ? e.substring(0, e.length - 1) : e.startsWith(Fa) ? e.substring(1) : e, zy = (e) => {
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
}, $y = (e) => ({
  cache: Oy(e.cacheSize),
  parseClassName: Iy(e),
  sortModifiers: zy(e),
  ...Dy(e)
}), Fy = /\s+/, Wy = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, s = [], i = e.trim().split(Fy);
  let l = "";
  for (let d = i.length - 1; d >= 0; d -= 1) {
    const c = i[d], {
      isExternal: f,
      modifiers: h,
      hasImportantModifier: p,
      baseClassName: v,
      maybePostfixModifierPosition: g
    } = n(c);
    if (f) {
      l = c + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!g, w = r(b ? v.substring(0, g) : v);
    if (!w) {
      if (!b) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (w = r(v), !w) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      b = !1;
    }
    const x = a(h).join(":"), y = p ? x + Fa : x, S = y + w;
    if (s.includes(S))
      continue;
    s.push(S);
    const C = o(w, b);
    for (let R = 0; R < C.length; ++R) {
      const k = C[R];
      s.push(y + k);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function By() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = tf(t)) && (r && (r += " "), r += n);
  return r;
}
const tf = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = tf(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Hy(e, ...t) {
  let n, r, o, a = s;
  function s(l) {
    const d = t.reduce((c, f) => f(c), e());
    return n = $y(d), r = n.cache.get, o = n.cache.set, a = i, i(l);
  }
  function i(l) {
    const d = r(l);
    if (d)
      return d;
    const c = Wy(l, n);
    return o(l, c), c;
  }
  return function() {
    return a(By.apply(null, arguments));
  };
}
const Me = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, nf = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, rf = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Vy = /^\d+\/\d+$/, Yy = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Gy = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Uy = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, jy = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ky = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rn = (e) => Vy.test(e), fe = (e) => !!e && !Number.isNaN(Number(e)), Et = (e) => !!e && Number.isInteger(Number(e)), Jo = (e) => e.endsWith("%") && fe(e.slice(0, -1)), mt = (e) => Yy.test(e), qy = () => !0, Xy = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Gy.test(e) && !Uy.test(e)
), of = () => !1, Zy = (e) => jy.test(e), Qy = (e) => Ky.test(e), Jy = (e) => !q(e) && !X(e), ex = (e) => En(e, lf, of), q = (e) => nf.test(e), Wt = (e) => En(e, cf, Xy), ea = (e) => En(e, ax, fe), Ds = (e) => En(e, af, of), tx = (e) => En(e, sf, Qy), Rr = (e) => En(e, df, Zy), X = (e) => rf.test(e), Pn = (e) => Rn(e, cf), nx = (e) => Rn(e, ix), Ps = (e) => Rn(e, af), rx = (e) => Rn(e, lf), ox = (e) => Rn(e, sf), Mr = (e) => Rn(e, df, !0), En = (e, t, n) => {
  const r = nf.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Rn = (e, t, n = !1) => {
  const r = rf.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, af = (e) => e === "position" || e === "percentage", sf = (e) => e === "image" || e === "url", lf = (e) => e === "length" || e === "size" || e === "bg-size", cf = (e) => e === "length", ax = (e) => e === "number", ix = (e) => e === "family-name", df = (e) => e === "shadow", sx = () => {
  const e = Me("color"), t = Me("font"), n = Me("text"), r = Me("font-weight"), o = Me("tracking"), a = Me("leading"), s = Me("breakpoint"), i = Me("container"), l = Me("spacing"), d = Me("radius"), c = Me("shadow"), f = Me("inset-shadow"), h = Me("text-shadow"), p = Me("drop-shadow"), v = Me("blur"), g = Me("perspective"), b = Me("aspect"), w = Me("ease"), x = Me("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], C = () => [...S(), X, q], R = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", "contain", "none"], E = () => [X, q, l], M = () => [rn, "full", "auto", ...E()], T = () => [Et, "none", "subgrid", X, q], _ = () => ["auto", {
    span: ["full", Et, X, q]
  }, Et, X, q], L = () => [Et, "auto", X, q], A = () => ["auto", "min", "max", "fr", X, q], Y = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], j = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...E()], U = () => [rn, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], D = () => [e, X, q], O = () => [...S(), Ps, Ds, {
    position: [X, q]
  }], Z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], se = () => ["auto", "cover", "contain", rx, ex, {
    size: [X, q]
  }], P = () => [Jo, Pn, Wt], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    X,
    q
  ], W = () => ["", fe, Pn, Wt], G = () => ["solid", "dashed", "dotted", "double"], oe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], z = () => [fe, Jo, Ps, Ds], te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    X,
    q
  ], J = () => ["none", fe, X, q], ie = () => ["none", fe, X, q], ce = () => [fe, X, q], me = () => [rn, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [mt],
      breakpoint: [mt],
      color: [qy],
      container: [mt],
      "drop-shadow": [mt],
      ease: ["in", "out", "in-out"],
      font: [Jy],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [mt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [mt],
      shadow: [mt],
      spacing: ["px", fe],
      text: [mt],
      "text-shadow": [mt],
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
        aspect: ["auto", "square", rn, q, X, b]
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
        overscroll: k()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": k()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": k()
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
        z: [Et, "auto", X, q]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [rn, "full", "auto", i, ...E()]
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
        flex: [fe, rn, "auto", "initial", "none", q]
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
        order: [Et, "first", "last", "none", X, q]
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
        col: _()
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
        row: _()
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
        gap: E()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": E()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": E()
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
        p: E()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: E()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: E()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: E()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: E()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: E()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: E()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: E()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: E()
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
        "space-x": E()
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
        "space-y": E()
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
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...U()]
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
          ...U()
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
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Pn, Wt]
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
        font: [r, X, ea]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Jo, q]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [nx, q, t]
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
        "line-clamp": [fe, "none", X, ea]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...E()
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
        placeholder: D()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: D()
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
        decoration: [...G(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [fe, "from-font", "auto", X, Wt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: D()
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
        indent: E()
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
        bg: O()
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
          }, Et, X, q],
          radial: ["", X, q],
          conic: [Et, X, q]
        }, ox, tx]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: D()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: P()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: D()
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
        border: [...G(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...G(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: D()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": D()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": D()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": D()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": D()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": D()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": D()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": D()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": D()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: D()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...G(), "none", "hidden"]
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
        outline: ["", fe, Pn, Wt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: D()
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
          c,
          Mr,
          Rr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: D()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, Mr, Rr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": D()
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
        ring: D()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [fe, Wt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": D()
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
        "inset-ring": D()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", h, Mr, Rr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": D()
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
        "mask-linear-from": z()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": z()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": D()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": D()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": z()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": z()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": D()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": D()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": z()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": z()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": D()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": D()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": z()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": z()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": D()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": D()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": z()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": z()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": D()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": D()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": z()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": z()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": D()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": D()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": z()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": z()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": D()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": D()
      }],
      "mask-image-radial": [{
        "mask-radial": [X, q]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": z()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": z()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": D()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": D()
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
        "mask-conic-from": z()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": z()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": D()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": D()
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
        mask: O()
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
          p,
          Mr,
          Rr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": D()
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
        "border-spacing": E()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": E()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": E()
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
        perspective: [g, X, q]
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
        accent: D()
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
        caret: D()
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
        "scroll-m": E()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
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
        fill: ["none", ...D()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [fe, Pn, Wt, ea]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...D()]
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
}, uf = /* @__PURE__ */ Hy(sx);
function le(...e) {
  return uf(Ja(e));
}
const lx = gn(
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
function ta({
  className: e,
  variant: t = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ u(
    n ? ei : "span",
    {
      "data-slot": "badge",
      "data-variant": t,
      className: le(lx({ variant: t }), e),
      ...r
    }
  );
}
const cx = gn(
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
  return /* @__PURE__ */ u(
    r ? ei : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      className: le(cx({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function ER({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "card",
      "data-size": t,
      className: le("ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col", e),
      ...n
    }
  );
}
function RR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
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
function MR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "card-title",
      className: le("text-base leading-normal font-medium group-data-[size=sm]/card:text-sm cn-font-heading", e),
      ...t
    }
  );
}
function NR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "card-description",
      className: le("text-muted-foreground text-sm", e),
      ...t
    }
  );
}
function DR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
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
function PR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "card-content",
      className: le("px-6 group-data-[size=sm]/card:px-4", e),
      ...t
    }
  );
}
function TR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
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
const dx = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ff = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ux = {
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
const fx = al(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, l) => ba(
    "svg",
    {
      ref: l,
      ...ux,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: ff("lucide", o),
      ...i
    },
    [
      ...s.map(([d, c]) => ba(d, c)),
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
  const n = al(
    ({ className: r, ...o }, a) => ba(fx, {
      ref: a,
      iconNode: t,
      className: ff(`lucide-${dx(e)}`, r),
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
const mx = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], Ts = ye("ArrowDown", mx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hx = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
], px = ye("ArrowLeftToLine", hx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gx = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], vx = ye("ArrowLeft", gx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bx = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], wx = ye("ArrowRightToLine", bx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yx = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], xx = ye("ArrowRight", yx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sx = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], _s = ye("ArrowUp", Sx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cx = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], kx = ye("Calendar", Cx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ex = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], pt = ye("Check", Ex);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rx = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], zi = ye("ChevronDown", Rx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mx = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], mf = ye("ChevronLeft", Mx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nx = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], $i = ye("ChevronRight", Nx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dx = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Px = ye("ChevronUp", Dx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tx = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], _x = ye("ChevronsLeft", Tx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ox = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], Ax = ye("ChevronsRight", Ox);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ix = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], Lx = ye("ChevronsUpDown", Ix);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zx = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], hf = ye("CirclePlus", zx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $x = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Fi = ye("CircleX", $x);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fx = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Wx = ye("LoaderCircle", Fx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bx = [
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
], Hx = ye("PinOff", Bx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vx = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], Yx = ye("Search", Vx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gx = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], pf = ye("Settings2", Gx);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ux = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Wi = ye("X", Ux);
function _R({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ql,
    {
      "data-slot": "checkbox",
      className: le(
        "border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border shadow-xs transition-shadow group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t,
      children: /* @__PURE__ */ u(
        Zl,
        {
          "data-slot": "checkbox-indicator",
          className: "[&>svg]:size-3.5 grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ u(pt, {})
        }
      )
    }
  );
}
function jx(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const gf = N.createContext({
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
}), sr = () => {
  const e = N.useContext(gf);
  if (!e)
    throw new Error("useDrawerContext must be used within a Drawer.Root");
  return e;
};
jx(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);
function Kx() {
  const e = navigator.userAgent;
  return typeof window < "u" && (/Firefox/.test(e) && /Mobile/.test(e) || // Android Firefox
  /FxiOS/.test(e));
}
function qx() {
  return Bi(/^Mac/);
}
function Xx() {
  return Bi(/^iPhone/);
}
function Os() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function Zx() {
  return Bi(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  qx() && navigator.maxTouchPoints > 1;
}
function vf() {
  return Xx() || Zx();
}
function Bi(e) {
  return typeof window < "u" && window.navigator != null ? e.test(window.navigator.platform) : void 0;
}
const Qx = 24, Jx = typeof window < "u" ? Qa : qn;
function As(...e) {
  return (...t) => {
    for (let n of e)
      typeof n == "function" && n(...t);
  };
}
const na = typeof document < "u" && window.visualViewport;
function Is(e) {
  let t = window.getComputedStyle(e);
  return /(auto|scroll)/.test(t.overflow + t.overflowX + t.overflowY);
}
function bf(e) {
  for (Is(e) && (e = e.parentElement); e && !Is(e); )
    e = e.parentElement;
  return e || document.scrollingElement || document.documentElement;
}
const e0 = /* @__PURE__ */ new Set([
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
let Nr = 0, ra;
function t0(e = {}) {
  let { isDisabled: t } = e;
  Jx(() => {
    if (!t)
      return Nr++, Nr === 1 && vf() && (ra = n0()), () => {
        Nr--, Nr === 0 && (ra == null || ra());
      };
  }, [
    t
  ]);
}
function n0() {
  let e, t = 0, n = (f) => {
    e = bf(f.target), !(e === document.documentElement && e === document.body) && (t = f.changedTouches[0].pageY);
  }, r = (f) => {
    if (!e || e === document.documentElement || e === document.body) {
      f.preventDefault();
      return;
    }
    let h = f.changedTouches[0].pageY, p = e.scrollTop, v = e.scrollHeight - e.clientHeight;
    v !== 0 && ((p <= 0 && h > t || p >= v && h < t) && f.preventDefault(), t = h);
  }, o = (f) => {
    let h = f.target;
    Ba(h) && h !== document.activeElement && (f.preventDefault(), h.style.transform = "translateY(-2000px)", h.focus(), requestAnimationFrame(() => {
      h.style.transform = "";
    }));
  }, a = (f) => {
    let h = f.target;
    Ba(h) && (h.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
      h.style.transform = "", na && (na.height < window.innerHeight ? requestAnimationFrame(() => {
        Ls(h);
      }) : na.addEventListener("resize", () => Ls(h), {
        once: !0
      }));
    }));
  }, s = () => {
    window.scrollTo(0, 0);
  }, i = window.pageXOffset, l = window.pageYOffset, d = As(r0(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
  window.scrollTo(0, 0);
  let c = As(Tn(document, "touchstart", n, {
    passive: !1,
    capture: !0
  }), Tn(document, "touchmove", r, {
    passive: !1,
    capture: !0
  }), Tn(document, "touchend", o, {
    passive: !1,
    capture: !0
  }), Tn(document, "focus", a, !0), Tn(window, "scroll", s));
  return () => {
    d(), c(), window.scrollTo(i, l);
  };
}
function r0(e, t, n) {
  let r = e.style[t];
  return e.style[t] = n, () => {
    e.style[t] = r;
  };
}
function Tn(e, t, n, r) {
  return e.addEventListener(t, n, r), () => {
    e.removeEventListener(t, n, r);
  };
}
function Ls(e) {
  let t = document.scrollingElement || document.documentElement;
  for (; e && e !== t; ) {
    let n = bf(e);
    if (n !== document.documentElement && n !== document.body && n !== e) {
      let r = n.getBoundingClientRect().top, o = e.getBoundingClientRect().top, a = e.getBoundingClientRect().bottom;
      const s = n.getBoundingClientRect().bottom + Qx;
      a > s && (n.scrollTop += o - r);
    }
    e = n.parentElement;
  }
}
function Ba(e) {
  return e instanceof HTMLInputElement && !e0.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
function o0(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function a0(...e) {
  return (t) => e.forEach((n) => o0(n, t));
}
function wf(...e) {
  return m.useCallback(a0(...e), e);
}
const yf = /* @__PURE__ */ new WeakMap();
function Ne(e, t, n = !1) {
  if (!e || !(e instanceof HTMLElement)) return;
  let r = {};
  Object.entries(t).forEach(([o, a]) => {
    if (o.startsWith("--")) {
      e.style.setProperty(o, a);
      return;
    }
    r[o] = e.style[o], e.style[o] = a;
  }), !n && yf.set(e, r);
}
function i0(e, t) {
  if (!e || !(e instanceof HTMLElement)) return;
  let n = yf.get(e);
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
function Dr(e, t) {
  if (!e)
    return null;
  const n = window.getComputedStyle(e), r = (
    // @ts-ignore
    n.transform || n.webkitTransform || n.mozTransform
  );
  let o = r.match(/^matrix3d\((.+)\)$/);
  return o ? parseFloat(o[1].split(", ")[Se(t) ? 13 : 12]) : (o = r.match(/^matrix\((.+)\)$/), o ? parseFloat(o[1].split(", ")[Se(t) ? 5 : 4]) : null);
}
function s0(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function oa(e, t) {
  if (!e) return () => {
  };
  const n = e.style.cssText;
  return Object.assign(e.style, t), () => {
    e.style.cssText = n;
  };
}
function l0(...e) {
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
}, xf = 0.4, c0 = 0.25, d0 = 100, Sf = 8, Bt = 16, Ha = 26, aa = "vaul-dragging";
function Cf(e) {
  const t = N.useRef(e);
  return N.useEffect(() => {
    t.current = e;
  }), N.useMemo(() => (...n) => t.current == null ? void 0 : t.current.call(t, ...n), []);
}
function u0({ defaultProp: e, onChange: t }) {
  const n = N.useState(e), [r] = n, o = N.useRef(r), a = Cf(t);
  return N.useEffect(() => {
    o.current !== r && (a(r), o.current = r);
  }, [
    r,
    o,
    a
  ]), n;
}
function kf({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [r, o] = u0({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, s = a ? e : r, i = Cf(n), l = N.useCallback((d) => {
    if (a) {
      const f = typeof d == "function" ? d(e) : d;
      f !== e && i(f);
    } else
      o(d);
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
function f0({ activeSnapPointProp: e, setActiveSnapPointProp: t, snapPoints: n, drawerRef: r, overlayRef: o, fadeFromIndex: a, onSnapPointChange: s, direction: i = "bottom", container: l, snapToSequentialPoint: d }) {
  const [c, f] = kf({
    prop: e,
    defaultProp: n == null ? void 0 : n[0],
    onChange: t
  }), [h, p] = N.useState(typeof window < "u" ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0);
  N.useEffect(() => {
    function k() {
      p({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      });
    }
    return window.addEventListener("resize", k), () => window.removeEventListener("resize", k);
  }, []);
  const v = N.useMemo(() => c === (n == null ? void 0 : n[n.length - 1]) || null, [
    n,
    c
  ]), g = N.useMemo(() => {
    var k;
    return (k = n == null ? void 0 : n.findIndex((E) => E === c)) != null ? k : null;
  }, [
    n,
    c
  ]), b = n && n.length > 0 && (a || a === 0) && !Number.isNaN(a) && n[a] === c || !n, w = N.useMemo(() => {
    const k = l ? {
      width: l.getBoundingClientRect().width,
      height: l.getBoundingClientRect().height
    } : typeof window < "u" ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: 0,
      height: 0
    };
    var E;
    return (E = n == null ? void 0 : n.map((M) => {
      const T = typeof M == "string";
      let _ = 0;
      if (T && (_ = parseInt(M, 10)), Se(i)) {
        const A = T ? _ : h ? M * k.height : 0;
        return h ? i === "bottom" ? k.height - A : -k.height + A : A;
      }
      const L = T ? _ : h ? M * k.width : 0;
      return h ? i === "right" ? k.width - L : -k.width + L : L;
    })) != null ? E : [];
  }, [
    n,
    h,
    l
  ]), x = N.useMemo(() => g !== null ? w == null ? void 0 : w[g] : null, [
    w,
    g
  ]), y = N.useCallback((k) => {
    var E;
    const M = (E = w == null ? void 0 : w.findIndex((T) => T === k)) != null ? E : null;
    s(M), Ne(r.current, {
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      transform: Se(i) ? `translate3d(0, ${k}px, 0)` : `translate3d(${k}px, 0, 0)`
    }), w && M !== w.length - 1 && a !== void 0 && M !== a && M < a ? Ne(o.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      opacity: "0"
    }) : Ne(o.current, {
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
    if (c || e) {
      var k;
      const E = (k = n == null ? void 0 : n.findIndex((M) => M === e || M === c)) != null ? k : -1;
      w && E !== -1 && typeof w[E] == "number" && y(w[E]);
    }
  }, [
    c,
    e,
    n,
    w,
    y
  ]);
  function S({ draggedDistance: k, closeDrawer: E, velocity: M, dismissible: T }) {
    if (a === void 0) return;
    const _ = i === "bottom" || i === "right" ? (x ?? 0) - k : (x ?? 0) + k, L = g === a - 1, A = g === 0, Y = k > 0;
    if (L && Ne(o.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`
    }), !d && M > 2 && !Y) {
      T ? E() : y(w[0]);
      return;
    }
    if (!d && M > 2 && Y && w && n) {
      y(w[n.length - 1]);
      return;
    }
    const j = w == null ? void 0 : w.reduce((U, D) => typeof U != "number" || typeof D != "number" ? U : Math.abs(D - _) < Math.abs(U - _) ? D : U), F = Se(i) ? window.innerHeight : window.innerWidth;
    if (M > xf && Math.abs(k) < F * 0.4) {
      const U = Y ? 1 : -1;
      if (U > 0 && v && n) {
        y(w[n.length - 1]);
        return;
      }
      if (A && U < 0 && T && E(), g === null) return;
      y(w[g + U]);
      return;
    }
    y(j);
  }
  function C({ draggedDistance: k }) {
    if (x === null) return;
    const E = i === "bottom" || i === "right" ? x - k : x + k;
    (i === "bottom" || i === "right") && E < w[w.length - 1] || (i === "top" || i === "left") && E > w[w.length - 1] || Ne(r.current, {
      transform: Se(i) ? `translate3d(0, ${E}px, 0)` : `translate3d(${E}px, 0, 0)`
    });
  }
  function R(k, E) {
    if (!n || typeof g != "number" || !w || a === void 0) return null;
    const M = g === a - 1;
    if (g >= a && E)
      return 0;
    if (M && !E) return 1;
    if (!b && !M) return null;
    const _ = M ? g + 1 : g - 1, L = M ? w[_] - w[_ - 1] : w[_ + 1] - w[_], A = k / Math.abs(L);
    return M ? 1 - A : A;
  }
  return {
    isLastSnapPoint: v,
    activeSnapPoint: c,
    shouldFade: b,
    getPercentageDragged: R,
    setActiveSnapPoint: f,
    activeSnapPointIndex: g,
    onRelease: S,
    onDrag: C,
    snapPointsOffset: w
  };
}
const m0 = () => () => {
};
function h0() {
  const { direction: e, isOpen: t, shouldScaleBackground: n, setBackgroundColorOnScale: r, noBodyStyles: o } = sr(), a = N.useRef(null), s = Vt(() => document.body.style.backgroundColor, []);
  function i() {
    return (window.innerWidth - Ha) / window.innerWidth;
  }
  N.useEffect(() => {
    if (t && n) {
      a.current && clearTimeout(a.current);
      const l = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!l) return;
      l0(r && !o ? oa(document.body, {
        background: "black"
      }) : m0, oa(l, {
        transformOrigin: Se(e) ? "top" : "left",
        transitionProperty: "transform, border-radius",
        transitionDuration: `${be.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${be.EASE.join(",")})`
      }));
      const d = oa(l, {
        borderRadius: `${Sf}px`,
        overflow: "hidden",
        ...Se(e) ? {
          transform: `scale(${i()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${i()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      return () => {
        d(), a.current = window.setTimeout(() => {
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
let _n = null;
function p0({ isOpen: e, modal: t, nested: n, hasBeenOpened: r, preventScrollRestoration: o, noBodyStyles: a }) {
  const [s, i] = N.useState(() => typeof window < "u" ? window.location.href : ""), l = N.useRef(0), d = N.useCallback(() => {
    if (Os() && _n === null && e && !a) {
      _n = {
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
        const p = h - window.innerHeight;
        p && l.current >= h && (document.body.style.top = `${-(l.current + p)}px`);
      }), 300);
    }
  }, [
    e
  ]), c = N.useCallback(() => {
    if (Os() && _n !== null && !a) {
      const f = -parseInt(document.body.style.top, 10), h = -parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, _n), window.requestAnimationFrame(() => {
        if (o && s !== window.location.href) {
          i(window.location.href);
          return;
        }
        window.scrollTo(h, f);
      }), _n = null;
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
        typeof document > "u" || document.querySelector("[data-vaul-drawer]") || c();
      };
  }, [
    t,
    c
  ]), N.useEffect(() => {
    n || !r || (e ? (!window.matchMedia("(display-mode: standalone)").matches && d(), t || window.setTimeout(() => {
      c();
    }, 500)) : c());
  }, [
    e,
    r,
    s,
    t,
    n,
    d,
    c
  ]), {
    restorePositionSetting: c
  };
}
function g0({ open: e, onOpenChange: t, children: n, onDrag: r, onRelease: o, snapPoints: a, shouldScaleBackground: s = !1, setBackgroundColorOnScale: i = !0, closeThreshold: l = c0, scrollLockTimeout: d = d0, dismissible: c = !0, handleOnly: f = !1, fadeFromIndex: h = a && a.length - 1, activeSnapPoint: p, setActiveSnapPoint: v, fixed: g, modal: b = !0, onClose: w, nested: x, noBodyStyles: y = !1, direction: S = "bottom", defaultOpen: C = !1, disablePreventScroll: R = !0, snapToSequentialPoint: k = !1, preventScrollRestoration: E = !1, repositionInputs: M = !0, onAnimationEnd: T, container: _, autoFocus: L = !1 }) {
  var A, Y;
  const [j = !1, F] = kf({
    defaultProp: C,
    prop: e,
    onChange: (V) => {
      t == null || t(V), !V && !x && Io(), setTimeout(() => {
        T == null || T(V);
      }, be.DURATION * 1e3), V && !b && typeof window < "u" && window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      }), V || (document.body.style.pointerEvents = "auto");
    }
  }), [U, D] = N.useState(!1), [O, Z] = N.useState(!1), [se, P] = N.useState(!1), B = N.useRef(null), W = N.useRef(null), G = N.useRef(null), oe = N.useRef(null), z = N.useRef(null), te = N.useRef(!1), J = N.useRef(null), ie = N.useRef(0), ce = N.useRef(!1), me = N.useRef(!C), Te = N.useRef(0), ne = N.useRef(null), Je = N.useRef(((A = ne.current) == null ? void 0 : A.getBoundingClientRect().height) || 0), et = N.useRef(((Y = ne.current) == null ? void 0 : Y.getBoundingClientRect().width) || 0), je = N.useRef(0), Nn = N.useCallback((V) => {
    a && V === ut.length - 1 && (W.current = /* @__PURE__ */ new Date());
  }, []), { activeSnapPoint: St, activeSnapPointIndex: Ct, setActiveSnapPoint: fr, onRelease: mr, snapPointsOffset: ut, onDrag: Dn, shouldFade: hr, getPercentageDragged: Ao } = f0({
    snapPoints: a,
    activeSnapPointProp: p,
    setActiveSnapPointProp: v,
    drawerRef: ne,
    fadeFromIndex: h,
    overlayRef: B,
    onSnapPointChange: Nn,
    direction: S,
    container: _,
    snapToSequentialPoint: k
  });
  t0({
    isDisabled: !j || O || !b || se || !U || !M || !R
  });
  const { restorePositionSetting: Io } = p0({
    isOpen: j,
    modal: b,
    nested: x ?? !1,
    hasBeenOpened: U,
    preventScrollRestoration: E,
    noBodyStyles: y
  });
  function Qt() {
    return (window.innerWidth - Ha) / window.innerWidth;
  }
  function Lo(V) {
    var re, Q;
    !c && !a || ne.current && !ne.current.contains(V.target) || (Je.current = ((re = ne.current) == null ? void 0 : re.getBoundingClientRect().height) || 0, et.current = ((Q = ne.current) == null ? void 0 : Q.getBoundingClientRect().width) || 0, Z(!0), G.current = /* @__PURE__ */ new Date(), vf() && window.addEventListener("touchend", () => te.current = !1, {
      once: !0
    }), V.target.setPointerCapture(V.pointerId), ie.current = Se(S) ? V.pageY : V.pageX);
  }
  function pr(V, re) {
    var Q;
    let de = V;
    const he = (Q = window.getSelection()) == null ? void 0 : Q.toString(), Ee = ne.current ? Dr(ne.current, S) : null, pe = /* @__PURE__ */ new Date();
    if (de.tagName === "SELECT" || de.hasAttribute("data-vaul-no-drag") || de.closest("[data-vaul-no-drag]"))
      return !1;
    if (S === "right" || S === "left")
      return !0;
    if (W.current && pe.getTime() - W.current.getTime() < 500)
      return !1;
    if (Ee !== null && (S === "bottom" ? Ee > 0 : Ee < 0))
      return !0;
    if (he && he.length > 0)
      return !1;
    if (z.current && pe.getTime() - z.current.getTime() < d && Ee === 0 || re)
      return z.current = pe, !1;
    for (; de; ) {
      if (de.scrollHeight > de.clientHeight) {
        if (de.scrollTop !== 0)
          return z.current = /* @__PURE__ */ new Date(), !1;
        if (de.getAttribute("role") === "dialog")
          return !0;
      }
      de = de.parentNode;
    }
    return !0;
  }
  function zo(V) {
    if (ne.current && O) {
      const re = S === "bottom" || S === "right" ? 1 : -1, Q = (ie.current - (Se(S) ? V.pageY : V.pageX)) * re, de = Q > 0, he = a && !c && !de;
      if (he && Ct === 0) return;
      const Ee = Math.abs(Q), pe = document.querySelector("[data-vaul-drawer-wrapper]"), Re = S === "bottom" || S === "top" ? Je.current : et.current;
      let ue = Ee / Re;
      const ft = Ao(Ee, de);
      if (ft !== null && (ue = ft), he && ue >= 1 || !te.current && !pr(V.target, de)) return;
      if (ne.current.classList.add(aa), te.current = !0, Ne(ne.current, {
        transition: "none"
      }), Ne(B.current, {
        transition: "none"
      }), a && Dn({
        draggedDistance: Q
      }), de && !a) {
        const He = s0(Q), kt = Math.min(He * -1, 0) * re;
        Ne(ne.current, {
          transform: Se(S) ? `translate3d(0, ${kt}px, 0)` : `translate3d(${kt}px, 0, 0)`
        });
        return;
      }
      const tt = 1 - ue;
      if ((hr || h && Ct === h - 1) && (r == null || r(V, ue), Ne(B.current, {
        opacity: `${tt}`,
        transition: "none"
      }, !0)), pe && B.current && s) {
        const He = Math.min(Qt() + ue * (1 - Qt()), 1), kt = 8 - ue * 8, Jt = Math.max(0, 14 - ue * 14);
        Ne(pe, {
          borderRadius: `${kt}px`,
          transform: Se(S) ? `scale(${He}) translate3d(0, ${Jt}px, 0)` : `scale(${He}) translate3d(${Jt}px, 0, 0)`,
          transition: "none"
        }, !0);
      }
      if (!a) {
        const He = Ee * re;
        Ne(ne.current, {
          transform: Se(S) ? `translate3d(0, ${He}px, 0)` : `translate3d(${He}px, 0, 0)`
        });
      }
    }
  }
  N.useEffect(() => {
    window.requestAnimationFrame(() => {
      me.current = !0;
    });
  }, []), N.useEffect(() => {
    var V;
    function re() {
      if (!ne.current || !M) return;
      const Q = document.activeElement;
      if (Ba(Q) || ce.current) {
        var de;
        const he = ((de = window.visualViewport) == null ? void 0 : de.height) || 0, Ee = window.innerHeight;
        let pe = Ee - he;
        const Re = ne.current.getBoundingClientRect().height || 0, ue = Re > Ee * 0.8;
        je.current || (je.current = Re);
        const ft = ne.current.getBoundingClientRect().top;
        if (Math.abs(Te.current - pe) > 60 && (ce.current = !ce.current), a && a.length > 0 && ut && Ct) {
          const tt = ut[Ct] || 0;
          pe += tt;
        }
        if (Te.current = pe, Re > he || ce.current) {
          const tt = ne.current.getBoundingClientRect().height;
          let He = tt;
          tt > he && (He = he - (ue ? ft : Ha)), g ? ne.current.style.height = `${tt - Math.max(pe, 0)}px` : ne.current.style.height = `${Math.max(He, he - ft)}px`;
        } else Kx() || (ne.current.style.height = `${je.current}px`);
        a && a.length > 0 && !ce.current ? ne.current.style.bottom = "0px" : ne.current.style.bottom = `${Math.max(pe, 0)}px`;
      }
    }
    return (V = window.visualViewport) == null || V.addEventListener("resize", re), () => {
      var Q;
      return (Q = window.visualViewport) == null ? void 0 : Q.removeEventListener("resize", re);
    };
  }, [
    Ct,
    a,
    ut
  ]);
  function Ft(V) {
    $o(), w == null || w(), V || F(!1), setTimeout(() => {
      a && fr(a[0]);
    }, be.DURATION * 1e3);
  }
  function gr() {
    if (!ne.current) return;
    const V = document.querySelector("[data-vaul-drawer-wrapper]"), re = Dr(ne.current, S);
    Ne(ne.current, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`
    }), Ne(B.current, {
      transition: `opacity ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      opacity: "1"
    }), s && re && re > 0 && j && Ne(V, {
      borderRadius: `${Sf}px`,
      overflow: "hidden",
      ...Se(S) ? {
        transform: `scale(${Qt()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
        transformOrigin: "top"
      } : {
        transform: `scale(${Qt()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
        transformOrigin: "left"
      },
      transitionProperty: "transform, border-radius",
      transitionDuration: `${be.DURATION}s`,
      transitionTimingFunction: `cubic-bezier(${be.EASE.join(",")})`
    }, !0);
  }
  function $o() {
    !O || !ne.current || (ne.current.classList.remove(aa), te.current = !1, Z(!1), oe.current = /* @__PURE__ */ new Date());
  }
  function Fo(V) {
    if (!O || !ne.current) return;
    ne.current.classList.remove(aa), te.current = !1, Z(!1), oe.current = /* @__PURE__ */ new Date();
    const re = Dr(ne.current, S);
    if (!V || !pr(V.target, !1) || !re || Number.isNaN(re) || G.current === null) return;
    const Q = oe.current.getTime() - G.current.getTime(), de = ie.current - (Se(S) ? V.pageY : V.pageX), he = Math.abs(de) / Q;
    if (he > 0.05 && (P(!0), setTimeout(() => {
      P(!1);
    }, 200)), a) {
      mr({
        draggedDistance: de * (S === "bottom" || S === "right" ? 1 : -1),
        closeDrawer: Ft,
        velocity: he,
        dismissible: c
      }), o == null || o(V, !0);
      return;
    }
    if (S === "bottom" || S === "right" ? de > 0 : de < 0) {
      gr(), o == null || o(V, !0);
      return;
    }
    if (he > xf) {
      Ft(), o == null || o(V, !1);
      return;
    }
    var Ee;
    const pe = Math.min((Ee = ne.current.getBoundingClientRect().height) != null ? Ee : 0, window.innerHeight);
    var Re;
    const ue = Math.min((Re = ne.current.getBoundingClientRect().width) != null ? Re : 0, window.innerWidth), ft = S === "left" || S === "right";
    if (Math.abs(re) >= (ft ? ue : pe) * l) {
      Ft(), o == null || o(V, !1);
      return;
    }
    o == null || o(V, !0), gr();
  }
  N.useEffect(() => (j && (Ne(document.documentElement, {
    scrollBehavior: "auto"
  }), W.current = /* @__PURE__ */ new Date()), () => {
    i0(document.documentElement, "scrollBehavior");
  }), [
    j
  ]);
  function vr(V) {
    const re = V ? (window.innerWidth - Bt) / window.innerWidth : 1, Q = V ? -Bt : 0;
    J.current && window.clearTimeout(J.current), Ne(ne.current, {
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      transform: Se(S) ? `scale(${re}) translate3d(0, ${Q}px, 0)` : `scale(${re}) translate3d(${Q}px, 0, 0)`
    }), !V && ne.current && (J.current = setTimeout(() => {
      const de = Dr(ne.current, S);
      Ne(ne.current, {
        transition: "none",
        transform: Se(S) ? `translate3d(0, ${de}px, 0)` : `translate3d(${de}px, 0, 0)`
      });
    }, 500));
  }
  function Wo(V, re) {
    if (re < 0) return;
    const Q = (window.innerWidth - Bt) / window.innerWidth, de = Q + re * (1 - Q), he = -Bt + re * Bt;
    Ne(ne.current, {
      transform: Se(S) ? `scale(${de}) translate3d(0, ${he}px, 0)` : `scale(${de}) translate3d(${he}px, 0, 0)`,
      transition: "none"
    });
  }
  function br(V, re) {
    const Q = Se(S) ? window.innerHeight : window.innerWidth, de = re ? (Q - Bt) / Q : 1, he = re ? -Bt : 0;
    re && Ne(ne.current, {
      transition: `transform ${be.DURATION}s cubic-bezier(${be.EASE.join(",")})`,
      transform: Se(S) ? `scale(${de}) translate3d(0, ${he}px, 0)` : `scale(${de}) translate3d(${he}px, 0, 0)`
    });
  }
  return N.useEffect(() => {
    b || window.requestAnimationFrame(() => {
      document.body.style.pointerEvents = "auto";
    });
  }, [
    b
  ]), /* @__PURE__ */ N.createElement(to, {
    defaultOpen: C,
    onOpenChange: (V) => {
      !c && !V || (V ? D(!0) : Ft(!0), F(V));
    },
    open: j
  }, /* @__PURE__ */ N.createElement(gf.Provider, {
    value: {
      activeSnapPoint: St,
      snapPoints: a,
      setActiveSnapPoint: fr,
      drawerRef: ne,
      overlayRef: B,
      onOpenChange: t,
      onPress: Lo,
      onRelease: Fo,
      onDrag: zo,
      dismissible: c,
      shouldAnimate: me,
      handleOnly: f,
      isOpen: j,
      isDragging: O,
      shouldFade: hr,
      closeDrawer: Ft,
      onNestedDrag: Wo,
      onNestedOpenChange: vr,
      onNestedRelease: br,
      keyboardIsOpen: ce,
      modal: b,
      snapPointsOffset: ut,
      activeSnapPointIndex: Ct,
      direction: S,
      shouldScaleBackground: s,
      setBackgroundColorOnScale: i,
      noBodyStyles: y,
      container: _,
      autoFocus: L
    }
  }, n));
}
const Ef = /* @__PURE__ */ N.forwardRef(function({ ...e }, t) {
  const { overlayRef: n, snapPoints: r, onRelease: o, shouldFade: a, isOpen: s, modal: i, shouldAnimate: l } = sr(), d = wf(t, n), c = r && r.length > 0;
  if (!i)
    return null;
  const f = N.useCallback((h) => o(h), [
    o
  ]);
  return /* @__PURE__ */ N.createElement(ro, {
    onMouseUp: f,
    ref: d,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": s && c ? "true" : "false",
    "data-vaul-snap-points-overlay": s && a ? "true" : "false",
    "data-vaul-animate": l != null && l.current ? "true" : "false",
    ...e
  });
});
Ef.displayName = "Drawer.Overlay";
const Rf = /* @__PURE__ */ N.forwardRef(function({ onPointerDownOutside: e, style: t, onOpenAutoFocus: n, ...r }, o) {
  const { drawerRef: a, onPress: s, onRelease: i, onDrag: l, keyboardIsOpen: d, snapPointsOffset: c, activeSnapPointIndex: f, modal: h, isOpen: p, direction: v, snapPoints: g, container: b, handleOnly: w, shouldAnimate: x, autoFocus: y } = sr(), [S, C] = N.useState(!1), R = wf(o, a), k = N.useRef(null), E = N.useRef(null), M = N.useRef(!1), T = g && g.length > 0;
  h0();
  const _ = (A, Y, j = 0) => {
    if (M.current) return !0;
    const F = Math.abs(A.y), U = Math.abs(A.x), D = U > F, O = [
      "bottom",
      "right"
    ].includes(Y) ? 1 : -1;
    if (Y === "left" || Y === "right") {
      if (!(A.x * O < 0) && U >= 0 && U <= j)
        return D;
    } else if (!(A.y * O < 0) && F >= 0 && F <= j)
      return !D;
    return M.current = !0, !0;
  };
  N.useEffect(() => {
    T && window.requestAnimationFrame(() => {
      C(!0);
    });
  }, []);
  function L(A) {
    k.current = null, M.current = !1, i(A);
  }
  return /* @__PURE__ */ N.createElement(oo, {
    "data-vaul-drawer-direction": v,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": S ? "true" : "false",
    "data-vaul-snap-points": p && T ? "true" : "false",
    "data-vaul-custom-container": b ? "true" : "false",
    "data-vaul-animate": x != null && x.current ? "true" : "false",
    ...r,
    ref: R,
    style: c && c.length > 0 ? {
      "--snap-point-height": `${c[f ?? 0]}px`,
      ...t
    } : t,
    onPointerDown: (A) => {
      w || (r.onPointerDown == null || r.onPointerDown.call(r, A), k.current = {
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
      d.current && (d.current = !1);
    },
    onFocusOutside: (A) => {
      if (!h) {
        A.preventDefault();
        return;
      }
    },
    onPointerMove: (A) => {
      if (E.current = A, w || (r.onPointerMove == null || r.onPointerMove.call(r, A), !k.current)) return;
      const Y = A.pageY - k.current.y, j = A.pageX - k.current.x, F = A.pointerType === "touch" ? 10 : 2;
      _({
        x: j,
        y: Y
      }, v, F) ? l(A) : (Math.abs(j) > F || Math.abs(Y) > F) && (k.current = null);
    },
    onPointerUp: (A) => {
      r.onPointerUp == null || r.onPointerUp.call(r, A), k.current = null, M.current = !1, i(A);
    },
    onPointerOut: (A) => {
      r.onPointerOut == null || r.onPointerOut.call(r, A), L(E.current);
    },
    onContextMenu: (A) => {
      r.onContextMenu == null || r.onContextMenu.call(r, A), E.current && L(E.current);
    }
  });
});
Rf.displayName = "Drawer.Content";
const v0 = 250, b0 = 120, w0 = /* @__PURE__ */ N.forwardRef(function({ preventCycle: e = !1, children: t, ...n }, r) {
  const { closeDrawer: o, isDragging: a, snapPoints: s, activeSnapPoint: i, setActiveSnapPoint: l, dismissible: d, handleOnly: c, isOpen: f, onPress: h, onDrag: p } = sr(), v = N.useRef(null), g = N.useRef(!1);
  function b() {
    if (g.current) {
      y();
      return;
    }
    window.setTimeout(() => {
      w();
    }, b0);
  }
  function w() {
    if (a || e || g.current) {
      y();
      return;
    }
    if (y(), !s || s.length === 0) {
      d || o();
      return;
    }
    if (i === s[s.length - 1] && d) {
      o();
      return;
    }
    const C = s.findIndex((k) => k === i);
    if (C === -1) return;
    const R = s[C + 1];
    l(R);
  }
  function x() {
    v.current = window.setTimeout(() => {
      g.current = !0;
    }, v0);
  }
  function y() {
    v.current && window.clearTimeout(v.current), g.current = !1;
  }
  return /* @__PURE__ */ N.createElement("div", {
    onClick: b,
    onPointerCancel: y,
    onPointerDown: (S) => {
      c && h(S), x();
    },
    onPointerMove: (S) => {
      c && p(S);
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
w0.displayName = "Drawer.Handle";
function y0(e) {
  const t = sr(), { container: n = t.container, ...r } = e;
  return /* @__PURE__ */ N.createElement(no, {
    container: n,
    ...r
  });
}
const $t = {
  Root: g0,
  Content: Rf,
  Overlay: Ef,
  Trigger: oi,
  Portal: y0,
  Close: yn,
  Title: ai,
  Description: ii
};
function OR({
  ...e
}) {
  return /* @__PURE__ */ u($t.Root, { "data-slot": "drawer", ...e });
}
function AR({
  ...e
}) {
  return /* @__PURE__ */ u($t.Trigger, { "data-slot": "drawer-trigger", ...e });
}
function x0({
  ...e
}) {
  return /* @__PURE__ */ u($t.Portal, { "data-slot": "drawer-portal", ...e });
}
function IR({
  ...e
}) {
  return /* @__PURE__ */ u($t.Close, { "data-slot": "drawer-close", ...e });
}
function S0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    $t.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: le("fixed inset-0 z-50 bg-black/50", e),
      ...t
    }
  );
}
function LR({
  className: e,
  children: t,
  excludeFromDrag: n,
  ...r
}) {
  const o = m.useRef(null);
  return m.useEffect(() => {
    if (!n || !o.current) return;
    const a = o.current;
    function s() {
      a.querySelectorAll(n).forEach((d) => {
        d.setAttribute("data-vaul-no-drag", "");
      });
    }
    s();
    const i = new MutationObserver(s);
    return i.observe(a, { childList: !0, subtree: !0 }), () => i.disconnect();
  }, [n]), /* @__PURE__ */ I(x0, { children: [
    /* @__PURE__ */ u(S0, {}),
    /* @__PURE__ */ u(
      $t.Content,
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
function zR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "drawer-handle",
      className: le("mx-auto mt-4 h-1.5 w-[60px] shrink-0 rounded-full bg-muted-foreground/30 group-data-[vaul-drawer-direction=bottom]/drawer-content:block hidden", e),
      ...t
    }
  );
}
function $R({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "drawer-header",
      className: le("flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left", e),
      ...t
    }
  );
}
function FR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "drawer-footer",
      className: le("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function WR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    $t.Title,
    {
      "data-slot": "drawer-title",
      className: le("font-semibold text-foreground", e),
      ...t
    }
  );
}
function BR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    $t.Description,
    {
      "data-slot": "drawer-description",
      className: le("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function C0(e) {
  const t = m.useRef(e);
  return m.useEffect(() => {
    t.current = e;
  }), m.useMemo(
    () => ((...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    }),
    []
  );
}
function HR(e, t) {
  const n = C0(e), r = m.useRef(0);
  return m.useEffect(
    () => () => window.clearTimeout(r.current),
    []
  ), m.useCallback(
    (...a) => {
      window.clearTimeout(r.current), r.current = window.setTimeout(
        () => n(...a),
        t
      );
    },
    [n, t]
  );
}
function jr({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ u(
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
function Mf({
  ...e
}) {
  return /* @__PURE__ */ u(fw, { "data-slot": "select", ...e });
}
function VR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ww,
    {
      "data-slot": "select-group",
      className: le("scroll-my-1 p-1", e),
      ...t
    }
  );
}
function Nf({
  ...e
}) {
  return /* @__PURE__ */ u(hw, { "data-slot": "select-value", ...e });
}
function Df({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    mw,
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
        /* @__PURE__ */ u(pw, { asChild: !0, children: /* @__PURE__ */ u(zi, { className: "text-muted-foreground size-4 pointer-events-none" }) })
      ]
    }
  );
}
function Pf({
  className: e,
  children: t,
  position: n = "item-aligned",
  align: r = "center",
  ...o
}) {
  return /* @__PURE__ */ u(gw, { children: /* @__PURE__ */ I(
    vw,
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
        /* @__PURE__ */ u(k0, {}),
        /* @__PURE__ */ u(
          bw,
          {
            "data-position": n,
            className: le(
              "cn-select-viewport data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
              n === "popper" && ""
            ),
            children: t
          }
        ),
        /* @__PURE__ */ u(E0, {})
      ]
    }
  ) });
}
function YR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    yw,
    {
      "data-slot": "select-label",
      className: le("text-muted-foreground px-2 py-1.5 text-xs", e),
      ...t
    }
  );
}
function Tf({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ I(
    xw,
    {
      "data-slot": "select-item",
      className: le(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ u("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ u(Cw, { children: /* @__PURE__ */ u(pt, { className: "cn-select-item-indicator-icon pointer-events-none" }) }) }),
        /* @__PURE__ */ u(Sw, { children: t })
      ]
    }
  );
}
function GR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Rw,
    {
      "data-slot": "select-separator",
      className: le("bg-border -mx-1 my-1 h-px pointer-events-none", e),
      ...t
    }
  );
}
function k0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    kw,
    {
      "data-slot": "select-scroll-up-button",
      className: le("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", e),
      ...t,
      children: /* @__PURE__ */ u(Px, {})
    }
  );
}
function E0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Ew,
    {
      "data-slot": "select-scroll-down-button",
      className: le("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", e),
      ...t,
      children: /* @__PURE__ */ u(zi, {})
    }
  );
}
function UR({
  options: e,
  value: t,
  onChange: n,
  placeholder: r,
  disabled: o,
  className: a
}) {
  return /* @__PURE__ */ I(Mf, { value: t, onValueChange: n, disabled: o, children: [
    /* @__PURE__ */ u(Df, { className: a, children: /* @__PURE__ */ u(Nf, { placeholder: r }) }),
    /* @__PURE__ */ u(Pf, { children: e.map((s) => /* @__PURE__ */ u(Tf, { value: s.value, children: s.label }, s.value)) })
  ] });
}
function jR({
  className: e,
  style: t,
  size: n = "default",
  color: r,
  label: o,
  description: a,
  card: s,
  ...i
}) {
  const l = /* @__PURE__ */ u(
    ey,
    {
      "data-slot": "switch",
      "data-size": n,
      className: le(
        "[--switch-bg:var(--color-primary)] data-checked:bg-[var(--switch-bg)] data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent shadow-xs focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        e
      ),
      style: r ? { "--switch-bg": r, ...t } : t,
      ...i,
      children: /* @__PURE__ */ u(
        ty,
        {
          "data-slot": "switch-thumb",
          className: "bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform"
        }
      )
    }
  );
  if (!o) return l;
  const d = !!a;
  return /* @__PURE__ */ I(
    "label",
    {
      "data-slot": "switch-field",
      className: le(
        "flex gap-3 select-none",
        d ? "items-start" : "items-center",
        s && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        i.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ u("div", { className: le(d && "pt-0.5"), children: l }),
        /* @__PURE__ */ I("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ u("span", { className: "text-sm font-medium leading-none", children: o }),
          a && /* @__PURE__ */ u("span", { className: "text-sm text-muted-foreground", children: a })
        ] })
      ]
    }
  );
}
function R0({ className: e, ...t }) {
  return /* @__PURE__ */ u("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ u(
    "table",
    {
      "data-slot": "table",
      className: le("w-full caption-bottom text-sm", e),
      ...t
    }
  ) });
}
function M0({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "thead",
    {
      "data-slot": "table-header",
      className: le("[&_tr]:border-b", e),
      ...t
    }
  );
}
function N0({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "tbody",
    {
      "data-slot": "table-body",
      className: le("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function KR({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: le("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", e),
      ...t
    }
  );
}
function zs({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "tr",
    {
      "data-slot": "table-row",
      className: le("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", e),
      ...t
    }
  );
}
function D0({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "th",
    {
      "data-slot": "table-head",
      className: le("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
      ...t
    }
  );
}
function P0({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "td",
    {
      "data-slot": "table-cell",
      className: le("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
      ...t
    }
  );
}
function qR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    "caption",
    {
      "data-slot": "table-caption",
      className: le("text-muted-foreground mt-4 text-sm", e),
      ...t
    }
  );
}
function XR({
  className: e,
  orientation: t = "horizontal",
  ...n
}) {
  return /* @__PURE__ */ u(
    oy,
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
const T0 = gn(
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
function ZR({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ u(
    ay,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: le(T0({ variant: t }), e),
      ...n
    }
  );
}
function QR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    iy,
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
function JR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    sy,
    {
      "data-slot": "tabs-content",
      className: le("text-sm flex-1 outline-none", e),
      ...t
    }
  );
}
function eM({ className: e, ...t }) {
  return /* @__PURE__ */ u(
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
function $(...e) {
  return uf(Ja(e));
}
function tM({ ...e }) {
  return /* @__PURE__ */ u(to, { "data-slot": "sheet", ...e });
}
function nM({
  ...e
}) {
  return /* @__PURE__ */ u(oi, { "data-slot": "sheet-trigger", ...e });
}
function rM({
  ...e
}) {
  return /* @__PURE__ */ u(yn, { "data-slot": "sheet-close", ...e });
}
function _0({
  ...e
}) {
  return /* @__PURE__ */ u(no, { "data-slot": "sheet-portal", ...e });
}
function O0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ro,
    {
      "data-slot": "sheet-overlay",
      className: $(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function oM({
  className: e,
  children: t,
  side: n = "right",
  showCloseButton: r = !0,
  ...o
}) {
  return /* @__PURE__ */ I(_0, { children: [
    /* @__PURE__ */ u(O0, {}),
    /* @__PURE__ */ I(
      oo,
      {
        "data-slot": "sheet-content",
        className: $(
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
          r && /* @__PURE__ */ I(yn, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ u(Wi, { className: "size-4" }),
            /* @__PURE__ */ u("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function aM({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sheet-header",
      className: $("flex flex-col gap-1.5 p-4", e),
      ...t
    }
  );
}
function iM({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "sheet-footer",
      className: $("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function sM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ai,
    {
      "data-slot": "sheet-title",
      className: $("font-semibold text-foreground", e),
      ...t
    }
  );
}
function lM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ii,
    {
      "data-slot": "sheet-description",
      className: $("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function cM({
  className: e,
  value: t,
  ...n
}) {
  return /* @__PURE__ */ u(
    Pb,
    {
      "data-slot": "progress",
      className: $(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        e
      ),
      ...n,
      children: /* @__PURE__ */ u(
        Tb,
        {
          "data-slot": "progress-indicator",
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (t || 0)}%)` }
        }
      )
    }
  );
}
function dM({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ u(
    sp,
    {
      "data-slot": "avatar",
      "data-size": t,
      className: $(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        e
      ),
      ...n
    }
  );
}
function uM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    lp,
    {
      "data-slot": "avatar-image",
      className: $("aspect-square size-full", e),
      ...t
    }
  );
}
function fM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    cp,
    {
      "data-slot": "avatar-fallback",
      className: $(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        e
      ),
      ...t
    }
  );
}
function Kr({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ u(
    Pw,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: $(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
function mM({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ u(
    Cy,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function hM({
  ...e
}) {
  return /* @__PURE__ */ u(ky, { "data-slot": "tooltip", ...e });
}
function pM({
  ...e
}) {
  return /* @__PURE__ */ u(Ey, { "data-slot": "tooltip-trigger", ...e });
}
function gM({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ u(Ry, { children: /* @__PURE__ */ I(
    My,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: $(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ u(Ny, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
function A0({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    Wx,
    {
      role: "status",
      "aria-label": "Loading",
      className: $("size-4 animate-spin", e),
      ...t
    }
  );
}
const Va = gn(
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
function _f({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  loading: o = !1,
  disabled: a,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ u(
    r ? ei : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      disabled: o || a,
      className: $(Va({ variant: t, size: n, className: e })),
      ...i,
      children: o ? /* @__PURE__ */ I(_e, { children: [
        /* @__PURE__ */ u(A0, { className: "opacity-100" }),
        /* @__PURE__ */ u("span", { className: "opacity-64", children: s })
      ] }) : s
    }
  );
}
function vM({
  ...e
}) {
  return /* @__PURE__ */ u(to, { "data-slot": "dialog", ...e });
}
function bM({
  ...e
}) {
  return /* @__PURE__ */ u(oi, { "data-slot": "dialog-trigger", ...e });
}
function I0({
  ...e
}) {
  return /* @__PURE__ */ u(no, { "data-slot": "dialog-portal", ...e });
}
function wM({
  ...e
}) {
  return /* @__PURE__ */ u(yn, { "data-slot": "dialog-close", ...e });
}
function L0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ro,
    {
      "data-slot": "dialog-overlay",
      className: $(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function yM({
  className: e,
  children: t,
  showCloseButton: n = !0,
  ...r
}) {
  return /* @__PURE__ */ I(I0, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ u(L0, {}),
    /* @__PURE__ */ I(
      oo,
      {
        "data-slot": "dialog-content",
        className: $(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          e
        ),
        ...r,
        children: [
          t,
          n && /* @__PURE__ */ I(
            yn,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ u(Wi, {}),
                /* @__PURE__ */ u("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function xM({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "dialog-header",
      className: $("flex flex-col gap-2 text-center sm:text-left", e),
      ...t
    }
  );
}
function SM({
  className: e,
  showCloseButton: t = !1,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    "div",
    {
      "data-slot": "dialog-footer",
      className: $(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        e
      ),
      ...r,
      children: [
        n,
        t && /* @__PURE__ */ u(yn, { asChild: !0, children: /* @__PURE__ */ u(_f, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function CM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ai,
    {
      "data-slot": "dialog-title",
      className: $("text-lg leading-none font-semibold", e),
      ...t
    }
  );
}
function kM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ii,
    {
      "data-slot": "dialog-description",
      className: $("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function z0({
  ...e
}) {
  return /* @__PURE__ */ u(qv, { "data-slot": "dropdown-menu", ...e });
}
function $0({
  ...e
}) {
  return /* @__PURE__ */ u(
    Xv,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function F0({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ u(Zv, { children: /* @__PURE__ */ u(
    Qv,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: $(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function W0({
  ...e
}) {
  return /* @__PURE__ */ u(Jv, { "data-slot": "dropdown-menu-group", ...e });
}
function on({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ u(
    tb,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: $(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        e
      ),
      ...r
    }
  );
}
function B0({
  className: e,
  children: t,
  checked: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    nb,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: $(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ u("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ u(rb, { children: /* @__PURE__ */ u(pt, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function H0({
  className: e,
  inset: t,
  ...n
}) {
  return /* @__PURE__ */ u(
    eb,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: $(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...n
    }
  );
}
function Pr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    ob,
    {
      "data-slot": "dropdown-menu-separator",
      className: $("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function V0({
  ...e
}) {
  return /* @__PURE__ */ u(ab, { "data-slot": "dropdown-menu-sub", ...e });
}
function Y0({
  className: e,
  inset: t,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    ib,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: $(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ u($i, { className: "ml-auto size-4" })
      ]
    }
  );
}
function G0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    sb,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: $(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...t
    }
  );
}
function Ve({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "skeleton",
      className: $("animate-pulse rounded-md bg-accent", e),
      ...t
    }
  );
}
function EM({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "kbd",
    {
      "data-slot": "kbd",
      className: $(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        e
      ),
      ...t
    }
  );
}
function $s(e) {
  const t = e.columnDef.meta;
  if (typeof (t == null ? void 0 : t.headerTitle) == "string") return t.headerTitle;
  const n = e.columnDef.header;
  return typeof n == "string" ? n : String(e.id);
}
const Of = il(void 0);
function xe() {
  const e = sl(Of);
  if (!e)
    throw new Error("useDataGrid must be used within a DataGridProvider");
  return e;
}
function U0({
  children: e,
  table: t,
  ...n
}) {
  var s, i;
  const r = t.getState(), o = ((s = n.tableLayout) == null ? void 0 : s.columnsResizeMode) ?? "onEnd";
  qn(() => {
    var l;
    (l = n.tableLayout) != null && l.columnsResizable && (t.options.columnResizeMode = o);
  }, [(i = n.tableLayout) == null ? void 0 : i.columnsResizable, o, t]);
  const a = Vt(
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
  return /* @__PURE__ */ u(Of.Provider, { value: a, children: e });
}
function j0({
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
  return /* @__PURE__ */ u(U0, { table: t, ...o, children: e });
}
function K0({
  children: e,
  className: t,
  border: n = !0
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      "data-slot": "data-grid",
      className: $(
        "w-full overflow-hidden",
        n && "border-border rounded-md border",
        t
      ),
      children: e
    }
  );
}
const q0 = 24, X0 = 12, Tr = {
  hasVerticalOverflow: !1,
  headerHeight: 0,
  horizontalScrollbarSize: 0,
  thumbHeight: 0,
  thumbTop: 0,
  trackHeight: 0
};
function ia(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Fs(e, t) {
  return e.hasVerticalOverflow === t.hasVerticalOverflow && e.headerHeight === t.headerHeight && e.horizontalScrollbarSize === t.horizontalScrollbarSize && e.thumbHeight === t.thumbHeight && e.thumbTop === t.thumbTop && e.trackHeight === t.trackHeight;
}
function Ws(e, t) {
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
function Z0({
  children: e,
  className: t,
  orientation: n = "both",
  ...r
}) {
  var k;
  const { props: o } = xe(), a = ht(null), s = ht(null), i = ht(null), l = ht(Tr), d = ht({
    header: null,
    horizontalScrollbar: null,
    table: null,
    tableViewport: null
  }), c = n !== "vertical", f = n !== "horizontal", h = f && !!((k = o.tableLayout) != null && k.headerSticky), [p, v] = Yt(!1), g = Ae(() => {
    i.current = null, document.body.style.userSelect = "", document.body.style.webkitUserSelect = "";
  }, []), b = Ae(() => {
    const E = a.current;
    E && !Fs(Tr, l.current) && (Ws(E, Tr), l.current = Tr), v((M) => M && !1);
  }, []), w = Ae(() => {
    const E = a.current, M = s.current;
    if (!E || !M || !h) {
      b();
      return;
    }
    const { header: T, horizontalScrollbar: _ } = d.current, L = (T == null ? void 0 : T.getBoundingClientRect().height) ?? 0, A = M.clientHeight, Y = M.clientWidth, j = M.scrollHeight, F = M.scrollWidth, D = c && F > Y + 0.5 ? (_ == null ? void 0 : _.offsetHeight) || X0 : 0, O = Math.max(
      0,
      A - L - D
    ), Z = Math.max(0, j - A);
    let se;
    if (O === 0 || Z === 0)
      se = {
        hasVerticalOverflow: !1,
        headerHeight: L,
        horizontalScrollbarSize: D,
        thumbHeight: O,
        thumbTop: 0,
        trackHeight: O
      };
    else {
      const P = Math.max(
        O,
        j - L
      ), B = ia(
        O * (O / P),
        q0,
        O
      ), W = Math.max(0, O - B), G = W > 0 ? M.scrollTop / Z * W : 0;
      se = {
        hasVerticalOverflow: !0,
        headerHeight: L,
        horizontalScrollbarSize: D,
        thumbHeight: B,
        thumbTop: G,
        trackHeight: O
      };
    }
    Fs(se, l.current) || (Ws(E, se), l.current = se), v(
      (P) => P === se.hasVerticalOverflow ? P : se.hasVerticalOverflow
    );
  }, [b, c, h]);
  qn(() => {
    const E = a.current, M = s.current;
    if (!E || !M) return;
    if (!h) {
      b();
      return;
    }
    d.current = {
      header: E.querySelector(
        '[data-slot="data-grid-table"] thead'
      ),
      horizontalScrollbar: E.querySelector(
        '[data-slot="data-grid-scrollbar"][data-orientation="horizontal"]'
      ),
      table: E.querySelector(
        '[data-slot="data-grid-table"]'
      ),
      tableViewport: E.querySelector(
        '[data-slot="data-grid-table-viewport"]'
      )
    };
    let T = 0;
    const _ = () => {
      cancelAnimationFrame(T), T = window.requestAnimationFrame(w);
    };
    _(), M.addEventListener("scroll", _, { passive: !0 });
    const L = typeof ResizeObserver > "u" ? null : new ResizeObserver(_);
    return L == null || L.observe(M), d.current.header && (L == null || L.observe(d.current.header)), d.current.table && (L == null || L.observe(d.current.table)), d.current.tableViewport && (L == null || L.observe(d.current.tableViewport)), () => {
      cancelAnimationFrame(T), L == null || L.disconnect(), M.removeEventListener("scroll", _), g();
    };
  }, [
    g,
    b,
    w,
    h
  ]);
  const x = (E) => {
    const M = s.current, { thumbHeight: T, trackHeight: _ } = l.current;
    if (!M) return;
    const L = Math.max(0, M.scrollHeight - M.clientHeight), A = Math.max(0, _ - T);
    if (L === 0 || A === 0) {
      M.scrollTop = 0;
      return;
    }
    const Y = ia(E, 0, A) / A;
    M.scrollTop = Y * L;
  }, y = (E) => {
    const M = s.current;
    M && (E.preventDefault(), E.stopPropagation(), E.currentTarget.setPointerCapture(E.pointerId), i.current = {
      pointerId: E.pointerId,
      startScrollTop: M.scrollTop,
      startY: E.clientY
    }, document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }, S = (E) => {
    const M = s.current, T = i.current, { thumbHeight: _, trackHeight: L } = l.current;
    if (!M || !T || T.pointerId !== E.pointerId)
      return;
    const A = Math.max(0, L - _), Y = Math.max(0, M.scrollHeight - M.clientHeight);
    if (A === 0 || Y === 0) return;
    const j = E.clientY - T.startY, F = T.startScrollTop + j / A * Y;
    M.scrollTop = ia(F, 0, Y);
  }, C = (E) => {
    var M;
    ((M = i.current) == null ? void 0 : M.pointerId) === E.pointerId && g();
  }, R = (E) => {
    const { thumbHeight: M } = l.current;
    if (E.target !== E.currentTarget) return;
    E.preventDefault(), E.stopPropagation();
    const T = E.currentTarget.getBoundingClientRect(), _ = E.clientY - T.top - M / 2;
    x(_);
  };
  return /* @__PURE__ */ I("div", { ref: a, className: "relative", children: [
    /* @__PURE__ */ I(
      Yb,
      {
        "data-slot": "data-grid-scroll-area",
        className: $("relative", t),
        ...r,
        children: [
          /* @__PURE__ */ u(
            Gb,
            {
              ref: s,
              "data-slot": "scroll-area-viewport",
              className: "focus-visible:ring-ring/50 rounded-md size-full transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
              children: /* @__PURE__ */ u("div", { "data-slot": "scroll-area-content", children: e })
            }
          ),
          c && /* @__PURE__ */ u(
            Ra,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "horizontal",
              orientation: "horizontal",
              className: "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
              children: /* @__PURE__ */ u(
                Ma,
                {
                  "data-slot": "data-grid-thumb",
                  className: "bg-border rounded-full relative flex-1"
                }
              )
            }
          ),
          f && /* @__PURE__ */ u(
            Ra,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "vertical",
              orientation: "vertical",
              className: $(
                "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
                h && "pointer-events-none opacity-0"
              ),
              children: /* @__PURE__ */ u(
                Ma,
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
    h && p && /* @__PURE__ */ u(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute right-0 top-(--data-grid-scrollbar-header-height) z-20 h-(--data-grid-scrollbar-track-height)",
        children: /* @__PURE__ */ u(
          "div",
          {
            className: "pointer-events-auto relative h-full w-3 touch-none p-px",
            onPointerDown: R,
            children: /* @__PURE__ */ u(
              "div",
              {
                className: $(
                  "bg-border absolute right-px w-2",
                  "top-(--data-grid-scrollbar-thumb-top) h-(--data-grid-scrollbar-thumb-height)",
                  "rounded-full"
                ),
                onLostPointerCapture: g,
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
function Ya(e, t) {
  return e ? Q0(e) ? /* @__PURE__ */ m.createElement(e, t) : e : null;
}
function Q0(e) {
  return J0(e) || typeof e == "function" || eS(e);
}
function J0(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function eS(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
const tS = gn("", {
  variants: {
    size: {
      dense: "px-2.5 h-9",
      default: "px-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Af = gn("", {
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
function If(e) {
  const t = e.getIsPinned();
  return {
    left: t === "left" ? `${e.getStart("left")}px` : void 0,
    right: t === "right" ? `${e.getAfter("right")}px` : void 0,
    position: t ? "sticky" : "relative",
    width: e.getSize(),
    zIndex: t ? 1 : 0
  };
}
function Ga(e, t) {
  if (e) {
    if (typeof e == "function") {
      e(t);
      return;
    }
    e.current = t;
  }
}
function Ua(e) {
  return "touches" in e;
}
function sa(e) {
  var t, n;
  return Ua(e) ? ((t = e.touches[0]) == null ? void 0 : t.clientX) ?? ((n = e.changedTouches[0]) == null ? void 0 : n.clientX) : e.clientX;
}
function Bs(e, t, n) {
  var C;
  const r = n.getColumn(t.column.id);
  if (!r || !r.getCanResize() || Ua(e) && e.touches.length > 1) return;
  (C = e.persist) == null || C.call(e);
  const o = e.currentTarget.ownerDocument, a = o.body.style.cursor, s = o.documentElement.style.cursor, i = t.getSize(), l = sa(e), d = e.currentTarget.closest("th"), c = d == null ? void 0 : d.getBoundingClientRect(), f = c && Number.isFinite(
    n.options.columnResizeDirection === "rtl" ? c.left : c.right
  ) ? n.options.columnResizeDirection === "rtl" ? c.left : c.right : l;
  if (typeof l != "number" || typeof f != "number")
    return;
  o.body.style.cursor = "col-resize", o.documentElement.style.cursor = "col-resize";
  const h = t.getLeafHeaders().map(
    (R) => [R.column.id, R.column.getSize()]
  ), p = n.options.columnResizeDirection === "rtl" ? -1 : 1, v = (R, k = !1) => {
    if (typeof R != "number") return;
    let E = {};
    const M = (R - l) * p, T = Math.max(M / i, -0.999999);
    h.forEach(([_, L]) => {
      E[_] = Math.round(
        Math.max(L + L * T, 0) * 100
      ) / 100;
    }), n.setColumnSizingInfo((_) => ({
      ..._,
      startOffset: f,
      startSize: i,
      deltaOffset: M,
      deltaPercentage: T,
      columnSizingStart: h,
      isResizingColumn: r.id
    })), k && n.setColumnSizing((_) => ({
      ..._,
      ...E
    }));
  }, g = (R) => {
    v(R, !0), n.setColumnSizingInfo((k) => ({
      ...k,
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
    o.removeEventListener("mousemove", b), o.removeEventListener("mouseup", w), g(R.clientX);
  }, x = (R) => {
    R.cancelable && (R.preventDefault(), R.stopPropagation()), v(sa(R));
  }, y = (R) => {
    o.removeEventListener("touchmove", x), o.removeEventListener("touchend", y), R.cancelable && (R.preventDefault(), R.stopPropagation()), g(sa(R));
  }, S = { passive: !1 };
  Ua(e) ? (o.addEventListener(
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
function nS(e, t) {
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
function rS(e, t) {
  const { topRows: n, centerRows: r, bottomRows: o } = nS(
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
function oS() {
  var t;
  const { props: e } = xe();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ u(
    "col",
    {
      "data-slot": "data-grid-table-fill-col",
      style: { width: "var(--data-grid-fill-size, 0px)" }
    }
  ) : null;
}
function aS() {
  var t;
  const { props: e } = xe();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ u(
    "th",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-head-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function Lf() {
  var t;
  const { props: e } = xe();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ u(
    "td",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-body-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function iS({ children: e }) {
  var a, s, i, l, d, c, f;
  const { props: t, table: n } = xe(), r = n.getVisibleLeafColumns(), o = Vt(() => {
    var v;
    if (!((v = t.tableLayout) != null && v.columnsResizable)) return;
    const h = n.getFlatHeaders(), p = {};
    for (let g = 0; g < h.length; g++) {
      const b = h[g];
      p[`--header-${b.id}-size`] = b.getSize(), p[`--col-${b.column.id}-size`] = b.column.getSize();
    }
    return p;
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
      className: $(
        "text-foreground text-sm caption-bottom text-left align-middle font-normal rtl:text-right",
        (s = t.tableLayout) != null && s.columnsResizable ? "min-w-0" : "w-full min-w-full",
        ((i = t.tableLayout) == null ? void 0 : i.width) === "auto" ? "table-auto" : "table-fixed",
        !((l = t.tableLayout) != null && l.columnsResizable) && "",
        !((d = t.tableLayout) != null && d.columnsDraggable) && "border-separate border-spacing-0",
        (c = t.tableClassNames) == null ? void 0 : c.base
      ),
      style: (f = t.tableLayout) != null && f.columnsResizable ? {
        ...o,
        width: `calc(${n.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
      } : void 0,
      children: [
        /* @__PURE__ */ I("colgroup", { children: [
          r.map((h) => {
            var p, v;
            return /* @__PURE__ */ u(
              "col",
              {
                style: (p = t.tableLayout) != null && p.columnsResizable ? { width: `calc(var(--col-${h.id}-size) * 1px)` } : ((v = t.tableLayout) == null ? void 0 : v.width) === "fixed" ? { width: h.getSize() } : void 0
              },
              h.id
            );
          }),
          /* @__PURE__ */ u(oS, {})
        ] }),
        e
      ]
    }
  );
}
function sS({
  children: e,
  className: t,
  viewportRef: n,
  style: r
}) {
  var h, p, v;
  const { props: o, table: a } = xe(), [s, i] = Yt(
    null
  ), [l, d] = Yt(0), c = Ae(
    (g) => {
      i(g), Ga(n, g);
    },
    [n]
  ), f = (h = o.tableLayout) != null && h.columnsResizable && l > 0 ? Math.max(0, l - a.getTotalSize()) : 0;
  return qn(() => {
    var y;
    if (!s || !((y = o.tableLayout) != null && y.columnsResizable)) {
      d(0);
      return;
    }
    const b = s.closest(
      '[data-slot="scroll-area-viewport"]'
    ) ?? s.parentElement ?? s, w = () => {
      d(b.clientWidth);
    };
    if (w(), typeof ResizeObserver > "u") return;
    const x = new ResizeObserver(w);
    return x.observe(b), () => {
      x.disconnect();
    };
  }, [(p = o.tableLayout) == null ? void 0 : p.columnsResizable, s]), /* @__PURE__ */ I(
    "div",
    {
      "data-slot": "data-grid-table-viewport",
      ref: c,
      className: $("relative min-w-full align-top", t),
      style: {
        ...(v = o.tableLayout) != null && v.columnsResizable ? {
          width: `calc(${a.getTotalSize()}px + var(--data-grid-fill-size, 0px))`,
          "--data-grid-fill-size": `${f}px`
        } : void 0,
        ...r
      },
      children: [
        e,
        /* @__PURE__ */ u(fS, { viewportElement: s })
      ]
    }
  );
}
function lS({ children: e }) {
  var n, r, o;
  const { props: t } = xe();
  return /* @__PURE__ */ u(
    "thead",
    {
      className: $(
        (n = t.tableClassNames) == null ? void 0 : n.header,
        ((r = t.tableLayout) == null ? void 0 : r.headerSticky) && ((o = t.tableClassNames) == null ? void 0 : o.headerSticky)
      ),
      children: e
    }
  );
}
function cS({
  children: e,
  headerGroup: t
}) {
  var r, o, a, s, i;
  const { props: n } = xe();
  return /* @__PURE__ */ I(
    "tr",
    {
      className: $(
        "bg-muted/40",
        ((r = n.tableLayout) == null ? void 0 : r.headerBorder) && "[&>th]:border-b",
        ((o = n.tableLayout) == null ? void 0 : o.cellBorder) && "*:last:border-e-0",
        ((a = n.tableLayout) == null ? void 0 : a.stripped) && "bg-transparent",
        ((s = n.tableLayout) == null ? void 0 : s.headerBackground) === !1 && "bg-transparent",
        (i = n.tableClassNames) == null ? void 0 : i.headerRow
      ),
      children: [
        e,
        /* @__PURE__ */ u(aS, {})
      ]
    },
    t.id
  );
}
function dS({
  children: e,
  header: t,
  dndRef: n,
  dndStyle: r
}) {
  var f, h, p, v, g, b, w, x, y, S, C;
  const { props: o } = xe(), { column: a } = t, s = a.getIsPinned(), i = s === "left" && a.getIsLastColumn("left"), l = s === "right" && a.getIsFirstColumn("right"), d = a.getIndex() === t.getContext().table.getVisibleLeafColumns().length - 1, c = tS({
    size: (f = o.tableLayout) != null && f.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ u(
    "th",
    {
      ref: n,
      style: {
        ...((h = o.tableLayout) == null ? void 0 : h.width) === "fixed" && !((p = o.tableLayout) != null && p.columnsResizable) && {
          width: t.getSize()
        },
        ...((v = o.tableLayout) == null ? void 0 : v.columnsPinnable) && a.getCanPin() && If(a),
        ...((g = o.tableLayout) == null ? void 0 : g.columnsResizable) && {
          width: `calc(var(--header-${t.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": s || void 0,
      "data-last-col": i ? "left" : l ? "right" : void 0,
      className: $(
        "text-secondary-foreground/80 h-10 relative text-left align-middle font-normal rtl:text-right [&:has([role=checkbox])]:pe-0",
        c,
        ((b = o.tableLayout) == null ? void 0 : b.cellBorder) && "border-e",
        ((w = o.tableLayout) == null ? void 0 : w.columnsResizable) && a.getCanResize() && "overflow-visible",
        ((x = o.tableLayout) == null ? void 0 : x.columnsResizable) && a.getCanResize() && d && "pe-8",
        ((y = o.tableLayout) == null ? void 0 : y.columnsPinnable) && a.getCanPin() && "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s!",
        (S = t.column.columnDef.meta) == null ? void 0 : S.headerClassName,
        a.getIndex() === 0 || a.getIndex() === t.headerGroup.headers.length - 1 ? (C = o.tableClassNames) == null ? void 0 : C.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function uS({
  header: e
}) {
  var l, d;
  const { props: t, table: n } = xe(), { column: r } = e, o = r.getIndex() === e.getContext().table.getVisibleLeafColumns().length - 1, a = (((l = t.tableLayout) == null ? void 0 : l.columnsResizeMode) ?? n.options.columnResizeMode) === "onEnd";
  return /* @__PURE__ */ u(
    "div",
    {
      onDoubleClick: () => r.resetSize(),
      onMouseDown: (c) => {
        if (c.preventDefault(), c.stopPropagation(), a) {
          Bs(c, e, n);
          return;
        }
        e.getResizeHandler()(c);
      },
      onTouchStart: (c) => {
        if (c.preventDefault(), c.stopPropagation(), a) {
          Bs(c, e, n);
          return;
        }
        e.getResizeHandler()(c);
      },
      className: $(
        "absolute top-0 h-full cursor-col-resize user-select-none touch-none z-10 flex",
        o ? "end-0 w-5 justify-end before:hidden" : "-end-2 w-5 justify-center before:absolute before:inset-y-0 before:w-px before:-translate-x-px before:bg-border",
        ((d = t.tableLayout) == null ? void 0 : d.cellBorder) && !r.getIsResizing() && "before:hidden",
        r.getIsResizing() && (a ? "opacity-100" : o ? "before:absolute before:end-0 before:block before:inset-y-0 before:w-0.5 before:bg-primary opacity-100" : "before:block before:bg-primary before:w-0.5 opacity-100")
      )
    }
  );
}
function fS({
  viewportElement: e
}) {
  var c, f, h;
  const { props: t, table: n } = xe(), r = n.getState().columnSizingInfo, o = r.isResizingColumn, a = ((c = t.tableLayout) == null ? void 0 : c.columnsResizeMode) ?? n.options.columnResizeMode;
  if (!((f = t.tableLayout) != null && f.columnsResizable) || a !== "onEnd" || !o)
    return null;
  const s = n.getFlatHeaders().find(
    (p) => p.column.id === o || p.id === o
  );
  if (!s) return null;
  const i = r.deltaOffset ?? 0, l = ((h = e == null ? void 0 : e.querySelector('[data-slot="data-grid-table"] thead')) == null ? void 0 : h.getBoundingClientRect().height) ?? 0, d = typeof r.startOffset == "number" && e ? r.startOffset - e.getBoundingClientRect().left : s.getStart() + s.getSize();
  return /* @__PURE__ */ I(
    "div",
    {
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-y-0 z-20",
      style: {
        left: d,
        transform: `translateX(${i}px)`
      },
      children: [
        /* @__PURE__ */ u("div", { className: "bg-primary/85 absolute inset-y-0 left-0 w-px -translate-x-1/2" }),
        /* @__PURE__ */ u(
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
function mS() {
  return /* @__PURE__ */ u("tbody", { "aria-hidden": "true", className: "h-2" });
}
function hS({ children: e }) {
  var n, r, o;
  const { props: t } = xe();
  return /* @__PURE__ */ u(
    "tbody",
    {
      className: $(
        "[&_tr:last-child]:border-0",
        ((n = t.tableLayout) == null ? void 0 : n.rowRounded) && "[&_td:first-child]:rounded-l-lg",
        ((r = t.tableLayout) == null ? void 0 : r.rowRounded) && "[&_td:last-child]:rounded-r-lg",
        (o = t.tableClassNames) == null ? void 0 : o.body
      ),
      children: e
    }
  );
}
function pS({ children: e }) {
  var n, r, o;
  const { props: t } = xe();
  return /* @__PURE__ */ u(
    "tfoot",
    {
      className: $(
        "border-t",
        ((n = t.tableLayout) == null ? void 0 : n.footerSticky) && ((r = t.tableClassNames) == null ? void 0 : r.footerSticky),
        (o = t.tableClassNames) == null ? void 0 : o.footer
      ),
      children: e
    }
  );
}
function gS({ children: e }) {
  var r, o, a, s, i;
  const { table: t, props: n } = xe();
  return /* @__PURE__ */ I(
    "tr",
    {
      className: $(
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
        /* @__PURE__ */ u(Lf, {})
      ]
    }
  );
}
function vS({
  children: e,
  column: t
}) {
  var a, s, i, l, d, c, f;
  const { props: n, table: r } = xe(), o = Af({
    size: (a = n.tableLayout) != null && a.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ u(
    "td",
    {
      style: (s = n.tableLayout) != null && s.columnsResizable ? { width: `calc(var(--col-${t.id}-size) * 1px)` } : void 0,
      className: $(
        "align-middle",
        o,
        ((i = n.tableLayout) == null ? void 0 : i.cellBorder) && "border-e",
        ((l = n.tableLayout) == null ? void 0 : l.columnsResizable) && t.getCanResize() && "truncate",
        (d = t.columnDef.meta) == null ? void 0 : d.cellClassName,
        ((c = n.tableLayout) == null ? void 0 : c.columnsPinnable) && t.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        t.getIndex() === 0 || t.getIndex() === r.getVisibleFlatColumns().length - 1 ? (f = n.tableClassNames) == null ? void 0 : f.edgeCell : ""
      ),
      children: e
    }
  );
}
function bS({
  children: e,
  row: t,
  pinnedBoundary: n,
  rowRef: r,
  dndRef: o,
  dndStyle: a
}) {
  var d, c, f, h, p, v;
  const { props: s, table: i } = xe(), l = t.getIsPinned();
  return /* @__PURE__ */ I(
    "tr",
    {
      ref: (g) => {
        Ga(r, g), Ga(o, g);
      },
      style: { ...a || null },
      "data-state": i.options.enableRowSelection && t.getIsSelected() ? "selected" : void 0,
      "data-row-pinned": l || void 0,
      "data-row-pinned-boundary": n,
      onClick: () => s.onRowClick && s.onRowClick(t.original),
      className: $(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        s.onRowClick && "cursor-pointer",
        !((d = s.tableLayout) != null && d.stripped) && ((c = s.tableLayout) == null ? void 0 : c.rowBorder) && "border-border border-b [&:not(:last-child)>td]:border-b",
        ((f = s.tableLayout) == null ? void 0 : f.cellBorder) && "*:last:border-e-0",
        ((h = s.tableLayout) == null ? void 0 : h.stripped) && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        i.options.enableRowSelection && "*:first:relative",
        ((p = s.tableLayout) == null ? void 0 : p.rowsPinnable) && l && "bg-muted/30 hover:bg-muted/50",
        n === "top" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        n === "bottom" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        (v = s.tableClassNames) == null ? void 0 : v.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ u(Lf, {})
      ]
    }
  );
}
function wS({ row: e }) {
  var r, o, a, s, i;
  const { props: t, table: n } = xe();
  return /* @__PURE__ */ u(
    "tr",
    {
      className: $(
        ((r = t.tableLayout) == null ? void 0 : r.rowBorder) && "[&:not(:last-child)>td]:border-b"
      ),
      children: /* @__PURE__ */ u(
        "td",
        {
          colSpan: e.getVisibleCells().length + ((o = t.tableLayout) != null && o.columnsResizable ? 1 : 0),
          children: (i = (s = (a = n.getAllColumns().find((l) => {
            var d;
            return (d = l.columnDef.meta) == null ? void 0 : d.expandedContent;
          })) == null ? void 0 : a.columnDef.meta) == null ? void 0 : s.expandedContent) == null ? void 0 : i.call(s, e.original)
        }
      )
    }
  );
}
function yS({
  children: e,
  cell: t,
  dndRef: n,
  dndStyle: r
}) {
  var f, h, p, v, g, b, w, x, y;
  const { props: o } = xe(), { column: a, row: s } = t, i = a.getIsPinned(), l = i === "left" && a.getIsLastColumn("left"), d = i === "right" && a.getIsFirstColumn("right"), c = Af({
    size: (f = o.tableLayout) != null && f.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ u(
    "td",
    {
      ref: n,
      ...(h = o.tableLayout) != null && h.columnsDraggable && !i ? { cell: t } : {},
      style: {
        ...((p = o.tableLayout) == null ? void 0 : p.columnsPinnable) && a.getCanPin() && If(a),
        ...((v = o.tableLayout) == null ? void 0 : v.columnsResizable) && {
          width: `calc(var(--col-${a.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": i || void 0,
      "data-last-col": l ? "left" : d ? "right" : void 0,
      className: $(
        "align-middle",
        c,
        ((g = o.tableLayout) == null ? void 0 : g.cellBorder) && "border-e",
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
function xS({
  row: e,
  pinnedBoundary: t,
  rowRef: n
}) {
  return /* @__PURE__ */ I(xm, { children: [
    /* @__PURE__ */ u(
      bS,
      {
        row: e,
        pinnedBoundary: t,
        rowRef: n,
        children: e.getVisibleCells().map((r) => /* @__PURE__ */ u(yS, { cell: r, children: Ya(r.column.columnDef.cell, r.getContext()) }, r.id))
      }
    ),
    e.getIsExpanded() && /* @__PURE__ */ u(wS, { row: e })
  ] });
}
function SS() {
  var r;
  const { table: e, props: t } = xe(), n = e.getVisibleLeafColumns().length + ((r = t.tableLayout) != null && r.columnsResizable ? 1 : 0);
  return /* @__PURE__ */ u("tr", { children: /* @__PURE__ */ u(
    "td",
    {
      colSpan: Math.max(n, 1),
      className: "text-muted-foreground text-sm py-6 text-center",
      children: t.emptyMessage || "No data available"
    }
  ) });
}
function CS({ table: e }) {
  var a;
  const { isLoading: t, props: n } = xe(), r = e.getState().pagination;
  if (t && n.loadingMode === "skeleton" && (r != null && r.pageSize))
    return /* @__PURE__ */ u(_e, { children: Array.from({ length: r.pageSize }).map((s, i) => /* @__PURE__ */ u(gS, { children: e.getVisibleFlatColumns().map((l, d) => {
      var c;
      return /* @__PURE__ */ u(vS, { column: l, children: (c = l.columnDef.meta) == null ? void 0 : c.skeleton }, d);
    }) }, i)) });
  if (t && n.loadingMode === "spinner")
    return /* @__PURE__ */ u("tr", { children: /* @__PURE__ */ u("td", { colSpan: e.getVisibleFlatColumns().length, className: "p-8", children: /* @__PURE__ */ I("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ I(
        "svg",
        {
          className: "text-muted-foreground mr-3 -ml-1 h-5 w-5 animate-spin",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          children: [
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u(
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
  const o = rS(
    e,
    (a = n.tableLayout) == null ? void 0 : a.rowsPinnable
  );
  return o.length ? /* @__PURE__ */ u(_e, { children: o.map(({ row: s, pinnedBoundary: i }) => /* @__PURE__ */ u(
    xS,
    {
      row: s,
      pinnedBoundary: i
    },
    s.id
  )) }) : /* @__PURE__ */ u(SS, {});
}
const kS = ll(
  CS,
  (e, t) => !!t.table.getState().columnSizingInfo.isResizingColumn
);
function ES({
  footerContent: e,
  renderHeader: t = !0
}) {
  var o, a;
  const { table: n, props: r } = xe();
  return /* @__PURE__ */ u(sS, { children: /* @__PURE__ */ I(iS, { children: [
    t && /* @__PURE__ */ u(lS, { children: n.getHeaderGroups().map((s, i) => /* @__PURE__ */ u(cS, { headerGroup: s, children: s.headers.map((l, d) => {
      var f, h;
      const { column: c } = l;
      return /* @__PURE__ */ I(dS, { header: l, children: [
        l.isPlaceholder ? null : (f = r.tableLayout) != null && f.columnsResizable && c.getCanResize() ? /* @__PURE__ */ u("div", { className: "truncate", children: Ya(
          l.column.columnDef.header,
          l.getContext()
        ) }) : Ya(
          l.column.columnDef.header,
          l.getContext()
        ),
        ((h = r.tableLayout) == null ? void 0 : h.columnsResizable) && c.getCanResize() && /* @__PURE__ */ u(uS, { header: l })
      ] }, d);
    }) }, i)) }),
    t && (((o = r.tableLayout) == null ? void 0 : o.stripped) || !((a = r.tableLayout) != null && a.rowBorder)) && /* @__PURE__ */ u(mS, {}),
    /* @__PURE__ */ u(hS, { children: /* @__PURE__ */ u(kS, { table: n }) }),
    e && /* @__PURE__ */ u(pS, { children: e })
  ] }) });
}
function RS({
  table: e,
  pageSizeOptions: t = [10, 20, 30, 40, 50],
  className: n,
  ...r
}) {
  return /* @__PURE__ */ I(
    "div",
    {
      className: $(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ u("div", { className: "flex-1 whitespace-nowrap tabular-nums text-muted-foreground text-sm", children: e.options.onRowSelectionChange ? /* @__PURE__ */ I(_e, { children: [
          e.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          e.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }) : /* @__PURE__ */ I(_e, { children: [
          e.getFilteredRowModel().rows.length,
          " row(s)"
        ] }) }),
        /* @__PURE__ */ I("div", { className: "flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8", children: [
          /* @__PURE__ */ I("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ u("p", { className: "whitespace-nowrap font-medium text-sm", children: "Rows per page" }),
            /* @__PURE__ */ I(
              Mf,
              {
                value: `${e.getState().pagination.pageSize}`,
                onValueChange: (o) => {
                  e.setPageSize(Number(o));
                },
                children: [
                  /* @__PURE__ */ u(Df, { className: "h-8 w-18 data-size:h-8", children: /* @__PURE__ */ u(Nf, { placeholder: e.getState().pagination.pageSize }) }),
                  /* @__PURE__ */ u(Pf, { side: "top", children: t.map((o) => /* @__PURE__ */ u(Tf, { value: `${o}`, children: o }, o)) })
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
            /* @__PURE__ */ u(
              We,
              {
                "aria-label": "Go to first page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(0),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ u(_x, {})
              }
            ),
            /* @__PURE__ */ u(
              We,
              {
                "aria-label": "Go to previous page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.previousPage(),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ u(mf, {})
              }
            ),
            /* @__PURE__ */ u(
              We,
              {
                "aria-label": "Go to next page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.nextPage(),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ u($i, {})
              }
            ),
            /* @__PURE__ */ u(
              We,
              {
                "aria-label": "Go to last page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(e.getPageCount() - 1),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ u(Ax, {})
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function RM({
  table: e,
  recordCount: t,
  actionBar: n,
  children: r,
  className: o,
  resizable: a = !1,
  stickyHeader: s = !1,
  stickyFooter: i = !1,
  height: l,
  footerContent: d,
  tableLayoutOverrides: c
}) {
  return /* @__PURE__ */ u(
    j0,
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
        ...c
      },
      children: /* @__PURE__ */ I("div", { className: $("flex w-full flex-col gap-2.5", o), children: [
        r,
        /* @__PURE__ */ u(K0, { children: /* @__PURE__ */ u(Z0, { className: l, children: /* @__PURE__ */ u(ES, { footerContent: d }) }) }),
        /* @__PURE__ */ I("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ u(RS, { table: e }),
          n && e.getFilteredSelectedRowModel().rows.length > 0 && n
        ] })
      ] })
    }
  );
}
function MS({
  column: e,
  label: t,
  icon: n,
  className: r,
  filter: o,
  visibility: a = !1
}) {
  var _, L, A, Y, j, F, U, D;
  const { isLoading: s, table: i, props: l, recordCount: d } = xe(), c = t ?? $s(e), f = i.getState().columnOrder, h = JSON.stringify(i.getState().columnVisibility), p = e.getIsSorted(), v = e.getIsPinned(), g = e.getCanSort(), b = e.getCanPin(), w = e.getCanResize(), x = f.indexOf(e.id), y = x > 0, S = x < f.length - 1, C = () => {
    p === "asc" ? e.toggleSorting(!0) : p === "desc" ? e.clearSorting() : e.toggleSorting(!1);
  }, R = $(
    "text-secondary-foreground/80 inline-flex h-full items-center gap-1.5 font-normal [&_svg]:opacity-60 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5",
    r
  ), k = $(
    "text-secondary-foreground/80 hover:bg-secondary! data-[state=open]:bg-secondary! hover:text-foreground data-[state=open]:text-foreground -ms-2 px-2 py-0 font-normal h-7 rounded-md",
    r
  ), E = g && (p === "desc" ? /* @__PURE__ */ u(Ts, { className: "size-3.5" }) : p === "asc" ? /* @__PURE__ */ u(_s, { className: "size-3.5" }) : /* @__PURE__ */ u(Lx, { className: "mt-px size-3.5" })), M = ((_ = l.tableLayout) == null ? void 0 : _.columnsMovable) || ((L = l.tableLayout) == null ? void 0 : L.columnsVisibility) && a || ((A = l.tableLayout) == null ? void 0 : A.columnsPinnable) && b || o, T = Vt(() => {
    var se, P, B;
    const O = [];
    let Z = !1;
    return o && (O.push(
      /* @__PURE__ */ u(W0, { children: /* @__PURE__ */ u(H0, { children: o }, "filter") }, "group-filter")
    ), Z = !0), g && (Z && O.push(/* @__PURE__ */ u(Pr, {}, "sep-sort")), O.push(
      /* @__PURE__ */ I(
        on,
        {
          onClick: () => {
            p === "asc" ? e.clearSorting() : e.toggleSorting(!1);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ u(_s, { className: "size-3.5!" }),
            /* @__PURE__ */ u("span", { className: "grow", children: "Asc" }),
            p === "asc" && /* @__PURE__ */ u(pt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-asc"
      ),
      /* @__PURE__ */ I(
        on,
        {
          onClick: () => {
            p === "desc" ? e.clearSorting() : e.toggleSorting(!0);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ u(Ts, { className: "size-3.5!" }),
            /* @__PURE__ */ u("span", { className: "grow", children: "Desc" }),
            p === "desc" && /* @__PURE__ */ u(pt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-desc"
      )
    ), Z = !0), (se = l.tableLayout) != null && se.columnsPinnable && b && (Z && O.push(/* @__PURE__ */ u(Pr, {}, "sep-pin")), O.push(
      /* @__PURE__ */ I(
        on,
        {
          onClick: () => e.pin(v === "left" ? !1 : "left"),
          children: [
            /* @__PURE__ */ u(px, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ u("span", { className: "grow", children: "Pin to left" }),
            v === "left" && /* @__PURE__ */ u(pt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-left"
      ),
      /* @__PURE__ */ I(
        on,
        {
          onClick: () => e.pin(v === "right" ? !1 : "right"),
          children: [
            /* @__PURE__ */ u(wx, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ u("span", { className: "grow", children: "Pin to right" }),
            v === "right" && /* @__PURE__ */ u(pt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-right"
      )
    ), Z = !0), (P = l.tableLayout) != null && P.columnsMovable && (Z && O.push(/* @__PURE__ */ u(Pr, {}, "sep-move")), O.push(
      /* @__PURE__ */ I(
        on,
        {
          onClick: () => {
            if (x > 0) {
              const W = [...f], [G] = W.splice(x, 1);
              W.splice(x - 1, 0, G), i.setColumnOrder(W);
            }
          },
          disabled: !y || v !== !1,
          children: [
            /* @__PURE__ */ u(vx, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ u("span", { children: "Move to Left" })
          ]
        },
        "move-left"
      ),
      /* @__PURE__ */ I(
        on,
        {
          onClick: () => {
            if (x < f.length - 1) {
              const W = [...f], [G] = W.splice(x, 1);
              W.splice(x + 1, 0, G), i.setColumnOrder(W);
            }
          },
          disabled: !S || v !== !1,
          children: [
            /* @__PURE__ */ u(xx, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ u("span", { children: "Move to Right" })
          ]
        },
        "move-right"
      )
    ), Z = !0), (B = l.tableLayout) != null && B.columnsVisibility && a && (Z && O.push(/* @__PURE__ */ u(Pr, {}, "sep-visibility")), O.push(
      /* @__PURE__ */ I(V0, { children: [
        /* @__PURE__ */ I(Y0, { children: [
          /* @__PURE__ */ u(pf, { className: "size-3.5!" }),
          /* @__PURE__ */ u("span", { children: "Columns" })
        ] }),
        /* @__PURE__ */ u(G0, { children: i.getAllColumns().filter((W) => W.getCanHide()).map((W) => /* @__PURE__ */ u(
          B0,
          {
            checked: W.getIsVisible(),
            onSelect: (G) => G.preventDefault(),
            onCheckedChange: (G) => W.toggleVisibility(!!G),
            className: "capitalize",
            children: $s(W)
          },
          W.id
        )) })
      ] }, "visibility")
    )), O;
  }, [
    o,
    g,
    p,
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
    /* @__PURE__ */ I(z0, { children: [
      /* @__PURE__ */ u($0, { asChild: !0, children: /* @__PURE__ */ I(
        We,
        {
          variant: "ghost",
          className: k,
          disabled: s || d === 0,
          children: [
            n && n,
            c,
            E
          ]
        }
      ) }),
      /* @__PURE__ */ u(F0, { className: "w-40", align: "start", children: T })
    ] }),
    ((U = l.tableLayout) == null ? void 0 : U.columnsPinnable) && b && v && /* @__PURE__ */ u(
      We,
      {
        size: "icon",
        variant: "ghost",
        className: "-me-1 size-7 rounded-md",
        onClick: () => e.pin(!1),
        "aria-label": `Unpin ${c} column`,
        title: `Unpin ${c} column`,
        children: /* @__PURE__ */ u(Hx, { className: "size-3.5! opacity-50!", "aria-hidden": "true" })
      }
    )
  ] }) : g || (D = l.tableLayout) != null && D.columnsResizable && w ? /* @__PURE__ */ u("div", { className: "flex h-full items-center", children: /* @__PURE__ */ I(
    We,
    {
      variant: "ghost",
      className: k,
      disabled: s || d === 0,
      onClick: C,
      children: [
        n && n,
        c,
        E
      ]
    }
  ) }) : /* @__PURE__ */ I("div", { className: R, children: [
    n && n,
    c
  ] });
}
const MM = ll(
  MS
);
function NS(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const la = {}, Fn = {};
function Wn(e, t) {
  try {
    const r = (la[e] || (la[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Fn ? Fn[r] : Hs(r, r.split(":"));
  } catch {
    if (e in Fn) return Fn[e];
    const n = e == null ? void 0 : e.match(DS);
    return n ? Hs(e, n.slice(1)) : NaN;
  }
}
const DS = /([+-]\d\d):?(\d\d)?/;
function Hs(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0);
  return Fn[e] = n > 0 ? n * 60 + r : n * 60 - r;
}
class at extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Wn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), zf(this), ja(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new at(...n, t) : new at(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new at(+this, t);
  }
  getTimezoneOffset() {
    return -Wn(this.timeZone, this);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), ja(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new at(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Vs = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Vs.test(e)) return;
  const t = e.replace(Vs, "$1UTC");
  at.prototype[t] && (e.startsWith("get") ? at.prototype[e] = function() {
    return this.internal[t]();
  } : (at.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), PS(this), +this;
  }, at.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), ja(this), +this;
  }));
});
function ja(e) {
  e.internal.setTime(+e), e.internal.setUTCMinutes(e.internal.getUTCMinutes() - e.getTimezoneOffset());
}
function PS(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), zf(e);
}
function zf(e) {
  const t = Wn(e.timeZone, e), n = /* @__PURE__ */ new Date(+e);
  n.setUTCHours(n.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+n)).getTimezoneOffset(), a = r - o, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const i = r - t;
  i && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + i);
  const l = Wn(e.timeZone, e), c = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - l, f = l !== t, h = c - i;
  if (f && h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
    const p = Wn(e.timeZone, e), v = l - p;
    v && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + v), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v));
  }
}
class Ie extends at {
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
    return `${t} GMT${n}${r}${o} (${NS(this.timeZone, this)})`;
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
var $e;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})($e || ($e = {}));
const $f = 6048e5, TS = 864e5, Ys = Symbol.for("constructDateFrom");
function Pe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ys in e ? e[Ys](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ve(e, t) {
  return Pe(t || e, e);
}
function Ff(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in);
  return isNaN(t) ? Pe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Wf(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return Pe(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = Pe(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let _S = {};
function lr() {
  return _S;
}
function pn(e, t) {
  var i, l, d, c;
  const n = lr(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((c = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : c.weekStartsOn) ?? 0, o = ve(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function jn(e, t) {
  return pn(e, { ...t, weekStartsOn: 1 });
}
function Bf(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Pe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = jn(o), s = Pe(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = jn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Gs(e) {
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
function Mn(e, ...t) {
  const n = Pe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Kn(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Hf(e, t, n) {
  const [r, o] = Mn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = Kn(r), s = Kn(o), i = +a - Gs(a), l = +s - Gs(s);
  return Math.round((i - l) / TS);
}
function OS(e, t) {
  const n = Bf(e, t), r = Pe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), jn(r);
}
function AS(e, t, n) {
  return Ff(e, t * 7, n);
}
function IS(e, t, n) {
  return Wf(e, t * 12, n);
}
function LS(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Pe.bind(null, o));
    const a = ve(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), Pe(r, n || NaN);
}
function zS(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Pe.bind(null, o));
    const a = ve(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), Pe(r, n || NaN);
}
function $S(e, t, n) {
  const [r, o] = Mn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Kn(r) == +Kn(o);
}
function Vf(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function FS(e) {
  return !(!Vf(e) && typeof e != "number" || isNaN(+ve(e)));
}
function WS(e, t, n) {
  const [r, o] = Mn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function BS(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function HS(e, t) {
  const [n, r] = Mn(e, t.start, t.end);
  return { start: n, end: r };
}
function VS(e, t) {
  const { start: n, end: r } = HS(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const l = [];
  for (; +s <= a; )
    l.push(Pe(n, s)), s.setMonth(s.getMonth() + i);
  return o ? l.reverse() : l;
}
function YS(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function GS(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Yf(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Gf(e, t) {
  var i, l, d, c;
  const n = lr(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((c = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : c.weekStartsOn) ?? 0, o = ve(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function US(e, t) {
  return Gf(e, { ...t, weekStartsOn: 1 });
}
const jS = {
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
}, KS = (e, t, n) => {
  let r;
  const o = jS[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ca(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const qS = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, XS = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ZS = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, QS = {
  date: ca({
    formats: qS,
    defaultWidth: "full"
  }),
  time: ca({
    formats: XS,
    defaultWidth: "full"
  }),
  dateTime: ca({
    formats: ZS,
    defaultWidth: "full"
  })
}, JS = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, eC = (e, t, n, r) => JS[e];
function On(e) {
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
const tC = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, nC = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, rC = {
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
}, oC = {
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
}, aC = {
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
}, iC = {
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
}, sC = (e, t) => {
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
}, lC = {
  ordinalNumber: sC,
  era: On({
    values: tC,
    defaultWidth: "wide"
  }),
  quarter: On({
    values: nC,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: On({
    values: rC,
    defaultWidth: "wide"
  }),
  day: On({
    values: oC,
    defaultWidth: "wide"
  }),
  dayPeriod: On({
    values: aC,
    defaultWidth: "wide",
    formattingValues: iC,
    defaultFormattingWidth: "wide"
  })
};
function An(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? dC(i, (f) => f.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      cC(i, (f) => f.test(s))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(l) : l, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const c = t.slice(s.length);
    return { value: d, rest: c };
  };
}
function cC(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function dC(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function uC(e) {
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
const fC = /^(\d+)(th|st|nd|rd)?/i, mC = /\d+/i, hC = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, pC = {
  any: [/^b/i, /^(a|c)/i]
}, gC = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, vC = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, bC = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, wC = {
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
}, yC = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, xC = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, SC = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, CC = {
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
}, kC = {
  ordinalNumber: uC({
    matchPattern: fC,
    parsePattern: mC,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: An({
    matchPatterns: hC,
    defaultMatchWidth: "wide",
    parsePatterns: pC,
    defaultParseWidth: "any"
  }),
  quarter: An({
    matchPatterns: gC,
    defaultMatchWidth: "wide",
    parsePatterns: vC,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: An({
    matchPatterns: bC,
    defaultMatchWidth: "wide",
    parsePatterns: wC,
    defaultParseWidth: "any"
  }),
  day: An({
    matchPatterns: yC,
    defaultMatchWidth: "wide",
    parsePatterns: xC,
    defaultParseWidth: "any"
  }),
  dayPeriod: An({
    matchPatterns: SC,
    defaultMatchWidth: "any",
    parsePatterns: CC,
    defaultParseWidth: "any"
  })
}, Hi = {
  code: "en-US",
  formatDistance: KS,
  formatLong: QS,
  formatRelative: eC,
  localize: lC,
  match: kC,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function EC(e, t) {
  const n = ve(e, t == null ? void 0 : t.in);
  return Hf(n, Yf(n)) + 1;
}
function Uf(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = +jn(n) - +OS(n);
  return Math.round(r / $f) + 1;
}
function jf(e, t) {
  var c, f, h, p;
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = lr(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((f = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : f.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((p = (h = o.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = Pe((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = pn(s, t), l = Pe((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0);
  const d = pn(l, t);
  return +n >= +i ? r + 1 : +n >= +d ? r : r - 1;
}
function RC(e, t) {
  var i, l, d, c;
  const n = lr(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((c = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : c.firstWeekContainsDate) ?? 1, o = jf(e, t), a = Pe((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), pn(a, t);
}
function Kf(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = +pn(n, t) - +RC(n, t);
  return Math.round(r / $f) + 1;
}
function ge(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Rt = {
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
}, an = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Us = {
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
    return Rt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = jf(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return ge(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : ge(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Bf(e);
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
        return Rt.M(e, t);
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
    const o = Kf(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ge(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Uf(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ge(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Rt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = EC(e);
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
    switch (r === 12 ? o = an.noon : r === 0 ? o = an.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = an.evening : r >= 12 ? o = an.afternoon : r >= 4 ? o = an.morning : o = an.night, t) {
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
    return Rt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Rt.H(e, t);
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
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Rt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Rt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Rt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ks(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Ht(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ht(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Ks(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Ht(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ht(r, ":");
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
        return "GMT" + js(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Ht(r, ":");
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
        return "GMT" + js(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Ht(r, ":");
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
function js(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + ge(a, 2);
}
function Ks(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ge(Math.abs(e) / 60, 2) : Ht(e, t);
}
function Ht(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ge(Math.trunc(r / 60), 2), a = ge(r % 60, 2);
  return n + o + t + a;
}
const qs = (e, t) => {
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
}, qf = (e, t) => {
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
}, MC = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return qs(e, t);
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
  return a.replace("{{date}}", qs(r, t)).replace("{{time}}", qf(o, t));
}, NC = {
  p: qf,
  P: MC
}, DC = /^D+$/, PC = /^Y+$/, TC = ["D", "DD", "YY", "YYYY"];
function _C(e) {
  return DC.test(e);
}
function OC(e) {
  return PC.test(e);
}
function AC(e, t, n) {
  const r = IC(e, t, n);
  if (console.warn(r), TC.includes(e)) throw new RangeError(r);
}
function IC(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const LC = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, zC = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, $C = /^'([^]*?)'?$/, FC = /''/g, WC = /[a-zA-Z]/;
function BC(e, t, n) {
  var c, f, h, p, v, g, b, w;
  const r = lr(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Hi, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((f = (c = n == null ? void 0 : n.locale) == null ? void 0 : c.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((w = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : w.weekStartsOn) ?? 0, i = ve(e, n == null ? void 0 : n.in);
  if (!FS(i))
    throw new RangeError("Invalid time value");
  let l = t.match(zC).map((x) => {
    const y = x[0];
    if (y === "p" || y === "P") {
      const S = NC[y];
      return S(x, o.formatLong);
    }
    return x;
  }).join("").match(LC).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const y = x[0];
    if (y === "'")
      return { isToken: !1, value: HC(x) };
    if (Us[y])
      return { isToken: !0, value: x };
    if (y.match(WC))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + y + "`"
      );
    return { isToken: !1, value: x };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(i, l));
  const d = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return l.map((x) => {
    if (!x.isToken) return x.value;
    const y = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && OC(y) || !(n != null && n.useAdditionalDayOfYearTokens) && _C(y)) && AC(y, t, String(e));
    const S = Us[y[0]];
    return S(i, y, o.localize, d);
  }).join("");
}
function HC(e) {
  const t = e.match($C);
  return t ? t[1].replace(FC, "'") : e;
}
function VC(e, t) {
  const n = ve(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = Pe(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function YC(e, t) {
  return ve(e, t == null ? void 0 : t.in).getMonth();
}
function GC(e, t) {
  return ve(e, t == null ? void 0 : t.in).getFullYear();
}
function UC(e, t) {
  return +ve(e) > +ve(t);
}
function jC(e, t) {
  return +ve(e) < +ve(t);
}
function KC(e, t, n) {
  const [r, o] = Mn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function qC(e, t, n) {
  const [r, o] = Mn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function XC(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = Pe(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = VC(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function ZC(e, t, n) {
  const r = ve(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? Pe(e, NaN) : (r.setFullYear(t), r);
}
const Xs = 5, QC = 4;
function JC(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Xs * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Xs : QC;
}
function Xf(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function ek(e, t) {
  const n = Xf(e, t), r = JC(e, t);
  return t.addDays(n, r * 7 - 1);
}
class xt {
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
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Ff(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Wf(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : AS(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : IS(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Hf(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : WS(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : VS(r);
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : ek(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : US(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : BS(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : Gf(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : GS(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : BC(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : Uf(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : YC(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : GC(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Kf(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : UC(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : jC(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Vf(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : $S(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : KC(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : qC(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : LS(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : zS(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : XC(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : ZC(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Xf(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : Kn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : jn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : YS(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : pn(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Yf(r);
    }, this.options = { locale: Hi, ...t }, this.overrides = n;
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
const dt = new xt();
class Zf {
  constructor(t, n, r = dt) {
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
class tk {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class nk {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function gt(e, t, n = !1, r = dt) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Qf(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Vi(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Jf(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function em(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function tm(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function nm(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function vt(e, t, n = dt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (nm(i, n))
      return i.includes(e);
    if (Vi(i))
      return gt(i, e, !1, n);
    if (tm(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Qf(i)) {
      const l = a(i.before, e), d = a(i.after, e), c = l > 0, f = d < 0;
      return s(i.before, i.after) ? f && c : c || f;
    }
    return Jf(i) ? a(e, i.after) > 0 : em(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function rk(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: l, broadcastCalendar: d, today: c } = t, { isSameDay: f, isSameMonth: h, startOfMonth: p, isBefore: v, endOfMonth: g, isAfter: b } = o, w = n && p(n), x = r && g(r), y = {
    [we.focused]: [],
    [we.outside]: [],
    [we.disabled]: [],
    [we.hidden]: [],
    [we.today]: []
  }, S = {};
  for (const C of e) {
    const { date: R, displayMonth: k } = C, E = !!(k && !h(R, k)), M = !!(w && v(R, w)), T = !!(x && b(R, x)), _ = !!(a && vt(R, a, o)), L = !!(s && vt(R, s, o)) || M || T || // Broadcast calendar will show outside days as default
    !d && !l && E || d && l === !1 && E, A = f(R, c ?? o.today());
    E && y.outside.push(C), _ && y.disabled.push(C), L && y.hidden.push(C), A && y.today.push(C), i && Object.keys(i).forEach((Y) => {
      const j = i == null ? void 0 : i[Y];
      j && vt(R, j, o) && (S[Y] ? S[Y].push(C) : S[Y] = [C]);
    });
  }
  return (C) => {
    const R = {
      [we.focused]: !1,
      [we.disabled]: !1,
      [we.hidden]: !1,
      [we.outside]: !1,
      [we.today]: !1
    }, k = {};
    for (const E in y) {
      const M = y[E];
      R[E] = M.some((T) => T === C);
    }
    for (const E in S)
      k[E] = S[E].some((M) => M === C);
    return {
      ...R,
      // custom modifiers should override all the previous ones
      ...k
    };
  };
}
function ok(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[we[a]] ? o.push(t[we[a]]) : t[qe[a]] && o.push(t[qe[a]]), o), [t[ee.Day]]);
}
function ak(e) {
  return N.createElement("button", { ...e });
}
function ik(e) {
  return N.createElement("span", { ...e });
}
function sk(e) {
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
function lk(e) {
  const { day: t, modifiers: n, ...r } = e;
  return N.createElement("td", { ...r });
}
function ck(e) {
  const { day: t, modifiers: n, ...r } = e, o = N.useRef(null);
  return N.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), N.createElement("button", { ref: o, ...r });
}
function dk(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[ee.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: l }) => l === a.value);
  return N.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[ee.DropdownRoot] },
    N.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: l, label: d, disabled: c }) => N.createElement(r.Option, { key: l, value: l, disabled: c }, d))),
    N.createElement(
      "span",
      { className: o[ee.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      N.createElement(r.Chevron, { orientation: "down", size: 18, className: o[ee.Chevron] })
    )
  );
}
function uk(e) {
  return N.createElement("div", { ...e });
}
function fk(e) {
  return N.createElement("div", { ...e });
}
function mk(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return N.createElement("div", { ...r }, e.children);
}
function hk(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return N.createElement("div", { ...r });
}
function pk(e) {
  return N.createElement("table", { ...e });
}
function gk(e) {
  return N.createElement("div", { ...e });
}
const rm = il(void 0);
function cr() {
  const e = sl(rm);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function vk(e) {
  const { components: t } = cr();
  return N.createElement(t.Dropdown, { ...e });
}
function bk(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: l, labelNext: d } } = cr(), c = Ae((h) => {
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
      { type: "button", className: i[ee.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": d(o), onClick: c },
      N.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[ee.Chevron] })
    )
  );
}
function wk(e) {
  const { components: t } = cr();
  return N.createElement(t.Button, { ...e });
}
function yk(e) {
  return N.createElement("option", { ...e });
}
function xk(e) {
  const { components: t } = cr();
  return N.createElement(t.Button, { ...e });
}
function Sk(e) {
  const { rootRef: t, ...n } = e;
  return N.createElement("div", { ...n, ref: t });
}
function Ck(e) {
  return N.createElement("select", { ...e });
}
function kk(e) {
  const { week: t, ...n } = e;
  return N.createElement("tr", { ...n });
}
function Ek(e) {
  return N.createElement("th", { ...e });
}
function Rk(e) {
  return N.createElement(
    "thead",
    { "aria-hidden": !0 },
    N.createElement("tr", { ...e })
  );
}
function Mk(e) {
  const { week: t, ...n } = e;
  return N.createElement("th", { ...n });
}
function Nk(e) {
  return N.createElement("th", { ...e });
}
function Dk(e) {
  return N.createElement("tbody", { ...e });
}
function Pk(e) {
  const { components: t } = cr();
  return N.createElement(t.Dropdown, { ...e });
}
const Tk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: ak,
  CaptionLabel: ik,
  Chevron: sk,
  Day: lk,
  DayButton: ck,
  Dropdown: dk,
  DropdownNav: uk,
  Footer: fk,
  Month: mk,
  MonthCaption: hk,
  MonthGrid: pk,
  Months: gk,
  MonthsDropdown: vk,
  Nav: bk,
  NextMonthButton: wk,
  Option: yk,
  PreviousMonthButton: xk,
  Root: Sk,
  Select: Ck,
  Week: kk,
  WeekNumber: Mk,
  WeekNumberHeader: Nk,
  Weekday: Ek,
  Weekdays: Rk,
  Weeks: Dk,
  YearsDropdown: Pk
}, Symbol.toStringTag, { value: "Module" }));
function _k(e) {
  return {
    ...Tk,
    ...e
  };
}
function Ok(e) {
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
function Yi() {
  const e = {};
  for (const t in ee)
    e[ee[t]] = `rdp-${ee[t]}`;
  for (const t in we)
    e[we[t]] = `rdp-${we[t]}`;
  for (const t in qe)
    e[qe[t]] = `rdp-${qe[t]}`;
  for (const t in $e)
    e[$e[t]] = `rdp-${$e[t]}`;
  return e;
}
function om(e, t, n) {
  return (n ?? new xt(t)).format(e, "LLLL y");
}
const Ak = om;
function Ik(e, t, n) {
  return (n ?? new xt(t)).format(e, "d");
}
function Lk(e, t = dt) {
  return t.format(e, "LLLL");
}
function zk(e, t = dt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function $k() {
  return "";
}
function Fk(e, t, n) {
  return (n ?? new xt(t)).format(e, "cccccc");
}
function am(e, t = dt) {
  return t.format(e, "yyyy");
}
const Wk = am, Bk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: om,
  formatDay: Ik,
  formatMonthCaption: Ak,
  formatMonthDropdown: Lk,
  formatWeekNumber: zk,
  formatWeekNumberHeader: $k,
  formatWeekdayName: Fk,
  formatYearCaption: Wk,
  formatYearDropdown: am
}, Symbol.toStringTag, { value: "Module" }));
function Hk(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Bk,
    ...e
  };
}
function Vk(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: l, getMonth: d } = o;
  return l({
    start: s(e),
    end: i(e)
  }).map((h) => {
    const p = r.formatMonthDropdown(h, o), v = d(h), g = t && h < a(t) || n && h > a(n) || !1;
    return { value: v, label: p, disabled: g };
  });
}
function Yk(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[ee.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function Gk(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function Uk(e, t, n, r) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, addYears: s, getYear: i, isBefore: l, isSameYear: d } = r, c = o(e), f = a(t), h = [];
  let p = c;
  for (; l(p, f) || d(p, f); )
    h.push(p), p = s(p, 1);
  return h.map((v) => {
    const g = n.formatYearDropdown(v, r);
    return {
      value: i(v),
      label: g,
      disabled: !1
    };
  });
}
function im(e, t, n) {
  return (n ?? new xt(t)).format(e, "LLLL y");
}
const jk = im;
function Kk(e, t, n, r) {
  let o = (r ?? new xt(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function sm(e, t, n, r) {
  let o = (r ?? new xt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const qk = sm;
function Xk() {
  return "";
}
function Zk(e) {
  return "Choose the Month";
}
function Qk(e) {
  return "Go to the Next Month";
}
function Jk(e) {
  return "Go to the Previous Month";
}
function eE(e, t, n) {
  return (n ?? new xt(t)).format(e, "cccc");
}
function tE(e, t) {
  return `Week ${e}`;
}
function nE(e) {
  return "Week Number";
}
function rE(e) {
  return "Choose the Year";
}
const oE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: jk,
  labelDay: qk,
  labelDayButton: sm,
  labelGrid: im,
  labelGridcell: Kk,
  labelMonthDropdown: Zk,
  labelNav: Xk,
  labelNext: Qk,
  labelPrevious: Jk,
  labelWeekNumber: tE,
  labelWeekNumberHeader: nE,
  labelWeekday: eE,
  labelYearDropdown: rE
}, Symbol.toStringTag, { value: "Module" })), dr = (e) => e instanceof HTMLElement ? e : null, da = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], aE = (e) => dr(e.querySelector("[data-animated-month]")), ua = (e) => dr(e.querySelector("[data-animated-caption]")), fa = (e) => dr(e.querySelector("[data-animated-weeks]")), iE = (e) => dr(e.querySelector("[data-animated-nav]")), sE = (e) => dr(e.querySelector("[data-animated-weekdays]"));
function lE(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = ht(null), i = ht(r), l = ht(!1);
  Qa(() => {
    const d = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const c = a.isSameMonth(r[0].date, d[0].date), f = a.isAfter(r[0].date, d[0].date), h = f ? n[$e.caption_after_enter] : n[$e.caption_before_enter], p = f ? n[$e.weeks_after_enter] : n[$e.weeks_before_enter], v = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (da(g).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const S = aE(y);
      S && y.contains(S) && y.removeChild(S);
      const C = ua(y);
      C && C.classList.remove(h);
      const R = fa(y);
      R && R.classList.remove(p);
    }), s.current = g) : s.current = null, l.current || c || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = v instanceof HTMLElement ? da(v) : [], w = da(e.current);
    if (w && w.every((x) => x instanceof HTMLElement) && b && b.every((x) => x instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const x = iE(e.current);
      x && (x.style.zIndex = "1"), w.forEach((y, S) => {
        const C = b[S];
        if (!C)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const R = ua(y);
        R && R.classList.add(h);
        const k = fa(y);
        k && k.classList.add(p);
        const E = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), R && R.classList.remove(h), k && k.classList.remove(p), y.style.position = "", y.style.overflow = "", y.contains(C) && y.removeChild(C);
        };
        C.style.pointerEvents = "none", C.style.position = "absolute", C.style.overflow = "hidden", C.setAttribute("aria-hidden", "true");
        const M = sE(C);
        M && (M.style.opacity = "0");
        const T = ua(C);
        T && (T.classList.add(f ? n[$e.caption_before_exit] : n[$e.caption_after_exit]), T.addEventListener("animationend", E));
        const _ = fa(C);
        _ && _.classList.add(f ? n[$e.weeks_before_exit] : n[$e.weeks_after_exit]), y.insertBefore(C, y.firstChild);
      });
    }
  });
}
function cE(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: c, differenceInCalendarMonths: f, endOfBroadcastWeek: h, endOfISOWeek: p, endOfMonth: v, endOfWeek: g, isAfter: b, startOfBroadcastWeek: w, startOfISOWeek: x, startOfWeek: y } = r, S = l ? w(o, r) : s ? x(o) : y(o), C = l ? h(a) : s ? p(v(a)) : g(v(a)), R = c(C, S), k = f(a, o) + 1, E = [];
  for (let _ = 0; _ <= R; _++) {
    const L = d(S, _);
    if (t && b(L, t))
      break;
    E.push(L);
  }
  const T = (l ? 35 : 42) * k;
  if (i && E.length < T) {
    const _ = T - E.length;
    for (let L = 0; L < _; L++) {
      const A = d(E[E.length - 1], 1);
      E.push(A);
    }
  }
  return E;
}
function dE(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => [...a, ...s.days], t);
    return [...n, ...o];
  }, t);
}
function uE(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Zs(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || a || s;
  const { differenceInCalendarMonths: d, addMonths: c, startOfMonth: f } = r;
  if (n && d(n, l) < i - 1) {
    const h = -1 * (i - 1);
    l = c(n, h);
  }
  return t && d(l, t) < 0 && (l = t), f(l);
}
function fE(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: l, getISOWeek: d, getWeek: c, startOfBroadcastWeek: f, startOfISOWeek: h, startOfWeek: p } = r, v = e.reduce((g, b) => {
    const w = n.broadcastCalendar ? f(b, r) : n.ISOWeek ? h(b) : p(b), x = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : l(i(b)), y = t.filter((k) => k >= w && k <= x), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < S) {
      const k = t.filter((E) => {
        const M = S - y.length;
        return E > x && E <= o(x, M);
      });
      y.push(...k);
    }
    const C = y.reduce((k, E) => {
      const M = n.ISOWeek ? d(E) : c(E), T = k.find((L) => L.weekNumber === M), _ = new Zf(E, b, r);
      return T ? T.days.push(_) : k.push(new nk(M, [_])), k;
    }, []), R = new tk(b, C);
    return g.push(R), g;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function mE(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: l, endOfYear: d, newDate: c, today: f } = t, { fromYear: h, toYear: p, fromMonth: v, toMonth: g } = e;
  !n && v && (n = v), !n && h && (n = t.newDate(h, 0, 1)), !r && g && (r = g), !r && p && (r = c(p, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : h ? n = c(h, 0, 1) : !n && b && (n = o(l(e.today ?? f(), -100))), r ? r = i(r) : p ? r = c(p, 11, 31) : !r && b && (r = d(e.today ?? f())), [
    n && a(n),
    r && a(r)
  ];
}
function hE(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, d = o ? a : 1, c = s(e);
  if (!t)
    return i(c, d);
  if (!(l(t, e) < a))
    return i(c, d);
}
function pE(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, d = o ? a ?? 1 : 1, c = s(e);
  if (!t)
    return i(c, -d);
  if (!(l(c, t) <= 0))
    return i(c, -d);
}
function gE(e) {
  const t = [];
  return e.reduce((n, r) => [...n, ...r.weeks], t);
}
function Do(e, t) {
  const [n, r] = Yt(e);
  return [t === void 0 ? n : t, r];
}
function vE(e, t) {
  const [n, r] = mE(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Zs(e, n, r, t), [i, l] = Do(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  qn(() => {
    const R = Zs(e, n, r, t);
    l(R);
  }, [e.timeZone]);
  const d = uE(i, r, e, t), c = cE(d, e.endMonth ? a(e.endMonth) : void 0, e, t), f = fE(d, c, e, t), h = gE(f), p = dE(f), v = pE(i, n, e, t), g = hE(i, r, e, t), { disableNavigation: b, onMonthChange: w } = e, x = (R) => h.some((k) => k.days.some((E) => E.isEqualTo(R))), y = (R) => {
    if (b)
      return;
    let k = o(R);
    n && k < o(n) && (k = o(n)), r && k > o(r) && (k = o(r)), l(k), w == null || w(k);
  };
  return {
    months: f,
    weeks: h,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: v,
    nextMonth: g,
    goToMonth: y,
    goToDay: (R) => {
      x(R) || y(R.date);
    }
  };
}
var nt;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(nt || (nt = {}));
function Qs(e) {
  return !e[we.disabled] && !e[we.hidden] && !e[we.outside];
}
function bE(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Qs(i) && (i[we.focused] && a < nt.FocusedModifier ? (o = s, a = nt.FocusedModifier) : r != null && r.isEqualTo(s) && a < nt.LastFocused ? (o = s, a = nt.LastFocused) : n(s.date) && a < nt.Selected ? (o = s, a = nt.Selected) : i[we.today] && a < nt.Today && (o = s, a = nt.Today));
  }
  return o || (o = e.find((s) => Qs(t(s)))), o;
}
function wE(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: l } = a, { addDays: d, addMonths: c, addWeeks: f, addYears: h, endOfBroadcastWeek: p, endOfISOWeek: v, endOfWeek: g, max: b, min: w, startOfBroadcastWeek: x, startOfISOWeek: y, startOfWeek: S } = s;
  let R = {
    day: d,
    week: f,
    month: c,
    year: h,
    startOfWeek: (k) => l ? x(k, s) : i ? y(k) : S(k),
    endOfWeek: (k) => l ? p(k) : i ? v(k) : g(k)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? R = b([r, R]) : t === "after" && o && (R = w([o, R])), R;
}
function lm(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const l = wE(e, t, n.date, r, o, a, s), d = !!(a.disabled && vt(l, a.disabled, s)), c = !!(a.hidden && vt(l, a.hidden, s)), f = l, h = new Zf(l, f, s);
  return !d && !c ? h : lm(e, t, h, r, o, a, s, i + 1);
}
function yE(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = Yt(), l = bE(t.days, n, r || (() => !1), s), [d, c] = Yt(a ? l : void 0);
  return {
    isFocusTarget: (g) => !!(l != null && l.isEqualTo(g)),
    setFocused: c,
    focused: d,
    blur: () => {
      i(d), c(void 0);
    },
    moveFocus: (g, b) => {
      if (!d)
        return;
      const w = lm(g, b, d, t.navStart, t.navEnd, e, o);
      w && (t.goToDay(w), c(w));
    }
  };
}
function xE(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Do(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t, d = (p) => (i == null ? void 0 : i.some((v) => l(v, p))) ?? !1, { min: c, max: f } = e;
  return {
    selected: i,
    select: (p, v, g) => {
      let b = [...i ?? []];
      if (d(p)) {
        if ((i == null ? void 0 : i.length) === c || r && (i == null ? void 0 : i.length) === 1)
          return;
        b = i == null ? void 0 : i.filter((w) => !l(w, p));
      } else
        (i == null ? void 0 : i.length) === f ? b = [p] : b = [...b, p];
      return o || s(b), o == null || o(b, p, v, g), b;
    },
    isSelected: d
  };
}
function SE(e, t, n = 0, r = 0, o = !1, a = dt) {
  const { from: s, to: i } = t || {}, { isSameDay: l, isAfter: d, isBefore: c } = a;
  let f;
  if (!s && !i)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    l(s, e) ? o ? f = { from: s, to: void 0 } : f = void 0 : c(e, s) ? f = { from: e, to: s } : f = { from: s, to: e };
  else if (s && i)
    if (l(s, e) && l(i, e))
      o ? f = { from: s, to: i } : f = void 0;
    else if (l(s, e))
      f = { from: s, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (c(e, s))
      f = { from: e, to: i };
    else if (d(e, s))
      f = { from: s, to: e };
    else if (d(e, i))
      f = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (f != null && f.from && (f != null && f.to)) {
    const h = a.differenceInCalendarDays(f.to, f.from);
    r > 0 && h > r ? f = { from: e, to: void 0 } : n > 1 && h < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function CE(e, t, n = dt) {
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
function Js(e, t, n = dt) {
  return gt(e, t.from, !1, n) || gt(e, t.to, !1, n) || gt(t, e.from, !1, n) || gt(t, e.to, !1, n);
}
function kE(e, t, n = dt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? gt(e, i, !1, n) : nm(i, n) ? i.some((l) => gt(e, l, !1, n)) : Vi(i) ? i.from && i.to ? Js(e, { from: i.from, to: i.to }, n) : !1 : tm(i) ? CE(e, i.dayOfWeek, n) : Qf(i) ? n.isAfter(i.before, i.after) ? Js(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : vt(e.from, i, n) || vt(e.to, i, n) : Jf(i) || em(i) ? vt(e.from, i, n) || vt(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= l; d++) {
      if (s.some((c) => c(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function EE(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, l] = Do(o, s ? o : void 0), d = s ? o : i;
  return {
    selected: d,
    select: (h, p, v) => {
      const { min: g, max: b } = e, w = h ? SE(h, d, g, b, a, t) : void 0;
      return r && n && (w != null && w.from) && w.to && kE({ from: w.from, to: w.to }, n, t) && (w.from = h, w.to = void 0), s || l(w), s == null || s(w, h, p, v), w;
    },
    isSelected: (h) => d && gt(d, h, !1, t)
  };
}
function RE(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Do(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t;
  return {
    selected: i,
    select: (f, h, p) => {
      let v = f;
      return !r && i && i && l(f, i) && (v = void 0), o || s(v), o == null || o(v, f, h, p), v;
    },
    isSelected: (f) => i ? l(i, f) : !1
  };
}
function ME(e, t) {
  const n = RE(e, t), r = xE(e, t), o = EE(e, t);
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
function NE(e) {
  var br;
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ie(t.today, t.timeZone)), t.month && (t.month = new Ie(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ie(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ie(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ie(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ie(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = (br = t.selected) == null ? void 0 : br.map((V) => new Ie(V, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ie(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ie(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = Vt(() => {
    const V = { ...Hi, ...t.locale };
    return {
      dateLib: new xt({
        locale: V,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: _k(t.components),
      formatters: Hk(t.formatters),
      labels: { ...oE, ...t.labels },
      locale: V,
      classNames: { ...Yi(), ...t.classNames }
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
  ]), { captionLayout: l, mode: d, navLayout: c, numberOfMonths: f = 1, onDayBlur: h, onDayClick: p, onDayFocus: v, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: x, onPrevClick: y, showWeekNumber: S, styles: C } = t, { formatCaption: R, formatDay: k, formatMonthDropdown: E, formatWeekNumber: M, formatWeekNumberHeader: T, formatWeekdayName: _, formatYearDropdown: L } = r, A = vE(t, a), { days: Y, months: j, navStart: F, navEnd: U, previousMonth: D, nextMonth: O, goToMonth: Z } = A, se = rk(Y, t, F, U, a), { isSelected: P, select: B, selected: W } = ME(t, a) ?? {}, { blur: G, focused: oe, isFocusTarget: z, moveFocus: te, setFocused: J } = yE(t, A, se, P ?? (() => !1), a), { labelDayButton: ie, labelGridcell: ce, labelGrid: me, labelMonthDropdown: Te, labelNav: ne, labelPrevious: Je, labelNext: et, labelWeekday: je, labelWeekNumber: Nn, labelWeekNumberHeader: St, labelYearDropdown: Ct } = o, fr = Vt(() => Gk(a, t.ISOWeek), [a, t.ISOWeek]), mr = d !== void 0 || p !== void 0, ut = Ae(() => {
    D && (Z(D), y == null || y(D));
  }, [D, Z, y]), Dn = Ae(() => {
    O && (Z(O), x == null || x(O));
  }, [Z, O, x]), hr = Ae((V, re) => (Q) => {
    Q.preventDefault(), Q.stopPropagation(), J(V), B == null || B(V.date, re, Q), p == null || p(V.date, re, Q);
  }, [B, p, J]), Ao = Ae((V, re) => (Q) => {
    J(V), v == null || v(V.date, re, Q);
  }, [v, J]), Io = Ae((V, re) => (Q) => {
    G(), h == null || h(V.date, re, Q);
  }, [G, h]), Qt = Ae((V, re) => (Q) => {
    const de = {
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
    if (de[Q.key]) {
      Q.preventDefault(), Q.stopPropagation();
      const [he, Ee] = de[Q.key];
      te(he, Ee);
    }
    g == null || g(V.date, re, Q);
  }, [te, g, t.dir]), Lo = Ae((V, re) => (Q) => {
    b == null || b(V.date, re, Q);
  }, [b]), pr = Ae((V, re) => (Q) => {
    w == null || w(V.date, re, Q);
  }, [w]), zo = Ae((V) => (re) => {
    const Q = Number(re.target.value), de = a.setMonth(a.startOfMonth(V), Q);
    Z(de);
  }, [a, Z]), Ft = Ae((V) => (re) => {
    const Q = Number(re.target.value), de = a.setYear(a.startOfMonth(V), Q);
    Z(de);
  }, [a, Z]), { className: gr, style: $o } = Vt(() => ({
    className: [i[ee.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[ee.Root], ...t.style }
  }), [i, t.className, t.style, C]), Fo = Ok(t), vr = ht(null);
  lE(vr, !!t.animate, {
    classNames: i,
    months: j,
    focused: oe,
    dateLib: a
  });
  const Wo = {
    dayPickerProps: t,
    selected: W,
    select: B,
    isSelected: P,
    months: j,
    nextMonth: O,
    previousMonth: D,
    goToMonth: Z,
    getModifiers: se,
    components: n,
    classNames: i,
    styles: C,
    labels: o,
    formatters: r
  };
  return N.createElement(
    rm.Provider,
    { value: Wo },
    N.createElement(
      n.Root,
      { rootRef: t.animate ? vr : void 0, className: gr, style: $o, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], ...Fo },
      N.createElement(
        n.Months,
        { className: i[ee.Months], style: C == null ? void 0 : C[ee.Months] },
        !t.hideNavigation && !c && N.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ee.Nav], style: C == null ? void 0 : C[ee.Nav], "aria-label": ne(), onPreviousClick: ut, onNextClick: Dn, previousMonth: D, nextMonth: O }),
        j.map((V, re) => {
          const Q = Vk(V.date, F, U, r, a), de = Uk(F, U, r, a);
          return N.createElement(
            n.Month,
            { "data-animated-month": t.animate ? "true" : void 0, className: i[ee.Month], style: C == null ? void 0 : C[ee.Month], key: re, displayIndex: re, calendarMonth: V },
            c === "around" && !t.hideNavigation && re === 0 && N.createElement(
              n.PreviousMonthButton,
              { type: "button", className: i[ee.PreviousMonthButton], tabIndex: D ? void 0 : -1, "aria-disabled": D ? void 0 : !0, "aria-label": Je(D), onClick: ut, "data-animated-button": t.animate ? "true" : void 0 },
              N.createElement(n.Chevron, { disabled: D ? void 0 : !0, className: i[ee.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            N.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[ee.MonthCaption], style: C == null ? void 0 : C[ee.MonthCaption], calendarMonth: V, displayIndex: re }, l != null && l.startsWith("dropdown") ? N.createElement(
              n.DropdownNav,
              { className: i[ee.Dropdowns], style: C == null ? void 0 : C[ee.Dropdowns] },
              l === "dropdown" || l === "dropdown-months" ? N.createElement(n.MonthsDropdown, { className: i[ee.MonthsDropdown], "aria-label": Te(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: zo(V.date), options: Q, style: C == null ? void 0 : C[ee.Dropdown], value: a.getMonth(V.date) }) : N.createElement("span", null, E(V.date, a)),
              l === "dropdown" || l === "dropdown-years" ? N.createElement(n.YearsDropdown, { className: i[ee.YearsDropdown], "aria-label": Ct(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Ft(V.date), options: de, style: C == null ? void 0 : C[ee.Dropdown], value: a.getYear(V.date) }) : N.createElement("span", null, L(V.date, a)),
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
              } }, R(V.date, a.options, a))
            ) : N.createElement(n.CaptionLabel, { className: i[ee.CaptionLabel], role: "status", "aria-live": "polite" }, R(V.date, a.options, a))),
            c === "around" && !t.hideNavigation && re === f - 1 && N.createElement(
              n.NextMonthButton,
              { type: "button", className: i[ee.NextMonthButton], tabIndex: O ? void 0 : -1, "aria-disabled": O ? void 0 : !0, "aria-label": et(O), onClick: Dn, "data-animated-button": t.animate ? "true" : void 0 },
              N.createElement(n.Chevron, { disabled: O ? void 0 : !0, className: i[ee.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            re === f - 1 && c === "after" && !t.hideNavigation && N.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[ee.Nav], style: C == null ? void 0 : C[ee.Nav], "aria-label": ne(), onPreviousClick: ut, onNextClick: Dn, previousMonth: D, nextMonth: O }),
            N.createElement(
              n.MonthGrid,
              { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": me(V.date, a.options, a) || void 0, className: i[ee.MonthGrid], style: C == null ? void 0 : C[ee.MonthGrid] },
              !t.hideWeekdays && N.createElement(
                n.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[ee.Weekdays], style: C == null ? void 0 : C[ee.Weekdays] },
                S && N.createElement(n.WeekNumberHeader, { "aria-label": St(a.options), className: i[ee.WeekNumberHeader], style: C == null ? void 0 : C[ee.WeekNumberHeader], scope: "col" }, T()),
                fr.map((he, Ee) => N.createElement(n.Weekday, { "aria-label": je(he, a.options, a), className: i[ee.Weekday], key: Ee, style: C == null ? void 0 : C[ee.Weekday], scope: "col" }, _(he, a.options, a)))
              ),
              N.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[ee.Weeks], style: C == null ? void 0 : C[ee.Weeks] }, V.weeks.map((he, Ee) => N.createElement(
                n.Week,
                { className: i[ee.Week], key: he.weekNumber, style: C == null ? void 0 : C[ee.Week], week: he },
                S && N.createElement(n.WeekNumber, { week: he, style: C == null ? void 0 : C[ee.WeekNumber], "aria-label": Nn(he.weekNumber, {
                  locale: s
                }), className: i[ee.WeekNumber], scope: "row", role: "rowheader" }, M(he.weekNumber, a)),
                he.days.map((pe) => {
                  const { date: Re } = pe, ue = se(pe);
                  if (ue[we.focused] = !ue.hidden && !!(oe != null && oe.isEqualTo(pe)), ue[qe.selected] = (P == null ? void 0 : P(Re)) || ue.selected, Vi(W)) {
                    const { from: kt, to: Jt } = W;
                    ue[qe.range_start] = !!(kt && Jt && a.isSameDay(Re, kt)), ue[qe.range_end] = !!(kt && Jt && a.isSameDay(Re, Jt)), ue[qe.range_middle] = gt(W, Re, !0, a);
                  }
                  const ft = Yk(ue, C, t.modifiersStyles), tt = ok(ue, i, t.modifiersClassNames), He = !mr && !ue.hidden ? ce(Re, ue, a.options, a) : void 0;
                  return N.createElement(n.Day, { key: `${a.format(Re, "yyyy-MM-dd")}_${a.format(pe.displayMonth, "yyyy-MM")}`, day: pe, modifiers: ue, className: tt.join(" "), style: ft, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": He, "data-day": a.format(Re, "yyyy-MM-dd"), "data-month": pe.outside ? a.format(Re, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": pe.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && mr ? N.createElement(n.DayButton, { className: i[ee.DayButton], style: C == null ? void 0 : C[ee.DayButton], type: "button", day: pe, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: z(pe) ? 0 : -1, "aria-label": ie(Re, ue, a.options, a), onClick: hr(pe, ue), onBlur: Io(pe, ue), onFocus: Ao(pe, ue), onKeyDown: Qt(pe, ue), onMouseEnter: Lo(pe, ue), onMouseLeave: pr(pe, ue) }, k(Re, a.options, a)) : !ue.hidden && k(pe.date, a.options, a));
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
function el({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const l = Yi();
  return /* @__PURE__ */ u(
    NE,
    {
      showOutsideDays: n,
      className: $(
        "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (d) => d.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: $("w-fit", l.root),
        months: $(
          "relative flex flex-col gap-4 md:flex-row",
          l.months
        ),
        month: $("flex w-full flex-col gap-4", l.month),
        nav: $(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          l.nav
        ),
        button_previous: $(
          Va({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          l.button_previous
        ),
        button_next: $(
          Va({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          l.button_next
        ),
        month_caption: $(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: $(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          l.dropdowns
        ),
        dropdown_root: $(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
          l.dropdown_root
        ),
        dropdown: $(
          "absolute inset-0 bg-popover opacity-0",
          l.dropdown
        ),
        caption_label: $(
          "font-medium select-none",
          r === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: $("flex", l.weekdays),
        weekday: $(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          l.weekday
        ),
        week: $("mt-2 flex w-full", l.week),
        week_number_header: $(
          "w-(--cell-size) select-none",
          l.week_number_header
        ),
        week_number: $(
          "text-[0.8rem] text-muted-foreground select-none",
          l.week_number
        ),
        day: $(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          i.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          l.day
        ),
        range_start: $(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: $("rounded-none", l.range_middle),
        range_end: $("rounded-r-md bg-accent", l.range_end),
        today: $(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          l.today
        ),
        outside: $(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: $(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: $("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: d, rootRef: c, ...f }) => /* @__PURE__ */ u(
          "div",
          {
            "data-slot": "calendar",
            ref: c,
            className: $(d),
            ...f
          }
        ),
        Chevron: ({ className: d, orientation: c, ...f }) => c === "left" ? /* @__PURE__ */ u(mf, { className: $("size-4", d), ...f }) : c === "right" ? /* @__PURE__ */ u(
          $i,
          {
            className: $("size-4", d),
            ...f
          }
        ) : /* @__PURE__ */ u(zi, { className: $("size-4", d), ...f }),
        DayButton: DE,
        WeekNumber: ({ children: d, ...c }) => /* @__PURE__ */ u("td", { ...c, children: /* @__PURE__ */ u("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: d }) }),
        ...s
      },
      ...i
    }
  );
}
function DE({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Yi(), a = m.useRef(null);
  return m.useEffect(() => {
    var s;
    n.focused && ((s = a.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ u(
    _f,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: $(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
function Po({
  ...e
}) {
  return /* @__PURE__ */ u(yb, { "data-slot": "popover", ...e });
}
function To({
  ...e
}) {
  return /* @__PURE__ */ u(xb, { "data-slot": "popover-trigger", ...e });
}
function _o({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ u(Sb, { children: /* @__PURE__ */ u(
    Cb,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: $(
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function _r(e, t = {}) {
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
function In(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function ma(e) {
  if (!e) return;
  const t = typeof e == "string" ? Number(e) : e, n = new Date(t);
  return Number.isNaN(n.getTime()) ? void 0 : n;
}
function tl(e) {
  return e == null ? [] : Array.isArray(e) ? e.map((t) => {
    if (typeof t == "number" || typeof t == "string")
      return t;
  }) : typeof e == "string" || typeof e == "number" ? [e] : [];
}
function PE({
  column: e,
  title: t,
  multiple: n
}) {
  const r = e.getFilterValue(), o = m.useMemo(() => {
    if (!r)
      return n ? { from: void 0, to: void 0 } : [];
    if (n) {
      const h = tl(r);
      return {
        from: ma(h[0]),
        to: ma(h[1])
      };
    }
    const c = tl(r), f = ma(c[0]);
    return f ? [f] : [];
  }, [r, n]), a = m.useCallback(
    (c) => {
      var f, h;
      if (!c) {
        e.setFilterValue(void 0);
        return;
      }
      if (n && !("getTime" in c)) {
        const p = (f = c.from) == null ? void 0 : f.getTime(), v = (h = c.to) == null ? void 0 : h.getTime();
        e.setFilterValue(p || v ? [p, v] : void 0);
      } else !n && "getTime" in c && e.setFilterValue(c.getTime());
    },
    [e, n]
  ), s = m.useCallback(
    (c) => {
      c.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  ), i = m.useMemo(() => n ? In(o) ? o.from || o.to : !1 : Array.isArray(o) ? o.length > 0 : !1, [n, o]), l = m.useCallback((c) => !c.from && !c.to ? "" : c.from && c.to ? `${_r(c.from)} - ${_r(c.to)}` : _r(c.from ?? c.to), []), d = m.useMemo(() => {
    if (n) {
      if (!In(o)) return null;
      const h = o.from || o.to, p = h ? l(o) : "Select date range";
      return /* @__PURE__ */ I("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ u("span", { children: t }),
        h && /* @__PURE__ */ I(_e, { children: [
          /* @__PURE__ */ u(
            Kr,
            {
              orientation: "vertical",
              className: "mx-0.5 data-[orientation=vertical]:h-4"
            }
          ),
          /* @__PURE__ */ u("span", { children: p })
        ] })
      ] });
    }
    if (In(o)) return null;
    const c = o.length > 0, f = c ? _r(o[0]) : "Select date";
    return /* @__PURE__ */ I("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ u("span", { children: t }),
      c && /* @__PURE__ */ I(_e, { children: [
        /* @__PURE__ */ u(
          Kr,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ u("span", { children: f })
      ] })
    ] });
  }, [o, n, l, t]);
  return /* @__PURE__ */ I(Po, { children: [
    /* @__PURE__ */ u(To, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          i ? /* @__PURE__ */ u(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              onClick: s,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              children: /* @__PURE__ */ u(Fi, {})
            }
          ) : /* @__PURE__ */ u(kx, {}),
          d
        ]
      }
    ) }),
    /* @__PURE__ */ u(_o, { className: "w-auto p-0", align: "start", children: n ? /* @__PURE__ */ u(
      el,
      {
        autoFocus: !0,
        captionLayout: "dropdown",
        mode: "range",
        selected: In(o) ? o : { from: void 0, to: void 0 },
        onSelect: a
      }
    ) : /* @__PURE__ */ u(
      el,
      {
        captionLayout: "dropdown",
        mode: "single",
        selected: In(o) ? void 0 : o[0],
        onSelect: a
      }
    ) })
  ] });
}
var nl = 1, TE = 0.9, _E = 0.8, OE = 0.17, ha = 0.1, pa = 0.999, AE = 0.9999, IE = 0.99, LE = /[\\\/_+.#"@\[\(\{&]/, zE = /[\\\/_+.#"@\[\(\{&]/g, $E = /[\s-]/, cm = /[\s-]/g;
function Ka(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? nl : IE;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var l = r.charAt(a), d = n.indexOf(l, o), c = 0, f, h, p, v; d >= 0; ) f = Ka(e, t, n, r, d + 1, a + 1, s), f > c && (d === o ? f *= nl : LE.test(e.charAt(d - 1)) ? (f *= _E, p = e.slice(o, d - 1).match(zE), p && o > 0 && (f *= Math.pow(pa, p.length))) : $E.test(e.charAt(d - 1)) ? (f *= TE, v = e.slice(o, d - 1).match(cm), v && o > 0 && (f *= Math.pow(pa, v.length))) : (f *= OE, o > 0 && (f *= Math.pow(pa, d - o))), e.charAt(d) !== t.charAt(a) && (f *= AE)), (f < ha && n.charAt(d - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(d - 1) !== r.charAt(a)) && (h = Ka(e, t, n, r, d + 1, a + 2, s), h * ha > f && (f = h * ha)), f > c && (c = f), d = n.indexOf(l, d + 1);
  return s[i] = c, c;
}
function rl(e) {
  return e.toLowerCase().replace(cm, " ");
}
function FE(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Ka(e, t, rl(e), rl(t), 0, 0, {});
}
var Ln = '[cmdk-group=""]', ga = '[cmdk-group-items=""]', WE = '[cmdk-group-heading=""]', dm = '[cmdk-item=""]', ol = `${dm}:not([aria-disabled="true"])`, qa = "cmdk-item-select", sn = "data-value", BE = (e, t, n) => FE(e, t, n), um = m.createContext(void 0), ur = () => m.useContext(um), fm = m.createContext(void 0), Gi = () => m.useContext(fm), mm = m.createContext(void 0), hm = m.forwardRef((e, t) => {
  let n = ln(() => {
    var P, B;
    return { search: "", value: (B = (P = e.value) != null ? P : e.defaultValue) != null ? B : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = ln(() => /* @__PURE__ */ new Set()), o = ln(() => /* @__PURE__ */ new Map()), a = ln(() => /* @__PURE__ */ new Map()), s = ln(() => /* @__PURE__ */ new Set()), i = pm(e), { label: l, children: d, value: c, onValueChange: f, filter: h, shouldFilter: p, loop: v, disablePointerSelection: g = !1, vimBindings: b = !0, ...w } = e, x = Ce(), y = Ce(), S = Ce(), C = m.useRef(null), R = QE();
  qt(() => {
    if (c !== void 0) {
      let P = c.trim();
      n.current.value = P, k.emit();
    }
  }, [c]), qt(() => {
    R(6, A);
  }, []);
  let k = m.useMemo(() => ({ subscribe: (P) => (s.current.add(P), () => s.current.delete(P)), snapshot: () => n.current, setState: (P, B, W) => {
    var G, oe, z, te;
    if (!Object.is(n.current[P], B)) {
      if (n.current[P] = B, P === "search") L(), T(), R(1, _);
      else if (P === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let J = document.getElementById(S);
          J ? J.focus() : (G = document.getElementById(x)) == null || G.focus();
        }
        if (R(7, () => {
          var J;
          n.current.selectedItemId = (J = Y()) == null ? void 0 : J.id, k.emit();
        }), W || R(5, A), ((oe = i.current) == null ? void 0 : oe.value) !== void 0) {
          let J = B ?? "";
          (te = (z = i.current).onValueChange) == null || te.call(z, J);
          return;
        }
      }
      k.emit();
    }
  }, emit: () => {
    s.current.forEach((P) => P());
  } }), []), E = m.useMemo(() => ({ value: (P, B, W) => {
    var G;
    B !== ((G = a.current.get(P)) == null ? void 0 : G.value) && (a.current.set(P, { value: B, keywords: W }), n.current.filtered.items.set(P, M(B, W)), R(2, () => {
      T(), k.emit();
    }));
  }, item: (P, B) => (r.current.add(P), B && (o.current.has(B) ? o.current.get(B).add(P) : o.current.set(B, /* @__PURE__ */ new Set([P]))), R(3, () => {
    L(), T(), n.current.value || _(), k.emit();
  }), () => {
    a.current.delete(P), r.current.delete(P), n.current.filtered.items.delete(P);
    let W = Y();
    R(4, () => {
      L(), (W == null ? void 0 : W.getAttribute("id")) === P && _(), k.emit();
    });
  }), group: (P) => (o.current.has(P) || o.current.set(P, /* @__PURE__ */ new Set()), () => {
    a.current.delete(P), o.current.delete(P);
  }), filter: () => i.current.shouldFilter, label: l || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: x, inputId: S, labelId: y, listInnerRef: C }), []);
  function M(P, B) {
    var W, G;
    let oe = (G = (W = i.current) == null ? void 0 : W.filter) != null ? G : BE;
    return P ? oe(P, n.current.search, B) : 0;
  }
  function T() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let P = n.current.filtered.items, B = [];
    n.current.filtered.groups.forEach((G) => {
      let oe = o.current.get(G), z = 0;
      oe.forEach((te) => {
        let J = P.get(te);
        z = Math.max(J, z);
      }), B.push([G, z]);
    });
    let W = C.current;
    j().sort((G, oe) => {
      var z, te;
      let J = G.getAttribute("id"), ie = oe.getAttribute("id");
      return ((z = P.get(ie)) != null ? z : 0) - ((te = P.get(J)) != null ? te : 0);
    }).forEach((G) => {
      let oe = G.closest(ga);
      oe ? oe.appendChild(G.parentElement === oe ? G : G.closest(`${ga} > *`)) : W.appendChild(G.parentElement === W ? G : G.closest(`${ga} > *`));
    }), B.sort((G, oe) => oe[1] - G[1]).forEach((G) => {
      var oe;
      let z = (oe = C.current) == null ? void 0 : oe.querySelector(`${Ln}[${sn}="${encodeURIComponent(G[0])}"]`);
      z == null || z.parentElement.appendChild(z);
    });
  }
  function _() {
    let P = j().find((W) => W.getAttribute("aria-disabled") !== "true"), B = P == null ? void 0 : P.getAttribute(sn);
    k.setState("value", B || void 0);
  }
  function L() {
    var P, B, W, G;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let oe = 0;
    for (let z of r.current) {
      let te = (B = (P = a.current.get(z)) == null ? void 0 : P.value) != null ? B : "", J = (G = (W = a.current.get(z)) == null ? void 0 : W.keywords) != null ? G : [], ie = M(te, J);
      n.current.filtered.items.set(z, ie), ie > 0 && oe++;
    }
    for (let [z, te] of o.current) for (let J of te) if (n.current.filtered.items.get(J) > 0) {
      n.current.filtered.groups.add(z);
      break;
    }
    n.current.filtered.count = oe;
  }
  function A() {
    var P, B, W;
    let G = Y();
    G && (((P = G.parentElement) == null ? void 0 : P.firstChild) === G && ((W = (B = G.closest(Ln)) == null ? void 0 : B.querySelector(WE)) == null || W.scrollIntoView({ block: "nearest" })), G.scrollIntoView({ block: "nearest" }));
  }
  function Y() {
    var P;
    return (P = C.current) == null ? void 0 : P.querySelector(`${dm}[aria-selected="true"]`);
  }
  function j() {
    var P;
    return Array.from(((P = C.current) == null ? void 0 : P.querySelectorAll(ol)) || []);
  }
  function F(P) {
    let B = j()[P];
    B && k.setState("value", B.getAttribute(sn));
  }
  function U(P) {
    var B;
    let W = Y(), G = j(), oe = G.findIndex((te) => te === W), z = G[oe + P];
    (B = i.current) != null && B.loop && (z = oe + P < 0 ? G[G.length - 1] : oe + P === G.length ? G[0] : G[oe + P]), z && k.setState("value", z.getAttribute(sn));
  }
  function D(P) {
    let B = Y(), W = B == null ? void 0 : B.closest(Ln), G;
    for (; W && !G; ) W = P > 0 ? XE(W, Ln) : ZE(W, Ln), G = W == null ? void 0 : W.querySelector(ol);
    G ? k.setState("value", G.getAttribute(sn)) : U(P);
  }
  let O = () => F(j().length - 1), Z = (P) => {
    P.preventDefault(), P.metaKey ? O() : P.altKey ? D(1) : U(1);
  }, se = (P) => {
    P.preventDefault(), P.metaKey ? F(0) : P.altKey ? D(-1) : U(-1);
  };
  return m.createElement(K.div, { ref: t, tabIndex: -1, ...w, "cmdk-root": "", onKeyDown: (P) => {
    var B;
    (B = w.onKeyDown) == null || B.call(w, P);
    let W = P.nativeEvent.isComposing || P.keyCode === 229;
    if (!(P.defaultPrevented || W)) switch (P.key) {
      case "n":
      case "j": {
        b && P.ctrlKey && Z(P);
        break;
      }
      case "ArrowDown": {
        Z(P);
        break;
      }
      case "p":
      case "k": {
        b && P.ctrlKey && se(P);
        break;
      }
      case "ArrowUp": {
        se(P);
        break;
      }
      case "Home": {
        P.preventDefault(), F(0);
        break;
      }
      case "End": {
        P.preventDefault(), O();
        break;
      }
      case "Enter": {
        P.preventDefault();
        let G = Y();
        if (G) {
          let oe = new Event(qa);
          G.dispatchEvent(oe);
        }
      }
    }
  } }, m.createElement("label", { "cmdk-label": "", htmlFor: E.inputId, id: E.labelId, style: eR }, l), Oo(e, (P) => m.createElement(fm.Provider, { value: k }, m.createElement(um.Provider, { value: E }, P))));
}), HE = m.forwardRef((e, t) => {
  var n, r;
  let o = Ce(), a = m.useRef(null), s = m.useContext(mm), i = ur(), l = pm(e), d = (r = (n = l.current) == null ? void 0 : n.forceMount) != null ? r : s == null ? void 0 : s.forceMount;
  qt(() => {
    if (!d) return i.item(o, s == null ? void 0 : s.id);
  }, [d]);
  let c = gm(o, a, [e.value, e.children, a], e.keywords), f = Gi(), h = _t((R) => R.value && R.value === c.current), p = _t((R) => d || i.filter() === !1 ? !0 : R.search ? R.filtered.items.get(o) > 0 : !0);
  m.useEffect(() => {
    let R = a.current;
    if (!(!R || e.disabled)) return R.addEventListener(qa, v), () => R.removeEventListener(qa, v);
  }, [p, e.onSelect, e.disabled]);
  function v() {
    var R, k;
    g(), (k = (R = l.current).onSelect) == null || k.call(R, c.current);
  }
  function g() {
    f.setState("value", c.current, !0);
  }
  if (!p) return null;
  let { disabled: b, value: w, onSelect: x, forceMount: y, keywords: S, ...C } = e;
  return m.createElement(K.div, { ref: bt(a, t), ...C, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!h, "data-disabled": !!b, "data-selected": !!h, onPointerMove: b || i.getDisablePointerSelection() ? void 0 : g, onClick: b ? void 0 : v }, e.children);
}), VE = m.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = Ce(), i = m.useRef(null), l = m.useRef(null), d = Ce(), c = ur(), f = _t((p) => o || c.filter() === !1 ? !0 : p.search ? p.filtered.groups.has(s) : !0);
  qt(() => c.group(s), []), gm(s, i, [e.value, e.heading, l]);
  let h = m.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return m.createElement(K.div, { ref: bt(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: f ? void 0 : !0 }, n && m.createElement("div", { ref: l, "cmdk-group-heading": "", "aria-hidden": !0, id: d }, n), Oo(e, (p) => m.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? d : void 0 }, m.createElement(mm.Provider, { value: h }, p))));
}), YE = m.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = m.useRef(null), a = _t((s) => !s.search);
  return !n && !a ? null : m.createElement(K.div, { ref: bt(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), GE = m.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = Gi(), s = _t((d) => d.search), i = _t((d) => d.selectedItemId), l = ur();
  return m.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), m.createElement(K.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": l.listId, "aria-labelledby": l.labelId, "aria-activedescendant": i, id: l.inputId, type: "text", value: o ? e.value : s, onChange: (d) => {
    o || a.setState("search", d.target.value), n == null || n(d.target.value);
  } });
}), UE = m.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = m.useRef(null), s = m.useRef(null), i = _t((d) => d.selectedItemId), l = ur();
  return m.useEffect(() => {
    if (s.current && a.current) {
      let d = s.current, c = a.current, f, h = new ResizeObserver(() => {
        f = requestAnimationFrame(() => {
          let p = d.offsetHeight;
          c.style.setProperty("--cmdk-list-height", p.toFixed(1) + "px");
        });
      });
      return h.observe(d), () => {
        cancelAnimationFrame(f), h.unobserve(d);
      };
    }
  }, []), m.createElement(K.div, { ref: bt(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: l.listId }, Oo(e, (d) => m.createElement("div", { ref: bt(s, l.listInnerRef), "cmdk-list-sizer": "" }, d)));
}), jE = m.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return m.createElement(to, { open: n, onOpenChange: r }, m.createElement(no, { container: s }, m.createElement(ro, { "cmdk-overlay": "", className: o }), m.createElement(oo, { "aria-label": e.label, "cmdk-dialog": "", className: a }, m.createElement(hm, { ref: t, ...i }))));
}), KE = m.forwardRef((e, t) => _t((n) => n.filtered.count === 0) ? m.createElement(K.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), qE = m.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return m.createElement(K.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Oo(e, (s) => m.createElement("div", { "aria-hidden": !0 }, s)));
}), Zt = Object.assign(hm, { List: UE, Item: HE, Input: GE, Group: VE, Separator: YE, Dialog: jE, Empty: KE, Loading: qE });
function XE(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function ZE(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function pm(e) {
  let t = m.useRef(e);
  return qt(() => {
    t.current = e;
  }), t;
}
var qt = typeof window > "u" ? m.useEffect : m.useLayoutEffect;
function ln(e) {
  let t = m.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function _t(e) {
  let t = Gi(), n = () => e(t.snapshot());
  return m.useSyncExternalStore(t.subscribe, n, n);
}
function gm(e, t, n, r = []) {
  let o = m.useRef(), a = ur();
  return qt(() => {
    var s;
    let i = (() => {
      var d;
      for (let c of n) {
        if (typeof c == "string") return c.trim();
        if (typeof c == "object" && "current" in c) return c.current ? (d = c.current.textContent) == null ? void 0 : d.trim() : o.current;
      }
    })(), l = r.map((d) => d.trim());
    a.value(e, i, l), (s = t.current) == null || s.setAttribute(sn, i), o.current = i;
  }), o;
}
var QE = () => {
  let [e, t] = m.useState(), n = ln(() => /* @__PURE__ */ new Map());
  return qt(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function JE(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Oo({ asChild: e, children: t }, n) {
  return e && m.isValidElement(t) ? m.cloneElement(JE(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var eR = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function vm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Zt,
    {
      "data-slot": "command",
      className: $(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        e
      ),
      ...t
    }
  );
}
function bm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ u(Yx, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ u(
          Zt.Input,
          {
            "data-slot": "command-input",
            className: $(
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
function wm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Zt.List,
    {
      "data-slot": "command-list",
      className: $(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...t
    }
  );
}
function ym({
  ...e
}) {
  return /* @__PURE__ */ u(
    Zt.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function Xa({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Zt.Group,
    {
      "data-slot": "command-group",
      className: $(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function tR({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Zt.Separator,
    {
      "data-slot": "command-separator",
      className: $("-mx-1 h-px bg-border", e),
      ...t
    }
  );
}
function Za({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    Zt.Item,
    {
      "data-slot": "command-item",
      className: $(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function nR({
  column: e,
  title: t,
  options: n,
  multiple: r
}) {
  const [o, a] = m.useState(!1), s = e == null ? void 0 : e.getFilterValue(), i = new Set(
    Array.isArray(s) ? s : []
  ), l = m.useCallback(
    (c, f) => {
      if (e)
        if (r) {
          const h = new Set(i);
          f ? h.delete(c.value) : h.add(c.value);
          const p = Array.from(h);
          e.setFilterValue(p.length ? p : void 0);
        } else
          e.setFilterValue(f ? void 0 : [c.value]), a(!1);
    },
    [e, r, i]
  ), d = m.useCallback(
    (c) => {
      c == null || c.stopPropagation(), e == null || e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ I(Po, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ u(To, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          (i == null ? void 0 : i.size) > 0 ? /* @__PURE__ */ u(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: d,
              children: /* @__PURE__ */ u(Fi, {})
            }
          ) : /* @__PURE__ */ u(hf, {}),
          t,
          (i == null ? void 0 : i.size) > 0 && /* @__PURE__ */ I(_e, { children: [
            /* @__PURE__ */ u(
              Kr,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            /* @__PURE__ */ u(
              ta,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal lg:hidden",
                children: i.size
              }
            ),
            /* @__PURE__ */ u("div", { className: "hidden items-center gap-1 lg:flex", children: i.size > 2 ? /* @__PURE__ */ I(
              ta,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: [
                  i.size,
                  " selected"
                ]
              }
            ) : n.filter((c) => i.has(c.value)).map((c) => /* @__PURE__ */ u(
              ta,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: c.label
              },
              c.value
            )) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ u(_o, { className: "w-50 p-0", align: "start", children: /* @__PURE__ */ I(vm, { children: [
      /* @__PURE__ */ u(bm, { placeholder: t }),
      /* @__PURE__ */ I(wm, { className: "max-h-full", children: [
        /* @__PURE__ */ u(ym, { children: "No results found." }),
        /* @__PURE__ */ u(Xa, { className: "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", children: n.map((c) => {
          const f = i.has(c.value);
          return /* @__PURE__ */ I(
            Za,
            {
              onSelect: () => l(c, f),
              children: [
                /* @__PURE__ */ u(
                  "div",
                  {
                    className: $(
                      "flex size-4 items-center justify-center rounded-sm border border-primary",
                      f ? "bg-primary" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ u(pt, {})
                  }
                ),
                c.icon && /* @__PURE__ */ u(c.icon, {}),
                /* @__PURE__ */ u("span", { className: "truncate", children: c.label }),
                c.count && /* @__PURE__ */ u("span", { className: "ml-auto font-mono text-xs", children: c.count })
              ]
            },
            c.value
          );
        }) }),
        i.size > 0 && /* @__PURE__ */ I(_e, { children: [
          /* @__PURE__ */ u(tR, {}),
          /* @__PURE__ */ u(Xa, { children: /* @__PURE__ */ u(
            Za,
            {
              onSelect: () => d(),
              className: "justify-center text-center",
              children: "Clear filters"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
}
function va({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ u(
    cb,
    {
      "data-slot": "label",
      className: $(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function rR({
  className: e,
  defaultValue: t,
  value: n,
  min: r = 0,
  max: o = 100,
  ...a
}) {
  const s = m.useMemo(
    () => Array.isArray(n) ? n : Array.isArray(t) ? t : [r, o],
    [n, t, r, o]
  );
  return /* @__PURE__ */ I(
    Uw,
    {
      "data-slot": "slider",
      defaultValue: t,
      value: n,
      min: r,
      max: o,
      className: $(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ u(
          jw,
          {
            "data-slot": "slider-track",
            className: $(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ u(
              Kw,
              {
                "data-slot": "slider-range",
                className: $(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: s.length }, (i, l) => /* @__PURE__ */ u(
          qw,
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
function oR(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && typeof e[1] == "number";
}
function aR(e) {
  if (Array.isArray(e) && e.length === 2 && e.every(
    (t) => (typeof t == "string" || typeof t == "number") && !Number.isNaN(t)
  ))
    return [Number(e[0]), Number(e[1])];
}
function iR({
  column: e,
  title: t
}) {
  var g, b, w, x;
  const n = m.useId(), r = aR(e.getFilterValue()), o = (g = e.columnDef.meta) == null ? void 0 : g.range, a = (b = e.columnDef.meta) == null ? void 0 : b.unit, { min: s, max: i, step: l } = m.useMemo(() => {
    let y = 0, S = 100;
    if (o && oR(o))
      [y, S] = o;
    else {
      const k = e.getFacetedMinMaxValues();
      if (k && Array.isArray(k) && k.length === 2) {
        const [E, M] = k;
        typeof E == "number" && typeof M == "number" && (y = E, S = M);
      }
    }
    const C = S - y, R = C <= 20 ? 1 : C <= 100 ? Math.ceil(C / 20) : Math.ceil(C / 50);
    return { min: y, max: S, step: R };
  }, [e, o]), d = m.useMemo(() => r ?? [s, i], [r, s, i]), c = m.useCallback((y) => y.toLocaleString(void 0, { maximumFractionDigits: 0 }), []), f = m.useCallback(
    (y) => {
      const S = Number(y.target.value);
      !Number.isNaN(S) && S >= s && S <= d[1] && e.setFilterValue([S, d[1]]);
    },
    [e, s, d]
  ), h = m.useCallback(
    (y) => {
      const S = Number(y.target.value);
      !Number.isNaN(S) && S <= i && S >= d[0] && e.setFilterValue([d[0], S]);
    },
    [e, i, d]
  ), p = m.useCallback(
    (y) => {
      Array.isArray(y) && y.length === 2 && e.setFilterValue(y);
    },
    [e]
  ), v = m.useCallback(
    (y) => {
      y.target instanceof HTMLDivElement && y.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ I(Po, { children: [
    /* @__PURE__ */ u(To, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          r ? /* @__PURE__ */ u(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: v,
              children: /* @__PURE__ */ u(Fi, {})
            }
          ) : /* @__PURE__ */ u(hf, {}),
          /* @__PURE__ */ u("span", { children: t }),
          r ? /* @__PURE__ */ I(_e, { children: [
            /* @__PURE__ */ u(
              Kr,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            c(r[0]),
            " -",
            " ",
            c(r[1]),
            a ? ` ${a}` : ""
          ] }) : null
        ]
      }
    ) }),
    /* @__PURE__ */ I(_o, { align: "start", className: "flex w-auto flex-col gap-4", children: [
      /* @__PURE__ */ I("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ u("p", { className: "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: t }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ u(va, { htmlFor: `${n}-from`, className: "sr-only", children: "From" }),
          /* @__PURE__ */ I("div", { className: "relative", children: [
            /* @__PURE__ */ u(
              jr,
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
                value: (w = d[0]) == null ? void 0 : w.toString(),
                onChange: f,
                className: $("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ u("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] }),
          /* @__PURE__ */ u(va, { htmlFor: `${n}-to`, className: "sr-only", children: "to" }),
          /* @__PURE__ */ I("div", { className: "relative", children: [
            /* @__PURE__ */ u(
              jr,
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
                value: (x = d[1]) == null ? void 0 : x.toString(),
                onChange: h,
                className: $("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ u("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] })
        ] }),
        /* @__PURE__ */ I(va, { htmlFor: `${n}-slider`, className: "sr-only", children: [
          t,
          " slider"
        ] }),
        /* @__PURE__ */ u(
          rR,
          {
            id: `${n}-slider`,
            min: s,
            max: i,
            step: l,
            value: d,
            onValueChange: p
          }
        )
      ] }),
      /* @__PURE__ */ u(
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
function sR({
  table: e,
  disabled: t,
  ...n
}) {
  const r = m.useMemo(
    () => e.getAllColumns().filter(
      (o) => typeof o.accessorFn < "u" && o.getCanHide()
    ),
    [e]
  );
  return /* @__PURE__ */ I(Po, { children: [
    /* @__PURE__ */ u(To, { asChild: !0, children: /* @__PURE__ */ I(
      We,
      {
        "aria-label": "Toggle columns",
        role: "combobox",
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 font-normal lg:flex",
        disabled: t,
        children: [
          /* @__PURE__ */ u(pf, { className: "text-muted-foreground" }),
          "View"
        ]
      }
    ) }),
    /* @__PURE__ */ u(_o, { className: "w-44 p-0", ...n, children: /* @__PURE__ */ I(vm, { children: [
      /* @__PURE__ */ u(bm, { placeholder: "Search columns..." }),
      /* @__PURE__ */ I(wm, { children: [
        /* @__PURE__ */ u(ym, { children: "No columns found." }),
        /* @__PURE__ */ u(Xa, { children: r.map((o) => {
          var a;
          return /* @__PURE__ */ I(
            Za,
            {
              onSelect: () => o.toggleVisibility(!o.getIsVisible()),
              children: [
                /* @__PURE__ */ u("span", { className: "truncate", children: ((a = o.columnDef.meta) == null ? void 0 : a.label) ?? o.id }),
                /* @__PURE__ */ u(
                  pt,
                  {
                    className: $(
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
function NM({
  table: e,
  children: t,
  className: n,
  ...r
}) {
  const o = e.getState().columnFilters.length > 0, a = m.useMemo(
    () => e.getAllColumns().filter((i) => i.getCanFilter()),
    [e]
  ), s = m.useCallback(() => {
    e.resetColumnFilters();
  }, [e]);
  return /* @__PURE__ */ I(
    "div",
    {
      role: "toolbar",
      "aria-orientation": "horizontal",
      className: $(
        "flex w-full items-start justify-between gap-2 p-1",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ I("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
          a.map((i) => /* @__PURE__ */ u(lR, { column: i }, i.id)),
          o && /* @__PURE__ */ I(
            We,
            {
              "aria-label": "Reset filters",
              variant: "outline",
              size: "sm",
              className: "border-dashed",
              onClick: s,
              children: [
                /* @__PURE__ */ u(Wi, {}),
                "Reset"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
          t,
          /* @__PURE__ */ u(sR, { table: e, align: "end" })
        ] })
      ]
    }
  );
}
function lR({
  column: e
}) {
  {
    const t = e.columnDef.meta;
    return m.useCallback(() => {
      if (!(t != null && t.variant)) return null;
      switch (t.variant) {
        case "text":
          return /* @__PURE__ */ u(
            jr,
            {
              placeholder: t.placeholder ?? t.label,
              value: e.getFilterValue() ?? "",
              onChange: (r) => e.setFilterValue(r.target.value),
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "number":
          return /* @__PURE__ */ I("div", { className: "relative", children: [
            /* @__PURE__ */ u(
              jr,
              {
                type: "number",
                inputMode: "numeric",
                placeholder: t.placeholder ?? t.label,
                value: e.getFilterValue() ?? "",
                onChange: (r) => e.setFilterValue(r.target.value),
                className: $("h-8 w-[120px]", t.unit && "pr-8")
              }
            ),
            t.unit && /* @__PURE__ */ u("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: t.unit })
          ] });
        case "range":
          return /* @__PURE__ */ u(
            iR,
            {
              column: e,
              title: t.label ?? e.id
            }
          );
        case "date":
        case "dateRange":
          return /* @__PURE__ */ u(
            PE,
            {
              column: e,
              title: t.label ?? e.id,
              multiple: t.variant === "dateRange"
            }
          );
        case "select":
        case "multiSelect":
          return /* @__PURE__ */ u(
            nR,
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
function DM({
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
  const d = Array.from(
    { length: e },
    (c, f) => r[f % r.length] ?? "auto"
  );
  return /* @__PURE__ */ I(
    "div",
    {
      className: $("flex w-full flex-col gap-2.5 overflow-auto", i),
      ...l,
      children: [
        /* @__PURE__ */ I("div", { className: "flex w-full items-center justify-between gap-2 overflow-auto p-1", children: [
          /* @__PURE__ */ u("div", { className: "flex flex-1 items-center gap-2", children: n > 0 ? Array.from({ length: n }).map((c, f) => /* @__PURE__ */ u(Ve, { className: "h-7 w-18 border-dashed" }, f)) : null }),
          o ? /* @__PURE__ */ u(Ve, { className: "ml-auto hidden h-7 w-18 lg:flex" }) : null
        ] }),
        /* @__PURE__ */ u("div", { className: "rounded-md border", children: /* @__PURE__ */ I(R0, { children: [
          /* @__PURE__ */ u(M0, { children: Array.from({ length: 1 }).map((c, f) => /* @__PURE__ */ u(zs, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((h, p) => /* @__PURE__ */ u(
            D0,
            {
              style: {
                width: d[p],
                minWidth: s ? d[p] : "auto"
              },
              children: /* @__PURE__ */ u(Ve, { className: "h-6 w-full" })
            },
            p
          )) }, f)) }),
          /* @__PURE__ */ u(N0, { children: Array.from({ length: t }).map((c, f) => /* @__PURE__ */ u(zs, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((h, p) => /* @__PURE__ */ u(
            P0,
            {
              style: {
                width: d[p],
                minWidth: s ? d[p] : "auto"
              },
              children: /* @__PURE__ */ u(Ve, { className: "h-6 w-full" })
            },
            p
          )) }, f)) })
        ] }) }),
        a ? /* @__PURE__ */ I("div", { className: "flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8", children: [
          /* @__PURE__ */ u(Ve, { className: "h-7 w-40 shrink-0" }),
          /* @__PURE__ */ I("div", { className: "flex items-center gap-4 sm:gap-6 lg:gap-8", children: [
            /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ u(Ve, { className: "h-7 w-24" }),
              /* @__PURE__ */ u(Ve, { className: "h-7 w-18" })
            ] }),
            /* @__PURE__ */ u("div", { className: "flex items-center justify-center font-medium text-sm", children: /* @__PURE__ */ u(Ve, { className: "h-7 w-20" }) }),
            /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ u(Ve, { className: "hidden size-7 lg:block" }),
              /* @__PURE__ */ u(Ve, { className: "size-7" }),
              /* @__PURE__ */ u(Ve, { className: "size-7" }),
              /* @__PURE__ */ u(Ve, { className: "hidden size-7 lg:block" })
            ] })
          ] })
        ] }) : null
      ]
    }
  );
}
const PM = {
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
  dM as Avatar,
  fM as AvatarFallback,
  uM as AvatarImage,
  ta as Badge,
  We as Button,
  ER as Card,
  DR as CardAction,
  PR as CardContent,
  NR as CardDescription,
  TR as CardFooter,
  RR as CardHeader,
  MR as CardTitle,
  _R as Checkbox,
  j0 as DataGrid,
  K0 as DataGridContainer,
  U0 as DataGridProvider,
  Z0 as DataGridScrollArea,
  ES as DataGridTable,
  RM as DataTable,
  MM as DataTableColumnHeader,
  nR as DataTableFacetedFilter,
  RS as DataTablePagination,
  DM as DataTableSkeleton,
  NM as DataTableToolbar,
  sR as DataTableViewOptions,
  vM as Dialog,
  wM as DialogClose,
  yM as DialogContent,
  kM as DialogDescription,
  SM as DialogFooter,
  xM as DialogHeader,
  CM as DialogTitle,
  bM as DialogTrigger,
  OR as Drawer,
  IR as DrawerClose,
  LR as DrawerContent,
  BR as DrawerDescription,
  FR as DrawerFooter,
  zR as DrawerHandle,
  $R as DrawerHeader,
  S0 as DrawerOverlay,
  x0 as DrawerPortal,
  WR as DrawerTitle,
  AR as DrawerTrigger,
  z0 as DropdownMenu,
  F0 as DropdownMenuContent,
  on as DropdownMenuItem,
  H0 as DropdownMenuLabel,
  Pr as DropdownMenuSeparator,
  $0 as DropdownMenuTrigger,
  jr as Input,
  EM as Kbd,
  cM as Progress,
  Mf as Select,
  Pf as SelectContent,
  VR as SelectGroup,
  Tf as SelectItem,
  YR as SelectLabel,
  E0 as SelectScrollDownButton,
  k0 as SelectScrollUpButton,
  GR as SelectSeparator,
  Df as SelectTrigger,
  Nf as SelectValue,
  Kr as Separator,
  tM as Sheet,
  rM as SheetClose,
  oM as SheetContent,
  lM as SheetDescription,
  iM as SheetFooter,
  aM as SheetHeader,
  sM as SheetTitle,
  nM as SheetTrigger,
  UR as SimpleSelect,
  Ve as Skeleton,
  jR as Switch,
  R0 as Table,
  N0 as TableBody,
  qR as TableCaption,
  P0 as TableCell,
  KR as TableFooter,
  D0 as TableHead,
  M0 as TableHeader,
  zs as TableRow,
  XR as Tabs,
  JR as TabsContent,
  ZR as TabsList,
  QR as TabsTrigger,
  eM as Textarea,
  hM as Tooltip,
  gM as TooltipContent,
  mM as TooltipProvider,
  pM as TooltipTrigger,
  lx as badgeVariants,
  cx as buttonVariants,
  le as cn,
  PM as dataTableConfig,
  T0 as tabsListVariants,
  C0 as useCallbackRef,
  xe as useDataGrid,
  HR as useDebouncedCallback
};
//# sourceMappingURL=index.mjs.map
