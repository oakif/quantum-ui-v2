import { jsx as l, Fragment as Pe, jsxs as M } from "react/jsx-runtime";
import * as d from "react";
import O, { forwardRef as Ki, createElement as aa, useState as Tt, useLayoutEffect as qi, useMemo as Dt, createContext as Xi, useContext as Zi, useEffect as $r, useRef as ot, useCallback as Re, memo as Qi, Fragment as Em } from "react";
import * as Fr from "react-dom";
import Pm from "react-dom";
function Ji(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Ji(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function el() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Ji(e)) && (r && (r += " "), r += t);
  return r;
}
const Ia = "-", Mm = (e) => {
  const t = Dm(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(Ia);
      return i[0] === "" && i.length !== 1 && i.shift(), tl(i, t) || _m(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, tl = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? tl(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Ia);
  return t.validators.find(({
    validator: s
  }) => s(a))?.classGroupId;
}, $s = /^\[(.+)\]$/, _m = (e) => {
  if ($s.test(e)) {
    const t = $s.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Dm = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    sa(n[o], r, o, t);
  return r;
}, sa = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Fs(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Tm(o)) {
        sa(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      sa(s, Fs(t, a), n, r);
    });
  });
}, Fs = (e, t) => {
  let n = e;
  return t.split(Ia).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Tm = (e) => e.isThemeGetter, Am = (e) => {
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
}, ia = "!", la = ":", Om = la.length, Im = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const a = [];
    let s = 0, i = 0, c = 0, f;
    for (let v = 0; v < o.length; v++) {
      let g = o[v];
      if (s === 0 && i === 0) {
        if (g === la) {
          a.push(o.slice(c, v)), c = v + Om;
          continue;
        }
        if (g === "/") {
          f = v;
          continue;
        }
      }
      g === "[" ? s++ : g === "]" ? s-- : g === "(" ? i++ : g === ")" && i--;
    }
    const u = a.length === 0 ? o : o.substring(c), p = zm(u), m = p !== u, h = f && f > c ? f - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: m,
      baseClassName: p,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + la, a = r;
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
}, zm = (e) => e.endsWith(ia) ? e.substring(0, e.length - 1) : e.startsWith(ia) ? e.substring(1) : e, Lm = (e) => {
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
}, $m = (e) => ({
  cache: Am(e.cacheSize),
  parseClassName: Im(e),
  sortModifiers: Lm(e),
  ...Mm(e)
}), Fm = /\s+/, Wm = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, s = [], i = e.trim().split(Fm);
  let c = "";
  for (let f = i.length - 1; f >= 0; f -= 1) {
    const u = i[f], {
      isExternal: p,
      modifiers: m,
      hasImportantModifier: h,
      baseClassName: v,
      maybePostfixModifierPosition: g
    } = n(u);
    if (p) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let b = !!g, y = r(b ? v.substring(0, g) : v);
    if (!y) {
      if (!b) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (y = r(v), !y) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      b = !1;
    }
    const w = a(m).join(":"), x = h ? w + ia : w, R = x + y;
    if (s.includes(R))
      continue;
    s.push(R);
    const S = o(y, b);
    for (let E = 0; E < S.length; ++E) {
      const k = S[E];
      s.push(x + k);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Bm() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = nl(t)) && (r && (r += " "), r += n);
  return r;
}
const nl = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = nl(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Vm(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const f = t.reduce((u, p) => p(u), e());
    return n = $m(f), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const f = r(c);
    if (f)
      return f;
    const u = Wm(c, n);
    return o(c, u), u;
  }
  return function() {
    return a(Bm.apply(null, arguments));
  };
}
const xe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, rl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ol = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Hm = /^\d+\/\d+$/, Gm = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ym = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Um = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, jm = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Km = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ht = (e) => Hm.test(e), ne = (e) => !!e && !Number.isNaN(Number(e)), ht = (e) => !!e && Number.isInteger(Number(e)), To = (e) => e.endsWith("%") && ne(e.slice(0, -1)), rt = (e) => Gm.test(e), qm = () => !0, Xm = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ym.test(e) && !Um.test(e)
), al = () => !1, Zm = (e) => jm.test(e), Qm = (e) => Km.test(e), Jm = (e) => !U(e) && !j(e), eh = (e) => an(e, ll, al), U = (e) => rl.test(e), Mt = (e) => an(e, cl, Xm), Ao = (e) => an(e, ah, ne), Ws = (e) => an(e, sl, al), th = (e) => an(e, il, Qm), rr = (e) => an(e, dl, Zm), j = (e) => ol.test(e), bn = (e) => sn(e, cl), nh = (e) => sn(e, sh), Bs = (e) => sn(e, sl), rh = (e) => sn(e, ll), oh = (e) => sn(e, il), or = (e) => sn(e, dl, !0), an = (e, t, n) => {
  const r = rl.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, sn = (e, t, n = !1) => {
  const r = ol.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, sl = (e) => e === "position" || e === "percentage", il = (e) => e === "image" || e === "url", ll = (e) => e === "length" || e === "size" || e === "bg-size", cl = (e) => e === "length", ah = (e) => e === "number", sh = (e) => e === "family-name", dl = (e) => e === "shadow", ih = () => {
  const e = xe("color"), t = xe("font"), n = xe("text"), r = xe("font-weight"), o = xe("tracking"), a = xe("leading"), s = xe("breakpoint"), i = xe("container"), c = xe("spacing"), f = xe("radius"), u = xe("shadow"), p = xe("inset-shadow"), m = xe("text-shadow"), h = xe("drop-shadow"), v = xe("blur"), g = xe("perspective"), b = xe("aspect"), y = xe("ease"), w = xe("animate"), x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], R = () => [
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
  ], S = () => [...R(), j, U], E = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", "contain", "none"], N = () => [j, U, c], D = () => [Ht, "full", "auto", ...N()], z = () => [ht, "none", "subgrid", j, U], T = () => ["auto", {
    span: ["full", ht, j, U]
  }, ht, j, U], F = () => [ht, "auto", j, U], B = () => ["auto", "min", "max", "fr", j, U], V = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], X = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], H = () => ["auto", ...N()], K = () => [Ht, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...N()], P = () => [e, j, U], L = () => [...R(), Bs, Ws, {
    position: [j, U]
  }], J = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ae = () => ["auto", "cover", "contain", rh, eh, {
    size: [j, U]
  }], _ = () => [To, bn, Mt], W = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    f,
    j,
    U
  ], Y = () => ["", ne, bn, Mt], G = () => ["solid", "dashed", "dotted", "double"], Q = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], A = () => [ne, To, Bs, Ws], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    j,
    U
  ], te = () => ["none", ne, j, U], re = () => ["none", ne, j, U], se = () => [ne, j, U], ue = () => [Ht, "full", ...N()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [rt],
      breakpoint: [rt],
      color: [qm],
      container: [rt],
      "drop-shadow": [rt],
      ease: ["in", "out", "in-out"],
      font: [Jm],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [rt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [rt],
      shadow: [rt],
      spacing: ["px", ne],
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
        aspect: ["auto", "square", Ht, U, j, b]
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
        columns: [ne, U, j, i]
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
        object: S()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: E()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": E()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": E()
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
        inset: D()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": D()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": D()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: D()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: D()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: D()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: D()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: D()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: D()
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
        basis: [Ht, "full", "auto", i, ...N()]
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
        flex: [ne, Ht, "auto", "initial", "none", U]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ne, j, U]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ne, j, U]
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
        "grid-cols": z()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: T()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": F()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": F()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": z()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: T()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": F()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": F()
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
        "auto-cols": B()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": B()
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
        justify: [...V(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...X(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...X()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...V()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": V()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...X(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...X()]
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
        text: ["base", n, bn, Mt]
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
        font: [r, j, Ao]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", To, U]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [nh, U, t]
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
        "line-clamp": [ne, "none", j, Ao]
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
        decoration: [...G(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ne, "from-font", "auto", j, Mt]
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
        "underline-offset": [ne, "auto", j, U]
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
        bg: L()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: J()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ae()
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
        }, oh, th]
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
        rounded: W()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": W()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": W()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": W()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": W()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": W()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": W()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": W()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": W()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": W()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": W()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": W()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": W()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": W()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": W()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Y()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Y()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Y()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Y()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Y()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Y()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Y()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Y()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Y()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Y()
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
        "divide-y": Y()
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
        outline: [...G(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ne, j, U]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ne, bn, Mt]
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
          u,
          or,
          rr
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
        "inset-shadow": ["none", p, or, rr]
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
        ring: Y()
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
        "ring-offset": [ne, Mt]
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
        "inset-ring": Y()
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
        "text-shadow": ["none", m, or, rr]
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
        opacity: [ne, j, U]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Q(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Q()
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
        "mask-linear": [ne]
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
        "mask-radial": [j, U]
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
        "mask-radial-at": R()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ne]
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
        mask: L()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: J()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ae()
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
        blur: ee()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ne, j, U]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ne, j, U]
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
          or,
          rr
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
        grayscale: ["", ne, j, U]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ne, j, U]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ne, j, U]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ne, j, U]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ne, j, U]
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
        "backdrop-blur": ee()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ne, j, U]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ne, j, U]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ne, j, U]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ne, j, U]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ne, j, U]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ne, j, U]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ne, j, U]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ne, j, U]
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
        duration: [ne, "initial", j, U]
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
        delay: [ne, j, U]
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
        "perspective-origin": S()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: te()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": te()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": te()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": te()
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
        translate: ue()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ue()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ue()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ue()
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
        fill: ["none", ...P()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ne, bn, Mt, Ao]
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
}, lh = /* @__PURE__ */ Vm(ih);
function C(...e) {
  return lh(el(e));
}
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ch = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ul = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var dh = {
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
const uh = Ki(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => aa(
    "svg",
    {
      ref: c,
      ...dh,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: ul("lucide", o),
      ...i
    },
    [
      ...s.map(([f, u]) => aa(f, u)),
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
  const n = Ki(
    ({ className: r, ...o }, a) => aa(uh, {
      ref: a,
      iconNode: t,
      className: ul(`lucide-${ch(e)}`, r),
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
const fh = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], Vs = pe("ArrowDown", fh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ph = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
], mh = pe("ArrowLeftToLine", ph);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], gh = pe("ArrowLeft", hh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vh = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
], bh = pe("ArrowRightToLine", vh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], wh = pe("ArrowRight", yh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], Hs = pe("ArrowUp", xh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], Sh = pe("Calendar", Ch);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], at = pe("Check", kh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nh = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Wr = pe("ChevronDown", Nh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], za = pe("ChevronLeft", Rh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], In = pe("ChevronRight", Eh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ph = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Mh = pe("ChevronUp", Ph);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
], Dh = pe("ChevronsLeft", _h);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Th = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
], Ah = pe("ChevronsRight", Th);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
], fl = pe("ChevronsUpDown", Oh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
], pl = pe("CirclePlus", Ih);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], La = pe("CircleX", zh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lh = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], ml = pe("Circle", Lh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $h = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], hl = pe("Ellipsis", $h);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Wh = pe("LoaderCircle", Fh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [
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
], Vh = pe("PinOff", Bh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hh = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], Gh = pe("Search", Hh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yh = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
], gl = pe("Settings2", Yh);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uh = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], $a = pe("X", Uh);
function Gs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function lt(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Gs(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Gs(e[o], null);
        }
      };
  };
}
function Z(...e) {
  return d.useCallback(lt(...e), e);
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
  const t = /* @__PURE__ */ jh(e), n = d.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = d.Children.toArray(a), c = i.find(Kh);
    if (c) {
      const f = c.props.children, u = i.map((p) => p === c ? d.Children.count(f) > 1 ? d.Children.only(null) : d.isValidElement(f) ? f.props.children : null : p);
      return /* @__PURE__ */ l(t, { ...s, ref: o, children: d.isValidElement(f) ? d.cloneElement(f, void 0, u) : null });
    }
    return /* @__PURE__ */ l(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var zn = /* @__PURE__ */ yt("Slot");
// @__NO_SIDE_EFFECTS__
function jh(e) {
  const t = d.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (d.isValidElement(o)) {
      const s = Xh(o), i = qh(a, o.props);
      return o.type !== d.Fragment && (i.ref = r ? lt(r, s) : s), d.cloneElement(o, i);
    }
    return d.Children.count(o) > 1 ? d.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var vl = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function bl(e) {
  const t = ({ children: n }) => /* @__PURE__ */ l(Pe, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = vl, t;
}
function Kh(e) {
  return d.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vl;
}
function qh(e, t) {
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
function Xh(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Zh = [
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
], $ = Zh.reduce((e, t) => {
  const n = /* @__PURE__ */ yt(`Primitive.${t}`), r = d.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function yl(e, t) {
  e && Fr.flushSync(() => e.dispatchEvent(t));
}
var wl = Object.freeze({
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
}), Qh = "VisuallyHidden", xl = d.forwardRef(
  (e, t) => /* @__PURE__ */ l(
    $.span,
    {
      ...e,
      ref: t,
      style: { ...wl, ...e.style }
    }
  )
);
xl.displayName = Qh;
var Jh = xl;
function eg(e, t) {
  const n = d.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = d.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ l(n.Provider, { value: c, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = d.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function he(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = d.createContext(s), c = n.length;
    n = [...n, s];
    const f = (p) => {
      const { scope: m, children: h, ...v } = p, g = m?.[e]?.[c] || i, b = d.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ l(g.Provider, { value: b, children: h });
    };
    f.displayName = a + "Provider";
    function u(p, m) {
      const h = m?.[e]?.[c] || i, v = d.useContext(h);
      if (v) return v;
      if (s !== void 0) return s;
      throw new Error(`\`${p}\` must be used within \`${a}\``);
    }
    return [f, u];
  }
  const o = () => {
    const a = n.map((s) => d.createContext(s));
    return function(i) {
      const c = i?.[e] || a;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, tg(o, ...t)];
}
function tg(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: f }) => {
        const p = c(a)[`__scope${f}`];
        return { ...i, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Ln(e) {
  const t = e + "CollectionProvider", [n, r] = he(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: b, children: y } = g, w = O.useRef(null), x = O.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ l(o, { scope: b, itemMap: x, collectionRef: w, children: y });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ yt(i), f = O.forwardRef(
    (g, b) => {
      const { scope: y, children: w } = g, x = a(i, y), R = Z(b, x.collectionRef);
      return /* @__PURE__ */ l(c, { ref: R, children: w });
    }
  );
  f.displayName = i;
  const u = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ yt(u), h = O.forwardRef(
    (g, b) => {
      const { scope: y, children: w, ...x } = g, R = O.useRef(null), S = Z(b, R), E = a(u, y);
      return O.useEffect(() => (E.itemMap.set(R, { ref: R, ...x }), () => void E.itemMap.delete(R))), /* @__PURE__ */ l(m, { [p]: "", ref: S, children: w });
    }
  );
  h.displayName = u;
  function v(g) {
    const b = a(e + "CollectionConsumer", g);
    return O.useCallback(() => {
      const w = b.collectionRef.current;
      if (!w) return [];
      const x = Array.from(w.querySelectorAll(`[${p}]`));
      return Array.from(b.itemMap.values()).sort(
        (E, k) => x.indexOf(E.ref.current) - x.indexOf(k.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: s, Slot: f, ItemSlot: h },
    v,
    r
  ];
}
function I(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
var ye = globalThis?.document ? d.useLayoutEffect : () => {
}, ng = d[" useInsertionEffect ".trim().toString()] || ye;
function we({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = rg({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const u = d.useRef(e !== void 0);
    d.useEffect(() => {
      const p = u.current;
      p !== i && console.warn(
        `${r} is changing from ${p ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = i;
    }, [i, r]);
  }
  const f = d.useCallback(
    (u) => {
      if (i) {
        const p = og(u) ? u(e) : u;
        p !== e && s.current?.(p);
      } else
        a(u);
    },
    [i, e, a, s]
  );
  return [c, f];
}
function rg({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = d.useState(e), o = d.useRef(n), a = d.useRef(t);
  return ng(() => {
    a.current = t;
  }, [t]), d.useEffect(() => {
    o.current !== n && (a.current?.(n), o.current = n);
  }, [n, o]), [n, r, a];
}
function og(e) {
  return typeof e == "function";
}
function ag(e, t) {
  return d.useReducer((n, r) => t[n][r] ?? n, e);
}
var ve = (e) => {
  const { present: t, children: n } = e, r = sg(t), o = typeof n == "function" ? n({ present: r.isPresent }) : d.Children.only(n), a = Z(r.ref, ig(o));
  return typeof n == "function" || r.isPresent ? d.cloneElement(o, { ref: a }) : null;
};
ve.displayName = "Presence";
function sg(e) {
  const [t, n] = d.useState(), r = d.useRef(null), o = d.useRef(e), a = d.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = ag(s, {
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
  return d.useEffect(() => {
    const f = ar(r.current);
    a.current = i === "mounted" ? f : "none";
  }, [i]), ye(() => {
    const f = r.current, u = o.current;
    if (u !== e) {
      const m = a.current, h = ar(f);
      e ? c("MOUNT") : h === "none" || f?.display === "none" ? c("UNMOUNT") : c(u && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ye(() => {
    if (t) {
      let f;
      const u = t.ownerDocument.defaultView ?? window, p = (h) => {
        const g = ar(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", f = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, m = (h) => {
        h.target === t && (a.current = ar(r.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        u.clearTimeout(f), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: d.useCallback((f) => {
      r.current = f ? getComputedStyle(f) : null, n(f);
    }, [])
  };
}
function ar(e) {
  return e?.animationName || "none";
}
function ig(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var lg = d[" useId ".trim().toString()] || (() => {
}), cg = 0;
function ge(e) {
  const [t, n] = d.useState(lg());
  return ye(() => {
    n((r) => r ?? String(cg++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
var Br = "Collapsible", [dg, Cl] = he(Br), [ug, Fa] = dg(Br), Sl = d.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, f] = we({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: Br
    });
    return /* @__PURE__ */ l(
      ug,
      {
        scope: n,
        disabled: a,
        contentId: ge(),
        open: c,
        onOpenToggle: d.useCallback(() => f((u) => !u), [f]),
        children: /* @__PURE__ */ l(
          $.div,
          {
            "data-state": Ha(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
Sl.displayName = Br;
var kl = "CollapsibleTrigger", Wa = d.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = Fa(kl, n);
    return /* @__PURE__ */ l(
      $.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Ha(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: I(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Wa.displayName = kl;
var Ba = "CollapsibleContent", Va = d.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Fa(Ba, e.__scopeCollapsible);
    return /* @__PURE__ */ l(ve, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ l(fg, { ...r, ref: t, present: a }) });
  }
);
Va.displayName = Ba;
var fg = d.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = Fa(Ba, n), [i, c] = d.useState(r), f = d.useRef(null), u = Z(t, f), p = d.useRef(0), m = p.current, h = d.useRef(0), v = h.current, g = s.open || i, b = d.useRef(g), y = d.useRef(void 0);
  return d.useEffect(() => {
    const w = requestAnimationFrame(() => b.current = !1);
    return () => cancelAnimationFrame(w);
  }, []), ye(() => {
    const w = f.current;
    if (w) {
      y.current = y.current || {
        transitionDuration: w.style.transitionDuration,
        animationName: w.style.animationName
      }, w.style.transitionDuration = "0s", w.style.animationName = "none";
      const x = w.getBoundingClientRect();
      p.current = x.height, h.current = x.width, b.current || (w.style.transitionDuration = y.current.transitionDuration, w.style.animationName = y.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ l(
    $.div,
    {
      "data-state": Ha(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !g,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": m ? `${m}px` : void 0,
        "--radix-collapsible-content-width": v ? `${v}px` : void 0,
        ...e.style
      },
      children: g && o
    }
  );
});
function Ha(e) {
  return e ? "open" : "closed";
}
var Nl = Sl, pg = Wa, mg = Va, hg = d.createContext(void 0);
function ut(e) {
  const t = d.useContext(hg);
  return e || t || "ltr";
}
var He = "Accordion", gg = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Ga, vg, bg] = Ln(He), [Vr, CP] = he(He, [
  bg,
  Cl
]), Ya = Cl(), Rl = O.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ l(Ga.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ l(Cg, { ...a, ref: t }) : /* @__PURE__ */ l(xg, { ...o, ref: t }) });
  }
);
Rl.displayName = He;
var [El, yg] = Vr(He), [Pl, wg] = Vr(
  He,
  { collapsible: !1 }
), xg = O.forwardRef(
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
      caller: He
    });
    return /* @__PURE__ */ l(
      El,
      {
        scope: e.__scopeAccordion,
        value: O.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: O.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ l(Pl, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ l(Ml, { ...s, ref: t }) })
      }
    );
  }
), Cg = O.forwardRef((e, t) => {
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
    caller: He
  }), c = O.useCallback(
    (u) => i((p = []) => [...p, u]),
    [i]
  ), f = O.useCallback(
    (u) => i((p = []) => p.filter((m) => m !== u)),
    [i]
  );
  return /* @__PURE__ */ l(
    El,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: f,
      children: /* @__PURE__ */ l(Pl, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ l(Ml, { ...a, ref: t }) })
    }
  );
}), [Sg, Hr] = Vr(He), Ml = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = O.useRef(null), c = Z(i, t), f = vg(n), p = ut(o) === "ltr", m = I(e.onKeyDown, (h) => {
      if (!gg.includes(h.key)) return;
      const v = h.target, g = f().filter((N) => !N.ref.current?.disabled), b = g.findIndex((N) => N.ref.current === v), y = g.length;
      if (b === -1) return;
      h.preventDefault();
      let w = b;
      const x = 0, R = y - 1, S = () => {
        w = b + 1, w > R && (w = x);
      }, E = () => {
        w = b - 1, w < x && (w = R);
      };
      switch (h.key) {
        case "Home":
          w = x;
          break;
        case "End":
          w = R;
          break;
        case "ArrowRight":
          a === "horizontal" && (p ? S() : E());
          break;
        case "ArrowDown":
          a === "vertical" && S();
          break;
        case "ArrowLeft":
          a === "horizontal" && (p ? E() : S());
          break;
        case "ArrowUp":
          a === "vertical" && E();
          break;
      }
      const k = w % y;
      g[k].ref.current?.focus();
    });
    return /* @__PURE__ */ l(
      Sg,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ l(Ga.Slot, { scope: n, children: /* @__PURE__ */ l(
          $.div,
          {
            ...s,
            "data-orientation": a,
            ref: c,
            onKeyDown: r ? void 0 : m
          }
        ) })
      }
    );
  }
), br = "AccordionItem", [kg, Ua] = Vr(br), _l = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Hr(br, n), s = yg(br, n), i = Ya(n), c = ge(), f = r && s.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ l(
      kg,
      {
        scope: n,
        open: f,
        disabled: u,
        triggerId: c,
        children: /* @__PURE__ */ l(
          Nl,
          {
            "data-orientation": a.orientation,
            "data-state": zl(f),
            ...i,
            ...o,
            ref: t,
            disabled: u,
            open: f,
            onOpenChange: (p) => {
              p ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
_l.displayName = br;
var Dl = "AccordionHeader", Tl = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Hr(He, n), a = Ua(Dl, n);
    return /* @__PURE__ */ l(
      $.h3,
      {
        "data-orientation": o.orientation,
        "data-state": zl(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Tl.displayName = Dl;
var ca = "AccordionTrigger", Al = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Hr(He, n), a = Ua(ca, n), s = wg(ca, n), i = Ya(n);
    return /* @__PURE__ */ l(Ga.ItemSlot, { scope: n, children: /* @__PURE__ */ l(
      pg,
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
Al.displayName = ca;
var Ol = "AccordionContent", Il = O.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Hr(He, n), a = Ua(Ol, n), s = Ya(n);
    return /* @__PURE__ */ l(
      mg,
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
Il.displayName = Ol;
function zl(e) {
  return e ? "open" : "closed";
}
var Ng = Rl, Rg = _l, Eg = Tl, Pg = Al, Mg = Il;
function Ce(e) {
  const t = d.useRef(e);
  return d.useEffect(() => {
    t.current = e;
  }), d.useMemo(() => (...n) => t.current?.(...n), []);
}
function _g(e, t = globalThis?.document) {
  const n = Ce(e);
  d.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Dg = "DismissableLayer", da = "dismissableLayer.update", Tg = "dismissableLayer.pointerDownOutside", Ag = "dismissableLayer.focusOutside", Ys, Ll = d.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), $t = d.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, f = d.useContext(Ll), [u, p] = d.useState(null), m = u?.ownerDocument ?? globalThis?.document, [, h] = d.useState({}), v = Z(t, (k) => p(k)), g = Array.from(f.layers), [b] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), y = g.indexOf(b), w = u ? g.indexOf(u) : -1, x = f.layersWithOutsidePointerEventsDisabled.size > 0, R = w >= y, S = zg((k) => {
      const N = k.target, D = [...f.branches].some((z) => z.contains(N));
      !R || D || (o?.(k), s?.(k), k.defaultPrevented || i?.());
    }, m), E = Lg((k) => {
      const N = k.target;
      [...f.branches].some((z) => z.contains(N)) || (a?.(k), s?.(k), k.defaultPrevented || i?.());
    }, m);
    return _g((k) => {
      w === f.layers.size - 1 && (r?.(k), !k.defaultPrevented && i && (k.preventDefault(), i()));
    }, m), d.useEffect(() => {
      if (u)
        return n && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (Ys = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(u)), f.layers.add(u), Us(), () => {
          n && f.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Ys);
        };
    }, [u, m, n, f]), d.useEffect(() => () => {
      u && (f.layers.delete(u), f.layersWithOutsidePointerEventsDisabled.delete(u), Us());
    }, [u, f]), d.useEffect(() => {
      const k = () => h({});
      return document.addEventListener(da, k), () => document.removeEventListener(da, k);
    }, []), /* @__PURE__ */ l(
      $.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: x ? R ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: I(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: I(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: I(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
$t.displayName = Dg;
var Og = "DismissableLayerBranch", Ig = d.forwardRef((e, t) => {
  const n = d.useContext(Ll), r = d.useRef(null), o = Z(t, r);
  return d.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ l($.div, { ...e, ref: o });
});
Ig.displayName = Og;
function zg(e, t = globalThis?.document) {
  const n = Ce(e), r = d.useRef(!1), o = d.useRef(() => {
  });
  return d.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          $l(
            Tg,
            n,
            f,
            { discrete: !0 }
          );
        };
        const f = { originalEvent: i };
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
function Lg(e, t = globalThis?.document) {
  const n = Ce(e), r = d.useRef(!1);
  return d.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && $l(Ag, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Us() {
  const e = new CustomEvent(da);
  document.dispatchEvent(e);
}
function $l(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? yl(o, a) : o.dispatchEvent(a);
}
var Oo = "focusScope.autoFocusOnMount", Io = "focusScope.autoFocusOnUnmount", js = { bubbles: !1, cancelable: !0 }, $g = "FocusScope", $n = d.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = d.useState(null), f = Ce(o), u = Ce(a), p = d.useRef(null), m = Z(t, (g) => c(g)), h = d.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  d.useEffect(() => {
    if (r) {
      let g = function(x) {
        if (h.paused || !i) return;
        const R = x.target;
        i.contains(R) ? p.current = R : vt(p.current, { select: !0 });
      }, b = function(x) {
        if (h.paused || !i) return;
        const R = x.relatedTarget;
        R !== null && (i.contains(R) || vt(p.current, { select: !0 }));
      }, y = function(x) {
        if (document.activeElement === document.body)
          for (const S of x)
            S.removedNodes.length > 0 && vt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const w = new MutationObserver(y);
      return i && w.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), w.disconnect();
      };
    }
  }, [r, i, h.paused]), d.useEffect(() => {
    if (i) {
      qs.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const y = new CustomEvent(Oo, js);
        i.addEventListener(Oo, f), i.dispatchEvent(y), y.defaultPrevented || (Fg(Gg(Fl(i)), { select: !0 }), document.activeElement === g && vt(i));
      }
      return () => {
        i.removeEventListener(Oo, f), setTimeout(() => {
          const y = new CustomEvent(Io, js);
          i.addEventListener(Io, u), i.dispatchEvent(y), y.defaultPrevented || vt(g ?? document.body, { select: !0 }), i.removeEventListener(Io, u), qs.remove(h);
        }, 0);
      };
    }
  }, [i, f, u, h]);
  const v = d.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, y = document.activeElement;
      if (b && y) {
        const w = g.currentTarget, [x, R] = Wg(w);
        x && R ? !g.shiftKey && y === R ? (g.preventDefault(), n && vt(x, { select: !0 })) : g.shiftKey && y === x && (g.preventDefault(), n && vt(R, { select: !0 })) : y === w && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ l($.div, { tabIndex: -1, ...s, ref: m, onKeyDown: v });
});
$n.displayName = $g;
function Fg(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (vt(r, { select: t }), document.activeElement !== n) return;
}
function Wg(e) {
  const t = Fl(e), n = Ks(t, e), r = Ks(t.reverse(), e);
  return [n, r];
}
function Fl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ks(e, t) {
  for (const n of e)
    if (!Bg(n, { upTo: t })) return n;
}
function Bg(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Vg(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function vt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Vg(e) && t && e.select();
  }
}
var qs = Hg();
function Hg() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Xs(e, t), e.unshift(t);
    },
    remove(t) {
      e = Xs(e, t), e[0]?.resume();
    }
  };
}
function Xs(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Gg(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Yg = "Portal", Ft = d.forwardRef((e, t) => {
  const { container: n, ...r } = e, [o, a] = d.useState(!1);
  ye(() => a(!0), []);
  const s = n || o && globalThis?.document?.body;
  return s ? Pm.createPortal(/* @__PURE__ */ l($.div, { ...r, ref: t }), s) : null;
});
Ft.displayName = Yg;
var zo = 0;
function Gr() {
  d.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Zs()), document.body.insertAdjacentElement("beforeend", e[1] ?? Zs()), zo++, () => {
      zo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), zo--;
    };
  }, []);
}
function Zs() {
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
function Wl(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ug(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var hr = "right-scroll-bar-position", gr = "width-before-scroll-bar", jg = "with-scroll-bars-hidden", Kg = "--removed-body-scroll-bar-size";
function Lo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function qg(e, t) {
  var n = Tt(function() {
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
var Xg = typeof window < "u" ? d.useLayoutEffect : d.useEffect, Qs = /* @__PURE__ */ new WeakMap();
function Zg(e, t) {
  var n = qg(null, function(r) {
    return e.forEach(function(o) {
      return Lo(o, r);
    });
  });
  return Xg(function() {
    var r = Qs.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Lo(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Lo(i, s);
      });
    }
    Qs.set(n, e);
  }, [e]), n;
}
function Qg(e) {
  return e;
}
function Jg(e, t) {
  t === void 0 && (t = Qg);
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
        var u = s;
        s = [], u.forEach(a);
      }, f = function() {
        return Promise.resolve().then(c);
      };
      f(), n = {
        push: function(u) {
          s.push(u), f();
        },
        filter: function(u) {
          return s = s.filter(u), n;
        }
      };
    }
  };
  return o;
}
function ev(e) {
  e === void 0 && (e = {});
  var t = Jg(null);
  return t.options = Ke({ async: !0, ssr: !1 }, e), t;
}
var Bl = function(e) {
  var t = e.sideCar, n = Wl(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return d.createElement(r, Ke({}, n));
};
Bl.isSideCarExport = !0;
function tv(e, t) {
  return e.useMedium(t), Bl;
}
var Vl = ev(), $o = function() {
}, Yr = d.forwardRef(function(e, t) {
  var n = d.useRef(null), r = d.useState({
    onScrollCapture: $o,
    onWheelCapture: $o,
    onTouchMoveCapture: $o
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, f = e.removeScrollBar, u = e.enabled, p = e.shards, m = e.sideCar, h = e.noRelative, v = e.noIsolation, g = e.inert, b = e.allowPinchZoom, y = e.as, w = y === void 0 ? "div" : y, x = e.gapMode, R = Wl(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = m, E = Zg([n, t]), k = Ke(Ke({}, R), o);
  return d.createElement(
    d.Fragment,
    null,
    u && d.createElement(S, { sideCar: Vl, removeScrollBar: f, shards: p, noRelative: h, noIsolation: v, inert: g, setCallbacks: a, allowPinchZoom: !!b, lockRef: n, gapMode: x }),
    s ? d.cloneElement(d.Children.only(i), Ke(Ke({}, k), { ref: E })) : d.createElement(w, Ke({}, k, { className: c, ref: E }), i)
  );
});
Yr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Yr.classNames = {
  fullWidth: gr,
  zeroRight: hr
};
var nv = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function rv() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = nv();
  return t && e.setAttribute("nonce", t), e;
}
function ov(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function av(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var sv = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = rv()) && (ov(t, n), av(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, iv = function() {
  var e = sv();
  return function(t, n) {
    d.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Hl = function() {
  var e = iv(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, lv = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Fo = function(e) {
  return parseInt(e || "", 10) || 0;
}, cv = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Fo(n), Fo(r), Fo(o)];
}, dv = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return lv;
  var t = cv(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, uv = Hl(), Zt = "data-scroll-locked", fv = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(jg, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Zt, `] {
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
  
  .`).concat(hr, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(gr, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(hr, " .").concat(hr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(gr, " .").concat(gr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Zt, `] {
    `).concat(Kg, ": ").concat(i, `px;
  }
`);
}, Js = function() {
  var e = parseInt(document.body.getAttribute(Zt) || "0", 10);
  return isFinite(e) ? e : 0;
}, pv = function() {
  d.useEffect(function() {
    return document.body.setAttribute(Zt, (Js() + 1).toString()), function() {
      var e = Js() - 1;
      e <= 0 ? document.body.removeAttribute(Zt) : document.body.setAttribute(Zt, e.toString());
    };
  }, []);
}, mv = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  pv();
  var a = d.useMemo(function() {
    return dv(o);
  }, [o]);
  return d.createElement(uv, { styles: fv(a, !t, o, n ? "" : "!important") });
}, ua = !1;
if (typeof window < "u")
  try {
    var sr = Object.defineProperty({}, "passive", {
      get: function() {
        return ua = !0, !0;
      }
    });
    window.addEventListener("test", sr, sr), window.removeEventListener("test", sr, sr);
  } catch {
    ua = !1;
  }
var Gt = ua ? { passive: !1 } : !1, hv = function(e) {
  return e.tagName === "TEXTAREA";
}, Gl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !hv(e) && n[t] === "visible")
  );
}, gv = function(e) {
  return Gl(e, "overflowY");
}, vv = function(e) {
  return Gl(e, "overflowX");
}, ei = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Yl(e, r);
    if (o) {
      var a = Ul(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, bv = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, yv = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Yl = function(e, t) {
  return e === "v" ? gv(t) : vv(t);
}, Ul = function(e, t) {
  return e === "v" ? bv(t) : yv(t);
}, wv = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, xv = function(e, t, n, r, o) {
  var a = wv(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), f = !1, u = s > 0, p = 0, m = 0;
  do {
    if (!i)
      break;
    var h = Ul(e, i), v = h[0], g = h[1], b = h[2], y = g - b - a * v;
    (v || y) && Yl(e, i) && (p += y, m += v);
    var w = i.parentNode;
    i = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (u && Math.abs(p) < 1 || !u && Math.abs(m) < 1) && (f = !0), f;
}, ir = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ti = function(e) {
  return [e.deltaX, e.deltaY];
}, ni = function(e) {
  return e && "current" in e ? e.current : e;
}, Cv = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Sv = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, kv = 0, Yt = [];
function Nv(e) {
  var t = d.useRef([]), n = d.useRef([0, 0]), r = d.useRef(), o = d.useState(kv++)[0], a = d.useState(Hl)[0], s = d.useRef(e);
  d.useEffect(function() {
    s.current = e;
  }, [e]), d.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Ug([e.lockRef.current], (e.shards || []).map(ni), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = d.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var y = ir(g), w = n.current, x = "deltaX" in g ? g.deltaX : w[0] - y[0], R = "deltaY" in g ? g.deltaY : w[1] - y[1], S, E = g.target, k = Math.abs(x) > Math.abs(R) ? "h" : "v";
    if ("touches" in g && k === "h" && E.type === "range")
      return !1;
    var N = ei(k, E);
    if (!N)
      return !0;
    if (N ? S = k : (S = k === "v" ? "h" : "v", N = ei(k, E)), !N)
      return !1;
    if (!r.current && "changedTouches" in g && (x || R) && (r.current = S), !S)
      return !0;
    var D = r.current || S;
    return xv(D, b, g, D === "h" ? x : R);
  }, []), c = d.useCallback(function(g) {
    var b = g;
    if (!(!Yt.length || Yt[Yt.length - 1] !== a)) {
      var y = "deltaY" in b ? ti(b) : ir(b), w = t.current.filter(function(S) {
        return S.name === b.type && (S.target === b.target || b.target === S.shadowParent) && Cv(S.delta, y);
      })[0];
      if (w && w.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!w) {
        var x = (s.current.shards || []).map(ni).filter(Boolean).filter(function(S) {
          return S.contains(b.target);
        }), R = x.length > 0 ? i(b, x[0]) : !s.current.noIsolation;
        R && b.cancelable && b.preventDefault();
      }
    }
  }, []), f = d.useCallback(function(g, b, y, w) {
    var x = { name: g, delta: b, target: y, should: w, shadowParent: Rv(y) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(R) {
        return R !== x;
      });
    }, 1);
  }, []), u = d.useCallback(function(g) {
    n.current = ir(g), r.current = void 0;
  }, []), p = d.useCallback(function(g) {
    f(g.type, ti(g), g.target, i(g, e.lockRef.current));
  }, []), m = d.useCallback(function(g) {
    f(g.type, ir(g), g.target, i(g, e.lockRef.current));
  }, []);
  d.useEffect(function() {
    return Yt.push(a), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", c, Gt), document.addEventListener("touchmove", c, Gt), document.addEventListener("touchstart", u, Gt), function() {
      Yt = Yt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", c, Gt), document.removeEventListener("touchmove", c, Gt), document.removeEventListener("touchstart", u, Gt);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    v ? d.createElement(a, { styles: Sv(o) }) : null,
    h ? d.createElement(mv, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Rv(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Ev = tv(Vl, Nv);
var Fn = d.forwardRef(function(e, t) {
  return d.createElement(Yr, Ke({}, e, { ref: t, sideCar: Ev }));
});
Fn.classNames = Yr.classNames;
var Pv = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ut = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), cr = {}, Wo = 0, jl = function(e) {
  return e && (e.host || jl(e.parentNode));
}, Mv = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = jl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, _v = function(e, t, n, r) {
  var o = Mv(t, Array.isArray(e) ? e : [e]);
  cr[n] || (cr[n] = /* @__PURE__ */ new WeakMap());
  var a = cr[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), f = function(p) {
    !p || i.has(p) || (i.add(p), f(p.parentNode));
  };
  o.forEach(f);
  var u = function(p) {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, function(m) {
      if (i.has(m))
        u(m);
      else
        try {
          var h = m.getAttribute(r), v = h !== null && h !== "false", g = (Ut.get(m) || 0) + 1, b = (a.get(m) || 0) + 1;
          Ut.set(m, g), a.set(m, b), s.push(m), g === 1 && v && lr.set(m, !0), b === 1 && m.setAttribute(n, "true"), v || m.setAttribute(r, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", m, y);
        }
    });
  };
  return u(t), i.clear(), Wo++, function() {
    s.forEach(function(p) {
      var m = Ut.get(p) - 1, h = a.get(p) - 1;
      Ut.set(p, m), a.set(p, h), m || (lr.has(p) || p.removeAttribute(r), lr.delete(p)), h || p.removeAttribute(n);
    }), Wo--, Wo || (Ut = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), cr = {});
  };
}, Ur = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Pv(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), _v(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, jr = "Dialog", [Kl, ql] = he(jr), [Dv, Ge] = Kl(jr), Xl = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = d.useRef(null), c = d.useRef(null), [f, u] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: jr
  });
  return /* @__PURE__ */ l(
    Dv,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: ge(),
      titleId: ge(),
      descriptionId: ge(),
      open: f,
      onOpenChange: u,
      onOpenToggle: d.useCallback(() => u((p) => !p), [u]),
      modal: s,
      children: n
    }
  );
};
Xl.displayName = jr;
var Zl = "DialogTrigger", Ql = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Zl, n), a = Z(t, o.triggerRef);
    return /* @__PURE__ */ l(
      $.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": qa(o.open),
        ...r,
        ref: a,
        onClick: I(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ql.displayName = Zl;
var ja = "DialogPortal", [Tv, Jl] = Kl(ja, {
  forceMount: void 0
}), ec = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Ge(ja, t);
  return /* @__PURE__ */ l(Tv, { scope: t, forceMount: n, children: d.Children.map(r, (s) => /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Ft, { asChild: !0, container: o, children: s }) })) });
};
ec.displayName = ja;
var yr = "DialogOverlay", tc = d.forwardRef(
  (e, t) => {
    const n = Jl(yr, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ge(yr, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(Ov, { ...o, ref: t }) }) : null;
  }
);
tc.displayName = yr;
var Av = /* @__PURE__ */ yt("DialogOverlay.RemoveScroll"), Ov = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(yr, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ l(Fn, { as: Av, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ l(
        $.div,
        {
          "data-state": qa(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), At = "DialogContent", nc = d.forwardRef(
  (e, t) => {
    const n = Jl(At, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ge(At, e.__scopeDialog);
    return /* @__PURE__ */ l(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ l(Iv, { ...o, ref: t }) : /* @__PURE__ */ l(zv, { ...o, ref: t }) });
  }
);
nc.displayName = At;
var Iv = d.forwardRef(
  (e, t) => {
    const n = Ge(At, e.__scopeDialog), r = d.useRef(null), o = Z(t, n.contentRef, r);
    return d.useEffect(() => {
      const a = r.current;
      if (a) return Ur(a);
    }, []), /* @__PURE__ */ l(
      rc,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), n.triggerRef.current?.focus();
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
), zv = d.forwardRef(
  (e, t) => {
    const n = Ge(At, e.__scopeDialog), r = d.useRef(!1), o = d.useRef(!1);
    return /* @__PURE__ */ l(
      rc,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (r.current || n.triggerRef.current?.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          n.triggerRef.current?.contains(s) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), rc = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Ge(At, n), c = d.useRef(null), f = Z(t, c);
    return Gr(), /* @__PURE__ */ M(Pe, { children: [
      /* @__PURE__ */ l(
        $n,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ l(
            $t,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": qa(i.open),
              ...s,
              ref: f,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ M(Pe, { children: [
        /* @__PURE__ */ l($v, { titleId: i.titleId }),
        /* @__PURE__ */ l(Wv, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Ka = "DialogTitle", oc = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Ka, n);
    return /* @__PURE__ */ l($.h2, { id: o.titleId, ...r, ref: t });
  }
);
oc.displayName = Ka;
var ac = "DialogDescription", sc = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(ac, n);
    return /* @__PURE__ */ l($.p, { id: o.descriptionId, ...r, ref: t });
  }
);
sc.displayName = ac;
var ic = "DialogClose", lc = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(ic, n);
    return /* @__PURE__ */ l(
      $.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: I(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
lc.displayName = ic;
function qa(e) {
  return e ? "open" : "closed";
}
var cc = "DialogTitleWarning", [Lv, dc] = eg(cc, {
  contentName: At,
  titleName: Ka,
  docsSlug: "dialog"
}), $v = ({ titleId: e }) => {
  const t = dc(cc), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return d.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, Fv = "DialogDescriptionWarning", Wv = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${dc(Fv).contentName}}.`;
  return d.useEffect(() => {
    const o = e.current?.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, Kr = Xl, Xa = Ql, qr = ec, Xr = tc, Zr = nc, Za = oc, Qa = sc, Wt = lc, uc = "AlertDialog", [Bv, SP] = he(uc, [
  ql
]), ft = ql(), fc = (e) => {
  const { __scopeAlertDialog: t, ...n } = e, r = ft(t);
  return /* @__PURE__ */ l(Kr, { ...r, ...n, modal: !0 });
};
fc.displayName = uc;
var Vv = "AlertDialogTrigger", pc = d.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Xa, { ...o, ...r, ref: t });
  }
);
pc.displayName = Vv;
var Hv = "AlertDialogPortal", mc = (e) => {
  const { __scopeAlertDialog: t, ...n } = e, r = ft(t);
  return /* @__PURE__ */ l(qr, { ...r, ...n });
};
mc.displayName = Hv;
var Gv = "AlertDialogOverlay", hc = d.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Xr, { ...o, ...r, ref: t });
  }
);
hc.displayName = Gv;
var Qt = "AlertDialogContent", [Yv, Uv] = Bv(Qt), jv = /* @__PURE__ */ bl("AlertDialogContent"), gc = d.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, children: r, ...o } = e, a = ft(n), s = d.useRef(null), i = Z(t, s), c = d.useRef(null);
    return /* @__PURE__ */ l(
      Lv,
      {
        contentName: Qt,
        titleName: vc,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ l(Yv, { scope: n, cancelRef: c, children: /* @__PURE__ */ M(
          Zr,
          {
            role: "alertdialog",
            ...a,
            ...o,
            ref: i,
            onOpenAutoFocus: I(o.onOpenAutoFocus, (f) => {
              f.preventDefault(), c.current?.focus({ preventScroll: !0 });
            }),
            onPointerDownOutside: (f) => f.preventDefault(),
            onInteractOutside: (f) => f.preventDefault(),
            children: [
              /* @__PURE__ */ l(jv, { children: r }),
              /* @__PURE__ */ l(qv, { contentRef: s })
            ]
          }
        ) })
      }
    );
  }
);
gc.displayName = Qt;
var vc = "AlertDialogTitle", bc = d.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Za, { ...o, ...r, ref: t });
  }
);
bc.displayName = vc;
var yc = "AlertDialogDescription", wc = d.forwardRef((e, t) => {
  const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
  return /* @__PURE__ */ l(Qa, { ...o, ...r, ref: t });
});
wc.displayName = yc;
var Kv = "AlertDialogAction", xc = d.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, o = ft(n);
    return /* @__PURE__ */ l(Wt, { ...o, ...r, ref: t });
  }
);
xc.displayName = Kv;
var Cc = "AlertDialogCancel", Sc = d.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: n, ...r } = e, { cancelRef: o } = Uv(Cc, n), a = ft(n), s = Z(t, o);
    return /* @__PURE__ */ l(Wt, { ...a, ...r, ref: s });
  }
);
Sc.displayName = Cc;
var qv = ({ contentRef: e }) => {
  const t = `\`${Qt}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${Qt}\` by passing a \`${yc}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${Qt}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  return d.useEffect(() => {
    document.getElementById(
      e.current?.getAttribute("aria-describedby")
    ) || console.warn(t);
  }, [t, e]), null;
}, Xv = fc, Zv = pc, Qv = mc, Jv = hc, eb = gc, tb = xc, nb = Sc, rb = bc, ob = wc, ab = "AspectRatio", kc = d.forwardRef(
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
          $.div,
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
kc.displayName = ab;
var sb = kc, dr = { exports: {} }, Bo = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ri;
function ib() {
  if (ri) return Bo;
  ri = 1;
  var e = O;
  function t(p, m) {
    return p === m && (p !== 0 || 1 / p === 1 / m) || p !== p && m !== m;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, o = e.useEffect, a = e.useLayoutEffect, s = e.useDebugValue;
  function i(p, m) {
    var h = m(), v = r({ inst: { value: h, getSnapshot: m } }), g = v[0].inst, b = v[1];
    return a(
      function() {
        g.value = h, g.getSnapshot = m, c(g) && b({ inst: g });
      },
      [p, h, m]
    ), o(
      function() {
        return c(g) && b({ inst: g }), p(function() {
          c(g) && b({ inst: g });
        });
      },
      [p]
    ), s(h), h;
  }
  function c(p) {
    var m = p.getSnapshot;
    p = p.value;
    try {
      var h = m();
      return !n(p, h);
    } catch {
      return !0;
    }
  }
  function f(p, m) {
    return m();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f : i;
  return Bo.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u, Bo;
}
var Vo = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oi;
function lb() {
  return oi || (oi = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(h, v) {
      return h === v && (h !== 0 || 1 / h === 1 / v) || h !== h && v !== v;
    }
    function t(h, v) {
      u || o.startTransition === void 0 || (u = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var g = v();
      if (!p) {
        var b = v();
        a(g, b) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), p = !0);
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
      ), f(g), g;
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
    var o = O, a = typeof Object.is == "function" ? Object.is : e, s = o.useState, i = o.useEffect, c = o.useLayoutEffect, f = o.useDebugValue, u = !1, p = !1, m = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    Vo.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Vo;
}
var ai;
function cb() {
  return ai || (ai = 1, process.env.NODE_ENV === "production" ? dr.exports = ib() : dr.exports = lb()), dr.exports;
}
var db = cb();
function ub() {
  return db.useSyncExternalStore(
    fb,
    () => !0,
    () => !1
  );
}
function fb() {
  return () => {
  };
}
var Ja = "Avatar", [pb, kP] = he(Ja), [mb, Nc] = pb(Ja), Rc = d.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...r } = e, [o, a] = d.useState("idle");
    return /* @__PURE__ */ l(
      mb,
      {
        scope: n,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ l($.span, { ...r, ref: t })
      }
    );
  }
);
Rc.displayName = Ja;
var Ec = "AvatarImage", Pc = d.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {
    }, ...a } = e, s = Nc(Ec, n), i = hb(r, a), c = Ce((f) => {
      o(f), s.onImageLoadingStatusChange(f);
    });
    return ye(() => {
      i !== "idle" && c(i);
    }, [i, c]), i === "loaded" ? /* @__PURE__ */ l($.img, { ...a, ref: t, src: r }) : null;
  }
);
Pc.displayName = Ec;
var Mc = "AvatarFallback", _c = d.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e, a = Nc(Mc, n), [s, i] = d.useState(r === void 0);
    return d.useEffect(() => {
      if (r !== void 0) {
        const c = window.setTimeout(() => i(!0), r);
        return () => window.clearTimeout(c);
      }
    }, [r]), s && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ l($.span, { ...o, ref: t }) : null;
  }
);
_c.displayName = Mc;
function si(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function hb(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = ub(), o = d.useRef(null), a = r ? (o.current || (o.current = new window.Image()), o.current) : null, [s, i] = d.useState(
    () => si(a, e)
  );
  return ye(() => {
    i(si(a, e));
  }, [a, e]), ye(() => {
    const c = (p) => () => {
      i(p);
    };
    if (!a) return;
    const f = c("loaded"), u = c("error");
    return a.addEventListener("load", f), a.addEventListener("error", u), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
      a.removeEventListener("load", f), a.removeEventListener("error", u);
    };
  }, [a, n, t]), s;
}
var gb = Rc, vb = Pc, bb = _c;
function Wn(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function Bn(e) {
  const [t, n] = d.useState(void 0);
  return ye(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const c = a.borderBoxSize, f = Array.isArray(c) ? c[0] : c;
          s = f.inlineSize, i = f.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Qr = "Checkbox", [yb, NP] = he(Qr), [wb, es] = yb(Qr);
function xb(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: c,
    required: f,
    value: u = "on",
    // @ts-expect-error
    internal_do_not_use_render: p
  } = e, [m, h] = we({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: Qr
  }), [v, g] = d.useState(null), [b, y] = d.useState(null), w = d.useRef(!1), x = v ? !!s || !!v.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), R = {
    checked: m,
    disabled: a,
    setChecked: h,
    control: v,
    setControl: g,
    name: i,
    form: s,
    value: u,
    hasConsumerStoppedPropagationRef: w,
    required: f,
    defaultChecked: bt(o) ? !1 : o,
    isFormControl: x,
    bubbleInput: b,
    setBubbleInput: y
  };
  return /* @__PURE__ */ l(
    wb,
    {
      scope: t,
      ...R,
      children: Cb(p) ? p(R) : r
    }
  );
}
var Dc = "CheckboxTrigger", Tc = d.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: f,
      setControl: u,
      setChecked: p,
      hasConsumerStoppedPropagationRef: m,
      isFormControl: h,
      bubbleInput: v
    } = es(Dc, e), g = Z(o, u), b = d.useRef(c);
    return d.useEffect(() => {
      const y = a?.form;
      if (y) {
        const w = () => p(b.current);
        return y.addEventListener("reset", w), () => y.removeEventListener("reset", w);
      }
    }, [a, p]), /* @__PURE__ */ l(
      $.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": bt(c) ? "mixed" : c,
        "aria-required": f,
        "data-state": $c(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: I(t, (y) => {
          y.key === "Enter" && y.preventDefault();
        }),
        onClick: I(n, (y) => {
          p((w) => bt(w) ? !0 : !w), v && h && (m.current = y.isPropagationStopped(), m.current || y.stopPropagation());
        })
      }
    );
  }
);
Tc.displayName = Dc;
var Ac = d.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c,
      onCheckedChange: f,
      form: u,
      ...p
    } = e;
    return /* @__PURE__ */ l(
      xb,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: f,
        name: r,
        form: u,
        value: c,
        internal_do_not_use_render: ({ isFormControl: m }) => /* @__PURE__ */ M(Pe, { children: [
          /* @__PURE__ */ l(
            Tc,
            {
              ...p,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          m && /* @__PURE__ */ l(
            Lc,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Ac.displayName = Qr;
var Oc = "CheckboxIndicator", Ic = d.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = es(Oc, n);
    return /* @__PURE__ */ l(
      ve,
      {
        present: r || bt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ l(
          $.span,
          {
            "data-state": $c(a.checked),
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
Ic.displayName = Oc;
var zc = "CheckboxBubbleInput", Lc = d.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: c,
      name: f,
      value: u,
      form: p,
      bubbleInput: m,
      setBubbleInput: h
    } = es(zc, e), v = Z(n, h), g = Wn(a), b = Bn(r);
    d.useEffect(() => {
      const w = m;
      if (!w) return;
      const x = window.HTMLInputElement.prototype, S = Object.getOwnPropertyDescriptor(
        x,
        "checked"
      ).set, E = !o.current;
      if (g !== a && S) {
        const k = new Event("click", { bubbles: E });
        w.indeterminate = bt(a), S.call(w, bt(a) ? !1 : a), w.dispatchEvent(k);
      }
    }, [m, g, a, o]);
    const y = d.useRef(bt(a) ? !1 : a);
    return /* @__PURE__ */ l(
      $.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? y.current,
        required: i,
        disabled: c,
        name: f,
        value: u,
        form: p,
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
Lc.displayName = zc;
function Cb(e) {
  return typeof e == "function";
}
function bt(e) {
  return e === "indeterminate";
}
function $c(e) {
  return bt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Sb = ["top", "right", "bottom", "left"], wt = Math.min, Te = Math.max, wr = Math.round, ur = Math.floor, Ze = (e) => ({
  x: e,
  y: e
}), kb = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Nb = {
  start: "end",
  end: "start"
};
function fa(e, t, n) {
  return Te(e, wt(t, n));
}
function ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function dt(e) {
  return e.split("-")[0];
}
function ln(e) {
  return e.split("-")[1];
}
function ts(e) {
  return e === "x" ? "y" : "x";
}
function ns(e) {
  return e === "y" ? "height" : "width";
}
const Rb = /* @__PURE__ */ new Set(["top", "bottom"]);
function qe(e) {
  return Rb.has(dt(e)) ? "y" : "x";
}
function rs(e) {
  return ts(qe(e));
}
function Eb(e, t, n) {
  n === void 0 && (n = !1);
  const r = ln(e), o = rs(e), a = ns(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = xr(s)), [s, xr(s)];
}
function Pb(e) {
  const t = xr(e);
  return [pa(e), t, pa(t)];
}
function pa(e) {
  return e.replace(/start|end/g, (t) => Nb[t]);
}
const ii = ["left", "right"], li = ["right", "left"], Mb = ["top", "bottom"], _b = ["bottom", "top"];
function Db(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? li : ii : t ? ii : li;
    case "left":
    case "right":
      return t ? Mb : _b;
    default:
      return [];
  }
}
function Tb(e, t, n, r) {
  const o = ln(e);
  let a = Db(dt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(pa)))), a;
}
function xr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => kb[t]);
}
function Ab(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Fc(e) {
  return typeof e != "number" ? Ab(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Cr(e) {
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
function ci(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = qe(t), s = rs(t), i = ns(s), c = dt(t), f = a === "y", u = r.x + r.width / 2 - o.width / 2, p = r.y + r.height / 2 - o.height / 2, m = r[i] / 2 - o[i] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: p
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: p
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (ln(t)) {
    case "start":
      h[s] -= m * (n && f ? -1 : 1);
      break;
    case "end":
      h[s] += m * (n && f ? -1 : 1);
      break;
  }
  return h;
}
const Ob = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = a.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let f = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: p
  } = ci(f, r, c), m = r, h = {}, v = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: b,
      fn: y
    } = i[g], {
      x: w,
      y: x,
      data: R,
      reset: S
    } = await y({
      x: u,
      y: p,
      initialPlacement: r,
      placement: m,
      strategy: o,
      middlewareData: h,
      rects: f,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = w ?? u, p = x ?? p, h = {
      ...h,
      [b]: {
        ...h[b],
        ...R
      }
    }, S && v <= 50 && (v++, typeof S == "object" && (S.placement && (m = S.placement), S.rects && (f = S.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: u,
      y: p
    } = ci(f, m, c)), g = -1);
  }
  return {
    x: u,
    y: p,
    placement: m,
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
    boundary: f = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: p = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = ct(t, e), v = Fc(h), b = i[m ? p === "floating" ? "reference" : "floating" : p], y = Cr(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: f,
    rootBoundary: u,
    strategy: c
  })), w = p === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), R = await (a.isElement == null ? void 0 : a.isElement(x)) ? await (a.getScale == null ? void 0 : a.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = Cr(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: w,
    offsetParent: x,
    strategy: c
  }) : w);
  return {
    top: (y.top - S.top + v.top) / R.y,
    bottom: (S.bottom - y.bottom + v.bottom) / R.y,
    left: (y.left - S.left + v.left) / R.x,
    right: (S.right - y.right + v.right) / R.x
  };
}
const Ib = (e) => ({
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
      element: f,
      padding: u = 0
    } = ct(e, t) || {};
    if (f == null)
      return {};
    const p = Fc(u), m = {
      x: n,
      y: r
    }, h = rs(o), v = ns(h), g = await s.getDimensions(f), b = h === "y", y = b ? "top" : "left", w = b ? "bottom" : "right", x = b ? "clientHeight" : "clientWidth", R = a.reference[v] + a.reference[h] - m[h] - a.floating[v], S = m[h] - a.reference[h], E = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(f));
    let k = E ? E[x] : 0;
    (!k || !await (s.isElement == null ? void 0 : s.isElement(E))) && (k = i.floating[x] || a.floating[v]);
    const N = R / 2 - S / 2, D = k / 2 - g[v] / 2 - 1, z = wt(p[y], D), T = wt(p[w], D), F = z, B = k - g[v] - T, V = k / 2 - g[v] / 2 + N, X = fa(F, V, B), H = !c.arrow && ln(o) != null && V !== X && a.reference[v] / 2 - (V < F ? z : T) - g[v] / 2 < 0, K = H ? V < F ? V - F : V - B : 0;
    return {
      [h]: m[h] + K,
      data: {
        [h]: X,
        centerOffset: V - X - K,
        ...H && {
          alignmentOffset: K
        }
      },
      reset: H
    };
  }
}), zb = function(e) {
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
        elements: f
      } = t, {
        mainAxis: u = !0,
        crossAxis: p = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...b
      } = ct(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const y = dt(o), w = qe(i), x = dt(i) === i, R = await (c.isRTL == null ? void 0 : c.isRTL(f.floating)), S = m || (x || !g ? [xr(i)] : Pb(i)), E = v !== "none";
      !m && E && S.push(...Tb(i, g, v, R));
      const k = [i, ...S], N = await En(t, b), D = [];
      let z = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && D.push(N[y]), p) {
        const V = Eb(o, s, R);
        D.push(N[V[0]], N[V[1]]);
      }
      if (z = [...z, {
        placement: o,
        overflows: D
      }], !D.every((V) => V <= 0)) {
        var T, F;
        const V = (((T = a.flip) == null ? void 0 : T.index) || 0) + 1, X = k[V];
        if (X && (!(p === "alignment" ? w !== qe(X) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        z.every((P) => qe(P.placement) === w ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: V,
              overflows: z
            },
            reset: {
              placement: X
            }
          };
        let H = (F = z.filter((K) => K.overflows[0] <= 0).sort((K, P) => K.overflows[1] - P.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!H)
          switch (h) {
            case "bestFit": {
              var B;
              const K = (B = z.filter((P) => {
                if (E) {
                  const L = qe(P.placement);
                  return L === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  L === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((L) => L > 0).reduce((L, J) => L + J, 0)]).sort((P, L) => P[1] - L[1])[0]) == null ? void 0 : B[0];
              K && (H = K);
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
function di(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ui(e) {
  return Sb.some((t) => e[t] >= 0);
}
const Lb = function(e) {
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
          }), s = di(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: ui(s)
            }
          };
        }
        case "escaped": {
          const a = await En(t, {
            ...o,
            altBoundary: !0
          }), s = di(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: ui(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Wc = /* @__PURE__ */ new Set(["left", "top"]);
async function $b(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = dt(n), i = ln(n), c = qe(n) === "y", f = Wc.has(s) ? -1 : 1, u = a && c ? -1 : 1, p = ct(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: v
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return i && typeof v == "number" && (h = i === "end" ? v * -1 : v), c ? {
    x: h * u,
    y: m * f
  } : {
    x: m * f,
    y: h * u
  };
}
const Fb = function(e) {
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
      } = t, c = await $b(t, e);
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
}, Wb = function(e) {
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
      } = ct(e, t), f = {
        x: n,
        y: r
      }, u = await En(t, c), p = qe(dt(o)), m = ts(p);
      let h = f[m], v = f[p];
      if (a) {
        const b = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", w = h + u[b], x = h - u[y];
        h = fa(w, h, x);
      }
      if (s) {
        const b = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", w = v + u[b], x = v - u[y];
        v = fa(w, v, x);
      }
      const g = i.fn({
        ...t,
        [m]: h,
        [p]: v
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [m]: a,
            [p]: s
          }
        }
      };
    }
  };
}, Bb = function(e) {
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
        crossAxis: f = !0
      } = ct(e, t), u = {
        x: n,
        y: r
      }, p = qe(o), m = ts(p);
      let h = u[m], v = u[p];
      const g = ct(i, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const x = m === "y" ? "height" : "width", R = a.reference[m] - a.floating[x] + b.mainAxis, S = a.reference[m] + a.reference[x] - b.mainAxis;
        h < R ? h = R : h > S && (h = S);
      }
      if (f) {
        var y, w;
        const x = m === "y" ? "width" : "height", R = Wc.has(dt(o)), S = a.reference[p] - a.floating[x] + (R && ((y = s.offset) == null ? void 0 : y[p]) || 0) + (R ? 0 : b.crossAxis), E = a.reference[p] + a.reference[x] + (R ? 0 : ((w = s.offset) == null ? void 0 : w[p]) || 0) - (R ? b.crossAxis : 0);
        v < S ? v = S : v > E && (v = E);
      }
      return {
        [m]: h,
        [p]: v
      };
    }
  };
}, Vb = function(e) {
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
        ...f
      } = ct(e, t), u = await En(t, f), p = dt(o), m = ln(o), h = qe(o) === "y", {
        width: v,
        height: g
      } = a.floating;
      let b, y;
      p === "top" || p === "bottom" ? (b = p, y = m === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (y = p, b = m === "end" ? "top" : "bottom");
      const w = g - u.top - u.bottom, x = v - u.left - u.right, R = wt(g - u[b], w), S = wt(v - u[y], x), E = !t.middlewareData.shift;
      let k = R, N = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (N = x), (r = t.middlewareData.shift) != null && r.enabled.y && (k = w), E && !m) {
        const z = Te(u.left, 0), T = Te(u.right, 0), F = Te(u.top, 0), B = Te(u.bottom, 0);
        h ? N = v - 2 * (z !== 0 || T !== 0 ? z + T : Te(u.left, u.right)) : k = g - 2 * (F !== 0 || B !== 0 ? F + B : Te(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: N,
        availableHeight: k
      });
      const D = await s.getDimensions(i.floating);
      return v !== D.width || g !== D.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Jr() {
  return typeof window < "u";
}
function cn(e) {
  return Bc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Oe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Je(e) {
  var t;
  return (t = (Bc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Bc(e) {
  return Jr() ? e instanceof Node || e instanceof Oe(e).Node : !1;
}
function Be(e) {
  return Jr() ? e instanceof Element || e instanceof Oe(e).Element : !1;
}
function Qe(e) {
  return Jr() ? e instanceof HTMLElement || e instanceof Oe(e).HTMLElement : !1;
}
function fi(e) {
  return !Jr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Oe(e).ShadowRoot;
}
const Hb = /* @__PURE__ */ new Set(["inline", "contents"]);
function Vn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ve(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Hb.has(o);
}
const Gb = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Yb(e) {
  return Gb.has(cn(e));
}
const Ub = [":popover-open", ":modal"];
function eo(e) {
  return Ub.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const jb = ["transform", "translate", "scale", "rotate", "perspective"], Kb = ["transform", "translate", "scale", "rotate", "perspective", "filter"], qb = ["paint", "layout", "strict", "content"];
function os(e) {
  const t = as(), n = Be(e) ? Ve(e) : e;
  return jb.some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Kb.some((r) => (n.willChange || "").includes(r)) || qb.some((r) => (n.contain || "").includes(r));
}
function Xb(e) {
  let t = xt(e);
  for (; Qe(t) && !en(t); ) {
    if (os(t))
      return t;
    if (eo(t))
      return null;
    t = xt(t);
  }
  return null;
}
function as() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Zb = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function en(e) {
  return Zb.has(cn(e));
}
function Ve(e) {
  return Oe(e).getComputedStyle(e);
}
function to(e) {
  return Be(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function xt(e) {
  if (cn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    fi(e) && e.host || // Fallback.
    Je(e)
  );
  return fi(t) ? t.host : t;
}
function Vc(e) {
  const t = xt(e);
  return en(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Qe(t) && Vn(t) ? t : Vc(t);
}
function Pn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Vc(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Oe(o);
  if (a) {
    const i = ma(s);
    return t.concat(s, s.visualViewport || [], Vn(o) ? o : [], i && n ? Pn(i) : []);
  }
  return t.concat(o, Pn(o, [], n));
}
function ma(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Hc(e) {
  const t = Ve(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Qe(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = wr(n) !== a || wr(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function ss(e) {
  return Be(e) ? e : e.contextElement;
}
function Jt(e) {
  const t = ss(e);
  if (!Qe(t))
    return Ze(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Hc(t);
  let s = (a ? wr(n.width) : n.width) / r, i = (a ? wr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const Qb = /* @__PURE__ */ Ze(0);
function Gc(e) {
  const t = Oe(e);
  return !as() || !t.visualViewport ? Qb : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Jb(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Oe(e) ? !1 : t;
}
function Ot(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = ss(e);
  let s = Ze(1);
  t && (r ? Be(r) && (s = Jt(r)) : s = Jt(e));
  const i = Jb(a, n, r) ? Gc(a) : Ze(0);
  let c = (o.left + i.x) / s.x, f = (o.top + i.y) / s.y, u = o.width / s.x, p = o.height / s.y;
  if (a) {
    const m = Oe(a), h = r && Be(r) ? Oe(r) : r;
    let v = m, g = ma(v);
    for (; g && r && h !== v; ) {
      const b = Jt(g), y = g.getBoundingClientRect(), w = Ve(g), x = y.left + (g.clientLeft + parseFloat(w.paddingLeft)) * b.x, R = y.top + (g.clientTop + parseFloat(w.paddingTop)) * b.y;
      c *= b.x, f *= b.y, u *= b.x, p *= b.y, c += x, f += R, v = Oe(g), g = ma(v);
    }
  }
  return Cr({
    width: u,
    height: p,
    x: c,
    y: f
  });
}
function no(e, t) {
  const n = to(e).scrollLeft;
  return t ? t.left + n : Ot(Je(e)).left + n;
}
function Yc(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - no(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function ey(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = Je(r), i = t ? eo(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = Ze(1);
  const u = Ze(0), p = Qe(r);
  if ((p || !p && !a) && ((cn(r) !== "body" || Vn(s)) && (c = to(r)), Qe(r))) {
    const h = Ot(r);
    f = Jt(r), u.x = h.x + r.clientLeft, u.y = h.y + r.clientTop;
  }
  const m = s && !p && !a ? Yc(s, c) : Ze(0);
  return {
    width: n.width * f.x,
    height: n.height * f.y,
    x: n.x * f.x - c.scrollLeft * f.x + u.x + m.x,
    y: n.y * f.y - c.scrollTop * f.y + u.y + m.y
  };
}
function ty(e) {
  return Array.from(e.getClientRects());
}
function ny(e) {
  const t = Je(e), n = to(e), r = e.ownerDocument.body, o = Te(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Te(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + no(e);
  const i = -n.scrollTop;
  return Ve(r).direction === "rtl" && (s += Te(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const pi = 25;
function ry(e, t) {
  const n = Oe(e), r = Je(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = as();
    (!u || u && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const f = no(r);
  if (f <= 0) {
    const u = r.ownerDocument, p = u.body, m = getComputedStyle(p), h = u.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, v = Math.abs(r.clientWidth - p.clientWidth - h);
    v <= pi && (a -= v);
  } else f <= pi && (a += f);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
const oy = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function ay(e, t) {
  const n = Ot(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Qe(e) ? Jt(e) : Ze(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, f = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: f
  };
}
function mi(e, t, n) {
  let r;
  if (t === "viewport")
    r = ry(e, n);
  else if (t === "document")
    r = ny(Je(e));
  else if (Be(t))
    r = ay(t, n);
  else {
    const o = Gc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Cr(r);
}
function Uc(e, t) {
  const n = xt(e);
  return n === t || !Be(n) || en(n) ? !1 : Ve(n).position === "fixed" || Uc(n, t);
}
function sy(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Pn(e, [], !1).filter((i) => Be(i) && cn(i) !== "body"), o = null;
  const a = Ve(e).position === "fixed";
  let s = a ? xt(e) : e;
  for (; Be(s) && !en(s); ) {
    const i = Ve(s), c = os(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && oy.has(o.position) || Vn(s) && !c && Uc(e, s)) ? r = r.filter((u) => u !== s) : o = i, s = xt(s);
  }
  return t.set(e, r), r;
}
function iy(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? eo(t) ? [] : sy(t, this._c) : [].concat(n), r], i = s[0], c = s.reduce((f, u) => {
    const p = mi(t, u, o);
    return f.top = Te(p.top, f.top), f.right = wt(p.right, f.right), f.bottom = wt(p.bottom, f.bottom), f.left = Te(p.left, f.left), f;
  }, mi(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function ly(e) {
  const {
    width: t,
    height: n
  } = Hc(e);
  return {
    width: t,
    height: n
  };
}
function cy(e, t, n) {
  const r = Qe(t), o = Je(t), a = n === "fixed", s = Ot(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Ze(0);
  function f() {
    c.x = no(o);
  }
  if (r || !r && !a)
    if ((cn(t) !== "body" || Vn(o)) && (i = to(t)), r) {
      const h = Ot(t, !0, a, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else o && f();
  a && !r && o && f();
  const u = o && !r && !a ? Yc(o, i) : Ze(0), p = s.left + i.scrollLeft - c.x - u.x, m = s.top + i.scrollTop - c.y - u.y;
  return {
    x: p,
    y: m,
    width: s.width,
    height: s.height
  };
}
function Ho(e) {
  return Ve(e).position === "static";
}
function hi(e, t) {
  if (!Qe(e) || Ve(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Je(e) === n && (n = n.ownerDocument.body), n;
}
function jc(e, t) {
  const n = Oe(e);
  if (eo(e))
    return n;
  if (!Qe(e)) {
    let o = xt(e);
    for (; o && !en(o); ) {
      if (Be(o) && !Ho(o))
        return o;
      o = xt(o);
    }
    return n;
  }
  let r = hi(e, t);
  for (; r && Yb(r) && Ho(r); )
    r = hi(r, t);
  return r && en(r) && Ho(r) && !os(r) ? n : r || Xb(e) || n;
}
const dy = async function(e) {
  const t = this.getOffsetParent || jc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: cy(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function uy(e) {
  return Ve(e).direction === "rtl";
}
const fy = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ey,
  getDocumentElement: Je,
  getClippingRect: iy,
  getOffsetParent: jc,
  getElementRects: dy,
  getClientRects: ty,
  getDimensions: ly,
  getScale: Jt,
  isElement: Be,
  isRTL: uy
};
function Kc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function py(e, t) {
  let n = null, r;
  const o = Je(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const f = e.getBoundingClientRect(), {
      left: u,
      top: p,
      width: m,
      height: h
    } = f;
    if (i || t(), !m || !h)
      return;
    const v = ur(p), g = ur(o.clientWidth - (u + m)), b = ur(o.clientHeight - (p + h)), y = ur(u), x = {
      rootMargin: -v + "px " + -g + "px " + -b + "px " + -y + "px",
      threshold: Te(0, wt(1, c)) || 1
    };
    let R = !0;
    function S(E) {
      const k = E[0].intersectionRatio;
      if (k !== c) {
        if (!R)
          return s();
        k ? s(!1, k) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      k === 1 && !Kc(f, e.getBoundingClientRect()) && s(), R = !1;
    }
    try {
      n = new IntersectionObserver(S, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(S, x);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function my(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, f = ss(e), u = o || a ? [...f ? Pn(f) : [], ...Pn(t)] : [];
  u.forEach((y) => {
    o && y.addEventListener("scroll", n, {
      passive: !0
    }), a && y.addEventListener("resize", n);
  });
  const p = f && i ? py(f, n) : null;
  let m = -1, h = null;
  s && (h = new ResizeObserver((y) => {
    let [w] = y;
    w && w.target === f && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var x;
      (x = h) == null || x.observe(t);
    })), n();
  }), f && !c && h.observe(f), h.observe(t));
  let v, g = c ? Ot(e) : null;
  c && b();
  function b() {
    const y = Ot(e);
    g && !Kc(g, y) && n(), g = y, v = requestAnimationFrame(b);
  }
  return n(), () => {
    var y;
    u.forEach((w) => {
      o && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), p?.(), (y = h) == null || y.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const hy = Fb, gy = Wb, vy = zb, by = Vb, yy = Lb, gi = Ib, wy = Bb, xy = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: fy,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return Ob(e, t, {
    ...o,
    platform: a
  });
};
var Cy = typeof document < "u", Sy = function() {
}, vr = Cy ? qi : Sy;
function Sr(e, t) {
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
        if (!Sr(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !Sr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function qc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function vi(e, t) {
  const n = qc(e);
  return Math.round(t * n) / n;
}
function Go(e) {
  const t = d.useRef(e);
  return vr(() => {
    t.current = e;
  }), t;
}
function ky(e) {
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
    open: f
  } = e, [u, p] = d.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = d.useState(r);
  Sr(m, r) || h(r);
  const [v, g] = d.useState(null), [b, y] = d.useState(null), w = d.useCallback((P) => {
    P !== E.current && (E.current = P, g(P));
  }, []), x = d.useCallback((P) => {
    P !== k.current && (k.current = P, y(P));
  }, []), R = a || v, S = s || b, E = d.useRef(null), k = d.useRef(null), N = d.useRef(u), D = c != null, z = Go(c), T = Go(o), F = Go(f), B = d.useCallback(() => {
    if (!E.current || !k.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: m
    };
    T.current && (P.platform = T.current), xy(E.current, k.current, P).then((L) => {
      const J = {
        ...L,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: F.current !== !1
      };
      V.current && !Sr(N.current, J) && (N.current = J, Fr.flushSync(() => {
        p(J);
      }));
    });
  }, [m, t, n, T, F]);
  vr(() => {
    f === !1 && N.current.isPositioned && (N.current.isPositioned = !1, p((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [f]);
  const V = d.useRef(!1);
  vr(() => (V.current = !0, () => {
    V.current = !1;
  }), []), vr(() => {
    if (R && (E.current = R), S && (k.current = S), R && S) {
      if (z.current)
        return z.current(R, S, B);
      B();
    }
  }, [R, S, B, z, D]);
  const X = d.useMemo(() => ({
    reference: E,
    floating: k,
    setReference: w,
    setFloating: x
  }), [w, x]), H = d.useMemo(() => ({
    reference: R,
    floating: S
  }), [R, S]), K = d.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return P;
    const L = vi(H.floating, u.x), J = vi(H.floating, u.y);
    return i ? {
      ...P,
      transform: "translate(" + L + "px, " + J + "px)",
      ...qc(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: L,
      top: J
    };
  }, [n, i, H.floating, u.x, u.y]);
  return d.useMemo(() => ({
    ...u,
    update: B,
    refs: X,
    elements: H,
    floatingStyles: K
  }), [u, B, X, H, K]);
}
const Ny = (e) => {
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
      return r && t(r) ? r.current != null ? gi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? gi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Ry = (e, t) => ({
  ...hy(e),
  options: [e, t]
}), Ey = (e, t) => ({
  ...gy(e),
  options: [e, t]
}), Py = (e, t) => ({
  ...wy(e),
  options: [e, t]
}), My = (e, t) => ({
  ...vy(e),
  options: [e, t]
}), _y = (e, t) => ({
  ...by(e),
  options: [e, t]
}), Dy = (e, t) => ({
  ...yy(e),
  options: [e, t]
}), Ty = (e, t) => ({
  ...Ny(e),
  options: [e, t]
});
var Ay = "Arrow", Xc = d.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ l(
    $.svg,
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
Xc.displayName = Ay;
var Oy = Xc, is = "Popper", [Zc, et] = he(is), [Iy, Qc] = Zc(is), Jc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = d.useState(null);
  return /* @__PURE__ */ l(Iy, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Jc.displayName = is;
var ed = "PopperAnchor", td = d.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = Qc(ed, n), s = d.useRef(null), i = Z(t, s), c = d.useRef(null);
    return d.useEffect(() => {
      const f = c.current;
      c.current = r?.current || s.current, f !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ l($.div, { ...o, ref: i });
  }
);
td.displayName = ed;
var ls = "PopperContent", [zy, Ly] = Zc(ls), nd = d.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: f = [],
      collisionPadding: u = 0,
      sticky: p = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...g
    } = e, b = Qc(ls, n), [y, w] = d.useState(null), x = Z(t, (A) => w(A)), [R, S] = d.useState(null), E = Bn(R), k = E?.width ?? 0, N = E?.height ?? 0, D = r + (a !== "center" ? "-" + a : ""), z = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, T = Array.isArray(f) ? f : [f], F = T.length > 0, B = {
      padding: z,
      boundary: T.filter(Fy),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: F
    }, { refs: V, floatingStyles: X, placement: H, isPositioned: K, middlewareData: P } = ky({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (...A) => my(...A, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Ry({ mainAxis: o + N, alignmentAxis: s }),
        c && Ey({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? Py() : void 0,
          ...B
        }),
        c && My({ ...B }),
        _y({
          ...B,
          apply: ({ elements: A, rects: ee, availableWidth: te, availableHeight: re }) => {
            const { width: se, height: ue } = ee.reference, _e = A.floating.style;
            _e.setProperty("--radix-popper-available-width", `${te}px`), _e.setProperty("--radix-popper-available-height", `${re}px`), _e.setProperty("--radix-popper-anchor-width", `${se}px`), _e.setProperty("--radix-popper-anchor-height", `${ue}px`);
          }
        }),
        R && Ty({ element: R, padding: i }),
        Wy({ arrowWidth: k, arrowHeight: N }),
        m && Dy({ strategy: "referenceHidden", ...B })
      ]
    }), [L, J] = ad(H), ae = Ce(v);
    ye(() => {
      K && ae?.();
    }, [K, ae]);
    const _ = P.arrow?.x, W = P.arrow?.y, Y = P.arrow?.centerOffset !== 0, [G, Q] = d.useState();
    return ye(() => {
      y && Q(window.getComputedStyle(y).zIndex);
    }, [y]), /* @__PURE__ */ l(
      "div",
      {
        ref: V.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...X,
          transform: K ? X.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: G,
          "--radix-popper-transform-origin": [
            P.transformOrigin?.x,
            P.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...P.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ l(
          zy,
          {
            scope: n,
            placedSide: L,
            onArrowChange: S,
            arrowX: _,
            arrowY: W,
            shouldHideArrow: Y,
            children: /* @__PURE__ */ l(
              $.div,
              {
                "data-side": L,
                "data-align": J,
                ...g,
                ref: x,
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
nd.displayName = ls;
var rd = "PopperArrow", $y = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, od = d.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Ly(rd, r), s = $y[a.placedSide];
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
          Oy,
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
od.displayName = rd;
function Fy(e) {
  return e !== null;
}
var Wy = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t, s = o.arrow?.centerOffset !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [f, u] = ad(n), p = { start: "0%", center: "50%", end: "100%" }[u], m = (o.arrow?.x ?? 0) + i / 2, h = (o.arrow?.y ?? 0) + c / 2;
    let v = "", g = "";
    return f === "bottom" ? (v = s ? p : `${m}px`, g = `${-c}px`) : f === "top" ? (v = s ? p : `${m}px`, g = `${r.floating.height + c}px`) : f === "right" ? (v = `${-c}px`, g = s ? p : `${h}px`) : f === "left" && (v = `${r.floating.width + c}px`, g = s ? p : `${h}px`), { data: { x: v, y: g } };
  }
});
function ad(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var dn = Jc, un = td, Hn = nd, Gn = od, Yo = "rovingFocusGroup.onEntryFocus", By = { bubbles: !1, cancelable: !0 }, Yn = "RovingFocusGroup", [ha, sd, Vy] = Ln(Yn), [Hy, St] = he(
  Yn,
  [Vy]
), [Gy, Yy] = Hy(Yn), id = d.forwardRef(
  (e, t) => /* @__PURE__ */ l(ha.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l(ha.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l(Uy, { ...e, ref: t }) }) })
);
id.displayName = Yn;
var Uy = d.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: f,
    preventScrollOnEntryFocus: u = !1,
    ...p
  } = e, m = d.useRef(null), h = Z(t, m), v = ut(a), [g, b] = we({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: Yn
  }), [y, w] = d.useState(!1), x = Ce(f), R = sd(n), S = d.useRef(!1), [E, k] = d.useState(0);
  return d.useEffect(() => {
    const N = m.current;
    if (N)
      return N.addEventListener(Yo, x), () => N.removeEventListener(Yo, x);
  }, [x]), /* @__PURE__ */ l(
    Gy,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: g,
      onItemFocus: d.useCallback(
        (N) => b(N),
        [b]
      ),
      onItemShiftTab: d.useCallback(() => w(!0), []),
      onFocusableItemAdd: d.useCallback(
        () => k((N) => N + 1),
        []
      ),
      onFocusableItemRemove: d.useCallback(
        () => k((N) => N - 1),
        []
      ),
      children: /* @__PURE__ */ l(
        $.div,
        {
          tabIndex: y || E === 0 ? -1 : 0,
          "data-orientation": r,
          ...p,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: I(e.onMouseDown, () => {
            S.current = !0;
          }),
          onFocus: I(e.onFocus, (N) => {
            const D = !S.current;
            if (N.target === N.currentTarget && D && !y) {
              const z = new CustomEvent(Yo, By);
              if (N.currentTarget.dispatchEvent(z), !z.defaultPrevented) {
                const T = R().filter((H) => H.focusable), F = T.find((H) => H.active), B = T.find((H) => H.id === g), X = [F, B, ...T].filter(
                  Boolean
                ).map((H) => H.ref.current);
                dd(X, u);
              }
            }
            S.current = !1;
          }),
          onBlur: I(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), ld = "RovingFocusGroupItem", cd = d.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = ge(), f = a || c, u = Yy(ld, n), p = u.currentTabStopId === f, m = sd(n), { onFocusableItemAdd: h, onFocusableItemRemove: v, currentTabStopId: g } = u;
    return d.useEffect(() => {
      if (r)
        return h(), () => v();
    }, [r, h, v]), /* @__PURE__ */ l(
      ha.ItemSlot,
      {
        scope: n,
        id: f,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ l(
          $.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": u.orientation,
            ...i,
            ref: t,
            onMouseDown: I(e.onMouseDown, (b) => {
              r ? u.onItemFocus(f) : b.preventDefault();
            }),
            onFocus: I(e.onFocus, () => u.onItemFocus(f)),
            onKeyDown: I(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const y = qy(b, u.orientation, u.dir);
              if (y !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let x = m().filter((R) => R.focusable).map((R) => R.ref.current);
                if (y === "last") x.reverse();
                else if (y === "prev" || y === "next") {
                  y === "prev" && x.reverse();
                  const R = x.indexOf(b.currentTarget);
                  x = u.loop ? Xy(x, R + 1) : x.slice(R + 1);
                }
                setTimeout(() => dd(x));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: p, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
cd.displayName = ld;
var jy = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Ky(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function qy(e, t, n) {
  const r = Ky(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return jy[r];
}
function dd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Xy(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var ro = id, oo = cd, ga = ["Enter", " "], Zy = ["ArrowDown", "PageUp", "Home"], ud = ["ArrowUp", "PageDown", "End"], Qy = [...Zy, ...ud], Jy = {
  ltr: [...ga, "ArrowRight"],
  rtl: [...ga, "ArrowLeft"]
}, ew = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Un = "Menu", [Mn, tw, nw] = Ln(Un), [Bt, fd] = he(Un, [
  nw,
  et,
  St
]), jn = et(), pd = St(), [md, kt] = Bt(Un), [rw, Kn] = Bt(Un), hd = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = jn(t), [c, f] = d.useState(null), u = d.useRef(!1), p = Ce(a), m = ut(o);
  return d.useEffect(() => {
    const h = () => {
      u.current = !0, document.addEventListener("pointerdown", v, { capture: !0, once: !0 }), document.addEventListener("pointermove", v, { capture: !0, once: !0 });
    }, v = () => u.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", v, { capture: !0 }), document.removeEventListener("pointermove", v, { capture: !0 });
    };
  }, []), /* @__PURE__ */ l(dn, { ...i, children: /* @__PURE__ */ l(
    md,
    {
      scope: t,
      open: n,
      onOpenChange: p,
      content: c,
      onContentChange: f,
      children: /* @__PURE__ */ l(
        rw,
        {
          scope: t,
          onClose: d.useCallback(() => p(!1), [p]),
          isUsingKeyboardRef: u,
          dir: m,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
hd.displayName = Un;
var ow = "MenuAnchor", cs = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = jn(n);
    return /* @__PURE__ */ l(un, { ...o, ...r, ref: t });
  }
);
cs.displayName = ow;
var ds = "MenuPortal", [aw, gd] = Bt(ds, {
  forceMount: void 0
}), vd = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = kt(ds, t);
  return /* @__PURE__ */ l(aw, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Ft, { asChild: !0, container: o, children: r }) }) });
};
vd.displayName = ds;
var ze = "MenuContent", [sw, us] = Bt(ze), bd = d.forwardRef(
  (e, t) => {
    const n = gd(ze, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = kt(ze, e.__scopeMenu), s = Kn(ze, e.__scopeMenu);
    return /* @__PURE__ */ l(Mn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(Mn.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ l(iw, { ...o, ref: t }) : /* @__PURE__ */ l(lw, { ...o, ref: t }) }) }) });
  }
), iw = d.forwardRef(
  (e, t) => {
    const n = kt(ze, e.__scopeMenu), r = d.useRef(null), o = Z(t, r);
    return d.useEffect(() => {
      const a = r.current;
      if (a) return Ur(a);
    }, []), /* @__PURE__ */ l(
      fs,
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
), lw = d.forwardRef((e, t) => {
  const n = kt(ze, e.__scopeMenu);
  return /* @__PURE__ */ l(
    fs,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), cw = /* @__PURE__ */ yt("MenuContent.ScrollLock"), fs = d.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: c,
      onEscapeKeyDown: f,
      onPointerDownOutside: u,
      onFocusOutside: p,
      onInteractOutside: m,
      onDismiss: h,
      disableOutsideScroll: v,
      ...g
    } = e, b = kt(ze, n), y = Kn(ze, n), w = jn(n), x = pd(n), R = tw(n), [S, E] = d.useState(null), k = d.useRef(null), N = Z(t, k, b.onContentChange), D = d.useRef(0), z = d.useRef(""), T = d.useRef(0), F = d.useRef(null), B = d.useRef("right"), V = d.useRef(0), X = v ? Fn : d.Fragment, H = v ? { as: cw, allowPinchZoom: !0 } : void 0, K = (L) => {
      const J = z.current + L, ae = R().filter((A) => !A.disabled), _ = document.activeElement, W = ae.find((A) => A.ref.current === _)?.textValue, Y = ae.map((A) => A.textValue), G = xw(Y, J, W), Q = ae.find((A) => A.textValue === G)?.ref.current;
      (function A(ee) {
        z.current = ee, window.clearTimeout(D.current), ee !== "" && (D.current = window.setTimeout(() => A(""), 1e3));
      })(J), Q && setTimeout(() => Q.focus());
    };
    d.useEffect(() => () => window.clearTimeout(D.current), []), Gr();
    const P = d.useCallback((L) => B.current === F.current?.side && Sw(L, F.current?.area), []);
    return /* @__PURE__ */ l(
      sw,
      {
        scope: n,
        searchRef: z,
        onItemEnter: d.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        onItemLeave: d.useCallback(
          (L) => {
            P(L) || (k.current?.focus(), E(null));
          },
          [P]
        ),
        onTriggerLeave: d.useCallback(
          (L) => {
            P(L) && L.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: T,
        onPointerGraceIntentChange: d.useCallback((L) => {
          F.current = L;
        }, []),
        children: /* @__PURE__ */ l(X, { ...H, children: /* @__PURE__ */ l(
          $n,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: I(a, (L) => {
              L.preventDefault(), k.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ l(
              $t,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: f,
                onPointerDownOutside: u,
                onFocusOutside: p,
                onInteractOutside: m,
                onDismiss: h,
                children: /* @__PURE__ */ l(
                  ro,
                  {
                    asChild: !0,
                    ...x,
                    dir: y.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: S,
                    onCurrentTabStopIdChange: E,
                    onEntryFocus: I(c, (L) => {
                      y.isUsingKeyboardRef.current || L.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ l(
                      Hn,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Id(b.open),
                        "data-radix-menu-content": "",
                        dir: y.dir,
                        ...w,
                        ...g,
                        ref: N,
                        style: { outline: "none", ...g.style },
                        onKeyDown: I(g.onKeyDown, (L) => {
                          const ae = L.target.closest("[data-radix-menu-content]") === L.currentTarget, _ = L.ctrlKey || L.altKey || L.metaKey, W = L.key.length === 1;
                          ae && (L.key === "Tab" && L.preventDefault(), !_ && W && K(L.key));
                          const Y = k.current;
                          if (L.target !== Y || !Qy.includes(L.key)) return;
                          L.preventDefault();
                          const Q = R().filter((A) => !A.disabled).map((A) => A.ref.current);
                          ud.includes(L.key) && Q.reverse(), yw(Q);
                        }),
                        onBlur: I(e.onBlur, (L) => {
                          L.currentTarget.contains(L.target) || (window.clearTimeout(D.current), z.current = "");
                        }),
                        onPointerMove: I(
                          e.onPointerMove,
                          _n((L) => {
                            const J = L.target, ae = V.current !== L.clientX;
                            if (L.currentTarget.contains(J) && ae) {
                              const _ = L.clientX > V.current ? "right" : "left";
                              B.current = _, V.current = L.clientX;
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
bd.displayName = ze;
var dw = "MenuGroup", ps = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ l($.div, { role: "group", ...r, ref: t });
  }
);
ps.displayName = dw;
var uw = "MenuLabel", yd = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ l($.div, { ...r, ref: t });
  }
);
yd.displayName = uw;
var kr = "MenuItem", bi = "menu.itemSelect", ao = d.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = d.useRef(null), s = Kn(kr, e.__scopeMenu), i = us(kr, e.__scopeMenu), c = Z(t, a), f = d.useRef(!1), u = () => {
      const p = a.current;
      if (!n && p) {
        const m = new CustomEvent(bi, { bubbles: !0, cancelable: !0 });
        p.addEventListener(bi, (h) => r?.(h), { once: !0 }), yl(p, m), m.defaultPrevented ? f.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ l(
      wd,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: I(e.onClick, u),
        onPointerDown: (p) => {
          e.onPointerDown?.(p), f.current = !0;
        },
        onPointerUp: I(e.onPointerUp, (p) => {
          f.current || p.currentTarget?.click();
        }),
        onKeyDown: I(e.onKeyDown, (p) => {
          const m = i.searchRef.current !== "";
          n || m && p.key === " " || ga.includes(p.key) && (p.currentTarget.click(), p.preventDefault());
        })
      }
    );
  }
);
ao.displayName = kr;
var wd = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = us(kr, n), i = pd(n), c = d.useRef(null), f = Z(t, c), [u, p] = d.useState(!1), [m, h] = d.useState("");
    return d.useEffect(() => {
      const v = c.current;
      v && h((v.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ l(
      Mn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? m,
        children: /* @__PURE__ */ l(oo, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ l(
          $.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: f,
            onPointerMove: I(
              e.onPointerMove,
              _n((v) => {
                r ? s.onItemLeave(v) : (s.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: I(
              e.onPointerLeave,
              _n((v) => s.onItemLeave(v))
            ),
            onFocus: I(e.onFocus, () => p(!0)),
            onBlur: I(e.onBlur, () => p(!1))
          }
        ) })
      }
    );
  }
), fw = "MenuCheckboxItem", xd = d.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ l(Rd, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ l(
      ao,
      {
        role: "menuitemcheckbox",
        "aria-checked": Nr(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": gs(n),
        onSelect: I(
          o.onSelect,
          () => r?.(Nr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
xd.displayName = fw;
var Cd = "MenuRadioGroup", [pw, mw] = Bt(
  Cd,
  { value: void 0, onValueChange: () => {
  } }
), Sd = d.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = Ce(r);
    return /* @__PURE__ */ l(pw, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ l(ps, { ...o, ref: t }) });
  }
);
Sd.displayName = Cd;
var kd = "MenuRadioItem", Nd = d.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = mw(kd, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ l(Rd, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ l(
      ao,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": gs(a),
        onSelect: I(
          r.onSelect,
          () => o.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Nd.displayName = kd;
var ms = "MenuItemIndicator", [Rd, hw] = Bt(
  ms,
  { checked: !1 }
), Ed = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = hw(ms, n);
    return /* @__PURE__ */ l(
      ve,
      {
        present: r || Nr(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ l(
          $.span,
          {
            ...o,
            ref: t,
            "data-state": gs(a.checked)
          }
        )
      }
    );
  }
);
Ed.displayName = ms;
var gw = "MenuSeparator", Pd = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ l(
      $.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Pd.displayName = gw;
var vw = "MenuArrow", Md = d.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = jn(n);
    return /* @__PURE__ */ l(Gn, { ...o, ...r, ref: t });
  }
);
Md.displayName = vw;
var hs = "MenuSub", [bw, _d] = Bt(hs), Dd = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = kt(hs, t), s = jn(t), [i, c] = d.useState(null), [f, u] = d.useState(null), p = Ce(o);
  return d.useEffect(() => (a.open === !1 && p(!1), () => p(!1)), [a.open, p]), /* @__PURE__ */ l(dn, { ...s, children: /* @__PURE__ */ l(
    md,
    {
      scope: t,
      open: r,
      onOpenChange: p,
      content: f,
      onContentChange: u,
      children: /* @__PURE__ */ l(
        bw,
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
Dd.displayName = hs;
var Sn = "MenuSubTrigger", Td = d.forwardRef(
  (e, t) => {
    const n = kt(Sn, e.__scopeMenu), r = Kn(Sn, e.__scopeMenu), o = _d(Sn, e.__scopeMenu), a = us(Sn, e.__scopeMenu), s = d.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: c } = a, f = { __scopeMenu: e.__scopeMenu }, u = d.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return d.useEffect(() => u, [u]), d.useEffect(() => {
      const p = i.current;
      return () => {
        window.clearTimeout(p), c(null);
      };
    }, [i, c]), /* @__PURE__ */ l(cs, { asChild: !0, ...f, children: /* @__PURE__ */ l(
      wd,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Id(n.open),
        ...e,
        ref: lt(t, o.onTriggerChange),
        onClick: (p) => {
          e.onClick?.(p), !(e.disabled || p.defaultPrevented) && (p.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: I(
          e.onPointerMove,
          _n((p) => {
            a.onItemEnter(p), !p.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: I(
          e.onPointerLeave,
          _n((p) => {
            u();
            const m = n.content?.getBoundingClientRect();
            if (m) {
              const h = n.content?.dataset.side, v = h === "right", g = v ? -5 : 5, b = m[v ? "left" : "right"], y = m[v ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: p.clientX + g, y: p.clientY },
                  { x: b, y: m.top },
                  { x: y, y: m.top },
                  { x: y, y: m.bottom },
                  { x: b, y: m.bottom }
                ],
                side: h
              }), window.clearTimeout(i.current), i.current = window.setTimeout(
                () => a.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (a.onTriggerLeave(p), p.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: I(e.onKeyDown, (p) => {
          const m = a.searchRef.current !== "";
          e.disabled || m && p.key === " " || Jy[r.dir].includes(p.key) && (n.onOpenChange(!0), n.content?.focus(), p.preventDefault());
        })
      }
    ) });
  }
);
Td.displayName = Sn;
var Ad = "MenuSubContent", Od = d.forwardRef(
  (e, t) => {
    const n = gd(ze, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = kt(ze, e.__scopeMenu), s = Kn(ze, e.__scopeMenu), i = _d(Ad, e.__scopeMenu), c = d.useRef(null), f = Z(t, c);
    return /* @__PURE__ */ l(Mn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(Mn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(
      fs,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: f,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          s.isUsingKeyboardRef.current && c.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: I(e.onFocusOutside, (u) => {
          u.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: I(e.onEscapeKeyDown, (u) => {
          s.onClose(), u.preventDefault();
        }),
        onKeyDown: I(e.onKeyDown, (u) => {
          const p = u.currentTarget.contains(u.target), m = ew[s.dir].includes(u.key);
          p && m && (a.onOpenChange(!1), i.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Od.displayName = Ad;
function Id(e) {
  return e ? "open" : "closed";
}
function Nr(e) {
  return e === "indeterminate";
}
function gs(e) {
  return Nr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function yw(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function ww(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function xw(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((f) => f === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = ww(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((f) => f !== n));
  const c = s.find(
    (f) => f.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Cw(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], f = i.x, u = i.y, p = c.x, m = c.y;
    u > r != m > r && n < (p - f) * (r - u) / (m - u) + f && (o = !o);
  }
  return o;
}
function Sw(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Cw(n, t);
}
function _n(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var kw = hd, Nw = cs, Rw = vd, Ew = bd, Pw = ps, Mw = yd, _w = ao, Dw = xd, Tw = Sd, Aw = Nd, Ow = Ed, Iw = Pd, zw = Md, Lw = Dd, $w = Td, Fw = Od, so = "DropdownMenu", [Ww, RP] = he(
  so,
  [fd]
), Me = fd(), [Bw, zd] = Ww(so), Ld = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, c = Me(t), f = d.useRef(null), [u, p] = we({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: so
  });
  return /* @__PURE__ */ l(
    Bw,
    {
      scope: t,
      triggerId: ge(),
      triggerRef: f,
      contentId: ge(),
      open: u,
      onOpenChange: p,
      onOpenToggle: d.useCallback(() => p((m) => !m), [p]),
      modal: i,
      children: /* @__PURE__ */ l(kw, { ...c, open: u, onOpenChange: p, dir: r, modal: i, children: n })
    }
  );
};
Ld.displayName = so;
var $d = "DropdownMenuTrigger", Fd = d.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = zd($d, n), s = Me(n);
    return /* @__PURE__ */ l(Nw, { asChild: !0, ...s, children: /* @__PURE__ */ l(
      $.button,
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
Fd.displayName = $d;
var Vw = "DropdownMenuPortal", Wd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Me(t);
  return /* @__PURE__ */ l(Rw, { ...r, ...n });
};
Wd.displayName = Vw;
var Bd = "DropdownMenuContent", Vd = d.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = zd(Bd, n), a = Me(n), s = d.useRef(!1);
    return /* @__PURE__ */ l(
      Ew,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (i) => {
          s.current || o.triggerRef.current?.focus(), s.current = !1, i.preventDefault();
        }),
        onInteractOutside: I(e.onInteractOutside, (i) => {
          const c = i.detail.originalEvent, f = c.button === 0 && c.ctrlKey === !0, u = c.button === 2 || f;
          (!o.modal || u) && (s.current = !0);
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
Vd.displayName = Bd;
var Hw = "DropdownMenuGroup", Hd = d.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(Pw, { ...o, ...r, ref: t });
  }
);
Hd.displayName = Hw;
var Gw = "DropdownMenuLabel", Gd = d.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(Mw, { ...o, ...r, ref: t });
  }
);
Gd.displayName = Gw;
var Yw = "DropdownMenuItem", Yd = d.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(_w, { ...o, ...r, ref: t });
  }
);
Yd.displayName = Yw;
var Uw = "DropdownMenuCheckboxItem", Ud = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Dw, { ...o, ...r, ref: t });
});
Ud.displayName = Uw;
var jw = "DropdownMenuRadioGroup", jd = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Tw, { ...o, ...r, ref: t });
});
jd.displayName = jw;
var Kw = "DropdownMenuRadioItem", Kd = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Aw, { ...o, ...r, ref: t });
});
Kd.displayName = Kw;
var qw = "DropdownMenuItemIndicator", qd = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Ow, { ...o, ...r, ref: t });
});
qd.displayName = qw;
var Xw = "DropdownMenuSeparator", Xd = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(Iw, { ...o, ...r, ref: t });
});
Xd.displayName = Xw;
var Zw = "DropdownMenuArrow", Qw = d.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
    return /* @__PURE__ */ l(zw, { ...o, ...r, ref: t });
  }
);
Qw.displayName = Zw;
var Jw = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = Me(t), [i, c] = we({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ l(Lw, { ...s, open: i, onOpenChange: c, children: n });
}, ex = "DropdownMenuSubTrigger", Zd = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l($w, { ...o, ...r, ref: t });
});
Zd.displayName = ex;
var tx = "DropdownMenuSubContent", Qd = d.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Me(n);
  return /* @__PURE__ */ l(
    Fw,
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
Qd.displayName = tx;
var nx = Ld, rx = Fd, Jd = Wd, ox = Vd, ax = Hd, sx = Gd, ix = Yd, lx = Ud, cx = jd, dx = Kd, eu = qd, ux = Xd, fx = Jw, px = Zd, mx = Qd, hx = "Label", tu = d.forwardRef((e, t) => /* @__PURE__ */ l(
  $.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      n.target.closest("button, input, select, textarea") || (e.onMouseDown?.(n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
tu.displayName = hx;
var nu = tu, Uo, io = "HoverCard", [ru, EP] = he(io, [
  et
]), lo = et(), [gx, co] = ru(io), ou = (e) => {
  const {
    __scopeHoverCard: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    openDelay: s = 700,
    closeDelay: i = 300
  } = e, c = lo(t), f = d.useRef(0), u = d.useRef(0), p = d.useRef(!1), m = d.useRef(!1), [h, v] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: io
  }), g = d.useCallback(() => {
    clearTimeout(u.current), f.current = window.setTimeout(() => v(!0), s);
  }, [s, v]), b = d.useCallback(() => {
    clearTimeout(f.current), !p.current && !m.current && (u.current = window.setTimeout(() => v(!1), i));
  }, [i, v]), y = d.useCallback(() => v(!1), [v]);
  return d.useEffect(() => () => {
    clearTimeout(f.current), clearTimeout(u.current);
  }, []), /* @__PURE__ */ l(
    gx,
    {
      scope: t,
      open: h,
      onOpenChange: v,
      onOpen: g,
      onClose: b,
      onDismiss: y,
      hasSelectionRef: p,
      isPointerDownOnContentRef: m,
      children: /* @__PURE__ */ l(dn, { ...c, children: n })
    }
  );
};
ou.displayName = io;
var au = "HoverCardTrigger", su = d.forwardRef(
  (e, t) => {
    const { __scopeHoverCard: n, ...r } = e, o = co(au, n), a = lo(n);
    return /* @__PURE__ */ l(un, { asChild: !0, ...a, children: /* @__PURE__ */ l(
      $.a,
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
su.displayName = au;
var vs = "HoverCardPortal", [vx, bx] = ru(vs, {
  forceMount: void 0
}), iu = (e) => {
  const { __scopeHoverCard: t, forceMount: n, children: r, container: o } = e, a = co(vs, t);
  return /* @__PURE__ */ l(vx, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Ft, { asChild: !0, container: o, children: r }) }) });
};
iu.displayName = vs;
var Rr = "HoverCardContent", lu = d.forwardRef(
  (e, t) => {
    const n = bx(Rr, e.__scopeHoverCard), { forceMount: r = n.forceMount, ...o } = e, a = co(Rr, e.__scopeHoverCard);
    return /* @__PURE__ */ l(ve, { present: r || a.open, children: /* @__PURE__ */ l(
      yx,
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
lu.displayName = Rr;
var yx = d.forwardRef((e, t) => {
  const {
    __scopeHoverCard: n,
    onEscapeKeyDown: r,
    onPointerDownOutside: o,
    onFocusOutside: a,
    onInteractOutside: s,
    ...i
  } = e, c = co(Rr, n), f = lo(n), u = d.useRef(null), p = Z(t, u), [m, h] = d.useState(!1);
  return d.useEffect(() => {
    if (m) {
      const v = document.body;
      return Uo = v.style.userSelect || v.style.webkitUserSelect, v.style.userSelect = "none", v.style.webkitUserSelect = "none", () => {
        v.style.userSelect = Uo, v.style.webkitUserSelect = Uo;
      };
    }
  }, [m]), d.useEffect(() => {
    if (u.current) {
      const v = () => {
        h(!1), c.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          document.getSelection()?.toString() !== "" && (c.hasSelectionRef.current = !0);
        });
      };
      return document.addEventListener("pointerup", v), () => {
        document.removeEventListener("pointerup", v), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [c.isPointerDownOnContentRef, c.hasSelectionRef]), d.useEffect(() => {
    u.current && Cx(u.current).forEach((g) => g.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ l(
    $t,
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
        Hn,
        {
          ...f,
          ...i,
          onPointerDown: I(i.onPointerDown, (v) => {
            v.currentTarget.contains(v.target) && h(!0), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !0;
          }),
          ref: p,
          style: {
            ...i.style,
            userSelect: m ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: m ? "text" : void 0,
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
}), wx = "HoverCardArrow", xx = d.forwardRef(
  (e, t) => {
    const { __scopeHoverCard: n, ...r } = e, o = lo(n);
    return /* @__PURE__ */ l(Gn, { ...o, ...r, ref: t });
  }
);
xx.displayName = wx;
function Er(e) {
  return (t) => t.pointerType === "touch" ? void 0 : e();
}
function Cx(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
var Sx = ou, kx = su, Nx = iu, Rx = lu;
function Dn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var uo = "Popover", [cu, PP] = he(uo, [
  et
]), qn = et(), [Ex, Nt] = cu(uo), du = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = qn(t), c = d.useRef(null), [f, u] = d.useState(!1), [p, m] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: uo
  });
  return /* @__PURE__ */ l(dn, { ...i, children: /* @__PURE__ */ l(
    Ex,
    {
      scope: t,
      contentId: ge(),
      triggerRef: c,
      open: p,
      onOpenChange: m,
      onOpenToggle: d.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: f,
      onCustomAnchorAdd: d.useCallback(() => u(!0), []),
      onCustomAnchorRemove: d.useCallback(() => u(!1), []),
      modal: s,
      children: n
    }
  ) });
};
du.displayName = uo;
var uu = "PopoverAnchor", Px = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Nt(uu, n), a = qn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return d.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ l(un, { ...a, ...r, ref: t });
  }
);
Px.displayName = uu;
var fu = "PopoverTrigger", pu = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Nt(fu, n), a = qn(n), s = Z(t, o.triggerRef), i = /* @__PURE__ */ l(
      $.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": bu(o.open),
        ...r,
        ref: s,
        onClick: I(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ l(un, { asChild: !0, ...a, children: i });
  }
);
pu.displayName = fu;
var bs = "PopoverPortal", [Mx, _x] = cu(bs, {
  forceMount: void 0
}), mu = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Nt(bs, t);
  return /* @__PURE__ */ l(Mx, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Ft, { asChild: !0, container: o, children: r }) }) });
};
mu.displayName = bs;
var tn = "PopoverContent", hu = d.forwardRef(
  (e, t) => {
    const n = _x(tn, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Nt(tn, e.__scopePopover);
    return /* @__PURE__ */ l(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ l(Tx, { ...o, ref: t }) : /* @__PURE__ */ l(Ax, { ...o, ref: t }) });
  }
);
hu.displayName = tn;
var Dx = /* @__PURE__ */ yt("PopoverContent.RemoveScroll"), Tx = d.forwardRef(
  (e, t) => {
    const n = Nt(tn, e.__scopePopover), r = d.useRef(null), o = Z(t, r), a = d.useRef(!1);
    return d.useEffect(() => {
      const s = r.current;
      if (s) return Ur(s);
    }, []), /* @__PURE__ */ l(Fn, { as: Dx, allowPinchZoom: !0, children: /* @__PURE__ */ l(
      gu,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (s) => {
          s.preventDefault(), a.current || n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: I(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, f = i.button === 2 || c;
            a.current = f;
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
), Ax = d.forwardRef(
  (e, t) => {
    const n = Nt(tn, e.__scopePopover), r = d.useRef(!1), o = d.useRef(!1);
    return /* @__PURE__ */ l(
      gu,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (r.current || n.triggerRef.current?.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          n.triggerRef.current?.contains(s) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), gu = d.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: f,
      onInteractOutside: u,
      ...p
    } = e, m = Nt(tn, n), h = qn(n);
    return Gr(), /* @__PURE__ */ l(
      $n,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ l(
          $t,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: u,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: f,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ l(
              Hn,
              {
                "data-state": bu(m.open),
                role: "dialog",
                id: m.contentId,
                ...h,
                ...p,
                ref: t,
                style: {
                  ...p.style,
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
), vu = "PopoverClose", Ox = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Nt(vu, n);
    return /* @__PURE__ */ l(
      $.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: I(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Ox.displayName = vu;
var Ix = "PopoverArrow", zx = d.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = qn(n);
    return /* @__PURE__ */ l(Gn, { ...o, ...r, ref: t });
  }
);
zx.displayName = Ix;
function bu(e) {
  return e ? "open" : "closed";
}
var Lx = du, $x = pu, Fx = mu, Wx = hu, ys = "Progress", ws = 100, [Bx, MP] = he(ys), [Vx, Hx] = Bx(ys), yu = d.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: o,
      getValueLabel: a = Gx,
      ...s
    } = e;
    (o || o === 0) && !yi(o) && console.error(Yx(`${o}`, "Progress"));
    const i = yi(o) ? o : ws;
    r !== null && !wi(r, i) && console.error(Ux(`${r}`, "Progress"));
    const c = wi(r, i) ? r : null, f = Pr(c) ? a(c, i) : void 0;
    return /* @__PURE__ */ l(Vx, { scope: n, value: c, max: i, children: /* @__PURE__ */ l(
      $.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": Pr(c) ? c : void 0,
        "aria-valuetext": f,
        role: "progressbar",
        "data-state": Cu(c, i),
        "data-value": c ?? void 0,
        "data-max": i,
        ...s,
        ref: t
      }
    ) });
  }
);
yu.displayName = ys;
var wu = "ProgressIndicator", xu = d.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...r } = e, o = Hx(wu, n);
    return /* @__PURE__ */ l(
      $.div,
      {
        "data-state": Cu(o.value, o.max),
        "data-value": o.value ?? void 0,
        "data-max": o.max,
        ...r,
        ref: t
      }
    );
  }
);
xu.displayName = wu;
function Gx(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function Cu(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Pr(e) {
  return typeof e == "number";
}
function yi(e) {
  return Pr(e) && !isNaN(e) && e > 0;
}
function wi(e, t) {
  return Pr(e) && !isNaN(e) && e <= t && e >= 0;
}
function Yx(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${ws}\`.`;
}
function Ux(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${ws} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var jx = yu, Kx = xu, xs = "Radio", [qx, Su] = he(xs), [Xx, Zx] = qx(xs), ku = d.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: a,
      disabled: s,
      value: i = "on",
      onCheck: c,
      form: f,
      ...u
    } = e, [p, m] = d.useState(null), h = Z(t, (b) => m(b)), v = d.useRef(!1), g = p ? f || !!p.closest("form") : !0;
    return /* @__PURE__ */ M(Xx, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ l(
        $.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Pu(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...u,
          ref: h,
          onClick: I(e.onClick, (b) => {
            o || c?.(), g && (v.current = b.isPropagationStopped(), v.current || b.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ l(
        Eu,
        {
          control: p,
          bubbles: !v.current,
          name: r,
          value: i,
          checked: o,
          required: a,
          disabled: s,
          form: f,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
ku.displayName = xs;
var Nu = "RadioIndicator", Ru = d.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = Zx(Nu, n);
    return /* @__PURE__ */ l(ve, { present: r || a.checked, children: /* @__PURE__ */ l(
      $.span,
      {
        "data-state": Pu(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
Ru.displayName = Nu;
var Qx = "RadioBubbleInput", Eu = d.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = d.useRef(null), i = Z(s, a), c = Wn(n), f = Bn(t);
    return d.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const p = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        p,
        "checked"
      ).set;
      if (c !== n && h) {
        const v = new Event("click", { bubbles: r });
        h.call(u, n), u.dispatchEvent(v);
      }
    }, [c, n, r]), /* @__PURE__ */ l(
      $.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...f,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Eu.displayName = Qx;
function Pu(e) {
  return e ? "checked" : "unchecked";
}
var Jx = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], fo = "RadioGroup", [eC, _P] = he(fo, [
  St,
  Su
]), Mu = St(), _u = Su(), [tC, nC] = eC(fo), Du = d.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: a,
      required: s = !1,
      disabled: i = !1,
      orientation: c,
      dir: f,
      loop: u = !0,
      onValueChange: p,
      ...m
    } = e, h = Mu(n), v = ut(f), [g, b] = we({
      prop: a,
      defaultProp: o ?? null,
      onChange: p,
      caller: fo
    });
    return /* @__PURE__ */ l(
      tC,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: g,
        onValueChange: b,
        children: /* @__PURE__ */ l(
          ro,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: v,
            loop: u,
            children: /* @__PURE__ */ l(
              $.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": c,
                "data-disabled": i ? "" : void 0,
                dir: v,
                ...m,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
Du.displayName = fo;
var Tu = "RadioGroupItem", Au = d.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = nC(Tu, n), s = a.disabled || r, i = Mu(n), c = _u(n), f = d.useRef(null), u = Z(t, f), p = a.value === o.value, m = d.useRef(!1);
    return d.useEffect(() => {
      const h = (g) => {
        Jx.includes(g.key) && (m.current = !0);
      }, v = () => m.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", v), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", v);
      };
    }, []), /* @__PURE__ */ l(
      oo,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: p,
        children: /* @__PURE__ */ l(
          ku,
          {
            disabled: s,
            required: a.required,
            checked: p,
            ...c,
            ...o,
            name: a.name,
            ref: u,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: I((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: I(o.onFocus, () => {
              m.current && f.current?.click();
            })
          }
        )
      }
    );
  }
);
Au.displayName = Tu;
var rC = "RadioGroupIndicator", Ou = d.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = _u(n);
    return /* @__PURE__ */ l(Ru, { ...o, ...r, ref: t });
  }
);
Ou.displayName = rC;
var oC = Du, aC = Au, sC = Ou;
function iC(e, t) {
  return d.useReducer((n, r) => t[n][r] ?? n, e);
}
var Cs = "ScrollArea", [Iu, DP] = he(Cs), [lC, Le] = Iu(Cs), zu = d.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, c] = d.useState(null), [f, u] = d.useState(null), [p, m] = d.useState(null), [h, v] = d.useState(null), [g, b] = d.useState(null), [y, w] = d.useState(0), [x, R] = d.useState(0), [S, E] = d.useState(!1), [k, N] = d.useState(!1), D = Z(t, (T) => c(T)), z = ut(o);
    return /* @__PURE__ */ l(
      lC,
      {
        scope: n,
        type: r,
        dir: z,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: f,
        onViewportChange: u,
        content: p,
        onContentChange: m,
        scrollbarX: h,
        onScrollbarXChange: v,
        scrollbarXEnabled: S,
        onScrollbarXEnabledChange: E,
        scrollbarY: g,
        onScrollbarYChange: b,
        scrollbarYEnabled: k,
        onScrollbarYEnabledChange: N,
        onCornerWidthChange: w,
        onCornerHeightChange: R,
        children: /* @__PURE__ */ l(
          $.div,
          {
            dir: z,
            ...s,
            ref: D,
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
zu.displayName = Cs;
var Lu = "ScrollAreaViewport", $u = d.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = Le(Lu, n), i = d.useRef(null), c = Z(t, i, s.onViewportChange);
    return /* @__PURE__ */ M(Pe, { children: [
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
        $.div,
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
$u.displayName = Lu;
var tt = "ScrollAreaScrollbar", Mr = d.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Le(tt, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return d.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ l(cC, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ l(dC, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ l(Fu, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ l(Ss, { ...r, ref: t }) : null;
  }
);
Mr.displayName = tt;
var cC = d.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Le(tt, e.__scopeScrollArea), [a, s] = d.useState(!1);
  return d.useEffect(() => {
    const i = o.scrollArea;
    let c = 0;
    if (i) {
      const f = () => {
        window.clearTimeout(c), s(!0);
      }, u = () => {
        c = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", f), i.addEventListener("pointerleave", u), () => {
        window.clearTimeout(c), i.removeEventListener("pointerenter", f), i.removeEventListener("pointerleave", u);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ l(ve, { present: n || a, children: /* @__PURE__ */ l(
    Fu,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), dC = d.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Le(tt, e.__scopeScrollArea), a = e.orientation === "horizontal", s = mo(() => c("SCROLL_END"), 100), [i, c] = iC("hidden", {
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
  return d.useEffect(() => {
    if (i === "idle") {
      const f = window.setTimeout(() => c("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(f);
    }
  }, [i, o.scrollHideDelay, c]), d.useEffect(() => {
    const f = o.viewport, u = a ? "scrollLeft" : "scrollTop";
    if (f) {
      let p = f[u];
      const m = () => {
        const h = f[u];
        p !== h && (c("SCROLL"), s()), p = h;
      };
      return f.addEventListener("scroll", m), () => f.removeEventListener("scroll", m);
    }
  }, [o.viewport, a, c, s]), /* @__PURE__ */ l(ve, { present: n || i !== "hidden", children: /* @__PURE__ */ l(
    Ss,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: I(e.onPointerEnter, () => c("POINTER_ENTER")),
      onPointerLeave: I(e.onPointerLeave, () => c("POINTER_LEAVE"))
    }
  ) });
}), Fu = d.forwardRef((e, t) => {
  const n = Le(tt, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = d.useState(!1), i = e.orientation === "horizontal", c = mo(() => {
    if (n.viewport) {
      const f = n.viewport.offsetWidth < n.viewport.scrollWidth, u = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? f : u);
    }
  }, 10);
  return nn(n.viewport, c), nn(n.content, c), /* @__PURE__ */ l(ve, { present: r || a, children: /* @__PURE__ */ l(
    Ss,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), Ss = d.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = Le(tt, e.__scopeScrollArea), a = d.useRef(null), s = d.useRef(0), [i, c] = d.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), f = Hu(i.viewport, i.content), u = {
    ...r,
    sizes: i,
    onSizesChange: c,
    hasThumb: f > 0 && f < 1,
    onThumbChange: (m) => a.current = m,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (m) => s.current = m
  };
  function p(m, h) {
    return gC(m, s.current, i, h);
  }
  return n === "horizontal" ? /* @__PURE__ */ l(
    uC,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const m = o.viewport.scrollLeft, h = xi(m, i, o.dir);
          a.current.style.transform = `translate3d(${h}px, 0, 0)`;
        }
      },
      onWheelScroll: (m) => {
        o.viewport && (o.viewport.scrollLeft = m);
      },
      onDragScroll: (m) => {
        o.viewport && (o.viewport.scrollLeft = p(m, o.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ l(
    fC,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const m = o.viewport.scrollTop, h = xi(m, i);
          a.current.style.transform = `translate3d(0, ${h}px, 0)`;
        }
      },
      onWheelScroll: (m) => {
        o.viewport && (o.viewport.scrollTop = m);
      },
      onDragScroll: (m) => {
        o.viewport && (o.viewport.scrollTop = p(m));
      }
    }
  ) : null;
}), uC = d.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Le(tt, e.__scopeScrollArea), [s, i] = d.useState(), c = d.useRef(null), f = Z(t, c, a.onScrollbarXChange);
  return d.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ l(
    Bu,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: f,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": po(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (u) => e.onThumbPointerDown(u.x),
      onDragScroll: (u) => e.onDragScroll(u.x),
      onWheelScroll: (u, p) => {
        if (a.viewport) {
          const m = a.viewport.scrollLeft + u.deltaX;
          e.onWheelScroll(m), Yu(m, p) && u.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: c.current.clientWidth,
            paddingStart: Tr(s.paddingLeft),
            paddingEnd: Tr(s.paddingRight)
          }
        });
      }
    }
  );
}), fC = d.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Le(tt, e.__scopeScrollArea), [s, i] = d.useState(), c = d.useRef(null), f = Z(t, c, a.onScrollbarYChange);
  return d.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ l(
    Bu,
    {
      "data-orientation": "vertical",
      ...o,
      ref: f,
      sizes: n,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": po(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (u) => e.onThumbPointerDown(u.y),
      onDragScroll: (u) => e.onDragScroll(u.y),
      onWheelScroll: (u, p) => {
        if (a.viewport) {
          const m = a.viewport.scrollTop + u.deltaY;
          e.onWheelScroll(m), Yu(m, p) && u.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: c.current.clientHeight,
            paddingStart: Tr(s.paddingTop),
            paddingEnd: Tr(s.paddingBottom)
          }
        });
      }
    }
  );
}), [pC, Wu] = Iu(tt), Bu = d.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: c,
    onDragScroll: f,
    onWheelScroll: u,
    onResize: p,
    ...m
  } = e, h = Le(tt, n), [v, g] = d.useState(null), b = Z(t, (D) => g(D)), y = d.useRef(null), w = d.useRef(""), x = h.viewport, R = r.content - r.viewport, S = Ce(u), E = Ce(c), k = mo(p, 10);
  function N(D) {
    if (y.current) {
      const z = D.clientX - y.current.left, T = D.clientY - y.current.top;
      f({ x: z, y: T });
    }
  }
  return d.useEffect(() => {
    const D = (z) => {
      const T = z.target;
      v?.contains(T) && S(z, R);
    };
    return document.addEventListener("wheel", D, { passive: !1 }), () => document.removeEventListener("wheel", D, { passive: !1 });
  }, [x, v, R, S]), d.useEffect(E, [r, E]), nn(v, k), nn(h.content, k), /* @__PURE__ */ l(
    pC,
    {
      scope: n,
      scrollbar: v,
      hasThumb: o,
      onThumbChange: Ce(a),
      onThumbPointerUp: Ce(s),
      onThumbPositionChange: E,
      onThumbPointerDown: Ce(i),
      children: /* @__PURE__ */ l(
        $.div,
        {
          ...m,
          ref: b,
          style: { position: "absolute", ...m.style },
          onPointerDown: I(e.onPointerDown, (D) => {
            D.button === 0 && (D.target.setPointerCapture(D.pointerId), y.current = v.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", h.viewport && (h.viewport.style.scrollBehavior = "auto"), N(D));
          }),
          onPointerMove: I(e.onPointerMove, N),
          onPointerUp: I(e.onPointerUp, (D) => {
            const z = D.target;
            z.hasPointerCapture(D.pointerId) && z.releasePointerCapture(D.pointerId), document.body.style.webkitUserSelect = w.current, h.viewport && (h.viewport.style.scrollBehavior = ""), y.current = null;
          })
        }
      )
    }
  );
}), _r = "ScrollAreaThumb", Dr = d.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Wu(_r, e.__scopeScrollArea);
    return /* @__PURE__ */ l(ve, { present: n || o.hasThumb, children: /* @__PURE__ */ l(mC, { ref: t, ...r }) });
  }
), mC = d.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = Le(_r, n), s = Wu(_r, n), { onThumbPositionChange: i } = s, c = Z(
      t,
      (p) => s.onThumbChange(p)
    ), f = d.useRef(void 0), u = mo(() => {
      f.current && (f.current(), f.current = void 0);
    }, 100);
    return d.useEffect(() => {
      const p = a.viewport;
      if (p) {
        const m = () => {
          if (u(), !f.current) {
            const h = vC(p, i);
            f.current = h, i();
          }
        };
        return i(), p.addEventListener("scroll", m), () => p.removeEventListener("scroll", m);
      }
    }, [a.viewport, u, i]), /* @__PURE__ */ l(
      $.div,
      {
        "data-state": s.hasThumb ? "visible" : "hidden",
        ...o,
        ref: c,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: I(e.onPointerDownCapture, (p) => {
          const h = p.target.getBoundingClientRect(), v = p.clientX - h.left, g = p.clientY - h.top;
          s.onThumbPointerDown({ x: v, y: g });
        }),
        onPointerUp: I(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
Dr.displayName = _r;
var ks = "ScrollAreaCorner", Vu = d.forwardRef(
  (e, t) => {
    const n = Le(ks, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ l(hC, { ...e, ref: t }) : null;
  }
);
Vu.displayName = ks;
var hC = d.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = Le(ks, n), [a, s] = d.useState(0), [i, c] = d.useState(0), f = !!(a && i);
  return nn(o.scrollbarX, () => {
    const u = o.scrollbarX?.offsetHeight || 0;
    o.onCornerHeightChange(u), c(u);
  }), nn(o.scrollbarY, () => {
    const u = o.scrollbarY?.offsetWidth || 0;
    o.onCornerWidthChange(u), s(u);
  }), f ? /* @__PURE__ */ l(
    $.div,
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
function Tr(e) {
  return e ? parseInt(e, 10) : 0;
}
function Hu(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function po(e) {
  const t = Hu(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function gC(e, t, n, r = "ltr") {
  const o = po(n), a = o / 2, s = t || a, i = o - s, c = n.scrollbar.paddingStart + s, f = n.scrollbar.size - n.scrollbar.paddingEnd - i, u = n.content - n.viewport, p = r === "ltr" ? [0, u] : [u * -1, 0];
  return Gu([c, f], p)(e);
}
function xi(e, t, n = "ltr") {
  const r = po(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, c = n === "ltr" ? [0, s] : [s * -1, 0], f = Dn(e, c);
  return Gu([0, s], [0, i])(f);
}
function Gu(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Yu(e, t) {
  return e > 0 && e < t;
}
var vC = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return (function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  })(), () => window.cancelAnimationFrame(r);
};
function mo(e, t) {
  const n = Ce(e), r = d.useRef(0);
  return d.useEffect(() => () => window.clearTimeout(r.current), []), d.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function nn(e, t) {
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
var Uu = zu, ju = $u, bC = Vu, yC = [" ", "Enter", "ArrowUp", "ArrowDown"], wC = [" ", "Enter"], It = "Select", [ho, go, xC] = Ln(It), [fn, TP] = he(It, [
  xC,
  et
]), vo = et(), [CC, Rt] = fn(It), [SC, kC] = fn(It), Ku = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: c,
    dir: f,
    name: u,
    autoComplete: p,
    disabled: m,
    required: h,
    form: v
  } = e, g = vo(t), [b, y] = d.useState(null), [w, x] = d.useState(null), [R, S] = d.useState(!1), E = ut(f), [k, N] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: It
  }), [D, z] = we({
    prop: s,
    defaultProp: i,
    onChange: c,
    caller: It
  }), T = d.useRef(null), F = b ? v || !!b.closest("form") : !0, [B, V] = d.useState(/* @__PURE__ */ new Set()), X = Array.from(B).map((H) => H.props.value).join(";");
  return /* @__PURE__ */ l(dn, { ...g, children: /* @__PURE__ */ M(
    CC,
    {
      required: h,
      scope: t,
      trigger: b,
      onTriggerChange: y,
      valueNode: w,
      onValueNodeChange: x,
      valueNodeHasChildren: R,
      onValueNodeHasChildrenChange: S,
      contentId: ge(),
      value: D,
      onValueChange: z,
      open: k,
      onOpenChange: N,
      dir: E,
      triggerPointerDownPosRef: T,
      disabled: m,
      children: [
        /* @__PURE__ */ l(ho.Provider, { scope: t, children: /* @__PURE__ */ l(
          SC,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: d.useCallback((H) => {
              V((K) => new Set(K).add(H));
            }, []),
            onNativeOptionRemove: d.useCallback((H) => {
              V((K) => {
                const P = new Set(K);
                return P.delete(H), P;
              });
            }, []),
            children: n
          }
        ) }),
        F ? /* @__PURE__ */ M(
          wf,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: u,
            autoComplete: p,
            value: D,
            onChange: (H) => z(H.target.value),
            disabled: m,
            form: v,
            children: [
              D === void 0 ? /* @__PURE__ */ l("option", { value: "" }) : null,
              Array.from(B)
            ]
          },
          X
        ) : null
      ]
    }
  ) });
};
Ku.displayName = It;
var qu = "SelectTrigger", Xu = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = vo(n), s = Rt(qu, n), i = s.disabled || r, c = Z(t, s.onTriggerChange), f = go(n), u = d.useRef("touch"), [p, m, h] = Cf((g) => {
      const b = f().filter((x) => !x.disabled), y = b.find((x) => x.value === s.value), w = Sf(b, g, y);
      w !== void 0 && s.onValueChange(w.value);
    }), v = (g) => {
      i || (s.onOpenChange(!0), h()), g && (s.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ l(un, { asChild: !0, ...a, children: /* @__PURE__ */ l(
      $.button,
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
        "data-placeholder": xf(s.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: I(o.onClick, (g) => {
          g.currentTarget.focus(), u.current !== "mouse" && v(g);
        }),
        onPointerDown: I(o.onPointerDown, (g) => {
          u.current = g.pointerType;
          const b = g.target;
          b.hasPointerCapture(g.pointerId) && b.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (v(g), g.preventDefault());
        }),
        onKeyDown: I(o.onKeyDown, (g) => {
          const b = p.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key), !(b && g.key === " ") && yC.includes(g.key) && (v(), g.preventDefault());
        })
      }
    ) });
  }
);
Xu.displayName = qu;
var Zu = "SelectValue", Qu = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, c = Rt(Zu, n), { onValueNodeHasChildrenChange: f } = c, u = a !== void 0, p = Z(t, c.onValueNodeChange);
    return ye(() => {
      f(u);
    }, [f, u]), /* @__PURE__ */ l(
      $.span,
      {
        ...i,
        ref: p,
        style: { pointerEvents: "none" },
        children: xf(c.value) ? /* @__PURE__ */ l(Pe, { children: s }) : a
      }
    );
  }
);
Qu.displayName = Zu;
var NC = "SelectIcon", Ju = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ l($.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Ju.displayName = NC;
var RC = "SelectPortal", ef = (e) => /* @__PURE__ */ l(Ft, { asChild: !0, ...e });
ef.displayName = RC;
var zt = "SelectContent", tf = d.forwardRef(
  (e, t) => {
    const n = Rt(zt, e.__scopeSelect), [r, o] = d.useState();
    if (ye(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? Fr.createPortal(
        /* @__PURE__ */ l(nf, { scope: e.__scopeSelect, children: /* @__PURE__ */ l(ho.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ l("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ l(rf, { ...e, ref: t });
  }
);
tf.displayName = zt;
var Fe = 10, [nf, Et] = fn(zt), EC = "SelectContentImpl", PC = /* @__PURE__ */ yt("SelectContent.RemoveScroll"), rf = d.forwardRef(
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
      align: f,
      alignOffset: u,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b,
      //
      ...y
    } = e, w = Rt(zt, n), [x, R] = d.useState(null), [S, E] = d.useState(null), k = Z(t, (A) => R(A)), [N, D] = d.useState(null), [z, T] = d.useState(
      null
    ), F = go(n), [B, V] = d.useState(!1), X = d.useRef(!1);
    d.useEffect(() => {
      if (x) return Ur(x);
    }, [x]), Gr();
    const H = d.useCallback(
      (A) => {
        const [ee, ...te] = F().map((ue) => ue.ref.current), [re] = te.slice(-1), se = document.activeElement;
        for (const ue of A)
          if (ue === se || (ue?.scrollIntoView({ block: "nearest" }), ue === ee && S && (S.scrollTop = 0), ue === re && S && (S.scrollTop = S.scrollHeight), ue?.focus(), document.activeElement !== se)) return;
      },
      [F, S]
    ), K = d.useCallback(
      () => H([N, x]),
      [H, N, x]
    );
    d.useEffect(() => {
      B && K();
    }, [B, K]);
    const { onOpenChange: P, triggerPointerDownPosRef: L } = w;
    d.useEffect(() => {
      if (x) {
        let A = { x: 0, y: 0 };
        const ee = (re) => {
          A = {
            x: Math.abs(Math.round(re.pageX) - (L.current?.x ?? 0)),
            y: Math.abs(Math.round(re.pageY) - (L.current?.y ?? 0))
          };
        }, te = (re) => {
          A.x <= 10 && A.y <= 10 ? re.preventDefault() : x.contains(re.target) || P(!1), document.removeEventListener("pointermove", ee), L.current = null;
        };
        return L.current !== null && (document.addEventListener("pointermove", ee), document.addEventListener("pointerup", te, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", ee), document.removeEventListener("pointerup", te, { capture: !0 });
        };
      }
    }, [x, P, L]), d.useEffect(() => {
      const A = () => P(!1);
      return window.addEventListener("blur", A), window.addEventListener("resize", A), () => {
        window.removeEventListener("blur", A), window.removeEventListener("resize", A);
      };
    }, [P]);
    const [J, ae] = Cf((A) => {
      const ee = F().filter((se) => !se.disabled), te = ee.find((se) => se.ref.current === document.activeElement), re = Sf(ee, A, te);
      re && setTimeout(() => re.ref.current.focus());
    }), _ = d.useCallback(
      (A, ee, te) => {
        const re = !X.current && !te;
        (w.value !== void 0 && w.value === ee || re) && (D(A), re && (X.current = !0));
      },
      [w.value]
    ), W = d.useCallback(() => x?.focus(), [x]), Y = d.useCallback(
      (A, ee, te) => {
        const re = !X.current && !te;
        (w.value !== void 0 && w.value === ee || re) && T(A);
      },
      [w.value]
    ), G = r === "popper" ? va : of, Q = G === va ? {
      side: i,
      sideOffset: c,
      align: f,
      alignOffset: u,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: g,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ l(
      nf,
      {
        scope: n,
        content: x,
        viewport: S,
        onViewportChange: E,
        itemRefCallback: _,
        selectedItem: N,
        onItemLeave: W,
        itemTextRefCallback: Y,
        focusSelectedItem: K,
        selectedItemText: z,
        position: r,
        isPositioned: B,
        searchRef: J,
        children: /* @__PURE__ */ l(Fn, { as: PC, allowPinchZoom: !0, children: /* @__PURE__ */ l(
          $n,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (A) => {
              A.preventDefault();
            },
            onUnmountAutoFocus: I(o, (A) => {
              w.trigger?.focus({ preventScroll: !0 }), A.preventDefault();
            }),
            children: /* @__PURE__ */ l(
              $t,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: (A) => A.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ l(
                  G,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (A) => A.preventDefault(),
                    ...y,
                    ...Q,
                    onPlaced: () => V(!0),
                    ref: k,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...y.style
                    },
                    onKeyDown: I(y.onKeyDown, (A) => {
                      const ee = A.ctrlKey || A.altKey || A.metaKey;
                      if (A.key === "Tab" && A.preventDefault(), !ee && A.key.length === 1 && ae(A.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(A.key)) {
                        let re = F().filter((se) => !se.disabled).map((se) => se.ref.current);
                        if (["ArrowUp", "End"].includes(A.key) && (re = re.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(A.key)) {
                          const se = A.target, ue = re.indexOf(se);
                          re = re.slice(ue + 1);
                        }
                        setTimeout(() => H(re)), A.preventDefault();
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
rf.displayName = EC;
var MC = "SelectItemAlignedPosition", of = d.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = Rt(zt, n), s = Et(zt, n), [i, c] = d.useState(null), [f, u] = d.useState(null), p = Z(t, (k) => u(k)), m = go(n), h = d.useRef(!1), v = d.useRef(!0), { viewport: g, selectedItem: b, selectedItemText: y, focusSelectedItem: w } = s, x = d.useCallback(() => {
    if (a.trigger && a.valueNode && i && f && g && b && y) {
      const k = a.trigger.getBoundingClientRect(), N = f.getBoundingClientRect(), D = a.valueNode.getBoundingClientRect(), z = y.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const se = z.left - N.left, ue = D.left - se, _e = k.left - ue, Ye = k.width + _e, hn = Math.max(Ye, N.width), gn = window.innerWidth - Fe, vn = Dn(ue, [
          Fe,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Fe, gn - hn)
        ]);
        i.style.minWidth = Ye + "px", i.style.left = vn + "px";
      } else {
        const se = N.right - z.right, ue = window.innerWidth - D.right - se, _e = window.innerWidth - k.right - ue, Ye = k.width + _e, hn = Math.max(Ye, N.width), gn = window.innerWidth - Fe, vn = Dn(ue, [
          Fe,
          Math.max(Fe, gn - hn)
        ]);
        i.style.minWidth = Ye + "px", i.style.right = vn + "px";
      }
      const T = m(), F = window.innerHeight - Fe * 2, B = g.scrollHeight, V = window.getComputedStyle(f), X = parseInt(V.borderTopWidth, 10), H = parseInt(V.paddingTop, 10), K = parseInt(V.borderBottomWidth, 10), P = parseInt(V.paddingBottom, 10), L = X + H + B + P + K, J = Math.min(b.offsetHeight * 5, L), ae = window.getComputedStyle(g), _ = parseInt(ae.paddingTop, 10), W = parseInt(ae.paddingBottom, 10), Y = k.top + k.height / 2 - Fe, G = F - Y, Q = b.offsetHeight / 2, A = b.offsetTop + Q, ee = X + H + A, te = L - ee;
      if (ee <= Y) {
        const se = T.length > 0 && b === T[T.length - 1].ref.current;
        i.style.bottom = "0px";
        const ue = f.clientHeight - g.offsetTop - g.offsetHeight, _e = Math.max(
          G,
          Q + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (se ? W : 0) + ue + K
        ), Ye = ee + _e;
        i.style.height = Ye + "px";
      } else {
        const se = T.length > 0 && b === T[0].ref.current;
        i.style.top = "0px";
        const _e = Math.max(
          Y,
          X + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (se ? _ : 0) + Q
        ) + te;
        i.style.height = _e + "px", g.scrollTop = ee - Y + g.offsetTop;
      }
      i.style.margin = `${Fe}px 0`, i.style.minHeight = J + "px", i.style.maxHeight = F + "px", r?.(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    m,
    a.trigger,
    a.valueNode,
    i,
    f,
    g,
    b,
    y,
    a.dir,
    r
  ]);
  ye(() => x(), [x]);
  const [R, S] = d.useState();
  ye(() => {
    f && S(window.getComputedStyle(f).zIndex);
  }, [f]);
  const E = d.useCallback(
    (k) => {
      k && v.current === !0 && (x(), w?.(), v.current = !1);
    },
    [x, w]
  );
  return /* @__PURE__ */ l(
    DC,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: E,
      children: /* @__PURE__ */ l(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: R
          },
          children: /* @__PURE__ */ l(
            $.div,
            {
              ...o,
              ref: p,
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
of.displayName = MC;
var _C = "SelectPopperPosition", va = d.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Fe,
    ...a
  } = e, s = vo(n);
  return /* @__PURE__ */ l(
    Hn,
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
va.displayName = _C;
var [DC, Ns] = fn(zt, {}), ba = "SelectViewport", af = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = Et(ba, n), s = Ns(ba, n), i = Z(t, a.onViewportChange), c = d.useRef(0);
    return /* @__PURE__ */ M(Pe, { children: [
      /* @__PURE__ */ l(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ l(ho.Slot, { scope: n, children: /* @__PURE__ */ l(
        $.div,
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
          onScroll: I(o.onScroll, (f) => {
            const u = f.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: m } = s;
            if (m?.current && p) {
              const h = Math.abs(c.current - u.scrollTop);
              if (h > 0) {
                const v = window.innerHeight - Fe * 2, g = parseFloat(p.style.minHeight), b = parseFloat(p.style.height), y = Math.max(g, b);
                if (y < v) {
                  const w = y + h, x = Math.min(v, w), R = w - x;
                  p.style.height = x + "px", p.style.bottom === "0px" && (u.scrollTop = R > 0 ? R : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = u.scrollTop;
          })
        }
      ) })
    ] });
  }
);
af.displayName = ba;
var sf = "SelectGroup", [TC, AC] = fn(sf), lf = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = ge();
    return /* @__PURE__ */ l(TC, { scope: n, id: o, children: /* @__PURE__ */ l($.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
lf.displayName = sf;
var cf = "SelectLabel", df = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = AC(cf, n);
    return /* @__PURE__ */ l($.div, { id: o.id, ...r, ref: t });
  }
);
df.displayName = cf;
var Ar = "SelectItem", [OC, uf] = fn(Ar), ff = d.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = Rt(Ar, n), c = Et(Ar, n), f = i.value === r, [u, p] = d.useState(a ?? ""), [m, h] = d.useState(!1), v = Z(
      t,
      (w) => c.itemRefCallback?.(w, r, o)
    ), g = ge(), b = d.useRef("touch"), y = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ l(
      OC,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: g,
        isSelected: f,
        onItemTextChange: d.useCallback((w) => {
          p((x) => x || (w?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ l(
          ho.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: u,
            children: /* @__PURE__ */ l(
              $.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": f && m,
                "data-state": f ? "checked" : "unchecked",
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
                  b.current = w.pointerType, o ? c.onItemLeave?.() : b.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: I(s.onPointerLeave, (w) => {
                  w.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: I(s.onKeyDown, (w) => {
                  c.searchRef?.current !== "" && w.key === " " || (wC.includes(w.key) && y(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
ff.displayName = Ar;
var kn = "SelectItemText", pf = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = Rt(kn, n), i = Et(kn, n), c = uf(kn, n), f = kC(kn, n), [u, p] = d.useState(null), m = Z(
      t,
      (y) => p(y),
      c.onItemTextChange,
      (y) => i.itemTextRefCallback?.(y, c.value, c.disabled)
    ), h = u?.textContent, v = d.useMemo(
      () => /* @__PURE__ */ l("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: b } = f;
    return ye(() => (g(v), () => b(v)), [g, b, v]), /* @__PURE__ */ M(Pe, { children: [
      /* @__PURE__ */ l($.span, { id: c.textId, ...a, ref: m }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? Fr.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
pf.displayName = kn;
var mf = "SelectItemIndicator", hf = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return uf(mf, n).isSelected ? /* @__PURE__ */ l($.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
hf.displayName = mf;
var ya = "SelectScrollUpButton", gf = d.forwardRef((e, t) => {
  const n = Et(ya, e.__scopeSelect), r = Ns(ya, e.__scopeSelect), [o, a] = d.useState(!1), s = Z(t, r.onScrollButtonChange);
  return ye(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const f = c.scrollTop > 0;
        a(f);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ l(
    bf,
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
gf.displayName = ya;
var wa = "SelectScrollDownButton", vf = d.forwardRef((e, t) => {
  const n = Et(wa, e.__scopeSelect), r = Ns(wa, e.__scopeSelect), [o, a] = d.useState(!1), s = Z(t, r.onScrollButtonChange);
  return ye(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const f = c.scrollHeight - c.clientHeight, u = Math.ceil(c.scrollTop) < f;
        a(u);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ l(
    bf,
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
vf.displayName = wa;
var bf = d.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = Et("SelectScrollButton", n), s = d.useRef(null), i = go(n), c = d.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return d.useEffect(() => () => c(), [c]), ye(() => {
    i().find((u) => u.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ l(
    $.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: I(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: I(o.onPointerMove, () => {
        a.onItemLeave?.(), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: I(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), IC = "SelectSeparator", yf = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ l($.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
yf.displayName = IC;
var xa = "SelectArrow", zC = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = vo(n), a = Rt(xa, n), s = Et(xa, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ l(Gn, { ...o, ...r, ref: t }) : null;
  }
);
zC.displayName = xa;
var LC = "SelectBubbleInput", wf = d.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = d.useRef(null), a = Z(r, o), s = Wn(t);
    return d.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLSelectElement.prototype, u = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && u) {
        const p = new Event("change", { bubbles: !0 });
        u.call(i, t), i.dispatchEvent(p);
      }
    }, [s, t]), /* @__PURE__ */ l(
      $.select,
      {
        ...n,
        style: { ...wl, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
wf.displayName = LC;
function xf(e) {
  return e === "" || e === void 0;
}
function Cf(e) {
  const t = Ce(e), n = d.useRef(""), r = d.useRef(0), o = d.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), (function c(f) {
        n.current = f, window.clearTimeout(r.current), f !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      })(i);
    },
    [t]
  ), a = d.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return d.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function Sf(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((f) => f === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = $C(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((f) => f !== n));
  const c = s.find(
    (f) => f.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function $C(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var FC = Ku, WC = Xu, BC = Qu, VC = Ju, HC = ef, GC = tf, YC = af, UC = lf, jC = df, KC = ff, qC = pf, XC = hf, ZC = gf, QC = vf, JC = yf, eS = "Separator", Ci = "horizontal", tS = ["horizontal", "vertical"], kf = d.forwardRef((e, t) => {
  const { decorative: n, orientation: r = Ci, ...o } = e, a = nS(r) ? r : Ci, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ l(
    $.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
kf.displayName = eS;
function nS(e) {
  return tS.includes(e);
}
var Nf = kf, Rf = ["PageUp", "PageDown"], Ef = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Pf = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, pn = "Slider", [Ca, rS, oS] = Ln(pn), [Mf, AP] = he(pn, [
  oS
]), [aS, bo] = Mf(pn), _f = d.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: c = 0,
      defaultValue: f = [r],
      value: u,
      onValueChange: p = () => {
      },
      onValueCommit: m = () => {
      },
      inverted: h = !1,
      form: v,
      ...g
    } = e, b = d.useRef(/* @__PURE__ */ new Set()), y = d.useRef(0), x = s === "horizontal" ? sS : iS, [R = [], S] = we({
      prop: u,
      defaultProp: f,
      onChange: (T) => {
        [...b.current][y.current]?.focus(), p(T);
      }
    }), E = d.useRef(R);
    function k(T) {
      const F = fS(R, T);
      z(T, F);
    }
    function N(T) {
      z(T, y.current);
    }
    function D() {
      const T = E.current[y.current];
      R[y.current] !== T && m(R);
    }
    function z(T, F, { commit: B } = { commit: !1 }) {
      const V = gS(a), X = vS(Math.round((T - r) / a) * a + r, V), H = Dn(X, [r, o]);
      S((K = []) => {
        const P = dS(K, H, F);
        if (hS(P, c * a)) {
          y.current = P.indexOf(H);
          const L = String(P) !== String(K);
          return L && B && m(P), L ? P : K;
        } else
          return K;
      });
    }
    return /* @__PURE__ */ l(
      aS,
      {
        scope: e.__scopeSlider,
        name: n,
        disabled: i,
        min: r,
        max: o,
        valueIndexToChangeRef: y,
        thumbs: b.current,
        values: R,
        orientation: s,
        form: v,
        children: /* @__PURE__ */ l(Ca.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(Ca.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(
          x,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: I(g.onPointerDown, () => {
              i || (E.current = R);
            }),
            min: r,
            max: o,
            inverted: h,
            onSlideStart: i ? void 0 : k,
            onSlideMove: i ? void 0 : N,
            onSlideEnd: i ? void 0 : D,
            onHomeKeyDown: () => !i && z(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && z(o, R.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: T, direction: F }) => {
              if (!i) {
                const X = Rf.includes(T.key) || T.shiftKey && Ef.includes(T.key) ? 10 : 1, H = y.current, K = R[H], P = a * X * F;
                z(K + P, H, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
_f.displayName = pn;
var [Df, Tf] = Mf(pn, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), sS = d.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: c,
      onStepKeyDown: f,
      ...u
    } = e, [p, m] = d.useState(null), h = Z(t, (x) => m(x)), v = d.useRef(void 0), g = ut(o), b = g === "ltr", y = b && !a || !b && a;
    function w(x) {
      const R = v.current || p.getBoundingClientRect(), S = [0, R.width], k = Rs(S, y ? [n, r] : [r, n]);
      return v.current = R, k(x - R.left);
    }
    return /* @__PURE__ */ l(
      Df,
      {
        scope: e.__scopeSlider,
        startEdge: y ? "left" : "right",
        endEdge: y ? "right" : "left",
        direction: y ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ l(
          Af,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...u,
            ref: h,
            style: {
              ...u.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (x) => {
              const R = w(x.clientX);
              s?.(R);
            },
            onSlideMove: (x) => {
              const R = w(x.clientX);
              i?.(R);
            },
            onSlideEnd: () => {
              v.current = void 0, c?.();
            },
            onStepKeyDown: (x) => {
              const S = Pf[y ? "from-left" : "from-right"].includes(x.key);
              f?.({ event: x, direction: S ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), iS = d.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: c,
      ...f
    } = e, u = d.useRef(null), p = Z(t, u), m = d.useRef(void 0), h = !o;
    function v(g) {
      const b = m.current || u.current.getBoundingClientRect(), y = [0, b.height], x = Rs(y, h ? [r, n] : [n, r]);
      return m.current = b, x(g - b.top);
    }
    return /* @__PURE__ */ l(
      Df,
      {
        scope: e.__scopeSlider,
        startEdge: h ? "bottom" : "top",
        endEdge: h ? "top" : "bottom",
        size: "height",
        direction: h ? 1 : -1,
        children: /* @__PURE__ */ l(
          Af,
          {
            "data-orientation": "vertical",
            ...f,
            ref: p,
            style: {
              ...f.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (g) => {
              const b = v(g.clientY);
              a?.(b);
            },
            onSlideMove: (g) => {
              const b = v(g.clientY);
              s?.(b);
            },
            onSlideEnd: () => {
              m.current = void 0, i?.();
            },
            onStepKeyDown: (g) => {
              const y = Pf[h ? "from-bottom" : "from-top"].includes(g.key);
              c?.({ event: g, direction: y ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Af = d.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: c,
      ...f
    } = e, u = bo(pn, n);
    return /* @__PURE__ */ l(
      $.span,
      {
        ...f,
        ref: t,
        onKeyDown: I(e.onKeyDown, (p) => {
          p.key === "Home" ? (s(p), p.preventDefault()) : p.key === "End" ? (i(p), p.preventDefault()) : Rf.concat(Ef).includes(p.key) && (c(p), p.preventDefault());
        }),
        onPointerDown: I(e.onPointerDown, (p) => {
          const m = p.target;
          m.setPointerCapture(p.pointerId), p.preventDefault(), u.thumbs.has(m) ? m.focus() : r(p);
        }),
        onPointerMove: I(e.onPointerMove, (p) => {
          p.target.hasPointerCapture(p.pointerId) && o(p);
        }),
        onPointerUp: I(e.onPointerUp, (p) => {
          const m = p.target;
          m.hasPointerCapture(p.pointerId) && (m.releasePointerCapture(p.pointerId), a(p));
        })
      }
    );
  }
), Of = "SliderTrack", If = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = bo(Of, n);
    return /* @__PURE__ */ l(
      $.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...r,
        ref: t
      }
    );
  }
);
If.displayName = Of;
var Sa = "SliderRange", zf = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = bo(Sa, n), a = Tf(Sa, n), s = d.useRef(null), i = Z(t, s), c = o.values.length, f = o.values.map(
      (m) => Ff(m, o.min, o.max)
    ), u = c > 1 ? Math.min(...f) : 0, p = 100 - Math.max(...f);
    return /* @__PURE__ */ l(
      $.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: i,
        style: {
          ...e.style,
          [a.startEdge]: u + "%",
          [a.endEdge]: p + "%"
        }
      }
    );
  }
);
zf.displayName = Sa;
var ka = "SliderThumb", Lf = d.forwardRef(
  (e, t) => {
    const n = rS(e.__scopeSlider), [r, o] = d.useState(null), a = Z(t, (i) => o(i)), s = d.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ l(lS, { ...e, ref: a, index: s });
  }
), lS = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = bo(ka, n), i = Tf(ka, n), [c, f] = d.useState(null), u = Z(t, (w) => f(w)), p = c ? s.form || !!c.closest("form") : !0, m = Bn(c), h = s.values[r], v = h === void 0 ? 0 : Ff(h, s.min, s.max), g = uS(r, s.values.length), b = m?.[i.size], y = b ? pS(b, v, i.direction) : 0;
    return d.useEffect(() => {
      if (c)
        return s.thumbs.add(c), () => {
          s.thumbs.delete(c);
        };
    }, [c, s.thumbs]), /* @__PURE__ */ M(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${v}% + ${y}px)`
        },
        children: [
          /* @__PURE__ */ l(Ca.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(
            $.span,
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
              ref: u,
              style: h === void 0 ? { display: "none" } : e.style,
              onFocus: I(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          p && /* @__PURE__ */ l(
            $f,
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
Lf.displayName = ka;
var cS = "RadioBubbleInput", $f = d.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = d.useRef(null), a = Z(o, r), s = Wn(t);
    return d.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLInputElement.prototype, u = Object.getOwnPropertyDescriptor(c, "value").set;
      if (s !== t && u) {
        const p = new Event("input", { bubbles: !0 });
        u.call(i, t), i.dispatchEvent(p);
      }
    }, [s, t]), /* @__PURE__ */ l(
      $.input,
      {
        style: { display: "none" },
        ...n,
        ref: a,
        defaultValue: t
      }
    );
  }
);
$f.displayName = cS;
function dS(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function Ff(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return Dn(a, [0, 100]);
}
function uS(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function fS(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function pS(e, t, n) {
  const r = e / 2, a = Rs([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function mS(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function hS(e, t) {
  if (t > 0) {
    const n = mS(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function Rs(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function gS(e) {
  return (String(e).split(".")[1] || "").length;
}
function vS(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var bS = _f, yS = If, wS = zf, xS = Lf, yo = "Switch", [CS, OP] = he(yo), [SS, kS] = CS(yo), Wf = d.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c = "on",
      onCheckedChange: f,
      form: u,
      ...p
    } = e, [m, h] = d.useState(null), v = Z(t, (x) => h(x)), g = d.useRef(!1), b = m ? u || !!m.closest("form") : !0, [y, w] = we({
      prop: o,
      defaultProp: a ?? !1,
      onChange: f,
      caller: yo
    });
    return /* @__PURE__ */ M(SS, { scope: n, checked: y, disabled: i, children: [
      /* @__PURE__ */ l(
        $.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": s,
          "data-state": Gf(y),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...p,
          ref: v,
          onClick: I(e.onClick, (x) => {
            w((R) => !R), b && (g.current = x.isPropagationStopped(), g.current || x.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ l(
        Hf,
        {
          control: m,
          bubbles: !g.current,
          name: r,
          value: c,
          checked: y,
          required: s,
          disabled: i,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Wf.displayName = yo;
var Bf = "SwitchThumb", Vf = d.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = kS(Bf, n);
    return /* @__PURE__ */ l(
      $.span,
      {
        "data-state": Gf(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Vf.displayName = Bf;
var NS = "SwitchBubbleInput", Hf = d.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = d.useRef(null), i = Z(s, a), c = Wn(n), f = Bn(t);
    return d.useEffect(() => {
      const u = s.current;
      if (!u) return;
      const p = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        p,
        "checked"
      ).set;
      if (c !== n && h) {
        const v = new Event("click", { bubbles: r });
        h.call(u, n), u.dispatchEvent(v);
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
          ...f,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Hf.displayName = NS;
function Gf(e) {
  return e ? "checked" : "unchecked";
}
var RS = Wf, ES = Vf, wo = "Tabs", [PS, IP] = he(wo, [
  St
]), Yf = St(), [MS, Es] = PS(wo), Uf = d.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: s = "horizontal",
      dir: i,
      activationMode: c = "automatic",
      ...f
    } = e, u = ut(i), [p, m] = we({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: wo
    });
    return /* @__PURE__ */ l(
      MS,
      {
        scope: n,
        baseId: ge(),
        value: p,
        onValueChange: m,
        orientation: s,
        dir: u,
        activationMode: c,
        children: /* @__PURE__ */ l(
          $.div,
          {
            dir: u,
            "data-orientation": s,
            ...f,
            ref: t
          }
        )
      }
    );
  }
);
Uf.displayName = wo;
var jf = "TabsList", Kf = d.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = Es(jf, n), s = Yf(n);
    return /* @__PURE__ */ l(
      ro,
      {
        asChild: !0,
        ...s,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ l(
          $.div,
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
Kf.displayName = jf;
var qf = "TabsTrigger", Xf = d.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, s = Es(qf, n), i = Yf(n), c = Jf(s.baseId, r), f = ep(s.baseId, r), u = r === s.value;
    return /* @__PURE__ */ l(
      oo,
      {
        asChild: !0,
        ...i,
        focusable: !o,
        active: u,
        children: /* @__PURE__ */ l(
          $.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": u,
            "aria-controls": f,
            "data-state": u ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: c,
            ...a,
            ref: t,
            onMouseDown: I(e.onMouseDown, (p) => {
              !o && p.button === 0 && p.ctrlKey === !1 ? s.onValueChange(r) : p.preventDefault();
            }),
            onKeyDown: I(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && s.onValueChange(r);
            }),
            onFocus: I(e.onFocus, () => {
              const p = s.activationMode !== "manual";
              !u && !o && p && s.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
Xf.displayName = qf;
var Zf = "TabsContent", Qf = d.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...s } = e, i = Es(Zf, n), c = Jf(i.baseId, r), f = ep(i.baseId, r), u = r === i.value, p = d.useRef(u);
    return d.useEffect(() => {
      const m = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(m);
    }, []), /* @__PURE__ */ l(ve, { present: o || u, children: ({ present: m }) => /* @__PURE__ */ l(
      $.div,
      {
        "data-state": u ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !m,
        id: f,
        tabIndex: 0,
        ...s,
        ref: t,
        style: {
          ...e.style,
          animationDuration: p.current ? "0s" : void 0
        },
        children: m && a
      }
    ) });
  }
);
Qf.displayName = Zf;
function Jf(e, t) {
  return `${e}-trigger-${t}`;
}
function ep(e, t) {
  return `${e}-content-${t}`;
}
var _S = Uf, DS = Kf, TS = Xf, AS = Qf, tp = "Toggle", Ps = d.forwardRef((e, t) => {
  const { pressed: n, defaultPressed: r, onPressedChange: o, ...a } = e, [s, i] = we({
    prop: n,
    onChange: o,
    defaultProp: r ?? !1,
    caller: tp
  });
  return /* @__PURE__ */ l(
    $.button,
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
Ps.displayName = tp;
var OS = Ps, Pt = "ToggleGroup", [np, zP] = he(Pt, [
  St
]), rp = St(), Ms = O.forwardRef((e, t) => {
  const { type: n, ...r } = e;
  if (n === "single")
    return /* @__PURE__ */ l(IS, { ...r, ref: t });
  if (n === "multiple")
    return /* @__PURE__ */ l(zS, { ...r, ref: t });
  throw new Error(`Missing prop \`type\` expected on \`${Pt}\``);
});
Ms.displayName = Pt;
var [op, ap] = np(Pt), IS = O.forwardRef((e, t) => {
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
    caller: Pt
  });
  return /* @__PURE__ */ l(
    op,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: O.useMemo(() => s ? [s] : [], [s]),
      onItemActivate: i,
      onItemDeactivate: O.useCallback(() => i(""), [i]),
      children: /* @__PURE__ */ l(sp, { ...a, ref: t })
    }
  );
}), zS = O.forwardRef((e, t) => {
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
    caller: Pt
  }), c = O.useCallback(
    (u) => i((p = []) => [...p, u]),
    [i]
  ), f = O.useCallback(
    (u) => i((p = []) => p.filter((m) => m !== u)),
    [i]
  );
  return /* @__PURE__ */ l(
    op,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: s,
      onItemActivate: c,
      onItemDeactivate: f,
      children: /* @__PURE__ */ l(sp, { ...a, ref: t })
    }
  );
});
Ms.displayName = Pt;
var [LS, $S] = np(Pt), sp = O.forwardRef(
  (e, t) => {
    const {
      __scopeToggleGroup: n,
      disabled: r = !1,
      rovingFocus: o = !0,
      orientation: a,
      dir: s,
      loop: i = !0,
      ...c
    } = e, f = rp(n), u = ut(s), p = { role: "group", dir: u, ...c };
    return /* @__PURE__ */ l(LS, { scope: n, rovingFocus: o, disabled: r, children: o ? /* @__PURE__ */ l(
      ro,
      {
        asChild: !0,
        ...f,
        orientation: a,
        dir: u,
        loop: i,
        children: /* @__PURE__ */ l($.div, { ...p, ref: t })
      }
    ) : /* @__PURE__ */ l($.div, { ...p, ref: t }) });
  }
), Or = "ToggleGroupItem", ip = O.forwardRef(
  (e, t) => {
    const n = ap(Or, e.__scopeToggleGroup), r = $S(Or, e.__scopeToggleGroup), o = rp(e.__scopeToggleGroup), a = n.value.includes(e.value), s = r.disabled || e.disabled, i = { ...e, pressed: a, disabled: s }, c = O.useRef(null);
    return r.rovingFocus ? /* @__PURE__ */ l(
      oo,
      {
        asChild: !0,
        ...o,
        focusable: !s,
        active: a,
        ref: c,
        children: /* @__PURE__ */ l(Si, { ...i, ref: t })
      }
    ) : /* @__PURE__ */ l(Si, { ...i, ref: t });
  }
);
ip.displayName = Or;
var Si = O.forwardRef(
  (e, t) => {
    const { __scopeToggleGroup: n, value: r, ...o } = e, a = ap(Or, n), s = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, i = a.type === "single" ? s : void 0;
    return /* @__PURE__ */ l(
      Ps,
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
), FS = Ms, WS = ip, [xo, LP] = he("Tooltip", [
  et
]), Co = et(), lp = "TooltipProvider", BS = 700, Na = "tooltip.open", [VS, _s] = xo(lp), cp = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = BS,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = d.useRef(!0), i = d.useRef(!1), c = d.useRef(0);
  return d.useEffect(() => {
    const f = c.current;
    return () => window.clearTimeout(f);
  }, []), /* @__PURE__ */ l(
    VS,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: d.useCallback(() => {
        window.clearTimeout(c.current), s.current = !1;
      }, []),
      onClose: d.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => s.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: d.useCallback((f) => {
        i.current = f;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
cp.displayName = lp;
var Tn = "Tooltip", [HS, Xn] = xo(Tn), dp = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, c = _s(Tn, e.__scopeTooltip), f = Co(t), [u, p] = d.useState(null), m = ge(), h = d.useRef(0), v = s ?? c.disableHoverableContent, g = i ?? c.delayDuration, b = d.useRef(!1), [y, w] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (k) => {
      k ? (c.onOpen(), document.dispatchEvent(new CustomEvent(Na))) : c.onClose(), a?.(k);
    },
    caller: Tn
  }), x = d.useMemo(() => y ? b.current ? "delayed-open" : "instant-open" : "closed", [y]), R = d.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, b.current = !1, w(!0);
  }, [w]), S = d.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, w(!1);
  }, [w]), E = d.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      b.current = !0, w(!0), h.current = 0;
    }, g);
  }, [g, w]);
  return d.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ l(dn, { ...f, children: /* @__PURE__ */ l(
    HS,
    {
      scope: t,
      contentId: m,
      open: y,
      stateAttribute: x,
      trigger: u,
      onTriggerChange: p,
      onTriggerEnter: d.useCallback(() => {
        c.isOpenDelayedRef.current ? E() : R();
      }, [c.isOpenDelayedRef, E, R]),
      onTriggerLeave: d.useCallback(() => {
        v ? S() : (window.clearTimeout(h.current), h.current = 0);
      }, [S, v]),
      onOpen: R,
      onClose: S,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
dp.displayName = Tn;
var Ra = "TooltipTrigger", up = d.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Xn(Ra, n), a = _s(Ra, n), s = Co(n), i = d.useRef(null), c = Z(t, i, o.onTriggerChange), f = d.useRef(!1), u = d.useRef(!1), p = d.useCallback(() => f.current = !1, []);
    return d.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ l(un, { asChild: !0, ...s, children: /* @__PURE__ */ l(
      $.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: I(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !u.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: I(e.onPointerLeave, () => {
          o.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: I(e.onPointerDown, () => {
          o.open && o.onClose(), f.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: I(e.onFocus, () => {
          f.current || o.onOpen();
        }),
        onBlur: I(e.onBlur, o.onClose),
        onClick: I(e.onClick, o.onClose)
      }
    ) });
  }
);
up.displayName = Ra;
var Ds = "TooltipPortal", [GS, YS] = xo(Ds, {
  forceMount: void 0
}), fp = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = Xn(Ds, t);
  return /* @__PURE__ */ l(GS, { scope: t, forceMount: n, children: /* @__PURE__ */ l(ve, { present: n || a.open, children: /* @__PURE__ */ l(Ft, { asChild: !0, container: o, children: r }) }) });
};
fp.displayName = Ds;
var rn = "TooltipContent", pp = d.forwardRef(
  (e, t) => {
    const n = YS(rn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = Xn(rn, e.__scopeTooltip);
    return /* @__PURE__ */ l(ve, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ l(mp, { side: o, ...a, ref: t }) : /* @__PURE__ */ l(US, { side: o, ...a, ref: t }) });
  }
), US = d.forwardRef((e, t) => {
  const n = Xn(rn, e.__scopeTooltip), r = _s(rn, e.__scopeTooltip), o = d.useRef(null), a = Z(t, o), [s, i] = d.useState(null), { trigger: c, onClose: f } = n, u = o.current, { onPointerInTransitChange: p } = r, m = d.useCallback(() => {
    i(null), p(!1);
  }, [p]), h = d.useCallback(
    (v, g) => {
      const b = v.currentTarget, y = { x: v.clientX, y: v.clientY }, w = XS(y, b.getBoundingClientRect()), x = ZS(y, w), R = QS(g.getBoundingClientRect()), S = e0([...x, ...R]);
      i(S), p(!0);
    },
    [p]
  );
  return d.useEffect(() => () => m(), [m]), d.useEffect(() => {
    if (c && u) {
      const v = (b) => h(b, u), g = (b) => h(b, c);
      return c.addEventListener("pointerleave", v), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", v), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, h, m]), d.useEffect(() => {
    if (s) {
      const v = (g) => {
        const b = g.target, y = { x: g.clientX, y: g.clientY }, w = c?.contains(b) || u?.contains(b), x = !JS(y, s);
        w ? m() : x && (m(), f());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [c, u, s, f, m]), /* @__PURE__ */ l(mp, { ...e, ref: a });
}), [jS, KS] = xo(Tn, { isInside: !1 }), qS = /* @__PURE__ */ bl("TooltipContent"), mp = d.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, c = Xn(rn, n), f = Co(n), { onClose: u } = c;
    return d.useEffect(() => (document.addEventListener(Na, u), () => document.removeEventListener(Na, u)), [u]), d.useEffect(() => {
      if (c.trigger) {
        const p = (m) => {
          m.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ l(
      $t,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ M(
          Hn,
          {
            "data-state": c.stateAttribute,
            ...f,
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
              /* @__PURE__ */ l(qS, { children: r }),
              /* @__PURE__ */ l(jS, { scope: n, isInside: !0, children: /* @__PURE__ */ l(Jh, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
pp.displayName = rn;
var hp = "TooltipArrow", gp = d.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Co(n);
    return KS(
      hp,
      n
    ).isInside ? null : /* @__PURE__ */ l(Gn, { ...o, ...r, ref: t });
  }
);
gp.displayName = hp;
function XS(e, t) {
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
function ZS(e, t, n = 5) {
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
function QS(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function JS(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], f = i.x, u = i.y, p = c.x, m = c.y;
    u > r != m > r && n < (p - f) * (r - u) / (m - u) + f && (o = !o);
  }
  return o;
}
function e0(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), t0(t);
}
function t0(e) {
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
var n0 = cp, r0 = dp, o0 = up, a0 = fp, s0 = pp, i0 = gp;
function $P({
  ...e
}) {
  return /* @__PURE__ */ l(Ng, { "data-slot": "accordion", ...e });
}
function FP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Rg,
    {
      "data-slot": "accordion-item",
      className: C("border-b last:border-b-0", e),
      ...t
    }
  );
}
function WP({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ l(Eg, { className: "flex", children: /* @__PURE__ */ M(
    Pg,
    {
      "data-slot": "accordion-trigger",
      className: C(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(Wr, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function BP({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    Mg,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...n,
      children: /* @__PURE__ */ l("div", { className: C("pt-0 pb-4", e), children: t })
    }
  );
}
const ki = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ni = el, ke = (e, t) => (n) => {
  var r;
  if (t?.variants == null) return Ni(e, n?.class, n?.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((f) => {
    const u = n?.[f], p = a?.[f];
    if (u === null) return null;
    const m = ki(u) || ki(p);
    return o[f][m];
  }), i = n && Object.entries(n).reduce((f, u) => {
    let [p, m] = u;
    return m === void 0 || (f[p] = m), f;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((f, u) => {
    let { class: p, className: m, ...h } = u;
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
      ...f,
      p,
      m
    ] : f;
  }, []);
  return Ni(e, s, c, n?.class, n?.className);
}, l0 = ke(
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
function VP({
  className: e,
  variant: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: C(l0({ variant: t }), e),
      ...n
    }
  );
}
function HP({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-title",
      className: C(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        e
      ),
      ...t
    }
  );
}
function GP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-description",
      className: C(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        e
      ),
      ...t
    }
  );
}
const Ir = ke(
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
function Zn({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ l(
    r ? zn : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      className: C(Ir({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
function YP({
  ...e
}) {
  return /* @__PURE__ */ l(Xv, { "data-slot": "alert-dialog", ...e });
}
function UP({
  ...e
}) {
  return /* @__PURE__ */ l(Zv, { "data-slot": "alert-dialog-trigger", ...e });
}
function c0({
  ...e
}) {
  return /* @__PURE__ */ l(Qv, { "data-slot": "alert-dialog-portal", ...e });
}
function d0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Jv,
    {
      "data-slot": "alert-dialog-overlay",
      className: C(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function jP({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ M(c0, { children: [
    /* @__PURE__ */ l(d0, {}),
    /* @__PURE__ */ l(
      eb,
      {
        "data-slot": "alert-dialog-content",
        "data-size": t,
        className: C(
          "group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
          e
        ),
        ...n
      }
    )
  ] });
}
function KP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: C(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        e
      ),
      ...t
    }
  );
}
function qP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: C(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        e
      ),
      ...t
    }
  );
}
function XP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    rb,
    {
      "data-slot": "alert-dialog-title",
      className: C(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        e
      ),
      ...t
    }
  );
}
function ZP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ob,
    {
      "data-slot": "alert-dialog-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function QP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: C(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        e
      ),
      ...t
    }
  );
}
function JP({
  className: e,
  variant: t = "default",
  size: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(Zn, { variant: t, size: n, asChild: !0, children: /* @__PURE__ */ l(
    tb,
    {
      "data-slot": "alert-dialog-action",
      className: C(e),
      ...r
    }
  ) });
}
function eM({
  className: e,
  variant: t = "outline",
  size: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(Zn, { variant: t, size: n, asChild: !0, children: /* @__PURE__ */ l(
    nb,
    {
      "data-slot": "alert-dialog-cancel",
      className: C(e),
      ...r
    }
  ) });
}
function tM({
  ...e
}) {
  return /* @__PURE__ */ l(sb, { "data-slot": "aspect-ratio", ...e });
}
function nM({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    gb,
    {
      "data-slot": "avatar",
      "data-size": t,
      className: C(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        e
      ),
      ...n
    }
  );
}
function rM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    vb,
    {
      "data-slot": "avatar-image",
      className: C("aspect-square size-full", e),
      ...t
    }
  );
}
function oM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    bb,
    {
      "data-slot": "avatar-fallback",
      className: C(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        e
      ),
      ...t
    }
  );
}
const u0 = ke(
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
function jo({
  className: e,
  variant: t = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ l(
    n ? zn : "span",
    {
      "data-slot": "badge",
      "data-variant": t,
      className: C(u0({ variant: t }), e),
      ...r
    }
  );
}
function aM({ ...e }) {
  return /* @__PURE__ */ l("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...e });
}
function sM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: C(
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
        e
      ),
      ...t
    }
  );
}
function iM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: C("inline-flex items-center gap-1.5", e),
      ...t
    }
  );
}
function lM({
  asChild: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    e ? zn : "a",
    {
      "data-slot": "breadcrumb-link",
      className: C("transition-colors hover:text-foreground", t),
      ...n
    }
  );
}
function cM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: C("font-normal text-foreground", e),
      ...t
    }
  );
}
function dM({
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
      className: C("[&>svg]:size-3.5", t),
      ...n,
      children: e ?? /* @__PURE__ */ l(In, {})
    }
  );
}
function uM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ M(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: C("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ l(hl, { className: "size-4" }),
        /* @__PURE__ */ l("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
function f0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    Wh,
    {
      role: "status",
      "aria-label": "Loading",
      className: C("size-4 animate-spin", e),
      ...t
    }
  );
}
const p0 = ke(
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
function Ae({
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
    r ? zn : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": n,
      disabled: o || a,
      className: C(p0({ variant: t, size: n, className: e })),
      ...i,
      children: o ? /* @__PURE__ */ M(Pe, { children: [
        /* @__PURE__ */ l(f0, { className: "opacity-100" }),
        /* @__PURE__ */ l("span", { className: "opacity-64", children: s })
      ] }) : s
    }
  );
}
function vp({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Nf,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: C(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
const m0 = ke(
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
function fM({
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
      className: C(m0({ orientation: t }), e),
      ...n
    }
  );
}
function pM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card",
      className: C(
        "relative flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        e
      ),
      ...t
    }
  );
}
function mM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-header",
      className: C(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
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
      "data-slot": "card-title",
      className: C("leading-none font-semibold", e),
      ...t
    }
  );
}
function gM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function vM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-action",
      className: C(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        e
      ),
      ...t
    }
  );
}
function bM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-content",
      className: C("px-6", e),
      ...t
    }
  );
}
function yM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-footer",
      className: C("flex items-center px-6 [.border-t]:pt-6", e),
      ...t
    }
  );
}
function wM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Ac,
    {
      "data-slot": "checkbox",
      className: C(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        Ic,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ l(at, { className: "size-3.5" })
        }
      )
    }
  );
}
function xM({
  ...e
}) {
  return /* @__PURE__ */ l(Nl, { "data-slot": "collapsible", ...e });
}
function CM({
  ...e
}) {
  return /* @__PURE__ */ l(
    Wa,
    {
      "data-slot": "collapsible-trigger",
      ...e
    }
  );
}
function SM({
  ...e
}) {
  return /* @__PURE__ */ l(
    Va,
    {
      "data-slot": "collapsible-content",
      ...e
    }
  );
}
function kM({
  ...e
}) {
  return /* @__PURE__ */ l(Kr, { "data-slot": "dialog", ...e });
}
function NM({
  ...e
}) {
  return /* @__PURE__ */ l(Xa, { "data-slot": "dialog-trigger", ...e });
}
function h0({
  ...e
}) {
  return /* @__PURE__ */ l(qr, { "data-slot": "dialog-portal", ...e });
}
function RM({
  ...e
}) {
  return /* @__PURE__ */ l(Wt, { "data-slot": "dialog-close", ...e });
}
function g0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Xr,
    {
      "data-slot": "dialog-overlay",
      className: C(
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
  return /* @__PURE__ */ M(h0, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ l(g0, {}),
    /* @__PURE__ */ M(
      Zr,
      {
        "data-slot": "dialog-content",
        className: C(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          e
        ),
        ...r,
        children: [
          t,
          n && /* @__PURE__ */ M(
            Wt,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ l($a, {}),
                /* @__PURE__ */ l("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function PM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "dialog-header",
      className: C("flex flex-col gap-2 text-center sm:text-left", e),
      ...t
    }
  );
}
function MM({
  className: e,
  showCloseButton: t = !1,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ M(
    "div",
    {
      "data-slot": "dialog-footer",
      className: C(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        e
      ),
      ...r,
      children: [
        n,
        t && /* @__PURE__ */ l(Wt, { asChild: !0, children: /* @__PURE__ */ l(Zn, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function _M({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Za,
    {
      "data-slot": "dialog-title",
      className: C("text-lg leading-none font-semibold", e),
      ...t
    }
  );
}
function DM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Qa,
    {
      "data-slot": "dialog-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function v0({
  ...e
}) {
  return /* @__PURE__ */ l(nx, { "data-slot": "dropdown-menu", ...e });
}
function TM({
  ...e
}) {
  return /* @__PURE__ */ l(Jd, { "data-slot": "dropdown-menu-portal", ...e });
}
function b0({
  ...e
}) {
  return /* @__PURE__ */ l(
    rx,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function y0({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ l(Jd, { children: /* @__PURE__ */ l(
    ox,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: C(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function w0({
  ...e
}) {
  return /* @__PURE__ */ l(ax, { "data-slot": "dropdown-menu-group", ...e });
}
function jt({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(
    ix,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        e
      ),
      ...r
    }
  );
}
function x0({
  className: e,
  children: t,
  checked: n,
  ...r
}) {
  return /* @__PURE__ */ M(
    lx,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ l("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ l(eu, { children: /* @__PURE__ */ l(at, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function AM({
  ...e
}) {
  return /* @__PURE__ */ l(
    cx,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...e
    }
  );
}
function OM({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ M(
    dx,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ l(eu, { children: /* @__PURE__ */ l(ml, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function C0({
  className: e,
  inset: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    sx,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: C(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...n
    }
  );
}
function fr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ux,
    {
      "data-slot": "dropdown-menu-separator",
      className: C("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function IM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: C(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function S0({
  ...e
}) {
  return /* @__PURE__ */ l(fx, { "data-slot": "dropdown-menu-sub", ...e });
}
function k0({
  className: e,
  inset: t,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ M(
    px,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: C(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ l(In, { className: "ml-auto size-4" })
      ]
    }
  );
}
function N0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    mx,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: C(
        "z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...t
    }
  );
}
function zM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty",
      className: C(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
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
      "data-slot": "empty-header",
      className: C(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        e
      ),
      ...t
    }
  );
}
const R0 = ke(
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
function $M({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": t,
      className: C(R0({ variant: t, className: e })),
      ...n
    }
  );
}
function FM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-title",
      className: C("text-lg font-medium tracking-tight", e),
      ...t
    }
  );
}
function WM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-description",
      className: C(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function BM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-content",
      className: C(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        e
      ),
      ...t
    }
  );
}
function E0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    nu,
    {
      "data-slot": "label",
      className: C(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function VM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "fieldset",
    {
      "data-slot": "field-set",
      className: C(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        e
      ),
      ...t
    }
  );
}
function HM({
  className: e,
  variant: t = "legend",
  ...n
}) {
  return /* @__PURE__ */ l(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": t,
      className: C(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        e
      ),
      ...n
    }
  );
}
function GM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field-group",
      className: C(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        e
      ),
      ...t
    }
  );
}
const P0 = ke(
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
function YM({
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
      className: C(P0({ orientation: t }), e),
      ...n
    }
  );
}
function UM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field-content",
      className: C(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        e
      ),
      ...t
    }
  );
}
function jM({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    E0,
    {
      "data-slot": "field-label",
      className: C(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        e
      ),
      ...t
    }
  );
}
function KM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "field-label",
      className: C(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        e
      ),
      ...t
    }
  );
}
function qM({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "p",
    {
      "data-slot": "field-description",
      className: C(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function XM({
  children: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ M(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!e,
      className: C(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ l(vp, { className: "absolute inset-0 top-1/2" }),
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
function ZM({
  className: e,
  children: t,
  errors: n,
  ...r
}) {
  const o = Dt(() => {
    if (t)
      return t;
    if (!n?.length)
      return null;
    const a = [
      ...new Map(n.map((s) => [s?.message, s])).values()
    ];
    return a?.length == 1 ? a[0]?.message : /* @__PURE__ */ l("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: a.map(
      (s, i) => s?.message && /* @__PURE__ */ l("li", { children: s.message }, i)
    ) });
  }, [t, n]);
  return o ? /* @__PURE__ */ l(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: C("text-sm font-normal text-destructive", e),
      ...r,
      children: o
    }
  ) : null;
}
function QM({
  ...e
}) {
  return /* @__PURE__ */ l(Sx, { "data-slot": "hover-card", ...e });
}
function JM({
  ...e
}) {
  return /* @__PURE__ */ l(kx, { "data-slot": "hover-card-trigger", ...e });
}
function e_({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(Nx, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ l(
    Rx,
    {
      "data-slot": "hover-card-content",
      align: t,
      sideOffset: n,
      className: C(
        "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...r
    }
  ) });
}
const M0 = ke(
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
), _0 = ke(
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
function zr({
  className: e,
  type: t,
  size: n = "default",
  ...r
}) {
  return /* @__PURE__ */ l(
    "span",
    {
      "data-slot": "input-wrapper",
      className: C(M0({ size: n }), e),
      children: /* @__PURE__ */ l(
        "input",
        {
          type: t,
          "data-slot": "input",
          className: C(_0({ size: n })),
          ...r
        }
      )
    }
  );
}
function D0({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ l(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: C(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...n
    }
  );
}
function T0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "textarea",
    {
      "data-slot": "textarea",
      className: C(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t
    }
  );
}
function t_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: C(
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
const A0 = ke(
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
function n_({
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
      className: C(A0({ align: t }), e),
      onClick: (r) => {
        r.target.closest("button") || r.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...n
    }
  );
}
const O0 = ke(
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
function r_({
  className: e,
  type: t = "button",
  variant: n = "ghost",
  size: r = "xs",
  ...o
}) {
  return /* @__PURE__ */ l(
    Zn,
    {
      type: t,
      "data-size": r,
      variant: n,
      className: C(O0({ size: r }), e),
      ...o
    }
  );
}
function o_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "span",
    {
      className: C(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...t
    }
  );
}
function a_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    D0,
    {
      "data-slot": "input-group-control",
      className: C(
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
    T0,
    {
      "data-slot": "input-group-control",
      className: C(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        e
      ),
      ...t
    }
  );
}
function i_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: C("group/item-group flex flex-col", e),
      ...t
    }
  );
}
function l_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    vp,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: C("my-0", e),
      ...t
    }
  );
}
const I0 = ke(
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
function c_({
  className: e,
  variant: t = "default",
  size: n = "default",
  asChild: r = !1,
  ...o
}) {
  return /* @__PURE__ */ l(
    r ? zn : "div",
    {
      "data-slot": "item",
      "data-variant": t,
      "data-size": n,
      className: C(I0({ variant: t, size: n, className: e })),
      ...o
    }
  );
}
const z0 = ke(
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
function d_({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": t,
      className: C(z0({ variant: t, className: e })),
      ...n
    }
  );
}
function u_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-content",
      className: C(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        e
      ),
      ...t
    }
  );
}
function f_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-title",
      className: C(
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
      className: C(
        "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
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
      "data-slot": "item-actions",
      className: C("flex items-center gap-2", e),
      ...t
    }
  );
}
function h_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-header",
      className: C(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
function g_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-footer",
      className: C(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
function v_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "kbd",
    {
      "data-slot": "kbd",
      className: C(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        e
      ),
      ...t
    }
  );
}
function Ko({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    nu,
    {
      "data-slot": "label",
      className: C(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function b_({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ M(
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
            className: C(
              "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              e
            ),
            ...n
          }
        ),
        /* @__PURE__ */ l(
          Wr,
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
function y_({ ...e }) {
  return /* @__PURE__ */ l("option", { "data-slot": "native-select-option", ...e });
}
function w_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "optgroup",
    {
      "data-slot": "native-select-optgroup",
      className: C(e),
      ...t
    }
  );
}
function x_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: C("mx-auto flex w-full justify-center", e),
      ...t
    }
  );
}
function C_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "ul",
    {
      "data-slot": "pagination-content",
      className: C("flex flex-row items-center gap-1", e),
      ...t
    }
  );
}
function S_({ ...e }) {
  return /* @__PURE__ */ l("li", { "data-slot": "pagination-item", ...e });
}
function bp({
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
      className: C(
        Ir({
          variant: t ? "outline" : "ghost",
          size: n
        }),
        e
      ),
      ...r
    }
  );
}
function k_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ M(
    bp,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: C("gap-1 px-2.5 sm:pl-2.5", e),
      ...t,
      children: [
        /* @__PURE__ */ l(za, {}),
        /* @__PURE__ */ l("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function N_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ M(
    bp,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: C("gap-1 px-2.5 sm:pr-2.5", e),
      ...t,
      children: [
        /* @__PURE__ */ l("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ l(In, {})
      ]
    }
  );
}
function R_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ M(
    "span",
    {
      "aria-hidden": !0,
      "data-slot": "pagination-ellipsis",
      className: C("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ l(hl, { className: "size-4" }),
        /* @__PURE__ */ l("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
function So({
  ...e
}) {
  return /* @__PURE__ */ l(Lx, { "data-slot": "popover", ...e });
}
function ko({
  ...e
}) {
  return /* @__PURE__ */ l($x, { "data-slot": "popover-trigger", ...e });
}
function No({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ l(Fx, { children: /* @__PURE__ */ l(
    Wx,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: C(
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
    jx,
    {
      "data-slot": "progress",
      className: C(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        e
      ),
      ...n,
      children: /* @__PURE__ */ l(
        Kx,
        {
          "data-slot": "progress-indicator",
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (t || 0)}%)` }
        }
      )
    }
  );
}
function P_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    oC,
    {
      "data-slot": "radio-group",
      className: C("grid gap-3", e),
      ...t
    }
  );
}
function M_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    aC,
    {
      "data-slot": "radio-group-item",
      className: C(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        sC,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ l(ml, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}
function __({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ M(
    Uu,
    {
      "data-slot": "scroll-area",
      className: C("relative", e),
      ...n,
      children: [
        /* @__PURE__ */ l(
          ju,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children: t
          }
        ),
        /* @__PURE__ */ l(L0, {}),
        /* @__PURE__ */ l(bC, {})
      ]
    }
  );
}
function L0({
  className: e,
  orientation: t = "vertical",
  ...n
}) {
  return /* @__PURE__ */ l(
    Mr,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation: t,
      className: C(
        "flex touch-none p-px transition-colors select-none",
        t === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        e
      ),
      ...n,
      children: /* @__PURE__ */ l(
        Dr,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}
function $0({
  ...e
}) {
  return /* @__PURE__ */ l(FC, { "data-slot": "select", ...e });
}
function D_({
  ...e
}) {
  return /* @__PURE__ */ l(UC, { "data-slot": "select-group", ...e });
}
function F0({
  ...e
}) {
  return /* @__PURE__ */ l(BC, { "data-slot": "select-value", ...e });
}
function W0({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ M(
    WC,
    {
      "data-slot": "select-trigger",
      className: C(
        "flex w-fit min-h-9 sm:min-h-8 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-base sm:text-sm whitespace-nowrap shadow-xs/5 ring-ring/24 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/32 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ l(VC, { asChild: !0, children: /* @__PURE__ */ l(fl, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function B0({
  className: e,
  children: t,
  position: n = "item-aligned",
  align: r = "center",
  ...o
}) {
  return /* @__PURE__ */ l(HC, { children: /* @__PURE__ */ M(
    GC,
    {
      "data-slot": "select-content",
      className: C(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border bg-popover text-popover-foreground shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      align: r,
      ...o,
      children: [
        /* @__PURE__ */ l(H0, {}),
        /* @__PURE__ */ l(
          YC,
          {
            className: C(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(G0, {})
      ]
    }
  ) });
}
function T_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    jC,
    {
      "data-slot": "select-label",
      className: C("px-2 py-1.5 text-xs text-muted-foreground", e),
      ...t
    }
  );
}
function V0({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ M(
    KC,
    {
      "data-slot": "select-item",
      className: C(
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
            children: /* @__PURE__ */ l(XC, { children: /* @__PURE__ */ l(at, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ l(qC, { children: t })
      ]
    }
  );
}
function A_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    JC,
    {
      "data-slot": "select-separator",
      className: C("pointer-events-none -mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function H0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ZC,
    {
      "data-slot": "select-scroll-up-button",
      className: C(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(Mh, { className: "size-4" })
    }
  );
}
function G0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    QC,
    {
      "data-slot": "select-scroll-down-button",
      className: C(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(Wr, { className: "size-4" })
    }
  );
}
function Lr({
  className: e,
  orientation: t = "horizontal",
  decorative: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    Nf,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: t,
      className: C(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...r
    }
  );
}
function O_({ ...e }) {
  return /* @__PURE__ */ l(Kr, { "data-slot": "sheet", ...e });
}
function I_({
  ...e
}) {
  return /* @__PURE__ */ l(Xa, { "data-slot": "sheet-trigger", ...e });
}
function z_({
  ...e
}) {
  return /* @__PURE__ */ l(Wt, { "data-slot": "sheet-close", ...e });
}
function Y0({
  ...e
}) {
  return /* @__PURE__ */ l(qr, { "data-slot": "sheet-portal", ...e });
}
function U0({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Xr,
    {
      "data-slot": "sheet-overlay",
      className: C(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function L_({
  className: e,
  children: t,
  side: n = "right",
  showCloseButton: r = !0,
  ...o
}) {
  return /* @__PURE__ */ M(Y0, { children: [
    /* @__PURE__ */ l(U0, {}),
    /* @__PURE__ */ M(
      Zr,
      {
        "data-slot": "sheet-content",
        className: C(
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
          r && /* @__PURE__ */ M(Wt, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ l($a, { className: "size-4" }),
            /* @__PURE__ */ l("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function $_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "sheet-header",
      className: C("flex flex-col gap-1.5 p-4", e),
      ...t
    }
  );
}
function F_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "sheet-footer",
      className: C("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function W_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Za,
    {
      "data-slot": "sheet-title",
      className: C("font-semibold text-foreground", e),
      ...t
    }
  );
}
function B_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Qa,
    {
      "data-slot": "sheet-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function Ie({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "skeleton",
      className: C("animate-pulse rounded-md bg-accent", e),
      ...t
    }
  );
}
function j0({
  className: e,
  defaultValue: t,
  value: n,
  min: r = 0,
  max: o = 100,
  ...a
}) {
  const s = d.useMemo(
    () => Array.isArray(n) ? n : Array.isArray(t) ? t : [r, o],
    [n, t, r, o]
  );
  return /* @__PURE__ */ M(
    bS,
    {
      "data-slot": "slider",
      defaultValue: t,
      value: n,
      min: r,
      max: o,
      className: C(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ l(
          yS,
          {
            "data-slot": "slider-track",
            className: C(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ l(
              wS,
              {
                "data-slot": "slider-range",
                className: C(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: s.length }, (i, c) => /* @__PURE__ */ l(
          xS,
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
function V_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    RS,
    {
      "data-slot": "switch",
      className: C(
        "peer inline-flex shrink-0 items-center [--thumb-size:--spacing(5)] sm:[--thumb-size:--spacing(4)] h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] rounded-full p-px transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-64 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        ES,
        {
          "data-slot": "switch-thumb",
          className: "pointer-events-none block aspect-square h-full rounded-(--thumb-size) bg-background shadow-sm/5 data-[state=checked]:translate-x-[calc(var(--thumb-size)-4px)] data-[state=unchecked]:translate-x-0 [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]"
        }
      )
    }
  );
}
function K0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ l(
        "table",
        {
          "data-slot": "table",
          className: C("w-full caption-bottom text-sm", e),
          ...t
        }
      )
    }
  );
}
function q0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "thead",
    {
      "data-slot": "table-header",
      className: C("[&_tr]:border-b", e),
      ...t
    }
  );
}
function X0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tbody",
    {
      "data-slot": "table-body",
      className: C("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function H_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: C(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        e
      ),
      ...t
    }
  );
}
function Ri({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tr",
    {
      "data-slot": "table-row",
      className: C(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        e
      ),
      ...t
    }
  );
}
function Z0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "th",
    {
      "data-slot": "table-head",
      className: C(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        e
      ),
      ...t
    }
  );
}
function Q0({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "td",
    {
      "data-slot": "table-cell",
      className: C(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        e
      ),
      ...t
    }
  );
}
function G_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    "caption",
    {
      "data-slot": "table-caption",
      className: C("mt-4 text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function Y_({
  className: e,
  orientation: t = "horizontal",
  ...n
}) {
  return /* @__PURE__ */ l(
    _S,
    {
      "data-slot": "tabs",
      "data-orientation": t,
      orientation: t,
      className: C(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        e
      ),
      ...n
    }
  );
}
const J0 = ke(
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
function U_({
  className: e,
  variant: t = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    DS,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: C(J0({ variant: t }), e),
      ...n
    }
  );
}
function j_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    TS,
    {
      "data-slot": "tabs-trigger",
      className: C(
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
function K_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    AS,
    {
      "data-slot": "tabs-content",
      className: C("flex-1 outline-none", e),
      ...t
    }
  );
}
function q_({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "textarea",
    {
      "data-slot": "textarea",
      className: C(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t
    }
  );
}
const ek = ke(
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
function X_({
  className: e,
  variant: t,
  size: n,
  ...r
}) {
  return /* @__PURE__ */ l(
    OS,
    {
      "data-slot": "toggle",
      className: C(ek({ variant: t, size: n, className: e })),
      ...r
    }
  );
}
const tk = ke(
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
), yp = d.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function Z_({
  className: e,
  variant: t,
  size: n,
  spacing: r = 0,
  children: o,
  ...a
}) {
  return /* @__PURE__ */ l(
    FS,
    {
      "data-slot": "toggle-group",
      "data-variant": t,
      "data-size": n,
      "data-spacing": r,
      style: { "--gap": r },
      className: C(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        e
      ),
      ...a,
      children: /* @__PURE__ */ l(yp.Provider, { value: { variant: t, size: n, spacing: r }, children: o })
    }
  );
}
function Q_({
  className: e,
  children: t,
  variant: n,
  size: r,
  ...o
}) {
  const a = d.useContext(yp);
  return /* @__PURE__ */ l(
    WS,
    {
      "data-slot": "toggle-group-item",
      "data-variant": a.variant || n,
      "data-size": a.size || r,
      "data-spacing": a.spacing,
      className: C(
        tk({
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
function J_({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ l(
    n0,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function eD({
  ...e
}) {
  return /* @__PURE__ */ l(r0, { "data-slot": "tooltip", ...e });
}
function tD({
  ...e
}) {
  return /* @__PURE__ */ l(o0, { "data-slot": "tooltip-trigger", ...e });
}
function nD({
  className: e,
  sideOffset: t = 0,
  children: n,
  ...r
}) {
  return /* @__PURE__ */ l(a0, { children: /* @__PURE__ */ M(
    s0,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: C(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ l(i0, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
function Ei(e) {
  const t = e.columnDef.meta;
  if (typeof t?.headerTitle == "string") return t.headerTitle;
  const n = e.columnDef.header;
  return typeof n == "string" ? n : String(e.id);
}
const wp = Xi(void 0);
function be() {
  const e = Zi(wp);
  if (!e)
    throw new Error("useDataGrid must be used within a DataGridProvider");
  return e;
}
function nk({
  children: e,
  table: t,
  ...n
}) {
  const r = t.getState(), o = n.tableLayout?.columnsResizeMode ?? "onEnd";
  $r(() => {
    n.tableLayout?.columnsResizable && (t.options.columnResizeMode = o);
  }, [n.tableLayout?.columnsResizable, o, t]);
  const a = Dt(
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
  return /* @__PURE__ */ l(wp.Provider, { value: a, children: e });
}
function rk({
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
  return /* @__PURE__ */ l(nk, { table: t, ...o, children: e });
}
function ok({
  children: e,
  className: t,
  border: n = !0
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "data-grid",
      className: C(
        "w-full overflow-hidden",
        n && "border-border rounded-md border",
        t
      ),
      children: e
    }
  );
}
const ak = 24, sk = 12, pr = {
  hasVerticalOverflow: !1,
  headerHeight: 0,
  horizontalScrollbarSize: 0,
  thumbHeight: 0,
  thumbTop: 0,
  trackHeight: 0
};
function qo(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Pi(e, t) {
  return e.hasVerticalOverflow === t.hasVerticalOverflow && e.headerHeight === t.headerHeight && e.horizontalScrollbarSize === t.horizontalScrollbarSize && e.thumbHeight === t.thumbHeight && e.thumbTop === t.thumbTop && e.trackHeight === t.trackHeight;
}
function Mi(e, t) {
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
function ik({
  children: e,
  className: t,
  orientation: n = "both",
  ...r
}) {
  const { props: o } = be(), a = ot(null), s = ot(null), i = ot(null), c = ot(pr), f = ot({
    header: null,
    horizontalScrollbar: null,
    table: null,
    tableViewport: null
  }), u = n !== "vertical", p = n !== "horizontal", m = p && !!o.tableLayout?.headerSticky, [h, v] = Tt(!1), g = Re(() => {
    i.current = null, document.body.style.userSelect = "", document.body.style.webkitUserSelect = "";
  }, []), b = Re(() => {
    const k = a.current;
    k && !Pi(pr, c.current) && (Mi(k, pr), c.current = pr), v((N) => N && !1);
  }, []), y = Re(() => {
    const k = a.current, N = s.current;
    if (!k || !N || !m) {
      b();
      return;
    }
    const { header: D, horizontalScrollbar: z } = f.current, T = D?.getBoundingClientRect().height ?? 0, F = N.clientHeight, B = N.clientWidth, V = N.scrollHeight, X = N.scrollWidth, K = u && X > B + 0.5 ? z?.offsetHeight || sk : 0, P = Math.max(
      0,
      F - T - K
    ), L = Math.max(0, V - F);
    let J;
    if (P === 0 || L === 0)
      J = {
        hasVerticalOverflow: !1,
        headerHeight: T,
        horizontalScrollbarSize: K,
        thumbHeight: P,
        thumbTop: 0,
        trackHeight: P
      };
    else {
      const ae = Math.max(
        P,
        V - T
      ), _ = qo(
        P * (P / ae),
        ak,
        P
      ), W = Math.max(0, P - _), Y = W > 0 ? N.scrollTop / L * W : 0;
      J = {
        hasVerticalOverflow: !0,
        headerHeight: T,
        horizontalScrollbarSize: K,
        thumbHeight: _,
        thumbTop: Y,
        trackHeight: P
      };
    }
    Pi(J, c.current) || (Mi(k, J), c.current = J), v(
      (ae) => ae === J.hasVerticalOverflow ? ae : J.hasVerticalOverflow
    );
  }, [b, u, m]);
  $r(() => {
    const k = a.current, N = s.current;
    if (!k || !N) return;
    if (!m) {
      b();
      return;
    }
    f.current = {
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
    let D = 0;
    const z = () => {
      cancelAnimationFrame(D), D = window.requestAnimationFrame(y);
    };
    z(), N.addEventListener("scroll", z, { passive: !0 });
    const T = typeof ResizeObserver > "u" ? null : new ResizeObserver(z);
    return T?.observe(N), f.current.header && T?.observe(f.current.header), f.current.table && T?.observe(f.current.table), f.current.tableViewport && T?.observe(f.current.tableViewport), () => {
      cancelAnimationFrame(D), T?.disconnect(), N.removeEventListener("scroll", z), g();
    };
  }, [
    g,
    b,
    y,
    m
  ]);
  const w = (k) => {
    const N = s.current, { thumbHeight: D, trackHeight: z } = c.current;
    if (!N) return;
    const T = Math.max(0, N.scrollHeight - N.clientHeight), F = Math.max(0, z - D);
    if (T === 0 || F === 0) {
      N.scrollTop = 0;
      return;
    }
    const B = qo(k, 0, F) / F;
    N.scrollTop = B * T;
  }, x = (k) => {
    const N = s.current;
    N && (k.preventDefault(), k.stopPropagation(), k.currentTarget.setPointerCapture(k.pointerId), i.current = {
      pointerId: k.pointerId,
      startScrollTop: N.scrollTop,
      startY: k.clientY
    }, document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }, R = (k) => {
    const N = s.current, D = i.current, { thumbHeight: z, trackHeight: T } = c.current;
    if (!N || !D || D.pointerId !== k.pointerId)
      return;
    const F = Math.max(0, T - z), B = Math.max(0, N.scrollHeight - N.clientHeight);
    if (F === 0 || B === 0) return;
    const V = k.clientY - D.startY, X = D.startScrollTop + V / F * B;
    N.scrollTop = qo(X, 0, B);
  }, S = (k) => {
    i.current?.pointerId === k.pointerId && g();
  }, E = (k) => {
    const { thumbHeight: N } = c.current;
    if (k.target !== k.currentTarget) return;
    k.preventDefault(), k.stopPropagation();
    const D = k.currentTarget.getBoundingClientRect(), z = k.clientY - D.top - N / 2;
    w(z);
  };
  return /* @__PURE__ */ M("div", { ref: a, className: "relative", children: [
    /* @__PURE__ */ M(
      Uu,
      {
        "data-slot": "data-grid-scroll-area",
        className: C("relative", t),
        ...r,
        children: [
          /* @__PURE__ */ l(
            ju,
            {
              ref: s,
              "data-slot": "scroll-area-viewport",
              className: "focus-visible:ring-ring/50 rounded-md size-full transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
              children: /* @__PURE__ */ l("div", { "data-slot": "scroll-area-content", children: e })
            }
          ),
          u && /* @__PURE__ */ l(
            Mr,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "horizontal",
              orientation: "horizontal",
              className: "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
              children: /* @__PURE__ */ l(
                Dr,
                {
                  "data-slot": "data-grid-thumb",
                  className: "bg-border rounded-full relative flex-1"
                }
              )
            }
          ),
          p && /* @__PURE__ */ l(
            Mr,
            {
              "data-slot": "data-grid-scrollbar",
              "data-orientation": "vertical",
              orientation: "vertical",
              className: C(
                "flex touch-none p-px transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-s data-[orientation=vertical]:border-s-transparent",
                m && "pointer-events-none opacity-0"
              ),
              children: /* @__PURE__ */ l(
                Dr,
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
    m && h && /* @__PURE__ */ l(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute right-0 top-(--data-grid-scrollbar-header-height) z-20 h-(--data-grid-scrollbar-track-height)",
        children: /* @__PURE__ */ l(
          "div",
          {
            className: "pointer-events-auto relative h-full w-3 touch-none p-px",
            onPointerDown: E,
            children: /* @__PURE__ */ l(
              "div",
              {
                className: C(
                  "bg-border absolute right-px w-2",
                  "top-(--data-grid-scrollbar-thumb-top) h-(--data-grid-scrollbar-thumb-height)",
                  "rounded-full"
                ),
                onLostPointerCapture: g,
                onPointerCancel: S,
                onPointerDown: x,
                onPointerMove: R,
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
function Ea(e, t) {
  return e ? lk(e) ? /* @__PURE__ */ d.createElement(e, t) : e : null;
}
function lk(e) {
  return ck(e) || typeof e == "function" || dk(e);
}
function ck(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function dk(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
const uk = ke("", {
  variants: {
    size: {
      dense: "px-2.5 h-9",
      default: "px-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
}), xp = ke("", {
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
function Cp(e) {
  const t = e.getIsPinned();
  return {
    left: t === "left" ? `${e.getStart("left")}px` : void 0,
    right: t === "right" ? `${e.getAfter("right")}px` : void 0,
    position: t ? "sticky" : "relative",
    width: e.getSize(),
    zIndex: t ? 1 : 0
  };
}
function Pa(e, t) {
  if (e) {
    if (typeof e == "function") {
      e(t);
      return;
    }
    e.current = t;
  }
}
function Ma(e) {
  return "touches" in e;
}
function Xo(e) {
  return Ma(e) ? e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX : e.clientX;
}
function _i(e, t, n) {
  const r = n.getColumn(t.column.id);
  if (!r || !r.getCanResize() || Ma(e) && e.touches.length > 1) return;
  e.persist?.();
  const o = e.currentTarget.ownerDocument, a = o.body.style.cursor, s = o.documentElement.style.cursor, i = t.getSize(), c = Xo(e), u = e.currentTarget.closest("th")?.getBoundingClientRect(), p = u && Number.isFinite(
    n.options.columnResizeDirection === "rtl" ? u.left : u.right
  ) ? n.options.columnResizeDirection === "rtl" ? u.left : u.right : c;
  if (typeof c != "number" || typeof p != "number")
    return;
  o.body.style.cursor = "col-resize", o.documentElement.style.cursor = "col-resize";
  const m = t.getLeafHeaders().map(
    (S) => [S.column.id, S.column.getSize()]
  ), h = n.options.columnResizeDirection === "rtl" ? -1 : 1, v = (S, E = !1) => {
    if (typeof S != "number") return;
    let k = {};
    const N = (S - c) * h, D = Math.max(N / i, -0.999999);
    m.forEach(([z, T]) => {
      k[z] = Math.round(
        Math.max(T + T * D, 0) * 100
      ) / 100;
    }), n.setColumnSizingInfo((z) => ({
      ...z,
      startOffset: p,
      startSize: i,
      deltaOffset: N,
      deltaPercentage: D,
      columnSizingStart: m,
      isResizingColumn: r.id
    })), E && n.setColumnSizing((z) => ({
      ...z,
      ...k
    }));
  }, g = (S) => {
    v(S, !0), n.setColumnSizingInfo((E) => ({
      ...E,
      isResizingColumn: !1,
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      columnSizingStart: []
    })), o.body.style.cursor = a, o.documentElement.style.cursor = s;
  }, b = (S) => {
    v(S.clientX);
  }, y = (S) => {
    o.removeEventListener("mousemove", b), o.removeEventListener("mouseup", y), g(S.clientX);
  }, w = (S) => {
    S.cancelable && (S.preventDefault(), S.stopPropagation()), v(Xo(S));
  }, x = (S) => {
    o.removeEventListener("touchmove", w), o.removeEventListener("touchend", x), S.cancelable && (S.preventDefault(), S.stopPropagation()), g(Xo(S));
  }, R = { passive: !1 };
  Ma(e) ? (o.addEventListener(
    "touchmove",
    w,
    R
  ), o.addEventListener(
    "touchend",
    x,
    R
  )) : (o.addEventListener(
    "mousemove",
    b,
    R
  ), o.addEventListener(
    "mouseup",
    y,
    R
  )), n.setColumnSizingInfo((S) => ({
    ...S,
    startOffset: p,
    startSize: i,
    deltaOffset: 0,
    deltaPercentage: 0,
    columnSizingStart: m,
    isResizingColumn: r.id
  }));
}
function fk(e, t) {
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
function pk(e, t) {
  const { topRows: n, centerRows: r, bottomRows: o } = fk(
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
function mk() {
  const { props: e } = be();
  return e.tableLayout?.columnsResizable ? /* @__PURE__ */ l(
    "col",
    {
      "data-slot": "data-grid-table-fill-col",
      style: { width: "var(--data-grid-fill-size, 0px)" }
    }
  ) : null;
}
function hk() {
  const { props: e } = be();
  return e.tableLayout?.columnsResizable ? /* @__PURE__ */ l(
    "th",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-head-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function Sp() {
  const { props: e } = be();
  return e.tableLayout?.columnsResizable ? /* @__PURE__ */ l(
    "td",
    {
      "aria-hidden": "true",
      "data-slot": "data-grid-table-fill-body-cell",
      style: { width: "var(--data-grid-fill-size, 0px)" },
      className: "p-0"
    }
  ) : null;
}
function gk({ children: e }) {
  const { props: t, table: n } = be(), r = n.getVisibleLeafColumns(), o = Dt(() => {
    if (!t.tableLayout?.columnsResizable) return;
    const a = n.getFlatHeaders(), s = {};
    for (let i = 0; i < a.length; i++) {
      const c = a[i];
      s[`--header-${c.id}-size`] = c.getSize(), s[`--col-${c.column.id}-size`] = c.column.getSize();
    }
    return s;
  }, [
    t.tableLayout?.columnsResizable,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n.getState().columnSizingInfo,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n.getState().columnSizing
  ]);
  return /* @__PURE__ */ M(
    "table",
    {
      "data-slot": "data-grid-table",
      className: C(
        "text-foreground text-sm caption-bottom text-left align-middle font-normal rtl:text-right",
        t.tableLayout?.columnsResizable ? "min-w-0" : "w-full min-w-full",
        t.tableLayout?.width === "auto" ? "table-auto" : "table-fixed",
        !t.tableLayout?.columnsResizable && "",
        !t.tableLayout?.columnsDraggable && "border-separate border-spacing-0",
        t.tableClassNames?.base
      ),
      style: t.tableLayout?.columnsResizable ? {
        ...o,
        width: `calc(${n.getTotalSize()}px + var(--data-grid-fill-size, 0px))`
      } : void 0,
      children: [
        /* @__PURE__ */ M("colgroup", { children: [
          r.map((a) => /* @__PURE__ */ l(
            "col",
            {
              style: t.tableLayout?.columnsResizable ? { width: `calc(var(--col-${a.id}-size) * 1px)` } : t.tableLayout?.width === "fixed" ? { width: a.getSize() } : void 0
            },
            a.id
          )),
          /* @__PURE__ */ l(mk, {})
        ] }),
        e
      ]
    }
  );
}
function vk({
  children: e,
  className: t,
  viewportRef: n,
  style: r
}) {
  const { props: o, table: a } = be(), [s, i] = Tt(
    null
  ), [c, f] = Tt(0), u = Re(
    (m) => {
      i(m), Pa(n, m);
    },
    [n]
  ), p = o.tableLayout?.columnsResizable && c > 0 ? Math.max(0, c - a.getTotalSize()) : 0;
  return $r(() => {
    if (!s || !o.tableLayout?.columnsResizable) {
      f(0);
      return;
    }
    const h = s.closest(
      '[data-slot="scroll-area-viewport"]'
    ) ?? s.parentElement ?? s, v = () => {
      f(h.clientWidth);
    };
    if (v(), typeof ResizeObserver > "u") return;
    const g = new ResizeObserver(v);
    return g.observe(h), () => {
      g.disconnect();
    };
  }, [o.tableLayout?.columnsResizable, s]), /* @__PURE__ */ M(
    "div",
    {
      "data-slot": "data-grid-table-viewport",
      ref: u,
      className: C("relative min-w-full align-top", t),
      style: {
        ...o.tableLayout?.columnsResizable ? {
          width: `calc(${a.getTotalSize()}px + var(--data-grid-fill-size, 0px))`,
          "--data-grid-fill-size": `${p}px`
        } : void 0,
        ...r
      },
      children: [
        e,
        /* @__PURE__ */ l(Ck, { viewportElement: s })
      ]
    }
  );
}
function bk({ children: e }) {
  const { props: t } = be();
  return /* @__PURE__ */ l(
    "thead",
    {
      className: C(
        t.tableClassNames?.header,
        t.tableLayout?.headerSticky && t.tableClassNames?.headerSticky
      ),
      children: e
    }
  );
}
function yk({
  children: e,
  headerGroup: t
}) {
  const { props: n } = be();
  return /* @__PURE__ */ M(
    "tr",
    {
      className: C(
        "bg-muted/40",
        n.tableLayout?.headerBorder && "[&>th]:border-b",
        n.tableLayout?.cellBorder && "*:last:border-e-0",
        n.tableLayout?.stripped && "bg-transparent",
        n.tableLayout?.headerBackground === !1 && "bg-transparent",
        n.tableClassNames?.headerRow
      ),
      children: [
        e,
        /* @__PURE__ */ l(hk, {})
      ]
    },
    t.id
  );
}
function wk({
  children: e,
  header: t,
  dndRef: n,
  dndStyle: r
}) {
  const { props: o } = be(), { column: a } = t, s = a.getIsPinned(), i = s === "left" && a.getIsLastColumn("left"), c = s === "right" && a.getIsFirstColumn("right"), f = a.getIndex() === t.getContext().table.getVisibleLeafColumns().length - 1, u = uk({
    size: o.tableLayout?.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ l(
    "th",
    {
      ref: n,
      style: {
        ...o.tableLayout?.width === "fixed" && !o.tableLayout?.columnsResizable && {
          width: t.getSize()
        },
        ...o.tableLayout?.columnsPinnable && a.getCanPin() && Cp(a),
        ...o.tableLayout?.columnsResizable && {
          width: `calc(var(--header-${t.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": s || void 0,
      "data-last-col": i ? "left" : c ? "right" : void 0,
      className: C(
        "text-secondary-foreground/80 h-10 relative text-left align-middle font-normal rtl:text-right [&:has([role=checkbox])]:pe-0",
        u,
        o.tableLayout?.cellBorder && "border-e",
        o.tableLayout?.columnsResizable && a.getCanResize() && "overflow-visible",
        o.tableLayout?.columnsResizable && a.getCanResize() && f && "pe-8",
        o.tableLayout?.columnsPinnable && a.getCanPin() && "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-s!",
        t.column.columnDef.meta?.headerClassName,
        a.getIndex() === 0 || a.getIndex() === t.headerGroup.headers.length - 1 ? o.tableClassNames?.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function xk({
  header: e
}) {
  const { props: t, table: n } = be(), { column: r } = e, o = r.getIndex() === e.getContext().table.getVisibleLeafColumns().length - 1, a = (t.tableLayout?.columnsResizeMode ?? n.options.columnResizeMode) === "onEnd";
  return /* @__PURE__ */ l(
    "div",
    {
      onDoubleClick: () => r.resetSize(),
      onMouseDown: (c) => {
        if (c.preventDefault(), c.stopPropagation(), a) {
          _i(c, e, n);
          return;
        }
        e.getResizeHandler()(c);
      },
      onTouchStart: (c) => {
        if (c.preventDefault(), c.stopPropagation(), a) {
          _i(c, e, n);
          return;
        }
        e.getResizeHandler()(c);
      },
      className: C(
        "absolute top-0 h-full cursor-col-resize user-select-none touch-none z-10 flex",
        o ? "end-0 w-5 justify-end before:hidden" : "-end-2 w-5 justify-center before:absolute before:inset-y-0 before:w-px before:-translate-x-px before:bg-border",
        t.tableLayout?.cellBorder && !r.getIsResizing() && "before:hidden",
        r.getIsResizing() && (a ? "opacity-100" : o ? "before:absolute before:end-0 before:block before:inset-y-0 before:w-0.5 before:bg-primary opacity-100" : "before:block before:bg-primary before:w-0.5 opacity-100")
      )
    }
  );
}
function Ck({
  viewportElement: e
}) {
  const { props: t, table: n } = be(), r = n.getState().columnSizingInfo, o = r.isResizingColumn, a = t.tableLayout?.columnsResizeMode ?? n.options.columnResizeMode;
  if (!t.tableLayout?.columnsResizable || a !== "onEnd" || !o)
    return null;
  const s = n.getFlatHeaders().find(
    (u) => u.column.id === o || u.id === o
  );
  if (!s) return null;
  const i = r.deltaOffset ?? 0, c = e?.querySelector('[data-slot="data-grid-table"] thead')?.getBoundingClientRect().height ?? 0, f = typeof r.startOffset == "number" && e ? r.startOffset - e.getBoundingClientRect().left : s.getStart() + s.getSize();
  return /* @__PURE__ */ M(
    "div",
    {
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-y-0 z-20",
      style: {
        left: f,
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
function Sk() {
  return /* @__PURE__ */ l("tbody", { "aria-hidden": "true", className: "h-2" });
}
function kk({ children: e }) {
  const { props: t } = be();
  return /* @__PURE__ */ l(
    "tbody",
    {
      className: C(
        "[&_tr:last-child]:border-0",
        t.tableLayout?.rowRounded && "[&_td:first-child]:rounded-l-lg",
        t.tableLayout?.rowRounded && "[&_td:last-child]:rounded-r-lg",
        t.tableClassNames?.body
      ),
      children: e
    }
  );
}
function Nk({ children: e }) {
  const { props: t } = be();
  return /* @__PURE__ */ l(
    "tfoot",
    {
      className: C(
        "border-t",
        t.tableLayout?.footerSticky && t.tableClassNames?.footerSticky,
        t.tableClassNames?.footer
      ),
      children: e
    }
  );
}
function Rk({ children: e }) {
  const { table: t, props: n } = be();
  return /* @__PURE__ */ M(
    "tr",
    {
      className: C(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        n.onRowClick && "cursor-pointer",
        !n.tableLayout?.stripped && n.tableLayout?.rowBorder && "border-border border-b [&:not(:last-child)>td]:border-b",
        n.tableLayout?.cellBorder && "*:last:border-e-0",
        n.tableLayout?.stripped && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        t.options.enableRowSelection && "*:first:relative",
        n.tableClassNames?.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ l(Sp, {})
      ]
    }
  );
}
function Ek({
  children: e,
  column: t
}) {
  const { props: n, table: r } = be(), o = xp({
    size: n.tableLayout?.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ l(
    "td",
    {
      style: n.tableLayout?.columnsResizable ? { width: `calc(var(--col-${t.id}-size) * 1px)` } : void 0,
      className: C(
        "align-middle",
        o,
        n.tableLayout?.cellBorder && "border-e",
        n.tableLayout?.columnsResizable && t.getCanResize() && "truncate",
        t.columnDef.meta?.cellClassName,
        n.tableLayout?.columnsPinnable && t.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        t.getIndex() === 0 || t.getIndex() === r.getVisibleFlatColumns().length - 1 ? n.tableClassNames?.edgeCell : ""
      ),
      children: e
    }
  );
}
function Pk({
  children: e,
  row: t,
  pinnedBoundary: n,
  rowRef: r,
  dndRef: o,
  dndStyle: a
}) {
  const { props: s, table: i } = be(), c = t.getIsPinned();
  return /* @__PURE__ */ M(
    "tr",
    {
      ref: (f) => {
        Pa(r, f), Pa(o, f);
      },
      style: { ...a || null },
      "data-state": i.options.enableRowSelection && t.getIsSelected() ? "selected" : void 0,
      "data-row-pinned": c || void 0,
      "data-row-pinned-boundary": n,
      onClick: () => s.onRowClick && s.onRowClick(t.original),
      className: C(
        "transition-colors duration-100 hover:bg-muted/40 data-[state=selected]:bg-muted/50",
        s.onRowClick && "cursor-pointer",
        !s.tableLayout?.stripped && s.tableLayout?.rowBorder && "border-border border-b [&:not(:last-child)>td]:border-b",
        s.tableLayout?.cellBorder && "*:last:border-e-0",
        s.tableLayout?.stripped && "odd:bg-muted/90 odd:hover:bg-muted hover:bg-transparent",
        i.options.enableRowSelection && "*:first:relative",
        s.tableLayout?.rowsPinnable && c && "bg-muted/30 hover:bg-muted/50",
        n === "top" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        n === "bottom" && "[&>td]:shadow-[0_2px_0_rgba(0,0,0,0.03)]",
        s.tableClassNames?.bodyRow
      ),
      children: [
        e,
        /* @__PURE__ */ l(Sp, {})
      ]
    }
  );
}
function Mk({ row: e }) {
  const { props: t, table: n } = be();
  return /* @__PURE__ */ l(
    "tr",
    {
      className: C(
        t.tableLayout?.rowBorder && "[&:not(:last-child)>td]:border-b"
      ),
      children: /* @__PURE__ */ l(
        "td",
        {
          colSpan: e.getVisibleCells().length + (t.tableLayout?.columnsResizable ? 1 : 0),
          children: n.getAllColumns().find((r) => r.columnDef.meta?.expandedContent)?.columnDef.meta?.expandedContent?.(e.original)
        }
      )
    }
  );
}
function _k({
  children: e,
  cell: t,
  dndRef: n,
  dndStyle: r
}) {
  const { props: o } = be(), { column: a, row: s } = t, i = a.getIsPinned(), c = i === "left" && a.getIsLastColumn("left"), f = i === "right" && a.getIsFirstColumn("right"), u = xp({
    size: o.tableLayout?.dense ? "dense" : "default"
  });
  return /* @__PURE__ */ l(
    "td",
    {
      ref: n,
      ...o.tableLayout?.columnsDraggable && !i ? { cell: t } : {},
      style: {
        ...o.tableLayout?.columnsPinnable && a.getCanPin() && Cp(a),
        ...o.tableLayout?.columnsResizable && {
          width: `calc(var(--col-${a.id}-size) * 1px)`
        },
        ...r || null
      },
      "data-pinned": i || void 0,
      "data-last-col": c ? "left" : f ? "right" : void 0,
      className: C(
        "align-middle",
        u,
        o.tableLayout?.cellBorder && "border-e",
        o.tableLayout?.columnsResizable && a.getCanResize() && "truncate",
        t.column.columnDef.meta?.cellClassName,
        o.tableLayout?.columnsPinnable && a.getCanPin() && '[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 data-pinned:backdrop-blur-xs" [&[data-pinned=left][data-last-col=left]]:border-e! [&[data-pinned=right][data-last-col=right]]:border-s!',
        a.getIndex() === 0 || a.getIndex() === s.getVisibleCells().length - 1 ? o.tableClassNames?.edgeCell : ""
      ),
      children: e
    },
    t.id
  );
}
function Dk({
  row: e,
  pinnedBoundary: t,
  rowRef: n
}) {
  return /* @__PURE__ */ M(Em, { children: [
    /* @__PURE__ */ l(
      Pk,
      {
        row: e,
        pinnedBoundary: t,
        rowRef: n,
        children: e.getVisibleCells().map((r) => /* @__PURE__ */ l(_k, { cell: r, children: Ea(r.column.columnDef.cell, r.getContext()) }, r.id))
      }
    ),
    e.getIsExpanded() && /* @__PURE__ */ l(Mk, { row: e })
  ] });
}
function Tk() {
  const { table: e, props: t } = be(), n = e.getVisibleLeafColumns().length + (t.tableLayout?.columnsResizable ? 1 : 0);
  return /* @__PURE__ */ l("tr", { children: /* @__PURE__ */ l(
    "td",
    {
      colSpan: Math.max(n, 1),
      className: "text-muted-foreground text-sm py-6 text-center",
      children: t.emptyMessage || "No data available"
    }
  ) });
}
function Ak({ table: e }) {
  const { isLoading: t, props: n } = be(), r = e.getState().pagination;
  if (t && n.loadingMode === "skeleton" && r?.pageSize)
    return /* @__PURE__ */ l(Pe, { children: Array.from({ length: r.pageSize }).map((a, s) => /* @__PURE__ */ l(Rk, { children: e.getVisibleFlatColumns().map((i, c) => /* @__PURE__ */ l(Ek, { column: i, children: i.columnDef.meta?.skeleton }, c)) }, s)) });
  if (t && n.loadingMode === "spinner")
    return /* @__PURE__ */ l("tr", { children: /* @__PURE__ */ l("td", { colSpan: e.getVisibleFlatColumns().length, className: "p-8", children: /* @__PURE__ */ M("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ M(
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
  const o = pk(
    e,
    n.tableLayout?.rowsPinnable
  );
  return o.length ? /* @__PURE__ */ l(Pe, { children: o.map(({ row: a, pinnedBoundary: s }) => /* @__PURE__ */ l(
    Dk,
    {
      row: a,
      pinnedBoundary: s
    },
    a.id
  )) }) : /* @__PURE__ */ l(Tk, {});
}
const Ok = Qi(
  Ak,
  (e, t) => !!t.table.getState().columnSizingInfo.isResizingColumn
);
function Ik({
  footerContent: e,
  renderHeader: t = !0
}) {
  const { table: n, props: r } = be();
  return /* @__PURE__ */ l(vk, { children: /* @__PURE__ */ M(gk, { children: [
    t && /* @__PURE__ */ l(bk, { children: n.getHeaderGroups().map((o, a) => /* @__PURE__ */ l(yk, { headerGroup: o, children: o.headers.map((s, i) => {
      const { column: c } = s;
      return /* @__PURE__ */ M(wk, { header: s, children: [
        s.isPlaceholder ? null : r.tableLayout?.columnsResizable && c.getCanResize() ? /* @__PURE__ */ l("div", { className: "truncate", children: Ea(
          s.column.columnDef.header,
          s.getContext()
        ) }) : Ea(
          s.column.columnDef.header,
          s.getContext()
        ),
        r.tableLayout?.columnsResizable && c.getCanResize() && /* @__PURE__ */ l(xk, { header: s })
      ] }, i);
    }) }, a)) }),
    t && (r.tableLayout?.stripped || !r.tableLayout?.rowBorder) && /* @__PURE__ */ l(Sk, {}),
    /* @__PURE__ */ l(kk, { children: /* @__PURE__ */ l(Ok, { table: n }) }),
    e && /* @__PURE__ */ l(Nk, { children: e })
  ] }) });
}
function zk({
  table: e,
  pageSizeOptions: t = [10, 20, 30, 40, 50],
  className: n,
  ...r
}) {
  return /* @__PURE__ */ M(
    "div",
    {
      className: C(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ M("div", { className: "flex-1 whitespace-nowrap tabular-nums text-muted-foreground text-sm", children: [
          e.getFilteredSelectedRowModel().rows.length,
          " of",
          " ",
          e.getFilteredRowModel().rows.length,
          " row(s) selected."
        ] }),
        /* @__PURE__ */ M("div", { className: "flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8", children: [
          /* @__PURE__ */ M("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ l("p", { className: "whitespace-nowrap font-medium text-sm", children: "Rows per page" }),
            /* @__PURE__ */ M(
              $0,
              {
                value: `${e.getState().pagination.pageSize}`,
                onValueChange: (o) => {
                  e.setPageSize(Number(o));
                },
                children: [
                  /* @__PURE__ */ l(W0, { className: "h-8 w-18 data-size:h-8", children: /* @__PURE__ */ l(F0, { placeholder: e.getState().pagination.pageSize }) }),
                  /* @__PURE__ */ l(B0, { side: "top", children: t.map((o) => /* @__PURE__ */ l(V0, { value: `${o}`, children: o }, o)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ M("div", { className: "flex items-center justify-center whitespace-nowrap font-medium tabular-nums text-sm", children: [
            "Page ",
            e.getState().pagination.pageIndex + 1,
            " of",
            " ",
            e.getPageCount()
          ] }),
          /* @__PURE__ */ M("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ l(
              Ae,
              {
                "aria-label": "Go to first page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(0),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ l(Dh, {})
              }
            ),
            /* @__PURE__ */ l(
              Ae,
              {
                "aria-label": "Go to previous page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.previousPage(),
                disabled: !e.getCanPreviousPage(),
                children: /* @__PURE__ */ l(za, {})
              }
            ),
            /* @__PURE__ */ l(
              Ae,
              {
                "aria-label": "Go to next page",
                variant: "ghost",
                size: "icon",
                className: "size-8",
                onClick: () => e.nextPage(),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ l(In, {})
              }
            ),
            /* @__PURE__ */ l(
              Ae,
              {
                "aria-label": "Go to last page",
                variant: "ghost",
                size: "icon",
                className: "hidden size-8 lg:flex",
                onClick: () => e.setPageIndex(e.getPageCount() - 1),
                disabled: !e.getCanNextPage(),
                children: /* @__PURE__ */ l(Ah, {})
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function rD({
  table: e,
  recordCount: t,
  actionBar: n,
  children: r,
  className: o,
  resizable: a = !1,
  stickyHeader: s = !1,
  stickyFooter: i = !1,
  height: c,
  footerContent: f,
  tableLayoutOverrides: u
}) {
  return /* @__PURE__ */ l(
    rk,
    {
      table: e,
      recordCount: t ?? e.getFilteredRowModel().rows.length,
      tableLayout: {
        columnsResizable: a,
        columnsResizeMode: "onEnd",
        headerSticky: s,
        footerSticky: i,
        headerBorder: !0,
        rowBorder: !0,
        ...u
      },
      children: /* @__PURE__ */ M("div", { className: C("flex w-full flex-col gap-2.5", o), children: [
        r,
        /* @__PURE__ */ l(ok, { children: /* @__PURE__ */ l(ik, { className: c, children: /* @__PURE__ */ l(Ik, { footerContent: f }) }) }),
        /* @__PURE__ */ M("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ l(zk, { table: e }),
          n && e.getFilteredSelectedRowModel().rows.length > 0 && n
        ] })
      ] })
    }
  );
}
function Lk({
  column: e,
  label: t,
  icon: n,
  className: r,
  filter: o,
  visibility: a = !1
}) {
  const { isLoading: s, table: i, props: c, recordCount: f } = be(), u = t ?? Ei(e), p = i.getState().columnOrder, m = JSON.stringify(i.getState().columnVisibility), h = e.getIsSorted(), v = e.getIsPinned(), g = e.getCanSort(), b = e.getCanPin(), y = e.getCanResize(), w = p.indexOf(e.id), x = w > 0, R = w < p.length - 1, S = () => {
    h === "asc" ? e.toggleSorting(!0) : h === "desc" ? e.clearSorting() : e.toggleSorting(!1);
  }, E = C(
    "text-secondary-foreground/80 inline-flex h-full items-center gap-1.5 font-normal [&_svg]:opacity-60 text-[0.8125rem] leading-[calc(1.125/0.8125)] [&_svg]:size-3.5",
    r
  ), k = C(
    "text-secondary-foreground/80 hover:bg-secondary! data-[state=open]:bg-secondary! hover:text-foreground data-[state=open]:text-foreground -ms-2 px-2 py-0 font-normal h-7 rounded-md",
    r
  ), N = g && (h === "desc" ? /* @__PURE__ */ l(Vs, { className: "size-3.5" }) : h === "asc" ? /* @__PURE__ */ l(Hs, { className: "size-3.5" }) : /* @__PURE__ */ l(fl, { className: "mt-px size-3.5" })), D = c.tableLayout?.columnsMovable || c.tableLayout?.columnsVisibility && a || c.tableLayout?.columnsPinnable && b || o, z = Dt(() => {
    const T = [];
    let F = !1;
    return o && (T.push(
      /* @__PURE__ */ l(w0, { children: /* @__PURE__ */ l(C0, { children: o }, "filter") }, "group-filter")
    ), F = !0), g && (F && T.push(/* @__PURE__ */ l(fr, {}, "sep-sort")), T.push(
      /* @__PURE__ */ M(
        jt,
        {
          onClick: () => {
            h === "asc" ? e.clearSorting() : e.toggleSorting(!1);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ l(Hs, { className: "size-3.5!" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Asc" }),
            h === "asc" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-asc"
      ),
      /* @__PURE__ */ M(
        jt,
        {
          onClick: () => {
            h === "desc" ? e.clearSorting() : e.toggleSorting(!0);
          },
          disabled: !g,
          children: [
            /* @__PURE__ */ l(Vs, { className: "size-3.5!" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Desc" }),
            h === "desc" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "sort-desc"
      )
    ), F = !0), c.tableLayout?.columnsPinnable && b && (F && T.push(/* @__PURE__ */ l(fr, {}, "sep-pin")), T.push(
      /* @__PURE__ */ M(
        jt,
        {
          onClick: () => e.pin(v === "left" ? !1 : "left"),
          children: [
            /* @__PURE__ */ l(mh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Pin to left" }),
            v === "left" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-left"
      ),
      /* @__PURE__ */ M(
        jt,
        {
          onClick: () => e.pin(v === "right" ? !1 : "right"),
          children: [
            /* @__PURE__ */ l(bh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { className: "grow", children: "Pin to right" }),
            v === "right" && /* @__PURE__ */ l(at, { className: "text-primary size-4 opacity-100!" })
          ]
        },
        "pin-right"
      )
    ), F = !0), c.tableLayout?.columnsMovable && (F && T.push(/* @__PURE__ */ l(fr, {}, "sep-move")), T.push(
      /* @__PURE__ */ M(
        jt,
        {
          onClick: () => {
            if (w > 0) {
              const B = [...p], [V] = B.splice(w, 1);
              B.splice(w - 1, 0, V), i.setColumnOrder(B);
            }
          },
          disabled: !x || v !== !1,
          children: [
            /* @__PURE__ */ l(gh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { children: "Move to Left" })
          ]
        },
        "move-left"
      ),
      /* @__PURE__ */ M(
        jt,
        {
          onClick: () => {
            if (w < p.length - 1) {
              const B = [...p], [V] = B.splice(w, 1);
              B.splice(w + 1, 0, V), i.setColumnOrder(B);
            }
          },
          disabled: !R || v !== !1,
          children: [
            /* @__PURE__ */ l(wh, { className: "size-3.5!", "aria-hidden": "true" }),
            /* @__PURE__ */ l("span", { children: "Move to Right" })
          ]
        },
        "move-right"
      )
    ), F = !0), c.tableLayout?.columnsVisibility && a && (F && T.push(/* @__PURE__ */ l(fr, {}, "sep-visibility")), T.push(
      /* @__PURE__ */ M(S0, { children: [
        /* @__PURE__ */ M(k0, { children: [
          /* @__PURE__ */ l(gl, { className: "size-3.5!" }),
          /* @__PURE__ */ l("span", { children: "Columns" })
        ] }),
        /* @__PURE__ */ l(N0, { children: i.getAllColumns().filter((B) => B.getCanHide()).map((B) => /* @__PURE__ */ l(
          x0,
          {
            checked: B.getIsVisible(),
            onSelect: (V) => V.preventDefault(),
            onCheckedChange: (V) => B.toggleVisibility(!!V),
            className: "capitalize",
            children: Ei(B)
          },
          B.id
        )) })
      ] }, "visibility")
    )), T;
  }, [
    o,
    g,
    h,
    e,
    c.tableLayout?.columnsPinnable,
    c.tableLayout?.columnsMovable,
    c.tableLayout?.columnsVisibility,
    b,
    v,
    x,
    R,
    a,
    i,
    w,
    p,
    m
  ]);
  return D ? /* @__PURE__ */ M("div", { className: "flex h-full items-center justify-between gap-1.5", children: [
    /* @__PURE__ */ M(v0, { children: [
      /* @__PURE__ */ l(b0, { asChild: !0, children: /* @__PURE__ */ M(
        Ae,
        {
          variant: "ghost",
          className: k,
          disabled: s || f === 0,
          children: [
            n && n,
            u,
            N
          ]
        }
      ) }),
      /* @__PURE__ */ l(y0, { className: "w-40", align: "start", children: z })
    ] }),
    c.tableLayout?.columnsPinnable && b && v && /* @__PURE__ */ l(
      Ae,
      {
        size: "icon",
        variant: "ghost",
        className: "-me-1 size-7 rounded-md",
        onClick: () => e.pin(!1),
        "aria-label": `Unpin ${u} column`,
        title: `Unpin ${u} column`,
        children: /* @__PURE__ */ l(Vh, { className: "size-3.5! opacity-50!", "aria-hidden": "true" })
      }
    )
  ] }) : g || c.tableLayout?.columnsResizable && y ? /* @__PURE__ */ l("div", { className: "flex h-full items-center", children: /* @__PURE__ */ M(
    Ae,
    {
      variant: "ghost",
      className: k,
      disabled: s || f === 0,
      onClick: S,
      children: [
        n && n,
        u,
        N
      ]
    }
  ) }) : /* @__PURE__ */ M("div", { className: E, children: [
    n && n,
    u
  ] });
}
const oD = Qi(
  Lk
);
function $k(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Fk = {}, Nn = {};
function Rn(e, t) {
  try {
    const r = (Fk[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Nn ? Nn[r] : Di(r, r.split(":"));
  } catch {
    if (e in Nn) return Nn[e];
    const n = e?.match(Wk);
    return n ? Di(e, n.slice(1)) : NaN;
  }
}
const Wk = /([+-]\d\d):?(\d\d)?/;
function Di(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0);
  return Nn[e] = n > 0 ? n * 60 + r : n * 60 - r;
}
class Xe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Rn(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), kp(this), _a(this)) : this.setTime(Date.now());
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
    return -Rn(this.timeZone, this);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), _a(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Xe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ti = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ti.test(e)) return;
  const t = e.replace(Ti, "$1UTC");
  Xe.prototype[t] && (e.startsWith("get") ? Xe.prototype[e] = function() {
    return this.internal[t]();
  } : (Xe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Bk(this), +this;
  }, Xe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), _a(this), +this;
  }));
});
function _a(e) {
  e.internal.setTime(+e), e.internal.setUTCMinutes(e.internal.getUTCMinutes() - e.getTimezoneOffset());
}
function Bk(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), kp(e);
}
function kp(e) {
  const t = Rn(e.timeZone, e), n = /* @__PURE__ */ new Date(+e);
  n.setUTCHours(n.getUTCHours() - 1);
  const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+n)).getTimezoneOffset(), a = r - o, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const i = r - t;
  i && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + i);
  const c = Rn(e.timeZone, e), u = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - c, p = c !== t, m = u - i;
  if (p && m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + m);
    const h = Rn(e.timeZone, e), v = c - h;
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
    return `${t?.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${$k(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
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
var q;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(q || (q = {}));
var me;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(me || (me = {}));
var We;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(We || (We = {}));
var De;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(De || (De = {}));
const Np = 6048e5, Vk = 864e5, Ai = Symbol.for("constructDateFrom");
function Se(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && Ai in e ? e[Ai](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function de(e, t) {
  return Se(t || e, e);
}
function Rp(e, t, n) {
  const r = de(e, n?.in);
  return isNaN(t) ? Se(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ep(e, t, n) {
  const r = de(e, n?.in);
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
let Hk = {};
function Qn() {
  return Hk;
}
function on(e, t) {
  const n = Qn(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = de(e, t?.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function An(e, t) {
  return on(e, { ...t, weekStartsOn: 1 });
}
function Pp(e, t) {
  const n = de(e, t?.in), r = n.getFullYear(), o = Se(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = An(o), s = Se(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = An(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Oi(e) {
  const t = de(e), n = new Date(
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
function mn(e, ...t) {
  const n = Se.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function On(e, t) {
  const n = de(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Mp(e, t, n) {
  const [r, o] = mn(
    n?.in,
    e,
    t
  ), a = On(r), s = On(o), i = +a - Oi(a), c = +s - Oi(s);
  return Math.round((i - c) / Vk);
}
function Gk(e, t) {
  const n = Pp(e, t), r = Se(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), An(r);
}
function Yk(e, t, n) {
  return Rp(e, t * 7, n);
}
function Uk(e, t, n) {
  return Ep(e, t * 12, n);
}
function jk(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Se.bind(null, o));
    const a = de(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), Se(r, n || NaN);
}
function Kk(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = Se.bind(null, o));
    const a = de(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), Se(r, n || NaN);
}
function qk(e, t, n) {
  const [r, o] = mn(
    n?.in,
    e,
    t
  );
  return +On(r) == +On(o);
}
function _p(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Xk(e) {
  return !(!_p(e) && typeof e != "number" || isNaN(+de(e)));
}
function Zk(e, t, n) {
  const [r, o] = mn(
    n?.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function Qk(e, t) {
  const n = de(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Jk(e, t) {
  const [n, r] = mn(e, t.start, t.end);
  return { start: n, end: r };
}
function eN(e, t) {
  const { start: n, end: r } = Jk(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(Se(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function tN(e, t) {
  const n = de(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function nN(e, t) {
  const n = de(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Dp(e, t) {
  const n = de(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Tp(e, t) {
  const n = Qn(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = de(e, t?.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function rN(e, t) {
  return Tp(e, { ...t, weekStartsOn: 1 });
}
const oN = {
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
}, aN = (e, t, n) => {
  let r;
  const o = oN[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Zo(e) {
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
}, iN = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, lN = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, cN = {
  date: Zo({
    formats: sN,
    defaultWidth: "full"
  }),
  time: Zo({
    formats: iN,
    defaultWidth: "full"
  }),
  dateTime: Zo({
    formats: lN,
    defaultWidth: "full"
  })
}, dN = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, uN = (e, t, n, r) => dN[e];
function yn(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : s;
      o = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[s];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const fN = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, pN = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, mN = {
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
}, hN = {
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
}, gN = {
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
}, vN = {
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
}, bN = (e, t) => {
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
}, yN = {
  ordinalNumber: bN,
  era: yn({
    values: fN,
    defaultWidth: "wide"
  }),
  quarter: yn({
    values: pN,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: yn({
    values: mN,
    defaultWidth: "wide"
  }),
  day: yn({
    values: hN,
    defaultWidth: "wide"
  }),
  dayPeriod: yn({
    values: gN,
    defaultWidth: "wide",
    formattingValues: vN,
    defaultFormattingWidth: "wide"
  })
};
function wn(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? xN(i, (p) => p.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      wN(i, (p) => p.test(s))
    );
    let f;
    f = e.valueCallback ? e.valueCallback(c) : c, f = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(f)
    ) : f;
    const u = t.slice(s.length);
    return { value: f, rest: u };
  };
}
function wN(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function xN(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function CN(e) {
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
const SN = /^(\d+)(th|st|nd|rd)?/i, kN = /\d+/i, NN = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, RN = {
  any: [/^b/i, /^(a|c)/i]
}, EN = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, PN = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, MN = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, _N = {
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
}, DN = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, TN = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, AN = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ON = {
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
}, IN = {
  ordinalNumber: CN({
    matchPattern: SN,
    parsePattern: kN,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: wn({
    matchPatterns: NN,
    defaultMatchWidth: "wide",
    parsePatterns: RN,
    defaultParseWidth: "any"
  }),
  quarter: wn({
    matchPatterns: EN,
    defaultMatchWidth: "wide",
    parsePatterns: PN,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: wn({
    matchPatterns: MN,
    defaultMatchWidth: "wide",
    parsePatterns: _N,
    defaultParseWidth: "any"
  }),
  day: wn({
    matchPatterns: DN,
    defaultMatchWidth: "wide",
    parsePatterns: TN,
    defaultParseWidth: "any"
  }),
  dayPeriod: wn({
    matchPatterns: AN,
    defaultMatchWidth: "any",
    parsePatterns: ON,
    defaultParseWidth: "any"
  })
}, Ts = {
  code: "en-US",
  formatDistance: aN,
  formatLong: cN,
  formatRelative: uN,
  localize: yN,
  match: IN,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function zN(e, t) {
  const n = de(e, t?.in);
  return Mp(n, Dp(n)) + 1;
}
function Ap(e, t) {
  const n = de(e, t?.in), r = +An(n) - +Gk(n);
  return Math.round(r / Np) + 1;
}
function Op(e, t) {
  const n = de(e, t?.in), r = n.getFullYear(), o = Qn(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, s = Se(t?.in || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = on(s, t), c = Se(t?.in || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const f = on(c, t);
  return +n >= +i ? r + 1 : +n >= +f ? r : r - 1;
}
function LN(e, t) {
  const n = Qn(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = Op(e, t), a = Se(t?.in || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), on(a, t);
}
function Ip(e, t) {
  const n = de(e, t?.in), r = +on(n, t) - +LN(n, t);
  return Math.round(r / Np) + 1;
}
function ce(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const gt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ce(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ce(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ce(e.getDate(), t.length);
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
    return ce(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ce(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ce(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ce(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ce(o, t.length);
  }
}, Kt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ii = {
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
    const o = Op(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return ce(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : ce(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Pp(e);
    return ce(n, t.length);
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
    return ce(n, t.length);
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
        return ce(r, 2);
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
        return ce(r, 2);
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
        return ce(r + 1, 2);
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
    const o = Ip(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ce(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Ap(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ce(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : gt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = zN(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ce(r, t.length);
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
        return ce(a, 2);
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
        return ce(a, t.length);
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
        return ce(o, t.length);
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
    switch (r === 12 ? o = Kt.noon : r === 0 ? o = Kt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Kt.evening : r >= 12 ? o = Kt.afternoon : r >= 4 ? o = Kt.morning : o = Kt.night, t) {
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
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ce(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ce(r, t.length);
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
        return Li(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return _t(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return _t(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Li(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return _t(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return _t(r, ":");
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
        return "GMT" + zi(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + _t(r, ":");
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
        return "GMT" + zi(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + _t(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ce(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ce(+e, t.length);
  }
};
function zi(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + ce(a, 2);
}
function Li(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ce(Math.abs(e) / 60, 2) : _t(e, t);
}
function _t(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ce(Math.trunc(r / 60), 2), a = ce(r % 60, 2);
  return n + o + t + a;
}
const $i = (e, t) => {
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
}, zp = (e, t) => {
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
}, $N = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return $i(e, t);
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
  return a.replace("{{date}}", $i(r, t)).replace("{{time}}", zp(o, t));
}, FN = {
  p: zp,
  P: $N
}, WN = /^D+$/, BN = /^Y+$/, VN = ["D", "DD", "YY", "YYYY"];
function HN(e) {
  return WN.test(e);
}
function GN(e) {
  return BN.test(e);
}
function YN(e, t, n) {
  const r = UN(e, t, n);
  if (console.warn(r), VN.includes(e)) throw new RangeError(r);
}
function UN(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const jN = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, KN = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, qN = /^'([^]*?)'?$/, XN = /''/g, ZN = /[a-zA-Z]/;
function QN(e, t, n) {
  const r = Qn(), o = n?.locale ?? r.locale ?? Ts, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, s = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = de(e, n?.in);
  if (!Xk(i))
    throw new RangeError("Invalid time value");
  let c = t.match(KN).map((u) => {
    const p = u[0];
    if (p === "p" || p === "P") {
      const m = FN[p];
      return m(u, o.formatLong);
    }
    return u;
  }).join("").match(jN).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const p = u[0];
    if (p === "'")
      return { isToken: !1, value: JN(u) };
    if (Ii[p])
      return { isToken: !0, value: u };
    if (p.match(ZN))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + p + "`"
      );
    return { isToken: !1, value: u };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const f = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((u) => {
    if (!u.isToken) return u.value;
    const p = u.value;
    (!n?.useAdditionalWeekYearTokens && GN(p) || !n?.useAdditionalDayOfYearTokens && HN(p)) && YN(p, t, String(e));
    const m = Ii[p[0]];
    return m(i, p, o.localize, f);
  }).join("");
}
function JN(e) {
  const t = e.match(qN);
  return t ? t[1].replace(XN, "'") : e;
}
function eR(e, t) {
  const n = de(e, t?.in), r = n.getFullYear(), o = n.getMonth(), a = Se(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function tR(e, t) {
  return de(e, t?.in).getMonth();
}
function nR(e, t) {
  return de(e, t?.in).getFullYear();
}
function rR(e, t) {
  return +de(e) > +de(t);
}
function oR(e, t) {
  return +de(e) < +de(t);
}
function aR(e, t, n) {
  const [r, o] = mn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function sR(e, t, n) {
  const [r, o] = mn(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function iR(e, t, n) {
  const r = de(e, n?.in), o = r.getFullYear(), a = r.getDate(), s = Se(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = eR(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function lR(e, t, n) {
  const r = de(e, n?.in);
  return isNaN(+r) ? Se(e, NaN) : (r.setFullYear(t), r);
}
const Fi = 5, cR = 4;
function dR(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Fi * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Fi : cR;
}
function Lp(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function uR(e, t) {
  const n = Lp(e, t), r = dR(e, t);
  return t.addDays(n, r * 7 - 1);
}
class pt {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ee.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, a) => this.overrides?.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Ee(r, o, a, this.options.timeZone) : new Date(r, o, a), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : Rp(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Ep(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : Yk(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : Uk(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Mp(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Zk(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : eN(r), this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : uR(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : rN(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Qk(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Tp(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : nN(r), this.format = (r, o, a) => {
      const s = this.overrides?.format ? this.overrides.format(r, o, this.options) : QN(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Ap(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : tR(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : nR(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Ip(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : rR(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : oR(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : _p(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : qk(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : aR(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : sR(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : jk(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Kk(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : iR(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : lR(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Lp(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : On(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : An(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : tN(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : on(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : Dp(r), this.options = { locale: Ts, ...t }, this.overrides = n;
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
const nt = new pt();
class $p {
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
class fR {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class pR {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function st(e, t, n = !1, r = nt) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Fp(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function As(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Wp(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Bp(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Vp(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Hp(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function it(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Hp(i, n))
      return i.includes(e);
    if (As(i))
      return st(i, e, !1, n);
    if (Vp(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Fp(i)) {
      const c = a(i.before, e), f = a(i.after, e), u = c > 0, p = f < 0;
      return s(i.before, i.after) ? p && u : u || p;
    }
    return Wp(i) ? a(e, i.after) > 0 : Bp(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function mR(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: f, today: u } = t, { isSameDay: p, isSameMonth: m, startOfMonth: h, isBefore: v, endOfMonth: g, isAfter: b } = o, y = n && h(n), w = r && g(r), x = {
    [me.focused]: [],
    [me.outside]: [],
    [me.disabled]: [],
    [me.hidden]: [],
    [me.today]: []
  }, R = {};
  for (const S of e) {
    const { date: E, displayMonth: k } = S, N = !!(k && !m(E, k)), D = !!(y && v(E, y)), z = !!(w && b(E, w)), T = !!(a && it(E, a, o)), F = !!(s && it(E, s, o)) || D || z || // Broadcast calendar will show outside days as default
    !f && !c && N || f && c === !1 && N, B = p(E, u ?? o.today());
    N && x.outside.push(S), T && x.disabled.push(S), F && x.hidden.push(S), B && x.today.push(S), i && Object.keys(i).forEach((V) => {
      const X = i?.[V];
      X && it(E, X, o) && (R[V] ? R[V].push(S) : R[V] = [S]);
    });
  }
  return (S) => {
    const E = {
      [me.focused]: !1,
      [me.disabled]: !1,
      [me.hidden]: !1,
      [me.outside]: !1,
      [me.today]: !1
    }, k = {};
    for (const N in x) {
      const D = x[N];
      E[N] = D.some((z) => z === S);
    }
    for (const N in R)
      k[N] = R[N].some((D) => D === S);
    return {
      ...E,
      // custom modifiers should override all the previous ones
      ...k
    };
  };
}
function hR(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[me[a]] ? o.push(t[me[a]]) : t[We[a]] && o.push(t[We[a]]), o), [t[q.Day]]);
}
function gR(e) {
  return O.createElement("button", { ...e });
}
function vR(e) {
  return O.createElement("span", { ...e });
}
function bR(e) {
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
function yR(e) {
  const { day: t, modifiers: n, ...r } = e;
  return O.createElement("td", { ...r });
}
function wR(e) {
  const { day: t, modifiers: n, ...r } = e, o = O.useRef(null);
  return O.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), O.createElement("button", { ref: o, ...r });
}
function xR(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[q.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === a.value);
  return O.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[q.DropdownRoot] },
    O.createElement(r.Select, { className: s, ...a }, t?.map(({ value: c, label: f, disabled: u }) => O.createElement(r.Option, { key: c, value: c, disabled: u }, f))),
    O.createElement(
      "span",
      { className: o[q.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      O.createElement(r.Chevron, { orientation: "down", size: 18, className: o[q.Chevron] })
    )
  );
}
function CR(e) {
  return O.createElement("div", { ...e });
}
function SR(e) {
  return O.createElement("div", { ...e });
}
function kR(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return O.createElement("div", { ...r }, e.children);
}
function NR(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return O.createElement("div", { ...r });
}
function RR(e) {
  return O.createElement("table", { ...e });
}
function ER(e) {
  return O.createElement("div", { ...e });
}
const Gp = Xi(void 0);
function Jn() {
  const e = Zi(Gp);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function PR(e) {
  const { components: t } = Jn();
  return O.createElement(t.Dropdown, { ...e });
}
function MR(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: f } } = Jn(), u = Re((m) => {
    o && n?.(m);
  }, [o, n]), p = Re((m) => {
    r && t?.(m);
  }, [r, t]);
  return O.createElement(
    "nav",
    { ...a },
    O.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[q.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: p },
      O.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[q.Chevron], orientation: "left" })
    ),
    O.createElement(
      s.NextMonthButton,
      { type: "button", className: i[q.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": f(o), onClick: u },
      O.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[q.Chevron] })
    )
  );
}
function _R(e) {
  const { components: t } = Jn();
  return O.createElement(t.Button, { ...e });
}
function DR(e) {
  return O.createElement("option", { ...e });
}
function TR(e) {
  const { components: t } = Jn();
  return O.createElement(t.Button, { ...e });
}
function AR(e) {
  const { rootRef: t, ...n } = e;
  return O.createElement("div", { ...n, ref: t });
}
function OR(e) {
  return O.createElement("select", { ...e });
}
function IR(e) {
  const { week: t, ...n } = e;
  return O.createElement("tr", { ...n });
}
function zR(e) {
  return O.createElement("th", { ...e });
}
function LR(e) {
  return O.createElement(
    "thead",
    { "aria-hidden": !0 },
    O.createElement("tr", { ...e })
  );
}
function $R(e) {
  const { week: t, ...n } = e;
  return O.createElement("th", { ...n });
}
function FR(e) {
  return O.createElement("th", { ...e });
}
function WR(e) {
  return O.createElement("tbody", { ...e });
}
function BR(e) {
  const { components: t } = Jn();
  return O.createElement(t.Dropdown, { ...e });
}
const VR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: gR,
  CaptionLabel: vR,
  Chevron: bR,
  Day: yR,
  DayButton: wR,
  Dropdown: xR,
  DropdownNav: CR,
  Footer: SR,
  Month: kR,
  MonthCaption: NR,
  MonthGrid: RR,
  Months: ER,
  MonthsDropdown: PR,
  Nav: MR,
  NextMonthButton: _R,
  Option: DR,
  PreviousMonthButton: TR,
  Root: AR,
  Select: OR,
  Week: IR,
  WeekNumber: $R,
  WeekNumberHeader: FR,
  Weekday: zR,
  Weekdays: LR,
  Weeks: WR,
  YearsDropdown: BR
}, Symbol.toStringTag, { value: "Module" }));
function HR(e) {
  return {
    ...VR,
    ...e
  };
}
function GR(e) {
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
function Os() {
  const e = {};
  for (const t in q)
    e[q[t]] = `rdp-${q[t]}`;
  for (const t in me)
    e[me[t]] = `rdp-${me[t]}`;
  for (const t in We)
    e[We[t]] = `rdp-${We[t]}`;
  for (const t in De)
    e[De[t]] = `rdp-${De[t]}`;
  return e;
}
function Yp(e, t, n) {
  return (n ?? new pt(t)).format(e, "LLLL y");
}
const YR = Yp;
function UR(e, t, n) {
  return (n ?? new pt(t)).format(e, "d");
}
function jR(e, t = nt) {
  return t.format(e, "LLLL");
}
function KR(e, t = nt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function qR() {
  return "";
}
function XR(e, t, n) {
  return (n ?? new pt(t)).format(e, "cccccc");
}
function Up(e, t = nt) {
  return t.format(e, "yyyy");
}
const ZR = Up, QR = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Yp,
  formatDay: UR,
  formatMonthCaption: YR,
  formatMonthDropdown: jR,
  formatWeekNumber: KR,
  formatWeekNumberHeader: qR,
  formatWeekdayName: XR,
  formatYearCaption: ZR,
  formatYearDropdown: Up
}, Symbol.toStringTag, { value: "Module" }));
function JR(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...QR,
    ...e
  };
}
function eE(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: f } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((m) => {
    const h = r.formatMonthDropdown(m, o), v = f(m), g = t && m < a(t) || n && m > a(n) || !1;
    return { value: v, label: h, disabled: g };
  });
}
function tE(e, t = {}, n = {}) {
  let r = { ...t?.[q.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function nE(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function rE(e, t, n, r) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, addYears: s, getYear: i, isBefore: c, isSameYear: f } = r, u = o(e), p = a(t), m = [];
  let h = u;
  for (; c(h, p) || f(h, p); )
    m.push(h), h = s(h, 1);
  return m.map((v) => {
    const g = n.formatYearDropdown(v, r);
    return {
      value: i(v),
      label: g,
      disabled: !1
    };
  });
}
function jp(e, t, n) {
  return (n ?? new pt(t)).format(e, "LLLL y");
}
const oE = jp;
function aE(e, t, n, r) {
  let o = (r ?? new pt(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function Kp(e, t, n, r) {
  let o = (r ?? new pt(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const sE = Kp;
function iE() {
  return "";
}
function lE(e) {
  return "Choose the Month";
}
function cE(e) {
  return "Go to the Next Month";
}
function dE(e) {
  return "Go to the Previous Month";
}
function uE(e, t, n) {
  return (n ?? new pt(t)).format(e, "cccc");
}
function fE(e, t) {
  return `Week ${e}`;
}
function pE(e) {
  return "Week Number";
}
function mE(e) {
  return "Choose the Year";
}
const hE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: oE,
  labelDay: sE,
  labelDayButton: Kp,
  labelGrid: jp,
  labelGridcell: aE,
  labelMonthDropdown: lE,
  labelNav: iE,
  labelNext: cE,
  labelPrevious: dE,
  labelWeekNumber: fE,
  labelWeekNumberHeader: pE,
  labelWeekday: uE,
  labelYearDropdown: mE
}, Symbol.toStringTag, { value: "Module" })), er = (e) => e instanceof HTMLElement ? e : null, Qo = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], gE = (e) => er(e.querySelector("[data-animated-month]")), Jo = (e) => er(e.querySelector("[data-animated-caption]")), ea = (e) => er(e.querySelector("[data-animated-weeks]")), vE = (e) => er(e.querySelector("[data-animated-nav]")), bE = (e) => er(e.querySelector("[data-animated-weekdays]"));
function yE(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = ot(null), i = ot(r), c = ot(!1);
  qi(() => {
    const f = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || f.length === 0 || r.length !== f.length)
      return;
    const u = a.isSameMonth(r[0].date, f[0].date), p = a.isAfter(r[0].date, f[0].date), m = p ? n[De.caption_after_enter] : n[De.caption_before_enter], h = p ? n[De.weeks_after_enter] : n[De.weeks_before_enter], v = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Qo(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const R = gE(x);
      R && x.contains(R) && x.removeChild(R);
      const S = Jo(x);
      S && S.classList.remove(m);
      const E = ea(x);
      E && E.classList.remove(h);
    }), s.current = g) : s.current = null, c.current || u || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const b = v instanceof HTMLElement ? Qo(v) : [], y = Qo(e.current);
    if (y && y.every((w) => w instanceof HTMLElement) && b && b.every((w) => w instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const w = vE(e.current);
      w && (w.style.zIndex = "1"), y.forEach((x, R) => {
        const S = b[R];
        if (!S)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const E = Jo(x);
        E && E.classList.add(m);
        const k = ea(x);
        k && k.classList.add(h);
        const N = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), E && E.classList.remove(m), k && k.classList.remove(h), x.style.position = "", x.style.overflow = "", x.contains(S) && x.removeChild(S);
        };
        S.style.pointerEvents = "none", S.style.position = "absolute", S.style.overflow = "hidden", S.setAttribute("aria-hidden", "true");
        const D = bE(S);
        D && (D.style.opacity = "0");
        const z = Jo(S);
        z && (z.classList.add(p ? n[De.caption_before_exit] : n[De.caption_after_exit]), z.addEventListener("animationend", N));
        const T = ea(S);
        T && T.classList.add(p ? n[De.weeks_before_exit] : n[De.weeks_after_exit]), x.insertBefore(S, x.firstChild);
      });
    }
  });
}
function wE(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: f, differenceInCalendarDays: u, differenceInCalendarMonths: p, endOfBroadcastWeek: m, endOfISOWeek: h, endOfMonth: v, endOfWeek: g, isAfter: b, startOfBroadcastWeek: y, startOfISOWeek: w, startOfWeek: x } = r, R = c ? y(o, r) : s ? w(o) : x(o), S = c ? m(a) : s ? h(v(a)) : g(v(a)), E = u(S, R), k = p(a, o) + 1, N = [];
  for (let T = 0; T <= E; T++) {
    const F = f(R, T);
    if (t && b(F, t))
      break;
    N.push(F);
  }
  const z = (c ? 35 : 42) * k;
  if (i && N.length < z) {
    const T = z - N.length;
    for (let F = 0; F < T; F++) {
      const B = f(N[N.length - 1], 1);
      N.push(B);
    }
  }
  return N;
}
function xE(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => [...a, ...s.days], t);
    return [...n, ...o];
  }, t);
}
function CE(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Wi(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: f, addMonths: u, startOfMonth: p } = r;
  if (n && f(n, c) < i - 1) {
    const m = -1 * (i - 1);
    c = u(n, m);
  }
  return t && f(c, t) < 0 && (c = t), p(c);
}
function SE(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: f, getWeek: u, startOfBroadcastWeek: p, startOfISOWeek: m, startOfWeek: h } = r, v = e.reduce((g, b) => {
    const y = n.broadcastCalendar ? p(b, r) : n.ISOWeek ? m(b) : h(b), w = n.broadcastCalendar ? a(b) : n.ISOWeek ? s(i(b)) : c(i(b)), x = t.filter((k) => k >= y && k <= w), R = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < R) {
      const k = t.filter((N) => {
        const D = R - x.length;
        return N > w && N <= o(w, D);
      });
      x.push(...k);
    }
    const S = x.reduce((k, N) => {
      const D = n.ISOWeek ? f(N) : u(N), z = k.find((F) => F.weekNumber === D), T = new $p(N, b, r);
      return z ? z.days.push(T) : k.push(new pR(D, [T])), k;
    }, []), E = new fR(b, S);
    return g.push(E), g;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function kE(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: f, newDate: u, today: p } = t, { fromYear: m, toYear: h, fromMonth: v, toMonth: g } = e;
  !n && v && (n = v), !n && m && (n = t.newDate(m, 0, 1)), !r && g && (r = g), !r && h && (r = u(h, 11, 31));
  const b = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : m ? n = u(m, 0, 1) : !n && b && (n = o(c(e.today ?? p(), -100))), r ? r = i(r) : h ? r = u(h, 11, 31) : !r && b && (r = f(e.today ?? p())), [
    n && a(n),
    r && a(r)
  ];
}
function NE(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, f = o ? a : 1, u = s(e);
  if (!t)
    return i(u, f);
  if (!(c(t, e) < a))
    return i(u, f);
}
function RE(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, f = o ? a ?? 1 : 1, u = s(e);
  if (!t)
    return i(u, -f);
  if (!(c(u, t) <= 0))
    return i(u, -f);
}
function EE(e) {
  const t = [];
  return e.reduce((n, r) => [...n, ...r.weeks], t);
}
function Ro(e, t) {
  const [n, r] = Tt(e);
  return [t === void 0 ? n : t, r];
}
function PE(e, t) {
  const [n, r] = kE(e, t), { startOfMonth: o, endOfMonth: a } = t, s = Wi(e, n, r, t), [i, c] = Ro(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  $r(() => {
    const E = Wi(e, n, r, t);
    c(E);
  }, [e.timeZone]);
  const f = CE(i, r, e, t), u = wE(f, e.endMonth ? a(e.endMonth) : void 0, e, t), p = SE(f, u, e, t), m = EE(p), h = xE(p), v = RE(i, n, e, t), g = NE(i, r, e, t), { disableNavigation: b, onMonthChange: y } = e, w = (E) => m.some((k) => k.days.some((N) => N.isEqualTo(E))), x = (E) => {
    if (b)
      return;
    let k = o(E);
    n && k < o(n) && (k = o(n)), r && k > o(r) && (k = o(r)), c(k), y?.(k);
  };
  return {
    months: p,
    weeks: m,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: v,
    nextMonth: g,
    goToMonth: x,
    goToDay: (E) => {
      w(E) || x(E.date);
    }
  };
}
var je;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(je || (je = {}));
function Bi(e) {
  return !e[me.disabled] && !e[me.hidden] && !e[me.outside];
}
function ME(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Bi(i) && (i[me.focused] && a < je.FocusedModifier ? (o = s, a = je.FocusedModifier) : r?.isEqualTo(s) && a < je.LastFocused ? (o = s, a = je.LastFocused) : n(s.date) && a < je.Selected ? (o = s, a = je.Selected) : i[me.today] && a < je.Today && (o = s, a = je.Today));
  }
  return o || (o = e.find((s) => Bi(t(s)))), o;
}
function _E(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: f, addMonths: u, addWeeks: p, addYears: m, endOfBroadcastWeek: h, endOfISOWeek: v, endOfWeek: g, max: b, min: y, startOfBroadcastWeek: w, startOfISOWeek: x, startOfWeek: R } = s;
  let E = {
    day: f,
    week: p,
    month: u,
    year: m,
    startOfWeek: (k) => c ? w(k, s) : i ? x(k) : R(k),
    endOfWeek: (k) => c ? h(k) : i ? v(k) : g(k)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? E = b([r, E]) : t === "after" && o && (E = y([o, E])), E;
}
function qp(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = _E(e, t, n.date, r, o, a, s), f = !!(a.disabled && it(c, a.disabled, s)), u = !!(a.hidden && it(c, a.hidden, s)), p = c, m = new $p(c, p, s);
  return !f && !u ? m : qp(e, t, m, r, o, a, s, i + 1);
}
function DE(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = Tt(), c = ME(t.days, n, r || (() => !1), s), [f, u] = Tt(a ? c : void 0);
  return {
    isFocusTarget: (g) => !!c?.isEqualTo(g),
    setFocused: u,
    focused: f,
    blur: () => {
      i(f), u(void 0);
    },
    moveFocus: (g, b) => {
      if (!f)
        return;
      const y = qp(g, b, f, t.navStart, t.navEnd, e, o);
      y && (t.goToDay(y), u(y));
    }
  };
}
function TE(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Ro(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, f = (h) => i?.some((v) => c(v, h)) ?? !1, { min: u, max: p } = e;
  return {
    selected: i,
    select: (h, v, g) => {
      let b = [...i ?? []];
      if (f(h)) {
        if (i?.length === u || r && i?.length === 1)
          return;
        b = i?.filter((y) => !c(y, h));
      } else
        i?.length === p ? b = [h] : b = [...b, h];
      return o || s(b), o?.(b, h, v, g), b;
    },
    isSelected: f
  };
}
function AE(e, t, n = 0, r = 0, o = !1, a = nt) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: f, isBefore: u } = a;
  let p;
  if (!s && !i)
    p = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? o ? p = { from: s, to: void 0 } : p = void 0 : u(e, s) ? p = { from: e, to: s } : p = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? p = { from: s, to: i } : p = void 0;
    else if (c(s, e))
      p = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      p = { from: e, to: n > 0 ? void 0 : e };
    else if (u(e, s))
      p = { from: e, to: i };
    else if (f(e, s))
      p = { from: s, to: e };
    else if (f(e, i))
      p = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (p?.from && p?.to) {
    const m = a.differenceInCalendarDays(p.to, p.from);
    r > 0 && m > r ? p = { from: e, to: void 0 } : n > 1 && m < n && (p = { from: e, to: void 0 });
  }
  return p;
}
function OE(e, t, n = nt) {
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
function Vi(e, t, n = nt) {
  return st(e, t.from, !1, n) || st(e, t.to, !1, n) || st(t, e.from, !1, n) || st(t, e.to, !1, n);
}
function IE(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? st(e, i, !1, n) : Hp(i, n) ? i.some((c) => st(e, c, !1, n)) : As(i) ? i.from && i.to ? Vi(e, { from: i.from, to: i.to }, n) : !1 : Vp(i) ? OE(e, i.dayOfWeek, n) : Fp(i) ? n.isAfter(i.before, i.after) ? Vi(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : it(e.from, i, n) || it(e.to, i, n) : Wp(i) || Bp(i) ? it(e.from, i, n) || it(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let f = 0; f <= c; f++) {
      if (s.some((u) => u(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function zE(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = Ro(o, s ? o : void 0), f = s ? o : i;
  return {
    selected: f,
    select: (m, h, v) => {
      const { min: g, max: b } = e, y = m ? AE(m, f, g, b, a, t) : void 0;
      return r && n && y?.from && y.to && IE({ from: y.from, to: y.to }, n, t) && (y.from = m, y.to = void 0), s || c(y), s?.(y, m, h, v), y;
    },
    isSelected: (m) => f && st(f, m, !1, t)
  };
}
function LE(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Ro(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (p, m, h) => {
      let v = p;
      return !r && i && i && c(p, i) && (v = void 0), o || s(v), o?.(v, p, m, h), v;
    },
    isSelected: (p) => i ? c(i, p) : !1
  };
}
function $E(e, t) {
  const n = LE(e, t), r = TE(e, t), o = zE(e, t);
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
function FE(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Ee(t.today, t.timeZone)), t.month && (t.month = new Ee(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Ee(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Ee(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Ee(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Ee(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((oe) => new Ee(oe, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Ee(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Ee(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = Dt(() => {
    const oe = { ...Ts, ...t.locale };
    return {
      dateLib: new pt({
        locale: oe,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: HR(t.components),
      formatters: JR(t.formatters),
      labels: { ...hE, ...t.labels },
      locale: oe,
      classNames: { ...Os(), ...t.classNames }
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
  ]), { captionLayout: c, mode: f, navLayout: u, numberOfMonths: p = 1, onDayBlur: m, onDayClick: h, onDayFocus: v, onDayKeyDown: g, onDayMouseEnter: b, onDayMouseLeave: y, onNextClick: w, onPrevClick: x, showWeekNumber: R, styles: S } = t, { formatCaption: E, formatDay: k, formatMonthDropdown: N, formatWeekNumber: D, formatWeekNumberHeader: z, formatWeekdayName: T, formatYearDropdown: F } = r, B = PE(t, a), { days: V, months: X, navStart: H, navEnd: K, previousMonth: P, nextMonth: L, goToMonth: J } = B, ae = mR(V, t, H, K, a), { isSelected: _, select: W, selected: Y } = $E(t, a) ?? {}, { blur: G, focused: Q, isFocusTarget: A, moveFocus: ee, setFocused: te } = DE(t, B, ae, _ ?? (() => !1), a), { labelDayButton: re, labelGridcell: se, labelGrid: ue, labelMonthDropdown: _e, labelNav: Ye, labelPrevious: hn, labelNext: gn, labelWeekday: vn, labelWeekNumber: lm, labelWeekNumberHeader: cm, labelYearDropdown: dm } = o, um = Dt(() => nE(a, t.ISOWeek), [a, t.ISOWeek]), zs = f !== void 0 || h !== void 0, Po = Re(() => {
    P && (J(P), x?.(P));
  }, [P, J, x]), Mo = Re(() => {
    L && (J(L), w?.(L));
  }, [J, L, w]), fm = Re((oe, fe) => (ie) => {
    ie.preventDefault(), ie.stopPropagation(), te(oe), W?.(oe.date, fe, ie), h?.(oe.date, fe, ie);
  }, [W, h, te]), pm = Re((oe, fe) => (ie) => {
    te(oe), v?.(oe.date, fe, ie);
  }, [v, te]), mm = Re((oe, fe) => (ie) => {
    G(), m?.(oe.date, fe, ie);
  }, [G, m]), hm = Re((oe, fe) => (ie) => {
    const mt = {
      ArrowLeft: [
        ie.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        ie.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [ie.shiftKey ? "year" : "week", "after"],
      ArrowUp: [ie.shiftKey ? "year" : "week", "before"],
      PageUp: [ie.shiftKey ? "year" : "month", "before"],
      PageDown: [ie.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (mt[ie.key]) {
      ie.preventDefault(), ie.stopPropagation();
      const [$e, nr] = mt[ie.key];
      ee($e, nr);
    }
    g?.(oe.date, fe, ie);
  }, [ee, g, t.dir]), gm = Re((oe, fe) => (ie) => {
    b?.(oe.date, fe, ie);
  }, [b]), vm = Re((oe, fe) => (ie) => {
    y?.(oe.date, fe, ie);
  }, [y]), bm = Re((oe) => (fe) => {
    const ie = Number(fe.target.value), mt = a.setMonth(a.startOfMonth(oe), ie);
    J(mt);
  }, [a, J]), ym = Re((oe) => (fe) => {
    const ie = Number(fe.target.value), mt = a.setYear(a.startOfMonth(oe), ie);
    J(mt);
  }, [a, J]), { className: wm, style: xm } = Dt(() => ({
    className: [i[q.Root], t.className].filter(Boolean).join(" "),
    style: { ...S?.[q.Root], ...t.style }
  }), [i, t.className, t.style, S]), Cm = GR(t), Ls = ot(null);
  yE(Ls, !!t.animate, {
    classNames: i,
    months: X,
    focused: Q,
    dateLib: a
  });
  const Sm = {
    dayPickerProps: t,
    selected: Y,
    select: W,
    isSelected: _,
    months: X,
    nextMonth: L,
    previousMonth: P,
    goToMonth: J,
    getModifiers: ae,
    components: n,
    classNames: i,
    styles: S,
    labels: o,
    formatters: r
  };
  return O.createElement(
    Gp.Provider,
    { value: Sm },
    O.createElement(
      n.Root,
      { rootRef: t.animate ? Ls : void 0, className: wm, style: xm, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], ...Cm },
      O.createElement(
        n.Months,
        { className: i[q.Months], style: S?.[q.Months] },
        !t.hideNavigation && !u && O.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[q.Nav], style: S?.[q.Nav], "aria-label": Ye(), onPreviousClick: Po, onNextClick: Mo, previousMonth: P, nextMonth: L }),
        X.map((oe, fe) => {
          const ie = eE(oe.date, H, K, r, a), mt = rE(H, K, r, a);
          return O.createElement(
            n.Month,
            { "data-animated-month": t.animate ? "true" : void 0, className: i[q.Month], style: S?.[q.Month], key: fe, displayIndex: fe, calendarMonth: oe },
            u === "around" && !t.hideNavigation && fe === 0 && O.createElement(
              n.PreviousMonthButton,
              { type: "button", className: i[q.PreviousMonthButton], tabIndex: P ? void 0 : -1, "aria-disabled": P ? void 0 : !0, "aria-label": hn(P), onClick: Po, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(n.Chevron, { disabled: P ? void 0 : !0, className: i[q.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
            ),
            O.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[q.MonthCaption], style: S?.[q.MonthCaption], calendarMonth: oe, displayIndex: fe }, c?.startsWith("dropdown") ? O.createElement(
              n.DropdownNav,
              { className: i[q.Dropdowns], style: S?.[q.Dropdowns] },
              c === "dropdown" || c === "dropdown-months" ? O.createElement(n.MonthsDropdown, { className: i[q.MonthsDropdown], "aria-label": _e(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: bm(oe.date), options: ie, style: S?.[q.Dropdown], value: a.getMonth(oe.date) }) : O.createElement("span", null, N(oe.date, a)),
              c === "dropdown" || c === "dropdown-years" ? O.createElement(n.YearsDropdown, { className: i[q.YearsDropdown], "aria-label": dm(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: ym(oe.date), options: mt, style: S?.[q.Dropdown], value: a.getYear(oe.date) }) : O.createElement("span", null, F(oe.date, a)),
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
              } }, E(oe.date, a.options, a))
            ) : O.createElement(n.CaptionLabel, { className: i[q.CaptionLabel], role: "status", "aria-live": "polite" }, E(oe.date, a.options, a))),
            u === "around" && !t.hideNavigation && fe === p - 1 && O.createElement(
              n.NextMonthButton,
              { type: "button", className: i[q.NextMonthButton], tabIndex: L ? void 0 : -1, "aria-disabled": L ? void 0 : !0, "aria-label": gn(L), onClick: Mo, "data-animated-button": t.animate ? "true" : void 0 },
              O.createElement(n.Chevron, { disabled: L ? void 0 : !0, className: i[q.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
            ),
            fe === p - 1 && u === "after" && !t.hideNavigation && O.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[q.Nav], style: S?.[q.Nav], "aria-label": Ye(), onPreviousClick: Po, onNextClick: Mo, previousMonth: P, nextMonth: L }),
            O.createElement(
              n.MonthGrid,
              { role: "grid", "aria-multiselectable": f === "multiple" || f === "range", "aria-label": ue(oe.date, a.options, a) || void 0, className: i[q.MonthGrid], style: S?.[q.MonthGrid] },
              !t.hideWeekdays && O.createElement(
                n.Weekdays,
                { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[q.Weekdays], style: S?.[q.Weekdays] },
                R && O.createElement(n.WeekNumberHeader, { "aria-label": cm(a.options), className: i[q.WeekNumberHeader], style: S?.[q.WeekNumberHeader], scope: "col" }, z()),
                um.map(($e, nr) => O.createElement(n.Weekday, { "aria-label": vn($e, a.options, a), className: i[q.Weekday], key: nr, style: S?.[q.Weekday], scope: "col" }, T($e, a.options, a)))
              ),
              O.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[q.Weeks], style: S?.[q.Weeks] }, oe.weeks.map(($e, nr) => O.createElement(
                n.Week,
                { className: i[q.Week], key: $e.weekNumber, style: S?.[q.Week], week: $e },
                R && O.createElement(n.WeekNumber, { week: $e, style: S?.[q.WeekNumber], "aria-label": lm($e.weekNumber, {
                  locale: s
                }), className: i[q.WeekNumber], scope: "row", role: "rowheader" }, D($e.weekNumber, a)),
                $e.days.map((Ne) => {
                  const { date: Ue } = Ne, le = ae(Ne);
                  if (le[me.focused] = !le.hidden && !!Q?.isEqualTo(Ne), le[We.selected] = _?.(Ue) || le.selected, As(Y)) {
                    const { from: _o, to: Do } = Y;
                    le[We.range_start] = !!(_o && Do && a.isSameDay(Ue, _o)), le[We.range_end] = !!(_o && Do && a.isSameDay(Ue, Do)), le[We.range_middle] = st(Y, Ue, !0, a);
                  }
                  const km = tE(le, S, t.modifiersStyles), Nm = hR(le, i, t.modifiersClassNames), Rm = !zs && !le.hidden ? se(Ue, le, a.options, a) : void 0;
                  return O.createElement(n.Day, { key: `${a.format(Ue, "yyyy-MM-dd")}_${a.format(Ne.displayMonth, "yyyy-MM")}`, day: Ne, modifiers: le, className: Nm.join(" "), style: km, role: "gridcell", "aria-selected": le.selected || void 0, "aria-label": Rm, "data-day": a.format(Ue, "yyyy-MM-dd"), "data-month": Ne.outside ? a.format(Ue, "yyyy-MM") : void 0, "data-selected": le.selected || void 0, "data-disabled": le.disabled || void 0, "data-hidden": le.hidden || void 0, "data-outside": Ne.outside || void 0, "data-focused": le.focused || void 0, "data-today": le.today || void 0 }, !le.hidden && zs ? O.createElement(n.DayButton, { className: i[q.DayButton], style: S?.[q.DayButton], type: "button", day: Ne, modifiers: le, disabled: le.disabled || void 0, tabIndex: A(Ne) ? 0 : -1, "aria-label": re(Ue, le, a.options, a), onClick: fm(Ne, le), onBlur: mm(Ne, le), onFocus: pm(Ne, le), onKeyDown: hm(Ne, le), onMouseEnter: gm(Ne, le), onMouseLeave: vm(Ne, le) }, k(Ue, a.options, a)) : !le.hidden && k(Ne.date, a.options, a));
                })
              )))
            )
          );
        })
      ),
      t.footer && O.createElement(n.Footer, { className: i[q.Footer], style: S?.[q.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Hi({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const c = Os();
  return /* @__PURE__ */ l(
    FE,
    {
      showOutsideDays: n,
      className: C(
        "group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (f) => f.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: C("w-fit", c.root),
        months: C(
          "relative flex flex-col gap-4 md:flex-row",
          c.months
        ),
        month: C("flex w-full flex-col gap-4", c.month),
        nav: C(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          c.nav
        ),
        button_previous: C(
          Ir({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          c.button_previous
        ),
        button_next: C(
          Ir({ variant: o }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
          c.button_next
        ),
        month_caption: C(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          c.month_caption
        ),
        dropdowns: C(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          c.dropdowns
        ),
        dropdown_root: C(
          "relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
          c.dropdown_root
        ),
        dropdown: C(
          "absolute inset-0 bg-popover opacity-0",
          c.dropdown
        ),
        caption_label: C(
          "font-medium select-none",
          r === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: C("flex", c.weekdays),
        weekday: C(
          "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
          c.weekday
        ),
        week: C("mt-2 flex w-full", c.week),
        week_number_header: C(
          "w-(--cell-size) select-none",
          c.week_number_header
        ),
        week_number: C(
          "text-[0.8rem] text-muted-foreground select-none",
          c.week_number
        ),
        day: C(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          i.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          c.day
        ),
        range_start: C(
          "rounded-l-md bg-accent",
          c.range_start
        ),
        range_middle: C("rounded-none", c.range_middle),
        range_end: C("rounded-r-md bg-accent", c.range_end),
        today: C(
          "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none",
          c.today
        ),
        outside: C(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: C(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: C("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: f, rootRef: u, ...p }) => /* @__PURE__ */ l(
          "div",
          {
            "data-slot": "calendar",
            ref: u,
            className: C(f),
            ...p
          }
        ),
        Chevron: ({ className: f, orientation: u, ...p }) => u === "left" ? /* @__PURE__ */ l(za, { className: C("size-4", f), ...p }) : u === "right" ? /* @__PURE__ */ l(
          In,
          {
            className: C("size-4", f),
            ...p
          }
        ) : /* @__PURE__ */ l(Wr, { className: C("size-4", f), ...p }),
        DayButton: WE,
        WeekNumber: ({ children: f, ...u }) => /* @__PURE__ */ l("td", { ...u, children: /* @__PURE__ */ l("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children: f }) }),
        ...s
      },
      ...i
    }
  );
}
function WE({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Os(), a = d.useRef(null);
  return d.useEffect(() => {
    n.focused && a.current?.focus();
  }, [n.focused]), /* @__PURE__ */ l(
    Zn,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: C(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
function mr(e, t = {}) {
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
function xn(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function ta(e) {
  if (!e) return;
  const t = typeof e == "string" ? Number(e) : e, n = new Date(t);
  return Number.isNaN(n.getTime()) ? void 0 : n;
}
function Gi(e) {
  return e == null ? [] : Array.isArray(e) ? e.map((t) => {
    if (typeof t == "number" || typeof t == "string")
      return t;
  }) : typeof e == "string" || typeof e == "number" ? [e] : [];
}
function BE({
  column: e,
  title: t,
  multiple: n
}) {
  const r = e.getFilterValue(), o = d.useMemo(() => {
    if (!r)
      return n ? { from: void 0, to: void 0 } : [];
    if (n) {
      const m = Gi(r);
      return {
        from: ta(m[0]),
        to: ta(m[1])
      };
    }
    const u = Gi(r), p = ta(u[0]);
    return p ? [p] : [];
  }, [r, n]), a = d.useCallback(
    (u) => {
      if (!u) {
        e.setFilterValue(void 0);
        return;
      }
      if (n && !("getTime" in u)) {
        const p = u.from?.getTime(), m = u.to?.getTime();
        e.setFilterValue(p || m ? [p, m] : void 0);
      } else !n && "getTime" in u && e.setFilterValue(u.getTime());
    },
    [e, n]
  ), s = d.useCallback(
    (u) => {
      u.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  ), i = d.useMemo(() => n ? xn(o) ? o.from || o.to : !1 : Array.isArray(o) ? o.length > 0 : !1, [n, o]), c = d.useCallback((u) => !u.from && !u.to ? "" : u.from && u.to ? `${mr(u.from)} - ${mr(u.to)}` : mr(u.from ?? u.to), []), f = d.useMemo(() => {
    if (n) {
      if (!xn(o)) return null;
      const m = o.from || o.to, h = m ? c(o) : "Select date range";
      return /* @__PURE__ */ M("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ l("span", { children: t }),
        m && /* @__PURE__ */ M(Pe, { children: [
          /* @__PURE__ */ l(
            Lr,
            {
              orientation: "vertical",
              className: "mx-0.5 data-[orientation=vertical]:h-4"
            }
          ),
          /* @__PURE__ */ l("span", { children: h })
        ] })
      ] });
    }
    if (xn(o)) return null;
    const u = o.length > 0, p = u ? mr(o[0]) : "Select date";
    return /* @__PURE__ */ M("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ l("span", { children: t }),
      u && /* @__PURE__ */ M(Pe, { children: [
        /* @__PURE__ */ l(
          Lr,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ l("span", { children: p })
      ] })
    ] });
  }, [o, n, c, t]);
  return /* @__PURE__ */ M(So, { children: [
    /* @__PURE__ */ l(ko, { asChild: !0, children: /* @__PURE__ */ M(
      Ae,
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
              children: /* @__PURE__ */ l(La, {})
            }
          ) : /* @__PURE__ */ l(Sh, {}),
          f
        ]
      }
    ) }),
    /* @__PURE__ */ l(No, { className: "w-auto p-0", align: "start", children: n ? /* @__PURE__ */ l(
      Hi,
      {
        autoFocus: !0,
        captionLayout: "dropdown",
        mode: "range",
        selected: xn(o) ? o : { from: void 0, to: void 0 },
        onSelect: a
      }
    ) : /* @__PURE__ */ l(
      Hi,
      {
        captionLayout: "dropdown",
        mode: "single",
        selected: xn(o) ? void 0 : o[0],
        onSelect: a
      }
    ) })
  ] });
}
var Yi = 1, VE = 0.9, HE = 0.8, GE = 0.17, na = 0.1, ra = 0.999, YE = 0.9999, UE = 0.99, jE = /[\\\/_+.#"@\[\(\{&]/, KE = /[\\\/_+.#"@\[\(\{&]/g, qE = /[\s-]/, Xp = /[\s-]/g;
function Da(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? Yi : UE;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var c = r.charAt(a), f = n.indexOf(c, o), u = 0, p, m, h, v; f >= 0; ) p = Da(e, t, n, r, f + 1, a + 1, s), p > u && (f === o ? p *= Yi : jE.test(e.charAt(f - 1)) ? (p *= HE, h = e.slice(o, f - 1).match(KE), h && o > 0 && (p *= Math.pow(ra, h.length))) : qE.test(e.charAt(f - 1)) ? (p *= VE, v = e.slice(o, f - 1).match(Xp), v && o > 0 && (p *= Math.pow(ra, v.length))) : (p *= GE, o > 0 && (p *= Math.pow(ra, f - o))), e.charAt(f) !== t.charAt(a) && (p *= YE)), (p < na && n.charAt(f - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(f - 1) !== r.charAt(a)) && (m = Da(e, t, n, r, f + 1, a + 2, s), m * na > p && (p = m * na)), p > u && (u = p), f = n.indexOf(c, f + 1);
  return s[i] = u, u;
}
function Ui(e) {
  return e.toLowerCase().replace(Xp, " ");
}
function XE(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Da(e, t, Ui(e), Ui(t), 0, 0, {});
}
var Cn = '[cmdk-group=""]', oa = '[cmdk-group-items=""]', ZE = '[cmdk-group-heading=""]', Zp = '[cmdk-item=""]', ji = `${Zp}:not([aria-disabled="true"])`, Ta = "cmdk-item-select", qt = "data-value", QE = (e, t, n) => XE(e, t, n), Qp = d.createContext(void 0), tr = () => d.useContext(Qp), Jp = d.createContext(void 0), Is = () => d.useContext(Jp), em = d.createContext(void 0), tm = d.forwardRef((e, t) => {
  let n = Xt(() => {
    var _, W;
    return { search: "", value: (W = (_ = e.value) != null ? _ : e.defaultValue) != null ? W : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = Xt(() => /* @__PURE__ */ new Set()), o = Xt(() => /* @__PURE__ */ new Map()), a = Xt(() => /* @__PURE__ */ new Map()), s = Xt(() => /* @__PURE__ */ new Set()), i = nm(e), { label: c, children: f, value: u, onValueChange: p, filter: m, shouldFilter: h, loop: v, disablePointerSelection: g = !1, vimBindings: b = !0, ...y } = e, w = ge(), x = ge(), R = ge(), S = d.useRef(null), E = cP();
  Lt(() => {
    if (u !== void 0) {
      let _ = u.trim();
      n.current.value = _, k.emit();
    }
  }, [u]), Lt(() => {
    E(6, B);
  }, []);
  let k = d.useMemo(() => ({ subscribe: (_) => (s.current.add(_), () => s.current.delete(_)), snapshot: () => n.current, setState: (_, W, Y) => {
    var G, Q, A, ee;
    if (!Object.is(n.current[_], W)) {
      if (n.current[_] = W, _ === "search") F(), z(), E(1, T);
      else if (_ === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let te = document.getElementById(R);
          te ? te.focus() : (G = document.getElementById(w)) == null || G.focus();
        }
        if (E(7, () => {
          var te;
          n.current.selectedItemId = (te = V()) == null ? void 0 : te.id, k.emit();
        }), Y || E(5, B), ((Q = i.current) == null ? void 0 : Q.value) !== void 0) {
          let te = W ?? "";
          (ee = (A = i.current).onValueChange) == null || ee.call(A, te);
          return;
        }
      }
      k.emit();
    }
  }, emit: () => {
    s.current.forEach((_) => _());
  } }), []), N = d.useMemo(() => ({ value: (_, W, Y) => {
    var G;
    W !== ((G = a.current.get(_)) == null ? void 0 : G.value) && (a.current.set(_, { value: W, keywords: Y }), n.current.filtered.items.set(_, D(W, Y)), E(2, () => {
      z(), k.emit();
    }));
  }, item: (_, W) => (r.current.add(_), W && (o.current.has(W) ? o.current.get(W).add(_) : o.current.set(W, /* @__PURE__ */ new Set([_]))), E(3, () => {
    F(), z(), n.current.value || T(), k.emit();
  }), () => {
    a.current.delete(_), r.current.delete(_), n.current.filtered.items.delete(_);
    let Y = V();
    E(4, () => {
      F(), Y?.getAttribute("id") === _ && T(), k.emit();
    });
  }), group: (_) => (o.current.has(_) || o.current.set(_, /* @__PURE__ */ new Set()), () => {
    a.current.delete(_), o.current.delete(_);
  }), filter: () => i.current.shouldFilter, label: c || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: w, inputId: R, labelId: x, listInnerRef: S }), []);
  function D(_, W) {
    var Y, G;
    let Q = (G = (Y = i.current) == null ? void 0 : Y.filter) != null ? G : QE;
    return _ ? Q(_, n.current.search, W) : 0;
  }
  function z() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let _ = n.current.filtered.items, W = [];
    n.current.filtered.groups.forEach((G) => {
      let Q = o.current.get(G), A = 0;
      Q.forEach((ee) => {
        let te = _.get(ee);
        A = Math.max(te, A);
      }), W.push([G, A]);
    });
    let Y = S.current;
    X().sort((G, Q) => {
      var A, ee;
      let te = G.getAttribute("id"), re = Q.getAttribute("id");
      return ((A = _.get(re)) != null ? A : 0) - ((ee = _.get(te)) != null ? ee : 0);
    }).forEach((G) => {
      let Q = G.closest(oa);
      Q ? Q.appendChild(G.parentElement === Q ? G : G.closest(`${oa} > *`)) : Y.appendChild(G.parentElement === Y ? G : G.closest(`${oa} > *`));
    }), W.sort((G, Q) => Q[1] - G[1]).forEach((G) => {
      var Q;
      let A = (Q = S.current) == null ? void 0 : Q.querySelector(`${Cn}[${qt}="${encodeURIComponent(G[0])}"]`);
      A?.parentElement.appendChild(A);
    });
  }
  function T() {
    let _ = X().find((Y) => Y.getAttribute("aria-disabled") !== "true"), W = _?.getAttribute(qt);
    k.setState("value", W || void 0);
  }
  function F() {
    var _, W, Y, G;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let Q = 0;
    for (let A of r.current) {
      let ee = (W = (_ = a.current.get(A)) == null ? void 0 : _.value) != null ? W : "", te = (G = (Y = a.current.get(A)) == null ? void 0 : Y.keywords) != null ? G : [], re = D(ee, te);
      n.current.filtered.items.set(A, re), re > 0 && Q++;
    }
    for (let [A, ee] of o.current) for (let te of ee) if (n.current.filtered.items.get(te) > 0) {
      n.current.filtered.groups.add(A);
      break;
    }
    n.current.filtered.count = Q;
  }
  function B() {
    var _, W, Y;
    let G = V();
    G && (((_ = G.parentElement) == null ? void 0 : _.firstChild) === G && ((Y = (W = G.closest(Cn)) == null ? void 0 : W.querySelector(ZE)) == null || Y.scrollIntoView({ block: "nearest" })), G.scrollIntoView({ block: "nearest" }));
  }
  function V() {
    var _;
    return (_ = S.current) == null ? void 0 : _.querySelector(`${Zp}[aria-selected="true"]`);
  }
  function X() {
    var _;
    return Array.from(((_ = S.current) == null ? void 0 : _.querySelectorAll(ji)) || []);
  }
  function H(_) {
    let W = X()[_];
    W && k.setState("value", W.getAttribute(qt));
  }
  function K(_) {
    var W;
    let Y = V(), G = X(), Q = G.findIndex((ee) => ee === Y), A = G[Q + _];
    (W = i.current) != null && W.loop && (A = Q + _ < 0 ? G[G.length - 1] : Q + _ === G.length ? G[0] : G[Q + _]), A && k.setState("value", A.getAttribute(qt));
  }
  function P(_) {
    let W = V(), Y = W?.closest(Cn), G;
    for (; Y && !G; ) Y = _ > 0 ? iP(Y, Cn) : lP(Y, Cn), G = Y?.querySelector(ji);
    G ? k.setState("value", G.getAttribute(qt)) : K(_);
  }
  let L = () => H(X().length - 1), J = (_) => {
    _.preventDefault(), _.metaKey ? L() : _.altKey ? P(1) : K(1);
  }, ae = (_) => {
    _.preventDefault(), _.metaKey ? H(0) : _.altKey ? P(-1) : K(-1);
  };
  return d.createElement($.div, { ref: t, tabIndex: -1, ...y, "cmdk-root": "", onKeyDown: (_) => {
    var W;
    (W = y.onKeyDown) == null || W.call(y, _);
    let Y = _.nativeEvent.isComposing || _.keyCode === 229;
    if (!(_.defaultPrevented || Y)) switch (_.key) {
      case "n":
      case "j": {
        b && _.ctrlKey && J(_);
        break;
      }
      case "ArrowDown": {
        J(_);
        break;
      }
      case "p":
      case "k": {
        b && _.ctrlKey && ae(_);
        break;
      }
      case "ArrowUp": {
        ae(_);
        break;
      }
      case "Home": {
        _.preventDefault(), H(0);
        break;
      }
      case "End": {
        _.preventDefault(), L();
        break;
      }
      case "Enter": {
        _.preventDefault();
        let G = V();
        if (G) {
          let Q = new Event(Ta);
          G.dispatchEvent(Q);
        }
      }
    }
  } }, d.createElement("label", { "cmdk-label": "", htmlFor: N.inputId, id: N.labelId, style: uP }, c), Eo(e, (_) => d.createElement(Jp.Provider, { value: k }, d.createElement(Qp.Provider, { value: N }, _))));
}), JE = d.forwardRef((e, t) => {
  var n, r;
  let o = ge(), a = d.useRef(null), s = d.useContext(em), i = tr(), c = nm(e), f = (r = (n = c.current) == null ? void 0 : n.forceMount) != null ? r : s?.forceMount;
  Lt(() => {
    if (!f) return i.item(o, s?.id);
  }, [f]);
  let u = rm(o, a, [e.value, e.children, a], e.keywords), p = Is(), m = Ct((E) => E.value && E.value === u.current), h = Ct((E) => f || i.filter() === !1 ? !0 : E.search ? E.filtered.items.get(o) > 0 : !0);
  d.useEffect(() => {
    let E = a.current;
    if (!(!E || e.disabled)) return E.addEventListener(Ta, v), () => E.removeEventListener(Ta, v);
  }, [h, e.onSelect, e.disabled]);
  function v() {
    var E, k;
    g(), (k = (E = c.current).onSelect) == null || k.call(E, u.current);
  }
  function g() {
    p.setState("value", u.current, !0);
  }
  if (!h) return null;
  let { disabled: b, value: y, onSelect: w, forceMount: x, keywords: R, ...S } = e;
  return d.createElement($.div, { ref: lt(a, t), ...S, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!m, "data-disabled": !!b, "data-selected": !!m, onPointerMove: b || i.getDisablePointerSelection() ? void 0 : g, onClick: b ? void 0 : v }, e.children);
}), eP = d.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = ge(), i = d.useRef(null), c = d.useRef(null), f = ge(), u = tr(), p = Ct((h) => o || u.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(s) : !0);
  Lt(() => u.group(s), []), rm(s, i, [e.value, e.heading, c]);
  let m = d.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return d.createElement($.div, { ref: lt(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: p ? void 0 : !0 }, n && d.createElement("div", { ref: c, "cmdk-group-heading": "", "aria-hidden": !0, id: f }, n), Eo(e, (h) => d.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? f : void 0 }, d.createElement(em.Provider, { value: m }, h))));
}), tP = d.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = d.useRef(null), a = Ct((s) => !s.search);
  return !n && !a ? null : d.createElement($.div, { ref: lt(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), nP = d.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = Is(), s = Ct((f) => f.search), i = Ct((f) => f.selectedItemId), c = tr();
  return d.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), d.createElement($.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": c.listId, "aria-labelledby": c.labelId, "aria-activedescendant": i, id: c.inputId, type: "text", value: o ? e.value : s, onChange: (f) => {
    o || a.setState("search", f.target.value), n?.(f.target.value);
  } });
}), rP = d.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = d.useRef(null), s = d.useRef(null), i = Ct((f) => f.selectedItemId), c = tr();
  return d.useEffect(() => {
    if (s.current && a.current) {
      let f = s.current, u = a.current, p, m = new ResizeObserver(() => {
        p = requestAnimationFrame(() => {
          let h = f.offsetHeight;
          u.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return m.observe(f), () => {
        cancelAnimationFrame(p), m.unobserve(f);
      };
    }
  }, []), d.createElement($.div, { ref: lt(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: c.listId }, Eo(e, (f) => d.createElement("div", { ref: lt(s, c.listInnerRef), "cmdk-list-sizer": "" }, f)));
}), oP = d.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return d.createElement(Kr, { open: n, onOpenChange: r }, d.createElement(qr, { container: s }, d.createElement(Xr, { "cmdk-overlay": "", className: o }), d.createElement(Zr, { "aria-label": e.label, "cmdk-dialog": "", className: a }, d.createElement(tm, { ref: t, ...i }))));
}), aP = d.forwardRef((e, t) => Ct((n) => n.filtered.count === 0) ? d.createElement($.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), sP = d.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return d.createElement($.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Eo(e, (s) => d.createElement("div", { "aria-hidden": !0 }, s)));
}), Vt = Object.assign(tm, { List: rP, Item: JE, Input: nP, Group: eP, Separator: tP, Dialog: oP, Empty: aP, Loading: sP });
function iP(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function lP(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function nm(e) {
  let t = d.useRef(e);
  return Lt(() => {
    t.current = e;
  }), t;
}
var Lt = typeof window > "u" ? d.useEffect : d.useLayoutEffect;
function Xt(e) {
  let t = d.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function Ct(e) {
  let t = Is(), n = () => e(t.snapshot());
  return d.useSyncExternalStore(t.subscribe, n, n);
}
function rm(e, t, n, r = []) {
  let o = d.useRef(), a = tr();
  return Lt(() => {
    var s;
    let i = (() => {
      var f;
      for (let u of n) {
        if (typeof u == "string") return u.trim();
        if (typeof u == "object" && "current" in u) return u.current ? (f = u.current.textContent) == null ? void 0 : f.trim() : o.current;
      }
    })(), c = r.map((f) => f.trim());
    a.value(e, i, c), (s = t.current) == null || s.setAttribute(qt, i), o.current = i;
  }), o;
}
var cP = () => {
  let [e, t] = d.useState(), n = Xt(() => /* @__PURE__ */ new Map());
  return Lt(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function dP(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Eo({ asChild: e, children: t }, n) {
  return e && d.isValidElement(t) ? d.cloneElement(dP(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var uP = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function om({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Vt,
    {
      "data-slot": "command",
      className: C(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        e
      ),
      ...t
    }
  );
}
function am({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ M(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ l(Gh, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ l(
          Vt.Input,
          {
            "data-slot": "command-input",
            className: C(
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
function sm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Vt.List,
    {
      "data-slot": "command-list",
      className: C(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...t
    }
  );
}
function im({
  ...e
}) {
  return /* @__PURE__ */ l(
    Vt.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function Aa({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Vt.Group,
    {
      "data-slot": "command-group",
      className: C(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function fP({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Vt.Separator,
    {
      "data-slot": "command-separator",
      className: C("-mx-1 h-px bg-border", e),
      ...t
    }
  );
}
function Oa({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Vt.Item,
    {
      "data-slot": "command-item",
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...t
    }
  );
}
function pP({
  column: e,
  title: t,
  options: n,
  multiple: r
}) {
  const [o, a] = d.useState(!1), s = e?.getFilterValue(), i = new Set(
    Array.isArray(s) ? s : []
  ), c = d.useCallback(
    (u, p) => {
      if (e)
        if (r) {
          const m = new Set(i);
          p ? m.delete(u.value) : m.add(u.value);
          const h = Array.from(m);
          e.setFilterValue(h.length ? h : void 0);
        } else
          e.setFilterValue(p ? void 0 : [u.value]), a(!1);
    },
    [e, r, i]
  ), f = d.useCallback(
    (u) => {
      u?.stopPropagation(), e?.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ M(So, { open: o, onOpenChange: a, children: [
    /* @__PURE__ */ l(ko, { asChild: !0, children: /* @__PURE__ */ M(
      Ae,
      {
        variant: "outline",
        size: "sm",
        className: "border-dashed font-normal",
        children: [
          i?.size > 0 ? /* @__PURE__ */ l(
            "div",
            {
              role: "button",
              "aria-label": `Clear ${t} filter`,
              tabIndex: 0,
              className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onClick: f,
              children: /* @__PURE__ */ l(La, {})
            }
          ) : /* @__PURE__ */ l(pl, {}),
          t,
          i?.size > 0 && /* @__PURE__ */ M(Pe, { children: [
            /* @__PURE__ */ l(
              Lr,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            /* @__PURE__ */ l(
              jo,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal lg:hidden",
                children: i.size
              }
            ),
            /* @__PURE__ */ l("div", { className: "hidden items-center gap-1 lg:flex", children: i.size > 2 ? /* @__PURE__ */ M(
              jo,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: [
                  i.size,
                  " selected"
                ]
              }
            ) : n.filter((u) => i.has(u.value)).map((u) => /* @__PURE__ */ l(
              jo,
              {
                variant: "secondary",
                className: "rounded-sm px-1 font-normal",
                children: u.label
              },
              u.value
            )) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ l(No, { className: "w-50 p-0", align: "start", children: /* @__PURE__ */ M(om, { children: [
      /* @__PURE__ */ l(am, { placeholder: t }),
      /* @__PURE__ */ M(sm, { className: "max-h-full", children: [
        /* @__PURE__ */ l(im, { children: "No results found." }),
        /* @__PURE__ */ l(Aa, { className: "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", children: n.map((u) => {
          const p = i.has(u.value);
          return /* @__PURE__ */ M(
            Oa,
            {
              onSelect: () => c(u, p),
              children: [
                /* @__PURE__ */ l(
                  "div",
                  {
                    className: C(
                      "flex size-4 items-center justify-center rounded-sm border border-primary",
                      p ? "bg-primary" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ l(at, {})
                  }
                ),
                u.icon && /* @__PURE__ */ l(u.icon, {}),
                /* @__PURE__ */ l("span", { className: "truncate", children: u.label }),
                u.count && /* @__PURE__ */ l("span", { className: "ml-auto font-mono text-xs", children: u.count })
              ]
            },
            u.value
          );
        }) }),
        i.size > 0 && /* @__PURE__ */ M(Pe, { children: [
          /* @__PURE__ */ l(fP, {}),
          /* @__PURE__ */ l(Aa, { children: /* @__PURE__ */ l(
            Oa,
            {
              onSelect: () => f(),
              className: "justify-center text-center",
              children: "Clear filters"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
}
function mP(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "number" && typeof e[1] == "number";
}
function hP(e) {
  if (Array.isArray(e) && e.length === 2 && e.every(
    (t) => (typeof t == "string" || typeof t == "number") && !Number.isNaN(t)
  ))
    return [Number(e[0]), Number(e[1])];
}
function gP({
  column: e,
  title: t
}) {
  const n = d.useId(), r = hP(e.getFilterValue()), o = e.columnDef.meta?.range, a = e.columnDef.meta?.unit, { min: s, max: i, step: c } = d.useMemo(() => {
    let g = 0, b = 100;
    if (o && mP(o))
      [g, b] = o;
    else {
      const x = e.getFacetedMinMaxValues();
      if (x && Array.isArray(x) && x.length === 2) {
        const [R, S] = x;
        typeof R == "number" && typeof S == "number" && (g = R, b = S);
      }
    }
    const y = b - g, w = y <= 20 ? 1 : y <= 100 ? Math.ceil(y / 20) : Math.ceil(y / 50);
    return { min: g, max: b, step: w };
  }, [e, o]), f = d.useMemo(() => r ?? [s, i], [r, s, i]), u = d.useCallback((g) => g.toLocaleString(void 0, { maximumFractionDigits: 0 }), []), p = d.useCallback(
    (g) => {
      const b = Number(g.target.value);
      !Number.isNaN(b) && b >= s && b <= f[1] && e.setFilterValue([b, f[1]]);
    },
    [e, s, f]
  ), m = d.useCallback(
    (g) => {
      const b = Number(g.target.value);
      !Number.isNaN(b) && b <= i && b >= f[0] && e.setFilterValue([f[0], b]);
    },
    [e, i, f]
  ), h = d.useCallback(
    (g) => {
      Array.isArray(g) && g.length === 2 && e.setFilterValue(g);
    },
    [e]
  ), v = d.useCallback(
    (g) => {
      g.target instanceof HTMLDivElement && g.stopPropagation(), e.setFilterValue(void 0);
    },
    [e]
  );
  return /* @__PURE__ */ M(So, { children: [
    /* @__PURE__ */ l(ko, { asChild: !0, children: /* @__PURE__ */ M(
      Ae,
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
              children: /* @__PURE__ */ l(La, {})
            }
          ) : /* @__PURE__ */ l(pl, {}),
          /* @__PURE__ */ l("span", { children: t }),
          r ? /* @__PURE__ */ M(Pe, { children: [
            /* @__PURE__ */ l(
              Lr,
              {
                orientation: "vertical",
                className: "mx-0.5 data-[orientation=vertical]:h-4"
              }
            ),
            u(r[0]),
            " -",
            " ",
            u(r[1]),
            a ? ` ${a}` : ""
          ] }) : null
        ]
      }
    ) }),
    /* @__PURE__ */ M(No, { align: "start", className: "flex w-auto flex-col gap-4", children: [
      /* @__PURE__ */ M("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ l("p", { className: "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: t }),
        /* @__PURE__ */ M("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ l(Ko, { htmlFor: `${n}-from`, className: "sr-only", children: "From" }),
          /* @__PURE__ */ M("div", { className: "relative", children: [
            /* @__PURE__ */ l(
              zr,
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
                value: f[0]?.toString(),
                onChange: p,
                className: C("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ l("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] }),
          /* @__PURE__ */ l(Ko, { htmlFor: `${n}-to`, className: "sr-only", children: "to" }),
          /* @__PURE__ */ M("div", { className: "relative", children: [
            /* @__PURE__ */ l(
              zr,
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
                value: f[1]?.toString(),
                onChange: m,
                className: C("h-8 w-24", a && "pr-8")
              }
            ),
            a && /* @__PURE__ */ l("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: a })
          ] })
        ] }),
        /* @__PURE__ */ M(Ko, { htmlFor: `${n}-slider`, className: "sr-only", children: [
          t,
          " slider"
        ] }),
        /* @__PURE__ */ l(
          j0,
          {
            id: `${n}-slider`,
            min: s,
            max: i,
            step: c,
            value: f,
            onValueChange: h
          }
        )
      ] }),
      /* @__PURE__ */ l(
        Ae,
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
function vP({
  table: e,
  disabled: t,
  ...n
}) {
  const r = d.useMemo(
    () => e.getAllColumns().filter(
      (o) => typeof o.accessorFn < "u" && o.getCanHide()
    ),
    [e]
  );
  return /* @__PURE__ */ M(So, { children: [
    /* @__PURE__ */ l(ko, { asChild: !0, children: /* @__PURE__ */ M(
      Ae,
      {
        "aria-label": "Toggle columns",
        role: "combobox",
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 font-normal lg:flex",
        disabled: t,
        children: [
          /* @__PURE__ */ l(gl, { className: "text-muted-foreground" }),
          "View"
        ]
      }
    ) }),
    /* @__PURE__ */ l(No, { className: "w-44 p-0", ...n, children: /* @__PURE__ */ M(om, { children: [
      /* @__PURE__ */ l(am, { placeholder: "Search columns..." }),
      /* @__PURE__ */ M(sm, { children: [
        /* @__PURE__ */ l(im, { children: "No columns found." }),
        /* @__PURE__ */ l(Aa, { children: r.map((o) => /* @__PURE__ */ M(
          Oa,
          {
            onSelect: () => o.toggleVisibility(!o.getIsVisible()),
            children: [
              /* @__PURE__ */ l("span", { className: "truncate", children: o.columnDef.meta?.label ?? o.id }),
              /* @__PURE__ */ l(
                at,
                {
                  className: C(
                    "ml-auto size-4 shrink-0",
                    o.getIsVisible() ? "opacity-100" : "opacity-0"
                  )
                }
              )
            ]
          },
          o.id
        )) })
      ] })
    ] }) })
  ] });
}
function aD({
  table: e,
  children: t,
  className: n,
  ...r
}) {
  const o = e.getState().columnFilters.length > 0, a = d.useMemo(
    () => e.getAllColumns().filter((i) => i.getCanFilter()),
    [e]
  ), s = d.useCallback(() => {
    e.resetColumnFilters();
  }, [e]);
  return /* @__PURE__ */ M(
    "div",
    {
      role: "toolbar",
      "aria-orientation": "horizontal",
      className: C(
        "flex w-full items-start justify-between gap-2 p-1",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ M("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
          a.map((i) => /* @__PURE__ */ l(bP, { column: i }, i.id)),
          o && /* @__PURE__ */ M(
            Ae,
            {
              "aria-label": "Reset filters",
              variant: "outline",
              size: "sm",
              className: "border-dashed",
              onClick: s,
              children: [
                /* @__PURE__ */ l($a, {}),
                "Reset"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ M("div", { className: "flex items-center gap-2", children: [
          t,
          /* @__PURE__ */ l(vP, { table: e, align: "end" })
        ] })
      ]
    }
  );
}
function bP({
  column: e
}) {
  {
    const t = e.columnDef.meta;
    return d.useCallback(() => {
      if (!t?.variant) return null;
      switch (t.variant) {
        case "text":
          return /* @__PURE__ */ l(
            zr,
            {
              placeholder: t.placeholder ?? t.label,
              value: e.getFilterValue() ?? "",
              onChange: (r) => e.setFilterValue(r.target.value),
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "number":
          return /* @__PURE__ */ M("div", { className: "relative", children: [
            /* @__PURE__ */ l(
              zr,
              {
                type: "number",
                inputMode: "numeric",
                placeholder: t.placeholder ?? t.label,
                value: e.getFilterValue() ?? "",
                onChange: (r) => e.setFilterValue(r.target.value),
                className: C("h-8 w-[120px]", t.unit && "pr-8")
              }
            ),
            t.unit && /* @__PURE__ */ l("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: t.unit })
          ] });
        case "range":
          return /* @__PURE__ */ l(
            gP,
            {
              column: e,
              title: t.label ?? e.id
            }
          );
        case "date":
        case "dateRange":
          return /* @__PURE__ */ l(
            BE,
            {
              column: e,
              title: t.label ?? e.id,
              multiple: t.variant === "dateRange"
            }
          );
        case "select":
        case "multiSelect":
          return /* @__PURE__ */ l(
            pP,
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
  const f = Array.from(
    { length: e },
    (u, p) => r[p % r.length] ?? "auto"
  );
  return /* @__PURE__ */ M(
    "div",
    {
      className: C("flex w-full flex-col gap-2.5 overflow-auto", i),
      ...c,
      children: [
        /* @__PURE__ */ M("div", { className: "flex w-full items-center justify-between gap-2 overflow-auto p-1", children: [
          /* @__PURE__ */ l("div", { className: "flex flex-1 items-center gap-2", children: n > 0 ? Array.from({ length: n }).map((u, p) => /* @__PURE__ */ l(Ie, { className: "h-7 w-18 border-dashed" }, p)) : null }),
          o ? /* @__PURE__ */ l(Ie, { className: "ml-auto hidden h-7 w-18 lg:flex" }) : null
        ] }),
        /* @__PURE__ */ l("div", { className: "rounded-md border", children: /* @__PURE__ */ M(K0, { children: [
          /* @__PURE__ */ l(q0, { children: Array.from({ length: 1 }).map((u, p) => /* @__PURE__ */ l(Ri, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((m, h) => /* @__PURE__ */ l(
            Z0,
            {
              style: {
                width: f[h],
                minWidth: s ? f[h] : "auto"
              },
              children: /* @__PURE__ */ l(Ie, { className: "h-6 w-full" })
            },
            h
          )) }, p)) }),
          /* @__PURE__ */ l(X0, { children: Array.from({ length: t }).map((u, p) => /* @__PURE__ */ l(Ri, { className: "hover:bg-transparent", children: Array.from({ length: e }).map((m, h) => /* @__PURE__ */ l(
            Q0,
            {
              style: {
                width: f[h],
                minWidth: s ? f[h] : "auto"
              },
              children: /* @__PURE__ */ l(Ie, { className: "h-6 w-full" })
            },
            h
          )) }, p)) })
        ] }) }),
        a ? /* @__PURE__ */ M("div", { className: "flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8", children: [
          /* @__PURE__ */ l(Ie, { className: "h-7 w-40 shrink-0" }),
          /* @__PURE__ */ M("div", { className: "flex items-center gap-4 sm:gap-6 lg:gap-8", children: [
            /* @__PURE__ */ M("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ l(Ie, { className: "h-7 w-24" }),
              /* @__PURE__ */ l(Ie, { className: "h-7 w-18" })
            ] }),
            /* @__PURE__ */ l("div", { className: "flex items-center justify-center font-medium text-sm", children: /* @__PURE__ */ l(Ie, { className: "h-7 w-20" }) }),
            /* @__PURE__ */ M("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ l(Ie, { className: "hidden size-7 lg:block" }),
              /* @__PURE__ */ l(Ie, { className: "size-7" }),
              /* @__PURE__ */ l(Ie, { className: "size-7" }),
              /* @__PURE__ */ l(Ie, { className: "hidden size-7 lg:block" })
            ] })
          ] })
        ] }) : null
      ]
    }
  );
}
export {
  $P as Accordion,
  BP as AccordionContent,
  FP as AccordionItem,
  WP as AccordionTrigger,
  VP as Alert,
  GP as AlertDescription,
  YP as AlertDialog,
  JP as AlertDialogAction,
  eM as AlertDialogCancel,
  jP as AlertDialogContent,
  ZP as AlertDialogDescription,
  qP as AlertDialogFooter,
  KP as AlertDialogHeader,
  QP as AlertDialogMedia,
  d0 as AlertDialogOverlay,
  c0 as AlertDialogPortal,
  XP as AlertDialogTitle,
  UP as AlertDialogTrigger,
  HP as AlertTitle,
  tM as AspectRatio,
  nM as Avatar,
  oM as AvatarFallback,
  rM as AvatarImage,
  jo as Badge,
  aM as Breadcrumb,
  uM as BreadcrumbEllipsis,
  iM as BreadcrumbItem,
  lM as BreadcrumbLink,
  sM as BreadcrumbList,
  cM as BreadcrumbPage,
  dM as BreadcrumbSeparator,
  Ae as Button,
  fM as ButtonGroup,
  pM as Card,
  vM as CardAction,
  bM as CardContent,
  gM as CardDescription,
  yM as CardFooter,
  mM as CardHeader,
  hM as CardTitle,
  wM as Checkbox,
  xM as Collapsible,
  SM as CollapsibleContent,
  CM as CollapsibleTrigger,
  rk as DataGrid,
  ok as DataGridContainer,
  nk as DataGridProvider,
  ik as DataGridScrollArea,
  Ik as DataGridTable,
  rD as DataTable,
  oD as DataTableColumnHeader,
  pP as DataTableFacetedFilter,
  zk as DataTablePagination,
  sD as DataTableSkeleton,
  aD as DataTableToolbar,
  vP as DataTableViewOptions,
  kM as Dialog,
  RM as DialogClose,
  EM as DialogContent,
  DM as DialogDescription,
  MM as DialogFooter,
  PM as DialogHeader,
  g0 as DialogOverlay,
  h0 as DialogPortal,
  _M as DialogTitle,
  NM as DialogTrigger,
  v0 as DropdownMenu,
  x0 as DropdownMenuCheckboxItem,
  y0 as DropdownMenuContent,
  w0 as DropdownMenuGroup,
  jt as DropdownMenuItem,
  C0 as DropdownMenuLabel,
  TM as DropdownMenuPortal,
  AM as DropdownMenuRadioGroup,
  OM as DropdownMenuRadioItem,
  fr as DropdownMenuSeparator,
  IM as DropdownMenuShortcut,
  S0 as DropdownMenuSub,
  N0 as DropdownMenuSubContent,
  k0 as DropdownMenuSubTrigger,
  b0 as DropdownMenuTrigger,
  zM as Empty,
  BM as EmptyContent,
  WM as EmptyDescription,
  LM as EmptyHeader,
  $M as EmptyMedia,
  FM as EmptyTitle,
  YM as Field,
  UM as FieldContent,
  qM as FieldDescription,
  ZM as FieldError,
  GM as FieldGroup,
  jM as FieldLabel,
  HM as FieldLegend,
  XM as FieldSeparator,
  VM as FieldSet,
  KM as FieldTitle,
  QM as HoverCard,
  e_ as HoverCardContent,
  JM as HoverCardTrigger,
  zr as Input,
  t_ as InputGroup,
  n_ as InputGroupAddon,
  r_ as InputGroupButton,
  a_ as InputGroupInput,
  o_ as InputGroupText,
  s_ as InputGroupTextarea,
  c_ as Item,
  m_ as ItemActions,
  u_ as ItemContent,
  p_ as ItemDescription,
  g_ as ItemFooter,
  i_ as ItemGroup,
  h_ as ItemHeader,
  d_ as ItemMedia,
  l_ as ItemSeparator,
  f_ as ItemTitle,
  v_ as Kbd,
  Ko as Label,
  b_ as NativeSelect,
  w_ as NativeSelectOptGroup,
  y_ as NativeSelectOption,
  x_ as Pagination,
  C_ as PaginationContent,
  R_ as PaginationEllipsis,
  S_ as PaginationItem,
  bp as PaginationLink,
  N_ as PaginationNext,
  k_ as PaginationPrevious,
  So as Popover,
  No as PopoverContent,
  ko as PopoverTrigger,
  E_ as Progress,
  P_ as RadioGroup,
  M_ as RadioGroupItem,
  __ as ScrollArea,
  L0 as ScrollBar,
  $0 as Select,
  B0 as SelectContent,
  D_ as SelectGroup,
  V0 as SelectItem,
  T_ as SelectLabel,
  G0 as SelectScrollDownButton,
  H0 as SelectScrollUpButton,
  A_ as SelectSeparator,
  W0 as SelectTrigger,
  F0 as SelectValue,
  Lr as Separator,
  O_ as Sheet,
  z_ as SheetClose,
  L_ as SheetContent,
  B_ as SheetDescription,
  F_ as SheetFooter,
  $_ as SheetHeader,
  W_ as SheetTitle,
  I_ as SheetTrigger,
  Ie as Skeleton,
  j0 as Slider,
  f0 as Spinner,
  V_ as Switch,
  K0 as Table,
  X0 as TableBody,
  G_ as TableCaption,
  Q0 as TableCell,
  H_ as TableFooter,
  Z0 as TableHead,
  q0 as TableHeader,
  Ri as TableRow,
  Y_ as Tabs,
  K_ as TabsContent,
  U_ as TabsList,
  j_ as TabsTrigger,
  q_ as Textarea,
  X_ as Toggle,
  Z_ as ToggleGroup,
  Q_ as ToggleGroupItem,
  eD as Tooltip,
  nD as TooltipContent,
  J_ as TooltipProvider,
  tD as TooltipTrigger,
  u0 as badgeVariants,
  p0 as buttonVariants,
  C as cn,
  J0 as tabsListVariants,
  ek as toggleVariants,
  be as useDataGrid
};
//# sourceMappingURL=index.mjs.map
