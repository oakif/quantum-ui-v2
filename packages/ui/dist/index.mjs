import { jsx as l, Fragment as ke, jsxs as D } from "react/jsx-runtime";
import * as f from "react";
import O, { forwardRef as Qs, createElement as la, useState as It, useLayoutEffect as Js, useMemo as Ot, createContext as el, useContext as tl, useEffect as Fr, useRef as ot, useCallback as Pe, memo as nl, Fragment as Mp } from "react";
import * as Wr from "react-dom";
import _p from "react-dom";
function rl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = rl(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ol() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = rl(e)) && (r && (r += " "), r += t);
  return r;
}
const $a = "-", Dp = (e) => {
  const t = Ap(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split($a);
      return i[0] === "" && i.length !== 1 && i.shift(), al(i, t) || Tp(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, al = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? al(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join($a);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Vi = /^\[(.+)\]$/, Tp = (e) => {
  if (Vi.test(e)) {
    const t = Vi.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ap = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    ca(n[o], r, o, t);
  return r;
}, ca = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Hi(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Op(o)) {
        ca(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      ca(s, Hi(t, a), n, r);
    });
  });
}, Hi = (e, t) => {
  let n = e;
  return t.split($a).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Op = (e) => e.isThemeGetter, Ip = (e) => {
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
}, da = "!", ua = ":", zp = ua.length, Lp = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const a = [];
    let s = 0, i = 0, c = 0, u;
    for (let v = 0; v < o.length; v++) {
      let g = o[v];
      if (s === 0 && i === 0) {
        if (g === ua) {
          a.push(o.slice(c, v)), c = v + zp;
          continue;
        }
        if (g === "/") {
          u = v;
          continue;
        }
      }
      g === "[" ? s++ : g === "]" ? s-- : g === "(" ? i++ : g === ")" && i--;
    }
    const d = a.length === 0 ? o : o.substring(c), m = $p(d), p = m !== d, h = u && u > c ? u - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + ua, a = r;
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
}, $p = (e) => e.endsWith(da) ? e.substring(0, e.length - 1) : e.startsWith(da) ? e.substring(1) : e, Fp = (e) => {
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
}, Wp = (e) => ({
  cache: Ip(e.cacheSize),
  parseClassName: Lp(e),
  sortModifiers: Fp(e),
  ...Dp(e)
}), Bp = /\s+/, Vp = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, s = [], i = e.trim().split(Bp);
  let c = "";
  for (let u = i.length - 1; u >= 0; u -= 1) {
    const d = i[u], {
      isExternal: m,
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: v,
      maybePostfixModifierPosition: g
    } = n(d);
    if (m) {
      c = d + (c.length > 0 ? " " + c : c);
      continue;
    }
    let b = !!g, y = r(b ? v.substring(0, g) : v);
    if (!y) {
      if (!b) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (y = r(v), !y) {
        c = d + (c.length > 0 ? " " + c : c);
        continue;
      }
      b = !1;
    }
    const w = a(p).join(":"), x = h ? w + da : w, k = x + y;
    if (s.includes(k))
      continue;
    s.push(k);
    const C = o(y, b);
    for (let R = 0; R < C.length; ++R) {
      const P = C[R];
      s.push(x + P);
    }
    c = d + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Hp() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = il(t)) && (r && (r += " "), r += n);
  return r;
}
const il = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = il(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Gp(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const u = t.reduce((d, m) => m(d), e());
    return n = Wp(u), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const u = r(c);
    if (u)
      return u;
    const d = Vp(c, n);
    return o(c, d), d;
  }
  return function() {
    return a(Hp.apply(null, arguments));
  };
}
const xe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, sl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ll = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Yp = /^\d+\/\d+$/, Up = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, jp = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Kp = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, qp = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Xp = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, jt = (e) => Yp.test(e), oe = (e) => !!e && !Number.isNaN(Number(e)), ht = (e) => !!e && Number.isInteger(Number(e)), Oo = (e) => e.endsWith("%") && oe(e.slice(0, -1)), rt = (e) => Up.test(e), Zp = () => !0, Qp = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  jp.test(e) && !Kp.test(e)
), cl = () => !1, Jp = (e) => qp.test(e), eh = (e) => Xp.test(e), th = (e) => !U(e) && !j(e), nh = (e) => dn(e, fl, cl), U = (e) => sl.test(e), Tt = (e) => dn(e, ml, Qp), Io = (e) => dn(e, sh, oe), Gi = (e) => dn(e, dl, cl), rh = (e) => dn(e, ul, eh), or = (e) => dn(e, pl, Jp), j = (e) => ll.test(e), yn = (e) => un(e, ml), oh = (e) => un(e, lh), Yi = (e) => un(e, dl), ah = (e) => un(e, fl), ih = (e) => un(e, ul), ar = (e) => un(e, pl, !0), dn = (e, t, n) => {
  const r = sl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, un = (e, t, n = !1) => {
  const r = ll.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, dl = (e) => e === "position" || e === "percentage", ul = (e) => e === "image" || e === "url", fl = (e) => e === "length" || e === "size" || e === "bg-size", ml = (e) => e === "length", sh = (e) => e === "number", lh = (e) => e === "family-name", pl = (e) => e === "shadow", ch = () => {
  const e = xe("color"), t = xe("font"), n = xe("text"), r = xe("font-weight"), o = xe("tracking"), a = xe("leading"), s = xe("breakpoint"), i = xe("container"), c = xe("spacing"), u = xe("radius"), d = xe("shadow"), m = xe("inset-shadow"), p = xe("text-shadow"), h = xe("drop-shadow"), v = xe("blur"), g = xe("perspective"), b = xe("aspect"), y = xe("ease"), w = xe("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
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
  ], C = () => [...k(), j, U], R = () => ["auto", "hidden", "clip", "visible", "scroll"], P = () => ["auto", "contain", "none"], N = () => [j, U, c], E = () => [jt, "full", "auto", ...N()], A = () => [ht, "none", "subgrid", j, U], z = () => ["auto", {
    span: ["full", ht, j, U]
  }, ht, j, U], $ = () => [ht, "auto", j, U], Y = () => ["auto", "min", "max", "fr", j, U], G = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], K = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], H = () => ["auto", ...N()], q = () => [jt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...N()], M = () => [e, j, U], T = () => [...k(), Yi, Gi, {
    position: [j, U]
  }], Z = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ne = () => ["auto", "cover", "contain", ah, nh, {
    size: [j, U]
  }], _ = () => [Oo, yn, Tt], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    j,
    U
  ], W = () => ["", oe, yn, Tt], V = () => ["solid", "dashed", "dotted", "double"], ee = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], L = () => [oe, Oo, Yi, Gi], te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    j,
    U
  ], J = () => ["none", oe, j, U], re = () => ["none", oe, j, U], se = () => [oe, j, U], ie = () => [jt, "full", ...N()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [rt],
      breakpoint: [rt],
      color: [Zp],
      container: [rt],
      "drop-shadow": [rt],
      ease: ["in", "out", "in-out"],
      font: [th],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [rt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [rt],
      shadow: [rt],
      spacing: ["px", oe],
      text: [rt],
      "text-shadow": [rt],
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
        aspect: ["auto", "square", jt, U, j, b]
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
        columns: [oe, U, j, i]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": x()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": x()
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
        overscroll: P()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": P()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": P()
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
        inset: E()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": E()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": E()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: E()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: E()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: E()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: E()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: E()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: E()
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
        z: [ht, "auto", j, U]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [jt, "full", "auto", i, ...N()]
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
        flex: [oe, jt, "auto", "initial", "none", U]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", oe, j, U]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", oe, j, U]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ht, "first", "last", "none", j, U]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": A()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: z()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": $()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": $()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": A()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: z()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": $()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": $()
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
        gap: N()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": N()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": N()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...G(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...K(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...K()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...G()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...K(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": G()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...K(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...K()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: N()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: N()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: N()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: N()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: N()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: N()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: N()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: N()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: N()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: H()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: H()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: H()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: H()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: H()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: H()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: H()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: H()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: H()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": N()
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
        "space-y": N()
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
        size: q()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...q()]
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
          ...q()
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
          ...q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, yn, Tt]
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
        font: [r, j, Io]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Oo, U]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [oh, U, t]
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
        tracking: [o, j, U]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [oe, "none", j, Io]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...N()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", j, U]
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
        list: ["disc", "decimal", "none", j, U]
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
        placeholder: M()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: M()
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
        decoration: [...V(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [oe, "from-font", "auto", j, Tt]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: M()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [oe, "auto", j, U]
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
        indent: N()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", j, U]
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
        content: ["none", j, U]
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
        bg: T()
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
          }, ht, j, U],
          radial: ["", j, U],
          conic: [ht, j, U]
        }, ih, rh]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: M()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: _()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: _()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: _()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: M()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: M()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: M()
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
        border: [...V(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...V(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: M()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": M()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": M()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": M()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": M()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": M()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": M()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": M()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": M()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: M()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...V(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [oe, j, U]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", oe, yn, Tt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: M()
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
          ar,
          or
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: M()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", m, ar, or]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": M()
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
        ring: M()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [oe, Tt]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": M()
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
        "inset-ring": M()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, ar, or]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": M()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [oe, j, U]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ee(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ee()
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
        "mask-linear-from": L()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": L()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": M()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": M()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": L()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": L()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": M()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": M()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": L()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": L()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": M()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": M()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": L()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": L()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": M()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": M()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": L()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": L()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": M()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": M()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": L()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": L()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": M()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": M()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": L()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": L()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": M()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": M()
      }],
      "mask-image-radial": [{
        "mask-radial": [j, U]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": L()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": L()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": M()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": M()
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
        "mask-radial-at": k()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [oe]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": L()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": L()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": M()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": M()
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
        mask: T()
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
        mask: ["none", j, U]
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
          j,
          U
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
        brightness: [oe, j, U]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [oe, j, U]
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
          h,
          ar,
          or
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": M()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", oe, j, U]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [oe, j, U]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", oe, j, U]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [oe, j, U]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", oe, j, U]
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
          j,
          U
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
        "backdrop-brightness": [oe, j, U]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [oe, j, U]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", oe, j, U]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [oe, j, U]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", oe, j, U]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [oe, j, U]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [oe, j, U]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", oe, j, U]
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
        "border-spacing": N()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": N()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": N()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", j, U]
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
        duration: [oe, "initial", j, U]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", y, j, U]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [oe, j, U]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, j, U]
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
        perspective: [g, j, U]
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
        transform: [j, U, "", "none", "gpu", "cpu"]
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
        accent: M()
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
        caret: M()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", j, U]
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
        "scroll-m": N()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": N()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": N()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": N()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": N()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": N()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": N()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": N()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": N()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": N()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": N()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": N()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": N()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": N()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": N()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": N()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": N()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": N()
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
        "will-change": ["auto", "scroll", "contents", "transform", j, U]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...M()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [oe, yn, Tt, Io]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...M()]
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
}, dh = /* @__PURE__ */ Gp(ch);
function S(...e) {
  return dh(ol(e));
}
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uh = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), hl = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var fh = {
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
const mh = Qs(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => la(
    "svg",
    {
      ref: c,
      ...fh,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: hl("lucide", o),
      ...i
    },
    [
      ...s.map(([u, d]) => la(u, d)),
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
const me = (e, t) => {
  const n = Qs(
    ({ className: r, ...o }, a) => la(mh, {
      ref: a,
      iconNode: t,
      className: hl(`lucide-${uh(e)}`, r),
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
const ph = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], Ui = me("ArrowDown", ph);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
], gh = me("ArrowLeftToLine", hh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vh = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], bh = me("ArrowLeft", vh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], wh = me("ArrowRightToLine", yh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], Ch = me("ArrowRight", xh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], ji = me("ArrowUp", Sh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], Nh = me("Calendar", kh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], at = me("Check", Rh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ph = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Br = me("ChevronDown", Ph);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Fa = me("ChevronLeft", Eh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], zn = me("ChevronRight", Mh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Dh = me("ChevronUp", _h);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Th = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], Ah = me("ChevronsLeft", Th);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], Ih = me("ChevronsRight", Oh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], gl = me("ChevronsUpDown", zh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], vl = me("CirclePlus", Lh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $h = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], Wa = me("CircleX", $h);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], bl = me("Circle", Fh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wh = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], yl = me("Ellipsis", Wh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Vh = me("LoaderCircle", Bh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hh = [
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
], Gh = me("PinOff", Hh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yh = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], Uh = me("Search", Yh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jh = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], wl = me("Settings2", jh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kh = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Ba = me("X", Kh);
function Ki(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function lt(...e) {
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
function Q(...e) {
  return f.useCallback(lt(...e), e);
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
  const t = /* @__PURE__ */ qh(e), n = f.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = f.Children.toArray(a), c = i.find(Xh);
    if (c) {
      const u = c.props.children, d = i.map((m) => m === c ? f.Children.count(u) > 1 ? f.Children.only(null) : f.isValidElement(u) ? u.props.children : null : m);
      return /* @__PURE__ */ l(t, { ...s, ref: o, children: f.isValidElement(u) ? f.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ l(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Ln = /* @__PURE__ */ yt("Slot");
// @__NO_SIDE_EFFECTS__
function qh(e) {
  const t = f.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (f.isValidElement(o)) {
      const s = Qh(o), i = Zh(a, o.props);
      return o.type !== f.Fragment && (i.ref = r ? lt(r, s) : s), f.cloneElement(o, i);
    }
    return f.Children.count(o) > 1 ? f.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var xl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Cl(e) {
  const t = ({ children: n }) => /* @__PURE__ */ l(ke, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = xl, t;
}
function Xh(e) {
  return f.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === xl;
}
function Zh(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Qh(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Jh = [
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
], F = Jh.reduce((e, t) => {
  const n = /* @__PURE__ */ yt(`Primitive.${t}`), r = f.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Sl(e, t) {
  e && Wr.flushSync(() => e.dispatchEvent(t));
}
var kl = Object.freeze({
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
}), eg = "VisuallyHidden", Nl = f.forwardRef(
  (e, t) => /* @__PURE__ */ l(
    F.span,
    {
      ...e,
      ref: t,
      style: { ...kl, ...e.style }
    }
  )
);
Nl.displayName = eg;
var tg = Nl;
function ng(e, t) {
  const n = f.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = f.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ l(n.Provider, { value: c, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = f.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function he(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = f.createContext(s), c = n.length;
    n = [...n, s];
    const u = (m) => {
      var y;
      const { scope: p, children: h, ...v } = m, g = ((y = p == null ? void 0 : p[e]) == null ? void 0 : y[c]) || i, b = f.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ l(g.Provider, { value: b, children: h });
    };
    u.displayName = a + "Provider";
    function d(m, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, v = f.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${m}\` must be used within \`${a}\``);
    }
    return [u, d];
  }
  const o = () => {
    const a = n.map((s) => f.createContext(s));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || a;
      return f.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, rg(o, ...t)];
}
function rg(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: u }) => {
        const m = c(a)[`__scope${u}`];
        return { ...i, ...m };
      }, {});
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function $n(e) {
  const t = e + "CollectionProvider", [n, r] = he(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: b, children: y } = g, w = O.useRef(null), x = O.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ l(o, { scope: b, itemMap: x, collectionRef: w, children: y });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ yt(i), u = O.forwardRef(
    (g, b) => {
      const { scope: y, children: w } = g, x = a(i, y), k = Q(b, x.collectionRef);
      return /* @__PURE__ */ l(c, { ref: k, children: w });
    }
  );
  u.displayName = i;
  const d = e + "CollectionItemSlot", m = "data-radix-collection-item", p = /* @__PURE__ */ yt(d), h = O.forwardRef(
    (g, b) => {
      const { scope: y, children: w, ...x } = g, k = O.useRef(null), C = Q(b, k), R = a(d, y);
      return O.useEffect(() => (R.itemMap.set(k, { ref: k, ...x }), () => void R.itemMap.delete(k))), /* @__PURE__ */ l(p, { [m]: "", ref: C, children: w });
    }
  );
  h.displayName = d;
  function v(g) {
    const b = a(e + "CollectionConsumer", g);
    return O.useCallback(() => {
      const w = b.collectionRef.current;
      if (!w) return [];
      const x = Array.from(w.querySelectorAll(`[${m}]`));
      return Array.from(b.itemMap.values()).sort(
        (R, P) => x.indexOf(R.ref.current) - x.indexOf(P.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: u, ItemSlot: h },
    v,
    r
  ];
}
function I(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
var ye = globalThis != null && globalThis.document ? f.useLayoutEffect : () => {
}, og = f[" useInsertionEffect ".trim().toString()] || ye;
function we({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = ag({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const d = f.useRef(e !== void 0);
    f.useEffect(() => {
      const m = d.current;
      m !== i && console.warn(
        `${r} is changing from ${m ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const u = f.useCallback(
    (d) => {
      var m;
      if (i) {
        const p = ig(d) ? d(e) : d;
        p !== e && ((m = s.current) == null || m.call(s, p));
      } else
        a(d);
    },
    [i, e, a, s]
  );
  return [c, u];
}
function ag({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = f.useState(e), o = f.useRef(n), a = f.useRef(t);
  return og(() => {
    a.current = t;
  }, [t]), f.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function ig(e) {
  return typeof e == "function";
}
function sg(e, t) {
  return f.useReducer((n, r) => t[n][r] ?? n, e);
}
var ve = (e) => {
  const { present: t, children: n } = e, r = lg(t), o = typeof n == "function" ? n({ present: r.isPresent }) : f.Children.only(n), a = Q(r.ref, cg(o));
  return typeof n == "function" || r.isPresent ? f.cloneElement(o, { ref: a }) : null;
};
ve.displayName = "Presence";
function lg(e) {
  const [t, n] = f.useState(), r = f.useRef(null), o = f.useRef(e), a = f.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = sg(s, {
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
  return f.useEffect(() => {
    const u = ir(r.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), ye(() => {
    const u = r.current, d = o.current;
    if (d !== e) {
      const p = a.current, h = ir(u);
      e ? c("MOUNT") : h === "none" || (u == null ? void 0 : u.display) === "none" ? c("UNMOUNT") : c(d && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ye(() => {
    if (t) {
      let u;
      const d = t.ownerDocument.defaultView ?? window, m = (h) => {
        const g = ir(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, p = (h) => {
        h.target === t && (a.current = ir(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", m), t.addEventListener("animationend", m), () => {
        d.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", m), t.removeEventListener("animationend", m);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: f.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function ir(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function cg(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var dg = f[" useId ".trim().toString()] || (() => {
}), ug = 0;
function ge(e) {
  const [t, n] = f.useState(dg());
  return ye(() => {
    n((r) => r ?? String(ug++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var Vr = "Collapsible", [fg, Rl] = he(Vr), [mg, Va] = fg(Vr), Pl = f.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, u] = we({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: Vr
    });
    return /* @__PURE__ */ l(
      mg,
      {
        scope: n,
        disabled: a,
        contentId: ge(),
        open: c,
        onOpenToggle: f.useCallback(() => u((d) => !d), [u]),
        children: /* @__PURE__ */ l(
          F.div,
          {
            "data-state": Ua(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
Pl.displayName = Vr;
var El = "CollapsibleTrigger", Ha = f.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = Va(El, n);
    return /* @__PURE__ */ l(
      F.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Ua(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: I(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ha.displayName = El;
var Ga = "CollapsibleContent", Ya = f.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Va(Ga, e.__scopeCollapsible);
    return /* @__PURE__ */ l(ve, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ l(pg, { ...r, ref: t, present: a }) });
  }
);
Ya.displayName = Ga;
var pg = f.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = Va(Ga, n), [i, c] = f.useState(r), u = f.useRef(null), d = Q(t, u), m = f.useRef(0), p = m.current, h = f.useRef(0), v = h.current, g = s.open || i, b = f.useRef(g), y = f.useRef(void 0);
  return f.useEffect(() => {
    const w = requestAnimationFrame(() => b.current = !1);
    return () => cancelAnimationFrame(w);
  }, []), ye(() => {
    const w = u.current;
    if (w) {
      y.current = y.current || {
        transitionDuration: w.style.transitionDuration,
        animationName: w.style.animationName
      }, w.style.transitionDuration = "0s", w.style.animationName = "none";
      const x = w.getBoundingClientRect();
      m.current = x.height, h.current = x.width, b.current || (w.style.transitionDuration = y.current.transitionDuration, w.style.animationName = y.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ l(
    F.div,
    {
      "data-state": Ua(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !g,
      ...a,
      ref: d,
      style: {
        "--radix-collapsible-content-height": p ? `${p}px` : void 0,
        "--radix-collapsible-content-width": v ? `${v}px` : void 0,
        ...e.style
      },
      children: g && o
    }
  );
});
function Ua(e) {
  return e ? "open" : "closed";
}
var Ml = Pl, hg = Ha, gg = Ya, vg = f.createContext(void 0);
function ut(e) {
  const t = f.useContext(vg);
  return e || t || "ltr";
}
var Ge = "Accordion", bg = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [ja, yg, wg] = $n(Ge), [Hr, SE] = he(Ge, [
  wg,
  Rl
]), Ka = Rl(), _l = O.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ l(ja.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ l(kg, { ...a, ref: t }) : /* @__PURE__ */ l(Sg, { ...o, ref: t }) });
  }
);
_l.displayName = Ge;
var [Dl, xg] = Hr(Ge), [Tl, Cg] = Hr(
  Ge,
  { collapsible: !1 }
), Sg = O.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, c] = we({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Ge
    });
    return /* @__PURE__ */ l(
      Dl,
      {
        scope: e.__scopeAccordion,
        value: O.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: O.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ l(Tl, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ l(Al, { ...s, ref: t }) })
      }
    );
  }
), kg = O.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = we({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Ge
  }), c = O.useCallback(
    (d) => i((m = []) => [...m, d]),
    [i]
  ), u = O.useCallback(
    (d) => i((m = []) => m.filter((p) => p !== d)),
    [i]
  );
  return /* @__PURE__ */ l(
    Dl,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: u,
      children: /* @__PURE__ */ l(Tl, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ l(Al, { ...a, ref: t }) })
    }
  );
}), [Ng, Gr] = Hr(Ge), Al = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = O.useRef(null), c = Q(i, t), u = yg(n), m = ut(o) === "ltr", p = I(e.onKeyDown, (h) => {
      var N;
      if (!bg.includes(h.key)) return;
      const v = h.target, g = u().filter((E) => {
        var A;
        return !((A = E.ref.current) != null && A.disabled);
      }), b = g.findIndex((E) => E.ref.current === v), y = g.length;
      if (b === -1) return;
      h.preventDefault();
      let w = b;
      const x = 0, k = y - 1, C = () => {
        w = b + 1, w > k && (w = x);
      }, R = () => {
        w = b - 1, w < x && (w = k);
      };
      switch (h.key) {
        case "Home":
          w = x;
          break;
        case "End":
          w = k;
          break;
        case "ArrowRight":
          a === "horizontal" && (m ? C() : R());
          break;
        case "ArrowDown":
          a === "vertical" && C();
          break;
        case "ArrowLeft":
          a === "horizontal" && (m ? R() : C());
          break;
        case "ArrowUp":
          a === "vertical" && R();
          break;
      }
      const P = w % y;
      (N = g[P].ref.current) == null || N.focus();
    });
    return /* @__PURE__ */ l(
      Ng,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ l(ja.Slot, { scope: n, children: /* @__PURE__ */ l(
          F.div,
          {
            ...s,
            "data-orientation": a,
            ref: c,
            onKeyDown: r ? void 0 : p
          }
        ) })
      }
    );
  }
), yr = "AccordionItem", [Rg, qa] = Hr(yr), Ol = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Gr(yr, n), s = xg(yr, n), i = Ka(n), c = ge(), u = r && s.value.includes(r) || !1, d = a.disabled || e.disabled;
    return /* @__PURE__ */ l(
      Rg,
      {
        scope: n,
        open: u,
        disabled: d,
        triggerId: c,
        children: /* @__PURE__ */ l(
          Ml,
          {
            "data-orientation": a.orientation,
            "data-state": Wl(u),
            ...i,
            ...o,
            ref: t,
            disabled: d,
            open: u,
            onOpenChange: (m) => {
              m ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
Ol.displayName = yr;
var Il = "AccordionHeader", zl = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Gr(Ge, n), a = qa(Il, n);
    return /* @__PURE__ */ l(
      F.h3,
      {
        "data-orientation": o.orientation,
        "data-state": Wl(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
zl.displayName = Il;
var fa = "AccordionTrigger", Ll = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Gr(Ge, n), a = qa(fa, n), s = Cg(fa, n), i = Ka(n);
    return /* @__PURE__ */ l(ja.ItemSlot, { scope: n, children: /* @__PURE__ */ l(
      hg,
      {
        "aria-disabled": a.open && !s.collapsible || void 0,
        "data-orientation": o.orientation,
        id: a.triggerId,
        ...i,
        ...r,
        ref: t
      }
    ) });
  }
);
Ll.displayName = fa;
var $l = "AccordionContent", Fl = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Gr(Ge, n), a = qa($l, n), s = Ka(n);
    return /* @__PURE__ */ l(
      gg,
      {
        role: "region",
        "aria-labelledby": a.triggerId,
        "data-orientation": o.orientation,
        ...s,
        ...r,
        ref: t,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...e.style
        }
      }
    );
  }
);
Fl.displayName = $l;
function Wl(e) {
  return e ? "open" : "closed";
}
var Pg = _l, Eg = Ol, Mg = zl, _g = Ll, Dg = Fl;
function Ce(e) {
  const t = f.useRef(e);
  return f.useEffect(() => {
    t.current = e;
  }), f.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Tg(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ce(e);
  f.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Ag = "DismissableLayer", ma = "dismissableLayer.update", Og = "dismissableLayer.pointerDownOutside", Ig = "dismissableLayer.focusOutside", qi, Bl = f.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Bt = f.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, u = f.useContext(Bl), [d, m] = f.useState(null), p = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = f.useState({}), v = Q(t, (P) => m(P)), g = Array.from(u.layers), [b] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = g.indexOf(b), w = d ? g.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, k = w >= y, C = $g((P) => {
      const N = P.target, E = [...u.branches].some((A) => A.contains(N));
      !k || E || (o == null || o(P), s == null || s(P), P.defaultPrevented || i == null || i());
    }, p), R = Fg((P) => {
      const N = P.target;
      [...u.branches].some((A) => A.contains(N)) || (a == null || a(P), s == null || s(P), P.defaultPrevented || i == null || i());
    }, p);
    return Tg((P) => {
      w === u.layers.size - 1 && (r == null || r(P), !P.defaultPrevented && i && (P.preventDefault(), i()));
    }, p), f.useEffect(() => {
      if (d)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (qi = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Xi(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = qi);
        };
    }, [d, p, n, u]), f.useEffect(() => () => {
      d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Xi());
    }, [d, u]), f.useEffect(() => {
      const P = () => h({});
      return document.addEventListener(ma, P), () => document.removeEventListener(ma, P);
    }, []), /* @__PURE__ */ l(
      F.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: x ? k ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: I(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: I(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: I(
          e.onPointerDownCapture,
          C.onPointerDownCapture
        )
      }
    );
  }
);
Bt.displayName = Ag;
var zg = "DismissableLayerBranch", Lg = f.forwardRef((e, t) => {
  const n = f.useContext(Bl), r = f.useRef(null), o = Q(t, r);
  return f.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ l(F.div, { ...e, ref: o });
});
Lg.displayName = zg;
function $g(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ce(e), r = f.useRef(!1), o = f.useRef(() => {
  });
  return f.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          Vl(
            Og,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
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
function Fg(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ce(e), r = f.useRef(!1);
  return f.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Vl(Ig, n, { originalEvent: a }, {
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
  const e = new CustomEvent(ma);
  document.dispatchEvent(e);
}
function Vl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Sl(o, a) : o.dispatchEvent(a);
}
var zo = "focusScope.autoFocusOnMount", Lo = "focusScope.autoFocusOnUnmount", Zi = { bubbles: !1, cancelable: !0 }, Wg = "FocusScope", Fn = f.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = f.useState(null), u = Ce(o), d = Ce(a), m = f.useRef(null), p = Q(t, (g) => c(g)), h = f.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  f.useEffect(() => {
    if (r) {
      let g = function(x) {
        if (h.paused || !i) return;
        const k = x.target;
        i.contains(k) ? m.current = k : vt(m.current, { select: !0 });
      }, b = function(x) {
        if (h.paused || !i) return;
        const k = x.relatedTarget;
        k !== null && (i.contains(k) || vt(m.current, { select: !0 }));
      }, y = function(x) {
        if (document.activeElement === document.body)
          for (const C of x)
            C.removedNodes.length > 0 && vt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const w = new MutationObserver(y);
      return i && w.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), w.disconnect();
      };
    }
  }, [r, i, h.paused]), f.useEffect(() => {
    if (i) {
      Ji.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const y = new CustomEvent(zo, Zi);
        i.addEventListener(zo, u), i.dispatchEvent(y), y.defaultPrevented || (Bg(Ug(Hl(i)), { select: !0 }), document.activeElement === g && vt(i));
      }
      return () => {
        i.removeEventListener(zo, u), setTimeout(() => {
          const y = new CustomEvent(Lo, Zi);
          i.addEventListener(Lo, d), i.dispatchEvent(y), y.defaultPrevented || vt(g ?? document.body, { select: !0 }), i.removeEventListener(Lo, d), Ji.remove(h);
        }, 0);
      };
    }
  }, [i, u, d, h]);
  const v = f.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, y = document.activeElement;
      if (b && y) {
        const w = g.currentTarget, [x, k] = Vg(w);
        x && k ? !g.shiftKey && y === k ? (g.preventDefault(), n && vt(x, { select: !0 })) : g.shiftKey && y === x && (g.preventDefault(), n && vt(k, { select: !0 })) : y === w && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ l(F.div, { tabIndex: -1, ...s, ref: p, onKeyDown: v });
});
Fn.displayName = Wg;
function Bg(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (vt(r, { select: t }), document.activeElement !== n) return;
}
function Vg(e) {
  const t = Hl(e), n = Qi(t, e), r = Qi(t.reverse(), e);
  return [n, r];
}
function Hl(e) {
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
    if (!Hg(n, { upTo: t })) return n;
}
function Hg(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Gg(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function vt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Gg(e) && t && e.select();
  }
}
var Ji = Yg();
function Yg() {
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
function Ug(e) {
  return e.filter((t) => t.tagName !== "A");
}
var jg = "Portal", Vt = f.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = f.useState(!1);
  ye(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? _p.createPortal(/* @__PURE__ */ l(F.div, { ...r, ref: t }), s) : null;
});
Vt.displayName = jg;
var $o = 0;
function Yr() {
  f.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? ts()), document.body.insertAdjacentElement("beforeend", e[1] ?? ts()), $o++, () => {
      $o === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), $o--;
    };
  }, []);
}
function ts() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ke = function() {
  return Ke = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ke.apply(this, arguments);
};
function Gl(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Kg(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var gr = "right-scroll-bar-position", vr = "width-before-scroll-bar", qg = "with-scroll-bars-hidden", Xg = "--removed-body-scroll-bar-size";
function Fo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Zg(e, t) {
  var n = It(function() {
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
var Qg = typeof window < "u" ? f.useLayoutEffect : f.useEffect, ns = /* @__PURE__ */ new WeakMap();
function Jg(e, t) {
  var n = Zg(null, function(r) {
    return e.forEach(function(o) {
      return Fo(o, r);
    });
  });
  return Qg(function() {
    var r = ns.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Fo(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Fo(i, s);
      });
    }
    ns.set(n, e);
  }, [e]), n;
}
function ev(e) {
  return e;
}
function tv(e, t) {
  t === void 0 && (t = ev);
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
      var c = function() {
        var d = s;
        s = [], d.forEach(a);
      }, u = function() {
        return Promise.resolve().then(c);
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
function nv(e) {
  e === void 0 && (e = {});
  var t = tv(null);
  return t.options = Ke({ async: !0, ssr: !1 }, e), t;
}
var Yl = function(e) {
  var t = e.sideCar, n = Gl(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return f.createElement(r, Ke({}, n));
};
Yl.isSideCarExport = !0;
function rv(e, t) {
  return e.useMedium(t), Yl;
}
var Ul = nv(), Wo = function() {
}, Ur = f.forwardRef(function(e, t) {
  var n = f.useRef(null), r = f.useState({
    onScrollCapture: Wo,
    onWheelCapture: Wo,
    onTouchMoveCapture: Wo
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, u = e.removeScrollBar, d = e.enabled, m = e.shards, p = e.sideCar, h = e.noRelative, v = e.noIsolation, g = e.inert, b = e.allowPinchZoom, y = e.as, w = y === void 0 ? "div" : y, x = e.gapMode, k = Gl(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), C = p, R = Jg([n, t]), P = Ke(Ke({}, k), o);
  return f.createElement(
    f.Fragment,
    null,
    d && f.createElement(C, { sideCar: Ul, removeScrollBar: u, shards: m, noRelative: h, noIsolation: v, inert: g, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: x }),
    s ? f.cloneElement(f.Children.only(i), Ke(Ke({}, P), { ref: R })) : f.createElement(w, Ke({}, P, { className: c, ref: R }), i)
  );
});
Ur.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Ur.classNames = {
  fullWidth: vr,
  zeroRight: gr
};
var ov = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function av() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ov();
  return t && e.setAttribute("nonce", t), e;
}
function iv(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function sv(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var lv = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = av()) && (iv(t, n), sv(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, cv = function() {
  var e = lv();
  return function(t, n) {
    f.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, jl = function() {
  var e = cv(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, dv = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Bo = function(e) {
  return parseInt(e || "", 10) || 0;
}, uv = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Bo(n), Bo(r), Bo(o)];
}, fv = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return dv;
  var t = uv(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, mv = jl(), tn = "data-scroll-locked", pv = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(qg, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(tn, `] {
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
  
  .`).concat(gr, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(vr, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(gr, " .").concat(gr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(vr, " .").concat(vr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(tn, `] {
    `).concat(Xg, ": ").concat(i, `px;
  }
`);
}, rs = function() {
  var e = parseInt(document.body.getAttribute(tn) || "0", 10);
  return isFinite(e) ? e : 0;
}, hv = function() {
  f.useEffect(function() {
    return document.body.setAttribute(tn, (rs() + 1).toString()), function() {
      var e = rs() - 1;
      e <= 0 ? document.body.removeAttribute(tn) : document.body.setAttribute(tn, e.toString());
    };
  }, []);
}, gv = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  hv();
  var a = f.useMemo(function() {
    return fv(o);
  }, [o]);
  return f.createElement(mv, { styles: pv(a, !t, o, n ? "" : "!important") });
}, pa = !1;
if (typeof window < "u")
  try {
    var sr = Object.defineProperty({}, "passive", {
      get: function() {
        return pa = !0, !0;
      }
    });
    window.addEventListener("test", sr, sr), window.removeEventListener("test", sr, sr);
  } catch {
    pa = !1;
  }
var Kt = pa ? { passive: !1 } : !1, vv = function(e) {
  return e.tagName === "TEXTAREA";
}, Kl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !vv(e) && n[t] === "visible")
  );
}, bv = function(e) {
  return Kl(e, "overflowY");
}, yv = function(e) {
  return Kl(e, "overflowX");
}, os = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = ql(e, r);
    if (o) {
      var a = Xl(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, wv = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, xv = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, ql = function(e, t) {
  return e === "v" ? bv(t) : yv(t);
}, Xl = function(e, t) {
  return e === "v" ? wv(t) : xv(t);
}, Cv = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Sv = function(e, t, n, r, o) {
  var a = Cv(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), u = !1, d = s > 0, m = 0, p = 0;
  do {
    if (!i)
      break;
    var h = Xl(e, i), v = h[0], g = h[1], b = h[2], y = g - b - a * v;
    (v || y) && ql(e, i) && (m += y, p += v);
    var w = i.parentNode;
    i = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (d && Math.abs(m) < 1 || !d && Math.abs(p) < 1) && (u = !0), u;
}, lr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, as = function(e) {
  return [e.deltaX, e.deltaY];
}, is = function(e) {
  return e && "current" in e ? e.current : e;
}, kv = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Nv = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Rv = 0, qt = [];
function Pv(e) {
  var t = f.useRef([]), n = f.useRef([0, 0]), r = f.useRef(), o = f.useState(Rv++)[0], a = f.useState(jl)[0], s = f.useRef(e);
  f.useEffect(function() {
    s.current = e;
  }, [e]), f.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Kg([e.lockRef.current], (e.shards || []).map(is), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = f.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var y = lr(g), w = n.current, x = "deltaX" in g ? g.deltaX : w[0] - y[0], k = "deltaY" in g ? g.deltaY : w[1] - y[1], C, R = g.target, P = Math.abs(x) > Math.abs(k) ? "h" : "v";
    if ("touches" in g && P === "h" && R.type === "range")
      return !1;
    var N = os(P, R);
    if (!N)
      return !0;
    if (N ? C = P : (C = P === "v" ? "h" : "v", N = os(P, R)), !N)
      return !1;
    if (!r.current && "changedTouches" in g && (x || k) && (r.current = C), !C)
      return !0;
    var E = r.current || C;
    return Sv(E, b, g, E === "h" ? x : k);
  }, []), c = f.useCallback(function(g) {
    var b = g;
    if (!(!qt.length || qt[qt.length - 1] !== a)) {
      var y = "deltaY" in b ? as(b) : lr(b), w = t.current.filter(function(C) {
        return C.name === b.type && (C.target === b.target || b.target === C.shadowParent) && kv(C.delta, y);
      })[0];
      if (w && w.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!w) {
        var x = (s.current.shards || []).map(is).filter(Boolean).filter(function(C) {
          return C.contains(b.target);
        }), k = x.length > 0 ? i(b, x[0]) : !s.current.noIsolation;
        k && b.cancelable && b.preventDefault();
      }
    }
  }, []), u = f.useCallback(function(g, b, y, w) {
    var x = { name: g, delta: b, target: y, should: w, shadowParent: Ev(y) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(k) {
        return k !== x;
      });
    }, 1);
  }, []), d = f.useCallback(function(g) {
    n.current = lr(g), r.current = void 0;
  }, []), m = f.useCallback(function(g) {
    u(g.type, as(g), g.target, i(g, e.lockRef.current));
  }, []), p = f.useCallback(function(g) {
    u(g.type, lr(g), g.target, i(g, e.lockRef.current));
  }, []);
  f.useEffect(function() {
    return qt.push(a), e.setCallbacks({
      onScrollCapture: m,
      onWheelCapture: m,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", c, Kt), document.addEventListener("touchmove", c, Kt), document.addEventListener("touchstart", d, Kt), function() {
      qt = qt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", c, Kt), document.removeEventListener("touchmove", c, Kt), document.removeEventListener("touchstart", d, Kt);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return f.createElement(
    f.Fragment,
    null,
    v ? f.createElement(a, { styles: Nv(o) }) : null,
    h ? f.createElement(gv, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Ev(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Mv = rv(Ul, Pv);
var Wn = f.forwardRef(function(e, t) {
  return f.createElement(Ur, Ke({}, e, { ref: t, sideCar: Mv }));
});
Wn.classNames = Ur.classNames;
var _v = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Xt = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), dr = {}, Vo = 0, Zl = function(e) {
  return e && (e.host || Zl(e.parentNode));
}, Dv = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Zl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Tv = function(e, t, n, r) {
  var o = Dv(t, Array.isArray(e) ? e : [e]);
  dr[n] || (dr[n] = /* @__PURE__ */ new WeakMap());
  var a = dr[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), u = function(m) {
    !m || i.has(m) || (i.add(m), u(m.parentNode));
  };
  o.forEach(u);
  var d = function(m) {
    !m || c.has(m) || Array.prototype.forEach.call(m.children, function(p) {
      if (i.has(p))
        d(p);
      else
        try {
          var h = p.getAttribute(r), v = h !== null && h !== "false", g = (Xt.get(p) || 0) + 1, b = (a.get(p) || 0) + 1;
          Xt.set(p, g), a.set(p, b), s.push(p), g === 1 && v && cr.set(p, !0), b === 1 && p.setAttribute(n, "true"), v || p.setAttribute(r, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", p, y);
        }
    });
  };
  return d(t), i.clear(), Vo++, function() {
    s.forEach(function(m) {
      var p = Xt.get(m) - 1, h = a.get(m) - 1;
      Xt.set(m, p), a.set(m, h), p || (cr.has(m) || m.removeAttribute(r), cr.delete(m)), h || m.removeAttribute(n);
    }), Vo--, Vo || (Xt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), dr = {});
  };
}, jr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = _v(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), Tv(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Kr = "Dialog", [Ql, Jl] = he(Kr), [Av, Ye] = Ql(Kr), ec = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = f.useRef(null), c = f.useRef(null), [u, d] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Kr
  });
  return /* @__PURE__ */ l(
    Av,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: ge(),
      titleId: ge(),
      descriptionId: ge(),
      open: u,
      onOpenChange: d,
      onOpenToggle: f.useCallback(() => d((m) => !m), [d]),
      modal: s,
      children: n
    }
  );
};
ec.displayName = Kr;
var tc = "DialogTrigger", nc = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ye(tc, n), a = Q(t, o.triggerRef);
    return /* @__PURE__ */ l(
      F.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Qa(o.open),
        ...r,
        ref: a,
        onClick: I(e.onClick, o.onOpenToggle)
      }
    );
  }
);
nc.displayName = tc;
var Xa = "DialogPortal", [Ov, rc] = Ql(Xa, {
  forceMount: void 0
}), oc = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Ye(Xa, t);
  return /* @__PURE__ */ l(Ov, { scope: t, forceMount: n, children: f.Children.map(r, (s) => /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Vt, { asChild: !0, container: o, children: s }) })) });
};
oc.displayName = Xa;
var wr = "DialogOverlay", ac = f.forwardRef(
  (e, t) => {
    const n = rc(wr, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ye(wr, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(zv, { ...o, ref: t }) }) : null;
  }
);
ac.displayName = wr;
var Iv = /* @__PURE__ */ yt("DialogOverlay.RemoveScroll"), zv = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ye(wr, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ l(Wn, { as: Iv, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ l(
        F.div,
        {
          "data-state": Qa(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), zt = "DialogContent", ic = f.forwardRef(
  (e, t) => {
    const n = rc(zt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ye(zt, e.__scopeDialog);
    return /* @__PURE__ */ l(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ l(Lv, { ...o, ref: t }) : /* @__PURE__ */ l($v, { ...o, ref: t }) });
  }
);
ic.displayName = zt;
var Lv = f.forwardRef(
  (e, t) => {
    const n = Ye(zt, e.__scopeDialog), r = f.useRef(null), o = Q(t, n.contentRef, r);
    return f.useEffect(() => {
      const a = r.current;
      if (a) return jr(a);
    }, []), /* @__PURE__ */ l(
      sc,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: I(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: I(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), $v = f.forwardRef(
  (e, t) => {
    const n = Ye(zt, e.__scopeDialog), r = f.useRef(!1), o = f.useRef(!1);
    return /* @__PURE__ */ l(
      sc,
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
          var c, u;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), sc = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Ye(zt, n), c = f.useRef(null), u = Q(t, c);
    return Yr(), /* @__PURE__ */ D(ke, { children: [
      /* @__PURE__ */ l(
        Fn,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ l(
            Bt,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Qa(i.open),
              ...s,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ D(ke, { children: [
        /* @__PURE__ */ l(Wv, { titleId: i.titleId }),
        /* @__PURE__ */ l(Vv, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Za = "DialogTitle", lc = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ye(Za, n);
    return /* @__PURE__ */ l(F.h2, { id: o.titleId, ...r, ref: t });
  }
);
lc.displayName = Za;
var cc = "DialogDescription", dc = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ye(cc, n);
    return /* @__PURE__ */ l(F.p, { id: o.descriptionId, ...r, ref: t });
  }
);
dc.displayName = cc;
var uc = "DialogClose", fc = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ye(uc, n);
    return /* @__PURE__ */ l(
      F.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: I(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
fc.displayName = uc;
function Qa(e) {
  return e ? "open" : "closed";
}
var mc = "DialogTitleWarning", [Fv, pc] = ng(mc, {
  contentName: zt,
  titleName: Za,
  docsSlug: "dialog"
}), Wv = ({ titleId: e }) => {
  const t = pc(mc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return f.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, Bv = "DialogDescriptionWarning", Vv = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${pc(Bv).contentName}}.`;
  return f.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, qr = ec, Ja = nc, Xr = oc, Zr = ac, Qr = ic, ei = lc, ti = dc, Ht = fc, hc = "AlertDialog", [Hv, kE] = he(hc, [
  Jl
]), ft = Jl(), gc = (e) => {
  const { __scopeAlertDialog: t, ...n } = e, r = ft(t);
  return /* @__PURE__ */ l(qr, { ...r, ...n, modal: !0 });
};
gc.displayName = hc;
var Gv = "AlertDialogTrigger", vc = f.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Ja, { ...o, ...r, ref: t });
  }
);
vc.displayName = Gv;
var Yv = "AlertDialogPortal", bc = (e) => {
  const { __scopeAlertDialog: t, ...n } = e, r = ft(t);
  return /* @__PURE__ */ l(Xr, { ...r, ...n });
};
bc.displayName = Yv;
var Uv = "AlertDialogOverlay", yc = f.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Zr, { ...o, ...r, ref: t });
  }
);
yc.displayName = Uv;
var nn = "AlertDialogContent", [jv, Kv] = Hv(nn), qv = /* @__PURE__ */ Cl("AlertDialogContent"), wc = f.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, children: r, ...o } = e, a = ft(n), s = f.useRef(null), i = Q(t, s), c = f.useRef(null);
    return /* @__PURE__ */ l(
      Fv,
      {
        contentName: nn,
        titleName: xc,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ l(jv, { scope: n, cancelRef: c, children: /* @__PURE__ */ D(
          Qr,
          {
            role: "alertdialog",
            ...a,
            ...o,
            ref: i,
            onOpenAutoFocus: I(o.onOpenAutoFocus, (u) => {
              var d;
              u.preventDefault(), (d = c.current) == null || d.focus({ preventScroll: !0 });
            }),
            onPointerDownOutside: (u) => u.preventDefault(),
            onInteractOutside: (u) => u.preventDefault(),
            children: [
              /* @__PURE__ */ l(qv, { children: r }),
              /* @__PURE__ */ l(Zv, { contentRef: s })
            ]
          }
        ) })
      }
    );
  }
);
wc.displayName = nn;
var xc = "AlertDialogTitle", Cc = f.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(ei, { ...o, ...r, ref: t });
  }
);
Cc.displayName = xc;
var Sc = "AlertDialogDescription", kc = f.forwardRef((e, t) => {
  const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
  return /* @__PURE__ */ l(ti, { ...o, ...r, ref: t });
});
kc.displayName = Sc;
var Xv = "AlertDialogAction", Nc = f.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Ht, { ...o, ...r, ref: t });
  }
);
Nc.displayName = Xv;
var Rc = "AlertDialogCancel", Pc = f.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, { cancelRef: o } = Kv(Rc, n), a = ft(n), s = Q(t, o);
    return /* @__PURE__ */ l(Ht, { ...a, ...r, ref: s });
  }
);
Pc.displayName = Rc;
var Zv = ({ contentRef: e }) => {
  const t = `\`${nn}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${nn}\` by passing a \`${Sc}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${nn}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  return f.useEffect(() => {
    var r;
    document.getElementById(
      (r = e.current) == null ? void 0 : r.getAttribute("aria-describedby")
    ) || console.warn(t);
  }, [t, e]), null;
}, Qv = gc, Jv = vc, eb = bc, tb = yc, nb = wc, rb = Nc, ob = Pc, ab = Cc, ib = kc, sb = "AspectRatio", Ec = f.forwardRef(
  (e, t) => {
    const { ratio: n = 1 / 1, style: r, ...o } = e;
    return /* @__PURE__ */ l(
      "div",
      {
        style: {
          // ensures inner element is contained
          position: "relative",
          // ensures padding bottom trick maths works
          width: "100%",
          paddingBottom: `${100 / n}%`
        },
        "data-radix-aspect-ratio-wrapper": "",
        children: /* @__PURE__ */ l(
          F.div,
          {
            ...o,
            ref: t,
            style: {
              ...r,
              // ensures children expand in ratio
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        )
      }
    );
  }
);
Ec.displayName = sb;
var lb = Ec, ur = { exports: {} }, Ho = {};
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
function cb() {
  if (ss) return Ho;
  ss = 1;
  var e = O;
  function t(m, p) {
    return m === p && (m !== 0 || 1 / m === 1 / p) || m !== m && p !== p;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, o = e.useEffect, a = e.useLayoutEffect, s = e.useDebugValue;
  function i(m, p) {
    var h = p(), v = r({ inst: { value: h, getSnapshot: p } }), g = v[0].inst, b = v[1];
    return a(
      function() {
        g.value = h, g.getSnapshot = p, c(g) && b({ inst: g });
      },
      [m, h, p]
    ), o(
      function() {
        return c(g) && b({ inst: g }), m(function() {
          c(g) && b({ inst: g });
        });
      },
      [m]
    ), s(h), h;
  }
  function c(m) {
    var p = m.getSnapshot;
    m = m.value;
    try {
      var h = p();
      return !n(m, h);
    } catch {
      return !0;
    }
  }
  function u(m, p) {
    return p();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : i;
  return Ho.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d, Ho;
}
var Go = {};
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
function db() {
  return ls || (ls = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(h, v) {
      return h === v && (h !== 0 || 1 / h === 1 / v) || h !== h && v !== v;
    }
    function t(h, v) {
      d || o.startTransition === void 0 || (d = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var g = v();
      if (!m) {
        var b = v();
        a(g, b) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), m = !0);
      }
      b = s({
        inst: { value: g, getSnapshot: v }
      });
      var y = b[0].inst, w = b[1];
      return c(
        function() {
          y.value = g, y.getSnapshot = v, n(y) && w({ inst: y });
        },
        [h, g, v]
      ), i(
        function() {
          return n(y) && w({ inst: y }), h(function() {
            n(y) && w({ inst: y });
          });
        },
        [h]
      ), u(g), g;
    }
    function n(h) {
      var v = h.getSnapshot;
      h = h.value;
      try {
        var g = v();
        return !a(h, g);
      } catch {
        return !0;
      }
    }
    function r(h, v) {
      return v();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var o = O, a = typeof Object.is == "function" ? Object.is : e, s = o.useState, i = o.useEffect, c = o.useLayoutEffect, u = o.useDebugValue, d = !1, m = !1, p = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    Go.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Go;
}
var cs;
function ub() {
  return cs || (cs = 1, process.env.NODE_ENV === "production" ? ur.exports = cb() : ur.exports = db()), ur.exports;
}
var fb = ub();
function mb() {
  return fb.useSyncExternalStore(
    pb,
    () => !0,
    () => !1
  );
}
function pb() {
  return () => {
  };
}
var ni = "Avatar", [hb, NE] = he(ni), [gb, Mc] = hb(ni), _c = f.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...r } = e, [o, a] = f.useState("idle");
    return /* @__PURE__ */ l(
      gb,
      {
        scope: n,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ l(F.span, { ...r, ref: t })
      }
    );
  }
);
_c.displayName = ni;
var Dc = "AvatarImage", Tc = f.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {
    }, ...a } = e, s = Mc(Dc, n), i = vb(r, a), c = Ce((u) => {
      o(u), s.onImageLoadingStatusChange(u);
    });
    return ye(() => {
      i !== "idle" && c(i);
    }, [i, c]), i === "loaded" ? /* @__PURE__ */ l(F.img, { ...a, ref: t, src: r }) : null;
  }
);
Tc.displayName = Dc;
var Ac = "AvatarFallback", Oc = f.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e, a = Mc(Ac, n), [s, i] = f.useState(r === void 0);
    return f.useEffect(() => {
      if (r !== void 0) {
        const c = window.setTimeout(() => i(!0), r);
        return () => window.clearTimeout(c);
      }
    }, [r]), s && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ l(F.span, { ...o, ref: t }) : null;
  }
);
Oc.displayName = Ac;
function ds(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function vb(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = mb(), o = f.useRef(null), a = r ? (o.current || (o.current = new window.Image()), o.current) : null, [s, i] = f.useState(
    () => ds(a, e)
  );
  return ye(() => {
    i(ds(a, e));
  }, [a, e]), ye(() => {
    const c = (m) => () => {
      i(m);
    };
    if (!a) return;
    const u = c("loaded"), d = c("error");
    return a.addEventListener("load", u), a.addEventListener("error", d), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
      a.removeEventListener("load", u), a.removeEventListener("error", d);
    };
  }, [a, n, t]), s;
}
var bb = _c, yb = Tc, wb = Oc;
function Bn(e) {
  const t = f.useRef({ value: e, previous: e });
  return f.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function Vn(e) {
  const [t, n] = f.useState(void 0);
  return ye(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const c = a.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
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
var Jr = "Checkbox", [xb, RE] = he(Jr), [Cb, ri] = xb(Jr);
function Sb(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: c,
    required: u,
    value: d = "on",
    // @ts-expect-error
    internal_do_not_use_render: m
  } = e, [p, h] = we({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: Jr
  }), [v, g] = f.useState(null), [b, y] = f.useState(null), w = f.useRef(!1), x = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), k = {
    checked: p,
    disabled: a,
    setChecked: h,
    control: v,
    setControl: g,
    name: i,
    form: s,
    value: d,
    hasConsumerStoppedPropagationRef: w,
    required: u,
    defaultChecked: bt(o) ? !1 : o,
    isFormControl: x,
    bubbleInput: b,
    setBubbleInput: y
  };
  return /* @__PURE__ */ l(
    Cb,
    {
      scope: t,
      ...k,
      children: kb(m) ? m(k) : r
    }
  );
}
var Ic = "CheckboxTrigger", zc = f.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: u,
      setControl: d,
      setChecked: m,
      hasConsumerStoppedPropagationRef: p,
      isFormControl: h,
      bubbleInput: v
    } = ri(Ic, e), g = Q(o, d), b = f.useRef(c);
    return f.useEffect(() => {
      const y = a == null ? void 0 : a.form;
      if (y) {
        const w = () => m(b.current);
        return y.addEventListener("reset", w), () => y.removeEventListener("reset", w);
      }
    }, [a, m]), /* @__PURE__ */ l(
      F.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": bt(c) ? "mixed" : c,
        "aria-required": u,
        "data-state": Vc(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: I(t, (y) => {
          y.key === "Enter" && y.preventDefault();
        }),
        onClick: I(n, (y) => {
          m((w) => bt(w) ? !0 : !w), v && h && (p.current = y.isPropagationStopped(), p.current || y.stopPropagation());
        })
      }
    );
  }
);
zc.displayName = Ic;
var Lc = f.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c,
      onCheckedChange: u,
      form: d,
      ...m
    } = e;
    return /* @__PURE__ */ l(
      Sb,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: u,
        name: r,
        form: d,
        value: c,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ D(ke, { children: [
          /* @__PURE__ */ l(
            zc,
            {
              ...m,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          p && /* @__PURE__ */ l(
            Bc,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Lc.displayName = Jr;
var $c = "CheckboxIndicator", Fc = f.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = ri($c, n);
    return /* @__PURE__ */ l(
      ve,
      {
        present: r || bt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ l(
          F.span,
          {
            "data-state": Vc(a.checked),
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
Fc.displayName = $c;
var Wc = "CheckboxBubbleInput", Bc = f.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: c,
      name: u,
      value: d,
      form: m,
      bubbleInput: p,
      setBubbleInput: h
    } = ri(Wc, e), v = Q(n, h), g = Bn(a), b = Vn(r);
    f.useEffect(() => {
      const w = p;
      if (!w) return;
      const x = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(
        x,
        "checked"
      ).set, R = !o.current;
      if (g !== a && C) {
        const P = new Event("click", { bubbles: R });
        w.indeterminate = bt(a), C.call(w, bt(a) ? !1 : a), w.dispatchEvent(P);
      }
    }, [p, g, a, o]);
    const y = f.useRef(bt(a) ? !1 : a);
    return /* @__PURE__ */ l(
      F.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? y.current,
        required: i,
        disabled: c,
        name: u,
        value: d,
        form: m,
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
Bc.displayName = Wc;
function kb(e) {
  return typeof e == "function";
}
function bt(e) {
  return e === "indeterminate";
}
function Vc(e) {
  return bt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Nb = ["top", "right", "bottom", "left"], wt = Math.min, Ae = Math.max, xr = Math.round, fr = Math.floor, Ze = (e) => ({
  x: e,
  y: e
}), Rb = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Pb = {
  start: "end",
  end: "start"
};
function ha(e, t, n) {
  return Ae(e, wt(t, n));
}
function ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function dt(e) {
  return e.split("-")[0];
}
function fn(e) {
  return e.split("-")[1];
}
function oi(e) {
  return e === "x" ? "y" : "x";
}
function ai(e) {
  return e === "y" ? "height" : "width";
}
const Eb = /* @__PURE__ */ new Set(["top", "bottom"]);
function qe(e) {
  return Eb.has(dt(e)) ? "y" : "x";
}
function ii(e) {
  return oi(qe(e));
}
function Mb(e, t, n) {
  n === void 0 && (n = !1);
  const r = fn(e), o = ii(e), a = ai(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = Cr(s)), [s, Cr(s)];
}
function _b(e) {
  const t = Cr(e);
  return [ga(e), t, ga(t)];
}
function ga(e) {
  return e.replace(/start|end/g, (t) => Pb[t]);
}
const us = ["left", "right"], fs = ["right", "left"], Db = ["top", "bottom"], Tb = ["bottom", "top"];
function Ab(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? fs : us : t ? us : fs;
    case "left":
    case "right":
      return t ? Db : Tb;
    default:
      return [];
  }
}
function Ob(e, t, n, r) {
  const o = fn(e);
  let a = Ab(dt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(ga)))), a;
}
function Cr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rb[t]);
}
function Ib(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Hc(e) {
  return typeof e != "number" ? Ib(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Sr(e) {
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
  const a = qe(t), s = ii(t), i = ai(s), c = dt(t), u = a === "y", d = r.x + r.width / 2 - o.width / 2, m = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: d,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: m
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: m
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (fn(t)) {
    case "start":
      h[s] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[s] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const zb = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: m
  } = ms(u, r, c), p = r, h = {}, v = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: y
    } = i[g], {
      x: w,
      y: x,
      data: k,
      reset: C
    } = await y({
      x: d,
      y: m,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: h,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = w ?? d, m = x ?? m, h = {
      ...h,
      [b]: {
        ...h[b],
        ...k
      }
    }, C && v <= 50 && (v++, typeof C == "object" && (C.placement && (p = C.placement), C.rects && (u = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: d,
      y: m
    } = ms(u, p, c)), g = -1);
  }
  return {
    x: d,
    y: m,
    placement: p,
    strategy: o,
    middlewareData: h
  };
};
async function En(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: s,
    elements: i,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: m = "floating",
    altBoundary: p = !1,
    padding: h = 0
  } = ct(t, e), v = Hc(h), b = i[p ? m === "floating" ? "reference" : "floating" : m], y = Sr(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: c
  })), w = m === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), k = await (a.isElement == null ? void 0 : a.isElement(x)) ? await (a.getScale == null ? void 0 : a.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = Sr(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: w,
    offsetParent: x,
    strategy: c
  }) : w);
  return {
    top: (y.top - C.top + v.top) / k.y,
    bottom: (C.bottom - y.bottom + v.bottom) / k.y,
    left: (y.left - C.left + v.left) / k.x,
    right: (C.right - y.right + v.right) / k.x
  };
}
const Lb = (e) => ({
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
      middlewareData: c
    } = t, {
      element: u,
      padding: d = 0
    } = ct(e, t) || {};
    if (u == null)
      return {};
    const m = Hc(d), p = {
      x: n,
      y: r
    }, h = ii(o), v = ai(h), g = await s.getDimensions(u), b = h === "y", y = b ? "top" : "left", w = b ? "bottom" : "right", x = b ? "clientHeight" : "clientWidth", k = a.reference[v] + a.reference[h] - p[h] - a.floating[v], C = p[h] - a.reference[h], R = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let P = R ? R[x] : 0;
    (!P || !await (s.isElement == null ? void 0 : s.isElement(R))) && (P = i.floating[x] || a.floating[v]);
    const N = k / 2 - C / 2, E = P / 2 - g[v] / 2 - 1, A = wt(m[y], E), z = wt(m[w], E), $ = A, Y = P - g[v] - z, G = P / 2 - g[v] / 2 + N, K = ha($, G, Y), H = !c.arrow && fn(o) != null && G !== K && a.reference[v] / 2 - (G < $ ? A : z) - g[v] / 2 < 0, q = H ? G < $ ? G - $ : G - Y : 0;
    return {
      [h]: p[h] + q,
      data: {
        [h]: K,
        centerOffset: G - K - q,
        ...H && {
          alignmentOffset: q
        }
      },
      reset: H
    };
  }
}), $b = function(e) {
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
        platform: c,
        elements: u
      } = t, {
        mainAxis: d = !0,
        crossAxis: m = !0,
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...b
      } = ct(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const y = dt(o), w = qe(i), x = dt(i) === i, k = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), C = p || (x || !g ? [Cr(i)] : _b(i)), R = v !== "none";
      !p && R && C.push(...Ob(i, g, v, k));
      const P = [i, ...C], N = await En(t, b), E = [];
      let A = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (d && E.push(N[y]), m) {
        const G = Mb(o, s, k);
        E.push(N[G[0]], N[G[1]]);
      }
      if (A = [...A, {
        placement: o,
        overflows: E
      }], !E.every((G) => G <= 0)) {
        var z, $;
        const G = (((z = a.flip) == null ? void 0 : z.index) || 0) + 1, K = P[G];
        if (K && (!(m === "alignment" ? w !== qe(K) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        A.every((M) => qe(M.placement) === w ? M.overflows[0] > 0 : !0)))
          return {
            data: {
              index: G,
              overflows: A
            },
            reset: {
              placement: K
            }
          };
        let H = ($ = A.filter((q) => q.overflows[0] <= 0).sort((q, M) => q.overflows[1] - M.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!H)
          switch (h) {
            case "bestFit": {
              var Y;
              const q = (Y = A.filter((M) => {
                if (R) {
                  const T = qe(M.placement);
                  return T === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  T === "y";
                }
                return !0;
              }).map((M) => [M.placement, M.overflows.filter((T) => T > 0).reduce((T, Z) => T + Z, 0)]).sort((M, T) => M[1] - T[1])[0]) == null ? void 0 : Y[0];
              q && (H = q);
              break;
            }
            case "initialPlacement":
              H = i;
              break;
          }
        if (o !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
};
function ps(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function hs(e) {
  return Nb.some((t) => e[t] >= 0);
}
const Fb = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ct(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await En(t, {
            ...o,
            elementContext: "reference"
          }), s = ps(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: hs(s)
            }
          };
        }
        case "escaped": {
          const a = await En(t, {
            ...o,
            altBoundary: !0
          }), s = ps(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: hs(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Gc = /* @__PURE__ */ new Set(["left", "top"]);
async function Wb(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = dt(n), i = fn(n), c = qe(n) === "y", u = Gc.has(s) ? -1 : 1, d = a && c ? -1 : 1, m = ct(t, e);
  let {
    mainAxis: p,
    crossAxis: h,
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
  return i && typeof v == "number" && (h = i === "end" ? v * -1 : v), c ? {
    x: h * d,
    y: p * u
  } : {
    x: p * u,
    y: h * d
  };
}
const Bb = function(e) {
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
      } = t, c = await Wb(t, e);
      return s === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, Vb = function(e) {
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
              x: y,
              y: w
            } = b;
            return {
              x: y,
              y: w
            };
          }
        },
        ...c
      } = ct(e, t), u = {
        x: n,
        y: r
      }, d = await En(t, c), m = qe(dt(o)), p = oi(m);
      let h = u[p], v = u[m];
      if (a) {
        const b = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", w = h + d[b], x = h - d[y];
        h = ha(w, h, x);
      }
      if (s) {
        const b = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", w = v + d[b], x = v - d[y];
        v = ha(w, v, x);
      }
      const g = i.fn({
        ...t,
        [p]: h,
        [m]: v
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [p]: a,
            [m]: s
          }
        }
      };
    }
  };
}, Hb = function(e) {
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
        mainAxis: c = !0,
        crossAxis: u = !0
      } = ct(e, t), d = {
        x: n,
        y: r
      }, m = qe(o), p = oi(m);
      let h = d[p], v = d[m];
      const g = ct(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const x = p === "y" ? "height" : "width", k = a.reference[p] - a.floating[x] + b.mainAxis, C = a.reference[p] + a.reference[x] - b.mainAxis;
        h < k ? h = k : h > C && (h = C);
      }
      if (u) {
        var y, w;
        const x = p === "y" ? "width" : "height", k = Gc.has(dt(o)), C = a.reference[m] - a.floating[x] + (k && ((y = s.offset) == null ? void 0 : y[m]) || 0) + (k ? 0 : b.crossAxis), R = a.reference[m] + a.reference[x] + (k ? 0 : ((w = s.offset) == null ? void 0 : w[m]) || 0) - (k ? b.crossAxis : 0);
        v < C ? v = C : v > R && (v = R);
      }
      return {
        [p]: h,
        [m]: v
      };
    }
  };
}, Gb = function(e) {
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
        apply: c = () => {
        },
        ...u
      } = ct(e, t), d = await En(t, u), m = dt(o), p = fn(o), h = qe(o) === "y", {
        width: v,
        height: g
      } = a.floating;
      let b, y;
      m === "top" || m === "bottom" ? (b = m, y = p === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (y = m, b = p === "end" ? "top" : "bottom");
      const w = g - d.top - d.bottom, x = v - d.left - d.right, k = wt(g - d[b], w), C = wt(v - d[y], x), R = !t.middlewareData.shift;
      let P = k, N = C;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (N = x), (r = t.middlewareData.shift) != null && r.enabled.y && (P = w), R && !p) {
        const A = Ae(d.left, 0), z = Ae(d.right, 0), $ = Ae(d.top, 0), Y = Ae(d.bottom, 0);
        h ? N = v - 2 * (A !== 0 || z !== 0 ? A + z : Ae(d.left, d.right)) : P = g - 2 * ($ !== 0 || Y !== 0 ? $ + Y : Ae(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: N,
        availableHeight: P
      });
      const E = await s.getDimensions(i.floating);
      return v !== E.width || g !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function eo() {
  return typeof window < "u";
}
function mn(e) {
  return Yc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ie(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Je(e) {
  var t;
  return (t = (Yc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Yc(e) {
  return eo() ? e instanceof Node || e instanceof Ie(e).Node : !1;
}
function Ve(e) {
  return eo() ? e instanceof Element || e instanceof Ie(e).Element : !1;
}
function Qe(e) {
  return eo() ? e instanceof HTMLElement || e instanceof Ie(e).HTMLElement : !1;
}
function gs(e) {
  return !eo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ie(e).ShadowRoot;
}
const Yb = /* @__PURE__ */ new Set(["inline", "contents"]);
function Hn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = He(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Yb.has(o);
}
const Ub = /* @__PURE__ */ new Set(["table", "td", "th"]);
function jb(e) {
  return Ub.has(mn(e));
}
const Kb = [":popover-open", ":modal"];
function to(e) {
  return Kb.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const qb = ["transform", "translate", "scale", "rotate", "perspective"], Xb = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Zb = ["paint", "layout", "strict", "content"];
function si(e) {
  const t = li(), n = Ve(e) ? He(e) : e;
  return qb.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Xb.some((r) => (n.willChange || "").includes(r)) || Zb.some((r) => (n.contain || "").includes(r));
}
function Qb(e) {
  let t = xt(e);
  for (; Qe(t) && !on(t); ) {
    if (si(t))
      return t;
    if (to(t))
      return null;
    t = xt(t);
  }
  return null;
}
function li() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Jb = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function on(e) {
  return Jb.has(mn(e));
}
function He(e) {
  return Ie(e).getComputedStyle(e);
}
function no(e) {
  return Ve(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function xt(e) {
  if (mn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    gs(e) && e.host || // Fallback.
    Je(e)
  );
  return gs(t) ? t.host : t;
}
function Uc(e) {
  const t = xt(e);
  return on(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Qe(t) && Hn(t) ? t : Uc(t);
}
function Mn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Uc(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Ie(o);
  if (a) {
    const i = va(s);
    return t.concat(s, s.visualViewport || [], Hn(o) ? o : [], i && n ? Mn(i) : []);
  }
  return t.concat(o, Mn(o, [], n));
}
function va(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function jc(e) {
  const t = He(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Qe(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = xr(n) !== a || xr(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function ci(e) {
  return Ve(e) ? e : e.contextElement;
}
function rn(e) {
  const t = ci(e);
  if (!Qe(t))
    return Ze(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = jc(t);
  let s = (a ? xr(n.width) : n.width) / r, i = (a ? xr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const ey = /* @__PURE__ */ Ze(0);
function Kc(e) {
  const t = Ie(e);
  return !li() || !t.visualViewport ? ey : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ty(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ie(e) ? !1 : t;
}
function Lt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = ci(e);
  let s = Ze(1);
  t && (r ? Ve(r) && (s = rn(r)) : s = rn(e));
  const i = ty(a, n, r) ? Kc(a) : Ze(0);
  let c = (o.left + i.x) / s.x, u = (o.top + i.y) / s.y, d = o.width / s.x, m = o.height / s.y;
  if (a) {
    const p = Ie(a), h = r && Ve(r) ? Ie(r) : r;
    let v = p, g = va(v);
    for (; g && r && h !== v; ) {
      const b = rn(g), y = g.getBoundingClientRect(), w = He(g), x = y.left + (g.clientLeft + parseFloat(w.paddingLeft)) * b.x, k = y.top + (g.clientTop + parseFloat(w.paddingTop)) * b.y;
      c *= b.x, u *= b.y, d *= b.x, m *= b.y, c += x, u += k, v = Ie(g), g = va(v);
    }
  }
  return Sr({
    width: d,
    height: m,
    x: c,
    y: u
  });
}
function ro(e, t) {
  const n = no(e).scrollLeft;
  return t ? t.left + n : Lt(Je(e)).left + n;
}
function qc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - ro(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ny(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = Je(r), i = t ? to(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Ze(1);
  const d = Ze(0), m = Qe(r);
  if ((m || !m && !a) && ((mn(r) !== "body" || Hn(s)) && (c = no(r)), Qe(r))) {
    const h = Lt(r);
    u = rn(r), d.x = h.x + r.clientLeft, d.y = h.y + r.clientTop;
  }
  const p = s && !m && !a ? qc(s, c) : Ze(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + d.x + p.x,
    y: n.y * u.y - c.scrollTop * u.y + d.y + p.y
  };
}
function ry(e) {
  return Array.from(e.getClientRects());
}
function oy(e) {
  const t = Je(e), n = no(e), r = e.ownerDocument.body, o = Ae(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Ae(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + ro(e);
  const i = -n.scrollTop;
  return He(r).direction === "rtl" && (s += Ae(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const vs = 25;
function ay(e, t) {
  const n = Ie(e), r = Je(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const d = li();
    (!d || d && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const u = ro(r);
  if (u <= 0) {
    const d = r.ownerDocument, m = d.body, p = getComputedStyle(m), h = d.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, v = Math.abs(r.clientWidth - m.clientWidth - h);
    v <= vs && (a -= v);
  } else u <= vs && (a += u);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
const iy = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function sy(e, t) {
  const n = Lt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Qe(e) ? rn(e) : Ze(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, u = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: u
  };
}
function bs(e, t, n) {
  let r;
  if (t === "viewport")
    r = ay(e, n);
  else if (t === "document")
    r = oy(Je(e));
  else if (Ve(t))
    r = sy(t, n);
  else {
    const o = Kc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Sr(r);
}
function Xc(e, t) {
  const n = xt(e);
  return n === t || !Ve(n) || on(n) ? !1 : He(n).position === "fixed" || Xc(n, t);
}
function ly(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Mn(e, [], !1).filter((i) => Ve(i) && mn(i) !== "body"), o = null;
  const a = He(e).position === "fixed";
  let s = a ? xt(e) : e;
  for (; Ve(s) && !on(s); ) {
    const i = He(s), c = si(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && iy.has(o.position) || Hn(s) && !c && Xc(e, s)) ? r = r.filter((d) => d !== s) : o = i, s = xt(s);
  }
  return t.set(e, r), r;
}
function cy(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? to(t) ? [] : ly(t, this._c) : [].concat(n), r], i = s[0], c = s.reduce((u, d) => {
    const m = bs(t, d, o);
    return u.top = Ae(m.top, u.top), u.right = wt(m.right, u.right), u.bottom = wt(m.bottom, u.bottom), u.left = Ae(m.left, u.left), u;
  }, bs(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function dy(e) {
  const {
    width: t,
    height: n
  } = jc(e);
  return {
    width: t,
    height: n
  };
}
function uy(e, t, n) {
  const r = Qe(t), o = Je(t), a = n === "fixed", s = Lt(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Ze(0);
  function u() {
    c.x = ro(o);
  }
  if (r || !r && !a)
    if ((mn(t) !== "body" || Hn(o)) && (i = no(t)), r) {
      const h = Lt(t, !0, a, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else o && u();
  a && !r && o && u();
  const d = o && !r && !a ? qc(o, i) : Ze(0), m = s.left + i.scrollLeft - c.x - d.x, p = s.top + i.scrollTop - c.y - d.y;
  return {
    x: m,
    y: p,
    width: s.width,
    height: s.height
  };
}
function Yo(e) {
  return He(e).position === "static";
}
function ys(e, t) {
  if (!Qe(e) || He(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Je(e) === n && (n = n.ownerDocument.body), n;
}
function Zc(e, t) {
  const n = Ie(e);
  if (to(e))
    return n;
  if (!Qe(e)) {
    let o = xt(e);
    for (; o && !on(o); ) {
      if (Ve(o) && !Yo(o))
        return o;
      o = xt(o);
    }
    return n;
  }
  let r = ys(e, t);
  for (; r && jb(r) && Yo(r); )
    r = ys(r, t);
  return r && on(r) && Yo(r) && !si(r) ? n : r || Qb(e) || n;
}
const fy = async function(e) {
  const t = this.getOffsetParent || Zc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: uy(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function my(e) {
  return He(e).direction === "rtl";
}
const py = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ny,
  getDocumentElement: Je,
  getClippingRect: cy,
  getOffsetParent: Zc,
  getElementRects: fy,
  getClientRects: ry,
  getDimensions: dy,
  getScale: rn,
  isElement: Ve,
  isRTL: my
};
function Qc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function hy(e, t) {
  let n = null, r;
  const o = Je(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const u = e.getBoundingClientRect(), {
      left: d,
      top: m,
      width: p,
      height: h
    } = u;
    if (i || t(), !p || !h)
      return;
    const v = fr(m), g = fr(o.clientWidth - (d + p)), b = fr(o.clientHeight - (m + h)), y = fr(d), x = {
      rootMargin: -v + "px " + -g + "px " + -b + "px " + -y + "px",
      threshold: Ae(0, wt(1, c)) || 1
    };
    let k = !0;
    function C(R) {
      const P = R[0].intersectionRatio;
      if (P !== c) {
        if (!k)
          return s();
        P ? s(!1, P) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      P === 1 && !Qc(u, e.getBoundingClientRect()) && s(), k = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, x);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function gy(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = ci(e), d = o || a ? [...u ? Mn(u) : [], ...Mn(t)] : [];
  d.forEach((y) => {
    o && y.addEventListener("scroll", n, {
      passive: !0
    }), a && y.addEventListener("resize", n);
  });
  const m = u && i ? hy(u, n) : null;
  let p = -1, h = null;
  s && (h = new ResizeObserver((y) => {
    let [w] = y;
    w && w.target === u && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var x;
      (x = h) == null || x.observe(t);
    })), n();
  }), u && !c && h.observe(u), h.observe(t));
  let v, g = c ? Lt(e) : null;
  c && b();
  function b() {
    const y = Lt(e);
    g && !Qc(g, y) && n(), g = y, v = requestAnimationFrame(b);
  }
  return n(), () => {
    var y;
    d.forEach((w) => {
      o && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), m == null || m(), (y = h) == null || y.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const vy = Bb, by = Vb, yy = $b, wy = Gb, xy = Fb, ws = Lb, Cy = Hb, Sy = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: py,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return zb(e, t, {
    ...o,
    platform: a
  });
};
var ky = typeof document < "u", Ny = function() {
}, br = ky ? Js : Ny;
function kr(e, t) {
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
        if (!kr(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !kr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Jc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function xs(e, t) {
  const n = Jc(e);
  return Math.round(t * n) / n;
}
function Uo(e) {
  const t = f.useRef(e);
  return br(() => {
    t.current = e;
  }), t;
}
function Ry(e) {
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
    whileElementsMounted: c,
    open: u
  } = e, [d, m] = f.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = f.useState(r);
  kr(p, r) || h(r);
  const [v, g] = f.useState(null), [b, y] = f.useState(null), w = f.useCallback((M) => {
    M !== R.current && (R.current = M, g(M));
  }, []), x = f.useCallback((M) => {
    M !== P.current && (P.current = M, y(M));
  }, []), k = a || v, C = s || b, R = f.useRef(null), P = f.useRef(null), N = f.useRef(d), E = c != null, A = Uo(c), z = Uo(o), $ = Uo(u), Y = f.useCallback(() => {
    if (!R.current || !P.current)
      return;
    const M = {
      placement: t,
      strategy: n,
      middleware: p
    };
    z.current && (M.platform = z.current), Sy(R.current, P.current, M).then((T) => {
      const Z = {
        ...T,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: $.current !== !1
      };
      G.current && !kr(N.current, Z) && (N.current = Z, Wr.flushSync(() => {
        m(Z);
      }));
    });
  }, [p, t, n, z, $]);
  br(() => {
    u === !1 && N.current.isPositioned && (N.current.isPositioned = !1, m((M) => ({
      ...M,
      isPositioned: !1
    })));
  }, [u]);
  const G = f.useRef(!1);
  br(() => (G.current = !0, () => {
    G.current = !1;
  }), []), br(() => {
    if (k && (R.current = k), C && (P.current = C), k && C) {
      if (A.current)
        return A.current(k, C, Y);
      Y();
    }
  }, [k, C, Y, A, E]);
  const K = f.useMemo(() => ({
    reference: R,
    floating: P,
    setReference: w,
    setFloating: x
  }), [w, x]), H = f.useMemo(() => ({
    reference: k,
    floating: C
  }), [k, C]), q = f.useMemo(() => {
    const M = {
      position: n,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return M;
    const T = xs(H.floating, d.x), Z = xs(H.floating, d.y);
    return i ? {
      ...M,
      transform: "translate(" + T + "px, " + Z + "px)",
      ...Jc(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: T,
      top: Z
    };
  }, [n, i, H.floating, d.x, d.y]);
  return f.useMemo(() => ({
    ...d,
    update: Y,
    refs: K,
    elements: H,
    floatingStyles: q
  }), [d, Y, K, H, q]);
}
const Py = (e) => {
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
      return r && t(r) ? r.current != null ? ws({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? ws({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Ey = (e, t) => ({
  ...vy(e),
  options: [e, t]
}), My = (e, t) => ({
  ...by(e),
  options: [e, t]
}), _y = (e, t) => ({
  ...Cy(e),
  options: [e, t]
}), Dy = (e, t) => ({
  ...yy(e),
  options: [e, t]
}), Ty = (e, t) => ({
  ...wy(e),
  options: [e, t]
}), Ay = (e, t) => ({
  ...xy(e),
  options: [e, t]
}), Oy = (e, t) => ({
  ...Py(e),
  options: [e, t]
});
var Iy = "Arrow", ed = f.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ l(
    F.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ l("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ed.displayName = Iy;
var zy = ed, di = "Popper", [td, et] = he(di), [Ly, nd] = td(di), rd = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = f.useState(null);
  return /* @__PURE__ */ l(Ly, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
rd.displayName = di;
var od = "PopperAnchor", ad = f.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = nd(od, n), s = f.useRef(null), i = Q(t, s), c = f.useRef(null);
    return f.useEffect(() => {
      const u = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, u !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ l(F.div, { ...o, ref: i });
  }
);
ad.displayName = od;
var ui = "PopperContent", [$y, Fy] = td(ui), id = f.forwardRef(
  (e, t) => {
    var L, te, J, re, se, ie;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u = [],
      collisionPadding: d = 0,
      sticky: m = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...g
    } = e, b = nd(ui, n), [y, w] = f.useState(null), x = Q(t, (_e) => w(_e)), [k, C] = f.useState(null), R = Vn(k), P = (R == null ? void 0 : R.width) ?? 0, N = (R == null ? void 0 : R.height) ?? 0, E = r + (a !== "center" ? "-" + a : ""), A = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, z = Array.isArray(u) ? u : [u], $ = z.length > 0, Y = {
      padding: A,
      boundary: z.filter(By),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: $
    }, { refs: G, floatingStyles: K, placement: H, isPositioned: q, middlewareData: M } = Ry({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: E,
      whileElementsMounted: (..._e) => gy(..._e, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Ey({ mainAxis: o + N, alignmentAxis: s }),
        c && My({
          mainAxis: !0,
          crossAxis: !1,
          limiter: m === "partial" ? _y() : void 0,
          ...Y
        }),
        c && Dy({ ...Y }),
        Ty({
          ...Y,
          apply: ({ elements: _e, rects: De, availableWidth: Mt, availableHeight: _t }) => {
            const { width: Dt, height: Mo } = De.reference, Ut = _e.floating.style;
            Ut.setProperty("--radix-popper-available-width", `${Mt}px`), Ut.setProperty("--radix-popper-available-height", `${_t}px`), Ut.setProperty("--radix-popper-anchor-width", `${Dt}px`), Ut.setProperty("--radix-popper-anchor-height", `${Mo}px`);
          }
        }),
        k && Oy({ element: k, padding: i }),
        Vy({ arrowWidth: P, arrowHeight: N }),
        p && Ay({ strategy: "referenceHidden", ...Y })
      ]
    }), [T, Z] = cd(H), ne = Ce(v);
    ye(() => {
      q && (ne == null || ne());
    }, [q, ne]);
    const _ = (L = M.arrow) == null ? void 0 : L.x, B = (te = M.arrow) == null ? void 0 : te.y, W = ((J = M.arrow) == null ? void 0 : J.centerOffset) !== 0, [V, ee] = f.useState();
    return ye(() => {
      y && ee(window.getComputedStyle(y).zIndex);
    }, [y]), /* @__PURE__ */ l(
      "div",
      {
        ref: G.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...K,
          transform: q ? K.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: V,
          "--radix-popper-transform-origin": [
            (re = M.transformOrigin) == null ? void 0 : re.x,
            (se = M.transformOrigin) == null ? void 0 : se.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ie = M.hide) == null ? void 0 : ie.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ l(
          $y,
          {
            scope: n,
            placedSide: T,
            onArrowChange: C,
            arrowX: _,
            arrowY: B,
            shouldHideArrow: W,
            children: /* @__PURE__ */ l(
              F.div,
              {
                "data-side": T,
                "data-align": Z,
                ...g,
                ref: x,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: q ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
id.displayName = ui;
var sd = "PopperArrow", Wy = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ld = f.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Fy(sd, r), s = Wy[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ l(
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
        children: /* @__PURE__ */ l(
          zy,
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
ld.displayName = sd;
function By(e) {
  return e !== null;
}
var Vy = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, y, w;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [u, d] = cd(n), m = { start: "0%", center: "50%", end: "100%" }[d], p = (((y = o.arrow) == null ? void 0 : y.x) ?? 0) + i / 2, h = (((w = o.arrow) == null ? void 0 : w.y) ?? 0) + c / 2;
    let v = "", g = "";
    return u === "bottom" ? (v = s ? m : `${p}px`, g = `${-c}px`) : u === "top" ? (v = s ? m : `${p}px`, g = `${r.floating.height + c}px`) : u === "right" ? (v = `${-c}px`, g = s ? m : `${h}px`) : u === "left" && (v = `${r.floating.width + c}px`, g = s ? m : `${h}px`), { data: { x: v, y: g } };
  }
});
function cd(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var pn = rd, hn = ad, Gn = id, Yn = ld, jo = "rovingFocusGroup.onEntryFocus", Hy = { bubbles: !1, cancelable: !0 }, Un = "RovingFocusGroup", [ba, dd, Gy] = $n(Un), [Yy, St] = he(
  Un,
  [Gy]
), [Uy, jy] = Yy(Un), ud = f.forwardRef(
  (e, t) => /* @__PURE__ */ l(ba.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l(ba.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l(Ky, { ...e, ref: t }) }) })
);
ud.displayName = Un;
var Ky = f.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: u,
    preventScrollOnEntryFocus: d = !1,
    ...m
  } = e, p = f.useRef(null), h = Q(t, p), v = ut(a), [g, b] = we({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: Un
  }), [y, w] = f.useState(!1), x = Ce(u), k = dd(n), C = f.useRef(!1), [R, P] = f.useState(0);
  return f.useEffect(() => {
    const N = p.current;
    if (N)
      return N.addEventListener(jo, x), () => N.removeEventListener(jo, x);
  }, [x]), /* @__PURE__ */ l(
    Uy,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: g,
      onItemFocus: f.useCallback(
        (N) => b(N),
        [b]
      ),
      onItemShiftTab: f.useCallback(() => w(!0), []),
      onFocusableItemAdd: f.useCallback(
        () => P((N) => N + 1),
        []
      ),
      onFocusableItemRemove: f.useCallback(
        () => P((N) => N - 1),
        []
      ),
      children: /* @__PURE__ */ l(
        F.div,
        {
          tabIndex: y || R === 0 ? -1 : 0,
          "data-orientation": r,
          ...m,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: I(e.onMouseDown, () => {
            C.current = !0;
          }),
          onFocus: I(e.onFocus, (N) => {
            const E = !C.current;
            if (N.target === N.currentTarget && E && !y) {
              const A = new CustomEvent(jo, Hy);
              if (N.currentTarget.dispatchEvent(A), !A.defaultPrevented) {
                const z = k().filter((H) => H.focusable), $ = z.find((H) => H.active), Y = z.find((H) => H.id === g), K = [$, Y, ...z].filter(
                  Boolean
                ).map((H) => H.ref.current);
                pd(K, d);
              }
            }
            C.current = !1;
          }),
          onBlur: I(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), fd = "RovingFocusGroupItem", md = f.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = ge(), u = a || c, d = jy(fd, n), m = d.currentTabStopId === u, p = dd(n), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: g } = d;
    return f.useEffect(() => {
      if (r)
        return h(), () => v();
    }, [r, h, v]), /* @__PURE__ */ l(
      ba.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ l(
          F.span,
          {
            tabIndex: m ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: t,
            onMouseDown: I(e.onMouseDown, (b) => {
              r ? d.onItemFocus(u) : b.preventDefault();
            }),
            onFocus: I(e.onFocus, () => d.onItemFocus(u)),
            onKeyDown: I(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const y = Zy(b, d.orientation, d.dir);
              if (y !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let x = p().filter((k) => k.focusable).map((k) => k.ref.current);
                if (y === "last") x.reverse();
                else if (y === "prev" || y === "next") {
                  y === "prev" && x.reverse();
                  const k = x.indexOf(b.currentTarget);
                  x = d.loop ? Qy(x, k + 1) : x.slice(k + 1);
                }
                setTimeout(() => pd(x));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: m, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
md.displayName = fd;
var qy = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Xy(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Zy(e, t, n) {
  const r = Xy(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return qy[r];
}
function pd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Qy(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var oo = ud, ao = md, ya = ["Enter", " "], Jy = ["ArrowDown", "PageUp", "Home"], hd = ["ArrowUp", "PageDown", "End"], ew = [...Jy, ...hd], tw = {
  ltr: [...ya, "ArrowRight"],
  rtl: [...ya, "ArrowLeft"]
}, nw = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, jn = "Menu", [_n, rw, ow] = $n(jn), [Gt, gd] = he(jn, [
  ow,
  et,
  St
]), Kn = et(), vd = St(), [bd, kt] = Gt(jn), [aw, qn] = Gt(jn), yd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = Kn(t), [c, u] = f.useState(null), d = f.useRef(!1), m = Ce(a), p = ut(o);
  return f.useEffect(() => {
    const h = () => {
      d.current = !0, document.addEventListener("pointerdown", v, { capture: !0, once: !0 }), document.addEventListener("pointermove", v, { capture: !0, once: !0 });
    }, v = () => d.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", v, { capture: !0 }), document.removeEventListener("pointermove", v, { capture: !0 });
    };
  }, []), /* @__PURE__ */ l(pn, { ...i, children: /* @__PURE__ */ l(
    bd,
    {
      scope: t,
      open: n,
      onOpenChange: m,
      content: c,
      onContentChange: u,
      children: /* @__PURE__ */ l(
        aw,
        {
          scope: t,
          onClose: f.useCallback(() => m(!1), [m]),
          isUsingKeyboardRef: d,
          dir: p,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
yd.displayName = jn;
var iw = "MenuAnchor", fi = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Kn(n);
    return /* @__PURE__ */ l(hn, { ...o, ...r, ref: t });
  }
);
fi.displayName = iw;
var mi = "MenuPortal", [sw, wd] = Gt(mi, {
  forceMount: void 0
}), xd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = kt(mi, t);
  return /* @__PURE__ */ l(sw, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Vt, { asChild: !0, container: o, children: r }) }) });
};
xd.displayName = mi;
var Le = "MenuContent", [lw, pi] = Gt(Le), Cd = f.forwardRef(
  (e, t) => {
    const n = wd(Le, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = kt(Le, e.__scopeMenu), s = qn(Le, e.__scopeMenu);
    return /* @__PURE__ */ l(_n.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(_n.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ l(cw, { ...o, ref: t }) : /* @__PURE__ */ l(dw, { ...o, ref: t }) }) }) });
  }
), cw = f.forwardRef(
  (e, t) => {
    const n = kt(Le, e.__scopeMenu), r = f.useRef(null), o = Q(t, r);
    return f.useEffect(() => {
      const a = r.current;
      if (a) return jr(a);
    }, []), /* @__PURE__ */ l(
      hi,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: I(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), dw = f.forwardRef((e, t) => {
  const n = kt(Le, e.__scopeMenu);
  return /* @__PURE__ */ l(
    hi,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), uw = /* @__PURE__ */ yt("MenuContent.ScrollLock"), hi = f.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: d,
      onFocusOutside: m,
      onInteractOutside: p,
      onDismiss: h,
      disableOutsideScroll: v,
      ...g
    } = e, b = kt(Le, n), y = qn(Le, n), w = Kn(n), x = vd(n), k = rw(n), [C, R] = f.useState(null), P = f.useRef(null), N = Q(t, P, b.onContentChange), E = f.useRef(0), A = f.useRef(""), z = f.useRef(0), $ = f.useRef(null), Y = f.useRef("right"), G = f.useRef(0), K = v ? Wn : f.Fragment, H = v ? { as: uw, allowPinchZoom: !0 } : void 0, q = (T) => {
      var L, te;
      const Z = A.current + T, ne = k().filter((J) => !J.disabled), _ = document.activeElement, B = (L = ne.find((J) => J.ref.current === _)) == null ? void 0 : L.textValue, W = ne.map((J) => J.textValue), V = Sw(W, Z, B), ee = (te = ne.find((J) => J.textValue === V)) == null ? void 0 : te.ref.current;
      (function J(re) {
        A.current = re, window.clearTimeout(E.current), re !== "" && (E.current = window.setTimeout(() => J(""), 1e3));
      })(Z), ee && setTimeout(() => ee.focus());
    };
    f.useEffect(() => () => window.clearTimeout(E.current), []), Yr();
    const M = f.useCallback((T) => {
      var ne, _;
      return Y.current === ((ne = $.current) == null ? void 0 : ne.side) && Nw(T, (_ = $.current) == null ? void 0 : _.area);
    }, []);
    return /* @__PURE__ */ l(
      lw,
      {
        scope: n,
        searchRef: A,
        onItemEnter: f.useCallback(
          (T) => {
            M(T) && T.preventDefault();
          },
          [M]
        ),
        onItemLeave: f.useCallback(
          (T) => {
            var Z;
            M(T) || ((Z = P.current) == null || Z.focus(), R(null));
          },
          [M]
        ),
        onTriggerLeave: f.useCallback(
          (T) => {
            M(T) && T.preventDefault();
          },
          [M]
        ),
        pointerGraceTimerRef: z,
        onPointerGraceIntentChange: f.useCallback((T) => {
          $.current = T;
        }, []),
        children: /* @__PURE__ */ l(K, { ...H, children: /* @__PURE__ */ l(
          Fn,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: I(a, (T) => {
              var Z;
              T.preventDefault(), (Z = P.current) == null || Z.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ l(
              Bt,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: d,
                onFocusOutside: m,
                onInteractOutside: p,
                onDismiss: h,
                children: /* @__PURE__ */ l(
                  oo,
                  {
                    asChild: !0,
                    ...x,
                    dir: y.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: C,
                    onCurrentTabStopIdChange: R,
                    onEntryFocus: I(c, (T) => {
                      y.isUsingKeyboardRef.current || T.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ l(
                      Gn,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Fd(b.open),
                        "data-radix-menu-content": "",
                        dir: y.dir,
                        ...w,
                        ...g,
                        ref: N,
                        style: { outline: "none", ...g.style },
                        onKeyDown: I(g.onKeyDown, (T) => {
                          const ne = T.target.closest("[data-radix-menu-content]") === T.currentTarget, _ = T.ctrlKey || T.altKey || T.metaKey, B = T.key.length === 1;
                          ne && (T.key === "Tab" && T.preventDefault(), !_ && B && q(T.key));
                          const W = P.current;
                          if (T.target !== W || !ew.includes(T.key)) return;
                          T.preventDefault();
                          const ee = k().filter((L) => !L.disabled).map((L) => L.ref.current);
                          hd.includes(T.key) && ee.reverse(), xw(ee);
                        }),
                        onBlur: I(e.onBlur, (T) => {
                          T.currentTarget.contains(T.target) || (window.clearTimeout(E.current), A.current = "");
                        }),
                        onPointerMove: I(
                          e.onPointerMove,
                          Dn((T) => {
                            const Z = T.target, ne = G.current !== T.clientX;
                            if (T.currentTarget.contains(Z) && ne) {
                              const _ = T.clientX > G.current ? "right" : "left";
                              Y.current = _, G.current = T.clientX;
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
Cd.displayName = Le;
var fw = "MenuGroup", gi = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ l(F.div, { role: "group", ...r, ref: t });
  }
);
gi.displayName = fw;
var mw = "MenuLabel", Sd = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ l(F.div, { ...r, ref: t });
  }
);
Sd.displayName = mw;
var Nr = "MenuItem", Cs = "menu.itemSelect", io = f.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = f.useRef(null), s = qn(Nr, e.__scopeMenu), i = pi(Nr, e.__scopeMenu), c = Q(t, a), u = f.useRef(!1), d = () => {
      const m = a.current;
      if (!n && m) {
        const p = new CustomEvent(Cs, { bubbles: !0, cancelable: !0 });
        m.addEventListener(Cs, (h) => r == null ? void 0 : r(h), { once: !0 }), Sl(m, p), p.defaultPrevented ? u.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ l(
      kd,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: I(e.onClick, d),
        onPointerDown: (m) => {
          var p;
          (p = e.onPointerDown) == null || p.call(e, m), u.current = !0;
        },
        onPointerUp: I(e.onPointerUp, (m) => {
          var p;
          u.current || (p = m.currentTarget) == null || p.click();
        }),
        onKeyDown: I(e.onKeyDown, (m) => {
          const p = i.searchRef.current !== "";
          n || p && m.key === " " || ya.includes(m.key) && (m.currentTarget.click(), m.preventDefault());
        })
      }
    );
  }
);
io.displayName = Nr;
var kd = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = pi(Nr, n), i = vd(n), c = f.useRef(null), u = Q(t, c), [d, m] = f.useState(!1), [p, h] = f.useState("");
    return f.useEffect(() => {
      const v = c.current;
      v && h((v.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ l(
      _n.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ l(ao, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ l(
          F.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: u,
            onPointerMove: I(
              e.onPointerMove,
              Dn((v) => {
                r ? s.onItemLeave(v) : (s.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: I(
              e.onPointerLeave,
              Dn((v) => s.onItemLeave(v))
            ),
            onFocus: I(e.onFocus, () => m(!0)),
            onBlur: I(e.onBlur, () => m(!1))
          }
        ) })
      }
    );
  }
), pw = "MenuCheckboxItem", Nd = f.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ l(_d, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ l(
      io,
      {
        role: "menuitemcheckbox",
        "aria-checked": Rr(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": yi(n),
        onSelect: I(
          o.onSelect,
          () => r == null ? void 0 : r(Rr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Nd.displayName = pw;
var Rd = "MenuRadioGroup", [hw, gw] = Gt(
  Rd,
  { value: void 0, onValueChange: () => {
  } }
), Pd = f.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = Ce(r);
    return /* @__PURE__ */ l(hw, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ l(gi, { ...o, ref: t }) });
  }
);
Pd.displayName = Rd;
var Ed = "MenuRadioItem", Md = f.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = gw(Ed, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ l(_d, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ l(
      io,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": yi(a),
        onSelect: I(
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
Md.displayName = Ed;
var vi = "MenuItemIndicator", [_d, vw] = Gt(
  vi,
  { checked: !1 }
), Dd = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = vw(vi, n);
    return /* @__PURE__ */ l(
      ve,
      {
        present: r || Rr(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ l(
          F.span,
          {
            ...o,
            ref: t,
            "data-state": yi(a.checked)
          }
        )
      }
    );
  }
);
Dd.displayName = vi;
var bw = "MenuSeparator", Td = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ l(
      F.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Td.displayName = bw;
var yw = "MenuArrow", Ad = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Kn(n);
    return /* @__PURE__ */ l(Yn, { ...o, ...r, ref: t });
  }
);
Ad.displayName = yw;
var bi = "MenuSub", [ww, Od] = Gt(bi), Id = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = kt(bi, t), s = Kn(t), [i, c] = f.useState(null), [u, d] = f.useState(null), m = Ce(o);
  return f.useEffect(() => (a.open === !1 && m(!1), () => m(!1)), [a.open, m]), /* @__PURE__ */ l(pn, { ...s, children: /* @__PURE__ */ l(
    bd,
    {
      scope: t,
      open: r,
      onOpenChange: m,
      content: u,
      onContentChange: d,
      children: /* @__PURE__ */ l(
        ww,
        {
          scope: t,
          contentId: ge(),
          triggerId: ge(),
          trigger: i,
          onTriggerChange: c,
          children: n
        }
      )
    }
  ) });
};
Id.displayName = bi;
var kn = "MenuSubTrigger", zd = f.forwardRef(
  (e, t) => {
    const n = kt(kn, e.__scopeMenu), r = qn(kn, e.__scopeMenu), o = Od(kn, e.__scopeMenu), a = pi(kn, e.__scopeMenu), s = f.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: c } = a, u = { __scopeMenu: e.__scopeMenu }, d = f.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return f.useEffect(() => d, [d]), f.useEffect(() => {
      const m = i.current;
      return () => {
        window.clearTimeout(m), c(null);
      };
    }, [i, c]), /* @__PURE__ */ l(fi, { asChild: !0, ...u, children: /* @__PURE__ */ l(
      kd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Fd(n.open),
        ...e,
        ref: lt(t, o.onTriggerChange),
        onClick: (m) => {
          var p;
          (p = e.onClick) == null || p.call(e, m), !(e.disabled || m.defaultPrevented) && (m.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: I(
          e.onPointerMove,
          Dn((m) => {
            a.onItemEnter(m), !m.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: I(
          e.onPointerLeave,
          Dn((m) => {
            var h, v;
            d();
            const p = (h = n.content) == null ? void 0 : h.getBoundingClientRect();
            if (p) {
              const g = (v = n.content) == null ? void 0 : v.dataset.side, b = g === "right", y = b ? -5 : 5, w = p[b ? "left" : "right"], x = p[b ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: m.clientX + y, y: m.clientY },
                  { x: w, y: p.top },
                  { x, y: p.top },
                  { x, y: p.bottom },
                  { x: w, y: p.bottom }
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
        onKeyDown: I(e.onKeyDown, (m) => {
          var h;
          const p = a.searchRef.current !== "";
          e.disabled || p && m.key === " " || tw[r.dir].includes(m.key) && (n.onOpenChange(!0), (h = n.content) == null || h.focus(), m.preventDefault());
        })
      }
    ) });
  }
);
zd.displayName = kn;
var Ld = "MenuSubContent", $d = f.forwardRef(
  (e, t) => {
    const n = wd(Le, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = kt(Le, e.__scopeMenu), s = qn(Le, e.__scopeMenu), i = Od(Ld, e.__scopeMenu), c = f.useRef(null), u = Q(t, c);
    return /* @__PURE__ */ l(_n.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(_n.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(
      hi,
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
          var m;
          s.isUsingKeyboardRef.current && ((m = c.current) == null || m.focus()), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: I(e.onFocusOutside, (d) => {
          d.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: I(e.onEscapeKeyDown, (d) => {
          s.onClose(), d.preventDefault();
        }),
        onKeyDown: I(e.onKeyDown, (d) => {
          var h;
          const m = d.currentTarget.contains(d.target), p = nw[s.dir].includes(d.key);
          m && p && (a.onOpenChange(!1), (h = i.trigger) == null || h.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
$d.displayName = Ld;
function Fd(e) {
  return e ? "open" : "closed";
}
function Rr(e) {
  return e === "indeterminate";
}
function yi(e) {
  return Rr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function xw(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Cw(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Sw(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = Cw(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const c = s.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function kw(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], u = i.x, d = i.y, m = c.x, p = c.y;
    d > r != p > r && n < (m - u) * (r - d) / (p - d) + u && (o = !o);
  }
  return o;
}
function Nw(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return kw(n, t);
}
function Dn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Rw = yd, Pw = fi, Ew = xd, Mw = Cd, _w = gi, Dw = Sd, Tw = io, Aw = Nd, Ow = Pd, Iw = Md, zw = Dd, Lw = Td, $w = Ad, Fw = Id, Ww = zd, Bw = $d, so = "DropdownMenu", [Vw, PE] = he(
  so,
  [gd]
), Me = gd(), [Hw, Wd] = Vw(so), Bd = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, c = Me(t), u = f.useRef(null), [d, m] = we({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: so
  });
  return /* @__PURE__ */ l(
    Hw,
    {
      scope: t,
      triggerId: ge(),
      triggerRef: u,
      contentId: ge(),
      open: d,
      onOpenChange: m,
      onOpenToggle: f.useCallback(() => m((p) => !p), [m]),
      modal: i,
      children: /* @__PURE__ */ l(Rw, { ...c, open: d, onOpenChange: m, dir: r, modal: i, children: n })
    }
  );
};
Bd.displayName = so;
var Vd = "DropdownMenuTrigger", Hd = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = Wd(Vd, n), s = Me(n);
    return /* @__PURE__ */ l(Pw, { asChild: !0, ...s, children: /* @__PURE__ */ l(
      F.button,
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
        ref: lt(t, a.triggerRef),
        onPointerDown: I(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (a.onOpenToggle(), a.open || i.preventDefault());
        }),
        onKeyDown: I(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && a.onOpenToggle(), i.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Hd.displayName = Vd;
var Gw = "DropdownMenuPortal", Gd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Me(t);
  return /* @__PURE__ */ l(Ew, { ...r, ...n });
};
Gd.displayName = Gw;
var Yd = "DropdownMenuContent", Ud = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Wd(Yd, n), a = Me(n), s = f.useRef(!1);
    return /* @__PURE__ */ l(
      Mw,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (i) => {
          var c;
          s.current || (c = o.triggerRef.current) == null || c.focus(), s.current = !1, i.preventDefault();
        }),
        onInteractOutside: I(e.onInteractOutside, (i) => {
          const c = i.detail.originalEvent, u = c.button === 0 && c.ctrlKey === !0, d = c.button === 2 || u;
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
Ud.displayName = Yd;
var Yw = "DropdownMenuGroup", jd = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(_w, { ...o, ...r, ref: t });
  }
);
jd.displayName = Yw;
var Uw = "DropdownMenuLabel", Kd = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(Dw, { ...o, ...r, ref: t });
  }
);
Kd.displayName = Uw;
var jw = "DropdownMenuItem", qd = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(Tw, { ...o, ...r, ref: t });
  }
);
qd.displayName = jw;
var Kw = "DropdownMenuCheckboxItem", Xd = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Aw, { ...o, ...r, ref: t });
});
Xd.displayName = Kw;
var qw = "DropdownMenuRadioGroup", Zd = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Ow, { ...o, ...r, ref: t });
});
Zd.displayName = qw;
var Xw = "DropdownMenuRadioItem", Qd = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Iw, { ...o, ...r, ref: t });
});
Qd.displayName = Xw;
var Zw = "DropdownMenuItemIndicator", Jd = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(zw, { ...o, ...r, ref: t });
});
Jd.displayName = Zw;
var Qw = "DropdownMenuSeparator", eu = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Lw, { ...o, ...r, ref: t });
});
eu.displayName = Qw;
var Jw = "DropdownMenuArrow", ex = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l($w, { ...o, ...r, ref: t });
  }
);
ex.displayName = Jw;
var tx = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = Me(t), [i, c] = we({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ l(Fw, { ...s, open: i, onOpenChange: c, children: n });
}, nx = "DropdownMenuSubTrigger", tu = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Ww, { ...o, ...r, ref: t });
});
tu.displayName = nx;
var rx = "DropdownMenuSubContent", nu = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(
    Bw,
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
nu.displayName = rx;
var ox = Bd, ax = Hd, ru = Gd, ix = Ud, sx = jd, lx = Kd, cx = qd, dx = Xd, ux = Zd, fx = Qd, ou = Jd, mx = eu, px = tx, hx = tu, gx = nu, vx = "Label", au = f.forwardRef((e, t) => /* @__PURE__ */ l(
  F.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
au.displayName = vx;
var iu = au, Ko, lo = "HoverCard", [su, EE] = he(lo, [
  et
]), co = et(), [bx, uo] = su(lo), lu = (e) => {
  const {
    __scopeHoverCard: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    openDelay: s = 700,
    closeDelay: i = 300
  } = e, c = co(t), u = f.useRef(0), d = f.useRef(0), m = f.useRef(!1), p = f.useRef(!1), [h, v] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: lo
  }), g = f.useCallback(() => {
    clearTimeout(d.current), u.current = window.setTimeout(() => v(!0), s);
  }, [s, v]), b = f.useCallback(() => {
    clearTimeout(u.current), !m.current && !p.current && (d.current = window.setTimeout(() => v(!1), i));
  }, [i, v]), y = f.useCallback(() => v(!1), [v]);
  return f.useEffect(() => () => {
    clearTimeout(u.current), clearTimeout(d.current);
  }, []), /* @__PURE__ */ l(
    bx,
    {
      scope: t,
      open: h,
      onOpenChange: v,
      onOpen: g,
      onClose: b,
      onDismiss: y,
      hasSelectionRef: m,
      isPointerDownOnContentRef: p,
      children: /* @__PURE__ */ l(pn, { ...c, children: n })
    }
  );
};
lu.displayName = lo;
var cu = "HoverCardTrigger", du = f.forwardRef(
  (e, t) => {
    const { __scopeHoverCard: n, ...r } = e, o = uo(cu, n), a = co(n);
    return /* @__PURE__ */ l(hn, { asChild: !0, ...a, children: /* @__PURE__ */ l(
      F.a,
      {
        "data-state": o.open ? "open" : "closed",
        ...r,
        ref: t,
        onPointerEnter: I(e.onPointerEnter, Er(o.onOpen)),
        onPointerLeave: I(e.onPointerLeave, Er(o.onClose)),
        onFocus: I(e.onFocus, o.onOpen),
        onBlur: I(e.onBlur, o.onClose),
        onTouchStart: I(e.onTouchStart, (s) => s.preventDefault())
      }
    ) });
  }
);
du.displayName = cu;
var wi = "HoverCardPortal", [yx, wx] = su(wi, {
  forceMount: void 0
}), uu = (e) => {
  const { __scopeHoverCard: t, forceMount: n, children: r, container: o } = e, a = uo(wi, t);
  return /* @__PURE__ */ l(yx, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Vt, { asChild: !0, container: o, children: r }) }) });
};
uu.displayName = wi;
var Pr = "HoverCardContent", fu = f.forwardRef(
  (e, t) => {
    const n = wx(Pr, e.__scopeHoverCard), { forceMount: r = n.forceMount, ...o } = e, a = uo(Pr, e.__scopeHoverCard);
    return /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(
      xx,
      {
        "data-state": a.open ? "open" : "closed",
        ...o,
        onPointerEnter: I(e.onPointerEnter, Er(a.onOpen)),
        onPointerLeave: I(e.onPointerLeave, Er(a.onClose)),
        ref: t
      }
    ) });
  }
);
fu.displayName = Pr;
var xx = f.forwardRef((e, t) => {
  const {
    __scopeHoverCard: n,
    onEscapeKeyDown: r,
    onPointerDownOutside: o,
    onFocusOutside: a,
    onInteractOutside: s,
    ...i
  } = e, c = uo(Pr, n), u = co(n), d = f.useRef(null), m = Q(t, d), [p, h] = f.useState(!1);
  return f.useEffect(() => {
    if (p) {
      const v = document.body;
      return Ko = v.style.userSelect || v.style.webkitUserSelect, v.style.userSelect = "none", v.style.webkitUserSelect = "none", () => {
        v.style.userSelect = Ko, v.style.webkitUserSelect = Ko;
      };
    }
  }, [p]), f.useEffect(() => {
    if (d.current) {
      const v = () => {
        h(!1), c.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          var b;
          ((b = document.getSelection()) == null ? void 0 : b.toString()) !== "" && (c.hasSelectionRef.current = !0);
        });
      };
      return document.addEventListener("pointerup", v), () => {
        document.removeEventListener("pointerup", v), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [c.isPointerDownOnContentRef, c.hasSelectionRef]), f.useEffect(() => {
    d.current && kx(d.current).forEach((g) => g.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ l(
    Bt,
    {
      asChild: !0,
      disableOutsidePointerEvents: !1,
      onInteractOutside: s,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: I(a, (v) => {
        v.preventDefault();
      }),
      onDismiss: c.onDismiss,
      children: /* @__PURE__ */ l(
        Gn,
        {
          ...u,
          ...i,
          onPointerDown: I(i.onPointerDown, (v) => {
            v.currentTarget.contains(v.target) && h(!0), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !0;
          }),
          ref: m,
          style: {
            ...i.style,
            userSelect: p ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: p ? "text" : void 0,
            "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
            "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
            "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      )
    }
  );
}), Cx = "HoverCardArrow", Sx = f.forwardRef(
  (e, t) => {
    const { __scopeHoverCard: n, ...r } = e, o = co(n);
    return /* @__PURE__ */ l(Yn, { ...o, ...r, ref: t });
  }
);
Sx.displayName = Cx;
function Er(e) {
  return (t) => t.pointerType === "touch" ? void 0 : e();
}
function kx(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
var Nx = lu, Rx = du, Px = uu, Ex = fu;
function Tn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var fo = "Popover", [mu, ME] = he(fo, [
  et
]), Xn = et(), [Mx, Nt] = mu(fo), pu = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = Xn(t), c = f.useRef(null), [u, d] = f.useState(!1), [m, p] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: fo
  });
  return /* @__PURE__ */ l(pn, { ...i, children: /* @__PURE__ */ l(
    Mx,
    {
      scope: t,
      contentId: ge(),
      triggerRef: c,
      open: m,
      onOpenChange: p,
      onOpenToggle: f.useCallback(() => p((h) => !h), [p]),
      hasCustomAnchor: u,
      onCustomAnchorAdd: f.useCallback(() => d(!0), []),
      onCustomAnchorRemove: f.useCallback(() => d(!1), []),
      modal: s,
      children: n
    }
  ) });
};
pu.displayName = fo;
var hu = "PopoverAnchor", _x = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Nt(hu, n), a = Xn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return f.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ l(hn, { ...a, ...r, ref: t });
  }
);
_x.displayName = hu;
var gu = "PopoverTrigger", vu = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Nt(gu, n), a = Xn(n), s = Q(t, o.triggerRef), i = /* @__PURE__ */ l(
      F.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Cu(o.open),
        ...r,
        ref: s,
        onClick: I(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ l(hn, { asChild: !0, ...a, children: i });
  }
);
vu.displayName = gu;
var xi = "PopoverPortal", [Dx, Tx] = mu(xi, {
  forceMount: void 0
}), bu = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Nt(xi, t);
  return /* @__PURE__ */ l(Dx, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Vt, { asChild: !0, container: o, children: r }) }) });
};
bu.displayName = xi;
var an = "PopoverContent", yu = f.forwardRef(
  (e, t) => {
    const n = Tx(an, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Nt(an, e.__scopePopover);
    return /* @__PURE__ */ l(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ l(Ox, { ...o, ref: t }) : /* @__PURE__ */ l(Ix, { ...o, ref: t }) });
  }
);
yu.displayName = an;
var Ax = /* @__PURE__ */ yt("PopoverContent.RemoveScroll"), Ox = f.forwardRef(
  (e, t) => {
    const n = Nt(an, e.__scopePopover), r = f.useRef(null), o = Q(t, r), a = f.useRef(!1);
    return f.useEffect(() => {
      const s = r.current;
      if (s) return jr(s);
    }, []), /* @__PURE__ */ l(Wn, { as: Ax, allowPinchZoom: !0, children: /* @__PURE__ */ l(
      wu,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: I(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, u = i.button === 2 || c;
            a.current = u;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: I(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Ix = f.forwardRef(
  (e, t) => {
    const n = Nt(an, e.__scopePopover), r = f.useRef(!1), o = f.useRef(!1);
    return /* @__PURE__ */ l(
      wu,
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
          var c, u;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), wu = f.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: u,
      onInteractOutside: d,
      ...m
    } = e, p = Nt(an, n), h = Xn(n);
    return Yr(), /* @__PURE__ */ l(
      Fn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ l(
          Bt,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: d,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: u,
            onDismiss: () => p.onOpenChange(!1),
            children: /* @__PURE__ */ l(
              Gn,
              {
                "data-state": Cu(p.open),
                role: "dialog",
                id: p.contentId,
                ...h,
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
), xu = "PopoverClose", zx = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Nt(xu, n);
    return /* @__PURE__ */ l(
      F.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: I(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
zx.displayName = xu;
var Lx = "PopoverArrow", $x = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Xn(n);
    return /* @__PURE__ */ l(Yn, { ...o, ...r, ref: t });
  }
);
$x.displayName = Lx;
function Cu(e) {
  return e ? "open" : "closed";
}
var Fx = pu, Wx = vu, Bx = bu, Vx = yu, Ci = "Progress", Si = 100, [Hx, _E] = he(Ci), [Gx, Yx] = Hx(Ci), Su = f.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: o,
      getValueLabel: a = Ux,
      ...s
    } = e;
    (o || o === 0) && !Ss(o) && console.error(jx(`${o}`, "Progress"));
    const i = Ss(o) ? o : Si;
    r !== null && !ks(r, i) && console.error(Kx(`${r}`, "Progress"));
    const c = ks(r, i) ? r : null, u = Mr(c) ? a(c, i) : void 0;
    return /* @__PURE__ */ l(Gx, { scope: n, value: c, max: i, children: /* @__PURE__ */ l(
      F.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": Mr(c) ? c : void 0,
        "aria-valuetext": u,
        role: "progressbar",
        "data-state": Ru(c, i),
        "data-value": c ?? void 0,
        "data-max": i,
        ...s,
        ref: t
      }
    ) });
  }
);
Su.displayName = Ci;
var ku = "ProgressIndicator", Nu = f.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...r } = e, o = Yx(ku, n);
    return /* @__PURE__ */ l(
      F.div,
      {
        "data-state": Ru(o.value, o.max),
        "data-value": o.value ?? void 0,
        "data-max": o.max,
        ...r,
        ref: t
      }
    );
  }
);
Nu.displayName = ku;
function Ux(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function Ru(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Mr(e) {
  return typeof e == "number";
}
function Ss(e) {
  return Mr(e) && !isNaN(e) && e > 0;
}
function ks(e, t) {
  return Mr(e) && !isNaN(e) && e <= t && e >= 0;
}
function jx(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Si}\`.`;
}
function Kx(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Si} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var qx = Su, Xx = Nu, ki = "Radio", [Zx, Pu] = he(ki), [Qx, Jx] = Zx(ki), Eu = f.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: a,
      disabled: s,
      value: i = "on",
      onCheck: c,
      form: u,
      ...d
    } = e, [m, p] = f.useState(null), h = Q(t, (b) => p(b)), v = f.useRef(!1), g = m ? u || !!m.closest("form") : !0;
    return /* @__PURE__ */ D(Qx, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ l(
        F.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Tu(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...d,
          ref: h,
          onClick: I(e.onClick, (b) => {
            o || c == null || c(), g && (v.current = b.isPropagationStopped(), v.current || b.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ l(
        Du,
        {
          control: m,
          bubbles: !v.current,
          name: r,
          value: i,
          checked: o,
          required: a,
          disabled: s,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Eu.displayName = ki;
var Mu = "RadioIndicator", _u = f.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = Jx(Mu, n);
    return /* @__PURE__ */ l(ve, { present: r || a.checked, children: /* @__PURE__ */ l(
      F.span,
      {
        "data-state": Tu(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
_u.displayName = Mu;
var eC = "RadioBubbleInput", Du = f.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = f.useRef(null), i = Q(s, a), c = Bn(n), u = Vn(t);
    return f.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const m = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        m,
        "checked"
      ).set;
      if (c !== n && h) {
        const v = new Event("click", { bubbles: r });
        h.call(d, n), d.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ l(
      F.input,
      {
        type: "radio",
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
Du.displayName = eC;
function Tu(e) {
  return e ? "checked" : "unchecked";
}
var tC = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], mo = "RadioGroup", [nC, DE] = he(mo, [
  St,
  Pu
]), Au = St(), Ou = Pu(), [rC, oC] = nC(mo), Iu = f.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: a,
      required: s = !1,
      disabled: i = !1,
      orientation: c,
      dir: u,
      loop: d = !0,
      onValueChange: m,
      ...p
    } = e, h = Au(n), v = ut(u), [g, b] = we({
      prop: a,
      defaultProp: o ?? null,
      onChange: m,
      caller: mo
    });
    return /* @__PURE__ */ l(
      rC,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: g,
        onValueChange: b,
        children: /* @__PURE__ */ l(
          oo,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: v,
            loop: d,
            children: /* @__PURE__ */ l(
              F.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": c,
                "data-disabled": i ? "" : void 0,
                dir: v,
                ...p,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
Iu.displayName = mo;
var zu = "RadioGroupItem", Lu = f.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = oC(zu, n), s = a.disabled || r, i = Au(n), c = Ou(n), u = f.useRef(null), d = Q(t, u), m = a.value === o.value, p = f.useRef(!1);
    return f.useEffect(() => {
      const h = (g) => {
        tC.includes(g.key) && (p.current = !0);
      }, v = () => p.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", v), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", v);
      };
    }, []), /* @__PURE__ */ l(
      ao,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: m,
        children: /* @__PURE__ */ l(
          Eu,
          {
            disabled: s,
            required: a.required,
            checked: m,
            ...c,
            ...o,
            name: a.name,
            ref: d,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: I((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: I(o.onFocus, () => {
              var h;
              p.current && ((h = u.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
Lu.displayName = zu;
var aC = "RadioGroupIndicator", $u = f.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = Ou(n);
    return /* @__PURE__ */ l(_u, { ...o, ...r, ref: t });
  }
);
$u.displayName = aC;
var iC = Iu, sC = Lu, lC = $u;
function cC(e, t) {
  return f.useReducer((n, r) => t[n][r] ?? n, e);
}
var Ni = "ScrollArea", [Fu, TE] = he(Ni), [dC, $e] = Fu(Ni), Wu = f.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, c] = f.useState(null), [u, d] = f.useState(null), [m, p] = f.useState(null), [h, v] = f.useState(null), [g, b] = f.useState(null), [y, w] = f.useState(0), [x, k] = f.useState(0), [C, R] = f.useState(!1), [P, N] = f.useState(!1), E = Q(t, (z) => c(z)), A = ut(o);
    return /* @__PURE__ */ l(
      dC,
      {
        scope: n,
        type: r,
        dir: A,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: u,
        onViewportChange: d,
        content: m,
        onContentChange: p,
        scrollbarX: h,
        onScrollbarXChange: v,
        scrollbarXEnabled: C,
        onScrollbarXEnabledChange: R,
        scrollbarY: g,
        onScrollbarYChange: b,
        scrollbarYEnabled: P,
        onScrollbarYEnabledChange: N,
        onCornerWidthChange: w,
        onCornerHeightChange: k,
        children: /* @__PURE__ */ l(
          F.div,
          {
            dir: A,
            ...s,
            ref: E,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": y + "px",
              "--radix-scroll-area-corner-height": x + "px",
              ...e.style
            }
          }
        )
      }
    );
  }
);
Wu.displayName = Ni;
var Bu = "ScrollAreaViewport", Vu = f.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = $e(Bu, n), i = f.useRef(null), c = Q(t, i, s.onViewportChange);
    return /* @__PURE__ */ D(ke, { children: [
      /* @__PURE__ */ l(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ l(
        F.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...a,
          ref: c,
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
          children: /* @__PURE__ */ l("div", { ref: s.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
Vu.displayName = Bu;
var tt = "ScrollAreaScrollbar", _r = f.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = $e(tt, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return f.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ l(uC, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ l(fC, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ l(Hu, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ l(Ri, { ...r, ref: t }) : null;
  }
);
_r.displayName = tt;
var uC = f.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = $e(tt, e.__scopeScrollArea), [a, s] = f.useState(!1);
  return f.useEffect(() => {
    const i = o.scrollArea;
    let c = 0;
    if (i) {
      const u = () => {
        window.clearTimeout(c), s(!0);
      }, d = () => {
        c = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", u), i.addEventListener("pointerleave", d), () => {
        window.clearTimeout(c), i.removeEventListener("pointerenter", u), i.removeEventListener("pointerleave", d);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ l(ve, { present: n || a, children: /* @__PURE__ */ l(
    Hu,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), fC = f.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = $e(tt, e.__scopeScrollArea), a = e.orientation === "horizontal", s = ho(() => c("SCROLL_END"), 100), [i, c] = cC("hidden", {
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
  return f.useEffect(() => {
    if (i === "idle") {
      const u = window.setTimeout(() => c("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(u);
    }
  }, [i, o.scrollHideDelay, c]), f.useEffect(() => {
    const u = o.viewport, d = a ? "scrollLeft" : "scrollTop";
    if (u) {
      let m = u[d];
      const p = () => {
        const h = u[d];
        m !== h && (c("SCROLL"), s()), m = h;
      };
      return u.addEventListener("scroll", p), () => u.removeEventListener("scroll", p);
    }
  }, [o.viewport, a, c, s]), /* @__PURE__ */ l(ve, { present: n || i !== "hidden", children: /* @__PURE__ */ l(
    Ri,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: I(e.onPointerEnter, () => c("POINTER_ENTER")),
      onPointerLeave: I(e.onPointerLeave, () => c("POINTER_LEAVE"))
    }
  ) });
}), Hu = f.forwardRef((e, t) => {
  const n = $e(tt, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = f.useState(!1), i = e.orientation === "horizontal", c = ho(() => {
    if (n.viewport) {
      const u = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? u : d);
    }
  }, 10);
  return sn(n.viewport, c), sn(n.content, c), /* @__PURE__ */ l(ve, { present: r || a, children: /* @__PURE__ */ l(
    Ri,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), Ri = f.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = $e(tt, e.__scopeScrollArea), a = f.useRef(null), s = f.useRef(0), [i, c] = f.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = ju(i.viewport, i.content), d = {
    ...r,
    sizes: i,
    onSizesChange: c,
    hasThumb: u > 0 && u < 1,
    onThumbChange: (p) => a.current = p,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (p) => s.current = p
  };
  function m(p, h) {
    return bC(p, s.current, i, h);
  }
  return n === "horizontal" ? /* @__PURE__ */ l(
    mC,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const p = o.viewport.scrollLeft, h = Ns(p, i, o.dir);
          a.current.style.transform = `translate3d(${h}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        o.viewport && (o.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        o.viewport && (o.viewport.scrollLeft = m(p, o.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ l(
    pC,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const p = o.viewport.scrollTop, h = Ns(p, i);
          a.current.style.transform = `translate3d(0, ${h}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        o.viewport && (o.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        o.viewport && (o.viewport.scrollTop = m(p));
      }
    }
  ) : null;
}), mC = f.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = $e(tt, e.__scopeScrollArea), [s, i] = f.useState(), c = f.useRef(null), u = Q(t, c, a.onScrollbarXChange);
  return f.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ l(
    Yu,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: u,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": po(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
      onDragScroll: (d) => e.onDragScroll(d.x),
      onWheelScroll: (d, m) => {
        if (a.viewport) {
          const p = a.viewport.scrollLeft + d.deltaX;
          e.onWheelScroll(p), qu(p, m) && d.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: c.current.clientWidth,
            paddingStart: Ar(s.paddingLeft),
            paddingEnd: Ar(s.paddingRight)
          }
        });
      }
    }
  );
}), pC = f.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = $e(tt, e.__scopeScrollArea), [s, i] = f.useState(), c = f.useRef(null), u = Q(t, c, a.onScrollbarYChange);
  return f.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ l(
    Yu,
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
        "--radix-scroll-area-thumb-height": po(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
      onDragScroll: (d) => e.onDragScroll(d.y),
      onWheelScroll: (d, m) => {
        if (a.viewport) {
          const p = a.viewport.scrollTop + d.deltaY;
          e.onWheelScroll(p), qu(p, m) && d.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: c.current.clientHeight,
            paddingStart: Ar(s.paddingTop),
            paddingEnd: Ar(s.paddingBottom)
          }
        });
      }
    }
  );
}), [hC, Gu] = Fu(tt), Yu = f.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: c,
    onDragScroll: u,
    onWheelScroll: d,
    onResize: m,
    ...p
  } = e, h = $e(tt, n), [v, g] = f.useState(null), b = Q(t, (E) => g(E)), y = f.useRef(null), w = f.useRef(""), x = h.viewport, k = r.content - r.viewport, C = Ce(d), R = Ce(c), P = ho(m, 10);
  function N(E) {
    if (y.current) {
      const A = E.clientX - y.current.left, z = E.clientY - y.current.top;
      u({ x: A, y: z });
    }
  }
  return f.useEffect(() => {
    const E = (A) => {
      const z = A.target;
      (v == null ? void 0 : v.contains(z)) && C(A, k);
    };
    return document.addEventListener("wheel", E, { passive: !1 }), () => document.removeEventListener("wheel", E, { passive: !1 });
  }, [x, v, k, C]), f.useEffect(R, [r, R]), sn(v, P), sn(h.content, P), /* @__PURE__ */ l(
    hC,
    {
      scope: n,
      scrollbar: v,
      hasThumb: o,
      onThumbChange: Ce(a),
      onThumbPointerUp: Ce(s),
      onThumbPositionChange: R,
      onThumbPointerDown: Ce(i),
      children: /* @__PURE__ */ l(
        F.div,
        {
          ...p,
          ref: b,
          style: { position: "absolute", ...p.style },
          onPointerDown: I(e.onPointerDown, (E) => {
            E.button === 0 && (E.target.setPointerCapture(E.pointerId), y.current = v.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", h.viewport && (h.viewport.style.scrollBehavior = "auto"), N(E));
          }),
          onPointerMove: I(e.onPointerMove, N),
          onPointerUp: I(e.onPointerUp, (E) => {
            const A = E.target;
            A.hasPointerCapture(E.pointerId) && A.releasePointerCapture(E.pointerId), document.body.style.webkitUserSelect = w.current, h.viewport && (h.viewport.style.scrollBehavior = ""), y.current = null;
          })
        }
      )
    }
  );
}), Dr = "ScrollAreaThumb", Tr = f.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Gu(Dr, e.__scopeScrollArea);
    return /* @__PURE__ */ l(ve, { present: n || o.hasThumb, children: /* @__PURE__ */ l(gC, { ref: t, ...r }) });
  }
), gC = f.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = $e(Dr, n), s = Gu(Dr, n), { onThumbPositionChange: i } = s, c = Q(
      t,
      (m) => s.onThumbChange(m)
    ), u = f.useRef(void 0), d = ho(() => {
      u.current && (u.current(), u.current = void 0);
    }, 100);
    return f.useEffect(() => {
      const m = a.viewport;
      if (m) {
        const p = () => {
          if (d(), !u.current) {
            const h = yC(m, i);
            u.current = h, i();
          }
        };
        return i(), m.addEventListener("scroll", p), () => m.removeEventListener("scroll", p);
      }
    }, [a.viewport, d, i]), /* @__PURE__ */ l(
      F.div,
      {
        "data-state": s.hasThumb ? "visible" : "hidden",
        ...o,
        ref: c,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: I(e.onPointerDownCapture, (m) => {
          const h = m.target.getBoundingClientRect(), v = m.clientX - h.left, g = m.clientY - h.top;
          s.onThumbPointerDown({ x: v, y: g });
        }),
        onPointerUp: I(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
Tr.displayName = Dr;
var Pi = "ScrollAreaCorner", Uu = f.forwardRef(
  (e, t) => {
    const n = $e(Pi, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ l(vC, { ...e, ref: t }) : null;
  }
);
Uu.displayName = Pi;
var vC = f.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = $e(Pi, n), [a, s] = f.useState(0), [i, c] = f.useState(0), u = !!(a && i);
  return sn(o.scrollbarX, () => {
    var m;
    const d = ((m = o.scrollbarX) == null ? void 0 : m.offsetHeight) || 0;
    o.onCornerHeightChange(d), c(d);
  }), sn(o.scrollbarY, () => {
    var m;
    const d = ((m = o.scrollbarY) == null ? void 0 : m.offsetWidth) || 0;
    o.onCornerWidthChange(d), s(d);
  }), u ? /* @__PURE__ */ l(
    F.div,
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
function Ar(e) {
  return e ? parseInt(e, 10) : 0;
}
function ju(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function po(e) {
  const t = ju(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function bC(e, t, n, r = "ltr") {
  const o = po(n), a = o / 2, s = t || a, i = o - s, c = n.scrollbar.paddingStart + s, u = n.scrollbar.size - n.scrollbar.paddingEnd - i, d = n.content - n.viewport, m = r === "ltr" ? [0, d] : [d * -1, 0];
  return Ku([c, u], m)(e);
}
function Ns(e, t, n = "ltr") {
  const r = po(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, c = n === "ltr" ? [0, s] : [s * -1, 0], u = Tn(e, c);
  return Ku([0, s], [0, i])(u);
}
function Ku(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function qu(e, t) {
  return e > 0 && e < t;
}
var yC = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return (function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
};
function ho(e, t) {
  const n = Ce(e), r = f.useRef(0);
  return f.useEffect(() => () => window.clearTimeout(r.current), []), f.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function sn(e, t) {
  const n = Ce(t);
  ye(() => {
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
var Xu = Wu, Zu = Vu, wC = Uu, xC = [" ", "Enter", "ArrowUp", "ArrowDown"], CC = [" ", "Enter"], $t = "Select", [go, vo, SC] = $n($t), [gn, AE] = he($t, [
  SC,
  et
]), bo = et(), [kC, Rt] = gn($t), [NC, RC] = gn($t), Qu = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: c,
    dir: u,
    name: d,
    autoComplete: m,
    disabled: p,
    required: h,
    form: v
  } = e, g = bo(t), [b, y] = f.useState(null), [w, x] = f.useState(null), [k, C] = f.useState(!1), R = ut(u), [P, N] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: $t
  }), [E, A] = we({
    prop: s,
    defaultProp: i,
    onChange: c,
    caller: $t
  }), z = f.useRef(null), $ = b ? v || !!b.closest("form") : !0, [Y, G] = f.useState(/* @__PURE__ */ new Set()), K = Array.from(Y).map((H) => H.props.value).join(";");
  return /* @__PURE__ */ l(pn, { ...g, children: /* @__PURE__ */ D(
    kC,
    {
      required: h,
      scope: t,
      trigger: b,
      onTriggerChange: y,
      valueNode: w,
      onValueNodeChange: x,
      valueNodeHasChildren: k,
      onValueNodeHasChildrenChange: C,
      contentId: ge(),
      value: E,
      onValueChange: A,
      open: P,
      onOpenChange: N,
      dir: R,
      triggerPointerDownPosRef: z,
      disabled: p,
      children: [
        /* @__PURE__ */ l(go.Provider, { scope: t, children: /* @__PURE__ */ l(
          NC,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: f.useCallback((H) => {
              G((q) => new Set(q).add(H));
            }, []),
            onNativeOptionRemove: f.useCallback((H) => {
              G((q) => {
                const M = new Set(q);
                return M.delete(H), M;
              });
            }, []),
            children: n
          }
        ) }),
        $ ? /* @__PURE__ */ D(
          kf,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: d,
            autoComplete: m,
            value: E,
            onChange: (H) => A(H.target.value),
            disabled: p,
            form: v,
            children: [
              E === void 0 ? /* @__PURE__ */ l("option", { value: "" }) : null,
              Array.from(Y)
            ]
          },
          K
        ) : null
      ]
    }
  ) });
};
Qu.displayName = $t;
var Ju = "SelectTrigger", ef = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = bo(n), s = Rt(Ju, n), i = s.disabled || r, c = Q(t, s.onTriggerChange), u = vo(n), d = f.useRef("touch"), [m, p, h] = Rf((g) => {
      const b = u().filter((x) => !x.disabled), y = b.find((x) => x.value === s.value), w = Pf(b, g, y);
      w !== void 0 && s.onValueChange(w.value);
    }), v = (g) => {
      i || (s.onOpenChange(!0), h()), g && (s.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ l(hn, { asChild: !0, ...a, children: /* @__PURE__ */ l(
      F.button,
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
        "data-placeholder": Nf(s.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: I(o.onClick, (g) => {
          g.currentTarget.focus(), d.current !== "mouse" && v(g);
        }),
        onPointerDown: I(o.onPointerDown, (g) => {
          d.current = g.pointerType;
          const b = g.target;
          b.hasPointerCapture(g.pointerId) && b.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (v(g), g.preventDefault());
        }),
        onKeyDown: I(o.onKeyDown, (g) => {
          const b = m.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && p(g.key), !(b && g.key === " ") && xC.includes(g.key) && (v(), g.preventDefault());
        })
      }
    ) });
  }
);
ef.displayName = Ju;
var tf = "SelectValue", nf = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, c = Rt(tf, n), { onValueNodeHasChildrenChange: u } = c, d = a !== void 0, m = Q(t, c.onValueNodeChange);
    return ye(() => {
      u(d);
    }, [u, d]), /* @__PURE__ */ l(
      F.span,
      {
        ...i,
        ref: m,
        style: { pointerEvents: "none" },
        children: Nf(c.value) ? /* @__PURE__ */ l(ke, { children: s }) : a
      }
    );
  }
);
nf.displayName = tf;
var PC = "SelectIcon", rf = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ l(F.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
rf.displayName = PC;
var EC = "SelectPortal", of = (e) => /* @__PURE__ */ l(Vt, { asChild: !0, ...e });
of.displayName = EC;
var Ft = "SelectContent", af = f.forwardRef(
  (e, t) => {
    const n = Rt(Ft, e.__scopeSelect), [r, o] = f.useState();
    if (ye(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? Wr.createPortal(
        /* @__PURE__ */ l(sf, { scope: e.__scopeSelect, children: /* @__PURE__ */ l(go.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ l("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ l(lf, { ...e, ref: t });
  }
);
af.displayName = Ft;
var We = 10, [sf, Pt] = gn(Ft), MC = "SelectContentImpl", _C = /* @__PURE__ */ yt("SelectContent.RemoveScroll"), lf = f.forwardRef(
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
      sideOffset: c,
      align: u,
      alignOffset: d,
      arrowPadding: m,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b,
      //
      ...y
    } = e, w = Rt(Ft, n), [x, k] = f.useState(null), [C, R] = f.useState(null), P = Q(t, (L) => k(L)), [N, E] = f.useState(null), [A, z] = f.useState(
      null
    ), $ = vo(n), [Y, G] = f.useState(!1), K = f.useRef(!1);
    f.useEffect(() => {
      if (x) return jr(x);
    }, [x]), Yr();
    const H = f.useCallback(
      (L) => {
        const [te, ...J] = $().map((ie) => ie.ref.current), [re] = J.slice(-1), se = document.activeElement;
        for (const ie of L)
          if (ie === se || (ie == null || ie.scrollIntoView({ block: "nearest" }), ie === te && C && (C.scrollTop = 0), ie === re && C && (C.scrollTop = C.scrollHeight), ie == null || ie.focus(), document.activeElement !== se)) return;
      },
      [$, C]
    ), q = f.useCallback(
      () => H([N, x]),
      [H, N, x]
    );
    f.useEffect(() => {
      Y && q();
    }, [Y, q]);
    const { onOpenChange: M, triggerPointerDownPosRef: T } = w;
    f.useEffect(() => {
      if (x) {
        let L = { x: 0, y: 0 };
        const te = (re) => {
          var se, ie;
          L = {
            x: Math.abs(Math.round(re.pageX) - (((se = T.current) == null ? void 0 : se.x) ?? 0)),
            y: Math.abs(Math.round(re.pageY) - (((ie = T.current) == null ? void 0 : ie.y) ?? 0))
          };
        }, J = (re) => {
          L.x <= 10 && L.y <= 10 ? re.preventDefault() : x.contains(re.target) || M(!1), document.removeEventListener("pointermove", te), T.current = null;
        };
        return T.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", J, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", J, { capture: !0 });
        };
      }
    }, [x, M, T]), f.useEffect(() => {
      const L = () => M(!1);
      return window.addEventListener("blur", L), window.addEventListener("resize", L), () => {
        window.removeEventListener("blur", L), window.removeEventListener("resize", L);
      };
    }, [M]);
    const [Z, ne] = Rf((L) => {
      const te = $().filter((se) => !se.disabled), J = te.find((se) => se.ref.current === document.activeElement), re = Pf(te, L, J);
      re && setTimeout(() => re.ref.current.focus());
    }), _ = f.useCallback(
      (L, te, J) => {
        const re = !K.current && !J;
        (w.value !== void 0 && w.value === te || re) && (E(L), re && (K.current = !0));
      },
      [w.value]
    ), B = f.useCallback(() => x == null ? void 0 : x.focus(), [x]), W = f.useCallback(
      (L, te, J) => {
        const re = !K.current && !J;
        (w.value !== void 0 && w.value === te || re) && z(L);
      },
      [w.value]
    ), V = r === "popper" ? wa : cf, ee = V === wa ? {
      side: i,
      sideOffset: c,
      align: u,
      alignOffset: d,
      arrowPadding: m,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ l(
      sf,
      {
        scope: n,
        content: x,
        viewport: C,
        onViewportChange: R,
        itemRefCallback: _,
        selectedItem: N,
        onItemLeave: B,
        itemTextRefCallback: W,
        focusSelectedItem: q,
        selectedItemText: A,
        position: r,
        isPositioned: Y,
        searchRef: Z,
        children: /* @__PURE__ */ l(Wn, { as: _C, allowPinchZoom: !0, children: /* @__PURE__ */ l(
          Fn,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (L) => {
              L.preventDefault();
            },
            onUnmountAutoFocus: I(o, (L) => {
              var te;
              (te = w.trigger) == null || te.focus({ preventScroll: !0 }), L.preventDefault();
            }),
            children: /* @__PURE__ */ l(
              Bt,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: (L) => L.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ l(
                  V,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (L) => L.preventDefault(),
                    ...y,
                    ...ee,
                    onPlaced: () => G(!0),
                    ref: P,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...y.style
                    },
                    onKeyDown: I(y.onKeyDown, (L) => {
                      const te = L.ctrlKey || L.altKey || L.metaKey;
                      if (L.key === "Tab" && L.preventDefault(), !te && L.key.length === 1 && ne(L.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(L.key)) {
                        let re = $().filter((se) => !se.disabled).map((se) => se.ref.current);
                        if (["ArrowUp", "End"].includes(L.key) && (re = re.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(L.key)) {
                          const se = L.target, ie = re.indexOf(se);
                          re = re.slice(ie + 1);
                        }
                        setTimeout(() => H(re)), L.preventDefault();
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
lf.displayName = MC;
var DC = "SelectItemAlignedPosition", cf = f.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = Rt(Ft, n), s = Pt(Ft, n), [i, c] = f.useState(null), [u, d] = f.useState(null), m = Q(t, (P) => d(P)), p = vo(n), h = f.useRef(!1), v = f.useRef(!0), { viewport: g, selectedItem: b, selectedItemText: y, focusSelectedItem: w } = s, x = f.useCallback(() => {
    if (a.trigger && a.valueNode && i && u && g && b && y) {
      const P = a.trigger.getBoundingClientRect(), N = u.getBoundingClientRect(), E = a.valueNode.getBoundingClientRect(), A = y.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const se = A.left - N.left, ie = E.left - se, _e = P.left - ie, De = P.width + _e, Mt = Math.max(De, N.width), _t = window.innerWidth - We, Dt = Tn(ie, [
          We,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(We, _t - Mt)
        ]);
        i.style.minWidth = De + "px", i.style.left = Dt + "px";
      } else {
        const se = N.right - A.right, ie = window.innerWidth - E.right - se, _e = window.innerWidth - P.right - ie, De = P.width + _e, Mt = Math.max(De, N.width), _t = window.innerWidth - We, Dt = Tn(ie, [
          We,
          Math.max(We, _t - Mt)
        ]);
        i.style.minWidth = De + "px", i.style.right = Dt + "px";
      }
      const z = p(), $ = window.innerHeight - We * 2, Y = g.scrollHeight, G = window.getComputedStyle(u), K = parseInt(G.borderTopWidth, 10), H = parseInt(G.paddingTop, 10), q = parseInt(G.borderBottomWidth, 10), M = parseInt(G.paddingBottom, 10), T = K + H + Y + M + q, Z = Math.min(b.offsetHeight * 5, T), ne = window.getComputedStyle(g), _ = parseInt(ne.paddingTop, 10), B = parseInt(ne.paddingBottom, 10), W = P.top + P.height / 2 - We, V = $ - W, ee = b.offsetHeight / 2, L = b.offsetTop + ee, te = K + H + L, J = T - te;
      if (te <= W) {
        const se = z.length > 0 && b === z[z.length - 1].ref.current;
        i.style.bottom = "0px";
        const ie = u.clientHeight - g.offsetTop - g.offsetHeight, _e = Math.max(
          V,
          ee + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (se ? B : 0) + ie + q
        ), De = te + _e;
        i.style.height = De + "px";
      } else {
        const se = z.length > 0 && b === z[0].ref.current;
        i.style.top = "0px";
        const _e = Math.max(
          W,
          K + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (se ? _ : 0) + ee
        ) + J;
        i.style.height = _e + "px", g.scrollTop = te - W + g.offsetTop;
      }
      i.style.margin = `${We}px 0`, i.style.minHeight = Z + "px", i.style.maxHeight = $ + "px", r == null || r(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    p,
    a.trigger,
    a.valueNode,
    i,
    u,
    g,
    b,
    y,
    a.dir,
    r
  ]);
  ye(() => x(), [x]);
  const [k, C] = f.useState();
  ye(() => {
    u && C(window.getComputedStyle(u).zIndex);
  }, [u]);
  const R = f.useCallback(
    (P) => {
      P && v.current === !0 && (x(), w == null || w(), v.current = !1);
    },
    [x, w]
  );
  return /* @__PURE__ */ l(
    AC,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: R,
      children: /* @__PURE__ */ l(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: k
          },
          children: /* @__PURE__ */ l(
            F.div,
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
cf.displayName = DC;
var TC = "SelectPopperPosition", wa = f.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = We,
    ...a
  } = e, s = bo(n);
  return /* @__PURE__ */ l(
    Gn,
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
wa.displayName = TC;
var [AC, Ei] = gn(Ft, {}), xa = "SelectViewport", df = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = Pt(xa, n), s = Ei(xa, n), i = Q(t, a.onViewportChange), c = f.useRef(0);
    return /* @__PURE__ */ D(ke, { children: [
      /* @__PURE__ */ l(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ l(go.Slot, { scope: n, children: /* @__PURE__ */ l(
        F.div,
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
          onScroll: I(o.onScroll, (u) => {
            const d = u.currentTarget, { contentWrapper: m, shouldExpandOnScrollRef: p } = s;
            if (p != null && p.current && m) {
              const h = Math.abs(c.current - d.scrollTop);
              if (h > 0) {
                const v = window.innerHeight - We * 2, g = parseFloat(m.style.minHeight), b = parseFloat(m.style.height), y = Math.max(g, b);
                if (y < v) {
                  const w = y + h, x = Math.min(v, w), k = w - x;
                  m.style.height = x + "px", m.style.bottom === "0px" && (d.scrollTop = k > 0 ? k : 0, m.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = d.scrollTop;
          })
        }
      ) })
    ] });
  }
);
df.displayName = xa;
var uf = "SelectGroup", [OC, IC] = gn(uf), ff = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = ge();
    return /* @__PURE__ */ l(OC, { scope: n, id: o, children: /* @__PURE__ */ l(F.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
ff.displayName = uf;
var mf = "SelectLabel", pf = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = IC(mf, n);
    return /* @__PURE__ */ l(F.div, { id: o.id, ...r, ref: t });
  }
);
pf.displayName = mf;
var Or = "SelectItem", [zC, hf] = gn(Or), gf = f.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = Rt(Or, n), c = Pt(Or, n), u = i.value === r, [d, m] = f.useState(a ?? ""), [p, h] = f.useState(!1), v = Q(
      t,
      (w) => {
        var x;
        return (x = c.itemRefCallback) == null ? void 0 : x.call(c, w, r, o);
      }
    ), g = ge(), b = f.useRef("touch"), y = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ l(
      zC,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: g,
        isSelected: u,
        onItemTextChange: f.useCallback((w) => {
          m((x) => x || ((w == null ? void 0 : w.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ l(
          go.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: d,
            children: /* @__PURE__ */ l(
              F.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": p ? "" : void 0,
                "aria-selected": u && p,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: v,
                onFocus: I(s.onFocus, () => h(!0)),
                onBlur: I(s.onBlur, () => h(!1)),
                onClick: I(s.onClick, () => {
                  b.current !== "mouse" && y();
                }),
                onPointerUp: I(s.onPointerUp, () => {
                  b.current === "mouse" && y();
                }),
                onPointerDown: I(s.onPointerDown, (w) => {
                  b.current = w.pointerType;
                }),
                onPointerMove: I(s.onPointerMove, (w) => {
                  var x;
                  b.current = w.pointerType, o ? (x = c.onItemLeave) == null || x.call(c) : b.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: I(s.onPointerLeave, (w) => {
                  var x;
                  w.currentTarget === document.activeElement && ((x = c.onItemLeave) == null || x.call(c));
                }),
                onKeyDown: I(s.onKeyDown, (w) => {
                  var k;
                  ((k = c.searchRef) == null ? void 0 : k.current) !== "" && w.key === " " || (CC.includes(w.key) && y(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
gf.displayName = Or;
var Nn = "SelectItemText", vf = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = Rt(Nn, n), i = Pt(Nn, n), c = hf(Nn, n), u = RC(Nn, n), [d, m] = f.useState(null), p = Q(
      t,
      (y) => m(y),
      c.onItemTextChange,
      (y) => {
        var w;
        return (w = i.itemTextRefCallback) == null ? void 0 : w.call(i, y, c.value, c.disabled);
      }
    ), h = d == null ? void 0 : d.textContent, v = f.useMemo(
      () => /* @__PURE__ */ l("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: b } = u;
    return ye(() => (g(v), () => b(v)), [g, b, v]), /* @__PURE__ */ D(ke, { children: [
      /* @__PURE__ */ l(F.span, { id: c.textId, ...a, ref: p }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? Wr.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
vf.displayName = Nn;
var bf = "SelectItemIndicator", yf = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return hf(bf, n).isSelected ? /* @__PURE__ */ l(F.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
yf.displayName = bf;
var Ca = "SelectScrollUpButton", wf = f.forwardRef((e, t) => {
  const n = Pt(Ca, e.__scopeSelect), r = Ei(Ca, e.__scopeSelect), [o, a] = f.useState(!1), s = Q(t, r.onScrollButtonChange);
  return ye(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const u = c.scrollTop > 0;
        a(u);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ l(
    Cf,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: c } = n;
        i && c && (i.scrollTop = i.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
wf.displayName = Ca;
var Sa = "SelectScrollDownButton", xf = f.forwardRef((e, t) => {
  const n = Pt(Sa, e.__scopeSelect), r = Ei(Sa, e.__scopeSelect), [o, a] = f.useState(!1), s = Q(t, r.onScrollButtonChange);
  return ye(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const u = c.scrollHeight - c.clientHeight, d = Math.ceil(c.scrollTop) < u;
        a(d);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ l(
    Cf,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: c } = n;
        i && c && (i.scrollTop = i.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
xf.displayName = Sa;
var Cf = f.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = Pt("SelectScrollButton", n), s = f.useRef(null), i = vo(n), c = f.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return f.useEffect(() => () => c(), [c]), ye(() => {
    var d;
    const u = i().find((m) => m.ref.current === document.activeElement);
    (d = u == null ? void 0 : u.ref.current) == null || d.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ l(
    F.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: I(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: I(o.onPointerMove, () => {
        var u;
        (u = a.onItemLeave) == null || u.call(a), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: I(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), LC = "SelectSeparator", Sf = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ l(F.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
Sf.displayName = LC;
var ka = "SelectArrow", $C = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = bo(n), a = Rt(ka, n), s = Pt(ka, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ l(Yn, { ...o, ...r, ref: t }) : null;
  }
);
$C.displayName = ka;
var FC = "SelectBubbleInput", kf = f.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = f.useRef(null), a = Q(r, o), s = Bn(t);
    return f.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLSelectElement.prototype, d = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && d) {
        const m = new Event("change", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(m);
      }
    }, [s, t]), /* @__PURE__ */ l(
      F.select,
      {
        ...n,
        style: { ...kl, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
kf.displayName = FC;
function Nf(e) {
  return e === "" || e === void 0;
}
function Rf(e) {
  const t = Ce(e), n = f.useRef(""), r = f.useRef(0), o = f.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), (function c(u) {
        n.current = u, window.clearTimeout(r.current), u !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      })(i);
    },
    [t]
  ), a = f.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return f.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function Pf(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = WC(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const c = s.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function WC(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var BC = Qu, VC = ef, HC = nf, GC = rf, YC = of, UC = af, jC = df, KC = ff, qC = pf, XC = gf, ZC = vf, QC = yf, JC = wf, eS = xf, tS = Sf, nS = "Separator", Rs = "horizontal", rS = ["horizontal", "vertical"], Ef = f.forwardRef((e, t) => {
  const { decorative: n, orientation: r = Rs, ...o } = e, a = oS(r) ? r : Rs, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ l(
    F.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
Ef.displayName = nS;
function oS(e) {
  return rS.includes(e);
}
var Mf = Ef, _f = ["PageUp", "PageDown"], Df = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Tf = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, vn = "Slider", [Na, aS, iS] = $n(vn), [Af, OE] = he(vn, [
  iS
]), [sS, yo] = Af(vn), Of = f.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: c = 0,
      defaultValue: u = [r],
      value: d,
      onValueChange: m = () => {
      },
      onValueCommit: p = () => {
      },
      inverted: h = !1,
      form: v,
      ...g
    } = e, b = f.useRef(/* @__PURE__ */ new Set()), y = f.useRef(0), x = s === "horizontal" ? lS : cS, [k = [], C] = we({
      prop: d,
      defaultProp: u,
      onChange: (z) => {
        var Y;
        (Y = [...b.current][y.current]) == null || Y.focus(), m(z);
      }
    }), R = f.useRef(k);
    function P(z) {
      const $ = pS(k, z);
      A(z, $);
    }
    function N(z) {
      A(z, y.current);
    }
    function E() {
      const z = R.current[y.current];
      k[y.current] !== z && p(k);
    }
    function A(z, $, { commit: Y } = { commit: !1 }) {
      const G = bS(a), K = yS(Math.round((z - r) / a) * a + r, G), H = Tn(K, [r, o]);
      C((q = []) => {
        const M = fS(q, H, $);
        if (vS(M, c * a)) {
          y.current = M.indexOf(H);
          const T = String(M) !== String(q);
          return T && Y && p(M), T ? M : q;
        } else
          return q;
      });
    }
    return /* @__PURE__ */ l(
      sS,
      {
        scope: e.__scopeSlider,
        name: n,
        disabled: i,
        min: r,
        max: o,
        valueIndexToChangeRef: y,
        thumbs: b.current,
        values: k,
        orientation: s,
        form: v,
        children: /* @__PURE__ */ l(Na.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(Na.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(
          x,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: I(g.onPointerDown, () => {
              i || (R.current = k);
            }),
            min: r,
            max: o,
            inverted: h,
            onSlideStart: i ? void 0 : P,
            onSlideMove: i ? void 0 : N,
            onSlideEnd: i ? void 0 : E,
            onHomeKeyDown: () => !i && A(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && A(o, k.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: z, direction: $ }) => {
              if (!i) {
                const K = _f.includes(z.key) || z.shiftKey && Df.includes(z.key) ? 10 : 1, H = y.current, q = k[H], M = a * K * $;
                A(q + M, H, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
Of.displayName = vn;
var [If, zf] = Af(vn, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), lS = f.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: c,
      onStepKeyDown: u,
      ...d
    } = e, [m, p] = f.useState(null), h = Q(t, (x) => p(x)), v = f.useRef(void 0), g = ut(o), b = g === "ltr", y = b && !a || !b && a;
    function w(x) {
      const k = v.current || m.getBoundingClientRect(), C = [0, k.width], P = Mi(C, y ? [n, r] : [r, n]);
      return v.current = k, P(x - k.left);
    }
    return /* @__PURE__ */ l(
      If,
      {
        scope: e.__scopeSlider,
        startEdge: y ? "left" : "right",
        endEdge: y ? "right" : "left",
        direction: y ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ l(
          Lf,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...d,
            ref: h,
            style: {
              ...d.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (x) => {
              const k = w(x.clientX);
              s == null || s(k);
            },
            onSlideMove: (x) => {
              const k = w(x.clientX);
              i == null || i(k);
            },
            onSlideEnd: () => {
              v.current = void 0, c == null || c();
            },
            onStepKeyDown: (x) => {
              const C = Tf[y ? "from-left" : "from-right"].includes(x.key);
              u == null || u({ event: x, direction: C ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), cS = f.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: c,
      ...u
    } = e, d = f.useRef(null), m = Q(t, d), p = f.useRef(void 0), h = !o;
    function v(g) {
      const b = p.current || d.current.getBoundingClientRect(), y = [0, b.height], x = Mi(y, h ? [r, n] : [n, r]);
      return p.current = b, x(g - b.top);
    }
    return /* @__PURE__ */ l(
      If,
      {
        scope: e.__scopeSlider,
        startEdge: h ? "bottom" : "top",
        endEdge: h ? "top" : "bottom",
        size: "height",
        direction: h ? 1 : -1,
        children: /* @__PURE__ */ l(
          Lf,
          {
            "data-orientation": "vertical",
            ...u,
            ref: m,
            style: {
              ...u.style,
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
              p.current = void 0, i == null || i();
            },
            onStepKeyDown: (g) => {
              const y = Tf[h ? "from-bottom" : "from-top"].includes(g.key);
              c == null || c({ event: g, direction: y ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Lf = f.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: c,
      ...u
    } = e, d = yo(vn, n);
    return /* @__PURE__ */ l(
      F.span,
      {
        ...u,
        ref: t,
        onKeyDown: I(e.onKeyDown, (m) => {
          m.key === "Home" ? (s(m), m.preventDefault()) : m.key === "End" ? (i(m), m.preventDefault()) : _f.concat(Df).includes(m.key) && (c(m), m.preventDefault());
        }),
        onPointerDown: I(e.onPointerDown, (m) => {
          const p = m.target;
          p.setPointerCapture(m.pointerId), m.preventDefault(), d.thumbs.has(p) ? p.focus() : r(m);
        }),
        onPointerMove: I(e.onPointerMove, (m) => {
          m.target.hasPointerCapture(m.pointerId) && o(m);
        }),
        onPointerUp: I(e.onPointerUp, (m) => {
          const p = m.target;
          p.hasPointerCapture(m.pointerId) && (p.releasePointerCapture(m.pointerId), a(m));
        })
      }
    );
  }
), $f = "SliderTrack", Ff = f.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = yo($f, n);
    return /* @__PURE__ */ l(
      F.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...r,
        ref: t
      }
    );
  }
);
Ff.displayName = $f;
var Ra = "SliderRange", Wf = f.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = yo(Ra, n), a = zf(Ra, n), s = f.useRef(null), i = Q(t, s), c = o.values.length, u = o.values.map(
      (p) => Hf(p, o.min, o.max)
    ), d = c > 1 ? Math.min(...u) : 0, m = 100 - Math.max(...u);
    return /* @__PURE__ */ l(
      F.span,
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
Wf.displayName = Ra;
var Pa = "SliderThumb", Bf = f.forwardRef(
  (e, t) => {
    const n = aS(e.__scopeSlider), [r, o] = f.useState(null), a = Q(t, (i) => o(i)), s = f.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ l(dS, { ...e, ref: a, index: s });
  }
), dS = f.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = yo(Pa, n), i = zf(Pa, n), [c, u] = f.useState(null), d = Q(t, (w) => u(w)), m = c ? s.form || !!c.closest("form") : !0, p = Vn(c), h = s.values[r], v = h === void 0 ? 0 : Hf(h, s.min, s.max), g = mS(r, s.values.length), b = p == null ? void 0 : p[i.size], y = b ? hS(b, v, i.direction) : 0;
    return f.useEffect(() => {
      if (c)
        return s.thumbs.add(c), () => {
          s.thumbs.delete(c);
        };
    }, [c, s.thumbs]), /* @__PURE__ */ D(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${v}% + ${y}px)`
        },
        children: [
          /* @__PURE__ */ l(Na.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(
            F.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || g,
              "aria-valuemin": s.min,
              "aria-valuenow": h,
              "aria-valuemax": s.max,
              "aria-orientation": s.orientation,
              "data-orientation": s.orientation,
              "data-disabled": s.disabled ? "" : void 0,
              tabIndex: s.disabled ? void 0 : 0,
              ...a,
              ref: d,
              style: h === void 0 ? { display: "none" } : e.style,
              onFocus: I(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          m && /* @__PURE__ */ l(
            Vf,
            {
              name: o ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
              form: s.form,
              value: h
            },
            r
          )
        ]
      }
    );
  }
);
Bf.displayName = Pa;
var uS = "RadioBubbleInput", Vf = f.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = f.useRef(null), a = Q(o, r), s = Bn(t);
    return f.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLInputElement.prototype, d = Object.getOwnPropertyDescriptor(c, "value").set;
      if (s !== t && d) {
        const m = new Event("input", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(m);
      }
    }, [s, t]), /* @__PURE__ */ l(
      F.input,
      {
        style: { display: "none" },
        ...n,
        ref: a,
        defaultValue: t
      }
    );
  }
);
Vf.displayName = uS;
function fS(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function Hf(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return Tn(a, [0, 100]);
}
function mS(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function pS(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function hS(e, t, n) {
  const r = e / 2, a = Mi([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function gS(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function vS(e, t) {
  if (t > 0) {
    const n = gS(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function Mi(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function bS(e) {
  return (String(e).split(".")[1] || "").length;
}
function yS(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var wS = Of, xS = Ff, CS = Wf, SS = Bf, wo = "Switch", [kS, IE] = he(wo), [NS, RS] = kS(wo), Gf = f.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c = "on",
      onCheckedChange: u,
      form: d,
      ...m
    } = e, [p, h] = f.useState(null), v = Q(t, (x) => h(x)), g = f.useRef(!1), b = p ? d || !!p.closest("form") : !0, [y, w] = we({
      prop: o,
      defaultProp: a ?? !1,
      onChange: u,
      caller: wo
    });
    return /* @__PURE__ */ D(NS, { scope: n, checked: y, disabled: i, children: [
      /* @__PURE__ */ l(
        F.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": s,
          "data-state": Kf(y),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...m,
          ref: v,
          onClick: I(e.onClick, (x) => {
            w((k) => !k), b && (g.current = x.isPropagationStopped(), g.current || x.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ l(
        jf,
        {
          control: p,
          bubbles: !g.current,
          name: r,
          value: c,
          checked: y,
          required: s,
          disabled: i,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Gf.displayName = wo;
var Yf = "SwitchThumb", Uf = f.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = RS(Yf, n);
    return /* @__PURE__ */ l(
      F.span,
      {
        "data-state": Kf(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Uf.displayName = Yf;
var PS = "SwitchBubbleInput", jf = f.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = f.useRef(null), i = Q(s, a), c = Bn(n), u = Vn(t);
    return f.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const m = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        m,
        "checked"
      ).set;
      if (c !== n && h) {
        const v = new Event("click", { bubbles: r });
        h.call(d, n), d.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ l(
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
jf.displayName = PS;
function Kf(e) {
  return e ? "checked" : "unchecked";
}
var ES = Gf, MS = Uf, xo = "Tabs", [_S, zE] = he(xo, [
  St
]), qf = St(), [DS, _i] = _S(xo), Xf = f.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: s = "horizontal",
      dir: i,
      activationMode: c = "automatic",
      ...u
    } = e, d = ut(i), [m, p] = we({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: xo
    });
    return /* @__PURE__ */ l(
      DS,
      {
        scope: n,
        baseId: ge(),
        value: m,
        onValueChange: p,
        orientation: s,
        dir: d,
        activationMode: c,
        children: /* @__PURE__ */ l(
          F.div,
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
Xf.displayName = xo;
var Zf = "TabsList", Qf = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = _i(Zf, n), s = qf(n);
    return /* @__PURE__ */ l(
      oo,
      {
        asChild: !0,
        ...s,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ l(
          F.div,
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
Qf.displayName = Zf;
var Jf = "TabsTrigger", em = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, s = _i(Jf, n), i = qf(n), c = rm(s.baseId, r), u = om(s.baseId, r), d = r === s.value;
    return /* @__PURE__ */ l(
      ao,
      {
        asChild: !0,
        ...i,
        focusable: !o,
        active: d,
        children: /* @__PURE__ */ l(
          F.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": u,
            "data-state": d ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: c,
            ...a,
            ref: t,
            onMouseDown: I(e.onMouseDown, (m) => {
              !o && m.button === 0 && m.ctrlKey === !1 ? s.onValueChange(r) : m.preventDefault();
            }),
            onKeyDown: I(e.onKeyDown, (m) => {
              [" ", "Enter"].includes(m.key) && s.onValueChange(r);
            }),
            onFocus: I(e.onFocus, () => {
              const m = s.activationMode !== "manual";
              !d && !o && m && s.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
em.displayName = Jf;
var tm = "TabsContent", nm = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...s } = e, i = _i(tm, n), c = rm(i.baseId, r), u = om(i.baseId, r), d = r === i.value, m = f.useRef(d);
    return f.useEffect(() => {
      const p = requestAnimationFrame(() => m.current = !1);
      return () => cancelAnimationFrame(p);
    }, []), /* @__PURE__ */ l(ve, { present: o || d, children: ({ present: p }) => /* @__PURE__ */ l(
      F.div,
      {
        "data-state": d ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !p,
        id: u,
        tabIndex: 0,
        ...s,
        ref: t,
        style: {
          ...e.style,
          animationDuration: m.current ? "0s" : void 0
        },
        children: p && a
      }
    ) });
  }
);
nm.displayName = tm;
function rm(e, t) {
  return `${e}-trigger-${t}`;
}
function om(e, t) {
  return `${e}-content-${t}`;
}
var TS = Xf, AS = Qf, OS = em, IS = nm, am = "Toggle", Di = f.forwardRef((e, t) => {
  const { pressed: n, defaultPressed: r, onPressedChange: o, ...a } = e, [s, i] = we({
    prop: n,
    onChange: o,
    defaultProp: r ?? !1,
    caller: am
  });
  return /* @__PURE__ */ l(
    F.button,
    {
      type: "button",
      "aria-pressed": s,
      "data-state": s ? "on" : "off",
      "data-disabled": e.disabled ? "" : void 0,
      ...a,
      ref: t,
      onClick: I(e.onClick, () => {
        e.disabled || i(!s);
      })
    }
  );
});
Di.displayName = am;
var zS = Di, Et = "ToggleGroup", [im, LE] = he(Et, [
  St
]), sm = St(), Ti = O.forwardRef((e, t) => {
  const { type: n, ...r } = e;
  if (n === "single")
    return /* @__PURE__ */ l(LS, { ...r, ref: t });
  if (n === "multiple")
    return /* @__PURE__ */ l($S, { ...r, ref: t });
  throw new Error(`Missing prop \`type\` expected on \`${Et}\``);
});
Ti.displayName = Et;
var [lm, cm] = im(Et), LS = O.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = we({
    prop: n,
    defaultProp: r ?? "",
    onChange: o,
    caller: Et
  });
  return /* @__PURE__ */ l(
    lm,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: O.useMemo(() => s ? [s] : [], [s]),
      onItemActivate: i,
      onItemDeactivate: O.useCallback(() => i(""), [i]),
      children: /* @__PURE__ */ l(dm, { ...a, ref: t })
    }
  );
}), $S = O.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = we({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Et
  }), c = O.useCallback(
    (d) => i((m = []) => [...m, d]),
    [i]
  ), u = O.useCallback(
    (d) => i((m = []) => m.filter((p) => p !== d)),
    [i]
  );
  return /* @__PURE__ */ l(
    lm,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: s,
      onItemActivate: c,
      onItemDeactivate: u,
      children: /* @__PURE__ */ l(dm, { ...a, ref: t })
    }
  );
});
Ti.displayName = Et;
var [FS, WS] = im(Et), dm = O.forwardRef(
  (e, t) => {
    const {
      __scopeToggleGroup: n,
      disabled: r = !1,
      rovingFocus: o = !0,
      orientation: a,
      dir: s,
      loop: i = !0,
      ...c
    } = e, u = sm(n), d = ut(s), m = { role: "group", dir: d, ...c };
    return /* @__PURE__ */ l(FS, { scope: n, rovingFocus: o, disabled: r, children: o ? /* @__PURE__ */ l(
      oo,
      {
        asChild: !0,
        ...u,
        orientation: a,
        dir: d,
        loop: i,
        children: /* @__PURE__ */ l(F.div, { ...m, ref: t })
      }
    ) : /* @__PURE__ */ l(F.div, { ...m, ref: t }) });
  }
), Ir = "ToggleGroupItem", um = O.forwardRef(
  (e, t) => {
    const n = cm(Ir, e.__scopeToggleGroup), r = WS(Ir, e.__scopeToggleGroup), o = sm(e.__scopeToggleGroup), a = n.value.includes(e.value), s = r.disabled || e.disabled, i = { ...e, pressed: a, disabled: s }, c = O.useRef(null);
    return r.rovingFocus ? /* @__PURE__ */ l(
      ao,
      {
        asChild: !0,
        ...o,
        focusable: !s,
        active: a,
        ref: c,
        children: /* @__PURE__ */ l(Ps, { ...i, ref: t })
      }
    ) : /* @__PURE__ */ l(Ps, { ...i, ref: t });
  }
);
um.displayName = Ir;
var Ps = O.forwardRef(
  (e, t) => {
    const { __scopeToggleGroup: n, value: r, ...o } = e, a = cm(Ir, n), s = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, i = a.type === "single" ? s : void 0;
    return /* @__PURE__ */ l(
      Di,
      {
        ...i,
        ...o,
        ref: t,
        onPressedChange: (c) => {
          c ? a.onItemActivate(r) : a.onItemDeactivate(r);
        }
      }
    );
  }
), BS = Ti, VS = um, [Co, $E] = he("Tooltip", [
  et
]), So = et(), fm = "TooltipProvider", HS = 700, Ea = "tooltip.open", [GS, Ai] = Co(fm), mm = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = HS,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = f.useRef(!0), i = f.useRef(!1), c = f.useRef(0);
  return f.useEffect(() => {
    const u = c.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ l(
    GS,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: f.useCallback(() => {
        window.clearTimeout(c.current), s.current = !1;
      }, []),
      onClose: f.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => s.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: f.useCallback((u) => {
        i.current = u;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
mm.displayName = fm;
var An = "Tooltip", [YS, Zn] = Co(An), pm = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, c = Ai(An, e.__scopeTooltip), u = So(t), [d, m] = f.useState(null), p = ge(), h = f.useRef(0), v = s ?? c.disableHoverableContent, g = i ?? c.delayDuration, b = f.useRef(!1), [y, w] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (P) => {
      P ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Ea))) : c.onClose(), a == null || a(P);
    },
    caller: An
  }), x = f.useMemo(() => y ? b.current ? "delayed-open" : "instant-open" : "closed", [y]), k = f.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b.current = !1, w(!0);
  }, [w]), C = f.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, w(!1);
  }, [w]), R = f.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      b.current = !0, w(!0), h.current = 0;
    }, g);
  }, [g, w]);
  return f.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ l(pn, { ...u, children: /* @__PURE__ */ l(
    YS,
    {
      scope: t,
      contentId: p,
      open: y,
      stateAttribute: x,
      trigger: d,
      onTriggerChange: m,
      onTriggerEnter: f.useCallback(() => {
        c.isOpenDelayedRef.current ? R() : k();
      }, [c.isOpenDelayedRef, R, k]),
      onTriggerLeave: f.useCallback(() => {
        v ? C() : (window.clearTimeout(h.current), h.current = 0);
      }, [C, v]),
      onOpen: k,
      onClose: C,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
pm.displayName = An;
var Ma = "TooltipTrigger", hm = f.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Zn(Ma, n), a = Ai(Ma, n), s = So(n), i = f.useRef(null), c = Q(t, i, o.onTriggerChange), u = f.useRef(!1), d = f.useRef(!1), m = f.useCallback(() => u.current = !1, []);
    return f.useEffect(() => () => document.removeEventListener("pointerup", m), [m]), /* @__PURE__ */ l(hn, { asChild: !0, ...s, children: /* @__PURE__ */ l(
      F.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: I(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !d.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: I(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: I(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", m, { once: !0 });
        }),
        onFocus: I(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: I(e.onBlur, o.onClose),
        onClick: I(e.onClick, o.onClose)
      }
    ) });
  }
);
hm.displayName = Ma;
var Oi = "TooltipPortal", [US, jS] = Co(Oi, {
  forceMount: void 0
}), gm = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = Zn(Oi, t);
  return /* @__PURE__ */ l(US, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Vt, { asChild: !0, container: o, children: r }) }) });
};
gm.displayName = Oi;
var ln = "TooltipContent", vm = f.forwardRef(
  (e, t) => {
    const n = jS(ln, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = Zn(ln, e.__scopeTooltip);
    return /* @__PURE__ */ l(ve, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ l(bm, { side: o, ...a, ref: t }) : /* @__PURE__ */ l(KS, { side: o, ...a, ref: t }) });
  }
), KS = f.forwardRef((e, t) => {
  const n = Zn(ln, e.__scopeTooltip), r = Ai(ln, e.__scopeTooltip), o = f.useRef(null), a = Q(t, o), [s, i] = f.useState(null), { trigger: c, onClose: u } = n, d = o.current, { onPointerInTransitChange: m } = r, p = f.useCallback(() => {
    i(null), m(!1);
  }, [m]), h = f.useCallback(
    (v, g) => {
      const b = v.currentTarget, y = { x: v.clientX, y: v.clientY }, w = QS(y, b.getBoundingClientRect()), x = JS(y, w), k = e0(g.getBoundingClientRect()), C = n0([...x, ...k]);
      i(C), m(!0);
    },
    [m]
  );
  return f.useEffect(() => () => p(), [p]), f.useEffect(() => {
    if (c && d) {
      const v = (b) => h(b, d), g = (b) => h(b, c);
      return c.addEventListener("pointerleave", v), d.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", v), d.removeEventListener("pointerleave", g);
      };
    }
  }, [c, d, h, p]), f.useEffect(() => {
    if (s) {
      const v = (g) => {
        const b = g.target, y = { x: g.clientX, y: g.clientY }, w = (c == null ? void 0 : c.contains(b)) || (d == null ? void 0 : d.contains(b)), x = !t0(y, s);
        w ? p() : x && (p(), u());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, d, s, u, p]), /* @__PURE__ */ l(bm, { ...e, ref: a });
}), [qS, XS] = Co(An, { isInside: !1 }), ZS = /* @__PURE__ */ Cl("TooltipContent"), bm = f.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, c = Zn(ln, n), u = So(n), { onClose: d } = c;
    return f.useEffect(() => (document.addEventListener(Ea, d), () => document.removeEventListener(Ea, d)), [d]), f.useEffect(() => {
      if (c.trigger) {
        const m = (p) => {
          const h = p.target;
          h != null && h.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", m, { capture: !0 }), () => window.removeEventListener("scroll", m, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ l(
      Bt,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (m) => m.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ D(
          Gn,
          {
            "data-state": c.stateAttribute,
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
              /* @__PURE__ */ l(ZS, { children: r }),
              /* @__PURE__ */ l(qS, { scope: n, isInside: !0, children: /* @__PURE__ */ l(tg, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
vm.displayName = ln;
var ym = "TooltipArrow", wm = f.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = So(n);
    return XS(
      ym,
      n
    ).isInside ? null : /* @__PURE__ */ l(Yn, { ...o, ...r, ref: t });
  }
);
wm.displayName = ym;
function QS(e, t) {
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
function JS(e, t, n = 5) {
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
function e0(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function t0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], u = i.x, d = i.y, m = c.x, p = c.y;
    d > r != p > r && n < (m - u) * (r - d) / (p - d) + u && (o = !o);
  }
  return o;
}
function n0(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), r0(t);
}
function r0(e) {
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
var o0 = mm, a0 = pm, i0 = hm, s0 = gm, l0 = vm, c0 = wm;
function FE({
  ...e
}) {
  return /* @__PURE__ */ l(Pg, { "data-slot": "accordion", ...e });
}
function WE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Eg,
    {
      "data-slot": "accordion-item",
      className: S("border-b last:border-b-0", e),
      ...t
    }
  );
}
function BE({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ l(Mg, { className: "flex", children: /* @__PURE__ */ D(
    _g,
    {
      "data-slot": "accordion-trigger",
      className: S(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Br, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function VE({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    Dg,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...n,
      children: /* @__PURE__ */ l("div", { className: S("pt-0 pb-4", e), children: t })
    }
  );
}
const Es = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ms = ol, Ne = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ms(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((u) => {
    const d = n == null ? void 0 : n[u], m = a == null ? void 0 : a[u];
    if (d === null) return null;
    const p = Es(d) || Es(m);
    return o[u][p];
  }), i = n && Object.entries(n).reduce((u, d) => {
    let [m, p] = d;
    return p === void 0 || (u[m] = p), u;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, d) => {
    let { class: m, className: p, ...h } = d;
    return Object.entries(h).every((v) => {
      let [g, b] = v;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...i
      }[g]) : {
        ...a,
        ...i
      }[g] === b;
    }) ? [
      ...u,
      m,
      p
    ] : u;
  }, []);
  return Ms(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, d0 = Ne(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function HE({
  className: e,
  variant: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: S(d0({ variant: t }), e),
      ...n
    }
  );
}
function GE({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-title",
      className: S(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        e
      ),
      ...t
    }
  );
}
function YE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-description",
      className: S(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        e
      ),
      ...t
    }
  );
}
const zr = Ne(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Qn({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ l(
    r ? Ln : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      className: S(zr({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function UE({
  ...e
}) {
  return /* @__PURE__ */ l(Qv, { "data-slot": "alert-dialog", ...e });
}
function jE({
  ...e
}) {
  return /* @__PURE__ */ l(Jv, { "data-slot": "alert-dialog-trigger", ...e });
}
function u0({
  ...e
}) {
  return /* @__PURE__ */ l(eb, { "data-slot": "alert-dialog-portal", ...e });
}
function f0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    tb,
    {
      "data-slot": "alert-dialog-overlay",
      className: S(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function KE({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ D(u0, { children: [
    /* @__PURE__ */ l(f0, {}),
    /* @__PURE__ */ l(
      nb,
      {
        "data-slot": "alert-dialog-content",
        "data-size": t,
        className: S(
          "group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
          e
        ),
        ...n
      }
    )
  ] });
}
function qE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: S(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        e
      ),
      ...t
    }
  );
}
function XE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: S(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        e
      ),
      ...t
    }
  );
}
function ZE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ab,
    {
      "data-slot": "alert-dialog-title",
      className: S(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        e
      ),
      ...t
    }
  );
}
function QE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ib,
    {
      "data-slot": "alert-dialog-description",
      className: S("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function JE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: S(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        e
      ),
      ...t
    }
  );
}
function eM({
  className: e,
  variant: t = "default",
  size: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(Qn, { variant: t, size: n, asChild: !0, children: /* @__PURE__ */ l(
    rb,
    {
      "data-slot": "alert-dialog-action",
      className: S(e),
      ...r
    }
  ) });
}
function tM({
  className: e,
  variant: t = "outline",
  size: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(Qn, { variant: t, size: n, asChild: !0, children: /* @__PURE__ */ l(
    ob,
    {
      "data-slot": "alert-dialog-cancel",
      className: S(e),
      ...r
    }
  ) });
}
function nM({
  ...e
}) {
  return /* @__PURE__ */ l(lb, { "data-slot": "aspect-ratio", ...e });
}
function rM({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    bb,
    {
      "data-slot": "avatar",
      "data-size": t,
      className: S(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        e
      ),
      ...n
    }
  );
}
function oM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    yb,
    {
      "data-slot": "avatar-image",
      className: S("aspect-square size-full", e),
      ...t
    }
  );
}
function aM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    wb,
    {
      "data-slot": "avatar-fallback",
      className: S(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        e
      ),
      ...t
    }
  );
}
const m0 = Ne(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-lg border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "bg-destructive text-white [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent/50",
        ghost: "text-foreground [a&]:hover:bg-accent",
        link: "text-foreground underline-offset-4 [a&]:hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function qo({
  className: e,
  variant: t = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ l(
    n ? Ln : "span",
    {
      "data-slot": "badge",
      "data-variant": t,
      className: S(m0({ variant: t }), e),
      ...r
    }
  );
}
function iM({ ...e }) {
  return /* @__PURE__ */ l("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...e });
}
function sM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: S(
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
        e
      ),
      ...t
    }
  );
}
function lM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: S("inline-flex items-center gap-1.5", e),
      ...t
    }
  );
}
function cM({
  asChild: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    e ? Ln : "a",
    {
      "data-slot": "breadcrumb-link",
      className: S("transition-colors hover:text-foreground", t),
      ...n
    }
  );
}
function dM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: S("font-normal text-foreground", e),
      ...t
    }
  );
}
function uM({
  children: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: S("[&>svg]:size-3.5", t),
      ...n,
      children: e ?? /* @__PURE__ */ l(zn, {})
    }
  );
}
function fM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ D(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: S("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ l(yl, { className: "size-4" }),
        /* @__PURE__ */ l("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
function p0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    Vh,
    {
      role: "status",
      "aria-label": "Loading",
      className: S("size-4 animate-spin", e),
      ...t
    }
  );
}
const h0 = Ne(
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
function Oe({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  loading: o = !1,
  disabled: a,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ l(
    r ? Ln : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      disabled: o || a,
      className: S(h0({ variant: t, size: n, className: e })),
      ...i,
      children: o ? /* @__PURE__ */ D(ke, { children: [
        /* @__PURE__ */ l(p0, { className: "opacity-100" }),
        /* @__PURE__ */ l("span", { className: "opacity-64", children: s })
      ] }) : s
    }
  );
}
function xm({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Mf,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: S(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
const g0 = Ne(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function mM({
  className: e,
  orientation: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": t,
      className: S(g0({ orientation: t }), e),
      ...n
    }
  );
}
function pM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card",
      className: S(
        "relative flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        e
      ),
      ...t
    }
  );
}
function hM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-header",
      className: S(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        e
      ),
      ...t
    }
  );
}
function gM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-title",
      className: S("leading-none font-semibold", e),
      ...t
    }
  );
}
function vM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-description",
      className: S("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function bM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-action",
      className: S(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        e
      ),
      ...t
    }
  );
}
function yM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-content",
      className: S("px-6", e),
      ...t
    }
  );
}
function wM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-footer",
      className: S("flex items-center px-6 [.border-t]:pt-6", e),
      ...t
    }
  );
}
function xM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Lc,
    {
      "data-slot": "checkbox",
      className: S(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        Fc,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ l(at, { className: "size-3.5" })
        }
      )
    }
  );
}
function CM({
  ...e
}) {
  return /* @__PURE__ */ l(Ml, { "data-slot": "collapsible", ...e });
}
function SM({
  ...e
}) {
  return /* @__PURE__ */ l(
    Ha,
    {
      "data-slot": "collapsible-trigger",
      ...e
    }
  );
}
function kM({
  ...e
}) {
  return /* @__PURE__ */ l(
    Ya,
    {
      "data-slot": "collapsible-content",
      ...e
    }
  );
}
function NM({
  ...e
}) {
  return /* @__PURE__ */ l(qr, { "data-slot": "dialog", ...e });
}
function RM({
  ...e
}) {
  return /* @__PURE__ */ l(Ja, { "data-slot": "dialog-trigger", ...e });
}
function v0({
  ...e
}) {
  return /* @__PURE__ */ l(Xr, { "data-slot": "dialog-portal", ...e });
}
function PM({
  ...e
}) {
  return /* @__PURE__ */ l(Ht, { "data-slot": "dialog-close", ...e });
}
function b0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Zr,
    {
      "data-slot": "dialog-overlay",
      className: S(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function EM({
  className: e,
  children: t,
  showCloseButton: n = !0,
  ...r
}) {
  return /* @__PURE__ */ D(v0, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ l(b0, {}),
    /* @__PURE__ */ D(
      Qr,
      {
        "data-slot": "dialog-content",
        className: S(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          e
        ),
        ...r,
        children: [
          t,
          n && /* @__PURE__ */ D(
            Ht,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ l(Ba, {}),
                /* @__PURE__ */ l("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function MM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "dialog-header",
      className: S("flex flex-col gap-2 text-center sm:text-left", e),
      ...t
    }
  );
}
function _M({
  className: e,
  showCloseButton: t = !1,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ D(
    "div",
    {
      "data-slot": "dialog-footer",
      className: S(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        e
      ),
      ...r,
      children: [
        n,
        t && /* @__PURE__ */ l(Ht, { asChild: !0, children: /* @__PURE__ */ l(Qn, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function DM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ei,
    {
      "data-slot": "dialog-title",
      className: S("text-lg leading-none font-semibold", e),
      ...t
    }
  );
}
function TM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ti,
    {
      "data-slot": "dialog-description",
      className: S("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function y0({
  ...e
}) {
  return /* @__PURE__ */ l(ox, { "data-slot": "dropdown-menu", ...e });
}
function AM({
  ...e
}) {
  return /* @__PURE__ */ l(ru, { "data-slot": "dropdown-menu-portal", ...e });
}
function w0({
  ...e
}) {
  return /* @__PURE__ */ l(
    ax,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function x0({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ l(ru, { children: /* @__PURE__ */ l(
    ix,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: S(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function C0({
  ...e
}) {
  return /* @__PURE__ */ l(sx, { "data-slot": "dropdown-menu-group", ...e });
}
function Zt({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(
    cx,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: S(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        e
      ),
      ...r
    }
  );
}
function S0({
  className: e,
  children: t,
  checked: n,
  ...r
}) {
  return /* @__PURE__ */ D(
    dx,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: S(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ l("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ l(ou, { children: /* @__PURE__ */ l(at, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function OM({
  ...e
}) {
  return /* @__PURE__ */ l(
    ux,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...e
    }
  );
}
function IM({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ D(
    fx,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: S(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ l(ou, { children: /* @__PURE__ */ l(bl, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function k0({
  className: e,
  inset: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    lx,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: S(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...n
    }
  );
}
function mr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    mx,
    {
      "data-slot": "dropdown-menu-separator",
      className: S("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function zM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: S(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function N0({
  ...e
}) {
  return /* @__PURE__ */ l(px, { "data-slot": "dropdown-menu-sub", ...e });
}
function R0({
  className: e,
  inset: t,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ D(
    hx,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: S(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ l(zn, { className: "ml-auto size-4" })
      ]
    }
  );
}
function P0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    gx,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: S(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...t
    }
  );
}
function LM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty",
      className: S(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        e
      ),
      ...t
    }
  );
}
function $M({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-header",
      className: S(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        e
      ),
      ...t
    }
  );
}
const E0 = Ne(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function FM({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": t,
      className: S(E0({ variant: t, className: e })),
      ...n
    }
  );
}
function WM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-title",
      className: S("text-lg font-medium tracking-tight", e),
      ...t
    }
  );
}
function BM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-description",
      className: S(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function VM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-content",
      className: S(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        e
      ),
      ...t
    }
  );
}
function M0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    iu,
    {
      "data-slot": "label",
      className: S(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function HM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "fieldset",
    {
      "data-slot": "field-set",
      className: S(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        e
      ),
      ...t
    }
  );
}
function GM({
  className: e,
  variant: t = "legend",
  ...n
}) {
  return /* @__PURE__ */ l(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": t,
      className: S(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        e
      ),
      ...n
    }
  );
}
function YM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field-group",
      className: S(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        e
      ),
      ...t
    }
  );
}
const _0 = Ne(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function UM({
  className: e,
  orientation: t = "vertical",
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": t,
      className: S(_0({ orientation: t }), e),
      ...n
    }
  );
}
function jM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field-content",
      className: S(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        e
      ),
      ...t
    }
  );
}
function KM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    M0,
    {
      "data-slot": "field-label",
      className: S(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        e
      ),
      ...t
    }
  );
}
function qM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field-label",
      className: S(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        e
      ),
      ...t
    }
  );
}
function XM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "p",
    {
      "data-slot": "field-description",
      className: S(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function ZM({
  children: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ D(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!e,
      className: S(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ l(xm, { className: "absolute inset-0 top-1/2" }),
        e && /* @__PURE__ */ l(
          "span",
          {
            className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
            "data-slot": "field-separator-content",
            children: e
          }
        )
      ]
    }
  );
}
function QM({
  className: e,
  children: t,
  errors: n,
  ...r
}) {
  const o = Ot(() => {
    var s;
    if (t)
      return t;
    if (!(n != null && n.length))
      return null;
    const a = [
      ...new Map(n.map((i) => [i == null ? void 0 : i.message, i])).values()
    ];
    return (a == null ? void 0 : a.length) == 1 ? (s = a[0]) == null ? void 0 : s.message : /* @__PURE__ */ l("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: a.map(
      (i, c) => (i == null ? void 0 : i.message) && /* @__PURE__ */ l("li", { children: i.message }, c)
    ) });
  }, [t, n]);
  return o ? /* @__PURE__ */ l(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: S("text-sm font-normal text-destructive", e),
      ...r,
      children: o
    }
  ) : null;
}
function JM({
  ...e
}) {
  return /* @__PURE__ */ l(Nx, { "data-slot": "hover-card", ...e });
}
function e_({
  ...e
}) {
  return /* @__PURE__ */ l(Rx, { "data-slot": "hover-card-trigger", ...e });
}
function t_({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(Px, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ l(
    Ex,
    {
      "data-slot": "hover-card-content",
      align: t,
      sideOffset: n,
      className: S(
        "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
const D0 = Ne(
  "flex rounded-lg border border-input bg-background shadow-xs/5 ring-ring/24 text-base transition-[color,box-shadow] has-focus-visible:border-ring has-focus-visible:ring-[3px] has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 dark:bg-input/32 dark:has-aria-invalid:ring-destructive/40 sm:text-sm",
  {
    variants: {
      size: {
        default: "",
        sm: "text-sm sm:text-xs",
        lg: "text-base"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), T0 = Ne(
  "w-full min-w-0 rounded-[inherit] bg-transparent outline-none placeholder:text-muted-foreground/72 file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground selection:bg-primary selection:text-primary-foreground",
  {
    variants: {
      size: {
        default: "h-8.5 px-[calc(--spacing(3)-1px)] leading-8.5 sm:h-7.5 sm:leading-7.5",
        sm: "h-7.5 px-[calc(--spacing(2.5)-1px)] leading-7.5 sm:h-6.5 sm:leading-6.5",
        lg: "h-9.5 px-[calc(--spacing(3.5)-1px)] leading-9.5 sm:h-8.5 sm:leading-8.5"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
function Lr({
  className: e,
  type: t,
  size: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(
    "span",
    {
      "data-slot": "input-wrapper",
      className: S(D0({ size: n }), e),
      children: /* @__PURE__ */ l(
        "input",
        {
          type: t,
          "data-slot": "input",
          className: S(T0({ size: n })),
          ...r
        }
      )
    }
  );
}
function A0({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: S(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...n
    }
  );
}
function O0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "textarea",
    {
      "data-slot": "textarea",
      className: S(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t
    }
  );
}
function n_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: S(
        "group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
        "h-9 min-w-0 has-[>textarea]:h-auto",
        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",
        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        e
      ),
      ...t
    }
  );
}
const I0 = Ne(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        "block-end": "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function r_({
  className: e,
  align: t = "inline-start",
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": t,
      className: S(I0({ align: t }), e),
      onClick: (r) => {
        var o, a;
        r.target.closest("button") || (a = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || a.focus();
      },
      ...n
    }
  );
}
const z0 = Ne(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
function o_({
  className: e,
  type: t = "button",
  variant: n = "ghost",
  size: r = "xs",
  ...o
}) {
  return /* @__PURE__ */ l(
    Qn,
    {
      type: t,
      "data-size": r,
      variant: n,
      className: S(z0({ size: r }), e),
      ...o
    }
  );
}
function a_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "span",
    {
      className: S(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...t
    }
  );
}
function i_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    A0,
    {
      "data-slot": "input-group-control",
      className: S(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        e
      ),
      ...t
    }
  );
}
function s_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    O0,
    {
      "data-slot": "input-group-control",
      className: S(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        e
      ),
      ...t
    }
  );
}
function l_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: S("group/item-group flex flex-col", e),
      ...t
    }
  );
}
function c_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xm,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: S("my-0", e),
      ...t
    }
  );
}
const L0 = Ne(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function d_({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ l(
    r ? Ln : "div",
    {
      "data-slot": "item",
      "data-variant": t,
      "data-size": n,
      className: S(L0({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
const $0 = Ne(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function u_({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": t,
      className: S($0({ variant: t, className: e })),
      ...n
    }
  );
}
function f_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-content",
      className: S(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        e
      ),
      ...t
    }
  );
}
function m_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-title",
      className: S(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        e
      ),
      ...t
    }
  );
}
function p_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "p",
    {
      "data-slot": "item-description",
      className: S(
        "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function h_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-actions",
      className: S("flex items-center gap-2", e),
      ...t
    }
  );
}
function g_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-header",
      className: S(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
function v_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-footer",
      className: S(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
function b_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "kbd",
    {
      "data-slot": "kbd",
      className: S(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        e
      ),
      ...t
    }
  );
}
function Xo({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    iu,
    {
      "data-slot": "label",
      className: S(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function y_({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ D(
    "div",
    {
      className: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
      "data-slot": "native-select-wrapper",
      children: [
        /* @__PURE__ */ l(
          "select",
          {
            "data-slot": "native-select",
            "data-size": t,
            className: S(
              "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              e
            ),
            ...n
          }
        ),
        /* @__PURE__ */ l(
          Br,
          {
            className: "pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none",
            "aria-hidden": "true",
            "data-slot": "native-select-icon"
          }
        )
      ]
    }
  );
}
function w_({ ...e }) {
  return /* @__PURE__ */ l("option", { "data-slot": "native-select-option", ...e });
}
function x_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "optgroup",
    {
      "data-slot": "native-select-optgroup",
      className: S(e),
      ...t
    }
  );
}
function C_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: S("mx-auto flex w-full justify-center", e),
      ...t
    }
  );
}
function S_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "ul",
    {
      "data-slot": "pagination-content",
      className: S("flex flex-row items-center gap-1", e),
      ...t
    }
  );
}
function k_({ ...e }) {
  return /* @__PURE__ */ l("li", { "data-slot": "pagination-item", ...e });
}
function Cm({
  className: e,
  isActive: t,
  size: n = "icon",
  ...r
}) {
  return /* @__PURE__ */ l(
    "a",
    {
      "aria-current": t ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": t,
      className: S(
        zr({
          variant: t ? "outline" : "ghost",
          size: n
        }),
        e
      ),
      ...r
    }
  );
}
function N_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ D(
    Cm,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: S("gap-1 px-2.5 sm:pl-2.5", e),
      ...t,
      children: [
        /* @__PURE__ */ l(Fa, {}),
        /* @__PURE__ */ l("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function R_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ D(
    Cm,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: S("gap-1 px-2.5 sm:pr-2.5", e),
      ...t,
      children: [
        /* @__PURE__ */ l("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ l(zn, {})
      ]
    }
  );
}
function P_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ D(
    "span",
    {
      "aria-hidden": !0,
      "data-slot": "pagination-ellipsis",
      className: S("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ l(yl, { className: "size-4" }),
        /* @__PURE__ */ l("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
function ko({
  ...e
}) {
  return /* @__PURE__ */ l(Fx, { "data-slot": "popover", ...e });
}
function No({
  ...e
}) {
  return /* @__PURE__ */ l(Wx, { "data-slot": "popover-trigger", ...e });
}
function Ro({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(Bx, { children: /* @__PURE__ */ l(
    Vx,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: S(
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
function E_({
  className: e,
  value: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    qx,
    {
      "data-slot": "progress",
      className: S(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        e
      ),
      ...n,
      children: /* @__PURE__ */ l(
        Xx,
        {
          "data-slot": "progress-indicator",
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (t || 0)}%)` }
        }
      )
    }
  );
}
function M_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    iC,
    {
      "data-slot": "radio-group",
      className: S("grid gap-3", e),
      ...t
    }
  );
}
function __({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    sC,
    {
      "data-slot": "radio-group-item",
      className: S(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        lC,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ l(bl, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}
function D_({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ D(
    Xu,
    {
      "data-slot": "scroll-area",
      className: S("relative", e),
      ...n,
      children: [
        /* @__PURE__ */ l(
          Zu,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children: t
          }
        ),
        /* @__PURE__ */ l(F0, {}),
        /* @__PURE__ */ l(wC, {})
      ]
    }
  );
}
function F0({
  className: e,
  orientation: t = "vertical",
  ...n
}) {
  return /* @__PURE__ */ l(
    _r,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation: t,
      className: S(
        "flex touch-none p-px transition-colors select-none",
        t === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        e
      ),
      ...n,
      children: /* @__PURE__ */ l(
        Tr,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}
function W0({
  ...e
}) {
  return /* @__PURE__ */ l(BC, { "data-slot": "select", ...e });
}
function T_({
  ...e
}) {
  return /* @__PURE__ */ l(KC, { "data-slot": "select-group", ...e });
}
function B0({
  ...e
}) {
  return /* @__PURE__ */ l(HC, { "data-slot": "select-value", ...e });
}
function V0({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ D(
    VC,
    {
      "data-slot": "select-trigger",
      className: S(
        "flex w-fit min-h-9 sm:min-h-8 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-base sm:text-sm whitespace-nowrap shadow-xs/5 ring-ring/24 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/32 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(GC, { asChild: !0, children: /* @__PURE__ */ l(gl, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function H0({
  className: e,
  children: t,
  position: n = "item-aligned",
  align: r = "center",
  ...o
}) {
  return /* @__PURE__ */ l(YC, { children: /* @__PURE__ */ D(
    UC,
    {
      "data-slot": "select-content",
      className: S(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border bg-popover text-popover-foreground shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      align: r,
      ...o,
      children: [
        /* @__PURE__ */ l(Y0, {}),
        /* @__PURE__ */ l(
          jC,
          {
            className: S(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(U0, {})
      ]
    }
  ) });
}
function A_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    qC,
    {
      "data-slot": "select-label",
      className: S("px-2 py-1.5 text-xs text-muted-foreground", e),
      ...t
    }
  );
}
function G0({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ D(
    XC,
    {
      "data-slot": "select-item",
      className: S(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm min-h-8 sm:min-h-7 py-1.5 pr-8 pl-2 text-base sm:text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ l(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ l(QC, { children: /* @__PURE__ */ l(at, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ l(ZC, { children: t })
      ]
    }
  );
}
function O_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    tS,
    {
      "data-slot": "select-separator",
      className: S("pointer-events-none -mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function Y0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    JC,
    {
      "data-slot": "select-scroll-up-button",
      className: S(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(Dh, { className: "size-4" })
    }
  );
}
function U0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    eS,
    {
      "data-slot": "select-scroll-down-button",
      className: S(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(Br, { className: "size-4" })
    }
  );
}
function $r({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Mf,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: S(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
function I_({ ...e }) {
  return /* @__PURE__ */ l(qr, { "data-slot": "sheet", ...e });
}
function z_({
  ...e
}) {
  return /* @__PURE__ */ l(Ja, { "data-slot": "sheet-trigger", ...e });
}
function L_({
  ...e
}) {
  return /* @__PURE__ */ l(Ht, { "data-slot": "sheet-close", ...e });
}
function j0({
  ...e
}) {
  return /* @__PURE__ */ l(Xr, { "data-slot": "sheet-portal", ...e });
}
function K0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Zr,
    {
      "data-slot": "sheet-overlay",
      className: S(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function $_({
  className: e,
  children: t,
  side: n = "right",
  showCloseButton: r = !0,
  ...o
}) {
  return /* @__PURE__ */ D(j0, { children: [
    /* @__PURE__ */ l(K0, {}),
    /* @__PURE__ */ D(
      Qr,
      {
        "data-slot": "sheet-content",
        className: S(
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
          r && /* @__PURE__ */ D(Ht, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ l(Ba, { className: "size-4" }),
            /* @__PURE__ */ l("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function F_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "sheet-header",
      className: S("flex flex-col gap-1.5 p-4", e),
      ...t
    }
  );
}
function W_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "sheet-footer",
      className: S("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function B_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ei,
    {
      "data-slot": "sheet-title",
      className: S("font-semibold text-foreground", e),
      ...t
    }
  );
}
function V_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ti,
    {
      "data-slot": "sheet-description",
      className: S("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function ze({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "skeleton",
      className: S("animate-pulse rounded-md bg-accent", e),
      ...t
    }
  );
}
function q0({
  className: e,
  defaultValue: t,
  value: n,
  min: r = 0,
  max: o = 100,
  ...a
}) {
  const s = f.useMemo(
    () => Array.isArray(n) ? n : Array.isArray(t) ? t : [r, o],
    [n, t, r, o]
  );
  return /* @__PURE__ */ D(
    wS,
    {
      "data-slot": "slider",
      defaultValue: t,
      value: n,
      min: r,
      max: o,
      className: S(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ l(
          xS,
          {
            "data-slot": "slider-track",
            className: S(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ l(
              CS,
              {
                "data-slot": "slider-range",
                className: S(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: s.length }, (i, c) => /* @__PURE__ */ l(
          SS,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          c
        ))
      ]
    }
  );
}
function H_({
  className: e,
  label: t,
  description: n,
  card: r,
  ...o
}) {
  const a = /* @__PURE__ */ l(
    ES,
    {
      "data-slot": "switch",
      className: S(
        "peer inline-flex shrink-0 items-center [--thumb-size:--spacing(5)] sm:[--thumb-size:--spacing(4)] h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] rounded-full p-px transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-64 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        e
      ),
      ...o,
      children: /* @__PURE__ */ l(
        MS,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block aspect-square h-full rounded-(--thumb-size) bg-background shadow-sm/5 data-[state=checked]:translate-x-[calc(var(--thumb-size)-4px)] data-[state=unchecked]:translate-x-0 [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]"
        }
      )
    }
  );
  if (!t) return a;
  const s = !!n;
  return /* @__PURE__ */ D(
    "label",
    {
      "data-slot": "switch-field",
      className: S(
        "group/switch-field flex gap-3 select-none",
        s ? "items-start" : "items-center",
        r && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        o.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ l("div", { className: S(s && "pt-0.5"), children: a }),
        /* @__PURE__ */ D("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ l("span", { className: "text-sm font-medium leading-none", children: t }),
          n && /* @__PURE__ */ l("span", { className: "text-sm text-muted-foreground", children: n })
        ] })
      ]
    }
  );
}
function X0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ l(
        "table",
        {
          "data-slot": "table",
          className: S("w-full caption-bottom text-sm", e),
          ...t
        }
      )
    }
  );
}
function Z0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "thead",
    {
      "data-slot": "table-header",
      className: S("[&_tr]:border-b [&_tr]:border-border/40", e),
      ...t
    }
  );
}
function Q0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tbody",
    {
      "data-slot": "table-body",
      className: S("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function G_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: S(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        e
      ),
      ...t
    }
  );
}
function _s({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tr",
    {
      "data-slot": "table-row",
      className: S(
        "border-b border-border/40 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        e
      ),
      ...t
    }
  );
}
function J0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "th",
    {
      "data-slot": "table-head",
      className: S(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        e
      ),
      ...t
    }
  );
}
function ek({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "td",
    {
      "data-slot": "table-cell",
      className: S(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        e
      ),
      ...t
    }
  );
}
function Y_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "caption",
    {
      "data-slot": "table-caption",
      className: S("mt-4 text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function U_({
  className: e,
  orientation: t = "horizontal",
  ...n
}) {
  return /* @__PURE__ */ l(
    TS,
    {
      "data-slot": "tabs",
      "data-orientation": t,
      orientation: t,
      className: S(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        e
      ),
      ...n
    }
  );
}
const tk = Ne(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function j_({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    AS,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: S(tk({ variant: t }), e),
      ...n
    }
  );
}
function K_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    OS,
    {
      "data-slot": "tabs-trigger",
      className: S(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        e
      ),
      ...t
    }
  );
}
function q_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    IS,
    {
      "data-slot": "tabs-content",
      className: S("flex-1 outline-none", e),
      ...t
    }
  );
}
function X_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "textarea",
    {
      "data-slot": "textarea",
      className: S(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t
    }
  );
}
const nk = Ne(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Z_({
  className: e,
  variant: t,
  size: n,
  ...r
}) {
  return /* @__PURE__ */ l(
    zS,
    {
      "data-slot": "toggle",
      className: S(nk({ variant: t, size: n, className: e })),
      ...r
    }
  );
}
const rk = Ne(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Sm = f.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function Q_({
  className: e,
  variant: t,
  size: n,
  spacing: r = 0,
  children: o,
  ...a
}) {
  return /* @__PURE__ */ l(
    BS,
    {
      "data-slot": "toggle-group",
      "data-variant": t,
      "data-size": n,
      "data-spacing": r,
      style: { "--gap": r },
      className: S(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        e
      ),
      ...a,
      children: /* @__PURE__ */ l(Sm.Provider, { value: { variant: t, size: n, spacing: r }, children: o })
    }
  );
}
function J_({
  className: e,
  children: t,
  variant: n,
  size: r,
  ...o
}) {
  const a = f.useContext(Sm);
  return /* @__PURE__ */ l(
    VS,
    {
      "data-slot": "toggle-group-item",
      "data-variant": a.variant || n,
      "data-size": a.size || r,
      "data-spacing": a.spacing,
      className: S(
        rk({
          variant: a.variant || n,
          size: a.size || r
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        e
      ),
      ...o,
      children: t
    }
  );
}
function eD({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ l(
    o0,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function tD({
  ...e
}) {
  return /* @__PURE__ */ l(a0, { "data-slot": "tooltip", ...e });
}
function nD({
  ...e
}) {
  return /* @__PURE__ */ l(i0, { "data-slot": "tooltip-trigger", ...e });
}
function rD({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ l(s0, { children: /* @__PURE__ */ D(
    l0,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: S(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ l(c0, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
function Ds(e) {
  const t = e.columnDef.meta;
  if (typeof (t == null ? void 0 : t.headerTitle) == "string") return t.headerTitle;
  const n = e.columnDef.header;
  return typeof n == "string" ? n : String(e.id);
}
const km = el(void 0);
function be() {
  const e = tl(km);
  if (!e)
    throw new Error("useDataGrid must be used within a DataGridProvider");
  return e;
}
function ok({
  children: e,
  table: t,
  ...n
}) {
  var s, i;
  const r = t.getState(), o = ((s = n.tableLayout) == null ? void 0 : s.columnsResizeMode) ?? "onEnd";
  Fr(() => {
    var c;
    (c = n.tableLayout) != null && c.columnsResizable && (t.options.columnResizeMode = o);
  }, [(i = n.tableLayout) == null ? void 0 : i.columnsResizable, o, t]);
  const a = Ot(
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
  return /* @__PURE__ */ l(km.Provider, { value: a, children: e });
}
function ak({
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
  return /* @__PURE__ */ l(ok, { table: t, ...o, children: e });
}
function ik({
  children: e,
  className: t,
  border: n = !0
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "data-grid",
      className: S(
        "w-full overflow-hidden",
        n && "border-border rounded-md border",
        t
      ),
      children: e
    }
  );
}
const sk = 24, lk = 12, pr = {
  hasVerticalOverflow: !1,
  headerHeight: 0,
  horizontalScrollbarSize: 0,
  thumbHeight: 0,
  thumbTop: 0,
  trackHeight: 0
};
function Zo(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Ts(e, t) {
  return e.hasVerticalOverflow === t.hasVerticalOverflow && e.headerHeight === t.headerHeight && e.horizontalScrollbarSize === t.horizontalScrollbarSize && e.thumbHeight === t.thumbHeight && e.thumbTop === t.thumbTop && e.trackHeight === t.trackHeight;
}
function As(e, t) {
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
function ck({
  children: e,
  className: t,
  orientation: n = "both",
  ...r
}) {
  var P;
  const { props: o } = be(), a = ot(null), s = ot(null), i = ot(null), c = ot(pr), u = ot({
    header: null,
    horizontalScrollbar: null,
    table: null,
    tableViewport: null
  }), d = n !== "vertical", m = n !== "horizontal", p = m && !!((P = o.tableLayout) != null && P.headerSticky), [h, v] = It(!1), g = Pe(() => {
    i.current = null, document.body.style.userSelect = "", document.body.style.webkitUserSelect = "";
  }, []), b = Pe(() => {
    const N = a.current;
    N && !Ts(pr, c.current) && (As(N, pr), c.current = pr), v((E) => E && !1);
  }, []), y = Pe(() => {
    const N = a.current, E = s.current;
    if (!N || !E || !p) {
      b();
      return;
    }
    const { header: A, horizontalScrollbar: z } = u.current, $ = (A == null ? void 0 : A.getBoundingClientRect().height) ?? 0, Y = E.clientHeight, G = E.clientWidth, K = E.scrollHeight, H = E.scrollWidth, M = d && H > G + 0.5 ? (z == null ? void 0 : z.offsetHeight) || lk : 0, T = Math.max(
      0,
      Y - $ - M
    ), Z = Math.max(0, K - Y);
    let ne;
    if (T === 0 || Z === 0)
      ne = {
        hasVerticalOverflow: !1,
        headerHeight: $,
        horizontalScrollbarSize: M,
        thumbHeight: T,
        thumbTop: 0,
        trackHeight: T
      };
    else {
      const _ = Math.max(
        T,
        K - $
      ), B = Zo(
        T * (T / _),
        sk,
        T
      ), W = Math.max(0, T - B), V = W > 0 ? E.scrollTop / Z * W : 0;
      ne = {
        hasVerticalOverflow: !0,
        headerHeight: $,
        horizontalScrollbarSize: M,
        thumbHeight: B,
        thumbTop: V,
        trackHeight: T
      };
    }
    Ts(ne, c.current) || (As(N, ne), c.current = ne), v(
      (_) => _ === ne.hasVerticalOverflow ? _ : ne.hasVerticalOverflow
    );
  }, [b, d, p]);
  Fr(() => {
    const N = a.current, E = s.current;
    if (!N || !E) return;
    if (!p) {
      b();
      return;
    }
    u.current = {
      header: N.querySelector(
        '[data-slot="data-grid-table"] thead'
      ),
      horizontalScrollbar: N.querySelector(
        '[data-slot="data-grid-scrollbar"][data-orientation="horizontal"]'
      ),
      table: N.querySelector(
        '[data-slot="data-grid-table"]'
      ),
      tableViewport: N.querySelector(
        '[data-slot="data-grid-table-viewport"]'
      )
    };
    let A = 0;
    const z = () => {
      cancelAnimationFrame(A), A = window.requestAnimationFrame(y);
    };
    z(), E.addEventListener("scroll", z, { passive: !0 });
    const $ = typeof ResizeObserver > "u" ? null : new ResizeObserver(z);
    return $ == null || $.observe(E), u.current.header && ($ == null || $.observe(u.current.header)), u.current.table && ($ == null || $.observe(u.current.table)), u.current.tableViewport && ($ == null || $.observe(u.current.tableViewport)), () => {
      cancelAnimationFrame(A), $ == null || $.disconnect(), E.removeEventListener("scroll", z), g();
    };
  }, [
    g,
    b,
    y,
    p
  ]);
  const w = (N) => {
    const E = s.current, { thumbHeight: A, trackHeight: z } = c.current;
    if (!E) return;
    const $ = Math.max(0, E.scrollHeight - E.clientHeight), Y = Math.max(0, z - A);
    if ($ === 0 || Y === 0) {
      E.scrollTop = 0;
      return;
    }
    const G = Zo(N, 0, Y) / Y;
    E.scrollTop = G * $;
  }, x = (N) => {
    const E = s.current;
    E && (N.preventDefault(), N.stopPropagation(), N.currentTarget.setPointerCapture(N.pointerId), i.current = {
      pointerId: N.pointerId,
      startScrollTop: E.scrollTop,
      startY: N.clientY
    }, document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }, k = (N) => {
    const E = s.current, A = i.current, { thumbHeight: z, trackHeight: $ } = c.current;
    if (!E || !A || A.pointerId !== N.pointerId)
      return;
    const Y = Math.max(0, $ - z), G = Math.max(0, E.scrollHeight - E.clientHeight);
    if (Y === 0 || G === 0) return;
    const K = N.clientY - A.startY, H = A.startScrollTop + K / Y * G;
    E.scrollTop = Zo(H, 0, G);
  }, C = (N) => {
    var E;
    ((E = i.current) == null ? void 0 : E.pointerId) === N.pointerId && g();
  }, R = (N) => {
    const { thumbHeight: E } = c.current;
    if (N.target !== N.currentTarget) return;
    N.preventDefault(), N.stopPropagation();
    const A = N.currentTarget.getBoundingClientRect(), z = N.clientY - A.top - E / 2;
    w(z);
  };
  return /* @__PURE__ */ D("div", { ref: a, className: "relative", children: [
    /* @__PURE__ */ D(
      Xu,
      {
        "data-slot": "data-grid-scroll-area",
        className: S("relative", t),
        ...r,
        children: [
          /* @__PURE__ */ l(
            Zu,
            {
              ref: s,
              "data-slot": "scroll-area-viewport",
              className: "focus-visible:ring-ring/50 rounded-md size-full transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
              children: /* @__PURE__ */ l("div", { "data-slot": "scroll-area-content", children: e })
            }
          ),
          d && /* @__PURE__ */ l(
            _r,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "horizontal",
              orientation: "horizontal",
              className: "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
              children: /* @__PURE__ */ l(
                Tr,
                {
                  "data-slot": "data-grid-thumb",
                  className: "bg-border rounded-full relative flex-1"
                }
              )
            }
          ),
          m && /* @__PURE__ */ l(
            _r,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "vertical",
              orientation: "vertical",
              className: S(
                "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
                p && "pointer-events-none opacity-0"
              ),
              children: /* @__PURE__ */ l(
                Tr,
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
    p && h && /* @__PURE__ */ l(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute right-0 top-(--data-grid-scrollbar-header-height) z-20 h-(--data-grid-scrollbar-track-height)",
        children: /* @__PURE__ */ l(
          "div",
          {
            className: "pointer-events-auto relative h-full w-3 touch-none p-px",
            onPointerDown: R,
            children: /* @__PURE__ */ l(
              "div",
              {
                className: S(
                  "bg-border absolute right-px w-2",
                  "top-(--data-grid-scrollbar-thumb-top) h-(--data-grid-scrollbar-thumb-height)",
                  "rounded-full"
                ),
                onLostPointerCapture: g,
                onPointerCancel: C,
                onPointerDown: x,
                onPointerMove: k,
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
function _a(e, t) {
  return e ? dk(e) ? /* @__PURE__ */ f.createElement(e, t) : e : null;
}
function dk(e) {
  return uk(e) || typeof e == "function" || fk(e);
}
function uk(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function fk(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
const mk = Ne("", {
  variants: {
    size: {
      dense: "px-2.5 h-9",
      default: "px-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), Nm = Ne("", {
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
function Rm(e) {
  const t = e.getIsPinned();
  return {
    left: t === "left" ? `${e.getStart("left")}px` : void 0,
    right: t === "right" ? `${e.getAfter("right")}px` : void 0,
    position: t ? "sticky" : "relative",
    width: e.getSize(),
    zIndex: t ? 1 : 0
  };
}
function Da(e, t) {
  if (e) {
    if (typeof e == "function") {
      e(t);
      return;
    }
    e.current = t;
  }
}
function Ta(e) {
  return "touches" in e;
}
function Qo(e) {
  var t, n;
  return Ta(e) ? ((t = e.touches[0]) == null ? void 0 : t.clientX) ?? ((n = e.changedTouches[0]) == null ? void 0 : n.clientX) : e.clientX;
}
function Os(e, t, n) {
  var C;
  const r = n.getColumn(t.column.id);
  if (!r || !r.getCanResize() || Ta(e) && e.touches.length > 1) return;
  (C = e.persist) == null || C.call(e);
  const o = e.currentTarget.ownerDocument, a = o.body.style.cursor, s = o.documentElement.style.cursor, i = t.getSize(), c = Qo(e), u = e.currentTarget.closest("th"), d = u == null ? void 0 : u.getBoundingClientRect(), m = d && Number.isFinite(
    n.options.columnResizeDirection === "rtl" ? d.left : d.right
  ) ? n.options.columnResizeDirection === "rtl" ? d.left : d.right : c;
  if (typeof c != "number" || typeof m != "number")
    return;
  o.body.style.cursor = "col-resize", o.documentElement.style.cursor = "col-resize";
  const p = t.getLeafHeaders().map(
    (R) => [R.column.id, R.column.getSize()]
  ), h = n.options.columnResizeDirection === "rtl" ? -1 : 1, v = (R, P = !1) => {
    if (typeof R != "number") return;
    let N = {};
    const E = (R - c) * h, A = Math.max(E / i, -0.999999);
    p.forEach(([z, $]) => {
      N[z] = Math.round(
        Math.max($ + $ * A, 0) * 100
      ) / 100;
    }), n.setColumnSizingInfo((z) => ({
      ...z,
      startOffset: m,
      startSize: i,
      deltaOffset: E,
      deltaPercentage: A,
      columnSizingStart: p,
      isResizingColumn: r.id
    })), P && n.setColumnSizing((z) => ({
      ...z,
      ...N
    }));
  }, g = (R) => {
    v(R, !0), n.setColumnSizingInfo((P) => ({
      ...P,
      isResizingColumn: !1,
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      columnSizingStart: []
    })), o.body.style.cursor = a, o.documentElement.style.cursor = s;
  }, b = (R) => {
    v(R.clientX);
  }, y = (R) => {
    o.removeEventListener("mousemove", b), o.removeEventListener("mouseup", y), g(R.clientX);
  }, w = (R) => {
    R.cancelable && (R.preventDefault(), R.stopPropagation()), v(Qo(R));
  }, x = (R) => {
    o.removeEventListener("touchmove", w), o.removeEventListener("touchend", x), R.cancelable && (R.preventDefault(), R.stopPropagation()), g(Qo(R));
  }, k = { passive: !1 };
  Ta(e) ? (o.addEventListener(
    "touchmove",
    w,
    k
  ), o.addEventListener(
    "touchend",
    x,
    k
  )) : (o.addEventListener(
    "mousemove",
    b,
    k
  ), o.addEventListener(
    "mouseup",
    y,
    k
  )), n.setColumnSizingInfo((R) => ({
    ...R,
    startOffset: m,
    startSize: i,
    deltaOffset: 0,
    deltaPercentage: 0,
    columnSizingStart: p,
    isResizingColumn: r.id
  }));
}
function pk(e, t) {
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
function hk(e, t) {
  const { topRows: n, centerRows: r, bottomRows: o } = pk(
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
function gk() {
  var t;
  const { props: e } = be();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ l(
    "col",
    {
      "data-slot": "data-grid-table-fill-col",
      style: { width: "var(--data-grid-fill-size, 0px)" }
    }
  ) : null;
}
function vk() {
  var t;
  const { props: e } = be();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ l(
    "th",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-head-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function Pm() {
  var t;
  const { props: e } = be();
  return (t = e.tableLayout) != null && t.columnsResizable ? /* @__PURE__ */ l(
    "td",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-body-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function bk({ children: e }) {
  var a, s, i, c, u, d, m;
  const { props: t, table: n } = be(), r = n.getVisibleLeafColumns(), o = Ot(() => {
    var v;
    if (!((v = t.tableLayout) != null && v.columnsResizable)) return;
    const p = n.getFlatHeaders(), h = {};
    for (let g = 0; g < p.length; g++) {
      const b = p[g];
      h[`--header-${b.id}-size`] = b.getSize(), h[`--col-${b.column.id}-size`] = b.column.getSize();
    }
    return h;
  }, [
    (a = t.tableLayout) == null ? void 0 : a.columnsResizable,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n.getState().columnSizingInfo,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n.getState().columnSizing
  ]);
  return /* @__PURE__ */ D(
    "table",
    {
      "data-slot": "data-grid-table",
      className: S(
        "text-foreground text-sm caption-bottom text-left align-middle font-normal rtl:text-right",
        (s = t.tableLayout) != null && s.columnsResizable ? "min-w-0" : "w-full min-w-full",
        ((i = t.tableLayout) == null ? void 0 : i.width) === "auto" ? "table-auto" : "table-fixed",
        !((c = t.tableLayout) != null && c.columnsResizable) && "",
        !((u = t.tableLayout) != null && u.columnsDraggable) && "border-separate border-spacing-0",
        (d = t.tableClassNames) == null ? void 0 : d.base
      ),
      style: (m = t.tableLayout) != null && m.columnsResizable ? {
        ...o,
        width: `calc(${n.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
      } : void 0,
      children: [
        /* @__PURE__ */ D("colgroup", { children: [
          r.map((p) => {
            var h, v;
            return /* @__PURE__ */ l(
              "col",
              {
                style: (h = t.tableLayout) != null && h.columnsResizable ? { width: `calc(var(--col-${p.id}-size) * 1px)` } : ((v = t.tableLayout) == null ? void 0 : v.width) === "fixed" ? { width: p.getSize() } : void 0
              },
              p.id
            );
          }),
          /* @__PURE__ */ l(gk, {})
        ] }),
        e
      ]
    }
  );
}
function yk({
  children: e,
  className: t,
  viewportRef: n,
  style: r
}) {
  var p, h, v;
  const { props: o, table: a } = be(), [s, i] = It(
    null
  ), [c, u] = It(0), d = Pe(
    (g) => {
      i(g), Da(n, g);
    },
    [n]
  ), m = (p = o.tableLayout) != null && p.columnsResizable && c > 0 ? Math.max(0, c - a.getTotalSize()) : 0;
  return Fr(() => {
    var x;
    if (!s || !((x = o.tableLayout) != null && x.columnsResizable)) {
      u(0);
      return;
    }
    const b = s.closest(
      '[data-slot="scroll-area-viewport"]'
    ) ?? s.parentElement ?? s, y = () => {
      u(b.clientWidth);
    };
    if (y(), typeof ResizeObserver > "u") return;
    const w = new ResizeObserver(y);
    return w.observe(b), () => {
      w.disconnect();
    };
  }, [(h = o.tableLayout) == null ? void 0 : h.columnsResizable, s]), /* @__PURE__ */ D(
    "div",
    {
      "data-slot": "data-grid-table-viewport",
      ref: d,
      className: S("relative min-w-full align-top", t),
      style: {
        ...(v = o.tableLayout) != null && v.columnsResizable ? {
          width: `calc(${a.getTotalSize()}px + var(--data-grid-fill-size, 0px))`,
          "--data-grid-fill-size": `${m}px`
        } : void 0,
        ...r
      },
      children: [
        e,
        /* @__PURE__ */ l(kk, { viewportElement: s })
      ]
    }
  );
}
function wk({ children: e }) {
  var n, r, o;
  const { props: t } = be();
  return /* @__PURE__ */ l(
    "thead",
    {
      className: S(
        (n = t.tableClassNames) == null ? void 0 : n.header,
        ((r = t.tableLayout) == null ? void 0 : r.headerSticky) && ((o = t.tableClassNames) == null ? void 0 : o.headerSticky)
      ),
      children: e
    }
  );
}
function xk({
  children: e,
  headerGroup: t
}) {
  var r, o, a, s, i;
  const { props: n } = be();
  return /* @__PURE__ */ D(
    "tr",
    {
      className: S(
        "bg-muted/40",
        ((r = n.tableLayout) == null ? void 0 : r.headerBorder) && "[&>th]:border-b",
        ((o = n.tableLayout) == null ? void 0 : o.cellBorder) && "*:last:border-e-0",
        ((a = n.tableLayout) == null ? void 0 : a.stripped) && "bg-transparent",
        ((s = n.tableLayout) == null ? void 0 : s.headerBackground) === !1 && "bg-transparent",
        (i = n.tableClassNames) == null ? void 0 : i.headerRow
      ),
      children: [
        e,
        /* @__PURE__ */ l(vk, {})
      ]
    },
    t.id
  );
}
function Ck({
  children: e,
  header: t,
  dndRef: n,
  dndStyle: r
}) {
  var m, p, h, v, g, b, y, w, x, k, C;
  const { props: o } = be(), { column: a } = t, s = a.getIsPinned(), i = s === "left" && a.getIsLastColumn("left"), c = s === "right" && a.getIsFirstColumn("right"), u = a.getIndex() === t.getContext().table.getVisibleLeafColumns().length - 1, d = mk({
    size: (m = o.tableLayout) != null && m.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ l(
    "th",
    {
      ref: n,
      style: {
        ...((p = o.tableLayout) == null ? void 0 : p.width) === "fixed" && !((h = o.tableLayout) != null && h.columnsResizable) && {
          width: t.getSize()
        },
        ...((v = o.tableLayout) == null ? void 0 : v.columnsPinnable) && a.getCanPin() && Rm(a),
        ...((g = o.tableLayout) == null ? void 0 : g.columnsResizable) && {
          width: `calc(var(--header-${t.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": s || void 0,
      "data-last-col": i ? "left" : c ? "right" : void 0,
      className: S(
        "text-secondary-foreground/80 h-10 relative text-left align-middle font-normal rtl:text-right [&:has([role=checkbox])]:pe-0",
        d,
        ((b = o.tableLayout) == null ? void 0 : b.cellBorder) && "border-e",
        ((y = o.tableLayout) == null ? void 0 : y.columnsResizable) && a.getCanResize() && "overflow-visible",
        ((w = o.tableLayout) == null ? void 0 : w.columnsResizable) && a.getCanResize() && u && "pe-8",
        ((x = o.tableLayout) == null ? void 0 : x.columnsPinnable) && a.getCanPin() && "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s!",
        (k = t.column.columnDef.meta) == null ? void 0 : k.headerClassName,
        a.getIndex() === 0 || a.getIndex() === t.headerGroup.headers.length - 1 ? (C = o.tableClassNames) == null ? void 0 : C.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function Sk({
  header: e
}) {
  var c, u;
  const { props: t, table: n } = be(), { column: r } = e, o = r.getIndex() === e.getContext().table.getVisibleLeafColumns().length - 1, a = (((c = t.tableLayout) == null ? void 0 : c.columnsResizeMode) ?? n.options.columnResizeMode) === "onEnd";
  return /* @__PURE__ */ l(
    "div",
    {
      onDoubleClick: () => r.resetSize(),
      onMouseDown: (d) => {
        if (d.preventDefault(), d.stopPropagation(), a) {
          Os(d, e, n);
          return;
        }
        e.getResizeHandler()(d);
      },
      onTouchStart: (d) => {
        if (d.preventDefault(), d.stopPropagation(), a) {
          Os(d, e, n);
          return;
        }
        e.getResizeHandler()(d);
      },
      className: S(
        "absolute top-0 h-full cursor-col-resize user-select-none touch-none z-10 flex",
        o ? "end-0 w-5 justify-end before:hidden" : "-end-2 w-5 justify-center before:absolute before:inset-y-0 before:w-px before:-translate-x-px before:bg-border",
        ((u = t.tableLayout) == null ? void 0 : u.cellBorder) && !r.getIsResizing() && "before:hidden",
        r.getIsResizing() && (a ? "opacity-100" : o ? "before:absolute before:end-0 before:block before:inset-y-0 before:w-0.5 before:bg-primary opacity-100" : "before:block before:bg-primary before:w-0.5 opacity-100")
      )
    }
  );
}
function kk({
  viewportElement: e
}) {
  var d, m, p;
  const { props: t, table: n } = be(), r = n.getState().columnSizingInfo, o = r.isResizingColumn, a = ((d = t.tableLayout) == null ? void 0 : d.columnsResizeMode) ?? n.options.columnResizeMode;
  if (!((m = t.tableLayout) != null && m.columnsResizable) || a !== "onEnd" || !o)
    return null;
  const s = n.getFlatHeaders().find(
    (h) => h.column.id === o || h.id === o
  );
  if (!s) return null;
  const i = r.deltaOffset ?? 0, c = ((p = e == null ? void 0 : e.querySelector('[data-slot="data-grid-table"] thead')) == null ? void 0 : p.getBoundingClientRect().height) ?? 0, u = typeof r.startOffset == "number" && e ? r.startOffset - e.getBoundingClientRect().left : s.getStart() + s.getSize();
  return /* @__PURE__ */ D(
    "div",
    {
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-y-0 z-20",
      style: {
        left: u,
        transform: `translateX(${i}px)`
      },
      children: [
        /* @__PURE__ */ l("div", { className: "bg-primary/85 absolute inset-y-0 left-0 w-px -translate-x-1/2" }),
        /* @__PURE__ */ l(
          "div",
          {
            className: "bg-primary absolute top-0 left-0 -translate-x-1/2 rounded-b-sm shadow-xs",
            style: {
              width: 5,
              height: Math.max(c, 6)
            }
          }
        )
      ]
    }
  );
}
function Nk() {
  return /* @__PURE__ */ l("tbody", { "aria-hidden": "true", className: "h-2" });
}
function Rk({ children: e }) {
  var n, r, o;
  const { props: t } = be();
  return /* @__PURE__ */ l(
    "tbody",
    {
      className: S(
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
  const { props: t } = be();
  return /* @__PURE__ */ l(
    "tfoot",
    {
      className: S(
        "border-t",
        ((n = t.tableLayout) == null ? void 0 : n.footerSticky) && ((r = t.tableClassNames) == null ? void 0 : r.footerSticky),
        (o = t.tableClassNames) == null ? void 0 : o.footer
      ),
      children: e
    }
  );
}
function Ek({ children: e }) {
  var r, o, a, s, i;
  const { table: t, props: n } = be();
  return /* @__PURE__ */ D(
    "tr",
    {
      className: S(
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
        /* @__PURE__ */ l(Pm, {})
      ]
    }
  );
}
function Mk({
  children: e,
  column: t
}) {
  var a, s, i, c, u, d, m;
  const { props: n, table: r } = be(), o = Nm({
    size: (a = n.tableLayout) != null && a.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ l(
    "td",
    {
      style: (s = n.tableLayout) != null && s.columnsResizable ? { width: `calc(var(--col-${t.id}-size) * 1px)` } : void 0,
      className: S(
        "align-middle",
        o,
        ((i = n.tableLayout) == null ? void 0 : i.cellBorder) && "border-e",
        ((c = n.tableLayout) == null ? void 0 : c.columnsResizable) && t.getCanResize() && "truncate",
        (u = t.columnDef.meta) == null ? void 0 : u.cellClassName,
        ((d = n.tableLayout) == null ? void 0 : d.columnsPinnable) && t.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        t.getIndex() === 0 || t.getIndex() === r.getVisibleFlatColumns().length - 1 ? (m = n.tableClassNames) == null ? void 0 : m.edgeCell : ""
      ),
      children: e
    }
  );
}
function _k({
  children: e,
  row: t,
  pinnedBoundary: n,
  rowRef: r,
  dndRef: o,
  dndStyle: a
}) {
  var u, d, m, p, h, v;
  const { props: s, table: i } = be(), c = t.getIsPinned();
  return /* @__PURE__ */ D(
    "tr",
    {
      ref: (g) => {
        Da(r, g), Da(o, g);
      },
      style: { ...a || null },
      "data-state": i.options.enableRowSelection && t.getIsSelected() ? "selected" : void 0,
      "data-row-pinned": c || void 0,
      "data-row-pinned-boundary": n,
      onClick: () => s.onRowClick && s.onRowClick(t.original),
      className: S(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        s.onRowClick && "cursor-pointer",
        !((u = s.tableLayout) != null && u.stripped) && ((d = s.tableLayout) == null ? void 0 : d.rowBorder) && "border-border border-b [&:not(:last-child)>td]:border-b",
        ((m = s.tableLayout) == null ? void 0 : m.cellBorder) && "*:last:border-e-0",
        ((p = s.tableLayout) == null ? void 0 : p.stripped) && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        i.options.enableRowSelection && "*:first:relative",
        ((h = s.tableLayout) == null ? void 0 : h.rowsPinnable) && c && "bg-muted/30 hover:bg-muted/50",
        n === "top" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        n === "bottom" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        (v = s.tableClassNames) == null ? void 0 : v.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ l(Pm, {})
      ]
    }
  );
}
function Dk({ row: e }) {
  var r, o, a, s, i;
  const { props: t, table: n } = be();
  return /* @__PURE__ */ l(
    "tr",
    {
      className: S(
        ((r = t.tableLayout) == null ? void 0 : r.rowBorder) && "[&:not(:last-child)>td]:border-b"
      ),
      children: /* @__PURE__ */ l(
        "td",
        {
          colSpan: e.getVisibleCells().length + ((o = t.tableLayout) != null && o.columnsResizable ? 1 : 0),
          children: (i = (s = (a = n.getAllColumns().find((c) => {
            var u;
            return (u = c.columnDef.meta) == null ? void 0 : u.expandedContent;
          })) == null ? void 0 : a.columnDef.meta) == null ? void 0 : s.expandedContent) == null ? void 0 : i.call(s, e.original)
        }
      )
    }
  );
}
function Tk({
  children: e,
  cell: t,
  dndRef: n,
  dndStyle: r
}) {
  var m, p, h, v, g, b, y, w, x;
  const { props: o } = be(), { column: a, row: s } = t, i = a.getIsPinned(), c = i === "left" && a.getIsLastColumn("left"), u = i === "right" && a.getIsFirstColumn("right"), d = Nm({
    size: (m = o.tableLayout) != null && m.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ l(
    "td",
    {
      ref: n,
      ...(p = o.tableLayout) != null && p.columnsDraggable && !i ? { cell: t } : {},
      style: {
        ...((h = o.tableLayout) == null ? void 0 : h.columnsPinnable) && a.getCanPin() && Rm(a),
        ...((v = o.tableLayout) == null ? void 0 : v.columnsResizable) && {
          width: `calc(var(--col-${a.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": i || void 0,
      "data-last-col": c ? "left" : u ? "right" : void 0,
      className: S(
        "align-middle",
        d,
        ((g = o.tableLayout) == null ? void 0 : g.cellBorder) && "border-e",
        ((b = o.tableLayout) == null ? void 0 : b.columnsResizable) && a.getCanResize() && "truncate",
        (y = t.column.columnDef.meta) == null ? void 0 : y.cellClassName,
        ((w = o.tableLayout) == null ? void 0 : w.columnsPinnable) && a.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        a.getIndex() === 0 || a.getIndex() === s.getVisibleCells().length - 1 ? (x = o.tableClassNames) == null ? void 0 : x.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function Ak({
  row: e,
  pinnedBoundary: t,
  rowRef: n
}) {
  return /* @__PURE__ */ D(Mp, { children: [
    /* @__PURE__ */ l(
      _k,
      {
        row: e,
        pinnedBoundary: t,
        rowRef: n,
        children: e.getVisibleCells().map((r) => /* @__PURE__ */ l(Tk, { cell: r, children: _a(r.column.columnDef.cell, r.getContext()) }, r.id))
      }
    ),
    e.getIsExpanded() && /* @__PURE__ */ l(Dk, { row: e })
  ] });
}
function Ok() {
  var r;
  const { table: e, props: t } = be(), n = e.getVisibleLeafColumns().length + ((r = t.tableLayout) != null && r.columnsResizable ? 1 : 0);
  return /* @__PURE__ */ l("tr", { children: /* @__PURE__ */ l(
    "td",
    {
      colSpan: Math.max(n, 1),
      className: "text-muted-foreground text-sm py-6 text-center",
      children: t.emptyMessage || "No data available"
    }
  ) });
}
function Ik({ table: e }) {
  var a;
  const { isLoading: t, props: n } = be(), r = e.getState().pagination;
  if (t && n.loadingMode === "skeleton" && (r != null && r.pageSize))
    return /* @__PURE__ */ l(ke, { children: Array.from({ length: r.pageSize }).map((s, i) => /* @__PURE__ */ l(Ek, { children: e.getVisibleFlatColumns().map((c, u) => {
      var d;
      return /* @__PURE__ */ l(Mk, { column: c, children: (d = c.columnDef.meta) == null ? void 0 : d.skeleton }, u);
    }) }, i)) });
  if (t && n.loadingMode === "spinner")
    return /* @__PURE__ */ l("tr", { children: /* @__PURE__ */ l("td", { colSpan: e.getVisibleFlatColumns().length, className: "p-8", children: /* @__PURE__ */ D("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ D(
        "svg",
        {
          className: "text-muted-foreground mr-3 -ml-1 h-5 w-5 animate-spin",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          children: [
            /* @__PURE__ */ l(
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
            /* @__PURE__ */ l(
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
  const o = hk(
    e,
    (a = n.tableLayout) == null ? void 0 : a.rowsPinnable
  );
  return o.length ? /* @__PURE__ */ l(ke, { children: o.map(({ row: s, pinnedBoundary: i }) => /* @__PURE__ */ l(
    Ak,
    {
      row: s,
      pinnedBoundary: i
    },
    s.id
  )) }) : /* @__PURE__ */ l(Ok, {});
}
const zk = nl(
  Ik,
  (e, t) => !!t.table.getState().columnSizingInfo.isResizingColumn
);
function Lk({
  footerContent: e,
  renderHeader: t = !0
}) {
  var o, a;
  const { table: n, props: r } = be();
  return /* @__PURE__ */ l(yk, { children: /* @__PURE__ */ D(bk, { children: [
    t && /* @__PURE__ */ l(wk, { children: n.getHeaderGroups().map((s, i) => /* @__PURE__ */ l(xk, { headerGroup: s, children: s.headers.map((c, u) => {
      var m, p;
      const { column: d } = c;
      return /* @__PURE__ */ D(Ck, { header: c, children: [
        c.isPlaceholder ? null : (m = r.tableLayout) != null && m.columnsResizable && d.getCanResize() ? /* @__PURE__ */ l("div", { className: "truncate", children: _a(
          c.column.columnDef.header,
          c.getContext()
        ) }) : _a(
          c.column.columnDef.header,
          c.getContext()
        ),
        ((p = r.tableLayout) == null ? void 0 : p.columnsResizable) && d.getCanResize() && /* @__PURE__ */ l(Sk, { header: c })
      ] }, u);
    }) }, i)) }),
    t && (((o = r.tableLayout) == null ? void 0 : o.stripped) || !((a = r.tableLayout) != null && a.rowBorder)) && /* @__PURE__ */ l(Nk, {}),
    /* @__PURE__ */ l(Rk, { children: /* @__PURE__ */ l(zk, { table: n }) }),
    e && /* @__PURE__ */ l(Pk, { children: e })
  ] }) });
}
function $k({
  table: e,
  pageSizeOptions: t = [10, 20, 30, 40, 50],
  className: n,
  ...r
}) {
  return /* @__PURE__ */ D(
    "div",
    {
      className: S(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ l("div", { className: "flex-1 whitespace-nowrap tabular-nums text-muted-foreground text-sm", children: e.options.onRowSelectionChange ? /* @__PURE__ */ D(ke, { children: [
          e.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          e.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }) : /* @__PURE__ */ D(ke, { children: [
          e.getFilteredRowModel().rows.length,
          " row(s)"
        ] }) }),
        /* @__PURE__ */ D("div", { className: "flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8", children: [
          /* @__PURE__ */ D("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ l("p", { className: "whitespace-nowrap font-medium text-sm", children: "Rows per page" }),
            /* @__PURE__ */ D(
              W0,
              {
                value: `${e.getState().pagination.pageSize}`,
                onValueChange: (o) => {
                  e.setPageSize(Number(o));
                },
                children: [
                  /* @__PURE__ */ l(V0, { className: "h-8 w-18 data-size:h-8", children: /* @__PURE__ */ l(B0, { placeholder: e.getState().pagination.pageSize }) }),
                  /* @__PURE__ */ l(H0, { side: "top", children: t.map((o) => /* @__PURE__ */ l(G0, { value: `${o}`, children: o }, o)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ D("div", { className: "flex items-center justify-center whitespace-nowrap font-medium tabular-nums text-sm", children: [
            "Page ",
            e.getState().pagination.pageIndex + 1,
            " of",
            " ",
            e.getPageCount()
          ] }),
          /* @__PURE__ */ D("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ l(
              Oe,
              {
                "aria-label": "Go to first page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(0),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ l(Ah, {})
              }
            ),
            /* @__PURE__ */ l(
              Oe,
              {
                "aria-label": "Go to previous page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.previousPage(),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ l(Fa, {})
              }
            ),
            /* @__PURE__ */ l(
              Oe,
              {
                "aria-label": "Go to next page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.nextPage(),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ l(zn, {})
              }
            ),
            /* @__PURE__ */ l(
              Oe,
              {
                "aria-label": "Go to last page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(e.getPageCount() - 1),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ l(Ih, {})
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function oD({
  table: e,
  recordCount: t,
  actionBar: n,
  children: r,
  className: o,
  resizable: a = !1,
  stickyHeader: s = !1,
  stickyFooter: i = !1,
  height: c,
  footerContent: u,
  tableLayoutOverrides: d
}) {
  return /* @__PURE__ */ l(
    ak,
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
      children: /* @__PURE__ */ D("div", { className: S("flex w-full flex-col gap-2.5", o), children: [
        r,
        /* @__PURE__ */ l(ik, { children: /* @__PURE__ */ l(ck, { className: c, children: /* @__PURE__ */ l(Lk, { footerContent: u }) }) }),
        /* @__PURE__ */ D("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ l($k, { table: e }),
          n && e.getFilteredSelectedRowModel().rows.length > 0 && n
        ] })
      ] })
    }
  );
}
function Fk({
  column: e,
  label: t,
  icon: n,
  className: r,
  filter: o,
  visibility: a = !1
}) {
  var z, $, Y, G, K, H, q, M;
  const { isLoading: s, table: i, props: c, recordCount: u } = be(), d = t ?? Ds(e), m = i.getState().columnOrder, p = JSON.stringify(i.getState().columnVisibility), h = e.getIsSorted(), v = e.getIsPinned(), g = e.getCanSort(), b = e.getCanPin(), y = e.getCanResize(), w = m.indexOf(e.id), x = w > 0, k = w < m.length - 1, C = () => {
    h === "asc" ? e.toggleSorting(!0) : h === "desc" ? e.clearSorting() : e.toggleSorting(!1);
  }, R = S(
    "text-secondary-foreground/80 inline-flex h-full items-center gap-1.5 font-normal [&_svg]:opacity-60 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5",
    r
  ), P = S(
    "text-secondary-foreground/80 hover:bg-secondary! data-[state=open]:bg-secondary! hover:text-foreground data-[state=open]:text-foreground -ms-2 px-2 py-0 font-normal h-7 rounded-md",
    r
  ), N = g && (h === "desc" ? /* @__PURE__ */ l(Ui, { className: "size-3.5" }) : h === "asc" ? /* @__PURE__ */ l(ji, { className: "size-3.5" }) : /* @__PURE__ */ l(gl, { className: "mt-px size-3.5" })), E = ((z = c.tableLayout) == null ? void 0 : z.columnsMovable) || (($ = c.tableLayout) == null ? void 0 : $.columnsVisibility) && a || ((Y = c.tableLayout) == null ? void 0 : Y.columnsPinnable) && b || o, A = Ot(() => {
    var ne, _, B;
    const T = [];
    let Z = !1;
    return o && (T.push(
      /* @__PURE__ */ l(C0, { children: /* @__PURE__ */ l(k0, { children: o }, "filter") }, "group-filter")
    ), Z = !0), g && (Z && T.push(/* @__PURE__ */ l(mr, {}, "sep-sort")), T.push(
      /* @__PURE__ */ D(
        Zt,
        {
          onClick: () => {
            h === "asc" ? e.clearSorting() : e.toggleSorting(!1);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ l(ji, { className: "size-3.5!" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Asc" }),
            h === "asc" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-asc"
      ),
      /* @__PURE__ */ D(
        Zt,
        {
          onClick: () => {
            h === "desc" ? e.clearSorting() : e.toggleSorting(!0);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ l(Ui, { className: "size-3.5!" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Desc" }),
            h === "desc" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-desc"
      )
    ), Z = !0), (ne = c.tableLayout) != null && ne.columnsPinnable && b && (Z && T.push(/* @__PURE__ */ l(mr, {}, "sep-pin")), T.push(
      /* @__PURE__ */ D(
        Zt,
        {
          onClick: () => e.pin(v === "left" ? !1 : "left"),
          children: [
            /* @__PURE__ */ l(gh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Pin to left" }),
            v === "left" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-left"
      ),
      /* @__PURE__ */ D(
        Zt,
        {
          onClick: () => e.pin(v === "right" ? !1 : "right"),
          children: [
            /* @__PURE__ */ l(wh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Pin to right" }),
            v === "right" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-right"
      )
    ), Z = !0), (_ = c.tableLayout) != null && _.columnsMovable && (Z && T.push(/* @__PURE__ */ l(mr, {}, "sep-move")), T.push(
      /* @__PURE__ */ D(
        Zt,
        {
          onClick: () => {
            if (w > 0) {
              const W = [...m], [V] = W.splice(w, 1);
              W.splice(w - 1, 0, V), i.setColumnOrder(W);
            }
          },
          disabled: !x || v !== !1,
          children: [
            /* @__PURE__ */ l(bh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { children: "Move to Left" })
          ]
        },
        "move-left"
      ),
      /* @__PURE__ */ D(
        Zt,
        {
          onClick: () => {
            if (w < m.length - 1) {
              const W = [...m], [V] = W.splice(w, 1);
              W.splice(w + 1, 0, V), i.setColumnOrder(W);
            }
          },
          disabled: !k || v !== !1,
          children: [
            /* @__PURE__ */ l(Ch, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { children: "Move to Right" })
          ]
        },
        "move-right"
      )
    ), Z = !0), (B = c.tableLayout) != null && B.columnsVisibility && a && (Z && T.push(/* @__PURE__ */ l(mr, {}, "sep-visibility")), T.push(
      /* @__PURE__ */ D(N0, { children: [
        /* @__PURE__ */ D(R0, { children: [
          /* @__PURE__ */ l(wl, { className: "size-3.5!" }),
          /* @__PURE__ */ l("span", { children: "Columns" })
        ] }),
        /* @__PURE__ */ l(P0, { children: i.getAllColumns().filter((W) => W.getCanHide()).map((W) => /* @__PURE__ */ l(
          S0,
          {
            checked: W.getIsVisible(),
            onSelect: (V) => V.preventDefault(),
            onCheckedChange: (V) => W.toggleVisibility(!!V),
            className: "capitalize",
            children: Ds(W)
          },
          W.id
        )) })
      ] }, "visibility")
    )), T;
  }, [
    o,
    g,
    h,
    e,
    (G = c.tableLayout) == null ? void 0 : G.columnsPinnable,
    (K = c.tableLayout) == null ? void 0 : K.columnsMovable,
    (H = c.tableLayout) == null ? void 0 : H.columnsVisibility,
    b,
    v,
    x,
    k,
    a,
    i,
    w,
    m,
    p
  ]);
  return E ? /* @__PURE__ */ D("div", { className: "flex h-full items-center justify-between gap-1.5", children: [
    /* @__PURE__ */ D(y0, { children: [
      /* @__PURE__ */ l(w0, { asChild: !0, children: /* @__PURE__ */ D(
        Oe,
        {
          variant: "ghost",
          className: P,
          disabled: s || u === 0,
          children: [
            n && n,
            d,
            N
          ]
        }
      ) }),
      /* @__PURE__ */ l(x0, { className: "w-40", align: "start", children: A })
    ] }),
    ((q = c.tableLayout) == null ? void 0 : q.columnsPinnable) && b && v && /* @__PURE__ */ l(
      Oe,
      {
        size: "icon",
        variant: "ghost",
        className: "-me-1 size-7 rounded-md",
        onClick: () => e.pin(!1),
        "aria-label": `Unpin ${d} column`,
        title: `Unpin ${d} column`,
        children: /* @__PURE__ */ l(Gh, { className: "size-3.5! opacity-50!", "aria-hidden": "true" })
      }
    )
  ] }) : g || (M = c.tableLayout) != null && M.columnsResizable && y ? /* @__PURE__ */ l("div", { className: "flex h-full items-center", children: /* @__PURE__ */ D(
    Oe,
    {
      variant: "ghost",
      className: P,
      disabled: s || u === 0,
      onClick: C,
      children: [
        n && n,
        d,
        N
      ]
    }
  ) }) : /* @__PURE__ */ D("div", { className: R, children: [
    n && n,
    d
  ] });
}
const aD = nl(
  Fk
);
function Wk(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Jo = {}, Rn = {};
function Pn(e, t) {
  try {
    const r = (Jo[e] || (Jo[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in Rn ? Rn[r] : Is(r, r.split(":"));
  } catch {
    if (e in Rn) return Rn[e];
    const n = e == null ? void 0 : e.match(Bk);
    return n ? Is(e, n.slice(1)) : NaN;
  }
}
const Bk = /([+-]\d\d):?(\d\d)?/;
function Is(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0);
  return Rn[e] = n > 0 ? n * 60 + r : n * 60 - r;
}
class Xe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Pn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Em(this), Aa(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Xe(...n, t) : new Xe(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Xe(+this, t);
  }
  getTimezoneOffset() {
    return -Pn(this.timeZone, this);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Aa(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Xe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const zs = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!zs.test(e)) return;
  const t = e.replace(zs, "$1UTC");
  Xe.prototype[t] && (e.startsWith("get") ? Xe.prototype[e] = function() {
    return this.internal[t]();
  } : (Xe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Vk(this), +this;
  }, Xe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Aa(this), +this;
  }));
});
function Aa(e) {
  e.internal.setTime(+e), e.internal.setUTCMinutes(e.internal.getUTCMinutes() - e.getTimezoneOffset());
}
function Vk(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Em(e);
}
function Em(e) {
  const t = Pn(e.timeZone, e), n = /* @__PURE__ */ new Date(+e);
  n.setUTCHours(n.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+n)).getTimezoneOffset(), a = r - o, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const i = r - t;
  i && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + i);
  const c = Pn(e.timeZone, e), d = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - c, m = c !== t, p = d - i;
  if (m && p) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + p);
    const h = Pn(e.timeZone, e), v = c - h;
    v && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + v), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + v));
  }
}
class Ee extends Xe {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Ee(...n, t) : new Ee(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Wk(this.timeZone, this)})`;
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
    return new Ee(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ee(+new Date(t), this.timeZone);
  }
  //#endregion
}
var X;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(X || (X = {}));
var pe;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(pe || (pe = {}));
var Be;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Be || (Be = {}));
var Te;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Te || (Te = {}));
const Mm = 6048e5, Hk = 864e5, Ls = Symbol.for("constructDateFrom");
function Se(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ls in e ? e[Ls](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ue(e, t) {
  return Se(t || e, e);
}
function _m(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in);
  return isNaN(t) ? Se(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Dm(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return Se(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = Se(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let Gk = {};
function Jn() {
  return Gk;
}
function cn(e, t) {
  var i, c, u, d;
  const n = Jn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = ue(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function On(e, t) {
  return cn(e, { ...t, weekStartsOn: 1 });
}
function Tm(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Se(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = On(o), s = Se(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = On(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function $s(e) {
  const t = ue(e), n = new Date(
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
function bn(e, ...t) {
  const n = Se.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function In(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Am(e, t, n) {
  const [r, o] = bn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = In(r), s = In(o), i = +a - $s(a), c = +s - $s(s);
  return Math.round((i - c) / Hk);
}
function Yk(e, t) {
  const n = Tm(e, t), r = Se(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), On(r);
}
function Uk(e, t, n) {
  return _m(e, t * 7, n);
}
function jk(e, t, n) {
  return Dm(e, t * 12, n);
}
function Kk(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Se.bind(null, o));
    const a = ue(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), Se(r, n || NaN);
}
function qk(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Se.bind(null, o));
    const a = ue(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), Se(r, n || NaN);
}
function Xk(e, t, n) {
  const [r, o] = bn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +In(r) == +In(o);
}
function Om(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Zk(e) {
  return !(!Om(e) && typeof e != "number" || isNaN(+ue(e)));
}
function Qk(e, t, n) {
  const [r, o] = bn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function Jk(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function eN(e, t) {
  const [n, r] = bn(e, t.start, t.end);
  return { start: n, end: r };
}
function tN(e, t) {
  const { start: n, end: r } = eN(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(Se(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function nN(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function rN(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Im(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function zm(e, t) {
  var i, c, u, d;
  const n = Jn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = ue(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function oN(e, t) {
  return zm(e, { ...t, weekStartsOn: 1 });
}
const aN = {
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
}, iN = (e, t, n) => {
  let r;
  const o = aN[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function ea(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const sN = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, lN = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, cN = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, dN = {
  date: ea({
    formats: sN,
    defaultWidth: "full"
  }),
  time: ea({
    formats: lN,
    defaultWidth: "full"
  }),
  dateTime: ea({
    formats: cN,
    defaultWidth: "full"
  })
}, uN = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, fN = (e, t, n, r) => uN[e];
function wn(e) {
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
const mN = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, pN = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, hN = {
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
}, gN = {
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
}, vN = {
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
}, bN = {
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
}, yN = (e, t) => {
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
}, wN = {
  ordinalNumber: yN,
  era: wn({
    values: mN,
    defaultWidth: "wide"
  }),
  quarter: wn({
    values: pN,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: wn({
    values: hN,
    defaultWidth: "wide"
  }),
  day: wn({
    values: gN,
    defaultWidth: "wide"
  }),
  dayPeriod: wn({
    values: vN,
    defaultWidth: "wide",
    formattingValues: bN,
    defaultFormattingWidth: "wide"
  })
};
function xn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? CN(i, (m) => m.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      xN(i, (m) => m.test(s))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(c) : c, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const d = t.slice(s.length);
    return { value: u, rest: d };
  };
}
function xN(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function CN(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function SN(e) {
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
const kN = /^(\d+)(th|st|nd|rd)?/i, NN = /\d+/i, RN = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, PN = {
  any: [/^b/i, /^(a|c)/i]
}, EN = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, MN = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, _N = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, DN = {
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
}, TN = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, AN = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, ON = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, IN = {
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
}, zN = {
  ordinalNumber: SN({
    matchPattern: kN,
    parsePattern: NN,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: xn({
    matchPatterns: RN,
    defaultMatchWidth: "wide",
    parsePatterns: PN,
    defaultParseWidth: "any"
  }),
  quarter: xn({
    matchPatterns: EN,
    defaultMatchWidth: "wide",
    parsePatterns: MN,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: xn({
    matchPatterns: _N,
    defaultMatchWidth: "wide",
    parsePatterns: DN,
    defaultParseWidth: "any"
  }),
  day: xn({
    matchPatterns: TN,
    defaultMatchWidth: "wide",
    parsePatterns: AN,
    defaultParseWidth: "any"
  }),
  dayPeriod: xn({
    matchPatterns: ON,
    defaultMatchWidth: "any",
    parsePatterns: IN,
    defaultParseWidth: "any"
  })
}, Ii = {
  code: "en-US",
  formatDistance: iN,
  formatLong: dN,
  formatRelative: fN,
  localize: wN,
  match: zN,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function LN(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return Am(n, Im(n)) + 1;
}
function Lm(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = +On(n) - +Yk(n);
  return Math.round(r / Mm) + 1;
}
function $m(e, t) {
  var d, m, p, h;
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Jn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : m.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((h = (p = o.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = Se((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = cn(s, t), c = Se((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const u = cn(c, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function $N(e, t) {
  var i, c, u, d;
  const n = Jn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, o = $m(e, t), a = Se((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), cn(a, t);
}
function Fm(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = +cn(n, t) - +$N(n, t);
  return Math.round(r / Mm) + 1;
}
function de(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const gt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return de(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : de(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return de(e.getDate(), t.length);
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
    return de(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return de(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return de(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return de(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return de(o, t.length);
  }
}, Qt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Fs = {
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
    return gt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = $m(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return de(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : de(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Tm(e);
    return de(n, t.length);
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
    return de(n, t.length);
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
        return de(r, 2);
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
        return de(r, 2);
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
        return gt.M(e, t);
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
        return de(r + 1, 2);
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
    const o = Fm(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : de(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Lm(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : de(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : gt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = LN(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : de(r, t.length);
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
        return de(a, 2);
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
        return de(a, t.length);
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
        return de(o, t.length);
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
    switch (r === 12 ? o = Qt.noon : r === 0 ? o = Qt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Qt.evening : r >= 12 ? o = Qt.afternoon : r >= 4 ? o = Qt.morning : o = Qt.night, t) {
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
    return gt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : gt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : de(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : de(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : gt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : gt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return gt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Bs(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return At(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return At(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Bs(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return At(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return At(r, ":");
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
        return "GMT" + Ws(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + At(r, ":");
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
        return "GMT" + Ws(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + At(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return de(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return de(+e, t.length);
  }
};
function Ws(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + de(a, 2);
}
function Bs(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + de(Math.abs(e) / 60, 2) : At(e, t);
}
function At(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = de(Math.trunc(r / 60), 2), a = de(r % 60, 2);
  return n + o + t + a;
}
const Vs = (e, t) => {
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
}, Wm = (e, t) => {
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
}, FN = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Vs(e, t);
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
  return a.replace("{{date}}", Vs(r, t)).replace("{{time}}", Wm(o, t));
}, WN = {
  p: Wm,
  P: FN
}, BN = /^D+$/, VN = /^Y+$/, HN = ["D", "DD", "YY", "YYYY"];
function GN(e) {
  return BN.test(e);
}
function YN(e) {
  return VN.test(e);
}
function UN(e, t, n) {
  const r = jN(e, t, n);
  if (console.warn(r), HN.includes(e)) throw new RangeError(r);
}
function jN(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const KN = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, qN = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, XN = /^'([^]*?)'?$/, ZN = /''/g, QN = /[a-zA-Z]/;
function JN(e, t, n) {
  var d, m, p, h, v, g, b, y;
  const r = Jn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Ii, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((m = (d = n == null ? void 0 : n.locale) == null ? void 0 : d.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((h = (p = r.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (v = n == null ? void 0 : n.locale) == null ? void 0 : v.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((y = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : y.weekStartsOn) ?? 0, i = ue(e, n == null ? void 0 : n.in);
  if (!Zk(i))
    throw new RangeError("Invalid time value");
  let c = t.match(qN).map((w) => {
    const x = w[0];
    if (x === "p" || x === "P") {
      const k = WN[x];
      return k(w, o.formatLong);
    }
    return w;
  }).join("").match(KN).map((w) => {
    if (w === "''")
      return { isToken: !1, value: "'" };
    const x = w[0];
    if (x === "'")
      return { isToken: !1, value: eR(w) };
    if (Fs[x])
      return { isToken: !0, value: w };
    if (x.match(QN))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + x + "`"
      );
    return { isToken: !1, value: w };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const u = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((w) => {
    if (!w.isToken) return w.value;
    const x = w.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && YN(x) || !(n != null && n.useAdditionalDayOfYearTokens) && GN(x)) && UN(x, t, String(e));
    const k = Fs[x[0]];
    return k(i, x, o.localize, u);
  }).join("");
}
function eR(e) {
  const t = e.match(XN);
  return t ? t[1].replace(ZN, "'") : e;
}
function tR(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = Se(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function nR(e, t) {
  return ue(e, t == null ? void 0 : t.in).getMonth();
}
function rR(e, t) {
  return ue(e, t == null ? void 0 : t.in).getFullYear();
}
function oR(e, t) {
  return +ue(e) > +ue(t);
}
function aR(e, t) {
  return +ue(e) < +ue(t);
}
function iR(e, t, n) {
  const [r, o] = bn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function sR(e, t, n) {
  const [r, o] = bn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function lR(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = Se(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = tR(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function cR(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? Se(e, NaN) : (r.setFullYear(t), r);
}
const Hs = 5, dR = 4;
function uR(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Hs * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Hs : dR;
}
function Bm(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function fR(e, t) {
  const n = Bm(e, t), r = uR(e, t);
  return t.addDays(n, r * 7 - 1);
}
class mt {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? Ee.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Ee(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : _m(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Dm(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : Uk(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : jk(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Am(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Qk(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : tN(r);
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : fR(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : oN(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : Jk(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : zm(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : rN(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : JN(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : Lm(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : nR(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : rR(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Fm(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : oR(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : aR(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Om(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : Xk(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : iR(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : sR(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Kk(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : qk(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : lR(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : cR(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Bm(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : In(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : On(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : nN(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : cn(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Im(r);
    }, this.options = { locale: Ii, ...t }, this.overrides = n;
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
const nt = new mt();
class Vm {
  constructor(t, n, r = nt) {
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
class mR {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class pR {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function it(e, t, n = !1, r = nt) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Hm(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function zi(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Gm(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ym(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Um(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function jm(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function st(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (jm(i, n))
      return i.includes(e);
    if (zi(i))
      return it(i, e, !1, n);
    if (Um(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Hm(i)) {
      const c = a(i.before, e), u = a(i.after, e), d = c > 0, m = u < 0;
      return s(i.before, i.after) ? m && d : d || m;
    }
    return Gm(i) ? a(e, i.after) > 0 : Ym(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function hR(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: u, today: d } = t, { isSameDay: m, isSameMonth: p, startOfMonth: h, isBefore: v, endOfMonth: g, isAfter: b } = o, y = n && h(n), w = r && g(r), x = {
    [pe.focused]: [],
    [pe.outside]: [],
    [pe.disabled]: [],
    [pe.hidden]: [],
    [pe.today]: []
  }, k = {};
  for (const C of e) {
    const { date: R, displayMonth: P } = C, N = !!(P && !p(R, P)), E = !!(y && v(R, y)), A = !!(w && b(R, w)), z = !!(a && st(R, a, o)), $ = !!(s && st(R, s, o)) || E || A || // Broadcast calendar will show outside days as default
    !u && !c && N || u && c === !1 && N, Y = m(R, d ?? o.today());
    N && x.outside.push(C), z && x.disabled.push(C), $ && x.hidden.push(C), Y && x.today.push(C), i && Object.keys(i).forEach((G) => {
      const K = i == null ? void 0 : i[G];
      K && st(R, K, o) && (k[G] ? k[G].push(C) : k[G] = [C]);
    });
  }
  return (C) => {
    const R = {
      [pe.focused]: !1,
      [pe.disabled]: !1,
      [pe.hidden]: !1,
      [pe.outside]: !1,
      [pe.today]: !1
    }, P = {};
    for (const N in x) {
      const E = x[N];
      R[N] = E.some((A) => A === C);
    }
    for (const N in k)
      P[N] = k[N].some((E) => E === C);
    return {
      ...R,
      // custom modifiers should override all the previous ones
      ...P
    };
  };
}
function gR(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[pe[a]] ? o.push(t[pe[a]]) : t[Be[a]] && o.push(t[Be[a]]), o), [t[X.Day]]);
}
function vR(e) {
  return O.createElement("button", { ...e });
}
function bR(e) {
  return O.createElement("span", { ...e });
}
function yR(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return O.createElement(
    "svg",
    { className: r, width: t, height: t, viewBox: "0 0 24 24" },
    n === "up" && O.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    n === "down" && O.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    n === "left" && O.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    n === "right" && O.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}
function wR(e) {
  const { day: t, modifiers: n, ...r } = e;
  return O.createElement("td", { ...r });
}
function xR(e) {
  const { day: t, modifiers: n, ...r } = e, o = O.useRef(null);
  return O.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), O.createElement("button", { ref: o, ...r });
}
function CR(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[X.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return O.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[X.DropdownRoot] },
    O.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: u, disabled: d }) => O.createElement(r.Option, { key: c, value: c, disabled: d }, u))),
    O.createElement(
      "span",
      { className: o[X.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      O.createElement(r.Chevron, { orientation: "down", size: 18, className: o[X.Chevron] })
    )
  );
}
function SR(e) {
  return O.createElement("div", { ...e });
}
function kR(e) {
  return O.createElement("div", { ...e });
}
function NR(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return O.createElement("div", { ...r }, e.children);
}
function RR(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return O.createElement("div", { ...r });
}
function PR(e) {
  return O.createElement("table", { ...e });
}
function ER(e) {
  return O.createElement("div", { ...e });
}
const Km = el(void 0);
function er() {
  const e = tl(Km);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function MR(e) {
  const { components: t } = er();
  return O.createElement(t.Dropdown, { ...e });
}
function _R(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: u } } = er(), d = Pe((p) => {
    o && (n == null || n(p));
  }, [o, n]), m = Pe((p) => {
    r && (t == null || t(p));
  }, [r, t]);
  return O.createElement(
    "nav",
    { ...a },
    O.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[X.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: m },
      O.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[X.Chevron], orientation: "left" })
    ),
    O.createElement(
      s.NextMonthButton,
      { type: "button", className: i[X.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: d },
      O.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[X.Chevron] })
    )
  );
}
function DR(e) {
  const { components: t } = er();
  return O.createElement(t.Button, { ...e });
}
function TR(e) {
  return O.createElement("option", { ...e });
}
function AR(e) {
  const { components: t } = er();
  return O.createElement(t.Button, { ...e });
}
function OR(e) {
  const { rootRef: t, ...n } = e;
  return O.createElement("div", { ...n, ref: t });
}
function IR(e) {
  return O.createElement("select", { ...e });
}
function zR(e) {
  const { week: t, ...n } = e;
  return O.createElement("tr", { ...n });
}
function LR(e) {
  return O.createElement("th", { ...e });
}
function $R(e) {
  return O.createElement(
    "thead",
    { "aria-hidden": !0 },
    O.createElement("tr", { ...e })
  );
}
function FR(e) {
  const { week: t, ...n } = e;
  return O.createElement("th", { ...n });
}
function WR(e) {
  return O.createElement("th", { ...e });
}
function BR(e) {
  return O.createElement("tbody", { ...e });
}
function VR(e) {
  const { components: t } = er();
  return O.createElement(t.Dropdown, { ...e });
}
const HR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: vR,
  CaptionLabel: bR,
  Chevron: yR,
  Day: wR,
  DayButton: xR,
  Dropdown: CR,
  DropdownNav: SR,
  Footer: kR,
  Month: NR,
  MonthCaption: RR,
  MonthGrid: PR,
  Months: ER,
  MonthsDropdown: MR,
  Nav: _R,
  NextMonthButton: DR,
  Option: TR,
  PreviousMonthButton: AR,
  Root: OR,
  Select: IR,
  Week: zR,
  WeekNumber: FR,
  WeekNumberHeader: WR,
  Weekday: LR,
  Weekdays: $R,
  Weeks: BR,
  YearsDropdown: VR
}, Symbol.toStringTag, { value: "Module" }));
function GR(e) {
  return {
    ...HR,
    ...e
  };
}
function YR(e) {
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
function Li() {
  const e = {};
  for (const t in X)
    e[X[t]] = `rdp-${X[t]}`;
  for (const t in pe)
    e[pe[t]] = `rdp-${pe[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  for (const t in Te)
    e[Te[t]] = `rdp-${Te[t]}`;
  return e;
}
function qm(e, t, n) {
  return (n ?? new mt(t)).format(e, "LLLL y");
}
const UR = qm;
function jR(e, t, n) {
  return (n ?? new mt(t)).format(e, "d");
}
function KR(e, t = nt) {
  return t.format(e, "LLLL");
}
function qR(e, t = nt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function XR() {
  return "";
}
function ZR(e, t, n) {
  return (n ?? new mt(t)).format(e, "cccccc");
}
function Xm(e, t = nt) {
  return t.format(e, "yyyy");
}
const QR = Xm, JR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: qm,
  formatDay: jR,
  formatMonthCaption: UR,
  formatMonthDropdown: KR,
  formatWeekNumber: qR,
  formatWeekNumberHeader: XR,
  formatWeekdayName: ZR,
  formatYearCaption: QR,
  formatYearDropdown: Xm
}, Symbol.toStringTag, { value: "Module" }));
function eP(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...JR,
    ...e
  };
}
function tP(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: u } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((p) => {
    const h = r.formatMonthDropdown(p, o), v = u(p), g = t && p < a(t) || n && p > a(n) || !1;
    return { value: v, label: h, disabled: g };
  });
}
function nP(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[X.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function rP(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function oP(e, t, n, r) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, addYears: s, getYear: i, isBefore: c, isSameYear: u } = r, d = o(e), m = a(t), p = [];
  let h = d;
  for (; c(h, m) || u(h, m); )
    p.push(h), h = s(h, 1);
  return p.map((v) => {
    const g = n.formatYearDropdown(v, r);
    return {
      value: i(v),
      label: g,
      disabled: !1
    };
  });
}
function Zm(e, t, n) {
  return (n ?? new mt(t)).format(e, "LLLL y");
}
const aP = Zm;
function iP(e, t, n, r) {
  let o = (r ?? new mt(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function Qm(e, t, n, r) {
  let o = (r ?? new mt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const sP = Qm;
function lP() {
  return "";
}
function cP(e) {
  return "Choose the Month";
}
function dP(e) {
  return "Go to the Next Month";
}
function uP(e) {
  return "Go to the Previous Month";
}
function fP(e, t, n) {
  return (n ?? new mt(t)).format(e, "cccc");
}
function mP(e, t) {
  return `Week ${e}`;
}
function pP(e) {
  return "Week Number";
}
function hP(e) {
  return "Choose the Year";
}
const gP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: aP,
  labelDay: sP,
  labelDayButton: Qm,
  labelGrid: Zm,
  labelGridcell: iP,
  labelMonthDropdown: cP,
  labelNav: lP,
  labelNext: dP,
  labelPrevious: uP,
  labelWeekNumber: mP,
  labelWeekNumberHeader: pP,
  labelWeekday: fP,
  labelYearDropdown: hP
}, Symbol.toStringTag, { value: "Module" })), tr = (e) => e instanceof HTMLElement ? e : null, ta = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], vP = (e) => tr(e.querySelector("[data-animated-month]")), na = (e) => tr(e.querySelector("[data-animated-caption]")), ra = (e) => tr(e.querySelector("[data-animated-weeks]")), bP = (e) => tr(e.querySelector("[data-animated-nav]")), yP = (e) => tr(e.querySelector("[data-animated-weekdays]"));
function wP(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = ot(null), i = ot(r), c = ot(!1);
  Js(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const d = a.isSameMonth(r[0].date, u[0].date), m = a.isAfter(r[0].date, u[0].date), p = m ? n[Te.caption_after_enter] : n[Te.caption_before_enter], h = m ? n[Te.weeks_after_enter] : n[Te.weeks_before_enter], v = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (ta(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const k = vP(x);
      k && x.contains(k) && x.removeChild(k);
      const C = na(x);
      C && C.classList.remove(p);
      const R = ra(x);
      R && R.classList.remove(h);
    }), s.current = g) : s.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = v instanceof HTMLElement ? ta(v) : [], y = ta(e.current);
    if (y && y.every((w) => w instanceof HTMLElement) && b && b.every((w) => w instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const w = bP(e.current);
      w && (w.style.zIndex = "1"), y.forEach((x, k) => {
        const C = b[k];
        if (!C)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const R = na(x);
        R && R.classList.add(p);
        const P = ra(x);
        P && P.classList.add(h);
        const N = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), R && R.classList.remove(p), P && P.classList.remove(h), x.style.position = "", x.style.overflow = "", x.contains(C) && x.removeChild(C);
        };
        C.style.pointerEvents = "none", C.style.position = "absolute", C.style.overflow = "hidden", C.setAttribute("aria-hidden", "true");
        const E = yP(C);
        E && (E.style.opacity = "0");
        const A = na(C);
        A && (A.classList.add(m ? n[Te.caption_before_exit] : n[Te.caption_after_exit]), A.addEventListener("animationend", N));
        const z = ra(C);
        z && z.classList.add(m ? n[Te.weeks_before_exit] : n[Te.weeks_after_exit]), x.insertBefore(C, x.firstChild);
      });
    }
  });
}
function xP(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: u, differenceInCalendarDays: d, differenceInCalendarMonths: m, endOfBroadcastWeek: p, endOfISOWeek: h, endOfMonth: v, endOfWeek: g, isAfter: b, startOfBroadcastWeek: y, startOfISOWeek: w, startOfWeek: x } = r, k = c ? y(o, r) : s ? w(o) : x(o), C = c ? p(a) : s ? h(v(a)) : g(v(a)), R = d(C, k), P = m(a, o) + 1, N = [];
  for (let z = 0; z <= R; z++) {
    const $ = u(k, z);
    if (t && b($, t))
      break;
    N.push($);
  }
  const A = (c ? 35 : 42) * P;
  if (i && N.length < A) {
    const z = A - N.length;
    for (let $ = 0; $ < z; $++) {
      const Y = u(N[N.length - 1], 1);
      N.push(Y);
    }
  }
  return N;
}
function CP(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => [...a, ...s.days], t);
    return [...n, ...o];
  }, t);
}
function SP(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Gs(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: u, addMonths: d, startOfMonth: m } = r;
  if (n && u(n, c) < i - 1) {
    const p = -1 * (i - 1);
    c = d(n, p);
  }
  return t && u(c, t) < 0 && (c = t), m(c);
}
function kP(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: u, getWeek: d, startOfBroadcastWeek: m, startOfISOWeek: p, startOfWeek: h } = r, v = e.reduce((g, b) => {
    const y = n.broadcastCalendar ? m(b, r) : n.ISOWeek ? p(b) : h(b), w = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : c(i(b)), x = t.filter((P) => P >= y && P <= w), k = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < k) {
      const P = t.filter((N) => {
        const E = k - x.length;
        return N > w && N <= o(w, E);
      });
      x.push(...P);
    }
    const C = x.reduce((P, N) => {
      const E = n.ISOWeek ? u(N) : d(N), A = P.find(($) => $.weekNumber === E), z = new Vm(N, b, r);
      return A ? A.days.push(z) : P.push(new pR(E, [z])), P;
    }, []), R = new mR(b, C);
    return g.push(R), g;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function NP(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: u, newDate: d, today: m } = t, { fromYear: p, toYear: h, fromMonth: v, toMonth: g } = e;
  !n && v && (n = v), !n && p && (n = t.newDate(p, 0, 1)), !r && g && (r = g), !r && h && (r = d(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : p ? n = d(p, 0, 1) : !n && b && (n = o(c(e.today ?? m(), -100))), r ? r = i(r) : h ? r = d(h, 11, 31) : !r && b && (r = u(e.today ?? m())), [
    n && a(n),
    r && a(r)
  ];
}
function RP(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, u = o ? a : 1, d = s(e);
  if (!t)
    return i(d, u);
  if (!(c(t, e) < a))
    return i(d, u);
}
function PP(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, u = o ? a ?? 1 : 1, d = s(e);
  if (!t)
    return i(d, -u);
  if (!(c(d, t) <= 0))
    return i(d, -u);
}
function EP(e) {
  const t = [];
  return e.reduce((n, r) => [...n, ...r.weeks], t);
}
function Po(e, t) {
  const [n, r] = It(e);
  return [t === void 0 ? n : t, r];
}
function MP(e, t) {
  const [n, r] = NP(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Gs(e, n, r, t), [i, c] = Po(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Fr(() => {
    const R = Gs(e, n, r, t);
    c(R);
  }, [e.timeZone]);
  const u = SP(i, r, e, t), d = xP(u, e.endMonth ? a(e.endMonth) : void 0, e, t), m = kP(u, d, e, t), p = EP(m), h = CP(m), v = PP(i, n, e, t), g = RP(i, r, e, t), { disableNavigation: b, onMonthChange: y } = e, w = (R) => p.some((P) => P.days.some((N) => N.isEqualTo(R))), x = (R) => {
    if (b)
      return;
    let P = o(R);
    n && P < o(n) && (P = o(n)), r && P > o(r) && (P = o(r)), c(P), y == null || y(P);
  };
  return {
    months: m,
    weeks: p,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: v,
    nextMonth: g,
    goToMonth: x,
    goToDay: (R) => {
      w(R) || x(R.date);
    }
  };
}
var je;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(je || (je = {}));
function Ys(e) {
  return !e[pe.disabled] && !e[pe.hidden] && !e[pe.outside];
}
function _P(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Ys(i) && (i[pe.focused] && a < je.FocusedModifier ? (o = s, a = je.FocusedModifier) : r != null && r.isEqualTo(s) && a < je.LastFocused ? (o = s, a = je.LastFocused) : n(s.date) && a < je.Selected ? (o = s, a = je.Selected) : i[pe.today] && a < je.Today && (o = s, a = je.Today));
  }
  return o || (o = e.find((s) => Ys(t(s)))), o;
}
function DP(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: u, addMonths: d, addWeeks: m, addYears: p, endOfBroadcastWeek: h, endOfISOWeek: v, endOfWeek: g, max: b, min: y, startOfBroadcastWeek: w, startOfISOWeek: x, startOfWeek: k } = s;
  let R = {
    day: u,
    week: m,
    month: d,
    year: p,
    startOfWeek: (P) => c ? w(P, s) : i ? x(P) : k(P),
    endOfWeek: (P) => c ? h(P) : i ? v(P) : g(P)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? R = b([r, R]) : t === "after" && o && (R = y([o, R])), R;
}
function Jm(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = DP(e, t, n.date, r, o, a, s), u = !!(a.disabled && st(c, a.disabled, s)), d = !!(a.hidden && st(c, a.hidden, s)), m = c, p = new Vm(c, m, s);
  return !u && !d ? p : Jm(e, t, p, r, o, a, s, i + 1);
}
function TP(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = It(), c = _P(t.days, n, r || (() => !1), s), [u, d] = It(a ? c : void 0);
  return {
    isFocusTarget: (g) => !!(c != null && c.isEqualTo(g)),
    setFocused: d,
    focused: u,
    blur: () => {
      i(u), d(void 0);
    },
    moveFocus: (g, b) => {
      if (!u)
        return;
      const y = Jm(g, b, u, t.navStart, t.navEnd, e, o);
      y && (t.goToDay(y), d(y));
    }
  };
}
function AP(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Po(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, u = (h) => (i == null ? void 0 : i.some((v) => c(v, h))) ?? !1, { min: d, max: m } = e;
  return {
    selected: i,
    select: (h, v, g) => {
      let b = [...i ?? []];
      if (u(h)) {
        if ((i == null ? void 0 : i.length) === d || r && (i == null ? void 0 : i.length) === 1)
          return;
        b = i == null ? void 0 : i.filter((y) => !c(y, h));
      } else
        (i == null ? void 0 : i.length) === m ? b = [h] : b = [...b, h];
      return o || s(b), o == null || o(b, h, v, g), b;
    },
    isSelected: u
  };
}
function OP(e, t, n = 0, r = 0, o = !1, a = nt) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: u, isBefore: d } = a;
  let m;
  if (!s && !i)
    m = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? o ? m = { from: s, to: void 0 } : m = void 0 : d(e, s) ? m = { from: e, to: s } : m = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? m = { from: s, to: i } : m = void 0;
    else if (c(s, e))
      m = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      m = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, s))
      m = { from: e, to: i };
    else if (u(e, s))
      m = { from: s, to: e };
    else if (u(e, i))
      m = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (m != null && m.from && (m != null && m.to)) {
    const p = a.differenceInCalendarDays(m.to, m.from);
    r > 0 && p > r ? m = { from: e, to: void 0 } : n > 1 && p < n && (m = { from: e, to: void 0 });
  }
  return m;
}
function IP(e, t, n = nt) {
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
function Us(e, t, n = nt) {
  return it(e, t.from, !1, n) || it(e, t.to, !1, n) || it(t, e.from, !1, n) || it(t, e.to, !1, n);
}
function zP(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? it(e, i, !1, n) : jm(i, n) ? i.some((c) => it(e, c, !1, n)) : zi(i) ? i.from && i.to ? Us(e, { from: i.from, to: i.to }, n) : !1 : Um(i) ? IP(e, i.dayOfWeek, n) : Hm(i) ? n.isAfter(i.before, i.after) ? Us(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : st(e.from, i, n) || st(e.to, i, n) : Gm(i) || Ym(i) ? st(e.from, i, n) || st(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= c; u++) {
      if (s.some((d) => d(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function LP(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = Po(o, s ? o : void 0), u = s ? o : i;
  return {
    selected: u,
    select: (p, h, v) => {
      const { min: g, max: b } = e, y = p ? OP(p, u, g, b, a, t) : void 0;
      return r && n && (y != null && y.from) && y.to && zP({ from: y.from, to: y.to }, n, t) && (y.from = p, y.to = void 0), s || c(y), s == null || s(y, p, h, v), y;
    },
    isSelected: (p) => u && it(u, p, !1, t)
  };
}
function $P(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Po(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (m, p, h) => {
      let v = m;
      return !r && i && i && c(m, i) && (v = void 0), o || s(v), o == null || o(v, m, p, h), v;
    },
    isSelected: (m) => i ? c(i, m) : !1
  };
}
function FP(e, t) {
  const n = $P(e, t), r = AP(e, t), o = LP(e, t);
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
function WP(e) {
  var Bi;
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ee(t.today, t.timeZone)), t.month && (t.month = new Ee(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ee(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ee(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ee(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ee(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = (Bi = t.selected) == null ? void 0 : Bi.map((ae) => new Ee(ae, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ee(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ee(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = Ot(() => {
    const ae = { ...Ii, ...t.locale };
    return {
      dateLib: new mt({
        locale: ae,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: GR(t.components),
      formatters: eP(t.formatters),
      labels: { ...gP, ...t.labels },
      locale: ae,
      classNames: { ...Li(), ...t.classNames }
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
  ]), { captionLayout: c, mode: u, navLayout: d, numberOfMonths: m = 1, onDayBlur: p, onDayClick: h, onDayFocus: v, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: y, onNextClick: w, onPrevClick: x, showWeekNumber: k, styles: C } = t, { formatCaption: R, formatDay: P, formatMonthDropdown: N, formatWeekNumber: E, formatWeekNumberHeader: A, formatWeekdayName: z, formatYearDropdown: $ } = r, Y = MP(t, a), { days: G, months: K, navStart: H, navEnd: q, previousMonth: M, nextMonth: T, goToMonth: Z } = Y, ne = hR(G, t, H, q, a), { isSelected: _, select: B, selected: W } = FP(t, a) ?? {}, { blur: V, focused: ee, isFocusTarget: L, moveFocus: te, setFocused: J } = TP(t, Y, ne, _ ?? (() => !1), a), { labelDayButton: re, labelGridcell: se, labelGrid: ie, labelMonthDropdown: _e, labelNav: De, labelPrevious: Mt, labelNext: _t, labelWeekday: Dt, labelWeekNumber: Mo, labelWeekNumberHeader: Ut, labelYearDropdown: fp } = o, mp = Ot(() => rP(a, t.ISOWeek), [a, t.ISOWeek]), Fi = u !== void 0 || h !== void 0, _o = Pe(() => {
    M && (Z(M), x == null || x(M));
  }, [M, Z, x]), Do = Pe(() => {
    T && (Z(T), w == null || w(T));
  }, [Z, T, w]), pp = Pe((ae, fe) => (le) => {
    le.preventDefault(), le.stopPropagation(), J(ae), B == null || B(ae.date, fe, le), h == null || h(ae.date, fe, le);
  }, [B, h, J]), hp = Pe((ae, fe) => (le) => {
    J(ae), v == null || v(ae.date, fe, le);
  }, [v, J]), gp = Pe((ae, fe) => (le) => {
    V(), p == null || p(ae.date, fe, le);
  }, [V, p]), vp = Pe((ae, fe) => (le) => {
    const pt = {
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
    if (pt[le.key]) {
      le.preventDefault(), le.stopPropagation();
      const [Fe, rr] = pt[le.key];
      te(Fe, rr);
    }
    g == null || g(ae.date, fe, le);
  }, [te, g, t.dir]), bp = Pe((ae, fe) => (le) => {
    b == null || b(ae.date, fe, le);
  }, [b]), yp = Pe((ae, fe) => (le) => {
    y == null || y(ae.date, fe, le);
  }, [y]), wp = Pe((ae) => (fe) => {
    const le = Number(fe.target.value), pt = a.setMonth(a.startOfMonth(ae), le);
    Z(pt);
  }, [a, Z]), xp = Pe((ae) => (fe) => {
    const le = Number(fe.target.value), pt = a.setYear(a.startOfMonth(ae), le);
    Z(pt);
  }, [a, Z]), { className: Cp, style: Sp } = Ot(() => ({
    className: [i[X.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[X.Root], ...t.style }
  }), [i, t.className, t.style, C]), kp = YR(t), Wi = ot(null);
  wP(Wi, !!t.animate, {
    classNames: i,
    months: K,
    focused: ee,
    dateLib: a
  });
  const Np = {
    dayPickerProps: t,
    selected: W,
    select: B,
    isSelected: _,
    months: K,
    nextMonth: T,
    previousMonth: M,
    goToMonth: Z,
    getModifiers: ne,
    components: n,
    classNames: i,
    styles: C,
    labels: o,
    formatters: r
  };
  return O.createElement(
    Km.Provider,
    { value: Np },
    O.createElement(
      n.Root,
      { rootRef: t.animate ? Wi : void 0, className: Cp, style: Sp, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], ...kp },
      O.createElement(
        n.Months,
        { className: i[X.Months], style: C == null ? void 0 : C[X.Months] },
        !t.hideNavigation && !d && O.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[X.Nav], style: C == null ? void 0 : C[X.Nav], "aria-label": De(), onPreviousClick: _o, onNextClick: Do, previousMonth: M, nextMonth: T }),
        K.map((ae, fe) => {
          const le = tP(ae.date, H, q, r, a), pt = oP(H, q, r, a);
          return O.createElement(
            n.Month,
            { "data-animated-month": t.animate ? "true" : void 0, className: i[X.Month], style: C == null ? void 0 : C[X.Month], key: fe, displayIndex: fe, calendarMonth: ae },
            d === "around" && !t.hideNavigation && fe === 0 && O.createElement(
              n.PreviousMonthButton,
              { type: "button", className: i[X.PreviousMonthButton], tabIndex: M ? void 0 : -1, "aria-disabled": M ? void 0 : !0, "aria-label": Mt(M), onClick: _o, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(n.Chevron, { disabled: M ? void 0 : !0, className: i[X.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            O.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[X.MonthCaption], style: C == null ? void 0 : C[X.MonthCaption], calendarMonth: ae, displayIndex: fe }, c != null && c.startsWith("dropdown") ? O.createElement(
              n.DropdownNav,
              { className: i[X.Dropdowns], style: C == null ? void 0 : C[X.Dropdowns] },
              c === "dropdown" || c === "dropdown-months" ? O.createElement(n.MonthsDropdown, { className: i[X.MonthsDropdown], "aria-label": _e(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: wp(ae.date), options: le, style: C == null ? void 0 : C[X.Dropdown], value: a.getMonth(ae.date) }) : O.createElement("span", null, N(ae.date, a)),
              c === "dropdown" || c === "dropdown-years" ? O.createElement(n.YearsDropdown, { className: i[X.YearsDropdown], "aria-label": fp(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: xp(ae.date), options: pt, style: C == null ? void 0 : C[X.Dropdown], value: a.getYear(ae.date) }) : O.createElement("span", null, $(ae.date, a)),
              O.createElement("span", { role: "status", "aria-live": "polite", style: {
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
              } }, R(ae.date, a.options, a))
            ) : O.createElement(n.CaptionLabel, { className: i[X.CaptionLabel], role: "status", "aria-live": "polite" }, R(ae.date, a.options, a))),
            d === "around" && !t.hideNavigation && fe === m - 1 && O.createElement(
              n.NextMonthButton,
              { type: "button", className: i[X.NextMonthButton], tabIndex: T ? void 0 : -1, "aria-disabled": T ? void 0 : !0, "aria-label": _t(T), onClick: Do, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(n.Chevron, { disabled: T ? void 0 : !0, className: i[X.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            fe === m - 1 && d === "after" && !t.hideNavigation && O.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[X.Nav], style: C == null ? void 0 : C[X.Nav], "aria-label": De(), onPreviousClick: _o, onNextClick: Do, previousMonth: M, nextMonth: T }),
            O.createElement(
              n.MonthGrid,
              { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": ie(ae.date, a.options, a) || void 0, className: i[X.MonthGrid], style: C == null ? void 0 : C[X.MonthGrid] },
              !t.hideWeekdays && O.createElement(
                n.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[X.Weekdays], style: C == null ? void 0 : C[X.Weekdays] },
                k && O.createElement(n.WeekNumberHeader, { "aria-label": Ut(a.options), className: i[X.WeekNumberHeader], style: C == null ? void 0 : C[X.WeekNumberHeader], scope: "col" }, A()),
                mp.map((Fe, rr) => O.createElement(n.Weekday, { "aria-label": Dt(Fe, a.options, a), className: i[X.Weekday], key: rr, style: C == null ? void 0 : C[X.Weekday], scope: "col" }, z(Fe, a.options, a)))
              ),
              O.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[X.Weeks], style: C == null ? void 0 : C[X.Weeks] }, ae.weeks.map((Fe, rr) => O.createElement(
                n.Week,
                { className: i[X.Week], key: Fe.weekNumber, style: C == null ? void 0 : C[X.Week], week: Fe },
                k && O.createElement(n.WeekNumber, { week: Fe, style: C == null ? void 0 : C[X.WeekNumber], "aria-label": Mo(Fe.weekNumber, {
                  locale: s
                }), className: i[X.WeekNumber], scope: "row", role: "rowheader" }, E(Fe.weekNumber, a)),
                Fe.days.map((Re) => {
                  const { date: Ue } = Re, ce = ne(Re);
                  if (ce[pe.focused] = !ce.hidden && !!(ee != null && ee.isEqualTo(Re)), ce[Be.selected] = (_ == null ? void 0 : _(Ue)) || ce.selected, zi(W)) {
                    const { from: To, to: Ao } = W;
                    ce[Be.range_start] = !!(To && Ao && a.isSameDay(Ue, To)), ce[Be.range_end] = !!(To && Ao && a.isSameDay(Ue, Ao)), ce[Be.range_middle] = it(W, Ue, !0, a);
                  }
                  const Rp = nP(ce, C, t.modifiersStyles), Pp = gR(ce, i, t.modifiersClassNames), Ep = !Fi && !ce.hidden ? se(Ue, ce, a.options, a) : void 0;
                  return O.createElement(n.Day, { key: `${a.format(Ue, "yyyy-MM-dd")}_${a.format(Re.displayMonth, "yyyy-MM")}`, day: Re, modifiers: ce, className: Pp.join(" "), style: Rp, role: "gridcell", "aria-selected": ce.selected || void 0, "aria-label": Ep, "data-day": a.format(Ue, "yyyy-MM-dd"), "data-month": Re.outside ? a.format(Ue, "yyyy-MM") : void 0, "data-selected": ce.selected || void 0, "data-disabled": ce.disabled || void 0, "data-hidden": ce.hidden || void 0, "data-outside": Re.outside || void 0, "data-focused": ce.focused || void 0, "data-today": ce.today || void 0 }, !ce.hidden && Fi ? O.createElement(n.DayButton, { className: i[X.DayButton], style: C == null ? void 0 : C[X.DayButton], type: "button", day: Re, modifiers: ce, disabled: ce.disabled || void 0, tabIndex: L(Re) ? 0 : -1, "aria-label": re(Ue, ce, a.options, a), onClick: pp(Re, ce), onBlur: gp(Re, ce), onFocus: hp(Re, ce), onKeyDown: vp(Re, ce), onMouseEnter: bp(Re, ce), onMouseLeave: yp(Re, ce) }, P(Ue, a.options, a)) : !ce.hidden && P(Re.date, a.options, a));
                })
              )))
            )
          );
        })
      ),
      t.footer && O.createElement(n.Footer, { className: i[X.Footer], style: C == null ? void 0 : C[X.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function js({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const c = Li();
  return /* @__PURE__ */ l(
    WP,
    {
      showOutsideDays: n,
      className: S(
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
        root: S("w-fit", c.root),
        months: S(
          "relative flex flex-col gap-4 md:flex-row",
          c.months
        ),
        month: S("flex w-full flex-col gap-4", c.month),
        nav: S(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          c.nav
        ),
        button_previous: S(
          zr({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          c.button_previous
        ),
        button_next: S(
          zr({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          c.button_next
        ),
        month_caption: S(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: S(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          c.dropdowns
        ),
        dropdown_root: S(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
          c.dropdown_root
        ),
        dropdown: S(
          "absolute inset-0 bg-popover opacity-0",
          c.dropdown
        ),
        caption_label: S(
          "font-medium select-none",
          r === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: S("flex", c.weekdays),
        weekday: S(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          c.weekday
        ),
        week: S("mt-2 flex w-full", c.week),
        week_number_header: S(
          "w-(--cell-size) select-none",
          c.week_number_header
        ),
        week_number: S(
          "text-[0.8rem] text-muted-foreground select-none",
          c.week_number
        ),
        day: S(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          i.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          c.day
        ),
        range_start: S(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: S("rounded-none", c.range_middle),
        range_end: S("rounded-r-md bg-accent", c.range_end),
        today: S(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          c.today
        ),
        outside: S(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: S(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: S("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: u, rootRef: d, ...m }) => /* @__PURE__ */ l(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: S(u),
            ...m
          }
        ),
        Chevron: ({ className: u, orientation: d, ...m }) => d === "left" ? /* @__PURE__ */ l(Fa, { className: S("size-4", u), ...m }) : d === "right" ? /* @__PURE__ */ l(
          zn,
          {
            className: S("size-4", u),
            ...m
          }
        ) : /* @__PURE__ */ l(Br, { className: S("size-4", u), ...m }),
        DayButton: BP,
        WeekNumber: ({ children: u, ...d }) => /* @__PURE__ */ l("td", { ...d, children: /* @__PURE__ */ l("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: u }) }),
        ...s
      },
      ...i
    }
  );
}
function BP({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Li(), a = f.useRef(null);
  return f.useEffect(() => {
    var s;
    n.focused && ((s = a.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ l(
    Qn,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: S(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
function hr(e, t = {}) {
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
function Cn(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function oa(e) {
  if (!e) return;
  const t = typeof e == "string" ? Number(e) : e, n = new Date(t);
  return Number.isNaN(n.getTime()) ? void 0 : n;
}
function Ks(e) {
  return e == null ? [] : Array.isArray(e) ? e.map((t) => {
    if (typeof t == "number" || typeof t == "string")
      return t;
  }) : typeof e == "string" || typeof e == "number" ? [e] : [];
}
function VP({
  column: e,
  title: t,
  multiple: n
}) {
  const r = e.getFilterValue(), o = f.useMemo(() => {
    if (!r)
      return n ? { from: void 0, to: void 0 } : [];
    if (n) {
      const p = Ks(r);
      return {
        from: oa(p[0]),
        to: oa(p[1])
      };
    }
    const d = Ks(r), m = oa(d[0]);
    return m ? [m] : [];
  }, [r, n]), a = f.useCallback(
    (d) => {
      var m, p;
      if (!d) {
        e.setFilterValue(void 0);
        return;
      }
      if (n && !("getTime" in d)) {
        const h = (m = d.from) == null ? void 0 : m.getTime(), v = (p = d.to) == null ? void 0 : p.getTime();
        e.setFilterValue(h || v ? [h, v] : void 0);
      } else !n && "getTime" in d && e.setFilterValue(d.getTime());
    },
    [e, n]
  ), s = f.useCallback(
    (d) => {
      d.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  ), i = f.useMemo(() => n ? Cn(o) ? o.from || o.to : !1 : Array.isArray(o) ? o.length > 0 : !1, [n, o]), c = f.useCallback((d) => !d.from && !d.to ? "" : d.from && d.to ? `${hr(d.from)} - ${hr(d.to)}` : hr(d.from ?? d.to), []), u = f.useMemo(() => {
    if (n) {
      if (!Cn(o)) return null;
      const p = o.from || o.to, h = p ? c(o) : "Select date range";
      return /* @__PURE__ */ D("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ l("span", { children: t }),
        p && /* @__PURE__ */ D(ke, { children: [
          /* @__PURE__ */ l(
            $r,
            {
              orientation: "vertical",
              className: "mx-0.5 data-[orientation=vertical]:h-4"
            }
          ),
          /* @__PURE__ */ l("span", { children: h })
        ] })
      ] });
    }
    if (Cn(o)) return null;
    const d = o.length > 0, m = d ? hr(o[0]) : "Select date";
    return /* @__PURE__ */ D("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ l("span", { children: t }),
      d && /* @__PURE__ */ D(ke, { children: [
        /* @__PURE__ */ l(
          $r,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ l("span", { children: m })
      ] })
    ] });
  }, [o, n, c, t]);
  return /* @__PURE__ */ D(ko, { children: [
    /* @__PURE__ */ l(No, { asChild: !0, children: /* @__PURE__ */ D(
      Oe,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          i ? /* @__PURE__ */ l(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              onClick: s,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              children: /* @__PURE__ */ l(Wa, {})
            }
          ) : /* @__PURE__ */ l(Nh, {}),
          u
        ]
      }
    ) }),
    /* @__PURE__ */ l(Ro, { className: "w-auto p-0", align: "start", children: n ? /* @__PURE__ */ l(
      js,
      {
        autoFocus: !0,
        captionLayout: "dropdown",
        mode: "range",
        selected: Cn(o) ? o : { from: void 0, to: void 0 },
        onSelect: a
      }
    ) : /* @__PURE__ */ l(
      js,
      {
        captionLayout: "dropdown",
        mode: "single",
        selected: Cn(o) ? void 0 : o[0],
        onSelect: a
      }
    ) })
  ] });
}
var qs = 1, HP = 0.9, GP = 0.8, YP = 0.17, aa = 0.1, ia = 0.999, UP = 0.9999, jP = 0.99, KP = /[\\\/_+.#"@\[\(\{&]/, qP = /[\\\/_+.#"@\[\(\{&]/g, XP = /[\s-]/, ep = /[\s-]/g;
function Oa(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? qs : jP;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var c = r.charAt(a), u = n.indexOf(c, o), d = 0, m, p, h, v; u >= 0; ) m = Oa(e, t, n, r, u + 1, a + 1, s), m > d && (u === o ? m *= qs : KP.test(e.charAt(u - 1)) ? (m *= GP, h = e.slice(o, u - 1).match(qP), h && o > 0 && (m *= Math.pow(ia, h.length))) : XP.test(e.charAt(u - 1)) ? (m *= HP, v = e.slice(o, u - 1).match(ep), v && o > 0 && (m *= Math.pow(ia, v.length))) : (m *= YP, o > 0 && (m *= Math.pow(ia, u - o))), e.charAt(u) !== t.charAt(a) && (m *= UP)), (m < aa && n.charAt(u - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(u - 1) !== r.charAt(a)) && (p = Oa(e, t, n, r, u + 1, a + 2, s), p * aa > m && (m = p * aa)), m > d && (d = m), u = n.indexOf(c, u + 1);
  return s[i] = d, d;
}
function Xs(e) {
  return e.toLowerCase().replace(ep, " ");
}
function ZP(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Oa(e, t, Xs(e), Xs(t), 0, 0, {});
}
var Sn = '[cmdk-group=""]', sa = '[cmdk-group-items=""]', QP = '[cmdk-group-heading=""]', tp = '[cmdk-item=""]', Zs = `${tp}:not([aria-disabled="true"])`, Ia = "cmdk-item-select", Jt = "data-value", JP = (e, t, n) => ZP(e, t, n), np = f.createContext(void 0), nr = () => f.useContext(np), rp = f.createContext(void 0), $i = () => f.useContext(rp), op = f.createContext(void 0), ap = f.forwardRef((e, t) => {
  let n = en(() => {
    var _, B;
    return { search: "", value: (B = (_ = e.value) != null ? _ : e.defaultValue) != null ? B : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = en(() => /* @__PURE__ */ new Set()), o = en(() => /* @__PURE__ */ new Map()), a = en(() => /* @__PURE__ */ new Map()), s = en(() => /* @__PURE__ */ new Set()), i = ip(e), { label: c, children: u, value: d, onValueChange: m, filter: p, shouldFilter: h, loop: v, disablePointerSelection: g = !1, vimBindings: b = !0, ...y } = e, w = ge(), x = ge(), k = ge(), C = f.useRef(null), R = dE();
  Wt(() => {
    if (d !== void 0) {
      let _ = d.trim();
      n.current.value = _, P.emit();
    }
  }, [d]), Wt(() => {
    R(6, Y);
  }, []);
  let P = f.useMemo(() => ({ subscribe: (_) => (s.current.add(_), () => s.current.delete(_)), snapshot: () => n.current, setState: (_, B, W) => {
    var V, ee, L, te;
    if (!Object.is(n.current[_], B)) {
      if (n.current[_] = B, _ === "search") $(), A(), R(1, z);
      else if (_ === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let J = document.getElementById(k);
          J ? J.focus() : (V = document.getElementById(w)) == null || V.focus();
        }
        if (R(7, () => {
          var J;
          n.current.selectedItemId = (J = G()) == null ? void 0 : J.id, P.emit();
        }), W || R(5, Y), ((ee = i.current) == null ? void 0 : ee.value) !== void 0) {
          let J = B ?? "";
          (te = (L = i.current).onValueChange) == null || te.call(L, J);
          return;
        }
      }
      P.emit();
    }
  }, emit: () => {
    s.current.forEach((_) => _());
  } }), []), N = f.useMemo(() => ({ value: (_, B, W) => {
    var V;
    B !== ((V = a.current.get(_)) == null ? void 0 : V.value) && (a.current.set(_, { value: B, keywords: W }), n.current.filtered.items.set(_, E(B, W)), R(2, () => {
      A(), P.emit();
    }));
  }, item: (_, B) => (r.current.add(_), B && (o.current.has(B) ? o.current.get(B).add(_) : o.current.set(B, /* @__PURE__ */ new Set([_]))), R(3, () => {
    $(), A(), n.current.value || z(), P.emit();
  }), () => {
    a.current.delete(_), r.current.delete(_), n.current.filtered.items.delete(_);
    let W = G();
    R(4, () => {
      $(), (W == null ? void 0 : W.getAttribute("id")) === _ && z(), P.emit();
    });
  }), group: (_) => (o.current.has(_) || o.current.set(_, /* @__PURE__ */ new Set()), () => {
    a.current.delete(_), o.current.delete(_);
  }), filter: () => i.current.shouldFilter, label: c || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: w, inputId: k, labelId: x, listInnerRef: C }), []);
  function E(_, B) {
    var W, V;
    let ee = (V = (W = i.current) == null ? void 0 : W.filter) != null ? V : JP;
    return _ ? ee(_, n.current.search, B) : 0;
  }
  function A() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let _ = n.current.filtered.items, B = [];
    n.current.filtered.groups.forEach((V) => {
      let ee = o.current.get(V), L = 0;
      ee.forEach((te) => {
        let J = _.get(te);
        L = Math.max(J, L);
      }), B.push([V, L]);
    });
    let W = C.current;
    K().sort((V, ee) => {
      var L, te;
      let J = V.getAttribute("id"), re = ee.getAttribute("id");
      return ((L = _.get(re)) != null ? L : 0) - ((te = _.get(J)) != null ? te : 0);
    }).forEach((V) => {
      let ee = V.closest(sa);
      ee ? ee.appendChild(V.parentElement === ee ? V : V.closest(`${sa} > *`)) : W.appendChild(V.parentElement === W ? V : V.closest(`${sa} > *`));
    }), B.sort((V, ee) => ee[1] - V[1]).forEach((V) => {
      var ee;
      let L = (ee = C.current) == null ? void 0 : ee.querySelector(`${Sn}[${Jt}="${encodeURIComponent(V[0])}"]`);
      L == null || L.parentElement.appendChild(L);
    });
  }
  function z() {
    let _ = K().find((W) => W.getAttribute("aria-disabled") !== "true"), B = _ == null ? void 0 : _.getAttribute(Jt);
    P.setState("value", B || void 0);
  }
  function $() {
    var _, B, W, V;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let ee = 0;
    for (let L of r.current) {
      let te = (B = (_ = a.current.get(L)) == null ? void 0 : _.value) != null ? B : "", J = (V = (W = a.current.get(L)) == null ? void 0 : W.keywords) != null ? V : [], re = E(te, J);
      n.current.filtered.items.set(L, re), re > 0 && ee++;
    }
    for (let [L, te] of o.current) for (let J of te) if (n.current.filtered.items.get(J) > 0) {
      n.current.filtered.groups.add(L);
      break;
    }
    n.current.filtered.count = ee;
  }
  function Y() {
    var _, B, W;
    let V = G();
    V && (((_ = V.parentElement) == null ? void 0 : _.firstChild) === V && ((W = (B = V.closest(Sn)) == null ? void 0 : B.querySelector(QP)) == null || W.scrollIntoView({ block: "nearest" })), V.scrollIntoView({ block: "nearest" }));
  }
  function G() {
    var _;
    return (_ = C.current) == null ? void 0 : _.querySelector(`${tp}[aria-selected="true"]`);
  }
  function K() {
    var _;
    return Array.from(((_ = C.current) == null ? void 0 : _.querySelectorAll(Zs)) || []);
  }
  function H(_) {
    let B = K()[_];
    B && P.setState("value", B.getAttribute(Jt));
  }
  function q(_) {
    var B;
    let W = G(), V = K(), ee = V.findIndex((te) => te === W), L = V[ee + _];
    (B = i.current) != null && B.loop && (L = ee + _ < 0 ? V[V.length - 1] : ee + _ === V.length ? V[0] : V[ee + _]), L && P.setState("value", L.getAttribute(Jt));
  }
  function M(_) {
    let B = G(), W = B == null ? void 0 : B.closest(Sn), V;
    for (; W && !V; ) W = _ > 0 ? lE(W, Sn) : cE(W, Sn), V = W == null ? void 0 : W.querySelector(Zs);
    V ? P.setState("value", V.getAttribute(Jt)) : q(_);
  }
  let T = () => H(K().length - 1), Z = (_) => {
    _.preventDefault(), _.metaKey ? T() : _.altKey ? M(1) : q(1);
  }, ne = (_) => {
    _.preventDefault(), _.metaKey ? H(0) : _.altKey ? M(-1) : q(-1);
  };
  return f.createElement(F.div, { ref: t, tabIndex: -1, ...y, "cmdk-root": "", onKeyDown: (_) => {
    var B;
    (B = y.onKeyDown) == null || B.call(y, _);
    let W = _.nativeEvent.isComposing || _.keyCode === 229;
    if (!(_.defaultPrevented || W)) switch (_.key) {
      case "n":
      case "j": {
        b && _.ctrlKey && Z(_);
        break;
      }
      case "ArrowDown": {
        Z(_);
        break;
      }
      case "p":
      case "k": {
        b && _.ctrlKey && ne(_);
        break;
      }
      case "ArrowUp": {
        ne(_);
        break;
      }
      case "Home": {
        _.preventDefault(), H(0);
        break;
      }
      case "End": {
        _.preventDefault(), T();
        break;
      }
      case "Enter": {
        _.preventDefault();
        let V = G();
        if (V) {
          let ee = new Event(Ia);
          V.dispatchEvent(ee);
        }
      }
    }
  } }, f.createElement("label", { "cmdk-label": "", htmlFor: N.inputId, id: N.labelId, style: fE }, c), Eo(e, (_) => f.createElement(rp.Provider, { value: P }, f.createElement(np.Provider, { value: N }, _))));
}), eE = f.forwardRef((e, t) => {
  var n, r;
  let o = ge(), a = f.useRef(null), s = f.useContext(op), i = nr(), c = ip(e), u = (r = (n = c.current) == null ? void 0 : n.forceMount) != null ? r : s == null ? void 0 : s.forceMount;
  Wt(() => {
    if (!u) return i.item(o, s == null ? void 0 : s.id);
  }, [u]);
  let d = sp(o, a, [e.value, e.children, a], e.keywords), m = $i(), p = Ct((R) => R.value && R.value === d.current), h = Ct((R) => u || i.filter() === !1 ? !0 : R.search ? R.filtered.items.get(o) > 0 : !0);
  f.useEffect(() => {
    let R = a.current;
    if (!(!R || e.disabled)) return R.addEventListener(Ia, v), () => R.removeEventListener(Ia, v);
  }, [h, e.onSelect, e.disabled]);
  function v() {
    var R, P;
    g(), (P = (R = c.current).onSelect) == null || P.call(R, d.current);
  }
  function g() {
    m.setState("value", d.current, !0);
  }
  if (!h) return null;
  let { disabled: b, value: y, onSelect: w, forceMount: x, keywords: k, ...C } = e;
  return f.createElement(F.div, { ref: lt(a, t), ...C, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!p, "data-disabled": !!b, "data-selected": !!p, onPointerMove: b || i.getDisablePointerSelection() ? void 0 : g, onClick: b ? void 0 : v }, e.children);
}), tE = f.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = ge(), i = f.useRef(null), c = f.useRef(null), u = ge(), d = nr(), m = Ct((h) => o || d.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(s) : !0);
  Wt(() => d.group(s), []), sp(s, i, [e.value, e.heading, c]);
  let p = f.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return f.createElement(F.div, { ref: lt(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: m ? void 0 : !0 }, n && f.createElement("div", { ref: c, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, n), Eo(e, (h) => f.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? u : void 0 }, f.createElement(op.Provider, { value: p }, h))));
}), nE = f.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = f.useRef(null), a = Ct((s) => !s.search);
  return !n && !a ? null : f.createElement(F.div, { ref: lt(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), rE = f.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = $i(), s = Ct((u) => u.search), i = Ct((u) => u.selectedItemId), c = nr();
  return f.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), f.createElement(F.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": c.listId, "aria-labelledby": c.labelId, "aria-activedescendant": i, id: c.inputId, type: "text", value: o ? e.value : s, onChange: (u) => {
    o || a.setState("search", u.target.value), n == null || n(u.target.value);
  } });
}), oE = f.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = f.useRef(null), s = f.useRef(null), i = Ct((u) => u.selectedItemId), c = nr();
  return f.useEffect(() => {
    if (s.current && a.current) {
      let u = s.current, d = a.current, m, p = new ResizeObserver(() => {
        m = requestAnimationFrame(() => {
          let h = u.offsetHeight;
          d.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return p.observe(u), () => {
        cancelAnimationFrame(m), p.unobserve(u);
      };
    }
  }, []), f.createElement(F.div, { ref: lt(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: c.listId }, Eo(e, (u) => f.createElement("div", { ref: lt(s, c.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), aE = f.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return f.createElement(qr, { open: n, onOpenChange: r }, f.createElement(Xr, { container: s }, f.createElement(Zr, { "cmdk-overlay": "", className: o }), f.createElement(Qr, { "aria-label": e.label, "cmdk-dialog": "", className: a }, f.createElement(ap, { ref: t, ...i }))));
}), iE = f.forwardRef((e, t) => Ct((n) => n.filtered.count === 0) ? f.createElement(F.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), sE = f.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return f.createElement(F.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Eo(e, (s) => f.createElement("div", { "aria-hidden": !0 }, s)));
}), Yt = Object.assign(ap, { List: oE, Item: eE, Input: rE, Group: tE, Separator: nE, Dialog: aE, Empty: iE, Loading: sE });
function lE(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function cE(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function ip(e) {
  let t = f.useRef(e);
  return Wt(() => {
    t.current = e;
  }), t;
}
var Wt = typeof window > "u" ? f.useEffect : f.useLayoutEffect;
function en(e) {
  let t = f.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function Ct(e) {
  let t = $i(), n = () => e(t.snapshot());
  return f.useSyncExternalStore(t.subscribe, n, n);
}
function sp(e, t, n, r = []) {
  let o = f.useRef(), a = nr();
  return Wt(() => {
    var s;
    let i = (() => {
      var u;
      for (let d of n) {
        if (typeof d == "string") return d.trim();
        if (typeof d == "object" && "current" in d) return d.current ? (u = d.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), c = r.map((u) => u.trim());
    a.value(e, i, c), (s = t.current) == null || s.setAttribute(Jt, i), o.current = i;
  }), o;
}
var dE = () => {
  let [e, t] = f.useState(), n = en(() => /* @__PURE__ */ new Map());
  return Wt(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function uE(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Eo({ asChild: e, children: t }, n) {
  return e && f.isValidElement(t) ? f.cloneElement(uE(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var fE = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function lp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Yt,
    {
      "data-slot": "command",
      className: S(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        e
      ),
      ...t
    }
  );
}
function cp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ D(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ l(Uh, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ l(
          Yt.Input,
          {
            "data-slot": "command-input",
            className: S(
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
function dp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Yt.List,
    {
      "data-slot": "command-list",
      className: S(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...t
    }
  );
}
function up({
  ...e
}) {
  return /* @__PURE__ */ l(
    Yt.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function za({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Yt.Group,
    {
      "data-slot": "command-group",
      className: S(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function mE({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Yt.Separator,
    {
      "data-slot": "command-separator",
      className: S("-mx-1 h-px bg-border", e),
      ...t
    }
  );
}
function La({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Yt.Item,
    {
      "data-slot": "command-item",
      className: S(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function pE({
  column: e,
  title: t,
  options: n,
  multiple: r
}) {
  const [o, a] = f.useState(!1), s = e == null ? void 0 : e.getFilterValue(), i = new Set(
    Array.isArray(s) ? s : []
  ), c = f.useCallback(
    (d, m) => {
      if (e)
        if (r) {
          const p = new Set(i);
          m ? p.delete(d.value) : p.add(d.value);
          const h = Array.from(p);
          e.setFilterValue(h.length ? h : void 0);
        } else
          e.setFilterValue(m ? void 0 : [d.value]), a(!1);
    },
    [e, r, i]
  ), u = f.useCallback(
    (d) => {
      d == null || d.stopPropagation(), e == null || e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ D(ko, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ l(No, { asChild: !0, children: /* @__PURE__ */ D(
      Oe,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          (i == null ? void 0 : i.size) > 0 ? /* @__PURE__ */ l(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: u,
              children: /* @__PURE__ */ l(Wa, {})
            }
          ) : /* @__PURE__ */ l(vl, {}),
          t,
          (i == null ? void 0 : i.size) > 0 && /* @__PURE__ */ D(ke, { children: [
            /* @__PURE__ */ l(
              $r,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            /* @__PURE__ */ l(
              qo,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal lg:hidden",
                children: i.size
              }
            ),
            /* @__PURE__ */ l("div", { className: "hidden items-center gap-1 lg:flex", children: i.size > 2 ? /* @__PURE__ */ D(
              qo,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: [
                  i.size,
                  " selected"
                ]
              }
            ) : n.filter((d) => i.has(d.value)).map((d) => /* @__PURE__ */ l(
              qo,
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
    /* @__PURE__ */ l(Ro, { className: "w-50 p-0", align: "start", children: /* @__PURE__ */ D(lp, { children: [
      /* @__PURE__ */ l(cp, { placeholder: t }),
      /* @__PURE__ */ D(dp, { className: "max-h-full", children: [
        /* @__PURE__ */ l(up, { children: "No results found." }),
        /* @__PURE__ */ l(za, { className: "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", children: n.map((d) => {
          const m = i.has(d.value);
          return /* @__PURE__ */ D(
            La,
            {
              onSelect: () => c(d, m),
              children: [
                /* @__PURE__ */ l(
                  "div",
                  {
                    className: S(
                      "flex size-4 items-center justify-center rounded-sm border border-primary",
                      m ? "bg-primary" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ l(at, {})
                  }
                ),
                d.icon && /* @__PURE__ */ l(d.icon, {}),
                /* @__PURE__ */ l("span", { className: "truncate", children: d.label }),
                d.count && /* @__PURE__ */ l("span", { className: "ml-auto font-mono text-xs", children: d.count })
              ]
            },
            d.value
          );
        }) }),
        i.size > 0 && /* @__PURE__ */ D(ke, { children: [
          /* @__PURE__ */ l(mE, {}),
          /* @__PURE__ */ l(za, { children: /* @__PURE__ */ l(
            La,
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
function hE(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && typeof e[1] == "number";
}
function gE(e) {
  if (Array.isArray(e) && e.length === 2 && e.every(
    (t) => (typeof t == "string" || typeof t == "number") && !Number.isNaN(t)
  ))
    return [Number(e[0]), Number(e[1])];
}
function vE({
  column: e,
  title: t
}) {
  var g, b, y, w;
  const n = f.useId(), r = gE(e.getFilterValue()), o = (g = e.columnDef.meta) == null ? void 0 : g.range, a = (b = e.columnDef.meta) == null ? void 0 : b.unit, { min: s, max: i, step: c } = f.useMemo(() => {
    let x = 0, k = 100;
    if (o && hE(o))
      [x, k] = o;
    else {
      const P = e.getFacetedMinMaxValues();
      if (P && Array.isArray(P) && P.length === 2) {
        const [N, E] = P;
        typeof N == "number" && typeof E == "number" && (x = N, k = E);
      }
    }
    const C = k - x, R = C <= 20 ? 1 : C <= 100 ? Math.ceil(C / 20) : Math.ceil(C / 50);
    return { min: x, max: k, step: R };
  }, [e, o]), u = f.useMemo(() => r ?? [s, i], [r, s, i]), d = f.useCallback((x) => x.toLocaleString(void 0, { maximumFractionDigits: 0 }), []), m = f.useCallback(
    (x) => {
      const k = Number(x.target.value);
      !Number.isNaN(k) && k >= s && k <= u[1] && e.setFilterValue([k, u[1]]);
    },
    [e, s, u]
  ), p = f.useCallback(
    (x) => {
      const k = Number(x.target.value);
      !Number.isNaN(k) && k <= i && k >= u[0] && e.setFilterValue([u[0], k]);
    },
    [e, i, u]
  ), h = f.useCallback(
    (x) => {
      Array.isArray(x) && x.length === 2 && e.setFilterValue(x);
    },
    [e]
  ), v = f.useCallback(
    (x) => {
      x.target instanceof HTMLDivElement && x.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ D(ko, { children: [
    /* @__PURE__ */ l(No, { asChild: !0, children: /* @__PURE__ */ D(
      Oe,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          r ? /* @__PURE__ */ l(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: v,
              children: /* @__PURE__ */ l(Wa, {})
            }
          ) : /* @__PURE__ */ l(vl, {}),
          /* @__PURE__ */ l("span", { children: t }),
          r ? /* @__PURE__ */ D(ke, { children: [
            /* @__PURE__ */ l(
              $r,
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
    /* @__PURE__ */ D(Ro, { align: "start", className: "flex w-auto flex-col gap-4", children: [
      /* @__PURE__ */ D("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ l("p", { className: "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: t }),
        /* @__PURE__ */ D("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ l(Xo, { htmlFor: `${n}-from`, className: "sr-only", children: "From" }),
          /* @__PURE__ */ D("div", { className: "relative", children: [
            /* @__PURE__ */ l(
              Lr,
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
                value: (y = u[0]) == null ? void 0 : y.toString(),
                onChange: m,
                className: S("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ l("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] }),
          /* @__PURE__ */ l(Xo, { htmlFor: `${n}-to`, className: "sr-only", children: "to" }),
          /* @__PURE__ */ D("div", { className: "relative", children: [
            /* @__PURE__ */ l(
              Lr,
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
                value: (w = u[1]) == null ? void 0 : w.toString(),
                onChange: p,
                className: S("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ l("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] })
        ] }),
        /* @__PURE__ */ D(Xo, { htmlFor: `${n}-slider`, className: "sr-only", children: [
          t,
          " slider"
        ] }),
        /* @__PURE__ */ l(
          q0,
          {
            id: `${n}-slider`,
            min: s,
            max: i,
            step: c,
            value: u,
            onValueChange: h
          }
        )
      ] }),
      /* @__PURE__ */ l(
        Oe,
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
function bE({
  table: e,
  disabled: t,
  ...n
}) {
  const r = f.useMemo(
    () => e.getAllColumns().filter(
      (o) => typeof o.accessorFn < "u" && o.getCanHide()
    ),
    [e]
  );
  return /* @__PURE__ */ D(ko, { children: [
    /* @__PURE__ */ l(No, { asChild: !0, children: /* @__PURE__ */ D(
      Oe,
      {
        "aria-label": "Toggle columns",
        role: "combobox",
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 font-normal lg:flex",
        disabled: t,
        children: [
          /* @__PURE__ */ l(wl, { className: "text-muted-foreground" }),
          "View"
        ]
      }
    ) }),
    /* @__PURE__ */ l(Ro, { className: "w-44 p-0", ...n, children: /* @__PURE__ */ D(lp, { children: [
      /* @__PURE__ */ l(cp, { placeholder: "Search columns..." }),
      /* @__PURE__ */ D(dp, { children: [
        /* @__PURE__ */ l(up, { children: "No columns found." }),
        /* @__PURE__ */ l(za, { children: r.map((o) => {
          var a;
          return /* @__PURE__ */ D(
            La,
            {
              onSelect: () => o.toggleVisibility(!o.getIsVisible()),
              children: [
                /* @__PURE__ */ l("span", { className: "truncate", children: ((a = o.columnDef.meta) == null ? void 0 : a.label) ?? o.id }),
                /* @__PURE__ */ l(
                  at,
                  {
                    className: S(
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
function iD({
  table: e,
  children: t,
  className: n,
  ...r
}) {
  const o = e.getState().columnFilters.length > 0, a = f.useMemo(
    () => e.getAllColumns().filter((i) => i.getCanFilter()),
    [e]
  ), s = f.useCallback(() => {
    e.resetColumnFilters();
  }, [e]);
  return /* @__PURE__ */ D(
    "div",
    {
      role: "toolbar",
      "aria-orientation": "horizontal",
      className: S(
        "flex w-full items-start justify-between gap-2 p-1",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ D("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
          a.map((i) => /* @__PURE__ */ l(yE, { column: i }, i.id)),
          o && /* @__PURE__ */ D(
            Oe,
            {
              "aria-label": "Reset filters",
              variant: "outline",
              size: "sm",
              className: "border-dashed",
              onClick: s,
              children: [
                /* @__PURE__ */ l(Ba, {}),
                "Reset"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
          t,
          /* @__PURE__ */ l(bE, { table: e, align: "end" })
        ] })
      ]
    }
  );
}
function yE({
  column: e
}) {
  {
    const t = e.columnDef.meta;
    return f.useCallback(() => {
      if (!(t != null && t.variant)) return null;
      switch (t.variant) {
        case "text":
          return /* @__PURE__ */ l(
            Lr,
            {
              placeholder: t.placeholder ?? t.label,
              value: e.getFilterValue() ?? "",
              onChange: (r) => e.setFilterValue(r.target.value),
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "number":
          return /* @__PURE__ */ D("div", { className: "relative", children: [
            /* @__PURE__ */ l(
              Lr,
              {
                type: "number",
                inputMode: "numeric",
                placeholder: t.placeholder ?? t.label,
                value: e.getFilterValue() ?? "",
                onChange: (r) => e.setFilterValue(r.target.value),
                className: S("h-8 w-[120px]", t.unit && "pr-8")
              }
            ),
            t.unit && /* @__PURE__ */ l("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: t.unit })
          ] });
        case "range":
          return /* @__PURE__ */ l(
            vE,
            {
              column: e,
              title: t.label ?? e.id
            }
          );
        case "date":
        case "dateRange":
          return /* @__PURE__ */ l(
            VP,
            {
              column: e,
              title: t.label ?? e.id,
              multiple: t.variant === "dateRange"
            }
          );
        case "select":
        case "multiSelect":
          return /* @__PURE__ */ l(
            pE,
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
function sD({
  columnCount: e,
  rowCount: t = 10,
  filterCount: n = 0,
  cellWidths: r = ["auto"],
  withViewOptions: o = !0,
  withPagination: a = !0,
  shrinkZero: s = !1,
  className: i,
  ...c
}) {
  const u = Array.from(
    { length: e },
    (d, m) => r[m % r.length] ?? "auto"
  );
  return /* @__PURE__ */ D(
    "div",
    {
      className: S("flex w-full flex-col gap-2.5 overflow-auto", i),
      ...c,
      children: [
        /* @__PURE__ */ D("div", { className: "flex w-full items-center justify-between gap-2 overflow-auto p-1", children: [
          /* @__PURE__ */ l("div", { className: "flex flex-1 items-center gap-2", children: n > 0 ? Array.from({ length: n }).map((d, m) => /* @__PURE__ */ l(ze, { className: "h-7 w-18 border-dashed" }, m)) : null }),
          o ? /* @__PURE__ */ l(ze, { className: "ml-auto hidden h-7 w-18 lg:flex" }) : null
        ] }),
        /* @__PURE__ */ l("div", { className: "rounded-md border", children: /* @__PURE__ */ D(X0, { children: [
          /* @__PURE__ */ l(Z0, { children: Array.from({ length: 1 }).map((d, m) => /* @__PURE__ */ l(_s, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((p, h) => /* @__PURE__ */ l(
            J0,
            {
              style: {
                width: u[h],
                minWidth: s ? u[h] : "auto"
              },
              children: /* @__PURE__ */ l(ze, { className: "h-6 w-full" })
            },
            h
          )) }, m)) }),
          /* @__PURE__ */ l(Q0, { children: Array.from({ length: t }).map((d, m) => /* @__PURE__ */ l(_s, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((p, h) => /* @__PURE__ */ l(
            ek,
            {
              style: {
                width: u[h],
                minWidth: s ? u[h] : "auto"
              },
              children: /* @__PURE__ */ l(ze, { className: "h-6 w-full" })
            },
            h
          )) }, m)) })
        ] }) }),
        a ? /* @__PURE__ */ D("div", { className: "flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8", children: [
          /* @__PURE__ */ l(ze, { className: "h-7 w-40 shrink-0" }),
          /* @__PURE__ */ D("div", { className: "flex items-center gap-4 sm:gap-6 lg:gap-8", children: [
            /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ l(ze, { className: "h-7 w-24" }),
              /* @__PURE__ */ l(ze, { className: "h-7 w-18" })
            ] }),
            /* @__PURE__ */ l("div", { className: "flex items-center justify-center font-medium text-sm", children: /* @__PURE__ */ l(ze, { className: "h-7 w-20" }) }),
            /* @__PURE__ */ D("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ l(ze, { className: "hidden size-7 lg:block" }),
              /* @__PURE__ */ l(ze, { className: "size-7" }),
              /* @__PURE__ */ l(ze, { className: "size-7" }),
              /* @__PURE__ */ l(ze, { className: "hidden size-7 lg:block" })
            ] })
          ] })
        ] }) : null
      ]
    }
  );
}
const lD = {
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
  FE as Accordion,
  VE as AccordionContent,
  WE as AccordionItem,
  BE as AccordionTrigger,
  HE as Alert,
  YE as AlertDescription,
  UE as AlertDialog,
  eM as AlertDialogAction,
  tM as AlertDialogCancel,
  KE as AlertDialogContent,
  QE as AlertDialogDescription,
  XE as AlertDialogFooter,
  qE as AlertDialogHeader,
  JE as AlertDialogMedia,
  f0 as AlertDialogOverlay,
  u0 as AlertDialogPortal,
  ZE as AlertDialogTitle,
  jE as AlertDialogTrigger,
  GE as AlertTitle,
  nM as AspectRatio,
  rM as Avatar,
  aM as AvatarFallback,
  oM as AvatarImage,
  qo as Badge,
  iM as Breadcrumb,
  fM as BreadcrumbEllipsis,
  lM as BreadcrumbItem,
  cM as BreadcrumbLink,
  sM as BreadcrumbList,
  dM as BreadcrumbPage,
  uM as BreadcrumbSeparator,
  Oe as Button,
  mM as ButtonGroup,
  pM as Card,
  bM as CardAction,
  yM as CardContent,
  vM as CardDescription,
  wM as CardFooter,
  hM as CardHeader,
  gM as CardTitle,
  xM as Checkbox,
  CM as Collapsible,
  kM as CollapsibleContent,
  SM as CollapsibleTrigger,
  ak as DataGrid,
  ik as DataGridContainer,
  ok as DataGridProvider,
  ck as DataGridScrollArea,
  Lk as DataGridTable,
  oD as DataTable,
  aD as DataTableColumnHeader,
  pE as DataTableFacetedFilter,
  $k as DataTablePagination,
  sD as DataTableSkeleton,
  iD as DataTableToolbar,
  bE as DataTableViewOptions,
  NM as Dialog,
  PM as DialogClose,
  EM as DialogContent,
  TM as DialogDescription,
  _M as DialogFooter,
  MM as DialogHeader,
  b0 as DialogOverlay,
  v0 as DialogPortal,
  DM as DialogTitle,
  RM as DialogTrigger,
  y0 as DropdownMenu,
  S0 as DropdownMenuCheckboxItem,
  x0 as DropdownMenuContent,
  C0 as DropdownMenuGroup,
  Zt as DropdownMenuItem,
  k0 as DropdownMenuLabel,
  AM as DropdownMenuPortal,
  OM as DropdownMenuRadioGroup,
  IM as DropdownMenuRadioItem,
  mr as DropdownMenuSeparator,
  zM as DropdownMenuShortcut,
  N0 as DropdownMenuSub,
  P0 as DropdownMenuSubContent,
  R0 as DropdownMenuSubTrigger,
  w0 as DropdownMenuTrigger,
  LM as Empty,
  VM as EmptyContent,
  BM as EmptyDescription,
  $M as EmptyHeader,
  FM as EmptyMedia,
  WM as EmptyTitle,
  UM as Field,
  jM as FieldContent,
  XM as FieldDescription,
  QM as FieldError,
  YM as FieldGroup,
  KM as FieldLabel,
  GM as FieldLegend,
  ZM as FieldSeparator,
  HM as FieldSet,
  qM as FieldTitle,
  JM as HoverCard,
  t_ as HoverCardContent,
  e_ as HoverCardTrigger,
  Lr as Input,
  n_ as InputGroup,
  r_ as InputGroupAddon,
  o_ as InputGroupButton,
  i_ as InputGroupInput,
  a_ as InputGroupText,
  s_ as InputGroupTextarea,
  d_ as Item,
  h_ as ItemActions,
  f_ as ItemContent,
  p_ as ItemDescription,
  v_ as ItemFooter,
  l_ as ItemGroup,
  g_ as ItemHeader,
  u_ as ItemMedia,
  c_ as ItemSeparator,
  m_ as ItemTitle,
  b_ as Kbd,
  Xo as Label,
  y_ as NativeSelect,
  x_ as NativeSelectOptGroup,
  w_ as NativeSelectOption,
  C_ as Pagination,
  S_ as PaginationContent,
  P_ as PaginationEllipsis,
  k_ as PaginationItem,
  Cm as PaginationLink,
  R_ as PaginationNext,
  N_ as PaginationPrevious,
  ko as Popover,
  Ro as PopoverContent,
  No as PopoverTrigger,
  E_ as Progress,
  M_ as RadioGroup,
  __ as RadioGroupItem,
  D_ as ScrollArea,
  F0 as ScrollBar,
  W0 as Select,
  H0 as SelectContent,
  T_ as SelectGroup,
  G0 as SelectItem,
  A_ as SelectLabel,
  U0 as SelectScrollDownButton,
  Y0 as SelectScrollUpButton,
  O_ as SelectSeparator,
  V0 as SelectTrigger,
  B0 as SelectValue,
  $r as Separator,
  I_ as Sheet,
  L_ as SheetClose,
  $_ as SheetContent,
  V_ as SheetDescription,
  W_ as SheetFooter,
  F_ as SheetHeader,
  B_ as SheetTitle,
  z_ as SheetTrigger,
  ze as Skeleton,
  q0 as Slider,
  p0 as Spinner,
  H_ as Switch,
  X0 as Table,
  Q0 as TableBody,
  Y_ as TableCaption,
  ek as TableCell,
  G_ as TableFooter,
  J0 as TableHead,
  Z0 as TableHeader,
  _s as TableRow,
  U_ as Tabs,
  q_ as TabsContent,
  j_ as TabsList,
  K_ as TabsTrigger,
  X_ as Textarea,
  Z_ as Toggle,
  Q_ as ToggleGroup,
  J_ as ToggleGroupItem,
  tD as Tooltip,
  rD as TooltipContent,
  eD as TooltipProvider,
  nD as TooltipTrigger,
  m0 as badgeVariants,
  h0 as buttonVariants,
  S as cn,
  lD as dataTableConfig,
  tk as tabsListVariants,
  nk as toggleVariants,
  be as useDataGrid
};
//# sourceMappingURL=index.mjs.map
