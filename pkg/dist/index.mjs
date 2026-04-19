import { jsx as f, jsxs as T, Fragment as Me } from "react/jsx-runtime";
import * as u from "react";
import B, { useState as Rt, useLayoutEffect as Li, forwardRef as Fi, createElement as go, createContext as Wi, useContext as $i, useEffect as ur, useMemo as Yt, useRef as tt, useCallback as Ce, memo as Bi, Fragment as hu } from "react";
import * as fr from "react-dom";
import pu from "react-dom";
function Vi(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Vi(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Uo() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Vi(e)) && (r && (r += " "), r += t);
  return r;
}
const Aa = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ia = Uo, Sn = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ia(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((c) => {
    const d = n == null ? void 0 : n[c], m = a == null ? void 0 : a[c];
    if (d === null) return null;
    const h = Aa(d) || Aa(m);
    return o[c][h];
  }), i = n && Object.entries(n).reduce((c, d) => {
    let [m, h] = d;
    return h === void 0 || (c[m] = h), c;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, d) => {
    let { class: m, className: h, ...p } = d;
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
      ...c,
      m,
      h
    ] : c;
  }, []);
  return Ia(e, s, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
};
function za(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function ot(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = za(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : za(e[o], null);
        }
      };
  };
}
function te(...e) {
  return u.useCallback(ot(...e), e);
}
// @__NO_SIDE_EFFECTS__
function ht(e) {
  const t = /* @__PURE__ */ gu(e), n = u.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = u.Children.toArray(a), l = i.find(bu);
    if (l) {
      const c = l.props.children, d = i.map((m) => m === l ? u.Children.count(c) > 1 ? u.Children.only(null) : u.isValidElement(c) ? c.props.children : null : m);
      return /* @__PURE__ */ f(t, { ...s, ref: o, children: u.isValidElement(c) ? u.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ f(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var jo = /* @__PURE__ */ ht("Slot");
// @__NO_SIDE_EFFECTS__
function gu(e) {
  const t = u.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (u.isValidElement(o)) {
      const s = wu(o), i = yu(a, o.props);
      return o.type !== u.Fragment && (i.ref = r ? ot(r, s) : s), u.cloneElement(o, i);
    }
    return u.Children.count(o) > 1 ? u.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var vu = Symbol("radix.slottable");
function bu(e) {
  return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vu;
}
function yu(e, t) {
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
function wu(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var xu = [
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
], q = xu.reduce((e, t) => {
  const n = /* @__PURE__ */ ht(`Primitive.${t}`), r = u.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, l = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ f(l, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Hi(e, t) {
  e && fr.flushSync(() => e.dispatchEvent(t));
}
var Yi = Object.freeze({
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
}), Su = "VisuallyHidden", Cu = u.forwardRef(
  (e, t) => /* @__PURE__ */ f(
    q.span,
    {
      ...e,
      ref: t,
      style: { ...Yi, ...e.style }
    }
  )
);
Cu.displayName = Su;
function ku(e, t) {
  const n = u.createContext(t), r = (a) => {
    const { children: s, ...i } = a, l = u.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ f(n.Provider, { value: l, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = u.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function Ve(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = u.createContext(s), l = n.length;
    n = [...n, s];
    const c = (m) => {
      var w;
      const { scope: h, children: p, ...v } = m, g = ((w = h == null ? void 0 : h[e]) == null ? void 0 : w[l]) || i, b = u.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ f(g.Provider, { value: b, children: p });
    };
    c.displayName = a + "Provider";
    function d(m, h) {
      var g;
      const p = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[l]) || i, v = u.useContext(p);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${m}\` must be used within \`${a}\``);
    }
    return [c, d];
  }
  const o = () => {
    const a = n.map((s) => u.createContext(s));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || a;
      return u.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [r, Mu(o, ...t)];
}
function Mu(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: l, scopeName: c }) => {
        const m = l(a)[`__scope${c}`];
        return { ...i, ...m };
      }, {});
      return u.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function mr(e) {
  const t = e + "CollectionProvider", [n, r] = Ve(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: b, children: w } = g, x = B.useRef(null), y = B.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ f(o, { scope: b, itemMap: y, collectionRef: x, children: w });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", l = /* @__PURE__ */ ht(i), c = B.forwardRef(
    (g, b) => {
      const { scope: w, children: x } = g, y = a(i, w), C = te(b, y.collectionRef);
      return /* @__PURE__ */ f(l, { ref: C, children: x });
    }
  );
  c.displayName = i;
  const d = e + "CollectionItemSlot", m = "data-radix-collection-item", h = /* @__PURE__ */ ht(d), p = B.forwardRef(
    (g, b) => {
      const { scope: w, children: x, ...y } = g, C = B.useRef(null), S = te(b, C), N = a(d, w);
      return B.useEffect(() => (N.itemMap.set(C, { ref: C, ...y }), () => void N.itemMap.delete(C))), /* @__PURE__ */ f(h, { [m]: "", ref: S, children: x });
    }
  );
  p.displayName = d;
  function v(g) {
    const b = a(e + "CollectionConsumer", g);
    return B.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const y = Array.from(x.querySelectorAll(`[${m}]`));
      return Array.from(b.itemMap.values()).sort(
        (N, M) => y.indexOf(N.ref.current) - y.indexOf(M.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: c, ItemSlot: p },
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
var xe = globalThis != null && globalThis.document ? u.useLayoutEffect : () => {
}, Nu = u[" useInsertionEffect ".trim().toString()] || xe;
function at({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = Ru({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, l = i ? e : o;
  {
    const d = u.useRef(e !== void 0);
    u.useEffect(() => {
      const m = d.current;
      m !== i && console.warn(
        `${r} is changing from ${m ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const c = u.useCallback(
    (d) => {
      var m;
      if (i) {
        const h = Pu(d) ? d(e) : d;
        h !== e && ((m = s.current) == null || m.call(s, h));
      } else
        a(d);
    },
    [i, e, a, s]
  );
  return [l, c];
}
function Ru({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = u.useState(e), o = u.useRef(n), a = u.useRef(t);
  return Nu(() => {
    a.current = t;
  }, [t]), u.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function Pu(e) {
  return typeof e == "function";
}
function Eu(e, t) {
  return u.useReducer((n, r) => t[n][r] ?? n, e);
}
var Pe = (e) => {
  const { present: t, children: n } = e, r = Du(t), o = typeof n == "function" ? n({ present: r.isPresent }) : u.Children.only(n), a = te(r.ref, Ou(o));
  return typeof n == "function" || r.isPresent ? u.cloneElement(o, { ref: a }) : null;
};
Pe.displayName = "Presence";
function Du(e) {
  const [t, n] = u.useState(), r = u.useRef(null), o = u.useRef(e), a = u.useRef("none"), s = e ? "mounted" : "unmounted", [i, l] = Eu(s, {
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
  return u.useEffect(() => {
    const c = Wn(r.current);
    a.current = i === "mounted" ? c : "none";
  }, [i]), xe(() => {
    const c = r.current, d = o.current;
    if (d !== e) {
      const h = a.current, p = Wn(c);
      e ? l("MOUNT") : p === "none" || (c == null ? void 0 : c.display) === "none" ? l("UNMOUNT") : l(d && h !== p ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), xe(() => {
    if (t) {
      let c;
      const d = t.ownerDocument.defaultView ?? window, m = (p) => {
        const g = Wn(r.current).includes(CSS.escape(p.animationName));
        if (p.target === t && g && (l("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, h = (p) => {
        p.target === t && (a.current = Wn(r.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        d.clearTimeout(c), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: u.useCallback((c) => {
      r.current = c ? getComputedStyle(c) : null, n(c);
    }, [])
  };
}
function Wn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Ou(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var _u = u[" useId ".trim().toString()] || (() => {
}), Tu = 0;
function we(e) {
  const [t, n] = u.useState(_u());
  return xe(() => {
    n((r) => r ?? String(Tu++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var Au = u.createContext(void 0);
function Cn(e) {
  const t = u.useContext(Au);
  return e || t || "ltr";
}
function ye(e) {
  const t = u.useRef(e);
  return u.useEffect(() => {
    t.current = e;
  }), u.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Iu(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ye(e);
  u.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var zu = "DismissableLayer", vo = "dismissableLayer.update", Lu = "dismissableLayer.pointerDownOutside", Fu = "dismissableLayer.focusOutside", La, Gi = u.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), kn = u.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...l
    } = e, c = u.useContext(Gi), [d, m] = u.useState(null), h = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, p] = u.useState({}), v = te(t, (M) => m(M)), g = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), w = g.indexOf(b), x = d ? g.indexOf(d) : -1, y = c.layersWithOutsidePointerEventsDisabled.size > 0, C = x >= w, S = Bu((M) => {
      const k = M.target, R = [...c.branches].some((O) => O.contains(k));
      !C || R || (o == null || o(M), s == null || s(M), M.defaultPrevented || i == null || i());
    }, h), N = Vu((M) => {
      const k = M.target;
      [...c.branches].some((O) => O.contains(k)) || (a == null || a(M), s == null || s(M), M.defaultPrevented || i == null || i());
    }, h);
    return Iu((M) => {
      x === c.layers.size - 1 && (r == null || r(M), !M.defaultPrevented && i && (M.preventDefault(), i()));
    }, h), u.useEffect(() => {
      if (d)
        return n && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (La = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(d)), c.layers.add(d), Fa(), () => {
          n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = La);
        };
    }, [d, h, n, c]), u.useEffect(() => () => {
      d && (c.layers.delete(d), c.layersWithOutsidePointerEventsDisabled.delete(d), Fa());
    }, [d, c]), u.useEffect(() => {
      const M = () => p({});
      return document.addEventListener(vo, M), () => document.removeEventListener(vo, M);
    }, []), /* @__PURE__ */ f(
      q.div,
      {
        ...l,
        ref: v,
        style: {
          pointerEvents: y ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: V(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: V(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: V(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
kn.displayName = zu;
var Wu = "DismissableLayerBranch", $u = u.forwardRef((e, t) => {
  const n = u.useContext(Gi), r = u.useRef(null), o = te(t, r);
  return u.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ f(q.div, { ...e, ref: o });
});
$u.displayName = Wu;
function Bu(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ye(e), r = u.useRef(!1), o = u.useRef(() => {
  });
  return u.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let l = function() {
          Ui(
            Lu,
            n,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: i };
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
function Vu(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ye(e), r = u.useRef(!1);
  return u.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Ui(Fu, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Fa() {
  const e = new CustomEvent(vo);
  document.dispatchEvent(e);
}
function Ui(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Hi(o, a) : o.dispatchEvent(a);
}
var Yr = "focusScope.autoFocusOnMount", Gr = "focusScope.autoFocusOnUnmount", Wa = { bubbles: !1, cancelable: !0 }, Hu = "FocusScope", Mn = u.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, l] = u.useState(null), c = ye(o), d = ye(a), m = u.useRef(null), h = te(t, (g) => l(g)), p = u.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  u.useEffect(() => {
    if (r) {
      let g = function(y) {
        if (p.paused || !i) return;
        const C = y.target;
        i.contains(C) ? m.current = C : ft(m.current, { select: !0 });
      }, b = function(y) {
        if (p.paused || !i) return;
        const C = y.relatedTarget;
        C !== null && (i.contains(C) || ft(m.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const S of y)
            S.removedNodes.length > 0 && ft(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const x = new MutationObserver(w);
      return i && x.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, i, p.paused]), u.useEffect(() => {
    if (i) {
      Ba.add(p);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const w = new CustomEvent(Yr, Wa);
        i.addEventListener(Yr, c), i.dispatchEvent(w), w.defaultPrevented || (Yu(qu(ji(i)), { select: !0 }), document.activeElement === g && ft(i));
      }
      return () => {
        i.removeEventListener(Yr, c), setTimeout(() => {
          const w = new CustomEvent(Gr, Wa);
          i.addEventListener(Gr, d), i.dispatchEvent(w), w.defaultPrevented || ft(g ?? document.body, { select: !0 }), i.removeEventListener(Gr, d), Ba.remove(p);
        }, 0);
      };
    }
  }, [i, c, d, p]);
  const v = u.useCallback(
    (g) => {
      if (!n && !r || p.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, w = document.activeElement;
      if (b && w) {
        const x = g.currentTarget, [y, C] = Gu(x);
        y && C ? !g.shiftKey && w === C ? (g.preventDefault(), n && ft(y, { select: !0 })) : g.shiftKey && w === y && (g.preventDefault(), n && ft(C, { select: !0 })) : w === x && g.preventDefault();
      }
    },
    [n, r, p.paused]
  );
  return /* @__PURE__ */ f(q.div, { tabIndex: -1, ...s, ref: h, onKeyDown: v });
});
Mn.displayName = Hu;
function Yu(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (ft(r, { select: t }), document.activeElement !== n) return;
}
function Gu(e) {
  const t = ji(e), n = $a(t, e), r = $a(t.reverse(), e);
  return [n, r];
}
function ji(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function $a(e, t) {
  for (const n of e)
    if (!Uu(n, { upTo: t })) return n;
}
function Uu(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ju(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ft(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ju(e) && t && e.select();
  }
}
var Ba = Ku();
function Ku() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Va(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Va(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Va(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function qu(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Xu = "Portal", Nn = u.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = u.useState(!1);
  xe(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? pu.createPortal(/* @__PURE__ */ f(q.div, { ...r, ref: t }), s) : null;
});
Nn.displayName = Xu;
var Ur = 0;
function hr() {
  u.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ha()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ha()), Ur++, () => {
      Ur === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ur--;
    };
  }, []);
}
function Ha() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ue = function() {
  return Ue = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ue.apply(this, arguments);
};
function Ki(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Zu(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Xn = "right-scroll-bar-position", Zn = "width-before-scroll-bar", Qu = "with-scroll-bars-hidden", Ju = "--removed-body-scroll-bar-size";
function jr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function ef(e, t) {
  var n = Rt(function() {
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
var tf = typeof window < "u" ? u.useLayoutEffect : u.useEffect, Ya = /* @__PURE__ */ new WeakMap();
function nf(e, t) {
  var n = ef(null, function(r) {
    return e.forEach(function(o) {
      return jr(o, r);
    });
  });
  return tf(function() {
    var r = Ya.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || jr(i, null);
      }), a.forEach(function(i) {
        o.has(i) || jr(i, s);
      });
    }
    Ya.set(n, e);
  }, [e]), n;
}
function rf(e) {
  return e;
}
function of(e, t) {
  t === void 0 && (t = rf);
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
      }, c = function() {
        return Promise.resolve().then(l);
      };
      c(), n = {
        push: function(d) {
          s.push(d), c();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return o;
}
function af(e) {
  e === void 0 && (e = {});
  var t = of(null);
  return t.options = Ue({ async: !0, ssr: !1 }, e), t;
}
var qi = function(e) {
  var t = e.sideCar, n = Ki(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return u.createElement(r, Ue({}, n));
};
qi.isSideCarExport = !0;
function sf(e, t) {
  return e.useMedium(t), qi;
}
var Xi = af(), Kr = function() {
}, pr = u.forwardRef(function(e, t) {
  var n = u.useRef(null), r = u.useState({
    onScrollCapture: Kr,
    onWheelCapture: Kr,
    onTouchMoveCapture: Kr
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, l = e.className, c = e.removeScrollBar, d = e.enabled, m = e.shards, h = e.sideCar, p = e.noRelative, v = e.noIsolation, g = e.inert, b = e.allowPinchZoom, w = e.as, x = w === void 0 ? "div" : w, y = e.gapMode, C = Ki(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = h, N = nf([n, t]), M = Ue(Ue({}, C), o);
  return u.createElement(
    u.Fragment,
    null,
    d && u.createElement(S, { sideCar: Xi, removeScrollBar: c, shards: m, noRelative: p, noIsolation: v, inert: g, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: y }),
    s ? u.cloneElement(u.Children.only(i), Ue(Ue({}, M), { ref: N })) : u.createElement(x, Ue({}, M, { className: l, ref: N }), i)
  );
});
pr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
pr.classNames = {
  fullWidth: Zn,
  zeroRight: Xn
};
var lf = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function cf() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = lf();
  return t && e.setAttribute("nonce", t), e;
}
function df(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function uf(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ff = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = cf()) && (df(t, n), uf(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, mf = function() {
  var e = ff();
  return function(t, n) {
    u.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Zi = function() {
  var e = mf(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, hf = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, qr = function(e) {
  return parseInt(e || "", 10) || 0;
}, pf = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [qr(n), qr(r), qr(o)];
}, gf = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return hf;
  var t = pf(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, vf = Zi(), Gt = "data-scroll-locked", bf = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Qu, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Gt, `] {
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
  
  .`).concat(Xn, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Zn, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(Xn, " .").concat(Xn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Zn, " .").concat(Zn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Gt, `] {
    `).concat(Ju, ": ").concat(i, `px;
  }
`);
}, Ga = function() {
  var e = parseInt(document.body.getAttribute(Gt) || "0", 10);
  return isFinite(e) ? e : 0;
}, yf = function() {
  u.useEffect(function() {
    return document.body.setAttribute(Gt, (Ga() + 1).toString()), function() {
      var e = Ga() - 1;
      e <= 0 ? document.body.removeAttribute(Gt) : document.body.setAttribute(Gt, e.toString());
    };
  }, []);
}, wf = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  yf();
  var a = u.useMemo(function() {
    return gf(o);
  }, [o]);
  return u.createElement(vf, { styles: bf(a, !t, o, n ? "" : "!important") });
}, bo = !1;
if (typeof window < "u")
  try {
    var $n = Object.defineProperty({}, "passive", {
      get: function() {
        return bo = !0, !0;
      }
    });
    window.addEventListener("test", $n, $n), window.removeEventListener("test", $n, $n);
  } catch {
    bo = !1;
  }
var zt = bo ? { passive: !1 } : !1, xf = function(e) {
  return e.tagName === "TEXTAREA";
}, Qi = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !xf(e) && n[t] === "visible")
  );
}, Sf = function(e) {
  return Qi(e, "overflowY");
}, Cf = function(e) {
  return Qi(e, "overflowX");
}, Ua = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ji(e, r);
    if (o) {
      var a = es(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, kf = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Mf = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ji = function(e, t) {
  return e === "v" ? Sf(t) : Cf(t);
}, es = function(e, t) {
  return e === "v" ? kf(t) : Mf(t);
}, Nf = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Rf = function(e, t, n, r, o) {
  var a = Nf(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, l = t.contains(i), c = !1, d = s > 0, m = 0, h = 0;
  do {
    if (!i)
      break;
    var p = es(e, i), v = p[0], g = p[1], b = p[2], w = g - b - a * v;
    (v || w) && Ji(e, i) && (m += w, h += v);
    var x = i.parentNode;
    i = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (d && Math.abs(m) < 1 || !d && Math.abs(h) < 1) && (c = !0), c;
}, Bn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ja = function(e) {
  return [e.deltaX, e.deltaY];
}, Ka = function(e) {
  return e && "current" in e ? e.current : e;
}, Pf = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Ef = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Df = 0, Lt = [];
function Of(e) {
  var t = u.useRef([]), n = u.useRef([0, 0]), r = u.useRef(), o = u.useState(Df++)[0], a = u.useState(Zi)[0], s = u.useRef(e);
  u.useEffect(function() {
    s.current = e;
  }, [e]), u.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Zu([e.lockRef.current], (e.shards || []).map(Ka), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = u.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var w = Bn(g), x = n.current, y = "deltaX" in g ? g.deltaX : x[0] - w[0], C = "deltaY" in g ? g.deltaY : x[1] - w[1], S, N = g.target, M = Math.abs(y) > Math.abs(C) ? "h" : "v";
    if ("touches" in g && M === "h" && N.type === "range")
      return !1;
    var k = Ua(M, N);
    if (!k)
      return !0;
    if (k ? S = M : (S = M === "v" ? "h" : "v", k = Ua(M, N)), !k)
      return !1;
    if (!r.current && "changedTouches" in g && (y || C) && (r.current = S), !S)
      return !0;
    var R = r.current || S;
    return Rf(R, b, g, R === "h" ? y : C);
  }, []), l = u.useCallback(function(g) {
    var b = g;
    if (!(!Lt.length || Lt[Lt.length - 1] !== a)) {
      var w = "deltaY" in b ? ja(b) : Bn(b), x = t.current.filter(function(S) {
        return S.name === b.type && (S.target === b.target || b.target === S.shadowParent) && Pf(S.delta, w);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var y = (s.current.shards || []).map(Ka).filter(Boolean).filter(function(S) {
          return S.contains(b.target);
        }), C = y.length > 0 ? i(b, y[0]) : !s.current.noIsolation;
        C && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = u.useCallback(function(g, b, w, x) {
    var y = { name: g, delta: b, target: w, should: x, shadowParent: _f(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== y;
      });
    }, 1);
  }, []), d = u.useCallback(function(g) {
    n.current = Bn(g), r.current = void 0;
  }, []), m = u.useCallback(function(g) {
    c(g.type, ja(g), g.target, i(g, e.lockRef.current));
  }, []), h = u.useCallback(function(g) {
    c(g.type, Bn(g), g.target, i(g, e.lockRef.current));
  }, []);
  u.useEffect(function() {
    return Lt.push(a), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, zt), document.addEventListener("touchmove", l, zt), document.addEventListener("touchstart", d, zt), function() {
      Lt = Lt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", l, zt), document.removeEventListener("touchmove", l, zt), document.removeEventListener("touchstart", d, zt);
    };
  }, []);
  var p = e.removeScrollBar, v = e.inert;
  return u.createElement(
    u.Fragment,
    null,
    v ? u.createElement(a, { styles: Ef(o) }) : null,
    p ? u.createElement(wf, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function _f(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Tf = sf(Xi, Of);
var Rn = u.forwardRef(function(e, t) {
  return u.createElement(pr, Ue({}, e, { ref: t, sideCar: Tf }));
});
Rn.classNames = pr.classNames;
var Af = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ft = /* @__PURE__ */ new WeakMap(), Vn = /* @__PURE__ */ new WeakMap(), Hn = {}, Xr = 0, ts = function(e) {
  return e && (e.host || ts(e.parentNode));
}, If = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ts(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, zf = function(e, t, n, r) {
  var o = If(t, Array.isArray(e) ? e : [e]);
  Hn[n] || (Hn[n] = /* @__PURE__ */ new WeakMap());
  var a = Hn[n], s = [], i = /* @__PURE__ */ new Set(), l = new Set(o), c = function(m) {
    !m || i.has(m) || (i.add(m), c(m.parentNode));
  };
  o.forEach(c);
  var d = function(m) {
    !m || l.has(m) || Array.prototype.forEach.call(m.children, function(h) {
      if (i.has(h))
        d(h);
      else
        try {
          var p = h.getAttribute(r), v = p !== null && p !== "false", g = (Ft.get(h) || 0) + 1, b = (a.get(h) || 0) + 1;
          Ft.set(h, g), a.set(h, b), s.push(h), g === 1 && v && Vn.set(h, !0), b === 1 && h.setAttribute(n, "true"), v || h.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", h, w);
        }
    });
  };
  return d(t), i.clear(), Xr++, function() {
    s.forEach(function(m) {
      var h = Ft.get(m) - 1, p = a.get(m) - 1;
      Ft.set(m, h), a.set(m, p), h || (Vn.has(m) || m.removeAttribute(r), Vn.delete(m)), p || m.removeAttribute(n);
    }), Xr--, Xr || (Ft = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), Vn = /* @__PURE__ */ new WeakMap(), Hn = {});
  };
}, gr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Af(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), zf(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, vr = "Dialog", [ns, $S] = Ve(vr), [Lf, He] = ns(vr), rs = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = u.useRef(null), l = u.useRef(null), [c, d] = at({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: vr
  });
  return /* @__PURE__ */ f(
    Lf,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: we(),
      titleId: we(),
      descriptionId: we(),
      open: c,
      onOpenChange: d,
      onOpenToggle: u.useCallback(() => d((m) => !m), [d]),
      modal: s,
      children: n
    }
  );
};
rs.displayName = vr;
var os = "DialogTrigger", Ff = u.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(os, n), a = te(t, o.triggerRef);
    return /* @__PURE__ */ f(
      q.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Xo(o.open),
        ...r,
        ref: a,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ff.displayName = os;
var Ko = "DialogPortal", [Wf, as] = ns(Ko, {
  forceMount: void 0
}), is = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = He(Ko, t);
  return /* @__PURE__ */ f(Wf, { scope: t, forceMount: n, children: u.Children.map(r, (s) => /* @__PURE__ */ f(Pe, { present: n || a.open, children: /* @__PURE__ */ f(Nn, { asChild: !0, container: o, children: s }) })) });
};
is.displayName = Ko;
var Jn = "DialogOverlay", ss = u.forwardRef(
  (e, t) => {
    const n = as(Jn, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = He(Jn, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ f(Pe, { present: r || a.open, children: /* @__PURE__ */ f(Bf, { ...o, ref: t }) }) : null;
  }
);
ss.displayName = Jn;
var $f = /* @__PURE__ */ ht("DialogOverlay.RemoveScroll"), Bf = u.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Jn, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ f(Rn, { as: $f, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ f(
        q.div,
        {
          "data-state": Xo(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Pt = "DialogContent", ls = u.forwardRef(
  (e, t) => {
    const n = as(Pt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = He(Pt, e.__scopeDialog);
    return /* @__PURE__ */ f(Pe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ f(Vf, { ...o, ref: t }) : /* @__PURE__ */ f(Hf, { ...o, ref: t }) });
  }
);
ls.displayName = Pt;
var Vf = u.forwardRef(
  (e, t) => {
    const n = He(Pt, e.__scopeDialog), r = u.useRef(null), o = te(t, n.contentRef, r);
    return u.useEffect(() => {
      const a = r.current;
      if (a) return gr(a);
    }, []), /* @__PURE__ */ f(
      cs,
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
), Hf = u.forwardRef(
  (e, t) => {
    const n = He(Pt, e.__scopeDialog), r = u.useRef(!1), o = u.useRef(!1);
    return /* @__PURE__ */ f(
      cs,
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
          var l, c;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((c = n.triggerRef.current) == null ? void 0 : c.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), cs = u.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = He(Pt, n), l = u.useRef(null), c = te(t, l);
    return hr(), /* @__PURE__ */ T(Me, { children: [
      /* @__PURE__ */ f(
        Mn,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ f(
            kn,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Xo(i.open),
              ...s,
              ref: c,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ T(Me, { children: [
        /* @__PURE__ */ f(jf, { titleId: i.titleId }),
        /* @__PURE__ */ f(qf, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), qo = "DialogTitle", Yf = u.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(qo, n);
    return /* @__PURE__ */ f(q.h2, { id: o.titleId, ...r, ref: t });
  }
);
Yf.displayName = qo;
var ds = "DialogDescription", Gf = u.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(ds, n);
    return /* @__PURE__ */ f(q.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Gf.displayName = ds;
var us = "DialogClose", Uf = u.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(us, n);
    return /* @__PURE__ */ f(
      q.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Uf.displayName = us;
function Xo(e) {
  return e ? "open" : "closed";
}
var fs = "DialogTitleWarning", [BS, ms] = ku(fs, {
  contentName: Pt,
  titleName: qo,
  docsSlug: "dialog"
}), jf = ({ titleId: e }) => {
  const t = ms(fs), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return u.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, Kf = "DialogDescriptionWarning", qf = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${ms(Kf).contentName}}.`;
  return u.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Xf = rs, Zf = is, Qf = ss, Jf = ls;
function Zo(e) {
  const t = u.useRef({ value: e, previous: e });
  return u.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function Qo(e) {
  const [t, n] = u.useState(void 0);
  return xe(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const l = a.borderBoxSize, c = Array.isArray(l) ? l[0] : l;
          s = c.inlineSize, i = c.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
const em = ["top", "right", "bottom", "left"], pt = Math.min, Oe = Math.max, er = Math.round, Yn = Math.floor, qe = (e) => ({
  x: e,
  y: e
}), tm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, nm = {
  start: "end",
  end: "start"
};
function yo(e, t, n) {
  return Oe(e, pt(t, n));
}
function it(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function st(e) {
  return e.split("-")[0];
}
function Zt(e) {
  return e.split("-")[1];
}
function Jo(e) {
  return e === "x" ? "y" : "x";
}
function ea(e) {
  return e === "y" ? "height" : "width";
}
const rm = /* @__PURE__ */ new Set(["top", "bottom"]);
function je(e) {
  return rm.has(st(e)) ? "y" : "x";
}
function ta(e) {
  return Jo(je(e));
}
function om(e, t, n) {
  n === void 0 && (n = !1);
  const r = Zt(e), o = ta(e), a = ea(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = tr(s)), [s, tr(s)];
}
function am(e) {
  const t = tr(e);
  return [wo(e), t, wo(t)];
}
function wo(e) {
  return e.replace(/start|end/g, (t) => nm[t]);
}
const qa = ["left", "right"], Xa = ["right", "left"], im = ["top", "bottom"], sm = ["bottom", "top"];
function lm(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Xa : qa : t ? qa : Xa;
    case "left":
    case "right":
      return t ? im : sm;
    default:
      return [];
  }
}
function cm(e, t, n, r) {
  const o = Zt(e);
  let a = lm(st(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(wo)))), a;
}
function tr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => tm[t]);
}
function dm(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function hs(e) {
  return typeof e != "number" ? dm(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function nr(e) {
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
function Za(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = je(t), s = ta(t), i = ea(s), l = st(t), c = a === "y", d = r.x + r.width / 2 - o.width / 2, m = r.y + r.height / 2 - o.height / 2, h = r[i] / 2 - o[i] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: m
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: m
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Zt(t)) {
    case "start":
      p[s] -= h * (n && c ? -1 : 1);
      break;
    case "end":
      p[s] += h * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const um = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let c = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: m
  } = Za(c, r, l), h = r, p = {}, v = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: w
    } = i[g], {
      x,
      y,
      data: C,
      reset: S
    } = await w({
      x: d,
      y: m,
      initialPlacement: r,
      placement: h,
      strategy: o,
      middlewareData: p,
      rects: c,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = x ?? d, m = y ?? m, p = {
      ...p,
      [b]: {
        ...p[b],
        ...C
      }
    }, S && v <= 50 && (v++, typeof S == "object" && (S.placement && (h = S.placement), S.rects && (c = S.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: d,
      y: m
    } = Za(c, h, l)), g = -1);
  }
  return {
    x: d,
    y: m,
    placement: h,
    strategy: o,
    middlewareData: p
  };
};
async function pn(e, t) {
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
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: m = "floating",
    altBoundary: h = !1,
    padding: p = 0
  } = it(t, e), v = hs(p), b = i[h ? m === "floating" ? "reference" : "floating" : m], w = nr(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: l
  })), x = m === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), C = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = nr(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: y,
    strategy: l
  }) : x);
  return {
    top: (w.top - S.top + v.top) / C.y,
    bottom: (S.bottom - w.bottom + v.bottom) / C.y,
    left: (w.left - S.left + v.left) / C.x,
    right: (S.right - w.right + v.right) / C.x
  };
}
const fm = (e) => ({
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
      element: c,
      padding: d = 0
    } = it(e, t) || {};
    if (c == null)
      return {};
    const m = hs(d), h = {
      x: n,
      y: r
    }, p = ta(o), v = ea(p), g = await s.getDimensions(c), b = p === "y", w = b ? "top" : "left", x = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", C = a.reference[v] + a.reference[p] - h[p] - a.floating[v], S = h[p] - a.reference[p], N = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c));
    let M = N ? N[y] : 0;
    (!M || !await (s.isElement == null ? void 0 : s.isElement(N))) && (M = i.floating[y] || a.floating[v]);
    const k = C / 2 - S / 2, R = M / 2 - g[v] / 2 - 1, O = pt(m[w], R), _ = pt(m[x], R), I = O, Y = M - g[v] - _, H = M / 2 - g[v] / 2 + k, j = yo(I, H, Y), $ = !l.arrow && Zt(o) != null && H !== j && a.reference[v] / 2 - (H < I ? O : _) - g[v] / 2 < 0, K = $ ? H < I ? H - I : H - Y : 0;
    return {
      [p]: h[p] + K,
      data: {
        [p]: j,
        centerOffset: H - j - K,
        ...$ && {
          alignmentOffset: K
        }
      },
      reset: $
    };
  }
}), mm = function(e) {
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
        elements: c
      } = t, {
        mainAxis: d = !0,
        crossAxis: m = !0,
        fallbackPlacements: h,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...b
      } = it(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const w = st(o), x = je(i), y = st(i) === i, C = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), S = h || (y || !g ? [tr(i)] : am(i)), N = v !== "none";
      !h && N && S.push(...cm(i, g, v, C));
      const M = [i, ...S], k = await pn(t, b), R = [];
      let O = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (d && R.push(k[w]), m) {
        const H = om(o, s, C);
        R.push(k[H[0]], k[H[1]]);
      }
      if (O = [...O, {
        placement: o,
        overflows: R
      }], !R.every((H) => H <= 0)) {
        var _, I;
        const H = (((_ = a.flip) == null ? void 0 : _.index) || 0) + 1, j = M[H];
        if (j && (!(m === "alignment" ? x !== je(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        O.every((P) => je(P.placement) === x ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: H,
              overflows: O
            },
            reset: {
              placement: j
            }
          };
        let $ = (I = O.filter((K) => K.overflows[0] <= 0).sort((K, P) => K.overflows[1] - P.overflows[1])[0]) == null ? void 0 : I.placement;
        if (!$)
          switch (p) {
            case "bestFit": {
              var Y;
              const K = (Y = O.filter((P) => {
                if (N) {
                  const D = je(P.placement);
                  return D === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((D) => D > 0).reduce((D, Z) => D + Z, 0)]).sort((P, D) => P[1] - D[1])[0]) == null ? void 0 : Y[0];
              K && ($ = K);
              break;
            }
            case "initialPlacement":
              $ = i;
              break;
          }
        if (o !== $)
          return {
            reset: {
              placement: $
            }
          };
      }
      return {};
    }
  };
};
function Qa(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ja(e) {
  return em.some((t) => e[t] >= 0);
}
const hm = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = it(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await pn(t, {
            ...o,
            elementContext: "reference"
          }), s = Qa(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: Ja(s)
            }
          };
        }
        case "escaped": {
          const a = await pn(t, {
            ...o,
            altBoundary: !0
          }), s = Qa(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: Ja(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, ps = /* @__PURE__ */ new Set(["left", "top"]);
async function pm(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = st(n), i = Zt(n), l = je(n) === "y", c = ps.has(s) ? -1 : 1, d = a && l ? -1 : 1, m = it(t, e);
  let {
    mainAxis: h,
    crossAxis: p,
    alignmentAxis: v
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return i && typeof v == "number" && (p = i === "end" ? v * -1 : v), l ? {
    x: p * d,
    y: h * c
  } : {
    x: h * c,
    y: p * d
  };
}
const gm = function(e) {
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
      } = t, l = await pm(t, e);
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
}, vm = function(e) {
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
      } = it(e, t), c = {
        x: n,
        y: r
      }, d = await pn(t, l), m = je(st(o)), h = Jo(m);
      let p = c[h], v = c[m];
      if (a) {
        const b = h === "y" ? "top" : "left", w = h === "y" ? "bottom" : "right", x = p + d[b], y = p - d[w];
        p = yo(x, p, y);
      }
      if (s) {
        const b = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", x = v + d[b], y = v - d[w];
        v = yo(x, v, y);
      }
      const g = i.fn({
        ...t,
        [h]: p,
        [m]: v
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [h]: a,
            [m]: s
          }
        }
      };
    }
  };
}, bm = function(e) {
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
        crossAxis: c = !0
      } = it(e, t), d = {
        x: n,
        y: r
      }, m = je(o), h = Jo(m);
      let p = d[h], v = d[m];
      const g = it(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const y = h === "y" ? "height" : "width", C = a.reference[h] - a.floating[y] + b.mainAxis, S = a.reference[h] + a.reference[y] - b.mainAxis;
        p < C ? p = C : p > S && (p = S);
      }
      if (c) {
        var w, x;
        const y = h === "y" ? "width" : "height", C = ps.has(st(o)), S = a.reference[m] - a.floating[y] + (C && ((w = s.offset) == null ? void 0 : w[m]) || 0) + (C ? 0 : b.crossAxis), N = a.reference[m] + a.reference[y] + (C ? 0 : ((x = s.offset) == null ? void 0 : x[m]) || 0) - (C ? b.crossAxis : 0);
        v < S ? v = S : v > N && (v = N);
      }
      return {
        [h]: p,
        [m]: v
      };
    }
  };
}, ym = function(e) {
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
        ...c
      } = it(e, t), d = await pn(t, c), m = st(o), h = Zt(o), p = je(o) === "y", {
        width: v,
        height: g
      } = a.floating;
      let b, w;
      m === "top" || m === "bottom" ? (b = m, w = h === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = m, b = h === "end" ? "top" : "bottom");
      const x = g - d.top - d.bottom, y = v - d.left - d.right, C = pt(g - d[b], x), S = pt(v - d[w], y), N = !t.middlewareData.shift;
      let M = C, k = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (k = y), (r = t.middlewareData.shift) != null && r.enabled.y && (M = x), N && !h) {
        const O = Oe(d.left, 0), _ = Oe(d.right, 0), I = Oe(d.top, 0), Y = Oe(d.bottom, 0);
        p ? k = v - 2 * (O !== 0 || _ !== 0 ? O + _ : Oe(d.left, d.right)) : M = g - 2 * (I !== 0 || Y !== 0 ? I + Y : Oe(d.top, d.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: M
      });
      const R = await s.getDimensions(i.floating);
      return v !== R.width || g !== R.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function br() {
  return typeof window < "u";
}
function Qt(e) {
  return gs(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Te(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ze(e) {
  var t;
  return (t = (gs(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function gs(e) {
  return br() ? e instanceof Node || e instanceof Te(e).Node : !1;
}
function $e(e) {
  return br() ? e instanceof Element || e instanceof Te(e).Element : !1;
}
function Xe(e) {
  return br() ? e instanceof HTMLElement || e instanceof Te(e).HTMLElement : !1;
}
function ei(e) {
  return !br() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Te(e).ShadowRoot;
}
const wm = /* @__PURE__ */ new Set(["inline", "contents"]);
function Pn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Be(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !wm.has(o);
}
const xm = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Sm(e) {
  return xm.has(Qt(e));
}
const Cm = [":popover-open", ":modal"];
function yr(e) {
  return Cm.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const km = ["transform", "translate", "scale", "rotate", "perspective"], Mm = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Nm = ["paint", "layout", "strict", "content"];
function na(e) {
  const t = ra(), n = $e(e) ? Be(e) : e;
  return km.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Mm.some((r) => (n.willChange || "").includes(r)) || Nm.some((r) => (n.contain || "").includes(r));
}
function Rm(e) {
  let t = gt(e);
  for (; Xe(t) && !jt(t); ) {
    if (na(t))
      return t;
    if (yr(t))
      return null;
    t = gt(t);
  }
  return null;
}
function ra() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Pm = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function jt(e) {
  return Pm.has(Qt(e));
}
function Be(e) {
  return Te(e).getComputedStyle(e);
}
function wr(e) {
  return $e(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function gt(e) {
  if (Qt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ei(e) && e.host || // Fallback.
    Ze(e)
  );
  return ei(t) ? t.host : t;
}
function vs(e) {
  const t = gt(e);
  return jt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Xe(t) && Pn(t) ? t : vs(t);
}
function gn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = vs(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Te(o);
  if (a) {
    const i = xo(s);
    return t.concat(s, s.visualViewport || [], Pn(o) ? o : [], i && n ? gn(i) : []);
  }
  return t.concat(o, gn(o, [], n));
}
function xo(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function bs(e) {
  const t = Be(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Xe(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = er(n) !== a || er(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function oa(e) {
  return $e(e) ? e : e.contextElement;
}
function Ut(e) {
  const t = oa(e);
  if (!Xe(t))
    return qe(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = bs(t);
  let s = (a ? er(n.width) : n.width) / r, i = (a ? er(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const Em = /* @__PURE__ */ qe(0);
function ys(e) {
  const t = Te(e);
  return !ra() || !t.visualViewport ? Em : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Dm(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Te(e) ? !1 : t;
}
function Et(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = oa(e);
  let s = qe(1);
  t && (r ? $e(r) && (s = Ut(r)) : s = Ut(e));
  const i = Dm(a, n, r) ? ys(a) : qe(0);
  let l = (o.left + i.x) / s.x, c = (o.top + i.y) / s.y, d = o.width / s.x, m = o.height / s.y;
  if (a) {
    const h = Te(a), p = r && $e(r) ? Te(r) : r;
    let v = h, g = xo(v);
    for (; g && r && p !== v; ) {
      const b = Ut(g), w = g.getBoundingClientRect(), x = Be(g), y = w.left + (g.clientLeft + parseFloat(x.paddingLeft)) * b.x, C = w.top + (g.clientTop + parseFloat(x.paddingTop)) * b.y;
      l *= b.x, c *= b.y, d *= b.x, m *= b.y, l += y, c += C, v = Te(g), g = xo(v);
    }
  }
  return nr({
    width: d,
    height: m,
    x: l,
    y: c
  });
}
function xr(e, t) {
  const n = wr(e).scrollLeft;
  return t ? t.left + n : Et(Ze(e)).left + n;
}
function ws(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - xr(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function Om(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = Ze(r), i = t ? yr(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = qe(1);
  const d = qe(0), m = Xe(r);
  if ((m || !m && !a) && ((Qt(r) !== "body" || Pn(s)) && (l = wr(r)), Xe(r))) {
    const p = Et(r);
    c = Ut(r), d.x = p.x + r.clientLeft, d.y = p.y + r.clientTop;
  }
  const h = s && !m && !a ? ws(s, l) : qe(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + d.x + h.x,
    y: n.y * c.y - l.scrollTop * c.y + d.y + h.y
  };
}
function _m(e) {
  return Array.from(e.getClientRects());
}
function Tm(e) {
  const t = Ze(e), n = wr(e), r = e.ownerDocument.body, o = Oe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Oe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + xr(e);
  const i = -n.scrollTop;
  return Be(r).direction === "rtl" && (s += Oe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const ti = 25;
function Am(e, t) {
  const n = Te(e), r = Ze(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, l = 0;
  if (o) {
    a = o.width, s = o.height;
    const d = ra();
    (!d || d && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  const c = xr(r);
  if (c <= 0) {
    const d = r.ownerDocument, m = d.body, h = getComputedStyle(m), p = d.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, v = Math.abs(r.clientWidth - m.clientWidth - p);
    v <= ti && (a -= v);
  } else c <= ti && (a += c);
  return {
    width: a,
    height: s,
    x: i,
    y: l
  };
}
const Im = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function zm(e, t) {
  const n = Et(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Xe(e) ? Ut(e) : qe(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, l = o * a.x, c = r * a.y;
  return {
    width: s,
    height: i,
    x: l,
    y: c
  };
}
function ni(e, t, n) {
  let r;
  if (t === "viewport")
    r = Am(e, n);
  else if (t === "document")
    r = Tm(Ze(e));
  else if ($e(t))
    r = zm(t, n);
  else {
    const o = ys(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return nr(r);
}
function xs(e, t) {
  const n = gt(e);
  return n === t || !$e(n) || jt(n) ? !1 : Be(n).position === "fixed" || xs(n, t);
}
function Lm(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = gn(e, [], !1).filter((i) => $e(i) && Qt(i) !== "body"), o = null;
  const a = Be(e).position === "fixed";
  let s = a ? gt(e) : e;
  for (; $e(s) && !jt(s); ) {
    const i = Be(s), l = na(s);
    !l && i.position === "fixed" && (o = null), (a ? !l && !o : !l && i.position === "static" && !!o && Im.has(o.position) || Pn(s) && !l && xs(e, s)) ? r = r.filter((d) => d !== s) : o = i, s = gt(s);
  }
  return t.set(e, r), r;
}
function Fm(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? yr(t) ? [] : Lm(t, this._c) : [].concat(n), r], i = s[0], l = s.reduce((c, d) => {
    const m = ni(t, d, o);
    return c.top = Oe(m.top, c.top), c.right = pt(m.right, c.right), c.bottom = pt(m.bottom, c.bottom), c.left = Oe(m.left, c.left), c;
  }, ni(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Wm(e) {
  const {
    width: t,
    height: n
  } = bs(e);
  return {
    width: t,
    height: n
  };
}
function $m(e, t, n) {
  const r = Xe(t), o = Ze(t), a = n === "fixed", s = Et(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = qe(0);
  function c() {
    l.x = xr(o);
  }
  if (r || !r && !a)
    if ((Qt(t) !== "body" || Pn(o)) && (i = wr(t)), r) {
      const p = Et(t, !0, a, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && c();
  a && !r && o && c();
  const d = o && !r && !a ? ws(o, i) : qe(0), m = s.left + i.scrollLeft - l.x - d.x, h = s.top + i.scrollTop - l.y - d.y;
  return {
    x: m,
    y: h,
    width: s.width,
    height: s.height
  };
}
function Zr(e) {
  return Be(e).position === "static";
}
function ri(e, t) {
  if (!Xe(e) || Be(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Ze(e) === n && (n = n.ownerDocument.body), n;
}
function Ss(e, t) {
  const n = Te(e);
  if (yr(e))
    return n;
  if (!Xe(e)) {
    let o = gt(e);
    for (; o && !jt(o); ) {
      if ($e(o) && !Zr(o))
        return o;
      o = gt(o);
    }
    return n;
  }
  let r = ri(e, t);
  for (; r && Sm(r) && Zr(r); )
    r = ri(r, t);
  return r && jt(r) && Zr(r) && !na(r) ? n : r || Rm(e) || n;
}
const Bm = async function(e) {
  const t = this.getOffsetParent || Ss, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: $m(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Vm(e) {
  return Be(e).direction === "rtl";
}
const Hm = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Om,
  getDocumentElement: Ze,
  getClippingRect: Fm,
  getOffsetParent: Ss,
  getElementRects: Bm,
  getClientRects: _m,
  getDimensions: Wm,
  getScale: Ut,
  isElement: $e,
  isRTL: Vm
};
function Cs(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ym(e, t) {
  let n = null, r;
  const o = Ze(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), a();
    const c = e.getBoundingClientRect(), {
      left: d,
      top: m,
      width: h,
      height: p
    } = c;
    if (i || t(), !h || !p)
      return;
    const v = Yn(m), g = Yn(o.clientWidth - (d + h)), b = Yn(o.clientHeight - (m + p)), w = Yn(d), y = {
      rootMargin: -v + "px " + -g + "px " + -b + "px " + -w + "px",
      threshold: Oe(0, pt(1, l)) || 1
    };
    let C = !0;
    function S(N) {
      const M = N[0].intersectionRatio;
      if (M !== l) {
        if (!C)
          return s();
        M ? s(!1, M) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      M === 1 && !Cs(c, e.getBoundingClientRect()) && s(), C = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, y);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function Gm(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, c = oa(e), d = o || a ? [...c ? gn(c) : [], ...gn(t)] : [];
  d.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), a && w.addEventListener("resize", n);
  });
  const m = c && i ? Ym(c, n) : null;
  let h = -1, p = null;
  s && (p = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === c && p && (p.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var y;
      (y = p) == null || y.observe(t);
    })), n();
  }), c && !l && p.observe(c), p.observe(t));
  let v, g = l ? Et(e) : null;
  l && b();
  function b() {
    const w = Et(e);
    g && !Cs(g, w) && n(), g = w, v = requestAnimationFrame(b);
  }
  return n(), () => {
    var w;
    d.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), m == null || m(), (w = p) == null || w.disconnect(), p = null, l && cancelAnimationFrame(v);
  };
}
const Um = gm, jm = vm, Km = mm, qm = ym, Xm = hm, oi = fm, Zm = bm, Qm = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Hm,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return um(e, t, {
    ...o,
    platform: a
  });
};
var Jm = typeof document < "u", eh = function() {
}, Qn = Jm ? Li : eh;
function rr(e, t) {
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
        if (!rr(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !rr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ks(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ai(e, t) {
  const n = ks(e);
  return Math.round(t * n) / n;
}
function Qr(e) {
  const t = u.useRef(e);
  return Qn(() => {
    t.current = e;
  }), t;
}
function th(e) {
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
    open: c
  } = e, [d, m] = u.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, p] = u.useState(r);
  rr(h, r) || p(r);
  const [v, g] = u.useState(null), [b, w] = u.useState(null), x = u.useCallback((P) => {
    P !== N.current && (N.current = P, g(P));
  }, []), y = u.useCallback((P) => {
    P !== M.current && (M.current = P, w(P));
  }, []), C = a || v, S = s || b, N = u.useRef(null), M = u.useRef(null), k = u.useRef(d), R = l != null, O = Qr(l), _ = Qr(o), I = Qr(c), Y = u.useCallback(() => {
    if (!N.current || !M.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: h
    };
    _.current && (P.platform = _.current), Qm(N.current, M.current, P).then((D) => {
      const Z = {
        ...D,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: I.current !== !1
      };
      H.current && !rr(k.current, Z) && (k.current = Z, fr.flushSync(() => {
        m(Z);
      }));
    });
  }, [h, t, n, _, I]);
  Qn(() => {
    c === !1 && k.current.isPositioned && (k.current.isPositioned = !1, m((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [c]);
  const H = u.useRef(!1);
  Qn(() => (H.current = !0, () => {
    H.current = !1;
  }), []), Qn(() => {
    if (C && (N.current = C), S && (M.current = S), C && S) {
      if (O.current)
        return O.current(C, S, Y);
      Y();
    }
  }, [C, S, Y, O, R]);
  const j = u.useMemo(() => ({
    reference: N,
    floating: M,
    setReference: x,
    setFloating: y
  }), [x, y]), $ = u.useMemo(() => ({
    reference: C,
    floating: S
  }), [C, S]), K = u.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!$.floating)
      return P;
    const D = ai($.floating, d.x), Z = ai($.floating, d.y);
    return i ? {
      ...P,
      transform: "translate(" + D + "px, " + Z + "px)",
      ...ks($.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: D,
      top: Z
    };
  }, [n, i, $.floating, d.x, d.y]);
  return u.useMemo(() => ({
    ...d,
    update: Y,
    refs: j,
    elements: $,
    floatingStyles: K
  }), [d, Y, j, $, K]);
}
const nh = (e) => {
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
      return r && t(r) ? r.current != null ? oi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? oi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, rh = (e, t) => ({
  ...Um(e),
  options: [e, t]
}), oh = (e, t) => ({
  ...jm(e),
  options: [e, t]
}), ah = (e, t) => ({
  ...Zm(e),
  options: [e, t]
}), ih = (e, t) => ({
  ...Km(e),
  options: [e, t]
}), sh = (e, t) => ({
  ...qm(e),
  options: [e, t]
}), lh = (e, t) => ({
  ...Xm(e),
  options: [e, t]
}), ch = (e, t) => ({
  ...nh(e),
  options: [e, t]
});
var dh = "Arrow", Ms = u.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ f(
    q.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ f("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Ms.displayName = dh;
var uh = Ms, aa = "Popper", [Ns, Jt] = Ve(aa), [fh, Rs] = Ns(aa), Ps = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = u.useState(null);
  return /* @__PURE__ */ f(fh, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Ps.displayName = aa;
var Es = "PopperAnchor", Ds = u.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = Rs(Es, n), s = u.useRef(null), i = te(t, s), l = u.useRef(null);
    return u.useEffect(() => {
      const c = l.current;
      l.current = (r == null ? void 0 : r.current) || s.current, c !== l.current && a.onAnchorChange(l.current);
    }), r ? null : /* @__PURE__ */ f(q.div, { ...o, ref: i });
  }
);
Ds.displayName = Es;
var ia = "PopperContent", [mh, hh] = Ns(ia), Os = u.forwardRef(
  (e, t) => {
    var A, ee, Q, re, se, ie;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: c = [],
      collisionPadding: d = 0,
      sticky: m = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: p = "optimized",
      onPlaced: v,
      ...g
    } = e, b = Rs(ia, n), [w, x] = u.useState(null), y = te(t, (Re) => x(Re)), [C, S] = u.useState(null), N = Qo(C), M = (N == null ? void 0 : N.width) ?? 0, k = (N == null ? void 0 : N.height) ?? 0, R = r + (a !== "center" ? "-" + a : ""), O = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, _ = Array.isArray(c) ? c : [c], I = _.length > 0, Y = {
      padding: O,
      boundary: _.filter(gh),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: I
    }, { refs: H, floatingStyles: j, placement: $, isPositioned: K, middlewareData: P } = th({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: R,
      whileElementsMounted: (...Re) => Gm(...Re, {
        animationFrame: p === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        rh({ mainAxis: o + k, alignmentAxis: s }),
        l && oh({
          mainAxis: !0,
          crossAxis: !1,
          limiter: m === "partial" ? ah() : void 0,
          ...Y
        }),
        l && ih({ ...Y }),
        sh({
          ...Y,
          apply: ({ elements: Re, rects: Ee, availableWidth: St, availableHeight: Ct }) => {
            const { width: kt, height: Wr } = Ee.reference, It = Re.floating.style;
            It.setProperty("--radix-popper-available-width", `${St}px`), It.setProperty("--radix-popper-available-height", `${Ct}px`), It.setProperty("--radix-popper-anchor-width", `${kt}px`), It.setProperty("--radix-popper-anchor-height", `${Wr}px`);
          }
        }),
        C && ch({ element: C, padding: i }),
        vh({ arrowWidth: M, arrowHeight: k }),
        h && lh({ strategy: "referenceHidden", ...Y })
      ]
    }), [D, Z] = As($), ne = ye(v);
    xe(() => {
      K && (ne == null || ne());
    }, [K, ne]);
    const E = (A = P.arrow) == null ? void 0 : A.x, F = (ee = P.arrow) == null ? void 0 : ee.y, z = ((Q = P.arrow) == null ? void 0 : Q.centerOffset) !== 0, [W, J] = u.useState();
    return xe(() => {
      w && J(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ f(
      "div",
      {
        ref: H.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...j,
          transform: K ? j.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: W,
          "--radix-popper-transform-origin": [
            (re = P.transformOrigin) == null ? void 0 : re.x,
            (se = P.transformOrigin) == null ? void 0 : se.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ie = P.hide) == null ? void 0 : ie.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ f(
          mh,
          {
            scope: n,
            placedSide: D,
            onArrowChange: S,
            arrowX: E,
            arrowY: F,
            shouldHideArrow: z,
            children: /* @__PURE__ */ f(
              q.div,
              {
                "data-side": D,
                "data-align": Z,
                ...g,
                ref: y,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: K ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Os.displayName = ia;
var _s = "PopperArrow", ph = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ts = u.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = hh(_s, r), s = ph[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ f(
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
        children: /* @__PURE__ */ f(
          uh,
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
Ts.displayName = _s;
function gh(e) {
  return e !== null;
}
var vh = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, w, x;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [c, d] = As(n), m = { start: "0%", center: "50%", end: "100%" }[d], h = (((w = o.arrow) == null ? void 0 : w.x) ?? 0) + i / 2, p = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + l / 2;
    let v = "", g = "";
    return c === "bottom" ? (v = s ? m : `${h}px`, g = `${-l}px`) : c === "top" ? (v = s ? m : `${h}px`, g = `${r.floating.height + l}px`) : c === "right" ? (v = `${-l}px`, g = s ? m : `${p}px`) : c === "left" && (v = `${r.floating.width + l}px`, g = s ? m : `${p}px`), { data: { x: v, y: g } };
  }
});
function As(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Sr = Ps, Cr = Ds, sa = Os, la = Ts, Jr = "rovingFocusGroup.onEntryFocus", bh = { bubbles: !1, cancelable: !0 }, En = "RovingFocusGroup", [So, Is, yh] = mr(En), [wh, zs] = Ve(
  En,
  [yh]
), [xh, Sh] = wh(En), Ls = u.forwardRef(
  (e, t) => /* @__PURE__ */ f(So.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(So.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ f(Ch, { ...e, ref: t }) }) })
);
Ls.displayName = En;
var Ch = u.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: l,
    onEntryFocus: c,
    preventScrollOnEntryFocus: d = !1,
    ...m
  } = e, h = u.useRef(null), p = te(t, h), v = Cn(a), [g, b] = at({
    prop: s,
    defaultProp: i ?? null,
    onChange: l,
    caller: En
  }), [w, x] = u.useState(!1), y = ye(c), C = Is(n), S = u.useRef(!1), [N, M] = u.useState(0);
  return u.useEffect(() => {
    const k = h.current;
    if (k)
      return k.addEventListener(Jr, y), () => k.removeEventListener(Jr, y);
  }, [y]), /* @__PURE__ */ f(
    xh,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: g,
      onItemFocus: u.useCallback(
        (k) => b(k),
        [b]
      ),
      onItemShiftTab: u.useCallback(() => x(!0), []),
      onFocusableItemAdd: u.useCallback(
        () => M((k) => k + 1),
        []
      ),
      onFocusableItemRemove: u.useCallback(
        () => M((k) => k - 1),
        []
      ),
      children: /* @__PURE__ */ f(
        q.div,
        {
          tabIndex: w || N === 0 ? -1 : 0,
          "data-orientation": r,
          ...m,
          ref: p,
          style: { outline: "none", ...e.style },
          onMouseDown: V(e.onMouseDown, () => {
            S.current = !0;
          }),
          onFocus: V(e.onFocus, (k) => {
            const R = !S.current;
            if (k.target === k.currentTarget && R && !w) {
              const O = new CustomEvent(Jr, bh);
              if (k.currentTarget.dispatchEvent(O), !O.defaultPrevented) {
                const _ = C().filter(($) => $.focusable), I = _.find(($) => $.active), Y = _.find(($) => $.id === g), j = [I, Y, ..._].filter(
                  Boolean
                ).map(($) => $.ref.current);
                $s(j, d);
              }
            }
            S.current = !1;
          }),
          onBlur: V(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), Fs = "RovingFocusGroupItem", Ws = u.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, l = we(), c = a || l, d = Sh(Fs, n), m = d.currentTabStopId === c, h = Is(n), { onFocusableItemAdd: p, onFocusableItemRemove: v, currentTabStopId: g } = d;
    return u.useEffect(() => {
      if (r)
        return p(), () => v();
    }, [r, p, v]), /* @__PURE__ */ f(
      So.ItemSlot,
      {
        scope: n,
        id: c,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ f(
          q.span,
          {
            tabIndex: m ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: t,
            onMouseDown: V(e.onMouseDown, (b) => {
              r ? d.onItemFocus(c) : b.preventDefault();
            }),
            onFocus: V(e.onFocus, () => d.onItemFocus(c)),
            onKeyDown: V(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = Nh(b, d.orientation, d.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = h().filter((C) => C.focusable).map((C) => C.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const C = y.indexOf(b.currentTarget);
                  y = d.loop ? Rh(y, C + 1) : y.slice(C + 1);
                }
                setTimeout(() => $s(y));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: m, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
Ws.displayName = Fs;
var kh = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Mh(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Nh(e, t, n) {
  const r = Mh(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return kh[r];
}
function $s(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Rh(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Ph = Ls, Eh = Ws, Co = ["Enter", " "], Dh = ["ArrowDown", "PageUp", "Home"], Bs = ["ArrowUp", "PageDown", "End"], Oh = [...Dh, ...Bs], _h = {
  ltr: [...Co, "ArrowRight"],
  rtl: [...Co, "ArrowLeft"]
}, Th = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Dn = "Menu", [vn, Ah, Ih] = mr(Dn), [Tt, Vs] = Ve(Dn, [
  Ih,
  Jt,
  zs
]), On = Jt(), Hs = zs(), [Ys, bt] = Tt(Dn), [zh, _n] = Tt(Dn), Gs = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = On(t), [l, c] = u.useState(null), d = u.useRef(!1), m = ye(a), h = Cn(o);
  return u.useEffect(() => {
    const p = () => {
      d.current = !0, document.addEventListener("pointerdown", v, { capture: !0, once: !0 }), document.addEventListener("pointermove", v, { capture: !0, once: !0 });
    }, v = () => d.current = !1;
    return document.addEventListener("keydown", p, { capture: !0 }), () => {
      document.removeEventListener("keydown", p, { capture: !0 }), document.removeEventListener("pointerdown", v, { capture: !0 }), document.removeEventListener("pointermove", v, { capture: !0 });
    };
  }, []), /* @__PURE__ */ f(Sr, { ...i, children: /* @__PURE__ */ f(
    Ys,
    {
      scope: t,
      open: n,
      onOpenChange: m,
      content: l,
      onContentChange: c,
      children: /* @__PURE__ */ f(
        zh,
        {
          scope: t,
          onClose: u.useCallback(() => m(!1), [m]),
          isUsingKeyboardRef: d,
          dir: h,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
Gs.displayName = Dn;
var Lh = "MenuAnchor", ca = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = On(n);
    return /* @__PURE__ */ f(Cr, { ...o, ...r, ref: t });
  }
);
ca.displayName = Lh;
var da = "MenuPortal", [Fh, Us] = Tt(da, {
  forceMount: void 0
}), js = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = bt(da, t);
  return /* @__PURE__ */ f(Fh, { scope: t, forceMount: n, children: /* @__PURE__ */ f(Pe, { present: n || a.open, children: /* @__PURE__ */ f(Nn, { asChild: !0, container: o, children: r }) }) });
};
js.displayName = da;
var Ie = "MenuContent", [Wh, ua] = Tt(Ie), Ks = u.forwardRef(
  (e, t) => {
    const n = Us(Ie, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = bt(Ie, e.__scopeMenu), s = _n(Ie, e.__scopeMenu);
    return /* @__PURE__ */ f(vn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(Pe, { present: r || a.open, children: /* @__PURE__ */ f(vn.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ f($h, { ...o, ref: t }) : /* @__PURE__ */ f(Bh, { ...o, ref: t }) }) }) });
  }
), $h = u.forwardRef(
  (e, t) => {
    const n = bt(Ie, e.__scopeMenu), r = u.useRef(null), o = te(t, r);
    return u.useEffect(() => {
      const a = r.current;
      if (a) return gr(a);
    }, []), /* @__PURE__ */ f(
      fa,
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
), Bh = u.forwardRef((e, t) => {
  const n = bt(Ie, e.__scopeMenu);
  return /* @__PURE__ */ f(
    fa,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Vh = /* @__PURE__ */ ht("MenuContent.ScrollLock"), fa = u.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: l,
      onEscapeKeyDown: c,
      onPointerDownOutside: d,
      onFocusOutside: m,
      onInteractOutside: h,
      onDismiss: p,
      disableOutsideScroll: v,
      ...g
    } = e, b = bt(Ie, n), w = _n(Ie, n), x = On(n), y = Hs(n), C = Ah(n), [S, N] = u.useState(null), M = u.useRef(null), k = te(t, M, b.onContentChange), R = u.useRef(0), O = u.useRef(""), _ = u.useRef(0), I = u.useRef(null), Y = u.useRef("right"), H = u.useRef(0), j = v ? Rn : u.Fragment, $ = v ? { as: Vh, allowPinchZoom: !0 } : void 0, K = (D) => {
      var A, ee;
      const Z = O.current + D, ne = C().filter((Q) => !Q.disabled), E = document.activeElement, F = (A = ne.find((Q) => Q.ref.current === E)) == null ? void 0 : A.textValue, z = ne.map((Q) => Q.textValue), W = ep(z, Z, F), J = (ee = ne.find((Q) => Q.textValue === W)) == null ? void 0 : ee.ref.current;
      (function Q(re) {
        O.current = re, window.clearTimeout(R.current), re !== "" && (R.current = window.setTimeout(() => Q(""), 1e3));
      })(Z), J && setTimeout(() => J.focus());
    };
    u.useEffect(() => () => window.clearTimeout(R.current), []), hr();
    const P = u.useCallback((D) => {
      var ne, E;
      return Y.current === ((ne = I.current) == null ? void 0 : ne.side) && np(D, (E = I.current) == null ? void 0 : E.area);
    }, []);
    return /* @__PURE__ */ f(
      Wh,
      {
        scope: n,
        searchRef: O,
        onItemEnter: u.useCallback(
          (D) => {
            P(D) && D.preventDefault();
          },
          [P]
        ),
        onItemLeave: u.useCallback(
          (D) => {
            var Z;
            P(D) || ((Z = M.current) == null || Z.focus(), N(null));
          },
          [P]
        ),
        onTriggerLeave: u.useCallback(
          (D) => {
            P(D) && D.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: _,
        onPointerGraceIntentChange: u.useCallback((D) => {
          I.current = D;
        }, []),
        children: /* @__PURE__ */ f(j, { ...$, children: /* @__PURE__ */ f(
          Mn,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: V(a, (D) => {
              var Z;
              D.preventDefault(), (Z = M.current) == null || Z.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ f(
              kn,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: c,
                onPointerDownOutside: d,
                onFocusOutside: m,
                onInteractOutside: h,
                onDismiss: p,
                children: /* @__PURE__ */ f(
                  Ph,
                  {
                    asChild: !0,
                    ...y,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: S,
                    onCurrentTabStopIdChange: N,
                    onEntryFocus: V(l, (D) => {
                      w.isUsingKeyboardRef.current || D.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ f(
                      sa,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": ul(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...x,
                        ...g,
                        ref: k,
                        style: { outline: "none", ...g.style },
                        onKeyDown: V(g.onKeyDown, (D) => {
                          const ne = D.target.closest("[data-radix-menu-content]") === D.currentTarget, E = D.ctrlKey || D.altKey || D.metaKey, F = D.key.length === 1;
                          ne && (D.key === "Tab" && D.preventDefault(), !E && F && K(D.key));
                          const z = M.current;
                          if (D.target !== z || !Oh.includes(D.key)) return;
                          D.preventDefault();
                          const J = C().filter((A) => !A.disabled).map((A) => A.ref.current);
                          Bs.includes(D.key) && J.reverse(), Qh(J);
                        }),
                        onBlur: V(e.onBlur, (D) => {
                          D.currentTarget.contains(D.target) || (window.clearTimeout(R.current), O.current = "");
                        }),
                        onPointerMove: V(
                          e.onPointerMove,
                          bn((D) => {
                            const Z = D.target, ne = H.current !== D.clientX;
                            if (D.currentTarget.contains(Z) && ne) {
                              const E = D.clientX > H.current ? "right" : "left";
                              Y.current = E, H.current = D.clientX;
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
Ks.displayName = Ie;
var Hh = "MenuGroup", ma = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(q.div, { role: "group", ...r, ref: t });
  }
);
ma.displayName = Hh;
var Yh = "MenuLabel", qs = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(q.div, { ...r, ref: t });
  }
);
qs.displayName = Yh;
var or = "MenuItem", ii = "menu.itemSelect", kr = u.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = u.useRef(null), s = _n(or, e.__scopeMenu), i = ua(or, e.__scopeMenu), l = te(t, a), c = u.useRef(!1), d = () => {
      const m = a.current;
      if (!n && m) {
        const h = new CustomEvent(ii, { bubbles: !0, cancelable: !0 });
        m.addEventListener(ii, (p) => r == null ? void 0 : r(p), { once: !0 }), Hi(m, h), h.defaultPrevented ? c.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ f(
      Xs,
      {
        ...o,
        ref: l,
        disabled: n,
        onClick: V(e.onClick, d),
        onPointerDown: (m) => {
          var h;
          (h = e.onPointerDown) == null || h.call(e, m), c.current = !0;
        },
        onPointerUp: V(e.onPointerUp, (m) => {
          var h;
          c.current || (h = m.currentTarget) == null || h.click();
        }),
        onKeyDown: V(e.onKeyDown, (m) => {
          const h = i.searchRef.current !== "";
          n || h && m.key === " " || Co.includes(m.key) && (m.currentTarget.click(), m.preventDefault());
        })
      }
    );
  }
);
kr.displayName = or;
var Xs = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = ua(or, n), i = Hs(n), l = u.useRef(null), c = te(t, l), [d, m] = u.useState(!1), [h, p] = u.useState("");
    return u.useEffect(() => {
      const v = l.current;
      v && p((v.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ f(
      vn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? h,
        children: /* @__PURE__ */ f(Eh, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ f(
          q.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: c,
            onPointerMove: V(
              e.onPointerMove,
              bn((v) => {
                r ? s.onItemLeave(v) : (s.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: V(
              e.onPointerLeave,
              bn((v) => s.onItemLeave(v))
            ),
            onFocus: V(e.onFocus, () => m(!0)),
            onBlur: V(e.onBlur, () => m(!1))
          }
        ) })
      }
    );
  }
), Gh = "MenuCheckboxItem", Zs = u.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ f(nl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ f(
      kr,
      {
        role: "menuitemcheckbox",
        "aria-checked": ar(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ga(n),
        onSelect: V(
          o.onSelect,
          () => r == null ? void 0 : r(ar(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Zs.displayName = Gh;
var Qs = "MenuRadioGroup", [Uh, jh] = Tt(
  Qs,
  { value: void 0, onValueChange: () => {
  } }
), Js = u.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = ye(r);
    return /* @__PURE__ */ f(Uh, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ f(ma, { ...o, ref: t }) });
  }
);
Js.displayName = Qs;
var el = "MenuRadioItem", tl = u.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = jh(el, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ f(nl, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ f(
      kr,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": ga(a),
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
tl.displayName = el;
var ha = "MenuItemIndicator", [nl, Kh] = Tt(
  ha,
  { checked: !1 }
), rl = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = Kh(ha, n);
    return /* @__PURE__ */ f(
      Pe,
      {
        present: r || ar(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ f(
          q.span,
          {
            ...o,
            ref: t,
            "data-state": ga(a.checked)
          }
        )
      }
    );
  }
);
rl.displayName = ha;
var qh = "MenuSeparator", ol = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ f(
      q.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
ol.displayName = qh;
var Xh = "MenuArrow", al = u.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = On(n);
    return /* @__PURE__ */ f(la, { ...o, ...r, ref: t });
  }
);
al.displayName = Xh;
var pa = "MenuSub", [Zh, il] = Tt(pa), sl = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = bt(pa, t), s = On(t), [i, l] = u.useState(null), [c, d] = u.useState(null), m = ye(o);
  return u.useEffect(() => (a.open === !1 && m(!1), () => m(!1)), [a.open, m]), /* @__PURE__ */ f(Sr, { ...s, children: /* @__PURE__ */ f(
    Ys,
    {
      scope: t,
      open: r,
      onOpenChange: m,
      content: c,
      onContentChange: d,
      children: /* @__PURE__ */ f(
        Zh,
        {
          scope: t,
          contentId: we(),
          triggerId: we(),
          trigger: i,
          onTriggerChange: l,
          children: n
        }
      )
    }
  ) });
};
sl.displayName = pa;
var un = "MenuSubTrigger", ll = u.forwardRef(
  (e, t) => {
    const n = bt(un, e.__scopeMenu), r = _n(un, e.__scopeMenu), o = il(un, e.__scopeMenu), a = ua(un, e.__scopeMenu), s = u.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: l } = a, c = { __scopeMenu: e.__scopeMenu }, d = u.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return u.useEffect(() => d, [d]), u.useEffect(() => {
      const m = i.current;
      return () => {
        window.clearTimeout(m), l(null);
      };
    }, [i, l]), /* @__PURE__ */ f(ca, { asChild: !0, ...c, children: /* @__PURE__ */ f(
      Xs,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": ul(n.open),
        ...e,
        ref: ot(t, o.onTriggerChange),
        onClick: (m) => {
          var h;
          (h = e.onClick) == null || h.call(e, m), !(e.disabled || m.defaultPrevented) && (m.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: V(
          e.onPointerMove,
          bn((m) => {
            a.onItemEnter(m), !m.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: V(
          e.onPointerLeave,
          bn((m) => {
            var p, v;
            d();
            const h = (p = n.content) == null ? void 0 : p.getBoundingClientRect();
            if (h) {
              const g = (v = n.content) == null ? void 0 : v.dataset.side, b = g === "right", w = b ? -5 : 5, x = h[b ? "left" : "right"], y = h[b ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: m.clientX + w, y: m.clientY },
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
              if (a.onTriggerLeave(m), m.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: V(e.onKeyDown, (m) => {
          var p;
          const h = a.searchRef.current !== "";
          e.disabled || h && m.key === " " || _h[r.dir].includes(m.key) && (n.onOpenChange(!0), (p = n.content) == null || p.focus(), m.preventDefault());
        })
      }
    ) });
  }
);
ll.displayName = un;
var cl = "MenuSubContent", dl = u.forwardRef(
  (e, t) => {
    const n = Us(Ie, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = bt(Ie, e.__scopeMenu), s = _n(Ie, e.__scopeMenu), i = il(cl, e.__scopeMenu), l = u.useRef(null), c = te(t, l);
    return /* @__PURE__ */ f(vn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(Pe, { present: r || a.open, children: /* @__PURE__ */ f(vn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ f(
      fa,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: c,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          var m;
          s.isUsingKeyboardRef.current && ((m = l.current) == null || m.focus()), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: V(e.onFocusOutside, (d) => {
          d.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: V(e.onEscapeKeyDown, (d) => {
          s.onClose(), d.preventDefault();
        }),
        onKeyDown: V(e.onKeyDown, (d) => {
          var p;
          const m = d.currentTarget.contains(d.target), h = Th[s.dir].includes(d.key);
          m && h && (a.onOpenChange(!1), (p = i.trigger) == null || p.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
dl.displayName = cl;
function ul(e) {
  return e ? "open" : "closed";
}
function ar(e) {
  return e === "indeterminate";
}
function ga(e) {
  return ar(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Qh(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Jh(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function ep(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = Jh(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((c) => c !== n));
  const l = s.find(
    (c) => c.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function tp(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], l = t[s], c = i.x, d = i.y, m = l.x, h = l.y;
    d > r != h > r && n < (m - c) * (r - d) / (h - d) + c && (o = !o);
  }
  return o;
}
function np(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return tp(n, t);
}
function bn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var rp = Gs, op = ca, ap = js, ip = Ks, sp = ma, lp = qs, cp = kr, dp = Zs, up = Js, fp = tl, mp = rl, hp = ol, pp = al, gp = sl, vp = ll, bp = dl, Mr = "DropdownMenu", [yp, VS] = Ve(
  Mr,
  [Vs]
), Ne = Vs(), [wp, fl] = yp(Mr), ml = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, l = Ne(t), c = u.useRef(null), [d, m] = at({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: Mr
  });
  return /* @__PURE__ */ f(
    wp,
    {
      scope: t,
      triggerId: we(),
      triggerRef: c,
      contentId: we(),
      open: d,
      onOpenChange: m,
      onOpenToggle: u.useCallback(() => m((h) => !h), [m]),
      modal: i,
      children: /* @__PURE__ */ f(rp, { ...l, open: d, onOpenChange: m, dir: r, modal: i, children: n })
    }
  );
};
ml.displayName = Mr;
var hl = "DropdownMenuTrigger", pl = u.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = fl(hl, n), s = Ne(n);
    return /* @__PURE__ */ f(op, { asChild: !0, ...s, children: /* @__PURE__ */ f(
      q.button,
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
        ref: ot(t, a.triggerRef),
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
pl.displayName = hl;
var xp = "DropdownMenuPortal", gl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ne(t);
  return /* @__PURE__ */ f(ap, { ...r, ...n });
};
gl.displayName = xp;
var vl = "DropdownMenuContent", bl = u.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = fl(vl, n), a = Ne(n), s = u.useRef(!1);
    return /* @__PURE__ */ f(
      ip,
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
          const l = i.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0, d = l.button === 2 || c;
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
bl.displayName = vl;
var Sp = "DropdownMenuGroup", yl = u.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ f(sp, { ...o, ...r, ref: t });
  }
);
yl.displayName = Sp;
var Cp = "DropdownMenuLabel", wl = u.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ f(lp, { ...o, ...r, ref: t });
  }
);
wl.displayName = Cp;
var kp = "DropdownMenuItem", xl = u.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ f(cp, { ...o, ...r, ref: t });
  }
);
xl.displayName = kp;
var Mp = "DropdownMenuCheckboxItem", Sl = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(dp, { ...o, ...r, ref: t });
});
Sl.displayName = Mp;
var Np = "DropdownMenuRadioGroup", Rp = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(up, { ...o, ...r, ref: t });
});
Rp.displayName = Np;
var Pp = "DropdownMenuRadioItem", Ep = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(fp, { ...o, ...r, ref: t });
});
Ep.displayName = Pp;
var Dp = "DropdownMenuItemIndicator", Cl = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(mp, { ...o, ...r, ref: t });
});
Cl.displayName = Dp;
var Op = "DropdownMenuSeparator", kl = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(hp, { ...o, ...r, ref: t });
});
kl.displayName = Op;
var _p = "DropdownMenuArrow", Tp = u.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ f(pp, { ...o, ...r, ref: t });
  }
);
Tp.displayName = _p;
var Ap = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = Ne(t), [i, l] = at({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ f(gp, { ...s, open: i, onOpenChange: l, children: n });
}, Ip = "DropdownMenuSubTrigger", Ml = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(vp, { ...o, ...r, ref: t });
});
Ml.displayName = Ip;
var zp = "DropdownMenuSubContent", Nl = u.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ f(
    bp,
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
Nl.displayName = zp;
var Lp = ml, Fp = pl, Wp = gl, $p = bl, Bp = yl, Vp = wl, Hp = xl, Yp = Sl, Gp = Cl, Up = kl, jp = Ap, Kp = Ml, qp = Nl, Xp = "Label", Rl = u.forwardRef((e, t) => /* @__PURE__ */ f(
  q.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
Rl.displayName = Xp;
var Zp = Rl;
function yn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var Nr = "Popover", [Pl, HS] = Ve(Nr, [
  Jt
]), Tn = Jt(), [Qp, yt] = Pl(Nr), El = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = Tn(t), l = u.useRef(null), [c, d] = u.useState(!1), [m, h] = at({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Nr
  });
  return /* @__PURE__ */ f(Sr, { ...i, children: /* @__PURE__ */ f(
    Qp,
    {
      scope: t,
      contentId: we(),
      triggerRef: l,
      open: m,
      onOpenChange: h,
      onOpenToggle: u.useCallback(() => h((p) => !p), [h]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: u.useCallback(() => d(!0), []),
      onCustomAnchorRemove: u.useCallback(() => d(!1), []),
      modal: s,
      children: n
    }
  ) });
};
El.displayName = Nr;
var Dl = "PopoverAnchor", Jp = u.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = yt(Dl, n), a = Tn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return u.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ f(Cr, { ...a, ...r, ref: t });
  }
);
Jp.displayName = Dl;
var Ol = "PopoverTrigger", _l = u.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = yt(Ol, n), a = Tn(n), s = te(t, o.triggerRef), i = /* @__PURE__ */ f(
      q.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ll(o.open),
        ...r,
        ref: s,
        onClick: V(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ f(Cr, { asChild: !0, ...a, children: i });
  }
);
_l.displayName = Ol;
var va = "PopoverPortal", [eg, tg] = Pl(va, {
  forceMount: void 0
}), Tl = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = yt(va, t);
  return /* @__PURE__ */ f(eg, { scope: t, forceMount: n, children: /* @__PURE__ */ f(Pe, { present: n || a.open, children: /* @__PURE__ */ f(Nn, { asChild: !0, container: o, children: r }) }) });
};
Tl.displayName = va;
var Kt = "PopoverContent", Al = u.forwardRef(
  (e, t) => {
    const n = tg(Kt, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = yt(Kt, e.__scopePopover);
    return /* @__PURE__ */ f(Pe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ f(rg, { ...o, ref: t }) : /* @__PURE__ */ f(og, { ...o, ref: t }) });
  }
);
Al.displayName = Kt;
var ng = /* @__PURE__ */ ht("PopoverContent.RemoveScroll"), rg = u.forwardRef(
  (e, t) => {
    const n = yt(Kt, e.__scopePopover), r = u.useRef(null), o = te(t, r), a = u.useRef(!1);
    return u.useEffect(() => {
      const s = r.current;
      if (s) return gr(s);
    }, []), /* @__PURE__ */ f(Rn, { as: ng, allowPinchZoom: !0, children: /* @__PURE__ */ f(
      Il,
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
            const i = s.detail.originalEvent, l = i.button === 0 && i.ctrlKey === !0, c = i.button === 2 || l;
            a.current = c;
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
), og = u.forwardRef(
  (e, t) => {
    const n = yt(Kt, e.__scopePopover), r = u.useRef(!1), o = u.useRef(!1);
    return /* @__PURE__ */ f(
      Il,
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
          var l, c;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((c = n.triggerRef.current) == null ? void 0 : c.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Il = u.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: l,
      onFocusOutside: c,
      onInteractOutside: d,
      ...m
    } = e, h = yt(Kt, n), p = Tn(n);
    return hr(), /* @__PURE__ */ f(
      Mn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ f(
          kn,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: d,
            onEscapeKeyDown: i,
            onPointerDownOutside: l,
            onFocusOutside: c,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ f(
              sa,
              {
                "data-state": Ll(h.open),
                role: "dialog",
                id: h.contentId,
                ...p,
                ...m,
                ref: t,
                style: {
                  ...m.style,
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
), zl = "PopoverClose", ag = u.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = yt(zl, n);
    return /* @__PURE__ */ f(
      q.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: V(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
ag.displayName = zl;
var ig = "PopoverArrow", sg = u.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Tn(n);
    return /* @__PURE__ */ f(la, { ...o, ...r, ref: t });
  }
);
sg.displayName = ig;
function Ll(e) {
  return e ? "open" : "closed";
}
var lg = El, cg = _l, dg = Tl, ug = Al;
function fg(e, t) {
  return u.useReducer((n, r) => t[n][r] ?? n, e);
}
var ba = "ScrollArea", [Fl, YS] = Ve(ba), [mg, ze] = Fl(ba), Wl = u.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, l] = u.useState(null), [c, d] = u.useState(null), [m, h] = u.useState(null), [p, v] = u.useState(null), [g, b] = u.useState(null), [w, x] = u.useState(0), [y, C] = u.useState(0), [S, N] = u.useState(!1), [M, k] = u.useState(!1), R = te(t, (_) => l(_)), O = Cn(o);
    return /* @__PURE__ */ f(
      mg,
      {
        scope: n,
        type: r,
        dir: O,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: c,
        onViewportChange: d,
        content: m,
        onContentChange: h,
        scrollbarX: p,
        onScrollbarXChange: v,
        scrollbarXEnabled: S,
        onScrollbarXEnabledChange: N,
        scrollbarY: g,
        onScrollbarYChange: b,
        scrollbarYEnabled: M,
        onScrollbarYEnabledChange: k,
        onCornerWidthChange: x,
        onCornerHeightChange: C,
        children: /* @__PURE__ */ f(
          q.div,
          {
            dir: O,
            ...s,
            ref: R,
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
Wl.displayName = ba;
var $l = "ScrollAreaViewport", Bl = u.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = ze($l, n), i = u.useRef(null), l = te(t, i, s.onViewportChange);
    return /* @__PURE__ */ T(Me, { children: [
      /* @__PURE__ */ f(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ f(
        q.div,
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
          children: /* @__PURE__ */ f("div", { ref: s.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
Bl.displayName = $l;
var Qe = "ScrollAreaScrollbar", ko = u.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = ze(Qe, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return u.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ f(hg, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ f(pg, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ f(Vl, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ f(ya, { ...r, ref: t }) : null;
  }
);
ko.displayName = Qe;
var hg = u.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = ze(Qe, e.__scopeScrollArea), [a, s] = u.useState(!1);
  return u.useEffect(() => {
    const i = o.scrollArea;
    let l = 0;
    if (i) {
      const c = () => {
        window.clearTimeout(l), s(!0);
      }, d = () => {
        l = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", c), i.addEventListener("pointerleave", d), () => {
        window.clearTimeout(l), i.removeEventListener("pointerenter", c), i.removeEventListener("pointerleave", d);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ f(Pe, { present: n || a, children: /* @__PURE__ */ f(
    Vl,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), pg = u.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = ze(Qe, e.__scopeScrollArea), a = e.orientation === "horizontal", s = Pr(() => l("SCROLL_END"), 100), [i, l] = fg("hidden", {
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
  return u.useEffect(() => {
    if (i === "idle") {
      const c = window.setTimeout(() => l("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(c);
    }
  }, [i, o.scrollHideDelay, l]), u.useEffect(() => {
    const c = o.viewport, d = a ? "scrollLeft" : "scrollTop";
    if (c) {
      let m = c[d];
      const h = () => {
        const p = c[d];
        m !== p && (l("SCROLL"), s()), m = p;
      };
      return c.addEventListener("scroll", h), () => c.removeEventListener("scroll", h);
    }
  }, [o.viewport, a, l, s]), /* @__PURE__ */ f(Pe, { present: n || i !== "hidden", children: /* @__PURE__ */ f(
    ya,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: V(e.onPointerEnter, () => l("POINTER_ENTER")),
      onPointerLeave: V(e.onPointerLeave, () => l("POINTER_LEAVE"))
    }
  ) });
}), Vl = u.forwardRef((e, t) => {
  const n = ze(Qe, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = u.useState(!1), i = e.orientation === "horizontal", l = Pr(() => {
    if (n.viewport) {
      const c = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? c : d);
    }
  }, 10);
  return qt(n.viewport, l), qt(n.content, l), /* @__PURE__ */ f(Pe, { present: r || a, children: /* @__PURE__ */ f(
    ya,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), ya = u.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = ze(Qe, e.__scopeScrollArea), a = u.useRef(null), s = u.useRef(0), [i, l] = u.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), c = Gl(i.viewport, i.content), d = {
    ...r,
    sizes: i,
    onSizesChange: l,
    hasThumb: c > 0 && c < 1,
    onThumbChange: (h) => a.current = h,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (h) => s.current = h
  };
  function m(h, p) {
    return Sg(h, s.current, i, p);
  }
  return n === "horizontal" ? /* @__PURE__ */ f(
    gg,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const h = o.viewport.scrollLeft, p = si(h, i, o.dir);
          a.current.style.transform = `translate3d(${p}px, 0, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = m(h, o.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ f(
    vg,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const h = o.viewport.scrollTop, p = si(h, i);
          a.current.style.transform = `translate3d(0, ${p}px, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollTop = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollTop = m(h));
      }
    }
  ) : null;
}), gg = u.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = ze(Qe, e.__scopeScrollArea), [s, i] = u.useState(), l = u.useRef(null), c = te(t, l, a.onScrollbarXChange);
  return u.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ f(
    Yl,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: c,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Rr(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
      onDragScroll: (d) => e.onDragScroll(d.x),
      onWheelScroll: (d, m) => {
        if (a.viewport) {
          const h = a.viewport.scrollLeft + d.deltaX;
          e.onWheelScroll(h), jl(h, m) && d.preventDefault();
        }
      },
      onResize: () => {
        l.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: l.current.clientWidth,
            paddingStart: sr(s.paddingLeft),
            paddingEnd: sr(s.paddingRight)
          }
        });
      }
    }
  );
}), vg = u.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = ze(Qe, e.__scopeScrollArea), [s, i] = u.useState(), l = u.useRef(null), c = te(t, l, a.onScrollbarYChange);
  return u.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ f(
    Yl,
    {
      "data-orientation": "vertical",
      ...o,
      ref: c,
      sizes: n,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Rr(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
      onDragScroll: (d) => e.onDragScroll(d.y),
      onWheelScroll: (d, m) => {
        if (a.viewport) {
          const h = a.viewport.scrollTop + d.deltaY;
          e.onWheelScroll(h), jl(h, m) && d.preventDefault();
        }
      },
      onResize: () => {
        l.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: l.current.clientHeight,
            paddingStart: sr(s.paddingTop),
            paddingEnd: sr(s.paddingBottom)
          }
        });
      }
    }
  );
}), [bg, Hl] = Fl(Qe), Yl = u.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: l,
    onDragScroll: c,
    onWheelScroll: d,
    onResize: m,
    ...h
  } = e, p = ze(Qe, n), [v, g] = u.useState(null), b = te(t, (R) => g(R)), w = u.useRef(null), x = u.useRef(""), y = p.viewport, C = r.content - r.viewport, S = ye(d), N = ye(l), M = Pr(m, 10);
  function k(R) {
    if (w.current) {
      const O = R.clientX - w.current.left, _ = R.clientY - w.current.top;
      c({ x: O, y: _ });
    }
  }
  return u.useEffect(() => {
    const R = (O) => {
      const _ = O.target;
      (v == null ? void 0 : v.contains(_)) && S(O, C);
    };
    return document.addEventListener("wheel", R, { passive: !1 }), () => document.removeEventListener("wheel", R, { passive: !1 });
  }, [y, v, C, S]), u.useEffect(N, [r, N]), qt(v, M), qt(p.content, M), /* @__PURE__ */ f(
    bg,
    {
      scope: n,
      scrollbar: v,
      hasThumb: o,
      onThumbChange: ye(a),
      onThumbPointerUp: ye(s),
      onThumbPositionChange: N,
      onThumbPointerDown: ye(i),
      children: /* @__PURE__ */ f(
        q.div,
        {
          ...h,
          ref: b,
          style: { position: "absolute", ...h.style },
          onPointerDown: V(e.onPointerDown, (R) => {
            R.button === 0 && (R.target.setPointerCapture(R.pointerId), w.current = v.getBoundingClientRect(), x.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", p.viewport && (p.viewport.style.scrollBehavior = "auto"), k(R));
          }),
          onPointerMove: V(e.onPointerMove, k),
          onPointerUp: V(e.onPointerUp, (R) => {
            const O = R.target;
            O.hasPointerCapture(R.pointerId) && O.releasePointerCapture(R.pointerId), document.body.style.webkitUserSelect = x.current, p.viewport && (p.viewport.style.scrollBehavior = ""), w.current = null;
          })
        }
      )
    }
  );
}), ir = "ScrollAreaThumb", Mo = u.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Hl(ir, e.__scopeScrollArea);
    return /* @__PURE__ */ f(Pe, { present: n || o.hasThumb, children: /* @__PURE__ */ f(yg, { ref: t, ...r }) });
  }
), yg = u.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = ze(ir, n), s = Hl(ir, n), { onThumbPositionChange: i } = s, l = te(
      t,
      (m) => s.onThumbChange(m)
    ), c = u.useRef(void 0), d = Pr(() => {
      c.current && (c.current(), c.current = void 0);
    }, 100);
    return u.useEffect(() => {
      const m = a.viewport;
      if (m) {
        const h = () => {
          if (d(), !c.current) {
            const p = Cg(m, i);
            c.current = p, i();
          }
        };
        return i(), m.addEventListener("scroll", h), () => m.removeEventListener("scroll", h);
      }
    }, [a.viewport, d, i]), /* @__PURE__ */ f(
      q.div,
      {
        "data-state": s.hasThumb ? "visible" : "hidden",
        ...o,
        ref: l,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: V(e.onPointerDownCapture, (m) => {
          const p = m.target.getBoundingClientRect(), v = m.clientX - p.left, g = m.clientY - p.top;
          s.onThumbPointerDown({ x: v, y: g });
        }),
        onPointerUp: V(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
Mo.displayName = ir;
var wa = "ScrollAreaCorner", wg = u.forwardRef(
  (e, t) => {
    const n = ze(wa, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ f(xg, { ...e, ref: t }) : null;
  }
);
wg.displayName = wa;
var xg = u.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = ze(wa, n), [a, s] = u.useState(0), [i, l] = u.useState(0), c = !!(a && i);
  return qt(o.scrollbarX, () => {
    var m;
    const d = ((m = o.scrollbarX) == null ? void 0 : m.offsetHeight) || 0;
    o.onCornerHeightChange(d), l(d);
  }), qt(o.scrollbarY, () => {
    var m;
    const d = ((m = o.scrollbarY) == null ? void 0 : m.offsetWidth) || 0;
    o.onCornerWidthChange(d), s(d);
  }), c ? /* @__PURE__ */ f(
    q.div,
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
function sr(e) {
  return e ? parseInt(e, 10) : 0;
}
function Gl(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function Rr(e) {
  const t = Gl(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function Sg(e, t, n, r = "ltr") {
  const o = Rr(n), a = o / 2, s = t || a, i = o - s, l = n.scrollbar.paddingStart + s, c = n.scrollbar.size - n.scrollbar.paddingEnd - i, d = n.content - n.viewport, m = r === "ltr" ? [0, d] : [d * -1, 0];
  return Ul([l, c], m)(e);
}
function si(e, t, n = "ltr") {
  const r = Rr(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, l = n === "ltr" ? [0, s] : [s * -1, 0], c = yn(e, l);
  return Ul([0, s], [0, i])(c);
}
function Ul(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function jl(e, t) {
  return e > 0 && e < t;
}
var Cg = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return (function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
};
function Pr(e, t) {
  const n = ye(e), r = u.useRef(0);
  return u.useEffect(() => () => window.clearTimeout(r.current), []), u.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function qt(e, t) {
  const n = ye(t);
  xe(() => {
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
var kg = Wl, Mg = Bl, Ng = [" ", "Enter", "ArrowUp", "ArrowDown"], Rg = [" ", "Enter"], Dt = "Select", [Er, Dr, Pg] = mr(Dt), [en, GS] = Ve(Dt, [
  Pg,
  Jt
]), Or = Jt(), [Eg, wt] = en(Dt), [Dg, Og] = en(Dt), Kl = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: l,
    dir: c,
    name: d,
    autoComplete: m,
    disabled: h,
    required: p,
    form: v
  } = e, g = Or(t), [b, w] = u.useState(null), [x, y] = u.useState(null), [C, S] = u.useState(!1), N = Cn(c), [M, k] = at({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Dt
  }), [R, O] = at({
    prop: s,
    defaultProp: i,
    onChange: l,
    caller: Dt
  }), _ = u.useRef(null), I = b ? v || !!b.closest("form") : !0, [Y, H] = u.useState(/* @__PURE__ */ new Set()), j = Array.from(Y).map(($) => $.props.value).join(";");
  return /* @__PURE__ */ f(Sr, { ...g, children: /* @__PURE__ */ T(
    Eg,
    {
      required: p,
      scope: t,
      trigger: b,
      onTriggerChange: w,
      valueNode: x,
      onValueNodeChange: y,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: S,
      contentId: we(),
      value: R,
      onValueChange: O,
      open: M,
      onOpenChange: k,
      dir: N,
      triggerPointerDownPosRef: _,
      disabled: h,
      children: [
        /* @__PURE__ */ f(Er.Provider, { scope: t, children: /* @__PURE__ */ f(
          Dg,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: u.useCallback(($) => {
              H((K) => new Set(K).add($));
            }, []),
            onNativeOptionRemove: u.useCallback(($) => {
              H((K) => {
                const P = new Set(K);
                return P.delete($), P;
              });
            }, []),
            children: n
          }
        ) }),
        I ? /* @__PURE__ */ T(
          yc,
          {
            "aria-hidden": !0,
            required: p,
            tabIndex: -1,
            name: d,
            autoComplete: m,
            value: R,
            onChange: ($) => O($.target.value),
            disabled: h,
            form: v,
            children: [
              R === void 0 ? /* @__PURE__ */ f("option", { value: "" }) : null,
              Array.from(Y)
            ]
          },
          j
        ) : null
      ]
    }
  ) });
};
Kl.displayName = Dt;
var ql = "SelectTrigger", Xl = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = Or(n), s = wt(ql, n), i = s.disabled || r, l = te(t, s.onTriggerChange), c = Dr(n), d = u.useRef("touch"), [m, h, p] = xc((g) => {
      const b = c().filter((y) => !y.disabled), w = b.find((y) => y.value === s.value), x = Sc(b, g, w);
      x !== void 0 && s.onValueChange(x.value);
    }), v = (g) => {
      i || (s.onOpenChange(!0), p()), g && (s.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ f(Cr, { asChild: !0, ...a, children: /* @__PURE__ */ f(
      q.button,
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
        "data-placeholder": wc(s.value) ? "" : void 0,
        ...o,
        ref: l,
        onClick: V(o.onClick, (g) => {
          g.currentTarget.focus(), d.current !== "mouse" && v(g);
        }),
        onPointerDown: V(o.onPointerDown, (g) => {
          d.current = g.pointerType;
          const b = g.target;
          b.hasPointerCapture(g.pointerId) && b.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (v(g), g.preventDefault());
        }),
        onKeyDown: V(o.onKeyDown, (g) => {
          const b = m.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && h(g.key), !(b && g.key === " ") && Ng.includes(g.key) && (v(), g.preventDefault());
        })
      }
    ) });
  }
);
Xl.displayName = ql;
var Zl = "SelectValue", Ql = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, l = wt(Zl, n), { onValueNodeHasChildrenChange: c } = l, d = a !== void 0, m = te(t, l.onValueNodeChange);
    return xe(() => {
      c(d);
    }, [c, d]), /* @__PURE__ */ f(
      q.span,
      {
        ...i,
        ref: m,
        style: { pointerEvents: "none" },
        children: wc(l.value) ? /* @__PURE__ */ f(Me, { children: s }) : a
      }
    );
  }
);
Ql.displayName = Zl;
var _g = "SelectIcon", Jl = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ f(q.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Jl.displayName = _g;
var Tg = "SelectPortal", ec = (e) => /* @__PURE__ */ f(Nn, { asChild: !0, ...e });
ec.displayName = Tg;
var Ot = "SelectContent", tc = u.forwardRef(
  (e, t) => {
    const n = wt(Ot, e.__scopeSelect), [r, o] = u.useState();
    if (xe(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? fr.createPortal(
        /* @__PURE__ */ f(nc, { scope: e.__scopeSelect, children: /* @__PURE__ */ f(Er.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ f("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ f(rc, { ...e, ref: t });
  }
);
tc.displayName = Ot;
var Fe = 10, [nc, xt] = en(Ot), Ag = "SelectContentImpl", Ig = /* @__PURE__ */ ht("SelectContent.RemoveScroll"), rc = u.forwardRef(
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
      align: c,
      alignOffset: d,
      arrowPadding: m,
      collisionBoundary: h,
      collisionPadding: p,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b,
      //
      ...w
    } = e, x = wt(Ot, n), [y, C] = u.useState(null), [S, N] = u.useState(null), M = te(t, (A) => C(A)), [k, R] = u.useState(null), [O, _] = u.useState(
      null
    ), I = Dr(n), [Y, H] = u.useState(!1), j = u.useRef(!1);
    u.useEffect(() => {
      if (y) return gr(y);
    }, [y]), hr();
    const $ = u.useCallback(
      (A) => {
        const [ee, ...Q] = I().map((ie) => ie.ref.current), [re] = Q.slice(-1), se = document.activeElement;
        for (const ie of A)
          if (ie === se || (ie == null || ie.scrollIntoView({ block: "nearest" }), ie === ee && S && (S.scrollTop = 0), ie === re && S && (S.scrollTop = S.scrollHeight), ie == null || ie.focus(), document.activeElement !== se)) return;
      },
      [I, S]
    ), K = u.useCallback(
      () => $([k, y]),
      [$, k, y]
    );
    u.useEffect(() => {
      Y && K();
    }, [Y, K]);
    const { onOpenChange: P, triggerPointerDownPosRef: D } = x;
    u.useEffect(() => {
      if (y) {
        let A = { x: 0, y: 0 };
        const ee = (re) => {
          var se, ie;
          A = {
            x: Math.abs(Math.round(re.pageX) - (((se = D.current) == null ? void 0 : se.x) ?? 0)),
            y: Math.abs(Math.round(re.pageY) - (((ie = D.current) == null ? void 0 : ie.y) ?? 0))
          };
        }, Q = (re) => {
          A.x <= 10 && A.y <= 10 ? re.preventDefault() : y.contains(re.target) || P(!1), document.removeEventListener("pointermove", ee), D.current = null;
        };
        return D.current !== null && (document.addEventListener("pointermove", ee), document.addEventListener("pointerup", Q, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", ee), document.removeEventListener("pointerup", Q, { capture: !0 });
        };
      }
    }, [y, P, D]), u.useEffect(() => {
      const A = () => P(!1);
      return window.addEventListener("blur", A), window.addEventListener("resize", A), () => {
        window.removeEventListener("blur", A), window.removeEventListener("resize", A);
      };
    }, [P]);
    const [Z, ne] = xc((A) => {
      const ee = I().filter((se) => !se.disabled), Q = ee.find((se) => se.ref.current === document.activeElement), re = Sc(ee, A, Q);
      re && setTimeout(() => re.ref.current.focus());
    }), E = u.useCallback(
      (A, ee, Q) => {
        const re = !j.current && !Q;
        (x.value !== void 0 && x.value === ee || re) && (R(A), re && (j.current = !0));
      },
      [x.value]
    ), F = u.useCallback(() => y == null ? void 0 : y.focus(), [y]), z = u.useCallback(
      (A, ee, Q) => {
        const re = !j.current && !Q;
        (x.value !== void 0 && x.value === ee || re) && _(A);
      },
      [x.value]
    ), W = r === "popper" ? No : oc, J = W === No ? {
      side: i,
      sideOffset: l,
      align: c,
      alignOffset: d,
      arrowPadding: m,
      collisionBoundary: h,
      collisionPadding: p,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ f(
      nc,
      {
        scope: n,
        content: y,
        viewport: S,
        onViewportChange: N,
        itemRefCallback: E,
        selectedItem: k,
        onItemLeave: F,
        itemTextRefCallback: z,
        focusSelectedItem: K,
        selectedItemText: O,
        position: r,
        isPositioned: Y,
        searchRef: Z,
        children: /* @__PURE__ */ f(Rn, { as: Ig, allowPinchZoom: !0, children: /* @__PURE__ */ f(
          Mn,
          {
            asChild: !0,
            trapped: x.open,
            onMountAutoFocus: (A) => {
              A.preventDefault();
            },
            onUnmountAutoFocus: V(o, (A) => {
              var ee;
              (ee = x.trigger) == null || ee.focus({ preventScroll: !0 }), A.preventDefault();
            }),
            children: /* @__PURE__ */ f(
              kn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: (A) => A.preventDefault(),
                onDismiss: () => x.onOpenChange(!1),
                children: /* @__PURE__ */ f(
                  W,
                  {
                    role: "listbox",
                    id: x.contentId,
                    "data-state": x.open ? "open" : "closed",
                    dir: x.dir,
                    onContextMenu: (A) => A.preventDefault(),
                    ...w,
                    ...J,
                    onPlaced: () => H(!0),
                    ref: M,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: V(w.onKeyDown, (A) => {
                      const ee = A.ctrlKey || A.altKey || A.metaKey;
                      if (A.key === "Tab" && A.preventDefault(), !ee && A.key.length === 1 && ne(A.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(A.key)) {
                        let re = I().filter((se) => !se.disabled).map((se) => se.ref.current);
                        if (["ArrowUp", "End"].includes(A.key) && (re = re.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(A.key)) {
                          const se = A.target, ie = re.indexOf(se);
                          re = re.slice(ie + 1);
                        }
                        setTimeout(() => $(re)), A.preventDefault();
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
rc.displayName = Ag;
var zg = "SelectItemAlignedPosition", oc = u.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = wt(Ot, n), s = xt(Ot, n), [i, l] = u.useState(null), [c, d] = u.useState(null), m = te(t, (M) => d(M)), h = Dr(n), p = u.useRef(!1), v = u.useRef(!0), { viewport: g, selectedItem: b, selectedItemText: w, focusSelectedItem: x } = s, y = u.useCallback(() => {
    if (a.trigger && a.valueNode && i && c && g && b && w) {
      const M = a.trigger.getBoundingClientRect(), k = c.getBoundingClientRect(), R = a.valueNode.getBoundingClientRect(), O = w.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const se = O.left - k.left, ie = R.left - se, Re = M.left - ie, Ee = M.width + Re, St = Math.max(Ee, k.width), Ct = window.innerWidth - Fe, kt = yn(ie, [
          Fe,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Fe, Ct - St)
        ]);
        i.style.minWidth = Ee + "px", i.style.left = kt + "px";
      } else {
        const se = k.right - O.right, ie = window.innerWidth - R.right - se, Re = window.innerWidth - M.right - ie, Ee = M.width + Re, St = Math.max(Ee, k.width), Ct = window.innerWidth - Fe, kt = yn(ie, [
          Fe,
          Math.max(Fe, Ct - St)
        ]);
        i.style.minWidth = Ee + "px", i.style.right = kt + "px";
      }
      const _ = h(), I = window.innerHeight - Fe * 2, Y = g.scrollHeight, H = window.getComputedStyle(c), j = parseInt(H.borderTopWidth, 10), $ = parseInt(H.paddingTop, 10), K = parseInt(H.borderBottomWidth, 10), P = parseInt(H.paddingBottom, 10), D = j + $ + Y + P + K, Z = Math.min(b.offsetHeight * 5, D), ne = window.getComputedStyle(g), E = parseInt(ne.paddingTop, 10), F = parseInt(ne.paddingBottom, 10), z = M.top + M.height / 2 - Fe, W = I - z, J = b.offsetHeight / 2, A = b.offsetTop + J, ee = j + $ + A, Q = D - ee;
      if (ee <= z) {
        const se = _.length > 0 && b === _[_.length - 1].ref.current;
        i.style.bottom = "0px";
        const ie = c.clientHeight - g.offsetTop - g.offsetHeight, Re = Math.max(
          W,
          J + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (se ? F : 0) + ie + K
        ), Ee = ee + Re;
        i.style.height = Ee + "px";
      } else {
        const se = _.length > 0 && b === _[0].ref.current;
        i.style.top = "0px";
        const Re = Math.max(
          z,
          j + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (se ? E : 0) + J
        ) + Q;
        i.style.height = Re + "px", g.scrollTop = ee - z + g.offsetTop;
      }
      i.style.margin = `${Fe}px 0`, i.style.minHeight = Z + "px", i.style.maxHeight = I + "px", r == null || r(), requestAnimationFrame(() => p.current = !0);
    }
  }, [
    h,
    a.trigger,
    a.valueNode,
    i,
    c,
    g,
    b,
    w,
    a.dir,
    r
  ]);
  xe(() => y(), [y]);
  const [C, S] = u.useState();
  xe(() => {
    c && S(window.getComputedStyle(c).zIndex);
  }, [c]);
  const N = u.useCallback(
    (M) => {
      M && v.current === !0 && (y(), x == null || x(), v.current = !1);
    },
    [y, x]
  );
  return /* @__PURE__ */ f(
    Fg,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: p,
      onScrollButtonChange: N,
      children: /* @__PURE__ */ f(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: C
          },
          children: /* @__PURE__ */ f(
            q.div,
            {
              ...o,
              ref: m,
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
oc.displayName = zg;
var Lg = "SelectPopperPosition", No = u.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Fe,
    ...a
  } = e, s = Or(n);
  return /* @__PURE__ */ f(
    sa,
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
No.displayName = Lg;
var [Fg, xa] = en(Ot, {}), Ro = "SelectViewport", ac = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = xt(Ro, n), s = xa(Ro, n), i = te(t, a.onViewportChange), l = u.useRef(0);
    return /* @__PURE__ */ T(Me, { children: [
      /* @__PURE__ */ f(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ f(Er.Slot, { scope: n, children: /* @__PURE__ */ f(
        q.div,
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
          onScroll: V(o.onScroll, (c) => {
            const d = c.currentTarget, { contentWrapper: m, shouldExpandOnScrollRef: h } = s;
            if (h != null && h.current && m) {
              const p = Math.abs(l.current - d.scrollTop);
              if (p > 0) {
                const v = window.innerHeight - Fe * 2, g = parseFloat(m.style.minHeight), b = parseFloat(m.style.height), w = Math.max(g, b);
                if (w < v) {
                  const x = w + p, y = Math.min(v, x), C = x - y;
                  m.style.height = y + "px", m.style.bottom === "0px" && (d.scrollTop = C > 0 ? C : 0, m.style.justifyContent = "flex-end");
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
ac.displayName = Ro;
var ic = "SelectGroup", [Wg, $g] = en(ic), sc = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = we();
    return /* @__PURE__ */ f(Wg, { scope: n, id: o, children: /* @__PURE__ */ f(q.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
sc.displayName = ic;
var lc = "SelectLabel", cc = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = $g(lc, n);
    return /* @__PURE__ */ f(q.div, { id: o.id, ...r, ref: t });
  }
);
cc.displayName = lc;
var lr = "SelectItem", [Bg, dc] = en(lr), uc = u.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = wt(lr, n), l = xt(lr, n), c = i.value === r, [d, m] = u.useState(a ?? ""), [h, p] = u.useState(!1), v = te(
      t,
      (x) => {
        var y;
        return (y = l.itemRefCallback) == null ? void 0 : y.call(l, x, r, o);
      }
    ), g = we(), b = u.useRef("touch"), w = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ f(
      Bg,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: g,
        isSelected: c,
        onItemTextChange: u.useCallback((x) => {
          m((y) => y || ((x == null ? void 0 : x.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ f(
          Er.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: d,
            children: /* @__PURE__ */ f(
              q.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": c && h,
                "data-state": c ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: v,
                onFocus: V(s.onFocus, () => p(!0)),
                onBlur: V(s.onBlur, () => p(!1)),
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
                  var C;
                  ((C = l.searchRef) == null ? void 0 : C.current) !== "" && x.key === " " || (Rg.includes(x.key) && w(), x.key === " " && x.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
uc.displayName = lr;
var fn = "SelectItemText", fc = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = wt(fn, n), i = xt(fn, n), l = dc(fn, n), c = Og(fn, n), [d, m] = u.useState(null), h = te(
      t,
      (w) => m(w),
      l.onItemTextChange,
      (w) => {
        var x;
        return (x = i.itemTextRefCallback) == null ? void 0 : x.call(i, w, l.value, l.disabled);
      }
    ), p = d == null ? void 0 : d.textContent, v = u.useMemo(
      () => /* @__PURE__ */ f("option", { value: l.value, disabled: l.disabled, children: p }, l.value),
      [l.disabled, l.value, p]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: b } = c;
    return xe(() => (g(v), () => b(v)), [g, b, v]), /* @__PURE__ */ T(Me, { children: [
      /* @__PURE__ */ f(q.span, { id: l.textId, ...a, ref: h }),
      l.isSelected && s.valueNode && !s.valueNodeHasChildren ? fr.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
fc.displayName = fn;
var mc = "SelectItemIndicator", hc = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return dc(mc, n).isSelected ? /* @__PURE__ */ f(q.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
hc.displayName = mc;
var Po = "SelectScrollUpButton", pc = u.forwardRef((e, t) => {
  const n = xt(Po, e.__scopeSelect), r = xa(Po, e.__scopeSelect), [o, a] = u.useState(!1), s = te(t, r.onScrollButtonChange);
  return xe(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const c = l.scrollTop > 0;
        a(c);
      };
      const l = n.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ f(
    vc,
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
pc.displayName = Po;
var Eo = "SelectScrollDownButton", gc = u.forwardRef((e, t) => {
  const n = xt(Eo, e.__scopeSelect), r = xa(Eo, e.__scopeSelect), [o, a] = u.useState(!1), s = te(t, r.onScrollButtonChange);
  return xe(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const c = l.scrollHeight - l.clientHeight, d = Math.ceil(l.scrollTop) < c;
        a(d);
      };
      const l = n.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ f(
    vc,
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
gc.displayName = Eo;
var vc = u.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = xt("SelectScrollButton", n), s = u.useRef(null), i = Dr(n), l = u.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return u.useEffect(() => () => l(), [l]), xe(() => {
    var d;
    const c = i().find((m) => m.ref.current === document.activeElement);
    (d = c == null ? void 0 : c.ref.current) == null || d.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ f(
    q.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: V(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: V(o.onPointerMove, () => {
        var c;
        (c = a.onItemLeave) == null || c.call(a), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: V(o.onPointerLeave, () => {
        l();
      })
    }
  );
}), Vg = "SelectSeparator", bc = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ f(q.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
bc.displayName = Vg;
var Do = "SelectArrow", Hg = u.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Or(n), a = wt(Do, n), s = xt(Do, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ f(la, { ...o, ...r, ref: t }) : null;
  }
);
Hg.displayName = Do;
var Yg = "SelectBubbleInput", yc = u.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = u.useRef(null), a = te(r, o), s = Zo(t);
    return u.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const l = window.HTMLSelectElement.prototype, d = Object.getOwnPropertyDescriptor(
        l,
        "value"
      ).set;
      if (s !== t && d) {
        const m = new Event("change", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(m);
      }
    }, [s, t]), /* @__PURE__ */ f(
      q.select,
      {
        ...n,
        style: { ...Yi, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
yc.displayName = Yg;
function wc(e) {
  return e === "" || e === void 0;
}
function xc(e) {
  const t = ye(e), n = u.useRef(""), r = u.useRef(0), o = u.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), (function l(c) {
        n.current = c, window.clearTimeout(r.current), c !== "" && (r.current = window.setTimeout(() => l(""), 1e3));
      })(i);
    },
    [t]
  ), a = u.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return u.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function Sc(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = Gg(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((c) => c !== n));
  const l = s.find(
    (c) => c.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
function Gg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Ug = Kl, jg = Xl, Kg = Ql, qg = Jl, Xg = ec, Zg = tc, Qg = ac, Jg = sc, ev = cc, tv = uc, nv = fc, rv = hc, ov = pc, av = gc, iv = bc, sv = "Separator", li = "horizontal", lv = ["horizontal", "vertical"], Cc = u.forwardRef((e, t) => {
  const { decorative: n, orientation: r = li, ...o } = e, a = cv(r) ? r : li, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ f(
    q.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
Cc.displayName = sv;
function cv(e) {
  return lv.includes(e);
}
var dv = Cc, kc = ["PageUp", "PageDown"], Mc = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Nc = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, tn = "Slider", [Oo, uv, fv] = mr(tn), [Rc, US] = Ve(tn, [
  fv
]), [mv, _r] = Rc(tn), Pc = u.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: l = 0,
      defaultValue: c = [r],
      value: d,
      onValueChange: m = () => {
      },
      onValueCommit: h = () => {
      },
      inverted: p = !1,
      form: v,
      ...g
    } = e, b = u.useRef(/* @__PURE__ */ new Set()), w = u.useRef(0), y = s === "horizontal" ? hv : pv, [C = [], S] = at({
      prop: d,
      defaultProp: c,
      onChange: (_) => {
        var Y;
        (Y = [...b.current][w.current]) == null || Y.focus(), m(_);
      }
    }), N = u.useRef(C);
    function M(_) {
      const I = wv(C, _);
      O(_, I);
    }
    function k(_) {
      O(_, w.current);
    }
    function R() {
      const _ = N.current[w.current];
      C[w.current] !== _ && h(C);
    }
    function O(_, I, { commit: Y } = { commit: !1 }) {
      const H = kv(a), j = Mv(Math.round((_ - r) / a) * a + r, H), $ = yn(j, [r, o]);
      S((K = []) => {
        const P = bv(K, $, I);
        if (Cv(P, l * a)) {
          w.current = P.indexOf($);
          const D = String(P) !== String(K);
          return D && Y && h(P), D ? P : K;
        } else
          return K;
      });
    }
    return /* @__PURE__ */ f(
      mv,
      {
        scope: e.__scopeSlider,
        name: n,
        disabled: i,
        min: r,
        max: o,
        valueIndexToChangeRef: w,
        thumbs: b.current,
        values: C,
        orientation: s,
        form: v,
        children: /* @__PURE__ */ f(Oo.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ f(Oo.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ f(
          y,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: V(g.onPointerDown, () => {
              i || (N.current = C);
            }),
            min: r,
            max: o,
            inverted: p,
            onSlideStart: i ? void 0 : M,
            onSlideMove: i ? void 0 : k,
            onSlideEnd: i ? void 0 : R,
            onHomeKeyDown: () => !i && O(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && O(o, C.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: _, direction: I }) => {
              if (!i) {
                const j = kc.includes(_.key) || _.shiftKey && Mc.includes(_.key) ? 10 : 1, $ = w.current, K = C[$], P = a * j * I;
                O(K + P, $, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
Pc.displayName = tn;
var [Ec, Dc] = Rc(tn, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), hv = u.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: l,
      onStepKeyDown: c,
      ...d
    } = e, [m, h] = u.useState(null), p = te(t, (y) => h(y)), v = u.useRef(void 0), g = Cn(o), b = g === "ltr", w = b && !a || !b && a;
    function x(y) {
      const C = v.current || m.getBoundingClientRect(), S = [0, C.width], M = Sa(S, w ? [n, r] : [r, n]);
      return v.current = C, M(y - C.left);
    }
    return /* @__PURE__ */ f(
      Ec,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ f(
          Oc,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...d,
            ref: p,
            style: {
              ...d.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (y) => {
              const C = x(y.clientX);
              s == null || s(C);
            },
            onSlideMove: (y) => {
              const C = x(y.clientX);
              i == null || i(C);
            },
            onSlideEnd: () => {
              v.current = void 0, l == null || l();
            },
            onStepKeyDown: (y) => {
              const S = Nc[w ? "from-left" : "from-right"].includes(y.key);
              c == null || c({ event: y, direction: S ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), pv = u.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: l,
      ...c
    } = e, d = u.useRef(null), m = te(t, d), h = u.useRef(void 0), p = !o;
    function v(g) {
      const b = h.current || d.current.getBoundingClientRect(), w = [0, b.height], y = Sa(w, p ? [r, n] : [n, r]);
      return h.current = b, y(g - b.top);
    }
    return /* @__PURE__ */ f(
      Ec,
      {
        scope: e.__scopeSlider,
        startEdge: p ? "bottom" : "top",
        endEdge: p ? "top" : "bottom",
        size: "height",
        direction: p ? 1 : -1,
        children: /* @__PURE__ */ f(
          Oc,
          {
            "data-orientation": "vertical",
            ...c,
            ref: m,
            style: {
              ...c.style,
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
              const w = Nc[p ? "from-bottom" : "from-top"].includes(g.key);
              l == null || l({ event: g, direction: w ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Oc = u.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: l,
      ...c
    } = e, d = _r(tn, n);
    return /* @__PURE__ */ f(
      q.span,
      {
        ...c,
        ref: t,
        onKeyDown: V(e.onKeyDown, (m) => {
          m.key === "Home" ? (s(m), m.preventDefault()) : m.key === "End" ? (i(m), m.preventDefault()) : kc.concat(Mc).includes(m.key) && (l(m), m.preventDefault());
        }),
        onPointerDown: V(e.onPointerDown, (m) => {
          const h = m.target;
          h.setPointerCapture(m.pointerId), m.preventDefault(), d.thumbs.has(h) ? h.focus() : r(m);
        }),
        onPointerMove: V(e.onPointerMove, (m) => {
          m.target.hasPointerCapture(m.pointerId) && o(m);
        }),
        onPointerUp: V(e.onPointerUp, (m) => {
          const h = m.target;
          h.hasPointerCapture(m.pointerId) && (h.releasePointerCapture(m.pointerId), a(m));
        })
      }
    );
  }
), _c = "SliderTrack", Tc = u.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = _r(_c, n);
    return /* @__PURE__ */ f(
      q.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...r,
        ref: t
      }
    );
  }
);
Tc.displayName = _c;
var _o = "SliderRange", Ac = u.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = _r(_o, n), a = Dc(_o, n), s = u.useRef(null), i = te(t, s), l = o.values.length, c = o.values.map(
      (h) => Lc(h, o.min, o.max)
    ), d = l > 1 ? Math.min(...c) : 0, m = 100 - Math.max(...c);
    return /* @__PURE__ */ f(
      q.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: i,
        style: {
          ...e.style,
          [a.startEdge]: d + "%",
          [a.endEdge]: m + "%"
        }
      }
    );
  }
);
Ac.displayName = _o;
var To = "SliderThumb", Ic = u.forwardRef(
  (e, t) => {
    const n = uv(e.__scopeSlider), [r, o] = u.useState(null), a = te(t, (i) => o(i)), s = u.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ f(gv, { ...e, ref: a, index: s });
  }
), gv = u.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = _r(To, n), i = Dc(To, n), [l, c] = u.useState(null), d = te(t, (x) => c(x)), m = l ? s.form || !!l.closest("form") : !0, h = Qo(l), p = s.values[r], v = p === void 0 ? 0 : Lc(p, s.min, s.max), g = yv(r, s.values.length), b = h == null ? void 0 : h[i.size], w = b ? xv(b, v, i.direction) : 0;
    return u.useEffect(() => {
      if (l)
        return s.thumbs.add(l), () => {
          s.thumbs.delete(l);
        };
    }, [l, s.thumbs]), /* @__PURE__ */ T(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${v}% + ${w}px)`
        },
        children: [
          /* @__PURE__ */ f(Oo.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ f(
            q.span,
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
              ref: d,
              style: p === void 0 ? { display: "none" } : e.style,
              onFocus: V(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          m && /* @__PURE__ */ f(
            zc,
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
Ic.displayName = To;
var vv = "RadioBubbleInput", zc = u.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = u.useRef(null), a = te(o, r), s = Zo(t);
    return u.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const l = window.HTMLInputElement.prototype, d = Object.getOwnPropertyDescriptor(l, "value").set;
      if (s !== t && d) {
        const m = new Event("input", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(m);
      }
    }, [s, t]), /* @__PURE__ */ f(
      q.input,
      {
        style: { display: "none" },
        ...n,
        ref: a,
        defaultValue: t
      }
    );
  }
);
zc.displayName = vv;
function bv(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function Lc(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return yn(a, [0, 100]);
}
function yv(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function wv(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function xv(e, t, n) {
  const r = e / 2, a = Sa([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function Sv(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function Cv(e, t) {
  if (t > 0) {
    const n = Sv(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function Sa(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function kv(e) {
  return (String(e).split(".")[1] || "").length;
}
function Mv(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var Nv = Pc, Rv = Tc, Pv = Ac, Ev = Ic, Tr = "Switch", [Dv, jS] = Ve(Tr), [Ov, _v] = Dv(Tr), Fc = u.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: l = "on",
      onCheckedChange: c,
      form: d,
      ...m
    } = e, [h, p] = u.useState(null), v = te(t, (y) => p(y)), g = u.useRef(!1), b = h ? d || !!h.closest("form") : !0, [w, x] = at({
      prop: o,
      defaultProp: a ?? !1,
      onChange: c,
      caller: Tr
    });
    return /* @__PURE__ */ T(Ov, { scope: n, checked: w, disabled: i, children: [
      /* @__PURE__ */ f(
        q.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": s,
          "data-state": Vc(w),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...m,
          ref: v,
          onClick: V(e.onClick, (y) => {
            x((C) => !C), b && (g.current = y.isPropagationStopped(), g.current || y.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ f(
        Bc,
        {
          control: h,
          bubbles: !g.current,
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
Fc.displayName = Tr;
var Wc = "SwitchThumb", $c = u.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = _v(Wc, n);
    return /* @__PURE__ */ f(
      q.span,
      {
        "data-state": Vc(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
$c.displayName = Wc;
var Tv = "SwitchBubbleInput", Bc = u.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = u.useRef(null), i = te(s, a), l = Zo(n), c = Qo(t);
    return u.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const m = window.HTMLInputElement.prototype, p = Object.getOwnPropertyDescriptor(
        m,
        "checked"
      ).set;
      if (l !== n && p) {
        const v = new Event("click", { bubbles: r });
        p.call(d, n), d.dispatchEvent(v);
      }
    }, [l, n, r]), /* @__PURE__ */ f(
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
          ...c,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Bc.displayName = Tv;
function Vc(e) {
  return e ? "checked" : "unchecked";
}
var Av = Fc, Iv = $c;
const Ca = "-", zv = (e) => {
  const t = Fv(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(Ca);
      return i[0] === "" && i.length !== 1 && i.shift(), Hc(i, t) || Lv(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const l = n[s] || [];
      return i && r[s] ? [...l, ...r[s]] : l;
    }
  };
}, Hc = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Hc(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Ca);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, ci = /^\[(.+)\]$/, Lv = (e) => {
  if (ci.test(e)) {
    const t = ci.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Fv = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Ao(n[o], r, o, t);
  return r;
}, Ao = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : di(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Wv(o)) {
        Ao(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Ao(s, di(t, a), n, r);
    });
  });
}, di = (e, t) => {
  let n = e;
  return t.split(Ca).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Wv = (e) => e.isThemeGetter, $v = (e) => {
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
}, Io = "!", zo = ":", Bv = zo.length, Vv = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const a = [];
    let s = 0, i = 0, l = 0, c;
    for (let v = 0; v < o.length; v++) {
      let g = o[v];
      if (s === 0 && i === 0) {
        if (g === zo) {
          a.push(o.slice(l, v)), l = v + Bv;
          continue;
        }
        if (g === "/") {
          c = v;
          continue;
        }
      }
      g === "[" ? s++ : g === "]" ? s-- : g === "(" ? i++ : g === ")" && i--;
    }
    const d = a.length === 0 ? o : o.substring(l), m = Hv(d), h = m !== d, p = c && c > l ? c - l : void 0;
    return {
      modifiers: a,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: p
    };
  };
  if (t) {
    const o = t + zo, a = r;
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
}, Hv = (e) => e.endsWith(Io) ? e.substring(0, e.length - 1) : e.startsWith(Io) ? e.substring(1) : e, Yv = (e) => {
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
}, Gv = (e) => ({
  cache: $v(e.cacheSize),
  parseClassName: Vv(e),
  sortModifiers: Yv(e),
  ...zv(e)
}), Uv = /\s+/, jv = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, s = [], i = e.trim().split(Uv);
  let l = "";
  for (let c = i.length - 1; c >= 0; c -= 1) {
    const d = i[c], {
      isExternal: m,
      modifiers: h,
      hasImportantModifier: p,
      baseClassName: v,
      maybePostfixModifierPosition: g
    } = n(d);
    if (m) {
      l = d + (l.length > 0 ? " " + l : l);
      continue;
    }
    let b = !!g, w = r(b ? v.substring(0, g) : v);
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
    const x = a(h).join(":"), y = p ? x + Io : x, C = y + w;
    if (s.includes(C))
      continue;
    s.push(C);
    const S = o(w, b);
    for (let N = 0; N < S.length; ++N) {
      const M = S[N];
      s.push(y + M);
    }
    l = d + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Kv() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Yc(t)) && (r && (r += " "), r += n);
  return r;
}
const Yc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Yc(e[r])) && (n && (n += " "), n += t);
  return n;
};
function qv(e, ...t) {
  let n, r, o, a = s;
  function s(l) {
    const c = t.reduce((d, m) => m(d), e());
    return n = Gv(c), r = n.cache.get, o = n.cache.set, a = i, i(l);
  }
  function i(l) {
    const c = r(l);
    if (c)
      return c;
    const d = jv(l, n);
    return o(l, d), d;
  }
  return function() {
    return a(Kv.apply(null, arguments));
  };
}
const ve = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Gc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Uc = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Xv = /^\d+\/\d+$/, Zv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Qv = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Jv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, eb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, tb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Wt = (e) => Xv.test(e), oe = (e) => !!e && !Number.isNaN(Number(e)), dt = (e) => !!e && Number.isInteger(Number(e)), eo = (e) => e.endsWith("%") && oe(e.slice(0, -1)), et = (e) => Zv.test(e), nb = () => !0, rb = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Qv.test(e) && !Jv.test(e)
), jc = () => !1, ob = (e) => eb.test(e), ab = (e) => tb.test(e), ib = (e) => !G(e) && !U(e), sb = (e) => nn(e, Xc, jc), G = (e) => Gc.test(e), Mt = (e) => nn(e, Zc, rb), to = (e) => nn(e, fb, oe), ui = (e) => nn(e, Kc, jc), lb = (e) => nn(e, qc, ab), Gn = (e) => nn(e, Qc, ob), U = (e) => Uc.test(e), an = (e) => rn(e, Zc), cb = (e) => rn(e, mb), fi = (e) => rn(e, Kc), db = (e) => rn(e, Xc), ub = (e) => rn(e, qc), Un = (e) => rn(e, Qc, !0), nn = (e, t, n) => {
  const r = Gc.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, rn = (e, t, n = !1) => {
  const r = Uc.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Kc = (e) => e === "position" || e === "percentage", qc = (e) => e === "image" || e === "url", Xc = (e) => e === "length" || e === "size" || e === "bg-size", Zc = (e) => e === "length", fb = (e) => e === "number", mb = (e) => e === "family-name", Qc = (e) => e === "shadow", hb = () => {
  const e = ve("color"), t = ve("font"), n = ve("text"), r = ve("font-weight"), o = ve("tracking"), a = ve("leading"), s = ve("breakpoint"), i = ve("container"), l = ve("spacing"), c = ve("radius"), d = ve("shadow"), m = ve("inset-shadow"), h = ve("text-shadow"), p = ve("drop-shadow"), v = ve("blur"), g = ve("perspective"), b = ve("aspect"), w = ve("ease"), x = ve("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
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
  ], S = () => [...C(), U, G], N = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", "contain", "none"], k = () => [U, G, l], R = () => [Wt, "full", "auto", ...k()], O = () => [dt, "none", "subgrid", U, G], _ = () => ["auto", {
    span: ["full", dt, U, G]
  }, dt, U, G], I = () => [dt, "auto", U, G], Y = () => ["auto", "min", "max", "fr", U, G], H = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], j = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], $ = () => ["auto", ...k()], K = () => [Wt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...k()], P = () => [e, U, G], D = () => [...C(), fi, ui, {
    position: [U, G]
  }], Z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ne = () => ["auto", "cover", "contain", db, sb, {
    size: [U, G]
  }], E = () => [eo, an, Mt], F = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    U,
    G
  ], z = () => ["", oe, an, Mt], W = () => ["solid", "dashed", "dotted", "double"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], A = () => [oe, eo, fi, ui], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    U,
    G
  ], Q = () => ["none", oe, U, G], re = () => ["none", oe, U, G], se = () => [oe, U, G], ie = () => [Wt, "full", ...k()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [et],
      breakpoint: [et],
      color: [nb],
      container: [et],
      "drop-shadow": [et],
      ease: ["in", "out", "in-out"],
      font: [ib],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [et],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [et],
      shadow: [et],
      spacing: ["px", oe],
      text: [et],
      "text-shadow": [et],
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
        aspect: ["auto", "square", Wt, G, U, b]
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
        columns: [oe, G, U, i]
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
        object: S()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: N()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": N()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": N()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: M()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": M()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": M()
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
        inset: R()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": R()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": R()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: R()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: R()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: R()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: R()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: R()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: R()
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
        z: [dt, "auto", U, G]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Wt, "full", "auto", i, ...k()]
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
        flex: [oe, Wt, "auto", "initial", "none", G]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", oe, U, G]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", oe, U, G]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [dt, "first", "last", "none", U, G]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": O()
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
        "col-start": I()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": I()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": O()
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
        "row-start": I()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": I()
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
        "auto-cols": Y()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Y()
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
        justify: [...H(), "normal"]
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
        content: ["normal", ...H()]
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
        "place-content": H()
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
        m: $()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: $()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: $()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: $()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: $()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: $()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: $()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: $()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: $()
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
        size: K()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...K()]
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
          ...K()
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
          ...K()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...K()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...K()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...K()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, an, Mt]
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
        font: [r, U, to]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", eo, G]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [cb, G, t]
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
        tracking: [o, U, G]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [oe, "none", U, to]
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
        "list-image": ["none", U, G]
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
        list: ["disc", "decimal", "none", U, G]
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
        decoration: [...W(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [oe, "from-font", "auto", U, Mt]
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
        "underline-offset": [oe, "auto", U, G]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", U, G]
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
        content: ["none", U, G]
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
        bg: D()
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
        bg: ne()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, dt, U, G],
          radial: ["", U, G],
          conic: [dt, U, G]
        }, ub, lb]
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
        from: E()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: E()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: E()
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
        rounded: F()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": F()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": F()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": F()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": F()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": F()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": F()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": F()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": F()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": F()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": F()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": F()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": F()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": F()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": F()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: z()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": z()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": z()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": z()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": z()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": z()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": z()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": z()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": z()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": z()
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
        "divide-y": z()
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
        border: [...W(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...W(), "hidden", "none"]
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
        outline: [...W(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [oe, U, G]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", oe, an, Mt]
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
          Un,
          Gn
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
        "inset-shadow": ["none", m, Un, Gn]
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
        ring: z()
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
        "ring-offset": [oe, Mt]
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
        "inset-ring": z()
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
        "text-shadow": ["none", h, Un, Gn]
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
        opacity: [oe, U, G]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...J(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": J()
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
        "mask-linear": [oe]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": A()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": A()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": A()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": A()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": A()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": A()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": A()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": A()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": A()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": A()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": A()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": A()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": A()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": A()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [U, G]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": A()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": A()
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
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [oe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": A()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": A()
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
        mask: D()
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
        mask: ne()
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
        mask: ["none", U, G]
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
          U,
          G
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ee()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [oe, U, G]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [oe, U, G]
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
          Un,
          Gn
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
        grayscale: ["", oe, U, G]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [oe, U, G]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", oe, U, G]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [oe, U, G]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", oe, U, G]
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
          U,
          G
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ee()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [oe, U, G]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [oe, U, G]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", oe, U, G]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [oe, U, G]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", oe, U, G]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [oe, U, G]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [oe, U, G]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", oe, U, G]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", U, G]
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
        duration: [oe, "initial", U, G]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, U, G]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [oe, U, G]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, U, G]
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
        perspective: [g, U, G]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": S()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Q()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Q()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Q()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Q()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: re()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": re()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": re()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": re()
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
        skew: se()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": se()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": se()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [U, G, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: S()
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
        translate: ie()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ie()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ie()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ie()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", U, G]
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
        "will-change": ["auto", "scroll", "contents", "transform", U, G]
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
        stroke: [oe, an, Mt, to]
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
}, Jc = /* @__PURE__ */ qv(hb);
function ce(...e) {
  return Jc(Uo(e));
}
const pb = Sn(
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
function no({
  className: e,
  variant: t = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ f(
    n ? jo : "span",
    {
      "data-slot": "badge",
      "data-variant": t,
      className: ce(pb({ variant: t }), e),
      ...r
    }
  );
}
const gb = Sn(
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
function _e({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ f(
    r ? jo : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      className: ce(gb({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function KS({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card",
      "data-size": t,
      className: ce("ring-foreground/10 bg-card text-card-foreground gap-6 overflow-hidden rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col", e),
      ...n
    }
  );
}
function qS({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card-header",
      className: ce(
        "gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        e
      ),
      ...t
    }
  );
}
function XS({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card-title",
      className: ce("text-base leading-normal font-medium group-data-[size=sm]/card:text-sm cn-font-heading", e),
      ...t
    }
  );
}
function ZS({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card-description",
      className: ce("text-muted-foreground text-sm", e),
      ...t
    }
  );
}
function QS({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card-action",
      className: ce(
        "cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        e
      ),
      ...t
    }
  );
}
function JS({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card-content",
      className: ce("px-6 group-data-[size=sm]/card:px-4", e),
      ...t
    }
  );
}
function eC({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "card-footer",
      className: ce("rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center", e),
      ...t
    }
  );
}
function vb(e) {
  const t = u.useRef(e);
  return u.useEffect(() => {
    t.current = e;
  }), u.useMemo(
    () => ((...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    }),
    []
  );
}
function tC(e, t) {
  const n = vb(e), r = u.useRef(0);
  return u.useEffect(
    () => () => window.clearTimeout(r.current),
    []
  ), u.useCallback(
    (...a) => {
      window.clearTimeout(r.current), r.current = window.setTimeout(
        () => n(...a),
        t
      );
    },
    [n, t]
  );
}
function cr({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ f(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: ce(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...n
    }
  );
}
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bb = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ed = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var yb = {
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
const wb = Fi(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, l) => go(
    "svg",
    {
      ref: l,
      ...yb,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: ed("lucide", o),
      ...i
    },
    [
      ...s.map(([c, d]) => go(c, d)),
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
const pe = (e, t) => {
  const n = Fi(
    ({ className: r, ...o }, a) => go(wb, {
      ref: a,
      iconNode: t,
      className: ed(`lucide-${bb(e)}`, r),
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
const xb = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], mi = pe("ArrowDown", xb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sb = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
], Cb = pe("ArrowLeftToLine", Sb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kb = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], Mb = pe("ArrowLeft", kb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nb = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], Rb = pe("ArrowRightToLine", Nb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pb = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], Eb = pe("ArrowRight", Pb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Db = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], hi = pe("ArrowUp", Db);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ob = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], _b = pe("Calendar", Ob);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tb = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], mt = pe("Check", Tb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ab = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ka = pe("ChevronDown", Ab);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ib = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], td = pe("ChevronLeft", Ib);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zb = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Ma = pe("ChevronRight", zb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lb = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Fb = pe("ChevronUp", Lb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wb = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], $b = pe("ChevronsLeft", Wb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bb = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], Vb = pe("ChevronsRight", Bb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hb = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], Yb = pe("ChevronsUpDown", Hb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gb = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], nd = pe("CirclePlus", Gb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ub = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Na = pe("CircleX", Ub);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jb = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Kb = pe("LoaderCircle", jb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qb = [
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
], Xb = pe("PinOff", qb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zb = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], Qb = pe("Search", Zb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jb = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], rd = pe("Settings2", Jb);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ey = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], ty = pe("X", ey);
function od({
  ...e
}) {
  return /* @__PURE__ */ f(Ug, { "data-slot": "select", ...e });
}
function nC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    Jg,
    {
      "data-slot": "select-group",
      className: ce("scroll-my-1 p-1", e),
      ...t
    }
  );
}
function ad({
  ...e
}) {
  return /* @__PURE__ */ f(Kg, { "data-slot": "select-value", ...e });
}
function id({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ T(
    jg,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: ce(
        "border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ f(qg, { asChild: !0, children: /* @__PURE__ */ f(ka, { className: "text-muted-foreground size-4 pointer-events-none" }) })
      ]
    }
  );
}
function sd({
  className: e,
  children: t,
  position: n = "item-aligned",
  align: r = "center",
  ...o
}) {
  return /* @__PURE__ */ f(Xg, { children: /* @__PURE__ */ T(
    Zg,
    {
      "data-slot": "select-content",
      "data-align-trigger": n === "item-aligned",
      className: ce(
        "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-md shadow-md ring-1 duration-100 cn-menu-target cn-menu-translucent relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      align: r,
      ...o,
      children: [
        /* @__PURE__ */ f(ny, {}),
        /* @__PURE__ */ f(
          Qg,
          {
            "data-position": n,
            className: ce(
              "cn-select-viewport data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
              n === "popper" && ""
            ),
            children: t
          }
        ),
        /* @__PURE__ */ f(ry, {})
      ]
    }
  ) });
}
function rC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    ev,
    {
      "data-slot": "select-label",
      className: ce("text-muted-foreground px-2 py-1.5 text-xs", e),
      ...t
    }
  );
}
function ld({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ T(
    tv,
    {
      "data-slot": "select-item",
      className: ce(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ f("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center", children: /* @__PURE__ */ f(rv, { children: /* @__PURE__ */ f(mt, { className: "cn-select-item-indicator-icon pointer-events-none" }) }) }),
        /* @__PURE__ */ f(nv, { children: t })
      ]
    }
  );
}
function oC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    iv,
    {
      "data-slot": "select-separator",
      className: ce("bg-border -mx-1 my-1 h-px pointer-events-none", e),
      ...t
    }
  );
}
function ny({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    ov,
    {
      "data-slot": "select-scroll-up-button",
      className: ce("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", e),
      ...t,
      children: /* @__PURE__ */ f(Fb, {})
    }
  );
}
function ry({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    av,
    {
      "data-slot": "select-scroll-down-button",
      className: ce("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", e),
      ...t,
      children: /* @__PURE__ */ f(ka, {})
    }
  );
}
function aC({
  options: e,
  value: t,
  onChange: n,
  placeholder: r,
  disabled: o,
  className: a
}) {
  return /* @__PURE__ */ T(od, { value: t, onValueChange: n, disabled: o, children: [
    /* @__PURE__ */ f(id, { className: a, children: /* @__PURE__ */ f(ad, { placeholder: r }) }),
    /* @__PURE__ */ f(sd, { children: e.map((s) => /* @__PURE__ */ f(ld, { value: s.value, children: s.label }, s.value)) })
  ] });
}
function iC({
  className: e,
  size: t = "default",
  label: n,
  description: r,
  card: o,
  ...a
}) {
  const s = /* @__PURE__ */ f(
    Av,
    {
      "data-slot": "switch",
      "data-size": t,
      className: ce(
        "data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent shadow-xs focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        e
      ),
      ...a,
      children: /* @__PURE__ */ f(
        Iv,
        {
          "data-slot": "switch-thumb",
          className: "bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform"
        }
      )
    }
  );
  if (!n) return s;
  const i = !!r;
  return /* @__PURE__ */ T(
    "label",
    {
      "data-slot": "switch-field",
      className: ce(
        "flex gap-3 select-none",
        i ? "items-start" : "items-center",
        o && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        a.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ f("div", { className: ce(i && "pt-0.5"), children: s }),
        /* @__PURE__ */ T("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ f("span", { className: "text-sm font-medium leading-none", children: n }),
          r && /* @__PURE__ */ f("span", { className: "text-sm text-muted-foreground", children: r })
        ] })
      ]
    }
  );
}
function oy({ className: e, ...t }) {
  return /* @__PURE__ */ f("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ f(
    "table",
    {
      "data-slot": "table",
      className: ce("w-full caption-bottom text-sm", e),
      ...t
    }
  ) });
}
function ay({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "thead",
    {
      "data-slot": "table-header",
      className: ce("[&_tr]:border-b", e),
      ...t
    }
  );
}
function iy({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "tbody",
    {
      "data-slot": "table-body",
      className: ce("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function sC({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: ce("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", e),
      ...t
    }
  );
}
function pi({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "tr",
    {
      "data-slot": "table-row",
      className: ce("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", e),
      ...t
    }
  );
}
function sy({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "th",
    {
      "data-slot": "table-head",
      className: ce("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
      ...t
    }
  );
}
function ly({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "td",
    {
      "data-slot": "table-cell",
      className: ce("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", e),
      ...t
    }
  );
}
function lC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    "caption",
    {
      "data-slot": "table-caption",
      className: ce("text-muted-foreground mt-4 text-sm", e),
      ...t
    }
  );
}
function L(...e) {
  return Jc(Uo(e));
}
function gi(e) {
  const t = e.columnDef.meta;
  if (typeof (t == null ? void 0 : t.headerTitle) == "string") return t.headerTitle;
  const n = e.columnDef.header;
  return typeof n == "string" ? n : String(e.id);
}
const cd = Wi(void 0);
function ge() {
  const e = $i(cd);
  if (!e)
    throw new Error("useDataGrid must be used within a DataGridProvider");
  return e;
}
function cy({
  children: e,
  table: t,
  ...n
}) {
  var s, i;
  const r = t.getState(), o = ((s = n.tableLayout) == null ? void 0 : s.columnsResizeMode) ?? "onEnd";
  ur(() => {
    var l;
    (l = n.tableLayout) != null && l.columnsResizable && (t.options.columnResizeMode = o);
  }, [(i = n.tableLayout) == null ? void 0 : i.columnsResizable, o, t]);
  const a = Yt(
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
  return /* @__PURE__ */ f(cd.Provider, { value: a, children: e });
}
function dy({
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
  return /* @__PURE__ */ f(cy, { table: t, ...o, children: e });
}
function uy({
  children: e,
  className: t,
  border: n = !0
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "data-grid",
      className: L(
        "w-full overflow-hidden",
        n && "border-border rounded-md border",
        t
      ),
      children: e
    }
  );
}
const fy = 24, my = 12, jn = {
  hasVerticalOverflow: !1,
  headerHeight: 0,
  horizontalScrollbarSize: 0,
  thumbHeight: 0,
  thumbTop: 0,
  trackHeight: 0
};
function ro(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function vi(e, t) {
  return e.hasVerticalOverflow === t.hasVerticalOverflow && e.headerHeight === t.headerHeight && e.horizontalScrollbarSize === t.horizontalScrollbarSize && e.thumbHeight === t.thumbHeight && e.thumbTop === t.thumbTop && e.trackHeight === t.trackHeight;
}
function bi(e, t) {
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
function hy({
  children: e,
  className: t,
  orientation: n = "both",
  ...r
}) {
  var M;
  const { props: o } = ge(), a = tt(null), s = tt(null), i = tt(null), l = tt(jn), c = tt({
    header: null,
    horizontalScrollbar: null,
    table: null,
    tableViewport: null
  }), d = n !== "vertical", m = n !== "horizontal", h = m && !!((M = o.tableLayout) != null && M.headerSticky), [p, v] = Rt(!1), g = Ce(() => {
    i.current = null, document.body.style.userSelect = "", document.body.style.webkitUserSelect = "";
  }, []), b = Ce(() => {
    const k = a.current;
    k && !vi(jn, l.current) && (bi(k, jn), l.current = jn), v((R) => R && !1);
  }, []), w = Ce(() => {
    const k = a.current, R = s.current;
    if (!k || !R || !h) {
      b();
      return;
    }
    const { header: O, horizontalScrollbar: _ } = c.current, I = (O == null ? void 0 : O.getBoundingClientRect().height) ?? 0, Y = R.clientHeight, H = R.clientWidth, j = R.scrollHeight, $ = R.scrollWidth, P = d && $ > H + 0.5 ? (_ == null ? void 0 : _.offsetHeight) || my : 0, D = Math.max(
      0,
      Y - I - P
    ), Z = Math.max(0, j - Y);
    let ne;
    if (D === 0 || Z === 0)
      ne = {
        hasVerticalOverflow: !1,
        headerHeight: I,
        horizontalScrollbarSize: P,
        thumbHeight: D,
        thumbTop: 0,
        trackHeight: D
      };
    else {
      const E = Math.max(
        D,
        j - I
      ), F = ro(
        D * (D / E),
        fy,
        D
      ), z = Math.max(0, D - F), W = z > 0 ? R.scrollTop / Z * z : 0;
      ne = {
        hasVerticalOverflow: !0,
        headerHeight: I,
        horizontalScrollbarSize: P,
        thumbHeight: F,
        thumbTop: W,
        trackHeight: D
      };
    }
    vi(ne, l.current) || (bi(k, ne), l.current = ne), v(
      (E) => E === ne.hasVerticalOverflow ? E : ne.hasVerticalOverflow
    );
  }, [b, d, h]);
  ur(() => {
    const k = a.current, R = s.current;
    if (!k || !R) return;
    if (!h) {
      b();
      return;
    }
    c.current = {
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
    let O = 0;
    const _ = () => {
      cancelAnimationFrame(O), O = window.requestAnimationFrame(w);
    };
    _(), R.addEventListener("scroll", _, { passive: !0 });
    const I = typeof ResizeObserver > "u" ? null : new ResizeObserver(_);
    return I == null || I.observe(R), c.current.header && (I == null || I.observe(c.current.header)), c.current.table && (I == null || I.observe(c.current.table)), c.current.tableViewport && (I == null || I.observe(c.current.tableViewport)), () => {
      cancelAnimationFrame(O), I == null || I.disconnect(), R.removeEventListener("scroll", _), g();
    };
  }, [
    g,
    b,
    w,
    h
  ]);
  const x = (k) => {
    const R = s.current, { thumbHeight: O, trackHeight: _ } = l.current;
    if (!R) return;
    const I = Math.max(0, R.scrollHeight - R.clientHeight), Y = Math.max(0, _ - O);
    if (I === 0 || Y === 0) {
      R.scrollTop = 0;
      return;
    }
    const H = ro(k, 0, Y) / Y;
    R.scrollTop = H * I;
  }, y = (k) => {
    const R = s.current;
    R && (k.preventDefault(), k.stopPropagation(), k.currentTarget.setPointerCapture(k.pointerId), i.current = {
      pointerId: k.pointerId,
      startScrollTop: R.scrollTop,
      startY: k.clientY
    }, document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }, C = (k) => {
    const R = s.current, O = i.current, { thumbHeight: _, trackHeight: I } = l.current;
    if (!R || !O || O.pointerId !== k.pointerId)
      return;
    const Y = Math.max(0, I - _), H = Math.max(0, R.scrollHeight - R.clientHeight);
    if (Y === 0 || H === 0) return;
    const j = k.clientY - O.startY, $ = O.startScrollTop + j / Y * H;
    R.scrollTop = ro($, 0, H);
  }, S = (k) => {
    var R;
    ((R = i.current) == null ? void 0 : R.pointerId) === k.pointerId && g();
  }, N = (k) => {
    const { thumbHeight: R } = l.current;
    if (k.target !== k.currentTarget) return;
    k.preventDefault(), k.stopPropagation();
    const O = k.currentTarget.getBoundingClientRect(), _ = k.clientY - O.top - R / 2;
    x(_);
  };
  return /* @__PURE__ */ T("div", { ref: a, className: "relative", children: [
    /* @__PURE__ */ T(
      kg,
      {
        "data-slot": "data-grid-scroll-area",
        className: L("relative", t),
        ...r,
        children: [
          /* @__PURE__ */ f(
            Mg,
            {
              ref: s,
              "data-slot": "scroll-area-viewport",
              className: "focus-visible:ring-ring/50 rounded-md size-full transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
              children: /* @__PURE__ */ f("div", { "data-slot": "scroll-area-content", children: e })
            }
          ),
          d && /* @__PURE__ */ f(
            ko,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "horizontal",
              orientation: "horizontal",
              className: "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
              children: /* @__PURE__ */ f(
                Mo,
                {
                  "data-slot": "data-grid-thumb",
                  className: "bg-border rounded-full relative flex-1"
                }
              )
            }
          ),
          m && /* @__PURE__ */ f(
            ko,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "vertical",
              orientation: "vertical",
              className: L(
                "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
                h && "pointer-events-none opacity-0"
              ),
              children: /* @__PURE__ */ f(
                Mo,
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
    h && p && /* @__PURE__ */ f(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute right-0 top-(--data-grid-scrollbar-header-height) z-20 h-(--data-grid-scrollbar-track-height)",
        children: /* @__PURE__ */ f(
          "div",
          {
            className: "pointer-events-auto relative h-full w-3 touch-none p-px",
            onPointerDown: N,
            children: /* @__PURE__ */ f(
              "div",
              {
                className: L(
                  "bg-border absolute right-px w-2",
                  "top-(--data-grid-scrollbar-thumb-top) h-(--data-grid-scrollbar-thumb-height)",
                  "rounded-full"
                ),
                onLostPointerCapture: g,
                onPointerCancel: S,
                onPointerDown: y,
                onPointerMove: C,
                onPointerUp: S
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
function Lo(e, t) {
  return e ? py(e) ? /* @__PURE__ */ u.createElement(e, t) : e : null;
}
function py(e) {
  return gy(e) || typeof e == "function" || vy(e);
}
function gy(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function vy(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function by({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    Kb,
    {
      role: "status",
      "aria-label": "Loading",
      className: L("size-4 animate-spin", e),
      ...t
    }
  );
}
const yy = Sn("", {
  variants: {
    size: {
      dense: "px-2.5 h-9",
      default: "px-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), dd = Sn("", {
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
function ud(e) {
  const t = e.getIsPinned();
  return {
    left: t === "left" ? `${e.getStart("left")}px` : void 0,
    right: t === "right" ? `${e.getAfter("right")}px` : void 0,
    position: t ? "sticky" : "relative",
    width: e.getSize(),
    zIndex: t ? 1 : 0
  };
}
function Fo(e, t) {
  if (e) {
    if (typeof e == "function") {
      e(t);
      return;
    }
    e.current = t;
  }
}
function Wo(e) {
  return "touches" in e;
}
function oo(e) {
  var t, n;
  return Wo(e) ? ((t = e.touches[0]) == null ? void 0 : t.clientX) ?? ((n = e.changedTouches[0]) == null ? void 0 : n.clientX) : e.clientX;
}
function yi(e, t, n) {
  var S;
  const r = n.getColumn(t.column.id);
  if (!r || !r.getCanResize() || Wo(e) && e.touches.length > 1) return;
  (S = e.persist) == null || S.call(e);
  const o = e.currentTarget.ownerDocument, a = o.body.style.cursor, s = o.documentElement.style.cursor, i = t.getSize(), l = oo(e), c = e.currentTarget.closest("th"), d = c == null ? void 0 : c.getBoundingClientRect(), m = d && Number.isFinite(
    n.options.columnResizeDirection === "rtl" ? d.left : d.right
  ) ? n.options.columnResizeDirection === "rtl" ? d.left : d.right : l;
  if (typeof l != "number" || typeof m != "number")
    return;
  o.body.style.cursor = "col-resize", o.documentElement.style.cursor = "col-resize";
  const h = t.getLeafHeaders().map(
    (N) => [N.column.id, N.column.getSize()]
  ), p = n.options.columnResizeDirection === "rtl" ? -1 : 1, v = (N, M = !1) => {
    if (typeof N != "number") return;
    let k = {};
    const R = (N - l) * p, O = Math.max(R / i, -0.999999);
    h.forEach(([_, I]) => {
      k[_] = Math.round(
        Math.max(I + I * O, 0) * 100
      ) / 100;
    }), n.setColumnSizingInfo((_) => ({
      ..._,
      startOffset: m,
      startSize: i,
      deltaOffset: R,
      deltaPercentage: O,
      columnSizingStart: h,
      isResizingColumn: r.id
    })), M && n.setColumnSizing((_) => ({
      ..._,
      ...k
    }));
  }, g = (N) => {
    v(N, !0), n.setColumnSizingInfo((M) => ({
      ...M,
      isResizingColumn: !1,
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      columnSizingStart: []
    })), o.body.style.cursor = a, o.documentElement.style.cursor = s;
  }, b = (N) => {
    v(N.clientX);
  }, w = (N) => {
    o.removeEventListener("mousemove", b), o.removeEventListener("mouseup", w), g(N.clientX);
  }, x = (N) => {
    N.cancelable && (N.preventDefault(), N.stopPropagation()), v(oo(N));
  }, y = (N) => {
    o.removeEventListener("touchmove", x), o.removeEventListener("touchend", y), N.cancelable && (N.preventDefault(), N.stopPropagation()), g(oo(N));
  }, C = { passive: !1 };
  Wo(e) ? (o.addEventListener(
    "touchmove",
    x,
    C
  ), o.addEventListener(
    "touchend",
    y,
    C
  )) : (o.addEventListener(
    "mousemove",
    b,
    C
  ), o.addEventListener(
    "mouseup",
    w,
    C
  )), n.setColumnSizingInfo((N) => ({
    ...N,
    startOffset: m,
    startSize: i,
    deltaOffset: 0,
    deltaPercentage: 0,
    columnSizingStart: h,
    isResizingColumn: r.id
  }));
}
function wy(e, t) {
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
function xy(e, t) {
  const { topRows: n, centerRows: r, bottomRows: o } = wy(
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
function Sy() {
  var t;
  const { props: e } = ge();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ f(
    "col",
    {
      "data-slot": "data-grid-table-fill-col",
      style: { width: "var(--data-grid-fill-size, 0px)" }
    }
  ) : null;
}
function Cy() {
  var t;
  const { props: e } = ge();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ f(
    "th",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-head-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function fd() {
  var t;
  const { props: e } = ge();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ f(
    "td",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-body-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function ky({ children: e }) {
  var a, s, i, l, c, d, m;
  const { props: t, table: n } = ge(), r = n.getVisibleLeafColumns(), o = Yt(() => {
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
  return /* @__PURE__ */ T(
    "table",
    {
      "data-slot": "data-grid-table",
      className: L(
        "text-foreground text-sm caption-bottom text-left align-middle font-normal rtl:text-right",
        (s = t.tableLayout) != null && s.columnsResizable ? "min-w-0" : "w-full min-w-full",
        ((i = t.tableLayout) == null ? void 0 : i.width) === "auto" ? "table-auto" : "table-fixed",
        !((l = t.tableLayout) != null && l.columnsResizable) && "",
        !((c = t.tableLayout) != null && c.columnsDraggable) && "border-separate border-spacing-0",
        (d = t.tableClassNames) == null ? void 0 : d.base
      ),
      style: (m = t.tableLayout) != null && m.columnsResizable ? {
        ...o,
        width: `calc(${n.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
      } : void 0,
      children: [
        /* @__PURE__ */ T("colgroup", { children: [
          r.map((h) => {
            var p, v;
            return /* @__PURE__ */ f(
              "col",
              {
                style: (p = t.tableLayout) != null && p.columnsResizable ? { width: `calc(var(--col-${h.id}-size) * 1px)` } : ((v = t.tableLayout) == null ? void 0 : v.width) === "fixed" ? { width: h.getSize() } : void 0
              },
              h.id
            );
          }),
          /* @__PURE__ */ f(Sy, {})
        ] }),
        e
      ]
    }
  );
}
function My({
  children: e,
  className: t,
  viewportRef: n,
  style: r
}) {
  var h, p, v;
  const { props: o, table: a } = ge(), [s, i] = Rt(
    null
  ), [l, c] = Rt(0), d = Ce(
    (g) => {
      i(g), Fo(n, g);
    },
    [n]
  ), m = (h = o.tableLayout) != null && h.columnsResizable && l > 0 ? Math.max(0, l - a.getTotalSize()) : 0;
  return ur(() => {
    var y;
    if (!s || !((y = o.tableLayout) != null && y.columnsResizable)) {
      c(0);
      return;
    }
    const b = s.closest(
      '[data-slot="scroll-area-viewport"]'
    ) ?? s.parentElement ?? s, w = () => {
      c(b.clientWidth);
    };
    if (w(), typeof ResizeObserver > "u") return;
    const x = new ResizeObserver(w);
    return x.observe(b), () => {
      x.disconnect();
    };
  }, [(p = o.tableLayout) == null ? void 0 : p.columnsResizable, s]), /* @__PURE__ */ T(
    "div",
    {
      "data-slot": "data-grid-table-viewport",
      ref: d,
      className: L("relative min-w-full align-top", t),
      style: {
        ...(v = o.tableLayout) != null && v.columnsResizable ? {
          width: `calc(${a.getTotalSize()}px + var(--data-grid-fill-size, 0px))`,
          "--data-grid-fill-size": `${m}px`
        } : void 0,
        ...r
      },
      children: [
        e,
        /* @__PURE__ */ f(Dy, { viewportElement: s })
      ]
    }
  );
}
function Ny({ children: e }) {
  var n, r, o;
  const { props: t } = ge();
  return /* @__PURE__ */ f(
    "thead",
    {
      className: L(
        (n = t.tableClassNames) == null ? void 0 : n.header,
        ((r = t.tableLayout) == null ? void 0 : r.headerSticky) && ((o = t.tableClassNames) == null ? void 0 : o.headerSticky)
      ),
      children: e
    }
  );
}
function Ry({
  children: e,
  headerGroup: t
}) {
  var r, o, a, s, i;
  const { props: n } = ge();
  return /* @__PURE__ */ T(
    "tr",
    {
      className: L(
        "bg-muted/40",
        ((r = n.tableLayout) == null ? void 0 : r.headerBorder) && "[&>th]:border-b",
        ((o = n.tableLayout) == null ? void 0 : o.cellBorder) && "*:last:border-e-0",
        ((a = n.tableLayout) == null ? void 0 : a.stripped) && "bg-transparent",
        ((s = n.tableLayout) == null ? void 0 : s.headerBackground) === !1 && "bg-transparent",
        (i = n.tableClassNames) == null ? void 0 : i.headerRow
      ),
      children: [
        e,
        /* @__PURE__ */ f(Cy, {})
      ]
    },
    t.id
  );
}
function Py({
  children: e,
  header: t,
  dndRef: n,
  dndStyle: r
}) {
  var m, h, p, v, g, b, w, x, y, C, S;
  const { props: o } = ge(), { column: a } = t, s = a.getIsPinned(), i = s === "left" && a.getIsLastColumn("left"), l = s === "right" && a.getIsFirstColumn("right"), c = a.getIndex() === t.getContext().table.getVisibleLeafColumns().length - 1, d = yy({
    size: (m = o.tableLayout) != null && m.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ f(
    "th",
    {
      ref: n,
      style: {
        ...((h = o.tableLayout) == null ? void 0 : h.width) === "fixed" && !((p = o.tableLayout) != null && p.columnsResizable) && {
          width: t.getSize()
        },
        ...((v = o.tableLayout) == null ? void 0 : v.columnsPinnable) && a.getCanPin() && ud(a),
        ...((g = o.tableLayout) == null ? void 0 : g.columnsResizable) && {
          width: `calc(var(--header-${t.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": s || void 0,
      "data-last-col": i ? "left" : l ? "right" : void 0,
      className: L(
        "text-secondary-foreground/80 h-10 relative text-left align-middle font-normal rtl:text-right [&:has([role=checkbox])]:pe-0",
        d,
        ((b = o.tableLayout) == null ? void 0 : b.cellBorder) && "border-e",
        ((w = o.tableLayout) == null ? void 0 : w.columnsResizable) && a.getCanResize() && "overflow-visible",
        ((x = o.tableLayout) == null ? void 0 : x.columnsResizable) && a.getCanResize() && c && "pe-8",
        ((y = o.tableLayout) == null ? void 0 : y.columnsPinnable) && a.getCanPin() && "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s!",
        (C = t.column.columnDef.meta) == null ? void 0 : C.headerClassName,
        a.getIndex() === 0 || a.getIndex() === t.headerGroup.headers.length - 1 ? (S = o.tableClassNames) == null ? void 0 : S.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function Ey({
  header: e
}) {
  var l, c;
  const { props: t, table: n } = ge(), { column: r } = e, o = r.getIndex() === e.getContext().table.getVisibleLeafColumns().length - 1, a = (((l = t.tableLayout) == null ? void 0 : l.columnsResizeMode) ?? n.options.columnResizeMode) === "onEnd";
  return /* @__PURE__ */ f(
    "div",
    {
      onDoubleClick: () => r.resetSize(),
      onMouseDown: (d) => {
        if (d.preventDefault(), d.stopPropagation(), a) {
          yi(d, e, n);
          return;
        }
        e.getResizeHandler()(d);
      },
      onTouchStart: (d) => {
        if (d.preventDefault(), d.stopPropagation(), a) {
          yi(d, e, n);
          return;
        }
        e.getResizeHandler()(d);
      },
      className: L(
        "absolute top-0 h-full cursor-col-resize user-select-none touch-none z-10 flex",
        o ? "end-0 w-5 justify-end before:hidden" : "-end-2 w-5 justify-center before:absolute before:inset-y-0 before:w-px before:-translate-x-px before:bg-border",
        ((c = t.tableLayout) == null ? void 0 : c.cellBorder) && !r.getIsResizing() && "before:hidden",
        r.getIsResizing() && (a ? "opacity-100" : o ? "before:absolute before:end-0 before:block before:inset-y-0 before:w-0.5 before:bg-primary opacity-100" : "before:block before:bg-primary before:w-0.5 opacity-100")
      )
    }
  );
}
function Dy({
  viewportElement: e
}) {
  var d, m, h;
  const { props: t, table: n } = ge(), r = n.getState().columnSizingInfo, o = r.isResizingColumn, a = ((d = t.tableLayout) == null ? void 0 : d.columnsResizeMode) ?? n.options.columnResizeMode;
  if (!((m = t.tableLayout) != null && m.columnsResizable) || a !== "onEnd" || !o)
    return null;
  const s = n.getFlatHeaders().find(
    (p) => p.column.id === o || p.id === o
  );
  if (!s) return null;
  const i = r.deltaOffset ?? 0, l = ((h = e == null ? void 0 : e.querySelector('[data-slot="data-grid-table"] thead')) == null ? void 0 : h.getBoundingClientRect().height) ?? 0, c = typeof r.startOffset == "number" && e ? r.startOffset - e.getBoundingClientRect().left : s.getStart() + s.getSize();
  return /* @__PURE__ */ T(
    "div",
    {
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-y-0 z-20",
      style: {
        left: c,
        transform: `translateX(${i}px)`
      },
      children: [
        /* @__PURE__ */ f("div", { className: "bg-primary/85 absolute inset-y-0 left-0 w-px -translate-x-1/2" }),
        /* @__PURE__ */ f(
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
function Oy() {
  return /* @__PURE__ */ f("tbody", { "aria-hidden": "true", className: "h-2" });
}
function _y({ children: e }) {
  var n, r, o;
  const { props: t } = ge();
  return /* @__PURE__ */ f(
    "tbody",
    {
      className: L(
        "[&_tr:last-child]:border-0",
        ((n = t.tableLayout) == null ? void 0 : n.rowRounded) && "[&_td:first-child]:rounded-l-lg",
        ((r = t.tableLayout) == null ? void 0 : r.rowRounded) && "[&_td:last-child]:rounded-r-lg",
        (o = t.tableClassNames) == null ? void 0 : o.body
      ),
      children: e
    }
  );
}
function Ty({ children: e }) {
  var n, r, o;
  const { props: t } = ge();
  return /* @__PURE__ */ f(
    "tfoot",
    {
      className: L(
        "border-t",
        ((n = t.tableLayout) == null ? void 0 : n.footerSticky) && ((r = t.tableClassNames) == null ? void 0 : r.footerSticky),
        (o = t.tableClassNames) == null ? void 0 : o.footer
      ),
      children: e
    }
  );
}
function Ay({ children: e }) {
  var r, o, a, s, i;
  const { table: t, props: n } = ge();
  return /* @__PURE__ */ T(
    "tr",
    {
      className: L(
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
        /* @__PURE__ */ f(fd, {})
      ]
    }
  );
}
function Iy({
  children: e,
  column: t
}) {
  var a, s, i, l, c, d, m;
  const { props: n, table: r } = ge(), o = dd({
    size: (a = n.tableLayout) != null && a.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ f(
    "td",
    {
      style: (s = n.tableLayout) != null && s.columnsResizable ? { width: `calc(var(--col-${t.id}-size) * 1px)` } : void 0,
      className: L(
        "align-middle",
        o,
        ((i = n.tableLayout) == null ? void 0 : i.cellBorder) && "border-e",
        ((l = n.tableLayout) == null ? void 0 : l.columnsResizable) && t.getCanResize() && "truncate",
        (c = t.columnDef.meta) == null ? void 0 : c.cellClassName,
        ((d = n.tableLayout) == null ? void 0 : d.columnsPinnable) && t.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        t.getIndex() === 0 || t.getIndex() === r.getVisibleFlatColumns().length - 1 ? (m = n.tableClassNames) == null ? void 0 : m.edgeCell : ""
      ),
      children: e
    }
  );
}
function zy({
  children: e,
  row: t,
  pinnedBoundary: n,
  rowRef: r,
  dndRef: o,
  dndStyle: a
}) {
  var c, d, m, h, p, v;
  const { props: s, table: i } = ge(), l = t.getIsPinned();
  return /* @__PURE__ */ T(
    "tr",
    {
      ref: (g) => {
        Fo(r, g), Fo(o, g);
      },
      style: { ...a || null },
      "data-state": i.options.enableRowSelection && t.getIsSelected() ? "selected" : void 0,
      "data-row-pinned": l || void 0,
      "data-row-pinned-boundary": n,
      onClick: () => s.onRowClick && s.onRowClick(t.original),
      className: L(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        s.onRowClick && "cursor-pointer",
        !((c = s.tableLayout) != null && c.stripped) && ((d = s.tableLayout) == null ? void 0 : d.rowBorder) && "border-border border-b [&:not(:last-child)>td]:border-b",
        ((m = s.tableLayout) == null ? void 0 : m.cellBorder) && "*:last:border-e-0",
        ((h = s.tableLayout) == null ? void 0 : h.stripped) && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        i.options.enableRowSelection && "*:first:relative",
        ((p = s.tableLayout) == null ? void 0 : p.rowsPinnable) && l && "bg-muted/30 hover:bg-muted/50",
        n === "top" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        n === "bottom" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        (v = s.tableClassNames) == null ? void 0 : v.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ f(fd, {})
      ]
    }
  );
}
function Ly({ row: e }) {
  var r, o, a, s, i;
  const { props: t, table: n } = ge();
  return /* @__PURE__ */ f(
    "tr",
    {
      className: L(
        ((r = t.tableLayout) == null ? void 0 : r.rowBorder) && "[&:not(:last-child)>td]:border-b"
      ),
      children: /* @__PURE__ */ f(
        "td",
        {
          colSpan: e.getVisibleCells().length + ((o = t.tableLayout) != null && o.columnsResizable ? 1 : 0),
          children: (i = (s = (a = n.getAllColumns().find((l) => {
            var c;
            return (c = l.columnDef.meta) == null ? void 0 : c.expandedContent;
          })) == null ? void 0 : a.columnDef.meta) == null ? void 0 : s.expandedContent) == null ? void 0 : i.call(s, e.original)
        }
      )
    }
  );
}
function Fy({
  children: e,
  cell: t,
  dndRef: n,
  dndStyle: r
}) {
  var m, h, p, v, g, b, w, x, y;
  const { props: o } = ge(), { column: a, row: s } = t, i = a.getIsPinned(), l = i === "left" && a.getIsLastColumn("left"), c = i === "right" && a.getIsFirstColumn("right"), d = dd({
    size: (m = o.tableLayout) != null && m.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ f(
    "td",
    {
      ref: n,
      ...(h = o.tableLayout) != null && h.columnsDraggable && !i ? { cell: t } : {},
      style: {
        ...((p = o.tableLayout) == null ? void 0 : p.columnsPinnable) && a.getCanPin() && ud(a),
        ...((v = o.tableLayout) == null ? void 0 : v.columnsResizable) && {
          width: `calc(var(--col-${a.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": i || void 0,
      "data-last-col": l ? "left" : c ? "right" : void 0,
      className: L(
        "align-middle",
        d,
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
function Wy({
  row: e,
  pinnedBoundary: t,
  rowRef: n
}) {
  return /* @__PURE__ */ T(hu, { children: [
    /* @__PURE__ */ f(
      zy,
      {
        row: e,
        pinnedBoundary: t,
        rowRef: n,
        children: e.getVisibleCells().map((r) => /* @__PURE__ */ f(Fy, { cell: r, children: Lo(r.column.columnDef.cell, r.getContext()) }, r.id))
      }
    ),
    e.getIsExpanded() && /* @__PURE__ */ f(Ly, { row: e })
  ] });
}
function $y() {
  var r;
  const { table: e, props: t } = ge(), n = e.getVisibleLeafColumns().length + ((r = t.tableLayout) != null && r.columnsResizable ? 1 : 0);
  return /* @__PURE__ */ f("tr", { children: /* @__PURE__ */ f(
    "td",
    {
      colSpan: Math.max(n, 1),
      className: "text-muted-foreground text-sm py-6 text-center",
      children: t.emptyMessage || "No data available"
    }
  ) });
}
function By({ table: e }) {
  var a;
  const { isLoading: t, props: n } = ge(), r = e.getState().pagination;
  if (t && n.loadingMode === "skeleton" && (r != null && r.pageSize))
    return /* @__PURE__ */ f(Me, { children: Array.from({ length: r.pageSize }).map((s, i) => /* @__PURE__ */ f(Ay, { children: e.getVisibleFlatColumns().map((l, c) => {
      var d;
      return /* @__PURE__ */ f(Iy, { column: l, children: (d = l.columnDef.meta) == null ? void 0 : d.skeleton }, c);
    }) }, i)) });
  if (t && n.loadingMode === "spinner")
    return /* @__PURE__ */ f("tr", { children: /* @__PURE__ */ f("td", { colSpan: e.getVisibleFlatColumns().length, className: "p-8", children: /* @__PURE__ */ T("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ T(
        "svg",
        {
          className: "text-muted-foreground mr-3 -ml-1 h-5 w-5 animate-spin",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          children: [
            /* @__PURE__ */ f(
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
            /* @__PURE__ */ f(
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
  const o = xy(
    e,
    (a = n.tableLayout) == null ? void 0 : a.rowsPinnable
  );
  return o.length ? /* @__PURE__ */ f(Me, { children: o.map(({ row: s, pinnedBoundary: i }) => /* @__PURE__ */ f(
    Wy,
    {
      row: s,
      pinnedBoundary: i
    },
    s.id
  )) }) : /* @__PURE__ */ f($y, {});
}
const Vy = Bi(
  By,
  (e, t) => !!t.table.getState().columnSizingInfo.isResizingColumn
);
function Hy({
  footerContent: e,
  renderHeader: t = !0
}) {
  var o, a;
  const { table: n, props: r } = ge();
  return /* @__PURE__ */ f(My, { children: /* @__PURE__ */ T(ky, { children: [
    t && /* @__PURE__ */ f(Ny, { children: n.getHeaderGroups().map((s, i) => /* @__PURE__ */ f(Ry, { headerGroup: s, children: s.headers.map((l, c) => {
      var m, h;
      const { column: d } = l;
      return /* @__PURE__ */ T(Py, { header: l, children: [
        l.isPlaceholder ? null : (m = r.tableLayout) != null && m.columnsResizable && d.getCanResize() ? /* @__PURE__ */ f("div", { className: "truncate", children: Lo(
          l.column.columnDef.header,
          l.getContext()
        ) }) : Lo(
          l.column.columnDef.header,
          l.getContext()
        ),
        ((h = r.tableLayout) == null ? void 0 : h.columnsResizable) && d.getCanResize() && /* @__PURE__ */ f(Ey, { header: l })
      ] }, c);
    }) }, i)) }),
    t && (((o = r.tableLayout) == null ? void 0 : o.stripped) || !((a = r.tableLayout) != null && a.rowBorder)) && /* @__PURE__ */ f(Oy, {}),
    /* @__PURE__ */ f(_y, { children: /* @__PURE__ */ f(Vy, { table: n }) }),
    e && /* @__PURE__ */ f(Ty, { children: e })
  ] }) });
}
function Yy({
  table: e,
  pageSizeOptions: t = [10, 20, 30, 40, 50],
  className: n,
  ...r
}) {
  return /* @__PURE__ */ T(
    "div",
    {
      className: L(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ f("div", { className: "flex-1 whitespace-nowrap tabular-nums text-muted-foreground text-sm", children: e.options.onRowSelectionChange ? /* @__PURE__ */ T(Me, { children: [
          e.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          e.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }) : /* @__PURE__ */ T(Me, { children: [
          e.getFilteredRowModel().rows.length,
          " row(s)"
        ] }) }),
        /* @__PURE__ */ T("div", { className: "flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8", children: [
          /* @__PURE__ */ T("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ f("p", { className: "whitespace-nowrap font-medium text-sm", children: "Rows per page" }),
            /* @__PURE__ */ T(
              od,
              {
                value: `${e.getState().pagination.pageSize}`,
                onValueChange: (o) => {
                  e.setPageSize(Number(o));
                },
                children: [
                  /* @__PURE__ */ f(id, { className: "h-8 w-18 data-size:h-8", children: /* @__PURE__ */ f(ad, { placeholder: e.getState().pagination.pageSize }) }),
                  /* @__PURE__ */ f(sd, { side: "top", children: t.map((o) => /* @__PURE__ */ f(ld, { value: `${o}`, children: o }, o)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ T("div", { className: "flex items-center justify-center whitespace-nowrap font-medium tabular-nums text-sm", children: [
            "Page ",
            e.getState().pagination.pageIndex + 1,
            " of",
            " ",
            e.getPageCount()
          ] }),
          /* @__PURE__ */ T("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ f(
              _e,
              {
                "aria-label": "Go to first page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(0),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ f($b, {})
              }
            ),
            /* @__PURE__ */ f(
              _e,
              {
                "aria-label": "Go to previous page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.previousPage(),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ f(td, {})
              }
            ),
            /* @__PURE__ */ f(
              _e,
              {
                "aria-label": "Go to next page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.nextPage(),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ f(Ma, {})
              }
            ),
            /* @__PURE__ */ f(
              _e,
              {
                "aria-label": "Go to last page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(e.getPageCount() - 1),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ f(Vb, {})
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function cC({
  table: e,
  recordCount: t,
  actionBar: n,
  children: r,
  className: o,
  resizable: a = !1,
  stickyHeader: s = !1,
  stickyFooter: i = !1,
  height: l,
  footerContent: c,
  tableLayoutOverrides: d
}) {
  return /* @__PURE__ */ f(
    dy,
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
      children: /* @__PURE__ */ T("div", { className: L("flex w-full flex-col gap-2.5", o), children: [
        r,
        /* @__PURE__ */ f(uy, { children: /* @__PURE__ */ f(hy, { className: l, children: /* @__PURE__ */ f(Hy, { footerContent: c }) }) }),
        /* @__PURE__ */ T("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ f(Yy, { table: e }),
          n && e.getFilteredSelectedRowModel().rows.length > 0 && n
        ] })
      ] })
    }
  );
}
function Gy({
  ...e
}) {
  return /* @__PURE__ */ f(Lp, { "data-slot": "dropdown-menu", ...e });
}
function Uy({
  ...e
}) {
  return /* @__PURE__ */ f(
    Fp,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function jy({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ f(Wp, { children: /* @__PURE__ */ f(
    $p,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: L(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function Ky({
  ...e
}) {
  return /* @__PURE__ */ f(Bp, { "data-slot": "dropdown-menu-group", ...e });
}
function $t({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ f(
    Hp,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: L(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        e
      ),
      ...r
    }
  );
}
function qy({
  className: e,
  children: t,
  checked: n,
  ...r
}) {
  return /* @__PURE__ */ T(
    Yp,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: L(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ f("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ f(Gp, { children: /* @__PURE__ */ f(mt, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function Xy({
  className: e,
  inset: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    Vp,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: L(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...n
    }
  );
}
function Kn({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    Up,
    {
      "data-slot": "dropdown-menu-separator",
      className: L("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function Zy({
  ...e
}) {
  return /* @__PURE__ */ f(jp, { "data-slot": "dropdown-menu-sub", ...e });
}
function Qy({
  className: e,
  inset: t,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ T(
    Kp,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: L(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ f(Ma, { className: "ml-auto size-4" })
      ]
    }
  );
}
function Jy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    qp,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: L(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...t
    }
  );
}
function ew({
  column: e,
  label: t,
  icon: n,
  className: r,
  filter: o,
  visibility: a = !1
}) {
  var _, I, Y, H, j, $, K, P;
  const { isLoading: s, table: i, props: l, recordCount: c } = ge(), d = t ?? gi(e), m = i.getState().columnOrder, h = JSON.stringify(i.getState().columnVisibility), p = e.getIsSorted(), v = e.getIsPinned(), g = e.getCanSort(), b = e.getCanPin(), w = e.getCanResize(), x = m.indexOf(e.id), y = x > 0, C = x < m.length - 1, S = () => {
    p === "asc" ? e.toggleSorting(!0) : p === "desc" ? e.clearSorting() : e.toggleSorting(!1);
  }, N = L(
    "text-secondary-foreground/80 inline-flex h-full items-center gap-1.5 font-normal [&_svg]:opacity-60 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5",
    r
  ), M = L(
    "text-secondary-foreground/80 hover:bg-secondary! data-[state=open]:bg-secondary! hover:text-foreground data-[state=open]:text-foreground -ms-2 px-2 py-0 font-normal h-7 rounded-md",
    r
  ), k = g && (p === "desc" ? /* @__PURE__ */ f(mi, { className: "size-3.5" }) : p === "asc" ? /* @__PURE__ */ f(hi, { className: "size-3.5" }) : /* @__PURE__ */ f(Yb, { className: "mt-px size-3.5" })), R = ((_ = l.tableLayout) == null ? void 0 : _.columnsMovable) || ((I = l.tableLayout) == null ? void 0 : I.columnsVisibility) && a || ((Y = l.tableLayout) == null ? void 0 : Y.columnsPinnable) && b || o, O = Yt(() => {
    var ne, E, F;
    const D = [];
    let Z = !1;
    return o && (D.push(
      /* @__PURE__ */ f(Ky, { children: /* @__PURE__ */ f(Xy, { children: o }, "filter") }, "group-filter")
    ), Z = !0), g && (Z && D.push(/* @__PURE__ */ f(Kn, {}, "sep-sort")), D.push(
      /* @__PURE__ */ T(
        $t,
        {
          onClick: () => {
            p === "asc" ? e.clearSorting() : e.toggleSorting(!1);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ f(hi, { className: "size-3.5!" }),
            /* @__PURE__ */ f("span", { className: "grow", children: "Asc" }),
            p === "asc" && /* @__PURE__ */ f(mt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-asc"
      ),
      /* @__PURE__ */ T(
        $t,
        {
          onClick: () => {
            p === "desc" ? e.clearSorting() : e.toggleSorting(!0);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ f(mi, { className: "size-3.5!" }),
            /* @__PURE__ */ f("span", { className: "grow", children: "Desc" }),
            p === "desc" && /* @__PURE__ */ f(mt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-desc"
      )
    ), Z = !0), (ne = l.tableLayout) != null && ne.columnsPinnable && b && (Z && D.push(/* @__PURE__ */ f(Kn, {}, "sep-pin")), D.push(
      /* @__PURE__ */ T(
        $t,
        {
          onClick: () => e.pin(v === "left" ? !1 : "left"),
          children: [
            /* @__PURE__ */ f(Cb, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ f("span", { className: "grow", children: "Pin to left" }),
            v === "left" && /* @__PURE__ */ f(mt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-left"
      ),
      /* @__PURE__ */ T(
        $t,
        {
          onClick: () => e.pin(v === "right" ? !1 : "right"),
          children: [
            /* @__PURE__ */ f(Rb, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ f("span", { className: "grow", children: "Pin to right" }),
            v === "right" && /* @__PURE__ */ f(mt, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-right"
      )
    ), Z = !0), (E = l.tableLayout) != null && E.columnsMovable && (Z && D.push(/* @__PURE__ */ f(Kn, {}, "sep-move")), D.push(
      /* @__PURE__ */ T(
        $t,
        {
          onClick: () => {
            if (x > 0) {
              const z = [...m], [W] = z.splice(x, 1);
              z.splice(x - 1, 0, W), i.setColumnOrder(z);
            }
          },
          disabled: !y || v !== !1,
          children: [
            /* @__PURE__ */ f(Mb, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ f("span", { children: "Move to Left" })
          ]
        },
        "move-left"
      ),
      /* @__PURE__ */ T(
        $t,
        {
          onClick: () => {
            if (x < m.length - 1) {
              const z = [...m], [W] = z.splice(x, 1);
              z.splice(x + 1, 0, W), i.setColumnOrder(z);
            }
          },
          disabled: !C || v !== !1,
          children: [
            /* @__PURE__ */ f(Eb, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ f("span", { children: "Move to Right" })
          ]
        },
        "move-right"
      )
    ), Z = !0), (F = l.tableLayout) != null && F.columnsVisibility && a && (Z && D.push(/* @__PURE__ */ f(Kn, {}, "sep-visibility")), D.push(
      /* @__PURE__ */ T(Zy, { children: [
        /* @__PURE__ */ T(Qy, { children: [
          /* @__PURE__ */ f(rd, { className: "size-3.5!" }),
          /* @__PURE__ */ f("span", { children: "Columns" })
        ] }),
        /* @__PURE__ */ f(Jy, { children: i.getAllColumns().filter((z) => z.getCanHide()).map((z) => /* @__PURE__ */ f(
          qy,
          {
            checked: z.getIsVisible(),
            onSelect: (W) => W.preventDefault(),
            onCheckedChange: (W) => z.toggleVisibility(!!W),
            className: "capitalize",
            children: gi(z)
          },
          z.id
        )) })
      ] }, "visibility")
    )), D;
  }, [
    o,
    g,
    p,
    e,
    (H = l.tableLayout) == null ? void 0 : H.columnsPinnable,
    (j = l.tableLayout) == null ? void 0 : j.columnsMovable,
    ($ = l.tableLayout) == null ? void 0 : $.columnsVisibility,
    b,
    v,
    y,
    C,
    a,
    i,
    x,
    m,
    h
  ]);
  return R ? /* @__PURE__ */ T("div", { className: "flex h-full items-center justify-between gap-1.5", children: [
    /* @__PURE__ */ T(Gy, { children: [
      /* @__PURE__ */ f(Uy, { asChild: !0, children: /* @__PURE__ */ T(
        _e,
        {
          variant: "ghost",
          className: M,
          disabled: s || c === 0,
          children: [
            n && n,
            d,
            k
          ]
        }
      ) }),
      /* @__PURE__ */ f(jy, { className: "w-40", align: "start", children: O })
    ] }),
    ((K = l.tableLayout) == null ? void 0 : K.columnsPinnable) && b && v && /* @__PURE__ */ f(
      _e,
      {
        size: "icon",
        variant: "ghost",
        className: "-me-1 size-7 rounded-md",
        onClick: () => e.pin(!1),
        "aria-label": `Unpin ${d} column`,
        title: `Unpin ${d} column`,
        children: /* @__PURE__ */ f(Xb, { className: "size-3.5! opacity-50!", "aria-hidden": "true" })
      }
    )
  ] }) : g || (P = l.tableLayout) != null && P.columnsResizable && w ? /* @__PURE__ */ f("div", { className: "flex h-full items-center", children: /* @__PURE__ */ T(
    _e,
    {
      variant: "ghost",
      className: M,
      disabled: s || c === 0,
      onClick: S,
      children: [
        n && n,
        d,
        k
      ]
    }
  ) }) : /* @__PURE__ */ T("div", { className: N, children: [
    n && n,
    d
  ] });
}
const dC = Bi(
  ew
);
function tw(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const ao = {}, mn = {};
function hn(e, t) {
  try {
    const r = (ao[e] || (ao[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in mn ? mn[r] : wi(r, r.split(":"));
  } catch {
    if (e in mn) return mn[e];
    const n = e == null ? void 0 : e.match(nw);
    return n ? wi(e, n.slice(1)) : NaN;
  }
}
const nw = /([+-]\d\d):?(\d\d)?/;
function wi(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0);
  return mn[e] = n > 0 ? n * 60 + r : n * 60 - r;
}
class Ke extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(hn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), md(this), $o(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Ke(...n, t) : new Ke(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Ke(+this, t);
  }
  getTimezoneOffset() {
    return -hn(this.timeZone, this);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), $o(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ke(+new Date(t), this.timeZone);
  }
  //#endregion
}
const xi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!xi.test(e)) return;
  const t = e.replace(xi, "$1UTC");
  Ke.prototype[t] && (e.startsWith("get") ? Ke.prototype[e] = function() {
    return this.internal[t]();
  } : (Ke.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), rw(this), +this;
  }, Ke.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), $o(this), +this;
  }));
});
function $o(e) {
  e.internal.setTime(+e), e.internal.setUTCMinutes(e.internal.getUTCMinutes() - e.getTimezoneOffset());
}
function rw(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), md(e);
}
function md(e) {
  const t = hn(e.timeZone, e), n = /* @__PURE__ */ new Date(+e);
  n.setUTCHours(n.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+n)).getTimezoneOffset(), a = r - o, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const i = r - t;
  i && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + i);
  const l = hn(e.timeZone, e), d = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - l, m = l !== t, h = d - i;
  if (m && h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
    const p = hn(e.timeZone, e), v = l - p;
    v && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + v), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v));
  }
}
class ke extends Ke {
  //#region static
  static tz(t, ...n) {
    return n.length ? new ke(...n, t) : new ke(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${tw(this.timeZone, this)})`;
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
    return new ke(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ke(+new Date(t), this.timeZone);
  }
  //#endregion
}
var X;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(X || (X = {}));
var he;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(he || (he = {}));
var We;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(We || (We = {}));
var De;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(De || (De = {}));
const hd = 6048e5, ow = 864e5, Si = Symbol.for("constructDateFrom");
function be(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Si in e ? e[Si](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function fe(e, t) {
  return be(t || e, e);
}
function pd(e, t, n) {
  const r = fe(e, n == null ? void 0 : n.in);
  return isNaN(t) ? be(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function gd(e, t, n) {
  const r = fe(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return be(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = be(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let aw = {};
function An() {
  return aw;
}
function Xt(e, t) {
  var i, l, c, d;
  const n = An(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((d = (c = n.locale) == null ? void 0 : c.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = fe(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function wn(e, t) {
  return Xt(e, { ...t, weekStartsOn: 1 });
}
function vd(e, t) {
  const n = fe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = be(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = wn(o), s = be(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = wn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Ci(e) {
  const t = fe(e), n = new Date(
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
function on(e, ...t) {
  const n = be.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function xn(e, t) {
  const n = fe(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function bd(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = xn(r), s = xn(o), i = +a - Ci(a), l = +s - Ci(s);
  return Math.round((i - l) / ow);
}
function iw(e, t) {
  const n = vd(e, t), r = be(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), wn(r);
}
function sw(e, t, n) {
  return pd(e, t * 7, n);
}
function lw(e, t, n) {
  return gd(e, t * 12, n);
}
function cw(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = fe(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function dw(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = fe(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function uw(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +xn(r) == +xn(o);
}
function yd(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function fw(e) {
  return !(!yd(e) && typeof e != "number" || isNaN(+fe(e)));
}
function mw(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function hw(e, t) {
  const n = fe(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function pw(e, t) {
  const [n, r] = on(e, t.start, t.end);
  return { start: n, end: r };
}
function gw(e, t) {
  const { start: n, end: r } = pw(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const l = [];
  for (; +s <= a; )
    l.push(be(n, s)), s.setMonth(s.getMonth() + i);
  return o ? l.reverse() : l;
}
function vw(e, t) {
  const n = fe(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function bw(e, t) {
  const n = fe(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function wd(e, t) {
  const n = fe(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function xd(e, t) {
  var i, l, c, d;
  const n = An(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.weekStartsOn) ?? n.weekStartsOn ?? ((d = (c = n.locale) == null ? void 0 : c.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = fe(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function yw(e, t) {
  return xd(e, { ...t, weekStartsOn: 1 });
}
const ww = {
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
}, xw = (e, t, n) => {
  let r;
  const o = ww[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function io(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Sw = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Cw = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, kw = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Mw = {
  date: io({
    formats: Sw,
    defaultWidth: "full"
  }),
  time: io({
    formats: Cw,
    defaultWidth: "full"
  }),
  dateTime: io({
    formats: kw,
    defaultWidth: "full"
  })
}, Nw = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Rw = (e, t, n, r) => Nw[e];
function sn(e) {
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
const Pw = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Ew = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Dw = {
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
}, Ow = {
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
}, _w = {
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
}, Tw = {
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
}, Aw = (e, t) => {
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
}, Iw = {
  ordinalNumber: Aw,
  era: sn({
    values: Pw,
    defaultWidth: "wide"
  }),
  quarter: sn({
    values: Ew,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: sn({
    values: Dw,
    defaultWidth: "wide"
  }),
  day: sn({
    values: Ow,
    defaultWidth: "wide"
  }),
  dayPeriod: sn({
    values: _w,
    defaultWidth: "wide",
    formattingValues: Tw,
    defaultFormattingWidth: "wide"
  })
};
function ln(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? Lw(i, (m) => m.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      zw(i, (m) => m.test(s))
    );
    let c;
    c = e.valueCallback ? e.valueCallback(l) : l, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const d = t.slice(s.length);
    return { value: c, rest: d };
  };
}
function zw(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Lw(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Fw(e) {
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
const Ww = /^(\d+)(th|st|nd|rd)?/i, $w = /\d+/i, Bw = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Vw = {
  any: [/^b/i, /^(a|c)/i]
}, Hw = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Yw = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Gw = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Uw = {
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
}, jw = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Kw = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, qw = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Xw = {
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
}, Zw = {
  ordinalNumber: Fw({
    matchPattern: Ww,
    parsePattern: $w,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: ln({
    matchPatterns: Bw,
    defaultMatchWidth: "wide",
    parsePatterns: Vw,
    defaultParseWidth: "any"
  }),
  quarter: ln({
    matchPatterns: Hw,
    defaultMatchWidth: "wide",
    parsePatterns: Yw,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: ln({
    matchPatterns: Gw,
    defaultMatchWidth: "wide",
    parsePatterns: Uw,
    defaultParseWidth: "any"
  }),
  day: ln({
    matchPatterns: jw,
    defaultMatchWidth: "wide",
    parsePatterns: Kw,
    defaultParseWidth: "any"
  }),
  dayPeriod: ln({
    matchPatterns: qw,
    defaultMatchWidth: "any",
    parsePatterns: Xw,
    defaultParseWidth: "any"
  })
}, Ra = {
  code: "en-US",
  formatDistance: xw,
  formatLong: Mw,
  formatRelative: Rw,
  localize: Iw,
  match: Zw,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Qw(e, t) {
  const n = fe(e, t == null ? void 0 : t.in);
  return bd(n, wd(n)) + 1;
}
function Sd(e, t) {
  const n = fe(e, t == null ? void 0 : t.in), r = +wn(n) - +iw(n);
  return Math.round(r / hd) + 1;
}
function Cd(e, t) {
  var d, m, h, p;
  const n = fe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = An(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : m.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((p = (h = o.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = be((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Xt(s, t), l = be((t == null ? void 0 : t.in) || e, 0);
  l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0);
  const c = Xt(l, t);
  return +n >= +i ? r + 1 : +n >= +c ? r : r - 1;
}
function Jw(e, t) {
  var i, l, c, d;
  const n = An(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : l.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((d = (c = n.locale) == null ? void 0 : c.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, o = Cd(e, t), a = be((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Xt(a, t);
}
function kd(e, t) {
  const n = fe(e, t == null ? void 0 : t.in), r = +Xt(n, t) - +Jw(n, t);
  return Math.round(r / hd) + 1;
}
function ue(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const ut = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ue(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ue(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ue(e.getDate(), t.length);
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
    return ue(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ue(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ue(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ue(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ue(o, t.length);
  }
}, Bt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, ki = {
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
    return ut.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = Cd(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return ue(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : ue(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = vd(e);
    return ue(n, t.length);
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
    return ue(n, t.length);
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
        return ue(r, 2);
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
        return ue(r, 2);
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
        return ut.M(e, t);
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
        return ue(r + 1, 2);
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
    const o = kd(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ue(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Sd(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ue(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ut.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Qw(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ue(r, t.length);
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
        return ue(a, 2);
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
        return ue(a, t.length);
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
        return ue(o, t.length);
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
    switch (r === 12 ? o = Bt.noon : r === 0 ? o = Bt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Bt.evening : r >= 12 ? o = Bt.afternoon : r >= 4 ? o = Bt.morning : o = Bt.night, t) {
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
    return ut.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : ut.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ue(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ue(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ut.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : ut.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return ut.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Ni(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Nt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Nt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Ni(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Nt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Nt(r, ":");
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
        return "GMT" + Mi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Nt(r, ":");
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
        return "GMT" + Mi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Nt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ue(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ue(+e, t.length);
  }
};
function Mi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + ue(a, 2);
}
function Ni(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ue(Math.abs(e) / 60, 2) : Nt(e, t);
}
function Nt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ue(Math.trunc(r / 60), 2), a = ue(r % 60, 2);
  return n + o + t + a;
}
const Ri = (e, t) => {
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
}, Md = (e, t) => {
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
}, ex = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Ri(e, t);
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
  return a.replace("{{date}}", Ri(r, t)).replace("{{time}}", Md(o, t));
}, tx = {
  p: Md,
  P: ex
}, nx = /^D+$/, rx = /^Y+$/, ox = ["D", "DD", "YY", "YYYY"];
function ax(e) {
  return nx.test(e);
}
function ix(e) {
  return rx.test(e);
}
function sx(e, t, n) {
  const r = lx(e, t, n);
  if (console.warn(r), ox.includes(e)) throw new RangeError(r);
}
function lx(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const cx = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, dx = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ux = /^'([^]*?)'?$/, fx = /''/g, mx = /[a-zA-Z]/;
function hx(e, t, n) {
  var d, m, h, p, v, g, b, w;
  const r = An(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Ra, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((m = (d = n == null ? void 0 : n.locale) == null ? void 0 : d.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((w = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : w.weekStartsOn) ?? 0, i = fe(e, n == null ? void 0 : n.in);
  if (!fw(i))
    throw new RangeError("Invalid time value");
  let l = t.match(dx).map((x) => {
    const y = x[0];
    if (y === "p" || y === "P") {
      const C = tx[y];
      return C(x, o.formatLong);
    }
    return x;
  }).join("").match(cx).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const y = x[0];
    if (y === "'")
      return { isToken: !1, value: px(x) };
    if (ki[y])
      return { isToken: !0, value: x };
    if (y.match(mx))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + y + "`"
      );
    return { isToken: !1, value: x };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(i, l));
  const c = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return l.map((x) => {
    if (!x.isToken) return x.value;
    const y = x.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && ix(y) || !(n != null && n.useAdditionalDayOfYearTokens) && ax(y)) && sx(y, t, String(e));
    const C = ki[y[0]];
    return C(i, y, o.localize, c);
  }).join("");
}
function px(e) {
  const t = e.match(ux);
  return t ? t[1].replace(fx, "'") : e;
}
function gx(e, t) {
  const n = fe(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = be(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function vx(e, t) {
  return fe(e, t == null ? void 0 : t.in).getMonth();
}
function bx(e, t) {
  return fe(e, t == null ? void 0 : t.in).getFullYear();
}
function yx(e, t) {
  return +fe(e) > +fe(t);
}
function wx(e, t) {
  return +fe(e) < +fe(t);
}
function xx(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Sx(e, t, n) {
  const [r, o] = on(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Cx(e, t, n) {
  const r = fe(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = be(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = gx(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function kx(e, t, n) {
  const r = fe(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? be(e, NaN) : (r.setFullYear(t), r);
}
const Pi = 5, Mx = 4;
function Nx(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Pi * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Pi : Mx;
}
function Nd(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Rx(e, t) {
  const n = Nd(e, t), r = Nx(e, t);
  return t.addDays(n, r * 7 - 1);
}
class lt {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? ke.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new ke(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : pd(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : gd(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : sw(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : lw(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : bd(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : mw(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : gw(r);
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Rx(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : yw(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : hw(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : xd(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : bw(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : hx(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : Sd(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : vx(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : bx(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : kd(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : yx(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : wx(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : yd(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : uw(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : xx(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : Sx(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : cw(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : dw(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : Cx(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : kx(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Nd(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : xn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : wn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : vw(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Xt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : wd(r);
    }, this.options = { locale: Ra, ...t }, this.overrides = n;
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
const Je = new lt();
class Rd {
  constructor(t, n, r = Je) {
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
class Px {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Ex {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function nt(e, t, n = !1, r = Je) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Pd(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Pa(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Ed(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Dd(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Od(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function _d(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function rt(e, t, n = Je) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (_d(i, n))
      return i.includes(e);
    if (Pa(i))
      return nt(i, e, !1, n);
    if (Od(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Pd(i)) {
      const l = a(i.before, e), c = a(i.after, e), d = l > 0, m = c < 0;
      return s(i.before, i.after) ? m && d : d || m;
    }
    return Ed(i) ? a(e, i.after) > 0 : Dd(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Dx(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: l, broadcastCalendar: c, today: d } = t, { isSameDay: m, isSameMonth: h, startOfMonth: p, isBefore: v, endOfMonth: g, isAfter: b } = o, w = n && p(n), x = r && g(r), y = {
    [he.focused]: [],
    [he.outside]: [],
    [he.disabled]: [],
    [he.hidden]: [],
    [he.today]: []
  }, C = {};
  for (const S of e) {
    const { date: N, displayMonth: M } = S, k = !!(M && !h(N, M)), R = !!(w && v(N, w)), O = !!(x && b(N, x)), _ = !!(a && rt(N, a, o)), I = !!(s && rt(N, s, o)) || R || O || // Broadcast calendar will show outside days as default
    !c && !l && k || c && l === !1 && k, Y = m(N, d ?? o.today());
    k && y.outside.push(S), _ && y.disabled.push(S), I && y.hidden.push(S), Y && y.today.push(S), i && Object.keys(i).forEach((H) => {
      const j = i == null ? void 0 : i[H];
      j && rt(N, j, o) && (C[H] ? C[H].push(S) : C[H] = [S]);
    });
  }
  return (S) => {
    const N = {
      [he.focused]: !1,
      [he.disabled]: !1,
      [he.hidden]: !1,
      [he.outside]: !1,
      [he.today]: !1
    }, M = {};
    for (const k in y) {
      const R = y[k];
      N[k] = R.some((O) => O === S);
    }
    for (const k in C)
      M[k] = C[k].some((R) => R === S);
    return {
      ...N,
      // custom modifiers should override all the previous ones
      ...M
    };
  };
}
function Ox(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[he[a]] ? o.push(t[he[a]]) : t[We[a]] && o.push(t[We[a]]), o), [t[X.Day]]);
}
function _x(e) {
  return B.createElement("button", { ...e });
}
function Tx(e) {
  return B.createElement("span", { ...e });
}
function Ax(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return B.createElement(
    "svg",
    { className: r, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && B.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && B.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && B.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && B.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function Ix(e) {
  const { day: t, modifiers: n, ...r } = e;
  return B.createElement("td", { ...r });
}
function zx(e) {
  const { day: t, modifiers: n, ...r } = e, o = B.useRef(null);
  return B.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), B.createElement("button", { ref: o, ...r });
}
function Lx(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[X.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: l }) => l === a.value);
  return B.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[X.DropdownRoot] },
    B.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: l, label: c, disabled: d }) => B.createElement(r.Option, { key: l, value: l, disabled: d }, c))),
    B.createElement(
      "span",
      { className: o[X.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      B.createElement(r.Chevron, { orientation: "down", size: 18, className: o[X.Chevron] })
    )
  );
}
function Fx(e) {
  return B.createElement("div", { ...e });
}
function Wx(e) {
  return B.createElement("div", { ...e });
}
function $x(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return B.createElement("div", { ...r }, e.children);
}
function Bx(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return B.createElement("div", { ...r });
}
function Vx(e) {
  return B.createElement("table", { ...e });
}
function Hx(e) {
  return B.createElement("div", { ...e });
}
const Td = Wi(void 0);
function In() {
  const e = $i(Td);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Yx(e) {
  const { components: t } = In();
  return B.createElement(t.Dropdown, { ...e });
}
function Gx(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: l, labelNext: c } } = In(), d = Ce((h) => {
    o && (n == null || n(h));
  }, [o, n]), m = Ce((h) => {
    r && (t == null || t(h));
  }, [r, t]);
  return B.createElement(
    "nav",
    { ...a },
    B.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[X.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: m },
      B.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[X.Chevron], orientation: "left" })
    ),
    B.createElement(
      s.NextMonthButton,
      { type: "button", className: i[X.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": c(o), onClick: d },
      B.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[X.Chevron] })
    )
  );
}
function Ux(e) {
  const { components: t } = In();
  return B.createElement(t.Button, { ...e });
}
function jx(e) {
  return B.createElement("option", { ...e });
}
function Kx(e) {
  const { components: t } = In();
  return B.createElement(t.Button, { ...e });
}
function qx(e) {
  const { rootRef: t, ...n } = e;
  return B.createElement("div", { ...n, ref: t });
}
function Xx(e) {
  return B.createElement("select", { ...e });
}
function Zx(e) {
  const { week: t, ...n } = e;
  return B.createElement("tr", { ...n });
}
function Qx(e) {
  return B.createElement("th", { ...e });
}
function Jx(e) {
  return B.createElement(
    "thead",
    { "aria-hidden": !0 },
    B.createElement("tr", { ...e })
  );
}
function e0(e) {
  const { week: t, ...n } = e;
  return B.createElement("th", { ...n });
}
function t0(e) {
  return B.createElement("th", { ...e });
}
function n0(e) {
  return B.createElement("tbody", { ...e });
}
function r0(e) {
  const { components: t } = In();
  return B.createElement(t.Dropdown, { ...e });
}
const o0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: _x,
  CaptionLabel: Tx,
  Chevron: Ax,
  Day: Ix,
  DayButton: zx,
  Dropdown: Lx,
  DropdownNav: Fx,
  Footer: Wx,
  Month: $x,
  MonthCaption: Bx,
  MonthGrid: Vx,
  Months: Hx,
  MonthsDropdown: Yx,
  Nav: Gx,
  NextMonthButton: Ux,
  Option: jx,
  PreviousMonthButton: Kx,
  Root: qx,
  Select: Xx,
  Week: Zx,
  WeekNumber: e0,
  WeekNumberHeader: t0,
  Weekday: Qx,
  Weekdays: Jx,
  Weeks: n0,
  YearsDropdown: r0
}, Symbol.toStringTag, { value: "Module" }));
function a0(e) {
  return {
    ...o0,
    ...e
  };
}
function i0(e) {
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
function Ea() {
  const e = {};
  for (const t in X)
    e[X[t]] = `rdp-${X[t]}`;
  for (const t in he)
    e[he[t]] = `rdp-${he[t]}`;
  for (const t in We)
    e[We[t]] = `rdp-${We[t]}`;
  for (const t in De)
    e[De[t]] = `rdp-${De[t]}`;
  return e;
}
function Ad(e, t, n) {
  return (n ?? new lt(t)).format(e, "LLLL y");
}
const s0 = Ad;
function l0(e, t, n) {
  return (n ?? new lt(t)).format(e, "d");
}
function c0(e, t = Je) {
  return t.format(e, "LLLL");
}
function d0(e, t = Je) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function u0() {
  return "";
}
function f0(e, t, n) {
  return (n ?? new lt(t)).format(e, "cccccc");
}
function Id(e, t = Je) {
  return t.format(e, "yyyy");
}
const m0 = Id, h0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Ad,
  formatDay: l0,
  formatMonthCaption: s0,
  formatMonthDropdown: c0,
  formatWeekNumber: d0,
  formatWeekNumberHeader: u0,
  formatWeekdayName: f0,
  formatYearCaption: m0,
  formatYearDropdown: Id
}, Symbol.toStringTag, { value: "Module" }));
function p0(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...h0,
    ...e
  };
}
function g0(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: l, getMonth: c } = o;
  return l({
    start: s(e),
    end: i(e)
  }).map((h) => {
    const p = r.formatMonthDropdown(h, o), v = c(h), g = t && h < a(t) || n && h > a(n) || !1;
    return { value: v, label: p, disabled: g };
  });
}
function v0(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[X.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function b0(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function y0(e, t, n, r) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, addYears: s, getYear: i, isBefore: l, isSameYear: c } = r, d = o(e), m = a(t), h = [];
  let p = d;
  for (; l(p, m) || c(p, m); )
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
function zd(e, t, n) {
  return (n ?? new lt(t)).format(e, "LLLL y");
}
const w0 = zd;
function x0(e, t, n, r) {
  let o = (r ?? new lt(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function Ld(e, t, n, r) {
  let o = (r ?? new lt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const S0 = Ld;
function C0() {
  return "";
}
function k0(e) {
  return "Choose the Month";
}
function M0(e) {
  return "Go to the Next Month";
}
function N0(e) {
  return "Go to the Previous Month";
}
function R0(e, t, n) {
  return (n ?? new lt(t)).format(e, "cccc");
}
function P0(e, t) {
  return `Week ${e}`;
}
function E0(e) {
  return "Week Number";
}
function D0(e) {
  return "Choose the Year";
}
const O0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: w0,
  labelDay: S0,
  labelDayButton: Ld,
  labelGrid: zd,
  labelGridcell: x0,
  labelMonthDropdown: k0,
  labelNav: C0,
  labelNext: M0,
  labelPrevious: N0,
  labelWeekNumber: P0,
  labelWeekNumberHeader: E0,
  labelWeekday: R0,
  labelYearDropdown: D0
}, Symbol.toStringTag, { value: "Module" })), zn = (e) => e instanceof HTMLElement ? e : null, so = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], _0 = (e) => zn(e.querySelector("[data-animated-month]")), lo = (e) => zn(e.querySelector("[data-animated-caption]")), co = (e) => zn(e.querySelector("[data-animated-weeks]")), T0 = (e) => zn(e.querySelector("[data-animated-nav]")), A0 = (e) => zn(e.querySelector("[data-animated-weekdays]"));
function I0(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = tt(null), i = tt(r), l = tt(!1);
  Li(() => {
    const c = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || c.length === 0 || r.length !== c.length)
      return;
    const d = a.isSameMonth(r[0].date, c[0].date), m = a.isAfter(r[0].date, c[0].date), h = m ? n[De.caption_after_enter] : n[De.caption_before_enter], p = m ? n[De.weeks_after_enter] : n[De.weeks_before_enter], v = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (so(g).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const C = _0(y);
      C && y.contains(C) && y.removeChild(C);
      const S = lo(y);
      S && S.classList.remove(h);
      const N = co(y);
      N && N.classList.remove(p);
    }), s.current = g) : s.current = null, l.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = v instanceof HTMLElement ? so(v) : [], w = so(e.current);
    if (w && w.every((x) => x instanceof HTMLElement) && b && b.every((x) => x instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const x = T0(e.current);
      x && (x.style.zIndex = "1"), w.forEach((y, C) => {
        const S = b[C];
        if (!S)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const N = lo(y);
        N && N.classList.add(h);
        const M = co(y);
        M && M.classList.add(p);
        const k = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), x && (x.style.zIndex = ""), N && N.classList.remove(h), M && M.classList.remove(p), y.style.position = "", y.style.overflow = "", y.contains(S) && y.removeChild(S);
        };
        S.style.pointerEvents = "none", S.style.position = "absolute", S.style.overflow = "hidden", S.setAttribute("aria-hidden", "true");
        const R = A0(S);
        R && (R.style.opacity = "0");
        const O = lo(S);
        O && (O.classList.add(m ? n[De.caption_before_exit] : n[De.caption_after_exit]), O.addEventListener("animationend", k));
        const _ = co(S);
        _ && _.classList.add(m ? n[De.weeks_before_exit] : n[De.weeks_after_exit]), y.insertBefore(S, y.firstChild);
      });
    }
  });
}
function z0(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: c, differenceInCalendarDays: d, differenceInCalendarMonths: m, endOfBroadcastWeek: h, endOfISOWeek: p, endOfMonth: v, endOfWeek: g, isAfter: b, startOfBroadcastWeek: w, startOfISOWeek: x, startOfWeek: y } = r, C = l ? w(o, r) : s ? x(o) : y(o), S = l ? h(a) : s ? p(v(a)) : g(v(a)), N = d(S, C), M = m(a, o) + 1, k = [];
  for (let _ = 0; _ <= N; _++) {
    const I = c(C, _);
    if (t && b(I, t))
      break;
    k.push(I);
  }
  const O = (l ? 35 : 42) * M;
  if (i && k.length < O) {
    const _ = O - k.length;
    for (let I = 0; I < _; I++) {
      const Y = c(k[k.length - 1], 1);
      k.push(Y);
    }
  }
  return k;
}
function L0(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => [...a, ...s.days], t);
    return [...n, ...o];
  }, t);
}
function F0(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Ei(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let l = o || a || s;
  const { differenceInCalendarMonths: c, addMonths: d, startOfMonth: m } = r;
  if (n && c(n, l) < i - 1) {
    const h = -1 * (i - 1);
    l = d(n, h);
  }
  return t && c(l, t) < 0 && (l = t), m(l);
}
function W0(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: l, getISOWeek: c, getWeek: d, startOfBroadcastWeek: m, startOfISOWeek: h, startOfWeek: p } = r, v = e.reduce((g, b) => {
    const w = n.broadcastCalendar ? m(b, r) : n.ISOWeek ? h(b) : p(b), x = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : l(i(b)), y = t.filter((M) => M >= w && M <= x), C = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < C) {
      const M = t.filter((k) => {
        const R = C - y.length;
        return k > x && k <= o(x, R);
      });
      y.push(...M);
    }
    const S = y.reduce((M, k) => {
      const R = n.ISOWeek ? c(k) : d(k), O = M.find((I) => I.weekNumber === R), _ = new Rd(k, b, r);
      return O ? O.days.push(_) : M.push(new Ex(R, [_])), M;
    }, []), N = new Px(b, S);
    return g.push(N), g;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function $0(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: l, endOfYear: c, newDate: d, today: m } = t, { fromYear: h, toYear: p, fromMonth: v, toMonth: g } = e;
  !n && v && (n = v), !n && h && (n = t.newDate(h, 0, 1)), !r && g && (r = g), !r && p && (r = d(p, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : h ? n = d(h, 0, 1) : !n && b && (n = o(l(e.today ?? m(), -100))), r ? r = i(r) : p ? r = d(p, 11, 31) : !r && b && (r = c(e.today ?? m())), [
    n && a(n),
    r && a(r)
  ];
}
function B0(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, c = o ? a : 1, d = s(e);
  if (!t)
    return i(d, c);
  if (!(l(t, e) < a))
    return i(d, c);
}
function V0(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: l } = r, c = o ? a ?? 1 : 1, d = s(e);
  if (!t)
    return i(d, -c);
  if (!(l(d, t) <= 0))
    return i(d, -c);
}
function H0(e) {
  const t = [];
  return e.reduce((n, r) => [...n, ...r.weeks], t);
}
function Ar(e, t) {
  const [n, r] = Rt(e);
  return [t === void 0 ? n : t, r];
}
function Y0(e, t) {
  const [n, r] = $0(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Ei(e, n, r, t), [i, l] = Ar(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  ur(() => {
    const N = Ei(e, n, r, t);
    l(N);
  }, [e.timeZone]);
  const c = F0(i, r, e, t), d = z0(c, e.endMonth ? a(e.endMonth) : void 0, e, t), m = W0(c, d, e, t), h = H0(m), p = L0(m), v = V0(i, n, e, t), g = B0(i, r, e, t), { disableNavigation: b, onMonthChange: w } = e, x = (N) => h.some((M) => M.days.some((k) => k.isEqualTo(N))), y = (N) => {
    if (b)
      return;
    let M = o(N);
    n && M < o(n) && (M = o(n)), r && M > o(r) && (M = o(r)), l(M), w == null || w(M);
  };
  return {
    months: m,
    weeks: h,
    days: p,
    navStart: n,
    navEnd: r,
    previousMonth: v,
    nextMonth: g,
    goToMonth: y,
    goToDay: (N) => {
      x(N) || y(N.date);
    }
  };
}
var Ge;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ge || (Ge = {}));
function Di(e) {
  return !e[he.disabled] && !e[he.hidden] && !e[he.outside];
}
function G0(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Di(i) && (i[he.focused] && a < Ge.FocusedModifier ? (o = s, a = Ge.FocusedModifier) : r != null && r.isEqualTo(s) && a < Ge.LastFocused ? (o = s, a = Ge.LastFocused) : n(s.date) && a < Ge.Selected ? (o = s, a = Ge.Selected) : i[he.today] && a < Ge.Today && (o = s, a = Ge.Today));
  }
  return o || (o = e.find((s) => Di(t(s)))), o;
}
function U0(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: l } = a, { addDays: c, addMonths: d, addWeeks: m, addYears: h, endOfBroadcastWeek: p, endOfISOWeek: v, endOfWeek: g, max: b, min: w, startOfBroadcastWeek: x, startOfISOWeek: y, startOfWeek: C } = s;
  let N = {
    day: c,
    week: m,
    month: d,
    year: h,
    startOfWeek: (M) => l ? x(M, s) : i ? y(M) : C(M),
    endOfWeek: (M) => l ? p(M) : i ? v(M) : g(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? N = b([r, N]) : t === "after" && o && (N = w([o, N])), N;
}
function Fd(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const l = U0(e, t, n.date, r, o, a, s), c = !!(a.disabled && rt(l, a.disabled, s)), d = !!(a.hidden && rt(l, a.hidden, s)), m = l, h = new Rd(l, m, s);
  return !c && !d ? h : Fd(e, t, h, r, o, a, s, i + 1);
}
function j0(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = Rt(), l = G0(t.days, n, r || (() => !1), s), [c, d] = Rt(a ? l : void 0);
  return {
    isFocusTarget: (g) => !!(l != null && l.isEqualTo(g)),
    setFocused: d,
    focused: c,
    blur: () => {
      i(c), d(void 0);
    },
    moveFocus: (g, b) => {
      if (!c)
        return;
      const w = Fd(g, b, c, t.navStart, t.navEnd, e, o);
      w && (t.goToDay(w), d(w));
    }
  };
}
function K0(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Ar(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t, c = (p) => (i == null ? void 0 : i.some((v) => l(v, p))) ?? !1, { min: d, max: m } = e;
  return {
    selected: i,
    select: (p, v, g) => {
      let b = [...i ?? []];
      if (c(p)) {
        if ((i == null ? void 0 : i.length) === d || r && (i == null ? void 0 : i.length) === 1)
          return;
        b = i == null ? void 0 : i.filter((w) => !l(w, p));
      } else
        (i == null ? void 0 : i.length) === m ? b = [p] : b = [...b, p];
      return o || s(b), o == null || o(b, p, v, g), b;
    },
    isSelected: c
  };
}
function q0(e, t, n = 0, r = 0, o = !1, a = Je) {
  const { from: s, to: i } = t || {}, { isSameDay: l, isAfter: c, isBefore: d } = a;
  let m;
  if (!s && !i)
    m = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    l(s, e) ? o ? m = { from: s, to: void 0 } : m = void 0 : d(e, s) ? m = { from: e, to: s } : m = { from: s, to: e };
  else if (s && i)
    if (l(s, e) && l(i, e))
      o ? m = { from: s, to: i } : m = void 0;
    else if (l(s, e))
      m = { from: s, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      m = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, s))
      m = { from: e, to: i };
    else if (c(e, s))
      m = { from: s, to: e };
    else if (c(e, i))
      m = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (m != null && m.from && (m != null && m.to)) {
    const h = a.differenceInCalendarDays(m.to, m.from);
    r > 0 && h > r ? m = { from: e, to: void 0 } : n > 1 && h < n && (m = { from: e, to: void 0 });
  }
  return m;
}
function X0(e, t, n = Je) {
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
function Oi(e, t, n = Je) {
  return nt(e, t.from, !1, n) || nt(e, t.to, !1, n) || nt(t, e.from, !1, n) || nt(t, e.to, !1, n);
}
function Z0(e, t, n = Je) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? nt(e, i, !1, n) : _d(i, n) ? i.some((l) => nt(e, l, !1, n)) : Pa(i) ? i.from && i.to ? Oi(e, { from: i.from, to: i.to }, n) : !1 : Od(i) ? X0(e, i.dayOfWeek, n) : Pd(i) ? n.isAfter(i.before, i.after) ? Oi(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : rt(e.from, i, n) || rt(e.to, i, n) : Ed(i) || Dd(i) ? rt(e.from, i, n) || rt(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let c = 0; c <= l; c++) {
      if (s.some((d) => d(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Q0(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, l] = Ar(o, s ? o : void 0), c = s ? o : i;
  return {
    selected: c,
    select: (h, p, v) => {
      const { min: g, max: b } = e, w = h ? q0(h, c, g, b, a, t) : void 0;
      return r && n && (w != null && w.from) && w.to && Z0({ from: w.from, to: w.to }, n, t) && (w.from = h, w.to = void 0), s || l(w), s == null || s(w, h, p, v), w;
    },
    isSelected: (h) => c && nt(c, h, !1, t)
  };
}
function J0(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Ar(n, o ? n : void 0), i = o ? n : a, { isSameDay: l } = t;
  return {
    selected: i,
    select: (m, h, p) => {
      let v = m;
      return !r && i && i && l(m, i) && (v = void 0), o || s(v), o == null || o(v, m, h, p), v;
    },
    isSelected: (m) => i ? l(i, m) : !1
  };
}
function eS(e, t) {
  const n = J0(e, t), r = K0(e, t), o = Q0(e, t);
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
function tS(e) {
  var Ta;
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new ke(t.today, t.timeZone)), t.month && (t.month = new ke(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new ke(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new ke(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new ke(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new ke(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = (Ta = t.selected) == null ? void 0 : Ta.map((ae) => new ke(ae, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new ke(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new ke(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = Yt(() => {
    const ae = { ...Ra, ...t.locale };
    return {
      dateLib: new lt({
        locale: ae,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: a0(t.components),
      formatters: p0(t.formatters),
      labels: { ...O0, ...t.labels },
      locale: ae,
      classNames: { ...Ea(), ...t.classNames }
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
  ]), { captionLayout: l, mode: c, navLayout: d, numberOfMonths: m = 1, onDayBlur: h, onDayClick: p, onDayFocus: v, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: w, onNextClick: x, onPrevClick: y, showWeekNumber: C, styles: S } = t, { formatCaption: N, formatDay: M, formatMonthDropdown: k, formatWeekNumber: R, formatWeekNumberHeader: O, formatWeekdayName: _, formatYearDropdown: I } = r, Y = Y0(t, a), { days: H, months: j, navStart: $, navEnd: K, previousMonth: P, nextMonth: D, goToMonth: Z } = Y, ne = Dx(H, t, $, K, a), { isSelected: E, select: F, selected: z } = eS(t, a) ?? {}, { blur: W, focused: J, isFocusTarget: A, moveFocus: ee, setFocused: Q } = j0(t, Y, ne, E ?? (() => !1), a), { labelDayButton: re, labelGridcell: se, labelGrid: ie, labelMonthDropdown: Re, labelNav: Ee, labelPrevious: St, labelNext: Ct, labelWeekday: kt, labelWeekNumber: Wr, labelWeekNumberHeader: It, labelYearDropdown: Zd } = o, Qd = Yt(() => b0(a, t.ISOWeek), [a, t.ISOWeek]), Oa = c !== void 0 || p !== void 0, $r = Ce(() => {
    P && (Z(P), y == null || y(P));
  }, [P, Z, y]), Br = Ce(() => {
    D && (Z(D), x == null || x(D));
  }, [Z, D, x]), Jd = Ce((ae, me) => (le) => {
    le.preventDefault(), le.stopPropagation(), Q(ae), F == null || F(ae.date, me, le), p == null || p(ae.date, me, le);
  }, [F, p, Q]), eu = Ce((ae, me) => (le) => {
    Q(ae), v == null || v(ae.date, me, le);
  }, [v, Q]), tu = Ce((ae, me) => (le) => {
    W(), h == null || h(ae.date, me, le);
  }, [W, h]), nu = Ce((ae, me) => (le) => {
    const ct = {
      ArrowLeft: [
        le.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        le.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [le.shiftKey ? "year" : "week", "after"],
      ArrowUp: [le.shiftKey ? "year" : "week", "before"],
      PageUp: [le.shiftKey ? "year" : "month", "before"],
      PageDown: [le.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (ct[le.key]) {
      le.preventDefault(), le.stopPropagation();
      const [Le, Fn] = ct[le.key];
      ee(Le, Fn);
    }
    g == null || g(ae.date, me, le);
  }, [ee, g, t.dir]), ru = Ce((ae, me) => (le) => {
    b == null || b(ae.date, me, le);
  }, [b]), ou = Ce((ae, me) => (le) => {
    w == null || w(ae.date, me, le);
  }, [w]), au = Ce((ae) => (me) => {
    const le = Number(me.target.value), ct = a.setMonth(a.startOfMonth(ae), le);
    Z(ct);
  }, [a, Z]), iu = Ce((ae) => (me) => {
    const le = Number(me.target.value), ct = a.setYear(a.startOfMonth(ae), le);
    Z(ct);
  }, [a, Z]), { className: su, style: lu } = Yt(() => ({
    className: [i[X.Root], t.className].filter(Boolean).join(" "),
    style: { ...S == null ? void 0 : S[X.Root], ...t.style }
  }), [i, t.className, t.style, S]), cu = i0(t), _a = tt(null);
  I0(_a, !!t.animate, {
    classNames: i,
    months: j,
    focused: J,
    dateLib: a
  });
  const du = {
    dayPickerProps: t,
    selected: z,
    select: F,
    isSelected: E,
    months: j,
    nextMonth: D,
    previousMonth: P,
    goToMonth: Z,
    getModifiers: ne,
    components: n,
    classNames: i,
    styles: S,
    labels: o,
    formatters: r
  };
  return B.createElement(
    Td.Provider,
    { value: du },
    B.createElement(
      n.Root,
      { rootRef: t.animate ? _a : void 0, className: su, style: lu, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], ...cu },
      B.createElement(
        n.Months,
        { className: i[X.Months], style: S == null ? void 0 : S[X.Months] },
        !t.hideNavigation && !d && B.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[X.Nav], style: S == null ? void 0 : S[X.Nav], "aria-label": Ee(), onPreviousClick: $r, onNextClick: Br, previousMonth: P, nextMonth: D }),
        j.map((ae, me) => {
          const le = g0(ae.date, $, K, r, a), ct = y0($, K, r, a);
          return B.createElement(
            n.Month,
            { "data-animated-month": t.animate ? "true" : void 0, className: i[X.Month], style: S == null ? void 0 : S[X.Month], key: me, displayIndex: me, calendarMonth: ae },
            d === "around" && !t.hideNavigation && me === 0 && B.createElement(
              n.PreviousMonthButton,
              { type: "button", className: i[X.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": St(P), onClick: $r, "data-animated-button": t.animate ? "true" : void 0 },
              B.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[X.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            B.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[X.MonthCaption], style: S == null ? void 0 : S[X.MonthCaption], calendarMonth: ae, displayIndex: me }, l != null && l.startsWith("dropdown") ? B.createElement(
              n.DropdownNav,
              { className: i[X.Dropdowns], style: S == null ? void 0 : S[X.Dropdowns] },
              l === "dropdown" || l === "dropdown-months" ? B.createElement(n.MonthsDropdown, { className: i[X.MonthsDropdown], "aria-label": Re(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: au(ae.date), options: le, style: S == null ? void 0 : S[X.Dropdown], value: a.getMonth(ae.date) }) : B.createElement("span", null, k(ae.date, a)),
              l === "dropdown" || l === "dropdown-years" ? B.createElement(n.YearsDropdown, { className: i[X.YearsDropdown], "aria-label": Zd(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: iu(ae.date), options: ct, style: S == null ? void 0 : S[X.Dropdown], value: a.getYear(ae.date) }) : B.createElement("span", null, I(ae.date, a)),
              B.createElement("span", { role: "status", "aria-live": "polite", style: {
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
              } }, N(ae.date, a.options, a))
            ) : B.createElement(n.CaptionLabel, { className: i[X.CaptionLabel], role: "status", "aria-live": "polite" }, N(ae.date, a.options, a))),
            d === "around" && !t.hideNavigation && me === m - 1 && B.createElement(
              n.NextMonthButton,
              { type: "button", className: i[X.NextMonthButton], tabIndex: D ? void 0 : -1, "aria-disabled": D ? void 0 : !0, "aria-label": Ct(D), onClick: Br, "data-animated-button": t.animate ? "true" : void 0 },
              B.createElement(n.Chevron, { disabled: D ? void 0 : !0, className: i[X.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            me === m - 1 && d === "after" && !t.hideNavigation && B.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[X.Nav], style: S == null ? void 0 : S[X.Nav], "aria-label": Ee(), onPreviousClick: $r, onNextClick: Br, previousMonth: P, nextMonth: D }),
            B.createElement(
              n.MonthGrid,
              { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": ie(ae.date, a.options, a) || void 0, className: i[X.MonthGrid], style: S == null ? void 0 : S[X.MonthGrid] },
              !t.hideWeekdays && B.createElement(
                n.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[X.Weekdays], style: S == null ? void 0 : S[X.Weekdays] },
                C && B.createElement(n.WeekNumberHeader, { "aria-label": It(a.options), className: i[X.WeekNumberHeader], style: S == null ? void 0 : S[X.WeekNumberHeader], scope: "col" }, O()),
                Qd.map((Le, Fn) => B.createElement(n.Weekday, { "aria-label": kt(Le, a.options, a), className: i[X.Weekday], key: Fn, style: S == null ? void 0 : S[X.Weekday], scope: "col" }, _(Le, a.options, a)))
              ),
              B.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[X.Weeks], style: S == null ? void 0 : S[X.Weeks] }, ae.weeks.map((Le, Fn) => B.createElement(
                n.Week,
                { className: i[X.Week], key: Le.weekNumber, style: S == null ? void 0 : S[X.Week], week: Le },
                C && B.createElement(n.WeekNumber, { week: Le, style: S == null ? void 0 : S[X.WeekNumber], "aria-label": Wr(Le.weekNumber, {
                  locale: s
                }), className: i[X.WeekNumber], scope: "row", role: "rowheader" }, R(Le.weekNumber, a)),
                Le.days.map((Se) => {
                  const { date: Ye } = Se, de = ne(Se);
                  if (de[he.focused] = !de.hidden && !!(J != null && J.isEqualTo(Se)), de[We.selected] = (E == null ? void 0 : E(Ye)) || de.selected, Pa(z)) {
                    const { from: Vr, to: Hr } = z;
                    de[We.range_start] = !!(Vr && Hr && a.isSameDay(Ye, Vr)), de[We.range_end] = !!(Vr && Hr && a.isSameDay(Ye, Hr)), de[We.range_middle] = nt(z, Ye, !0, a);
                  }
                  const uu = v0(de, S, t.modifiersStyles), fu = Ox(de, i, t.modifiersClassNames), mu = !Oa && !de.hidden ? se(Ye, de, a.options, a) : void 0;
                  return B.createElement(n.Day, { key: `${a.format(Ye, "yyyy-MM-dd")}_${a.format(Se.displayMonth, "yyyy-MM")}`, day: Se, modifiers: de, className: fu.join(" "), style: uu, role: "gridcell", "aria-selected": de.selected || void 0, "aria-label": mu, "data-day": a.format(Ye, "yyyy-MM-dd"), "data-month": Se.outside ? a.format(Ye, "yyyy-MM") : void 0, "data-selected": de.selected || void 0, "data-disabled": de.disabled || void 0, "data-hidden": de.hidden || void 0, "data-outside": Se.outside || void 0, "data-focused": de.focused || void 0, "data-today": de.today || void 0 }, !de.hidden && Oa ? B.createElement(n.DayButton, { className: i[X.DayButton], style: S == null ? void 0 : S[X.DayButton], type: "button", day: Se, modifiers: de, disabled: de.disabled || void 0, tabIndex: A(Se) ? 0 : -1, "aria-label": re(Ye, de, a.options, a), onClick: Jd(Se, de), onBlur: tu(Se, de), onFocus: eu(Se, de), onKeyDown: nu(Se, de), onMouseEnter: ru(Se, de), onMouseLeave: ou(Se, de) }, M(Ye, a.options, a)) : !de.hidden && M(Se.date, a.options, a));
                })
              )))
            )
          );
        })
      ),
      t.footer && B.createElement(n.Footer, { className: i[X.Footer], style: S == null ? void 0 : S[X.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Bo = Sn(
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
function nS({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  loading: o = !1,
  disabled: a,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ f(
    r ? jo : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      disabled: o || a,
      className: L(Bo({ variant: t, size: n, className: e })),
      ...i,
      children: o ? /* @__PURE__ */ T(Me, { children: [
        /* @__PURE__ */ f(by, { className: "opacity-100" }),
        /* @__PURE__ */ f("span", { className: "opacity-64", children: s })
      ] }) : s
    }
  );
}
function _i({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const l = Ea();
  return /* @__PURE__ */ f(
    tS,
    {
      showOutsideDays: n,
      className: L(
        "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (c) => c.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: L("w-fit", l.root),
        months: L(
          "relative flex flex-col gap-4 md:flex-row",
          l.months
        ),
        month: L("flex w-full flex-col gap-4", l.month),
        nav: L(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          l.nav
        ),
        button_previous: L(
          Bo({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          l.button_previous
        ),
        button_next: L(
          Bo({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          l.button_next
        ),
        month_caption: L(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          l.month_caption
        ),
        dropdowns: L(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          l.dropdowns
        ),
        dropdown_root: L(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
          l.dropdown_root
        ),
        dropdown: L(
          "absolute inset-0 bg-popover opacity-0",
          l.dropdown
        ),
        caption_label: L(
          "font-medium select-none",
          r === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          l.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: L("flex", l.weekdays),
        weekday: L(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          l.weekday
        ),
        week: L("mt-2 flex w-full", l.week),
        week_number_header: L(
          "w-(--cell-size) select-none",
          l.week_number_header
        ),
        week_number: L(
          "text-[0.8rem] text-muted-foreground select-none",
          l.week_number
        ),
        day: L(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          i.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          l.day
        ),
        range_start: L(
          "rounded-l-md bg-accent",
          l.range_start
        ),
        range_middle: L("rounded-none", l.range_middle),
        range_end: L("rounded-r-md bg-accent", l.range_end),
        today: L(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          l.today
        ),
        outside: L(
          "text-muted-foreground aria-selected:text-muted-foreground",
          l.outside
        ),
        disabled: L(
          "text-muted-foreground opacity-50",
          l.disabled
        ),
        hidden: L("invisible", l.hidden),
        ...t
      },
      components: {
        Root: ({ className: c, rootRef: d, ...m }) => /* @__PURE__ */ f(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: L(c),
            ...m
          }
        ),
        Chevron: ({ className: c, orientation: d, ...m }) => d === "left" ? /* @__PURE__ */ f(td, { className: L("size-4", c), ...m }) : d === "right" ? /* @__PURE__ */ f(
          Ma,
          {
            className: L("size-4", c),
            ...m
          }
        ) : /* @__PURE__ */ f(ka, { className: L("size-4", c), ...m }),
        DayButton: rS,
        WeekNumber: ({ children: c, ...d }) => /* @__PURE__ */ f("td", { ...d, children: /* @__PURE__ */ f("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: c }) }),
        ...s
      },
      ...i
    }
  );
}
function rS({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ea(), a = u.useRef(null);
  return u.useEffect(() => {
    var s;
    n.focused && ((s = a.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ f(
    nS,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: L(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
function Ir({
  ...e
}) {
  return /* @__PURE__ */ f(lg, { "data-slot": "popover", ...e });
}
function zr({
  ...e
}) {
  return /* @__PURE__ */ f(cg, { "data-slot": "popover-trigger", ...e });
}
function Lr({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ f(dg, { children: /* @__PURE__ */ f(
    ug,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: L(
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function dr({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ f(
    dv,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: L(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
function qn(e, t = {}) {
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
function cn(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function uo(e) {
  if (!e) return;
  const t = typeof e == "string" ? Number(e) : e, n = new Date(t);
  return Number.isNaN(n.getTime()) ? void 0 : n;
}
function Ti(e) {
  return e == null ? [] : Array.isArray(e) ? e.map((t) => {
    if (typeof t == "number" || typeof t == "string")
      return t;
  }) : typeof e == "string" || typeof e == "number" ? [e] : [];
}
function oS({
  column: e,
  title: t,
  multiple: n
}) {
  const r = e.getFilterValue(), o = u.useMemo(() => {
    if (!r)
      return n ? { from: void 0, to: void 0 } : [];
    if (n) {
      const h = Ti(r);
      return {
        from: uo(h[0]),
        to: uo(h[1])
      };
    }
    const d = Ti(r), m = uo(d[0]);
    return m ? [m] : [];
  }, [r, n]), a = u.useCallback(
    (d) => {
      var m, h;
      if (!d) {
        e.setFilterValue(void 0);
        return;
      }
      if (n && !("getTime" in d)) {
        const p = (m = d.from) == null ? void 0 : m.getTime(), v = (h = d.to) == null ? void 0 : h.getTime();
        e.setFilterValue(p || v ? [p, v] : void 0);
      } else !n && "getTime" in d && e.setFilterValue(d.getTime());
    },
    [e, n]
  ), s = u.useCallback(
    (d) => {
      d.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  ), i = u.useMemo(() => n ? cn(o) ? o.from || o.to : !1 : Array.isArray(o) ? o.length > 0 : !1, [n, o]), l = u.useCallback((d) => !d.from && !d.to ? "" : d.from && d.to ? `${qn(d.from)} - ${qn(d.to)}` : qn(d.from ?? d.to), []), c = u.useMemo(() => {
    if (n) {
      if (!cn(o)) return null;
      const h = o.from || o.to, p = h ? l(o) : "Select date range";
      return /* @__PURE__ */ T("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ f("span", { children: t }),
        h && /* @__PURE__ */ T(Me, { children: [
          /* @__PURE__ */ f(
            dr,
            {
              orientation: "vertical",
              className: "mx-0.5 data-[orientation=vertical]:h-4"
            }
          ),
          /* @__PURE__ */ f("span", { children: p })
        ] })
      ] });
    }
    if (cn(o)) return null;
    const d = o.length > 0, m = d ? qn(o[0]) : "Select date";
    return /* @__PURE__ */ T("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ f("span", { children: t }),
      d && /* @__PURE__ */ T(Me, { children: [
        /* @__PURE__ */ f(
          dr,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ f("span", { children: m })
      ] })
    ] });
  }, [o, n, l, t]);
  return /* @__PURE__ */ T(Ir, { children: [
    /* @__PURE__ */ f(zr, { asChild: !0, children: /* @__PURE__ */ T(
      _e,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          i ? /* @__PURE__ */ f(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              onClick: s,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              children: /* @__PURE__ */ f(Na, {})
            }
          ) : /* @__PURE__ */ f(_b, {}),
          c
        ]
      }
    ) }),
    /* @__PURE__ */ f(Lr, { className: "w-auto p-0", align: "start", children: n ? /* @__PURE__ */ f(
      _i,
      {
        autoFocus: !0,
        captionLayout: "dropdown",
        mode: "range",
        selected: cn(o) ? o : { from: void 0, to: void 0 },
        onSelect: a
      }
    ) : /* @__PURE__ */ f(
      _i,
      {
        captionLayout: "dropdown",
        mode: "single",
        selected: cn(o) ? void 0 : o[0],
        onSelect: a
      }
    ) })
  ] });
}
var Ai = 1, aS = 0.9, iS = 0.8, sS = 0.17, fo = 0.1, mo = 0.999, lS = 0.9999, cS = 0.99, dS = /[\\\/_+.#"@\[\(\{&]/, uS = /[\\\/_+.#"@\[\(\{&]/g, fS = /[\s-]/, Wd = /[\s-]/g;
function Vo(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? Ai : cS;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var l = r.charAt(a), c = n.indexOf(l, o), d = 0, m, h, p, v; c >= 0; ) m = Vo(e, t, n, r, c + 1, a + 1, s), m > d && (c === o ? m *= Ai : dS.test(e.charAt(c - 1)) ? (m *= iS, p = e.slice(o, c - 1).match(uS), p && o > 0 && (m *= Math.pow(mo, p.length))) : fS.test(e.charAt(c - 1)) ? (m *= aS, v = e.slice(o, c - 1).match(Wd), v && o > 0 && (m *= Math.pow(mo, v.length))) : (m *= sS, o > 0 && (m *= Math.pow(mo, c - o))), e.charAt(c) !== t.charAt(a) && (m *= lS)), (m < fo && n.charAt(c - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(c - 1) !== r.charAt(a)) && (h = Vo(e, t, n, r, c + 1, a + 2, s), h * fo > m && (m = h * fo)), m > d && (d = m), c = n.indexOf(l, c + 1);
  return s[i] = d, d;
}
function Ii(e) {
  return e.toLowerCase().replace(Wd, " ");
}
function mS(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Vo(e, t, Ii(e), Ii(t), 0, 0, {});
}
var dn = '[cmdk-group=""]', ho = '[cmdk-group-items=""]', hS = '[cmdk-group-heading=""]', $d = '[cmdk-item=""]', zi = `${$d}:not([aria-disabled="true"])`, Ho = "cmdk-item-select", Vt = "data-value", pS = (e, t, n) => mS(e, t, n), Bd = u.createContext(void 0), Ln = () => u.useContext(Bd), Vd = u.createContext(void 0), Da = () => u.useContext(Vd), Hd = u.createContext(void 0), Yd = u.forwardRef((e, t) => {
  let n = Ht(() => {
    var E, F;
    return { search: "", value: (F = (E = e.value) != null ? E : e.defaultValue) != null ? F : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = Ht(() => /* @__PURE__ */ new Set()), o = Ht(() => /* @__PURE__ */ new Map()), a = Ht(() => /* @__PURE__ */ new Map()), s = Ht(() => /* @__PURE__ */ new Set()), i = Gd(e), { label: l, children: c, value: d, onValueChange: m, filter: h, shouldFilter: p, loop: v, disablePointerSelection: g = !1, vimBindings: b = !0, ...w } = e, x = we(), y = we(), C = we(), S = u.useRef(null), N = NS();
  _t(() => {
    if (d !== void 0) {
      let E = d.trim();
      n.current.value = E, M.emit();
    }
  }, [d]), _t(() => {
    N(6, Y);
  }, []);
  let M = u.useMemo(() => ({ subscribe: (E) => (s.current.add(E), () => s.current.delete(E)), snapshot: () => n.current, setState: (E, F, z) => {
    var W, J, A, ee;
    if (!Object.is(n.current[E], F)) {
      if (n.current[E] = F, E === "search") I(), O(), N(1, _);
      else if (E === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let Q = document.getElementById(C);
          Q ? Q.focus() : (W = document.getElementById(x)) == null || W.focus();
        }
        if (N(7, () => {
          var Q;
          n.current.selectedItemId = (Q = H()) == null ? void 0 : Q.id, M.emit();
        }), z || N(5, Y), ((J = i.current) == null ? void 0 : J.value) !== void 0) {
          let Q = F ?? "";
          (ee = (A = i.current).onValueChange) == null || ee.call(A, Q);
          return;
        }
      }
      M.emit();
    }
  }, emit: () => {
    s.current.forEach((E) => E());
  } }), []), k = u.useMemo(() => ({ value: (E, F, z) => {
    var W;
    F !== ((W = a.current.get(E)) == null ? void 0 : W.value) && (a.current.set(E, { value: F, keywords: z }), n.current.filtered.items.set(E, R(F, z)), N(2, () => {
      O(), M.emit();
    }));
  }, item: (E, F) => (r.current.add(E), F && (o.current.has(F) ? o.current.get(F).add(E) : o.current.set(F, /* @__PURE__ */ new Set([E]))), N(3, () => {
    I(), O(), n.current.value || _(), M.emit();
  }), () => {
    a.current.delete(E), r.current.delete(E), n.current.filtered.items.delete(E);
    let z = H();
    N(4, () => {
      I(), (z == null ? void 0 : z.getAttribute("id")) === E && _(), M.emit();
    });
  }), group: (E) => (o.current.has(E) || o.current.set(E, /* @__PURE__ */ new Set()), () => {
    a.current.delete(E), o.current.delete(E);
  }), filter: () => i.current.shouldFilter, label: l || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: x, inputId: C, labelId: y, listInnerRef: S }), []);
  function R(E, F) {
    var z, W;
    let J = (W = (z = i.current) == null ? void 0 : z.filter) != null ? W : pS;
    return E ? J(E, n.current.search, F) : 0;
  }
  function O() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let E = n.current.filtered.items, F = [];
    n.current.filtered.groups.forEach((W) => {
      let J = o.current.get(W), A = 0;
      J.forEach((ee) => {
        let Q = E.get(ee);
        A = Math.max(Q, A);
      }), F.push([W, A]);
    });
    let z = S.current;
    j().sort((W, J) => {
      var A, ee;
      let Q = W.getAttribute("id"), re = J.getAttribute("id");
      return ((A = E.get(re)) != null ? A : 0) - ((ee = E.get(Q)) != null ? ee : 0);
    }).forEach((W) => {
      let J = W.closest(ho);
      J ? J.appendChild(W.parentElement === J ? W : W.closest(`${ho} > *`)) : z.appendChild(W.parentElement === z ? W : W.closest(`${ho} > *`));
    }), F.sort((W, J) => J[1] - W[1]).forEach((W) => {
      var J;
      let A = (J = S.current) == null ? void 0 : J.querySelector(`${dn}[${Vt}="${encodeURIComponent(W[0])}"]`);
      A == null || A.parentElement.appendChild(A);
    });
  }
  function _() {
    let E = j().find((z) => z.getAttribute("aria-disabled") !== "true"), F = E == null ? void 0 : E.getAttribute(Vt);
    M.setState("value", F || void 0);
  }
  function I() {
    var E, F, z, W;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let J = 0;
    for (let A of r.current) {
      let ee = (F = (E = a.current.get(A)) == null ? void 0 : E.value) != null ? F : "", Q = (W = (z = a.current.get(A)) == null ? void 0 : z.keywords) != null ? W : [], re = R(ee, Q);
      n.current.filtered.items.set(A, re), re > 0 && J++;
    }
    for (let [A, ee] of o.current) for (let Q of ee) if (n.current.filtered.items.get(Q) > 0) {
      n.current.filtered.groups.add(A);
      break;
    }
    n.current.filtered.count = J;
  }
  function Y() {
    var E, F, z;
    let W = H();
    W && (((E = W.parentElement) == null ? void 0 : E.firstChild) === W && ((z = (F = W.closest(dn)) == null ? void 0 : F.querySelector(hS)) == null || z.scrollIntoView({ block: "nearest" })), W.scrollIntoView({ block: "nearest" }));
  }
  function H() {
    var E;
    return (E = S.current) == null ? void 0 : E.querySelector(`${$d}[aria-selected="true"]`);
  }
  function j() {
    var E;
    return Array.from(((E = S.current) == null ? void 0 : E.querySelectorAll(zi)) || []);
  }
  function $(E) {
    let F = j()[E];
    F && M.setState("value", F.getAttribute(Vt));
  }
  function K(E) {
    var F;
    let z = H(), W = j(), J = W.findIndex((ee) => ee === z), A = W[J + E];
    (F = i.current) != null && F.loop && (A = J + E < 0 ? W[W.length - 1] : J + E === W.length ? W[0] : W[J + E]), A && M.setState("value", A.getAttribute(Vt));
  }
  function P(E) {
    let F = H(), z = F == null ? void 0 : F.closest(dn), W;
    for (; z && !W; ) z = E > 0 ? kS(z, dn) : MS(z, dn), W = z == null ? void 0 : z.querySelector(zi);
    W ? M.setState("value", W.getAttribute(Vt)) : K(E);
  }
  let D = () => $(j().length - 1), Z = (E) => {
    E.preventDefault(), E.metaKey ? D() : E.altKey ? P(1) : K(1);
  }, ne = (E) => {
    E.preventDefault(), E.metaKey ? $(0) : E.altKey ? P(-1) : K(-1);
  };
  return u.createElement(q.div, { ref: t, tabIndex: -1, ...w, "cmdk-root": "", onKeyDown: (E) => {
    var F;
    (F = w.onKeyDown) == null || F.call(w, E);
    let z = E.nativeEvent.isComposing || E.keyCode === 229;
    if (!(E.defaultPrevented || z)) switch (E.key) {
      case "n":
      case "j": {
        b && E.ctrlKey && Z(E);
        break;
      }
      case "ArrowDown": {
        Z(E);
        break;
      }
      case "p":
      case "k": {
        b && E.ctrlKey && ne(E);
        break;
      }
      case "ArrowUp": {
        ne(E);
        break;
      }
      case "Home": {
        E.preventDefault(), $(0);
        break;
      }
      case "End": {
        E.preventDefault(), D();
        break;
      }
      case "Enter": {
        E.preventDefault();
        let W = H();
        if (W) {
          let J = new Event(Ho);
          W.dispatchEvent(J);
        }
      }
    }
  } }, u.createElement("label", { "cmdk-label": "", htmlFor: k.inputId, id: k.labelId, style: PS }, l), Fr(e, (E) => u.createElement(Vd.Provider, { value: M }, u.createElement(Bd.Provider, { value: k }, E))));
}), gS = u.forwardRef((e, t) => {
  var n, r;
  let o = we(), a = u.useRef(null), s = u.useContext(Hd), i = Ln(), l = Gd(e), c = (r = (n = l.current) == null ? void 0 : n.forceMount) != null ? r : s == null ? void 0 : s.forceMount;
  _t(() => {
    if (!c) return i.item(o, s == null ? void 0 : s.id);
  }, [c]);
  let d = Ud(o, a, [e.value, e.children, a], e.keywords), m = Da(), h = vt((N) => N.value && N.value === d.current), p = vt((N) => c || i.filter() === !1 ? !0 : N.search ? N.filtered.items.get(o) > 0 : !0);
  u.useEffect(() => {
    let N = a.current;
    if (!(!N || e.disabled)) return N.addEventListener(Ho, v), () => N.removeEventListener(Ho, v);
  }, [p, e.onSelect, e.disabled]);
  function v() {
    var N, M;
    g(), (M = (N = l.current).onSelect) == null || M.call(N, d.current);
  }
  function g() {
    m.setState("value", d.current, !0);
  }
  if (!p) return null;
  let { disabled: b, value: w, onSelect: x, forceMount: y, keywords: C, ...S } = e;
  return u.createElement(q.div, { ref: ot(a, t), ...S, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!h, "data-disabled": !!b, "data-selected": !!h, onPointerMove: b || i.getDisablePointerSelection() ? void 0 : g, onClick: b ? void 0 : v }, e.children);
}), vS = u.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = we(), i = u.useRef(null), l = u.useRef(null), c = we(), d = Ln(), m = vt((p) => o || d.filter() === !1 ? !0 : p.search ? p.filtered.groups.has(s) : !0);
  _t(() => d.group(s), []), Ud(s, i, [e.value, e.heading, l]);
  let h = u.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return u.createElement(q.div, { ref: ot(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: m ? void 0 : !0 }, n && u.createElement("div", { ref: l, "cmdk-group-heading": "", "aria-hidden": !0, id: c }, n), Fr(e, (p) => u.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? c : void 0 }, u.createElement(Hd.Provider, { value: h }, p))));
}), bS = u.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = u.useRef(null), a = vt((s) => !s.search);
  return !n && !a ? null : u.createElement(q.div, { ref: ot(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), yS = u.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = Da(), s = vt((c) => c.search), i = vt((c) => c.selectedItemId), l = Ln();
  return u.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), u.createElement(q.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": l.listId, "aria-labelledby": l.labelId, "aria-activedescendant": i, id: l.inputId, type: "text", value: o ? e.value : s, onChange: (c) => {
    o || a.setState("search", c.target.value), n == null || n(c.target.value);
  } });
}), wS = u.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = u.useRef(null), s = u.useRef(null), i = vt((c) => c.selectedItemId), l = Ln();
  return u.useEffect(() => {
    if (s.current && a.current) {
      let c = s.current, d = a.current, m, h = new ResizeObserver(() => {
        m = requestAnimationFrame(() => {
          let p = c.offsetHeight;
          d.style.setProperty("--cmdk-list-height", p.toFixed(1) + "px");
        });
      });
      return h.observe(c), () => {
        cancelAnimationFrame(m), h.unobserve(c);
      };
    }
  }, []), u.createElement(q.div, { ref: ot(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: l.listId }, Fr(e, (c) => u.createElement("div", { ref: ot(s, l.listInnerRef), "cmdk-list-sizer": "" }, c)));
}), xS = u.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return u.createElement(Xf, { open: n, onOpenChange: r }, u.createElement(Zf, { container: s }, u.createElement(Qf, { "cmdk-overlay": "", className: o }), u.createElement(Jf, { "aria-label": e.label, "cmdk-dialog": "", className: a }, u.createElement(Yd, { ref: t, ...i }))));
}), SS = u.forwardRef((e, t) => vt((n) => n.filtered.count === 0) ? u.createElement(q.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), CS = u.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return u.createElement(q.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Fr(e, (s) => u.createElement("div", { "aria-hidden": !0 }, s)));
}), At = Object.assign(Yd, { List: wS, Item: gS, Input: yS, Group: vS, Separator: bS, Dialog: xS, Empty: SS, Loading: CS });
function kS(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function MS(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function Gd(e) {
  let t = u.useRef(e);
  return _t(() => {
    t.current = e;
  }), t;
}
var _t = typeof window > "u" ? u.useEffect : u.useLayoutEffect;
function Ht(e) {
  let t = u.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function vt(e) {
  let t = Da(), n = () => e(t.snapshot());
  return u.useSyncExternalStore(t.subscribe, n, n);
}
function Ud(e, t, n, r = []) {
  let o = u.useRef(), a = Ln();
  return _t(() => {
    var s;
    let i = (() => {
      var c;
      for (let d of n) {
        if (typeof d == "string") return d.trim();
        if (typeof d == "object" && "current" in d) return d.current ? (c = d.current.textContent) == null ? void 0 : c.trim() : o.current;
      }
    })(), l = r.map((c) => c.trim());
    a.value(e, i, l), (s = t.current) == null || s.setAttribute(Vt, i), o.current = i;
  }), o;
}
var NS = () => {
  let [e, t] = u.useState(), n = Ht(() => /* @__PURE__ */ new Map());
  return _t(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function RS(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Fr({ asChild: e, children: t }, n) {
  return e && u.isValidElement(t) ? u.cloneElement(RS(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var PS = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function jd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    At,
    {
      "data-slot": "command",
      className: L(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        e
      ),
      ...t
    }
  );
}
function Kd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ T(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ f(Qb, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ f(
          At.Input,
          {
            "data-slot": "command-input",
            className: L(
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
function qd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    At.List,
    {
      "data-slot": "command-list",
      className: L(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...t
    }
  );
}
function Xd({
  ...e
}) {
  return /* @__PURE__ */ f(
    At.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function Yo({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    At.Group,
    {
      "data-slot": "command-group",
      className: L(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function ES({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    At.Separator,
    {
      "data-slot": "command-separator",
      className: L("-mx-1 h-px bg-border", e),
      ...t
    }
  );
}
function Go({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    At.Item,
    {
      "data-slot": "command-item",
      className: L(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function DS({
  column: e,
  title: t,
  options: n,
  multiple: r
}) {
  const [o, a] = u.useState(!1), s = e == null ? void 0 : e.getFilterValue(), i = new Set(
    Array.isArray(s) ? s : []
  ), l = u.useCallback(
    (d, m) => {
      if (e)
        if (r) {
          const h = new Set(i);
          m ? h.delete(d.value) : h.add(d.value);
          const p = Array.from(h);
          e.setFilterValue(p.length ? p : void 0);
        } else
          e.setFilterValue(m ? void 0 : [d.value]), a(!1);
    },
    [e, r, i]
  ), c = u.useCallback(
    (d) => {
      d == null || d.stopPropagation(), e == null || e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ T(Ir, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ f(zr, { asChild: !0, children: /* @__PURE__ */ T(
      _e,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          (i == null ? void 0 : i.size) > 0 ? /* @__PURE__ */ f(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: c,
              children: /* @__PURE__ */ f(Na, {})
            }
          ) : /* @__PURE__ */ f(nd, {}),
          t,
          (i == null ? void 0 : i.size) > 0 && /* @__PURE__ */ T(Me, { children: [
            /* @__PURE__ */ f(
              dr,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            /* @__PURE__ */ f(
              no,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal lg:hidden",
                children: i.size
              }
            ),
            /* @__PURE__ */ f("div", { className: "hidden items-center gap-1 lg:flex", children: i.size > 2 ? /* @__PURE__ */ T(
              no,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: [
                  i.size,
                  " selected"
                ]
              }
            ) : n.filter((d) => i.has(d.value)).map((d) => /* @__PURE__ */ f(
              no,
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
    /* @__PURE__ */ f(Lr, { className: "w-50 p-0", align: "start", children: /* @__PURE__ */ T(jd, { children: [
      /* @__PURE__ */ f(Kd, { placeholder: t }),
      /* @__PURE__ */ T(qd, { className: "max-h-full", children: [
        /* @__PURE__ */ f(Xd, { children: "No results found." }),
        /* @__PURE__ */ f(Yo, { className: "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", children: n.map((d) => {
          const m = i.has(d.value);
          return /* @__PURE__ */ T(
            Go,
            {
              onSelect: () => l(d, m),
              children: [
                /* @__PURE__ */ f(
                  "div",
                  {
                    className: L(
                      "flex size-4 items-center justify-center rounded-sm border border-primary",
                      m ? "bg-primary" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ f(mt, {})
                  }
                ),
                d.icon && /* @__PURE__ */ f(d.icon, {}),
                /* @__PURE__ */ f("span", { className: "truncate", children: d.label }),
                d.count && /* @__PURE__ */ f("span", { className: "ml-auto font-mono text-xs", children: d.count })
              ]
            },
            d.value
          );
        }) }),
        i.size > 0 && /* @__PURE__ */ T(Me, { children: [
          /* @__PURE__ */ f(ES, {}),
          /* @__PURE__ */ f(Yo, { children: /* @__PURE__ */ f(
            Go,
            {
              onSelect: () => c(),
              className: "justify-center text-center",
              children: "Clear filters"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
}
function po({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ f(
    Zp,
    {
      "data-slot": "label",
      className: L(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function OS({
  className: e,
  defaultValue: t,
  value: n,
  min: r = 0,
  max: o = 100,
  ...a
}) {
  const s = u.useMemo(
    () => Array.isArray(n) ? n : Array.isArray(t) ? t : [r, o],
    [n, t, r, o]
  );
  return /* @__PURE__ */ T(
    Nv,
    {
      "data-slot": "slider",
      defaultValue: t,
      value: n,
      min: r,
      max: o,
      className: L(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ f(
          Rv,
          {
            "data-slot": "slider-track",
            className: L(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ f(
              Pv,
              {
                "data-slot": "slider-range",
                className: L(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: s.length }, (i, l) => /* @__PURE__ */ f(
          Ev,
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
function _S(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && typeof e[1] == "number";
}
function TS(e) {
  if (Array.isArray(e) && e.length === 2 && e.every(
    (t) => (typeof t == "string" || typeof t == "number") && !Number.isNaN(t)
  ))
    return [Number(e[0]), Number(e[1])];
}
function AS({
  column: e,
  title: t
}) {
  var g, b, w, x;
  const n = u.useId(), r = TS(e.getFilterValue()), o = (g = e.columnDef.meta) == null ? void 0 : g.range, a = (b = e.columnDef.meta) == null ? void 0 : b.unit, { min: s, max: i, step: l } = u.useMemo(() => {
    let y = 0, C = 100;
    if (o && _S(o))
      [y, C] = o;
    else {
      const M = e.getFacetedMinMaxValues();
      if (M && Array.isArray(M) && M.length === 2) {
        const [k, R] = M;
        typeof k == "number" && typeof R == "number" && (y = k, C = R);
      }
    }
    const S = C - y, N = S <= 20 ? 1 : S <= 100 ? Math.ceil(S / 20) : Math.ceil(S / 50);
    return { min: y, max: C, step: N };
  }, [e, o]), c = u.useMemo(() => r ?? [s, i], [r, s, i]), d = u.useCallback((y) => y.toLocaleString(void 0, { maximumFractionDigits: 0 }), []), m = u.useCallback(
    (y) => {
      const C = Number(y.target.value);
      !Number.isNaN(C) && C >= s && C <= c[1] && e.setFilterValue([C, c[1]]);
    },
    [e, s, c]
  ), h = u.useCallback(
    (y) => {
      const C = Number(y.target.value);
      !Number.isNaN(C) && C <= i && C >= c[0] && e.setFilterValue([c[0], C]);
    },
    [e, i, c]
  ), p = u.useCallback(
    (y) => {
      Array.isArray(y) && y.length === 2 && e.setFilterValue(y);
    },
    [e]
  ), v = u.useCallback(
    (y) => {
      y.target instanceof HTMLDivElement && y.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ T(Ir, { children: [
    /* @__PURE__ */ f(zr, { asChild: !0, children: /* @__PURE__ */ T(
      _e,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          r ? /* @__PURE__ */ f(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: v,
              children: /* @__PURE__ */ f(Na, {})
            }
          ) : /* @__PURE__ */ f(nd, {}),
          /* @__PURE__ */ f("span", { children: t }),
          r ? /* @__PURE__ */ T(Me, { children: [
            /* @__PURE__ */ f(
              dr,
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
    /* @__PURE__ */ T(Lr, { align: "start", className: "flex w-auto flex-col gap-4", children: [
      /* @__PURE__ */ T("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ f("p", { className: "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: t }),
        /* @__PURE__ */ T("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ f(po, { htmlFor: `${n}-from`, className: "sr-only", children: "From" }),
          /* @__PURE__ */ T("div", { className: "relative", children: [
            /* @__PURE__ */ f(
              cr,
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
                value: (w = c[0]) == null ? void 0 : w.toString(),
                onChange: m,
                className: L("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ f("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] }),
          /* @__PURE__ */ f(po, { htmlFor: `${n}-to`, className: "sr-only", children: "to" }),
          /* @__PURE__ */ T("div", { className: "relative", children: [
            /* @__PURE__ */ f(
              cr,
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
                value: (x = c[1]) == null ? void 0 : x.toString(),
                onChange: h,
                className: L("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ f("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] })
        ] }),
        /* @__PURE__ */ T(po, { htmlFor: `${n}-slider`, className: "sr-only", children: [
          t,
          " slider"
        ] }),
        /* @__PURE__ */ f(
          OS,
          {
            id: `${n}-slider`,
            min: s,
            max: i,
            step: l,
            value: c,
            onValueChange: p
          }
        )
      ] }),
      /* @__PURE__ */ f(
        _e,
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
function IS({
  table: e,
  disabled: t,
  ...n
}) {
  const r = u.useMemo(
    () => e.getAllColumns().filter(
      (o) => typeof o.accessorFn < "u" && o.getCanHide()
    ),
    [e]
  );
  return /* @__PURE__ */ T(Ir, { children: [
    /* @__PURE__ */ f(zr, { asChild: !0, children: /* @__PURE__ */ T(
      _e,
      {
        "aria-label": "Toggle columns",
        role: "combobox",
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 font-normal lg:flex",
        disabled: t,
        children: [
          /* @__PURE__ */ f(rd, { className: "text-muted-foreground" }),
          "View"
        ]
      }
    ) }),
    /* @__PURE__ */ f(Lr, { className: "w-44 p-0", ...n, children: /* @__PURE__ */ T(jd, { children: [
      /* @__PURE__ */ f(Kd, { placeholder: "Search columns..." }),
      /* @__PURE__ */ T(qd, { children: [
        /* @__PURE__ */ f(Xd, { children: "No columns found." }),
        /* @__PURE__ */ f(Yo, { children: r.map((o) => {
          var a;
          return /* @__PURE__ */ T(
            Go,
            {
              onSelect: () => o.toggleVisibility(!o.getIsVisible()),
              children: [
                /* @__PURE__ */ f("span", { className: "truncate", children: ((a = o.columnDef.meta) == null ? void 0 : a.label) ?? o.id }),
                /* @__PURE__ */ f(
                  mt,
                  {
                    className: L(
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
function uC({
  table: e,
  children: t,
  className: n,
  ...r
}) {
  const o = e.getState().columnFilters.length > 0, a = u.useMemo(
    () => e.getAllColumns().filter((i) => i.getCanFilter()),
    [e]
  ), s = u.useCallback(() => {
    e.resetColumnFilters();
  }, [e]);
  return /* @__PURE__ */ T(
    "div",
    {
      role: "toolbar",
      "aria-orientation": "horizontal",
      className: L(
        "flex w-full items-start justify-between gap-2 p-1",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ T("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
          a.map((i) => /* @__PURE__ */ f(zS, { column: i }, i.id)),
          o && /* @__PURE__ */ T(
            _e,
            {
              "aria-label": "Reset filters",
              variant: "outline",
              size: "sm",
              className: "border-dashed",
              onClick: s,
              children: [
                /* @__PURE__ */ f(ty, {}),
                "Reset"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ T("div", { className: "flex items-center gap-2", children: [
          t,
          /* @__PURE__ */ f(IS, { table: e, align: "end" })
        ] })
      ]
    }
  );
}
function zS({
  column: e
}) {
  {
    const t = e.columnDef.meta;
    return u.useCallback(() => {
      if (!(t != null && t.variant)) return null;
      switch (t.variant) {
        case "text":
          return /* @__PURE__ */ f(
            cr,
            {
              placeholder: t.placeholder ?? t.label,
              value: e.getFilterValue() ?? "",
              onChange: (r) => e.setFilterValue(r.target.value),
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "number":
          return /* @__PURE__ */ T("div", { className: "relative", children: [
            /* @__PURE__ */ f(
              cr,
              {
                type: "number",
                inputMode: "numeric",
                placeholder: t.placeholder ?? t.label,
                value: e.getFilterValue() ?? "",
                onChange: (r) => e.setFilterValue(r.target.value),
                className: L("h-8 w-[120px]", t.unit && "pr-8")
              }
            ),
            t.unit && /* @__PURE__ */ f("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: t.unit })
          ] });
        case "range":
          return /* @__PURE__ */ f(
            AS,
            {
              column: e,
              title: t.label ?? e.id
            }
          );
        case "date":
        case "dateRange":
          return /* @__PURE__ */ f(
            oS,
            {
              column: e,
              title: t.label ?? e.id,
              multiple: t.variant === "dateRange"
            }
          );
        case "select":
        case "multiSelect":
          return /* @__PURE__ */ f(
            DS,
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
function Ae({ className: e, ...t }) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "skeleton",
      className: L("animate-pulse rounded-md bg-accent", e),
      ...t
    }
  );
}
function fC({
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
  const c = Array.from(
    { length: e },
    (d, m) => r[m % r.length] ?? "auto"
  );
  return /* @__PURE__ */ T(
    "div",
    {
      className: L("flex w-full flex-col gap-2.5 overflow-auto", i),
      ...l,
      children: [
        /* @__PURE__ */ T("div", { className: "flex w-full items-center justify-between gap-2 overflow-auto p-1", children: [
          /* @__PURE__ */ f("div", { className: "flex flex-1 items-center gap-2", children: n > 0 ? Array.from({ length: n }).map((d, m) => /* @__PURE__ */ f(Ae, { className: "h-7 w-18 border-dashed" }, m)) : null }),
          o ? /* @__PURE__ */ f(Ae, { className: "ml-auto hidden h-7 w-18 lg:flex" }) : null
        ] }),
        /* @__PURE__ */ f("div", { className: "rounded-md border", children: /* @__PURE__ */ T(oy, { children: [
          /* @__PURE__ */ f(ay, { children: Array.from({ length: 1 }).map((d, m) => /* @__PURE__ */ f(pi, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((h, p) => /* @__PURE__ */ f(
            sy,
            {
              style: {
                width: c[p],
                minWidth: s ? c[p] : "auto"
              },
              children: /* @__PURE__ */ f(Ae, { className: "h-6 w-full" })
            },
            p
          )) }, m)) }),
          /* @__PURE__ */ f(iy, { children: Array.from({ length: t }).map((d, m) => /* @__PURE__ */ f(pi, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((h, p) => /* @__PURE__ */ f(
            ly,
            {
              style: {
                width: c[p],
                minWidth: s ? c[p] : "auto"
              },
              children: /* @__PURE__ */ f(Ae, { className: "h-6 w-full" })
            },
            p
          )) }, m)) })
        ] }) }),
        a ? /* @__PURE__ */ T("div", { className: "flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8", children: [
          /* @__PURE__ */ f(Ae, { className: "h-7 w-40 shrink-0" }),
          /* @__PURE__ */ T("div", { className: "flex items-center gap-4 sm:gap-6 lg:gap-8", children: [
            /* @__PURE__ */ T("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ f(Ae, { className: "h-7 w-24" }),
              /* @__PURE__ */ f(Ae, { className: "h-7 w-18" })
            ] }),
            /* @__PURE__ */ f("div", { className: "flex items-center justify-center font-medium text-sm", children: /* @__PURE__ */ f(Ae, { className: "h-7 w-20" }) }),
            /* @__PURE__ */ T("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ f(Ae, { className: "hidden size-7 lg:block" }),
              /* @__PURE__ */ f(Ae, { className: "size-7" }),
              /* @__PURE__ */ f(Ae, { className: "size-7" }),
              /* @__PURE__ */ f(Ae, { className: "hidden size-7 lg:block" })
            ] })
          ] })
        ] }) : null
      ]
    }
  );
}
const mC = {
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
  no as Badge,
  _e as Button,
  KS as Card,
  QS as CardAction,
  JS as CardContent,
  ZS as CardDescription,
  eC as CardFooter,
  qS as CardHeader,
  XS as CardTitle,
  dy as DataGrid,
  uy as DataGridContainer,
  cy as DataGridProvider,
  hy as DataGridScrollArea,
  Hy as DataGridTable,
  cC as DataTable,
  dC as DataTableColumnHeader,
  DS as DataTableFacetedFilter,
  Yy as DataTablePagination,
  fC as DataTableSkeleton,
  uC as DataTableToolbar,
  IS as DataTableViewOptions,
  cr as Input,
  od as Select,
  sd as SelectContent,
  nC as SelectGroup,
  ld as SelectItem,
  rC as SelectLabel,
  ry as SelectScrollDownButton,
  ny as SelectScrollUpButton,
  oC as SelectSeparator,
  id as SelectTrigger,
  ad as SelectValue,
  aC as SimpleSelect,
  iC as Switch,
  oy as Table,
  iy as TableBody,
  lC as TableCaption,
  ly as TableCell,
  sC as TableFooter,
  sy as TableHead,
  ay as TableHeader,
  pi as TableRow,
  pb as badgeVariants,
  gb as buttonVariants,
  ce as cn,
  mC as dataTableConfig,
  vb as useCallbackRef,
  ge as useDataGrid,
  tC as useDebouncedCallback
};
//# sourceMappingURL=index.mjs.map
